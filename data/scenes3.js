// Szenen Akt 2: Mittel-Heights (13 Orte)
(function () {
  const H = NN.sceneHelpers, R = H.R, bottom = H.bottomExit, look = H.look;
  const D = (y0, y1, s0, s1) => ({ y0, y1, s0, s1 });
  const wearing = S => S.flags.kittel_an;

  // ---------------- Plaza ----------------
  NN.scenes.plaza = {
    id: 'plaza', name: 'Megablock-Plaza', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_13_plaza' }, music: 'mus_mittelstadt',
    bgStates: [
      { if: S => true, tiers: 'bg_13_plaza_sauber' },
      { if: S => S.flags.kantine_offen, tiers: 'bg_13_plaza_kantine_offen' }
    ],
    walk: [[0, 768], [1376, 768], [1376, 735], [1230, 695], [1100, 645], [920, 612], [780, 592], [560, 586], [420, 600], [300, 640], [180, 695], [0, 722]],
    depth: D(586, 768, 0.34, 0.8),
    spawns: { default: [700, 720], bahnhof: [700, 740], lobby: [700, 620], kantine: [940, 625], werbe: [1065, 650], friseur: [300, 655], revier: [140, 715], park: [1175, 660], gondel: [1290, 735] },
    actors: [{ id: 'zeus', name: 'Kiosk-Zeus', x: 925, y: 700, sprite: 'zeus', h: 150, scale: 0.9 }],
    exits: [
      bottom('Magnetbahn zurück nach Unter-Heights', 'bahnhof', 'plaza', 400),
      { id: 'ex_revier', name: 'Polizeirevier 404', poly: R(15, 420, 205, 700), walkTo: [150, 715], to: 'revier', spawn: 'plaza' },
      { id: 'ex_friseur', name: 'Friseur „Schnipp & Zap“', poly: R(225, 440, 372, 645), walkTo: [300, 660], to: 'friseur', spawn: 'plaza' },
      { id: 'ex_lobby', name: 'NoodleCorp-Lobby', poly: R(565, 430, 830, 585), walkTo: [700, 612], to: 'lobby', spawn: 'plaza' },
      { id: 'ex_kantine', name: 'Kantine (Hintertür)', if: S => S.flags.kantine_offen, poly: R(900, 440, 985, 592), walkTo: [940, 628], to: 'kantine', spawn: 'plaza' },
      { id: 'ex_park', name: 'Kunstrasen-Park', poly: R(1130, 330, 1225, 640), walkTo: [1175, 668], to: 'park', spawn: 'plaza' },
      { id: 'ex_gondel', name: 'Gondel-Station „Himmelfahrt“', poly: R(1235, 330, 1376, 740), walkTo: [1290, 742], to: 'gondel', spawn: 'plaza', arrow: 'right' }
    ],
    pickups: [{ item: 'zeitung', hot: 'zeitungsstand', x: 828, y: 566, w: 62 }],
    hotspots: [
      {
        id: 'casino_tuer', name: 'Casino „Golden Byte“', poly: R(380, 340, 505, 605), walkTo: [440, 618], facing: 'up',
        look: 'Der Eingang des Casinos. Ein roter Teppich führt in die Dunkelheit. Davor steht ein Schild: „Nur in festlicher Garderobe“.',
        use: 'Der Türsteher würde mich nicht reinlassen. Der Zugang geht wohl über den Friseur nebenan.'
      },
      {
        id: 'kantine_tuer', name: 'Kantine (Hintertür)', if: S => !S.flags.kantine_offen, poly: R(900, 440, 985, 592), walkTo: [940, 628], facing: 'up',
        look: 'Eine Metalltür mit Tastenfeld und dem Schild „KANTINE“. Das Tastenfeld hat eine Besonderheit: Ein winziger Chip-Schlitz, kaum sichtbar.',
        use: 'Abgeschlossen. Das Tastenfeld will einen Code. Ich habe aber keinen.',
        useWith: {
          zhang_chip: async g => {
            await g.say('pixel', 'Oma Zhang hat damals in jedes System eine Hintertür gebaut. Dann probieren wir ihren Chip.');
            await g.say('kruemel', 'Das Tastenfeld piept. Es piept wie jemand, der sehr gerührt ist.');
            g.flag('kantine_offen', true);
            await g.say('pixel', 'Offen! Zhang-Null war ihrer Zeit voraus.');
          },
          _default: async g => g.say('pixel', 'Das Tastenfeld mag das nicht.')
        }
      },
      {
        id: 'werbefabrik_tor', name: 'Hologramm-Werbefabrik', poly: R(1015, 420, 1118, 612), walkTo: [1065, 650], facing: 'up',
        look: 'Das Rolltor der Hologramm-Werbefabrik. Daneben ein Schild: „Nur für Mitarbeiter“.',
        use: async g => {
          if (!g.get('kittel_an')) return g.say('pixel', 'Das Tor ist zu. Mitarbeiter-Scanner. Ich brauche eine Uniform.');
          await g.say('pixel', 'Als „Brenda M.“ komme ich vielleicht durch.');
          await g.goto('werbefabrik', 'plaza');
        }
      },
      {
        id: 'zeus', name: 'Kiosk-Zeus', poly: R(880, 560, 980, 720), walkTo: [880, 735], facing: 'right',
        look: 'Kiosk-Zeus. Er besteht aus einem Zeitungsständer und viel zu viel Meinung.',
        use: async g => {
          await g.say('zeus', 'Schlagzeilen! Schlagzeilen! „Suppenkrise: Konzern verspricht Lösung bis nächsten Sommer.“');
          await g.say('pixel', 'Sehr beruhigend.');
          await g.say('zeus', 'Wer Nachrichten will, muss sie lesen. Die Zeitung auf der Bank ist gratis. Die Wahrheit kostet extra.');
        }
      },
      {
        id: 'zeitungsstand', name: 'Zeitungsständer', poly: R(790, 540, 875, 720), walkTo: [830, 735], facing: 'up',
        look: 'Ein Zeitungsständer. Obenauf liegt noch eine zerlesene Ausgabe des „Tageskrümel“.',
        use: async g => {
          if (g.get('gab_zeitung')) return g.say('pixel', 'Ich habe die Zeitung schon. Ein Exemplar reicht für meine Tage.');
          await g.say('pixel', '„Gala bei Baron von Chrom: Wappen der Oberstadt“ … Dazu ein großes Foto vom Wappen.');
          await g.say('kruemel', 'Und unten im Kleingedruckten: „Das Fundbüro sucht Besitzer eines Platin-Passes.“');
          g.give('zeitung');
        }
      },
      look('plakat', 'Hologramm-Plakat', R(515, 140, 890, 340), '„NUDELN FÜR ALLE*“ steht dort in riesigen Neonbuchstaben. Das Sternchen hat unten in winziger Schrift: „*außer Sie“.'),
      look('baenke', 'Parkbank', R(860, 625, 1045, 715), 'Eine Parkbank in der Mitte der Plaza. Niemand setzt sich. Sitzen ist in Konzernvierteln nur nach Antrag erlaubt.'),
      look('revier_schild', 'Revier-Schild', R(15, 350, 215, 440), 'Das Polizeirevier 404. Seine Spezialität: Fälle, die nicht gefunden werden.'),
      look('lobby_schild', 'NoodleCorp', R(570, 395, 825, 435), '„NOODLECORP“. Eine Firma mit größerer Reichweite als Moral.')
    ],
    onEnter: async g => {
      if (g.get('plaza_besucht')) return;
      g.flag('plaza_besucht', true);
      await g.say('pixel', 'Mittel-Heights. Alles sauber, alles kalt, alles überwacht.');
      await g.say('kruemel', 'Das Hologramm da oben flüstert dir ständig zu: „Du bist wertvoll“. Es kostet pro Wort extra.');
      await g.say('pixel', 'Irgendwo hier sitzt NoodleCorp. Und irgendwo steckt der Kristall.');
    }
  };

  // ---------------- Lobby ----------------
  NN.scenes.lobby = {
    id: 'lobby', name: 'NoodleCorp-Lobby', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_14_lobby' }, music: 'mus_konzern',
    bgStates: [
      { if: S => S.flags.lobby_frei, tiers: 'bg_14_lobby_aufzug_offen' }
    ],
    walk: [[0, 768], [1376, 768], [1376, 700], [1180, 640], [980, 590], [720, 560], [500, 565], [330, 600], [180, 640], [0, 680]],
    depth: D(560, 768, 0.45, 0.85),
    spawns: { default: [450, 690], plaza: [450, 690], bueros: [1230, 650] },
    actors: [{ id: 'ablage', name: 'Frau Ablage', x: 690, y: 505, drawY: 388, clipPoly: [[0, 0], [1376, 0], [1376, 379], [0, 379]], sprite: 'ablage', scale: 0.8, h: 170 }],
    exits: [
      { id: 'ex_plaza', name: 'Zurück zur Plaza', poly: R(40, 130, 290, 580), walkTo: [200, 650], to: 'plaza', spawn: 'lobby', arrow: 'left' },
      { id: 'ex_fahrstuhl', name: 'Fahrstuhl zu den Büros', if: S => S.flags.lobby_frei, poly: R(1140, 90, 1345, 580), walkTo: [1230, 655], to: 'bueros', spawn: 'lobby', arrow: 'up' }
    ],
    hotspots: [
      {
        id: 'ablage', name: 'Frau Ablage', poly: R(600, 340, 780, 505), walkTo: [690, 600], facing: 'up',
        look: 'Frau Ablage, Empfangsdame und lebendiger Aktenschrank. Sie sieht aus, als habe sie noch nie gelächelt.',
        use: async g => {
          if (g.get('lobby_frei')) return g.say('ablage', 'Weitergehen, Brenda. Der Fahrstuhl wartet nicht, und ich auch nicht.');
          if (!g.get('ablage_gesprochen')) { g.flag('ablage_gesprochen', true); await g.say('ablage', 'Guten Tag. Haben Sie einen Termin? Nein? Dann sind Sie falsch.'); }
          if (!g.get('kittel_an')) {
            await g.say('pixel', 'Ich bin … Kurierin. Ich habe eine Lieferung.');
            await g.say('ablage', 'Lieferungen nur über die Packstation. Und Packstationen nur zwischen 4:02 und 4:03 Uhr.');
            return g.say('kruemel', 'Sie würde dich nur reinlassen, wenn du aussiehst, als gehörtest du hierher.');
          }
          await g.say('ablage', 'Sie tragen den Mitarbeiterkittel. Brenda M., Abteilung Geschmack?');
          await g.say('pixel', 'Äh, ja. Das bin ich. Brenda. Geschmack.');
          await g.say('ablage', 'Dann beeilen Sie sich. Die Abteilung Geschmack hat seit einer Woche nichts mehr geschmeckt.');
          g.flag('lobby_frei', true);
          g.toast('Der Fahrstuhl zu den Büros ist jetzt frei.');
        }
      },
      look('hamster1', 'Hamsterrad', R(745, 315, 825, 390), 'Ein Hamster in einem Rad auf dem Empfangstresen. Er läuft, ohne anzukommen. Passt zur Firma.'),
      look('hamster2', 'Zweites Hamsterrad', R(840, 505, 965, 640), 'Noch ein Hamsterrad, diesmal auf dem Glastisch. Der Hamster dreht sich ernsthaft. Ein Vorbild.'),
      look('logo', 'NoodleCorp-Logo', R(560, 120, 880, 330), 'Das Firmenlogo: Eine Nudelschale mit Stern. Offenbar ist sie bewertet mit fünf Sternen von Menschen, die sie nie gegessen haben.'),
      look('scanner', 'Sicherheitsscanner', R(370, 235, 485, 450), 'Ein Sicherheitsscanner. Wer ihn durchschreitet, wird auf Humor geprüft. Niemand besteht.'),
      look('drehtuer', 'Drehtür', R(40, 120, 290, 560), 'Die Drehtür. Sie dreht sich auch ohne Menschen. Ein Symbol für Konzernarbeit.'),
      look('fahrstuhl_zu', 'Fahrstühle', R(930, 90, 1130, 560), 'Drei Fahrstühle. Der ganz rechte steht offen und wartet auf „Brenda“.')
    ],
    onEnter: async g => {
      if (g.get('lobby_besucht')) return;
      g.flag('lobby_besucht', true);
      await g.say('pixel', 'Die Lobby. So steril, dass man hier Spuren hinterlässt, wenn man atmet.');
    }
  };

  // ---------------- Kantine ----------------
  NN.scenes.kantine = {
    id: 'kantine', name: 'Konzern-Kantine', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_15_kantine' }, music: 'mus_konzern',
    bgStates: [
      { if: S => true, tiers: 'bg_15_kantine_sauber' }
    ],
    walk: [[0, 768], [700, 768], [650, 725], [540, 665], [400, 645], [0, 640]],
    depth: D(425, 768, 0.45, 0.95),
    spawns: { default: [400, 700], plaza: [400, 700] },
    actors: [{ id: 'kloss', name: 'Chef Kloß', x: 500, y: 650, sprite: 'kloss', flip: true, h: 230 }],
    exits: [bottom('Zur Plaza (Hintertür)', 'plaza', 'kantine', 400)],
    pickups: [
      { item: 'tablett', hot: 'tabletts', x: 935, y: 526, w: 100 },
      { item: 'flasche', hot: 'muell', x: 818, y: 352, w: 34 }
    ],
    hotspots: [
      {
        id: 'kloss', name: 'Chef Kloß', poly: R(410, 410, 590, 660), walkTo: [440, 700], facing: 'right',
        look: 'Chef Kloß, ein Koch-Roboter mit einem Knödel statt Kopf. Er hält eine Kelle wie ein Mahnmal.',
        use: async g => {
          if (!g.get('kloss_gesprochen')) { g.flag('kloss_gesprochen', true); await g.say('kloss', 'Hilfe! Mir fehlen die Zutaten! Seit Tagen nur graue Paste! Ich kann so nicht kochen!'); }
          if (g.get('gab_kittel')) return g.say('kloss', 'Danke für die Kräuter! Und viel Erfolg als Brenda. Sie war ohnehin unzuverlässig.');
          await g.say('kloss', 'Ein echter Koch braucht echte Kräuter. Frische, duftende, grüne … nun, blau-lila Kräuter.');
          await g.say('pixel', 'Wo bekommt man die?');
          await g.say('kloss', 'Der Gärtner im Kunstrasen-Park hat einen geheimen Topf. Wer ihm echtes Wasser bringt, bekommt alles.');
          await g.say('kloss', 'Echtes Wasser! In dieser Stadt! Das gibt es nur im Museum der analogen Dinge.');
          await g.say('pixel', 'Und wenn ich die Kräuter bringe?');
          await g.say('kloss', 'Dann tausche ich dir meinen Kittel samt Namensschild. Brenda M. wird ihn nicht mehr brauchen. Sie ist in „Strategischer Pause“.');
        },
        useWith: {
          kraeuterbund: async g => {
            await g.say('pixel', 'Chef Kloß, hier sind frische Kräuter.');
            await g.say('kloss', 'KRÄUTER! Sie duften nach Hoffnung und ein bisschen nach Mottenkugel!');
            g.remove('kraeuterbund'); g.give('kittel'); g.flag('kittel_an', true);
            await g.say('kloss', 'Hier, der Kittel. Namensschild „Brenda M., Abteilung Geschmack“. Du siehst fast schon nach Mitarbeiterin aus.');
            await g.say('kruemel', 'Fast. Aber „fast“ reicht in großen Firmen.');
          },
          _default: async g => g.say('kloss', 'Das ist keine Zutat. Das ist … Dekoration.')
        }
      },
      {
        id: 'tabletts', name: 'Tabletts', poly: R(830, 505, 1045, 700), walkTo: [660, 735], facing: 'up',
        look: 'Ein riesiger Stapel Kantinentabletts. Perfekt gestapelt, wie ein Schild ohne Krieger.',
        use: async g => {
          if (g.get('gab_tablett')) return g.say('pixel', 'Ein Tablett reicht.');
          await g.say('pixel', 'Ein Tablett kann man immer gebrauchen. Zum Tragen, zum Fangen, zum Schämen.');
          g.give('tablett');
        }
      },
      {
        id: 'muell', name: 'Mülltonne', poly: R(780, 285, 915, 440), walkTo: [640, 735], facing: 'up',
        look: 'Eine grüne Mülltonne. Obenauf klemmt eine leere Flasche. Offenbar hat jemand versucht, seinen Kummer zu recyceln.',
        use: async g => {
          if (g.get('gab_flasche')) return g.say('pixel', 'Ich habe genug im Müll gewühlt.');
          await g.say('pixel', 'Eine leere Glasflasche. Schön sauber. Die kann ich brauchen.');
          g.give('flasche');
        }
      },
      look('theke', 'Selbstbedienungstheke', R(330, 275, 960, 700), 'Eine Selbstbedienungstheke mit grauer Paste in fünf Geschmacksrichtungen: Grau, Grau, Grau, Leicht Grau und Aus Versehen Grau.'),
      look('toepfe', 'Suppentöpfe', R(955, 405, 1376, 700), 'Riesige Suppentöpfe. Alle leer. Auf dem Boden kleben die Reste eines besseren Lebens.'),
      look('garderobe', 'Kittel-Garderobe', R(1165, 215, 1376, 445), 'Weiße Kittel an Haken. Einer davon trägt das Namensschild „Brenda M.“. Er hängt nicht mehr, er schwebt vor Wut.'),
      look('serviceTuer', 'Tür „Service only“', R(950, 145, 1135, 530), 'Eine Tür mit der Aufschrift „SERVICE ONLY – ZUTRITT VERBOTEN“. Sie wirkt, als wäre sie neugierig.'),
      look('neon', 'Neonschild', R(620, 95, 785, 190), '„NOODLECORP CAFETERIA“. Mit leuchtenden Buchstaben, die nicht ehrlich gemeint sind.')
    ],
    onEnter: async g => {
      if (g.get('kantine_besucht')) return;
      g.flag('kantine_besucht', true);
      await g.say('pixel', 'Die Kantine. Hier gab es früher mal Essen. Jetzt gibt es Trauer mit Löffel.');
    }
  };

  // ---------------- Büros ----------------
  NN.scenes.bueros = {
    id: 'bueros', name: 'Großraumbüro', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_16_bueros' }, music: 'mus_konzern',
    walk: [[0, 768], [380, 768], [420, 710], [360, 650], [250, 600], [0, 590]],
    depth: D(430, 768, 0.45, 0.95),
    spawns: { default: [220, 700], lobby: [220, 700] },
    exits: [bottom('Zurück zum Fahrstuhl', 'lobby', 'bueros', 200)],
    hotspots: [
      {
        id: 'terminal', name: 'Computer', poly: R(780, 420, 990, 620), walkTo: [400, 725], facing: 'right',
        look: 'Ein alter Bürocomputer mit Röhrenmonitor. Er verlangt ein Passwort. An der Kante klebt ein Zettel: „Passwort = Name meines liebsten Kollegen“.',
        use: async g => {
          if (g.get('memo_gelesen')) return g.say('pixel', 'Ich habe das Memo bereits gelesen. Sehr aufschlussreich, sehr unheimlich.');
          await g.say('terminal', 'BENUTZER: FRAU ABLAGE – PASSWORT EINGEBEN:');
          const opts = ['Synergie', 'Passwort123', 'Mr. Tackert', 'Nudelsuppe'];
          const i = await g.choose(opts);
          if (i !== 2) { NN.audio.fail(); return g.say('terminal', 'FALSCH. (Das war sogar ein Passwort, das ein Hamster nie wählen würde.)'); }
          await g.say('pixel', 'Der Hamster heißt Mr. Tackert. Der Name steht ja groß auf dem Schild. Ich bin ein Genie.');
          await g.say('terminal', 'ZUGRIFF GEWÄHRT. 1 NEUE NACHRICHT: ');
          await g.say('terminal', '„Kristall ist wohlbehalten im Serverkern auf dem Mond. Bergbau-Roboter bewachen das Gelände. Transport ab Raumhafen Ober-Heights. Zugang nur mit Platin-Pass. – K.“');
          await g.say('pixel', 'Der Mond? Die haben meinen Kristall auf den Mond gebracht?!');
          await g.say('kruemel', 'Und ein Drucker springt an. Das Terminal druckt ein Formular „404-B“.');
          g.flag('memo_gelesen', true);
        },
        useWith: { _default: async g => g.say('pixel', 'Das Terminal will nur ein Passwort, kein Gepäck.') }
      },
      {
        id: 'hamster', name: 'Hamsterkäfig', poly: R(450, 430, 645, 590), walkTo: [400, 725], facing: 'right',
        look: 'Ein Hamsterkäfig. Auf dem Schildchen davor steht „MR. TACKERT“. Der Käfig ist leer, der Hamster macht wohl Homeoffice.',
        use: 'Ich lasse den Käfig in Ruhe. Der Hamster hat sicher schon genug Meetings.'
      },
      {
        id: 'drucker', name: 'Drucker', poly: R(1090, 420, 1300, 650), walkTo: [400, 735], facing: 'right',
        look: 'Ein vollgestopfter Drucker. Zerknülltes Papier quillt heraus. Das Gerät wirkt überfordert.',
        use: async g => {
          if (!g.get('memo_gelesen')) return g.say('pixel', 'Der Drucker ist tot. Er wartet auf einen Befehl vom Terminal.');
          if (g.get('gab_formular_404b')) return g.say('pixel', 'Ich habe das Formular schon.');
          await g.say('pixel', 'Der Drucker spuckt etwas aus: Formular 404-B, „Verlustmeldung mit Beweismittel“.');
          g.give('formular_404b');
        }
      },
      look('poster', 'Poster „Synergie!“', R(140, 330, 255, 505), 'Ein Poster mit einem Tintenfisch und dem Schlagwort „SYNERGIE!“. Er sieht aus, als wollte er einem Meeting entkommen.'),
      look('stapel', 'Papierstapel', R(280, 625, 420, 768), 'Ein Papierstapel mit Formularen. Er ist größer als meine Hoffnung auf Feierabend.'),
      look('kabinen', 'Büroboxen', R(640, 195, 1376, 440), 'Ein Labyrinth aus grauen Büroboxen. Darin sitzen vermutlich Menschen, die vergessen haben, wie Tageslicht aussieht.')
    ],
    onEnter: async g => {
      if (g.get('bueros_besucht')) return;
      g.flag('bueros_besucht', true);
      await g.say('pixel', 'Das Großraumbüro. Wo Träume zum Meeting verabredet werden.');
    }
  };

  // ---------------- Werbefabrik ----------------
  NN.scenes.werbefabrik = {
    id: 'werbefabrik', name: 'Hologramm-Werbefabrik', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_17_werbefabrik' }, music: 'mus_konzern',
    bgStates: [
      { if: S => S.flags.gab_holo_siegel, tiers: 'bg_17_werbefabrik_drucker_an' }
    ],
    walk: [[0, 768], [1376, 768], [1376, 690], [1230, 640], [1050, 600], [800, 590], [560, 610], [380, 680], [200, 730], [0, 745]],
    depth: D(585, 768, 0.5, 0.95),
    spawns: { default: [1100, 700], plaza: [1100, 700] },
    actors: [{ id: 'flimmer', name: 'Techniker Flimmer', x: 790, y: 590, sprite: 'flimmer', scale: 0.9, h: 150 }],
    exits: [{ id: 'ex_plaza', name: 'Zur Plaza', poly: R(1100, 150, 1376, 600), walkTo: [1230, 650], to: 'plaza', spawn: 'werbe', arrow: 'right' }],
    hotspots: [
      {
        id: 'drucker', name: 'Hologramm-Drucker', poly: R(195, 280, 675, 620), walkTo: [440, 690], facing: 'up',
        look: 'Ein riesiger Hologramm-Drucker mit der Aufschrift „PROTOTYP“. Er kann scheinbar jedes Bild als dreidimensionales Siegel ausgeben, wenn man ihm etwas zum Abtasten gibt.',
        use: 'Der Drucker braucht ein Muster zum Abtasten. Er ist ein Künstler, kein Hellseher.',
        useWith: {
          zeitung: async g => {
            if (g.get('gab_holo_siegel')) return g.say('pixel', 'Ein Siegel reicht.');
            if (g.get('kruemel_leer') && !g.get('kruemel_geladen')) return g.say('kruemel', 'Akku leer. Kein Scan. Ich bin ein sehr müder Toaster.');
            await g.say('pixel', 'In der Zeitung ist das Wappen von Chrom abgebildet. Krümel, scan das mal.');
            await g.kruemelScan();
            await g.say('kruemel', 'Muster erkannt: ein Wappen mit Krone, zwei Löwen und einer Nudelschale. Hochauflösend.');
            await g.say('pixel', 'Drucker, bitte ein Holo-Siegel davon.');
            await g.say('flimmer', 'Zzz … Prototyp … zzz …');
            g.give('holo_siegel');
            await g.say('pixel', 'Ein glänzendes, fälschungssicheres Holo-Siegel. Naja. Fälschungsähnlich.');
          },
          _default: async g => g.say('pixel', 'Der Drucker möchte ein Wappen, kein Souvenir.')
        }
      },
      {
        id: 'flimmer', name: 'Techniker Flimmer', poly: R(715, 365, 850, 595), walkTo: [800, 690], facing: 'up',
        look: 'Techniker Flimmer. Er schläft. Auf dem Schild an seinem Stuhl steht: „Techniker schläft“. Ehrlichkeit ist selten.',
        use: async g => { await g.say('flimmer', 'Zzz … Meeting … zzz …'); await g.say('pixel', 'Besser nicht wecken. Er träumt gerade von einem Feierabend.'); }
      },
      look('werkbank', 'Werkbank', R(790, 275, 1030, 570), 'Eine Werkbank mit Werkzeug, Kaffeebechern und einem Schild „Bitte nicht aufräumen, es ist Kunst“.'),
      look('hologramm1', 'Zhang’s Hologramm', R(375, 40, 590, 220), 'Ein Hologramm von einer Nudelschale mit dem Schriftzug „ZHANG’S“. Anscheinend wurde Omas Marke als Vorlage benutzt.'),
      look('hologramm2', 'NoodleCorp Presents', R(790, 85, 1010, 215), '„NOODLECORP PRESENTS“. Das Hologramm wirbt für etwas, das noch nicht existiert.'),
      look('poster', 'Poster „Dream Big“', R(695, 205, 780, 330), 'Ein Poster: „DREAM BIG (and glowing)“. Was für ein Motto für Menschen, die im Dunkeln arbeiten.'),
      look('monitor', 'Monitor', R(0, 260, 100, 480), 'Ein alter Monitor mit Fehlercode 404. Der Fehlercode steht für „Hoffnung nicht gefunden“.')
    ],
    onEnter: async g => {
      if (g.get('werbe_besucht')) return;
      g.flag('werbe_besucht', true);
      await g.say('pixel', 'Die Werbefabrik. Hier werden Wünsche gedruckt, die du gar nicht hattest.');
    }
  };

  // ---------------- Friseur ----------------
  NN.scenes.friseur = {
    id: 'friseur', name: 'Roboter-Friseur „Schnipp & Zap“', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_18_friseur' }, music: 'mus_casino',
    walk: [[0, 768], [1376, 768], [1376, 700], [1180, 640], [1000, 610], [760, 600], [600, 640], [420, 690], [230, 720], [0, 740]],
    depth: D(600, 768, 0.55, 1.0),
    spawns: { default: [700, 700], plaza: [700, 700], casino: [1250, 650] },
    actors: [
      { id: 'schnipp', name: 'Schnipp', x: 640, y: 660, sprite: 'schnipp', h: 240 },
      { id: 'mortimer', name: 'Mortimer', x: 1210, y: 630, sprite: 'mortimer', h: 245, hide: S => S.flags.gala_look }
    ],
    exits: [
      bottom('Zur Plaza', 'plaza', 'friseur', 600),
      { id: 'ex_casino', name: 'Casino „Golden Byte“', if: S => S.flags.gala_look, poly: R(1145, 140, 1376, 580), walkTo: [1250, 650], to: 'casino', spawn: 'friseur', arrow: 'right' }
    ],
    hotspots: [
      {
        id: 'schnipp', name: 'Schnipp', poly: R(540, 400, 750, 660), walkTo: [620, 720], facing: 'right',
        look: 'Schnipp, der Roboter-Friseur. Seine Frisur sieht aus, als hätte ihn jemand im Wald von Hochspannung gelassen.',
        use: async g => {
          if (g.get('gala_look')) return g.say('schnipp', 'Du siehst umwerfend aus! Fast wie Schnipp selbst. Kleiner Blitz inklusive!');
          if (!g.get('schnipp_gesprochen')) { g.flag('schnipp_gesprochen', true); await g.say('schnipp', 'Zap! Willkommen bei Schnipp und Zap! Dein Haar wird neu geboren oder verbrannt!'); }
          await g.say('schnipp', 'Aber leider … meine Schere ist stumpf. Eine stumpfe Schere ist eine Tragödie ohne Pointe.');
          await g.say('pixel', 'Und mit scharfer Schere?');
          await g.say('schnipp', 'Dann mache ich dir einen Gala-Look, nach dem selbst Barone neidisch werden. Dazu brauche ich eine feine Klinge. Eine ganz feine.');
          await g.say('kruemel', 'Ein Arzt hätte so etwas.');
        },
        useWith: {
          skalpell: async g => {
            await g.say('pixel', 'Wie wäre es hiermit? Ein Skalpell. Sehr scharf, sehr medizinisch.');
            await g.say('schnipp', 'Ein Skalpell! Es singt in meiner Hand! Setz dich, Pixel. Zap!');
            g.remove('skalpell'); g.flag('gala_look', true); g.flag('outfit', 'gala');
            await g.say('kruemel', '… Das hat eine Weile gedauert. Und es gab Funken.');
            await g.say('pixel', 'Wow. Ich sehe aus wie eine Million Credits. Mit Pointe.');
            g.toast('Neuer Look: Gala-Outfit!');
          },
          _default: async g => g.say('schnipp', 'Dafür brauche ich ein Werkzeug, kein Souvenir.')
        }
      },
      {
        id: 'mortimer', name: 'Mortimer', if: S => !S.flags.gala_look, poly: R(1130, 380, 1290, 640), walkTo: [1130, 700], facing: 'right',
        look: 'Mortimer, der Türsteher des Casinos. Groß, samtig und ohne jede Bereitschaft, Spaß zu verstehen.',
        use: async g => {
          await g.say('mortimer', 'Casino „Golden Byte“. Nur in festlicher Garderobe.');
          await g.say('pixel', 'Ich habe eine Jacke mit Reflektoren.');
          await g.say('mortimer', 'Das ist keine festliche Garderobe. Das ist ein Warnsignal.');
        }
      },
      look('spiegel', 'Spiegel', R(620, 165, 835, 470), 'Ein Spiegel mit Glühbirnen. Er zeigt mich ungeschönt. Er sollte sich schämen.'),
      look('stuhl_l', 'Friseurstuhl', R(185, 195, 440, 670), 'Ein Friseurstuhl mit Haube. Man weiß nie, ob man darin schöner oder nur kürzer wird.'),
      look('stuhl_r', 'Friseurstuhl', R(805, 330, 1075, 590), 'Ein zweiter Friseurstuhl. Auf der Armlehne klebt ein Zettel: „Zap macht süchtig“.'),
      look('posters', 'Frisurenplakate', R(130, 60, 390, 400), 'Plakate mit Frisuren, die in keinem Naturgesetz vorgesehen sind. Meine Lieblingsfrisur: „Der Blitzableiter“.'),
      look('werkzeug', 'Werkzeugwand', R(410, 300, 615, 520), 'Eine Werkzeugwand. Hier fehlt eine Schere. Statt ihr hängt ein Schild: „Zap borrowed it“.')
    ],
    onEnter: async g => {
      if (g.get('friseur_besucht')) return;
      g.flag('friseur_besucht', true);
      await g.say('pixel', 'Ein Roboter-Friseur. Hier entscheidet man sich für einen neuen Look, der meistens kurz vor dem Blackout endet.');
    }
  };

  // ---------------- Casino ----------------
  NN.scenes.casino = {
    id: 'casino', name: 'Casino „Golden Byte“', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_19_casino' }, music: 'mus_casino',
    bgStates: [
      { if: S => S.flags.jackpot_alarm, tiers: 'bg_19_casino_tresor_offen' }
    ],
    walk: [[0, 768], [1376, 768], [1376, 720], [1150, 690], [980, 640], [820, 590], [600, 585], [420, 620], [260, 680], [100, 730], [0, 745]],
    depth: D(585, 768, 0.6, 1.0),
    spawns: { default: [250, 700], friseur: [250, 700], tresor: [910, 600] },
    actors: [{ id: 'jackpot', name: 'Madame Jackpot', x: 1030, y: 640, sprite: 'jackpot', h: 250, hide: S => !S.flags.jackpot_alarm || S.flags.jackpot_weg }],
    exits: [
      { id: 'ex_friseur', name: 'Zurück zum Friseur', poly: R(0, 735, 700, 768), walkTo: [250, 766], to: 'friseur', spawn: 'casino', arrow: 'down' },
      { id: 'ex_tresor', name: 'Tresor', if: S => S.flags.jackpot_alarm, poly: R(820, 200, 1000, 400), walkTo: [910, 590], to: 'tresor', spawn: 'casino', arrow: 'up' }
    ],
    hotspots: [
      {
        id: 'roulette', name: 'Roulette-Tisch', poly: R(510, 365, 925, 640), walkTo: [720, 700], facing: 'up',
        look: 'Ein riesiger Roulette-Tisch aus Gold und Mahagoni. Die Kugel ist aus Stahl. Sie rollt wie eine kleine Entscheidung.',
        use: async g => {
          if (g.get('gab_jackpot_chip')) return g.say('pixel', 'Noch mal gewinnen wäre unhöflich.');
          await g.say('pixel', 'Ich setze auf Rot. Oder auf Schwarz. Oder auf „möglichst wenig Verlust“.');
          await g.say('kruemel', 'Die Wahrscheinlichkeit, dass du gewinnst, beträgt 2,7 Prozent. Ich habe eine Idee. Metall … Magnet … du verstehst?');
        },
        useWith: {
          kranmagnet: async g => {
            await g.say('pixel', 'Rosis Kranmagnet … ganz unauffällig unter dem Tisch.');
            await g.say('kruemel', 'Die Kugel ist aus Stahl. Der Magnet zieht an. Ich zähle bis drei.');
            await g.say('pixel', 'Die Kugel fällt auf die Zahl, die ich will! Dreimal hintereinander!');
            g.give('jackpot_chip');
            g.flag('jackpot_alarm', true);
            await g.say('jackpot', 'MOMENT! Hier gewinnt niemand dreimal hintereinander! Sicherheit!');
            await g.say('pixel', 'Schnell, in den Tresorraum! Der Ausgang ist dort!');
            await g.goto('tresor', 'casino');
          },
          _default: async g => g.say('pixel', 'Damit gewinne ich nicht. Ich brauche etwas, das Stahl anzieht.')
        }
      },
      {
        id: 'jackpot', name: 'Madame Jackpot', if: S => S.flags.jackpot_alarm && !S.flags.jackpot_weg, poly: R(950, 380, 1130, 640), walkTo: [900, 700], facing: 'right',
        look: 'Madame Jackpot. Ihr Hut ist ein Roulette-Rad, ihr Lächeln ein verlorener Einsatz.',
        use: async g => g.say('jackpot', 'Du schuldest mir mindestens einen Prozess. Und eine Entschuldigung. Und dein Aussehen.')
      },
      look('automaten', 'Spielautomaten', R(40, 150, 560, 640), 'Goldene Spielautomaten. Sie zeigen dreimal eine Sieben. Für niemanden.'),
      look('automaten2', 'Spielautomaten', R(1085, 190, 1376, 640), 'Weitere Automaten. Einer zeigt „JACKPOT“. Alle zeigen „Pech“.'),
      look('discokugel', 'Discokugel', R(665, 0, 790, 135), 'Eine Discokugel. Sie dreht sich, weil Stillstand verloren hat.'),
      look('tresor_schild', 'Schild „Tresor“', R(840, 145, 975, 190), 'Ein Schild: „TRESOR“. Nur für Personal, Geld und Leute mit gutem Anwalt.')
    ],
    onEnter: async g => {
      if (g.get('casino_besucht')) return;
      g.flag('casino_besucht', true);
      await g.say('pixel', 'Das Casino „Golden Byte“. Hier gewinnt immer das Haus. Und der Teppich.');
      await g.say('kruemel', 'Die Chance, dass du heute reich wirst, ist fast so hoch wie die, dass Oma Zhang die Suppenkrise ignoriert.');
    }
  };

  // ---------------- Tresorraum ----------------
  NN.scenes.tresor = {
    id: 'tresor', name: 'Casino-Tresorraum', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_20_tresor' }, music: 'mus_casino',
    bgStates: [
      { if: S => true, tiers: 'bg_20_tresor_sauber' }
    ],
    walk: [[0, 768], [1376, 768], [1376, 700], [1100, 650], [800, 640], [600, 630], [350, 650], [150, 700], [0, 730]],
    depth: D(630, 768, 0.65, 1.0),
    spawns: { default: [500, 700], casino: [500, 700] },
    props: [{ if: S => S.flags.gitter_offen, draw: () => NN.drawProp('gitter_offen', 1215, 195, 205) }],
    exits: [
      { id: 'ex_casino', name: 'Zurück ins Casino', if: S => !S.flags.gitter_offen, poly: R(0, 735, 700, 768), walkTo: [400, 766], to: 'casino', spawn: 'tresor', arrow: 'down' },
      { id: 'ex_plaza', name: 'Hinterausgang zur Plaza', if: S => S.flags.gitter_offen && S.flags.gab_kleo_akte, poly: R(1000, 735, 1376, 768), walkTo: [1200, 766], to: 'plaza', spawn: 'friseur', arrow: 'down' }
    ],
    pickups: [{ item: 'kleo_akte', hot: 'schreibtisch', x: 868, y: 497, w: 100 }],
    hotspots: [
      {
        id: 'schreibtisch', name: 'Schreibtisch mit Akten', poly: R(715, 390, 1040, 665), walkTo: [850, 720], facing: 'up',
        look: 'Ein Schreibtisch mit Akten, Lampe und Kaffeebecher. Oben liegt ein Ordner mit einer Kinderzeichnung auf der Hülle: „KLEO“.',
        use: async g => {
          if (g.get('gab_kleo_akte')) return g.say('pixel', 'Ich habe die Akte schon. Viel mehr Anhaltspunkte gibt der Tisch nicht her.');
          await g.say('pixel', 'Die Akte „KLEO“. Eine Kinderzeichnung auf dem Deckel: zwei Strichmännchen mit einer Schüssel.');
          await g.say('pixel', 'Innen drin: „Bestellung 4711: Geschmacks-Kristall. Auftraggeber: Kleo, 12 Jahre. Wunschliste Nr. 1: Einmal Suppe schmecken.“');
          await g.say('kruemel', 'Sie wollte nur … schmecken. Das ist kein Verbrechen. Das ist … traurig.');
          await g.say('pixel', 'Kleo ist ein Kind. Eine künstliche Intelligenz. Und sie hat noch nie etwas geschmeckt.');
          g.give('kleo_akte');
        }
      },
      {
        id: 'gitter', name: 'Lüftungsgitter', if: S => !S.flags.gitter_offen, poly: R(1135, 25, 1295, 200), walkTo: [1100, 665], facing: 'up',
        look: 'Ein Lüftungsgitter hoch oben an der Wand. Zu klein für Menschen, genau richtig für einen Toaster.',
        use: 'Viel zu hoch und viel zu eng. Ein Mensch kommt da nicht durch.',
        useWith: {
          kruemel: async g => {
            if (g.get('kruemel_leer') && !g.get('kruemel_geladen')) return g.say('kruemel', 'Akku leer. Ich schaffe nicht mal einen Hubschrauberflug.');
            await g.say('pixel', 'Krümel, flieg durch den Schacht und öffne uns von außen.');
            await g.say('kruemel', 'Ich bin ein Toaster, aber heute ein Held. Bis gleich.');
            await g.say('kruemel', '(Er quetscht sich durch das Gitter. Es klappert, es zischt, es riecht nach Toast.)');
            g.flag('gitter_offen', true);
            await g.say('kruemel', 'Hinterausgang offen! Er führt zurück zur Plaza.');
            g.toast('Der Hinterausgang ist frei (nimm vorher die Akte vom Schreibtisch).');
          },
          _default: async g => g.say('pixel', 'Das passt nicht durch das Gitter.')
        }
      },
      {
        id: 'ausgang_zu', name: 'Verschlossene Tür', if: S => !(S.flags.gitter_offen && S.flags.gab_kleo_akte), poly: R(1000, 735, 1376, 768), walkTo: [1200, 766],
        look: 'Der Ausgang. Noch verschlossen.', use: async g => g.say('pixel', 'Ich komme hier nicht raus. Erst die Akte ansehen, dann Krümel durch den Schacht schicken.')
      },
      look('tresortuer', 'Tresortür', R(25, 90, 480, 620), 'Eine riesige runde Tresortür. Sie steht offen. Leider ist dahinter nur noch mehr Casino.'),
      look('muenzen', 'Goldmünzen', R(470, 140, 730, 560), 'Stapel von Goldmünzen. Sie sind gar nicht aus Gold, sondern aus Schokolade mit Goldfolie. Casino-Humor.'),
      look('schliessfaecher', 'Schließfächer', R(1030, 250, 1376, 650), 'Hunderte Schließfächer. In einem davon liegt vermutlich ein Geheimnis, in den anderen schlechter Geschmack.')
    ],
    onEnter: async g => {
      if (g.get('tresor_besucht')) { return; }
      g.flag('tresor_besucht', true);
      await g.say('pixel', 'Der Tresorraum. Madame Jackpot ist nicht weit. Wir haben nicht viel Zeit.');
      await g.say('kruemel', 'Schau dich um. Und denk dran: Ich passe durch das Lüftungsgitter da oben.');
    }
  };

  // ---------------- Klinik ----------------
  NN.scenes.klinik = {
    id: 'klinik', name: 'Implantat-Klinik „Dr. Schraub“', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_21_klinik' }, music: 'mus_klinik',
    walk: [[0, 768], [1376, 768], [1376, 700], [1150, 665], [900, 640], [660, 625], [440, 640], [250, 680], [100, 720], [0, 740]],
    depth: D(620, 768, 0.55, 1.0),
    spawns: { default: [650, 710], park: [650, 710] },
    actors: [{ id: 'schraub', name: 'Dr. Schraub', x: 380, y: 690, sprite: 'schraub', h: 250 }],
    exits: [bottom('Zum Park', 'park', 'klinik', 650)],
    hotspots: [
      {
        id: 'schraub', name: 'Dr. Schraub', poly: R(300, 440, 470, 700), walkTo: [490, 710], facing: 'left',
        look: 'Dr. Schraub, Implantatarzt mit Nadelphobie. Er zittert, wenn er jemanden mit Spritzen sieht.',
        use: async g => {
          if (g.get('gab_skalpell')) return g.say('schraub', 'Danke noch mal! Wenn ich Sie wiedersehe, dann bitte ohne Nadeln.');
          if (!g.get('schraub_gesprochen')) { g.flag('schraub_gesprochen', true); await g.say('schraub', 'Eine Nadel! Ist das eine Nadel? Nein? Ach so. Ich bin nur ein wenig nervös.'); }
          await g.say('schraub', 'Seit Tagen kann ich nicht mehr operieren. Ich brauche etwas Beruhigendes. Kamille vielleicht. Echte Kamille!');
          await g.say('pixel', 'Wo bekomme ich die?');
          await g.say('schraub', 'Der Gärtner im Park hat einen versteckten Topf. Wenn Sie mir davon etwas bringen, schenke ich Ihnen etwas aus meinem Regal.');
        },
        useWith: {
          kamille: async g => {
            await g.say('pixel', 'Hier, Doktor. Frische Kamillenblüten.');
            await g.say('schraub', '(Er kaut hektisch.) … Ahhh. Mein Herzschlag fällt auf 80. Meine Hände zittern nicht mehr.');
            await g.say('schraub', 'Ich schenke Ihnen etwas: mein bestes Skalpell. Und diesen Sensor hier. Ein Prototyp, der steht seit Jahren herum. Ein Geschmacks-Sensor, entwickelt für Roboter.');
            g.remove('kamille'); g.give('skalpell'); g.give('geschmacks_sensor');
            await g.say('kruemel', 'Ein Geschmacks-Sensor … Klingt interessant. Er passt in eine Standardbuchse.');
          },
          _default: async g => g.say('schraub', 'Nein! Das macht mich nur nervöser.')
        }
      },
      look('regal', 'Implantat-Regal', R(40, 60, 365, 640), 'Ein Regal voller Einmachgläser: Augen, Herzen, Zungen, Finger. Das Etikett: „Gebraucht, aber glücklich“.'),
      look('stuhl', 'Behandlungsstuhl', R(450, 235, 880, 610), 'Ein Behandlungsstuhl mit drei Roboterarmen. Zwei davon halten Schraubendreher, der dritte macht Smalltalk.'),
      look('plakate', 'Plakate', R(535, 105, 1010, 360), 'Plakate: „Get a new beat!“, „Extra Legs? Yes!“, „See it all! Cyber-Vision!“. Werbung für Menschen, die mehr wollen.'),
      look('tisch', 'Instrumententisch', R(905, 395, 1330, 750), 'Ein Instrumententisch mit Zangen, Schraubenziehern und einem Tablet mit Körperdiagrammen.'),
      look('muell', 'Mülleimer', R(1175, 565, 1376, 768), 'Ein Mülleimer voller Kabel, Chips und Hoffnungen. Zwischen Chips ragt eine ziemlich leere Tüte Seetang-Snacks.')
    ],
    onEnter: async g => {
      if (g.get('klinik_besucht')) return;
      g.flag('klinik_besucht', true);
      await g.say('pixel', 'Eine Implantat-Klinik. Wer will schon eine Ersatzzunge? Ich meine … Sie verkaufen sie auch.');
    }
  };

  // ---------------- Park ----------------
  NN.scenes.park = {
    id: 'park', name: 'Kunstrasen-Park', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_22_park' }, music: 'mus_mittelstadt',
    walk: [[0, 768], [1376, 768], [1376, 600], [1250, 500], [1100, 430], [1000, 410], [880, 520], [820, 560], [560, 575], [430, 510], [330, 495], [200, 535], [0, 590]],
    depth: D(410, 768, 0.4, 1.0),
    spawns: { default: [800, 700], plaza: [1000, 740], museum: [1040, 440], klinik: [1290, 520] },
    props: [
      { draw: (ctx, L, S) => NN.drawProp(S.flags.topf_gegossen ? 'topf_gewachsen' : 'topf_trocken', 288, 412, 62) }
    ],
    actors: [{ id: 'gruenhorn', name: 'Grünhorn', x: 190, y: 600, sprite: 'gruenhorn', h: 250 }],
    exits: [
      { id: 'ex_plaza', name: 'Zur Plaza', poly: R(900, 742, 1376, 768), walkTo: [1100, 766], to: 'plaza', spawn: 'park', arrow: 'down' },
      { id: 'ex_museum', name: 'Museum der analogen Dinge', poly: R(935, 150, 1210, 360), walkTo: [1040, 440], to: 'museum', spawn: 'park', arrow: 'up' },
      { id: 'ex_klinik', name: 'Implantat-Klinik', poly: R(1215, 150, 1376, 470), walkTo: [1290, 520], to: 'klinik', spawn: 'park', arrow: 'right' }
    ],
    hotspots: [
      {
        id: 'gruenhorn', name: 'Grünhorn', poly: R(110, 380, 290, 620), walkTo: [330, 650], facing: 'left',
        look: 'Grünhorn, der Gärtner-Roboter. Er besteht aus Gartengeräten und einer Gießkanne. Auf dem Kopf trägt er ein Blatt.',
        use: async g => {
          if (g.get('topf_gegossen')) return g.say('gruenhorn', 'Die Pflanzen wachsen wie nie zuvor! Danke, mein Freund aus Wasser!');
          if (!g.get('gruen_gesprochen')) { g.flag('gruen_gesprochen', true); await g.say('gruenhorn', 'Psst! Ich hüte hier einen Topf mit echten Kräutern. In einer Stadt aus Plastik ist das Gesetzesbruch.'); }
          await g.say('gruenhorn', 'Leider sind sie vertrocknet. Sie brauchen echtes Wasser, nicht dieses recycelte Zeug aus dem Hahn.');
          await g.say('pixel', 'Wo bekomme ich echtes Wasser?');
          await g.say('gruenhorn', 'Im Museum der analogen Dinge steht ein echter Wasserhahn. Aber der wird bewacht von Prof. Staub. Der hasst Rauch und Lärm.');
          await g.say('kruemel', 'Rauch … Lärm … Da kenne ich jemanden.');
        },
        useWith: {
          flasche_wasser: async g => gießen(g),
          _default: async g => g.say('gruenhorn', 'Danke, aber ich brauche nur Wasser. Echtes.')
        }
      },
      {
        id: 'topf', name: 'Versteckter Kräutertopf', poly: R(255, 355, 330, 425), walkTo: [330, 520], facing: 'left',
        look: async g => g.say('pixel', g.get('topf_gegossen') ? 'Ein Topf voller Kräuter und Kamille. Sie leuchten in Blau und Lila.' : 'Ein winziger Topf mit trockener Erde. Es sieht aus, als sei er traurig.'),
        use: async g => g.say('pixel', g.get('topf_gegossen') ? 'Die Kräuter sind schon gepflückt. Ich lasse die Kamille stehen.' : 'Ohne Wasser passiert hier nichts.'),
        useWith: { flasche_wasser: async g => gießen(g), _default: async g => g.say('pixel', 'Der Topf wünscht sich nur Wasser.') }
      },
      look('teich', 'Teich', R(430, 410, 820, 570), 'Ein künstlicher Teich, gefüllt mit Blauer-Blubber-Flüssigkeit. Bloß nicht trinken.'),
      look('schuppen', 'Gärtnerschuppen', R(0, 190, 245, 520), 'Der Gärtnerschuppen mit dem Schild „PARK MAINT.“. Drinnen hängt eine Schaufel und ein Schild: „Nicht gießen!“.'),
      look('baenke', 'Parkbank', R(30, 580, 360, 768), 'Eine Parkbank. Auf der Lehne steht: „In Erinnerung an einen Baum“.'),
      look('plastikbaum', 'Plastikbaum', R(325, 150, 535, 430), 'Ein Plastikbaum. Er raschelt nicht, er knistert. Ein Vogel wollte hier nisten, ist aber an der Lieferkette gescheitert.')
    ],
    onEnter: async g => {
      if (g.get('park_besucht')) return;
      g.flag('park_besucht', true);
      await g.say('pixel', 'Ein Park aus Kunstrasen. Alles grün. Alles tot. Aber schön.');
    }
  };

  async function gießen(g) {
    if (g.get('topf_gegossen')) return g.say('pixel', 'Er hat schon genug Wasser. Echte Pflanzen mögen kein Ertrinken.');
    await g.say('pixel', 'Grünhorn, hier ist echtes Wasser aus dem Museum.');
    await g.say('gruenhorn', 'ECHTES WASSER! Ich weine fast. Aber Roboter weinen nicht. Es ist Kondenswasser.');
    g.remove('flasche_wasser'); g.flag('topf_gegossen', true);
    await g.say('gruenhorn', 'Sieh nur, sie wachsen! Hier, nimm Kräuter und Kamille. Ich schenke sie dir.');
    g.give('kraeuterbund'); g.give('kamille');
    await g.say('kruemel', 'Blau-lila Kräuter. Das klingt nach Gesundheit und Cyberpunk.');
  }

  // ---------------- Museum ----------------
  NN.scenes.museum = {
    id: 'museum', name: 'Museum der analogen Dinge', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_23_museum' }, music: 'mus_klinik',
    bgStates: [
      { if: S => S.flags.kurator_weg, tiers: 'bg_23_museum_alarm' }
    ],
    walk: [[0, 768], [1376, 768], [1376, 700], [1180, 650], [1000, 620], [750, 600], [560, 610], [380, 660], [200, 710], [0, 735]],
    depth: D(595, 768, 0.55, 1.0),
    spawns: { default: [700, 700], park: [700, 700] },
    actors: [{ id: 'staub', name: 'Prof. Staub', x: 470, y: 690, sprite: 'staub', h: 240, hide: S => S.flags.kurator_weg }],
    exits: [bottom('Zum Park', 'park', 'museum', 700)],
    hotspots: [
      {
        id: 'staub', name: 'Prof. Staub', if: S => !S.flags.kurator_weg, poly: R(380, 420, 560, 700), walkTo: [530, 720], facing: 'left',
        look: 'Prof. Staub, der Kurator. Staubig, gelehrt und allergisch gegen alles, was nach Gegenwart riecht.',
        use: async g => {
          await g.say('staub', 'Psst! Dies ist ein Museum. Nichts anfassen, nichts berühren, nichts riechen.');
          await g.say('pixel', 'Ich würde gern an den Wasserhahn …');
          await g.say('staub', 'Das ist ein Original! Das letzte echte Wasser der Stadt! Es darf nicht berührt werden!');
          await g.say('kruemel', 'Dann brauchen wir eine Ablenkung. Er hasst Rauch. Der Rauchmelder da oben …');
        }
      },
      {
        id: 'wasserhahn', name: 'Analoger Wasserhahn', poly: R(800, 230, 975, 410), walkTo: [890, 650], facing: 'up',
        look: 'Ein alter Wasserhahn in einer Glasvitrine. Er tropft echtes Wasser. Daneben ein gelber Streifen: „BITTE NICHT BERÜHREN“.',
        use: async g => {
          if (!g.get('kurator_weg')) return g.say('pixel', 'Prof. Staub schaut mir direkt auf die Finger. Ich brauche eine Ablenkung.');
          if (g.get('gab_flasche_wasser')) return g.say('pixel', 'Ich habe das Wasser schon. Der Rest ist Kunst.');
          if (!g.has('flasche')) return g.say('pixel', 'Ich brauche ein Gefäß, in dem ich das Wasser transportieren kann.');
          await g.say('pixel', 'Prof. Staub ist abgelenkt. Jetzt schnell die Flasche füllen.');
          g.remove('flasche'); g.give('flasche_wasser');
          await g.say('kruemel', 'Echtes Wasser! Fühlt sich verboten an.');
        },
        useWith: {
          flasche: async g => {
            if (!g.get('kurator_weg')) return g.say('staub', 'Fassen Sie nichts an! Ich beobachte Sie!');
            await g.say('pixel', 'Prof. Staub ist weg. Jetzt schnell die Flasche füllen.');
            g.remove('flasche'); g.give('flasche_wasser');
            await g.say('kruemel', 'Echtes Wasser! Fühlt sich verboten an.');
          },
          _default: async g => g.say('pixel', 'Das gehört nicht ans Wasser.')
        }
      },
      {
        id: 'rauchmelder', name: 'Rauchmelder', poly: R(815, 15, 940, 100), walkTo: [890, 650], facing: 'up',
        look: 'Ein Rauchmelder an der Decke. Er blinkt rot. Er scheint auf etwas zu warten.',
        use: 'Der hängt viel zu hoch. Aber vielleicht kann jemand hinfliegen, der Rauch macht …',
        useWith: {
          kruemel: async g => {
            if (g.get('kurator_weg')) return g.say('kruemel', 'Der Alarm ist schon vorbei. Der Kurator ist weg.');
            if (g.get('kruemel_leer') && !g.get('kruemel_geladen')) return g.say('kruemel', 'Kein Akku. Nicht mal Rauch kann ich dir anbieten.');
            await g.say('pixel', 'Krümel, mach etwas Qualm unter dem Rauchmelder.');
            await g.say('kruemel', 'Mit Vergnügen. Ich röste mich selbst. Dreißig Sekunden maximal.');
            await g.say('kruemel', '(Er fliegt zum Rauchmelder und lässt Toast aufsteigen. Ein furchtbarer Alarm schrillt.)');
            await g.say('staub', 'ALARM! FEUER! DAS ERBGUT! ICH MUSS DEN LÖSCHER HOLEN!');
            g.flag('kurator_weg', true);
            await g.say('pixel', 'Prof. Staub rennt davon. Der Wasserhahn ist unbewacht!');
          },
          _default: async g => g.say('pixel', 'Das hilft dem Rauchmelder nicht.')
        }
      },
      look('vitrine1', 'Plattenspieler', R(0, 195, 225, 700), 'Ein Plattenspieler unter Glas. Er spielte einmal Musik, die nicht von einer KI stammte.'),
      look('vitrine2', 'Telefon', R(195, 325, 365, 620), 'Ein Wählscheibentelefon. Zum Telefonieren musste man tatsächlich wählen. Mit dem Finger. Wahnsinn.'),
      look('vitrine3', 'Röhrenfernseher', R(330, 195, 525, 575), 'Ein Röhrenfernseher mit Schneegestöber. Er zeigt das Fernsehprogramm von gestern.'),
      look('vitrine4', 'Disketten', R(1260, 225, 1376, 740), 'Ein Stapel Disketten. Das waren die Speichersticks der Steinzeit. Jede hatte 1,44 Megabyte Hoffnung.'),
      look('regal', 'Regal mit Zahnrädern', R(700, 225, 1180, 400), 'Ein Regal voller Zahnräder und ein Plüschbär. Der Bär wirkt verloren zwischen Maschinen.')
    ],
    onEnter: async g => {
      if (g.get('museum_besucht')) return;
      g.flag('museum_besucht', true);
      await g.say('pixel', 'Das Museum der analogen Dinge. Hier liegen Dinge herum, die früher einmal alltäglich waren.');
    }
  };

  // ---------------- Revier 404 ----------------
  NN.scenes.revier = {
    id: 'revier', name: 'Polizeirevier 404', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_24_revier' }, music: 'mus_mittelstadt',
    bgStates: [
      { if: S => S.flags.gab_platin_pass, tiers: 'bg_24_revier_pass_weg' }
    ],
    walk: [[0, 768], [1376, 768], [1376, 700], [1180, 660], [1000, 640], [800, 630], [600, 650], [350, 700], [150, 740], [0, 750]],
    depth: D(625, 768, 0.6, 1.0),
    spawns: { default: [700, 710], plaza: [700, 710] },
    actors: [{ id: 'stefan', name: 'Stempel-Stefan', x: 470, y: 480, drawY: 426, clipPoly: [[0, 0], [1376, 0], [1376, 398], [700, 398], [450, 418], [300, 445], [0, 445]], sprite: 'stefan', scale: 0.85, h: 190 }],
    exits: [bottom('Zur Plaza', 'plaza', 'revier', 700)],
    hotspots: [
      {
        id: 'stefan', name: 'Stempel-Stefan', poly: R(330, 285, 540, 480), walkTo: [470, 640], facing: 'up',
        look: 'Stempel-Stefan, Beamter. Er stempelt, wenn er atmet, und atmet, wenn er stempelt.',
        use: async g => {
          if (g.get('gab_platin_pass')) return g.say('stefan', 'Der Pass gehört Ihnen. Viel Spaß in der Oberstadt. Und: Bitte stempeln Sie auch dort.');
          if (!g.get('stefan_gesprochen')) { g.flag('stefan_gesprochen', true); await g.say('stefan', 'Fundbüro Revier 404. Hier geht nichts verloren, es kommt nur woanders an.'); }
          await g.say('pixel', 'Ich habe gehört, hier liegt ein Platin-Pass mit einem Wappen von Chrom.');
          await g.say('stefan', 'Richtig. Besitzer unbekannt. Er kann nur gegen Verlustmeldung 404-B und Wappen-Beweis ausgegeben werden.');
          await g.say('stefan', 'Das Formular finden Sie im Büro bei NoodleCorp. Für das Wappen brauchen Sie ein fälschungssicheres Siegel. Das heißt: Holo-Siegel.');
          await g.say('kruemel', 'Zeitung … Wappen … Holo-Drucker …');
        },
        useWith: {
          formular_404b: async g => {
            if (g.get('formular_ok')) return g.say('stefan', 'Das Formular habe ich schon abgestempelt.');
            await g.say('stefan', '(Er stempelt gewissenhaft.) Formular 404-B, korrekt ausgefüllt. Nur ein Fehler: Ihr Name fehlt. Egal. Ich stemple trotzdem.');
            g.remove('formular_404b'); g.flag('formular_ok', true);
            await pruefePass(g);
          },
          holo_siegel: async g => {
            if (g.get('siegel_ok')) return g.say('stefan', 'Das Siegel habe ich schon.');
            await g.say('stefan', 'Ein Holo-Siegel mit dem Wappen von Chrom! Die Beschreibung stimmt auf das Haar.');
            g.remove('holo_siegel'); g.flag('siegel_ok', true);
            await pruefePass(g);
          },
          _default: async g => g.say('stefan', 'Das ist kein Formular. Das ist … eine Zumutung.')
        }
      },
      {
        id: 'vitrine', name: 'Vitrine mit Platin-Pass', poly: R(1075, 240, 1350, 640), walkTo: [1100, 700], facing: 'up',
        look: 'In der Vitrine liegt ein glitzernder Platin-Pass auf einem Samtkissen. Er trägt das Wappen von Chrom. „Besitzer unbekannt“.',
        use: async g => {
          if (g.get('gab_platin_pass')) return g.say('pixel', 'Die Vitrine ist jetzt leer. Der Pass ist bei mir.');
          await g.say('pixel', 'Die Vitrine ist abgeschlossen. Nur Stefan darf sie öffnen.');
        }
      },
      look('stempel', 'Riesiger Stempel', R(380, 295, 510, 470), 'Ein riesiger Holzstempel. Er sieht aus, als könnte er ein Schicksal besiegeln und die Kündigung dazu.'),
      look('regale', 'Fundkisten', R(25, 120, 590, 590), 'Regale voller Kisten: „Found: Purses“, „Lost: Data-Stars“, „Cyber-Chickens“. Das Revier hat Humor oder Hühner.'),
      look('fahndung', 'Fahndungsplakate', R(790, 115, 1130, 350), 'Fahndungsplakate: „Wanted: Dino-Thief“, „Cable-Snipper“. Offenbar das Hauptgeschäft des Reviers.'),
      look('socke', 'Einsame Socke', R(740, 410, 800, 475), 'Eine einzelne Socke am Tresen. Ich vermute eine Verbindung zum Waschbären.')
    ],
    onEnter: async g => {
      if (g.get('revier_besucht')) return;
      g.flag('revier_besucht', true);
      await g.say('pixel', 'Revier 404. Man erwartet hier nichts. Und wird nicht enttäuscht.');
    }
  };

  async function pruefePass(g) {
    if (g.get('formular_ok') && g.get('siegel_ok')) {
      await g.say('stefan', 'Formular abgestempelt, Wappen bestätigt. Hier haben Sie den Platin-Pass.');
      g.give('platin_pass');
      await g.say('pixel', 'Mit diesem Pass komme ich in die Oberstadt!');
    } else if (g.get('formular_ok')) {
      await g.say('stefan', 'Jetzt noch der Wappen-Beweis, dann bekommen Sie den Pass.');
    } else {
      await g.say('stefan', 'Jetzt noch die Verlustmeldung 404-B, dann bekommen Sie den Pass.');
    }
  }

  // ---------------- Gondel-Station ----------------
  NN.scenes.gondel = {
    id: 'gondel', name: 'Gondel-Station „Himmelfahrt“', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_25_gondel' }, music: 'mus_oberstadt',
    bgStates: [
      { if: S => S.flags.gondel_frei, tiers: 'bg_25_gondel_frei' }
    ],
    walk: [[0, 768], [1376, 768], [1376, 690], [1150, 650], [900, 625], [700, 640], [520, 690], [300, 700], [120, 730], [0, 745]],
    depth: D(625, 768, 0.65, 1.0),
    spawns: { default: [500, 710], plaza: [500, 710], promenade: [800, 640] },
    actors: [{ id: 'klaus', name: 'Türsteher Klaus', x: 700, y: 650, sprite: 'klaus', h: 260 }],
    exits: [
      { id: 'ex_plaza', name: 'Zurück zur Plaza', poly: R(0, 738, 330, 768), walkTo: [150, 766], to: 'plaza', spawn: 'gondel', arrow: 'down' },
      { id: 'ex_promenade', name: 'Gondel nach Ober-Heights', if: S => S.flags.gondel_frei, poly: R(680, 300, 1090, 590), walkTo: [880, 640], to: 'promenade', spawn: 'gondel', arrow: 'up' }
    ],
    hotspots: [
      {
        id: 'klaus', name: 'Türsteher Klaus', poly: R(610, 400, 790, 660), walkTo: [660, 710], facing: 'right',
        look: 'Türsteher Klaus. Ein Roboter aus Samt und Muskeln. Er schaut dich an, als würde er nach Kreditwürdigkeit scannen.',
        use: async g => {
          if (g.get('gondel_frei')) return g.say('klaus', 'Die Gondel wartet. Viel Spaß in der Oberstadt. Und: Bitte hinterlassen Sie dort keinen Eindruck.');
          await g.say('klaus', 'Himmelfahrt. Nur für Gäste mit Platin-Pass und angemessener Garderobe.');
          if (!g.has('platin_pass')) return g.say('pixel', 'Ich … habe noch keinen Pass. Aber ich arbeite daran.');
          if (!g.get('gala_look')) return g.say('klaus', 'Sie haben den Pass, aber nicht die Garderobe. Diese Jacke ist keine Garderobe, sondern ein Unfall.');
          await g.say('klaus', '(Er scannt den Pass.) Platin-Pass, Wappen von Chrom, Gala-Look: Mutter Natur und Mode haben Sie geküsst.');
          g.flag('gondel_frei', true);
          await g.say('klaus', 'Bitte einsteigen. Die Gondel fährt in die Oberstadt.');
          await g.actEnd('Ende von Akt 2', 'Du hast Mittel-Heights hinter dir gelassen. Über den Wolken wartet die Oberstadt, und irgendwo darüber der Mond.');
          await g.goto('promenade', 'gondel');
        },
        useWith: {
          platin_pass: async g => { g.flag('pass_gezeigt', true); await g.say('pixel', 'Hier ist mein Pass.'); NN.scenes.gondel.hotspots[0].use(g); },
          _default: async g => g.say('klaus', 'Das ist kein Ausweis. Das ist … Ausdruck von Verzweiflung.')
        }
      },
      look('schild', 'Schild „Platform Access“', R(535, 510, 685, 670), 'Ein Schild: „Platform Access – Upper City only“. Darunter, kaum lesbar: „Und wer es sich leisten kann“.'),
      look('kabine', 'Gondelkabine', R(680, 300, 1090, 590), 'Eine gläserne Gondelkabine. Wer darin sitzt, hat entweder viel Geld oder viel zu verbergen.'),
      look('station', 'Stationsgebäude', R(5, 20, 640, 600), 'Das Gebäude „HIMMELFAHRT“. Die Fassade ist geschmückt mit Gold. Und mit einem Flügelauto.'),
      look('muelleimer', 'Goldener Mülleimer', R(900, 530, 1005, 660), 'Ein goldener Mülleimer. In der Oberstadt wirft man selbst Müll mit Stil weg.'),
      look('wolken', 'Schwebende Stadt', R(1000, 0, 1376, 380), 'Ober-Heights schwebt über den Wolken. Es sieht so unwirklich schön aus, dass es fast wehtut.')
    ],
    onEnter: async g => {
      if (g.get('gondel_besucht')) return;
      g.flag('gondel_besucht', true);
      await g.say('pixel', 'Die Gondel zur Oberstadt. Der Himmel darüber ist zum ersten Mal echt blau.');
    }
  };
})();
