#!/usr/bin/env python3
"""Erzeugt docs/prompts-npc-neu.md: einheitliche, ausführliche Prompts für ALLE 36 NPCs (je ein Bild mit 4 Posen:
ruhig, sprechend, Animation A, Animation B) und tools/npc_poses.json (für tools/slice_npc_poses.py).

  python3 tools/build_npc_master_prompts.py
"""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import build_prompts as bp  # noqa: E402
import build_npc_anim_prompts as an  # noqa: E402

ROOT = bp.ROOT

# key: (Höhe in % von Pixel, Designvorlage (Sheet, Position), Aussehen im Detail, ruhig, sprechend)
D = {
 "oma": (90, "sheet_npc_akt1.png", "top row, first figure",
   "A tiny 87-year-old grandmother. Silver-grey hair in a bun held by two wooden chopsticks, huge round black-rimmed glasses that make her eyes look enormous, a kind wrinkled face with rosy cheeks. Lilac-purple blouse with a cream-white kitchen apron, pink house shoes.",
   "standing with both hands folded in front of her apron, gentle smile", "mouth open, one hand raised and wagging a finger, eyebrows lifted, scolding but loving"),
 "rosi": (154, "sheet_npc_akt1.png", "top row, second figure",
   "An enormous rusty robot woman, wide hips and shoulders, rust-brown and copper body with green patina streaks. A dark welder mask with a visor is pushed up on her head. She wears chunky jewelry made of bolts and a turquoise pendant. One arm ends in a crane arm with a hook. Heavy boots.",
   "standing with legs apart, arms hanging, welder mask pushed up, content look", "one big arm gesturing wide, mouth open, loud and friendly"),
 "bit": (100, "sheet_npc_akt1.png", "top row, third figure",
   "A bar robot. Silver-grey bucket-shaped head with a bucket handle on top, two round yellow glowing eyes, a small display on his chest with a green loading bar. Thin segmented arms and legs, one hand holds a silver cocktail shaker.",
   "standing upright, shaker held at his chest, polite blank smile", "mouth open, free hand gesturing, shaker raised slightly, chatty"),
 "hugo": (99, "sheet_npc_akt1.png", "top row, fourth figure",
   "A sly green frog-like creature in a long tan-brown trench coat with countless pockets, a wide-brimmed brown hat, a purple shirt collar, a toothy grin and half-closed scheming eyes. He has four arms; the extra pair is hidden under the coat.",
   "standing with a finger against his chin, glancing sideways, sly grin", "one hand open as if offering a deal, mouth open, eyebrow raised"),
 "kurt": (93, "sheet_npc_akt1.png", "top row, fifth figure",
   "A pigeon crime boss with blue-grey feathers, a puffed-out chest, a thick gold chain with a G pendant, a monocle on one eye and a tiny cigar holder with a cigar in his beak. Orange legs and feet.",
   "standing with chest puffed, one wing on his chain, smug", "beak open, one wing raised in a mob-boss gesture, monocle glinting"),
 "brezel": (101, "sheet_npc_akt1.png", "top row, sixth figure",
   "A bakery robot whose body is a golden-brown pretzel dusted with flour, a tall white chef hat on top, a cheerful face in the pretzel's loop, copper arms and legs.",
   "standing with arms at his sides, a puff of flour, friendly smile", "mouth open, one hand waving a small flour cloud, cheerful"),
 "schaffner": (95, "sheet_npc_akt1.png", "top row, seventh figure",
   "A boxy train-conductor robot with a rectangular grey-blue head, a navy conductor's cap with a gold badge, a navy uniform jacket with a tie, a whistle on a cord and a giant rubber stamp in one hand. Stern look.",
   "standing stiffly, stamp held at his side, stern", "mouth open, free hand pointing, stamp raised, officious"),
 "bello": (62, "sheet_npc_akt1.png", "second row, first figure",
   "A robot dog with a silver-grey metal body, big round yellow ball-shaped eyes, a red collar, a wagging antenna as a tail and a chew-toy bone in his mouth. Four legs, sitting or standing like a dog.",
   "sitting, tail antenna upright, head tilted, bone in mouth", "standing, barking with open mouth, tail wagging, excited"),
 "wuschel_defekt": (58, "sheet_npc_akt1.png", "second row, third figure",
   "A small round vacuum-cleaner robot: grey dented shell, one wheel missing so it tilts, a few sparks, big sad droopy eyes, a short hose.",
   "tilted on its broken wheel, drooping eyes, a little smoke", "eyes wide, a small spark, tiny squeaking mouth, shaking"),
 "wuschel_repariert": (58, "sheet_npc_akt1.png", "second row, fourth figure",
   "The same small round vacuum-cleaner robot after repair: shiny light-blue shell, two wheels, a happy face with round eyes, a small sparkle.",
   "upright on two wheels, happy eyes, tiny sparkle", "bouncing slightly, open happy mouth, a heart symbol above"),
 "ratten": (62, "sheet_npc_akt1.png", "second row, fifth figure",
   "A trio of grey rats with tiny yellow hard hats, each holding a small protest sign with a megaphone symbol (no text). Pointed snouts, long thin tails, determined faces.",
   "standing in a row, signs held low, bored", "all three with open mouths, signs held up, shouting"),
 "katze": (63, "sheet_npc_akt1.png", "second row, last figure",
   "A smug grey cat sitting upright, a faint cyan-green glow along the edges of the body, slightly see-through, tail curled around the paws.",
   "sitting, tail curled, eyes half closed, smug", "mouth open in a meow, head raised, paw lifted"),
 "ablage": (70, "sheet_npc_akt2.png", "top row, first figure",
   "A stern receptionist robot whose body is a khaki-beige metal filing cabinet with three drawers, tufts of paper on top, round glasses on a chain, small grey arms, a sour pressed mouth.",
   "standing, arms folded over a drawer, sour look", "one hand pulling her glasses down, mouth open, scolding"),
 "kloss": (95, "sheet_npc_akt2.png", "top row, second figure",
   "A desperate chubby cook robot: a cream dumpling-shaped head with folds, a white chef coat and apron, a red neckerchief, striped trousers, grey metal hands, a ladle in one hand, worried eyebrows and sweat drops.",
   "standing, ladle held low, worried look", "ladle raised, mouth open, pleading with both brows up"),
 "gruenhorn": (103, "sheet_npc_akt2.png", "top row, third figure",
   "A gardener robot assembled from garden tools: olive-green and copper body, shovel-blade arms, a watering can in one hand, a small green leaf growing from his head, glowing yellow-green eyes.",
   "standing, watering can held low, leaf perked up, calm", "one tool arm gesturing, mouth open, whispering excitedly"),
 "staub": (99, "sheet_npc_akt2.png", "top row, fourth figure",
   "A curator robot in an old dusty brown tailcoat and waistcoat, grey hair swept back, one large magnifying-glass eye, thin grey metal hands, a dignified bored face.",
   "standing, hands behind his back, magnifying eye focused", "one finger raised, magnifying eye wide, mouth open, lecturing"),
 "schnipp": (99, "sheet_npc_akt2.png", "top row, fifth figure",
   "A barber robot with a silver-white body, a striped white-grey barber coat with a red-white-blue pole pattern, wild electrified light-blue hair with sparks, one glowing red eye, scissors instead of hands.",
   "standing, scissors held up, sparks in the hair", "mouth open, scissors snipping, manic grin"),
 "jackpot": (103, "sheet_npc_akt2.png", "top row, sixth figure",
   "An elegant woman with a roulette wheel as a hat, black hair, a gold gown with a magenta-pink underskirt and cyan trim, a hand fan, a cold polished smile.",
   "standing with one hand on her hip, fan closed, cold smile", "fan open in one hand, mouth open, one eyebrow raised, haughty"),
 "mortimer": (101, "sheet_npc_akt2.png", "top row, seventh figure",
   "A tall slim casino doorman robot in a dark purple velvet suit with a tie, a metallic grey face with glowing yellow eyes, a red velvet rope with a brass post in one hand.",
   "standing very straight, rope at his side, stony face", "one hand raised politely, mouth open, aloof"),
 "schraub": (103, "sheet_npc_akt2.png", "second row, first figure",
   "A nervous thin elderly doctor with big round glasses, thin grey hair, a white lab coat, trembling hands, wide worried eyes.",
   "standing, hands trembling in front of him, nervous", "both hands raised, mouth open, stammering"),
 "stefan": (67, "sheet_npc_akt2.png", "second row, second figure",
   "A stout official in a navy uniform and cap, a red round nose, a moustache, ink-stained fingers and an oversized rubber stamp in one hand.",
   "standing, stamp held at his belly, grumpy", "stamp raised, other hand pointing, mouth open, bureaucratic"),
 "zeus": (62, "sheet_npc_akt2.png", "second row, third figure",
   "A newspaper-vendor robot with a boxy screen body that scrolls colorful headline bars, a brown fedora full of rolled newspapers, thin arms, a cheerful look.",
   "standing, one hand holding a newspaper, screen scrolling", "one hand cupped at his mouth shouting, mouth open"),
 "flimmer": (56, "sheet_npc_akt2.png", "second row, fourth figure",
   "A sleepy hologram technician: cyan semi-transparent body with flickering edges, big headphones around the neck, closed eyes, a small cap.",
   "standing, eyes closed, a small Z floating, edges flickering", "head lifted, one eye half open, mouth open, one hand waving lazily"),
 "tackert": (45, "sheet_npc_akt2.png", "second row, last figure (the hamster in the wheel; ignore the rats)",
   "A tiny orange hamster with a tiny tie, standing next to or in a small running wheel, big round eyes.",
   "standing upright next to the wheel, tie straight", "on his hind legs, one paw raised, mouth open, squeaking importantly"),
 "klaus": (107, "sheet_npc_akt3_v1.png", "top row, first figure",
   "A bulky bouncer robot with a grey metal head and an earpiece, a burgundy velvet jacket over a white shirt and a dark tie, dark trousers, big hands.",
   "standing with arms hanging, stern neutral face", "one hand raised in a stop gesture, mouth open, stern"),
 "sebastian": (101, "sheet_npc_akt3_v1.png", "top row, second figure",
   "A tall slim perfectionist butler robot with a monocle lens, a black tailcoat, white shirt, bow tie, grey waistcoat and white gloves, a white napkin over one arm.",
   "standing very upright, napkin on his arm, calm", "one gloved hand lifted elegantly, mouth open, chin raised"),
 "baron": (107, "sheet_npc_akt3_v1.png", "top row, third figure",
   "A pompous chrome-plated man with silver skin, a huge curled moustache, swept-back hair, a fur-collared coat over a waistcoat with a magenta cravat, a cane.",
   "standing proudly, cane planted, chin up", "free arm spread wide, mouth open, grand gesture"),
 "zen": (101, "sheet_npc_akt3_v1.png", "top row, fourth figure",
   "A calm multi-armed massage robot with a silver-blue head and a third eye mark, a white bathrobe with a belt, four arms, bare robot feet in sandals.",
   "standing, four arms relaxed, serene closed eyes", "two arms gesturing softly, mouth open, serene"),
 "flughans": (73, "sheet_npc_akt3_v1.png", "top row, fifth figure",
   "A cheerful ticket-clerk robot with a blue-grey boxy head, a navy pilot cap with a wings badge, a navy uniform with gold stripes and a tie, holding two tickets.",
   "standing, smiling, tickets at his side", "tickets waved in the raised hand, mouth open, cheerful"),
 "kabel": (101, "sheet_npc_akt3_v1.png", "top row, sixth figure",
   "A tired captain with long cable-like dreadlocks, a scruffy beard, dark circles under the eyes, a white captain's cap with an anchor, a worn navy coat and an empty white mug.",
   "slouching, mug held low, exhausted look", "mug lifted, other hand gesturing wearily, mouth open"),
 "schicht": (111, "sheet_npc_akt3_v1.png", "top row, seventh figure",
   "A union-leader mining robot with a yellow hard hat with a lamp, a yellow high-visibility vest over a grey-brown body, a red megaphone.",
   "standing, megaphone lowered at his side, determined", "megaphone raised to his mouth, other fist pumped, shouting"),
 "streikposten": (97, "sheet_npc_akt3_v1.png", "second row, second figure (but the sign must read STREIK)",
   "A generic mining robot, plainer than Schicht: silver-grey body, an orange hard hat, a plain wooden strike sign reading STREIK (the only text on the image) held in one hand.",
   "standing, sign resting on his shoulder", "sign raised high, mouth open, protesting"),
 "kraken": (86, "sheet_npc_akt3_v1.png", "second row, third figure",
   "A giant noodle octopus, orange-brown with big sad eyes, a tiny white chef hat, noodles on his head, a flat orange puddle of broth with a pair of chopsticks beside him. No pot, no bowl, no kitchen.",
   "sitting with drooping tentacles, big sad eyes", "two tentacles raised, mouth open, still sad"),
 "kleo": (99, "ende_01.png", "the hologram girl",
   "A 12-year-old hologram girl with pigtails, big headphones around her neck or ears, a dark NC hoodie and leggings, slightly transparent with a thin glowing cyan and pink edge on the figure itself (no glow around it).",
   "standing, hands at her sides, curious look", "hands spread, mouth open, expressive"),
 "teddy": (99, "ende_01.png", "the teddy bear",
   "A worn plush teddy bear in warm brown with patches and stitches, button eyes (one X-shaped), and an empty open mouth socket.",
   "standing, arms down, sad button eyes", "one arm raised, mouth socket open"),
 "teddy_sensor": (99, "ende_01.png", "the teddy bear",
   "The same worn patched plush teddy bear, now with a small chrome tongue-sensor plugged into his mouth.",
   "standing, arms down, curious button eyes", "one arm raised, the chrome sensor glowing faintly"),
}

