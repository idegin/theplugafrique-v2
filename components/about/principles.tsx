import { Tilt } from "@/components/motion/tilt";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

const items = [
  { t: "Clarity", icon: "/icons/philosophy/clarity.svg", d: "Defining purpose, priorities and pathways to success.", tone: "light" },
  { t: "Connection", icon: "/icons/philosophy/connection.svg", d: "Aligning interests and bringing together the right people and resources.", tone: "dark" },
  { t: "Creation", icon: "/icons/philosophy/creation.svg", d: "Translating ideas into strategies, systems and ventures with lasting impact.", tone: "gold" },
];

/** About · principles as 3D tilt cards with glare (different from the home pinned sequence). */
export function Principles() {
  return (
    <section aria-labelledby="principles-title" className="bg-surface-muted py-section">
      <div className="container-page">
        <SectionHeader
          eyebrow="Three principles"
          align="center"
          className="mb-16"
          title={
            <span id="principles-title">
              Clarity, connection, <em className="em-accent">creation.</em>
            </span>
          }
        />
        <Reveal className="grid gap-6 [perspective:1200px] md:grid-cols-3" stagger={0.12} y={60}>
          {items.map((it, i) => (
            <div data-reveal="" key={it.t}>
              <Tilt
                className={cn(
                  "flex h-full min-h-[24rem] flex-col justify-between overflow-hidden rounded-2xl p-8 shadow-lg lg:min-h-[28rem] lg:p-10",
                  it.tone === "dark" && "on-dark bg-navy-900",
                  it.tone === "light" && "border border-line bg-surface",
                  it.tone === "gold" && "bg-gold-300 text-navy-950",
                )}
              >
                <div className="flex items-start justify-between [transform:translateZ(40px)]">
                  <span
                    aria-hidden
                    className={cn("block size-16 [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]", it.tone === "gold" ? "bg-navy-950" : it.tone === "light" ? "bg-gold-500" : "bg-accent-fill")}
                    style={{ maskImage: `url(${it.icon})`, WebkitMaskImage: `url(${it.icon})` }}
                  />
                  <span className={cn("font-mono text-sm", it.tone === "gold" ? "text-navy-900/70" : "text-fg-subtle")}>0{i + 1}</span>
                </div>
                <div className="[transform:translateZ(60px)]">
                  <h3 className={cn("font-display text-display-md", it.tone === "gold" ? "text-navy-950" : "text-heading")}>{it.t}</h3>
                  <p className={cn("mt-3", it.tone === "gold" ? "text-navy-900/80" : "text-fg-muted")}>{it.d}</p>
                </div>
              </Tilt>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
