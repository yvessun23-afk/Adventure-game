#!/usr/bin/env python3
"""Erzeugt docs/prompts-npc-animation.md (komplette Nano-Banana-Prompts für die individuellen NPC-Animationen)
und die Namenslisten tools/names/npc_anim_akt{1,2,3}.txt.

  python3 tools/build_npc_anim_prompts.py
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import build_prompts as bp  # noqa: E402

ROOT = bp.ROOT

# (Dateiname, Anzeigename, Aussehen, Pose A, Pose B)  – A und B laufen im Spiel abwechselnd (A B A B A B) und wirken als kleine Aktion
AKT1 = [
    ("oma", "Oma Zhang", "tiny 87-year-old woman, huge round glasses, kitchen apron, hair bun held by chopsticks",
     "stirring an invisible soup pot with a wooden ladle held out in front of her, head slightly tilted, content smile",
     "same stirring motion with the ladle on the other side, taking a tiny taste with a satisfied squint"),
    ("rosi", "Rosi", "enormous rusty robot woman, welder mask pushed up on her head, spare parts as jewelry, one arm is a crane arm",
     "hammering on something with a big wrench, arm raised high, welder mask pulled down over the face",
     "hammer swung down, a few sparks flying, mask still down, body leaning into the swing"),
    ("bit", "Bit", "bar robot with a bucket-shaped head, cocktail shaker in his hand, small loading bar on his chest",
     "shaking the cocktail shaker high beside his head, loading bar on his chest at about one third",
     "shaker held low, lifting the lid to peek inside, loading bar at about two thirds"),
    ("hugo", "Hehler-Hugo", "four-armed creature in a trench coat with countless pockets, wide-brim hat, sly smile",
     "glancing sideways over his shoulder with suspicious eyes, two arms holding the coat open to show shiny junk inside",
     "coat closed again, finger on his lips in a shushing gesture, looking the other way"),
    ("kurt", "Kurt", "pigeon crime boss with a gold chain, monocle, puffed chest, tiny cigar holder",
     "head pecking forward in a typical pigeon bob, chest puffed, cigar holder in beak",
     "head pulled back, wing smoothing the gold chain, smug half-closed eyes"),
    ("brezel", "Brezel", "round bakery robot shaped like a pretzel, dusted with flour, tall chef hat",
     "kneading dough in front of his belly with both hands, flour puffing up, cheerful face",
     "tossing a small dough ball up in the air with one hand, other hand on his hip, proud grin"),
    ("schaffner", "Schaffner 4711", "boxy train conductor robot with a whistle, a cap and a giant rubber stamp",
     "checking an imaginary pocket watch held in one hand, stern look, stamp tucked under the other arm",
     "blowing the whistle with puffed cheeks, stamp raised in the other hand"),
    ("bello", "Bello-5000", "robot dog with a wagging antenna tail, ball-shaped eyes, chew toy in his mouth",
     "sitting up and wagging the antenna tail to the left, tongue panel out, happy eyes",
     "antenna tail wagging to the right, head tilted curiously, chew toy squeaking in his mouth"),
    ("wuschel_defekt", "Wuschel (defekt)", "small round vacuum cleaner robot, dented, sparking, one wheel missing, sad",
     "wobbling to the left on its broken wheel, a small spark popping from the dent, one eye flickering",
     "wobbling to the right, sad droopy eyes, a thin puff of smoke"),
    ("wuschel_repariert", "Wuschel (repariert)", "the same small round vacuum cleaner robot, repaired, shiny and happy",
     "spinning a little to the left with a tiny sparkle on the shiny body, happy eyes",
     "spinning back to the right, bouncing slightly, a small happy heart symbol on its display"),
    ("ratten", "Ratten-Trupp", "three rats with tiny hard hats holding protest signs",
     "all three rats raising their blank protest signs up high, mouths open shouting",
     "signs lowered, rats leaning on each other, one wiping its brow, another yawning"),
    ("katze", "Katze Schrödinger", "a smug cat sitting, slightly glowing and half transparent at the edges",
     "licking one front paw, eyes closed, tail curled around the feet",
     "stretching with the front paws forward and the back raised, a wide yawn"),
]
AKT2 = [
    ("ablage", "Frau Ablage", "stern receptionist robot with a filing-cabinet body, glasses on a chain, sour expression",
     "a small drawer on her body pulled open, one hand pulling out a paper, looking over the glasses",
     "drawer slammed shut, one finger tapping on her body, impatient look"),
    ("kloss", "Chef Kloß", "desperate chubby cook robot with a dumpling-shaped head, a ladle in his hand",
     "wringing both hands in despair, sweat drops flying, eyes wide",
     "ladle raised, shaking his head, mouth in a wobbling worried line"),
    ("gruenhorn", "Grünhorn", "gardener robot built from garden tools and a watering can, a leaf on his head",
     "watering an invisible plant with the watering can arm tipped forward, a few drops falling",
     "watering can arm raised again, the leaf on his head perked up, proud smile"),
    ("staub", "Prof. Staub", "curator robot in a dusty tailcoat with a magnifying-glass eye",
     "leaning forward and inspecting something with the magnifying-glass eye, one finger raised",
     "straightening up, brushing dust off his tailcoat with a small cloud of dust"),
    ("schnipp", "Schnipp", "barber robot with scissor hands, wild electrified hair, striped coat",
     "snipping both scissor hands in the air at the front, tiny hair snippets flying",
     "scissors crossed in front of his chest like a pose, hair standing up with small sparks"),
    ("jackpot", "Madame Jackpot", "elegant woman with a roulette-wheel hat, gold gown and a cold smile",
     "hat's roulette wheel spinning (slight motion blur lines on the hat), one gloved hand fanning herself",
     "fan hand lowered, one eyebrow raised, cold polite smile, hat wheel still"),
    ("mortimer", "Mortimer", "tall casino doorman robot in a velvet suit, red rope in his hand",
     "arms crossed on his chest with the red rope hanging down, stony look straight ahead",
     "straightening his velvet lapels with one hand, looking down his nose"),
    ("schraub", "Dr. Schraub", "nervous thin doctor with big round glasses, white coat and trembling hands",
     "both hands trembling in front of him (small motion lines), eyes wide behind the glasses",
     "pushing his glasses up with a shaky finger, nervous half smile"),
    ("stefan", "Stempel-Stefan", "stout official with an oversized rubber stamp and ink-stained fingers",
     "stamp raised high above a table edge, stern concentrated face",
     "stamp slammed down low, a small puff of ink, satisfied nod"),
    ("zeus", "Kiosk-Zeus", "newspaper vendor robot with a roll-up screen body and a hat full of headlines",
     "screen body scrolling headlines (blurry colorful text bars), one hand cupped at his mouth shouting",
     "holding up a newspaper in one hand, other hand tipping his headline hat"),
    ("flimmer", "Flimmer", "sleepy hologram technician, headphones around the neck, eyes closed",
     "head nodding forward in a doze, small Z letters floating above, hologram edges flickering",
     "head snapping up with one eye half open, a flicker line through the body"),
    ("tackert", "Mr. Tackert", "a tiny hamster in a running wheel wearing a tiny tie",
     "running in the wheel with the front legs forward, tie flying backward, determined face",
     "running with the back legs forward in the wheel, tie flying the other way, panting"),
]
AKT3 = [
    ("klaus", "Türsteher Klaus", "bulky bouncer robot in a velvet jacket with an earpiece",
     "touching his earpiece with one finger, head tilted, listening",
     "arms crossed again, scanning the room with narrowed eyes"),
    ("sebastian", "Sebastian.exe", "tall perfectionist butler robot with a monocle lens and white gloves",
     "wiping an invisible speck off his sleeve with a white glove, monocle lens glinting",
     "adjusting his monocle with two fingers, chin raised"),
    ("baron", "Baron von Chrom", "pompous chrome-plated man with a huge moustache, cane and fur collar",
     "twirling one end of his moustache, cane planted, chin up with a chrome glint",
     "laughing grandly with his head thrown back, one hand on the fur collar, cane in the other hand"),
    ("zen", "Masseur Zen-3", "calm multi-armed massage robot in a bathrobe",
     "multiple arms kneading the air in slow circles, eyes closed, serene smile",
     "arms spread wide in a deep-breathing stretch, eyes closed"),
    ("flughans", "Flug-Hans", "cheerful ticket clerk robot with a pilot cap",
     "making an airplane gesture with one flat hand flying up, other hand holding a ticket",
     "saluting with two fingers at his pilot cap, big cheerful grin"),
    ("kabel", "Käpt'n Kabel", "tired captain with cable-like hair and dark circles, holding an empty mug",
     "tipping the empty mug upside down and staring into it, drooping shoulders",
     "huge yawn with one hand over the mouth, cable hair swaying"),
    ("schicht", "Schicht", "union leader mining robot with a hard hat, megaphone and protest vest",
     "megaphone raised to the mouth, other fist pumped in the air, shouting",
     "megaphone lowered, wiping the hard hat with a tired sigh"),
    ("streikposten", "Streikposten", "generic mining robot holding a strike sign",
     "strike sign raised high over his head in both hands",
     "strike sign lowered and leaning on his shoulder, kicking a small pebble with his foot"),
    ("kraken", "Ramen-Kraken", "giant noodle octopus with sad eyes, standing in a puddle of broth",
     "two tentacles lifted and drooping, a single tear rolling down, noodles dripping",
     "tentacles wrapped around himself in a hug, eyes closed, slightly smaller sad pose"),
    ("kleo", "Kleo", "the 12-year-old hologram girl with pigtails, big headphones and the dark NC hoodie, slightly transparent with cyan and pink glowing edges",
     "bobbing her head to music with the hands on the headphones, pigtails swinging, little glitch flicker",
     "giggling with a hand in front of her mouth, eyes sparkling, a small flicker on her edges"),
    ("teddy", "Teddy-Bot", "the worn, patched plush teddy bear with button eyes and an empty open mouth socket",
     "waving one stubby arm slowly, head tilted, button eyes looking up",
     "hugging his own arms to his chest, head drooping sadly"),
    ("teddy_sensor", "Teddy-Bot mit Sensor", "the same teddy bear with a small chrome tongue-sensor plugged into his mouth",
     "tapping the chrome sensor in his mouth with one paw, curious button eyes",
     "arms raised in surprise, button eyes wide, sensor glowing faintly"),
]

SHEETS = [
    ("Akt 1", "akt1", AKT1, "sheet_npc_akt1.png", "ref_01_pixel_turnaround.png, ref_03_stil_nudelgasse.png, sheet_npc_akt1.png"),
    ("Akt 2", "akt2", AKT2, "sheet_npc_akt2.png", "ref_01_pixel_turnaround.png, ref_03_stil_nudelgasse.png, sheet_npc_akt2.png"),
    ("Akt 3", "akt3", AKT3, "sheet_npc_akt3.png", "ref_01_pixel_turnaround.png, ref_03_stil_nudelgasse.png, sheet_npc_akt3.png, ende_01.png"),
]
bp.ROLES.update({
    "sheet_npc_akt2.png": "the exact designs of the 12 Act-2 characters (same order as in the cells below: copy every figure's look, colors and proportions exactly; their idle and talking poses are the base)",
    "sheet_npc_akt3.png": "the exact designs of the 12 Act-3 characters (same order as in the cells below: copy every figure's look, colors and proportions exactly; their idle and talking poses are the base)",
})
bp.ROLES["sheet_npc_akt1.png"] = "the exact designs of the 12 Act-1 characters (same order as in the cells below: copy every figure's look, colors and proportions exactly; their idle and talking poses are the base)"

INTRO = """# NPC-Animationen: Prompts für Nano Banana 2

