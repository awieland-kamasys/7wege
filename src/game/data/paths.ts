export interface PathPoint2D {
  x: number;
  z: number;
}

export interface ForestPathData {
  id: number;
  name: string;
  directionLabel: string;
  angleRad: number;
  subtitle: string;
  colorHex: number;
}

const FULL_CIRCLE = Math.PI * 2;

/**
 * Wegpunkte für den erweiterten 1. Weg (Silberstollen-Pfad):
 * Startet an der Kreuzung nach Norden (-Z), beschreibt im Nebel eine langgezogene Rechtskurve
 * nach Nordosten und endet auf einem kleinen Felsvorplatz vor dem Berg mit Höhleneingang.
 */
export const PATH_1_WAYPOINTS: readonly PathPoint2D[] = [
  { x: 0, z: -5.5 },
  { x: 0, z: -14.0 },
  { x: 0.6, z: -21.5 },
  { x: 3.8, z: -28.5 },
  { x: 9.2, z: -34.8 },
  { x: 15.8, z: -40.2 },
  { x: 22.0, z: -45.0 },
];

/**
 * Standard-Startpunkt der Spielfigur bei Spielstart:
 * Auf Weg 7 (Torweg) in halber Strecke (ca. 27.9 m von der Kreuzung) mit Blickrichtung zur Kreuzung.
 */
export const START_PLAYER_POS: PathPoint2D = {
  x: -21.0,
  z: -18.4,
};

/**
 * Position des Fabelwesens (Fantasy Creature NPC):
 * Exakt auf dem halben Weg vom Startpunkt (-21.0, -18.4) zur Kreuzung (0, 0)
 * auf Weg 7 bei ca. (-10.5, -9.2).
 */
export const CREATURE_NPC_POS: PathPoint2D = {
  x: -10.5,
  z: -9.2,
};

/**
 * Position und Kollisionsradius des Felsbrockens, der Weg 1 versperrt.
 * Exakt auf die Referenz-Entfernung wie das Feuer (~16.3 m von der Kreuzung) gesetzt.
 * Lässt sich durch Anklicken des rotierenden Edelsteins am Pfadanfang entfernen.
 */
export const PATH_1_BOULDER_POS = {
  x: 0.2,
  z: -16.3,
  radius: 1.55,
} as const;

/**
 * Vorplatz am Ende von Weg 1 direkt vor dem Bergmassiv und dem Stolleneingang.
 */
export const PATH_1_END_CLEARING = {
  x: 22.0,
  z: -45.0,
  radius: 4.2,
} as const;

/**
 * Position des Bergmassivs mit dem Höhleneingang (Stollenmundloch) am Ende von Weg 1.
 * rotationY = -0.885 richtet die lokale +Z-Achse (Stollenöffnung) exakt auf den Vorplatz (22.0, -45.0) aus.
 */
export const CAVE_ENTRANCE_POS = {
  x: 25.4,
  z: -47.8,
  rotationY: -0.885,
} as const;

/**
 * Position des Graumännchens (NPC vor dem Mineneingang am Ende von Weg 1).
 * Steht leicht seitlich versetzt auf dem Vorplatz vor dem Stollenmundloch,
 * sodass der Blick in die Mine frei bleibt und der ankommende Spieler direkt begrüßt wird.
 */
export const GREY_MAN_NPC_POS: PathPoint2D = {
  x: 23.2,
  z: -46.0,
};

/**
 * Wegpunkte für den 2. Weg (Nixenteich-Pfad):
 * Startet an der Kreuzung nach Nordosten, schwingt in einem sanften Bogen nach Osten
 * und endet auf einer Uferlichtung vor dem Waldteich mit der Nixe.
 */
export const PATH_2_WAYPOINTS: readonly PathPoint2D[] = [
  { x: 4.3, z: -3.4 },
  { x: 10.2, z: -8.1 },
  { x: 17.5, z: -11.8 },
  { x: 25.4, z: -14.0 },
  { x: 33.5, z: -14.8 },
  { x: 42.0, z: -14.2 },
];

/**
 * Position und Kollisionsradius der Wasserpfütze, die Weg 2 (Nixenteich-Pfad) versperrt.
 * Exakt auf die Referenz-Entfernung wie das Feuer (~16.3 m von der Kreuzung) gesetzt.
 * Lässt sich durch Anklicken des rotierenden Edelsteins am Pfadanfang entfernen.
 */
