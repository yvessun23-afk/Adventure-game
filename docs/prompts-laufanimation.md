# Pixel: neue Laufzyklen (exakte Beinwinkel, keine Doppelbilder)

**Was bei den letzten Sheets schiefging:** Die KI hat die zweite Hälfte der Bilder aus der ersten kopiert (dasselbe Bein vorn), dadurch bricht die Bewegung in der Mitte ab und beginnt von vorn. Außerdem passten die Posen nicht zur Bewegung im Spiel.

**Was jetzt anders ist**
- **Exakte Tabelle statt Beschreibung:** Jedes der 8 Bilder hat feste Beinwinkel (Oberschenkel in Grad zur Senkrechten, plus = nach vorn), Kniebeugung, Armrichtung und Körperhöhe. Bild 5 bis 8 sind ausdrücklich die Spiegelung der Beinstellung von Bild 1 bis 4 (**anderes Bein vorn**) und als „SWAPPED" markiert.
- **Ein Doppelschritt = 8 Bilder** (zwei Reihen à 4 Bilder: Reihe 1 mit rechtem Bein, Reihe 2 mit linkem Bein). Bild 8 geht nahtlos in Bild 1 über. Das passt zur Engine (läuft in Schleife) und deckt sich mit klassischen Gehzyklen.
- **Ausdrückliches Doppelbild-Verbot** im Prompt, dazu eine Prüfliste unten.
- **Weniger Bilder pro Auftrag:** 8 statt 12 bis 18 pro Sheet, dadurch hält die KI das Raster besser. Vorn/hinten sind ein eigenes Bild mit je 4 Posen.

**Pro Outfit zwei Bilder** (insgesamt 6): Seitenansicht (8 Bilder) und Vorn/Hinten (4 vorn oben, 4 hinten unten).

**Referenzen:** Das saubere Referenzbild `assets/raw/refs_walk/ref_walk_*.png` (vorn, Seite, hinten, hellgrauer Grund) und das Stilbild `ref_03_stil_nudelgasse.png`. Keine alten Sheets als Referenz benutzen.

**Ablauf:** Neuer Chat pro Bild, 16:9, höchste Auflösung. Speichern wie angegeben. Mit **Standard** beginnen.

**Prüfliste vor dem Speichern (30 Sekunden)**
1. Genau 8 Figuren (4 × 2), keine leere Zelle.
2. Bild 1 und Bild 5 haben jeweils das andere Bein vorn.
3. Bild 3 und 7 (Passieren) zeigen ein gestrecktes Standbein und das andere Knie angewinkelt, der Körper ist am höchsten.
4. Keine zwei Bilder sehen gleich aus.
5. Gleiche Größe und gleiche Standlinie.

Wenn etwas nicht stimmt, im selben Chat schreiben, zum Beispiel: „Frames 5 to 8 are copies of frames 1 to 4. Redraw frames 5 to 8 with the opposite leg forward exactly as in the table. Keep frames 1 to 4 unchanged."

---

## 1. Standard: Seitenansicht (8 Bilder, 4 × 2)

