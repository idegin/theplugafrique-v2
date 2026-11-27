import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { getService, getServices } from "@/lib/cms";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/motion/reveal";
import { ClipReveal } from "@/components/motion/clip-reveal";
import { Parallax } from "@/components/motion/parallax";
import { HoverList } from "@/components/home/hover-list";
import { Invitation } from "@/components/home/invitation";
import { Process } from "@/components/services/process";
import { NextPractice } from "@/components/services/next-practice";
import { Counter } from "@/components/motion/counter";

export const dynamicParams = false;

export function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = await getService(slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.excerpt,
    alternates: { canonical: s.href },
    openGraph: { images: [{ url: s.cover.src, width: s.cover.width, height: s.cover.height, alt: s.cover.alt }] },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();
  const all = getServices();
  const others = all.filter((s) => s.slug !== slug);
  const next = all[(all.findIndex((s) => s.slug === slug) + 1) % all.length];

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <section data-header="dark" className="on-dark bg-aurora-navy bg-grain relative overflow-hidden pb-section-sm pt-[calc(var(--spacing-header)+3rem)]">
        <div className="container-page relative z-10 grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal self start="load">
              <Link href="/services/" className="group inline-flex items-center gap-2 text-sm text-fg-muted hover:text-heading">
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" strokeWidth={1.5} /> All services
              </Link>
            </Reveal>
            <Reveal self start="load" delay={0.1}>
              <p className="eyebrow mt-10"><span className="text-accent">0{service.order} / 05</span> Practice area</p>
            </Reveal>
            <SplitHeading as="h1" start="load" delay={0.2} className="mt-6 text-display-xl max-w-[14ch]">
              {service.title}
            </SplitHeading>
            <Reveal self start="load" delay={0.6}>
              <p className="mt-8 max-w-[48ch] text-lead text-fg-muted">{service.excerpt}</p>
            </Reveal>
          </div>
          <ClipReveal className="relative aspect-[4/5] rounded-arch lg:col-span-5">
            <Parallax speed={0.06} className="absolute -inset-y-[8%] inset-x-0">
              <Image src={service.cover.src} alt={service.cover.alt} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </Parallax>
          </ClipReveal>
        </div>
      </section>

      <section className="bg-canvas py-section-sm">
        <div className="container-page grid gap-14 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="space-y-10 lg:sticky lg:top-28">
              <div className="rounded-xl border border-line bg-surface p-7">
                <p className="eyebrow mb-5">What&apos;s included</p>
                <ul className="space-y-3">
                  {service.offerings.map((o) => (
                    <li key={o} className="flex gap-3 text-fg"><Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={1.75} />{o}</li>
                  ))}
                </ul>
              </div>
              {service.outcomes.length > 0 && (
                <div className="rounded-xl bg-navy-900 p-7 text-ivory-50">
                  <p className="eyebrow mb-5 !text-gold-300">Outcomes</p>
                  <ul className="space-y-4">
                    {service.outcomes.map((o, i) => (
                      <li key={o} className="flex gap-4"><span className="font-mono text-xs text-gold-300 pt-1">0{i + 1}</span><span className="font-display text-lg">{o}</span></li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="prose-tpa" dangerouslySetInnerHTML={{ __html: service.html }} />
          </div>
        </div>
      </section>

      {/* Outcomes band */}
      <section aria-label="At a glance" className="border-y border-line bg-surface-muted py-12">
        <Reveal className="container-page grid grid-cols-2 gap-8 md:grid-cols-4" stagger={0.08}>
          {[
            { v: service.offerings.length, l: "core offerings" },
            { v: service.outcomes.length, l: "headline outcomes" },
            { v: 4, l: "step engagement path" },
            { v: 65, s: "+", l: "clients across the practice" },
          ].map((x) => (
            <div data-reveal="" key={x.l}>
              <p className="font-display text-stat text-heading tabular-nums [font-size:clamp(2.5rem,2rem+2vw,4rem)]"><Counter value={x.v} suffix={x.s ?? ""} /></p>
              <p className="mt-1 text-sm text-fg-muted">{x.l}</p>
            </div>
          ))}
        </Reveal>
      </section>
      <Process
        title={
          <>
            How we deliver <em className="em-accent">{service.title.split(" ")[0].toLowerCase()}.</em>
          </>
        }
      />
      <section aria-labelledby="other-title" className="border-t border-line bg-surface-muted py-section-sm">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <h2 id="other-title" className="text-display-md lg:col-span-4">Other <em className="em-accent">practices</em></h2>
          <div className="lg:col-span-8">
            <HoverList items={others.map((s) => ({ href: s.href, title: s.title, kicker: `Practice 0${s.order}`, meta: s.summary, image: { src: s.cover.src, alt: s.cover.alt } }))} />
          </div>
        </div>
      </section>
      <NextPractice service={next} />
      <Invitation />
    </main>
  );
}
