import * as THREE from 'three';

export interface HuntingLodgeEntity {
  group: THREE.Group;
  update: (elapsedSeconds: number) => void;
}

/**
 * Erstellt die 3D-Szenerie am Ende des 6. Weges:
 * - Eine urige Jagdhütte aus Blockbalken mit Schindeldach, Steinkamin, Hirschgeweih über der Tür und Fenster
 * - Ein wunderbarer, eingezäunter Kräutergarten mit Beeten (Lavendel, Königs-Salbei, seltene Mondwurz, Thymian, Ringelblumen)
 * - Das Jagdpferd des Wilden Jägers mit Zaumzeug und sanft wehendem Schweif
 * - Der aufmerksame Jagdhund mit wedelnder Rute
 */
export function createHuntingLodge(): HuntingLodgeEntity {
  const group = new THREE.Group();
  group.name = 'HuntingLodge';

  // --- MATERIALIEN ---
  const logMat = new THREE.MeshStandardMaterial({
    color: 0x4a331e,
    roughness: 0.88,
    flatShading: true,
  });
  const roofMat = new THREE.MeshStandardMaterial({
    color: 0x2e1f13,
    roughness: 0.92,
    flatShading: true,
  });
  const chimneyStoneMat = new THREE.MeshStandardMaterial({
    color: 0x5a554e,
    roughness: 0.95,
    flatShading: true,
  });
  const hornMat = new THREE.MeshStandardMaterial({
    color: 0xd8ceb8,
    roughness: 0.65,
    flatShading: true,
  });
  const windowGlowMat = new THREE.MeshStandardMaterial({
    color: 0xffb84d,
    emissive: 0xcc7a14,
    emissiveIntensity: 0.7,
    roughness: 0.3,
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

  // Tier-Materialien (Pferd & Hund)
  const horseCoatMat = new THREE.MeshStandardMaterial({ color: 0x4a2810, roughness: 0.75 });
  const horseManeMat = new THREE.MeshStandardMaterial({ color: 0x1f1107, roughness: 0.9 });
  const horseLeatherMat = new THREE.MeshStandardMaterial({ color: 0x261609, roughness: 0.6 });
  const dogFurMat = new THREE.MeshStandardMaterial({ color: 0x6e3816, roughness: 0.8 });
  const dogPatchMat = new THREE.MeshStandardMaterial({ color: 0xe8e1d5, roughness: 0.8 });
  const smokeMat = new THREE.MeshStandardMaterial({
    color: 0xd4d8d6,
    roughness: 0.9,
    transparent: true,
    opacity: 0.45,
  });

  // ==========================================
  // 1. DIE JAGDHÜTTE (Blockbau mit Kamin & Geweih)
  // ==========================================
  const cabinGroup = new THREE.Group();
  cabinGroup.position.set(-2.4, 0, 3.2);

  // Fundament / Boden
  const floor = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.3, 3.8), logMat);
  floor.position.y = 0.15;
  floor.receiveShadow = true;
  cabinGroup.add(floor);

  // Wände aus horizontalen Blockbohlen
  const wallLevels = 8;
  const wallLogRadius = 0.14;
  for (let i = 0; i < wallLevels; i++) {
    const y = 0.3 + wallLogRadius + i * (wallLogRadius * 1.85);

    // Rückwand
    const backLog = new THREE.Mesh(
      new THREE.CylinderGeometry(wallLogRadius, wallLogRadius, 4.3, 8),
      logMat
    );
    backLog.rotation.z = Math.PI / 2;
    backLog.position.set(0, y, -1.75);
    backLog.castShadow = true;
    backLog.receiveShadow = true;
    cabinGroup.add(backLog);

    // Linke Seitenwand
    const leftLog = new THREE.Mesh(
      new THREE.CylinderGeometry(wallLogRadius, wallLogRadius, 3.6, 8),
      logMat
    );
    leftLog.rotation.x = Math.PI / 2;
    leftLog.position.set(-2.05, y, 0);
    leftLog.castShadow = true;
    leftLog.receiveShadow = true;
    cabinGroup.add(leftLog);

    // Rechte Seitenwand
    const rightLog = new THREE.Mesh(
      new THREE.CylinderGeometry(wallLogRadius, wallLogRadius, 3.6, 8),
      logMat
    );
    rightLog.rotation.x = Math.PI / 2;
    rightLog.position.set(2.05, y, 0);
    rightLog.castShadow = true;
    rightLog.receiveShadow = true;
    cabinGroup.add(rightLog);

    // Vorderwand (mit Aussparung für Tür)
    for (const side of [-1.45, 1.45]) {
      const frontLog = new THREE.Mesh(
        new THREE.CylinderGeometry(wallLogRadius, wallLogRadius, 1.25, 8),
        logMat
      );
      frontLog.rotation.z = Math.PI / 2;
      frontLog.position.set(side, y, 1.75);
      frontLog.castShadow = true;
      frontLog.receiveShadow = true;
      cabinGroup.add(frontLog);
    }
  }

  // Balken über der Tür
  const lintelLog = new THREE.Mesh(
    new THREE.CylinderGeometry(wallLogRadius, wallLogRadius, 4.3, 8),
    logMat
  );
  lintelLog.rotation.z = Math.PI / 2;
  lintelLog.position.set(0, 2.35, 1.75);
  lintelLog.castShadow = true;
  cabinGroup.add(lintelLog);

  // Schindeldach (Satteldach)
  const roofLeft = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.14, 4.4), roofMat);
  roofLeft.position.set(-1.15, 2.9, 0);
  roofLeft.rotation.z = 0.58;
  roofLeft.castShadow = true;
  roofLeft.receiveShadow = true;
  cabinGroup.add(roofLeft);

  const roofRight = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.14, 4.4), roofMat);
  roofRight.position.set(1.15, 2.9, 0);
  roofRight.rotation.z = -0.58;
  roofRight.castShadow = true;
  roofRight.receiveShadow = true;
  cabinGroup.add(roofRight);

  // Giebel-Dreiecke vorn und hinten
  for (const gz of [1.74, -1.74]) {
    const gable = new THREE.Mesh(new THREE.ConeGeometry(2.2, 1.4, 4), logMat);
    gable.position.set(0, 3.0, gz);
    gable.rotation.y = Math.PI / 4;
    gable.scale.set(1.0, 1.0, 0.08);
    gable.castShadow = true;
    cabinGroup.add(gable);
  }

  // Steinkamin an der linken Hüttenwand
  const chimneyBase = new THREE.Mesh(
    new THREE.BoxGeometry(0.85, 2.8, 0.95),
    chimneyStoneMat
  );
  chimneyBase.position.set(-2.2, 1.4, -0.6);
  chimneyBase.castShadow = true;
  cabinGroup.add(chimneyBase);

  const chimneyTop = new THREE.Mesh(
    new THREE.BoxGeometry(0.65, 1.8, 0.75),
    chimneyStoneMat
  );
  chimneyTop.position.set(-2.2, 3.5, -0.6);
  chimneyTop.castShadow = true;
  cabinGroup.add(chimneyTop);

  // Animierte Kaminrauch-Puffs
  const smokePuffs: THREE.Mesh[] = [];
  for (let s = 0; s < 5; s++) {
    const puff = new THREE.Mesh(new THREE.SphereGeometry(0.18 + s * 0.05, 7, 7), smokeMat);
    puff.position.set(-2.2, 4.4 + s * 0.45, -0.6);
    cabinGroup.add(puff);
    smokePuffs.push(puff);
  }

  // Hirschgeweih über dem Eingang
  const antlerGroup = new THREE.Group();
  antlerGroup.position.set(0, 2.52, 1.88);

  const skullCenter = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), hornMat);
  skullCenter.scale.set(1.0, 1.4, 0.6);
  antlerGroup.add(skullCenter);

  for (const side of [-1, 1]) {
    // Hauptstange des Geweihs
    const beam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.022, 0.038, 0.58, 6),
      hornMat
    );
    beam.position.set(side * 0.22, 0.24, 0.04);
    beam.rotation.z = -side * 0.72;
    beam.rotation.x = -0.15;
    antlerGroup.add(beam);

    // Endsprossen (Augsprosse & Mittelsprosse)
    for (let sp = 1; sp <= 3; sp++) {
      const tine = new THREE.Mesh(
        new THREE.ConeGeometry(0.02, 0.22, 5),
        hornMat
      );
      tine.position.set(side * (0.12 + sp * 0.09), 0.18 + sp * 0.1, 0.06);
      tine.rotation.z = -side * (0.35 + sp * 0.2);
      tine.rotation.x = 0.25;
      antlerGroup.add(tine);
    }
  }
  cabinGroup.add(antlerGroup);

  // Erleuchtetes Fenster an der Vorderfront
  const windowMesh = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.65, 0.08), windowGlowMat);
  windowMesh.position.set(1.45, 1.35, 1.82);
  cabinGroup.add(windowMesh);

  // Kleiner Holzstapel an der Hüttenwand
  for (let l = 0; l < 4; l++) {
    for (let k = 0; k < 3; k++) {
      const firewood = new THREE.Mesh(
        new THREE.CylinderGeometry(0.07, 0.07, 0.75, 6),
        logMat
      );
      firewood.rotation.x = Math.PI / 2;
      firewood.position.set(-1.85, 0.38 + l * 0.14, 1.4 - k * 0.16);
      firewood.castShadow = true;
      cabinGroup.add(firewood);
    }
  }

  cabinGroup.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.userData = { interactableType: 'hunting_lodge' };
    }
  });
  group.add(cabinGroup);

  // ==========================================
  // 2. DER KRÄUTERGARTEN (Beete, Zaun & Kräuter)
  // ==========================================
  const gardenGroup = new THREE.Group();
  gardenGroup.position.set(-2.5, 0, -1.8);

  // Beeterde (zwei gepflegte Kräuterbeete)
  for (const bz of [-0.9, 0.9]) {
    const bed = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.12, 1.25), soilMat);
    bed.position.set(0, 0.06, bz);
    bed.receiveShadow = true;
    gardenGroup.add(bed);
  }

  // Rustikaler Lattenzaun rund um den Kräutergarten (mit Pforte an der rechten Seite)
  const fencePosts: THREE.Vector3[] = [
    // Nordzaun
    new THREE.Vector3(-1.9, 0, -1.8),
    new THREE.Vector3(-0.6, 0, -1.8),
    new THREE.Vector3(0.6, 0, -1.8),
    new THREE.Vector3(1.9, 0, -1.8),
    // Westzaun
    new THREE.Vector3(-1.9, 0, -0.6),
    new THREE.Vector3(-1.9, 0, 0.6),
    new THREE.Vector3(-1.9, 0, 1.8),
    // Südzaun (Richtung Hütte)
    new THREE.Vector3(-0.6, 0, 1.8),
    new THREE.Vector3(0.6, 0, 1.8),
    new THREE.Vector3(1.9, 0, 1.8),
    // Ostzaun (Pforte frei bei z = 0)
    new THREE.Vector3(1.9, 0, -1.0),
    new THREE.Vector3(1.9, 0, 1.0),
  ];

  for (const p of fencePosts) {
    const post = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.055, 0.85, 6),
      fenceMat
    );
    post.position.set(p.x, 0.42, p.z);
    post.castShadow = true;
    gardenGroup.add(post);
  }

  // Querlatten des Zauns
  const fenceRails: { x: number; z: number; len: number; rotY: number }[] = [
    { x: 0, z: -1.8, len: 3.8, rotY: 0 },
    { x: -1.9, z: 0, len: 3.6, rotY: Math.PI / 2 },
    { x: 0, z: 1.8, len: 3.8, rotY: 0 },
    { x: 1.9, z: -1.4, len: 0.8, rotY: Math.PI / 2 },
    { x: 1.9, z: 1.4, len: 0.8, rotY: Math.PI / 2 },
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
    new THREE.CylinderGeometry(0.36, 0.32, 0.45, 10),
    logMat
  );
  tub.position.set(1.4, 0.22, 1.35);
  tub.castShadow = true;
  gardenGroup.add(tub);

  const tubWater = new THREE.Mesh(
    new THREE.CircleGeometry(0.32, 10),
    new THREE.MeshStandardMaterial({
      color: 0x3d7b88,
      roughness: 0.1,
      metalness: 0.2,
    })
  );
  tubWater.rotation.x = -Math.PI / 2;
  tubWater.position.set(1.4, 0.41, 1.35);
  gardenGroup.add(tubWater);

  // Kräuter-Pflanzen in den Beeten
  const herbStems: THREE.Group[] = [];

  // Beet 1 (Nord): Königs-Salbei und Duftender Lavendel
  for (let col = -1.2; col <= 1.2; col += 0.42) {
    // Salbei-Reihe
    const sageCluster = new THREE.Group();
    sageCluster.position.set(col, 0.12, -1.15);
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
    lavCluster.position.set(col + 0.15, 0.12, -0.65);
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
  // Ringelblumen an den Enden
  for (const mx of [-1.2, -0.8, 0.8, 1.2]) {
    const marigold = new THREE.Group();
    marigold.position.set(mx, 0.12, 0.9);
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
  moonwortGroup.position.set(0, 0.12, 0.9);
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
  // 3. DAS JAGDPFERD DES WILDEN JÄGERS
  // ==========================================
  const horseGroup = new THREE.Group();
  horseGroup.position.set(0.6, 0, -2.4);
  horseGroup.rotation.y = 0.45;

  // Rumpf
  const horseBody = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.42, 1.25, 8, 10),
    horseCoatMat
  );
  horseBody.rotation.x = Math.PI / 2;
  horseBody.position.y = 1.35;
  horseBody.castShadow = true;
  horseGroup.add(horseBody);

  // Satteldecke / Reitzeug
  const saddle = new THREE.Mesh(
    new THREE.BoxGeometry(0.68, 0.2, 0.62),
    horseLeatherMat
  );
  saddle.position.set(0, 1.58, 0.05);
  saddle.castShadow = true;
  horseGroup.add(saddle);

  // Hals
  const horseNeck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.24, 0.34, 0.85, 8),
    horseCoatMat
  );
  horseNeck.position.set(0, 1.82, 0.65);
  horseNeck.rotation.x = -0.55;
  horseNeck.castShadow = true;
  horseGroup.add(horseNeck);

  // Kopf
  const horseHead = new THREE.Mesh(
    new THREE.ConeGeometry(0.22, 0.68, 8),
    horseCoatMat
  );
  horseHead.position.set(0, 2.12, 0.98);
  horseHead.rotation.x = 1.2;
  horseHead.castShadow = true;
  horseGroup.add(horseHead);

  // Ohren
  for (const side of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.16, 5), horseCoatMat);
    ear.position.set(side * 0.1, 2.38, 0.88);
    ear.rotation.z = -side * 0.25;
    horseGroup.add(ear);
  }

  // Mähne
  const mane = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.72, 0.18),
    horseManeMat
  );
  mane.position.set(0, 1.95, 0.58);
  mane.rotation.x = -0.55;
  horseGroup.add(mane);

  // Vier Pferdebeine
  const legPositions: [number, number][] = [
    [-0.26, 0.48],
    [0.26, 0.48],
    [-0.26, -0.48],
    [0.26, -0.48],
  ];
  for (const [lx, lz] of legPositions) {
    const leg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.075, 1.35, 7),
      horseCoatMat
    );
    leg.position.set(lx, 0.68, lz);
    leg.castShadow = true;
    horseGroup.add(leg);

    // Huf
    const hoof = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.095, 0.12, 7),
      horseManeMat
    );
    hoof.position.set(lx, 0.06, lz);
    horseGroup.add(hoof);
  }

  // Animierter Schweif
  const horseTail = new THREE.Mesh(
    new THREE.ConeGeometry(0.12, 0.78, 6),
    horseManeMat
  );
  horseTail.position.set(0, 1.32, -0.72);
  horseTail.rotation.x = 0.35;
  horseTail.castShadow = true;
  horseGroup.add(horseTail);

  horseGroup.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.userData = { interactableType: 'wild_hunter' };
    }
  });
  group.add(horseGroup);

  // ==========================================
  // 4. DER TREUE JAGDHUND
  // ==========================================
  const dogGroup = new THREE.Group();
  dogGroup.position.set(1.2, 0, -0.9);
  dogGroup.rotation.y = 1.95;

  // Körper
  const dogBody = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.18, 0.54, 7, 8),
    dogFurMat
  );
  dogBody.rotation.x = Math.PI / 2;
  dogBody.position.y = 0.45;
  dogBody.castShadow = true;
  dogGroup.add(dogBody);

  // Weiße Brustpartie
  const dogChest = new THREE.Mesh(
    new THREE.SphereGeometry(0.19, 7, 7),
    dogPatchMat
  );
  dogChest.position.set(0, 0.46, 0.18);
  dogChest.scale.set(0.9, 1.0, 0.8);
  dogGroup.add(dogChest);

  // Kopf mit Schnauze
  const dogHead = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 8), dogFurMat);
  dogHead.position.set(0, 0.65, 0.38);
  dogHead.castShadow = true;
  dogGroup.add(dogHead);

  const dogSnout = new THREE.Mesh(
    new THREE.BoxGeometry(0.11, 0.09, 0.16),
    dogPatchMat
  );
  dogSnout.position.set(0, 0.62, 0.5);
  dogGroup.add(dogSnout);

  // Schlappohren
  for (const side of [-1, 1]) {
    const ear = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.04, 0.14, 4, 6),
      dogFurMat
    );
    ear.position.set(side * 0.12, 0.62, 0.36);
    ear.rotation.z = -side * 0.45;
    dogGroup.add(ear);
  }

  // 4 Hundeläufe
  for (const [dx, dz] of [
    [-0.12, 0.22],
    [0.12, 0.22],
    [-0.12, -0.2],
    [0.12, -0.2],
  ]) {
    const leg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.042, 0.038, 0.42, 6),
      dogPatchMat
    );
    leg.position.set(dx, 0.21, dz);
    leg.castShadow = true;
    dogGroup.add(leg);
  }

  // Animierte Rute (Schwanz)
  const dogTail = new THREE.Mesh(
    new THREE.ConeGeometry(0.04, 0.32, 5),
    dogFurMat
  );
  dogTail.position.set(0, 0.52, -0.32);
  dogTail.rotation.x = 0.75;
  dogTail.castShadow = true;
  dogGroup.add(dogTail);

  dogGroup.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.userData = { interactableType: 'wild_hunter' };
    }
  });
  group.add(dogGroup);

  // ==========================================
  // UPDATE LOOP (Rauch, Schweifwedeln & Kräuter)
  // ==========================================
  const update = (elapsedSeconds: number): void => {
    // 1. Kaminrauch aufsteigen und wabern lassen
    for (let s = 0; s < smokePuffs.length; s++) {
      const puff = smokePuffs[s];
      const cycle = (elapsedSeconds * 0.75 + s * 0.35) % 2.0;
      puff.position.y = 4.2 + cycle * 1.35;
      puff.position.x = -2.2 + Math.sin(elapsedSeconds * 1.5 + s) * 0.12;
      const scale = 0.8 + cycle * 0.55;
      puff.scale.set(scale, scale, scale);
      (puff.material as THREE.MeshStandardMaterial).opacity = Math.max(
        0,
        0.55 - (cycle / 2.0) * 0.5
      );
    }

    // 2. Pferdeschweif wedelt ruhig
    horseTail.rotation.z = Math.sin(elapsedSeconds * 1.8) * 0.22;
    horseNeck.rotation.x = -0.55 + Math.sin(elapsedSeconds * 1.2) * 0.04;

    // 3. Jagdhund wedelt lebhaft mit dem Schwanz und atmet
    dogTail.rotation.y = Math.sin(elapsedSeconds * 6.0) * 0.45;
    dogBody.scale.y = 1.0 + Math.sin(elapsedSeconds * 3.0) * 0.03;

    // 4. Sanftes Wogen der Kräuter im Wind
    const wind = Math.sin(elapsedSeconds * 2.2);
    for (let h = 0; h < herbStems.length; h++) {
      herbStems[h].rotation.z = wind * (0.04 + (h % 3) * 0.015);
    }

    // 5. Mondwurz-Pulsieren
    moonwortLight.intensity = 0.85 + Math.sin(elapsedSeconds * 2.5) * 0.35;
  };

  return { group, update };
}
