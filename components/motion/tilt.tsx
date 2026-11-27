"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";
import { gsap } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** 3D tilt toward the cursor with a moving glare (glossary: 3D tilt / Tilt card). */
export function Tilt({ children, className, max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, { rotateY: px * max * 2, rotateX: -py * max * 2, duration: 0.5, ease: "power3.out", transformPerspective: 900 });
    el.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
    el.style.setProperty("--gy", `${(py + 0.5) * 100}%`);
  };
  const leave = () => gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.9, ease: "elastic.out(1, 0.5)" });
  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={cn("group/tilt relative [transform-style:preserve-3d] will-change-transform", className)}>
      {children}
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 pointer-fine:group-hover/tilt:opacity-100" style={{ background: "radial-gradient(500px circle at var(--gx,50%) var(--gy,50%), rgb(255 255 255 / 0.18), transparent 50%)" }} />
    </div>
  );
}
