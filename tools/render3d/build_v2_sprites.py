#!/usr/bin/env python3
"""Rendert die 3D-Modelle (Pixel, Oma, Krümel) zu den Sprites von Version 2 (v2/assets/sprites/...).
Voraussetzung: entpackte Modelle in MODELS (char_*.js) und ein Webserver, der render.html + models/ ausliefert (siehe README).
  python3 tools/render3d/build_v2_sprites.py [--models /pfad/zu/char_js] 
Größen und Standlinie werden an die 2D-Sprites von Version 1 angepasst (gleiche Körperhöhe).
"""
import asyncio, base64, io, json, subprocess, sys, shutil, time, threading, http.server, socketserver, os
from pathlib import Path
import numpy as np
from PIL import Image
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "v2" / "assets" / "sprites"
MODELS = Path(sys.argv[sys.argv.index("--models") + 1]) if "--models" in sys.argv else Path("/tmp/claude-0/m3d")
CHROME = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"


def trim_box(im):
    return im.getchannel("A").point(lambda v: 255 if v > 40 else 0).getbbox()


def body_h(path):
    a = np.asarray(Image.open(path).convert("RGBA"))[..., 3] > 40
    r = np.nonzero(a.any(axis=1))[0]
    return int(r.max() - r.min() + 1)


# Aufträge: (Ausgabeordner, Dateiname, Modell, Optionen-JS, Satz-ID). Einzelbilder haben Satz = Dateiname, Zyklen teilen sich einen Satz (gemeinsames Fenster).
def jobs():
    L = []
    P = "pixel"
    L.append(("characters", "pixel_idle_side", P, {"yaw": -90, "clip": "idle", "t": 0.3}, "pixel_idle_side"))
    L.append(("characters", "pixel_idle_front", P, {"yaw": 0, "clip": "idle", "t": 0.3}, "pixel_idle_front"))
    L.append(("characters", "pixel_idle_back", P, {"yaw": 180, "clip": "idle", "t": 0.3}, "pixel_idle_back"))
    L.append(("characters", "pixel_talk_a", P, {"yaw": -60, "clip": "talk", "t": 0.9}, "pixel_talk_a"))
    L.append(("characters", "pixel_talk_b", P, {"yaw": -60, "clip": "talk", "t": 1.5}, "pixel_talk_b"))
    for i in range(12):
        L.append(("characters", f"pixel_walk_{i + 1}", P, {"yaw": -90, "clip": "walk", "t": i / 12}, "pixel_walk"))
        L.append(("characters", f"pixel_walkl_{i + 1}", P, {"yaw": 90, "clip": "walk", "t": i / 12}, "pixel_walkl"))
    for i in range(8):
        L.append(("characters", f"pixel_walkfront_{i + 1}", P, {"yaw": 0, "clip": "walk", "t": i / 8}, "pixel_walkfront"))
        L.append(("characters", f"pixel_walkback_{i + 1}", P, {"yaw": 180, "clip": "walk", "t": i / 8}, "pixel_walkback"))
    O = "oma"
    L.append(("npcs", "oma_idle", O, {"yaw": -40, "clip": "idle", "t": 0.5}, "oma_idle"))
    L.append(("npcs", "oma_talk", O, {"yaw": -40, "clip": "talk", "t": 1.0}, "oma_talk"))
    L.append(("npcs", "oma_a", O, {"yaw": -40, "clip": "cook", "t": 2.0}, "oma_a"))
    L.append(("npcs", "oma_b", O, {"yaw": -40, "clip": "cook", "t": 3.1}, "oma_b"))
    K = "kruemel"
    for i, y in enumerate((40, 34, 40, 46)):
        L.append(("characters", f"kruemel_hover_{i + 1}", K, {"yaw": y, "clip": "idle", "t": 0}, f"kruemel_hover_{i + 1}"))
    L.append(("characters", "kruemel_talk_a", K, {"yaw": 40, "clip": "idle", "t": 0}, "kruemel_talk_a"))
    L.append(("characters", "kruemel_talk_b", K, {"yaw": 28, "clip": "idle", "t": 0}, "kruemel_talk_b"))
    L.append(("characters", "kruemel_hover_front", K, {"yaw": 0, "clip": "idle", "t": 0}, "kruemel_hover_front"))
    # Pixel kommt jetzt aus build_v2_fbx.py (neue FBX-Animationen); das alte Modell nur mit --old-pixel
    return [j for j in L if j[2] != "pixel" or "--old-pixel" in sys.argv]