export const PATH_2_PUDDLE_POS = {
  x: 13.2,
  z: -9.6,
  radius: 1.55,
} as const;

/**
 * Ufer-Ende von Weg 2 direkt am Ufer des Waldteichs.
 */
export const PATH_2_END_CLEARING = {
  x: 42.0,
  z: -14.2,
  radius: 1.15,
} as const;

/**
 * Zentrum und Radius des Waldteichs am Ende von Weg 2.
 */
export const POND_CENTER_POS = {
  x: 46.8,
  z: -14.2,
  radius: 4.8,
} as const;

/**
 * Position der Nixe / Meerjungfrau im Waldteich am Ende von Weg 2.
 */
export const NIXIE_NPC_POS: PathPoint2D = {
  x: 45.2,
  z: -14.2,
};

/**
 * Wegpunkte für den 3. Weg (Quellenweg):
 * Startet an der Kreuzung nach Südosten, führt in einem sanften Bogen über eine Brücke mit Wehr,
 * unter der ein Bach hindurchfließt, und endet am Vorplatz beim Riesen neben dem kleinen Stausee.
 */
export const PATH_3_WAYPOINTS: readonly PathPoint2D[] = [
  { x: 5.4, z: 1.2 },
  { x: 12.7, z: 2.9 },
  { x: 20.2, z: 5.8 },
  { x: 27.6, z: 10.2 },
  { x: 34.8, z: 15.6 },
  { x: 42.0, z: 21.0 },
];

/**
 * Vorplatz am Ende von Weg 3 direkt hinter der Wehrbrücke beim Riesen.
 */
export const PATH_3_END_CLEARING = {
  x: 42.0,
  z: 21.0,
  radius: 4.2,
} as const;

/**
 * Position und Ausrichtung der Brücke mit dem geschlossenen Wehr und dem Stausee auf Weg 3.
 * rotationY richtet die lokale +Z-Achse exakt entlang des Brückensegments (34.8, 15.6) -> (42.0, 21.0) aus.
 */
export const WEIR_BRIDGE_POS = {
  x: 38.4,
  z: 18.3,
  rotationY: Math.atan2(7.2, 5.4),
} as const;

/**
 * Position des Riesen, der das geschlossene Wehr an der Brücke bewacht.
 */
export const GIANT_NPC_POS: PathPoint2D = {
  x: 43.4,
  z: 19.8,
};

/**
 * Position des riesigen Weltenbaums (fantasy tree 3d model.glb),
 * majestätisch in der goldenen Mitte zwischen dem Reich der Nixe (Weg 2) und des Riesen (Weg 3).
 */
export const WORLD_TREE_POS: PathPoint2D = {
  x: 44.0,
  z: 2.5,
};

/**
 * Position, Ausrichtung und Kollisionsradius des reißenden Bachlaufs, der Weg 3 (Quellenweg) versperrt.
 * Exakt auf die Referenz-Entfernung wie das Feuer (~16.3 m von der Kreuzung) gesetzt.
 * Lässt sich durch Anklicken des rotierenden Saphir-Edelsteins am Pfadanfang beseitigen.
 */
export const PATH_3_STREAM_POS = {
  x: 15.8,
  z: 4.1,
  radius: 1.55,
  rotationY: Math.atan2(7.5, 2.9),
} as const;

/**
 * Wegpunkte für den 4. Weg (Holzfäller-Pfad):
 * Startet an der Kreuzung nach Südsüdost, windet sich durch den Hochwald
 * und mündet auf einer gerodeten Waldlichtung mit einem Holzfällerlager und dem Holzweibchen.
 */
export const PATH_4_WAYPOINTS: readonly PathPoint2D[] = [
  { x: 2.4, z: 5.0 },
  { x: 5.6, z: 11.7 },
  { x: 9.2, z: 19.2 },
  { x: 12.6, z: 27.0 },
  { x: 15.2, z: 35.0 },
  { x: 16.5, z: 39.8 },
];

/**
 * Position, Ausrichtung und Kollisionsradius des Baumstamms, der Weg 4 (Holzfäller-Pfad) versperrt.
 * Exakt auf die Referenz-Entfernung wie das Feuer (~16.3 m von der Kreuzung) gesetzt.
 * Liegt quer über dem Pfad und lässt sich durch Anklicken des rotierenden Edelsteins am Pfadanfang entfernen.
 */
export const PATH_4_LOG_POS = {
  x: 7.1,
  z: 14.7,
  radius: 1.55,
  rotationY: Math.atan2(3.6, 7.5),
} as const;

