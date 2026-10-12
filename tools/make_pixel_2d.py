#!/usr/bin/env python3
"""Schneidet die per Nano Banana in 2D gewandelten Pixel-Raster (assets/raw/refs_3d2d/Pixel_*.jpeg, grauer Grund) zu Sprites für _Final.
Raster: side 4x3 (12, blickt nach rechts), Piexl_front 4x2 (8), Pixel_back 4x2 (8), Pixel_idle 4x3 (Zeile 1 vorn, 2 seitlich nach rechts, 3 hinten, je 4), Pixel_talk 4x2 (8, blickt nach rechts).
Ausgabe in _Final/assets/sprites/characters (Standard-Outfit): walk_1..12, walkfront_1..8, walkback_1..8, idle_front_1..4, idle_side_1..4, idle_back_1..4, talk_1..8
(und pixel_idle_front/side/back.png = Bild 1). Alle seitlichen Bilder blicken nach RECHTS (links spiegelt die Engine).
  python3 tools/make_pixel_2d.py
"""
import json, os, re, sys
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "raw" / "refs_3d2d"
OUT = ROOT / "_Final" / "assets" / "sprites" / "characters"
sys.path.insert(0, str(ROOT / "tools"))
import make_final as mf  # noqa: E402

BG = np.array([207, 207, 207])


def key_out(im):
    """Grauen Grund entfernen: Pixel, die dem Grund gleichen UND mit dem Rand verbunden sind (oder große Löcher bilden)."""
    a = np.asarray(im.convert("RGB")).astype(np.int32)
    dist = np.abs(a - BG).max(axis=2)
    near = dist < 26
    lab, n = ndi.label(near)
    h, w = near.shape
    border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    sizes = ndi.sum(near, lab, index=np.arange(1, n + 1))
    bgmask = np.zeros_like(near)
    for i in range(1, n + 1):
        if i in border or sizes[i - 1] > 900:
            bgmask |= lab == i
    alpha = np.where(bgmask, 0.0, 1.0)
    # weicher Rand: Übergangspixel nach Abstand zum Grund
    soft = np.clip((dist - 14) / 30.0, 0, 1)
    edge = ndi.binary_dilation(bgmask, iterations=2) & ~bgmask
    alpha = np.where(edge, np.minimum(1.0, soft + 0.35), alpha)
    alpha = ndi.gaussian_filter(alpha, 0.6)
    alpha = np.where(bgmask, 0, np.clip(alpha * 1.15, 0, 1))
    rgba = np.dstack([a.astype(np.uint8), (alpha * 255).astype(np.uint8)])
    return Image.fromarray(rgba, "RGBA")


def cells(path, cols, rows):
    im = Image.open(path).convert("RGB")
    W, H = im.size
    cw, ch = W // cols, H // rows
    out = []
    for r in range(rows):
        for c in range(cols):
            cell = key_out(im.crop((c * cw, r * ch, (c + 1) * cw, (r + 1) * ch)))
            out.append(cell)
    return out


def bbox(im):
    return im.getchannel("A").point(lambda v: 255 if v > 40 else 0).getbbox()


def fit_set(frames, target_h, flip):
    """Gemeinsamer Maßstab (Median der Figurenhöhe -> target_h), Füße auf einer Linie, Oberkörper auf einer Mittellinie, gemeinsames Fenster."""
    if flip:
        frames = [f.transpose(Image.FLIP_LEFT_RIGHT) for f in frames]
    bbs = [bbox(f) for f in frames]
    k = target_h / float(np.median([b[3] - b[1] for b in bbs]))
    crops, cxs = [], []
    for f, b in zip(frames, bbs):
        c = f.crop(b)
        a = np.asarray(c.getchannel("A")).astype(float)
        top = a[: max(1, int(a.shape[0] * 0.55))]
        xs = np.arange(a.shape[1])
        cx = (top.sum(0) * xs).sum() / max(1.0, top.sum())  # Schwerpunkt Oberkörper
        c = c.resize((max(1, round(c.width * k)), max(1, round(c.height * k))), Image.LANCZOS)
        crops.append(c); cxs.append(cx * k)
    L = max(cx for cx in cxs); R = max(c.width - cx for c, cx in zip(crops, cxs)); Hh = max(c.height for c in crops)
    W = int(round(L + R)) + 8
    outs = []
    for c, cx in zip(crops, cxs):
        canvas = Image.new("RGBA", (W, Hh + 4), (0, 0, 0, 0))
        canvas.paste(c, (int(round(L - cx)) + 4, Hh + 4 - c.height), c)
        outs.append(canvas)
    return outs


