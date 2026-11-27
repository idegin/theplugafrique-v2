import Image from "next/image";
import Link from "next/link";
import { formatDate, getLatestPosts } from "@/lib/cms";
import { ClipReveal } from "@/components/motion/clip-reveal";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { ButtonLink } from "@/components/ui/button";
import { CategoryPill, PostMeta } from "@/components/blog/post-meta";
import { HoverList } from "./hover-list";
import { FloatGraphic } from "@/components/motion/float-graphic";

/** 09 · Insights: featured story + cursor-follow image list, both from the Markdown CMS. */
export function Insights() {
  const [featured, ...rest] = getLatestPosts(4);
  if (!featured) return null;
  return (
    <section aria-labelledby="insights-title" className="relative overflow-hidden border-t border-line bg-canvas py-section">
      <FloatGraphic shape="spark" className="right-[38%] top-24 hidden size-6 text-gold-500 md:block" speed={0.5} />
      <div className="container-page">
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader
            index="07"
            eyebrow="Insights"
            title={
              <>
                Thinking that <em className="em-accent">connects.</em>
              </>
            }
            lead="Perspectives on strategy, innovation, culture and partnership across Africa."
          />
          <ButtonLink href="/blog/" variant="secondary" className="self-start md:self-auto">
            All insights
          </ButtonLink>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <article className="group relative lg:col-span-6">
            <ClipReveal className="relative aspect-[4/3] rounded-xl">
              <Image src={featured.cover.src} alt={featured.cover.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.04]" />
              <span className="absolute left-5 top-5 rounded-pill bg-ivory-50/90 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-navy-900 backdrop-blur">
                Featured
              </span>
            </ClipReveal>
            <Reveal stagger={0.08} className="mt-8">
              <div data-reveal="" className="flex items-center gap-4">
                <CategoryPill>{featured.category}</CategoryPill>
                <PostMeta post={featured} />
              </div>
              <h3 data-reveal="" className="mt-5 font-display text-heading [font-size:clamp(1.75rem,1.3rem+1.6vw,2.75rem)] leading-[1.08] tracking-[-0.02em]">
                <Link href={featured.href} className="after:absolute after:inset-0">
                  <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-700 ease-out-expo group-hover:bg-[length:100%_1px]">
                    {featured.title}
                  </span>
                </Link>
              </h3>
              <p data-reveal="" className="mt-4 max-w-[56ch] text-fg-muted">{featured.excerpt}</p>
            </Reveal>
          </article>

          <Reveal self y={40} className="lg:col-span-6">
            <HoverList
              items={rest.map((p) => ({
                href: p.href,
                title: p.title,
                kicker: p.category,
                meta: `${formatDate(p.date)} · ${p.readingMinutes} min read`,
                image: { src: p.cover.src, alt: p.cover.alt },
              }))}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
