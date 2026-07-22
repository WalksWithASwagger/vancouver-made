#!/usr/bin/env python3

import hashlib
import json
import shutil
import zipfile
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
SPEC_PATH = ROOT / "docs/production/both-and/spec.json"
PDF_DIR = ROOT / "output/pdf"
PACKAGE_DIR = ROOT / "output/production/BCAI-01"
ART_DIR = PACKAGE_DIR / "artwork"
TECHPACK_PATH = PDF_DIR / "BCAI-01-BOTH-AND-Tech-Pack.pdf"
PACKAGE_TECHPACK_PATH = PACKAGE_DIR / "BCAI-01-BOTH-AND-Tech-Pack.pdf"
ZIP_PATH = ROOT / "output/production/BCAI-01-rev-A.zip"

NAVY = HexColor("#0A0D12")
LIME = HexColor("#DFE250")
ICE = HexColor("#7ADCFF")
BONE = HexColor("#F4F2EA")
INK = HexColor("#15191F")
MUTED = HexColor("#66707C")
RULE = HexColor("#D8DCE0")
PAPER = HexColor("#FBFAF6")
SOFT = HexColor("#EEF1F2")


GLYPHS = {
    "A": ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
    "B": ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
    "C": ["01111", "10000", "10000", "10000", "10000", "10000", "01111"],
    "D": ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
    "E": ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
    "F": ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
    "G": ["01111", "10000", "10000", "10111", "10001", "10001", "01111"],
    "H": ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
    "I": ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
    "J": ["00111", "00010", "00010", "00010", "10010", "10010", "01100"],
    "K": ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
    "L": ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
    "M": ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
    "N": ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
    "O": ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
    "P": ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
    "Q": ["01110", "10001", "10001", "10001", "10101", "10010", "01101"],
    "R": ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
    "S": ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
    "T": ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
    "U": ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
    "V": ["10001", "10001", "10001", "10001", "10001", "01010", "00100"],
    "W": ["10001", "10001", "10001", "10101", "10101", "10101", "01010"],
    "X": ["10001", "10001", "01010", "00100", "01010", "10001", "10001"],
    "Y": ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
    "Z": ["11111", "00001", "00010", "00100", "01000", "10000", "11111"],
    "0": ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
    "1": ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
    "2": ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
    "3": ["11110", "00001", "00001", "01110", "00001", "00001", "11110"],
    "4": ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
    "5": ["11111", "10000", "10000", "11110", "00001", "00001", "11110"],
    "6": ["01110", "10000", "10000", "11110", "10001", "10001", "01110"],
    "7": ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
    "8": ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
    "9": ["01110", "10001", "10001", "01111", "00001", "00001", "01110"],
    "+": ["00000", "00100", "00100", "11111", "00100", "00100", "00000"],
    "/": ["00001", "00001", "00010", "00100", "01000", "10000", "10000"],
    "-": ["00000", "00000", "00000", "11111", "00000", "00000", "00000"],
}


def rgb_hex(value):
    return value.hexval().upper().replace("0X", "#")


def text_units(text):
    widths = [3 if char == " " else 5 for char in text]
    return sum(widths) + max(0, len(widths) - 1)


def pixel_text(text, x, y, width, height, colour, char_colours=None):
    text = text.upper()
    unit_width = text_units(text)
    cell = min(width / unit_width, height / 7)
    actual_width = unit_width * cell
    actual_height = 7 * cell
    cursor = x + (width - actual_width) / 2
    top = y + (height - actual_height) / 2
    elements = []
    for index, char in enumerate(text):
        char_width = 3 if char == " " else 5
        glyph = GLYPHS.get(char)
        active_colour = char_colours.get(index, colour) if char_colours else colour
        if glyph:
            for row, row_data in enumerate(glyph):
                for column, bit in enumerate(row_data):
                    if bit == "1":
                        elements.append(
                            {
                                "x": cursor + column * cell,
                                "y": top + row * cell,
                                "w": cell,
                                "h": cell,
                                "colour": active_colour,
                            }
                        )
        cursor += (char_width + 1) * cell
    return elements


