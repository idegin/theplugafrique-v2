import Image from "next/image";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/motion/reveal";
import { WordRotator } from "@/components/motion/word-rotator";
import { ButtonLink } from "@/components/ui/button";
import { HeroCanvas } from "./hero-canvas";
import { FloatGraphic } from "@/components/motion/float-graphic";

const avatars = ["avatar-1", "avatar-2", "avatar-3", "avatar-4"];

/** 01 · Hero: dark aurora + 3D connection network, line-mask headline, word rotator. */
export function Hero() {
  return (
    <section
      data-header="dark"
      aria-labelledby="hero-title"
      className="on-dark bg-aurora-navy bg-grain relative isolate flex min-h-[100svh] flex-col overflow-hidden [--grain-opacity:0.07]"
    >
      {/* 3D network: right half on desktop, full-bleed backdrop on mobile */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 top-[48%] -z-10 opacity-45 [mask-image:linear-gradient(to_bottom,transparent,#000_30%,#000_70%,transparent)] sm:top-[40%] lg:inset-y-0 lg:left-[38%] lg:right-0 lg:opacity-100 lg:[mask-image:linear-gradient(to_right,transparent,#000_22%,#000_85%,transparent)]"
      >
        <HeroCanvas />
      </div>
      {/* Hairline grid + vignette */}
      <div aria-hidden className="bg-line-grid pointer-events-none absolute inset-0 -z-10 opacity-40 [--grid-size:96px] [mask-image:radial-gradient(70%_60%_at_30%_40%,#000,transparent)]" />

      <FloatGraphic shape="spark" className="right-[44%] top-[18%] hidden size-5 text-gold-300 lg:block" speed={0.4} />
      <FloatGraphic shape="spark" className="bottom-[22%] left-[48%] hidden size-3 text-gold-300/70 lg:block" speed={0.6} delay={1.2} />
      <div className="container-page relative z-10 flex flex-1 flex-col justify-center pb-10 pt-[calc(var(--spacing-header)+2.5rem)]">
        <div className="max-w-[46rem] lg:max-w-[56%]">
          <Reveal self start="load" delay={0.1}>
            <p className="eyebrow eyebrow-rule mb-7">Pan-African consulting<span className="hidden sm:inline"> · Lagos — Abuja</span></p>
          </Reveal>

          <SplitHeading
            as="h1"
            id="hero-title"
            start="load"
            delay={0.2}
            className="font-soft text-display-xl [font-size:clamp(2.75rem,1.55rem+4.6vw,6rem)] [&_.split-line]:pb-[0.06em]"
          >
            Connecting people, ideas &amp; opportunities <em className="em-accent">for impact.</em>
          </SplitHeading>

          <Reveal start="load" delay={0.7} stagger={0.12}>
            <p data-reveal="" className="mt-7 max-w-[46ch] text-lead text-fg-muted">
              We bridge gaps between individuals and institutions, strategy and execution, vision and impact, bringing
              clarity, creativity and collaboration to every engagement.
            </p>
            <p data-reveal="" className="mt-5 font-display text-display-sm italic text-heading">
              We plug you into{" "}
              <WordRotator
                className="pr-1"
                wordClassName="text-gradient-gold pr-[0.1em]"
                words={["strategy.", "innovation.", "capability.", "culture.", "partnerships."]}
              />
            </p>
            <div data-reveal="" className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href={site.cta.href} variant="accent" size="lg" magnetic>
                {site.cta.label}
              </ButtonLink>
              <ButtonLink href="/services/" variant="secondary" size="lg">
                Explore services
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Bottom rail */}
      <Reveal start="load" delay={1.1} self className="container-page relative z-10 pb-8">
        <div className="flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {avatars.map((a) => (
                <Image key={a} src={`/images/web/${a}.webp`} alt="" width={160} height={160} className="size-10 rounded-full border-2 border-navy-950 object-cover" />
              ))}
            </div>
            <p className="text-sm text-fg-muted">
              <span className="font-display text-xl text-heading">65+</span> happy clients and counting
            </p>
          </div>
          <a href={`tel:${site.phone}`} className="group inline-flex items-center gap-3 text-sm text-fg-muted hover:text-heading">
            <span className="grid size-10 place-items-center rounded-full border border-line-strong text-accent transition-colors group-hover:bg-gold-300 group-hover:text-navy-950">
              <Phone className="size-4" strokeWidth={1.5} />
            </span>
            <span>
              <span className="block text-xs uppercase tracking-[0.14em] text-fg-subtle">Talk to us</span>
              {site.phoneDisplay}
            </span>
          </a>
          <div className="hidden items-center gap-3 text-xs uppercase tracking-[0.18em] text-fg-subtle md:flex">
            <span className="relative block h-10 w-px overflow-hidden bg-white/15">
              <span className="absolute inset-x-0 top-0 h-1/2 bg-gold-300 motion-ok:animate-[scroll-cue_2s_var(--ease-in-out-quint)_infinite]" />
            </span>
            Scroll
          </div>
        </div>
      </Reveal>
    </section>
  );
}
