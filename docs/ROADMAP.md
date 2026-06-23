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
- **The direction worlds (epic #56, closed)** — all 5 immersive `/kit/:slug` pages live: Nardwuar
  (flagship), Pump & Dump (#58), China Creek + Number Five Orange (#59), Hogan's Alley (#60). The
  Clubs + Hero Kits gateways (#62/#63) have since been merged into one unified `KitGateway` — all seven
  concepts in a single grid, each a code-drawn flat that crossfades into the real kit, then links out.
- **Surface polish** — Store + QuickLook (#64), Receipts Engine overhaul (#65), "Why It Wins" → the
  `/why` page + a real shared `Footer` (#66).
- **Tech-debt** — retired the 3D portal + R3F (#39); `SafeImage` fallback (#44) + a11y pass (#46);
  hex→tokens (#43); stale comments/tokens (#45); em-dash sweep (#28); docs reconcile (#40).
- **The bold Nardwuar Tartan Canvas (#75)** — red tartan ground, content on cream sheets, site-wide.
- The public **`/wall`** refreshed (#41 content); the **Making Of** per-concept pages added.

## The finish line — launch (✅ polished; awaiting KK's "post")

The site is **launch-ready** on `vancouver-made.vercel.app`. The polish + announce pass is done:

1. ✅ **Polish pass** — full QA of the canvas across every route; `/making-of` brought onto the canvas;
   filter-pill tap targets; copy proofread. The **#75 knobs** were signed off at their defaults (red
   `#a82828` · ink-veil `0.12` · faint `body::after` kept).
2. ✅ **Share-ready** — the OG / social card is on-brand and the meta is clean; perf is solid (every
   heavy route is `React.lazy`). Staying on `vancouver-made.vercel.app` (no custom domain). Optional
   future win: recompress the ~1.4 MB hero carousel JPGs.
3. ✅ **Announcement drafts** — in KK's voice, draft-only: LinkedIn + Instagram + Threads
   (`social/captions.md`, staged in Buffer) and X/Twitter + Bluesky + a long-form newsletter/blog
   (`social/launch-drafts.md`).

**The one remaining step is human: KK publishes.** Nothing posts without his go-ahead. Known follow-up
for the social/MakingOf lane: the `/making-of` concept-card cover images render blank (an `index.json`
content/staging matter, not styling).

## Parked (KK-led, not this launch)
- **#26 — the 5-jersey Formmé production run**: lock the final Nardwuar "Deep Cut" flats + tech pack,
  consolidate the tech-pack `[confirm]`s, and secure **Nardwuar's blessing** (the homage ethics gate)
  before manufacturing. See `design/kits/NW-01-nardwuar-vancouver.md`, `research/tech-pack-spec.md`.
- **Store commerce** — wiring real Shopify checkout (the data is Shopify-ready).

## How to pick up work
See [`HANDOFF.md`](HANDOFF.md) for the live pickup state and [`ARCHITECTURE.md`](ARCHITECTURE.md) for
the site map + data flow. Open issues are down to **#26** (production) and **#56** (the worlds epic,
effectively done).
