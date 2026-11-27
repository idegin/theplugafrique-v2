import { ArrowUpRight, MapPin } from "lucide-react";
import { site } from "@/lib/site";
import { AfricaMap } from "@/components/motion/africa-map";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/motion/reveal";

export const OFFICE_PINS = [
  { label: "Lagos", lon: 3.4, lat: 6.5, primary: true, labelSide: "left" as const },
  { label: "Abuja", lon: 7.5, lat: 9.1, labelSide: "right" as const },
];

/** Offices on a dot-matrix map of Africa (dark chapter). */
export function Offices({ title }: { title?: React.ReactNode }) {
  return (
    <section data-header="dark" aria-labelledby="offices-title" className="on-dark bg-aurora-navy bg-grain relative overflow-hidden py-section">
      <div className="container-page relative z-10 grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal self>
            <p className="eyebrow eyebrow-rule mb-6">Where to find us</p>
          </Reveal>
          <SplitHeading id="offices-title" className="text-display-lg max-w-[12ch]">
            {title ?? (
              <>
                Two offices, one <em className="em-accent">continent.</em>
              </>
            )}
          </SplitHeading>
          <Reveal className="mt-12 space-y-4" stagger={0.12}>
            {site.offices.map((o) => (
              <a
                data-reveal=""
                key={o.city}
                href={o.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Map"
                className="group flex items-start gap-5 rounded-xl border border-line bg-white/[0.03] p-6 transition-[background-color,border-color] duration-300 hover:border-gold-300/50 hover:bg-white/[0.06]"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gold-300 text-navy-950">
                  <MapPin className="size-5" strokeWidth={1.5} />
                </span>
                <span className="flex-1">
                  <span className="block font-display text-display-sm text-heading">{o.city}</span>
                  <span className="mt-1 block text-fg-muted">{o.address}</span>
                </span>
                <ArrowUpRight className="mt-1 size-5 shrink-0 text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
              </a>
            ))}
          </Reveal>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <AfricaMap pins={OFFICE_PINS} className="mx-auto max-w-[34rem]" />
        </div>
      </div>
    </section>
  );
}
