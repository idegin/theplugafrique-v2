"use client";

import { useRef } from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/motion";

/** Giant wordmark: outline fills with colour as the page ends (glossary: Outline-to-fill). */
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el) return;
      const fill = el.querySelector("[data-fill]");
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          fill,
          { clipPath: "inset(-0.3em 100% -0.3em 0)" },
          { clipPath: "inset(-0.3em 0% -0.3em 0)", ease: "none", scrollTrigger: { trigger: el, start: "top 95%", end: "bottom bottom", scrub: 0.6 } },
        );
        gsap.from(el.querySelectorAll("[data-letter]"), {
          yPercent: 40,
          opacity: 0,
          stagger: 0.04,
          ease: "expo.out",
          duration: 1.2,
          scrollTrigger: { trigger: el, start: "top 95%", once: true },
        });
      });
    },
    { scope: ref },
  );

  const word = "The Plug Afrique";
  const letters = (cls?: string) =>
    word.split("").map((c, i) => (
      <span key={i} data-letter="" className={cls ? "inline-block" : "inline-block"} style={{ whiteSpace: "pre" }}>
        {c}
      </span>
    ));

  return (
    <div ref={ref} aria-hidden className="relative select-none font-display leading-[0.85] tracking-[-0.045em] text-[clamp(3rem,15.1vw,15.5rem)] whitespace-nowrap">
      <div className="text-outline text-white/25">{letters()}</div>
      <div data-fill="" className="absolute inset-0 text-gold-300" style={{ clipPath: "inset(-0.3em 0% -0.3em 0)" }}>
        {word}
      </div>
    </div>
  );
}
