"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, prefersReducedMotion, registerGsap, ScrollTrigger } from "@/lib/motion";

let lenisRef: Lenis | null = null;
/** The active Lenis instance (null under reduced motion). */
export const getLenis = () => lenisRef;

/**
 * Lenis inertia scroll driven by the GSAP ticker, so ScrollTrigger stays in
 * sync. Disabled entirely when the user prefers reduced motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    registerGsap();
    // Fonts and images shift layout after first paint, so recompute trigger positions
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    if (prefersReducedMotion()) return () => window.removeEventListener("load", refresh);

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, anchors: { offset: -80 } });
    lenisRef = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef = null;
    };
  }, []);

  return <>{children}</>;
}
