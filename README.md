# NEON NOODLE – Der Fall der verschwundenen Nudelsuppe

Ein 2D-Point-and-Click-Adventure im Browser (HTML/JavaScript), inspiriert von *Day of the Tentacle* und *Monkey Island*.
Cyberpunk, lustig, mit 36 Orten, Karte mit Schnellreise, Intro, Speichern/Laden, Hilfesystem und Optionen für Grafik, Sound und Text.

**Status:** Planungsphase. Design, Bild-Prompts und Werkzeuge sind fertig, die Engine folgt.

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
