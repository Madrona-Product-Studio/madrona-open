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

## The catalog

| Tool | What it does | When to use it |
|---|---|---|
| **[animation-vocabulary](plugins/animation-vocabulary)** | Turns a vague description of a motion effect into its exact term. | "What's it called when a popover grows out of the button?" → *Origin-aware animation.* Name the effect so you can prompt for it. |
| **[motion-options](plugins/motion-options)** | Builds 3–4 genuinely distinct motion directions, puts them on one live side-by-side preview, screenshots and reviews them, lets you pick, wires the winner in, and tears the harness down. | Building or reworking a loading screen, transition, reveal, or hover/press state — when you don't want to ship the first idea you coded. |
| **[og-image](plugins/og-image)** | Designs and wires great Open Graph / social-share images following a "simple is best" doctrine (one idea, brand color, bold mark), with a template and per-stack wiring. | Fixing blank or ugly link previews, or giving an app a first impression that holds up in a feed. |
| **[screenshot](plugins/screenshot)** | A tiny Playwright screenshotter for visual QA — full-page or by CSS selector, retina-aware, auto-capped so captures stay under AI image-size limits. | Any visual-QA loop: render a page or component and actually look at it, at desktop and mobile widths. |

## Why these

They're a set. `motion-options` and `animation-vocabulary` are how we treat motion as a reviewed design decision instead of an afterthought. `og-image` is the first impression. `screenshot` is the primitive the others lean on — the discipline of *looking at the rendered thing yourself* before calling it done.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Issues and PRs welcome, best-effort.

## License

[MIT](LICENSE) © Madrona Product Studio.
