import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { disposeObject3D } from '../utils/threeUtils';

export interface WoodWomanNpcEntity {
  group: THREE.Group;
  update: (
    elapsedSeconds: number,
    playerPos: { x: number; z: number },
    isHighlighted: boolean
  ) => void;
}

export interface WoodWomanNpcOptions {
  interactableType?: string;
  defaultFacingTarget?: { x: number; z: number };
  loadDelayMs?: number;
}

/**
 * Erstellt die 3D-Figur "Das Holzweibchen" (Walddruidin):
 * Lädt das detailreiche 3D-Modell `/assets/models/forest druid 3d model new style.glb`
 * mit naturverbundener Robe, Umhang und Geweih-Krone.
 * Wird sowohl im Holzfällercamp (Weg 4) als auch an der Jagdhütte (Weg 6) verwendet.
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
  indicator.position.y = 1.72;
  group.add(indicator);

  // 2. Temporäre dezente Platzhalter-Geometrie während des Ladens des GLB-Modells
  const fallbackGroup = new THREE.Group();
  const fallbackMat = new THREE.MeshStandardMaterial({
    color: 0x485c3b,
    roughness: 0.88,
  });
  const fallbackBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.35, 1.18, 8),
    fallbackMat
  );
  fallbackBody.position.y = 0.59;
  fallbackBody.castShadow = true;
  fallbackBody.userData = { interactableType };
  fallbackGroup.add(fallbackBody);
  group.add(fallbackGroup);

  // Gespeicherte Materialien des geladenen GLB-Modells für den Hover-Effekt
  const modelMaterials: THREE.MeshStandardMaterial[] = [];

  // 3. Lade das GLB-Modell des Wald-Druiden
  const startLoad = (): void => {
    const loader = new GLTFLoader();
    loader.load(
      '/assets/models/forest druid 3d model new style.glb',
      (gltf) => {
        const model = gltf.scene;

        // Skalierung: Originalmodell ist 1.00m hoch -> 1.46x für zierlichere Gestalt der Walddruidin (einen Kopf kleiner)
        model.scale.setScalar(1.46);

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
                stdMat.roughness = 0.85;
                modelMaterials.push(stdMat);
              }
            }

            if (onMeshLoaded) {
              onMeshLoaded(mesh);
            }
          }
        });

        // Platzhalter entfernen und fertiges Druiden-Modell einfügen
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

  if (loadDelayMs > 0) {
    setTimeout(startLoad, loadDelayMs);
  } else {
    startLoad();
  }

  const update = (
    elapsedSeconds: number,
    playerPos: { x: number; z: number },
    isHighlighted: boolean
  ): void => {
    // Sanftes Schweben und Rotieren des Kristalls
    indicator.position.y = 1.72 + Math.sin(elapsedSeconds * 2.5) * 0.05;
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
    // sonst blickt sie zur Standard-Blickrichtung (z.B. zum Wilden Jäger an der Jagdhütte)
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

  return { group, update };
}
