# Analysis — Doc 02: ChatGPT "ALLEY LEAGUE"

**Source:** `sources/02-chatgpt-alley-league.md`
**Parsed:** 2026-06-20

---

## 1. What this document is

A second creative bible, but built on a different spine than the Perplexity doc.
Where Perplexity (Doc 01) is a **precedent + concept survey** (sports-protest
history, brandalism theory, 8 loosely-grouped kit ideas), ChatGPT is an
**operational design system**: a named league, a club roster with ethical-risk
ratings, a shared "league logic," a merch ecosystem in three layers, a
reproducible **receipt-to-kit pipeline**, and a 60-second pitch script.

It is also visibly **source-anchored to official record** — it cites specific
numbers (World Cup public costs, the BCSC 2026 pump-and-dump finding), City
by-laws, the MMIWG inquiry's 231 Calls for Justice, and Canadian textile-labelling
law. (Note: its inline `citeturnXXview` tokens are ChatGPT artifacts, not live
links — every number must still be independently confirmed before public use.)

## 2. The single biggest idea: "kit as civic document / receipt"

The governing metaphor is sharper than Doc 01's "kit as poster":

> Most kits turn a city into a logo. ALLEY LEAGUE turns it into **evidence**.
> "This is not anti-football. It is **anti-amnesia**."

Visual raw material = **bureaucracy itself**: receipts, redactions, permits,
maps, dockets, invoices, accreditation badges, by-laws. Politics is structural,
not decorative ("document edge" trim on every kit).

## 3. The club roster (9 clubs)

ChatGPT reframes the concept as a **league of fake clubs**, each indicting one
institution. With its own ethical-risk ratings:

| Club | Target system | Risk | Lead? |
|------|---------------|------|-------|
| **Host City / Ghost City** | branded city erases billed city (umbrella) | Low–Med | ★ umbrella |
| **Pump & Dump FC** | Howe St. shell-company / penny-stock finance | Low | ★ flagship |
| **Viaduct United** | Hogan's Alley Black displacement / urban renewal | Low | ★ moral core |
| **Security Theatre FC** | brand protection, event zones, policing | Low | ★ WC-specific |
| **Rent Cheque Rovers** | housing extraction / no home game | Low | secondary |
| **False Creek False Promises** | greenwashed waterfront legacy | Med | secondary |
| **Pigs at the Trough** | public money → state-corporate greed | Med | secondary |
| **Number Five Orange** | event city as transaction / nightlife capital | Med–High | wild card |
| **City That Looked Away** | MMIWG institutional failure | **High** | archive only |

**Recommended stage lineup:** Pump & Dump FC (flagship) flanked by Viaduct United
+ Security Theatre FC, under the Host City / Ghost City umbrella.

Each club ships with a **token bank**, **typography anchor**, and a
**sponsor-parody copy bank** (e.g. Pump & Dump: `EXIT LIQUIDITY`, `FORWARD-LOOKING
STATEMENTS`, `BUY THE RUMOUR`; Security Theatre: `AUTHORIZED PERSONNEL ONLY`,
`PUBLIC SPACE NOT FOUND`; Host City: `WELCOME THE WORLD / BILL THE PUBLIC`).
Plus a full home/away/third/keeper/limited matrix per club.

## 4. The process play (the hackathon edge)

ChatGPT makes the **process itself the deliverable** — directly targeting the
"novelty of process" judging criterion. The **receipt-to-kit pipeline**:

```
Civic wound → 3–6 primary sources → harm map (institutions/money/communities/dates)
→ extract visual tokens → ethical risk check → pick club + kit → build assets
→ attach QR source cards → mockups → harm/clarity/legal review → pitch
```

Every garment carries a **QR-linked source card** (template provided) and an
inside-neck source ID (e.g. `AL-VU-003 /cards/viaduct-united/hogans-alley-displacement`).
This is the strongest single idea for *our build*: **the R3F portal can BE the
source-card system + pipeline visualizer.** "Show your work" becomes interactive.

## 5. Notable facts surfaced (CONFIRM before any public use)

- 7 World Cup matches in Vancouver.
- City core/essential cost **$320M–$338M**; +**$67M–$74M** other public-sector;
  safety/security **~$242M** (combined local + provincial).
- 2025 FIFA by-law → signage/advertising/vending/street-entertainment controls in
  event zones; **brand-protection** obligations; ~**2 km** downtown event zone.
- MMIWG inquiry: **2,380+** testimonies, **231 Calls for Justice**.
- BCSC early-2026 pump-and-dump finding against a Vancouver company + Lower
  Mainland individuals; old Vancouver Stock Exchange → Canadian Venture Exchange.
- Canada textile labelling: fibre content + dealer ID mandatory; permanent labels
  must survive 10 cleanings; flags/pennants exempt.

→ These feed `research/brief.md`'s "facts to confirm" list. Do not ship a number
on a shirt/slide/site until traced to a primary source.

## 6. Ethics framing — note the contrast with the owner's stance

ChatGPT goes **further than Perplexity** on caution: explicit red-line table,
"do **not** design as counterfeit official merchandise" (because brand-protection
enforcement is the very thing being critiqued), and "build first as
criticism/exhibition, not vended merch."

⚠️ **Tension with project direction:** the owner wants edgy, provocative,
in-your-face work and is the ethical guard. Two of ChatGPT's cautions also
directly contradict our current scaffold:
- Our scaffold *is* "counterfeit official merch" (counterfeit trophy, fake FIFA
  framing). ChatGPT argues against imitating FIFA wordmarks specifically — but
  note this is partly **legal-risk avoidance**, separable from creative edge. You
  can be scathing without copying FIFA's actual logo.
- ChatGPT brackets the MMIWG / sex-work / Pickton material as high-risk; Doc 01
  (Perplexity) leans into those as kit concepts. **This is the main fork between
  the two docs** — see cross-source comparison.

Captured as input for the owner to weigh, not as rules to enforce.

## 7. Impact on the current build

- **Adopt the league-of-clubs structure** — far richer than one "VANCOUVER MADE FC."
  Our umbrella maps cleanly to "Host City / Ghost City."
- **Adopt the receipt-to-kit pipeline as the portal's spine** — Land/Source →
  Token → Kit → QR card. Pairs with Doc 01's "Land → Data → Pattern → Jersey."
- **Build the source-card system** (QR + card template) — strong, buildable,
  judge-friendly, and it's literally a web feature we can ship.
- **Fake-sponsor copy bank** is now large and per-club — make it a structured data
  file in code.
- Naming decision pending: keep **VANCOUVER MADE** umbrella, or adopt **ALLEY
  LEAGUE**, or fuse them. (Recommend deciding after Doc 03 / with owner.)
