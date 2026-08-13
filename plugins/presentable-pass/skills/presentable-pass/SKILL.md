---
name: presentable-pass
description: Pre-share cleanup pass for a prototype app — add a standard footer/attribution block you supply, surface and fix before-launch issues (stale AI models, missing disclaimers, broken builds, leftover boilerplate, mobile polish), then branch and open a PR. Use when preparing a prototype to share with people, adding a site-wide footer/attribution, or doing a general "clean this up and make it presentable" pass. Assumes a web app (Next.js App Router by default) but adapt to the stack you find.
---

# Presentable pass — make an app presentable and shareable

A repeatable cleanup pass for a prototype before it goes out to real people. Two goals: (1) integrate a standard, site-wide **footer/attribution block that the user supplies**, and (2) find and fix the things that make a prototype look unfinished or fail to deploy. Adapt every code snippet to the app's real stack and design system — don't paste verbatim.

## Operating principles

- **Audit first, then act.** Read the app before changing it: layout/root component, pages, the AI/API routes, `package.json`, README, `/public`. Build a findings list before touching code.
- **Fix the clear wins yourself; bring the reviewer in only on real decisions** — outward-facing copy, disclaimers, anything legal/brand. One consolidated `AskUserQuestion` beats a stream of small ones.
- **Visual QA is a gate, not an afterthought.** Screenshot every changed surface at desktop and ~390px mobile and inspect it before declaring done. Use the **`screenshot` skill** in this same collection: start the dev server, then `node shot.mjs <url> <outPath> [width]` and look at the result yourself at both widths.
- **The build must pass.** Run the real production build (`next build` or equivalent) before committing — prototypes frequently have a build error nobody noticed. A broken default branch that can't deploy is the highest-priority find.
- **Branch, don't push to the default branch.** Create a branch, commit, push, open a PR so there's a preview deploy and a diff to review. Merge only when asked and after preview checks pass.

## The footer / attribution standard

A site-wide footer, consistent across the apps you ship. **The exact attribution copy, link, and studio/author name are supplied by the user** — parameterize them rather than hardcoding a specific studio. A typical footer carries:

- **Attribution:** a short "A `{Your Studio/Org}` project" line, where the org name is a link that opens in a new tab (`target="_blank" rel="noopener noreferrer"`). Ask the user for the exact wording and URL.
- **Copyright:** `© {currentYear} {App Name} · {Your Studio/Org}`.
- **Nav links** repeated from the header.
- **A disclaimer line when the app's domain warrants one** (health, finance, legal, etc.) — see below.

Match the app's own design tokens (fonts, border/background grays, accent color). Reference implementation for a Tailwind + Next.js App Router app (adapt colors, links, and attribution copy to the target and to what the user supplies):

```tsx
// src/components/footer.tsx
import Link from "next/link";

const links = [/* same routes as the header nav */];

// Supplied by the user — swap in the real org name and URL.
const ORG_NAME = "{Your Studio/Org}";
const ORG_URL = "https://example.com";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Optional domain disclaimer — include when the app gives advice */}
        <p className="text-xs leading-relaxed text-gray-500">
          {/* e.g. health: "… provides general educational information … not
          medical advice … consult a qualified professional." */}
        </p>
        <div className="mt-6 flex flex-col gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {links.map(({ href, label }) => (
              <Link key={href} href={href} className="text-sm text-gray-600 transition hover:text-gray-900">
                {label}
              </Link>
            ))}
          </nav>
          <div className="text-xs text-gray-500 sm:text-right">
            <p>
              A{" "}
              <a href={ORG_URL} target="_blank" rel="noopener noreferrer"
                 className="font-medium text-gray-700 underline decoration-gray-300 underline-offset-2 transition hover:text-indigo-600 hover:decoration-indigo-300">
                {ORG_NAME}
              </a>{" "}
              project
            </p>
            <p className="mt-1">
              {`© ${new Date().getFullYear()} {App Name} · ${ORG_NAME}`}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

Wire it into the root layout as a sibling of `<main>`, with the shell as a flex column and `main` as `flex-1` so the footer sits at the bottom on short pages:

```tsx
<body className="min-h-full flex flex-col …">
  <Nav />
  <main className="flex-1 flex flex-col">{children}</main>
  <Footer />
</body>
```

> JSX whitespace gotcha: `{year} Name` drops the space between an expression and adjacent text. Use a single template literal (`{`© ${year} Name`}`) so the space survives.

## Pre-share audit checklist

Walk these every time. Not all apply to every app.

1. **Footer** — present, with the user-supplied attribution (above). Usually the headline ask.
2. **Disclaimer** — if the app gives health/finance/legal/other regulated guidance, add a visible disclaimer (footer line, plus an inline notice at the point of interaction like a chat input). Prototypes often bury the guardrails in a hidden system prompt only. This is a user decision on wording/placement — ask.
3. **AI model currency** — if it calls an LLM, check for a deprecated/dated model id. For Claude models, **invoke the `claude-api` skill** and use the current model (don't guess an id from memory). Verify the migration is a clean swap (no removed params in play).
4. **API/route error handling** — model/backend calls wrapped so failures return a graceful response, not an unhandled throw.
5. **Build integrity** — run the production build. Common prototype breakers: OG-image (Satori) errors (`<div>` with >1 child needs explicit `display: flex`), missing Suspense boundaries, type errors. **A build that fails = an un-deployable default branch; flag it as the top finding.**
6. **Social/OG metadata** — `metadataBase` set so OG/share images resolve to absolute URLs; the OG image renders and its displayed URL matches the real deployment.
7. **Lint** — the build's lint step passes; fix pre-existing errors that would block CI (e.g. setState-in-effect → lazy state init).
8. **Boilerplate & drift** — remove leftover `create-next-app` assets (`next.svg`, `vercel.svg`, `window.svg`, `file.svg`, `globe.svg`) and unused scaffolding; fix stale README facts (framework version, live URL); de-duplicate data that's been copy-pasted across pages into one shared module (single source of truth).
9. **Responsive polish** — header nav shouldn't cram on mobile (collapse to a menu below `sm`); check every page at ~390px.

## Workflow

1. **Survey** the repo (structure, layout, pages, API routes, package.json, README, public). Get the dev server running; install deps if `node_modules` is missing.
2. **Audit** against the checklist; write up findings, separating "I'll just fix these" from "your call" (footer copy, disclaimers).
3. **Ask once** for the outward-facing decisions via a single `AskUserQuestion` — including the exact footer attribution copy, org name, and URL if not already supplied.
4. **Implement** — footer + layout wiring, then the fixes. Match the app's stack and design tokens.
5. **Visual QA** — screenshot each changed surface at desktop + 390px (via the `screenshot` skill), inspect, fix what's visibly wrong.
6. **Verify** — production build passes clean (type-check + lint + prerender).
7. **Ship** — branch (`cleanup-…`), commit with a clear message, push, open a PR summarizing findings + fixes and calling out anything that unblocks deploys. Merge only if asked, once preview checks pass.

## Notes

- End commit messages and PR bodies with the co-author / generated-with lines per the repo's git conventions.
- If the app isn't Next.js, keep the same footer content and checklist; translate the implementation to the actual framework.
- Leave genuinely out-of-scope observations (bigger refactors, feature gaps) as a short "didn't touch, worth considering" list rather than doing them unasked.
