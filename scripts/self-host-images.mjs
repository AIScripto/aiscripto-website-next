/**
 * Self-hosts the Unsplash photos used by the site.
 *
 * Scans src/ for Unsplash photo ids (full images.unsplash.com URLs and the bare
 * "1234567890-abcdef" ids passed to resolveImage()), downloads each once, and writes
 * responsive WebP variants to public/images/stock/<id>-<width>.webp.
 * Existing files are skipped, so it is safe to re-run after adding new images.
 *
 *   node scripts/self-host-images.mjs
 */
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "public", "images", "stock");
export const WIDTHS = [160, 480, 960, 1440];

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "__tests__") yield* walk(full);
    } else if (/\.(tsx?|mjs)$/.test(entry.name)) yield full;
  }
}

async function collectIds() {
  const ids = new Set();
  for await (const file of walk(path.join(ROOT, "src"))) {
    const src = await fs.readFile(file, "utf8");
    for (const m of src.matchAll(/photo-(\d{10,}-[0-9a-f]{6,})/g)) ids.add(m[1]);
    for (const m of src.matchAll(/["'`](\d{10,}-[0-9a-f]{6,})["'`]/g)) ids.add(m[1]);
    for (const m of src.matchAll(/\/images\/stock\/(\d{10,}-[0-9a-f]{6,})-\d+\.webp/g)) ids.add(m[1]);
  }
  return [...ids].sort();
}

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  const ids = await collectIds();
  console.log(`Found ${ids.length} Unsplash photo ids`);
  let downloaded = 0;
  const missing = [];

  for (const id of ids) {
    const targets = WIDTHS.map((w) => path.join(OUT, `${id}-${w}.webp`));
    if ((await Promise.all(targets.map(exists))).every(Boolean)) continue;

    const res = await fetch(`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=85&w=1600`);
    if (!res.ok) {
      missing.push(`${id} (HTTP ${res.status})`);
      continue;
    }
    const source = Buffer.from(await res.arrayBuffer());

    for (const [i, width] of WIDTHS.entries()) {
      await sharp(source).resize({ width, withoutEnlargement: true }).webp({ quality: 72 }).toFile(targets[i]);
    }
    downloaded++;
  }
  console.log(`Downloaded and converted ${downloaded} new photo(s) into ${path.relative(ROOT, OUT)}`);
  if (missing.length > 0) {
    console.error(`Unavailable on Unsplash (replace these images):\n  ${missing.join("\n  ")}`);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
