#!/usr/bin/env python3
"""Erzeugt data/assets.js: Dateilisten zum Vorladen, Musikliste und Fußpositionen der Figuren-Sprites.
Nach neuen Sprites oder Musikdateien erneut ausführen:  python3 tools/make_index.py"""
import json, os
import numpy as np
from PIL import Image

r = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + "/"
idx = {d: sorted(f for f in os.listdir(r + "assets/sprites/" + d) if f.endswith(".png")) for d in ("props", "items", "npcs")}
idx["bgs"] = sorted(f for f in os.listdir(r + "assets/backgrounds/hi") if f.endswith(".webp"))
music = sorted({os.path.splitext(f)[0] for f in os.listdir(r + "assets/audio/music") if f.endswith((".ogg", ".mp3"))})

# Fußposition: Anteil leerer Zeilen unten (gap), Mitte (cx) und Breite (w) der untersten Pixelzeilen, jeweils relativ zur Bildgröße
feet = {}
for d in ("characters", "npcs"):
    for f in sorted(os.listdir(r + "assets/sprites/" + d)):
        if not f.endswith(".png"):
            continue
        a = np.asarray(Image.open(r + "assets/sprites/" + d + "/" + f).convert("RGBA"))[..., 3] > 60
        h, w = a.shape
        rows = np.nonzero(a.any(axis=1))[0]
        if not len(rows):
            continue
        last, top = int(rows.max()), int(rows.min())
        band = a[max(top, last - max(3, int((last - top) * 0.05))):last + 1]
        xs = np.nonzero(band.any(axis=0))[0]
        feet[d + "/" + f] = [round((h - 1 - last) / h, 4), round(float((xs.min() + xs.max()) / 2 / w), 4), round(max(0.12, float((xs.max() - xs.min()) / w)), 4)]

open(r + "data/assets.js", "w").write("// Automatisch erzeugt (tools/make_index.py)\nwindow.NN = window.NN || {};\nNN.assetIndex = " + json.dumps(idx) + ";\nNN.feet = " + json.dumps(feet, separators=(",", ":")) + ";\nNN.musicFiles = " + json.dumps(music) + ";\n")
print("data/assets.js geschrieben:", {k: len(v) for k, v in idx.items()}, "Füße:", len(feet), "Musik:", music)

import time as _t
open(r + "data/build.js", "w").write("window.NN = window.NN || {};\nNN.buildId = '%d';\n" % int(_t.time()))
