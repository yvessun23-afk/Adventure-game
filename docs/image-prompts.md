# Bild-Prompts für Nano Banana Pro

Alle Prompts sind auf Englisch, weil Bild-KIs damit zuverlässiger arbeiten.
Speichere die Originale **unverändert** in `assets/raw/`. Den Rest (Ausschneiden, Skalieren, Benennen) mache ich.

Gesamtzahl: ca. 75 Bilder. Fange mit Schritt 0 an, bevor du den Rest generierst.

---

## 0. Stil-Bibel (zuerst!)

Erzeuge zuerst diese **3 Referenzbilder** und hänge sie bei jedem weiteren Prompt als Referenz an
(mehrere Referenzbilder gleichzeitig möglich).

| Datei | Inhalt |
|---|---|
| `assets/raw/ref_01_pixel_turnaround.png` | Pixel: Frontal, Seite, Rücken |
| `assets/raw/ref_02_kruemel.png` | Krümel: Frontal, Seite, schräg von oben |
| `assets/raw/ref_03_stil_nudelgasse.png` | Der Look einer kompletten Szene (= `bg_02`) |

### `STIL` (an jeden Prompt anhängen)
```
Hand-painted 2D point-and-click adventure game art in the spirit of Day of the Tentacle, Broken Age and Machinarium. Chunky wobbly dark outlines, exaggerated cartoon proportions, saturated colors, painterly gouache and digital brush texture (NOT flat vector, NOT pixel art, NOT 3D render). Playful cyberpunk city mood: neon magenta, cyan, amber and deep violet, soft glows, wet reflective streets, lots of small funny details. Consistent with the attached reference images.
```

### `KEIN-TEXT` (an Hintergründe anhängen)
```
No watermark, no UI, no frame, no border. No characters unless stated. Text only where explicitly requested, short and readable.
```

### Ref 01: Pixel
```
Character turnaround sheet of PIXEL, a 24-year-old chaotic courier girl: messy short teal-dyed hair, orange oversized courier jacket with a reflective stripe, pilot goggles pushed up on the forehead, baggy cargo pants with many pockets, chunky sneakers, cheeky grin. Three views side by side: front, side (facing right), back. Full body, neutral standing pose. Plain light grey background. [STIL]
```

### Ref 02: Krümel
```
Character sheet of KRÜMEL, a small flying toaster drone: chrome two-slot toaster body with a dented corner, a little propeller on top, two big expressive round eyes on the front, a tiny toast slot mouth, small landing legs, a cracked antenna. Three views: front, side (facing right), three-quarter from above. Plain light grey background. [STIL]
```

---

## 1. Hintergründe (36 Bilder)

Format: **16:9, möglichst 2K oder höher**. Dateiname: `assets/raw/bg_NN_name.png`.
Hänge an jeden Prompt: `[STIL] [KEIN-TEXT]` und die Referenzbilder.

**Wichtig:** Dinge, die Pixel später aufnimmt oder die sich ändern, sollen **nicht** im Bild sein
(„leave free“). Ich lege sie als Extra-Objekte darüber. Falls die KI sie trotzdem malt, sag mir Bescheid, ich sage dir dann, ob wir neu generieren oder per Bearbeitungs-Prompt entfernen.

### Akt 1 – Unter-Heights

**01 `bg_01_zhangs_imbiss`**
Interior of a cramped, cozy 24/7 noodle shop in a cyberpunk slum: long counter with stools, steaming pots, hanging paper lanterns, a wall-mounted soup dispenser machine, a small kitchen shelf on the back wall, an open empty wall safe, an old family photo frame on the wall, a window showing a neon street. Warm orange and red light. A small sign reads "ZHANG'S RAMEN". Leave the shelf and counter mostly empty (objects added later). Floor with a dark soy sauce footprint near the safe.

**02 `bg_02_nudelgasse`** (Referenzbild 03)
Wide narrow alley street in Under-Heights, long horizontal composition: crowded buildings with neon signs, steaming food stalls, cables overhead, a noodle shop entrance on the left, the door of a bar with a pointer-arrow sign on the right, a laundromat, a bakery, a junkyard gate in the distance, a market arch at the far right. A dented garbage bin in the foreground. A big flickering neon sign "NUDEL". Wet reflective ground.

