import * as THREE from 'three';

export interface NixiePondEntity {
  group: THREE.Group;
  update: (timeSeconds: number) => void;
}

/**
 * Erstellt den Waldteich am Ende des 2. Weges (Nixenteich-Pfad):
 * - Schimmernde Wasseroberfläche mit sanften Wellenringen
 * - Uferkranz aus Felsen, Moospolstern, Schilfhalmen und Seerosen
 * - Markanter Felsblock im vorderen Teichbereich (bei x = -1.8 relativ zum Teichzentrum), auf dem die Nixe sitzt
 * - Unter der Wasseroberfläche funkelnder, verlockender Goldschatz mit unheimlichem Fluch-Schimmern
 */
export function createNixiePond(): NixiePondEntity {
  const group = new THREE.Group();
  group.name = 'NixiePond';

  // 1. Dunkler Teichgrund (damit das Wasser Tiefe erhält)
  const bedMat = new THREE.MeshStandardMaterial({
    color: 0x0f262a,
    roughness: 0.95,
  });
  const pondBed = new THREE.Mesh(new THREE.CylinderGeometry(4.65, 4.3, 0.06, 36), bedMat);
  pondBed.position.y = 0.01;
  pondBed.receiveShadow = true;
  pondBed.userData = { interactableType: 'pond' };
  group.add(pondBed);

  // 2. Schimmernde, leicht transparente Wasseroberfläche
  const waterMat = new THREE.MeshStandardMaterial({
    color: 0x1e6f78,
    emissive: 0x0b3138,
    emissiveIntensity: 0.45,
    roughness: 0.14,
    metalness: 0.28,
    transparent: true,
    opacity: 0.84,
  });
  const waterSurface = new THREE.Mesh(
    new THREE.CylinderGeometry(4.55, 4.5, 0.05, 40),
    waterMat
  );
  waterSurface.position.y = 0.07;
  waterSurface.receiveShadow = true;
  waterSurface.userData = { interactableType: 'pond' };
  group.add(waterSurface);

  // 3. Sanfte konzentrische Wasserwellen-Ringe um den Nixenstein und den versunkenen Schatz
  const rippleMat1 = new THREE.MeshBasicMaterial({
    color: 0x8be8e0,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.32,
  });
  const rippleRing1 = new THREE.Mesh(new THREE.RingGeometry(1.15, 1.23, 32), rippleMat1);
  rippleRing1.rotation.x = -Math.PI / 2;
  rippleRing1.position.set(-1.8, 0.098, 0);
  group.add(rippleRing1);

  const rippleMat2 = new THREE.MeshBasicMaterial({
    color: 0xffd97d,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.28,
  });
  const rippleRing2 = new THREE.Mesh(new THREE.RingGeometry(0.65, 0.73, 28), rippleMat2);
  rippleRing2.rotation.x = -Math.PI / 2;
  rippleRing2.position.set(-2.65, 0.099, 0.85);
  group.add(rippleRing2);

  // 4. Der große Stein im Teich (bei lx = -1.8, lz = 0), auf dem die Nixe sitzt
  const rockDarkMat = new THREE.MeshStandardMaterial({
    color: 0x4b565c,
    roughness: 0.86,
    flatShading: true,
  });
  const rockLightMat = new THREE.MeshStandardMaterial({
    color: 0x626f75,
    roughness: 0.82,
    flatShading: true,
  });
  const mossMat = new THREE.MeshStandardMaterial({
    color: 0x35613b,
    roughness: 0.92,
    flatShading: true,
  });

  const nixieRockGroup = new THREE.Group();
  nixieRockGroup.position.set(-1.8, 0, 0);

  // Hauptsockel des Nixensteins im Wasser (Oberkante bei ca. y = 0.56)
  const mainSeatRock = new THREE.Mesh(
    new THREE.CylinderGeometry(0.78, 1.05, 0.62, 9),
    rockDarkMat
  );
  mainSeatRock.position.set(0, 0.28, 0);
  mainSeatRock.castShadow = true;
  mainSeatRock.receiveShadow = true;
  mainSeatRock.userData = { interactableType: 'nixie' };
  nixieRockGroup.add(mainSeatRock);

  // Abgeflachte Sitzplatte oben auf dem Stein
  const topSeatSlab = new THREE.Mesh(
    new THREE.CylinderGeometry(0.68, 0.78, 0.14, 8),
    rockLightMat
  );
  topSeatSlab.position.set(0.04, 0.54, -0.03);
  topSeatSlab.castShadow = true;
  topSeatSlab.receiveShadow = true;
  topSeatSlab.userData = { interactableType: 'nixie' };
  nixieRockGroup.add(topSeatSlab);

  // Seitlicher Stufenstein und Moospolster am Nixenstein
  const sideRock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.46, 0), rockLightMat);
  sideRock.scale.set(1.15, 0.65, 0.95);
  sideRock.position.set(0.55, 0.22, 0.38);
  sideRock.castShadow = true;
  sideRock.receiveShadow = true;
  sideRock.userData = { interactableType: 'nixie' };
  nixieRockGroup.add(sideRock);

  const rockMoss = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), mossMat);
  rockMoss.scale.set(1.3, 0.35, 1.1);
  rockMoss.position.set(-0.32, 0.56, -0.28);
  nixieRockGroup.add(rockMoss);

  group.add(nixieRockGroup);

  // 5. Der verlockende, verfluchte Schatz dicht unter der Wasseroberfläche (vorn zwischen Ufer und Nixenstein)
  const treasureGroup = new THREE.Group();
  treasureGroup.position.set(-2.65, 0.03, 0.85);

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xffd452,
    emissive: 0xc98a12,
    emissiveIntensity: 0.95,
    roughness: 0.18,
    metalness: 0.85,
  });
  const curseGemMat = new THREE.MeshStandardMaterial({
    color: 0xb95cff,
    emissive: 0x7b1fa2,
    emissiveIntensity: 1.25,
    roughness: 0.15,
    metalness: 0.5,
  });

  // Goldene Schatzschale / Hort im flachen Wasser
  const goldHoard = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.52, 0.08, 12), goldMat);
  goldHoard.position.y = 0.02;
  goldHoard.userData = { interactableType: 'pond' };
  treasureGroup.add(goldHoard);

  // Funkelnde Goldkrone, die knapp bis an den Wasserspiegel ragt
  const crownRing = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.045, 8, 16), goldMat);
  crownRing.rotation.x = Math.PI / 2 - 0.18;
  crownRing.position.set(0, 0.08, 0);
  crownRing.userData = { interactableType: 'pond' };
  treasureGroup.add(crownRing);

  // Verfluchtes Juwel in der Mitte der Krone (violett-goldenes Glimmen aus der Tiefe)
  const curseJewel = new THREE.Mesh(new THREE.OctahedronGeometry(0.13, 0), curseGemMat);
  curseJewel.position.set(0, 0.11, 0);
  curseJewel.userData = { interactableType: 'pond' };
  treasureGroup.add(curseJewel);

  const treasureLight = new THREE.PointLight(0xffca4b, 1.2, 4.2);
  treasureLight.position.set(0, 0.35, 0);
  treasureGroup.add(treasureLight);

  group.add(treasureGroup);

  // 6. Ufersteine rund um den Teich (mit flachen Trittsteinen am Westufer zum Weg 2 hin)
  const shoreRockCount = 26;
  for (let i = 0; i < shoreRockCount; i++) {
    const angle = (i / shoreRockCount) * Math.PI * 2;
    // Westufer (angle ~ PI) flacher halten, damit der Blick vom Vorplatz auf Teich & Nixe frei bleibt
    const isWestShore = Math.cos(angle) < -0.65;
    const radius = 4.48 + (i % 3) * 0.16;
    const rx = Math.cos(angle) * radius;
    const rz = Math.sin(angle) * radius;

    const rockSize = isWestShore ? 0.34 : 0.45 + (i % 4) * 0.14;
    const rock = new THREE.Mesh(
      new THREE.DodecahedronGeometry(rockSize, 0),
      i % 2 === 0 ? rockDarkMat : rockLightMat
    );
    rock.scale.set(1.25, isWestShore ? 0.32 : 0.65 + (i % 3) * 0.18, 1.05);
    rock.position.set(rx, isWestShore ? 0.06 : 0.18, rz);
    rock.rotation.y = angle + i * 0.5;
    rock.castShadow = true;
    rock.receiveShadow = true;
    rock.userData = { interactableType: 'pond' };
    group.add(rock);

    if (i % 3 === 0 && !isWestShore) {
      const moss = new THREE.Mesh(new THREE.DodecahedronGeometry(rockSize * 0.72, 0), mossMat);
      moss.scale.set(1.2, 0.35, 1.0);
      moss.position.set(rx * 0.97, 0.32, rz * 0.97);
      group.add(moss);
    }
  }

  // 7. Seerosenblätter und Blüten auf der Wasseroberfläche
  const padMat = new THREE.MeshStandardMaterial({
    color: 0x2d6e3e,
    roughness: 0.75,
  });
  const flowerMat = new THREE.MeshStandardMaterial({
    color: 0xf7d6e6,
    emissive: 0x4a2036,
    emissiveIntensity: 0.3,
    roughness: 0.4,
  });

  const lilyCoords: readonly [number, number, number, boolean][] = [
    [-0.6, -1.9, 0.36, true],
    [-0.2, -2.4, 0.28, false],
    [1.4, -1.5, 0.38, true],
    [1.8, 1.2, 0.34, false],
    [1.2, 1.7, 0.32, true],
    [-0.8, 2.2, 0.35, true],
    [-1.4, 2.5, 0.27, false],
    [-3.1, -1.3, 0.3, true],
  ];

  for (const [lx, lz, radius, hasFlower] of lilyCoords) {
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, 0.015, 14), padMat);
    pad.position.set(lx, 0.1, lz);
    group.add(pad);

    if (hasFlower) {
      const blossom = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.12, 7), flowerMat);
      blossom.position.set(lx, 0.15, lz);
      group.add(blossom);
    }
  }

  // 8. Schilfhalme mit Rohrkolben am Nord-, Ost- und Südufer
  const reedStemMat = new THREE.MeshStandardMaterial({ color: 0x466b35, roughness: 0.85 });
  const cattailMat = new THREE.MeshStandardMaterial({ color: 0x4a2c18, roughness: 0.9 });
  const reedClusterAngles = [-1.2, -0.6, 0.1, 0.8, 1.45, 2.15, -2.1];

  for (const baseAngle of reedClusterAngles) {
    for (let j = 0; j < 5; j++) {
      const a = baseAngle + (j - 2) * 0.045;
      const r = 4.15 + (j % 2) * 0.22;
      const sx = Math.cos(a) * r;
      const sz = Math.sin(a) * r;
      const h = 1.15 + (j % 3) * 0.24;

      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.026, h, 6), reedStemMat);
      stem.position.set(sx, h / 2, sz);
      stem.rotation.z = (j - 2) * 0.05;
      stem.castShadow = true;
      group.add(stem);

      if (j % 2 === 0) {
        const head = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.22, 7), cattailMat);
        head.position.set(sx, h - 0.16, sz);
        group.add(head);
      }
    }
  }

  const update = (timeSeconds: number) => {
    const wave1 = 0.5 + 0.5 * Math.sin(timeSeconds * 1.8);
    const wave2 = 0.5 + 0.5 * Math.sin(timeSeconds * 2.3 + 1.4);

    rippleRing1.scale.setScalar(0.95 + wave1 * 0.16);
    rippleMat1.opacity = 0.18 + (1 - wave1) * 0.22;

    rippleRing2.scale.setScalar(0.9 + wave2 * 0.22);
    rippleMat2.opacity = 0.16 + (1 - wave2) * 0.24;

    // Verlockendes und zugleich unheimliches Pulsieren des Schatzes unter Wasser
    curseJewel.rotation.y = timeSeconds * 1.5;
    treasureLight.intensity = 1.05 + Math.sin(timeSeconds * 3.1) * 0.35;
  };

  return { group, update };
}
