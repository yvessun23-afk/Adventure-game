# Alle NPCs neu: einheitliche, ausführliche Prompts

**Ziel:** Alle 36 Nicht-Spieler-Figuren sehen am Ende gleich aus (gleicher Stil, gleiche Linien, gleiches Licht, gleicher Maßstab) und haben dieselben vier Posen. So passen Ruhe-, Sprech- und Animationsbilder immer zusammen, und es gibt keine Sprünge mehr.

**Aufbau jedes Prompts**
1. Liste der Referenzbilder (Image 1 = Pixel für den Maßstab, Image 2 = Stil, Image 3 = Design-Vorlage der Figur).
2. Globale Regeln (Stil, Licht, Kamera, Maßstab, Palette, Hintergrund, Layout), in jedem Prompt wortgleich.
3. Figur: Höhe in Prozent von Pixel, ausführliche Beschreibung und die vier Posen von links nach rechts: **ruhig, sprechend, Animation A, Animation B**.
4. Ausschlussliste („nicht“).

**Ein Bild pro Figur (nicht 12 pro Sheet):** Die KI hält große Raster nicht ein (fehlende, doppelte oder verschmolzene Figuren). Mit vier Figuren derselben Figur ist das Ergebnis viel stabiler und gleichmäßiger. Die Maßstäbe ergeben sich aus den Prozentwerten, sodass beim Zusammensetzen im Spiel alles zueinander passt.

**Ablauf**
1. Neuer Chat pro Figur. Referenzbilder in der angegebenen Reihenfolge anhängen. Die Design-Vorlage ist nur dafür da, dass die Figur wiedererkannt wird: Es soll **nur** die genannte Figur übernommen werden, alle anderen und alle Fehler im Sheet werden ignoriert.
2. Speichern als `assets/raw/npcpose_<name>.png`, 16:9, höchste Auflösung.
3. Prüfen: genau vier Figuren, gleicher Look, gleiche Größe, nichts anderes im Bild. Wenn etwas nicht stimmt, im selben Chat korrigieren: „Exactly four figures, same size and feet on one line, remove everything else“.
4. Sag mir Bescheid, ich schneide alles aus (`python3 tools/slice_npc_poses.py --all`) und ersetze die bisherigen Bilder.

**Empfohlene Reihenfolge:** Akt 1 (12), Akt 2 (12), Akt 3 (12). Die 13 Figuren, denen bisher das Sprechbild fehlt (Ablage, Kloß, Grünhorn, Staub, Mortimer, Schraub, Stefan, Zeus, Flimmer, Tackert, Kabel, Kraken, Streikposten), zuerst.

**Maßstab-Übersicht (Höhe in Prozent von Pixel)**

| Figur | Höhe | Figur | Höhe | Figur | Höhe |
|---|---|---|---|---|---|

| Oma Zhang | 90 % | Rosi | 154 % | Bit | 100 % |

| Hehler-Hugo | 99 % | Kurt | 93 % | Brezel | 101 % |

| Schaffner 4711 | 95 % | Bello-5000 | 62 % | Wuschel (defekt) | 58 % |

| Wuschel (repariert) | 58 % | Ratten-Trupp | 62 % | Katze Schrödinger | 63 % |

| Frau Ablage | 70 % | Chef Kloß | 95 % | Grünhorn | 103 % |

| Prof. Staub | 99 % | Schnipp | 99 % | Madame Jackpot | 103 % |

| Mortimer | 101 % | Dr. Schraub | 103 % | Stempel-Stefan | 67 % |

| Kiosk-Zeus | 62 % | Flimmer | 56 % | Mr. Tackert | 45 % |

| Türsteher Klaus | 107 % | Sebastian.exe | 101 % | Baron von Chrom | 107 % |

| Masseur Zen-3 | 101 % | Flug-Hans | 73 % | Käpt'n Kabel | 101 % |

| Schicht | 111 % | Streikposten | 97 % | Ramen-Kraken | 86 % |

| Kleo | 99 % | Teddy-Bot | 99 % | Teddy-Bot mit Sensor | 99 % |


---

## 1. Oma Zhang

- **Speichern als:** `assets/raw/npcpose_oma.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt1.png`
- **Höhe:** 90 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt1.png): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Oma Zhang
Height: 90 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: top row, first figure.
Appearance in detail: A tiny 87-year-old grandmother. Silver-grey hair in a bun held by two wooden chopsticks, huge round black-rimmed glasses that make her eyes look enormous, a kind wrinkled face with rosy cheeks. Lilac-purple blouse with a cream-white kitchen apron, pink house shoes.

