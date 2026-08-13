// Screenshot a page with localStorage keys preset BEFORE load — for QA'ing
// screens hidden behind one-time popups (welcome intros, tours).
//
// Setup: run `npm install` in this scripts/ directory once.
// Usage: node shot-with-storage.mjs <url> <outPath> [width] [height] [key=value ...]
// Example: node shot-with-storage.mjs http://localhost:5173/app out.png 390 844 "myapp:welcome:v1=1"
import { chromium } from 'playwright';

const [, , url, out, width = '1440', height = '900', ...pairs] = process.argv;
if (!url || !out) {
  console.error('Usage: node shot-with-storage.mjs <url> <outPath> [width] [height] [key=value ...]');
  process.exit(1);
}
const entries = pairs.map((p) => {
  const i = p.indexOf('=');
  return [p.slice(0, i), p.slice(i + 1)];
});

const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: Number(width), height: Number(height) },
    deviceScaleFactor: 2,
  });
  await page.addInitScript((kv) => {
    for (const [k, v] of kv) localStorage.setItem(k, v);
  }, entries);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(600);
  await page.screenshot({ path: out, fullPage: true });
  console.log('saved', out);
} finally {
  await browser.close();
}
