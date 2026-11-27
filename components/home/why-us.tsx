import Image from "next/image";
import { Globe2, Network, HeartHandshake, Workflow } from "lucide-react";
import { Spotlight } from "@/components/motion/spotlight";
import { Reveal } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";
import { FloatGraphic } from "@/components/motion/float-graphic";

const reasons = [
  {
    icon: Globe2,
    title: "Pan-African roots, global perspective",
    text: "Deeply connected to Africa's energy, diversity and potential, and globally attuned, bringing cross-continental experience and world-class standards.",
  },
  {
    icon: Network,
    title: "Independent but connected",
    text: "A nimble, boutique consultancy backed by an extended network of partners and collaborators across industries and geographies.",
  },
  {
    icon: HeartHandshake,
    title: "Human at the core",
    text: "We design around people, their needs, motivations and aspirations, so that strategy always meets empathy.",
  },
  {
    icon: Workflow,
    title: "Insight meets execution",
    text: "We bridge thinking and doing, so ideas are not just inspiring but actionable, measurable and sustainable.",
  },
];

/** 07 · Why TPA: bento grid with spotlight tiles, image tile and counters. */
export function WhyUs() {
  return (
    <section aria-labelledby="why-title" className="relative bg-surface-muted py-section">
      <div aria-hidden className="bg-dot-grid pointer-events-none absolute inset-0 text-navy-900 [--grid-size:26px] [mask-image:linear-gradient(to_bottom,transparent,#000_30%,#000_70%,transparent)] opacity-60" />
      <FloatGraphic shape="diamond" node="var(--color-gold-300)" className="left-1/2 top-14 h-7 w-44 -translate-x-1/2 text-gold-500" speed={0.1} />
      <FloatGraphic shape="arc" node="var(--color-gold-500)" className="-left-10 bottom-10 hidden h-40 w-64 text-navy-300 lg:block" speed={0.3} />
      <div className="container-page relative">
        <SectionHeader
          index="05"
          eyebrow="Why The Plug Afrique"
          align="center"
          className="mb-16"
          titleClassName="max-w-[18ch]"
          title={
            <>
              Boutique by design, <em className="em-accent">connected</em> by nature.
            </>
          }
        />

        <Reveal className="grid auto-rows-[minmax(13rem,auto)] gap-4 md:grid-cols-6 lg:gap-5" stagger={0.08} y={36}>
          {/* Image tile */}
          <div data-reveal="" className="relative overflow-hidden rounded-xl md:col-span-3 md:row-span-2 lg:col-span-2">
            <Image src="/images/web/consultant-portrait-writing.webp" alt="A TPA consultant drafting a plan" fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover object-[50%_25%]" />
            <div className="absolute inset-0 bg-linear-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
            <div className="on-dark absolute inset-x-0 bottom-0 p-7">
              <p className="font-display text-display-sm text-heading">&ldquo;Strategy always meets empathy.&rdquo;</p>
              <p className="eyebrow mt-3">Our promise</p>
            </div>
          </div>

          {reasons.map((r, i) => (
            <div data-reveal="" key={r.title} className="md:col-span-3 lg:col-span-2">
              <Spotlight
                className={cn(
                  "flex h-full flex-col rounded-xl border p-7 transition-[border-color,box-shadow,transform] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-lg lg:p-8",
                  i === 1 ? "on-dark border-white/10 bg-navy-900" : "border-line bg-surface",
                )}
                color={i === 1 ? "rgb(242 203 122 / 0.16)" : "rgb(207 152 56 / 0.12)"}
              >
                <span className="grid size-14 place-items-center rounded-full border border-line-strong bg-accent-fill/10 text-accent transition-transform duration-500 ease-out-expo group-hover/spot:-rotate-6 group-hover/spot:scale-110">
                  <r.icon className="size-6" strokeWidth={1.4} aria-hidden />
                </span>
                <h3 className="mt-auto pt-10 text-heading-lg text-heading">{r.title}</h3>
                <p className="mt-3 text-fg-muted">{r.text}</p>
              </Spotlight>
            </div>
          ))}

          {/* Stat tile */}
          <div data-reveal="" className="md:col-span-6">
            <div className="bg-grain flex h-full flex-col justify-between gap-8 overflow-hidden rounded-xl bg-gold-300 p-7 text-navy-950 sm:flex-row sm:items-end lg:p-8">
              <div className="relative z-10">
                <p className="font-display text-stat leading-none tabular-nums">
                  <Counter value={65} suffix="+" />
                </p>
                <p className="mt-3 max-w-[22ch] text-navy-900/80">individuals, ventures and organisations plugged in so far.</p>
              </div>
              <div className="relative z-10 flex gap-8 sm:text-right">
                <div>
                  <p className="font-display text-4xl"><Counter value={5} /></p>
                  <p className="text-sm text-navy-900/75">practice areas</p>
                </div>
                <div>
                  <p className="font-display text-4xl"><Counter value={2} /></p>
                  <p className="text-sm text-navy-900/75">offices</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
