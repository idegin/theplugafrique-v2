import type { Metadata } from "next";
import { site } from "@/lib/site";

/* ==========================================================================
   SEO helpers
   Next.js replaces (not merges) a parent's `openGraph` / `twitter` objects, so
   every page builds its full set through `pageMeta()` instead of relying on
   the root layout. Share images are the 1200×630 PNG cards rendered by
   app/og/[card]/route.tsx (listed in lib/og-cards.ts).
   ========================================================================== */

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();

/** Public path of a generated share card. */
export const ogCardPath = (name: string) => `/og/${name}.png`;

const ogCard = (name: string, alt: string) => ({ url: ogCardPath(name), width: 1200, height: 630, alt, type: "image/png" });

type PageMetaInput = {
  /** Short page title; the layout template appends " · The Plug Afrique". Omit for the home page. */
  title?: string;
  description: string;
  /** Path with trailing slash, e.g. "/about/". */
  path: string;
  type?: "website" | "article";
  /** Share card name from lib/og-cards.ts, e.g. "about" or "blog-<slug>". */
  og: string;
  article?: { publishedTime: Date; modifiedTime?: Date; authors?: string[]; tags?: string[]; section?: string };
  noindex?: boolean;
  /** Extra <link rel="alternate"> types, e.g. RSS. */
  feeds?: Record<string, string>;
};

export function pageMeta({ title, description, path, type = "website", og, article, noindex, feeds }: PageMetaInput): Metadata {
  const fullTitle = title ? `${title} · ${site.name}` : site.title;
  const images = [ogCard(og, fullTitle)];
  return {
    title: title ?? { absolute: site.title },
    description,
    alternates: { canonical: path, ...(feeds ? { types: feeds } : {}) },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      siteName: site.name,
      locale: "en_GB",
      url: path,
      title: fullTitle,
      description,
      images,
      ...(article && type === "article"
        ? {
            publishedTime: article.publishedTime.toISOString(),
            modifiedTime: (article.modifiedTime ?? article.publishedTime).toISOString(),
            authors: article.authors,
            tags: article.tags,
            section: article.section,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: site.socialHandle,
      title: fullTitle,
      description,
      images,
    },
  };
}

/* ----------------------------- JSON-LD ------------------------------ */

const ORG_ID = absoluteUrl("/#organization");
const SITE_ID = absoluteUrl("/#website");

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    logo: { "@type": "ImageObject", url: absoluteUrl("/brand/tpa-logo.png"), width: 359, height: 202 },
    image: absoluteUrl(ogCardPath("home")),
    description: site.description,
    slogan: site.tagline,
    email: site.email,
    telephone: site.phone,
    areaServed: { "@type": "Place", name: "Africa" },
    sameAs: Object.values(site.social),
    address: site.offices.map((o) => ({
      "@type": "PostalAddress",
      streetAddress: o.address.replace(new RegExp(`,\\s*${o.city}$`), ""),
      addressLocality: o.city,
      addressCountry: "NG",
    })),
    contactPoint: [
      { "@type": "ContactPoint", contactType: "customer service", email: site.email, telephone: site.phone, areaServed: "Africa", availableLanguage: ["en"] },
    ],
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: "en-GB",
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function serviceLd(s: { slug: string; title: string; excerpt: string; href: string; offerings: readonly string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.excerpt,
    url: absoluteUrl(s.href),
    image: absoluteUrl(ogCardPath(`service-${s.slug}`)),
    serviceType: s.title,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Place", name: "Africa" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: s.title,
      itemListElement: s.offerings.map((o) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: o } })),
    },
  };
}

export function articleLd(p: {
  slug: string;
  title: string;
  excerpt: string;
  href: string;
  date: Date;
  updated?: Date;
  category: string;
  tags: readonly string[];
  author: { name: string };
}) {
  const url = absoluteUrl(p.href);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    headline: p.title,
    description: p.excerpt,
    image: absoluteUrl(ogCardPath(`blog-${p.slug}`)),
    datePublished: p.date.toISOString(),
    dateModified: (p.updated ?? p.date).toISOString(),
    articleSection: p.category,
    keywords: p.tags.join(", "),
    inLanguage: "en-GB",
    author: { "@type": "Organization", name: p.author.name, url: site.url },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": SITE_ID },
  };
}

export function faqLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
