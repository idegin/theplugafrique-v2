"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Category tabs with a sliding indicator (glossary: Tab indicator slide) and
 * layout-friendly filtering. Cards are rendered on the server and passed in.
 */
export function PostFilter({
  categories,
  cards,
}: {
  categories: { name: string; slug: string; count: number }[];
  cards: { slug: string; category: string; node: ReactNode }[];
}) {
  const [active, setActive] = useState("all");
  const tabs = [{ name: "All", slug: "all", count: cards.length }, ...categories];
  const listRef = useRef<HTMLDivElement>(null);
  const [ind, setInd] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    if (el) setInd({ left: el.offsetLeft, width: el.offsetWidth });
  }, [active]);

  const visible = cards.filter((c) => active === "all" || c.category === active);

  return (
    <div>
      <div className="-mx-gutter overflow-x-auto px-gutter pb-2">
        <div ref={listRef} role="tablist" aria-label="Filter by category" className="relative inline-flex gap-1 rounded-pill border border-line bg-surface p-1">
          <span aria-hidden className="absolute inset-y-1 rounded-pill bg-primary transition-[left,width] duration-500 ease-out-expo" style={{ left: ind.left, width: ind.width }} />
          {tabs.map((t) => (
            <button
              key={t.slug}
              role="tab"
              data-tab={t.slug}
              aria-selected={active === t.slug}
              onClick={() => setActive(t.slug)}
              className={cn("relative z-10 whitespace-nowrap rounded-pill px-4 py-2 text-sm font-medium transition-colors duration-300", active === t.slug ? "text-on-primary" : "text-fg-muted hover:text-heading")}
            >
              {t.name} <span className="ml-1 font-mono text-[11px] opacity-60">{t.count}</span>
            </button>
          ))}
        </div>
      </div>
      <div role="tabpanel" className="mt-12 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((c) => (
          <div key={c.slug} className="animate-fade-up">
            {c.node}
          </div>
        ))}
      </div>
    </div>
  );
}
