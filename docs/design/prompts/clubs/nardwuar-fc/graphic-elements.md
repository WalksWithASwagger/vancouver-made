# Graphic Elements Prompts — NARDWUAR FC

**Goal:** Generate standalone graphics that composite onto the jersey templates — the
building blocks: tartan all-over print, the collage crest, sponsor bars, the
Fair-Play-badge spoof, nameplate, number, hem microprint, and the trophy-misuse mark.

**Strategy:** High-quality elements on a white background for easy masking/extraction.

**Ethos, not likeness:** No face, no portrait, no caricature anywhere. The homage lives
in objects — tam silhouette, records, zines, mic stand.

**MJ settings:** `--ar 16:9 --style raw` (landscape for easier element extraction)

**Palette:** tartan red `#c8102e` · vinyl ink `#0a0a0a` · tartan green `#1d7a46` · tartan yellow `#e8c531`

---

## Batch 1 — All-Over Print Pattern Options

### Prompt 1: Ghosted riso-collage all-over print
```
seamless repeating pattern, ultra-faint collage of VHS labels, cassette
J-card spines, 7-inch record labels and photocopied flyer scraps,
tonal tartan-red and green riso ink, microtype interview quotes woven through,
tight repeat for sublimated jersey fabric, walking-archive texture, no faces,
white background --ar 16:9 --style raw
```

### Prompt 2: Tartan check, clean home-kit base
```
seamless tartan check pattern, tartan red #c8102e crossed with tartan green
#1d7a46 and a thin tartan yellow #e8c531 overcheck,
clean heritage sett, ghosted soft as a sublimated jersey base,
official home-kit textile aesthetic,
white background --ar 16:9 --style raw
```

### Prompt 3: Microtext local-history overlay
```
repeating layer of tiny monospace microtext,
Vancouver underground history notes and interview quotes (Gastown, CiTR, punk venues),
faint tonal toner-black on bone, subtle ornamental document layer,
white background --ar 16:9 --style raw
```

---

## Batch 2 — Crest / Shield Designs

### Prompt 4: Collage crest, host-city shield
```
heraldic host-city shield outline,
inner art a collage of 7-inch records, photocopied show flyers and a
tartan tam-o'-shanter hat silhouette where a lion or maple leaf would sit,
no face, objects only,
tartan red green yellow with vinyl-black line work,
official sports crest aesthetic, federal badge style,
white background --ar 16:9 --style raw
```

### Prompt 5: Mic-stand / spindle crest variant
```
heraldic shield, inner art a vintage microphone on a chrome stand
crossed with a vinyl record spindle, tam silhouette above,
no person, objects only,
gold and tartan-red outline, white negative space,
official badge style, professional crest, broadcast-emblem aesthetic,
white background --ar 16:9 --style raw
```

---

## Batch 3 — Sponsor Bar / Brand Treatments

### Prompt 6: WHO BENEFITS? WHO PAYS? sponsor bar
```
professional sponsor bar / brand bar layout,
text reads: "WHO BENEFITS? WHO PAYS?"
styled like an official sports sponsor wordmark, clean sans-serif,
tartan red on bone rectangle,
official tournament sponsor aesthetic,
white background --ar 16:9 --style raw
```

### Prompt 7: Secondary tagline banner
```
official sponsor/tagline bar layout,
text reads: "INTERVIEW YOUR CITY LIKE NARDWUAR"
styled as secondary sponsor text, small caps, clean sans-serif,
vinyl-black text on bone field,
official sports branding, tournament ticker aesthetic,
white background --ar 16:9 --style raw
```

### Prompt 8: Fair-Play badge spoof
```
official "Fair Play" style circular badge,
reads "DEEP RESEARCH" arched over "HUMAN SERVIETTE REPORTING CLUB",
tartan-green border, bone field, small enough for sleeve placement,
styled like tournament fair-play/conduct badges, official sports emblem aesthetic,
white background --ar 16:9 --style raw
```

---

## Batch 4 — Number / Name Graphics

### Prompt 9: Ransom-note nameplate
```
athletic jersey nameplate,
reads "NARDWUAR!!" in chaotic cut-and-paste ransom-note lettering,
clipped photocopied fonts, mismatched sizes, riso-red and black,
arched banner format, punk-zine collage energy on a clean sports nameplate,
white background --ar 16:9 --style raw
```

### Prompt 10: Number from record sleeves / zine panels
```
large athletic jersey number "97" composed of tiny rectangles,
each rectangle a miniature record sleeve or zine panel,
tartan-red and green fills, vinyl-black outline,
clean modern number silhouette built from collage tiles,
suitable for jersey back or chest,
white background --ar 16:9 --style raw
```

---

## Batch 5 — Trim / Detail Graphics

### Prompt 11: Hem microprint citation
```
dense technical microtext suitable for jersey hem,
reads "APEC VANCOUVER 1997 · NARDWUAR TO PM CHRETIEN ON PEPPER SPRAY · 'FOR ME, PEPPER, I PUT IT ON MY PLATE'"
in tiny monospace font, professional fine-print aesthetic,
tartan-red text on bone, suitable for hem or care-label placement,
white background --ar 16:9 --style raw
```

### Prompt 12: Trophy-misuse mark — mic stand / spindle
```
tournament trophy silhouette restyled as a vintage microphone on a stand
fused with a vinyl record spindle, geometric clean line art,
tartan-red outline on bone, small accent graphic,
suitable for sleeve badge or collar detail, no face,
white background --ar 16:9 --style raw
```

---

## Composition Strategy

Once all elements land:
1. **Extract each on white background** → PNG with transparent background.
2. **Layer hierarchy:**
   - Base: tartan check body (clean home-kit sett)
   - Layer 1: ghosted riso-collage all-over print (records / flyers / microtext)
   - Layer 2: crest (left chest, collage or mic-stand variant)
   - Layer 3: sponsor bars (center chest + neck tape; inside-collar `DOOT DOOLA DOOT DOO…`)
   - Layer 4: name/number (ransom-note `NARDWUAR!!` + collage-tile number)
   - Layer 5: Fair-Play badge spoof (sleeve)
   - Layer 6: hem microprint (APEC 1997 citation)
3. **Color-lock:** tartan red `#c8102e`, green `#1d7a46`, yellow `#e8c531`, vinyl ink `#0a0a0a`, bone for newsprint variants.
4. **Test on the blank template** before finalizing the composite — and confirm no
   prompt has produced a human likeness.

> **Receipt to source:** the hem line is `AL-NW-001` in `../../../../src/data/clubs.js`
> (APEC 1997, Chrétien). Source: *Nardwuar footage; The Canadian Encyclopedia; CBC archives.*
> Reference/quote with citation; do not reproduce footage stills. No stat drifts from source.
