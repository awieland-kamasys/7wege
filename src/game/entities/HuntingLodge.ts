import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { disposeObject3D } from '../utils/threeUtils';

export interface HuntingLodgeEntity {
  group: THREE.Group;
  update: (elapsedSeconds: number) => void;
  loadModel?: () => void;
}

/**
 * Erstellt die 3D-Szenerie am Ende des 6. Weges:
 * - Eine stolze, wehrhafte mittelalterliche Burg (`/assets/models/medieval castle 3d model.glb`)
 *   mit Wehrmauern, Zinnen, Erkern und Bergfried auf der Waldlichtung
 * - Ein wunderbarer, eingezäunter Kräutergarten mit Beeten (Lavendel, Königs-Salbei, seltene Mondwurz, Thymian, Ringelblumen)
 * - Schauplatz für den Wilden Jäger und die Holzweibchen
 */
export function createHuntingLodge(
  onMeshLoaded?: (mesh: THREE.Mesh) => void,
  options?: { lazy?: boolean }
): HuntingLodgeEntity {
  const group = new THREE.Group();
  group.name = 'HuntingLodgeCastle';

  // --- MATERIALIEN FÜR PLATZHALTER ---
  const stoneMat = new THREE.MeshStandardMaterial({
    color: 0x5a554e,
    roughness: 0.95,
    flatShading: true,
  });
  const soilMat = new THREE.MeshStandardMaterial({
    color: 0x332519,
    roughness: 0.98,
  });

  const loader = new GLTFLoader();

  // ==========================================
  // 1. MITTELALTERLICHE BURG (medieval castle 3d model neu.glb)
  // ==========================================
  const castleGroup = new THREE.Group();
  castleGroup.name = 'MedievalCastle';
  castleGroup.position.set(-2.8, 0, 0.4);

  // Temporärer Platzhalter während des Ladens (stilisierter Bergfried und Wehrmauer)
  const castleFallback = new THREE.Group();
  castleFallback.rotation.y = Math.PI * 1.5;
  const keepFallback = new THREE.Mesh(
    new THREE.BoxGeometry(3.4, 4.2, 3.4),
    stoneMat
  );
  keepFallback.position.set(0, 2.1, -0.6);
  keepFallback.castShadow = true;
  keepFallback.receiveShadow = true;
  keepFallback.userData = { interactableType: 'hunting_lodge' };
  castleFallback.add(keepFallback);

  const wallFallback = new THREE.Mesh(
    new THREE.BoxGeometry(4.8, 2.6, 2.8),
    stoneMat
  );
  wallFallback.position.set(0, 1.3, 0.8);
  wallFallback.castShadow = true;
  wallFallback.receiveShadow = true;
  wallFallback.userData = { interactableType: 'hunting_lodge' };
  castleFallback.add(wallFallback);

  castleGroup.add(castleFallback);
  group.add(castleGroup);

  // ==========================================
  // 2. PFLANZKÜBEL-SET (garden planter set 3d model.glb)
  // Platziert vor der Burgruine auf Weg 6
  // ==========================================
  const gardenGroup = new THREE.Group();
  gardenGroup.name = 'GardenPlanterSet';
  gardenGroup.position.set(2.6, 0, 0.4);

  // Temporärer Platzhalter während des Ladens
  const gardenFallback = new THREE.Mesh(
    new THREE.BoxGeometry(4.0, 0.45, 3.4),
    soilMat
  );
  gardenFallback.position.set(0, 0.22, 0);
  gardenFallback.castShadow = true;
  gardenFallback.receiveShadow = true;
  gardenFallback.userData = { interactableType: 'herb_garden' };
  gardenGroup.add(gardenFallback);

  // Sanftes, geheimnisvolles Mondwurz-Licht über dem Pflanzset
  const moonwortLight = new THREE.PointLight(0x76ebe0, 0.85, 4.5);
  moonwortLight.position.set(0, 0.85, 0);
  gardenGroup.add(moonwortLight);
  group.add(gardenGroup);

  // ==========================================
  // 3. GARTENBEETE (garden beds 3d model.glb)
  // Platziert neben der Burgruine an der südlichen Flanke
  // ==========================================
  const isoGardenGroup = new THREE.Group();
  isoGardenGroup.name = 'GardenBeds';
  isoGardenGroup.position.set(-1.8, 0, 4.6);

  // Temporärer Platzhalter während des Ladens (zwei stilisierte Holzbeete mit Erde)
  const isoGardenFallback = new THREE.Group();
  isoGardenFallback.rotation.y = Math.PI;
  for (const bz of [-0.85, 0.85]) {
    const bed = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.32, 1.2), soilMat);
    bed.position.set(0, 0.16, bz);
    bed.castShadow = true;
    bed.receiveShadow = true;
    bed.userData = { interactableType: 'herb_garden' };
    isoGardenFallback.add(bed);
  }
  isoGardenGroup.add(isoGardenFallback);
  group.add(isoGardenGroup);

  // ==========================================
  // ON-DEMAND MODELL-LADEN (Burg + Kübel + Beete)
  // ==========================================
  let isLoadedOrLoading = false;
  const startLoad = (): void => {
    if (isLoadedOrLoading) return;
    isLoadedOrLoading = true;

    // 1. Mittelalterliche Burg
    loader.load(
      '/assets/models/medieval castle 3d model neu.glb',
      (gltf) => {
        const model = gltf.scene;
        model.scale.setScalar(8.2);
        model.rotation.y = Math.PI * 0.75;
        model.updateMatrixWorld(true);
        const bounds = new THREE.Box3().setFromObject(model);
        model.position.set(0, -bounds.min.y, 0);

        model.traverse((child) => {
          const mesh = child as THREE.Mesh;
          if (mesh.isMesh) {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.userData = { interactableType: 'hunting_lodge' };

            if (mesh.material && 'roughness' in mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = 0.88;
              mat.metalness = 0.08;
            }

            if (onMeshLoaded) {
              onMeshLoaded(mesh);
            }
          }
        });

        castleGroup.remove(castleFallback);
        disposeObject3D(castleFallback);
        castleGroup.add(model);
      },
      undefined,
      (err) => {
        console.warn('Modell medieval castle 3d model neu.glb konnte nicht geladen werden:', err);
      }
    );

    // 2. Pflanzkübel-Set
    loader.load(
      '/assets/models/garden planter set 3d model.glb',
      (gltf) => {
        const model = gltf.scene;
        model.scale.setScalar(4.0);
        model.updateMatrixWorld(true);
        const bounds = new THREE.Box3().setFromObject(model);
        model.position.set(0, -bounds.min.y, 0);

        model.traverse((child) => {
          const mesh = child as THREE.Mesh;
          if (mesh.isMesh) {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.userData = { interactableType: 'herb_garden' };

            if (mesh.material && 'roughness' in mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = 0.88;
              mat.metalness = 0.05;
            }

            if (onMeshLoaded) {
              onMeshLoaded(mesh);
            }
          }
        });

        gardenGroup.remove(gardenFallback);
        disposeObject3D(gardenFallback);
        gardenGroup.add(model);
      },
      undefined,
      (err) => {
        console.warn('Modell garden planter set 3d model.glb konnte nicht geladen werden:', err);
      }
    );

    // 3. Gartenbeete
    loader.load(
      '/assets/models/garden beds 3d model.glb',
      (gltf) => {
        const model = gltf.scene;
        model.scale.setScalar(3.6);
        model.rotation.y = Math.PI;
        model.updateMatrixWorld(true);
        const bounds = new THREE.Box3().setFromObject(model);
        model.position.set(0, -bounds.min.y, 0);

        model.traverse((child) => {
          const mesh = child as THREE.Mesh;
          if (mesh.isMesh) {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.userData = { interactableType: 'herb_garden' };

            if (mesh.material && 'roughness' in mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = 0.88;
              mat.metalness = 0.05;
            }

            if (onMeshLoaded) {
              onMeshLoaded(mesh);
            }
          }
        });

        isoGardenGroup.remove(isoGardenFallback);
        disposeObject3D(isoGardenFallback);
        isoGardenGroup.add(model);
      },
      undefined,
      (err) => {
        console.warn('Modell garden beds 3d model.glb konnte nicht geladen werden:', err);
      }
    );
  };

  if (!options?.lazy) {
    startLoad();
  }

  // ==========================================
  // UPDATE LOOP (Mondwurz-Pulsieren über den Beeten)
  // ==========================================
  const update = (elapsedSeconds: number): void => {
    moonwortLight.intensity = 0.85 + Math.sin(elapsedSeconds * 2.5) * 0.35;
  };

  return { group, update, loadModel: startLoad };
}
