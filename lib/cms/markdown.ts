import "server-only";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";

export type TocItem = { id: string; text: string; depth: 2 | 3 };

type HastNode = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

function textOf(node: HastNode): string {
  if (node.type === "text") return node.value ?? "";
  // Skip the appended "#" permalink anchors
  const cls = node.properties?.className;
  if (Array.isArray(cls) && cls.includes("heading-anchor")) return "";
  return (node.children ?? []).map(textOf).join("");
}

function walk(node: HastNode, fn: (n: HastNode) => void) {
  fn(node);
  node.children?.forEach((c) => walk(c, fn));
}

/** rehype plugin: resolve relative image URLs, lazy-load images, collect the TOC, harden external links. */
function rehypeTpa(opts: { resolveAsset: (src: string) => string; toc: TocItem[] }) {
  return (tree: HastNode) => {
    walk(tree, (n) => {
      if (n.type !== "element") return;
      if (n.tagName === "img" && n.properties) {
        const src = String(n.properties.src ?? "");
        n.properties.src = opts.resolveAsset(src);
        n.properties.loading = "lazy";
        n.properties.decoding = "async";
      }
      if ((n.tagName === "h2" || n.tagName === "h3") && n.properties?.id) {
        opts.toc.push({
          id: String(n.properties.id),
          text: textOf(n).trim(),
          depth: n.tagName === "h2" ? 2 : 3,
        });
      }
      if (n.tagName === "a" && n.properties) {
        const href = String(n.properties.href ?? "");
        if (/^https?:\/\//.test(href)) {
          n.properties.target = "_blank";
          n.properties.rel = "noopener noreferrer";
        }
      }
    });
  };
}

export async function renderMarkdown(source: string, resolveAsset: (src: string) => string) {
  const toc: TocItem[] = [];
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      properties: { className: ["heading-anchor"], ariaHidden: "true", tabIndex: -1 },
      content: { type: "text", value: "#" },
    })
    .use(rehypeTpa, { resolveAsset, toc })
    .use(rehypeStringify)
    .process(source);
  return { html: String(file), toc };
}
