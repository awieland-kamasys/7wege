import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export type MushroomType = 'fly_agaric' | 'bolete' | 'chanterelle' | 'mixed';

export interface MushroomClusterOptions {
  x?: number;
  z?: number;
  type?: MushroomType;
  scale?: number;
  rotationY?: number;
}

export interface MushroomClusterEntity {
  group: THREE.Group;
}

/**
 * Geteilte Materialien für alle Waldpilze zur Schonung von Speicher und Draw Calls.
 */
export class MushroomMaterialCache {
  private static instance: MushroomMaterialCache;

  public readonly stemMat = new THREE.MeshStandardMaterial({
    color: 0xf0ebd8,
    roughness: 0.85,
    flatShading: true,
  });

  public readonly stemBoleteMat = new THREE.MeshStandardMaterial({
    color: 0xdfd3b8,
    roughness: 0.88,
    flatShading: true,
  });

  public readonly flyAgaricCapMat = new THREE.MeshStandardMaterial({
    color: 0xc82a24,
    roughness: 0.5,
    flatShading: true,
  });

  public readonly dotMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.6,
  });

  public readonly boleteCapMat = new THREE.MeshStandardMaterial({
    color: 0x543216,
    roughness: 0.65,
    flatShading: true,
  });

  public readonly boleteSpongeMat = new THREE.MeshStandardMaterial({
    color: 0xd9c88b,
    roughness: 0.9,
    flatShading: true,
  });

  public readonly chanterelleMat = new THREE.MeshStandardMaterial({
    color: 0xeda321,
    roughness: 0.7,
    flatShading: true,
  });

  public readonly mossMat = new THREE.MeshStandardMaterial({
    color: 0x2d4f25,
    roughness: 0.92,
    flatShading: true,
  });

  private constructor() {}

  public static get(): MushroomMaterialCache {
    if (!MushroomMaterialCache.instance) {
      MushroomMaterialCache.instance = new MushroomMaterialCache();
    }
    return MushroomMaterialCache.instance;
  }
}

/**
 * Bündelt alle Pilzgruppen in genau 6 nach Material zusammengefasste Meshes.
 */
