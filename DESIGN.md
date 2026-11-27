# DESIGN.md: The Plug Afrique v2 design system

> **Direction in one sentence:** *Sapphire & Gold Editorial*: a quiet-luxury, magazine-grade consultancy site in the logo's deep sapphire navy and warm Afrique gold, on ivory paper. It is warmed by grain, earthy clay accents and restrained Afrofuturist geometry, and brought to life by a motion language about **connection**: lines that draw, nodes that link, content that "plugs in."

This file is the single source of truth for how the site looks and moves. Tokens defined here are implemented in `app/globals.css` (Tailwind CSS v4, CSS-first). Brand voice and copy live in `docs/brand.md`; assets are catalogued in `docs/assets.md`. If code and this document disagree, fix one of them. Don't let them drift.

Sources this was distilled from: the TPA logo (`public/brand/tpa-logo.png`), v1's palette and type, `docs/brand.md`, and two reference lists: *UI & Web Design Styles: The Big List* and *Web Motion Glossary: Effects, Scroll Triggers & Transitions* (Nov 2026).

---

## 0. Design principles

1. **Connection is the concept.** Every signature moment should express "plugging people, ideas and opportunities together": lines joining points, elements snapping into place, sections handing off to each other. If an effect doesn't serve that idea or readability, cut it.
2. **Editorial calm, not corporate template.** Big serif headlines, generous whitespace, asymmetric compositions, real hierarchy. Each section has one job.
3. **African warmth without costume.** Pan-African identity comes through palette (gold, clay, ivory), photography of real African professionals, and *abstracted* geometric motifs. No clip-art maps, tribal-print wallpaper or safari clichés.
4. **Premium = restraint + polish.** Fewer elements, better executed. Slow, confident easing. Pixel-aligned details. Gold is precious: use it sparingly.
5. **Accessible by default.** WCAG 2.2 AA contrast, keyboard-first, `prefers-reduced-motion` honoured everywhere, with content always visible without JS.

---

## 1. Style selection (from *UI & Web Design Styles: The Big List*)

### Adopted (the TPA blend)

| Style (from the list) | Role in TPA | How it shows up |
|---|---|---|
| **Editorial / Magazine** | *Primary* | Oversized serif headlines, italic emphasis words, pull-quotes, numbered chapters (01/02/03), image-led layouts. |
| **Quiet luxury / Old money** | *Primary* | Ivory paper backgrounds, muted creams, understated hairlines, nothing shouty. |
| **Classic serif elegance** | *Primary* | Fraunces display serif with optical sizing; restrained palette. |
| **Dark luxury** | *Section accent* | Full-bleed sapphire-navy sections (hero band, philosophy, CTA, footer) with gold metallic accents. |
| **Whitespace-driven / Editorial minimal** | Layout | Big margins, few words per screen, a strict measure on body copy. |
| **Big type / Oversized typography** | Hero and section openers | Display sizes up to ~9rem on desktop, tight tracking. |
| **Broken grid / Asymmetric layout** | Composition | Images that bleed off the grid, overlapping captions, off-centre balance. |
| **Bento grid** | Services and "Why TPA" | Varied-size rounded tiles for the five practice areas and four differentiators. |
| **Textured / Grain UI** | Atmosphere | A subtle film-grain overlay on navy sections and image frames, so surfaces feel tactile. |
| **Aurora / Mesh gradient UI** | Atmosphere, *subtle only* | Slow, low-opacity sapphire-to-navy glows with a faint gold ember behind dark sections. Never rainbow. |
| **Afrofuturism** | Cultural layer, *subtle* | Geometric patterns inspired by Adinkra/kente structure (grids, chevrons, concentric rings) as hairline line-art, plus the "connection network" 3D hero. |
| **Earthy / Terracotta palette** | Tertiary accent | Clay used for small highlights, tags and illustrations (≤3% of any screen). |
| **Line art / Monoline** | Iconography and motifs | 1.5px monoline icons and patterns, so lines become the brand's graphic device. |
| **Scrollytelling / Long-scroll storytelling** | Home and About | The brand story (Essence → Story → Philosophy → Services → Invitation) unfolds as you scroll. |
| **Immersive 3D / WebGL** | Hero only | One three.js scene: a network of gold nodes and arcs over an abstract dot-matrix Africa. |
| **Micro-interactions / Cursor-driven** | Interaction | Magnetic CTAs, letter-roll buttons, spotlight cards, underline-grow links. |
| **High contrast / Accessibility-first** | Constraint | Every text pairing is AA or better (see §2.5). |

