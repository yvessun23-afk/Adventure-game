#!/usr/bin/env python3
"""Rendert die Mixamo-FBX-Animationen (Gala, Raumanzug) zu Sprites für Version 2 (v2/assets/sprites/characters/pixel_gala_*, pixel_suit_*).
Voraussetzung: three.js (npm i three, Ordner `three/` neben fbxr.html), die entpackten FBX-Ordner (Gala_anim, Raumanzug_anim, ref/...) in FBX_DIR.
  python3 tools/render3d/build_v2_fbx.py [--fbx /pfad/zu/fbx] [--three /pfad/zu/three]
Die Anzug-Animation hat keine UVs: sie werden aus der Referenz-FBX (Raumanzug_ref_fbx.zip) übernommen, die Textur kommt aus deren PNG.
Pixel/Gala-Texturen stecken als PNG in der FBX-Datei und werden von hier extrahiert. Das Visier des Anzugs bekommt eine Glasschicht.
Yaw (three.js): +90 = blickt nach rechts, -90 = links, 0 = zur Kamera, 180 = Rücken.
"""
import asyncio, base64, io, json, re, shutil, sys, threading, http.server, socketserver
from pathlib import Path
import numpy as np
from PIL import Image
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "v2" / "assets" / "sprites" / "characters"
arg = lambda k, d: Path(sys.argv[sys.argv.index(k) + 1]) if k in sys.argv else Path(d)
FBX_DIR = arg("--fbx", "/tmp/claude-0/h3d/fbx")
THREE = arg("--three", "/tmp/claude-0/h3d/three")
WORK = Path("/tmp/claude-0/h3d_fbx")
CHROME = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"
REF = "ref/Meshy_AI_Teal_Star_Explorer_1011193416_texture_fbx/Meshy_AI_Teal_Star_Explorer_1011193416_texture"
WALK_DUR = 1.0333


def extract_png(fbx, dst):
    d = Path(fbx).read_bytes()
    m = d.find(b"\x89PNG\r\n\x1a\n"); e = d.find(b"IEND", m)
    Path(dst).write_bytes(d[m:e + 8])


OUTFITS = {
    "pixel_gala_": dict(dir="Gala_anim", idle="Breathing Idle", walk="Walking", talk="Talking", tex="tex_gala.png", flip=True, extra={}),
    "pixel_suit_": dict(dir="Raumanzug_anim", idle="Breathing Idle", walk="Walking", talk="Talking", tex=REF + ".png", flip=True,
                        extra={"uvFrom": "fbx/" + REF + ".fbx", "glass": {}}),
}


def jobs(prefix, c):
    f = lambda n: f"fbx/{c['dir']}/{n}.fbx"
    base = dict(texUrl="fbx/" + c["tex"] if c["tex"].startswith("ref/") else c["tex"], flip=c["flip"], follow=True, H=2.0, y0=0.0, **c["extra"])
    L = []
    def add(name, clip, yaw, t, sid):
        L.append((prefix + name, f(clip), dict(base, yaw=yaw, t=t), sid))
    add("idle_side", c["idle"], 90, 0.5, "idle_side"); add("idle_front", c["idle"], 0, 0.5, "idle_front"); add("idle_back", c["idle"], 180, 0.5, "idle_back")
    add("talk_a", c["talk"], 60, 0.4, "talk_a"); add("talk_b", c["talk"], 60, 1.2, "talk_b")
    for i in range(12):
        add(f"walk_{i + 1}", c["walk"], 90, WALK_DUR * i / 12, "walk")
    for i in range(8):
        add(f"walkfront_{i + 1}", c["walk"], 0, WALK_DUR * i / 8, "walkfront")
        add(f"walkback_{i + 1}", c["walk"], 180, WALK_DUR * i / 8, "walkback")
    return L


def trim_box(im):
    return im.getchannel("A").point(lambda v: 255 if v > 40 else 0).getbbox()


def body_h(path):
    a = np.asarray(Image.open(path).convert("RGBA"))[..., 3] > 40
    r = np.nonzero(a.any(axis=1))[0]
    return int(r.max() - r.min() + 1)


def serve():
    if WORK.exists():
        shutil.rmtree(WORK)
    WORK.mkdir(parents=True)
    shutil.copy(ROOT / "tools/render3d/fbxr.html", WORK / "fbxr.html")
    for n, link in (("three", THREE), ("fbx", FBX_DIR)):
        (WORK / n).symlink_to(link)
    extract_png(FBX_DIR / "Gala_anim/Breathing Idle.fbx", WORK / "tex_gala.png")
    handler = lambda *a, **k: http.server.SimpleHTTPRequestHandler(*a, directory=str(WORK), **k)
    socketserver.TCPServer.allow_reuse_address = True
    srv = socketserver.TCPServer(("", 0), handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv.server_address[1]


async def render_all(port):
    out = {}
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=CHROME, args=["--no-sandbox", "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"])
        pg = await b.new_page()
        await pg.goto(f"http://localhost:{port}/fbxr.html"); await pg.wait_for_timeout(1500)
        for prefix, c in OUTFITS.items():
            for name, clip, opt, sid in jobs(prefix, c):
                r = await pg.evaluate("([m,o])=>F.render(m,m,o)", [clip, opt])
                out[name] = (prefix, sid, Image.open(io.BytesIO(base64.b64decode(r["url"].split(",")[1]))).convert("RGBA"))
        await b.close()
    return out


def main():
    res = asyncio.run(render_all(serve()))
    OUT.mkdir(parents=True, exist_ok=True)
    factor = {}
    for prefix in OUTFITS:
        ref_v1 = body_h(ROOT / f"assets/sprites/characters/{prefix}idle_front.png")
        bb = trim_box(res[prefix + "idle_front"][2])
        factor[prefix] = ref_v1 / (bb[3] - bb[1])
    sets = {}
    for name, (prefix, sid, im) in res.items():
        sets.setdefault((prefix, sid), []).append((name, im))
    for (prefix, sid), items in sets.items():
        boxes = [trim_box(i[1]) for i in items]
        x0 = min(b[0] for b in boxes) - 4; y0 = min(b[1] for b in boxes) - 4
        x1 = max(b[2] for b in boxes) + 4; y1 = max(b[3] for b in boxes) + 4
        k = factor[prefix]
        for name, im in items:
            c = im.crop((x0, y0, x1, y1))
            c = c.resize((max(1, round(c.width * k)), max(1, round(c.height * k))), Image.LANCZOS)
            c.save(OUT / f"{name}.png", optimize=True)
    print("fertig:", len(res), "Sprites", {k: round(v, 3) for k, v in factor.items()})


if __name__ == "__main__":
    main()
