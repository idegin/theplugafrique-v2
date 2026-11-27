import Image from "next/image";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { ClipReveal } from "@/components/motion/clip-reveal";
import { FloatGraphic } from "@/components/motion/float-graphic";
import { Counter } from "@/components/motion/counter";

/** About · hero: kinetic headline + multi-layer parallax image mosaic. */
export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-canvas pb-section-sm pt-[calc(var(--spacing-header)+3rem)]">
      <div aria-hidden className="bg-line-grid pointer-events-none absolute inset-0 [--grid-size:88px] [mask-image:radial-gradient(60%_70%_at_20%_10%,#000,transparent)]" />
      <FloatGraphic shape="orbit" node="var(--color-gold-500)" className="left-[34%] top-[58%] hidden h-40 w-52 text-navy-300 lg:block" speed={0.3} />
      <div className="container-page relative grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal self start="load">
            <p className="eyebrow eyebrow-rule">About The Plug Afrique</p>
          </Reveal>
          <SplitHeading as="h1" start="load" delay={0.1} className="mt-8 text-display-2xl font-soft [font-size:clamp(3.25rem,1.8rem+6vw,8rem)]">
            We are <em className="em-accent">the plug.</em>
          </SplitHeading>
          <Reveal start="load" delay={0.6} stagger={0.1}>
            <p data-reveal="" className="mt-8 max-w-[44ch] text-lead text-fg-muted">
              A Pan-African consulting practice that connects people to people, and people to resources, so that vision becomes
              impact.
            </p>
            <div data-reveal="" className="mt-10 flex gap-10 border-t border-line pt-8">
              {[
                { v: 65, s: "+", l: "clients" },
                { v: 5, s: "", l: "practices" },
                { v: 2, s: "", l: "offices" },
              ].map((x) => (
                <div key={x.l}>
                  <p className="font-display text-4xl text-heading tabular-nums md:text-5xl"><Counter value={x.v} suffix={x.s} /></p>
                  <p className="mt-1 text-sm text-fg-muted">{x.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Mosaic: three planes moving at different speeds */}
        <div className="relative h-[34rem] sm:h-[40rem] lg:col-span-6">
          <Parallax speed={0.04} className="absolute left-0 top-0 h-[70%] w-[56%]">
            <ClipReveal className="rounded-arch relative h-full w-full shadow-xl">
              <Image src="/images/web/about-primary.webp" alt="Two TPA consultants reviewing a brief" fill priority sizes="(min-width: 1024px) 28vw, 56vw" className="object-cover" />
            </ClipReveal>
          </Parallax>
          <Parallax speed={0.16} className="absolute right-0 top-[12%] h-[44%] w-[40%]">
            <ClipReveal from="right" delay={0.2} className="relative h-full w-full rounded-xl shadow-lg">
              <Image src="/images/web/consultant-portrait-focus.webp" alt="A consultant in a working session" fill sizes="20vw" className="object-cover" />
            </ClipReveal>
          </Parallax>
          <Parallax speed={0.28} className="absolute bottom-0 right-[8%] h-[40%] w-[52%]">
            <ClipReveal from="left" delay={0.35} className="relative h-full w-full rounded-xl border-[6px] border-canvas shadow-xl">
              <Image src="/images/web/home-hero.webp" alt="Colleagues walking and talking between meetings" fill sizes="26vw" className="object-cover" />
            </ClipReveal>
          </Parallax>
          <Reveal self start="load" delay={1} className="absolute bottom-[18%] left-[4%] z-10">
            <div className="motion-ok:animate-float rounded-pill bg-navy-900 px-5 py-3 text-sm text-ivory-50 shadow-xl">
              <span className="mr-2 inline-block size-2 rounded-full bg-gold-300 align-middle" /> Rooted in Africa · open to the world
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
