#!/usr/bin/env node
/**
 * Generate illustrations for the order page.
 * Uses the same FLUX Pro pipeline and ink-wash style as the rest of the site.
 *
 * Usage:
 *   node scripts/generate-order-illustrations.mjs           # skip existing
 *   node scripts/generate-order-illustrations.mjs --force    # regenerate all
 */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FORCE = process.argv.includes("--force");

// Parse .env.local manually (no dotenv dependency needed)
const envPath = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const val = match[2].trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = val;
    }
  }
}

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
if (!OPENROUTER_API_KEY) {
  console.error("Missing OPENROUTER_API_KEY in .env.local");
  process.exit(1);
}

const OUT_DIR = path.join(__dirname, "..", "public", "illustrations", "order");
fs.mkdirSync(OUT_DIR, { recursive: true });

// Style prefixes per color accent
const STYLE = {
  sage: "Simple hand-drawn ink sketch illustration, cute and warm, minimal line art style, muted sage green (#5B7B5E) ink wash accents on white background, editorial book illustration, soft and intimate, no text, no watermarks",
  gold: "Simple hand-drawn ink sketch illustration, cute and warm, minimal line art style, warm golden (#C4A265) ink wash accents on white background, editorial book illustration, soft and intimate, no text, no watermarks",
  terra: "Simple hand-drawn ink sketch illustration, cute and warm, minimal line art style, muted terracotta (#D4856A) ink wash accents on white background, editorial book illustration, soft and intimate, no text, no watermarks",
};

const BG_SUFFIX =
  "no background, no surface, no table, no floor, no walls, no furniture, no shadows on ground, isolated subject floating on pure white";

const ILLUSTRATIONS = [
  {
    file: "order-hero-lifestyle",
    aspect: "16:9",
    color: "sage",
    prompt: "Person sitting peacefully with corgi and open journal on lap, floating in wide white space, ethereal and ambient",
  },
  {
    file: "order-why-physical",
    aspect: "3:4",
    color: "gold",
    prompt: "Two hands gently holding open a journal, seen from above, no table underneath, warm and intimate",
  },
  {
    file: "order-inside-reflection",
    aspect: "1:1",
    color: "sage",
    prompt: "Open journal page with ink marks suggesting writing, pen resting beside, contemplative still life",
  },
  {
    file: "order-inside-prompt",
    aspect: "1:1",
    color: "gold",
    prompt: "Journal page with a question mark drawn in warm ink, small thinking doodles, pen nearby",
  },
  {
    file: "order-inside-activity",
    aspect: "1:1",
    color: "terra",
    prompt: "Dog leash and tennis ball beside an open journal, playful still life",
  },
  {
    file: "order-inside-resources",
    aspect: "1:1",
    color: "sage",
    prompt: "Small stack of reference cards with herb sprig and supplement capsule, organized still life",
  },
  {
    file: "order-inside-keepsakes",
    aspect: "1:1",
    color: "gold",
    prompt: "Journal page with small photo tucked in and dog collar tag resting on it, nostalgic",
  },
  {
    file: "order-inside-binding",
    aspect: "1:1",
    color: "terra",
    prompt: "Journal lying open and perfectly flat showing lay-flat binding spine, slight angle",
  },
  {
    file: "order-lifestyle-morning",
    aspect: "16:9",
    color: "gold",
    prompt: "Steaming coffee mug, open journal with pen, small sleeping dog nearby, morning vignette in wide white space",
  },
  {
    file: "order-lifestyle-writing",
    aspect: "1:1",
    color: "sage",
    prompt: "Hand writing in open journal from above, emotional and private, subtle teardrops near page",
  },
  {
    file: "order-lifestyle-couch",
    aspect: "3:4",
    color: "terra",
    prompt: "Small dog sleeping peacefully, journal and pen resting beside, tender vertical composition",
  },
  {
    file: "order-lifestyle-complete",
    aspect: "16:9",
    color: "sage",
    prompt: "Closed worn journal with paw print on cover, pressed flower beside it, wide white space, completion",
  },
  {
    file: "order-product-mockup",
    aspect: "4:3",
    color: "sage",
    prompt: "Hardcover journal at three-quarter angle, subtle paw print on cover, premium product shot",
  },
];

function toWebP(pngPath) {
  const webpPath = pngPath.replace(/\.png$/, ".webp");
  try {
    execSync(`cwebp -q 85 "${pngPath}" -o "${webpPath}"`, { stdio: "pipe" });
    const kb = (fs.statSync(webpPath).size / 1024).toFixed(0);
    console.log(`  [webp] ${path.basename(webpPath)} (${kb}KB)`);
  } catch (e) {
    console.error(`  [ERR]  WebP conversion failed for ${path.basename(pngPath)}: ${e.message}`);
  }
}

async function generateImage(item) {
  const pngPath = path.join(OUT_DIR, `${item.file}.png`);

  if (!FORCE && fs.existsSync(pngPath)) {
    console.log(`  [skip] ${item.file}.png already exists (use --force to regenerate)`);
    return;
  }

  const stylePrefix = STYLE[item.color];
  const fullPrompt = `${stylePrefix} — ${item.prompt}, ${BG_SUFFIX}`;

  console.log(`  [gen]  ${item.file}.png (${item.aspect}, ${item.color}) ...`);

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://hsadays.com",
      "X-Title": "HSA Days Order Illustrations",
    },
    body: JSON.stringify({
      model: "black-forest-labs/flux.2-pro",
      modalities: ["image"],
      messages: [{ role: "user", content: fullPrompt }],
      image_config: { aspect_ratio: item.aspect },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`  [ERR]  ${item.file}.png: ${err}`);
    return;
  }

  const data = await res.json();

  let dataUrl =
    data.choices?.[0]?.message?.content?.[0]?.image_url?.url ||
    data.choices?.[0]?.message?.images?.[0]?.image_url?.url ||
    data.choices?.[0]?.message?.content ||
    "";

  if (!dataUrl || typeof dataUrl !== "string") {
    console.error(`  [ERR]  ${item.file}.png: no image in response`);
    return;
  }

  const base64 = dataUrl.replace(/^data:image\/[^;]*;base64,/, "");
  const buffer = Buffer.from(base64, "base64");
  fs.writeFileSync(pngPath, buffer);
  const kb = (buffer.length / 1024).toFixed(0);
  console.log(`  [OK]   ${item.file}.png (${kb}KB)`);

  // Convert to WebP
  toWebP(pngPath);
}

async function main() {
  console.log(`Generating ${ILLUSTRATIONS.length} order page illustrations...`);
  if (FORCE) console.log("  (--force: regenerating all)\n");
  else console.log("");

  for (const item of ILLUSTRATIONS) {
    await generateImage(item);
    // Small delay between requests to avoid rate limits
    await new Promise((r) => setTimeout(r, 1500));
  }

  console.log("\nDone!");
}

main().catch(console.error);
