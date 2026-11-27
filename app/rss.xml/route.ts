import { getPosts } from "@/lib/cms";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = getPosts()
    .map((p) => {
      const url = new URL(p.href, site.url).toString();
      return `<item><title>${esc(p.title)}</title><link>${url}</link><guid>${url}</guid><pubDate>${p.date.toUTCString()}</pubDate><category>${esc(p.category)}</category><author>${esc(site.email)} (${esc(p.author.name)})</author><description>${esc(p.excerpt)}</description></item>`;
    })
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${esc(site.name)} Insights</title><atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml"/><link>${site.url}/blog/</link><description>${esc(site.description)}</description><language>en-gb</language>${items ? `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>` : ""}${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
