# Pixel: flüssiger Laufzyklus mit 12 Bildern

**Warum ein neuer Versuch:** Der Zyklus aus 8 Bildern ruckelt, weil zwischen den Bildern große Sprünge liegen (Beinwechsel in einem Schritt) und die Figur im Bildrahmen leicht verrutscht. Jetzt sind es **12 Bilder pro Doppelschritt** (vorher 8), jede Phase ist einzeln beschrieben (Aufsetzen, Einfedern, Tiefpunkt, Durchschwingen, Höhepunkt, Strecken) und die Körperhöhe wechselt gleichmäßig. Dazu kommen 6 Bilder von vorn und 6 von hinten.

**Pro Outfit zwei Bilder**
1. **Seite:** 12 Bilder, Raster 4 Spalten × 3 Reihen, Reihenfolge links nach rechts, oben nach unten.
2. **Vorn und hinten:** 12 Bilder, Raster 6 Spalten × 2 Reihen (obere Reihe von vorn, untere von hinten).

Das macht 6 Bilder insgesamt. Bei weniger Raster pro Bild ist die Fehlerquote bei der KI deutlich geringer als bei einem 4×4- oder 8×3-Raster.

**Referenzen:** Zu jedem Outfit gibt es ein sauberes Referenzbild aus den Spielfiguren (`assets/raw/refs_walk/ref_walk_*.png`: vorn, Seite, hinten auf hellgrauem Grund, ohne Grün) und das Stilbild `ref_03_stil_nudelgasse.png`. Bitte keine alten Sheets als Referenz verwenden, die enthalten Fehler.

**Ablauf:** Neuer Chat pro Bild, 16:9, höchste Auflösung. Speichern wie angegeben. Sag Bescheid, ich schneide aus (`tools/slice_walk.py`, richte ich für 12 Bilder ein) und baue es ein. Bei Fehlern im selben Chat: „Only the listed frames, same size, same baseline, remove everything else“. Mit **Standard** beginnen.

---

## 1. Standard: Seitenansicht (12 Bilder, 4 × 3)

