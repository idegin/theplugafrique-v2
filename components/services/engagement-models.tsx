import { Compass, Handshake, GraduationCap, Repeat } from "lucide-react";
import { Tilt } from "@/components/motion/tilt";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

const models = [
  { icon: Compass, t: "Advisory sprint", d: "A focused engagement to diagnose a challenge and design a clear way forward.", best: "Strategy, feasibility, policy questions" },
  { icon: Handshake, t: "Programme partnership", d: "End-to-end design and coordination of multi-stakeholder programmes.", best: "Development partners, public institutions" },
  { icon: GraduationCap, t: "Capability programme", d: "Training, leadership labs and learning journeys built for your teams.", best: "Leadership teams, networks, institutions" },
  { icon: Repeat, t: "Ongoing counsel", d: "A trusted advisor on call to support decisions, partnerships and delivery.", best: "Founders, executives, boards" },
];

/** Services · engagement models as tilt cards on dark. */
export function EngagementModels() {
  return (
    <section data-header="dark" aria-labelledby="models-title" className="on-dark bg-aurora-navy bg-grain relative py-section">
      <div className="container-page relative z-10">
        <SectionHeader
          eyebrow="Ways to work together"
          className="mb-16"
          title={
            <span id="models-title">
              Engagements shaped <em className="em-accent">around you.</em>
            </span>
          }
          lead="Every engagement is scoped to your outcomes, timeline and budget. These are the shapes they usually take."
        />
        <Reveal className="grid gap-5 [perspective:1200px] sm:grid-cols-2 lg:grid-cols-4" stagger={0.1} y={50}>
          {models.map((m, i) => (
            <div data-reveal="" key={m.t}>
              <Tilt className={cn("flex h-full min-h-[22rem] flex-col rounded-2xl border p-7", i === 1 ? "border-transparent bg-gold-300 text-navy-950" : "border-line bg-white/[0.04]")}>
                <span className={cn("grid size-12 place-items-center rounded-full [transform:translateZ(30px)]", i === 1 ? "bg-navy-950 text-gold-300" : "bg-gold-300 text-navy-950")}>
                  <m.icon className="size-5" strokeWidth={1.5} />
                </span>
                <h3 className={cn("mt-auto pt-10 font-display text-display-sm [transform:translateZ(40px)]", i === 1 ? "text-navy-950" : "text-heading")}>{m.t}</h3>
                <p className={cn("mt-3", i === 1 ? "text-navy-900/80" : "text-fg-muted")}>{m.d}</p>
                <p className={cn("mt-6 border-t pt-4 font-mono text-[11px] uppercase tracking-[0.12em]", i === 1 ? "border-navy-950/15 text-navy-900/70" : "border-line text-accent")}>Best for · {m.best}</p>
              </Tilt>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
