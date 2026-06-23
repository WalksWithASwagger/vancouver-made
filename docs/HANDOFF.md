# Handoff — Vancouver Made / MADE ON

> 🥈🥈 **WON — double silver at BCIT Tech Collider 2026.** 2nd in the Devin Technical Hackathon
> (~100, $300) and 2nd in the Formme Design Challenge (~50; prize: 5 jerseys produced). The
> competition is over; submission/rehearsal items below are historical. See [`AWARDS.md`](AWARDS.md).

Last updated 2026-06-22. Where the work stands, so it's easy to pick up later. For the forward plan see [`ROADMAP.md`](ROADMAP.md).

> **Current state (2026-06-22): launch-ready.** Since this doc's "store + submission" notes below, the
> site was fully redesigned — 5 immersive per-direction kit worlds (`/kit/:slug`) incl. the Hogan's
> Alley memorial page, the bold **Nardwuar Tartan Canvas**, the Store / Receipts Engine / Hall of Fame
> / Awards / Why-It-Won surfaces, a Making-Of section, and a cleanup + polish pass (3D portal removed,
> `SafeImage`, a11y, em-dash sweep, image-weight trim). Epic #56 is closed. The launch polish +
> announcement drafts are done; the only open step is **KK publishing** the social posts. See [`ROADMAP.md`](ROADMAP.md) + [`ARCHITECTURE.md`](ARCHITECTURE.md).
> The sections below are the earlier store/tech-pack thread, kept as history.

> **Trunk is `main`, and it's live.** The submission is consolidated on `main` and auto-deploys
> to https://vancouver-made.vercel.app on every merge (PRs get preview deploys). Feature branches
> merge into `main`; there is no separate "active" build branch anymore.
> For per-track submission status, see [`SUBMISSION.md`](SUBMISSION.md). For deploy, [`DEPLOY.md`](DEPLOY.md).

## Done (this thread: the store + the submission)

- **The Store (`/store`) — live on `main`.** 25-product catalog (patches · stickers · prints ·
  jerseys · **lookbook**), built from KK's STARRED, logo-free art. Every flagship club now has a
  jersey: Nardwuar (home/complete), Number Five Orange (home/away/cover-charge/complete),
  Pump & Dump (Speculation City/pump/dump + crest), China Creek (home/away + crest). New
  **Lookbook** row (on-body / in-the-wild). Nardwuar pieces gated `blessing-pending`.
  Data `src/data/products.js`; page `src/components/Store.jsx`; images `public/store/`. PRs #33–#36.
- **Designathon hero = NARDWUAR FC "Deep Cut"** (red / Home Vancouver tartan) — *not* Pump & Dump.
  `SUBMISSION.md` Track 1 reconciled (PR #37). Imagery: `deliverables/nardwuar-presentation/`
  (18-image reel). Top-5 flat+lifestyle export set placed on KK's Desktop.

### Open (what's outstanding)

- **Nardwuar blessing** — homage ethics gate (`kits/NW-01`): now relevant — the design prize is
  **producing 5 jerseys**, so get Nardwuar's blessing before that production run (it moves past exhibition).
- **Store CTAs are placeholders** — no live checkout by design; data is Shopify-ready.
- **Homepage store strip + Generative Wall — live on `main`.** `ProductStrip` ("THE DROP") is wired
  into `App.jsx`; `GenerativeWall.jsx/.css` + `public/wall/` are committed and the `/wall` route is
  live. Both ship with the static build.

## Done (this thread: the tech pack)

The tech pack is a main deliverable. Built out and verified:

- **Sizing + materials research** is fully sourced in
  [`research/tech-pack-spec.md`](research/tech-pack-spec.md) — the single source of truth:
  size charts (jersey + shorts, garment + body, inch + cm, XS–3XL), grading, tolerances,
  BOM, decoration methods, finish feasibility, labels, construction, packaging, and a Formme
  pre-production checklist. Every number cited; estimates flagged `[confirm]`.
- **Silhouette decision = vary per kit.** Signature ¾ raglan; a clean sleeve where a kit needs
  an unbroken all-over print. Per-kit map:
  - MO-03 Public Dime → **long sleeve, set-in** (continuous banknote engraving)
  - MO-01 Made on Silence → **¾ raglan** (black-bloc, dope-dyed ground)
  - MO-09 Pump and Dump → **¾ raglan, boxy / blokecore**
- **Materials decision = sustainable-novel fibre**, reconciled with sublimation: ocean-bound
  recycled PET base (prints clean + tells the story), dope-dyed for dark grounds, ECONYL
  ghost-net as a tactile accent. "Material as message."
- **Code-drawn flats** ([`../src/components/KitFlat.jsx`](../src/components/KitFlat.jsx)) render
  long + ¾-raglan silhouettes (with raglan seam) per `kit.silhouette`; the back-number font
  auto-fits long denominations. Data in [`../src/data/heroKits.js`](../src/data/heroKits.js),
  surfaced in the unified gateway [`../src/components/KitGateway.jsx`](../src/components/KitGateway.jsx)
  (the flats crossfade into the real renders) and the highlight reel / Journey / TheMove.
- **Per-kit tech packs** ([`design/kits/`](design/kits/)) MO-01/03/09 each carry silhouette +
  material + Sizing + BOM.

Verified: `npm run build` clean; all three hero flats render their assigned silhouette; numbers fit.

## Open / next (pick up here)

- [ ] **Re-export the deliverable PDFs** — [`deliverables/`](deliverables/) (`MADEON_techpack.pdf`,
  board, deck) are hand-authored and now lag the spec + flats.
- [ ] **Other 6 MADE ON kits** have no flats/packs yet (the 3 heroes are fully resolved by design).
- [ ] **Parked material options** (not chosen, kept in research): thermochromic reveal, premium
  engineered 3D-knit (Macron / Nike Aero-FIT), metallic gold. Revisit if elevating a hero kit.
- [ ] **Formme `[confirm]` list** — spec §10: strike-off, fibre sourcing, fluorescent-ink channel,
  metallic/gloss feasibility, raglan POMs on their block.
- [x] **Consolidated on `main`** and shipping via Vercel auto-deploy.

## Broader build context

`main` holds the full submission: the live pitch site, the Receipts Engine (`/engine`), the
Process page (`/process`), the Hall of Fame (`/hall-of-fame`), the Midjourney generations + asset
tracker, and the submission deck. See `git log` and [`SUBMISSION.md`](SUBMISSION.md).

## Run / verify

`npm run dev` → open `/` → scroll to "THE RECEIPTS, WORN" for the kit gateway (flats that crossfade into the real kits). Source of truth for
all specs: [`research/tech-pack-spec.md`](research/tech-pack-spec.md).
