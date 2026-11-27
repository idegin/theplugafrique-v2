# AI image brief

These prompts give every section, service and post its own image, so the same ten photos stop repeating across the site. Give the image AI the current photos in `public/images/web/` (all except `avatar-*`) as **style references**. Paste the **style block** below at the start of every prompt, followed by that image's prompt.

Save each result as `public/ai-images/<filename>`, at the size listed or larger. JPG or PNG is fine: the files get converted to WebP and moved into place (`content/<collection>/<slug>/cover.webp` for covers, `public/images/web/` for section images) when they're wired in. `public/ai-images/` is only a drop zone and should be empty once that's done.

**Status (27 Nov 2026):** sections 1 and 2 are done. The service and blog covers are in their `content/` folders, and the four spare blog covers are in `assets/cover-library/blog/`. The About audience panels are done too (`public/images/web/about-audience-*.webp`). The rest of sections 3 and 4 (home and the About hero) are still to generate.

## Style block (paste before every prompt)

> Match the reference photos exactly in colour grading, contrast and mood. Editorial documentary photography of Black African professionals, shot on a full-frame camera with a 50–85mm lens at f/1.8–2.8, shallow depth of field, natural soft window or overcast light. Cool, desaturated grade: slate-teal and deep navy shadows (#001135 / #002055 family), lifted matte blacks, soft highlights, gentle film grain. Skin tones warm, rich and true, never orange or washed out. Wardrobe in navy, charcoal, grey, white and pinstripe, with an occasional small muted gold accent (#cf9838) such as a pen, folder, earring or lamp glow. Modern but understated African city settings: glass offices, co-working spaces and meeting rooms, Lagos / Abuja / Nairobi architecture softly out of focus. Candid moments, not posed stock smiles. No text, logos, watermarks, brand marks or readable screens. Anatomically correct hands. Leave calm negative space for overlaid headlines where noted.

## Size key

| Ratio | Minimum size | Used for |
|---|---|---|
| 16:9 | 2400 × 1350 | Service and blog covers (also shown full-bleed in the "next" banners) |
| 4:5 | 1600 × 2000 | Tall portraits |
| 3:4 | 1500 × 2000 | Side portraits |
| 1:1 | 1600 × 1600 | Square crops |
| 4:3 | 2000 × 1500 | About audience cards |
| 4:1 | 3200 × 800 | Ultra-wide banner |
| 3:1 | 1200 × 400 | Inline pills in the Essence headline (tiny, simple shapes) |

---

## 1. Service covers (16:9, ≥ 2400 × 1350)

Each cover is a hero on its service page, a card in the services gallery and the home services list, and a full-bleed "next practice" banner. Keep the subject in the right two-thirds, with a calmer left third.

| File | Prompt |
|---|---|
| `service-strategy-advisory.jpg` | A senior West African woman consultant in a navy suit stands at a floor-to-ceiling window in a high-rise boardroom, pointing to a hand-drawn strategy map pinned on a glass wall while a male client in a charcoal suit listens, arms folded, thoughtful. Overcast Lagos skyline blurred behind them. Calm, decisive mood. Negative space on the left. |
| `service-innovation-digital.jpg` | A young East African man in a white shirt and navy blazer works at a standing desk in a dim modern office at dusk, his face lit softly by a laptop. Behind him a city skyline glows deep navy, with thin, subtle gold light trails tracing a network across the glass like data connections. Restrained and cinematic, not sci-fi. No readable screen content. |
| `service-capability-knowledge.jpg` | A workshop in a bright training room: a Nigerian facilitator in her forties, in a grey blazer, leans over a table guiding three younger professionals who are writing on notepads and sticky notes. Shallow focus on the facilitator's gesture and an engaged participant. Warm sense of learning and mentorship. |
| `service-culture-creativity.jpg` | A creative studio in an African city: a designer with locs in a charcoal knit sweater pins textile swatches and printed artwork onto a moodboard wall, while a colleague reviews prints at a long table. Muted indigo, ochre and deep green fabrics, graded to the cool palette. Art-directed, tactile, quietly vibrant. |
| `service-partnerships-ecosystem.jpg` | Two executives, a Ghanaian woman and a Kenyan man in navy and grey suits, shake hands across a glass meeting table, with two blurred colleagues in the background reviewing documents. Natural window light, warm genuine expressions mid-conversation, a muted gold folder on the table. Trust and alliance. Negative space on the left. |

## 2. Blog covers (16:9, ≥ 2400 × 1350)

| File | Prompt |
|---|---|
| `blog-connectors-advantage.jpg` | Wide shot of a busy modern office atrium. A man and a woman in business attire are introducing a third professional to each other, caught mid-handshake, with others crossing the polished floor in soft motion blur. The feeling of networks and introductions. |
| `blog-strategy-to-execution.jpg` | Over-the-shoulder view of a project lead in a pinstripe waistcoat moving sticky notes across a large wall-mounted planning board (a roadmap of columns with no readable text), with a teammate holding a tablet beside her. Sense of turning plans into action. Landscape framing. |
| `blog-digital-transformation-people.jpg` | A team of four African professionals of mixed ages sits around a laptop in a glass-walled meeting room. An older manager laughs as a younger colleague shows her something on the screen (screen not visible). The focus is the people, not the technology. Warm, human, collaborative. |
| `blog-culture-as-infrastructure.jpg` | Inside a contemporary African art gallery or cultural centre: a curator in a navy coat discusses a large abstract textile artwork with a man in a grey suit holding a notebook. Gallery spotlights, a muted gold glow on the artwork. Culture meeting policy. |
| `blog-spare-leadership.jpg` | Spare cover for future leadership posts. A composed Nigerian CEO in her fifties, in a tailored navy suit, sits at the head of a boardroom table listening intently, with blurred team members on both sides. Quiet authority. |
| `blog-spare-investment-readiness.jpg` | Spare cover for venture and investment posts. A young founder in a white shirt presents to two investors across a table in a minimalist office. Printed charts lie face-down or blurred, and a coffee cup and a muted gold pen sit on the table. Focused, high-stakes calm. |
| `blog-spare-public-sector.jpg` | Spare cover for public-sector and development posts. Three professionals walk up the steps of a modern government or institutional building in Abuja, carrying folders, shot from a low angle against an overcast sky. Purposeful. |
| `blog-spare-youth-talent.jpg` | Spare cover for talent and youth posts. Young African graduates in smart-casual clothes talk energetically in a co-working space with plants and large windows. One woman in focus is mid-laugh. Optimistic, emerging talent. |

## 3. Home page

| File | Size | Section and current image | Prompt |
|---|---|---|---|
| `home-story-primary.jpg` | 4:5 | Story, large photo (`about-primary`) | A Nigerian woman consultant with glasses, in a royal-navy blazer, reads from a leather folio while seated in a modern lounge, a colleague slightly out of focus in the foreground. Thoughtful, grounded. |
| `home-story-secondary.jpg` | 1:1 | Story, small overlapping photo (`about-secondary`) | Close crop of two hands, one passing a muted gold pen to the other, over an open notebook on a wooden meeting table, with crisp white cuffs and a navy sleeve. Symbolic connection. |
| `home-why-us.jpg` | 3:4 | Why us (`consultant-portrait-writing`) | A confident Ghanaian man consultant in his thirties, in a charcoal suit with no tie, stands by a window with a tablet held at his side, looking off-camera with quiet assurance. Soft window light on one side of his face. |
| `home-testimonials.jpg` | 3:4 | Testimonials side portrait (`consultant-portrait-focus`) | Portrait of a smiling client in her forties with natural hair, in a grey blazer, seated in a café-style meeting space, mid-conversation and looking slightly off-camera, warm and appreciative. Heavy background blur. |
| `home-faq.jpg` | 4:5 | FAQ contact card thumbnail (`faq`) | A friendly young consultant on a phone call with a headset or phone, smiling, a notepad in hand, at a bright desk. Simple composition that reads at a small size. |
| `home-invitation-banner.jpg` | 4:1 | Invitation band background (`invitation-banner`), shown at 25% opacity in monochrome | Ultra-wide, low-detail, dark navy view of a city skyline at blue hour seen through office glass, with faint reflections of two silhouetted figures talking. Mostly shadow with soft highlights, no busy detail, as it sits behind large text. |
| `home-essence-pill-1.jpg` | 3:1 | Essence headline inline pill | A tight horizontal crop of two people shaking hands, with navy sleeves against a soft grey background. |
| `home-essence-pill-2.jpg` | 3:1 | Essence headline inline pill | A tight horizontal crop of a woman's eyes and brow, focused, with a navy background. |
| `home-essence-pill-3.jpg` | 3:1 | Essence headline inline pill | A tight horizontal crop of a city skyline at dusk with gold light points. |
| `home-hero-avatar-1.jpg` … `home-hero-avatar-4.jpg` | 1:1 at 600 × 600 | Hero "trusted by" avatar stack | Four separate headshots of different African professionals (two women and two men, ages 28–55), shoulders up, plain soft slate background, approachable expressions. One image per file. |

## 4. About page

| File | Size | Section | Prompt |
|---|---|---|---|
| `about-hero-primary.jpg` | 4:5 | About hero, main photo | Two TPA consultants, a woman and a man in navy and grey, review a printed brief together while standing at a high table in a bright studio-office, heads close and engaged. |
| `about-hero-secondary.jpg` | 1:1 | About hero, small photo | A candid close portrait of a consultant listening in a working session, chin resting on hand, with a whiteboard blurred behind. |
| `about-hero-tertiary.jpg` | 4:3 | About hero, third photo | A team of five walks and talks through a sunlit modern corridor with glass walls, captured slightly from behind with motion and energy. |
| `about-audience-individuals.jpg` | 4:3 | "Individuals seeking clarity" card | A solo professional, a young man in a knit polo, sits on a window ledge with a notebook, looking out over the city, contemplative, at a crossroads. Calm negative space on one side for text. |
| `about-audience-ventures.jpg` | 4:3 | "Ventures ready to scale" card | A small startup team of three gathers around a laptop in a converted-warehouse office, one standing and pointing, ambitious energy. Text space at the bottom. |
| `about-audience-organisations.jpg` | 4:3 | "Organisations aiming to transform" card | A large, formal meeting of about ten professionals around a long table in an institutional boardroom, shot wide from the end of the table. Text space at the bottom. |

---

## Checklist for each image

- Hold it next to the references: the same cool slate-navy grade, with no warm or yellow cast and no HDR look.
- No text, logos or readable screens. Check hands, eyes and jewellery for AI artefacts.
- Use a variety of faces across the set: don't let the same generated person repeat across sections.
- Covers must be landscape and at least 2400px wide. The build warns about any under 1600px.
- After generating, drop the files in `public/ai-images/` with these exact names, and they'll be converted and wired in.
