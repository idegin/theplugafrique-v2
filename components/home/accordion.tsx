"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

/** FAQ accordion: height expand/collapse via grid rows, plus → minus icon morph. */
export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <div className="border-t border-line">
      {items.map((it, n) => {
        const isOpen = open === n;
        return (
          <div key={it.q} className="border-b border-line">
            <h3>
              <button
                id={`${id}-h-${n}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-p-${n}`}
                onClick={() => setOpen(isOpen ? null : n)}
                className="group flex w-full items-start gap-6 py-7 text-left"
              >
                <span className="font-mono text-xs text-fg-subtle pt-2">0{n + 1}</span>
                <span className={cn("flex-1 font-display text-heading-lg font-normal transition-colors duration-300", isOpen ? "text-heading" : "text-fg group-hover:text-heading")}>
                  {it.q}
                </span>
                <span aria-hidden className={cn("relative mt-1 grid size-9 shrink-0 place-items-center rounded-full border transition-colors duration-300", isOpen ? "border-transparent bg-primary text-on-primary" : "border-line-strong text-heading")}>
                  <span className="absolute h-px w-3.5 bg-current" />
                  <span className={cn("absolute h-px w-3.5 bg-current transition-transform duration-500 ease-out-expo", isOpen ? "rotate-0" : "rotate-90")} />
                </span>
              </button>
            </h3>
            <div
              id={`${id}-p-${n}`}
              role="region"
              aria-labelledby={`${id}-h-${n}`}
              className={cn("grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}
            >
              <div className="overflow-hidden">
                <p className="max-w-[60ch] pb-8 pl-[calc(0.75rem+1.5rem+0.5ch)] text-fg-muted">{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
