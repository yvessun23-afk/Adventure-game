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
    # Alle Bilder bekommen dasselbe Fenster (gleiche Breite/Höhe, gleiche Lage zur Zelle), damit die Figur beim Wechsel nicht zittert
    cell = img.width / 8
    info = []
    for bb, lab in found:
        m = labels == lab
        ys, xs = np.nonzero(m)
        info.append((lab, xs.min(), xs.max(), ys.min(), ys.max(), (xs.min() + xs.max()) / 2 - (len(info) + 0.5) * cell))
    off = float(np.median([t[5] for t in info]))
    half = max(max(abs((t[1] + t[2]) / 2 - t[1]), abs(t[2] - (t[1] + t[2]) / 2)) for t in info) + 4
    y0 = int(min(t[3] for t in info)) - 3
    y1 = int(max(t[4] for t in info)) + 4
    factor = old / float(np.mean([t[4] - t[3] for t in info]))
    for i, (lab, xa, xb, ya, yb, o) in enumerate(info, start=1):
        m = labels == lab
        cx = int(round((i - 0.5) * cell + off))
        x0, x1 = cx - int(half), cx + int(half)
        arr = rgba.copy(); arr[..., 3] = np.where(m, arr[..., 3], 0)
        pad = np.zeros((img.height, img.width + 400, 4), np.uint8)
        pad[:, 200:200 + img.width] = arr
        sp = Image.fromarray(pad[y0:y1, x0 + 200:x1 + 200], "RGBA")
        sp = sp.resize((max(1, round(sp.width * factor)), max(1, round(sp.height * factor))), Image.LANCZOS)
        sp.save(OUT / f"{prefix}walk_{i}.png", optimize=True)
    print(src, "ok, Faktor", round(factor, 3), "Fenster", x1 - x0, "x", y1 - y0)
