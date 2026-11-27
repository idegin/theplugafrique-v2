import { getServices } from "@/lib/cms";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/motion/reveal";
import { VelocityMarquee } from "@/components/motion/velocity-marquee";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";

/** Services · dark hero with a scroll-velocity marquee of the five practices. */
export function ServicesHero() {
  const services = getServices();
  return (
    <section data-header="dark" className="on-dark bg-aurora-navy bg-grain relative overflow-hidden pt-[calc(var(--spacing-header)+3.5rem)]">
      <div className="container-page relative z-10 grid gap-10 pb-16 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <Reveal self start="load">
            <p className="eyebrow eyebrow-rule">Services</p>
          </Reveal>
          <SplitHeading as="h1" start="load" delay={0.1} className="mt-8 text-display-xl max-w-[13ch]">
            From concept to <em className="em-accent">completion.</em>
          </SplitHeading>
        </div>
        <Reveal start="load" delay={0.5} stagger={0.1} className="lg:col-span-4">
          <p data-reveal="" className="text-lead text-fg-muted">Five connected practices, convened around your challenge with exactly the expertise it needs.</p>
          <div data-reveal="" className="mt-8">
            <ButtonLink href={site.cta.href} variant="accent" magnetic>Start a conversation</ButtonLink>
          </div>
        </Reveal>
      </div>
      <div className="relative z-10 border-y border-line py-8" aria-hidden>
        <VelocityMarquee speed={70}>
          {services.map((s, i) => (
            <span key={s.slug} className="flex items-center gap-10 pr-10 pb-[0.12em] font-display text-[clamp(2.75rem,7vw,6.5rem)] leading-[1.05] tracking-tight">
              <span className={i % 2 ? "text-outline text-gold-300/80" : "text-heading"}>{s.title}</span>
              <svg viewBox="0 0 60 60" className="size-8 shrink-0 text-gold-300 md:size-12"><path fill="currentColor" d="M30 2 C32 22, 38 28, 58 30 C38 32, 32 38, 30 58 C28 38, 22 32, 2 30 C22 28, 28 22, 30 2 Z" /></svg>
            </span>
          ))}
        </VelocityMarquee>
      </div>
    </section>
  );
}
