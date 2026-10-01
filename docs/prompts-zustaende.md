# Zustands-Hintergründe: Prompts für Nano Banana 2

Wenn im Spiel etwas geöffnet, eingeschaltet oder weggenommen wird, zeigt der Hintergrund bisher noch den alten Zustand. Für jeden dieser Fälle gibt es hier ein **Variantenbild**: derselbe Hintergrund, nur mit der einen Änderung. Das Spiel wechselt automatisch auf die Variante, sobald der Zustand eintritt (Engine und Szenen sind dafür schon vorbereitet; fehlt eine Datei, bleibt alles wie bisher).

**Zwei Arten**
- **Zustand** (Tür offen, Terminal an, Turbine aus …): das Bild wird gezeigt, sobald der Zustand eintritt.
- **sauber**: Gegenstände, die man im Spiel einsammelt (Flasche, Akte, Neonröhre, Zeitung), sind im Originalhintergrund schon eingemalt und würden nach dem Aufheben weiter sichtbar bleiben. Das Variantenbild ohne den Gegenstand wird **immer** als Hintergrund benutzt, der Gegenstand liegt im Spiel als eigenes Bild obendrauf und verschwindet beim Aufheben.

**Ablauf**
1. Neuer Chat pro Bild. Das Originalbild (`assets/raw/bg_…png`) als **Image 1** anhängen, danach `ref_03_stil_nudelgasse.png`. Es ist ein Bearbeiten-Auftrag: Nano Banana soll das Bild fast unverändert wiedergeben.
2. Format 16:9, höchste Auflösung. Wichtig: gleicher Bildausschnitt und Seitenverhältnis wie das Original, sonst passen Figuren und Hotspots nicht mehr.
3. Speichern unter dem angegebenen Pfad (Variantenname hinten angehängt).
4. Sag mir Bescheid, ich erzeuge die Qualitätsstufen und schalte sie frei. Mit `python3 tools/make_tiers.py` und `python3 tools/make_index.py` geht das auch von Hand.
5. Wenn die KI etwas daneben ändert (zusätzliche Figuren, verschobene Objekte), im selben Chat korrigieren: „Change nothing except …“.

**Reihenfolge-Empfehlung:** zuerst die „sauber“-Bilder (immer sichtbar), dann die Zustandsbilder in Spielreihenfolge.

---

## 1. bar: tuer offen

- **Speichern als:** `assets/raw/bg_04_bar_tuer_offen.png`
- **Format:** 16:9, highest resolution (2K or 4K), same framing as the original
- **Referenzbilder (in dieser Reihenfolge anhängen):** `bg_04_bar.png`, `ref_03_stil_nudelgasse.png`
- **Wann im Spiel:** Zustand: `S.flags.hinterzimmer_offen`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (bg_04_bar.png): this is the ORIGINAL background that you must edit. Reproduce it exactly, with only the change described below.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail (the same style as image 1).
Follow the references closely. Now edit the first image.

Edit the attached background illustration (Image 1) and change ONLY the following: The door on the right with the sign PERSONAL is now wide open. Behind it a dark back room is visible with a faint glow of server lights. The sign stays.

Keep the composition, the camera angle, the perspective, the colors, the lighting, the painting style and every other object exactly identical and pixel-aligned to the attached image, as if it were the same painting with one detail changed. No characters, no people, no animals, no robots. No watermark, no UI, no frame, no border.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 2. bar_hinterzimmer: terminal an

- **Speichern als:** `assets/raw/bg_05_bar_hinterzimmer_terminal_an.png`
- **Format:** 16:9, highest resolution (2K or 4K), same framing as the original
- **Referenzbilder (in dieser Reihenfolge anhängen):** `bg_05_bar_hinterzimmer.png`, `ref_03_stil_nudelgasse.png`
- **Wann im Spiel:** Zustand: `S.flags.terminal_log`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (bg_05_bar_hinterzimmer.png): this is the ORIGINAL background that you must edit. Reproduce it exactly, with only the change described below.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail (the same style as image 1).
Follow the references closely. Now edit the first image.

