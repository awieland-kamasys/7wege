import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { disposeObject3D } from '../utils/threeUtils';

export interface WorldTreeEntity {
  group: THREE.Group;
  update: (elapsedSeconds: number, dtSeconds?: number) => void;
}

export interface WorldTreeOptions {
  modelUrl?: string;
  onMeshLoaded?: (mesh: THREE.Mesh) => void;
  scale?: number;
  rotationY?: number;
  sinkDepth?: number;
  moundRadius?: number;
  moundTopRadius?: number;
  moundHeight?: number;
  moundOffsetY?: number;
  hasMound?: boolean;
  hasAura?: boolean;
}

/**
 * Erstellt einen uralten, monumentalen Weltenbaum (Yggdrasil-Archetyp) oder stilisierten Riesenbaum:
 * - Unterstützt 3D-Modelle wie `/assets/models/fantasy tree 3d model.glb` oder `/assets/models/stylized tree 3d model.glb`
 * - Monumentale Höhe von ca. 21-23 Metern (Skalierungsfaktor 26) mit weit ausladender Krone
 * - Optionale magische Waldlicht-Aura aus sanft schwebenden, leuchtenden Glühwürmchen-Partikeln um die Krone
 * - Konfigurierbare Wurzelverankerung und optionaler Moos-/Wurzelhügel
 */