**03 `bg_03_schrottplatz`**
Junkyard with mountains of scrap, a rusty crane with an empty hook, a cluttered workbench, shelves of spare parts, a tiny shack with a sign "ROSTIGE ROSI", an open gap at the back leading to a sewer tunnel with a manhole. Sunset orange glow. No robots (added later).

**04 `bg_04_bar`**
Hacker bar "NULL POINTER": dark, neon green-free palette (only magenta, cyan, amber), bar counter with bottle shelves, glowing screens, tangled cables, two arcade cabinets, a door in the back marked "STAFF". Sign "NULL POINTER". No bartender.

**05 `bg_05_bar_hinterzimmer`**
Cramped back room of the hacker bar: stacks of server racks, blinking lights, a desk with an old computer terminal, a cut cable hanging from the wall, cardboard boxes, a single desk lamp. Dusty and messy.

**06 `bg_06_basar`**
Black market bazaar under a bridge: stalls with mysterious wares, hanging lanterns, draped cloth, crates with "GESCHÄFT" scribbled, a long counter under a striped awning in the center, a tunnel to a magnetic train station on the right. No vendors.

**07 `bg_07_waschsalon`**
Self-service laundromat "WASCHBÄR": a row of round porthole washing machines, one with glowing red warning light, a fuse box on the wall, a laundry basket with mismatched socks, plastic chairs, a staircase leading up on the right side. Soft teal and pink light.

**08 `bg_08_baeckerei`**
Bakery "ZUM KNUSPRIGEN BYTE": bread shelves, a pixel-art-shaped pretzel sign, an oven glowing orange, a flour-dusted counter, a rack of baguettes, a broken flour sieve on a hook. Cozy yellow light. No baker.

**09 `bg_09_dachgarten`**
Rooftop garden high above the slum: pigeon lofts, wooden crates, antennas, satellite dishes, laundry lines, a view over neon rooftops, a little throne made of crates in the center. Dusk with purple sky.

**10 `bg_10_kanal_eingang`**
Entrance to a sewer beneath the junkyard: concrete tunnel mouth, a heavy round iron manhole cover on the ground (closed), dripping pipes, graffiti, glowing pink slime puddle.

**11 `bg_11_pumpenraum`**
Underground pump room: big pipes and rusty valves, a humming pump machine, a corner with chewed cables and a hole in the wall, a rat nest of trash, eerie cyan lighting.

**12 `bg_12_bahnhof`**
Magnetic train station "SÜD": platform with a floating magnetic train, a ticket machine, a conductor's booth with a barrier, flickering departure board with cryptic symbols, billboard ads. Cool blue tones.

### Akt 2 – Mittel-Heights

**13 `bg_13_plaza`**
Giant corporate plaza between glass skyscrapers, huge holographic ad "NUDELN FÜR ALLE*", a kiosk with a newspaper bench, revolving door of the NoodleCorp tower, a side alley with a keypad door to the cafeteria, a cable car station to the sky on the far right, a police station on the left, a park entrance, a barber shop and a casino with golden entrance. Clean, cold, sterile with bright magenta accents.

**14 `bg_14_lobby`**
Sterile corporate lobby: huge reception desk, a revolving door, potted plastic plants, elevators, security scanner gate, a cheerful but soulless mural. Reception desk empty.

**15 `bg_15_kantine`**
Industrial cafeteria: self-service counters serving gray paste, empty soup kettles, stainless kitchen, a trash bin, a stack of trays, clothes locker with uniforms, a service door.

**16 `bg_16_bueros`**
Open-plan office maze with cubicle walls, stacks of forms, a jammed printer, a hamster cage on a desk, a cubicle with a computer, posters with slogans like "SYNERGIE!", harsh office light.

**17 `bg_17_werbefabrik`**
Hologram advertisement factory: holographic projectors, floating half-finished ads, a big hologram printer machine with a scanner slot, cables everywhere, a sleeping technician's chair. Colorful glowing light.

**18 `bg_18_friseur`**
Robot barber "SCHNIPP & ZAP": chairs with crazy helmet dryers, walls with wild hairstyle posters, a mirror with flashing bulbs, a tool station with a broken scissors arm, a doorway to the casino on the right.