export function buildMergedMushroomClusters(spots: MushroomClusterOptions[]): THREE.Group {
  const mats = MushroomMaterialCache.get();
  const group = new THREE.Group();
  group.name = 'MergedMushroomClusters';

  const stemGeos: THREE.BufferGeometry[] = [];
  const stemBoleteGeos: THREE.BufferGeometry[] = [];
  const flyCapGeos: THREE.BufferGeometry[] = [];
  const flyDotGeos: THREE.BufferGeometry[] = [];
  const boleteCapGeos: THREE.BufferGeometry[] = [];
  const boleteSpongeGeos: THREE.BufferGeometry[] = [];
  const chanterelleGeos: THREE.BufferGeometry[] = [];
  const mossGeos: THREE.BufferGeometry[] = [];

  const tempMatrix = new THREE.Matrix4();
  const tempPos = new THREE.Vector3();
  const tempEuler = new THREE.Euler();
  const tempQuat = new THREE.Quaternion();
  const tempScale = new THREE.Vector3(1, 1, 1);

  for (const spot of spots) {
    const sx = spot.x ?? 0;
    const sz = spot.z ?? 0;
    const baseScale = spot.scale ?? 1.0;
    const rotY = spot.rotationY ?? 0;
    const type = spot.type ?? 'fly_agaric';

    // Moospolster
    const mossGeom = new THREE.CylinderGeometry(0.24 * baseScale, 0.3 * baseScale, 0.02 * baseScale, 7);
    tempPos.set(sx, 0.01 * baseScale, sz);
    tempEuler.set(0, rotY, 0);
    tempQuat.setFromEuler(tempEuler);
    tempMatrix.compose(tempPos, tempQuat, tempScale);
    mossGeom.applyMatrix4(tempMatrix);
    mossGeos.push(mossGeom);

    const shroomConfigs = [
      { x: 0, z: 0, s: 1.0, rx: 0.04, rz: -0.06 },
      { x: 0.11 * baseScale, z: 0.06 * baseScale, s: 0.68, rx: 0.12, rz: 0.14 },
      { x: -0.09 * baseScale, z: 0.08 * baseScale, s: 0.52, rx: -0.08, rz: -0.16 },
    ];

    shroomConfigs.forEach((cfg, idx) => {
      let subType = type;
      if (type === 'mixed') {
        subType = idx === 0 ? 'bolete' : idx === 1 ? 'fly_agaric' : 'chanterelle';
      }

      const s = cfg.s * baseScale;
      const cosR = Math.cos(rotY);
      const sinR = Math.sin(rotY);
      const mx = sx + cfg.x * cosR - cfg.z * sinR;
      const mz = sz + cfg.x * sinR + cfg.z * cosR;

      if (subType === 'bolete') {
        // Stiel
        const stemGeom = new THREE.CylinderGeometry(0.055 * s, 0.085 * s, 0.26 * s, 6);
        tempPos.set(mx, 0.13 * s, mz);
        tempEuler.set(cfg.rx, rotY, cfg.rz);
        tempQuat.setFromEuler(tempEuler);
        tempMatrix.compose(tempPos, tempQuat, tempScale);
        stemGeom.applyMatrix4(tempMatrix);
        stemBoleteGeos.push(stemGeom);

        // Schwamm
        const spongeGeom = new THREE.CylinderGeometry(0.14 * s, 0.14 * s, 0.03 * s, 6);
        tempPos.set(mx, 0.25 * s, mz);
        tempMatrix.compose(tempPos, tempQuat, tempScale);
        spongeGeom.applyMatrix4(tempMatrix);
        boleteSpongeGeos.push(spongeGeom);

        // Kappe
        const capGeom = new THREE.SphereGeometry(0.155 * s, 7, 5, 0, Math.PI * 2, 0, Math.PI * 0.52);
        tempPos.set(mx, 0.26 * s, mz);
        tempMatrix.compose(tempPos, tempQuat, tempScale);
        capGeom.applyMatrix4(tempMatrix);
        boleteCapGeos.push(capGeom);
      } else if (subType === 'chanterelle') {
        // Pfifferling
        const stemGeom = new THREE.CylinderGeometry(0.095 * s, 0.032 * s, 0.22 * s, 6);
        tempPos.set(mx, 0.11 * s, mz);
        tempEuler.set(cfg.rx, rotY, cfg.rz);
        tempQuat.setFromEuler(tempEuler);
        tempMatrix.compose(tempPos, tempQuat, tempScale);
        stemGeom.applyMatrix4(tempMatrix);
        chanterelleGeos.push(stemGeom);

        const capGeom = new THREE.CylinderGeometry(0.13 * s, 0.085 * s, 0.05 * s, 6);
        tempPos.set(mx, 0.22 * s, mz);
        tempMatrix.compose(tempPos, tempQuat, tempScale);
        capGeom.applyMatrix4(tempMatrix);
        chanterelleGeos.push(capGeom);
      } else {
        // Fliegenpilz: Stiel
        const stemGeom = new THREE.CylinderGeometry(0.032 * s, 0.046 * s, 0.28 * s, 6);
        tempPos.set(mx, 0.14 * s, mz);
        tempEuler.set(cfg.rx, rotY, cfg.rz);
        tempQuat.setFromEuler(tempEuler);
        tempMatrix.compose(tempPos, tempQuat, tempScale);
        stemGeom.applyMatrix4(tempMatrix);
        stemGeos.push(stemGeom);

        // Kappe
        const capGeom = new THREE.SphereGeometry(0.14 * s, 7, 5, 0, Math.PI * 2, 0, Math.PI * 0.56);
        tempPos.set(mx, 0.26 * s, mz);
        tempScale.set(1.15, 0.95, 1.15);
        tempMatrix.compose(tempPos, tempQuat, tempScale);
        capGeom.applyMatrix4(tempMatrix);
        flyCapGeos.push(capGeom);
        tempScale.set(1, 1, 1);

        // Punkte
        const dotOffsets = [
          [0, 0.13 * s, 0],
          [0.08 * s, 0.09 * s, 0.04 * s],
          [-0.07 * s, 0.08 * s, 0.06 * s],
          [0.05 * s, 0.07 * s, -0.07 * s],
          [-0.06 * s, 0.09 * s, -0.05 * s],
        ];
        for (const [dx, dy, dz] of dotOffsets) {
          const dotGeom = new THREE.SphereGeometry(0.018 * s, 3, 3);
          tempPos.set(mx + dx, 0.26 * s + dy, mz + dz);
          tempMatrix.compose(tempPos, tempQuat, tempScale);
          dotGeom.applyMatrix4(tempMatrix);
          flyDotGeos.push(dotGeom);
        }
      }
    });
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
      mesh.receiveShadow = true;
      group.add(mesh);
    }
  };

  mergeAndAdd(stemGeos, mats.stemMat, 'MergedMushroomStems');
  mergeAndAdd(stemBoleteGeos, mats.stemBoleteMat, 'MergedMushroomBoleteStems');
  mergeAndAdd(flyCapGeos, mats.flyAgaricCapMat, 'MergedMushroomFlyCaps');
  mergeAndAdd(flyDotGeos, mats.dotMat, 'MergedMushroomDots');
  mergeAndAdd(boleteCapGeos, mats.boleteCapMat, 'MergedMushroomBoleteCaps');
  mergeAndAdd(boleteSpongeGeos, mats.boleteSpongeMat, 'MergedMushroomSponges');
  mergeAndAdd(chanterelleGeos, mats.chanterelleMat, 'MergedMushroomChanterelles');
  mergeAndAdd(mossGeos, mats.mossMat, 'MergedMushroomMoss');

  return group;
}

/**
 * Fallback für einzelne Cluster
 */
export function createMushroomCluster(options: MushroomClusterOptions = {}): MushroomClusterEntity {
  const group = buildMergedMushroomClusters([options]);
  return { group };
}
