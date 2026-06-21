// Renders the filled Formme-style tech pack PDF for NARDWUAR FC "Deep Cut" (Home/red).
// Fills the repo's 10-section tech-pack template with the locked specs from
// docs/deliverables/nardwuar/nardwuar-deep-cut-techpack.md + docs/research/tech-pack-spec.md
// (incl. the POM grid that was an empty table in the old hand-authored PDF).
//
// Flats are downscaled with macOS `sips` and base64-inlined so the output is a single
// self-contained ~1 MB PDF. Run: node scripts/build-techpack.mjs
// Prereqs: playwright chromium (already installed), sips (macOS built-in).

import { chromium } from 'playwright'
import { execFileSync } from 'node:child_process'
import { readFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

const ROOT = process.cwd()
const NARD = join(ROOT, 'docs', 'deliverables', 'nardwuar')
const OUT = join(NARD, 'NARDWUAR_techpack.pdf')

// downscale a source PNG to a base64 JPEG data URI (max edge 1400px)
function img(name) {
  const src = join(NARD, name)
  const out = join(tmpdir(), `tp-${name.replace(/\.png$/, '')}.jpg`)
  execFileSync('sips', ['-s', 'format', 'jpeg', '-Z', '1400', src, '--out', out], { stdio: 'ignore' })
  const b64 = readFileSync(out).toString('base64')
  rmSync(out, { force: true })
  return `data:image/jpeg;base64,${b64}`
}

const FRONT = img('nardwuar-home-front-flat.png')
const BACK = img('nardwuar-home-back-flat.png')
const RENDER = img('nardwuar-home-3d-render.png')

const sw = (hex) => `<span class="sw" style="background:${hex}"></span>`

const HTML = `<!doctype html><html lang="en"><head><meta charset="utf-8"><style>
  :root{ --red:#c8102e; --ink:#0a0a0a; --line:#d9d4cb; --muted:#6b6b6b; --bone:#f7f4ee; }
  *{ box-sizing:border-box; }
  html{ -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  body{ font:13px/1.5 -apple-system,"Helvetica Neue",Arial,sans-serif; color:var(--ink); margin:0; }
  code,.mono{ font-family:ui-monospace,"SF Mono",Menlo,Consolas,monospace; }
  h1{ font-size:30px; line-height:1.05; margin:0 0 4px; letter-spacing:-.01em; }
  h1 small{ display:block; font-size:13px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; color:var(--red); margin-bottom:10px; }
  h2{ font-size:16px; margin:0 0 10px; padding-bottom:6px; border-bottom:2px solid var(--ink);
      letter-spacing:.01em; break-after:avoid; }
  h2 .n{ color:var(--red); margin-right:8px; }
  section{ margin:0 0 22px; break-inside:avoid; }
  p{ margin:0 0 9px; }
  .sub{ color:var(--muted); }
  .lede{ font-size:14px; }
  table{ width:100%; border-collapse:collapse; margin:2px 0 6px; }
  th,td{ border:1px solid var(--line); padding:6px 9px; text-align:left; vertical-align:top; font-size:12px; }
  th{ background:var(--bone); font-weight:700; }
  td.k{ font-weight:700; white-space:nowrap; }
  tr{ break-inside:avoid; }
  .pom th,.pom td{ text-align:center; padding:5px 6px; font-size:11.5px; }
  .pom td.k,.pom th.k{ text-align:left; }
  .pom td.tol{ color:var(--muted); white-space:nowrap; }
  .sw{ display:inline-block; width:13px; height:13px; border:1px solid #0003; border-radius:2px;
       vertical-align:-2px; margin-right:7px; }
  .note{ border-left:3px solid var(--red); background:var(--bone); padding:10px 13px; margin:10px 0;
         font-size:12.5px; break-inside:avoid; }
  .note b{ letter-spacing:.02em; }
  .receipt{ font-family:ui-monospace,"SF Mono",Menlo,monospace; font-size:11.5px; line-height:1.6;
            background:#0a0a0a; color:#f4efe6; padding:11px 13px; border-radius:3px; }
  .receipt .src{ color:#b9b2a4; }
  ul{ margin:0 0 9px; padding-left:20px; }
  li{ margin:0 0 5px; }
  .flats{ display:flex; gap:14px; margin:6px 0 4px; }
  .flats figure{ flex:1; margin:0; }
  .flats img{ width:100%; border:1px solid var(--line); border-radius:3px; display:block; background:#fff; }
  .flats figcaption{ font-size:11px; color:var(--muted); text-align:center; margin-top:4px; letter-spacing:.06em; text-transform:uppercase; }
  .cover{ display:flex; gap:20px; align-items:flex-start; margin-bottom:10px; }
  .cover .meta{ flex:1; }
  .cover img{ width:200px; border:1px solid var(--line); border-radius:4px; }
  .chk li{ list-style:none; margin-left:-20px; }
  .chk .done::before{ content:"\\2611  "; color:var(--red); }
  .chk .todo::before{ content:"\\2610  "; color:var(--muted); }
  .small{ font-size:11px; color:var(--muted); }
  .pillrow{ margin:8px 0 2px; }
  .pill{ display:inline-block; font-size:11px; border:1px solid var(--line); border-radius:20px;
         padding:2px 10px; margin:0 5px 5px 0; background:#fff; }
</style></head><body>

<section>
  <div class="cover">
    <div class="meta">
      <h1><small>Vancouver Made · MADE ON · Formme Fashion Design Track</small>
        Tech Pack — Nardwuar FC<br>“Deep Cut” Home Kit</h1>
      <p class="lede sub">A host-nation home kit in Vancouver-tartan red that’s secretly a walking
        archive — an ultra-faint all-over collage of 7&Prime; records, photocopied flyers and interview
        microtext. Homage to Nardwuar the Human Serviette. <em>Research is the protest; the receipt
        is the weapon.</em></p>
      <div class="pillrow">
        <span class="pill">Style&nbsp;No. NW-01</span>
        <span class="pill">Home / red colorway</span>
        <span class="pill">Designer: Kris Krüg</span>
        <span class="pill">June 20, 2026</span>
      </div>
    </div>
    <img src="${RENDER}" alt="Nardwuar FC home kit 3D render">
  </div>
  <div class="note"><b>HOMAGE, NOT LIKENESS — hard constraint.</b> No face anywhere on the garment
    or in renders; the homage is carried by objects (tam, mic, 7&Prime; records, zines). Nardwuar’s name
    is not commercialized. Competition exhibition is clear; any move toward sale/merch requires
    Nardwuar’s blessing first. This pack documents the <b>Home (red)</b> colorway — the kit also ships
    as <b>black (Away)</b> and <b>white + gold-foil (Limited)</b>, sharing one block and differing only
    in ground + accent.</div>
</section>

<section>
  <h2><span class="n">1</span>Style Summary</h2>
  <table>
    <tr><td class="k">Collection</td><td>VANCOUVER MADE / MADE ON</td></tr>
    <tr><td class="k">Style name</td><td>Nardwuar FC — “Deep Cut” Home Kit</td></tr>
    <tr><td class="k">Style no.</td><td class="mono">NW-01</td></tr>
    <tr><td class="k">Category</td><td>Soccer kit — jersey (home) + match shorts (+ socks)</td></tr>
    <tr><td class="k">Designer</td><td>Kris Krüg</td></tr>
    <tr><td class="k">Date</td><td>June 20, 2026</td></tr>
    <tr><td class="k">Fit</td><td>Unisex relaxed match-fit — standard football jersey block (replica / stadium cut; trim, not boxy)</td></tr>
    <tr><td class="k">Size run</td><td>XS – 3XL (women’s + youth cut as options; grade documented to 5XL)</td></tr>
    <tr><td class="k">Concept (one line)</td><td>The World Cup arrives as spectacle; this kit answers with the archive. A clean host-nation home shirt that, up close, is a cited record of who benefits and who pays — worn in homage to Vancouver’s human serviette.</td></tr>
  </table>
</section>

<section>
  <h2><span class="n">2</span>Flat Sketch &amp; Callouts</h2>
  <div class="flats">
    <figure><img src="${FRONT}" alt="Front flat"><figcaption>Front flat</figcaption></figure>
    <figure><img src="${BACK}" alt="Back flat"><figcaption>Back flat</figcaption></figure>
  </div>
  <p class="small">Callouts below are numbered to match Section 5 (Artwork &amp; Placement).
    Ground carries an ultra-faint all-over collage of 7&Prime; records, photocopied flyers and interview
    microtext with the Vancouver-tartan check ghosted in — all sublimated into the cloth.</p>
  <table>
    <tr><th>#</th><th>Callout</th><th>#</th><th>Callout</th></tr>
    <tr><td class="mono">1</td><td>Collage crest — left chest</td><td class="mono">6</td><td>“NARDWUAR!!” nameplate — upper back</td></tr>
    <tr><td class="mono">2</td><td>“WHO BENEFITS? WHO PAYS?” sponsor bar — centre chest</td><td class="mono">7</td><td>“97” number — centre back</td></tr>
    <tr><td class="mono">3</td><td>“VANCOUVER” wordmark — upper chest</td><td class="mono">8</td><td>“NO GAME WITHOUT THE GROUND” back-neck badge</td></tr>
    <tr><td class="mono">4</td><td>Neck tape “DOOT DOOLA DOOT DOO” — inner collar</td><td class="mono">9</td><td>Hem citation (the receipt) — front hem</td></tr>
    <tr><td class="mono">5</td><td>“DEEP RESEARCH” patch — right sleeve</td><td></td><td></td></tr>
  </table>
</section>

<section>
  <h2><span class="n">3</span>Colorway — Home (red)</h2>
  <table>
    <tr><th>Placement</th><th>Colour name</th><th>HEX</th><th>Pantone (TCX/C — confirm w/ Formme)</th><th>Finish</th></tr>
    <tr><td class="k">Body base / ground</td><td>Tartan red</td><td class="mono">${sw('#c8102e')}#c8102e</td><td>≈ PMS 186 C <span class="small">[confirm]</span></td><td>matte / jersey knit</td></tr>
    <tr><td class="k">Line work / microtext / crest outline</td><td>Vinyl ink</td><td class="mono">${sw('#0a0a0a')}#0a0a0a</td><td>≈ PMS Black 6 C <span class="small">[confirm]</span></td><td>matte</td></tr>
    <tr><td class="k">Check + shoulder / side trim</td><td>Tartan green</td><td class="mono">${sw('#1d7a46')}#1d7a46</td><td>≈ PMS 7732 C <span class="small">[confirm]</span></td><td>matte</td></tr>
    <tr><td class="k">Check accent</td><td>Tartan yellow</td><td class="mono">${sw('#e8c531')}#e8c531</td><td>≈ PMS 7406 C <span class="small">[confirm]</span></td><td>matte</td></tr>
    <tr><td class="k">Hem / trim accent</td><td>Gold (counterfeit-official)</td><td class="mono">${sw('#d9a521')}#d9a521</td><td>≈ PMS 7555 C <span class="small">[confirm]</span></td><td>matte (gold-foil on the Limited colorway)</td></tr>
    <tr><td class="k">Collar / cuff</td><td>Self-fabric bound, tartan red</td><td class="mono">${sw('#c8102e')}#c8102e</td><td>—</td><td>self-fabric bind (or 1×1 rib in tartan green)</td></tr>
  </table>
  <p class="small">Build all colour at print size against Formme’s ICC profile and approve on a lab-dip
    before the run — accuracy is the armor.</p>
</section>

<section>
  <h2><span class="n">4</span>Bill of Materials (BOM)</h2>
  <table>
    <tr><th>Component</th><th>Spec</th><th>Notes</th></tr>
    <tr><td class="k">Main body (jersey)</td><td>Ocean-bound / Parley-style recycled-PET interlock, ~150 gsm, GRS + OEKO-TEX STANDARD 100, optical-bright, fibre-integrated wicking — sublimation-ready</td><td>“Made on ocean plastic.” Confirm Formme’s stock weight + mill</td></tr>
    <tr><td class="k">Shorts body</td><td>Ocean-bound recycled-PET interlock, ~180 gsm, GRS + OEKO-TEX 100</td><td>Heavier for opacity + abrasion; still light</td></tr>
    <tr><td class="k">Collar / cuffs</td><td>Self-fabric bound (lets the check wrap edge-to-edge) — or 1×1 poly/spandex rib, tartan green</td><td>Inner collar prints “DOOT DOOLA DOOT DOO”</td></tr>
    <tr><td class="k">Waistband</td><td>Elastic + internal drawcord</td><td>Upgrade: jacquard elastic w/ MADE ON wordmark</td></tr>
    <tr><td class="k">All-over print</td><td>Dye-sublimation, edge-to-edge, before cut-and-sew</td><td>300 DPI at size; 0.25&Prime; bleed (§6)</td></tr>
    <tr><td class="k">Sleeve patch</td><td>“DEEP RESEARCH” — woven or hybrid sublimated-twill</td><td>Right sleeve; raised retro option</td></tr>
    <tr><td class="k">Name / number</td><td>Sublimated (carries the ransom-note collage; zero hand)</td><td>FIFA-safe sizing (§5)</td></tr>
    <tr><td class="k">Hem micro-type</td><td>Sublimated, vector, sans-serif, ~6–8 pt</td><td>Proof on the real blank (§6)</td></tr>
    <tr><td class="k">Neck label</td><td>Woven brand flag + tagless heat-transfer care/size</td><td>Territorial acknowledgement (§7)</td></tr>
    <tr><td class="k">Hangtag</td><td>Recycled / FSC card = the manifesto card</td><td>Soy ink, jute/paper string (§7)</td></tr>
    <tr><td class="k">Thread</td><td>Tonal to body</td><td>Contrast only as a deliberate choice</td></tr>
  </table>
</section>

<section>
  <h2><span class="n">5</span>Artwork &amp; Placement <span class="sub" style="font-weight:400;font-size:13px">— the heart of this kit</span></h2>
  <table>
    <tr><th>#</th><th>Element</th><th>Placement</th><th>Size / position</th><th>Artwork detail</th><th>Citation</th></tr>
    <tr><td class="mono">1</td><td class="k">Collage crest</td><td>Left chest</td><td>~80 mm tall, ~90 mm from shoulder seam</td><td>Mic-and-records host-city shield — <b>objects only, no face</b></td><td>—</td></tr>
    <tr><td class="mono">2</td><td class="k">Sponsor bar</td><td>Centre chest</td><td>~220 mm wide, centred</td><td>“WHO BENEFITS? WHO PAYS?” counter-message lockup</td><td>—</td></tr>
    <tr><td class="mono">3</td><td class="k">“VANCOUVER” wordmark</td><td>Upper chest</td><td>across chest</td><td>Host-nation wordmark (no “’26”)</td><td>—</td></tr>
    <tr><td class="mono">4</td><td class="k">Neck tape</td><td>Inner collar</td><td>woven, full width</td><td>“DOOT DOOLA DOOT DOO”</td><td>—</td></tr>
    <tr><td class="mono">5</td><td class="k">“DEEP RESEARCH” patch</td><td>Right sleeve</td><td>Fair-Play-style patch</td><td>“DEEP RESEARCH / HUMAN SERVIETTE REPORTING CLUB”</td><td>—</td></tr>
    <tr><td class="mono">6</td><td class="k">Nameplate</td><td>Upper back</td><td>~60 mm caps; 5–7.5 cm, ≥4 cm above number (FIFA 7.5)</td><td>“NARDWUAR!!” — ransom-note cut-and-paste</td><td>—</td></tr>
    <tr><td class="mono">7</td><td class="k">Number</td><td>Centre back</td><td>~250 mm; 25–35 cm tall, stroke 3–5 cm (FIFA 6.4)</td><td>“97” built from tiny record-sleeve / zine-panel rectangles</td><td>—</td></tr>
    <tr><td class="mono">8</td><td class="k">Back-neck badge</td><td>Back neck</td><td>small</td><td>“NO GAME WITHOUT THE GROUND”</td><td>—</td></tr>
    <tr><td class="mono">9</td><td class="k">Hem citation</td><td>Front hem, inside-out readable</td><td>8 mm mono caps</td><td>The receipt — printed where fibre-content / wash care goes</td><td>AL-NW-001</td></tr>
  </table>
  <div class="receipt">APEC 1997, VANCOUVER · NARDWUAR ASKED PM CHRÉTIEN ABOUT PEPPER SPRAY ON
    PROTESTERS · “FOR ME, PEPPER, I PUT IT ON MY PLATE” · AHEAD OF THE HUGHES/APEC INQUIRY INTO RCMP
    CONDUCT<br><span class="src">Source: Nardwuar footage · The Canadian Encyclopedia · CBC archives (AL-NW-001)</span></div>
  <div class="note"><b>Rule for this collection:</b> any factual claim on the garment carries its
    source on the hem in kit-maker spec type. The receipts are part of the garment, not a caption
    beside it. Nothing unverified ships.</div>
</section>

<section>
  <h2><span class="n">6</span>Print Method Notes</h2>
  <ul>
    <li><b>All-over (tartan check + records/flyers collage):</b> dye-sublimation, edge-to-edge, before cut-and-sew — the only method for fine edge-to-edge detail dyed into poly with zero hand.</li>
    <li><b>Fine micro-type</b> (hem citation, “DOOT DOOLA” neck tape, the “97” rectangles): sublimated vector ~6–8 pt. The woven texture is the true limiter, not the printer — <b>proof on the real rPET blank</b>. Fallback: fine screen / high-density heat transfer.</li>
    <li><b>Name / number:</b> sublimated (not applied) so the ransom-note collage stays intact and there’s nothing to peel or crack.</li>
    <li><b>“DEEP RESEARCH” sleeve patch:</b> woven, or hybrid sublimated-twill for a raised retro feel.</li>
    <li><b>No metallic on the red Home</b> — the gold reads as matte “counterfeit-official.” The white Limited colorway uses gold-foil; confirm Formme can run foil / metallic HTV.</li>
  </ul>
</section>

<section>
  <h2><span class="n">7</span>Labelling, Hangtag &amp; Packaging</h2>
  <ul>
    <li><b>Main woven label (inner neck):</b> MADE ON · style no. <span class="mono">NW-01</span> · size · “made on unceded xʷməθkʷəy̓əm (Musqueam), Sḵwx̱wú7mesh (Squamish), səlilwətaɬ (Tsleil-Waututh) territory.”</li>
    <li><b>Care label:</b> tagless heat-transfer. Build one dual-market label — bilingual EN/FR fibre content + % by weight (Canada), US-compliant care + ASTM D5489 symbols, country of origin, a CA Identification Number + RN. One line of the citation continued, so even the legally-required label carries the message.</li>
    <li><b>No real FIFA / club / sponsor marks</b> — evoke the grammar, never reproduce a mark. The FIFA “Fair Play” badge is re-spoofed as “DEEP RESEARCH.”</li>
    <li><b>Hangtag = the manifesto card.</b> Side A: the MADE ON statement (short form). Side B: this kit’s receipts + a QR to a DTES / land-back org. Recycled/FSC card, soy ink, jute string, no lamination.</li>
    <li><b>Packaging:</b> minimal, recycled, unbranded — the anti-merch finish.</li>
  </ul>
</section>

<section>
  <h2><span class="n">8</span>Measurement Spec — Point of Measure</h2>
  <p class="small">Base size <b>M</b>. Circumferences (chest, hem, neck, waist, hip, thigh, leg
    opening) are <b>½-measures — garment laid flat, ×2 for the body</b>. Lengths are direct.
    Lead unit cm. Rows marked <span class="mono">ᶜ</span> are interpolated to standard regular-fit
    ratios — <b>confirm on Formme’s block + first sample</b>. Full dual-unit grid + grading in
    <span class="mono">tech-pack-spec.md §2</span>.</p>

  <p class="small" style="margin-bottom:2px"><b>Jersey (cm)</b> — short-sleeve, set-in</p>
  <table class="pom">
    <tr><th class="k">POM</th><th>XS</th><th>S</th><th>M</th><th>L</th><th>XL</th><th>2XL</th><th>3XL</th><th>Tol.</th></tr>
    <tr><td class="k">Chest, ½ (1&Prime; below armhole)</td><td>43</td><td>45.5</td><td>51</td><td>56</td><td>61</td><td>66</td><td>71</td><td class="tol">±1.5</td></tr>
    <tr><td class="k">Body length (HPS→hem)</td><td>68.5</td><td>71</td><td>73.5</td><td>76</td><td>79</td><td>81.5</td><td>84</td><td class="tol">±1.5</td></tr>
    <tr><td class="k">Across shoulder <span class="mono">ᶜ</span></td><td>41.5</td><td>42.5</td><td>44.5</td><td>47</td><td>49.5</td><td>52</td><td>54.5</td><td class="tol">±0.6</td></tr>
    <tr><td class="k">Sleeve length (shoulder→cuff)</td><td>19.5</td><td>20.5</td><td>21</td><td>21.5</td><td>22</td><td>23</td><td>23.5</td><td class="tol">±0.6</td></tr>
    <tr><td class="k">Hem opening, ½ <span class="mono">ᶜ</span></td><td>42</td><td>44.5</td><td>49.5</td><td>54.5</td><td>59.5</td><td>65</td><td>70</td><td class="tol">±1.5</td></tr>
    <tr><td class="k">Neck width, ½ (seam→seam) <span class="mono">ᶜ</span></td><td>15</td><td>16</td><td>16.5</td><td>17</td><td>18</td><td>18.5</td><td>19</td><td class="tol">±0.3</td></tr>
  </table>

  <p class="small" style="margin-bottom:2px"><b>Shorts (cm)</b> — pull-on, elastic + drawcord</p>
  <table class="pom">
    <tr><th class="k">POM</th><th>XS</th><th>S</th><th>M</th><th>L</th><th>XL</th><th>2XL</th><th>3XL</th><th>Tol.</th></tr>
    <tr><td class="k">Waist relaxed, ½</td><td>32</td><td>34</td><td>37</td><td>39.5</td><td>43</td><td>47</td><td>51</td><td class="tol">±1.5</td></tr>
    <tr><td class="k">Waist stretched, ½ <span class="mono">ᶜ</span></td><td>42</td><td>44.5</td><td>47</td><td>51</td><td>54.5</td><td>59.5</td><td>65</td><td class="tol">±1.5</td></tr>
    <tr><td class="k">Hip / seat, ½ <span class="mono">ᶜ</span></td><td>47</td><td>49.5</td><td>53</td><td>57</td><td>61</td><td>65</td><td>68.5</td><td class="tol">±1.5</td></tr>
    <tr><td class="k">Front rise (incl. wb) <span class="mono">ᶜ</span></td><td>24</td><td>25</td><td>26</td><td>27.5</td><td>28.5</td><td>30</td><td>31</td><td class="tol">±0.6</td></tr>
    <tr><td class="k">Inseam</td><td>18</td><td>18</td><td>18</td><td>18</td><td>18.5</td><td>19</td><td>19.5</td><td class="tol">±0.6</td></tr>
    <tr><td class="k">Total length / outseam <span class="mono">ᶜ</span></td><td>39.5</td><td>40.5</td><td>42</td><td>43</td><td>44.5</td><td>45.5</td><td>47</td><td class="tol">±1.5</td></tr>
  </table>
  <p class="small">Fitting rule for the chart: <b>self-select by chest (jersey) / waist (shorts); if between sizes, size up.</b>
    Graphic-led kit — the block stays standard; all design work is on the surface.</p>
</section>

<section>
  <h2><span class="n">9</span>Construction Notes</h2>
  <ul>
    <li>Standard football-jersey construction; no structural changes. <b>Silhouette: short-sleeve, set-in</b> — the all-over collage + tartan check want an unbroken canvas (the collection’s signature ¾ raglan is dropped here so the print runs uninterrupted).</li>
    <li>Seams: overlock (serger) panel seaming, 5-thread safety on load-bearing side seams; <b>coverstitch</b> hems &amp; openings; <b>flatlock</b> at skin-contact zones (underarm, inner thigh); <b>bartack</b> stress points. Tonal thread.</li>
    <li>Neckline: crew, self-fabric bound (the check wraps edge-to-edge); inside collar reads “DOOT DOOLA DOOT DOO.”</li>
    <li>Labels: tagless heat-transfer + woven flag only (no scratchy print-on-neck).</li>
    <li>All design intent is in <b>surface graphic + finish</b> — fully manufacturable in one production pass.</li>
  </ul>
</section>

<section>
  <h2><span class="n">10</span>Judging-Deliverable &amp; Pre-Production Checklist</h2>
  <ul class="chk">
    <li class="done">Front + back flat with numbered callouts (Section 2)</li>
    <li class="done">Colorway with hex (Section 3)</li>
    <li class="done">Artwork &amp; placement sheet with citations (Section 5)</li>
    <li class="done">One-line concept + manifesto card text (Sections 1, 7)</li>
    <li class="done">Print method specified (Section 6)</li>
    <li class="done">Measurement spec / POM (Section 8)</li>
    <li class="todo">This tech pack submitted as the final deliverable</li>
  </ul>
  <p class="small" style="margin-top:6px"><b>Formme pre-production [confirm] — hand to the maker before the run:</b></p>
  <ul class="small">
    <li>Lab-dip approves the five colorway hexes on the rPET base; gsm verified on strike-off; sublimation hand-feel on the optical-bright base.</li>
    <li>All microtext legible at print resolution; the “97” rectangles hold at distance.</li>
    <li>Crest/patch contain <b>no face</b>; wordmarks spell “VANCOUVER” / “NARDWUAR!!” exactly.</li>
    <li>Neck-label territorial acknowledgement present; one dual-market care/legal label (bilingual EN/FR fibre %, CA number + RN, country of origin, US-compliant care + ASTM D5489 symbols).</li>
    <li>Confirm the league’s equipment regs if non-FIFA; else FIFA cm ranges default.</li>
  </ul>
</section>

</body></html>`

const header = `<div style="font-size:8px;color:#9a948a;width:100%;text-align:center;font-family:-apple-system,Arial,sans-serif;">
  VANCOUVER MADE · MADE ON — TECH PACK</div>`
const footer = `<div style="font-size:8px;color:#9a948a;width:100%;padding:0 14mm;display:flex;justify-content:space-between;font-family:-apple-system,Arial,sans-serif;">
  <span>NW-01 · NARDWUAR FC — “DEEP CUT” (HOME)</span>
  <span>Page <span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`

const browser = await chromium.launch()
const page = await browser.newPage()
await page.setContent(HTML, { waitUntil: 'networkidle' })
await page.pdf({
  path: OUT,
  format: 'Letter',
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: header,
  footerTemplate: footer,
  margin: { top: '16mm', bottom: '15mm', left: '14mm', right: '14mm' },
})
await browser.close()
console.log('wrote', OUT)
