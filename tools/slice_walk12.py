#!/usr/bin/env python3
"""Baut die Laufbilder aus den walk12_*-Sheets:
 - wählt gültige Zellen (CELLS), ordnet sie automatisch zur glattesten Schleife (tools/order_walk.py),
 - richtet alle Bilder gleich aus (Oberkörper-Mitte, gemeinsame Unterkante, gemeinsames Fenster),
 - skaliert auf die bisherige Figurengröße und schreibt pixel_walk_N / pixel_walk_front_N / pixel_walk_back_N,
 - schreibt data/walkinfo.js (Bildanzahl je Outfit).
  python3 tools/slice_walk12.py
"""
import json
import sys
from pathlib import Path
import numpy as np
from PIL import Image
sys.path.insert(0, str(Path(__file__).resolve().parent))
import order_walk as ow  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
CH = ROOT / "assets" / "sprites" / "characters"
RAW = ROOT / "assets" / "raw"

# (Outfit-Präfix, Sheet, gültige Zellen ab 1)
SIDE = [("pixel_", "walk12_standard_seite", list(range(1, 19))),
        ("pixel_gala_", "walk12_gala_seite", list(range(1, 14))),
        ("pixel_suit_", "walk12_raumanzug_seite", [c for c in range(1, 25) if c not in (18, 19, 20, 21)])]
FB = [("pixel_", "walk12_standard_vorn_hinten", range(1, 7), range(7, 13)),
      ("pixel_gala_", "walk12_gala_vorn_hinten", range(1, 7), range(7, 17))]
W, H = 260, 300


def old_height(prefix):
    hs = []
    for i in range(1, 9):
        p = CH / f"{prefix}walk_{i}.png"
        if p.exists():
            a = np.asarray(Image.open(p).convert("RGBA"))[..., 3] > 40
            r = np.nonzero(a.any(axis=1))[0]
            hs.append(r.max() - r.min() + 1)
    return float(np.mean(hs))


def render(frames, order, factor, prefix_name):
    cs = []
    for i in order:
        arr, m, _ = frames[i]
        h, w = m.shape
        top = m[: max(1, int(h * 0.45))]
        cx = np.nonzero(top)[1].mean() if top.any() else w / 2
        canvas = np.zeros((H, W, 4), np.uint8)
        ox, oy = int(round(W / 2 - cx)), H - 8 - h
        ys0, xs0 = max(oy, 0), max(ox, 0)
        sub = arr[ys0 - oy: ys0 - oy + min(h - (ys0 - oy), H - ys0), xs0 - ox: xs0 - ox + min(w - (xs0 - ox), W - xs0)]
        canvas[ys0:ys0 + sub.shape[0], xs0:xs0 + sub.shape[1]] = sub
        cs.append(canvas)
    alpha = np.max([c[..., 3] for c in cs], axis=0) > 20
    ys, xs = np.nonzero(alpha)
    y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    return [Image.fromarray(c[y0:y1, x0:x1], "RGBA") for c in cs]


def save(imgs, prefix, base, factor):
    for old in CH.glob(f"{prefix}{base}_*.png"):
        if old.stem[len(prefix + base) + 1:].isdigit():
            old.unlink()
    for n, im in enumerate(imgs, start=1):
        if abs(factor - 1) > 0.01:
            im = im.resize((max(1, round(im.width * factor)), max(1, round(im.height * factor))), Image.LANCZOS)
        im.save(CH / f"{prefix}{base}_{n}.png", optimize=True)


info = {}
for prefix, sheet, cells in SIDE:
    fr_all = ow.extract(RAW / f"{sheet}.png")
    fr = [fr_all[c - 1] for c in cells if c - 1 < len(fr_all)]
    D = ow.dist_matrix(fr)
    L, tour = ow.best_cycle(D, range(len(fr)))
    if ow.foot_dir(fr, tour) < 0:
        tour = tour[::-1]
    # Schleife an der stärksten Kante öffnen, damit der Wechsel Ende -> Anfang der natürlichste ist (bleibt Schleife)
    imgs = render(fr, tour, 1, sheet)
    mean_h = np.mean([np.asarray(i)[..., 3].astype(bool).any(axis=1).sum() for i in imgs])
    factor = old_height(prefix) / mean_h
    save(imgs, prefix, "walk", factor)
    info[prefix] = {"side": len(imgs)}
    print(prefix, "Seite:", len(imgs), "Bilder, Reihenfolge", [cells[t] for t in tour], "Faktor", round(factor, 3))

for prefix, sheet, front, back in FB:
    fr_all = ow.extract(RAW / f"{sheet}.png")
    for name, rng in (("walkfront", front), ("walkback", back)):
        fr = [fr_all[c - 1] for c in rng if c - 1 < len(fr_all)]
        D = ow.dist_matrix(fr)
        L, tour = ow.best_cycle(D, range(len(fr)))
        imgs = render(fr, tour, 1, sheet)
        mean_h = np.mean([np.asarray(i)[..., 3].astype(bool).any(axis=1).sum() for i in imgs])
        ref = CH / f"{prefix}walk_front.png" if name == "walkfront" else CH / f"{prefix}walk_back.png"
        factor = 1.0
        if ref.exists():
            a = np.asarray(Image.open(ref).convert("RGBA"))[..., 3] > 40
            r = np.nonzero(a.any(axis=1))[0]
            factor = (r.max() - r.min() + 1) / mean_h
        save(imgs, prefix, name, factor)
        info[prefix][name[4:]] = len(imgs)
        print(prefix, name, len(imgs), "Faktor", round(factor, 3))

(ROOT / "data" / "walkinfo.js").write_text("// erzeugt von tools/slice_walk12.py: Anzahl der Laufbilder je Outfit\nwindow.NN = window.NN || {};\nNN.walkInfo = " + json.dumps(info) + ";\n")
print(info)
