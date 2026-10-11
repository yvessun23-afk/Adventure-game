#!/usr/bin/env python3
"""Baut v2/ (Neon Noodle 2, Probeversion mit 3D-Figuren) aus dem Spiel im Hauptordner.
- kopiert index.html, src/, data/ nach v2/ (Version 1 bleibt unverändert),
- Bilder, die es in v2/assets/sprites gibt (gerenderte 3D-Figuren), werden von dort geladen, alles andere aus ../assets (Hintergründe, Musik, Schriften, 2D-Sprites),
- erzeugt v2/data/v2files.js (Liste der v2-Bilder), v2/data/assets.js (Fußpunkte) und v2/data/walkinfo.js / npcfit.js für die neuen Bilder.
  python3 tools/make_v2.py
"""
import json, re, shutil
from pathlib import Path
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
V2 = ROOT / "v2"


def sub(path, old, new, count=1):
    s = path.read_text(encoding="utf-8")
    assert old in s, (path.name, old)
    path.write_text(s.replace(old, new, count), encoding="utf-8")


def copy_game():
    for d in ("src", "data"):
        shutil.rmtree(V2 / d, ignore_errors=True)
        shutil.copytree(ROOT / d, V2 / d)
    shutil.copy(ROOT / "index.html", V2 / "index.html")
    # Pfade
    sub(V2 / "src" / "style.css", "../assets/", "../../assets/", count=10)
    s = (V2 / "src" / "style.css").read_text(encoding="utf-8").replace("url(../assets/sprites/ui/menu_panel.png)", "url(../../assets/sprites/ui/menu_panel.png)")
    (V2 / "src" / "style.css").write_text(s, encoding="utf-8")
    sub(V2 / "src" / "util.js", "window.NN = window.NN || {};\n", """window.NN = window.NN || {};

// Version 2: Bilder aus v2/assets (3D-Figuren) bevorzugen, alles andere aus dem Hauptordner (../assets)
NN.resolve = function (src) {
  if (!src || /^(\\.\\.\\/|https?:|data:|blob:)/.test(src)) return src;
  const clean = src.split('?')[0];
  return (NN.v2Files && NN.v2Files[clean]) ? src : '../' + src;
};
""")
    sub(V2 / "src" / "util.js", "      e.img.src = NN.buildId ? src + (src.includes('?') ? '&' : '?') + 'v=' + NN.buildId : src;", "      const rs = NN.resolve(src);\n      e.img.src = NN.buildId ? rs + (rs.includes('?') ? '&' : '?') + 'v=' + NN.buildId : rs;")
    sub(V2 / "src" / "util.js", "if (img) return { img, src };", "if (img) return { img, src: NN.resolve(src) };")
    sub(V2 / "src" / "audio.js", "a.src = 'assets/audio/music/' + name + '.mp3'", "a.src = '../assets/audio/music/' + name + '.mp3'")
    sub(V2 / "src" / "audio.js", "a.src = 'assets/audio/music/' + name + '.ogg'", "a.src = '../assets/audio/music/' + name + '.ogg'")
    sub(V2 / "src" / "ui.js", "url(assets/backgrounds/low/bg_01_zhangs_imbiss.webp)", "url(../assets/backgrounds/low/bg_01_zhangs_imbiss.webp)")
    sub(V2 / "src" / "ui.js", "const imgSrc = k => 'assets/sprites/ui/menu_' + k + '.png';", "const imgSrc = k => NN.resolve('assets/sprites/ui/menu_' + k + '.png');")
    s = (V2 / "index.html").read_text(encoding="utf-8")
    s = s.replace("<title>Neon Noodle</title>", "<title>Neon Noodle 2 (Probeversion)</title>")
    s = s.replace('<script src="data/assets.js"></script>', '<script src="data/v2files.js"></script>\n<script src="data/assets.js"></script>')
    (V2 / "index.html").write_text(s, encoding="utf-8")
    # util.js wird vor v2files.js geladen: NN.resolve liest NN.v2Files erst beim Aufruf, das ist ok.


