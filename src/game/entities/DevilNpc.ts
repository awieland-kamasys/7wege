import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Vector2D } from '../systems/CrossroadsState';
import { disposeObject3D } from '../utils/threeUtils';

export interface DevilNpcEntity {
  group: THREE.Group;
  update: (
    elapsedSeconds: number,
    playerPos: Readonly<Vector2D>,
    isHoveredOrActive: boolean,
    dtSeconds?: number
  ) => void;
  loadModel?: () => void;
}

/**
 * Erstellt die 3D-Figur „Der Teufel / Dämonenkrieger“ am Ende des 5. Weges:
 * Lädt das Modell `/assets/models/low-poly+demon+3d+model.glb`,
 * skaliert ihn auf imposante Dämonengröße (~5.2m Höhe) und stellt ihn erhaben
 * auf die Oberfläche des zentralen Felsplateaus im Lavakrater.
 * Spielt die integrierte Skelettanimation ("idle" / "wait") dauerhaft als Schleife ab
 * und richtet den Teufel bei Annäherung auf die Spielfigur aus.
 */
export function createDevilNpc(
  onMeshLoaded?: (object: THREE.Object3D) => void,
  options?: { loadDelayMs?: number; lazy?: boolean }
): DevilNpcEntity {
  const group = new THREE.Group();
  group.name = 'DevilNpc';
  group.userData = { interactableType: 'devil' };

  // Unsichtbare Zylinder-Hitbox für verlässliches Raycasting und Klickbarkeit
  const hitMat = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const hitbox = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.4, 8.0, 12), hitMat);
  hitbox.position.y = 4.75;
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
  fallbackBody.position.y = 4.75;
  fallbackBody.castShadow = true;
  fallback.add(fallbackBody);
  group.add(fallback);

  // Über dem Kopf schwebender Interaktions-Kristall (feurig rot-orange, ca. 7.50m Höhe)
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
  talkGem.position.y = 7.5;
  talkGem.userData = { interactableType: 'devil' };
  group.add(talkGem);

  const gemLight = new THREE.PointLight(0xff4400, 2.2, 9.5);
  gemLight.position.y = 7.5;
  group.add(gemLight);

  // AnimationMixer für die integrierte Dämonenanimation ("wait.001")
  let mixer: THREE.AnimationMixer | null = null;
  let animAction: THREE.AnimationAction | null = null;
  let lastElapsedSeconds = 0;

  // Referenzen für die dämonisch glühenden Augen des Teufels
  let eyeCoreMat: THREE.MeshStandardMaterial | null = null;
  let eyeAuraMat: THREE.MeshBasicMaterial | null = null;
  let eyeLight: THREE.PointLight | null = null;

  /**
   * Statte den Kopf des Dämons mit intensiv glühenden roten Dämonenaugen
   * und einem unheimlich flackernden Punktlicht aus.
   */
  function attachGlowingEyes(model: THREE.Object3D) {
    if (eyeCoreMat) return;

    eyeCoreMat = new THREE.MeshStandardMaterial({
      color: 0xffea00,
      emissive: new THREE.Color(0xff2200),
      emissiveIntensity: 4.2,
      roughness: 0.15,
      metalness: 0.1,
      toneMapped: false,
    });

    eyeAuraMat = new THREE.MeshBasicMaterial({
      color: 0xff3300,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });

    const eyeGeo = new THREE.SphereGeometry(0.009, 12, 12);
    const auraGeo = new THREE.SphereGeometry(0.0135, 10, 10);

    const headBone =
      model.getObjectByName('mixamorigHead') || model.getObjectByName('mixamorig:Head');

    if (headBone) {
      // Exakte Positionierung im lokalen Koordinatenraum des Kopf-Knochens (mixamorig:Head):
      // Dadurch bewegen sich die Augen 100% synchron mit Kopfbewegung und Atmung mit.
      const leftEyePos = new THREE.Vector3(0.033, 0.049, 0.052);
      const rightEyePos = new THREE.Vector3(-0.033, 0.049, 0.052);

      // Linkes Auge (Kern + Glüh-Aura)
      const leftEyeCore = new THREE.Mesh(eyeGeo, eyeCoreMat);
      leftEyeCore.position.copy(leftEyePos);
      const leftEyeAura = new THREE.Mesh(auraGeo, eyeAuraMat);
      leftEyeCore.add(leftEyeAura);
      headBone.add(leftEyeCore);

      // Rechtes Auge (Kern + Glüh-Aura)
      const rightEyeCore = new THREE.Mesh(eyeGeo, eyeCoreMat);
      rightEyeCore.position.copy(rightEyePos);
      const rightEyeAura = new THREE.Mesh(auraGeo, eyeAuraMat);
      rightEyeCore.add(rightEyeAura);
      headBone.add(rightEyeCore);

      // Rotes Punktlicht vor den Augen, das die Stirnknochen und Hörner teuflisch beleuchtet
      eyeLight = new THREE.PointLight(0xff3300, 1.8, 6.0);
      eyeLight.position.set(0, 0.052, 0.075);
      headBone.add(eyeLight);
    } else {
      // Ausweichlösung, falls kein Kopfknochen vorhanden sein sollte (an Modellgruppe geheftet)
      const leftEyeGroup = new THREE.Group();
      leftEyeGroup.scale.setScalar(5.2);
      leftEyeGroup.position.set(-0.17, 6.16, 0.57);
      leftEyeGroup.add(new THREE.Mesh(eyeGeo, eyeCoreMat));
      leftEyeGroup.add(new THREE.Mesh(auraGeo, eyeAuraMat));
      model.add(leftEyeGroup);

      const rightEyeGroup = new THREE.Group();
      rightEyeGroup.scale.setScalar(5.2);
      rightEyeGroup.position.set(0.17, 6.16, 0.57);
      rightEyeGroup.add(new THREE.Mesh(eyeGeo, eyeCoreMat));
      rightEyeGroup.add(new THREE.Mesh(auraGeo, eyeAuraMat));
      model.add(rightEyeGroup);

      eyeLight = new THREE.PointLight(0xff3300, 2.0, 7.0);
      eyeLight.position.set(0, 6.16, 0.7);
      model.add(eyeLight);
    }
  }

  // Lade das Dämonen-Modell low-poly+demon+3d+model.glb
  let isLoadedOrLoading = false;
  const startLoad = (): void => {
    if (isLoadedOrLoading) return;
    isLoadedOrLoading = true;

    const modelUrl = '/assets/models/low-poly+demon+3d+model.glb';
    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene;

        // 1. Skalierung: 5.2x (ergibt ca. 5.20m Gesamthöhe)
        model.scale.setScalar(5.2);

        // 2. Positionierung auf der Felsenplattform des Lavakraters (Plattformhöhe 1.80m):
        // Die Klauensohlen stehen exakt bündig oben auf den Felsplatten.
        model.position.set(0, 1.80, 0);

        // 3. Animation aktivieren (bevorzuge "idle", "wait" oder erste Animation)
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          const clip =
            gltf.animations.find((a) => a.name.toLowerCase() === 'idle') ||
            gltf.animations.find((a) => a.name.toLowerCase().includes('wait')) ||
            gltf.animations[0];
          animAction = mixer.clipAction(clip);
          animAction.setLoop(THREE.LoopRepeat, Infinity);
          animAction.clampWhenFinished = false;
          animAction.play();
        }

        model.traverse((child) => {
          const mesh = child as THREE.Mesh;
          if (mesh.isMesh) {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.userData = { interactableType: 'devil' };

            const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            for (const mat of mats) {
              if (mat && 'roughness' in mat) {
                const stdMat = mat as THREE.MeshStandardMaterial;
                stdMat.roughness = 0.75;
                stdMat.metalness = 0.15;
              }
            }

            if (onMeshLoaded) {
              onMeshLoaded(mesh);
            }
          }
        });

        // Dämonisch glühende Augen und Gesichtsschein befestigen
        attachGlowingEyes(model);

        // Platzhalter durch das fertige Modell ersetzen und Speicher freigeben
        group.remove(fallback);
        disposeObject3D(fallback);
        group.add(model);
      },
      undefined,
      (err) => {
        console.warn('Dämonen-Modell low-poly+demon+3d+model.glb konnte nicht geladen werden, nutze Platzhalter:', err);
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

  return {
    group,
    loadModel: startLoad,
    update: (
      elapsedSeconds: number,
      playerPos: Readonly<Vector2D>,
      isHoveredOrActive: boolean,
      dtSeconds?: number
    ) => {
      // Delta-Zeit für den AnimationMixer berechnen
      const delta =
        dtSeconds !== undefined
          ? dtSeconds
          : Math.max(0.001, Math.min(0.1, elapsedSeconds - lastElapsedSeconds));
      lastElapsedSeconds = elapsedSeconds;

      // Integrierte Skelettanimation abspielen
      if (mixer) {
        mixer.update(delta);
      }

      // Blickwinkel zur Spielfigur berechnen und sanft ausrichten
      const worldPos = new THREE.Vector3();
      group.getWorldPosition(worldPos);
      const dx = playerPos.x - worldPos.x;
      const dz = playerPos.z - worldPos.z;
      const dist = Math.hypot(dx, dz);

      if (dist < 34.0 && dist > 0.5) {
        const targetRotY = Math.atan2(dx, dz);
        group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetRotY, 0.05);
      }

      // Schwebender Interaktions-Kristall über dem Kopf (bei ca. 7.95m Höhe)
      const t = elapsedSeconds;
      const pulse = Math.sin(t * 4.0);
      talkGem.position.y = 7.95 + Math.sin(t * 2.8) * 0.12;
      talkGem.rotation.y += 0.025;

      if (isHoveredOrActive) {
        gemMat.emissiveIntensity = 1.5 + pulse * 0.5;
        gemLight.intensity = 3.2 + pulse * 0.9;
      } else {
        gemMat.emissiveIntensity = 0.9 + pulse * 0.35;
        gemLight.intensity = 2.0 + pulse * 0.5;
      }

      // Dämonisch lodernde Augen mit unheilschwangerem Flackern
      if (eyeCoreMat && eyeLight && eyeAuraMat) {
        const eyeFlicker =
          Math.sin(t * 6.2) * 0.18 +
          Math.sin(t * 13.7) * 0.1 +
          Math.cos(t * 2.5) * 0.06;

        if (isHoveredOrActive) {
          eyeCoreMat.emissiveIntensity = 5.6 + eyeFlicker * 1.5;
          eyeLight.intensity = 2.8 + eyeFlicker * 0.8;
          eyeAuraMat.opacity = 0.65;
        } else {
          eyeCoreMat.emissiveIntensity = 4.2 + eyeFlicker * 1.0;
          eyeLight.intensity = 1.8 + eyeFlicker * 0.5;
          eyeAuraMat.opacity = 0.45;
        }
      }
    },
  };
}