def main():
    target = mf.__dict__.get("T") or None
    # Zielhöhe: Körperhöhe des Original-Ruhebilds (Version 1)
    a = np.asarray(Image.open(ROOT / "assets/sprites/characters/pixel_idle_front.png").convert("RGBA"))[..., 3] > 40
    r = np.nonzero(a.any(axis=1))[0]; T = int(r.max() - r.min() + 1)
    # Alte Standard-Dateien dieses Satzes entfernen
    for f in list(OUT.iterdir()):
        if re.match(r"^pixel_(walk_\d+|walkl_\d+|walkfront_\d+|walkback_\d+|idle_(front|side|back)(_\d+)?|talk(_[ab]|_\d+)?)\.png$", f.name):
            f.unlink()
    sets = {}
    side = cells(SRC / "Pixel_side.jpeg", 4, 3)
    front = cells(SRC / "Piexl_front.jpeg", 4, 2)
    back = cells(SRC / "Pixel_back.jpeg", 4, 2)
    idle = cells(SRC / "Pixel_idle.jpeg", 4, 3)
    talk = cells(SRC / "Pixel_talk.jpeg", 4, 2)
    sets["walk_%d"] = fit_set(side, T, flip=False)
    sets["walkfront_%d"] = fit_set(front, T, flip=False)
    sets["walkback_%d"] = fit_set(back, T, flip=False)
    sets["idle_front_%d"] = fit_set(idle[0:4], T, flip=False)
    sets["idle_side_%d"] = fit_set(idle[4:8], T, flip=False)
    sets["idle_back_%d"] = fit_set(idle[8:12], T, flip=False)
    sets["talk_%d"] = fit_set(talk, T, flip=False)
    n = 0
    for pat, frames in sets.items():
        for i, im in enumerate(frames, 1):
            im.save(OUT / ("pixel_" + pat % i + ".png"), optimize=True); n += 1
    for v in ("front", "side", "back"):
        Image.open(OUT / f"pixel_idle_{v}_1.png").save(OUT / f"pixel_idle_{v}.png", optimize=True)
    # Fußpunkte und Bildanzahl eintragen
    p = ROOT / "_Final" / "data" / "assets.js"; s = p.read_text(encoding="utf-8")
    m = re.search(r"NN\.feet = (\{.*?\});\n", s, re.S); feet = json.loads(m.group(1))
    for k in [k for k in feet if re.match(r"characters/pixel_(walk|idle|talk)", k) and not re.match(r"characters/pixel_(gala|suit)_", k)]:
        del feet[k]
    for f in OUT.glob("pixel_*.png"):
        if re.match(r"pixel_(walk|idle|talk)", f.name):
            v = mf.feet_for(f)
            if v: feet["characters/" + f.name] = v
    s = s[:m.start(1)] + json.dumps(feet, separators=(",", ":")) + s[m.end(1):]
    p.write_text(s, encoding="utf-8")
    p = ROOT / "_Final" / "data" / "walkinfo.js"; s = p.read_text(encoding="utf-8")
    wi = json.loads(re.search(r"NN\.walkInfo = (\{.*\});", s).group(1))
    wi["pixel_"] = {"side": 12, "front": 8, "back": 8, "idle": 4, "talk": 8}
    p.write_text("// Anzahl der Laufbilder je Outfit (idle = Atembilder je Ansicht, talk = Sprechbilder)\nwindow.NN = window.NN || {};\nNN.walkInfo = " + json.dumps(wi) + ";\n", encoding="utf-8")
    print(n, "Bilder, Zielhöhe", T)


if __name__ == "__main__":
    main()
