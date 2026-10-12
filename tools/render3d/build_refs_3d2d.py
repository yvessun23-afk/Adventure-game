#!/usr/bin/env python3
"""Erzeugt die Vorlagenbilder (3D-Posenraster) für die Nano-Banana-Prompts „3D → 2D" (docs/prompts-3d-zu-2d.md).
Je Outfit (Pixel Standard, Gala, Raumanzug) entstehen fünf Raster in assets/raw/refs_3d2d/:
  walk_side (12 Bilder, 4x3) · walk_front (8, 4x2) · walk_back (8, 4x2) · idle (12 = 3 Ansichten x 4 Atembilder, 4x3) · talk (8, 4x2)
Laufbilder kommen aus den fertigen v2-Sprites, Idle und Talk werden neu aus den FBX-Animationen gerendert (gleiche Kamera, dünne Kontur).
  python3 tools/render3d/build_refs_3d2d.py [--fbx /pfad/zu/fbx] [--three /pfad/zu/three]
"""
import asyncio, base64, io, sys
from pathlib import Path
from PIL import Image
from playwright.async_api import async_playwright

sys.path.insert(0, str(Path(__file__).parent))
import build_v2_fbx as B  # noqa: E402

ROOT = B.ROOT
OUT = ROOT / "assets" / "raw" / "refs_3d2d"
SPR = ROOT / "v2" / "assets" / "sprites" / "characters"
BG = (208, 208, 208)
CACHE = Path("/tmp/claude-0/refs3d2d_cache")
NAMES = {"pixel_": "standard", "pixel_gala_": "gala", "pixel_suit_": "raumanzug"}
IDLE_T = [0.0, 0.8, 1.6, 2.4]       # 4 Atembilder
TALK_T = [0.3 + 0.35 * i for i in range(8)]  # 8 Sprechbilder


def extra_jobs(prefix, c):
    f = lambda n: f"fbx/{c['dir']}/{n}.fbx"
    base = dict(texUrl="fbx/" + c["tex"] if c["tex"].startswith("ref/") else c["tex"], flip=c["flip"], follow=True, H=2.0, y0=0.0, **c["extra"])
    L = []
    for i in range(12):
        L.append((f"walk_side_{i}", f("Walking" if c["dir"] != "Raumanzug_anim" else "Walking"), dict(base, yaw=90, t=B.WALK_DUR * i / 12)))
    for i in range(8):
        L.append((f"walk_front_{i}", f("Walking"), dict(base, yaw=0, t=B.WALK_DUR * i / 8)))
        L.append((f"walk_back_{i}", f("Walking"), dict(base, yaw=180, t=B.WALK_DUR * i / 8)))
    for view, yaw in (("front", 0), ("side", 90), ("back", 180)):
        for i, t in enumerate(IDLE_T):
            L.append((f"idle_{view}_{i}", f(c["idle"]), dict(base, yaw=yaw, t=t)))
    for i, t in enumerate(TALK_T):
        L.append((f"talk_{i}", f(c["talk"]), dict(base, yaw=60, t=t)))
    return L


async def render_extra(port):
    out = {}
    CACHE.mkdir(parents=True, exist_ok=True)
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=B.CHROME, args=["--no-sandbox", "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"])
        pg = None; n = 0
        for prefix, c in B.OUTFITS.items():
            for name, clip, opt in extra_jobs(prefix, c):
                cf = CACHE / f"{prefix}{name}.png"
                if cf.exists():
                    out[(prefix, name)] = Image.open(cf).convert("RGBA"); continue
                if pg is None or n % 5 == 0:
                    if pg:
                        await pg.close()
                    pg = await b.new_page(); await pg.goto(f"http://localhost:{port}/fbxr.html"); await pg.wait_for_timeout(1200)
                n += 1
                r = await pg.evaluate("([m,o])=>F.render(m,m,o)", [clip, opt])
                out[(prefix, name)] = Image.open(io.BytesIO(base64.b64decode(r["url"].split(",")[1]))).convert("RGBA")
                out[(prefix, name)].save(cf)
        await b.close()
    return out


def grid(frames, cols, out_path, W=1920, H=1080, fill=0.84):
    """frames: RGBA-Bilder gleicher Kamera (Standlinie unten). Gemeinsames Fenster; Raster auf 16:9-Leinwand, hellgrauer Grund."""
    boxes = [B.trim_box(f) for f in frames]
    x0 = min(b[0] for b in boxes); y0 = min(b[1] for b in boxes); x1 = max(b[2] for b in boxes); y1 = max(b[3] for b in boxes)
    w, h = x1 - x0, y1 - y0; rows = (len(frames) + cols - 1) // cols
    cw, ch = W // cols, H // rows
    sc = min(cw * fill / w, ch * fill / h)
    sheet = Image.new("RGB", (cw * cols, ch * rows), BG)
    for i, f in enumerate(frames):
        c = f.crop((x0, y0, x1, y1)); c = c.resize((max(1, round(w * sc)), max(1, round(h * sc))), Image.LANCZOS)
        sheet.paste(c, ((i % cols) * cw + (cw - c.width) // 2, (i // cols) * ch + (ch - c.height) // 2), c)
    sheet.save(out_path, optimize=True)
    return sheet.size


def main():
    port = B.serve()
    extra = asyncio.run(render_extra(port))
    OUT.mkdir(parents=True, exist_ok=True)
    for prefix, nm in NAMES.items():
        for key, n in (("walk_side", 12), ("walk_front", 8), ("walk_back", 8)):
            print(nm, key, grid([extra[(prefix, f"{key}_{i}")] for i in range(n)], 4, OUT / f"{nm}_{key}.png"))
        idle = [extra[(prefix, f"idle_{v}_{i}")] for v in ("front", "side", "back") for i in range(len(IDLE_T))]
        print(nm, "idle", grid(idle, 4, OUT / f"{nm}_idle.png"))
        talk = [extra[(prefix, f"talk_{i}")] for i in range(len(TALK_T))]
        print(nm, "talk", grid(talk, 4, OUT / f"{nm}_talk.png"))


if __name__ == "__main__":
    main()
