# Audio: Musik und Soundeffekte

Ich kann keine Audiodateien erzeugen. Du lädst sie herunter oder erzeugst sie selbst und legst sie ab.
Format: `.ogg` oder `.mp3`. Lege die Originale in `assets/audio/music` bzw. `assets/audio/sfx`.
Ich kann sie danach mit ffmpeg normalisieren und zuschneiden (Lautstärke angleichen, Loops kürzen).

**Lizenz beachten:** Notiere bei jeder Datei Quelle und Lizenz in `assets/audio/CREDITS.md`.

## Mögliche Quellen

| Quelle | Inhalt | Hinweis |
|---|---|---|
| kenney.nl (Audio-Pakete) | UI-Klicks, Sci-Fi-Effekte | meist CC0 (keine Namensnennung nötig) |
| opengameart.org | Musik und SFX | Lizenz je Datei prüfen |
| freesound.org | Einzelne Effekte | Filter auf CC0 setzen |
| incompetech.com | Musik (Kevin MacLeod) | CC-BY: Namensnennung nötig |
| pixabay.com | Musik und SFX | eigene Pixabay-Lizenz, Bedingungen prüfen |
| KI-Musik (z. B. Suno, Udio) | Eigene Stücke nach Prompt | Lizenzbedingungen deines Tarifs prüfen |

## Musik (Dateiname, Stimmung)

| Datei | Verwendung | Stimmung |
|---|---|---|
| `mus_titel.ogg` | Titelmenü, Intro | Synthwave, geheimnisvoll, verspielt |
| `mus_imbiss.ogg` | Zhangs Imbiss | warme Retro-Synths, asiatisch angehaucht |
| `mus_unterstadt.ogg` | Nudelgasse, Basar, Waschsalon | dreckiger Groove, Bass, Neon |
| `mus_kanal.ogg` | Kanal, Pumpenraum | düster-komisch, tropfend |
| `mus_bar.ogg` | Null Pointer | Lo-Fi, Chillhop, Glitches |
| `mus_dach.ogg` | Dachgarten | leicht, Flötenklänge, Tauben-Gurren |
| `mus_bahn.ogg` | Bahnstation, Fahrt | rhythmisch, Bewegung |
| `mus_mittelstadt.ogg` | Plaza, Park, Revier | Bürofunk, Fahrstuhlmusik-Parodie |
| `mus_konzern.ogg` | Lobby, Büros, Werbefabrik | sterile Synths, Bürokratie |
| `mus_casino.ogg` | Casino, Friseur | Jazz-Synth, Glamour |
| `mus_klinik.ogg` | Klinik, Museum | kauzig, Pizzicato |
| `mus_oberstadt.ogg` | Promenade, Villa, Spa | Champagner-Lounge, schwebend |
| `mus_raumhafen.ogg` | Raumhafen, Hyper-Hub | Fanfaren, Weltraumabenteuer |
| `mus_orbit.ogg` | Garten, Brücke | ruhig, schwerelos |
| `mus_mond.ogg` | Mondmine | unheimlich, verspielt-mysteriös |
| `mus_kleo.ogg` | Serverkern, Kinderzimmer | Spieluhr trifft Synth, traurig-süß |
| `mus_finale.ogg` | Finale, Epilog | warm, hoffnungsvoll |
| `mus_abspann.ogg` | Abspann | das Titelthema, ausgelassen |

Jede Musikdatei sollte **nahtlos loopen** (30–90 s).

## Soundeffekte (Auswahl)

- **UI:** Klick, Hover, Menü öffnen/schließen, Slider, Speichern, Laden, Inventar rein/raus, Hilfe-Ping.
- **Figuren:** Schritte (Metall, Beton, Wasser, Teppich, Gras), Text-Blips (je Figur unterschiedliche Tonhöhe), Aufheben, Geben.
- **Krümel:** Propeller, Toasten (Toast springt hoch), Scan, Akku leer, Akku laden, Lüftungsschacht.
- **Szenen:** Neon-Summen, Regen, Automaten-Brummen, Tauben, Wasser tropft, Waschmaschine, Casino-Roulette, Kaffee, Turbine, Schleuse, Shuttle-Start, Lore-Quietschen, Kraken-Gurgeln.
- **Story:** Kanaldeckel, Kiste öffnen, Katze faucht, Ratten quieken, Terminal-Tippen, Bit friert ein, Stempel, Fahrstuhl, Alarm, Rauchmelder, Teddy-Bot-Mund klickt, Kleo schmeckt (Kinderstimme „Bäh!“ optional).

Keine Sprachausgabe geplant. Text wird mit Blips vertont.

## Schriftarten (für Optionen)

Lege freie Schriftarten in `assets/fonts/`:
- Comic-Stil: z. B. „Bangers“ oder „Patrick Hand“ (Google Fonts, SIL OFL).
- Gut lesbar: „Atkinson Hyperlegible“ (SIL OFL).
- Dyslexie-freundlich: „OpenDyslexic“ (SIL OFL).
