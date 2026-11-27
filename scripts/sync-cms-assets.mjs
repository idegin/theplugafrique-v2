// Build-time asset pipeline. Runs before `dev` and `build` (see package.json).
//
// 1. Copies every non-Markdown file in content/ (covers, avatars, inline
//    images) to public/cms/, mirroring the folder structure, so the static
//    export can serve them.
// 2. Writes resized WebP variants of every raster image in content/ and in
//    public/images/web/ (see VARIANT_SOURCES) as `<name>-<width>.webp`, for
//    each width in WIDTHS. Images are never upscaled: a variant wider than its
//    source is just re-encoded at the source width. lib/image-loader.ts maps
//    next/image requests onto these files so <Image> gets a real srcset
//    without a server.
//
// public/cms/ is gitignored and rebuilt from scratch on every run.
// Pass --watch to keep syncing while you edit content.
import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { watch } from "node:fs";
import path from "node:path";
import sharp from "sharp";

// Keep in sync with lib/image-loader.ts and images.deviceSizes in next.config.ts.
const WIDTHS = [640, 1280, 1920];
const QUALITY = 78;

const ROOT = process.cwd();
const SRC = path.join(ROOT, "content");
const OUT = path.join(ROOT, "public", "cms");
const SKIP = new Set([".md", ".mdx", ".json", ".yml", ".yaml"]);
const RASTER = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

/** Extra public/ folders that get variants, written under public/cms/_static/. */
const VARIANT_SOURCES = ["images/web"];

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (!SKIP.has(path.extname(entry.name).toLowerCase()) && !entry.name.startsWith(".")) out.push(full);
  }
  return out;
}

// Covers are shown full-bleed, so flag ones that will look soft or crop badly.
const MIN_COVER_WIDTH = 1600;
const coverWarnings = [];

async function variants(file, destNoExt) {
  const img = sharp(file);
  const { width, height } = await img.metadata();
  if (/^cover\./.test(path.basename(file)) && width && height) {
    const problems = [];
    if (width < MIN_COVER_WIDTH) problems.push(`${width}px wide (aim for at least ${MIN_COVER_WIDTH}px)`);
    if (height > width) problems.push("portrait (use a landscape image)");
    if (problems.length) coverWarnings.push(`  • ${path.relative(ROOT, file)}: ${problems.join(", ")}`);
  }
  await Promise.all(
    WIDTHS.map((w) =>
      img
        .clone()
        .resize({ width: Math.min(w, width ?? w), withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(`${destNoExt}-${w}.webp`),
    ),
  );
}

async function sync() {
  const started = Date.now();
  coverWarnings.length = 0;
  await rm(OUT, { recursive: true, force: true });

  const files = await walk(SRC);
  let count = 0;
  await Promise.all(
    files.map(async (file) => {
      const dest = path.join(OUT, path.relative(SRC, file));
      await mkdir(path.dirname(dest), { recursive: true });
      await cp(file, dest);
      const ext = path.extname(file).toLowerCase();
      if (RASTER.has(ext)) {
        await variants(file, dest.slice(0, -ext.length));
        count++;
      }
    }),
  );

  for (const rel of VARIANT_SOURCES) {
    const dir = path.join(ROOT, "public", rel);
    const sources = (await walk(dir).catch(() => [])).filter((f) => RASTER.has(path.extname(f).toLowerCase()));
    await Promise.all(
      sources.map(async (file) => {
        const ext = path.extname(file);
        const dest = path.join(OUT, "_static", path.relative(path.join(ROOT, "public"), file));
        await mkdir(path.dirname(dest), { recursive: true });
        await variants(file, dest.slice(0, -ext.length));
        count++;
      }),
    );
  }

  if (coverWarnings.length) console.warn(`[cms] ${coverWarnings.length} cover(s) need a better image:\n${coverWarnings.sort().join("\n")}`);
  console.log(`[cms] synced ${files.length} asset(s), ${count} image(s) × ${WIDTHS.length} widths → public/cms (${Date.now() - started}ms)`);
}

await sync();

if (process.argv.includes("--watch")) {
  let t;
  const onChange = () => {
    clearTimeout(t);
    t = setTimeout(() => sync().catch(console.error), 150);
  };
  watch(SRC, { recursive: true }, onChange);
  for (const rel of VARIANT_SOURCES) watch(path.join(ROOT, "public", rel), { recursive: true }, onChange);
  console.log("[cms] watching content/ and public/images/web/ for asset changes…");
}
