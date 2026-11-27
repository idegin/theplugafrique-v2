import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { PageHero } from "@/components/site/page-hero";
import { ContactForm } from "@/components/site/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { Faq } from "@/components/home/faq";
import { NextSteps } from "@/components/site/next-steps";
import { Offices } from "@/components/about/offices";
import { InstagramIcon, LinkedinIcon, XIcon } from "@/components/ui/social-icons";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description: "Talk to The Plug Afrique about strategy, innovation, capability, culture or partnerships. Offices in Lagos and Abuja.",
  path: "/contact/",
  og: "contact",
});

export default function ContactPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s <em className="em-accent">plug in.</em>
          </>
        }
        lead="Whether you're seeking clarity, ready to scale or aiming to transform, start the conversation here."
      />
      <section aria-label="Contact details and form" className="bg-canvas py-section-sm">
        <div className="container-page grid gap-14 lg:grid-cols-12">
          <Reveal self y={36} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal className="on-dark bg-aurora-navy bg-grain space-y-8 rounded-2xl p-8 lg:sticky lg:top-28" stagger={0.08}>
              <div data-reveal="" className="relative z-10">
                <p className="eyebrow mb-3">Write to us</p>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-lg text-heading hover:text-accent">
                  <Mail className="size-5 shrink-0 text-accent" strokeWidth={1.5} /> {site.email}
                </a>
              </div>
              <div data-reveal="" className="relative z-10">
                <p className="eyebrow mb-3">Call or WhatsApp</p>
                <a href={`tel:${site.phone}`} className="flex items-center gap-3 text-lg text-heading hover:text-accent">
                  <Phone className="size-5 shrink-0 text-accent" strokeWidth={1.5} /> {site.phoneDisplay}
                </a>
              </div>
              {site.offices.map((o) => (
                <div data-reveal="" key={o.city} className="relative z-10 border-t border-line pt-6">
                  <p className="eyebrow mb-3">{o.city} office</p>
                  <a href={o.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-fg-muted hover:text-heading">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-accent" strokeWidth={1.5} /> {o.address}
                  </a>
                </div>
              ))}
              <div data-reveal="" className="relative z-10 flex gap-2 border-t border-line pt-6">
                {[
                  { href: site.social.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
                  { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
                  { href: site.social.x, label: "X (Twitter)", Icon: XIcon },
                ].map(({ href, label, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid size-11 place-items-center rounded-full border border-line-strong text-heading transition-colors hover:border-gold-300 hover:bg-gold-300 hover:text-navy-950">
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
      <NextSteps />
      <Offices
        title={
          <>
            Visit us in <em className="em-accent">Lagos or Abuja.</em>
          </>
        }
      />
      <Faq />
    </main>
  );
}
