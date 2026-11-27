import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Preloader } from "@/components/site/preloader";
import { Cursor } from "@/components/site/cursor";
import { BackToTop } from "@/components/site/back-to-top";
import { PageTransition } from "@/components/providers/page-transition";
import { site } from "@/lib/site";
import { organizationLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/site/json-ld";
import "./globals.css";

// Display serif: variable with optical size + SOFT/WONK axes (see DESIGN.md §3)
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

// Body / UI grotesk: variable weight + width axis
const instrument = Instrument_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["wdth"],
  variable: "--font-instrument",
  display: "swap",
});

// Mono: eyebrows, indices, metadata
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const rootShare = pageMeta({ description: site.description, path: "/", og: "home" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { telephone: false, email: false, address: false },
  // Search Console / Bing verification: set these env vars at build time.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  // Fallback share tags only; each page supplies its own canonical, Open Graph
  // and Twitter set via pageMeta() in lib/seo.ts.
  openGraph: rootShare.openGraph,
  twitter: rootShare.twitter,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fdfaf4" },
    { media: "(prefers-color-scheme: dark)", color: "#001135" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${fraunces.variable} ${instrument.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Flag JS before first paint so motion initial states never flash */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('tpa-intro'))d.classList.add('no-preload')}catch(e){}",
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col bg-canvas text-fg">
        <JsonLd data={organizationLd()} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Preloader />
        <SmoothScroll>
          <PageTransition />
          <Cursor />
          <BackToTop />
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
