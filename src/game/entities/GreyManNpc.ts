import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { disposeObject3D } from '../utils/threeUtils';

export interface GreyManNpcEntity {
  group: THREE.Group;
  update: (
    timeSeconds: number,
    playerPos: { x: number; z: number },
    highlighted: boolean,
    dtSeconds?: number
  ) => void;
  loadModel?: () => void;
}

/**
 * Erstellt die 3D-Figur des „Graumännchens“ vor dem Höhleneingang am Ende des 1. Weges.
 * Lädt das stilisierte Zauberer-Modell (`/assets/models/stylized+wizard+3d+model.glb`)
 * mit lebendiger Idle- und Verbeugungs-Animation.
 */
export function createGreyManNpc(options?: { loadDelayMs?: number; lazy?: boolean }): GreyManNpcEntity {
  const group = new THREE.Group();
  group.name = 'GreyManNpc';

  // Unsichtbarer Kollisions- und Klick-Zylinder für schnelles, sofortiges Raycasting
  const hitboxMat = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const hitbox = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 1.7, 12), hitboxMat);
  hitbox.position.y = 0.85;
  hitbox.userData = { interactableType: 'grey_man' };
  group.add(hitbox);

  // Dezenter Platzhalter während des kurzen Ladevorgangs
  const fallbackGroup = new THREE.Group();
  const cloakMat = new THREE.MeshStandardMaterial({
    color: 0x687078,
    roughness: 0.85,
  });
  const fallbackCloak = new THREE.Mesh(new THREE.ConeGeometry(0.38, 1.2, 10), cloakMat);
  fallbackCloak.position.y = 0.6;
  fallbackCloak.castShadow = true;
  fallbackGroup.add(fallbackCloak);
  group.add(fallbackGroup);

  // Gespeicherte Materialien des geladenen GLB-Modells für den Hover-Leuchteffekt
  const modelMaterials: THREE.MeshStandardMaterial[] = [];

  let mixer: THREE.AnimationMixer | null = null;
  let waitAction: THREE.AnimationAction | null = null;
  let bowAction: THREE.AnimationAction | null = null;

  let isLoadedOrLoading = false;
  const startLoad = (): void => {
    if (isLoadedOrLoading) return;
    isLoadedOrLoading = true;

    const loader = new GLTFLoader();
    loader.load(
      '/assets/models/stylized+wizard+3d+model.glb',
      (gltf) => {
        const model = gltf.scene;
        // Skalierung: Originalmodell ist 1.00m hoch -> 1.65m für würdevolle Magier-Statur
        model.scale.setScalar(1.65);

        // Fußsohlen exakt bündig auf Bodenniveau (y = 0) aufsetzen
        model.updateMatrixWorld(true);
        const bounds = new THREE.Box3().setFromObject(model);
        model.position.set(0, -bounds.min.y, 0);

        model.traverse((child) => {
          const mesh = child as THREE.Mesh;
          if (mesh.isMesh) {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.userData = { interactableType: 'grey_man' };

            const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            for (const mat of mats) {
              if (mat && 'emissive' in mat) {
                modelMaterials.push(mat as THREE.MeshStandardMaterial);
              }
            }
          }
        });

        // Animationen vorbereiten
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);

          const clipWait =
            gltf.animations.find((a) => a.name.toLowerCase().includes('wait')) ??
            gltf.animations[1] ??
            gltf.animations[0];
          if (clipWait) {
            waitAction = mixer.clipAction(clipWait);
            waitAction.setLoop(THREE.LoopRepeat, Infinity);
            waitAction.play();
          }

          const clipBow = gltf.animations.find((a) => a.name.toLowerCase().includes('bow'));
          if (clipBow) {
            bowAction = mixer.clipAction(clipBow);
          }
        }

        group.remove(fallbackGroup);
        disposeObject3D(fallbackGroup);
        group.add(model);
      },
      undefined,
      (err) => {
        console.warn('Graumännchen-GLB konnte nicht geladen werden, nutze Platzhalter:', err);
      }
    );
  };

  if (!options?.lazy) {
    if (options?.loadDelayMs && options.loadDelayMs > 0) {
      setTimeout(startLoad, options.loadDelayMs);
    } else {
      startLoad();
    }
  }

  const silverCrystalMat = new THREE.MeshStandardMaterial({
    color: 0xcfe4f5,
    emissive: 0x4d7699,
    emissiveIntensity: 0.85,
    roughness: 0.2,
    metalness: 0.5,
  });

  // Schwebendes Silbererz-Symbol über dem Kopf des Graumännchens
  const indicator = new THREE.Mesh(new THREE.OctahedronGeometry(0.16, 0), silverCrystalMat);
  indicator.position.y = 1.95;
  indicator.userData = { interactableType: 'grey_man' };
  group.add(indicator);

  const softSilverLight = new THREE.PointLight(0x9ec5e8, 0.95, 5.0);
  softSilverLight.position.set(0, 1.85, 0.45);
  group.add(softSilverLight);

  let lastTimeSeconds = 0;
  let wasHighlighted = false;

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

    // Höfliche Verbeugung bei Beginn des Dialogs
    if (highlighted && !wasHighlighted && bowAction && waitAction) {
      bowAction.reset();
      bowAction.setLoop(THREE.LoopOnce, 1);
      bowAction.clampWhenFinished = true;
      bowAction.play();
      bowAction.crossFadeFrom(waitAction, 0.25, true);
      setTimeout(() => {
        if (waitAction && bowAction) {
          waitAction.reset();
          waitAction.play();
          waitAction.crossFadeFrom(bowAction, 0.35, true);
        }
      }, 4500);
    }
    wasHighlighted = highlighted;

    indicator.position.y = 1.95 + Math.sin(timeSeconds * 2.5 + 1.0) * 0.07;
    indicator.rotation.y = -timeSeconds * 1.3;

    const dx = playerPos.x - group.position.x;
    const dz = playerPos.z - group.position.z;
    const dist = Math.hypot(dx, dz);
    if (dist < 8.0 && dist > 0.1) {
      group.rotation.y = Math.atan2(dx, dz);
    }

    const emissiveHex = highlighted ? 0x26384a : 0x000000;
    for (const mat of modelMaterials) {
      mat.emissive.setHex(emissiveHex);
    }
    silverCrystalMat.emissive.setHex(highlighted ? 0x8bc4f2 : 0x4d7699);
  };

  return { group, update, loadModel: startLoad };
}
