// Fills the OFFICIAL Formme "Vancouver Made — Jersey Designathon" 11-page template
// (Fashion Design Stream) with the locked NARDWUAR FC "Deep Cut" (Home/red) specs.
// Reproduces the template's visual system (navy header band, lime accents, magenta
// detail tabs, Formaé footer) page-for-page:
//   1 Cover · 2 Front&Back · 3 Details-01 · 4 Details-02 · 5 Colour Story
//   6 Materials-01 · 7 Materials-02 (plain language) · 8-11 Flexible Space (pro spec)
// The beginner-level template carries the plain-language fill; the pro POM grid + BOM
// live in the Flexible Space pages (tech-pack-spec.md §0 two-register plan).
//
// Run: node scripts/build-formme-techpack.mjs

import { chromium } from 'playwright'
import { execFileSync } from 'node:child_process'
import { readFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

const ROOT = process.cwd()
const NARD = join(ROOT, 'docs', 'deliverables', 'nardwuar')
const OUT = join(NARD, 'NARDWUAR_Formme_Tech-Pack.pdf')

function img(name, maxEdge) {
  const src = join(NARD, name)
  const out = join(tmpdir(), `fmt-${name.replace(/\.png$/, '')}.jpg`)
  execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '82', '-Z', String(maxEdge), src, '--out', out], { stdio: 'ignore' })
  const b64 = readFileSync(out).toString('base64')
  rmSync(out, { force: true })
  return `data:image/jpeg;base64,${b64}`
}
const FRONT = img('nardwuar-home-front-flat.png', 1792)
const BACK = img('nardwuar-home-back-flat.png', 1792)
const RENDER = img('nardwuar-home-3d-render.png', 1200)

// ---- page chrome -----------------------------------------------------------
const band = (right) => `<div class="band"><span>VANCOUVER MADE — JERSEY DESIGNATHON</span><span>${right}</span></div>`
const foot = `<div class="formae">Formaé</div>`
const page = (right, inner) => `<div class="page">${band(right)}<div class="body">${inner}</div>${foot}</div>`

// ---- detail crop -----------------------------------------------------------
// Box aspect matches the portrait flats so the focal maps 1:1; centring a focal
// at image fraction (ox,oy) under scale s needs translate(-s*(ox-50), -s*(oy-50)).
const detail = (n, src, cap, ox, oy, s) => {
  const tx = (-s * (ox - 50)).toFixed(1), ty = (-s * (oy - 50)).toFixed(1)
  return `
  <div>
    <div class="dbox"><div class="dtab">DETAIL ${n}</div>
      <img src="${src}" style="transform:translate(${tx}%,${ty}%) scale(${s});transform-origin:50% 50%"></div>
    <div class="dcap">${cap}</div>
  </div>`
}

const swatch = (n, name, hex, pantone, used, dark) => `
  <div class="csw">
    <div class="swatch" style="background:${hex}"><div class="swtab">${n}</div></div>
    <div class="swfield"><span class="l">NAME</span><span class="v">${name} <span class="mono" style="color:#888">${hex}</span></span></div>
    <div class="swfield"><span class="l">PANTONE</span><span class="v">${pantone}</span></div>
    <div class="swfield"><span class="l">USED ON</span><span class="v">${used}</span></div>
  </div>`

