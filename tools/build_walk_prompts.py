#!/usr/bin/env python3
"""Erzeugt docs/prompts-laufanimation.md: Laufzyklus mit exakter Winkeltabelle (8 Bilder Seite, 4+4 vorn/hinten) für 3 Outfits.
Verhindert doppelte Bilder in der zweiten Hälfte: Bild 5-8 haben ausdrücklich das ANDERE Bein vorn.
  python3 tools/build_walk_prompts.py
"""
import sys
from pathlib import Path
from PIL import Image
sys.path.insert(0, str(Path(__file__).resolve().parent))
import build_prompts as bp  # noqa: E402

ROOT = bp.ROOT
CH = ROOT / "assets" / "sprites" / "characters"
REF = ROOT / "assets" / "raw" / "refs_walk"

OUTFITS = [("Standard", "pixel_", "ref_walk_standard.png", "walk8_standard", "her normal outfit: orange puffy jacket with a reflective grey stripe, dark green cargo trousers with side pockets, teal boots with pink soles, a small olive satchel on a strap, teal messy short hair, yellow goggles on the forehead"),
           ("Gala-Look", "pixel_gala_", "ref_walk_gala.png", "walk8_gala", "the gala outfit exactly as in the reference image: sparkling teal tailcoat jacket with dark lapels and a teal bow tie over a white shirt, dark green cargo trousers, dark boots with pink soles, styled teal hair, no goggles"),
           ("Raumanzug", "pixel_suit_", "ref_walk_raumanzug.png", "walk8_raumanzug", "the space-suit outfit exactly as in the reference image: silver-grey space suit with pink hoses and a chest control panel, a backpack with pink hoses, silver boots and gloves, and a clear glass bubble helmet around the head with the goggles visible inside")]


def make_ref(prefix, name):
    """Referenzbilder: vorn, Seite, hinten (rechts schauend) und Variante mit nach links schauender Seitenansicht."""
    REF.mkdir(parents=True, exist_ok=True)
    ims = []
    for p in ("idle_front", "idle_side", "idle_back"):
        f = CH / f"{prefix}{p}.png"
        if not f.exists():
            f = CH / f"pixel_{p}.png"
        im = Image.open(f).convert("RGBA")
        bb = im.getchannel("A").point(lambda v: 255 if v > 40 else 0).getbbox()
        ims.append(im.crop(bb))
    H = 420
    ims = [i.resize((round(i.width * H / i.height), H), Image.LANCZOS) for i in ims]

    def sheet(lst, out_name):
        out = Image.new("RGB", (sum(i.width for i in lst) + 400, H + 80), (208, 208, 208))
        x = 100
        for i in lst:
            out.paste(i, (x, 40), i); x += i.width + 100
        out.save(REF / out_name)
    sheet(ims, name)
    sheet([ims[0], ims[1].transpose(Image.FLIP_LEFT_RIGHT), ims[2]], name.replace(".png", "_links.png"))


import json
from PIL import ImageDraw, ImageFont
import math

