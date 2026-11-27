"use client";

import { useRef, type ReactNode } from "react";
import { gsap, registerGsap, ScrollTrigger, useGSAP } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Marquee whose speed and direction follow scroll velocity
 * (glossary: Marquee on scroll, Scroll velocity effects), with a subtle skew.
 */
export function VelocityMarquee({ children, className, speed = 60, reverse = false }: { children: ReactNode; className?: string; speed?: number; reverse?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const root = ref.current;
      if (!root) return;
      const track = root.querySelector<HTMLElement>("[data-track]");
      if (!track) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const half = track.scrollWidth / 2;
        const dir = reverse ? 1 : -1;
        const loop = gsap.fromTo(
          track,
          { x: reverse ? -half : 0 },
          { x: reverse ? 0 : -half, duration: half / speed, ease: "none", repeat: -1 },
        );
        const skewTo = gsap.quickTo(track, "skewX", { duration: 0.6, ease: "power3.out" });
        const st = ScrollTrigger.create({
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const v = self.getVelocity();
            const boost = gsap.utils.clamp(-4, 4, v / 600);
            gsap.to(loop, { timeScale: (Math.abs(boost) + 1) * (boost < 0 ? -1 : 1), duration: 0.4, overwrite: true, onComplete: () => { gsap.to(loop, { timeScale: 1, duration: 1.2 }); } });
            skewTo(gsap.utils.clamp(-6, 6, (v / 300) * dir * -1));
          },
          onLeave: () => skewTo(0),
        });
        return () => {
          st.kill();
          loop.kill();
        };
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div data-track="" className="flex w-max py-[0.12em] will-change-transform">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
