import Image from "next/image";
import { site } from "@/lib/site";
import { Marquee } from "@/components/motion/marquee";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { FloatGraphic } from "@/components/motion/float-graphic";

/** 11 · Invitation CTA (dark): giant marquee, banner image, magnetic gold CTA. */
export function Invitation({
  eyebrow = "Our invitation",
  title,
  lead = "Whether you\u2019re an individual seeking clarity, a venture ready to scale, or an organisation aiming to transform, we\u2019re here to help you bridge vision and impact.",
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  lead?: string;
} = {}) {
  return (
    <section data-header="dark" aria-labelledby="cta-title" className="on-dark bg-grain relative isolate overflow-hidden bg-navy-950 py-section">
      <Image src="/images/web/invitation-banner.webp" alt="" fill sizes="100vw" className="-z-20 object-cover opacity-25 mix-blend-luminosity" />
      <div aria-hidden className="bg-aurora-navy absolute inset-0 -z-10 opacity-85" />
      <FloatGraphic shape="rings" node="var(--color-gold-300)" className="-right-20 -bottom-24 size-96 text-navy-600" spin />
      <FloatGraphic shape="spark" className="left-[46%] top-[58%] hidden size-5 text-gold-300 lg:block" speed={0.4} />

      <div aria-hidden className="mb-16 select-none md:mb-20">
        <Marquee duration={28} gap="2.5rem" repeat={3} pauseOnHover={false}>
          {["Let's plug in", "Let's plug in", "Let's plug in"].map((t, i) => (
            <span key={i} className="flex items-center gap-10 font-display text-[clamp(4rem,12vw,10rem)] leading-none tracking-tighter">
              <span className={i % 2 ? "text-outline text-gold-300/60" : "text-heading"}>{t}</span>
              <span className="size-4 rounded-full bg-gold-300 md:size-6" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Reveal self>
            <p className="eyebrow eyebrow-rule mb-6">{eyebrow}</p>
          </Reveal>
          <SplitHeading id="cta-title" className="text-display-lg max-w-[16ch]">
            {title ?? (
              <>
                We don&apos;t just deliver solutions. We <em className="em-accent">connect possibilities.</em>
              </>
            )}
          </SplitHeading>
        </div>
        <Reveal className="lg:col-span-5" stagger={0.1}>
          <p data-reveal="" className="max-w-[44ch] text-lead text-fg-muted">{lead}</p>
          <div data-reveal="" className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={site.cta.href} variant="accent" size="lg" magnetic>
              Schedule a consultation
            </ButtonLink>
            <ButtonLink href={`mailto:${site.email}`} variant="secondary" size="lg">
              Email us
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
