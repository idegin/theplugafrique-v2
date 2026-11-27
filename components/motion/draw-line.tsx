"use client";

import { useRef } from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * "The Plug Line": an SVG path that draws itself as you scroll
 * (glossary: Path drawing on scroll). Ends in a node that lights up.
 */
export function DrawLine({
  d = "M2 2 C 60 2, 60 78, 120 78 S 180 154, 238 154",
  viewBox = "0 0 240 156",
  className,
  scrub = true,
}: {
  d?: string;
  viewBox?: string;
  className?: string;
  scrub?: boolean;
}) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const svg = ref.current;
      if (!svg) return;
      const path = svg.querySelector("path");
      const nodes = svg.querySelectorAll("circle");
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: scrub
            ? { trigger: svg, start: "top 85%", end: "bottom 45%", scrub: 0.8 }
            : { trigger: svg, start: "top 85%", once: true },
        });
        tl.from(path, { drawSVG: "0%", ease: "none", duration: 1 });
        tl.from(nodes[1], { scale: 0, transformOrigin: "50% 50%", duration: 0.2, ease: "back.out(2)" }, ">-0.05");
      });
    },
    { scope: ref },
  );

  const end = d.trim().split(/[\s,]+/).slice(-2).map(Number);
  const startPt = d.trim().replace(/^M\s*/, "").split(/[\s,]+/).slice(0, 2).map(Number);

  return (
    <svg ref={ref} viewBox={viewBox} fill="none" aria-hidden className={cn("overflow-visible text-accent", className)}>
      <path d={d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <circle cx={startPt[0]} cy={startPt[1]} r="3" fill="currentColor" />
      <circle cx={end[0]} cy={end[1]} r="4" fill="currentColor" />
    </svg>
  );
}