### Explicitly rejected

Glassmorphism-heavy UIs and Liquid Glass (too tech-product; only a light frosted nav bar is allowed), Neumorphism, Claymorphism, Neo-brutalism, Anti-design, Glitch/Acid/Cyberpunk/Neon, Synthwave/Vaporwave/Y2K, Memphis, Corporate Memphis illustrations, Dopamine/candy colours, Holographic, Kawaii and pastel-heavy UIs, and the **purple-gradient-on-white AI look**. `public/images/backgrounds/abstract-gradient-waves.jpg` is off-palette for that reason. Don't use it un-tinted.

---

## 2. Colour

### 2.1 Brand anchors

| Name | Hex | Source |
|---|---|---|
| **Sapphire Navy** | `#002055` | Sampled from the TPA logo. This is `navy-900`. v1's `#1A2637` was *not* the logo colour; it is superseded. |
| **Afrique Gold** | `#F2CB7A` | v1 secondary accent. This is `gold-300`. |

**Supporting colours that go with them:** navy is a cool, deep blue, and gold is its warm complement (blue ↔ yellow-orange), which gives the premium navy/gold pairing. To keep it from feeling cold or "banking-corporate", it sits on **warm ivory** neutrals (yellow-tinted whites, not blue-white) and picks up **clay/terracotta**, an earthy red-orange that is analogous to gold and grounds the African warmth. **Sage** (a muted baobab green) serves as success. **Ink** is a navy-tinted neutral, so greys always feel related to the brand blue.

### 2.2 Full scales (50 → 950)

Generated in OKLCH so lightness steps are perceptually even, with the anchor pinned at its step.

| Step | `navy` | `gold` | `ivory` (warm neutral) | `ink` (cool neutral) | `clay` | `sage` | `ember` |
|---|---|---|---|---|---|---|---|
| 50 | `#f2f7ff` | `#fdf8ec` | `#fdfaf4` | `#f5f7f9` | `#fef4f1` | `#f1f9f5` | `#fff4f2` |
| 100 | `#e3eefe` | `#fbf0d6` | `#f7f2e8` | `#e8ebf1` | `#fee7df` | `#e3f1e9` | `#fee7e3` |
| 200 | `#c7dcfe` | `#f7e2b0` | `#ece6d8` | `#d3d8e0` | `#fdcfbe` | `#c9e2d4` | `#ffcdc6` |
| 300 | `#a2c2f5` | **`#f2cb7a`** | `#d8d0c0` | `#b7beca` | `#f2ad94` | `#a5ccb7` | `#ffa699` |
| 400 | `#79a2e4` | `#e5b356` | `#b2aa9a` | `#9199a6` | `#dd8565` | `#7eb196` | `#f57c6e` |
| 500 | `#5583cc` | `#cf9838` | `#8c8577` | `#6c7584` | **`#c2603b`** | `#5a9678` | `#e05749` |
| 600 | `#3967b2` | `#ad7a26` | `#6e685c` | `#525b6c` | `#a84319` | **`#3e7d5f`** | **`#c8372d`** |
| 700 | `#224d92` | `#8a5e1d` | `#544f45` | `#3b4558` | `#8b2f02` | `#276348` | `#a41914` |
| 800 | `#113875` | `#6c4919` | `#3e3a31` | `#263043` | `#6e2401` | `#154d35` | `#820104` |
| 900 | **`#002055`** | `#4f3514` | `#2a261f` | `#131d2f` | `#4e1701` | `#023521` | `#580001` |
| 950 | `#001135` | `#2e1e0a` | `#16130e` | `#050d1e` | `#2f0b00` | `#001f11` | `#360000` |

Tailwind utilities: `bg-navy-900`, `text-gold-300`, `border-ivory-200`, and so on. The default Tailwind palette is **removed** (`--color-*: initial`), so `blue-500` and its siblings don't exist. That's deliberate: it forces on-brand choices.

### 2.3 Roles and proportions

| Role | Token | Share of a typical screen |
|---|---|---|
| Canvas / paper | `ivory-50` (alt: `ivory-100`) | ~60% |
| Brand / structure (dark sections, headings, primary buttons) | `navy-900`, `navy-950` | ~30% |
| Accent (CTAs on dark, emphasis words, rules, nodes) | `gold-300` (on dark), `gold-700` (text on light) | ≤8% |
| Earth accent (tags, small illustration fills, hover hints) | `clay-500/600` | ≤2–3% |
| Body text on light | `ink-900`; muted: `ink-600` | — |
| Body text on dark | `ivory-50`; muted: `ivory-300` / `navy-200` | — |

