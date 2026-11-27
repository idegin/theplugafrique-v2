import type { MetadataRoute } from "next";
import { getPosts, getServices } from "@/lib/cms";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => new URL(p, site.url).toString();
  return [
    { url: u("/"), changeFrequency: "monthly", priority: 1 },
    { url: u("/about/"), priority: 0.9 },
    { url: u("/services/"), priority: 0.9 },
    { url: u("/contact/"), priority: 0.7 },
    { url: u("/blog/"), changeFrequency: "weekly", priority: 0.8 },
    ...getServices().map((s) => ({ url: u(s.href), priority: 0.8 })),
    ...getPosts().map((p) => ({ url: u(p.href), lastModified: p.updated ?? p.date, priority: 0.6 })),
  ];
}
