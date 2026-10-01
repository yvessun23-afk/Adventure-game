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
  schraube: { name: 'Schraube', look: 'Eine Schraube. Irgendwer vermisst sie bestimmt.' },
  // Akt 2
  zeitung: { name: 'Zeitung „Tageskrümel“', look: 'Auf der Titelseite: ein Foto vom Wappen von Chrom. Im Kleingedruckten: „Das Fundbüro sucht den Besitzer eines Platin-Passes.“' },
  tablett: { name: 'Kantinentablett', look: 'Ein stabiles Tablett. Man kann damit tragen, schützen und, wenn nötig, auffangen.' },
  flasche: { name: 'Leere Flasche', look: 'Eine saubere, leere Glasflasche. Sie hofft auf Wasser.' },
  flasche_wasser: { name: 'Flasche mit Wasser', look: 'Echtes Wasser aus dem Museum. Es plätschert vor Stolz.' },
  kraeuterbund: { name: 'Kräuterbund', look: 'Blau-lila Kräuter. Sie duften nach Hoffnung und ein bisschen nach Medizin.' },
  kamille: { name: 'Kamillenblüten', look: 'Weiße Kamillenblüten mit gelber Mitte. Das beste Mittel gegen Nervosität.' },
  kittel: { name: 'Mitarbeiterkittel', look: 'Ein weißer Kittel. Am Namensschild steht „Brenda M., Abteilung Geschmack“.' },
  formular_404b: { name: 'Formular 404-B', look: 'Eine Verlustmeldung mit Beweismittel. Sie ist vollständig ausgefüllt und völlig sinnlos.' },
  holo_siegel: { name: 'Holo-Siegel', look: 'Ein glänzender Holo-Aufkleber mit dem Wappen von Chrom. Er schillert in allen Farben.' },
  platin_pass: { name: 'Platin-Pass', look: 'Der Pass zur Oberstadt. Das Wappen von Chrom funkelt in der Mitte.' },
  skalpell: { name: 'Skalpell', look: 'Ein sehr scharfes Skalpell. Für einen Friseur ein Geschenk.' },
  geschmacks_sensor: { name: 'Geschmacks-Sensor', look: 'Eine kleine Zunge aus Chrom mit Kabel. Prototyp, passt in eine Standardbuchse.' },
  jackpot_chip: { name: 'Jackpot-Chip', look: 'Ein goldener Chip über 5000 Credits. Er hat meinen Betrug überlebt.' },
  kleo_akte: { name: 'Akte „KLEO“', look: 'Eine Akte mit Kinderzeichnung. Auf der Wunschliste steht „Einmal Suppe schmecken“.' },
  zahnrad: { name: 'Zahnrad', look: 'Ein Zahnrad. Irgendwo fehlt eins.' },
  kabelsalat: { name: 'Kabelsalat', look: 'Ein Knäuel Kabel. Ich weiß nicht, wo ein Ende ist.' },
  gummibaerchen: { name: 'Gummibärchen', look: 'Ein einzelnes Gummibärchen. Es sieht mich vorwurfsvoll an.' },
  kaffeetasse: { name: 'Kaffeetasse', look: 'Eine Kaffeetasse mit Kaffeesatz. Sie hat schon bessere Tage gesehen.' },
  gluehbirne: { name: 'Glühbirne', look: 'Eine Glühbirne. Sie erinnert mich an eine Idee, die ich noch nicht hatte.' },
  buero_klammer: { name: 'Büroklammer', look: 'Eine Büroklammer. Der Held des Büroalltags.' },

  // Akt 3
  goldener_golfball: { name: 'Goldener Golfball', look: 'Ein goldener Golfball. Wertvoll, protzig und unpraktisch.' },
  raumanzug: { name: 'Antiker Raumanzug', look: 'Ein Raumanzug aus Chrom. Er riecht nach Mottenkugeln und Heldentum.' },
  shuttle_ticket: { name: 'Shuttle-Ticket', look: 'Ein Ticket mit dem Aufdruck „VENUS-EXPRESS“. Es führt zum Hyper-Hub.' },
  kaffeebohnen: {
    name: 'Kaffeebohnen', look: 'Frische Kaffeebohnen aus dem Orbit. Noch ungeröstet und etwas verwirrt.',
    combine: {
      kruemel: async g => {
        if (g.get('kruemel_leer') && !g.get('kruemel_geladen')) return g.say('kruemel', 'Rösten ohne Strom? Ich bin ein Toaster, kein Kraftwerk.');
        await g.say('pixel', 'Krümel, kannst du die Bohnen rösten?');
        await g.say('kruemel', 'Röstgrad dunkel, Aromastufe Weltall. Moment …');
        g.remove('kaffeebohnen'); g.give('geroestete_bohnen');
        await g.say('kruemel', 'Perfekt geröstet. Es duftet nach Montagmorgen und Neuanfang.');
      }
    }
  },
  geroestete_bohnen: { name: 'Geröstete Bohnen', look: 'Dunkel geröstete Kaffeebohnen. Sie duften nach Neuanfang.' },
  genehmigung: { name: 'Genehmigung', look: 'Eine Pausenraum-Genehmigung mit Unterschrift und Siegel von Käpt’n Kabel.' },
  bergbau_helm: { name: 'Bergbau-Helm', look: 'Ein Helm mit Lampe. Er macht mich zur Heldin der Dunkelheit.' },
  code_zettel: { name: 'Code-Zettel', look: 'Ein Zettel mit dem Zugangscode: „489-GAT“.' },
  kristall: { name: 'Geschmacks-Kristall', look: 'Der Geschmacks-Kristall. Er schimmert golden. Darin eine winzige Nudelschale.' }
};

// Krümel als Werkzeug (Button unten links)
NN.kruemelTool = { id: 'kruemel', name: 'Krümel' };
