#!/usr/bin/env python3
"""Schneidet ein Sprite-Sheet (Objekte auf einfarbigem Hintergrund) in Einzelbilder.

Beispiel:
  python3 tools/slice_sheet.py assets/raw/sheet_items_akt1.png assets/sprites/items \
      --names tools/names/items_akt1.txt --cols 5 --rows 4

Ablauf: Hintergrund (Standard #00FF00) wird vom Rand aus freigestellt, Objekte werden als
zusammenhängende Flächen gefunden, nach Leserichtung sortiert und benannt.
Es entstehen pro Objekt eine PNG, eine atlas.json und ein Kontrollbild _debug.png.
"""
import argparse
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi


def parse_color(text):
    text = text.lstrip("#")
    return tuple(int(text[i:i + 2], 16) for i in (0, 2, 4))


def background_mask(rgb, color, tol):
    dist = np.abs(rgb.astype(np.int16) - np.array(color, dtype=np.int16)).max(axis=2)
    candidate = dist <= tol
    labels, _ = ndi.label(candidate)
    border = np.unique(np.concatenate([labels[0], labels[-1], labels[:, 0], labels[:, -1]]))
    border = border[border != 0]
    # Nur mit dem Bildrand verbundene Flächen sind Hintergrund: Grün im Objekt bleibt erhalten.
    return np.isin(labels, border)


def cut_out(img, color, tol, erode):
    rgb = np.asarray(img.convert("RGB"))
    bg = background_mask(rgb, color, tol)
    fg = ~bg
    if erode:
        fg = ndi.binary_erosion(fg, iterations=erode)
    # Entfärben der Kantenpixel (Despill): Grünanteil an Kanten auf die anderen Kanäle begrenzen.
    edge = fg & ndi.binary_dilation(~fg, iterations=2)
    out = rgb.copy()
    g = out[..., 1].astype(np.int16)
    limit = np.maximum(out[..., 0], out[..., 2]).astype(np.int16)
    g = np.where(edge & (g > limit), limit, g)
    out[..., 1] = g.astype(np.uint8)
    alpha = ndi.gaussian_filter(fg.astype(np.float32), 0.6)
    alpha = (np.clip(alpha, 0, 1) * 255).astype(np.uint8)
    alpha[~ndi.binary_dilation(fg, iterations=1)] = 0
    return np.dstack([out, alpha]), fg


def find_objects(fg, gap, min_area):
    merged = ndi.binary_dilation(fg, iterations=gap) if gap else fg
    labels, n = ndi.label(merged)
    boxes = []
    for i, sl in enumerate(ndi.find_objects(labels), start=1):
        area = int((fg[sl] & (labels[sl] == i)).sum())
        if area < min_area:
            continue
        ys, xs = sl
        boxes.append((xs.start, ys.start, xs.stop, ys.stop))
    return boxes


def sort_reading_order(boxes, cols):
    if not cols:
        return sorted(boxes, key=lambda b: ((b[1] + b[3]) // 2 // 100, b[0]))
    by_y = sorted(boxes, key=lambda b: (b[1] + b[3]) / 2)
    rows = [by_y[i:i + cols] for i in range(0, len(by_y), cols)]
    return [b for row in rows for b in sorted(row, key=lambda b: (b[0] + b[2]) / 2)]


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("sheet")
    p.add_argument("outdir")
    p.add_argument("--names", help="Textdatei mit einem Namen pro Zeile (in Leserichtung)")
    p.add_argument("--cols", type=int, default=0, help="Spalten pro Zeile (für saubere Sortierung)")
    p.add_argument("--rows", type=int, default=0)
    p.add_argument("--color", default="#00FF00", help="Hintergrundfarbe")
    p.add_argument("--tol", type=int, default=60, help="Farbtoleranz 0-255")
    p.add_argument("--gap", type=int, default=6, help="Teile mit kleinerem Abstand gehören zusammen (px)")
    p.add_argument("--min-area", type=int, default=400)
    p.add_argument("--pad", type=int, default=4)
    p.add_argument("--erode", type=int, default=1, help="Kante um n Pixel verkleinern (gegen grüne Säume)")
    p.add_argument("--prefix", default="")
    args = p.parse_args()

    img = Image.open(args.sheet)
    rgba, fg = cut_out(img, parse_color(args.color), args.tol, args.erode)
    boxes = sort_reading_order(find_objects(fg, args.gap, args.min_area), args.cols)

    expected = args.cols * args.rows if args.cols and args.rows else None
    names = None
    if args.names:
        names = [l.strip() for l in Path(args.names).read_text(encoding="utf-8").splitlines() if l.strip()]
        expected = expected or len(names)
    if expected and len(boxes) != expected:
        print(f"WARNUNG: {len(boxes)} Objekte gefunden, erwartet {expected}. Prüfe _debug.png.")
    if names and len(names) != len(boxes):
        print(f"WARNUNG: {len(names)} Namen, aber {len(boxes)} Objekte.")

    out = Path(args.outdir)
    out.mkdir(parents=True, exist_ok=True)
    full = Image.fromarray(rgba, "RGBA")
    debug = img.convert("RGB")
    draw = ImageDraw.Draw(debug)
    atlas = {}
    for idx, (x0, y0, x1, y1) in enumerate(boxes):
        name = (names[idx] if names and idx < len(names) else f"{idx + 1:02d}")
        name = f"{args.prefix}{name}"
        box = (max(x0 - args.pad, 0), max(y0 - args.pad, 0),
               min(x1 + args.pad, full.width), min(y1 + args.pad, full.height))
        crop = full.crop(box)
        # Nachbarobjekte, die in den Rand hineinragen, gehören nicht ins Bild.
        crop.save(out / f"{name}.png", optimize=True)
        atlas[name] = {"file": f"{name}.png", "w": crop.width, "h": crop.height,
                       "anchor": [crop.width // 2, crop.height]}
        draw.rectangle((x0, y0, x1, y1), outline=(255, 0, 255), width=3)
        draw.text((x0 + 4, y0 + 4), f"{idx + 1}:{name}", fill=(255, 255, 0))
    (out / f"atlas_{Path(args.sheet).stem}.json").write_text(
        json.dumps(atlas, indent=2, ensure_ascii=False), encoding="utf-8")
    debug.save(out / f"_debug_{Path(args.sheet).stem}.png")
    print(f"{len(boxes)} Objekte nach {out} geschrieben.")


if __name__ == "__main__":
    main()
