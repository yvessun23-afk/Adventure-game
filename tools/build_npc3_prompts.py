#!/usr/bin/env python3
"""Erzeugt docs/prompts-npc-akt3-neu.md: NPC-Sheet Akt 3 in zwei kleineren Sheets (ruhig / sprechend), 4 Spalten x 3 Reihen.
  python3 tools/build_npc3_prompts.py
"""
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
import build_prompts as bp  # noqa: E402

ROOT = bp.ROOT
FIX = {
    "Streikposten": "generic mining robot holding a plain strike sign that reads STREIK (the only text allowed on the sheet)",
    "Ramen-Kraken": "giant noodle octopus with sad eyes and a tiny chef hat, sitting in a small flat orange puddle of broth with a pair of chopsticks beside him; the puddle is flat on the ground, no pot, no bowl, no kitchen",
}
LST = [(n, FIX.get(n, d)) for n, d in bp.npc3]
HEAD = ("Sprite sheet on a perfectly flat solid pure green (#00FF00) background. Exactly 4 columns and 3 rows, 12 cells in total, reading order left to right, top to bottom. "
        "Each cell holds exactly ONE full-body figure, fully inside its own cell, centered, with a large empty green gap between all cells (at least one third of a figure's width). "
        "Nothing touches or overlaps, no figure is repeated, no figure is cropped. Same scale for all figures (about the same height, the octopus and the teddy slightly lower), "
        "feet roughly on the same line in each row. All figures stand in a three-quarter view facing left (toward the player character), full body. "
        "ABSOLUTELY NO background elements: no scenery, no buildings, no pots, no furniture, no neon signs, no blurred shapes, no floor, no cast shadows, no glow, halo or light bloom outside the outline "
        "(the hologram girl may have a thin glowing cyan and pink edge on the figure itself, but no glow around it). Do not use green colors on any figure. Thick dark outline around every figure. "
        "The sheet must contain exactly the 12 figures listed below, in exactly this order, none missing.")

def cells(talk):
    out = []
    for i, (n, d) in enumerate(LST, start=1):
        out.append(f"{i}. {n}: {d}." + (" Now talking: mouth open, one arm gesturing (the octopus: tentacle raised and mouth open; the teddy: mouth socket open)." if talk else " Standing idle with a neutral calm pose."))
    return "\n".join(out)

def make(title, path, refs, body):
    a = dict(title=title, path=path, fmt=bp.FORMAT_SHEET, refs=refs, prompt=body)
    _, files, full = bp.with_refs(a)
    return a, files, full

bp.ROLES["sheet_npc_akt3_idle.png"] = "the exact designs of the 12 Act-3 characters in the idle sheet (same order, copy every figure's look, colors, size and proportions exactly)"
bp.ROLES["sheet_npc_akt1.png"] = "the style, proportions and scale of the non-player characters"
bp.ROLES["ende_01.png"] = "the exact design of KLEO (hologram girl with pigtails, big headphones, dark NC hoodie, slightly transparent with glowing cyan and pink edges) and of TEDDY-BOT (patched plush teddy bear with button eyes)"

idle = make("NPC-Sheet Akt 3, ruhig (12 Figuren)", "assets/raw/sheet_npc_akt3_idle.png",
            "ref_01_pixel_turnaround.png, ref_03_stil_nudelgasse.png, sheet_npc_akt1.png, ende_01.png",
            HEAD + "\n\nThe 12 characters, standing idle:\n" + cells(False) + "\n\n" + bp.STIL)
talk = make("NPC-Sheet Akt 3, sprechend (12 Figuren)", "assets/raw/sheet_npc_akt3_talk.png",
            "sheet_npc_akt3_idle.png, ref_03_stil_nudelgasse.png, ende_01.png",
            HEAD + "\n\nThe same 12 characters in the same order and with exactly the same designs as in the first attached sheet, now talking:\n" + cells(True) + "\n\n" + bp.STIL)

NOTE = """# NPC-Sheet Akt 3: neu in zwei Teilen

Im letzten Versuch fehlten Figuren (Kabel, Streikposten, Kraken und weitere sprechende Posen), Schicht war doppelt, das Raster hatte 7 statt 6 Spalten und beim Kraken war Hintergrund (Topf, Gesicht, Gebäudekante) mit auf dem Bild. Deshalb jetzt **zwei Sheets mit je 12 Figuren** (4 Spalten, 3 Reihen) und eine ausdrückliche Liste „keine Hintergrundelemente“.

**Ablauf**
1. Zuerst das Sheet **ruhig**, speichern, prüfen: genau 12 Figuren, Reihenfolge wie in der Liste.
2. Dann das Sheet **sprechend**. Das fertige Ruhig-Sheet wird als Image 1 angehängt, damit alle Figuren gleich aussehen.
3. Neuer Chat pro Sheet. Sag mir Bescheid, ich schneide beide aus.

**Zellen (beide Sheets gleich):** 1 Türsteher Klaus, 2 Sebastian.exe, 3 Baron von Chrom, 4 Masseur Zen-3, 5 Flug-Hans, 6 Käpt’n Kabel, 7 Schicht, 8 Streikposten, 9 Ramen-Kraken, 10 Kleo, 11 Teddy-Bot, 12 Teddy-Bot mit Sensor.

---
"""
out = [NOTE]
for n, (a, files, full) in enumerate([idle, talk], start=1):
    out.append(f"## {n}. {a['title']}\n")
    out.append(f"- **Speichern als:** `{a['path']}`")
    out.append(f"- **Format:** {a['fmt']}")
    out.append("- **Referenzbilder (in dieser Reihenfolge anhängen):** " + ", ".join(f"`{f}`" for f in files) + "\n")
    out.append("```\n" + full + "\n```\n")
(ROOT / "docs" / "prompts-npc-akt3-neu.md").write_text("\n".join(out), encoding="utf-8")
names = [("klaus"), ("sebastian"), ("baron"), ("zen"), ("flughans"), ("kabel"), ("schicht"), ("streikposten"), ("kraken"), ("kleo"), ("teddy"), ("teddy_sensor")]
(ROOT / "tools" / "names" / "npc_akt3_idle.txt").write_text("\n".join(n + "_idle" for n in names) + "\n")
(ROOT / "tools" / "names" / "npc_akt3_talk.txt").write_text("\n".join(n + "_talk" for n in names) + "\n")
print("ok")
