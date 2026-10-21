import * as THREE from 'three';
import { PATH_5_FIRE_POS } from '../data/paths';

export interface PathFireEntity {
  group: THREE.Group;
  pickableMeshes: THREE.Object3D[];
  update: (dtSeconds: number, isHovered?: boolean) => void;
  startDissolve: (onComplete?: () => void) => void;
  isDissolving: () => boolean;
  isRemoved: () => boolean;
}

/**
 * Erstellt die lodernde Flammenwand / das Feuer, das Weg 5 (Höllenschlund-Pfad) versperrt.
 * Glühende Kohlen und Felsen am Boden mit tanzenden Flammenzungen und
 * flackerndem, rubinrotem/orangefarbenem Feuerlicht.
 */
export function createPathFire(): PathFireEntity {
  const group = new THREE.Group();
  group.name = 'Path5Fire';
  group.position.set(PATH_5_FIRE_POS.x, 0, PATH_5_FIRE_POS.z);

  const pickableMeshes: THREE.Object3D[] = [];

  // Verbrannter, aschiger Boden mit Glutrissen
  const ashMaterial = new THREE.MeshStandardMaterial({
    color: 0x1f1814,
    emissive: 0x5a1805,
    emissiveIntensity: 0.6,
    roughness: 0.95,
    flatShading: true,
  });

  const ashBase = new THREE.Mesh(
    new THREE.CylinderGeometry(1.45, 1.6, 0.08, 16),
    ashMaterial
  );
  ashBase.position.y = 0.04;
  ashBase.receiveShadow = true;
  group.add(ashBase);

  // Glühende Felsen und Kohlebrocken
  const coalMat = new THREE.MeshStandardMaterial({
    color: 0x2b1308,
    emissive: 0xd93808,
    emissiveIntensity: 0.9,
    roughness: 0.85,
    flatShading: true,
  });

  const coals = [
    { x: -0.7, z: 0.4, r: 0.32 },
    { x: 0.8, z: -0.3, r: 0.38 },
    { x: 0.1, z: 0.6, r: 0.35 },
    { x: -0.5, z: -0.5, r: 0.28 },
    { x: 0.4, z: -0.6, r: 0.3 },
  ];
  for (const c of coals) {
    const coal = new THREE.Mesh(new THREE.DodecahedronGeometry(c.r, 0), coalMat);
    coal.position.set(c.x, c.r * 0.7, c.z);
    coal.castShadow = true;
    coal.receiveShadow = true;
    group.add(coal);
  }

  // Lodernde Flammenzungen (Konen und Pyramiden in mehreren Schichten)
  const flameMatOuter = new THREE.MeshStandardMaterial({
    color: 0xff3800,
    emissive: 0xff4400,
    emissiveIntensity: 1.5,
    roughness: 0.2,
    transparent: true,
    opacity: 0.92,
  });

  const flameMatCore = new THREE.MeshStandardMaterial({
    color: 0xffdd33,
    emissive: 0xffbb11,
    emissiveIntensity: 2.2,
    roughness: 0.1,
    transparent: true,
    opacity: 0.95,
  });

  interface FlameTongue {
    mesh: THREE.Mesh;
    baseY: number;
    baseScaleY: number;
    speed: number;
    phase: number;
  }
  const flames: FlameTongue[] = [];

  const flamePositions = [
    { x: 0, z: 0, scale: 1.35, core: true },
    { x: -0.55, z: 0.35, scale: 1.1, core: false },
    { x: 0.6, z: -0.25, scale: 1.15, core: false },
    { x: -0.3, z: -0.45, scale: 0.95, core: true },
    { x: 0.45, z: 0.4, scale: 1.0, core: false },
    { x: 0, z: -0.6, scale: 0.85, core: false },
  ];

  flamePositions.forEach((fp, i) => {
    const geo = new THREE.ConeGeometry(0.32 * fp.scale, 1.25 * fp.scale, 7);
    const mat = fp.core ? flameMatCore : flameMatOuter;
    const flame = new THREE.Mesh(geo, mat);
    const baseY = (1.25 * fp.scale) / 2 + 0.05;
    flame.position.set(fp.x, baseY, fp.z);
    group.add(flame);

    flames.push({
      mesh: flame,
      baseY,
      baseScaleY: fp.scale,
      speed: 3.5 + (i % 3) * 1.2,
      phase: i * 1.1,
    });
  });

  // Flackerndes, warmes Feuerlicht
  const fireLight = new THREE.PointLight(0xff4400, 1.6, 5.0);
  fireLight.position.set(0, 1.1, 0);
  group.add(fireLight);

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

      // Flammen zischen ab, zucken kurz auf und schrumpfen zu Asche zusammen
      const scale = Math.max(0.001, 1.0 - progress * 0.98);
      group.scale.set(scale, scale, scale);
      group.position.y = -progress * 0.4;

      flameMatOuter.opacity = Math.max(0, 0.92 * (1.0 - progress));
      flameMatCore.opacity = Math.max(0, 0.95 * (1.0 - progress));

      const flicker = 1.0 - progress;
      fireLight.intensity = Math.max(0, 2.2 * flicker);

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

    // Zustand 'solid': Dynamisch züngelnde Flammen
    for (const f of flames) {
      const osc = Math.sin(elapsed * f.speed + f.phase);
      const sy = f.baseScaleY * (0.85 + 0.3 * osc);
      f.mesh.scale.set(f.baseScaleY * (1.0 - 0.1 * osc), sy, f.baseScaleY * (1.0 - 0.1 * osc));
      f.mesh.position.y = f.baseY + 0.08 * osc;
      f.mesh.rotation.y = elapsed * 0.8 + f.phase;
    }

    // Flackerndes Feuerlicht
    const flicker =
      0.85 + 0.15 * Math.sin(elapsed * 9.0) + 0.1 * Math.cos(elapsed * 17.5);
    const hoverBonus = isHovered ? 0.6 : 0;
    fireLight.intensity = 1.4 * flicker + hoverBonus;
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
