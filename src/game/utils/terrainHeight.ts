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
  { x: CAVE_ENTRANCE_POS.x, z: CAVE_ENTRANCE_POS.z, radius: 7.5, blendRadius: 13.0, height: 3.5 },
  // 2. Waldteich mit Nixe (Weg 2): Idyllische Senke
  { x: POND_CENTER_POS.x, z: POND_CENTER_POS.z, radius: 8.5, blendRadius: 14.0, height: -1.2 },
  // 3. Wehrbrücke & Riese (Weg 3): Bachtal
  { x: WEIR_BRIDGE_POS.x, z: WEIR_BRIDGE_POS.z, radius: 7.2, blendRadius: 13.0, height: -1.5 },
  // 4. Holzfällerlager (Weg 4): Sanfte Waldhochebene
  { x: LUMBER_CAMP_POS.x, z: LUMBER_CAMP_POS.z, radius: 8.0, blendRadius: 14.0, height: 0.8 },
  // 5. Höllenschlund / Teufelskrater (Weg 5): Vulkankessel
  { x: HELL_CHASM_POS.x, z: HELL_CHASM_POS.z, radius: 10.0, blendRadius: 16.0, height: -2.0 },
  // 6. Jagdhütte (Weg 6): Sanfter Waldhang
  { x: HUNTING_LODGE_POS.x, z: HUNTING_LODGE_POS.z, radius: 8.0, blendRadius: 14.0, height: 1.0 },
  // 7. Verschlossenes Tor (Weg 7): Hügelkuppe
  { x: CLOSED_GATE_POS.x, z: CLOSED_GATE_POS.z, radius: 8.0, blendRadius: 14.0, height: 2.2 },
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
    { waypoints: PATH_1_WAYPOINTS, targetHeight: 3.5 },
    { waypoints: PATH_2_WAYPOINTS, targetHeight: -1.2 },
    { waypoints: PATH_3_WAYPOINTS, targetHeight: -1.5 },
    { waypoints: PATH_4_WAYPOINTS, targetHeight: 0.8 },
    { waypoints: PATH_5_WAYPOINTS, targetHeight: -2.0 },
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

  // Basis-Höhe aus sanftem Blend zwischen Pfad, Waldhügeln und Kreuzung
  const clearingBlend = smoothstep(8.2, 12.5, distFromCenter);
  const naturalBaseHeight = (bestPathHeight * bestPathWeight + hills * (1.0 - bestPathWeight)) * clearingBlend;

  // Wenn Plateau-Einfluss vorhanden ist, mit Plateau sanft überblenden
  if (plateauWeightSum > 0) {
    const pWeight = Math.min(1.0, plateauWeightSum);
    const avgPlateauH = plateauHeightSum / plateauWeightSum;
    return avgPlateauH * pWeight + naturalBaseHeight * (1.0 - pWeight);
  }

  return naturalBaseHeight;
}
