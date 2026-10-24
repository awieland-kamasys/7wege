import * as THREE from 'three';
import { PATH_5_FIRE_POS } from '../data/paths';
import { createVeinedLavaRockTexture } from '../textures/GroundTextures';

export interface PathFireEntity {
  group: THREE.Group;
  pickableMeshes: THREE.Object3D[];
  update: (dtSeconds: number, isHovered?: boolean) => void;
  startDissolve: (onComplete?: () => void) => void;
  isDissolving: () => boolean;
  isRemoved: () => boolean;
}

/**
 * Erstellt den riesigen, spitzen Lavaobelisken, der Weg 5 (Höllenschlund-Pfad) versperrt.
 * Monumentaler, fast 11 Meter hoher schwarzer Obsidian-Monolith mit glühend roten Lava-Adern,
 * gezackten Stützstelen an der Basis und unheilvoll pulsierendem Magmalicht.
 */
export function createPathFire(): PathFireEntity {
  const group = new THREE.Group();
  group.name = 'Path5LavaObelisk';
  group.position.set(PATH_5_FIRE_POS.x, 0, PATH_5_FIRE_POS.z);

  const pickableMeshes: THREE.Object3D[] = [];

  // Prozedurale Texturen für schwarzes Lavagestein mit roten Adern
  const lavaMaps = createVeinedLavaRockTexture();
  if (lavaMaps.map) {
    lavaMaps.map.wrapS = THREE.RepeatWrapping;
    lavaMaps.map.wrapT = THREE.RepeatWrapping;
    lavaMaps.map.repeat.set(2.0, 6.0);
  }
  if (lavaMaps.emissiveMap) {
    lavaMaps.emissiveMap.wrapS = THREE.RepeatWrapping;
    lavaMaps.emissiveMap.wrapT = THREE.RepeatWrapping;
    lavaMaps.emissiveMap.repeat.set(2.0, 6.0);
  }

  // Basalt- und Obsidianmaterial mit glühenden Magma-Adern
  const obeliskMaterial = new THREE.MeshStandardMaterial({
    color: 0x1c1719,
    map: lavaMaps.map,
    emissive: 0xff2200,
    emissiveMap: lavaMaps.emissiveMap,
    bumpMap: lavaMaps.bumpMap,
    bumpScale: 0.15,
    emissiveIntensity: 0.85,
    roughness: 0.72,
    metalness: 0.42,
    flatShading: true,
  });

  // Reines glutrotes Adernmaterial für erhabene Lavarisse
  const magmaVeinMaterial = new THREE.MeshStandardMaterial({
    color: 0xff3300,
    emissive: 0xff1100,
    emissiveIntensity: 1.25,
    roughness: 0.35,
    metalness: 0.2,
    flatShading: true,
  });

  // 1. Zerkrümelter, aschiger Vulkankrater-Sockel am Boden (doppelte Größe)
  const baseGeo = new THREE.CylinderGeometry(3.1, 3.7, 0.5, 8);
  const baseMesh = new THREE.Mesh(baseGeo, obeliskMaterial);
  baseMesh.position.y = 0.25;
  baseMesh.castShadow = true;
  baseMesh.receiveShadow = true;
  baseMesh.userData = { interactableType: 'fire' };
  group.add(baseMesh);
  pickableMeshes.push(baseMesh);

  // 2. Riesiger, spitz zulaufender Vierkant-Obeliskenschaft (Höhe 8.8m)
  const shaftGeo = new THREE.CylinderGeometry(0.36, 1.50, 8.8, 4);
  const shaftMesh = new THREE.Mesh(shaftGeo, obeliskMaterial);
  shaftMesh.position.y = 4.90;
  shaftMesh.rotation.y = Math.PI / 4;
  shaftMesh.castShadow = true;
  shaftMesh.receiveShadow = true;
  shaftMesh.userData = { interactableType: 'fire' };
  group.add(shaftMesh);
  pickableMeshes.push(shaftMesh);

  // 3. Messerscharfe pyramidale Obeliskenspitze oben drauf (Höhe 2.6m, Gesamthöhe fast 11m!)
  const tipGeo = new THREE.ConeGeometry(0.50, 2.6, 4);
  const tipMesh = new THREE.Mesh(tipGeo, obeliskMaterial);
  tipMesh.position.y = 10.5;
  tipMesh.rotation.y = Math.PI / 4;
  tipMesh.castShadow = true;
  tipMesh.userData = { interactableType: 'fire' };
  group.add(tipMesh);
  pickableMeshes.push(tipMesh);

  // 4. Gezackte Begleit-Stelen und spitze Lavakristalle an der Basis (doppelte Dimensionen)
  const shardConfigs = [
    { x: -1.70, z: 0.90, h: 4.2, r: 0.48, rotZ: 0.18, rotY: 0.4 },
    { x: 1.80, z: -0.70, h: 4.8, r: 0.52, rotZ: -0.22, rotY: 1.1 },
    { x: 0.50, z: 1.70, h: 3.6, r: 0.44, rotX: -0.20, rotY: 2.3 },
    { x: -1.10, z: -1.50, h: 4.0, r: 0.46, rotX: 0.24, rotY: 0.8 },
  ];

  for (const sc of shardConfigs) {
    const shard = new THREE.Mesh(
      new THREE.ConeGeometry(sc.r, sc.h, 4),
      obeliskMaterial
    );
    shard.position.set(sc.x, sc.h * 0.45, sc.z);
    shard.rotation.set(sc.rotX ?? 0, sc.rotY, sc.rotZ ?? 0);
    shard.castShadow = true;
    shard.receiveShadow = true;
    shard.userData = { interactableType: 'fire' };
    group.add(shard);
    pickableMeshes.push(shard);
  }

  // 5. Sichtbare, glühende rote Magma-Adern an den Kanten des Schafts
  const vein1 = new THREE.Mesh(new THREE.BoxGeometry(0.16, 6.4, 0.16), magmaVeinMaterial);
  vein1.position.set(0.48, 5.0, 0.48);
  vein1.rotation.y = Math.PI / 4;
  group.add(vein1);

  const vein2 = new THREE.Mesh(new THREE.BoxGeometry(0.16, 5.6, 0.16), magmaVeinMaterial);
  vein2.position.set(-0.48, 4.6, -0.48);
  vein2.rotation.y = Math.PI / 4;
  group.add(vein2);

  // Unheilvoll flackerndes, glutrotes Lavazeichen-Licht
  const fireLight = new THREE.PointLight(0xff2200, 2.2, 16.0);
  fireLight.position.set(0, 5.5, 0);
  group.add(fireLight);

  let state: 'solid' | 'dissolving' | 'removed' = 'solid';
  let dissolveTimer = 0;
  const dissolveDuration = 1.6;
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

      // Obelisk sinkt mit intensivem Glühen tief in die Lava ein
      group.position.y = -progress * 11.0;
      const scale = Math.max(0.001, 1.0 - progress * 0.85);
      group.scale.set(scale, scale, scale);

      // Intensives, glutrotes Aufflackern
      const glowBoost = Math.max(0, 1.0 - Math.abs(progress - 0.25) * 2.0);
      obeliskMaterial.emissiveIntensity = 1.0 + glowBoost * 3.5;
      magmaVeinMaterial.emissiveIntensity = 1.5 + glowBoost * 4.5;
      fireLight.intensity = 2.5 + glowBoost * 4.0;

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

    // Zustand 'solid': Rhythmisches Pulsieren der Glutadern
    const pulse = 0.5 + 0.5 * Math.sin(elapsed * 3.2);
    const hoverBonus = isHovered ? 0.6 : 0;
    obeliskMaterial.emissiveIntensity = 0.75 + pulse * 0.4 + hoverBonus;
    magmaVeinMaterial.emissiveIntensity = 1.1 + pulse * 0.5 + hoverBonus;
    fireLight.intensity = 1.8 + pulse * 0.5 + hoverBonus;
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
