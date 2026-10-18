import * as THREE from 'three';

export interface WildHunterNpcEntity {
  group: THREE.Group;
  update: (
    elapsedSeconds: number,
    playerPos: { x: number; z: number },
    isHighlighted: boolean
  ) => void;
}

/**
 * Erstellt die 3D-Figur "Der Wilde Jäger" an der Jagdhütte auf Weg 6:
 * Ein stolzer Herr des Waldes im grünen Lodenwams mit Lederstiefeln,
 * Jägerhut mit Feder, Bogen über der Schulter, Pfeilköcher auf dem Rücken
 * und glänzendem Jagdhorn an der Hüfte.
 */
export function createWildHunterNpc(): WildHunterNpcEntity {
  const group = new THREE.Group();
  group.name = 'WildHunterNpc';

  // --- MATERIALIEN ---
  const lodenMat = new THREE.MeshStandardMaterial({
    color: 0x2d4f29,
    roughness: 0.85,
    flatShading: true,
  });
  const leatherMat = new THREE.MeshStandardMaterial({
    color: 0x472f1a,
    roughness: 0.78,
    flatShading: true,
  });
  const skinMat = new THREE.MeshStandardMaterial({
    color: 0xd4b08c,
    roughness: 0.72,
  });
  const beardMat = new THREE.MeshStandardMaterial({
    color: 0x4a331e,
    roughness: 0.9,
  });
  const hatMat = new THREE.MeshStandardMaterial({
    color: 0x233e21,
    roughness: 0.82,
    flatShading: true,
  });
  const featherMat = new THREE.MeshStandardMaterial({
    color: 0xededed,
    roughness: 0.5,
    flatShading: true,
  });
  const bowWoodMat = new THREE.MeshStandardMaterial({
    color: 0x5a381b,
    roughness: 0.7,
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xd6a438,
    metalness: 0.75,
    roughness: 0.28,
  });
  const indicatorMat = new THREE.MeshStandardMaterial({
    color: 0x48b846,
    emissive: 0x1f661e,
    emissiveIntensity: 0.65,
    roughness: 0.2,
    metalness: 0.3,
  });

  // 1. Beine & Lederstiefel
  for (const side of [-1, 1]) {
    const leg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.085, 0.72, 8),
      leatherMat
    );
    leg.position.set(side * 0.16, 0.36, 0);
    leg.castShadow = true;
    group.add(leg);

    const boot = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.22, 0.28),
      leatherMat
    );
    boot.position.set(side * 0.16, 0.11, 0.04);
    boot.castShadow = true;
    group.add(boot);
  }

  // 2. Rumpf & Lodenwams
  const torso = new THREE.Mesh(
    new THREE.BoxGeometry(0.56, 0.65, 0.34),
    lodenMat
  );
  torso.position.y = 0.98;
  torso.castShadow = true;
  group.add(torso);

  // Lederner Schultergurt
  const strap = new THREE.Mesh(
    new THREE.BoxGeometry(0.12, 0.68, 0.36),
    leatherMat
  );
  strap.position.set(0, 0.98, 0);
  strap.rotation.z = 0.38;
  group.add(strap);

  // Jagdgürtel mit Schnalle
  const belt = new THREE.Mesh(
    new THREE.BoxGeometry(0.58, 0.1, 0.36),
    leatherMat
  );
  belt.position.y = 0.72;
  group.add(belt);

  const buckle = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 0.12, 0.04),
    brassMat
  );
  buckle.position.set(0, 0.72, 0.18);
  group.add(buckle);

  // 3. Jagdhorn an der rechten Hüfte
  const hornGroup = new THREE.Group();
  hornGroup.position.set(0.32, 0.74, 0.05);
  hornGroup.rotation.z = -0.45;
  hornGroup.rotation.y = 0.3;

  const hornTube = new THREE.Mesh(
    new THREE.TorusGeometry(0.11, 0.024, 7, 14, Math.PI * 1.4),
    brassMat
  );
  hornGroup.add(hornTube);

  const hornBell = new THREE.Mesh(
    new THREE.ConeGeometry(0.065, 0.12, 8),
    brassMat
  );
  hornBell.position.set(0.1, 0.08, 0);
  hornBell.rotation.z = -1.2;
  hornGroup.add(hornBell);
  group.add(hornGroup);

  // 4. Pfeilköcher & Jagdbogen auf dem Rücken
  const quiver = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.065, 0.62, 8),
    leatherMat
  );
  quiver.position.set(-0.16, 1.12, -0.22);
  quiver.rotation.z = -0.32;
  quiver.castShadow = true;
  group.add(quiver);

  // Pfeilfedern oben im Köcher
  for (let a = 0; a < 3; a++) {
    const fletch = new THREE.Mesh(
      new THREE.ConeGeometry(0.03, 0.16, 5),
      featherMat
    );
    fletch.position.set(-0.19 + a * 0.03, 1.46, -0.22);
    group.add(fletch);
  }

  // Jagdbogen über die linke Schulter
  const bow = new THREE.Mesh(
    new THREE.TorusGeometry(0.38, 0.025, 6, 16, Math.PI * 0.9),
    bowWoodMat
  );
  bow.position.set(-0.24, 1.1, -0.05);
  bow.rotation.y = Math.PI / 2;
  bow.rotation.x = -0.4;
  bow.castShadow = true;
  group.add(bow);

  // 5. Kopf, Bart & Jägerhut mit Feder
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.19, 12, 12), skinMat);
  head.position.set(0, 1.44, 0);
  head.castShadow = true;
  group.add(head);

  // Bart
  const beard = new THREE.Mesh(
    new THREE.ConeGeometry(0.15, 0.24, 8),
    beardMat
  );
  beard.position.set(0, 1.34, 0.12);
  beard.rotation.x = 0.45;
  group.add(beard);

  // Aufmerksame Augen
  const eyeMat = new THREE.MeshStandardMaterial({
    color: 0x3d7052,
    emissive: 0x183822,
    emissiveIntensity: 0.4,
  });
  for (const side of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.024, 8, 8), eyeMat);
    eye.position.set(side * 0.07, 1.46, 0.18);
    group.add(eye);
  }

  // Jägerhut (Krempe + Krone)
  const hatGroup = new THREE.Group();
  hatGroup.position.set(0, 1.54, 0);
  hatGroup.rotation.x = -0.12;

  const brim = new THREE.Mesh(
    new THREE.CylinderGeometry(0.36, 0.38, 0.04, 12),
    hatMat
  );
  brim.scale.set(1.15, 1.0, 1.25);
  hatGroup.add(brim);

  const crown = new THREE.Mesh(
    new THREE.ConeGeometry(0.24, 0.32, 9),
    hatMat
  );
  crown.position.y = 0.16;
  hatGroup.add(crown);

  // Aufgestellte Feder am Hut
  const feather = new THREE.Mesh(
    new THREE.ConeGeometry(0.045, 0.36, 5),
    featherMat
  );
  feather.position.set(0.16, 0.3, -0.06);
  feather.rotation.z = -0.45;
  feather.rotation.x = 0.2;
  hatGroup.add(feather);

  group.add(hatGroup);

  // 6. Arme (Gestikulierend im Streitgespräch)
  const leftArmGroup = new THREE.Group();
  leftArmGroup.position.set(-0.32, 1.18, 0);
  const leftArm = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.075, 0.36, 6, 8),
    lodenMat
  );
  leftArm.position.y = -0.18;
  leftArm.castShadow = true;
  leftArmGroup.add(leftArm);
  group.add(leftArmGroup);

  // Rechter Arm (vorgestreckt in Anklage/Erklärung)
  const rightArmGroup = new THREE.Group();
  rightArmGroup.position.set(0.32, 1.18, 0);
  const rightArm = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.075, 0.36, 6, 8),
    lodenMat
  );
  rightArm.position.set(0, -0.12, 0.12);
  rightArm.rotation.x = -0.65;
  rightArm.castShadow = true;
  rightArmGroup.add(rightArm);
  group.add(rightArmGroup);

  // 7. Schwebender waldgrüner Gesprächs-Kristall über dem Kopf
  const indicator = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.15, 0),
    indicatorMat
  );
  indicator.position.y = 2.08;
  group.add(indicator);

  // Alle Meshes für Raycasting als 'wild_hunter' markieren
  group.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.userData = { interactableType: 'wild_hunter' };
    }
  });

  const update = (
    elapsedSeconds: number,
    playerPos: { x: number; z: number },
    isHighlighted: boolean
  ): void => {
    // Kristall-Animation
    indicator.position.y = 2.08 + Math.sin(elapsedSeconds * 2.6) * 0.06;
    indicator.rotation.y = elapsedSeconds * 1.4;

    indicatorMat.emissiveIntensity = isHighlighted ? 1.25 : 0.65;
    const scale = isHighlighted ? 1.25 : 1.0;
    indicator.scale.set(scale, scale, scale);

    // Gestikulierende Arme während der Diskussion
    rightArmGroup.rotation.x = -0.25 + Math.sin(elapsedSeconds * 2.8) * 0.22;
    leftArmGroup.rotation.z = 0.15 + Math.sin(elapsedSeconds * 2.1) * 0.08;

    // Jäger dreht sich zum Spieler, wenn dieser nahe herantritt,
    // ansonsten blickt er entschlossen zum Holzweibchen (-42.6, 23.2)
    const dxPlayer = playerPos.x - group.position.x;
    const dzPlayer = playerPos.z - group.position.z;
    const distPlayer = Math.hypot(dxPlayer, dzPlayer);

    if (distPlayer < 8.5 && distPlayer > 0.1) {
      group.rotation.y = Math.atan2(dxPlayer, dzPlayer);
    } else {
      // Blickrichtung zum Holzweibchen am Kräutergartenzaun
      const targetAngle = Math.atan2(-42.6 - group.position.x, 23.2 - group.position.z);
      group.rotation.y = targetAngle;
    }
  };

  return { group, update };
}
