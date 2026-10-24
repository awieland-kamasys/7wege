import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { disposeObject3D } from '../utils/threeUtils';

export interface GiantNpcEntity {
  group: THREE.Group;
  update: (timeSeconds: number, playerPos: { x: number; z: number }, highlighted: boolean) => void;
  loadModel?: () => void;
}

/**
 * Erstellt die 3D-Figur des Riesen („Der Riese am Wehr“), der am Ende des 3. Weges
 * neben der Wehrbrücke und dem kleinen Stausee das geschlossene Wehr bewacht.
 * Lädt das 3D-Modell `/assets/models/stylized dwarf 3d model.glb` und skaliert es
 * auf monumentale Riesengröße (~6,20 m Höhe).
 */
export function createGiantNpc(
  onMeshLoaded?: (mesh: THREE.Mesh) => void,
  options?: { lazy?: boolean }
): GiantNpcEntity {
  const group = new THREE.Group();
  group.name = 'GiantNpc';

  // 1. Schwebendes Quellwasser-Kristallsymbol über dem Kopf des Riesen
  const indicatorMat = new THREE.MeshStandardMaterial({
    color: 0x7fd4e6,
    emissive: 0x28788a,
    emissiveIntensity: 0.9,
    roughness: 0.22,
    metalness: 0.4,
  });
  const indicator = new THREE.Mesh(new THREE.OctahedronGeometry(0.35, 0), indicatorMat);
  indicator.position.y = 6.65;
  group.add(indicator);

  // Quellwasser-Lichtschein über dem Riesen
  const giantLight = new THREE.PointLight(0x7fd4e6, 1.4, 12.0);
  giantLight.position.set(0, 6.2, 0.8);
  group.add(giantLight);

  // 2. Temporäre dezente Platzhalter-Geometrie während des Ladens des 3D-Modells
  const fallbackGroup = new THREE.Group();
  const fallbackMat = new THREE.MeshStandardMaterial({
    color: 0x4a3b2a,
    roughness: 0.88,
  });
  const fallbackBody = new THREE.Mesh(
    new THREE.CylinderGeometry(1.10, 1.50, 5.8, 10),
    fallbackMat
  );
  fallbackBody.position.y = 2.9;
  fallbackBody.castShadow = true;
  fallbackBody.userData = { interactableType: 'giant' };
  fallbackGroup.add(fallbackBody);
  group.add(fallbackGroup);

  // Gespeicherte Materialien des geladenen GLB-Modells für den Hover-Effekt
  const modelMaterials: THREE.MeshStandardMaterial[] = [];
  let loadedModel: THREE.Group | null = null;

  // 3. Lade das GLB-Modell des stilisierten Riesen / Zwerges
  let isLoadedOrLoading = false;
  const startLoad = (): void => {
    if (isLoadedOrLoading) return;
    isLoadedOrLoading = true;

    const loader = new GLTFLoader();
    loader.load(
      '/assets/models/stylized dwarf 3d model.glb',
      (gltf) => {
        const model = gltf.scene;
        loadedModel = model;

        // Skalierung: Originalmodell ist 1.00m hoch -> 6.20x für wahrhaft gigantische Riesengestalt
        model.scale.setScalar(6.20);

        // Bounding-Box berechnen und Modell passgenau auf Bodenniveau (y = 0) aufsetzen
        model.updateMatrixWorld(true);
        const bounds = new THREE.Box3().setFromObject(model);
        model.position.set(0, -bounds.min.y, 0);

        model.traverse((child) => {
          const mesh = child as THREE.Mesh;
          if (mesh.isMesh) {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.userData = { interactableType: 'giant' };

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

        // Platzhalter entfernen und fertiges Riesen-Modell einfügen
        group.remove(fallbackGroup);
        disposeObject3D(fallbackGroup);
        group.add(model);
      },
      undefined,
      (err) => {
        console.warn('Riesen-Modell konnte nicht geladen werden, verwende Platzhalter:', err);
      }
    );
  };

  if (!options?.lazy) {
    startLoad();
  }

  // Blickt standardmäßig zur Brücke hin (-X / -Z)
  group.rotation.y = -2.1;

  const update = (
    timeSeconds: number,
    playerPos: { x: number; z: number },
    highlighted: boolean
  ) => {
    // Ruhiges, tiefes Atmen des Riesen
    const breath = Math.sin(timeSeconds * 1.6);
    if (loadedModel) {
      loadedModel.scale.set(
        6.20 * (1 + breath * 0.012),
        6.20 * (1 + breath * 0.015),
        6.20 * (1 + breath * 0.012)
      );
    } else {
      fallbackBody.scale.set(1 + breath * 0.012, 1 + breath * 0.015, 1 + breath * 0.012);
    }

    // Kristall-Animation und Lichtintensität
    indicator.position.y = 6.65 + Math.sin(timeSeconds * 2.3) * 0.12;
    indicator.rotation.y = timeSeconds * 1.25;

    indicatorMat.emissiveIntensity = highlighted ? 1.35 : 0.9;
    indicatorMat.emissive.setHex(highlighted ? 0x70e5ff : 0x28788a);
    const scale = highlighted ? 1.25 : 1.0;
    indicator.scale.set(scale, scale, scale);

    // Hover-Hervorhebung auf den Modell-Materialien
    if (modelMaterials.length > 0) {
      const targetEmissive = highlighted ? 0x205565 : 0x000000;
      const targetIntensity = highlighted ? 0.45 : 0.0;
      for (const mat of modelMaterials) {
        mat.emissive.setHex(targetEmissive);
        mat.emissiveIntensity = targetIntensity;
      }
    }

    // Riese wendet sich dem Spieler zu, wenn dieser nahe am Ufer herantritt
    const dx = playerPos.x - group.position.x;
    const dz = playerPos.z - group.position.z;
    const dist = Math.hypot(dx, dz);
    if (dist < 10.0 && dist > 0.1) {
      group.rotation.y = Math.atan2(dx, dz);
    } else {
      group.rotation.y = -2.1;
    }
  };

  return { group, update, loadModel: startLoad };
}
