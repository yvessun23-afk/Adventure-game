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


# =====================================================================
# Teil 2: alle noch fehlenden Bilder (Rest von Akt 1, Akt 2, Akt 3)
# =====================================================================
MISSING = [a for a in ASSETS if any(a["path"].endswith(f"intro_{n}.png") for n in ("01", "03", "04", "05", "06"))]

REF_ACT = "ref_03_stil_nudelgasse.png, bg_01_zhangs_imbiss.png, bg_02_nudelgasse.png"

def bg2(n, name, desc):
    return bg(n, name, REF_ACT, desc)

# ---------- Akt 2: Mittel-Heights ----------
ACT2 = [
    bg2(13, "plaza",
        "Giant corporate plaza between glass skyscrapers in Mid-Heights, wide horizontal 16:9 composition, clean and cold with bright magenta and cyan accents, open walkable ground in the lower third. "
        "A huge holographic billboard reading \"NUDELN FÜR ALLE*\" floats in the center. On the left a police station entrance with a sign \"REVIER 404\", next to it a hair salon with a sign \"SCHNIPP & ZAP\" and a glamorous golden casino entrance with a sign \"GOLDEN BYTE\". "
        "In the center the revolving door of a tall tower with the sign \"NOODLECORP\". On the right a side alley with a keypad on a metal door and a sign \"KANTINE\", a factory door with a sign \"HOLOGRAMM-WERBEFABRIK\", a park entrance with plastic trees and a cable car station far right with a sign \"HIMMELFAHRT\". "
        "A kiosk with an empty newspaper bench in the foreground (no newspaper lying around)."),
    bg2(14, "lobby",
        "Sterile corporate lobby of the NoodleCorp tower, wide 16:9, cold white and magenta light. A huge empty reception desk with a small hamster-wheel clock in the center (no receptionist), a revolving door at the front, a security scanner gate, potted plastic plants, "
        "a row of elevators on the right with one elevator door open, and a cheerful but soulless mural of a noodle bowl on the wall. Open floor space in front."),
    bg2(15, "kantine",
        "Industrial company cafeteria of NoodleCorp, wide 16:9, stainless steel and pale green light. Self-service counters with bowls of gray paste, huge empty soup kettles, a stack of serving trays on a counter, a green trash bin with an empty bottle visible inside, "
        "a clothes rack with white coats and uniforms hanging on hooks near the back, a service door with a keypad at the right. Cafeteria tables in the foreground with open floor space. No cook."),
    bg2(16, "bueros",
        "Open-plan office maze of NoodleCorp, wide 16:9, harsh office light with magenta accents. Gray cubicle walls in a maze, stacks of forms, a jammed printer with paper sticking out, a desk in the foreground with a hamster cage and a little nameplate reading \"MR. TACKERT\", "
        "a computer terminal on the desk, motivational posters with slogans like \"SYNERGIE!\". Open floor space in the front. No people."),
    bg2(17, "werbefabrik",
        "Hologram advertisement factory, wide 16:9, colorful glowing light. Holographic projectors, half-finished floating ads, a large hologram printer machine in the center with a wide scanner slot and a tray, cables everywhere, an empty swivel chair where a technician sleeps (no person), "
        "a door to the plaza on the right. Open floor space in the front."),
    bg2(18, "friseur",
        "Robot barber shop \"SCHNIPP & ZAP\", wide 16:9, bright colorful and chaotic. Barber chairs with crazy helmet hair dryers, walls with posters of wild hairstyles, a big mirror with flashing bulbs, a tool station with a robotic scissor arm that hangs broken and dull, "
        "a doorway on the right leading to the casino. No barber, no customers. Open floor space in front."),
    bg2(19, "casino",
        "Glamorous casino \"GOLDEN BYTE\", wide 16:9, gold, magenta and deep violet. Golden slot machines, a round roulette table in the center with a polished steel ball in the wheel, velvet curtains, a mirror ball on the ceiling, and at the back a heavy doorway with a sign \"TRESOR\". "
        "No guests, no staff. Open floor space in front."),
    bg2(20, "tresor",
        "Casino vault room, wide 16:9, dim gold and cyan light. A heavy round vault door standing open on the left, stacks of golden coins, rows of safety deposit boxes, a steel desk with a stack of files and folders in the center, "
        "and a square air vent grate high on the right wall. Open floor space in front."),
    bg2(21, "klinik",
        "Implant clinic \"DR. SCHRAUB\", wide 16:9, cheerful but slightly creepy, pastel teal and pink light. An operating chair with robotic arms in the center, shelves with glowing implants in jars (hearts, eyes, tongues), a cabinet with instruments, cheerful posters about cyber hearts, "
        "a desk with a tray of tools. No doctor. Open floor space in front."),
    bg2(22, "park",
        "Artificial turf park in the middle of the corporate district, wide 16:9, too-perfect plastic green with neon accents. Plastic trees, a painted blue pond, benches, a small gardener's shed on the left, and in a hidden corner behind the shed a tiny patch with a small pot of dry soil (a secret herb garden). "
        "Paths leading to the right toward a museum and a clinic. No gardener. Open walkable ground in front."),
    bg2(23, "museum",
        "Museum of analog things, wide 16:9, warm dim light. Glass display cases with old objects (vinyl records, a telephone, a floppy disk, a tube TV), in the center a glass case with an old water tap on a little fountain (clearly the main exhibit) with \"BITTE NICHT BERÜHREN\" stripes on the floor, "
        "a smoke detector on the ceiling. No curator. Open floor space in front."),
    bg2(24, "revier",
        "Police station \"REVIER 404\" with a lost-and-found counter, wide 16:9, gray-blue light with neon accents. A long counter with a giant rubber stamp on it and stacks of paperwork, shelves with labeled boxes behind it, a glass showcase with a glittering platinum card inside, "
        "wanted posters on the wall. No officer. Open floor space in front."),
    bg2(25, "gondel",
        "Cable car station \"HIMMELFAHRT\" to the upper city, wide 16:9, bright gold and sky blue. A glass gondola cabin ready at the platform, a bouncer podium with a velvet rope and gold posts in front of it (no bouncer), "
        "a wide view of clouds and floating buildings above. Open floor space in front."),
]

