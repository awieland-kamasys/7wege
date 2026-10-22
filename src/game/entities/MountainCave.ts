import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { disposeObject3D } from '../utils/threeUtils';

/**
 * Erstellt die 3D-Szenerie am Ende des 1. Weges (Bergpfad / Mine):
 * - Lädt das schneebedeckte Minen-Stollen-Modell (`/assets/models/snowy mine tunnel 3d model.glb`)
 *   mit hölzernem Stollenportal, Felsformationen und tiefem Stollenschlund.
 * - Die Öffnung des Tunnels zeigt exakt nach vorn (+Z) und wird über die Szenen-Rotation
 *   direkt auf den heraufführenden Weg und den Betrachter ausgerichtet.
 * - Im Inneren des Stollens glimmt ein warmes Grubenlaternen-Licht, flankiert von funkelnden Silbererzen.
 */
export function createMountainCave(onMeshLoaded?: (mesh: THREE.Mesh) => void): THREE.Group {
  const group = new THREE.Group();
  group.name = 'MountainCave';

  const rockMatDark = new THREE.MeshStandardMaterial({
    color: 0x3b4248,
    roughness: 0.94,
    flatShading: true,
  });
  const caveDarkMat = new THREE.MeshBasicMaterial({
    color: 0x040608,
  });
  const silverVeinMat = new THREE.MeshStandardMaterial({
    color: 0xd8ecff,
    metalness: 0.88,
    roughness: 0.2,
    emissive: 0x315270,
    emissiveIntensity: 0.75,
  });

  // Temporärer dezenter Platzhalter während des GLB-Ladevorgangs
  const fallback = new THREE.Group();
  const fallbackArch = new THREE.Mesh(
    new THREE.BoxGeometry(4.2, 3.6, 2.5),
    rockMatDark
  );
  fallbackArch.position.set(0, 1.8, 0);
  fallbackArch.castShadow = true;
  fallbackArch.receiveShadow = true;
  fallbackArch.userData = { interactableType: 'cave' };
  fallback.add(fallbackArch);
  group.add(fallback);

  // 1. Lade das detaillierte 3D-Modell des schneebedeckten Minentunnels
  const loader = new GLTFLoader();
  loader.load(
    '/assets/models/snowy mine tunnel 3d model.glb',
    (gltf) => {
      const model = gltf.scene;

      // Skalierung: Faktor 8.5 erzeugt ein stattliches, monumentales Stollenportal
      // (Breite ~8.5m, Höhe ~5.2m, Durchgangshöhe ~3.4m)
      model.scale.setScalar(8.5);

      // Modell exakt auf Bodenniveau (y = 0) aufsetzen
      model.updateMatrixWorld(true);
      const bounds = new THREE.Box3().setFromObject(model);
      model.position.set(0, -bounds.min.y, 0);

      model.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          mesh.userData = { interactableType: 'cave' };

          // Optimale Materialabstimmung für rauen Fels, Holzstützen und Schnee
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

      // Platzhalter entfernen und fertiges Minenmodell einfügen
      group.remove(fallback);
      disposeObject3D(fallback);
      group.add(model);
    },
    undefined,
    (err) => {
      console.warn('Minenmodell snowy mine tunnel 3d model.glb konnte nicht geladen werden:', err);
    }
  );

  // 2. Tiefschwarzer Hintergrund im Inneren des Tunnels für echte Tiefenwirkung (kein Durchscheinen)
  const tunnelBacking = new THREE.Mesh(
    new THREE.PlaneGeometry(3.6, 3.8),
    caveDarkMat
  );
  tunnelBacking.position.set(0, 1.9, -1.8);
  group.add(tunnelBacking);

  // 3. Warmes, atmosphärisches Grubenlicht aus der Tiefe des Minenstollens
  const mineInteriorLight = new THREE.PointLight(0xffaa44, 1.25, 8.5);
  mineInteriorLight.position.set(0.3, 2.1, 0.4);
  group.add(mineInteriorLight);

  // 4. Funkelnde Silbererz-Drusen an den Felsrändern des Stolleneingangs
  for (const [vx, vy, vz, rotZ] of [
    [-1.85, 1.45, 1.85, 0.3],
    [-2.1, 1.95, 1.6, -0.4],
    [1.95, 1.35, 1.8, -0.25],
    [1.75, 2.35, 1.5, 0.5],
  ]) {
    const vein = new THREE.Mesh(new THREE.OctahedronGeometry(0.24, 0), silverVeinMat);
    vein.position.set(vx, vy, vz);
    vein.scale.set(1.5, 0.7, 0.8);
    vein.rotation.z = rotZ;
    vein.userData = { interactableType: 'cave' };
    group.add(vein);
  }

  // Alle statischen Meshes für Raycasting markieren
  group.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.userData = { interactableType: 'cave' };
    }
  });

  return group;
}
