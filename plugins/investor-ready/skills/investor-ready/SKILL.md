---
name: investor-ready
description: Audit and fix an app so a first-time outside viewer (investor, beta user, press) immediately understands what it is, why it matters, and sees the core value fast. Use when asked to make an app "investor ready", "demo ready", "presentable to outsiders", or to review it "with an investor hat on". Covers the audit, first-run messaging, demo wow-path, credibility polish (og/icons/favicon/naming/analytics/waitlist), and narrative.
---

# Investor-ready

Make an app ready to be judged by a stranger in 60 seconds. This covers the
**entire sweep** — audit, first-run messaging, demo wow-path, credibility
polish, narrative — not any single artifact; the bundled scripts (og
composer, icon rasterizer, storage-preset screenshots, prod audit) are just
tools the phases use.

The scripts live in `scripts/` next to this file. They use Playwright via the
bundled `scripts/package.json` — run `npm install` in that directory once and
the browser installs itself. Some steps also lean on the companion
`screenshot` skill in this same collection for quick full-page / by-selector
captures (`node shot.mjs <url> <out> [w] [h] [selector]`).

## Core diagnosis pattern

Products built by their maker almost always fail the same way: **the app never
says what it is, and the best material is buried behind taps.** The maker knows
the wow is three levels deep; a stranger bounces off the first screen. Assume
this failure until the audit disproves it.

## Phase 0 — Audit (always do this first, before proposing anything)

1. **Walk the app as a stranger.** Start the dev server, screenshot every
   screen on the entry path at BOTH ~390px and desktop widths (use the
   companion `screenshot` skill: `node shot.mjs <url> <out> [w] [h] [selector]`).
   Landing → primary CTA → first screen → drill-down. Judge each screenshot:
   "if this were my only screen, what would I think this product is?"
2. **Codebase sweep in parallel:** routes/entry flow, first-run or onboarding
   UI, empty states, the differentiating features (real or stubs?),
   marketing/about surfaces, analytics/waitlist/share, TODOs and placeholder
   assets, naming consistency (old codenames in docs/manifest), and — if a
   demo/sample mode exists — **every mutation path reachable from it** (see the
   write-leak check below).
3. **Deliver a verdict first**: one-sentence diagnosis, then the
   walkthrough-in-order of what a stranger sees, then a phased plan. Score
   dimensions if useful (entry clarity, demoability, polish, narrative,
   engagement loop).

The deliverable of Phase 0 is the plan. Do not start fixing until the reviewer
picks a phase.

## Phase 1 — Say what it is

- **First-run popup** (shown once, localStorage-gated, e.g.
  `<app>:welcome:v1`): 2–3 short beats — what it is, what's different, and one
  *live proof point pulled from real app data, never hardcoded* (e.g. a value
  derived from a seeded sensor or record). Primary CTA deep-links to the money
  screen; secondary "Explore on my own". Self-gating component (renders null
  once seen) avoids react-refresh lint issues and keeps the parent clean. A11y:
  role=dialog, aria-modal, Escape, backdrop click, autofocus with an on-brand
  focus ring (never the default blue), focus falls back to secondary if primary
  is conditional.
