import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export type FlowerType =
  | 'anemone'        // Weißes Buschwindröschen
  | 'forget_me_not'  // Himmelblaues Wald-Vergissmeinnicht
  | 'bellflower'     // Violettblaue Wald-Glockenblume
  | 'buttercup'      // Sonnengelber Gold-Hahnenfuß
  | 'campion'        // Karminrosa Waldnelke
  | 'mixed';         // Bunter Waldwiesen-Blumenstrauß

export interface FlowerClusterOptions {
  x?: number;
  z?: number;
  type?: FlowerType;
  scale?: number;
  rotationY?: number;
}

export interface FlowerClusterEntity {
  group: THREE.Group;
}

/**
 * Geteilte Materialien für alle Waldblumen zur Schonung von Ressourcen und Draw Calls.
 */
export class FlowerMaterialCache {
  private static instance: FlowerMaterialCache;

  public readonly stemMat = new THREE.MeshStandardMaterial({
    color: 0x2e6128,
    roughness: 0.82,
    flatShading: true,
  });

  public readonly leafMat = new THREE.MeshStandardMaterial({
    color: 0x38732e,
    roughness: 0.8,
    flatShading: true,
  });

  public readonly anemoneMat = new THREE.MeshStandardMaterial({
    color: 0xfafafa, // Weißes Buschwindröschen
    roughness: 0.55,
    flatShading: true,
  });

  public readonly forgetMeNotMat = new THREE.MeshStandardMaterial({
    color: 0x4fa8eb, // Himmelblaues Vergissmeinnicht
    roughness: 0.55,
    flatShading: true,
  });

  public readonly bellflowerMat = new THREE.MeshStandardMaterial({
    color: 0x6c5ce7, // Violettblaue Glockenblume
    roughness: 0.58,
    flatShading: true,
  });

  public readonly buttercupMat = new THREE.MeshStandardMaterial({
    color: 0xffcc00, // Glänzendes Sonnengelb
    roughness: 0.45,
    flatShading: true,
  });

  public readonly campionMat = new THREE.MeshStandardMaterial({
    color: 0xe84393, // Karminrosa Waldnelke
    roughness: 0.55,
    flatShading: true,
  });

  public readonly centerYellowMat = new THREE.MeshStandardMaterial({
    color: 0xff9f1a, // Goldgelbe Staubgefäße
    roughness: 0.6,
  });

  public readonly centerWhiteMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.6,
  });

  private constructor() {}

  public static get(): FlowerMaterialCache {
    if (!FlowerMaterialCache.instance) {
      FlowerMaterialCache.instance = new FlowerMaterialCache();
    }
    return FlowerMaterialCache.instance;
  }
}

/**
 * Erzeugt alle Blumencluster entlang von Wegen als hocheffiziente,
 * nach Material verschmolzene Geometrien (reduziert über 7.000 Draw Calls auf genau 7).
 */
