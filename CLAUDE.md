# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project brief

This repo is v2 of the marketing website for **The Plug Afrique**. The goal is a premium ("$9,000-grade") site that looks much better than v1. Bring all the UI skills to bear (see the global UI/UX rules: `ui-ux-pro-max`, Magic UI / React Bits MCPs, GSAP, three.js).

**Read [`DESIGN.md`](DESIGN.md) before any UI work. It is the house design system and wins over generic skill defaults.** It covers the "Sapphire & Gold Editorial" direction, adopted and rejected styles, the colour scales and semantic tokens (with verified contrast), type (Fraunces / Instrument Sans / IBM Plex Mono), layout, surfaces and motifs, the motion system (which effects to use per section, easing and duration tokens, the reduced-motion map, performance budget), component specs and page blueprints. It's implemented in `app/globals.css`. Change both together. `/styleguide` renders every token for visual checks.

- **v1 (reference only, do not modify):** `/home/emeka/web/client_projects/theplugafrique`, an Express + EJS + Bootstrap app. Its content and assets have already been migrated here:
  - **`docs/brand.md`** is the brand book: narrative, philosophy, the five service areas, voice, contact details and offices. Use it as the source of truth for copy.
  - **`docs/assets.md`** is the manifest for everything in `public/` (`brand/`, `images/{photography,backgrounds,clients,theme-placeholders}/`, `icons/{social,contact,ui,philosophy,features,decorative}/`, `fonts/font-awesome/`). Keep it updated when adding assets.
  - `images/theme-placeholders/` holds stock images from v1's template (including the "Budgeto" logo). They are not brand assets.
- **Static export is required.** The site must build to `out/` (`output: "export"`, `trailingSlash: true` and `images.unoptimized` in `next.config.ts`). That means no server runtime: no API routes, no server actions, no ISR, and no on-demand `next/image` optimization (use `images.unoptimized` or a build-time approach). Dynamic routes need `generateStaticParams`.
- **File-based CMS lives in this repo.** Services, blog posts, and similar collections are authored as Markdown (frontmatter + body) with thumbnail/cover image files alongside, and read at build time. Nothing comes from an external CMS.

## CMS (`content/` + `lib/cms/`)

- Collections live in `content/`: `blog/<slug>/index.md`, `services/<slug>/index.md` (each with a `cover.webp` next to it), `authors/*.md`, `testimonials/*.md`, `faq/*.md`, and `clients.json`. The folder or file name is the slug.
- Frontmatter is validated with zod in `lib/cms/schema.ts`. Invalid or missing fields, an unknown author or a missing image **fail the build** and name the offending file. To add a field, update the schema and the loader in `lib/cms/index.ts`.
- Write asset paths relative to the Markdown file (`./cover.webp`). They resolve to `/cms/<collection>/<slug>/…`. `scripts/sync-cms-assets.mjs` copies every non-Markdown file from `content/` to `public/cms/` (gitignored) before `dev` and `build`. Run `npm run cms:watch` alongside dev while editing content images.
- Loaders (`getPosts`, `getPost`, `getLatestPosts`, `getRelatedPosts`, `getCategories`, `getServices`, `getService`, `getFaqs`, `getTestimonials`, `getClients`) are server-only and run at build time. Markdown renders through unified (GFM, slugged headings with anchors, TOC extraction, lazy images, external links opened in a new tab) to an HTML string shown inside `.prose-tpa`.
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
