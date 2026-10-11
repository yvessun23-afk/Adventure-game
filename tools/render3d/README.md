# 3D → 2D Renderer (Neon Noodle 2)

Rendert die gepackten Modelle (`char_*.js` aus den ZIP-Dateien in `assets/`) zu 2D-Bildern (PNG mit Alpha) für Version 2.
`render.html` ist ein eigener kleiner WebGL2-Renderer (GPU-Skinning, Toon-Licht, dunkle Kontur). Er wird mit Playwright/Chromium
(SwiftShader) gesteuert: `R.render(name, {clip, t, yaw, size})`. Yaw +90 = blickt nach links im Bild, -90 = nach rechts, 0 = zur Kamera.
Die entpackten Modelle gehören **nicht** ins Repository (80 MB), nur die gerenderten Sprites.
