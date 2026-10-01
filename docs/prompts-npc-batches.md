# NPCs: 12 Batch-Bilder mit je 3 Figuren

**Warum so?** Die Hintergrund-Artefakte (Dunst, Geisterfiguren, Töpfe, Schlieren) kamen von (1) fehlerhaften Referenzbildern und (2) 12er- bis 24er-Sheets ohne feste Struktur. Jetzt gilt:

1. **Saubere Referenzen.** Zu jedem Batch gibt es ein Referenzbild, das ich aus den fertigen Spielfiguren zusammengesetzt habe (`assets/raw/refs_npc/ref_npc_XX.png`): Pixel als Maßstab links, daneben die Figur ruhig und sprechend, auf hellgrauem Grund. Keine Sheets mit Fehlern, keine Szenenhintergründe, keine grüne Fläche zum Abkupfern.
2. **Feste Struktur.** Jedes Bild: 4 Spalten (ruhig, sprechend, Animation A, Animation B) mal 3 Zeilen (eine Figur pro Zeile). 3 Figuren pro Bild = **12 Bilder statt 36**.
3. **Ausdrückliche Verbote** für Dunst, Glühen, Schatten, Geisterkopien, Text und Hilfslinien im Prompt.
4. **Der Ausschneider räumt zusätzlich auf** (`tools/slice_npc_grid.py`): Er entfernt kleine Reste und Dunst automatisch, setzt jede Figur an ihre Fußlinie und prüft, ob alle 12 Zellen genau eine Figur enthalten. Findet er ein Problem, nennt er die betroffene Zeile, dann musst du nur diese Figur neu erzeugen.

**Ablauf je Bild**
1. Neuer Chat. Referenzen in der angegebenen Reihenfolge anhängen: Image 1 = `ref_03_stil_nudelgasse.png`, Image 2 = das Batch-Referenzbild aus `assets/raw/refs_npc/`.
2. Prompt kopieren, 16:9, höchste Auflösung, speichern als `assets/raw/npcbatch_XX.png`.
3. Sag mir Bescheid. Ich lasse `python3 tools/slice_npc_grid.py --all` laufen und zeige dir das Prüfbild.

**Hinweis zu „100 %“:** Eine KI kann ich nicht dazu zwingen, nie einen Fehler zu machen. Mit diesem Aufbau sind aber die Hauptursachen weg, und der Ausschneider fängt Dunst und Reste ab. Wenn eine Zeile doch misslingt, genügt es, im selben Chat zu schreiben: „Redo only row N exactly as described, keep everything else unchanged“.

**Batches**

| Nr. | Figuren |
|---|---|

| 01 | Oma Zhang, Rosi, Bit |
| 02 | Hehler-Hugo, Kurt, Brezel |
| 03 | Schaffner 4711, Bello-5000, Wuschel (defekt) |
| 04 | Wuschel (repariert), Ratten-Trupp, Katze Schrödinger |
| 05 | Frau Ablage, Chef Kloß, Grünhorn |
| 06 | Prof. Staub, Schnipp, Madame Jackpot |
| 07 | Mortimer, Dr. Schraub, Stempel-Stefan |
| 08 | Kiosk-Zeus, Flimmer, Mr. Tackert |
| 09 | Türsteher Klaus, Sebastian.exe, Baron von Chrom |
| 10 | Masseur Zen-3, Flug-Hans, Käpt'n Kabel |
| 11 | Schicht, Streikposten, Ramen-Kraken |
| 12 | Kleo, Teddy-Bot, Teddy-Bot mit Sensor |

---

## Batch 01: Oma Zhang, Rosi, Bit

