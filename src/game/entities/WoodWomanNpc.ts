import * as THREE from 'three';

export interface WoodWomanNpcEntity {
  group: THREE.Group;
  update: (
    elapsedSeconds: number,
    playerPos: { x: number; z: number },
    isHighlighted: boolean
  ) => void;
}

/**
 * Erstellt die 3D-Figur "Das Holzweibchen" im Holzfällerlager auf der Waldlichtung am Ende des 4. Weges:
 * Ein altes, naturverbundenes Waldwesen mit Rindenrock, Moos-Schultertuch, Kopftuch,
 * Reisigbündel und knorrigem Wurzelstab mit knospenden Blättchen.
 */
export function createWoodWomanNpc(): WoodWomanNpcEntity {
  const group = new THREE.Group();
  group.name = 'WoodWomanNpc';

  const barkDressMat = new THREE.MeshStandardMaterial({
    color: 0x593d25,
    roughness: 0.9,
    flatShading: true,
  });
  const mossCloakMat = new THREE.MeshStandardMaterial({
    color: 0x3f6b38,
    roughness: 0.85,
    flatShading: true,
  });
  const autumnLeafMat = new THREE.MeshStandardMaterial({
    color: 0xb8732a,
    roughness: 0.78,
    flatShading: true,
  });
  const skinMat = new THREE.MeshStandardMaterial({
    color: 0xc9a882,
    roughness: 0.75,
  });
  const hairMat = new THREE.MeshStandardMaterial({
    color: 0xd4cfc4,
    roughness: 0.85,
  });
  const woodStaffMat = new THREE.MeshStandardMaterial({
    color: 0x47301c,
    roughness: 0.9,
  });
  const sproutLeafMat = new THREE.MeshStandardMaterial({
    color: 0x62a844,
    emissive: 0x1d4012,
    emissiveIntensity: 0.35,
    roughness: 0.5,
  });
  const indicatorMat = new THREE.MeshStandardMaterial({
    color: 0xd99b4e,
    emissive: 0x8f5b1d,
    emissiveIntensity: 0.55,
    roughness: 0.25,
    metalness: 0.2,
  });

  // 1. Geschichteter Rindenrock
  const skirtLower = new THREE.Mesh(
    new THREE.ConeGeometry(0.42, 0.72, 9),
    barkDressMat
  );
  skirtLower.position.y = 0.36;
  skirtLower.castShadow = true;
  skirtLower.receiveShadow = true;
  group.add(skirtLower);

  const apron = new THREE.Mesh(
    new THREE.BoxGeometry(0.36, 0.52, 0.14),
    autumnLeafMat
  );
  apron.position.set(0, 0.38, 0.24);
  apron.rotation.x = -0.14;
  apron.castShadow = true;
  group.add(apron);

  // 2. Oberkörper & Moos-Schultertuch
  const torso = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.3, 0.46, 9),
    barkDressMat
  );
  torso.position.y = 0.84;
  torso.castShadow = true;
  group.add(torso);

  const shawl = new THREE.Mesh(
    new THREE.ConeGeometry(0.36, 0.42, 9),
    mossCloakMat
  );
  shawl.position.y = 0.96;
  shawl.castShadow = true;
  group.add(shawl);

  // Kleines Reisigbündel auf dem Rücken des Holzweibchens
  const bundleGroup = new THREE.Group();
  bundleGroup.position.set(0, 0.92, -0.24);
  bundleGroup.rotation.z = 0.22;
  for (let i = -2; i <= 2; i++) {
    const twig = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.03, 0.58, 6),
      woodStaffMat
    );
    twig.position.set(i * 0.04, 0, (Math.abs(i) % 2) * 0.03);
    twig.castShadow = true;
    bundleGroup.add(twig);
  }
  group.add(bundleGroup);

  // 3. Kopf mit Moos-Kopftuch und freundlichem, altem Gesicht
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), skinMat);
  head.position.set(0, 1.22, 0.03);
  head.castShadow = true;
  group.add(head);

  // Moos-Kopftuch (Haube)
  const headscarf = new THREE.Mesh(
    new THREE.SphereGeometry(0.195, 10, 10, 0, Math.PI * 2, 0, Math.PI * 0.68),
    mossCloakMat
  );
  headscarf.position.set(0, 1.24, 0.01);
  headscarf.rotation.x = -0.25;
  headscarf.castShadow = true;
  group.add(headscarf);

  // Zwei silbergraue Haarsträhnen unter dem Kopftuch
  for (const side of [-1, 1]) {
    const hairStrand = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.03, 0.16, 4, 6),
      hairMat
    );
    hairStrand.position.set(side * 0.14, 1.14, 0.08);
    group.add(hairStrand);
  }

  // Warme bernsteinfarbene Augen
  const eyeMat = new THREE.MeshStandardMaterial({
    color: 0xffd27d,
    emissive: 0xa66814,
    emissiveIntensity: 0.45,
  });
  for (const side of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.022, 8, 8), eyeMat);
    eye.position.set(side * 0.06, 1.23, 0.19);
    group.add(eye);
  }

  // 4. Arme und knorriger Wurzelstab mit jungen grünen Trieben
  const leftArm = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.055, 0.28, 6, 8),
    mossCloakMat
  );
  leftArm.position.set(-0.26, 0.86, 0.08);
  leftArm.rotation.z = 0.28;
  leftArm.rotation.x = -0.35;
  leftArm.castShadow = true;
  group.add(leftArm);

  const rightArm = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.055, 0.28, 6, 8),
    mossCloakMat
  );
  rightArm.position.set(0.26, 0.86, 0.12);
  rightArm.rotation.z = -0.25;
  rightArm.rotation.x = -0.55;
  rightArm.castShadow = true;
  group.add(rightArm);

  // Wurzelstab in der rechten Hand
  const staffGroup = new THREE.Group();
  staffGroup.position.set(0.32, 0, 0.24);

  const staffPole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.032, 0.042, 1.38, 8),
    woodStaffMat
  );
  staffPole.position.y = 0.69;
  staffPole.castShadow = true;
  staffGroup.add(staffPole);

  // Zwei junge grüne Blättchen oben am Wurzelstab (Hoffnung des Waldes)
  for (const side of [-1, 1]) {
    const leaf = new THREE.Mesh(
      new THREE.ConeGeometry(0.055, 0.16, 5),
      sproutLeafMat
    );
    leaf.position.set(side * 0.05, 1.4, 0);
    leaf.rotation.z = -side * 0.65;
    staffGroup.add(leaf);
  }
  group.add(staffGroup);

  // 5. Schwebender bernsteinfarbener Gesprächs-Kristall über dem Holzweibchen
  const indicator = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.14, 0),
    indicatorMat
  );
  indicator.position.y = 1.72;
  group.add(indicator);

  // Alle Meshes für Raycasting als 'wood_woman' markieren
  group.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.userData = { interactableType: 'wood_woman' };
    }
  });

  const update = (
    elapsedSeconds: number,
    playerPos: { x: number; z: number },
    isHighlighted: boolean
  ): void => {
    // Sanftes Wiegen des Wurzelstabs und Rotieren des Indikator-Kristalls
    indicator.position.y = 1.72 + Math.sin(elapsedSeconds * 2.5) * 0.05;
    indicator.rotation.y = elapsedSeconds * 1.3;
    staffGroup.rotation.z = Math.sin(elapsedSeconds * 1.8) * 0.035;

    indicatorMat.emissiveIntensity = isHighlighted ? 1.15 : 0.55;
    const scale = isHighlighted ? 1.22 : 1.0;
    indicator.scale.set(scale, scale, scale);

    // Holzweibchen dreht sich der spielenden Person zu, sobald diese auf die Lichtung tritt
    const dx = playerPos.x - group.position.x;
    const dz = playerPos.z - group.position.z;
    const dist = Math.hypot(dx, dz);
    if (dist < 13 && dist > 0.1) {
      const targetAngle = Math.atan2(dx, dz);
      group.rotation.y = targetAngle;
    }
  };

  return { group, update };
}
