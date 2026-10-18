import * as THREE from 'three';

export interface NixieNpcEntity {
  group: THREE.Group;
  update: (timeSeconds: number, playerPos: { x: number; z: number }, highlighted: boolean) => void;
}

/**
 * Erstellt die 3D-Figur der Nixe, die auf dem Stein im Waldteich am Ende des 2. Weges sitzt.
 */
export function createNixieNpc(): NixieNpcEntity {
  const group = new THREE.Group();
  group.name = 'NixieNpc';

  // Unsichtbare Hitbox für zuverlässiges Anklicken (auch vom Ufer aus)
  const hitboxMat = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const hitbox = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.78, 2.0, 12), hitboxMat);
  hitbox.position.y = 1.0;
  hitbox.userData = { interactableType: 'nixie' };
  group.add(hitbox);

  // Materialien der Nixe
  const tailScaleMat = new THREE.MeshStandardMaterial({
    color: 0x24998e,
    emissive: 0x072b28,
    emissiveIntensity: 0.35,
    roughness: 0.25,
    metalness: 0.45,
  });

  const finMat = new THREE.MeshStandardMaterial({
    color: 0x4fd1c5,
    emissive: 0x0e3d38,
    emissiveIntensity: 0.4,
    roughness: 0.3,
    metalness: 0.25,
  });

  const skinMat = new THREE.MeshStandardMaterial({
    color: 0xd9ece8,
    roughness: 0.45,
    emissive: 0x000000,
  });

  const bodiceMat = new THREE.MeshStandardMaterial({
    color: 0x1b6b63,
    roughness: 0.35,
    metalness: 0.3,
    emissive: 0x000000,
  });

  const hairMat = new THREE.MeshStandardMaterial({
    color: 0x174d54,
    roughness: 0.55,
    emissive: 0x000000,
  });

  const goldCurseMat = new THREE.MeshStandardMaterial({
    color: 0xffd15c,
    emissive: 0xb87d14,
    emissiveIntensity: 0.75,
    roughness: 0.2,
    metalness: 0.85,
  });

  // Sitzhöhe auf dem Felsen im Teich (Oberkante des Steins liegt bei y ≈ 0.58)
  const bodyGroup = new THREE.Group();
  bodyGroup.position.y = 0.58;
  group.add(bodyGroup);

  // 1. Sitzende Hüft-/Schwanzbasis auf dem Stein
  const hipBase = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 10), tailScaleMat);
  hipBase.scale.set(1.05, 0.75, 1.15);
  hipBase.position.set(0, 0.08, 0.05);
  hipBase.castShadow = true;
  bodyGroup.add(hipBase);

  // 2. Geschwungener Nixenschwanz, der vorn über den Felsen zum Wasser hinabhängt
  const upperTail = new THREE.Mesh(
    new THREE.CylinderGeometry(0.19, 0.25, 0.52, 12),
    tailScaleMat
  );
  upperTail.position.set(0, -0.02, 0.32);
  upperTail.rotation.x = Math.PI / 2.8;
  upperTail.castShadow = true;
  bodyGroup.add(upperTail);

  const lowerTail = new THREE.Mesh(
    new THREE.CylinderGeometry(0.09, 0.18, 0.48, 12),
    tailScaleMat
  );
  lowerTail.position.set(0, -0.26, 0.56);
  lowerTail.rotation.x = Math.PI / 5.2;
  lowerTail.castShadow = true;
  bodyGroup.add(lowerTail);

  // Bewegliche Schwanzflosse dicht über der Wasseroberfläche
  const tailFinPivot = new THREE.Group();
  tailFinPivot.position.set(0, -0.44, 0.68);

  const leftFluke = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.36, 8), finMat);
  leftFluke.scale.set(1.0, 1.0, 0.28);
  leftFluke.position.set(-0.12, -0.04, 0.12);
  leftFluke.rotation.x = Math.PI / 2.3;
  leftFluke.rotation.z = 0.48;
  tailFinPivot.add(leftFluke);

  const rightFluke = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.36, 8), finMat);
  rightFluke.scale.set(1.0, 1.0, 0.28);
  rightFluke.position.set(0.12, -0.04, 0.12);
  rightFluke.rotation.x = Math.PI / 2.3;
  rightFluke.rotation.z = -0.48;
  tailFinPivot.add(rightFluke);

  bodyGroup.add(tailFinPivot);

  // 3. Schlanker Oberkörper (leicht aufrecht sitzend)
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.21, 0.52, 12), bodiceMat);
  torso.position.set(0, 0.38, -0.02);
  torso.castShadow = true;
  bodyGroup.add(torso);

  const shoulders = new THREE.Mesh(new THREE.CapsuleGeometry(0.16, 0.18, 8, 10), skinMat);
  shoulders.rotation.z = Math.PI / 2;
  shoulders.position.set(0, 0.58, -0.02);
  shoulders.castShadow = true;
  bodyGroup.add(shoulders);

  // 4. Kopf & langes, fließendes Nixenhaar
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.17, 14, 12), skinMat);
  head.position.set(0, 0.82, 0.0);
  head.castShadow = true;
  bodyGroup.add(head);

  const hairCrown = new THREE.Mesh(new THREE.SphereGeometry(0.182, 14, 12), hairMat);
  hairCrown.position.set(0, 0.85, -0.03);
  bodyGroup.add(hairCrown);

  const hairBack = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.68, 10), hairMat);
  hairBack.position.set(0, 0.56, -0.14);
  hairBack.rotation.x = 0.18;
  hairBack.castShadow = true;
  bodyGroup.add(hairBack);

  // 5. Schimmernder Perlen- & Wasserlilien-Reif auf dem Kopf
  const diadem = new THREE.Mesh(new THREE.TorusGeometry(0.165, 0.022, 8, 18), goldCurseMat);
  diadem.rotation.x = Math.PI / 2 - 0.15;
  diadem.position.set(0, 0.94, 0.01);
  bodyGroup.add(diadem);

  // 6. Arme & eine verlockend glitzernde goldene Perlenkugel in der ausgestreckten Hand
  const leftArm = new THREE.Mesh(new THREE.CapsuleGeometry(0.055, 0.34, 6, 8), skinMat);
  leftArm.position.set(-0.24, 0.42, 0.08);
  leftArm.rotation.z = 0.28;
  leftArm.rotation.x = -0.35;
  bodyGroup.add(leftArm);

  const rightArm = new THREE.Mesh(new THREE.CapsuleGeometry(0.055, 0.34, 6, 8), skinMat);
  rightArm.position.set(0.23, 0.46, 0.16);
  rightArm.rotation.z = -0.25;
  rightArm.rotation.x = -0.75;
  bodyGroup.add(rightArm);

  const luredOrb = new THREE.Mesh(new THREE.OctahedronGeometry(0.09, 1), goldCurseMat);
  luredOrb.position.set(0.26, 0.56, 0.36);
  bodyGroup.add(luredOrb);

  // 7. Schwebendes Nixen-Kristallsymbol über ihrem Kopf
  const indicatorMat = new THREE.MeshStandardMaterial({
    color: 0x6ef2e6,
    emissive: 0x1ca89c,
    emissiveIntensity: 0.9,
    roughness: 0.2,
    metalness: 0.4,
  });
  const indicator = new THREE.Mesh(new THREE.OctahedronGeometry(0.16, 0), indicatorMat);
  indicator.position.y = 1.92;
  group.add(indicator);

  const nixieLight = new THREE.PointLight(0x5ce6d8, 1.0, 5.2);
  nixieLight.position.set(0, 1.65, 0.4);
  group.add(nixieLight);

  // Alle Meshes für Raycasting als 'nixie' markieren
  group.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.userData = { interactableType: 'nixie' };
    }
  });

  // Standardmäßig blickt die Nixe nach Westen (-X) zum Ufer-Vorplatz von Weg 2
  group.rotation.y = -Math.PI / 2;

  const update = (
    timeSeconds: number,
    playerPos: { x: number; z: number },
    highlighted: boolean
  ) => {
    // Sanftes Wiegen des Oberkörpers und Wippen der Schwanzflosse im Wasser
    bodyGroup.position.y = 0.58 + Math.sin(timeSeconds * 2.1) * 0.025;
    tailFinPivot.rotation.x = Math.sin(timeSeconds * 3.2) * 0.18;
    luredOrb.rotation.y = timeSeconds * 1.8;

    indicator.position.y = 1.92 + Math.sin(timeSeconds * 2.6 + 0.5) * 0.07;
    indicator.rotation.y = timeSeconds * 1.35;

    // Wenn die Spielfigur am Ufer steht, wendet sich die Nixe ihr zu
    const dx = playerPos.x - group.position.x;
    const dz = playerPos.z - group.position.z;
    const dist = Math.hypot(dx, dz);
    if (dist < 9.0 && dist > 0.1) {
      group.rotation.y = Math.atan2(dx, dz);
    }

    const highlightHex = highlighted ? 0x1a4a46 : 0x000000;
    bodiceMat.emissive.setHex(highlightHex);
    hairMat.emissive.setHex(highlightHex);
    tailScaleMat.emissive.setHex(highlighted ? 0x1f6e66 : 0x072b28);
    indicatorMat.emissive.setHex(highlighted ? 0x80fff4 : 0x1ca89c);
  };

  return { group, update };
}