// ---- pro-spec tables -------------------------------------------------------
const jerseyPOM = `
<table class="pro"><tr><th class="kl">POM — Jersey (cm)</th><th>XS</th><th>S</th><th>M</th><th>L</th><th>XL</th><th>2XL</th><th>3XL</th><th>Tol.</th></tr>
<tr><td class="kl">Chest, ½ (1″ below armhole)</td><td>43</td><td>45.5</td><td>51</td><td>56</td><td>61</td><td>66</td><td>71</td><td class="t">±1.5</td></tr>
<tr><td class="kl">Body length (HPS→hem)</td><td>68.5</td><td>71</td><td>73.5</td><td>76</td><td>79</td><td>81.5</td><td>84</td><td class="t">±1.5</td></tr>
<tr><td class="kl">Across shoulder ᶜ</td><td>41.5</td><td>42.5</td><td>44.5</td><td>47</td><td>49.5</td><td>52</td><td>54.5</td><td class="t">±0.6</td></tr>
<tr><td class="kl">Sleeve length (shoulder→cuff)</td><td>19.5</td><td>20.5</td><td>21</td><td>21.5</td><td>22</td><td>23</td><td>23.5</td><td class="t">±0.6</td></tr>
<tr><td class="kl">Hem opening, ½ ᶜ</td><td>42</td><td>44.5</td><td>49.5</td><td>54.5</td><td>59.5</td><td>65</td><td>70</td><td class="t">±1.5</td></tr>
<tr><td class="kl">Neck width, ½ (seam→seam) ᶜ</td><td>15</td><td>16</td><td>16.5</td><td>17</td><td>18</td><td>18.5</td><td>19</td><td class="t">±0.3</td></tr></table>`

const shortsPOM = `
<table class="pro"><tr><th class="kl">POM — Shorts (cm)</th><th>XS</th><th>S</th><th>M</th><th>L</th><th>XL</th><th>2XL</th><th>3XL</th><th>Tol.</th></tr>
<tr><td class="kl">Waist relaxed, ½</td><td>32</td><td>34</td><td>37</td><td>39.5</td><td>43</td><td>47</td><td>51</td><td class="t">±1.5</td></tr>
<tr><td class="kl">Waist stretched, ½ ᶜ</td><td>42</td><td>44.5</td><td>47</td><td>51</td><td>54.5</td><td>59.5</td><td>65</td><td class="t">±1.5</td></tr>
<tr><td class="kl">Hip / seat, ½ ᶜ</td><td>47</td><td>49.5</td><td>53</td><td>57</td><td>61</td><td>65</td><td>68.5</td><td class="t">±1.5</td></tr>
<tr><td class="kl">Front rise (incl. wb) ᶜ</td><td>24</td><td>25</td><td>26</td><td>27.5</td><td>28.5</td><td>30</td><td>31</td><td class="t">±0.6</td></tr>
<tr><td class="kl">Inseam</td><td>18</td><td>18</td><td>18</td><td>18</td><td>18.5</td><td>19</td><td>19.5</td><td class="t">±0.6</td></tr>
<tr><td class="kl">Total length / outseam ᶜ</td><td>39.5</td><td>40.5</td><td>42</td><td>43</td><td>44.5</td><td>45.5</td><td>47</td><td class="t">±1.5</td></tr></table>`

const bodyChart = `
<table class="pro"><tr><th class="kl">Body self-select (cm)</th><th>XS</th><th>S</th><th>M</th><th>L</th><th>XL</th><th>2XL</th><th>3XL</th></tr>
<tr><td class="kl">Chest</td><td>76–81</td><td>86–91</td><td>97–102</td><td>107–112</td><td>117–122</td><td>127–132</td><td>137–142</td></tr>
<tr><td class="kl">Waist</td><td>61–66</td><td>71–76</td><td>81–86</td><td>91–97</td><td>102–107</td><td>112–117</td><td>122–127</td></tr>
<tr><td class="kl">Hip</td><td>74–79</td><td>84–89</td><td>94–99</td><td>104–109</td><td>114–119</td><td>124–130</td><td>135–140</td></tr></table>`

