# Analysis — Receipts Verification Pass

**Date:** 2026-06-20 · **Method:** deep-research harness, 5 parallel research agents,
one per claim cluster. **Outcome:** all 6 `clubs.js` source cards verified and set
`confirm: false` (production build gate now passes). `receipts.js` + `heroKits.js` hem
citations corrected. One item deliberately left unverified (see §3).

> Every claim below now carries a real, datable source. Two commonly-cited numbers
> were **wrong** and have been corrected; several were refined to the latest (May/June
> 2026) figures.

## 1. Verdicts

| Claim | Verdict | Action taken |
|-------|---------|--------------|
| BC gross cost $685M–$729M · $242M security · up to $114M net | **TRUE** (May 2026) | kept; dated to May 2026; retired stale "$85–145M net" |
| California ran on private money | **PARTIALLY TRUE** | reworded — SF Bay Area's *operating* budget (~US$45M) is mostly private; federal money still covers security/transit |
| City of Vancouver $320–338M + $67–74M + ~$242M | **TRUE** (May 2026) | kept; dated; retired stale "$261–281M" |
| Oppal "forsaken twice" / police "utterly failed" | **TRUE** | kept; exact phrase confirmed: "forsaken twice: once by society at large and again by the police"; "blatant failure" + VPD "utterly failed" to warn — all verbatim |
| 2010 homelessness ~373% / 1,400+ units lost / "no displacement" pledge | **PARTIALLY TRUE** | **corrected** — 373% is *street* homelessness only; defensible total is **+134%** (628→1,576). 1,400+ units lost = TRUE (Pivot: 1,448). ICI "no displacement" pledge = TRUE |
| VSE "scam capital" (Forbes 1989) → CDNX | **TRUE** | refined — merged ASE 1999 → CDNX → TSX Venture 2001 |
| ~2,500 unsold condos / price-to-income 20–30× | **MIXED** | **corrected** — condos = "completed & unabsorbed" 2,488 (May 2025) → ~4,376 (May 2026), not "vacant". **Price-to-income 20–30× is FALSE → ~12×** (Demographia 11.8) |
| No.5 Orange = Melbourne Hotel (1904) → 1971 | **TRUE** | refined — opened Aug 1904, 205 Main St; source Eve Lazarus |
| Nardwuar/Chrétien "pepper… on my plate" | **PARTIALLY TRUE** | corrected quote: "**For me,** pepper, I put it on my plate"; precedes Hughes/APEC inquiry |
| Host City Human Rights Action Plan names sex-work/GBV | **TRUE** | refined — HRAP final released May 25, 2026; names sex-worker safety, GBV, MMIWG2S+ |

## 2. The two corrections that mattered
1. **Price-to-income "20–30×" was an overstatement (~2× too high).** Real figure ~**12×**
   (Demographia 2025, 11.8). Fixed in `clubs.js` (whoPays) and `heroKits.js` (Pump &
   Dump hem). *Lesson: the project's own credibility rule caught a number that would
   have undercut us on the floor.*
2. **2010 "~373% homelessness" is street-count-only.** Total City of Vancouver
   homelessness rose **+134%** (628→1,576, UBC OGI report). `receipts.js` now leads
   with "more than doubled (+134%)" and notes the 373% street figure as secondary.

## 3. Deliberately still `confirm: true`
- **`receipts.js` R-HOGANS** (Hogan's Alley paved for the viaduct) — well-documented
  historically but not run through this pass; verify before final publish.
- **`heroKits.js` MO-01 (Made on Silence) hem** — "$242M security · LINE-ITEM DETAIL
  WITHHELD · RECORDS SEVERED UNDER EXEMPTION." The $242M is verified; the *withholding*
  framing is rhetorical and needs an actual FOI/FIPPA response to stand as a citation,
  or should be presented as clearly rhetorical. Left flagged on purpose.

## 4. Primary sources (cite these)
- Government of B.C., "Province, Vancouver, PavCo update cost projections," **May 29, 2026** — news.gov.bc.ca/releases/2026TACS0027-000625
- Globe and Mail, "Vancouver, Toronto pay… as U.S. host cities tap private sponsors," **Jun 6, 2026**
- *Forsaken: Report of the Missing Women Commission of Inquiry* (Oppal), **2012** — gov.bc.ca …/forsaken-es.pdf
- UBC Olympic Games Impact (OGI) Pre-Games Report, **2009**; Pivot Legal Society (1,448 units)
- Demographia International Housing Affordability **2025** (Vancouver 11.8 median multiple)
- CMHC via Business in Vancouver, "Unabsorbed condos at record levels," **2025–26**
- Eve Lazarus, "How the Melbourne Hotel became No5 Orange," **2022**
- The Canadian Encyclopedia / Nardwuar footage (APEC 1997)
- FIFA WC 2026 Vancouver Host Committee, Host City Human Rights Action Plan, **May 25, 2026**
