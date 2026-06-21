#!/usr/bin/env python3
"""Generate the award/share cards: og:image + Instagram square + story + link card.
Tartan-Paper palette, the winning Nardwuar kit, double-silver result. Run from repo root:
    python3 scripts/build-social-cards.py
Outputs public/og.jpg (1200x630) and docs/deliverables/awards/social/*.jpg.
Brand fonts (Archivo Black / Space Mono) aren't bundled; falls back to system heavy/mono.
"""
import os
from PIL import Image, ImageDraw, ImageFont, ImageOps, ImageEnhance

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KIT = os.path.join(ROOT, "public/gallery/nw-front.jpg")
SOCIAL = os.path.join(ROOT, "docs/deliverables/awards/social")
os.makedirs(SOCIAL, exist_ok=True)

INK = (26, 20, 16); BONE = (244, 241, 234); PAPER = (236, 228, 212)
OXBLOOD = (94, 22, 34); CEDAR = (47, 84, 54); HAZARD = (209, 31, 42)
GOLD = (184, 132, 26); CYAN = (15, 133, 122)

DISPLAY = ["/System/Library/Fonts/Supplemental/Arial Black.ttf",
           "/System/Library/Fonts/Supplemental/Arial Bold.ttf", "/Library/Fonts/Arial.ttf"]
MONO = ["/System/Library/Fonts/Menlo.ttc", "/System/Library/Fonts/Supplemental/Courier New Bold.ttf",
        "/System/Library/Fonts/Courier New.ttf"]

def _f(paths, size):
    for p in paths:
        if os.path.exists(p):
            try: return ImageFont.truetype(p, size)
            except Exception: pass
    return ImageFont.load_default()

def disp(s): return _f(DISPLAY, s)
def mono(s): return _f(MONO, s)

def tw(d, s, f):
    b = d.textbbox((0, 0), s, font=f); return b[2] - b[0], b[3] - b[1]

def fit_disp(d, s, max_w, start):
    sz = start
    while sz > 12:
        f = disp(sz)
        if tw(d, s, f)[0] <= max_w: return f
        sz -= 4
    return disp(12)

def tartan_band(canvas, box):
    """Draw a Vancouver-tartan plaid into box=(x,y,w,h) over oxblood."""
    x, y, w, h = box
    band = Image.new("RGB", (w, h), OXBLOOD)
    bd = ImageDraw.Draw(band, "RGBA")
    for i in range(-h, w, 46):
        bd.rectangle([i, 0, i + 10, h], fill=HAZARD + (150,))
        bd.rectangle([i + 18, 0, i + 26, h], fill=CEDAR + (150,))
        bd.rectangle([i + 34, 0, i + 37, h], fill=GOLD + (170,))
    for j in range(0, h, 46):
        bd.rectangle([0, j, w, j + 10], fill=HAZARD + (90,))
        bd.rectangle([0, j + 18, w, j + 26], fill=CEDAR + (90,))
    canvas.paste(band, (x, y))

