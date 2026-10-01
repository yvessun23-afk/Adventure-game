# NPC Akt 3: jede Figur als eigenes Bild

Die KI schafft die 12er-Sheets nicht sauber (doppelte und fehlende Figuren, verschmolzene Figuren, Hintergrund). Deshalb jetzt **ein Bild pro Figur** mit genau zwei Posen: **links ruhig, rechts sprechend**. Das sind 12 kurze Aufträge, die Fehlerquote ist viel niedriger.

**Ablauf**
1. Neuer Chat pro Figur, Referenzbilder in der genannten Reihenfolge anhängen. `sheet_npc_akt3_idle.png` ist dein letzter Versuch (die gelungenen Figuren darin dienen nur als Design-Vorlage).
2. Speichern als `assets/raw/npc3_<name>.png`.
3. Prüfen: genau zwei Figuren, nichts anderes im Bild. Bei Fehlern im selben Chat korrigieren („Only two figures, remove everything else“).
4. Sag mir Bescheid, ich schneide alle aus (`python3 tools/slice_npc_pairs.py --all`, trennt automatisch links/rechts).

---

## 1. Türsteher Klaus

- **Speichern als:** `assets/raw/npc3_klaus.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `sheet_npc_akt3_idle.png`, `sheet_npc_akt1.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (sheet_npc_akt3_idle.png): use it for design reference only: it contains several Act-3 characters; use ONLY the figure described below for the look (colors, outfit, proportions). Ignore every other figure and any mistakes in it.
Image 3 (sheet_npc_akt1.png): use it for the style, proportions, line weight and scale of the non-player characters.
Follow the references closely. Now create the following image.

