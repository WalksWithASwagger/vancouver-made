# Roadmap — finishing MADE ON

**Status: 🥈🥈 won, now we make it great.** The competition is over (double silver — see
[`AWARDS.md`](AWARDS.md)). This is the workplan to take the project from "winning submission" to a
**polished, portfolio-grade showcase** — and to hand off the **5 jerseys Formme will produce**.

The full task backlog lives in GitHub Issues; the redesign is tracked by **epic
[#56](https://github.com/WalksWithASwagger/vancouver-made/issues/56)**. This doc is the map.

## ✅ Done — the redesign + cleanup shipped

The whole redesign and tech-debt backlog is **merged and live in prod**:

- **Brand & foundations** — locked the red/green tartan (#67); generalized the `DirectionPage`
  scaffold + `getDirection` registry (#57); Clubs gateway grid (#63); visual QA (#53).
- **The direction worlds (epic #56)** — 4 immersive `/kit/:slug` pages live: Nardwuar (flagship),
  Pump & Dump (#58), China Creek + Number Five Orange (#59); Hero Kits gateway (#62). **Hogan's Alley
  FC (#60) back-burnered** — the club concept needs more development (the place/thesis stays).
- **Surface polish** — Store + QuickLook (#64), Receipts Engine overhaul (#65), "Why It Wins" → the
  `/why` page + a real shared `Footer` (#66).
- **Tech-debt** — retired the 3D portal + R3F (#39); `SafeImage` fallback (#44) + a11y pass (#46);
  hex→tokens (#43); stale comments/tokens (#45); em-dash sweep (#28); docs reconcile (#40).
- **The bold Nardwuar Tartan Canvas (#75)** — red tartan ground, content on cream sheets, site-wide.
- The public **`/wall`** refreshed (#41 content); the **Making Of** per-concept pages added.

## The finish line — launch: polish + announce

The site is live on Vercel; the remaining goal is to get it **out into the world**:

1. **Polish pass** — full desktop+mobile QA now that the canvas landed → punch list → fix. Resolve the
   **#75 sign-off knobs** (canvas red heat `#a82828` · ink-veil `0.12` · keep/retire the faint
   `body::after`). Proofread the copy + receipts.
2. **Share-ready** — verify the OG/social cards; decide a **custom domain** (vs `vancouver-made.vercel.app`);
   a quick perf pass (the 53 MB `/wall` lazy-loads).
3. **Press / social announcement** — the launch story (the double-silver win + the protest thesis),
   drafted in KK's voice. **Draft-only; KK approves before anything is published.**

## Parked (KK-led, not this launch)
- **#26 — the 5-jersey Formmé production run**: lock the final Nardwuar "Deep Cut" flats + tech pack,
  consolidate the tech-pack `[confirm]`s, and secure **Nardwuar's blessing** (the homage ethics gate)
  before manufacturing. See `design/kits/NW-01-nardwuar-vancouver.md`, `research/tech-pack-spec.md`.
- **Store commerce** — wiring real Shopify checkout (the data is Shopify-ready).
- **Hogan's Alley FC (#60)** — revisit if the club concept gets developed.

## How to pick up work
See [`HANDOFF.md`](HANDOFF.md) for the live pickup state and [`ARCHITECTURE.md`](ARCHITECTURE.md) for
the site map + data flow. Open issues are down to **#26** (production) and **#56** (the worlds epic,
effectively done).
