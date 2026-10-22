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

let cachedSplatTexture: THREE.CanvasTexture | null = null;

function worldToPx(wx: number, wz: number, size: number): { x: number; y: number } {
  const x = ((wx + 120) / 240) * size;
  const y = ((wz + 120) / 240) * size;
  return { x, y };
}

/**
 * Erzeugt eine hochpräzise 2048x2048 Kontroll-Textur (Splatmap) zur perfekten Trennung
 * von gekachelter Waldwiese, Pfaden und Lavaboden:
 * - Rot-Kanal (R): 1.0 = Weg / Lichtungsplatz, 0.0 = Waldwiese, weiche Zwischenwerte = natürlicher Übergang
 * - Grün-Kanal (G): 1.0 = Tiefschwarzer Basalt / Obsidian um den Lavasee mit glühenden Adern
 */
export function createTerrainSplatMap(): THREE.CanvasTexture | null {
  if (cachedSplatTexture) {
    return cachedSplatTexture;
  }
  if (typeof document === 'undefined') {
    return null;
  }

  const size = 2048;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // 1. Grundfläche: Schwarz = 100% gekachelte, scharfe Waldwiese
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillRect(0, 0, size, size);

  // 2. LAVAKREIS IM GRÜN-KANAL (G = 1.0 für Lavaboden)
  const chasmPx = worldToPx(HELL_CHASM_POS.x, HELL_CHASM_POS.z, size);
  const lavaInnerPx = (15.5 / 240) * size;
  const lavaOuterPx = (24.0 / 240) * size;

  const lavaGrad = ctx.createRadialGradient(chasmPx.x, chasmPx.y, lavaInnerPx * 0.7, chasmPx.x, chasmPx.y, lavaOuterPx);
  lavaGrad.addColorStop(0, 'rgba(0, 255, 0, 1.0)');
  lavaGrad.addColorStop(0.7, 'rgba(0, 255, 0, 0.85)');
  lavaGrad.addColorStop(1.0, 'rgba(0, 255, 0, 0.0)');
  ctx.fillStyle = lavaGrad;
  ctx.beginPath();
  ctx.arc(chasmPx.x, chasmPx.y, lavaOuterPx, 0, Math.PI * 2);
  ctx.fill();

  // 3. ZENTRALE WALDKREUZUNG & HÜTTENPLATZ (R = 1.0)
  // Ein einziger, zusammenhängender, weicher Platz – OHNE überlappende Ringe vor der Hütte!
  const centerPx = worldToPx(0, 0, size);
  const clearingRadiusPx = (7.5 / 240) * size; // ca. 64 Pixel

  const clearingGrad = ctx.createRadialGradient(
    centerPx.x,
    centerPx.y,
    clearingRadiusPx * 0.65,
    centerPx.x,
    centerPx.y,
    clearingRadiusPx * 1.12
  );
  clearingGrad.addColorStop(0, 'rgba(255, 0, 0, 1.0)');
  clearingGrad.addColorStop(0.8, 'rgba(255, 0, 0, 0.9)');
  clearingGrad.addColorStop(1.0, 'rgba(255, 0, 0, 0.0)');
  ctx.fillStyle = clearingGrad;
  ctx.beginPath();
  ctx.arc(centerPx.x, centerPx.y, clearingRadiusPx * 1.12, 0, Math.PI * 2);
  ctx.fill();

  // Platz-Kern
  ctx.fillStyle = 'rgba(255, 0, 0, 1.0)';
  ctx.beginPath();
  ctx.arc(centerPx.x, centerPx.y, clearingRadiusPx * 0.75, 0, Math.PI * 2);
  ctx.fill();

  // 4. SCHAUPLATZ-PLÄTZE AN DEN WEGENDEN
  const endPoints: Array<{ x: number; z: number; radius: number }> = [
    { x: CAVE_ENTRANCE_POS.x, z: CAVE_ENTRANCE_POS.z, radius: 6.2 },
    { x: POND_CENTER_POS.x, z: POND_CENTER_POS.z, radius: 6.5 },
    { x: WEIR_BRIDGE_POS.x, z: WEIR_BRIDGE_POS.z, radius: 5.6 },
    { x: LUMBER_CAMP_POS.x, z: LUMBER_CAMP_POS.z, radius: 6.8 },
    { x: HUNTING_LODGE_POS.x, z: HUNTING_LODGE_POS.z, radius: 6.5 },
    { x: CLOSED_GATE_POS.x, z: CLOSED_GATE_POS.z, radius: 5.8 },
  ];

  for (const ep of endPoints) {
    const px = worldToPx(ep.x, ep.z, size);
    const radPx = (ep.radius / 240) * size;
    const epGrad = ctx.createRadialGradient(px.x, px.y, radPx * 0.5, px.x, px.y, radPx * 1.1);
    epGrad.addColorStop(0, 'rgba(255, 0, 0, 1.0)');
    epGrad.addColorStop(0.75, 'rgba(255, 0, 0, 0.7)');
    epGrad.addColorStop(1.0, 'rgba(255, 0, 0, 0.0)');
    ctx.fillStyle = epGrad;
    ctx.beginPath();
    ctx.arc(px.x, px.y, radPx * 1.1, 0, Math.PI * 2);
    ctx.fill();
  }

  // 5. DIE 7 WEGE ALS ZUSAMMENHÄNGENDE LINIENZÜGE (KEINE KRINGEL ODER OVALE!)
  const allPaths: readonly (readonly PathPoint2D[])[] = [
    PATH_1_WAYPOINTS,
    PATH_2_WAYPOINTS,
    PATH_3_WAYPOINTS,
    PATH_4_WAYPOINTS,
    PATH_5_WAYPOINTS,
    PATH_6_WAYPOINTS,
    PATH_7_WAYPOINTS,
  ];

  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  for (let pIdx = 0; pIdx < allPaths.length; pIdx++) {
    const wps = allPaths[pIdx];
    const isPath5 = pIdx === 4;

    const pxPts = wps.map((pt) => worldToPx(pt.x, pt.z, size));
    if (pxPts.length < 2) continue;

    // A) Weicher Außensaum (natürliche Verwachsung mit dem Gras)
    ctx.strokeStyle = isPath5 ? 'rgba(255, 160, 0, 0.45)' : 'rgba(255, 0, 0, 0.45)';
    ctx.lineWidth = ((2.7 / 240) * size); // ca. 23 Pixel
    ctx.beginPath();
    ctx.moveTo(pxPts[0].x, pxPts[0].y);
    for (let i = 1; i < pxPts.length; i++) {
      ctx.lineTo(pxPts[i].x, pxPts[i].y);
    }
    ctx.stroke();

    // B) Haupt-Gehfläche (feste, gleichmäßige Trittschicht)
    ctx.strokeStyle = isPath5 ? 'rgba(255, 200, 0, 0.85)' : 'rgba(255, 0, 0, 0.85)';
    ctx.lineWidth = ((1.85 / 240) * size); // ca. 16 Pixel
    ctx.beginPath();
    ctx.moveTo(pxPts[0].x, pxPts[0].y);
    for (let i = 1; i < pxPts.length; i++) {
      ctx.lineTo(pxPts[i].x, pxPts[i].y);
    }
    ctx.stroke();

    // C) Kern-Linie (ausgetretene Mitte)
    ctx.strokeStyle = isPath5 ? 'rgba(255, 255, 0, 1.0)' : 'rgba(255, 0, 0, 1.0)';
    ctx.lineWidth = ((1.1 / 240) * size); // ca. 9 Pixel
    ctx.beginPath();
    ctx.moveTo(pxPts[0].x, pxPts[0].y);
    for (let i = 1; i < pxPts.length; i++) {
      ctx.lineTo(pxPts[i].x, pxPts[i].y);
    }
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  cachedSplatTexture = texture;
  return texture;
}
