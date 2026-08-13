// Rasterize a brand mark into PWA PNG icons (full-bleed background square,
// mark scaled into the maskable safe zone) using the bundled Playwright
// Chromium.
//
// Setup: run `npm install` in this scripts/ directory once.
// Usage: node make-icons.mjs <outDir>
// EDIT the BG / MARK_SVG constants per app before running.
import { chromium } from 'playwright';

const OUT = process.argv[2];
if (!OUT) { console.error('Usage: node make-icons.mjs <outDir>'); process.exit(1); }

// ── EDIT ME per app ──────────────────────────────────────────────────────────
const BG = '#f5f1ea'; // brand ground color
// Inner mark, drawn in a 0 0 100 100 viewBox; scale ~0.72 keeps it inside the
// maskable safe zone (inner 80% circle).
const MARK_SVG = `
  <g fill="none" stroke="#b23a2e" stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round"
     transform="translate(50 50) scale(0.72) translate(-50 -50)">
    <path d="M50 14 C30 36 30 64 50 86 C70 64 70 36 50 14 Z"/>
    <path d="M50 20 L50 80" stroke-width="3.7"/>
  </g>`;
// ─────────────────────────────────────────────────────────────────────────────

const html = `<!doctype html><html><body style="margin:0">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style="display:block;width:100vw;height:100vh">
  <rect width="100" height="100" fill="${BG}"/>${MARK_SVG}
</svg></body></html>`;

const browser = await chromium.launch();
try {
  for (const size of [180, 192, 512]) {
    const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
    await page.setContent(html);
    await page.screenshot({ path: `${OUT}/icon-${size}.png` });
    await page.close();
    console.log('saved', `${OUT}/icon-${size}.png`);
  }
} finally {
  await browser.close();
}
