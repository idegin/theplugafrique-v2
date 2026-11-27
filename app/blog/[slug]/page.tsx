import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPost, getPosts, getRelatedPosts } from "@/lib/cms";
import { site } from "@/lib/site";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { Toc } from "@/components/blog/toc";
import { PostCard } from "@/components/blog/post-card";
import { CategoryPill, PostMeta } from "@/components/blog/post-meta";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/motion/reveal";
import { ClipReveal } from "@/components/motion/clip-reveal";
import { LinkedinIcon, InstagramIcon, XIcon } from "@/components/ui/social-icons";
import { Share } from "@/components/blog/share";
import { ArrowRight } from "lucide-react";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: post.href },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date.toISOString(),
      images: [{ url: post.cover.src, width: post.cover.width, height: post.cover.height, alt: post.cover.alt }],
    },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const related = getRelatedPosts(post, 3);
  const all = getPosts();
  const nextPost = all[(all.findIndex((p) => p.slug === post.slug) + 1) % all.length];
  const url = new URL(post.href, site.url).toString();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date.toISOString(),
    image: new URL(post.cover.src, site.url).toString(),
    author: { "@type": "Organization", name: post.author.name },
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <ReadingProgress target="[data-article]" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article data-article="">
        <header className="bg-canvas pt-[calc(var(--spacing-header)+3rem)]">
          <div className="container-page">
            <Reveal self start="load">
              <Link href="/blog/" className="group inline-flex items-center gap-2 text-sm text-fg-muted hover:text-heading">
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" strokeWidth={1.5} /> All insights
              </Link>
            </Reveal>
            <div className="mx-auto mt-10 max-w-[56rem] text-center">
              <Reveal start="load" stagger={0.08} className="flex flex-wrap items-center justify-center gap-3">
                <span data-reveal=""><CategoryPill>{post.category}</CategoryPill></span>
                <span data-reveal=""><PostMeta post={post} /></span>
              </Reveal>
              <SplitHeading as="h1" start="load" delay={0.15} className="mt-8 text-display-lg">
                {post.title}
              </SplitHeading>
              <Reveal self start="load" delay={0.5}>
                <p className="mx-auto mt-8 max-w-[52ch] text-lead text-fg-muted">{post.excerpt}</p>
              </Reveal>
            </div>
          </div>
          <div className="container-bleed mt-14">
            <ClipReveal className="relative aspect-[16/9] rounded-xl md:aspect-[21/9]">
              <Image src={post.cover.src} alt={post.cover.alt} fill priority sizes="100vw" className="object-cover" />
            </ClipReveal>
          </div>
        </header>

        <div className="bg-canvas py-section-sm">
          <div className="container-page grid gap-12 lg:grid-cols-12">
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-28 space-y-10">
                <Toc items={post.toc} />
                <Share url={url} title={post.title} />
              </div>
            </aside>
            <div className="lg:col-span-7 lg:col-start-5">
              <div className="mb-10 border-b border-line pb-6 lg:hidden">
                <Share url={url} title={post.title} />
              </div>
              <div className="prose-tpa" dangerouslySetInnerHTML={{ __html: post.html }} />
              <div className="mt-12 border-t border-line pt-6">
                <Share url={url} title={post.title} />
              </div>

              {post.tags.length > 0 && (
                <ul className="mt-12 flex flex-wrap gap-2" aria-label="Tags">
                  {post.tags.map((t) => (
                    <li key={t} className="rounded-pill border border-line-strong px-3 py-1 font-mono text-xs text-fg-muted">#{t}</li>
                  ))}
                </ul>
              )}

              {/* Author card: name, role, socials (no phone/email, per v1 notes) */}
              <div className="mt-14 flex flex-col gap-6 rounded-xl border border-line bg-surface p-7 sm:flex-row sm:items-center">
                <Image src={post.author.avatar.src} alt="" width={72} height={72} className="size-16 rounded-full" />
                <div className="flex-1">
                  <p className="eyebrow">Written by</p>
                  <p className="mt-1 font-display text-heading-lg text-heading">{post.author.name}</p>
                  <p className="mt-1 text-sm text-fg-muted">{post.author.bio}</p>
                </div>
                <div className="flex gap-2">
                  {post.author.social.linkedin && (
                    <a href={post.author.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid size-10 place-items-center rounded-full border border-line-strong text-heading hover:bg-surface-muted"><LinkedinIcon className="size-4" /></a>
                  )}
                  {post.author.social.instagram && (
                    <a href={post.author.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid size-10 place-items-center rounded-full border border-line-strong text-heading hover:bg-surface-muted"><InstagramIcon className="size-4" /></a>
                  )}
                  {post.author.social.x && (
                    <a href={post.author.social.x} target="_blank" rel="noopener noreferrer" aria-label="X" className="grid size-10 place-items-center rounded-full border border-line-strong text-heading hover:bg-surface-muted"><XIcon className="size-4" /></a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {nextPost && nextPost.slug !== post.slug && (
        <section aria-label="Next article" className="border-t border-line bg-canvas">
          <Link href={nextPost.href} data-cursor="Read" className="group relative block overflow-hidden">
            <div className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-700 ease-out-expo group-hover:scale-y-100">
              <Image src={nextPost.cover.src} alt="" fill sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-navy-950/75" />
            </div>
            <div className="container-page relative flex flex-col gap-6 py-16 md:flex-row md:items-end md:justify-between md:py-20">
              <div className="max-w-4xl">
                <p className="eyebrow transition-colors duration-500 group-hover:text-gold-300">Next article · {nextPost.category}</p>
                <p className="mt-4 font-display text-heading transition-colors duration-500 [font-size:clamp(1.85rem,1.2rem+2.8vw,4rem)] leading-[1.05] tracking-[-0.025em] group-hover:text-ivory-50">{nextPost.title}</p>
              </div>
              <span className="grid size-16 shrink-0 place-items-center rounded-full border border-line-strong text-heading transition-[background-color,color,border-color,transform] duration-500 group-hover:translate-x-2 group-hover:border-transparent group-hover:bg-gold-300 group-hover:text-navy-950">
                <ArrowRight className="size-6" strokeWidth={1.5} />
              </span>
            </div>
          </Link>
        </section>
      )}

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-line bg-surface-muted py-section-sm">
          <div className="container-page">
            <h2 id="related-title" className="text-display-md mb-12">Keep <em className="em-accent">reading</em></h2>
            <Reveal className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
              {related.map((p) => (
                <div data-reveal="" key={p.slug}><PostCard post={p} /></div>
              ))}
            </Reveal>
          </div>
        </section>
      )}
    </main>
  );
}
