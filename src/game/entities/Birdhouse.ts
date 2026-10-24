import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export interface BirdhouseInstance {
  x: number;
  y: number;
  z: number;
  rotationY: number;
  scale: number;
}

/**
 * Geteilte Materialien für alle Nistkästen zur Schonung von Speicher und Draw Calls.
 */
export class BirdhouseMaterialCache {
  private static instance: BirdhouseMaterialCache;

  // Helles, frisch gezimmertes Nadelholz (Fichte / Kiefer) hebt sich markant vom dunklen Stamm ab
  public readonly woodMat = new THREE.MeshLambertMaterial({
    color: 0xedd3a8,
    flatShading: true,
  });

  // Stilvolles, wetterfestes Schutzdach in sattem Waldgrün / Moosschiefer
  public readonly roofMat = new THREE.MeshLambertMaterial({
    color: 0x324636,
    flatShading: true,
  });

  public readonly holeMat = new THREE.MeshBasicMaterial({
    color: 0x14100c,
  });

  private constructor() {}

  public static get(): BirdhouseMaterialCache {
    if (!BirdhouseMaterialCache.instance) {
      BirdhouseMaterialCache.instance = new BirdhouseMaterialCache();
    }
    return BirdhouseMaterialCache.instance;
  }
}

/**
 * Erzeugt alle Nistkästen als genau 3 verschmolzene Meshes (Holz, Dach, Loch) für die gesamte Spielwelt.
 */
export function buildMergedBirdhouses(houses: BirdhouseInstance[]): THREE.Group {
  const mats = BirdhouseMaterialCache.get();
  const group = new THREE.Group();
  group.name = 'MergedBirdhouses';

  const woodGeos: THREE.BufferGeometry[] = [];
  const roofGeos: THREE.BufferGeometry[] = [];
  const holeGeos: THREE.BufferGeometry[] = [];

  const transformMatrix = new THREE.Matrix4();
  const tempPos = new THREE.Vector3();
  const tempEuler = new THREE.Euler();
  const tempQuat = new THREE.Quaternion();
  const tempScale = new THREE.Vector3(1, 1, 1);

  for (const h of houses) {
    const s = h.scale;

    const boxWidth = 0.22 * s;
    const boxHeight = 0.28 * s;
    const boxDepth = 0.19 * s;
    const perchLength = 0.065 * s;

    // Transformationsmatrix für diesen Nistkasten aufstellen
    tempPos.set(h.x, h.y, h.z);
    tempEuler.set(0, h.rotationY, 0);
    tempQuat.setFromEuler(tempEuler);
    transformMatrix.compose(tempPos, tempQuat, tempScale);

    // 1. Montageleiste: liegt flach an der Rinde an (z = 0 in lokalen Koordinaten)
    const mountGeom = new THREE.BoxGeometry(0.06 * s, 0.44 * s, 0.02 * s);
    mountGeom.translate(0, 0, 0.01 * s);
    mountGeom.applyMatrix4(transformMatrix);
    woodGeos.push(mountGeom);

    // 2. Kastenkorpus: erstreckt sich vom Stamm nach vorne (z = 0 bis boxDepth)
    const boxGeom = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    boxGeom.translate(0, 0, (boxDepth / 2) + 0.01 * s);
    boxGeom.applyMatrix4(transformMatrix);
    woodGeos.push(boxGeom);

    // 3. Sitzstange: ragt aus der Vorderseite heraus
    const perchGeom = new THREE.CylinderGeometry(0.008 * s, 0.008 * s, perchLength, 6);
    perchGeom.rotateX(Math.PI / 2);
    perchGeom.translate(0, 0.005 * s, boxDepth + 0.01 * s + perchLength / 2);
    perchGeom.applyMatrix4(transformMatrix);
    woodGeos.push(perchGeom);

    // 4. Schutzdach: über dem Kasten leicht nach vorne geneigt
    const roofWidth = 0.26 * s;
    const roofDepth = 0.24 * s;
    const roofThick = 0.03 * s;
    const roofGeom = new THREE.BoxGeometry(roofWidth, roofThick, roofDepth);
    roofGeom.rotateX(0.22);
    roofGeom.translate(0, boxHeight / 2 + 0.015 * s, (boxDepth / 2) + 0.01 * s);
    roofGeom.applyMatrix4(transformMatrix);
    roofGeos.push(roofGeom);

    // 5. Einflugloch: an der Vorderseite des Kastens
    const holeRadius = 0.032 * s;
    const holeGeom = new THREE.CylinderGeometry(holeRadius, holeRadius, 0.01 * s, 8);
    holeGeom.rotateX(Math.PI / 2);
    holeGeom.translate(0, 0.055 * s, boxDepth + 0.015 * s);
    holeGeom.applyMatrix4(transformMatrix);
    holeGeos.push(holeGeom);
  }

  const mergeAndAdd = (list: THREE.BufferGeometry[], mat: THREE.Material, name: string) => {
    if (list.length === 0) return;
    const merged = BufferGeometryUtils.mergeGeometries(list, false);
    for (const g of list) {
      g.dispose();
    }
    if (merged) {
      const mesh = new THREE.Mesh(merged, mat);
      mesh.name = name;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
    }
  };

  mergeAndAdd(woodGeos, mats.woodMat, 'MergedBirdhouseWood');
  mergeAndAdd(roofGeos, mats.roofMat, 'MergedBirdhouseRoofs');
  mergeAndAdd(holeGeos, mats.holeMat, 'MergedBirdhouseHoles');

  return group;
}

/**
 * Fallback für einzelne Nistkästen
 */
export function createBirdhouse(scale = 1.0): THREE.Group {
  return buildMergedBirdhouses([{ x: 0, y: 0, z: 0, rotationY: 0, scale }]);
}
