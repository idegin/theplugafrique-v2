import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/cms";
import { CategoryPill, PostMeta } from "./post-meta";
import { cn } from "@/lib/utils";

export function PostCard({ post, className, priority }: { post: Post; className?: string; priority?: boolean }) {
  return (
    <article className={cn("group relative flex flex-col", className)}>
      <div className="relative aspect-[16/11] overflow-hidden rounded-lg bg-surface-muted">
        <Image
          src={post.cover.src}
          alt={post.cover.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.05]"
        />
      </div>
      <div className="mt-6 flex items-center gap-3">
        <CategoryPill>{post.category}</CategoryPill>
        <PostMeta post={post} />
      </div>
      <h3 className="mt-4 font-display text-display-sm text-heading [font-size:clamp(1.4rem,1.2rem+0.8vw,1.85rem)]">
        <Link href={post.href} className="after:absolute after:inset-0">
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-700 ease-out-expo group-hover:bg-[length:100%_1px]">
            {post.title}
          </span>
        </Link>
      </h3>
      <p className="mt-3 line-clamp-3 text-fg-muted">{post.excerpt}</p>
    </article>
  );
}
