/**
 * Generate PWA icon assets from the existing paw-print illustration.
 * Creates sage-background app icons with the paw print centered.
 *
 * Usage: node scripts/generate-pwa-icons.mjs
 */
import sharp from "sharp";
import { mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SOURCE = join(ROOT, "public/illustrations/icons/icon-paw-print.png");
const OUT_DIR = join(ROOT, "public/icons");

mkdirSync(OUT_DIR, { recursive: true });

// Design tokens
const SAGE = { r: 91, g: 123, b: 94 }; // #5B7B5E
const WARM_WHITE = { r: 250, g: 248, b: 245 }; // #FAF8F5

/**
 * Create a rounded-rect SVG mask for the icon background
 */
function roundedRectSvg(size, radius) {
  return Buffer.from(`<svg width="${size}" height="${size}">
    <rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="white"/>
  </svg>`);
}

/**
 * Generate a standard PWA icon: sage rounded-rect background + white paw print
 */
async function generateIcon(size, filename, options = {}) {
  const { maskable = false } = options;

  // For maskable icons, the safe zone is the inner 80%, so we need extra padding
  const pawSize = maskable ? Math.round(size * 0.55) : Math.round(size * 0.7);
  const cornerRadius = Math.round(size * 0.2);

  // Create the sage background with rounded corners
  const background = await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { ...SAGE, alpha: 255 },
    },
  })
    .png()
    .toBuffer();

  // Apply rounded corners via composite mask (not for maskable - those are full bleed)
  let base;
  if (maskable) {
    base = background;
  } else {
    base = await sharp(background)
      .composite([
        {
          input: roundedRectSvg(size, cornerRadius),
          blend: "dest-in",
        },
      ])
      .png()
      .toBuffer();
  }

  // Prepare the paw print: resize and tint to warm-white
  const paw = await sharp(SOURCE)
    .resize(pawSize, pawSize, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .tint(WARM_WHITE)
    .png()
    .toBuffer();

  // Composite paw on top of background, centered
  const offset = Math.round((size - pawSize) / 2);
  const result = await sharp(base)
    .composite([
      {
        input: paw,
        left: offset,
        top: offset,
      },
    ])
    .png()
    .toBuffer();

  const outPath = join(OUT_DIR, filename);
  await sharp(result).toFile(outPath);
  console.log(`  Created ${filename} (${size}x${size})`);
}

async function main() {
  console.log("Generating PWA icons...\n");

  await generateIcon(192, "icon-192.png");
  await generateIcon(512, "icon-512.png");
  await generateIcon(512, "icon-maskable-512.png", { maskable: true });
  await generateIcon(180, "apple-touch-icon.png");

  console.log("\nDone! Icons written to public/icons/");
}

main().catch((err) => {
  console.error("Error generating icons:", err);
  process.exit(1);
});
