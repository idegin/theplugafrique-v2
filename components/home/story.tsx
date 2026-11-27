import Image from "next/image";
import { Parallax } from "@/components/motion/parallax";
import { ClipReveal } from "@/components/motion/clip-reveal";
import { DrawLine } from "@/components/motion/draw-line";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { Counter } from "@/components/motion/counter";
import { ArrowLink } from "@/components/ui/button";

/** 04 · Our story: asymmetric split; arch portrait + overlapping frame, plug line, counters. */
export function Story() {
  return (
    <section aria-labelledby="story-title" className="relative overflow-hidden bg-surface-muted py-section">
      {/* Concentric rings motif */}
      <svg aria-hidden viewBox="0 0 600 600" className="pointer-events-none absolute -left-40 top-24 w-[38rem] text-gold-400/30">
        {[60, 120, 180, 240, 300].map((r) => (
          <circle key={r} cx="300" cy="300" r={r - 1} fill="none" stroke="currentColor" strokeWidth="1" />
        ))}
      </svg>

      <div className="container-page relative grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
        {/* Images */}
        <div className="relative lg:col-span-6 lg:pr-12">
          <ClipReveal className="rounded-arch relative aspect-[4/5] w-[78%] max-w-[30rem] shadow-xl">
            <Parallax speed={0.06} className="absolute -inset-y-[8%] inset-x-0">
              <Image
                src="/images/web/about-primary.webp"
                alt="Two TPA consultants reviewing notes together"
                fill
                sizes="(min-width: 1024px) 34vw, 78vw"
                className="object-cover"
              />
            </Parallax>
          </ClipReveal>
          <div className="absolute bottom-[-8%] right-0 w-[52%] max-w-[19rem] md:right-4 lg:right-0">
            <ClipReveal from="left" delay={0.3} className="relative aspect-square rounded-xl border-[6px] border-surface-muted shadow-lg">
              <Image src="/images/web/about-secondary.webp" alt="A consultant listening intently in a meeting" fill sizes="20rem" className="object-cover" />
            </ClipReveal>
          </div>
          {/* Floating stat badge */}
          <Reveal self delay={0.5} className="absolute left-[56%] top-[8%] hidden sm:block">
            <div className="motion-ok:animate-float rounded-lg bg-navy-900 px-5 py-4 text-ivory-50 shadow-xl">
              <p className="font-display text-3xl leading-none text-gold-300">
                <Counter value={65} suffix="+" />
              </p>
              <p className="mt-1 text-xs text-ivory-300">clients connected</p>
            </div>
          </Reveal>
        </div>

        {/* Copy */}
        <div className="relative lg:col-span-6 lg:pl-4">
          <Reveal self>
            <p className="eyebrow">
              <span className="text-accent">02 /</span> Our story
            </p>
          </Reveal>
          <DrawLine className="my-6 h-20 w-40" d="M2 2 C 2 50, 60 40, 80 60 S 150 80, 158 78" viewBox="0 0 160 80" />
          <SplitHeading id="story-title" className="text-display-lg max-w-[14ch]">
            A simple idea that became a <em className="em-accent">nexus.</em>
          </SplitHeading>
          <Reveal className="mt-8 space-y-5 text-fg-muted" stagger={0.1}>
            <p data-reveal="" className="max-w-[52ch] text-lead text-fg">
              The Plug Afrique began with a simple idea: <em className="font-display">to connect people to people, and people to resources.</em>
            </p>
            <p data-reveal="" className="max-w-[56ch]">
              What started as a private consulting practice has evolved into a nexus of strategic thinking, innovation and
              purposeful collaboration: a platform where individuals, ventures and organisations find the insights,
              partnerships and tools they need to grow.
            </p>
            <p data-reveal="" className="max-w-[56ch]">
              Rooted in Africa and open to the world, we pair deep local understanding with global best practice, because
              beyond data, systems and frameworks, it is <span className="marker-gold text-heading">people</span> who drive transformation.
            </p>
          </Reveal>

          <Reveal className="mt-10 grid grid-cols-3 gap-6 border-y border-line py-8" stagger={0.1}>
            {[
              { v: 65, s: "+", l: "Clients served" },
              { v: 5, s: "", l: "Practice areas" },
              { v: 2, s: "", l: "Offices · Lagos & Abuja" },
            ].map((x) => (
              <div data-reveal="" key={x.l}>
                <p className="font-display text-stat text-heading tabular-nums [font-size:clamp(2.25rem,1.8rem+2vw,3.5rem)]">
                  <Counter value={x.v} suffix={x.s} />
                </p>
                <p className="mt-2 text-sm text-fg-muted">{x.l}</p>
              </div>
            ))}
          </Reveal>
          <Reveal self className="mt-8">
            <ArrowLink href="/about/">Read our full story</ArrowLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
