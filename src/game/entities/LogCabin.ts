import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * Erstellt die 3D-Schutzhütte im Zentrum der 7-Wegekreuzung.
 * Lädt das bereinigte, texturierte GLB-Hüttenmodell (`/assets/models/hut.glb`),
 * skaliert es auf vergrößerte Lebensgröße (+25%) und richtet es passgenau aus.
 */
export function createLogCabin(onMeshLoaded?: (object: THREE.Object3D) => void): THREE.Group {
  const group = new THREE.Group();
  group.name = 'LogCabin';

  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x573d26,
    roughness: 0.95,
  });

  // Temporärer dezenter Platzhalter während des Ladens (angepasst auf +25% Hüttengröße)
  const fallback = new THREE.Group();
  const floor = new THREE.Mesh(new THREE.BoxGeometry(4.75, 0.25, 3.75), floorMaterial);
  floor.position.y = 0.125;
  fallback.add(floor);
  group.add(fallback);

  // Lade das bereinigte GLB-Modell der 7-Wege-Hütte
  const loader = new GLTFLoader();
  loader.load(
    '/assets/models/hut.glb',
    (gltf) => {
      const model = gltf.scene;

      // 1. Skalierung: um 25 Prozent vergrößert (von 5.0 auf 6.25, ca. 5.24m Breite)
      model.scale.setScalar(6.25);

      // 2. Ausrichtung: Eingang / Veranda blickt nach vorn (+Z) zur Lichtung und zu Arvid
      model.rotation.y = 0;

      // 3. Auf Bodenniveau (y = 0) und nach hinten zentrieren (-1.15m),
      //    damit die Vorderkante bei z = +1.36m liegt und genügend freier Korridor vor der Veranda
      //    für Schatztruhe (z = 2.0), Arvid (z = 2.05) und Wegweiser erhalten bleibt.
      model.updateMatrixWorld(true);
      const bounds = new THREE.Box3().setFromObject(model);
      model.position.set(0, -bounds.min.y, -1.15);

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

      // Platzhalter entfernen und fertige Hütte einhängen
      group.remove(fallback);
      group.add(model);
    },
    undefined,
    (err) => {
      console.warn('Hüttenmodell hut.glb konnte nicht geladen werden, nutze Platzhalter:', err);
    }
  );

  return group;
}
