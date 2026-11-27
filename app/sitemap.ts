import type { MetadataRoute } from "next";
import { getPosts, getServices } from "@/lib/cms";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => new URL(p, site.url).toString();
  const posts = getPosts();
  // Static pages carry the build date; the blog index follows its newest post.
  const built = new Date();
  const latestPost = posts.reduce<Date | undefined>((d, p) => {
    const t = p.updated ?? p.date;
    return !d || t > d ? t : d;
  }, undefined);
  return [
    { url: u("/"), lastModified: built, changeFrequency: "monthly", priority: 1 },
    { url: u("/about/"), lastModified: built, priority: 0.9 },
    { url: u("/services/"), lastModified: built, priority: 0.9 },
    { url: u("/contact/"), lastModified: built, priority: 0.7 },
    { url: u("/blog/"), lastModified: latestPost ?? built, changeFrequency: "weekly", priority: 0.8 },
    ...getServices().map((s) => ({ url: u(s.href), lastModified: built, priority: 0.8 })),
    ...posts.map((p) => ({ url: u(p.href), lastModified: p.updated ?? p.date, priority: 0.6 })),
  ];
}
