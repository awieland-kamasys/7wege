import * as THREE from 'three';
import { PATH_2_PUDDLE_POS } from '../data/paths';

export interface PathPuddleEntity {
  group: THREE.Group;
  pickableMeshes: THREE.Object3D[];
  update: (dtSeconds: number, isHovered?: boolean) => void;
  startDissolve: (onComplete?: () => void) => void;
  isDissolving: () => boolean;
  isRemoved: () => boolean;
}

/**
 * Erstellt die magische Wasserpfütze, die Weg 2 (Nixenteich-Pfad) versperrt.
 * Tiefe, schimmernde Wasserfläche mit Schaumrand und türkisen Lichtreflexen.
 */
export function createPathPuddle(): PathPuddleEntity {
  const group = new THREE.Group();
  group.name = 'Path2Puddle';
  group.position.set(PATH_2_PUDDLE_POS.x, 0, PATH_2_PUDDLE_POS.z);

  const pickableMeshes: THREE.Object3D[] = [];

  // Feuchter, schlammiger Erdboden-Ring am Rand der Pfütze
  const mudMaterial = new THREE.MeshStandardMaterial({
    color: 0x3a3326,
    roughness: 0.95,
    metalness: 0.05,
    flatShading: true,
  });

  const mudRing = new THREE.Mesh(
    new THREE.CylinderGeometry(1.55, 1.7, 0.04, 24),
    mudMaterial
  );
  mudRing.position.y = 0.02;
  mudRing.receiveShadow = true;
  group.add(mudRing);

  // Glänzende, transparente Wasseroberfläche
  const waterMaterial = new THREE.MeshStandardMaterial({
    color: 0x247a82,
    emissive: 0x114449,
    emissiveIntensity: 0.35,
    roughness: 0.08,
    metalness: 0.15,
    transparent: true,
    opacity: 0.88,
  });

  const waterSurface = new THREE.Mesh(
    new THREE.CylinderGeometry(1.42, 1.42, 0.05, 24),
    waterMaterial
  );
  waterSurface.position.y = 0.035;
  waterSurface.receiveShadow = true;
  group.add(waterSurface);

  // Kleine Uferkiesel und Schaumblasen am Rand
  const pebbleMat = new THREE.MeshStandardMaterial({
    color: 0x5a5854,
    roughness: 0.8,
    flatShading: true,
  });
  const pebbles = [
    { x: -1.1, z: 0.7, r: 0.16 },
    { x: 1.2, z: -0.5, r: 0.14 },
    { x: 0.4, z: 1.2, r: 0.18 },
    { x: -0.8, z: -1.0, r: 0.15 },
    { x: 0.9, z: 0.9, r: 0.12 },
  ];
  for (const p of pebbles) {
    const pebble = new THREE.Mesh(new THREE.DodecahedronGeometry(p.r, 0), pebbleMat);
    pebble.position.set(p.x, 0.08, p.z);
    pebble.castShadow = true;
    pebble.receiveShadow = true;
    group.add(pebble);
  }

  // Sanftes, türkises Wasserlicht
  const puddleLight = new THREE.PointLight(0x4ee2d0, 0.75, 4.0);
  puddleLight.position.set(0, 0.35, 0);
  group.add(puddleLight);

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

      // Wasser versickert im Boden und schrumpft zusammen
      const scale = Math.max(0.001, 1.0 - progress * 0.98);
      group.scale.set(scale, scale, scale);
      group.position.y = -progress * 0.35;
      waterMaterial.opacity = Math.max(0, 0.88 * (1.0 - progress));

      // Helles Aufleuchten beim Beginn des Versickerns
      const glowBoost = Math.max(0, 1.0 - progress * 1.5);
      puddleLight.intensity = 1.5 * glowBoost;

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

    // Zustand 'solid': Rhythmisches Glänzen der Wasseroberfläche
    const wave = 0.5 + 0.5 * Math.sin(elapsed * 2.5);
    const hoverBonus = isHovered ? 0.4 : 0;
    waterMaterial.emissiveIntensity = 0.35 + wave * 0.25 + hoverBonus;
    puddleLight.intensity = 0.65 + wave * 0.35 + hoverBonus;
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
