import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { PATH_4_LOG_POS } from '../data/paths';
import { disposeObject3D } from '../utils/threeUtils';

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
 * Lädt das detaillierte Totholzstamm-Modell `/assets/models/fallen log 3d model.glb`
 * mit Moosauflage und Rindenstruktur. Vollkommen ohne künstliches Licht.
 */
export function createPathLog(): PathLogEntity {
  const group = new THREE.Group();
  group.name = 'Path4Log';
  group.position.set(PATH_4_LOG_POS.x, 0, PATH_4_LOG_POS.z);
  group.rotation.y = PATH_4_LOG_POS.rotationY;

  const pickableMeshes: THREE.Object3D[] = [];

  // Temporärer Platzhalter während des GLB-Ladens
  const fallbackGroup = new THREE.Group();
  const barkMaterial = new THREE.MeshLambertMaterial({
    color: 0x8a6242,
    flatShading: true,
  });
  const fallbackMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.35, 0.40, 3.4, 10),
    barkMaterial
  );
  fallbackMesh.rotation.z = Math.PI / 2;
  fallbackMesh.position.set(0, 0.35, 0);
  fallbackMesh.userData = { interactableType: 'log' };
  fallbackGroup.add(fallbackMesh);
  group.add(fallbackGroup);
  pickableMeshes.push(fallbackMesh);

  const modelMaterials: THREE.MeshStandardMaterial[] = [];

  // Lade das detaillierte Fallen-Log-Modell
  const loader = new GLTFLoader();
  loader.load(
    '/assets/models/fallen log 3d model.glb',
    (gltf) => {
      const model = gltf.scene;

      // Skalierung: Stamm auf 3.6m verlängern, um den Pfad quer vollflächig abzuriegeln
      model.scale.setScalar(3.6);

      // Bounding Box berechnen und Modell passgenau auf Bodenniveau (y = 0) aufsetzen
      model.updateMatrixWorld(true);
      const bounds = new THREE.Box3().setFromObject(model);
      model.position.set(0, -bounds.min.y, 0);

      model.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          mesh.userData = { interactableType: 'log' };

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
      console.warn('Baumstamm-Modell konnte nicht geladen werden, nutze Platzhalter:', err);
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

      // Stamm sinkt in den Boden und löst sich auf
      const scale = Math.max(0.001, 1.0 - progress * 0.95);
      group.scale.set(scale, scale, scale);
      group.position.y = -progress * 1.2;

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
        mat.emissive.setHex(isHovered ? 0x4a2d07 : 0x000000);
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
