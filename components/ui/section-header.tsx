import type { ReactNode } from "react";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function SectionHeader({
  index,
  eyebrow,
  title,
  lead,
  align = "left",
  className,
  titleClassName,
  as = "h2",
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("flex flex-col gap-6", align === "center" && "items-center text-center", className)}>
      <Reveal self>
        <p className={cn("eyebrow", !index && "eyebrow-rule")}>
          {index && <span className="text-accent">{index} /</span>}
          {eyebrow}
        </p>
      </Reveal>
      <SplitHeading as={as} className={cn("text-display-lg max-w-[16ch]", align === "center" && "mx-auto", titleClassName)}>
        {title}
      </SplitHeading>
      {lead && (
        <Reveal self delay={0.15}>
          <p className={cn("max-w-[52ch] text-lead text-fg-muted", align === "center" && "mx-auto")}>{lead}</p>
        </Reveal>
      )}
    </div>
  );
}
