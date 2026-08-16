# presentable-pass — make a prototype safe to share

The gap between "works on my machine" and "I'd send this link to someone I
respect" is a specific, recurring checklist. This skill runs it as one pass
and opens a PR with the result.

## What it sweeps

- **Attribution/footer** — a consistent site footer so the app says who made
  it.
- **Stale AI model names** — prototypes pin whatever model existed the week
  they were built; this flags and updates them.
- **Missing disclaimers** — AI-generated content, health/finance caveats,
  demo-data notices, wherever the app's domain needs one.
- **Broken builds and boilerplate** — leftover template copy, default
  favicons, lorem ipsum, console errors on load.
- **Mobile polish** — the ~390px pass most prototypes never got.

## How it works

Audit first, then fixes on a branch with a PR — never straight to main. It
assumes a modern web app (Next.js App Router by default) but adapts to the
stack it finds.

This is the "clean it up before humans see it" sibling of `investor-ready`
(which goes further: messaging, wow-path, credibility, narrative). Run this
one when the ask is "make it presentable"; run that one when the ask is
"make it land."

Provided **as-is**, MIT.
