#!/usr/bin/env python3
"""Compose the Nardwuar final-kit flats into catalog/display montages (exact art).

Run with the rafiki venv python (has Pillow):
  /Users/kk/Code/rafiki/.venv/bin/python scripts/build-nardwuar-catalog.py
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

RUN = Path(
    "/Users/kk/Code/vancouver-made/docs/design/prompts/clubs/nardwuar-fc/"
    "rafiki/images/run-20260620-154408"
)
OUT = Path(
    "/Users/kk/Code/vancouver-made/docs/design/prompts/clubs/nardwuar-fc/supporting/catalog"
)
OUT.mkdir(parents=True, exist_ok=True)

INK = (14, 14, 14)
BONE = (244, 241, 234)
RED = (200, 16, 46)

F = {
    "home_front": "01-home-red-jersey-front.png",
    "home_back": "02-home-red-jersey-back.png",
    "home_kit": "05-home-red-full-kit-flat-lay.png",
    "away_front": "06-away-black-jersey-front.png",
    "away_back": "07-away-black-jersey-back.png",
    "away_kit": "10-away-black-full-kit-flat-lay.png",
    "ltd_front": "11-limited-white-foil-jersey-front.png",
    "ltd_back": "12-limited-white-foil-jersey-back.png",
    "ltd_kit": "15-limited-white-foil-full-kit-flat-lay.png",
    "patch": "16-detail-deep-research-sleeve-patch-close-up.png",
    "crest": "17-detail-mic-and-records-collage-crest-close-up.png",
}


def load(key):
    return Image.open(RUN / F[key]).convert("RGBA")


def font(size):
    for p in (
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/HelveticaNeue.ttc",
        "/Library/Fonts/Arial.ttf",
    ):
        try:
            return ImageFont.truetype(p, size)
        except Exception:
            continue
    return ImageFont.load_default()


def fit_h(img, h):
    w = round(img.width * h / img.height)
    return img.resize((w, h), Image.LANCZOS)


def text_center(draw, cx, y, s, fnt, fill):
    b = draw.textbbox((0, 0), s, font=fnt)
    draw.text((cx - (b[2] - b[0]) / 2, y), s, font=fnt, fill=fill)


def board(bg, size):
    return Image.new("RGBA", size, bg + (255,))


# ── 1. Kit-family board: three front flats, FIFA-launch wall ──────────────
def kit_family():
    panel_h = 1180
    items = [("HOME", "home_front"), ("AWAY", "away_front"), ("LIMITED", "ltd_front")]
    flats = [fit_h(load(k), panel_h) for _, k in items]
    gap, pad, label_h = 70, 90, 170
    W = pad * 2 + sum(f.width for f in flats) + gap * (len(flats) - 1)
    H = pad + label_h + panel_h + pad
    c = board(INK, (W, H))
    d = ImageDraw.Draw(c)
    text_center(d, W // 2, 46, "NARDWUAR FC · VANCOUVER · MADE ON", font(54), BONE)
    x = pad
    for (label, _), f in zip(items, flats):
        cx = x + f.width // 2
        text_center(d, cx, pad + label_h - 70, label, font(60), RED if label == "HOME" else BONE)
        c.alpha_composite(f, (x, pad + label_h))
        x += f.width + gap
    c.convert("RGB").save(OUT / "kit-family-board.png", quality=95)
    return "kit-family-board.png", c.size


# ── 2. Red hero sheet (the submission card) ───────────────────────────────
def red_hero():
    big_h = 1180
    front = fit_h(load("home_front"), big_h)
    small_h = 560
    back = fit_h(load("home_back"), small_h)
    kit = fit_h(load("home_kit"), small_h)
    patch = fit_h(load("patch"), small_h - 280)
    pad, gap = 90, 60
    right_w = max(back.width, kit.width, patch.width)
    W = pad + front.width + gap + right_w + pad
    H = pad + 150 + big_h + pad
    c = board(BONE, (W, H))
    d = ImageDraw.Draw(c)
    d.text((pad, 50), "NARDWUAR FC — DEEP CUT", font=font(70), fill=INK)
    d.text((pad, 130), "Home / Vancouver Tartan · the submission", font=font(40), fill=RED)
    top = pad + 150
    c.alpha_composite(front, (pad, top))
    rx = pad + front.width + gap
    c.alpha_composite(back, (rx, top))
    c.alpha_composite(kit, (rx, top + small_h + gap))
    c.alpha_composite(patch, (rx, top + (small_h + gap) * 2))
    c.convert("RGB").save(OUT / "red-hero-sheet.png", quality=95)
    return "red-hero-sheet.png", c.size


# ── 3. Per-colorway product cards (square, Shopify-ready) ──────────────────
def product_cards():
    out = []
    sets = [
        ("home", "home_front", "home_back", "HOME · RED TARTAN", RED),
        ("away", "away_front", "away_back", "AWAY · BLACK", INK),
        ("limited", "ltd_front", "ltd_back", "LIMITED · WHITE + GOLD", (150, 120, 40)),
    ]
    for name, fk, bk, label, accent in sets:
        S = 1600
        c = board(BONE, (S, S))
        d = ImageDraw.Draw(c)
        h = 1180
        fr, ba = fit_h(load(fk), h), fit_h(load(bk), h)
        gap = 40
        total = fr.width + ba.width + gap
        x = (S - total) // 2
        y = 150
        c.alpha_composite(fr, (x, y))
        c.alpha_composite(ba, (x + fr.width + gap, y))
        text_center(d, S // 2, 60, label, font(58), accent)
        text_center(d, S // 2, S - 150, "MADE ON · NARDWUAR FC", font(40), INK)
        c.convert("RGB").save(OUT / f"product-card-{name}.png", quality=95)
        out.append((f"product-card-{name}.png", c.size))
    return out


# ── 4. Detail strip ───────────────────────────────────────────────────────
def detail_strip():
    h = 760
    patch, crest = fit_h(load("patch"), h), fit_h(load("crest"), h)
    pad, gap = 70, 70
    W = pad * 2 + patch.width + crest.width + gap
    H = pad + 110 + h + pad
    c = board(INK, (W, H))
    d = ImageDraw.Draw(c)
    text_center(d, W // 2, 46, "DETAILS · DEEP RESEARCH PATCH + CREST", font(48), BONE)
    c.alpha_composite(patch, (pad, pad + 110))
    c.alpha_composite(crest, (pad + patch.width + gap, pad + 110))
    c.convert("RGB").save(OUT / "detail-strip.png", quality=95)
    return "detail-strip.png", c.size


if __name__ == "__main__":
    results = [kit_family(), red_hero(), *product_cards(), detail_strip()]
    print(f"Wrote {len(results)} montages to {OUT}")
    for name, size in results:
        print(f"  {name}  {size[0]}x{size[1]}")