Edit the attached background illustration (Image 1) and change ONLY the following: The old computer on the desk is now switched on: its monitor glows with several lines of green scrolling text and casts a soft green light on the desk.

Keep the composition, the camera angle, the perspective, the colors, the lighting, the painting style and every other object exactly identical and pixel-aligned to the attached image, as if it were the same painting with one detail changed. No characters, no people, no animals, no robots. No watermark, no UI, no frame, no border.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 3. plaza: sauber

- **Speichern als:** `assets/raw/bg_13_plaza_sauber.png`
- **Format:** 16:9, highest resolution (2K or 4K), same framing as the original
- **Referenzbilder (in dieser Reihenfolge anhängen):** `bg_13_plaza.png`, `ref_03_stil_nudelgasse.png`
- **Wann im Spiel:** sauber (immer als Hintergrund)

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (bg_13_plaza.png): this is the ORIGINAL background that you must edit. Reproduce it exactly, with only the change described below.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail (the same style as image 1).
Follow the references closely. Now edit the first image.

Edit the attached background illustration (Image 1) and change ONLY the following: Remove the loose newspaper that lies on top of the newspaper stand and the newspapers on the bench. The stand and the bench stay, the stand's top is just empty.

Keep the composition, the camera angle, the perspective, the colors, the lighting, the painting style and every other object exactly identical and pixel-aligned to the attached image, as if it were the same painting with one detail changed. No characters, no people, no animals, no robots. No watermark, no UI, no frame, no border.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 4. plaza: kantine offen

- **Speichern als:** `assets/raw/bg_13_plaza_kantine_offen.png`
- **Format:** 16:9, highest resolution (2K or 4K), same framing as the original
- **Referenzbilder (in dieser Reihenfolge anhängen):** `bg_13_plaza.png`, `ref_03_stil_nudelgasse.png`
- **Wann im Spiel:** Zustand: `S.flags.kantine_offen`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (bg_13_plaza.png): this is the ORIGINAL background that you must edit. Reproduce it exactly, with only the change described below.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail (the same style as image 1).
Follow the references closely. Now edit the first image.

Edit the attached background illustration (Image 1) and change ONLY the following: The door under the KANTINE sign is now open, showing a dim hallway behind it. Also remove the loose newspaper on top of the newspaper stand and on the bench (the stand and the bench stay).

Keep the composition, the camera angle, the perspective, the colors, the lighting, the painting style and every other object exactly identical and pixel-aligned to the attached image, as if it were the same painting with one detail changed. No characters, no people, no animals, no robots. No watermark, no UI, no frame, no border.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 5. lobby: aufzug offen

- **Speichern als:** `assets/raw/bg_14_lobby_aufzug_offen.png`
- **Format:** 16:9, highest resolution (2K or 4K), same framing as the original
- **Referenzbilder (in dieser Reihenfolge anhängen):** `bg_14_lobby.png`, `ref_03_stil_nudelgasse.png`
- **Wann im Spiel:** Zustand: `S.flags.lobby_frei`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (bg_14_lobby.png): this is the ORIGINAL background that you must edit. Reproduce it exactly, with only the change described below.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail (the same style as image 1).
Follow the references closely. Now edit the first image.

Edit the attached background illustration (Image 1) and change ONLY the following: The doors of the right elevator are open: the empty cabin inside is brightly lit, the indicator above the door lights up green.

Keep the composition, the camera angle, the perspective, the colors, the lighting, the painting style and every other object exactly identical and pixel-aligned to the attached image, as if it were the same painting with one detail changed. No characters, no people, no animals, no robots. No watermark, no UI, no frame, no border.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 6. werbefabrik: drucker an

- **Speichern als:** `assets/raw/bg_17_werbefabrik_drucker_an.png`
- **Format:** 16:9, highest resolution (2K or 4K), same framing as the original
- **Referenzbilder (in dieser Reihenfolge anhängen):** `bg_17_werbefabrik.png`, `ref_03_stil_nudelgasse.png`
- **Wann im Spiel:** Zustand: `S.flags.gab_holo_siegel`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (bg_17_werbefabrik.png): this is the ORIGINAL background that you must edit. Reproduce it exactly, with only the change described below.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail (the same style as image 1).
Follow the references closely. Now edit the first image.

