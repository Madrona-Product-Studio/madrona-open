# investor-ready — make an app judgeable by a stranger in 60 seconds

Products built by their maker almost always fail the same way: **the app never
says what it is, and the best material is buried behind taps.** This skill runs
the whole sweep to fix that before you share a link with an investor, a beta
user, or the press.

## What it does

A phased pass, audit-first — it won't touch anything until you pick a phase:

- **Phase 0 — Audit.** Walk the app as a stranger (mobile + desktop
  screenshots), sweep the codebase in parallel, and deliver a one-sentence
  diagnosis plus a phased plan.
- **Phase 1 — Say what it is.** First-run messaging (a live proof point, never
  hardcoded) and a landing "why" section with a real product screenshot.
- **Phase 2 — Lead with the wow.** The money screen reachable in ≤1 tap and
  previewed at 0; enrich empty overview cards from real data.
- **Phase 3 — Credibility sweep.** A security gate (going public is its own
  trigger), og image, icons/favicon, naming consistency, analytics, and an
  env-gated waitlist that renders nothing when unconfigured.
- **Phase 4 — Narrative.** An about/vision page, roadmap honesty, and a
  measurable get-in-touch path for both the "use it" and "build on it"
  audiences.

The skill also carries a long list of **learned checks** — de-identified
gotchas from real runs (PWA crash-on-load after deploys, Safari SVG-favicon
support, RGB-vs-RGBA `favicon.ico` 500s, prod-only free-tier AI degradation,
PII hiding in sample/seed files, and more).

## The bundled scripts

Under `skills/investor-ready/scripts/` — Playwright helpers the phases use:

- `make-og.mjs` — compose a 1200×630 og.png from the app's own hero/brand.
- `make-icons.mjs` — rasterize a brand mark into 180/192/512 PWA PNG icons.
- `shot-with-storage.mjs` — screenshot a page with localStorage keys preset
  (QA screens hidden behind a one-time popup).
- `prod-audit.mjs` — walk the deployed production URL and capture console
  errors, page errors, failed requests, and screenshots.

To run them:

```
cd skills/investor-ready/scripts
npm install   # installs Playwright + a bundled Chromium via postinstall
node make-og.mjs out/og.png
```

For quick full-page / by-selector captures during the audit, use the companion
`screenshot` skill in this same collection (`node shot.mjs <url> <out> …`).

Provided **as-is**, MIT.
