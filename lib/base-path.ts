/* Base path the site is served under. Empty on a custom domain; "/<repo>"
   on a GitHub Pages project site. The deploy workflow sets
   NEXT_PUBLIC_BASE_PATH from actions/configure-pages, and next.config.ts
   passes it to Next's `basePath`, which prefixes <Link> hrefs and /_next/.
   Anything Next doesn't prefix (custom image loader output, unoptimized
   <Image>s, CSS mask URLs, Markdown images, the manifest) goes through asset(). */
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

/** Prefix a root-relative public path with the base path. Other URLs pass through. */
export function asset(src: string): string {
  if (!basePath || !src.startsWith("/") || src.startsWith("//") || src.startsWith(basePath + "/")) return src;
  return basePath + src;
}

/** Strip the base path from a pathname (for router.push, which re-adds it). */
export function stripBasePath(pathname: string): string {
  if (basePath && (pathname === basePath || pathname.startsWith(basePath + "/"))) return pathname.slice(basePath.length) || "/";
  return pathname;
}
