import Image from "next/image";
import { asset } from "@/lib/base-path";
import { getClients } from "@/lib/cms";
import { Marquee } from "@/components/motion/marquee";

/** 02 · Trusted by: infinite logo marquee, grayscale → colour on hover. */
export function ClientMarquee() {
  const clients = getClients();
  return (
    <section aria-label="Clients and partners" className="relative border-b border-line bg-canvas py-12 md:py-16">
      <div className="container-page grid items-center gap-8 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-12">
        <p className="eyebrow eyebrow-rule max-w-[22ch] leading-relaxed">Trusted by ventures &amp; institutions</p>
        <Marquee className="mask-fade-x" duration={32} gap="4.5rem" repeat={4}>
          {clients.map((c) => {
            const logo = (
              <Image
                src={asset(c.logo)}
                alt={c.name}
                width={300}
                height={100}
                unoptimized
                className="h-9 w-auto max-w-[10rem] object-contain opacity-55 transition-opacity duration-300 hover:opacity-100 md:h-11"
              />
            );
            return (
              <div key={c.name} className="shrink-0">
                {c.url ? (
                  <a href={c.url} target="_blank" rel="noopener noreferrer" aria-label={c.name}>
                    {logo}
                  </a>
                ) : (
                  logo
                )}
              </div>
            );
          })}
        </Marquee>
      </div>
    </section>
  );
}
