import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { PATH_1_BOULDER_POS } from '../data/paths';
import { disposeObject3D } from '../utils/threeUtils';

export interface PathBoulderEntity {
  group: THREE.Group;
  pickableMeshes: THREE.Object3D[];
  update: (dtSeconds: number, isHovered?: boolean) => void;
  startDissolve: (onComplete?: () => void) => void;
  isDissolving: () => boolean;
  isRemoved: () => boolean;
  loadModel?: () => void;
}

/**
 * Erstellt den magisch versiegelten Felsbrocken, der Weg 1 (Silberstollen-Pfad) blockiert.
 * Lädt das detaillierte Moosfels-Modell `/assets/models/mossy rock boulder 3d model.glb`.
 * Der Felsen ist mit smaragdgrün glimmenden Kristalladern durchzogen,
 * die mit dem rotierenden Edelstein am Eingang von Weg 1 harmonieren.
 */
export function createPathBoulder(options?: { lazy?: boolean }): PathBoulderEntity {
  const group = new THREE.Group();
  group.name = 'Path1Boulder';
  group.position.set(PATH_1_BOULDER_POS.x, 0, PATH_1_BOULDER_POS.z);

  const pickableMeshes: THREE.Object3D[] = [];

  // Temporärer Platzhalter während des GLB-Ladens
  const fallbackGroup = new THREE.Group();
  const fallbackMat = new THREE.MeshLambertMaterial({
    color: 0x58564f,
    flatShading: true,
  });
  const fallbackMesh = new THREE.Mesh(new THREE.DodecahedronGeometry(1.4, 1), fallbackMat);
  fallbackMesh.position.y = 1.0;
  fallbackMesh.castShadow = true;
  fallbackMesh.receiveShadow = true;
  fallbackMesh.userData = { interactableType: 'boulder' };
  fallbackGroup.add(fallbackMesh);
  group.add(fallbackGroup);
  pickableMeshes.push(fallbackMesh);

  // Magisch glimmende Kristalladern / Runenrisse
  const runeMaterial = new THREE.MeshLambertMaterial({
    color: 0x55dd88,
    emissive: 0x22aa55,
    flatShading: true,
  });

  // Eingebettete Kristalladern (geometrisch sichtbare Kristallsegmente auf dem Felsen)
  const runeVein1 = new THREE.Mesh(new THREE.OctahedronGeometry(0.32, 0), runeMaterial);
  runeVein1.position.set(0.35, 1.25, 0.65);
  runeVein1.scale.set(0.6, 1.4, 0.5);
  runeVein1.rotation.set(0.4, 0.2, 0.6);
  runeVein1.userData = { interactableType: 'boulder' };
  group.add(runeVein1);
  pickableMeshes.push(runeVein1);

  const runeVein2 = new THREE.Mesh(new THREE.OctahedronGeometry(0.28, 0), runeMaterial);
  runeVein2.position.set(-0.4, 0.95, 0.75);
  runeVein2.scale.set(0.5, 1.2, 0.6);
  runeVein2.rotation.set(-0.3, 0.5, -0.4);
  runeVein2.userData = { interactableType: 'boulder' };
  group.add(runeVein2);
  pickableMeshes.push(runeVein2);

  // Zartes smaragdgrünes Glimmlicht
  const runeLight = new THREE.PointLight(0x55dd88, 0.85, 4.2);
  runeLight.position.set(0, 1.2, 0.5);
  group.add(runeLight);

  const modelMaterials: THREE.MeshStandardMaterial[] = [];

  // Lade das detailreiche Moosfels-Modell
  let isLoadedOrLoading = false;
  const startLoad = (): void => {
    if (isLoadedOrLoading) return;
    isLoadedOrLoading = true;

    const loader = new GLTFLoader();
    loader.load(
      '/assets/models/mossy rock boulder 3d model.glb',
      (gltf) => {
        const model = gltf.scene;

        // Skalierung: Felsbrocken auf 3.4m Breite vergrößern, um den Pfad massiv zu sperren
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
            mesh.userData = { interactableType: 'boulder' };

            if (mesh.material && 'roughness' in mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = 0.90;
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
        console.warn('Moosfelsen-Modell konnte nicht geladen werden, nutze Platzhalter:', err);
      }
    );
  };

  if (!options?.lazy) {
    startLoad();
  }

  let state: 'solid' | 'dissolving' | 'removed' = 'solid';
  let dissolveTimer = 0;
  const dissolveDuration = 1.35; // Sekunden für die Auflösungs-Animation
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

      // Sanftes Absinken in den Erdboden und Schrumpfen
      group.position.y = -progress * 2.5;
      const scale = Math.max(0.001, 1.0 - progress * 0.95);
      group.scale.set(scale, scale, scale);

      // Intensives, weiß-grünes Aufglühen während der Resonanz-Auflösung
      const glowBoost = 1.0 - Math.abs(progress - 0.3) * 1.5;
      const currentIntensity = Math.max(0.1, 2.8 * Math.max(0, glowBoost));
      runeMaterial.emissiveIntensity = currentIntensity;
      runeLight.intensity = currentIntensity * 1.6;

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

    // Zustand 'solid': Rhythmisches Atmen der Runen-Glimmung
    const pulse = 0.5 + 0.5 * Math.sin(elapsed * 2.8);
    const hoverBonus = isHovered ? 0.6 : 0;
    runeMaterial.emissiveIntensity = 0.7 + pulse * 0.45 + hoverBonus;
    runeLight.intensity = 0.75 + pulse * 0.45 + hoverBonus;
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
    loadModel: startLoad,
  };
}