THE FOUR POSES, from left to right:
1. IDLE: standing with both hands folded in front of her apron, gentle smile.
2. TALKING: mouth open, one hand raised and wagging a finger, eyebrows lifted, scolding but loving.
3. ANIMATION POSE A: stirring an invisible soup pot with a wooden ladle held out in front of her, head slightly tilted, content smile.
4. ANIMATION POSE B: same stirring motion with the ladle on the other side, taking a tiny taste with a satisfied squint.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 2. Rosi

- **Speichern als:** `assets/raw/npcpose_rosi.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt1.png`
- **Höhe:** 154 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt1.png): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Rosi
Height: 154 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: top row, second figure.
Appearance in detail: An enormous rusty robot woman, wide hips and shoulders, rust-brown and copper body with green patina streaks. A dark welder mask with a visor is pushed up on her head. She wears chunky jewelry made of bolts and a turquoise pendant. One arm ends in a crane arm with a hook. Heavy boots.

THE FOUR POSES, from left to right:
1. IDLE: standing with legs apart, arms hanging, welder mask pushed up, content look.
2. TALKING: one big arm gesturing wide, mouth open, loud and friendly.
3. ANIMATION POSE A: hammering on something with a big wrench, arm raised high, welder mask pulled down over the face.
4. ANIMATION POSE B: hammer swung down, a few sparks flying, mask still down, body leaning into the swing.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 3. Bit

- **Speichern als:** `assets/raw/npcpose_bit.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt1.png`
- **Höhe:** 100 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt1.png): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Bit
Height: 100 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: top row, third figure.
Appearance in detail: A bar robot. Silver-grey bucket-shaped head with a bucket handle on top, two round yellow glowing eyes, a small display on his chest with a green loading bar. Thin segmented arms and legs, one hand holds a silver cocktail shaker.

THE FOUR POSES, from left to right:
1. IDLE: standing upright, shaker held at his chest, polite blank smile.
2. TALKING: mouth open, free hand gesturing, shaker raised slightly, chatty.
3. ANIMATION POSE A: shaking the cocktail shaker high beside his head, loading bar on his chest at about one third.
4. ANIMATION POSE B: shaker held low, lifting the lid to peek inside, loading bar at about two thirds.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 4. Hehler-Hugo

- **Speichern als:** `assets/raw/npcpose_hugo.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt1.png`
- **Höhe:** 99 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt1.png): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Hehler-Hugo
Height: 99 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: top row, fourth figure.
Appearance in detail: A sly green frog-like creature in a long tan-brown trench coat with countless pockets, a wide-brimmed brown hat, a purple shirt collar, a toothy grin and half-closed scheming eyes. He has four arms; the extra pair is hidden under the coat.

THE FOUR POSES, from left to right:
1. IDLE: standing with a finger against his chin, glancing sideways, sly grin.
2. TALKING: one hand open as if offering a deal, mouth open, eyebrow raised.
3. ANIMATION POSE A: glancing sideways over his shoulder with suspicious eyes, two arms holding the coat open to show shiny junk inside.
4. ANIMATION POSE B: coat closed again, finger on his lips in a shushing gesture, looking the other way.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 5. Kurt

- **Speichern als:** `assets/raw/npcpose_kurt.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt1.png`
- **Höhe:** 93 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt1.png): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Kurt
Height: 93 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: top row, fifth figure.
Appearance in detail: A pigeon crime boss with blue-grey feathers, a puffed-out chest, a thick gold chain with a G pendant, a monocle on one eye and a tiny cigar holder with a cigar in his beak. Orange legs and feet.

THE FOUR POSES, from left to right:
1. IDLE: standing with chest puffed, one wing on his chain, smug.
2. TALKING: beak open, one wing raised in a mob-boss gesture, monocle glinting.
3. ANIMATION POSE A: head pecking forward in a typical pigeon bob, chest puffed, cigar holder in beak.
4. ANIMATION POSE B: head pulled back, wing smoothing the gold chain, smug half-closed eyes.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 6. Brezel

- **Speichern als:** `assets/raw/npcpose_brezel.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt1.png`
- **Höhe:** 101 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt1.png): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Brezel
Height: 101 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: top row, sixth figure.
Appearance in detail: A bakery robot whose body is a golden-brown pretzel dusted with flour, a tall white chef hat on top, a cheerful face in the pretzel's loop, copper arms and legs.

