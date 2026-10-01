# NPC-Posen für Akt 2 und Akt 3 (Sprechbilder und Animationen)

**Warum:** Beim Prüfen deines Uploads war Folgendes los: Für 13 Figuren fehlt das Sprechbild (Frau Ablage, Chef Kloß, Grünhorn, Prof. Staub, Mortimer, Dr. Schraub, Stempel-Stefan, Kiosk-Zeus, Flimmer, Mr. Tackert, Käpt’n Kabel, Ramen-Kraken, Streikposten), weil die zweite Hälfte des Akt-2-Sheets die falschen Figuren (Akt 1) zeigte. Die Animationssheets für Akt 2 und Akt 3 hatten doppelte oder vertauschte Figuren. Die 12er-Sheets klappen bei dieser KI nicht zuverlässig, deshalb jetzt **ein Bild pro Figur** mit mehreren Posen nebeneinander. Das sind 24 kurze Aufträge.

**Posen je Bild (von links nach rechts)**
- Figuren mit fehlendem Sprechbild: **sprechend, Animation A, Animation B** (3 Figuren im Bild).
- Alle anderen: **Animation A, Animation B** (2 Figuren im Bild).

**Ablauf**
1. Neuer Chat pro Figur, Referenzbilder in der genannten Reihenfolge anhängen. Das Sheet dient nur als Design-Vorlage, im Prompt steht, welche Figur gemeint ist.
2. Speichern als `assets/raw/npcpose_<name>.png`.
3. Prüfen: genau die genannte Anzahl Figuren, gleiches Aussehen wie in der Vorlage, nichts anderes im Bild. Bei Fehlern im selben Chat korrigieren („Only N figures, remove everything else“).
4. Sag mir Bescheid, ich schneide alle aus (`python3 tools/slice_npc_poses.py --all`, trennt automatisch an den Lücken).

**Hinweis zu Akt 3:** `sheet_npc_akt3_v1.png` ist die alte Datei `sheet_npc_akt3.png`, die ich beim Aufräumen umbenannt habe, weil du eine neue mit demselben Namen hochgeladen hast. Das ist die Vorlage, mit der die Figuren im Spiel schon laufen.

---

## 1. Frau Ablage  (sprechend, Pose A, Pose B)

