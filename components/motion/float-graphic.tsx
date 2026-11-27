"use client";

import { useRef } from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Floating line-art graphics (DESIGN.md §5 motifs): drift on a slow loop and
 * move with scroll parallax. Decorative only (aria-hidden, pointer-events-none).
 */
export type FloatShape = "orbit" | "rings" | "plug" | "diamond" | "spark" | "arc" | "nodes";

const shapes: Record<FloatShape, { viewBox: string; body: React.ReactNode }> = {
  orbit: {
    viewBox: "0 0 240 200",
    body: (
      <>
        <path d="M24 150 C 60 90, 90 70, 120 96 S 180 40, 216 30" />
        <path d="M120 96 C 140 130, 170 150, 206 160" strokeDasharray="2 6" />
        <path d="M60 40 C 80 70, 100 84, 120 96" opacity="0.6" />
        <circle cx="120" cy="96" r="12" opacity="0.5" />
        <circle cx="120" cy="96" r="22" opacity="0.25" />
        <circle cx="120" cy="96" r="5" fill="var(--node, currentColor)" stroke="none" />
        <circle cx="24" cy="150" r="3.5" fill="var(--node, currentColor)" stroke="none" />
        <circle cx="216" cy="30" r="4" fill="var(--node, currentColor)" stroke="none" />
        <circle cx="206" cy="160" r="3" fill="var(--node, currentColor)" stroke="none" />
        <circle cx="60" cy="40" r="3" fill="var(--node, currentColor)" stroke="none" />
      </>
    ),
  },
  rings: {
    viewBox: "0 0 200 200",
    body: (
      <>
        {[96, 76, 56, 36].map((r, i) => (
          <circle key={r} cx="100" cy="100" r={r} opacity={0.25 + i * 0.2} strokeDasharray={i % 2 ? "2 6" : undefined} />
        ))}
        <circle cx="100" cy="100" r="5" fill="var(--node, currentColor)" stroke="none" />
      </>
    ),
  },
  plug: {
    viewBox: "0 0 220 80",
    body: (
      <>
        <path d="M4 40 H70 C 90 40, 90 14, 110 14 S 130 66, 150 66 H216" />
        <circle cx="4" cy="40" r="4" fill="var(--node, currentColor)" stroke="none" />
        <rect x="104" y="6" width="12" height="16" rx="3" />
        <circle cx="216" cy="66" r="5" fill="var(--node, currentColor)" stroke="none" />
      </>
    ),
  },
  diamond: {
    viewBox: "0 0 240 60",
    body: (
      <>
        {Array.from({ length: 6 }, (_, i) => (
          <g key={i} transform={`translate(${i * 40} 0)`}>
            <path d="M20 4 L36 30 L20 56 L4 30 Z" />
            <path d="M20 18 L27 30 L20 42 L13 30 Z" fill={i % 2 ? "var(--node, currentColor)" : "none"} />
          </g>
        ))}
      </>
    ),
  },
  spark: {
    viewBox: "0 0 60 60",
    body: <path d="M30 2 C32 22, 38 28, 58 30 C38 32, 32 38, 30 58 C28 38, 22 32, 2 30 C22 28, 28 22, 30 2 Z" fill="var(--node, currentColor)" stroke="none" />,
  },
  arc: {
    viewBox: "0 0 200 120",
    body: (
      <>
        <path d="M6 114 A 94 94 0 0 1 194 114" strokeDasharray="1 7" strokeWidth="2" strokeLinecap="round" />
        <path d="M36 114 A 64 64 0 0 1 164 114" />
        <circle cx="100" cy="50" r="4" fill="var(--node, currentColor)" stroke="none" />
      </>
    ),
  },
  nodes: {
    viewBox: "0 0 160 160",
    body: (
      <>
        <path d="M20 120 L70 40 L130 70 L100 140 Z M70 40 L100 140" opacity="0.7" />
        {[
          [20, 120],
          [70, 40],
          [130, 70],
          [100, 140],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === 1 ? 6 : 4} fill="var(--node, currentColor)" stroke="none" />
        ))}
      </>
    ),
  },
};

export function FloatGraphic({
  shape,
  className,
  speed = 0.15,
  spin = false,
  delay = 0,
  node,
}: {
  /** Fill colour for solid nodes, e.g. "var(--color-gold-300)" */
  node?: string;
  shape: FloatShape;
  className?: string;
  /** Parallax travel as a fraction of the element's height */
  speed?: number;
  spin?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const s = shapes[shape];

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          el,
          { yPercent: speed * 100 },
          { yPercent: -speed * 100, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
        );
        const svg = el.querySelector("svg");
        gsap.to(svg, { y: -12, x: 6, rotate: spin ? 0 : 4, duration: 5 + delay, ease: "sine.inOut", yoyo: true, repeat: -1, delay });
        if (spin) gsap.to(svg, { rotate: 360, duration: 60, ease: "none", repeat: -1 });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} aria-hidden className={cn("pointer-events-none absolute select-none", className)} style={node ? ({ "--node": node } as React.CSSProperties) : undefined}>
      <svg viewBox={s.viewBox} fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" className="h-full w-full overflow-visible">
        {s.body}
      </svg>
    </div>
  );
}
