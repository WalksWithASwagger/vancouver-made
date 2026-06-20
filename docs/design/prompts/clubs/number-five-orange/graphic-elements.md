# Graphic Elements Prompts — NUMBER FIVE ORANGE

**Goal:** Generate standalone graphics that composite onto the jersey templates — the
building blocks: surcharge/pole-stripe treatments, the marquee crest, the `WORK IS WORK`
sponsor bar, the patch spoof, nameplate, the silhouette number, hem microprint, and the
trophy-misuse marquee mark.

**Strategy:** High-quality elements on a white background for easy masking/extraction.

**Ethics:** Punch up — **never caricature the workers**. Human references stay abstract,
faceless silhouettes. No reproduced landmark photos.

**MJ settings:** `--ar 16:9 --style raw` (landscape for easier element extraction)

**Palette:** safety-cone orange `#ff6a00` · vinyl black `#0a0a0a` · merch gold `#d9a521` · neon marquee pink `#ff2d6f`

---

## Batch 1 — All-Over Print / Surface Treatments

### Prompt 1: Surcharge-line all-over pattern
```
seamless repeating pattern of fine "surcharge" lines and service-fee symbols,
itemized-tab motifs and small currency marks, thermal-receipt mono aesthetic,
vinyl-black line work on safety-cone orange,
tight repeat for sublimated jersey fabric,
white background --ar 16:9 --style raw
```

### Prompt 2: Cover-charge stamp repeat
```
seamless repeating pattern of rubber-stamp "COVER CHARGE" and "PAID AT DOOR" marks,
faded impressions, official seal texture, merch-gold and orange ink,
pattern density suitable for repeating down a sleeve,
white background --ar 16:9 --style raw
```

### Prompt 3: Metallic pole-stripe gradient bar
```
sleek vertical stripe, metallic gradient from safety-cone orange #ff6a00
through merch gold #d9a521 with a neon-pink #ff2d6f edge,
polished "pole" stripe, athletic sportswear trim finish,
suitable for a vertical torso accent,
white background --ar 16:9 --style raw
```

---

## Batch 2 — Crest / Shield Designs

### Prompt 4: Marquee crest, host-city shield
```
heraldic host-city shield outline,
inner art an orange theatre/stage marquee silhouette with a small bulb-lit sign,
no people, safety-cone orange and merch gold with vinyl-black line work,
official sports crest aesthetic, federal badge style,
white background --ar 16:9 --style raw
```

### Prompt 5: Neon-marquee crest variant
```
heraldic shield, inner art a buzzing neon door marquee in marquee-pink and orange,
glowing tube lettering shape, no text legible, no people,
gold outline, white negative space,
official badge style, professional crest, nightlife-emblem aesthetic,
white background --ar 16:9 --style raw
```

---

## Batch 3 — Sponsor Bar / Brand Treatments

### Prompt 6: WORK IS WORK sponsor bar
```
professional sponsor bar / brand bar layout,
text reads: "WORK IS WORK"
styled like a telecom or airline carrier wordmark, clean confident sans-serif,
metallic gold on a safety-cone orange rectangle,
official tournament sponsor aesthetic,
white background --ar 16:9 --style raw
```

### Prompt 7: Secondary tagline banner
```
official sponsor/tagline bar layout,
text reads: "PUBLIC LAND / PRIVATE PROFIT"
styled as secondary sponsor text, small caps, clean sans-serif,
white text on a vinyl-black field,
official sports branding, tournament ticker aesthetic,
white background --ar 16:9 --style raw
```

### Prompt 8: Patch spoof (FIFA Quality Pro slot)
```
official rectangular quality/authenticity patch,
reads "UNLICENSED / UNPAID / UNAPOLOGETIC" in three stacked lines,
where a tournament "quality pro" tag would sit,
gold border, orange field, official sports authenticity-tag aesthetic,
white background --ar 16:9 --style raw
```

---

## Batch 4 — Number / Name Graphics

### Prompt 9: Silhouette number treatment
```
large athletic jersey number "5" composed of tiny abstract faceless human silhouettes,
one side a queue of patrons entering, the other staff exiting a back door,
flat silhouettes only, no facial detail, no caricature,
vinyl-black figures forming the number on safety-cone orange,
clean modern number silhouette, suitable for jersey back or chest,
white background --ar 16:9 --style raw
```

### Prompt 10: Back-neck micro-sponsor + collar wristband
```
two small elements: a back-neck micro-sponsor tab reading "SAFER SPACES FC",
and a perforated tear-off VIP wristband band print,
merch gold and orange, official sports neck-tape aesthetic,
white background --ar 16:9 --style raw
```

---

## Batch 5 — Trim / Detail Graphics

### Prompt 11: Hem microprint citation
```
dense technical microtext suitable for jersey hem,
reads "NO.5 ORANGE · 205 MAIN ST · MELBOURNE HOTEL 1904 · NO.5 ORANGE SINCE 1971 · LAST OF OLD GASTOWN"
in tiny monospace font, professional fine-print aesthetic,
gold text on safety-cone orange, suitable for hem or care-label placement,
white background --ar 16:9 --style raw
```

### Prompt 12: Trophy-misuse mark — neon marquee
```
tournament trophy silhouette restyled as a buzzing neon door marquee,
glowing tube outline in marquee-pink and orange, geometric clean line art,
small accent graphic suitable for sleeve badge or collar detail, no people,
white background --ar 16:9 --style raw
```

---

## Composition Strategy

Once all elements land:
1. **Extract each on white background** → PNG with transparent background.
2. **Layer hierarchy:**
   - Base: safety-cone orange body, white sleeves
   - Layer 1: vertical metallic pole-stripe (torso)
   - Layer 2: surcharge-line / cover-charge surface treatment (subtle)
   - Layer 3: crest (left chest, marquee or neon variant)
   - Layer 4: sponsor bars (`WORK IS WORK` center chest; `SAFER SPACES FC` neck tape; patch spoof on sleeve)
   - Layer 5: name/number (silhouette number; nameplate)
   - Layer 6: trim/detail (collar wristband band, inside-hem "tab")
   - Layer 7: hem microprint (landmark citation)
3. **Color-lock:** orange `#ff6a00`, vinyl ink `#0a0a0a`, merch gold `#d9a521`, neon pink `#ff2d6f`.
4. **Test on the blank template** before finalizing — and confirm every figure is an
   abstract silhouette, never a caricature.

> **Receipt to source:** the hem line is `AL-N5-001` in `../../../../src/data/clubs.js`
> (Melbourne Hotel 1904 → No.5 Orange 1971). Source: *Eve Lazarus, "How the Melbourne
> Hotel became No5 Orange" (2022); no5orange.ca.* Reference only — recreate/illustrate, do
> not reproduce photos. Alt hem line `AL-N5-002` (Vancouver HRAP, final May 25 2026, names
> sex-worker safety / GBV / MMIWG2S+) if you want the policy receipt instead. No stat drifts from source.