Edit the attached background illustration (Image 1) and change ONLY the following: The big HOLOGRAM-DRUCKER is running: a glowing violet hologram of a crowned coat of arms with two lions hovers above it, small sparks, a violet glow on the nearby floor.

Keep the composition, the camera angle, the perspective, the colors, the lighting, the painting style and every other object exactly identical and pixel-aligned to the attached image, as if it were the same painting with one detail changed. No characters, no people, no animals, no robots. No watermark, no UI, no frame, no border.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 7. casino: tresor offen

- **Speichern als:** `assets/raw/bg_19_casino_tresor_offen.png`
- **Format:** 16:9, highest resolution (2K or 4K), same framing as the original
- **Referenzbilder (in dieser Reihenfolge anhängen):** `bg_19_casino.png`, `ref_03_stil_nudelgasse.png`
- **Wann im Spiel:** Zustand: `S.flags.jackpot_alarm`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (bg_19_casino.png): this is the ORIGINAL background that you must edit. Reproduce it exactly, with only the change described below.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail (the same style as image 1).
Follow the references closely. Now edit the first image.

Edit the attached background illustration (Image 1) and change ONLY the following: The golden double doors labeled TRESOR are wide open, showing a dark vault corridor with a warm glow. Red alarm lights flash on the walls and give the whole room a slight red tint.

Keep the composition, the camera angle, the perspective, the colors, the lighting, the painting style and every other object exactly identical and pixel-aligned to the attached image, as if it were the same painting with one detail changed. No characters, no people, no animals, no robots. No watermark, no UI, no frame, no border.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 8. tresor: sauber

- **Speichern als:** `assets/raw/bg_20_tresor_sauber.png`
- **Format:** 16:9, highest resolution (2K or 4K), same framing as the original
- **Referenzbilder (in dieser Reihenfolge anhängen):** `bg_20_tresor.png`, `ref_03_stil_nudelgasse.png`
- **Wann im Spiel:** sauber (immer als Hintergrund)

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (bg_20_tresor.png): this is the ORIGINAL background that you must edit. Reproduce it exactly, with only the change described below.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail (the same style as image 1).
Follow the references closely. Now edit the first image.

Edit the attached background illustration (Image 1) and change ONLY the following: Remove the folder with the child's drawing on its cover from the desk (it lies on the pile of files at the front). Leave all other files, the lamp and the mug exactly as they are.

Keep the composition, the camera angle, the perspective, the colors, the lighting, the painting style and every other object exactly identical and pixel-aligned to the attached image, as if it were the same painting with one detail changed. No characters, no people, no animals, no robots. No watermark, no UI, no frame, no border.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 9. museum: alarm

- **Speichern als:** `assets/raw/bg_23_museum_alarm.png`
- **Format:** 16:9, highest resolution (2K or 4K), same framing as the original
- **Referenzbilder (in dieser Reihenfolge anhängen):** `bg_23_museum.png`, `ref_03_stil_nudelgasse.png`
- **Wann im Spiel:** Zustand: `S.flags.kurator_weg`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (bg_23_museum.png): this is the ORIGINAL background that you must edit. Reproduce it exactly, with only the change described below.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail (the same style as image 1).
Follow the references closely. Now edit the first image.

Edit the attached background illustration (Image 1) and change ONLY the following: The smoke detector on the ceiling above the pedestal glows red with small alarm zigzag lines around it, a few thin wisps of grey smoke drift below it, and a faint red tint lies over the room.

Keep the composition, the camera angle, the perspective, the colors, the lighting, the painting style and every other object exactly identical and pixel-aligned to the attached image, as if it were the same painting with one detail changed. No characters, no people, no animals, no robots. No watermark, no UI, no frame, no border.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 10. revier: pass weg