**19 `bg_19_casino`**
Casino "GOLDEN BYTE": glamorous interior with golden slot machines, a roulette table with a steel ball in the center, velvet curtains, a mirror ball, a doorway marked "VAULT" at the back. Gold and magenta.

**20 `bg_20_tresor`**
Casino vault: heavy round vault door, stacks of golden coins, safety deposit boxes, a desk with files, an air vent grate high in the wall. Dim gold and cyan light.

**21 `bg_21_klinik`**
Implant clinic "DR. SCHRAUB": operating chair with robotic arms, shelves of glowing organ implants in jars, a cabinet with instruments, cheerful posters about cyber hearts, a desk with a tray of tools.

**22 `bg_22_park`**
Artificial turf park with plastic trees and a painted blue pond, benches, a small gardener's shed, a hidden garden corner with a secret tiny pot of real plants, a path toward a museum and a clinic.

**23 `bg_23_museum`**
Museum of analog things: display cases with old objects (vinyl records, telephones, a floppy disk), a fountain-like analog water tap in a glass case in the center, "DO NOT TOUCH" stripes, a smoke detector on the ceiling.

**24 `bg_24_revier`**
Police station "REVIER 404" with a lost-and-found counter: shelves with labeled boxes, a counter with a giant rubber stamp, a wanted poster wall, heaps of paperwork, a platinum card behind glass.

**25 `bg_25_gondel`**
Cable car station to the upper city "HIMMELFAHRT": glass gondola cabin, a bouncer podium with a velvet rope, a view of clouds and floating buildings above. Bright gold and sky blue.

### Akt 3 – Ober-Heights & Orbit

**26 `bg_26_promenade`**
Floating upper-city promenade in the clouds: luxury shops, champagne fountain, floating villas, golden lamps, a path to a spa and a spaceport, a villa gate. Sunset gold and pink.

**27 `bg_27_villa`**
Grand hall of Villa von Chrom: marble, golden statues, a collection of "originals", a huge chandelier, an empty golf club stand, a throne-like armchair.

**28 `bg_28_spa_golfdome`**
Sky spa with massage beds on the left, steam and pools; a glass golf dome on the right with an artificial hill and a large wind turbine in the center. Control panel with switches near the spa side.

**29 `bg_29_raumhafen`**
Spaceport terminal: ticket counter, departure boards, a shuttle docked outside a huge window, a baggage belt, retro-futuristic design, rockets painted in bright colors.

**30 `bg_30_hyperhub`**
Docking ring "HYPER-HUB": orbital station hall with a view of Earth, a sealed door to the moon shuttle with strike signs, benches, souvenir shop, arrows to the garden and bridge.

**31 `bg_31_orbitalgarten`**
Zero-gravity garden: floating plants and leaves, a coffee plant with floating beans, a dome window with stars, tangled vines.

**32 `bg_32_bruecke`**
Command bridge: captain's chair, big star map, sleepy steaming coffee mug, blinking panels, a door panel with a badge scanner at the entrance.

**33 `bg_33_mond_eingang`**
Moon surface with an airlock entrance into a mine, lunar dust, flag, machinery, stars and Earth in the sky. Keypad next to the airlock.

**34 `bg_34_mond_tiefe`**
Deep moon mine: dark tunnels with glowing crystals, rails, a minecart hanging on a crane hook, a wide chasm in the middle, a steel door on the far side.

**35 `bg_35_serverkern`**
Kleo's server core: endless server racks with glowing blue lights, a huge firewall door, bowl-shaped room, pools of neon noodles, cables like tentacles.

**36 `bg_36_kinderzimmer`**
Virtual child's bedroom rendered as a dreamy digital space: toy shelves, floating building blocks, a teddy bear on a little chair, crayon drawings of soup bowls, glitchy edges, pastel colors with a hint of neon.

---

## 2. Figuren-Sheets

Hintergrund immer **einfarbig grün #00FF00**, **keine grünen Farben im Objekt, kein Leuchten/Glow außerhalb der Kontur** (Leuchteffekte baue ich im Spiel nach), jedes Objekt mit **dicker dunkler Kontur**,
**viel Abstand** zwischen den Zellen, **keine Schatten**. So kann ich alles automatisch ausschneiden.

