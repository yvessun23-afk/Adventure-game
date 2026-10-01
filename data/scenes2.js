// Szenen Akt 1, Teil 2: Schrottplatz, Bar, Hinterzimmer, Basar, Waschsalon, Bäckerei, Dachgarten, Kanal, Pumpenraum, Bahnhof
(function () {
  const H = NN.sceneHelpers, R = H.R, bottom = H.bottomExit;
  const D = (y0, y1, s0, s1) => ({ y0, y1, s0, s1 });

  // ---------------- Schrottplatz ----------------
  NN.scenes.schrottplatz = {
    id: 'schrottplatz', name: 'Schrottplatz „Rostige Rosi“', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_03_schrottplatz' }, music: 'mus_unterstadt',
    walk: [[130, 760], [1376, 768], [1376, 690], [1180, 650], [1050, 640], [900, 610], [790, 565], [600, 555], [480, 590], [300, 650], [160, 710]],
    depth: D(555, 768, 0.55, 1.0),
    spawns: { default: [700, 700], nudelgasse: [700, 700], kanal: [700, 590] },
    actors: [
      { id: 'rosi', name: 'Rosi', x: 990, y: 690, sprite: 'rosi', h: 374 },
      { id: 'wuschel', name: 'Wuschel', x: 470, y: 705, sprite: S => (S.flags.wuschel_repariert ? 'wuschel_repariert' : 'wuschel_defekt'), h: 140 }
    ],
    exits: [
      bottom('Nudelgasse', 'nudelgasse', 'schrottplatz', 700),
      { id: 'ex_kanal', name: 'Zum Kanal', poly: R(610, 390, 770, 560), walkTo: [690, 585], to: 'kanal_eingang', spawn: 'schrottplatz', arrow: 'up' }
    ],
    hotspots: [
      {
        id: 'rosi', name: 'Rosi', poly: R(880, 400, 1110, 720), walkTo: [900, 730], facing: 'right',
        look: 'Rosi. Halb Roboterin, halb Kran, ganz Schrottplatz. Ihr Schweißerhelm sitzt schief.',
        use: async g => {
          if (!g.get('rosi_gesprochen')) {
            g.flag('rosi_gesprochen', true);
            await g.say('rosi', 'Kind, dein Gesicht ist ein Schaltplan ohne Strom.');
            await g.say('pixel', 'Äh … danke? Ich suche Hinweise zu einem gestohlenen Kristall.');
            await g.say('rosi', 'Wer Kristalle sucht, sollte lernen, wie Magnete denken. Alles zieht sich an. Sogar Ärger.');
          }
          const opts = ['Hast du etwas, das Metall anzieht?', 'Was macht der kaputte Staubsauger da?', 'Tschüss, Rosi.'];
          const i = await g.choose(opts);
          if (i === 0) {
            if (g.get('gab_kranmagnet')) return g.say('rosi', 'Du hast meinen Magneten schon. Bring ihn nur heil zurück. Oder nie.');
            await g.say('rosi', 'Mein Kranmagnet? Den verschenke ich nicht. Mein Schild da oben hat eine Macke: Die Leuchtreklame ist kaputt.');
            await g.say('rosi', 'Bring mir eine leuchtende Röhre, dann tausche ich. Faires Geschäft, unfaire Welt.');
          } else if (i === 1) {
            await g.say('rosi', 'Wuschel? Ein Herz aus Staub. Seine Sicherung ist durchgebrannt. Ohne die läuft er nicht.');
            await g.say('rosi', 'Und wenn er läuft, saugt er alles auf, was man verloren glaubte.');
          } else await g.say('rosi', 'Geh mit Gott, mit Strom oder mit einem Schraubenzieher.');
        },
        useWith: {
          neonroehre: async g => {
            await g.say('pixel', 'Rosi, hier: eine Neonröhre. Flackert noch.');
            await g.say('rosi', 'Ein Licht im Schrott. Ich schäme mich fast, so glücklich zu sein.');
            await g.say('rosi', 'Hier, mein Kranmagnet. Er zieht alles an, was Eisen im Blut hat.');
            g.remove('neonroehre'); g.give('kranmagnet');
          },
          _default: async g => g.say('rosi', 'Das braucht hier niemand. Nicht mal der Schrott.')
        }
      },
      {
        id: 'wuschel', name: 'Wuschel', poly: R(400, 620, 560, 730), walkTo: [560, 745], facing: 'left',
        look: async g => g.say('pixel', g.get('wuschel_repariert') ? 'Wuschel, der Staubsauger. Er schnurrt wie ein glücklicher Föhn.' : 'Ein kaputter Staubsauger-Bot. Er sieht aus, als hätte er den Tag seines Lebens verpasst.'),
        use: async g => { if (g.get('wuschel_repariert')) await g.say('wuschel', 'Fsss! (Er saugt mich liebevoll am Hosenbein.)'); else await g.say('pixel', 'Er rührt sich nicht. Ihm fehlt eine Sicherung.'); },
        useWith: {
          sicherung: async g => {
            if (g.get('wuschel_repariert')) return g.say('pixel', 'Er hat schon eine.');
            await g.say('pixel', 'Wuschel, ich hab was für dich.');
            g.remove('sicherung'); g.flag('wuschel_repariert', true);
            await g.say('wuschel', 'FSSSSSS! (Ein glückliches Motorengeräusch.)');
            await g.say('rosi', 'Du hast ihm ein Herz geschenkt. Jetzt gehört er dir – und der Staub in deiner Tasche.');
            await g.say('pixel', 'Moment, der spuckt etwas aus …');
            g.give('altes_ticket');
            await g.say('kruemel', 'Ein Magnetbahn-Ticket. Zerknittert. Wahrscheinlich seit Jahren abgelaufen.');
          }
        }
      },
      H.look('kran', 'Kran', R(330, 40, 760, 500), 'Ein rostiger Kran mit einer leeren Kette. Der Haken wartet auf seinen Magneten.'),
      H.look('werkbank', 'Werkbank', R(790, 440, 1040, 640), 'Rosis Werkbank. Werkzeug in allen Größen, sogar ein Hammer mit Dienstnummer.'),
      H.look('regal', 'Ersatzteilregal', R(1185, 400, 1376, 690), 'Zahnräder, Platinen und Kabel, nach einem System sortiert, das nur Rosi versteht.'),
      H.look('autowrack', 'Autowrack', R(0, 330, 200, 520), 'Ein rostiges Taxi. Es sieht aus, als hätte es nie Feierabend bekommen.'),
      H.look('schild', 'Schild', R(20, 480, 110, 560), 'Auf dem Schild steht „Don’t feed the Rat-Bots“. Sicher ist sicher.')
    ],
    onEnter: async g => {
      if (g.get('schrott_besucht')) return;
      g.flag('schrott_besucht', true);
      await g.say('pixel', 'Der Schrottplatz. Der Ort, an dem Dinge weiterleben.');
    }
  };

  // ---------------- Bar ----------------
  const bitAfter = (ctx, lx, top, sc, S) => {
    if (!S.flags.bit_wartet) return;
    const w = 150, x = lx - w / 2, y = top - 34;
    ctx.save(); ctx.fillStyle = '#120a22'; ctx.strokeStyle = '#27e6ff'; ctx.lineWidth = 3;
    ctx.fillRect(x, y, w, 22); ctx.strokeRect(x, y, w, 22);
    ctx.fillStyle = '#27e6ff'; ctx.fillRect(x + 3, y + 3, (w - 6) * (0.45 + 0.4 * Math.abs(Math.sin(NN.game.time * 1.5))), 16);
    ctx.restore();
  };

  NN.scenes.bar = {
    id: 'bar', name: 'Hacker-Bar „Null Pointer“', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_04_bar' }, music: 'mus_bar',
    walk: [[40, 768], [1376, 768], [1376, 690], [1290, 625], [1100, 612], [300, 622], [120, 690]],
    depth: D(610, 768, 0.72, 1.05),
    spawns: { default: [1030, 730], nudelgasse: [1030, 730], hinterzimmer: [1190, 660] },
    actors: [{ id: 'bit', name: 'Bit', x: 640, y: 600, clipY: 512, sprite: 'bit', h: 244, after: bitAfter }],
    exits: [bottom('Nudelgasse', 'nudelgasse', 'bar', 1030)],
    hotspots: [
      {
        id: 'bit', name: 'Bit', poly: R(560, 290, 730, 515), walkTo: [640, 660], facing: 'up',
        look: 'Bit, der Barkeeper. Sein Eimer-Kopf blinkt. Er nimmt alles wörtlich.',
        use: async g => {
          if (g.get('bit_wartet')) return g.say('pixel', 'Bit lädt noch. 61 %. Besser nicht stören.');
          if (!g.get('bit_gesprochen')) { g.flag('bit_gesprochen', true); await g.say('bit', 'Willkommen! Was darf ich dir einschenken? Ich hab alles, was du nicht brauchst.'); }
          for (;;) {
            const opts = ['Ich nehme einen Drink mit allem.', 'Kann ich in den Hinterraum?', 'Warte mal kurz!', 'Tschüss.'];
            const i = await g.choose(opts);
            if (i === 0) {
              await g.say('bit', 'Mit allem? Gerne!');
              await g.say('bit', '(Er kippt 14 Flaschen, einen Schraubenschlüssel und ein Gänseblümchen in ein Glas.)');
              await g.say('pixel', 'Ich sagte „mit allem“, nicht „aus allem“.');
              await g.say('bit', 'Das sind 400 Credits. Oder dein linker Schuh.');
            } else if (i === 1) {
              await g.say('bit', 'Der Raum „Personal“? Nur für Personal. Bist du Personal?');
              await g.say('pixel', 'Nein, ich bin Kundschaft.');
              await g.say('bit', 'Dann darfst du nicht rein. Ich nehme alles wörtlich, das weißt du doch.');
            } else if (i === 2) {
              g.flag('bit_wartet', true); g.flag('hinterzimmer_offen', true);
              await g.say('pixel', 'Warte mal kurz!');
              await g.say('bit', 'Warte … mal … kurz … (Ein Ladebalken erscheint auf seiner Brust.)');
              await g.say('kruemel', 'Er hat sich aufgehängt. Wörtlich genommen: Er wartet.');
              await g.say('pixel', 'Bit lädt. Jetzt habe ich Zeit für den Hinterraum.');
              return;
            } else break;
          }
        },
        useWith: { _default: async g => g.say('bit', 'Danke für das Geschenk! Ich stelle es neben die anderen Dinge, die ich nicht verstehe.') }
      },
      {
        id: 'personal', name: 'Tür „Personal“', poly: R(1120, 330, 1265, 615), walkTo: [1190, 660], facing: 'up',
        look: 'Eine schwere Metalltür mit der Aufschrift „PERSONAL“. Dahinter kann nur Wichtiges liegen. Oder Wäsche.',
        use: async g => {
          if (!g.get('hinterzimmer_offen')) return g.say('pixel', 'Zu. Und Bit guckt mich an. Ich muss ihn irgendwie loswerden.');
          await g.goto('bar_hinterzimmer', 'bar');
        }
      },
      H.look('arcade1', 'Arcade 2000', R(10, 370, 190, 690), 'Ein Spielautomat namens „Arcade 2000“. Der Bildschirm zeigt nur Schneegestöber. Oder Schnee aus dem Jahr 2000.'),
      H.look('arcade2', 'Glitch Gator', R(190, 380, 290, 690), '„Glitch Gator“: Ein Alligator, der sich nicht entscheiden kann, ob er Pixel oder Panzer ist.'),
      H.look('screens', 'Bildschirme', R(300, 150, 1080, 350), 'Monitore unter der Decke, alle mit Fehlermeldungen. Vermutlich der Stammgast dieser Bar.'),
      H.look('flaschen', 'Flaschenregale', R(460, 240, 1030, 490), 'Flaschen in allen Farben, die es in der Natur nicht gibt.'),
      H.look('kasse', 'Kasse', R(360, 410, 460, 500), 'Eine uralte Registrierkasse. Sie zeigt „ERROR 404: TRINKGELD NOT FOUND“.')
    ],
    onEnter: async g => {
      if (g.get('bar_besucht')) return;
      g.flag('bar_besucht', true);
      await g.say('pixel', 'Null Pointer. Die Bar, in der jeder Gast auf irgendetwas zeigt, das nicht existiert.');
    }
  };

  // ---------------- Bar-Hinterzimmer ----------------
  NN.scenes.bar_hinterzimmer = {
    id: 'bar_hinterzimmer', name: 'Bar-Hinterzimmer', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_05_bar_hinterzimmer' }, music: 'mus_bar',
    walk: [[0, 768], [1376, 768], [1376, 690], [1200, 615], [1000, 622], [660, 605], [560, 650], [250, 690], [0, 730]],
    depth: D(600, 768, 0.65, 1.0),
    spawns: { default: [900, 700], bar: [900, 700] },
    props: [
      { draw: (ctx, L, S) => NN.drawProp(S.flags.terminal_log ? 'terminal_an' : (S.flags.kabel_angeschlossen ? 'terminal_an' : 'terminal_aus'), 820, 382, 160) },
      { if: S => S.flags.kabel_angeschlossen, draw: () => NN.drawProp('kabel_verbunden', 1255, 560, 160) }
    ],
    exits: [bottom('Bar', 'bar', 'hinterzimmer', 700)],
    hotspots: [
      {
        id: 'terminal', name: 'Terminal', poly: R(740, 250, 905, 390), walkTo: [820, 650], facing: 'up',
        look: async g => g.say('pixel', g.get('kabel_angeschlossen') ? 'Ein Terminal aus der Steinzeit. Es ist bereit für Befehle.' : 'Ein altes Terminal. Es ist tot. Das Kabel zum Netzwerk ist durchgebissen.'),
        use: async g => {
          if (!g.get('kabel_angeschlossen')) return g.say('pixel', 'Kein Netz. Das Kabel an der Steckdose rechts ist durchgebissen. Ich brauche ein neues.');
          if (g.get('gab_log_stick')) return g.say('pixel', 'Den Log habe ich schon kopiert. Hacker lassen nie Spuren.');
          await g.say('terminal', 'PASSWORT EINGEBEN:');
          const opts = ['Nudelsuppe', 'Erdnuss-Chili', 'Kristall', 'Passwort123'];
          const i = await g.choose(opts);
          if (i !== 1) { NN.audio.fail(); return g.say('terminal', 'ZUGRIFF VERWEIGERT. (Ich sehe, du hast es mit „' + opts[i] + '“ versucht.)'); }
          if (!g.get('passwort_bekannt')) await g.say('pixel', 'Erdnuss-Chili … einfach geraten. Ich sollte öfter raten.');
          await g.say('terminal', 'ZUGRIFF GEWÄHRT. LIEFERDROHNEN-LOG GEFUNDEN. KOPIEREN? (Speichermedium nötig)');
          if (!g.has('speicherstick')) return g.say('pixel', 'Ich brauche einen Speicherstick zum Kopieren.');
          g.flag('terminal_log', true); g.remove('speicherstick'); g.give('log_stick');
          await g.say('pixel', 'Kopiert. Drohne NC-07, Start: NoodleCorp Tower, Auftraggeber: „Kleo“.');
          await g.say('kruemel', 'Kleo? Nie gehört. Aber ich mag den Namen.');
        },
        useWith: {
          glasfaserkabel: async g => {
            if (g.get('kabel_angeschlossen')) return g.say('pixel', 'Es ist schon verbunden.');
            g.remove('glasfaserkabel'); g.flag('kabel_angeschlossen', true);
            await g.say('pixel', 'Ich ziehe das durchgebissene Stück raus und stecke das neue Kabel an.');
            await g.say('kruemel', 'Das Terminal flackert. Es lebt.');
          },
          speicherstick: async g => g.say('pixel', 'Ohne Netz und Passwort nützt der Stick nichts. Erst das Terminal zum Leben erwecken.'),
          _default: async g => g.say('pixel', 'Das Terminal mag das nicht.')
        }
      },
      H.look('dose', 'Netzwerkdose', R(1200, 460, 1275, 530), 'Eine Netzwerkdose. Früher steckte ein Kabel drin, bis etwas daran geknabbert hat.'),
      H.look('server', 'Server-Racks', R(40, 10, 540, 640), 'Serverracks voller Kabel. Hier wohnt ein Kabelsalat, der ein Eigenleben führt.'),
      H.look('kartons', 'Kartons', R(680, 420, 1150, 625), 'Kartons mit der Aufschrift „Nicht hacken“. Sicher sind sie voller Hacker-Sachen.'),
      H.look('lampe', 'Schreibtischlampe', R(905, 240, 1005, 380), 'Eine Schreibtischlampe. Sie ist das einzige Wesen hier, das Licht ins Dunkel bringt.')
    ],
    onEnter: async g => {
      if (g.get('hinterzimmer_besucht')) return;
      g.flag('hinterzimmer_besucht', true);
      await g.say('pixel', 'Der Hinterraum. Hier stehen Dinge, über die man nicht spricht.');
      await g.say('kruemel', 'Und Dinge, die man hackt.');
    }
  };

  // ---------------- Basar ----------------
  NN.scenes.basar = {
    id: 'basar', name: 'Schwarzer Basar', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_06_basar' }, music: 'mus_unterstadt',
    walk: [[120, 768], [1376, 768], [1376, 660], [1230, 600], [950, 590], [560, 572], [330, 602], [180, 680]],
    depth: D(570, 768, 0.6, 1.0),
    spawns: { default: [700, 700], nudelgasse: [700, 700], bahnhof: [1220, 610] },
    actors: [{ id: 'hugo', name: 'Hehler-Hugo', x: 735, y: 600, clipY: 500, sprite: 'hugo', h: 241 }],
    exits: [
      bottom('Nudelgasse', 'nudelgasse', 'basar', 700),
      { id: 'ex_bahn', name: 'Magnetbahn-Station', poly: R(1110, 250, 1330, 540), walkTo: [1220, 610], to: 'bahnhof', spawn: 'basar', arrow: 'right' }
    ],
    hotspots: [
      {
        id: 'hugo', name: 'Hehler-Hugo', poly: R(630, 240, 850, 500), walkTo: [740, 650], facing: 'up',
        look: 'Hehler-Hugo. Vier Arme, tausend Taschen. Er verkauft alles, nur nicht sein Lächeln.',
        use: async g => {
          if (!g.get('hugo_gesprochen')) { g.flag('hugo_gesprochen', true); await g.say('hugo', 'Psst! Suchst du was Besonderes? Ich hab alles. Auch das, was es nicht mehr gibt.'); }
          const opts = ['Was tauschst du so?', 'Hast du etwas für einen müden Toaster?', 'Tschüss.'];
          const i = await g.choose(opts);
          if (i === 0) { await g.say('hugo', 'Ich tausche Dinge gegen Dinge. Geld ist nur Papier mit Hoffnung.'); await g.say('hugo', 'Zurzeit bin ich auf der Suche nach etwas Seltenem: echter Suppenpaste. Seit der Krise Sammlerware!'); }
          else if (i === 1) {
            await g.say('hugo', 'Ein Toaster braucht Saft. Ich hätte da eine Powerbank. Sie kostet dich eine Probe dieser grauen Paste.');
            await g.say('kruemel', 'Bitte. Ich bin ein sehr müder Toaster.');
          }
        },
        useWith: {
          graue_paste: async g => {
            await g.say('pixel', 'Hugo, ich hätte eine Probe dieser grauen Paste.');
            await g.say('hugo', 'Die echte! Seit Tagen die einzige auf dem Markt! Ich bin gerührt. Ich sammle das Zeug.');
            g.remove('graue_paste'); g.give('powerbank');
            await g.say('hugo', 'Hier, deine Powerbank. Eine Freundschaft fürs Leben. Oder bis zur nächsten Preisrunde.');
            await g.say('pixel', 'Krümel, nimm einen Schluck.');
            g.flag('kruemel_geladen', true); g.flag('schnellreise', true);
            await g.say('kruemel', 'AAAAH! 100 Prozent! Ich fliege, ich toaste, ich liebe dich alle!');
            await g.say('kruemel', 'Und jetzt kann ich dich auf der Karte überallhin fliegen. Schnellreise freigeschaltet.');
            g.toast('Schnellreise freigeschaltet! Öffne die Karte (M).');
          },
          _default: async g => g.say('hugo', 'Kein Interesse. Bring mir Seltenes.')
        }
      },
      H.look('stand_links', 'Marktstand', R(10, 180, 330, 650), 'Ein Stand mit seltsamen Fläschchen und geheimnisvollen Beuteln. Alles mit Garantie auf nichts.'),
      H.look('stand_mitte', 'Marktstand', R(370, 290, 600, 560), 'Ein Stand mit Schrott, der sich für Antiquitäten hält.'),
      H.look('stand_rechts', 'Marktstand', R(940, 290, 1120, 580), 'Ein Stand mit Tüchern und Plunder. Ein Tuch sieht aus wie ein Bademantel für Laternen.'),
      H.look('schluessel', 'Neon-Schraubenschlüssel', R(760, 395, 860, 440), 'Ein Neon-Schraubenschlüssel. Er leuchtet, damit man weiß, dass er teuer ist.')
    ],
    onEnter: async g => {
      if (g.get('basar_besucht')) return;
      g.flag('basar_besucht', true);
      await g.say('pixel', 'Der Schwarze Basar. Hier wird alles verkauft, was es offiziell nicht gibt.');
    }
  };

  // ---------------- Waschsalon ----------------
  NN.scenes.waschsalon = {
    id: 'waschsalon', name: 'Waschsalon „Waschbär“', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_07_waschsalon' }, music: 'mus_unterstadt',
    walk: [[0, 768], [1376, 768], [1376, 700], [1100, 600], [700, 548], [520, 548], [330, 600], [120, 690], [0, 740]],
    depth: D(545, 768, 0.6, 1.0),
    spawns: { default: [700, 700], nudelgasse: [700, 700], dachgarten: [1230, 640] },
    props: [
      { if: S => S.flags.sicherungskasten_offen && !S.flags.gab_sicherung, draw: () => NN.drawProp('sicherungskasten_offen_heiss', 155, 405, 260) },
      { if: S => S.flags.sicherungskasten_offen && S.flags.gab_sicherung, draw: () => NN.drawProp('sicherungskasten_offen_leer', 155, 405, 260) }
    ],
    exits: [
      bottom('Nudelgasse', 'nudelgasse', 'waschsalon', 700),
      { id: 'ex_treppe', name: 'Treppe zum Dachgarten', poly: R(1125, 330, 1350, 600), walkTo: [1230, 650], to: 'dachgarten', spawn: 'waschsalon', arrow: 'up' }
    ],
    hotspots: [
      {
        id: 'sicherung', name: 'Sicherungskasten', poly: R(55, 135, 245, 405), walkTo: [170, 650], facing: 'up',
        look: 'Ein Sicherungskasten. Auf dem Schild steht „Do not open“. Mein Lieblingssatz.',
        use: async g => {
          if (!g.get('sicherungskasten_offen')) { g.flag('sicherungskasten_offen', true); await g.say('pixel', 'Ich öffne den Kasten natürlich trotzdem.'); await g.say('pixel', 'Eine Sicherung glüht hell wie ein kleiner Toaster. Ich sollte sie nicht mit den Fingern anfassen.'); return; }
          if (g.get('gab_sicherung')) return g.say('pixel', 'Der Kasten ist leer. Die Waschmaschinen nehmen es mir hoffentlich nicht übel.');
          await g.say('pixel', 'Die Sicherung ist heiß. Ich brauche etwas, um sie herauszuziehen. Eine Zange, zwei Stäbe …');
        },
        useWith: {
          essstaebchen: async g => {
            if (!g.get('sicherungskasten_offen')) return g.say('pixel', 'Erst den Kasten öffnen, dann fummeln.');
            if (g.get('gab_sicherung')) return g.say('pixel', 'Der Kasten ist schon leer.');
            await g.say('pixel', 'Mit den Essstäbchen als Zange … vorsichtig … und – geschafft!');
            g.give('sicherung');
            await g.say('pixel', 'Die ist noch warm. Rosis Wuschel wird sich freuen.');
          }
        }
      },
      {
        id: 'korb', name: 'Wäschekorb', poly: R(95, 480, 375, 710), walkTo: [250, 745], facing: 'up',
        look: 'Ein Korb voller Wäsche ohne Besitzer. Zwischen den Hemden lugt eine einzelne Socke hervor.',
        use: async g => {
          if (g.get('gab_speicherstick')) return g.say('pixel', 'Ich habe genug fremde Wäsche berührt.');
          await g.say('pixel', 'Eine einzelne gestreifte Socke. Sie riecht nach Vergangenheit.');
          await g.say('pixel', '… und da steckt etwas drin. Ein Speicherstick! Wer versteckt denn so etwas in einer Socke?');
          await g.say('kruemel', 'Jemand mit Geheimnissen. Oder sehr kalten Füßen.');
          g.give('speicherstick');
        }
      },
      H.look('waschmaschinen', 'Waschmaschinen', R(580, 215, 1085, 540), 'Acht Waschmaschinen. Keine funktioniert ohne Münzen. Meine Hosentaschen sind leider leer.'),
      H.look('uhr', 'Uhr', R(320, 65, 440, 220), 'Eine Uhr aus Zahnrädern. Sie geht vor, hinterher und manchmal seitwärts.'),
      H.look('stuehle', 'Plastikstühle', R(295, 385, 590, 610), 'Drei Plastikstühle in Pink, Türkis und Mut. Hier wartet man ewig.'),
      H.look('zeitung', 'Zeitung', R(740, 690, 960, 768), 'Eine aufgeschlagene Zeitung. Die Schlagzeile: „Suppenkrise – Stadt schweigt und isst Paste.“')
    ],
    onEnter: async g => {
      if (g.get('wasch_besucht')) return;
      g.flag('wasch_besucht', true);
      await g.say('pixel', 'Der Waschbär. Hier verschwinden Socken. Und manchmal auch Geheimnisse.');
    }
  };

  // ---------------- Bäckerei ----------------
  NN.scenes.baeckerei = {
    id: 'baeckerei', name: 'Bäckerei „Zum knusprigen Byte“', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_08_baeckerei' }, music: 'mus_unterstadt',
    walk: [[100, 768], [1376, 768], [1376, 690], [1200, 650], [900, 612], [650, 592], [450, 602], [300, 642], [120, 722]],
    depth: D(590, 768, 0.65, 1.0),
    spawns: { default: [650, 700], nudelgasse: [650, 700] },
    actors: [{ id: 'brezel', name: 'Brezel', x: 1000, y: 600, clipY: 497, sprite: 'brezel', h: 245 }],
    exits: [bottom('Nudelgasse', 'nudelgasse', 'baeckerei', 650)],
    hotspots: [
      {
        id: 'brezel', name: 'Brezel', poly: R(900, 300, 1110, 497), walkTo: [1000, 660], facing: 'up',
        look: 'Bäcker Brezel. Ein Roboter in Brezelform mit Mehl im Gesicht. Er liebt Brot mehr als Menschen.',
        use: async g => {
          if (!g.get('brezel_gesprochen')) { g.flag('brezel_gesprochen', true); await g.say('brezel', 'Willkommen im knusprigen Byte! Bei uns bekommst du echtes Brot. Verbotenes Brot. Das Beste.'); }
          if (g.get('gab_baguette')) return g.say('brezel', 'Viel Spaß mit dem Baguette! Bitte nicht vor der Polizei essen.');
          await g.say('brezel', 'Ach, und mein Mehlsieb ist kaputt. Ich kann kein Brot mehr backen. Es ist eine Tragödie in Mehl.');
          await g.say('pixel', 'Ich habe ein Sieb. Bräuchte aber dafür ein Baguette.');
          await g.say('brezel', 'Ein Sieb! Gegen ein Baguette? Das Geschäft meines Lebens!');
        },
        useWith: {
          nudelsieb: async g => {
            await g.say('pixel', 'Hier, ein Nudelsieb. Ein bisschen mehlig war es nie, aber es tut seinen Dienst.');
            await g.say('brezel', 'Ein Sieb mit Lochmuster aus Liebe! Hier, dein Baguette. Frisch, knusprig, illegal.');
            g.remove('nudelsieb'); g.give('baguette');
            await g.say('kruemel', 'Darf ich?');
          },
          _default: async g => g.say('brezel', 'Kein Mehl, kein Sieb, kein Interesse.')
        }
      },
      H.look('regale', 'Brotregale', R(10, 50, 440, 640), 'Regale voller Brot. Echtes, knuspriges, verbotenes Brot. Mir läuft das Wasser im Mund zusammen.'),
      H.look('ofen', 'Steinofen', R(560, 240, 870, 620), 'Ein Backofen aus Ziegelsteinen. Es knistert gemütlich und riecht nach Kindheit.'),
      H.look('sieb', 'Kaputtes Mehlsieb', R(860, 210, 940, 440), 'Ein Mehlsieb mit einem Loch. Im Sieb sollte eigentlich nichts durchfallen.'),
      H.look('kasse', 'Kasse', R(1080, 330, 1290, 510), 'Eine goldene Registrierkasse mit Röhrendisplay. Sie zählt vermutlich nur Brötchen.'),
      H.look('neon', 'Neon-Brezel', R(1010, 70, 1280, 300), 'Die Neon-Brezel ist größer als mein Appetit. Fast.'),
      H.look('mehlsack', 'Mehlsack', R(420, 455, 520, 580), 'Ein smarter Mehlsack mit Display. „Füllstand: Panik“.')
    ],
    onEnter: async g => {
      if (g.get('baeckerei_besucht')) return;
      g.flag('baeckerei_besucht', true);
      await g.say('pixel', 'Echtes Brot … ich wusste gar nicht mehr, wie das riecht.');
    }
  };

  // ---------------- Dachgarten ----------------
  NN.scenes.dachgarten = {
    id: 'dachgarten', name: 'Tauben-Dachgarten', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_09_dachgarten' }, music: 'mus_dach',
    walk: [[260, 768], [1376, 768], [1376, 690], [1200, 650], [930, 585], [600, 585], [420, 602], [260, 652]],
    depth: D(585, 768, 0.6, 1.0),
    spawns: { default: [975, 640], waschsalon: [975, 640] },
    actors: [{ id: 'kurt', name: 'Kurt', x: 690, y: 665, sprite: 'kurt', h: 226 }],
    exits: [{ id: 'ex_luke', name: 'Zurück zum Waschsalon', poly: R(925, 430, 1015, 565), walkTo: [975, 610], to: 'waschsalon', spawn: 'dachgarten', arrow: 'down' }],
    hotspots: [
      {
        id: 'kurt', name: 'Kurt', poly: R(590, 440, 800, 680), walkTo: [860, 700], facing: 'left',
        look: 'Kurt, der Taubenboss. Goldkette, Monokel, Zigarre. Die Unterwelt der Lüfte.',
        use: async g => {
          if (!g.get('kurt_gesprochen')) { g.flag('kurt_gesprochen', true); await g.say('kurt', 'Wer stört die Ruhe der Datentauben? Ich habe Flüge zu koordinieren.'); }
          if (g.get('gab_stempel')) return g.say('kurt', 'Wir sind quitt. Fliegen lernt man nicht an einem Tag.');
          const opts = ['Ich suche einen Stempel.', 'Hast du etwas, womit man ein Ticket gültig macht?', 'Tschüss.'];
          const i = await g.choose(opts);
          if (i === 0 || i === 1) {
            await g.say('kurt', 'Einen Stempel? Die Datentauben sammeln alles, was glänzt oder amtlich aussieht.');
            await g.say('kurt', 'Aber nichts gibt es umsonst. Ich will richtiges Brot. Knusprig. Getoastet. Und einen Beweis, dass du nicht von der Polizei bist.');
          }
        },
        useWith: {
          zhang_chip: async g => {
            await g.say('kurt', 'Zhang-Null! Die Legende! Sie hat meiner Großmutter mal die Flugroute gehackt! Du bist also vertrauenswürdig.');
            await g.say('kurt', 'Nun brauche ich nur noch knuspriges Brot.');
            g.flag('kurt_vertraut', true);
          },
          knuspertoast: async g => {
            if (!g.get('kurt_vertraut') && !g.has('zhang_chip')) return g.say('kurt', 'Toast? Schön. Aber wer bist du überhaupt? Ohne Referenz läuft hier nichts.');
            await g.say('pixel', 'Bitteschön: frischer, knuspriger Toast.');
            await g.say('kurt', '(Er kostet.) Ein Meisterwerk. Ich verspreche dir nichts, aber ich gebe dir etwas.');
            g.remove('knuspertoast'); g.give('stempel');
            await g.say('kurt', 'Ein Stempel „GÜLTIG“. Die Schaffner-Bots lieben das Ding. Wir haben ihn einem Bahnhof abgenommen. Niemand hat es bemerkt.');
          },
          _default: async g => g.say('kurt', 'Nicht interessant. Bring mir Brot.')
        }
      },
      H.look('hochhaeuser', 'Stadt', R(430, 100, 900, 330), 'Die Stadt bei Nacht. Schön, bis man merkt, dass sie nach Suppe riecht und nach Sorge.'),
      H.look('thron', 'Taubenthron', R(540, 340, 830, 590), 'Ein Thron aus Kisten, Kabeln und Bunten Tüchern. Er sieht unbequem und würdevoll zugleich aus.'),
      H.look('kaefige', 'Taubenschläge', R(120, 210, 420, 610), 'Kistenstapel mit Gitterfenstern. Die Datentauben wohnen hier in Reihenhäusern.'),
      H.look('tuer', 'Tür „Rooftop“', R(1145, 240, 1310, 650), 'Eine Tür mit der Aufschrift „Rooftop“. Sie führt auf ein anderes Dach. Nicht heute.'),
      H.look('schild', 'Schild „Garden of Gadgets“', R(850, 280, 1035, 375), 'Ein Schild: „Garden of Gadgets“. Wer hier Pflanzen sieht, hat noch nie Platinen gegossen.'),
      H.look('pflanzen', 'Pflanzen', R(1000, 20, 1376, 200), 'Pflanzen, Platinen und Geranien. Ein Garten, der Strom braucht.')
    ],
    onEnter: async g => {
      if (g.get('dach_besucht')) return;
      g.flag('dach_besucht', true);
      await g.say('pixel', 'Der Taubengarten. Keine Menschenseele. Dafür Federvieh mit Attitüde.');
    }
  };

  // ---------------- Kanal-Eingang ----------------
  NN.scenes.kanal_eingang = {
    id: 'kanal_eingang', name: 'Kanal-Eingang', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_10_kanal_eingang' }, music: 'mus_kanal',
    walk: [[200, 768], [1376, 768], [1376, 690], [1150, 620], [900, 592], [700, 582], [500, 602], [380, 682]],
    depth: D(590, 768, 0.65, 1.0),
    spawns: { default: [700, 700], schrottplatz: [700, 700], pumpe: [830, 700] },
    props: [{ if: S => S.flags.kanal_offen, draw: () => NN.drawProp('kanaldeckel_offen', 828, 668, 330) }],
    exits: [
      bottom('Schrottplatz', 'schrottplatz', 'kanal', 700),
      { id: 'ex_pumpe', name: 'In den Pumpenraum', if: S => S.flags.kanal_offen, poly: R(690, 560, 970, 665), walkTo: [830, 660], to: 'pumpenraum', spawn: 'kanal', arrow: 'down' }
    ],
    hotspots: [
      {
        id: 'deckel', name: 'Kanaldeckel', poly: R(680, 555, 975, 665), walkTo: [830, 705], facing: 'up',
        if: S => !S.flags.kanal_offen,
        look: 'Ein schwerer Kanaldeckel. Darunter blubbert etwas Unheimliches.',
        use: 'Der ist viel zu schwer. Ich brauche etwas, das Eisen anzieht.',
        useWith: {
          kranmagnet: async g => {
            await g.say('pixel', 'Mit Rosis Kranmagnet … und Schwung!');
            await g.say('kruemel', 'Das klingt, als hätte jemand eine Tuba aus Blei fallen lassen.');
            g.flag('kanal_offen', true);
            await g.say('pixel', 'Der Weg nach unten ist frei. Es riecht nach alten Geheimnissen und neuen Problemen.');
          },
          _default: async g => g.say('pixel', 'Das hilft dem Deckel nicht.')
        }
      },
      H.look('gitter', 'Vergittertes Kanalrohr', R(300, 230, 700, 520), 'Ein vergittertes Kanalrohr. Das Schloss ist verrostet. Ohne Schlüssel, ohne Chance.'),
      H.look('schleim', 'Rosa Schleim', R(330, 430, 850, 540), 'Rosa, leuchtender Schleim. Sieht aus wie Erdbeerjoghurt, der sich schlecht benommen hat.'),
      H.look('tonnen', 'Fässer und Schrott', R(780, 250, 1376, 560), 'Fässer, Kisten und die Überreste sämtlicher Fernseher der Stadt. Zwischen den Platinen winkt eine Hand.'),
      H.look('hahn', 'Wasserhahn', R(120, 240, 240, 330), 'Ein Wasserhahn mit der Aufschrift „Don’t drink“. Wer trinkt schon aus Kanälen?'),
      H.look('giftschild', 'Giftmüll-Schild', R(1225, 440, 1330, 545), '„Toxic Waste“. Der Totenkopf lächelt, als wäre er stolz darauf.')
    ],
    onEnter: async g => {
      if (g.get('kanal_besucht')) return;
      g.flag('kanal_besucht', true);
      await g.say('pixel', 'Der Kanal. Ich würde ja sagen, hier riecht es nach Abenteuer. Aber es riecht nach Kanal.');
    }
  };

  // ---------------- Pumpenraum ----------------
  NN.scenes.pumpenraum = {
    id: 'pumpenraum', name: 'Pumpenraum', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_11_pumpenraum' }, music: 'mus_kanal',
    walk: [[330, 768], [1376, 768], [1376, 700], [1100, 600], [880, 572], [560, 572], [420, 622], [330, 702]],
    depth: D(570, 768, 0.6, 1.0),
    spawns: { default: [830, 700], kanal: [830, 700] },
    props: [{ if: S => S.flags.ratten_weg && !S.flags.gab_glasfaserkabel, draw: () => NN.drawProp('kabel_gekappt', 1100, 740, 70) }],
    actors: [
      { id: 'ratten', name: 'Ratten-Trupp', x: 1130, y: 730, sprite: 'ratten', h: 150, hide: S => S.flags.ratten_weg },
      { id: 'katze', name: 'Katze Schrödinger', x: 900, y: 730, sprite: 'katze', h: 154, hide: S => !S.flags.ratten_weg }
    ],
    exits: [{ id: 'ex_kanal', name: 'Zurück nach oben', poly: R(330, 742, 1376, 768), walkTo: [830, 766], to: 'kanal_eingang', spawn: 'pumpe', arrow: 'down' }],
    hotspots: [
      {
        id: 'ratten', name: 'Ratten-Trupp', poly: R(1010, 630, 1250, 750), walkTo: [960, 745], facing: 'right',
        if: S => !S.flags.ratten_weg,
        look: 'Drei Ratten mit Schutzhelmen und Protestschildern. Sie bewachen das Kabel an der Wand: „Keine Kabel für Menschen!“',
        use: async g => { await g.say('pixel', 'Darf ich an das Kabel?'); await g.say('pixel', 'Die Ratten knurren. Ich brauche etwas, das sie vertreibt. Etwas mit Fell und Klauen.'); },
        useWith: {
          schroedinger_kiste: async g => {
            await g.say('pixel', 'Ich öffne jetzt diese Kiste. Bitte bleib nicht leer …');
            await g.say('kruemel', 'Die Katze ist nur da, wenn man nicht hinsieht. Also: Augen zu!');
            await g.say('pixel', 'Miau!');
            g.remove('schroedinger_kiste'); g.flag('ratten_weg', true);
            await g.say('pixel', 'Die Katze springt raus! Die Ratten quieken und flitzen davon.');
            await g.say('pixel', 'Ein sauberes, leuchtendes Glasfaserkabel liegt jetzt im Dreck. Das nehme ich mit.');
          },
          _default: async g => g.say('pixel', 'Die Ratten sind von so einem Geschenk nicht zu beeindrucken.')
        }
      },
      {
        id: 'kabel', name: 'Glasfaserkabel', poly: R(1060, 690, 1150, 750), walkTo: [1040, 750], facing: 'right',
        if: S => S.flags.ratten_weg && !S.flags.gab_glasfaserkabel,
        look: 'Ein leuchtendes Glasfaserkabel. Den Ratten war es wohl zu hübsch.',
        use: async g => { g.give('glasfaserkabel'); await g.say('kruemel', 'Das Kabel leuchtet. Ich auch. Wir passen zusammen.'); }
      },
      H.look('pumpe', 'Pumpe', R(520, 340, 1050, 560), 'Eine große Pumpe, die brummt wie ein schlecht gelaunter Kühlschrank.'),
      H.look('rohre', 'Rohre', R(400, 40, 1150, 330), 'Rohre in allen Farben von Rost. Es tropft hörbar.'),
      H.look('schaltkaesten', 'Schaltkästen', R(60, 100, 440, 340), 'Schaltkästen mit Hebeln. Ich kenne die Regel: nie den roten Hebel ziehen.'),
      H.look('hole', 'Loch in der Wand', R(1180, 240, 1376, 440), 'Ein ausgefranstes Loch in der Wand. Die Ratten haben das Kabel wohl von hier nach unten gezogen.'),
      H.look('muell', 'Müllhaufen', R(0, 330, 530, 720), 'Ein Müllhaufen mit Löchern. Darin wohnen sicher Ratten und gute Absichten.')
    ],
    onEnter: async g => {
      if (g.get('pumpe_besucht')) return;
      g.flag('pumpe_besucht', true);
      await g.say('pixel', 'Der Pumpenraum. Hier unten geht es tief und feucht zu.');
    }
  };

  // ---------------- Bahnhof ----------------
  NN.scenes.bahnhof = {
    id: 'bahnhof', name: 'Magnetbahn-Station Süd', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_12_bahnhof' }, music: 'mus_bahn',
    walk: [[250, 768], [1376, 768], [1376, 700], [1100, 645], [900, 612], [500, 572], [380, 602], [300, 692]],
    depth: D(570, 768, 0.55, 1.0),
    spawns: { default: [700, 700], basar: [700, 700] },
    actors: [{ id: 'schaffner', name: 'Schaffner 4711', x: 1000, y: 640, sprite: 'schaffner', h: 232, flip: true }],
    exits: [bottom('Schwarzer Basar', 'basar', 'bahnhof', 700)],
    hotspots: [
      {
        id: 'schaffner', name: 'Schaffner 4711', poly: R(905, 400, 1110, 650), walkTo: [860, 690], facing: 'right',
        look: 'Schaffner 4711. Eckig, gewissenhaft und besessen von Stempeln.',
        use: async g => {
          if (!g.get('schaffner_gesprochen')) { g.flag('schaffner_gesprochen', true); await g.say('schaffner', 'Halt! Fahrkarte bitte! Und zwar eine mit gültigem Stempel!'); }
          if (g.has('gueltiges_ticket')) { await g.say('pixel', 'Bitteschön.'); return schaffnerEnde(g); }
          if (g.has('altes_ticket')) return g.say('schaffner', 'Dieses Ticket? Abgelaufen! Kein Stempel! Ich bin zutiefst enttäuscht.');
          await g.say('schaffner', 'Ohne Fahrkarte keine Fahrt. Und ohne Stempel keine Ordnung.');
        },
        useWith: {
          gueltiges_ticket: async g => { await g.say('pixel', 'Hier, mein Ticket. Gestempelt und amtlich.'); return schaffnerEnde(g); },
          altes_ticket: async g => g.say('schaffner', 'Dieses Ticket ist abgelaufen und hat keinen Stempel. So fahre ich niemanden nach Mittel-Heights.'),
          _default: async g => g.say('schaffner', 'Das ist keine Fahrkarte. Ich prüfe Fahrkarten, keine Dinge.')
        }
      },
      {
        id: 'schranke', name: 'Fahrkartenschranke', poly: R(830, 440, 1095, 600), walkTo: [850, 690], facing: 'up',
        look: 'Die Schranke lässt nur Menschen mit gültigem Ticket durch. Und Tauben. Niemand weiß, warum.',
        use: 'Geschlossen. Der Schaffner schaut mir dabei zu.'
      },
      {
        id: 'automat', name: 'Fahrkartenautomat', poly: R(90, 265, 325, 640), walkTo: [330, 700], facing: 'up',
        look: 'Ein Fahrkartenautomat. Er zeigt „Bitte Münzen einwerfen“. Ich habe keine. Nur Probleme.',
        use: async g => { await g.say('pixel', 'Ich drücke auf „Fahrkarte“. Der Automat piept und zeigt „Störung“.'); await g.say('kruemel', 'Ich sage nur: Die Störung bist du.'); }
      },
      H.look('zug', 'Magnetbahn', R(520, 210, 910, 400), 'Die Magnetbahn nach Mittel-Heights. Sie schwebt einen Zentimeter über den Gleisen und über jeder Kritik.'),
      H.look('tafel', 'Abfahrtstafel', R(720, 25, 985, 165), 'Die Abfahrtstafel zeigt Symbole, die ich nicht kenne. Vermutlich Verspätung.'),
      H.look('poster1', 'Poster „Neo-Raupe Snacks“', R(75, 5, 280, 260), 'Ein Poster für „Neo-Raupe Snacks“. Appetit auf Insekten hat in dieser Stadt Tradition.'),
      H.look('poster2', 'Poster „Aethel Flug“', R(305, 95, 435, 350), 'Werbung für „Aethel Flug“: Ein Ufo holt Menschen ab. Kein Kommentar.')
    ],
    onEnter: async g => {
      if (g.get('bahn_besucht')) return;
      g.flag('bahn_besucht', true);
      await g.say('pixel', 'Die Magnetbahn-Station. Von hier aus geht es nach oben, wenn man ein gültiges Ticket hat.');
    }
  };

  async function schaffnerEnde(g) {
    await g.say('schaffner', 'Ein gestempeltes Ticket! Es ist … perfekt! Ich muss mich setzen!');
    await g.say('schaffner', 'Einsteigen bitte! Nach Mittel-Heights! Bitte Abstand halten und Würde wahren!');
    await g.say('kruemel', 'Wir fahren hoch zur Konzernwelt. Dort wartet die Wahrheit.');
    g.flag('akt1_ende', true);
    await g.actEnd('Ende von Akt 1', 'Du hast Unter-Heights hinter dir gelassen. Gleich beginnt Akt 2 in Mittel-Heights.');
    await g.goto('plaza', 'bahnhof');
  }
})();