def artwork_definitions():
    front = pixel_text("BC+AI", 10, 4, 260, 58, BONE, {2: LIME})
    front += pixel_text("ECOSYSTEM", 50, 67, 180, 11, LIME)

    back = pixel_text("BOTH", 10, 4, 220, 60, BONE)
    back += [
        {"x": 97.5, "y": 84, "w": 45, "h": 14, "colour": LIME},
        {"x": 113, "y": 68.5, "w": 14, "h": 45, "colour": LIME},
    ]
    back += pixel_text("AND", 30, 125, 180, 72, BONE)
    back += pixel_text("CURIOUS/CRITICAL/TOGETHER", 8, 226, 224, 10, LIME)

    neck = pixel_text("BUILD THE FUTURE", 5, 3, 100, 11, LIME)
    neck += pixel_text("WE ACTUALLY WANT", 5, 17, 100, 11, BONE)

    short_emb = pixel_text("BC+AI", 3, 3, 79, 22, ICE, {2: LIME})
    short_print = pixel_text("BOTH/AND", 3, 3, 84, 16, BONE, {4: LIME})

    return [
        {"id": "BCAI-01-P1-FRONT", "size": (280, 82), "elements": front, "method": "SCREEN"},
        {"id": "BCAI-01-P2-BACK", "size": (240, 260), "elements": back, "method": "SCREEN"},
        {"id": "BCAI-01-P3-LOCAL", "size": (70, 18), "elements": pixel_text("LOCAL", 1, 1, 68, 16, BONE), "method": "SCREEN"},
        {"id": "BCAI-01-P4-FUTURE", "size": (80, 18), "elements": pixel_text("FUTURE", 1, 1, 78, 16, LIME), "method": "SCREEN"},
        {"id": "BCAI-01-P5-NECK", "size": (110, 32), "elements": neck, "method": "TRANSFER_OR_SCREEN"},
        {"id": "BCAI-01-P6-SHORT-EMB", "size": (85, 28), "elements": short_emb, "method": "EMBROIDERY"},
        {"id": "BCAI-01-P7-SHORT-PRINT", "size": (90, 22), "elements": short_print, "method": "SCREEN"},
    ]


def draw_elements(c, elements, page_height_mm, scale=1, offset_x=0, offset_y=0):
    for element in elements:
        c.setFillColor(element["colour"])
        c.rect(
            (offset_x + element["x"] * scale) * mm,
            (page_height_mm - offset_y - (element["y"] + element["h"]) * scale) * mm,
            element["w"] * scale * mm,
            element["h"] * scale * mm,
            stroke=0,
            fill=1,
        )


def write_svg(artwork, target):
    width, height = artwork["size"]
    rectangles = []
    for element in artwork["elements"]:
        rectangles.append(
            f'<rect x="{element["x"]:.4f}" y="{element["y"]:.4f}" '
            f'width="{element["w"]:.4f}" height="{element["h"]:.4f}" '
            f'fill="{rgb_hex(element["colour"])}"/>'
        )
    svg = "\n".join(
        [
            '<?xml version="1.0" encoding="UTF-8"?>',
            f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}mm" height="{height}mm" viewBox="0 0 {width} {height}">',
            f'  <title>{artwork["id"]}</title>',
            f'  <desc>Revision A. Actual size {width} mm by {height} mm. All artwork is vector geometry; no fonts or linked images.</desc>',
            "  " + "\n  ".join(rectangles),
            "</svg>",
            "",
        ]
    )
    target.write_text(svg, encoding="utf-8")


def write_artwork_pdf(artwork, target):
    width, height = artwork["size"]
    c = canvas.Canvas(str(target), pagesize=(width * mm, height * mm), pageCompression=1)
    c.setTitle(artwork["id"])
    c.setSubject(f"Revision A actual-size vector artwork; {artwork['method']}")
    draw_elements(c, artwork["elements"], height)
    c.showPage()
    c.save()


PAGE_W, PAGE_H = landscape(A4)
PAGE_W_MM = PAGE_W / mm
PAGE_H_MM = PAGE_H / mm

BODY_STYLE = ParagraphStyle(
    "Body",
    fontName="Helvetica",
    fontSize=8.1,
    leading=11,
    textColor=INK,
    alignment=TA_LEFT,
    spaceAfter=0,
)
SMALL_STYLE = ParagraphStyle(
    "Small",
    parent=BODY_STYLE,
    fontSize=7,
    leading=9,
)
TINY_STYLE = ParagraphStyle(
    "Tiny",
    parent=BODY_STYLE,
    fontSize=6.2,
    leading=7.4,
)
LABEL_STYLE = ParagraphStyle(
    "Label",
    parent=SMALL_STYLE,
    fontName="Helvetica-Bold",
    textColor=MUTED,
)
CENTER_STYLE = ParagraphStyle(
    "Center",
    parent=BODY_STYLE,
    alignment=TA_CENTER,
)