- **Speichern als:** `assets/raw/npcbatch_01.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_npc/ref_npc_01.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail.
Image 2 (ref_npc_01.png): clean design and scale reference on a light grey background. Each row shows Pixel (for scale only, do not draw her) and then one character in its idle pose and, if available, its talking pose. Copy the characters exactly; keep their row order.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with exactly 12 full-body figures: 3 characters (one per row) times 4 poses (one per column), in a strict 4 by 3 grid.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no paper grain, no lighting variation, no horizon, no floor line.
- Nothing except the 12 figures: no smoke, haze, mist, glow, sparkles, particles, dust, shadows, reflections, ghost or transparent copies, speech bubbles, text, sound effects, labels, numbers, grid lines or frames. Small effects that belong to a pose (a spark, a puff of flour, a steam wisp, a heart) must be drawn as solid, clearly outlined shapes attached to the character and in the same colors as the character, never as soft glows.
- Grid: exactly 4 columns and 3 rows, 12 equal cells. Row = one character, column = one pose. Each figure stands fully inside its own cell, horizontally centered, feet on one common baseline per row, with a wide green margin (at least 15 percent of the cell size) on all sides. Nothing touches or overlaps, nothing crosses a cell border.
- Scale: in the reference image Pixel (teal hair, orange jacket) is shown next to each character at the correct relative size. Draw every character at the same relative height to Pixel as in the reference (the height is also given in percent below), but do NOT draw Pixel. Pixel's height (100 percent) is 52 percent of a cell's height, so the tallest figure of this image is about 80 percent of the cell height.
- Camera and light: full body, three-quarter view, every figure faces LEFT, the same camera distance, soft even warm light from the upper left, no cast shadow, no rim glow.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness on all characters, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on a character.
- Consistency: all four figures in a row are the same character: identical design, colors, proportions and line weight. Only pose and facial expression change. Copy the design of each character EXACTLY from the reference image (Image 2): first and second picture in its row are its idle and talking pose.

THE THREE CHARACTERS:

ROW 1: Oma Zhang (height 90 percent of Pixel)
Appearance: A tiny 87-year-old grandmother. Silver-grey hair in a bun held by two wooden chopsticks, huge round black-rimmed glasses that make her eyes look enormous, a kind wrinkled face with rosy cheeks. Lilac-purple blouse with a cream-white kitchen apron, pink house shoes.
Column 1 IDLE: standing with both hands folded in front of her apron, gentle smile.
Column 2 TALKING: mouth open, one hand raised and wagging a finger, eyebrows lifted, scolding but loving.
Column 3 ANIMATION A: stirring an invisible soup pot with a wooden ladle held out in front of her, head slightly tilted, content smile.
Column 4 ANIMATION B: same stirring motion with the ladle on the other side, taking a tiny taste with a satisfied squint.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

ROW 2: Rosi (height 154 percent of Pixel)
Appearance: An enormous rusty robot woman, wide hips and shoulders, rust-brown and copper body with green patina streaks. A dark welder mask with a visor is pushed up on her head. She wears chunky jewelry made of bolts and a turquoise pendant. One arm ends in a crane arm with a hook. Heavy boots.
Column 1 IDLE: standing with legs apart, arms hanging, welder mask pushed up, content look.
Column 2 TALKING: one big arm gesturing wide, mouth open, loud and friendly.
Column 3 ANIMATION A: hammering on something with a big wrench, arm raised high, welder mask pulled down over the face.
Column 4 ANIMATION B: hammer swung down, a few sparks flying, mask still down, body leaning into the swing.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

ROW 3: Bit (height 100 percent of Pixel)
Appearance: A bar robot. Silver-grey bucket-shaped head with a bucket handle on top, two round yellow glowing eyes, a small display on his chest with a green loading bar. Thin segmented arms and legs, one hand holds a silver cocktail shaker.
Column 1 IDLE: standing upright, shaker held at his chest, polite blank smile.
Column 2 TALKING: mouth open, free hand gesturing, shaker raised slightly, chatty.
Column 3 ANIMATION A: shaking the cocktail shaker high beside his head, loading bar on his chest at about one third.
Column 4 ANIMATION B: shaker held low, lifting the lid to peek inside, loading bar at about two thirds.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## Batch 02: Hehler-Hugo, Kurt, Brezel

- **Speichern als:** `assets/raw/npcbatch_02.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_npc/ref_npc_02.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail.
Image 2 (ref_npc_02.png): clean design and scale reference on a light grey background. Each row shows Pixel (for scale only, do not draw her) and then one character in its idle pose and, if available, its talking pose. Copy the characters exactly; keep their row order.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with exactly 12 full-body figures: 3 characters (one per row) times 4 poses (one per column), in a strict 4 by 3 grid.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no paper grain, no lighting variation, no horizon, no floor line.
- Nothing except the 12 figures: no smoke, haze, mist, glow, sparkles, particles, dust, shadows, reflections, ghost or transparent copies, speech bubbles, text, sound effects, labels, numbers, grid lines or frames. Small effects that belong to a pose (a spark, a puff of flour, a steam wisp, a heart) must be drawn as solid, clearly outlined shapes attached to the character and in the same colors as the character, never as soft glows.
- Grid: exactly 4 columns and 3 rows, 12 equal cells. Row = one character, column = one pose. Each figure stands fully inside its own cell, horizontally centered, feet on one common baseline per row, with a wide green margin (at least 15 percent of the cell size) on all sides. Nothing touches or overlaps, nothing crosses a cell border.
- Scale: in the reference image Pixel (teal hair, orange jacket) is shown next to each character at the correct relative size. Draw every character at the same relative height to Pixel as in the reference (the height is also given in percent below), but do NOT draw Pixel. Pixel's height (100 percent) is 70 percent of a cell's height, so the tallest figure of this image is about 80 percent of the cell height.
- Camera and light: full body, three-quarter view, every figure faces LEFT, the same camera distance, soft even warm light from the upper left, no cast shadow, no rim glow.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness on all characters, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on a character.
- Consistency: all four figures in a row are the same character: identical design, colors, proportions and line weight. Only pose and facial expression change. Copy the design of each character EXACTLY from the reference image (Image 2): first and second picture in its row are its idle and talking pose.

THE THREE CHARACTERS:

ROW 1: Hehler-Hugo (height 99 percent of Pixel)
Appearance: A sly green frog-like creature in a long tan-brown trench coat with countless pockets, a wide-brimmed brown hat, a purple shirt collar, a toothy grin and half-closed scheming eyes. He has four arms; the extra pair is hidden under the coat.
Column 1 IDLE: standing with a finger against his chin, glancing sideways, sly grin.
Column 2 TALKING: one hand open as if offering a deal, mouth open, eyebrow raised.
Column 3 ANIMATION A: glancing sideways over his shoulder with suspicious eyes, two arms holding the coat open to show shiny junk inside.
Column 4 ANIMATION B: coat closed again, finger on his lips in a shushing gesture, looking the other way.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

ROW 2: Kurt (height 93 percent of Pixel)
Appearance: A pigeon crime boss with blue-grey feathers, a puffed-out chest, a thick gold chain with a G pendant, a monocle on one eye and a tiny cigar holder with a cigar in his beak. Orange legs and feet.
Column 1 IDLE: standing with chest puffed, one wing on his chain, smug.
Column 2 TALKING: beak open, one wing raised in a mob-boss gesture, monocle glinting.
Column 3 ANIMATION A: head pecking forward in a typical pigeon bob, chest puffed, cigar holder in beak.
Column 4 ANIMATION B: head pulled back, wing smoothing the gold chain, smug half-closed eyes.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

ROW 3: Brezel (height 101 percent of Pixel)
Appearance: A bakery robot whose body is a golden-brown pretzel dusted with flour, a tall white chef hat on top, a cheerful face in the pretzel's loop, copper arms and legs.
Column 1 IDLE: standing with arms at his sides, a puff of flour, friendly smile.
Column 2 TALKING: mouth open, one hand waving a small flour cloud, cheerful.
Column 3 ANIMATION A: kneading dough in front of his belly with both hands, flour puffing up, cheerful face.
Column 4 ANIMATION B: tossing a small dough ball up in the air with one hand, other hand on his hip, proud grin.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## Batch 03: Schaffner 4711, Bello-5000, Wuschel (defekt)