- **Speichern als:** `assets/raw/walk8_standard_seite.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_walk/ref_walk_standard.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail.
Image 2 (assets/raw/refs_walk/ref_walk_standard.png): clean design reference of the character PIXEL on a light grey background: front view, side view and back view. Copy the character exactly: face, hair, clothes, colors, proportions, line weight. Do not copy the grey background.
Follow the references closely. Now create the following image.

Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 8 full-body figures of PIXEL in side view walking to the RIGHT (the character faces right), one complete walk cycle of two steps, in a strict grid of 4 columns and 2 rows.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, speed lines, dust, sparkles, smoke, text, numbers, labels, grid lines, frames or speech bubbles.
- Grid: exactly 4 columns and 2 rows, 8 equal cells, reading order left to right then top to bottom. Each figure stands fully inside its own cell, horizontally centered on the cell's center line (centered by the body's middle, not by the feet), with at least 15 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure.
- NO DUPLICATES: every one of the figures must show a DIFFERENT pose. No two cells may contain the same or an almost identical pose. The second half of the sheet (bottom row) must NOT repeat the first half (top row): it shows the opposite leg forward.
- Scale and camera: all figures exactly the same scale and camera distance (full body, no zoom changes). The feet of the standing leg are on the same baseline in every cell (the up and down motion of the body comes only from the pose: bent knees make it lower, a straight standing leg makes it higher; do NOT move the ground line, do NOT make the figure smaller or larger).
- Identity: the same character, the same face, hair, clothes, colors, proportions and line weight in all cells. Only the pose changes. Copy the design from the reference image exactly.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on the character.

CHARACTER: Pixel, her normal outfit: orange puffy jacket with a reflective grey stripe, dark green cargo trousers with side pockets, teal boots with pink soles, a small olive satchel on a strap, teal messy short hair, yellow goggles on the forehead. Side view, facing right, relaxed natural walking style, arms swing in opposition to the legs, the head stays level and looks forward.

HOW TO READ THE TABLE: the angle is the thigh angle against the vertical; plus means toward the direction the character faces (right), minus means backward (left). Follow the angles and knee bends as exactly as you can. The left and the right leg are clearly distinguishable in every cell (for example the leg nearer the camera is the character's LEFT leg).

THE 8 FRAMES, one complete loop (row 1 = first step with the right leg, row 2 = second step with the left leg, everything swapped):
Cell 1 (row 1, column 1): 1 CONTACT, RIGHT leg forward: RIGHT leg +28 degrees forward with the heel on the ground and the toes up; LEFT leg -28 degrees backward with only the toe on the ground and the heel lifted; both knees almost straight; LEFT arm swings forward (+25), RIGHT arm swings back (-25); body slightly low (about 97 percent height).
Cell 2 (row 1, column 2): 2 RECOIL, RIGHT foot flat: RIGHT leg +16 degrees, foot flat on the ground, knee slightly bent; LEFT leg -12 degrees, knee bent 40 degrees, foot lifted off the ground behind; arms moving toward the body (about 12 degrees each); body at its lowest (about 95 percent height), slight forward lean.
Cell 3 (row 1, column 3): 3 PASSING, RIGHT leg planted: RIGHT leg vertical (0 degrees) and straight, carrying all the weight; LEFT leg bent 70 degrees at the knee with the foot passing next to the RIGHT ankle, left thigh +10 degrees; arms almost together next to the body; body at its highest (about 102 percent height).
Cell 4 (row 1, column 4): 4 REACH, LEFT leg swings forward: RIGHT leg -12 degrees, heel lifting, toes pushing off; LEFT leg +24 degrees, knee bent only 25 degrees, foot reaching forward; RIGHT arm starts swinging forward (+12), LEFT arm back (-12); body about 100 percent height.
Cell 5 (row 2, column 1): 5 CONTACT, LEFT leg forward (the legs are SWAPPED compared to frame 1): LEFT leg +28 degrees forward with the heel on the ground and the toes up; RIGHT leg -28 degrees backward with only the toe on the ground and the heel lifted; RIGHT arm swings forward (+25), LEFT arm swings back (-25); body slightly low (about 97 percent height).
Cell 6 (row 2, column 2): 6 RECOIL, LEFT foot flat (SWAPPED compared to frame 2): LEFT leg +16 degrees, foot flat on the ground, knee slightly bent; RIGHT leg -12 degrees, knee bent 40 degrees, foot lifted off the ground behind; arms moving toward the body; body at its lowest (about 95 percent height), slight forward lean.
Cell 7 (row 2, column 3): 7 PASSING, LEFT leg planted (SWAPPED compared to frame 3): LEFT leg vertical (0 degrees) and straight, carrying all the weight; RIGHT leg bent 70 degrees at the knee with the foot passing next to the LEFT ankle; arms almost together; body at its highest (about 102 percent height).
Cell 8 (row 2, column 4): 8 REACH, RIGHT leg swings forward (SWAPPED compared to frame 4): LEFT leg -12 degrees, heel lifting, toes pushing off; RIGHT leg +24 degrees, knee bent only 25 degrees, foot reaching forward; LEFT arm starts swinging forward (+12), RIGHT arm back (-12); the next frame would be frame 1 again, so frame 8 must flow smoothly into frame 1.

IMPORTANT: frames 5, 6, 7 and 8 are NOT copies of frames 1, 2, 3 and 4. Look at which leg is forward: in frame 1 it is the RIGHT leg, in frame 5 it is the LEFT leg. Frame 8 flows smoothly into frame 1 so that the animation loops without a jump. Do not make a stiff march: the knees bend, the torso counter-rotates slightly, hair and jacket hem lag a little (as drawn shapes, not as motion lines).

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 2. Standard: Vorn und hinten (4 + 4 Bilder, 4 × 2)

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
- Nothing except the figures: no shadows, glow, halo, motion lines, speed lines, dust, sparkles, smoke, text, numbers, labels, grid lines, frames or speech bubbles.
- Grid: exactly 4 columns and 2 rows, 8 equal cells, reading order left to right then top to bottom. Each figure stands fully inside its own cell, horizontally centered on the cell's center line (centered by the body's middle, not by the feet), with at least 15 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure.
- NO DUPLICATES: in each row frames 1 and 3 show different legs forward and frames 2 and 4 are the passing poses; the bottom row (back view) is a different view from the top row.
- Scale and camera: all figures exactly the same scale and camera distance (full body, no zoom changes). The feet of the standing leg are on the same baseline in every cell (the up and down motion of the body comes only from the pose: bent knees make it lower, a straight standing leg makes it higher; do NOT move the ground line, do NOT make the figure smaller or larger).
- Identity: the same character, the same face, hair, clothes, colors, proportions and line weight in all cells. Only the pose changes. Copy the design from the reference image exactly.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on the character.

CHARACTER: Pixel, her normal outfit: orange puffy jacket with a reflective grey stripe, dark green cargo trousers with side pockets, teal boots with pink soles, a small olive satchel on a strap, teal messy short hair, yellow goggles on the forehead. Seen straight from the front (top row) and straight from behind (bottom row), a smooth, natural 4-frame walk cycle for each view.

Cell 1 (row 1, column 1): FRONT view, walking toward the camera, step 1 of 4: RIGHT foot forward (toward the camera), weight on the right leg, body leaning slightly to the left, LEFT arm swinging forward.
Cell 2 (row 1, column 2): FRONT view, walking toward the camera, step 2 of 4: feet together passing, body upright and highest, both arms next to the body.
Cell 3 (row 1, column 3): FRONT view, walking toward the camera, step 3 of 4: LEFT foot forward (toward the camera), weight on the left leg, body leaning slightly to the right, RIGHT arm swinging forward.
Cell 4 (row 1, column 4): FRONT view, walking toward the camera, step 4 of 4: feet together passing, body upright and highest, arms next to the body.
Cell 5 (row 2, column 1): BACK view, walking away from the camera, step 1 of 4: RIGHT foot forward seen from behind (it moves away from the camera), the left shoulder dips slightly, LEFT arm swinging forward.
Cell 6 (row 2, column 2): BACK view, walking away from the camera, step 2 of 4: feet together passing, body upright and highest, seen from behind.
Cell 7 (row 2, column 3): BACK view, walking away from the camera, step 3 of 4: LEFT foot forward seen from behind, the right shoulder dips slightly, RIGHT arm swinging forward.
Cell 8 (row 2, column 4): BACK view, walking away from the camera, step 4 of 4: feet together passing, body upright and highest, seen from behind.

The knees bend, the shoulders and hips tilt gently, the arms swing slightly in opposition. Do not change size between frames. Frame 4 flows smoothly into frame 1.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 3. Gala-Look: Seitenansicht (8 Bilder, 4 × 2)

- **Speichern als:** `assets/raw/walk8_gala_seite.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_walk/ref_walk_gala.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail.
Image 2 (assets/raw/refs_walk/ref_walk_gala.png): clean design reference of the character PIXEL on a light grey background: front view, side view and back view. Copy the character exactly: face, hair, clothes, colors, proportions, line weight. Do not copy the grey background.
Follow the references closely. Now create the following image.

Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 8 full-body figures of PIXEL in side view walking to the RIGHT (the character faces right), one complete walk cycle of two steps, in a strict grid of 4 columns and 2 rows.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, speed lines, dust, sparkles, smoke, text, numbers, labels, grid lines, frames or speech bubbles.
- Grid: exactly 4 columns and 2 rows, 8 equal cells, reading order left to right then top to bottom. Each figure stands fully inside its own cell, horizontally centered on the cell's center line (centered by the body's middle, not by the feet), with at least 15 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure.
- NO DUPLICATES: every one of the figures must show a DIFFERENT pose. No two cells may contain the same or an almost identical pose. The second half of the sheet (bottom row) must NOT repeat the first half (top row): it shows the opposite leg forward.
- Scale and camera: all figures exactly the same scale and camera distance (full body, no zoom changes). The feet of the standing leg are on the same baseline in every cell (the up and down motion of the body comes only from the pose: bent knees make it lower, a straight standing leg makes it higher; do NOT move the ground line, do NOT make the figure smaller or larger).
- Identity: the same character, the same face, hair, clothes, colors, proportions and line weight in all cells. Only the pose changes. Copy the design from the reference image exactly.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on the character.

