import * as THREE from 'three';

export interface GiantNpcEntity {
  group: THREE.Group;
  update: (timeSeconds: number, playerPos: { x: number; z: number }, highlighted: boolean) => void;
}

/**
 * Erstellt die 3D-Figur des Riesen („Der Riese am Wehr“), der am Ende des 3. Weges
 * neben der Brücke und dem kleinen Stausee das geschlossene Wehr bewacht.
 */
export function createGiantNpc(): GiantNpcEntity {
  const group = new THREE.Group();
  group.name = 'GiantNpc';

  // Unsichtbare Hitbox für zuverlässiges Anklicken der großen Gestalt
  const hitboxMat = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const hitbox = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.9, 3.1, 12), hitboxMat);
  hitbox.position.y = 1.55;
  hitbox.userData = { interactableType: 'giant' };
  group.add(hitbox);

  const skinMat = new THREE.MeshStandardMaterial({
    color: 0xa69580,
    roughness: 0.72,
    emissive: 0x000000,
  });

  const tunicMat = new THREE.MeshStandardMaterial({
    color: 0x4a3b2a,
    roughness: 0.88,
    emissive: 0x000000,
  });

  const mossShoulderMat = new THREE.MeshStandardMaterial({
    color: 0x365938,
    roughness: 0.9,
    flatShading: true,
    emissive: 0x000000,
  });

  const beardMat = new THREE.MeshStandardMaterial({
    color: 0x5c5349,
    roughness: 0.85,
  });

  const stoneHammerMat = new THREE.MeshStandardMaterial({
    color: 0x555e63,
    roughness: 0.85,
    flatShading: true,
  });

  const woodShaftMat = new THREE.MeshStandardMaterial({
    color: 0x422a17,
    roughness: 0.9,
  });

  const bodyRoot = new THREE.Group();
  group.add(bodyRoot);

  // 1. Kräftige Stiefel / Beine des Riesen
  for (const side of [-1, 1]) {
    const leg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.28, 1.05, 10),
      tunicMat
    );
    leg.position.set(side * 0.34, 0.52, 0);
    leg.castShadow = true;
    bodyRoot.add(leg);
  }

  // 2. Mächtiger Rumpf im Fell- und Felsenwams (Höhe bis ca. 2.15 m)
  const torso = new THREE.Mesh(
    new THREE.CylinderGeometry(0.62, 0.54, 1.25, 12),
    tunicMat
  );
  torso.position.set(0, 1.52, 0);
  torso.castShadow = true;
  bodyRoot.add(torso);

  // Breiter Gürtel mit eisernem Wehrschlüssel-Ring
  const belt = new THREE.Mesh(new THREE.CylinderGeometry(0.57, 0.57, 0.18, 12), woodShaftMat);
  belt.position.set(0, 1.08, 0);
  bodyRoot.add(belt);

  // 3. Bemooste Felsschultern links und rechts
  for (const side of [-1, 1]) {
    const pauldron = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.38, 0),
      mossShoulderMat
    );
    pauldron.scale.set(1.15, 0.78, 1.05);
    pauldron.position.set(side * 0.68, 2.04, 0);
    pauldron.castShadow = true;
    bodyRoot.add(pauldron);
  }

  // 4. Charaktervoller Riesenkopf mit dichtem Vollbart (auf ~2.45 m Höhe)
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.32, 14, 12), skinMat);
  head.position.set(0, 2.42, 0.04);
  head.castShadow = true;
  bodyRoot.add(head);

  const beard = new THREE.Mesh(new THREE.ConeGeometry(0.31, 0.68, 10), beardMat);
  beard.rotation.x = Math.PI;
  beard.position.set(0, 2.08, 0.18);
  beard.castShadow = true;
  bodyRoot.add(beard);

  const brow = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.09, 0.18), beardMat);
  brow.position.set(0, 2.52, 0.28);
  bodyRoot.add(brow);

  // 5. Kräftige Arme und großer Wehr-Steinhammer / Sperrbalken in der rechten Hand
  const leftArm = new THREE.Mesh(new THREE.CapsuleGeometry(0.16, 0.72, 8, 10), skinMat);
  leftArm.position.set(-0.76, 1.55, 0.08);
  leftArm.rotation.z = 0.16;
  leftArm.castShadow = true;
  bodyRoot.add(leftArm);

  const rightArm = new THREE.Mesh(new THREE.CapsuleGeometry(0.16, 0.72, 8, 10), skinMat);
  rightArm.position.set(0.76, 1.58, 0.18);
  rightArm.rotation.z = -0.14;
  rightArm.rotation.x = -0.25;
  rightArm.castShadow = true;
  bodyRoot.add(rightArm);

  // Mächtiger Wehrstab mit Felskopf
  const staff = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.08, 2.55, 8), woodShaftMat);
  staff.position.set(0.84, 1.28, 0.42);
  staff.castShadow = true;
  bodyRoot.add(staff);

  const hammerHead = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.38, 0.82), stoneHammerMat);
  hammerHead.position.set(0.84, 2.45, 0.42);
  hammerHead.castShadow = true;
  bodyRoot.add(hammerHead);

  // 6. Schwebendes Quellwasser-Kristallsymbol über dem Kopf des Riesen
  const indicatorMat = new THREE.MeshStandardMaterial({
    color: 0x7fd4e6,
    emissive: 0x28788a,
    emissiveIntensity: 0.9,
    roughness: 0.22,
    metalness: 0.4,
  });
  const indicator = new THREE.Mesh(new THREE.OctahedronGeometry(0.2, 0), indicatorMat);
  indicator.position.y = 3.22;
  group.add(indicator);

  const giantLight = new THREE.PointLight(0x7fd4e6, 1.05, 6.0);
  giantLight.position.set(0, 2.85, 0.5);
  group.add(giantLight);

  group.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.userData = { interactableType: 'giant' };
    }
  });

  // Blickt standardmäßig zur Brücke hin (-X / -Z)
  group.rotation.y = -2.1;

  const update = (
    timeSeconds: number,
    playerPos: { x: number; z: number },
    highlighted: boolean
  ) => {
    // Ruhiges, tiefes Atmen des Riesen
    const breath = Math.sin(timeSeconds * 1.6);
    bodyRoot.scale.set(1 + breath * 0.012, 1 + breath * 0.015, 1 + breath * 0.012);

    indicator.position.y = 3.22 + Math.sin(timeSeconds * 2.3) * 0.08;
    indicator.rotation.y = timeSeconds * 1.25;

    const dx = playerPos.x - group.position.x;
    const dz = playerPos.z - group.position.z;
    const dist = Math.hypot(dx, dz);
    if (dist < 10.0 && dist > 0.1) {
      group.rotation.y = Math.atan2(dx, dz);
    }

    const highlightHex = highlighted ? 0x2d2418 : 0x000000;
    tunicMat.emissive.setHex(highlightHex);
    mossShoulderMat.emissive.setHex(highlighted ? 0x1d361e : 0x000000);
    indicatorMat.emissive.setHex(highlighted ? 0x70e5ff : 0x28788a);
  };

  return { group, update };
}
