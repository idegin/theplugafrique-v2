"use client";

import { useRef, type ReactNode } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/·+";

/** Text scramble on hover (glossary: Text scramble / Decode). For short labels only. */
export function Scramble({ text, className, children }: { text: string; className?: string; children?: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const run = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const total = text.length * 2;
    const id = window.setInterval(() => {
      el.textContent = text
        .split("")
        .map((c, i) => (c === " " ? " " : i < frame / 2 ? c : CHARS[Math.floor(Math.random() * CHARS.length)]))
        .join("");
      if (++frame > total) {
        window.clearInterval(id);
        el.textContent = text;
      }
    }, 28);
  };
  return (
    <span onMouseEnter={run} onFocus={run} className={className}>
      <span ref={ref} aria-label={text}>
        {text}
      </span>
      {children}
    </span>
  );
}
