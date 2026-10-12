#!/usr/bin/env python3
"""Setzt in _Final eine neue Build-Nummer (Cache-Busting für Skripte, Stil und Bilder). Nach jeder Änderung an _Final ausführen:  python3 tools/bump_final.py"""
import re, time
from pathlib import Path
F = Path(__file__).resolve().parent.parent / "_Final"
bid = str(int(time.time()))
(F / "data" / "build.js").write_text("window.NN = window.NN || {};\nNN.buildId = '%s';\n" % bid, encoding="utf-8")
s = (F / "index.html").read_text(encoding="utf-8")
s = re.sub(r'(\.(?:js|css))\?v=\d+', r'\1?v=' + bid, s)
(F / "index.html").write_text(s, encoding="utf-8")
print("Build", bid)