CHARACTER: Pixel, the gala outfit exactly as in the reference image: sparkling teal tailcoat jacket with dark lapels and a teal bow tie over a white shirt, dark green cargo trousers, dark boots with pink soles, styled teal hair, no goggles. Side view, facing right, relaxed natural walking style, arms swing in opposition to the legs, the head stays level and looks forward.

HOW TO READ THE TABLE: the angle is the thigh angle against the vertical; plus means toward the direction the character faces (right), minus means backward (left). Follow the angles and knee bends as exactly as you can. The left and the right leg are clearly distinguishable in every cell (for example the leg nearer the camera is the character's LEFT leg).

THE 8 FRAMES, one complete loop (row 1 = first step with the right leg, row 2 = second step with the left leg, everything swapped):
Cell 1 (row 1, column 1): 1 CONTACT, RIGHT leg forward: RIGHT leg +28 degrees forward with the heel on the ground and the toes up; LEFT leg -28 degrees backward with only the toe on the ground and the heel lifted; both knees almost straight; LEFT arm swings forward (+25), RIGHT arm swings back (-25); body slightly low (about 97 percent height).
Cell 2 (row 1, column 2): 2 RECOIL, RIGHT foot flat: RIGHT leg +16 degrees, foot flat on the ground, knee slightly bent; LEFT leg -12 degrees, knee bent 40 degrees, foot lifted off the ground behind; arms moving toward the body (about 12 degrees each); body at its lowest (about 95 percent height), slight forward lean.
Cell 3 (row 1, column 3): 3 PASSING, RIGHT leg planted: RIGHT leg vertical (0 degrees) and straight, carrying all the weight; LEFT leg bent 70 degrees at the knee with the foot passing next to the RIGHT ankle, left thigh +10 degrees; arms almost together next to the body; body at its highest (about 102 percent height).
Cell 4 (row 1, column 4): 4 REACH, LEFT leg swings forward: RIGHT leg -12 degrees, heel lifting, toes pushing off; LEFT leg +24 degrees, knee bent only 25 degrees, foot reaching forward; RIGHT arm starts swinging forward (+12), LEFT arm back (-12); body about 100 percent height.
Cell 5 (row 2, column 1): 5 CONTACT, LEFT leg forward (the legs are SWAPPED compared to frame 1): LEFT leg +28 degrees forward with the heel on the ground and the toes up; RIGHT leg -28 degrees backward with only the toe on the ground and the heel lifted; RIGHT arm swings forward (+25), LEFT arm swings back (-25); body slightly low (about 97 percent height).
Cell 6 (row 2, column 2): 6 RECOIL, LEFT foot flat (SWAPPED compared to frame 2): LEFT leg +16 degrees, foot flat on the ground, knee slightly bent; RIGHT leg -12 degrees, knee bent 40 degrees, foot lifted off the ground behind; arms moving toward the body; body at its lowest (about 95 percent height), slight forward lean.
Cell 7 (row 2, column 3): 7 PASSING, LEFT leg planted (SWAPPED compared to frame 3): LEFT leg vertical (0 degrees) and straight, carrying all the weight; RIGHT leg bent 70 degrees at the knee with the foot passing next to the LEFT ankle; arms almost together; body at its highest (about 102 percent height).
Cell 8 (row 2, column 4): 8 REACH, RIGHT leg swings forward (SWAPPED compared to frame 4): LEFT leg -12 degrees, heel lifting, toes pushing off; RIGHT leg +24 degrees, knee bent only 25 degrees, foot reaching forward; LEFT arm starts swinging forward (+12), RIGHT arm back (-12); the next frame would be frame 1 again, so frame 8 must flow smoothly into frame 1.

IMPORTANT: frames 5, 6, 7 and 8 are NOT copies of frames 1, 2, 3 and 4. Look at which leg is forward: in frame 1 it is the RIGHT leg, in frame 5 it is the LEFT leg. Frame 8 flows smoothly into frame 1 so that the animation loops without a jump. Do not make a stiff march: the knees bend, the torso counter-rotates slightly, hair and jacket hem lag a little (as drawn shapes, not as motion lines).

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 4. Gala-Look: Vorn und hinten (4 + 4 Bilder, 4 × 2)

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
- Nothing except the figures: no shadows, glow, halo, motion lines, speed lines, dust, sparkles, smoke, text, numbers, labels, grid lines, frames or speech bubbles.
- Grid: exactly 4 columns and 2 rows, 8 equal cells, reading order left to right then top to bottom. Each figure stands fully inside its own cell, horizontally centered on the cell's center line (centered by the body's middle, not by the feet), with at least 15 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure.
- NO DUPLICATES: in each row frames 1 and 3 show different legs forward and frames 2 and 4 are the passing poses; the bottom row (back view) is a different view from the top row.
- Scale and camera: all figures exactly the same scale and camera distance (full body, no zoom changes). The feet of the standing leg are on the same baseline in every cell (the up and down motion of the body comes only from the pose: bent knees make it lower, a straight standing leg makes it higher; do NOT move the ground line, do NOT make the figure smaller or larger).
- Identity: the same character, the same face, hair, clothes, colors, proportions and line weight in all cells. Only the pose changes. Copy the design from the reference image exactly.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on the character.

