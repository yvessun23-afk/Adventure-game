# NPC-Animationen: Prompts für Nano Banana 2

Jeder NPC bekommt **zwei zusätzliche Bilder** (Pose A und Pose B), die im Spiel ab und zu abwechselnd laufen (A, B, A, B, A, B) und damit eine kleine, persönliche Aktion zeigen: Oma rührt in der Suppe, Rosi hämmert, die Katze putzt sich und so weiter. Dazu kommen weiterhin das sanfte Atmen und Wiegen. Fehlen die Bilder, bleibt alles wie bisher.

**Es sind 3 Sheets, je 12 Figuren und 24 Zellen** (Reihe 1 und 2 = Pose A, Reihe 3 und 4 = Pose B, gleiche Reihenfolge wie die Figuren im Sheet).

**Ablauf**
1. Neuer Chat pro Sheet, 16:9, höchste Auflösung. Referenzbilder in der genannten Reihenfolge anhängen. Die vorhandenen NPC-Sheets zeigen der KI, wie jede Figur aussieht.
2. Speichern unter dem angegebenen Pfad in `assets/raw/`.
3. Sag mir Bescheid, ich schneide sie aus (`tools/slice_sheet.py` mit den Namenslisten `tools/names/npc_anim_akt*.txt`) und baue sie ein. Wenn die KI das Raster nicht einhält, erkenne ich die Figuren trotzdem automatisch.

**Hinweis:** Die Figuren sollen dieselbe Größe und dieselbe Fußlinie wie im Ruhebild haben. Die Körpergröße gleiche ich beim Einbau automatisch an.

---

## 1. NPC-Animationen Akt 1 (12 Figuren, je Pose A und B)