# ---------- Akt 3: Ober-Heights & Orbit ----------
ACT3 = [
    bg2(26, "promenade",
        "Floating upper-city promenade in the clouds, wide 16:9, sunset gold and pink. Luxury shops, a champagne fountain, golden lamps, floating villas in the background, a villa gate on the right, a signpost with arrows to \"SPA\" and \"RAUMHAFEN\", "
        "and a cable car station on the far left. No people. Open walkable ground in front."),
    bg2(27, "villa",
        "Grand hall of Villa von Chrom, wide 16:9, marble, golden statues and warm light. A collection of \"originals\" on pedestals (an old vinyl record, a telephone, a paper book), a huge chandelier, an empty golf club stand, "
        "and a throne-like armchair on a carpet. No people. Open floor space in front."),
    bg2(28, "spa_golfdome",
        "Sky spa and golf dome in one wide 16:9 image: on the left a luxury spa with massage beds, steam and pools; on the right a glass golf dome with an artificial hill and a large wind turbine in the center (no golf ball visible). "
        "A control panel with a row of switches and one big red button next to the spa side. No people. Open floor space in front."),
    bg2(29, "raumhafen",
        "Spaceport terminal, wide 16:9, retro-futuristic design with bright colors. A ticket counter with a sign \"FLUG-HANS\" (no clerk), departure boards, a shuttle docked outside a huge window, a baggage belt, rockets painted in bright colors. "
        "Open floor space in front."),
    bg2(30, "hyperhub",
        "Docking ring \"HYPER-HUB\" of an orbital station, wide 16:9, a view of Earth through big windows. A sealed door to the moon shuttle with strike signs (no readable long text, only \"STREIK\") leaning against it, benches, a souvenir shop, "
        "arrows on the floor to a garden and a bridge. No people. Open floor space in front."),
    bg2(31, "orbitalgarten",
        "Zero-gravity garden on a space station, wide 16:9, a dome window with stars. Floating plants and leaves, a coffee plant with floating beans drifting around it, tangled vines, floating water droplets. "
        "No people. Open floor space in front."),
    bg2(32, "bruecke",
        "Command bridge of an orbital station, wide 16:9, blue and amber light. A captain's chair in the center, a big star map, blinking panels, a half-empty steaming coffee mug on the armrest, "
        "and at the entrance on the left a door panel with a badge scanner. No people. Open floor space in front."),
    bg2(33, "mond_eingang",
        "Moon surface with an airlock entrance into a mine, wide 16:9. Lunar dust, a small flag, machinery, stars and Earth in the black sky, a keypad next to the airlock door. No people. Open ground in front."),
    bg2(34, "mond_tiefe",
        "Deep moon mine, wide 16:9, dark with glowing crystals. Tunnel walls, rails, a minecart hanging on a crane hook above a wide chasm in the middle, a steel door with a glowing panel on the far side. No people. Walkable ledge in front."),
    bg2(35, "serverkern",
        "Kleo's server core on the moon, wide 16:9, blue glow. Endless server racks with glowing lights, a huge round firewall door at the back, pools of neon noodles on the floor, cables like tentacles. "
        "No creatures, no people. Open floor space in front."),
    bg2(36, "kinderzimmer",
        "A virtual child's bedroom as a dreamy digital space, wide 16:9, pastel colors with a hint of neon and glitchy edges. Toy shelves, floating building blocks, crayon drawings of soup bowls on the wall, a small empty chair, a little bed. "
        "No people, no teddy. Open floor space in front."),
]

