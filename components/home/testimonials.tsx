import Image from "next/image";
import { getTestimonials } from "@/lib/cms";
import { Reveal } from "@/components/motion/reveal";
import { ClipReveal } from "@/components/motion/clip-reveal";
import { TestimonialsCarousel } from "./testimonials-carousel";
import { FloatGraphic } from "@/components/motion/float-graphic";

/** 08 · Testimonials: oversized serif quote carousel beside a duotone image column. */
export function Testimonials() {
  const items = getTestimonials();
  if (!items.length) return null;
  return (
    <section aria-labelledby="voices-title" className="relative overflow-hidden bg-canvas py-section">
      <FloatGraphic shape="nodes" node="var(--color-gold-500)" className="right-[5%] top-14 hidden size-28 text-navy-300 lg:block" speed={0.3} />
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Reveal self>
            <p id="voices-title" className="eyebrow">
              <span className="text-accent">06 /</span> Client voices
            </p>
          </Reveal>
          <ClipReveal className="relative mt-10 hidden aspect-[3/4] rounded-arch bg-navy-900 lg:block">
            <Image src="/images/web/consultant-portrait-focus.webp" alt="" fill sizes="30vw" className="object-cover object-[45%_30%]" />
            <div className="absolute inset-0 bg-linear-to-t from-navy-950/85 via-navy-950/10 to-transparent" />
            <svg aria-hidden viewBox="0 0 48 36" className="absolute bottom-8 left-8 w-14 text-gold-300">
              <path fill="currentColor" d="M0 36V20.6C0 9.4 6.1 2.5 18.2 0l2 4.4C13.9 6.3 10.6 10 10.2 15.6H19V36H0Zm29 0V20.6C29 9.4 35.1 2.5 47.2 0l2 4.4c-6.3 1.9-9.6 5.6-10 11.2H48V36H29Z" />
            </svg>
          </ClipReveal>
        </div>
        <Reveal self y={40} className="flex flex-col justify-center lg:col-span-8">
          <TestimonialsCarousel items={items} />
        </Reveal>
      </div>
    </section>
  );
}
