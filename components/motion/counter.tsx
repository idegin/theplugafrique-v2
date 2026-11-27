"use client";

import { useRef } from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/motion";

/** Number roll-up when it enters the viewport (glossary: Counter / Number roll-up). */
export function Counter({ value, suffix = "", prefix = "", className }: { value: number; suffix?: string; prefix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const state = { n: 0 };
        gsap.to(state, {
          n: value,
          duration: 2,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = `${prefix}${Math.round(state.n)}${suffix}`;
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${value}${suffix}`}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