Jeder NPC bekommt **zwei zusätzliche Bilder** (Pose A und Pose B), die im Spiel ab und zu abwechselnd laufen (A, B, A, B, A, B) und damit eine kleine, persönliche Aktion zeigen: Oma rührt in der Suppe, Rosi hämmert, die Katze putzt sich und so weiter. Dazu kommen weiterhin das sanfte Atmen und Wiegen. Fehlen die Bilder, bleibt alles wie bisher.

**Es sind 3 Sheets, je 12 Figuren und 24 Zellen** (Reihe 1 und 2 = Pose A, Reihe 3 und 4 = Pose B, gleiche Reihenfolge wie die Figuren im Sheet).

**Ablauf**
1. Neuer Chat pro Sheet, 16:9, höchste Auflösung. Referenzbilder in der genannten Reihenfolge anhängen. Die vorhandenen NPC-Sheets zeigen der KI, wie jede Figur aussieht.
2. Speichern unter dem angegebenen Pfad in `assets/raw/`.
3. Sag mir Bescheid, ich schneide sie aus (`tools/slice_sheet.py` mit den Namenslisten `tools/names/npc_anim_akt*.txt`) und baue sie ein. Wenn die KI das Raster nicht einhält, erkenne ich die Figuren trotzdem automatisch.

