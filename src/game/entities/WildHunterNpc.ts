import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { disposeObject3D } from '../utils/threeUtils';

export interface WildHunterNpcEntity {
  group: THREE.Group;
  update: (
    elapsedSeconds: number,
    playerPos: { x: number; z: number },
    isHighlighted: boolean
  ) => void;
}

/**
 * Erstellt die 3D-Figur "Der Wilde Jäger" an der Jagdhütte auf Weg 6:
 * Lädt das 3D-Modell `/assets/models/hooded forest ranger 3d model.glb`
 * mit Kapuze, Waldläufer-Gewandung, Lederstiefeln und Ausrüstung.
 */
export function createWildHunterNpc(
  onMeshLoaded?: (mesh: THREE.Mesh) => void
): WildHunterNpcEntity {
  const group = new THREE.Group();
  group.name = 'WildHunterNpc';

  // 1. Schwebender waldgrüner Gesprächs-Kristall über dem Kopf
  const indicatorMat = new THREE.MeshStandardMaterial({
    color: 0x48b846,
    emissive: 0x1f661e,
    emissiveIntensity: 0.65,
    roughness: 0.2,
    metalness: 0.3,
  });
  const indicator = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.15, 0),
    indicatorMat
  );
  indicator.position.y = 2.08;
  group.add(indicator);

  // 2. Temporäre dezente Platzhalter-Geometrie während des Ladens des GLB-Modells
  const fallbackGroup = new THREE.Group();
  const fallbackMat = new THREE.MeshStandardMaterial({
    color: 0x2d4f29,
    roughness: 0.85,
  });
  const fallbackBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.24, 0.36, 1.45, 8),
    fallbackMat
  );
  fallbackBody.position.y = 0.725;
  fallbackBody.castShadow = true;
  fallbackBody.userData = { interactableType: 'wild_hunter' };
  fallbackGroup.add(fallbackBody);
  group.add(fallbackGroup);

  // Gespeicherte Materialien des geladenen GLB-Modells für den Hover-Effekt
  const modelMaterials: THREE.MeshStandardMaterial[] = [];

  // 3. Lade das GLB-Modell des Waldläufers (Hooded Forest Ranger)
  const loader = new GLTFLoader();
  loader.load(
    '/assets/models/hooded forest ranger 3d model.glb',
    (gltf) => {
      const model = gltf.scene;

      // Skalierung: Originalmodell ist 1.00m hoch -> 1.80x für stattliche Körpergröße des Jägers
      model.scale.setScalar(1.80);

      // Bounding-Box berechnen und Modell passgenau auf Bodenniveau (y = 0) aufsetzen
      model.updateMatrixWorld(true);
      const bounds = new THREE.Box3().setFromObject(model);
      model.position.set(0, -bounds.min.y, 0);

      model.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          mesh.userData = { interactableType: 'wild_hunter' };

          const mats = Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material];
          for (const mat of mats) {
            if (mat && 'emissive' in mat) {
              const stdMat = mat as THREE.MeshStandardMaterial;
              stdMat.roughness = 0.82;
              modelMaterials.push(stdMat);
            }
          }

          if (onMeshLoaded) {
            onMeshLoaded(mesh);
          }
        }
      });

      // Platzhalter entfernen und echtes Modell hinzufügen
      group.remove(fallbackGroup);
      disposeObject3D(fallbackGroup);
      group.add(model);
    },
    undefined,
    (err) => {
      console.warn('Wilde Jäger 3D-Modell konnte nicht geladen werden, verwende Platzhalter:', err);
    }
  );

  const update = (
    elapsedSeconds: number,
    playerPos: { x: number; z: number },
    isHighlighted: boolean
  ): void => {
    // Kristall-Animation
    indicator.position.y = 2.08 + Math.sin(elapsedSeconds * 2.6) * 0.06;
    indicator.rotation.y = elapsedSeconds * 1.4;

    indicatorMat.emissiveIntensity = isHighlighted ? 1.25 : 0.65;
    const scale = isHighlighted ? 1.25 : 1.0;
    indicator.scale.set(scale, scale, scale);

    // Hover-Hervorhebung auf den Modell-Materialien
    if (modelMaterials.length > 0) {
      const targetEmissive = isHighlighted ? 0x2d5a32 : 0x000000;
      const targetIntensity = isHighlighted ? 0.45 : 0.0;
      for (const mat of modelMaterials) {
        mat.emissive.setHex(targetEmissive);
        mat.emissiveIntensity = targetIntensity;
      }
    }

    // Jäger dreht sich zum Spieler, wenn dieser nahe herantritt,
    // ansonsten blickt er entschlossen zum Holzweibchen (-42.6, 23.2)
    const dxPlayer = playerPos.x - group.position.x;
    const dzPlayer = playerPos.z - group.position.z;
    const distPlayer = Math.hypot(dxPlayer, dzPlayer);

    if (distPlayer < 8.5 && distPlayer > 0.1) {
      group.rotation.y = Math.atan2(dxPlayer, dzPlayer);
    } else {
      // Blickrichtung zum Holzweibchen am Kräutergartenzaun
      const targetAngle = Math.atan2(-42.6 - group.position.x, 23.2 - group.position.z);
      group.rotation.y = targetAngle;
    }
  };

  return { group, update };
}
