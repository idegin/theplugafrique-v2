import type { Metadata } from "next";
import { getServices } from "@/lib/cms";
import { ServicesHero } from "@/components/services/services-hero";
import { PracticeGallery } from "@/components/services/practice-gallery";
import { Process } from "@/components/services/process";
import { EngagementModels } from "@/components/services/engagement-models";
import { Sectors } from "@/components/services/sectors";
import { HoverList } from "@/components/home/hover-list";
import { Reveal } from "@/components/motion/reveal";
import { Invitation } from "@/components/home/invitation";

export const metadata: Metadata = {
  title: "Services",
  description: "Strategy, innovation, capability, culture and partnerships: five connected practices from The Plug Afrique.",
  alternates: { canonical: "/services/" },
};

export default function ServicesPage() {
  const services = getServices();
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <ServicesHero />
      <section aria-label="Practice index" className="bg-canvas py-section-sm">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <Reveal self className="lg:col-span-4">
            <p className="eyebrow eyebrow-rule">Practice index</p>
            <p className="mt-6 max-w-[30ch] text-fg-muted">Hover a practice to preview it. Select to explore in depth.</p>
          </Reveal>
          <Reveal self y={36} className="lg:col-span-8">
            <HoverList
              items={services.map((s) => ({
                href: s.href,
                title: s.title,
                kicker: `Practice 0${s.order}`,
                meta: s.summary,
                image: { src: s.cover.src, alt: s.cover.alt },
              }))}
            />
          </Reveal>
        </div>
      </section>
      <PracticeGallery />
      <Process />
      <EngagementModels />
      <Sectors />
      <Invitation
        eyebrow="Start here"
        title={
          <>
            Not sure which practice fits? <em className="em-accent">Let&apos;s talk.</em>
          </>
        }
        lead="Tell us about your challenge and we'll convene the right mix of expertise from our team and network."
      />
    </main>
  );
}
