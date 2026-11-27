"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, registerGsap, SplitText, useGSAP, ease, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Line-mask reveal (glossary: Split text reveal, Line mask reveal).
 * Each line slides up from behind a mask. Waits for fonts so lines split
 * at their final positions.
 */
export function SplitHeading({
  as,
  children,
  className,
  delay = 0,
  start = "top 82%",
  type = "lines",
  id,
}: {
  id?: string;
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  /** "load" plays on mount (hero); otherwise a ScrollTrigger start. */
  start?: string;
  type?: "lines" | "words";
}) {
  const Tag = (as ?? "h2") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let split: SplitText | undefined;
        let tween: gsap.core.Tween | undefined;
        document.fonts.ready.then(() => {
          split = SplitText.create(el, {
            type: type === "lines" ? "lines" : "words,lines",
            mask: "lines",
            linesClass: "split-line",
            autoSplit: true,
            onSplit(self) {
              gsap.set(el, { visibility: "visible" });
              const targets = type === "lines" ? self.lines : self.words;
              tween = gsap.from(targets, {
                yPercent: 110,
                duration: 1.1,
                delay,
                ease: ease.outExpo,
                stagger: type === "lines" ? stagger.lines : 0.035,
                scrollTrigger: start === "load" ? undefined : { trigger: el, start, once: true },
              });
              return tween;
            },
          });
        });
        return () => {
          tween?.kill();
          split?.revert();
        };
      });
      mm.add("(prefers-reduced-motion: reduce)", () => gsap.set(el, { visibility: "visible" }));
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} data-split="" className={cn(className)}>
      {children}
    </Tag>
  );
}
