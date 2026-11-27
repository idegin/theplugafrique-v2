import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite marquee (adapted from Magic UI's marquee). CSS-only; paused on hover
 * and frozen under reduced motion by the global rule.
 */
export function Marquee({
  children,
  className,
  reverse = false,
  duration = 40,
  gap = "3rem",
  repeat = 3,
  pauseOnHover = true,
}: {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  duration?: number;
  gap?: string;
  repeat?: number;
  pauseOnHover?: boolean;
}) {
  return (
    <div
      className={cn("group flex overflow-hidden", className)}
      style={{ "--marquee-duration": `${duration}s`, "--marquee-gap": gap, gap } as CSSProperties}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          aria-hidden={i > 0}
          className={cn(
            "flex shrink-0 items-center justify-around motion-ok:animate-marquee",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
          style={{ gap }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