- **Speichern als:** `assets/raw/sheet_npc_anim_akt1.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt1.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the main character PIXEL (copy her look exactly).
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt1.png): use it for the exact designs of the 12 Act-1 characters (same order as in the cells below: copy every figure's look, colors and proportions exactly; their idle and talking poses are the base).
Follow the references closely. Now create the following image.

Sprite sheet on a perfectly flat solid pure green (#00FF00) background. Exactly 6 columns and 4 rows, 24 cells in total, reading order left to right, top to bottom. Each cell holds exactly one full-body figure, fully inside its own cell, centered, with a large empty green gap between all cells. Nothing touches or overlaps. Same scale for all figures, feet roughly on the same line in each row. No cast shadows, no floor, no text, no glow, halo or light bloom outside the outline. Do not use green colors on any figure. Thick dark outline around every figure. All figures stand in a three-quarter view facing left (toward the player character), full body, exactly the same scale, body proportions and feet position as in the attached character sheet. Every figure keeps its design from the reference sheet exactly; only the pose changes. The two poses of one character must look like two consecutive frames of a small looping idle animation (clear but not extreme movement, the feet stay planted).

Rows 1 and 2 (cells 1 to 12): the characters in animation pose A, in this order:
1. Oma Zhang: tiny 87-year-old woman, huge round glasses, kitchen apron, hair bun held by chopsticks. POSE A: stirring an invisible soup pot with a wooden ladle held out in front of her, head slightly tilted, content smile.
2. Rosi: enormous rusty robot woman, welder mask pushed up on her head, spare parts as jewelry, one arm is a crane arm. POSE A: hammering on something with a big wrench, arm raised high, welder mask pulled down over the face.
3. Bit: bar robot with a bucket-shaped head, cocktail shaker in his hand, small loading bar on his chest. POSE A: shaking the cocktail shaker high beside his head, loading bar on his chest at about one third.
4. Hehler-Hugo: four-armed creature in a trench coat with countless pockets, wide-brim hat, sly smile. POSE A: glancing sideways over his shoulder with suspicious eyes, two arms holding the coat open to show shiny junk inside.
5. Kurt: pigeon crime boss with a gold chain, monocle, puffed chest, tiny cigar holder. POSE A: head pecking forward in a typical pigeon bob, chest puffed, cigar holder in beak.
6. Brezel: round bakery robot shaped like a pretzel, dusted with flour, tall chef hat. POSE A: kneading dough in front of his belly with both hands, flour puffing up, cheerful face.
7. Schaffner 4711: boxy train conductor robot with a whistle, a cap and a giant rubber stamp. POSE A: checking an imaginary pocket watch held in one hand, stern look, stamp tucked under the other arm.
8. Bello-5000: robot dog with a wagging antenna tail, ball-shaped eyes, chew toy in his mouth. POSE A: sitting up and wagging the antenna tail to the left, tongue panel out, happy eyes.
9. Wuschel (defekt): small round vacuum cleaner robot, dented, sparking, one wheel missing, sad. POSE A: wobbling to the left on its broken wheel, a small spark popping from the dent, one eye flickering.
10. Wuschel (repariert): the same small round vacuum cleaner robot, repaired, shiny and happy. POSE A: spinning a little to the left with a tiny sparkle on the shiny body, happy eyes.
11. Ratten-Trupp: three rats with tiny hard hats holding protest signs. POSE A: all three rats raising their blank protest signs up high, mouths open shouting.
12. Katze Schrödinger: a smug cat sitting, slightly glowing and half transparent at the edges. POSE A: licking one front paw, eyes closed, tail curled around the feet.

Rows 3 and 4 (cells 13 to 24): the same 12 characters in the same order, now in animation pose B:
13. Oma Zhang: POSE B of the same character: same stirring motion with the ladle on the other side, taking a tiny taste with a satisfied squint.
14. Rosi: POSE B of the same character: hammer swung down, a few sparks flying, mask still down, body leaning into the swing.
15. Bit: POSE B of the same character: shaker held low, lifting the lid to peek inside, loading bar at about two thirds.
16. Hehler-Hugo: POSE B of the same character: coat closed again, finger on his lips in a shushing gesture, looking the other way.
17. Kurt: POSE B of the same character: head pulled back, wing smoothing the gold chain, smug half-closed eyes.
18. Brezel: POSE B of the same character: tossing a small dough ball up in the air with one hand, other hand on his hip, proud grin.
19. Schaffner 4711: POSE B of the same character: blowing the whistle with puffed cheeks, stamp raised in the other hand.
20. Bello-5000: POSE B of the same character: antenna tail wagging to the right, head tilted curiously, chew toy squeaking in his mouth.
21. Wuschel (defekt): POSE B of the same character: wobbling to the right, sad droopy eyes, a thin puff of smoke.
22. Wuschel (repariert): POSE B of the same character: spinning back to the right, bouncing slightly, a small happy heart symbol on its display.
23. Ratten-Trupp: POSE B of the same character: signs lowered, rats leaning on each other, one wiping its brow, another yawning.
24. Katze Schrödinger: POSE B of the same character: stretching with the front paws forward and the back raised, a wide yawn.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 2. NPC-Animationen Akt 2 (12 Figuren, je Pose A und B)

- **Speichern als:** `assets/raw/sheet_npc_anim_akt2.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt2.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the main character PIXEL (copy her look exactly).
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt2.png): use it for the exact designs of the 12 Act-2 characters (same order as in the cells below: copy every figure's look, colors and proportions exactly; their idle and talking poses are the base).
Follow the references closely. Now create the following image.

Sprite sheet on a perfectly flat solid pure green (#00FF00) background. Exactly 6 columns and 4 rows, 24 cells in total, reading order left to right, top to bottom. Each cell holds exactly one full-body figure, fully inside its own cell, centered, with a large empty green gap between all cells. Nothing touches or overlaps. Same scale for all figures, feet roughly on the same line in each row. No cast shadows, no floor, no text, no glow, halo or light bloom outside the outline. Do not use green colors on any figure. Thick dark outline around every figure. All figures stand in a three-quarter view facing left (toward the player character), full body, exactly the same scale, body proportions and feet position as in the attached character sheet. Every figure keeps its design from the reference sheet exactly; only the pose changes. The two poses of one character must look like two consecutive frames of a small looping idle animation (clear but not extreme movement, the feet stay planted).

Rows 1 and 2 (cells 1 to 12): the characters in animation pose A, in this order:
1. Frau Ablage: stern receptionist robot with a filing-cabinet body, glasses on a chain, sour expression. POSE A: a small drawer on her body pulled open, one hand pulling out a paper, looking over the glasses.
2. Chef Kloß: desperate chubby cook robot with a dumpling-shaped head, a ladle in his hand. POSE A: wringing both hands in despair, sweat drops flying, eyes wide.
3. Grünhorn: gardener robot built from garden tools and a watering can, a leaf on his head. POSE A: watering an invisible plant with the watering can arm tipped forward, a few drops falling.
4. Prof. Staub: curator robot in a dusty tailcoat with a magnifying-glass eye. POSE A: leaning forward and inspecting something with the magnifying-glass eye, one finger raised.
5. Schnipp: barber robot with scissor hands, wild electrified hair, striped coat. POSE A: snipping both scissor hands in the air at the front, tiny hair snippets flying.
6. Madame Jackpot: elegant woman with a roulette-wheel hat, gold gown and a cold smile. POSE A: hat's roulette wheel spinning (slight motion blur lines on the hat), one gloved hand fanning herself.
7. Mortimer: tall casino doorman robot in a velvet suit, red rope in his hand. POSE A: arms crossed on his chest with the red rope hanging down, stony look straight ahead.
8. Dr. Schraub: nervous thin doctor with big round glasses, white coat and trembling hands. POSE A: both hands trembling in front of him (small motion lines), eyes wide behind the glasses.
9. Stempel-Stefan: stout official with an oversized rubber stamp and ink-stained fingers. POSE A: stamp raised high above a table edge, stern concentrated face.
10. Kiosk-Zeus: newspaper vendor robot with a roll-up screen body and a hat full of headlines. POSE A: screen body scrolling headlines (blurry colorful text bars), one hand cupped at his mouth shouting.
11. Flimmer: sleepy hologram technician, headphones around the neck, eyes closed. POSE A: head nodding forward in a doze, small Z letters floating above, hologram edges flickering.
12. Mr. Tackert: a tiny hamster in a running wheel wearing a tiny tie. POSE A: running in the wheel with the front legs forward, tie flying backward, determined face.

Rows 3 and 4 (cells 13 to 24): the same 12 characters in the same order, now in animation pose B:
13. Frau Ablage: POSE B of the same character: drawer slammed shut, one finger tapping on her body, impatient look.
14. Chef Kloß: POSE B of the same character: ladle raised, shaking his head, mouth in a wobbling worried line.
15. Grünhorn: POSE B of the same character: watering can arm raised again, the leaf on his head perked up, proud smile.
16. Prof. Staub: POSE B of the same character: straightening up, brushing dust off his tailcoat with a small cloud of dust.
17. Schnipp: POSE B of the same character: scissors crossed in front of his chest like a pose, hair standing up with small sparks.
18. Madame Jackpot: POSE B of the same character: fan hand lowered, one eyebrow raised, cold polite smile, hat wheel still.
19. Mortimer: POSE B of the same character: straightening his velvet lapels with one hand, looking down his nose.
20. Dr. Schraub: POSE B of the same character: pushing his glasses up with a shaky finger, nervous half smile.
21. Stempel-Stefan: POSE B of the same character: stamp slammed down low, a small puff of ink, satisfied nod.
22. Kiosk-Zeus: POSE B of the same character: holding up a newspaper in one hand, other hand tipping his headline hat.
23. Flimmer: POSE B of the same character: head snapping up with one eye half open, a flicker line through the body.
24. Mr. Tackert: POSE B of the same character: running with the back legs forward in the wheel, tie flying the other way, panting.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 3. NPC-Animationen Akt 3 (12 Figuren, je Pose A und B)

- **Speichern als:** `assets/raw/sheet_npc_anim_akt3.png`
- **Format:** 16:9, highest resolution (2K or 4K)
- **Referenzbilder (in dieser Reihenfolge anhängen):** `ref_01_pixel_turnaround.png`, `ref_03_stil_nudelgasse.png`, `sheet_npc_akt3.png`, `ende_01.png`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (ref_01_pixel_turnaround.png): use it for the main character PIXEL (copy her look exactly).
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail.
Image 3 (sheet_npc_akt3.png): use it for the exact designs of the 12 Act-3 characters (same order as in the cells below: copy every figure's look, colors and proportions exactly; their idle and talking poses are the base).
Image 4 (ende_01.png): use it for the exact design of KLEO (hologram girl with pigtails, headphones, dark NC hoodie) and TEDDY-BOT (patched plush teddy robot).
Follow the references closely. Now create the following image.

Sprite sheet on a perfectly flat solid pure green (#00FF00) background. Exactly 6 columns and 4 rows, 24 cells in total, reading order left to right, top to bottom. Each cell holds exactly one full-body figure, fully inside its own cell, centered, with a large empty green gap between all cells. Nothing touches or overlaps. Same scale for all figures, feet roughly on the same line in each row. No cast shadows, no floor, no text, no glow, halo or light bloom outside the outline. Do not use green colors on any figure. Thick dark outline around every figure. All figures stand in a three-quarter view facing left (toward the player character), full body, exactly the same scale, body proportions and feet position as in the attached character sheet. Every figure keeps its design from the reference sheet exactly; only the pose changes. The two poses of one character must look like two consecutive frames of a small looping idle animation (clear but not extreme movement, the feet stay planted).

Rows 1 and 2 (cells 1 to 12): the characters in animation pose A, in this order:
1. Türsteher Klaus: bulky bouncer robot in a velvet jacket with an earpiece. POSE A: touching his earpiece with one finger, head tilted, listening.
2. Sebastian.exe: tall perfectionist butler robot with a monocle lens and white gloves. POSE A: wiping an invisible speck off his sleeve with a white glove, monocle lens glinting.
3. Baron von Chrom: pompous chrome-plated man with a huge moustache, cane and fur collar. POSE A: twirling one end of his moustache, cane planted, chin up with a chrome glint.
4. Masseur Zen-3: calm multi-armed massage robot in a bathrobe. POSE A: multiple arms kneading the air in slow circles, eyes closed, serene smile.
5. Flug-Hans: cheerful ticket clerk robot with a pilot cap. POSE A: making an airplane gesture with one flat hand flying up, other hand holding a ticket.
6. Käpt'n Kabel: tired captain with cable-like hair and dark circles, holding an empty mug. POSE A: tipping the empty mug upside down and staring into it, drooping shoulders.
7. Schicht: union leader mining robot with a hard hat, megaphone and protest vest. POSE A: megaphone raised to the mouth, other fist pumped in the air, shouting.
8. Streikposten: generic mining robot holding a strike sign. POSE A: strike sign raised high over his head in both hands.
9. Ramen-Kraken: giant noodle octopus with sad eyes, standing in a puddle of broth. POSE A: two tentacles lifted and drooping, a single tear rolling down, noodles dripping.
10. Kleo: the 12-year-old hologram girl with pigtails, big headphones and the dark NC hoodie, slightly transparent with cyan and pink glowing edges. POSE A: bobbing her head to music with the hands on the headphones, pigtails swinging, little glitch flicker.
11. Teddy-Bot: the worn, patched plush teddy bear with button eyes and an empty open mouth socket. POSE A: waving one stubby arm slowly, head tilted, button eyes looking up.
12. Teddy-Bot mit Sensor: the same teddy bear with a small chrome tongue-sensor plugged into his mouth. POSE A: tapping the chrome sensor in his mouth with one paw, curious button eyes.

Rows 3 and 4 (cells 13 to 24): the same 12 characters in the same order, now in animation pose B:
13. Türsteher Klaus: POSE B of the same character: arms crossed again, scanning the room with narrowed eyes.
14. Sebastian.exe: POSE B of the same character: adjusting his monocle with two fingers, chin raised.
15. Baron von Chrom: POSE B of the same character: laughing grandly with his head thrown back, one hand on the fur collar, cane in the other hand.
16. Masseur Zen-3: POSE B of the same character: arms spread wide in a deep-breathing stretch, eyes closed.
17. Flug-Hans: POSE B of the same character: saluting with two fingers at his pilot cap, big cheerful grin.
18. Käpt'n Kabel: POSE B of the same character: huge yawn with one hand over the mouth, cable hair swaying.
19. Schicht: POSE B of the same character: megaphone lowered, wiping the hard hat with a tired sigh.
20. Streikposten: POSE B of the same character: strike sign lowered and leaning on his shoulder, kicking a small pebble with his foot.
21. Ramen-Kraken: POSE B of the same character: tentacles wrapped around himself in a hug, eyes closed, slightly smaller sad pose.
22. Kleo: POSE B of the same character: giggling with a hand in front of her mouth, eyes sparkling, a small flicker on her edges.
23. Teddy-Bot: POSE B of the same character: hugging his own arms to his chest, head drooping sadly.
24. Teddy-Bot mit Sensor: POSE B of the same character: arms raised in surprise, button eyes wide, sensor glowing faintly.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```
