import "server-only";
import { formatDate, getPosts, getServices } from "@/lib/cms";

/* Every share card the build renders to /og/<name>.png. Pages reference them
   through `ogCard()` in lib/seo.ts. */

export type OgCard = { name: string; eyebrow: string; title: string; footer?: string };

export function getOgCards(): OgCard[] {
  return [
    { name: "home", eyebrow: "Pan-African consulting", title: "Connecting people, ideas and opportunities for impact." },
    { name: "about", eyebrow: "Who we are", title: "A Pan-African practice bridging strategy and execution." },
    { name: "services", eyebrow: "Five connected practices", title: "Strategy, innovation, capability, culture and partnerships." },
    { name: "contact", eyebrow: "Start a conversation", title: "Let's plug in." },
    { name: "blog", eyebrow: "Insights", title: "Perspectives on strategy, innovation and culture across Africa." },
    ...getServices().map((s) => ({
      name: `service-${s.slug}`,
      eyebrow: `Practice 0${s.order}`,
      title: s.title,
      footer: "Services · The Plug Afrique",
    })),
    ...getPosts().map((p) => ({
      name: `blog-${p.slug}`,
      eyebrow: p.category,
      title: p.title,
      footer: `${formatDate(p.date)} · ${p.readingMinutes} min read`,
    })),
  ];
}
