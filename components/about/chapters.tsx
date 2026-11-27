import { HorizontalScroll } from "@/components/motion/horizontal-scroll";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/motion/reveal";

const chapters = [
  { k: "The idea", t: "To connect people to people, and people to resources.", d: "The Plug Afrique began with a simple conviction: the right introduction, at the right moment, can change the trajectory of a person, a venture or an institution." },
  { k: "The practice", t: "A private consulting practice, built on trust.", d: "Early engagements grew by word of mouth. Clients came for strategy and stayed for the network: the partners, collaborators and doors we could open." },
  { k: "The nexus", t: "Strategic thinking, innovation and purposeful collaboration.", d: "The practice evolved into a platform where individuals, ventures and organisations find the insights, partnerships and tools they need to grow." },
  { k: "Today", t: "A bridge between possibility and impact.", d: "Rooted in Africa and open to the world, TPA is a trusted partner helping clients build, adapt and thrive in an ever-changing world." },
];

/** About · our story as a pinned horizontal journey (dark chapter). */
export function Chapters() {
  return (
    <section data-header="dark" aria-labelledby="chapters-title" className="on-dark bg-aurora-navy bg-grain relative py-section-sm lg:py-0">
      <HorizontalScroll
        header={
          <div className="container-page relative z-10 mb-12 flex flex-col justify-between gap-6 lg:mb-14 lg:flex-row lg:items-end">
            <div>
              <Reveal self>
                <p className="eyebrow eyebrow-rule mb-6">Our story in four chapters</p>
              </Reveal>
              <SplitHeading id="chapters-title" className="text-display-lg max-w-[14ch]">
                From a simple idea to a <em className="em-accent">nexus.</em>
              </SplitHeading>
            </div>
            <p className="hidden max-w-[30ch] text-fg-muted lg:block">Keep scrolling. The story moves sideways.</p>
          </div>
        }
      >
        {chapters.map((c, i) => (
          <article
            key={c.k}
            data-hitem=""
            className="relative z-10 flex w-[85vw] shrink-0 snap-center flex-col justify-between rounded-2xl border border-line bg-white/[0.04] p-8 backdrop-blur-sm sm:w-[60vw] lg:min-h-[25rem] lg:w-[34rem] lg:p-10"
          >
            <div className="flex items-baseline justify-between">
              <span className="text-outline font-display text-7xl leading-none text-gold-300/70 lg:text-8xl">0{i + 1}</span>
              <span className="eyebrow !text-accent">{c.k}</span>
            </div>
            <div className="mt-10">
              <h3 className="font-display text-display-sm text-heading">{c.t}</h3>
              <p className="mt-4 text-fg-muted">{c.d}</p>
            </div>
          </article>
        ))}
      </HorizontalScroll>
    </section>
  );
}
