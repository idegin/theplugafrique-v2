"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type PointerEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type HoverListItem = {
  href: string;
  title: string;
  kicker: string;
  meta: string;
  image: { src: string; alt: string };
};

/**
 * Text list where a floating image follows the cursor
 * (glossary: Image reveal on hover (list), Cursor follower). Fine pointers only.
 */
export function HoverList({ items }: { items: HoverListItem[] }) {
  const wrap = useRef<HTMLUListElement>(null);
  const float = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || !float.current || !wrap.current) return;
    if (!xTo.current) {
      xTo.current = gsap.quickTo(float.current, "x", { duration: 0.6, ease: "power3.out" });
      yTo.current = gsap.quickTo(float.current, "y", { duration: 0.6, ease: "power3.out" });
    }
    const r = wrap.current.getBoundingClientRect();
    xTo.current(e.clientX - r.left);
    yTo.current?.(e.clientY - r.top);
  };

  return (
    <ul ref={wrap} className="relative border-t border-line" onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
      {items.map((it, n) => (
        <li key={it.href} onPointerEnter={(e) => e.pointerType === "mouse" && setActive(n)} className="border-b border-line">
          <Link href={it.href} className="group flex items-start gap-5 py-7 md:gap-8">
            <span className="font-mono text-xs text-fg-subtle md:pt-2">0{n + 1}</span>
            <span className="flex-1">
              <span className="eyebrow !text-accent">{it.kicker}</span>
              <span className="mt-2 block font-display text-display-sm text-heading transition-transform duration-500 ease-out-expo group-hover:translate-x-2">
                {it.title}
              </span>
              <span className="mt-2 block text-sm text-fg-muted">{it.meta}</span>
            </span>
            <span className="mt-2 grid size-10 shrink-0 place-items-center rounded-full border border-line-strong text-heading transition-[background-color,color,transform] duration-300 group-hover:rotate-45 group-hover:bg-primary group-hover:text-on-primary">
              <ArrowUpRight className="size-4" strokeWidth={1.5} />
            </span>
          </Link>
        </li>
      ))}
      <div
        ref={float}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-10 hidden pointer-fine:block"
        style={{ width: 0, height: 0 }}
      >
        <div
          className={cn(
            "relative -translate-x-1/2 -translate-y-[60%] overflow-hidden rounded-lg shadow-xl transition-[opacity,transform] duration-500 ease-out-expo",
            active === null ? "scale-75 opacity-0" : "scale-100 opacity-100",
          )}
          style={{ width: "17rem", height: "12rem" }}
        >
          {items.map((it, n) => (
            <Image
              key={it.href}
              src={it.image.src}
              alt=""
              fill
              sizes="17rem"
              className={cn("object-cover transition-opacity duration-300", active === n ? "opacity-100" : "opacity-0")}
            />
          ))}
        </div>
      </div>
    </ul>
  );
}
