# Knowledge Base — VANCOUVER MADE

Central registry for project research. Three research docs are incoming (from
Perplexity, Claude, and ChatGPT). Each gets imported **verbatim** into
`sources/`, then **parsed** into a matching analysis in `analysis/`. Once all
three are in, we write one **synthesis** that reconciles them and drives the
build.

## Source registry

| # | Source | File | Status | Analysis |
|---|--------|------|--------|----------|
| 01 | Master Concept & Precedent (origin TBD — appears Perplexity-cited) | `sources/01-master-concept-precedent.md` | ✅ Imported | `analysis/01-master-doc-analysis.md` |
| 02 | Perplexity | `sources/02-perplexity.md` | ⏳ Awaiting | — |
| 03 | Claude | `sources/03-claude.md` | ⏳ Awaiting | — |
| 04 | ChatGPT | `sources/04-chatgpt.md` | ⏳ Awaiting | — |

> Note: Doc 01 is heavily Perplexity-cited (its reference list contains
> perplexity.ai search links). When the dedicated Perplexity doc (02) arrives,
> check for overlap/dedup against 01.

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

## Ethical guardrails (promoted to top level — non-negotiable)

These come from Doc 01 and govern everything regardless of final direction:
- **Punch up, never down.** Target systems (policing, developers, FIFA, capital),
  never the displaced, the dead, or survivors.
- **No appropriation of Indigenous regalia, sacred symbols, or community-owned
  motifs.** Symbolism targets *colonial systems*, not spiritual iconography.
  (See: Cowichan sweater dispute, 2010.)
- **MMIWG2S references foreground settler/state responsibility** — no grief
  commodification, no trauma cosplay.
- **Center systems over individuals.** Do not turn perpetrators (e.g. Pickton)
  into edgy motifs; indict the institutions that enabled the violence.
- **Sex work framing = labor, risk, criminalization** — never punchline.
- **Land acknowledgement is substance, not decoration.** Unceded xʷməθkʷəy̓əm
  (Musqueam), Sḵwx̱wú7mesh (Squamish), səlilwətaɬ (Tsleil-Waututh).

## Event context

- **Vancouver Made Designathon & Hackathon** at **BCIT Tech Collider**.
- Judging values **novelty of process and output** — so the *system* that
  generates kits (Land → Data → Pattern → Jersey) is itself a deliverable.
- Devin / Open Hackathon context (AI pipeline angle).
