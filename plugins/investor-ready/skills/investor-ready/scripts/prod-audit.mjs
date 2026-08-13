// Walk the DEPLOYED production site and capture what localhost can't show:
// console errors, page errors, failed requests, 4xx/5xx responses — plus
// screenshots. The investor-ready pass is not done until this runs clean.
//
// Setup: run `npm install` in this scripts/ directory once.
// Usage: node prod-audit.mjs <prodUrl> [extraPath ...]
// Example: node prod-audit.mjs https://appname.app/ /demo /about
import { chromium } from 'playwright';

const [, , base, ...paths] = process.argv;
if (!base) { console.error('Usage: node prod-audit.mjs <prodUrl> [path ...]'); process.exit(1); }

const browser = await chromium.launch();
const logs = [];
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') logs.push(`[console.${m.type()}] ${m.text()}`); });
  page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}`));
  page.on('requestfailed', (r) => logs.push(`[requestfailed] ${r.url()} — ${r.failure()?.errorText}`));
  page.on('response', (r) => { if (r.status() >= 400) logs.push(`[http ${r.status()}] ${r.url()}`); });

  for (const p of ['/', ...paths]) {
    const url = new URL(p, base).href;
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(1500);
    const slug = p === '/' ? 'root' : p.replace(/\W+/g, '-').replace(/^-|-$/g, '');
    await page.screenshot({ path: `/tmp/prod-audit-${slug}.png` });
    console.log(`visited ${url} → /tmp/prod-audit-${slug}.png`);
  }
} finally {
  await browser.close();
}
console.log(logs.length ? `\n${logs.join('\n')}` : '\nNO ERRORS CAPTURED');
