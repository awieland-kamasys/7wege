import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export interface LumberjackCampEntity {
  group: THREE.Group;
  update: (elapsedSeconds: number) => void;
}

/**
 * Erstellt die 3D-Lagerfeuerszene (Campfire Scene) auf der Waldlichtung am Ende des 4. Weges:
 * - Lädt das detailreiche 3D-Modell `/assets/models/wooden camp scene 3d model.glb`
 * - Harmonische Skalierung (Faktor 6.5) für eine vollständige Holzfäller-Lagerszene
 * - Präzise Ausrichtung am Geländeniveau (min.y = 0)
 * - Wärmendes, flackerndes Punktlicht im Zentrum des Lagers
 */
export function createLumberjackCamp(
  onMeshLoaded?: (object: THREE.Object3D) => void
): LumberjackCampEntity {
  const group = new THREE.Group();
  group.name = 'LumberjackCamp';

  // Temporärer dezenter Platzhalter während des GLB-Ladens
  const placeholderMat = new THREE.MeshStandardMaterial({
    color: 0x5a3e26,
    roughness: 0.9,
  });
  const placeholder = new THREE.Mesh(
    new THREE.CylinderGeometry(2.4, 2.6, 0.25, 16),
    placeholderMat
  );
  placeholder.position.y = 0.125;
  placeholder.userData = { interactableType: 'lumber_camp' };
  group.add(placeholder);

  // Wärmendes, lebendig flackerndes Lagerfeuerlicht über der Feuerstelle
  const fireLight = new THREE.PointLight(0xff7a29, 1.45, 10.5);
  fireLight.position.set(0, 0.75, 0);
  group.add(fireLight);

  // Lade das Camp-Scene-Modell
  const loader = new GLTFLoader();
  loader.load(
    '/assets/models/wooden camp scene 3d model.glb',
    (gltf) => {
      const model = gltf.scene;

      // 1. Gleichmäßiges Upscaling: Originalgröße ~1.0m wird auf 6.5m vergrößert
      model.scale.setScalar(6.5);

      // 2. Passgenaue Ausrichtung am terrassierten Geländerelief:
      // Ein minimales Einsinken um 4 cm verankert alle Baumstämme, Pfähle,
      // Kisten und Zelte bündig und fest in der Grasnarbe des ansteigenden Bodens.
      model.updateMatrixWorld(true);
      model.position.set(0, -0.04, 0);

      // 3. Schatten und Interaktivität für alle Meshes
      model.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          mesh.userData = { interactableType: 'lumber_camp' };

          if (mesh.material && 'roughness' in mesh.material) {
            const mat = mesh.material as THREE.MeshStandardMaterial;
            mat.roughness = 0.82;
            mat.metalness = 0.08;
          }

          if (onMeshLoaded) {
            onMeshLoaded(mesh);
          }
        }
      });

      // Platzhalter entfernen und fertiges Modell einsetzen
      group.remove(placeholder);
      placeholder.geometry.dispose();
      placeholderMat.dispose();
      group.add(model);
    },
    undefined,
    (err) => {
      console.warn('Holzfällercamp-Modell konnte nicht geladen werden, nutze Platzhalter:', err);
    }
  );

  const update = (elapsedSeconds: number): void => {
    // Sanftes, natürliches Flackern des Lagerfeuers
    const flicker =
      0.88 +
      0.12 * Math.sin(elapsedSeconds * 7.5) +
      0.06 * Math.cos(elapsedSeconds * 13.2);
    fireLight.intensity = 1.35 * flicker;
  };

  return { group, update };
}
