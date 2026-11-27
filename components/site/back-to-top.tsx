"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { getLenis } from "@/components/providers/smooth-scroll";
import { cn } from "@/lib/utils";

/** Back-to-top reveal + scroll progress ring (glossary: Back-to-top reveal, Scroll progress). */
export function BackToTop() {
  const [show, setShow] = useState(false);
  const circle = useRef<SVGCircleElement>(null);
  const C = 2 * Math.PI * 22;

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? scrollY / max : 0;
      setShow(scrollY > 700);
      if (circle.current) circle.current.style.strokeDashoffset = String(C * (1 - p));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [C]);

  return (
    <button
      type="button"
      onClick={() => {
        const l = getLenis();
        if (l) l.scrollTo(0, { duration: 1.6 });
        else window.scrollTo({ top: 0 });
      }}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      className={cn(
        "group fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-navy-900 text-ivory-50 shadow-xl transition-[opacity,transform] duration-500 ease-out-expo md:bottom-8 md:right-8",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0 -rotate-90" aria-hidden>
        <circle cx="24" cy="24" r="22" fill="none" stroke="rgb(255 255 255 / 0.15)" strokeWidth="1.5" />
        <circle ref={circle} cx="24" cy="24" r="22" fill="none" stroke="var(--color-gold-300)" strokeWidth="1.5" strokeDasharray={C} strokeDashoffset={C} strokeLinecap="round" />
      </svg>
      <ArrowUp className="relative size-4 transition-transform duration-300 group-hover:-translate-y-0.5" strokeWidth={1.75} />
    </button>
  );
}
