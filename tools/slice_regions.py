#!/usr/bin/env python3
"""Schneidet ein Sheet anhand von Rechtecken aus einer JSON-Datei aus (für Sheets, die kein sauberes Raster haben).

  python3 tools/slice_regions.py tools/regions/props_akt2.json

JSON: {"sheet": "assets/raw/x.png", "out": "assets/sprites/props", "prefix": "", "gap": 8,
       "regions": {"name": [x0, y0, x1, y1]  oder  "name": [[x0,y0,x1,y1], [..]]}}
Pro Region zählen nur Pixel innerhalb der Rechtecke; kleine Splitter (< 3 % der größten Fläche) werden verworfen.
"""
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage as ndi

sys.path.insert(0, str(Path(__file__).resolve().parent))
import slice_sheet as ss  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent


def main():
    cfg = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    img = Image.open(ROOT / cfg["sheet"])
    rgba, fg = ss.cut_out(img, ss.parse_color(cfg.get("color", "#00FF00")), cfg.get("tol", 60), cfg.get("erode", 1))
    if cfg.get("kill_green"):
        a16 = rgba.astype(np.int16)
        g = (a16[..., 1] - np.maximum(a16[..., 0], a16[..., 2])) > cfg["kill_green"]
        rgba = rgba.copy(); rgba[..., 3] = np.where(g, 0, rgba[..., 3]); fg = fg & ~g
    out = ROOT / cfg["out"]; out.mkdir(parents=True, exist_ok=True)
    gap = cfg.get("gap", 8); pad = cfg.get("pad", 4)
    n = 0
    for name, boxes in cfg["regions"].items():
        if isinstance(boxes[0], int):
            boxes = [boxes]
        mask = np.zeros(fg.shape, bool)
        for x0, y0, x1, y1 in boxes:
            mask[y0:y1, x0:x1] = True
        m = fg & mask
        merged = ndi.binary_dilation(m, iterations=cfg.get('gap_names', {}).get(name, gap))
        labels, cnt = ndi.label(merged)
        if not cnt:
            print("LEER:", name); continue
        areas = ndi.sum(m, labels, index=np.arange(1, cnt + 1))
        keep = [i + 1 for i, a in enumerate(areas) if a >= areas.max() * cfg.get('keep_ratio_names', {}).get(name, cfg.get('keep_ratio', 0.03))]
        sel = m & np.isin(labels, keep)
        ys, xs = np.nonzero(sel)
        x0, x1, y0, y1 = max(xs.min() - pad, 0), xs.max() + pad + 1, max(ys.min() - pad, 0), ys.max() + pad + 1
        arr = rgba.copy(); arr[..., 3] = np.where(sel, arr[..., 3], 0)
        kg = cfg.get("kill_green_names", {}).get(name)
        if kg:  # grünstichige Pixel (Glow, Glas) durchsichtig machen
            a16 = arr.astype(np.int16)
            arr[..., 3] = np.where((a16[..., 1] - np.maximum(a16[..., 0], a16[..., 2])) > kg, 0, arr[..., 3])
            sel = sel & (arr[..., 3] > 0)
            ys, xs = np.nonzero(sel)
            x0, x1, y0, y1 = max(xs.min() - pad, 0), xs.max() + pad + 1, max(ys.min() - pad, 0), ys.max() + pad + 1
        Image.fromarray(arr[y0:y1, x0:x1], "RGBA").save(out / f"{cfg.get('prefix', '')}{name}.png", optimize=True)
        n += 1
    print(f"{n} Sprites nach {out.relative_to(ROOT)} geschrieben.")


if __name__ == "__main__":
    main()