### Sheet-Vorlage (`SHEET`)
```
Sprite sheet on a perfectly flat solid pure green (#00FF00) background. Arrange the cells in a grid of {COLS} columns and {ROWS} rows, reading order left to right, top to bottom. Each item stands fully inside its own cell, centered, with a large empty green gap between all items. Nothing touches or overlaps. Same scale for all items. No cast shadows, no floor, no text. No glow, halo or light bloom outside the outline. Do not use green colors for any item (make metal silver, circuit boards purple or blue, glass clear). Thick dark outline around every item. [STIL]
```

### 2.1 `assets/raw/sheet_pixel.png` – Pixel (6 × 4 = 24 Zellen)
Attach `ref_01`.
```
{SHEET with COLS=6, ROWS=4} The same character PIXEL (see reference) in these poses, full body, side views facing right unless noted:
1 idle front, 2 idle side, 3 idle back, 4 talking (mouth open, gesturing), 5 talking (different mouth and hand), 6 shrug/thinking,
7–12 walk cycle side view, six consecutive frames,
13 walking toward camera frame A, 14 walking toward camera frame B, 15 walking away frame A, 16 walking away frame B, 17 bending down to pick up, 18 reaching up high,
19 using an object (arm forward), 20 handing an object, 21 surprised, 22 cheering, 23 exhausted/slouching, 24 sitting cross-legged.
```

### 2.2 `assets/raw/sheet_pixel_gala.png` – Pixel, Gala-Look (4 × 3 = 12)
Attach `ref_01`.
```
{SHEET with COLS=4, ROWS=3} PIXEL in an absurdly fancy gala outfit: glittering teal tuxedo jacket over her courier pants, bow tie, hair in a dramatic quiff. Poses: 1 idle front, 2 idle side, 3 idle back, 4 talking, 5–10 walk cycle side view six frames, 11 reaching up, 12 using an object.
```

### 2.3 `assets/raw/sheet_pixel_raumanzug.png` – Pixel, Raumanzug (4 × 3 = 12)
```
{SHEET with COLS=4, ROWS=3} PIXEL in an antique retro space suit with a round glass helmet, rivets and a dented chrome finish. Same poses as the gala sheet.
```

### 2.4 `assets/raw/sheet_kruemel.png` – Krümel (6 × 3 = 18)
Attach `ref_02`.
```
{SHEET with COLS=6, ROWS=3} The same flying toaster drone KRÜMEL (see reference): 1–4 hovering side view, propeller animation four frames, 5 hovering front, 6 hovering back, 7 toasting (glowing slots, a toast popping up), 8 toast flying out, 9 scanning (blue beam from eyes), 10 scanning beam wider, 11 sad with empty battery (eyes dim, propeller stopped), 12 charged happy (sparkles), 13 talking frame A, 14 talking frame B, 15 surprised, 16 flying away (motion lines), 17 crawling small (squeezed posture for vents), 18 toast alarm (smoke).
```

---

## 3. NPC-Sheets (je 6 × 4 = 24 Zellen, 3 Sheets)

Jede NPC-Figur hat **zwei Zellen**: Zeile 1–2 = ruhig stehend (3/4-Ansicht nach links), Zeile 3–4 = sprechend/gestikulierend (gleiche Reihenfolge).
Attach `ref_01` und `ref_03` für den Stil.

### 3.1 `assets/raw/sheet_npc_akt1.png`
Reihenfolge (1–12):
1. **Oma Zhang**: tiny 87-year-old woman, huge round glasses, kitchen apron, hair bun with chopsticks.
2. **Rosi**: enormous rusty robot woman, junkyard welder mask pushed up, spare parts as jewelry, crane arm.
3. **Bit**: bar robot with a bucket-shaped head, cocktail shaker in hand, loading bar on the chest.
4. **Hehler-Hugo**: four-armed creature in a trench coat full of pockets, wide-brim hat, sly smile.
5. **Kurt**: pigeon boss with a gold chain and monocle, tiny cigar holder, puffed chest.
6. **Brezel**: round bakery robot shaped like a pretzel, flour dusting, chef hat.
7. **Schaffner 4711**: boxy train conductor robot with whistle, cap, giant stamp in one hand.
8. **Bello-5000**: robot dog with a wagging antenna tail, ball-shaped eyes.
9. **Wuschel (defekt)**: small round vacuum robot, dented, sparks, one wheel missing.
10. **Wuschel (repariert)**: the same vacuum robot repaired and happy.
11. **Ratten-Trupp**: three rats with protest signs and tiny hard hats.
12. **Katze Schrödinger**: a cat, looks smug, half transparent glow.

