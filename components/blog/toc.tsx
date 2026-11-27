"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/cms/markdown";
import { cn } from "@/lib/utils";

/** Sticky table of contents with scroll-spy (glossary: Scroll-spy). */
export function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);
  if (!items.length) return null;
  return (
    <nav aria-label="On this page">
      <p className="eyebrow mb-5">On this page</p>
      <ul className="space-y-1 border-l border-line">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              className={cn(
                "-ml-px block border-l py-1.5 text-sm transition-colors duration-300",
                i.depth === 3 ? "pl-7" : "pl-4",
                active === i.id ? "border-accent-fill text-heading" : "border-transparent text-fg-muted hover:text-heading",
              )}
            >
              {i.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