Rules:
- Gold **never** appears as body text on ivory, because it fails contrast. On light surfaces use `gold-700`+ for gold-coloured text, or use gold as a fill/rule/underline.
- One gold CTA per viewport. Gold loses its value if it's everywhere.
- Don't place clay next to ember (they read as an error state).
- Prefer navy-tinted shadows (`shadow-*` tokens) over neutral black shadows.

### 2.4 Semantic tokens (theme-aware)

Components use **semantic** utilities so the same component works on ivory and navy sections. Wrap a dark section in `.on-dark` (or `data-surface="dark"`) and the tokens flip.

| Utility | Light (`:root`) | `.on-dark` |
|---|---|---|
| `bg-canvas` | ivory-50 | navy-950 |
| `bg-surface` | white | navy-900 |
| `bg-surface-muted` | ivory-100 | navy-800 |
| `bg-surface-raised` | white | navy-800 |
| `bg-inverse` / `text-on-inverse` | navy-900 / ivory-50 | ivory-50 / navy-950 |
| `text-fg` | ink-900 | ivory-50 |
| `text-fg-muted` | ink-600 | ivory-300 |
| `text-fg-subtle` | ink-500 (non-essential text ≥18px only) | navy-300 |
| `text-heading` | navy-900 | ivory-50 |
| `text-accent` | gold-700 | gold-300 |
| `bg-accent` / `text-on-accent` | gold-300 / navy-950 | gold-300 / navy-950 |
| `bg-primary` / `text-on-primary` | navy-900 / ivory-50 | gold-300 / navy-950 |
| `bg-primary-hover` | navy-800 | gold-200 |
| `border-line` | ivory-200 | white @ 12% |
| `border-line-strong` | ivory-300 | white @ 24% |
| `ring-focus` / `outline-focus` | gold-600 | gold-300 |
| `text-success` / `text-warning` / `text-danger` / `text-info` | sage-700 / gold-800 / ember-600 / navy-600 | sage-300 / gold-300 / ember-300 / navy-300 |

### 2.5 Verified contrast (WCAG 2.x)

| Pair | Ratio | Use |
|---|---|---|
| navy-900 on ivory-50 | **15.1:1** | headings, primary text |
| ink-900 on ivory-50 | >15:1 | body |
| ink-700 on ivory-50 | 9.3:1 | secondary body |
| ink-600 on ivory-50 | 6.6:1 | muted body (AA) |
| ink-500 on ivory-50 | 4.46:1 | **large text / placeholders only** |
| ivory-50 on navy-900 | 15.1:1 | text on dark |
| ivory-300 on navy-900 | 10.2:1 | muted text on dark |
| gold-300 on navy-900 | 10.2:1 | accent text on dark |
| navy-950 on gold-300 | 12.0:1 | gold button label |
| navy-950 on gold-500 | 7.3:1 | gold hover/pressed state |
| gold-700 on ivory-50 | 5.5:1 | gold text on light (AA) |
| clay-600 on ivory-50 | 5.8:1 | clay text on light |
| sage-700 on ivory-50 | 6.8:1 | success text |
| ember-600 on ivory-50 | 5.0:1 | error text |
| white on navy-600 | 5.6:1 | info badges |

### 2.6 Gradients and atmosphere

- `bg-aurora-navy`: radial glows of navy-700/800 over navy-950 with a faint gold-500 ember at ~8% opacity. Used on the hero band, philosophy and CTA.
- `text-gradient-gold`: gold-200 → gold-300 → gold-500 sweep for *one* emphasis word on dark sections.
- `bg-grain`: an SVG fractal-noise overlay at 6–10% opacity on dark sections and image frames.
- `bg-dot-grid` / `bg-line-grid`: hairline pattern utilities (the "connection grid") at very low contrast.

---

## 3. Typography

### 3.1 Typefaces

| Role | Family | Why |
|---|---|---|
| **Display / headings** | **Fraunces** (variable: `opsz`, `SOFT`, `WONK`, weight 100–900) | An expressive "old-style soft serif" with optical sizing. Large sizes get dramatic high contrast; the soft axis adds warmth. It's a premium, editorial step up from v1's DM Serif Display, and its axes can be animated (variable-font animation, see §7). |
| **Body / UI** | **Instrument Sans** (variable: weight 400–700, `wdth` 75–100) | A crisp, contemporary grotesk with character. It's less generic than Inter or DM Sans, and the width axis allows condensed labels. |
| **Mono / eyebrows / data** | **IBM Plex Mono** (400, 500) | Small uppercase eyebrows, numbering (01/02/03), stats, metadata. It adds an "advisory report" precision. |

