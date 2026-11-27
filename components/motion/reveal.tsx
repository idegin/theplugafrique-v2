"use client";

import { useRef, type ElementType, type ReactNode, type ComponentPropsWithoutRef } from "react";
import { gsap, registerGsap, useGSAP, ease, stagger as staggers } from "@/lib/motion";

type RevealProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  /** Animate direct children marked [data-reveal] one after another. */
  stagger?: number;
  y?: number;
  x?: number;
  scale?: number;
  blur?: boolean;
  delay?: number;
  duration?: number;
  /** ScrollTrigger start, e.g. "top 85%". Use "load" to play on mount. */
  start?: string;
  /** Animate the wrapper itself instead of its [data-reveal] descendants. */
  self?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "children">;

/**
 * Fade-up / staggered reveal on enter viewport (glossary: Scroll reveal,
 * Staggered reveal, Blur-in). Mark animated elements with `data-reveal`.
 * Pass `self` to animate the wrapper instead.
 */
export function Reveal<T extends ElementType = "div">({
  as,
  children,
  stagger = staggers.items,
  y = 28,
  x = 0,
  scale = 1,
  blur = false,
  delay = 0,
  duration = 0.9,
  start = "top 85%",
  self = false,
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const root = ref.current;
      if (!root) return;
      const targets = self ? [root] : gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-reveal]"));
      if (!targets.length) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          targets,
          { autoAlpha: 0, y, x, scale, filter: blur ? "blur(10px)" : "none" },
          {
            autoAlpha: 1,
            y: 0,
            x: 0,
            scale: 1,
            filter: "none",
            duration,
            delay,
            ease: ease.outExpo,
            stagger,
            clearProps: "filter,transform",
            scrollTrigger: start === "load" ? undefined : { trigger: root, start, once: true },
          },
        );
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(targets, { autoAlpha: 1 });
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} {...(rest as object)} {...(self ? { "data-reveal": "" } : {})}>
      {children}
    </Tag>
  );
}
