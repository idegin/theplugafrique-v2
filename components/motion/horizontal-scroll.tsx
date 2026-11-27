"use client";

import { useRef, type ReactNode } from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Pinned horizontal scroll (glossary: Horizontal scroll section). Vertical
 * scroll moves the track sideways on lg+; on smaller screens / reduced
 * motion it is a native swipeable row with scroll-snap.
 */
export function HorizontalScroll({ children, className, header }: { children: ReactNode; className?: string; header?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const root = ref.current;
      if (!root) return;
      const track = root.querySelector<HTMLElement>("[data-htrack]");
      const bar = root.querySelector<HTMLElement>("[data-hbar]");
      if (!track) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 64rem) and (prefers-reduced-motion: no-preference)", () => {
        const distance = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => bar && gsap.set(bar, { scaleX: self.progress }),
          },
        });
        // Items subtly rise as they travel into view
        gsap.utils.toArray<HTMLElement>(track.querySelectorAll("[data-hitem]")).forEach((item) => {
          gsap.from(item, { y: 60, opacity: 0.3, ease: "none", scrollTrigger: { trigger: item, containerAnimation: tween, start: "left 95%", end: "left 55%", scrub: true } });
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden lg:flex lg:h-svh lg:flex-col lg:justify-center", className)}>
      {header}
      <div data-htrack="" className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-gutter pb-6 [scrollbar-width:none] lg:w-max lg:snap-none lg:overflow-visible lg:pb-0 lg:pl-[max(var(--spacing-gutter),calc((100vw-var(--container-page))/2+var(--spacing-gutter)))] lg:pr-[20vw]">
        {children}
      </div>
      <div className="container-page mt-10 hidden lg:block">
        <div className="h-px bg-line">
          <div data-hbar="" className="h-px origin-left scale-x-0 bg-accent-fill" />
        </div>
      </div>
    </div>
  );
}
