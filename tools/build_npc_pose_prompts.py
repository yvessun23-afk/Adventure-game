#!/usr/bin/env python3
"""Erzeugt docs/prompts-npc-posen.md: für jede Figur aus Akt 2 und 3 ein Bild mit mehreren Posen nebeneinander
(Sprechbild nur, wenn es noch fehlt, dazu Animationspose A und B) und tools/npc_poses.json (für das Ausschneiden).

  python3 tools/build_npc_pose_prompts.py
"""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import build_prompts as bp  # noqa: E402
import build_npc_anim_prompts as an  # noqa: E402

ROOT = bp.ROOT
NEEDS_TALK = {"ablage", "flimmer", "gruenhorn", "kloss", "mortimer", "schraub", "staub", "stefan", "tackert", "zeus", "kabel", "kraken", "streikposten"}
TALK = {
    "ablage": "one hand pulling her glasses down, mouth open, scolding, small drawer on her body slightly open",
    "kloss": "ladle raised, mouth open, pleading, sweat drops",
    "gruenhorn": "one tool arm gesturing, mouth open, excited whisper, leaf on his head perked up",
    "staub": "magnifying-glass eye wide, one finger raised, mouth open, lecturing",
    "mortimer": "one hand raised politely holding the red rope, mouth open, aloof",
    "schraub": "both hands raised and trembling, mouth open, nervous talking",
    "stefan": "stamp raised in one hand, other hand pointing, mouth open, bureaucratic",
    "zeus": "screen body showing colorful headline bars, one hand cupped at his mouth, shouting",
    "flimmer": "head lifted with one eye half open, one hand waving lazily, mouth open, hologram edges flickering",
    "tackert": "standing on his hind legs in the wheel, one paw raised, mouth open, squeaking importantly",
    "kabel": "mug lifted, other hand gesturing wearily, mouth open, tired",
    "kraken": "two tentacles raised, mouth open, still sad, sitting in the puddle",
    "streikposten": "strike sign raised high, mouth open, protesting",
}
# Aussehen und Fundstelle im Referenz-Sheet (Akt 2: sheet_npc_akt2.png, Akt 3: sheet_npc_akt3_v1.png)
WHERE = {
    "ablage": "top row, first figure", "kloss": "top row, second figure", "gruenhorn": "top row, third figure", "staub": "top row, fourth figure",
    "schnipp": "top row, fifth figure", "jackpot": "top row, sixth figure", "mortimer": "top row, seventh figure",
    "schraub": "second row, first figure (the nervous doctor)", "stefan": "second row, second figure (the stout official with the stamp)",
    "zeus": "second row, third figure (the newspaper robot)", "flimmer": "second row, fourth figure (the sleepy hologram technician with the hat)",
    "tackert": "second row, last figure (the hamster in the wheel; ignore the rats)",
    "klaus": "top row, first figure", "sebastian": "top row, second figure", "baron": "top row, third figure", "zen": "top row, fourth figure",
    "flughans": "top row, fifth figure (the ticket clerk robot with the pilot cap)", "kabel": "top row, sixth figure (the captain with the mug)",
    "schicht": "top row, last figure (the one with the megaphone)", "streikposten": "second row, second figure (the robot with the strike sign, but the sign must read STREIK)",
    "kraken": "second row, third figure (the octopus)", "kleo": "second row, fourth figure (follow Image 2 for her exact design)",
    "teddy": "second row, sixth figure (follow Image 2 for the exact design)", "teddy_sensor": "second row, last figure (follow Image 2 for the exact design)",
}
DESIGN = {"ablage": None}

chars = []
for lst, sheet in ((an.AKT2, "sheet_npc_akt2.png"), (an.AKT3, "sheet_npc_akt3_v1.png")):
    for key, name, desc, a, b in lst:
        chars.append((key, name, desc, a, b, sheet))

HEAD = ("Character pose sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY {n} full-body figures of the SAME character and nothing else, "
        "side by side in one row from left to right, with a wide empty green gap (at least half a figure's width) between them. "
        "All figures have exactly the same design, colors, size and body proportions as the character in the reference sheet, three-quarter view facing left (toward the player character), feet on the same line. "
        "Each figure is fully inside the image and does not touch the edges or another figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, "
        "no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.")

bp.ROLES["sheet_npc_akt2.png"] = "design reference only: it contains many characters; use ONLY the figure described below for the exact look (colors, outfit, proportions, line style). Ignore every other figure and every mistake in it"
bp.ROLES["sheet_npc_akt3_v1.png"] = "design reference only: it contains many characters; use ONLY the figure described below for the exact look (colors, outfit, proportions, line style). Ignore every other figure and every mistake in it"
bp.ROLES["ende_01.png"] = "the exact design of KLEO (hologram girl with pigtails, big headphones, dark NC hoodie, slightly transparent with glowing cyan and pink edges) and of TEDDY-BOT (patched plush teddy bear with button eyes and an open mouth socket)"

