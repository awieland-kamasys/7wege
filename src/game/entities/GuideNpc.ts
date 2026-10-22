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
 * Lädt das Low-Poly-Charaktermodell (`/assets/models/arvid.glb`) und behält
 * den charakteristischen, schwebenden Hinweis-Marker über dem Kopf bei.
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
  const hitbox = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 1.85, 12), hitboxMat);
  hitbox.position.y = 0.925;
  hitbox.userData = { interactableType: 'npc' };
  group.add(hitbox);

  // Dezenter Platzhalter während des Ladens
  const fallbackGroup = new THREE.Group();
  const fallbackMat = new THREE.MeshStandardMaterial({
    color: 0x2d4a32,
    roughness: 0.85,
    flatShading: true,
  });
  const fallbackBody = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.42, 1.35, 10), fallbackMat);
  fallbackBody.position.y = 0.68;
  fallbackBody.castShadow = true;
  fallbackGroup.add(fallbackBody);
  const fallbackHead = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), fallbackMat);
  fallbackHead.position.y = 1.5;
  fallbackGroup.add(fallbackHead);
  group.add(fallbackGroup);

  // Schwebender Hinweis-Kristall über Arvids Kopf (Marker bleibt exakt gleich)
  const indicatorMat = new THREE.MeshStandardMaterial({
    color: 0xe2b86b,
    emissive: 0x8a6820,
    emissiveIntensity: 0.6,
    roughness: 0.25,
    metalness: 0.2,
  });
  const indicator = new THREE.Mesh(new THREE.OctahedronGeometry(0.16, 0), indicatorMat);
  indicator.position.y = 2.08;
  indicator.userData = { interactableType: 'npc' };
  group.add(indicator);

  // Materialien des geladenen GLB-Modells für den Hover-Effekt sammeln
  const modelMaterials: THREE.MeshStandardMaterial[] = [];

  // Knochen für prozedurale Animation (Atmung, Kopfneigung, Zuprosten mit Bierflasche)
  let spineBone: THREE.Bone | null = null;
  let headBone: THREE.Bone | null = null;
  let rightArmBone: THREE.Bone | null = null;
  let rightForeArmBone: THREE.Bone | null = null;

  const initialSpineRot = new THREE.Euler();
  const initialHeadRot = new THREE.Euler();
  const initialRightArmRot = new THREE.Euler();
  const initialRightForeArmRot = new THREE.Euler();

  let loadedModel: THREE.Group | null = null;
  let baseModelY = 0;

  const cheersDuration = 1.6;
  let cheersTimer = 0;

  const triggerCheers = () => {
    cheersTimer = cheersDuration;
  };

  const loader = new GLTFLoader();
  loader.load(
    '/assets/models/arvid.glb',
    (gltf) => {
      const model = gltf.scene;
      loadedModel = model;
      // Modellhöhe im Rohzustand ca. 0.98m -> Skalierung auf 1.88 für Lebensgröße (~1.85m)
      model.scale.setScalar(1.88);

      // Berechne Bounding Box, damit die Fußsohlen exakt auf Bodenniveau (y = 0) stehen
      model.updateMatrixWorld(true);
      const bounds = new THREE.Box3().setFromObject(model);
      baseModelY = -bounds.min.y;
      model.position.set(0, baseModelY, 0);

      const toRemove: THREE.Object3D[] = [];
      model.traverse((child) => {
        // Studio-Boden und Test-Würfel aus der Modellierungsdatei entfernen
        if (child.name === 'Studio_Boden' || child.name === 'Cube') {
          toRemove.push(child);
          return;
        }

        // Knochen für prozedurales Rigging erfassen
        if ((child as THREE.Bone).isBone) {
          const bone = child as THREE.Bone;
          const lower = bone.name.toLowerCase();
          if (lower.includes('spine') && !spineBone) {
            spineBone = bone;
            initialSpineRot.copy(bone.rotation);
          } else if (lower.includes('head') && !headBone) {
            headBone = bone;
            initialHeadRot.copy(bone.rotation);
          } else if ((lower.includes('rightarm') || lower.includes('right_arm')) && !rightArmBone) {
            rightArmBone = bone;
            initialRightArmRot.copy(bone.rotation);
          } else if ((lower.includes('rightforearm') || lower.includes('right_forearm')) && !rightForeArmBone) {
            rightForeArmBone = bone;
            initialRightForeArmRot.copy(bone.rotation);
          }
        }

        const mesh = child as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          mesh.userData = { interactableType: 'npc' };

          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          for (const mat of mats) {
            if (mat && 'emissive' in mat) {
              modelMaterials.push(mat as THREE.MeshStandardMaterial);
            }
          }
          if (onMeshLoaded) {
            onMeshLoaded(mesh);
          }
        }
      });

      for (const obj of toRemove) {
        obj.removeFromParent();
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

    if (cheersTimer > 0) {
      cheersTimer = Math.max(0, cheersTimer - delta);
    }

    // Sanftes Schweben und Rotieren des Kristalls
    indicator.position.y = 2.08 + Math.sin(timeSeconds * 2.6) * 0.06;
    indicator.rotation.y = timeSeconds * 1.3;

    // Arvid wendet sich ruhig der spielenden Person zu, wenn diese in der Nähe ist
    const dx = playerPos.x - group.position.x;
    const dz = playerPos.z - group.position.z;
    const dist = Math.hypot(dx, dz);
    if (dist < 7.5 && dist > 0.1) {
      const targetAngle = Math.atan2(dx, dz);
      group.rotation.y = targetAngle;
    }

    // Animation entfernt: Arvid steht vollkommen ruhig, stabil und standfest auf dem Boden
    if (loadedModel) {
      loadedModel.position.set(0, baseModelY, 0);
      loadedModel.rotation.set(0, 0, 0);
    }

    // Knochen bleiben in ihrer natürlichen Ursprungsausrichtung
    if (spineBone) {
      spineBone.rotation.copy(initialSpineRot);
    }
    if (headBone) {
      headBone.rotation.copy(initialHeadRot);
    }
    if (rightArmBone) {
      rightArmBone.rotation.copy(initialRightArmRot);
    }
    if (rightForeArmBone) {
      rightForeArmBone.rotation.copy(initialRightForeArmRot);
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
