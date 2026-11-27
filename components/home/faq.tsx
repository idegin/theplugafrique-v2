import Image from "next/image";
import { Mail } from "lucide-react";
import { getFaqs } from "@/lib/cms";
import { site } from "@/lib/site";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { ButtonLink } from "@/components/ui/button";
import { Accordion } from "./accordion";
import { FloatGraphic } from "@/components/motion/float-graphic";
import { JsonLd } from "@/components/site/json-ld";
import { faqLd } from "@/lib/seo";

/** 10 · FAQ: sticky intro + contact card, accordion on the right.
 *  `structuredData` emits FAQPage JSON-LD; enable it on one page only (home). */
export function Faq({ structuredData = false }: { structuredData?: boolean }) {
  const faqs = getFaqs();
  return (
    <section aria-labelledby="faq-title" className="relative overflow-hidden bg-surface-muted py-section">
      {structuredData && <JsonLd data={faqLd(faqs)} />}
      <FloatGraphic shape="orbit" node="var(--color-gold-500)" className="bottom-8 -left-10 hidden h-48 w-64 text-navy-300 lg:block" speed={0.2} />
      <div className="container-page grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeader
              index="08"
              eyebrow="Questions"
              title={
                <>
                  Good questions, <em className="em-accent">clear answers.</em>
                </>
              }
            />
            <Reveal self delay={0.2} className="mt-10 hidden overflow-hidden rounded-xl border border-line bg-surface lg:grid lg:grid-cols-[8rem_1fr]">
              <div className="relative">
                <Image src="/images/web/faq.webp" alt="" fill sizes="8rem" className="object-cover" />
              </div>
              <div className="p-6">
                <p className="font-display text-heading-lg text-heading">Still curious?</p>
                <p className="mt-2 text-sm text-fg-muted">Talk to a consultant. We usually reply within one working day.</p>
                <a href={`mailto:${site.email}`} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-heading">
                  <Mail className="size-4 text-accent" strokeWidth={1.5} /> <span className="link-underline">{site.email}</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
        <Reveal self y={36} className="lg:col-span-7">
          <Accordion items={faqs.map((f) => ({ q: f.question, a: f.answer }))} />
          <div className="mt-10 lg:hidden">
            <ButtonLink href="/contact/" variant="primary">Ask us anything</ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
