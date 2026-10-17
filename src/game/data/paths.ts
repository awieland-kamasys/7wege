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
 * Die sieben Waldwege, die sternförmig von der Waldkreuzung abgehen.
 */
export const SEVEN_PATHS: readonly ForestPathData[] = [
  {
    id: 1,
    name: '1. Nordpfad der Stille',
    directionLabel: 'Norden',
    angleRad: (0 * FULL_CIRCLE) / 7,
    subtitle: 'Ein moosbedeckter Pfad zwischen alten Tannen.',
    colorHex: 0x4f7f58,
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