def paragraph(c, value, x, top, width, style=BODY_STYLE):
    item = Paragraph(value, style)
    _, height = item.wrap(width * mm, 1000 * mm)
    item.drawOn(c, x * mm, (top * mm) - height)
    return top - height / mm


def page_frame(c, title, subtitle, page_number):
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    c.setFillColor(NAVY)
    c.rect(0, PAGE_H - 22 * mm, PAGE_W, 22 * mm, stroke=0, fill=1)
    c.setFillColor(BONE)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(13 * mm, PAGE_H - 13.5 * mm, title)
    c.setFillColor(ICE)
    c.setFont("Helvetica", 7.5)
    c.drawRightString((PAGE_W_MM - 13) * mm, PAGE_H - 13.5 * mm, subtitle)
    c.setStrokeColor(RULE)
    c.line(13 * mm, 11 * mm, (PAGE_W_MM - 13) * mm, 11 * mm)
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 6.5)
    c.drawString(13 * mm, 6 * mm, "BCAI-01 | REV A | 2026-07-21 | ALL DIMENSIONS IN MM UNLESS NOTED")
    c.drawRightString((PAGE_W_MM - 13) * mm, 6 * mm, f"{page_number:02d} / 11")


def section_label(c, text, x, top, colour=LIME):
    c.setFillColor(colour)
    c.rect(x * mm, (top - 3) * mm, 3 * mm, 3 * mm, stroke=0, fill=1)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 8)
    c.drawString((x + 6) * mm, (top - 3) * mm, text.upper())


def card(c, x, top, width, height, title=None, fill=colors.white, stroke=RULE):
    c.setFillColor(fill)
    c.setStrokeColor(stroke)
    c.roundRect(x * mm, (top - height) * mm, width * mm, height * mm, 3 * mm, stroke=1, fill=1)
    if title:
        c.setFillColor(MUTED)
        c.setFont("Helvetica-Bold", 6.7)
        c.drawString((x + 5) * mm, (top - 8) * mm, title.upper())


def styled_table(c, data, x, top, widths, row_heights=None, font_size=6.4):
    converted = []
    for row_index, row in enumerate(data):
        style = ParagraphStyle(
            f"table-{row_index}",
            parent=TINY_STYLE,
            fontName="Helvetica-Bold" if row_index == 0 else "Helvetica",
            fontSize=font_size,
            leading=font_size + 1.7,
            textColor=BONE if row_index == 0 else INK,
        )
        converted.append([Paragraph(str(value), style) for value in row])
    table = Table(converted, colWidths=[value * mm for value in widths], rowHeights=row_heights)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), NAVY),
                ("BACKGROUND", (0, 1), (-1, -1), colors.white),
                ("GRID", (0, 0), (-1, -1), 0.35, RULE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 4),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 3.5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3.5),
            ]
        )
    )
    _, height = table.wrap(sum(widths) * mm, 200 * mm)
    table.drawOn(c, x * mm, top * mm - height)
    return top - height / mm


def scaled_elements(c, artwork, x, y, width, height):
    art_width, art_height = artwork["size"]
    scale = min(width / art_width, height / art_height)
    offset_x = x + (width - art_width * scale) / 2
    offset_y = PAGE_H_MM - (y + height) + (height - art_height * scale) / 2
    draw_elements(c, artwork["elements"], PAGE_H_MM, scale, offset_x, offset_y)


