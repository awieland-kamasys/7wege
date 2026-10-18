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
 * Position des Graumännchens (NPC vor dem Höhleneingang am Ende von Weg 1).
 */
export const GREY_MAN_NPC_POS: PathPoint2D = {
  x: 22.7,
  z: -47.0,
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
  { x: 41.0, z: -14.2 },
];

/**
 * Ufer-Vorplatz am Ende von Weg 2 direkt am westlichen Rand des Waldteichs.
 */
export const PATH_2_END_CLEARING = {
  x: 41.0,
  z: -14.2,
  radius: 4.2,
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
 * Position des Steins im Teich, auf dem die Nixe sitzt.
 */
export const NIXIE_NPC_POS: PathPoint2D = {
  x: 45.0,
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
  x: 37.6,
  z: 17.7,
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
    name: '4. Wurzelgrat',
    directionLabel: 'Südsüdost',
    angleRad: (3 * FULL_CIRCLE) / 7,
    subtitle: 'Knorrige Baumwurzeln und felsige Stufen.',
    colorHex: 0x8b6d47,
  },
  {
    id: 5,
    name: '5. Nebeltal-Weg',
    directionLabel: 'Südsüdwest',
    angleRad: (4 * FULL_CIRCLE) / 7,
    subtitle: 'Führt hinab in eine geheimnisvolle, kühle Senke.',
    colorHex: 0x67798a,
  },
  {
    id: 6,
    name: '6. Abendrot-Schneise',
    directionLabel: 'Südwest',
    angleRad: (5 * FULL_CIRCLE) / 7,
    subtitle: 'Weite Sicht zwischen hohen Kiefern.',
    colorHex: 0xa66a4c,
  },
  {
    id: 7,
    name: '7. Sternenwald-Pfad',
    directionLabel: 'Nordwest',
    angleRad: (6 * FULL_CIRCLE) / 7,
    subtitle: 'Dichtes Blätterdach mit leuchtenden Farnen.',
    colorHex: 0x625a8c,
  },
];
