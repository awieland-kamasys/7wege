import * as THREE from 'three';

export type MushroomType = 'fly_agaric' | 'bolete' | 'chanterelle' | 'mixed';

export interface MushroomClusterOptions {
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
class MushroomMaterialCache {
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
    color: 0x294322,
    roughness: 0.95,
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
 * Erstellt einen einzelnen Fliegenpilz mit roter Kappe und weißen Tupfen.
 */
function createSingleFlyAgaric(scale: number, mats: MushroomMaterialCache): THREE.Group {
  const shroom = new THREE.Group();

  // Stiel mit leichter Manschette
  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035 * scale, 0.055 * scale, 0.28 * scale, 7),
    mats.stemMat
  );
  stem.position.y = 0.14 * scale;
  stem.castShadow = true;
  shroom.add(stem);

  // Weiße Stiel-Manschette
  const collar = new THREE.Mesh(
    new THREE.TorusGeometry(0.045 * scale, 0.012 * scale, 4, 8),
    mats.stemMat
  );
  collar.position.y = 0.21 * scale;
  collar.rotation.x = Math.PI / 2;
  shroom.add(collar);

  // Gewölbte rote Kappe
  const cap = new THREE.Mesh(
    new THREE.SphereGeometry(0.14 * scale, 8, 7, 0, Math.PI * 2, 0, Math.PI * 0.56),
    mats.flyAgaricCapMat
  );
  cap.position.y = 0.26 * scale;
  cap.scale.set(1.15, 0.95, 1.15);
  cap.castShadow = true;
  shroom.add(cap);

  // Typische weiße Tupfen auf der Kappe
  const dotOffsets: [number, number, number][] = [
    [0, 0.13 * scale, 0],
    [0.08 * scale, 0.09 * scale, 0.04 * scale],
    [-0.07 * scale, 0.08 * scale, 0.06 * scale],
    [0.05 * scale, 0.07 * scale, -0.07 * scale],
    [-0.06 * scale, 0.09 * scale, -0.05 * scale],
  ];

  for (const [dx, dy, dz] of dotOffsets) {
    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(0.018 * scale, 4, 4),
      mats.dotMat
    );
    dot.position.set(dx, 0.26 * scale + dy, dz);
    shroom.add(dot);
  }

  return shroom;
}

/**
 * Erstellt einen einzelnen Steinpilz (Braunkappe) mit bauchigem Stiel.
 */
function createSingleBolete(scale: number, mats: MushroomMaterialCache): THREE.Group {
  const shroom = new THREE.Group();

  // Bauchiger, kräftiger Stiel
  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.055 * scale, 0.085 * scale, 0.26 * scale, 8),
    mats.stemBoleteMat
  );
  stem.position.y = 0.13 * scale;
  stem.castShadow = true;
  shroom.add(stem);

  // Hellbraune / gelbliche Schwammunterseite
  const sponge = new THREE.Mesh(
    new THREE.CylinderGeometry(0.14 * scale, 0.14 * scale, 0.03 * scale, 8),
    mats.boleteSpongeMat
  );
  sponge.position.y = 0.25 * scale;
  shroom.add(sponge);

  // Kastanienbrauner, rundlicher Hut
  const cap = new THREE.Mesh(
    new THREE.SphereGeometry(0.155 * scale, 8, 7, 0, Math.PI * 2, 0, Math.PI * 0.52),
    mats.boleteCapMat
  );
  cap.position.y = 0.26 * scale;
  cap.scale.set(1.1, 0.82, 1.1);
  cap.castShadow = true;
  shroom.add(cap);

  return shroom;
}

/**
 * Erstellt einen einzelnen Pfifferling mit trichterförmigem Hut.
 */
function createSingleChanterelle(scale: number, mats: MushroomMaterialCache): THREE.Group {
  const shroom = new THREE.Group();

  // Nach oben sich verbreiternder Stiel
  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045 * scale, 0.025 * scale, 0.22 * scale, 7),
    mats.chanterelleMat
  );
  stem.position.y = 0.11 * scale;
  stem.castShadow = true;
  shroom.add(stem);

  // Trichterförmiger Hut (geschwungener Konus)
  const cap = new THREE.Mesh(
    new THREE.ConeGeometry(0.13 * scale, 0.08 * scale, 7),
    mats.chanterelleMat
  );
  cap.position.y = 0.22 * scale;
  cap.rotation.x = Math.PI;
  cap.scale.set(1.1, 1.0, 0.95);
  cap.castShadow = true;
  shroom.add(cap);

  return shroom;
}

/**
 * Erstellt eine Gruppe (Cluster) von Pilzen auf einem kleinen Moosfleck.
 */
export function createMushroomCluster(options: MushroomClusterOptions = {}): MushroomClusterEntity {
  const group = new THREE.Group();
  group.name = 'MushroomCluster';

  const type = options.type ?? 'fly_agaric';
  const baseScale = options.scale ?? 1.0;
  const mats = MushroomMaterialCache.get();

  // Kleines Moospolster am Fuß der Pilzgruppe
  const mossPatch = new THREE.Mesh(
    new THREE.CylinderGeometry(0.24 * baseScale, 0.30 * baseScale, 0.02 * baseScale, 7),
    mats.mossMat
  );
  mossPatch.position.y = 0.01 * baseScale;
  mossPatch.receiveShadow = true;
  group.add(mossPatch);

  // Konfiguration der einzelnen Pilze im Cluster (Position, Skalierung, Neigungswinkel)
  const shroomConfigs = [
    { x: 0, z: 0, s: 1.0, rx: 0.04, rz: -0.06 },
    { x: 0.11 * baseScale, z: 0.06 * baseScale, s: 0.68, rx: 0.12, rz: 0.14 },
    { x: -0.09 * baseScale, z: 0.08 * baseScale, s: 0.52, rx: -0.08, rz: -0.16 },
  ];

  shroomConfigs.forEach((cfg, idx) => {
    let singleShroom: THREE.Group;

    let subType = type;
    if (type === 'mixed') {
      subType = idx === 0 ? 'bolete' : idx === 1 ? 'fly_agaric' : 'chanterelle';
    }

    if (subType === 'bolete') {
      singleShroom = createSingleBolete(cfg.s * baseScale, mats);
    } else if (subType === 'chanterelle') {
      singleShroom = createSingleChanterelle(cfg.s * baseScale, mats);
    } else {
      singleShroom = createSingleFlyAgaric(cfg.s * baseScale, mats);
    }

    singleShroom.position.set(cfg.x, 0, cfg.z);
    singleShroom.rotation.x = cfg.rx;
    singleShroom.rotation.z = cfg.rz;
    group.add(singleShroom);
  });

  if (options.rotationY) {
    group.rotation.y = options.rotationY;
  }

  return { group };
}
