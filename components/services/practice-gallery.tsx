import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getServices } from "@/lib/cms";
import { HorizontalScroll } from "@/components/motion/horizontal-scroll";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/motion/reveal";

/** Services · pinned horizontal gallery of the five practices. */
export function PracticeGallery() {
  const services = getServices();
  return (
    <section aria-labelledby="gallery-title" className="relative bg-surface-muted py-section-sm lg:py-0">
      <HorizontalScroll
        header={
          <div className="container-page mb-12 flex flex-col justify-between gap-6 lg:mb-14 lg:flex-row lg:items-end">
            <div>
              <Reveal self>
                <p className="eyebrow eyebrow-rule mb-6">The practices</p>
              </Reveal>
              <SplitHeading id="gallery-title" className="text-display-lg max-w-[15ch]">
                Five ways we <em className="em-accent">move you forward.</em>
              </SplitHeading>
            </div>
            <p className="hidden max-w-[28ch] text-fg-muted lg:block">Scroll to travel through each practice.</p>
          </div>
        }
      >
        {services.map((s) => (
          <article
            key={s.slug}
            data-hitem=""
            className="group relative flex w-[85vw] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-md sm:w-[60vw] lg:h-[30rem] lg:w-[46rem] lg:flex-row"
          >
            <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:w-[48%]">
              <Image src={s.cover.src} alt={s.cover.alt} fill sizes="(min-width: 1024px) 22rem, 85vw" className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.06]" />
              <span className="absolute left-5 top-5 rounded-pill bg-ivory-50/90 px-3 py-1 font-mono text-xs text-navy-900 backdrop-blur">0{s.order}</span>
            </div>
            <div className="flex flex-1 flex-col p-7 lg:p-9">
              <h3 className="font-display text-display-sm text-heading">
                <Link href={s.href} data-cursor="Explore" className="after:absolute after:inset-0">
                  {s.title}
                </Link>
              </h3>
              <p className="mt-3 text-fg-muted">{s.summary}</p>
              <ul className="mt-6 space-y-2 border-t border-line pt-5 text-sm text-fg">
                {s.offerings.slice(0, 4).map((o) => (
                  <li key={o} className="flex gap-2"><span className="mt-2 block size-1.5 shrink-0 rounded-full bg-accent-fill" />{o}</li>
                ))}
              </ul>
              <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-heading">
                Explore practice <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" strokeWidth={1.5} />
              </span>
            </div>
          </article>
        ))}
      </HorizontalScroll>
    </section>
  );
}
