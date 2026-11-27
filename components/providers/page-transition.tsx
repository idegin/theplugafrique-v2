"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/motion";
import { getLenis } from "./smooth-scroll";
import { stripBasePath } from "@/lib/base-path";

/**
 * Curtain page transition (glossary: Curtain / Overlay transition, Wipe).
 * Internal link clicks: a navy panel covers the screen, the route changes,
 * then the panel lifts away. Skipped for modified clicks, hash links,
 * external links and reduced motion.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const first = useRef(true);

  useEffect(() => {
    registerGsap();
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname) return; // same page / hash
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      e.preventDefault();
      e.stopPropagation();
      if (busy.current) return;
      busy.current = true;
      const el = ref.current!;
      gsap.set(el, { visibility: "visible" });
      gsap
        .timeline()
        .fromTo(el, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 0.65, ease: "power4.inOut" })
        .fromTo(el.querySelector("[data-line]"), { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "expo.out" }, "-=0.25")
        .add(() => router.push(stripBasePath(url.pathname) + url.search + url.hash));
    };
    // Capture phase: run before Next <Link>, which would otherwise navigate first
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // Uncover after each route change
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    getLenis()?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    const el = ref.current;
    if (!el) return;
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      gsap
        .timeline({ onComplete: () => { gsap.set(el, { visibility: "hidden" }); busy.current = false; } })
        .to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.8, ease: "power4.inOut", delay: 0.1 });
    });
  }, [pathname]);

  return (
    <div ref={ref} aria-hidden className="on-dark bg-aurora-navy bg-grain pointer-events-none invisible fixed inset-0 z-[95] grid place-items-center" style={{ clipPath: "inset(100% 0 0 0)" }}>
      <div className="relative z-10 flex flex-col items-center gap-5">
        <span className="font-display text-display-md text-heading">
          Plugging <em className="em-accent">in…</em>
        </span>
        <span data-line="" className="block h-px w-40 origin-left bg-gold-300" />
      </div>
    </div>
  );
}
