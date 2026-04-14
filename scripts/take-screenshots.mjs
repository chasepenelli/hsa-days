import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = 'https://hsadays.com';
const GATE_PASSWORD = 'hsadays2026';
const OUTPUT_DIR = resolve(__dirname, '../public/illustrations/app-preview');

const screens = [
  { name: 'screen-track.png', path: '/track' },
  { name: 'screen-supplements.png', path: '/resources/supplements' },
  { name: 'screen-analyze.png', path: '/tools/analyze' },
];

(async () => {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });

  await context.addCookies([{
    name: 'site_access',
    value: GATE_PASSWORD,
    domain: 'hsadays.com',
    path: '/',
  }]);

  for (const screen of screens) {
    const page = await context.newPage();
    await page.goto(`${BASE}${screen.path}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: `${OUTPUT_DIR}/${screen.name}`,
      type: 'png',
    });
    console.log(`Captured: ${screen.name}`);
    await page.close();
  }

  await browser.close();
  console.log(`Done! Screenshots saved to ${OUTPUT_DIR}`);
})();
