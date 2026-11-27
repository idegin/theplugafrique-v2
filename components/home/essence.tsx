import Image from "next/image";
import { ScrubText } from "@/components/motion/scrub-text";
import { Reveal } from "@/components/motion/reveal";
import { FloatGraphic } from "@/components/motion/float-graphic";

function Pill({ src, className = "" }: { src: string; className?: string }) {
  return (
    <span className={`relative mx-[0.12em] inline-block h-[0.78em] w-[1.7em] translate-y-[0.08em] overflow-hidden rounded-pill align-baseline ${className}`}>
      <Image src={src} alt="" fill sizes="10rem" className="object-cover" />
    </span>
  );
}

/** 03 · Essence: editorial manifesto, words brighten as you scroll, with inline image pills. */
export function Essence() {
  return (
    <section aria-labelledby="essence-title" className="relative overflow-hidden bg-canvas py-section">
      <FloatGraphic shape="rings" node="var(--color-gold-500)" className="-left-24 bottom-10 hidden size-72 text-ivory-300 lg:block" spin />
      <FloatGraphic shape="plug" node="var(--color-gold-500)" className="left-[4%] top-[40%] hidden h-16 w-52 text-navy-400 lg:block" speed={0.3} />
      <div className="container-page grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Reveal self>
            <p id="essence-title" className="eyebrow lg:sticky lg:top-32">
              <span className="text-accent">01 /</span> Our essence
            </p>
          </Reveal>
        </div>
        <div className="lg:col-span-9">
          <ScrubText className="font-display text-display-md leading-[1.12] text-heading font-soft">
            <span data-scrub="">The Plug Afrique is a Pan-African consulting practice built on one belief:</span>{" "}
            <Pill src="/images/web/home-hero-alt.webp" />{" "}
            <span data-scrub="">transformation happens when people, ideas and opportunities</span>{" "}
            <em className="em-accent">connect.</em>{" "}
            <Pill src="/images/web/consultant-portrait-focus.webp" />{" "}
            <span data-scrub="">From concept to completion, we bring clarity, creativity and collaboration to every engagement</span>{" "}
            <Pill src="/images/web/services-hero.webp" />{" "}
            <span data-scrub="">moving people and economies forward.</span>
          </ScrubText>

          <Reveal className="mt-16 grid gap-8 border-t border-line pt-10 sm:grid-cols-3" stagger={0.1}>
            {[
              ["Individuals", "& institutions"],
              ["Strategy", "& execution"],
              ["Vision", "& impact"],
            ].map(([a, b], i) => (
              <div data-reveal="" key={a} className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-fg-subtle">0{i + 1}</span>
                <p className="text-heading-md">
                  {a} <span className="font-display font-normal italic text-accent">{b}</span>
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
