/**
 * Definitionen und Farbpaletten für die 4 wählbaren Boden- und Wegtextur-Stile.
 * Orientiert am atmosphärischen Farbraum des Spiels (sattes Wiesengrün & sandig-lehmiger Weg).
 */

export type TerrainPresetKey = 'erzgebirge' | 'sonnig' | 'mooswald' | 'smaragd';

export interface TerrainPresetConfig {
  key: TerrainPresetKey;
  numberKey: string;
  name: string;
  subtitle: string;
  badge: string;
  description: string;
  // Farbwerte Wiese
  grassBaseColor: string;
  grassShadeDark: string;
  grassShadeLight: string;
  grassBladeColors: string[];
  grassPebbleColor: string;
  // Farbwerte Weg
  pathBaseColor: string;
  pathShadeDark: string;
  pathShadeLight: string;
  pathPebbleColors: string[];
}

export const TERRAIN_PRESETS: Record<TerrainPresetKey, TerrainPresetConfig> = {
  erzgebirge: {
    key: 'erzgebirge',
    numberKey: '1',
    name: 'Klassischer Erzgebirgswald',
    subtitle: 'Original 7Wege-Farbraum (0x3d6842 & 0x826d55)',
    badge: 'Empfohlen / Klassiker',
    description:
      'Die bewährte, atmosphärische Farbwelt der ersten Spielversion: Authentisches, dunkles Nadelwald- & Moosgrün gepaart mit einem warmen, sandig-lehmigen Schotterweg aus Ocker und Naturkieseln.',
    grassBaseColor: '#2b4d2d',
    grassShadeDark: 'rgba(20, 42, 22, 0.65)',
    grassShadeLight: 'rgba(61, 104, 66, 0.55)',
    grassBladeColors: [
      '#274d2b',
      '#346139',
      '#3d6842',
      '#497a4f',
      '#1f3e23',
      '#538a59',
      '#2d5731',
    ],
    grassPebbleColor: '#362a1c',
    pathBaseColor: '#826d55',
    pathShadeDark: 'rgba(84, 68, 50, 0.52)',
    pathShadeLight: 'rgba(158, 136, 110, 0.42)',
    pathPebbleColors: ['#65533e', '#947e65', '#b39c80', '#4e3f2e'],
  },

  sonnig: {
    key: 'sonnig',
    numberKey: '2',
    name: 'Sonnige Waldlichtung',
    subtitle: 'Saftiges Wiesengrün & Warmer Ockerlehm',
    badge: 'Hoher Kontrast',
    description:
      'Frisches, sattes und lebendiges Wiesengrün mit warmen Lichtreflexen, kombiniert mit einem sonnig-ockergelben, sandig-lehmigen Waldpfad. Sehr plastisch und einladend.',
    grassBaseColor: '#2d6829',
    grassShadeDark: 'rgba(24, 58, 22, 0.65)',
    grassShadeLight: 'rgba(74, 142, 62, 0.55)',
    grassBladeColors: [
      '#33752e',
      '#418f3a',
      '#4fa847',
      '#265922',
      '#62c259',
      '#397e33',
      '#2c6628',
    ],
    grassPebbleColor: '#3a2d1d',
    pathBaseColor: '#9e7949',
    pathShadeDark: 'rgba(102, 77, 44, 0.52)',
    pathShadeLight: 'rgba(196, 158, 105, 0.42)',
    pathPebbleColors: ['#785b33', '#b89461', '#d4b380', '#5c4423'],
  },

  mooswald: {
    key: 'mooswald',
    numberKey: '3',
    name: 'Tiefes Moos & Rötliche Fichtenwalderde',
    subtitle: 'Märchenhaft, waldig & rustikal',
    badge: 'Urwüchsig',
    description:
      'Dunkles, samtiges Moos- und Farnwaldgrün wie im tiefsten Schwarzwald oder Harz, kombiniert mit einem rustikalen Pfad aus rötlicher Walderde und Schiefersplitt.',
    grassBaseColor: '#1d4722',
    grassShadeDark: 'rgba(14, 36, 17, 0.7)',
    grassShadeLight: 'rgba(42, 94, 48, 0.55)',
    grassBladeColors: [
      '#225227',
      '#2b6330',
      '#193c1d',
      '#36783d',
      '#143017',
      '#3d8544',
      '#26582c',
    ],
    grassPebbleColor: '#281d13',
    pathBaseColor: '#7a4b33',
    pathShadeDark: 'rgba(82, 45, 29, 0.55)',
    pathShadeLight: 'rgba(156, 102, 73, 0.42)',
    pathPebbleColors: ['#613722', '#946146', '#ad785c', '#422416'],
  },

  smaragd: {
    key: 'smaragd',
    numberKey: '4',
    name: 'Smaragdwiese & Heller Flusskies',
    subtitle: 'Frische Gebirgsalm & Heller Sandsteinkies',
    badge: 'Maximale Helligkeitsstufen',
    description:
      'Klares, tiefes Smaragdgrün mit leuchtenden Tönen, kombiniert mit einem hellen, gut sichtbaren Kieselsandpfad. Bietet den stärksten Hell-Dunkel-Kontrast für Orientierung.',
    grassBaseColor: '#226334',
    grassShadeDark: 'rgba(17, 51, 26, 0.65)',
    grassShadeLight: 'rgba(52, 135, 75, 0.55)',
    grassBladeColors: [
      '#29703c',
      '#358a4c',
      '#43a55d',
      '#1e542c',
      '#56bd74',
      '#307a42',
      '#266336',
    ],
    grassPebbleColor: '#30261b',
    pathBaseColor: '#ab926f',
    pathShadeDark: 'rgba(115, 96, 70, 0.52)',
    pathShadeLight: 'rgba(207, 184, 150, 0.42)',
    pathPebbleColors: ['#826d4e', '#c2ab89', '#ded0ba', '#63533a'],
  },
};

export const DEFAULT_TERRAIN_PRESET: TerrainPresetKey = 'erzgebirge';
