---
name: prioritize
description: Generate a blended, ranked priorities list from all the ⭐ starred tasks in work.md, weighed by the judgment in strategy.md, and write it back into the generated PRIORITIES block. Use when planning — when the owner sits down to decide what to work on, or after tasks or stars have changed. No API needed; the ranking is this session's judgment applied to strategy.md.
---

# /prioritize — rank the starred tasks

Produce the single ranked list the surfaces render as the hero, from the ⭐ tasks in `work.md`, using `strategy.md` as the rubric.

## Steps

1. **Read `strategy.md` first.** The North Star, focus-area weights, and decision heuristics are the rubric. If it contradicts a task, note the conflict.
2. **Collect every `- [ ] ⭐` task** across all focus-area sections of `work.md`. Only real starred tasks — nothing else.
3. **Refresh stale titles at the source first.** If a task's title describes a past state ("Round 2 done"), rewrite it in its section to the current action ("await Round 2 outcome"), then rank that. Title = the move now; detail = the history.
4. **Rank** by urgency × impact × momentum per `strategy.md`, protecting the floor area.
5. **Write the block** between the exact sentinels, replacing whatever was there:

```
<!-- BEGIN GENERATED PRIORITIES — produced by /prioritize, do not hand-edit -->
## ⭐ Priorities — ranked YYYY-MM-DD
1. <task title verbatim> — _<focus area> · <one-line why it ranks here>_
2. ...
**Floor (always):** <the protected-area items>
<!-- END GENERATED PRIORITIES -->
```

6. **Commit** with a clear message.

## Rules (load-bearing)

- **Rank ⭐ tasks only.** Never insert an item that isn't a real starred task. If something non-starred deserves the top, *propose the star* in your report and let the owner confirm — don't add it yourself.
- **Each ranked line opens with its source task's title verbatim** (at least the first several words), so a surface can text-match the ranked row back to the real task. A paraphrase silently loses the match.
- **Don't invent urgency.** If you can't verify something is time-sensitive, don't rank it as if it is.