**Hinweis:** Die Figuren sollen dieselbe Größe und dieselbe Fußlinie wie im Ruhebild haben. Die Körpergröße gleiche ich beim Einbau automatisch an.

---
"""

def build():
    out = [INTRO]
    for n, (akt, key, lst, sheet, refs) in enumerate(SHEETS, start=1):
        cells_a = "\n".join(f"{i + 1}. {d[1]}: {d[2]}. POSE A: {d[3]}." for i, d in enumerate(lst))
        cells_b = "\n".join(f"{i + 13}. {d[1]}: POSE B of the same character: {d[4]}." for i, d in enumerate(lst))
        prompt = (bp.FIGURE_HEAD.format(cols=6, rows=4, n=24) +
                  " All figures stand in a three-quarter view facing left (toward the player character), full body, exactly the same scale, body proportions and feet position as in the attached character sheet. "
                  "Every figure keeps its design from the reference sheet exactly; only the pose changes. The two poses of one character must look like two consecutive frames of a small looping idle animation (clear but not extreme movement, the feet stay planted).\n\n"
                  "Rows 1 and 2 (cells 1 to 12): the characters in animation pose A, in this order:\n" + cells_a +
                  "\n\nRows 3 and 4 (cells 13 to 24): the same 12 characters in the same order, now in animation pose B:\n" + cells_b +
                  "\n\n" + bp.STIL)
        a = dict(title=f"NPC-Animationen {akt}", path=f"assets/raw/sheet_npc_anim_{key}.png", fmt=bp.FORMAT_SHEET, refs=refs, prompt=prompt)
        _, files, full = bp.with_refs(a)
        out.append(f"## {n}. {a['title']} (12 Figuren, je Pose A und B)\n")
        out.append(f"- **Speichern als:** `{a['path']}`")
        out.append(f"- **Format:** {a['fmt']}")
        out.append("- **Referenzbilder (in dieser Reihenfolge anhängen):** " + ", ".join(f"`{f}`" for f in files) + "\n")
        out.append("```\n" + full + "\n```\n")
        names = [f"{d[0]}_a" for d in lst] + [f"{d[0]}_b" for d in lst]
        (ROOT / "tools" / "names" / f"npc_anim_{key}.txt").write_text("\n".join(names) + "\n", encoding="utf-8")
    (ROOT / "docs" / "prompts-npc-animation.md").write_text("\n".join(out), encoding="utf-8")
    print("docs/prompts-npc-animation.md geschrieben")

if __name__ == "__main__":
    build()