THE FOUR POSES, from left to right:
1. IDLE: standing with arms at his sides, a puff of flour, friendly smile.
2. TALKING: mouth open, one hand waving a small flour cloud, cheerful.
3. ANIMATION POSE A: kneading dough in front of his belly with both hands, flour puffing up, cheerful face.
4. ANIMATION POSE B: tossing a small dough ball up in the air with one hand, other hand on his hip, proud grin.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 7. Schaffner 4711

- **Speichern als:** `assets/raw/npcpose_schaffner.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt1.png`
- **Höhe:** 95 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt1.png): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Schaffner 4711
Height: 95 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: top row, seventh figure.
Appearance in detail: A boxy train-conductor robot with a rectangular grey-blue head, a navy conductor's cap with a gold badge, a navy uniform jacket with a tie, a whistle on a cord and a giant rubber stamp in one hand. Stern look.

THE FOUR POSES, from left to right:
1. IDLE: standing stiffly, stamp held at his side, stern.
2. TALKING: mouth open, free hand pointing, stamp raised, officious.
3. ANIMATION POSE A: checking an imaginary pocket watch held in one hand, stern look, stamp tucked under the other arm.
4. ANIMATION POSE B: blowing the whistle with puffed cheeks, stamp raised in the other hand.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 8. Bello-5000

- **Speichern als:** `assets/raw/npcpose_bello.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt1.png`
- **Höhe:** 62 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt1.png): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Bello-5000
Height: 62 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: second row, first figure.
Appearance in detail: A robot dog with a silver-grey metal body, big round yellow ball-shaped eyes, a red collar, a wagging antenna as a tail and a chew-toy bone in his mouth. Four legs, sitting or standing like a dog.

THE FOUR POSES, from left to right:
1. IDLE: sitting, tail antenna upright, head tilted, bone in mouth.
2. TALKING: standing, barking with open mouth, tail wagging, excited.
3. ANIMATION POSE A: sitting up and wagging the antenna tail to the left, tongue panel out, happy eyes.
4. ANIMATION POSE B: antenna tail wagging to the right, head tilted curiously, chew toy squeaking in his mouth.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 9. Wuschel (defekt)

- **Speichern als:** `assets/raw/npcpose_wuschel_defekt.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt1.png`
- **Höhe:** 58 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt1.png): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Wuschel (defekt)
Height: 58 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: second row, third figure.
Appearance in detail: A small round vacuum-cleaner robot: grey dented shell, one wheel missing so it tilts, a few sparks, big sad droopy eyes, a short hose.

THE FOUR POSES, from left to right:
1. IDLE: tilted on its broken wheel, drooping eyes, a little smoke.
2. TALKING: eyes wide, a small spark, tiny squeaking mouth, shaking.
3. ANIMATION POSE A: wobbling to the left on its broken wheel, a small spark popping from the dent, one eye flickering.
4. ANIMATION POSE B: wobbling to the right, sad droopy eyes, a thin puff of smoke.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 10. Wuschel (repariert)

- **Speichern als:** `assets/raw/npcpose_wuschel_repariert.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt1.png`
- **Höhe:** 58 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt1.png): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Wuschel (repariert)
Height: 58 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: second row, fourth figure.
Appearance in detail: The same small round vacuum-cleaner robot after repair: shiny light-blue shell, two wheels, a happy face with round eyes, a small sparkle.

THE FOUR POSES, from left to right:
1. IDLE: upright on two wheels, happy eyes, tiny sparkle.
2. TALKING: bouncing slightly, open happy mouth, a heart symbol above.
3. ANIMATION POSE A: spinning a little to the left with a tiny sparkle on the shiny body, happy eyes.
4. ANIMATION POSE B: spinning back to the right, bouncing slightly, a small happy heart symbol on its display.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 11. Ratten-Trupp

- **Speichern als:** `assets/raw/npcpose_ratten.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt1.png`
- **Höhe:** 62 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt1.png): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Ratten-Trupp
Height: 62 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: second row, fifth figure.
Appearance in detail: A trio of grey rats with tiny yellow hard hats, each holding a small protest sign with a megaphone symbol (no text). Pointed snouts, long thin tails, determined faces.

THE FOUR POSES, from left to right:
1. IDLE: standing in a row, signs held low, bored.
2. TALKING: all three with open mouths, signs held up, shouting.
3. ANIMATION POSE A: all three rats raising their blank protest signs up high, mouths open shouting.
4. ANIMATION POSE B: signs lowered, rats leaning on each other, one wiping its brow, another yawning.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 12. Katze Schrödinger

