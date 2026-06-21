# Roadmap — finishing MADE ON

**Status: 🥈🥈 won, now we make it great.** The competition is over (double silver — see
[`AWARDS.md`](AWARDS.md)). This is the workplan to take the project from "winning submission" to a
**polished, portfolio-grade showcase** — and to hand off the **5 jerseys Formme will produce**.

The full task backlog lives in GitHub Issues; the redesign is tracked by **epic
[#56](https://github.com/WalksWithASwagger/vancouver-made/issues/56)**. This doc is the map.

## The finish line

1. **Every design direction is its own "world"** — an immersive landing page (the Nardwuar flagship
   `/kit/nardwuar-fc` is the template; the rest follow).
2. **One cohesive brand** — the red/green Vancouver tartan as an iconic thread, site-wide.
3. **Premium surfaces** — the store and the Receipts Engine feel high-end, not limp.
4. **Production handoff** — the final Nardwuar design locked and Formme-ready; Nardwuar's blessing secured.

## Phases

### ✅ Now / stabilize (this consolidation pass)
- Flagship `/kit/nardwuar-fc` + the Clubs dark-on-dark fix live in prod.
- "Why It Wins" out of the main nav.
- Docs perfected (routes, status, architecture) — closes #40.
- Awards page + og:image / social cards shipped (#42).

### Phase 1 — Brand & foundations
The groundwork the rest builds on.
- **#67** Lock the final red/green tartan + apply it site-wide (behind the cream, as accent bands).
- **#57** Generalize the `DirectionPage` scaffold from the Nardwuar flagship (manifest model + staging script).
- **#63** Clubs "HOW A KIT BECOMES A RECEIPT" — full redesign into the gateway grid into the direction pages.
- **#53** Visual QA sweep of the Tartan Paper redesign (all surfaces + mobile).

### Phase 2 — The direction worlds (epic #56)
One immersive page per direction, off the template.
- **#58** Pump & Dump FC · **#59** China Creek + Number Five Orange · **#60** Hogan's Alley.
- **#62** Hero Kits "THE RECEIPTS, WORN" → rethink as a gateway into the kit pages.

### Phase 3 — Surface polish
- **#64** Store + "THE DROP" strip — high-end grid/product/UX, interactions, motion.
- **#65** /engine (Receipts Engine) — UI/UX overhaul.
- **#66** "Why It Wins" → footer + redesign with graphics/moodboards.

### Phase 4 — Production (the prize)
The 5-jersey Formme run.
- **#26** Lock the final Nardwuar "Deep Cut" design — polished final flats, 3D hero, tech pack.
- **Nardwuar's blessing** before the production run (homage ethics gate, `design/kits/NW-01-nardwuar-vancouver.md`).
- Consolidate the tech-pack `[confirm]`s (strike-off, fibre, ink channels, metallic/gloss, raglan POMs) — `research/tech-pack-spec.md`.

### Tech-debt lane (parallel, any time)
- **#43** inline hexes → Tailwind tokens · **#46** a11y/responsive nits · **#45** stale comments / unused tokens.
- **#39** retire the 3D portal (`src/scene/`) + R3F deps · **#41** decide how `public/wall` (53M) ships · **#44** shared broken-image fallback.
- **#28** em-dash sweep of page copy · **#40** docs reconcile (✅ this pass).

## How to pick up work
See [`HANDOFF.md`](HANDOFF.md) for the live pickup state and [`ARCHITECTURE.md`](ARCHITECTURE.md) for
the site map + data flow. Issues labelled `design`/`epic` are the redesign; `cleanup`/`bug` are the
tech-debt lane.