- **Speichern als:** `assets/raw/npcbatch_03.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_npc/ref_npc_03.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail.
Image 2 (ref_npc_03.png): clean design and scale reference on a light grey background. Each row shows Pixel (for scale only, do not draw her) and then one character in its idle pose and, if available, its talking pose. Copy the characters exactly; keep their row order.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with exactly 12 full-body figures: 3 characters (one per row) times 4 poses (one per column), in a strict 4 by 3 grid.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no paper grain, no lighting variation, no horizon, no floor line.
- Nothing except the 12 figures: no smoke, haze, mist, glow, sparkles, particles, dust, shadows, reflections, ghost or transparent copies, speech bubbles, text, sound effects, labels, numbers, grid lines or frames. Small effects that belong to a pose (a spark, a puff of flour, a steam wisp, a heart) must be drawn as solid, clearly outlined shapes attached to the character and in the same colors as the character, never as soft glows.
- Grid: exactly 4 columns and 3 rows, 12 equal cells. Row = one character, column = one pose. Each figure stands fully inside its own cell, horizontally centered, feet on one common baseline per row, with a wide green margin (at least 15 percent of the cell size) on all sides. Nothing touches or overlaps, nothing crosses a cell border.
- Scale: in the reference image Pixel (teal hair, orange jacket) is shown next to each character at the correct relative size. Draw every character at the same relative height to Pixel as in the reference (the height is also given in percent below), but do NOT draw Pixel. Pixel's height (100 percent) is 70 percent of a cell's height, so the tallest figure of this image is about 80 percent of the cell height.
- Camera and light: full body, three-quarter view, every figure faces LEFT, the same camera distance, soft even warm light from the upper left, no cast shadow, no rim glow.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness on all characters, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on a character.
- Consistency: all four figures in a row are the same character: identical design, colors, proportions and line weight. Only pose and facial expression change. Copy the design of each character EXACTLY from the reference image (Image 2): first and second picture in its row are its idle and talking pose.

THE THREE CHARACTERS:

ROW 1: Schaffner 4711 (height 95 percent of Pixel)
Appearance: A boxy train-conductor robot with a rectangular grey-blue head, a navy conductor's cap with a gold badge, a navy uniform jacket with a tie, a whistle on a cord and a giant rubber stamp in one hand. Stern look.
Column 1 IDLE: standing stiffly, stamp held at his side, stern.
Column 2 TALKING: mouth open, free hand pointing, stamp raised, officious.
Column 3 ANIMATION A: checking an imaginary pocket watch held in one hand, stern look, stamp tucked under the other arm.
Column 4 ANIMATION B: blowing the whistle with puffed cheeks, stamp raised in the other hand.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

ROW 2: Bello-5000 (height 62 percent of Pixel)
Appearance: A robot dog with a silver-grey metal body, big round yellow ball-shaped eyes, a red collar, a wagging antenna as a tail and a chew-toy bone in his mouth. Four legs, sitting or standing like a dog.
Column 1 IDLE: sitting, tail antenna upright, head tilted, bone in mouth.
Column 2 TALKING: standing, barking with open mouth, tail wagging, excited.
Column 3 ANIMATION A: sitting up and wagging the antenna tail to the left, tongue panel out, happy eyes.
Column 4 ANIMATION B: antenna tail wagging to the right, head tilted curiously, chew toy squeaking in his mouth.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

ROW 3: Wuschel (defekt) (height 58 percent of Pixel)
Appearance: A small round vacuum-cleaner robot: grey dented shell, one wheel missing so it tilts, a few sparks, big sad droopy eyes, a short hose.
Column 1 IDLE: tilted on its broken wheel, drooping eyes, a little smoke.
Column 2 TALKING: eyes wide, a small spark, tiny squeaking mouth, shaking.
Column 3 ANIMATION A: wobbling to the left on its broken wheel, a small spark popping from the dent, one eye flickering.
Column 4 ANIMATION B: wobbling to the right, sad droopy eyes, a thin puff of smoke.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## Batch 04: Wuschel (repariert), Ratten-Trupp, Katze Schrödinger

- **Speichern als:** `assets/raw/npcbatch_04.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_npc/ref_npc_04.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail.
Image 2 (ref_npc_04.png): clean design and scale reference on a light grey background. Each row shows Pixel (for scale only, do not draw her) and then one character in its idle pose and, if available, its talking pose. Copy the characters exactly; keep their row order.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with exactly 12 full-body figures: 3 characters (one per row) times 4 poses (one per column), in a strict 4 by 3 grid.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no paper grain, no lighting variation, no horizon, no floor line.
- Nothing except the 12 figures: no smoke, haze, mist, glow, sparkles, particles, dust, shadows, reflections, ghost or transparent copies, speech bubbles, text, sound effects, labels, numbers, grid lines or frames. Small effects that belong to a pose (a spark, a puff of flour, a steam wisp, a heart) must be drawn as solid, clearly outlined shapes attached to the character and in the same colors as the character, never as soft glows.
- Grid: exactly 4 columns and 3 rows, 12 equal cells. Row = one character, column = one pose. Each figure stands fully inside its own cell, horizontally centered, feet on one common baseline per row, with a wide green margin (at least 15 percent of the cell size) on all sides. Nothing touches or overlaps, nothing crosses a cell border.
- Scale: in the reference image Pixel (teal hair, orange jacket) is shown next to each character at the correct relative size. Draw every character at the same relative height to Pixel as in the reference (the height is also given in percent below), but do NOT draw Pixel. Pixel's height (100 percent) is 70 percent of a cell's height, so the tallest figure of this image is about 80 percent of the cell height.
- Camera and light: full body, three-quarter view, every figure faces LEFT, the same camera distance, soft even warm light from the upper left, no cast shadow, no rim glow.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness on all characters, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on a character.
- Consistency: all four figures in a row are the same character: identical design, colors, proportions and line weight. Only pose and facial expression change. Copy the design of each character EXACTLY from the reference image (Image 2): first and second picture in its row are its idle and talking pose.

THE THREE CHARACTERS:

ROW 1: Wuschel (repariert) (height 58 percent of Pixel)
Appearance: The same small round vacuum-cleaner robot after repair: shiny light-blue shell, two wheels, a happy face with round eyes, a small sparkle.
Column 1 IDLE: upright on two wheels, happy eyes, tiny sparkle.
Column 2 TALKING: bouncing slightly, open happy mouth, a heart symbol above.
Column 3 ANIMATION A: spinning a little to the left with a tiny sparkle on the shiny body, happy eyes.
Column 4 ANIMATION B: spinning back to the right, bouncing slightly, a small happy heart symbol on its display.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

ROW 2: Ratten-Trupp (height 62 percent of Pixel)
Appearance: A trio of grey rats with tiny yellow hard hats, each holding a small protest sign with a megaphone symbol (no text). Pointed snouts, long thin tails, determined faces.
Column 1 IDLE: standing in a row, signs held low, bored.
Column 2 TALKING: all three with open mouths, signs held up, shouting.
Column 3 ANIMATION A: all three rats raising their blank protest signs up high, mouths open shouting.
Column 4 ANIMATION B: signs lowered, rats leaning on each other, one wiping its brow, another yawning.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

