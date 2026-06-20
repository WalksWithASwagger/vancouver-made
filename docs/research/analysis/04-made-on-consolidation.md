# Analysis — MADE ON Consolidation (Docs 05–07)

**Sources:** `sources/05-made-on-board.md`, `06-made-on-pitchdeck.md`,
`07-made-on-techpack.md` · binaries in `docs/deliverables/` · Author: Kris Krüg.
**Parsed:** 2026-06-20

---

## 1. What just happened

These three are not more research — they are the project **consolidating into its
final form**. The deck + board + tech pack are owner-authored, hackathon-ready, and
internally consistent. They should be treated as **canonical**. Everything we
ingested before (Perplexity / ChatGPT / Claude) flows *into* this; the synthesis
predicted most of it (pipeline, lineage, anchors) and this is the landed version.

## 2. The brand crystallized: VANCOUVER MADE → **MADE ON**

The umbrella stays **VANCOUVER MADE**; the collection is **MADE ON** — a
fill-in-the-blank construction that *is* the whole concept:

> **They asked for the Vancouver story. We finished the sentence.** *Made on what?*
> **Made on stolen ground. Made on Hogan's Alley. Made on $729 million of public money.**

The move: **"Everyone else made a souvenir. We made the receipt."** A settler
artist's refusal to make the celebration jersey — *no borrowed sacred imagery; the
coloniser's own paperwork instead: the receipt, the redaction, the banknote.*

→ **MADE ON supersedes "ALLEY LEAGUE"** as the collection name. (ALLEY LEAGUE was a
useful exploration; its best ideas live on as the deep-dive kits.)

## 3. The canonical structure: 9 kits, two racks, one argument

**MADE ON — what the city is built on**
1. Made on Silence — the redacted document, worn (black bloc)
2. Made on Stolen Ground — the land receipt, rent never paid
3. Made on the Public Dime — the banknote, $729M as couture ← **tech-pack worked example**

**STREET SERIES — who it got built without**
4. Forsaken Twice — the VPD failure, in Oppal's words
5. Access: All Areas — (unless you live here); the 2010 sweep again
6. Starting from the Low $900s — gentrification sold back as a pre-sale
7. Public Health Emergency — ongoing; *a memorial, not a sneer*
8. Smart City — surveillance as a terms-of-service
9. Pump and Dump — the whole grift, worn as the prospectus

## 4. How our prior build maps in

| Prior (ALLEY LEAGUE) | MADE ON status |
|----------------------|----------------|
| **Pump & Dump FC** | = **Kit 09** "Pump and Dump." Direct survivor; our data/brief still applies. |
| **Number Five Orange** | Not in the 9. Companion / wildcard concept; spirit lives near "Access: All Areas" + nightlife critique. |
| **Nardwuar FC** | Not in the 9. Companion homage; spirit lives near "Show your process / receipts" (he *is* the receipts engine). |
| Receipt-to-kit pipeline | = the deck's **"receipts engine"** (mimic → invert → cite). Confirmed. |
| Cross-source lineage (1968 / Adbusters / Brandalism / Cowichan) | = the deck's **Lineage slide**, verbatim. Our Doc-03 anchors were exactly right. |

**Recommendation:** keep the three built kit cards as the site's "deep dive — three
kits, fully realized," with Pump & Dump explicitly labeled Kit 09. Don't delete
Number 5 / Nardwuar — frame them as companion concepts. (Owner to confirm.)

## 5. The method (now spec'd, from the tech pack)

**"A receipts engine, not a t-shirt."**
1. **Mimic** the official polish — rebuild FIFA/sponsor visual language exactly.
2. **Invert** the payload — the indictment goes where the brand message goes.
3. **Bake in the receipt** — every claim carries its source **on the hem**, in
   kit-maker spec type. *The data is the craft.*

Production reality is specified: recycled poly ~150gsm, dye-sublimation for allover,
fine screen/heat-transfer for hem micro-type, matte-vs-gloss for redaction bars,
woven neck label with the territorial acknowledgement, hangtag = manifesto card +
QR to a DTES / land-back org, minimal unbranded "anti-merch" packaging.

Palette (official): Ink `0E0E0E` · Bone `EDE6D8` · Stamp red `C0392B` · Gold
`B8924A` · Banknote green `1B4D3E`.

## 6. The receipts (now first-class data → `src/data/receipts.js`)

All "public record," all still **[confirm]** before final publish:
- **$685M–$729M** gross BC cost, 7 games; **$242M** security; up to **$114M** net to
  BC taxpayers. (CBC · Globe and Mail, 2026)
- California ran the same tournament **mostly on private money**.
- **Oppal inquiry:** women "forsaken twice"; VPD "utterly failed" to warn them. (Forsaken, 2012)
- **2010 Olympics:** homelessness up **~373%**; **1,400+** DTES units lost after a
  "no displacement" pledge.

⚠️ Sensitive: kits 04 (Forsaken Twice / MMIWG) and 07 (Public Health Emergency) are
the highest-care items — the deck already handles them right ("in Oppal's own
words," "a memorial, not a sneer"). Owner is the ethical guard.

## 7. The rubric the deck targets (build to this)
Novelty of process & output · Best Vancouver Narrative · Show your process · Use of
AI/tools. **The system (mimic-invert-cite) is the pitch.**

## 8. What I changed in the build (this commit)
- Added `src/data/receipts.js` + `src/data/collection.js` (canonical MADE ON data).
- Site: hero reframed to the MADE ON sentence; added the Collection (9 kits / two
  racks) + a Receipts wall; the 3 kit cards reframed as the "deep dive."
- Stored the 3 deliverables in `docs/deliverables/`; transcribed into KB sources 05–07.

## 9. The one open decision (for the owner)
**Which kit is the hero, built fully today?** The deck/board/tech-pack all leave
"[HERO KIT NAME] — FILL IN ON COMMIT" blank. The tech pack's worked example is
**Kit 03 — Made on the Public Dime (the banknote)**, which is the most resolved and
the most quotable ($729M as couture). Strong default unless the owner prefers
Stolen Ground (the moral core) or Pump and Dump (already partly built).
