"use client";

import { useRef, type ReactNode } from "react";
import { gsap, registerGsap, ScrollTrigger, useGSAP } from "@/lib/motion";

/**
 * Stacking cards (glossary: Stacking cards). Each card is CSS-sticky and sized
 * to fit the viewport; as the next card slides over, the covered cards recede
 * (scale + lift) under a soft navy veil. Text is never filtered or greyed.
 * md+ only; on mobile cards simply fade up.
 */
export function StackCards({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const root = ref.current;
      if (!root) return;
      const cards = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-stack-card]"));
      const mm = gsap.matchMedia();

      mm.add("(min-width: 48rem) and (prefers-reduced-motion: no-preference)", () => {
        cards.forEach((card, i) => {
          const inner = card.querySelector<HTMLElement>("[data-stack-inner]");
          const veil = card.querySelector<HTMLElement>("[data-stack-veil]");
          const later = cards.slice(i + 1);
          if (!inner || !later.length) return;
          // Recede a little more for every card that lands on top of this one
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: later[0],
              start: "top bottom",
              endTrigger: cards[cards.length - 1],
              end: "top top+=120",
              scrub: 0.5,
            },
          });
          tl.to(inner, { scale: 1 - later.length * 0.035, yPercent: -2 * later.length, ease: "none" }, 0).to(
            veil,
            { opacity: Math.min(0.55, 0.22 * later.length), ease: "none" },
            0,
          );
        });

        // Progress rail
        const dots = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-stack-dot]"));
        cards.forEach((card, i) => {
          ScrollTrigger.create({
            trigger: card,
            start: "top center",
            end: i === cards.length - 1 ? "bottom top" : () => `+=${card.offsetHeight + window.innerHeight * 0.12}`,
            toggleClass: { targets: dots[i], className: "is-active" },
          });
        });
      });

      mm.add("(max-width: 47.99rem) and (prefers-reduced-motion: no-preference)", () => {
        cards.forEach((card) => {
          gsap.from(card, { y: 48, autoAlpha: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: card, start: "top 90%", once: true } });
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
