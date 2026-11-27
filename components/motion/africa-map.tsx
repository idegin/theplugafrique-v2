"use client";

import { useMemo, useRef } from "react";
import { isAfrica } from "@/lib/geo";
import { gsap, registerGsap, useGSAP } from "@/lib/motion";
import { cn } from "@/lib/utils";

const X = (lon: number) => (lon + 19) * 10;
const Y = (lat: number) => (39 - lat) * 10;

/**
 * SVG dot-matrix Africa with pulsing office pins and connection arcs that
 * draw on scroll (glossary: Animated SVG patterns, Path drawing on scroll).
 */
export function AfricaMap({
  pins,
  className,
}: {
  pins: { label: string; lon: number; lat: number; primary?: boolean; labelSide?: "left" | "right" }[];
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const dots = useMemo(() => {
    const out: [number, number][] = [];
    for (let lat = -36; lat <= 38; lat += 1.6) for (let lon = -18; lon <= 52; lon += 1.6) if (isAfrica(lon, lat)) out.push([X(lon), Y(lat)]);
    return out;
  }, []);
  const hub = pins.find((p) => p.primary) ?? pins[0];
  const network: [number, number][] = [
    [-0.2, 5.6], [-17.4, 14.7], [31.2, 30], [36.8, -1.3], [28, -26.2], [15.3, -4.3], [38.7, 9], [-7.6, 33.6],
  ];

  useGSAP(
    () => {
      registerGsap();
      const svg = ref.current;
      if (!svg) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: svg, start: "top 75%", once: true } });
        tl.from(svg.querySelectorAll("[data-dot]"), { opacity: 0, duration: 0.6, stagger: { amount: 1.2, from: "random" } })
          .from(svg.querySelectorAll("[data-arc]"), { drawSVG: "0%", duration: 1.1, ease: "power2.inOut", stagger: 0.1 }, 0.3)
          .from(svg.querySelectorAll("[data-pin]"), { scale: 0, transformOrigin: "50% 50%", duration: 0.6, ease: "back.out(2)", stagger: 0.15 }, 0.8);
      });
    },
    { scope: ref },
  );

  return (
    <svg ref={ref} viewBox="0 0 720 760" className={cn("h-auto w-full", className)} role="img" aria-label={`Map of Africa showing ${pins.map((p) => p.label).join(" and ")}`}>
      <g className="text-navy-300/60">
        {dots.map(([x, y], i) => (
          <circle key={i} data-dot="" cx={x} cy={y} r={2.6} fill="currentColor" />
        ))}
      </g>
      {network.map(([lon, lat], i) => {
        const x1 = X(hub.lon), y1 = Y(hub.lat), x2 = X(lon), y2 = Y(lat);
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - Math.hypot(x2 - x1, y2 - y1) * 0.35;
        return (
          <g key={i}>
            <path data-arc="" d={`M${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`} fill="none" stroke="var(--color-gold-300)" strokeOpacity={0.6} strokeWidth={1.75} />
            <circle data-pin="" cx={x2} cy={y2} r={5} fill="var(--color-gold-300)" />
          </g>
        );
      })}
      {pins
        .filter((p) => p !== hub)
        .map((p) => {
          const x1 = X(hub.lon), y1 = Y(hub.lat), x2 = X(p.lon), y2 = Y(p.lat);
          const mx = (x1 + x2) / 2 + 30, my = Math.min(y1, y2) - 60;
          return <path key={p.label} data-arc="" d={`M${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`} fill="none" stroke="var(--color-gold-500)" strokeWidth={2} strokeLinecap="round" />;
        })}
      {pins.map((p) => (
        <g key={p.label} data-pin="" transform={`translate(${X(p.lon)} ${Y(p.lat)})`}>
          <circle r={22} fill="var(--color-gold-300)" opacity={0.3} className="motion-ok:animate-ping-soft [transform-box:fill-box] [transform-origin:center]" />
          <circle r={11} fill="var(--color-navy-950)" stroke="var(--color-gold-300)" strokeWidth={4} />
          <g transform={p.labelSide === "left" ? "translate(-24 26)" : "translate(22 -20)"}>
            <rect x={p.labelSide === "left" ? -(p.label.length * 12 + 26) : 0} y={-22} width={p.label.length * 12 + 26} height={34} rx={17} fill="var(--color-ivory-50)" />
            <text x={p.labelSide === "left" ? -13 : 13} y={1} textAnchor={p.labelSide === "left" ? "end" : "start"} className="font-mono text-[18px] uppercase tracking-[0.08em]" fill="var(--color-navy-950)">{p.label}</text>
          </g>
        </g>
      ))}
    </svg>
  );
}
