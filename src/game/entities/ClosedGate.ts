import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createSandstoneWallTexture } from '../textures/GroundTextures';
import { disposeObject3D } from '../utils/threeUtils';

export interface ClosedGateEntity {
  group: THREE.Group;
  update: (timeSeconds: number, playerPos: { x: number; z: number }, highlighted: boolean) => void;
}

/**
 * Erstellt das 3D-Modell des uralten, reich verzierten und verschlossenen Portals am Ende von Weg 7:
 * - Lädt das detailreiche Schmiedetor-Modell `/assets/models/ornate gate 3d model.glb`
 * - Harmonische Skalierung (Breite ca. 6.8m, Höhe ca. 4.5m)
 * - Anschließende Sandstein-Quadersteinmauern links und rechts ohne Zinnen, mit flacher Mauerkrone
 *   und tiefem 2.4m-Fundament gegen Boden-Clipping
 * - Dicke Eisenketten und massives Vorhängeschloss in der Tormitte als Symbol des Siegels
 * - Schwebender, leuchtender Hinweis-Kristall über dem Torbogen für die Interaktion
 */
export function createClosedGate(
  onMeshLoaded?: (mesh: THREE.Mesh) => void
): ClosedGateEntity {
  const group = new THREE.Group();
  group.name = 'ClosedGate';

  // --- MATERIALIEN FÜR FLANKIERENDE MAUERN & SCHLOSS ---
  const wallTex = createSandstoneWallTexture();
  if (wallTex.map) wallTex.map.repeat.set(2.8, 1.6);
  if (wallTex.bumpMap) wallTex.bumpMap.repeat.set(2.8, 1.6);

  const stoneMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: wallTex.map ?? undefined,
    bumpMap: wallTex.bumpMap ?? undefined,
    bumpScale: 0.08,
    roughness: 0.76,
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

  // 3. Geheimnisvolle Schatztruhe direkt hinter dem Tor
  const chestGroup = new THREE.Group();
  chestGroup.name = 'GateTreasureChest';
  chestGroup.position.set(0, 0, -2.6); // 2.6m hinter dem Tor
  chestGroup.rotation.y = 0.12; // leicht malerisch gedreht

  const chestLoader = new GLTFLoader();
  chestLoader.load(
    '/assets/models/treasure chest 3d model.glb',
    (gltf) => {
      const chestModel = gltf.scene;
      // Skalierung: 1.35x für eine stattliche, prächtige Schatztruhe (Breite ca. 1.35m, Höhe ca. 0.91m)
      chestModel.scale.setScalar(1.35);

      chestModel.updateMatrixWorld(true);
      const bounds = new THREE.Box3().setFromObject(chestModel);
      chestModel.position.set(0, -bounds.min.y, 0);

      chestModel.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          mesh.userData = { interactableType: 'gate' };
          if (onMeshLoaded) {
            onMeshLoaded(mesh);
          }
        }
      });

      chestGroup.add(chestModel);
    },
    undefined,
    (err) => {
      console.warn('Schatztruhe hinter dem Tor konnte nicht geladen werden:', err);
    }
  );

  // Geheimnisvoller, goldener Lichtschein über der Schatztruhe
  const chestLight = new THREE.PointLight(0xffd269, 1.15, 5.0);
  chestLight.position.set(0, 0.85, 0);
  chestGroup.add(chestLight);

  group.add(chestGroup);

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
      stoneMat
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

    // Glatte, zinnenlose Mauerkronen-Abdeckung (schließt die Mauer sauber nach oben ab)
    const coping = new THREE.Mesh(
      new THREE.BoxGeometry(wallSegmentLength + 0.1, 0.16, wallThickness + 0.12),
      stoneMat
    );
    coping.position.set(
      side * (gateHalfWidth + wallSegmentLength / 2 - 0.25),
      wallHeight + 0.08,
      -0.45
    );
    coping.rotation.y = side * 0.08;
    coping.castShadow = true;
    coping.receiveShadow = true;
    coping.userData = { interactableType: 'gate' };
    group.add(coping);
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

    // Geheimnisvolles, sanftes Pulsieren des Schatzlichts hinter dem Tor
    chestLight.intensity = 1.05 + 0.22 * Math.sin(timeSeconds * 2.2);
  };

  return { group, update };
}
