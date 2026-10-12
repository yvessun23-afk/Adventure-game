#!/usr/bin/env python3
"""Berechnet für jeden NPC, der am Boden steht, den Gesprächsplatz für Pixel (Seite links/rechts, guter Abstand, im begehbaren Bereich,
nicht in Hindernissen oder anderen NPCs) und die Blickrichtung. Schreibt _Final/data/talkspots.js (NN.talkSpots[szene][npc] = [x, y, blick]).
NPCs hinter Theken/Tischen (drawY) behalten ihren Platz davor und blicken nach oben.
Eingabe: /tmp/claude-0/scn.json (Szenendaten, siehe Testskript dump.py)
  python3 tools/make_talkspots.py
"""
import json, re, math
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
scn = json.load(open("/tmp/claude-0/scn.json"))
obs = json.loads(re.search(r"NN.obstacles = (\{.*\});", (ROOT / "_Final/data/obstacles.js").read_text()).group(1))
NPC_IMG = ROOT / "_Final/assets/sprites/npcs"


def in_poly(x, y, poly):
    c = False
    j = len(poly) - 1
    for i in range(len(poly)):
        xi, yi = poly[i]; xj, yj = poly[j]
        if (yi > y) != (yj > y) and x < (xj - xi) * (y - yi) / (yj - yi) + xi:
            c = not c
        j = i
    return c


def margin_ok(x, y, poly, m=14):
    return all(in_poly(x + dx, y + dy, poly) for dx, dy in ((0, 0), (m, 0), (-m, 0), (0, m), (0, -m)))


def ds_of(sc, y):
    d = sc.get("depth") or {"y0": 0, "y1": 1, "s0": 1, "s1": 1}
    t = max(0, min(1, (y - d["y0"]) / max(1, d["y1"] - d["y0"])))
    return d["s0"] + (d["s1"] - d["s0"]) * t


def sprite_wh(a, sc):
    name = a["sprite"] if a["sprite"] != "fn" else None
    if a["id"] == "wuschel": name = "wuschel_repariert"
    if a["id"] == "teddy": name = "teddy"
    f = NPC_IMG / f"{name}_idle.png"
    w, h = Image.open(f).size if f.exists() else (150, a.get("h") or 200)
    k = ds_of(sc, a["y"]) * a["scale"]
    return w * k, h * k


def blockers(sc, skip=None):
    out = []
    for a in sc["actors"]:
        if a["id"] == skip:
            continue
        ds = ds_of(sc, a["y"]) * a["scale"]
        w = (a["h"] * 0.8 if a["h"] else 200) * ds
        out.append((a["x"], a["drawY"] if a["drawY"] is not None else a["y"], max(34, w * 0.34), max(14, 20 * ds)))
    return out


result, report = {}, []
for sid, sc in scn.items():
    for a in sc["actors"]:
        hot = next((h for h in sc["hot"] if h["id"] == a["id"]), None)
        if not hot:
            continue
        walk = sc["walk"]
        orig = hot["walkTo"] or [a["x"], a["y"] + 60]
        if a["drawY"] is not None or a["clip"] or a["y"] < min(p[1] for p in walk) - 10:
            # NPC steht hinter einer Theke o. ä.: Pixel steht davor, aber seitlich versetzt, damit er den NPC nicht verdeckt
            others0 = blockers(sc, a["id"]); obsr0 = obs.get(sid, [])
            def free0(x, y):
                return margin_ok(x, y, walk) and 70 < x < 1306 and not any(r[0] < x < r[2] and r[1] < y < r[3] for r in obsr0) and not any(((x - bx) / rx2) ** 2 + ((y - by) / ry2) ** 2 < 1.15 for bx, by, rx2, ry2 in others0)
            best = None
            for off in (150, 190, 120, 230):
                for side in ((-1, 1) if orig[0] <= a["x"] else (1, -1)):
                    for dy in (0, 20, 40):
                        x = a["x"] + side * off; y = orig[1] + dy
                        if free0(x, y):
                            best = (x, y, side); break
                    if best: break
                if best: break
            if best:
                result.setdefault(sid, {})[a["id"]] = [round(best[0]), round(best[1]), "right" if best[2] < 0 else "left"]; report.append((sid, a["id"], "hinter Objekt, seitlich", [round(best[0]), round(best[1])]))
            else:
                result.setdefault(sid, {})[a["id"]] = [orig[0], orig[1], "up"]; report.append((sid, a["id"], "hinter Objekt", orig))
            continue
        nw, nh = sprite_wh(a, sc)
        ds = ds_of(sc, a["y"]); pw = 100 * ds
        own = next((b for b in blockers(sc) if abs(b[0] - a["x"]) < 1 and abs(b[1] - a["y"]) < 1), None)
        rx = own[2] if own else 60
        D = max(rx + 40, 0.5 * nw * 0.9 + 0.5 * pw + 58)
        others = blockers(sc, a["id"])
        obsr = obs.get(sid, [])

        def free(x, y):
            if not margin_ok(x, y, walk) or not (70 < x < 1306): return False
            if any(r[0] < x < r[2] and r[1] < y < r[3] for r in obsr): return False
            for bx, by, rx2, ry2 in others:
                if ((x - bx) / rx2) ** 2 + ((y - by) / ry2) ** 2 < 1.15: return False
            return True
        cands = []
        for side in (-1, 1):
            for dy in (0, 14, 30, 50, 75, 100, -20):
                for k in (1.0, 1.25, 1.55, 0.85, 0.7, 1.9):
                    x = a["x"] + side * D * k; y = a["y"] + dy
                    if free(x, y):
                        pref = 0 if (orig[0] - a["x"]) * side > 0 else 25   # bisherige Seite bevorzugen
                        cands.append((abs(k - 1) * 60 + abs(dy) * 0.8 + pref, x, y, side)); break
                else:
                    continue
                break
        if cands:
            cands.sort()
            _, x, y, side = cands[0]
            result.setdefault(sid, {})[a["id"]] = [round(x), round(y), "right" if side < 0 else "left"]
            report.append((sid, a["id"], "ok", [round(x), round(y)], "D=%d" % D))
        else:
            result.setdefault(sid, {})[a["id"]] = [orig[0], orig[1], hot["facing"] or "up"]
            report.append((sid, a["id"], "KEIN FREIER PLATZ", orig))
for r in report: print(r)
(ROOT / "_Final/data/talkspots.js").write_text("// Gesprächsplätze für Pixel je NPC: [x, y, Blickrichtung]; erzeugt von tools/make_talkspots.py\nwindow.NN = window.NN || {};\nNN.talkSpots = " + json.dumps(result) + ";\n", encoding="utf-8")
