// Szenen. Koordinaten in "space" (Pixel des Hintergrundbilds), die Engine rechnet auf den Bildschirm um.
// Skripte sind async-Funktionen mit dem API-Objekt g (siehe src/engine.js).
window.NN = window.NN || {};
NN.scenes = {};

(function () {
  const R = NN.util.rect;

  // Platzhalter-Figur für Oma Zhang, bis das NPC-Sheet vorliegt
  function drawOma(ctx, x, y, s) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    ctx.lineWidth = 5; ctx.strokeStyle = '#1a0f26'; ctx.lineJoin = 'round';
    ctx.fillStyle = '#c9559b'; ctx.beginPath(); ctx.roundRect(-46, -110, 92, 110, 26); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#ffe6cf'; ctx.beginPath(); ctx.arc(0, -138, 38, 0, 7); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#d8d3e0'; ctx.beginPath(); ctx.arc(0, -182, 18, 0, 7); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.lineWidth = 4;
    [-16, 16].forEach(dx => { ctx.beginPath(); ctx.arc(dx, -140, 14, 0, 7); ctx.fill(); ctx.stroke(); });
    ctx.fillStyle = '#1a0f26'; [-16, 16].forEach(dx => { ctx.beginPath(); ctx.arc(dx, -140, 4, 0, 7); ctx.fill(); });
    ctx.restore();
  }

  function drawFoto(ctx, L, S) {
    if (S.flags.foto_genommen) return;
    const [x0, y0] = L(930, 242), [x1, y1] = L(996, 312);
    ctx.save();
    ctx.fillStyle = '#f2e3c2'; ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
    ctx.fillStyle = '#c9559b'; ctx.beginPath(); ctx.arc(x0 + (x1 - x0) * 0.32, y0 + (y1 - y0) * 0.5, 13, 0, 7); ctx.fill();
    ctx.fillStyle = '#27a9c4'; ctx.beginPath(); ctx.arc(x0 + (x1 - x0) * 0.68, y0 + (y1 - y0) * 0.5, 13, 0, 7); ctx.fill();
    ctx.restore();
  }

  NN.scenes.imbiss = {
    id: 'imbiss', name: 'Zhangs Ramen-Imbiss', space: [1376, 768], fit: 'stretch',
    bg: { tiers: 'bg_01_zhangs_imbiss' }, music: 'mus_imbiss',
    walk: [[180, 768], [1376, 768], [1376, 690], [1040, 565], [960, 548], [720, 560], [580, 640], [300, 705]],
    depth: { y0: 548, y1: 768, s0: 0.6, s1: 1.0 },
    spawns: { default: [880, 690], nudelgasse: [700, 740] },
    props: [{ draw: drawFoto }],
    actors: [{ id: 'oma', name: 'Oma Zhang', x: 600, y: 636, h: 200, draw: drawOma }],
    exits: [
      { id: 'ex_gasse', name: 'Nudelgasse', poly: R(180, 738, 1376, 768), walkTo: [700, 766], to: 'nudelgasse', spawn: 'imbiss', arrow: 'down' }
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
      {
        id: 'topf', name: 'Suppentopf', poly: R(370, 300, 535, 420), walkTo: [480, 640], facing: 'up',
        look: 'Der Topf brodelt. Mit Brühe aus Panik und Hoffnung.',
        use: 'Viel zu heiß. Und er sieht mich an, als wollte er etwas sagen.'
      },
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
      {
        id: 'safe', name: 'Offener Safe', poly: R(785, 350, 1040, 550), walkTo: [900, 600], facing: 'up',
        look: 'Der Safe ist offen und leer. Keine Kratzer. Jemand kannte die Kombination – oder hatte sehr gute Hände.',
        use: 'Leer. Wie mein Konto am Monatsende.'
      },
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
            if (g.get('kruemel_leer')) return g.say('kruemel', '0 Prozent Akku. Ich bin ein sehr müder Toaster.');
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
      {
        id: 'fenster', name: 'Fenster', poly: R(1035, 60, 1376, 440), walkTo: [1150, 640], facing: 'up',
        look: 'Regen, Neon und ein Schwarm Lieferdrohnen. Gute Gegend.',
        use: 'Ich öffne das Fenster nicht. Der Regen schmeckt nach Kabelbrand.'
      }
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
    id: 'nudelgasse', name: 'Nudelgasse (Platzhalter)', space: [1584, 672], fit: 'contain',
    bg: { file: 'assets/raw/ref_03_stil_nudelgasse.png' }, music: 'mus_unterstadt',
    walk: [[150, 672], [1584, 672], [1584, 600], [1250, 520], [900, 500], [700, 490], [480, 540], [300, 600]],
    depth: { y0: 490, y1: 672, s0: 0.55, s1: 0.9 }, charScale: 0.7,
    spawns: { default: [330, 640], imbiss: [330, 640] },
    actors: [],
    exits: [
      { id: 'ex_imbiss', name: 'Zhangs Imbiss', poly: R(110, 290, 420, 520), walkTo: [300, 610], to: 'imbiss', spawn: 'nudelgasse', arrow: 'left' }
    ],
    hotspots: [
      {
        id: 'tonne', name: 'Mülltonne', poly: R(465, 555, 705, 672), walkTo: [585, 650], facing: 'up',
        look: 'Eine grüne Mülltonne. Sie quillt über vor Schrott und Hoffnungslosigkeit.',
        use: async g => {
          if (g.get('gab_neonroehre')) return g.say('pixel', 'Ich habe genug Müll für heute angefasst.');
          await g.say('pixel', 'Da leuchtet etwas im Müll … eine Neonröhre! Flackert noch.');
          g.give('neonroehre');
        }
      },
      {
        id: 'nudelschild', name: 'Neonschild „NUDEL“', poly: R(110, 60, 470, 290), walkTo: [330, 600], facing: 'up',
        look: 'Das Neonschild flackert. Es will nur noch schlafen.', use: 'Da komme ich ohne Leiter nicht ran.'
      },
      {
        id: 'bar', name: 'Bar', poly: R(950, 230, 1190, 570), walkTo: [1050, 560], facing: 'up',
        look: 'Die Hacker-Bar. Hinter der Tür dudelt Lo-Fi und glitcht ein Barkeeper.',
        use: 'Noch verschlossen. Die Bar wird erst in einer der nächsten Ausbaustufen gebaut.'
      },
      {
        id: 'waschsalon', name: 'Waschsalon', poly: R(500, 280, 660, 500), walkTo: [580, 540], facing: 'up',
        look: 'Ein Waschsalon. Hinter dem Fenster drehen sich Socken im Kreis.', use: 'Kommt später.'
      },
      {
        id: 'baeckerei', name: 'Bäckerei', poly: R(660, 240, 780, 500), walkTo: [700, 520], facing: 'up',
        look: 'Eine Bäckerei. Der Duft nach echtem Brot liegt in der Luft. Das ist verboten wahrscheinlich.', use: 'Kommt später.'
      },
      {
        id: 'basar', name: 'Markt', poly: R(1290, 150, 1584, 480), walkTo: [1400, 560], facing: 'up',
        look: 'Ein Torbogen mit Lampions. Dahinter der Schwarze Markt.', use: 'Kommt später.'
      }
    ],
    onEnter: async g => {
      if (g.get('gasse_besucht')) return;
      g.flag('gasse_besucht', true);
      await g.say('pixel', 'Die Nudelgasse. Hier geht es bald weiter.');
      g.toast('Platzhalter-Szene: Hier werden noch Orte gebaut.');
    }
  };
})();
