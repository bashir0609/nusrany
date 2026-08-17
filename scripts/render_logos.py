#!/usr/bin/env python3
"""
Nusra NY logo renderer.
Produces:
  - redesign/nusra-logo-arrow.svg          (stacked lockup, "NUSRA TRADING INC")
  - redesign/nusra-logo-arrow-ny.svg       (stacked lockup, "NUSRA NY")
  - redesign/exports/*.png / *.jpg         (raster exports of new + existing logos)
Rendered with PIL (no external SVG rasterizer needed).
"""
import math, os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REDESIGN = os.path.join(ROOT, "redesign")
EXPORTS = os.path.join(REDESIGN, "exports")
os.makedirs(EXPORTS, exist_ok=True)

# Brand colors from client's original logo (sampled)
LIME = "#A8C838"
TEAL = "#189090"
NAVY = "#0F2B46"
TEAL_D = "#12707A"
AMBER = "#E8922A"
CREAM = "#FAF7F2"
INK = "#232A33"
MUTED = "#5C6672"

FONT_BOLD = r"C:/Windows/Fonts/arialbd.ttf"
FONT_REG = r"C:/Windows/Fonts/arial.ttf"

# ---------------------------------------------------------------------------
# New "arrow" mark geometry (vector space 520x560; mark lives in top ~370px)
# ---------------------------------------------------------------------------
def arrowhead(draw, tip, tail, width, color, back=55.0, half=30.0):
    """Draw a filled arrowhead triangle: tip -> two back corners along dir."""
    dx, dy = tip[0] - tail[0], tip[1] - tail[1]
    ln = math.hypot(dx, dy) or 1.0
    ux, uy = dx / ln, dy / ln               # unit direction
    px, py = -uy, ux                         # unit perpendicular
    bcx = tip[0] - ux * back
    bcy = tip[1] - uy * back
    c1 = (bcx + px * half, bcy + py * half)
    c2 = (bcx - px * half, bcy - py * half)
    draw.polygon([tip, c1, c2], fill=color)

def mark_geometry():
    """Return list of (type, color, data) draw instructions for the mark."""
    ops = []
    # Lime frame: top bar -> left edge -> bottom bar (stroked, round)
    ops.append(("line", LIME, [(240, 55), (85, 55), (85, 295), (285, 295)], 40))
    # Lime diagonal to top-right arrowhead
    ops.append(("line", LIME, [(285, 295), (415, 150)], 40))
    ops.append(("arrow", LIME, (415, 150), (285, 295)))
    # Small enclosed lime arrow, upper-left inside frame
    ops.append(("line", LIME, [(150, 150), (200, 100)], 26))
    ops.append(("arrow", LIME, (200, 100), (150, 150), 38.0, 22.0))
    # Teal lower-right angular base (triangle)
    ops.append(("poly", TEAL, [(285, 295), (410, 295), (285, 225)]))
    # Teal diagonal to arrowhead
    ops.append(("line", TEAL, [(330, 255), (470, 95)], 26))
    ops.append(("arrow", TEAL, (470, 95), (330, 255), 45.0, 22.0))
    return ops

