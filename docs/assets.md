# Asset manifest

All static assets live in `public/` and are served from the site root (`public/brand/tpa-logo.png` → `/brand/tpa-logo.png`). Everything here was migrated from v1 (`theplugafrique/src/site/public` plus the inline SVGs in its EJS templates) and renamed descriptively.

```
public/
├── favicon.ico                    # root favicon (also app/favicon.ico)
├── _redirects  _headers           # host config (Netlify / Cloudflare Pages)
├── brand/                         # The Plug Afrique identity (+ icon-*.png for the web manifest)
├── cms/                           # GENERATED, gitignored: content/ assets + WebP variants
├── images/
│   ├── photography/               # on-brand imagery used by v1 pages
│   ├── backgrounds/               # abstract backgrounds
│   ├── clients/                   # client / partner logos ("trusted by")
│   └── theme-placeholders/        # stock images from v1's purchased theme
├── icons/                         # SVG icons extracted from v1
│   ├── social/  contact/  ui/  philosophy/  features/  decorative/
└── fonts/font-awesome/            # Font Awesome 6 Pro webfonts from v1
```

## brand/

| File | Notes |
|---|---|
| `tpa-logo.png` | Primary "tpa / THE PLUG AFRIQUE" logo, navy on transparent, 359×202. Use `filter: invert(1)` (or a white variant) on dark backgrounds. A vector (SVG) version would be worth requesting from the client. |
| `favicon.ico` | Favicon. |
| `icon-192.png`, `icon-512.png`, `icon-512-maskable.png` | Web manifest icons: light logo on navy-950. `app/icon.png` (rounded, 512) and `app/apple-icon.png` (180) were made the same way. |

## images/web/

Section photography used by the page components. The build writes 640/1280/1920px WebP variants of each image (see `scripts/sync-cms-assets.mjs`). New AI-generated images follow `docs/ai-image-brief.md`.

| File | Used in |
|---|---|
| `about-audience-individuals.webp` | About › Who we serve, "Individuals" panel (AI-generated, 926×1152) |
| `about-audience-ventures.webp` | About › Who we serve, "Ventures" panel (AI-generated, 928×1152) |
| `about-audience-organisations.webp` | About › Who we serve, "Organisations" panel (AI-generated, 928×1152) |
| `about-primary.webp`, `about-secondary.webp`, `consultant-portrait-*.webp`, `faq.webp`, `home-hero*.webp`, `invitation-banner.webp`, `services-hero.webp`, `testimonials-banner.webp`, `avatar-*.webp` | Home and About sections. These are still reused across sections until the AI replacements land. |

## images/photography/

| File | Was in v1 | Size | Used for in v1 |
|---|---|---|---|
| `home-hero.png` | `external/home-hero.png` | 1152×896 | Home hero |
| `home-hero-alt.png` | `external/home-hero-2.png` | 1152×896 | Home hero (the one actually shown) |
| `about-primary.png` | `external/about-1.png` | 864×1184 | Our story, main image |
| `about-secondary.png` | `external/about-2.png` | 1056×992 | Our story, secondary image |
| `faq.png` | `external/faq.png` | 928×1120 | FAQ section |
| `services-hero.jpg` | `external/service-hero.png` (actually a JPEG) | 1365×768 | Services page hero |
| `testimonials-banner.png` | `external/testimonials.png` | 1696×608 | Testimonials section |
| `invitation-banner.png` | `external/invitation.png` | 2048×512 | "Let's join hands" CTA band |
| `consultants-duo-reviewing.png` | `external/Gemini_Generated_Image_7sju…` | 864×1184 | AI-generated: two Black consultants in navy blazers reviewing a tablet |
| `consultant-portrait-focus.png` | `external/Gemini_Generated_Image_eu1n…` | 1056×992 | AI-generated: woman with platinum curls at a laptop |
| `consultant-portrait-writing.png` | `external/Gemini_Generated_Image_gtsd…` | 928×1120 | AI-generated: woman in pinstripe waistcoat writing notes |

The three AI images still have visible generator watermarks (the Gemini sparkle in the bottom-right corner, and "NANO BANANA" on the briefcase in `consultants-duo-reviewing.png`). Crop or regenerate them before use.

## images/backgrounds/

| File | Notes |
|---|---|
| `abstract-gradient-waves.jpg` | 3000×2279 purple/cyan/orange wave gradient (was `public/image.jpeg`). It's off-palette for the navy and gold brand, so only use it with heavy tinting. |

## images/clients/

| File | Company |
|---|---|
| `minnie-hairven.png` | Minnie Hairven (purple wordmark) |
| `trybe-one-network.png` | Trybe One Network (teal/gold; has large white padding, so trim before use) |
| `genial-events.jpg` | Genial Events, General Event Management (gold on navy, no transparency) |
| `idegin-technologies.png` | iDegin Technologies, which built v1 (links to idegin.com) |

## images/theme-placeholders/

These came with v1's purchased HTML theme, organised by section (`about`, `blog`, `hero`, `team`, `testimonial`, `pricing`, …). They are **not** brand assets. That includes `logo/logo-black.png` and `logo-white.png`, which are the theme's "Budgeto" logo. Use them only as stand-ins during development. The misspelled folder names (`benifits`, `comeing-soon`, `suscess`) were corrected to `benefits`, `coming-soon` and `success`.

## icons/

Every icon is a standalone SVG. Brand-coloured fills and strokes (`#1F3130`, `white`) were converted to `currentColor`, so icons inherit the text colour. The exception is `decorative/`, which keeps its original faint fills.

| Folder | Icons |
|---|---|
| `social/` | facebook, instagram, linkedin, x-twitter, vimeo |
| `contact/` | phone, phone-ringing, phone-call-duotone, phone-hours, email, email-open, location-pin, location-pin-outline, clock, chat-bubbles |
| `ui/` | search, search-thin, arrow-right, arrow-right-bold, arrow-right-long, arrow-left, chevron-up, play, check-circle, bell, user-edit, notification-badge |
| `philosophy/` | clarity (brief/document), connection (broadcasting figure), creation (figure raising a star). These are the icons for TPA's three principles. |
| `features/` | growth-chart, asterisk, sparkle-burst (v1's section-subtitle ornament) |
| `decorative/` | quote-mark, checker-pattern, curved-arrow |

## fonts/font-awesome/

Font Awesome 6 Pro (brands, light, regular, solid) in `.woff2` and `.ttf`. **Pro is a paid licence**, so confirm the client holds one before shipping these. The brand typefaces (DM Serif Display, DM Sans) are Google Fonts and should be loaded with `next/font/google`, not copied in.
