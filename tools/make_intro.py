#!/usr/bin/env python3
"""Wandelt Intro-Bilder, Titel- und Endbilder aus assets/raw nach assets/intro (WebP, max. 1920 px breit).

  python3 tools/make_intro.py
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
names = ["titel"] + [f"intro_{i:02d}" for i in range(1, 8)] + [f"ende_{i:02d}" for i in range(1, 4)]
out_dir = ROOT / "assets" / "intro"
out_dir.mkdir(parents=True, exist_ok=True)
for n in names:
    src = ROOT / "assets" / "raw" / f"{n}.png"
    if not src.exists():
        continue
    img = Image.open(src).convert("RGB")
    w = min(1920, img.width)
    img.resize((w, round(img.height * w / img.width)), Image.LANCZOS).save(out_dir / f"{n}.webp", "WEBP", quality=88)
    print(f"{n}: {img.width}x{img.height} -> assets/intro/{n}.webp")