/**
 * Begehbare Waldlichtung am Ende von Weg 4 rund um das Holzfällerlager.
 */
export const PATH_4_END_CLEARING = {
  x: 16.5,
  z: 42.5,
  radius: 5.4,
} as const;

/**
 * Zentrum und Ausrichtung des Holzfällerlagers auf der Waldlichtung am Ende von Weg 4.
 * rotationY = Math.PI dreht das Lagerfeuer-Camp um 180 Grad in Richtung des ankommenden Pfades.
 */
export const LUMBER_CAMP_POS = {
  x: 16.5,
  z: 43.8,
  radius: 7.2,
  rotationY: Math.PI,
} as const;

/**
 * Position des Holzweibchens im Holzfällerlager am Ende von Weg 4:
 * Steht kurz vor der Campfire-Insel am Übergang des ankommenden Waldweges auf die Lichtung.
 */
export const WOOD_WOMAN_NPC_POS: PathPoint2D = {
  x: 16.6,
  z: 40.4,
};

/**
 * Wegpunkte für den 5. Weg (Höllenschlund-Pfad):
 * Startet an der Kreuzung nach Südsüdwest, windet sich durch schroffe Felsspalten
 * und mündet auf einem Basalt-Vorplatz am Rande eines gewaltigen, feurigen Höllenschlundes.
 */
export const PATH_5_WAYPOINTS: readonly PathPoint2D[] = [
  { x: -2.4, z: 5.0 },
  { x: -6.2, z: 12.2 },
  { x: -10.8, z: 20.0 },
  { x: -15.5, z: 28.2 },
  { x: -19.2, z: 36.5 },
  { x: -21.2, z: 44.8 },
];

/**
 * Position und Kollisionsradius der Flammenwand/des Feuers, das Weg 5 (Höllenschlund-Pfad) versperrt.
 * Sitzt weiter hinten im Pfad und lässt sich durch Anklicken des rotierenden Edelsteins am Pfadanfang löschen.
 */
export const PATH_5_FIRE_POS = {
  x: -7.5,
  z: 14.5,
  radius: 1.55,
} as const;


/**
 * Ende von Weg 5 direkt am Kraterrand des feurigen Höllenschlunds.
 */
export const PATH_5_END_CLEARING = {
  x: -21.2,
  z: 44.8,
  radius: 1.15,
} as const;

/**
 * Zentrum und Ausdehnung des feurigen Höllenschlundes am Ende von Weg 5.
 */
export const HELL_CHASM_POS = {
  x: -22.5,
  z: 52.0,
  radius: 8.5,
} as const;

/**
 * Position des Teufels auf seinem Obsidianfelsen inmitten des Höllenschlundes.
 */
export const DEVIL_NPC_POS: PathPoint2D = {
  x: -22.5,
  z: 52.0,
};

/**
 * Wegpunkte für den 6. Weg (Jägerpfad zur Jagdhütte):
 * Startet an der Kreuzung nach Südwesten, führt durch eine weite Waldschneise
 * und mündet auf einer idyllischen Waldlichtung vor einer Jagdhütte mit duftendem Kräutergarten.
 */
export const PATH_6_WAYPOINTS: readonly PathPoint2D[] = [
  { x: -5.4, z: 1.2 },
  { x: -12.8, z: 2.8 },
  { x: -20.5, z: 5.4 },
  { x: -28.2, z: 9.6 },
  { x: -35.8, z: 14.8 },
  { x: -39.0, z: 20.5 },
];

/**
 * Position, Ausrichtung und Kollisionsradius der hohen Kräuterpflanzen mit Geländer auf Weg 6 (Jägerpfad).
 * Exakt auf die Referenz-Entfernung wie das Feuer (~16.3 m von der Kreuzung) gesetzt.
 * Lässt sich durch Anklicken des rotierenden Amethyst-Edelsteins am Pfadanfang beseitigen.
 */
export const PATH_6_HERBS_POS = {
  x: -15.9,
  z: 3.8,
  radius: 1.55,
  rotationY: Math.atan2(-7.7, 2.6),
} as const;

/**
 * Begehbare Waldlichtung am Ende von Weg 6 vor der Jagdhütte und dem Kräutergarten.
 */
export const PATH_6_END_CLEARING = {
  x: -40.0,
  z: 22.2,
  radius: 6.4,
} as const;

/**
 * Zentrum der Jagdhütte und des Kräutergartens auf der Lichtung am Ende von Weg 6.
 */
