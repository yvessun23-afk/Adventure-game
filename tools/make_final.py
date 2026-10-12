#!/usr/bin/env python3
"""Baut _Final/: das eigenständige Spiel mit
- Pixel (Standard, Gala-Look, Raumanzug) als 3D-Figur für Laufen, Idle und Talk (Sprites aus v2/assets/sprites/characters),
- allen anderen Figuren, Gegenständen, Requisiten und Hintergründen als ORIGINAL aus Version 1.
_Final enthält nur, was das Spiel zur Laufzeit braucht (kein raw, keine Atlas-Dateien, keine Modelle, keine ZIPs, keine alten Lauf-Sprites).
Version 1 (Hauptordner), v2 und v3 bleiben unverändert.
  python3 tools/make_final.py
Voraussetzung: v2/assets/sprites/characters enthält die gerenderten Pixel-Sprites (tools/render3d/build_v2_fbx.py).
"""
import json, os, re, shutil, time
from pathlib import Path
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "_Final"
V2 = ROOT / "v2" / "assets" / "sprites" / "characters"
PREFIXES = ("pixel_", "pixel_gala_", "pixel_suit_")
# Dateien eines Outfits, die durch die 3D-Sprites ersetzt werden
REPL = re.compile(r"^(?:%s)(?:walk_\d+|walkl_\d+|walkfront_\d+|walkback_\d+|walk_front|walk_back|idle_side|idle_front|idle_back|talk_a|talk_b)\.png$" % "|".join(PREFIXES))


def copy_png(src, dst):
    dst.mkdir(parents=True, exist_ok=True)
    for f in sorted(src.iterdir()):
        if f.suffix == ".png":
            shutil.copy(f, dst / f.name)


def brighten(path, gamma=0.74, gain=1.06, sat=1.11):
    """Pixel wirkte neben den Hintergründen zu dunkel: Schatten aufhellen, Farben leicht sättigen (in die Bilder gerechnet, kein Browser-Filter nötig)."""
    a = np.asarray(Image.open(path).convert("RGBA")).astype(np.float32) / 255
    rgb = a[..., :3] ** gamma * gain
    lum = (rgb * [0.3, 0.59, 0.11]).sum(-1, keepdims=True)
    a[..., :3] = np.clip(lum + (rgb - lum) * sat, 0, 1)
    Image.fromarray((a * 255 + 0.5).astype(np.uint8), "RGBA").save(path, optimize=True)


def feet_for(path):
    a = np.asarray(Image.open(path).convert("RGBA"))[..., 3] > 60
    h, w = a.shape
    rows = np.nonzero(a.any(axis=1))[0]
    if not len(rows):
        return None
    last, top = int(rows.max()), int(rows.min())
    band = a[max(top, last - max(3, int((last - top) * 0.05))):last + 1]
    xs = np.nonzero(band.any(axis=0))[0]
    return [round((h - 1 - last) / h, 4), round(float((xs.min() + xs.max()) / 2 / w), 4), round(max(0.12, float((xs.max() - xs.min()) / w)), 4)]


