/* Custom next/image loader for the static export.
   scripts/sync-cms-assets.mjs pre-renders `<name>-<w>.webp` variants for
   CMS images (/cms/…) and for public/images/web/ (/cms/_static/images/web/…).
   This loader maps each srcset width onto the smallest variant that covers it.
   Anything else (logos, icons, SVG, remote URLs) is served as-is. */

// Keep in sync with WIDTHS in scripts/sync-cms-assets.mjs.
const WIDTHS = [640, 1280, 1920];
const RASTER = /\.(jpe?g|png|webp|avif)$/i;

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (!RASTER.test(src) || /^(https?:)?\/\//.test(src)) return src;
  let base: string | null = null;
  if (src.startsWith("/cms/") && !src.startsWith("/cms/_static/")) base = src;
  else if (src.startsWith("/images/web/")) base = `/cms/_static${src}`;
  if (!base) return `${src}?w=${width}`;
  const w = WIDTHS.find((x) => x >= width) ?? WIDTHS[WIDTHS.length - 1];
  return `${base.replace(RASTER, "")}-${w}.webp`;
}
