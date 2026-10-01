// Szenen Akt 1, Teil 1: Imbiss und Nudelgasse. Koordinaten in "space" (Pixel des Hintergrundbilds, 1376x768).
// Skripte sind async-Funktionen mit dem API-Objekt g (siehe src/engine.js).
window.NN = window.NN || {};
NN.scenes = {};

NN.sceneHelpers = {
  R: NN.util.rect,
  // Ausgang am unteren Bildrand
  bottomExit(name, to, spawn, walkX) {
    return { id: 'ex_' + to, name, poly: NN.util.rect(130, 742, 1376, 768), walkTo: [walkX || 700, 766], to, spawn, arrow: 'down' };
  },
  // Kurze Beschreibungs-Hotspots ohne Logik
  look(id, name, poly, text, use) {
    return { id, name, poly, walkTo: null, look: text, use: use || text };
  }
};

(function () {
  const H = NN.sceneHelpers, R = H.R;

  NN.scenes.imbiss = {
    id: 'imbiss', name: 'Zhangs Ramen-Imbiss', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_01_zhangs_imbiss' }, music: 'mus_imbiss',
    walk: [[180, 768], [1376, 768], [1376, 690], [1040, 565], [960, 548], [720, 560], [580, 640], [300, 705]],
    depth: { y0: 548, y1: 768, s0: 0.6, s1: 1.0 },
    spawns: { default: [880, 690], nudelgasse: [700, 740] },
    props: [{ if: S => !S.flags.foto_genommen, draw: () => NN.drawProp('foto_rahmen', 962, 333, 92) }],
    actors: [{ id: 'oma', name: 'Oma Zhang', x: 600, y: 636, sprite: 'oma', flip: true, h: 218 }],
    exits: [{ id: 'ex_gasse', name: 'Nudelgasse', poly: R(180, 738, 1376, 768), walkTo: [700, 766], to: 'nudelgasse', spawn: 'imbiss', arrow: 'down' }],
    pickups: [
      { item: 'sojasosse', hot: 'regal', x: 165, y: 242, w: 38 },
      { item: 'nudelsieb', hot: 'regal', x: 255, y: 302, w: 62 },
      { item: 'essstaebchen', hot: 'theke', x: 470, y: 437, w: 78 },
      { item: 'graue_paste', hot: 'paste', x: 600, y: 420, w: 48 }
    ],
    hotspots: [
      {
        id: 'oma', name: 'Oma Zhang', poly: R(548, 440, 660, 640), walkTo: [700, 650], facing: 'left',
        look: 'Oma Zhang. 87 Jahre alt, früher Hackerlegende, heute Suppenchefin. Und gerade ziemlich sauer.',
        use: async g => {
          if (!g.get('oma_gesprochen')) { g.flag('oma_gesprochen', true); await g.say('oma', 'Pixel! Mein Kristall ist weg! Ohne ihn schmeckt die Stadt nach Bürokleber!'); }
          for (;;) {
            const opts = ['Was genau ist passiert?', 'Hast du einen Verdacht?', 'Wie kann ich helfen?', 'Bis später, Oma.'];
            const i = await g.choose(opts);
            if (i === 0) {
              await g.say('pixel', 'Erzähl mir alles von Anfang an.');
              await g.say('oma', 'Ich war kurz im Hinterhof, Nudelteig kneten. Als ich wiederkam: Safe offen. Kein Einbruch, keine Spuren.');
              await g.say('oma', 'Nur dieser Fußabdruck da. Und der riecht nach Sojasoße.');
            } else if (i === 1) {
              await g.say('pixel', 'Wer kennt das Rezept außer dir?');
              await g.say('oma', 'Niemand! Naja … außer die Firma, die meine Suppenautomaten in der ganzen Stadt aufgestellt hat.');
              await g.say('kruemel', 'Ich sage nur: Fußabdruck. Scan. Ich hätte da eine Idee.');
            } else if (i === 2) {
              await g.say('oma', 'Finde meinen Kristall! Sieh dich um, nimm alles mit, was nicht niet- und nagelfest ist.');
              await g.say('oma', 'Nur mein Nudelsieb nicht. Doch. Nimm es. Ich hab zwei.');
            } else break;
          }
          await g.say('oma', 'Und iss was! Du bist zu dünn! … Ach nein, es gibt ja nur Paste.');
        },
        useWith: {
          log_stick: async g => {
            if (g.get('gab_zhang_chip')) return g.say('oma', 'Das Log kenne ich schon. Schnapp dir endlich den Dieb!');
            await g.say('pixel', 'Oma, sieh dir das an. Flugdaten einer Lieferdrohne. Die Nummer: NC-07.');
            await g.say('oma', 'NC … NoodleCorp. Und der Auftraggeber? … „Kleo“. Nie gehört.');
            await g.say('oma', 'Dann wird es Zeit, dass du mein altes Geheimnis erfährst. Früher hieß ich nämlich Zhang-Null.');
            await g.say('pixel', 'Die Zhang-Null? Die Hackerlegende?');
            await g.say('oma', 'Hier, mein Chip. Damals habe ich in jedes System eine Hintertür gebaut. Vielleicht funktioniert sie noch.');
            g.give('zhang_chip');
            await g.say('oma', 'Fahr mit der Magnetbahn nach Mittel-Heights. Dort sitzt NoodleCorp.');
          },
          _default: async g => g.say('oma', 'Mein Kind, das kann ich nicht brauchen. Bring mir lieber meinen Kristall.')
        }
      },
      {
        id: 'automat', name: 'Suppenautomat', poly: R(640, 210, 750, 370), walkTo: [700, 610], facing: 'up',
        look: 'Der Suppenautomat. Früher Brühe, heute graue Paste. Sehr nachhaltig, wenn man Zement isst.',
        use: 'Ich drücke den Knopf. Der Automat seufzt und spuckt noch einen grauen Klecks. Ich fühle mich schuldig.'
      },
      {
        id: 'paste', name: 'Graue Paste', poly: R(630, 375, 720, 445), walkTo: [690, 600], facing: 'up',
        look: 'Graue Paste. Sie hat die Konsistenz von Enttäuschung.',
        use: async g => {
          if (g.get('gab_graue_paste')) return g.say('pixel', 'Eine Probe reicht. Mein Magen sagt danke.');
          await g.say('pixel', 'Eine Probe kann nicht schaden. Ein leeres Glas steht praktischerweise auch herum.');
          g.give('graue_paste');
        }
      },
      { id: 'topf', name: 'Suppentopf', poly: R(370, 300, 535, 420), walkTo: [480, 640], facing: 'up', look: 'Der Topf brodelt. Mit Brühe aus Panik und Hoffnung.', use: 'Viel zu heiß. Und er sieht mich an, als wollte er etwas sagen.' },
      {
        id: 'regal', name: 'Küchenregal', poly: R(120, 215, 300, 340), walkTo: [330, 700], facing: 'up',
        look: 'Ein Regal mit Küchenkram. Erstaunlich sauber für einen Imbiss.',
        use: async g => {
          if (g.get('gab_nudelsieb')) return g.say('pixel', 'Hier ist nichts mehr. Außer Staub mit Gewissensbissen.');
          await g.say('pixel', 'Ein Nudelsieb und eine Flasche Sojasoße. Immerhin etwas, das noch Geschmack hat.');
          g.give('nudelsieb'); g.give('sojasosse');
        }
      },
      {
        id: 'theke', name: 'Theke', poly: R(215, 400, 745, 520), walkTo: [420, 690], facing: 'up',
        look: 'Eine lange Theke aus dunklem Holz. Hier wurden schon tausend Suppen serviert.',
        use: async g => {
          if (g.get('gab_essstaebchen')) return g.say('pixel', 'Nichts mehr da. Nur Brühenflecken und Erinnerungen.');
          await g.say('pixel', 'Ein Paar Essstäbchen zwischen den Flecken. Nehm ich mit.');
          g.give('essstaebchen');
        }
      },
      { id: 'safe', name: 'Offener Safe', poly: R(785, 350, 1040, 550), walkTo: [900, 600], facing: 'up', look: 'Der Safe ist offen und leer. Keine Kratzer. Jemand kannte die Kombination – oder hatte sehr gute Hände.', use: 'Leer. Wie mein Konto am Monatsende.' },
      {
        id: 'rahmen', name: 'Bilderrahmen', poly: R(920, 230, 1005, 325), walkTo: [960, 590], facing: 'up',
        look: async g => {
          if (g.get('foto_genommen')) return g.say('pixel', 'Ein leerer Rahmen. Wo das Foto war, ist ein hellerer Fleck.');
          await g.say('pixel', 'Ein Foto von Oma und ihrem Mann. Die beiden lachen.');
        },
        use: async g => {
          if (g.get('foto_genommen')) return g.say('pixel', 'Der Rahmen ist jetzt leer. Mehr gibt es hier nicht.');
          g.flag('foto_genommen', true);
          await g.say('pixel', 'Das nehme ich mit. Oma wird es verstehen. Hoffentlich.');
          g.give('altes_foto');
        }
      },
      {
        id: 'fussabdruck', name: 'Fußabdruck', poly: R(880, 545, 975, 595), walkTo: [925, 640], facing: 'down',
        look: 'Ein Fußabdruck aus Sojasoße. Erstaunlich klein. Und erstaunlich frisch.',
        use: 'Ich will nicht hineintreten. Nicht nach dem letzten Mal.',
        useWith: {
          kruemel: async g => {
            if (g.get('spur_nc')) return g.say('kruemel', 'Schon gescannt. Ergebnis: immer noch NoodleCorp.');
            if (g.get('kruemel_leer') && !g.get('kruemel_geladen')) return g.say('kruemel', '0 Prozent Akku. Ich bin ein sehr müder Toaster.');
            await g.say('pixel', 'Krümel, scan das mal.');
            await g.kruemelScan();
            await g.say('kruemel', 'Muster erkannt: Profil mit Firmenlogo. NC. NoodleCorp.');
            await g.say('pixel', 'NoodleCorp? Die Firma, die die Suppenautomaten betreibt!');
            g.flag('spur_nc', true);
            await g.say('kruemel', 'Akku: … 1 Prozent. … Ich brauche … Strom … piep.');
            g.flag('kruemel_leer', true);
          }
        }
      },
      { id: 'fenster', name: 'Fenster', poly: R(1035, 60, 1376, 440), walkTo: [1150, 640], facing: 'up', look: 'Regen, Neon und ein Schwarm Lieferdrohnen. Gute Gegend.', use: 'Ich öffne das Fenster nicht. Der Regen schmeckt nach Kabelbrand.' }
    ],
    onEnter: async g => {
      if (g.get('intro_szene')) return;
      g.flag('intro_szene', true);
      await g.say('oma', 'Pixel! Endlich! Mein Geschmacks-Kristall ist gestohlen worden!');
      await g.say('pixel', 'Ruhig, Oma. Ich sehe mich um.');
      await g.say('kruemel', 'Ich rieche Sojasoße. Und Verbrechen.');
      g.toast('Tipp: Linksklick = gehen/benutzen, Rechtsklick = ansehen.');
    }
  };

  NN.scenes.nudelgasse = {
    id: 'nudelgasse', name: 'Nudelgasse', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_02_nudelgasse' }, music: 'mus_unterstadt',
    walk: [[0, 768], [1376, 768], [1376, 690], [1300, 660], [1100, 640], [870, 585], [700, 575], [560, 640], [300, 645], [150, 700], [0, 745]],
    depth: { y0: 575, y1: 768, s0: 0.55, s1: 1.0 },
    spawns: { default: [200, 730], imbiss: [200, 730], waschsalon: [360, 720], baeckerei: [560, 720], schrottplatz: [740, 650], bar: [1030, 730], basar: [1290, 730] },
    props: [{
      if: S => !S.flags.gab_schroedinger_kiste,
      draw: (ctx, L, S) => NN.drawProp(S.flags.kiste_offen ? 'kiste_offen' : 'kiste_zu', 900, 722, 110)
    }],
    actors: [{ id: 'bello', name: 'Bello-5000', x: 745, y: 640, sprite: 'bello', flip: true, h: 150, hide: S => S.flags.bello_weg }],
    exits: [
      { id: 'ex_imbiss', name: 'Zhangs Imbiss', poly: R(20, 300, 270, 650), walkTo: [170, 735], to: 'imbiss', spawn: 'nudelgasse', arrow: 'left' },
      { id: 'ex_wasch', name: 'Waschsalon „Waschbär“', poly: R(280, 380, 430, 625), walkTo: [360, 720], to: 'waschsalon', spawn: 'nudelgasse' },
      { id: 'ex_baecker', name: 'Bäckerei', poly: R(455, 290, 625, 515), walkTo: [560, 700], to: 'baeckerei', spawn: 'nudelgasse' },
      { id: 'ex_bar', name: 'Bar „Null Pointer“', poly: R(970, 385, 1095, 625), walkTo: [1030, 720], to: 'bar', spawn: 'nudelgasse' },
      { id: 'ex_basar', name: 'Schwarzer Basar', poly: R(1185, 250, 1376, 650), walkTo: [1290, 725], to: 'basar', spawn: 'nudelgasse', arrow: 'right' }
    ],
    pickups: [{ item: 'neonroehre', hot: 'tonne', x: 540, y: 566, w: 80 }],
    hotspots: [
      {
        id: 'gate', name: 'Schrottplatz', poly: R(625, 385, 855, 555), walkTo: [740, 650], facing: 'up',
        look: 'Ein altes Tor zum Schrottplatz. Dahinter türmen sich Dinge, die früher mal Dinge waren.',
        use: async g => {
          if (!g.get('bello_weg')) return g.say('pixel', 'Bello-5000 sitzt davor und fletscht freundlich die Zähne. Er lässt mich nicht durch.');
          await g.goto('schrottplatz', 'nudelgasse');
        }
      },
      {
        id: 'bello', name: 'Bello-5000', poly: R(690, 540, 810, 650), walkTo: [660, 700], facing: 'right',
        look: 'Bello-5000, Wachhund der Schrottplatz-Mafia. Sein Schwanz wedelt so heftig, dass er Strom erzeugt.',
        use: async g => { await g.say('bello', 'Wuff! (Übersetzung: Spiel mit mir oder verschwinde.)'); await g.say('pixel', 'Ich brauche etwas zum Werfen. Stöckchen, Stab, irgendwas Langes.'); },
        useWith: {
          essstaebchen: async g => {
            await g.say('pixel', 'Bello! Hol das Stöckchen!');
            await g.say('bello', 'WUFF!!! (Er rennt in Lichtgeschwindigkeit die Gasse hinunter.)');
            g.flag('bello_weg', true);
            await g.say('pixel', 'Das gibt mir ein paar Minuten. Die Essstäbchen hole ich mir später wieder.');
          },
          _default: async g => g.say('bello', 'Wuff. (Das ist kein Stöckchen.)')
        }
      },
      {
        id: 'tonne', name: 'Mülltonne', poly: R(410, 525, 635, 745), walkTo: [520, 762], facing: 'up',
        look: 'Eine grüne Mülltonne. Sie quillt über vor Schrott und Hoffnungslosigkeit.',
        use: async g => {
          if (g.get('gab_neonroehre')) return g.say('pixel', 'Ich habe genug Müll für heute angefasst.');
          await g.say('pixel', 'Da leuchtet etwas im Müll … eine Neonröhre! Sie flackert noch.');
          g.give('neonroehre');
        }
      },
      {
        id: 'kiste', name: 'Holzkiste', poly: R(850, 640, 950, 725), walkTo: [900, 745], facing: 'up',
        if: S => !S.flags.gab_schroedinger_kiste,
        look: 'Auf dem Schild steht: „Nicht öffnen! Katze (vielleicht).“',
        use: async g => {
          if (!g.get('kiste_offen')) {
            g.flag('kiste_offen', true);
            await g.say('pixel', 'Ich öffne die Kiste ja nur ganz kurz …');
            await g.say('pixel', 'Leer. Die Katze ist wohl gerade woanders. Oder sie ist nur da, wenn niemand hinsieht?');
            return;
          }
          await g.say('pixel', 'Ich mache den Deckel wieder zu, ohne hineinzusehen, und nehme die Kiste mit. Wer weiß, wann die Katze wieder da ist.');
          g.give('schroedinger_kiste');
        }
      },
      { id: 'nudelschild', name: 'Neonschild „NUDEL“', poly: R(20, 100, 270, 300), walkTo: [170, 735], look: 'Das Neonschild „NUDEL“ flackert. Es will nur noch schlafen.', use: 'Da komme ich ohne Leiter nicht ran.' },
      { id: 'waschbaer_schild', name: 'Waschbär-Schild', poly: R(280, 150, 470, 380), walkTo: [360, 720], look: 'Ein Waschbär mit Hemd. Ein Waschsalon mit Humor.', use: 'Der Waschbär hängt zu hoch.' },
      { id: 'byte_schild', name: 'Bäckerei-Schild', poly: R(470, 210, 620, 290), walkTo: [560, 700], look: '„Zum knusprigen Byte“. Ein Croissant mit Prozessor. Ich hab Hunger.', use: 'Ich komme nicht ran. Aber es riecht nach Frühstück.' }
    ],
    onEnter: async g => {
      if (g.get('gasse_besucht')) return;
      g.flag('gasse_besucht', true);
      await g.say('pixel', 'Die Nudelgasse. Hier kennt jeder jeden. Und keiner redet darüber.');
      await g.say('kruemel', 'Im Gegensatz zu dir. Du redest immer.');
    }
  };
})();