- **Speichern als:** `assets/raw/npcpose_katze.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt1.png`
- **Höhe:** 63 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt1.png): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Katze Schrödinger
Height: 63 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: second row, last figure.
Appearance in detail: A smug grey cat sitting upright, a faint cyan-green glow along the edges of the body, slightly see-through, tail curled around the paws.

THE FOUR POSES, from left to right:
1. IDLE: sitting, tail curled, eyes half closed, smug.
2. TALKING: mouth open in a meow, head raised, paw lifted.
3. ANIMATION POSE A: licking one front paw, eyes closed, tail curled around the feet.
4. ANIMATION POSE B: stretching with the front paws forward and the back raised, a wide yawn.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 13. Frau Ablage

- **Speichern als:** `assets/raw/npcpose_ablage.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt2.png`
- **Höhe:** 70 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt2.png): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Frau Ablage
Height: 70 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: top row, first figure.
Appearance in detail: A stern receptionist robot whose body is a khaki-beige metal filing cabinet with three drawers, tufts of paper on top, round glasses on a chain, small grey arms, a sour pressed mouth.

THE FOUR POSES, from left to right:
1. IDLE: standing, arms folded over a drawer, sour look.
2. TALKING: one hand pulling her glasses down, mouth open, scolding.
3. ANIMATION POSE A: a small drawer on her body pulled open, one hand pulling out a paper, looking over the glasses.
4. ANIMATION POSE B: drawer slammed shut, one finger tapping on her body, impatient look.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 14. Chef Kloß

- **Speichern als:** `assets/raw/npcpose_kloss.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt2.png`
- **Höhe:** 95 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt2.png): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Chef Kloß
Height: 95 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: top row, second figure.
Appearance in detail: A desperate chubby cook robot: a cream dumpling-shaped head with folds, a white chef coat and apron, a red neckerchief, striped trousers, grey metal hands, a ladle in one hand, worried eyebrows and sweat drops.

THE FOUR POSES, from left to right:
1. IDLE: standing, ladle held low, worried look.
2. TALKING: ladle raised, mouth open, pleading with both brows up.
3. ANIMATION POSE A: wringing both hands in despair, sweat drops flying, eyes wide.
4. ANIMATION POSE B: ladle raised, shaking his head, mouth in a wobbling worried line.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 15. Grünhorn

- **Speichern als:** `assets/raw/npcpose_gruenhorn.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt2.png`
- **Höhe:** 103 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt2.png): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Grünhorn
Height: 103 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: top row, third figure.
Appearance in detail: A gardener robot assembled from garden tools: olive-green and copper body, shovel-blade arms, a watering can in one hand, a small green leaf growing from his head, glowing yellow-green eyes.

THE FOUR POSES, from left to right:
1. IDLE: standing, watering can held low, leaf perked up, calm.
2. TALKING: one tool arm gesturing, mouth open, whispering excitedly.
3. ANIMATION POSE A: watering an invisible plant with the watering can arm tipped forward, a few drops falling.
4. ANIMATION POSE B: watering can arm raised again, the leaf on his head perked up, proud smile.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 16. Prof. Staub

- **Speichern als:** `assets/raw/npcpose_staub.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt2.png`
- **Höhe:** 99 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt2.png): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Prof. Staub
Height: 99 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: top row, fourth figure.
Appearance in detail: A curator robot in an old dusty brown tailcoat and waistcoat, grey hair swept back, one large magnifying-glass eye, thin grey metal hands, a dignified bored face.

THE FOUR POSES, from left to right:
1. IDLE: standing, hands behind his back, magnifying eye focused.
2. TALKING: one finger raised, magnifying eye wide, mouth open, lecturing.
3. ANIMATION POSE A: leaning forward and inspecting something with the magnifying-glass eye, one finger raised.
4. ANIMATION POSE B: straightening up, brushing dust off his tailcoat with a small cloud of dust.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 17. Schnipp

- **Speichern als:** `assets/raw/npcpose_schnipp.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt2.png`
- **Höhe:** 99 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt2.png): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Schnipp
Height: 99 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: top row, fifth figure.
Appearance in detail: A barber robot with a silver-white body, a striped white-grey barber coat with a red-white-blue pole pattern, wild electrified light-blue hair with sparks, one glowing red eye, scissors instead of hands.

