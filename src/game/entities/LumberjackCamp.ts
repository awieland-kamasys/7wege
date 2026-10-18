import * as THREE from 'three';

export interface LumberjackCampEntity {
  group: THREE.Group;
  update: (elapsedSeconds: number) => void;
}

/**
 * Erstellt das 3D-Holzfällerlager auf der gerodeten Waldlichtung am Ende des 4. Weges:
 * - Brennholz-Unterstand mit hoch aufgeschichteten Scheiten gegen die Kälte im Dorf
 * - Polter aus gefällten Baumstämmen und Sägebock mit Schrotsäge
 * - Hackklotz mit eingeschlagener Holzfälleraxt und gespaltenen Scheiten
 * - Kleine wärmende Glut-Feuerstelle im Steinkreis
 * - Zahlreiche Baumstümpfe rings um die Lichtung als sichtbares Zeichen der starken Fällungen
 */
export function createLumberjackCamp(): LumberjackCampEntity {
  const group = new THREE.Group();
  group.name = 'LumberjackCamp';

  const barkMat = new THREE.MeshStandardMaterial({
    color: 0x4d3420,
    roughness: 0.92,
    flatShading: true,
  });
  const cutWoodMat = new THREE.MeshStandardMaterial({
    color: 0xd9b37c,
    roughness: 0.78,
  });
  const splitWoodMat = new THREE.MeshStandardMaterial({
    color: 0xc89d62,
    roughness: 0.82,
    flatShading: true,
  });
  const roofWoodMat = new THREE.MeshStandardMaterial({
    color: 0x5c3e26,
    roughness: 0.9,
  });
  const sawdustMat = new THREE.MeshStandardMaterial({
    color: 0xb8935a,
    roughness: 0.96,
  });
  const ironMat = new THREE.MeshStandardMaterial({
    color: 0x454c54,
    roughness: 0.42,
    metalness: 0.75,
    flatShading: true,
  });
  const stoneMat = new THREE.MeshStandardMaterial({
    color: 0x62676b,
    roughness: 0.92,
    flatShading: true,
  });
  const mossMat = new THREE.MeshStandardMaterial({
    color: 0x3b6336,
    roughness: 0.88,
    flatShading: true,
  });

  // 1. Sägemehl- und Holzspäne-Flächen auf der Lichtung
  const sawdustPatches: readonly [number, number, number][] = [
    [-3.4, 0.2, 2.1],
    [3.5, -0.2, 2.2],
    [-1.6, 1.6, 1.35],
    [0.3, 1.1, 1.5],
  ];
  for (const [px, pz, radius] of sawdustPatches) {
    const patch = new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius + 0.2, 0.03, 18),
      sawdustMat
    );
    patch.position.set(px, 0.036, pz);
    patch.receiveShadow = true;
    patch.userData = { interactableType: 'lumber_camp' };
    group.add(patch);
  }

  // 2. Brennholz-Unterstand (Westseite der Lichtung) voll gestapelter Winterscheite
  const shedGroup = new THREE.Group();
  shedGroup.position.set(-3.7, 0, 0.2);
  shedGroup.rotation.y = 0.35;

  // Vier Eckpfosten des Unterstands
  for (const [sx, sz, h] of [
    [-1.25, -0.55, 1.75],
    [1.25, -0.55, 1.75],
    [-1.25, 0.55, 2.05],
    [1.25, 0.55, 2.05],
  ]) {
    const post = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.09, h, 8),
      barkMat
    );
    post.position.set(sx, h / 2, sz);
    post.castShadow = true;
    post.userData = { interactableType: 'lumber_camp' };
    shedGroup.add(post);
  }

  // Schräges Bretterdach des Brennholz-Unterstands
  const shedRoof = new THREE.Mesh(
    new THREE.BoxGeometry(2.85, 0.1, 1.45),
    roofWoodMat
  );
  shedRoof.position.set(0, 1.95, 0);
  shedRoof.rotation.x = -0.24;
  shedRoof.castShadow = true;
  shedRoof.receiveShadow = true;
  shedRoof.userData = { interactableType: 'lumber_camp' };
  shedGroup.add(shedRoof);

  // Dicht aufgeschichtete Brennholzscheite im Unterstand
  for (let row = 0; row < 6; row++) {
    const count = 9;
    for (let col = 0; col < count; col++) {
      const lx = -1.04 + col * 0.26 + (row % 2) * 0.06;
      const ly = 0.14 + row * 0.22;
      const billet = new THREE.Mesh(
        new THREE.CylinderGeometry(0.11, 0.12, 0.92, 7),
        (row + col) % 2 === 0 ? splitWoodMat : barkMat
      );
      billet.rotation.x = Math.PI / 2;
      billet.rotation.z = ((row * 3 + col) % 5) * 0.03;
      billet.position.set(lx, ly, 0);
      billet.castShadow = true;
      billet.userData = { interactableType: 'lumber_camp' };
      shedGroup.add(billet);

      // Helle Stirnholzfläche vorn
      const frontCap = new THREE.Mesh(
        new THREE.CircleGeometry(0.095, 7),
        cutWoodMat
      );
      frontCap.position.set(lx, ly, 0.465);
      frontCap.userData = { interactableType: 'lumber_camp' };
      shedGroup.add(frontCap);
    }
  }
  group.add(shedGroup);

  // 3. Großer Stamm-Polter & Sägebock mit Schrotsäge (Ostseite der Lichtung)
  const logPileGroup = new THREE.Group();
  logPileGroup.position.set(3.75, 0, -0.3);
  logPileGroup.rotation.y = -0.32;

  const logCoords: readonly [number, number, number][] = [
    [-0.55, 0.24, 3.2],
    [0, 0.25, 3.3],
    [0.55, 0.24, 3.1],
    [-0.28, 0.66, 3.0],
    [0.28, 0.66, 3.05],
    [0, 1.06, 2.85],
  ];
  for (const [lx, ly, len] of logCoords) {
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.26, len, 10),
      barkMat
    );
    trunk.rotation.x = Math.PI / 2;
    trunk.position.set(lx, ly, 0);
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    trunk.userData = { interactableType: 'lumber_camp' };
    logPileGroup.add(trunk);

    for (const dir of [-1, 1]) {
      const cap = new THREE.Mesh(new THREE.CircleGeometry(0.22, 10), cutWoodMat);
      cap.position.set(lx, ly, dir * (len / 2 + 0.005));
      if (dir === -1) {
        cap.rotation.y = Math.PI;
      }
      cap.userData = { interactableType: 'lumber_camp' };
      logPileGroup.add(cap);
    }
  }

  // Sägebock neben dem Stammpolter
  const sawhorse = new THREE.Group();
  sawhorse.position.set(-1.35, 0, 0.4);
  for (const zOff of [-0.55, 0.55]) {
    for (const tilt of [-0.38, 0.38]) {
      const leg = new THREE.Mesh(
        new THREE.BoxGeometry(0.09, 1.05, 0.09),
        roofWoodMat
      );
      leg.position.set(0, 0.48, zOff);
      leg.rotation.z = tilt;
      leg.castShadow = true;
      leg.userData = { interactableType: 'lumber_camp' };
      sawhorse.add(leg);
    }
  }
  const sawnLog = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.19, 1.85, 9),
    barkMat
  );
  sawnLog.rotation.x = Math.PI / 2;
  sawnLog.position.set(0, 0.78, 0);
  sawnLog.castShadow = true;
  sawnLog.userData = { interactableType: 'lumber_camp' };
  sawhorse.add(sawnLog);

  // Zweimann-Schrotsäge im angesägten Stamm
  const sawBlade = new THREE.Mesh(
    new THREE.BoxGeometry(1.15, 0.14, 0.018),
    ironMat
  );
  sawBlade.position.set(0.12, 0.86, 0.1);
  sawBlade.rotation.z = -0.18;
  sawBlade.castShadow = true;
  sawBlade.userData = { interactableType: 'lumber_camp' };
  sawhorse.add(sawBlade);

  for (const hx of [-0.46, 0.7]) {
    const handle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 0.28, 7),
      splitWoodMat
    );
    handle.position.set(hx, 0.94 - hx * 0.15, 0.1);
    handle.userData = { interactableType: 'lumber_camp' };
    sawhorse.add(handle);
  }
  logPileGroup.add(sawhorse);
  group.add(logPileGroup);

  // 4. Hackklotz mit eingeschlagener Holzfälleraxt & gespaltenen Scheiten
  const choppingGroup = new THREE.Group();
  choppingGroup.position.set(-1.65, 0, 1.55);

  const block = new THREE.Mesh(
    new THREE.CylinderGeometry(0.42, 0.46, 0.68, 10),
    barkMat
  );
  block.position.y = 0.34;
  block.castShadow = true;
  block.receiveShadow = true;
  block.userData = { interactableType: 'lumber_camp' };
  choppingGroup.add(block);

  const blockTop = new THREE.Mesh(
    new THREE.CylinderGeometry(0.39, 0.39, 0.02, 10),
    cutWoodMat
  );
  blockTop.position.y = 0.685;
  blockTop.userData = { interactableType: 'lumber_camp' };
  choppingGroup.add(blockTop);

  // Holzfälleraxt schräg im Hackklotz
  const axePivot = new THREE.Group();
  axePivot.position.set(0.05, 0.72, 0);
  axePivot.rotation.z = 0.48;
  axePivot.rotation.y = 0.3;

  const axeHead = new THREE.Mesh(
    new THREE.BoxGeometry(0.28, 0.16, 0.045),
    ironMat
  );
  axeHead.position.set(0.06, 0.02, 0);
  axeHead.castShadow = true;
  axeHead.userData = { interactableType: 'lumber_camp' };
  axePivot.add(axeHead);

  const axeHandle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.026, 0.032, 0.78, 8),
    splitWoodMat
  );
  axeHandle.position.set(-0.04, 0.38, 0);
  axeHandle.castShadow = true;
  axeHandle.userData = { interactableType: 'lumber_camp' };
  axePivot.add(axeHandle);
  choppingGroup.add(axePivot);

  // Verstreute gespaltene Scheite neben dem Hackklotz
  for (const [sx, sz, rotY] of [
    [-0.65, 0.25, 0.4],
    [-0.52, -0.35, 1.2],
    [0.58, 0.3, -0.7],
    [0.62, -0.22, 0.9],
  ]) {
    const splitPiece = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.1, 0.48, 5),
      splitWoodMat
    );
    splitPiece.rotation.z = Math.PI / 2;
    splitPiece.rotation.y = rotY;
    splitPiece.position.set(sx, 0.09, sz);
    splitPiece.castShadow = true;
    splitPiece.userData = { interactableType: 'lumber_camp' };
    choppingGroup.add(splitPiece);
  }
  group.add(choppingGroup);

  // 5. Wärmende Glut-/Feuerstelle im Steinkreis
  const fireGroup = new THREE.Group();
  fireGroup.position.set(2.05, 0, 1.65);

  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2;
    const stone = new THREE.Mesh(new THREE.DodecahedronGeometry(0.16, 0), stoneMat);
    stone.position.set(Math.cos(a) * 0.52, 0.09, Math.sin(a) * 0.52);
    stone.scale.set(1.1, 0.75, 1.0);
    stone.castShadow = true;
    stone.userData = { interactableType: 'lumber_camp' };
    fireGroup.add(stone);
  }

  const emberMat = new THREE.MeshStandardMaterial({
    color: 0xff6b1a,
    emissive: 0xe64800,
    emissiveIntensity: 1.2,
    roughness: 0.4,
    flatShading: true,
  });
  const flameMesh = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.52, 7), emberMat);
  flameMesh.position.y = 0.28;
  flameMesh.userData = { interactableType: 'lumber_camp' };
  fireGroup.add(flameMesh);

  const fireLight = new THREE.PointLight(0xff8c3b, 1.15, 7.5);
  fireLight.position.set(0, 0.65, 0);
  fireGroup.add(fireLight);
  group.add(fireGroup);

  // 6. Großer bemooster Urwald-Baumstumpf direkt beim Holzweibchen (lx = 0.3, lz = 1.0)
  const centralStumpGroup = new THREE.Group();
  centralStumpGroup.position.set(0.3, 0, 1.55);

  const elderStump = new THREE.Mesh(
    new THREE.CylinderGeometry(0.68, 0.88, 0.62, 12),
    barkMat
  );
  elderStump.position.y = 0.31;
  elderStump.castShadow = true;
  elderStump.receiveShadow = true;
  elderStump.userData = { interactableType: 'wood_woman' };
  centralStumpGroup.add(elderStump);

  const elderStumpTop = new THREE.Mesh(
    new THREE.CylinderGeometry(0.64, 0.64, 0.025, 12),
    cutWoodMat
  );
  elderStumpTop.position.y = 0.625;
  elderStumpTop.userData = { interactableType: 'wood_woman' };
  centralStumpGroup.add(elderStumpTop);

  // Moospolster und kleiner sprießender Jungtrieb am Stumpf des Holzweibchens
  const mossCushion = new THREE.Mesh(
    new THREE.DodecahedronGeometry(0.28, 1),
    mossMat
  );
  mossCushion.position.set(-0.48, 0.42, 0.22);
  mossCushion.scale.set(1.2, 0.55, 1.1);
  centralStumpGroup.add(mossCushion);
  group.add(centralStumpGroup);

  // 7. Kranz aus vielen Baumstümpfen rund um die Lichtung (Zeichen der starken Fällungen)
  const stumpPositions: readonly [number, number, number, number][] = [
    [-5.2, -2.6, 0.48, 0.52],
    [-5.8, 1.4, 0.55, 0.6],
    [-4.6, 3.8, 0.44, 0.46],
    [-2.1, 4.5, 0.58, 0.64],
    [0.4, 4.8, 0.5, 0.54],
    [2.9, 4.3, 0.52, 0.58],
    [5.1, 2.8, 0.46, 0.5],
    [5.9, -0.4, 0.6, 0.66],
    [4.8, -3.2, 0.45, 0.48],
    [-2.8, -3.8, 0.42, 0.46],
    [2.6, -3.9, 0.44, 0.5],
  ];

  for (const [sx, sz, radius, height] of stumpPositions) {
    const stump = new THREE.Group();
    stump.position.set(sx, 0, sz);

    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius * 1.28, height, 9),
      barkMat
    );
    trunk.position.y = height / 2;
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    trunk.userData = { interactableType: 'lumber_camp' };
    stump.add(trunk);

    const top = new THREE.Mesh(
      new THREE.CylinderGeometry(radius * 0.94, radius * 0.94, 0.02, 9),
      cutWoodMat
    );
    top.position.y = height + 0.01;
    top.userData = { interactableType: 'lumber_camp' };
    stump.add(top);

    group.add(stump);
  }

  const update = (elapsedSeconds: number): void => {
    // Sanftes Flackern des Wärmefeuers im Holzfällerlager
    const flicker =
      0.88 +
      0.12 * Math.sin(elapsedSeconds * 7.5) +
      0.06 * Math.cos(elapsedSeconds * 13.2);
    flameMesh.scale.set(1.0, flicker, 1.0);
    fireLight.intensity = 1.05 * flicker;
  };

  return { group, update };
}