ROW 3: Katze Schrödinger (height 63 percent of Pixel)
Appearance: A smug grey cat sitting upright, a faint cyan-green glow along the edges of the body, slightly see-through, tail curled around the paws.
Column 1 IDLE: sitting, tail curled, eyes half closed, smug.
Column 2 TALKING: mouth open in a meow, head raised, paw lifted.
Column 3 ANIMATION A: licking one front paw, eyes closed, tail curled around the feet.
Column 4 ANIMATION B: stretching with the front paws forward and the back raised, a wide yawn.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## Batch 05: Frau Ablage, Chef Kloß, Grünhorn

- **Speichern als:** `assets/raw/npcbatch_05.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_npc/ref_npc_05.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail.
Image 2 (ref_npc_05.png): clean design and scale reference on a light grey background. Each row shows Pixel (for scale only, do not draw her) and then one character in its idle pose and, if available, its talking pose. Copy the characters exactly; keep their row order.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with exactly 12 full-body figures: 3 characters (one per row) times 4 poses (one per column), in a strict 4 by 3 grid.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no paper grain, no lighting variation, no horizon, no floor line.
- Nothing except the 12 figures: no smoke, haze, mist, glow, sparkles, particles, dust, shadows, reflections, ghost or transparent copies, speech bubbles, text, sound effects, labels, numbers, grid lines or frames. Small effects that belong to a pose (a spark, a puff of flour, a steam wisp, a heart) must be drawn as solid, clearly outlined shapes attached to the character and in the same colors as the character, never as soft glows.
- Grid: exactly 4 columns and 3 rows, 12 equal cells. Row = one character, column = one pose. Each figure stands fully inside its own cell, horizontally centered, feet on one common baseline per row, with a wide green margin (at least 15 percent of the cell size) on all sides. Nothing touches or overlaps, nothing crosses a cell border.
- Scale: in the reference image Pixel (teal hair, orange jacket) is shown next to each character at the correct relative size. Draw every character at the same relative height to Pixel as in the reference (the height is also given in percent below), but do NOT draw Pixel. Pixel's height (100 percent) is 70 percent of a cell's height, so the tallest figure of this image is about 80 percent of the cell height.
- Camera and light: full body, three-quarter view, every figure faces LEFT, the same camera distance, soft even warm light from the upper left, no cast shadow, no rim glow.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness on all characters, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on a character.
- Consistency: all four figures in a row are the same character: identical design, colors, proportions and line weight. Only pose and facial expression change. Copy the design of each character EXACTLY from the reference image (Image 2): first and second picture in its row are its idle and talking pose.

THE THREE CHARACTERS:

ROW 1: Frau Ablage (height 70 percent of Pixel)
Appearance: A stern receptionist robot whose body is a khaki-beige metal filing cabinet with three drawers, tufts of paper on top, round glasses on a chain, small grey arms, a sour pressed mouth.
Column 1 IDLE: standing, arms folded over a drawer, sour look.
Column 2 TALKING: one hand pulling her glasses down, mouth open, scolding.
Column 3 ANIMATION A: a small drawer on her body pulled open, one hand pulling out a paper, looking over the glasses.
Column 4 ANIMATION B: drawer slammed shut, one finger tapping on her body, impatient look.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

ROW 2: Chef Kloß (height 95 percent of Pixel)
Appearance: A desperate chubby cook robot: a cream dumpling-shaped head with folds, a white chef coat and apron, a red neckerchief, striped trousers, grey metal hands, a ladle in one hand, worried eyebrows and sweat drops.
Column 1 IDLE: standing, ladle held low, worried look.
Column 2 TALKING: ladle raised, mouth open, pleading with both brows up.
Column 3 ANIMATION A: wringing both hands in despair, sweat drops flying, eyes wide.
Column 4 ANIMATION B: ladle raised, shaking his head, mouth in a wobbling worried line.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

ROW 3: Grünhorn (height 103 percent of Pixel)
Appearance: A gardener robot assembled from garden tools: olive-green and copper body, shovel-blade arms, a watering can in one hand, a small green leaf growing from his head, glowing yellow-green eyes.
Column 1 IDLE: standing, watering can held low, leaf perked up, calm.
Column 2 TALKING: one tool arm gesturing, mouth open, whispering excitedly.
Column 3 ANIMATION A: watering an invisible plant with the watering can arm tipped forward, a few drops falling.
Column 4 ANIMATION B: watering can arm raised again, the leaf on his head perked up, proud smile.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## Batch 06: Prof. Staub, Schnipp, Madame Jackpot

- **Speichern als:** `assets/raw/npcbatch_06.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_npc/ref_npc_06.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail.
Image 2 (ref_npc_06.png): clean design and scale reference on a light grey background. Each row shows Pixel (for scale only, do not draw her) and then one character in its idle pose and, if available, its talking pose. Copy the characters exactly; keep their row order.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with exactly 12 full-body figures: 3 characters (one per row) times 4 poses (one per column), in a strict 4 by 3 grid.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no paper grain, no lighting variation, no horizon, no floor line.
- Nothing except the 12 figures: no smoke, haze, mist, glow, sparkles, particles, dust, shadows, reflections, ghost or transparent copies, speech bubbles, text, sound effects, labels, numbers, grid lines or frames. Small effects that belong to a pose (a spark, a puff of flour, a steam wisp, a heart) must be drawn as solid, clearly outlined shapes attached to the character and in the same colors as the character, never as soft glows.
- Grid: exactly 4 columns and 3 rows, 12 equal cells. Row = one character, column = one pose. Each figure stands fully inside its own cell, horizontally centered, feet on one common baseline per row, with a wide green margin (at least 15 percent of the cell size) on all sides. Nothing touches or overlaps, nothing crosses a cell border.
- Scale: in the reference image Pixel (teal hair, orange jacket) is shown next to each character at the correct relative size. Draw every character at the same relative height to Pixel as in the reference (the height is also given in percent below), but do NOT draw Pixel. Pixel's height (100 percent) is 70 percent of a cell's height, so the tallest figure of this image is about 80 percent of the cell height.
- Camera and light: full body, three-quarter view, every figure faces LEFT, the same camera distance, soft even warm light from the upper left, no cast shadow, no rim glow.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness on all characters, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on a character.
- Consistency: all four figures in a row are the same character: identical design, colors, proportions and line weight. Only pose and facial expression change. Copy the design of each character EXACTLY from the reference image (Image 2): first and second picture in its row are its idle and talking pose.