All three load through `next/font/google` in `app/layout.tsx`, are self-hosted at build time (works with static export), and use `display: swap`. CSS variables: `--font-fraunces`, `--font-instrument`, `--font-plex-mono`. Tailwind: `font-display`, `font-sans`, `font-mono`.

### 3.2 Type scale (fluid, 360px → 1440px)

| Token | Size (clamp) | Line height | Tracking | Weight | Use |
|---|---|---|---|---|---|
| `text-display-2xl` | 3.5rem → 9rem | 0.92 | -0.035em | 350 | Home hero only |
| `text-display-xl` | 3rem → 6.5rem | 0.95 | -0.03em | 350 | Page heroes |
| `text-display-lg` | 2.5rem → 4.75rem | 1.0 | -0.025em | 400 | Section openers |
| `text-display-md` | 2rem → 3.5rem | 1.05 | -0.02em | 400 | Sub-sections, CTA bands |
| `text-display-sm` | 1.625rem → 2.25rem | 1.12 | -0.015em | 450 | Card titles (large), quotes |
| `text-heading-lg` | 1.375rem → 1.75rem | 1.2 | -0.01em | 500 | h3 |
| `text-heading-md` | 1.1875rem → 1.375rem | 1.3 | -0.005em | 600 | h4, card titles |
| `text-lead` | 1.125rem → 1.375rem | 1.55 | 0 | 400 | Intro paragraphs |
| `text-base` | 1rem → 1.0625rem | 1.65 | 0 | 400 | Body |
| `text-sm` | 0.875rem | 1.55 | 0.005em | 400 | Captions, meta |
| `text-xs` | 0.75rem | 1.5 | 0.01em | 500 | Legal, tiny labels |
| `text-eyebrow` | 0.75rem → 0.8125rem | 1.2 | 0.18em | 500 | Mono uppercase section labels |
| `text-stat` | 3rem → 5.5rem | 1 | -0.04em | 300 | Counter numbers (display font, tabular) |

The intermediate `text-lg`/`text-xl`/`text-2xl` utilities exist for UI, but marketing headings should use the semantic display/heading tokens.

### 3.3 Typographic rules

- **Signature move, inherited from v1:** one emphasised word or phrase per headline is set in *Fraunces italic*, in `text-accent`. Example: "Connecting people, ideas and opportunities *for impact.*" Use the `.em-accent` class or an `<em>` inside a `.display` heading.
- Headings: `text-wrap: balance`. Body: `text-wrap: pretty`. Body measure is `max-w-prose` (**68ch**); leads use `max-w-[52ch]`.
- Fraunces: drive `font-variation-settings` via `--fraunces-soft` (0–100) and `--fraunces-wonk` (0/1). Defaults: `SOFT 50`, `WONK 0`. Hero: `SOFT 100`, `opsz` auto.
- Numbers: `tabular-nums` for stats, `oldstyle-nums` inside long-form prose.
- Eyebrows: Plex Mono, uppercase, `tracking-eyebrow`, prefixed with a 24px gold hairline or a `01 /` index.
- Never set display type in all caps, and never letter-space body text.
- Use British English throughout (see brand.md §8).

---

## 4. Layout, grid and spacing

- **Base unit:** 4px (`--spacing: 0.25rem`, Tailwind default). Rhythm uses multiples of 8.
- **Containers:** `container-page` = `max-w-[88rem]` (1408px) + fluid gutter `px-gutter` (`clamp(1.25rem, 4vw, 3.5rem)`). Narrow reading column: `max-w-[44rem]`. Wide bleed: `max-w-[110rem]`.
- **Grid:** 12 columns on ≥`lg`, 6 on `md`, 4 on mobile; column gap `gap-x-6 lg:gap-x-8`.
- **Section rhythm:** `py-section` (`clamp(5rem, 11vw, 10rem)`); tight sections `py-section-sm` (`clamp(3.5rem, 7vw, 6rem)`).
- **Breakpoints:** `sm 40rem`, `md 48rem`, `lg 64rem`, `xl 80rem`, `2xl 96rem`, `3xl 120rem`. Design mobile-first, and test at 360, 768, 1024, 1440 and 1920.
- **Composition:** break the grid on purpose. Images may bleed to the viewport edge on one side, captions overlap images by 1–2 columns, and headlines can span 8–10 columns while body sits in 5.
- **Bento:** a 6-column bento on `lg` with tiles spanning 2/3/4 columns, rounded `rounded-2xl`, one "hero tile" per bento.

