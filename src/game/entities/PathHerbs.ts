import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { PATH_6_HERBS_POS } from '../data/paths';
import { disposeObject3D } from '../utils/threeUtils';

export interface PathHerbsEntity {
  group: THREE.Group;
  pickableMeshes: THREE.Object3D[];
  update: (dtSeconds: number, isHovered?: boolean) => void;
  startDissolve: (onComplete?: () => void) => void;
  isDissolving: () => boolean;
  isRemoved: () => boolean;
  loadModel?: () => void;
}

/**
 * Erstellt die Wegsperre für Weg 6 (Jägerpfad):
 * Dichte, magisch wuchernde Fantasiepflanzen quer über die Wegbreite (ohne Geländer).
 * Lädt das 3D-Modell `/assets/models/fantasy plant 3d model.glb`.
 */
export function createPathHerbs(options?: { lazy?: boolean }): PathHerbsEntity {
  const group = new THREE.Group();
  group.name = 'Path6Herbs';
  group.position.set(PATH_6_HERBS_POS.x, 0, PATH_6_HERBS_POS.z);
  group.rotation.y = PATH_6_HERBS_POS.rotationY;

  const pickableMeshes: THREE.Object3D[] = [];

  // Fantasiepflanzen quer über den Weg
  const plantsGroup = new THREE.Group();
  plantsGroup.name = 'FantasyPlantsGroup';
  group.add(plantsGroup);

  // Temporärer Platzhalter während des GLB-Ladens
  const fallbackPlantMat = new THREE.MeshStandardMaterial({
    color: 0x3d7045,
    roughness: 0.8,
  });
  const fallbackPlant = new THREE.Mesh(
    new THREE.ConeGeometry(0.75, 1.4, 8),
    fallbackPlantMat
  );
  fallbackPlant.position.set(0, 0.7, 0);
  fallbackPlant.userData = { interactableType: 'herbs' };
  plantsGroup.add(fallbackPlant);
  pickableMeshes.push(fallbackPlant);

  const modelMaterials: THREE.MeshStandardMaterial[] = [];

  // Lade das 3D-Modell der Fantasiepflanze
  let isLoadedOrLoading = false;
  const startLoad = (): void => {
    if (isLoadedOrLoading) return;
    isLoadedOrLoading = true;

    const loader = new GLTFLoader();
    loader.load(
      '/assets/models/fantasy plant 3d model.glb',
      (gltf) => {
        // Platzhalter entfernen
        const idx = pickableMeshes.indexOf(fallbackPlant);
        if (idx !== -1) pickableMeshes.splice(idx, 1);
        plantsGroup.remove(fallbackPlant);
        disposeObject3D(fallbackPlant);

        const basePlant = gltf.scene;
        basePlant.updateMatrixWorld(true);
        const bounds = new THREE.Box3().setFromObject(basePlant);
        const minY = bounds.min.y;

        // 5 dichte Pflanzen-Instanzen quer über die gesamte Wegbreite arrangieren
        const instances = [
          { x: -1.25, z: -0.05, scale: 2.85, rotY: 0.4 },
          { x: -0.65, z: 0.15, scale: 3.20, rotY: 1.8 },
          { x: 0.00, z: -0.10, scale: 3.35, rotY: 3.2 },
          { x: 0.65, z: 0.12, scale: 3.05, rotY: 4.6 },
          { x: 1.25, z: -0.02, scale: 2.80, rotY: 5.8 },
        ];

        for (const inst of instances) {
          const plantClone = basePlant.clone(true);
          plantClone.scale.setScalar(inst.scale);
          plantClone.position.set(inst.x, -minY * inst.scale, inst.z);
          plantClone.rotation.y = inst.rotY;

          plantClone.traverse((child) => {
            const mesh = child as THREE.Mesh;
            if (mesh.isMesh) {
              mesh.castShadow = true;
              mesh.receiveShadow = true;
              mesh.userData = { interactableType: 'herbs' };

              if (mesh.material && 'roughness' in mesh.material) {
                const mat = mesh.material as THREE.MeshStandardMaterial;
                modelMaterials.push(mat);
              }
              pickableMeshes.push(mesh);
            }
          });

          plantsGroup.add(plantClone);
        }
      },
      undefined,
      (err) => {
        console.warn('Fantasy-Pflanze konnte nicht geladen werden, nutze Platzhalter:', err);
      }
    );
  };

  if (!options?.lazy) {
    startLoad();
  }

  // Zustandsvariablen für Animation und Beseitigung
  let dissolving = false;
  let dissolveTimer = 0;
  const dissolveDuration = 1.4;
  let onCompleteCallback: (() => void) | undefined;
  let removed = false;

  return {
    group,
    pickableMeshes,
    update: (dtSeconds: number, isHovered = false) => {
      if (removed) {
        return;
      }

      if (dissolving) {
        dissolveTimer += dtSeconds;
        const progress = Math.min(1, dissolveTimer / dissolveDuration);

        // Sanftes Absinken und Schrumpfen
        const scale = Math.max(0.01, 1 - progress);
        group.scale.set(scale, scale, scale);
        group.position.y = -progress * 1.0;

        if (progress >= 1) {
          group.visible = false;
          removed = true;
          if (onCompleteCallback) {
            onCompleteCallback();
          }
        }
        return;
      }

      // Pflanzen stehen ruhig (keine Windanimation und kein künstliches Licht)
      // Dezente Hervorhebung bei Maus-Hover
      for (const mat of modelMaterials) {
        if (mat.emissive) {
          mat.emissive.setHex(isHovered ? 0x4a1268 : 0x000000);
          mat.emissiveIntensity = isHovered ? 0.45 : 0.0;
        }
      }
    },
    startDissolve: (onComplete?: () => void) => {
      if (dissolving || removed) {
        return;
      }
      dissolving = true;
      dissolveTimer = 0;
      onCompleteCallback = onComplete;
    },
    isDissolving: () => dissolving,
    isRemoved: () => removed,
    loadModel: startLoad,
  };
}