# ---------- Sheets Akt 2 und 3 ----------
def figs(lst, offset=0):
    return "\n".join(f"{i + 1 + offset}. {n}: {d}." for i, (n, d) in enumerate(lst))

npc2 = [
    ("Frau Ablage", "stern receptionist robot with a filing-cabinet body, glasses on a chain, a sour expression"),
    ("Chef Kloß", "desperate chubby cook robot with a dumpling-shaped head, a ladle in his hand"),
    ("Grünhorn", "gardener robot built from garden tools and a watering can, a leaf on his head"),
    ("Prof. Staub", "curator robot in a dusty tailcoat with a magnifying-glass eye"),
    ("Schnipp", "barber robot with scissor hands, wild electrified hair, a striped coat"),
    ("Madame Jackpot", "elegant woman with a roulette-wheel hat, a gold gown and a cold smile"),
    ("Mortimer", "tall casino doorman robot in a velvet suit, red rope in his hand"),
    ("Dr. Schraub", "nervous thin doctor with big round glasses, a white coat and trembling hands"),
    ("Stempel-Stefan", "stout official with an oversized rubber stamp and ink-stained fingers"),
    ("Kiosk-Zeus", "newspaper vendor robot with a roll-up screen body and a hat full of headlines"),
    ("Flimmer", "sleepy hologram technician, headphones around the neck, eyes closed"),
    ("Mr. Tackert", "a tiny hamster in a running wheel wearing a tiny tie"),
]
npc3 = [
    ("Türsteher Klaus", "bulky bouncer robot in a velvet jacket with an earpiece"),
    ("Sebastian.exe", "tall perfectionist butler robot with a monocle lens and white gloves"),
    ("Baron von Chrom", "pompous chrome-plated man with a huge moustache, a cane and a fur collar"),
    ("Masseur Zen-3", "calm multi-armed massage robot in a bathrobe"),
    ("Flug-Hans", "cheerful ticket clerk robot with a pilot cap"),
    ("Käpt'n Kabel", "tired captain with cable-like hair and dark circles, holding an empty mug"),
    ("Schicht", "union leader mining robot with a hard hat, a megaphone and a protest vest"),
    ("Streikposten", "generic mining robot holding a strike sign"),
    ("Ramen-Kraken", "giant noodle octopus with sad eyes, standing in a puddle of broth"),
    ("Kleo", "exactly as in the last attached image: the 12-year-old hologram girl with pigtails, big headphones and the dark NC hoodie, slightly transparent with glowing cyan and pink edges"),
    ("Teddy-Bot", "exactly as in the last attached image: the worn, patched plush teddy bear with button eyes and an empty open mouth socket"),
    ("Teddy-Bot mit Sensor", "the same teddy bear with a small chrome tongue-sensor plugged into his mouth"),
]

