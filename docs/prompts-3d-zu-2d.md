# Pixel: 3D → 2D (Walk, Idle, Talk) für Nano Banana 2

**Ziel:** Das Design der 3D-Figuren gefällt, die Bewegung der 3D-Läufe passt sehr gut. Diese Prompts machen daraus wieder **handgemalte 2D-Sprites** im Stil von Version 1. Nano Banana bekommt dafür jeweils ein **3D-Posenraster** (die Bilder aus den Animationen) und zeichnet jede Zelle im Spielstil nach. Dadurch bleiben die Bewegungen genau erhalten, die Linien werden aber wieder malerisch und passen zu den Hintergründen.

**Welche Figuren?** Nur die, die sich im Spiel bewegen: **Pixel** in drei Outfits (**Standard, Gala-Look, Raumanzug**). Alle NPCs und Krümel behalten ihre **originalen 2D-Sprites** (Version 1). Der Hund bekommt später einen eigenen Satz, sobald seine Animation fertig ist (gleiche Vorlage, siehe unten).

**Was pro Outfit gebraucht wird: 5 Bilder, also 15 Prompts**

| Blatt | Bilder | Raster | Verwendung |
|---|---|---|---|
| Walk seitlich | 12 | 4 × 3 | Laufen nach rechts (links wird gespiegelt) |
| Walk von vorn | 8 | 4 × 2 | Laufen zur Kamera |
| Walk von hinten | 8 | 4 × 2 | Laufen von der Kamera weg |
| Idle (Atmen) | 12 | 4 × 3 | Zeile 1 vorn, Zeile 2 seitlich, Zeile 3 hinten, je 4 Atembilder |
| Talk (Sprechen) | 8 | 4 × 2 | Sprechen, Dreiviertelansicht nach rechts |

Mehr Bilder als bisher (vorher 8 / 4 / 4 und ein Bild fürs Stehen): das Laufen wird flüssiger, Stehen und Sprechen bekommen echte Bewegung. Die Engine muss dafür kleine Anpassungen bekommen (mehrere Idle- und Sprechbilder abspielen). Das erledige ich, sobald die Bilder da sind.

**Vorlagen (liegen schon im Repository)**
- 3D-Posenraster: `assets/raw/refs_3d2d/<outfit>_<blatt>.png` mit `<outfit>` = `standard`, `gala`, `raumanzug` und `<blatt>` = `walk_side`, `walk_front`, `walk_back`, `idle`, `talk`.
- 2D-Designreferenz der Figur (Stil von Version 1): `assets/raw/refs_walk/ref_walk_standard.png`, `ref_walk_gala.png`, `ref_walk_raumanzug.png`.
- Stilbild: `ref_03_stil_nudelgasse.png` (dein bekanntes Stilbild).
- Alle Prompts zusätzlich maschinenlesbar in `tools/3d2d_prompts.json` (`id`, `title`, `save_as`, `format`, `refs` in Anhängereihenfolge, `prompt`). Neu erzeugen: `python3 tools/build_3d2d_prompts.py`.

**Wichtig beim Anhängen:** immer **genau in der angegebenen Reihenfolge** (Bild 1 Stil, Bild 2 Posenraster, Bild 3 Designreferenz). Ein Prompt = ein Bild = ein Blatt.

