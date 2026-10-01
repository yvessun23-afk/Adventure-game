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
    { scene: 'imbiss', level: 'unter', name: 'Zhangs Ramen-Imbiss', x: 0.16, y: 0.56, short: 'Imbiss' },
    { scene: 'nudelgasse', level: 'unter', name: 'Nudelgasse', x: 0.44, y: 0.57, short: 'Nudelgasse' },
    { scene: 'schrottplatz', level: 'unter', name: 'Schrottplatz', x: 0.24, y: 0.82, short: 'Schrottplatz' },
    { scene: 'bar', level: 'unter', name: 'Bar „Null Pointer“', x: 0.58, y: 0.50, short: 'Bar' },
    { scene: 'bar_hinterzimmer', level: 'unter', name: 'Bar-Hinterzimmer', x: 0.69, y: 0.60, short: 'Hinterzimmer' },
    { scene: 'basar', level: 'unter', name: 'Schwarzer Basar', x: 0.73, y: 0.38, short: 'Basar' },
    { scene: 'waschsalon', level: 'unter', name: 'Waschsalon „Waschbär“', x: 0.21, y: 0.30, short: 'Waschsalon' },
    { scene: 'baeckerei', level: 'unter', name: 'Bäckerei', x: 0.79, y: 0.62, short: 'Bäckerei' },
    { scene: 'dachgarten', level: 'unter', name: 'Tauben-Dachgarten', x: 0.38, y: 0.22, short: 'Dachgarten' },
    { scene: 'kanal_eingang', level: 'unter', name: 'Kanal-Eingang', x: 0.50, y: 0.76, short: 'Kanal' },
    { scene: 'pumpenraum', level: 'unter', name: 'Pumpenraum', x: 0.65, y: 0.90, short: 'Pumpen' },
    { scene: 'bahnhof', level: 'unter', name: 'Magnetbahn-Station Süd', x: 0.89, y: 0.45, short: 'Bahnhof' },

    { scene: 'plaza', level: 'mittel', name: 'Megablock-Plaza', x: 0.49, y: 0.58, short: 'Plaza' },
    { scene: 'lobby', level: 'mittel', name: 'NoodleCorp-Lobby', x: 0.60, y: 0.33, short: 'Lobby' },
    { scene: 'kantine', level: 'mittel', name: 'Konzern-Kantine', x: 0.39, y: 0.31, short: 'Kantine' },
    { scene: 'bueros', level: 'mittel', name: 'Großraumbüro', x: 0.72, y: 0.38, short: 'Büros' },
    { scene: 'werbefabrik', level: 'mittel', name: 'Hologramm-Werbefabrik', x: 0.20, y: 0.30, short: 'Werbefabrik' },
    { scene: 'friseur', level: 'mittel', name: 'Friseur „Schnipp & Zap“', x: 0.68, y: 0.58, short: 'Friseur' },
    { scene: 'casino', level: 'mittel', name: 'Casino „Golden Byte“', x: 0.25, y: 0.80, short: 'Casino' },
    { scene: 'tresor', level: 'mittel', name: 'Casino-Tresor', x: 0.27, y: 0.91, short: 'Tresor' },
    { scene: 'klinik', level: 'mittel', name: 'Implantat-Klinik', x: 0.84, y: 0.56, short: 'Klinik' },
    { scene: 'park', level: 'mittel', name: 'Kunstrasen-Park', x: 0.47, y: 0.86, short: 'Park' },
    { scene: 'museum', level: 'mittel', name: 'Museum der analogen Dinge', x: 0.66, y: 0.84, short: 'Museum' },
    { scene: 'revier', level: 'mittel', name: 'Polizeirevier 404', x: 0.84, y: 0.86, short: 'Revier 404' },
    { scene: 'gondel', level: 'mittel', name: 'Gondel-Station „Himmelfahrt“', x: 0.86, y: 0.27, short: 'Gondel' },

    { scene: 'promenade', level: 'ober', name: 'Schwebe-Promenade', x: 0.22, y: 0.35, short: 'Promenade' },
    { scene: 'villa', level: 'ober', name: 'Villa von Chrom', x: 0.40, y: 0.30, short: 'Villa' },
    { scene: 'spa', level: 'ober', name: 'Sky-Spa & Golfdome', x: 0.58, y: 0.42, short: 'Spa & Golf' },
    { scene: 'raumhafen', level: 'ober', name: 'Raumhafen', x: 0.72, y: 0.54, short: 'Raumhafen' },
    { scene: 'hyperhub', level: 'ober', name: 'Hyper-Hub', x: 0.31, y: 0.64, short: 'Hyper-Hub' },
    { scene: 'orbitalgarten', level: 'ober', name: 'Orbital-Garten', x: 0.18, y: 0.78, short: 'Garten' },
    { scene: 'bruecke', level: 'ober', name: 'Kommandobrücke', x: 0.40, y: 0.55, short: 'Brücke' },
    { scene: 'mond_eingang', level: 'ober', name: 'Mondminen-Eingang', x: 0.87, y: 0.28, short: 'Mondmine' },
    { scene: 'mond_tiefe', level: 'ober', name: 'Mondmine-Tiefe', x: 0.86, y: 0.82, short: 'Tiefe' },
    { scene: 'serverkern', level: 'ober', name: 'Kleos Serverkern', x: 0.67, y: 0.84, short: 'Serverkern' },
    { scene: 'kinderzimmer', level: 'ober', name: 'Kleos Kinderzimmer', x: 0.47, y: 0.86, short: 'Kinderzimmer' }
  ]
};
