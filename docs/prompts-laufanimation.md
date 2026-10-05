# Pixel: Laufanimationen für Nano Banana 2 (alle Figuren, die laufen)

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

## 1. Standard: nach rechts (8 Bilder, 4 × 2)

- **Speichern als:** `assets/raw/walk8_standard_rechts.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_walk/ref_walk_standard.png`, `assets/raw/refs_walk/guide_walk_rechts.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail.
Image 2 (assets/raw/refs_walk/ref_walk_standard.png): clean design reference of the character PIXEL on a light grey background: front view, side view (facing right) and back view. Copy the character exactly: face, hair, clothes, colors, proportions, line weight. Do not copy the grey background.
Image 3 (assets/raw/refs_walk/guide_walk_rechts.png): POSE GUIDE ONLY: stick figures that show the 8 leg and arm positions of the walk cycle (thick red = the NEAR side leg and arm, thin blue = the FAR side leg and arm). Use it only for the angles, the knee bends and which leg is forward in each cell. Do NOT copy the stick-figure look, the colors, the grey background or the labels.
Follow the references closely. Now create the following image.

Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 8 full-body figures of PIXEL in pure side view walking to the RIGHT (the character faces right), one complete walk cycle of two steps, in a strict grid of 4 columns and 2 rows.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, speed lines, dust, sparkles, smoke, text, numbers, labels, arrows, grid lines, frames or speech bubbles.
- Grid: exactly 4 columns and 2 rows, 8 equal cells, reading order left to right then top to bottom. Each figure stands fully inside its own cell, horizontally centered on the cell's center line (centered by the body's middle, not by the feet), with at least 15 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure.
- NO DUPLICATES: all 8 figures show DIFFERENT poses. Never two identical or almost identical figures, and the bottom row must not repeat the top row: it shows the OTHER leg forward.
- Scale and camera: all figures exactly the same scale and camera distance (full body, no zoom changes). The standing foot is on the same baseline in every cell. The up and down motion of the body comes only from the pose, do NOT move the ground line and do NOT change the figure's size.
- Identity: the same character, face, hair, clothes, colors, proportions and line weight in all cells. Only the pose changes. Copy the design from the reference image exactly.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on the character.

CHARACTER: Pixel, her normal outfit: orange puffy jacket with a reflective grey stripe, dark green cargo trousers with side pockets, teal boots with pink soles, a small olive satchel on a strap, teal messy short hair, yellow goggles on the forehead. The character faces right. The NEAR leg and arm (closest to the camera) are the character's LEFT leg and arm, the FAR leg and arm are the RIGHT leg and arm.

A CLEAR, EXAGGERATED WALK: the stride is wide and unmistakable, the knees visibly bend, the foot lifts clearly off the ground in the swing phase, the heel strikes first and the toes push off last. The NEAR leg (the leg closer to the camera, drawn in FRONT of the body) and the FAR leg (partly hidden behind the body, drawn slightly darker) must always be clearly distinguishable: never let them merge into one blob; show a gap of background between the legs wherever they are apart. Arms swing in opposition to the legs (the arm on the side of the forward leg goes back). The head stays level and looks forward, the torso leans slightly forward.

HOW TO READ THE TABLE: the angle is the thigh angle against the vertical; plus means toward the direction the character faces, minus means backward. Follow the angles and knee bends closely, the walk must look big and clear. The pose guide image (Image 3) shows exactly these 8 stances.

THE 8 FRAMES, one complete loop (row 1 = the NEAR leg steps first, row 2 = the FAR leg steps, everything swapped):
Cell 1 (row 1, column 1): CONTACT, NEAR leg forward: the NEAR leg is stretched far forward (+34 degrees) with the heel on the ground and the toes pointing up; the FAR leg is stretched far backward (-34 degrees) with only the toe tip touching the ground and the heel lifted high; the legs form a wide, clear inverted V; the FAR arm swings forward, the NEAR arm swings back; body height about 97 percent of standing height.
Cell 2 (row 1, column 2): RECOIL, NEAR foot flat: the NEAR foot is flat on the ground under the front of the body (+18 degrees, knee slightly bent); the FAR leg is lifted off the ground behind (-18 degrees) with the knee bent 48 degrees and the foot raised; the body is at its lowest point; both arms move toward the body; body height about 95 percent of standing height.
Cell 3 (row 1, column 3): PASSING, NEAR leg planted: the NEAR leg is perfectly vertical and straight and carries all the weight; the FAR leg is bent 82 degrees at the knee with the thigh raised forward (+14 degrees) so that the FAR foot passes right next to the NEAR ankle; the body is at its highest point; the arms hang almost together at the body; body height about 102 percent of standing height.
Cell 4 (row 1, column 4): REACH, FAR leg swings forward: the NEAR leg trails behind (-14 degrees) with the heel lifting and the toes pushing off; the FAR leg swings forward (+30 degrees) with the knee bent about 30 degrees and the foot reaching ahead; the NEAR arm starts swinging forward, the FAR arm back; body height about 100 percent of standing height.
Cell 5 (row 2, column 1): CONTACT, FAR leg forward (SWAPPED): the FAR leg is stretched far forward (+34 degrees) with the heel on the ground and the toes pointing up; the NEAR leg is stretched far backward (-34 degrees) with only the toe tip touching the ground and the heel lifted high; wide, clear inverted V; the NEAR arm swings forward, the FAR arm swings back; body height about 97 percent of standing height.
Cell 6 (row 2, column 2): RECOIL, FAR foot flat (SWAPPED): the FAR foot is flat on the ground under the front of the body (+18 degrees, knee slightly bent); the NEAR leg is lifted off the ground behind (-18 degrees) with the knee bent 48 degrees and the foot raised; body at its lowest point; both arms move toward the body; body height about 95 percent of standing height.
Cell 7 (row 2, column 3): PASSING, FAR leg planted (SWAPPED): the FAR leg is perfectly vertical and straight and carries all the weight; the NEAR leg is bent 82 degrees at the knee with the thigh raised forward (+14 degrees) so that the NEAR foot passes right next to the FAR ankle; body at its highest point; arms hang almost together; body height about 102 percent of standing height.
Cell 8 (row 2, column 4): REACH, NEAR leg swings forward (SWAPPED): the FAR leg trails behind (-14 degrees) with the heel lifting and the toes pushing off; the NEAR leg swings forward (+30 degrees) with the knee bent about 30 degrees and the foot reaching ahead; the FAR arm starts swinging forward, the NEAR arm back; frame 8 flows smoothly into frame 1 so that the loop has no jump; body height about 100 percent of standing height.

IMPORTANT: frames 5 to 8 are NOT copies of frames 1 to 4. In frame 1 the NEAR leg is forward, in frame 5 the FAR leg is forward. Frame 8 flows into frame 1 without a jump.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 2. Standard: nach links (8 Bilder, 4 × 2)

- **Speichern als:** `assets/raw/walk8_standard_links.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_walk/ref_walk_standard_links.png`, `assets/raw/refs_walk/guide_walk_links.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail.
Image 2 (assets/raw/refs_walk/ref_walk_standard_links.png): clean design reference of the character PIXEL on a light grey background: front view, side view (facing left) and back view. Copy the character exactly: face, hair, clothes, colors, proportions, line weight. Do not copy the grey background.
Image 3 (assets/raw/refs_walk/guide_walk_links.png): POSE GUIDE ONLY: stick figures that show the 8 leg and arm positions of the walk cycle (thick red = the NEAR side leg and arm, thin blue = the FAR side leg and arm). Use it only for the angles, the knee bends and which leg is forward in each cell. Do NOT copy the stick-figure look, the colors, the grey background or the labels.
Follow the references closely. Now create the following image.

Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 8 full-body figures of PIXEL in pure side view walking to the LEFT (the character faces left), one complete walk cycle of two steps, in a strict grid of 4 columns and 2 rows.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, speed lines, dust, sparkles, smoke, text, numbers, labels, arrows, grid lines, frames or speech bubbles.
- Grid: exactly 4 columns and 2 rows, 8 equal cells, reading order left to right then top to bottom. Each figure stands fully inside its own cell, horizontally centered on the cell's center line (centered by the body's middle, not by the feet), with at least 15 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure.
- NO DUPLICATES: all 8 figures show DIFFERENT poses. Never two identical or almost identical figures, and the bottom row must not repeat the top row: it shows the OTHER leg forward.
- Scale and camera: all figures exactly the same scale and camera distance (full body, no zoom changes). The standing foot is on the same baseline in every cell. The up and down motion of the body comes only from the pose, do NOT move the ground line and do NOT change the figure's size.
- Identity: the same character, face, hair, clothes, colors, proportions and line weight in all cells. Only the pose changes. Copy the design from the reference image exactly.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on the character.