**Was die Prompts erzwingen**
- Jede Zelle des Ergebnisses ist die **gleiche Pose wie die gleiche Zelle im 3D-Raster** (keine neuen Posen, keine vertauschte Reihenfolge).
- Grüner Hintergrund (#00FF00), feste Rasterzellen mit Rand, gleiche Größe und Standlinie in allen Zellen, keine Schatten, keine Beschriftung.
- **Dünne Linie** (wie du es wolltest): nur etwa 3 Pixel, keine dicke Kontur an Haaren, **keine Linie quer über dem Mund**.
- Raumanzug: Gesicht deutlich **hinter einer durchsichtigen Glasscheibe** mit leichten Spiegelungen. In 2D geht das, was beim 3D-Modell nicht ging.
- Idle ist die einzige Ausnahme vom Doppelbild-Verbot: Die 4 Atembilder einer Zeile dürfen fast gleich sein.

**Prüfliste vor dem Speichern**
1. Richtige Anzahl Figuren (12 bzw. 8), keine leere und keine doppelte Zelle.
2. Reihenfolge wie im 3D-Raster (Zelle 1 oben links beginnt der Zyklus).
3. Alle Figuren gleich groß, Füße auf einer Linie, nichts berührt den Zellrand.
4. Design stimmt mit dem 3D-Raster überein (Farben, Kleidung, Tasche, Brille).
5. Beim Raumanzug ist das Gesicht hinter Glas, nicht auf den Helm gemalt.

**Wenn etwas nicht stimmt** (im selben Chat schreiben): „Cell 5 to 8 do not match Image 2. Redraw the whole sheet and copy the pose of every cell from Image 2 exactly; keep everything else unchanged.“

**Hund und weitere Figuren:** Sobald die Animationen für den Hund (Weglaufen) und eventuell andere laufende NPCs vorliegen, erzeuge ich dieselben Posenraster aus deren 3D-Modellen und passende Prompts nach genau diesem Muster.

**Nächster Schritt nach dem Hochladen:** Speichere die Ergebnisse unter den Namen `save_as` (z. B. `assets/raw/3d2d_standard_walk_side.png`). Ich zerschneide sie automatisch, richte Größe und Standlinie an Version 2 aus und baue sie als neue Version ein (V2 bleibt wie sie ist).

---

## 1. Standard: Walk seitlich (12 Bilder, 4 × 3)

- **Speichern als:** `assets/raw/3d2d_standard_walk_side.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_3d2d/standard_walk_side.png`, `assets/raw/refs_walk/ref_walk_standard.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail of the final image.
Image 2 (assets/raw/refs_3d2d/standard_walk_side.png): the 3D POSE SHEET. 12 frames of the character on a light grey background in a grid of 4 columns x 3 rows. It defines the DESIGN of the character and the exact POSE of every cell. Copy it cell by cell. Do not copy its grey background or its 3D shading.
Image 3 (assets/raw/refs_walk/ref_walk_standard.png): the same character drawn as a 2D game sprite on a light grey background (front, side facing right, back). Use it only to see how this character looks in the hand-painted 2D style (face shapes, line weight). If Image 2 and Image 3 differ in small details, follow Image 2.
Follow the references closely. Now create the following image.

Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 12 full-body figures of Pixel in her normal outfit (walk side view, facing RIGHT), redrawn from Image 2 as hand-painted 2D game sprites, in a strict grid of 4 columns and 3 rows.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, dust, sparkles, text, numbers, labels, arrows, grid lines, frames or speech bubbles. Do NOT copy the light grey background of Image 2.
- Grid: exactly 4 columns and 3 rows, 12 equal cells, reading order left to right then top to bottom, EXACTLY like Image 2. Each figure stands fully inside its own cell, horizontally centered on the cell's center line, with at least 12 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure.
- SAME POSES AS IMAGE 2: cell k of your image redraws cell k of Image 2: identical pose, limb angles, head tilt, hand shape, body lean, facing direction and mouth. Do NOT invent new poses, do NOT reorder, do NOT skip or duplicate cells.
- Scale and camera: all figures exactly the same scale as the figures in Image 2 relative to each other (full body, no zoom changes). The standing foot is on the same baseline in every cell. Keep the up and down motion of the body exactly as in Image 2, do NOT move the ground line and do NOT change the figure's size between cells.
- Identity: the same character, face, hair, clothes, colors and proportions in all cells, copied from Image 2 (Image 2 has priority over Image 3 for the design). Only the pose changes between cells.
- Style: convert the soft 3D render into hand-painted 2D point-and-click adventure game art exactly like the style image (Image 1): chunky wobbly dark outlines of equal thickness (thin, not heavy: about 3 pixels at the figure's size, never thicker around hair or mouth, no outline line drawn across the mouth), saturated colors, painterly gouache texture. NOT 3D, NOT a render, NOT flat vector, NOT pixel art. Never use green on the character.

CHARACTER: Pixel, normal outfit: orange puffy jacket with a reflective grey stripe, dark green-black cargo trousers with side pockets, teal boots with pink soles, a small olive satchel on a diagonal strap, messy teal-green short hair, yellow goggles pushed up on the forehead, friendly face.

THE ANIMATION: Image 2 shows one complete walk cycle of two steps in 12 frames (4 columns x 3 rows) in pure side view, the character facing RIGHT. Redraw all 12 frames. The legs and arms must keep the wide, clear stride of Image 2: the NEAR leg (closer to the camera) and the FAR leg (behind, slightly darker) stay clearly separate with a gap of green between them wherever they are apart. Frame 12 flows back into frame 1 (seamless loop). Every frame is different from the others.
```

## 2. Standard: Walk von vorn (8 Bilder, 4 × 2)

- **Speichern als:** `assets/raw/3d2d_standard_walk_front.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_3d2d/standard_walk_front.png`, `assets/raw/refs_walk/ref_walk_standard.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail of the final image.
Image 2 (assets/raw/refs_3d2d/standard_walk_front.png): the 3D POSE SHEET. 8 frames of the character on a light grey background in a grid of 4 columns x 2 rows. It defines the DESIGN of the character and the exact POSE of every cell. Copy it cell by cell. Do not copy its grey background or its 3D shading.
Image 3 (assets/raw/refs_walk/ref_walk_standard.png): the same character drawn as a 2D game sprite on a light grey background (front, side facing right, back). Use it only to see how this character looks in the hand-painted 2D style (face shapes, line weight). If Image 2 and Image 3 differ in small details, follow Image 2.
Follow the references closely. Now create the following image.

Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 8 full-body figures of Pixel in her normal outfit (walk toward the camera (front view)), redrawn from Image 2 as hand-painted 2D game sprites, in a strict grid of 4 columns and 2 rows.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, dust, sparkles, text, numbers, labels, arrows, grid lines, frames or speech bubbles. Do NOT copy the light grey background of Image 2.
- Grid: exactly 4 columns and 2 rows, 8 equal cells, reading order left to right then top to bottom, EXACTLY like Image 2. Each figure stands fully inside its own cell, horizontally centered on the cell's center line, with at least 12 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure.
- SAME POSES AS IMAGE 2: cell k of your image redraws cell k of Image 2: identical pose, limb angles, head tilt, hand shape, body lean, facing direction and mouth. Do NOT invent new poses, do NOT reorder, do NOT skip or duplicate cells.
- Scale and camera: all figures exactly the same scale as the figures in Image 2 relative to each other (full body, no zoom changes). The standing foot is on the same baseline in every cell. Keep the up and down motion of the body exactly as in Image 2, do NOT move the ground line and do NOT change the figure's size between cells.
- Identity: the same character, face, hair, clothes, colors and proportions in all cells, copied from Image 2 (Image 2 has priority over Image 3 for the design). Only the pose changes between cells.
- Style: convert the soft 3D render into hand-painted 2D point-and-click adventure game art exactly like the style image (Image 1): chunky wobbly dark outlines of equal thickness (thin, not heavy: about 3 pixels at the figure's size, never thicker around hair or mouth, no outline line drawn across the mouth), saturated colors, painterly gouache texture. NOT 3D, NOT a render, NOT flat vector, NOT pixel art. Never use green on the character.

CHARACTER: Pixel, normal outfit: orange puffy jacket with a reflective grey stripe, dark green-black cargo trousers with side pockets, teal boots with pink soles, a small olive satchel on a diagonal strap, messy teal-green short hair, yellow goggles pushed up on the forehead, friendly face.

THE ANIMATION: Image 2 shows one complete walk cycle of two steps in 8 frames (4 columns x 2 rows) seen from the FRONT, the character walking toward the camera. Redraw all 8 frames. The alternating leg and arm swing, the shoulder tilt and the small up and down body motion of Image 2 must stay clearly visible. Frame 8 flows back into frame 1 (seamless loop).
```

## 3. Standard: Walk von hinten (8 Bilder, 4 × 2)

- **Speichern als:** `assets/raw/3d2d_standard_walk_back.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_3d2d/standard_walk_back.png`, `assets/raw/refs_walk/ref_walk_standard.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail of the final image.
Image 2 (assets/raw/refs_3d2d/standard_walk_back.png): the 3D POSE SHEET. 8 frames of the character on a light grey background in a grid of 4 columns x 2 rows. It defines the DESIGN of the character and the exact POSE of every cell. Copy it cell by cell. Do not copy its grey background or its 3D shading.
Image 3 (assets/raw/refs_walk/ref_walk_standard.png): the same character drawn as a 2D game sprite on a light grey background (front, side facing right, back). Use it only to see how this character looks in the hand-painted 2D style (face shapes, line weight). If Image 2 and Image 3 differ in small details, follow Image 2.
Follow the references closely. Now create the following image.

Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 8 full-body figures of Pixel in her normal outfit (walk away from the camera (back view)), redrawn from Image 2 as hand-painted 2D game sprites, in a strict grid of 4 columns and 2 rows.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, dust, sparkles, text, numbers, labels, arrows, grid lines, frames or speech bubbles. Do NOT copy the light grey background of Image 2.
- Grid: exactly 4 columns and 2 rows, 8 equal cells, reading order left to right then top to bottom, EXACTLY like Image 2. Each figure stands fully inside its own cell, horizontally centered on the cell's center line, with at least 12 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure.
- SAME POSES AS IMAGE 2: cell k of your image redraws cell k of Image 2: identical pose, limb angles, head tilt, hand shape, body lean, facing direction and mouth. Do NOT invent new poses, do NOT reorder, do NOT skip or duplicate cells.
- Scale and camera: all figures exactly the same scale as the figures in Image 2 relative to each other (full body, no zoom changes). The standing foot is on the same baseline in every cell. Keep the up and down motion of the body exactly as in Image 2, do NOT move the ground line and do NOT change the figure's size between cells.
- Identity: the same character, face, hair, clothes, colors and proportions in all cells, copied from Image 2 (Image 2 has priority over Image 3 for the design). Only the pose changes between cells.
- Style: convert the soft 3D render into hand-painted 2D point-and-click adventure game art exactly like the style image (Image 1): chunky wobbly dark outlines of equal thickness (thin, not heavy: about 3 pixels at the figure's size, never thicker around hair or mouth, no outline line drawn across the mouth), saturated colors, painterly gouache texture. NOT 3D, NOT a render, NOT flat vector, NOT pixel art. Never use green on the character.

CHARACTER: Pixel, normal outfit: orange puffy jacket with a reflective grey stripe, dark green-black cargo trousers with side pockets, teal boots with pink soles, a small olive satchel on a diagonal strap, messy teal-green short hair, yellow goggles pushed up on the forehead, friendly face.

THE ANIMATION: Image 2 shows one complete walk cycle of two steps in 8 frames (4 columns x 2 rows) seen from BEHIND, the character walking away from the camera. Redraw all 8 frames from behind (no face visible). The alternating leg and arm swing, the shoulder tilt and the small up and down body motion of Image 2 must stay clearly visible. Frame 8 flows back into frame 1 (seamless loop).
```

## 4. Standard: Idle (Atmen) (12 Bilder, 4 × 3)

- **Speichern als:** `assets/raw/3d2d_standard_idle.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_3d2d/standard_idle.png`, `assets/raw/refs_walk/ref_walk_standard.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail of the final image.
Image 2 (assets/raw/refs_3d2d/standard_idle.png): the 3D POSE SHEET. 12 frames of the character on a light grey background in a grid of 4 columns x 3 rows. It defines the DESIGN of the character and the exact POSE of every cell. Copy it cell by cell. Do not copy its grey background or its 3D shading.
Image 3 (assets/raw/refs_walk/ref_walk_standard.png): the same character drawn as a 2D game sprite on a light grey background (front, side facing right, back). Use it only to see how this character looks in the hand-painted 2D style (face shapes, line weight). If Image 2 and Image 3 differ in small details, follow Image 2.
Follow the references closely. Now create the following image.

Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 12 full-body figures of Pixel in her normal outfit (idle standing, three views with a subtle breathing loop), redrawn from Image 2 as hand-painted 2D game sprites, in a strict grid of 4 columns and 3 rows.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, dust, sparkles, text, numbers, labels, arrows, grid lines, frames or speech bubbles. Do NOT copy the light grey background of Image 2.
- Grid: exactly 4 columns and 3 rows, 12 equal cells, reading order left to right then top to bottom, EXACTLY like Image 2. Each figure stands fully inside its own cell, horizontally centered on the cell's center line, with at least 12 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure.
- SAME POSES AS IMAGE 2: cell k of your image redraws cell k of Image 2: identical pose, limb angles, head tilt, hand shape, body lean, facing direction and mouth. Do NOT invent new poses, do NOT reorder, do NOT skip or duplicate cells.
- Scale and camera: all figures exactly the same scale as the figures in Image 2 relative to each other (full body, no zoom changes). The standing foot is on the same baseline in every cell. Keep the up and down motion of the body exactly as in Image 2, do NOT move the ground line and do NOT change the figure's size between cells.
- Identity: the same character, face, hair, clothes, colors and proportions in all cells, copied from Image 2 (Image 2 has priority over Image 3 for the design). Only the pose changes between cells.
- Style: convert the soft 3D render into hand-painted 2D point-and-click adventure game art exactly like the style image (Image 1): chunky wobbly dark outlines of equal thickness (thin, not heavy: about 3 pixels at the figure's size, never thicker around hair or mouth, no outline line drawn across the mouth), saturated colors, painterly gouache texture. NOT 3D, NOT a render, NOT flat vector, NOT pixel art. Never use green on the character.

CHARACTER: Pixel, normal outfit: orange puffy jacket with a reflective grey stripe, dark green-black cargo trousers with side pockets, teal boots with pink soles, a small olive satchel on a diagonal strap, messy teal-green short hair, yellow goggles pushed up on the forehead, friendly face.

THE ANIMATION: Image 2 shows the standing idle animation: row 1 = FRONT view (4 breathing frames), row 2 = SIDE view facing RIGHT (4 frames), row 3 = BACK view (4 frames). Redraw all 12 frames. The motion is a very subtle breathing loop (chest and shoulders rise and fall slightly, tiny weight shift, hair and clothes follow softly). EXCEPTION to any duplicate rule: the 4 frames of a row look almost the same, they differ only by these small breathing changes exactly as in Image 2. Frame 4 flows back into frame 1 of the same row (seamless loop). The three rows are three different views of the same standing pose.
```

## 5. Standard: Talk (Sprechen) (8 Bilder, 4 × 2)

- **Speichern als:** `assets/raw/3d2d_standard_talk.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_3d2d/standard_talk.png`, `assets/raw/refs_walk/ref_walk_standard.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail of the final image.
Image 2 (assets/raw/refs_3d2d/standard_talk.png): the 3D POSE SHEET. 8 frames of the character on a light grey background in a grid of 4 columns x 2 rows. It defines the DESIGN of the character and the exact POSE of every cell. Copy it cell by cell. Do not copy its grey background or its 3D shading.
Image 3 (assets/raw/refs_walk/ref_walk_standard.png): the same character drawn as a 2D game sprite on a light grey background (front, side facing right, back). Use it only to see how this character looks in the hand-painted 2D style (face shapes, line weight). If Image 2 and Image 3 differ in small details, follow Image 2.
Follow the references closely. Now create the following image.

Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 8 full-body figures of Pixel in her normal outfit (talking, three-quarter view facing RIGHT), redrawn from Image 2 as hand-painted 2D game sprites, in a strict grid of 4 columns and 2 rows.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, dust, sparkles, text, numbers, labels, arrows, grid lines, frames or speech bubbles. Do NOT copy the light grey background of Image 2.
- Grid: exactly 4 columns and 2 rows, 8 equal cells, reading order left to right then top to bottom, EXACTLY like Image 2. Each figure stands fully inside its own cell, horizontally centered on the cell's center line, with at least 12 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure.
- SAME POSES AS IMAGE 2: cell k of your image redraws cell k of Image 2: identical pose, limb angles, head tilt, hand shape, body lean, facing direction and mouth. Do NOT invent new poses, do NOT reorder, do NOT skip or duplicate cells.
- Scale and camera: all figures exactly the same scale as the figures in Image 2 relative to each other (full body, no zoom changes). The standing foot is on the same baseline in every cell. Keep the up and down motion of the body exactly as in Image 2, do NOT move the ground line and do NOT change the figure's size between cells.
- Identity: the same character, face, hair, clothes, colors and proportions in all cells, copied from Image 2 (Image 2 has priority over Image 3 for the design). Only the pose changes between cells.
- Style: convert the soft 3D render into hand-painted 2D point-and-click adventure game art exactly like the style image (Image 1): chunky wobbly dark outlines of equal thickness (thin, not heavy: about 3 pixels at the figure's size, never thicker around hair or mouth, no outline line drawn across the mouth), saturated colors, painterly gouache texture. NOT 3D, NOT a render, NOT flat vector, NOT pixel art. Never use green on the character.

CHARACTER: Pixel, normal outfit: orange puffy jacket with a reflective grey stripe, dark green-black cargo trousers with side pockets, teal boots with pink soles, a small olive satchel on a diagonal strap, messy teal-green short hair, yellow goggles pushed up on the forehead, friendly face.

THE ANIMATION: Image 2 shows a talking animation in 8 frames (4 columns x 2 rows), the character in a three-quarter view turned to the RIGHT, standing in place. Redraw all 8 frames. The mouth shapes change from frame to frame exactly as in Image 2 (open wide, small round, nearly closed, wide smile shape and so on), the head makes small nods and tilts, one hand gestures a little, and the character blinks once. The body stays on the same spot, the feet do not move. Frame 8 flows back into frame 1 (seamless loop). Draw the mouth as a simple friendly painted mouth shape without a dark outline line across it.
```

## 6. Gala-Look: Walk seitlich (12 Bilder, 4 × 3)

- **Speichern als:** `assets/raw/3d2d_gala_walk_side.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_3d2d/gala_walk_side.png`, `assets/raw/refs_walk/ref_walk_gala.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail of the final image.
Image 2 (assets/raw/refs_3d2d/gala_walk_side.png): the 3D POSE SHEET. 12 frames of the character on a light grey background in a grid of 4 columns x 3 rows. It defines the DESIGN of the character and the exact POSE of every cell. Copy it cell by cell. Do not copy its grey background or its 3D shading.
Image 3 (assets/raw/refs_walk/ref_walk_gala.png): the same character drawn as a 2D game sprite on a light grey background (front, side facing right, back). Use it only to see how this character looks in the hand-painted 2D style (face shapes, line weight). If Image 2 and Image 3 differ in small details, follow Image 2.
Follow the references closely. Now create the following image.

Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 12 full-body figures of Pixel in the gala outfit (walk side view, facing RIGHT), redrawn from Image 2 as hand-painted 2D game sprites, in a strict grid of 4 columns and 3 rows.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, dust, sparkles, text, numbers, labels, arrows, grid lines, frames or speech bubbles. Do NOT copy the light grey background of Image 2.
- Grid: exactly 4 columns and 3 rows, 12 equal cells, reading order left to right then top to bottom, EXACTLY like Image 2. Each figure stands fully inside its own cell, horizontally centered on the cell's center line, with at least 12 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure.
- SAME POSES AS IMAGE 2: cell k of your image redraws cell k of Image 2: identical pose, limb angles, head tilt, hand shape, body lean, facing direction and mouth. Do NOT invent new poses, do NOT reorder, do NOT skip or duplicate cells.
- Scale and camera: all figures exactly the same scale as the figures in Image 2 relative to each other (full body, no zoom changes). The standing foot is on the same baseline in every cell. Keep the up and down motion of the body exactly as in Image 2, do NOT move the ground line and do NOT change the figure's size between cells.
- Identity: the same character, face, hair, clothes, colors and proportions in all cells, copied from Image 2 (Image 2 has priority over Image 3 for the design). Only the pose changes between cells.
- Style: convert the soft 3D render into hand-painted 2D point-and-click adventure game art exactly like the style image (Image 1): chunky wobbly dark outlines of equal thickness (thin, not heavy: about 3 pixels at the figure's size, never thicker around hair or mouth, no outline line drawn across the mouth), saturated colors, painterly gouache texture. NOT 3D, NOT a render, NOT flat vector, NOT pixel art. Never use green on the character.

CHARACTER: Pixel in the gala outfit: sparkling teal tailcoat jacket with dark lapels and a teal bow tie over a white shirt, dark green cargo trousers, dark boots with pink soles, neatly styled teal hair, no goggles, friendly face.

THE ANIMATION: Image 2 shows one complete walk cycle of two steps in 12 frames (4 columns x 3 rows) in pure side view, the character facing RIGHT. Redraw all 12 frames. The legs and arms must keep the wide, clear stride of Image 2: the NEAR leg (closer to the camera) and the FAR leg (behind, slightly darker) stay clearly separate with a gap of green between them wherever they are apart. Frame 12 flows back into frame 1 (seamless loop). Every frame is different from the others.
```

## 7. Gala-Look: Walk von vorn (8 Bilder, 4 × 2)

- **Speichern als:** `assets/raw/3d2d_gala_walk_front.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_3d2d/gala_walk_front.png`, `assets/raw/refs_walk/ref_walk_gala.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail of the final image.
Image 2 (assets/raw/refs_3d2d/gala_walk_front.png): the 3D POSE SHEET. 8 frames of the character on a light grey background in a grid of 4 columns x 2 rows. It defines the DESIGN of the character and the exact POSE of every cell. Copy it cell by cell. Do not copy its grey background or its 3D shading.
Image 3 (assets/raw/refs_walk/ref_walk_gala.png): the same character drawn as a 2D game sprite on a light grey background (front, side facing right, back). Use it only to see how this character looks in the hand-painted 2D style (face shapes, line weight). If Image 2 and Image 3 differ in small details, follow Image 2.
Follow the references closely. Now create the following image.

Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 8 full-body figures of Pixel in the gala outfit (walk toward the camera (front view)), redrawn from Image 2 as hand-painted 2D game sprites, in a strict grid of 4 columns and 2 rows.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, dust, sparkles, text, numbers, labels, arrows, grid lines, frames or speech bubbles. Do NOT copy the light grey background of Image 2.
- Grid: exactly 4 columns and 2 rows, 8 equal cells, reading order left to right then top to bottom, EXACTLY like Image 2. Each figure stands fully inside its own cell, horizontally centered on the cell's center line, with at least 12 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure.
- SAME POSES AS IMAGE 2: cell k of your image redraws cell k of Image 2: identical pose, limb angles, head tilt, hand shape, body lean, facing direction and mouth. Do NOT invent new poses, do NOT reorder, do NOT skip or duplicate cells.
- Scale and camera: all figures exactly the same scale as the figures in Image 2 relative to each other (full body, no zoom changes). The standing foot is on the same baseline in every cell. Keep the up and down motion of the body exactly as in Image 2, do NOT move the ground line and do NOT change the figure's size between cells.
- Identity: the same character, face, hair, clothes, colors and proportions in all cells, copied from Image 2 (Image 2 has priority over Image 3 for the design). Only the pose changes between cells.
- Style: convert the soft 3D render into hand-painted 2D point-and-click adventure game art exactly like the style image (Image 1): chunky wobbly dark outlines of equal thickness (thin, not heavy: about 3 pixels at the figure's size, never thicker around hair or mouth, no outline line drawn across the mouth), saturated colors, painterly gouache texture. NOT 3D, NOT a render, NOT flat vector, NOT pixel art. Never use green on the character.

CHARACTER: Pixel in the gala outfit: sparkling teal tailcoat jacket with dark lapels and a teal bow tie over a white shirt, dark green cargo trousers, dark boots with pink soles, neatly styled teal hair, no goggles, friendly face.

THE ANIMATION: Image 2 shows one complete walk cycle of two steps in 8 frames (4 columns x 2 rows) seen from the FRONT, the character walking toward the camera. Redraw all 8 frames. The alternating leg and arm swing, the shoulder tilt and the small up and down body motion of Image 2 must stay clearly visible. Frame 8 flows back into frame 1 (seamless loop).
```

## 8. Gala-Look: Walk von hinten (8 Bilder, 4 × 2)

- **Speichern als:** `assets/raw/3d2d_gala_walk_back.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_3d2d/gala_walk_back.png`, `assets/raw/refs_walk/ref_walk_gala.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail of the final image.
Image 2 (assets/raw/refs_3d2d/gala_walk_back.png): the 3D POSE SHEET. 8 frames of the character on a light grey background in a grid of 4 columns x 2 rows. It defines the DESIGN of the character and the exact POSE of every cell. Copy it cell by cell. Do not copy its grey background or its 3D shading.
Image 3 (assets/raw/refs_walk/ref_walk_gala.png): the same character drawn as a 2D game sprite on a light grey background (front, side facing right, back). Use it only to see how this character looks in the hand-painted 2D style (face shapes, line weight). If Image 2 and Image 3 differ in small details, follow Image 2.
Follow the references closely. Now create the following image.

Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 8 full-body figures of Pixel in the gala outfit (walk away from the camera (back view)), redrawn from Image 2 as hand-painted 2D game sprites, in a strict grid of 4 columns and 2 rows.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, dust, sparkles, text, numbers, labels, arrows, grid lines, frames or speech bubbles. Do NOT copy the light grey background of Image 2.
- Grid: exactly 4 columns and 2 rows, 8 equal cells, reading order left to right then top to bottom, EXACTLY like Image 2. Each figure stands fully inside its own cell, horizontally centered on the cell's center line, with at least 12 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure.
- SAME POSES AS IMAGE 2: cell k of your image redraws cell k of Image 2: identical pose, limb angles, head tilt, hand shape, body lean, facing direction and mouth. Do NOT invent new poses, do NOT reorder, do NOT skip or duplicate cells.
- Scale and camera: all figures exactly the same scale as the figures in Image 2 relative to each other (full body, no zoom changes). The standing foot is on the same baseline in every cell. Keep the up and down motion of the body exactly as in Image 2, do NOT move the ground line and do NOT change the figure's size between cells.
- Identity: the same character, face, hair, clothes, colors and proportions in all cells, copied from Image 2 (Image 2 has priority over Image 3 for the design). Only the pose changes between cells.
- Style: convert the soft 3D render into hand-painted 2D point-and-click adventure game art exactly like the style image (Image 1): chunky wobbly dark outlines of equal thickness (thin, not heavy: about 3 pixels at the figure's size, never thicker around hair or mouth, no outline line drawn across the mouth), saturated colors, painterly gouache texture. NOT 3D, NOT a render, NOT flat vector, NOT pixel art. Never use green on the character.

CHARACTER: Pixel in the gala outfit: sparkling teal tailcoat jacket with dark lapels and a teal bow tie over a white shirt, dark green cargo trousers, dark boots with pink soles, neatly styled teal hair, no goggles, friendly face.

THE ANIMATION: Image 2 shows one complete walk cycle of two steps in 8 frames (4 columns x 2 rows) seen from BEHIND, the character walking away from the camera. Redraw all 8 frames from behind (no face visible). The alternating leg and arm swing, the shoulder tilt and the small up and down body motion of Image 2 must stay clearly visible. Frame 8 flows back into frame 1 (seamless loop).
```

## 9. Gala-Look: Idle (Atmen) (12 Bilder, 4 × 3)

- **Speichern als:** `assets/raw/3d2d_gala_idle.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_3d2d/gala_idle.png`, `assets/raw/refs_walk/ref_walk_gala.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail of the final image.
Image 2 (assets/raw/refs_3d2d/gala_idle.png): the 3D POSE SHEET. 12 frames of the character on a light grey background in a grid of 4 columns x 3 rows. It defines the DESIGN of the character and the exact POSE of every cell. Copy it cell by cell. Do not copy its grey background or its 3D shading.
Image 3 (assets/raw/refs_walk/ref_walk_gala.png): the same character drawn as a 2D game sprite on a light grey background (front, side facing right, back). Use it only to see how this character looks in the hand-painted 2D style (face shapes, line weight). If Image 2 and Image 3 differ in small details, follow Image 2.
Follow the references closely. Now create the following image.

Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 12 full-body figures of Pixel in the gala outfit (idle standing, three views with a subtle breathing loop), redrawn from Image 2 as hand-painted 2D game sprites, in a strict grid of 4 columns and 3 rows.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, dust, sparkles, text, numbers, labels, arrows, grid lines, frames or speech bubbles. Do NOT copy the light grey background of Image 2.
- Grid: exactly 4 columns and 3 rows, 12 equal cells, reading order left to right then top to bottom, EXACTLY like Image 2. Each figure stands fully inside its own cell, horizontally centered on the cell's center line, with at least 12 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure.
- SAME POSES AS IMAGE 2: cell k of your image redraws cell k of Image 2: identical pose, limb angles, head tilt, hand shape, body lean, facing direction and mouth. Do NOT invent new poses, do NOT reorder, do NOT skip or duplicate cells.
- Scale and camera: all figures exactly the same scale as the figures in Image 2 relative to each other (full body, no zoom changes). The standing foot is on the same baseline in every cell. Keep the up and down motion of the body exactly as in Image 2, do NOT move the ground line and do NOT change the figure's size between cells.
- Identity: the same character, face, hair, clothes, colors and proportions in all cells, copied from Image 2 (Image 2 has priority over Image 3 for the design). Only the pose changes between cells.
- Style: convert the soft 3D render into hand-painted 2D point-and-click adventure game art exactly like the style image (Image 1): chunky wobbly dark outlines of equal thickness (thin, not heavy: about 3 pixels at the figure's size, never thicker around hair or mouth, no outline line drawn across the mouth), saturated colors, painterly gouache texture. NOT 3D, NOT a render, NOT flat vector, NOT pixel art. Never use green on the character.

CHARACTER: Pixel in the gala outfit: sparkling teal tailcoat jacket with dark lapels and a teal bow tie over a white shirt, dark green cargo trousers, dark boots with pink soles, neatly styled teal hair, no goggles, friendly face.

THE ANIMATION: Image 2 shows the standing idle animation: row 1 = FRONT view (4 breathing frames), row 2 = SIDE view facing RIGHT (4 frames), row 3 = BACK view (4 frames). Redraw all 12 frames. The motion is a very subtle breathing loop (chest and shoulders rise and fall slightly, tiny weight shift, hair and clothes follow softly). EXCEPTION to any duplicate rule: the 4 frames of a row look almost the same, they differ only by these small breathing changes exactly as in Image 2. Frame 4 flows back into frame 1 of the same row (seamless loop). The three rows are three different views of the same standing pose.
```

## 10. Gala-Look: Talk (Sprechen) (8 Bilder, 4 × 2)

- **Speichern als:** `assets/raw/3d2d_gala_talk.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_3d2d/gala_talk.png`, `assets/raw/refs_walk/ref_walk_gala.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail of the final image.
Image 2 (assets/raw/refs_3d2d/gala_talk.png): the 3D POSE SHEET. 8 frames of the character on a light grey background in a grid of 4 columns x 2 rows. It defines the DESIGN of the character and the exact POSE of every cell. Copy it cell by cell. Do not copy its grey background or its 3D shading.
Image 3 (assets/raw/refs_walk/ref_walk_gala.png): the same character drawn as a 2D game sprite on a light grey background (front, side facing right, back). Use it only to see how this character looks in the hand-painted 2D style (face shapes, line weight). If Image 2 and Image 3 differ in small details, follow Image 2.
Follow the references closely. Now create the following image.

Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 8 full-body figures of Pixel in the gala outfit (talking, three-quarter view facing RIGHT), redrawn from Image 2 as hand-painted 2D game sprites, in a strict grid of 4 columns and 2 rows.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, dust, sparkles, text, numbers, labels, arrows, grid lines, frames or speech bubbles. Do NOT copy the light grey background of Image 2.
- Grid: exactly 4 columns and 2 rows, 8 equal cells, reading order left to right then top to bottom, EXACTLY like Image 2. Each figure stands fully inside its own cell, horizontally centered on the cell's center line, with at least 12 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure.
- SAME POSES AS IMAGE 2: cell k of your image redraws cell k of Image 2: identical pose, limb angles, head tilt, hand shape, body lean, facing direction and mouth. Do NOT invent new poses, do NOT reorder, do NOT skip or duplicate cells.
- Scale and camera: all figures exactly the same scale as the figures in Image 2 relative to each other (full body, no zoom changes). The standing foot is on the same baseline in every cell. Keep the up and down motion of the body exactly as in Image 2, do NOT move the ground line and do NOT change the figure's size between cells.
- Identity: the same character, face, hair, clothes, colors and proportions in all cells, copied from Image 2 (Image 2 has priority over Image 3 for the design). Only the pose changes between cells.
- Style: convert the soft 3D render into hand-painted 2D point-and-click adventure game art exactly like the style image (Image 1): chunky wobbly dark outlines of equal thickness (thin, not heavy: about 3 pixels at the figure's size, never thicker around hair or mouth, no outline line drawn across the mouth), saturated colors, painterly gouache texture. NOT 3D, NOT a render, NOT flat vector, NOT pixel art. Never use green on the character.

CHARACTER: Pixel in the gala outfit: sparkling teal tailcoat jacket with dark lapels and a teal bow tie over a white shirt, dark green cargo trousers, dark boots with pink soles, neatly styled teal hair, no goggles, friendly face.

THE ANIMATION: Image 2 shows a talking animation in 8 frames (4 columns x 2 rows), the character in a three-quarter view turned to the RIGHT, standing in place. Redraw all 8 frames. The mouth shapes change from frame to frame exactly as in Image 2 (open wide, small round, nearly closed, wide smile shape and so on), the head makes small nods and tilts, one hand gestures a little, and the character blinks once. The body stays on the same spot, the feet do not move. Frame 8 flows back into frame 1 (seamless loop). Draw the mouth as a simple friendly painted mouth shape without a dark outline line across it.
```

## 11. Raumanzug: Walk seitlich (12 Bilder, 4 × 3)

- **Speichern als:** `assets/raw/3d2d_raumanzug_walk_side.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_3d2d/raumanzug_walk_side.png`, `assets/raw/refs_walk/ref_walk_raumanzug.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail of the final image.
Image 2 (assets/raw/refs_3d2d/raumanzug_walk_side.png): the 3D POSE SHEET. 12 frames of the character on a light grey background in a grid of 4 columns x 3 rows. It defines the DESIGN of the character and the exact POSE of every cell. Copy it cell by cell. Do not copy its grey background or its 3D shading.
Image 3 (assets/raw/refs_walk/ref_walk_raumanzug.png): the same character drawn as a 2D game sprite on a light grey background (front, side facing right, back). Use it only to see how this character looks in the hand-painted 2D style (face shapes, line weight). If Image 2 and Image 3 differ in small details, follow Image 2.
Follow the references closely. Now create the following image.

Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 12 full-body figures of Pixel in the space suit (walk side view, facing RIGHT), redrawn from Image 2 as hand-painted 2D game sprites, in a strict grid of 4 columns and 3 rows.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, dust, sparkles, text, numbers, labels, arrows, grid lines, frames or speech bubbles. Do NOT copy the light grey background of Image 2.
- Grid: exactly 4 columns and 3 rows, 12 equal cells, reading order left to right then top to bottom, EXACTLY like Image 2. Each figure stands fully inside its own cell, horizontally centered on the cell's center line, with at least 12 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure.
- SAME POSES AS IMAGE 2: cell k of your image redraws cell k of Image 2: identical pose, limb angles, head tilt, hand shape, body lean, facing direction and mouth. Do NOT invent new poses, do NOT reorder, do NOT skip or duplicate cells.
- Scale and camera: all figures exactly the same scale as the figures in Image 2 relative to each other (full body, no zoom changes). The standing foot is on the same baseline in every cell. Keep the up and down motion of the body exactly as in Image 2, do NOT move the ground line and do NOT change the figure's size between cells.
- Identity: the same character, face, hair, clothes, colors and proportions in all cells, copied from Image 2 (Image 2 has priority over Image 3 for the design). Only the pose changes between cells.
- Style: convert the soft 3D render into hand-painted 2D point-and-click adventure game art exactly like the style image (Image 1): chunky wobbly dark outlines of equal thickness (thin, not heavy: about 3 pixels at the figure's size, never thicker around hair or mouth, no outline line drawn across the mouth), saturated colors, painterly gouache texture. NOT 3D, NOT a render, NOT flat vector, NOT pixel art. Never use green on the character.

CHARACTER: Pixel in the space suit: silver-grey space suit with red-pink hoses and a chest control panel, a backpack with pink hoses, silver boots and gloves, and a round helmet; the face is clearly visible BEHIND a clear transparent glass visor (a few soft reflection highlights on the glass, the visor frame is dark), teal hair and yellow goggles visible inside the helmet.

THE ANIMATION: Image 2 shows one complete walk cycle of two steps in 12 frames (4 columns x 3 rows) in pure side view, the character facing RIGHT. Redraw all 12 frames. The legs and arms must keep the wide, clear stride of Image 2: the NEAR leg (closer to the camera) and the FAR leg (behind, slightly darker) stay clearly separate with a gap of green between them wherever they are apart. Frame 12 flows back into frame 1 (seamless loop). Every frame is different from the others.
```

## 12. Raumanzug: Walk von vorn (8 Bilder, 4 × 2)

- **Speichern als:** `assets/raw/3d2d_raumanzug_walk_front.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_3d2d/raumanzug_walk_front.png`, `assets/raw/refs_walk/ref_walk_raumanzug.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail of the final image.
Image 2 (assets/raw/refs_3d2d/raumanzug_walk_front.png): the 3D POSE SHEET. 8 frames of the character on a light grey background in a grid of 4 columns x 2 rows. It defines the DESIGN of the character and the exact POSE of every cell. Copy it cell by cell. Do not copy its grey background or its 3D shading.
Image 3 (assets/raw/refs_walk/ref_walk_raumanzug.png): the same character drawn as a 2D game sprite on a light grey background (front, side facing right, back). Use it only to see how this character looks in the hand-painted 2D style (face shapes, line weight). If Image 2 and Image 3 differ in small details, follow Image 2.
Follow the references closely. Now create the following image.

Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 8 full-body figures of Pixel in the space suit (walk toward the camera (front view)), redrawn from Image 2 as hand-painted 2D game sprites, in a strict grid of 4 columns and 2 rows.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, dust, sparkles, text, numbers, labels, arrows, grid lines, frames or speech bubbles. Do NOT copy the light grey background of Image 2.
- Grid: exactly 4 columns and 2 rows, 8 equal cells, reading order left to right then top to bottom, EXACTLY like Image 2. Each figure stands fully inside its own cell, horizontally centered on the cell's center line, with at least 12 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure.
- SAME POSES AS IMAGE 2: cell k of your image redraws cell k of Image 2: identical pose, limb angles, head tilt, hand shape, body lean, facing direction and mouth. Do NOT invent new poses, do NOT reorder, do NOT skip or duplicate cells.
- Scale and camera: all figures exactly the same scale as the figures in Image 2 relative to each other (full body, no zoom changes). The standing foot is on the same baseline in every cell. Keep the up and down motion of the body exactly as in Image 2, do NOT move the ground line and do NOT change the figure's size between cells.
- Identity: the same character, face, hair, clothes, colors and proportions in all cells, copied from Image 2 (Image 2 has priority over Image 3 for the design). Only the pose changes between cells.
- Style: convert the soft 3D render into hand-painted 2D point-and-click adventure game art exactly like the style image (Image 1): chunky wobbly dark outlines of equal thickness (thin, not heavy: about 3 pixels at the figure's size, never thicker around hair or mouth, no outline line drawn across the mouth), saturated colors, painterly gouache texture. NOT 3D, NOT a render, NOT flat vector, NOT pixel art. Never use green on the character.

CHARACTER: Pixel in the space suit: silver-grey space suit with red-pink hoses and a chest control panel, a backpack with pink hoses, silver boots and gloves, and a round helmet; the face is clearly visible BEHIND a clear transparent glass visor (a few soft reflection highlights on the glass, the visor frame is dark), teal hair and yellow goggles visible inside the helmet.

THE ANIMATION: Image 2 shows one complete walk cycle of two steps in 8 frames (4 columns x 2 rows) seen from the FRONT, the character walking toward the camera. Redraw all 8 frames. The alternating leg and arm swing, the shoulder tilt and the small up and down body motion of Image 2 must stay clearly visible. Frame 8 flows back into frame 1 (seamless loop).
```

## 13. Raumanzug: Walk von hinten (8 Bilder, 4 × 2)

- **Speichern als:** `assets/raw/3d2d_raumanzug_walk_back.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_3d2d/raumanzug_walk_back.png`, `assets/raw/refs_walk/ref_walk_raumanzug.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail of the final image.
Image 2 (assets/raw/refs_3d2d/raumanzug_walk_back.png): the 3D POSE SHEET. 8 frames of the character on a light grey background in a grid of 4 columns x 2 rows. It defines the DESIGN of the character and the exact POSE of every cell. Copy it cell by cell. Do not copy its grey background or its 3D shading.
Image 3 (assets/raw/refs_walk/ref_walk_raumanzug.png): the same character drawn as a 2D game sprite on a light grey background (front, side facing right, back). Use it only to see how this character looks in the hand-painted 2D style (face shapes, line weight). If Image 2 and Image 3 differ in small details, follow Image 2.
Follow the references closely. Now create the following image.

Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 8 full-body figures of Pixel in the space suit (walk away from the camera (back view)), redrawn from Image 2 as hand-painted 2D game sprites, in a strict grid of 4 columns and 2 rows.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, dust, sparkles, text, numbers, labels, arrows, grid lines, frames or speech bubbles. Do NOT copy the light grey background of Image 2.
- Grid: exactly 4 columns and 2 rows, 8 equal cells, reading order left to right then top to bottom, EXACTLY like Image 2. Each figure stands fully inside its own cell, horizontally centered on the cell's center line, with at least 12 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure.
- SAME POSES AS IMAGE 2: cell k of your image redraws cell k of Image 2: identical pose, limb angles, head tilt, hand shape, body lean, facing direction and mouth. Do NOT invent new poses, do NOT reorder, do NOT skip or duplicate cells.
- Scale and camera: all figures exactly the same scale as the figures in Image 2 relative to each other (full body, no zoom changes). The standing foot is on the same baseline in every cell. Keep the up and down motion of the body exactly as in Image 2, do NOT move the ground line and do NOT change the figure's size between cells.
- Identity: the same character, face, hair, clothes, colors and proportions in all cells, copied from Image 2 (Image 2 has priority over Image 3 for the design). Only the pose changes between cells.
- Style: convert the soft 3D render into hand-painted 2D point-and-click adventure game art exactly like the style image (Image 1): chunky wobbly dark outlines of equal thickness (thin, not heavy: about 3 pixels at the figure's size, never thicker around hair or mouth, no outline line drawn across the mouth), saturated colors, painterly gouache texture. NOT 3D, NOT a render, NOT flat vector, NOT pixel art. Never use green on the character.

CHARACTER: Pixel in the space suit: silver-grey space suit with red-pink hoses and a chest control panel, a backpack with pink hoses, silver boots and gloves, and a round helmet; the face is clearly visible BEHIND a clear transparent glass visor (a few soft reflection highlights on the glass, the visor frame is dark), teal hair and yellow goggles visible inside the helmet.

THE ANIMATION: Image 2 shows one complete walk cycle of two steps in 8 frames (4 columns x 2 rows) seen from BEHIND, the character walking away from the camera. Redraw all 8 frames from behind (no face visible). The alternating leg and arm swing, the shoulder tilt and the small up and down body motion of Image 2 must stay clearly visible. Frame 8 flows back into frame 1 (seamless loop).
```

## 14. Raumanzug: Idle (Atmen) (12 Bilder, 4 × 3)

- **Speichern als:** `assets/raw/3d2d_raumanzug_idle.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_3d2d/raumanzug_idle.png`, `assets/raw/refs_walk/ref_walk_raumanzug.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail of the final image.
Image 2 (assets/raw/refs_3d2d/raumanzug_idle.png): the 3D POSE SHEET. 12 frames of the character on a light grey background in a grid of 4 columns x 3 rows. It defines the DESIGN of the character and the exact POSE of every cell. Copy it cell by cell. Do not copy its grey background or its 3D shading.
Image 3 (assets/raw/refs_walk/ref_walk_raumanzug.png): the same character drawn as a 2D game sprite on a light grey background (front, side facing right, back). Use it only to see how this character looks in the hand-painted 2D style (face shapes, line weight). If Image 2 and Image 3 differ in small details, follow Image 2.
Follow the references closely. Now create the following image.

Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 12 full-body figures of Pixel in the space suit (idle standing, three views with a subtle breathing loop), redrawn from Image 2 as hand-painted 2D game sprites, in a strict grid of 4 columns and 3 rows.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, dust, sparkles, text, numbers, labels, arrows, grid lines, frames or speech bubbles. Do NOT copy the light grey background of Image 2.
- Grid: exactly 4 columns and 3 rows, 12 equal cells, reading order left to right then top to bottom, EXACTLY like Image 2. Each figure stands fully inside its own cell, horizontally centered on the cell's center line, with at least 12 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure.
- SAME POSES AS IMAGE 2: cell k of your image redraws cell k of Image 2: identical pose, limb angles, head tilt, hand shape, body lean, facing direction and mouth. Do NOT invent new poses, do NOT reorder, do NOT skip or duplicate cells.
- Scale and camera: all figures exactly the same scale as the figures in Image 2 relative to each other (full body, no zoom changes). The standing foot is on the same baseline in every cell. Keep the up and down motion of the body exactly as in Image 2, do NOT move the ground line and do NOT change the figure's size between cells.
- Identity: the same character, face, hair, clothes, colors and proportions in all cells, copied from Image 2 (Image 2 has priority over Image 3 for the design). Only the pose changes between cells.
- Style: convert the soft 3D render into hand-painted 2D point-and-click adventure game art exactly like the style image (Image 1): chunky wobbly dark outlines of equal thickness (thin, not heavy: about 3 pixels at the figure's size, never thicker around hair or mouth, no outline line drawn across the mouth), saturated colors, painterly gouache texture. NOT 3D, NOT a render, NOT flat vector, NOT pixel art. Never use green on the character.

CHARACTER: Pixel in the space suit: silver-grey space suit with red-pink hoses and a chest control panel, a backpack with pink hoses, silver boots and gloves, and a round helmet; the face is clearly visible BEHIND a clear transparent glass visor (a few soft reflection highlights on the glass, the visor frame is dark), teal hair and yellow goggles visible inside the helmet.

THE ANIMATION: Image 2 shows the standing idle animation: row 1 = FRONT view (4 breathing frames), row 2 = SIDE view facing RIGHT (4 frames), row 3 = BACK view (4 frames). Redraw all 12 frames. The motion is a very subtle breathing loop (chest and shoulders rise and fall slightly, tiny weight shift, hair and clothes follow softly). EXCEPTION to any duplicate rule: the 4 frames of a row look almost the same, they differ only by these small breathing changes exactly as in Image 2. Frame 4 flows back into frame 1 of the same row (seamless loop). The three rows are three different views of the same standing pose.
```

## 15. Raumanzug: Talk (Sprechen) (8 Bilder, 4 × 2)

- **Speichern als:** `assets/raw/3d2d_raumanzug_talk.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_3d2d/raumanzug_talk.png`, `assets/raw/refs_walk/ref_walk_raumanzug.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail of the final image.
Image 2 (assets/raw/refs_3d2d/raumanzug_talk.png): the 3D POSE SHEET. 8 frames of the character on a light grey background in a grid of 4 columns x 2 rows. It defines the DESIGN of the character and the exact POSE of every cell. Copy it cell by cell. Do not copy its grey background or its 3D shading.
Image 3 (assets/raw/refs_walk/ref_walk_raumanzug.png): the same character drawn as a 2D game sprite on a light grey background (front, side facing right, back). Use it only to see how this character looks in the hand-painted 2D style (face shapes, line weight). If Image 2 and Image 3 differ in small details, follow Image 2.
Follow the references closely. Now create the following image.

Character animation sheet on a perfectly flat solid pure green (#00FF00) background: exactly 8 full-body figures of Pixel in the space suit (talking, three-quarter view facing RIGHT), redrawn from Image 2 as hand-painted 2D game sprites, in a strict grid of 4 columns and 2 rows.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no floor line, no horizon.
- Nothing except the figures: no shadows, glow, halo, motion lines, dust, sparkles, text, numbers, labels, arrows, grid lines, frames or speech bubbles. Do NOT copy the light grey background of Image 2.
- Grid: exactly 4 columns and 2 rows, 8 equal cells, reading order left to right then top to bottom, EXACTLY like Image 2. Each figure stands fully inside its own cell, horizontally centered on the cell's center line, with at least 12 percent empty green margin on every side. Nothing touches or overlaps, nothing crosses a cell border. Every cell has exactly one figure.
- SAME POSES AS IMAGE 2: cell k of your image redraws cell k of Image 2: identical pose, limb angles, head tilt, hand shape, body lean, facing direction and mouth. Do NOT invent new poses, do NOT reorder, do NOT skip or duplicate cells.
- Scale and camera: all figures exactly the same scale as the figures in Image 2 relative to each other (full body, no zoom changes). The standing foot is on the same baseline in every cell. Keep the up and down motion of the body exactly as in Image 2, do NOT move the ground line and do NOT change the figure's size between cells.
- Identity: the same character, face, hair, clothes, colors and proportions in all cells, copied from Image 2 (Image 2 has priority over Image 3 for the design). Only the pose changes between cells.
- Style: convert the soft 3D render into hand-painted 2D point-and-click adventure game art exactly like the style image (Image 1): chunky wobbly dark outlines of equal thickness (thin, not heavy: about 3 pixels at the figure's size, never thicker around hair or mouth, no outline line drawn across the mouth), saturated colors, painterly gouache texture. NOT 3D, NOT a render, NOT flat vector, NOT pixel art. Never use green on the character.

CHARACTER: Pixel in the space suit: silver-grey space suit with red-pink hoses and a chest control panel, a backpack with pink hoses, silver boots and gloves, and a round helmet; the face is clearly visible BEHIND a clear transparent glass visor (a few soft reflection highlights on the glass, the visor frame is dark), teal hair and yellow goggles visible inside the helmet.

THE ANIMATION: Image 2 shows a talking animation in 8 frames (4 columns x 2 rows), the character in a three-quarter view turned to the RIGHT, standing in place. Redraw all 8 frames. The mouth shapes change from frame to frame exactly as in Image 2 (open wide, small round, nearly closed, wide smile shape and so on), the head makes small nods and tilts, one hand gestures a little, and the character blinks once. The body stays on the same spot, the feet do not move. Frame 8 flows back into frame 1 (seamless loop). Draw the mouth as a simple friendly painted mouth shape without a dark outline line across it.
```
