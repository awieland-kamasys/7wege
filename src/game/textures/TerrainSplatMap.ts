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
  PATH_5_FIRE_POS,
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

interface SoftPolylineOptions {
  maxWidthMeters: number;
  coreWidthMeters: number;
  steps?: number;
  startColor: { r: number; g: number; b: number };
  endColor: { r: number; g: number; b: number };
}

/**
 * Zeichnet einen kurvigen Pfad mit samtweichem, fließendem Auslauf zur Waldwiese hin.
 * Ersetzt harte Linienkanten durch 20 feinst abgestufte Schichten nach einer glatten
 * S-Kurve (Smoothstep) von 2% Minimal-Alpha am Saum bis 100% im festen Gehbereich.
 */
function drawSoftPolyline(
  ctx: CanvasRenderingContext2D,
  pxPts: Array<{ x: number; y: number }>,
  size: number,
  options: SoftPolylineOptions
): void {
  if (pxPts.length < 2) return;

  const steps = options.steps ?? 20;
  const maxW = (options.maxWidthMeters / 240) * size;
  const coreW = (options.coreWidthMeters / 240) * size;

  let prevTargetAlpha = 0;

  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1); // 0.0 = äußerster Saum, 1.0 = Geh-Kern
    const width = maxW - t * (maxW - coreW);

    // Sanfte S-Kurve für fließenden, stufenlosen Dichteübergang ohne Kanten
    const smoothT = t * t * (3 - 2 * t);
    const targetAlpha = 0.02 + 0.98 * smoothT;

    // Erforderliches inkrementelles Alpha für source-over Blending
    const stepAlpha = Math.min(
      1.0,
      Math.max(0.008, (targetAlpha - prevTargetAlpha) / Math.max(0.0001, 1.0 - prevTargetAlpha))
    );
    prevTargetAlpha = targetAlpha;

    const curR = Math.round(options.startColor.r + t * (options.endColor.r - options.startColor.r));
    const curG = Math.round(options.startColor.g + t * (options.endColor.g - options.startColor.g));
    const curB = Math.round(options.startColor.b + t * (options.endColor.b - options.startColor.b));

    ctx.strokeStyle = `rgba(${curR}, ${curG}, ${curB}, ${stepAlpha.toFixed(4)})`;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(pxPts[0].x, pxPts[0].y);
    for (let j = 1; j < pxPts.length; j++) {
      ctx.lineTo(pxPts[j].x, pxPts[j].y);
    }
    ctx.stroke();
  }
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

  const isMobile = typeof navigator !== 'undefined' && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  const size = isMobile ? 1024 : 2048;
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

  // 5. DIE WEGE ALS ZUSAMMENHÄNGENDE LINIENZÜGE
  // Weg 5 wird geteilt: Vor dem Feuerhindernis ist er ein normaler Waldweg (rot),
  // erst ab dem Feuerhindernis beginnt der dunkle Teufelsweg mit glühenden Adern!
  const path5BeforeFire: PathPoint2D[] = [
    PATH_5_WAYPOINTS[0],
    PATH_5_WAYPOINTS[1],
    { x: PATH_5_FIRE_POS.x, z: PATH_5_FIRE_POS.z },
  ];
  const path5AfterFire: PathPoint2D[] = [
    { x: PATH_5_FIRE_POS.x, z: PATH_5_FIRE_POS.z },
    PATH_5_WAYPOINTS[2],
    PATH_5_WAYPOINTS[3],
    PATH_5_WAYPOINTS[4],
    PATH_5_WAYPOINTS[5],
  ];

  // A) Weicher Brandübergang direkt am Feuerhindernis im Grün-Kanal
  const firePx = worldToPx(PATH_5_FIRE_POS.x, PATH_5_FIRE_POS.z, size);
  const fireGrad = ctx.createRadialGradient(
    firePx.x, firePx.y, (0.8 / 240) * size,
    firePx.x, firePx.y, (3.2 / 240) * size
  );
  fireGrad.addColorStop(0, 'rgba(0, 255, 0, 0.85)');
  fireGrad.addColorStop(1, 'rgba(0, 255, 0, 0.0)');
  ctx.fillStyle = fireGrad;
  ctx.beginPath();
  ctx.arc(firePx.x, firePx.y, (3.2 / 240) * size, 0, Math.PI * 2);
  ctx.fill();

  const normalPaths: readonly (readonly PathPoint2D[])[] = [
    PATH_1_WAYPOINTS,
    PATH_2_WAYPOINTS,
    PATH_3_WAYPOINTS,
    PATH_4_WAYPOINTS,
    path5BeforeFire,
    PATH_6_WAYPOINTS,
    PATH_7_WAYPOINTS,
  ];

  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Sanfter Gauß-Filter aktivieren, falls vom Browser unterstützt (verfeinert die 20 Stufen zu einem nahtlosen Gradienten)
  const canUseFilter = typeof (ctx as unknown as { filter?: unknown }).filter === 'string';
  if (canUseFilter) {
    const blurPx = Math.max(2, Math.round((0.45 / 240) * size));
    ctx.filter = `blur(${blurPx}px)`;
  }

  // 1. Normale Waldwege (reiner Rotkanal = Wiese zu Lehmkieselweg, 0% Lava)
  for (const wps of normalPaths) {
    const pxPts = wps.map((pt) => worldToPx(pt.x, pt.z, size));
    drawSoftPolyline(ctx, pxPts, size, {
      maxWidthMeters: 3.3,
      coreWidthMeters: 1.1,
      steps: 20,
      startColor: { r: 255, g: 0, b: 0 },
      endColor: { r: 255, g: 0, b: 0 },
    });
  }

  // 2. Teufelsweg ab dem Feuerhindernis bis zum Höllenschlund (mit Grünkanal = dunkler Obsidianpfad & Magma-Adern)
  const darkPxPts = path5AfterFire.map((pt) => worldToPx(pt.x, pt.z, size));
  if (darkPxPts.length >= 2) {
    drawSoftPolyline(ctx, darkPxPts, size, {
      maxWidthMeters: 3.4,
      coreWidthMeters: 1.15,
      steps: 20,
      startColor: { r: 255, g: 150, b: 0 },
      endColor: { r: 255, g: 255, b: 0 },
    });
  }

  if (canUseFilter) {
    ctx.filter = 'none';
  }

  // 3. ALPINE SCHNEEZONE AN DER BERGMINE & OBERER PFADABSCHNITT VON WEG 1 (BLAU-KANAL)
  // Mittels 'lighter' (additives Blending) wird der Blaukanal beigemischt, ohne Rot (Weg) oder Grün (Lava) zu beschädigen.
  ctx.globalCompositeOperation = 'lighter';

  // 3a. Bergmassiv & Minenvorplatz: Kompakte Schneedecke direkt am Felsplateau
  const cavePx = worldToPx(CAVE_ENTRANCE_POS.x, CAVE_ENTRANCE_POS.z, size);
  const snowInnerPx = (7.5 / 240) * size;
  const snowOuterPx = (17.5 / 240) * size;

  const mountainSnowGrad = ctx.createRadialGradient(
    cavePx.x,
    cavePx.y,
    snowInnerPx * 0.5,
    cavePx.x,
    cavePx.y,
    snowOuterPx
  );
  mountainSnowGrad.addColorStop(0.0, 'rgba(0, 0, 255, 1.0)');
  mountainSnowGrad.addColorStop(0.60, 'rgba(0, 0, 255, 0.95)');
  mountainSnowGrad.addColorStop(0.85, 'rgba(0, 0, 255, 0.50)');
  mountainSnowGrad.addColorStop(1.0, 'rgba(0, 0, 255, 0.0)');

  ctx.fillStyle = mountainSnowGrad;
  ctx.beginPath();
  ctx.arc(cavePx.x, cavePx.y, snowOuterPx, 0, Math.PI * 2);
  ctx.fill();

  // 3b. Fließender Übergang der Schneegrenze entlang von Weg 1 hinauf zur Mine
  // Beginnt erst im oberen Pfaddrittel ab z <= -28.0 m (Steilkurve), sodass der untere Waldweg sommerlich grün bleibt
  const path1UpperWps = PATH_1_WAYPOINTS.filter((wp) => wp.z <= -27.5);
  if (path1UpperWps.length >= 2) {
    const pxSnowPts = path1UpperWps.map((pt) => worldToPx(pt.x, pt.z, size));

    for (let i = 0; i < pxSnowPts.length - 1; i++) {
      const p0 = pxSnowPts[i];
      const p1 = pxSnowPts[i + 1];
      const wpZ = path1UpperWps[i].z;
      // Zarte Schneespuren ab z = -28m, geschlossener Schnee erst am Steilhang ab z < -38m
      const progress = Math.min(1.0, Math.max(0.15, (-wpZ - 27.5) / 16.0));
      const alpha = progress * 0.92;

      // 6-stufiger weicher Auslauf für die Schneedecke
      const snowLayers = 6;
      for (let s = 0; s < snowLayers; s++) {
        const st = s / (snowLayers - 1);
        const w = ((12.5 - st * 6.5) / 240) * size;
        const layerAlpha = alpha * (0.12 + 0.88 * (st * st));
        ctx.strokeStyle = `rgba(0, 0, 255, ${(layerAlpha / snowLayers).toFixed(3)})`;
        ctx.lineWidth = w;
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
      }
    }
  }

  // Zurücksetzen auf Standard-Komposition
  ctx.globalCompositeOperation = 'source-over';

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  cachedSplatTexture = texture;
  return texture;
}
