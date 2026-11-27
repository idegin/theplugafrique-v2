import { NewsletterForm } from "@/components/site/newsletter-form";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/motion/reveal";
import { FloatGraphic } from "@/components/motion/float-graphic";

/** Blog · newsletter band (dark, blur-in copy). */
export function NewsletterBand() {
  return (
    <section data-header="dark" aria-labelledby="nl-title" className="on-dark bg-aurora-navy bg-grain relative overflow-hidden py-section-sm">
      <FloatGraphic shape="rings" node="var(--color-gold-300)" className="-right-16 -top-16 size-80 text-navy-600" spin />
      <div className="container-page relative z-10 grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <SplitHeading id="nl-title" className="text-display-lg max-w-[16ch]">
            Insights, plugged straight <em className="em-accent">into your inbox.</em>
          </SplitHeading>
        </div>
        <Reveal self blur className="lg:col-span-5">
          <p className="mb-6 text-fg-muted">One thoughtful email when we publish. Strategy, partnerships and culture across Africa.</p>
          <NewsletterForm />
        </Reveal>
      </div>
    </section>
  );
}
