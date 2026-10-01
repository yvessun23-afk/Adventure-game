#!/usr/bin/env python3
"""Erzeugt docs/prompts-zustaende.md (Nano-Banana-2-Prompts für Hintergrund-Zustände: offen/zu, weggenommen …)
und trägt die dazugehörigen bgStates in die Szenen ein (einmalig, mit --apply).

  python3 tools/build_state_prompts.py [--apply]
"""
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import build_prompts as bp  # noqa: E402

ROOT = bp.ROOT

# (Szene, Basisbild, Zustandsname, Bedingung, was sich ändert)
STATES = [
    ("bar", "bg_04_bar", "tuer_offen", "S.flags.hinterzimmer_offen",
     "The door on the right with the sign PERSONAL is now wide open. Behind it a dark back room is visible with a faint glow of server lights. The sign stays."),
    ("bar_hinterzimmer", "bg_05_bar_hinterzimmer", "terminal_an", "S.flags.terminal_log",
     "The old computer on the desk is now switched on: its monitor glows with several lines of green scrolling text and casts a soft green light on the desk."),
    ("plaza", "bg_13_plaza", "sauber", "true",
     "Remove the loose newspaper that lies on top of the newspaper stand and the newspapers on the bench. The stand and the bench stay, the stand's top is just empty."),
    ("plaza", "bg_13_plaza", "kantine_offen", "S.flags.kantine_offen",
     "The door under the KANTINE sign is now open, showing a dim hallway behind it. Also remove the loose newspaper on top of the newspaper stand and on the bench (the stand and the bench stay)."),
    ("lobby", "bg_14_lobby", "aufzug_offen", "S.flags.lobby_frei",
     "The doors of the right elevator are open: the empty cabin inside is brightly lit, the indicator above the door lights up green."),
    ("werbefabrik", "bg_17_werbefabrik", "drucker_an", "S.flags.gab_holo_siegel",
     "The big HOLOGRAM-DRUCKER is running: a glowing violet hologram of a crowned coat of arms with two lions hovers above it, small sparks, a violet glow on the nearby floor."),
    ("casino", "bg_19_casino", "tresor_offen", "S.flags.jackpot_alarm",
     "The golden double doors labeled TRESOR are wide open, showing a dark vault corridor with a warm glow. Red alarm lights flash on the walls and give the whole room a slight red tint."),
    ("tresor", "bg_20_tresor", "sauber", "true",
     "Remove the folder with the child's drawing on its cover from the desk (it lies on the pile of files at the front). Leave all other files, the lamp and the mug exactly as they are."),
    ("museum", "bg_23_museum", "alarm", "S.flags.kurator_weg",
     "The smoke detector on the ceiling above the pedestal glows red with small alarm zigzag lines around it, a few thin wisps of grey smoke drift below it, and a faint red tint lies over the room."),
    ("revier", "bg_24_revier", "pass_weg", "S.flags.gab_platin_pass",
     "The glass display case on the right is now open (lid raised) and empty: only the empty purple cushion remains, the platinum card is gone."),
    ("gondel", "bg_25_gondel", "frei", "S.flags.gondel_frei",
     "The velvet rope barrier on the left is unhooked and hangs down loosely, the door of the gondola is open and a warm welcoming glow comes out of it."),
    ("spa", "bg_28_spa_golfdome", "turbine_aus", "S.flags.turbine_aus",
     "The wind turbine above the golf dome has stopped completely: the blades stand still, no motion blur, no spinning effect."),
    ("spa", "bg_28_spa_golfdome", "turbine_aus_ohne_ball", "S.flags.turbine_aus && S.flags.gab_goldener_golfball",
     "The wind turbine above the golf dome has stopped completely: the blades stand still, no motion blur. Also remove any golden golf ball from the turbine or the hill; nothing golden and round remains."),
    ("hyperhub", "bg_30_hyperhub", "streik_vorbei", "S.flags.streik_vorbei",
     "The strike is over: remove the STREIK sign and the paper notice board next to the big round door. Instead lean a small cheerful sign reading PAUSE against the wall. Everything else stays."),
    ("orbitalgarten", "bg_31_orbitalgarten", "ohne_bohnen", "S.flags.gab_kaffeebohnen",
     "The coffee plants have been picked: only a few coffee cherries remain on the vines, the floating beans in the air are gone. Everything else stays."),
    ("mond_eingang", "bg_33_mond_eingang", "schleuse_offen", "S.flags.schleuse_offen",
     "The round vault door of the MINE ACCESS is open, swung outward, showing a lit tunnel corridor behind it. The red warning lights on the door frame are green now."),
    ("mond_tiefe", "bg_34_mond_tiefe", "ueber", "S.flags.schlucht_ueber",
     "The mine cart no longer hangs over the chasm: it now stands on the rails at the far ledge, the crane hook above the chasm is empty and swings loosely."),
    ("serverkern", "bg_35_serverkern", "firewall_offen", "S.flags.firewall_offen",
     "The big round vault door in the center of the corridor is open, a bright cyan-white light shines out of it, the red glow on the door and the floor is gone."),
    ("kantine", "bg_15_kantine", "sauber", "true",
     "Remove the empty glass bottle that sticks out of or lies on the green trash bin. The bin itself stays, with its lid open."),
    ("nudelgasse", "bg_02_nudelgasse", "sauber", "true",
     "Remove the glowing neon tube or any glowing tube pieces that stick out of the green dumpster. The dumpster stays full of ordinary junk and scrap."),
]