def main():
    import sys
    if OUT.exists() and "--force" not in sys.argv:
        raise SystemExit("_Final existiert und wird jetzt von Hand weiterentwickelt (Positionen, Korrekturen). Zum kompletten Neubau (überschreibt alle Änderungen!): python3 tools/make_final.py --force")
    if OUT.exists():
        shutil.rmtree(OUT)
    # Spielcode und Daten aus dem Hauptordner
    shutil.copytree(ROOT / "src", OUT / "src")
    shutil.copytree(ROOT / "data", OUT / "data")
    shutil.copy(ROOT / "index.html", OUT / "index.html")
    # nur laufzeitnötige Bilder
    A = ROOT / "assets"
    for d in ("items", "npcs", "props", "ui", "characters"):
        copy_png(A / "sprites" / d, OUT / "assets" / "sprites" / d)
    for sub in ("backgrounds/hi", "backgrounds/mid", "backgrounds/low", "intro", "map"):
        dst = OUT / "assets" / sub; dst.mkdir(parents=True, exist_ok=True)
        for f in sorted((A / sub).iterdir()):
            if f.suffix == ".webp":
                shutil.copy(f, dst / f.name)
    # Pixel: alte 2D-Lauf-, Idle- und Sprechbilder entfernen, 3D-Bilder einsetzen
    ch = OUT / "assets" / "sprites" / "characters"
    removed = 0
    for f in list(ch.iterdir()):
        if REPL.match(f.name):
            f.unlink(); removed += 1
    added = 0
    for f in sorted(V2.iterdir()):
        if REPL.match(f.name):
            shutil.copy(f, ch / f.name); brighten(ch / f.name); added += 1
    # Index, Fußpunkte, Laufbild-Anzahl
    idx = {d: sorted(f for f in os.listdir(OUT / "assets/sprites" / d) if f.endswith(".png")) for d in ("props", "items", "npcs")}
    idx["bgs"] = sorted(f for f in os.listdir(OUT / "assets/backgrounds/hi") if f.endswith(".webp"))
    feet = {}
    for d in ("characters", "npcs"):
        for f in sorted(os.listdir(OUT / "assets/sprites" / d)):
            v = feet_for(OUT / "assets/sprites" / d / f)
            if v:
                feet[d + "/" + f] = v
    (OUT / "data" / "assets.js").write_text("// Automatisch erzeugt (tools/make_final.py)\nwindow.NN = window.NN || {};\nNN.assetIndex = " + json.dumps(idx) + ";\nNN.feet = " + json.dumps(feet, separators=(",", ":")) + ";\nNN.musicFiles = [];\n", encoding="utf-8")
    wi = {}
    for pre in PREFIXES:
        n = lambda pat: len(list(ch.glob(pre + pat)))
        wi[pre] = {"side": n("walk_[0-9]*.png"), "front": n("walkfront_*.png"), "back": n("walkback_*.png")}
    (OUT / "data" / "walkinfo.js").write_text("// Anzahl der Laufbilder je Outfit\nwindow.NN = window.NN || {};\nNN.walkInfo = " + json.dumps(wi) + ";\n", encoding="utf-8")
    # Vorladeliste: die alten Ersatzbilder walk_front/walk_back gibt es nicht mehr (sonst 404 im Netzwerk)
    eng = OUT / "src" / "engine.js"; t = eng.read_text(encoding="utf-8")
    old = "'walk_4', 'walk_front', 'walk_back']"
    assert old in t
    eng.write_text(t.replace(old, "'walk_4']", 1), encoding="utf-8")
    # Cache-Busting
    bid = str(int(time.time()))
    (OUT / "data" / "build.js").write_text("window.NN = window.NN || {};\nNN.buildId = '%s';\n" % bid, encoding="utf-8")
    s = (OUT / "index.html").read_text(encoding="utf-8")
    s = re.sub(r'(<script src="[^"?]+\.js)"', r'\1?v=' + bid + '"', s)
    s = s.replace('href="src/style.css"', 'href="src/style.css?v=' + bid + '"')
    s = s.replace("<title>Neon Noodle</title>", "<title>Neon Noodle (Final)</title>")
    (OUT / "index.html").write_text(s, encoding="utf-8")
    # Schriftdateien gibt es nicht (nur lokal installierte Schriften): url()-Verweise entfernen, sonst 404
    css = (OUT / "src" / "style.css").read_text(encoding="utf-8")
    css = re.sub(r', url\("\.\./assets/fonts/[^"]+"\) format\("woff2"\)', "", css)
    (OUT / "src" / "style.css").write_text(css, encoding="utf-8")
    (OUT / "README.md").write_text("# Neon Noodle – _Final\n\nEigenständiges Spiel (öffne `index.html`). Pixel in drei Outfits ist beim Laufen, Stehen und Sprechen eine 3D-Figur (zu 2D gerendert), alle anderen Figuren, Gegenstände und Hintergründe sind die Originale aus Version 1.\n\nNeu bauen: `python3 tools/render3d/build_v2_fbx.py` (Pixel-Sprites) und `python3 tools/make_final.py`.\n", encoding="utf-8")
    size = sum(f.stat().st_size for f in OUT.rglob("*") if f.is_file()) / 1e6
    print(f"_Final gebaut: {removed} alte Pixel-Bilder ersetzt durch {added} 3D-Bilder, walkInfo {wi}, {size:.1f} MB")


if __name__ == "__main__":
    main()
