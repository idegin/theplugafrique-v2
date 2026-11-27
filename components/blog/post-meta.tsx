import { formatDate, type Post } from "@/lib/cms";
import { cn } from "@/lib/utils";

export function PostMeta({ post, className }: { post: Post; className?: string }) {
  return (
    <p className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.12em] text-fg-muted", className)}>
      <time dateTime={post.date.toISOString()}>{formatDate(post.date)}</time>
      <span aria-hidden className="size-1 rounded-full bg-accent-fill" />
      <span>{post.readingMinutes} min read</span>
    </p>
  );
}

export function CategoryPill({ children, className }: { children: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-pill bg-clay-100 px-3 py-1 text-xs font-medium text-clay-700", className)}>
      {children}
    </span>
  );
}