export const HUNTING_LODGE_POS = {
  x: -44.2,
  z: 22.8,
  radius: 7.8,
} as const;

/**
 * Position des Wilden Jägers an der Jagdhütte (auf dem Vorplatz vor und neben den Pflanzkübeln).
 */
export const WILD_HUNTER_NPC_POS: PathPoint2D = {
  x: -38.6,
  z: 21.0,
};

/**
 * Position des Holzweibchens, das vor den Pflanzkübeln mit dem Wilden Jäger diskutiert.
 */
export const WOOD_WOMAN_LODGE_NPC_POS: PathPoint2D = {
  x: -38.6,
  z: 24.2,
};

/**
 * Wegpunkte für den 7. Weg (Torweg):
 * Startet an der Kreuzung nach Nordwesten, zieht durch dichten, uralten Nebelwald
 * und mündet auf einem steinigen Waldvorplatz vor einem mächtigen, fest geschlossenen Tor.
 */
export const PATH_7_WAYPOINTS: readonly PathPoint2D[] = [
  { x: -4.3, z: -3.4 },
  { x: -11.5, z: -9.5 },
  { x: -18.8, z: -16.2 },
  { x: -26.0, z: -23.4 },
  { x: -33.2, z: -30.8 },
  { x: -40.5, z: -38.5 },
];

/**
 * Begehbarer Vorplatz am Ende von Weg 7 vor dem geschlossenen Tor.
 */
export const PATH_7_END_CLEARING = {
  x: -40.5,
  z: -38.5,
  radius: 4.8,
} as const;

/**
 * Position und Ausrichtung des geschlossenen Tors am Ende von Weg 7.
 */
export const CLOSED_GATE_POS = {
  x: -42.8,
  z: -41.0,
  rotationY: 0.76,
  radius: 5.5,
} as const;

/**
 * Die sieben Waldwege, die sternförmig von der Waldkreuzung abgehen.
 */
export const SEVEN_PATHS: readonly ForestPathData[] = [
  {
    id: 1,
    name: '1. Silberstollen-Pfad',
    directionLabel: 'Norden',
    angleRad: (0 * FULL_CIRCLE) / 7,
    subtitle: 'Ein gewundener Bergpfad zum alten Stollen und dem Graumännchen.',
    colorHex: 0x6b8c7b,
  },
  {
    id: 2,
    name: '2. Nixenteich-Pfad',
    directionLabel: 'Nordost',
    angleRad: (1 * FULL_CIRCLE) / 7,
    subtitle: 'Führt zu einem stillen Waldteich, in dem die Nixe über einem verfluchten Schatz wacht.',
    colorHex: 0x3ea89c,
  },
  {
    id: 3,
    name: '3. Quellenweg',
    directionLabel: 'Südost',
    angleRad: (2 * FULL_CIRCLE) / 7,
    subtitle: 'Führt über eine Brücke mit geschlossenem Wehr und Stausee, bewacht vom Riesen.',
    colorHex: 0x4c858c,
  },
  {
    id: 4,
    name: '4. Holzfäller-Pfad',
    directionLabel: 'Südsüdost',
    angleRad: (3 * FULL_CIRCLE) / 7,
    subtitle: 'Führt auf eine Waldlichtung mit einem Holzfällerlager, in dem das Holzweibchen wartet.',
    colorHex: 0xb87d3e,
  },
  {
    id: 5,
    name: '5. Höllenschlund-Pfad',
    directionLabel: 'Südsüdwest',
    angleRad: (4 * FULL_CIRCLE) / 7,
    subtitle: 'Führt an den Rand eines flammenden Höllenschlunds, in dessen Mitte der Teufel wartet.',
    colorHex: 0xd43818,
  },
  {
    id: 6,
    name: '6. Jägerpfad',
    directionLabel: 'Südwest',
    angleRad: (5 * FULL_CIRCLE) / 7,
    subtitle: 'Führt zu einer Jagdhütte mit Kräutergarten, wo der Wilde Jäger mit dem Holzweibchen streitet.',
    colorHex: 0x487a42,
  },
  {
    id: 7,
    name: '7. Torweg',
    directionLabel: 'Nordwest',
    angleRad: (6 * FULL_CIRCLE) / 7,
    subtitle: 'Führt durch dichten Bergwald zu einem massiven, fest verschlossenen Tor.',
    colorHex: 0x6e5c8a,
  },
];
