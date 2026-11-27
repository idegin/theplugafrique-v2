import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { getServices } from "@/lib/cms";
import { StackCards } from "@/components/motion/stack-cards";
import { SectionHeader } from "@/components/ui/section-header";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** 06 · Services: five practice areas as viewport-fitted sticky stacking cards. */
export function Services() {
  const services = getServices();
  return (
    <section aria-labelledby="services-title" className="relative bg-canvas pt-section pb-section-sm">
      <div className="container-page">
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader
            index="04"
            eyebrow="What we do"
            title={
              <>
                Five practices, one <em className="em-accent">connected</em> offer.
              </>
            }
          />
          <div className="flex flex-col gap-6 md:max-w-xs md:items-end md:text-right">
            <p className="text-fg-muted">From concept to completion, we convene the exact expertise your challenge needs.</p>
            <ButtonLink href="/services/" variant="secondary" className="self-start md:self-auto">All services</ButtonLink>
          </div>
        </div>

        <StackCards className="relative md:grid md:grid-cols-[3rem_1fr] md:gap-6 lg:gap-10">
          {/* Progress rail (sticky, desktop) */}
          <div aria-hidden className="hidden md:block">
            <ol className="sticky top-[calc(var(--spacing-header-sm)+2.5rem)] flex flex-col items-center gap-3">
              {services.map((s) => (
                <li
                  key={s.slug}
                  data-stack-dot=""
                  className="grid size-10 place-items-center rounded-full border border-line-strong font-mono text-xs text-fg-subtle transition-[background-color,color,border-color,transform] duration-500 ease-out-expo [&.is-active]:scale-110 [&.is-active]:border-transparent [&.is-active]:bg-primary [&.is-active]:text-on-primary"
                >
                  0{s.order}
                </li>
              ))}
            </ol>
          </div>

          <div>
            {services.map((s, i) => (
              <article
                key={s.slug}
                data-stack-card=""
                className="mb-6 md:sticky md:mb-[12vh] md:last:mb-0"
                style={{ top: `calc(var(--spacing-header-sm) + 1.5rem + ${i * 0.9}rem)` }}
              >
                <div
                  data-stack-inner=""
                  className={cn(
                    "group relative grid origin-top overflow-hidden rounded-2xl border shadow-lg will-change-transform md:h-[min(36rem,calc(100svh-var(--spacing-header-sm)-6rem))] md:grid-cols-[1.1fr_1fr]",
                    i % 2 === 1 ? "on-dark border-white/10 bg-navy-900" : "border-line bg-surface",
                  )}
                >
                  <div className="flex min-h-0 flex-col p-7 sm:p-9 lg:p-11">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm text-accent">0{s.order} / 0{services.length}</span>
                      <span className="eyebrow hidden sm:inline-flex">Practice area</span>
                    </div>
                    <h3 className="mt-6 font-display text-heading [font-size:clamp(1.85rem,1.3rem+1.8vw,3rem)] leading-[1.04] tracking-[-0.02em]">
                      <Link href={s.href} className="after:absolute after:inset-0 after:z-10">
                        {s.title}
                      </Link>
                    </h3>
                    <p className="mt-4 max-w-[46ch] text-fg-muted">{s.excerpt}</p>
                    <ul className="mt-6 grid gap-x-6 gap-y-2.5 border-t border-line pt-5 text-sm sm:grid-cols-2">
                      {s.offerings.map((o) => (
                        <li key={o} className="flex gap-2.5 text-fg">
                          <Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={1.75} aria-hidden />
                          {o}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-auto inline-flex items-center gap-2 pt-8 font-medium text-heading">
                      <span className="link-underline">Explore {s.title.split(" ")[0]}</span>
                      <span className="grid size-9 place-items-center rounded-full border border-line-strong transition-[background-color,color,border-color,transform] duration-300 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-accent-fill group-hover:text-on-accent">
                        <ArrowUpRight className="size-4" strokeWidth={1.75} />
                      </span>
                    </span>
                  </div>
                  <div className="relative order-first aspect-[16/10] overflow-hidden md:order-none md:aspect-auto">
                    <Image
                      src={s.cover.src}
                      alt={s.cover.alt}
                      fill
                      sizes="(min-width: 768px) 45vw, 100vw"
                      className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.04]"
                    />
                    <div aria-hidden className="absolute inset-0 bg-linear-to-t from-navy-950/40 to-transparent md:bg-linear-to-r md:from-navy-950/25" />
                  </div>
                  {/* Veil darkens covered cards (animated), never the text colour */}
                  <div data-stack-veil="" aria-hidden className="pointer-events-none absolute inset-0 z-20 bg-navy-950 opacity-0" />
                </div>
              </article>
            ))}
          </div>
        </StackCards>
      </div>
    </section>
  );
}
