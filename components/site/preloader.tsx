"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/motion";

const WORD = "The Plug Afrique";

/**
 * First-visit intro (glossary: Preloader / Intro loader, Preloader-to-page).
 * Rendered in the server HTML so it covers the first paint; an inline head
 * script adds `.no-preload` on repeat visits (sessionStorage) and CSS hides it
 * entirely under reduced motion.
 */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;
    const skip = document.documentElement.classList.contains("no-preload") || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try {
      sessionStorage.setItem("tpa-intro", "1");
    } catch {}
    if (skip) {
      el.remove();
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const count = el.querySelector<HTMLElement>("[data-count]");
    const state = { n: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.style.overflow = "";
        el.remove();
        ScrollTrigger.refresh();
      },
    });
    tl.from(el.querySelectorAll("[data-ch]"), { yPercent: 110, duration: 0.9, ease: "expo.out", stagger: 0.03 })
      .to(state, { n: 100, duration: 1.3, ease: "power2.inOut", onUpdate: () => { if (count) count.textContent = String(Math.round(state.n)).padStart(3, "0"); } }, 0)
      .fromTo(el.querySelector("[data-bar]"), { scaleX: 0 }, { scaleX: 1, duration: 1.3, ease: "power2.inOut" }, 0)
      .to(el.querySelectorAll("[data-ch]"), { yPercent: -110, duration: 0.6, ease: "expo.in", stagger: 0.015 }, "+=0.1")
      .to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "power4.inOut" }, "-=0.25");
    return () => {
      tl.kill();
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={ref}
      id="preloader"
      aria-hidden
      className="on-dark bg-aurora-navy bg-grain fixed inset-0 z-[100] flex flex-col justify-between p-gutter text-fg"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <div className="relative z-10 flex justify-between font-mono text-xs uppercase tracking-[0.18em] text-fg-muted">
        <span>Pan-African consulting</span>
        <span>Lagos · Abuja</span>
      </div>
      <div className="relative z-10">
        <p className="overflow-hidden font-display text-[clamp(2.75rem,10vw,9rem)] leading-[1] tracking-[-0.035em] text-heading">
          {WORD.split("").map((c, i) => (
            <span key={i} data-ch="" className="inline-block whitespace-pre">
              {c}
            </span>
          ))}
        </p>
        <div className="mt-8 flex items-center gap-6">
          <div className="h-px flex-1 bg-white/15">
            <div data-bar="" className="h-px origin-left scale-x-0 bg-gold-300" />
          </div>
          <span data-count="" className="font-mono text-sm tabular-nums text-accent">000</span>
        </div>
      </div>
    </div>
  );
}
