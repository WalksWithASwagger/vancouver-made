#!/usr/bin/env python3
"""Compose the MADE ON store products into a tight contact sheet for the deck/board.

Driven by the real product data (titles + prices) dumped from products.js to
/tmp/store-products.json by the companion node step. Images from /public/store/.
Run via scripts/build-store-sheet.sh (node dump → this).
"""
import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path("/Users/kk/Code/vancouver-made")
DATA = Path("/tmp/store-products.json")
OUT = ROOT / "docs/deliverables/store-sheet.png"
OUT.parent.mkdir(parents=True, exist_ok=True)

INK = (14, 14, 14)
BONE = (244, 241, 234)
HAZARD = (255, 59, 0)
GOLD = (217, 165, 33)

CATS = [("patches", "PATCHES"), ("stickers", "STICKERS"),
        ("prints", "PRINTS"), ("jerseys", "JERSEYS"), ("lookbook", "LOOKBOOK")]


def font(size, bold=True):
    for p in ("/System/Library/Fonts/Helvetica.ttc", "/Library/Fonts/Arial.ttf"):
        try:
            return ImageFont.truetype(p, size)
        except Exception:
            continue
    return ImageFont.load_default()


def fit(img, w, h):
    img = img.copy()
    img.thumbnail((w, h), Image.LANCZOS)
    return img


def ctext(d, cx, y, s, f, fill):
    b = d.textbbox((0, 0), s, font=f)
    d.text((cx - (b[2] - b[0]) / 2, y), s, font=f, fill=fill)


products = json.loads(DATA.read_text())
by_cat = {k: [p for p in products if p.get("category") == k] for k, _ in CATS}

COLS = 5
TILE = 300
PAD = 50
GAP = 24
LABEL = 64        # category band
CAP = 70          # caption under each tile
HEADER = 200

# compute height
rows_total = 0
for k, _ in CATS:
    n = len(by_cat[k])
    if n:
        rows_total += -(-n // COLS)  # ceil
sections = sum(1 for k, _ in CATS if by_cat[k])
W = PAD * 2 + COLS * TILE + (COLS - 1) * GAP
H = HEADER + sections * LABEL + rows_total * (TILE + CAP) + PAD

canvas = Image.new("RGB", (W, H), INK)
d = ImageDraw.Draw(canvas)

# header
d.text((PAD, 56), "MADE ON", font=font(96), fill=BONE)
d.text((PAD, 150), "THE STORE", font=font(40), fill=HAZARD)
ctext(d, W - PAD - 220, 80, f"{len(products)} pieces", font(34), BONE)
d.text((W - PAD - 430, 130), "the receipt, now wearable", font=font(26), fill=(160, 160, 160))

y = HEADER
for k, label in CATS:
    items = by_cat[k]
    if not items:
        continue
    d.rectangle([PAD, y, W - PAD, y + LABEL - 16], fill=(26, 26, 26))
    d.text((PAD + 16, y + 6), label, font=font(34), fill=BONE)
    ctext(d, W - PAD - 60, y + 10, str(len(items)), font(30), GOLD)
    y += LABEL
    for i, p in enumerate(items):
        col = i % COLS
        if col == 0 and i:
            y += TILE + CAP
        x = PAD + col * (TILE + GAP)
        # bone art panel
        d.rectangle([x, y, x + TILE, y + TILE], fill=BONE)
        img_path = ROOT / "public" / p["image"].lstrip("/")
        if img_path.exists():
            art = fit(Image.open(img_path).convert("RGB"), TILE - 24, TILE - 24)
            canvas.paste(art, (x + (TILE - art.width) // 2, y + (TILE - art.height) // 2))
        # caption
        title = p.get("title", "")[:34]
        d.text((x, y + TILE + 8), title, font=font(20), fill=BONE)
        price = p.get("price")
        tag = f"${price} {p.get('currency','CAD')}" if price is not None else "LOOKBOOK"
        col2 = GOLD if p.get("status") == "blessing-pending" else (150, 150, 150)
        d.text((x, y + TILE + 36), tag, font=font(20, False), fill=col2)
    y += TILE + CAP

canvas.save(OUT, quality=95)
print(f"wrote {OUT}  {canvas.size[0]}x{canvas.size[1]}  ({len(products)} products)")
