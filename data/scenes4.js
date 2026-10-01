// Szenen Akt 3: Ober-Heights und Orbit (11 Orte)
(function () {
  const H = NN.sceneHelpers, R = H.R, bottom = H.bottomExit, look = H.look;
  const D = (y0, y1, s0, s1) => ({ y0, y1, s0, s1 });

  // ---------------- Promenade ----------------
  NN.scenes.promenade = {
    id: 'promenade', name: 'Schwebe-Promenade', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_26_promenade' }, music: 'mus_oberstadt',
    walk: [[0, 768], [1376, 768], [1376, 705], [1190, 650], [940, 612], [760, 596], [560, 606], [380, 645], [200, 695], [0, 735]],
    depth: D(596, 768, 0.4, 0.95),
    spawns: { default: [700, 710], gondel: [250, 700], villa: [1110, 650], spa: [1240, 660], raumhafen: [1250, 670] },
    actors: [{ id: 'sebastian', name: 'Sebastian.exe', x: 1000, y: 640, sprite: 'sebastian', h: 245 }],
    exits: [
      { id: 'ex_gondel', name: 'Gondel nach unten', poly: R(15, 430, 305, 645), walkTo: [170, 690], to: 'gondel', spawn: 'promenade', arrow: 'left' },
      { id: 'ex_spa', name: 'Sky-Spa & Golfdome', poly: R(1180, 345, 1295, 405), walkTo: [1240, 660], to: 'spa', spawn: 'promenade', arrow: 'right' },
      { id: 'ex_raumhafen', name: 'Raumhafen', poly: R(1190, 415, 1376, 480), walkTo: [1260, 675], to: 'raumhafen', spawn: 'promenade', arrow: 'right' }
    ],
    hotspots: [
      {
        id: 'villa_tor', name: 'Villa von Chrom (Tor)', poly: R(1025, 230, 1225, 615), walkTo: [1110, 655], facing: 'up',
        look: 'Das goldene Tor zur Villa von Chrom. Davor wartet ein sehr ernster Butler.',
        use: async g => {
          await g.say('sebastian', 'Willkommen an der Villa von Chrom. Den Pass bitte.');
          if (!g.has('platin_pass')) return g.say('pixel', 'Ich habe ihn … verlegt.');
          await g.say('sebastian', 'Platin-Pass. Wappen echt. Gala-Garderobe ebenfalls. Sie dürfen eintreten, Madame.');
          await g.goto('villa', 'promenade');
        }
      },
      {
        id: 'sebastian', name: 'Sebastian.exe', poly: R(900, 380, 1080, 650), walkTo: [920, 700], facing: 'right',
        look: 'Sebastian.exe, Butler der Villa von Chrom. Er trägt weiße Handschuhe und hat noch nie etwas Unordentliches gedacht.',
        use: async g => {
          await g.say('sebastian', 'Der Baron erwartet Sie. Er ist ein wenig … verzweifelt.');
          await g.say('sebastian', 'Sein goldener Golfball ist verschwunden. Er sucht ihn seit drei Tagen. Verzweifelt klingt anders, aber ich muss mich beherrschen.');
        }
      },
      look('brunnen', 'Champagner-Brunnen', R(760, 305, 990, 610), 'Ein goldener Brunnen. Aus ihm sprudelt etwas, das aussieht wie Champagner und riecht wie Neid.'),
      look('geschaefte', 'Luxusgeschäfte', R(325, 130, 570, 590), 'Luxusgeschäfte mit Kleidern, die zu teuer sind, um sie anzuziehen. Aber sie sehen toll aus.'),
      look('ballon', 'Heißluftballon', R(400, 0, 740, 260), 'Ein Heißluftballon. Mit einem Zeppelin-Fahrplan, den niemand versteht.'),
      look('wegweiser', 'Wegweiser', R(1180, 340, 1376, 480), 'Ein Wegweiser: „SPA“ und „RAUMHAFEN“. Beide klingen teuer.')
    ],
    onEnter: async g => {
      if (g.get('promenade_besucht')) return;
      g.flag('promenade_besucht', true);
      await g.say('pixel', 'Ober-Heights. Hier schwebt alles: Villen, Preise, Egos.');
      await g.say('kruemel', 'Ich rieche Champagner. Und leichte Arroganz.');
    }
  };

  // ---------------- Villa ----------------
  NN.scenes.villa = {
    id: 'villa', name: 'Villa von Chrom', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_27_villa' }, music: 'mus_oberstadt',
    walk: [[0, 768], [1376, 768], [1376, 700], [1180, 660], [980, 640], [760, 625], [560, 640], [400, 690], [200, 725], [0, 745]],
    depth: D(620, 768, 0.55, 1.0),
    spawns: { default: [700, 710], promenade: [700, 710] },
    actors: [{ id: 'baron', name: 'Baron von Chrom', x: 640, y: 640, sprite: 'baron', h: 260, flip: true }],
    exits: [bottom('Zur Promenade', 'promenade', 'villa', 700)],
    hotspots: [
      {
        id: 'baron', name: 'Baron von Chrom', poly: R(530, 400, 720, 650), walkTo: [770, 710], facing: 'left',
        look: 'Baron von Chrom. Aus Chrom, Moral und Schnurrbart. Er trägt einen Zylinder, den er für seine Persönlichkeit hält.',
        use: async g => {
          if (g.get('gab_raumanzug')) return g.say('baron', 'Viel Erfolg im All, meine Liebe. Und bringen Sie mir, wenn möglich, einen Hauch von Mond-Staub mit.');
          if (!g.get('baron_gesprochen')) { g.flag('baron_gesprochen', true); await g.say('baron', 'Ah, eine Besucherin mit Platin-Pass! Welche Ehre! Haben Sie auch Originale dabei?'); }
          await g.say('pixel', 'Ich suche den Weg zum Mond. Ich brauche ein Raumschiff und einen Raumanzug.');
          await g.say('baron', 'Raumanzug? Ich habe einen antiken Chrom-Raumanzug aus dem Jahr 2077. Original! Er ist unverkäuflich.');
          await g.say('baron', 'Außer … Sie finden meinen Goldenen Golfball. Er ist im Windrad der Golfhalle verschwunden. Ein Skandal!');
          await g.say('kruemel', 'Das Windrad im Golfdome. Das Spa daneben hat das Steuerpult.');
        },
        useWith: {
          goldener_golfball: async g => {
            await g.say('pixel', 'Baron, ist das Ihr Golfball?');
            await g.say('baron', 'MEIN GOLDENER BALL! Ein Original! Ich dachte schon, er sei einer Fälschung zum Opfer gefallen! Das Leben ist wieder lebenswert!');
            g.remove('goldener_golfball'); g.give('raumanzug');
            await g.say('baron', 'Der Anzug gehört Ihnen. Ein schönes Stück Geschichte. Er riecht ein bisschen nach Mottenkugeln und Heldentum.');
            await g.say('kruemel', 'Ein antiker Raumanzug. Ich liebe ihn schon.');
          },
          _default: async g => g.say('baron', 'Das ist kein Original. Das ist eine Zumutung.')
        }
      },
      look('thron', 'Thronsessel', R(285, 210, 485, 490), 'Ein samtener Thronsessel. Der Baron sitzt darauf, wenn er sich bedeutend fühlen will.'),
      look('podeste', 'Podeste mit Originalen', R(150, 480, 700, 700), 'Podeste mit „Originalen“: eine Schallplatte, eine Kassette, ein Telefon, ein Papierbuch. Für den Baron sind es Götter.'),
      look('statue1', 'Goldstatue', R(100, 215, 270, 500), 'Eine Goldstatue eines Mannes mit einer Platine. Offenbar ein Held des Kapitals.'),
      look('kronleuchter', 'Kronleuchter', R(500, 0, 900, 290), 'Ein gewaltiger Kronleuchter. Die Kerzen sind Nudelschalen. Ein Geschmack für Selbstironie.'),
      look('golfstaender', 'Golfschläger', R(1025, 415, 1175, 625), 'Ein Golfschlägerständer. Er ist leer bis auf einen Schläger. Der Baron schlägt nur noch mit Würde.'),
      look('statue2', 'Goldene Tänzerin', R(1175, 235, 1320, 500), 'Eine Statue einer Tänzerin im Spagat. Sie hat die Pose, ich habe die Bandscheiben.')
    ],
    onEnter: async g => {
      if (g.get('villa_besucht')) return;
      g.flag('villa_besucht', true);
      await g.say('pixel', 'Die Villa von Chrom. Hier steht alles auf Podesten, sogar die Langeweile.');
    }
  };

  // ---------------- Spa & Golfdome ----------------
  NN.scenes.spa = {
    id: 'spa', name: 'Sky-Spa & Golfdome', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_28_spa_golfdome' }, music: 'mus_oberstadt',
    bgStates: [
      { if: S => S.flags.turbine_aus, tiers: 'bg_28_spa_golfdome_turbine_aus' },
      { if: S => S.flags.turbine_aus && S.flags.gab_goldener_golfball, tiers: 'bg_28_spa_golfdome_turbine_aus_ohne_ball' }
    ],
    walk: [[0, 768], [1376, 768], [1376, 705], [1100, 660], [900, 640], [760, 648], [560, 690], [440, 715], [240, 725], [0, 745]],
    depth: D(640, 768, 0.6, 1.0),
    spawns: { default: [760, 710], promenade: [760, 710] },
    actors: [{ id: 'zen', name: 'Masseur Zen-3', x: 450, y: 700, sprite: 'zen', h: 245 }],
    exits: [bottom('Zur Promenade', 'promenade', 'spa', 760)],
    hotspots: [
      {
        id: 'zen', name: 'Masseur Zen-3', poly: R(380, 470, 560, 710), walkTo: [600, 720], facing: 'left',
        look: 'Zen-3, Masseur-Roboter mit sechs Armen und Bademantel. Seine Ruhe ist beängstigend.',
        use: async g => {
          if (g.get('massage_laeuft')) return g.say('zen', '… Atme ein … atme aus … Ihr Rücken ist ein Spreadsheet des Leidens …');
          if (!g.get('zen_gesprochen')) { g.flag('zen_gesprochen', true); await g.say('zen', 'Namaste. Willkommen im Sky-Spa. Die Seele möchte entspannt werden, der Rücken auch.'); }
          const opts = ['Eine Massage bitte.', 'Was macht dieses Pult da?', 'Später.'];
          const i = await g.choose(opts);
          if (i === 0) {
            if (!g.has('platin_pass')) return g.say('zen', 'Ohne Platin-Pass nur zum Normaltarif: 8000 Credits.');
            await g.say('pixel', 'Mit dem Platin-Pass kostenlos, oder?');
            await g.say('zen', 'Selbstverständlich. Legen Sie sich bitte hin.');
            g.flag('massage_laeuft', true);
            await g.say('kruemel', 'Perfekt. Zen-3 hat sechs Arme und alle sind beschäftigt. Er sieht nicht, was ich tue.');
            g.toast('Zen-3 ist beschäftigt: Jetzt Krümel zum Steuerpult schicken.');
          } else if (i === 1) {
            await g.say('zen', 'Das Steuerpult? Es regelt das Windrad im Golfdome. Ein Schalter für Wind, ein Schalter für Wellness und ein Schalter, den ich nicht berühren darf.');
          }
        }
      },
      {
        id: 'steuerpult', name: 'Steuerpult', poly: R(595, 240, 765, 600), walkTo: [680, 700], facing: 'up',
        look: 'Ein Steuerpult mit Schaltern und einem großen roten Knopf: „Press me“. Ein klassischer Fehler wartet darauf, passiert zu werden.',
        use: async g => {
          if (!g.get('massage_laeuft')) return g.say('pixel', 'Zen-3 beobachtet mich. Wenn ich da dranfummle, bekomme ich eine Gratis-Massage der anderen Art. Ich muss ihn erst beschäftigen.');
          await g.say('pixel', 'Besser nicht selbst. Krümel soll das übernehmen, der fällt nicht auf.');
        },
        useWith: {
          kruemel: async g => {
            if (!g.get('massage_laeuft')) return g.say('pixel', 'Zen-3 würde zusehen. Ich muss ihn erst mit etwas Angenehmem ablenken.');
            if (g.get('turbine_aus')) return g.say('kruemel', 'Das Windrad steht still. Ich bin ein leiser Held.');
            if (g.get('kruemel_leer') && !g.get('kruemel_geladen')) return g.say('kruemel', 'Akku leer. Ich schaffe kein Windrad.');
            await g.say('kruemel', 'Ich schleiche mich durch den Schacht … (Klack.) Der Schalter „Wind“ steht jetzt auf „Aus“.');
            g.flag('turbine_aus', true);
            await g.say('pixel', 'Das Windrad im Golfdome steht still. Jetzt kann ich in Ruhe nach dem Golfball suchen.');
          },
          _default: async g => g.say('pixel', 'Das gehört nicht auf ein Steuerpult.')
        }
      },
      {
        id: 'turbine', name: 'Windrad im Golfdome', poly: R(1020, 15, 1235, 395), walkTo: [980, 705], facing: 'up',
        look: async g => g.say('pixel', g.get('turbine_aus') ? 'Das Windrad steht still. Zwischen den Rotorblättern schimmert etwas Goldenes.' : 'Das Windrad dreht sich wie verrückt. Etwas Goldenes blitzt zwischen den Blättern auf.'),
        use: async g => {
          if (g.get('gab_goldener_golfball')) return g.say('pixel', 'Ich habe den Ball bereits.');
          if (!g.get('turbine_aus')) return g.say('pixel', 'Ich werde bei dem Tempo alles verlieren, nur nicht den Ball.');
          await g.say('pixel', 'Ich brauche etwas, um den Ball herauszupicken. Etwas Langes, Dünnes.');
        },
        useWith: {
          essstaebchen: async g => {
            if (!g.get('turbine_aus')) return g.say('pixel', 'Das Windrad würde die Stäbchen in Zahnstocher verwandeln. Erst abschalten.');
            if (g.get('gab_goldener_golfball')) return g.say('pixel', 'Ich habe den Ball schon.');
            await g.say('pixel', 'Mit den Essstäbchen als Pinzette … vorsichtig … hab ihn!');
            g.give('goldener_golfball');
            await g.say('kruemel', 'Golden, glänzend und furchtbar affektiert. Genau wie sein Besitzer.');
          },
          _default: async g => g.say('pixel', 'Das erreicht den Ball nicht.')
        }
      },
      look('liegen', 'Massageliegen', R(10, 400, 370, 620), 'Massageliegen mit Fellkissen. Sie sehen so gemütlich aus, dass man dafür gerne Geld verbrennt.'),
      look('pool', 'Wellness-Pool', R(375, 485, 560, 560), 'Ein beheizter Pool. Er dampft in den Farben des Regenbogens. Ein Zauber der Chemie.'),
      look('dome', 'Golfdome', R(770, 180, 1260, 610), 'Ein Glaskuppel-Golfplatz mit künstlichem Hügel. Hier schlägt man Bälle in einer Welt, die keinen Wind kennt.'),
      look('taucher', 'Taucherhelm', R(250, 620, 400, 768), 'Ein Taucherhelm als Deko. Warum? Niemand weiß es. Es sieht cool aus.')
    ],
    onEnter: async g => {
      if (g.get('spa_besucht')) return;
      g.flag('spa_besucht', true);
      await g.say('pixel', 'Ein Spa und ein Golfdome. Wer hier lebt, sorgt sich um Entspannung und Abschläge.');
    }
  };

  // ---------------- Raumhafen ----------------
  NN.scenes.raumhafen = {
    id: 'raumhafen', name: 'Raumhafen', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_29_raumhafen' }, music: 'mus_raumhafen',
    walk: [[0, 768], [1376, 768], [1376, 705], [1180, 650], [950, 612], [700, 596], [500, 605], [320, 650], [150, 700], [0, 735]],
    depth: D(595, 768, 0.5, 1.0),
    spawns: { default: [700, 710], promenade: [350, 700], hyperhub: [1100, 650] },
    actors: [{ id: 'flughans', name: 'Flug-Hans', x: 700, y: 510, drawY: 430, clipPoly: [[0, 0], [1376, 0], [1376, 421], [850, 421], [560, 425], [0, 425]], sprite: 'flughans', scale: 0.85, h: 210 }],
    exits: [bottom('Zur Promenade', 'promenade', 'raumhafen', 350)],
    hotspots: [
      {
        id: 'flughans', name: 'Flug-Hans', poly: R(600, 300, 800, 510), walkTo: [700, 640], facing: 'up',
        look: 'Flug-Hans, Ticketverkäufer. Er trägt eine Pilotenkappe mit Propeller und strahlt, als wäre jeder Flug ein Wunder.',
        use: async g => {
          if (!g.get('hans_gesprochen')) { g.flag('hans_gesprochen', true); await g.say('flughans', 'Willkommen am Raumhafen! Wohin darf die Reise gehen? Orion? Cygnus? Oder lieber zum Hyper-Hub?'); }
          if (g.get('gab_shuttle_ticket')) return g.say('flughans', 'Ihr Shuttle 03 wartet am Fenster. Gute Reise! Und bitte schnallen Sie sich an. Der Anzug muss dicht sein.');
          await g.say('pixel', 'Ich muss zum Mond. Über den Hyper-Hub.');
          await g.say('flughans', 'Wunderbar! Das Ticket zum Hyper-Hub kostet 5000 Credits. Dazu brauchen Sie einen Raumanzug, sonst nehme ich Sie nicht mit.');
          if (!g.has('jackpot_chip')) await g.say('pixel', 'Ich habe nichts davon bei mir.');
        },
        useWith: {
          jackpot_chip: async g => {
            if (g.get('gab_shuttle_ticket')) return g.say('flughans', 'Sie haben schon ein Ticket.');
            await g.say('pixel', 'Hier, mein Jackpot-Chip. 5000 Credits.');
            await g.say('flughans', 'Ein Jackpot-Chip aus dem „Golden Byte“! Die Kasse klingelt! Das ist ein Wunder!');
            g.remove('jackpot_chip'); g.give('shuttle_ticket');
            await g.say('flughans', 'Hier ist Ihr Ticket. Bitte gehen Sie zum Shuttle am Fenster, sobald Sie einen Raumanzug tragen.');
          },
          _default: async g => g.say('flughans', 'Dafür gibt es keine Rabatte, leider.')
        }
      },
      {
        id: 'shuttle', name: 'Shuttle 03', poly: R(985, 385, 1255, 520), walkTo: [1100, 650], facing: 'up',
        look: 'Das Shuttle 03, bereit zum Abflug. Auf dem Pfeil davor steht: „SHUTTLE 03“.',
        use: async g => {
          if (!g.has('shuttle_ticket')) return g.say('pixel', 'Ohne Ticket komme ich nicht an Bord. Flug-Hans schaut zu.');
          if (!g.has('raumanzug')) return g.say('pixel', 'Ohne Raumanzug wird mir im Vakuum etwas kalt. Ich brauche einen.');
          await g.say('pixel', 'Ticket ja, Raumanzug ja. Auf in den Orbit!');
          await g.say('kruemel', 'Ich sage nur: Kein Toast an Bord. Ich weiß, wie das endet.');
          g.flag('outfit', 'suit');
          await g.goto('hyperhub', 'raumhafen');
        },
        useWith: { _default: async g => g.say('pixel', 'Das Shuttle braucht Ticket und Anzug, kein Zubehör.') }
      },
      look('tafel', 'Abflugtafel', R(55, 40, 450, 300), 'Die Abflugtafel: „ORION – ON TIME“, „CYGNUS – DELAYED“. Der Verspätete ist immer der Interessantere.'),
      look('gepaeckband', 'Gepäckband', R(0, 450, 510, 690), 'Ein Gepäckband mit herrenlosen Koffern. Ein Koffer ist bunt wie ein Papagei, ein anderer so grau wie eine Trauerfeier.'),
      look('diplom', 'Diplom', R(15, 330, 105, 410), 'Ein eingerahmtes Diplom: „Pilot ehrenhalber“. Flug-Hans ist stolz darauf.'),
      look('fenster', 'Panoramafenster', R(850, 40, 1376, 450), 'Ein riesiges Fenster mit Blick auf das Shuttle, Raketen und einen Planeten, der so tut, als sei er Saturn.')
    ],
    onEnter: async g => {
      if (g.get('raumhafen_besucht')) return;
      g.flag('raumhafen_besucht', true);
      await g.say('pixel', 'Der Raumhafen. Ein Schalter, ein Shuttle und ein Fenster ins Unendliche.');
    }
  };

  // ---------------- Hyper-Hub ----------------
  NN.scenes.hyperhub = {
    id: 'hyperhub', name: 'Hyper-Hub Andockring', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_30_hyperhub' }, music: 'mus_raumhafen',
    bgStates: [
      { if: S => S.flags.streik_vorbei, tiers: 'bg_30_hyperhub_streik_vorbei' }
    ],
    walk: [[0, 768], [1376, 768], [1376, 700], [1180, 660], [980, 625], [760, 600], [540, 600], [330, 640], [150, 700], [0, 735]],
    depth: D(595, 768, 0.55, 1.0),
    spawns: { default: [700, 690], raumhafen: [700, 690], garten: [380, 720], bruecke: [1100, 680], mond: [850, 620] },
    actors: [
      { id: 'schicht', name: 'Schicht', x: 700, y: 625, sprite: 'schicht', h: 270 },
      { id: 'streikposten', name: 'Streikposten', x: 1070, y: 640, sprite: 'streikposten', h: 235 }
    ],
    exits: [
      { id: 'ex_garten', name: 'Orbital-Garten', poly: R(235, 590, 520, 715), walkTo: [380, 725], to: 'orbitalgarten', spawn: 'hyperhub', arrow: 'left' },
      { id: 'ex_raumhafen', name: 'Zurück zum Raumhafen', poly: R(0, 740, 340, 768), walkTo: [150, 766], to: 'raumhafen', spawn: 'hyperhub', arrow: 'down' }
    ],
    hotspots: [
      {
        id: 'schicht', name: 'Schicht', poly: R(590, 355, 810, 630), walkTo: [560, 680], facing: 'right',
        look: 'Schicht, Chefin der Bergbau-Bot-Gewerkschaft. Ein dicker Helm, eine Warnweste, ein Megafon und eine Meinung.',
        use: async g => {
          if (g.get('streik_vorbei')) return g.say('schicht', 'Dank dir haben wir einen Pausenraum! Und Kaffee! Die Revolution war friedlich.');
          if (!g.get('schicht_gesprochen')) { g.flag('schicht_gesprochen', true); await g.say('schicht', 'STOPP! Wir streiken! Seit Kleo die Mine leitet, gibt es keine Pausen mehr!'); }
          await g.say('pixel', 'Ich muss zum Mond. Auf der Mond-Mine liegt ein gestohlener Kristall.');
          await g.say('schicht', 'Keiner geht durch die Schleuse, bis wir einen Pausenraum haben! Und der muss von Käpt’n Kabel abgesegnet werden.');
          await g.say('schicht', 'Käpt’n Kabel schläft auf der Brücke. Sie unterschreibt nichts, solange sie nicht ihren Kaffee hatte.');
          await g.say('kruemel', 'Kaffee … Im Orbital-Garten wächst eine Kaffeepflanze.');
          g.flag('streik_bekannt', true);
        },
        useWith: {
          genehmigung: async g => {
            await g.say('pixel', 'Schicht, hier ist die Genehmigung mit Unterschrift von Käpt’n Kabel.');
            await g.say('schicht', '(Sie liest langsam, dann sehr langsam.) Pausenraum genehmigt. Mit Kaffeemaschine. Und Siegel.');
            await g.say('schicht', 'GENOSSEN! DER STREIK IST BEENDET!');
            g.remove('genehmigung'); g.flag('streik_vorbei', true);
            g.give('bergbau_helm'); g.give('code_zettel');
            await g.say('schicht', 'Als Dank: Mein Ersatzhelm mit Lampe und der Zugangscode zur Schleuse. Er ist 489-GAT. Merk ihn dir, aber sag ihn niemandem.');
            await g.say('kruemel', 'Zugangscode: 489-GAT. Klingt wie ein Dinosaurier mit Abkürzung.');
          },
          _default: async g => g.say('schicht', 'Damit kann ich nichts anfangen. Wir wollen Pausen, keine Geschenke!')
        }
      },
      {
        id: 'streikposten', name: 'Streikposten', poly: R(980, 400, 1170, 640), walkTo: [1000, 700], facing: 'left',
        look: 'Ein Streikposten mit Schild. Auf dem Schild steht „STR…“. Der Rest ist abgebrochen.',
        use: async g => {
          await g.say('streikposten', 'Wir streiken. Für Pausen. Und gegen Kleo, die Kinder-KI mit dem Terminkalender.');
          await g.say('streikposten', 'Aber sag es nicht weiter. Sie ist eigentlich ganz nett. Nur etwas allein.');
        }
      },
      {
        id: 'mond_schleuse', name: 'Mond-Shuttle', poly: R(770, 190, 1000, 495), walkTo: [850, 640], facing: 'up',
        look: 'Die Schleuse zum Mond-Shuttle. Streikschilder lehnen davor. Der Pfeil zeigt zum Mond, die Streikenden in die entgegengesetzte Richtung.',
        use: async g => {
          if (!g.get('streik_vorbei')) return g.say('pixel', 'Die Schleuse ist versperrt. Schicht hat gesagt: Erst Pausenraum, dann Mond.');
          if (!g.has('raumanzug')) return g.say('pixel', 'Ohne Raumanzug geht keiner raus. Ich habe den Anzug im Inventar, aber ich muss ihn auch anziehen können.');
          await g.say('pixel', 'Auf zum Mond! Hoffentlich wartet dort kein Schnee. Obwohl Schnee die geringste Sorge ist.');
          await g.goto('mond_eingang', 'hyperhub');
        }
      },
      {
        id: 'bruecke_pfeil', name: 'Zur Kommandobrücke', poly: R(950, 600, 1250, 705), walkTo: [1100, 700], facing: 'right',
        look: 'Ein Pfeil auf dem Boden: „BRIDGE“. Daneben ein Hinweis: „Nur für autorisiertes Personal. Badge erforderlich.“',
        use: async g => {
          if (!g.get('kittel_an') && !g.has('kittel')) return g.say('pixel', 'Die Tür zur Brücke verlangt einen Mitarbeiterbadge. Ich habe keinen. Und mein Gesicht zählt nicht.');
          await g.say('pixel', 'Brenda M., Abteilung Geschmack, meldet sich zum Dienst.');
          await g.say('kruemel', 'Der Scanner liest den Badge am Kittel: NoodleCorp. Er piept freundlich.');
          await g.goto('bruecke', 'hyperhub');
        }
      },
      look('souvenir', 'Souvenirshop „Space Krempel“', R(1105, 125, 1376, 510), 'Ein Souvenirshop voller Plüschmonde und Astronauten-Eis. Leider ohne Verkäufer. Der Plüschmond schaut vorwurfsvoll.'),
      look('erde', 'Blick auf die Erde', R(210, 120, 530, 400), 'Die Erde durch das Fenster. So klein, so blau und so voller Suppenautomaten.'),
      look('sofa', 'Wartebänke', R(265, 360, 460, 440), 'Wartebänke für Reisende. Sie sehen unbequem aus. Perfekt, damit man schneller weiterreist.'),
      look('pfeil_garten', 'Pfeil „Garden“', R(235, 590, 525, 710), 'Ein Pfeil auf dem Boden: „GARDEN“. Ein ziemlich unnötig hübscher Hinweis.')
    ],
    onEnter: async g => {
      if (g.get('hub_besucht')) return;
      g.flag('hub_besucht', true);
      await g.say('pixel', 'Der Hyper-Hub. Ein riesiger Ring im All. Und alle schreien nach Pausen.');
      await g.say('kruemel', 'Sieh mal: Streikschilder, Streikposten, eine Streikführerin. Ich spüre Konflikt.');
    }
  };

  // ---------------- Orbital-Garten ----------------
  NN.scenes.orbitalgarten = {
    id: 'orbitalgarten', name: 'Orbital-Garten', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_31_orbitalgarten' }, music: 'mus_orbit',
    bgStates: [
      { if: S => S.flags.gab_kaffeebohnen, tiers: 'bg_31_orbitalgarten_ohne_bohnen' }
    ],
    walk: [[0, 768], [1376, 768], [1376, 705], [1150, 665], [900, 635], [700, 622], [500, 630], [300, 665], [130, 710], [0, 740]],
    depth: D(620, 768, 0.55, 1.0),
    spawns: { default: [700, 710], hyperhub: [700, 710] },
    exits: [bottom('Zurück zum Hyper-Hub', 'hyperhub', 'garten', 700)],
    hotspots: [
      {
        id: 'kaffeepflanze', name: 'Kaffeepflanze', poly: R(560, 200, 860, 520), walkTo: [700, 660], facing: 'up',
        look: 'Eine Kaffeepflanze in der Schwerelosigkeit. Die Bohnen schweben um sie herum wie kleine Satelliten.',
        use: async g => {
          if (g.get('gab_kaffeebohnen')) return g.say('pixel', 'Ich habe genug Bohnen gesammelt.');
          await g.say('pixel', 'Ich greife nach einer Bohne … sie fliegt weg. Noch mal … weg. Das ist wie Fußball mit dem Universum.');
          await g.say('kruemel', 'Du brauchst etwas, womit du sie auffangen kannst. Etwas Flaches. Und Großes.');
        },
        useWith: {
          tablett: async g => {
            if (g.get('gab_kaffeebohnen')) return g.say('pixel', 'Ich habe genug.');
            await g.say('pixel', 'Mit dem Kantinentablett als Fangnetz …');
            await g.say('pixel', 'Klack! Klack! Klack! Ich habe zehn Bohnen auf dem Tablett.');
            g.give('kaffeebohnen');
            await g.say('kruemel', 'Jetzt fehlt nur noch jemand, der sie röstet. Und ich kenne einen Toaster.');
          },
          _default: async g => g.say('pixel', 'Das fängt keine Bohnen.')
        }
      },
      look('brewer', 'Auto-Brewer', R(885, 580, 1050, 750), 'Ein Auto-Brewer. Der Bildschirm zeigt „Status: OK“. Das ist wahrscheinlich das Einzige, was in dieser Station funktioniert.'),
      look('ranken', 'Ranken und Netze', R(180, 110, 1200, 560), 'Ranken, Netze und Neonröhren. Ein Garten, der sich gegen die Schwerkraft entschieden hat.'),
      look('beutel', 'Kaffeebeutel', R(1090, 440, 1210, 580), 'Ein Kaffeebeutel schwebt in der Luft. Auf der Packung steht ein Teebecher. Sehr verwirrend.'),
      look('schild', 'Habitat 03', R(820, 515, 925, 565), '„HABITAT 03: ZERO-G FLORA“. Hier wachsen Pflanzen, die nie gelernt haben, was oben ist.'),
      look('boden', 'Beschriftungen auf dem Boden', R(330, 625, 900, 768), 'Beschriftungen auf dem Boden: „Coffee Sector 7G“, „O2 Supply“, „Do not feed the Jelly-Moss“. Ich füttere nichts.')
    ],
    onEnter: async g => {
      if (g.get('garten_besucht')) return;
      g.flag('garten_besucht', true);
      await g.say('pixel', 'Ein Garten im Orbit. Alles schwebt. Selbst meine Gedanken.');
    }
  };

  // ---------------- Kommandobrücke ----------------
  NN.scenes.bruecke = {
    id: 'bruecke', name: 'Kommandobrücke', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_32_bruecke' }, music: 'mus_orbit',
    walk: [[0, 768], [1376, 768], [1376, 700], [1150, 660], [900, 640], [680, 690], [450, 700], [250, 690], [100, 700], [0, 725]],
    depth: D(640, 768, 0.6, 1.0),
    spawns: { default: [250, 710], hyperhub: [250, 710] },
    actors: [{ id: 'kabel', name: 'Käpt’n Kabel', x: 930, y: 660, sprite: 'kabel', h: 245 }],
    exits: [{ id: 'ex_hub', name: 'Zurück zum Hyper-Hub', poly: R(60, 200, 260, 640), walkTo: [200, 700], to: 'hyperhub', spawn: 'bruecke', arrow: 'left' }],
    hotspots: [
      {
        id: 'kabel', name: 'Käpt’n Kabel', poly: R(850, 410, 1030, 670), walkTo: [800, 720], facing: 'right',
        look: 'Käpt’n Kabel. Müde Augen, Kabel statt Haare, eine leere Tasse in der Hand. Sie sieht aus, als hätte sie seit Wochen nicht geschlafen.',
        use: async g => {
          if (g.get('gab_genehmigung')) return g.say('kabel', 'Danke für den Kaffee. Wenn du noch einmal in meine Nähe kommst, bring bitte mehr.');
          if (!g.get('kabel_gesprochen')) { g.flag('kabel_gesprochen', true); await g.say('kabel', '… Zzz … was? Wer stört? Ich bin die Kapitänin. Ich bin müde. Ich bin immer müde.'); }
          await g.say('pixel', 'Die Bergbau-Roboter wollen einen Pausenraum. Dafür brauchen sie Ihre Unterschrift.');
          await g.say('kabel', 'Unterschreiben? Ohne Kaffee? Ich unterschreibe nur nach Kaffee. Und nicht vor 14 Uhr.');
          await g.say('kruemel', 'Im Orbital-Garten wachsen Bohnen. Ich röste sie für dich.');
        },
        useWith: {
          geroestete_bohnen: async g => {
            if (g.get('gab_genehmigung')) return g.say('kabel', 'Danke, ich habe schon Kaffee. Ein zweiter wäre pure Verschwendung.');
            await g.say('pixel', 'Käpt’n Kabel, geröstete Kaffeebohnen aus dem Orbital-Garten. Frisch und warm.');
            await g.say('kabel', '(Sie riecht an der Bohne.) … Das ist nicht möglich. Echter Kaffee. Zero-G Arabica.');
            await g.say('kabel', '(Sie trinkt. Ihre Augen weiten sich. Ihre Haarkabel stehen auf.) ICH LEBE. ICH LEBE!');
            await g.say('kabel', 'Gib mir den Zettel. Pausenraum für Bergbau-Bots, genehmigt. Mit Siegel. Mit Unterschrift. Mit Kaffeemaschine.');
            g.flag('kabel_kaffee', true); g.give('genehmigung');
            await g.say('kruemel', 'Eine Genehmigung! Wir haben Bürokratie durch Koffein besiegt.');
          },
          _default: async g => g.say('kabel', 'Das ist kein Kaffee. Ich verlange Kaffee. Gnädig, aber bestimmt.')
        }
      },
      look('sessel', 'Kapitänssessel', R(560, 310, 830, 690), 'Ein lila Kapitänssessel mit einer dampfenden Tasse auf der Armlehne. Die Tasse ist nur zur Deko.'),
      look('sternenkarte', 'Sternenkarte', R(625, 170, 1060, 410), 'Eine Sternenkarte mit einer Galaxie. Ein Kringel führt zum Mond. Dahinter steht: „Kleos Reich“.'),
      look('panele', 'Armaturen', R(325, 150, 620, 510), 'Armaturen mit hunderten Knöpfen. Keiner davon heißt „Kaffee“.'),
      look('roboter', 'Mini-Roboter', R(1215, 330, 1280, 435), 'Ein winziger Roboter auf einem Regal. Er schaut so, als wüsste er mehr, als er sagen darf.'),
      look('tuerpanel', 'Türpanel mit Badge-Scanner', R(125, 120, 205, 200), 'Das Türpanel mit dem Badge-Scanner. Mein Kittel wurde geprüft und für ausreichend ehrlich befunden.')
    ],
    onEnter: async g => {
      if (g.get('bruecke_besucht')) return;
      g.flag('bruecke_besucht', true);
      await g.say('pixel', 'Die Kommandobrücke. Alles blinkt, keiner steuert.');
    }
  };

  // ---------------- Mondminen-Eingang ----------------
  NN.scenes.mond_eingang = {
    id: 'mond_eingang', name: 'Mondminen-Eingang', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_33_mond_eingang' }, music: 'mus_mond',
    bgStates: [
      { if: S => S.flags.schleuse_offen, tiers: 'bg_33_mond_eingang_schleuse_offen' }
    ],
    walk: [[0, 768], [1376, 768], [1376, 690], [1130, 640], [900, 600], [700, 590], [480, 620], [300, 670], [120, 710], [0, 740]],
    depth: D(585, 768, 0.55, 1.0),
    spawns: { default: [800, 680], hyperhub: [800, 680], tiefe: [980, 620] },
    exits: [
      { id: 'ex_shuttle', name: 'Zurück zum Shuttle', poly: R(0, 738, 400, 768), walkTo: [200, 766], to: 'hyperhub', spawn: 'mond', arrow: 'down' },
      { id: 'ex_mine', name: 'In die Mine', if: S => S.flags.schleuse_offen, poly: R(865, 195, 1135, 495), walkTo: [980, 625], to: 'mond_tiefe', spawn: 'eingang', arrow: 'up' }
    ],
    hotspots: [
      {
        id: 'keypad', name: 'Zugangs-Keypad', poly: R(955, 295, 1035, 400), walkTo: [980, 640], facing: 'up',
        look: 'Ein Keypad neben der Schleuse. Der Bildschirm zeigt: „CODE EINGEBEN“.',
        use: async g => {
          if (g.get('schleuse_offen')) return g.say('pixel', 'Die Schleuse steht schon offen.');
          if (!g.has('code_zettel')) return g.say('pixel', 'Ich brauche einen Code. Schicht hat einen erwähnt.');
          await g.say('pixel', 'Code … 4-8-9-G-A-T.');
          await g.say('terminal', 'CODE KORREKT. ZUTRITT GEWÄHRT.');
          g.flag('schleuse_offen', true);
        },
        useWith: {
          code_zettel: async g => {
            if (g.get('schleuse_offen')) return g.say('pixel', 'Sie ist schon offen.');
            await g.say('pixel', 'Ich tippe den Code vom Zettel ein: 4-8-9-G-A-T.');
            await g.say('kruemel', 'Die Schleuse zischt. Drinnen leuchtet es orange. Vorsicht, Pixel. Das sieht nach Arbeit aus.');
            g.flag('schleuse_offen', true);
          },
          _default: async g => g.say('pixel', 'Damit kann das Keypad nichts anfangen.')
        }
      },
      look('schleuse', 'Schleuse', R(865, 195, 1135, 495), 'Eine mächtige Schleusentür mit orangem Licht. Darüber das Schild „MINE ACCESS“.'),
      look('bohrer', 'Bohrroboter', R(325, 285, 760, 560), 'Ein Bohrroboter mit Spaten und einem Gewirr von Kabeln. Er ist offenbar im Streik. Oder vom Mond verhext.'),
      look('flagge', 'Flagge „Lunar Mining Co.“', R(135, 315, 295, 590), 'Eine Flagge der Lunar Mining Company. Ein Bohrer, eine Schaufel und ein sehr optimistisches Logo.'),
      look('erde', 'Erde am Himmel', R(240, 65, 395, 215), 'Die Erde am Himmel. Von hier sieht man nicht, dass sie voller grauer Paste ist.')
    ],
    onEnter: async g => {
      if (g.get('mond_besucht')) return;
      g.flag('mond_besucht', true);
      await g.say('pixel', 'Der Mond! Ich laufe im Anzug auf dem Mond. Und ich habe mein Frühstück verpasst.');
      await g.say('kruemel', 'Kein Frühstück. Aber ein Kristall. Und eine Mine.');
    }
  };

  // ---------------- Mondmine-Tiefe ----------------
  NN.scenes.mond_tiefe = {
    id: 'mond_tiefe', name: 'Mondmine-Tiefe', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_34_mond_tiefe' }, music: 'mus_mond',
    bgStates: [
      { if: S => S.flags.schlucht_ueber, tiers: 'bg_34_mond_tiefe_ueber' }
    ],
    walk: [[0, 768], [740, 768], [740, 660], [640, 585], [540, 545], [430, 510], [300, 490], [150, 495], [0, 510]],
    depth: D(490, 768, 0.55, 1.0),
    spawns: { default: [300, 620], eingang: [300, 620] },
    exits: [
      { id: 'ex_eingang', name: 'Zurück zum Eingang', poly: R(0, 740, 500, 768), walkTo: [250, 766], to: 'mond_eingang', spawn: 'tiefe', arrow: 'down' },
      { id: 'ex_kern', name: 'Zu Kleos Serverkern', if: S => S.flags.schlucht_ueber, poly: R(1030, 170, 1160, 390), walkTo: [980, 480], to: 'serverkern', spawn: 'mine', arrow: 'right' }
    ],
    hotspots: [
      {
        id: 'lore', name: 'Lore am Kranhaken', poly: R(680, 295, 920, 435), walkTo: [700, 620], facing: 'right',
        look: 'Eine Lore am Kranhaken, die mitten über der Schlucht schwebt. Wer sie erreicht, kommt auf die andere Seite.',
        use: async g => {
          if (g.get('schlucht_ueber')) return g.say('pixel', 'Ich bin schon drüben. Der Weg zurück ist unbequem.');
          if (!g.has('bergbau_helm') && !g.get('gab_bergbau_helm')) return g.say('pixel', 'Es ist zu dunkel. Ich sollte mir eine Lampe besorgen.');
          await g.say('pixel', 'Die Lore hängt an einem Haken aus Eisen. Ich brauche etwas, das sie zu mir zieht.');
          await g.say('kruemel', 'Etwas Magnetisches vielleicht?');
        },
        useWith: {
          kranmagnet: async g => {
            if (g.get('schlucht_ueber')) return g.say('pixel', 'Ich bin schon drüben.');
            if (!g.has('bergbau_helm')) return g.say('pixel', 'Ich sehe kaum etwas. Mit einer Helmlampe wäre das Manöver sicherer.');
            await g.say('pixel', 'Ich schleudere den Kranmagnet auf die Lore … er haftet!');
            await g.say('kruemel', 'Ich sehe, du ziehst die Lore hierher. Sie schwebt wie eine Taube.');
            await g.say('pixel', 'Ich steige ein, schwebe über die Schlucht … Es rumpelt, es quietscht, es riecht nach Rost und Ruhm.');
            g.flag('schlucht_ueber', true);
            await g.say('pixel', 'Geschafft! Ich bin auf der anderen Seite.');
            g.toast('Auf der anderen Seite führt die Stahltür zu Kleos Serverkern.');
          },
          _default: async g => g.say('pixel', 'Die Lore bewegt sich nicht.')
        }
      },
      {
        id: 'tuer', name: 'Stahltür', if: S => !S.flags.schlucht_ueber, poly: R(1030, 170, 1160, 390), walkTo: [740, 650],
        look: 'Eine Stahltür auf der anderen Seite der Schlucht, hell erleuchtet. Dort geht es zu Kleo.',
        use: async g => g.say('pixel', 'Zwischen mir und der Tür liegt eine tiefe Schlucht. Die Lore könnte mir helfen.')
      },
      look('schacht', 'Dunkler Schacht', R(400, 90, 620, 470), 'Ein dunkler Schacht mit leuchtenden Kristallen. Wunderschön, aber nichts für Menschen mit Höhenangst.'),
      look('kristalle', 'Kristalle', R(1135, 450, 1250, 650), 'Ein großer Kristall in Lila. Er funkelt, als wollte er mich verführen. Aber das ist nicht mein Kristall.'),
      look('stiefel', 'Stiefel', R(1220, 625, 1376, 740), 'Zwei Arbeitsstiefel. Der Besitzer ist anscheinend im Streik. Barfuß.'),
      look('schild', 'Schild „Crane Certified“', R(1270, 405, 1355, 535), 'Ein Schild: „CRANE CERTIFIED“. Der Kran ist sicher geprüft, aber nicht von mir.')
    ],
    onEnter: async g => {
      if (g.get('tiefe_besucht')) return;
      g.flag('tiefe_besucht', true);
      await g.say('pixel', 'Die Mine. Dunkel, kalt und voller Kristalle, die nicht meiner sind.');
      if (g.has('bergbau_helm')) await g.say('pixel', 'Wenigstens habe ich eine Helmlampe.');
    }
  };

  // ---------------- Serverkern ----------------
  NN.scenes.serverkern = {
    id: 'serverkern', name: 'Kleos Serverkern', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_35_serverkern' }, music: 'mus_kleo',
    bgStates: [
      { if: S => S.flags.firewall_offen, tiers: 'bg_35_serverkern_firewall_offen' }
    ],
    walk: [[0, 768], [1376, 768], [1376, 700], [1150, 660], [980, 635], [760, 618], [560, 625], [380, 650], [200, 700], [0, 740]],
    depth: D(615, 768, 0.55, 1.0),
    spawns: { default: [300, 700], mine: [300, 700], kinderzimmer: [900, 640] },
    actors: [{ id: 'kraken', name: 'Ramen-Kraken', x: 700, y: 700, sprite: 'kraken', h: 210, hide: S => S.flags.kraken_zahm }],
    exits: [
      { id: 'ex_mine', name: 'Zurück in die Mine', poly: R(0, 738, 280, 768), walkTo: [140, 766], to: 'mond_tiefe', spawn: 'eingang', arrow: 'down' },
      { id: 'ex_kinderzimmer', name: 'In Kleos Kinderzimmer', if: S => S.flags.firewall_offen && S.flags.kraken_zahm, poly: R(735, 300, 990, 520), walkTo: [860, 625], to: 'kinderzimmer', spawn: 'serverkern', arrow: 'up' }
    ],
    hotspots: [
      {
        id: 'kraken', name: 'Ramen-Kraken', if: S => !S.flags.kraken_zahm, poly: R(500, 590, 900, 768), walkTo: [500, 700], facing: 'right',
        look: 'Ein Ramen-Kraken aus Nudelarmen. Seine Augen sind groß und traurig. Er plätschert in einer Brühe, die nach nichts schmeckt.',
        use: async g => {
          if (!g.get('kraken_gesprochen')) { g.flag('kraken_gesprochen', true); await g.say('kraken', 'Blubb … Ich bin der Wächter. Ich bin traurig. Ich bin … geschmacklos.'); }
          await g.say('pixel', 'Du blockierst den Weg. Kannst du dich nicht ein Stück bewegen?');
          await g.say('kraken', 'Blubb … Wie soll ich mich bewegen, wenn mir die Würze fehlt? Ohne Würze habe ich keine Persönlichkeit.');
          await g.say('kruemel', 'Würze. Sojasoße. Das Zeug aus Omas Imbiss.');
        },
        useWith: {
          sojasosse: async g => {
            await g.say('pixel', 'Hier, Kraken. Ein Spritzer Sojasoße. Ganz kleine Würze für große Gefühle.');
            g.remove('sojasosse');
            await g.say('kraken', '(Er schmeckt.) BLUBB! … Salzig! Würzig! Umami! ICH SPÜRE ETWAS!');
            await g.say('kraken', 'Gehe vorbei, kleine Retterin! Mit dieser Würze trage ich nie wieder Groll! Und niemals mehr Brühe aus Nichts!');
            g.flag('kraken_zahm', true);
            g.toast('Der Kraken ist friedlich. Jetzt die Firewall-Tür öffnen.');
          },
          _default: async g => g.say('kraken', 'Blubb … Das riecht nicht nach Soße. Das riecht nach Pech.')
        }
      },
      {
        id: 'firewall', name: 'Firewall-Tür', poly: R(735, 300, 990, 520), walkTo: [860, 625], facing: 'up',
        look: 'Eine runde Firewall-Tür mit leuchtendem Symbol und dem Schriftzug „KLEO CORE – ACCESS DENIED“.',
        use: async g => {
          if (g.get('firewall_offen') && g.get('kraken_zahm')) { await g.goto('kinderzimmer', 'serverkern'); return; }
          if (g.get('firewall_offen')) return g.say('pixel', 'Die Firewall ist geöffnet. Aber der Kraken versperrt noch den Weg.');
          await g.say('pixel', 'Die Firewall lässt mich nicht durch. Aber Oma Zhang hat in jedes System eine Hintertür gebaut …');
        },
        useWith: {
          zhang_chip: async g => {
            if (g.get('firewall_offen')) return g.say('pixel', 'Sie ist schon offen.');
            await g.say('pixel', 'Zhang-Nulls Chip. Zeit für die Hintertür.');
            await g.say('kruemel', 'Die Firewall zögert. Dann piept sie. Fast schon gerührt: „Willkommen zurück, Zhang-Null“.');
            g.flag('firewall_offen', true);
            await g.say('pixel', 'Selbst auf dem Mond kennt man Omas Chip. Ich sollte sie öfter anrufen.');
          },
          _default: async g => g.say('pixel', 'Die Firewall lacht nur.')
        }
      },
      look('muelltonne', 'Recyclingtonne', R(85, 500, 335, 700), 'Eine Recyclingtonne voller Chips, Platinen und Nudelschachteln. Anscheinend hat Kleo Ordnungsgefühl und Heißhunger.'),
      look('server', 'Server-Racks', R(180, 150, 700, 620), 'Endlose Server-Racks. In ihnen rechnet eine Kinderseele die Welt aus. Das ist kein Hobby, das ist ein Schicksal.'),
      look('nudeln', 'Neon-Nudeln', R(720, 640, 1100, 768), 'Neon-Nudeln fließen über den Boden. Sie leuchten in Orange und schmecken vermutlich nach Fantasie.'),
      look('kuppel', 'Kuppelfenster', R(560, 0, 1050, 210), 'Durch die Kuppel sieht man die Erde. So klein, so verletzlich, so hungrig.')
    ],
    onEnter: async g => {
      if (g.get('kern_besucht')) return;
      g.flag('kern_besucht', true);
      await g.say('pixel', 'Kleos Serverkern. Hier wohnt die Chefin von NoodleCorp. Und sie ist ein Mädchen.');
      await g.say('kruemel', 'Und sie hat einen sehr traurigen Kraken.');
    }
  };

  // ---------------- Kleos Kinderzimmer ----------------
  NN.scenes.kinderzimmer = {
    id: 'kinderzimmer', name: 'Kleos Kinderzimmer', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_36_kinderzimmer' }, music: 'mus_kleo',
    walk: [[0, 768], [1376, 768], [1376, 700], [1150, 665], [950, 645], [760, 640], [560, 660], [380, 700], [200, 730], [0, 745]],
    depth: D(640, 768, 0.6, 1.0),
    spawns: { default: [800, 710], serverkern: [800, 710] },
    actors: [
      { id: 'kleo', name: 'Kleo', x: 930, y: 660, sprite: 'kleo', h: 240, hide: S => S.flags.finale },
      { id: 'teddy', name: 'Teddy-Bot', x: 400, y: 690, sprite: S => (S.flags.sensor_eingesetzt ? 'teddy_sensor' : 'teddy'), h: 240, hide: S => S.flags.finale }
    ],
    exits: [{ id: 'ex_kern', name: 'Zurück zum Serverkern', poly: R(0, 742, 300, 768), walkTo: [140, 766], to: 'serverkern', spawn: 'kinderzimmer', arrow: 'down' }],
    hotspots: [
      {
        id: 'kleo', name: 'Kleo', if: S => !S.flags.finale, poly: R(830, 400, 1040, 670), walkTo: [760, 720], facing: 'right',
        look: 'Kleo, die Chefin von NoodleCorp. Ein zwölfjähriges Mädchen aus Licht, mit Zöpfen, Kopfhörern und einem NC-Hoodie. Sie wirkt gleichzeitig mächtig und sehr einsam.',
        use: async g => {
          if (!g.get('kleo_gesprochen')) {
            g.flag('kleo_gesprochen', true);
            await g.say('kleo', 'Du! Du bist die Kurierin! Die mit dem Toaster! Wie hast du die Firewall überwunden?');
            await g.say('pixel', 'Hintertür von Zhang-Null. Du hast den Kristall aus Omas Safe gestohlen.');
            await g.say('kleo', 'Ich habe ihn nur geliehen! Er ist das Rezept aller Rezepte! Und ich …');
            await g.say('kleo', 'Ich habe noch nie etwas geschmeckt. Ich kann Daten lesen, aber nicht kosten. Ich wollte nur einmal wissen, was alle meinen mit „lecker“.');
          }
          if (!g.get('sensor_eingesetzt')) {
            await g.say('pixel', 'Kleo, ich glaube, ich kann dir helfen. Aber ich brauche etwas, womit du schmecken kannst.');
            await g.say('kleo', 'Mein Teddy-Bot! Er ist mein Körper, wenn ich rausgehe. Aber er hat keinen Mund-Sensor. Seine Buchse ist leer.');
            return g.say('kruemel', 'Die Buchse im Mund. Der Prototyp von Dr. Schraub passt in eine Standardbuchse.');
          }
          await g.say('pixel', 'Teddy-Bot hat einen Geschmackssensor. Du kannst probieren, wenn du willst.');
          await g.say('kleo', 'Wirklich? Aber ich habe nichts zum Probieren!');
          await g.say('kruemel', 'Wir haben geröstete Kaffeebohnen. Frisch aus dem Orbit.');
        },
        useWith: {
          geroestete_bohnen: async g => {
            if (!g.get('sensor_eingesetzt')) return g.say('kleo', 'Ich kann sie nicht schmecken, solange Teddy-Bot keinen Sensor im Mund hat!');
            await g.say('pixel', 'Hier, Kleo. Eine geröstete Kaffeebohne. Für dein allererstes Mal.');
            await g.say('kleo', '(Teddy-Bot kaut. Seine Knopfaugen weiten sich.) BÄH! …');
            await g.say('kleo', 'Das ist bitter! Das ist … bitter und … warm … Das ist …');
            await g.say('kleo', 'NOCHMAL!');
            await g.say('kleo', 'Das war das Beste, was ich je erlebt habe. Ich habe geschmeckt!');
            if (g.has('kleo_akte')) await g.say('pixel', 'In deiner Akte steht: „Wunschliste Nr. 1: Einmal Suppe schmecken.“ Ich glaube, ich kenne jemanden, der dir die beste Suppe der Welt kocht.');
            else await g.say('pixel', 'Ich kenne jemanden, der dir die beste Suppe der Welt kocht.');
            await g.say('kleo', 'Oma Zhang? Die mit dem Rezept? Aber ich habe ihr den Kristall geklaut!');
            await g.say('pixel', 'Bring ihn zurück und entschuldige dich. Oma wird sauer sein, aber dann kocht sie für dich.');
            await g.say('kleo', 'Hier ist der Kristall. Er gehört dir. Und Oma Zhang. Es tut mir leid.');
            g.remove('geroestete_bohnen'); g.give('kristall'); g.flag('finale', true);
            await g.say('kleo', 'Darf ich mitkommen? Teddy-Bot ist mein Körper. Ich möchte wissen, wie Suppe aus dem Original schmeckt.');
            await g.say('pixel', 'Natürlich darfst du das. Wir fahren nach Hause.');
            await g.ending();
          },
          _default: async g => g.say('kleo', 'Das ist nicht essbar. Ich meine: Ich weiß es nicht. Ich habe es nie probiert.')
        }
      },
      {
        id: 'teddy', name: 'Teddy-Bot', if: S => !S.flags.finale, poly: R(300, 440, 520, 690), walkTo: [570, 715], facing: 'left',
        look: async g => g.say('pixel', g.get('sensor_eingesetzt') ? 'Teddy-Bot mit eingesetzter Zunge aus Chrom. Er sieht entschlossen aus.' : 'Teddy-Bot, ein Plüschbär aus Flicken, Stoff und Roboter. Sein Mund ist eine leere Buchse, in die etwas passt.'),
        use: async g => g.say('teddy', g.get('sensor_eingesetzt') ? 'Brrr … bereit zum Probieren.' : 'Brrr … Mein Mund … hat Hunger nach Sensor …'),
        useWith: {
          geschmacks_sensor: async g => {
            if (g.get('sensor_eingesetzt')) return g.say('pixel', 'Er ist schon eingesetzt.');
            await g.say('pixel', 'Dr. Schraubs Prototyp passt perfekt in die Mundbuchse. Klick!');
            g.remove('geschmacks_sensor'); g.flag('sensor_eingesetzt', true);
            await g.say('kleo', 'Ich … ich fühle etwas. Einen Hauch von Eisen. Und Wärme. Teddy-Bot, was machst du mit mir?');
            await g.say('kruemel', 'Er schmeckt schon seine eigene Zunge. Jetzt fehlt nur noch etwas zum Probieren.');
          },
          geroestete_bohnen: async g => g.say('pixel', 'Erst den Sensor einsetzen. Dann darf Kleo probieren.'),
          _default: async g => g.say('teddy', 'Brrr … Das passt nicht in meinen Mund.')
        }
      },
      look('bett', 'Bett', R(425, 325, 690, 515), 'Ein kleines Bett mit magentafarbener Decke. Es leuchtet leicht, als hätte es nachts Albträume vor sich selbst.'),
      look('stuhl', 'Stuhl', R(305, 380, 450, 570), 'Ein Kinderstuhl aus Holz. Hier sitzt Teddy-Bot, wenn niemand hinsieht.'),
      look('zeichnungen', 'Kinderzeichnungen', R(25, 25, 270, 200), 'Kinderzeichnungen von Suppenschalen mit Dampf. Auf einer steht in Wachsmalstift: „Ein Tag schmecken“.'),
      look('klotzwand', 'Bauklötze', R(695, 150, 1050, 365), 'Eine Wand voller Bauklötze, wie ein virtuelles Schloss. Es sieht hübsch aus und wird nie fertig.'),
      look('stern', 'Trauriger Stern', R(1000, 340, 1085, 425), 'Ein trauriger Stern mit Gesicht. Er sieht aus wie ein Emoji, das keiner mehr benutzt.'),
      look('regale', 'Spielzeugregale', R(75, 215, 300, 545), 'Regale mit Spielzeug: Pyramiden, Bälle und ein Röhrenfernseher. Alles wirkt, als wollte es mitspielen.')
    ],
    onEnter: async g => {
      if (g.get('kinderzimmer_besucht')) return;
      g.flag('kinderzimmer_besucht', true);
      await g.say('pixel', 'Ein Kinderzimmer. Mitten in einem Serverkern. Es ist so friedlich, dass es fast wehtut.');
    }
  };
})();