TAIL = ("Keep the composition, the camera angle, the perspective, the colors, the lighting, the painting style and every other object exactly identical and pixel-aligned to the attached image, "
        "as if it were the same painting with one detail changed. No characters, no people, no animals, no robots. No watermark, no UI, no frame, no border.")

bp.ROLES["BASE"] = ""

INTRO = """# Zustands-Hintergründe: Prompts für Nano Banana 2

Wenn im Spiel etwas geöffnet, eingeschaltet oder weggenommen wird, zeigt der Hintergrund bisher noch den alten Zustand. Für jeden dieser Fälle gibt es hier ein **Variantenbild**: derselbe Hintergrund, nur mit der einen Änderung. Das Spiel wechselt automatisch auf die Variante, sobald der Zustand eintritt (Engine und Szenen sind dafür schon vorbereitet; fehlt eine Datei, bleibt alles wie bisher).

**Zwei Arten**
- **Zustand** (Tür offen, Terminal an, Turbine aus …): das Bild wird gezeigt, sobald der Zustand eintritt.
- **sauber**: Gegenstände, die man im Spiel einsammelt (Flasche, Akte, Neonröhre, Zeitung), sind im Originalhintergrund schon eingemalt und würden nach dem Aufheben weiter sichtbar bleiben. Das Variantenbild ohne den Gegenstand wird **immer** als Hintergrund benutzt, der Gegenstand liegt im Spiel als eigenes Bild obendrauf und verschwindet beim Aufheben.

**Ablauf**
1. Neuer Chat pro Bild. Das Originalbild (`assets/raw/bg_…png`) als **Image 1** anhängen, danach `ref_03_stil_nudelgasse.png`. Es ist ein Bearbeiten-Auftrag: Nano Banana soll das Bild fast unverändert wiedergeben.
2. Format 16:9, höchste Auflösung. Wichtig: gleicher Bildausschnitt und Seitenverhältnis wie das Original, sonst passen Figuren und Hotspots nicht mehr.
3. Speichern unter dem angegebenen Pfad (Variantenname hinten angehängt).
4. Sag mir Bescheid, ich erzeuge die Qualitätsstufen und schalte sie frei. Mit `python3 tools/make_tiers.py` und `python3 tools/make_index.py` geht das auch von Hand.
5. Wenn die KI etwas daneben ändert (zusätzliche Figuren, verschobene Objekte), im selben Chat korrigieren: „Change nothing except …“.

**Reihenfolge-Empfehlung:** zuerst die „sauber“-Bilder (immer sichtbar), dann die Zustandsbilder in Spielreihenfolge.

---
"""

def build():
    out = [INTRO]
    for i, (scene, base, name, cond, change) in enumerate(STATES, start=1):
        refs = f"{base}.png, ref_03_stil_nudelgasse.png"
        files = [f.strip() for f in refs.split(",")]
        lines = [f"Image 1 ({files[0]}): this is the ORIGINAL background that you must edit. Reproduce it exactly, with only the change described below.",
                 f"Image 2 ({files[1]}): use it for the overall art style, color palette, line weight and level of detail (the same style as image 1)."]
        prompt = ("ATTACHED REFERENCE IMAGES (attach them in exactly this order):\n" + "\n".join(lines) +
                  "\nFollow the references closely. Now edit the first image.\n\n"
                  f"Edit the attached background illustration (Image 1) and change ONLY the following: {change}\n\n{TAIL}\n\n{bp.STIL}")
        kind = "sauber (immer als Hintergrund)" if cond == "true" else f"Zustand: `{cond}`"
        out.append(f"## {i}. {scene}: {name.replace('_', ' ')}\n")
        out.append(f"- **Speichern als:** `assets/raw/{base}_{name}.png`")
        out.append("- **Format:** 16:9, highest resolution (2K or 4K), same framing as the original")
        out.append("- **Referenzbilder (in dieser Reihenfolge anhängen):** " + ", ".join(f"`{f}`" for f in files))
        out.append(f"- **Wann im Spiel:** {kind}\n")
        out.append("```\n" + prompt + "\n```\n")
    (ROOT / "docs" / "prompts-zustaende.md").write_text("\n".join(out), encoding="utf-8")
    print(len(STATES), "Prompts nach docs/prompts-zustaende.md geschrieben")

def apply():
    by_base = {}
    for scene, base, name, cond, _ in STATES:
        by_base.setdefault(base, []).append((name, cond))
    for f in sorted((ROOT / "data").glob("scenes*.js")):
        s = f.read_text(encoding="utf-8")
        for base, lst in by_base.items():
            m = re.search(r"(    bg: \{ tiers: '" + base + r"' \}, music: '[a-z_]+',\n)", s)
            if not m or "bgStates" in s[m.end():m.end() + 40]:
                continue
            entries = ",\n".join(f"      {{ if: S => {cond}, tiers: '{base}_{name}' }}" for name, cond in lst)
            s = s[:m.end()] + "    bgStates: [\n" + entries + "\n    ],\n" + s[m.end():]
        f.write_text(s, encoding="utf-8")
    print("bgStates eingetragen")

if __name__ == "__main__":
    build()
    if "--apply" in sys.argv:
        apply()