- **Landing "why" section** below the hero: micro-label + one breath line +
  three value beats + **a real product screenshot** (capture a live element
  with the screenshot tool's selector arg — authentic UI beats mockups) + a
  repeated CTA. Match the app's design system exactly; no new tokens.
- **Contrast pass** on any copy sitting over photography.

## Phase 2 — Lead with the wow

The first screen after the primary CTA must *prove* the pitch, not just
contain it. Look for: overview screens that render as empty boxes while detail
screens are rich. Fixes: an aggregate "right now"/summary strip at the top
(assembled from the same data the detail views use; items deep-link down), and
visual density in previews (tints, dots, badges derived from real data). Rule:
**the demo's money screen should be reachable in ≤1 tap and previewed at 0.**

## Phase 3 — Credibility sweep

Every item here is something an outsider notices in diligence or when a link
is shared:

- **Security gate — going public is its own trigger; run this BEFORE anything
  cosmetic.** Many apps start as a personal tool at an obscure URL where
  "nobody knows the link" was the only protection. The moment you attach a
  memorable domain, buy one, or share the link widely, that protection is gone
  and every unauthenticated route is exposed. Audit:
  - **Every API route's auth**, not just the demo's. List `app/api/**/route.ts`
    (or equivalent) and for each ask "what does an anonymous `curl` get?" —
    then actually curl the deployed URL. Data-reading routes (a GET that
    returns the user's real content) and mutation routes (POST/PUT/PATCH that
    writes) must require a secret/cookie/signature. It is easy to ship a GET
    serving the owner's real data (and accepting writes) to any visitor —
    invisible until a memorable domain makes it findable.
  - **The private/public split.** If the app has both a public demo and a
    private real surface on the same deployment, gate the private half:
    proxy/middleware (Next 16: `proxy.ts`, not `middleware.ts`) requiring an
    httpOnly cookie for private pages/APIs, with an allowlist for the demo,
    the login gate, and self-guarded webhooks (signature/token/secret). A
    single shared password → sha256 cookie is enough for a personal tool; don't
    over-build.
  - **Secrets & cost.** No secrets in client bundles or public HTML; AI/LLM
    endpoints that cost money need auth or rate-limiting so a public URL can't
    run up the bill.
  - This is a clarity/polish skill, not a pentest — but "is the private half
    safe to be on the public internet" is a launch gate, and a dedicated
    security-review pass on the branch is worth running once before the link
    goes out.
- **og.png 1200×630** — compose from the app's own hero/brand assets in HTML,
  screenshot with Playwright (template: `scripts/make-og.mjs`). Verify the
  head already references it; if it references a missing file, that's the bug.
- **App icons** — check the favicon FIRST: template boilerplate (wrong-color
  glyphs) survives shockingly long. Rebuild favicon.svg from the brand mark,
  rasterize 180/192/512 PNGs (template: `scripts/make-icons.mjs`; maskable =
  full-bleed background, mark within center ~72%), wire manifest icons
  (`any` + `maskable` purposes) and `apple-touch-icon` (PNG — iOS ignores SVG).
- **Naming consistency** — finish any product rename in docs, README, style
  guides, manifest. BUT never rename storage identifiers (IndexedDB/DB class
  names) — that orphans user data. Keep doc filenames if referenced elsewhere.
  BSD sed word boundary is `[[:<:]]Name[[:>:]]`, not `\b`.
- **Analytics** — platform-native, privacy-friendly (`@vercel/analytics`:
  `inject()` for Vite SPAs, `<Analytics />` from `@vercel/analytics/next` in
  the root layout for Next.js App Router; Plausible otherwise). Note any
  dashboard enable step for the reviewer. If the app is a PWA, exempt telemetry
  from the service worker: add a `/_vercel/` bypass to the fetch handler so
  the insights script is never served stale from cache — and follow the
  repo's sw cache-version bump convention if it has one.
- **Email/waitlist capture** — form posts to an env-configured endpoint
  (Formspree-compatible JSON). **Render nothing when unconfigured** — never
  ship a form that silently drops emails, and never hardcode a personal email
  into public HTML. Add the env var to `.env.example` with a comment.
- Update the README launch-TODO list to reflect what's now done vs. still
  needs a human (domain, dashboard toggles, endpoint accounts).

## Phase 4 — Narrative

About/vision page telling the product story that usually lives only in
internal docs; roadmap honesty (if the tagline promises something not yet
built, one sentence saying it's coming beats silence); pricing/positioning if
relevant.

**Always include a get-in-touch path.** An outsider who loves the app needs
somewhere to go. Two audiences, two paths: a waitlist form is the "use it"
audience; a "want one built for what you run?" studio/contact CTA is the
"buy/build on it" audience — ship both. Keep the exit CTA measurable (a
`utm_source=<app>-demo` param + an analytics `track()` on click) so interest
becomes a number you can quote later, and keep the copy voice consistent
across surfaces so a portfolio of apps reads as one shop.

## Standing rules

- **The pass is not done until the DEPLOYED production URL is walked** with the
  console captured (template: `scripts/prod-audit.mjs` — logs console errors,
  page errors, failed requests, and screenshots against the live site).
  Localhost QA does not count: service workers, stale caches, missing env
  vars, and CDN behavior only exist in production. A crash-on-load that
  localhost can never show is a common production-only failure.
- Visual QA gate: screenshot mobile + desktop after every UI change; fix
  what's visibly wrong before reporting.
- Green gate after each phase: typecheck + lint + build.
- To QA behind a one-time popup, preset its localStorage key via a Playwright
  `addInitScript` variant of the screenshot tool (template:
  `scripts/shot-with-storage.mjs`).
- Persist the phase plan + status to project notes so it survives sessions.
- Don't commit/push unless asked.

## Learned checks (append as apps teach us)

Generic checks worth carrying forward. Add your own as real runs teach them —
keep them de-identified and keep the phases stable.

- The favicon may be leftover boilerplate from a template — check its actual
  contents, not just that it exists.
- Element screenshots race `loading="lazy"` images — a blank image box in an
  element capture is usually a QA artifact; confirm with a full-page capture
  before "fixing".
- Overview cards that render domain shapes with no data (blank rectangles) are
  the single biggest demo killer — enrich previews from the same selectors the
  detail views already use.
- Check the README before anything else in the credibility sweep: an app can be
  fully branded and polished while the README is still the stock Vite/Next
  template. People doing light diligence open the repo; the README is its
  landing page. Rewrite it as: what the product is, the live URL, stack,
  commands, and a pointer to the roadmap doc.
- Verify the screenshot shows the app you're auditing. With several dev servers
  running, Vite silently hops ports (5173 → 5176) and you can spend a whole
  audit walking someone else's product. Read the dev server's reported port
  from its output before the first capture.
- The first-run popup is a pattern, not a mandate. For a brand whose identity
  is restraint/calm, a one-line differentiator under the hero plus a linkable
  About page does Phase 1's job better than a modal. Decide from the brand
  adjectives, not the checklist.
- Grep copy for hardcoded counts near content nouns ("the three texts",
  "12 layers"): they drift as content grows. Derive counts from the data the
  page already loads, or phrase countlessly.
- Honesty labels ("AI-drafted · awaiting review", beta banners) read as
  "unfinished" in a demo. Don't just soften the label — get the flagship path
  actually reviewed so the label disappears the honest way, and pitch the
  labeling policy itself as part of the product's integrity story.
- When the target audience is also the distribution channel (the practitioners
  the app serves), add an explicit "what it isn't" section that defuses the
  substitution fear ("a companion to your work, not a replacement") and ends
  with a direct invitation. The About page is a pitch surface; write it for the
  specific reader.
- Commit the phased readiness roadmap into `docs/` rather than leaving it in
  chat: the repo then tells the story on its own, and the plan survives
  sessions. Organize the phases around the jobs the founder names for the
  product — the audit lands harder in their own frame.
- **Public demos leak writes.** If the app has a demo/sample persona, trace
  every mutation path in the components the demo renders — a shared
  quick-add/capture bar that POSTs to a real unauthenticated endpoint lets any
  stranger with the demo link write into the owner's real data. This outranks
  all cosmetic work: fix before the link is shared at all.
- **Don't neuter a leaking demo feature — localize it.** The strongest fix for
  a demo write-leak is making the feature fully work against the demo's
  in-memory data: reuse the exact helpers the server uses on both sides so
  toasts, Undo, and Move behave identically. The security fix *becomes* the
  demo's interactive wow moment.
- **Keep the AI real in demos via a classify-only endpoint mode.** Add a
  `{demo: true, ...}` branch that runs the real classifier and returns the
  routing decision without touching storage; the client applies it locally.
  Real AI + local apply = genuine magic, zero write risk. Exposure is
  acceptable if the app already ships unauthenticated AI endpoints; otherwise
  rate-limit it.
- **Owner-tuned AI prompts misroute demo data.** A classifier steered toward
  the owner's own sections sends demo captures to sections the demo brain
  doesn't have — the wow moment misfires in production too. Give demo personas
  a generic-brain prompt variant that routes purely by best fit.
- **Full-page screenshots lie about fixed elements.** `fullPage` captures
  render fixed/sticky docks at their initial-viewport position, producing
  phantom overlaps ("content hidden under the dock") and background voids below
  the fold. Before changing any layout, re-verify with plain viewport captures
  at scroll-top AND scrolled-to-bottom.
- **"The AI always falls back" locally may be a key-tier issue, not a bug.**
  Free-tier AI Gateway keys can't call premium models, and a swallowed `catch`
  makes that look like broken routing. Log the error in the catch (you want it
  in prod logs anyway), smoke-test locally with a cheap allowed model via env
  override, and verify the real model after deploy. Always curl the deployed
  endpoint and read runtime logs; never assume prod keys are healthier than
  local ones — the same free-tier 403 can silently degrade every AI feature for
  real users, not just the demo.
- **Demo CTAs belong in the sticky header, not down the page.** In demo mode,
  strip owner-utility chrome from the header (back arrows to internal pages,
  export icons) to make room — a demo header serves the visitor's two jobs
  (understand it, contact you), not the owner's. Keep a quiet attribution line
  on the intro overlay as the earliest exposure.
- **"Show the file / show the data" is the demo's cheapest proof.** When the
  pitch is about the substrate (a file you own, your data, no lock-in), add a
  one-tap peek at the raw thing — rendered live from the same state the UI uses,
  so something captured seconds ago is visibly *in* it — plus a download
  button. A claim in an intro overlay becomes a demonstrable fact.
- **A polished demo with no way in wastes its best moment.** Landing + popup +
  live demo + about with zero contact path means someone who loved it has
  nowhere to go. Treat the get-in-touch path (Phase 4) as load-bearing. Also
  sharpen the hero: a tagline states the promise; add one small concrete line
  naming the actual objects the app manages so strangers know what it literally
  is before the demo.
- **PWA + hashed chunks = crash-on-load after every deploy.** A service worker
  (or open tab) from before a deploy serves the old index.html, whose lazy
  chunks no longer exist → 404 → "Failed to fetch dynamically imported module"
  and dead navigation. Any Vite app with code-splitting needs a
  `vite:preloadError` listener; ship it the moment the PWA plugin lands. **And
  reload alone is NOT the fix** — the stale worker still controls the tab and
  serves the same stale index from its cache. The handler must first
  `unregister()` all service workers and delete CacheStorage keys, then reload
  (sessionStorage-guarded), so the network serves the new build and a fresh
  worker re-registers.
- **Safari does not support SVG favicons.** An SVG-only favicon means no tab
  icon for every Safari user. Always add PNG fallback links (32 for tabs, 192)
  alongside the SVG — and test the favicon in Safari, not just Chrome.
- **One product screenshot can't serve both widths.** A wide desktop capture
  shrinks to an unreadable postage stamp on a 390px phone. Ship a `<picture>`
  pair: a portrait capture of the money screen (taken at 390px viewport,
  `deviceScaleFactor: 2`) for `max-width: 767px`, the wide capture for desktop.
  Both must be real UI. Similarly, hero copy that stacks 3+ text blocks reads
  fine at 1440 and becomes a wall at 390 — cut to tagline + ONE short concrete
  line, and delete any caption sitting on photographic foliage.
- **An empty `#root` is a blank screen for the whole JS download.** SPAs show
  nothing until hydration — on real mobile networks that's seconds of "is this
  broken?". Inline a branded pre-hydration loader (brand mark + wordmark,
  inline styles only, reduced-motion respected) inside `#root` in index.html;
  the framework replaces it on mount. Verify with a JS-disabled screenshot.
- "Link is alive" is not the bar — "destination is ready to be advertised" is.
  Enumerate every nav/footer/section link (`grep -rhoE 'href="/[a-z#-]*"'` over
  the page components), and for each ask whether a stranger should land there
  today. A noindexed coming-soon page linked from the footer undoes the noindex
  discipline; equally, check the inverse — real pages with zero nav presence.
  Audit the advertised-link inventory as a set, not link-by-link during walks.
- The audit and the push are different gates. Before merging a big update, run
  a prelaunch checklist: production-preview smoke of every route at both widths
  (dev server ≠ built site), noindex/sitemap/dist verification, SPA-fallback
  coverage for removed routes, and an explicit post-deploy verification list
  for the things only production can prove (analytics beacon, form email, og
  scrape). If the target repo has no such checklist, create one.
- After any nav/IA renumbering, grep for the old ordinals in page kickers and
  breadcrumbs (`grep -rn "04 Sources"` style) — section labels hardcode their
  pillar number and silently go stale when a new nav item shifts the sequence.
- Re-check sitemap.xml (and any hand-listed route inventory) at the END of the
  sweep, not the start: a static sitemap goes stale the moment the sweep itself
  ships new routes.
- A content section that exists but is visibly thinner than its siblings needs
  one honest sentence explaining the state and what's coming. An unexplained
  bare page reads as broken; an explained one reads as a roadmap.
- **A Next.js `app/favicon.ico` packed from RGB PNGs 500s EVERY route.** Next's
  image pipeline decodes `app/favicon.ico` at request time and throws "The PNG
  is not in RGBA format!", which takes down the whole dev server / build, not
  just the icon. Playwright `page.screenshot()` emits RGB PNGs; when
  hand-packing an ICO, route the mark through `canvas.toDataURL()` (which
  always emits RGBA) before packing. Also check `src/app/favicon.ico`'s actual
  pixels even when `public/favicon.svg` is branded — Next serves the .ico at
  the root, so a boilerplate .ico silently wins over the branded SVG in most
  browsers.
- **Capture landing proof screenshots from the UPDATED build, never the
  deployed site mid-sweep.** A screenshot of the live app bakes the pre-sweep
  copy (old prompts, stale wording) into a marketing asset that then ships
  alongside the corrected copy. Run the copy sweep first, then capture from
  local dev.
- **The model's own output is user-facing copy.** Any voice/style rule must go
  INTO the system prompt as an explicit instruction, and the prompt's own prose
  should model it, because the model mimics the register it's written in.
  Verify by reading a real response, not the prompt.
- **If the waitlist form self-hides when unconfigured, its inviting copy must
  live inside the form component.** A sibling paragraph promising "leave your
  email" renders even when the env-gated form returns null, advertising a path
  that isn't there.
- **Verify you own every domain the app references before anything else.** A
  canonical URL, og tags, and privacy-contact email can all point at a domain
  someone else registered — their server, their cert, their inbox receiving the
  privacy mail. Check DNS + cert + MX (`dig`, `openssl s_client`, `whois`) for
  each referenced domain; a "we never bought the domain" failure looks
  identical to a config typo until you check who answers. Name collisions are a
  founder-level decision (rename vs. buy a distinct domain), not a silent fix.
- **Serverless function relative imports need explicit `.js` extensions.** A
  shared helper imported as `'./_lib/guard'` builds fine locally and 500s in
  production with ERR_MODULE_NOT_FOUND, since functions run as native Node ESM.
  Import as `'./_lib/guard.js'` from the start, and always curl the deployed
  endpoint after adding any api/ helper file: this class of failure is
  invisible on localhost.
- **A per-IP counter is the zero-new-infra rate limiter for cost-bearing
  endpoints.** Apps with a DB already wired get a durable cross-instance
  limiter from one migration: a `rate_limits` table plus an atomic upsert
  returning `count <= max`, called from a shared guard that also checks
  `sec-fetch-site`/Origin/Referer. Fail open on DB errors so real users are
  never locked out. Verify live with curl: anonymous → 403, same-origin burst →
  429 after the cap, then delete the test rows so the owner's own IP isn't
  throttled during their next demo.
- **Real personal data hides in "sample/seed/fallback" files — and it ships to
  anyone who can read the repo.** A personal-tool app often seeds its empty
  states / no-token fallbacks with the owner's ACTUAL data. If the repo is
  public, all of it is exposed — and prior security passes miss it because they
  check API auth + committed secrets, not *PII embedded as sample data*. Add to
  Phase 3, BEFORE cosmetics: (1) check every repo's visibility
  (`gh repo view --json visibility`) — default personal-tool repos to private,
  and treat "make public" as an audited action, not a toggle; (2) grep the
  source for real identifiers (name, email, city, employer, contacts, figures)
  and open every `*sample*`/`*seed*`/`*demo*`/`*-data.*` and no-token fallback
  file — sample data must be **fictional** (a named demo persona), and config
  defaults must be generic (no personal slugs); (3) git **history** retains it
  after a scrub, so a repo that was ever public with real data needs a history
  rewrite (or a fresh repo) before it can be public again.
