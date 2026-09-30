#!/usr/bin/env python3
"""Erzeugt docs/prompts-akt1.md: alle Bild-Prompts vollständig ausgeschrieben (keine Platzhalter).

  python3 tools/build_prompts.py
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

STIL = ("Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and "
        "Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, "
        "exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture "
        "(NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and "
        "deep violet, soft glows, wet reflective ground, lots of small funny details.")

BG_TAIL = ("No characters, no people, no animals, no robots. No watermark, no UI, no frame, no border. "
           "Text only where explicitly requested, short and readable.")

SHEET_HEAD = ("Sprite sheet on a perfectly flat solid pure green (#00FF00) background. Exactly {cols} columns and "
              "{rows} rows, {n} cells in total, reading order left to right, top to bottom. Each cell holds exactly "
              "one item, fully inside its own cell, centered, with a large empty green gap between all cells. "
              "Nothing touches or overlaps. Same scale for all items. No cast shadows, no floor, no text, no glow, "
              "halo or light bloom outside the outline. Do not use green colors for any item (make metal silver, "
              "circuit boards purple or blue, glass clear). Thick dark outline around every item.")

FIGURE_HEAD = ("Sprite sheet on a perfectly flat solid pure green (#00FF00) background. Exactly {cols} columns and "
               "{rows} rows, {n} cells in total, reading order left to right, top to bottom. Each cell holds exactly "
               "one full-body figure, fully inside its own cell, centered, with a large empty green gap between all "
               "cells. Nothing touches or overlaps. Same scale for all figures, feet roughly on the same line in each "
               "row. No cast shadows, no floor, no text, no glow, halo or light bloom outside the outline. Do not use "
               "green colors on any figure. Thick dark outline around every figure.")

FORMAT_BG = "16:9, highest resolution (2K or 4K)"
FORMAT_SHEET = "16:9, highest resolution (2K or 4K)"


def bg(n, name, refs, desc):
    return dict(title=f"Hintergrund {n:02d}: {name}", path=f"assets/raw/bg_{n:02d}_{name}.png", fmt=FORMAT_BG, refs=refs,
                prompt=f"{desc} {BG_TAIL}\n\n{STIL}")


REF_BG = "ref_03_stil_nudelgasse.png, bg_01_zhangs_imbiss.png"

ASSETS = []

# ---------- Hintergründe Akt 1 ----------
ASSETS.append(bg(2, "nudelgasse", REF_BG,
    "A narrow cyberpunk slum alley street in Under-Heights, wide horizontal 16:9 composition, seen straight on like a "
    "stage set with open walkable ground in the lower third. Left: the cozy open front of a noodle shop with steaming "
    "pots, red paper lanterns and a big flickering neon sign reading \"NUDEL\". Next to it a laundromat with a blue neon "
    "sign \"WASCHBÄR\" and a bakery with a warm yellow sign \"ZUM KNUSPRIGEN BYTE\". In the center background an old "
    "chain-link gate to a junkyard. Right: a corner building with a heavy metal door and a purple neon arrow sign reading "
    "\"NULL POINTER\", and far right a market archway with lanterns and a sign \"BASAR\". Cables overhead, wet reflective "
    "pavement, a dented green garbage bin in the foreground left of center (overflowing with scrap, no glowing items in it). "
    "No crates or boxes standing around (added later)."))
ASSETS.append(bg(3, "schrottplatz", REF_BG,
    "Junkyard \"Rostige Rosi\" at sunset, wide 16:9 composition, open walkable ground in the front. Mountains of scrap "
    "metal at both sides, a tall rusty crane in the center-left with an empty chain hanging from its arm (no magnet on it), "
    "a cluttered workbench with tools on the right, a tiny corrugated shack with a hand-painted sign \"ROSTIGE ROSI\", "
    "shelves of spare parts, and at the back center a gap between scrap heaps leading toward a dark sewer tunnel. "
    "Orange and pink sunset glow through smog. Leave a clear empty patch of ground next to the workbench."))
ASSETS.append(bg(4, "bar", REF_BG,
    "Interior of the hacker bar \"NULL POINTER\", wide 16:9, dark and moody, only magenta, cyan and amber lights. "
    "A long bar counter with stools in the front, bottle shelves with glowing bottles on the back wall, tangled cables, "
    "two old arcade cabinets on the left, hanging screens with glitch patterns. On the right side of the back wall a "
    "plain metal door with a sign \"PERSONAL\" (closed). Open floor space in front. No bartender, no guests."))
ASSETS.append(bg(5, "bar_hinterzimmer", REF_BG,
    "Cramped back room of a hacker bar, wide 16:9, dim and dusty. Server racks with blinking lights on the left, "
    "a simple empty wooden desk in the center with a desk lamp (no computer on the desk, it is added later), cardboard "
    "boxes in the corner, a network cable socket on the right wall with nothing plugged in, tangled cables on the floor. "
    "Open floor space in front of the desk."))
ASSETS.append(bg(6, "basar", REF_BG,
    "Black market bazaar under a concrete bridge, wide 16:9. Colorful stalls with mysterious wares, hanging lanterns "
    "and draped cloth, crates with scribbled labels, a long empty counter under a striped awning in the center where a "
    "dealer will stand later, and on the right a tunnel entrance leading to a train station with a blue glow. "
    "Open walkable ground in the front. No vendors, no customers."))
ASSETS.append(bg(7, "waschsalon", REF_BG,
    "Self-service laundromat \"WASCHBÄR\", wide 16:9, soft teal and pink light. A row of round porthole washing machines "
    "along the back wall, a closed gray metal fuse box mounted on the left wall, a wicker laundry basket with mixed clothes "
    "on the floor (no single loose sock visible), plastic chairs, a wall clock, and on the right side a narrow staircase "
    "leading up to a door. Open floor space in front."))
ASSETS.append(bg(8, "baeckerei", REF_BG,
    "Bakery \"ZUM KNUSPRIGEN BYTE\", wide 16:9, cozy warm yellow light. Shelves with bread and pretzels, a brick oven "
    "glowing orange, a flour-dusted counter in the center with an old cash register, a pretzel-shaped neon sign, a hook "
    "on the wall with a broken flour sieve. No baker. Open floor space in front of the counter."))
ASSETS.append(bg(9, "dachgarten", REF_BG,
    "Rooftop garden high above the slum, wide 16:9, purple dusk sky with a view over neon rooftops. Pigeon lofts made from "
    "wooden crates, antennas, satellite dishes, laundry lines, potted plants, and a small throne built from stacked crates "
    "in the center. A door or hatch on the right leading back down. Open floor space in front. No pigeons visible."))
ASSETS.append(bg(10, "kanal_eingang", REF_BG,
    "Entrance to a sewer beneath the junkyard, wide 16:9: a concrete tunnel mouth with dripping pipes and graffiti, "
    "a puddle with pink glowing slime, and on the ground in the front center a heavy round iron manhole cover (closed). "
    "Dim green-blue light. Open floor space."))
ASSETS.append(bg(11, "pumpenraum", REF_BG,
    "Underground pump room, wide 16:9, eerie cyan lighting. Big rusty pipes and valves, a humming pump machine in the "
    "center, a pile of trash in a corner that forms a rat nest, and a hole in the wall at the right with nothing in it "
    "(a cable will be shown there later). Wet floor. Open floor space in front."))
ASSETS.append(bg(12, "bahnhof", REF_BG,
    "Magnetic train station \"SÜD\", wide 16:9, cool blue tones. A platform with a sleek floating magnetic train at the "
    "back, a ticket machine on the left, a small conductor's booth on the right with a ticket barrier in front of the "
    "train (barrier closed), a flickering departure board with cryptic symbols, billboards with ads. Open floor space in "
    "front. No conductor."))

# ---------- Sheets ----------
npc_cells = [
    ("Oma Zhang", "tiny 87-year-old woman, huge round glasses, kitchen apron, hair bun held by chopsticks, wrinkled kind face"),
    ("Rosi", "enormous rusty robot woman, welder mask pushed up on her head, spare parts worn as jewelry, one arm is a crane arm"),
    ("Bit", "bar robot with a bucket-shaped head, a cocktail shaker in his hand and a small loading bar on his chest"),
    ("Hehler-Hugo", "four-armed creature in a trench coat with countless pockets, wide-brim hat, sly smile"),
    ("Kurt", "pigeon crime boss with a gold chain and a monocle, puffed chest, tiny cigar holder"),
    ("Brezel", "round bakery robot shaped like a pretzel, dusted with flour, tall chef hat"),
    ("Schaffner 4711", "boxy train conductor robot with a whistle, a cap and a giant rubber stamp in one hand"),
    ("Bello-5000", "robot dog with a wagging antenna tail and ball-shaped eyes, holding a chew toy"),
    ("Wuschel (defekt)", "small round vacuum cleaner robot, dented, sparking, one wheel missing, sad"),
    ("Wuschel (repariert)", "the same small round vacuum cleaner robot, repaired, shiny and happy"),
    ("Ratten-Trupp", "three rats with tiny hard hats holding protest signs"),
    ("Katze Schrödinger", "a smug cat sitting, slightly glowing and half transparent at the edges"),
]
npc_list = "\n".join(f"{i + 1}. {n}: {d}." for i, (n, d) in enumerate(npc_cells))
npc_talk = "\n".join(f"{i + 13}. {n}, talking or acting (mouth open, one arm gesturing; the non-speaking ones in an active alternative pose such as barking, vacuuming, squeaking or purring)." for i, (n, _) in enumerate(npc_cells))
ASSETS.append(dict(
    title="NPC-Sheet Akt 1 (12 Figuren, je ruhig und sprechend)", path="assets/raw/sheet_npc_akt1.png", fmt=FORMAT_SHEET,
    refs="ref_01_pixel_turnaround.png, ref_03_stil_nudelgasse.png",
    prompt=(FIGURE_HEAD.format(cols=6, rows=4, n=24) +
            " All figures stand in a three-quarter view facing left (toward the player character), full body.\n\n"
            "Rows 1 and 2 (cells 1 to 12): the characters standing idle, in this order:\n" + npc_list +
            "\n\nRows 3 and 4 (cells 13 to 24): the same 12 characters in the same order, now talking:\n" + npc_talk +
            "\n\n" + STIL)))

props = [
    "closed wooden crate with a warning sign reading \"NICHT ÖFFNEN! KATZE (VIELLEICHT)\"",
    "the same crate opened, lid up, empty inside",
    "heavy round iron manhole cover lying closed on the ground, seen from a slight angle above",
    "an open manhole: dark round hole in the ground, drawn larger than the cover so it can hide it, iron cover leaning beside it",
    "old computer terminal with a chunky screen, switched off",
    "the same terminal switched on, amber text lines on the screen",
    "gray metal fuse box on a wall, closed",
    "the same fuse box opened, a ceramic fuse inside glowing hot orange",
    "the same fuse box opened and empty",
    "a single striped sock, slightly dirty, lying on the floor",
    "a fiber optic cable hanging from a wall hole with a chewed, frayed end",
    "a glowing fiber optic cable properly connected to a wall socket",
    "ticket barrier gate of a train station, closed",
    "the same ticket barrier gate, open",
    "a plain metal back door with a sign \"PERSONAL\", closed",
    "the same metal door, open, dark room behind it",
    "a framed old photo of two laughing elderly people (front side), hanging-style frame with small wall hook",
    "a rusty crane magnet hanging from a rope on a hook, orange disc-shaped body",
]
prop_list = ", ".join(f"{i + 1} {p}" for i, p in enumerate(props))
ASSETS.append(dict(
    title="Props Akt 1 (18 Szenen-Objekte mit Zuständen)", path="assets/raw/sheet_props_akt1.png", fmt=FORMAT_SHEET,
    refs="ref_03_stil_nudelgasse.png, bg_01_zhangs_imbiss.png",
    prompt=(SHEET_HEAD.format(cols=6, rows=3, n=18) +
            " Draw every object at the natural size relative to a 1.7 m tall person; the objects will be scaled later. "
            "Objects in order: " + prop_list + ".\n\n" + STIL)))

ASSETS.append(dict(
    title="Karte Unter-Heights", path="assets/raw/map_unterstadt.png", fmt=FORMAT_BG, refs="ref_03_stil_nudelgasse.png",
    prompt=("Illustrated top-down map of a cyberpunk slum district, 16:9, parchment-meets-neon look, a decorative border "
            "and a small compass rose, NO text labels. Twelve clearly separated, recognizable small illustrated places "
            "connected by alleys and a canal, spread evenly over the map with empty space between them: "
            "1 a cozy noodle shop with lanterns (left), 2 a long main alley in the center, 3 a junkyard with a crane "
            "(bottom left), 4 a bar with neon arrow, 5 a small back room attached behind the bar, 6 a bazaar market under a "
            "bridge (right), 7 a laundromat with a staircase to 8 a rooftop garden with pigeon lofts (top left), "
            "9 a bakery with a chimney, 10 a sewer entrance (bottom center) with 11 an underground pump room drawn below it, "
            "12 a magnetic train station (far right). Dark background at the edges fading into neon city glow.\n\n" + STIL)))

intro = [
    ("intro_01", "Night skyline of a three-level cyberpunk megacity, rain, neon glow, floating lights, a huge neon noodle-bowl sign on a tower, wide cinematic composition."),
    ("intro_02", "A teal-haired courier girl (Pixel, exactly as in the reference) on a hoverboard flying between skyscrapers, a small flying toaster drone (Krümel, as in the reference) beside her, delivery bag, dynamic low angle."),
    ("intro_03", "A street soup vending machine pouring gray paste into a customer's bowl, a sad queue of people and robots behind him, neon rain."),
    ("intro_04", "City riot in front of dead soup vending machines: angry robots and people with protest signs (no readable text), comic chaos, no violence."),
    ("intro_05", "Inside a cozy noodle shop: a tiny old grandmother with big round glasses stands in front of an open empty wall safe, worried, warm orange light."),
    ("intro_06", "Close-up of a soy sauce footprint on the floor, the flying toaster drone Krümel scanning it with a blue beam from his eyes, the orange sleeve of a courier jacket visible at the edge."),
    ("intro_07", "The silhouette of a small child figure holding a soup spoon, standing on a glowing tower high above the city at night, looking down at the skyline, mysterious mood."),
]
for name, desc in intro:
    ASSETS.append(dict(title=f"Intro-Bild {name[-2:]}", path=f"assets/raw/{name}.png", fmt=FORMAT_BG,
                       refs="ref_01_pixel_turnaround.png, ref_02_kruemel.png, ref_03_stil_nudelgasse.png",
                       prompt=f"{desc} Cinematic 16:9 illustration. No text, no letters, no watermark, no UI, no frame.\n\n{STIL}"))

ASSETS.append(dict(
    title="Titelbild", path="assets/raw/titel.png", fmt=FORMAT_BG,
    refs="ref_01_pixel_turnaround.png, ref_02_kruemel.png, ref_03_stil_nudelgasse.png",
    prompt=("Title screen artwork, 16:9: the teal-haired courier Pixel and the flying toaster drone Krümel (both exactly as in "
            "the references) stand in the lower left in front of a huge glowing neon noodle bowl floating above a cyberpunk "
            "skyline at night. The title \"NEON NOODLE\" in big chunky neon letters across the top center, and the subtitle "
            "\"Der Fall der verschwundenen Nudelsuppe\" in small letters below it. Leave the right third of the image calmer "
            "and darker (menu buttons will be placed there). No watermark.\n\n" + STIL)))

# ---------- Endbilder ----------
END_TAIL = "Cinematic 16:9 illustration. No text, no letters, no watermark, no UI, no frame."
KLEO = ("KLEO, a 12-year-old girl who appears as a slightly transparent hologram with softly glowing cyan and pink edges, "
        "two pigtails, big headphones around her neck and an oversized dark hoodie with a small \"NC\" logo")
TEDDY = ("TEDDY-BOT, a worn, patched plush teddy-bear robot with button eyes, and a small chrome tongue-sensor plugged into "
         "his mouth")
ASSETS.append(dict(
    title="Endbild 01: Kleo schmeckt zum ersten Mal", path="assets/raw/ende_01.png", fmt=FORMAT_BG,
    refs="ref_03_stil_nudelgasse.png, bg_01_zhangs_imbiss.png, ref_01_pixel_turnaround.png",
    prompt=("Inside the cozy noodle shop (as in the attached interior image), warm orange lantern light and steam. "
            f"{KLEO}, stands at the counter and holds a spoon with steaming soup toward {TEDDY}, who sits on the counter. "
            "Teddy-Bot's button eyes sparkle, and Kleo's face beams with pure, huge, surprised joy because she tastes for the "
            "very first time; tiny glowing sparkles and heart-shaped steam float around them. A bowl of ramen with a golden "
            "glowing broth stands in front of them. Medium shot, both characters clearly visible in the foreground. "
            "No other characters. " + END_TAIL + "\n\n" + STIL)))
ASSETS.append(dict(
    title="Endbild 02: Die Stadt feiert", path="assets/raw/ende_02.png", fmt=FORMAT_BG,
    refs="ref_03_stil_nudelgasse.png, intro_01.png (oder intro_02.png)",
    prompt=("A wide view of the cyberpunk megacity at night, all three levels, celebrating: street soup vending machines "
            "everywhere pour glowing golden broth into bowls, happy people and funny robots of all shapes dance and cheer in "
            "the streets with steaming bowls, confetti and paper lanterns fill the air, flying taxis carry banners (no readable "
            "text), fireworks in the shape of noodles and bowls light up the sky in magenta, cyan and amber. A huge neon noodle-bowl "
            "sign glows on a tower. Joyful, chaotic and warm. No text. " + END_TAIL + "\n\n" + STIL)))
ASSETS.append(dict(
    title="Endbild 03: Alle am Tresen", path="assets/raw/ende_03.png", fmt=FORMAT_BG,
    refs="bg_01_zhangs_imbiss.png, ref_01_pixel_turnaround.png, ref_02_kruemel.png, ende_01.png",
    prompt=("The cozy final scene inside the noodle shop (same interior as in the first attached image): four friends sit and "
            "stand around the counter sharing bowls of steaming ramen with golden broth. PIXEL (the teal-haired courier girl in "
            "the orange jacket, exactly as in the reference) grins with chopsticks in hand; KRÜMEL, the small flying toaster drone "
            "(as in the reference), hovers beside her with a slice of toast; OMA ZHANG, a tiny 87-year-old woman with huge round "
            "glasses, a kitchen apron and a hair bun held by chopsticks, proudly ladles soup behind the counter; KLEO, the "
            "12-year-old hologram girl with pigtails and headphones, and her plush robot TEDDY-BOT (exactly as in the fourth "
            "attached image) sit at the counter, both smiling happily. Warm orange lantern light, steam, the soup dispenser in "
            "the background now pouring golden broth, the safe closed again. Wide group shot, everyone clearly visible. "
            + END_TAIL + "\n\n" + STIL)))

ui = [
    "mouse cursor arrow (neon outlined)", "look cursor (an eye)", "use cursor (a hand)", "talk cursor (a speech bubble)",
    "walk cursor (two footprints)", "arrow pointing left", "arrow pointing right", "arrow pointing up", "arrow pointing down",
    "map pin, visited place (magenta)", "map pin, current place (amber, larger)", "map pin, locked place (gray with a padlock)",
    "checkbox ticked", "checkbox empty", "slider knob", "button frame normal (dark metal with cyan neon edge)",
    "button frame hover (brighter edge)", "button frame pressed (inset)",
]
ASSETS.append(dict(
    title="UI-Sheet (Cursor, Pfeile, Kartenpins, Bedienelemente)", path="assets/raw/sheet_ui.png", fmt=FORMAT_SHEET,
    refs="ref_03_stil_nudelgasse.png",
    prompt=(SHEET_HEAD.format(cols=6, rows=3, n=18) + " Dark metal with neon edges, playful, consistent line weight. "
            "Items in order: " + ", ".join(f"{i + 1} {u}" for i, u in enumerate(ui)) + ".\n\n" + STIL)))

ORDER_NOTE = """\
# Bild-Prompts, Teil 1 (Akt 1 und Grundausstattung)

