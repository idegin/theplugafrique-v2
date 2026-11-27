"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/motion";

/**
 * Cursor follower ring (glossary: Cursor follower, Label cursor). The native
 * cursor stays visible; the ring lags behind it, grows over interactive
 * elements and shows a label over [data-cursor="View"] targets. Fine pointers only.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [state, setState] = useState<"idle" | "hover" | "label">("idle");
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setOn(true);
    const el = ring.current!;
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
    let seen = false;
    const move = (e: PointerEvent) => {
      if (!seen) {
        seen = true;
        gsap.set(el, { x: e.clientX, y: e.clientY });
        gsap.to(el, { opacity: 1, duration: 0.3 });
      }
      xTo(e.clientX);
      yTo(e.clientY);
      const t = e.target as Element;
      const lab = t.closest?.("[data-cursor]")?.getAttribute("data-cursor");
      if (lab) {
        setLabel(lab);
        setState("label");
      } else if (t.closest?.("a, button, [role=button], input, textarea, label")) {
        setState("hover");
      } else setState("idle");
    };
    const leave = () => gsap.to(el, { opacity: 0, duration: 0.2 });
    const enter = () => gsap.to(el, { opacity: 1, duration: 0.2 });
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.addEventListener("pointerenter", enter);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.removeEventListener("pointerenter", enter);
    };
  }, []);

  if (!on) return <div ref={ring} hidden />;
  return (
    <div ref={ring} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[80] opacity-0 mix-blend-difference">
      <div
        className="grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white transition-[width,height,background-color,border-color] duration-300 ease-out-expo"
        style={{
          width: state === "label" ? 84 : state === "hover" ? 52 : 30,
          height: state === "label" ? 84 : state === "hover" ? 52 : 30,
          backgroundColor: state === "label" ? "white" : "transparent",
        }}
      >
        <span className={`font-mono text-[11px] uppercase tracking-[0.14em] text-black transition-opacity duration-200 ${state === "label" ? "opacity-100" : "opacity-0"}`}>{label}</span>
      </div>
    </div>
  );
}