THE THREE CHARACTERS:

ROW 1: Prof. Staub (height 99 percent of Pixel)
Appearance: A curator robot in an old dusty brown tailcoat and waistcoat, grey hair swept back, one large magnifying-glass eye, thin grey metal hands, a dignified bored face.
Column 1 IDLE: standing, hands behind his back, magnifying eye focused.
Column 2 TALKING: one finger raised, magnifying eye wide, mouth open, lecturing.
Column 3 ANIMATION A: leaning forward and inspecting something with the magnifying-glass eye, one finger raised.
Column 4 ANIMATION B: straightening up, brushing dust off his tailcoat with a small cloud of dust.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

ROW 2: Schnipp (height 99 percent of Pixel)
Appearance: A barber robot with a silver-white body, a striped white-grey barber coat with a red-white-blue pole pattern, wild electrified light-blue hair with sparks, one glowing red eye, scissors instead of hands.
Column 1 IDLE: standing, scissors held up, sparks in the hair.
Column 2 TALKING: mouth open, scissors snipping, manic grin.
Column 3 ANIMATION A: snipping both scissor hands in the air at the front, tiny hair snippets flying.
Column 4 ANIMATION B: scissors crossed in front of his chest like a pose, hair standing up with small sparks.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

ROW 3: Madame Jackpot (height 103 percent of Pixel)
Appearance: An elegant woman with a roulette wheel as a hat, black hair, a gold gown with a magenta-pink underskirt and cyan trim, a hand fan, a cold polished smile.
Column 1 IDLE: standing with one hand on her hip, fan closed, cold smile.
Column 2 TALKING: fan open in one hand, mouth open, one eyebrow raised, haughty.
Column 3 ANIMATION A: hat's roulette wheel spinning (slight motion blur lines on the hat), one gloved hand fanning herself.
Column 4 ANIMATION B: fan hand lowered, one eyebrow raised, cold polite smile, hat wheel still.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## Batch 07: Mortimer, Dr. Schraub, Stempel-Stefan

- **Speichern als:** `assets/raw/npcbatch_07.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_npc/ref_npc_07.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail.
Image 2 (ref_npc_07.png): clean design and scale reference on a light grey background. Each row shows Pixel (for scale only, do not draw her) and then one character in its idle pose and, if available, its talking pose. Copy the characters exactly; keep their row order.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with exactly 12 full-body figures: 3 characters (one per row) times 4 poses (one per column), in a strict 4 by 3 grid.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no paper grain, no lighting variation, no horizon, no floor line.
- Nothing except the 12 figures: no smoke, haze, mist, glow, sparkles, particles, dust, shadows, reflections, ghost or transparent copies, speech bubbles, text, sound effects, labels, numbers, grid lines or frames. Small effects that belong to a pose (a spark, a puff of flour, a steam wisp, a heart) must be drawn as solid, clearly outlined shapes attached to the character and in the same colors as the character, never as soft glows.
- Grid: exactly 4 columns and 3 rows, 12 equal cells. Row = one character, column = one pose. Each figure stands fully inside its own cell, horizontally centered, feet on one common baseline per row, with a wide green margin (at least 15 percent of the cell size) on all sides. Nothing touches or overlaps, nothing crosses a cell border.
- Scale: in the reference image Pixel (teal hair, orange jacket) is shown next to each character at the correct relative size. Draw every character at the same relative height to Pixel as in the reference (the height is also given in percent below), but do NOT draw Pixel. Pixel's height (100 percent) is 70 percent of a cell's height, so the tallest figure of this image is about 80 percent of the cell height.
- Camera and light: full body, three-quarter view, every figure faces LEFT, the same camera distance, soft even warm light from the upper left, no cast shadow, no rim glow.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness on all characters, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on a character.
- Consistency: all four figures in a row are the same character: identical design, colors, proportions and line weight. Only pose and facial expression change. Copy the design of each character EXACTLY from the reference image (Image 2): first and second picture in its row are its idle and talking pose.

THE THREE CHARACTERS:

ROW 1: Mortimer (height 101 percent of Pixel)
Appearance: A tall slim casino doorman robot in a dark purple velvet suit with a tie, a metallic grey face with glowing yellow eyes, a red velvet rope with a brass post in one hand.
Column 1 IDLE: standing very straight, rope at his side, stony face.
Column 2 TALKING: one hand raised politely, mouth open, aloof.
Column 3 ANIMATION A: arms crossed on his chest with the red rope hanging down, stony look straight ahead.
Column 4 ANIMATION B: straightening his velvet lapels with one hand, looking down his nose.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

ROW 2: Dr. Schraub (height 103 percent of Pixel)
Appearance: A nervous thin elderly doctor with big round glasses, thin grey hair, a white lab coat, trembling hands, wide worried eyes.
Column 1 IDLE: standing, hands trembling in front of him, nervous.
Column 2 TALKING: both hands raised, mouth open, stammering.
Column 3 ANIMATION A: both hands trembling in front of him (small motion lines), eyes wide behind the glasses.
Column 4 ANIMATION B: pushing his glasses up with a shaky finger, nervous half smile.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

ROW 3: Stempel-Stefan (height 67 percent of Pixel)
Appearance: A stout official in a navy uniform and cap, a red round nose, a moustache, ink-stained fingers and an oversized rubber stamp in one hand.
Column 1 IDLE: standing, stamp held at his belly, grumpy.
Column 2 TALKING: stamp raised, other hand pointing, mouth open, bureaucratic.
Column 3 ANIMATION A: stamp raised high above a table edge, stern concentrated face.
Column 4 ANIMATION B: stamp slammed down low, a small puff of ink, satisfied nod.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## Batch 08: Kiosk-Zeus, Flimmer, Mr. Tackert

- **Speichern als:** `assets/raw/npcbatch_08.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_npc/ref_npc_08.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail.
Image 2 (ref_npc_08.png): clean design and scale reference on a light grey background. Each row shows Pixel (for scale only, do not draw her) and then one character in its idle pose and, if available, its talking pose. Copy the characters exactly; keep their row order.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with exactly 12 full-body figures: 3 characters (one per row) times 4 poses (one per column), in a strict 4 by 3 grid.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no paper grain, no lighting variation, no horizon, no floor line.
- Nothing except the 12 figures: no smoke, haze, mist, glow, sparkles, particles, dust, shadows, reflections, ghost or transparent copies, speech bubbles, text, sound effects, labels, numbers, grid lines or frames. Small effects that belong to a pose (a spark, a puff of flour, a steam wisp, a heart) must be drawn as solid, clearly outlined shapes attached to the character and in the same colors as the character, never as soft glows.
- Grid: exactly 4 columns and 3 rows, 12 equal cells. Row = one character, column = one pose. Each figure stands fully inside its own cell, horizontally centered, feet on one common baseline per row, with a wide green margin (at least 15 percent of the cell size) on all sides. Nothing touches or overlaps, nothing crosses a cell border.
- Scale: in the reference image Pixel (teal hair, orange jacket) is shown next to each character at the correct relative size. Draw every character at the same relative height to Pixel as in the reference (the height is also given in percent below), but do NOT draw Pixel. Pixel's height (100 percent) is 70 percent of a cell's height, so the tallest figure of this image is about 80 percent of the cell height.
- Camera and light: full body, three-quarter view, every figure faces LEFT, the same camera distance, soft even warm light from the upper left, no cast shadow, no rim glow.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness on all characters, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on a character.
- Consistency: all four figures in a row are the same character: identical design, colors, proportions and line weight. Only pose and facial expression change. Copy the design of each character EXACTLY from the reference image (Image 2): first and second picture in its row are its idle and talking pose.