def draw_jersey(c, x, y, width, height, artwork, front=True):
    c.saveState()
    c.setFillColor(NAVY)
    c.setStrokeColor(HexColor("#38404B"))
    c.setLineWidth(0.8)
    path = c.beginPath()
    path.moveTo((x + 0.30 * width) * mm, (y + 0.86 * height) * mm)
    path.lineTo((x + 0.17 * width) * mm, (y + 0.80 * height) * mm)
    path.lineTo((x + 0.02 * width) * mm, (y + 0.61 * height) * mm)
    path.lineTo((x + 0.18 * width) * mm, (y + 0.48 * height) * mm)
    path.lineTo((x + 0.25 * width) * mm, (y + 0.55 * height) * mm)
    path.lineTo((x + 0.23 * width) * mm, (y + 0.08 * height) * mm)
    path.lineTo((x + 0.77 * width) * mm, (y + 0.08 * height) * mm)
    path.lineTo((x + 0.75 * width) * mm, (y + 0.55 * height) * mm)
    path.lineTo((x + 0.82 * width) * mm, (y + 0.48 * height) * mm)
    path.lineTo((x + 0.98 * width) * mm, (y + 0.61 * height) * mm)
    path.lineTo((x + 0.83 * width) * mm, (y + 0.80 * height) * mm)
    path.lineTo((x + 0.70 * width) * mm, (y + 0.86 * height) * mm)
    path.curveTo(
        (x + 0.62 * width) * mm,
        (y + 0.93 * height) * mm,
        (x + 0.38 * width) * mm,
        (y + 0.93 * height) * mm,
        (x + 0.30 * width) * mm,
        (y + 0.86 * height) * mm,
    )
    path.close()
    c.drawPath(path, stroke=1, fill=1)
    c.setFillColor(PAPER)
    c.setStrokeColor(HexColor("#38404B"))
    c.circle((x + 0.5 * width) * mm, (y + 0.88 * height) * mm, 0.085 * width * mm, stroke=1, fill=1)
    if front:
        scaled_elements(c, artwork, x + 0.29 * width, y + 0.50 * height, 0.42 * width, 0.14 * height)
    else:
        scaled_elements(c, artwork, x + 0.35 * width, y + 0.28 * height, 0.30 * width, 0.48 * height)
    c.restoreState()


def draw_shorts(c, x, y, width, height, art_left, art_right, front=True):
    c.saveState()
    c.setFillColor(NAVY)
    c.setStrokeColor(HexColor("#38404B"))
    c.setLineWidth(0.8)
    path = c.beginPath()
    path.moveTo(x * mm, (y + height) * mm)
    path.lineTo((x + width) * mm, (y + height) * mm)
    path.lineTo((x + 0.90 * width) * mm, y * mm)
    path.lineTo((x + 0.55 * width) * mm, (y + 0.04 * height) * mm)
    path.lineTo((x + 0.50 * width) * mm, (y + 0.42 * height) * mm)
    path.lineTo((x + 0.45 * width) * mm, (y + 0.04 * height) * mm)
    path.lineTo((x + 0.10 * width) * mm, y * mm)
    path.close()
    c.drawPath(path, stroke=1, fill=1)
    c.setStrokeColor(HexColor("#66707C"))
    c.line(x * mm, (y + 0.83 * height) * mm, (x + width) * mm, (y + 0.83 * height) * mm)
    if front:
        scaled_elements(c, art_left, x + 0.13 * width, y + 0.45 * height, 0.28 * width, 0.14 * height)
        scaled_elements(c, art_right, x + 0.61 * width, y + 0.45 * height, 0.28 * width, 0.16 * height)
    c.restoreState()


def page_cover(c, spec):
    c.setFillColor(NAVY)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    cover = pixel_text("BOTH/AND", 0, 0, 220, 70, BONE, {4: LIME})
    draw_elements(c, cover, PAGE_H_MM, 1, 38, 48)
    c.setFillColor(ICE)
    c.rect(38 * mm, (PAGE_H_MM - 127) * mm, 220 * mm, 3 * mm, stroke=0, fill=1)
    c.setFillColor(BONE)
    c.setFont("Helvetica-Bold", 16)
    c.drawString(38 * mm, 48 * mm, "BCAI-01 COMMUNITY MATCH KIT")
    c.setFont("Helvetica", 9)
    c.setFillColor(ICE)
    c.drawString(38 * mm, 39 * mm, "JERSEY + SHORTS | FACTORY TECH PACK | REVISION A")
    c.setFillColor(BONE)
    c.setFont("Helvetica", 7.2)
    c.drawString(38 * mm, 28 * mm, "ISSUED 2026-07-21 | DESIGN LOCK 2026-07-26 | MANUFACTURE IN INDIA")
    c.drawRightString((PAGE_W_MM - 18) * mm, 10 * mm, "01 / 11")