const proBOM = `
<table class="pro lft"><tr><th class="kl">Component</th><th>Material / spec</th><th>Notes</th></tr>
<tr><td class="kl">Main body (jersey)</td><td>Ocean-bound recycled-PET interlock, ~150 gsm, GRS + OEKO-TEX 100, optical-bright, fibre-integrated wicking — sublimation-ready</td><td>“Made on ocean plastic.” Confirm Formme stock + mill</td></tr>
<tr><td class="kl">Shorts body</td><td>Ocean-bound recycled-PET interlock, ~180 gsm, GRS + OEKO-TEX 100</td><td>Heavier for opacity + abrasion</td></tr>
<tr><td class="kl">Collar / cuffs</td><td>Self-fabric bound (check wraps edge-to-edge) or 1×1 poly/spandex rib, tartan green</td><td>Inner collar prints “DOOT DOOLA DOOT DOO”</td></tr>
<tr><td class="kl">Waistband</td><td>Elastic + internal drawcord</td><td>Upgrade: jacquard elastic w/ MADE ON wordmark</td></tr>
<tr><td class="kl">All-over print</td><td>Dye-sublimation, edge-to-edge, before cut-and-sew</td><td>300 DPI at size; 0.25″ bleed</td></tr>
<tr><td class="kl">Sleeve patch</td><td>“DEEP RESEARCH” — woven or hybrid sublimated-twill</td><td>Right sleeve</td></tr>
<tr><td class="kl">Name / number</td><td>Sublimated (ransom-note collage; zero hand)</td><td>FIFA-safe sizing</td></tr>
<tr><td class="kl">Hem micro-type</td><td>Sublimated, vector, sans-serif, ~6–8 pt</td><td>Proof on the real blank</td></tr>
<tr><td class="kl">Neck label / hangtag</td><td>Woven flag + tagless heat-transfer; recycled FSC manifesto hangtag</td><td>Territorial acknowledgement; soy ink</td></tr></table>`

const placement = `
<table class="pro lft sm"><tr><th>#</th><th>Element</th><th>Placement</th><th>Size / position</th><th>Artwork detail</th><th>Cite</th></tr>
<tr><td>1</td><td class="kl">Collage crest</td><td>Left chest</td><td>~80 mm tall, ~90 mm from shoulder seam</td><td>Mic-and-records host-city shield — objects only, no face</td><td>—</td></tr>
<tr><td>2</td><td class="kl">Sponsor bar</td><td>Centre chest</td><td>~220 mm wide, centred</td><td>“WHO BENEFITS? WHO PAYS?” counter-message lockup</td><td>—</td></tr>
<tr><td>3</td><td class="kl">“VANCOUVER” wordmark</td><td>Upper chest</td><td>across chest</td><td>Host-nation wordmark (no “’26”)</td><td>—</td></tr>
<tr><td>4</td><td class="kl">Neck tape</td><td>Inner collar</td><td>woven, full width</td><td>“DOOT DOOLA DOOT DOO”</td><td>—</td></tr>
<tr><td>5</td><td class="kl">“DEEP RESEARCH” patch</td><td>Right sleeve</td><td>Fair-Play-style patch</td><td>“DEEP RESEARCH / HUMAN SERVIETTE REPORTING CLUB”</td><td>—</td></tr>
<tr><td>6</td><td class="kl">Nameplate</td><td>Upper back</td><td>~60 mm caps; 5–7.5 cm, ≥4 cm above number (FIFA 7.5)</td><td>“NARDWUAR!!” ransom-note cut-and-paste</td><td>—</td></tr>
<tr><td>7</td><td class="kl">Number</td><td>Centre back</td><td>~250 mm; 25–35 cm tall, stroke 3–5 cm (FIFA 6.4)</td><td>“97” from record-sleeve / zine-panel rectangles</td><td>—</td></tr>
<tr><td>8</td><td class="kl">Back-neck badge</td><td>Back neck</td><td>small</td><td>“NO GAME WITHOUT THE GROUND”</td><td>—</td></tr>
<tr><td>9</td><td class="kl">Hem citation</td><td>Front hem, inside-out</td><td>8 mm mono caps</td><td>The receipt — where fibre-content / wash care goes</td><td>AL-NW-001</td></tr></table>`

