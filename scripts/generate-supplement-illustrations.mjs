#!/usr/bin/env node
/**
 * Generate category scene illustrations for the supplements page.
 * Uses the same FLUX Pro pipeline and ink-wash style as the food page.
 *
 * Usage: node scripts/generate-supplement-illustrations.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

const OUT_DIR = path.join(__dirname, "..", "public", "illustrations", "supplements");
fs.mkdirSync(OUT_DIR, { recursive: true });

const STYLE_PREFIX =
  "Simple hand-drawn ink sketch illustration, cute and warm, minimal line art style, muted sage green (#5B7B5E) ink wash accents on white background, editorial book illustration, soft and intimate, no text, no watermarks, wide panoramic composition —";

const ILLUSTRATIONS = [
  {
    file: "blood-support.png",
    prompt:
      "warm kitchen scene with herbal capsules, a stone mortar and pestle, scattered dried herbs and red clover flowers, a dog food bowl nearby, soft natural light streaming in, comforting and medicinal atmosphere",
  },
  {
    file: "anti-cancer.png",
    prompt:
      "apothecary-style arrangement with turkey tail mushrooms, small glass tincture bottles, fresh green leaves, gentle warm light filtering through, scholarly and healing atmosphere",
  },
  {
    file: "immune-support.png",
    prompt:
      "garden windowsill scene with mushroom extract bottles, vitamin supplement jars, fresh herbs growing in small pots, soft morning light, healthy and nurturing atmosphere",
  },
  {
    file: "liver-organ.png",
    prompt:
      "herbal tea scene with milk thistle flowers, dried roots spread on linen cloth, a ceramic cup with gentle steam rising, warm and soothing atmosphere",
  },
  {
    file: "quality-of-life.png",
    prompt:
      "cozy scene with fish oil capsules, a piece of fresh turmeric root, a happy relaxed dog in soft focus background, warm golden afternoon light, peaceful and caring atmosphere",
  },
];

async function generateImage(item) {
  const outPath = path.join(OUT_DIR, item.file);

  if (fs.existsSync(outPath)) {
    console.log(`  [skip] ${item.file} already exists`);
    return;
  }

  const fullPrompt = `${STYLE_PREFIX} ${item.prompt}`;

  console.log(`  [gen]  ${item.file} ...`);

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://hsadays.com",
      "X-Title": "HSA Days Supplement Illustrations",
    },
    body: JSON.stringify({
      model: "black-forest-labs/flux.2-pro",
      modalities: ["image"],
      messages: [{ role: "user", content: fullPrompt }],
      image_config: { aspect_ratio: "21:9" },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`  [ERR]  ${item.file}: ${err}`);
    return;
  }

  const data = await res.json();

  let dataUrl =
    data.choices?.[0]?.message?.content?.[0]?.image_url?.url ||
    data.choices?.[0]?.message?.images?.[0]?.image_url?.url ||
    data.choices?.[0]?.message?.content ||
    "";

  if (!dataUrl || typeof dataUrl !== "string") {
    console.error(`  [ERR]  ${item.file}: no image in response`);
    return;
  }

  const base64 = dataUrl.replace(/^data:image\/[^;]*;base64,/, "");
  const buffer = Buffer.from(base64, "base64");
  fs.writeFileSync(outPath, buffer);
  console.log(`  [OK]   ${item.file} (${(buffer.length / 1024).toFixed(0)}KB)`);
}

async function main() {
  console.log(`Generating ${ILLUSTRATIONS.length} supplement scene illustrations...\n`);

  for (const item of ILLUSTRATIONS) {
    await generateImage(item);
    await new Promise((r) => setTimeout(r, 1500));
  }

  console.log("\nDone!");
}

main().catch(console.error);
