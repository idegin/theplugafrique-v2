import { Banknote, Building2, Globe, Landmark, Music, Cpu, GraduationCap, HeartPulse } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Scramble } from "@/components/motion/scramble";
import { SplitHeading } from "@/components/motion/split-heading";

const sectors = [
  { icon: Landmark, t: "Public sector" },
  { icon: Globe, t: "Development partners" },
  { icon: Banknote, t: "Financial services" },
  { icon: Cpu, t: "Technology & startups" },
  { icon: Music, t: "Creative industries" },
  { icon: GraduationCap, t: "Education & learning" },
  { icon: HeartPulse, t: "Social impact & NGOs" },
  { icon: Building2, t: "Corporates & SMEs" },
];

/** Services · sectors grid with hover fill sweep and text scramble. */
export function Sectors() {
  return (
    <section aria-labelledby="sectors-title" className="bg-surface-muted py-section">
      <div className="container-page">
        <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal self className="lg:col-span-4">
            <p className="eyebrow eyebrow-rule">Sectors</p>
          </Reveal>
          <SplitHeading id="sectors-title" className="text-display-lg max-w-[16ch] lg:col-span-8">
            Cross-sector by design, <em className="em-accent">local by instinct.</em>
          </SplitHeading>
        </div>
        <Reveal className="grid grid-cols-2 border-l border-t border-line md:grid-cols-4" stagger={0.05}>
          {sectors.map((s) => (
            <div data-reveal="" key={s.t} className="group relative isolate overflow-hidden border-b border-r border-line p-6 md:p-8">
              <span aria-hidden className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-navy-900 transition-transform duration-500 ease-out-expo group-hover:scale-y-100" />
              <s.icon className="size-7 text-accent transition-colors duration-500 group-hover:text-gold-300" strokeWidth={1.25} aria-hidden />
              <p className="mt-10 font-mono text-xs uppercase tracking-[0.14em] text-heading transition-colors duration-500 group-hover:text-ivory-50 md:text-sm">
                <Scramble text={s.t} />
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