// ---- pages -----------------------------------------------------------------
const p1 = page('DESIGN TEMPLATE', `
  <div class="ctitle">DESIGN TEMPLATE - <span class="lime">FASHION DESIGN</span> STREAM</div>
  <div class="csub">Vancouver Made · BCIT Tech Collider · June 20, 2026</div>
  <div class="rule"></div>
  <div class="fields">
    <div class="frow"><div class="fcell"><span class="flabel">Name</span><span class="fval">Kris Krüg</span></div>
      <div class="fcell"><span class="flabel">Jersey Title</span><span class="fval">Nardwuar FC — “Deep Cut” Home Kit · NW-01</span></div></div>
    <div class="frow"><div class="fcell"><span class="flabel">Team / Studio</span><span class="fval">Vancouver Made · MADE ON</span></div>
      <div class="fcell"><span class="flabel">Contact</span><span class="fval">feelmoreplants@gmail.com</span></div></div>
  </div>
  <div class="h2">CONCEPT / MOOD AREA</div>
  <div class="h2sub">Sketch, collage, or note your initial concept. What's the story behind your jersey?</div>
  <div class="concept">
    <div class="ctext">
      <p>The World Cup arrives as spectacle; this kit answers with the <b>archive</b>. From across the
      pitch it reads as a host-nation home shirt — Vancouver-tartan red, bold wordmark, crest, classic
      check. Up close it's a walking archive: an ultra-faint all-over collage of 7″ records, photocopied
      flyers and interview microtext.</p>
      <p>Homage to <b>Nardwuar the Human Serviette</b> — Vancouver's relentless interviewer and
      researcher. <i>Research is the protest; the receipt is the weapon.</i></p>
      <p class="ethics"><b>HOMAGE, NOT LIKENESS.</b> No face anywhere — the homage is carried by objects
      (tam, mic, records, zines). Three colorways share one block: <b>red Home</b>, black Away,
      white + gold-foil Limited.</p>
    </div>
    <img class="cmood" src="${RENDER}">
  </div>`)

const p2 = page('FRONT & BACK VIEW', `
  <div class="h2">FRONT AND BACK VIEW</div>
  <div class="h2sub">Draw the front and back of your jersey — colour, graphics, collar, number placement, etc.</div>
  <div class="viewbox">
    <figure><img src="${FRONT}"><figcaption>FRONT</figcaption></figure>
    <figure><img src="${BACK}"><figcaption>BACK</figcaption></figure>
  </div>
  <div class="vnote">Ocean-bound recycled-PET interlock, dye-sublimated edge-to-edge. Crew, self-fabric-bound
  collar. Set-in short sleeve (clean canvas for the all-over collage). Name &amp; number sublimated — zero hand.</div>`)

const p3 = page('DETAILS - 01', `
  <div class="h2">DETAILS - 01</div>
  <div class="h2sub">Zoom into specific areas - a collar shape, sleeve stripe, graphic motif, hem detail, texture, or pattern.</div>
  <div class="dgrid">
    ${detail('01', FRONT, 'Collage crest — mic + 7″ records on a host-city shield (no face)', 60, 27.5, 3.0)}
    ${detail('02', FRONT, '“WHO BENEFITS? WHO PAYS?” counter-message sponsor bar', 49, 45, 2.0)}
    ${detail('03', BACK, '“NARDWUAR!!” nameplate — ransom-note cut-and-paste', 50, 26.5, 2.0)}
    ${detail('04', BACK, '“97” built from record-sleeve / zine-panel rectangles', 46, 43, 1.9)}
  </div>`)

const p4 = page('DETAILS - 02', `
  <div class="h2">DETAILS - 02</div>
  <div class="h2sub">Keep going - close-ups, alternative ideas, or variations you want to explore.</div>
  <div class="dgrid">
    ${detail('05', FRONT, 'Collar / neck tape — inside reads “DOOT DOOLA DOOT DOO”', 50, 13, 2.5)}
    ${detail('06', FRONT, '“VANCOUVER” host-nation wordmark + tartan check ground', 48, 39, 1.9)}
    ${detail('07', BACK, 'Back-neck badge — “NO GAME WITHOUT THE GROUND”', 51, 16.5, 3.2)}
    ${detail('08', RENDER, 'On-body — the kit in the round (Home / red)', 50, 46, 1.0)}
  </div>`)

