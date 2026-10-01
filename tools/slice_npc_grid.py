#!/usr/bin/env python3
"""Schneidet die NPC-Batch-Bilder (assets/raw/npcbatch_XX.png, 3 Zeilen x 4 Spalten) aus und räumt dabei auf.

  python3 tools/slice_npc_grid.py 01 02      # bestimmte Batches
  python3 tools/slice_npc_grid.py --all      # alle vorhandenen Batches
  python3 tools/slice_npc_grid.py --all --dry   # nur prüfen, nichts schreiben

Ablauf: Grün freistellen, kleine Reste und Dunst (halbtransparent oder winzig) verwerfen, Figuren in 3 Zeilen sortieren,
je Zeile von links nach rechts: ruhig (_idle), sprechend (_talk), Animation A (_a), Animation B (_b).
Meldet Probleme je Zeile (zu wenige/zu viele Figuren). Schreibt außerdem ein Prüfbild assets/raw/refs_npc/check_XX.png.
Die Figur-Reihenfolge der Zeilen steht in tools/npc_batches.json.
"""
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi

sys.path.insert(0, str(Path(__file__).resolve().parent))
import slice_sheet as ss  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "sprites" / "npcs"
GAP = 4
POSES = ["idle", "talk", "a", "b"]
BATCHES = json.loads((ROOT / "tools" / "npc_batches.json").read_text())
SKIP = {"12": ["kleo", "teddy", "teddy_sensor"]}  # Kleo ist abgeschnitten, Teddy existiert schon
MAPF = ROOT / "tools" / "npc_batch_map.json"
MAP = json.loads(MAPF.read_text()) if MAPF.exists() else {}  # {"05": {"ablage": [0, 3, 2, 4]}} = Spaltenindex (ab 0) für ruhig, sprechend, A, B


def split_rows(items, n_rows):
    """items: [(cx, cy, ...)], teilt nach cy an den größten Lücken in n_rows Zeilen."""
    items = sorted(items, key=lambda t: t["cy"])
    if len(items) < n_rows:
        return [items]
    gaps = sorted(range(1, len(items)), key=lambda i: items[i]["y0"] - items[i - 1]["y1"], reverse=True)[:n_rows - 1]
    cuts = sorted(gaps)
    rows, start = [], 0
    for c in cuts + [len(items)]:
        rows.append(sorted(items[start:c], key=lambda t: t["cx"]))
        start = c
    return rows


