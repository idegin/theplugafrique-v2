"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";

const items = [
  { t: "Pan-African roots, global perspective", d: "Deeply connected to Africa's energy, diversity and potential, and globally attuned, bringing cross-continental experience and world-class standards to every engagement." },
  { t: "Independent but connected", d: "A nimble, boutique consultancy backed by an extended network of partners and collaborators across industries and geographies." },
  { t: "Human at the core", d: "We design around people, their needs, motivations and aspirations, so that strategy always meets empathy." },
  { t: "Insight meets execution", d: "We bridge the gap between thinking and doing, so that ideas are not just inspiring but actionable, measurable and sustainable." },
];

/** About · why TPA as a sticky heading + scroll-spy list (glossary: Sticky sections, Scroll-spy). */
export function Differentiators() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section aria-labelledby="diff-title" className="bg-surface-muted py-section">
      <div className="container-page grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal self>
              <p className="eyebrow eyebrow-rule mb-6">Why The Plug Afrique</p>
            </Reveal>
            <SplitHeading id="diff-title" className="text-display-lg max-w-[12ch]">
              Four reasons to <em className="em-accent">plug in.</em>
            </SplitHeading>
            <div aria-hidden className="mt-12 hidden items-baseline gap-4 lg:flex">
              <span className="font-display text-[8rem] leading-none tracking-tighter text-heading tabular-nums">0{active + 1}</span>
              <span className="font-mono text-sm text-fg-subtle">/ 04</span>
            </div>
          </div>
        </div>
        <ol className="lg:col-span-7">
          {items.map((it, i) => (
            <li
              key={it.t}
              ref={(el) => {
                refs.current[i] = el;
              }}
              data-i={i}
              className={cn(
                "border-t border-line py-10 transition-[opacity,transform] duration-700 ease-out-expo lg:py-16",
                active === i ? "opacity-100" : "lg:opacity-30",
              )}
            >
              <div className="flex gap-6">
                <span className={cn("mt-3 block h-px w-10 shrink-0 transition-[width,background-color] duration-700", active === i ? "w-16 bg-accent-fill" : "bg-line-strong")} />
                <div>
                  <h3 className="font-display text-display-sm text-heading">{it.t}</h3>
                  <p className="mt-4 max-w-[50ch] text-lead text-fg-muted">{it.d}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
