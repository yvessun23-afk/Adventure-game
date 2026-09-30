// Karten: pro Ebene ein Bild. Orte erscheinen erst nach dem ersten Besuch.
// x/y in Prozent (0-1) der Kartenfläche (Position der Pin-Spitze).
window.NN = window.NN || {};

NN.map = {
  levels: [
    { id: 'unter', name: 'Unter-Heights', img: ['assets/map/map_unterstadt.webp', 'assets/raw/map_unterstadt.png'] },
    { id: 'mittel', name: 'Mittel-Heights', img: ['assets/map/map_mittelstadt.webp', 'assets/raw/map_mittelstadt.png'] },
    { id: 'ober', name: 'Ober-Heights & Orbit', img: ['assets/map/map_oberstadt_orbit.webp', 'assets/raw/map_oberstadt_orbit.png'] }
  ],
  locations: [
    { scene: 'imbiss', level: 'unter', name: 'Zhangs Ramen-Imbiss', x: 0.16, y: 0.55 },
    { scene: 'nudelgasse', level: 'unter', name: 'Nudelgasse', x: 0.44, y: 0.58 },
    { scene: 'schrottplatz', level: 'unter', name: 'Schrottplatz', x: 0.24, y: 0.80 },
    { scene: 'bar', level: 'unter', name: 'Bar „Null Pointer“', x: 0.58, y: 0.52 },
    { scene: 'bar_hinterzimmer', level: 'unter', name: 'Bar-Hinterzimmer', x: 0.69, y: 0.60 },
    { scene: 'basar', level: 'unter', name: 'Schwarzer Basar', x: 0.73, y: 0.40 },
    { scene: 'waschsalon', level: 'unter', name: 'Waschsalon „Waschbär“', x: 0.21, y: 0.31 },
    { scene: 'baeckerei', level: 'unter', name: 'Bäckerei', x: 0.79, y: 0.65 },
    { scene: 'dachgarten', level: 'unter', name: 'Tauben-Dachgarten', x: 0.38, y: 0.21 },
    { scene: 'kanal_eingang', level: 'unter', name: 'Kanal-Eingang', x: 0.50, y: 0.76 },
    { scene: 'pumpenraum', level: 'unter', name: 'Pumpenraum', x: 0.65, y: 0.90 },
    { scene: 'bahnhof', level: 'unter', name: 'Magnetbahn-Station Süd', x: 0.89, y: 0.47 }
  ]
};
