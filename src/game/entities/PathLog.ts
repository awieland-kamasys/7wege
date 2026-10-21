import * as THREE from 'three';
import { PATH_4_LOG_POS } from '../data/paths';

export interface PathLogEntity {
  group: THREE.Group;
  pickableMeshes: THREE.Object3D[];
  update: (dtSeconds: number, isHovered?: boolean) => void;
  startDissolve: (onComplete?: () => void) => void;
  isDissolving: () => boolean;
  isRemoved: () => boolean;
}

/**
 * Erstellt den umgestürzten Baumstamm, der Weg 4 (Holzfäller-Pfad) versperrt.
 * Wuchtiger Stamm mit Rinde, Bruchästen, Moosauflage und warm bernsteinfarben
 * glimmenden Resonanzrunen.
 */
export function createPathLog(): PathLogEntity {
  const group = new THREE.Group();
  group.name = 'Path4Log';
  group.position.set(PATH_4_LOG_POS.x, 0, PATH_4_LOG_POS.z);
  group.rotation.y = PATH_4_LOG_POS.rotationY;

  const pickableMeshes: THREE.Object3D[] = [];

  // Rindenmaterial des Stamms
  const barkMaterial = new THREE.MeshStandardMaterial({
    color: 0x48321e,
    roughness: 0.92,
    metalness: 0.05,
    flatShading: true,
  });

  // Helles Kernholz an den Schnitt- und Bruchenden
  const woodEndMaterial = new THREE.MeshStandardMaterial({
    color: 0xb58a52,
    roughness: 0.85,
    flatShading: true,
  });

  // Moosbedeckung auf der Oberseite
  const mossMaterial = new THREE.MeshStandardMaterial({
    color: 0x42542a,
    roughness: 0.95,
    flatShading: true,
  });

  // Bernsteinfarben glimmende Bruchrunen
  const runeMaterial = new THREE.MeshStandardMaterial({
    color: 0xe89e24,
    emissive: 0xb06810,
    emissiveIntensity: 0.8,
    roughness: 0.35,
    flatShading: true,
  });

  // Hauptstamm quer über den Pfad (Länge 3.2m, Durchmesser ~0.58m)
  const logGeo = new THREE.CylinderGeometry(0.28, 0.33, 3.2, 12);
  const mainLog = new THREE.Mesh(logGeo, barkMaterial);
  mainLog.rotation.z = Math.PI / 2;
  mainLog.position.set(0, 0.28, 0);
  mainLog.castShadow = true;
  mainLog.receiveShadow = true;
  group.add(mainLog);

  // Schnittflächen an beiden Enden
  for (const side of [-1, 1]) {
    const endFace = new THREE.Mesh(
      new THREE.CircleGeometry(0.30, 12),
      woodEndMaterial
    );
    endFace.rotation.y = side * (Math.PI / 2);
    endFace.position.set(side * 1.601, 0.28, 0);
    group.add(endFace);
  }

  // Moosschicht auf dem Stamm
  const mossPatch = new THREE.Mesh(
    new THREE.BoxGeometry(2.0, 0.08, 0.38),
    mossMaterial
  );
  mossPatch.position.set(0.1, 0.54, 0);
  mossPatch.castShadow = true;
  group.add(mossPatch);

  // Abstehende Aststümpfe
  const branchCoords = [
    { x: -0.6, y: 0.45, z: 0.22, rx: 0.5, rz: 0.2 },
    { x: 0.5, y: 0.42, z: -0.25, rx: -0.6, rz: -0.3 },
  ];
  for (const b of branchCoords) {
    const branch = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.09, 0.45, 6),
      barkMaterial
    );
    branch.position.set(b.x, b.y, b.z);
    branch.rotation.set(b.rx, 0, b.rz);
    branch.castShadow = true;
    group.add(branch);
  }

  // Eingeschnittene Bernstein-Runenrisse
  const runeVein = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.2, 0),
    runeMaterial
  );
  runeVein.position.set(0, 0.38, 0.25);
  runeVein.scale.set(1.4, 0.4, 0.4);
  group.add(runeVein);

  // Warmes Bernsteinlicht
  const logLight = new THREE.PointLight(0xf0a530, 0.8, 3.8);
  logLight.position.set(0, 0.6, 0.2);
  group.add(logLight);

  let state: 'solid' | 'dissolving' | 'removed' = 'solid';
  let dissolveTimer = 0;
  const dissolveDuration = 1.35;
  let onDissolveComplete: (() => void) | null = null;
  let elapsed = 0;

  const update = (dtSeconds: number, isHovered = false): void => {
    elapsed += dtSeconds;

    if (state === 'removed') {
      return;
    }

    if (state === 'dissolving') {
      dissolveTimer += dtSeconds;
      const progress = Math.min(1.0, dissolveTimer / dissolveDuration);

      // Stamm sinkt in die Erde ein und schrumpft magisch zusammen
      group.position.y = -progress * 1.5;
      const scale = Math.max(0.001, 1.0 - progress * 0.95);
      group.scale.set(scale, scale, scale);

      // Goldener Aufblitz-Effekt
      const glowBoost = 1.0 - Math.abs(progress - 0.3) * 1.5;
      const currentIntensity = Math.max(0.1, 2.5 * Math.max(0, glowBoost));
      runeMaterial.emissiveIntensity = currentIntensity;
      logLight.intensity = currentIntensity * 1.5;

      if (progress >= 1.0) {
        state = 'removed';
        group.visible = false;
        if (onDissolveComplete) {
          onDissolveComplete();
          onDissolveComplete = null;
        }
      }
      return;
    }

    // Zustand 'solid': Sanftes Atmen der Bernsteinrunen
    const pulse = 0.5 + 0.5 * Math.sin(elapsed * 2.8);
    const hoverBonus = isHovered ? 0.5 : 0;
    runeMaterial.emissiveIntensity = 0.7 + pulse * 0.4 + hoverBonus;
    logLight.intensity = 0.75 + pulse * 0.4 + hoverBonus;
  };

  const startDissolve = (onComplete?: () => void): void => {
    if (state !== 'solid') {
      return;
    }
    state = 'dissolving';
    dissolveTimer = 0;
    if (onComplete) {
      onDissolveComplete = onComplete;
    }
  };

  return {
    group,
    pickableMeshes,
    update,
    startDissolve,
    isDissolving: () => state === 'dissolving',
    isRemoved: () => state === 'removed',
  };
}
