# motion-options — don't ship the first animation you code

Motion is a first-class design surface — loading screens, transitions,
reveals, hover/press states. The failure mode is always the same: the first
idea you code is the one that ships. This skill turns "make the loading
animation better" into a reviewed design decision.

## What it does

1. **Diagnoses first** — screenshots the current animation (desktop + ~390px
   mobile) and names *why* it's weak before proposing anything.
2. **Builds 3–4 genuinely distinct directions** — different concepts, not one
   idea tuned four ways — each polished, each on the app's own design tokens.
3. **Puts them on one live preview page** so they can be compared side by
   side, animating at once, with a way to open each full screen.
4. **Screenshots and reviews every option itself**, kills the weak ones, and
   gives a recommendation with reasons.
5. **You pick** (one question, not a stream of them), then it wires the winner
   into the real component and tears the preview harness down.

The bar is "feels alive and on-brand," not "moves" — it prefers motion that
carries meaning (a mark completing itself, content settling into place) over
generic spinners.

Pairs with `review-animations` (the craft-bar enforcement on the diff) and
`animation-vocabulary` (naming the effect you want).

Provided **as-is**, MIT.