def page_concept(c, spec):
    page_frame(c, "CONCEPT + COLOUR", "BOTH / AND SYSTEM", 2)
    section_label(c, "Design statement", 13, 177)
    paragraph(
        c,
        "A team uniform for people building the future while retaining the right to question it. The plus sign joins productive tensions: curious + critical, local + future, individual + collective, technology + public interest.",
        13,
        168,
        119,
        BODY_STYLE,
    )
    card(c, 13, 136, 119, 89, "LOCKED DIRECTION")
    y = 123
    for item in [
        "Custom square-grid vector alphabet",
        "Dark stock body with two signal colours",
        "Large identifier front; organizing idea back",
        "No crest, tartan, portrait, sponsor, number, or all-over pattern",
        "Artwork geometry is font-free and fully vector",
    ]:
        c.setFillColor(LIME)
        c.rect(19 * mm, (y - 2.2) * mm, 2.2 * mm, 2.2 * mm, stroke=0, fill=1)
        y = paragraph(c, item, 25, y, 99, SMALL_STYLE) - 5
    section_label(c, "Working colour standards", 147, 177, ICE)
    y = 164
    for colour in spec["colours"]:
        swatch = HexColor(colour["hex"])
        c.setFillColor(swatch)
        c.setStrokeColor(RULE)
        c.rect(147 * mm, (y - 14) * mm, 23 * mm, 14 * mm, stroke=1, fill=1)
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(175 * mm, (y - 4) * mm, colour["name"])
        c.setFont("Helvetica", 6.8)
        c.setFillColor(MUTED)
        c.drawString(175 * mm, (y - 10) * mm, f'{colour["hex"]} | {colour["working_reference"]}')
        y -= 26
    card(c, 147, 55, 137, 31, "PHYSICAL APPROVAL CONTROLS", fill=SOFT)
    paragraph(
        c,
        "Digital values are working targets, not bulk approval. Return fabric swatch, lab dip, ink drawdowns, and thread card. Bulk colour is approved only against the accepted physical standard under D65 light.",
        153,
        42,
        125,
        SMALL_STYLE,
    )


def page_flats(c, spec, art):
    page_frame(c, "GARMENT OVERVIEW", "FRONT + BACK FLATS", 3)
    draw_jersey(c, 20, 25, 82, 137, art["BCAI-01-P1-FRONT"], True)
    draw_jersey(c, 110, 25, 82, 137, art["BCAI-01-P2-BACK"], False)
    draw_shorts(c, 210, 72, 68, 80, art["BCAI-01-P7-SHORT-PRINT"], art["BCAI-01-P6-SHORT-EMB"], True)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 8)
    c.drawCentredString(61 * mm, 20 * mm, "JERSEY FRONT")
    c.drawCentredString(151 * mm, 20 * mm, "JERSEY BACK")
    c.drawCentredString(244 * mm, 64 * mm, "SHORTS FRONT")
    card(c, 205, 56, 79, 31, "SILHOUETTE")
    paragraph(c, "Unisex relaxed athletic fit. Set-in sleeve. Crew neck. Matte near-black body. Matching pull-on short.", 211, 43, 67, SMALL_STYLE)


def page_front(c, spec, art):
    page_frame(c, "JERSEY FRONT + SLEEVES", "PLACEMENTS P1, P3, P4, P5", 4)
    draw_jersey(c, 18, 27, 87, 143, art["BCAI-01-P1-FRONT"], True)
    rows = [["ID", "LOCATION", "METHOD", "ART SIZE", "POSITION"]]
    for placement in spec["placements"]:
        if placement["id"] in {"P1", "P3", "P4", "P5"}:
            rows.append(
                [placement["id"], placement["location"], placement["method"], placement["size_mm"], placement["position"]]
            )
    styled_table(c, rows, 113, 170, [12, 29, 38, 27, 62], font_size=6)
    card(c, 113, 86, 168, 49, "PLACEMENT CONTROL")
    paragraph(
        c,
        "Dimensions are specified on factory size M. Factory must return a marked graded placement map before production. Keep artwork visually centred on the finished panel, not merely between raw seam allowances. Maintain +/- 5 mm placement and +/- 2 mm artwork-size tolerance unless the table states tighter control.",
        119,
        73,
        156,
        SMALL_STYLE,
    )
    c.setStrokeColor(ICE)
    c.setLineWidth(0.8)
    c.line(78 * mm, 118 * mm, 113 * mm, 120 * mm)
    c.setFillColor(ICE)
    c.circle(78 * mm, 118 * mm, 1.5 * mm, stroke=0, fill=1)
    c.setFont("Helvetica-Bold", 7)
    c.drawString(116 * mm, 118 * mm, "P1 TOP: 165 BELOW HPS")


