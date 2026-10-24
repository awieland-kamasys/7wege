import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { disposeObject3D } from '../utils/threeUtils';

export interface WildHunterNpcEntity {
  group: THREE.Group;
  update: (
    elapsedSeconds: number,
    playerPos: { x: number; z: number },
    isHighlighted: boolean,
    dtSeconds?: number
  ) => void;
  loadModel?: () => void;
}

/**
 * Erstellt die 3D-Figur "Der Wilde Jäger" an der Jagdhütte auf Weg 6:
 * Lädt das 3D-Modell `/assets/models/fantasy+wizard+3d+model.glb`
 * mit detailreicher Magiergewandung, Zaubererhut und flüssiger Skelettanimation ('standing_relax').
 */
export function createWildHunterNpc(
  onMeshLoaded?: (mesh: THREE.Mesh) => void,
  options?: { lazy?: boolean }
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
  indicator.position.y = 2.48;
  group.add(indicator);

  // 2. Temporäre dezente Platzhalter-Geometrie während des Ladens des GLB-Modells
  const fallbackGroup = new THREE.Group();
  const fallbackMat = new THREE.MeshStandardMaterial({
    color: 0x2d4f29,
    roughness: 0.85,
  });
  const fallbackBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.25, 0.38, 1.65, 8),
    fallbackMat
  );
  fallbackBody.position.y = 0.825;
  fallbackBody.castShadow = true;
  fallbackBody.userData = { interactableType: 'wild_hunter' };
  fallbackGroup.add(fallbackBody);
  group.add(fallbackGroup);

  // Gespeicherte Materialien des geladenen GLB-Modells für den Hover-Effekt
  const modelMaterials: THREE.MeshStandardMaterial[] = [];

  // AnimationMixer für die integrierten Skelettanimationen
  let mixer: THREE.AnimationMixer | null = null;
  let animAction: THREE.AnimationAction | null = null;
  let lastElapsedSeconds = 0;

  // 3. Lade das GLB-Modell des Zauberers/Jägers (fantasy+wizard+3d+model.glb)
  let isLoadedOrLoading = false;
  const startLoad = (): void => {
    if (isLoadedOrLoading) return;
    isLoadedOrLoading = true;

    const loader = new GLTFLoader();
    loader.load(
      '/assets/models/fantasy+wizard+3d+model.glb',
      (gltf) => {
        const model = gltf.scene;

        // Skalierung: Originalmodell ist 1.00m hoch -> 2.05x für hünenhafte Statur
        model.scale.setScalar(2.05);

        // Bounding-Box berechnen und Modell passgenau auf Bodenniveau (y = 0) aufsetzen
        model.updateMatrixWorld(true);
        const bounds = new THREE.Box3().setFromObject(model);
        model.position.set(0, -bounds.min.y, 0);

        // Skelettanimation aktivieren (bevorzuge "fold_arms" für wachsamen Waldjäger/Zauberer)
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          const clip =
            gltf.animations.find((a) => a.name.toLowerCase() === 'fold_arms') ||
            gltf.animations.find((a) => a.name.toLowerCase().includes('fold')) ||
            gltf.animations.find((a) => a.name.toLowerCase() === 'standing_relax') ||
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
        console.warn('Wilde Jäger 3D-Modell fantasy+wizard+3d+model.glb konnte nicht geladen werden, verwende Platzhalter:', err);
      }
    );
  };

  if (!options?.lazy) {
    startLoad();
  }

  const update = (
    elapsedSeconds: number,
    playerPos: { x: number; z: number },
    isHighlighted: boolean,
    dtSeconds?: number
  ): void => {
    // Delta-Zeit für den AnimationMixer
    const delta =
      dtSeconds !== undefined
        ? dtSeconds
        : Math.max(0.001, Math.min(0.1, elapsedSeconds - lastElapsedSeconds));
    lastElapsedSeconds = elapsedSeconds;

    if (mixer) {
      mixer.update(delta);
    }

    // Kristall-Animation
    indicator.position.y = 2.48 + Math.sin(elapsedSeconds * 2.6) * 0.06;
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

  return { group, update, loadModel: startLoad };
}