async def render_all(port):
    out = {}
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=CHROME, args=["--no-sandbox", "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"])
        pg = await b.new_page()
        await pg.goto(f"http://localhost:{port}/render.html")
        for m in sorted({j[2] for j in jobs()}):
            await pg.evaluate(f"R.loadScript('models/char_{m}.js')"); await pg.evaluate(f"R.load('{m}')")
        for folder, name, model, opt, sid in jobs():
            r = await pg.evaluate(f"R.render('{model}', {json.dumps(opt)})")
            out[name] = (folder, sid, model, Image.open(io.BytesIO(base64.b64decode(r["url"].split(",")[1]))).convert("RGBA"), r["scale"])
        await b.close()
    return out


def serve():
    d = Path("/tmp/claude-0/h3d"); d.mkdir(parents=True, exist_ok=True)
    shutil.copy(ROOT / "tools" / "render3d" / "render.html", d / "render.html")
    link = d / "models"
    if link.is_symlink() or link.exists():
        link.unlink()
    link.symlink_to(MODELS)
    handler = lambda *a, **k: http.server.SimpleHTTPRequestHandler(*a, directory=str(d), **k)
    socketserver.TCPServer.allow_reuse_address = True
    srv = socketserver.TCPServer(("", 0), handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv.server_address[1]


def main():
    port = serve()
    res = asyncio.run(render_all(port))
    # Zielhöhen aus den 2D-Sprites von Version 1 (Körperhöhe im Ruhebild)
    targets = {"pixel": body_h(ROOT / "assets/sprites/characters/pixel_idle_side.png"),
               "oma": body_h(ROOT / "assets/sprites/npcs/oma_idle.png"),
               "kruemel": body_h(ROOT / "assets/sprites/characters/kruemel_hover_1.png")}
    # Faktor je Modell: aus dem Ruhebild (Pixel: von vorn, Oma: Ruhebild, Krümel: hover_1)
    ref = {"pixel": "pixel_idle_front", "oma": "oma_idle", "kruemel": "kruemel_hover_1"}
    ref = {m: n for m, n in ref.items() if n in res}
    factor = {}
    for m, n in ref.items():
        im = res[n][3]; bb = trim_box(im)
        factor[m] = targets[m] / (bb[3] - bb[1])
    sets = {}
    for name, (folder, sid, model, im, scale) in res.items():
        sets.setdefault(sid, []).append((name, folder, model, im))
    for sid, items in sets.items():
        boxes = [trim_box(i[3]) for i in items]
        x0 = min(b[0] for b in boxes) - 4; y0 = min(b[1] for b in boxes) - 4
        x1 = max(b[2] for b in boxes) + 4; y1 = max(b[3] for b in boxes) + 4
        for name, folder, model, im in items:
            # Einzelbilder (Satz = 1 Bild) werden eng beschnitten, Zyklen teilen sich ein Fenster (Bobbing bleibt erhalten)
            c = im.crop((x0, y0, x1, y1))
            k = factor[model]
            c = c.resize((max(1, round(c.width * k)), max(1, round(c.height * k))), Image.LANCZOS)
            dst = OUT / folder; dst.mkdir(parents=True, exist_ok=True)
            c.save(dst / f"{name}.png", optimize=True)
    print("fertig:", len(res), "Sprites, Faktoren", {k: round(v, 3) for k, v in factor.items()})


if __name__ == "__main__":
    main()
