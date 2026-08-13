# Contributing

These are tools we build and use at Madrona Product Studio, shared in case they're useful to you. Community-maintained, best-effort, no support SLA.

- **Issues and PRs are welcome** — bug reports, fixes, and new skills. We respond when we can.
- **New skills** go under `plugins/<name>/` as a self-contained plugin: a `.claude-plugin/plugin.json` manifest plus `skills/<name>/SKILL.md` (and any `tools/` or `templates/`). Keep the `SKILL.md` `description` concrete about *what it does and when to use it* — that's what triggers it.
- **Keep it generic.** No personal paths, tokens, private references, or client-specific content.
- Then add your plugin to `.claude-plugin/marketplace.json`.

By contributing you agree your contribution is licensed under the repository's MIT license.