def page_back(c, spec, art):
    page_frame(c, "JERSEY BACK", "PLACEMENT P2", 5)
    draw_jersey(c, 23, 25, 95, 148, art["BCAI-01-P2-BACK"], False)
    placement = next(item for item in spec["placements"] if item["id"] == "P2")
    section_label(c, "P2 back centre", 135, 170, ICE)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 18)
    c.drawString(135 * mm, 151 * mm, placement["size_mm"])
    y = paragraph(c, f'<b>Method:</b> {placement["method"]}', 135, 137, 141, BODY_STYLE) - 4
    y = paragraph(c, f'<b>Position:</b> {placement["position"]}', 135, y, 141, BODY_STYLE) - 4
    y = paragraph(c, f'<b>Tolerance:</b> {placement["tolerance"]}', 135, y, 141, BODY_STYLE) - 7
    card(c, 135, y, 141, 44, "ARTWORK INTEGRITY", fill=SOFT)
    paragraph(
        c,
        "Preserve square corners and the original gaps between every cell. Do not condense, redraw, add outlines, add trapping, or substitute type. The vector PDF and SVG are the production masters.",
        141,
        y - 13,
        129,
        SMALL_STYLE,
    )
    c.setStrokeColor(LIME)
    c.line(110 * mm, 148 * mm, 132 * mm, 156 * mm)
    c.setFillColor(LIME)
    c.circle(110 * mm, 148 * mm, 1.5 * mm, stroke=0, fill=1)


def page_shorts(c, spec, art):
    page_frame(c, "SHORTS", "PLACEMENTS P6 + P7", 6)
    draw_shorts(c, 20, 52, 105, 114, art["BCAI-01-P7-SHORT-PRINT"], art["BCAI-01-P6-SHORT-EMB"], True)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 8)
    c.drawCentredString(72.5 * mm, 43 * mm, "FRONT")
    rows = [["ID", "LOCATION", "METHOD", "SIZE", "POSITION"]]
    for placement in spec["placements"]:
        if placement["id"] in {"P6", "P7"}:
            rows.append(
                [placement["id"], placement["location"], placement["method"], placement["size_mm"], placement["position"]]
            )
    styled_table(c, rows, 139, 169, [12, 32, 38, 25, 64], font_size=6.1)
    card(c, 139, 103, 171, 59, "CONSTRUCTION NOTES")
    y = 89
    for item in [
        "40 mm enclosed elastic waistband with internal matching drawcord",
        "Reinforce drawcord exit and crotch stress points",
        "Match jersey fabric colour and matte hand feel",
        "No side stripe, all-over print, player name, or number",
        "Return embroidery sew-out before sample production",
    ]:
        c.setFillColor(ICE)
        c.circle(145 * mm, (y - 1.7) * mm, 1.2 * mm, stroke=0, fill=1)
        y = paragraph(c, item, 150, y, 151, SMALL_STYLE) - 3.5


def page_artwork(c, spec, art):
    page_frame(c, "ARTWORK + DECORATION", "VECTOR MASTERS + COLOUR SEPARATION", 7)
    previews = [
        ("BCAI-01-P1-FRONT", 13, 166, 78, 31),
        ("BCAI-01-P2-BACK", 99, 166, 48, 84),
        ("BCAI-01-P3-LOCAL", 155, 166, 57, 21),
        ("BCAI-01-P4-FUTURE", 220, 166, 64, 21),
        ("BCAI-01-P6-SHORT-EMB", 155, 130, 57, 24),
        ("BCAI-01-P7-SHORT-PRINT", 220, 130, 64, 21),
    ]
    for artwork_id, x, top, width, height in previews:
        card(c, x, top, width, height, artwork_id.replace("BCAI-01-", ""), fill=NAVY, stroke=NAVY)
        scaled_elements(c, art[artwork_id], x + 5, top - height + 4, width - 10, height - 14)
    section_label(c, "Decoration controls", 13, 69)
    y = 58
    for item in spec["decoration"]:
        c.setFillColor(LIME)
        c.rect(13 * mm, (y - 2) * mm, 2 * mm, 2 * mm, stroke=0, fill=1)
        y = paragraph(c, item, 18, y, 123, TINY_STYLE) - 3
    section_label(c, "Production files", 155, 69, ICE)
    paragraph(
        c,
        "Each placement is supplied as an actual-size vector PDF and SVG. SVG geometry contains no text or linked images. PDF pages match the stated finished artwork dimensions. Composite colours are flat spot-colour targets for screen separation.",
        155,
        58,
        129,
        SMALL_STYLE,
    )


