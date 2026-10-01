#!/usr/bin/env python3
"""Entfernt kleine Reste (Artefakte) aus allen Sprites in assets/sprites/npcs.
Halbtransparente Flecken (< 10 % der größten Gruppe) und winzige Krümel werden gelöscht.
  python3 tools/clean_sprites.py [--dry]
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage as ndi

ROOT = Path(__file__).resolve().parent.parent


def clean(path, dry):
    im = Image.open(path).convert("RGBA")
    a = np.asarray(im)
    fg = a[..., 3] > 40
    lab, n = ndi.label(ndi.binary_dilation(fg, iterations=2))
    if n < 2:
        return 0
    sizes = ndi.sum(fg, lab, index=np.arange(1, n + 1))
    alpha = a[..., 3]
    mean_a = ndi.mean(np.where(fg, alpha, 0).astype(float), lab, index=np.arange(1, n + 1)) / np.maximum(ndi.mean(fg.astype(float), lab, index=np.arange(1, n + 1)), 1e-9)
    # Reste = halbtransparente Flecken (Dunst) mit < 10 % der größten Gruppe oder winzige Krümel
    keep = [i + 1 for i, s in enumerate(sizes) if not ((mean_a[i] < 160 and s < 0.10 * sizes.max()) or (s < 0.003 * sizes.max() and mean_a[i] < 200))]
    if len(keep) == n:
        return 0
    mask = np.isin(lab, keep)
    mask = ndi.binary_dilation(mask, iterations=2)
    out = a.copy()
    out[..., 3] = np.where(mask, out[..., 3], 0)
    removed = int(n - len(keep))
    if not dry:
        ys, xs = np.nonzero(out[..., 3] > 0)
        Image.fromarray(out, "RGBA").save(path, optimize=True)
    return removed


if __name__ == "__main__":
    dry = "--dry" in sys.argv
    tot = 0
    for p in sorted((ROOT / "assets" / "sprites" / "npcs").glob("*.png")):
        r = clean(p, dry)
        if r:
            print(p.name, "entfernte Reste:", r)
            tot += r
    print("gesamt", tot)
