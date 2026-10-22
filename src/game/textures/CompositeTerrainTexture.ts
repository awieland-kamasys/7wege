import * as THREE from 'three';
import {
  CAVE_ENTRANCE_POS,
  CLOSED_GATE_POS,
  HELL_CHASM_POS,
  HUNTING_LODGE_POS,
  LUMBER_CAMP_POS,
  POND_CENTER_POS,
  WEIR_BRIDGE_POS,
  PATH_1_WAYPOINTS,
  PATH_2_WAYPOINTS,
  PATH_3_WAYPOINTS,
  PATH_4_WAYPOINTS,
  PATH_5_WAYPOINTS,
  PATH_6_WAYPOINTS,
  PATH_7_WAYPOINTS,
  PathPoint2D,
} from '../data/paths';

export interface CompositeTerrainResult {
  map: THREE.CanvasTexture | null;
  emissiveMap: THREE.CanvasTexture | null;
  bumpMap: THREE.CanvasTexture | null;
}

let cachedTerrainTextures: CompositeTerrainResult | null = null;

/**
 * Wandelt 3D-Weltkoordinaten (-120 bis +120m) in Canvas-Pixelkoordinaten (0 bis size) um.
 */
function worldToPx(wx: number, wz: number, size: number): { x: number; y: number } {
  const x = ((wx + 120) / 240) * size;
  const y = ((wz + 120) / 240) * size;
  return { x, y };
}

/**
 * Erzeugt eine deterministische Pseudozufalls-Funktion für reproduzierbare Naturtexturen.
 */
function createRng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/**
 * Erzeugt eine hochauflösende, organische Composite-Geländetextur (2048x2048):
 * - Ausgedehnte Wald- und Wiesenflächen mit Helligkeits- und Moosnuancen
 * - Alle 7 Waldwege direkt in die Textur eingearbeitet mit natürlichen, organisch ausgefransten Rändern
 * - Zentrale Lichtung und Schauplatz-Plätze an den Wegenden
 * - Kraterkessel um den Lavasee mit tiefschwarzem Obsidianboden und leuchtend dunkelroten Magma-Adern
 * - Farbmodus (map), Glut-Adern (emissiveMap) und Tiefenrelief (bumpMap)
 */
