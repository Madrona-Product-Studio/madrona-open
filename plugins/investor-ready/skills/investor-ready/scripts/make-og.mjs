// Compose an og.png (1200×630) from an app's own hero/brand assets: photo
// ground, haze for legibility, mark, wordmark, tagline, domain.
//
// Setup: run `npm install` in this scripts/ directory once (installs Playwright
// + a bundled Chromium).
// Usage: node make-og.mjs <outPath>
// EDIT the constants per app. Serve the hero image over http (dev server) —
// file:// subresources are blocked inside setContent pages.
import { chromium } from 'playwright';

const OUT = process.argv[2];
if (!OUT) { console.error('Usage: node make-og.mjs <outPath>'); process.exit(1); }

// ── EDIT ME per app ──────────────────────────────────────────────────────────
const HERO = 'http://localhost:5173/images/hero-desktop.png'; // via dev server!
const BG = '#f5f1ea';
const INK = '#1a1714';
const BODY = '#403a33';
const MUTED = '#6f6657';
const NAME = 'AppName';
const TAGLINE = 'One-sentence value proposition.';
const DOMAIN = 'appname.app';
const FONT = 'Inter';
const MARK_SVG = `<svg width="72" height="72" viewBox="0 0 100 100" fill="none" stroke="#b23a2e"
  stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M50 14 C30 36 30 64 50 86 C70 64 70 36 50 14 Z"/><path d="M50 20 L50 80" stroke-width="1.8"/></svg>`;
// ─────────────────────────────────────────────────────────────────────────────

const hazeRGB = BG.length === 7
  ? `${parseInt(BG.slice(1, 3), 16)},${parseInt(BG.slice(3, 5), 16)},${parseInt(BG.slice(5, 7), 16)}`
  : '245,241,234';

const html = `<!doctype html><html><head>
<link href="https://fonts.googleapis.com/css2?family=${FONT.replace(/ /g, '+')}:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; font-family: '${FONT}', sans-serif; overflow: hidden; position: relative; background: ${BG}; }
  img.bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 42%; }
  .haze { position: absolute; left: 50%; top: 0; transform: translateX(-50%); width: 900px; height: 78%;
    background: radial-gradient(ellipse at center, rgba(${hazeRGB},.92) 0%, rgba(${hazeRGB},.66) 46%, rgba(${hazeRGB},0) 78%); }
  .content { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; transform: translateY(-40px); }
  h1 { font-size: 92px; font-weight: 700; letter-spacing: -0.035em; line-height: 1; color: ${INK}; margin-top: 26px; }
  p { font-size: 30px; line-height: 1.4; color: ${BODY}; margin-top: 20px; max-width: 640px; }
  .domain { font-size: 20px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: ${MUTED}; margin-top: 30px; }
</style></head><body>
<img class="bg" src="${HERO}">
<div class="haze"></div>
<div class="content">${MARK_SVG}<h1>${NAME}</h1><p>${TAGLINE}</p><div class="domain">${DOMAIN}</div></div>
</body></html>`;

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: OUT });
  console.log('saved', OUT);
} finally {
  await browser.close();
}
