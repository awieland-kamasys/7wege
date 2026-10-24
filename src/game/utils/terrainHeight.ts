import {
  CAVE_ENTRANCE_POS,
  CLOSED_GATE_POS,
  HELL_CHASM_POS,
  HUNTING_LODGE_POS,
  LUMBER_CAMP_POS,
  POND_CENTER_POS,
  WEIR_BRIDGE_POS,
  WORLD_TREE_POS,
  GIANT_WORLD_TREE_POS,
  GIANT_RIGHT_WORLD_TREE_POS,
  HOLLOW_TREE_POS,
  PATH_1_WAYPOINTS,
  PATH_2_WAYPOINTS,
  PATH_3_WAYPOINTS,
  PATH_4_WAYPOINTS,
  PATH_5_WAYPOINTS,
  PATH_6_WAYPOINTS,
  PATH_7_WAYPOINTS,
} from '../data/paths';

export interface PlateauDefinition {
  x: number;
  z: number;
  radius: number;
  blendRadius: number;
  height: number;
}

/**
 * Schauplatz-Plateaus: Bereiche um die Schauplätze und die zentrale Kreuzung,
 * in denen das Gelände auf eine feste Höhe eingeebnet ist, damit Gebäude und NPCs
 * eben und stabil stehen.
 */
export const TERRAIN_PLATEAUS: PlateauDefinition[] = [
  // 0. Zentrale Lichtung / Kreuzung
  { x: 0, z: 0, radius: 8.2, blendRadius: 13.0, height: 0.0 },
  // 1. Bergmassiv & Höhleneingang (Weg 1): Hoch am Berg
  { x: CAVE_ENTRANCE_POS.x, z: CAVE_ENTRANCE_POS.z, radius: 7.5, blendRadius: 14.5, height: 6.8 },
  // 2. Waldteich mit Nixe (Weg 2): Idyllische Senke
  { x: POND_CENTER_POS.x, z: POND_CENTER_POS.z, radius: 8.5, blendRadius: 14.0, height: -1.2 },
  // 3. Wehrbrücke & Riese (Weg 3): Bachtal
  { x: WEIR_BRIDGE_POS.x, z: WEIR_BRIDGE_POS.z, radius: 7.2, blendRadius: 13.0, height: -1.5 },
  // 4. Holzfällerlager (Weg 4): Sanfte Waldhochebene
  { x: LUMBER_CAMP_POS.x, z: LUMBER_CAMP_POS.z, radius: 8.0, blendRadius: 14.0, height: 0.8 },
  // 5. Höllenschlund / Teufelskrater (Weg 5): Tiefer Vulkankessel
  { x: HELL_CHASM_POS.x, z: HELL_CHASM_POS.z, radius: 10.0, blendRadius: 17.5, height: -5.0 },
  // 6. Jagdhütte (Weg 6): Sanfter Waldhang
  { x: HUNTING_LODGE_POS.x, z: HUNTING_LODGE_POS.z, radius: 8.0, blendRadius: 14.0, height: 1.0 },
  // 7. Verschlossenes Tor (Weg 7): Hügelkuppe
  { x: CLOSED_GATE_POS.x, z: CLOSED_GATE_POS.z, radius: 8.0, blendRadius: 14.0, height: 2.2 },
  // 8. Stilisierter Höhlenbaum am linken Ende des Baches: Ausgedehntes, ebenes Bodenplateau (-0.30m)
  { x: WORLD_TREE_POS.x, z: WORLD_TREE_POS.z, radius: 6.5, blendRadius: 12.5, height: -0.3 },
  // 9. Zweiter Weltenbaum im Waldsaum ca. 10m hinter dem Riesen (Weg 3): Bündig am Vorplatz (-1.50m)
  { x: GIANT_WORLD_TREE_POS.x, z: GIANT_WORLD_TREE_POS.z, radius: 5.5, blendRadius: 12.0, height: -1.5 },
  // 10. Dritter Weltenbaum rechts neben dem Baum hinter dem Riesen (Weg 3): Bündig am Vorplatz (-1.50m)
  { x: GIANT_RIGHT_WORLD_TREE_POS.x, z: GIANT_RIGHT_WORLD_TREE_POS.z, radius: 5.5, blendRadius: 12.0, height: -1.5 },
  // 11. Magischer Baum weiter rechts im Riesenteich: Bündig und eben am Seegrund (-1.50m)
  { x: HOLLOW_TREE_POS.x, z: HOLLOW_TREE_POS.z, radius: 4.5, blendRadius: 9.8, height: -1.5 },
];

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/**
 * Ermittelt die Höhe entlang eines Pfades basierend auf der Entfernung zum Pfadverlauf.
 */