CHARACTER: Pixel, her normal outfit: orange puffy jacket with a reflective grey stripe, dark green cargo trousers with side pockets, teal boots with pink soles, a small olive satchel on a strap, teal messy short hair, yellow goggles on the forehead. The character faces left. The NEAR leg and arm (closest to the camera) are the character's RIGHT leg and arm, the FAR leg and arm are the LEFT leg and arm.

A CLEAR, EXAGGERATED WALK: the stride is wide and unmistakable, the knees visibly bend, the foot lifts clearly off the ground in the swing phase, the heel strikes first and the toes push off last. The NEAR leg (the leg closer to the camera, drawn in FRONT of the body) and the FAR leg (partly hidden behind the body, drawn slightly darker) must always be clearly distinguishable: never let them merge into one blob; show a gap of background between the legs wherever they are apart. Arms swing in opposition to the legs (the arm on the side of the forward leg goes back). The head stays level and looks forward, the torso leans slightly forward.

HOW TO READ THE TABLE: the angle is the thigh angle against the vertical; plus means toward the direction the character faces, minus means backward. Follow the angles and knee bends closely, the walk must look big and clear. The pose guide image (Image 3) shows exactly these 8 stances.

THE 8 FRAMES, one complete loop (row 1 = the NEAR leg steps first, row 2 = the FAR leg steps, everything swapped):
Cell 1 (row 1, column 1): CONTACT, NEAR leg forward: the NEAR leg is stretched far forward (+34 degrees) with the heel on the ground and the toes pointing up; the FAR leg is stretched far backward (-34 degrees) with only the toe tip touching the ground and the heel lifted high; the legs form a wide, clear inverted V; the FAR arm swings forward, the NEAR arm swings back; body height about 97 percent of standing height.
Cell 2 (row 1, column 2): RECOIL, NEAR foot flat: the NEAR foot is flat on the ground under the front of the body (+18 degrees, knee slightly bent); the FAR leg is lifted off the ground behind (-18 degrees) with the knee bent 48 degrees and the foot raised; the body is at its lowest point; both arms move toward the body; body height about 95 percent of standing height.
Cell 3 (row 1, column 3): PASSING, NEAR leg planted: the NEAR leg is perfectly vertical and straight and carries all the weight; the FAR leg is bent 82 degrees at the knee with the thigh raised forward (+14 degrees) so that the FAR foot passes right next to the NEAR ankle; the body is at its highest point; the arms hang almost together at the body; body height about 102 percent of standing height.
Cell 4 (row 1, column 4): REACH, FAR leg swings forward: the NEAR leg trails behind (-14 degrees) with the heel lifting and the toes pushing off; the FAR leg swings forward (+30 degrees) with the knee bent about 30 degrees and the foot reaching ahead; the NEAR arm starts swinging forward, the FAR arm back; body height about 100 percent of standing height.
Cell 5 (row 2, column 1): CONTACT, FAR leg forward (SWAPPED): the FAR leg is stretched far forward (+34 degrees) with the heel on the ground and the toes pointing up; the NEAR leg is stretched far backward (-34 degrees) with only the toe tip touching the ground and the heel lifted high; wide, clear inverted V; the NEAR arm swings forward, the FAR arm swings back; body height about 97 percent of standing height.
Cell 6 (row 2, column 2): RECOIL, FAR foot flat (SWAPPED): the FAR foot is flat on the ground under the front of the body (+18 degrees, knee slightly bent); the NEAR leg is lifted off the ground behind (-18 degrees) with the knee bent 48 degrees and the foot raised; body at its lowest point; both arms move toward the body; body height about 95 percent of standing height.
Cell 7 (row 2, column 3): PASSING, FAR leg planted (SWAPPED): the FAR leg is perfectly vertical and straight and carries all the weight; the NEAR leg is bent 82 degrees at the knee with the thigh raised forward (+14 degrees) so that the NEAR foot passes right next to the FAR ankle; body at its highest point; arms hang almost together; body height about 102 percent of standing height.
Cell 8 (row 2, column 4): REACH, NEAR leg swings forward (SWAPPED): the FAR leg trails behind (-14 degrees) with the heel lifting and the toes pushing off; the NEAR leg swings forward (+30 degrees) with the knee bent about 30 degrees and the foot reaching ahead; the FAR arm starts swinging forward, the NEAR arm back; frame 8 flows smoothly into frame 1 so that the loop has no jump; body height about 100 percent of standing height.

