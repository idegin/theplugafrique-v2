import "server-only";
import { cache } from "react";
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { imageSize } from "image-size";
import type { z } from "zod";
import {
  authorSchema,
  clientSchema,
  faqSchema,
  postSchema,
  serviceSchema,
  testimonialSchema,
} from "./schema";
import { renderMarkdown, type TocItem } from "./markdown";

/* ==========================================================================
   File-based CMS
   content/<collection>/<slug>/index.md   (folder entries, with assets alongside)
   content/<collection>/<slug>.md         (flat entries)
   Relative asset paths (./cover.webp) resolve to /cms/<collection>/<slug>/…,
   which scripts/sync-cms-assets.mjs copies into public/cms at build time.
   ========================================================================== */

const CONTENT = path.join(process.cwd(), "content");
const SHOW_DRAFTS = process.env.NODE_ENV !== "production";

export type CmsImage = { src: string; width: number; height: number; alt: string };

type RawEntry = { slug: string; file: string; dir: string; data: Record<string, unknown>; body: string };

function readCollection(collection: string): RawEntry[] {
  const root = path.join(CONTENT, collection);
  if (!existsSync(root)) return [];
  const entries: RawEntry[] = [];
  for (const name of readdirSync(root)) {
    const full = path.join(root, name);
    let file: string | null = null;
    let slug = name;
    if (statSync(full).isDirectory()) {
      const index = path.join(full, "index.md");
      if (existsSync(index)) file = index;
    } else if (name.endsWith(".md")) {
      file = full;
      slug = name.replace(/\.md$/, "");
    }
    if (!file) continue;
    const { data, content } = matter(readFileSync(file, "utf8"));
    entries.push({ slug, file, dir: path.dirname(file), data, body: content });
  }
  return entries;
}

function parse<T extends z.ZodTypeAny>(schema: T, entry: RawEntry): z.infer<T> {
  const result = schema.safeParse(entry.data);
  if (!result.success) {
    const issues = result.error.issues.map((i) => `  • ${i.path.join(".")}: ${i.message}`).join("\n");
    throw new Error(`[cms] Invalid frontmatter in ${path.relative(process.cwd(), entry.file)}\n${issues}`);
  }
  return result.data;
}

