# Knowledge Base · VANCOUVER MADE

Central registry for project research. Eight source docs are in (Perplexity,
ChatGPT, Claude, plus the owner-authored board / deck / tech pack). Each was
imported **verbatim** into `sources/`, then **parsed** into a matching analysis in
`analysis/`. With all of them in, the **synthesis** reconciles them and drives the
build.

## Source registry

| # | Source | File | Status | Analysis |
|---|--------|------|--------|----------|
| 01 | **Perplexity**: "Master Concept & Precedent" | `sources/01-master-concept-precedent.md` | ✅ Imported | `analysis/01-master-doc-analysis.md` |
| 02 | **ChatGPT / OpenAI**: "ALLEY LEAGUE" | `sources/02-chatgpt-alley-league.md` | ✅ Imported | `analysis/02-chatgpt-alley-league-analysis.md` |
| 03 | **Claude**: "Subversive Soccer Kits (Visual Reference Library)" | `sources/03-claude-visual-reference-library.md` | ✅ Imported | `analysis/03-claude-visual-reference-library-analysis.md` |
| 04 | **Perplexity (2nd)**: three-concept build-out (No.5 · Nardwuar · Pump & Dump) | `sources/04-perplexity-three-concepts-buildout.md` | ✅ Imported | folded into `src/data/clubs.js` + `docs/design/clubs/` |
| 05 | **MADE ON Board** (Kris Krüg) | `sources/05-made-on-board.md` (binary: `docs/deliverables/MADEON_board.pdf`) | ✅ Imported | `analysis/04-made-on-consolidation.md` |
| 06 | **MADE ON Pitch Deck** (Kris Krüg) | `sources/06-made-on-pitchdeck.md` (binary: `docs/deliverables/MADEON_pitchdeck.pptx`) | ✅ Imported | `analysis/04-made-on-consolidation.md` |
| 07 | **MADE ON Tech Pack** (Formme track) | `sources/07-made-on-techpack.md` (binary: `docs/deliverables/MADEON_techpack.pdf`) | ✅ Imported | `analysis/04-made-on-consolidation.md` |
| 08 | **ChatGPT**: "ALLEY LEAGUE × VANCOUVER MADE" (Pump & Dump as hero) | `sources/08-chatgpt-alley-league-vancouver-made.md` | ✅ Imported | `analysis/08-chatgpt-alley-league-vancouver-made-analysis.md` |

> **⭐ CANONICAL DIRECTION = MADE ON.** Docs 05–07 are owner-authored, hackathon-ready
> deliverables; they consolidate all prior research. Brand: **VANCOUVER MADE → MADE ON**
> (9 kits, two racks). See `analysis/04-made-on-consolidation.md` and `analysis/SYNTHESIS.md`.

> **The core research trio anchors the rest.** Origins: 01 = Perplexity (concept +
> precedent survey), 02 = ChatGPT (the league system + pipeline), 03 = Claude (24
> cited precedent works + techniques + rights). They interlock: WHY / HOW / EVIDENCE.
> Docs 04–08 build out concepts and the hero pick on top of that base.

### ⭐ Start here
- **`analysis/SYNTHESIS.md`**: the single doc to design from (merged roster,
  design system, pipeline, the risk dial, build order).
- **`analysis/cross-source-comparison.md`**: the 3-way agree/diverge breakdown.
- **`tech-pack-spec.md`**: manufacturer-ready **sizing + materials** research (size
  charts, BOM, decoration/finishes, labels, construction). Drops into the Formme
  template + the pro tech pack. Generated 2026-06-20, fully sourced, `[confirm]` flags.

## How this KB works

```
docs/research/
├── KNOWLEDGE-BASE.md        ← you are here (registry + protocol)
├── brief.md                 ← original quick brief (facts to confirm)
├── sources/                 ← imported research, verbatim, never edited
│   └── 01-master-concept-precedent.md
└── analysis/                ← our parse of each source + final synthesis
    └── 01-master-doc-analysis.md
```

**Rules**
1. `sources/` is read-only canon. Import verbatim, never edit. Provenance preserved.
2. Every claim/number that ends up public (slide, shirt, site) must be traced to a
   cited source and **independently confirmed**. Research docs are leads, not proof.
3. Analysis files extract: thesis, concepts, ethical constraints, precedents,
   process ideas, and **impact on the current build**.
4. Synthesis (written once the sources are in) is the single doc the team designs from.

## Ethical considerations raised by Doc 01 (human-calibrated)

> **The human (project owner) is the ethical guard.** These are *not* locked-in
> rules the AI enforces. They're the positions Doc 01 stakes out, captured here
> as input. The owner decides per-item how edgy / scathing / provocative to be as
> the research develops. Documented for reference, not imposed.

Doc 01's stated positions:
- **Punch up at systems** (policing, developers, FIFA, capital) vs. the displaced.
- **Avoid appropriating Indigenous regalia / sacred / community-owned motifs**;
  target *colonial systems* instead. (Anchored by the Cowichan sweater dispute, 2010.)
- **MMIWG2S references foreground settler/state responsibility.**
- **Center systems over individuals** (e.g. Pickton case → indict policing/courts,
  per the doc's own framing).
- **Sex work framing = labor, risk, criminalization.**
- **Land acknowledgement as substance.** Unceded xʷməθkʷəy̓əm (Musqueam),
  Sḵwx̱wú7mesh (Squamish), səlilwətaɬ (Tsleil-Waututh).

## Event context

- **Vancouver Made Designathon & Hackathon** at **BCIT Tech Collider**.
- Judging values **novelty of process and output**, so the *system* that
  generates kits (Land → Data → Pattern → Jersey) is itself a deliverable.
- Devin / Open Hackathon context (AI pipeline angle).
