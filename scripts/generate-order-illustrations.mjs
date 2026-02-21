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

// Style prefixes per color accent — strong emphasis on loose linework, no borders/frames
const STYLE = {
  sage: "Simple hand-drawn ink sketch, loose confident linework, minimal ink line art with muted sage green (#5B7B5E) watercolor wash accents, white background, editorial book illustration style, soft and intimate, no text, no watermarks, no borders, no frames, no rounded corners, no boxes, no containers, no cards",
  gold: "Simple hand-drawn ink sketch, loose confident linework, minimal ink line art with warm golden (#C4A265) watercolor wash accents, white background, editorial book illustration style, soft and intimate, no text, no watermarks, no borders, no frames, no rounded corners, no boxes, no containers, no cards",
  terra: "Simple hand-drawn ink sketch, loose confident linework, minimal ink line art with muted terracotta (#D4856A) watercolor wash accents, white background, editorial book illustration style, soft and intimate, no text, no watermarks, no borders, no frames, no rounded corners, no boxes, no containers, no cards",
};

const BG_SUFFIX =
  "pure white background, no background elements, no surface, no table, no floor, no walls, no furniture, no shadows on ground, subject floats in empty white space, no border, no frame, no rounded rectangle, no card shape";

const ILLUSTRATIONS = [
  // HERO — skip, already perfect
  {
    file: "order-hero-lifestyle",
    aspect: "16:9",
    color: "sage",
    prompt: "Person sitting peacefully with corgi and open journal on lap, floating in wide white space, ethereal and ambient",
    skip: true,
  },
  // WHY PHYSICAL — a pen lying across a handwritten letter, nostalgic and analog
  {
    file: "order-why-physical",
    aspect: "3:4",
    color: "gold",
    prompt: "a single human hand holding a fountain pen writing on a blank page, seen from the side, the hand extends from the bottom of the frame, intimate and personal, loose brushwork",
  },
  // DAILY REFLECTIONS — a candle with soft flame and a single wildflower
  {
    file: "order-inside-reflection",
    aspect: "1:1",
    color: "sage",
    prompt: "a lit candle with a soft gentle flame next to a single small wildflower in a tiny glass bottle, quiet contemplative still life, loose ink sketch",
  },
  // GUIDED PROMPTS — a compass with a small heart at its center
  {
    file: "order-inside-prompt",
    aspect: "1:1",
    color: "gold",
    prompt: "a vintage compass lying open with its needle pointing, a tiny heart drawn where north would be, whimsical and introspective, simple loose sketch",
  },
  // ACTIVITIES WITH YOUR DOG — a corgi mid-play-bow with a tennis ball
  {
    file: "order-inside-activity",
    aspect: "1:1",
    color: "terra",
    prompt: "a happy corgi in a playful bow position with front paws stretched forward and butt in the air, a tennis ball in front of its nose, joyful and energetic, cute loose ink sketch",
  },
  // RESOURCE GUIDES — a small herb garden arrangement with mortar and pestle
  {
    file: "order-inside-resources",
    aspect: "1:1",
    color: "sage",
    prompt: "a small stack of well-loved books with a sprig of rosemary and a reading glasses resting on top, scholarly and nurturing still life, delicate ink sketch",
  },
  // KEEPSAKES — a polaroid photo with a dog collar and dried flower
  {
    file: "order-inside-keepsakes",
    aspect: "1:1",
    color: "gold",
    prompt: "a single polaroid photograph lying at an angle with a small dog collar buckle tag and one dried pressed flower next to it, sentimental keepsake arrangement, gentle ink sketch",
  },
  // LAY-FLAT BINDING — an open book spine from the side, architectural
  {
    file: "order-inside-binding",
    aspect: "1:1",
    color: "terra",
    prompt: "a single open hardcover book seen from the side showing pages fanned open and a flat spine, architectural cross-section view, clean technical ink sketch with subtle color wash",
  },
  // LIFESTYLE: MORNING — a steaming mug with a sleeping corgi curled beside it
  {
    file: "order-lifestyle-morning",
    aspect: "16:9",
    color: "gold",
    prompt: "a steaming coffee mug with a tiny sleeping corgi curled up next to it, the dog is very small compared to the mug, cozy morning vignette floating in wide white space, warm gentle ink sketch",
  },
  // LIFESTYLE: WRITING — a person's hands cradling a sleeping dog's face
  {
    file: "order-lifestyle-writing",
    aspect: "1:1",
    color: "sage",
    prompt: "two gentle hands cupping and cradling a sleeping dog's face, the dog's eyes are peacefully closed, tender emotional moment, intimate close-up, soft ink sketch with green wash",
  },
  // LIFESTYLE: COUCH — a dog asleep on a cozy blanket
  {
    file: "order-lifestyle-couch",
    aspect: "3:4",
    color: "terra",
    prompt: "a small dog curled up sleeping on a soft knitted blanket, paws tucked under chin, peaceful and tender, vertical composition, cute warm ink sketch",
  },
  // LIFESTYLE: COMPLETE — a paw print and human handprint side by side
  {
    file: "order-lifestyle-complete",
    aspect: "16:9",
    color: "sage",
    prompt: "a single dog paw print and a single human handprint side by side, like ink stamps pressed on paper, wide negative space around them, emotional and symbolic, minimal loose ink sketch",
  },
  // PRODUCT MOCKUP — the journal as a beautiful object
  {
    file: "order-product-mockup",
    aspect: "4:3",
    color: "sage",
    prompt: "a beautiful hardcover journal at a three-quarter angle, small embossed paw print on the sage green cloth cover, ribbon bookmark hanging out, premium product illustration, clean ink sketch",
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

  if (item.skip) {
    console.log(`  [keep] ${item.file}.png (marked skip)`);
    return;
  }

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
