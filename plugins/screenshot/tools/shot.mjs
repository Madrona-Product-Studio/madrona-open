import { chromium } from "playwright";
import { execSync } from "node:child_process";

// Usage: node shot.mjs <url> <outPath> [width] [height] [selector]
const [, , url, out, width = "1440", height = "900", selector] = process.argv;

// Many AI APIs reject images over ~2000px in either dimension once a
// conversation holds several images. Keep every capture under that cap.
const MAX_DIM = 1950;

if (!url || !out) {
  console.error("Usage: node shot.mjs <url> <outPath> [width] [height] [selector]");
  process.exit(1);
}

const browser = await chromium.launch({ channel: "chrome" });
try {
  const page = await browser.newPage({
    viewport: { width: Number(width), height: Number(height) },
    // Retina capture only when it fits under the cap; wide viewports get 1x.
    deviceScaleFactor: Number(width) * 2 <= MAX_DIM ? 2 : 1,
  });
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(600);

  if (selector) {
    const el = await page.waitForSelector(selector, { timeout: 10000 });
    await el.screenshot({ path: out });
  } else {
    await page.screenshot({ path: out, fullPage: true });
  }
  // Full-page and element shots can still exceed the cap in height; downscale in place (macOS `sips`).
  if (process.platform === "darwin") {
    try {
      const dims = execSync(`sips -g pixelWidth -g pixelHeight "${out}"`).toString();
      const [w, h] = [...dims.matchAll(/pixel(?:Width|Height): (\d+)/g)].map((m) => Number(m[1]));
      if (w > MAX_DIM || h > MAX_DIM) {
        execSync(`sips -Z ${MAX_DIM} "${out}"`, { stdio: "ignore" });
        console.log(`downscaled ${w}x${h} -> max ${MAX_DIM}px`);
      }
    } catch {}
  }
  console.log("saved", out);
} finally {
  await browser.close();
}
