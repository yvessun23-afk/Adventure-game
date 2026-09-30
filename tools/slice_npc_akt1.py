#!/usr/bin/env python3
"""Schneidet assets/raw/sheet_npc_akt1.png aus. Die KI hat das Raster nicht eingehalten (7 Spalten, teils
überlappende Figuren), deshalb werden die gefundenen Flächen hier von Hand zugeordnet.

  python3 tools/slice_npc_akt1.py
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parent))
import slice_sheet as ss  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "raw" / "sheet_npc_akt1.png"
OUT = ROOT / "assets" / "sprites" / "npcs"

# Komponenten-Nummern (1-basiert, Lesereihenfolge ohne Raster) -> Dateiname
MAP = {
    "oma_idle": [2], "rosi_idle": [1, 3], "bit_idle": [4], "hugo_idle": [5], "kurt_idle": [6], "brezel_idle": [7],
    "schaffner_idle": [8], "bello_idle": [9], "wuschel_defekt_idle": [11], "wuschel_repariert_idle": [12],
    "ratten_idle": [13], "katze_idle": [14],
    "oma_talk": [15], "rosi_talk": [16], "hugo_talk": [18], "kurt_talk": [19], "brezel_talk": [20],
    "schaffner_talk": [21], "wuschel_defekt_talk": [22], "wuschel_repariert_talk": [23], "ratten_talk": [24],
    "katze_talk": [25],
}
SPLIT_17 = {"bit_talk": "upper", "bello_talk": "lower"}  # Komponente 17 enthält Bit und Bello übereinander


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

    # Bit/Bello trennen: Zeile mit den wenigsten Figur-Pixeln im überlappenden Bereich
    m17 = labels == ids[17]
    rows = np.nonzero(m17.any(axis=1))[0]
    lo, hi = rows.min() + int((rows.max() - rows.min()) * 0.35), rows.min() + int((rows.max() - rows.min()) * 0.75)
    cut = lo + int(np.argmin(fg[lo:hi][:, :].sum(axis=1) * m17[lo:hi].any(axis=1)))
    yy = np.arange(labels.shape[0])[:, None]
    save("bit_talk", m17 & (yy < cut))
    save("bello_talk", m17 & (yy >= cut))
    print(f"{len(MAP) + 2} NPC-Sprites nach {OUT.relative_to(ROOT)} geschrieben (Trennlinie Bit/Bello bei y={cut}).")


if __name__ == "__main__":
    main()