def npc_sheet(title, path, refs, lst):
    return dict(title=title, path=path, fmt=FORMAT_SHEET, refs=refs,
        prompt=(FIGURE_HEAD.format(cols=6, rows=4, n=24) + " All figures stand in a three-quarter view facing left (toward the player character), full body.\n\n"
                "Rows 1 and 2 (cells 1 to 12): the characters standing idle, in this order:\n" + figs(lst) +
                "\n\nRows 3 and 4 (cells 13 to 24): the same 12 characters in the same order, now talking or acting (mouth open, one arm gesturing).\n\n" + STIL))

pix_poses = ("Poses in order: 1 idle front, 2 idle side facing right, 3 idle back, 4 talking (mouth open, gesturing), 5 talking (different mouth shape and hand), 6 shrugging, "
             "7 to 13 walk cycle in side view facing right, seven consecutive frames of one walking loop, 14 walking toward the camera, 15 walking away from the camera, "
             "16 reaching up high, 17 using an object with the arm stretched forward, 18 handing over an object, 19 standing neutral front, 20 surprised, 21 bending down to pick something up, 22 cheering, 23 exhausted and slouching, 24 sitting cross-legged.")

def pixel_outfit(title, path, outfit, refs="ref_01_pixel_turnaround.png, sheet_pixel.png"):
    return dict(title=title, path=path, fmt=FORMAT_SHEET, refs=refs,
        prompt=(FIGURE_HEAD.format(cols=8, rows=3, n=24) +
                f"\n\nThe same character PIXEL as in the attached references (teal messy short hair, yellow goggles pushed up on the forehead, face and proportions exactly like the reference) but wearing {outfit}. "
                "Full body, side views facing right unless noted. " + pix_poses + "\n\n" + STIL))

items2 = ["newspaper \"TAGESKRÜMEL\" folded", "cafeteria serving tray", "empty glass bottle", "bottle filled with water", "a bunch of herbs with purple-blue leaves (no green)",
          "a few white and yellow chamomile flowers", "white lab coat with a name tag", "a form sheet \"404-B\"", "a holographic coat-of-arms seal sticker", "platinum access card",
          "a small scalpel", "a small chrome tongue-shaped taste sensor with a cable", "a golden casino chip", "a folder \"KLEO\" with a child's drawing on the cover", "a cog wheel",
          "a tangled knot of cables", "a gummy bear", "a coffee cup", "a light bulb", "a paper clip"]
items3 = ["a golden golf ball", "an antique chrome space suit (complete, helmet next to it)", "a shuttle ticket", "a few coffee beans", "a few roasted dark coffee beans",
          "a permit paper with a signature and a stamp", "a miner's helmet with a lamp", "a small note with a code", "the golden glowing taste crystal with a tiny noodle bowl engraved inside"]

props2 = ["cafeteria back door, closed, with a keypad", "the same door, open", "a wall keypad with lit buttons", "an old water tap on a small fountain in a glass case", "a smoke detector on a ceiling plate",
          "a small flower pot with dry soil", "the same pot with purple-blue herbs and white chamomile growing", "an elevator door, closed", "the same elevator door, open", "a jammed office printer",
          "a hologram printer, switched off", "the same hologram printer switched on printing a glowing coat of arms", "a glass showcase with a platinum card inside, closed", "the same showcase opened, empty",
          "a casino roulette table with a steel ball", "a round vault door, closed", "a wall air vent grate, closed", "the same air vent grate hanging open"]
