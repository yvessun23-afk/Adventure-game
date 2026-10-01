# NEON NOODLE – Der Fall der verschwundenen Nudelsuppe

Ein 2D-Point-and-Click-Adventure im Browser (HTML/JavaScript), inspiriert von *Day of the Tentacle* und *Monkey Island*.
Cyberpunk, lustig, mit 36 Orten, Karte mit Schnellreise, Intro, Speichern/Laden, Hilfesystem und Optionen für Grafik, Sound und Text.

**Status:** Das Spiel ist komplett spielbar: 3 Akte, 36 Orte, Intro, Finale mit Abspann. Alle Rätsel von Akt 1 bis 3 sind eingebaut und per Testlauf bis zum Ende durchgespielt. Menüs, Optionen, Speichern/Laden, Karte mit Schnellreise, dreistufige Hilfe und Grafik-Menü laufen.

## Spielen

- **Lokal:** `index.html` im Browser öffnen (Doppelklick genügt, Chrome empfohlen). Alternativ: `python3 -m http.server 8000` im Projektordner und `http://localhost:8000` öffnen.
- **Online:** GitHub Pages für diesen Branch aktivieren (Settings → Pages), dann ist das Spiel per Link erreichbar.
- **Bedienung:** Linksklick = gehen/benutzen/sprechen, Rechtsklick = ansehen, Leertaste = Hotspots zeigen, Esc = Menü, M = Karte, H = Hilfe, F2 = Editor-Modus (Laufflächen/Hotspots einzeichnen).
- **Krümel:** Button unten links anklicken und dann auf einen Hotspot klicken, um ihn einzusetzen. Gegenstände: anklicken und dann auf einen Hotspot oder einen anderen Gegenstand klicken.

## Dokumente

| Datei | Inhalt |
|---|---|
| [`docs/story.md`](docs/story.md) | Story, Figuren, 36 Orte, Gegenstände, kompletter Rätselgraph |
| [`docs/image-prompts.md`](docs/image-prompts.md) | Alle Prompts für die Bild-KI, Sheet-Layouts, Dateinamen |
| [`docs/engine-spec.md`](docs/engine-spec.md) | Technik, Optionen, Speichern, Karte, Hilfe, Meilensteine |
| [`docs/audio.md`](docs/audio.md) | Musik- und Effektliste, Quellen, Schriftarten |
| [`assets/README.md`](assets/README.md) | Wohin welche Datei gehört |

## Werkzeuge

```bash
pip install -r tools/requirements.txt
python3 tools/make_tiers.py                       # Hintergründe in 3 Qualitätsstufen
python3 tools/slice_sheet.py <sheet.png> <ausgabeordner> --cols 5 --rows 4 --names <namen.txt>
```

## Nächste Schritte

1. Stil-Referenzbilder und je einen Test-Hintergrund und ein Test-Sheet erzeugen, in `assets/raw/` ablegen.
2. Engine-Kern mit Platzhalter-Grafik bauen (M1 in `docs/engine-spec.md`).
3. Grafiken einbinden, Hotspots und Laufflächen einzeichnen.

## Ordner im Überblick

| Ordner | Inhalt |
|---|---|
| `index.html`, `src/` | Spiel-Engine (Szenen, Laufen, Dialoge, Inventar, Menüs, Audio) |
| `data/` | Spieldaten: Szenen (`scenes*.js`), Gegenstände, Hilfetexte, Karte, Intro |
| `assets/` | Bilder und Sprites (Originale in `assets/raw`, daraus erzeugt: `backgrounds`, `sprites`, `intro`, `map`) |
| `tools/` | Werkzeuge: Sheets ausschneiden, Hintergründe optimieren, Prompt-Dateien erzeugen |
| `docs/` | Story, Rätselgraph, Bild-Prompts, Spezifikation |

## Online stellen (GitHub Pages)

Im Repository unter *Settings → Pages* den Branch auswählen und den Ordner `/ (root)` wählen. Das Spiel läuft danach unter der angezeigten Adresse. Es braucht keinen Build und keinen Server.

## Tipps

- **F2** schaltet den Editor-Modus ein: Laufflächen (grün), Hotspots (pink) und Ausgänge (blau) werden angezeigt, per Klick kann man Punkte setzen und mit Enter kopieren.
- Fehlende Musikdateien sind kein Problem: Die Musik wird im Browser erzeugt. Legst du Dateien in `assets/audio/music/` ab (z. B. `mus_imbiss.ogg`), werden sie stattdessen gespielt.
