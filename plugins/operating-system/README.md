# operating-system — an open, forkable operating system

Most productivity tools want you to move your whole life inside them. This is the opposite. The source of truth is **plain text you own** (in a git repo), agents keep it current on a rhythm, and any surface just **renders** it. You own the mind; the app renders it.

This is the pattern we run our own studio and lives on, extracted into a starter you can fork and make yours. It's the ground-level version of ["the era of agentic operations"](https://github.com/Madrona-Product-Studio/madrona-open): a business (or a life) running on one source of truth and a handful of agents on a rhythm, with a person firmly in charge.

## The three parts

1. **The substrate** (`template/`) — two files you own:
   - `strategy.md` — the **decision layer**: how to rank, what to push, what to protect. Durable judgment.
   - `work.md` — the **live state**: your focus areas and tasks, with a few **machine-maintained blocks** at the top (Priorities, Owed, Track Status) written between sentinel comments.
   - `RENDER-CONTRACT.md` — how any surface should render the generated blocks (render once as the hero, never re-rank, exclude from normal parsing).

2. **The routines** (`skills/`) — agents that read and write the substrate on a rhythm:
   - `capture` — say something once; it files itself into the right section.
   - `prioritize` — rank the starred tasks by `strategy.md` and write the Priorities block.
   - `daily-brief` — the morning pipeline: ingest what changed, re-prioritize, produce one decision surface.
   - `weekly-sync` — the conductor: what moved, what's owed, what's slipping; refresh Owed + Track Status.

3. **A surface** (bring your own) — anything that renders `work.md`: a web app, a terminal, a homescreen widget. The render contract keeps every surface honest, because none of them own the logic.

## The core conventions

- **The ⭐ convention.** A task becomes a priority by earning a `⭐` on the task itself, in its own section. There is no separate "top priorities" list to hand-maintain — the ranked blend is *generated* from the ⭐ tasks by `prioritize`.
- **Generated blocks are machine-maintained.** The regions between `<!-- BEGIN X -->` and `<!-- END X -->` are written by routines, never by hand. Surfaces render them once and exclude them from normal parsing.
- **Plain text, diffable, yours.** No database, no lock-in. Every routine reads and writes plain markdown through git commits.

## Get started

1. Copy `template/strategy.md` and `template/work.md` into a new git repo of your own.
2. Fill in your North Star, focus areas, and a few tasks; star (`⭐`) the ones that matter most.
3. Install this plugin and run `/prioritize` to generate your ranked block, then `/daily-brief` each morning.
4. Point any surface you like at `work.md` following `RENDER-CONTRACT.md`.

Provided **as-is**, MIT. Make it yours — the whole point is that you own it.
