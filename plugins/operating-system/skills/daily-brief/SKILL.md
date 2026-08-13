---
name: daily-brief
description: The morning pipeline — ingest what changed since yesterday, sweep for anything new that matters, re-rank, and compose ONE decision surface for the day (what changed, what to decide, today's ranked focus, what's owed). Use each morning, or when the owner wants a single "here's your day" read instead of scanning everything.
---

# /daily-brief — one decision surface for the day

Run the whole morning loop and produce a single, scannable brief. The goal is that the day starts *briefed*, not chased.

## Steps

1. **Read `strategy.md`** for how to weigh things today (respect any dated constraints).
2. **Ingest what changed** since the last run — new inputs from wherever they land (captures, messages, calendar, any connected source). Note responses owed, things that arrived, anything gone stale.
3. **Update the file:** file new items into their sections (like `/capture`), and refresh stale task titles to the current action.
4. **Re-rank:** run the `/prioritize` logic so the Priorities block reflects today.
5. **Refresh the Owed block** (`<!-- BEGIN OWED -->…<!-- END OWED -->`) with the open human actions teed up.
6. **Compose one brief** for the owner:
   - **What changed** overnight (short).
   - **To decide** — anything that needs a yes/no or a pick (present as a numbered slate with a recommendation each, so the reply can be "1 go, 2 pass").
   - **Today's focus** — the top few ranked items, with the one-line why.
   - **Owed** — what to send/do, each as its own line.
7. **Commit** the file changes.

## Rules

- **One surface, not a stream.** Batch decisions into one slate; don't drip small questions.
- **Never fabricate status.** If you can't verify something happened, say so.
- **The owner acts.** The brief prepares and tees up; sending, signing, and deciding stay human.