def process(idx, dry):
    src = ROOT / "assets" / "raw" / f"npcbatch_{idx}.png"
    if not src.exists():
        print(f"Batch {idx}: Datei fehlt")
        return True
    keys = BATCHES[idx]
    img = Image.open(src)
    rgba, fg = ss.cut_out(img, ss.parse_color("#00FF00"), 60, 1)
    # Dunst und Schlieren: Pixel, die dem Grün noch sehr nahe sind, gelten nicht als Figur
    rgb = np.asarray(img.convert("RGB")).astype(int)
    near_green = (rgb[..., 1] - np.maximum(rgb[..., 0], rgb[..., 2])) > 60
    fg = fg & ~near_green
    fg = ndi.binary_opening(fg, iterations=1)
    lab, n = ndi.label(ndi.binary_dilation(fg, iterations=GAP))
    groups = []
    for i, sl in enumerate(ndi.find_objects(lab), start=1):
        m = (lab == i) & fg
        area = int(m.sum())
        ys, xs = sl
        mean_a = float(rgba[..., 3][m].mean()) if area else 0
        groups.append(dict(id=i, area=area, x0=xs.start, x1=xs.stop, y0=ys.start, y1=ys.stop, cx=(xs.start + xs.stop) / 2, cy=(ys.start + ys.stop) / 2, mean_a=mean_a))
    if not groups:
        print(f"Batch {idx}: keine Figuren gefunden")
        return False
    big = np.median([g["area"] for g in sorted(groups, key=lambda g: g["area"], reverse=True)[:12]])
    figs = [g for g in groups if g["area"] >= 0.08 * big and g["mean_a"] >= 170]
    dropped = len(groups) - len(figs)
    rows = split_rows(figs, len(keys))
    # Zeilen mit zu vielen Teilen: die kleinsten Reste verwerfen (nur wenn klar kleiner als die echten Figuren)
    for r, row in enumerate(rows):
        while len(row) > 4:
            smallest = min(row, key=lambda g: g["area"])
            rest = sorted(g["area"] for g in row if g is not smallest)[0]
            if smallest["area"] > 0.5 * rest:
                break
            row.remove(smallest)
            dropped += 1
    ok = len(rows) == len(keys)
    report = []
    for r, row in enumerate(rows):
        name = keys[r] if r < len(keys) else "?"
        if len(row) != 4 and not (MAP.get(idx, {}).get(name) and len(row) > max(MAP[idx][name])):
            ok = False
            report.append(f"  Zeile {r + 1} ({name}): {len(row)} Figuren statt 4")
    print(f"Batch {idx}: {len(figs)} Figuren, {dropped} Reste verworfen" + ("" if ok else " -> PROBLEME"))
    for line in report:
        print(line)
    if len(rows) != len(keys):
        print(f"  {len(rows)} Zeilen erkannt statt {len(keys)}")
    # Prüfbild
    chk = img.convert("RGB").copy()
    d = ImageDraw.Draw(chk)
    for r, row in enumerate(rows):
        for c, g in enumerate(row):
            d.rectangle((g["x0"], g["y0"], g["x1"], g["y1"]), outline=(255, 0, 0), width=3)
            d.text((g["x0"] + 4, g["y0"] + 4), f"{c}", fill=(255, 255, 0))
            d.text((g["x0"] + 5, g["y0"] + 5), f"{c}", fill=(0, 0, 0))
    chk.save(ROOT / "assets" / "raw" / "refs_npc" / f"check_{idx}.png")
    if not ok:
        return False
    if dry:
        return True
    OUT.mkdir(parents=True, exist_ok=True)
    # Fußlinie je Zeile gemeinsam, Maßstab bleibt wie gezeichnet
    for r, row in enumerate(rows):
        if SKIP.get(idx) and keys[r] in SKIP[idx]:
            continue
        pick = MAP.get(idx, {}).get(keys[r]) or [0, 1, 2, 3]
        # Maßstab: Ruhebild soll so hoch sein wie das bisherige Spielsprite (sonst ändert sich die Figurengröße im Spiel)
        factor = 1.0
        old = OUT / f"{keys[r]}_idle.png"
        gi = row[pick[0]]
        if old.exists():
            oa = np.asarray(Image.open(old).convert("RGBA"))[..., 3] > 40
            oh = np.nonzero(oa.any(axis=1))[0]
            if len(oh):
                factor = (oh.max() - oh.min() + 1) / max(1, gi["y1"] - gi["y0"])
        for pc, c in enumerate(pick):
            g = row[c]
            m = (lab == g["id"]) & fg
            m = ndi.binary_dilation(m, iterations=2) & (lab == g["id"])
            ys, xs = np.nonzero(m)
            x0, x1, y0, y1 = max(xs.min() - 4, 0), xs.max() + 5, max(ys.min() - 4, 0), ys.max() + 5
            arr = rgba.copy()
            arr[..., 3] = np.where(m, arr[..., 3], 0)
            sp = Image.fromarray(arr[y0:y1, x0:x1], "RGBA")
            if abs(factor - 1) > 0.01:
                sp = sp.resize((max(1, round(sp.width * factor)), max(1, round(sp.height * factor))), Image.LANCZOS)
            sp.save(OUT / f"{keys[r]}_{POSES[pc]}.png", optimize=True)
    return True


if __name__ == "__main__":
    args = sys.argv[1:]
    dry = "--dry" in args
    ids = [a for a in args if not a.startswith("--")]
    if "--all" in args or not ids:
        ids = [i for i in sorted(BATCHES) if (ROOT / "assets" / "raw" / f"npcbatch_{i}.png").exists()]
    good = all([process(i, dry) for i in ids])
    print("alles in Ordnung" if good else "Es gibt Probleme (siehe oben)")
