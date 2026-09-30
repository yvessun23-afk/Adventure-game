// Gegenstände. icon = Dateiname in assets/sprites/items (ohne .png)
window.NN = window.NN || {};

NN.items = {
  altes_foto: {
    name: 'Altes Foto',
    look: 'Ein Foto von Oma Zhang und ihrem Mann, beide lachen. Auf der Rückseite steht etwas.',
    // Benutzen (Gegenstand anklicken, dann erneut anklicken): Foto umdrehen
    useSelf: async g => {
      g.flag('passwort_bekannt', true);
      await g.say('pixel', 'Auf der Rückseite steht: „Für meinen Erdnuss-Chili-Fan“.');
      await g.say('pixel', 'Erdnuss-Chili. Das klingt verdächtig nach einem Passwort.');
    }
  },
  nudelsieb: { name: 'Nudelsieb', look: 'Ein Nudelsieb. Hat schon mehr Suppen gesehen als ich Sonnenaufgänge.' },
  essstaebchen: { name: 'Essstäbchen', look: 'Zwei Essstäbchen. Vielseitig: Besteck, Haarschmuck, Zange.' },
  sojasosse: { name: 'Sojasoße', look: 'Dunkel, salzig, würzig. Im Gegensatz zu der grauen Paste.' },
  graue_paste: { name: 'Glas graue Paste', look: 'Eine Probe der Paste. Sammlerstück – leider auf die unschöne Art.' },
  neonroehre: { name: 'Neonröhre', look: 'Ein leuchtendes „A“. Flackert noch tapfer.' },
  schroedinger_kiste: { name: 'Geschlossene Kiste', look: 'Auf dem Schild steht: „Nicht öffnen! Katze (vielleicht).“' },
  kranmagnet: { name: 'Kranmagnet', look: 'Ein mächtiger Magnet an einem Seil. Zieht alles an. Sogar Ärger.' },
  sicherung: { name: 'Sicherung', look: 'Eine Keramiksicherung. Noch warm.' },
  speicherstick: { name: 'Speicherstick', look: 'Ein Speicherstick. Leer, aber hoffnungsvoll.' },
  glasfaserkabel: { name: 'Glasfaserkabel', look: 'Ein leuchtendes Kabel. Hübsch und praktisch.' },
  log_stick: { name: 'Stick mit Log', look: 'Enthält Flugdaten einer Lieferdrohne. Das Geheimnis liegt auf meiner Handfläche.' },
  powerbank: { name: 'Powerbank', look: 'Saft für müde Toaster.' },
  baguette: {
    name: 'Baguette', look: 'Ein echtes Baguette! In dieser Stadt so selten wie Sonnenschein.',
    combine: {
      kruemel: async g => {
        if (g.get('kruemel_leer') && !g.get('kruemel_geladen')) return g.say('kruemel', 'Toasten ohne Strom? Ich bin ein Toaster, kein Wunder.');
        await g.say('pixel', 'Krümel, machst du das Baguette knusprig?');
        await g.say('kruemel', 'Einen Moment. Ich bin Toaster. Das ist mein Beruf, meine Berufung und mein einziger Hobby.');
        g.remove('baguette'); g.give('knuspertoast');
        await g.say('kruemel', 'Perfekt gebräunt. Es riecht nach Zuhause.');
      }
    }
  },
  knuspertoast: { name: 'Knuspertoast', look: 'Perfekt gebräunt. Krümel ist stolz, und die Tauben sabbern.' },
  zhang_chip: { name: 'Hackerchip „ZN“', look: 'Zhang-Nulls legendärer Hackerchip. Oma hatte ein Vorleben.' },
  stempel: {
    name: 'Stempel „GÜLTIG“', look: 'Mit diesem Stempel ist jedes Stück Papier plötzlich amtlich.',
    combine: {
      altes_ticket: async g => {
        await g.say('pixel', 'Ein bisschen Tinte, ein bisschen Zuversicht …');
        g.remove('altes_ticket'); g.remove('stempel'); g.give('gueltiges_ticket');
        await g.say('kruemel', 'Das ist Urkundenfälschung. Aber sehr stilvolle.');
      }
    }
  },
  altes_ticket: { name: 'Zerknittertes Ticket', look: 'Ein Magnetbahn-Ticket. Abgelaufen, zerknittert, traurig.' },
  gueltiges_ticket: { name: 'Gültiges Ticket', look: 'Gestempelt und amtlich. Schaffner 4711 wird weinen vor Freude.' },
  schraube: { name: 'Schraube', look: 'Eine Schraube. Irgendwer vermisst sie bestimmt.' }
};

// Krümel als Werkzeug (Button unten links)
NN.kruemelTool = { id: 'kruemel', name: 'Krümel' };