function getPathInterpolatedHeight(
  x: number,
  z: number,
  waypoints: readonly { x: number; z: number }[],
  targetHeight: number
): { height: number; weight: number } {
  let minDist = Infinity;
  let bestProgress = 0;

  let totalLength = 0;
  const segLengths: number[] = [];
  for (let i = 0; i < waypoints.length - 1; i++) {
    const l = Math.hypot(waypoints[i + 1].x - waypoints[i].x, waypoints[i + 1].z - waypoints[i].z);
    segLengths.push(l);
    totalLength += l;
  }

  let accumulated = 0;
  for (let i = 0; i < waypoints.length - 1; i++) {
    const a = waypoints[i];
    const b = waypoints[i + 1];
    const abx = b.x - a.x;
    const abz = b.z - a.z;
    const segLen = segLengths[i];
    if (segLen < 0.001) continue;

    const t = Math.max(0, Math.min(1, ((x - a.x) * abx + (z - a.z) * abz) / (segLen * segLen)));
    const cx = a.x + t * abx;
    const cz = a.z + t * abz;
    const dist = Math.hypot(x - cx, z - cz);

    if (dist < minDist) {
      minDist = dist;
      bestProgress = (accumulated + t * segLen) / totalLength;
    }
    accumulated += segLen;
  }

  // Pfad-Höhengradient: von 0 (Kreuzungsrand) sanft auf targetHeight
  const pathH = smoothstep(0.12, 0.95, bestProgress) * targetHeight;
  // Einflussbereich: Bis 3.5m voll, bis 7m sanfter Übergang zum Wald
  const weight = 1.0 - smoothstep(2.5, 7.5, minDist);

  return { height: pathH, weight };
}

/**
 * Berechnet die exakte Höhe des Geländes y für jeden beliebigen Punkt (x, z).
 * - Lichtung: eben auf y = 0.
 * - Pfade: stetig steigend oder fallend zu ihrem Schauplatz.
 * - Schauplätze: ebene Plateaus auf ihrer Zielhöhe.
 * - Wald: organisch modellierte sanfte Hügel.
 */