IMPORTANT: frames 5 to 8 are NOT copies of frames 1 to 4. In frame 1 the NEAR leg is forward, in frame 5 the FAR leg is forward. Frame 8 flows into frame 1 without a jump.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 3. Standard: vorn und hinten (4 + 4 Bilder, 4 × 2)

- **Speichern als:** `assets/raw/walk8_standard_vorn_hinten.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_walk/ref_walk_standard.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail.
Image 2 (assets/raw/refs_walk/ref_walk_standard.png): clean design reference of the character PIXEL on a light grey background: front view, side view and back view. Copy the character exactly: face, hair, clothes, colors, proportions, line weight. Do not copy the grey background.
Follow the references closely. Now create the following image.

Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 8 full-body figures of PIXEL in a strict grid of 4 columns and 2 rows: the top row shows the front view walking toward the camera (4 frames), the bottom row shows the back view walking away (4 frames).

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, speed lines, dust, sparkles, smoke, text, numbers, labels, arrows, grid lines, frames or speech bubbles.
- Grid: exactly 4 columns and 2 rows, 8 equal cells, reading order left to right then top to bottom. Each figure stands fully inside its own cell, horizontally centered on the cell's center line (centered by the body's middle, not by the feet), with at least 15 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure.
- NO DUPLICATES: in each row frames 1 and 3 show different legs forward (the legs are swapped), frames 2 and 4 are two different passing poses (the arm position differs). The top row is the front view, the bottom row the back view. Never two identical figures.
- Scale and camera: all figures exactly the same scale and camera distance (full body, no zoom changes). The standing foot is on the same baseline in every cell. The up and down motion of the body comes only from the pose, do NOT move the ground line and do NOT change the figure's size.
- Identity: the same character, face, hair, clothes, colors, proportions and line weight in all cells. Only the pose changes. Copy the design from the reference image exactly.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on the character.

CHARACTER: Pixel, her normal outfit: orange puffy jacket with a reflective grey stripe, dark green cargo trousers with side pockets, teal boots with pink soles, a small olive satchel on a strap, teal messy short hair, yellow goggles on the forehead.

A CLEAR, EXAGGERATED WALK: each step is wide and unmistakable, the knees visibly bend, the stepping foot lifts clearly off the ground and the body bobs; the stepping leg and the standing leg are clearly distinguishable (a gap of background between the legs wherever they are apart). Arms swing in opposition to the legs. Frame 4 flows into frame 1 without a jump.

Cell 1 (row 1, column 1): FRONT view, walking toward the camera, step 1 of 4: the character's RIGHT foot steps forward toward the camera, the weight on the right leg, the body leans slightly to the left, the LEFT arm swings forward and the right arm back.
Cell 2 (row 1, column 2): FRONT view, walking toward the camera, step 2 of 4: feet together passing, the body upright and at its highest, both arms hang next to the body (this frame must clearly differ from frame 4: the hands are slightly in front).
Cell 3 (row 1, column 3): FRONT view, walking toward the camera, step 3 of 4: the character's LEFT foot steps forward toward the camera, the weight on the left leg, the body leans slightly to the right, the RIGHT arm swings forward and the left arm back.
Cell 4 (row 1, column 4): FRONT view, walking toward the camera, step 4 of 4: feet together passing, the body upright and at its highest, both arms hang next to the body (the hands are slightly behind the hips).
Cell 5 (row 2, column 1): BACK view, walking away from the camera, step 1 of 4: seen from behind: the character's RIGHT foot steps forward (away from the camera), the left shoulder dips, the LEFT arm swings forward.
Cell 6 (row 2, column 2): BACK view, walking away from the camera, step 2 of 4: seen from behind: feet together passing, the body upright and at its highest, the hands slightly in front.
Cell 7 (row 2, column 3): BACK view, walking away from the camera, step 3 of 4: seen from behind: the character's LEFT foot steps forward (away from the camera), the right shoulder dips, the RIGHT arm swings forward.
Cell 8 (row 2, column 4): BACK view, walking away from the camera, step 4 of 4: seen from behind: feet together passing, the body upright and at its highest, the hands slightly behind the hips.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 4. Gala-Look: nach rechts (8 Bilder, 4 × 2)

- **Speichern als:** `assets/raw/walk8_gala_rechts.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_walk/ref_walk_gala.png`, `assets/raw/refs_walk/guide_walk_rechts.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail.
Image 2 (assets/raw/refs_walk/ref_walk_gala.png): clean design reference of the character PIXEL on a light grey background: front view, side view (facing right) and back view. Copy the character exactly: face, hair, clothes, colors, proportions, line weight. Do not copy the grey background.
Image 3 (assets/raw/refs_walk/guide_walk_rechts.png): POSE GUIDE ONLY: stick figures that show the 8 leg and arm positions of the walk cycle (thick red = the NEAR side leg and arm, thin blue = the FAR side leg and arm). Use it only for the angles, the knee bends and which leg is forward in each cell. Do NOT copy the stick-figure look, the colors, the grey background or the labels.
Follow the references closely. Now create the following image.

Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 8 full-body figures of PIXEL in pure side view walking to the RIGHT (the character faces right), one complete walk cycle of two steps, in a strict grid of 4 columns and 2 rows.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, speed lines, dust, sparkles, smoke, text, numbers, labels, arrows, grid lines, frames or speech bubbles.
- Grid: exactly 4 columns and 2 rows, 8 equal cells, reading order left to right then top to bottom. Each figure stands fully inside its own cell, horizontally centered on the cell's center line (centered by the body's middle, not by the feet), with at least 15 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure.
- NO DUPLICATES: all 8 figures show DIFFERENT poses. Never two identical or almost identical figures, and the bottom row must not repeat the top row: it shows the OTHER leg forward.
- Scale and camera: all figures exactly the same scale and camera distance (full body, no zoom changes). The standing foot is on the same baseline in every cell. The up and down motion of the body comes only from the pose, do NOT move the ground line and do NOT change the figure's size.
- Identity: the same character, face, hair, clothes, colors, proportions and line weight in all cells. Only the pose changes. Copy the design from the reference image exactly.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on the character.

