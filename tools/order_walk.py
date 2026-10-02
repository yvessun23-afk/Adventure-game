#!/usr/bin/env python3
"""Findet in einem Lauf-Sheet automatisch eine glatte Frame-Reihenfolge (kleinste Gesamtdifferenz zwischen Nachbarbildern, geschlossene Schleife)
und die Laufrichtung. Gibt die Reihenfolge der Zellen (ab 1) aus.
"""
import itertools, sys
from pathlib import Path
import numpy as np
from PIL import Image
sys.path.insert(0, str(Path(__file__).resolve().parent))
import slice_sheet as ss  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent


def extract(path):
    img = Image.open(path)
    rgba, fg = ss.cut_out(img, ss.parse_color("#00FF00"), 60, 1)
    found, labels = ss.find_objects(fg, 4, 800)
    found = sorted(found, key=lambda t: (round((t[0][1] + t[0][3]) / 2 / 250), t[0][0]))
    frames = []
    for bb, lab in found:
        m = labels == lab
        ys, xs = np.nonzero(m)
        arr = rgba.copy(); arr[..., 3] = np.where(m, arr[..., 3], 0)
        frames.append((arr[ys.min():ys.max() + 1, xs.min():xs.max() + 1].copy(), m[ys.min():ys.max() + 1, xs.min():xs.max() + 1], (xs.min(), ys.min())))
    return frames


def canvas(fr, W=260, H=300):
    arr, m, _ = fr
    h, w = m.shape
    ys, xs = np.nonzero(m)
    top = m[: max(1, int(h * 0.45))]
    cx = np.nonzero(top)[1].mean() if top.any() else w / 2
    out = np.zeros((H, W), np.float32); rgb = np.zeros((H, W, 3), np.float32)
    ox, oy = int(W / 2 - cx), H - 8 - h  # Unterkante gemeinsam, Oberkörper-Mitte gemeinsam
    y0, x0 = max(oy, 0), max(ox, 0)
    sub = m[y0 - oy: y0 - oy + min(h - (y0 - oy), H - y0), x0 - ox: x0 - ox + min(w - (x0 - ox), W - x0)]
    out[y0:y0 + sub.shape[0], x0:x0 + sub.shape[1]] = sub
    sub3 = arr[y0 - oy: y0 - oy + sub.shape[0], x0 - ox: x0 - ox + sub.shape[1], :3]
    rgb[y0:y0 + sub.shape[0], x0:x0 + sub.shape[1]] = sub3
    return out, rgb


def dist_matrix(frames):
    cs = [canvas(f) for f in frames]
    n = len(cs)
    D = np.zeros((n, n))
    for i in range(n):
        for j in range(i + 1, n):
            a, ra = cs[i]; b, rb = cs[j]
            d = np.abs(a - b).sum() + 0.15 * (np.abs(ra - rb).sum(axis=2) * (a * b)).sum() / 255
            D[i, j] = D[j, i] = d
    return D


def best_cycle(D, subset):
    best = None
    idx = list(subset)
    # Nearest-Neighbour + 2-opt von mehreren Startpunkten
    for s in idx:
        tour = [s]; rest = set(idx) - {s}
        while rest:
            nxt = min(rest, key=lambda r: D[tour[-1], r]); tour.append(nxt); rest.remove(nxt)
        improved = True
        while improved:
            improved = False
            for i in range(1, len(tour) - 1):
                for j in range(i + 1, len(tour)):
                    a, b = tour[i - 1], tour[i]; c, d = tour[j], tour[(j + 1) % len(tour)]
                    if D[a, c] + D[b, d] < D[a, b] + D[c, d] - 1e-9:
                        tour[i:j + 1] = reversed(tour[i:j + 1]); improved = True
        L = sum(D[tour[k], tour[(k + 1) % len(tour)]] for k in range(len(tour)))
        if best is None or L < best[0]:
            best = (L, tour)
    return best


def foot_dir(frames, tour):
    """Standfuß (tiefster Fußpunkt) soll relativ zum Körper nach hinten (links) wandern, wenn die Figur nach rechts läuft."""
    xs = []
    for i in tour:
        arr, m, _ = frames[i]
        h, w = m.shape
        low = m[int(h * 0.9):]
        cols = np.nonzero(low.any(axis=0))[0]
        top = m[: int(h * 0.4)]
        cx = np.nonzero(top)[1].mean()
        xs.append(cols.mean() - cx)
    d = np.diff(xs + [xs[0]])
    return (d < 0).sum() - (d > 0).sum()


if __name__ == "__main__":
    path = sys.argv[1]
    fr = extract(path)
    D = dist_matrix(fr)
    L, tour = best_cycle(D, range(len(fr)))
    base = sum(D[k, (k + 1) % len(fr)] for k in range(len(fr)))
    print("Frames", len(fr), "Schleife", round(L), "Leseordnung", round(base))
    print("Reihenfolge (ab 1):", [t + 1 for t in tour])
    print("Rückwärts?", foot_dir(fr, tour) < 0)
    print("Kantenlängen", [int(D[tour[k], tour[(k + 1) % len(tour)]]) for k in range(len(tour))])
