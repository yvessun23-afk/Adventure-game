#!/usr/bin/env python3
"""Erzeugt die NPC-Batches: je Bild 3 Figuren (3 Zeilen) x 4 Posen (ruhig, sprechend, Animation A, Animation B).
  - sauberes Referenzbild je Batch aus den vorhandenen Spielsprites (assets/raw/refs_npc/ref_npc_XX.png), Pixel als Maßstab links
  - docs/prompts-npc-batches.md   (komplette Nano-Banana-2-Prompts)
  - tools/npc_batches.json         (für tools/slice_npc_grid.py)
  python3 tools/build_npc_batches.py
"""
import json
import sys
from pathlib import Path

from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parent))
import build_prompts as bp  # noqa: E402
import build_npc_master_prompts as mp  # noqa: E402

ROOT = bp.ROOT
SPR = ROOT / "assets" / "sprites"
REF = ROOT / "assets" / "raw" / "refs_npc"
ORDER = mp.ORDER
NAME, D, AB = mp.NAME, mp.D, mp.AB
BATCH = 3
GREY = (208, 208, 208)


def sprite(name, folder="npcs"):
    p = SPR / folder / f"{name}.png"
    return Image.open(p).convert("RGBA") if p.exists() else None


def trim(im):
    bb = im.getchannel("A").point(lambda v: 255 if v > 40 else 0).getbbox()
    return im.crop(bb) if bb else im


def build_ref(idx, keys):
    ROW_H = 340
    PX_H = round(min(0.7, 0.8 / (max(D[k][0] for k in keys) / 100)) * ROW_H)  # Pixel-Höhe = Anteil der Zeilenhöhe
    W = 1500
    out = Image.new("RGB", (W, ROW_H * len(keys)), GREY)
    pix = trim(sprite("pixel_idle_side", "characters"))
    pix = pix.resize((round(pix.width * PX_H / pix.height), PX_H), Image.LANCZOS)
    for r, k in enumerate(keys):
        y_base = r * ROW_H + ROW_H - 25
        out.paste(pix, (30, y_base - pix.height), pix)
        x = 30 + pix.width + 90
        for suffix in ("idle", "talk"):
            im = sprite(f"{k}_{suffix}")
            if im is None:
                continue
            im = trim(im)
            h = round(PX_H * D[k][0] / 100)
            im = im.resize((max(1, round(im.width * h / im.height)), h), Image.LANCZOS)
            out.paste(im, (x, y_base - h), im)
            x += im.width + 90
    REF.mkdir(parents=True, exist_ok=True)
    out.save(REF / f"ref_npc_{idx:02d}.png")


RULES = """RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no paper grain, no lighting variation, no horizon, no floor line.
- Nothing except the 12 figures: no smoke, haze, mist, glow, sparkles, particles, dust, shadows, reflections, ghost or transparent copies, speech bubbles, text, sound effects, labels, numbers, grid lines or frames. Small effects that belong to a pose (a spark, a puff of flour, a steam wisp, a heart) must be drawn as solid, clearly outlined shapes attached to the character and in the same colors as the character, never as soft glows.
- Grid: exactly 4 columns and 3 rows, 12 equal cells. Row = one character, column = one pose. Each figure stands fully inside its own cell, horizontally centered, feet on one common baseline per row, with a wide green margin (at least 15 percent of the cell size) on all sides. Nothing touches or overlaps, nothing crosses a cell border.
- Scale: in the reference image Pixel (teal hair, orange jacket) is shown next to each character at the correct relative size. Draw every character at the same relative height to Pixel as in the reference (the height is also given in percent below), but do NOT draw Pixel. Pixel's height (100 percent) is {FRAC} percent of a cell's height, so the tallest figure of this image is about 80 percent of the cell height.
- Camera and light: full body, three-quarter view, every figure faces LEFT, the same camera distance, soft even warm light from the upper left, no cast shadow, no rim glow.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness on all characters, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on a character.
- Consistency: all four figures in a row are the same character: identical design, colors, proportions and line weight. Only pose and facial expression change. Copy the design of each character EXACTLY from the reference image (Image 2): first and second picture in its row are its idle and talking pose."""