CHARACTER: Pixel, the gala outfit exactly as in the reference image: sparkling teal tailcoat jacket with dark lapels and a teal bow tie over a white shirt, dark green cargo trousers, dark boots with pink soles, styled teal hair, no goggles. The character faces right. The NEAR leg and arm (closest to the camera) are the character's LEFT leg and arm, the FAR leg and arm are the RIGHT leg and arm.

A CLEAR, EXAGGERATED WALK: the stride is wide and unmistakable, the knees visibly bend, the foot lifts clearly off the ground in the swing phase, the heel strikes first and the toes push off last. The NEAR leg (the leg closer to the camera, drawn in FRONT of the body) and the FAR leg (partly hidden behind the body, drawn slightly darker) must always be clearly distinguishable: never let them merge into one blob; show a gap of background between the legs wherever they are apart. Arms swing in opposition to the legs (the arm on the side of the forward leg goes back). The head stays level and looks forward, the torso leans slightly forward.

HOW TO READ THE TABLE: the angle is the thigh angle against the vertical; plus means toward the direction the character faces, minus means backward. Follow the angles and knee bends closely, the walk must look big and clear. The pose guide image (Image 3) shows exactly these 8 stances.

THE 8 FRAMES, one complete loop (row 1 = the NEAR leg steps first, row 2 = the FAR leg steps, everything swapped):
Cell 1 (row 1, column 1): CONTACT, NEAR leg forward: the NEAR leg is stretched far forward (+34 degrees) with the heel on the ground and the toes pointing up; the FAR leg is stretched far backward (-34 degrees) with only the toe tip touching the ground and the heel lifted high; the legs form a wide, clear inverted V; the FAR arm swings forward, the NEAR arm swings back; body height about 97 percent of standing height.
Cell 2 (row 1, column 2): RECOIL, NEAR foot flat: the NEAR foot is flat on the ground under the front of the body (+18 degrees, knee slightly bent); the FAR leg is lifted off the ground behind (-18 degrees) with the knee bent 48 degrees and the foot raised; the body is at its lowest point; both arms move toward the body; body height about 95 percent of standing height.
Cell 3 (row 1, column 3): PASSING, NEAR leg planted: the NEAR leg is perfectly vertical and straight and carries all the weight; the FAR leg is bent 82 degrees at the knee with the thigh raised forward (+14 degrees) so that the FAR foot passes right next to the NEAR ankle; the body is at its highest point; the arms hang almost together at the body; body height about 102 percent of standing height.
Cell 4 (row 1, column 4): REACH, FAR leg swings forward: the NEAR leg trails behind (-14 degrees) with the heel lifting and the toes pushing off; the FAR leg swings forward (+30 degrees) with the knee bent about 30 degrees and the foot reaching ahead; the NEAR arm starts swinging forward, the FAR arm back; body height about 100 percent of standing height.
Cell 5 (row 2, column 1): CONTACT, FAR leg forward (SWAPPED): the FAR leg is stretched far forward (+34 degrees) with the heel on the ground and the toes pointing up; the NEAR leg is stretched far backward (-34 degrees) with only the toe tip touching the ground and the heel lifted high; wide, clear inverted V; the NEAR arm swings forward, the FAR arm swings back; body height about 97 percent of standing height.
Cell 6 (row 2, column 2): RECOIL, FAR foot flat (SWAPPED): the FAR foot is flat on the ground under the front of the body (+18 degrees, knee slightly bent); the NEAR leg is lifted off the ground behind (-18 degrees) with the knee bent 48 degrees and the foot raised; body at its lowest point; both arms move toward the body; body height about 95 percent of standing height.
Cell 7 (row 2, column 3): PASSING, FAR leg planted (SWAPPED): the FAR leg is perfectly vertical and straight and carries all the weight; the NEAR leg is bent 82 degrees at the knee with the thigh raised forward (+14 degrees) so that the NEAR foot passes right next to the FAR ankle; body at its highest point; arms hang almost together; body height about 102 percent of standing height.
Cell 8 (row 2, column 4): REACH, NEAR leg swings forward (SWAPPED): the FAR leg trails behind (-14 degrees) with the heel lifting and the toes pushing off; the NEAR leg swings forward (+30 degrees) with the knee bent about 30 degrees and the foot reaching ahead; the FAR arm starts swinging forward, the NEAR arm back; frame 8 flows smoothly into frame 1 so that the loop has no jump; body height about 100 percent of standing height.

IMPORTANT: frames 5 to 8 are NOT copies of frames 1 to 4. In frame 1 the NEAR leg is forward, in frame 5 the FAR leg is forward. Frame 8 flows into frame 1 without a jump.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 5. Gala-Look: nach links (8 Bilder, 4 × 2)