THE THREE CHARACTERS:

ROW 1: Kiosk-Zeus (height 62 percent of Pixel)
Appearance: A newspaper-vendor robot with a boxy screen body that scrolls colorful headline bars, a brown fedora full of rolled newspapers, thin arms, a cheerful look.
Column 1 IDLE: standing, one hand holding a newspaper, screen scrolling.
Column 2 TALKING: one hand cupped at his mouth shouting, mouth open.
Column 3 ANIMATION A: screen body scrolling headlines (blurry colorful text bars), one hand cupped at his mouth shouting.
Column 4 ANIMATION B: holding up a newspaper in one hand, other hand tipping his headline hat.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

ROW 2: Flimmer (height 56 percent of Pixel)
Appearance: A sleepy hologram technician: cyan semi-transparent body with flickering edges, big headphones around the neck, closed eyes, a small cap.
Column 1 IDLE: standing, eyes closed, a small Z floating, edges flickering.
Column 2 TALKING: head lifted, one eye half open, mouth open, one hand waving lazily.
Column 3 ANIMATION A: head nodding forward in a doze, small Z letters floating above, hologram edges flickering.
Column 4 ANIMATION B: head snapping up with one eye half open, a flicker line through the body.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

ROW 3: Mr. Tackert (height 45 percent of Pixel)
Appearance: A tiny orange hamster with a tiny tie, standing next to or in a small running wheel, big round eyes.
Column 1 IDLE: standing upright next to the wheel, tie straight.
Column 2 TALKING: on his hind legs, one paw raised, mouth open, squeaking importantly.
Column 3 ANIMATION A: running in the wheel with the front legs forward, tie flying backward, determined face.
Column 4 ANIMATION B: running with the back legs forward in the wheel, tie flying the other way, panting.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## Batch 09: Türsteher Klaus, Sebastian.exe, Baron von Chrom

- **Speichern als:** `assets/raw/npcbatch_09.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_npc/ref_npc_09.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail.
Image 2 (ref_npc_09.png): clean design and scale reference on a light grey background. Each row shows Pixel (for scale only, do not draw her) and then one character in its idle pose and, if available, its talking pose. Copy the characters exactly; keep their row order.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with exactly 12 full-body figures: 3 characters (one per row) times 4 poses (one per column), in a strict 4 by 3 grid.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no paper grain, no lighting variation, no horizon, no floor line.
- Nothing except the 12 figures: no smoke, haze, mist, glow, sparkles, particles, dust, shadows, reflections, ghost or transparent copies, speech bubbles, text, sound effects, labels, numbers, grid lines or frames. Small effects that belong to a pose (a spark, a puff of flour, a steam wisp, a heart) must be drawn as solid, clearly outlined shapes attached to the character and in the same colors as the character, never as soft glows.
- Grid: exactly 4 columns and 3 rows, 12 equal cells. Row = one character, column = one pose. Each figure stands fully inside its own cell, horizontally centered, feet on one common baseline per row, with a wide green margin (at least 15 percent of the cell size) on all sides. Nothing touches or overlaps, nothing crosses a cell border.
- Scale: in the reference image Pixel (teal hair, orange jacket) is shown next to each character at the correct relative size. Draw every character at the same relative height to Pixel as in the reference (the height is also given in percent below), but do NOT draw Pixel. Pixel's height (100 percent) is 70 percent of a cell's height, so the tallest figure of this image is about 80 percent of the cell height.
- Camera and light: full body, three-quarter view, every figure faces LEFT, the same camera distance, soft even warm light from the upper left, no cast shadow, no rim glow.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness on all characters, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on a character.
- Consistency: all four figures in a row are the same character: identical design, colors, proportions and line weight. Only pose and facial expression change. Copy the design of each character EXACTLY from the reference image (Image 2): first and second picture in its row are its idle and talking pose.

THE THREE CHARACTERS:

ROW 1: Türsteher Klaus (height 107 percent of Pixel)
Appearance: A bulky bouncer robot with a grey metal head and an earpiece, a burgundy velvet jacket over a white shirt and a dark tie, dark trousers, big hands.
Column 1 IDLE: standing with arms hanging, stern neutral face.
Column 2 TALKING: one hand raised in a stop gesture, mouth open, stern.
Column 3 ANIMATION A: touching his earpiece with one finger, head tilted, listening.
Column 4 ANIMATION B: arms crossed again, scanning the room with narrowed eyes.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

ROW 2: Sebastian.exe (height 101 percent of Pixel)
Appearance: A tall slim perfectionist butler robot with a monocle lens, a black tailcoat, white shirt, bow tie, grey waistcoat and white gloves, a white napkin over one arm.
Column 1 IDLE: standing very upright, napkin on his arm, calm.
Column 2 TALKING: one gloved hand lifted elegantly, mouth open, chin raised.
Column 3 ANIMATION A: wiping an invisible speck off his sleeve with a white glove, monocle lens glinting.
Column 4 ANIMATION B: adjusting his monocle with two fingers, chin raised.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

ROW 3: Baron von Chrom (height 107 percent of Pixel)
Appearance: A pompous chrome-plated man with silver skin, a huge curled moustache, swept-back hair, a fur-collared coat over a waistcoat with a magenta cravat, a cane.
Column 1 IDLE: standing proudly, cane planted, chin up.
Column 2 TALKING: free arm spread wide, mouth open, grand gesture.
Column 3 ANIMATION A: twirling one end of his moustache, cane planted, chin up with a chrome glint.
Column 4 ANIMATION B: laughing grandly with his head thrown back, one hand on the fur collar, cane in the other hand.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## Batch 10: Masseur Zen-3, Flug-Hans, Käpt'n Kabel

- **Speichern als:** `assets/raw/npcbatch_10.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_npc/ref_npc_10.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail.
Image 2 (ref_npc_10.png): clean design and scale reference on a light grey background. Each row shows Pixel (for scale only, do not draw her) and then one character in its idle pose and, if available, its talking pose. Copy the characters exactly; keep their row order.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with exactly 12 full-body figures: 3 characters (one per row) times 4 poses (one per column), in a strict 4 by 3 grid.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no paper grain, no lighting variation, no horizon, no floor line.
- Nothing except the 12 figures: no smoke, haze, mist, glow, sparkles, particles, dust, shadows, reflections, ghost or transparent copies, speech bubbles, text, sound effects, labels, numbers, grid lines or frames. Small effects that belong to a pose (a spark, a puff of flour, a steam wisp, a heart) must be drawn as solid, clearly outlined shapes attached to the character and in the same colors as the character, never as soft glows.
- Grid: exactly 4 columns and 3 rows, 12 equal cells. Row = one character, column = one pose. Each figure stands fully inside its own cell, horizontally centered, feet on one common baseline per row, with a wide green margin (at least 15 percent of the cell size) on all sides. Nothing touches or overlaps, nothing crosses a cell border.
- Scale: in the reference image Pixel (teal hair, orange jacket) is shown next to each character at the correct relative size. Draw every character at the same relative height to Pixel as in the reference (the height is also given in percent below), but do NOT draw Pixel. Pixel's height (100 percent) is 70 percent of a cell's height, so the tallest figure of this image is about 80 percent of the cell height.
- Camera and light: full body, three-quarter view, every figure faces LEFT, the same camera distance, soft even warm light from the upper left, no cast shadow, no rim glow.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness on all characters, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on a character.
- Consistency: all four figures in a row are the same character: identical design, colors, proportions and line weight. Only pose and facial expression change. Copy the design of each character EXACTLY from the reference image (Image 2): first and second picture in its row are its idle and talking pose.

