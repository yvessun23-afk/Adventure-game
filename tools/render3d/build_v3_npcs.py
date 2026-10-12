#!/usr/bin/env python3
"""Rendert alle NPCs aus den 3D-Modellen (char_npc_*.js, kleo, teddy, oma) zu Sprites für Version 3 (v3/assets/sprites/npcs).
Zusätzlich werden die 3D-Sprites aus Version 2 (Pixel, Gala, Raumanzug, Krümel, Oma) nach v3/assets/sprites kopiert.
  python3 tools/render3d/build_v3_npcs.py [--models /pfad/zu/char_js] [nur_dieser_npc ...]
Größe und Standlinie werden an das Ruhebild des V1-Sprites angepasst. Zustände: idle, talk, (a, b nur bei animierten Modellen).
Modelle ohne eigene Animation (nur eine Pose) bleiben im Spiel trotzdem lebendig: die Engine lässt sie atmen und wippen.
"""
import asyncio, base64, io, json, shutil, sys
from pathlib import Path
from PIL import Image
from playwright.async_api import async_playwright

sys.path.insert(0, str(Path(__file__).parent))
from build_v2_sprites import serve, trim_box, body_h, ROOT  # noqa: E402

V3 = ROOT / "v3" / "assets" / "sprites"
# V1-Name -> (Modell, Blickrichtung in Grad (0 = zur Kamera, -90 = nach rechts), Renderbreite)
NPCS = {
    "ablage": ("npc_ablage", 0, 1024), "baron": ("npc_baron", 0, 1024), "bello": ("npc_bello", -65, 1400), "bit": ("npc_bit", 0, 1024),
    "brezel": ("npc_brezel", 0, 1024), "flimmer": ("npc_flimmer", 0, 1024), "flughans": ("npc_flughans", 0, 1024), "gruenhorn": ("npc_gruenhorn", 0, 1024),
    "hugo": ("npc_hugo", 0, 1024), "jackpot": ("npc_jackpot", 0, 1024), "kabel": ("npc_kabel", 0, 1024), "katze": ("npc_katze", 0, 1400),
    "klaus": ("npc_klaus", 0, 1024), "kleo": ("kleo", 0, 1024), "kloss": ("npc_kloss", 0, 1024), "kraken": ("npc_kraken", 0, 2000),
    "kurt": ("npc_kurt", 0, 1024), "mortimer": ("npc_mortimer", 0, 1024), "ratten": ("npc_ratten", 0, 1600), "rosi": ("npc_rosi", 0, 1024),
    "schaffner": ("npc_schaffner", 0, 1024), "schicht": ("npc_schicht", 0, 1024), "schnipp": ("npc_schnipp", 0, 1024), "schraub": ("npc_schraub", 0, 1024),
    "sebastian": ("npc_sebastian", 0, 1024), "staub": ("npc_staub", 0, 1024), "stefan": ("npc_stefan", 0, 1024), "streikposten": ("npc_streikposten", 0, 1024),
    "tackert": ("npc_tackert", 0, 1024), "teddy": ("teddy", 0, 1024), "wuschel_repariert": ("npc_wuschel", 0, 1600), "wuschel_defekt": ("npc_wuschel", 0, 1600),
    "zen": ("npc_zen", 0, 1024), "zeus": ("npc_zeus", 0, 1024),
}
# Varianten ohne eigenes Modell: Name -> Quelle
COPIES = {"teddy_sensor": "teddy"}
OPTS = {"wuschel_defekt": {"sat": 0.3, "bright": 0.7}, "ratten": {"zoom": 0.5}, "kraken": {"zoom": 0.85}}  # kaputter Wuschel: grau und dunkel


def states(info):
    clips = info["clips"]
    anim = "idle" in clips and clips["idle"]["dur"] > 2.0
    tl = "talk" in clips
    L = [("idle", "idle", 0.5), ("talk", "talk" if tl else "idle", 1.0 if tl else 0.5)]
    if anim:
        L += [("a", "idle", 2.4), ("b", "idle", 4.6)]
    return L


async def render_all(port, only):
    out = {}
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args=["--no-sandbox", "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"])
        pg = await b.new_page(); await pg.goto(f"http://localhost:{port}/render.html")
        loaded = {}
        for npc, (model, yaw, size) in NPCS.items():
            if only and npc not in only:
                continue
            if model not in loaded:
                await pg.evaluate(f"R.loadScript('models/char_{model}.js')"); await pg.evaluate(f"R.load('{model}')")
                loaded[model] = await pg.evaluate(f"R.info('{model}')")
            for st, clip, t in states(loaded[model]):
                opt = dict(OPTS.get(npc, {}), yaw=yaw, clip=clip, t=t, size=size)
                r = await pg.evaluate(f"R.render('{model}', {json.dumps(opt)})")
                out[(npc, st)] = Image.open(io.BytesIO(base64.b64decode(r["url"].split(",")[1]))).convert("RGBA")
        await b.close()
    return out


def main():
    only = [a for a in sys.argv[1:] if not a.startswith("--") and a in NPCS]
    port = serve()
    res = asyncio.run(render_all(port, only))
    dst = V3 / "npcs"; dst.mkdir(parents=True, exist_ok=True)
    # 3D-Sprites aus Version 2 (Pixel, Krümel, Oma ...) übernehmen
    if not only:
        shutil.copytree(ROOT / "v2" / "assets" / "sprites", V3, dirs_exist_ok=True)
    npcs = sorted({n for n, _ in res})
    for npc in npcs:
        v1 = ROOT / "assets/sprites/npcs" / f"{npc}_idle.png"
        im0 = res[(npc, "idle")]; bb0 = trim_box(im0)
        k = body_h(v1) / (bb0[3] - bb0[1])
        items = {st: im for (n, st), im in res.items() if n == npc}
        boxes = [trim_box(i) for i in items.values()]
        x0 = min(b[0] for b in boxes) - 4; y0 = min(b[1] for b in boxes) - 4; x1 = max(b[2] for b in boxes) + 4; y1 = max(b[3] for b in boxes) + 4
        for st, im in items.items():
            c = im.crop((x0, y0, x1, y1)); c = c.resize((max(1, round(c.width * k)), max(1, round(c.height * k))), Image.LANCZOS)
            c.save(dst / f"{npc}_{st}.png", optimize=True)
        print(npc, "ok", sorted(items), round(k, 3))
    for new, src in COPIES.items():
        for st in ("idle", "talk"):
            if (dst / f"{src}_{st}.png").exists():
                shutil.copy(dst / f"{src}_{st}.png", dst / f"{new}_{st}.png")


if __name__ == "__main__":
    main()