THE FOUR POSES, from left to right:
1. IDLE: standing, scissors held up, sparks in the hair.
2. TALKING: mouth open, scissors snipping, manic grin.
3. ANIMATION POSE A: snipping both scissor hands in the air at the front, tiny hair snippets flying.
4. ANIMATION POSE B: scissors crossed in front of his chest like a pose, hair standing up with small sparks.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 18. Madame Jackpot

- **Speichern als:** `assets/raw/npcpose_jackpot.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt2.png`
- **Höhe:** 103 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt2.png): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Madame Jackpot
Height: 103 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: top row, sixth figure.
Appearance in detail: An elegant woman with a roulette wheel as a hat, black hair, a gold gown with a magenta-pink underskirt and cyan trim, a hand fan, a cold polished smile.

THE FOUR POSES, from left to right:
1. IDLE: standing with one hand on her hip, fan closed, cold smile.
2. TALKING: fan open in one hand, mouth open, one eyebrow raised, haughty.
3. ANIMATION POSE A: hat's roulette wheel spinning (slight motion blur lines on the hat), one gloved hand fanning herself.
4. ANIMATION POSE B: fan hand lowered, one eyebrow raised, cold polite smile, hat wheel still.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 19. Mortimer

- **Speichern als:** `assets/raw/npcpose_mortimer.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt2.png`
- **Höhe:** 101 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt2.png): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Mortimer
Height: 101 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: top row, seventh figure.
Appearance in detail: A tall slim casino doorman robot in a dark purple velvet suit with a tie, a metallic grey face with glowing yellow eyes, a red velvet rope with a brass post in one hand.

THE FOUR POSES, from left to right:
1. IDLE: standing very straight, rope at his side, stony face.
2. TALKING: one hand raised politely, mouth open, aloof.
3. ANIMATION POSE A: arms crossed on his chest with the red rope hanging down, stony look straight ahead.
4. ANIMATION POSE B: straightening his velvet lapels with one hand, looking down his nose.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 20. Dr. Schraub

- **Speichern als:** `assets/raw/npcpose_schraub.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt2.png`
- **Höhe:** 103 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt2.png): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Dr. Schraub
Height: 103 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: second row, first figure.
Appearance in detail: A nervous thin elderly doctor with big round glasses, thin grey hair, a white lab coat, trembling hands, wide worried eyes.

THE FOUR POSES, from left to right:
1. IDLE: standing, hands trembling in front of him, nervous.
2. TALKING: both hands raised, mouth open, stammering.
3. ANIMATION POSE A: both hands trembling in front of him (small motion lines), eyes wide behind the glasses.
4. ANIMATION POSE B: pushing his glasses up with a shaky finger, nervous half smile.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 21. Stempel-Stefan

- **Speichern als:** `assets/raw/npcpose_stefan.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt2.png`
- **Höhe:** 67 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt2.png): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Stempel-Stefan
Height: 67 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: second row, second figure.
Appearance in detail: A stout official in a navy uniform and cap, a red round nose, a moustache, ink-stained fingers and an oversized rubber stamp in one hand.

THE FOUR POSES, from left to right:
1. IDLE: standing, stamp held at his belly, grumpy.
2. TALKING: stamp raised, other hand pointing, mouth open, bureaucratic.
3. ANIMATION POSE A: stamp raised high above a table edge, stern concentrated face.
4. ANIMATION POSE B: stamp slammed down low, a small puff of ink, satisfied nod.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 22. Kiosk-Zeus

- **Speichern als:** `assets/raw/npcpose_zeus.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt2.png`
- **Höhe:** 62 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt2.png): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Kiosk-Zeus
Height: 62 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: second row, third figure.
Appearance in detail: A newspaper-vendor robot with a boxy screen body that scrolls colorful headline bars, a brown fedora full of rolled newspapers, thin arms, a cheerful look.

THE FOUR POSES, from left to right:
1. IDLE: standing, one hand holding a newspaper, screen scrolling.
2. TALKING: one hand cupped at his mouth shouting, mouth open.
3. ANIMATION POSE A: screen body scrolling headlines (blurry colorful text bars), one hand cupped at his mouth shouting.
4. ANIMATION POSE B: holding up a newspaper in one hand, other hand tipping his headline hat.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 23. Flimmer

- **Speichern als:** `assets/raw/npcpose_flimmer.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt2.png`
- **Höhe:** 56 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt2.png): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Flimmer
Height: 56 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: second row, fourth figure.
Appearance in detail: A sleepy hologram technician: cyan semi-transparent body with flickering edges, big headphones around the neck, closed eyes, a small cap.

