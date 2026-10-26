import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { getTerrainHeight } from '../utils/terrainHeight';

export type RockType = 'mossy_boulder' | 'rock_cluster' | 'flat_stone' | 'pebbles';
export type RockColorVariant = 'granite' | 'slate' | 'sandstone';

export interface ForestRockInstance {
  x: number;
  z: number;
  scale?: number;
  rotationY?: number;
  type?: RockType;
  colorVariant?: RockColorVariant;
}

/**
 * Erzeugt eine deformierte, facettierte Felsgeometrie mit organischen Bruchkanten.
 */
function createDeformedRockGeo(
  baseRadius: number,
  scaleX: number,
  scaleY: number,
  scaleZ: number,
  seed: number
): THREE.BufferGeometry {
  const geo = new THREE.DodecahedronGeometry(baseRadius, 1);
  const pos = geo.attributes.position;

  for (let i = 0; i < pos.count; i++) {
    const vx = pos.getX(i);
    const vy = pos.getY(i);
    const vz = pos.getZ(i);

    // Organische Verzerrung entlang der Achsen
    const jitter =
      1.0 +
      Math.sin(vx * 3.8 + seed * 2.1) * 0.09 +
      Math.cos(vz * 3.4 + vy * 2.5 + seed * 1.7) * 0.08;

    pos.setXYZ(i, vx * scaleX * jitter, vy * scaleY * jitter, vz * scaleZ * jitter);
  }

  geo.computeVertexNormals();
  return geo;
}

/**
 * Erzeugt eine sanft gewölbte Mooskappe für die Oberseite eines Felsens.
 */
function createMossCapGeo(
  baseRadius: number,
  scaleX: number,
  scaleY: number,
  scaleZ: number,
  seed: number
): THREE.BufferGeometry {
  // Eine obere Haube (Kugelkalotte), die passgenau auf der oberen Rundung aufliegt
  const geo = new THREE.SphereGeometry(
    baseRadius * 1.015,
    7,
    4,
    0,
    Math.PI * 2,
    0,
    Math.PI * 0.44
  );
  const pos = geo.attributes.position;

  for (let i = 0; i < pos.count; i++) {
    const vx = pos.getX(i);
    const vy = pos.getY(i);
    const vz = pos.getZ(i);

    // Leicht welliger Moosrand
    const rimWave = 1.0 + Math.sin(vx * 4.5 + vz * 4.0 + seed) * 0.06;
    pos.setXYZ(i, vx * scaleX * rimWave, vy * scaleY * rimWave, vz * scaleZ * rimWave);
  }

  geo.computeVertexNormals();
  return geo;
}

/**
 * Erzeugt einen Verbund aus atmosphärischen Felsen, Findlingen und Kieselgruppen
 * für die grünen Wald- und Wiesenflächen der 7Wege-Spielwelt:
 * - Grosse bemooste Granitfindlinge mit sattgrünen Mooskappen
 * - Malerische Felsgruppen aus mehreren aneinander gelehnten Steinen
 * - Flache, verwitterte Waldsteine (Trittplatten) im Moos
 * - Kleine, lockere Kieselsteinbett-Gruppen im Gras
 * - Zusammengeführt über BufferGeometryUtils.mergeGeometries zu minimalen Draw Calls
 */
