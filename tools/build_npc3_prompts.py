#!/usr/bin/env python3
"""Erzeugt docs/prompts-npc-akt3-einzeln.md: jede Figur von Akt 3 als eigenes Bild (links ruhig, rechts sprechend).
  python3 tools/build_npc3_prompts.py
"""
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
import build_prompts as bp  # noqa: E402

ROOT = bp.ROOT
# (Dateiname, Name, Aussehen, Hinweis auf das Design im Referenz-Sheet, ruhig, sprechend)
CH = [
    ("klaus", "Türsteher Klaus", "bulky bouncer robot with a grey metal head, a burgundy velvet jacket, white shirt, dark tie, dark trousers and an earpiece",
     "top row, first figure from the left", "standing with both arms hanging, stern neutral face", "one hand raised in a stop gesture, mouth open, stern"),
    ("sebastian", "Sebastian.exe", "tall slim perfectionist butler robot with a monocle lens, a black tailcoat, bow tie, grey waistcoat and white gloves",
     "top row, second figure from the left", "standing very upright, one gloved hand at his chest, calm face", "one gloved hand lifted elegantly, mouth open, chin raised"),
    ("baron", "Baron von Chrom", "pompous chrome-plated man in silver armor with a fur-trimmed red cape, a huge curled moustache, a cane in one hand",
     "top row, third figure from the left", "standing proudly with the cane planted, chin up", "free arm spread wide in a grand gesture, mouth open"),
    ("zen", "Masseur Zen-3", "calm multi-armed massage robot with four arms in a white bathrobe with a yin-yang symbol, holding small towels and oil bottles",
     "top row, fourth figure from the left", "standing relaxed, four arms holding towels and bottles, serene closed eyes", "two arms gesturing softly, mouth open, serene"),
    ("flughans", "Flug-Hans", "cheerful ticket clerk robot with a navy pilot cap with wings badge, a navy uniform with gold stripes, holding two tickets in one hand",
     "bottom row, first figure from the left", "standing, smiling, tickets held at his side", "tickets waved in the raised hand, mouth open, cheerful"),
    ("kabel", "Käpt’n Kabel", "tired captain with long cable-like dreadlocks, a scruffy beard, dark circles, a worn navy captain's coat and a white captain's cap, holding an empty white mug",
     "bottom row, second figure from the left (use only the captain himself, ignore the sign, which belongs to another character)", "slouching with the mug held low, exhausted look", "mug lifted, other hand gesturing wearily, mouth open"),
    ("kraken", "Ramen-Kraken", "giant noodle octopus with sad eyes and a tiny chef hat, noodles on his head, sitting in a small flat orange puddle of broth with a pair of chopsticks lying beside him; no pot, no bowl, no kitchen",
     "bottom row, the orange octopus", "sitting with drooping tentacles, big sad eyes", "two tentacles raised, mouth open, still sad"),
    ("kleo", "Kleo", "the 12-year-old hologram girl with pigtails, big headphones and the dark NC hoodie, slightly transparent with a thin glowing cyan and pink edge on the figure",
     "bottom row, the hologram girl (but follow Image 2 for her exact design)", "standing, hands at her sides, curious look", "hands spread, mouth open, expressive"),
    ("schicht", "Schicht", "union leader mining robot with a yellow hard hat with a lamp, a yellow high-visibility vest and a red megaphone",
     "bottom row, the robot with the megaphone", "standing with the megaphone lowered at his side, determined look", "megaphone raised to his mouth, other fist pumped, shouting"),
    ("streikposten", "Streikposten", "generic mining robot, smaller and plainer than Schicht: silver-grey body, an orange hard hat, a plain wooden strike sign reading STREIK held in one hand (the only text allowed)",
     "none, new design: a simple grey robot with an orange hard hat, thinner than the union leader", "standing with the sign resting on his shoulder", "sign raised high, mouth open, protesting"),
    ("teddy", "Teddy-Bot", "the worn, patched plush teddy bear with button eyes and an empty open mouth socket",
     "bottom row, fifth figure (follow Image 2 for the exact design)", "standing, arms down, sad button eyes", "one arm raised, mouth socket open"),
    ("teddy_sensor", "Teddy-Bot mit Sensor", "the same worn, patched plush teddy bear with button eyes, now with a small chrome tongue-sensor plugged into his mouth",
     "bottom row, last figure (follow Image 2 for the exact design)", "standing, arms down, curious button eyes", "one arm raised, the chrome sensor glowing faintly"),
]

