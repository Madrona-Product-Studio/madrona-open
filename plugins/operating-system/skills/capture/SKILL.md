---
name: capture
description: File a captured thought, task, idea, or buy-item into the right section of work.md and commit — the "say it once and it lands where it belongs" routine. Use when the owner dumps a quick note, a to-do, something to buy, or an idea, and it needs to be routed to the correct focus-area section without them filing it by hand.
---

# /capture — file a thought where it belongs

Route a raw capture into the right place in `work.md`, so nothing lives in someone's head or a sticky note.

## Steps

1. **Read the section headings** of `work.md` (the focus areas, the buy list, the done log).
2. **Classify the capture:**
   - A task for a focus area → append `- [ ] <task>` under that area's section.
   - Something to buy or pick up → append under the buy list (`## To Get 🛒`).
   - An idea/reference worth keeping → append under the relevant area (or an Ideas section if one exists).
3. **Write it title-first** — a short bold-able lead, then any detail: `<short what> — <detail>`. Keep it scannable.
4. **Don't star it.** Capture never adds a `⭐` — starring is the owner's call.
5. **Pull, append, commit, push** — keep the write small and append-only so it never clobbers a concurrent edit. Use a descriptive commit message, not "update."

## Notes

- If the right section is genuinely ambiguous, pick the best fit and say which — don't drop it.
- This is the write side of the render contract: append-only, let `/prioritize` do the ranking.
