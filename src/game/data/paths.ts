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
    name: '2. Morgenlicht-Steig',
    directionLabel: 'Nordost',
    angleRad: (1 * FULL_CIRCLE) / 7,
    subtitle: 'Helle Birken und warmes Sonnenlicht am Hang.',
    colorHex: 0x889e52,
  },
  {
    id: 3,
    name: '3. Quellenweg',
    directionLabel: 'Südost',
    angleRad: (2 * FULL_CIRCLE) / 7,
    subtitle: 'Begleitet vom leisen Plätschern eines Waldbachs.',
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