- **Speichern als:** `assets/raw/bg_24_revier_pass_weg.png`
- **Format:** 16:9, highest resolution (2K or 4K), same framing as the original
- **Referenzbilder (in dieser Reihenfolge anhängen):** `bg_24_revier.png`, `ref_03_stil_nudelgasse.png`
- **Wann im Spiel:** Zustand: `S.flags.gab_platin_pass`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (bg_24_revier.png): this is the ORIGINAL background that you must edit. Reproduce it exactly, with only the change described below.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail (the same style as image 1).
Follow the references closely. Now edit the first image.

Edit the attached background illustration (Image 1) and change ONLY the following: The glass display case on the right is now open (lid raised) and empty: only the empty purple cushion remains, the platinum card is gone.

Keep the composition, the camera angle, the perspective, the colors, the lighting, the painting style and every other object exactly identical and pixel-aligned to the attached image, as if it were the same painting with one detail changed. No characters, no people, no animals, no robots. No watermark, no UI, no frame, no border.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 11. gondel: frei

- **Speichern als:** `assets/raw/bg_25_gondel_frei.png`
- **Format:** 16:9, highest resolution (2K or 4K), same framing as the original
- **Referenzbilder (in dieser Reihenfolge anhängen):** `bg_25_gondel.png`, `ref_03_stil_nudelgasse.png`
- **Wann im Spiel:** Zustand: `S.flags.gondel_frei`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (bg_25_gondel.png): this is the ORIGINAL background that you must edit. Reproduce it exactly, with only the change described below.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail (the same style as image 1).
Follow the references closely. Now edit the first image.

Edit the attached background illustration (Image 1) and change ONLY the following: The velvet rope barrier on the left is unhooked and hangs down loosely, the door of the gondola is open and a warm welcoming glow comes out of it.

Keep the composition, the camera angle, the perspective, the colors, the lighting, the painting style and every other object exactly identical and pixel-aligned to the attached image, as if it were the same painting with one detail changed. No characters, no people, no animals, no robots. No watermark, no UI, no frame, no border.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 12. spa: turbine aus

- **Speichern als:** `assets/raw/bg_28_spa_golfdome_turbine_aus.png`
- **Format:** 16:9, highest resolution (2K or 4K), same framing as the original
- **Referenzbilder (in dieser Reihenfolge anhängen):** `bg_28_spa_golfdome.png`, `ref_03_stil_nudelgasse.png`
- **Wann im Spiel:** Zustand: `S.flags.turbine_aus`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (bg_28_spa_golfdome.png): this is the ORIGINAL background that you must edit. Reproduce it exactly, with only the change described below.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail (the same style as image 1).
Follow the references closely. Now edit the first image.

Edit the attached background illustration (Image 1) and change ONLY the following: The wind turbine above the golf dome has stopped completely: the blades stand still, no motion blur, no spinning effect.

Keep the composition, the camera angle, the perspective, the colors, the lighting, the painting style and every other object exactly identical and pixel-aligned to the attached image, as if it were the same painting with one detail changed. No characters, no people, no animals, no robots. No watermark, no UI, no frame, no border.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 13. spa: turbine aus ohne ball

- **Speichern als:** `assets/raw/bg_28_spa_golfdome_turbine_aus_ohne_ball.png`
- **Format:** 16:9, highest resolution (2K or 4K), same framing as the original
- **Referenzbilder (in dieser Reihenfolge anhängen):** `bg_28_spa_golfdome.png`, `ref_03_stil_nudelgasse.png`
- **Wann im Spiel:** Zustand: `S.flags.turbine_aus && S.flags.gab_goldener_golfball`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (bg_28_spa_golfdome.png): this is the ORIGINAL background that you must edit. Reproduce it exactly, with only the change described below.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail (the same style as image 1).
Follow the references closely. Now edit the first image.

Edit the attached background illustration (Image 1) and change ONLY the following: The wind turbine above the golf dome has stopped completely: the blades stand still, no motion blur. Also remove any golden golf ball from the turbine or the hill; nothing golden and round remains.