### 3.2 `assets/raw/sheet_npc_akt2.png`
1. **Frau Ablage**: stern receptionist robot with a filing cabinet body, glasses on a chain.
2. **Chef Kloß**: desperate chubby cook robot with a dumpling-shaped head, ladle.
3. **Grünhorn**: gardener robot made of garden tools and a watering can, leaf on the head.
4. **Prof. Staub**: curator robot in a dusty tailcoat with magnifying glass eye.
5. **Schnipp**: barber robot with scissor hands, wild electrified hair, striped coat.
6. **Madame Jackpot**: elegant woman with a roulette-wheel hat, gold gown, cold smile.
7. **Mortimer**: casino doorman, tall velvet-suited robot, red rope in hand.
8. **Dr. Schraub**: nervous thin doctor with big round glasses, white coat, trembling hands.
9. **Stempel-Stefan**: stout official with oversized stamp and ink-stained fingers.
10. **Kiosk-Zeus**: newspaper vendor robot with a roll-up screen body and a hat full of headlines.
11. **Flimmer**: sleepy hologram technician, headphones around the neck, sleeping pose.
12. **Mr. Tackert**: hamster in a running wheel, tiny tie.

### 3.3 `assets/raw/sheet_npc_akt3.png`
1. **Türsteher Klaus**: bulky bouncer robot in a velvet jacket, earpiece.
2. **Sebastian.exe**: tall perfectionist butler robot with a monocle lens and white gloves.
3. **Baron von Chrom**: pompous chrome-plated man with a huge moustache, cane, fur collar.
4. **Masseur Zen-3**: calm multi-armed massage robot in a bathrobe.
5. **Flug-Hans**: cheerful ticket clerk robot with a pilot cap.
6. **Käpt'n Kabel**: tired captain with cable hair and dark circles, holding an empty mug.
7. **Schicht**: union leader robot with hard hat, megaphone, protest vest.
8. **Streikposten**: generic mining robot with strike sign.
9. **Ramen-Kraken**: giant noodle octopus with sad eyes, broth puddle.
10. **Kleo**: 12-year-old girl hologram with pigtails, headphones, NoodleCorp hoodie, glowing edges.
11. **Teddy-Bot**: worn plush teddy robot with a socket instead of a mouth.
12. **Teddy-Bot mit Sensor**: same teddy with a glowing tongue-sensor plugged in.

---

## 4. Item-Sheets

Jeder Gegenstand auf grünem Hintergrund, als **Inventar-Icon**, mit Kontur, leicht übertrieben,
frontal oder leicht von oben. Nimm für jedes Sheet die Vorlage `SHEET`.

### 4.1 `assets/raw/sheet_items_akt1.png` (5 × 4 = 20)
1 altes Foto in Rahmen (Rückseite mit Schrift), 2 Nudelsieb, 3 Essstäbchen (Paar), 4 Sojasoßen-Flasche, 5 Glas mit grauer Paste, 6 leuchtende Neonröhre (Buchstabe), 7 verschlossene Holzkiste mit Warnschild, 8 Kranmagnet an Seil, 9 Sicherung (Keramik), 10 Speicherstick, 11 Glasfaserkabel-Spule, 12 Stick mit Datenlog (leuchtet), 13 Powerbank, 14 Baguette, 15 Knuspertoast, 16 Hackerchip mit „ZN“-Zeichen, 17 Stempel „GÜLTIG“ (Holzgriff), 18 zerknittertes Ticket, 19 gültiges Ticket mit Stempel, 20 Reserve: Schraube.

### 4.2 `assets/raw/sheet_items_akt2.png` (5 × 4 = 20)
1 Zeitung „TAGESKRÜMEL“ gefaltet, 2 Kantinentablett, 3 leere Flasche, 4 Flasche mit Wasser, 5 Kräuterbund, 6 Kamilleblüten, 7 weißer Kittel mit Namensschild, 8 Formular „404-B“, 9 Holo-Siegel (Wappen), 10 Platin-Pass, 11 Skalpell, 12 Geschmacks-Sensor (kleine Zunge aus Chrom), 13 Jackpot-Chip (gold), 14 Akte „KLEO“ mit Kinderzeichnung, 15 Zahnrad, 16 Kabelsalat, 17 Gummibärchen, 18 Kaffeetasse, 19 Glühbirne, 20 Büroklammer.