- **Speichern als:** `assets/raw/walk8_gala_links.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_walk/ref_walk_gala_links.png`, `assets/raw/refs_walk/guide_walk_links.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail.
Image 2 (assets/raw/refs_walk/ref_walk_gala_links.png): clean design reference of the character PIXEL on a light grey background: front view, side view (facing left) and back view. Copy the character exactly: face, hair, clothes, colors, proportions, line weight. Do not copy the grey background.
Image 3 (assets/raw/refs_walk/guide_walk_links.png): POSE GUIDE ONLY: stick figures that show the 8 leg and arm positions of the walk cycle (thick red = the NEAR side leg and arm, thin blue = the FAR side leg and arm). Use it only for the angles, the knee bends and which leg is forward in each cell. Do NOT copy the stick-figure look, the colors, the grey background or the labels.
Follow the references closely. Now create the following image.

Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 8 full-body figures of PIXEL in pure side view walking to the LEFT (the character faces left), one complete walk cycle of two steps, in a strict grid of 4 columns and 2 rows.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, speed lines, dust, sparkles, smoke, text, numbers, labels, arrows, grid lines, frames or speech bubbles.
- Grid: exactly 4 columns and 2 rows, 8 equal cells, reading order left to right then top to bottom. Each figure stands fully inside its own cell, horizontally centered on the cell's center line (centered by the body's middle, not by the feet), with at least 15 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure.
- NO DUPLICATES: all 8 figures show DIFFERENT poses. Never two identical or almost identical figures, and the bottom row must not repeat the top row: it shows the OTHER leg forward.
- Scale and camera: all figures exactly the same scale and camera distance (full body, no zoom changes). The standing foot is on the same baseline in every cell. The up and down motion of the body comes only from the pose, do NOT move the ground line and do NOT change the figure's size.
- Identity: the same character, face, hair, clothes, colors, proportions and line weight in all cells. Only the pose changes. Copy the design from the reference image exactly.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on the character.

CHARACTER: Pixel, the gala outfit exactly as in the reference image: sparkling teal tailcoat jacket with dark lapels and a teal bow tie over a white shirt, dark green cargo trousers, dark boots with pink soles, styled teal hair, no goggles. The character faces left. The NEAR leg and arm (closest to the camera) are the character's RIGHT leg and arm, the FAR leg and arm are the LEFT leg and arm.

A CLEAR, EXAGGERATED WALK: the stride is wide and unmistakable, the knees visibly bend, the foot lifts clearly off the ground in the swing phase, the heel strikes first and the toes push off last. The NEAR leg (the leg closer to the camera, drawn in FRONT of the body) and the FAR leg (partly hidden behind the body, drawn slightly darker) must always be clearly distinguishable: never let them merge into one blob; show a gap of background between the legs wherever they are apart. Arms swing in opposition to the legs (the arm on the side of the forward leg goes back). The head stays level and looks forward, the torso leans slightly forward.

HOW TO READ THE TABLE: the angle is the thigh angle against the vertical; plus means toward the direction the character faces, minus means backward. Follow the angles and knee bends closely, the walk must look big and clear. The pose guide image (Image 3) shows exactly these 8 stances.

THE 8 FRAMES, one complete loop (row 1 = the NEAR leg steps first, row 2 = the FAR leg steps, everything swapped):
Cell 1 (row 1, column 1): CONTACT, NEAR leg forward: the NEAR leg is stretched far forward (+34 degrees) with the heel on the ground and the toes pointing up; the FAR leg is stretched far backward (-34 degrees) with only the toe tip touching the ground and the heel lifted high; the legs form a wide, clear inverted V; the FAR arm swings forward, the NEAR arm swings back; body height about 97 percent of standing height.
Cell 2 (row 1, column 2): RECOIL, NEAR foot flat: the NEAR foot is flat on the ground under the front of the body (+18 degrees, knee slightly bent); the FAR leg is lifted off the ground behind (-18 degrees) with the knee bent 48 degrees and the foot raised; the body is at its lowest point; both arms move toward the body; body height about 95 percent of standing height.
Cell 3 (row 1, column 3): PASSING, NEAR leg planted: the NEAR leg is perfectly vertical and straight and carries all the weight; the FAR leg is bent 82 degrees at the knee with the thigh raised forward (+14 degrees) so that the FAR foot passes right next to the NEAR ankle; the body is at its highest point; the arms hang almost together at the body; body height about 102 percent of standing height.
Cell 4 (row 1, column 4): REACH, FAR leg swings forward: the NEAR leg trails behind (-14 degrees) with the heel lifting and the toes pushing off; the FAR leg swings forward (+30 degrees) with the knee bent about 30 degrees and the foot reaching ahead; the NEAR arm starts swinging forward, the FAR arm back; body height about 100 percent of standing height.
Cell 5 (row 2, column 1): CONTACT, FAR leg forward (SWAPPED): the FAR leg is stretched far forward (+34 degrees) with the heel on the ground and the toes pointing up; the NEAR leg is stretched far backward (-34 degrees) with only the toe tip touching the ground and the heel lifted high; wide, clear inverted V; the NEAR arm swings forward, the FAR arm swings back; body height about 97 percent of standing height.
Cell 6 (row 2, column 2): RECOIL, FAR foot flat (SWAPPED): the FAR foot is flat on the ground under the front of the body (+18 degrees, knee slightly bent); the NEAR leg is lifted off the ground behind (-18 degrees) with the knee bent 48 degrees and the foot raised; body at its lowest point; both arms move toward the body; body height about 95 percent of standing height.
Cell 7 (row 2, column 3): PASSING, FAR leg planted (SWAPPED): the FAR leg is perfectly vertical and straight and carries all the weight; the NEAR leg is bent 82 degrees at the knee with the thigh raised forward (+14 degrees) so that the NEAR foot passes right next to the FAR ankle; body at its highest point; arms hang almost together; body height about 102 percent of standing height.
Cell 8 (row 2, column 4): REACH, NEAR leg swings forward (SWAPPED): the FAR leg trails behind (-14 degrees) with the heel lifting and the toes pushing off; the NEAR leg swings forward (+30 degrees) with the knee bent about 30 degrees and the foot reaching ahead; the FAR arm starts swinging forward, the NEAR arm back; frame 8 flows smoothly into frame 1 so that the loop has no jump; body height about 100 percent of standing height.

IMPORTANT: frames 5 to 8 are NOT copies of frames 1 to 4. In frame 1 the NEAR leg is forward, in frame 5 the FAR leg is forward. Frame 8 flows into frame 1 without a jump.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 6. Gala-Look: vorn und hinten (4 + 4 Bilder, 4 × 2)

- **Speichern als:** `assets/raw/walk8_gala_vorn_hinten.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_walk/ref_walk_gala.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail.
Image 2 (assets/raw/refs_walk/ref_walk_gala.png): clean design reference of the character PIXEL on a light grey background: front view, side view and back view. Copy the character exactly: face, hair, clothes, colors, proportions, line weight. Do not copy the grey background.
Follow the references closely. Now create the following image.

Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 8 full-body figures of PIXEL in a strict grid of 4 columns and 2 rows: the top row shows the front view walking toward the camera (4 frames), the bottom row shows the back view walking away (4 frames).

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, speed lines, dust, sparkles, smoke, text, numbers, labels, arrows, grid lines, frames or speech bubbles.
- Grid: exactly 4 columns and 2 rows, 8 equal cells, reading order left to right then top to bottom. Each figure stands fully inside its own cell, horizontally centered on the cell's center line (centered by the body's middle, not by the feet), with at least 15 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure.
- NO DUPLICATES: in each row frames 1 and 3 show different legs forward (the legs are swapped), frames 2 and 4 are two different passing poses (the arm position differs). The top row is the front view, the bottom row the back view. Never two identical figures.
- Scale and camera: all figures exactly the same scale and camera distance (full body, no zoom changes). The standing foot is on the same baseline in every cell. The up and down motion of the body comes only from the pose, do NOT move the ground line and do NOT change the figure's size.
- Identity: the same character, face, hair, clothes, colors, proportions and line weight in all cells. Only the pose changes. Copy the design from the reference image exactly.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on the character.