# ---------- Posentabelle (Seitenansicht). NEAR = der Kamera nähere Seite, FAR = abgewandte Seite. "vorn" = Blickrichtung. ----------
# (Titel, Oberschenkelwinkel NEAR, Knie NEAR, Oberschenkel FAR, Knie FAR, Arm NEAR, Arm FAR, Körperhöhe %, Text)
POSES = [
 ("CONTACT, NEAR leg forward", 34, 4, -34, 12, -30, 30, 97,
  "the NEAR leg is stretched far forward (+34 degrees) with the heel on the ground and the toes pointing up; the FAR leg is stretched far backward (-34 degrees) with only the toe tip touching the ground and the heel lifted high; the legs form a wide, clear inverted V; the FAR arm swings forward, the NEAR arm swings back"),
 ("RECOIL, NEAR foot flat", 18, 16, -18, 48, -14, 14, 95,
  "the NEAR foot is flat on the ground under the front of the body (+18 degrees, knee slightly bent); the FAR leg is lifted off the ground behind (-18 degrees) with the knee bent 48 degrees and the foot raised; the body is at its lowest point; both arms move toward the body"),
 ("PASSING, NEAR leg planted", 0, 0, 14, 82, -4, 4, 102,
  "the NEAR leg is perfectly vertical and straight and carries all the weight; the FAR leg is bent 82 degrees at the knee with the thigh raised forward (+14 degrees) so that the FAR foot passes right next to the NEAR ankle; the body is at its highest point; the arms hang almost together at the body"),
 ("REACH, FAR leg swings forward", -14, 6, 30, 30, 14, -14, 100,
  "the NEAR leg trails behind (-14 degrees) with the heel lifting and the toes pushing off; the FAR leg swings forward (+30 degrees) with the knee bent about 30 degrees and the foot reaching ahead; the NEAR arm starts swinging forward, the FAR arm back"),
 ("CONTACT, FAR leg forward (SWAPPED)", -34, 12, 34, 4, 30, -30, 97,
  "the FAR leg is stretched far forward (+34 degrees) with the heel on the ground and the toes pointing up; the NEAR leg is stretched far backward (-34 degrees) with only the toe tip touching the ground and the heel lifted high; wide, clear inverted V; the NEAR arm swings forward, the FAR arm swings back"),
 ("RECOIL, FAR foot flat (SWAPPED)", -18, 48, 18, 16, 14, -14, 95,
  "the FAR foot is flat on the ground under the front of the body (+18 degrees, knee slightly bent); the NEAR leg is lifted off the ground behind (-18 degrees) with the knee bent 48 degrees and the foot raised; body at its lowest point; both arms move toward the body"),
 ("PASSING, FAR leg planted (SWAPPED)", 14, 82, 0, 0, 4, -4, 102,
  "the FAR leg is perfectly vertical and straight and carries all the weight; the NEAR leg is bent 82 degrees at the knee with the thigh raised forward (+14 degrees) so that the NEAR foot passes right next to the FAR ankle; body at its highest point; arms hang almost together"),
 ("REACH, NEAR leg swings forward (SWAPPED)", 30, 30, -14, 6, -14, 14, 100,
  "the FAR leg trails behind (-14 degrees) with the heel lifting and the toes pushing off; the NEAR leg swings forward (+30 degrees) with the knee bent about 30 degrees and the foot reaching ahead; the FAR arm starts swinging forward, the NEAR arm back; frame 8 flows smoothly into frame 1 so that the loop has no jump"),
]
FRONT = ["the character's RIGHT foot steps forward toward the camera, the weight on the right leg, the body leans slightly to the left, the LEFT arm swings forward and the right arm back",
         "feet together passing, the body upright and at its highest, both arms hang next to the body (this frame must clearly differ from frame 4: the hands are slightly in front)",
         "the character's LEFT foot steps forward toward the camera, the weight on the left leg, the body leans slightly to the right, the RIGHT arm swings forward and the left arm back",
         "feet together passing, the body upright and at its highest, both arms hang next to the body (the hands are slightly behind the hips)"]
BACK = ["seen from behind: the character's RIGHT foot steps forward (away from the camera), the left shoulder dips, the LEFT arm swings forward",
        "seen from behind: feet together passing, the body upright and at its highest, the hands slightly in front",
        "seen from behind: the character's LEFT foot steps forward (away from the camera), the right shoulder dips, the RIGHT arm swings forward",
        "seen from behind: feet together passing, the body upright and at its highest, the hands slightly behind the hips"]

