# Neon Noodle 3 (Probeversion)

Spielbar unter `…/Adventure-game/v3/`. Version 1 (Hauptordner) und Version 2 (`v2/`) bleiben unverändert.

Unterschied zu Version 2: **alle Figuren sind 3D-Figuren** – Pixel (drei Outfits), Krümel, Oma und alle 33 weiteren NPCs (zu 2D-Bildern gerendert, dünne dunkle Kontur wie bei Pixel). Hintergründe, Musik, Schriften, Gegenstände und Requisiten kommen aus dem Hauptordner (`../assets`). Eigene Bilder liegen in `v3/assets/sprites/`.

NPCs, deren Modell nur eine Pose hat, haben keine eigenen Aktionsbilder (a/b); die Engine lässt sie atmen und wippen. Animierte Modelle (Baron, Bit, Hugo, Jackpot, Kabel, Rosi, Schnipp, Kleo, Teddy, Oma) zeigen Ruhe-, Sprech- und Aktionsposen.

Neu bauen: `python3 tools/render3d/build_v2_fbx.py` (Pixel/Gala/Raumanzug, in `v2/`), `python3 tools/render3d/build_v3_npcs.py` (alle NPCs, kopiert auch die V2-Sprites) und `python3 tools/make_v2.py v3`.
