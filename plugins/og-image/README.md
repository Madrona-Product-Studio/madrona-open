# og-image — the link preview is the first impression

A shared link with no OG image looks broken in iMessage, Slack, and LinkedIn
— and a cluttered one reads as noise in a feed. This skill designs, builds,
and wires social-share images that hold up next to the best of
[ogimage.gallery](https://www.ogimage.gallery/).

## The doctrine: simple is best

One idea per image. If a draft has a headline AND a screenshot AND a gradient
AND a badge, it's wrong — delete until one thing remains. Four archetypes:

- **A. Wordmark on flat brand color** — hardest to get wrong, instantly
  identifiable in a feed.
- **B. Full-bleed signature visual + mark** — one striking photo/texture,
  wordmark overlaid large.
- **C. Statement + small mark** — one headline (max 7 words), only when the
  name alone doesn't communicate.
- **D. Dynamic per-content** — for user-generated pages, one variable slot in
  a fixed layout.

## What it enforces

- The **thumbnail test**: the image must read at 400px wide.
- **Layout, wordmarks, and type built in code** (HTML/CSS → screenshot);
  image models only for photographic/atmospheric fills — never for final
  logos, UI, or text.
- **< 300KB** (WhatsApp silently drops larger images).
- **Version the filename on every design change** — unfurlers cache by image
  URL, so a swapped design behind the same filename shows the old card
  forever.
- Per-stack wiring (Next.js Metadata API, SPA `index.html` + helmet, static
  builds) with a QA gate at the end.

Ships a starting `templates/og.html`. Rendering uses the companion
`screenshot` skill. Tags/sitemaps/JSON-LD are a separate SEO concern — this
skill owns the image.

Provided **as-is**, MIT.