# ---------------------------------------------------------------------------
# SVG generation (same geometry as the raster)
# ---------------------------------------------------------------------------
def svg_for_text(text):
    ops = mark_geometry()
    parts = [
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 560" '
        'role="img" aria-label="Nusra — %s">' % text
    ]
    for op in ops:
        kind = op[0]
        if kind == "line":
            _, col, pts, w = op
            d = "M" + " L".join("%d,%d" % p for p in pts)
            parts.append(
                '<path d="%s" stroke="%s" stroke-width="%d" fill="none" '
                'stroke-linecap="round" stroke-linejoin="round"/>' % (d, col, w))
        elif kind == "poly":
            _, col, pts = op
            parts.append('<polygon points="%s" fill="%s"/>' % (
                " ".join("%d,%d" % p for p in pts), col))
        elif kind == "arrow":
            _, col, tip, tail, *_ = op
            back = op[4] if len(op) > 4 else 55.0
            half = op[5] if len(op) > 5 else 30.0
            dx, dy = tip[0] - tail[0], tip[1] - tail[1]
            ln = math.hypot(dx, dy) or 1.0
            ux, uy = dx / ln, dy / ln
            px, py = -uy, ux
            bcx, bcy = tip[0] - ux * back, tip[1] - uy * back
            c1 = (bcx + px * half, bcy + py * half)
            c2 = (bcx - px * half, bcy - py * half)
            parts.append('<polygon points="%d,%d %d,%d %d,%d" fill="%s"/>' % (
                tip[0], tip[1], c1[0], c1[1], c2[0], c2[1], col))
    # Text
    parts.append(
        '<text x="260" y="500" text-anchor="middle" font-family="Arial, '
        'Helvetica, sans-serif" font-weight="bold" font-size="54" '
        'letter-spacing="1" fill="%s">%s</text>' % (TEAL, text))
    parts.append('</svg>')
    return "\n".join(parts)

# ---------------------------------------------------------------------------
# Raster rendering (PIL)
# ---------------------------------------------------------------------------
def render_new_logo(size, text, scale=2.0):
    """Render stacked mark+text at requested pixel size (height-based)."""
    H = size
    W = int(H * 520.0 / 560.0)
    s = H / 560.0
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    for op in mark_geometry():
        kind = op[0]
        if kind == "line":
            _, col, pts, w = op
            d.line([(x * s, y * s) for x, y in pts], fill=col,
                   width=max(2, int(w * s)), joint="curve")
        elif kind == "poly":
            _, col, pts = op
            d.polygon([(x * s, y * s) for x, y in pts], fill=col)
        elif kind == "arrow":
            _, col, tip, tail, *_ = op
            back = op[4] if len(op) > 4 else 55.0
            half = op[5] if len(op) > 5 else 30.0
            arrowhead(d, (tip[0] * s, tip[1] * s), (tail[0] * s, tail[1] * s),
                      max(2, int(40 * s)), col, back=back * s, half=half * s)
    # Text
    fsize = max(10, int(54 * s))
    font = ImageFont.truetype(FONT_BOLD, fsize)
    bbox = d.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    tx = (W - tw) / 2 - bbox[0]
    ty = 470 * s - bbox[1]
    d.text((tx, ty), text, font=font, fill=TEAL)
    return img

# ---------------------------------------------------------------------------
# Existing logo system (drawn to match redesign/logo*.svg)
# ---------------------------------------------------------------------------
def _rgb(hexcol):
    h = hexcol.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def rounded_badge_mark(px, light=False):
    """Badge: navy->teal rounded square, white N, amber closing stroke."""
    s = px / 64.0
    img = Image.new("RGBA", (px, px), (0, 0, 0, 0))
    r = int(17 * s)
    top = _rgb("#16395C" if light else NAVY)
    bot = _rgb("#17808C" if light else TEAL_D)
    # vertical gradient + rounded mask
    mask = Image.new("L", (px, px), 0)
    dm = ImageDraw.Draw(mask)
    dm.rounded_rectangle([int(1.5 * s), int(1.5 * s), px - int(1.5 * s),
                          px - int(1.5 * s)], radius=r, fill=255)
    grad = Image.new("RGBA", (px, px))
    dg = ImageDraw.Draw(grad)
    for y in range(px):
        t = y / px
        col = tuple(int(top[i] + (bot[i] - top[i]) * t) for i in range(3))
        dg.line([(0, y), (px, y)], fill=col + (255,))
    img = Image.composite(grad, img, mask)
    d = ImageDraw.Draw(img)
    # N strokes
    w = max(2, int(8 * s))
    amber = "#FFD9A0" if light else AMBER
    d.line([(19 * s, 47 * s), (19 * s, 17 * s)], fill="#FFFFFF", width=w)
    d.line([(19 * s, 17 * s), (45 * s, 47 * s)], fill="#FFFFFF", width=w)
    d.line([(45 * s, 17 * s), (45 * s, 47 * s)], fill=amber, width=w)
    if light:
        d.rounded_rectangle([int(1.5 * s), int(1.5 * s), px - int(1.5 * s),
                             px - int(1.5 * s)], radius=r,
                            outline=(255, 255, 255, 90), width=2)
    return img

