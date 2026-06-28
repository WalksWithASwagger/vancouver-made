#!/usr/bin/env python3
"""Generate the award/share cards: og:image + Instagram square + story + link card.
Tartan-Paper palette, the winning Nardwuar kit, double-silver result. Run from repo root:
    python3 scripts/build-social-cards.py
Outputs public/og.jpg, public/og/kit-<slug>.jpg (1200x630), and docs/deliverables/awards/social/*.jpg.
Brand fonts (Archivo Black / Space Mono) aren't bundled; falls back to system heavy/mono.
"""
import os
from PIL import Image, ImageDraw, ImageFont, ImageOps, ImageEnhance

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KIT = os.path.join(ROOT, "public/gallery/nw-front.jpg")
SOCIAL = os.path.join(ROOT, "docs/deliverables/awards/social")
OG_DIR = os.path.join(ROOT, "public/og")
os.makedirs(SOCIAL, exist_ok=True)
os.makedirs(OG_DIR, exist_ok=True)

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

# ── Per-kit share cards: og:image for each /kit/<slug> ──────────────────────
# slug, display name, kit name, tagline, source image (alpha-composited onto cream).
KIT_CARDS = [
    ("nardwuar-fc", "NARDWUAR FC", "Deep Cut",
     "Research as the protest. The receipt as the weapon.",
     "public/gallery/nw-front.jpg"),
    ("pump-and-dump-fc", "PUMP & DUMP FC", "Speculation City",
     "Hype the city. Bill the public. Take the exit. You're the bagholder.",
     "public/gallery/pd-front.jpg"),
    ("number-five-orange", "NUMBER FIVE ORANGE", "Work Is Work",
     "Sell the nightlife to tourists. Bill the workers who run it.",
     "public/gallery/n5-away.jpg"),
    ("china-creek", "CHINA CREEK", "Public Land",
     "Ban the board. Sell the bowl. The home ground was the fight.",
     "public/highlight-reel/china-creek-01-yellow-front.png"),
    ("hogans-alley-fc", "HOGAN'S ALLEY FC", "Renaissance Home Kit",
     "The block the city paved over, worn as a future. Still here.",
     "public/kit/hogans-alley/home-front.jpg"),
]

def load_kit_image(path):
    """Open a kit image; composite transparency onto cream so PNGs don't go black.
    Falls back to the Nardwuar front if the path is missing."""
    for p in (path, "public/gallery/nw-front.jpg"):
        ap = p if os.path.isabs(p) else os.path.join(ROOT, p)
        if not os.path.exists(ap):
            continue
        try:
            im = Image.open(ap)
            if im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info):
                im = im.convert("RGBA")
                bg = Image.new("RGB", im.size, (250, 248, 243))
                bg.paste(im, mask=im.split()[-1])
                return bg
            return im.convert("RGB")
        except Exception:
            continue
    return None

def kit_panel_for(path, size):
    w, h = size
    panel = Image.new("RGB", (w, h), (250, 248, 243))
    k = load_kit_image(path)
    if k is None:
        return panel
    k = ImageEnhance.Color(k).enhance(1.03)
    pad = int(min(w, h) * 0.06)
    kw, kh = k.size
    scale = min((w - 2 * pad) / kw, (h - 2 * pad) / kh)
    k = k.resize((max(1, int(kw * scale)), max(1, int(kh * scale))), Image.LANCZOS)
    panel.paste(k, ((w - k.size[0]) // 2, (h - k.size[1]) // 2))
    return panel

def wrap_text(d, s, font, max_w):
    lines, cur = [], ""
    for word in s.split():
        test = (cur + " " + word).strip()
        if not cur or tw(d, test, font)[0] <= max_w:
            cur = test
        else:
            lines.append(cur); cur = word
    if cur:
        lines.append(cur)
    return lines

def make_kit_card(name, kitname, tagline, kit_path, out, W=1200, H=630):
    c = Image.new("RGB", (W, H), BONE)
    band = max(10, int(H * 0.022))
    tartan_band(c, (0, 0, W, band))
    tartan_band(c, (0, H - band, W, band))
    pad = int(H * 0.09)
    kw = int(W * 0.40)
    c.paste(kit_panel_for(kit_path, (kw, H - 2 * pad)), (W - kw - pad, pad))
    d = ImageDraw.Draw(c)
    x = pad; y = pad; col_w = W - kw - 2 * pad - int(W * 0.02)
    d.text((x, y), "VANCOUVER MADE · MADE ON", font=mono(int(H * 0.030)), fill=CYAN)
    y += int(H * 0.030) + int(H * 0.055)
    hf = fit_disp(d, name, col_w, int(H * 0.135))
    d.text((x, y), name, font=hf, fill=INK)
    y += tw(d, name, hf)[1] + int(H * 0.03)
    d.text((x, y), kitname.upper(), font=mono(int(H * 0.034)), fill=HAZARD)
    y += int(H * 0.034) + int(H * 0.05)
    tf = disp(int(H * 0.05))
    for line in wrap_text(d, tagline, tf, col_w):
        d.text((x, y), line, font=tf, fill=INK)
        y += int(H * 0.05) + int(H * 0.02)
    wy = pad + (H - 2 * pad) - int(H * 0.095)
    wf = disp(int(H * 0.05))
    d.text((x, wy), "MADE", font=wf, fill=INK)
    d.text((x + tw(d, "MADE ", wf)[0], wy), "ON", font=wf, fill=HAZARD)
    d.text((x, wy + int(H * 0.062)), "Every claim cited. We made the receipt.",
           font=mono(int(H * 0.025)), fill=INK)
    c.save(out, quality=90); print("wrote", out, c.size)

make_horizontal(1200, 630, os.path.join(ROOT, "public/og.jpg"))
make_horizontal(1200, 630, os.path.join(SOCIAL, "link-1200x630.jpg"))
make_square(1080, os.path.join(SOCIAL, "square-1080.jpg"))
make_story(1080, 1920, os.path.join(SOCIAL, "story-1080x1920.jpg"))
for slug, nm, kn, tag, img in KIT_CARDS:
    make_kit_card(nm, kn, tag, img, os.path.join(OG_DIR, f"kit-{slug}.jpg"))
print("done")
