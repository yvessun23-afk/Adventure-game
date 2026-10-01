#!/usr/bin/env python3
"""Erzeugt docs/prompts-laufanimation.md: neue, flüssige Laufzyklen für Pixel (Standard, Gala, Raumanzug).
  python3 tools/build_walk_prompts.py
"""
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
import build_prompts as bp  # noqa: E402

ROOT = bp.ROOT
SIDE = [
 ("CONTACT, right foot forward", "the right foot heel touches the ground far in front, the left leg stretched back with the toe on the ground, both legs at the widest stride, the body at its lowest point, arms swing opposite to the legs (left arm forward, right arm back)"),
 ("DOWN", "the right foot flat on the ground, the body sinks slightly, the left leg lifts off and begins to swing forward, knees slightly bent"),
 ("PASSING, right leg planted", "the body at its highest point, the right leg straight and vertical under the body, the left leg bent with the knee up and the foot passing close to the right ankle, arms both near the body"),
 ("UP, left leg reaching", "the left leg swings forward and extends, the right heel lifts off the ground, the body leans slightly forward"),
 ("CONTACT, left foot forward", "the left foot heel touches the ground far in front, the right leg stretched back with the toe on the ground, the widest stride, the body at its lowest point, the arms swapped (right arm forward, left arm back)"),
 ("DOWN", "the left foot flat on the ground, the body sinks slightly, the right leg lifts off and begins to swing forward"),
 ("PASSING, left leg planted", "the body at its highest point, the left leg straight and vertical, the right leg bent with the knee up and the foot passing the left ankle"),
 ("UP, right leg reaching", "the right leg swings forward and extends, the left heel lifts off the ground, the body leans slightly forward; the next frame is frame 1 again, so the loop must be seamless"),
]
FRONT = ["left foot forward, body leaning slightly to the right, right arm swinging forward", "feet together passing, body upright and highest, arms near the body",
         "right foot forward, body leaning slightly to the left, left arm swinging forward", "feet together passing, body upright and highest, arms near the body (slightly different arm position than frame 2)"]
BACK = ["left foot forward, the right shoulder dips, seen from behind", "feet together passing, body upright and highest, seen from behind",
        "right foot forward, the left shoulder dips, seen from behind", "feet together passing, body upright and highest, seen from behind (slightly different arm position than frame 2)"]
OUTFITS = [
 ("Standard", "walk", "assets/raw/walk_pixel.png", "ref_01_pixel_turnaround.png, sheet_pixel.png", "her normal orange jacket, dark green cargo trousers and teal-pink boots (exactly as in the references)"),
 ("Gala-Look", "walk_gala", "assets/raw/walk_pixel_gala.png", "ref_01_pixel_turnaround.png, sheet_pixel_gala.png", "the gala outfit exactly as in the attached gala sheet"),
 ("Raumanzug", "walk_suit", "assets/raw/walk_pixel_raumanzug.png", "ref_01_pixel_turnaround.png, sheet_pixel_raumanzug.png", "the space-suit outfit exactly as in the attached space-suit sheet"),
]
bp.ROLES["sheet_pixel_gala.png"] = "the gala outfit and Pixel's proportions in this outfit (copy exactly)"
bp.ROLES["sheet_pixel_raumanzug.png"] = "the space-suit outfit and Pixel's proportions in this outfit (copy exactly)"
bp.ROLES["sheet_pixel.png"] = "Pixel's proportions and poses (match the style, scale and line weight)"

out = ["""# Pixel: neue Laufzyklen

**Problem:** Die bisherige Laufanimation wirkt wie zwei Endposen, weil die sieben Bilder fast gleich aussehen (Beine stehen kaum verschieden, kein Körper-Auf-und-Ab). Die Engine ist jetzt schon verbessert: Die Bilder wechseln nach zurückgelegter Strecke (die Füße rutschen nicht mehr), und beim Gehen gibt es ein deutliches Hüpfen, leichtes Kippen nach vorn und Federn beim Aufsetzen. Mit den neuen Bildern wird es richtig flüssig.

**Was die Prompts verlangen:** einen echten 8-Bilder-Gehzyklus nach dem klassischen Schema (Kontakt, Runter, Passieren, Hoch, dann wieder mit dem anderen Bein), dazu 4 Bilder von vorn und 4 von hinten. Die Unterschiede zwischen den Bildern sind groß und gut erkennbar: weiter Schritt, Knie gebeugt, Arme im Gegentakt, Körper abwechselnd tief und hoch.

**Raster:** 4 Spalten, 4 Reihen, 16 Zellen: Reihe 1 = Seite 1 bis 4, Reihe 2 = Seite 5 bis 8, Reihe 3 = von vorn 1 bis 4, Reihe 4 = von hinten 1 bis 4.

**Ablauf:** Neuer Chat pro Bild, Referenzen in der Reihenfolge anhängen, 16:9, höchste Auflösung. Speichern wie angegeben. Dann sag Bescheid, ich schneide aus und baue es ein. Mit dem Standard-Outfit beginnen.

---
"""]
for i, (title, key, path, refs, outfit) in enumerate(OUTFITS, start=1):
    side = "\n".join(f"{n + 1}. SIDE walk frame {n + 1} of 8, {t}: {d}." for n, (t, d) in enumerate(SIDE))
    front = "\n".join(f"{9 + n}. FRONT walk frame {n + 1} of 4: {d}." for n, d in enumerate(FRONT))
    back = "\n".join(f"{13 + n}. BACK walk frame {n + 1} of 4: {d}." for n, d in enumerate(BACK))
    prompt = (bp.FIGURE_HEAD.format(cols=4, rows=4, n=16) +
              f"\n\nThe character is PIXEL exactly as in the attached references (teal messy short hair, yellow goggles pushed up on the forehead, face, proportions and line weight identical), wearing {outfit}. "
              "Every cell holds Pixel in a WALKING pose; the sheet is one walk-cycle animation. All 16 figures have exactly the same size, the same design and the same body proportions; only the pose changes. "
              "Feet of all figures in the same row are on one common baseline (the body bobs up and down by raising and lowering the figure only through the pose, not by moving the baseline). "
              "Rows 1 and 2: Pixel in side view facing RIGHT, a classic 8-frame walk cycle with very clear, large differences between frames (wide stride, bent knees, opposite arm swing). Rows 3 and 4: front view and back view.\n\n"
              "CELLS:\nRow 1 and 2 (side view, facing right):\n" + side + "\nRow 3 (front view):\n" + front + "\nRow 4 (back view):\n" + back +
              "\n\nDo not add motion lines, speed lines, dust, shadows, text, numbers or labels. Do not change the clothes, hair or face between frames. Do not make the frames similar to each other: the stride must be clearly different in every frame. " + bp.STIL)
    a = dict(title=f"Pixel Laufzyklus {title}", path=path, fmt=bp.FORMAT_SHEET, refs=refs, prompt=prompt)
    _, files, full = bp.with_refs(a)
    out.append(f"## {i}. {a['title']} (16 Bilder)\n")
    out.append(f"- **Speichern als:** `{path}`")
    out.append(f"- **Format:** {bp.FORMAT_SHEET}")
    out.append("- **Referenzbilder (in dieser Reihenfolge anhängen):** " + ", ".join(f"`{f}`" for f in files) + "\n")
    out.append("```\n" + full + "\n```\n")
(ROOT / "docs" / "prompts-laufanimation.md").write_text("\n".join(out), encoding="utf-8")
print("ok")