const p5 = page('COLOUR STORY', `
  <div class="h2">COLOUR STORY</div>
  <div class="h2sub">Fill or shade each swatch. Add a name (e.g. ‘Ocean Dusk’), a Pantone code if you have one, and where that colour appears on the jersey.</div>
  <div class="cgrid">
    ${swatch('01', 'Tartan red', '#c8102e', '≈ PMS 186 C [confirm]', 'Body &amp; ground — Home')}
    ${swatch('02', 'Vinyl ink', '#0a0a0a', '≈ PMS Black 6 C [confirm]', 'Linework · microtext · crest')}
    ${swatch('03', 'Tartan green', '#1d7a46', '≈ PMS 7732 C [confirm]', 'Check · shoulder / side trim')}
    ${swatch('04', 'Tartan yellow', '#e8c531', '≈ PMS 7406 C [confirm]', 'Check accent')}
    ${swatch('05', 'Gold', '#d9a521', '≈ PMS 7555 C [confirm]', 'Hem · trim accent')}
    ${swatch('06', 'Bloc black', '#0a0a0a', '≈ PMS Black 6 C [confirm]', 'Away colorway ground')}
    ${swatch('07', 'Paper white', '#f4efe6', '≈ 11-0601 TCX [confirm]', 'Limited colorway ground')}
    ${swatch('08', 'Foil gold', '#d9a521', '≈ PMS 871 C metallic [confirm]', 'Limited foil accent')}
  </div>`)

const matRow = (c, d) => `<tr><td class="mc">${c}</td><td class="md">${d}</td></tr>`
const p6 = page('MATERIALS', `
  <div class="h2">MATERIALS - 01</div>
  <div class="h2sub">Describe what each part of your jersey is made from or how you imagine it. ‘Soft mesh’, ‘ribbed knit’, ‘smooth performance fabric’ - no technical terms needed.</div>
  <table class="mat"><tr><th class="mch">COMPONENT</th><th class="mdh">MATERIAL / DESCRIPTION / NOTES</th></tr>
    ${matRow('Main body', 'Smooth, lightweight knit made from <b>recycled ocean-bound plastic</b> — soft, breathable, holds bright edge-to-edge print (~150 gsm). “Made on ocean plastic.”')}
    ${matRow('Shorts', 'Same recycled performance knit, a touch heavier so it’s tough and never see-through (~180 gsm).')}
    ${matRow('Collar &amp; cuffs', 'Bound in the same fabric so the tartan check runs right to the edge (or a soft ribbed trim in tartan green). Inside the collar reads “DOOT DOOLA DOOT DOO”.')}
    ${matRow('Waistband', 'Stretchy elastic with an inside drawcord.')}
  </table>`)

const p7 = page('MATERIALS', `
  <div class="h2">MATERIALS - 02</div>
  <div class="h2sub">Describe what each part of your jersey is made from or how you imagine it. ‘Soft mesh’, ‘ribbed knit’, ‘smooth performance fabric’ - no technical terms needed.</div>
  <table class="mat"><tr><th class="mch">COMPONENT</th><th class="mdh">MATERIAL / DESCRIPTION / NOTES</th></tr>
    ${matRow('Graphics', 'Printed <b>into</b> the fabric (dye-sublimation) so there’s nothing to peel or crack — the tartan, the record-and-flyer collage and the name &amp; number are all printed in.')}
    ${matRow('Hem detail', 'A tiny “receipt” printed where the wash-care label normally goes — the cited fact, worn on the garment.')}
    ${matRow('Labels &amp; hang-tag', 'Soft printed neck label (no scratchy tag) carrying the land acknowledgement, plus a recycled hang-tag that doubles as the story card.')}
    ${matRow('Sleeve badge', 'A woven “DEEP RESEARCH” patch on the right sleeve (printed alternative).')}
  </table>`)