### 4.3 `assets/raw/sheet_items_akt3.png` (3 × 3 = 9)
1 goldener Golfball, 2 antiker Raumanzug (Helm separat), 3 Shuttle-Ticket, 4 Kaffeebohnen, 5 geröstete Kaffeebohnen, 6 Genehmigung mit Unterschrift und Siegel, 7 Bergbau-Helm mit Lampe, 8 Zettel mit Zugangscode, 9 Geschmacks-Kristall (leuchtet golden, Nudelschale darin eingraviert).

---

## 5. Szenen-Objekte (Props, Entwurf)

Zustandsobjekte, die ich über die Hintergründe lege (auf, zu, leer …). **Diese Sheets generierst du erst,
nachdem ich die Hintergründe gesehen habe**, damit Stil und Maßstab passen. Dann passe ich die Listen an.

Datei: `assets/raw/sheet_props_akt1.png` (5 × 4 = 20) – Entwurf:
1 Kiste geschlossen, 2 Kiste offen, 3 Mülltonne mit Röhre, 4 Mülltonne leer, 5 Kanaldeckel zu, 6 Kanaldeckel geöffnet (Loch), 7 Bilderrahmen mit Foto, 8 Bilderrahmen leer, 9 Terminal aus, 10 Terminal an (Bernstein-Text), 11 Hinterzimmertür zu, 12 Hinterzimmertür offen, 13 Sicherungskasten zu, 14 Sicherungskasten offen (Sicherung glüht), 15 Sicherungskasten leer, 16 Socke, 17 Ratten mit Kabel, 18 Fahrkartenautomat, 19 Bahnschranke zu, 20 Bahnschranke offen.

Datei: `assets/raw/sheet_props_akt2.png` (Entwurf): Kantinentür zu/offen, Tastenfeld, Wasserhahn, Rauchmelder, Kräutertopf trocken/gewachsen, Fahrstuhl zu/offen, Bürodrucker, Holo-Drucker an/aus, Fundbüro-Vitrine zu/offen, Roulette mit Kugel, Tresortür zu/offen, Lüftungsgitter zu/offen, Gondeltür.

Datei: `assets/raw/sheet_props_akt3.png` (Entwurf): Turbine an/aus, Steuerpult, Kaffeepflanze, Bohnen schwebend, Brückenpanel, Schleuse zu/offen, Lore am Haken, Kran, Firewalltür zu/offen.

---

## 6. UI-Sheet

Datei: `assets/raw/sheet_ui.png` (8 × 5 = 40) – grüner Hintergrund.
Zellen: 1 Cursor normal, 2 Cursor Ansehen (Auge), 3 Cursor Benutzen (Hand), 4 Cursor Sprechen, 5 Cursor Gehen, 6 Pfeil links, 7 Pfeil rechts, 8 Pfeil hoch, 9 Pfeil runter, 10 Inventar-Slot leer, 11 Slot markiert, 12 Inventar-Pfeil links, 13 Inventar-Pfeil rechts, 14 Menü-Button, 15 Karten-Button, 16 Hilfe-Button (Glühbirne), 17 Krümel-Button, 18 Kartenpin besucht, 19 Kartenpin aktuell, 20 Kartenpin gesperrt, 21 Schieberegler-Leiste, 22 Schieberegler-Knopf, 23 Haken (an), 24 Haken (aus), 25–28 Buttonrahmen (normal, hover, gedrückt, gesperrt), 29 Dialogwahl-Rahmen, 30 Speicher-Slot-Rahmen, 31–40 Tab-Icons (Ebene 1, 2, 3, Grafik, Sound, Text, Speichern, Laden, Spiel beenden, Zurück).
Stil: dunkler Metallrahmen mit Neon-Kanten, leicht verspielt.

---

## 7. Karten (3 Bilder)

Keine Beschriftungen auf der Karte. Die Ortspunkte setze ich später per Koordinaten. Alle Orte sollen deutlich getrennt erkennbar sein.

