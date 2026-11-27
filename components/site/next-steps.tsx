import { DrawLine } from "@/components/motion/draw-line";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";

const steps = [
  { t: "We listen", d: "A consultant reads your message and replies within one working day to arrange a conversation." },
  { t: "We explore", d: "A no-obligation call to understand your purpose, priorities and constraints." },
  { t: "We propose", d: "A scoped proposal with outcomes, timeline and the right mix of expertise from our team and network." },
];

/** Contact · what happens next: three steps joined by a drawn plug line. */
export function NextSteps() {
  return (
    <section aria-labelledby="next-title" className="relative overflow-hidden bg-surface-muted py-section-sm">
      <div className="container-page">
        <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal self className="lg:col-span-4">
            <p className="eyebrow eyebrow-rule">What happens next</p>
          </Reveal>
          <SplitHeading id="next-title" className="text-display-md max-w-[18ch] lg:col-span-8">
            Three simple steps to <em className="em-accent">plugging in.</em>
          </SplitHeading>
        </div>
        <div className="relative">
          <DrawLine className="pointer-events-none absolute inset-x-0 top-6 hidden h-10 w-full md:block" d="M20 20 C 300 -10, 500 50, 800 20 S 1200 -10, 1380 20" viewBox="0 0 1400 40" />
          <Reveal className="relative grid gap-10 md:grid-cols-3" stagger={0.15} y={40}>
            {steps.map((s, i) => (
              <div data-reveal="" key={s.t}>
                <span className="relative z-10 grid size-12 place-items-center rounded-full bg-navy-900 font-mono text-sm text-gold-300 shadow-lg">0{i + 1}</span>
                <h3 className="mt-8 font-display text-display-sm text-heading">{s.t}</h3>
                <p className="mt-3 max-w-[36ch] text-fg-muted">{s.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
