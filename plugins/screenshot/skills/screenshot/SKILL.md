---
name: screenshot
description: Capture a screenshot of a web page or a single element for visual QA — full page or by CSS selector, retina-aware, auto-downscaled to stay under AI image-size limits. Use whenever you need to render a page or component and look at it yourself (at desktop and mobile widths) before calling a UI or design change done.
---

# Screenshot

A tiny Playwright screenshotter for the visual-QA loop: render the real thing and actually look at it, instead of declaring a UI change done from the code.

## Setup (once)

```
cd tools && npm install
```

This installs Playwright and a Chromium build. The tool launches the system Chrome by default (`channel: "chrome"`); if you don't have Chrome, remove that option in `tools/shot.mjs` to use the bundled Chromium.

## Usage

```
node tools/shot.mjs <url> <outPath> [width] [height] [selector]
```

- **Full page (desktop):** `node tools/shot.mjs http://localhost:3000 /tmp/home.png 1440 900`
- **Mobile width:** `node tools/shot.mjs http://localhost:3000 /tmp/home-mobile.png 390 800`
- **One element:** pass a CSS selector as the 5th arg — `node tools/shot.mjs http://localhost:3000 /tmp/hero.png 1440 900 ".hero"`
- **A file:** `file://` URLs work too (handy for rendering an HTML template).

## Notes

- Captures are 2× (retina) when the result fits under ~1950px, otherwise 1×.
- Full-page and element shots taller than the cap are downscaled in place (macOS `sips`); on other platforms the raw capture is kept.
- It waits for `networkidle` + a short beat before shooting, so most animations and fonts have settled.

## The discipline

Don't call a UI change done from the diff. Render it, screenshot **desktop (~1440) and mobile (~390)**, inspect it yourself, and fix what's visibly wrong before bringing anyone else in.
