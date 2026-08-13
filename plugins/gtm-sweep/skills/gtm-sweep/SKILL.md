---
name: gtm-sweep
description: Take an app to market as a repeatable, measured sweep — positioning, a measurement floor, discoverability (SEO backfill + expansion), a small honest channel launch, and the post-launch read/iterate loop. Use when asked to "market this app", "grow traffic/users", "plan the launch", "do GTM for X", or "expand SEO". The goal is to make "how do we get users" a phased, measured routine instead of a vibe.
---

# GTM Sweep

Run one app's go-to-market as a sweep. Shipping is not distribution: the common
failure is an app that is built and polished, then shared nowhere — no
measurement, no capture, no repeat channel. This skill exists to make "how do
we get users" a phased, measured routine instead of a vibe.

When a play on any app teaches something, **append it to *Learned plays* at the
bottom, tagged with the app and dated, and keep the phases stable** so the
playbook compounds across apps.

## Related skills

This skill **orchestrates**; some artifacts are best owned by focused skills:

- **`screenshot`** (in this collection) — visual QA for footprint checks and
  launch-post previews.
- **`og-image`** (in this collection) — the share image itself; a "simple is
  best" doctrine. Use it wherever an OG image is missing or weak.

Keep two motions separate: this skill is for **product** GTM (getting users to
an app). A consulting/services funnel is a different motion — don't blend them.

## Core diagnosis pattern

Assume until the audit disproves it: **the app has no acquisition loop.** It
may be findable (SEO) and presentable (polish), but nothing brings people in
on purpose, nothing captures them when they arrive, and nothing measures
whether any of it worked. GTM work that skips measurement is indistinguishable
from doing nothing — wire the floor before running plays.

## Phase 0 — GTM audit (always first; deliverable is a verdict + plan)

1. **Footprint check** — what's actually live: SEO basics (meta, OG image,
   sitemap, robots, canonical, structured data, Search Console), analytics
   firing (open the realtime dashboard, not the code), email capture, content
   surfaces, pricing surface.
2. **Positioning test** — can the repo answer, in one sentence each: who it's
   for, the problem, what they use today instead, why this is different, and
   the proof. If not, Phase 1 writes it.
3. **Channel inventory** — where does this audience already gather (search
   queries, subreddits/forums, local networks, newsletters, app stores)?
   List candidates; don't pick yet.
4. **Loop check** — if a stranger arrives and likes it, what brings them (or
   a friend) back? Waitlist, share mechanic, email, nothing?

Deliver: one-sentence diagnosis → footprint table → phased plan. Don't start
fixing until the owner picks a phase.

## Phase 1 — Positioning + measurement floor

- **Positioning one-pager** committed into the app repo
  (`docs/positioning.md`): audience, problem, alternative, difference, proof,
  one-line pitch. Everything downstream (meta description, OG copy, launch
  post) quotes this file instead of improvising.
- **Analytics wired** — a provider baseline plus a shared event vocabulary,
  verified firing in the dashboard. On single-page apps, make sure client-side
  route changes are tracked (see Learned plays), not just the initial load.
- **Capture** — one honest reason to leave an email (waitlist, updates,
  saved-state), only if the app can plausibly follow up. A dead capture form
  is worse than none.

## Phase 2 — Discoverability (SEO backfill, then expansion)

- **Backfill** the SEO basics to green (meta, OG, sitemap, robots, canonical,
  structured data, Search Console).
- **Expand — often the cheapest channel.** Content-rich apps can turn their
  own data into indexable pages: destination/city/entity pages, guides,
  comparisons ("programmatic SEO"). Each page must be genuinely useful
  standalone — no thin doorway pages.
- **OG image** via the `og-image` skill if missing or weak — it's the first
  impression on every share.

## Phase 3 — Launch (small, honest, measured)

- Run an engineering/operational pre-flight and an outsider-clarity pass first.
  Launching an app that isn't ready burns the channel — most communities only
  let you introduce a thing once.
- **Pick 1–3 channels** from the Phase 0 inventory where the audience already
  is. Prefer one community done well over five drive-bys.
- **UTM every outbound link** (`?utm_source=<channel>&utm_campaign=<play>`)
  so Phase 4 can attribute anything.
- Write the launch post in the app's voice, lead with the useful thing (not
  yourself), disclose maker-status where the norm requires it, and stay in the
  thread to answer.

## Phase 4 — The loop (this is where the skill earns its keep)

- **Read the numbers on a cadence** (weekly while a play is live): sessions
  by source, capture conversions, the app's one "did they get value" event.
- **Keep / kill / double down** — explicitly, in writing.
- **Bank the play**: append a *Learned plays* entry — app, date, play, cost
  (hours), result (numbers), verdict. Honest zeros included; a play that did
  nothing is a finding, not an embarrassment.

## House rules

- **Never fabricate or round up metrics.** Screenshots or dashboard numbers,
  with dates. An unmeasured play reports "unmeasured", not "went well".
- **No spam mechanics** — no mass DMs, fake accounts, review manipulation,
  or community carpet-bombing. Trust and proximity are the real assets.
- **Measure before scaling.** No paid spend on an app whose analytics and
  capture aren't verified firing.
- **One flagship at a time.** Mechanical sweeps (SEO backfill) are fine in
  parallel; *plays* run on one app until the loop closes.

## Learned plays (append as apps teach you; never rewrite history)

Bank every real play here so the playbook compounds. Format:

- **[<app>, <date>, <play>]** cost (hours) · result (numbers, with dates) ·
  verdict (keep / kill / double down).

_(No entries yet — fill this in as you run plays.)_