CHARACTER: Pixel, the gala outfit exactly as in the reference image: sparkling teal tailcoat jacket with dark lapels and a teal bow tie over a white shirt, dark green cargo trousers, dark boots with pink soles, styled teal hair, no goggles.

A CLEAR, EXAGGERATED WALK: each step is wide and unmistakable, the knees visibly bend, the stepping foot lifts clearly off the ground and the body bobs; the stepping leg and the standing leg are clearly distinguishable (a gap of background between the legs wherever they are apart). Arms swing in opposition to the legs. Frame 4 flows into frame 1 without a jump.

Cell 1 (row 1, column 1): FRONT view, walking toward the camera, step 1 of 4: the character's RIGHT foot steps forward toward the camera, the weight on the right leg, the body leans slightly to the left, the LEFT arm swings forward and the right arm back.
Cell 2 (row 1, column 2): FRONT view, walking toward the camera, step 2 of 4: feet together passing, the body upright and at its highest, both arms hang next to the body (this frame must clearly differ from frame 4: the hands are slightly in front).
Cell 3 (row 1, column 3): FRONT view, walking toward the camera, step 3 of 4: the character's LEFT foot steps forward toward the camera, the weight on the left leg, the body leans slightly to the right, the RIGHT arm swings forward and the left arm back.
Cell 4 (row 1, column 4): FRONT view, walking toward the camera, step 4 of 4: feet together passing, the body upright and at its highest, both arms hang next to the body (the hands are slightly behind the hips).
Cell 5 (row 2, column 1): BACK view, walking away from the camera, step 1 of 4: seen from behind: the character's RIGHT foot steps forward (away from the camera), the left shoulder dips, the LEFT arm swings forward.
Cell 6 (row 2, column 2): BACK view, walking away from the camera, step 2 of 4: seen from behind: feet together passing, the body upright and at its highest, the hands slightly in front.
Cell 7 (row 2, column 3): BACK view, walking away from the camera, step 3 of 4: seen from behind: the character's LEFT foot steps forward (away from the camera), the right shoulder dips, the RIGHT arm swings forward.
Cell 8 (row 2, column 4): BACK view, walking away from the camera, step 4 of 4: seen from behind: feet together passing, the body upright and at its highest, the hands slightly behind the hips.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 7. Raumanzug: nach rechts (8 Bilder, 4 × 2)

