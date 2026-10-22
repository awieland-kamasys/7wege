import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createAshlarWallTexture } from '../textures/GroundTextures';
import { disposeObject3D } from '../utils/threeUtils';

export interface ClosedGateEntity {
  group: THREE.Group;
  update: (timeSeconds: number, playerPos: { x: number; z: number }, highlighted: boolean) => void;
}

/**
 * Erstellt das 3D-Modell des uralten, reich verzierten und verschlossenen Portals am Ende von Weg 7:
 * - Lädt das detailreiche Schmiedetor-Modell `/assets/models/ornate gate 3d model.glb`
 * - Harmonische Skalierung (Breite ca. 6.8m, Höhe ca. 4.5m)
 * - Anschließende alte Quadersteinmauern links und rechts mit tiefem 2.4m-Fundament gegen Boden-Clipping
 * - Dicke Eisenketten und massives Vorhängeschloss in der Tormitte als Symbol des Siegels
 * - Schwebender, leuchtender Hinweis-Kristall über dem Torbogen für die Interaktion
 */
export function createClosedGate(
  onMeshLoaded?: (mesh: THREE.Mesh) => void
): ClosedGateEntity {
  const group = new THREE.Group();
  group.name = 'ClosedGate';

  // --- MATERIALIEN FÜR FLANKIERENDE MAUERN & SCHLOSS ---
  const wallTex = createAshlarWallTexture();
  if (wallTex.map) wallTex.map.repeat.set(3.2, 1.8);
  if (wallTex.bumpMap) wallTex.bumpMap.repeat.set(3.2, 1.8);

  const stoneMat = new THREE.MeshStandardMaterial({
    color: 0x6e6860,
    map: wallTex.map ?? undefined,
    bumpMap: wallTex.bumpMap ?? undefined,
    bumpScale: 0.1,
    roughness: 0.88,
    flatShading: true,
  });
  const mossStoneMat = new THREE.MeshStandardMaterial({
    color: 0x586050,
    map: wallTex.map ?? undefined,
    bumpMap: wallTex.bumpMap ?? undefined,
    bumpScale: 0.1,
    roughness: 0.92,
    flatShading: true,
  });

  const ironMat = new THREE.MeshStandardMaterial({
    color: 0x222326,
    metalness: 0.75,
    roughness: 0.42,
  });
  const chainMat = new THREE.MeshStandardMaterial({
    color: 0x2b2c30,
    metalness: 0.82,
    roughness: 0.38,
  });
  const brassLockMat = new THREE.MeshStandardMaterial({
    color: 0xb58e38,
    metalness: 0.68,
    roughness: 0.32,
  });
  const indicatorMat = new THREE.MeshStandardMaterial({
    color: 0xa87ffb,
    emissive: 0x683cb8,
    emissiveIntensity: 0.65,
    roughness: 0.25,
    metalness: 0.3,
  });

  // Tor-Dimensionen des 3D-GLB-Modells nach Skalierung (Faktor 6.8)
  const gateScale = 6.8;
  const gateHalfWidth = (1.0 * gateScale) / 2; // ca. 3.40m
  const gateHeight = 0.656 * gateScale; // ca. 4.46m

  // 1. Temporäre dezente Platzhalter-Pfeiler bis das GLB geladen ist
  const fallbackGroup = new THREE.Group();
  const fallbackPillarLeft = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, gateHeight, 0.8),
    stoneMat
  );
  fallbackPillarLeft.position.set(-gateHalfWidth, gateHeight / 2, 0);
  fallbackPillarLeft.userData = { interactableType: 'gate' };
  fallbackGroup.add(fallbackPillarLeft);

  const fallbackPillarRight = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, gateHeight, 0.8),
    stoneMat
  );
  fallbackPillarRight.position.set(gateHalfWidth, gateHeight / 2, 0);
  fallbackPillarRight.userData = { interactableType: 'gate' };
  fallbackGroup.add(fallbackPillarRight);

  group.add(fallbackGroup);

  // Gespeicherte Materialien des GLB-Modells für den Hover-Leuchteffekt
  const modelMaterials: THREE.MeshStandardMaterial[] = [];

  // 2. GLB-Modell des prachtvollen Ziertores laden
  const loader = new GLTFLoader();
  loader.load(
    '/assets/models/ornate gate 3d model.glb',
    (gltf) => {
      const model = gltf.scene;

      // Gleichmäßiges Upscaling auf majestätische Portalgröße
      model.scale.setScalar(gateScale);

      // Passgenau auf Bodenniveau (y = 0) aufsetzen
      model.updateMatrixWorld(true);
      const bounds = new THREE.Box3().setFromObject(model);
      model.position.set(0, -bounds.min.y, 0);

      model.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          mesh.userData = { interactableType: 'gate' };

          const mats = Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material];
          for (const mat of mats) {
            if (mat && 'emissive' in mat) {
              const stdMat = mat as THREE.MeshStandardMaterial;
              stdMat.roughness = 0.65;
              stdMat.metalness = 0.52;
              modelMaterials.push(stdMat);
            }
          }

          if (onMeshLoaded) {
            onMeshLoaded(mesh);
          }
        }
      });

      // Platzhalter entfernen und fertiges Tor-Modell einfügen
      group.remove(fallbackGroup);
      disposeObject3D(fallbackGroup);
      group.add(model);
    },
    undefined,
    (err) => {
      console.warn('Ornate-Gate-GLB konnte nicht geladen werden, nutze Platzhalter:', err);
    }
  );

  // 3. Dicke Eisenketten und massives Vorhängeschloss in der Tormitte
  const lockGroup = new THREE.Group();
  lockGroup.position.set(0, 1.65, 0.18);

  for (const rotY of [-0.22, 0.22]) {
    const chain = new THREE.Mesh(
      new THREE.TorusGeometry(0.36, 0.05, 6, 14),
      chainMat
    );
    chain.position.set(0, 0, 0);
    chain.rotation.y = rotY;
    chain.castShadow = true;
    chain.userData = { interactableType: 'gate' };
    lockGroup.add(chain);
  }

  const lockBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.32, 0.38, 0.16),
    brassLockMat
  );
  lockBody.position.set(0, -0.22, 0.06);
  lockBody.castShadow = true;
  lockBody.userData = { interactableType: 'gate' };
  lockGroup.add(lockBody);

  const lockShackle = new THREE.Mesh(
    new THREE.TorusGeometry(0.14, 0.04, 6, 12, Math.PI),
    ironMat
  );
  lockShackle.position.set(0, -0.02, 0.06);
  lockShackle.rotation.x = Math.PI;
  lockShackle.userData = { interactableType: 'gate' };
  lockGroup.add(lockShackle);

  group.add(lockGroup);

  // 4. Anschließende alte Steinmauern links und rechts (riegeln das Tal nahtlos ab)
  // Das Fundament reicht 2.4m tief ins Erdreich, damit an Hangkuppen kein Spalt entsteht
  const wallSegmentLength = 8.5;
  const wallHeight = 3.6;
  const wallFoundationDepth = 2.4;
  const totalWallHeight = wallHeight + wallFoundationDepth;
  const wallThickness = 0.85;

  for (const side of [-1, 1]) {
    const wallMesh = new THREE.Mesh(
      new THREE.BoxGeometry(wallSegmentLength, totalWallHeight, wallThickness),
      side === -1 ? stoneMat : mossStoneMat
    );
    // Schließt bündig an die Außenflanken des verzierten Tores an
    wallMesh.position.set(
      side * (gateHalfWidth + wallSegmentLength / 2 - 0.25),
      (wallHeight - wallFoundationDepth) / 2,
      -0.45
    );
    wallMesh.rotation.y = side * 0.08;
    wallMesh.castShadow = true;
    wallMesh.receiveShadow = true;
    wallMesh.userData = { interactableType: 'gate' };
    group.add(wallMesh);

    // Zinnen auf den Mauern
    const merlonCount = 4;
    for (let m = 0; m < merlonCount; m++) {
      const merlon = new THREE.Mesh(
        new THREE.BoxGeometry(1.0, 0.6, wallThickness + 0.05),
        stoneMat
      );
      merlon.position.set(
        side * (gateHalfWidth + 0.8 + m * 2.0),
        wallHeight + 0.3,
        -0.45
      );
      merlon.castShadow = true;
      merlon.userData = { interactableType: 'gate' };
      group.add(merlon);
    }
  }

  // 5. Schwebender Hinweis-Kristall über dem Torbogen
  const indicator = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.24, 0),
    indicatorMat
  );
  indicator.position.set(0, gateHeight + 0.55, 0);
  indicator.scale.set(0.9, 1.45, 0.9);
  group.add(indicator);

  // Alle anfänglichen Meshes für Raycasting als 'gate' markieren
  group.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.userData = { interactableType: 'gate' };
    }
  });

  const update = (
    timeSeconds: number,
    _playerPos: { x: number; z: number },
    highlighted: boolean
  ) => {
    // Kristall über dem Tor schweben und rotieren lassen
    indicator.position.y = gateHeight + 0.55 + Math.sin(timeSeconds * 2.5) * 0.08;
    indicator.rotation.y = timeSeconds * 1.2;

    // Hervorhebung bei Mouseover
    indicatorMat.emissiveIntensity = highlighted ? 1.4 : 0.65;
    const indScale = highlighted ? 1.25 : 1.0;
    indicator.scale.set(0.9 * indScale, 1.45 * indScale, 0.9 * indScale);

    // Warm-magischer Leuchteffekt auf dem metallischen Ziertor bei Hover
    const emissiveHex = highlighted ? 0x221838 : 0x000000;
    for (const mat of modelMaterials) {
      mat.emissive.setHex(emissiveHex);
      mat.emissiveIntensity = highlighted ? 0.38 : 0.0;
    }
  };

  return { group, update };
}