Character sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY TWO full-body figures of the SAME character and nothing else: the first figure on the left half, the second figure on the right half, with a wide empty green gap (at least half a figure's width) between them. Both figures have exactly the same design, colors, size and body proportions, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or the other figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Türsteher Klaus: bulky bouncer robot with a grey metal head, a burgundy velvet jacket, white shirt, dark tie, dark trousers and an earpiece.
Figure on the left: standing with both arms hanging, stern neutral face.
Figure on the right: the same character, talking: one hand raised in a stop gesture, mouth open, stern.
Design source in the attached sheet: top row, first figure from the left.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 2. Sebastian.exe

- **Speichern als:** `assets/raw/npc3_sebastian.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `sheet_npc_akt3_idle.png`, `sheet_npc_akt1.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (sheet_npc_akt3_idle.png): use it for design reference only: it contains several Act-3 characters; use ONLY the figure described below for the look (colors, outfit, proportions). Ignore every other figure and any mistakes in it.
Image 3 (sheet_npc_akt1.png): use it for the style, proportions, line weight and scale of the non-player characters.
Follow the references closely. Now create the following image.

Character sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY TWO full-body figures of the SAME character and nothing else: the first figure on the left half, the second figure on the right half, with a wide empty green gap (at least half a figure's width) between them. Both figures have exactly the same design, colors, size and body proportions, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or the other figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Sebastian.exe: tall slim perfectionist butler robot with a monocle lens, a black tailcoat, bow tie, grey waistcoat and white gloves.
Figure on the left: standing very upright, one gloved hand at his chest, calm face.
Figure on the right: the same character, talking: one gloved hand lifted elegantly, mouth open, chin raised.
Design source in the attached sheet: top row, second figure from the left.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 3. Baron von Chrom

- **Speichern als:** `assets/raw/npc3_baron.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `sheet_npc_akt3_idle.png`, `sheet_npc_akt1.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (sheet_npc_akt3_idle.png): use it for design reference only: it contains several Act-3 characters; use ONLY the figure described below for the look (colors, outfit, proportions). Ignore every other figure and any mistakes in it.
Image 3 (sheet_npc_akt1.png): use it for the style, proportions, line weight and scale of the non-player characters.
Follow the references closely. Now create the following image.

Character sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY TWO full-body figures of the SAME character and nothing else: the first figure on the left half, the second figure on the right half, with a wide empty green gap (at least half a figure's width) between them. Both figures have exactly the same design, colors, size and body proportions, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or the other figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Baron von Chrom: pompous chrome-plated man in silver armor with a fur-trimmed red cape, a huge curled moustache, a cane in one hand.
Figure on the left: standing proudly with the cane planted, chin up.
Figure on the right: the same character, talking: free arm spread wide in a grand gesture, mouth open.
Design source in the attached sheet: top row, third figure from the left.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 4. Masseur Zen-3

- **Speichern als:** `assets/raw/npc3_zen.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `sheet_npc_akt3_idle.png`, `sheet_npc_akt1.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (sheet_npc_akt3_idle.png): use it for design reference only: it contains several Act-3 characters; use ONLY the figure described below for the look (colors, outfit, proportions). Ignore every other figure and any mistakes in it.
Image 3 (sheet_npc_akt1.png): use it for the style, proportions, line weight and scale of the non-player characters.
Follow the references closely. Now create the following image.

Character sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY TWO full-body figures of the SAME character and nothing else: the first figure on the left half, the second figure on the right half, with a wide empty green gap (at least half a figure's width) between them. Both figures have exactly the same design, colors, size and body proportions, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or the other figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Masseur Zen-3: calm multi-armed massage robot with four arms in a white bathrobe with a yin-yang symbol, holding small towels and oil bottles.
Figure on the left: standing relaxed, four arms holding towels and bottles, serene closed eyes.
Figure on the right: the same character, talking: two arms gesturing softly, mouth open, serene.
Design source in the attached sheet: top row, fourth figure from the left.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 5. Flug-Hans

- **Speichern als:** `assets/raw/npc3_flughans.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `sheet_npc_akt3_idle.png`, `sheet_npc_akt1.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (sheet_npc_akt3_idle.png): use it for design reference only: it contains several Act-3 characters; use ONLY the figure described below for the look (colors, outfit, proportions). Ignore every other figure and any mistakes in it.
Image 3 (sheet_npc_akt1.png): use it for the style, proportions, line weight and scale of the non-player characters.
Follow the references closely. Now create the following image.

Character sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY TWO full-body figures of the SAME character and nothing else: the first figure on the left half, the second figure on the right half, with a wide empty green gap (at least half a figure's width) between them. Both figures have exactly the same design, colors, size and body proportions, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or the other figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Flug-Hans: cheerful ticket clerk robot with a navy pilot cap with wings badge, a navy uniform with gold stripes, holding two tickets in one hand.
Figure on the left: standing, smiling, tickets held at his side.
Figure on the right: the same character, talking: tickets waved in the raised hand, mouth open, cheerful.
Design source in the attached sheet: bottom row, first figure from the left.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 6. Käpt’n Kabel

- **Speichern als:** `assets/raw/npc3_kabel.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `sheet_npc_akt3_idle.png`, `sheet_npc_akt1.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (sheet_npc_akt3_idle.png): use it for design reference only: it contains several Act-3 characters; use ONLY the figure described below for the look (colors, outfit, proportions). Ignore every other figure and any mistakes in it.
Image 3 (sheet_npc_akt1.png): use it for the style, proportions, line weight and scale of the non-player characters.
Follow the references closely. Now create the following image.

Character sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY TWO full-body figures of the SAME character and nothing else: the first figure on the left half, the second figure on the right half, with a wide empty green gap (at least half a figure's width) between them. Both figures have exactly the same design, colors, size and body proportions, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or the other figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Käpt’n Kabel: tired captain with long cable-like dreadlocks, a scruffy beard, dark circles, a worn navy captain's coat and a white captain's cap, holding an empty white mug.
Figure on the left: slouching with the mug held low, exhausted look.
Figure on the right: the same character, talking: mug lifted, other hand gesturing wearily, mouth open.
Design source in the attached sheet: bottom row, second figure from the left (use only the captain himself, ignore the sign, which belongs to another character).

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 7. Ramen-Kraken

- **Speichern als:** `assets/raw/npc3_kraken.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `sheet_npc_akt3_idle.png`, `sheet_npc_akt1.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (sheet_npc_akt3_idle.png): use it for design reference only: it contains several Act-3 characters; use ONLY the figure described below for the look (colors, outfit, proportions). Ignore every other figure and any mistakes in it.
Image 3 (sheet_npc_akt1.png): use it for the style, proportions, line weight and scale of the non-player characters.
Follow the references closely. Now create the following image.

Character sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY TWO full-body figures of the SAME character and nothing else: the first figure on the left half, the second figure on the right half, with a wide empty green gap (at least half a figure's width) between them. Both figures have exactly the same design, colors, size and body proportions, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or the other figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Ramen-Kraken: giant noodle octopus with sad eyes and a tiny chef hat, noodles on his head, sitting in a small flat orange puddle of broth with a pair of chopsticks lying beside him; no pot, no bowl, no kitchen.
Figure on the left: sitting with drooping tentacles, big sad eyes.
Figure on the right: the same character, talking: two tentacles raised, mouth open, still sad.
Design source in the attached sheet: bottom row, the orange octopus.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 8. Kleo

- **Speichern als:** `assets/raw/npc3_kleo.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `ende_01.png`, `sheet_npc_akt1.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (ende_01.png): use it for the exact design of KLEO (hologram girl with pigtails, big headphones, dark NC hoodie, slightly transparent with glowing cyan and pink edges) and of TEDDY-BOT (patched plush teddy bear with button eyes and an open mouth socket).
Image 3 (sheet_npc_akt1.png): use it for the style, proportions, line weight and scale of the non-player characters.
Follow the references closely. Now create the following image.

Character sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY TWO full-body figures of the SAME character and nothing else: the first figure on the left half, the second figure on the right half, with a wide empty green gap (at least half a figure's width) between them. Both figures have exactly the same design, colors, size and body proportions, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or the other figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Kleo: the 12-year-old hologram girl with pigtails, big headphones and the dark NC hoodie, slightly transparent with a thin glowing cyan and pink edge on the figure.
Figure on the left: standing, hands at her sides, curious look.
Figure on the right: the same character, talking: hands spread, mouth open, expressive.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 9. Schicht

- **Speichern als:** `assets/raw/npc3_schicht.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `sheet_npc_akt3_idle.png`, `sheet_npc_akt1.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (sheet_npc_akt3_idle.png): use it for design reference only: it contains several Act-3 characters; use ONLY the figure described below for the look (colors, outfit, proportions). Ignore every other figure and any mistakes in it.
Image 3 (sheet_npc_akt1.png): use it for the style, proportions, line weight and scale of the non-player characters.
Follow the references closely. Now create the following image.

Character sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY TWO full-body figures of the SAME character and nothing else: the first figure on the left half, the second figure on the right half, with a wide empty green gap (at least half a figure's width) between them. Both figures have exactly the same design, colors, size and body proportions, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or the other figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Schicht: union leader mining robot with a yellow hard hat with a lamp, a yellow high-visibility vest and a red megaphone.
Figure on the left: standing with the megaphone lowered at his side, determined look.
Figure on the right: the same character, talking: megaphone raised to his mouth, other fist pumped, shouting.
Design source in the attached sheet: bottom row, the robot with the megaphone.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 10. Streikposten

- **Speichern als:** `assets/raw/npc3_streikposten.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `sheet_npc_akt3_idle.png`, `sheet_npc_akt1.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (sheet_npc_akt3_idle.png): use it for design reference only: it contains several Act-3 characters; use ONLY the figure described below for the look (colors, outfit, proportions). Ignore every other figure and any mistakes in it.
Image 3 (sheet_npc_akt1.png): use it for the style, proportions, line weight and scale of the non-player characters.
Follow the references closely. Now create the following image.

Character sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY TWO full-body figures of the SAME character and nothing else: the first figure on the left half, the second figure on the right half, with a wide empty green gap (at least half a figure's width) between them. Both figures have exactly the same design, colors, size and body proportions, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or the other figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Streikposten: generic mining robot, smaller and plainer than Schicht: silver-grey body, an orange hard hat, a plain wooden strike sign reading STREIK held in one hand (the only text allowed).
Figure on the left: standing with the sign resting on his shoulder.
Figure on the right: the same character, talking: sign raised high, mouth open, protesting.
Design source in the attached sheet: none, new design: a simple grey robot with an orange hard hat, thinner than the union leader.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 11. Teddy-Bot

- **Speichern als:** `assets/raw/npc3_teddy.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `ende_01.png`, `sheet_npc_akt1.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (ende_01.png): use it for the exact design of KLEO (hologram girl with pigtails, big headphones, dark NC hoodie, slightly transparent with glowing cyan and pink edges) and of TEDDY-BOT (patched plush teddy bear with button eyes and an open mouth socket).
Image 3 (sheet_npc_akt1.png): use it for the style, proportions, line weight and scale of the non-player characters.
Follow the references closely. Now create the following image.

Character sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY TWO full-body figures of the SAME character and nothing else: the first figure on the left half, the second figure on the right half, with a wide empty green gap (at least half a figure's width) between them. Both figures have exactly the same design, colors, size and body proportions, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or the other figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Teddy-Bot: the worn, patched plush teddy bear with button eyes and an empty open mouth socket.
Figure on the left: standing, arms down, sad button eyes.
Figure on the right: the same character, talking: one arm raised, mouth socket open.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 12. Teddy-Bot mit Sensor

- **Speichern als:** `assets/raw/npc3_teddy_sensor.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_03_stil_nudelgasse.png`, `ende_01.png`, `sheet_npc_akt1.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 2 (ende_01.png): use it for the exact design of KLEO (hologram girl with pigtails, big headphones, dark NC hoodie, slightly transparent with glowing cyan and pink edges) and of TEDDY-BOT (patched plush teddy bear with button eyes and an open mouth socket).
Image 3 (sheet_npc_akt1.png): use it for the style, proportions, line weight and scale of the non-player characters.
Follow the references closely. Now create the following image.

Character sheet on a perfectly flat solid pure green (#00FF00) background with EXACTLY TWO full-body figures of the SAME character and nothing else: the first figure on the left half, the second figure on the right half, with a wide empty green gap (at least half a figure's width) between them. Both figures have exactly the same design, colors, size and body proportions, three-quarter view facing left (toward the player character), feet on the same line. Each figure is fully inside the image and does not touch the edges or the other figure. ABSOLUTELY NO background elements, no other characters, no scenery, no props except the ones listed, no floor, no cast shadows, no glow, halo or light bloom outside the outline. Do not use green colors on the character. Thick dark outline.

Character: Teddy-Bot mit Sensor: the same worn, patched plush teddy bear with button eyes, now with a small chrome tongue-sensor plugged into his mouth.
Figure on the left: standing, arms down, curious button eyes.
Figure on the right: the same character, talking: one arm raised, the chrome sensor glowing faintly.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```
