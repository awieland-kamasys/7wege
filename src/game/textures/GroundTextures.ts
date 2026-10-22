import * as THREE from 'three';
import {
  DEFAULT_TERRAIN_PRESET,
  TERRAIN_PRESETS,
  TerrainPresetKey,
} from './TerrainPresets';

interface TexturePair {
  map: THREE.CanvasTexture | null;
  bumpMap: THREE.CanvasTexture | null;
}

interface LavaRockBundle {
  map: THREE.CanvasTexture | null;
  emissiveMap: THREE.CanvasTexture | null;
  bumpMap: THREE.CanvasTexture | null;
}

function clonePair(pair: TexturePair): TexturePair {
  return {
    map: pair.map ? (pair.map.clone() as THREE.CanvasTexture) : null,
    bumpMap: pair.bumpMap ? (pair.bumpMap.clone() as THREE.CanvasTexture) : null,
  };
}

function cloneLava(bundle: LavaRockBundle): LavaRockBundle {
  return {
    map: bundle.map ? (bundle.map.clone() as THREE.CanvasTexture) : null,
    emissiveMap: bundle.emissiveMap ? (bundle.emissiveMap.clone() as THREE.CanvasTexture) : null,
    bumpMap: bundle.bumpMap ? (bundle.bumpMap.clone() as THREE.CanvasTexture) : null,
  };
}

// Prozedural generierte Texturen werden gecacht, damit aufwendige Canvas-Renderzyklen nur einmalig ablaufen
const cachedGrassPresets = new Map<TerrainPresetKey, TexturePair>();
const cachedPathPresets = new Map<TerrainPresetKey, TexturePair>();
let cachedBarkTexture: TexturePair | null = null;
let cachedPineFoliageTexture: TexturePair | null = null;
let cachedStoneTexture: TexturePair | null = null;
let cachedVeinedLavaRockTexture: LavaRockBundle | null = null;
let cachedBrickTexture: TexturePair | null = null;
let cachedAshlarWallTexture: TexturePair | null = null;
let cachedWoodGrainTexture: TexturePair | null = null;

/**
 * Erzeugt eine detailreiche, nahtlos kachelbare Wiesentextur für den Waldboden:
 * - Sattes Waldgrün mit natürlichen Helligkeitsnuancen
 * - Feine Grashalme, Moospolster und Erdkrümel für organische Haptik
 * - Nahtlose Ränder für sauberes RepeatWrapping ohne Kantenartefakte
 */
