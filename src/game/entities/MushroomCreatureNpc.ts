import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import { MUSHROOM_CREATURES_DATA, MushroomCreatureData } from '../data/paths';
import { getTerrainHeight } from '../utils/terrainHeight';
import { disposeObject3D } from '../utils/threeUtils';

export interface MushroomCreaturesEntity {
  group: THREE.Group;
  triggerJump: (pathId: number) => void;
  setHovered: (pathId: number | null) => void;
  getPosition: (pathId: number) => { x: number; z: number };
  update: (
    elapsedSeconds: number,
    playerPos: { x: number; z: number },
    dtSeconds?: number
  ) => void;
}

export interface MushroomCreaturesOptions {
  onMeshLoaded?: (mesh: THREE.Mesh) => void;
}

interface SingleMushroomInstance {
  data: MushroomCreatureData;
  group: THREE.Group;
  indicator: THREE.Mesh;
  hitbox: THREE.Mesh;
  fallback: THREE.Group;
  modelGroup: THREE.Group;
  mixer: THREE.AnimationMixer | null;
  idleAction: THREE.AnimationAction | null;
  jumpAction: THREE.AnimationAction | null;
  materials: THREE.MeshStandardMaterial[];
  isHovered: boolean;
}

/**
 * Erstellt die 7 Hinweisgeber-Pilzwesen (mushroom+creature+3d+model.glb)
 * auf den sieben Waldwegen:
 * - Lädt das animierte 3D-Pilzmodell einmalig und klont es per SkeletonUtils.
 * - Spielt kontinuierlich die 'idle'-Animation mit leichtem Phasenversatz.
 * - Reagiert auf Anklicken / Ansprechen mit einer freudigen 'jump'-Animation.
 * - Bietet Hover-Glühen und Hitboxen für Interaktionen.
 */
