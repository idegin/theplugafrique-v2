# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project brief

This repo is v2 of the marketing website for **The Plug Afrique**. The goal is a premium ("$9,000-grade") site that looks much better than v1. Bring all the UI skills to bear (see the global UI/UX rules: `ui-ux-pro-max`, Magic UI / React Bits MCPs, GSAP, three.js).

**Read [`DESIGN.md`](DESIGN.md) before any UI work. It is the house design system and wins over generic skill defaults.** It covers the "Sapphire & Gold Editorial" direction, adopted and rejected styles, the colour scales and semantic tokens (with verified contrast), type (Fraunces / Instrument Sans / IBM Plex Mono), layout, surfaces and motifs, the motion system (which effects to use per section, easing and duration tokens, the reduced-motion map, performance budget), component specs and page blueprints. It's implemented in `app/globals.css`. Change both together. `/styleguide` renders every token for visual checks.

- **v1 (reference only, do not modify):** `/home/emeka/web/client_projects/theplugafrique`, an Express + EJS + Bootstrap app. Its content and assets have already been migrated here:
  - **`docs/brand.md`** is the brand book: narrative, philosophy, the five service areas, voice, contact details and offices. Use it as the source of truth for copy.
  - **`docs/assets.md`** is the manifest for everything in `public/` (`brand/`, `images/{photography,backgrounds,clients,theme-placeholders}/`, `icons/{social,contact,ui,philosophy,features,decorative}/`, `fonts/font-awesome/`). Keep it updated when adding assets.
  - `images/theme-placeholders/` holds stock images from v1's template (including the "Budgeto" logo). They are not brand assets.
- **Static export is required.** The site must build to `out/` (`output: "export"` and `trailingSlash: true` in `next.config.ts`). That means no server runtime: no API routes, no server actions, no ISR, and no on-demand `next/image` optimization. Dynamic routes need `generateStaticParams`.
- **Base path / GitHub Pages:** `.github/workflows/deploy-pages.yml` builds and deploys to Pages on push to `main`, setting `NEXT_PUBLIC_BASE_PATH` (`/<repo>` on a project site, empty on a custom domain). `next.config.ts` feeds it to `basePath`. Next only prefixes `<Link>` and `/_next/`, so wrap any other root-relative public URL (unoptimized `<Image>` src, CSS `url()`, manifest entries) in `asset()` from `lib/base-path.ts`. The image loader and Markdown images already do this.
- **Images:** `next/image` uses a custom loader (`lib/image-loader.ts`). `scripts/sync-cms-assets.mjs` pre-renders `<name>-{640,1280,1920}.webp` variants for every raster image in `content/` and `public/images/web/`, and the loader maps srcset widths onto them. Other paths (logos, icons) get no variants, so pass `unoptimized` on those `<Image>`s. If you change the widths, change the script, the loader and `images.deviceSizes` together. The script also warns about covers under 1600px wide or in portrait.
- **File-based CMS lives in this repo.** Services, blog posts, and similar collections are authored as Markdown (frontmatter + body) with thumbnail/cover image files alongside, and read at build time. Nothing comes from an external CMS.

## CMS (`content/` + `lib/cms/`)

- Collections live in `content/`: `blog/<slug>/index.md`, `services/<slug>/index.md` (each with a `cover.webp` next to it), `authors/*.md`, `testimonials/*.md`, `faq/*.md`, and `clients.json`. The folder or file name is the slug.
- Frontmatter is validated with zod in `lib/cms/schema.ts`. Invalid or missing fields, an unknown author or a missing image **fail the build** and name the offending file. To add a field, update the schema and the loader in `lib/cms/index.ts`.
- Write asset paths relative to the Markdown file (`./cover.webp`). They resolve to `/cms/<collection>/<slug>/…`. `scripts/sync-cms-assets.mjs` copies every non-Markdown file from `content/` to `public/cms/` (gitignored) before `dev` and `build`. Run `npm run cms:watch` alongside dev while editing content images.
- Loaders (`getPosts`, `getPost`, `getLatestPosts`, `getRelatedPosts`, `getCategories`, `getServices`, `getService`, `getFaqs`, `getTestimonials`, `getClients`) are server-only and run at build time. Markdown renders through unified (GFM, slugged headings with anchors, TOC extraction, lazy images, external links opened in a new tab) to an HTML string shown inside `.prose-tpa`.
- `assets/cover-library/blog/` holds spare AI-generated covers (leadership, investment readiness, public sector, youth talent) that aren't shipped. When a new post needs one, copy it into the post's folder as `cover.webp`. The prompts for generating more images are in `docs/ai-image-brief.md`.
- `draft: true` entries show in dev only. Posts with `featured: true` lead the lists. Testimonials marked `placeholder: true` are stand-in copy that must be replaced with real client quotes before launch.
- `app/sitemap.ts`, `app/robots.ts` and `app/rss.xml/route.ts` are generated statically from the CMS.

## Commands

```bash
npm run dev     # sync CMS assets, then next dev (Turbopack)
npm run build   # sync CMS assets, then next build → static site in out/
npm run cms:watch  # keep public/cms in sync while editing content images
npm run preview    # serve out/ locally (run after build)
npm run typecheck  # tsc --noEmit (no lint or test scripts are configured)
```