export function createGrassTexture(presetKey: TerrainPresetKey = DEFAULT_TERRAIN_PRESET): { map: THREE.CanvasTexture | null; bumpMap: THREE.CanvasTexture | null } {
  const cached = cachedGrassPresets.get(presetKey);
  if (cached) {
    return clonePair(cached);
  }
  if (typeof document === 'undefined') {
    return { map: null, bumpMap: null };
  }

  const preset = TERRAIN_PRESETS[presetKey] || TERRAIN_PRESETS[DEFAULT_TERRAIN_PRESET];
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return { map: null, bumpMap: null };

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bumpCtx = bumpCanvas.getContext('2d');

  // 1. Grundfläche: Waldwiesengrün
  ctx.fillStyle = preset.grassBaseColor;
  ctx.fillRect(0, 0, size, size);

  if (bumpCtx) {
    bumpCtx.fillStyle = '#808080';
    bumpCtx.fillRect(0, 0, size, size);
  }

  // 2. Weiches Rauschen & Schattierungen für Helligkeitsvariationen
  const rng = (seed: number) => {
    let s = seed % 2147483647;
    if (s <= 0) s += 2147483646;
    return () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  };
  const random = rng(42);

  // Größere Moos- und Schattierungsflecken
  for (let i = 0; i < 90; i++) {
    const cx = random() * size;
    const cy = random() * size;
    const r = 25 + random() * 45;
    const isLight = random() > 0.45;

    const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, r);
    if (isLight) {
      grad.addColorStop(0, preset.grassShadeLight);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else {
      grad.addColorStop(0, preset.grassShadeDark);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    }
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // Wrapping über Ränder
    if (cx - r < 0) {
      ctx.beginPath();
      ctx.arc(cx + size, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }
    if (cx + r > size) {
      ctx.beginPath();
      ctx.arc(cx - size, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }
    if (cy - r < 0) {
      ctx.beginPath();
      ctx.arc(cx, cy + size, r, 0, Math.PI * 2);
      ctx.fill();
    }
    if (cy + r > size) {
      ctx.beginPath();
      ctx.arc(cx, cy - size, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 3. Tausende feine Grashalme & Fasern
  const bladeCount = 6500;
  const bladeColors = preset.grassBladeColors;

  ctx.lineWidth = 1.25;
  for (let i = 0; i < bladeCount; i++) {
    const x = random() * size;
    const y = random() * size;
    const len = 4 + random() * 8;
    const angle = -Math.PI / 2 + (random() - 0.5) * 0.95;
    const col = bladeColors[Math.floor(random() * bladeColors.length)];

    ctx.strokeStyle = col;
    ctx.beginPath();
    ctx.moveTo(x, y);
    const endX = x + Math.cos(angle) * len;
    const endY = y + Math.sin(angle) * len;
    ctx.lineTo(endX, endY);
    ctx.stroke();

    if (bumpCtx && random() > 0.4) {
      bumpCtx.strokeStyle = random() > 0.5 ? '#a8a8a8' : '#585858';
      bumpCtx.lineWidth = 1.1;
      bumpCtx.beginPath();
      bumpCtx.moveTo(x, y);
      bumpCtx.lineTo(endX, endY);
      bumpCtx.stroke();
    }

    // Wrap über Rand
    if (endX < 0) {
      ctx.beginPath();
      ctx.moveTo(x + size, y);
      ctx.lineTo(endX + size, endY);
      ctx.stroke();
    } else if (endX > size) {
      ctx.beginPath();
      ctx.moveTo(x - size, y);
      ctx.lineTo(endX - size, endY);
      ctx.stroke();
    }
    if (endY < 0) {
      ctx.beginPath();
      ctx.moveTo(x, y + size);
      ctx.lineTo(endX, endY + size);
      ctx.stroke();
    } else if (endY > size) {
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.lineTo(endX, endY - size);
      ctx.stroke();
    }
  }

  // 4. Feine Erdkrümel und Sandkörner
  for (let i = 0; i < 400; i++) {
    const sx = random() * size;
    const sy = random() * size;
    const sr = 0.8 + random() * 1.6;
    ctx.fillStyle = random() > 0.6 ? preset.grassPebbleColor : '#1a2e1b';
    ctx.beginPath();
    ctx.arc(sx, sy, sr, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;

  let bumpTexture: THREE.CanvasTexture | null = null;
  if (bumpCanvas) {
    bumpTexture = new THREE.CanvasTexture(bumpCanvas);
    bumpTexture.wrapS = THREE.RepeatWrapping;
    bumpTexture.wrapT = THREE.RepeatWrapping;
    bumpTexture.needsUpdate = true;
  }

  const pair: TexturePair = { map: texture, bumpMap: bumpTexture };
  cachedGrassPresets.set(presetKey, pair);
  return clonePair(pair);
}

export function createPathTexture(presetKey: TerrainPresetKey = DEFAULT_TERRAIN_PRESET): { map: THREE.CanvasTexture | null; bumpMap: THREE.CanvasTexture | null } {
  const cached = cachedPathPresets.get(presetKey);
  if (cached) {
    return clonePair(cached);
  }
  if (typeof document === 'undefined') {
    return { map: null, bumpMap: null };
  }

  const preset = TERRAIN_PRESETS[presetKey] || TERRAIN_PRESETS[DEFAULT_TERRAIN_PRESET];
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return { map: null, bumpMap: null };

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bumpCtx = bumpCanvas.getContext('2d');

  // 1. Grundfläche: Warmer Schotter-/Walderdboden
  ctx.fillStyle = preset.pathBaseColor;
  ctx.fillRect(0, 0, size, size);

  if (bumpCtx) {
    bumpCtx.fillStyle = '#808080';
    bumpCtx.fillRect(0, 0, size, size);
  }

  const rng = (seed: number) => {
    let s = seed % 2147483647;
    if (s <= 0) s += 2147483646;
    return () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  };
  const random = rng(108);

  // 2. Sand- und Erdschattierungen
  for (let i = 0; i < 70; i++) {
    const cx = random() * size;
    const cy = random() * size;
    const r = 20 + random() * 50;
    const isDark = random() > 0.5;

    const grad = ctx.createRadialGradient(cx, cy, 3, cx, cy, r);
    if (isDark) {
      grad.addColorStop(0, preset.pathShadeDark);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else {
      grad.addColorStop(0, preset.pathShadeLight);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    }
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // Ränder wrappen
    if (cx - r < 0) {
      ctx.beginPath();
      ctx.arc(cx + size, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }
    if (cx + r > size) {
      ctx.beginPath();
      ctx.arc(cx - size, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }
    if (cy - r < 0) {
      ctx.beginPath();
      ctx.arc(cx, cy + size, r, 0, Math.PI * 2);
      ctx.fill();
    }
    if (cy + r > size) {
      ctx.beginPath();
      ctx.arc(cx, cy - size, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 3. Hunderte Kieselsteine und Schotter
  const pebbleCount = 1200;
  const pebblePalette = preset.pathPebbleColors;
  for (let i = 0; i < pebbleCount; i++) {
    const px = random() * size;
    const py = random() * size;
    const pr = 1.0 + random() * 4.2;
    const pebbleColor = pebblePalette[Math.floor(random() * pebblePalette.length)];

    // Schlagschatten des Steins für 3D-Relief
    ctx.fillStyle = 'rgba(32, 24, 18, 0.45)';
    ctx.beginPath();
    ctx.arc(px + 0.8, py + 0.8, pr, 0, Math.PI * 2);
    ctx.fill();

    // Kieselstein
    ctx.fillStyle = pebbleColor;
    ctx.beginPath();
    ctx.arc(px, py, pr, 0, Math.PI * 2);
    ctx.fill();

    // Glanzkante oben links
    if (pr > 2.0) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
      ctx.beginPath();
      ctx.arc(px - pr * 0.3, py - pr * 0.3, pr * 0.45, 0, Math.PI * 2);
      ctx.fill();
    }

    // Bump Map Eintrag
    if (bumpCtx) {
      bumpCtx.fillStyle = '#b8b8b8';
      bumpCtx.beginPath();
      bumpCtx.arc(px, py, pr, 0, Math.PI * 2);
      bumpCtx.fill();

      bumpCtx.fillStyle = '#484848';
      bumpCtx.beginPath();
      bumpCtx.arc(px + 0.8, py + 0.8, pr * 0.6, 0, Math.PI * 2);
      bumpCtx.fill();
    }

    // Wrap über Rand
    if (px - pr < 0) {
      ctx.fillStyle = pebbleColor;
      ctx.beginPath();
      ctx.arc(px + size, py, pr, 0, Math.PI * 2);
      ctx.fill();
    } else if (px + pr > size) {
      ctx.fillStyle = pebbleColor;
      ctx.beginPath();
      ctx.arc(px - size, py, pr, 0, Math.PI * 2);
      ctx.fill();
    }
    if (py - pr < 0) {
      ctx.fillStyle = pebbleColor;
      ctx.beginPath();
      ctx.arc(px, py + size, pr, 0, Math.PI * 2);
      ctx.fill();
    } else if (py + pr > size) {
      ctx.fillStyle = pebbleColor;
      ctx.beginPath();
      ctx.arc(px, py - size, pr, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 4. Feine Sandkörner (Noise)
  for (let i = 0; i < 2000; i++) {
    const sx = random() * size;
    const sy = random() * size;
    const light = random() > 0.5;
    ctx.fillStyle = light ? 'rgba(215, 195, 165, 0.35)' : 'rgba(55, 42, 30, 0.35)';
    ctx.fillRect(sx, sy, 1.2, 1.2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;

  let bumpTexture: THREE.CanvasTexture | null = null;
  if (bumpCanvas) {
    bumpTexture = new THREE.CanvasTexture(bumpCanvas);
    bumpTexture.wrapS = THREE.RepeatWrapping;
    bumpTexture.wrapT = THREE.RepeatWrapping;
    bumpTexture.needsUpdate = true;
  }

  const pair: TexturePair = { map: texture, bumpMap: bumpTexture };
  cachedPathPresets.set(presetKey, pair);
  return clonePair(pair);
}

/**
 * Erzeugt eine detailreiche, natürlich wirkende Baumrindentextur mit plastischer Bump-Map:
 * - Warmes, sonniges Kiefern- und Fichtenbraun mit natürlichen Lichtreflexen
 * - Vertikale Faserstrukturen, plastische Rindenfurchen und feine Schuppung
 * - Bump-Map für ausgeprägtes Relief und plastische Tiefenwirkung im Sonnenlicht
 */
export function createBarkTexture(): { map: THREE.CanvasTexture | null; bumpMap: THREE.CanvasTexture | null } {
  if (cachedBarkTexture) {
    return clonePair(cachedBarkTexture);
  }
  if (typeof document === 'undefined') {
    return { map: null, bumpMap: null };
  }

  const width = 256;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return { map: null, bumpMap: null };

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = width;
  bumpCanvas.height = height;
  const bumpCtx = bumpCanvas.getContext('2d');

  // 1. Grundfarbe: Warmes, helles Kiefern- und Fichtenborkenbraun im Sonnenlicht
  ctx.fillStyle = '#8a6242';
  ctx.fillRect(0, 0, width, height);

  if (bumpCtx) {
    bumpCtx.fillStyle = '#808080';
    bumpCtx.fillRect(0, 0, width, height);
  }

  const rng = (seed: number) => {
    let s = seed % 2147483647;
    if (s <= 0) s += 2147483646;
    return () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  };
  const random = rng(108);

  // 2. Vertikale Holzfaser- und Rindenstränge
  for (let x = 0; x < width; x += 3 + random() * 4) {
    const strandWidth = 2 + random() * 5;
    const isDark = random() > 0.4;
    const shade = isDark ? 0.2 + random() * 0.35 : 0.12 + random() * 0.22;
    ctx.fillStyle = isDark
      ? `rgba(105, 72, 46, ${shade})`
      : `rgba(205, 168, 128, ${shade})`;

    ctx.beginPath();
    ctx.moveTo(x, 0);
    let curX = x;
    for (let y = 0; y <= height; y += 32) {
      curX += (random() - 0.5) * 4;
      ctx.lineTo(curX, y);
    }
    ctx.lineTo(curX + strandWidth, height);
    for (let y = height; y >= 0; y -= 32) {
      curX += (random() - 0.5) * 4;
      ctx.lineTo(curX + strandWidth, y);
    }
    ctx.closePath();
    ctx.fill();

    if (bumpCtx) {
      bumpCtx.fillStyle = isDark ? 'rgba(40, 40, 40, 0.45)' : 'rgba(215, 215, 215, 0.4)';
      bumpCtx.beginPath();
      bumpCtx.moveTo(x, 0);
      curX = x;
      for (let y = 0; y <= height; y += 32) {
        curX += (random() - 0.5) * 4;
        bumpCtx.lineTo(curX, y);
      }
      bumpCtx.lineTo(curX + strandWidth, height);
      for (let y = height; y >= 0; y -= 32) {
        curX += (random() - 0.5) * 4;
        bumpCtx.lineTo(curX + strandWidth, y);
      }
      bumpCtx.closePath();
      bumpCtx.fill();
    }
  }

  // 3. Ausgeprägte Längsfurchen mit sonniger Lichtkante
  for (let i = 0; i < 45; i++) {
    const fx = random() * width;
    const fy = random() * (height - 60);
    const flen = 40 + random() * 90;
    const fw = 1.5 + random() * 2.5;

    ctx.strokeStyle = 'rgba(62, 38, 22, 0.65)';
    ctx.lineWidth = fw;
    ctx.beginPath();
    ctx.moveTo(fx, fy);
    ctx.bezierCurveTo(
      fx + (random() - 0.5) * 8, fy + flen * 0.33,
      fx + (random() - 0.5) * 8, fy + flen * 0.66,
      fx + (random() - 0.5) * 6, fy + flen
    );
    ctx.stroke();

    // Helle Lichtkante direkt neben der Furche für Sonnenreflex
    ctx.strokeStyle = 'rgba(235, 205, 165, 0.65)';
    ctx.lineWidth = fw * 0.7;
    ctx.beginPath();
    ctx.moveTo(fx + fw + 0.5, fy);
    ctx.bezierCurveTo(
      fx + fw + 0.5 + (random() - 0.5) * 8, fy + flen * 0.33,
      fx + fw + 0.5 + (random() - 0.5) * 8, fy + flen * 0.66,
      fx + fw + 0.5 + (random() - 0.5) * 6, fy + flen
    );
    ctx.stroke();

    if (bumpCtx) {
      // Tiefe Rille in der Bump-Map (dunkel)
      bumpCtx.strokeStyle = 'rgba(25, 25, 25, 0.85)';
      bumpCtx.lineWidth = fw;
      bumpCtx.beginPath();
      bumpCtx.moveTo(fx, fy);
      bumpCtx.bezierCurveTo(
        fx + (random() - 0.5) * 8, fy + flen * 0.33,
        fx + (random() - 0.5) * 8, fy + flen * 0.66,
        fx + (random() - 0.5) * 6, fy + flen
      );
      bumpCtx.stroke();

      // Erhabene Kante in der Bump-Map (hell)
      bumpCtx.strokeStyle = 'rgba(235, 235, 235, 0.65)';
      bumpCtx.lineWidth = fw * 0.7;
      bumpCtx.beginPath();
      bumpCtx.moveTo(fx + fw + 0.5, fy);
      bumpCtx.bezierCurveTo(
        fx + fw + 0.5 + (random() - 0.5) * 8, fy + flen * 0.33,
        fx + fw + 0.5 + (random() - 0.5) * 8, fy + flen * 0.66,
        fx + fw + 0.5 + (random() - 0.5) * 6, fy + flen
      );
      bumpCtx.stroke();
    }
  }

  // 4. Horizontale Rindenrisse und Schuppungen
  for (let i = 0; i < 60; i++) {
    const rx = random() * width;
    const ry = random() * height;
    const rlen = 6 + random() * 16;
    ctx.strokeStyle = 'rgba(75, 48, 28, 0.55)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(rx, ry);
    ctx.lineTo(rx + rlen, ry + (random() - 0.5) * 3);
    ctx.stroke();

    if (bumpCtx) {
      bumpCtx.strokeStyle = 'rgba(35, 35, 35, 0.7)';
      bumpCtx.lineWidth = 1.2;
      bumpCtx.beginPath();
      bumpCtx.moveTo(rx, ry);
      bumpCtx.lineTo(rx + rlen, ry + (random() - 0.5) * 3);
      bumpCtx.stroke();
    }
  }

  // 5. Feines Rauschen (Rinden-Körnung mit warmen Sonnenpartikeln)
  for (let i = 0; i < 1800; i++) {
    const nx = random() * width;
    const ny = random() * height;
    const light = random() > 0.55;
    ctx.fillStyle = light ? 'rgba(225, 195, 155, 0.42)' : 'rgba(95, 62, 38, 0.32)';
    ctx.fillRect(nx, ny, 1.2, 1.2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  let bumpTexture: THREE.CanvasTexture | null = null;
  if (bumpCanvas) {
    bumpTexture = new THREE.CanvasTexture(bumpCanvas);
    bumpTexture.wrapS = THREE.RepeatWrapping;
    bumpTexture.wrapT = THREE.RepeatWrapping;
    bumpTexture.needsUpdate = true;
  }

  cachedBarkTexture = { map: texture, bumpMap: bumpTexture };
  return clonePair(cachedBarkTexture);
}

/**
 * Erzeugt eine authentische Nadelbaum-Textur (Fichten- & Tannenzweige) mit ausgeprägten Astetagen:
 * - Kühles, edles Waldtannengrün mit feinen Nadelkämmen (klar von der Sommerwiese differenziert!)
 * - Horizontale Astquirl-Stockwerke, holzige Zweigachsen und fächerförmig herabhängende Nadelbüschel
 * - Silbrige Nadelwachs-Lichtkanten und plastische Relief-Bump-Map für echte Nadelbaum-Silhouette
 */
export function createPineFoliageTexture(): { map: THREE.CanvasTexture | null; bumpMap: THREE.CanvasTexture | null } {
  if (cachedPineFoliageTexture) {
    return clonePair(cachedPineFoliageTexture);
  }
  if (typeof document === 'undefined') {
    return { map: null, bumpMap: null };
  }

  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return { map: null, bumpMap: null };

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bumpCtx = bumpCanvas.getContext('2d');

  // 1. Grundfläche: Kühles, tiefes Waldtannengrün (deutlich kühler und nadeliger als die Sommerwiese)
  ctx.fillStyle = '#1c452b';
  ctx.fillRect(0, 0, size, size);

  if (bumpCtx) {
    bumpCtx.fillStyle = '#808080';
    bumpCtx.fillRect(0, 0, size, size);
  }

  const rng = (seed: number) => {
    let s = seed % 2147483647;
    if (s <= 0) s += 2147483646;
    return () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  };
  const random = rng(888);

  // 2. Horizontale Astquirl-Stockwerke (6 Etagen mit Astschatten)
  const tierCount = 6;
  const tierHeight = size / tierCount;
  for (let t = 0; t < tierCount; t++) {
    const tierY = t * tierHeight;

    // Tiefer Schatten unter der Astetage
    const shadowGrad = ctx.createLinearGradient(0, tierY + tierHeight * 0.55, 0, tierY + tierHeight);
    shadowGrad.addColorStop(0, 'rgba(12, 28, 16, 0.0)');
    shadowGrad.addColorStop(1, 'rgba(10, 24, 14, 0.65)');
    ctx.fillStyle = shadowGrad;
    ctx.fillRect(0, tierY + tierHeight * 0.55, size, tierHeight * 0.45);

    if (bumpCtx) {
      const bGrad = bumpCtx.createLinearGradient(0, tierY, 0, tierY + tierHeight);
      bGrad.addColorStop(0, 'rgb(180, 180, 180)');
      bGrad.addColorStop(0.65, 'rgb(210, 210, 210)');
      bGrad.addColorStop(1, 'rgb(65, 65, 65)');
      bumpCtx.fillStyle = bGrad;
      bumpCtx.fillRect(0, tierY, size, tierHeight);
    }
  }

  // 3. Verholzte Astachsen in jeder Etage
  for (let t = 0; t < tierCount; t++) {
    const baseY = t * tierHeight + tierHeight * 0.35;
    for (let b = 0; b < 5; b++) {
      const startX = (b / 5) * size + random() * 40;
      const branchLen = 45 + random() * 65;
      const angle = (random() - 0.5) * 0.35;

      ctx.strokeStyle = 'rgba(72, 46, 28, 0.85)';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(startX, baseY);
      ctx.lineTo(startX + Math.cos(angle) * branchLen, baseY + Math.sin(angle) * branchLen + 4);
      ctx.stroke();

      if (bumpCtx) {
        bumpCtx.strokeStyle = 'rgba(230, 230, 230, 0.7)';
        bumpCtx.lineWidth = 2.4;
        bumpCtx.beginPath();
        bumpCtx.moveTo(startX, baseY);
        bumpCtx.lineTo(startX + Math.cos(angle) * branchLen, baseY + Math.sin(angle) * branchLen + 4);
        bumpCtx.stroke();
      }
    }
  }

  // 4. Dichte fächerförmige Nadelkämme (kammartige Fichten- und Tannennadeln)
  const needleGroupCount = 750;
  for (let i = 0; i < needleGroupCount; i++) {
    const bx = random() * size;
    const by = random() * size;
    // Nadeln neigen sich nach außen und leicht nach unten
    const baseAngle = Math.PI * 0.5 + (random() - 0.5) * 1.35;
    const needleCount = 6 + Math.floor(random() * 6);
    const branchLen = 9 + random() * 16;

    for (let n = 0; n < needleCount; n++) {
      const spread = (n - needleCount / 2) * 0.16;
      const angle = baseAngle + spread;
      const len = branchLen * (0.75 + random() * 0.45);
      const ex = bx + Math.cos(angle) * len;
      const ey = by + Math.sin(angle) * len;

      const r = random();
      let color: string;
      let bumpColor: string;
      if (r > 0.65) {
        // Frischer Nadelkamm mit sonnigem Wachsglanz (kühles Nadelgrün)
        color = 'rgba(105, 195, 135, 0.95)';
        bumpColor = 'rgba(240, 240, 240, 0.8)';
      } else if (r > 0.28) {
        // Kräftiges Tannengrün
        color = 'rgba(48, 115, 68, 0.92)';
        bumpColor = 'rgba(185, 185, 185, 0.6)';
      } else {
        // Nadelunterseite / Schatten
        color = 'rgba(22, 58, 34, 0.88)';
        bumpColor = 'rgba(50, 50, 50, 0.6)';
      }

      ctx.strokeStyle = color;
      ctx.lineWidth = 1.45;
      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.lineTo(ex, ey);
      ctx.stroke();

      if (bumpCtx) {
        bumpCtx.strokeStyle = bumpColor;
        bumpCtx.lineWidth = 1.45;
        bumpCtx.beginPath();
        bumpCtx.moveTo(bx, by);
        bumpCtx.lineTo(ex, ey);
        bumpCtx.stroke();
      }
    }
  }

  // 5. Silbrige Nadelspitzen für echten Tannengrund
  for (let i = 0; i < 600; i++) {
    const sx = random() * size;
    const sy = random() * size;
    const slen = 3 + random() * 6;
    ctx.strokeStyle = 'rgba(135, 218, 160, 0.65)';
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx + slen, sy + (random() - 0.5) * 2);
    ctx.stroke();
  }

  // 6. Feine Nadelkörnung
  for (let i = 0; i < 2000; i++) {
    const nx = random() * size;
    const ny = random() * size;
    const isLight = random() > 0.55;
    ctx.fillStyle = isLight ? 'rgba(125, 205, 150, 0.38)' : 'rgba(18, 48, 28, 0.4)';
    ctx.fillRect(nx, ny, 1.2, 1.2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  let bumpTexture: THREE.CanvasTexture | null = null;
  if (bumpCanvas) {
    bumpTexture = new THREE.CanvasTexture(bumpCanvas);
    bumpTexture.wrapS = THREE.RepeatWrapping;
    bumpTexture.wrapT = THREE.RepeatWrapping;
    bumpTexture.needsUpdate = true;
  }

  cachedPineFoliageTexture = { map: texture, bumpMap: bumpTexture };
  return clonePair(cachedPineFoliageTexture);
}

/**
 * Erzeugt eine detailreiche, antike Steintextur für Sockel und Fundamente:
 * - Schiefer- und Granitgrau mit organischen Farbschattierungen
 * - Feine Felsrisse, Klüfte, Mineraladern und dezente Moosflechten
 * - Plastische Bump-Map für ausgeprägte Stein- und Kantenreliefs
 */
export function createStoneTexture(): { map: THREE.CanvasTexture | null; bumpMap: THREE.CanvasTexture | null } {
  if (cachedStoneTexture) {
    return clonePair(cachedStoneTexture);
  }
  if (typeof document === 'undefined') {
    return { map: null, bumpMap: null };
  }

  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return { map: null, bumpMap: null };

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bumpCtx = bumpCanvas.getContext('2d');

  // 1. Grundfarbe: Schiefer- und Granitgrau
  ctx.fillStyle = '#616769';
  ctx.fillRect(0, 0, size, size);

  if (bumpCtx) {
    bumpCtx.fillStyle = '#808080';
    bumpCtx.fillRect(0, 0, size, size);
  }

  const rng = (seed: number) => {
    let s = seed % 2147483647;
    if (s <= 0) s += 2147483646;
    return () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  };
  const random = rng(999);

  // 2. Größere Farbwolkungen (Dunkler Fels & helle Quarzbereiche)
  for (let i = 0; i < 60; i++) {
    const cx = random() * size;
    const cy = random() * size;
    const r = 25 + random() * 60;
    const type = random();
    const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, r);
    if (type > 0.6) {
      // Helle Mineralader
      grad.addColorStop(0, 'rgba(142, 150, 153, 0.4)');
      grad.addColorStop(1, 'rgba(142, 150, 153, 0)');
    } else if (type > 0.25) {
      // Dunkler Schieferfleck
      grad.addColorStop(0, 'rgba(50, 56, 58, 0.45)');
      grad.addColorStop(1, 'rgba(50, 56, 58, 0)');
    } else {
      // Dezent grünliche Moosflechte
      grad.addColorStop(0, 'rgba(68, 86, 64, 0.35)');
      grad.addColorStop(1, 'rgba(68, 86, 64, 0)');
    }
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // 3. Felsrisse und Spalten
  for (let i = 0; i < 40; i++) {
    let x = random() * size;
    let y = random() * size;
    const steps = 6 + Math.floor(random() * 8);
    const w = 1.2 + random() * 1.5;

    ctx.strokeStyle = 'rgba(28, 32, 34, 0.75)';
    ctx.lineWidth = w;
    ctx.beginPath();
    ctx.moveTo(x, y);

    if (bumpCtx) {
      bumpCtx.strokeStyle = 'rgba(15, 15, 15, 0.85)';
      bumpCtx.lineWidth = w;
      bumpCtx.beginPath();
      bumpCtx.moveTo(x, y);
    }

    for (let s = 0; s < steps; s++) {
      x += (random() - 0.5) * 28;
      y += (random() - 0.5) * 28;
      ctx.lineTo(x, y);
      if (bumpCtx) bumpCtx.lineTo(x, y);
    }
    ctx.stroke();
    if (bumpCtx) bumpCtx.stroke();
  }

  // 4. Steinkörnung & Poren
  for (let i = 0; i < 2200; i++) {
    const sx = random() * size;
    const sy = random() * size;
    const light = random() > 0.5;
    ctx.fillStyle = light ? 'rgba(165, 172, 176, 0.35)' : 'rgba(38, 42, 44, 0.35)';
    ctx.fillRect(sx, sy, 1.4, 1.4);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;

  let bumpTexture: THREE.CanvasTexture | null = null;
  if (bumpCanvas) {
    bumpTexture = new THREE.CanvasTexture(bumpCanvas);
    bumpTexture.wrapS = THREE.RepeatWrapping;
    bumpTexture.wrapT = THREE.RepeatWrapping;
    bumpTexture.needsUpdate = true;
  }

  cachedStoneTexture = { map: texture, bumpMap: bumpTexture };
  return clonePair(cachedStoneTexture);
}

/**
 * Erzeugt eine Basalt- und Obsidianfels-Textur mit leuchtenden, hellen roten Magmaadern:
 * - Tiefschwarzer, zerklüfteter Basaltgrund
 * - Feurige, sich verzweigende rote und gelb-weiße Glutadern (Lavaadern)
 * - Eigene Emissive-Map für intensives, selbstleuchtendes Glühen der Magmarisse
 * - Bump-Map für scharfe Felsklüfte
 */
export function createVeinedLavaRockTexture(): {
  map: THREE.CanvasTexture | null;
  emissiveMap: THREE.CanvasTexture | null;
  bumpMap: THREE.CanvasTexture | null;
} {
  if (cachedVeinedLavaRockTexture) {
    return cloneLava(cachedVeinedLavaRockTexture);
  }
  if (typeof document === 'undefined') {
    return { map: null, emissiveMap: null, bumpMap: null };
  }

  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return { map: null, emissiveMap: null, bumpMap: null };

  const emissiveCanvas = document.createElement('canvas');
  emissiveCanvas.width = size;
  emissiveCanvas.height = size;
  const emissiveCtx = emissiveCanvas.getContext('2d');

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bumpCtx = bumpCanvas.getContext('2d');

  // 1. Grundfläche: Tiefes Obsidian-/Basaltschwarz
  ctx.fillStyle = '#151313';
  ctx.fillRect(0, 0, size, size);

  if (emissiveCtx) {
    emissiveCtx.fillStyle = '#000000';
    emissiveCtx.fillRect(0, 0, size, size);
  }

  if (bumpCtx) {
    bumpCtx.fillStyle = '#808080';
    bumpCtx.fillRect(0, 0, size, size);
  }

  const rng = (seed: number) => {
    let s = seed % 2147483647;
    if (s <= 0) s += 2147483646;
    return () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  };
  const random = rng(666);

  // 2. Dunkle Basaltschichten und Ascheflecken
  for (let i = 0; i < 45; i++) {
    const cx = random() * size;
    const cy = random() * size;
    const r = 25 + random() * 55;
    const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, r);
    grad.addColorStop(0, 'rgba(38, 28, 25, 0.55)');
    grad.addColorStop(1, 'rgba(15, 12, 12, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // 3. Verzweigte, glühende rote und goldgelbe Magma-Adern
  const numVeinTrees = 16;
  for (let v = 0; v < numVeinTrees; v++) {
    const startX = random() * size;
    const startY = random() * size;
    const veinAngle = random() * Math.PI * 2;
    const veinSteps = 8 + Math.floor(random() * 10);
    const mainWidth = 2.5 + random() * 2.8;

    const points: Array<{ x: number; y: number; w: number }> = [{ x: startX, y: startY, w: mainWidth }];
    let curX = startX;
    let curY = startY;

    for (let s = 0; s < veinSteps; s++) {
      const stepAngle = veinAngle + (random() - 0.5) * 1.4;
      const stepLen = 12 + random() * 24;
      curX += Math.cos(stepAngle) * stepLen;
      curY += Math.sin(stepAngle) * stepLen;
      const curW = Math.max(0.8, mainWidth * (1.0 - (s / veinSteps) * 0.75));
      points.push({ x: curX, y: curY, w: curW });
    }

    // A. Äußerer weicher roter Glut-Glow um die Ader
    for (let p = 0; p < points.length - 1; p++) {
      const p1 = points[p];
      const p2 = points[p + 1];

      ctx.strokeStyle = 'rgba(230, 45, 10, 0.45)';
      ctx.lineWidth = p1.w * 3.8;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();

      if (emissiveCtx) {
        emissiveCtx.strokeStyle = 'rgba(215, 35, 5, 0.6)';
        emissiveCtx.lineWidth = p1.w * 3.2;
        emissiveCtx.beginPath();
        emissiveCtx.moveTo(p1.x, p1.y);
        emissiveCtx.lineTo(p2.x, p2.y);
        emissiveCtx.stroke();
      }
    }

    // B. Kräftige rote Magmaader (mittlere Schicht)
    for (let p = 0; p < points.length - 1; p++) {
      const p1 = points[p];
      const p2 = points[p + 1];

      ctx.strokeStyle = '#ff3300';
      ctx.lineWidth = p1.w * 1.6;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();

      if (emissiveCtx) {
        emissiveCtx.strokeStyle = '#ff3300';
        emissiveCtx.lineWidth = p1.w * 1.6;
        emissiveCtx.beginPath();
        emissiveCtx.moveTo(p1.x, p1.y);
        emissiveCtx.lineTo(p2.x, p2.y);
        emissiveCtx.stroke();
      }

      if (bumpCtx) {
        bumpCtx.strokeStyle = 'rgba(20, 20, 20, 0.8)';
        bumpCtx.lineWidth = p1.w * 1.6;
        bumpCtx.beginPath();
        bumpCtx.moveTo(p1.x, p1.y);
        bumpCtx.lineTo(p2.x, p2.y);
        bumpCtx.stroke();
      }
    }

    // C. Weißgelber glühend heißer Kern der Magmaader
    for (let p = 0; p < points.length - 1; p++) {
      const p1 = points[p];
      const p2 = points[p + 1];

      ctx.strokeStyle = '#fff0b0';
      ctx.lineWidth = Math.max(0.6, p1.w * 0.55);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();

      if (emissiveCtx) {
        emissiveCtx.strokeStyle = '#ffffff';
        emissiveCtx.lineWidth = Math.max(0.6, p1.w * 0.55);
        emissiveCtx.beginPath();
        emissiveCtx.moveTo(p1.x, p1.y);
        emissiveCtx.lineTo(p2.x, p2.y);
        emissiveCtx.stroke();
      }
    }
  }

  // 4. Feine Aschepartikel und Obsidian-Splitter
  for (let i = 0; i < 1600; i++) {
    const px = random() * size;
    const py = random() * size;
    const isEmber = random() > 0.94;
    if (isEmber) {
      ctx.fillStyle = 'rgba(255, 120, 20, 0.8)';
      ctx.fillRect(px, py, 1.4, 1.4);
      if (emissiveCtx) {
        emissiveCtx.fillStyle = '#ff7711';
        emissiveCtx.fillRect(px, py, 1.4, 1.4);
      }
    } else {
      ctx.fillStyle = random() > 0.5 ? 'rgba(55, 45, 42, 0.4)' : 'rgba(8, 7, 7, 0.4)';
      ctx.fillRect(px, py, 1.2, 1.2);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;

  let emissiveTexture: THREE.CanvasTexture | null = null;
  if (emissiveCanvas) {
    emissiveTexture = new THREE.CanvasTexture(emissiveCanvas);
    emissiveTexture.wrapS = THREE.RepeatWrapping;
    emissiveTexture.wrapT = THREE.RepeatWrapping;
    emissiveTexture.needsUpdate = true;
  }

  let bumpTexture: THREE.CanvasTexture | null = null;
  if (bumpCanvas) {
    bumpTexture = new THREE.CanvasTexture(bumpCanvas);
    bumpTexture.wrapS = THREE.RepeatWrapping;
    bumpTexture.wrapT = THREE.RepeatWrapping;
    bumpTexture.needsUpdate = true;
  }

  cachedVeinedLavaRockTexture = { map: texture, emissiveMap: emissiveTexture, bumpMap: bumpTexture };
  return cloneLava(cachedVeinedLavaRockTexture);
}

/**
 * Erzeugt eine nahtlos kachelbare Backstein-Pflastertextur für Plätze und Höfe:
 * - Warme, gebrannte Klinker- und Terrakottatöne mit natürlichen Farbvariationen
 * - Authentischer Läuferverband mit sandigen Zementfugen
 * - Plastisches Bump-Relief mit leicht abgerundeten Steinrändern und poröser Oberfläche
 */
export function createBrickTexture(): { map: THREE.CanvasTexture | null; bumpMap: THREE.CanvasTexture | null } {
  if (cachedBrickTexture) {
    return clonePair(cachedBrickTexture);
  }
  if (typeof document === 'undefined') {
    return { map: null, bumpMap: null };
  }

  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return { map: null, bumpMap: null };

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bumpCtx = bumpCanvas.getContext('2d');

  // 1. Grundierung: Dunkle Fugenmasse
  const mortarColor = '#3a342e';
  ctx.fillStyle = mortarColor;
  ctx.fillRect(0, 0, size, size);

  if (bumpCtx) {
    bumpCtx.fillStyle = '#222222'; // Tiefe Fugen im Bump-Map
    bumpCtx.fillRect(0, 0, size, size);
  }

  // Pseudozufall mit festem Seed für Deterministik
  const rng = (seed: number) => {
    let s = seed % 2147483647;
    if (s <= 0) s += 2147483646;
    return () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  };
  const random = rng(8831);

  // Ziegelraster: 8 Reihen (Höhe je 64px)
  const rows = 8;
  const rowHeight = size / rows;
  const jointWidth = 5; // Fugenbreite
  const brickWidth = 128; // Standardbreite 128px (2:1 Proportion)

  const brickPalettes = [
    { base: '#9c4428', highlight: '#ba5836', dark: '#7d331c' }, // Klassisches Klinkerrot
    { base: '#aa4d2e', highlight: '#c66542', dark: '#883b21' }, // Warmes Terrakotta
    { base: '#8d3b20', highlight: '#aa4e2f', dark: '#6e2b15' }, // Dunkel gebrannter Klinker
    { base: '#a65434', highlight: '#bf6c49', dark: '#863f24' }, // Orangebrauner Ziegel
    { base: '#7c331a', highlight: '#984325', dark: '#5e2311' }, // Stark gebrannter Ziegel
  ];

  for (let r = 0; r < rows; r++) {
    const y = r * rowHeight + jointWidth / 2;
    const h = rowHeight - jointWidth;
    // Jede zweite Reihe um einen halben Stein versetzen (Läuferverband)
    const xOffset = (r % 2 === 0 ? 0 : brickWidth / 2);

    for (let x = -brickWidth; x < size + brickWidth; x += brickWidth) {
      const bx = x + xOffset + jointWidth / 2;
      const bw = brickWidth - jointWidth;

      // Palette für diesen Stein
      const pal = brickPalettes[Math.floor(random() * brickPalettes.length)];

      // Ziegelfläche mit leichtem Farbverlauf (Sonnenlicht & Brandspuren)
      const grad = ctx.createLinearGradient(bx, y, bx + bw, y + h);
      grad.addColorStop(0, pal.highlight);
      grad.addColorStop(0.5, pal.base);
      grad.addColorStop(1, pal.dark);

      ctx.fillStyle = grad;
      ctx.fillRect(bx, y, bw, h);

      // Weiche Rundung der Kanten / Schattierung am Rand
      ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
      ctx.fillRect(bx, y + h - 2, bw, 2); // Untere Schattenkante
      ctx.fillRect(bx + bw - 2, y, 2, h); // Rechte Schattenkante

      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.fillRect(bx, y, bw, 2); // Obere Lichtkante
      ctx.fillRect(bx, y, 2, h); // Linke Lichtkante

      // Bump-Map: Erhabene Ziegelsteine mit Kissenform
      if (bumpCtx) {
        const bGrad = bumpCtx.createRadialGradient(
          bx + bw / 2, y + h / 2, 2,
          bx + bw / 2, y + h / 2, Math.hypot(bw, h) / 1.7
        );
        bGrad.addColorStop(0, '#d8d8d8');
        bGrad.addColorStop(0.75, '#b0b0b0');
        bGrad.addColorStop(1, '#505050');
        bumpCtx.fillStyle = bGrad;
        bumpCtx.fillRect(bx, y, bw, h);
      }
    }
  }

  // 3. Feine Körnung, Poren und Brandflecken
  for (let i = 0; i < 4000; i++) {
    const px = random() * size;
    const py = random() * size;
    const isPore = random() > 0.45;
    const alpha = 0.08 + random() * 0.15;
    ctx.fillStyle = isPore ? `rgba(20, 10, 8, ${alpha})` : `rgba(255, 230, 200, ${alpha * 0.8})`;
    ctx.fillRect(px, py, 1.3, 1.3);

    if (bumpCtx) {
      bumpCtx.fillStyle = isPore ? '#202020' : '#ffffff';
      bumpCtx.fillRect(px, py, 1.2, 1.2);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;

  let bumpTexture: THREE.CanvasTexture | null = null;
  if (bumpCanvas) {
    bumpTexture = new THREE.CanvasTexture(bumpCanvas);
    bumpTexture.wrapS = THREE.RepeatWrapping;
    bumpTexture.wrapT = THREE.RepeatWrapping;
    bumpTexture.needsUpdate = true;
  }

  cachedBrickTexture = { map: texture, bumpMap: bumpTexture };
  return clonePair(cachedBrickTexture);
}

/**
 * Erzeugt eine breite Mauerstruktur (Großquaderstein- / Haustein-Mauerwerk):
 * - Massiv behauene, breite Quadersteine im Halbversatz
 * - Tiefe horizontale und vertikale Fugen mit Verwitterungsspuren
 * - Plastisches Bossenwerk mit kräftigem Steinrelief
 */
export function createAshlarWallTexture(): { map: THREE.CanvasTexture | null; bumpMap: THREE.CanvasTexture | null } {
  if (cachedAshlarWallTexture) {
    return clonePair(cachedAshlarWallTexture);
  }
  if (typeof document === 'undefined') {
    return { map: null, bumpMap: null };
  }

  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return { map: null, bumpMap: null };

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bumpCtx = bumpCanvas.getContext('2d');

  // 1. Dunkler Mörtelgrund
  ctx.fillStyle = '#2d2b27';
  ctx.fillRect(0, 0, size, size);

  if (bumpCtx) {
    bumpCtx.fillStyle = '#1c1c1c';
    bumpCtx.fillRect(0, 0, size, size);
  }

  const rng = (seed: number) => {
    let s = seed % 2147483647;
    if (s <= 0) s += 2147483646;
    return () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  };
  const random = rng(4529);

  // 4 breite Steinreihen (je 128px Höhe)
  const rows = 4;
  const rowHeight = size / rows;
  const jointWidth = 7;
  const ashlarWidth = 256; // Breite Quadersteine (Verhältnis 2:1 bis 3:1)

  const stonePalettes = [
    { base: '#5c5750', light: '#736d64', dark: '#46423c' },
    { base: '#645e56', light: '#7a746b', dark: '#4d4841' },
    { base: '#555149', light: '#6c665d', dark: '#3f3b35' },
    { base: '#6a655c', light: '#827c72', dark: '#524d45' },
    { base: '#504c44', light: '#676258', dark: '#3b3731' },
  ];

  for (let r = 0; r < rows; r++) {
    const y = r * rowHeight + jointWidth / 2;
    const h = rowHeight - jointWidth;
    const xOffset = (r % 2 === 0 ? 0 : ashlarWidth / 2);

    for (let x = -ashlarWidth; x < size + ashlarWidth; x += ashlarWidth) {
      const bx = x + xOffset + jointWidth / 2;
      const bw = ashlarWidth - jointWidth;

      const pal = stonePalettes[Math.floor(random() * stonePalettes.length)];

      // Steinblock mit Bossierung
      const grad = ctx.createLinearGradient(bx, y, bx + bw, y + h);
      grad.addColorStop(0, pal.light);
      grad.addColorStop(0.5, pal.base);
      grad.addColorStop(1, pal.dark);

      ctx.fillStyle = grad;
      ctx.fillRect(bx, y, bw, h);

      // Kissenartige Wölbung & Kantenmeißelung
      ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
      ctx.fillRect(bx, y + h - 3, bw, 3);
      ctx.fillRect(bx + bw - 3, y, 3, h);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.16)';
      ctx.fillRect(bx, y, bw, 3);
      ctx.fillRect(bx, y, 3, h);

      // Moosspuren an den unteren Steinfugen
      if (random() > 0.4) {
        const mossGrad = ctx.createLinearGradient(bx, y + h - 16, bx, y + h);
        mossGrad.addColorStop(0, 'rgba(55, 75, 40, 0)');
        mossGrad.addColorStop(1, 'rgba(45, 65, 32, 0.45)');
        ctx.fillStyle = mossGrad;
        ctx.fillRect(bx, y + h - 16, bw, 16);
      }

      if (bumpCtx) {
        // Starkes Kissenrelief der breiten Quader
        const bGrad = bumpCtx.createRadialGradient(
          bx + bw / 2, y + h / 2, 8,
          bx + bw / 2, y + h / 2, Math.hypot(bw, h) / 1.8
        );
        bGrad.addColorStop(0, '#e8e8e8');
        bGrad.addColorStop(0.7, '#b8b8b8');
        bGrad.addColorStop(1, '#484848');
        bumpCtx.fillStyle = bGrad;
        bumpCtx.fillRect(bx, y, bw, h);
      }
    }
  }

  // Meißelspuren und Steinporen
  for (let i = 0; i < 3500; i++) {
    const px = random() * size;
    const py = random() * size;
    const isPore = random() > 0.5;
    const alpha = 0.08 + random() * 0.16;
    ctx.fillStyle = isPore ? `rgba(18, 16, 14, ${alpha})` : `rgba(235, 230, 220, ${alpha * 0.7})`;
    ctx.fillRect(px, py, 1.8, 1.2);

    if (bumpCtx) {
      bumpCtx.fillStyle = isPore ? '#282828' : '#f0f0f0';
      bumpCtx.fillRect(px, py, 1.6, 1.0);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;

  let bumpTexture: THREE.CanvasTexture | null = null;
  if (bumpCanvas) {
    bumpTexture = new THREE.CanvasTexture(bumpCanvas);
    bumpTexture.wrapS = THREE.RepeatWrapping;
    bumpTexture.wrapT = THREE.RepeatWrapping;
    bumpTexture.needsUpdate = true;
  }

  cachedAshlarWallTexture = { map: texture, bumpMap: bumpTexture };
  return clonePair(cachedAshlarWallTexture);
}

/**
 * Erzeugt eine edle, detailreiche Holzmaserungs-Textur für Tore, Pfosten und Stämme:
 * - Warme, satte Eichenholz- und Walnusstöne mit fließenden Jahresringen
 * - Wellige Wuchsfasern und weiche Holzadern
 * - Feines Rillenrelief im Bump-Map für spürbare Holzhaptik
 */
export function createWoodGrainTexture(): { map: THREE.CanvasTexture | null; bumpMap: THREE.CanvasTexture | null } {
  if (cachedWoodGrainTexture) {
    return clonePair(cachedWoodGrainTexture);
  }
  if (typeof document === 'undefined') {
    return { map: null, bumpMap: null };
  }

  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return { map: null, bumpMap: null };

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bumpCtx = bumpCanvas.getContext('2d');

  // 1. Grundfarbe: Warmes Naturholz
  ctx.fillStyle = '#55361f';
  ctx.fillRect(0, 0, size, size);

  if (bumpCtx) {
    bumpCtx.fillStyle = '#808080';
    bumpCtx.fillRect(0, 0, size, size);
  }

  const rng = (seed: number) => {
    let s = seed % 2147483647;
    if (s <= 0) s += 2147483646;
    return () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  };
  const random = rng(7193);

  // 2. Jahresringe und Fladern (Wellenlinien entlang Y)
  const ringCount = 38;
  for (let r = 0; r < ringCount; r++) {
    const baseX = (r / ringCount) * size;
    const isDarkRing = r % 2 === 0;
    const ringColor = isDarkRing ? 'rgba(56, 32, 16, 0.42)' : 'rgba(125, 82, 45, 0.38)';
    const bumpVal = isDarkRing ? '#505050' : '#b0b0b0';

    ctx.strokeStyle = ringColor;
    ctx.lineWidth = 4.5 + Math.sin(r * 1.3) * 2.2;
    ctx.beginPath();

    if (bumpCtx) {
      bumpCtx.strokeStyle = bumpVal;
      bumpCtx.lineWidth = ctx.lineWidth;
      bumpCtx.beginPath();
    }

    const waveFreq = 0.012 + (r % 3) * 0.006;
    const waveAmp = 14 + (r % 4) * 8;
    const knotCenterY = 190 + (r % 2) * 160;

    for (let y = 0; y <= size; y += 8) {
      // Fladern-Verzerrung um fiktive Astaugen
      const knotDist = Math.abs(y - knotCenterY);
      const knotBulge = knotDist < 90 ? Math.cos((knotDist / 90) * (Math.PI / 2)) * 24 : 0;
      const x = baseX + Math.sin(y * waveFreq) * waveAmp + knotBulge;

      if (y === 0) {
        ctx.moveTo(x, y);
        if (bumpCtx) bumpCtx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
        if (bumpCtx) bumpCtx.lineTo(x, y);
      }
    }

    ctx.stroke();
    if (bumpCtx) bumpCtx.stroke();
  }

  // 3. Tausende feine Holzfasern in Wuchsrichtung (vertikal)
  const fiberCount = 2200;
  for (let i = 0; i < fiberCount; i++) {
    const fx = random() * size;
    const fy = random() * size;
    const flen = 16 + random() * 45;
    const isDark = random() > 0.48;
    const alpha = 0.08 + random() * 0.16;

    ctx.strokeStyle = isDark ? `rgba(38, 20, 10, ${alpha})` : `rgba(145, 96, 55, ${alpha * 0.9})`;
    ctx.lineWidth = 0.9 + random() * 1.1;
    ctx.beginPath();
    ctx.moveTo(fx, fy);
    ctx.lineTo(fx + (random() - 0.5) * 1.5, fy + flen);
    ctx.stroke();

    if (bumpCtx) {
      bumpCtx.strokeStyle = isDark ? '#404040' : '#c8c8c8';
      bumpCtx.lineWidth = ctx.lineWidth;
      bumpCtx.beginPath();
      bumpCtx.moveTo(fx, fy);
      bumpCtx.lineTo(fx + (random() - 0.5) * 1.5, fy + flen);
      bumpCtx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;

  let bumpTexture: THREE.CanvasTexture | null = null;
  if (bumpCanvas) {
    bumpTexture = new THREE.CanvasTexture(bumpCanvas);
    bumpTexture.wrapS = THREE.RepeatWrapping;
    bumpTexture.wrapT = THREE.RepeatWrapping;
    bumpTexture.needsUpdate = true;
  }

  cachedWoodGrainTexture = { map: texture, bumpMap: bumpTexture };
  return clonePair(cachedWoodGrainTexture);
}