export function buildMergedForestRocks(rocks: ForestRockInstance[]): THREE.Group {
  const group = new THREE.Group();
  group.name = 'MergedForestRocks';

  const graniteGeos: THREE.BufferGeometry[] = [];
  const slateGeos: THREE.BufferGeometry[] = [];
  const sandstoneGeos: THREE.BufferGeometry[] = [];
  const mossGeos: THREE.BufferGeometry[] = [];

  for (let idx = 0; idx < rocks.length; idx++) {
    const r = rocks[idx];
    const type = r.type ?? 'mossy_boulder';
    const variant = r.colorVariant ?? 'granite';
    const scale = r.scale ?? 1.0;
    const rotY = r.rotationY ?? (idx * 1.37) % (Math.PI * 2);
    const seed = idx * 3.17;

    const targetRockList =
      variant === 'slate'
        ? slateGeos
        : variant === 'sandstone'
        ? sandstoneGeos
        : graniteGeos;

    const groundY = getTerrainHeight(r.x, r.z);

    if (type === 'mossy_boulder') {
      // 1. Großer bemooster Findling
      const radius = 0.95 * scale;
      const sx = 1.18 + Math.sin(seed) * 0.12;
      const sy = 0.76 + Math.cos(seed * 2.3) * 0.08;
      const sz = 1.05 + Math.sin(seed * 4.1) * 0.1;

      const rockGeo = createDeformedRockGeo(radius, sx, sy, sz, seed);
      // Fels leicht ins Erdreich einsenken (y-Versatz), damit er natürlich ruht
      const sink = radius * sy * 0.28;
      const rockPosY = groundY + radius * sy * 0.72 - sink;

      rockGeo.rotateY(rotY);
      rockGeo.translate(r.x, rockPosY, r.z);
      targetRockList.push(rockGeo);

      // Mooskappe auf der Oberseite
      const mossGeo = createMossCapGeo(radius, sx * 0.98, sy * 0.98, sz * 0.98, seed);
      mossGeo.rotateY(rotY);
      mossGeo.translate(r.x, rockPosY + 0.03 * scale, r.z);
      mossGeos.push(mossGeo);

      // Kleiner Kiesel am Fuß des Findlings
      const pebbleRadius = 0.22 * scale;
      const pebbleGeo = createDeformedRockGeo(pebbleRadius, 1.2, 0.65, 0.9, seed + 1.2);
      const px = r.x + Math.cos(rotY + 1.1) * (radius * sx * 0.75);
      const pz = r.z + Math.sin(rotY + 1.1) * (radius * sz * 0.75);
      const pGroundY = getTerrainHeight(px, pz);
      pebbleGeo.rotateY(rotY + 0.8);
      pebbleGeo.translate(px, pGroundY + pebbleRadius * 0.35, pz);
      targetRockList.push(pebbleGeo);
    } else if (type === 'rock_cluster') {
      // 2. Felsengruppe (Hauptfels + 2 kleinere Begleitsteine)
      // Stein A (Hauptstein)
      const rA = 0.68 * scale;
      const sxA = 1.12;
      const syA = 0.82;
      const szA = 1.0;
      const geoA = createDeformedRockGeo(rA, sxA, syA, szA, seed);
      const sinkA = rA * syA * 0.24;
      const yA = groundY + rA * syA * 0.7 - sinkA;
      geoA.rotateY(rotY);
      geoA.translate(r.x, yA, r.z);
      targetRockList.push(geoA);

      // Moos auf Stein A
      const mossA = createMossCapGeo(rA, sxA * 0.95, syA * 0.95, szA * 0.95, seed);
      mossA.rotateY(rotY);
      mossA.translate(r.x, yA + 0.02 * scale, r.z);
      mossGeos.push(mossA);

      // Stein B (Begleitstein, leicht geneigt)
      const rB = 0.44 * scale;
      const offsetBx = Math.cos(rotY + 0.9) * 0.62 * scale;
      const offsetBz = Math.sin(rotY + 0.9) * 0.62 * scale;
      const xB = r.x + offsetBx;
      const zB = r.z + offsetBz;
      const yB = getTerrainHeight(xB, zB) + rB * 0.5;
      const geoB = createDeformedRockGeo(rB, 1.25, 0.7, 0.9, seed + 2.5);
      geoB.rotateZ(0.18);
      geoB.rotateY(rotY + 1.4);
      geoB.translate(xB, yB, zB);
      targetRockList.push(geoB);

      // Stein C (Kleiner Stein am Rand)
      const rC = 0.26 * scale;
      const offsetCx = Math.cos(rotY - 1.2) * 0.55 * scale;
      const offsetCz = Math.sin(rotY - 1.2) * 0.55 * scale;
      const xC = r.x + offsetCx;
      const zC = r.z + offsetCz;
      const yC = getTerrainHeight(xC, zC) + rC * 0.38;
      const geoC = createDeformedRockGeo(rC, 1.0, 0.6, 1.1, seed + 4.1);
      geoC.rotateY(rotY + 2.8);
      geoC.translate(xC, yC, zC);
      targetRockList.push(geoC);
    } else if (type === 'flat_stone') {
      // 3. Flacher Waldstein / Trittsteinplatte
      const rFlat = 0.58 * scale;
      const sx = 1.25 + Math.sin(seed * 3) * 0.15;
      const sy = 0.42; // Sehr flach
      const sz = 1.15 + Math.cos(seed * 2) * 0.1;
      const geo = createDeformedRockGeo(rFlat, sx, sy, sz, seed);
      const sink = rFlat * sy * 0.35;
      const posY = groundY + rFlat * sy * 0.5 - sink;
      geo.rotateY(rotY);
      geo.translate(r.x, posY, r.z);
      targetRockList.push(geo);

      // Flache Moosflechte oben
      const mossGeo = createMossCapGeo(rFlat, sx * 0.88, sy * 0.9, sz * 0.88, seed);
      mossGeo.rotateY(rotY);
      mossGeo.translate(r.x, posY + 0.015 * scale, r.z);
      mossGeos.push(mossGeo);
    } else if (type === 'pebbles') {
      // 4. Kieselgruppe (3 bis 4 kleine Steine beieinander)
      const pebbleConfigs = [
        { r: 0.22, dx: 0.0, dz: 0.0, rot: 0.2 },
        { r: 0.18, dx: 0.32, dz: 0.18, rot: 1.1 },
        { r: 0.14, dx: -0.25, dz: 0.22, rot: 2.3 },
        { r: 0.16, dx: 0.12, dz: -0.28, rot: 3.7 },
      ];

      for (let pIdx = 0; pIdx < pebbleConfigs.length; pIdx++) {
        const pConf = pebbleConfigs[pIdx];
        const pr = pConf.r * scale;
        const pSeed = seed + pIdx * 1.8;
        const px = r.x + (pConf.dx * Math.cos(rotY) - pConf.dz * Math.sin(rotY)) * scale;
        const pz = r.z + (pConf.dx * Math.sin(rotY) + pConf.dz * Math.cos(rotY)) * scale;
        const py = getTerrainHeight(px, pz) + pr * 0.32;

        const pGeo = createDeformedRockGeo(pr, 1.15, 0.65, 0.95, pSeed);
        pGeo.rotateY(rotY + pConf.rot);
        pGeo.translate(px, py, pz);
        targetRockList.push(pGeo);
      }
    }
  }

  // Materialien
  const graniteMat = new THREE.MeshStandardMaterial({
    color: 0x6e767c, // Natürliches Berggranitgrau
    roughness: 0.88,
    metalness: 0.06,
    flatShading: true,
  });

  const slateMat = new THREE.MeshStandardMaterial({
    color: 0x484e54, // Dunkler Schiefer / Basaltgestein
    roughness: 0.84,
    metalness: 0.10,
    flatShading: true,
  });

  const sandstoneMat = new THREE.MeshStandardMaterial({
    color: 0x827a6c, // Warmer verwitterter Sandstein
    roughness: 0.90,
    metalness: 0.04,
    flatShading: true,
  });

  const mossMat = new THREE.MeshStandardMaterial({
    color: 0x486634, // Frisches, sattes Waldmoosgrün
    roughness: 0.94,
    metalness: 0.02,
    flatShading: true,
  });

  // Zusammenführen und zur Gruppe hinzufügen
  if (graniteGeos.length > 0) {
    const merged = BufferGeometryUtils.mergeGeometries(graniteGeos, false);
    if (merged) {
      const mesh = new THREE.Mesh(merged, graniteMat);
      mesh.name = 'GraniteRocks';
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
    }
  }

  if (slateGeos.length > 0) {
    const merged = BufferGeometryUtils.mergeGeometries(slateGeos, false);
    if (merged) {
      const mesh = new THREE.Mesh(merged, slateMat);
      mesh.name = 'SlateRocks';
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
    }
  }

  if (sandstoneGeos.length > 0) {
    const merged = BufferGeometryUtils.mergeGeometries(sandstoneGeos, false);
    if (merged) {
      const mesh = new THREE.Mesh(merged, sandstoneMat);
      mesh.name = 'SandstoneRocks';
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
    }
  }

  if (mossGeos.length > 0) {
    const merged = BufferGeometryUtils.mergeGeometries(mossGeos, false);
    if (merged) {
      const mesh = new THREE.Mesh(merged, mossMat);
      mesh.name = 'RockMossCover';
      mesh.receiveShadow = true;
      group.add(mesh);
    }
  }

  return group;
}