THE FOUR POSES, from left to right:
1. IDLE: standing, eyes closed, a small Z floating, edges flickering.
2. TALKING: head lifted, one eye half open, mouth open, one hand waving lazily.
3. ANIMATION POSE A: head nodding forward in a doze, small Z letters floating above, hologram edges flickering.
4. ANIMATION POSE B: head snapping up with one eye half open, a flicker line through the body.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 24. Mr. Tackert

- **Speichern als:** `assets/raw/npcpose_tackert.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt2.png`
- **Höhe:** 45 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt2.png): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Mr. Tackert
Height: 45 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: second row, last figure (the hamster in the wheel; ignore the rats).
Appearance in detail: A tiny orange hamster with a tiny tie, standing next to or in a small running wheel, big round eyes.

THE FOUR POSES, from left to right:
1. IDLE: standing upright next to the wheel, tie straight.
2. TALKING: on his hind legs, one paw raised, mouth open, squeaking importantly.
3. ANIMATION POSE A: running in the wheel with the front legs forward, tie flying backward, determined face.
4. ANIMATION POSE B: running with the back legs forward in the wheel, tie flying the other way, panting.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 25. Türsteher Klaus

- **Speichern als:** `assets/raw/npcpose_klaus.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt3_v1.png`
- **Höhe:** 107 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt3_v1.png): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Türsteher Klaus
Height: 107 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: top row, first figure.
Appearance in detail: A bulky bouncer robot with a grey metal head and an earpiece, a burgundy velvet jacket over a white shirt and a dark tie, dark trousers, big hands.

THE FOUR POSES, from left to right:
1. IDLE: standing with arms hanging, stern neutral face.
2. TALKING: one hand raised in a stop gesture, mouth open, stern.
3. ANIMATION POSE A: touching his earpiece with one finger, head tilted, listening.
4. ANIMATION POSE B: arms crossed again, scanning the room with narrowed eyes.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 26. Sebastian.exe

- **Speichern als:** `assets/raw/npcpose_sebastian.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt3_v1.png`
- **Höhe:** 101 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt3_v1.png): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Sebastian.exe
Height: 101 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: top row, second figure.
Appearance in detail: A tall slim perfectionist butler robot with a monocle lens, a black tailcoat, white shirt, bow tie, grey waistcoat and white gloves, a white napkin over one arm.

THE FOUR POSES, from left to right:
1. IDLE: standing very upright, napkin on his arm, calm.
2. TALKING: one gloved hand lifted elegantly, mouth open, chin raised.
3. ANIMATION POSE A: wiping an invisible speck off his sleeve with a white glove, monocle lens glinting.
4. ANIMATION POSE B: adjusting his monocle with two fingers, chin raised.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 27. Baron von Chrom

- **Speichern als:** `assets/raw/npcpose_baron.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt3_v1.png`
- **Höhe:** 107 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt3_v1.png): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Baron von Chrom
Height: 107 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: top row, third figure.
Appearance in detail: A pompous chrome-plated man with silver skin, a huge curled moustache, swept-back hair, a fur-collared coat over a waistcoat with a magenta cravat, a cane.

THE FOUR POSES, from left to right:
1. IDLE: standing proudly, cane planted, chin up.
2. TALKING: free arm spread wide, mouth open, grand gesture.
3. ANIMATION POSE A: twirling one end of his moustache, cane planted, chin up with a chrome glint.
4. ANIMATION POSE B: laughing grandly with his head thrown back, one hand on the fur collar, cane in the other hand.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 28. Masseur Zen-3

- **Speichern als:** `assets/raw/npcpose_zen.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt3_v1.png`
- **Höhe:** 101 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt3_v1.png): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Masseur Zen-3
Height: 101 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: top row, fourth figure.
Appearance in detail: A calm multi-armed massage robot with a silver-blue head and a third eye mark, a white bathrobe with a belt, four arms, bare robot feet in sandals.

THE FOUR POSES, from left to right:
1. IDLE: standing, four arms relaxed, serene closed eyes.
2. TALKING: two arms gesturing softly, mouth open, serene.
3. ANIMATION POSE A: multiple arms kneading the air in slow circles, eyes closed, serene smile.
4. ANIMATION POSE B: arms spread wide in a deep-breathing stretch, eyes closed.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 29. Flug-Hans