THE THREE CHARACTERS:

ROW 1: Masseur Zen-3 (height 101 percent of Pixel)
Appearance: A calm multi-armed massage robot with a silver-blue head and a third eye mark, a white bathrobe with a belt, four arms, bare robot feet in sandals.
Column 1 IDLE: standing, four arms relaxed, serene closed eyes.
Column 2 TALKING: two arms gesturing softly, mouth open, serene.
Column 3 ANIMATION A: multiple arms kneading the air in slow circles, eyes closed, serene smile.
Column 4 ANIMATION B: arms spread wide in a deep-breathing stretch, eyes closed.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

ROW 2: Flug-Hans (height 73 percent of Pixel)
Appearance: A cheerful ticket-clerk robot with a blue-grey boxy head, a navy pilot cap with a wings badge, a navy uniform with gold stripes and a tie, holding two tickets.
Column 1 IDLE: standing, smiling, tickets at his side.
Column 2 TALKING: tickets waved in the raised hand, mouth open, cheerful.
Column 3 ANIMATION A: making an airplane gesture with one flat hand flying up, other hand holding a ticket.
Column 4 ANIMATION B: saluting with two fingers at his pilot cap, big cheerful grin.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

ROW 3: Käpt'n Kabel (height 101 percent of Pixel)
Appearance: A tired captain with long cable-like dreadlocks, a scruffy beard, dark circles under the eyes, a white captain's cap with an anchor, a worn navy coat and an empty white mug.
Column 1 IDLE: slouching, mug held low, exhausted look.
Column 2 TALKING: mug lifted, other hand gesturing wearily, mouth open.
Column 3 ANIMATION A: tipping the empty mug upside down and staring into it, drooping shoulders.
Column 4 ANIMATION B: huge yawn with one hand over the mouth, cable hair swaying.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## Batch 11: Schicht, Streikposten, Ramen-Kraken