def page_materials(c, spec):
    page_frame(c, "MATERIALS + CONSTRUCTION", "BILL OF MATERIALS", 8)
    rows = [["COMPONENT", "SPECIFICATION", "COLOUR", "APPROVAL GATE"]]
    for material in spec["materials"]:
        rows.append([material["component"], material["specification"], material["colour"], material["gate"]])
    styled_table(c, rows, 13, 171, [36, 105, 28, 101], font_size=6.1)
    section_label(c, "Construction", 13, 83)
    left = spec["construction"][:4]
    right = spec["construction"][4:]
    for column, items in enumerate([left, right]):
        x = 13 + column * 137
        y = 72
        for item in items:
            c.setFillColor(LIME if column == 0 else ICE)
            c.circle(x * mm, (y - 1.6) * mm, 1.15 * mm, stroke=0, fill=1)
            y = paragraph(c, item, x + 5, y, 124, SMALL_STYLE) - 4
    card(c, 13, 34, 270, 15, fill=SOFT)
    paragraph(
        c,
        "Preferred: documented GRS or ocean-bound recycled input. Do not print a sustainability claim unless the factory provides verifiable chain-of-custody evidence for this exact production lot.",
        19,
        29,
        258,
        TINY_STYLE,
    )


def page_fit(c, spec):
    page_frame(c, "FIT + LABEL + CARE", "FACTORY BLOCK CONTROL", 9)
    section_label(c, "Fit intent", 13, 171)
    paragraph(c, spec["fit"], 13, 160, 122, BODY_STYLE)
    card(c, 13, 132, 122, 82, "FACTORY RETURN: SIZE CHART")
    y = 119
    for item in [
        "Finished garment POM for XS through 3XL",
        "Chest width at 25 mm below armhole",
        "Body length from high-point shoulder",
        "Shoulder, sleeve length, bicep, and opening",
        "Short waist relaxed/stretched, rise, inseam, outseam, and leg opening",
        "Per-POM tolerances and grading increments",
    ]:
        c.setFillColor(LIME)
        c.rect(19 * mm, (y - 2) * mm, 2 * mm, 2 * mm, stroke=0, fill=1)
        y = paragraph(c, item, 24, y, 103, SMALL_STYLE) - 4
    section_label(c, "Care proposal", 150, 171, ICE)
    paragraph(c, spec["care_proposal"], 150, 160, 132, BODY_STYLE)
    card(c, 150, 127, 132, 38, "LABEL CONTENT")
    paragraph(
        c,
        "Brand and style, country of origin, fibre content, care symbols and text, size, and legally required manufacturer/importer details. Factory verifies content before print. Use a soft transfer or low-profile label with no scratchy edge.",
        156,
        114,
        120,
        SMALL_STYLE,
    )
    card(c, 150, 78, 132, 42, "SIZE MIX")
    paragraph(
        c,
        "Do not infer quantities by size. Buyer returns the wearer size list after reviewing the factory chart and size M sample. No bulk cutting follows from an estimated mix.",
        156,
        65,
        120,
        SMALL_STYLE,
    )


def page_approval(c, spec):
    page_frame(c, "APPROVAL + QUALITY PLAN", "NO BULK AUTHORIZATION", 10)
    section_label(c, "Required factory returns", 13, 171)
    left = spec["factory_returns"][:4]
    right = spec["factory_returns"][4:]
    for column, items in enumerate([left, right]):
        x = 13 + column * 137
        y = 159
        for index, item in enumerate(items, 1 + column * 4):
            c.setFillColor(NAVY)
            c.circle(x * mm, (y - 2) * mm, 3 * mm, stroke=0, fill=1)
            c.setFillColor(BONE)
            c.setFont("Helvetica-Bold", 6)
            c.drawCentredString(x * mm, (y - 4) * mm, str(index))
            y = paragraph(c, item, x + 6, y, 124, SMALL_STYLE) - 6
    section_label(c, "Bulk quality gates", 13, 75, LIME)
    rows = [["GATE", "ACCEPTANCE"]]
    for item in spec["quality"]:
        gate, acceptance = item.split(":", 1)
        rows.append([gate, acceptance.strip()])
    styled_table(c, rows, 13, 64, [35, 235], font_size=5.9)