export function buildMergedFlowerClusters(spots: FlowerClusterOptions[]): THREE.Group {
  const mats = FlowerMaterialCache.get();
  const group = new THREE.Group();
  group.name = 'MergedFlowerClusters';

  const stemGeos: THREE.BufferGeometry[] = [];
  const anemoneGeos: THREE.BufferGeometry[] = [];
  const forgetGeos: THREE.BufferGeometry[] = [];
  const bellGeos: THREE.BufferGeometry[] = [];
  const buttercupGeos: THREE.BufferGeometry[] = [];
  const campionGeos: THREE.BufferGeometry[] = [];
  const centerYellowGeos: THREE.BufferGeometry[] = [];
  const centerWhiteGeos: THREE.BufferGeometry[] = [];

  const availableTypes: FlowerType[] = ['anemone', 'forget_me_not', 'bellflower', 'buttercup', 'campion'];

  const tempMatrix = new THREE.Matrix4();
  const tempPos = new THREE.Vector3();
  const tempEuler = new THREE.Euler();
  const tempQuat = new THREE.Quaternion();
  const tempScale = new THREE.Vector3();

  for (const spot of spots) {
    const sx = spot.x ?? 0;
    const sz = spot.z ?? 0;
    const sScale = spot.scale ?? 1.0;
    const sRotY = spot.rotationY ?? 0;
    const type = spot.type ?? 'mixed';

    // Kleines Moos-/Grasbett am Boden
    const baseGeom = new THREE.CircleGeometry(0.18 * sScale, 6);
    tempPos.set(sx, 0.005, sz);
    tempEuler.set(-Math.PI / 2, 0, sRotY);
    tempQuat.setFromEuler(tempEuler);
    tempScale.set(1, 1, 1);
    tempMatrix.compose(tempPos, tempQuat, tempScale);
    baseGeom.applyMatrix4(tempMatrix);
    stemGeos.push(baseGeom);

    const flowerCount = 5; // 5 dichte Einzelblumen pro Tuff
    for (let i = 0; i < flowerCount; i++) {
      const chosenType: FlowerType =
        type === 'mixed' ? availableTypes[i % availableTypes.length] : type;

      const angle = (i * Math.PI * 2) / flowerCount + Math.sin(i * 1.7) * 0.4;
      const radius = (0.04 + (i % 3) * 0.045) * sScale;

      const cosR = Math.cos(sRotY);
      const sinR = Math.sin(sRotY);
      const lfx = Math.sin(angle) * radius;
      const lfz = Math.cos(angle) * radius;
      const fx = sx + lfx * cosR - lfz * sinR;
      const fz = sz + lfx * sinR + lfz * cosR;

      const height = (0.14 + (i % 4) * 0.035) * sScale;
      const tiltX = Math.cos(angle) * 0.18 + (i % 2 === 0 ? 0.08 : -0.08);
      const tiltZ = Math.sin(angle) * 0.18 + (i % 3 === 0 ? 0.06 : -0.06);

      // Stängel
      const stemRadius = 0.007 * sScale;
      const stemGeom = new THREE.CylinderGeometry(stemRadius * 0.7, stemRadius, height, 4);
      tempPos.set(fx, height / 2, fz);
      tempEuler.set(tiltX, sRotY, tiltZ);
      tempQuat.setFromEuler(tempEuler);
      tempMatrix.compose(tempPos, tempQuat, tempScale);
      stemGeom.applyMatrix4(tempMatrix);
      stemGeos.push(stemGeom);

      // 2 kleine Blätter
      for (let l = 0; l < 2; l++) {
        const leafGeom = new THREE.ConeGeometry(0.02 * sScale, 0.08 * sScale, 4);
        const leafAngle = l * Math.PI + tiltX + sRotY;
        tempPos.set(fx + Math.sin(leafAngle) * 0.025 * sScale, 0.02 * sScale, fz + Math.cos(leafAngle) * 0.025 * sScale);
        tempEuler.set(0.5, leafAngle, 0.4);
        tempQuat.setFromEuler(tempEuler);
        tempMatrix.compose(tempPos, tempQuat, tempScale);
        leafGeom.applyMatrix4(tempMatrix);
        stemGeos.push(leafGeom);
      }

      // Blütenkopf an Stängelspitze
      const tipX = fx - Math.sin(tiltZ) * height;
      const tipZ = fz + Math.sin(tiltX) * height;
      const tipY = height * Math.cos(Math.hypot(tiltX, tiltZ));

      const fRadius = (chosenType === 'bellflower' ? 0.065 : 0.055) * sScale;

      if (chosenType === 'bellflower') {
        // Glockenblumen-Kelch
        const bellGeom = new THREE.ConeGeometry(fRadius * 0.55, fRadius * 1.1, 6, 1, true);
        bellGeom.rotateX(Math.PI);
        tempPos.set(tipX, tipY, tipZ);
        tempEuler.set(0.35 + tiltX, sRotY + tiltZ * 0.8, -0.2);
        tempQuat.setFromEuler(tempEuler);
        tempMatrix.compose(tempPos, tempQuat, tempScale);
        bellGeom.applyMatrix4(tempMatrix);
        bellGeos.push(bellGeom);

        // Staubfaden
        const stamenGeom = new THREE.CylinderGeometry(fRadius * 0.04, fRadius * 0.04, fRadius * 0.5, 3);
        tempPos.set(tipX, tipY - fRadius * 0.25, tipZ);
        tempEuler.set(0.35 + tiltX, sRotY, -0.2);
        tempQuat.setFromEuler(tempEuler);
        tempMatrix.compose(tempPos, tempQuat, tempScale);
        stamenGeom.applyMatrix4(tempMatrix);
        centerYellowGeos.push(stamenGeom);
      } else {
        // Stern-/Schalenblüte
        let targetPetalList = anemoneGeos;
        let isWhiteCenter = false;
        if (chosenType === 'forget_me_not') targetPetalList = forgetGeos;
        else if (chosenType === 'buttercup') targetPetalList = buttercupGeos;
        else if (chosenType === 'campion') {
          targetPetalList = campionGeos;
          isWhiteCenter = true;
        }

        // Zentrum
        const centerGeom = new THREE.SphereGeometry(fRadius * 0.26, 4, 4);
        tempPos.set(tipX, tipY, tipZ);
        tempEuler.set(tiltX * 0.6, sRotY, tiltZ * 0.6);
        tempQuat.setFromEuler(tempEuler);
        tempScale.set(1.0, 0.45, 1.0);
        tempMatrix.compose(tempPos, tempQuat, tempScale);
        centerGeom.applyMatrix4(tempMatrix);
        if (isWhiteCenter) {
          centerWhiteGeos.push(centerGeom);
        } else {
          centerYellowGeos.push(centerGeom);
        }
        tempScale.set(1, 1, 1);

        // 5 Blütenblätter
        const petalCount = 5;
        const petalGeom = new THREE.ConeGeometry(fRadius * 0.36, fRadius * 0.74, 4);
        petalGeom.rotateX(Math.PI / 2);
        for (let p = 0; p < petalCount; p++) {
          const pAngle = (p * Math.PI * 2) / petalCount + sRotY;
          const clonedPetal = petalGeom.clone();
          tempPos.set(
            tipX + Math.sin(pAngle) * fRadius * 0.45,
            tipY + 0.005,
            tipZ + Math.cos(pAngle) * fRadius * 0.45
          );
          tempEuler.set(0.18 + tiltX * 0.6, pAngle, tiltZ * 0.6);
          tempQuat.setFromEuler(tempEuler);
          tempScale.set(0.85, 0.3, 1.0);
          tempMatrix.compose(tempPos, tempQuat, tempScale);
          clonedPetal.applyMatrix4(tempMatrix);
          targetPetalList.push(clonedPetal);
        }
        petalGeom.dispose();
        tempScale.set(1, 1, 1);
      }
    }
  }

  // Hilfsfunktion zum Zusammenführen und Hinzufügen
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

  mergeAndAdd(stemGeos, mats.leafMat, 'MergedFlowerStems');
  mergeAndAdd(anemoneGeos, mats.anemoneMat, 'MergedFlowerAnemones');
  mergeAndAdd(forgetGeos, mats.forgetMeNotMat, 'MergedFlowerForgetMeNots');
  mergeAndAdd(bellGeos, mats.bellflowerMat, 'MergedFlowerBellflowers');
  mergeAndAdd(buttercupGeos, mats.buttercupMat, 'MergedFlowerButtercups');
  mergeAndAdd(campionGeos, mats.campionMat, 'MergedFlowerCampions');
  mergeAndAdd(centerYellowGeos, mats.centerYellowMat, 'MergedFlowerCentersYellow');
  mergeAndAdd(centerWhiteGeos, mats.centerWhiteMat, 'MergedFlowerCentersWhite');

  return group;
}

/**
 * Fallback für einzelne Cluster
 */
export function createFlowerCluster(options: FlowerClusterOptions = {}): FlowerClusterEntity {
  const group = buildMergedFlowerClusters([options]);
  return { group };
}
