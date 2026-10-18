import * as THREE from 'three';

export interface WeirBridgeEntity {
  group: THREE.Group;
  update: (timeSeconds: number) => void;
}

/**
 * Erstellt die 3D-Szenerie auf dem 3. Weg (Quellenweg):
 * - Begehbare Holz- und Steinbrücke entlang der lokalen Z-Achse (Wegverlauf)
 * - Geschlossenes Wehr (Schütz mit Stellrad und Zahnstangen) an der Oberstromseite (-X) der Brücke
 * - Kleiner Stausee (-X) mit Bergquelle und der Ufer-Heimat des Riesen
 * - Bachlauf, der unter der Brücke hindurch (+X) als schmales Rinnsal Richtung dürres Tal fließt
 */
export function createWeirBridgeScene(): WeirBridgeEntity {
  const group = new THREE.Group();
  group.name = 'WeirBridgeScene';

  const stoneMat = new THREE.MeshStandardMaterial({
    color: 0x5c6469,
    roughness: 0.88,
    flatShading: true,
  });
  const darkStoneMat = new THREE.MeshStandardMaterial({
    color: 0x434a4f,
    roughness: 0.92,
    flatShading: true,
  });
  const woodPlankMat = new THREE.MeshStandardMaterial({
    color: 0x6e4e32,
    roughness: 0.85,
  });
  const darkTimberMat = new THREE.MeshStandardMaterial({
    color: 0x4a321e,
    roughness: 0.9,
  });
  const ironMat = new THREE.MeshStandardMaterial({
    color: 0x2f353b,
    roughness: 0.45,
    metalness: 0.75,
  });
  const mossMat = new THREE.MeshStandardMaterial({
    color: 0x38663c,
    roughness: 0.92,
    flatShading: true,
  });

  // ============================================================================
  // 1. DIE BRÜCKE (entlang der lokalen Z-Achse von lz = -3.1 bis +3.1)
  // ============================================================================
  const bridgeGroup = new THREE.Group();

  // Steinerne Brückenwiderlager am Anfang und Ende der Brücke
  for (const lz of [-2.95, 2.95]) {
    const abutment = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.36, 0.75), stoneMat);
    abutment.position.set(0, 0.08, lz);
    abutment.receiveShadow = true;
    abutment.castShadow = true;
    abutment.userData = { interactableType: 'path', pathId: 3 };
    bridgeGroup.add(abutment);
  }

  // Längsträger unter den Brückenbohlen
  for (const lx of [-0.95, 0, 0.95]) {
    const beam = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.18, 6.1), darkTimberMat);
    beam.position.set(lx, 0.04, 0);
    beam.castShadow = true;
    bridgeGroup.add(beam);
  }

  // Querliegende Eichenbohlen als begehbares Brückendeck (16 Bohlen)
  const plankCount = 16;
  for (let i = 0; i < plankCount; i++) {
    const lz = -2.65 + (i / (plankCount - 1)) * 5.3;
    const plank = new THREE.Mesh(new THREE.BoxGeometry(2.36, 0.06, 0.28), woodPlankMat);
    plank.position.set(0, 0.075, lz);
    plank.receiveShadow = true;
    plank.castShadow = true;
    plank.userData = { interactableType: 'path', pathId: 3 };
    bridgeGroup.add(plank);
  }

  // Brückengeländer und Steinpfosten beidseitig (lx = -1.22 und lx = +1.22)
  for (const side of [-1, 1]) {
    const lx = side * 1.22;
    for (const lz of [-2.7, -1.35, 0, 1.35, 2.7]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.95, 0.24), stoneMat);
      post.position.set(lx, 0.48, lz);
      post.castShadow = true;
      post.receiveShadow = true;
      post.userData = { interactableType: 'weir' };
      bridgeGroup.add(post);
    }

    // Oberer und mittlerer Handlauf aus Holz
    const topRail = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.1, 5.5), darkTimberMat);
    topRail.position.set(lx, 0.88, 0);
    topRail.castShadow = true;
    topRail.userData = { interactableType: 'weir' };
    bridgeGroup.add(topRail);

    const midRail = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.08, 5.5), woodPlankMat);
    midRail.position.set(lx, 0.52, 0);
    midRail.castShadow = true;
    midRail.userData = { interactableType: 'weir' };
    bridgeGroup.add(midRail);
  }

  group.add(bridgeGroup);

  // ============================================================================
  // 2. DAS GESCHLOSSENE WEHR (an der Oberstromseite lx = -1.38 der Brücke)
  // ============================================================================
  const weirGroup = new THREE.Group();
  weirGroup.position.set(-1.38, 0, 0);

  // Zwei hohe steinerne Wehrpfeiler mit eisernen Führungsschienen
  for (const lz of [-1.75, 1.75]) {
    const weirTower = new THREE.Mesh(new THREE.BoxGeometry(0.55, 2.35, 0.55), darkStoneMat);
    weirTower.position.set(0, 1.15, lz);
    weirTower.castShadow = true;
    weirTower.receiveShadow = true;
    weirTower.userData = { interactableType: 'weir' };
    weirGroup.add(weirTower);
  }

  // Querbalken (Wehrbrücke oben) mit Hebemechanik
  const weirHeaderBeam = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.28, 4.1), darkTimberMat);
  weirHeaderBeam.position.set(0, 2.25, 0);
  weirHeaderBeam.castShadow = true;
  weirHeaderBeam.userData = { interactableType: 'weir' };
  weirGroup.add(weirHeaderBeam);

  // Die geschlossene Wehrtafel (Schütz aus schweren, eisenbeschlagenen Bohlen), die das Wasser staut
  const closedGate = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.45, 3.1), darkTimberMat);
  closedGate.position.set(0, 0.68, 0);
  closedGate.castShadow = true;
  closedGate.receiveShadow = true;
  closedGate.userData = { interactableType: 'weir' };
  weirGroup.add(closedGate);

  // Eiserne Querbeschläge und Zahnstangen am geschlossenen Schütz
  for (const yPos of [0.35, 0.75, 1.15]) {
    const ironStrap = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.08, 3.12), ironMat);
    ironStrap.position.set(0, yPos, 0);
    ironStrap.userData = { interactableType: 'weir' };
    weirGroup.add(ironStrap);
  }

  for (const lz of [-0.85, 0.85]) {
    const rackRod = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 2.3, 8), ironMat);
    rackRod.position.set(0, 1.45, lz);
    rackRod.userData = { interactableType: 'weir' };
    weirGroup.add(rackRod);
  }

  // Großes eisernes Wehr-Stellrad (Handrad), das der Riese bewacht
  const wheelRim = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.055, 8, 20), ironMat);
  wheelRim.rotation.y = Math.PI / 2;
  wheelRim.position.set(0.22, 1.65, 1.75);
  wheelRim.userData = { interactableType: 'weir' };
  weirGroup.add(wheelRim);

  for (let s = 0; s < 4; s++) {
    const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.82, 6), ironMat);
    spoke.rotation.x = (s * Math.PI) / 4;
    spoke.position.set(0.22, 1.65, 1.75);
    spoke.userData = { interactableType: 'weir' };
    weirGroup.add(spoke);
  }

  group.add(weirGroup);

  // ============================================================================
  // 3. KLEINER STAUSEE MIT BERGQUELLE & HEIMAT DES RIESEN (Oberstrom: lx = -1.5 bis -9.5)
  // ============================================================================
  const reservoirWaterMat = new THREE.MeshStandardMaterial({
    color: 0x1b6e84,
    emissive: 0x0a2e38,
    emissiveIntensity: 0.42,
    roughness: 0.15,
    metalness: 0.25,
    transparent: true,
    opacity: 0.88,
  });

  // Hoch angestauter Wasserspiegel des kleinen Stausees direkt vor dem geschlossenen Wehr (y = 0.42)
  const reservoirWater = new THREE.Mesh(
    new THREE.CylinderGeometry(3.9, 3.7, 0.72, 32),
    reservoirWaterMat
  );
  reservoirWater.scale.set(1.18, 1.0, 0.92);
  reservoirWater.position.set(-5.4, 0.08, 0.0);
  reservoirWater.receiveShadow = true;
  reservoirWater.userData = { interactableType: 'weir' };
  group.add(reservoirWater);

  // Wasseranschluss zwischen Stausee-Becken und dem geschlossenen Wehr an der Brücke
  const weirPoolNeck = new THREE.Mesh(
    new THREE.BoxGeometry(2.1, 0.72, 3.15),
    reservoirWaterMat
  );
  weirPoolNeck.position.set(-2.35, 0.08, 0);
  weirPoolNeck.userData = { interactableType: 'weir' };
  group.add(weirPoolNeck);

  // Sprudelnde Bergquelle an den hinteren Felsen des Stausees (lx = -9.4, lz = -0.4)
  const springRock = new THREE.Mesh(new THREE.DodecahedronGeometry(1.65, 1), stoneMat);
  springRock.scale.set(1.1, 1.35, 1.2);
  springRock.position.set(-9.5, 1.1, -0.4);
  springRock.castShadow = true;
  springRock.receiveShadow = true;
  springRock.userData = { interactableType: 'weir' };
  group.add(springRock);

  const springCascadeMat = new THREE.MeshStandardMaterial({
    color: 0x8ce8ff,
    emissive: 0x26788f,
    emissiveIntensity: 0.65,
    roughness: 0.2,
    transparent: true,
    opacity: 0.85,
  });
  const springWaterfall = new THREE.Mesh(
    new THREE.CylinderGeometry(0.28, 0.55, 1.45, 12),
    springCascadeMat
  );
  springWaterfall.position.set(-8.35, 0.85, -0.35);
  springWaterfall.rotation.z = -0.35;
  group.add(springWaterfall);

  const springRipple = new THREE.Mesh(
    new THREE.RingGeometry(0.55, 0.72, 24),
    new THREE.MeshBasicMaterial({
      color: 0xb5f4ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
    })
  );
  springRipple.rotation.x = -Math.PI / 2;
  springRipple.position.set(-7.9, 0.455, -0.35);
  group.add(springRipple);

  // Uferfelsen rund um den kleinen Stausee
  const reservoirRocks: readonly [number, number, number][] = [
    [-2.8, -2.2, 0.65],
    [-4.2, -3.3, 0.78],
    [-6.1, -3.5, 0.82],
    [-8.0, -2.6, 0.95],
    [-8.4, 2.1, 0.88],
    [-6.6, 3.3, 0.76],
    [-4.5, 3.4, 0.72],
    [-2.6, 2.2, 0.62],
  ];
  for (const [rx, rz, rSize] of reservoirRocks) {
    const rMesh = new THREE.Mesh(new THREE.DodecahedronGeometry(rSize, 0), stoneMat);
    rMesh.scale.set(1.2, 0.72, 1.05);
    rMesh.position.set(rx, 0.35, rz);
    rMesh.castShadow = true;
    rMesh.receiveShadow = true;
    group.add(rMesh);
  }

  // Die Heimat des Riesen direkt am Ufer des Stausees (Wurzel-/Felsunterstand mit Moosdach)
  const giantHomeGroup = new THREE.Group();
  giantHomeGroup.position.set(-5.2, 0.38, 3.1);

  const shelterBackWall = new THREE.Mesh(new THREE.DodecahedronGeometry(1.45, 0), darkStoneMat);
  shelterBackWall.scale.set(1.35, 1.15, 0.85);
  shelterBackWall.position.set(0, 0.95, 0.55);
  shelterBackWall.castShadow = true;
  giantHomeGroup.add(shelterBackWall);

  const shelterMossRoof = new THREE.Mesh(new THREE.ConeGeometry(1.85, 1.1, 7), mossMat);
  shelterMossRoof.position.set(0, 1.85, 0.35);
  shelterMossRoof.castShadow = true;
  giantHomeGroup.add(shelterMossRoof);

  // Große steinerne Sitzbank des Riesen direkt an der Wasserkante
  const giantBench = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.45, 0.7), stoneMat);
  giantBench.position.set(1.35, 0.22, -0.35);
  giantBench.castShadow = true;
  giantHomeGroup.add(giantBench);

  group.add(giantHomeGroup);

  // ============================================================================
  // 4. DER BACH UNTER DER BRÜCKE & UNTERSTROM RICHTUNG DÜRRES TAL (lx = -1.2 bis +8.5)
  // ============================================================================
  const dryBedMat = new THREE.MeshStandardMaterial({
    color: 0x595143,
    roughness: 0.95,
  });
  const trickleWaterMat = new THREE.MeshStandardMaterial({
    color: 0x2b879e,
    emissive: 0x0d3842,
    emissiveIntensity: 0.35,
    roughness: 0.2,
    transparent: true,
    opacity: 0.82,
  });

  // Steiniges Bachbett unter der Brücke hindurch nach Südwesten (+X)
  const streamBed = new THREE.Mesh(new THREE.BoxGeometry(9.8, 0.04, 2.85), dryBedMat);
  streamBed.position.set(3.5, 0.015, 0);
  streamBed.receiveShadow = true;
  group.add(streamBed);

  // Schmales Wasserrinnsal, das unter dem geschlossenen Wehr durchsickert und unter der Brücke fließt
  const streamTrickle = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.05, 0.85), trickleWaterMat);
  streamTrickle.position.set(3.4, 0.03, 0);
  streamTrickle.userData = { interactableType: 'weir' };
  group.add(streamTrickle);

  // Schaum-/Sickerwasserstreifen direkt unten am geschlossenen Wehr unter der Brücke
  const weirFoamMat = new THREE.MeshBasicMaterial({
    color: 0xdff8ff,
    transparent: true,
    opacity: 0.55,
  });
  const weirFoam = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.07, 2.6), weirFoamMat);
  weirFoam.position.set(-1.18, 0.045, 0);
  group.add(weirFoam);

  // Uferkiesel entlang des Bachbetts auf der Talseite (+X)
  for (let i = 0; i < 12; i++) {
    const lx = -0.4 + i * 0.72;
    for (const side of [-1, 1]) {
      const pebble = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.24 + (i % 3) * 0.08, 0),
        i % 2 === 0 ? stoneMat : darkStoneMat
      );
      pebble.scale.set(1.2, 0.55, 1.0);
      pebble.position.set(lx, 0.08, side * (1.15 + (i % 2) * 0.2));
      pebble.castShadow = true;
      group.add(pebble);
    }
  }

  const update = (timeSeconds: number) => {
    // Sanftes Pulsieren der Bergquelle und des Sickerwassers am geschlossenen Wehr
    const wave = 0.5 + 0.5 * Math.sin(timeSeconds * 2.6);
    springRipple.scale.setScalar(0.92 + wave * 0.22);
    weirFoamMat.opacity = 0.4 + wave * 0.25;
  };

  return { group, update };
}
