---
name: weekly-sync
description: The weekly conductor — produce a one-page "state of things" (what moved, what's owed, what's slipping, the one needle-mover per active area, decisions owed), refresh the Owed and Track Status blocks, and re-run prioritize. Use once a week (or when planning the week) to keep every area moving together.
---

# /weekly-sync — the conductor

The coordinating ritual that keeps a multi-area system moving together. Run it weekly.

## Steps

1. **Read `strategy.md`** and the whole `work.md`.
2. **Write a one-page "state of things":**
   - **What moved** this week (pull from the Done log + recent commits).
   - **What's owed** — open human actions.
   - **What's slipping** — areas with no movement, or a task whose title has described a past state for too long.
   - **The one needle-mover per active area** for the coming week.
   - **Decisions owed** — anything waiting on the owner.
3. **Refresh the Track Status block** (`<!-- BEGIN TRACK STATUS -->…<!-- END TRACK STATUS -->`): every focus area with a health dot — 🟢 on track · 🟡 ready, waiting on the owner · 🔴 stalled or needs a new move — plus its one next step. The operating goal is to drive every area to 🟢; this is the management view that makes the gaps visible.
4. **Refresh the Owed block** and **re-run `/prioritize`** so the week starts ranked.
5. **Commit.**

## Rules

- **Surface conflicts.** If the task list contradicts `strategy.md`, say so — don't just reconcile silently.
- **Propose stars, don't set them.** If something deserves to become a ⭐ priority, recommend it; the owner confirms.
- **Honest status only.** 🔴 an area that's actually stalled rather than papering over it — the point is to make the activation gap visible.