const p8 = page('FLEXIBLE SPACE', `
  <div class="h2">FLEXIBLE SPACE <span class="tag">PRO TECH PACK · SIZING 1 / 4</span></div>
  <div class="h2sub">Manufacturer size chart — jersey. Base size M; circumferences are ½-measures (laid flat, ×2 for the body); lengths direct. Rows marked ᶜ are interpolated — confirm on Formme’s block + first sample.</div>
  ${jerseyPOM}
  <p class="pnote">Silhouette: unisex relaxed match-fit (replica / stadium cut), short-sleeve set-in. Size run <b>XS–3XL</b>,
  women’s + youth cut as options, grade documented to 5XL. Full dual-unit grid (inch + cm) + grading in
  <span class="mono">docs/research/tech-pack-spec.md §2</span>. <b>Fitting rule:</b> self-select by chest; if between sizes, size up.</p>`)

const p9 = page('FLEXIBLE SPACE', `
  <div class="h2">FLEXIBLE SPACE <span class="tag">PRO TECH PACK · SIZING 2 / 4</span></div>
  <div class="h2sub">Manufacturer size chart — shorts (pull-on, elastic + drawcord) and wearer self-select body chart.</div>
  ${shortsPOM}
  <div class="gap"></div>
  ${bodyChart}
  <p class="pnote"><b>Grading (full):</b> chest +4 cm/size · body length +2.5 cm · sleeve +0.6 cm · shorts waist +5 cm (widening at XL+).
  <b>Tolerances:</b> large parts ±1.0–1.5 cm · medium ±0.6 cm · small ±0.3 cm. State on the pack so Formme isn’t guessing.
  Shorts self-select by waist, then check hip; jersey by chest.</p>`)

const p10 = page('FLEXIBLE SPACE', `
  <div class="h2">FLEXIBLE SPACE <span class="tag">PRO TECH PACK · BUILD 3 / 4</span></div>
  <div class="h2sub">Pro bill of materials, decoration methods and name/number standard.</div>
  ${proBOM}
  <p class="pnote"><b>Decoration:</b> bake everything possible into one sublimation file (all-over check + records/flyers collage +
  crest + fixed sponsor + name/number + hem micro-type); break out to woven / hybrid sublimated-twill only for the raised
  “DEEP RESEARCH” patch. <b>Name &amp; number (FIFA defaults):</b> back number 25–35 cm, stroke 3–5 cm; back name 5–7.5 cm,
  ≥4 cm above number; sublimated permanently (no Velcro), Latin chars, legible at distance. Confirm a non-FIFA league’s regs if applicable.</p>`)

const p11 = page('FLEXIBLE SPACE', `
  <div class="h2">FLEXIBLE SPACE <span class="tag">PRO TECH PACK · PLACEMENT &amp; SIGN-OFF 4 / 4</span></div>
  <div class="h2sub">Artwork &amp; placement (every claim carries its source), labels/legal, construction and the pre-production checklist.</div>
  ${placement}
  <div class="receipt">APEC 1997, VANCOUVER · NARDWUAR ASKED PM CHRÉTIEN ABOUT PEPPER SPRAY ON PROTESTERS · “FOR ME, PEPPER, I PUT IT ON MY PLATE” · AHEAD OF THE HUGHES/APEC INQUIRY INTO RCMP CONDUCT<br><span class="src">Source: Nardwuar footage · The Canadian Encyclopedia · CBC archives (AL-NW-001)</span></div>
  <div class="cols">
    <div><div class="ch">Labels &amp; legal</div><p class="pnote">Woven neck label: MADE ON · NW-01 · size · “made on unceded xʷməθkʷəy̓əm (Musqueam), Sḵwx̱wú7mesh (Squamish), səlilwətaɬ (Tsleil-Waututh) territory.” One dual-market care label (bilingual EN/FR fibre %, CA number + RN, country of origin, US-compliant care + ASTM D5489 symbols). No real FIFA / club / sponsor marks — evoke, never reproduce.</p>
      <div class="ch">Construction</div><p class="pnote">Overlock panel seams (5-thread safety on side seams); coverstitch hems; flatlock at skin-contact zones; bartack stress points; tonal thread. Graphic-led — block stays standard; one production pass.</p></div>
    <div><div class="ch">Pre-production checklist</div><p class="pnote">▢ Lab-dip the 5 hexes on rPET; gsm on strike-off; sublimation hand-feel.<br>▢ Microtext legible; the “97” rectangles hold at distance.<br>▢ Crest/patch contain <b>no face</b>; wordmarks spell “VANCOUVER” / “NARDWUAR!!” exactly.<br>▢ Neck-label acknowledgement present; dual-market care/legal label built.<br>▢ Confirm fluo / foil feasibility for Pump &amp; Limited variants.</p>
      <div class="ch">Ethics (hard constraint)</div><p class="pnote">Homage, not likeness — no face on garment or in renders; Nardwuar’s name not commercialized. Exhibition is clear; any move toward sale/merch needs his blessing first.</p></div>
  </div>`)