AB = {k: (a, b) for lst in (an.AKT1, an.AKT2, an.AKT3) for k, _, _, a, b in lst}
NAME = {k: n for lst in (an.AKT1, an.AKT2, an.AKT3) for k, n, _, _, _ in lst}
ORDER = [k for lst in (an.AKT1, an.AKT2, an.AKT3) for k, *_ in lst]

RULES = """GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change."""


def build():
    out = ["""# Alle NPCs neu: einheitliche, ausführliche Prompts

**Ziel:** Alle 36 Nicht-Spieler-Figuren sehen am Ende gleich aus (gleicher Stil, gleiche Linien, gleiches Licht, gleicher Maßstab) und haben dieselben vier Posen. So passen Ruhe-, Sprech- und Animationsbilder immer zusammen, und es gibt keine Sprünge mehr.

**Aufbau jedes Prompts**
1. Liste der Referenzbilder (Image 1 = Pixel für den Maßstab, Image 2 = Stil, Image 3 = Design-Vorlage der Figur).
2. Globale Regeln (Stil, Licht, Kamera, Maßstab, Palette, Hintergrund, Layout), in jedem Prompt wortgleich.
3. Figur: Höhe in Prozent von Pixel, ausführliche Beschreibung und die vier Posen von links nach rechts: **ruhig, sprechend, Animation A, Animation B**.
4. Ausschlussliste („nicht“).

**Ein Bild pro Figur (nicht 12 pro Sheet):** Die KI hält große Raster nicht ein (fehlende, doppelte oder verschmolzene Figuren). Mit vier Figuren derselben Figur ist das Ergebnis viel stabiler und gleichmäßiger. Die Maßstäbe ergeben sich aus den Prozentwerten, sodass beim Zusammensetzen im Spiel alles zueinander passt.

**Ablauf**
1. Neuer Chat pro Figur. Referenzbilder in der angegebenen Reihenfolge anhängen. Die Design-Vorlage ist nur dafür da, dass die Figur wiedererkannt wird: Es soll **nur** die genannte Figur übernommen werden, alle anderen und alle Fehler im Sheet werden ignoriert.
2. Speichern als `assets/raw/npcpose_<name>.png`, 16:9, höchste Auflösung.
3. Prüfen: genau vier Figuren, gleicher Look, gleiche Größe, nichts anderes im Bild. Wenn etwas nicht stimmt, im selben Chat korrigieren: „Exactly four figures, same size and feet on one line, remove everything else“.
4. Sag mir Bescheid, ich schneide alles aus (`python3 tools/slice_npc_poses.py --all`) und ersetze die bisherigen Bilder.

**Empfohlene Reihenfolge:** Akt 1 (12), Akt 2 (12), Akt 3 (12). Die 13 Figuren, denen bisher das Sprechbild fehlt (Ablage, Kloß, Grünhorn, Staub, Mortimer, Schraub, Stefan, Zeus, Flimmer, Tackert, Kabel, Kraken, Streikposten), zuerst.

**Maßstab-Übersicht (Höhe in Prozent von Pixel)**

| Figur | Höhe | Figur | Höhe | Figur | Höhe |
|---|---|---|---|---|---|
"""]
    rows = []
    for k in ORDER:
        rows.append(f"| {NAME[k]} | {D[k][0]} % |")
    # drei Spalten
    for i in range(0, len(rows), 3):
        chunk = rows[i:i + 3]
        out.append("| " + " | ".join(c.strip("| ").replace(" | ", " | ") for c in chunk) + " |\n")
    out.append("\n---\n")
    meta = {}
    for i, k in enumerate(ORDER, start=1):
        pct, sheet, where, detail, idle, talk = D[k]
        a, b = AB[k]
        name = NAME[k]
        if k in ("kleo", "teddy", "teddy_sensor"):
            refs = "ref_01_pixel_turnaround.png, ref_03_stil_nudelgasse.png, ende_01.png"
            lines = ["Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.",
                     "Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.",
                     "Image 3 (ende_01.png): use it for the exact design of KLEO (hologram girl) and TEDDY-BOT (patched plush teddy bear) in the final scene; copy the requested character exactly and ignore all other characters."]
        else:
            refs = f"ref_01_pixel_turnaround.png, ref_03_stil_nudelgasse.png, {sheet}"
            lines = ["Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.",
                     "Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.",
                     f"Image 3 ({sheet}): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet."]
        prompt = ("ATTACHED REFERENCE IMAGES (attach them in exactly this order):\n" + "\n".join(lines) + "\nFollow the references closely. Now create the following image.\n\n"
                  "Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.\n\n"
                  + RULES + "\n\n"
                  f"CHARACTER: {name}\n"
                  f"Height: {pct} percent of Pixel's height (Pixel = 100 percent).\n"
                  f"Design source in Image 3: {where}.\n"
                  f"Appearance in detail: {detail}\n\n"
                  "THE FOUR POSES, from left to right:\n"
                  f"1. IDLE: {idle}.\n"
                  f"2. TALKING: {talk}.\n"
                  f"3. ANIMATION POSE A: {a}.\n"
                  f"4. ANIMATION POSE B: {b}.\n"
                  "Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.\n\n"
                  "DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.\n\n"
                  + bp.STIL)
        out.append(f"## {i}. {name}\n")
        out.append(f"- **Speichern als:** `assets/raw/npcpose_{k}.png`")
        out.append("- **Format:** 16:9, highest resolution (2K or 4K)")
        out.append("- **Referenzbilder (in dieser Reihenfolge anhängen):** " + ", ".join(f"`{r.strip()}`" for r in refs.split(",")))
        out.append(f"- **Höhe:** {pct} % von Pixel\n")
        out.append("```\n" + prompt + "\n```\n")
        meta[k] = ["idle", "talk", "a", "b"]
    (ROOT / "docs" / "prompts-npc-neu.md").write_text("\n".join(out), encoding="utf-8")
    (ROOT / "tools" / "npc_poses.json").write_text(json.dumps(meta, indent=1), encoding="utf-8")
    print(len(ORDER), "Prompts geschrieben")


if __name__ == "__main__":
    build()
