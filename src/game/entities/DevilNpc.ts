import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Vector2D } from '../systems/CrossroadsState';

export interface DevilNpcEntity {
  group: THREE.Group;
  update: (elapsedSeconds: number, playerPos: Readonly<Vector2D>, isHoveredOrActive: boolean) => void;
}

/**
 * Erstellt die 3D-Figur „Der Teufel / Dämonenkrieger“ am Ende des 5. Weges:
 * Lädt das detaillierte Modell `demon warrior 3d model.glb` (`demon-warrior.glb`),
 * skaliert ihn auf monumentale doppelte Dämonengröße (~5.2m Höhe) und stellt ihn
 * mit seinen Klauenfüßen erhaben auf die Oberfläche des zentralen Felsplateaus (Fußhöhe y = 2.35m).
 * Vollständig animiert über sein 52-Bone Mixamo-Rig (schwere Dämonenatmung,
 * lauernde Kopfbewegungen, drohend angewinkelte Klauenarme und Drohhaltung bei Interaktion).
 */
export function createDevilNpc(onMeshLoaded?: (object: THREE.Object3D) => void): DevilNpcEntity {
  const group = new THREE.Group();
  group.name = 'DevilNpc';
  group.userData = { interactableType: 'devil' };

  // Unsichtbare Zylinder-Hitbox für verlässliches Raycasting und Klickbarkeit (angepasst an 5.2m Größe und erhöhte Standposition)
  const hitMat = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const hitbox = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.4, 7.2, 12), hitMat);
  hitbox.position.y = 4.8;
  hitbox.userData = { interactableType: 'devil' };
  group.add(hitbox);

  // Temporärer Platzhalter während des Modell-Ladens
  const fallback = new THREE.Group();
  const fallbackMat = new THREE.MeshStandardMaterial({
    color: 0x660a0a,
    roughness: 0.7,
    metalness: 0.2,
  });
  const fallbackBody = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.1, 4.4, 10), fallbackMat);
  fallbackBody.position.y = 4.2;
  fallbackBody.castShadow = true;
  fallback.add(fallbackBody);
  group.add(fallback);

  // Über dem Kopf schwebender Interaktions-Kristall (feurig rot-orange, ca. 7.0m Höhe)
  const gemMat = new THREE.MeshStandardMaterial({
    color: 0xff3300,
    emissive: 0xff4400,
    emissiveIntensity: 0.95,
    roughness: 0.25,
    metalness: 0.3,
    flatShading: true,
  });

  const talkGem = new THREE.Mesh(new THREE.OctahedronGeometry(0.48, 0), gemMat);
  talkGem.scale.set(0.9, 1.45, 0.9);
  talkGem.position.y = 6.95;
  talkGem.userData = { interactableType: 'devil' };
  group.add(talkGem);

  const gemLight = new THREE.PointLight(0xff4400, 2.2, 9.5);
  gemLight.position.y = 6.95;
  group.add(gemLight);

  // Knochen des Mixamo-Rigs für lebendige prozedurale Animationen erfassen
  let spineBone: THREE.Bone | null = null;
  let spine1Bone: THREE.Bone | null = null;
  let spine2Bone: THREE.Bone | null = null;
  let neckBone: THREE.Bone | null = null;
  let headBone: THREE.Bone | null = null;
  let leftArmBone: THREE.Bone | null = null;
  let rightArmBone: THREE.Bone | null = null;
  let leftForeArmBone: THREE.Bone | null = null;
  let rightForeArmBone: THREE.Bone | null = null;

  const modelMaterials: THREE.MeshStandardMaterial[] = [];

  // Lade das Dämonenkrieger-Modell
  const loader = new GLTFLoader();
  loader.load(
    '/assets/models/demon-warrior.glb',
    (gltf) => {
      const model = gltf.scene;

      // 1. Skalierung: Doppelt so groß (5.2 statt 2.6, Gesamthöhe ~5.20m)
      model.scale.setScalar(5.2);

      // 2. Anhebung auf den Felsen des Kraters:
      // Das Modell hat seinen Ursprung in der Hüfte (min.y = -1.88m bei Skalierung 5.2).
      // Das Kraterplateau liegt bei y = 0.90m bis 1.00m.
      // Mit y = 2.88m stehen die Klauenbeine genau bei y = 1.00m und thronen
      // vollständig sichtbar oben auf der runden Felsplatte, ohne zu versinken.
      model.position.set(0, 2.88, 0);

      model.traverse((child) => {
        // Skelettknochen erfassen
        if ((child as THREE.Bone).isBone) {
          const bone = child as THREE.Bone;
          const lower = bone.name.toLowerCase();
          if (lower.includes('spine2') && !spine2Bone) {
            spine2Bone = bone;
          } else if (lower.includes('spine1') && !spine1Bone) {
            spine1Bone = bone;
          } else if (lower.includes('spine') && !spineBone) {
            spineBone = bone;
          } else if (lower.includes('neck') && !neckBone) {
            neckBone = bone;
          } else if (lower.includes('head') && !headBone) {
            headBone = bone;
          } else if ((lower.includes('leftarm') || lower.includes('left_arm')) && !leftArmBone) {
            leftArmBone = bone;
          } else if ((lower.includes('rightarm') || lower.includes('right_arm')) && !rightArmBone) {
            rightArmBone = bone;
          } else if ((lower.includes('leftforearm') || lower.includes('left_forearm')) && !leftForeArmBone) {
            leftForeArmBone = bone;
          } else if ((lower.includes('rightforearm') || lower.includes('right_forearm')) && !rightForeArmBone) {
            rightForeArmBone = bone;
          }
        }

        const mesh = child as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          mesh.userData = { interactableType: 'devil' };

          if (mesh.material && 'roughness' in mesh.material) {
            const mat = mesh.material as THREE.MeshStandardMaterial;
            modelMaterials.push(mat);
            mat.roughness = 0.65;
            mat.metalness = 0.25;
          }

          if (onMeshLoaded) {
            onMeshLoaded(mesh);
          }
        }
      });

      // Platzhalter durch das fertige Modell ersetzen
      group.remove(fallback);
      group.add(model);
    },
    undefined,
    (err) => {
      console.warn('Dämonenkrieger-Modell demon-warrior.glb konnte nicht geladen werden, nutze Platzhalter:', err);
    }
  );

  return {
    group,
    update: (elapsedSeconds: number, playerPos: Readonly<Vector2D>, isHoveredOrActive: boolean) => {
      // Blickwinkel zur Spielfigur berechnen und sanft ausrichten
      const worldPos = new THREE.Vector3();
      group.getWorldPosition(worldPos);
      const dx = playerPos.x - worldPos.x;
      const dz = playerPos.z - worldPos.z;
      const dist = Math.hypot(dx, dz);

      if (dist < 34.0) {
        const targetRotY = Math.atan2(dx, dz);
        group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetRotY, 0.05);
      }

      // Prozedurale Dämonenanimation über das Mixamo-Skelett
      const t = elapsedSeconds;
      const breathe = Math.sin(t * 1.6);
      const chestSway = Math.cos(t * 0.9);

      // Torso & Wirbelsäule: tiefe Atmung und leichtes Vor-/Zurückwiegen
      if (spineBone) {
        const threatLean = isHoveredOrActive ? -0.06 : 0;
        spineBone.rotation.x = breathe * 0.045 + threatLean;
        spineBone.rotation.y = chestSway * 0.03;
      }
      if (spine1Bone) {
        spine1Bone.rotation.x = Math.sin(t * 1.6 + 0.3) * 0.035;
      }
      if (spine2Bone) {
        spine2Bone.rotation.x = Math.sin(t * 1.6 + 0.6) * 0.03;
      }

      // Kopf & Nacken: drohendes Neigen und lauerndes Umschauen
      if (headBone) {
        const threatHead = isHoveredOrActive ? 0.08 : 0;
        headBone.rotation.x = Math.sin(t * 1.4) * 0.055 + threatHead;
        headBone.rotation.y = Math.sin(t * 0.7) * 0.075;
      }
      if (neckBone) {
        neckBone.rotation.x = Math.sin(t * 1.4) * 0.02;
      }

      // Mächtige Klauenarme: kraftvoll angewinkelt und drohend atmend
      const armThreat = isHoveredOrActive ? 0.18 : 0;
      if (leftArmBone) {
        leftArmBone.rotation.z = 0.26 + breathe * 0.04 + armThreat;
        leftArmBone.rotation.x = 0.10 + Math.cos(t * 1.2) * 0.03;
        leftArmBone.rotation.y = -0.08;
      }
      if (leftForeArmBone) {
        leftForeArmBone.rotation.z = 0.32 + armThreat * 0.5;
        leftForeArmBone.rotation.x = 0.12;
      }
      if (rightArmBone) {
        rightArmBone.rotation.z = -0.26 - breathe * 0.04 - armThreat;
        rightArmBone.rotation.x = 0.10 + Math.cos(t * 1.2) * 0.03;
        rightArmBone.rotation.y = 0.08;
      }
      if (rightForeArmBone) {
        rightForeArmBone.rotation.z = -0.32 - armThreat * 0.5;
        rightForeArmBone.rotation.x = 0.12;
      }

      // Schwebender Interaktions-Kristall über dem Kopf
      const pulse = Math.sin(t * 4.0);
      talkGem.position.y = 8.05 + Math.sin(t * 2.8) * 0.12;
      talkGem.rotation.y += 0.025;

      if (isHoveredOrActive) {
        gemMat.emissiveIntensity = 1.5 + pulse * 0.5;
        gemLight.intensity = 3.2 + pulse * 0.9;
      } else {
        gemMat.emissiveIntensity = 0.9 + pulse * 0.35;
        gemLight.intensity = 2.0 + pulse * 0.5;
      }
    },
  };
}