### `assets/raw/map_unterstadt.png`
```
Illustrated top-down fantasy-style city map of a cyberpunk slum district, 16:9, parchment-meets-neon look, 12 distinct small illustrated buildings and places clearly separated by streets and canals: a noodle shop, a main alley in the center, a junkyard, a bar, a back room, a bazaar, a laundromat with stairs to a rooftop garden, a bakery, a sewer entrance and a pump room beneath, a magnetic train station. Compass rose, decorative border. [STIL]
```

### `assets/raw/map_mittelstadt.png`
```
Illustrated top-down map of a corporate city district, 16:9, sleek with neon accents, 13 distinct places separated clearly: a large central plaza, a corporate tower lobby, a cafeteria, an office floor, a hologram ad factory, a barber, a casino, a vault below it, a clinic, an artificial park, a museum, a police station, a cable car station. [STIL]
```

### `assets/raw/map_oberstadt_orbit.png`
```
Illustrated map of a floating upper city and orbit, 16:9: floating promenade, a villa, a spa with golf dome, a spaceport, an orbital space station with a garden and a bridge, the moon with a mine entrance, deep mine, server core and a dream room. Clouds, stars, a cosmic border. [STIL]
```

---

## 8. Intro, Titel, Ende

Format 16:9, Text **nicht** im Bild (kommt aus dem Spiel). `[STIL]` anhängen.

| Datei | Prompt |
|---|---|
| `assets/raw/intro_01.png` | Night skyline of a three-level cyberpunk megacity, neon glow, rain, floating lights, a huge noodle bowl sign on a tower. |
| `assets/raw/intro_02.png` | Pixel on a hoverboard with Krümel flying beside her between skyscrapers, delivery backpack, dynamic angle. |
| `assets/raw/intro_03.png` | A street soup vending machine pouring gray paste into a customer's bowl, sad faces in the queue. |
| `assets/raw/intro_04.png` | City riot of robots and people with angry signs around dead soup dispensers, comic chaos, no violence. |
| `assets/raw/intro_05.png` | Inside a noodle shop: tiny grandmother in front of an open empty wall safe, worried. |
| `assets/raw/intro_06.png` | Close-up of a soy sauce footprint with a faint corporate logo, Krümel scanning it with a blue beam. |
| `assets/raw/intro_07.png` | Silhouette of a small child figure holding a soup spoon, high on a glowing tower, looking at the city. |
| `assets/raw/titel.png` | Title screen artwork: Pixel and Krümel in front of a huge neon noodle bowl over the skyline, with the title "NEON NOODLE" in chunky neon letters. |
| `assets/raw/ende_01.png` | Kleo as a hologram girl holding the teddy robot, tasting a spoon of soup with a huge happy face. |
| `assets/raw/ende_02.png` | The whole city celebrating, soup vending machines pouring glowing golden broth, confetti. |
| `assets/raw/ende_03.png` | Cozy final scene in the noodle shop: Oma, Pixel, Krümel, Kleo with Teddy-Bot around the counter sharing bowls. |

---

## 9. Zustands-Varianten per Bearbeitungs-Prompt (Bearbeitung eines bestehenden Bildes)

Wenn sich ein Hintergrund wirklich verändern muss (nicht nur ein Objekt), lade das Original hoch und nutze:

```
Keep this image exactly as it is (same composition, colors, style, lighting). Change only: {ÄNDERUNG}.
```

Beispiele:
- `bg_01`: „remove the family photo from the frame on the wall, leave the empty frame.“
- `bg_11`: „remove the rats and the cable from the floor.“
- `bg_15`: „the service door is now open.“

Variante speichern als `bg_NN_name_b.png`.

---

## 10. Checkliste

- [ ] Schritt 0: 3 Referenzbilder
- [ ] Testlauf: 1 Hintergrund + 1 Sheet. Zeig mir beides, bevor du den Rest generierst.
- [ ] 36 Hintergründe
- [ ] Pixel-Sheets (3), Krümel-Sheet (1)
- [ ] NPC-Sheets (3)
- [ ] Item-Sheets (3)
- [ ] UI-Sheet (1)
- [ ] Karten (3)
- [ ] Intro (7) + Titel (1) + Ende (3)
- [ ] Prop-Sheets (3), nach Sichtung der Hintergründe
