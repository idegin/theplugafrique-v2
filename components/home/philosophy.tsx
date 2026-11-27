"use client";

import { useRef } from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/motion";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/motion/reveal";
import { FloatGraphic } from "@/components/motion/float-graphic";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Clarity",
    icon: "/icons/philosophy/clarity.svg",
    text: "We start by helping our clients see clearly, defining purpose, priorities and pathways to success.",
    points: ["Purpose & priorities", "Evidence over assumption", "Pathways, not just plans"],
  },
  {
    title: "Connection",
    icon: "/icons/philosophy/connection.svg",
    text: "We cultivate relationships, align interests and bring together the right people and resources to catalyse change.",
    points: ["The right people in the room", "Interests aligned", "Networks activated"],
  },
  {
    title: "Creation",
    icon: "/icons/philosophy/creation.svg",
    text: "We translate ideas into designed realities: strategies, systems and ventures that deliver measurable, lasting impact.",
    points: ["Designed realities", "Measurable results", "Impact that lasts"],
  },
];

/**
 * 05 · Philosophy (dark): pin-and-scrub through Clarity → Connection → Creation
 * on desktop; stacked cards on mobile / reduced motion.
 */
export function Philosophy() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 64rem) and (prefers-reduced-motion: no-preference)", () => {
        const pin = root.querySelector("[data-pin]");
        const items = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-step]"));
        const nums = root.querySelector("[data-nums]");
        const bar = root.querySelector("[data-bar]");
        const dots = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-dot]"));
        gsap.set(items[0], { autoAlpha: 1 });
        gsap.set(items.slice(1), { autoAlpha: 0, yPercent: 12 });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: `+=${(items.length - 1) * 90}%`,
            pin: true,
            scrub: 0.8,
            snap: { snapTo: 1 / (items.length - 1), duration: { min: 0.3, max: 0.8 }, ease: "power2.inOut" },
          },
        });
        tl.to(bar, { scaleY: 1, ease: "none", duration: items.length - 1 }, 0);
        items.slice(1).forEach((item, i) => {
          const at = i + 0.1;
          tl.to(items[i], { autoAlpha: 0, yPercent: -12, duration: 0.45, ease: "power2.in" }, at)
            .to(item, { autoAlpha: 1, yPercent: 0, duration: 0.55, ease: "power2.out" }, at + 0.35)
            .to(nums, { yPercent: -((i + 1) * 100) / items.length, duration: 0.8, ease: "power3.inOut" }, at)
            .to(dots[i + 1], { backgroundColor: "#f2cb7a", scale: 1.25, duration: 0.3 }, at + 0.4);
        });
      });
      mm.add("(max-width: 63.99rem) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-step]")).forEach((item) => {
          gsap.fromTo(item, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: item, start: "top 88%", once: true } });
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(root.querySelectorAll("[data-step]"), { autoAlpha: 1 });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} data-header="dark" aria-labelledby="philosophy-title" className="on-dark bg-aurora-navy bg-grain relative overflow-hidden">
      <FloatGraphic shape="orbit" node="var(--color-gold-300)" className="right-[3%] top-28 hidden h-56 w-72 text-navy-400 lg:block xl:h-64 xl:w-80" speed={0.15} />
      <FloatGraphic shape="nodes" node="var(--color-gold-300)" className="bottom-[6%] right-[8%] hidden size-32 text-navy-500 lg:block" speed={0.35} delay={0.8} />
      <FloatGraphic shape="spark" className="right-[30%] top-[14%] hidden size-4 text-gold-300 lg:block" speed={0.5} />
      <div className="container-page relative z-10 pt-section">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal self className="lg:col-span-3">
            <p className="eyebrow">
              <span className="text-accent">03 /</span> Our philosophy
            </p>
          </Reveal>
          <SplitHeading id="philosophy-title" className="text-display-lg lg:col-span-9 max-w-[18ch]">
            Connection is power: the power to build, to solve and <em className="em-accent">to inspire.</em>
          </SplitHeading>
        </div>
      </div>

      <div data-pin="" className="relative z-10 lg:flex lg:h-svh lg:items-center">
        <div className="container-page grid gap-6 py-16 lg:grid-cols-12 lg:gap-8 lg:py-0">
          {/* Giant numerals (desktop) */}
          <div aria-hidden className="relative hidden h-[clamp(12rem,24vw,22rem)] overflow-hidden lg:col-span-4 lg:block">
            <div data-nums="" className="font-display leading-[0.9] tracking-tighter">
              {steps.map((s, i) => (
                <div key={s.title} className="text-outline h-[clamp(12rem,24vw,22rem)] text-[clamp(12rem,24vw,22rem)] text-gold-300/70">
                  0{i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Progress rail (desktop) */}
          <div aria-hidden className="relative hidden lg:col-span-1 lg:flex lg:justify-center">
            <div className="relative h-72 w-px bg-white/15">
              <div data-bar="" className="absolute inset-0 origin-top scale-y-0 bg-gold-300" />
              {steps.map((s, i) => (
                <span
                  key={s.title}
                  data-dot=""
                  className={cn("absolute left-1/2 size-2.5 -translate-x-1/2 rounded-full border border-gold-300", i === 0 ? "bg-gold-300" : "bg-navy-950")}
                  style={{ top: `calc(${(i / (steps.length - 1)) * 100}% - 5px)` }}
                />
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="relative lg:col-span-7 lg:h-[26rem]">
            {steps.map((s, i) => (
              <div
                key={s.title}
                data-step=""
                data-reveal=""
                className="relative mb-6 rounded-2xl border border-line bg-white/[0.03] p-8 backdrop-blur-sm lg:mb-0 lg:p-12 lg:motion-ok:[.js_&]:absolute lg:motion-ok:[.js_&]:inset-0"
              >
                <div className="flex items-start justify-between gap-6">
                  <span
                    aria-hidden
                    className="block size-14 bg-gold-300 [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] lg:size-16"
                    style={{ maskImage: `url(${s.icon})`, WebkitMaskImage: `url(${s.icon})` }}
                  />
                  <span className="font-mono text-sm text-fg-subtle lg:hidden">0{i + 1}</span>
                </div>
                <h3 className="mt-8 font-display text-display-md text-heading">{s.title}</h3>
                <p className="mt-4 max-w-[44ch] text-lead text-fg-muted">{s.text}</p>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {s.points.map((p) => (
                    <li key={p} className="rounded-pill border border-line-strong px-4 py-1.5 text-sm text-fg">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-page relative z-10 pb-section-sm">
        <p className="max-w-[60ch] border-t border-line pt-8 text-fg-muted">
          We approach every project as a partnership, co-creating value so that each engagement leaves people, organisations
          and communities <em className="font-display text-heading">better connected and more capable than before.</em>
        </p>
      </div>
    </section>
  );
}
