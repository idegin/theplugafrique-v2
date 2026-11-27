import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { InstagramIcon, LinkedinIcon, XIcon } from "@/components/ui/social-icons";
import { site } from "@/lib/site";
import { getServices } from "@/lib/cms";
import { Logo } from "./logo";
import { FooterWordmark } from "./footer-wordmark";
import { ButtonLink } from "@/components/ui/button";

export function Footer() {
  const services = getServices();
  const year = new Date().getFullYear();

  return (
    <footer data-header="dark" className="on-dark bg-grain relative overflow-hidden bg-navy-950 pt-section-sm text-fg">
      <div aria-hidden className="bg-dot-grid pointer-events-none absolute inset-0 text-white [--grid-size:32px] [mask-image:radial-gradient(80%_60%_at_50%_0%,#000,transparent)]" />
      <div className="container-page relative z-10">
        <div className="grid gap-14 border-b border-line pb-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo tone="light" className="w-24" />
            <p className="mt-8 max-w-[34ch] font-display text-display-sm text-heading">
              Let&apos;s plug in <em className="em-accent">and create something remarkable.</em>
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={site.cta.href} variant="accent" magnetic>
                Start a conversation
              </ButtonLink>
              <ButtonLink href="/blog/" variant="secondary">
                Read insights
              </ButtonLink>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-[1fr_1.2fr_1.4fr] lg:col-span-7 lg:pl-6">
            <div>
              <p className="eyebrow mb-5">Explore</p>
              <ul className="space-y-3">
                {site.nav.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="link-underline text-fg-muted transition-colors hover:text-heading">{n.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="eyebrow mb-5">Services</p>
              <ul className="space-y-3">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={s.href} className="link-underline text-fg-muted transition-colors hover:text-heading">{s.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="eyebrow mb-5">Connect</p>
              <ul className="space-y-4 text-fg-muted">
                <li>
                  <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-[0.95rem] hover:text-heading"><Mail className="size-4 shrink-0 text-accent" strokeWidth={1.5} /> {site.email}</a>
                </li>
                <li>
                  <a href={`tel:${site.phone}`} className="flex items-center gap-3 hover:text-heading"><Phone className="size-4 shrink-0 text-accent" strokeWidth={1.5} /> {site.phoneDisplay}</a>
                </li>
                {site.offices.map((o) => (
                  <li key={o.city}>
                    <a href={o.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-heading">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={1.5} />
                      <span><span className="text-heading">{o.city}</span><br /><span className="text-sm">{o.address.split(",").slice(0, 2).join(",")}</span></span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex gap-2">
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
            </div>
          </nav>
        </div>

        <div className="py-10 md:py-14">
          <FooterWordmark />
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-8 text-sm text-fg-subtle md:flex-row md:items-center md:justify-between">
          <p>© {year} The Plug Afrique. All rights reserved.</p>
          <p className="font-mono text-xs uppercase tracking-[0.14em]">Rooted in Africa · Open to the world</p>
          <a href="#main" className="group inline-flex items-center gap-2 text-fg-muted hover:text-heading">
            Back to top <ArrowUpRight className="size-4 -rotate-45 transition-transform group-hover:-translate-y-0.5" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  );
}
