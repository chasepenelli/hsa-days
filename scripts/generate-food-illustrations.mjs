#!/usr/bin/env node
/**
 * Generate food illustrations for the food & nutrition page.
 * Uses the same FLUX Pro pipeline and style as the rest of the site.
 *
 * Usage: node scripts/generate-food-illustrations.mjs
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

const OUT_DIR = path.join(__dirname, "..", "public", "illustrations", "food");
fs.mkdirSync(OUT_DIR, { recursive: true });

const STYLE_PREFIX =
  "Simple hand-drawn ink sketch illustration, cute and warm, minimal line art style, muted sage green (#5B7B5E) ink wash accents on white background, editorial book illustration, soft and intimate, no text, no watermarks, centered subject, simple composition —";

const NEGATIVE_PROMPT =
  "text, watermark, copyright, blurry, photorealistic, 3D render, anime, cartoon, digital art, neon colors, dark background, letters, words, writing, busy, cluttered";

const ILLUSTRATIONS = [
  // Diet Principles
  { file: "protein.png", prompt: "a raw chicken breast and a piece of lean red meat on a cutting board, simple and appetizing, clean and minimal" },
  { file: "healthy-fats.png", prompt: "a whole salmon fillet with a few drops of golden oil beside it, fresh and wholesome, clean minimal still life" },
  { file: "whole-foods.png", prompt: "a small arrangement of fresh whole foods — a carrot, an apple, and a piece of meat — simple and wholesome, natural and clean" },
  { file: "small-meals.png", prompt: "three small dog food bowls in a row, each with a small portion of food, simple and cute, suggesting frequent small meals" },

  // Recommended Foods
  { file: "chicken.png", prompt: "a piece of cooked chicken breast, simple and appetizing, minimal and clean, food illustration" },
  { file: "organ-meats.png", prompt: "small pieces of liver and heart meat on a small plate, wholesome and rustic, minimal food illustration" },
  { file: "fish.png", prompt: "a whole sardine or small fish, fresh and simple, minimal food illustration, clean composition" },
  { file: "egg.png", prompt: "a single whole egg next to a halved boiled egg showing the yolk, simple and clean, minimal food illustration" },
  { file: "blueberries.png", prompt: "a small cluster of fresh blueberries with one leaf, plump and inviting, minimal food illustration" },
  { file: "leafy-greens.png", prompt: "a few leaves of fresh kale or spinach, vibrant and healthy looking, minimal food illustration" },
  { file: "broccoli.png", prompt: "a single head of broccoli, fresh and green, simple minimal food illustration" },
  { file: "bone-broth.png", prompt: "a small bowl of warm bone broth with gentle steam rising, comforting and warm, minimal food illustration" },
  { file: "pumpkin.png", prompt: "a small whole pumpkin cut open to show the orange flesh inside, autumn and wholesome, minimal food illustration" },

  // Foods to Avoid
  { file: "sugar.png", prompt: "a pile of sugar cubes and a few grapes, suggesting sweet sugary foods to avoid, minimal food illustration with a cautionary feel" },
  { file: "grains.png", prompt: "wheat stalks and a small pile of grain kernels, simple agricultural still life, minimal food illustration" },
  { file: "corn.png", prompt: "a single ear of corn with the husk partially peeled back, simple and clean, minimal food illustration" },
  { file: "processed-treats.png", prompt: "a few commercial-looking dog biscuits and treats, factory-made looking, minimal food illustration" },
  { file: "raw-meat.png", prompt: "a raw piece of red meat with a small caution feel, uncooked and fresh, minimal food illustration" },

  // Appetite Boosters
  { file: "warm-bowl.png", prompt: "a dog food bowl with gentle warm steam rising from it, cozy and inviting, suggesting warmed food, minimal illustration" },
  { file: "hand-feeding.png", prompt: "a human hand gently offering a small piece of food, caring and tender gesture, warm and intimate, minimal illustration" },
];

async function generateImage(item) {
  const outPath = path.join(OUT_DIR, item.file);

  // Skip if already generated
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
      "X-Title": "HSA Days Food Illustrations",
    },
    body: JSON.stringify({
      model: "black-forest-labs/flux.2-pro",
      modalities: ["image"],
      messages: [{ role: "user", content: fullPrompt }],
      image_config: { aspect_ratio: "1:1" },
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
  console.log(`Generating ${ILLUSTRATIONS.length} food illustrations...\n`);

  // Generate sequentially to avoid rate limits
  for (const item of ILLUSTRATIONS) {
    await generateImage(item);
    // Small delay between requests
    await new Promise((r) => setTimeout(r, 1500));
  }

  console.log("\nDone!");
}

main().catch(console.error);