export function getTerrainHeight(x: number, z: number): number {
  const distFromCenter = Math.hypot(x, z);

  // 1. Zentrale Lichtung: absolut eben
  if (distFromCenter <= 8.2) {
    return 0.0;
  }

  // 2. Plateau-Einflüsse prüfen
  let plateauWeightSum = 0;
  let plateauHeightSum = 0;

  for (const p of TERRAIN_PLATEAUS) {
    const dist = Math.hypot(x - p.x, z - p.z);
    if (dist <= p.radius) {
      return p.height;
    }
    if (dist < p.blendRadius) {
      const w = 1.0 - smoothstep(p.radius, p.blendRadius, dist);
      plateauWeightSum += w;
      plateauHeightSum += p.height * w;
    }
  }

  // 3. Pfad-Höhenkorridore prüfen
  const pathProfiles = [
    { waypoints: PATH_1_WAYPOINTS, targetHeight: 6.8 },
    { waypoints: PATH_2_WAYPOINTS, targetHeight: -1.2 },
    { waypoints: PATH_3_WAYPOINTS, targetHeight: -1.5 },
    { waypoints: PATH_4_WAYPOINTS, targetHeight: 0.8 },
    { waypoints: PATH_5_WAYPOINTS, targetHeight: -5.0 },
    { waypoints: PATH_6_WAYPOINTS, targetHeight: 1.0 },
    { waypoints: PATH_7_WAYPOINTS, targetHeight: 2.2 },
  ];

  let bestPathHeight = 0;
  let bestPathWeight = 0;

  for (const prof of pathProfiles) {
    const res = getPathInterpolatedHeight(x, z, prof.waypoints, prof.targetHeight);
    if (res.weight > bestPathWeight) {
      bestPathWeight = res.weight;
      bestPathHeight = res.height;
    }
  }

  // 4. Natürliche organische Waldhügel im Hintergrund
  const hills =
    0.35 * Math.sin(x * 0.065 + 0.4) * Math.cos(z * 0.065 - 0.3) +
    0.18 * Math.sin(x * 0.12 - z * 0.09) +
    0.10 * Math.cos(x * 0.04 + z * 0.05);

  // Gewaltiger Gebirgskamm hinter der Mine (Silberstollen) im Nordosten
  let mountainBackdrop = 0;
  if (z < -47.8 && Math.abs(x - CAVE_ENTRANCE_POS.x) < 32.0) {
    const depthBehindCave = -47.8 - z;
    const lateralWeight = 1.0 - smoothstep(12.0, 32.0, Math.abs(x - CAVE_ENTRANCE_POS.x));
    mountainBackdrop = smoothstep(1.5, 26.0, depthBehindCave) * 7.5 * lateralWeight;
  }

  // Basis-Höhe aus sanftem Blend zwischen Pfad, Waldhügeln und Kreuzung
  const clearingBlend = smoothstep(8.2, 12.5, distFromCenter);
  const naturalBaseHeight = (bestPathHeight * bestPathWeight + hills * (1.0 - bestPathWeight)) * clearingBlend + mountainBackdrop;

  // 5. Seetal (Riesenteich) und Flusstal des Gebirgsbachs entlang der Wehrbrücken-Achse:
  // - Oberstrom / See rechts der Brücke (lx von -1.0 bis -19.0): ebenes Seebecken auf -1.50m
  // - Unterstrom / Gebirgsbach links der Brücke (lx von -2.5 bis +29.5): Bachtal auf -1.50m
  const dxBridge = x - WEIR_BRIDGE_POS.x;
  const dzBridge = z - WEIR_BRIDGE_POS.z;
  const cosBridge = Math.cos(WEIR_BRIDGE_POS.rotationY);
  const sinBridge = Math.sin(WEIR_BRIDGE_POS.rotationY);
  const streamLx = dxBridge * cosBridge - dzBridge * sinBridge;
  const streamLz = dxBridge * sinBridge + dzBridge * cosBridge;

  let streamValleyWeight = 0;
  if (streamLx >= -2.5 && streamLx <= 29.5 && Math.abs(streamLz) < 4.2) {
    const wAcross = 1.0 - smoothstep(1.45, 4.2, Math.abs(streamLz));
    const wAlong = 1.0 - smoothstep(25.0, 29.5, streamLx);
    streamValleyWeight = wAcross * wAlong;
  } else if (streamLx >= -19.0 && streamLx < -1.0 && Math.abs(streamLz) < 6.5) {
    const wAcrossLake = 1.0 - smoothstep(3.8, 6.5, Math.abs(streamLz));
    const wAlongLake = 1.0 - smoothstep(15.5, 19.0, Math.abs(streamLx));
    streamValleyWeight = wAcrossLake * wAlongLake;
  }

  let terrainHeightResult = naturalBaseHeight;
  // Wenn Plateau-Einfluss vorhanden ist, mit Plateau sanft überblenden
  if (plateauWeightSum > 0) {
    const pWeight = Math.min(1.0, plateauWeightSum);
    const avgPlateauH = plateauHeightSum / plateauWeightSum;
    terrainHeightResult = avgPlateauH * pWeight + naturalBaseHeight * (1.0 - pWeight);
  }

  // Flusstal-Einfluss überblenden (schneidet das Bachtal auf -1.50m sanft ein)
  if (streamValleyWeight > 0) {
    const riverBedHeight = -1.5;
    terrainHeightResult = riverBedHeight * streamValleyWeight + terrainHeightResult * (1.0 - streamValleyWeight);
  }

  return terrainHeightResult;
}