def page_manifest(c, spec, artworks):
    page_frame(c, "FILE MANIFEST + SIGN-OFF", "REVISION A", 11)
    section_label(c, "Package contents", 13, 171)
    rows = [["FILE", "FORMAT", "USE"]]
    rows.append([TECHPACK_PATH.name, "PDF", "Factory specification and approval record"])
    rows.append(["BCAI-01-spec.json", "JSON", "Machine-readable source specification"])
    rows.append(["README.md", "MD", "Package use and approval boundary"])
    rows.append(["SHA256SUMS.txt", "TXT", "Package integrity list"])
    for artwork in artworks:
        method = artwork["method"].replace("_", " ").lower()
        rows.append([f'artwork/{artwork["id"]}.pdf', "PDF", f"Actual-size {method} master"])
        rows.append([f'artwork/{artwork["id"]}.svg', "SVG", "Font-free vector source"])
    styled_table(c, rows, 13, 160, [101, 24, 145], font_size=5.7)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(13 * mm, 47 * mm, "COMMERCIAL NOTE")
    paragraph(c, spec["commercial"], 13, 42, 270, TINY_STYLE)
    c.setStrokeColor(RULE)
    for x, label in [(13, "BUYER TECHNICAL APPROVAL / DATE"), (106, "FACTORY ACKNOWLEDGEMENT / DATE"), (199, "PRE-PRODUCTION SAMPLE APPROVAL / DATE")]:
        c.line(x * mm, 24 * mm, (x + 82) * mm, 24 * mm)
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 5.8)
        c.drawString(x * mm, 18 * mm, label)


def write_techpack(spec, artworks):
    art = {item["id"]: item for item in artworks}
    c = canvas.Canvas(str(TECHPACK_PATH), pagesize=(PAGE_W, PAGE_H), pageCompression=1)
    c.setTitle("BCAI-01 BOTH / AND Community Match Kit - Revision A")
    c.setAuthor("BC + AI")
    c.setSubject("Factory tech pack for jersey and shorts manufacture in India")
    pages = [
        lambda: page_cover(c, spec),
        lambda: page_concept(c, spec),
        lambda: page_flats(c, spec, art),
        lambda: page_front(c, spec, art),
        lambda: page_back(c, spec, art),
        lambda: page_shorts(c, spec, art),
        lambda: page_artwork(c, spec, art),
        lambda: page_materials(c, spec),
        lambda: page_fit(c, spec),
        lambda: page_approval(c, spec),
        lambda: page_manifest(c, spec, artworks),
    ]
    for draw_page in pages:
        draw_page()
        c.showPage()
    c.save()


def sha256(path):
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def write_package_readme(spec):
    readme = f"""# {spec['style']} - {spec['name']}

Factory handoff package, revision {spec['revision']}, issued {spec['date']}.

## Use

1. Read `BCAI-01-BOTH-AND-Tech-Pack.pdf` before quoting or sampling.
2. Use the PDF artwork files at actual size for production.
3. SVG files contain the same font-free vector geometry for editable reference.
4. Return every item listed on pages 9 and 10 before bulk manufacture.
5. Verify package integrity against `SHA256SUMS.txt`.

The artwork direction is locked. This package does not authorize bulk cutting, printing, embroidery, payment, or shipment. Those require the recorded approvals in the tech pack.
"""
    (PACKAGE_DIR / "README.md").write_text(readme, encoding="utf-8")


def build_package(spec, artworks):
    PDF_DIR.mkdir(parents=True, exist_ok=True)
    ART_DIR.mkdir(parents=True, exist_ok=True)
    for artwork in artworks:
        write_svg(artwork, ART_DIR / f'{artwork["id"]}.svg')
        write_artwork_pdf(artwork, ART_DIR / f'{artwork["id"]}.pdf')
    write_techpack(spec, artworks)
    shutil.copy2(TECHPACK_PATH, PACKAGE_TECHPACK_PATH)
    shutil.copy2(SPEC_PATH, PACKAGE_DIR / "BCAI-01-spec.json")
    write_package_readme(spec)
    files = sorted(path for path in PACKAGE_DIR.rglob("*") if path.is_file() and path.name != "SHA256SUMS.txt")
    sums = "\n".join(f"{sha256(path)}  {path.relative_to(PACKAGE_DIR)}" for path in files) + "\n"
    (PACKAGE_DIR / "SHA256SUMS.txt").write_text(sums, encoding="utf-8")
    if ZIP_PATH.exists():
        ZIP_PATH.unlink()
    with zipfile.ZipFile(ZIP_PATH, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for path in sorted(PACKAGE_DIR.rglob("*")):
            if path.is_file():
                archive.write(path, Path("BCAI-01-rev-A") / path.relative_to(PACKAGE_DIR))


def main():
    spec = json.loads(SPEC_PATH.read_text(encoding="utf-8"))
    artworks = artwork_definitions()
    build_package(spec, artworks)
    print(f"Built {TECHPACK_PATH.relative_to(ROOT)}")
    print(f"Built {ZIP_PATH.relative_to(ROOT)}")
    print(f"Artwork files: {len(artworks) * 2}")


if __name__ == "__main__":
    main()
