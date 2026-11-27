import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/cms";

/** Large "next practice" link with a curtain image reveal on hover (glossary: Image reveal on hover, Fill sweep). */
export function NextPractice({ service }: { service: Service }) {
  return (
    <section aria-label="Next practice" className="border-t border-line bg-canvas">
      <Link href={service.href} data-cursor="Next" className="group relative block overflow-hidden">
        <div className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-700 ease-out-expo group-hover:scale-y-100">
          <Image src={service.cover.src} alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-navy-950/70" />
        </div>
        <div className="container-page relative flex flex-col gap-6 py-16 md:flex-row md:items-end md:justify-between md:py-24">
          <div>
            <p className="eyebrow transition-colors duration-500 group-hover:text-gold-300">Next practice · 0{service.order}</p>
            <p className="mt-4 font-display text-heading transition-colors duration-500 [font-size:clamp(2.25rem,1.2rem+4.5vw,5.5rem)] leading-[1] tracking-[-0.03em] group-hover:text-ivory-50">
              {service.title}
            </p>
          </div>
          <span className="grid size-16 shrink-0 place-items-center rounded-full border border-line-strong text-heading transition-[background-color,color,border-color,transform] duration-500 group-hover:translate-x-2 group-hover:border-transparent group-hover:bg-gold-300 group-hover:text-navy-950 md:size-20">
            <ArrowRight className="size-6" strokeWidth={1.5} />
          </span>
        </div>
      </Link>
    </section>
  );
}
