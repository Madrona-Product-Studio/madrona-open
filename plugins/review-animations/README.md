# review-animations — a senior motion reviewer with a brutal eye

A specialized review skill that does one thing: measure animation and motion
code against a high craft bar and return a findings table plus a
**Block/Approve verdict**. It does not write features or review non-motion
code.

## What it enforces

Ten non-negotiable standards, including:

- **Justified motion** — every animation must answer "why does this animate?"
  "It looks cool" on a frequently-seen element is a block.
- **Frequency-appropriate** — actions performed 100+ times a day get *no*
  animation; delight is reserved for rare and first-time moments.
- **Responsive easing** — `ease-in` on UI entrances is a block; built-in CSS
  easings are usually too weak.
- **Physicality** — right transform origin, no comes-from-nowhere entrances,
  GPU-friendly properties only, springs configured to settle.
- **Reduced-motion** — movement without a `prefers-reduced-motion` path is a
  finding, not a footnote.

The craft values draw on Emil Kowalski's animation philosophy
([animations.dev](https://animations.dev/)); the review method — escalation
triggers, a remedial hierarchy, tiered output, explicit approval criteria —
is adapted from aggressive code-quality review.

Use it on any diff touching CSS transitions, keyframes, springs, Framer
Motion, or gesture code. Pairs with `motion-options` (for building the motion
in the first place).

Provided **as-is**, MIT.
