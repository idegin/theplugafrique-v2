import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge about the custom utilities in app/globals.css, so
// e.g. `text-display-xl` + `text-fg`, or `bg-aurora-navy` + `bg-grain`, are
// not treated as conflicting and silently dropped.
type TpaClassGroup =
  | "tpa-atmosphere"
  | "tpa-grain"
  | "tpa-pattern"
  | "tpa-text-effect"
  | "tpa-mask";

const twMerge = extendTailwindMerge<TpaClassGroup>({
  extend: {
    classGroups: {
      "tpa-atmosphere": ["bg-aurora-navy"],
      "tpa-grain": ["bg-grain"],
      "tpa-pattern": ["bg-dot-grid", "bg-line-grid"],
      "tpa-text-effect": ["text-gradient-gold", "marker-gold", "em-accent"],
      "tpa-mask": ["mask-fade-x", "mask-fade-b", "line-mask"],
      "font-size": [
        {
          text: [
            "lead",
            "eyebrow",
            "stat",
            "heading-md",
            "heading-lg",
            "display-sm",
            "display-md",
            "display-lg",
            "display-xl",
            "display-2xl",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