/** Map a path written in content (relative or absolute) to a public URL. */
function assetUrl(entry: RawEntry, src: string): string {
  if (/^(https?:)?\/\//.test(src) || src.startsWith("/")) return src;
  const abs = path.resolve(entry.dir, src);
  return "/cms/" + path.relative(CONTENT, abs).split(path.sep).join("/");
}

function image(entry: RawEntry, src: string, alt: string): CmsImage {
  const url = assetUrl(entry, src);
  const fsPath = url.startsWith("/cms/")
    ? path.join(CONTENT, url.slice(5))
    : path.join(process.cwd(), "public", url);
  let width = 1600;
  let height = 1000;
  try {
    const dim = imageSize(readFileSync(fsPath));
    width = dim.width ?? width;
    height = dim.height ?? height;
  } catch {
    throw new Error(`[cms] Image not found for ${path.relative(process.cwd(), entry.file)}: ${src}`);
  }
  return { src: url, width, height, alt };
}

/* ----------------------------- Services ----------------------------- */

export type Service = Omit<z.infer<typeof serviceSchema>, "cover" | "coverAlt"> & {
  slug: string;
  href: string;
  cover: CmsImage;
  body: string;
};

export const getServices = cache((): Service[] =>
  readCollection("services")
    .map((e) => {
      const d = parse(serviceSchema, e);
      return { ...d, slug: e.slug, href: `/services/${e.slug}/`, cover: image(e, d.cover, d.coverAlt), body: e.body };
    })
    .filter((s) => SHOW_DRAFTS || !s.draft)
    .sort((a, b) => a.order - b.order),
);

export async function getService(slug: string) {
  const entry = readCollection("services").find((e) => e.slug === slug);
  const service = getServices().find((s) => s.slug === slug);
  if (!entry || !service) return null;
  const { html, toc } = await renderMarkdown(service.body, (src) => assetUrl(entry, src));
  return { ...service, html, toc };
}

/* ------------------------------ Authors ----------------------------- */

export type Author = Omit<z.infer<typeof authorSchema>, "avatar"> & { slug: string; avatar: CmsImage };

export const getAuthors = cache((): Author[] =>
  readCollection("authors").map((e) => {
    const d = parse(authorSchema, e);
    return { ...d, slug: e.slug, avatar: image(e, d.avatar, d.name) };
  }),
);

export function getAuthor(slug: string): Author {
  const author = getAuthors().find((a) => a.slug === slug);
  if (!author) throw new Error(`[cms] Unknown author "${slug}"`);
  return author;
}

/* ------------------------------- Posts ------------------------------ */

export type Post = Omit<z.infer<typeof postSchema>, "cover" | "coverAlt" | "author"> & {
  slug: string;
  href: string;
  cover: CmsImage;
  author: Author;
  readingMinutes: number;
  categorySlug: string;
  body: string;
};

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const getPosts = cache((): Post[] =>
  readCollection("blog")
    .map((e) => {
      const d = parse(postSchema, e);
      return {
        ...d,
        slug: e.slug,
        href: `/blog/${e.slug}/`,
        cover: image(e, d.cover, d.coverAlt),
        author: getAuthor(d.author),
        readingMinutes: Math.max(1, Math.round(readingTime(e.body).minutes)),
        categorySlug: slugify(d.category),
        body: e.body,
      };
    })
    .filter((p) => SHOW_DRAFTS || !p.draft)
    .sort((a, b) => b.date.getTime() - a.date.getTime()),
);

export type PostWithHtml = Post & { html: string; toc: TocItem[] };

export async function getPost(slug: string): Promise<PostWithHtml | null> {
  const entry = readCollection("blog").find((e) => e.slug === slug);
  const post = getPosts().find((p) => p.slug === slug);
  if (!entry || !post) return null;
  const { html, toc } = await renderMarkdown(post.body, (src) => assetUrl(entry, src));
  return { ...post, html, toc };
}

/** Featured post first, then the most recent. */
export function getLatestPosts(limit = 3): Post[] {
  const posts = getPosts();
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => p !== featured);
  return (featured ? [featured, ...rest] : rest).slice(0, limit);
}

/** Related posts scored by shared category and tags. */
export function getRelatedPosts(post: Post, limit = 3): Post[] {
  return getPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      p,
      score: (p.category === post.category ? 3 : 0) + p.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score || b.p.date.getTime() - a.p.date.getTime())
    .slice(0, limit)
    .map((x) => x.p);
}

export function getCategories() {
  const map = new Map<string, { name: string; slug: string; count: number }>();
  for (const p of getPosts()) {
    const c = map.get(p.categorySlug) ?? { name: p.category, slug: p.categorySlug, count: 0 };
    c.count++;
    map.set(p.categorySlug, c);
  }
  return [...map.values()].sort((a, b) => b.count - a.count);
}

/* ---------------------- Testimonials, FAQ, clients ------------------- */

export type Testimonial = z.infer<typeof testimonialSchema> & { slug: string };

export const getTestimonials = cache((): Testimonial[] =>
  readCollection("testimonials")
    .map((e) => ({ ...parse(testimonialSchema, e), slug: e.slug }))
    .sort((a, b) => a.order - b.order),
);

export type Faq = z.infer<typeof faqSchema> & { slug: string; answer: string };

export const getFaqs = cache((): Faq[] =>
  readCollection("faq")
    .map((e) => ({ ...parse(faqSchema, e), slug: e.slug, answer: e.body.trim() }))
    .sort((a, b) => a.order - b.order),
);

export type Client = z.infer<typeof clientSchema>;

export const getClients = cache((): Client[] => {
  const file = path.join(CONTENT, "clients.json");
  if (!existsSync(file)) return [];
  const raw = JSON.parse(readFileSync(file, "utf8")) as unknown[];
  return raw.map((c, i) => {
    const r = clientSchema.safeParse(c);
    if (!r.success) throw new Error(`[cms] Invalid client #${i} in content/clients.json`);
    return r.data;
  });
});

export const formatDate = (d: Date) =>
  d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
