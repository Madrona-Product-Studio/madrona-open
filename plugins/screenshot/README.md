# screenshot — look at the rendered thing before calling it done

The primitive the rest of this catalog leans on. A tiny Playwright
screenshotter for the visual-QA loop: render the real page and actually look
at it, instead of declaring a UI change done from the code.

## What it does

```
node tools/shot.mjs <url> <outPath> [width] [height] [selector]
```

- **Full page or one element** — pass a CSS selector as the 5th arg.
- **Any width** — desktop (`1440`) and mobile (`390`) are the two you should
  always check.
- **Retina-aware, auto-capped** — captures at 2× and downscales automatically
  so files stay under AI image-size limits (a full-page retina capture can
  otherwise silently fail an AI review step).
- **`file://` URLs work** — handy for rendering an HTML template (the
  `og-image` skill uses exactly this).

## Setup (once)

```
cd tools && npm install
```

Installs Playwright + a Chromium build. It drives the system Chrome by
default; remove `channel: "chrome"` in `tools/shot.mjs` to use the bundled
Chromium instead.

Provided **as-is**, MIT.
