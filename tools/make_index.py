#!/usr/bin/env python3
"""Erzeugt data/assets.js (Dateilisten zum Vorladen). Nach neuen Sprites oder Musikdateien erneut ausführen.
Liegen Musikdateien in assets/audio/music, werden sie automatisch eingetragen."""
import json, os
r = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + "/"
idx = {d: sorted(f for f in os.listdir(r + "assets/sprites/" + d) if f.endswith(".png")) for d in ("props", "items")}
music = sorted({os.path.splitext(f)[0] for f in os.listdir(r + "assets/audio/music") if f.endswith((".ogg", ".mp3"))})
open(r + "data/assets.js", "w").write("// Automatisch erzeugt (tools/make_index.py)\nwindow.NN = window.NN || {};\nNN.assetIndex = " + json.dumps(idx) + ";\nNN.musicFiles = " + json.dumps(music) + ";\n")
print("data/assets.js geschrieben:", {k: len(v) for k, v in idx.items()}, "Musik:", music)
