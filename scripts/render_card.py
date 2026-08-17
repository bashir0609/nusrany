#!/usr/bin/env python3
"""Render Nusra NY business card (front + back) at 1050x600 px = 3.5x2in @300dpi."""
import math, os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXPORTS = os.path.join(ROOT, "redesign", "exports")
os.makedirs(EXPORTS, exist_ok=True)

NAVY = (15, 43, 70)
TEAL = (24, 144, 144)
LIME = (168, 200, 56)
CREAM = (250, 246, 238)
INK = (35, 42, 51)
MUTED = (92, 102, 114)

FONT_B = r"C:/Windows/Fonts/arialbd.ttf"
FONT_R = r"C:/Windows/Fonts/arial.ttf"

W, H = 1050, 600

def draw_mark(d, x, y, s=1.0):
    """Draw the lime/teal arrow mark at (x,y) scaled by s (design coords are in a 420x270 space)."""
    def P(px, py): return (x + px * s, y + py * s)
    def PTS(pts): return [P(px, py) for px, py in pts]
    w_lime = int(40 * s); w_teal = int(26 * s)
    d.line(PTS([(240, 55), (85, 55), (85, 295), (285, 295)]), fill=LIME, width=max(2, w_lime), joint="curve")
    d.line(PTS([(285, 295), (415, 150)]), fill=LIME, width=max(2, w_lime), joint="curve")
    d.polygon(PTS([(415, 150), (400.6, 210.9), (356, 170.9)]), fill=LIME)
    d.line(PTS([(150, 150), (200, 100)]), fill=LIME, width=max(2, w_teal), joint="curve")
    d.polygon(PTS([(200, 100), (188.7, 142.5), (157.5, 111.3)]), fill=LIME)
    d.polygon(PTS([(285, 295), (410, 295), (285, 225)]), fill=TEAL)
    d.line(PTS([(330, 255), (470, 95)]), fill=TEAL, width=max(2, w_teal), joint="curve")
    d.polygon(PTS([(470, 95), (456.9, 143.3), (423.9, 114.3)]), fill=TEAL)

def center_text(d, y, text, font, fill, cx=W / 2):
    bbox = d.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    d.text((cx - tw / 2 - bbox[0], y), text, font=font, fill=fill)

def front():
    img = Image.new("RGB", (W, H), CREAM)
    d = ImageDraw.Draw(img)
    # thin border
    d.rectangle([2, 2, W - 3, H - 3], outline=(216, 210, 196), width=2)
    # logo mark top-left
    draw_mark(d, 46, 40, s=0.42)  # ~176 wide, 107 tall
    # biz name next to mark
    f_name = ImageFont.truetype(FONT_B, 46)
    f_small = ImageFont.truetype(FONT_R, 15)
    d.text((246, 58), "Nusra NY", font=f_name, fill=NAVY)
    d.text((247, 112), "TAX · ITIN · IMMIGRATION FORMS", font=f_small, fill=TEAL)
    # decorative top-right
    d.polygon([(W, H), (W - 260, H), (W, H - 260)], fill=(24, 144, 144, 0) if False else (234, 238, 220))
    d.polygon([(W, H - 150), (W - 150, H), (W, H)], fill=(222, 230, 200))
    # name / role
    f_cref = ImageFont.truetype(FONT_R, 15)
    d.text((46, 440), "Aminul Islam Khan", font=ImageFont.truetype(FONT_B, 40), fill=INK)
    d.text((46, 490), "CEO & President — Nusra Trading Inc", font=ImageFont.truetype(FONT_R, 20), fill=MUTED)
    d.text((46, 528), "Multilingual  ·  Queens  ·  In-person & virtual", font=f_cref, fill=TEAL)
    return img

def back():
    img = Image.new("RGB", (W, H))
    d = ImageDraw.Draw(img)
    # vertical gradient navy -> teal
    for y in range(H):
        t = y / H
        col = tuple(int(NAVY[i] + (TEAL[i] - NAVY[i]) * t) for i in range(3))
        d.line([(0, y), (W, y)], fill=col)
    # header
    d.text((46, 40), "OUR SERVICES", font=ImageFont.truetype(FONT_B, 22), fill=(234, 246, 214))
    services = [
        "Individual Tax Returns", "Business & Self-Employed Taxes",
        "ITIN Applications", "Immigration Form Assistance",
        "Business Formation", "Notary & Community Services",
    ]
    f_s = ImageFont.truetype(FONT_B, 21)
    col_x = [46, 540]
    row_h = 46
    y0 = 96
    for i, s in enumerate(services):
        cx = col_x[i // 3]
        cy = y0 + (i % 3) * row_h
        d.text((cx, cy), "✓", font=f_s, fill=LIME)
        d.text((cx + 34, cy), s, font=f_s, fill=(255, 255, 255))
    # contact
    f_c = ImageFont.truetype(FONT_B, 20)
    f_cv = ImageFont.truetype(FONT_R, 20)
    contacts = [
        ("Call", "+1 (347) 740-9782"), ("WhatsApp", "+1 (929) 672-0255"),
        ("Email", "info@nusrany.com"), ("Office", "90-54 204 Street, Hollis NY 11423"),
    ]
    cy = 330
    for i, (k, v) in enumerate(contacts):
        cx = col_x[i // 2]
        yy = cy + (i % 2) * 52
        d.text((cx, yy), k.upper(), font=f_c, fill=LIME)
        d.text((cx, yy + 26), v, font=f_cv, fill=(234, 241, 248))
    # payments
    f_p = ImageFont.truetype(FONT_B, 17)
    f_pv = ImageFont.truetype(FONT_R, 17)
    d.text((46, 452), "PAYMENTS", font=f_p, fill=LIME)
    d.text((46, 478), "Cash · Zelle · Visa® · Mastercard®", font=f_pv, fill=(234, 241, 248))
    # fine print
    fine = ("We provide administrative assistance with tax preparation, ITIN applications and "
            "immigration forms. We are not a law firm and do not provide legal advice.")
    f_fine = ImageFont.truetype(FONT_R, 13)
    d.text((46, 520), fine, font=f_fine, fill=(185, 200, 216))
    d.text((46, 548), "© Nusra Trading Inc", font=f_fine, fill=(185, 200, 216))
    return img

def save_jpg(img, path, bg=(255, 255, 255)):
    img.save(path, "JPEG", quality=92)

def main():
    fr = front()
    bk = back()
    fr.save(os.path.join(EXPORTS, "business-card-front-1024.png"))
    bk.save(os.path.join(EXPORTS, "business-card-back-1024.png"))
    save_jpg(fr, os.path.join(EXPORTS, "business-card-front-1024.jpg"))
    save_jpg(bk, os.path.join(EXPORTS, "business-card-back-1024.jpg"))
    # half-size for web
    fr.resize((W // 2, H // 2), Image.LANCZOS).save(os.path.join(EXPORTS, "business-card-front-512.png"))
    bk.resize((W // 2, H // 2), Image.LANCZOS).save(os.path.join(EXPORTS, "business-card-back-512.png"))
    print("DONE — business card exports written to:", EXPORTS)

if __name__ == "__main__":
    main()