OUTFITS = [("Standard", "pixel_", "ref_walk_standard.png", "walk8_standard", "her normal outfit: orange puffy jacket with a reflective grey stripe, dark green cargo trousers with side pockets, teal boots with pink soles, a small olive satchel on a strap, teal messy short hair, yellow goggles on the forehead"),
           ("Gala-Look", "pixel_gala_", "ref_walk_gala.png", "walk8_gala", "the gala outfit exactly as in the reference image: sparkling teal tailcoat jacket with dark lapels and a teal bow tie over a white shirt, dark green cargo trousers, dark boots with pink soles, styled teal hair, no goggles"),
           ("Raumanzug", "pixel_suit_", "ref_walk_raumanzug.png", "walk8_raumanzug", "the space-suit outfit exactly as in the reference image: silver-grey space suit with pink hoses and a chest control panel, a backpack with pink hoses, silver boots and gloves, and a clear glass bubble helmet around the head with the goggles visible inside")]
bp.ROLES["sheet_pixel_gala.png"] = "the gala outfit"


def guide(direction):
    """Strichmännchen-Posenführer: zeigt die 8 Beinstellungen. NEAR = dicke dunkle Linie, FAR = dünne helle Linie."""
    REF.mkdir(parents=True, exist_ok=True)
    CW, CH2 = 360, 470
    img = Image.new("RGB", (CW * 4, CH2 * 2), (235, 235, 235))
    d = ImageDraw.Draw(img)
    sgn = 1 if direction == "rechts" else -1
    L = 85  # Länge Ober-/Unterschenkel
    for k, (title, tn, kn, tf, kf, an, af, h, _) in enumerate(POSES):
        cx, cy0 = (k % 4) * CW + CW // 2, (k // 4) * CH2
        hip = (cx, cy0 + 245 + (100 - h) * 4)
        sh = (cx + sgn * 6, hip[1] - 90)
        head = (sh[0] + sgn * 6, sh[1] - 34)

        def leg(thigh, knee, col, w):
            a = math.radians(thigh); knee_p = (hip[0] + sgn * L * math.sin(a), hip[1] + L * math.cos(a))
            b = math.radians(thigh - knee); foot = (knee_p[0] + sgn * L * math.sin(b), knee_p[1] + L * math.cos(b))
            d.line([hip, knee_p, foot], fill=col, width=w, joint="curve")
            d.line([foot, (foot[0] + sgn * 30, foot[1])], fill=col, width=w)
        def arm(ang, col, w):
            a = math.radians(ang); el = (sh[0] + sgn * 55 * math.sin(a), sh[1] + 55 * math.cos(a))
            b = math.radians(ang + 25); ha = (el[0] + sgn * 50 * math.sin(b), el[1] + 50 * math.cos(b))
            d.line([sh, el, ha], fill=col, width=w, joint="curve")
        leg(tf, kf, (150, 170, 220), 8); arm(af, (150, 170, 220), 7)       # FAR: dünn, hell
        d.line([hip, sh], fill=(60, 60, 60), width=10); d.ellipse([head[0] - 22, head[1] - 22, head[0] + 22, head[1] + 22], outline=(60, 60, 60), width=6)
        d.line([head, (head[0] + sgn * 26, head[1] - 2)], fill=(60, 60, 60), width=4)  # Blickrichtung
        leg(tn, kn, (200, 60, 60), 14); arm(an, (200, 60, 60), 12)         # NEAR: dick, rot
        d.line([(cx - 120, cy0 + 245 + 170), (cx + 120, cy0 + 245 + 170)], fill=(120, 120, 120), width=2)  # Boden
        d.text((cx - 130, cy0 + 10), f"{k + 1}  {title}", fill=(0, 0, 0))
    out = REF / f"guide_walk_{direction}.png"
    img.save(out)
    return out