---

## 5. Surfaces, shape and depth

| Token | Value | Use |
|---|---|---|
| `rounded-xs` | 4px | Tags, small chips |
| `rounded-sm` | 6px | Inputs |
| `rounded-md` | 10px | Buttons (secondary), small cards |
| `rounded-lg` | 16px | Cards |
| `rounded-xl` | 24px | Bento tiles, image frames |
| `rounded-2xl` | 32px | Large feature panels |
| `rounded-pill` | 999px | Primary CTA buttons, pills |
| `rounded-arch` | `999px 999px 0 0` | Arch-topped portrait frames (a subtle architectural, Afro-modern motif) |

- **Borders:** hairlines are the default divider (`border-line`, 1px). On dark sections use white at 12%. A gold 1px rule marks chapter starts.
- **Shadows (navy-tinted, soft and layered):** `shadow-xs` (hairline lift), `shadow-sm`, `shadow-md` (cards at rest), `shadow-lg` (hover lift), `shadow-xl` (modals and menus), `shadow-glow-gold` (focus/CTA glow on dark). Never use pure-black shadows.
- **Elevation model:** canvas → surface → raised → overlay. At most two elevation levels per section.
- **Glass (sparingly):** only the sticky header once it's scrolled, `bg-canvas/75 backdrop-blur-xl` with a bottom hairline.

### Motifs

1. **The Plug Line:** a 1.5px line that connects two elements (an eyebrow to a heading, a step to a step, a city to a city), drawn on scroll. It's the core brand graphic.
2. **Nodes:** 6–10px gold dots marking connection points. They pulse (`animate-ping-soft`) only for the one live element.
3. **Concentric rings:** taken from the "Connection" philosophy icon (broadcasting signal). Hairline rings are used behind portraits and stats.
4. **Geometric band:** a hairline chevron/diamond pattern inspired by kente strip structure, used as a thin divider band at no more than 10% opacity.

---

## 6. Imagery and iconography

- **Photography:** real African professionals collaborating in warm, modern settings; Lagos and Abuja cityscapes; culture and creative work (music, art, literature). Prefer natural light and shallow depth of field. Current on-brand set: `public/images/photography/*`. The AI portraits need their watermarks removed first.
- **Treatment:** a `duotone-navy` utility (navy-950 shadows → ivory highlights) for secondary images and team grids; full-colour for hero and story images. Image frames use `rounded-xl` or `rounded-arch` plus grain.
- **Aspect ratios:** hero 16/10 (desktop) → 4/5 (mobile); portrait 4/5; cards 3/2; blog cover 16/9; OG image 1200×630.
- **Icons:** use the extracted v1 set in `public/icons/*` for social, contact and philosophy. For anything new use **Lucide** (`lucide-react`) at `strokeWidth={1.5}`, sized 20/24px, `currentColor`. Never mix filled and outline icons in one group.
- **Client logos:** monochrome (`grayscale opacity-70` → full on hover) inside the logo marquee, normalised to equal optical height.

---

## 7. Motion system (from the *Web Motion Glossary*)

### 7.1 Principles