Keep the composition, the camera angle, the perspective, the colors, the lighting, the painting style and every other object exactly identical and pixel-aligned to the attached image, as if it were the same painting with one detail changed. No characters, no people, no animals, no robots. No watermark, no UI, no frame, no border.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 14. hyperhub: streik vorbei

- **Speichern als:** `assets/raw/bg_30_hyperhub_streik_vorbei.png`
- **Format:** 16:9, highest resolution (2K or 4K), same framing as the original
- **Referenzbilder (in dieser Reihenfolge anhängen):** `bg_30_hyperhub.png`, `ref_03_stil_nudelgasse.png`
- **Wann im Spiel:** Zustand: `S.flags.streik_vorbei`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (bg_30_hyperhub.png): this is the ORIGINAL background that you must edit. Reproduce it exactly, with only the change described below.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail (the same style as image 1).
Follow the references closely. Now edit the first image.

Edit the attached background illustration (Image 1) and change ONLY the following: The strike is over: remove the STREIK sign and the paper notice board next to the big round door. Instead lean a small cheerful sign reading PAUSE against the wall. Everything else stays.

Keep the composition, the camera angle, the perspective, the colors, the lighting, the painting style and every other object exactly identical and pixel-aligned to the attached image, as if it were the same painting with one detail changed. No characters, no people, no animals, no robots. No watermark, no UI, no frame, no border.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 15. orbitalgarten: ohne bohnen

- **Speichern als:** `assets/raw/bg_31_orbitalgarten_ohne_bohnen.png`
- **Format:** 16:9, highest resolution (2K or 4K), same framing as the original
- **Referenzbilder (in dieser Reihenfolge anhängen):** `bg_31_orbitalgarten.png`, `ref_03_stil_nudelgasse.png`
- **Wann im Spiel:** Zustand: `S.flags.gab_kaffeebohnen`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (bg_31_orbitalgarten.png): this is the ORIGINAL background that you must edit. Reproduce it exactly, with only the change described below.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail (the same style as image 1).
Follow the references closely. Now edit the first image.

Edit the attached background illustration (Image 1) and change ONLY the following: The coffee plants have been picked: only a few coffee cherries remain on the vines, the floating beans in the air are gone. Everything else stays.

Keep the composition, the camera angle, the perspective, the colors, the lighting, the painting style and every other object exactly identical and pixel-aligned to the attached image, as if it were the same painting with one detail changed. No characters, no people, no animals, no robots. No watermark, no UI, no frame, no border.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 16. mond_eingang: schleuse offen

- **Speichern als:** `assets/raw/bg_33_mond_eingang_schleuse_offen.png`
- **Format:** 16:9, highest resolution (2K or 4K), same framing as the original
- **Referenzbilder (in dieser Reihenfolge anhängen):** `bg_33_mond_eingang.png`, `ref_03_stil_nudelgasse.png`
- **Wann im Spiel:** Zustand: `S.flags.schleuse_offen`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (bg_33_mond_eingang.png): this is the ORIGINAL background that you must edit. Reproduce it exactly, with only the change described below.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail (the same style as image 1).
Follow the references closely. Now edit the first image.

Edit the attached background illustration (Image 1) and change ONLY the following: The round vault door of the MINE ACCESS is open, swung outward, showing a lit tunnel corridor behind it. The red warning lights on the door frame are green now.

Keep the composition, the camera angle, the perspective, the colors, the lighting, the painting style and every other object exactly identical and pixel-aligned to the attached image, as if it were the same painting with one detail changed. No characters, no people, no animals, no robots. No watermark, no UI, no frame, no border.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 17. mond_tiefe: ueber

- **Speichern als:** `assets/raw/bg_34_mond_tiefe_ueber.png`
- **Format:** 16:9, highest resolution (2K or 4K), same framing as the original
- **Referenzbilder (in dieser Reihenfolge anhängen):** `bg_34_mond_tiefe.png`, `ref_03_stil_nudelgasse.png`
- **Wann im Spiel:** Zustand: `S.flags.schlucht_ueber`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (bg_34_mond_tiefe.png): this is the ORIGINAL background that you must edit. Reproduce it exactly, with only the change described below.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail (the same style as image 1).
Follow the references closely. Now edit the first image.