const HTML = `<!doctype html><html lang="en"><head><meta charset="utf-8"><style>
  :root{ --navy:#0b1124; --lime:#cdee00; --limeink:#9bb400; --mag:#ff2e6e; --red:#ff3b30; --logo:#2433a0; --line:#cdc8bd; --ink:#14181f; }
  @page{ size:Letter; margin:0; }
  *{ box-sizing:border-box; }
  html{ -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  body{ margin:0; font:13px/1.5 Arial,"Helvetica Neue",sans-serif; color:var(--ink); }
  .mono{ font-family:ui-monospace,"SF Mono",Menlo,monospace; }
  .page{ position:relative; width:8.5in; min-height:11in; page-break-after:always; overflow:hidden; }
  .page:last-child{ page-break-after:auto; }
  .band{ background:var(--navy); color:var(--lime); height:0.42in; display:flex; align-items:center;
         justify-content:space-between; padding:0 0.42in; font:700 9px/1 Arial; letter-spacing:.13em; }
  .body{ padding:0.34in 0.5in 0.7in; }
  .formae{ position:absolute; right:0.42in; bottom:0.3in; font-family:"Snell Roundhand","Brush Script MT",cursive;
           font-size:23px; color:var(--logo); }
  /* headings */
  .h2{ font:800 16px Arial; letter-spacing:.01em; margin:0 0 3px; }
  .h2 .tag{ font:700 9px Arial; letter-spacing:.1em; color:#fff; background:var(--navy); padding:3px 8px; vertical-align:2px; margin-left:6px; }
  .h2sub{ font:700 italic 10.5px Arial; color:#1b2b57; margin:0 0 14px; max-width:6.6in; }
  /* cover */
  .ctitle{ font:800 31px/1.05 Arial; letter-spacing:-.005em; margin:0; }
  .ctitle .lime{ color:var(--limeink); }
  .csub{ font:600 12px Arial; color:#333; margin:8px 0 0; }
  .rule{ height:5px; width:60%; background:linear-gradient(90deg,var(--red),rgba(255,59,48,0)); margin:11px 0 24px; }
  .fields{ margin-bottom:22px; }
  .frow{ display:flex; gap:34px; margin-bottom:13px; }
  .fcell{ display:flex; align-items:baseline; gap:10px; }
  .flabel{ font:700 8.5px Arial; color:#666; letter-spacing:.07em; text-transform:uppercase; white-space:nowrap; }
  .fval{ border-bottom:1px solid #222; min-width:2.3in; font:600 12.5px Arial; padding:0 2px 2px; }
  .concept{ border:1px solid var(--line); padding:15px 17px; display:flex; gap:18px; }
  .ctext{ flex:1; } .ctext p{ margin:0 0 9px; font-size:12.5px; }
  .ctext .ethics{ font-size:11px; color:#333; border-left:3px solid var(--mag); padding-left:9px; }
  .cmood{ width:2.3in; height:3.1in; object-fit:cover; border:1px solid var(--line); }
  /* front/back */
  .viewbox{ border:1px solid var(--line); padding:14px; display:flex; gap:16px; }
  .viewbox figure{ flex:1; margin:0; } .viewbox img{ width:100%; display:block; }
  .viewbox figcaption{ text-align:center; font:700 9px Arial; letter-spacing:.18em; color:#666; margin-top:6px; }
  .vnote{ font:600 10.5px Arial; color:#444; margin-top:10px; }
  /* details */
  .dgrid{ display:grid; grid-template-columns:3.05in 3.05in; justify-content:center; gap:0.24in 0.4in; }
  .dbox{ position:relative; aspect-ratio:3/4; overflow:hidden; border:1px solid #111; background:#efece6; }
  .dbox img{ width:100%; height:100%; object-fit:cover; display:block; }
  .dtab{ position:absolute; top:0; left:0; z-index:2; background:var(--lime); color:var(--navy);
         font:800 9px Arial; letter-spacing:.1em; padding:3px 11px 3px 8px; border-right:6px solid var(--mag); }
  .dcap{ font:600 10px Arial; color:#3a3a3a; margin:6px 2px 0; }
  /* colour story */
  .cgrid{ display:grid; grid-template-columns:repeat(4,1fr); gap:0.26in 0.22in; }
  .swatch{ position:relative; height:1.55in; border:1px solid #b9b3a7; }
  .swtab{ position:absolute; top:0; left:0; background:var(--lime); color:var(--navy); font:800 9px Arial;
          padding:3px 10px; border-right:6px solid var(--mag); }
  .swfield{ border-bottom:1px solid #333; margin-top:7px; padding-bottom:1px; }
  .swfield .l{ font:700 7px Arial; color:#7a7a7a; letter-spacing:.07em; display:block; }
  .swfield .v{ font:600 9.5px Arial; color:#111; }
  /* materials */
  .mat{ width:100%; border-collapse:collapse; }
  .mat th,.mat td{ border:1px solid #b9b3a7; vertical-align:top; }
  .mch{ background:var(--navy); color:var(--lime); width:2in; font:800 12px Arial; letter-spacing:.04em; text-align:left; padding:12px 14px; }
  .mdh{ background:var(--navy); color:#9fb0ff; font:800 12px Arial; letter-spacing:.04em; text-align:left; padding:12px 14px; }
  .mc{ font:700 13px Arial; padding:16px 14px; }
  .md{ font-size:12.5px; padding:16px 14px; line-height:1.5; }
  /* pro tables */
  .pro{ width:100%; border-collapse:collapse; margin:2px 0; }
  .pro th,.pro td{ border:1px solid var(--line); padding:4px 6px; font-size:10.5px; text-align:center; }
  .pro th{ background:var(--navy); color:var(--lime); font-weight:700; }
  .pro td.kl,.pro th.kl{ text-align:left; } .pro .kl{ font-weight:700; }
  .pro td.t{ color:#888; }
  .pro.lft th,.pro.lft td{ text-align:left; }
  .pro.sm th,.pro.sm td{ font-size:9.3px; padding:3px 5px; }
  .gap{ height:11px; }
  .pnote{ font-size:10.5px; line-height:1.5; color:#333; margin:9px 0 0; }
  .receipt{ font-family:ui-monospace,"SF Mono",Menlo,monospace; font-size:10px; line-height:1.55;
            background:var(--navy); color:#f4efe6; padding:9px 12px; margin:9px 0; border-radius:2px; }
  .receipt .src{ color:#aeb6cf; }
  .cols{ display:flex; gap:22px; margin-top:6px; }
  .cols>div{ flex:1; }
  .ch{ font:800 10.5px Arial; letter-spacing:.04em; color:var(--navy); margin:8px 0 0; border-bottom:2px solid var(--lime); padding-bottom:2px; }
</style></head><body>
${p1}${p2}${p3}${p4}${p5}${p6}${p7}${p8}${p9}${p10}${p11}
</body></html>`

const browser = await chromium.launch()
const pageObj = await browser.newPage()
await pageObj.setContent(HTML, { waitUntil: 'networkidle' })
await pageObj.pdf({ path: OUT, format: 'Letter', printBackground: true, preferCSSPageSize: true })
await browser.close()
console.log('wrote', OUT)
