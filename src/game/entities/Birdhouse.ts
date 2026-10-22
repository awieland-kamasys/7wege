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

  public readonly woodMat = new THREE.MeshStandardMaterial({
    color: 0x8a6541,
    roughness: 0.88,
    metalness: 0.05,
    flatShading: true,
  });

  public readonly roofMat = new THREE.MeshStandardMaterial({
    color: 0x3d2c1d,
    roughness: 0.78,
    metalness: 0.1,
    flatShading: true,
  });

  public readonly holeMat = new THREE.MeshBasicMaterial({
    color: 0x110c08,
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

  const tempMatrix = new THREE.Matrix4();
  const tempPos = new THREE.Vector3();
  const tempEuler = new THREE.Euler();
  const tempQuat = new THREE.Quaternion();
  const tempScale = new THREE.Vector3(1, 1, 1);

  for (const h of houses) {
    const s = h.scale;
    const cosR = Math.cos(h.rotationY);
    const sinR = Math.sin(h.rotationY);

    const boxWidth = 0.22 * s;
    const boxHeight = 0.28 * s;
    const boxDepth = 0.19 * s;

    // 1. Montageleiste + Korpus + Sitzstange in WoodGeos sammeln
    const mountGeom = new THREE.BoxGeometry(0.06 * s, 0.44 * s, 0.02 * s);
    const mx = h.x + (0) * cosR - (-0.01 * s) * sinR;
    const mz = h.z + (0) * sinR + (-0.01 * s) * cosR;
    tempPos.set(mx, h.y, mz);
    tempEuler.set(0, h.rotationY, 0);
    tempQuat.setFromEuler(tempEuler);
    tempMatrix.compose(tempPos, tempQuat, tempScale);
    mountGeom.applyMatrix4(tempMatrix);
    woodGeos.push(mountGeom);

    const boxGeom = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const bx = h.x + (0) * cosR - (boxDepth / 2) * sinR;
    const bz = h.z + (0) * sinR + (boxDepth / 2) * cosR;
    tempPos.set(bx, h.y, bz);
    tempMatrix.compose(tempPos, tempQuat, tempScale);
    boxGeom.applyMatrix4(tempMatrix);
    woodGeos.push(boxGeom);

    const perchLength = 0.065 * s;
    const perchGeom = new THREE.CylinderGeometry(0.008 * s, 0.008 * s, perchLength, 6);
    perchGeom.rotateX(Math.PI / 2);
    const px = h.x + (0) * cosR - (boxDepth + perchLength / 2) * sinR;
    const pz = h.z + (0) * sinR + (boxDepth + perchLength / 2) * cosR;
    tempPos.set(px, h.y + 0.005 * s, pz);
    tempMatrix.compose(tempPos, tempQuat, tempScale);
    perchGeom.applyMatrix4(tempMatrix);
    woodGeos.push(perchGeom);

    // 2. Dach
    const roofWidth = 0.26 * s;
    const roofDepth = 0.24 * s;
    const roofThick = 0.03 * s;
    const roofGeom = new THREE.BoxGeometry(roofWidth, roofThick, roofDepth);
    roofGeom.rotateX(0.22);
    const rx = h.x + (0) * cosR - (boxDepth / 2 + 0.02 * s) * sinR;
    const rz = h.z + (0) * sinR + (boxDepth / 2 + 0.02 * s) * cosR;
    tempPos.set(rx, h.y + boxHeight / 2 + 0.012 * s, rz);
    tempMatrix.compose(tempPos, tempQuat, tempScale);
    roofGeom.applyMatrix4(tempMatrix);
    roofGeos.push(roofGeom);

    // 3. Einflugloch
    const holeRadius = 0.032 * s;
    const holeGeom = new THREE.CylinderGeometry(holeRadius, holeRadius, 0.01 * s, 8);
    holeGeom.rotateX(Math.PI / 2);
    const hx = h.x + (0) * cosR - (boxDepth + 0.005 * s) * sinR;
    const hz = h.z + (0) * sinR + (boxDepth + 0.005 * s) * cosR;
    tempPos.set(hx, h.y + 0.055 * s, hz);
    tempMatrix.compose(tempPos, tempQuat, tempScale);
    holeGeom.applyMatrix4(tempMatrix);
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
