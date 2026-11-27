import type { ReactNode } from "react";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/motion/reveal";
import { DrawLine } from "@/components/motion/draw-line";

/** Inner-page hero: light editorial header with plug line + hairline grid. */
export function PageHero({ eyebrow, title, lead, children }: { eyebrow: string; title: ReactNode; lead?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-canvas pb-section-sm pt-[calc(var(--spacing-header)+4rem)]">
      <div aria-hidden className="bg-line-grid pointer-events-none absolute inset-0 [--grid-size:88px] [mask-image:radial-gradient(60%_80%_at_80%_0%,#000,transparent)]" />
      <div className="container-page relative grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <Reveal self start="load">
            <p className="eyebrow eyebrow-rule">{eyebrow}</p>
          </Reveal>
          <SplitHeading as="h1" start="load" delay={0.1} className="mt-8 text-display-xl max-w-[14ch]">
            {title}
          </SplitHeading>
        </div>
        <div className="lg:col-span-4">
          {lead && (
            <Reveal self start="load" delay={0.5}>
              <p className="text-lead text-fg-muted">{lead}</p>
            </Reveal>
          )}
          {children}
        </div>
      </div>
      <DrawLine scrub={false} className="pointer-events-none absolute -bottom-px right-[8%] hidden h-24 w-72 lg:block" d="M2 94 C 80 94, 90 10, 170 10 S 260 40, 286 40" viewBox="0 0 288 96" />
    </section>
  );
}