Edit the attached background illustration (Image 1) and change ONLY the following: The mine cart no longer hangs over the chasm: it now stands on the rails at the far ledge, the crane hook above the chasm is empty and swings loosely.

Keep the composition, the camera angle, the perspective, the colors, the lighting, the painting style and every other object exactly identical and pixel-aligned to the attached image, as if it were the same painting with one detail changed. No characters, no people, no animals, no robots. No watermark, no UI, no frame, no border.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 18. serverkern: firewall offen

- **Speichern als:** `assets/raw/bg_35_serverkern_firewall_offen.png`
- **Format:** 16:9, highest resolution (2K or 4K), same framing as the original
- **Referenzbilder (in dieser Reihenfolge anhängen):** `bg_35_serverkern.png`, `ref_03_stil_nudelgasse.png`
- **Wann im Spiel:** Zustand: `S.flags.firewall_offen`

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (bg_35_serverkern.png): this is the ORIGINAL background that you must edit. Reproduce it exactly, with only the change described below.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail (the same style as image 1).
Follow the references closely. Now edit the first image.

Edit the attached background illustration (Image 1) and change ONLY the following: The big round vault door in the center of the corridor is open, a bright cyan-white light shines out of it, the red glow on the door and the floor is gone.

Keep the composition, the camera angle, the perspective, the colors, the lighting, the painting style and every other object exactly identical and pixel-aligned to the attached image, as if it were the same painting with one detail changed. No characters, no people, no animals, no robots. No watermark, no UI, no frame, no border.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 19. kantine: sauber

- **Speichern als:** `assets/raw/bg_15_kantine_sauber.png`
- **Format:** 16:9, highest resolution (2K or 4K), same framing as the original
- **Referenzbilder (in dieser Reihenfolge anhängen):** `bg_15_kantine.png`, `ref_03_stil_nudelgasse.png`
- **Wann im Spiel:** sauber (immer als Hintergrund)

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (bg_15_kantine.png): this is the ORIGINAL background that you must edit. Reproduce it exactly, with only the change described below.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail (the same style as image 1).
Follow the references closely. Now edit the first image.

Edit the attached background illustration (Image 1) and change ONLY the following: Remove the empty glass bottle that sticks out of or lies on the green trash bin. The bin itself stays, with its lid open.

Keep the composition, the camera angle, the perspective, the colors, the lighting, the painting style and every other object exactly identical and pixel-aligned to the attached image, as if it were the same painting with one detail changed. No characters, no people, no animals, no robots. No watermark, no UI, no frame, no border.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```

## 20. nudelgasse: sauber

- **Speichern als:** `assets/raw/bg_02_nudelgasse_sauber.png`
- **Format:** 16:9, highest resolution (2K or 4K), same framing as the original
- **Referenzbilder (in dieser Reihenfolge anhängen):** `bg_02_nudelgasse.png`, `ref_03_stil_nudelgasse.png`
- **Wann im Spiel:** sauber (immer als Hintergrund)

```
ATTACHED REFERENCE IMAGES (attach them in exactly this order):
Image 1 (bg_02_nudelgasse.png): this is the ORIGINAL background that you must edit. Reproduce it exactly, with only the change described below.
Image 2 (ref_03_stil_nudelgasse.png): use it for the overall art style, color palette, line weight and level of detail (the same style as image 1).
Follow the references closely. Now edit the first image.

Edit the attached background illustration (Image 1) and change ONLY the following: Remove the glowing neon tube or any glowing tube pieces that stick out of the green dumpster. The dumpster stays full of ordinary junk and scrap.

Keep the composition, the camera angle, the perspective, the colors, the lighting, the painting style and every other object exactly identical and pixel-aligned to the attached image, as if it were the same painting with one detail changed. No characters, no people, no animals, no robots. No watermark, no UI, no frame, no border.

Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium, exactly matching the art style of the attached reference images: chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk mood in neon magenta, cyan, amber and deep violet, soft glows, wet reflective ground, lots of small funny details.
```
