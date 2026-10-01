#!/usr/bin/env python3
"""Schneidet die Pose-Bilder assets/raw/npcpose_<name>.png in Einzelbilder (assets/sprites/npcs).
Die Posen stehen nebeneinander, getrennt werden sie an den breitesten leeren Spalten.
Welche Pose an welcher Stelle steht, steht in tools/npc_poses.json (Reihenfolge von links nach rechts).

  python3 tools/slice_npc_poses.py ablage kloss ...
  python3 tools/slice_npc_poses.py --all
"""
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parent))
import slice_sheet as ss  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "sprites" / "npcs"
POSES = json.loads((ROOT / "tools" / "npc_poses.json").read_text())


def gaps(cols):
    """Leere Spaltenbereiche (start, ende) zwischen belegten Spalten."""
    xs = np.nonzero(cols)[0]
    out, prev = [], xs[0]
    for x in xs[1:]:
        if x - prev > 1:
            out.append((prev + 1, x))
        prev = x
    return out


def process(name):
    src = ROOT / "assets" / "raw" / f"npcpose_{name}.png"
    if not src.exists():
        print("fehlt:", src.name)
        return
    poses = POSES[name]
    img = Image.open(src)
    rgba, fg = ss.cut_out(img, ss.parse_color("#00FF00"), 60, 1)
    cols = fg.any(axis=0)
    g = sorted(gaps(cols), key=lambda t: t[1] - t[0], reverse=True)[:len(poses) - 1]
    if len(g) != len(poses) - 1:
        print(f"{name}: zu wenige Lücken gefunden ({len(g)}), {len(poses)} Posen erwartet")
        return
    cuts = sorted((a + b) // 2 for a, b in g)
    bounds = [0] + cuts + [fg.shape[1]]
    OUT.mkdir(parents=True, exist_ok=True)
    for pose, (x0, x1) in zip(poses, zip(bounds[:-1], bounds[1:])):
        m = np.zeros_like(fg)
        m[:, x0:x1] = fg[:, x0:x1]
        ys, xs = np.nonzero(m)
        bx0, bx1, by0, by1 = max(xs.min() - 4, 0), xs.max() + 5, max(ys.min() - 4, 0), ys.max() + 5
        arr = rgba.copy()
        arr[..., 3] = np.where(m, arr[..., 3], 0)
        suffix = "talk" if pose == "talk" else pose
        Image.fromarray(arr[by0:by1, bx0:bx1], "RGBA").save(OUT / f"{name}_{suffix}.png", optimize=True)
    print(f"{name}: {len(poses)} Posen geschnitten")


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    for n in (args or list(POSES)):
        process(n)
