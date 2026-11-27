"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import type { Testimonial } from "@/lib/cms";
import { cn } from "@/lib/utils";

const DURATION = 7000;

/**
 * Crossfade quote carousel with autoplay progress, pause control (WCAG 2.2.2),
 * keyboard arrows and swipe.
 */
export function TestimonialsCarousel({ items }: { items: Testimonial[] }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [tick, setTick] = useState(0);
  const touchX = useRef<number | null>(null);

  const go = useCallback((n: number) => {
    setI((n + items.length) % items.length);
    setTick((t) => t + 1);
  }, [items.length]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => go(i + 1), DURATION);
    return () => window.clearTimeout(id);
  }, [i, playing, go, tick]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(i + 1);
        if (e.key === "ArrowLeft") go(i - 1);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? i + 1 : i - 1);
        touchX.current = null;
      }}
    >
      <div className="grid">
        {items.map((t, n) => (
          <figure
            key={t.slug}
            role="group"
            aria-roledescription="slide"
            aria-label={`${n + 1} of ${items.length}`}
            aria-hidden={n !== i}
            className={cn(
              "col-start-1 row-start-1 transition-[opacity,transform,filter] duration-[900ms] ease-out-expo",
              n === i ? "translate-y-0 opacity-100 blur-0" : "pointer-events-none translate-y-4 opacity-0 blur-sm",
            )}
          >
            <blockquote className="font-display text-display-md font-soft text-heading">
              <p>&ldquo;{t.quote}&rdquo;</p>
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-4">
              <span aria-hidden className="relative grid size-12 place-items-center rounded-full bg-navy-900 text-gold-300">
                <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <circle cx="12" cy="12" r="3" fill="currentColor" />
                  <circle cx="12" cy="12" r="6.5" opacity="0.6" />
                  <circle cx="12" cy="12" r="10" opacity="0.3" />
                </svg>
              </span>
              <span>
                <span className="block font-medium text-heading">{t.name}</span>
                <span className="block text-sm text-fg-muted">
                  {t.role}
                  {t.organisation ? ` · ${t.organisation}` : ""}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-12 flex items-center gap-4">
        <div className="flex flex-1 gap-2" aria-hidden>
          {items.map((t, n) => (
            <button
              key={t.slug}
              tabIndex={-1}
              onClick={() => go(n)}
              className="relative h-1 flex-1 overflow-hidden rounded-full bg-line-strong"
            >
              <span
                key={`${n}-${i}-${tick}-${playing}`}
                className={cn("absolute inset-y-0 left-0 rounded-full bg-heading", n < i ? "w-full" : "w-0")}
                style={n === i && playing ? { animation: `progress-fill ${DURATION}ms linear forwards` } : n === i ? { width: "100%" } : undefined}
              />
            </button>
          ))}
        </div>
        <button onClick={() => setPlaying((p) => !p)} className="grid size-11 place-items-center rounded-full border border-line-strong text-heading transition-colors hover:bg-surface" aria-label={playing ? "Pause testimonials" : "Play testimonials"}>
          {playing ? <Pause className="size-4" strokeWidth={1.5} /> : <Play className="size-4" strokeWidth={1.5} />}
        </button>
        <button onClick={() => go(i - 1)} className="grid size-11 place-items-center rounded-full border border-line-strong text-heading transition-colors hover:bg-surface" aria-label="Previous testimonial">
          <ArrowLeft className="size-4" strokeWidth={1.5} />
        </button>
        <button onClick={() => go(i + 1)} className="grid size-11 place-items-center rounded-full bg-primary text-on-primary transition-colors hover:bg-primary-hover" aria-label="Next testimonial">
          <ArrowRight className="size-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
