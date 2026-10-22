import * as THREE from 'three';

/**
 * Erstellt das detaillierte 3D-Bergmassiv mit historischem Stollenmundloch,
 * geschichteten Felsflanken, Moospolstern, Silbererz-Drusen, Grubenlaterne und Stollengleisen
 * am Ende des 1. Weges. Die lokale +Z-Achse zeigt aus dem Stolleneingang auf den Vorplatz.
 */
export function createMountainCave(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'MountainCave';

  const rockMatDark = new THREE.MeshStandardMaterial({
    color: 0x3b4248,
    roughness: 0.94,
    flatShading: true,
  });
  const rockMatMid = new THREE.MeshStandardMaterial({
    color: 0x525b63,
    roughness: 0.9,
    flatShading: true,
  });
  const rockMatLight = new THREE.MeshStandardMaterial({
    color: 0x6b757e,
    roughness: 0.86,
    flatShading: true,
  });
  const mossMat = new THREE.MeshStandardMaterial({
    color: 0x3d5c3a,
    roughness: 0.92,
    flatShading: true,
  });
  const timberMat = new THREE.MeshStandardMaterial({
    color: 0x4a321f,
    roughness: 0.9,
  });
  const timberDarkMat = new THREE.MeshStandardMaterial({
    color: 0x362314,
    roughness: 0.92,
  });
  const ironMat = new THREE.MeshStandardMaterial({
    color: 0x2f3439,
    metalness: 0.7,
    roughness: 0.45,
  });
  const caveDarkMat = new THREE.MeshBasicMaterial({
    color: 0x05070a,
  });
  const silverVeinMat = new THREE.MeshStandardMaterial({
    color: 0xd8ecff,
    metalness: 0.88,
    roughness: 0.2,
    emissive: 0x315270,
    emissiveIntensity: 0.75,
  });
  const lanternGlowMat = new THREE.MeshStandardMaterial({
    color: 0xffe29a,
    emissive: 0xffa834,
    emissiveIntensity: 1.4,
    roughness: 0.2,
  });

  // 1. Vielschichtiges Haupt-Gebirgsmassiv im Hintergrund
  const mainPeak = new THREE.Mesh(new THREE.DodecahedronGeometry(5.6, 1), rockMatDark);
  mainPeak.position.set(0, 4.8, -5.6);
  mainPeak.scale.set(1.25, 1.45, 0.95);
  mainPeak.rotation.set(0.15, 0.5, -0.1);
  mainPeak.castShadow = true;
  mainPeak.receiveShadow = true;
  group.add(mainPeak);

  const upperLeftPeak = new THREE.Mesh(new THREE.DodecahedronGeometry(3.8, 1), rockMatMid);
  upperLeftPeak.position.set(-3.8, 4.9, -4.6);
  upperLeftPeak.scale.set(1.05, 1.35, 0.9);
  upperLeftPeak.rotation.set(-0.2, 0.8, 0.15);
  upperLeftPeak.castShadow = true;
  upperLeftPeak.receiveShadow = true;
  group.add(upperLeftPeak);

  const upperRightPeak = new THREE.Mesh(new THREE.DodecahedronGeometry(4.1, 1), rockMatMid);
  upperRightPeak.position.set(3.9, 5.2, -4.8);
  upperRightPeak.scale.set(1.1, 1.4, 0.92);
  upperRightPeak.rotation.set(0.2, -0.6, -0.12);
  upperRightPeak.castShadow = true;
  upperRightPeak.receiveShadow = true;
  group.add(upperRightPeak);

  // 2. Linke und rechte Felsflanke mit gestaffelten Felsblöcken
  const leftFlank = new THREE.Mesh(new THREE.DodecahedronGeometry(3.2, 1), rockMatLight);
  leftFlank.position.set(-3.5, 2.1, -2.1);
  leftFlank.scale.set(1.12, 1.15, 0.95);
  leftFlank.rotation.set(0.1, 0.35, -0.08);
  leftFlank.castShadow = true;
  leftFlank.receiveShadow = true;
  group.add(leftFlank);

  const leftShoulder = new THREE.Mesh(new THREE.DodecahedronGeometry(2.1, 1), rockMatDark);
  leftShoulder.position.set(-2.3, 1.6, -0.75);
  leftShoulder.scale.set(1.0, 1.1, 0.85);
  leftShoulder.castShadow = true;
  leftShoulder.receiveShadow = true;
  group.add(leftShoulder);

  const rightFlank = new THREE.Mesh(new THREE.DodecahedronGeometry(3.4, 1), rockMatLight);
  rightFlank.position.set(3.6, 2.2, -2.2);
  rightFlank.scale.set(1.15, 1.2, 0.95);
  rightFlank.rotation.set(-0.1, -0.4, 0.08);
  rightFlank.castShadow = true;
  rightFlank.receiveShadow = true;
  group.add(rightFlank);

  const rightShoulder = new THREE.Mesh(new THREE.DodecahedronGeometry(2.2, 1), rockMatDark);
  rightShoulder.position.set(2.35, 1.65, -0.75);
  rightShoulder.scale.set(1.0, 1.12, 0.85);
  rightShoulder.castShadow = true;
  rightShoulder.receiveShadow = true;
  group.add(rightShoulder);

  // 3. Markanter Felsüberhang (Stirnfels) über dem Stollenmundloch
  const overhang = new THREE.Mesh(new THREE.DodecahedronGeometry(2.4, 1), rockMatMid);
  overhang.position.set(0, 3.55, -0.45);
  overhang.scale.set(1.55, 0.68, 0.95);
  overhang.rotation.x = 0.12;
  overhang.castShadow = true;
  overhang.receiveShadow = true;
  group.add(overhang);

  // Moospolster auf den Felsabsätzen und auf dem Überhang
  for (const [mx, my, mz, sx, sy, sz] of [
    [0, 4.15, -0.35, 1.6, 0.28, 0.9],
    [-3.1, 3.45, -1.5, 1.3, 0.3, 0.85],
    [3.2, 3.6, -1.6, 1.4, 0.3, 0.85],
    [-2.1, 0.35, 0.65, 0.9, 0.25, 0.7],
    [2.2, 0.35, 0.6, 0.85, 0.25, 0.7],
  ]) {
    const moss = new THREE.Mesh(new THREE.DodecahedronGeometry(0.95, 1), mossMat);
    moss.position.set(mx, my, mz);
    moss.scale.set(sx, sy, sz);
    moss.receiveShadow = true;
    group.add(moss);
  }

  // Kleine Randfelsen am Fuß des Stolleneingangs (tief im Felsgrund verankert)
  for (const [bx, by, bz, r] of [
    [-1.75, 0.22, 0.92, 0.58],
    [-2.45, 0.16, 0.88, 0.48],
    [1.78, 0.25, 0.9, 0.62],
    [2.5, 0.18, 0.85, 0.5],
  ]) {
    const boulder = new THREE.Mesh(new THREE.DodecahedronGeometry(r, 0), rockMatLight);
    boulder.position.set(bx, by, bz);
    boulder.rotation.set(bx, bz, 0.4);
    boulder.castShadow = true;
    boulder.receiveShadow = true;
    group.add(boulder);
  }

  // 4. Dunkler Stollenschlund (mehrstufig nach innen für echte Tiefenwirkung)
  const caveTunnel = new THREE.Mesh(new THREE.BoxGeometry(2.35, 2.65, 2.2), caveDarkMat);
  caveTunnel.position.set(0, 1.32, -0.2);
  group.add(caveTunnel);

  const caveArchDark = new THREE.Mesh(
    new THREE.CylinderGeometry(1.15, 1.15, 2.2, 16),
    caveDarkMat
  );
  caveArchDark.rotation.x = Math.PI / 2;
  caveArchDark.position.set(0, 2.2, -0.2);
  group.add(caveArchDark);

  // 5. Gemauerter Naturstein-Rundbogen um das Stollenmundloch
  const archRadius = 1.32;
  const archCenterY = 2.05;
  const numArchStones = 9;
  for (let i = 0; i < numArchStones; i++) {
    const t = i / (numArchStones - 1);
    const angle = Math.PI * (0.08 + t * 0.84);
    const ax = -Math.cos(angle) * archRadius;
    const ay = archCenterY + Math.sin(angle) * archRadius * 0.82;
    const isKeystone = i === Math.floor(numArchStones / 2);
    const stone = new THREE.Mesh(
      new THREE.BoxGeometry(isKeystone ? 0.46 : 0.38, isKeystone ? 0.52 : 0.42, 0.55),
      i % 2 === 0 ? rockMatLight : rockMatMid
    );
    stone.position.set(ax, ay, 0.78);
    stone.rotation.z = angle - Math.PI / 2;
    stone.castShadow = true;
    stone.receiveShadow = true;
    group.add(stone);
  }

  // 6. Kräftige Stollenzimmerung (Türstock mit Stempeln, Kappe und Kopfband-Streben)
  // Stempel reichen 0.45m tief in den Boden, um absolut bodenfest zu stehen
  const postHeight = 3.1;
  const leftPost = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.24, postHeight, 8), timberMat);
  leftPost.position.set(-1.22, 2.68 - postHeight / 2, 0.96);
  leftPost.rotation.z = -0.04;
  leftPost.castShadow = true;
  leftPost.receiveShadow = true;
  group.add(leftPost);

  const rightPost = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.24, postHeight, 8), timberMat);
  rightPost.position.set(1.22, 2.68 - postHeight / 2, 0.96);
  rightPost.rotation.z = 0.04;
  rightPost.castShadow = true;
  rightPost.receiveShadow = true;
  group.add(rightPost);

  const topBeam = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.21, 3.05, 8), timberMat);
  topBeam.rotation.z = Math.PI / 2;
  topBeam.position.set(0, 2.64, 0.98);
  topBeam.castShadow = true;
  topBeam.receiveShadow = true;
  group.add(topBeam);

  // Schräge Kopfband-Streben oben in den Ecken des Türstocks
  for (const sign of [-1, 1]) {
    const brace = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.68, 0.18), timberDarkMat);
    brace.position.set(sign * 0.95, 2.34, 0.96);
    brace.rotation.z = sign * 0.72;
    brace.castShadow = true;
    group.add(brace);

    // Eisenbänder um die Stempel
    const ironBand = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.1, 8), ironMat);
    ironBand.position.set(sign * 1.21, 1.95, 0.96);
    group.add(ironBand);
  }

  // Altes Absperr-/Verbotsholz quer am oberen Stollenrand (Symbol für das Verbot/Versprechen)
  const warningPlank = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.24, 0.09), timberDarkMat);
  warningPlank.position.set(0, 2.08, 1.1);
  warningPlank.rotation.z = -0.05;
  warningPlank.castShadow = true;
  group.add(warningPlank);

  // 7. Kurzes Stück alte Grubenschienen mit Holzschwellen am Stollenausgang
  for (const sz of [0.35, 0.72, 1.08]) {
    const sleeper = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.07, 0.18), timberDarkMat);
    sleeper.position.set(0, 0.035, sz);
    sleeper.receiveShadow = true;
    group.add(sleeper);
  }
  for (const rx of [-0.42, 0.42]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, 1.15), ironMat);
    rail.position.set(rx, 0.09, 0.65);
    rail.receiveShadow = true;
    group.add(rail);
  }

  // 8. Warme Grubenlaterne am rechten Holzstempel + kühler Silberschimmer tief im Stollen
  const lanternBracket = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.26), ironMat);
  lanternBracket.position.set(1.22, 1.82, 1.12);
  group.add(lanternBracket);

  const lanternGlass = new THREE.Mesh(
    new THREE.CylinderGeometry(0.09, 0.07, 0.22, 8),
    lanternGlowMat
  );
  lanternGlass.position.set(1.22, 1.68, 1.2);
  group.add(lanternGlass);

  const lanternCap = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.1, 8), ironMat);
  lanternCap.position.set(1.22, 1.81, 1.2);
  group.add(lanternCap);

  const lanternLight = new THREE.PointLight(0xffb454, 1.1, 6.5);
  lanternLight.position.set(1.22, 1.68, 1.32);
  group.add(lanternLight);

  // Funkelnde Silbererz-Drusen in den Felsspalten neben dem Stolleneingang
  for (const [vx, vy, vz, rotZ] of [
    [-1.72, 1.38, 0.82, 0.3],
    [-1.95, 1.62, 0.76, -0.4],
    [1.68, 1.25, 0.8, -0.25],
    [1.55, 2.25, 0.72, 0.5],
    [-0.95, 3.05, 0.62, 0.2],
  ]) {
    const vein = new THREE.Mesh(new THREE.OctahedronGeometry(0.2, 0), silverVeinMat);
    vein.position.set(vx, vy, vz);
    vein.scale.set(1.65, 0.65, 0.75);
    vein.rotation.z = rotZ;
    group.add(vein);
  }

  // Alle Meshes für Raycasting als Höhleneingang markieren
  group.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.userData = { interactableType: 'cave' };
    }
  });

  return group;
}
