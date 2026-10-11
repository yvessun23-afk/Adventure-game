# Pixel für Meshy: Vorlage mit drei Outfits (Nano Banana 2 Lite)

**Ziel:** Ein Bild, auf dem Pixel in den drei Outfits **Standard, Gala-Look und Raumanzug** nebeneinander steht, freundlich und in einer Pose, die sich gut in 3D umwandeln lässt (A-Pose von vorn). Aus diesem einen Bild schneidest du pro Figur einen Ausschnitt und gibst ihn in Meshy ein (Image-to-3D, eine Figur je Eingabebild).

**Referenzbild (anhängen):** `assets/raw/refs_3d/ref_pixel_drei_outfits.png`. Es zeigt alle drei Outfits aus den Spielgrafiken, je von vorn, von der Seite und von hinten.

**Speichern als:** `assets/raw/pixel_3d_vorlage.png`, Format 16:9 (3:1 wäre besser, wenn es Nano Banana Lite anbietet), höchste Auflösung.

## Prompt (komplett kopieren)

```
ATTACHED REFERENCE IMAGE:
Image 1 (ref_pixel_drei_outfits.png): design reference of the character PIXEL in three outfits (row 1: standard outfit, row 2: gala outfit, row 3: space suit), each shown from the front, the side and the back. Copy every outfit, the hair, the goggles, the colors and the proportions exactly. Ignore the grey background.
Follow the reference closely. Now create the following image.

ONE single illustration, landscape format, with exactly THREE full-body figures of the same character PIXEL standing side by side in a row, evenly spaced with a wide empty gap between them, all the same size, feet on one common line, nothing touching or overlapping. From left to right: (1) Pixel in her standard outfit, (2) Pixel in the gala outfit, (3) Pixel in the space suit.

Pixel: a young courier girl, friendly and cheerful: a warm, open smile, big friendly eyes looking straight at the viewer, relaxed soft eyebrows (no frown, no stern look). Messy short teal hair. Standard outfit: orange puffy jacket with a reflective grey stripe, dark green cargo trousers with side pockets, teal boots with pink soles, a small olive satchel on a strap, yellow goggles pushed up on the forehead. Gala outfit: sparkling teal tailcoat jacket with dark lapels and a teal bow tie over a white shirt, dark green cargo trousers, dark boots with pink soles, styled teal hair, no goggles. Space suit: silver-grey space suit with pink hoses and a chest control panel, a backpack with pink hoses, silver boots and gloves, a clear glass bubble helmet around the head with the goggles visible inside (the face stays fully visible and friendly).

POSE FOR 3D CONVERSION (very important): every figure stands perfectly straight and symmetric, seen exactly from the FRONT, in a relaxed A-pose: the arms hang down and slightly away from the body (about 30 degrees), the hands open with the fingers slightly spread and visible, the legs straight and a little apart (feet shoulder width), both feet flat on the ground pointing forward, the head upright and looking straight ahead. No walking, no action pose, no props in the hands (the satchel stays on the body). The whole body from the top of the hair to the soles of the boots is fully visible, nothing cropped.

BACKGROUND: a perfectly flat, plain, light neutral grey background (#D0D0D0) behind all three figures, no floor, no ground line, no shadows, no reflections, no gradient, no texture, no scenery, no text, no labels, no watermark, no frame. Even, soft, shadow-free studio lighting from the front so that colors are clear and no part of the body is hidden in shadow.

STYLE: hand-painted 2D point-and-click adventure game character art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the reference: chunky dark outlines of equal thickness, saturated colors, painterly gouache texture, exaggerated cartoon proportions (large head, big boots), clean readable shapes without tiny details that would confuse a 3D converter. NOT flat vector, NOT pixel art, NOT photorealistic, NOT a 3D render.
```

## Einzelfiguren (falls Meshy mit dem Ausschnitt nicht zurechtkommt)

Wenn du lieber ein Bild je Figur erzeugst, nimm den gleichen Prompt und ersetze den ersten Absatz nach den Referenzen durch:
`ONE single illustration with exactly ONE full-body figure of the character PIXEL in the [standard outfit | gala outfit | space suit], centered, seen from the front in the A-pose described below, on a perfectly flat light grey background.` und entferne die Beschreibung der beiden anderen Outfits.

## Hinweise für Meshy

- **Bild zuschneiden:** Pro Figur einen Ausschnitt mit etwas grauem Rand, quadratisch oder hochkant. Meshy erkennt nur eine Figur pro Bild.
- **FBX:** Siehe unten, das ist in Ordnung (Antwort an dich).
- **Gesicht:** Das Wort „friendly" steht im Prompt. Das letzte 3D-Modell von Pixel hat streng geschaut. Wenn Meshy das Gesicht wieder zu ernst macht, im Meshy-Prompt „friendly smile, cheerful" ergänzen.

## FBX statt GLB: ist das OK?

**Ja.** Ich lese FBX-Dateien direkt (mit dem Standard-Lader der Bibliothek three.js) und rendere sie genauso wie die bisherigen Modelle. Bitte beachte:
1. **Texturen:** Beim Export aus Meshy die Option „Texturen einbetten" wählen (oder die Texturbilder `*_baked.png` o. ä. mit in denselben Ordner legen). Ohne Texturen wird die Figur grau.
2. **Animationen:** Pro Outfit eine FBX „mit Skin" (die Figur mit dem Skelett, z. B. `pixel_idle.fbx`) und je eine FBX für `walk` und `talk`. Alle drei müssen dasselbe Skelett haben (Mixamo oder Meshy-Rigging, nicht mischen). Die Namen der Knochen dürfen sich nicht unterscheiden.
3. **Ablage:** `assets/3d/pixel/`, `assets/3d/pixel_gala/`, `assets/3d/pixel_raumanzug/`, in jedem Ordner `idle.fbx`, `walk.fbx`, `talk.fbx`.
4. **Größe:** FBX-Dateien aus Meshy sind oft 20 bis 60 MB. GitHub nimmt Dateien bis 100 MB, mehr geht nur mit Git LFS.
