import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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

    // Arvid wendet sich der spielenden Person zu, wenn diese in der Nähe ist
    const dx = playerPos.x - group.position.x;
    const dz = playerPos.z - group.position.z;
    const dist = Math.hypot(dx, dz);
    if (dist < 7.5 && dist > 0.1) {
      const targetAngle = Math.atan2(dx, dz);
      group.rotation.y = targetAngle;
    }

    // 1. Lebendige prozedurale Ganzkörper-Animation (Atmung, Gewichtsverlagerung, Zuprosten)
    const breath = Math.sin(timeSeconds * 2.1);
    const sway = Math.cos(timeSeconds * 1.05);

    if (loadedModel) {
      // Natürlicher Atemhub (Auf- und Abfedern des Körpers)
      let targetY = baseModelY + breath * 0.024;
      let targetRotX = breath * 0.026;
      let targetRotZ = sway * 0.03;

      // Blickkontakt & Zunicken bei Annäherung / Dialog
      if (dist < 6.5) {
        const nod = Math.sin(timeSeconds * 1.6) * 0.018 + (highlighted ? 0.048 : 0.022);
        targetRotX += nod;
      }

      // Zuprosten-Trigger (Schwungvolle Begrüßung mit Flasche bei Klick oder [F])
      if (cheersTimer > 0) {
        const progress = 1.0 - cheersTimer / cheersDuration;
        const toastHop = Math.sin(progress * Math.PI); // Glatte Sinuskurve
        targetY += toastHop * 0.065; // Richtet sich schwungvoll um 6,5 cm auf
        targetRotX -= toastHop * 0.085; // Neigt sich freundlich dem Spieler zu
        targetRotZ += Math.sin(progress * Math.PI * 2) * 0.045; // Heiteres Anstoßen
      }

      loadedModel.position.y = targetY;
      loadedModel.rotation.x = targetRotX;
      loadedModel.rotation.z = targetRotZ;
    }

    // 2. Knochen-Animation (für Rigs mit aktiven Gliedmaßen-Gewichten)
    if (spineBone) {
      spineBone.rotation.x = initialSpineRot.x + breath * 0.05;
      spineBone.rotation.z = initialSpineRot.z + sway * 0.025;
    }
    if (headBone) {
      const headNod = Math.sin(timeSeconds * 2.1 + 0.3) * 0.03;
      const greetDip = highlighted ? 0.08 : 0.03;
      headBone.rotation.x = initialHeadRot.x + 0.08 + headNod + greetDip;
      headBone.rotation.y = initialHeadRot.y + Math.sin(timeSeconds * 0.8) * 0.04;
    }
    if (rightArmBone && rightForeArmBone) {
      if (cheersTimer > 0) {
        const progress = 1.0 - cheersTimer / cheersDuration;
        const lift = Math.sin(progress * Math.PI);
        rightArmBone.rotation.x = initialRightArmRot.x - lift * 0.75;
        rightArmBone.rotation.y = initialRightArmRot.y + lift * 0.2;
        rightArmBone.rotation.z = initialRightArmRot.z + lift * 0.35;
        rightForeArmBone.rotation.z = initialRightForeArmRot.z + lift * 0.5;
      } else {
        rightArmBone.rotation.x = initialRightArmRot.x + breath * 0.02;
        rightArmBone.rotation.y = initialRightArmRot.y;
        rightArmBone.rotation.z = initialRightArmRot.z;
        rightForeArmBone.rotation.z = initialRightForeArmRot.z;
      }
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
