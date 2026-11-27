"use client";

import { useRef, type ReactNode } from "react";
import { gsap, registerGsap, useGSAP, ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Image curtain / clip-path reveal: the frame uncovers from the bottom while the
 * image settles from a slight zoom (glossary: Mask / Clip-path reveal, Image reveal).
 */
export function ClipReveal({
  children,
  className,
  from = "bottom",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  from?: "bottom" | "left" | "right";
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const start = { bottom: "inset(100% 0% 0% 0%)", left: "inset(0% 100% 0% 0%)", right: "inset(0% 0% 0% 100%)" }[from];

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          delay,
          // Drop the clip once revealed so shadows and rounded corners aren't cut
          onComplete: () => {
            el.style.clipPath = "none";
          },
        });
        tl.fromTo(el, { clipPath: start }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: ease.inOutQuint });
        const media = el.querySelector("img, video, canvas");
        if (media) tl.fromTo(media, { scale: 1.25 }, { scale: 1, duration: 1.8, ease: ease.outExpo }, 0);
      });
      mm.add("(prefers-reduced-motion: reduce)", () => gsap.set(el, { clipPath: "none" }));
    },
    { scope: ref },
  );

  return (
    <div ref={ref} data-clip="" className={cn("overflow-hidden", className)}>
      {children}
    </div>
  );
}