RULES = """RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, speed lines, dust, sparkles, smoke, text, numbers, labels, arrows, grid lines, frames or speech bubbles.
- Grid: exactly 4 columns and 2 rows, 8 equal cells, reading order left to right then top to bottom. Each figure stands fully inside its own cell, horizontally centered on the cell's center line (centered by the body's middle, not by the feet), with at least 15 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure.
- NO DUPLICATES: all 8 figures show DIFFERENT poses. Never two identical or almost identical figures, and the bottom row must not repeat the top row: it shows the OTHER leg forward.
- Scale and camera: all figures exactly the same scale and camera distance (full body, no zoom changes). The standing foot is on the same baseline in every cell. The up and down motion of the body comes only from the pose, do NOT move the ground line and do NOT change the figure's size.
- Identity: the same character, face, hair, clothes, colors, proportions and line weight in all cells. Only the pose changes. Copy the design from the reference image exactly.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on the character."""

STRIDE_NOTE = ("A CLEAR, EXAGGERATED WALK: the stride is wide and unmistakable, the knees visibly bend, the foot lifts clearly off the ground in the swing phase, the heel strikes first and the toes push off last. "
               "The NEAR leg (the leg closer to the camera, drawn in FRONT of the body) and the FAR leg (partly hidden behind the body, drawn slightly darker) must always be clearly distinguishable: never let them merge into one blob; "
               "show a gap of background between the legs wherever they are apart. Arms swing in opposition to the legs (the arm on the side of the forward leg goes back). The head stays level and looks forward, the torso leans slightly forward.")

INTRO = """# Pixel: Laufanimationen für Nano Banana 2 (alle Figuren, die laufen)

**Welche Figuren brauchen Laufbilder?** Im Spiel läuft nur **Pixel** (drei Outfits: Standard, Gala-Look, Raumanzug). Alle NPCs stehen, Krümel schwebt (die vorhandenen Schwebe-Bilder genügen). Deshalb gibt es **9 Prompts**: pro Outfit je ein Bild für **rechts (8 Bilder)**, **links (8 Bilder)** und **vorn/hinten (4 + 4 Bilder)**.

**Warum links und rechts getrennt?** Bisher wurde die Seitenansicht nur gespiegelt. Jetzt gibt es für jede Richtung ein eigenes Bild (maximal 8 Bilder je Richtung, wie gewünscht), damit Tasche, Haare und Beinstellung auf beiden Seiten stimmen.

**Was die Prompts erzwingen**
- **Deutliche Laufbewegung:** weiter Schritt (Beine ±34 Grad), sichtbar gebeugte Knie, Fuß hebt ab, Ferse zuerst, Zehen zuletzt. Eine Tabelle mit festen Winkeln je Bild.
- **Vorderes und hinteres Bein klar erkennbar:** Das der Kamera nähere Bein (NEAR) steht vorne und ist hell beleuchtet, das abgewandte (FAR) ist leicht dunkler und teilweise vom Körper verdeckt, dazwischen muss Hintergrund sichtbar sein.
- **Keine doppelten Bilder:** Bild 5 bis 8 haben ausdrücklich das andere Bein vorn (markiert „SWAPPED"), im Prompt steht ein Doppelbild-Verbot, jedes Bild hat einen eigenen Namen und eigene Winkel.
- **Posenführer als Referenzbild:** Zu jeder Richtung liegt ein Strichmännchen-Bild (`assets/raw/refs_walk/guide_walk_rechts.png` bzw. `_links.png`) mit allen 8 Beinstellungen: NEAR dick und rot, FAR dünn und blau. Das ist nur Vorlage für die Stellung, nicht für den Stil.

**Für die Automatisierung:** Alle Prompts stehen zusätzlich in `tools/walk_prompts.json` (Felder: `id`, `title`, `save_as`, `format`, `refs` in Anhängereihenfolge, `prompt`). Die Referenzbilder liegen unter `assets/raw/refs_walk/` und werden bei jedem Lauf von `python3 tools/build_walk_prompts.py` neu erzeugt.

**Hinweis:** Eine KI hält Winkelangaben nie auf das Grad genau ein. Die Tabelle bringt sie aber zuverlässig dazu, dass die Bilder deutlich verschieden sind und das Bein wechselt. Wenn das Ergebnis nicht stimmt, im selben Chat schreiben: „Frames 5 to 8 repeat frames 1 to 4. Redraw 5 to 8 with the other leg forward exactly as in the table. Keep frames 1 to 4 unchanged.“

**Prüfliste vor dem Speichern**
1. Genau 8 Figuren (4 × 2), keine leere Zelle.
2. Bild 1: vorderes (nahes) Bein vorn. Bild 5: das andere Bein vorn.
3. Bild 3 und 7: ein Bein gerade, das andere Knie stark angewinkelt.
4. Keine zwei Bilder gleich, gleiche Größe, gleiche Standlinie.
5. Nahes und fernes Bein sind in jedem Bild getrennt erkennbar.

---
"""


