"use client";

import Image from "next/image";
import { useState } from "react";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const groups = [
  { t: "Individuals", k: "seeking clarity", d: "Founders, leaders, professionals and creatives at a crossroads, looking for direction and the right connections.", img: "/images/web/consultant-portrait-focus.webp" },
  { t: "Ventures", k: "ready to scale", d: "Startups and growing businesses that need strategy, investment readiness, partnerships or digital capability.", img: "/images/web/home-hero-alt.webp" },
  { t: "Organisations", k: "aiming to transform", d: "Corporates, public institutions, development partners, NGOs and cultural bodies leading complex change.", img: "/images/web/about-primary.webp" },
];

/** About · who we serve: expanding image panels on hover/focus (glossary: Image reveal on hover, Layout animation). */
export function Audience() {
  const [active, setActive] = useState(1);
  return (
    <section aria-labelledby="audience-title" className="bg-canvas py-section">
      <div className="container-page">
        <div className="mb-14 grid gap-8 lg:grid-cols-12">
          <Reveal self className="lg:col-span-4">
            <p className="eyebrow eyebrow-rule">Who we serve</p>
          </Reveal>
          <SplitHeading id="audience-title" className="text-display-lg max-w-[16ch] lg:col-span-8">
            Wherever you are on the journey, <em className="em-accent">we meet you there.</em>
          </SplitHeading>
        </div>
        <Reveal self y={40}>
          <div className="flex flex-col gap-4 lg:h-[34rem] lg:flex-row">
            {groups.map((g, i) => {
              const on = active === i;
              return (
                <button
                  key={g.t}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-expanded={on}
                  className={cn(
                    "on-dark group relative isolate flex min-h-[22rem] overflow-hidden rounded-2xl text-left transition-[flex-grow] duration-700 ease-out-expo lg:min-h-0",
                    on ? "lg:grow-[2.4]" : "lg:grow",
                  )}
                  style={{ flexBasis: 0 }}
                >
                  <Image src={g.img} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className={cn("-z-20 object-cover transition-transform duration-[1.2s] ease-out-expo", on ? "scale-100" : "scale-110")} />
                  <div className={cn("absolute inset-0 -z-10 transition-colors duration-700", on ? "bg-linear-to-t from-navy-950/90 via-navy-950/30 to-transparent" : "bg-navy-950/65")} />
                  <div className="flex w-full min-w-0 flex-col justify-between p-7 lg:p-8">
                    <span className="font-mono text-sm text-accent">0{i + 1}</span>
                    <div>
                      <h3 className={cn("font-display leading-[1.05] tracking-[-0.02em] text-heading transition-[font-size] duration-700 ease-out-expo", on ? "text-display-md" : "text-display-md lg:text-[clamp(1.4rem,1.9vw,2rem)]")}>{g.t}</h3>
                      <p className={cn("mt-1 font-display italic text-accent transition-[font-size] duration-700 ease-out-expo", on ? "text-display-sm" : "text-display-sm lg:text-lg")}>{g.k}</p>
                      <p className={cn("max-w-[40ch] overflow-hidden text-fg-muted transition-[opacity,transform,max-height,margin] duration-700 ease-out-expo", on ? "mt-4 max-h-40 translate-y-0 opacity-100" : "mt-4 max-h-40 lg:mt-0 lg:max-h-0 lg:translate-y-4 lg:opacity-0")}>{g.d}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
