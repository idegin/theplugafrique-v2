import { getOgCards } from "@/lib/og-cards";
import { ogImage } from "@/lib/og";

// Emits out/og/<card>.png at build time (see lib/og-cards.ts for the list).
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getOgCards().map((c) => ({ card: `${c.name}.png` }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ card: string }> }) {
  const name = (await params).card.replace(/\.png$/, "");
  const card = getOgCards().find((c) => c.name === name);
  if (!card) return new Response("Not found", { status: 404 });
  return ogImage(card);
}