- **Speichern als:** `assets/raw/walk8_raumanzug_rechts.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_walk/ref_walk_raumanzug.png`, `assets/raw/refs_walk/guide_walk_rechts.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail.
Image 2 (assets/raw/refs_walk/ref_walk_raumanzug.png): clean design reference of the character PIXEL on a light grey background: front view, side view (facing right) and back view. Copy the character exactly: face, hair, clothes, colors, proportions, line weight. Do not copy the grey background.
Image 3 (assets/raw/refs_walk/guide_walk_rechts.png): POSE GUIDE ONLY: stick figures that show the 8 leg and arm positions of the walk cycle (thick red = the NEAR side leg and arm, thin blue = the FAR side leg and arm). Use it only for the angles, the knee bends and which leg is forward in each cell. Do NOT copy the stick-figure look, the colors, the grey background or the labels.
Follow the references closely. Now create the following image.

Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 8 full-body figures of PIXEL in pure side view walking to the RIGHT (the character faces right), one complete walk cycle of two steps, in a strict grid of 4 columns and 2 rows.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, speed lines, dust, sparkles, smoke, text, numbers, labels, arrows, grid lines, frames or speech bubbles.
- Grid: exactly 4 columns and 2 rows, 8 equal cells, reading order left to right then top to bottom. Each figure stands fully inside its own cell, horizontally centered on the cell's center line (centered by the body's middle, not by the feet), with at least 15 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure.
- NO DUPLICATES: all 8 figures show DIFFERENT poses. Never two identical or almost identical figures, and the bottom row must not repeat the top row: it shows the OTHER leg forward.
- Scale and camera: all figures exactly the same scale and camera distance (full body, no zoom changes). The standing foot is on the same baseline in every cell. The up and down motion of the body comes only from the pose, do NOT move the ground line and do NOT change the figure's size.
- Identity: the same character, face, hair, clothes, colors, proportions and line weight in all cells. Only the pose changes. Copy the design from the reference image exactly.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on the character.

CHARACTER: Pixel, the space-suit outfit exactly as in the reference image: silver-grey space suit with pink hoses and a chest control panel, a backpack with pink hoses, silver boots and gloves, and a clear glass bubble helmet around the head with the goggles visible inside. The character faces right. The NEAR leg and arm (closest to the camera) are the character's LEFT leg and arm, the FAR leg and arm are the RIGHT leg and arm.

A CLEAR, EXAGGERATED WALK: the stride is wide and unmistakable, the knees visibly bend, the foot lifts clearly off the ground in the swing phase, the heel strikes first and the toes push off last. The NEAR leg (the leg closer to the camera, drawn in FRONT of the body) and the FAR leg (partly hidden behind the body, drawn slightly darker) must always be clearly distinguishable: never let them merge into one blob; show a gap of background between the legs wherever they are apart. Arms swing in opposition to the legs (the arm on the side of the forward leg goes back). The head stays level and looks forward, the torso leans slightly forward.

HOW TO READ THE TABLE: the angle is the thigh angle against the vertical; plus means toward the direction the character faces, minus means backward. Follow the angles and knee bends closely, the walk must look big and clear. The pose guide image (Image 3) shows exactly these 8 stances.

THE 8 FRAMES, one complete loop (row 1 = the NEAR leg steps first, row 2 = the FAR leg steps, everything swapped):
Cell 1 (row 1, column 1): CONTACT, NEAR leg forward: the NEAR leg is stretched far forward (+34 degrees) with the heel on the ground and the toes pointing up; the FAR leg is stretched far backward (-34 degrees) with only the toe tip touching the ground and the heel lifted high; the legs form a wide, clear inverted V; the FAR arm swings forward, the NEAR arm swings back; body height about 97 percent of standing height.
Cell 2 (row 1, column 2): RECOIL, NEAR foot flat: the NEAR foot is flat on the ground under the front of the body (+18 degrees, knee slightly bent); the FAR leg is lifted off the ground behind (-18 degrees) with the knee bent 48 degrees and the foot raised; the body is at its lowest point; both arms move toward the body; body height about 95 percent of standing height.
Cell 3 (row 1, column 3): PASSING, NEAR leg planted: the NEAR leg is perfectly vertical and straight and carries all the weight; the FAR leg is bent 82 degrees at the knee with the thigh raised forward (+14 degrees) so that the FAR foot passes right next to the NEAR ankle; the body is at its highest point; the arms hang almost together at the body; body height about 102 percent of standing height.
Cell 4 (row 1, column 4): REACH, FAR leg swings forward: the NEAR leg trails behind (-14 degrees) with the heel lifting and the toes pushing off; the FAR leg swings forward (+30 degrees) with the knee bent about 30 degrees and the foot reaching ahead; the NEAR arm starts swinging forward, the FAR arm back; body height about 100 percent of standing height.
Cell 5 (row 2, column 1): CONTACT, FAR leg forward (SWAPPED): the FAR leg is stretched far forward (+34 degrees) with the heel on the ground and the toes pointing up; the NEAR leg is stretched far backward (-34 degrees) with only the toe tip touching the ground and the heel lifted high; wide, clear inverted V; the NEAR arm swings forward, the FAR arm swings back; body height about 97 percent of standing height.
Cell 6 (row 2, column 2): RECOIL, FAR foot flat (SWAPPED): the FAR foot is flat on the ground under the front of the body (+18 degrees, knee slightly bent); the NEAR leg is lifted off the ground behind (-18 degrees) with the knee bent 48 degrees and the foot raised; body at its lowest point; both arms move toward the body; body height about 95 percent of standing height.
Cell 7 (row 2, column 3): PASSING, FAR leg planted (SWAPPED): the FAR leg is perfectly vertical and straight and carries all the weight; the NEAR leg is bent 82 degrees at the knee with the thigh raised forward (+14 degrees) so that the NEAR foot passes right next to the FAR ankle; body at its highest point; arms hang almost together; body height about 102 percent of standing height.
Cell 8 (row 2, column 4): REACH, NEAR leg swings forward (SWAPPED): the FAR leg trails behind (-14 degrees) with the heel lifting and the toes pushing off; the NEAR leg swings forward (+30 degrees) with the knee bent about 30 degrees and the foot reaching ahead; the FAR arm starts swinging forward, the NEAR arm back; frame 8 flows smoothly into frame 1 so that the loop has no jump; body height about 100 percent of standing height.

IMPORTANT: frames 5 to 8 are NOT copies of frames 1 to 4. In frame 1 the NEAR leg is forward, in frame 5 the FAR leg is forward. Frame 8 flows into frame 1 without a jump.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 8. Raumanzug: nach links (8 Bilder, 4 × 2)

- **Speichern als:** `assets/raw/walk8_raumanzug_links.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_walk/ref_walk_raumanzug_links.png`, `assets/raw/refs_walk/guide_walk_links.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail.
Image 2 (assets/raw/refs_walk/ref_walk_raumanzug_links.png): clean design reference of the character PIXEL on a light grey background: front view, side view (facing left) and back view. Copy the character exactly: face, hair, clothes, colors, proportions, line weight. Do not copy the grey background.
Image 3 (assets/raw/refs_walk/guide_walk_links.png): POSE GUIDE ONLY: stick figures that show the 8 leg and arm positions of the walk cycle (thick red = the NEAR side leg and arm, thin blue = the FAR side leg and arm). Use it only for the angles, the knee bends and which leg is forward in each cell. Do NOT copy the stick-figure look, the colors, the grey background or the labels.
Follow the references closely. Now create the following image.

Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 8 full-body figures of PIXEL in pure side view walking to the LEFT (the character faces left), one complete walk cycle of two steps, in a strict grid of 4 columns and 2 rows.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, speed lines, dust, sparkles, smoke, text, numbers, labels, arrows, grid lines, frames or speech bubbles.
- Grid: exactly 4 columns and 2 rows, 8 equal cells, reading order left to right then top to bottom. Each figure stands fully inside its own cell, horizontally centered on the cell's center line (centered by the body's middle, not by the feet), with at least 15 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure.
- NO DUPLICATES: all 8 figures show DIFFERENT poses. Never two identical or almost identical figures, and the bottom row must not repeat the top row: it shows the OTHER leg forward.
- Scale and camera: all figures exactly the same scale and camera distance (full body, no zoom changes). The standing foot is on the same baseline in every cell. The up and down motion of the body comes only from the pose, do NOT move the ground line and do NOT change the figure's size.
- Identity: the same character, face, hair, clothes, colors, proportions and line weight in all cells. Only the pose changes. Copy the design from the reference image exactly.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on the character.

CHARACTER: Pixel, the space-suit outfit exactly as in the reference image: silver-grey space suit with pink hoses and a chest control panel, a backpack with pink hoses, silver boots and gloves, and a clear glass bubble helmet around the head with the goggles visible inside. The character faces left. The NEAR leg and arm (closest to the camera) are the character's RIGHT leg and arm, the FAR leg and arm are the LEFT leg and arm.

A CLEAR, EXAGGERATED WALK: the stride is wide and unmistakable, the knees visibly bend, the foot lifts clearly off the ground in the swing phase, the heel strikes first and the toes push off last. The NEAR leg (the leg closer to the camera, drawn in FRONT of the body) and the FAR leg (partly hidden behind the body, drawn slightly darker) must always be clearly distinguishable: never let them merge into one blob; show a gap of background between the legs wherever they are apart. Arms swing in opposition to the legs (the arm on the side of the forward leg goes back). The head stays level and looks forward, the torso leans slightly forward.

HOW TO READ THE TABLE: the angle is the thigh angle against the vertical; plus means toward the direction the character faces, minus means backward. Follow the angles and knee bends closely, the walk must look big and clear. The pose guide image (Image 3) shows exactly these 8 stances.

