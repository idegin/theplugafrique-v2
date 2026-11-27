import { VelocityMarquee } from "@/components/motion/velocity-marquee";

const topics = ["Strategy", "Partnerships", "Innovation", "Culture", "Capability", "Policy", "Ecosystems", "Leadership"];

/** Blog · topic marquee that reacts to scroll velocity. */
export function TopicsBand() {
  return (
    <div aria-hidden className="border-y border-line bg-surface-muted py-6">
      <VelocityMarquee speed={50} reverse>
        {topics.map((t) => (
          <span key={t} className="flex items-center gap-8 pr-8 font-display text-[clamp(1.75rem,3.5vw,3rem)] italic text-heading">
            {t}
            <span className="size-2 rounded-full bg-gold-500" />
          </span>
        ))}
      </VelocityMarquee>
    </div>
  );
}
