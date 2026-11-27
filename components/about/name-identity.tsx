"use client";

import { useRef } from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/motion";
import { Reveal } from "@/components/motion/reveal";

const parts = [
  { word: "The Plug", def: "The trusted source who knows the right person, the right resource and the right door, and makes things happen." },
  { word: "Afrique", def: "A continental, Pan-African and multilingual outlook: rooted in Africa, open to the world." },
];

/** About · name & identity: giant words fill from outline as you scroll (glossary: Outline-to-fill). */
export function NameIdentity() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      registerGsap();
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        root.querySelectorAll<HTMLElement>("[data-word]").forEach((w) => {
          gsap.fromTo(
            w.querySelector("[data-fill]"),
            { clipPath: "inset(-0.2em 100% -0.2em 0)" },
            { clipPath: "inset(-0.2em 0% -0.2em 0)", ease: "none", scrollTrigger: { trigger: w, start: "top 80%", end: "top 35%", scrub: 0.6 } },
          );
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-labelledby="name-title" className="relative overflow-hidden bg-canvas py-section">
      <div className="container-page">
        <Reveal self>
          <p id="name-title" className="eyebrow eyebrow-rule mb-12">Our name, our identity</p>
        </Reveal>
        <div className="space-y-12 lg:space-y-6">
          {parts.map((p, i) => (
            <div key={p.word} data-word="" className="grid items-end gap-6 border-b border-line pb-10 lg:grid-cols-12 lg:gap-10">
              <div aria-hidden className="relative font-display leading-[0.9] tracking-[-0.04em] text-[clamp(4rem,1.5rem+12vw,13rem)] lg:col-span-8">
                <span className="text-outline block text-navy-300">{p.word}</span>
                <span data-fill="" className="absolute inset-0 block text-heading" style={{ clipPath: "inset(-0.2em 0% -0.2em 0)" }}>
                  <span className={i === 1 ? "text-accent" : undefined}>{p.word}</span>
                </span>
              </div>
              <div className="lg:col-span-4 lg:pb-6">
                <p className="visually-hidden">{p.word}:</p>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">0{i + 1} / meaning</p>
                <p className="mt-3 text-lead text-fg-muted">{p.def}</p>
              </div>
            </div>
          ))}
        </div>
        <Reveal self className="mt-12">
          <p className="max-w-[54ch] font-display text-display-sm text-heading">
            Progress happens when the right people and ideas meet. It is not just a name. It is our{" "}
            <span className="marker-gold">philosophy, our promise and our way of working.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
