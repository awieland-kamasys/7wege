import * as THREE from 'three';

/**
 * Geteilte Materialien für alle Nistkästen zur Schonung von Speicher und Draw Calls.
 */
class BirdhouseMaterialCache {
  private static instance: BirdhouseMaterialCache;

  public readonly woodMat = new THREE.MeshStandardMaterial({
    color: 0x8a6541, // Warmes, leicht verwittertes Naturholz
    roughness: 0.88,
    metalness: 0.05,
    flatShading: true,
  });

  public readonly roofMat = new THREE.MeshStandardMaterial({
    color: 0x3d2c1d, // Dunkles, wetterfestes Holz-/Schieferdach
    roughness: 0.78,
    metalness: 0.1,
    flatShading: true,
  });

  public readonly holeMat = new THREE.MeshBasicMaterial({
    color: 0x110c08, // Dunkles Einflugloch mit Tiefenwirkung
  });

  public readonly perchMat = new THREE.MeshStandardMaterial({
    color: 0xa87d50, // Helleres Sitzhölzchen
    roughness: 0.75,
    metalness: 0.0,
  });

  public readonly bracketMat = new THREE.MeshStandardMaterial({
    color: 0x5a432b, // Holzleiste zur Befestigung am Stamm
    roughness: 0.9,
    metalness: 0.1,
    flatShading: true,
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
 * Erstellt einen detailreichen, liebevoll gestalteten Holz-Nistkasten (Meisenkasten)
 * mit Kastenkorpus, geneigtem Schrägdach, rundem Einflugloch, Sitzstange und Stamm-Montageleiste.
 *
 * @param scale Skalierung passend zur Baumgröße (Standard 1.0)
 * @returns THREE.Group mit dem vollständigen Nistkasten-Mesh
 */
export function createBirdhouse(scale = 1.0): THREE.Group {
  const mats = BirdhouseMaterialCache.get();
  const group = new THREE.Group();
  group.name = 'Birdhouse';

  const s = scale;

  // 1. Vertikale Montageleiste an der Rückseite (liegt flach am Stamm an)
  const mountGeom = new THREE.BoxGeometry(0.06 * s, 0.44 * s, 0.02 * s);
  const mountMesh = new THREE.Mesh(mountGeom, mats.bracketMat);
  mountMesh.position.set(0, 0, -0.01 * s);
  mountMesh.castShadow = true;
  group.add(mountMesh);

  // 2. Kasten-Hauptkorpus
  const boxWidth = 0.22 * s;
  const boxHeight = 0.28 * s;
  const boxDepth = 0.19 * s;
  const boxGeom = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  const boxMesh = new THREE.Mesh(boxGeom, mats.woodMat);
  boxMesh.position.set(0, 0, boxDepth / 2);
  boxMesh.castShadow = true;
  boxMesh.receiveShadow = true;
  group.add(boxMesh);

  // 3. Schrägdach (Pultdach) mit Überstand nach vorne und zu den Seiten
  const roofWidth = 0.26 * s;
  const roofDepth = 0.24 * s;
  const roofThick = 0.03 * s;
  const roofGeom = new THREE.BoxGeometry(roofWidth, roofThick, roofDepth);
  const roofMesh = new THREE.Mesh(roofGeom, mats.roofMat);
  // Dach leicht nach vorne neigen (Regenablauf)
  roofMesh.rotation.x = 0.22;
  roofMesh.position.set(0, boxHeight / 2 + 0.012 * s, boxDepth / 2 + 0.02 * s);
  roofMesh.castShadow = true;
  group.add(roofMesh);

  // 4. Einflugloch im oberen Drittel der Vorderfront
  const holeRadius = 0.032 * s;
  const holeGeom = new THREE.CylinderGeometry(holeRadius, holeRadius, 0.01 * s, 16);
  const holeMesh = new THREE.Mesh(holeGeom, mats.holeMat);
  holeMesh.rotation.x = Math.PI / 2;
  holeMesh.position.set(0, 0.055 * s, boxDepth + 0.005 * s);
  group.add(holeMesh);

  // 5. Sitzhölzchen direkt unter dem Einflugloch
  const perchRadius = 0.008 * s;
  const perchLength = 0.065 * s;
  const perchGeom = new THREE.CylinderGeometry(perchRadius, perchRadius, perchLength, 8);
  const perchMesh = new THREE.Mesh(perchGeom, mats.perchMat);
  perchMesh.rotation.x = Math.PI / 2;
  perchMesh.position.set(0, 0.005 * s, boxDepth + perchLength / 2);
  perchMesh.castShadow = true;
  group.add(perchMesh);

  return group;
}