- **Speichern als:** `assets/raw/npcpose_flughans.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt3_v1.png`
- **Höhe:** 73 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt3_v1.png): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Flug-Hans
Height: 73 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: top row, fifth figure.
Appearance in detail: A cheerful ticket-clerk robot with a blue-grey boxy head, a navy pilot cap with a wings badge, a navy uniform with gold stripes and a tie, holding two tickets.

THE FOUR POSES, from left to right:
1. IDLE: standing, smiling, tickets at his side.
2. TALKING: tickets waved in the raised hand, mouth open, cheerful.
3. ANIMATION POSE A: making an airplane gesture with one flat hand flying up, other hand holding a ticket.
4. ANIMATION POSE B: saluting with two fingers at his pilot cap, big cheerful grin.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 30. Käpt'n Kabel

- **Speichern als:** `assets/raw/npcpose_kabel.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt3_v1.png`
- **Höhe:** 101 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt3_v1.png): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Käpt'n Kabel
Height: 101 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: top row, sixth figure.
Appearance in detail: A tired captain with long cable-like dreadlocks, a scruffy beard, dark circles under the eyes, a white captain's cap with an anchor, a worn navy coat and an empty white mug.

THE FOUR POSES, from left to right:
1. IDLE: slouching, mug held low, exhausted look.
2. TALKING: mug lifted, other hand gesturing wearily, mouth open.
3. ANIMATION POSE A: tipping the empty mug upside down and staring into it, drooping shoulders.
4. ANIMATION POSE B: huge yawn with one hand over the mouth, cable hair swaying.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 31. Schicht

- **Speichern als:** `assets/raw/npcpose_schicht.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt3_v1.png`
- **Höhe:** 111 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt3_v1.png): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Schicht
Height: 111 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: top row, seventh figure.
Appearance in detail: A union-leader mining robot with a yellow hard hat with a lamp, a yellow high-visibility vest over a grey-brown body, a red megaphone.

THE FOUR POSES, from left to right:
1. IDLE: standing, megaphone lowered at his side, determined.
2. TALKING: megaphone raised to his mouth, other fist pumped, shouting.
3. ANIMATION POSE A: megaphone raised to the mouth, other fist pumped in the air, shouting.
4. ANIMATION POSE B: megaphone lowered, wiping the hard hat with a tired sigh.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 32. Streikposten

- **Speichern als:** `assets/raw/npcpose_streikposten.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt3_v1.png`
- **Höhe:** 97 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt3_v1.png): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Streikposten
Height: 97 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: second row, second figure (but the sign must read STREIK).
Appearance in detail: A generic mining robot, plainer than Schicht: silver-grey body, an orange hard hat, a plain wooden strike sign reading STREIK (the only text on the image) held in one hand.

THE FOUR POSES, from left to right:
1. IDLE: standing, sign resting on his shoulder.
2. TALKING: sign raised high, mouth open, protesting.
3. ANIMATION POSE A: strike sign raised high over his head in both hands.
4. ANIMATION POSE B: strike sign lowered and leaning on his shoulder, kicking a small pebble with his foot.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 33. Ramen-Kraken

- **Speichern als:** `assets/raw/npcpose_kraken.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt3_v1.png`
- **Höhe:** 86 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt3_v1.png): design reference only. It contains many characters; use ONLY the figure named below for the exact look (colors, outfit, proportions, line style) and ignore every other figure and every mistake in the sheet.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Ramen-Kraken
Height: 86 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: second row, third figure.
Appearance in detail: A giant noodle octopus, orange-brown with big sad eyes, a tiny white chef hat, noodles on his head, a flat orange puddle of broth with a pair of chopsticks beside him. No pot, no bowl, no kitchen.

THE FOUR POSES, from left to right:
1. IDLE: sitting with drooping tentacles, big sad eyes.
2. TALKING: two tentacles raised, mouth open, still sad.
3. ANIMATION POSE A: two tentacles lifted and drooping, a single tear rolling down, noodles dripping.
4. ANIMATION POSE B: tentacles wrapped around himself in a hug, eyes closed, slightly smaller sad pose.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 34. Kleo