npm is the package manager (`package-lock.json`). Earlier commits used a pnpm/turbo monorepo (`apps/web`, `packages/*`). That layout was deleted, so ignore any references to it.

## Stack notes

- Next.js 16 App Router, React 19, TypeScript strict. Path alias is `@/*` → repo root.
- Tailwind CSS v4 is loaded through the `@tailwindcss/turbopack` loader rule in `next.config.ts`, not PostCSS. There's no `tailwind.config`; configure it CSS-first in `app/globals.css` (`@import "tailwindcss"`, `@theme`).
- `experimental.agentFeedback` is enabled in `next.config.ts`.
- **Tailwind tokens:** the default Tailwind palette is removed (`--color-*: initial`), so only brand scales exist (`navy`, `gold`, `ivory`, `ink`, `clay`, `sage`, `ember`, 50–950). In components, prefer the semantic utilities (`bg-canvas`, `bg-surface`, `text-fg`, `text-fg-muted`, `text-heading`, `text-accent`, `bg-primary`, `border-line`, …). They flip automatically inside an `.on-dark` section (or `data-surface="dark"`). Custom variants: `on-dark:`, `motion-ok:`, `pointer-fine:`. Custom utilities include `container-page`, `eyebrow`, `em-accent`, `link-underline`, `bg-grain`, `bg-aurora-navy`, `bg-dot-grid`, `line-mask`, `prose-tpa`, and others in `globals.css` §4 and §6.
- **`cn()` (`lib/utils.ts`)** wraps an extended `tailwind-merge`. When you add a custom utility whose name shares a prefix with a built-in one (`bg-*`, `text-*`, `mask-*`), register it there, or `cn()` will silently drop one of the classes.
- **Fonts** load via `next/font/google` in `app/layout.tsx` (CSS vars `--font-fraunces`, `--font-instrument`, `--font-plex-mono` → `font-display`, `font-sans`, `font-mono`).
- **Motion:** `lib/motion.ts` registers GSAP (ScrollTrigger, SplitText, DrawSVG, `useGSAP`) and exports duration, ease and stagger tokens. Call `registerGsap()` in client components before using plugins. `components/providers/smooth-scroll.tsx` runs Lenis on the GSAP ticker, wraps the app in `layout.tsx`, and is skipped under `prefers-reduced-motion`. three.js / R3F / drei are installed for the hero; load them lazily on the client only.
- **Site-wide motion** (mounted in `app/layout.tsx`): `components/site/preloader.tsx` (first visit per session; an inline head script adds `.no-preload` on repeat visits), `components/providers/page-transition.tsx` (curtain on internal link clicks; it listens in the **capture phase** so it runs before Next `<Link>`, so keep it that way), `components/site/cursor.tsx` (follower ring; add `data-cursor="Label"` to any element to show a label), and `components/site/back-to-top.tsx`.
- **Motion primitives** live in `components/motion/`: `Reveal` (mark children with `data-reveal`, or pass `self`), `SplitHeading`, `ClipReveal`, `Parallax`, `DrawLine`, `Counter`, `ScrubText`, `StackCards`, `HorizontalScroll` (mark items with `data-hitem`), `VelocityMarquee`, `Marquee`, `Tilt`, `Spotlight`, `Magnetic`, `Scramble`, `WordRotator`, `FloatGraphic`, `AfricaMap`. Each section should pick a different combination. Elements hidden before their reveal (`data-reveal`, `data-split`, `data-clip`) are only hidden when JS runs and motion is allowed, so they always need a component that reveals them.
- **Page sections** are grouped by page: `components/home`, `components/about`, `components/services`, `components/blog`, plus shared site pieces in `components/site`. `lib/geo.ts` holds the Africa outline used by the 3D hero and the SVG map.
- **`lib/site.ts`** holds site constants (contact, offices, socials, nav, CTA).

## SEO

- Every page builds its metadata with `pageMeta()` from `lib/seo.ts` (title, description, canonical, full Open Graph and Twitter set). Don't hand-write `openGraph` on a page: Next replaces the parent object, so partial blocks drop tags.
- Share images are 1200×630 PNGs rendered at build time by `app/og/[card]/route.tsx` to `out/og/<name>.png`, using fonts in `assets/og/`. The list lives in `lib/og-cards.ts` (static pages plus one per service and post). A new page needs a card there and `og: "<name>"` in its `pageMeta()` call. The `opengraph-image.tsx` file convention isn't used because static export writes those files without an extension.
- JSON-LD builders live in `lib/seo.ts` and render through `components/site/json-ld.tsx`: `Organization` in the layout, `WebSite` and `FAQPage` on home (`<Faq structuredData />`), `Service` and `BreadcrumbList` on service pages, `BlogPosting` and `BreadcrumbList` on posts.
- Icons are `app/favicon.ico`, `app/icon.png` and `app/apple-icon.png`; `app/manifest.ts` points at `public/brand/icon-*.png`.
- Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and `NEXT_PUBLIC_BING_SITE_VERIFICATION` at build time for Search Console and Bing.
- `public/_redirects` and `public/_headers` (Netlify / Cloudflare Pages format) hold the v1 → v2 301s, security headers and cache rules. Mirror them in `vercel.json` if the site is hosted on Vercel.
