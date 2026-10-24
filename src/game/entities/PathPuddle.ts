import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { PATH_2_PUDDLE_POS } from '../data/paths';
import { disposeObject3D } from '../utils/threeUtils';

export interface PathPuddleEntity {
  group: THREE.Group;
  pickableMeshes: THREE.Object3D[];
  update: (dtSeconds: number, isHovered?: boolean) => void;
  startDissolve: (onComplete?: () => void) => void;
  isDissolving: () => boolean;
  isRemoved: () => boolean;
}

/**
 * Erstellt den magischen Felsenteich / die Wasserbarriere, die Weg 2 (Nixenteich-Pfad) versperrt.
 * Lädt das 3D-Modell `/assets/models/rocky pond 3d model.glb` mit Felsenumrandung,
 * schimmernder Wasserfläche und türkisen Lichtreflexen.
 */
export function createPathPuddle(): PathPuddleEntity {
  const group = new THREE.Group();
  group.name = 'Path2Puddle';
  group.position.set(PATH_2_PUDDLE_POS.x, 0, PATH_2_PUDDLE_POS.z);

  const pickableMeshes: THREE.Object3D[] = [];

  // Temporärer Platzhalter während des GLB-Ladens
  const fallbackGroup = new THREE.Group();
  const mudMaterial = new THREE.MeshLambertMaterial({
    color: 0x3a3326,
    flatShading: true,
  });
  const fallbackMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(1.55, 1.7, 0.08, 20),
    mudMaterial
  );
  fallbackMesh.position.y = 0.04;
  fallbackMesh.userData = { interactableType: 'puddle' };
  fallbackGroup.add(fallbackMesh);
  group.add(fallbackGroup);
  pickableMeshes.push(fallbackMesh);

  // Sanftes, türkises Wasserlicht
  const puddleLight = new THREE.PointLight(0x4ee2d0, 0.85, 4.5);
  puddleLight.position.set(0, 0.45, 0);
  group.add(puddleLight);

  const modelMaterials: THREE.MeshStandardMaterial[] = [];

  // Lade das detaillierte Rocky-Pond-Modell
  const loader = new GLTFLoader();
  loader.load(
    '/assets/models/rocky pond 3d model.glb',
    (gltf) => {
      const model = gltf.scene;

      // Skalierung: Auf 3.4m vergrößern, um den Pfad zur Nixe passgenau zu sperren
      model.scale.setScalar(3.4);

      // Bounding Box berechnen und Modell passgenau auf Bodenniveau (y = 0) aufsetzen
      model.updateMatrixWorld(true);
      const bounds = new THREE.Box3().setFromObject(model);
      model.position.set(0, -bounds.min.y, 0);

      model.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          mesh.userData = { interactableType: 'puddle' };

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
      console.warn('Felsenteich-Modell konnte nicht geladen werden, nutze Platzhalter:', err);
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

      // Wasser versickert im Boden und schrumpft zusammen
      const scale = Math.max(0.001, 1.0 - progress * 0.98);
      group.scale.set(scale, scale, scale);
      group.position.y = -progress * 0.75;

      // Helles Aufleuchten beim Beginn des Versickerns
      const glowBoost = Math.max(0, 1.0 - progress * 1.5);
      puddleLight.intensity = 1.8 * glowBoost;

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
    puddleLight.intensity = 0.65 + wave * 0.35 + hoverBonus;

    for (const mat of modelMaterials) {
      if (mat.emissive) {
        mat.emissive.setHex(isHovered ? 0x114449 : 0x051a1d);
        mat.emissiveIntensity = isHovered ? 0.45 : 0.15;
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