def main():
    ref_guides = {d: guide(d) for d in ("rechts", "links")}
    entries = []
    out = [INTRO]
    n = 0
    for title, prefix, refname, key, outfit in OUTFITS:
        make_ref(prefix, refname)
        for direction in ("rechts", "links"):
            n += 1
            facing = "RIGHT" if direction == "rechts" else "LEFT"
            near = "LEFT" if direction == "rechts" else "RIGHT"
            far = "RIGHT" if direction == "rechts" else "LEFT"
            ref_char = refname if direction == "rechts" else refname.replace(".png", "_links.png")
            refs = [("ref_03_stil_nudelgasse.png", "use it ONLY for the art style, color palette, line weight and level of detail"),
                    (f"assets/raw/refs_walk/{ref_char}", f"clean design reference of the character PIXEL on a light grey background: front view, side view ({'facing right' if direction == 'rechts' else 'facing left'}) and back view. Copy the character exactly: face, hair, clothes, colors, proportions, line weight. Do not copy the grey background"),
                    (f"assets/raw/refs_walk/guide_walk_{direction}.png", "POSE GUIDE ONLY: stick figures that show the 8 leg and arm positions of the walk cycle (thick red = the NEAR side leg and arm, thin blue = the FAR side leg and arm). Use it only for the angles, the knee bends and which leg is forward in each cell. Do NOT copy the stick-figure look, the colors, the grey background or the labels")]
            head = "ATTACHED REFERENCE IMAGES (attach them in exactly this order):\n" + "\n".join(f"Image {i + 1} ({f}): {r}." for i, (f, r) in enumerate(refs)) + "\nFollow the references closely. Now create the following image.\n\n"
            cells = "\n".join(f"Cell {i + 1} (row {1 if i < 4 else 2}, column {i % 4 + 1}): {p[0]}: {p[8]}; body height about {p[7]} percent of standing height." for i, p in enumerate(POSES))
            prompt = (head + f"Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 8 full-body figures of PIXEL in pure side view walking to the {facing} (the character faces {facing.lower()}), one complete walk cycle of two steps, in a strict grid of 4 columns and 2 rows.\n\n" + RULES +
                      f"\n\nCHARACTER: Pixel, {outfit}. The character faces {facing.lower()}. The NEAR leg and arm (closest to the camera) are the character's {near} leg and arm, the FAR leg and arm are the {far} leg and arm.\n\n{STRIDE_NOTE}\n\n"
                      "HOW TO READ THE TABLE: the angle is the thigh angle against the vertical; plus means toward the direction the character faces, minus means backward. Follow the angles and knee bends closely, the walk must look big and clear. The pose guide image (Image 3) shows exactly these 8 stances.\n\n"
                      "THE 8 FRAMES, one complete loop (row 1 = the NEAR leg steps first, row 2 = the FAR leg steps, everything swapped):\n" + cells +
                      "\n\nIMPORTANT: frames 5 to 8 are NOT copies of frames 1 to 4. In frame 1 the NEAR leg is forward, in frame 5 the FAR leg is forward. Frame 8 flows into frame 1 without a jump.\n\n" + bp.STIL)
            fid = f"{key}_{direction}"
            entries.append(dict(id=fid, title=f"Pixel {title}: Laufen nach {direction} (8 Bilder)", save_as=f"assets/raw/{fid}.png", format="16:9, highest resolution", refs=[r[0] for r in refs], prompt=prompt))
            out.append(f"## {n}. {title}: nach {direction} (8 Bilder, 4 × 2)\n")
            out.append(f"- **Speichern als:** `assets/raw/{fid}.png`")
            out.append("- **Format:** 16:9, highest resolution (2K or 4K)")
            out.append("- **Referenzbilder (in dieser Reihenfolge anhängen):** " + ", ".join(f"`{r[0]}`" for r in refs) + "\n")
            out.append("```\n" + prompt + "\n```\n")
        # Vorn / hinten
        n += 1
        refs = [("ref_03_stil_nudelgasse.png", "use it ONLY for the art style, color palette, line weight and level of detail"),
                (f"assets/raw/refs_walk/{refname}", "clean design reference of the character PIXEL on a light grey background: front view, side view and back view. Copy the character exactly: face, hair, clothes, colors, proportions, line weight. Do not copy the grey background")]
        head = "ATTACHED REFERENCE IMAGES (attach them in exactly this order):\n" + "\n".join(f"Image {i + 1} ({f}): {r}." for i, (f, r) in enumerate(refs)) + "\nFollow the references closely. Now create the following image.\n\n"
        fr = "\n".join(f"Cell {i + 1} (row 1, column {i + 1}): FRONT view, walking toward the camera, step {i + 1} of 4: {d}." for i, d in enumerate(FRONT))
        bk = "\n".join(f"Cell {i + 5} (row 2, column {i + 1}): BACK view, walking away from the camera, step {i + 1} of 4: {d}." for i, d in enumerate(BACK))
        rules_fb = RULES.replace("all 8 figures show DIFFERENT poses. Never two identical or almost identical figures, and the bottom row must not repeat the top row: it shows the OTHER leg forward.",
                                 "in each row frames 1 and 3 show different legs forward (the legs are swapped), frames 2 and 4 are two different passing poses (the arm position differs). The top row is the front view, the bottom row the back view. Never two identical figures.")
        prompt = (head + "Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 8 full-body figures of PIXEL in a strict grid of 4 columns and 2 rows: the top row shows the front view walking toward the camera (4 frames), the bottom row shows the back view walking away (4 frames).\n\n" + rules_fb +
                  f"\n\nCHARACTER: Pixel, {outfit}.\n\nA CLEAR, EXAGGERATED WALK: each step is wide and unmistakable, the knees visibly bend, the stepping foot lifts clearly off the ground and the body bobs; the stepping leg and the standing leg are clearly distinguishable (a gap of background between the legs wherever they are apart). Arms swing in opposition to the legs. Frame 4 flows into frame 1 without a jump.\n\n" + fr + "\n" + bk + "\n\n" + bp.STIL)
        fid = f"{key}_vorn_hinten"
        entries.append(dict(id=fid, title=f"Pixel {title}: Laufen nach vorn und hinten (4 + 4 Bilder)", save_as=f"assets/raw/{fid}.png", format="16:9, highest resolution", refs=[r[0] for r in refs], prompt=prompt))
        out.append(f"## {n}. {title}: vorn und hinten (4 + 4 Bilder, 4 × 2)\n")
        out.append(f"- **Speichern als:** `assets/raw/{fid}.png`")
        out.append("- **Format:** 16:9, highest resolution (2K or 4K)")
        out.append("- **Referenzbilder (in dieser Reihenfolge anhängen):** " + ", ".join(f"`{r[0]}`" for r in refs) + "\n")
        out.append("```\n" + prompt + "\n```\n")
    (ROOT / "docs" / "prompts-laufanimation.md").write_text("\n".join(out), encoding="utf-8")
    (ROOT / "tools" / "walk_prompts.json").write_text(json.dumps(entries, indent=1, ensure_ascii=False), encoding="utf-8")
    print("ok", n, "Prompts")


if __name__ == "__main__":
    main()