- **Speichern als:** `assets/raw/npcpose_ablage.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `sheet_npc_akt2.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (sheet_npc_akt2.png): use it for design reference only: it contains many characters; use ONLY the figure described below for the exact look (colors, outfit, proportions, line style). Ignore every other figure and every mistake in it.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY 3 full-body figures of the SAME character and nothing else, side by side in one row from left to right, with a wide empty green gap (at least half a figure's width) between them. All figures have exactly the same design, colors, size and body proportions as the character in the reference sheet, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or another figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Frau Ablage: stern receptionist robot with a filing-cabinet body, glasses on a chain, sour expression.
Design source in the attached reference sheet: top row, first figure.
Figure 1 (from the left): talking: one hand pulling her glasses down, mouth open, scolding, small drawer on her body slightly open.
Figure 2 (from the left): animation pose A: a small drawer on her body pulled open, one hand pulling out a paper, looking over the glasses.
Figure 3 (from the left): animation pose B: drawer slammed shut, one finger tapping on her body, impatient look.
The animation poses A and B are two consecutive frames of a small looping idle action: clear but not extreme movement, feet planted.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 2. Chef Kloß  (sprechend, Pose A, Pose B)

- **Speichern als:** `assets/raw/npcpose_kloss.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `sheet_npc_akt2.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (sheet_npc_akt2.png): use it for design reference only: it contains many characters; use ONLY the figure described below for the exact look (colors, outfit, proportions, line style). Ignore every other figure and every mistake in it.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY 3 full-body figures of the SAME character and nothing else, side by side in one row from left to right, with a wide empty green gap (at least half a figure's width) between them. All figures have exactly the same design, colors, size and body proportions as the character in the reference sheet, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or another figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Chef Kloß: desperate chubby cook robot with a dumpling-shaped head, a ladle in his hand.
Design source in the attached reference sheet: top row, second figure.
Figure 1 (from the left): talking: ladle raised, mouth open, pleading, sweat drops.
Figure 2 (from the left): animation pose A: wringing both hands in despair, sweat drops flying, eyes wide.
Figure 3 (from the left): animation pose B: ladle raised, shaking his head, mouth in a wobbling worried line.
The animation poses A and B are two consecutive frames of a small looping idle action: clear but not extreme movement, feet planted.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 3. Grünhorn  (sprechend, Pose A, Pose B)

- **Speichern als:** `assets/raw/npcpose_gruenhorn.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `sheet_npc_akt2.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (sheet_npc_akt2.png): use it for design reference only: it contains many characters; use ONLY the figure described below for the exact look (colors, outfit, proportions, line style). Ignore every other figure and every mistake in it.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY 3 full-body figures of the SAME character and nothing else, side by side in one row from left to right, with a wide empty green gap (at least half a figure's width) between them. All figures have exactly the same design, colors, size and body proportions as the character in the reference sheet, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or another figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Grünhorn: gardener robot built from garden tools and a watering can, a leaf on his head.
Design source in the attached reference sheet: top row, third figure.
Figure 1 (from the left): talking: one tool arm gesturing, mouth open, excited whisper, leaf on his head perked up.
Figure 2 (from the left): animation pose A: watering an invisible plant with the watering can arm tipped forward, a few drops falling.
Figure 3 (from the left): animation pose B: watering can arm raised again, the leaf on his head perked up, proud smile.
The animation poses A and B are two consecutive frames of a small looping idle action: clear but not extreme movement, feet planted.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 4. Prof. Staub  (sprechend, Pose A, Pose B)

- **Speichern als:** `assets/raw/npcpose_staub.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `sheet_npc_akt2.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (sheet_npc_akt2.png): use it for design reference only: it contains many characters; use ONLY the figure described below for the exact look (colors, outfit, proportions, line style). Ignore every other figure and every mistake in it.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY 3 full-body figures of the SAME character and nothing else, side by side in one row from left to right, with a wide empty green gap (at least half a figure's width) between them. All figures have exactly the same design, colors, size and body proportions as the character in the reference sheet, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or another figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Prof. Staub: curator robot in a dusty tailcoat with a magnifying-glass eye.
Design source in the attached reference sheet: top row, fourth figure.
Figure 1 (from the left): talking: magnifying-glass eye wide, one finger raised, mouth open, lecturing.
Figure 2 (from the left): animation pose A: leaning forward and inspecting something with the magnifying-glass eye, one finger raised.
Figure 3 (from the left): animation pose B: straightening up, brushing dust off his tailcoat with a small cloud of dust.
The animation poses A and B are two consecutive frames of a small looping idle action: clear but not extreme movement, feet planted.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 5. Schnipp  (Pose A, Pose B)

- **Speichern als:** `assets/raw/npcpose_schnipp.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `sheet_npc_akt2.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (sheet_npc_akt2.png): use it for design reference only: it contains many characters; use ONLY the figure described below for the exact look (colors, outfit, proportions, line style). Ignore every other figure and every mistake in it.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY 2 full-body figures of the SAME character and nothing else, side by side in one row from left to right, with a wide empty green gap (at least half a figure's width) between them. All figures have exactly the same design, colors, size and body proportions as the character in the reference sheet, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or another figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Schnipp: barber robot with scissor hands, wild electrified hair, striped coat.
Design source in the attached reference sheet: top row, fifth figure.
Figure 1 (from the left): animation pose A: snipping both scissor hands in the air at the front, tiny hair snippets flying.
Figure 2 (from the left): animation pose B: scissors crossed in front of his chest like a pose, hair standing up with small sparks.
The animation poses A and B are two consecutive frames of a small looping idle action: clear but not extreme movement, feet planted.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 6. Madame Jackpot  (Pose A, Pose B)

- **Speichern als:** `assets/raw/npcpose_jackpot.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `sheet_npc_akt2.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (sheet_npc_akt2.png): use it for design reference only: it contains many characters; use ONLY the figure described below for the exact look (colors, outfit, proportions, line style). Ignore every other figure and every mistake in it.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY 2 full-body figures of the SAME character and nothing else, side by side in one row from left to right, with a wide empty green gap (at least half a figure's width) between them. All figures have exactly the same design, colors, size and body proportions as the character in the reference sheet, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or another figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Madame Jackpot: elegant woman with a roulette-wheel hat, gold gown and a cold smile.
Design source in the attached reference sheet: top row, sixth figure.
Figure 1 (from the left): animation pose A: hat's roulette wheel spinning (slight motion blur lines on the hat), one gloved hand fanning herself.
Figure 2 (from the left): animation pose B: fan hand lowered, one eyebrow raised, cold polite smile, hat wheel still.
The animation poses A and B are two consecutive frames of a small looping idle action: clear but not extreme movement, feet planted.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 7. Mortimer  (sprechend, Pose A, Pose B)

- **Speichern als:** `assets/raw/npcpose_mortimer.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `sheet_npc_akt2.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (sheet_npc_akt2.png): use it for design reference only: it contains many characters; use ONLY the figure described below for the exact look (colors, outfit, proportions, line style). Ignore every other figure and every mistake in it.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY 3 full-body figures of the SAME character and nothing else, side by side in one row from left to right, with a wide empty green gap (at least half a figure's width) between them. All figures have exactly the same design, colors, size and body proportions as the character in the reference sheet, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or another figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Mortimer: tall casino doorman robot in a velvet suit, red rope in his hand.
Design source in the attached reference sheet: top row, seventh figure.
Figure 1 (from the left): talking: one hand raised politely holding the red rope, mouth open, aloof.
Figure 2 (from the left): animation pose A: arms crossed on his chest with the red rope hanging down, stony look straight ahead.
Figure 3 (from the left): animation pose B: straightening his velvet lapels with one hand, looking down his nose.
The animation poses A and B are two consecutive frames of a small looping idle action: clear but not extreme movement, feet planted.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 8. Dr. Schraub  (sprechend, Pose A, Pose B)

- **Speichern als:** `assets/raw/npcpose_schraub.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `sheet_npc_akt2.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (sheet_npc_akt2.png): use it for design reference only: it contains many characters; use ONLY the figure described below for the exact look (colors, outfit, proportions, line style). Ignore every other figure and every mistake in it.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY 3 full-body figures of the SAME character and nothing else, side by side in one row from left to right, with a wide empty green gap (at least half a figure's width) between them. All figures have exactly the same design, colors, size and body proportions as the character in the reference sheet, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or another figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Dr. Schraub: nervous thin doctor with big round glasses, white coat and trembling hands.
Design source in the attached reference sheet: second row, first figure (the nervous doctor).
Figure 1 (from the left): talking: both hands raised and trembling, mouth open, nervous talking.
Figure 2 (from the left): animation pose A: both hands trembling in front of him (small motion lines), eyes wide behind the glasses.
Figure 3 (from the left): animation pose B: pushing his glasses up with a shaky finger, nervous half smile.
The animation poses A and B are two consecutive frames of a small looping idle action: clear but not extreme movement, feet planted.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 9. Stempel-Stefan  (sprechend, Pose A, Pose B)

- **Speichern als:** `assets/raw/npcpose_stefan.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `sheet_npc_akt2.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (sheet_npc_akt2.png): use it for design reference only: it contains many characters; use ONLY the figure described below for the exact look (colors, outfit, proportions, line style). Ignore every other figure and every mistake in it.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY 3 full-body figures of the SAME character and nothing else, side by side in one row from left to right, with a wide empty green gap (at least half a figure's width) between them. All figures have exactly the same design, colors, size and body proportions as the character in the reference sheet, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or another figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Stempel-Stefan: stout official with an oversized rubber stamp and ink-stained fingers.
Design source in the attached reference sheet: second row, second figure (the stout official with the stamp).
Figure 1 (from the left): talking: stamp raised in one hand, other hand pointing, mouth open, bureaucratic.
Figure 2 (from the left): animation pose A: stamp raised high above a table edge, stern concentrated face.
Figure 3 (from the left): animation pose B: stamp slammed down low, a small puff of ink, satisfied nod.
The animation poses A and B are two consecutive frames of a small looping idle action: clear but not extreme movement, feet planted.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 10. Kiosk-Zeus  (sprechend, Pose A, Pose B)

- **Speichern als:** `assets/raw/npcpose_zeus.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `sheet_npc_akt2.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (sheet_npc_akt2.png): use it for design reference only: it contains many characters; use ONLY the figure described below for the exact look (colors, outfit, proportions, line style). Ignore every other figure and every mistake in it.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY 3 full-body figures of the SAME character and nothing else, side by side in one row from left to right, with a wide empty green gap (at least half a figure's width) between them. All figures have exactly the same design, colors, size and body proportions as the character in the reference sheet, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or another figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Kiosk-Zeus: newspaper vendor robot with a roll-up screen body and a hat full of headlines.
Design source in the attached reference sheet: second row, third figure (the newspaper robot).
Figure 1 (from the left): talking: screen body showing colorful headline bars, one hand cupped at his mouth, shouting.
Figure 2 (from the left): animation pose A: screen body scrolling headlines (blurry colorful text bars), one hand cupped at his mouth shouting.
Figure 3 (from the left): animation pose B: holding up a newspaper in one hand, other hand tipping his headline hat.
The animation poses A and B are two consecutive frames of a small looping idle action: clear but not extreme movement, feet planted.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 11. Flimmer  (sprechend, Pose A, Pose B)

- **Speichern als:** `assets/raw/npcpose_flimmer.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `sheet_npc_akt2.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (sheet_npc_akt2.png): use it for design reference only: it contains many characters; use ONLY the figure described below for the exact look (colors, outfit, proportions, line style). Ignore every other figure and every mistake in it.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY 3 full-body figures of the SAME character and nothing else, side by side in one row from left to right, with a wide empty green gap (at least half a figure's width) between them. All figures have exactly the same design, colors, size and body proportions as the character in the reference sheet, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or another figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Flimmer: sleepy hologram technician, headphones around the neck, eyes closed.
Design source in the attached reference sheet: second row, fourth figure (the sleepy hologram technician with the hat).
Figure 1 (from the left): talking: head lifted with one eye half open, one hand waving lazily, mouth open, hologram edges flickering.
Figure 2 (from the left): animation pose A: head nodding forward in a doze, small Z letters floating above, hologram edges flickering.
Figure 3 (from the left): animation pose B: head snapping up with one eye half open, a flicker line through the body.
The animation poses A and B are two consecutive frames of a small looping idle action: clear but not extreme movement, feet planted.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 12. Mr. Tackert  (sprechend, Pose A, Pose B)

- **Speichern als:** `assets/raw/npcpose_tackert.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `sheet_npc_akt2.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (sheet_npc_akt2.png): use it for design reference only: it contains many characters; use ONLY the figure described below for the exact look (colors, outfit, proportions, line style). Ignore every other figure and every mistake in it.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY 3 full-body figures of the SAME character and nothing else, side by side in one row from left to right, with a wide empty green gap (at least half a figure's width) between them. All figures have exactly the same design, colors, size and body proportions as the character in the reference sheet, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or another figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Mr. Tackert: a tiny hamster in a running wheel wearing a tiny tie.
Design source in the attached reference sheet: second row, last figure (the hamster in the wheel; ignore the rats).
Figure 1 (from the left): talking: standing on his hind legs in the wheel, one paw raised, mouth open, squeaking importantly.
Figure 2 (from the left): animation pose A: running in the wheel with the front legs forward, tie flying backward, determined face.
Figure 3 (from the left): animation pose B: running with the back legs forward in the wheel, tie flying the other way, panting.
The animation poses A and B are two consecutive frames of a small looping idle action: clear but not extreme movement, feet planted.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 13. Türsteher Klaus  (Pose A, Pose B)

- **Speichern als:** `assets/raw/npcpose_klaus.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `sheet_npc_akt3_v1.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (sheet_npc_akt3_v1.png): use it for design reference only: it contains many characters; use ONLY the figure described below for the exact look (colors, outfit, proportions, line style). Ignore every other figure and every mistake in it.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY 2 full-body figures of the SAME character and nothing else, side by side in one row from left to right, with a wide empty green gap (at least half a figure's width) between them. All figures have exactly the same design, colors, size and body proportions as the character in the reference sheet, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or another figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Türsteher Klaus: bulky bouncer robot in a velvet jacket with an earpiece.
Design source in the attached reference sheet: top row, first figure.
Figure 1 (from the left): animation pose A: touching his earpiece with one finger, head tilted, listening.
Figure 2 (from the left): animation pose B: arms crossed again, scanning the room with narrowed eyes.
The animation poses A and B are two consecutive frames of a small looping idle action: clear but not extreme movement, feet planted.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 14. Sebastian.exe  (Pose A, Pose B)

- **Speichern als:** `assets/raw/npcpose_sebastian.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `sheet_npc_akt3_v1.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (sheet_npc_akt3_v1.png): use it for design reference only: it contains many characters; use ONLY the figure described below for the exact look (colors, outfit, proportions, line style). Ignore every other figure and every mistake in it.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY 2 full-body figures of the SAME character and nothing else, side by side in one row from left to right, with a wide empty green gap (at least half a figure's width) between them. All figures have exactly the same design, colors, size and body proportions as the character in the reference sheet, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or another figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Sebastian.exe: tall perfectionist butler robot with a monocle lens and white gloves.
Design source in the attached reference sheet: top row, second figure.
Figure 1 (from the left): animation pose A: wiping an invisible speck off his sleeve with a white glove, monocle lens glinting.
Figure 2 (from the left): animation pose B: adjusting his monocle with two fingers, chin raised.
The animation poses A and B are two consecutive frames of a small looping idle action: clear but not extreme movement, feet planted.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 15. Baron von Chrom  (Pose A, Pose B)

- **Speichern als:** `assets/raw/npcpose_baron.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `sheet_npc_akt3_v1.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (sheet_npc_akt3_v1.png): use it for design reference only: it contains many characters; use ONLY the figure described below for the exact look (colors, outfit, proportions, line style). Ignore every other figure and every mistake in it.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY 2 full-body figures of the SAME character and nothing else, side by side in one row from left to right, with a wide empty green gap (at least half a figure's width) between them. All figures have exactly the same design, colors, size and body proportions as the character in the reference sheet, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or another figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Baron von Chrom: pompous chrome-plated man with a huge moustache, cane and fur collar.
Design source in the attached reference sheet: top row, third figure.
Figure 1 (from the left): animation pose A: twirling one end of his moustache, cane planted, chin up with a chrome glint.
Figure 2 (from the left): animation pose B: laughing grandly with his head thrown back, one hand on the fur collar, cane in the other hand.
The animation poses A and B are two consecutive frames of a small looping idle action: clear but not extreme movement, feet planted.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 16. Masseur Zen-3  (Pose A, Pose B)

- **Speichern als:** `assets/raw/npcpose_zen.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `sheet_npc_akt3_v1.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (sheet_npc_akt3_v1.png): use it for design reference only: it contains many characters; use ONLY the figure described below for the exact look (colors, outfit, proportions, line style). Ignore every other figure and every mistake in it.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY 2 full-body figures of the SAME character and nothing else, side by side in one row from left to right, with a wide empty green gap (at least half a figure's width) between them. All figures have exactly the same design, colors, size and body proportions as the character in the reference sheet, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or another figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Masseur Zen-3: calm multi-armed massage robot in a bathrobe.
Design source in the attached reference sheet: top row, fourth figure.
Figure 1 (from the left): animation pose A: multiple arms kneading the air in slow circles, eyes closed, serene smile.
Figure 2 (from the left): animation pose B: arms spread wide in a deep-breathing stretch, eyes closed.
The animation poses A and B are two consecutive frames of a small looping idle action: clear but not extreme movement, feet planted.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 17. Flug-Hans  (Pose A, Pose B)

- **Speichern als:** `assets/raw/npcpose_flughans.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `sheet_npc_akt3_v1.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (sheet_npc_akt3_v1.png): use it for design reference only: it contains many characters; use ONLY the figure described below for the exact look (colors, outfit, proportions, line style). Ignore every other figure and every mistake in it.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY 2 full-body figures of the SAME character and nothing else, side by side in one row from left to right, with a wide empty green gap (at least half a figure's width) between them. All figures have exactly the same design, colors, size and body proportions as the character in the reference sheet, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or another figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Flug-Hans: cheerful ticket clerk robot with a pilot cap.
Design source in the attached reference sheet: top row, fifth figure (the ticket clerk robot with the pilot cap).
Figure 1 (from the left): animation pose A: making an airplane gesture with one flat hand flying up, other hand holding a ticket.
Figure 2 (from the left): animation pose B: saluting with two fingers at his pilot cap, big cheerful grin.
The animation poses A and B are two consecutive frames of a small looping idle action: clear but not extreme movement, feet planted.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 18. Käpt'n Kabel  (sprechend, Pose A, Pose B)

- **Speichern als:** `assets/raw/npcpose_kabel.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `sheet_npc_akt3_v1.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (sheet_npc_akt3_v1.png): use it for design reference only: it contains many characters; use ONLY the figure described below for the exact look (colors, outfit, proportions, line style). Ignore every other figure and every mistake in it.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY 3 full-body figures of the SAME character and nothing else, side by side in one row from left to right, with a wide empty green gap (at least half a figure's width) between them. All figures have exactly the same design, colors, size and body proportions as the character in the reference sheet, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or another figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Käpt'n Kabel: tired captain with cable-like hair and dark circles, holding an empty mug.
Design source in the attached reference sheet: top row, sixth figure (the captain with the mug).
Figure 1 (from the left): talking: mug lifted, other hand gesturing wearily, mouth open, tired.
Figure 2 (from the left): animation pose A: tipping the empty mug upside down and staring into it, drooping shoulders.
Figure 3 (from the left): animation pose B: huge yawn with one hand over the mouth, cable hair swaying.
The animation poses A and B are two consecutive frames of a small looping idle action: clear but not extreme movement, feet planted.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 19. Schicht  (Pose A, Pose B)

- **Speichern als:** `assets/raw/npcpose_schicht.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `sheet_npc_akt3_v1.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (sheet_npc_akt3_v1.png): use it for design reference only: it contains many characters; use ONLY the figure described below for the exact look (colors, outfit, proportions, line style). Ignore every other figure and every mistake in it.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY 2 full-body figures of the SAME character and nothing else, side by side in one row from left to right, with a wide empty green gap (at least half a figure's width) between them. All figures have exactly the same design, colors, size and body proportions as the character in the reference sheet, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or another figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Schicht: union leader mining robot with a hard hat, megaphone and protest vest.
Design source in the attached reference sheet: top row, last figure (the one with the megaphone).
Figure 1 (from the left): animation pose A: megaphone raised to the mouth, other fist pumped in the air, shouting.
Figure 2 (from the left): animation pose B: megaphone lowered, wiping the hard hat with a tired sigh.
The animation poses A and B are two consecutive frames of a small looping idle action: clear but not extreme movement, feet planted.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 20. Streikposten  (sprechend, Pose A, Pose B)

- **Speichern als:** `assets/raw/npcpose_streikposten.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `sheet_npc_akt3_v1.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (sheet_npc_akt3_v1.png): use it for design reference only: it contains many characters; use ONLY the figure described below for the exact look (colors, outfit, proportions, line style). Ignore every other figure and every mistake in it.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY 3 full-body figures of the SAME character and nothing else, side by side in one row from left to right, with a wide empty green gap (at least half a figure's width) between them. All figures have exactly the same design, colors, size and body proportions as the character in the reference sheet, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or another figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Streikposten: generic mining robot holding a strike sign.
Design source in the attached reference sheet: second row, second figure (the robot with the strike sign, but the sign must read STREIK).
Figure 1 (from the left): talking: strike sign raised high, mouth open, protesting.
Figure 2 (from the left): animation pose A: strike sign raised high over his head in both hands.
Figure 3 (from the left): animation pose B: strike sign lowered and leaning on his shoulder, kicking a small pebble with his foot.
The animation poses A and B are two consecutive frames of a small looping idle action: clear but not extreme movement, feet planted.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 21. Ramen-Kraken  (sprechend, Pose A, Pose B)

- **Speichern als:** `assets/raw/npcpose_kraken.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `sheet_npc_akt3_v1.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (sheet_npc_akt3_v1.png): use it for design reference only: it contains many characters; use ONLY the figure described below for the exact look (colors, outfit, proportions, line style). Ignore every other figure and every mistake in it.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY 3 full-body figures of the SAME character and nothing else, side by side in one row from left to right, with a wide empty green gap (at least half a figure's width) between them. All figures have exactly the same design, colors, size and body proportions as the character in the reference sheet, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or another figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Ramen-Kraken: giant noodle octopus with sad eyes, standing in a puddle of broth.
Design source in the attached reference sheet: second row, third figure (the octopus).
Figure 1 (from the left): talking: two tentacles raised, mouth open, still sad, sitting in the puddle.
Figure 2 (from the left): animation pose A: two tentacles lifted and drooping, a single tear rolling down, noodles dripping.
Figure 3 (from the left): animation pose B: tentacles wrapped around himself in a hug, eyes closed, slightly smaller sad pose.
The animation poses A and B are two consecutive frames of a small looping idle action: clear but not extreme movement, feet planted.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 22. Kleo  (Pose A, Pose B)

- **Speichern als:** `assets/raw/npcpose_kleo.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `ende_01.png`, `sheet_npc_akt3_v1.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (ende_01.png): use it for the exact design of KLEO (hologram girl with pigtails, big headphones, dark NC hoodie, slightly transparent with glowing cyan and pink edges) and of TEDDY-BOT (patched plush teddy bear with button eyes and an open mouth socket).
Image 3 (sheet_npc_akt3_v1.png): use it for design reference only: it contains many characters; use ONLY the figure described below for the exact look (colors, outfit, proportions, line style). Ignore every other figure and every mistake in it.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY 2 full-body figures of the SAME character and nothing else, side by side in one row from left to right, with a wide empty green gap (at least half a figure's width) between them. All figures have exactly the same design, colors, size and body proportions as the character in the reference sheet, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or another figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Kleo: the 12-year-old hologram girl with pigtails, big headphones and the dark NC hoodie, slightly transparent with cyan and pink glowing edges.
Design source in the attached reference sheet: second row, fourth figure (follow Image 2 for her exact design).
Figure 1 (from the left): animation pose A: bobbing her head to music with the hands on the headphones, pigtails swinging, little glitch flicker.
Figure 2 (from the left): animation pose B: giggling with a hand in front of her mouth, eyes sparkling, a small flicker on her edges.
The animation poses A and B are two consecutive frames of a small looping idle action: clear but not extreme movement, feet planted.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 23. Teddy-Bot  (Pose A, Pose B)

- **Speichern als:** `assets/raw/npcpose_teddy.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `ende_01.png`, `sheet_npc_akt3_v1.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (ende_01.png): use it for the exact design of KLEO (hologram girl with pigtails, big headphones, dark NC hoodie, slightly transparent with glowing cyan and pink edges) and of TEDDY-BOT (patched plush teddy bear with button eyes and an open mouth socket).
Image 3 (sheet_npc_akt3_v1.png): use it for design reference only: it contains many characters; use ONLY the figure described below for the exact look (colors, outfit, proportions, line style). Ignore every other figure and every mistake in it.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY 2 full-body figures of the SAME character and nothing else, side by side in one row from left to right, with a wide empty green gap (at least half a figure's width) between them. All figures have exactly the same design, colors, size and body proportions as the character in the reference sheet, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or another figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Teddy-Bot: the worn, patched plush teddy bear with button eyes and an empty open mouth socket.
Design source in the attached reference sheet: second row, sixth figure (follow Image 2 for the exact design).
Figure 1 (from the left): animation pose A: waving one stubby arm slowly, head tilted, button eyes looking up.
Figure 2 (from the left): animation pose B: hugging his own arms to his chest, head drooping sadly.
The animation poses A and B are two consecutive frames of a small looping idle action: clear but not extreme movement, feet planted.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 24. Teddy-Bot mit Sensor  (Pose A, Pose B)

- **Speichern als:** `assets/raw/npcpose_teddy_sensor.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `ende_01.png`, `sheet_npc_akt3_v1.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (ende_01.png): use it for the exact design of KLEO (hologram girl with pigtails, big headphones, dark NC hoodie, slightly transparent with glowing cyan and pink edges) and of TEDDY-BOT (patched plush teddy bear with button eyes and an open mouth socket).
Image 3 (sheet_npc_akt3_v1.png): use it for design reference only: it contains many characters; use ONLY the figure described below for the exact look (colors, outfit, proportions, line style). Ignore every other figure and every mistake in it.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY 2 full-body figures of the SAME character and nothing else, side by side in one row from left to right, with a wide empty green gap (at least half a figure's width) between them. All figures have exactly the same design, colors, size and body proportions as the character in the reference sheet, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or another figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Teddy-Bot mit Sensor: the same teddy bear with a small chrome tongue-sensor plugged into his mouth.
Design source in the attached reference sheet: second row, last figure (follow Image 2 for the exact design).
Figure 1 (from the left): animation pose A: tapping the chrome sensor in his mouth with one paw, curious button eyes.
Figure 2 (from the left): animation pose B: arms raised in surprise, button eyes wide, sensor glowing faintly.
The animation poses A and B are two consecutive frames of a small looping idle action: clear but not extreme movement, feet planted.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```
