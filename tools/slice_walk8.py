#!/usr/bin/env python3
"""Baut aus den walk8_standard_*-Sheets die Laufbilder des Standard-Outfits:
 pixel_walk_N (rechts), pixel_walkl_N (links), pixel_walkfront_N, pixel_walkback_N.
Reihenfolge: glatteste Schleife (order_walk), Beinwechsel-Richtung geprüft, fast gleiche Nachbarbilder werden entfernt.
Schreibt data/walkinfo.js neu (nur Standard geändert, Gala/Raumanzug bleiben).
"""
import json, re, sys
from pathlib import Path
import numpy as np
from PIL import Image
sys.path.insert(0, str(Path(__file__).resolve().parent))
import order_walk as ow  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
CH = ROOT / "assets" / "sprites" / "characters"
RAW = ROOT / "assets" / "raw"
W, H = 520, 560


def good(frames):
    """Geisterbilder (halbtransparent/verwischt) aussortieren."""
    out = []
    for f in frames:
        a = f[0][..., 3][f[1]]
        if a.mean() > 200 and f[1].sum() > 2500:
            out.append(f)
    return out


def dedupe(frames, order, D):
    """Entfernt Bilder, die dem Vorgänger (zyklisch) fast gleichen; mehrere Läufe bis stabil."""
    order = list(order)
    changed = True
    while changed and len(order) > 4:
        changed = False
        ds = [D[order[k - 1], order[k]] for k in range(len(order))]
        med = float(np.median(ds))
        k = int(np.argmin(ds))
        if ds[k] < 0.35 * med:
            del order[k]; changed = True
    return order


def render(frames, order):
    cs = []
    for i in order:
        arr, m, _ = frames[i]
        h, w = m.shape
        top = m[: max(1, int(h * 0.45))]
        cx = np.nonzero(top)[1].mean() if top.any() else w / 2
        canvas = np.zeros((H, W, 4), np.uint8)
        ox, oy = int(round(W / 2 - cx)), H - 8 - h
        y0, x0 = max(oy, 0), max(ox, 0)
        sub = arr[y0 - oy: y0 - oy + min(h - (y0 - oy), H - y0), x0 - ox: x0 - ox + min(w - (x0 - ox), W - x0)]
        canvas[y0:y0 + sub.shape[0], x0:x0 + sub.shape[1]] = sub
        cs.append(canvas)
    alpha = np.max([c[..., 3] for c in cs], axis=0) > 20
    ys, xs = np.nonzero(alpha)
    y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    return [Image.fromarray(c[y0:y1, x0:x1], "RGBA") for c in cs]


def old_h(name):
    p = CH / name
    a = np.asarray(Image.open(p).convert("RGBA"))[..., 3] > 40
    r = np.nonzero(a.any(axis=1))[0]
    return r.max() - r.min() + 1


def save(imgs, base, ref_h):
    for old in CH.glob(f"pixel_{base}_*.png"):
        if old.stem[len(f"pixel_{base}_"):].isdigit():
            old.unlink()
    mean_h = np.mean([np.asarray(i)[..., 3].astype(bool).any(axis=1).sum() for i in imgs])
    factor = ref_h / mean_h
    for n, im in enumerate(imgs, start=1):
        im = im.resize((max(1, round(im.width * factor)), max(1, round(im.height * factor))), Image.LANCZOS)
        im.save(CH / f"pixel_{base}_{n}.png", optimize=True)
    return factor


def cycle(frames, direction=None):
    D = ow.dist_matrix(frames)
    L, tour = ow.best_cycle(D, range(len(frames)))
    if direction and ow.foot_dir(frames, tour) < 0:
        tour = tour[::-1]
    tour = dedupe(frames, tour, D)
    return tour, D


def main():
    info = {}
    ref_side = 0.97 * old_h("pixel_idle_side.png")
    for sheet, base, flip in (("walk8_standard_rechts", "walk", False), ("walk8_standard_links", "walkl", True)):
        fr = good(ow.extract(RAW / f"{sheet}.png"))
        tour, D = cycle(fr, direction=True)
        if flip:  # nach links: Laufrichtung zeigt nach links, Richtungsprüfung spiegeln
            fl = [(a[:, ::-1].copy(), m[:, ::-1].copy(), p) for a, m, p in fr]
            tour, D = cycle(fl, direction=True)
            imgs = render(fl, tour)
            imgs = [i.transpose(Image.FLIP_LEFT_RIGHT) for i in imgs]
        else:
            imgs = render(fr, tour)
        f = save(imgs, base, ref_side)
        info[base] = len(imgs)
        print(sheet, len(fr), "Zellen ->", len(imgs), "Bilder, Reihenfolge", [t + 1 for t in tour], "Faktor", round(f, 3))
    fb = good(ow.extract(RAW / "walk8_standard_vorn_hinten.png"))
    print("vorn/hinten Zellen", len(fb))
    front = fb[:4]
    back = fb[4:]
    for name, lst in (("walkfront", front), ("walkback", back)):
        tour, D = cycle(lst)
        imgs = render(lst, tour)
        ref = 0.97 * old_h("pixel_idle_front.png" if name == "walkfront" else "pixel_idle_back.png")
        f = save(imgs, name, ref)
        info[name] = len(imgs)
        print(name, len(lst), "->", len(imgs), "Faktor", round(f, 3))
    # walkinfo aktualisieren
    p = ROOT / "data" / "walkinfo.js"
    txt = p.read_text()
    cur = json.loads(re.search(r"NN.walkInfo = (\{.*\});", txt).group(1))
    cur["pixel_"] = {"side": info["walk"], "left": info["walkl"], "front": info["walkfront"], "back": info["walkback"]}
    p.write_text("// erzeugt von tools/slice_walk12.py / slice_walk8.py: Anzahl der Laufbilder je Outfit\nwindow.NN = window.NN || {};\nNN.walkInfo = " + json.dumps(cur) + ";\n")
    print(cur)


if __name__ == "__main__":
    main()
