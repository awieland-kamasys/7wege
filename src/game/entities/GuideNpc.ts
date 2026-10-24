import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { disposeObject3D } from '../utils/threeUtils';

export interface GuideNpcEntity {
  group: THREE.Group;
  update: (timeSeconds: number, playerPos: { x: number; z: number }, highlighted: boolean, dtSeconds?: number) => void;
  triggerCheers: () => void;
}

/**
 * Erstellt die 3D-Figur des Hinweisgebers (Waldhüter Arvid) direkt an der Schutzhütte.
 * Lädt das stilisierte Zwergen-Waldhüter-Modell (`/assets/models/stylized+dwarf+character+3d+model.glb`)
 * mit stimmungsvoller Idle- und Gestik-Animation.
 */
export function createGuideNpc(onMeshLoaded?: (object: THREE.Object3D) => void): GuideNpcEntity {
  const group = new THREE.Group();
  group.name = 'GuideNpc';

  // Unsichtbare Hitbox für sofortige Klickbarkeit und Raycasting
  const hitboxMat = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const hitbox = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 1.65, 12), hitboxMat);
  hitbox.position.y = 0.825;
  hitbox.userData = { interactableType: 'npc' };
  group.add(hitbox);

  // Dezenter Platzhalter während des Ladens
  const fallbackGroup = new THREE.Group();
  const fallbackMat = new THREE.MeshStandardMaterial({
    color: 0x2d4a32,
    roughness: 0.85,
    flatShading: true,
  });
  const fallbackBody = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.42, 1.25, 10), fallbackMat);
  fallbackBody.position.y = 0.625;
  fallbackBody.castShadow = true;
  fallbackGroup.add(fallbackBody);
  const fallbackHead = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), fallbackMat);
  fallbackHead.position.y = 1.40;
  fallbackGroup.add(fallbackHead);
  group.add(fallbackGroup);

  // Schwebender Hinweis-Kristall über Arvids Kopf (transparent und spiegelnd)
  const indicatorMat = new THREE.MeshPhysicalMaterial({
    color: 0xe2b86b,
    emissive: 0x8a6820,
    emissiveIntensity: 0.6,
    roughness: 0.08,
    metalness: 0.35,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    reflectivity: 0.95,
    transparent: true,
    opacity: 0.85,
    flatShading: true,
  });
  const indicator = new THREE.Mesh(new THREE.OctahedronGeometry(0.16, 0), indicatorMat);
  indicator.position.y = 1.82;
  indicator.userData = { interactableType: 'npc' };
  group.add(indicator);

  // Materialien des geladenen GLB-Modells für den Hover-Effekt sammeln
  const modelMaterials: THREE.MeshStandardMaterial[] = [];

  let mixer: THREE.AnimationMixer | null = null;
  let waitAction: THREE.AnimationAction | null = null;
  let cheerAction: THREE.AnimationAction | null = null;

  const triggerCheers = () => {
    if (cheerAction && waitAction) {
      cheerAction.reset();
      cheerAction.setLoop(THREE.LoopOnce, 1);
      cheerAction.clampWhenFinished = true;
      cheerAction.play();
      cheerAction.crossFadeFrom(waitAction, 0.25, true);
      setTimeout(() => {
        if (waitAction && cheerAction) {
          waitAction.reset();
          waitAction.play();
          waitAction.crossFadeFrom(cheerAction, 0.35, true);
        }
      }, 3500);
    }
  };

  const loader = new GLTFLoader();
  loader.load(
    '/assets/models/stylized+dwarf+character+3d+model.glb',
    (gltf) => {
      const model = gltf.scene;

      // Skalierung: Originalmodell ist 1.00m hoch -> Skalierung auf 1.52 für stämmige Zwergen-Statur (~1.52m)
      model.scale.setScalar(1.52);

      // Berechne Bounding Box, damit die Fußsohlen exakt auf Bodenniveau (y = 0) stehen
      model.updateMatrixWorld(true);
      const bounds = new THREE.Box3().setFromObject(model);
      model.position.set(0, -bounds.min.y, 0);

      model.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          mesh.userData = { interactableType: 'npc' };

          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
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

      // Animationen einrichten
      if (gltf.animations && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(model);

        const clipWait =
          gltf.animations.find((a) => a.name.toLowerCase().includes('wait')) ??
          gltf.animations[4] ??
          gltf.animations[0];
        if (clipWait) {
          waitAction = mixer.clipAction(clipWait);
          waitAction.setLoop(THREE.LoopRepeat, Infinity);
          waitAction.play();
        }

        const clipCheer =
          gltf.animations.find((a) => a.name.toLowerCase().includes('clap')) ??
          gltf.animations.find((a) => a.name.toLowerCase().includes('agree')) ??
          gltf.animations[5];
        if (clipCheer) {
          cheerAction = mixer.clipAction(clipCheer);
        }
      }

      group.remove(fallbackGroup);
      disposeObject3D(fallbackGroup);
      group.add(model);
    },
    undefined,
    (err) => {
      console.warn('Waldhüter Arvid GLB konnte nicht geladen werden, nutze Platzhalter:', err);
    }
  );

  let lastTimeSeconds = 0;

  const update = (
    timeSeconds: number,
    playerPos: { x: number; z: number },
    highlighted: boolean,
    dtSeconds?: number
  ) => {
    const delta = dtSeconds !== undefined ? dtSeconds : Math.max(0.001, Math.min(0.1, timeSeconds - lastTimeSeconds));
    lastTimeSeconds = timeSeconds;

    if (mixer) {
      mixer.update(delta);
    }

    // Sanftes Schweben und Rotieren des Kristalls
    indicator.position.y = 1.82 + Math.sin(timeSeconds * 2.6) * 0.06;
    indicator.rotation.y = timeSeconds * 1.3;

    // Arvid wendet sich ruhig der spielenden Person zu, wenn diese in der Nähe ist
    const dx = playerPos.x - group.position.x;
    const dz = playerPos.z - group.position.z;
    const dist = Math.hypot(dx, dz);
    if (dist < 7.5 && dist > 0.1) {
      const targetAngle = Math.atan2(dx, dz);
      group.rotation.y = targetAngle;
    }

    // Hervorhebung bei Mouseover / Dialogaktivität
    indicatorMat.emissiveIntensity = highlighted ? 1.25 : 0.6;
    const indScale = highlighted ? 1.22 : 1.0;
    indicator.scale.set(indScale, indScale, indScale);

    const emissiveHex = highlighted ? 0x243b22 : 0x000000;
    for (const mat of modelMaterials) {
      mat.emissive.setHex(emissiveHex);
      mat.emissiveIntensity = highlighted ? 0.35 : 0.0;
    }
  };

  return { group, update, triggerCheers };
}
