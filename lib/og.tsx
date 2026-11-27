import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/* Branded 1200×630 share cards, rendered to PNG at build time.
   Fonts are the static TTF cuts in assets/og/ (Satori can't read woff2 or
   variable fonts). Colours mirror the navy/gold scales in app/globals.css. */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const C = { navy950: "#001135", navy900: "#002055", gold400: "#e5b356", gold500: "#cf9838", ivory50: "#fdfaf4", muted: "#a9b6cf" };

const font = (file: string) => readFile(path.join(process.cwd(), "assets/og", file));

export async function ogImage({ eyebrow, title, footer }: { eyebrow: string; title: string; footer?: string }) {
  const [fraunces, instrument, logo] = await Promise.all([
    font("fraunces-500.ttf"),
    font("instrument-sans-500.ttf"),
    readFile(path.join(process.cwd(), "public/brand/tpa-logo-light.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const size = title.length > 60 ? 64 : title.length > 36 ? 76 : 92;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          color: C.ivory50,
          fontFamily: "Instrument Sans",
          backgroundColor: C.navy950,
          backgroundImage: `radial-gradient(circle at 85% 10%, ${C.navy900} 0%, transparent 55%), radial-gradient(circle at 10% 110%, rgba(207,152,56,0.22) 0%, transparent 45%)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={128} height={72} alt="" />
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: C.gold400 }}>{eyebrow}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 96, height: 4, backgroundColor: C.gold500, marginBottom: 36 }} />
          <div style={{ display: "flex", fontFamily: "Fraunces", fontSize: size, lineHeight: 1.04, letterSpacing: -1.5, maxWidth: 1000 }}>{title}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: C.muted }}>
          <div style={{ display: "flex" }}>{footer ?? site.tagline}</div>
          <div style={{ display: "flex", color: C.ivory50 }}>{new URL(site.url).hostname.replace(/^www\./, "")}</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 500, style: "normal" },
        { name: "Instrument Sans", data: instrument, weight: 500, style: "normal" },
      ],
    },
  );
}
