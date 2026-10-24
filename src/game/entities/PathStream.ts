import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { PATH_3_STREAM_POS } from '../data/paths';
import { disposeObject3D } from '../utils/threeUtils';

export interface PathStreamEntity {
  group: THREE.Group;
  pickableMeshes: THREE.Object3D[];
  update: (dtSeconds: number, isHovered?: boolean) => void;
  startDissolve: (onComplete?: () => void) => void;
  isDissolving: () => boolean;
  isRemoved: () => boolean;
}

/**
 * Erstellt den reißenden Gebirgsbachlauf, der Weg 3 (Quellenweg zum Riesen) versperrt.
 * Lädt das 3D-Modell `/assets/models/rocky stream 3d model.glb` mit steiniger Flussrinne,
 * schäumendem Gebirgswasser und saphirblau schimmernden Kristallpartikeln.
 */
export function createPathStream(): PathStreamEntity {
  const group = new THREE.Group();
  group.name = 'Path3Stream';
  group.position.set(PATH_3_STREAM_POS.x, 0, PATH_3_STREAM_POS.z);
  group.rotation.y = PATH_3_STREAM_POS.rotationY;

  const pickableMeshes: THREE.Object3D[] = [];

  // Temporärer Platzhalter während des GLB-Ladens
  const fallbackGroup = new THREE.Group();
  const bedMaterial = new THREE.MeshLambertMaterial({
    color: 0x242d2a,
    flatShading: true,
  });
  const fallbackMesh = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 0.08, 1.4),
    bedMaterial
  );
  fallbackMesh.position.set(0, 0.04, 0);
  fallbackMesh.userData = { interactableType: 'stream' };
  fallbackGroup.add(fallbackMesh);
  group.add(fallbackGroup);
  pickableMeshes.push(fallbackMesh);

  // Saphirblaues Wasserlicht
  const streamLight = new THREE.PointLight(0x38b0ff, 0.95, 4.8);
  streamLight.position.set(0, 0.5, 0);
  group.add(streamLight);

  const modelMaterials: THREE.MeshStandardMaterial[] = [];

  // Lade das detaillierte Rocky-Stream-Modell
  const loader = new GLTFLoader();
  loader.load(
    '/assets/models/rocky stream 3d model.glb',
    (gltf) => {
      const model = gltf.scene;

      // Skalierung: Breite 3.6m quer über den Weg, Tiefe ca. 1.2m
      model.scale.set(3.6, 2.5, 3.8);

      // Bounding Box berechnen und Modell passgenau auf Bodenniveau (y = 0) aufsetzen
      model.updateMatrixWorld(true);
      const bounds = new THREE.Box3().setFromObject(model);
      model.position.set(0, -bounds.min.y, 0);

      model.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          mesh.userData = { interactableType: 'stream' };

          if (mesh.material && 'roughness' in mesh.material) {
            const mat = mesh.material as THREE.MeshStandardMaterial;
            modelMaterials.push(mat);
          }
          pickableMeshes.push(mesh);
        }
      });

      // Platzhalter entfernen
      const idx = pickableMeshes.indexOf(fallbackMesh);
      if (idx !== -1) pickableMeshes.splice(idx, 1);
      group.remove(fallbackGroup);
      disposeObject3D(fallbackGroup);
      group.add(model);
    },
    undefined,
    (err) => {
      console.warn('Steiniger Bachlauf-Modell konnte nicht geladen werden, nutze Platzhalter:', err);
    }
  );

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

      // Bach trocknet aus und sinkt in den Boden
      const scale = Math.max(0.001, 1.0 - progress * 0.95);
      group.scale.set(scale, scale, scale);
      group.position.y = -progress * 0.8;

      // Intensives Aufglühen beim Austrocknen
      const glowBoost = Math.max(0, 1.0 - progress * 1.5);
      streamLight.intensity = 2.2 * glowBoost;

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

    // Zustand 'solid': Rhythmisches Fließen und Glimmen
    const wave = 0.5 + 0.5 * Math.sin(elapsed * 3.2);
    const hoverBonus = isHovered ? 0.6 : 0;
    streamLight.intensity = 0.85 + wave * 0.35 + hoverBonus;

    for (const mat of modelMaterials) {
      if (mat.emissive) {
        mat.emissive.setHex(isHovered ? 0x1a4566 : 0x081f30);
        mat.emissiveIntensity = isHovered ? 0.5 : 0.2;
      }
    }
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
