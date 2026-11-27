import type { Metadata } from "next";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const scales = ["navy", "gold", "ivory", "ink", "clay", "sage", "ember"] as const;
const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

// Literal class names so Tailwind's scanner generates them.
const swatch: Record<(typeof scales)[number], string[]> = {
  navy: ["bg-navy-50", "bg-navy-100", "bg-navy-200", "bg-navy-300", "bg-navy-400", "bg-navy-500", "bg-navy-600", "bg-navy-700", "bg-navy-800", "bg-navy-900", "bg-navy-950"],
  gold: ["bg-gold-50", "bg-gold-100", "bg-gold-200", "bg-gold-300", "bg-gold-400", "bg-gold-500", "bg-gold-600", "bg-gold-700", "bg-gold-800", "bg-gold-900", "bg-gold-950"],
  ivory: ["bg-ivory-50", "bg-ivory-100", "bg-ivory-200", "bg-ivory-300", "bg-ivory-400", "bg-ivory-500", "bg-ivory-600", "bg-ivory-700", "bg-ivory-800", "bg-ivory-900", "bg-ivory-950"],
  ink: ["bg-ink-50", "bg-ink-100", "bg-ink-200", "bg-ink-300", "bg-ink-400", "bg-ink-500", "bg-ink-600", "bg-ink-700", "bg-ink-800", "bg-ink-900", "bg-ink-950"],
  clay: ["bg-clay-50", "bg-clay-100", "bg-clay-200", "bg-clay-300", "bg-clay-400", "bg-clay-500", "bg-clay-600", "bg-clay-700", "bg-clay-800", "bg-clay-900", "bg-clay-950"],
  sage: ["bg-sage-50", "bg-sage-100", "bg-sage-200", "bg-sage-300", "bg-sage-400", "bg-sage-500", "bg-sage-600", "bg-sage-700", "bg-sage-800", "bg-sage-900", "bg-sage-950"],
  ember: ["bg-ember-50", "bg-ember-100", "bg-ember-200", "bg-ember-300", "bg-ember-400", "bg-ember-500", "bg-ember-600", "bg-ember-700", "bg-ember-800", "bg-ember-900", "bg-ember-950"],
};

const typeScale = [
  ["text-display-2xl", "Plug in."],
  ["text-display-xl", "Vision to impact"],
  ["text-display-lg", "Connection is power"],
  ["text-display-md", "Rooted in Africa, open to the world"],
  ["text-display-sm", "We connect possibilities, not just deliver solutions."],
] as const;

function Section({ title, children, dark }: { title: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <section className={cn("py-section-sm", dark && "on-dark bg-aurora-navy bg-grain")}>
      <div className="container-page relative z-10">
        <p className="eyebrow eyebrow-rule mb-8">{title}</p>
        {children}
      </div>
    </section>
  );
}

function Buttons() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <button className="h-12 rounded-pill bg-primary px-7 font-medium text-on-primary shadow-sm transition duration-200 ease-out-quart hover:bg-primary-hover active:scale-[0.97]">
        Let&apos;s plug in →
      </button>
      <button className="h-12 rounded-pill bg-accent-fill px-7 font-medium text-on-accent transition duration-200 ease-out-quart hover:shadow-glow-gold active:scale-[0.97]">
        Schedule a consultation
      </button>
      <button className="h-12 rounded-pill border border-line-strong px-7 font-medium text-heading transition duration-200 hover:bg-surface-muted">
        See all services
      </button>
      <a href="#" className="link-underline font-medium text-heading">Read the story</a>
    </div>
  );
}

export default function Styleguide() {
  return (
    <main id="main">
      <Section title="TPA design system · DESIGN.md">
        <h1 className="text-display-xl max-w-5xl">
          Connecting people, ideas &amp; opportunities <em className="em-accent">for impact.</em>
        </h1>
        <p className="mt-8 max-w-[52ch] text-lead text-fg-muted">
          Sapphire &amp; Gold Editorial: quiet luxury in the logo&apos;s sapphire navy and Afrique gold,
          on ivory paper.
        </p>
      </Section>

      <Section title="01 / Colour scales">
        <div className="space-y-4">
          {scales.map((s) => (
            <div key={s} className="grid grid-cols-[5rem_1fr] items-center gap-4">
              <span className="font-mono text-sm text-fg-muted">{s}</span>
              <div className="grid grid-cols-11 overflow-hidden rounded-lg shadow-inner-line">
                {swatch[s].map((cls, i) => (
                  <div key={cls} className={cn(cls, "flex h-16 items-end p-1.5")}>
                    <span className={cn("hidden font-mono text-[10px] sm:inline", i < 5 ? "text-ink-900" : "text-white")}>
                      {steps[i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="02 / Type scale · Fraunces + Instrument Sans + Plex Mono">
        <div className="space-y-8">
          {typeScale.map(([cls, sample]) => (
            <div key={cls} className="grid gap-2 border-b border-line pb-8 md:grid-cols-[12rem_1fr]">
              <span className="font-mono text-xs text-fg-muted">{cls}</span>
              <p className={cn(cls, "font-display text-heading")}>{sample}</p>
            </div>
          ))}
          <div className="grid gap-2 md:grid-cols-[12rem_1fr]">
            <span className="font-mono text-xs text-fg-muted">heading / lead / base</span>
            <div className="space-y-4">
              <h3 className="text-heading-lg">Strategy &amp; Advisory</h3>
              <h4 className="text-heading-md">Feasibility Studies &amp; Investment Readiness</h4>
              <p className="max-w-[52ch] text-lead text-fg-muted">
                We help organisations and ventures clarify their direction, design actionable strategies,
                and execute with precision.
              </p>
              <p className="max-w-prose">
                Rooted in Africa and open to the world, we combine deep local understanding with global
                best practice. Our approach is deliberately human-centred, because beyond data, systems,
                and frameworks, it is <span className="marker-gold">people</span> who drive transformation.
              </p>
              <p className="font-display text-stat tabular-nums text-heading">65+</p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="03 / Buttons & links · light">
        <Buttons />
      </Section>

      <Section title="04 / Dark chapter · .on-dark" dark>
        <h2 className="text-display-lg max-w-4xl">
          Connection is <span className="text-gradient-gold italic">power.</span>
        </h2>
        <p className="mt-6 mb-10 max-w-[52ch] text-lead text-fg-muted">
          The power to build, to solve, and to inspire.
        </p>
        <Buttons />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {["Clarity", "Connection", "Creation"].map((p, i) => (
            <div key={p} className="rounded-xl border border-line bg-surface/60 p-8">
              <span className="font-mono text-sm text-accent">0{i + 1}</span>
              <h3 className="mt-6 font-display text-display-sm">{p}</h3>
            </div>
          ))}
        </div>
      </Section>

      <Section title="05 / Surfaces, radii & shadows">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(["shadow-sm rounded-md", "shadow-md rounded-lg", "shadow-lg rounded-xl", "shadow-xl rounded-2xl"] as const).map((c) => (
            <div key={c} className={cn("flex h-40 items-end bg-surface p-5", c)}>
              <span className="font-mono text-xs text-fg-muted">{c}</span>
            </div>
          ))}
          <div className="rounded-arch h-56 bg-navy-900 bg-grain" />
          <div className="bg-dot-grid h-56 rounded-xl border border-line text-navy-900" />
          <div className="bg-line-grid h-56 rounded-xl border border-line" />
          <div className="skeleton h-56" />
        </div>
      </Section>
    </main>
  );
}