export function createWorldTree(
  options?: WorldTreeOptions
): WorldTreeEntity {
  const group = new THREE.Group();
  group.name = 'WorldTree';
  group.userData = { interactableType: 'world_tree' };

  const modelUrl = options?.modelUrl ?? '/assets/models/fantasy tree 3d model.glb';
  const treeScale = options?.scale ?? 26.0;
  const sinkDepth = options?.sinkDepth ?? 1.65;
  const hasMound = options?.hasMound ?? true;
  const hasAura = options?.hasAura ?? true;

  if (options?.rotationY !== undefined) {
    group.rotation.y = options.rotationY;
  }

  // 1. Sanfter, moosig-erdiger Wurzelhügel an der Basis (optional, für Bäume mit freiem Wurzelbogen/Höhle deaktivierbar)
  if (hasMound) {
    const moundMat = new THREE.MeshStandardMaterial({
      color: 0x36442e,
      roughness: 0.94,
      flatShading: true,
    });
    const moundRadius = options?.moundRadius ?? 6.4;
    const moundTopRadius = options?.moundTopRadius ?? (moundRadius * 0.56);
    const moundHeight = options?.moundHeight ?? 0.85;
    const moundOffsetY = options?.moundOffsetY ?? -0.25;

    const rootMound = new THREE.Mesh(
      new THREE.CylinderGeometry(moundTopRadius, moundRadius, moundHeight, 18),
      moundMat
    );
    rootMound.position.y = moundOffsetY;
    rootMound.receiveShadow = true;
    rootMound.userData = { interactableType: 'world_tree' };
    group.add(rootMound);
  }

  // 2. Platzhalter während des GLTF-Ladevorgangs
  const fallback = new THREE.Group();
  const fallbackTrunkMat = new THREE.MeshStandardMaterial({
    color: 0x3d2716,
    roughness: 0.9,
  });
  const fallbackCrownMat = new THREE.MeshStandardMaterial({
    color: 0x22552e,
    roughness: 0.8,
  });

  const fallbackTrunk = new THREE.Mesh(
    new THREE.CylinderGeometry(1.4, 2.8, 12, 10),
    fallbackTrunkMat
  );
  fallbackTrunk.position.y = 5.2;
  fallbackTrunk.castShadow = true;
  fallbackTrunk.userData = { interactableType: 'world_tree' };
  fallback.add(fallbackTrunk);

  const fallbackCrown = new THREE.Mesh(
    new THREE.DodecahedronGeometry(8.5, 1),
    fallbackCrownMat
  );
  fallbackCrown.position.y = 16.2;
  fallbackCrown.castShadow = true;
  fallbackCrown.userData = { interactableType: 'world_tree' };
  fallback.add(fallbackCrown);

  group.add(fallback);

  // 2. Magische Glühwürmchen- und Waldlicht-Aura um die Krone (in warmem, leuchtendem Gelb)
  const particleCount = 75;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleColors = new Float32Array(particleCount * 3);
  const particlePhases = new Float32Array(particleCount);
  const particleRadii = new Float32Array(particleCount);
  const particleHeights = new Float32Array(particleCount);
  const particleSpeeds = new Float32Array(particleCount);

  const colorPalettes = [
    new THREE.Color(0xffd700), // Kräftiges Goldgelb
    new THREE.Color(0xffb800), // Warmes Bernsteingelb
    new THREE.Color(0xffea00), // Strahlendes Sonnengelb
    new THREE.Color(0xf59e0b), // Tiefes Honiggelb
    new THREE.Color(0xffcc00), // Warmes Reingelb
  ];

  for (let i = 0; i < particleCount; i++) {
    const phase = Math.random() * Math.PI * 2;
    const radius = 4.5 + Math.random() * 8.5; // Radius um den Kronenbereich
    const height = 9.0 + Math.random() * 14.0; // Höhe im Geäst (9m bis 23m)
    const speed = 0.35 + Math.random() * 0.45;
    const color = colorPalettes[i % colorPalettes.length];

    particlePhases[i] = phase;
    particleRadii[i] = radius;
    particleHeights[i] = height;
    particleSpeeds[i] = speed;

    particlePositions[i * 3] = Math.cos(phase) * radius;
    particlePositions[i * 3 + 1] = height;
    particlePositions[i * 3 + 2] = Math.sin(phase) * radius;

    particleColors[i * 3] = color.r;
    particleColors[i * 3 + 1] = color.g;
    particleColors[i * 3 + 2] = color.b;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

  const particleMat = new THREE.PointsMaterial({
    size: 0.55,
    vertexColors: true,
    transparent: true,
    opacity: 0.90,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  if (hasAura) {
    const auraPoints = new THREE.Points(particleGeo, particleMat);
    group.add(auraPoints);
  }

  // 3. GLTF-Ladevorgang des detailreichen 3D-Fantasy-Baums
  const loader = new GLTFLoader();
  loader.load(
    modelUrl,
    (gltf) => {
      const model = gltf.scene;

      // Monumentale Weltenbaum-Skalierung mit Wurzelverankerung im Waldboden
      model.scale.setScalar(treeScale);

      // Aufsetzen und tiefe Verankerung im Waldboden,
      // sodass die gewaltigen Wurzelstränge natürlich aus der Erde hervortreten
      // und kein Teil der flachen Modellunterseite in der Luft schwebt
      model.updateMatrixWorld(true);
      const bounds = new THREE.Box3().setFromObject(model);
      model.position.set(0, -bounds.min.y - sinkDepth, 0);

      model.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          mesh.userData = { interactableType: 'world_tree' };

          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          for (const mat of mats) {
            if (mat && 'roughness' in mat) {
              const stdMat = mat as THREE.MeshStandardMaterial;
              stdMat.roughness = 0.85;
              stdMat.metalness = 0.08;
            }
          }

          if (options?.onMeshLoaded) {
            options.onMeshLoaded(mesh);
          }
        }
      });

      // Platzhalter entfernen und fertigen Weltenbaum einsetzen
      group.remove(fallback);
      disposeObject3D(fallback);
      group.add(model);
    },
    undefined,
    (err) => {
      console.warn(`Baum-Modell ${modelUrl} konnte nicht geladen werden, nutze Fallback-Baum:`, err);
    }
  );

  const update = (elapsedSeconds: number, _dtSeconds?: number): void => {
    if (!hasAura) return;
    // Sanfte Kreisanimation der schwebenden Waldlichter um die Krone
    const pos = particleGeo.attributes.position as THREE.BufferAttribute;
    const array = pos.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      const phase = particlePhases[i] + elapsedSeconds * particleSpeeds[i];
      const radius = particleRadii[i] + Math.sin(elapsedSeconds * 1.8 + i) * 0.45;
      const height = particleHeights[i] + Math.cos(elapsedSeconds * 1.4 + i * 2) * 0.6;

      array[i * 3] = Math.cos(phase) * radius;
      array[i * 3 + 1] = height;
      array[i * 3 + 2] = Math.sin(phase) * radius;
    }
    pos.needsUpdate = true;
  };

  return { group, update };
}
