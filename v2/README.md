# Neon Noodle 2 (Probeversion)

Spielbar unter `…/Adventure-game/v2/`. Version 1 (Hauptordner) bleibt unverändert.

Unterschied zu Version 1: **Pixel, Oma und Krümel sind 3D-Figuren** (zu 2D-Bildern gerendert, `tools/render3d/`). Alles andere (Hintergründe, Musik, Schriften, übrige Figuren, Gegenstände) wird aus dem Hauptordner geladen (`../assets`). Eigene Bilder liegen in `v2/assets/sprites/`.

Neu bauen: `python3 tools/render3d/build_v2_sprites.py` (rendert die Sprites aus den entpackten Modellen) und danach `python3 tools/make_v2.py` (kopiert Engine und Daten aus dem Hauptordner nach `v2/` und richtet die Pfade ein).