THE 8 FRAMES, one complete loop (row 1 = the NEAR leg steps first, row 2 = the FAR leg steps, everything swapped):
Cell 1 (row 1, column 1): CONTACT, NEAR leg forward: the NEAR leg is stretched far forward (+34 degrees) with the heel on the ground and the toes pointing up; the FAR leg is stretched far backward (-34 degrees) with only the toe tip touching the ground and the heel lifted high; the legs form a wide, clear inverted V; the FAR arm swings forward, the NEAR arm swings back; body height about 97 percent of standing height.
Cell 2 (row 1, column 2): RECOIL, NEAR foot flat: the NEAR foot is flat on the ground under the front of the body (+18 degrees, knee slightly bent); the FAR leg is lifted off the ground behind (-18 degrees) with the knee bent 48 degrees and the foot raised; the body is at its lowest point; both arms move toward the body; body height about 95 percent of standing height.
Cell 3 (row 1, column 3): PASSING, NEAR leg planted: the NEAR leg is perfectly vertical and straight and carries all the weight; the FAR leg is bent 82 degrees at the knee with the thigh raised forward (+14 degrees) so that the FAR foot passes right next to the NEAR ankle; the body is at its highest point; the arms hang almost together at the body; body height about 102 percent of standing height.
Cell 4 (row 1, column 4): REACH, FAR leg swings forward: the NEAR leg trails behind (-14 degrees) with the heel lifting and the toes pushing off; the FAR leg swings forward (+30 degrees) with the knee bent about 30 degrees and the foot reaching ahead; the NEAR arm starts swinging forward, the FAR arm back; body height about 100 percent of standing height.
Cell 5 (row 2, column 1): CONTACT, FAR leg forward (SWAPPED): the FAR leg is stretched far forward (+34 degrees) with the heel on the ground and the toes pointing up; the NEAR leg is stretched far backward (-34 degrees) with only the toe tip touching the ground and the heel lifted high; wide, clear inverted V; the NEAR arm swings forward, the FAR arm swings back; body height about 97 percent of standing height.
Cell 6 (row 2, column 2): RECOIL, FAR foot flat (SWAPPED): the FAR foot is flat on the ground under the front of the body (+18 degrees, knee slightly bent); the NEAR leg is lifted off the ground behind (-18 degrees) with the knee bent 48 degrees and the foot raised; body at its lowest point; both arms move toward the body; body height about 95 percent of standing height.
Cell 7 (row 2, column 3): PASSING, FAR leg planted (SWAPPED): the FAR leg is perfectly vertical and straight and carries all the weight; the NEAR leg is bent 82 degrees at the knee with the thigh raised forward (+14 degrees) so that the NEAR foot passes right next to the FAR ankle; body at its highest point; arms hang almost together; body height about 102 percent of standing height.
Cell 8 (row 2, column 4): REACH, NEAR leg swings forward (SWAPPED): the FAR leg trails behind (-14 degrees) with the heel lifting and the toes pushing off; the NEAR leg swings forward (+30 degrees) with the knee bent about 30 degrees and the foot reaching ahead; the FAR arm starts swinging forward, the NEAR arm back; frame 8 flows smoothly into frame 1 so that the loop has no jump; body height about 100 percent of standing height.

IMPORTANT: frames 5 to 8 are NOT copies of frames 1 to 4. In frame 1 the NEAR leg is forward, in frame 5 the FAR leg is forward. Frame 8 flows into frame 1 without a jump.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 9. Raumanzug: vorn und hinten (4 + 4 Bilder, 4 × 2)

- **Speichern als:** `assets/raw/walk8_raumanzug_vorn_hinten.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_walk/ref_walk_raumanzug.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail.
Image 2 (assets/raw/refs_walk/ref_walk_raumanzug.png): clean design reference of the character PIXEL on a light grey background: front view, side view and back view. Copy the character exactly: face, hair, clothes, colors, proportions, line weight. Do not copy the grey background.
Follow the references closely. Now create the following image.

Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 8 full-body figures of PIXEL in a strict grid of 4 columns and 2 rows: the top row shows the front view walking toward the camera (4 frames), the bottom row shows the back view walking away (4 frames).

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, speed lines, dust, sparkles, smoke, text, numbers, labels, arrows, grid lines, frames or speech bubbles.
- Grid: exactly 4 columns and 2 rows, 8 equal cells, reading order left to right then top to bottom. Each figure stands fully inside its own cell, horizontally centered on the cell's center line (centered by the body's middle, not by the feet), with at least 15 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure.
- NO DUPLICATES: in each row frames 1 and 3 show different legs forward (the legs are swapped), frames 2 and 4 are two different passing poses (the arm position differs). The top row is the front view, the bottom row the back view. Never two identical figures.
- Scale and camera: all figures exactly the same scale and camera distance (full body, no zoom changes). The standing foot is on the same baseline in every cell. The up and down motion of the body comes only from the pose, do NOT move the ground line and do NOT change the figure's size.
- Identity: the same character, face, hair, clothes, colors, proportions and line weight in all cells. Only the pose changes. Copy the design from the reference image exactly.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on the character.

CHARACTER: Pixel, the space-suit outfit exactly as in the reference image: silver-grey space suit with pink hoses and a chest control panel, a backpack with pink hoses, silver boots and gloves, and a clear glass bubble helmet around the head with the goggles visible inside.

A CLEAR, EXAGGERATED WALK: each step is wide and unmistakable, the knees visibly bend, the stepping foot lifts clearly off the ground and the body bobs; the stepping leg and the standing leg are clearly distinguishable (a gap of background between the legs wherever they are apart). Arms swing in opposition to the legs. Frame 4 flows into frame 1 without a jump.

Cell 1 (row 1, column 1): FRONT view, walking toward the camera, step 1 of 4: the character's RIGHT foot steps forward toward the camera, the weight on the right leg, the body leans slightly to the left, the LEFT arm swings forward and the right arm back.
Cell 2 (row 1, column 2): FRONT view, walking toward the camera, step 2 of 4: feet together passing, the body upright and at its highest, both arms hang next to the body (this frame must clearly differ from frame 4: the hands are slightly in front).
Cell 3 (row 1, column 3): FRONT view, walking toward the camera, step 3 of 4: the character's LEFT foot steps forward toward the camera, the weight on the left leg, the body leans slightly to the right, the RIGHT arm swings forward and the left arm back.
Cell 4 (row 1, column 4): FRONT view, walking toward the camera, step 4 of 4: feet together passing, the body upright and at its highest, both arms hang next to the body (the hands are slightly behind the hips).
Cell 5 (row 2, column 1): BACK view, walking away from the camera, step 1 of 4: seen from behind: the character's RIGHT foot steps forward (away from the camera), the left shoulder dips, the LEFT arm swings forward.
Cell 6 (row 2, column 2): BACK view, walking away from the camera, step 2 of 4: seen from behind: feet together passing, the body upright and at its highest, the hands slightly in front.
Cell 7 (row 2, column 3): BACK view, walking away from the camera, step 3 of 4: seen from behind: the character's LEFT foot steps forward (away from the camera), the right shoulder dips, the RIGHT arm swings forward.
Cell 8 (row 2, column 4): BACK view, walking away from the camera, step 4 of 4: seen from behind: feet together passing, the body upright and at its highest, the hands slightly behind the hips.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```