CHARACTER: Pixel, the gala outfit exactly as in the reference image: sparkling teal tailcoat jacket with dark lapels and a teal bow tie over a white shirt, dark green cargo trousers, dark boots with pink soles, styled teal hair, no goggles. Seen straight from the front (top row) and straight from behind (bottom row), a smooth, natural 4-frame walk cycle for each view.

Cell 1 (row 1, column 1): FRONT view, walking toward the camera, step 1 of 4: RIGHT foot forward (toward the camera), weight on the right leg, body leaning slightly to the left, LEFT arm swinging forward.
Cell 2 (row 1, column 2): FRONT view, walking toward the camera, step 2 of 4: feet together passing, body upright and highest, both arms next to the body.
Cell 3 (row 1, column 3): FRONT view, walking toward the camera, step 3 of 4: LEFT foot forward (toward the camera), weight on the left leg, body leaning slightly to the right, RIGHT arm swinging forward.
Cell 4 (row 1, column 4): FRONT view, walking toward the camera, step 4 of 4: feet together passing, body upright and highest, arms next to the body.
Cell 5 (row 2, column 1): BACK view, walking away from the camera, step 1 of 4: RIGHT foot forward seen from behind (it moves away from the camera), the left shoulder dips slightly, LEFT arm swinging forward.
Cell 6 (row 2, column 2): BACK view, walking away from the camera, step 2 of 4: feet together passing, body upright and highest, seen from behind.
Cell 7 (row 2, column 3): BACK view, walking away from the camera, step 3 of 4: LEFT foot forward seen from behind, the right shoulder dips slightly, RIGHT arm swinging forward.
Cell 8 (row 2, column 4): BACK view, walking away from the camera, step 4 of 4: feet together passing, body upright and highest, seen from behind.

