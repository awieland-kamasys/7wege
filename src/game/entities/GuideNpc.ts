import * as THREE from 'three';

export interface GuideNpcEntity {
  group: THREE.Group;
  update: (timeSeconds: number, playerPos: { x: number; z: number }, highlighted: boolean) => void;
}

/**
 * Erstellt die detailreiche 3D-Figur des Hinweisgebers (Waldhüter Arvid) direkt an der Schutzhütte:
 * - Wohlbeleibte, stattliche Statur mit rundem Bauch und breitem Stand
 * - Wetterfester tannengrüner Lodenmantel mit weitem Saum und braunem Schulterkragen (Pelerine)
 * - Wanderstiefel, Ledergürtel mit Messingschnalle und lederne Kartentasche
 * - Gesicht mit dichtem, schwarzem Vollbart, gütigen Augen und verwittertem Waldhüterhut
 * - Knorriger Eichenwanderstab mit Lederwicklung und filigraner, sanft pendelnder Messinglaterne
 * - Schwebender Hinweis-Kristall über dem Kopf
 */
export function createGuideNpc(): GuideNpcEntity {
  const group = new THREE.Group();
  group.name = 'GuideNpc';

  // --- MATERIALIEN ---
  const lodenMat = new THREE.MeshStandardMaterial({
    color: 0x2d4a32,
    roughness: 0.85,
    flatShading: true,
  });
  const capeMat = new THREE.MeshStandardMaterial({
    color: 0x4a3725,
    roughness: 0.82,
    flatShading: true,
  });
  const leatherMat = new THREE.MeshStandardMaterial({
    color: 0x3d2716,
    roughness: 0.75,
    flatShading: true,
  });
  const skinMat = new THREE.MeshStandardMaterial({
    color: 0xd4b08c,
    roughness: 0.72,
  });
  const beardMat = new THREE.MeshStandardMaterial({
    color: 0x161514, // Tiefes Waldschwarz
    roughness: 0.9,
  });
  const hatMat = new THREE.MeshStandardMaterial({
    color: 0x223826,
    roughness: 0.82,
    flatShading: true,
  });
  const hatBandMat = new THREE.MeshStandardMaterial({
    color: 0x422a18,
    roughness: 0.7,
  });
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x47301c,
    roughness: 0.9,
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xc49a3c,
    metalness: 0.7,
    roughness: 0.32,
  });
  const lanternGlassMat = new THREE.MeshStandardMaterial({
    color: 0xffe285,
    emissive: 0xd69922,
    emissiveIntensity: 0.9,
    roughness: 0.2,
    transparent: true,
    opacity: 0.85,
  });
  const oakDecoMat = new THREE.MeshStandardMaterial({
    color: 0x4d753b,
    roughness: 0.65,
  });
  const indicatorMat = new THREE.MeshStandardMaterial({
    color: 0xe2b86b,
    emissive: 0x8a6820,
    emissiveIntensity: 0.6,
    roughness: 0.25,
    metalness: 0.2,
  });

  // 1. Stiefel & Beine (stämmiger, breiter Stand)
  for (const side of [-1, 1]) {
    const leg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.10, 0.68, 8),
      leatherMat
    );
    leg.position.set(side * 0.19, 0.34, 0);
    leg.castShadow = true;
    group.add(leg);

    const boot = new THREE.Mesh(
      new THREE.BoxGeometry(0.22, 0.2, 0.28),
      leatherMat
    );
    boot.position.set(side * 0.19, 0.1, 0.04);
    boot.castShadow = true;
    group.add(boot);
  }

  // 2. Unterer Mantel & weiter Saum
  const lowerCoat = new THREE.Mesh(
    new THREE.ConeGeometry(0.58, 0.76, 12),
    lodenMat
  );
  lowerCoat.position.y = 0.58;
  lowerCoat.castShadow = true;
  group.add(lowerCoat);

  // 3. Oberkörper & stattlicher, runder Bauch
  const torso = new THREE.Mesh(
    new THREE.CylinderGeometry(0.33, 0.40, 0.52, 10),
    lodenMat
  );
  torso.position.y = 1.0;
  torso.castShadow = true;
  group.add(torso);

  // Gemütliche, wohlbeleibte Bauchwölbung
  const belly = new THREE.Mesh(
    new THREE.SphereGeometry(0.36, 12, 10),
    lodenMat
  );
  belly.position.set(0, 0.94, 0.09);
  belly.scale.set(1.08, 0.92, 1.15);
  belly.castShadow = true;
  group.add(belly);

  // Schulterkragen (Pelerine / Gugel) über kräftige Schultern
  const shoulderCape = new THREE.Mesh(
    new THREE.ConeGeometry(0.48, 0.38, 12),
    capeMat
  );
  shoulderCape.position.y = 1.19;
  shoulderCape.castShadow = true;
  group.add(shoulderCape);

  // Breiter Ledergürtel um den stattlichen Bauch mit Messingschnalle
  const belt = new THREE.Mesh(
    new THREE.CylinderGeometry(0.39, 0.41, 0.1, 12),
    leatherMat
  );
  belt.position.set(0, 0.84, 0.06);
  group.add(belt);

  const buckle = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 0.11, 0.05),
    brassMat
  );
  buckle.position.set(0, 0.84, 0.46);
  group.add(buckle);

  // Lederne Kartentasche / Umhängetasche an der linken Hüfte (auf kräftige Statur abgestimmt)
  const satchelGroup = new THREE.Group();
  satchelGroup.position.set(-0.38, 0.72, 0.08);

  const satchelBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 0.24, 0.24),
    leatherMat
  );
  satchelBody.rotation.z = 0.12;
  satchelBody.castShadow = true;
  satchelGroup.add(satchelBody);

  // Messingschließe an der Tasche
  const satchelClasp = new THREE.Mesh(
    new THREE.BoxGeometry(0.04, 0.05, 0.02),
    brassMat
  );
  satchelClasp.position.set(-0.06, -0.02, 0.125);
  satchelGroup.add(satchelClasp);

  group.add(satchelGroup);

  // Lederner Schulterriemen: verläuft flach am Körper entlang und taucht sauber unter den Schulterkragen
  const strapFront = new THREE.Mesh(
    new THREE.BoxGeometry(0.042, 0.48, 0.02),
    leatherMat
  );
  strapFront.position.set(-0.26, 0.95, 0.24);
  strapFront.rotation.set(-0.32, 0.25, -0.52);
  group.add(strapFront);

  const strapBack = new THREE.Mesh(
    new THREE.BoxGeometry(0.042, 0.46, 0.02),
    leatherMat
  );
  strapBack.position.set(-0.28, 0.95, -0.12);
  strapBack.rotation.set(0.30, -0.22, -0.48);
  group.add(strapBack);

  // 4. Kopf, dichter schwarzer Vollbart & gütige Augen
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), skinMat);
  head.position.set(0, 1.41, 0);
  head.castShadow = true;
  group.add(head);

  // Dichter, fülliger schwarzer Vollbart (Hauptkegel + Kinnfülle + Backenbärte)
  const beardGroup = new THREE.Group();
  beardGroup.position.set(0, 1.3, 0.08);

  const mainBeard = new THREE.Mesh(
    new THREE.ConeGeometry(0.20, 0.35, 10),
    beardMat
  );
  mainBeard.rotation.x = 0.38;
  mainBeard.castShadow = true;
  beardGroup.add(mainBeard);

  const beardPuff = new THREE.Mesh(
    new THREE.SphereGeometry(0.16, 8, 8),
    beardMat
  );
  beardPuff.position.set(0, 0.06, 0.04);
  beardPuff.scale.set(1.2, 0.85, 1.1);
  beardGroup.add(beardPuff);

  for (const side of [-1, 1]) {
    const cheekBeard = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 6, 6),
      beardMat
    );
    cheekBeard.position.set(side * 0.12, 0.08, -0.02);
    cheekBeard.scale.set(0.8, 1.3, 0.9);
    beardGroup.add(cheekBeard);
  }

  group.add(beardGroup);

  // Dichter schwarzer Schnurrbart
  const mustache = new THREE.Mesh(
    new THREE.BoxGeometry(0.24, 0.06, 0.09),
    beardMat
  );
  mustache.position.set(0, 1.38, 0.17);
  group.add(mustache);

  // Augen
  const eyeMat = new THREE.MeshStandardMaterial({
    color: 0x3d6148,
    emissive: 0x142b1b,
    emissiveIntensity: 0.4,
  });
  for (const side of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.024, 8, 8), eyeMat);
    eye.position.set(side * 0.07, 1.44, 0.165);
    group.add(eye);
  }

  // 5. Waldhüterhut mit Krempe & Eichenblatt-Abzeichen
  const hatGroup = new THREE.Group();
  hatGroup.position.set(0, 1.53, -0.02);
  hatGroup.rotation.x = -0.08;

  // Geschwungene Hutkrempe
  const brim = new THREE.Mesh(
    new THREE.CylinderGeometry(0.46, 0.48, 0.045, 14),
    hatMat
  );
  brim.scale.set(1.08, 1.0, 1.18);
  hatGroup.add(brim);

  // Lederband um den Hut
  const hatBand = new THREE.Mesh(
    new THREE.CylinderGeometry(0.26, 0.27, 0.065, 12),
    hatBandMat
  );
  hatBand.position.y = 0.05;
  hatGroup.add(hatBand);

  // Hutkrone
  const crown = new THREE.Mesh(
    new THREE.ConeGeometry(0.26, 0.38, 10),
    hatMat
  );
  crown.position.y = 0.22;
  hatGroup.add(crown);

  // Kleines grünes Eichenlaub-Abzeichen am Hutband
  const oakLeaf = new THREE.Mesh(
    new THREE.BoxGeometry(0.045, 0.13, 0.02),
    oakDecoMat
  );
  oakLeaf.position.set(0.19, 0.1, 0.13);
  oakLeaf.rotation.z = -0.45;
  hatGroup.add(oakLeaf);

  group.add(hatGroup);

  // 6. Arme (angepasst an die breitere Statur)
  // Linker Arm (ruhig am Körper angelegt)
  const leftArm = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.085, 0.38, 6, 8),
    lodenMat
  );
  leftArm.position.set(-0.42, 1.04, 0.02);
  leftArm.rotation.z = 0.22;
  leftArm.castShadow = true;
  group.add(leftArm);

  // Rechter Arm (greift nach außen zum Wanderstab)
  const rightArm = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.085, 0.38, 6, 8),
    lodenMat
  );
  rightArm.position.set(0.40, 1.04, 0.1);
  rightArm.rotation.z = -0.32;
  rightArm.rotation.x = -0.32;
  rightArm.castShadow = true;
  group.add(rightArm);

  // 7. Knorriger Eichenwanderstab mit geschnitztem Knauf
  const staffGroup = new THREE.Group();
  staffGroup.position.set(0.56, 0, 0.22);
  staffGroup.rotation.x = 0.06;

  // Stabkörper
  const staffPole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.032, 0.044, 1.82, 8),
    woodMat
  );
  staffPole.position.y = 0.91;
  staffPole.castShadow = true;
  staffGroup.add(staffPole);

  // Lederwicklung am Griffbereich
  const staffGrip = new THREE.Mesh(
    new THREE.CylinderGeometry(0.042, 0.042, 0.28, 8),
    leatherMat
  );
  staffGrip.position.y = 1.16;
  staffGroup.add(staffGrip);

  // Geschnitzter Eichel-Knauf oben am Stab
  const staffFinial = new THREE.Mesh(
    new THREE.SphereGeometry(0.065, 8, 8),
    brassMat
  );
  staffFinial.position.y = 1.84;
  staffFinial.scale.set(0.9, 1.3, 0.9);
  staffGroup.add(staffFinial);

  // 8. Filigrane Messing-Laterne (hängt an einem Ausleger am Stab)
  const lanternArm = new THREE.Mesh(
    new THREE.BoxGeometry(0.18, 0.025, 0.025),
    brassMat
  );
  lanternArm.position.set(-0.06, 1.72, 0.06);
  lanternArm.rotation.y = 0.35;
  staffGroup.add(lanternArm);

  const lanternHangerGroup = new THREE.Group();
  lanternHangerGroup.position.set(-0.12, 1.7, 0.08);

  // Laternenkette / Öse
  const lanternRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.03, 0.008, 5, 8),
    brassMat
  );
  lanternHangerGroup.add(lanternRing);

  // Laternendach
  const lanternRoof = new THREE.Mesh(
    new THREE.ConeGeometry(0.095, 0.07, 4),
    brassMat
  );
  lanternRoof.position.y = -0.05;
  lanternRoof.rotation.y = Math.PI / 4;
  lanternHangerGroup.add(lanternRoof);

  // Laternenglas (leuchtend)
  const lanternGlass = new THREE.Mesh(
    new THREE.BoxGeometry(0.11, 0.15, 0.11),
    lanternGlassMat
  );
  lanternGlass.position.y = -0.15;
  lanternHangerGroup.add(lanternGlass);

  // Laternenboden
  const lanternBase = new THREE.Mesh(
    new THREE.BoxGeometry(0.12, 0.03, 0.12),
    brassMat
  );
  lanternBase.position.y = -0.23;
  lanternHangerGroup.add(lanternBase);

  // Warmes Licht der Laterne
  const lanternLight = new THREE.PointLight(0xffbe6b, 1.3, 6.0);
  lanternLight.position.y = -0.15;
  lanternHangerGroup.add(lanternLight);

  staffGroup.add(lanternHangerGroup);
  group.add(staffGroup);

  // 9. Schwebender Hinweis-Kristall über Arvids Kopf
  const indicator = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.16, 0),
    indicatorMat
  );
  indicator.position.y = 2.08;
  group.add(indicator);

  // Alle Meshes für Raycasting als 'npc' markieren
  group.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.userData = { interactableType: 'npc' };
    }
  });

  const update = (
    timeSeconds: number,
    playerPos: { x: number; z: number },
    highlighted: boolean
  ) => {
    // Sanftes Schweben und Rotieren des Kristalls
    indicator.position.y = 2.08 + Math.sin(timeSeconds * 2.6) * 0.06;
    indicator.rotation.y = timeSeconds * 1.3;

    // Sanftes Pendeln der Laterne im Wind
    lanternHangerGroup.rotation.z = Math.sin(timeSeconds * 2.2) * 0.08;
    lanternHangerGroup.rotation.x = Math.cos(timeSeconds * 1.8) * 0.06;

    // Zartes Flackern der Kerzenflamme in der Laterne
    const flicker = 0.95 + Math.sin(timeSeconds * 7.5) * 0.12 + Math.cos(timeSeconds * 13.0) * 0.08;
    lanternLight.intensity = 1.3 * flicker;
    lanternGlassMat.emissiveIntensity = 0.9 * flicker;

    // Arvid wendet sich der spielenden Person zu, wenn diese in der Nähe ist
    const dx = playerPos.x - group.position.x;
    const dz = playerPos.z - group.position.z;
    const dist = Math.hypot(dx, dz);
    if (dist < 7.5 && dist > 0.1) {
      const targetAngle = Math.atan2(dx, dz);
      group.rotation.y = targetAngle;
    }

    // Hervorhebung bei Mouseover / Dialogaktivität
    const emissiveHex = highlighted ? 0x243b22 : 0x000000;
    lodenMat.emissive.setHex(emissiveHex);
    hatMat.emissive.setHex(emissiveHex);
    indicatorMat.emissiveIntensity = highlighted ? 1.25 : 0.6;
    const indScale = highlighted ? 1.22 : 1.0;
    indicator.scale.set(indScale, indScale, indScale);
  };

  return { group, update };
}
