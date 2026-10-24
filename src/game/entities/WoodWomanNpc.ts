import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { disposeObject3D } from '../utils/threeUtils';

export interface WoodWomanNpcEntity {
  group: THREE.Group;
  update: (
    elapsedSeconds: number,
    playerPos: { x: number; z: number },
    isHighlighted: boolean,
    dtSeconds?: number
  ) => void;
  loadModel?: () => void;
}

export interface WoodWomanNpcOptions {
  interactableType?: string;
  defaultFacingTarget?: { x: number; z: number };
  loadDelayMs?: number;
  modelPath?: string;
  lazy?: boolean;
}

/**
 * Erstellt die 3D-Figur "Das Holzweibchen" (Waldkreatur/Walddruidin):
 * Lädt das animierte 3D-Modell `/assets/models/forest+creature+3d+model.glb`
 * mit natürlicher Umschau- und Gestik-Animation.
 * Steht im Holzfällercamp (Weg 4).
 */
export function createWoodWomanNpc(
  onMeshLoadedOrOptions?: ((mesh: THREE.Mesh) => void) | WoodWomanNpcOptions,
  maybeOptions?: WoodWomanNpcOptions
): WoodWomanNpcEntity {
  let onMeshLoaded: ((mesh: THREE.Mesh) => void) | undefined;
  let options: WoodWomanNpcOptions = {};

  if (typeof onMeshLoadedOrOptions === 'function') {
    onMeshLoaded = onMeshLoadedOrOptions;
    if (maybeOptions) {
      options = maybeOptions;
    }
  } else if (onMeshLoadedOrOptions && typeof onMeshLoadedOrOptions === 'object') {
    options = onMeshLoadedOrOptions;
  }

  const {
    interactableType = 'wood_woman',
    defaultFacingTarget,
    loadDelayMs = 0,
    modelPath = '/assets/models/forest+creature+3d+model.glb',
  } = options;

  const group = new THREE.Group();
  group.name = `WoodWomanNpc_${interactableType}`;

  // 1. Schwebender bernsteinfarbener Gesprächs-Kristall über dem Kopf des Holzweibchens
  const indicatorMat = new THREE.MeshStandardMaterial({
    color: 0xd99b4e,
    emissive: 0x8f5b1d,
    emissiveIntensity: 0.6,
    roughness: 0.25,
    metalness: 0.2,
  });
  const indicator = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.15, 0),
    indicatorMat
  );
  indicator.position.y = 1.62;
  group.add(indicator);

  // 2. Temporäre dezente Platzhalter-Geometrie während des Ladens des GLB-Modells
  const fallbackGroup = new THREE.Group();
  const fallbackMat = new THREE.MeshStandardMaterial({
    color: 0x485c3b,
    roughness: 0.88,
  });
  const fallbackBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.20, 0.32, 1.05, 8),
    fallbackMat
  );
  fallbackBody.position.y = 0.525;
  fallbackBody.castShadow = true;
  fallbackBody.userData = { interactableType };
  fallbackGroup.add(fallbackBody);
  group.add(fallbackGroup);

  // Gespeicherte Materialien des geladenen GLB-Modells für den Hover-Effekt
  const modelMaterials: THREE.MeshStandardMaterial[] = [];

  // AnimationMixer für die Waldkreatur
  let mixer: THREE.AnimationMixer | null = null;
  let lookAroundAction: THREE.AnimationAction | null = null;
  let foldArmsAction: THREE.AnimationAction | null = null;
  let lastTimeSeconds = 0;

  // 3. Lade das GLB-Modell der Waldkreatur
  let isLoadedOrLoading = false;
  const startLoad = (): void => {
    if (isLoadedOrLoading) return;
    isLoadedOrLoading = true;

    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;

        // Skalierung: Originalmodell ist 1.00m hoch -> 1.35x für passende Holzweibchen-Größe (1.35m)
        model.scale.setScalar(1.35);

        // Bounding-Box berechnen und Modell passgenau auf Bodenniveau (y = 0) aufsetzen
        model.updateMatrixWorld(true);
        const bounds = new THREE.Box3().setFromObject(model);
        model.position.set(0, -bounds.min.y, 0);

        model.traverse((child) => {
          const mesh = child as THREE.Mesh;
          if (mesh.isMesh) {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.userData = { interactableType };

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

        // Animationen vorbereiten
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);

          const clipLook =
            gltf.animations.find((a) => a.name.toLowerCase().includes('look')) ??
            gltf.animations[3] ??
            gltf.animations[0];
          if (clipLook) {
            lookAroundAction = mixer.clipAction(clipLook);
            lookAroundAction.setLoop(THREE.LoopRepeat, Infinity);
            lookAroundAction.play();
          }

          const clipFold = gltf.animations.find((a) => a.name.toLowerCase().includes('fold'));
          if (clipFold) {
            foldArmsAction = mixer.clipAction(clipFold);
            foldArmsAction.setLoop(THREE.LoopRepeat, Infinity);
          }
        }

        // Platzhalter entfernen und fertiges Modell einfügen
        group.remove(fallbackGroup);
        disposeObject3D(fallbackGroup);
        group.add(model);
      },
      undefined,
      (err) => {
        console.warn('Holzweibchen-GLB konnte nicht geladen werden, nutze Platzhalter:', err);
      }
    );
  };

  if (!options.lazy) {
    if (loadDelayMs > 0) {
      setTimeout(startLoad, loadDelayMs);
    } else {
      startLoad();
    }
  }

  const update = (
    elapsedSeconds: number,
    playerPos: { x: number; z: number },
    isHighlighted: boolean,
    dtSeconds?: number
  ): void => {
    // Delta-Zeit für den AnimationMixer
    let dt = dtSeconds;
    if (dt === undefined) {
      dt = lastTimeSeconds > 0 ? Math.min(0.1, Math.max(0.001, elapsedSeconds - lastTimeSeconds)) : 0.016;
    }
    lastTimeSeconds = elapsedSeconds;

    if (mixer) {
      mixer.update(dt);
    }

    // Sanftes Schweben und Rotieren des Kristalls
    indicator.position.y = 1.62 + Math.sin(elapsedSeconds * 2.5) * 0.05;
    indicator.rotation.y = elapsedSeconds * 1.3;

    indicatorMat.emissiveIntensity = isHighlighted ? 1.25 : 0.6;
    const scale = isHighlighted ? 1.22 : 1.0;
    indicator.scale.set(scale, scale, scale);

    // Dezent warmer Leuchteffekt bei Hover auf dem 3D-Modell
    const emissiveHex = isHighlighted ? 0x2e3818 : 0x000000;
    for (const mat of modelMaterials) {
      mat.emissive.setHex(emissiveHex);
      mat.emissiveIntensity = isHighlighted ? 0.35 : 0.0;
    }

    // Holzweibchen wendet sich der spielenden Person zu, sobald diese nahe ist;
    // sonst blickt sie zur Standard-Blickrichtung
    const dx = playerPos.x - group.position.x;
    const dz = playerPos.z - group.position.z;
    const dist = Math.hypot(dx, dz);
    if (dist < 8.5 && dist > 0.1) {
      const targetAngle = Math.atan2(dx, dz);
      group.rotation.y = targetAngle;
    } else if (defaultFacingTarget) {
      const fx = defaultFacingTarget.x - group.position.x;
      const fz = defaultFacingTarget.z - group.position.z;
      group.rotation.y = Math.atan2(fx, fz);
    }
  };

  return { group, update, loadModel: startLoad };
}
