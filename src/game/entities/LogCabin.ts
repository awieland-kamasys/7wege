import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { disposeObject3D } from '../utils/threeUtils';

/**
 * Erstellt die 3D-Schutzhütte im Zentrum der 7-Wegekreuzung.
 * Lädt das detaillierte GLB-Hüttenmodell (`/assets/models/3wege_huette.glb`),
 * skaliert es passend auf Lebensgröße und richtet es passgenau aus.
 */
export function createLogCabin(onMeshLoaded?: (object: THREE.Object3D) => void): THREE.Group {
  const group = new THREE.Group();
  group.name = 'LogCabin';

  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x573d26,
    roughness: 0.95,
  });

  // Temporärer dezenter Platzhalter während des Ladens (angepasst auf Hüttengröße)
  const fallback = new THREE.Group();
  const floor = new THREE.Mesh(new THREE.BoxGeometry(4.75, 0.25, 3.75), floorMaterial);
  floor.position.y = 0.125;
  fallback.add(floor);
  group.add(fallback);

  // Lade das detaillierte GLB-Modell der 7-Wege-Hütte (3wege_huette.glb)
  const loader = new GLTFLoader();
  loader.load(
    '/assets/models/3wege_huette.glb',
    (gltf) => {
      const model = gltf.scene;

      // 1. Skalierung: 5.64 liefert eine Hüttentiefe von 5.64m (halbe Tiefe 2.82m)
      //    und Breite von 5.14m (halbe Breite 2.57m), passend zur AABB in CrossroadsState.
      model.scale.setScalar(5.64);

      // 2. Ausrichtung: Eingang / Schilder blicken nach vorn (+Z) zur Lichtung und zu Arvid
      model.rotation.y = 0;

      // 3. Auf Bodenniveau (y = 0) und zentriert auf Z = -1.45 platzieren,
      //    damit die Vorderkante bei z = +1.37m liegt und genügend freier Korridor vor der Veranda
      //    für Schatztruhe (z = 2.0), Arvid (z = 2.05) und Wegweiser erhalten bleibt.
      model.updateMatrixWorld(true);
      const bounds = new THREE.Box3().setFromObject(model);
      model.position.set(0, -bounds.min.y, -1.45);

      model.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          mesh.userData = { interactableType: 'hut' };

          // Optimale Materialabstimmung für warme Holzoptik
          if (mesh.material && 'roughness' in mesh.material) {
            const mat = mesh.material as THREE.MeshStandardMaterial;
            mat.roughness = 0.85;
            mat.metalness = 0.05;
          }

          if (onMeshLoaded) {
            onMeshLoaded(mesh);
          }
        }
      });

      // Platzhalter entfernen und Geometrien/Materialien sauber freigeben
      group.remove(fallback);
      disposeObject3D(fallback);
      group.add(model);
    },
    undefined,
    (err) => {
      console.warn('Hüttenmodell 3wege_huette.glb konnte nicht geladen werden, nutze Platzhalter:', err);
    }
  );

  return group;
}