out = ["""# NPC-Posen für Akt 2 und Akt 3 (Sprechbilder und Animationen)

**Warum:** Beim Prüfen deines Uploads war Folgendes los: Für 13 Figuren fehlt das Sprechbild (Frau Ablage, Chef Kloß, Grünhorn, Prof. Staub, Mortimer, Dr. Schraub, Stempel-Stefan, Kiosk-Zeus, Flimmer, Mr. Tackert, Käpt’n Kabel, Ramen-Kraken, Streikposten), weil die zweite Hälfte des Akt-2-Sheets die falschen Figuren (Akt 1) zeigte. Die Animationssheets für Akt 2 und Akt 3 hatten doppelte oder vertauschte Figuren. Die 12er-Sheets klappen bei dieser KI nicht zuverlässig, deshalb jetzt **ein Bild pro Figur** mit mehreren Posen nebeneinander. Das sind 24 kurze Aufträge.

**Posen je Bild (von links nach rechts)**
- Figuren mit fehlendem Sprechbild: **sprechend, Animation A, Animation B** (3 Figuren im Bild).
- Alle anderen: **Animation A, Animation B** (2 Figuren im Bild).

**Ablauf**
1. Neuer Chat pro Figur, Referenzbilder in der genannten Reihenfolge anhängen. Das Sheet dient nur als Design-Vorlage, im Prompt steht, welche Figur gemeint ist.
2. Speichern als `assets/raw/npcpose_<name>.png`.
3. Prüfen: genau die genannte Anzahl Figuren, gleiches Aussehen wie in der Vorlage, nichts anderes im Bild. Bei Fehlern im selben Chat korrigieren („Only N figures, remove everything else“).
4. Sag mir Bescheid, ich schneide alle aus (`python3 tools/slice_npc_poses.py --all`, trennt automatisch an den Lücken).

**Hinweis zu Akt 3:** `sheet_npc_akt3_v1.png` ist die alte Datei `sheet_npc_akt3.png`, die ich beim Aufräumen umbenannt habe, weil du eine neue mit demselben Namen hochgeladen hast. Das ist die Vorlage, mit der die Figuren im Spiel schon laufen.

---
"""]
meta = {}
for i, (key, name, desc, a, b, sheet) in enumerate(chars, start=1):
    poses = (["talk"] if key in NEEDS_TALK else []) + ["a", "b"]
    if key in ("kleo", "teddy", "teddy_sensor"):
        refs = "ref_03_stil_nudelgasse.png, ende_01.png, " + sheet
    else:
        refs = f"ref_03_stil_nudelgasse.png, {sheet}"
    lines = []
    for j, pz in enumerate(poses, start=1):
        text = {"talk": f"talking: {TALK.get(key, 'mouth open, one arm gesturing')}", "a": f"animation pose A: {a}", "b": f"animation pose B: {b}"}[pz]
        lines.append(f"Figure {j} (from the left): {text}.")
    body = (HEAD.format(n=len(poses)) + f"\n\nCharacter: {name}: {desc}.\nDesign source in the attached reference sheet: {WHERE[key]}.\n" + "\n".join(lines) +
            ("\nThe animation poses A and B are two consecutive frames of a small looping idle action: clear but not extreme movement, feet planted." ) + "\n\n" + bp.STIL)
    ref_list = [r.strip() for r in refs.split(",")]
    a_ = dict(title=name, path=f"assets/raw/npcpose_{key}.png", fmt="16:9, highest resolution (2K or 4K)", refs=refs, prompt=body)
    _, files, full = bp.with_refs(a_)
    out.append(f"## {i}. {name}  ({', '.join({'talk': 'sprechend', 'a': 'Pose A', 'b': 'Pose B'}[p] for p in poses)})\n")
    out.append(f"- **Speichern als:** `{a_['path']}`")
    out.append(f"- **Format:** {a_['fmt']}")
    out.append("- **Referenzbilder (in dieser Reihenfolge anhängen):** " + ", ".join(f"`{f}`" for f in files) + "\n")
    out.append("```\n" + full + "\n```\n")
    meta[key] = poses
(ROOT / "docs" / "prompts-npc-posen.md").write_text("\n".join(out), encoding="utf-8")
(ROOT / "tools" / "npc_poses.json").write_text(json.dumps(meta, indent=1), encoding="utf-8")
print(len(chars), "Prompts geschrieben")
