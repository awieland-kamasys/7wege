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
 * Lädt das 3D-Modell `/assets/models/rocky stream 3d model.glb` in doppelter Größe (7.2m x 7.6m).
 * Vollständig ohne künstliches Licht für eine natürliche Gebirgsbach-Optik.
 */
export function createPathStream(): PathStreamEntity {
  const group = new THREE.Group();
  group.name = 'Path3Stream';
  group.position.set(PATH_3_STREAM_POS.x, 0, PATH_3_STREAM_POS.z);
  group.rotation.y = PATH_3_STREAM_POS.rotationY;

  const pickableMeshes: THREE.Object3D[] = [];

  // Temporärer Platzhalter während des GLB-Ladens in doppelter Größe
  const fallbackGroup = new THREE.Group();
  const bedMaterial = new THREE.MeshLambertMaterial({
    color: 0x242d2a,
    flatShading: true,
  });
  const fallbackMesh = new THREE.Mesh(
    new THREE.BoxGeometry(6.4, 0.16, 2.8),
    bedMaterial
  );
  fallbackMesh.position.set(0, 0.08, 0);
  fallbackMesh.userData = { interactableType: 'stream' };
  fallbackGroup.add(fallbackMesh);
  group.add(fallbackGroup);
  pickableMeshes.push(fallbackMesh);

  const modelMaterials: THREE.MeshStandardMaterial[] = [];

  // Lade das detaillierte Rocky-Stream-Modell
  const loader = new GLTFLoader();
  loader.load(
    '/assets/models/rocky stream 3d model.glb',
    (gltf) => {
      const model = gltf.scene;

      // Skalierung: Komplett verdoppelt auf 7.2m Breite und 7.6m Länge quer über den Weg
      model.scale.set(7.2, 5.0, 7.6);

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

  const update = (dtSeconds: number, isHovered = false): void => {
    if (state === 'removed') {
      return;
    }

    if (state === 'dissolving') {
      dissolveTimer += dtSeconds;
      const progress = Math.min(1.0, dissolveTimer / dissolveDuration);

      // Bach trocknet aus und sinkt in den Boden
      const scale = Math.max(0.001, 1.0 - progress * 0.95);
      group.scale.set(scale, scale, scale);
      group.position.y = -progress * 1.5;

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

    // Zustand 'solid': Dezente Emissive-Anpassung bei Hover
    for (const mat of modelMaterials) {
      if (mat.emissive) {
        mat.emissive.setHex(isHovered ? 0x1a4566 : 0x000000);
        mat.emissiveIntensity = isHovered ? 0.35 : 0.0;
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