HEAD = ("Character sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY TWO full-body figures of the SAME character and nothing else: "
        "the first figure on the left half, the second figure on the right half, with a wide empty green gap (at least half a figure's width) between them. "
        "Both figures have exactly the same design, colors, size and body proportions, three-quarter view facing left (toward the player character), feet on the same line. "
        "Each figure is fully inside the image and does not touch the edges or the other figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, "
        "no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.")

bp.ROLES["sheet_npc_akt3_idle.png"] = "design reference only: it contains several Act-3 characters; use ONLY the figure described below for the look (colors, outfit, proportions). Ignore every other figure and any mistakes in it"
bp.ROLES["ende_01.png"] = "the exact design of KLEO (hologram girl with pigtails, big headphones, dark NC hoodie, slightly transparent with glowing cyan and pink edges) and of TEDDY-BOT (patched plush teddy bear with button eyes and an open mouth socket)"
bp.ROLES["sheet_npc_akt1.png"] = "the style, proportions, line weight and scale of the non-player characters"

out = ["""# NPC Akt 3: jede Figur als eigenes Bild

Die KI schafft die 12er-Sheets nicht sauber (doppelte und fehlende Figuren, verschmolzene Figuren, Hintergrund). Deshalb jetzt **ein Bild pro Figur** mit genau zwei Posen: **links ruhig, rechts sprechend**. Das sind 12 kurze Aufträge, die Fehlerquote ist viel niedriger.

**Ablauf**
1. Neuer Chat pro Figur, Referenzbilder in der genannten Reihenfolge anhängen. `sheet_npc_akt3_idle.png` ist dein letzter Versuch (die gelungenen Figuren darin dienen nur als Design-Vorlage).
2. Speichern als `assets/raw/npc3_<name>.png`.
3. Prüfen: genau zwei Figuren, nichts anderes im Bild. Bei Fehlern im selben Chat korrigieren („Only two figures, remove everything else“).
4. Sag mir Bescheid, ich schneide alle aus (`python3 tools/slice_npc_pairs.py --all`, trennt automatisch links/rechts).

---
"""]
for i, (key, name, desc, where, idle, talk) in enumerate(CH, start=1):
    if key in ("kleo", "teddy", "teddy_sensor"):
        refs = "ref_03_stil_nudelgasse.png, ende_01.png, sheet_npc_akt1.png"
    else:
        refs = "ref_03_stil_nudelgasse.png, sheet_npc_akt3_idle.png, sheet_npc_akt1.png"
    body = (HEAD + f"\n\nCharacter: {name}: {desc}.\nFigure on the left: {idle}.\nFigure on the right: the same character, talking: {talk}.\n"
            + (f"Design source in the attached sheet: {where}.\n" if "sheet_npc_akt3_idle" in refs else "") + "\n" + bp.STIL)
    a = dict(title=name, path=f"assets/raw/npc3_{key}.png", fmt="16:9, highest resolution (2K or 4K)", refs=refs, prompt=body)
    _, files, full = bp.with_refs(a)
    out.append(f"## {i}. {name}\n")
    out.append(f"- **Speichern als:** `{a['path']}`")
    out.append(f"- **Format:** {a['fmt']}")
    out.append("- **Referenzbilder (in dieser Reihenfolge anhängen):** " + ", ".join(f"`{f}`" for f in files) + "\n")
    out.append("```\n" + full + "\n```\n")
(ROOT / "docs" / "prompts-npc-akt3-einzeln.md").write_text("\n".join(out), encoding="utf-8")
print("ok")
