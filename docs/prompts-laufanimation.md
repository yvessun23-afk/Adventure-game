# Pixel: neue Laufzyklen

**Problem:** Die bisherige Laufanimation wirkt wie zwei Endposen, weil die sieben Bilder fast gleich aussehen (Beine stehen kaum verschieden, kein Körper-Auf-und-Ab). Die Engine ist jetzt schon verbessert: Die Bilder wechseln nach zurückgelegter Strecke (die Füße rutschen nicht mehr), und beim Gehen gibt es ein deutliches Hüpfen, leichtes Kippen nach vorn und Federn beim Aufsetzen. Mit den neuen Bildern wird es richtig flüssig.

**Was die Prompts verlangen:** einen echten 8-Bilder-Gehzyklus nach dem klassischen Schema (Kontakt, Runter, Passieren, Hoch, dann wieder mit dem anderen Bein), dazu 4 Bilder von vorn und 4 von hinten. Die Unterschiede zwischen den Bildern sind groß und gut erkennbar: weiter Schritt, Knie gebeugt, Arme im Gegentakt, Körper abwechselnd tief und hoch.

**Raster:** 4 Spalten, 4 Reihen, 16 Zellen: Reihe 1 = Seite 1 bis 4, Reihe 2 = Seite 5 bis 8, Reihe 3 = von vorn 1 bis 4, Reihe 4 = von hinten 1 bis 4.

**Ablauf:** Neuer Chat pro Bild, Referenzen in der Reihenfolge anhängen, 16:9, höchste Auflösung. Speichern wie angegeben. Dann sag Bescheid, ich schneide aus und baue es ein. Mit dem Standard-Outfit beginnen.

---

## 1. Pixel Laufzyklus Standard (16 Bilder)

- **Speichern als:** `assets/raw/walk_pixel.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `sheet_pixel.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the main character PIXEL (copy her look exactly).
Image 2 (sheet_pixel.png): use it for Pixel's proportions and poses (match the style, scale and line weight).
Follow the references closely. Now create the following image.

