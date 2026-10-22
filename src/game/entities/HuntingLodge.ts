import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { disposeObject3D } from '../utils/threeUtils';

export interface HuntingLodgeEntity {
  group: THREE.Group;
  update: (elapsedSeconds: number) => void;
}

/**
 * Erstellt die 3D-Szenerie am Ende des 6. Weges:
 * - Eine stolze, wehrhafte mittelalterliche Burg (`/assets/models/medieval castle 3d model.glb`)
 *   mit Wehrmauern, Zinnen, Erkern und Bergfried auf der Waldlichtung
 * - Ein wunderbarer, eingezäunter Kräutergarten mit Beeten (Lavendel, Königs-Salbei, seltene Mondwurz, Thymian, Ringelblumen)
 * - Schauplatz für den Wilden Jäger und die Holzweibchen
 */
export function createHuntingLodge(onMeshLoaded?: (mesh: THREE.Mesh) => void): HuntingLodgeEntity {
  const group = new THREE.Group();
  group.name = 'HuntingLodgeCastle';

  // --- MATERIALIEN FÜR PLATZHALTER & KRÄUTERGARTEN ---
  const stoneMat = new THREE.MeshStandardMaterial({
    color: 0x5a554e,
    roughness: 0.95,
    flatShading: true,
  });
  const fenceMat = new THREE.MeshStandardMaterial({
    color: 0x5c4228,
    roughness: 0.85,
    flatShading: true,
  });
  const soilMat = new THREE.MeshStandardMaterial({
    color: 0x332519,
    roughness: 0.98,
  });

  // Kräuter-Materialien
  const herbStemMat = new THREE.MeshStandardMaterial({ color: 0x2e5c26, roughness: 0.8 });
  const lavenderFlowerMat = new THREE.MeshStandardMaterial({
    color: 0x8a5cb8,
    roughness: 0.6,
    emissive: 0x351954,
    emissiveIntensity: 0.25,
  });
  const sageFlowerMat = new THREE.MeshStandardMaterial({
    color: 0x4b6699,
    roughness: 0.7,
  });
  const moonwortMat = new THREE.MeshStandardMaterial({
    color: 0xaef2e8,
    emissive: 0x2a7369,
    emissiveIntensity: 0.55,
    roughness: 0.3,
  });
  const marigoldFlowerMat = new THREE.MeshStandardMaterial({
    color: 0xfa9b1b,
    roughness: 0.6,
  });

  const loader = new GLTFLoader();

  // ==========================================
  // 1. MITTELALTERLICHE BURG (medieval castle 3d model neu.glb)
  // ==========================================
  const castleGroup = new THREE.Group();
  castleGroup.name = 'MedievalCastle';
  castleGroup.position.set(-2.8, 0, 0.4);

  // Temporärer Platzhalter während des Ladens (stilisierter Bergfried und Wehrmauer)
  const castleFallback = new THREE.Group();
  castleFallback.rotation.y = Math.PI;
  const keepFallback = new THREE.Mesh(
    new THREE.BoxGeometry(3.4, 4.2, 3.4),
    stoneMat
  );
  keepFallback.position.set(0, 2.1, -0.6);
  keepFallback.castShadow = true;
  keepFallback.receiveShadow = true;
  keepFallback.userData = { interactableType: 'hunting_lodge' };
  castleFallback.add(keepFallback);

  const wallFallback = new THREE.Mesh(
    new THREE.BoxGeometry(4.8, 2.6, 2.8),
    stoneMat
  );
  wallFallback.position.set(0, 1.3, 0.8);
  wallFallback.castShadow = true;
  wallFallback.receiveShadow = true;
  wallFallback.userData = { interactableType: 'hunting_lodge' };
  castleFallback.add(wallFallback);

  castleGroup.add(castleFallback);
  group.add(castleGroup);

  loader.load(
    '/assets/models/medieval castle 3d model neu.glb',
    (gltf) => {
      const model = gltf.scene;
      // Stattliche Skalierung (Breite ca. 8.2m, Höhe ca. 5.6m, Tiefe ca. 6.2m)
      model.scale.setScalar(8.2);
      // Drehung: um 180 Grad gedreht gegenüber der ursprünglichen Ausrichtung
      model.rotation.y = Math.PI * 0.25;

      model.updateMatrixWorld(true);
      const bounds = new THREE.Box3().setFromObject(model);
      model.position.set(0, -bounds.min.y, 0);

      model.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          mesh.userData = { interactableType: 'hunting_lodge' };

          if (mesh.material && 'roughness' in mesh.material) {
            const mat = mesh.material as THREE.MeshStandardMaterial;
            mat.roughness = 0.88;
            mat.metalness = 0.08;
          }

          if (onMeshLoaded) {
            onMeshLoaded(mesh);
          }
        }
      });

      castleGroup.remove(castleFallback);
      disposeObject3D(castleFallback);
      castleGroup.add(model);
    },
    undefined,
    (err) => {
      console.warn('Modell medieval castle 3d model neu.glb konnte nicht geladen werden:', err);
    }
  );

  // ==========================================
  // 2. DER KRÄUTERGARTEN (Beete, Zaun & Kräuter)
  // Platziert direkt vor der Burgruine, mit Pforte zur Lichtungsmitte
  // ==========================================
  const gardenGroup = new THREE.Group();
  gardenGroup.position.set(2.0, 0, 0.4);

  // Beeterde (zwei gepflegte Kräuterbeete, tief verankert)
  for (const bz of [-0.85, 0.85]) {
    const bed = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.28, 1.15), soilMat);
    bed.position.set(0, 0.05, bz);
    bed.receiveShadow = true;
    gardenGroup.add(bed);
  }

  // Rustikaler Lattenzaun rund um den Kräutergarten (mit Pforte an der rechten Seite)
  const fencePosts: THREE.Vector3[] = [
    // Nordzaun
    new THREE.Vector3(-1.7, 0, -1.6),
    new THREE.Vector3(-0.5, 0, -1.6),
    new THREE.Vector3(0.5, 0, -1.6),
    new THREE.Vector3(1.7, 0, -1.6),
    // Westzaun
    new THREE.Vector3(-1.7, 0, -0.5),
    new THREE.Vector3(-1.7, 0, 0.5),
    new THREE.Vector3(-1.7, 0, 1.6),
    // Südzaun
    new THREE.Vector3(-0.5, 0, 1.6),
    new THREE.Vector3(0.5, 0, 1.6),
    new THREE.Vector3(1.7, 0, 1.6),
    // Ostzaun (Pforte frei bei z = 0)
    new THREE.Vector3(1.7, 0, -0.9),
    new THREE.Vector3(1.7, 0, 0.9),
  ];

  for (const p of fencePosts) {
    const post = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.055, 1.1, 6),
      fenceMat
    );
    post.position.set(p.x, 0.42, p.z);
    post.castShadow = true;
    gardenGroup.add(post);
  }

  // Querlatten des Zauns
  const fenceRails: { x: number; z: number; len: number; rotY: number }[] = [
    { x: 0, z: -1.6, len: 3.4, rotY: 0 },
    { x: -1.7, z: 0, len: 3.2, rotY: Math.PI / 2 },
    { x: 0, z: 1.6, len: 3.4, rotY: 0 },
    { x: 1.7, z: -1.25, len: 0.7, rotY: Math.PI / 2 },
    { x: 1.7, z: 1.25, len: 0.7, rotY: Math.PI / 2 },
  ];

  for (const r of fenceRails) {
    for (const h of [0.28, 0.62]) {
      const rail = new THREE.Mesh(
        new THREE.BoxGeometry(r.len, 0.05, 0.03),
        fenceMat
      );
      rail.position.set(r.x, h, r.z);
      rail.rotation.y = r.rotY;
      rail.castShadow = true;
      gardenGroup.add(rail);
    }
  }

  // Wassertrog / Holzbottich zum Gießen am Gartenrand
  const tub = new THREE.Mesh(
    new THREE.CylinderGeometry(0.34, 0.30, 0.42, 10),
    stoneMat
  );
  tub.position.set(1.25, 0.21, 1.2);
  tub.castShadow = true;
  gardenGroup.add(tub);

  const tubWater = new THREE.Mesh(
    new THREE.CircleGeometry(0.28, 10),
    new THREE.MeshStandardMaterial({
      color: 0x3d7b88,
      roughness: 0.1,
      metalness: 0.2,
    })
  );
  tubWater.rotation.x = -Math.PI / 2;
  tubWater.position.set(1.25, 0.38, 1.2);
  gardenGroup.add(tubWater);

  // Kräuter-Pflanzen in den Beeten
  const herbStems: THREE.Group[] = [];

  // Beet 1 (Nord): Königs-Salbei und Duftender Lavendel
  for (let col = -1.1; col <= 1.1; col += 0.42) {
    // Salbei-Reihe
    const sageCluster = new THREE.Group();
    sageCluster.position.set(col, 0.12, -1.05);
    for (let s = 0; s < 3; s++) {
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.02, 0.32, 5), herbStemMat);
      stem.position.set((s - 1) * 0.06, 0.16, 0);
      stem.rotation.z = (s - 1) * 0.15;
      sageCluster.add(stem);

      const flower = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.16, 6), sageFlowerMat);
      flower.position.set((s - 1) * 0.06, 0.34, 0);
      sageCluster.add(flower);
    }
    gardenGroup.add(sageCluster);
    herbStems.push(sageCluster);

    // Lavendel-Reihe
    const lavCluster = new THREE.Group();
    lavCluster.position.set(col + 0.15, 0.12, -0.6);
    for (let l = 0; l < 4; l++) {
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.016, 0.38, 5), herbStemMat);
      stem.position.set((l - 1.5) * 0.05, 0.19, (l % 2) * 0.03);
      lavCluster.add(stem);

      const flower = new THREE.Mesh(new THREE.CapsuleGeometry(0.03, 0.14, 4, 6), lavenderFlowerMat);
      flower.position.set((l - 1.5) * 0.05, 0.38, (l % 2) * 0.03);
      lavCluster.add(flower);
    }
    gardenGroup.add(lavCluster);
    herbStems.push(lavCluster);
  }

  // Beet 2 (Süd): Seltene Mondwurz (zentral!), Thymian und Ringelblumen
  for (const mx of [-1.1, -0.7, 0.7, 1.1]) {
    const marigold = new THREE.Group();
    marigold.position.set(mx, 0.12, 0.85);
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.022, 0.24, 5), herbStemMat);
    stem.position.y = 0.12;
    marigold.add(stem);
    const bloom = new THREE.Mesh(new THREE.SphereGeometry(0.065, 7, 7), marigoldFlowerMat);
    bloom.position.y = 0.24;
    bloom.scale.set(1.0, 0.45, 1.0);
    marigold.add(bloom);
    gardenGroup.add(marigold);
    herbStems.push(marigold);
  }

  // Die kostbare Mondwurz in der Mitte des Beetes (silbrig-cyan schimmernd)
  const moonwortGroup = new THREE.Group();
  moonwortGroup.position.set(0, 0.12, 0.85);
  for (let m = 0; m < 5; m++) {
    const mAngle = (m * Math.PI * 2) / 5;
    const mStem = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.02, 0.34, 5), herbStemMat);
    mStem.position.set(Math.cos(mAngle) * 0.12, 0.17, Math.sin(mAngle) * 0.12);
    mStem.rotation.x = Math.sin(mAngle) * 0.22;
    mStem.rotation.z = -Math.cos(mAngle) * 0.22;
    moonwortGroup.add(mStem);

    const mLeaf = new THREE.Mesh(new THREE.OctahedronGeometry(0.065, 0), moonwortMat);
    mLeaf.position.set(Math.cos(mAngle) * 0.15, 0.35, Math.sin(mAngle) * 0.15);
    mLeaf.scale.set(0.8, 1.5, 0.8);
    moonwortGroup.add(mLeaf);
  }

  // Sanftes Mondwurz-Licht
  const moonwortLight = new THREE.PointLight(0x76ebe0, 0.85, 3.2);
  moonwortLight.position.set(0, 0.45, 0);
  moonwortGroup.add(moonwortLight);

  gardenGroup.add(moonwortGroup);
  herbStems.push(moonwortGroup);

  gardenGroup.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.userData = { interactableType: 'herb_garden' };
    }
  });
  group.add(gardenGroup);

  // ==========================================
  // UPDATE LOOP (Kräuter-Wogen & Mondwurz-Pulsieren)
  // ==========================================
  const update = (elapsedSeconds: number): void => {
    // 1. Sanftes Wogen der Kräuter im Wind
    const wind = Math.sin(elapsedSeconds * 2.2);
    for (let h = 0; h < herbStems.length; h++) {
      herbStems[h].rotation.z = wind * (0.04 + (h % 3) * 0.015);
    }

    // 2. Mondwurz-Pulsieren
    moonwortLight.intensity = 0.85 + Math.sin(elapsedSeconds * 2.5) * 0.35;
  };

  return { group, update };
}
