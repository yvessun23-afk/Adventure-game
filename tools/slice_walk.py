#!/usr/bin/env python3
"""Schneidet die 8 Seiten-Laufbilder (erste Reihe) aus assets/raw/walk_pixel*.png und ersetzt pixel_walk_1..8.
Maßstab: gemeinsamer Faktor, sodass die mittlere Figurenhöhe der bisherigen Laufbilder erhalten bleibt.
  python3 tools/slice_walk.py
"""
import sys
from pathlib import Path
import numpy as np
from PIL import Image
sys.path.insert(0, str(Path(__file__).resolve().parent))
import slice_sheet as ss  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "sprites" / "characters"
SETS = [("walk_pixel.png", "pixel_"), ("walk_pixel_gala.png", "pixel_gala_"), ("walk_pixel_raumanzug.png", "pixel_suit_")]


def heights(prefix, n):
    hs = []
    for i in range(1, n + 1):
        p = OUT / f"{prefix}walk_{i}.png"
        if p.exists():
            a = np.asarray(Image.open(p).convert("RGBA"))[..., 3] > 40
            r = np.nonzero(a.any(axis=1))[0]
            hs.append(r.max() - r.min() + 1)
    return float(np.mean(hs))


for src, prefix in SETS:
    img = Image.open(ROOT / "assets" / "raw" / src)
    rgba, fg = ss.cut_out(img, ss.parse_color("#00FF00"), 60, 1)
    row = fg.copy(); row[int(img.height * 0.34):] = False       # nur Reihe 1
    found, labels = ss.find_objects(row, 4, 800)
    found = sorted(found, key=lambda t: t[0][0])
    if len(found) != 8:
        print(src, "->", len(found), "Figuren in Reihe 1 statt 8, abgebrochen"); continue
    old = heights(prefix, 7)
    boxes = [(f[0][3] - f[0][1]) for f in found]
    factor = old / float(np.mean(boxes))
    for i, (bb, lab) in enumerate(found, start=1):
        m = labels == lab
        ys, xs = np.nonzero(m)
        x0, x1, y0, y1 = max(xs.min() - 3, 0), xs.max() + 4, max(ys.min() - 3, 0), ys.max() + 4
        arr = rgba.copy(); arr[..., 3] = np.where(m, arr[..., 3], 0)
        sp = Image.fromarray(arr[y0:y1, x0:x1], "RGBA")
        sp = sp.resize((max(1, round(sp.width * factor)), max(1, round(sp.height * factor))), Image.LANCZOS)
        sp.save(OUT / f"{prefix}walk_{i}.png", optimize=True)
    print(src, "ok, Faktor", round(factor, 3))