export function createMushroomCreatures(
  options?: MushroomCreaturesOptions
): MushroomCreaturesEntity {
  const rootGroup = new THREE.Group();
  rootGroup.name = 'MushroomCreaturesContainer';

  const instances: SingleMushroomInstance[] = [];

  // Vorbereiten aller 7 Instanzen mit Fallback & Hitbox
  for (const data of MUSHROOM_CREATURES_DATA) {
    const mGroup = new THREE.Group();
    mGroup.name = `MushroomCreature_Path${data.pathId}`;
    mGroup.userData = {
      interactableType: 'mushroom_creature',
      pathId: data.pathId,
    };

    const terrainY = getTerrainHeight(data.pos.x, data.pos.z);
    mGroup.position.set(data.pos.x, terrainY, data.pos.z);
    mGroup.rotation.y = data.rotationY;

    // 1. Schwebender Sporenkristall-Indikator über der Kappe
    const indicatorMat = new THREE.MeshStandardMaterial({
      color: 0x98e874,
      emissive: 0x3d8224,
      emissiveIntensity: 0.55,
      roughness: 0.2,
      metalness: 0.3,
    });
    const indicator = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.09, 0),
      indicatorMat
    );
    indicator.position.y = 0.88;
    indicator.userData = {
      interactableType: 'mushroom_creature',
      pathId: data.pathId,
    };
    mGroup.add(indicator);

    // 2. Unsichtbare Hitbox für zuverlässiges Raycasting & Klicks
    const hitboxMat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const hitbox = new THREE.Mesh(
      new THREE.CylinderGeometry(0.50, 0.50, 1.0, 10),
      hitboxMat
    );
    hitbox.position.y = 0.50;
    hitbox.userData = {
      interactableType: 'mushroom_creature',
      pathId: data.pathId,
    };
    mGroup.add(hitbox);

    // 3. Low-Poly-Fallback-Pilz während des Ladens (um 25% geschrumpft)
    const fallback = new THREE.Group();
    fallback.name = 'MushroomFallback';

    const stemMat = new THREE.MeshStandardMaterial({
      color: 0xded2b6,
      roughness: 0.85,
    });
    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.10, 0.14, 0.42, 8),
      stemMat
    );
    stem.position.y = 0.21;
    stem.castShadow = true;
    stem.userData = {
      interactableType: 'mushroom_creature',
      pathId: data.pathId,
    };
    fallback.add(stem);

    const capMat = new THREE.MeshStandardMaterial({
      color: 0x9b3824,
      roughness: 0.75,
    });
    const cap = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 10, 8, 0, Math.PI * 2, 0, Math.PI * 0.55),
      capMat
    );
    cap.position.y = 0.40;
    cap.scale.set(1.0, 0.75, 1.0);
    cap.castShadow = true;
    cap.userData = {
      interactableType: 'mushroom_creature',
      pathId: data.pathId,
    };
    fallback.add(cap);

    mGroup.add(fallback);

    // Container für das nachgeladene 3D-Modell
    const modelGroup = new THREE.Group();
    modelGroup.name = 'MushroomModel';
    mGroup.add(modelGroup);

    rootGroup.add(mGroup);

    instances.push({
      data,
      group: mGroup,
      indicator,
      hitbox,
      fallback,
      modelGroup,
      mixer: null,
      idleAction: null,
      jumpAction: null,
      materials: [],
      isHovered: false,
    });
  }

  // Einmaliges Laden des GLTF-Modells und Klonen für alle 7 Wege
  const loader = new GLTFLoader();
  loader.load(
    '/assets/models/mushroom+creature+3d+model.glb',
    (gltf) => {
      const baseScene = gltf.scene;
      const animations = gltf.animations || [];

      instances.forEach((inst, index) => {
        // SkinnedMesh-kompatibles Klonen mit SkeletonUtils (um 25% geschrumpft)
        const clonedScene = SkeletonUtils.clone(baseScene);
        clonedScene.scale.setScalar(0.69);
        clonedScene.position.set(0, 0, 0);

        // Animationen für diesen Klon initialisieren
        if (animations.length > 0) {
          const mixer = new THREE.AnimationMixer(clonedScene);
          inst.mixer = mixer;

          const idleClip =
            animations.find((a) => a.name.toLowerCase().includes('idle')) ||
            animations[0];
          const jumpClip = animations.find((a) =>
            a.name.toLowerCase().includes('jump')
          );

          if (idleClip) {
            const idleAction = mixer.clipAction(idleClip);
            idleAction.setLoop(THREE.LoopRepeat, Infinity);
            // Leichter Zeitversatz, damit die Pilzwesen nicht synchron atmen
            idleAction.time = (index * 2.3) % idleClip.duration;
            idleAction.play();
            inst.idleAction = idleAction;
          }

          if (jumpClip) {
            const jumpAction = mixer.clipAction(jumpClip);
            jumpAction.setLoop(THREE.LoopOnce, 1);
            jumpAction.clampWhenFinished = false;
            inst.jumpAction = jumpAction;

            mixer.addEventListener('finished', (e: any) => {
              if (e.action === jumpAction && inst.idleAction) {
                jumpAction.stop();
                inst.idleAction.reset().fadeIn(0.25).play();
              }
            });
          }
        }

        // Schatten, Interaktionsdaten und Materialien registrieren
        clonedScene.traverse((child) => {
          const mesh = child as THREE.Mesh;
          if (mesh.isMesh) {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.userData = {
              interactableType: 'mushroom_creature',
              pathId: inst.data.pathId,
            };

            const mats = Array.isArray(mesh.material)
              ? mesh.material
              : [mesh.material];
            for (const mat of mats) {
              if (mat && 'roughness' in mat) {
                const stdMat = mat as THREE.MeshStandardMaterial;
                stdMat.roughness = 0.85;
                inst.materials.push(stdMat);
              }
            }

            if (options?.onMeshLoaded) {
              options.onMeshLoaded(mesh);
            }
          }
        });

        // Fallback entfernen und detailliertes Modell einhängen
        inst.group.remove(inst.fallback);
        disposeObject3D(inst.fallback);
        inst.modelGroup.add(clonedScene);
      });
    },
    undefined,
    (err) => {
      console.warn(
        'mushroom+creature+3d+model.glb konnte nicht geladen werden, nutze Fallbacks:',
        err
      );
    }
  );

  const triggerJump = (pathId: number) => {
    const inst = instances.find((i) => i.data.pathId === pathId);
    if (!inst || !inst.jumpAction || !inst.mixer) return;

    if (inst.idleAction) {
      inst.idleAction.fadeOut(0.15);
    }
    inst.jumpAction.reset().fadeIn(0.15).play();
  };

  const setHovered = (pathId: number | null) => {
    for (const inst of instances) {
      const isTarget = inst.data.pathId === pathId;
      inst.isHovered = isTarget;

      const indMat = inst.indicator.material as THREE.MeshStandardMaterial;
      if (indMat) {
        indMat.emissiveIntensity = isTarget ? 1.4 : 0.55;
        inst.indicator.scale.setScalar(isTarget ? 1.35 : 1.0);
      }
    }
  };

  const getPosition = (pathId: number): { x: number; z: number } => {
    const inst = instances.find((i) => i.data.pathId === pathId);
    if (inst) {
      return { x: inst.data.pos.x, z: inst.data.pos.z };
    }
    return { x: 0, z: 0 };
  };

  const update = (
    elapsedSeconds: number,
    playerPos: { x: number; z: number },
    dtSeconds = 0.016
  ) => {
    for (const inst of instances) {
      // 1. Skelettanimationen aktualisieren
      if (inst.mixer) {
        inst.mixer.update(dtSeconds);
      }

      // 2. Schwebender Indikator rotiert und schwebt sanft
      inst.indicator.rotation.y = elapsedSeconds * 2.2;
      inst.indicator.rotation.x = Math.sin(elapsedSeconds * 1.5) * 0.2;
      inst.indicator.position.y =
        0.88 + Math.sin(elapsedSeconds * 3.0 + inst.data.pathId) * 0.045;

      // 3. Bei Spielerannäherung sanftes Zuwenden zum Spieler
      const dx = playerPos.x - inst.data.pos.x;
      const dz = playerPos.z - inst.data.pos.z;
      const dist = Math.hypot(dx, dz);

      if (dist < 4.5 && dist > 0.3) {
        const targetAngle = Math.atan2(dx, dz);
        let diff = targetAngle - inst.group.rotation.y;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        inst.group.rotation.y += diff * Math.min(1, dtSeconds * 3.5);
      } else {
        // Zurück zur Standard-Blickrichtung des Pfades
        let diff = inst.data.rotationY - inst.group.rotation.y;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        inst.group.rotation.y += diff * Math.min(1, dtSeconds * 2.0);
      }
    }
  };

  return {
    group: rootGroup,
    triggerJump,
    setHovered,
    getPosition,
    update,
  };
}
