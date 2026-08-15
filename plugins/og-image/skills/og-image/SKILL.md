---
name: og-image
description: Design, build, and wire up great Open Graph / social-share images for any web app, following the "simple is best" doctrine (one idea, brand color, bold mark). Use when creating or redesigning an app's OG image, fixing blank or ugly link previews, or wiring og/twitter meta tags. This skill owns the image itself; a separate SEO pass owns tags/sitemaps.
---

# /og-image — great social share images

A link preview is the app's first impression in iMessage, Slack, and LinkedIn. This skill produces OG images that hold up next to the best (see [ogimage.gallery](https://www.ogimage.gallery/) — Cash App, Dirt, Lassie, Opal) and wires them in correctly per stack.

**Doctrine: simple is best.** One idea per image. If a draft has a headline AND a screenshot AND a gradient AND a badge, it's wrong — delete until one thing remains.

## Design rules (non-negotiable)

1. **One idea.** A wordmark, OR a single visual, OR one short statement. Never a collage, never a full app screenshot with tiny text.
2. **Pick an archetype** (in order of preference — A is the default):
   - **A. Wordmark on flat brand color** — logo/wordmark centered on a single saturated brand color. Zero other elements. Hardest to get wrong, instantly identifiable in a feed.
   - **B. Full-bleed signature visual + mark** — one striking photo/texture filling the frame, wordmark overlaid large.
   - **C. Statement + small mark** — one headline (max 7 words, ≥ 64px at 1200×630) plus a small logo, optionally one supporting visual anchored to an edge. Use only when the app name alone doesn't communicate.
   - **D. Dynamic per-content** — for user-generated/detail pages (a shared doc, a guide). Same fixed layout system as A–C with exactly one variable slot (title, or title + one image).
3. **Thumbnail test.** The image must read at 400px wide — that's how it appears in a feed. If text or the mark isn't legible at 400px, it fails.
4. **Brand color from tokens.** Pull the background/accent from the app's own palette. One background color, at most one accent. No multi-stop decorative gradients.
   - **Confirm the repo serves the domain before designing.** Domains move between repos as projects evolve. Check the live site's title/copy against the repo's `index.html`/landing page before starting — a full design round in the wrong repo is wasted.
   - **Logo sourcing:** check for an approved logo/asset system first (a `Logo` component, a brand asset dir). Respect raster constraints (reversed variants on dark only, never upscale past native). When a fixed lockup is too small at OG scale, split it: raster mark at native size + wordmark re-set in live type matched to the brand face (verify side by side; flag as an approximation if the official face is unconfirmed).
5. **Typography:** one typeface (two max), the app's actual brand face. Any text ≥ 48px at full size; headlines 64–120px.
6. **Safe zone:** keep text and marks ≥ 90px from every edge (platforms crop edges and round corners).

## Hard specs

- **Canvas: 1200×630** (1.91:1). This one size serves Facebook, X large card, LinkedIn, Slack, Discord, iMessage, WhatsApp.
- **Format:** PNG for flat color/type (archetypes A, C), JPG ~85 quality for photographic (B).
- **File size: < 300KB** (WhatsApp silently drops larger images on slow connections). Compress with `sips`, `pngquant`, or `jpegoptim`.
- **Tags:** `og:image` must be an **absolute HTTPS URL**; always include `og:image:width`/`og:image:height` (or `images: [{ width, height }]` in Next metadata) and `twitter:card: summary_large_image` — without it X crops to a tiny square.
- **Version the image filename on every design change** (`og-<slug>.png`, new slug per design). Slack/iMessage cache unfurl images **by the image URL** — swapping designs behind the same filename keeps showing the old card forever, even for never-before-shared page URLs.
- **Share-testing:** to see a fresh unfurl of an already-shared page, append a throwaway query param and increment it each time (`https://site.com/?og=5`). Verify what crawlers actually get with `curl -A "Slackbot-LinkExpanding 1.0" <url>`.

## How to build the image

**Layout, wordmarks, and type are always built in code** (HTML/CSS → screenshot). **Photographic/atmospheric visuals are generated with an image model.** Never ask an image model to render final logos, UI, or text — that's what keeps these simple and legible.

**Archetypes A & C (flat color / statement) — pure code:**

1. Copy `templates/og-template.html` (in this skill dir) into the app repo (e.g. `marketing/og/og.html` — keep the source committed so it can be re-rendered).
2. Fill in brand color, wordmark (inline SVG preferred), and archetype variant; delete unused variants.
3. Render (using the `screenshot` skill in this collection or your own tool): `node shot.mjs "file://<abs-path>/og.html" public/og.png 1200 630`
4. Compress to < 300KB.

**Archetype B (full-bleed visual) — image model generates the plate, code composites the mark:**

1. Write a compact brief (purpose, 1.91:1 crop, focal point, protected empty space where the wordmark will sit, rejection criteria).
2. Generate the photographic plate at 1200×630 landscape, leaving the wordmark region clear, with **no text or logos in the image**. Generate one candidate at a time; evaluate before generating another. If an approved photograph already exists, prefer a controlled edit of it over fresh generation.
3. Drop the plate into `og-template.html` archetype B, composite the wordmark in CSS, screenshot, compress (JPG ~85 for photographic).

For **dynamic images** (archetype D) in Next.js, use `next/og` `ImageResponse` in `opengraph-image.tsx` / a route handler — same design rules apply (flat color, one variable slot). In Vite apps, use a serverless route. A generated plate can serve as the static background layer of a dynamic image.

## Wiring per stack

- **Next.js App Router:** either `app/opengraph-image.tsx` (`next/og`) **or** a static file + `metadata.openGraph.images` — but always set `metadataBase`, `openGraph: { title, description, url, images: [{ url, width: 1200, height: 630 }] }`, and `twitter: { card: 'summary_large_image' }` in `layout.tsx`. A common bug: an `opengraph-image.tsx` exists but the twitter card metadata is missing.
- **Vite / React SPA:** static tags in `index.html` (crawlers don't run JS) + a per-route override library (e.g. `react-helmet-async`) + pre-render for unfurlers where routes matter. The `index.html` block needs: `og:title`, `og:description`, `og:type`, `og:url`, `og:image` (absolute URL), `og:image:width/height`, `twitter:card`.
- **Static build:** bake the tags into the HTML at build time.

## QA gate (required before calling it done)

1. **Look at the rendered PNG yourself** — open it, then view it scaled to ~400px wide (thumbnail test). Fix what's visibly wrong before showing anyone.
2. Verify file size < 300KB and exact 1200×630 (`sips -g pixelWidth -g pixelHeight public/og.png`).
3. Verify tags: `curl -s <deployed-url> | grep -iE 'og:|twitter:'` — check absolute image URL, width/height, twitter card. For local work, check the built HTML.
4. After deploy: paste the URL into iMessage/Slack or the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) (which also busts Facebook's cache after a change).
5. Bring the reviewer in at the design decision point (archetype/visual choice) with rendered options — not for every iteration.

## Modes

- **Single app** (default): run from an app repo, or name the app. Design → build → wire → QA.
- **Audit**: sweep a set of apps, score each app's current OG image against the design rules and specs, report a table (app · has image? · archetype · passes thumbnail test? · tags complete?), and propose which to redo first. Read-only.
