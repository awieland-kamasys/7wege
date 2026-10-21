import * as THREE from 'three';

export type FlowerType =
  | 'anemone'        // Weißes Buschwindröschen
  | 'forget_me_not'  // Himmelblaues Wald-Vergissmeinnicht
  | 'bellflower'     // Violettblaue Wald-Glockenblume
  | 'buttercup'      // Sonnengelber Gold-Hahnenfuß
  | 'campion'        // Karminrosa Waldnelke
  | 'mixed';         // Bunter Waldwiesen-Blumenstrauß

export interface FlowerClusterOptions {
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
class FlowerMaterialCache {
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
 * Erstellt eine einzelne 5-blättrige Stern- oder Schalenblüte.
 */
function createRadialFlowerHead(
  petalMat: THREE.Material,
  centerMat: THREE.Material,
  radius: number
): THREE.Group {
  const head = new THREE.Group();

  // Blütenboden / Mitte
  const centerGeom = new THREE.SphereGeometry(radius * 0.28, 6, 6);
  const centerMesh = new THREE.Mesh(centerGeom, centerMat);
  centerMesh.scale.set(1.0, 0.45, 1.0);
  head.add(centerMesh);

  // 5 Blütenblätter kreisförmig angeordnet
  const petalCount = 5;
  const petalGeom = new THREE.ConeGeometry(radius * 0.38, radius * 0.78, 5);
  petalGeom.rotateX(Math.PI / 2);

  for (let i = 0; i < petalCount; i++) {
    const angle = (i * Math.PI * 2) / petalCount;
    const petal = new THREE.Mesh(petalGeom, petalMat);
    petal.position.set(
      Math.sin(angle) * radius * 0.48,
      0.005,
      Math.cos(angle) * radius * 0.48
    );
    petal.rotation.y = angle;
    // Blütenblatt sanft nach oben wölben
    petal.rotation.x = 0.18;
    petal.scale.set(0.85, 0.3, 1.0);
    head.add(petal);
  }

  return head;
}

/**
 * Erstellt eine nach unten geneigte Glockenblume.
 */
function createBellFlowerHead(
  bellMat: THREE.Material,
  radius: number
): THREE.Group {
  const head = new THREE.Group();

  // Glockenkelch
  const bellGeom = new THREE.ConeGeometry(radius * 0.55, radius * 1.1, 7, 1, true);
  // Nach unten öffnen
  bellGeom.rotateX(Math.PI);
  const bellMesh = new THREE.Mesh(bellGeom, bellMat);
  head.add(bellMesh);

  // Kleines Staubblatt im Kelchinneren
  const stamenGeom = new THREE.CylinderGeometry(radius * 0.04, radius * 0.04, radius * 0.6, 4);
  const stamenMesh = new THREE.Mesh(stamenGeom, FlowerMaterialCache.get().centerYellowMat);
  stamenMesh.position.y = -radius * 0.35;
  head.add(stamenMesh);

  return head;
}

/**
 * Erzeugt einen einzelnen Blütenstängel mit Fußblättern und Blüte.
 */
function createSingleFlower(
  type: FlowerType,
  height: number,
  tiltX: number,
  tiltZ: number,
  mats: FlowerMaterialCache
): THREE.Group {
  const flower = new THREE.Group();

  // Zarter Stängel
  const stemRadius = 0.007;
  const stemGeom = new THREE.CylinderGeometry(stemRadius * 0.7, stemRadius, height, 5);
  const stemMesh = new THREE.Mesh(stemGeom, mats.stemMat);
  stemMesh.position.y = height / 2;
  stemMesh.rotation.set(tiltX, 0, tiltZ);
  flower.add(stemMesh);

  // Kleine bodennahe Lanzettblätter
  const leafCount = 2;
  for (let l = 0; l < leafCount; l++) {
    const leafGeom = new THREE.ConeGeometry(0.022, 0.09, 4);
    const leaf = new THREE.Mesh(leafGeom, mats.leafMat);
    const leafAngle = l * Math.PI + tiltX;
    leaf.position.set(Math.sin(leafAngle) * 0.03, 0.02, Math.cos(leafAngle) * 0.03);
    leaf.rotation.set(0.5, leafAngle, 0.4);
    flower.add(leaf);
  }

  // Blüte an der Spitze des geneigten Stängels
  const tipX = -Math.sin(tiltZ) * height;
  const tipZ = Math.sin(tiltX) * height;
  const tipY = height * Math.cos(Math.hypot(tiltX, tiltZ));

  let petalMat: THREE.Material = mats.anemoneMat;
  let centerMat: THREE.Material = mats.centerYellowMat;
  let isBell = false;

  switch (type) {
    case 'anemone':
      petalMat = mats.anemoneMat;
      centerMat = mats.centerYellowMat;
      break;
    case 'forget_me_not':
      petalMat = mats.forgetMeNotMat;
      centerMat = mats.centerYellowMat;
      break;
    case 'bellflower':
      petalMat = mats.bellflowerMat;
      isBell = true;
      break;
    case 'buttercup':
      petalMat = mats.buttercupMat;
      centerMat = mats.centerYellowMat;
      break;
    case 'campion':
      petalMat = mats.campionMat;
      centerMat = mats.centerWhiteMat;
      break;
  }

  const flowerHead = isBell
    ? createBellFlowerHead(petalMat, 0.065)
    : createRadialFlowerHead(petalMat, centerMat, 0.058);

  flowerHead.position.set(tipX, tipY, tipZ);
  if (!isBell) {
    flowerHead.rotation.set(tiltX * 0.6, Math.random() * Math.PI, tiltZ * 0.6);
  } else {
    // Glocke neigt sich sanft herab
    flowerHead.rotation.set(0.35 + tiltX, tiltZ * 0.8, -0.2);
  }
  flower.add(flowerHead);

  return flower;
}

/**
 * Erstellt ein natürliches, dichtes Waldblumen-Cluster (Tuff) aus mehreren Einzelblumen.
 */
export function createFlowerCluster(options: FlowerClusterOptions = {}): FlowerClusterEntity {
  const mats = FlowerMaterialCache.get();
  const group = new THREE.Group();
  group.name = 'FlowerCluster';

  const type = options.type ?? 'mixed';
  const scale = options.scale ?? 1.0;
  const rotationY = options.rotationY ?? 0;

  group.scale.set(scale, scale, scale);
  group.rotation.y = rotationY;

  // Kleines grünes Moos-/Grasbett an der Basis
  const baseGeom = new THREE.CircleGeometry(0.18, 7);
  const baseMesh = new THREE.Mesh(baseGeom, mats.leafMat);
  baseMesh.rotation.x = -Math.PI / 2;
  baseMesh.position.y = 0.005;
  group.add(baseMesh);

  // Liste der Blütentypen für diesen Tuff
  const availableTypes: FlowerType[] = ['anemone', 'forget_me_not', 'bellflower', 'buttercup', 'campion'];

  // 5 bis 8 Einzelblüten pro Cluster
  const flowerCount = 6;
  for (let i = 0; i < flowerCount; i++) {
    const chosenType: FlowerType =
      type === 'mixed'
        ? availableTypes[i % availableTypes.length]
        : type;

    const angle = (i * Math.PI * 2) / flowerCount + (Math.sin(i * 1.7) * 0.4);
    const radius = 0.04 + (i % 3) * 0.045;
    const fx = Math.sin(angle) * radius;
    const fz = Math.cos(angle) * radius;

    const height = 0.15 + (i % 4) * 0.035;
    const tiltX = (Math.cos(angle) * 0.18) + ((i % 2 === 0 ? 0.08 : -0.08));
    const tiltZ = (Math.sin(angle) * 0.18) + ((i % 3 === 0 ? 0.06 : -0.06));

    const singleFlower = createSingleFlower(chosenType, height, tiltX, tiltZ, mats);
    singleFlower.position.set(fx, 0, fz);
    group.add(singleFlower);
  }

  return { group };
}
