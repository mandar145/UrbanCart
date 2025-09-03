// generate-products.mjs
import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const PRODUCTS_DIR = path.join(process.cwd(), "public", "products");
const OUTPUT_JSON = path.join(process.cwd(), "src", "data", "products.json");
const ALLOWED = new Set([".png", ".jpg", ".jpeg", ".webp"]);

const toSlug = (s) =>
  s
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
const labelize = (name) =>
  name
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const ADJ = [
  "Classic",
  "Premium",
  "Lightweight",
  "Essential",
  "Comfy",
  "Breathable",
  "Tailored",
  "Modern",
  "Casual",
  "Sport",
];
const MAT = [
  "cotton",
  "blend",
  "polyester",
  "linen",
  "denim",
  "fleece",
  "wool",
  "silk-touch",
  "stretch",
];
const FIT = [
  "regular fit",
  "slim fit",
  "relaxed fit",
  "oversized fit",
  "athletic cut",
];
function randomDescription(name) {
  const a = ADJ[randInt(0, ADJ.length - 1)];
  const m = MAT[randInt(0, MAT.length - 1)];
  const f = FIT[randInt(0, FIT.length - 1)];
  return `${a} ${name} in ${m}, ${f}.`;
}

async function main() {
  await fs.mkdir(path.dirname(OUTPUT_JSON), { recursive: true });

  const entries = await fs.readdir(PRODUCTS_DIR, { withFileTypes: true });
  const products = [];

  for (const dirent of entries) {
    if (!dirent.isDirectory()) continue;

    const folderName = dirent.name; // e.g. "Blazer" or "Celana_Panjang"
    const categorySlug = toSlug(folderName); // e.g. "blazer", "celana-panjang"
    const categoryLabel = folderName
      .replace(/[_-]+/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    const folderPath = path.join(PRODUCTS_DIR, folderName);

    const files = await fs.readdir(folderPath);

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (!ALLOWED.has(ext)) continue;

      const fileNoExt = path.basename(file, ext);
      const name = labelize(fileNoExt);
      const price = randInt(1, 100); // £1–£100
      const stock = 50; // starting stock
      const id = crypto
        .createHash("md5")
        .update(`${categorySlug}/${file}`)
        .digest("hex");
      const stat = await fs.stat(path.join(folderPath, file));
      const createdAt = stat.mtime.toISOString();

      products.push({
        id,
        name,
        categorySlug,
        categoryLabel,
        image: `/products/${folderName}/${file}`, // public path
        file,
        price,
        currency: "GBP",
        description: randomDescription(name),
        stock,
        createdAt,
      });
    }
  }

  // newest first (optional)
  products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  await fs.writeFile(OUTPUT_JSON, JSON.stringify(products, null, 2), "utf8");
  console.log(`✅ Wrote ${OUTPUT_JSON} with ${products.length} products`);
}

main().catch((err) => {
  console.error("❌ Failed to generate products.json:", err);
  process.exit(1);
});