- **Speichern als:** `assets/raw/walk12_standard_seite.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_walk/ref_walk_standard.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail.
Image 2 (assets/raw/refs_walk/ref_walk_standard.png): clean design reference of the character PIXEL on a light grey background: front view, side view and back view. Copy the character exactly: face, hair, clothes, colors, proportions, line weight. Do not copy the grey background.
Follow the references closely. Now create the following image.

Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 12 full-body figures of PIXEL in side view walking to the RIGHT (the character faces right), a smooth, natural 12-frame walk cycle, in a strict grid of 4 columns and 3 rows.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, speed lines, dust, sparkles, smoke, text, numbers, labels, grid lines, frames or speech bubbles.
- Grid: exactly the stated number of columns and rows with equal cells, reading order left to right then top to bottom. Each figure stands fully inside its own cell, horizontally centered on the cell's center line (centered by the body's middle, not by the feet), with at least 15 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure, no cell is empty or repeated.
- Scale and camera: all figures are exactly the same scale and the same camera distance (full body, no zoom changes between frames), the baseline of the feet is the same line in every cell of a row (the figure's up and down motion comes only from the pose: bent knees make it lower, a straight standing leg makes it higher; do NOT shift the ground line). Pixel's standing height is the same in all cells; frames marked with a body-height percentage are that percent of the standing height.
- Identity: the same character, the same face, hair, clothes, colors, proportions and line weight in all cells. Only the pose changes. Copy the design from the reference image exactly.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on the character.

CHARACTER: Pixel, her normal outfit: orange puffy jacket with a reflective grey stripe, dark green cargo trousers with side pockets, teal boots with pink soles, a small olive satchel on a strap, teal messy short hair, yellow goggles on the forehead. Side view, facing right, relaxed natural walking style, the arms swing in opposition to the legs, the head stays level and looks forward.

THE 12 FRAMES (reading order; the walk is a continuous loop and the difference between neighbouring frames is small and smooth, like consecutive frames of a hand-animated walk cycle):
1. CONTACT right, body height 97 percent: right heel hits the ground far in front with the toes up, left leg stretched far behind with only the toe touching, widest stride, body lowest; left arm forward, right arm back.
2. RECOIL right, body height 96 percent: right foot comes down flat, right knee slightly bent and taking the weight, left heel rising off the ground, left toe still on the ground; arms swinging toward the body.
3. DOWN right, body height 95 percent: right foot flat under the front of the body, knee bent a little more, left leg lifted and starting to swing forward with the knee bent, body at its absolute lowest, slight forward lean.
4. PASSING right, body height 100 percent: right leg straight and vertical carrying all the weight, left leg bent with the foot passing close to the right ankle and the knee higher, body rising, arms both near the body.
5. HIGH right, body height 102 percent: body at its absolute highest, right heel lifting, right toe pushing off, left leg swinging forward and straightening, left knee still bent, arms opening again (right arm swinging forward, left arm back).
6. REACH left, body height 100 percent: left leg fully extended forward, heel about to touch down, right leg behind with the toe on the ground, body descending; right arm forward, left arm back.
7. CONTACT left, body height 97 percent: left heel hits the ground far in front with the toes up, right leg stretched far behind with only the toe touching, widest stride, body lowest; right arm forward, left arm back (mirror of frame 1).
8. RECOIL left, body height 96 percent: left foot comes down flat, left knee slightly bent and taking the weight, right heel rising off the ground; arms swinging toward the body.
9. DOWN left, body height 95 percent: left foot flat under the front of the body, knee bent more, right leg lifted and starting to swing forward, body at its lowest, slight forward lean.
10. PASSING left, body height 100 percent: left leg straight and vertical carrying all the weight, right leg bent with the foot passing close to the left ankle, body rising, arms near the body.
11. HIGH left, body height 102 percent: body at its absolute highest, left heel lifting, left toe pushing off, right leg swinging forward and straightening, arms opening (left arm forward, right arm back).
12. REACH right, body height 100 percent: right leg fully extended forward, heel about to touch down, left leg behind with the toe on the ground, body descending; left arm forward, right arm back; the next frame is frame 1 again, so the loop must be seamless.

IMPORTANT: neighbouring frames must differ only slightly (a smooth progression), but frames 1, 4, 7 and 10 (contact and passing) must be clearly distinct from each other. Frame 12 flows smoothly into frame 1. Do NOT make a stiff march: the knees bend, the torso counter-rotates slightly, the hair and jacket hem lag a little behind (as drawn shapes, not as motion lines).

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 2. Standard: Vorn und hinten (12 Bilder, 6 × 2)

- **Speichern als:** `assets/raw/walk12_standard_vorn_hinten.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_walk/ref_walk_standard.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail.
Image 2 (assets/raw/refs_walk/ref_walk_standard.png): clean design reference of the character PIXEL on a light grey background: front view, side view and back view. Copy the character exactly: face, hair, clothes, colors, proportions, line weight. Do not copy the grey background.
Follow the references closely. Now create the following image.

Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 12 full-body figures of PIXEL, in a strict grid of 6 columns and 2 rows: the top row shows the front view walking toward the camera (6 frames), the bottom row shows the back view walking away (6 frames).

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, speed lines, dust, sparkles, smoke, text, numbers, labels, grid lines, frames or speech bubbles.
- Grid: 6 columns and 2 rows with equal cells, reading order left to right then top to bottom. Each figure stands fully inside its own cell, horizontally centered on the cell's center line (centered by the body's middle, not by the feet), with at least 15 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure, no cell is empty or repeated.
- Scale and camera: all figures are exactly the same scale and the same camera distance (full body, no zoom changes between frames), the baseline of the feet is the same line in every cell of a row (the figure's up and down motion comes only from the pose: bent knees make it lower, a straight standing leg makes it higher; do NOT shift the ground line). Pixel's standing height is the same in all cells; frames marked with a body-height percentage are that percent of the standing height.
- Identity: the same character, the same face, hair, clothes, colors, proportions and line weight in all cells. Only the pose changes. Copy the design from the reference image exactly.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on the character.

CHARACTER: Pixel, her normal outfit: orange puffy jacket with a reflective grey stripe, dark green cargo trousers with side pockets, teal boots with pink soles, a small olive satchel on a strap, teal messy short hair, yellow goggles on the forehead. Seen straight from the front (top row) and straight from behind (bottom row), a smooth, natural 6-frame walk cycle for each (a half-cycle each that is mirrored in the game, so the first and the last frame must look like left/right mirror images of a continuing step).

Row 1, column 1: FRONT view, walking toward the camera, step 1 of 6: right foot forward, weight on the right, body leaning slightly to the left, left arm swinging forward.
Row 1, column 2: FRONT view, walking toward the camera, step 2 of 6: right foot planted, left leg lifting, body rising, arms near the body.
Row 1, column 3: FRONT view, walking toward the camera, step 3 of 6: feet together passing, body upright and highest.
Row 1, column 4: FRONT view, walking toward the camera, step 4 of 6: left foot lifting off the ground and moving forward, body lowering slightly.
Row 1, column 5: FRONT view, walking toward the camera, step 5 of 6: left foot forward, weight on the left, body leaning slightly to the right, right arm swinging forward.
Row 1, column 6: FRONT view, walking toward the camera, step 6 of 6: left foot planted, right leg lifting, body rising, arms near the body.
Row 2, column 1: BACK view, walking away from the camera, step 1 of 6: right foot forward seen from behind, the left shoulder dips slightly, left arm swinging forward.
Row 2, column 2: BACK view, walking away from the camera, step 2 of 6: right foot planted, left leg lifting, body rising.
Row 2, column 3: BACK view, walking away from the camera, step 3 of 6: feet together passing, body upright and highest, seen from behind.
Row 2, column 4: BACK view, walking away from the camera, step 4 of 6: left foot lifting and moving forward, body lowering slightly.
Row 2, column 5: BACK view, walking away from the camera, step 5 of 6: left foot forward seen from behind, the right shoulder dips slightly, right arm swinging forward.
Row 2, column 6: BACK view, walking away from the camera, step 6 of 6: left foot planted, right leg lifting, body rising.

The differences between neighbouring frames are small and smooth; the knees bend, the shoulders and hips tilt gently, the arms swing slightly in opposition. Do not change size between frames.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 3. Gala-Look: Seitenansicht (12 Bilder, 4 × 3)

- **Speichern als:** `assets/raw/walk12_gala_seite.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_walk/ref_walk_gala.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail.
Image 2 (assets/raw/refs_walk/ref_walk_gala.png): clean design reference of the character PIXEL on a light grey background: front view, side view and back view. Copy the character exactly: face, hair, clothes, colors, proportions, line weight. Do not copy the grey background.
Follow the references closely. Now create the following image.

Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 12 full-body figures of PIXEL in side view walking to the RIGHT (the character faces right), a smooth, natural 12-frame walk cycle, in a strict grid of 4 columns and 3 rows.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, speed lines, dust, sparkles, smoke, text, numbers, labels, grid lines, frames or speech bubbles.
- Grid: exactly the stated number of columns and rows with equal cells, reading order left to right then top to bottom. Each figure stands fully inside its own cell, horizontally centered on the cell's center line (centered by the body's middle, not by the feet), with at least 15 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure, no cell is empty or repeated.
- Scale and camera: all figures are exactly the same scale and the same camera distance (full body, no zoom changes between frames), the baseline of the feet is the same line in every cell of a row (the figure's up and down motion comes only from the pose: bent knees make it lower, a straight standing leg makes it higher; do NOT shift the ground line). Pixel's standing height is the same in all cells; frames marked with a body-height percentage are that percent of the standing height.
- Identity: the same character, the same face, hair, clothes, colors, proportions and line weight in all cells. Only the pose changes. Copy the design from the reference image exactly.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on the character.

CHARACTER: Pixel, the gala outfit exactly as in the reference image: sparkling teal tailcoat jacket with dark lapels and a teal bow tie over a white shirt, dark green cargo trousers, dark boots with pink soles, styled teal hair, no goggles. Side view, facing right, relaxed natural walking style, the arms swing in opposition to the legs, the head stays level and looks forward.

THE 12 FRAMES (reading order; the walk is a continuous loop and the difference between neighbouring frames is small and smooth, like consecutive frames of a hand-animated walk cycle):
1. CONTACT right, body height 97 percent: right heel hits the ground far in front with the toes up, left leg stretched far behind with only the toe touching, widest stride, body lowest; left arm forward, right arm back.
2. RECOIL right, body height 96 percent: right foot comes down flat, right knee slightly bent and taking the weight, left heel rising off the ground, left toe still on the ground; arms swinging toward the body.
3. DOWN right, body height 95 percent: right foot flat under the front of the body, knee bent a little more, left leg lifted and starting to swing forward with the knee bent, body at its absolute lowest, slight forward lean.
4. PASSING right, body height 100 percent: right leg straight and vertical carrying all the weight, left leg bent with the foot passing close to the right ankle and the knee higher, body rising, arms both near the body.
5. HIGH right, body height 102 percent: body at its absolute highest, right heel lifting, right toe pushing off, left leg swinging forward and straightening, left knee still bent, arms opening again (right arm swinging forward, left arm back).
6. REACH left, body height 100 percent: left leg fully extended forward, heel about to touch down, right leg behind with the toe on the ground, body descending; right arm forward, left arm back.
7. CONTACT left, body height 97 percent: left heel hits the ground far in front with the toes up, right leg stretched far behind with only the toe touching, widest stride, body lowest; right arm forward, left arm back (mirror of frame 1).
8. RECOIL left, body height 96 percent: left foot comes down flat, left knee slightly bent and taking the weight, right heel rising off the ground; arms swinging toward the body.
9. DOWN left, body height 95 percent: left foot flat under the front of the body, knee bent more, right leg lifted and starting to swing forward, body at its lowest, slight forward lean.
10. PASSING left, body height 100 percent: left leg straight and vertical carrying all the weight, right leg bent with the foot passing close to the left ankle, body rising, arms near the body.
11. HIGH left, body height 102 percent: body at its absolute highest, left heel lifting, left toe pushing off, right leg swinging forward and straightening, arms opening (left arm forward, right arm back).
12. REACH right, body height 100 percent: right leg fully extended forward, heel about to touch down, left leg behind with the toe on the ground, body descending; left arm forward, right arm back; the next frame is frame 1 again, so the loop must be seamless.

IMPORTANT: neighbouring frames must differ only slightly (a smooth progression), but frames 1, 4, 7 and 10 (contact and passing) must be clearly distinct from each other. Frame 12 flows smoothly into frame 1. Do NOT make a stiff march: the knees bend, the torso counter-rotates slightly, the hair and jacket hem lag a little behind (as drawn shapes, not as motion lines).

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 4. Gala-Look: Vorn und hinten (12 Bilder, 6 × 2)

- **Speichern als:** `assets/raw/walk12_gala_vorn_hinten.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_walk/ref_walk_gala.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail.
Image 2 (assets/raw/refs_walk/ref_walk_gala.png): clean design reference of the character PIXEL on a light grey background: front view, side view and back view. Copy the character exactly: face, hair, clothes, colors, proportions, line weight. Do not copy the grey background.
Follow the references closely. Now create the following image.

Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 12 full-body figures of PIXEL, in a strict grid of 6 columns and 2 rows: the top row shows the front view walking toward the camera (6 frames), the bottom row shows the back view walking away (6 frames).

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, speed lines, dust, sparkles, smoke, text, numbers, labels, grid lines, frames or speech bubbles.
- Grid: 6 columns and 2 rows with equal cells, reading order left to right then top to bottom. Each figure stands fully inside its own cell, horizontally centered on the cell's center line (centered by the body's middle, not by the feet), with at least 15 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure, no cell is empty or repeated.
- Scale and camera: all figures are exactly the same scale and the same camera distance (full body, no zoom changes between frames), the baseline of the feet is the same line in every cell of a row (the figure's up and down motion comes only from the pose: bent knees make it lower, a straight standing leg makes it higher; do NOT shift the ground line). Pixel's standing height is the same in all cells; frames marked with a body-height percentage are that percent of the standing height.
- Identity: the same character, the same face, hair, clothes, colors, proportions and line weight in all cells. Only the pose changes. Copy the design from the reference image exactly.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on the character.

CHARACTER: Pixel, the gala outfit exactly as in the reference image: sparkling teal tailcoat jacket with dark lapels and a teal bow tie over a white shirt, dark green cargo trousers, dark boots with pink soles, styled teal hair, no goggles. Seen straight from the front (top row) and straight from behind (bottom row), a smooth, natural 6-frame walk cycle for each (a half-cycle each that is mirrored in the game, so the first and the last frame must look like left/right mirror images of a continuing step).

Row 1, column 1: FRONT view, walking toward the camera, step 1 of 6: right foot forward, weight on the right, body leaning slightly to the left, left arm swinging forward.
Row 1, column 2: FRONT view, walking toward the camera, step 2 of 6: right foot planted, left leg lifting, body rising, arms near the body.
Row 1, column 3: FRONT view, walking toward the camera, step 3 of 6: feet together passing, body upright and highest.
Row 1, column 4: FRONT view, walking toward the camera, step 4 of 6: left foot lifting off the ground and moving forward, body lowering slightly.
Row 1, column 5: FRONT view, walking toward the camera, step 5 of 6: left foot forward, weight on the left, body leaning slightly to the right, right arm swinging forward.
Row 1, column 6: FRONT view, walking toward the camera, step 6 of 6: left foot planted, right leg lifting, body rising, arms near the body.
Row 2, column 1: BACK view, walking away from the camera, step 1 of 6: right foot forward seen from behind, the left shoulder dips slightly, left arm swinging forward.
Row 2, column 2: BACK view, walking away from the camera, step 2 of 6: right foot planted, left leg lifting, body rising.
Row 2, column 3: BACK view, walking away from the camera, step 3 of 6: feet together passing, body upright and highest, seen from behind.
Row 2, column 4: BACK view, walking away from the camera, step 4 of 6: left foot lifting and moving forward, body lowering slightly.
Row 2, column 5: BACK view, walking away from the camera, step 5 of 6: left foot forward seen from behind, the right shoulder dips slightly, right arm swinging forward.
Row 2, column 6: BACK view, walking away from the camera, step 6 of 6: left foot planted, right leg lifting, body rising.

The differences between neighbouring frames are small and smooth; the knees bend, the shoulders and hips tilt gently, the arms swing slightly in opposition. Do not change size between frames.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 5. Raumanzug: Seitenansicht (12 Bilder, 4 × 3)

- **Speichern als:** `assets/raw/walk12_raumanzug_seite.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_walk/ref_walk_raumanzug.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail.
Image 2 (assets/raw/refs_walk/ref_walk_raumanzug.png): clean design reference of the character PIXEL on a light grey background: front view, side view and back view. Copy the character exactly: face, hair, clothes, colors, proportions, line weight. Do not copy the grey background.
Follow the references closely. Now create the following image.

Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 12 full-body figures of PIXEL in side view walking to the RIGHT (the character faces right), a smooth, natural 12-frame walk cycle, in a strict grid of 4 columns and 3 rows.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, speed lines, dust, sparkles, smoke, text, numbers, labels, grid lines, frames or speech bubbles.
- Grid: exactly the stated number of columns and rows with equal cells, reading order left to right then top to bottom. Each figure stands fully inside its own cell, horizontally centered on the cell's center line (centered by the body's middle, not by the feet), with at least 15 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure, no cell is empty or repeated.
- Scale and camera: all figures are exactly the same scale and the same camera distance (full body, no zoom changes between frames), the baseline of the feet is the same line in every cell of a row (the figure's up and down motion comes only from the pose: bent knees make it lower, a straight standing leg makes it higher; do NOT shift the ground line). Pixel's standing height is the same in all cells; frames marked with a body-height percentage are that percent of the standing height.
- Identity: the same character, the same face, hair, clothes, colors, proportions and line weight in all cells. Only the pose changes. Copy the design from the reference image exactly.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on the character.

CHARACTER: Pixel, the space-suit outfit exactly as in the reference image: silver-grey space suit with pink hoses and a chest control panel, a backpack with pink hoses, silver boots and gloves, and a clear glass bubble helmet around the head with the goggles visible inside. Side view, facing right, relaxed natural walking style, the arms swing in opposition to the legs, the head stays level and looks forward.

THE 12 FRAMES (reading order; the walk is a continuous loop and the difference between neighbouring frames is small and smooth, like consecutive frames of a hand-animated walk cycle):
1. CONTACT right, body height 97 percent: right heel hits the ground far in front with the toes up, left leg stretched far behind with only the toe touching, widest stride, body lowest; left arm forward, right arm back.
2. RECOIL right, body height 96 percent: right foot comes down flat, right knee slightly bent and taking the weight, left heel rising off the ground, left toe still on the ground; arms swinging toward the body.
3. DOWN right, body height 95 percent: right foot flat under the front of the body, knee bent a little more, left leg lifted and starting to swing forward with the knee bent, body at its absolute lowest, slight forward lean.
4. PASSING right, body height 100 percent: right leg straight and vertical carrying all the weight, left leg bent with the foot passing close to the right ankle and the knee higher, body rising, arms both near the body.
5. HIGH right, body height 102 percent: body at its absolute highest, right heel lifting, right toe pushing off, left leg swinging forward and straightening, left knee still bent, arms opening again (right arm swinging forward, left arm back).
6. REACH left, body height 100 percent: left leg fully extended forward, heel about to touch down, right leg behind with the toe on the ground, body descending; right arm forward, left arm back.
7. CONTACT left, body height 97 percent: left heel hits the ground far in front with the toes up, right leg stretched far behind with only the toe touching, widest stride, body lowest; right arm forward, left arm back (mirror of frame 1).
8. RECOIL left, body height 96 percent: left foot comes down flat, left knee slightly bent and taking the weight, right heel rising off the ground; arms swinging toward the body.
9. DOWN left, body height 95 percent: left foot flat under the front of the body, knee bent more, right leg lifted and starting to swing forward, body at its lowest, slight forward lean.
10. PASSING left, body height 100 percent: left leg straight and vertical carrying all the weight, right leg bent with the foot passing close to the left ankle, body rising, arms near the body.
11. HIGH left, body height 102 percent: body at its absolute highest, left heel lifting, left toe pushing off, right leg swinging forward and straightening, arms opening (left arm forward, right arm back).
12. REACH right, body height 100 percent: right leg fully extended forward, heel about to touch down, left leg behind with the toe on the ground, body descending; left arm forward, right arm back; the next frame is frame 1 again, so the loop must be seamless.

IMPORTANT: neighbouring frames must differ only slightly (a smooth progression), but frames 1, 4, 7 and 10 (contact and passing) must be clearly distinct from each other. Frame 12 flows smoothly into frame 1. Do NOT make a stiff march: the knees bend, the torso counter-rotates slightly, the hair and jacket hem lag a little behind (as drawn shapes, not as motion lines).

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 6. Raumanzug: Vorn und hinten (12 Bilder, 6 × 2)

- **Speichern als:** `assets/raw/walk12_raumanzug_vorn_hinten.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_walk/ref_walk_raumanzug.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail.
Image 2 (assets/raw/refs_walk/ref_walk_raumanzug.png): clean design reference of the character PIXEL on a light grey background: front view, side view and back view. Copy the character exactly: face, hair, clothes, colors, proportions, line weight. Do not copy the grey background.
Follow the references closely. Now create the following image.

Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 12 full-body figures of PIXEL, in a strict grid of 6 columns and 2 rows: the top row shows the front view walking toward the camera (6 frames), the bottom row shows the back view walking away (6 frames).

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, speed lines, dust, sparkles, smoke, text, numbers, labels, grid lines, frames or speech bubbles.
- Grid: 6 columns and 2 rows with equal cells, reading order left to right then top to bottom. Each figure stands fully inside its own cell, horizontally centered on the cell's center line (centered by the body's middle, not by the feet), with at least 15 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure, no cell is empty or repeated.
- Scale and camera: all figures are exactly the same scale and the same camera distance (full body, no zoom changes between frames), the baseline of the feet is the same line in every cell of a row (the figure's up and down motion comes only from the pose: bent knees make it lower, a straight standing leg makes it higher; do NOT shift the ground line). Pixel's standing height is the same in all cells; frames marked with a body-height percentage are that percent of the standing height.
- Identity: the same character, the same face, hair, clothes, colors, proportions and line weight in all cells. Only the pose changes. Copy the design from the reference image exactly.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on the character.

CHARACTER: Pixel, the space-suit outfit exactly as in the reference image: silver-grey space suit with pink hoses and a chest control panel, a backpack with pink hoses, silver boots and gloves, and a clear glass bubble helmet around the head with the goggles visible inside. Seen straight from the front (top row) and straight from behind (bottom row), a smooth, natural 6-frame walk cycle for each (a half-cycle each that is mirrored in the game, so the first and the last frame must look like left/right mirror images of a continuing step).

Row 1, column 1: FRONT view, walking toward the camera, step 1 of 6: right foot forward, weight on the right, body leaning slightly to the left, left arm swinging forward.
Row 1, column 2: FRONT view, walking toward the camera, step 2 of 6: right foot planted, left leg lifting, body rising, arms near the body.
Row 1, column 3: FRONT view, walking toward the camera, step 3 of 6: feet together passing, body upright and highest.
Row 1, column 4: FRONT view, walking toward the camera, step 4 of 6: left foot lifting off the ground and moving forward, body lowering slightly.
Row 1, column 5: FRONT view, walking toward the camera, step 5 of 6: left foot forward, weight on the left, body leaning slightly to the right, right arm swinging forward.
Row 1, column 6: FRONT view, walking toward the camera, step 6 of 6: left foot planted, right leg lifting, body rising, arms near the body.
Row 2, column 1: BACK view, walking away from the camera, step 1 of 6: right foot forward seen from behind, the left shoulder dips slightly, left arm swinging forward.
Row 2, column 2: BACK view, walking away from the camera, step 2 of 6: right foot planted, left leg lifting, body rising.
Row 2, column 3: BACK view, walking away from the camera, step 3 of 6: feet together passing, body upright and highest, seen from behind.
Row 2, column 4: BACK view, walking away from the camera, step 4 of 6: left foot lifting and moving forward, body lowering slightly.
Row 2, column 5: BACK view, walking away from the camera, step 5 of 6: left foot forward seen from behind, the right shoulder dips slightly, right arm swinging forward.
Row 2, column 6: BACK view, walking away from the camera, step 6 of 6: left foot planted, right leg lifting, body rising.

The differences between neighbouring frames are small and smooth; the knees bend, the shoulders and hips tilt gently, the arms swing slightly in opposition. Do not change size between frames.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```
