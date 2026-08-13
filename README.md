# Madrona Open

Open tools from [Madrona Product Studio](https://github.com/Madrona-Product-Studio) — reusable [Claude Code](https://code.claude.com) skills for building and shipping polished product.

These are things we build and use every day. We share them because that's what being part of the community is. The belief behind them is simple: **the machine is the artifact.** When you get good at something, the leverage isn't the one output — it's the reusable system that produces good outputs every time. This is a few of ours.

Community-maintained, provided **as-is**, no support SLA. MIT licensed.

## Install

This repo is a Claude Code **plugin marketplace**. Add it once, then install any tool:

```
/plugin marketplace add Madrona-Product-Studio/madrona-open
/plugin install motion-options@madrona-open
```

## The flagship: an open operating system

**[operating-system](plugins/operating-system)** is the engine we run our own studio and lives on, extracted into a starter you can fork. Most productivity tools want you to move your life inside them; this is the opposite. The source of truth is **plain text you own** (a decision layer + a live work file with machine-maintained blocks), agents keep it current on a rhythm (`capture`, `prioritize`, `daily-brief`, `weekly-sync`), and any surface just **renders** it. You own the mind; the app renders it. It's the ground-level version of "the era of agentic operations."

```
/plugin marketplace add Madrona-Product-Studio/madrona-open
/plugin install operating-system@madrona-open
```

## The craft catalog

| Tool | What it does | When to use it |
|---|---|---|
| **[animation-vocabulary](plugins/animation-vocabulary)** | Turns a vague description of a motion effect into its exact term. | "What's it called when a popover grows out of the button?" → *Origin-aware animation.* Name the effect so you can prompt for it. |
| **[motion-options](plugins/motion-options)** | Builds 3–4 genuinely distinct motion directions, puts them on one live side-by-side preview, screenshots and reviews them, lets you pick, wires the winner in, and tears the harness down. | Building or reworking a loading screen, transition, reveal, or hover/press state — when you don't want to ship the first idea you coded. |
| **[og-image](plugins/og-image)** | Designs and wires great Open Graph / social-share images following a "simple is best" doctrine (one idea, brand color, bold mark), with a template and per-stack wiring. | Fixing blank or ugly link previews, or giving an app a first impression that holds up in a feed. |
| **[screenshot](plugins/screenshot)** | A tiny Playwright screenshotter for visual QA — full-page or by CSS selector, retina-aware, auto-capped so captures stay under AI image-size limits. | Any visual-QA loop: render a page or component and actually look at it, at desktop and mobile widths. |
| **[investor-ready](plugins/investor-ready)** | Audits and fixes an app so a first-time outsider immediately gets what it is and sees the core value — first-run messaging, a demo wow-path, credibility polish, plus scripts for OG images, icons, and a production audit. | Making an app "demo ready" or presentable to an investor, beta user, or the press. |
| **[gtm-sweep](plugins/gtm-sweep)** | Takes an app to market as a repeatable, measured sweep: positioning, a measurement floor, SEO expansion, channel launch, and a post-launch read/iterate loop. | Planning a launch or growing traffic/users, and wanting it measured instead of ad-hoc. |
| **[presentable-pass](plugins/presentable-pass)** | Pre-share cleanup pass for a web app: footer/attribution, stale AI model names, disclaimers, broken builds, boilerplate, mobile polish — then branches and opens a PR. | Getting a prototype clean enough to share with people. |
| **[review-animations](plugins/review-animations)** | Reviews motion code against a high craft bar (frequency, easing, duration, physicality, reduced-motion) and returns a findings table plus a Block/Approve verdict. | Before shipping any animation, when you want the craft bar enforced, not assumed. |

## Why these

They're a set. `motion-options` and `animation-vocabulary` are how we treat motion as a reviewed design decision instead of an afterthought. `og-image` is the first impression. `screenshot` is the primitive the others lean on — the discipline of *looking at the rendered thing yourself* before calling it done.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Issues and PRs welcome, best-effort.

## License

[MIT](LICENSE) © Madrona Product Studio.