- **Speichern als:** `assets/raw/npcbatch_11.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_npc/ref_npc_11.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail.
Image 2 (ref_npc_11.png): clean design and scale reference on a light grey background. Each row shows Pixel (for scale only, do not draw her) and then one character in its idle pose and, if available, its talking pose. Copy the characters exactly; keep their row order.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with exactly 12 full-body figures: 3 characters (one per row) times 4 poses (one per column), in a strict 4 by 3 grid.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no paper grain, no lighting variation, no horizon, no floor line.
- Nothing except the 12 figures: no smoke, haze, mist, glow, sparkles, particles, dust, shadows, reflections, ghost or transparent copies, speech bubbles, text, sound effects, labels, numbers, grid lines or frames. Small effects that belong to a pose (a spark, a puff of flour, a steam wisp, a heart) must be drawn as solid, clearly outlined shapes attached to the character and in the same colors as the character, never as soft glows.
- Grid: exactly 4 columns and 3 rows, 12 equal cells. Row = one character, column = one pose. Each figure stands fully inside its own cell, horizontally centered, feet on one common baseline per row, with a wide green margin (at least 15 percent of the cell size) on all sides. Nothing touches or overlaps, nothing crosses a cell border.
- Scale: in the reference image Pixel (teal hair, orange jacket) is shown next to each character at the correct relative size. Draw every character at the same relative height to Pixel as in the reference (the height is also given in percent below), but do NOT draw Pixel. Pixel's height (100 percent) is 70 percent of a cell's height, so the tallest figure of this image is about 80 percent of the cell height.
- Camera and light: full body, three-quarter view, every figure faces LEFT, the same camera distance, soft even warm light from the upper left, no cast shadow, no rim glow.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness on all characters, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on a character.
- Consistency: all four figures in a row are the same character: identical design, colors, proportions and line weight. Only pose and facial expression change. Copy the design of each character EXACTLY from the reference image (Image 2): first and second picture in its row are its idle and talking pose.

THE THREE CHARACTERS:

ROW 1: Schicht (height 111 percent of Pixel)
Appearance: A union-leader mining robot with a yellow hard hat with a lamp, a yellow high-visibility vest over a grey-brown body, a red megaphone.
Column 1 IDLE: standing, megaphone lowered at his side, determined.
Column 2 TALKING: megaphone raised to his mouth, other fist pumped, shouting.
Column 3 ANIMATION A: megaphone raised to the mouth, other fist pumped in the air, shouting.
Column 4 ANIMATION B: megaphone lowered, wiping the hard hat with a tired sigh.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

ROW 2: Streikposten (height 97 percent of Pixel)
Appearance: A generic mining robot, plainer than Schicht: silver-grey body, an orange hard hat, a plain wooden strike sign reading STREIK (the only text on the image) held in one hand.
Column 1 IDLE: standing, sign resting on his shoulder.
Column 2 TALKING: sign raised high, mouth open, protesting.
Column 3 ANIMATION A: strike sign raised high over his head in both hands.
Column 4 ANIMATION B: strike sign lowered and leaning on his shoulder, kicking a small pebble with his foot.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

ROW 3: Ramen-Kraken (height 86 percent of Pixel)
Appearance: A giant noodle octopus, orange-brown with big sad eyes, a tiny white chef hat, noodles on his head, a flat orange puddle of broth with a pair of chopsticks beside him. No pot, no bowl, no kitchen.
Column 1 IDLE: sitting with drooping tentacles, big sad eyes.
Column 2 TALKING: two tentacles raised, mouth open, still sad.
Column 3 ANIMATION A: two tentacles lifted and drooping, a single tear rolling down, noodles dripping.
Column 4 ANIMATION B: tentacles wrapped around himself in a hug, eyes closed, slightly smaller sad pose.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## Batch 12: Kleo, Teddy-Bot, Teddy-Bot mit Sensor

- **Speichern als:** `assets/raw/npcbatch_12.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `assets/raw/refs_npc/ref_npc_12.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it ONLY for the art style, color palette, line weight and level of detail.
Image 2 (ref_npc_12.png): clean design and scale reference on a light grey background. Each row shows Pixel (for scale only, do not draw her) and then one character in its idle pose and, if available, its talking pose. Copy the characters exactly; keep their row order.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with exactly 12 full-body figures: 3 characters (one per row) times 4 poses (one per column), in a strict 4 by 3 grid.

RULES FOR THE WHOLE IMAGE:
- Background: ONE perfectly uniform flat pure green (#00FF00) over the ENTIRE image up to every edge and corner. No gradient, no vignette, no texture, no noise, no paper grain, no lighting variation, no horizon, no floor line.
- Nothing except the 12 figures: no smoke, haze, mist, glow, sparkles, particles, dust, shadows, reflections, ghost or transparent copies, speech bubbles, text, sound effects, labels, numbers, grid lines or frames. Small effects that belong to a pose (a spark, a puff of flour, a steam wisp, a heart) must be drawn as solid, clearly outlined shapes attached to the character and in the same colors as the character, never as soft glows.
- Grid: exactly 4 columns and 3 rows, 12 equal cells. Row = one character, column = one pose. Each figure stands fully inside its own cell, horizontally centered, feet on one common baseline per row, with a wide green margin (at least 15 percent of the cell size) on all sides. Nothing touches or overlaps, nothing crosses a cell border.
- Scale: in the reference image Pixel (teal hair, orange jacket) is shown next to each character at the correct relative size. Draw every character at the same relative height to Pixel as in the reference (the height is also given in percent below), but do NOT draw Pixel. Pixel's height (100 percent) is 70 percent of a cell's height, so the tallest figure of this image is about 80 percent of the cell height.
- Camera and light: full body, three-quarter view, every figure faces LEFT, the same camera distance, soft even warm light from the upper left, no cast shadow, no rim glow.
- Style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly like the style image; chunky wobbly dark outlines of equal thickness on all characters, saturated colors, painterly gouache texture (NOT flat vector, NOT pixel art, NOT 3D). Never use green on a character.
- Consistency: all four figures in a row are the same character: identical design, colors, proportions and line weight. Only pose and facial expression change. Copy the design of each character EXACTLY from the reference image (Image 2): first and second picture in its row are its idle and talking pose.

THE THREE CHARACTERS:

ROW 1: Kleo (height 99 percent of Pixel)
Appearance: A 12-year-old hologram girl with pigtails, big headphones around her neck or ears, a dark NC hoodie and leggings, slightly transparent with a thin glowing cyan and pink edge on the figure itself (no glow around it).
Column 1 IDLE: standing, hands at her sides, curious look.
Column 2 TALKING: hands spread, mouth open, expressive.
Column 3 ANIMATION A: bobbing her head to music with the hands on the headphones, pigtails swinging, little glitch flicker.
Column 4 ANIMATION B: giggling with a hand in front of her mouth, eyes sparkling, a small flicker on her edges.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

ROW 2: Teddy-Bot (height 99 percent of Pixel)
Appearance: A worn plush teddy bear in warm brown with patches and stitches, button eyes (one X-shaped), and an empty open mouth socket.
Column 1 IDLE: standing, arms down, sad button eyes.
Column 2 TALKING: one arm raised, mouth socket open.
Column 3 ANIMATION A: waving one stubby arm slowly, head tilted, button eyes looking up.
Column 4 ANIMATION B: hugging his own arms to his chest, head drooping sadly.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

ROW 3: Teddy-Bot mit Sensor (height 99 percent of Pixel)
Appearance: The same worn patched plush teddy bear, now with a small chrome tongue-sensor plugged into his mouth.
Column 1 IDLE: standing, arms down, curious button eyes.
Column 2 TALKING: one arm raised, the chrome sensor glowing faintly.
Column 3 ANIMATION A: tapping the chrome sensor in his mouth with one paw, curious button eyes.
Column 4 ANIMATION B: arms raised in surprise, button eyes wide, sensor glowing faintly.
Columns 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the proportions do not change.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```
