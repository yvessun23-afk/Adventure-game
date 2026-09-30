// Hilfesystem: drei Stufen pro Rätsel (Hinweis, Ansatz, Lösung). IDs wie in docs/story.md
window.NN = window.NN || {};

NN.hints = [
  {
    id: 'A1.01', title: 'Die Spur im Imbiss',
    done: s => !!s.flags.spur_nc,
    tiers: [
      'Am Tatort gibt es einen Hinweis auf dem Boden. Schau dich im Imbiss um.',
      'Der Fußabdruck aus Sojasoße ist auffällig. Und du hast einen Begleiter, der scannen kann.',
      'Klicke unten links auf „Krümel“ und dann auf den Fußabdruck vor dem Safe.'
    ]
  },
  {
    id: 'A1.02', title: 'Das Foto an der Wand',
    done: s => !!s.flags.passwort_bekannt,
    tiers: [
      'Irgendetwas an der Wand im Imbiss ist persönlich. Vielleicht steckt ein Geheimnis dahinter.',
      'Nimm das Foto aus dem Rahmen und sieh dir an, was hinten drauf steht.',
      'Klicke den Rahmen an. Dann im Inventar das Foto anklicken und noch einmal anklicken, um es umzudrehen.'
    ]
  },
  {
    id: 'A1.03', title: 'Nützliches im Imbiss einsammeln',
    done: s => ['nudelsieb', 'essstaebchen', 'sojasosse', 'graue_paste'].every(i => s.inv.includes(i) || s.flags['gab_' + i]),
    tiers: [
      'Ein Imbiss steckt voller Küchenkram. Schau Regal, Theke und Automat genauer an.',
      'Das Regal, die Theke und die graue Paste am Automaten liefern jeweils etwas.',
      'Regal anklicken (Nudelsieb und Sojasoße), Theke anklicken (Essstäbchen), Paste auf der Theke anklicken (Glas mit Paste).'
    ]
  },
  {
    id: 'A1.05', title: 'Die Nudelgasse erkunden',
    done: s => s.inv.includes('neonroehre') || s.flags.gab_neonroehre,
    tiers: [
      'Draußen in der Nudelgasse liegt Müll, und manchmal ist Müll wertvoll.',
      'Die Mülltonne im Vordergrund sieht interessant aus.',
      'Verlasse den Imbiss unten und klicke die Mülltonne an. Dort liegt eine Neonröhre.'
    ]
  },
  {
    id: 'ENDE-M1', title: 'Wie geht es weiter?',
    done: () => false,
    tiers: [
      'Dies ist der erste spielbare Ausschnitt. Mehr Orte und Rätsel werden noch gebaut.',
      'Du hast alles Erreichbare gefunden. Probiere Gegenstände an Hotspots und sprich mit Oma Zhang.',
      'Der Rest von Akt 1 folgt in den nächsten Ausbaustufen.'
    ]
  }
];
