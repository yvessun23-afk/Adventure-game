# Assets: Wohin mit welcher Datei?

## Dein Teil: alles Originale nach `assets/raw/`

Speichere **jede** Datei, die du mit Nano Banana Pro erzeugst, unverändert in `assets/raw/`,
mit genau diesen Namen (siehe `docs/image-prompts.md`):

| Dateiname | Inhalt |
|---|---|
| `ref_01_pixel_turnaround.png`, `ref_02_kruemel.png`, `ref_03_stil_nudelgasse.png` | Referenzbilder |
| `bg_01_zhangs_imbiss.png` … `bg_36_kinderzimmer.png` | 36 Hintergründe (16:9) |
| `bg_NN_name_b.png` | Zustandsvarianten (optional) |
| `sheet_pixel.png`, `sheet_pixel_gala.png`, `sheet_pixel_raumanzug.png`, `sheet_kruemel.png` | Figuren |
| `sheet_npc_akt1.png`, `sheet_npc_akt2.png`, `sheet_npc_akt3.png` | NPCs |
| `sheet_items_akt1.png`, `sheet_items_akt2.png`, `sheet_items_akt3.png` | Gegenstände |
| `sheet_props_akt1.png` … `akt3.png` | Szenen-Objekte (erst nach den Hintergründen) |
| `sheet_ui.png` | Bedienelemente |
| `map_unterstadt.png`, `map_mittelstadt.png`, `map_oberstadt_orbit.png` | Karten |
| `intro_01.png` … `intro_07.png`, `titel.png`, `ende_01.png` … `ende_03.png` | Intro, Titel, Ende |

## Mein Teil: daraus entsteht alles andere (nicht von Hand anfassen)

| Ordner | Wird erzeugt aus | Werkzeug |
|---|---|---|
| `assets/backgrounds/{hi,mid,low}/` | `bg_*.png` (WebP in 3 Qualitätsstufen) | `tools/make_tiers.py` |
| `assets/sprites/characters/` | `sheet_pixel*.png`, `sheet_kruemel.png` | `tools/slice_sheet.py` |
| `assets/sprites/npcs/` | `sheet_npc_*.png` | `tools/slice_sheet.py` |
| `assets/sprites/items/` | `sheet_items_*.png` | `tools/slice_sheet.py` |
| `assets/sprites/props/` | `sheet_props_*.png` | `tools/slice_sheet.py` |
| `assets/sprites/ui/` | `sheet_ui.png` | `tools/slice_sheet.py` |
| `assets/map/`, `assets/intro/` | `map_*`, `intro_*`, `titel`, `ende_*` | Kopie + Optimierung |

## Audio und Schriften

- Musik: `assets/audio/music/` (Dateinamen siehe `docs/audio.md`)
- Soundeffekte: `assets/audio/sfx/`
- Schriftarten: `assets/fonts/`
- Quellen und Lizenzen in `assets/audio/CREDITS.md` eintragen.

## Wie lade ich Dateien ins Repo?

Im GitHub-Webinterface: Ordner öffnen → **Add file → Upload files**, oder lokal mit `git add` und `git push`.
Hinweis: Große Bilder belasten das Repo. Lege nur das ab, was du wirklich verwendest.
Die Originale sind am größten. Wenn es zu viel wird, nutzen wir Git LFS.
