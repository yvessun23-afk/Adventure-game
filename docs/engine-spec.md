# Engine-Spezifikation

Reines **HTML + JavaScript (ES-Module) + Canvas 2D**. Kein Build-Schritt, kein Framework.
Läuft direkt im Browser und auf GitHub Pages (`index.html` im Repo-Root).

## 1. Projektstruktur

```
index.html
src/            Engine (Szenen, Inventar, Dialoge, Karte, Speichern, Optionen, Editor)
data/           Spieldaten als JSON: locations, items, puzzles, dialogs, hints, audio
assets/         Bilder und Audio (siehe assets/README.md)
tools/          Python-Werkzeuge (Sheets schneiden, Bilder optimieren, Validator)
docs/           Story, Prompts, Spezifikation
```

## 2. Spielmechanik

- 16:9-Bühne (1920×1080 logisch), skaliert mit Letterbox, Touch und Maus.
- Linksklick: gehen/benutzen/sprechen. Rechtsklick (Touch: lang drücken): ansehen.
- Inventar unten, Gegenstände per Ziehen kombinieren oder auf Hotspots ziehen.
- **Krümel-Button:** Scannen, Toasten, Schicken (Lüftungsschächte). Kontextabhängig.
- Laufwege: pro Szene ein Begehbarkeits-Polygon, Figurengröße skaliert mit der Tiefe.
- Hotspots: Polygone mit Blickrichtung, Ansehen-Text, Aktion, Bedingung (Flags).
- Dialoge: Auswahlbaum, Text über dem Kopf wie in *Day of the Tentacle*, per Klick überspringbar.
- Cutscenes: Skript aus Schritten (gehe, sprich, warte, blende, setze Flag).

## 3. Karte und Schnellreise

- Pro Ebene eine Karte (Unter-, Mittel-, Ober-Heights & Orbit), umschaltbar per Tabs.
- Jeder Ort ist anfangs **verdeckt** (Nebel). Beim ersten Besuch wird er aufgedeckt und erhält einen Marker.
- **Schnellreise** ab Rätsel A1.14. Davor ist die Karte nur eine Übersicht.
- Nebel wird zur Laufzeit per Canvas erzeugt (kein Extra-Bild nötig).
- Ein Ort bleibt gesperrt, wenn sein Zugang noch nicht freigeschaltet ist.

## 4. Speichern und Laden

- **10 Slots** + Autosave, in `localStorage`. Anzeige mit Datum, Ort, Spielzeit und Vorschaubild.
- **Export/Import** als Datei (`.neonsave`, JSON), damit Spielstände nicht verloren gehen.
- Gespeichert werden: Flags, Inventar, aktueller Ort, Position, Besuche, Optionen getrennt davon.
- Versionsfeld im Spielstand für spätere Updates.

## 5. Hilfe-System

- Button **„Hilfe“** (Glühbirne). Die Engine ermittelt anhand der Flags das aktuell sinnvollste offene Rätsel.
- Drei Stufen, jede nur auf Klick: **1 Hinweis** (wo?), **2 Ansatz** (was?), **3 Lösung** (Schritt für Schritt).
- Zusätzlich: **Hotspots hervorheben** (Leertaste/Button) und **Komplettlösung** im Menü (nur entdeckte Schritte).
- Daten: `data/hints.json`, pro Rätsel-ID aus `docs/story.md`.

## 6. Optionen

**Grafik**
- Qualität: Hoch (1920 px) / Mittel (1280) / Niedrig (960), lädt die passenden Hintergründe aus `assets/backgrounds/{hi,mid,low}`.
- Vollbild, Bildskalierung (Anpassen / Pixelgenau).
- Bildglättung an/aus.
- Filter: keiner, Neon-Glühen, leichter CRT/Scanlines.
- Bildrate 30 / 60, Animationen reduzieren (für Bewegungsempfindliche), Hotspot-Hinweise an/aus.
- Hoher Kontrast für Cursor und Hotspots.

**Sound**
- Master, Musik, Effekte, Text-Blips (Sprechgeräusche): je ein Regler.
- Stumm bei Tab-Wechsel, Audio komplett aus.

**Text**
- Sprache: Deutsch (vorbereitet für weitere).
- Textgröße: Klein / Mittel / Groß / Sehr groß.
- Schriftart: Comic (Stil) / Gut lesbar / Dyslexie-freundlich.
- Untertitel und Sprecherfarben an/aus, Textgeschwindigkeit, automatisches Weiterklicken.
- Deckkraft des Textbox-Hintergrunds.

Optionen werden getrennt vom Spielstand gespeichert.

## 7. Datenformat (Auszug)

`data/locations.json`
```json
{ "id": "02", "name": "Nudelgasse", "act": 1, "bg": "bg_02_nudelgasse",
  "walk": [[100,900],[1800,900],[1700,700],[200,700]],
  "hotspots": [{ "id":"muelltonne", "poly":[[...]], "look":"…", "on_use":[…], "if":"…" }],
  "exits": [{ "to":"01", "poly":[[...]], "spawn":[300,880] }] }
```
`data/puzzles.json` enthält Bedingungen (`requires`) und Effekte (`gives`, `set_flag`) aus `docs/story.md`.

## 8. Werkzeuge

| Tool | Zweck |
|---|---|
| `tools/slice_sheet.py` | Schneidet Sprite-Sheets auf grünem Hintergrund automatisch aus, Atlas-JSON |
| `tools/make_tiers.py` | Hintergründe in drei Qualitätsstufen als WebP umwandeln |
| `tools/validate_puzzles.py` (geplant) | Prüft per Durchspielen der Rätselgraph-Daten, ob das Spiel lösbar ist und keine Sackgassen existieren |
| **Editor-Modus** im Spiel (Taste F2) | Polygone für Laufflächen/Hotspots klicken, Koordinaten kopieren, Hintergründe prüfen |

## 9. Meilensteine

1. **M0** Design-Dokumente, Ordner und Werkzeuge (**jetzt**).
2. **M1** Engine-Kern mit Platzhalter-Grafik (spielbar ohne fertige Bilder).
3. **M2** Intro, Akt 1 komplett in Daten, Speichern/Laden, Optionen, Karte.
4. **M3** Echte Grafiken einbinden (Hintergründe, Sprites), Hotspots und Laufflächen einzeichnen.
5. **M4** Akt 2.
6. **M5** Akt 3 und Finale.
7. **M6** Musik, Soundeffekte, Feinschliff, Hilfe-Texte, Lösbarkeits-Test.