def render_existing_lockup(px, dark=False):
    """Horizontal lockup: badge + 'Nusra' + amber 'NY' + tagline."""
    W, H = px, int(px * 72.0 / 330.0)
    s = H / 72.0
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    badge = rounded_badge_mark(int(64 * s), light=dark)
    img.paste(badge, (int(4 * s), int(4 * s)), badge)
    name_col = "#FFFFFF" if dark else NAVY
    ny_col = "#FFD9A0" if dark else AMBER
    tag_col = "#B9C8D8" if dark else MUTED
    fname = ImageFont.truetype(FONT_BOLD, max(8, int(31 * s)))
    ftag = ImageFont.truetype(FONT_REG, max(6, int(10 * s)))
    d.text((86 * s, 2 * s), "Nusra", font=fname, fill=name_col)
    d.text((86 * s + d.textlength("Nusra", font=fname) + 2 * s, 2 * s),
           "NY", font=fname, fill=ny_col)
    d.text((87 * s, 26 * s), "TAX · ITIN · IMMIGRATION FORMS", font=ftag, fill=tag_col)
    return img

def save_jpg(img, path, bg=(255, 255, 255)):
    base = Image.new("RGB", img.size, bg)
    base.paste(img, (0, 0), img)
    base.save(path, "JPEG", quality=92)

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main():
    # 1) New arrow logos -> SVG
    open(os.path.join(REDESIGN, "nusra-logo-arrow.svg"), "w",
         encoding="utf-8").write(svg_for_text("NUSRA TRADING INC"))
    open(os.path.join(REDESIGN, "nusra-logo-arrow-ny.svg"), "w",
         encoding="utf-8").write(svg_for_text("NUSRA NY"))

    # 2) Raster exports
    for label, text in (("nusra-logo", "NUSRA TRADING INC"),
                        ("nusra-logo-ny", "NUSRA NY")):
        for size in (256, 512, 1024):
            img = render_new_logo(size, text)
            img.save(os.path.join(EXPORTS, f"{label}-{size}.png"))
            if size >= 512:
                save_jpg(img, os.path.join(EXPORTS, f"{label}-{size}.jpg"))

    # 3) Existing logo system exports
    badge = rounded_badge_mark(1024)
    badge.save(os.path.join(EXPORTS, "nusra-badge-512.png"))
    save_jpg(badge.resize((512, 512), Image.LANCZOS),
             os.path.join(EXPORTS, "nusra-badge-512.jpg"))
    badge.resize((256, 256), Image.LANCZOS).save(
        os.path.join(EXPORTS, "nusra-badge-256.png"))

    for name, dark in (("nusra-lockup", False), ("nusra-lockup-dark", True)):
        img = render_existing_lockup(1024, dark=dark)
        img.save(os.path.join(EXPORTS, f"{name}-1024.png"))
        save_jpg(img, os.path.join(EXPORTS, f"{name}-1024.jpg"))
        img.resize((512, 512), Image.LANCZOS).save(
            os.path.join(EXPORTS, f"{name}-512.png"))

    # favicon-ish square from badge
    badge.resize((64, 64), Image.LANCZOS).save(
        os.path.join(EXPORTS, "nusra-favicon-64.png"))

    print("DONE — exports written to:", EXPORTS)

if __name__ == "__main__":
    main()