Sprite sheet on a perfectly flat solid pure green (#00FF00) background. Exactly 4 columns and 4 rows, 16 cells in total, reading order left to right, top to bottom. Each cell holds exactly one full-body figure, fully inside its own cell, centered, with a large empty green gap between all cells. Nothing touches or overlaps. Same scale for all figures, feet roughly on the same line in each row. No cast shadows, no floor, no text, no glow, halo or light bloom outside the outline. Do not use green colors on any figure. Thick dark outline around every figure.

The character is PIXEL exactly as in the attached references (teal messy short hair, yellow goggles pushed up on the forehead, face, proportions and line weight identical), wearing her normal orange jacket, dark green cargo trousers and teal-pink boots (exactly as in the references). Every cell holds Pixel in a WALKING pose; the sheet is one walk-cycle animation. All 16 figures have exactly the same size, the same design and the same body proportions; only the pose changes. Feet of all figures in the same row are on one common baseline (the body bobs up and down by raising and lowering the figure only through the pose, not by moving the baseline). Rows 1 and 2: Pixel in side view facing RIGHT, a classic 8-frame walk cycle with very clear, large differences between frames (wide stride, bent knees, opposite arm swing). Rows 3 and 4: front view and back view.

CELLS:
Row 1 and 2 (side view, facing right):
1. SIDE walk frame 1 of 8, CONTACT, right foot forward: the right foot heel touches the ground far in front, the left leg stretched back with the toe on the ground, both legs at the widest stride, the body at its lowest point, arms swing opposite to the legs (left arm forward, right arm back).
2. SIDE walk frame 2 of 8, DOWN: the right foot flat on the ground, the body sinks slightly, the left leg lifts off and begins to swing forward, knees slightly bent.
3. SIDE walk frame 3 of 8, PASSING, right leg planted: the body at its highest point, the right leg straight and vertical under the body, the left leg bent with the knee up and the foot passing close to the right ankle, arms both near the body.
4. SIDE walk frame 4 of 8, UP, left leg reaching: the left leg swings forward and extends, the right heel lifts off the ground, the body leans slightly forward.
5. SIDE walk frame 5 of 8, CONTACT, left foot forward: the left foot heel touches the ground far in front, the right leg stretched back with the toe on the ground, the widest stride, the body at its lowest point, the arms swapped (right arm forward, left arm back).
6. SIDE walk frame 6 of 8, DOWN: the left foot flat on the ground, the body sinks slightly, the right leg lifts off and begins to swing forward.
7. SIDE walk frame 7 of 8, PASSING, left leg planted: the body at its highest point, the left leg straight and vertical, the right leg bent with the knee up and the foot passing the left ankle.
8. SIDE walk frame 8 of 8, UP, right leg reaching: the right leg swings forward and extends, the left heel lifts off the ground, the body leans slightly forward; the next frame is frame 1 again, so the loop must be seamless.
Row 3 (front view):
9. FRONT walk frame 1 of 4: left foot forward, body leaning slightly to the right, right arm swinging forward.
10. FRONT walk frame 2 of 4: feet together passing, body upright and highest, arms near the body.
11. FRONT walk frame 3 of 4: right foot forward, body leaning slightly to the left, left arm swinging forward.
12. FRONT walk frame 4 of 4: feet together passing, body upright and highest, arms near the body (slightly different arm position than frame 2).
Row 4 (back view):
13. BACK walk frame 1 of 4: left foot forward, the right shoulder dips, seen from behind.
14. BACK walk frame 2 of 4: feet together passing, body upright and highest, seen from behind.
15. BACK walk frame 3 of 4: right foot forward, the left shoulder dips, seen from behind.
16. BACK walk frame 4 of 4: feet together passing, body upright and highest, seen from behind (slightly different arm position than frame 2).

Do not add motion lines, speed lines, dust, shadows, text, numbers or labels. Do not change the clothes, hair or face between frames. Do not make the frames similar to each other: the stride must be clearly different in every frame. Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 2. Pixel Laufzyklus Gala-Look (16 Bilder)

- **Speichern als:** `assets/raw/walk_pixel_gala.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `sheet_pixel_gala.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the main character PIXEL (copy her look exactly).
Image 2 (sheet_pixel_gala.png): use it for the gala outfit and Pixel's proportions in this outfit (copy exactly).
Follow the references closely. Now create the following image.

Sprite sheet on a perfectly flat solid pure green (#00FF00) background. Exactly 4 columns and 4 rows, 16 cells in total, reading order left to right, top to bottom. Each cell holds exactly one full-body figure, fully inside its own cell, centered, with a large empty green gap between all cells. Nothing touches or overlaps. Same scale for all figures, feet roughly on the same line in each row. No cast shadows, no floor, no text, no glow, halo or light bloom outside the outline. Do not use green colors on any figure. Thick dark outline around every figure.

The character is PIXEL exactly as in the attached references (teal messy short hair, yellow goggles pushed up on the forehead, face, proportions and line weight identical), wearing the gala outfit exactly as in the attached gala sheet. Every cell holds Pixel in a WALKING pose; the sheet is one walk-cycle animation. All 16 figures have exactly the same size, the same design and the same body proportions; only the pose changes. Feet of all figures in the same row are on one common baseline (the body bobs up and down by raising and lowering the figure only through the pose, not by moving the baseline). Rows 1 and 2: Pixel in side view facing RIGHT, a classic 8-frame walk cycle with very clear, large differences between frames (wide stride, bent knees, opposite arm swing). Rows 3 and 4: front view and back view.

CELLS:
Row 1 and 2 (side view, facing right):
1. SIDE walk frame 1 of 8, CONTACT, right foot forward: the right foot heel touches the ground far in front, the left leg stretched back with the toe on the ground, both legs at the widest stride, the body at its lowest point, arms swing opposite to the legs (left arm forward, right arm back).
2. SIDE walk frame 2 of 8, DOWN: the right foot flat on the ground, the body sinks slightly, the left leg lifts off and begins to swing forward, knees slightly bent.
3. SIDE walk frame 3 of 8, PASSING, right leg planted: the body at its highest point, the right leg straight and vertical under the body, the left leg bent with the knee up and the foot passing close to the right ankle, arms both near the body.
4. SIDE walk frame 4 of 8, UP, left leg reaching: the left leg swings forward and extends, the right heel lifts off the ground, the body leans slightly forward.
5. SIDE walk frame 5 of 8, CONTACT, left foot forward: the left foot heel touches the ground far in front, the right leg stretched back with the toe on the ground, the widest stride, the body at its lowest point, the arms swapped (right arm forward, left arm back).
6. SIDE walk frame 6 of 8, DOWN: the left foot flat on the ground, the body sinks slightly, the right leg lifts off and begins to swing forward.
7. SIDE walk frame 7 of 8, PASSING, left leg planted: the body at its highest point, the left leg straight and vertical, the right leg bent with the knee up and the foot passing the left ankle.
8. SIDE walk frame 8 of 8, UP, right leg reaching: the right leg swings forward and extends, the left heel lifts off the ground, the body leans slightly forward; the next frame is frame 1 again, so the loop must be seamless.
Row 3 (front view):
9. FRONT walk frame 1 of 4: left foot forward, body leaning slightly to the right, right arm swinging forward.
10. FRONT walk frame 2 of 4: feet together passing, body upright and highest, arms near the body.
11. FRONT walk frame 3 of 4: right foot forward, body leaning slightly to the left, left arm swinging forward.
12. FRONT walk frame 4 of 4: feet together passing, body upright and highest, arms near the body (slightly different arm position than frame 2).
Row 4 (back view):
13. BACK walk frame 1 of 4: left foot forward, the right shoulder dips, seen from behind.
14. BACK walk frame 2 of 4: feet together passing, body upright and highest, seen from behind.
15. BACK walk frame 3 of 4: right foot forward, the left shoulder dips, seen from behind.
16. BACK walk frame 4 of 4: feet together passing, body upright and highest, seen from behind (slightly different arm position than frame 2).

Do not add motion lines, speed lines, dust, shadows, text, numbers or labels. Do not change the clothes, hair or face between frames. Do not make the frames similar to each other: the stride must be clearly different in every frame. Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 3. Pixel Laufzyklus Raumanzug (16 Bilder)

- **Speichern als:** `assets/raw/walk_pixel_raumanzug.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `sheet_pixel_raumanzug.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the main character PIXEL (copy her look exactly).
Image 2 (sheet_pixel_raumanzug.png): use it for the space-suit outfit and Pixel's proportions in this outfit (copy exactly).
Follow the references closely. Now create the following image.

Sprite sheet on a perfectly flat solid pure green (#00FF00) background. Exactly 4 columns and 4 rows, 16 cells in total, reading order left to right, top to bottom. Each cell holds exactly one full-body figure, fully inside its own cell, centered, with a large empty green gap between all cells. Nothing touches or overlaps. Same scale for all figures, feet roughly on the same line in each row. No cast shadows, no floor, no text, no glow, halo or light bloom outside the outline. Do not use green colors on any figure. Thick dark outline around every figure.

The character is PIXEL exactly as in the attached references (teal messy short hair, yellow goggles pushed up on the forehead, face, proportions and line weight identical), wearing the space-suit outfit exactly as in the attached space-suit sheet. Every cell holds Pixel in a WALKING pose; the sheet is one walk-cycle animation. All 16 figures have exactly the same size, the same design and the same body proportions; only the pose changes. Feet of all figures in the same row are on one common baseline (the body bobs up and down by raising and lowering the figure only through the pose, not by moving the baseline). Rows 1 and 2: Pixel in side view facing RIGHT, a classic 8-frame walk cycle with very clear, large differences between frames (wide stride, bent knees, opposite arm swing). Rows 3 and 4: front view and back view.

CELLS:
Row 1 and 2 (side view, facing right):
1. SIDE walk frame 1 of 8, CONTACT, right foot forward: the right foot heel touches the ground far in front, the left leg stretched back with the toe on the ground, both legs at the widest stride, the body at its lowest point, arms swing opposite to the legs (left arm forward, right arm back).
2. SIDE walk frame 2 of 8, DOWN: the right foot flat on the ground, the body sinks slightly, the left leg lifts off and begins to swing forward, knees slightly bent.
3. SIDE walk frame 3 of 8, PASSING, right leg planted: the body at its highest point, the right leg straight and vertical under the body, the left leg bent with the knee up and the foot passing close to the right ankle, arms both near the body.
4. SIDE walk frame 4 of 8, UP, left leg reaching: the left leg swings forward and extends, the right heel lifts off the ground, the body leans slightly forward.
5. SIDE walk frame 5 of 8, CONTACT, left foot forward: the left foot heel touches the ground far in front, the right leg stretched back with the toe on the ground, the widest stride, the body at its lowest point, the arms swapped (right arm forward, left arm back).
6. SIDE walk frame 6 of 8, DOWN: the left foot flat on the ground, the body sinks slightly, the right leg lifts off and begins to swing forward.
7. SIDE walk frame 7 of 8, PASSING, left leg planted: the body at its highest point, the left leg straight and vertical, the right leg bent with the knee up and the foot passing the left ankle.
8. SIDE walk frame 8 of 8, UP, right leg reaching: the right leg swings forward and extends, the left heel lifts off the ground, the body leans slightly forward; the next frame is frame 1 again, so the loop must be seamless.
Row 3 (front view):
9. FRONT walk frame 1 of 4: left foot forward, body leaning slightly to the right, right arm swinging forward.
10. FRONT walk frame 2 of 4: feet together passing, body upright and highest, arms near the body.
11. FRONT walk frame 3 of 4: right foot forward, body leaning slightly to the left, left arm swinging forward.
12. FRONT walk frame 4 of 4: feet together passing, body upright and highest, arms near the body (slightly different arm position than frame 2).
Row 4 (back view):
13. BACK walk frame 1 of 4: left foot forward, the right shoulder dips, seen from behind.
14. BACK walk frame 2 of 4: feet together passing, body upright and highest, seen from behind.
15. BACK walk frame 3 of 4: right foot forward, the left shoulder dips, seen from behind.
16. BACK walk frame 4 of 4: feet together passing, body upright and highest, seen from behind (slightly different arm position than frame 2).

Do not add motion lines, speed lines, dust, shadows, text, numbers or labels. Do not change the clothes, hair or face between frames. Do not make the frames similar to each other: the stride must be clearly different in every frame. Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```
