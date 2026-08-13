# Render contract

How any surface (a web app, a terminal, a widget) should render `work.md`. The point of the contract: **surfaces render the source of truth; they never own the logic.** No surface re-ranks, and no surface calls an AI to decide priority — the routines already wrote the answer into the file.

## The generated blocks

Each machine-maintained block lives between exact sentinel comments:

```
<!-- BEGIN GENERATED PRIORITIES ... -->  …ranked list…  <!-- END GENERATED PRIORITIES -->
<!-- BEGIN OWED -->                       …owed list…    <!-- END OWED -->
<!-- BEGIN TRACK STATUS -->               …track dots…   <!-- END TRACK STATUS -->
```

Rules for **surfaces** (renderers):

1. **Render the priorities block as the ranked hero, in the order written.** It is the single source of ranking. Never re-rank, never re-order.
2. **Treat each marker region as one special block:** render it once (as a hero / a card), and **exclude those lines from normal markdown/section parsing** so they don't also appear as a duplicate section.
3. **The real ⭐ tasks still live in their focus-area sections** — render those in place as usual. Hero (ranked, with rationale) *plus* in-section ⭐ tasks is the intended view, not duplication.
4. **If a block's markers are absent** (no routine has run yet), render sections normally — no hero. Don't fabricate one.

Rules for **writers** (the routines that produce the blocks):

1. **Only rank real `- [ ] ⭐` tasks.** Never insert something that isn't a starred task in a section. If something non-starred deserves the top, *propose the star* and let the owner confirm.
2. **Each ranked line opens with its source task's title verbatim** (at least the first several words), so a surface can match the ranked row back to the real task by text. A paraphrased title silently loses the match.
3. **Refresh stale titles at the source first.** If a task's title describes a past state, rewrite it in its section to the current action, then rank that.
4. **Never hand-edit between the sentinels** in a way a routine didn't produce — the routines own those regions.

## Capture (writing back)

A surface may also *write*: a capture endpoint appends a task to the right focus-area section (or the buy list) and commits. Keep writes small and append-only; let the routines do the ranking.
