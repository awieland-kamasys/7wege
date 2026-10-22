import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { disposeObject3D } from '../utils/threeUtils';

export interface NixieNpcEntity {
  group: THREE.Group;
  update: (timeSeconds: number, playerPos: { x: number; z: number }, highlighted: boolean) => void;
}

/**
 * Erstellt die 3D-Figur der Nixe / Meerjungfrau im Waldteich am Ende des 2. Weges.
 * Lädt das detaillierte 3D-Modell `mermaid 3d model.glb` (`mermaid.glb`).
 */
export function createNixieNpc(
  onMeshLoaded?: (mesh: THREE.Object3D) => void,
  options?: { loadDelayMs?: number }
): NixieNpcEntity {
  const group = new THREE.Group();
  group.name = 'NixieNpc';

  // Unsichtbare Hitbox für zuverlässiges Anklicken (auch vom Ufer aus)
  const hitboxMat = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const hitbox = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.85, 2.2, 12), hitboxMat);
  hitbox.position.y = 1.0;
  hitbox.userData = { interactableType: 'nixie' };
  group.add(hitbox);

  // Schwebendes Nixen-Kristallsymbol über ihrem Kopf zur Signalisierung der Interaktionsbereitschaft
  const indicatorMat = new THREE.MeshStandardMaterial({
    color: 0x6ef2e6,
    emissive: 0x1ca89c,
    emissiveIntensity: 0.9,
    roughness: 0.2,
    metalness: 0.4,
  });
  const indicator = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), indicatorMat);
  indicator.position.y = 2.25;
  indicator.userData = { interactableType: 'nixie' };
  group.add(indicator);

  const nixieLight = new THREE.PointLight(0x5ce6d8, 1.2, 5.5);
  nixieLight.position.set(0, 1.6, 0.3);
  group.add(nixieLight);

  // Inhaltsgruppe für das 3D-Modell der Meerjungfrau
  const modelGroup = new THREE.Group();
  group.add(modelGroup);

  // Temporärer dezenter Platzhalter während des Modell-Ladens
  const fallback = new THREE.Group();
  const fallbackMat = new THREE.MeshStandardMaterial({
    color: 0x2ba598,
    roughness: 0.4,
    metalness: 0.2,
  });
  const fallbackMesh = new THREE.Mesh(new THREE.CapsuleGeometry(0.28, 0.9, 8, 12), fallbackMat);
  fallbackMesh.position.y = 0.8;
  fallbackMesh.userData = { interactableType: 'nixie' };
  fallback.add(fallbackMesh);
  modelGroup.add(fallback);

  const mermaidMaterials: THREE.MeshStandardMaterial[] = [];

  const startLoad = (): void => {
    const loader = new GLTFLoader();
    const mermaidUrl = '/assets/models/mermaid.glb';

    loader.load(
      mermaidUrl,
      (gltf) => {
        const model = gltf.scene;

        // Auf natürliche Lebensgröße skalieren (Höhe ca. 2.0m)
        model.scale.set(2.0, 2.0, 2.0);

        // Bodenkontakt anpassen, sodass die Schwanzflosse sanft im Wasser schwimmt
        model.updateMatrixWorld(true);
        const bounds = new THREE.Box3().setFromObject(model);
        model.position.set(0, -bounds.min.y + 0.05, 0);

        model.traverse((child) => {
          const mesh = child as THREE.Mesh;
          if (mesh.isMesh) {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.userData = { interactableType: 'nixie' };

            if (mesh.material && 'roughness' in mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = 0.65;
              mat.metalness = 0.15;
              mermaidMaterials.push(mat);
            }

            if (onMeshLoaded) {
              onMeshLoaded(mesh);
            }
          }
        });

        modelGroup.remove(fallback);
        disposeObject3D(fallback);
        modelGroup.add(model);
      },
      undefined,
      (err) => {
        console.warn('Meerjungfrauen-Modell mermaid.glb konnte nicht geladen werden, nutze Platzhalter:', err);
      }
    );
  };

  if (options?.loadDelayMs && options.loadDelayMs > 0) {
    setTimeout(startLoad, options.loadDelayMs);
  } else {
    startLoad();
  }

  // Standardmäßig blickt die Nixe nach Westen (-X) zum Ufer von Weg 2
  group.rotation.y = -Math.PI / 2;

  const update = (
    timeSeconds: number,
    playerPos: { x: number; z: number },
    highlighted: boolean
  ) => {
    // Sanftes, natürliches Wiegen und Wogen der Meerjungfrau im Teichwasser
    modelGroup.position.y = Math.sin(timeSeconds * 1.8) * 0.035;
    modelGroup.rotation.z = Math.sin(timeSeconds * 1.2) * 0.015;

    // Schwebendes Indikator-Symbol über dem Kopf sanft pulsieren lassen
    indicator.position.y = 2.25 + Math.sin(timeSeconds * 2.4) * 0.06;
    indicator.rotation.y = timeSeconds * 1.4;

    // Wenn sich die Spielfigur nähert, wendet sich die Meerjungfrau ihr aufmerksam zu
    const dx = playerPos.x - group.position.x;
    const dz = playerPos.z - group.position.z;
    const dist = Math.hypot(dx, dz);
    if (dist < 12.0 && dist > 0.1) {
      group.rotation.y = Math.atan2(dx, dz);
    }

    // Hover- und Dialog-Highlighting
    const highlightGlow = highlighted ? 0x1f5c54 : 0x000000;
    for (const mat of mermaidMaterials) {
      mat.emissive.setHex(highlightGlow);
    }
    indicatorMat.emissive.setHex(highlighted ? 0x8afff6 : 0x1ca89c);
    nixieLight.intensity = highlighted ? 1.6 : 1.1;
  };

  return { group, update };
}
