"use client";

import { useRef } from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/motion";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export const PROCESS = [
  { t: "Diagnose", d: "Stakeholder interviews, market and policy scans and capability reviews to see the situation clearly.", out: "Shared understanding" },
  { t: "Design", d: "Strategic options with explicit trade-offs, co-created with your team so decisions are made in daylight.", out: "A plan worth executing" },
  { t: "Connect", d: "We convene the partners, experts and resources the plan needs, and align their interests.", out: "The right people in the room" },
  { t: "Deliver", d: "Roadmaps, governance and hands-on support to move from plan to measurable progress.", out: "Results you can measure" },
];

/**
 * Services · how we engage: a vertical timeline whose spine draws with scroll
 * and nodes light up as each step passes (glossary: Path drawing on scroll, Scrub).
 */
export function Process({ steps = PROCESS, title }: { steps?: typeof PROCESS; title?: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      registerGsap();
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(root.querySelector("[data-spine]"), { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: root.querySelector("[data-steps]"), start: "top 60%", end: "bottom 60%", scrub: 0.6 } });
        root.querySelectorAll<HTMLElement>("[data-step-row]").forEach((row) => {
          gsap.fromTo(row.querySelector("[data-step-body]"), { opacity: 0.25, x: 30 }, { opacity: 1, x: 0, ease: "power2.out", scrollTrigger: { trigger: row, start: "top 75%", end: "top 50%", scrub: 0.6 } });
          gsap.to(row.querySelector("[data-node]"), { backgroundColor: "#f2cb7a", borderColor: "#f2cb7a", color: "#001135", scale: 1.15, scrollTrigger: { trigger: row, start: "top 60%", toggleActions: "play none none reverse" } });
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-labelledby="process-title" className="relative bg-canvas py-section">
      <div className="container-page grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal self>
              <p className="eyebrow eyebrow-rule mb-6">How we engage</p>
            </Reveal>
            <SplitHeading id="process-title" className="text-display-lg max-w-[11ch]">
              {title ?? (
                <>
                  A clear path from <em className="em-accent">idea to impact.</em>
                </>
              )}
            </SplitHeading>
          </div>
        </div>
        <div data-steps="" className="relative lg:col-span-7 lg:col-start-6">
          <div aria-hidden className="absolute bottom-4 left-[1.1rem] top-4 w-px bg-line-strong">
            <div data-spine="" className="h-full w-px origin-top bg-gold-500" />
          </div>
          <ol className="space-y-14 lg:space-y-20">
            {steps.map((s, i) => (
              <li key={s.t} data-step-row="" className="relative pl-16">
                <span data-node="" aria-hidden className={cn("absolute left-0 top-1 grid size-9 place-items-center rounded-full border-2 border-line-strong bg-canvas font-mono text-xs text-heading")}>
                  0{i + 1}
                </span>
                <div data-step-body="">
                <h3 className="font-display text-display-md text-heading">{s.t}</h3>
                <p className="mt-3 max-w-[50ch] text-lead text-fg-muted">{s.d}</p>
                <p className="mt-5 inline-flex items-center gap-2 rounded-pill bg-surface-muted px-4 py-1.5 text-sm text-heading">
                  <span className="size-1.5 rounded-full bg-accent-fill" /> {s.out}
                </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
