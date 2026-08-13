---
name: motion-options
description: Explore and ship animation/motion as a reviewed design decision — build several distinct, polished options, put them on one live side-by-side preview page, screenshot and inspect them, let the user pick, then wire the winner into the real component and tear down the harness. Use when building or reworking a loading screen, transition, reveal, hover/press state, or any animation, or when asked to "make the motion better", "show animation options", or "make this feel more alive".
---

# /motion-options — show motion options, then ship the winner

Motion is a first-class design surface. The failure mode is shipping the first idea you code. This skill is the repeatable process that turns "make the loading animation better" into a reviewed decision: build a few distinct directions, compare them live side by side, pick with the user, wire the winner in, remove the scaffolding.

Assumes a web app (Next.js App Router by default) but adapt every snippet to the app's real stack, design system, and gate.

## Operating principles

- **Diagnose before you design.** Screenshot the current animation first (desktop + ~390px mobile) and name *why* it's weak — misaligned, faint, generic spinner, no meaning, janky. That critique drives the options.
- **Distinct directions, not tuned variants.** Build **3–4 genuinely different concepts**, each polished, each on the app's design tokens (colors, fonts, radii, motion feel). One tuned idea shown four ways is not options.
- **Meaning over movement.** Prefer motion that carries the product's idea — a brand mark completing itself, scattered things settling into order, content focusing in — over a generic spinner. The bar is "feels alive and on-brand," not "moves."
- **One page, side by side, live.** The whole point is comparison. Put every option on a single preview page animating at once, plus a way to open each full screen.
- **Visual QA is a gate.** Screenshot every option at desktop and ~390px mobile and inspect them yourself. Static frames must read as intentional; describe the motion in words since a screenshot only catches one frame. (The `screenshot` skill in this collection is a handy way to capture.)
- **The user picks the direction.** Kill the weak options yourself, give a recommendation with reasons, then bring the user in with **one** `AskUserQuestion` to choose. Don't stream small questions.
- **Leave no scaffolding.** The preview route, variant components, and any gate exception are temporary. Mark them "delete before ship" and remove them once the winner is wired in.

## The process

### 1. Diagnose the current state
Find the component, read it, and start the dev server. Screenshot the current animation at 1280×800 and 390×800. Write down the concrete problems — this is what the options have to beat.

### 2. Build a temporary preview harness
Two files plus (if needed) a one-line gate exception.

**Variants file** — one component per direction, all on the design system. Make each shell positionable so it works both full screen and inside a gallery tile:

```tsx
// src/components/motion-variants.tsx  — TEMP, delete before ship.
"use client";

function Shell({ children, framed = false }: { children: React.ReactNode; framed?: boolean }) {
  return (
    <div className={`${framed ? "absolute inset-0 rounded-[inherit]" : "fixed inset-0 z-50"} flex flex-col items-center justify-center px-6`}
         style={{ background: "#faf8f4" /* app ground */ }}>
      {children}
    </div>
  );
}

export function VariantA({ framed }: { framed?: boolean }) {
  return (
    <Shell framed={framed}>
      <style>{`/* keyframes scoped to this variant's classes */`}</style>
      {/* ...the animation... */}
    </Shell>
  );
}
// VariantB, VariantC, VariantD...

export const VARIANTS = {
  a: { label: "A · <concept>", Comp: VariantA },
  b: { label: "B · <concept>", Comp: VariantB },
  // ...
} as const;
```

**Preview page** — gallery by default, full screen per option with `?v=`:

```tsx
// src/app/motion-preview/page.tsx  — TEMP, delete before ship.
"use client";
import { use } from "react";
import { VARIANTS } from "@/components/motion-variants";

export default function MotionPreview({ searchParams }: { searchParams: Promise<{ v?: string }> }) {
  const { v } = use(searchParams);
  const single = v && v in VARIANTS ? VARIANTS[v as keyof typeof VARIANTS] : null;
  if (single) { const C = single.Comp; return <C />; }

  return (
    <div className="min-h-screen bg-zinc-100 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        <h1 className="font-serif text-2xl">Motion — options</h1>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {Object.entries(VARIANTS).map(([key, { label, Comp }]) => (
            <a key={key} href={`/motion-preview?v=${key}`} className="group block">
              <div className="mb-2 text-[13px] font-medium text-zinc-700">{label}</div>
              <div className="relative h-[420px] overflow-hidden rounded-2xl border border-zinc-200">
                <Comp framed />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Gate exception** — if the app gates private routes, open the preview locally (mark temp):

```ts
// e.g. in proxy.ts / middleware — TEMP, delete before ship.
if (pathname === "/motion-preview") return NextResponse.next();
```

### 3. Screenshot and self-review
Start the dev server, hit each URL, and screenshot the gallery plus each option at desktop and mobile (using the `screenshot` skill or your own tool):

```
node shot.mjs http://localhost:3000/motion-preview /tmp/motion/gallery.png 1200 1100
node shot.mjs "http://localhost:3000/motion-preview?v=a" /tmp/motion/a-desktop.png 1280 800
node shot.mjs "http://localhost:3000/motion-preview?v=a" /tmp/motion/a-mobile.png 390 800
```

Inspect them. Confirm each centers correctly at both widths (a common failure is a graphic that's fine on desktop but jams to one edge on mobile). Kill weak options. Note that a still catches one animation frame — for the review, describe the motion in words and consider looping the draw in the gallery so it's visible.

### 4. Let the user pick
Present the screenshots, a one-line read on each, and a recommendation. Then one `AskUserQuestion` with the distinct directions as options, recommended one first.

### 5. Wire the winner in, tear the harness down
- Move the chosen animation into the **real component**; promote its inline `<style>` keyframes into the project's global stylesheet.
- Add `@media (prefers-reduced-motion: reduce)` handling — no motion, but the end state shown (e.g. a self-drawing mark rendered fully drawn).
- For a one-shot draw that may show on long loads, let it **complete and hold**, and carry "still working" with a subtle loop (breath, hairline shimmer) rather than re-drawing on a hard reset (which flickers).
- Verify the real component (not just the preview) with a screenshot at both widths.
- **Delete** the variants file, the preview page, and the gate exception. Grep for any leftover class names from the old animation and remove them.

## Reduced-motion is not optional
Every shipped animation needs a `prefers-reduced-motion: reduce` branch that stops motion and shows a sensible static end state. Check it's present before declaring done.

## Notes
- Keep temp preview components free of server/client-nondeterministic values (`Math.random()`, and even `Math.cos/sin`-computed coordinates can trip a floating-point hydration mismatch in dev). It's harmless in a throwaway harness but avoid it in the shipped component.
- This skill is the machinery; the always-on principle is the same discipline as visual QA, applied to motion: don't ship the first idea, and look at every option yourself before choosing.
