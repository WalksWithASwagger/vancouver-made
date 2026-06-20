# Knowledge Base — VANCOUVER MADE

Central registry for project research. Three research docs are incoming (from
Perplexity, Claude, and ChatGPT). Each gets imported **verbatim** into
`sources/`, then **parsed** into a matching analysis in `analysis/`. Once all
three are in, we write one **synthesis** that reconciles them and drives the
build.

## Source registry

| # | Source | File | Status | Analysis |
|---|--------|------|--------|----------|
| 01 | **Perplexity** — "Master Concept & Precedent" | `sources/01-master-concept-precedent.md` | ✅ Imported | `analysis/01-master-doc-analysis.md` |
| 02 | **ChatGPT / OpenAI** — "ALLEY LEAGUE" | `sources/02-chatgpt-alley-league.md` | ✅ Imported | `analysis/02-chatgpt-alley-league-analysis.md` |
| 03 | **Claude** | `sources/03-claude.md` | ⏳ Awaiting | — |

> Origins confirmed by the owner: Doc 01 is the Perplexity output (its reference
> list carries perplexity.ai search links); Doc 02 is the ChatGPT/OpenAI output.
> Doc 03 (Claude) still to come — synthesis is written once it lands.

**Cross-source comparison (running):** `analysis/cross-source-comparison.md` —
where the docs agree, diverge, and add new ammunition. Half-builds the synthesis.

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
   cited source and **independently confirmed** — research docs are leads, not proof.
3. Analysis files extract: thesis, concepts, ethical constraints, precedents,
   process ideas, and **impact on the current build**.
4. Synthesis (written after all 3 land) is the single doc the team designs from.

## Ethical considerations raised by Doc 01 (human-calibrated)

> **The human (project owner) is the ethical guard.** These are *not* locked-in
> rules the AI enforces — they're the positions Doc 01 stakes out, captured here
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
- Judging values **novelty of process and output** — so the *system* that
  generates kits (Land → Data → Pattern → Jersey) is itself a deliverable.
- Devin / Open Hackathon context (AI pipeline angle).