def prompt_for(idx, keys):
    frac = round(min(0.7, 0.8 / (max(D[k][0] for k in keys) / 100)) * 100)
    rows = []
    for r, k in enumerate(keys, start=1):
        pct, _, _, detail, idle, talk = D[k]
        a, b = AB[k]
        rows.append(
            f"ROW {r}: {NAME[k]} (height {pct} percent of Pixel)\n"
            f"Appearance: {detail}\n"
            f"Column 1 IDLE: {idle}.\nColumn 2 TALKING: {talk}.\n"
            f"Column 3 ANIMATION A: {a}.\nColumn 4 ANIMATION B: {b}.\n"
            "Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.")
    return ("ATTACHED REFERENCE IMAGES (attach them in exactly this order):\n"
            "Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail.\n"
            f"Image 2 (ref_npc_{idx:02d}.png): clean design and scale reference on a light grey background. Each row shows Pixel (for scale only, do not draw her) and then one character in its idle pose and, if available, its talking pose. Copy the characters exactly; keep their row order.\n"
            "Follow the references closely. Now create the following image.\n\n"
            "Character pose sheet on a perfectly flat solid pure green (#00FF00) background with exactly 12 full-body figures: 3 characters (one per row) times 4 poses (one per column), in a strict 4 by 3 grid.\n\n"
            + RULES.replace('{FRAC}', str(frac)) + "\n\nTHE THREE CHARACTERS:\n\n" + "\n\n".join(rows) + "\n\n" + bp.STIL)


def main():
    batches = [ORDER[i:i + BATCH] for i in range(0, len(ORDER), BATCH)]
    out = ["""# NPCs: 12 Batch-Bilder mit je 3 Figuren

**Warum so?** Die Hintergrund-Artefakte (Dunst, Geisterfiguren, Töpfe, Schlieren) kamen von (1) fehlerhaften Referenzbildern und (2) 12er- bis 24er-Sheets ohne feste Struktur. Jetzt gilt:

1. **Saubere Referenzen.** Zu jedem Batch gibt es ein Referenzbild, das ich aus den fertigen Spielfiguren zusammengesetzt habe (`assets/raw/refs_npc/ref_npc_XX.png`): Pixel als Maßstab links, daneben die Figur ruhig und sprechend, auf hellgrauem Grund. Keine Sheets mit Fehlern, keine Szenenhintergründe, keine grüne Fläche zum Abkupfern.
2. **Feste Struktur.** Jedes Bild: 4 Spalten (ruhig, sprechend, Animation A, Animation B) mal 3 Zeilen (eine Figur pro Zeile). 3 Figuren pro Bild = **12 Bilder statt 36**.
3. **Ausdrückliche Verbote** für Dunst, Glühen, Schatten, Geisterkopien, Text und Hilfslinien im Prompt.
4. **Der Ausschneider räumt zusätzlich auf** (`tools/slice_npc_grid.py`): Er entfernt kleine Reste und Dunst automatisch, setzt jede Figur an ihre Fußlinie und prüft, ob alle 12 Zellen genau eine Figur enthalten. Findet er ein Problem, nennt er die betroffene Zeile, dann musst du nur diese Figur neu erzeugen.

**Ablauf je Bild**
1. Neuer Chat. Referenzen in der angegebenen Reihenfolge anhängen: Image 1 = `ref_03_stil_nudelgasse.png`, Image 2 = das Batch-Referenzbild aus `assets/raw/refs_npc/`.
2. Prompt kopieren, 16:9, höchste Auflösung, speichern als `assets/raw/npcbatch_XX.png`.
3. Sag mir Bescheid. Ich lasse `python3 tools/slice_npc_grid.py --all` laufen und zeige dir das Prüfbild.

**Hinweis zu „100 %“:** Eine KI kann ich nicht dazu zwingen, nie einen Fehler zu machen. Mit diesem Aufbau sind aber die Hauptursachen weg, und der Ausschneider fängt Dunst und Reste ab. Wenn eine Zeile doch misslingt, genügt es, im selben Chat zu schreiben: „Redo only row N exactly as described, keep everything else unchanged“.

**Batches**

| Nr. | Figuren |
|---|---|
"""]
    meta = {}
    for i, keys in enumerate(batches, start=1):
        build_ref(i, keys)
        out.append(f"| {i:02d} | " + ", ".join(NAME[k] for k in keys) + " |")
        meta[f"{i:02d}"] = keys
    out.append("\n---\n")
    for i, keys in enumerate(batches, start=1):
        out.append(f"## Batch {i:02d}: " + ", ".join(NAME[k] for k in keys) + "\n")
        out.append(f"- **Speichern als:** `assets/raw/npcbatch_{i:02d}.png`")
        out.append("- **Format:** 16:9, highest resolution (2K or 4K)")
        out.append(f"- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_npc/ref_npc_{i:02d}.png`\n")
        out.append("```\n" + prompt_for(i, keys) + "\n```\n")
    (ROOT / "docs" / "prompts-npc-batches.md").write_text("\n".join(out), encoding="utf-8")
    (ROOT / "tools" / "npc_batches.json").write_text(json.dumps(meta, indent=1), encoding="utf-8")
    print(len(batches), "Batches geschrieben")


if __name__ == "__main__":
    main()