props3 = ["a wind turbine, running", "the same wind turbine stopped", "a control panel with switches and a big red button", "a coffee plant with floating beans", "a floating cloud of coffee beans",
          "a bridge door panel with a badge scanner", "an airlock door, closed", "the same airlock door, open", "a minecart hanging from a crane hook", "a moon rail cart on the rail",
          "a huge firewall door, closed, glowing red", "the same firewall door, open", "a keypad on a pole", "a golf club stand", "a champagne fountain", "a shuttle boarding gate, closed",
          "the same boarding gate, open", "a teddy bear chair"]

def sheet_items(title, path, lst, cols, rows):
    return dict(title=title, path=path, fmt=FORMAT_SHEET, refs="ref_03_stil_nudelgasse.png, sheet_items_akt1.png",
        prompt=(SHEET_HEAD.format(cols=cols, rows=rows, n=cols * rows) + " Inventory-icon style, slightly exaggerated, seen from the front or slightly from above. Items in order: " +
                ", ".join(f"{i + 1} {x}" for i, x in enumerate(lst)) + ".\n\n" + STIL))

def sheet_props(title, path, lst, refs):
    return dict(title=title, path=path, fmt=FORMAT_SHEET, refs=refs,
        prompt=(SHEET_HEAD.format(cols=6, rows=3, n=18) + " Draw every object at its natural size relative to a 1.7 m tall person; the objects will be scaled later. Objects in order: " +
                ", ".join(f"{i + 1} {x}" for i, x in enumerate(lst)) + ".\n\n" + STIL))

SHEETS = [
    pixel_outfit("Pixel im Gala-Look (24 Posen)", "assets/raw/sheet_pixel_gala.png",
                 "an absurdly fancy gala outfit: a glittering teal tuxedo jacket over her dark cargo pants, a bow tie, hair styled into a dramatic quiff (goggles removed)"),
    pixel_outfit("Pixel im Raumanzug (24 Posen)", "assets/raw/sheet_pixel_raumanzug.png",
                 "an antique retro space suit in dented chrome with rivets and a round glass helmet (face visible)"),
    npc_sheet("NPC-Sheet Akt 2 (12 Figuren, je ruhig und sprechend)", "assets/raw/sheet_npc_akt2.png",
              "ref_01_pixel_turnaround.png, sheet_npc_akt1.png", npc2),
    npc_sheet("NPC-Sheet Akt 3 (12 Figuren, je ruhig und sprechend)", "assets/raw/sheet_npc_akt3.png",
              "sheet_npc_akt1.png, ende_03.png, ende_01.png (zuletzt anhängen: Kleo und Teddy-Bot)", npc3),
    sheet_items("Item-Sheet Akt 2 (20 Gegenstände)", "assets/raw/sheet_items_akt2.png", items2, 5, 4),
    sheet_items("Item-Sheet Akt 3 (9 Gegenstände)", "assets/raw/sheet_items_akt3.png", items3, 3, 3),
    sheet_props("Props Akt 2 (18 Szenen-Objekte)", "assets/raw/sheet_props_akt2.png", props2, "sheet_props_akt1.png, bg_13_plaza.png"),
    sheet_props("Props Akt 3 (18 Szenen-Objekte)", "assets/raw/sheet_props_akt3.png", props3, "sheet_props_akt1.png, bg_26_promenade.png"),
]

