#!/usr/bin/env python3
"""Schneidet Einzelbilder mit zwei Figuren (links ruhig, rechts sprechend) aus.

  python3 tools/slice_npc_pairs.py klaus sebastian ...      (liest assets/raw/npc3_<name>.png)
  python3 tools/slice_npc_pairs.py --all

Trennt an der breitesten leeren Spalte in der Bildmitte. Ergebnis: assets/sprites/npcs/<name>_idle.png und <name>_talk.png
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parent))
import slice_sheet as ss  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "sprites" / "npcs"
NAMES = ["klaus", "sebastian", "baron", "zen", "flughans", "kabel", "schicht", "streikposten", "kraken", "kleo", "teddy", "teddy_sensor"]


def process(name):
    src = ROOT / "assets" / "raw" / f"npc3_{name}.png"
    if not src.exists():
        print("fehlt:", src.name)
        return
    img = Image.open(src)
    rgba, fg = ss.cut_out(img, ss.parse_color("#00FF00"), 60, 1)
    cols = fg.any(axis=0)
    xs = np.nonzero(cols)[0]
    lo, hi = int(xs.min()), int(xs.max())
    # breiteste leere Lücke im mittleren Drittel
    best, best_len, run_start = None, 0, None
    for x in range(lo, hi + 1):
        if not cols[x]:
            run_start = x if run_start is None else run_start
        elif run_start is not None:
            if x - run_start > best_len and lo + (hi - lo) * 0.25 < (run_start + x) / 2 < lo + (hi - lo) * 0.75:
                best, best_len = (run_start + x) // 2, x - run_start
            run_start = None
    if best is None:
        print("keine Lücke gefunden bei", name)
        return
    OUT.mkdir(parents=True, exist_ok=True)
    for suffix, sl in (("idle", slice(0, best)), ("talk", slice(best, rgba.shape[1]))):
        m = np.zeros_like(fg)
        m[:, sl] = fg[:, sl]
        ys, xs2 = np.nonzero(m)
        x0, x1, y0, y1 = max(xs2.min() - 4, 0), xs2.max() + 5, max(ys.min() - 4, 0), ys.max() + 5
        arr = rgba.copy()
        arr[..., 3] = np.where(m, arr[..., 3], 0)
        Image.fromarray(arr[y0:y1, x0:x1], "RGBA").save(OUT / f"{name}_{suffix}.png", optimize=True)
    print(f"{name}: geschnitten (Lücke {best_len}px bei x={best})")


if __name__ == "__main__":
    args = sys.argv[1:]
    for n in (NAMES if "--all" in args or not args else args):
        process(n)
