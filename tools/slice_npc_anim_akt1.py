#!/usr/bin/env python3
"""Schneidet assets/raw/sheet_npc_anim_akt1.png in <name>_a.png / <name>_b.png (assets/sprites/npcs).
Komponenten-Nummern (Lesereihenfolge ohne Raster) sind von Hand zugeordnet.

  python3 tools/slice_npc_anim_akt1.py
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parent))
import slice_sheet as ss  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "raw" / "sheet_npc_anim_akt1.png"
OUT = ROOT / "assets" / "sprites" / "npcs"

MAP = {
    "oma_a": [1], "rosi_a": [2], "bit_a": [3], "hugo_a": [4], "kurt_a": [5], "brezel_a": [6], "schaffner_a": [7],
    "bello_a": [8], "wuschel_defekt_a": [10], "wuschel_repariert_a": [11], "ratten_a": [12], "katze_a": [13],
    "oma_b": [15], "rosi_b": [16], "hugo_b": [18], "kurt_b": [19], "brezel_b": [20, 14], "schaffner_b": [21],
    "wuschel_defekt_b": [22], "wuschel_repariert_b": [23], "ratten_b": [24], "katze_b": [25],
}
# Komponente 17 enthält Bit (oben) und Bello (unten)


def main():
    img = Image.open(SRC)
    rgba, fg = ss.cut_out(img, ss.parse_color("#00FF00"), 60, 1)
    found, labels = ss.find_objects(fg, 6, 400)
    found = ss.sort_reading_order(found, img.size, 0, 0)
    ids = {i + 1: lab for i, (_, lab) in enumerate(found)}
    if len(ids) != 25:
        print(f"WARNUNG: {len(ids)} Komponenten statt 25. Zuordnung prüfen!")
    OUT.mkdir(parents=True, exist_ok=True)

    def save(name, mask):
        ys, xs = np.nonzero(mask)
        x0, x1, y0, y1 = max(xs.min() - 4, 0), xs.max() + 5, max(ys.min() - 4, 0), ys.max() + 5
        arr = rgba.copy()
        arr[..., 3] = np.where(mask, arr[..., 3], 0)
        Image.fromarray(arr[y0:y1, x0:x1], "RGBA").save(OUT / f"{name}.png", optimize=True)

    for name, comps in MAP.items():
        save(name, np.isin(labels, [ids[c] for c in comps]))
    m17 = labels == ids[17]
    rows = np.nonzero(m17.any(axis=1))[0]
    lo, hi = rows.min() + int((rows.max() - rows.min()) * 0.40), rows.min() + int((rows.max() - rows.min()) * 0.70)
    cut = lo + int(np.argmin(fg[lo:hi].sum(axis=1) * m17[lo:hi].any(axis=1)))
    yy = np.arange(labels.shape[0])[:, None]
    save("bit_b", m17 & (yy < cut))
    save("bello_b", m17 & (yy >= cut))
    print(f"{len(MAP) + 2} Animationsbilder geschrieben (Trennlinie Bit/Bello bei y={cut}).")


if __name__ == "__main__":
    main()