MAPS = [
    dict(title="Karte Mittel-Heights", path="assets/raw/map_mittelstadt.png", fmt=FORMAT_BG, refs="map_unterstadt.png, ref_03_stil_nudelgasse.png",
         prompt=("Illustrated top-down map of a corporate city district, 16:9, the same parchment-meets-neon style, border and compass as the attached map, NO text labels. "
                 "Thirteen clearly separated, recognizable small illustrated places connected by streets, spread evenly with empty space between them: a large central plaza (center), "
                 "a corporate tower lobby, a cafeteria building, an office floor block, a hologram ad factory, a barber shop with a striped pole, a casino with a golden entrance and a vault drawn beneath it, "
                 "a clinic with a cross, an artificial park with a pond, a museum with columns, a police station, and a cable car station at the top right with cables leading up off the map.\n\n" + STIL)),
    dict(title="Karte Ober-Heights und Orbit", path="assets/raw/map_oberstadt_orbit.png", fmt=FORMAT_BG, refs="map_unterstadt.png, ref_03_stil_nudelgasse.png",
         prompt=("Illustrated map of a floating upper city and orbit, 16:9, the same parchment-meets-neon style as the attached map but with clouds and stars around, NO text labels. "
                 "Eleven clearly separated small illustrated places with empty space between them: a floating promenade in the clouds, a grand villa, a spa with a glass golf dome, a spaceport with a rocket, "
                 "an orbital space station ring with a garden dome and a command bridge, and the moon at the top right with a mine entrance, a deep mine with crystals, a server core and a dreamy child's room bubble. "
                 "Dotted lines connect the places.\n\n" + STIL)),
]

INTRO_NOTE = """\
# Bild-Prompts: alles, was noch fehlt

Stand: fertig sind `ref_01` bis `ref_03`, `bg_01` bis `bg_12`, die Sheets für Pixel, Krümel, NPC Akt 1, Items Akt 1, Props Akt 1 und UI, die Karte Unter-Heights, `titel`, `intro_02`, `intro_07` und `ende_01` bis `ende_03`.

**Noch fehlend (dieses Dokument):**
- Rest von Akt 1: Intro-Bilder 01, 03, 04, 05, 06
- Akt 2: 13 Hintergründe, Karte, Sheets (Pixel Gala, NPCs, Items, Props)
- Akt 3: 11 Hintergründe, Karte, Sheets (Pixel Raumanzug, NPCs, Items, Props)

**So gehst du vor**
- Kopiere jeden Block unverändert, hänge die genannten Referenzbilder an (16:9, höchste Auflösung, neuer Chat pro Bild), speichere unter dem genannten Pfad (nur den Namen ohne `.png` eintippen, falls dein System die Endung ergänzt).
- Bei Sheets nutzt die KI das Raster oft nicht genau. Das ist okay, ich erkenne die Figuren automatisch.
- **Reihenfolge:** Erst die Intro-Bilder (klein, schnell), dann Akt 2 Hintergründe, danach Sheets. Die Props-Sheets erst nachdem ich die Hintergründe derselben Akt gesehen habe.
- Wichtig für die Schilder: kurze deutsche Wörter in Großbuchstaben gelingen meist. Falls ein Schild falsch geschrieben ist, korrigiere im selben Chat („Change the sign to read …").

---

"""

def write_missing():
    allp = MISSING + ACT2 + MAPS[:1] + SHEETS[:1] + SHEETS[2:3] + SHEETS[4:5] + SHEETS[6:7] + ACT3 + MAPS[1:] + SHEETS[1:2] + SHEETS[3:4] + SHEETS[5:6] + SHEETS[7:8]
    out = [INTRO_NOTE]
    for i, a in enumerate(allp, start=1):
        out.append(f"## {i}. {a['title']}\n")
        out.append(f"- **Speichern als:** `{a['path']}`")
        out.append(f"- **Format:** {a['fmt']}")
        out.append(f"- **Referenzbilder anhängen:** {a['refs']}\n")
        out.append("```\n" + a["prompt"] + "\n```\n")
    path = ROOT / "docs" / "prompts-fehlend.md"
    path.write_text("\n".join(out), encoding="utf-8")
    print(f"{len(allp)} fehlende Prompts nach {path.relative_to(ROOT)} geschrieben.")


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
    write_missing()


if __name__ == "__main__":
    main()
