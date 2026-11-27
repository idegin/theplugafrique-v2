// Motion tokens (DESIGN.md §7). Mirrors the CSS variables in app/globals.css.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";

let registered = false;

/** Register GSAP plugins once (client only). */
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, useGSAP);
  gsap.defaults({ ease: ease.outExpo, duration: duration.slower });
  registered = true;
}

/** Durations in seconds (GSAP units). */
export const duration = {
  instant: 0.1,
  fast: 0.18,
  base: 0.28,
  slow: 0.45,
  slower: 0.7,
  cinematic: 1.2,
} as const;

/** GSAP ease names matching the CSS cubic-beziers. */
export const ease = {
  outExpo: "expo.out", // default enter
  outQuart: "quart.out", // UI enters, hovers
  inQuart: "quart.in", // exits
  inOutQuint: "power4.inOut", // curtains, wipes
  spring: "back.out(1.6)", // small pops only
} as const;

/** Stagger values in seconds. */
export const stagger = {
  items: 0.06,
  lines: 0.09,
  chars: 0.025,
} as const;

/** CSS cubic-bezier strings, for inline styles / Web Animations API. */
export const cssEase = {
  outExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
  outQuart: "cubic-bezier(0.25, 1, 0.5, 1)",
  inQuart: "cubic-bezier(0.5, 0, 0.75, 0)",
  inOutQuint: "cubic-bezier(0.83, 0, 0.17, 1)",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
} as const;

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