Jeder Prompt ist **vollständig ausgeschrieben**: kopiere den Block unverändert in Nano Banana Pro, hänge die genannten Referenzbilder an,
stelle das Format ein und speichere das Ergebnis im genannten Pfad (beim Speichern nur den Namen **ohne** `.png` eintippen, falls dein System die Endung ergänzt).

**Bereits fertig:** `ref_01`, `ref_02`, `ref_03`, `bg_01`, `sheet_items_akt1`, `sheet_pixel`, `sheet_kruemel`.

**Regeln, die sich bewährt haben**
- Immer neuen Chat pro Bild, 16:9, höchste Auflösung.
- Bei Sheets steht die Zeilen-/Spaltenzahl im Prompt. Wenn die KI das Raster nicht einhält, ist das kein Drama, ich erkenne die Figuren automatisch.
- Sieht ein Ergebnis gut aus, aber hat einen kleinen Fehler (falsches Schild, ein Gegenstand fehlt), korrigiere im selben Chat per Textbefehl.

**Empfohlene Reihenfolge:** 1 bis 11 (Hintergründe) → 12 (NPCs) → 13 (Props, erst nachdem ich die Hintergründe gesehen habe) → 14 bis 22 (Karte, Intro, Titel) → 23 bis 25 (Endbilder) → 26 (UI).\nDie Endbilder legen das Aussehen von **Kleo und Teddy-Bot** fest. Erzeuge `ende_01` zuerst und hänge es bei `ende_03` als Referenz an.
Du musst nicht alles auf einmal liefern. Sag mir nach jeder Gruppe Bescheid.

---

"""


def main():
    out = [ORDER_NOTE]
    for i, a in enumerate(ASSETS, start=1):
        out.append(f"## {i}. {a['title']}\n")
        out.append(f"- **Speichern als:** `{a['path']}`")
        out.append(f"- **Format:** {a['fmt']}")
        out.append(f"- **Referenzbilder anhängen:** {a['refs']}\n")
        out.append("```\n" + a["prompt"] + "\n```\n")
    path = ROOT / "docs" / "prompts-akt1.md"
    path.write_text("\n".join(out), encoding="utf-8")
    print(f"{len(ASSETS)} Prompts nach {path.relative_to(ROOT)} geschrieben.")


if __name__ == "__main__":
    main()
