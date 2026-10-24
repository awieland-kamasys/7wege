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
}

/**
 * Erstellt die Wegsperre für Weg 6 (Jägerpfad):
 * Ein rustikales Holzgeländer mit wuchernden magischen Fantasiepflanzen dahinter.
 * Lädt das 3D-Modell `/assets/models/fantasy plant 3d model.glb`.
 */
export function createPathHerbs(): PathHerbsEntity {
  const group = new THREE.Group();
  group.name = 'Path6Herbs';
  group.position.set(PATH_6_HERBS_POS.x, 0, PATH_6_HERBS_POS.z);
  group.rotation.y = PATH_6_HERBS_POS.rotationY;

  const pickableMeshes: THREE.Object3D[] = [];

  // Holzmaterial für das Geländer
  const woodMaterial = new THREE.MeshLambertMaterial({
    color: 0x5a3e26,
    flatShading: true,
  });

  // === 1. DAS HOLZGELÄNDER VOR DEN PFLANZEN (in Richtung Kreuzung bei z = -0.35) ===
  // Drei vertikale Holzpfosten
  const postPositions = [-1.35, 0, 1.35];
  for (const px of postPositions) {
    const post = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.09, 1.15, 8),
      woodMaterial
    );
    post.position.set(px, 0.575, -0.35);
    post.castShadow = true;
    post.receiveShadow = true;
    post.userData = { interactableType: 'herbs' };
    group.add(post);
    pickableMeshes.push(post);

    // Kappe auf dem Pfosten
    const cap = new THREE.Mesh(
      new THREE.ConeGeometry(0.1, 0.08, 8),
      woodMaterial
    );
    cap.position.set(px, 1.18, -0.35);
    cap.castShadow = true;
    cap.userData = { interactableType: 'herbs' };
    group.add(cap);
    pickableMeshes.push(cap);
  }

  // Zwei horizontale Querstangen (Geländerbalken quer über die Wegbreite)
  const railHeights = [0.52, 0.96];
  for (const ry of railHeights) {
    const rail = new THREE.Mesh(
      new THREE.CylinderGeometry(0.065, 0.065, 2.9, 8),
      woodMaterial
    );
    rail.rotation.z = Math.PI / 2;
    rail.position.set(0, ry, -0.35);
    rail.castShadow = true;
    rail.receiveShadow = true;
    rail.userData = { interactableType: 'herbs' };
    group.add(rail);
    pickableMeshes.push(rail);
  }

  // === 2. FANTASIEPFLANZEN DAHINTER (in Richtung Wegende bei z = 0.15 bis 0.40) ===
  const plantsGroup = new THREE.Group();
  plantsGroup.name = 'FantasyPlantsGroup';
  group.add(plantsGroup);

  // Temporärer Platzhalter während des GLB-Ladens
  const fallbackPlantMat = new THREE.MeshStandardMaterial({
    color: 0x3d7045,
    roughness: 0.8,
  });
  const fallbackPlant = new THREE.Mesh(
    new THREE.ConeGeometry(0.65, 1.4, 8),
    fallbackPlantMat
  );
  fallbackPlant.position.set(0, 0.7, 0.25);
  fallbackPlant.userData = { interactableType: 'herbs' };
  plantsGroup.add(fallbackPlant);
  pickableMeshes.push(fallbackPlant);

  const modelMaterials: THREE.MeshStandardMaterial[] = [];

  // Lade das 3D-Modell der Fantasiepflanze
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

      // 4 Pflanzen-Instanzen hinter dem Geländer arrangieren
      const instances = [
        { x: -1.05, z: 0.20, scale: 2.65, rotY: 0.4 },
        { x: -0.35, z: 0.35, scale: 3.05, rotY: 1.8 },
        { x: 0.35, z: 0.22, scale: 2.85, rotY: 3.2 },
        { x: 1.05, z: 0.32, scale: 2.55, rotY: 4.6 },
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
  };
}