def v2_files():
    files = sorted(str(p.relative_to(V2)).replace("\\", "/") for p in (V2 / "assets" / "sprites").rglob("*.png"))
    (V2 / "data" / "v2files.js").write_text("// erzeugt von tools/make_v2.py: Bilder, die Version 2 selbst mitbringt\nwindow.NN = window.NN || {};\nNN.v2Files = " + json.dumps({f: 1 for f in files}) + ";\n", encoding="utf-8")
    return files


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


def patch_assets(files):
    p = V2 / "data" / "assets.js"
    s = p.read_text(encoding="utf-8")
    m = re.search(r"NN\.feet = (\{.*?\});\n", s, re.S)
    feet = json.loads(m.group(1))
    for f in files:
        key = f.replace("assets/sprites/", "")
        v = feet_for(V2 / f)
        if v:
            feet[key] = v
    s = s[:m.start(1)] + json.dumps(feet, separators=(",", ":")) + s[m.end(1):]
    # Index der Namen für Vorladen (npcs / props / items) ergänzen
    m2 = re.search(r"NN\.assetIndex = (\{.*?\});\n", s, re.S)
    idx = json.loads(m2.group(1))
    for f in files:
        parts = f.split("/")
        if parts[2] == "npcs" and parts[3] not in idx["npcs"]:
            idx["npcs"].append(parts[3])
    s = s[:m2.start(1)] + json.dumps(idx) + s[m2.end(1):]
    p.write_text(s, encoding="utf-8")


def walkinfo():
    side = len(list((V2 / "assets/sprites/characters").glob("pixel_walk_[0-9]*.png")))
    left = len(list((V2 / "assets/sprites/characters").glob("pixel_walkl_*.png")))
    front = len(list((V2 / "assets/sprites/characters").glob("pixel_walkfront_*.png")))
    back = len(list((V2 / "assets/sprites/characters").glob("pixel_walkback_*.png")))
    p = V2 / "data" / "walkinfo.js"
    s = p.read_text(encoding="utf-8")
    cur = json.loads(re.search(r"NN.walkInfo = (\{.*\});", s).group(1))
    cur["pixel_"] = {"side": side, "left": left, "front": front, "back": back}
    cdir = V2 / "assets/sprites/characters"
    for pre in ("pixel_gala_", "pixel_suit_"):  # 3D-Outfits (ohne eigene Links-Bilder: die Engine spiegelt)
        n = len(list(cdir.glob(pre + "walk_[0-9]*.png")))
        if n:
            cur[pre] = {"side": n, "front": len(list(cdir.glob(pre + "walkfront_*.png"))), "back": len(list(cdir.glob(pre + "walkback_*.png")))}
    p.write_text("// v2: Anzahl der Laufbilder je Outfit\nwindow.NN = window.NN || {};\nNN.walkInfo = " + json.dumps(cur) + ";\n", encoding="utf-8")


def npcfit():
    p = V2 / "data" / "npcfit.js"
    s = p.read_text(encoding="utf-8")
    cur = json.loads(re.search(r"NN.npcFit = (\{.*\});", s).group(1))
    def h(path):
        a = np.asarray(Image.open(path).convert("RGBA"))[..., 3] > 40
        r = np.nonzero(a.any(axis=1))[0]
        return int(r.max() - r.min() + 1)
    base = V2 / "assets/sprites/npcs"
    for npc in ("oma",):
        idle = h(base / f"{npc}_idle.png")
        for suf, key in (("talk", npc), ("a", npc + "_a"), ("b", npc + "_b")):
            f = base / f"{npc}_{suf}.png"
            if f.exists():
                cur[key] = round(idle / h(f), 4)
    p.write_text("// v2: Größenabgleich Ruhe/Sprechen\nwindow.NN = window.NN || {};\nNN.npcFit = " + json.dumps(cur) + ";\n", encoding="utf-8")


if __name__ == "__main__":
    copy_game()
    files = v2_files()
    patch_assets(files)
    walkinfo()
    npcfit()
    print("v2 gebaut:", len(files), "eigene Bilder")