def kit_panel(size):
    """Nardwuar kit fit onto a clean cream panel of (w,h)."""
    w, h = size
    panel = Image.new("RGB", (w, h), (250, 248, 243))
    k = Image.open(KIT).convert("RGB")
    k = ImageEnhance.Color(k).enhance(1.03)
    pad = int(min(w, h) * 0.06)
    kw, kh = k.size; scale = min((w - 2 * pad) / kw, (h - 2 * pad) / kh)
    k = k.resize((int(kw * scale), int(kh * scale)), Image.LANCZOS)
    panel.paste(k, ((w - k.size[0]) // 2, (h - k.size[1]) // 2))
    return panel

def results(d, x, y, gap, fsz):
    f = mono(fsz)
    rows = [("DEVIN OPEN HACKATHON", "2ND  $300"),
            ("FORMMÉ FASHION DESIGN", "2ND  FIVE KITS MADE")]
    for label, val in rows:
        d.text((x, y), label, font=f, fill=INK)
        d.text((x, y + fsz + 6), val, font=mono(int(fsz * 1.15)), fill=HAZARD)
        y += gap
    return y

def text_block(canvas, box, eyebrow_sz, head_sz, sub_sz, res_sz, foot_sz):
    """Render the text column into box=(x,y,w,h) on a cream canvas."""
    d = ImageDraw.Draw(canvas)
    x, y, w, h = box
    d.text((x, y), "VANCOUVER MADE · BCIT TECH COLLIDER · JUNE 20 2026",
           font=mono(eyebrow_sz), fill=CYAN)
    y += eyebrow_sz + int(h * 0.04)
    hf = fit_disp(d, "DOUBLE SILVER", w, head_sz)
    dw1 = tw(d, "DOUBLE ", hf)[0]
    d.text((x, y), "DOUBLE", font=hf, fill=INK)
    d.text((x + dw1, y), "SILVER", font=hf, fill=HAZARD)
    y += tw(d, "DOUBLE", hf)[1] + int(h * 0.05)
    d.text((x, y), "Second place. Both tracks.", font=disp(sub_sz), fill=INK)
    y += sub_sz + int(h * 0.06)
    y = results(d, x, y, int(res_sz * 2.7), res_sz)
    # wordmark + tagline at the bottom of the box
    wy = box[1] + h - foot_sz * 3
    wf = disp(int(foot_sz * 1.5))
    d.text((x, wy), "MADE", font=wf, fill=INK)
    mw = tw(d, "MADE ", wf)[0]
    d.text((x + mw, wy), "ON", font=wf, fill=HAZARD)
    d.text((x, wy + int(foot_sz * 1.7)), "Everyone else made a souvenir. We made the receipt.",
           font=mono(foot_sz), fill=(INK[0], INK[1], INK[2]))

def make_horizontal(W, H, out):
    c = Image.new("RGB", (W, H), BONE)
    tartan_band(c, (0, 0, W, max(10, int(H * 0.022))))
    tartan_band(c, (0, H - max(10, int(H * 0.022)), W, max(10, int(H * 0.022))))
    pad = int(H * 0.07)
    kw = int(W * 0.40)
    panel = kit_panel((kw, H - 2 * pad))
    c.paste(panel, (W - kw - pad, pad))
    tx = pad; tw_ = W - kw - 2 * pad - int(W * 0.02)
    text_block(c, (tx, pad, tw_, H - 2 * pad),
               eyebrow_sz=int(H * 0.030), head_sz=int(H * 0.20),
               sub_sz=int(H * 0.05), res_sz=int(H * 0.034), foot_sz=int(H * 0.028))
    c.save(out, quality=92); print("wrote", out, c.size)

def make_square(S, out):
    c = Image.new("RGB", (S, S), BONE)
    bh = int(S * 0.025)
    tartan_band(c, (0, 0, S, bh)); tartan_band(c, (0, S - bh, S, bh))
    d = ImageDraw.Draw(c)
    pad = int(S * 0.07); x = pad; y = int(S * 0.075)
    d.text((x, y), "VANCOUVER MADE · BCIT TECH COLLIDER · JUNE 20 2026",
           font=mono(int(S * 0.0255)), fill=CYAN)
    y += int(S * 0.075)
    hf = fit_disp(d, "DOUBLE SILVER", S - 2 * pad, int(S * 0.16))
    d.text((x, y), "DOUBLE", font=hf, fill=INK)
    d.text((x + tw(d, "DOUBLE ", hf)[0], y), "SILVER", font=hf, fill=HAZARD)
    y += tw(d, "DOUBLE", hf)[1] + int(S * 0.04)
    d.text((x, y), "Second place. Both tracks.", font=disp(int(S * 0.05)), fill=INK)
    y += int(S * 0.11)
    kitw, kith = int(S * 0.40), int(S * 0.46)
    c.paste(kit_panel((kitw, kith)), (S - pad - kitw, y))
    results(d, x, y + int(S * 0.03), int(S * 0.092), int(S * 0.036))
    wy = S - bh - int(S * 0.14)
    wf = disp(int(S * 0.06)); d.text((x, wy), "MADE", font=wf, fill=INK)
    d.text((x + tw(d, "MADE ", wf)[0], wy), "ON", font=wf, fill=HAZARD)
    d.text((x, wy + int(S * 0.075)), "Everyone else made a souvenir. We made the receipt.",
           font=mono(int(S * 0.0235)), fill=INK)
    c.save(out, quality=92); print("wrote", out, c.size)

def make_story(W, H, out):
    c = Image.new("RGB", (W, H), BONE)
    tartan_band(c, (0, 0, W, int(H * 0.03)))
    pad = int(W * 0.08)
    kh = int(H * 0.46)
    panel = kit_panel((W - 2 * pad, kh))
    c.paste(panel, (pad, int(H * 0.06)))
    text_block(c, (pad, int(H * 0.06) + kh + int(H * 0.04), W - 2 * pad, int(H * 0.36)),
               eyebrow_sz=int(W * 0.026), head_sz=int(W * 0.17),
               sub_sz=int(W * 0.045), res_sz=int(W * 0.030), foot_sz=int(W * 0.024))
    tartan_band(c, (0, H - int(H * 0.03), W, int(H * 0.03)))
    c.save(out, quality=92); print("wrote", out, c.size)

make_horizontal(1200, 630, os.path.join(ROOT, "public/og.jpg"))
make_horizontal(1200, 630, os.path.join(SOCIAL, "link-1200x630.jpg"))
make_square(1080, os.path.join(SOCIAL, "square-1080.jpg"))
make_story(1080, 1920, os.path.join(SOCIAL, "story-1080x1920.jpg"))
print("done")