- **Speichern als:** `assets/raw/npcpose_kleo.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `ende_01.png`
- **Höhe:** 99 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (ende_01.png): use it for the exact design of KLEO (hologram girl) and TEDDY-BOT (patched plush teddy bear) in the final scene; copy the requested character exactly and ignore all other characters.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Kleo
Height: 99 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: the hologram girl.
Appearance in detail: A 12-year-old hologram girl with pigtails, big headphones around her neck or ears, a dark NC hoodie and leggings, slightly transparent with a thin glowing cyan and pink edge on the figure itself (no glow around it).

THE FOUR POSES, from left to right:
1. IDLE: standing, hands at her sides, curious look.
2. TALKING: hands spread, mouth open, expressive.
3. ANIMATION POSE A: bobbing her head to music with the hands on the headphones, pigtails swinging, little glitch flicker.
4. ANIMATION POSE B: giggling with a hand in front of her mouth, eyes sparkling, a small flicker on her edges.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 35. Teddy-Bot

- **Speichern als:** `assets/raw/npcpose_teddy.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `ende_01.png`
- **Höhe:** 99 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (ende_01.png): use it for the exact design of KLEO (hologram girl) and TEDDY-BOT (patched plush teddy bear) in the final scene; copy the requested character exactly and ignore all other characters.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Teddy-Bot
Height: 99 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: the teddy bear.
Appearance in detail: A worn plush teddy bear in warm brown with patches and stitches, button eyes (one X-shaped), and an empty open mouth socket.

THE FOUR POSES, from left to right:
1. IDLE: standing, arms down, sad button eyes.
2. TALKING: one arm raised, mouth socket open.
3. ANIMATION POSE A: waving one stubby arm slowly, head tilted, button eyes looking up.
4. ANIMATION POSE B: hugging his own arms to his chest, head drooping sadly.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 36. Teddy-Bot mit Sensor

- **Speichern als:** `assets/raw/npcpose_teddy_sensor.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `ende_01.png`
- **Höhe:** 99 % von Pixel

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the SCALE reference only: Pixel (front view) is exactly 100 percent height; do not copy Pixel's look.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (ende_01.png): use it for the exact design of KLEO (hologram girl) and TEDDY-BOT (patched plush teddy bear) in the final scene; copy the requested character exactly and ignore all other characters.
Follow the references closely. Now create the following image.

Character pose sheet on a perfectly flat solid pure green (#00FF00) background: exactly FOUR full-body figures of the same character in one row, left to right.

GLOBAL RULES FOR THIS CHARACTER SET (identical in every prompt, so all 36 characters match):
1. Art style: hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium; chunky wobbly dark outlines of equal weight on every character; exaggerated cartoon proportions; saturated colors; painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render).
2. Lighting: soft, even, slightly warm key light from the upper left on every figure, one gentle darker shade for form, no cast shadows on the ground, no rim glow.
3. Camera: full body, three-quarter view, the character faces LEFT toward the player, eye line slightly above the middle of the figure, the same camera distance for all characters.
4. Scale: the figure's height is given as a percentage of PIXEL's height (Pixel in the first reference image, front view = 100 percent). Keep that percentage exactly so all characters share one scale.
5. Palette: neon-tinged cyberpunk colors (magenta, cyan, amber, violet accents) on warm or muted base colors; skin and material colors as described; never use green on a character (the background is chroma green).
6. Background: perfectly flat solid pure green (#00FF00) only. No floor, no ground line, no shadows, no scenery, no props except the ones listed, no glow, halo, light bloom or blur outside the outline.
7. Layout: exactly four figures of the same character in one horizontal row from left to right, each fully inside the image, a wide empty green gap (at least half a figure's width) between them, nothing touches or overlaps, feet on one common line, same size in all four.
8. Consistency: the four figures are the same character with identical design, colors, proportions and line weight; only the pose and the facial expression change.

CHARACTER: Teddy-Bot mit Sensor
Height: 99 percent of Pixel's height (Pixel = 100 percent).
Design source in Image 3: the teddy bear.
Appearance in detail: The same worn patched plush teddy bear, now with a small chrome tongue-sensor plugged into his mouth.

THE FOUR POSES, from left to right:
1. IDLE: standing, arms down, curious button eyes.
2. TALKING: one arm raised, the chrome sensor glowing faintly.
3. ANIMATION POSE A: tapping the chrome sensor in his mouth with one paw, curious button eyes.
4. ANIMATION POSE B: arms raised in surprise, button eyes wide, sensor glowing faintly.
Poses 3 and 4 are two consecutive frames of a small looping idle action: clear but not extreme movement, the feet stay planted, the body proportions do not change.

DO NOT: add any other character, scenery, floor, shadow, glow, text (except where explicitly requested), watermark, frame or border; do not change the design between the four figures; do not crop a figure; do not make one figure larger than the others.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```
