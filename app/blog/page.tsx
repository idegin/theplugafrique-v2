import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { getCategories, getPosts } from "@/lib/cms";
import { PageHero } from "@/components/site/page-hero";
import { PostCard } from "@/components/blog/post-card";
import { PostFilter } from "@/components/blog/post-filter";
import { CategoryPill, PostMeta } from "@/components/blog/post-meta";
import { ClipReveal } from "@/components/motion/clip-reveal";
import { Reveal } from "@/components/motion/reveal";
import { TopicsBand } from "@/components/blog/topics-band";
import { NewsletterBand } from "@/components/blog/newsletter-band";

export const metadata: Metadata = pageMeta({
  title: "Insights",
  description: "Perspectives from The Plug Afrique on strategy, innovation, culture and partnership across Africa.",
  path: "/blog/",
  og: "blog",
  feeds: { "application/rss+xml": "/rss.xml" },
});

export default function BlogIndex() {
  const posts = getPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p !== featured);

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <PageHero
        eyebrow="Insights"
        title={
          <>
            Ideas worth <em className="em-accent">plugging into.</em>
          </>
        }
        lead="Perspectives on strategy, innovation, culture and partnership across Africa and beyond."
      />

      <TopicsBand />

      {featured && (
        <section aria-label="Featured insight" className="bg-canvas py-section-sm">
          <div className="container-page">
            <article className="group relative grid gap-10 lg:grid-cols-12 lg:items-center">
              <ClipReveal className="relative aspect-[16/10] rounded-xl lg:col-span-7">
                <Image src={featured.cover.src} alt={featured.cover.alt} fill priority sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.04]" />
              </ClipReveal>
              <Reveal stagger={0.08} className="lg:col-span-5">
                <div data-reveal="" className="flex items-center gap-3">
                  <span className="eyebrow !text-accent">Featured</span>
                  <CategoryPill>{featured.category}</CategoryPill>
                </div>
                <h2 data-reveal="" className="mt-6 font-display text-heading [font-size:clamp(1.85rem,1.3rem+1.6vw,2.85rem)] leading-[1.08] tracking-[-0.02em]">
                  <Link href={featured.href} className="after:absolute after:inset-0">
                    {featured.title}
                  </Link>
                </h2>
                <p data-reveal="" className="mt-5 text-lead text-fg-muted">{featured.excerpt}</p>
                <div data-reveal="" className="mt-8 flex items-center gap-4">
                  <Image src={featured.author.avatar.src} alt="" width={40} height={40} className="size-10 rounded-full" />
                  <div>
                    <p className="text-sm font-medium text-heading">{featured.author.name}</p>
                    <PostMeta post={featured} />
                  </div>
                </div>
              </Reveal>
            </article>
          </div>
        </section>
      )}

      <section aria-label="All insights" className="border-t border-line bg-canvas py-section-sm">
        <div className="container-page">
          <PostFilter
            categories={getCategories()}
            cards={rest.map((p) => ({ slug: p.slug, category: p.categorySlug, node: <PostCard post={p} /> }))}
          />
        </div>
      </section>

      <NewsletterBand />
    </main>
  );
}
