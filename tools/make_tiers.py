#!/usr/bin/env python3
"""Wandelt Hintergründe aus assets/raw/bg_*.png in drei Qualitätsstufen (WebP) um.

  python3 tools/make_tiers.py            # alle
  python3 tools/make_tiers.py bg_02      # nur Dateien, die mit bg_02 beginnen

Ergebnis: assets/backgrounds/{hi,mid,low}/<name>.webp  (Breite 1920 / 1280 / 960)
"""
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
TIERS = {"hi": (1920, 88), "mid": (1280, 82), "low": (960, 75)}


def main():
    prefix = sys.argv[1] if len(sys.argv) > 1 else "bg_"
    files = sorted((ROOT / "assets" / "raw").glob(f"{prefix}*.png"))
    if not files:
        print("Keine passenden Dateien in assets/raw gefunden.")
        return
    for src in files:
        img = Image.open(src).convert("RGB")
        for tier, (width, quality) in TIERS.items():
            width = min(width, img.width)  # nie hochskalieren
            height = round(img.height * width / img.width)
            out_dir = ROOT / "assets" / "backgrounds" / tier
            out_dir.mkdir(parents=True, exist_ok=True)
            img.resize((width, height), Image.LANCZOS).save(out_dir / f"{src.stem}.webp", "WEBP", quality=quality)
        print(f"{src.name}: {img.width}x{img.height} -> hi/mid/low")


if __name__ == "__main__":
    main()