The knees bend, the shoulders and hips tilt gently, the arms swing slightly in opposition. Do not change size between frames. Frame 4 flows smoothly into frame 1.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 5. Raumanzug: Seitenansicht (8 Bilder, 4 × 2)

- **Speichern als:** `assets/raw/walk8_raumanzug_seite.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_walk/ref_walk_raumanzug.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail.
Image 2 (assets/raw/refs_walk/ref_walk_raumanzug.png): clean design reference of the character PIXEL on a light grey background: front view, side view and back view. Copy the character exactly: face, hair, clothes, colors, proportions, line weight. Do not copy the grey background.
Follow the references closely. Now create the following image.

Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 8 full-body figures of PIXEL in side view walking to the RIGHT (the character faces right), one complete walk cycle of two steps, in a strict grid of 4 columns and 2 rows.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, speed lines, dust, sparkles, smoke, text, numbers, labels, grid lines, frames or speech bubbles.
- Grid: exactly 4 columns and 2 rows, 8 equal cells, reading order left to right then top to bottom. Each figure stands fully inside its own cell, horizontally centered on the cell's center line (centered by the body's middle, not by the feet), with at least 15 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure.
- NO DUPLICATES: every one of the figures must show a DIFFERENT pose. No two cells may contain the same or an almost identical pose. The second half of the sheet (bottom row) must NOT repeat the first half (top row): it shows the opposite leg forward.
- Scale and camera: all figures exactly the same scale and camera distance (full body, no zoom changes). The feet of the standing leg are on the same baseline in every cell (the up and down motion of the body comes only from the pose: bent knees make it lower, a straight standing leg makes it higher; do NOT move the ground line, do NOT make the figure smaller or larger).
- Identity: the same character, the same face, hair, clothes, colors, proportions and line weight in all cells. Only the pose changes. Copy the design from the reference image exactly.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on the character.

CHARACTER: Pixel, the space-suit outfit exactly as in the reference image: silver-grey space suit with pink hoses and a chest control panel, a backpack with pink hoses, silver boots and gloves, and a clear glass bubble helmet around the head with the goggles visible inside. Side view, facing right, relaxed natural walking style, arms swing in opposition to the legs, the head stays level and looks forward.

HOW TO READ THE TABLE: the angle is the thigh angle against the vertical; plus means toward the direction the character faces (right), minus means backward (left). Follow the angles and knee bends as exactly as you can. The left and the right leg are clearly distinguishable in every cell (for example the leg nearer the camera is the character's LEFT leg).

THE 8 FRAMES, one complete loop (row 1 = first step with the right leg, row 2 = second step with the left leg, everything swapped):
Cell 1 (row 1, column 1): 1 CONTACT, RIGHT leg forward: RIGHT leg +28 degrees forward with the heel on the ground and the toes up; LEFT leg -28 degrees backward with only the toe on the ground and the heel lifted; both knees almost straight; LEFT arm swings forward (+25), RIGHT arm swings back (-25); body slightly low (about 97 percent height).
Cell 2 (row 1, column 2): 2 RECOIL, RIGHT foot flat: RIGHT leg +16 degrees, foot flat on the ground, knee slightly bent; LEFT leg -12 degrees, knee bent 40 degrees, foot lifted off the ground behind; arms moving toward the body (about 12 degrees each); body at its lowest (about 95 percent height), slight forward lean.
Cell 3 (row 1, column 3): 3 PASSING, RIGHT leg planted: RIGHT leg vertical (0 degrees) and straight, carrying all the weight; LEFT leg bent 70 degrees at the knee with the foot passing next to the RIGHT ankle, left thigh +10 degrees; arms almost together next to the body; body at its highest (about 102 percent height).
Cell 4 (row 1, column 4): 4 REACH, LEFT leg swings forward: RIGHT leg -12 degrees, heel lifting, toes pushing off; LEFT leg +24 degrees, knee bent only 25 degrees, foot reaching forward; RIGHT arm starts swinging forward (+12), LEFT arm back (-12); body about 100 percent height.
Cell 5 (row 2, column 1): 5 CONTACT, LEFT leg forward (the legs are SWAPPED compared to frame 1): LEFT leg +28 degrees forward with the heel on the ground and the toes up; RIGHT leg -28 degrees backward with only the toe on the ground and the heel lifted; RIGHT arm swings forward (+25), LEFT arm swings back (-25); body slightly low (about 97 percent height).
Cell 6 (row 2, column 2): 6 RECOIL, LEFT foot flat (SWAPPED compared to frame 2): LEFT leg +16 degrees, foot flat on the ground, knee slightly bent; RIGHT leg -12 degrees, knee bent 40 degrees, foot lifted off the ground behind; arms moving toward the body; body at its lowest (about 95 percent height), slight forward lean.
Cell 7 (row 2, column 3): 7 PASSING, LEFT leg planted (SWAPPED compared to frame 3): LEFT leg vertical (0 degrees) and straight, carrying all the weight; RIGHT leg bent 70 degrees at the knee with the foot passing next to the LEFT ankle; arms almost together; body at its highest (about 102 percent height).
Cell 8 (row 2, column 4): 8 REACH, RIGHT leg swings forward (SWAPPED compared to frame 4): LEFT leg -12 degrees, heel lifting, toes pushing off; RIGHT leg +24 degrees, knee bent only 25 degrees, foot reaching forward; LEFT arm starts swinging forward (+12), RIGHT arm back (-12); the next frame would be frame 1 again, so frame 8 must flow smoothly into frame 1.

IMPORTANT: frames 5, 6, 7 and 8 are NOT copies of frames 1, 2, 3 and 4. Look at which leg is forward: in frame 1 it is the RIGHT leg, in frame 5 it is the LEFT leg. Frame 8 flows smoothly into frame 1 so that the animation loops without a jump. Do not make a stiff march: the knees bend, the torso counter-rotates slightly, hair and jacket hem lag a little (as drawn shapes, not as motion lines).

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 6. Raumanzug: Vorn und hinten (4 + 4 Bilder, 4 × 2)

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
- Nothing except the figures: no shadows, glow, halo, motion lines, speed lines, dust, sparkles, smoke, text, numbers, labels, grid lines, frames or speech bubbles.
- Grid: exactly 4 columns and 2 rows, 8 equal cells, reading order left to right then top to bottom. Each figure stands fully inside its own cell, horizontally centered on the cell's center line (centered by the body's middle, not by the feet), with at least 15 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure.
- NO DUPLICATES: in each row frames 1 and 3 show different legs forward and frames 2 and 4 are the passing poses; the bottom row (back view) is a different view from the top row.
- Scale and camera: all figures exactly the same scale and camera distance (full body, no zoom changes). The feet of the standing leg are on the same baseline in every cell (the up and down motion of the body comes only from the pose: bent knees make it lower, a straight standing leg makes it higher; do NOT move the ground line, do NOT make the figure smaller or larger).
- Identity: the same character, the same face, hair, clothes, colors, proportions and line weight in all cells. Only the pose changes. Copy the design from the reference image exactly.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on the character.

CHARACTER: Pixel, the space-suit outfit exactly as in the reference image: silver-grey space suit with pink hoses and a chest control panel, a backpack with pink hoses, silver boots and gloves, and a clear glass bubble helmet around the head with the goggles visible inside. Seen straight from the front (top row) and straight from behind (bottom row), a smooth, natural 4-frame walk cycle for each view.

Cell 1 (row 1, column 1): FRONT view, walking toward the camera, step 1 of 4: RIGHT foot forward (toward the camera), weight on the right leg, body leaning slightly to the left, LEFT arm swinging forward.
Cell 2 (row 1, column 2): FRONT view, walking toward the camera, step 2 of 4: feet together passing, body upright and highest, both arms next to the body.
Cell 3 (row 1, column 3): FRONT view, walking toward the camera, step 3 of 4: LEFT foot forward (toward the camera), weight on the left leg, body leaning slightly to the right, RIGHT arm swinging forward.
Cell 4 (row 1, column 4): FRONT view, walking toward the camera, step 4 of 4: feet together passing, body upright and highest, arms next to the body.
Cell 5 (row 2, column 1): BACK view, walking away from the camera, step 1 of 4: RIGHT foot forward seen from behind (it moves away from the camera), the left shoulder dips slightly, LEFT arm swinging forward.
Cell 6 (row 2, column 2): BACK view, walking away from the camera, step 2 of 4: feet together passing, body upright and highest, seen from behind.
Cell 7 (row 2, column 3): BACK view, walking away from the camera, step 3 of 4: LEFT foot forward seen from behind, the right shoulder dips slightly, RIGHT arm swinging forward.
Cell 8 (row 2, column 4): BACK view, walking away from the camera, step 4 of 4: feet together passing, body upright and highest, seen from behind.

The knees bend, the shoulders and hips tilt gently, the arms swing slightly in opposition. Do not change size between frames. Frame 4 flows smoothly into frame 1.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```
