/**
 * Definition der sammelbaren Charakter-Items im Wanderland.
 *
 * Charakter-Items werden als besondere Belohnungen für das Bestehen
 * der moralischen Prüfungen und Wegequests aus der Schatztruhe
 * vor Waldhüter Arvids Schutzhütte geborgen.
 */

export interface CharacterItem {
  id: string;
  name: string;
  icon: string;
  pathId: number; // 0 = Zentrale Kreuzung / Schutzhütte, 1-7 = jeweiliger Pfad
  category: 'Wanderer-Ausrüstung' | 'Bergwerk-Relikt' | 'Quell-Artefakt' | 'Wald-Talisman' | 'Urkraft-Siegel';
  source: string;
  description: string;
  lockedHint: string;
}

export const ALL_CHARACTER_ITEMS: readonly CharacterItem[] = [
  {
    id: 'item_compass',
    name: 'Arvids Messingkompass',
    icon: '🧭',
    pathId: 0,
    category: 'Wanderer-Ausrüstung',
    source: 'Aus der Schatztruhe vor Arvids Schutzhütte',
    description:
      'Ein schwerer, handpolierter Marschkompass aus gediegenem Bergmessing. Seine feine Nadel richtet sich magisch nach den uralten Ley-Linien der sieben Waldwege aus.',
    lockedHint: 'Öffne die alte Schatztruhe an der zentralen Waldkreuzung.',
  },
  {
    id: 'item_silver_ore',
    name: 'Silberstollen-Erzstufe',
    icon: '⛏️',
    pathId: 1,
    category: 'Bergwerk-Relikt',
    source: 'Belohnung aus der Schatztruhe nach dem Stollen-Gespräch',
    description:
      'Eine funkelnde Erzstufe aus reinem gediegenem Silber, geborgen aus den Tiefen des verschneiten Bergstollens. Zeugnis der alten Bergmannstradition und des Versprechens an das Graumännchen.',
    lockedHint: 'Führe das Gespräch mit dem Graumännchen vor dem verschneiten Stollen auf Weg 1.',
  },
  {
    id: 'item_nixie_tear',
    name: 'Spiegelteich-Wasserperle',
    icon: '💧',
    pathId: 2,
    category: 'Quell-Artefakt',
    source: 'Belohnung aus der Schatztruhe nach der Teich-Begegnung',
    description:
      'Eine schimmernde, kühle Perle aus dem stillen Seerosenteich. Sie spiegelt das Licht der Waldkronen und erinnert an die Versuchung und den Fluch des versunkenen Goldhorts.',
    lockedHint: 'Finde die Nixe am Ufer des stillen Waldteichs auf Weg 2.',
  },
  {
    id: 'item_giant_quartz',
    name: 'Uralter Quellkristall',
    icon: '🌊',
    pathId: 3,
    category: 'Quell-Artefakt',
    source: 'Belohnung aus der Schatztruhe nach der Wehrbrücken-Rast',
    description:
      'Ein von den tosenden Fluten der Bergquelle rund geschliffener Bergkristall. Er pulsiert im sanften Takt des Gebirgsbachs und symbolisiert den Frieden mit dem Hüter der Bergquelle.',
    lockedHint: 'Überquere die Brücke auf Weg 3 und sprich mit dem Riesen an der Bergquelle.',
  },
  {
    id: 'item_wood_talisman',
    name: 'Bernstein-Waldanhänger',
    icon: '🪵',
    pathId: 4,
    category: 'Wald-Talisman',
    source: 'Belohnung aus der Schatztruhe nach dem Holzfäller-Pakt',
    description:
      'Ein von Hand geschnitztes Herz aus jahrhundertealtem Eichenholz mit einem eingeschlossenen goldenen Bernsteintropfen. Bewahrt das Gleichgewicht zwischen Holzwirtschaft und Baumschutz.',
    lockedHint: 'Besuche das Holzweibchen auf der Lichtung des Holzfällercamps auf Weg 4.',
  },
  {
    id: 'item_infernal_shard',
    name: 'Obsidian-Höllenglimmer',
    icon: '🌋',
    pathId: 5,
    category: 'Urkraft-Siegel',
    source: 'Belohnung aus der Schatztruhe nach dem Blick in den Abgrund',
    description:
      'Ein tiefschwarzer, kantiger Obsidian-Splitter mit feinen Magma-Adern, die im Rhythmus des Höllenschlunds leuchten. Er strahlt unbezwingbare Willenskraft aus.',
    lockedHint: 'Tritt dem Teufel am feurigen Kraterrand des Höllenschlundes auf Weg 5 gegenüber.',
  },
  {
    id: 'item_hunter_badge',
    name: 'Silberner Hirschorden',
    icon: '🌿',
    pathId: 6,
    category: 'Wanderer-Ausrüstung',
    source: 'Belohnung aus der Schatztruhe nach der Revier-Debatte',
    description:
      'Ein feines Silberabzeichen mit graviertem Hirschhaupt und Eichenlaub. Verliehen als Zeichen der Einsicht im Streit zwischen Jagdordnung und Lebensrettung im Kräutergarten.',
    lockedHint: 'Lausche dem Wortwechsel des Wilden Jägers am Kräutergarten der Burg auf Weg 6.',
  },
  {
    id: 'item_valley_key',
    name: 'Uralter Runenschlüssel',
    icon: '🗝️',
    pathId: 7,
    category: 'Urkraft-Siegel',
    source: 'Belohnung aus der Schatztruhe nach Lösung der Prüfungen',
    description:
      'Ein schwerer, meisterhaft verzierter Schlüssel aus Eisen und Zauberstein. Seine Kerben passen exakt in die sieben Runenvertiefungen des Steintores zum Zinsbachtal.',
    lockedHint: 'Erkunde die Pfade des Wanderlandes und untersuche das Steintor auf Weg 7.',
  },
];