- **Trigger → Effect → Timing**, all deliberate. Motion explains (what changed, where it came from) or delights *once*. It never blocks reading.
- **Ease-out for entering, ease-in for leaving, ease-in-out for moving.** Nothing linear except marquees and progress bars.
- **Animate `transform`, `opacity`, `clip-path` and `filter` only.** Target 60fps.
- **Respect `prefers-reduced-motion`:** swap every movement for a short fade or nothing. Content is visible without JS (no `opacity: 0` in server HTML unless it's gated by a `.js` class).

### 7.2 Tokens (CSS + `lib/motion.ts`)

| Token | Value | Use |
|---|---|---|
| `--duration-instant` | 100ms | Press feedback |
| `--duration-fast` | 180ms | Hover colour/opacity |
| `--duration-base` | 280ms | Most UI transitions |
| `--duration-slow` | 450ms | Reveals, drawers |
| `--duration-slower` | 700ms | Section reveals, line masks |
| `--duration-cinematic` | 1200ms | Hero intro, page curtain |
| `ease-out-expo` (`cubic-bezier(0.16,1,0.3,1)`) | | **Default enter**: luxurious deceleration |
| `ease-out-quart` (`cubic-bezier(0.25,1,0.5,1)`) | | UI enters, hovers |
| `ease-in-quart` (`cubic-bezier(0.5,0,0.75,0)`) | | Exits |
| `ease-in-out-quint` (`cubic-bezier(0.83,0,0.17,1)`) | | Curtains, wipes, cross-screen moves |
| `ease-spring` (`cubic-bezier(0.34,1.56,0.64,1)`) | | Small pops (badges, toggles) only |
| Stagger | 60ms (items), 90ms (lines), 25ms (chars) | Group choreography |
| GSAP equivalents | `expo.out`, `quart.out`, `quart.in`, `power4.inOut`, `back.out(1.6)` | |

### 7.3 Selected effects by category

| Category | Use these | Avoid |
|---|---|---|
| **Scroll** | Smooth/inertia scroll (**Lenis**, synced to GSAP ScrollTrigger) · Fade-up on enter + **staggered reveal** · **Line mask reveal** for headings · **Path drawing on scroll** (the Plug Line) · **Pin-and-scrub** for Philosophy 01→02→03 · **Mask/clip-path reveal** on images · **Counter roll-up** for stats · **Section colour transition** (ivory → navy as the dark chapters arrive) · **Stacking cards** for the five service areas (desktop) · **Marquee on scroll** for client logos · **Hide-on-scroll smart header** + shrinking header · **Scroll progress bar** on blog posts · **Text reveal on scroll** for the brand manifesto paragraph · Gentle **multi-layer parallax** (≤8% travel) on hero imagery | Scroll-jacking, horizontal-scroll hijack on mobile, scroll velocity skew, image-sequence scroll, infinite scroll |
| **Page transitions** | **Curtain / overlay** (navy panel with gold hairline, `ease-in-out-quint`) · **Preloader-to-page** on first visit only (logo "tpa" draws in, then the curtain lifts, under 1.6s, skipped on repeat visits) · **View Transitions API** for blog card → post cover (**shared element**) | Cube/flip/3D page rotation, iris reveals |
| **Micro-interactions** | Button press scale (0.97) · **Letter roll / text slide-up on hover** for CTAs · **Underline grow** on links · **Icon morph** (menu ↔ close) · **Floating labels** + **shake on error** + **success state** on the contact form · **Tab indicator slide** on blog categories · Toast slide-in · Accordion **expand/collapse** for FAQ · Dropdown fade-scale from anchor | Ripple, confetti, heart bursts |
| **Hover / cursor** | **Magnetic button** (primary CTAs, max 8px pull) · **Hover lift** on cards · **Image hover zoom** (1.04) inside frames · **Spotlight / glow follow** on bento tiles (gold at 8%) · **Image reveal on hover (list)** for the services index · Small **custom cursor** ring with **label cursor** ("View", "Read") on media, desktop pointer only | Cursor trails, gooey/liquid, distortion everywhere |
| **Text** | **Split text reveal** (lines → words) on display headings · **Word rotator** in the hero ("people · ideas · opportunities") · **Variable font animation** (Fraunces `SOFT`/`wght` easing on hover/reveal) · **Marker draw** (gold underline stroke) under one key phrase · **Counter / odometer** for stats · **Marquee** for "Let's plug in —" CTA band | Typewriter, glitch, wavy letters, scramble on body text |
| **Image / background** | Slow **Ken Burns** on hero stills (20s) · **Image curtain reveal** · **Mesh gradient / aurora blobs** (navy/gold, slow) · **Noise / grain** (static, or very slow shift) · **Infinite logo marquee** · **Grayscale-to-colour** on client logos · **Lightbox** for gallery | Video backgrounds on mobile, particle confetti, pixelate dissolves |
| **3D / WebGL** | Hero **"Connection Network"**: a three.js / R3F particle field forming an abstract Africa dot-map; gold arcs link Lagos, Abuja and other capitals; mouse parallax tilts the scene ±4°; arcs draw on load. Optional **globe/map animation** variant on Contact. | Heavy shader distortion, fluid sims, multiple canvases per page |
| **Loading** | Preloader (first visit only) · **Top loading bar** on route change · **Blur-up** LQIP images · **Lazy-load fade-in** · **Skeleton shimmer** for any client-side search | Spinners as the primary loader |

### 7.4 Section choreography (home)

1. **Preloader** (first visit): the "tpa" monogram strokes draw (800ms), then the navy curtain lifts (`ease-in-out-quint`, 900ms).
2. **Hero:** headline line-mask reveal (90ms line stagger, `expo.out`, 1000ms) → lead fades up (+200ms) → CTAs pop (+120ms stagger) → the 3D network's arcs begin drawing → word rotator starts after 2.5s.
3. **Client marquee:** constant 40s loop; speed follows scroll velocity a little (≤1.5×).
4. **Essence / manifesto:** text reveal on scroll (words go from `fg-subtle` to `fg`) with scrubbing.
5. **Story:** clip-path image reveal + parallax; the Plug Line draws from the eyebrow to the heading.
6. **Philosophy (dark):** section colour transition to navy; pin-and-scrub through Clarity → Connection → Creation; icons draw; the 01/02/03 counter flips.
7. **Services:** stacking cards (desktop) / staggered reveal (mobile); spotlight hover.
8. **Why TPA (bento):** staggered fade-up, counters roll up.
9. **Testimonials:** crossfade carousel with drag inertia; pause control.
10. **FAQ:** accordion.
11. **Invitation CTA (dark aurora):** marquee "Let's plug in —"; magnetic gold CTA.
12. **Footer:** a large wordmark reveals as the page ends (outline-to-fill on scroll).

### 7.5 Reduced-motion map

| Full motion | Reduced |
|---|---|
| Lenis smooth scroll | Native scroll |
| Line masks / split text / staggers | Instant, or 150ms opacity fade |
| Parallax / Ken Burns / 3D tilt / magnetic | Disabled; the 3D hero renders one static frame |
| Pin-and-scrub | Unpinned, all steps visible stacked |
| Marquees | Static wrapped row, or paused with a play control |
| Page curtain / preloader | Simple 150ms crossfade / skipped |

### 7.6 Performance budget

LCP < 2.0s (hero text is HTML, not canvas), CLS < 0.05, INP < 150ms. JS for motion is under 90kB gz on non-hero pages. three.js loads only on the home hero, lazily, after first paint, with `dpr={[1, 1.75]}`, paused when off-screen or the tab is hidden, and a static image fallback for low-power devices.

### 7.7 Libraries

| Need | Library |
|---|---|
| Timelines, ScrollTrigger, SplitText, DrawSVG-style paths | **GSAP** + `@gsap/react` (`useGSAP`) |
| Smooth scroll | **Lenis** (driven by the GSAP ticker) |
| 3D hero | **three** + `@react-three/fiber` + `@react-three/drei` |
| Simple hovers/enters | CSS transitions + the keyframes in `globals.css` |
| Page/shared-element transitions | View Transitions API (progressive enhancement) + a GSAP curtain |
| Component inspiration | Magic UI and React Bits MCPs (marquee, number ticker, spotlight card, text reveal, magnetic), adapted to these tokens |

---

## 8. Components (spec)

| Component | Spec |
|---|---|
| **Button: primary** | `rounded-pill`, `h-12 px-7` (lg `h-14 px-8`), `bg-primary text-on-primary`, Instrument Sans 500. Letter-roll label on hover, magnetic, a trailing arrow that slides 4px. Press: `scale-[0.97]`. Focus: 2px `outline-focus` with 3px offset. |
| **Button: accent** | As primary but `bg-accent text-on-accent` (gold). One per viewport, mainly on dark sections. |
| **Button: secondary** | `border border-line-strong bg-transparent text-heading`, hover `bg-surface-muted`. |
| **Link** | `link-underline`: 1px underline that grows from the left (`--duration-base`, `ease-out-quart`). |
| **Eyebrow** | `eyebrow`: Plex Mono, uppercase, `tracking-eyebrow`, `text-accent` on dark / `text-fg-muted` on light, with a leading 24px gold rule or index `01 /`. |
| **Section header** | Eyebrow → display heading (with `.em-accent`) → lead (52ch). Left-aligned by default; centred only for CTA bands. |
| **Header / nav** | 80px → 64px when shrunk; transparent over the hero, frosted `bg-canvas/75` after 40px of scroll; hides on scroll-down and shows on scroll-up. Links: Home, About, Services, Insights (blog), Contact. CTA: "Let's plug in". Mobile: a full-screen navy overlay menu with a staggered link reveal and big Fraunces links. |
| **Service card** | `rounded-xl bg-surface border-line shadow-sm` → hover `shadow-lg -translate-y-1` + spotlight. Index number (mono), title (heading-lg), 2-line summary, sub-services as hairline list, arrow link. |
| **Bento tile** | `rounded-xl`, padded `p-8 lg:p-10`, can be `bg-surface-muted`, `bg-inverse` or image-filled. |
| **Stat** | `text-stat font-display tabular-nums` + mono label; counter roll-up on enter. |
| **Quote / testimonial** | `text-display-sm` Fraunces italic, gold quote-mark icon, avatar in an arch frame, name + role in mono. |
| **Post card** | Cover 16/9 `rounded-lg` with hover zoom; category pill (clay or navy tint); title `heading-md`; date + reading time in mono. |
| **FAQ item** | Hairline-separated rows, Fraunces question, plus/minus icon morph, height animation, `aria-expanded`. |
| **Form field** | Floating label, `rounded-sm`, `border-line-strong`, focus ring gold; inline error in `text-danger` with icon + text (never colour alone). |
| **CTA band** | `on-dark bg-aurora-navy bg-grain`, marquee line, display-md heading, accent button. |
| **Footer** | `on-dark` navy-950; big outlined "The Plug Afrique" wordmark; 4 columns (Explore, Services, Offices, Connect); newsletter field; legal row. |
| **Prose (CMS Markdown)** | `.prose-tpa`: 68ch measure, Fraunces h2/h3, gold-marker blockquotes, hairline `hr`, styled lists/tables/code, figure captions in mono. |

---

## 9. Page blueprints

| Page | Sections (in order) |
|---|---|
| **Home** | Hero (3D network + word rotator) → client marquee → Essence manifesto → Our Story (split, image reveal) → Philosophy (dark, pinned 01/02/03) → Services (stacking cards, 5) → Why TPA (bento, 4 + stats) → Testimonials → Insights (3 latest posts) → FAQ → Invitation CTA → Footer |
| **About** | Page hero (display-xl + arch portrait) → Story long-form → Name & Identity ("The Plug" explained) → Philosophy → Why TPA → Offices (Lagos/Abuja) → CTA |
| **Services** | Hero → hover-image list of 5 practice areas (image reveal on hover) → process (Clarity → Connection → Creation) → FAQ → CTA |
| **Service detail** `[slug]` | Hero with cover → overview prose → sub-services grid → approach → related services → CTA |
| **Insights (blog)** | Hero → featured post (large) → category tabs (tab indicator slide) → post grid → newsletter |
| **Post** `[slug]` | Reading progress bar → cover (shared element) → title, meta → `.prose-tpa` body → author card (name, role, socials; no phone/email) → related posts |
| **Contact** | Split: form (floating labels, success state) / offices + map links + phone/WhatsApp/email/socials → FAQ |
| **404** | Big Fraunces "404" with a "loose plug" line animation and a link home |

---

## 10. Accessibility checklist

- [ ] Every text pair is from §2.5 or verified ≥4.5:1 (≥3:1 for ≥24px or 19px bold, and for UI borders/icons).
- [ ] Visible `:focus-visible` ring (gold, 2px, 3px offset) on every interactive element. Never `outline: none` without a replacement.
- [ ] A skip link ("Skip to content") is the first focusable element.
- [ ] Semantic landmarks; one `<h1>` per page; headings never skip levels.
- [ ] `prefers-reduced-motion` handled per §7.5. Auto-moving content lasting over 5s has a pause control.
- [ ] Target sizes ≥ 44×44px for primary controls (≥24px minimum).
- [ ] Meaningful `alt`; decorative images and patterns use `alt=""`/`aria-hidden`.
- [ ] Forms: real `<label>`s, `aria-describedby` errors, no colour-only states.
- [ ] `lang="en-GB"`.

---

## 11. Implementation map

| What | Where |
|---|---|
| Tokens, base styles, utilities, keyframes, prose | `app/globals.css` |
| Font loading | `app/layout.tsx` (`next/font/google`) |
| Motion constants + GSAP registration | `lib/motion.ts` |
| Smooth scroll provider (Lenis ↔ ScrollTrigger) | `components/providers/smooth-scroll.tsx` |
| Class merging helper | `lib/utils.ts` (`cn`) |
| Site constants (contact, socials, nav) | `lib/site.ts` |
| Visual token reference | `/styleguide` (`app/styleguide/page.tsx`, `noindex`) |

### Do / Don't

| Do | Don't |
|---|---|
| Use semantic tokens (`text-heading`, `bg-surface`) in components | Hard-code hex values or raw palette steps inside components when a semantic token exists |
| Keep gold scarce and meaningful | Gold body text on ivory |
| Use one italic accent word per headline | Italicise whole headlines |
| Use hairlines and whitespace to separate | Heavy boxes, thick borders, drop-shadow soup |
| Use one signature motion per section | Animate everything that moves |
| Use real photography of African professionals | Generic stock offices or AI images with visible watermarks |