export function createCompositeTerrainTexture(): CompositeTerrainResult {
  if (cachedTerrainTextures) {
    return {
      map: cachedTerrainTextures.map ? (cachedTerrainTextures.map.clone() as THREE.CanvasTexture) : null,
      emissiveMap: cachedTerrainTextures.emissiveMap ? (cachedTerrainTextures.emissiveMap.clone() as THREE.CanvasTexture) : null,
      bumpMap: cachedTerrainTextures.bumpMap ? (cachedTerrainTextures.bumpMap.clone() as THREE.CanvasTexture) : null,
    };
  }

  if (typeof document === 'undefined') {
    return { map: null, emissiveMap: null, bumpMap: null };
  }

  const size = 2048;
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

  const random = createRng(1337);

  // =========================================================================
  // 1. BASISSCHICHT: SATTE WALDWIESE MIT ORGANISCHEN MOOS- & LICHTFLECKEN
  // =========================================================================
  ctx.fillStyle = '#2d502f';
  ctx.fillRect(0, 0, size, size);

  if (emissiveCtx) {
    emissiveCtx.fillStyle = '#000000';
    emissiveCtx.fillRect(0, 0, size, size);
  }

  if (bumpCtx) {
    bumpCtx.fillStyle = '#808080';
    bumpCtx.fillRect(0, 0, size, size);
  }

  // Großflächige natürliche Tönungen (Moos, Nadelstreu, Humus)
  for (let i = 0; i < 180; i++) {
    const cx = random() * size;
    const cy = random() * size;
    const r = 60 + random() * 140;
    const isLight = random() > 0.45;

    const grad = ctx.createRadialGradient(cx, cy, 5, cx, cy, r);
    if (isLight) {
      grad.addColorStop(0, 'rgba(56, 96, 50, 0.38)');
      grad.addColorStop(1, 'rgba(56, 96, 50, 0)');
    } else {
      grad.addColorStop(0, 'rgba(32, 54, 30, 0.45)');
      grad.addColorStop(1, 'rgba(32, 54, 30, 0)');
    }
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    if (bumpCtx) {
      const bGrad = bumpCtx.createRadialGradient(cx, cy, 5, cx, cy, r);
      bGrad.addColorStop(0, isLight ? 'rgba(150, 150, 150, 0.25)' : 'rgba(100, 100, 100, 0.25)');
      bGrad.addColorStop(1, 'rgba(128, 128, 128, 0)');
      bumpCtx.fillStyle = bGrad;
      bumpCtx.beginPath();
      bumpCtx.arc(cx, cy, r, 0, Math.PI * 2);
      bumpCtx.fill();
    }
  }

  // =========================================================================
  // 2. HÖLLENSCHLUND & KRATERBECKEN: TIEFSCHWARZER BASALT MIT GLÜHENDEN ADERN
  // =========================================================================
  const chasmPx = worldToPx(HELL_CHASM_POS.x, HELL_CHASM_POS.z, size);
  // Radius der Lavazone: ca. 24m (205 Pixel) äußerer Brandrand, 17m (145 Pixel) dichter Basaltkessel
  const outerHellRadius = (24 / 240) * size;
  const innerHellRadius = (17 / 240) * size;

  // Äußerer Brandrand (versengtes Gras, verkohlter Humus)
  const hellOuterGrad = ctx.createRadialGradient(chasmPx.x, chasmPx.y, innerHellRadius * 0.4, chasmPx.x, chasmPx.y, outerHellRadius);
  hellOuterGrad.addColorStop(0, '#1c1514');
  hellOuterGrad.addColorStop(0.45, '#301c15');
  hellOuterGrad.addColorStop(0.75, '#3b2f21');
  hellOuterGrad.addColorStop(1.0, 'rgba(59, 47, 33, 0)');
  ctx.fillStyle = hellOuterGrad;
  ctx.beginPath();
  ctx.arc(chasmPx.x, chasmPx.y, outerHellRadius, 0, Math.PI * 2);
  ctx.fill();

  // Innerer Basaltkessel (matter Obsidian-/Lavagesteinsboden)
  const hellInnerGrad = ctx.createRadialGradient(chasmPx.x, chasmPx.y, 10, chasmPx.x, chasmPx.y, innerHellRadius);
  hellInnerGrad.addColorStop(0, '#0e0b0c');
  hellInnerGrad.addColorStop(0.65, '#161213');
  hellInnerGrad.addColorStop(1.0, '#1c1514');
  ctx.fillStyle = hellInnerGrad;
  ctx.beginPath();
  ctx.arc(chasmPx.x, chasmPx.y, innerHellRadius, 0, Math.PI * 2);
  ctx.fill();

  // Subtile Glut-Aura auf der EmissiveMap im Kraterbereich
  if (emissiveCtx) {
    const emAura = emissiveCtx.createRadialGradient(chasmPx.x, chasmPx.y, 15, chasmPx.x, chasmPx.y, innerHellRadius * 1.05);
    emAura.addColorStop(0, 'rgba(160, 25, 0, 0.65)');
    emAura.addColorStop(0.5, 'rgba(95, 12, 0, 0.45)');
    emAura.addColorStop(0.85, 'rgba(40, 5, 0, 0.2)');
    emAura.addColorStop(1, 'rgba(0, 0, 0, 0)');
    emissiveCtx.fillStyle = emAura;
    emissiveCtx.beginPath();
    emissiveCtx.arc(chasmPx.x, chasmPx.y, innerHellRadius * 1.05, 0, Math.PI * 2);
    emissiveCtx.fill();
  }

  // Verzweigte Magma-Adern und glühende Felsklüfte direkt um den Lavasee
  const numVeinTrees = 22;
  const veinRng = createRng(999);
  for (let v = 0; v < numVeinTrees; v++) {
    const angle = veinRng() * Math.PI * 2;
    const startDist = (3.5 + veinRng() * 9.5) * (size / 240); // 3.5m bis 13m um das Kraterzentrum
    const startX = chasmPx.x + Math.cos(angle) * startDist;
    const startY = chasmPx.y + Math.sin(angle) * startDist;

    let curX = startX;
    let curY = startY;
    let curAngle = angle + (veinRng() - 0.5) * 1.2;
    const steps = 6 + Math.floor(veinRng() * 8);

    const veinPoints: Array<{ x: number; y: number; w: number }> = [{ x: curX, y: curY, w: 3.5 }];

    for (let s = 0; s < steps; s++) {
      const stepLen = 8 + veinRng() * 12;
      curAngle += (veinRng() - 0.5) * 0.85;
      curX += Math.cos(curAngle) * stepLen;
      curY += Math.sin(curAngle) * stepLen;
      const w = Math.max(1.2, 3.5 * (1 - s / steps) + (veinRng() - 0.5) * 0.6);
      veinPoints.push({ x: curX, y: curY, w });
    }

    // 1. Dunkelroter Glutsaum (Map)
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#680c02';
    ctx.lineWidth = 5.5;
    ctx.beginPath();
    ctx.moveTo(veinPoints[0].x, veinPoints[0].y);
    for (let p = 1; p < veinPoints.length; p++) {
      ctx.lineTo(veinPoints[p].x, veinPoints[p].y);
    }
    ctx.stroke();

    // 2. Glühender feuerroter Kern (Map & EmissiveMap)
    ctx.strokeStyle = '#c92a04';
    ctx.lineWidth = 2.8;
    ctx.stroke();

    ctx.strokeStyle = '#ff7a18';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    if (emissiveCtx) {
      emissiveCtx.lineCap = 'round';
      emissiveCtx.lineJoin = 'round';

      emissiveCtx.strokeStyle = '#941400';
      emissiveCtx.lineWidth = 6.0;
      emissiveCtx.beginPath();
      emissiveCtx.moveTo(veinPoints[0].x, veinPoints[0].y);
      for (let p = 1; p < veinPoints.length; p++) {
        emissiveCtx.lineTo(veinPoints[p].x, veinPoints[p].y);
      }
      emissiveCtx.stroke();

      emissiveCtx.strokeStyle = '#e03a00';
      emissiveCtx.lineWidth = 3.0;
      emissiveCtx.stroke();

      emissiveCtx.strokeStyle = '#ffb242';
      emissiveCtx.lineWidth = 1.3;
      emissiveCtx.stroke();
    }

    if (bumpCtx) {
      bumpCtx.lineCap = 'round';
      bumpCtx.lineJoin = 'round';
      bumpCtx.strokeStyle = '#404040'; // Vertiefte Felsspalte
      bumpCtx.lineWidth = 3.2;
      bumpCtx.beginPath();
      bumpCtx.moveTo(veinPoints[0].x, veinPoints[0].y);
      for (let p = 1; p < veinPoints.length; p++) {
        bumpCtx.lineTo(veinPoints[p].x, veinPoints[p].y);
      }
      bumpCtx.stroke();
    }
  }

  // =========================================================================
  // 3. ZENTRALE WALDKREUZUNG (LICHTUNG)
  // =========================================================================
  const centerPx = worldToPx(0, 0, size);
  const clearingRadius = (7.4 / 240) * size; // ca. 63 Pixel

  // Weicher Übergang zur Wiese mit Walderde und Schotter
  const clearingGrad = ctx.createRadialGradient(centerPx.x, centerPx.y, clearingRadius * 0.45, centerPx.x, centerPx.y, clearingRadius * 1.15);
  clearingGrad.addColorStop(0, '#786650');
  clearingGrad.addColorStop(0.65, '#6a5944');
  clearingGrad.addColorStop(0.9, '#4c4031');
  clearingGrad.addColorStop(1.0, 'rgba(76, 64, 49, 0)');
  ctx.fillStyle = clearingGrad;
  ctx.beginPath();
  ctx.arc(centerPx.x, centerPx.y, clearingRadius * 1.15, 0, Math.PI * 2);
  ctx.fill();

  // Lichtungs-Hauptfläche
  ctx.fillStyle = '#786650';
  ctx.beginPath();
  ctx.arc(centerPx.x, centerPx.y, clearingRadius * 0.72, 0, Math.PI * 2);
  ctx.fill();

  if (bumpCtx) {
    const cBumpGrad = bumpCtx.createRadialGradient(centerPx.x, centerPx.y, clearingRadius * 0.5, centerPx.x, centerPx.y, clearingRadius);
    cBumpGrad.addColorStop(0, '#8c8c8c');
    cBumpGrad.addColorStop(1, '#808080');
    bumpCtx.fillStyle = cBumpGrad;
    bumpCtx.beginPath();
    bumpCtx.arc(centerPx.x, centerPx.y, clearingRadius, 0, Math.PI * 2);
    bumpCtx.fill();
  }

  // =========================================================================
  // 4. SCHAUPLATZ-PLÄTZE AN DEN WEGENDEN
  // =========================================================================
  interface ClearingConfig {
    pos: { x: number; z: number };
    radius: number;
    color: string;
    outerColor: string;
    isDark?: boolean;
  }

  const endClearings: ClearingConfig[] = [
    // Weg 1: Silberstollen-Bergmassiv (schotterig, grau-braun)
    { pos: CAVE_ENTRANCE_POS, radius: 6.2, color: '#6d6863', outerColor: '#4f4b46' },
    // Weg 2: Waldteich (feuchter, moosiger Sand)
    { pos: POND_CENTER_POS, radius: 6.5, color: '#5b5040', outerColor: '#3c352a' },
    // Weg 3: Wehrbrücke (Kieselufer)
    { pos: WEIR_BRIDGE_POS, radius: 5.8, color: '#6e6150', outerColor: '#483f34' },
    // Weg 4: Holzfällerlager (Rindenmulch & Nadelhumus)
    { pos: LUMBER_CAMP_POS, radius: 6.8, color: '#66503c', outerColor: '#453526' },
    // Weg 6: Jagdhütte (Waldboden mit Grasübergang)
    { pos: HUNTING_LODGE_POS, radius: 6.4, color: '#685947', outerColor: '#443a2d' },
    // Weg 7: Verschlossenes Tor (Kiesplatz)
    { pos: CLOSED_GATE_POS, radius: 5.6, color: '#746453', outerColor: '#4a3f33' },
  ];

  for (const c of endClearings) {
    const px = worldToPx(c.pos.x, c.pos.z, size);
    const radPx = (c.radius / 240) * size;

    const grad = ctx.createRadialGradient(px.x, px.y, radPx * 0.4, px.x, px.y, radPx * 1.15);
    grad.addColorStop(0, c.color);
    grad.addColorStop(0.7, c.outerColor);
    grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(px.x, px.y, radPx * 1.15, 0, Math.PI * 2);
    ctx.fill();
  }

  // =========================================================================
  // 5. DIE 7 WEGE MIT NATÜRLICHEN, ORGANISCH AUSGEFRANSTEN RÄNDERN
  // =========================================================================
  interface PathStyle {
    id: number;
    waypoints: readonly PathPoint2D[];
    saumColor: string;
    pathColor: string;
    centerColor: string;
    baseWidthMeters: number;
    isHellPath?: boolean;
  }

  const paths: PathStyle[] = [
    {
      id: 1,
      waypoints: PATH_1_WAYPOINTS,
      saumColor: '#473d32',
      pathColor: '#756c60', // Steiniger Bergpfad
      centerColor: '#8c8376',
      baseWidthMeters: 2.3,
    },
    {
      id: 2,
      waypoints: PATH_2_WAYPOINTS,
      saumColor: '#3c352a',
      pathColor: '#635544', // Feuchter Uferpfad
      centerColor: '#766652',
      baseWidthMeters: 2.2,
    },
    {
      id: 3,
      waypoints: PATH_3_WAYPOINTS,
      saumColor: '#453c30',
      pathColor: '#73624e', // Bachkiesel-Pfad
      centerColor: '#8a7761',
      baseWidthMeters: 2.2,
    },
    {
      id: 4,
      waypoints: PATH_4_WAYPOINTS,
      saumColor: '#423326',
      pathColor: '#6e5641', // Holzfäller-Humuspfad
      centerColor: '#826951',
      baseWidthMeters: 2.3,
    },
    {
      id: 5,
      waypoints: PATH_5_WAYPOINTS,
      saumColor: '#382a22',
      pathColor: '#4a3225', // Wird nach hinten zu Asche
      centerColor: '#614333',
      baseWidthMeters: 2.4,
      isHellPath: true,
    },
    {
      id: 6,
      waypoints: PATH_6_WAYPOINTS,
      saumColor: '#453d30',
      pathColor: '#72614d', // Schmalerer Jägerpfad
      centerColor: '#87745e',
      baseWidthMeters: 2.1,
    },
    {
      id: 7,
      waypoints: PATH_7_WAYPOINTS,
      saumColor: '#493e31',
      pathColor: '#7a6854', // Heller Torweg
      centerColor: '#917d67',
      baseWidthMeters: 2.3,
    },
  ];

  const pathRng = createRng(4242);

  for (const p of paths) {
    const wps = p.waypoints;
    const pxPoints: Array<{ x: number; y: number }> = wps.map((pt) => worldToPx(pt.x, pt.z, size));

    // Dichte Punkte entlang der Wegstrecke interpolieren (Schrittweite ca. 0.35m = ca. 3 Pixel)
    const densePoints: Array<{ x: number; y: number; progress: number }> = [];
    let totalLen = 0;
    const segLens: number[] = [];
    for (let i = 0; i < pxPoints.length - 1; i++) {
      const d = Math.hypot(pxPoints[i + 1].x - pxPoints[i].x, pxPoints[i + 1].y - pxPoints[i].y);
      segLens.push(d);
      totalLen += d;
    }

    let accLen = 0;
    for (let i = 0; i < pxPoints.length - 1; i++) {
      const p1 = pxPoints[i];
      const p2 = pxPoints[i + 1];
      const segLen = segLens[i];
      const stepCount = Math.max(3, Math.ceil(segLen / 2.6));

      for (let s = 0; s < stepCount; s++) {
        const t = s / stepCount;
        const curPx = p1.x + (p2.x - p1.x) * t;
        const curPy = p1.y + (p2.y - p1.y) * t;
        const progress = (accLen + t * segLen) / (totalLen || 1);
        densePoints.push({ x: curPx, y: curPy, progress });
      }
      accLen += segLen;
    }
    densePoints.push({ x: pxPoints[pxPoints.length - 1].x, y: pxPoints[pxPoints.length - 1].y, progress: 1.0 });

    const baseRadiusPx = ((p.baseWidthMeters / 2) / 240) * size;

    // 1. Äußerer, weicher Erdrand mit organischem Jitter (breite Verwachsung mit dem Gras)
    for (let i = 0; i < densePoints.length; i++) {
      const pt = densePoints[i];
      const jitter = (pathRng() - 0.5) * 4.2;
      const r = baseRadiusPx * 1.35 + jitter;

      let saumCol = p.saumColor;
      if (p.isHellPath && pt.progress > 0.4) {
        // Geht in dunkle Asche und Brandrand über
        saumCol = '#1e1614';
      }

      ctx.fillStyle = saumCol;
      ctx.beginPath();
      ctx.arc(pt.x + (pathRng() - 0.5) * 1.5, pt.y + (pathRng() - 0.5) * 1.5, Math.max(1, r), 0, Math.PI * 2);
      ctx.fill();

      // Gelegentliche organische Kanten-Ausfransungen (Erdspritzer / Grasbuchten)
      if (i % 3 === 0) {
        const sideAngle = pathRng() * Math.PI * 2;
        const sideDist = r * (0.8 + pathRng() * 0.45);
        ctx.fillStyle = saumCol;
        ctx.beginPath();
        ctx.arc(pt.x + Math.cos(sideAngle) * sideDist, pt.y + Math.sin(sideAngle) * sideDist, 1.8 + pathRng() * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 2. Haupt-Gehfläche (feste, natürliche Trittschicht)
    for (let i = 0; i < densePoints.length; i++) {
      const pt = densePoints[i];
      const jitter = (pathRng() - 0.5) * 2.2;
      const r = baseRadiusPx * 0.95 + jitter;

      let pCol = p.pathColor;
      if (p.isHellPath) {
        if (pt.progress > 0.65) pCol = '#251b18';
        else if (pt.progress > 0.35) pCol = '#38251e';
      }

      ctx.fillStyle = pCol;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, Math.max(1, r), 0, Math.PI * 2);
      ctx.fill();

      if (bumpCtx) {
        bumpCtx.fillStyle = '#868686';
        bumpCtx.beginPath();
        bumpCtx.arc(pt.x, pt.y, Math.max(1, r), 0, Math.PI * 2);
        bumpCtx.fill();
      }
    }

    // 3. Zentrum (ausgetretene Spur mit feinem Kieselton)
    for (let i = 0; i < densePoints.length; i += 2) {
      const pt = densePoints[i];
      const r = baseRadiusPx * 0.52 + (pathRng() - 0.5) * 1.2;

      let cCol = p.centerColor;
      if (p.isHellPath) {
        if (pt.progress > 0.6) cCol = '#1f1614';
        else if (pt.progress > 0.35) cCol = '#452b21';
      }

      ctx.fillStyle = cCol;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, Math.max(0.8, r), 0, Math.PI * 2);
      ctx.fill();

      // Weg 5: Auf der hinteren Wegstrecke glühende Adern / Risse auf der Emissive-Map
      if (p.isHellPath && pt.progress > 0.45 && emissiveCtx) {
        const glowFactor = (pt.progress - 0.45) / 0.55;
        emissiveCtx.fillStyle = glowFactor > 0.6 ? 'rgba(215, 45, 0, 0.75)' : 'rgba(140, 20, 0, 0.45)';
        emissiveCtx.beginPath();
        emissiveCtx.arc(pt.x + (pathRng() - 0.5) * 3, pt.y + (pathRng() - 0.5) * 3, 2.0 * glowFactor, 0, Math.PI * 2);
        emissiveCtx.fill();
      }
    }
  }

  // =========================================================================
  // 6. FEINES RAUSCHEN (KIESEL, ERDKRÜMEL, GRASHALME) FÜR NAHANSICHTEN
  // =========================================================================
  const noiseRng = createRng(777);
  const imgData = ctx.getImageData(0, 0, size, size);
  const data = imgData.data;

  // Verteilt feines Kiesel- und Bodenrauschen
  for (let i = 0; i < data.length; i += 16) {
    const n = (noiseRng() - 0.5) * 16;
    data[i] = Math.max(0, Math.min(255, data[i] + n));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + n));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + n));
  }
  ctx.putImageData(imgData, 0, 0);

  // Texturen erzeugen und konfigurieren
  const map = new THREE.CanvasTexture(canvas);
  map.wrapS = THREE.ClampToEdgeWrapping;
  map.wrapT = THREE.ClampToEdgeWrapping;
  map.anisotropy = 4;
  map.needsUpdate = true;

  let emissiveMap: THREE.CanvasTexture | null = null;
  if (emissiveCtx) {
    emissiveMap = new THREE.CanvasTexture(emissiveCanvas);
    emissiveMap.wrapS = THREE.ClampToEdgeWrapping;
    emissiveMap.wrapT = THREE.ClampToEdgeWrapping;
    emissiveMap.anisotropy = 4;
    emissiveMap.needsUpdate = true;
  }

  let bumpMap: THREE.CanvasTexture | null = null;
  if (bumpCtx) {
    bumpMap = new THREE.CanvasTexture(bumpCanvas);
    bumpMap.wrapS = THREE.ClampToEdgeWrapping;
    bumpMap.wrapT = THREE.ClampToEdgeWrapping;
    bumpMap.anisotropy = 4;
    bumpMap.needsUpdate = true;
  }

  cachedTerrainTextures = { map, emissiveMap, bumpMap };

  return { map, emissiveMap, bumpMap };
}
