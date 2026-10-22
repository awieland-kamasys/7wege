import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { createBarkTexture, createTreeRingsTexture } from '../textures/GroundTextures';
import { getTerrainHeight } from '../utils/terrainHeight';

export interface TreeStumpInstance {
  x: number;
  z: number;
  scale?: number;
  height?: number;
  rotationY?: number;
  tiltAngle?: number;
  hasMushrooms?: boolean;
  hasAxe?: boolean;
  mossAmount?: number; // 0 bis 1
}

/**
 * Erzeugt einen Verbund detailreicher Baumstümpfe rund um die Holzfällerinsel:
 * - Realistische, konische Stämme mit tiefgefurchter Kiefernrinde
 * - Feine Jahresring-Schnittflächen auf den leicht geneigten Oberseiten
 * - Ausgeprägte Wurzelanläufe, die sich organisch ins Erdreich krallen
 * - Optionale Baumpilze (Polypores), Waldmoosauflagen und eine eingesteckte Holzfälleraxt
 * - Extrem performant über BufferGeometryUtils.mergeGeometries zusammengeführt (nur wenige Draw Calls)
 */
export function buildMergedTreeStumps(stumps: TreeStumpInstance[]): THREE.Group {
  const group = new THREE.Group();
  group.name = 'MergedTreeStumps';

  const barkGeos: THREE.BufferGeometry[] = [];
  const ringsGeos: THREE.BufferGeometry[] = [];
  const mossGeos: THREE.BufferGeometry[] = [];
  const mushroomGeos: THREE.BufferGeometry[] = [];
  const axeHandleGeos: THREE.BufferGeometry[] = [];
  const axeBladeGeos: THREE.BufferGeometry[] = [];

  for (const s of stumps) {
    const scale = s.scale ?? 1.0;
    const height = (s.height ?? 0.62) * scale;
    const topRadius = 0.32 * scale;
    const bottomRadius = 0.44 * scale;
    const rotY = s.rotationY ?? 0;
    const tilt = s.tiltAngle ?? 0.06;

    const groundY = getTerrainHeight(s.x, s.z);
    // 0.12m tiefer einsenken gegen Gelände-Schräglagen
    const rootBaseY = groundY - 0.12;
    const totalHeight = height + 0.12;

    // 1. Stamm-Zylinder (konisch, Rinde)
    const trunkGeo = new THREE.CylinderGeometry(
      topRadius,
      bottomRadius,
      totalHeight,
      12,
      2,
      true // Oben/Unten offen, Schnittfläche kommt separat
    );

    // Leicht unregelmäßige Stammkontur
    const posAttr = trunkGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const px = posAttr.getX(i);
      const pz = posAttr.getZ(i);
      const angle = Math.atan2(pz, px);
      // Rindenwölbungen
      const fluting = 1 + Math.sin(angle * 5) * 0.05 + Math.cos(angle * 3) * 0.04;
      posAttr.setX(i, px * fluting);
      posAttr.setZ(i, pz * fluting);
    }
    trunkGeo.computeVertexNormals();

    trunkGeo.translate(0, totalHeight / 2, 0);
    trunkGeo.rotateY(rotY);
    trunkGeo.rotateZ(tilt * Math.sin(rotY));
    trunkGeo.rotateX(tilt * Math.cos(rotY));
    trunkGeo.translate(s.x, rootBaseY, s.z);
    barkGeos.push(trunkGeo);

    // 2. Schnittfläche oben (Jahresringe)
    const ringsGeo = new THREE.CircleGeometry(topRadius * 0.99, 14);
    ringsGeo.rotateX(-Math.PI / 2);
    ringsGeo.translate(0, totalHeight, 0);
    ringsGeo.rotateY(rotY);
    ringsGeo.rotateZ(tilt * Math.sin(rotY));
    ringsGeo.rotateX(tilt * Math.cos(rotY));
    ringsGeo.translate(s.x, rootBaseY, s.z);
    ringsGeos.push(ringsGeo);

    // 3. Wurzelanläufe am Boden (3 bis 4 kräftige Wurzelstränge)
    const rootAngles = [0.4, 1.9, 3.6, 5.1];
    for (let rIdx = 0; rIdx < rootAngles.length; rIdx++) {
      const rAngle = rootAngles[rIdx] + rotY;
      const rootLength = 0.55 * scale;
      const rootGeo = new THREE.CylinderGeometry(
        0.08 * scale,
        0.18 * scale,
        rootLength,
        6
      );
      rootGeo.rotateZ(Math.PI / 3.2);
      rootGeo.rotateY(rAngle);
      rootGeo.translate(
        s.x + Math.cos(rAngle) * (bottomRadius + 0.18 * scale),
        rootBaseY + 0.12 * scale,
        s.z + Math.sin(rAngle) * (bottomRadius + 0.18 * scale)
      );
      barkGeos.push(rootGeo);
    }

    // 4. Moosbelag am Fuß oder an der Kante
    const mossAmt = s.mossAmount ?? 0.6;
    if (mossAmt > 0.2) {
      const mossGeo = new THREE.RingGeometry(
        topRadius * 0.72,
        topRadius * 1.02,
        10,
        1,
        0,
        Math.PI * (0.8 + mossAmt * 0.8)
      );
      mossGeo.rotateX(-Math.PI / 2);
      mossGeo.translate(0, totalHeight + 0.005, 0);
      mossGeo.rotateY(rotY + 0.5);
      mossGeo.rotateZ(tilt * Math.sin(rotY));
      mossGeo.rotateX(tilt * Math.cos(rotY));
      mossGeo.translate(s.x, rootBaseY, s.z);
      mossGeos.push(mossGeo);
    }

    // 5. Baumpilze (Polypores / Baumpilz-Konsolen an der Flanke)
    if (s.hasMushrooms) {
      for (let m = 0; m < 3; m++) {
        const mAngle = rotY + 1.2 + m * 0.35;
        const mHeight = (0.28 + m * 0.14) * scale;
        const mSize = (0.16 - m * 0.02) * scale;
        const polyGeo = new THREE.CylinderGeometry(
          mSize,
          mSize * 0.4,
          0.035 * scale,
          8,
          1,
          false,
          0,
          Math.PI
        );
        polyGeo.rotateY(mAngle + Math.PI / 2);
        polyGeo.translate(
          s.x + Math.cos(mAngle) * (topRadius * 0.98),
          rootBaseY + mHeight,
          s.z + Math.sin(mAngle) * (topRadius * 0.98)
        );
        mushroomGeos.push(polyGeo);
      }
    }

    // 6. Eingesteckte Holzfälleraxt
    if (s.hasAxe) {
      // Axtstiel aus Eschenholz
      const handleLength = 0.82 * scale;
      const handleGeo = new THREE.CylinderGeometry(
        0.022 * scale,
        0.028 * scale,
        handleLength,
        6
      );
      handleGeo.rotateZ(-Math.PI / 4.2);
      handleGeo.rotateY(rotY + 0.3);
      handleGeo.translate(
        s.x + 0.12 * scale,
        rootBaseY + totalHeight + 0.28 * scale,
        s.z + 0.05 * scale
      );
      axeHandleGeos.push(handleGeo);

      // Axtkopf aus geschmiedetem Eisen
      const headGeo = new THREE.BoxGeometry(
        0.04 * scale,
        0.16 * scale,
        0.22 * scale
      );
      headGeo.rotateZ(-Math.PI / 4.2);
      headGeo.rotateY(rotY + 0.3);
      headGeo.translate(
        s.x + 0.04 * scale,
        rootBaseY + totalHeight + 0.05 * scale,
        s.z + 0.02 * scale
      );
      axeBladeGeos.push(headGeo);
    }
  }

  // --- MATERIALIEN ---
  const barkTex = createBarkTexture();
  if (barkTex.map) barkTex.map.repeat.set(2.0, 2.0);
  if (barkTex.bumpMap) barkTex.bumpMap.repeat.set(2.0, 2.0);

  const barkMat = new THREE.MeshStandardMaterial({
    color: 0x6e4a30,
    map: barkTex.map ?? undefined,
    bumpMap: barkTex.bumpMap ?? undefined,
    bumpScale: 0.12,
    roughness: 0.88,
    metalness: 0.04,
  });

  const ringsTex = createTreeRingsTexture();
  const ringsMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: ringsTex.map ?? undefined,
    bumpMap: ringsTex.bumpMap ?? undefined,
    bumpScale: 0.08,
    roughness: 0.82,
    side: THREE.DoubleSide,
  });

  const mossMat = new THREE.MeshStandardMaterial({
    color: 0x4d7532,
    roughness: 0.92,
    side: THREE.DoubleSide,
  });

  const mushroomMat = new THREE.MeshStandardMaterial({
    color: 0xa87c4f,
    roughness: 0.72,
    flatShading: true,
  });

  const axeHandleMat = new THREE.MeshStandardMaterial({
    color: 0xd4a368,
    roughness: 0.65,
  });

  const axeBladeMat = new THREE.MeshStandardMaterial({
    color: 0x4a4d52,
    roughness: 0.35,
    metalness: 0.82,
  });

  // --- GEOMETRIEN ZUSAMMENFÜHREN ---
  if (barkGeos.length > 0) {
    const mergedBark = BufferGeometryUtils.mergeGeometries(barkGeos, false);
    const barkMesh = new THREE.Mesh(mergedBark, barkMat);
    barkMesh.castShadow = true;
    barkMesh.receiveShadow = true;
    group.add(barkMesh);
  }

  if (ringsGeos.length > 0) {
    const mergedRings = BufferGeometryUtils.mergeGeometries(ringsGeos, false);
    const ringsMesh = new THREE.Mesh(mergedRings, ringsMat);
    ringsMesh.castShadow = true;
    ringsMesh.receiveShadow = true;
    group.add(ringsMesh);
  }

  if (mossGeos.length > 0) {
    const mergedMoss = BufferGeometryUtils.mergeGeometries(mossGeos, false);
    const mossMesh = new THREE.Mesh(mergedMoss, mossMat);
    mossMesh.receiveShadow = true;
    group.add(mossMesh);
  }

  if (mushroomGeos.length > 0) {
    const mergedMushrooms = BufferGeometryUtils.mergeGeometries(mushroomGeos, false);
    const mushroomMesh = new THREE.Mesh(mergedMushrooms, mushroomMat);
    mushroomMesh.castShadow = true;
    group.add(mushroomMesh);
  }

  if (axeHandleGeos.length > 0) {
    const mergedAxeHandle = BufferGeometryUtils.mergeGeometries(axeHandleGeos, false);
    const handleMesh = new THREE.Mesh(mergedAxeHandle, axeHandleMat);
    handleMesh.castShadow = true;
    group.add(handleMesh);
  }

  if (axeBladeGeos.length > 0) {
    const mergedAxeBlade = BufferGeometryUtils.mergeGeometries(axeBladeGeos, false);
    const bladeMesh = new THREE.Mesh(mergedAxeBlade, axeBladeMat);
    bladeMesh.castShadow = true;
    group.add(bladeMesh);
  }

  return group;
}
