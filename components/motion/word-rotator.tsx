"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** One word cycles through options (glossary: Word rotator). Announced politely. */
export function WordRotator({ words, interval = 2600, className, wordClassName }: { words: string[]; interval?: number; className?: string; wordClassName?: string }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (paused) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words.length, interval, paused]);

  return (
    <span
      className={cn("relative inline-grid overflow-hidden align-bottom", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Reserve the width of the longest word so layout never jumps */}
      {words.map((w, n) => (
        <span
          key={w}
          aria-hidden={n !== i}
          className={cn(
            "col-start-1 row-start-1 whitespace-nowrap transition-[transform,opacity] duration-700 ease-out-expo",
            wordClassName,
            n === i ? "translate-y-0 opacity-100" : n === (i - 1 + words.length) % words.length ? "-translate-y-full opacity-0" : "translate-y-full opacity-0",
          )}
        >
          {w}
        </span>
      ))}
      <span className="visually-hidden" aria-live="polite">
        {words[i]}
      </span>
    </span>
  );
}
