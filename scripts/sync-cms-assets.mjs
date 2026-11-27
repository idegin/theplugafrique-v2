// Copies every non-Markdown file in content/ (covers, avatars, inline images)
// to public/cms/, mirroring the folder structure, so the static export can
// serve them. Runs automatically before `dev` and `build` (see package.json).
// Pass --watch to keep syncing while you edit content.
import { cp, mkdir, readdir, rm, stat } from "node:fs/promises";
import { watch } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "content");
const OUT = path.join(ROOT, "public", "cms");
const SKIP = new Set([".md", ".mdx", ".json", ".yml", ".yaml"]);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (!SKIP.has(path.extname(entry.name).toLowerCase()) && !entry.name.startsWith(".")) out.push(full);
  }
  return out;
}

async function sync() {
  await rm(OUT, { recursive: true, force: true });
  const files = await walk(SRC);
  await Promise.all(
    files.map(async (file) => {
      const dest = path.join(OUT, path.relative(SRC, file));
      await mkdir(path.dirname(dest), { recursive: true });
      await cp(file, dest);
    }),
  );
  console.log(`[cms] synced ${files.length} asset(s) → public/cms`);
}

await sync();

if (process.argv.includes("--watch")) {
  let t;
  watch(SRC, { recursive: true }, () => {
    clearTimeout(t);
    t = setTimeout(() => sync().catch(console.error), 150);
  });
  console.log("[cms] watching content/ for asset changes…");
}

void stat;
