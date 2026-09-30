// Karten: pro Ebene ein Bild. Orte erscheinen erst nach dem ersten Besuch.
// x/y in Prozent (0-1) der Kartenfläche. Werden später an die echten Kartenbilder angepasst.
window.NN = window.NN || {};

NN.map = {
  levels: [
    { id: 'unter', name: 'Unter-Heights', img: ['assets/map/map_unterstadt.png', 'assets/raw/map_unterstadt.png'] },
    { id: 'mittel', name: 'Mittel-Heights', img: ['assets/map/map_mittelstadt.png', 'assets/raw/map_mittelstadt.png'] },
    { id: 'ober', name: 'Ober-Heights & Orbit', img: ['assets/map/map_oberstadt_orbit.png', 'assets/raw/map_oberstadt_orbit.png'] }
  ],
  locations: [
    { scene: 'imbiss', level: 'unter', name: 'Zhangs Ramen-Imbiss', x: 0.30, y: 0.62 },
    { scene: 'nudelgasse', level: 'unter', name: 'Nudelgasse', x: 0.48, y: 0.50 }
  ]
};
