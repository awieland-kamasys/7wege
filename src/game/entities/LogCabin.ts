import * as THREE from 'three';

/**
 * Erstellt die 3D-Schutzhütte aus Baumstämmen an der Waldkreuzung.
 */
export function createLogCabin(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'LogCabin';

  const logMaterial = new THREE.MeshStandardMaterial({
    color: 0x6e4b2e,
    roughness: 0.88,
  });
  const roofMaterial = new THREE.MeshStandardMaterial({
    color: 0x4a321f,
    roughness: 0.92,
  });
  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x573d26,
    roughness: 0.95,
  });

  // Holzpodest / Boden
  const floor = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.25, 3.0), floorMaterial);
  floor.position.y = 0.125;
  floor.receiveShadow = true;
  group.add(floor);

  // Gestapelte Baumstämme für Rückwand und Seitenwände (vorn offen als Schutzhütte)
  const logRadius = 0.14;
  const levels = 7;

  for (let i = 0; i < levels; i++) {
    const y = 0.25 + logRadius + i * (logRadius * 1.85);

    // Rückwand-Stamm
    const backLog = new THREE.Mesh(
      new THREE.CylinderGeometry(logRadius, logRadius, 3.8, 10),
      logMaterial
    );
    backLog.rotation.z = Math.PI / 2;
    backLog.position.set(0, y, -1.3);
    backLog.castShadow = true;
    backLog.receiveShadow = true;
    group.add(backLog);

    // Linke Seitenwand
    const leftLog = new THREE.Mesh(
      new THREE.CylinderGeometry(logRadius, logRadius, 2.8, 10),
      logMaterial
    );
    leftLog.rotation.x = Math.PI / 2;
    leftLog.position.set(-1.7, y, 0);
    leftLog.castShadow = true;
    leftLog.receiveShadow = true;
    group.add(leftLog);

    // Rechte Seitenwand
    const rightLog = new THREE.Mesh(
      new THREE.CylinderGeometry(logRadius, logRadius, 2.8, 10),
      logMaterial
    );
    rightLog.rotation.x = Math.PI / 2;
    rightLog.position.set(1.7, y, 0);
    rightLog.castShadow = true;
    rightLog.receiveShadow = true;
    group.add(rightLog);
  }

  // Zwei vordere Stützstämme
  for (const x of [-1.7, 1.7]) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.17, 2.2, 10), logMaterial);
    post.position.set(x, 1.2, 1.25);
    post.castShadow = true;
    group.add(post);
  }

  // Sitzbank in der Schutzhütte
  const bench = new THREE.Mesh(new THREE.BoxGeometry(3.1, 0.15, 0.55), floorMaterial);
  bench.position.set(0, 0.65, -0.85);
  bench.castShadow = true;
  group.add(bench);

  // Satteldach aus zwei schrägen Dachflächen
  const roofSlopeLeft = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.16, 3.5), roofMaterial);
  roofSlopeLeft.position.set(-1.05, 2.55, 0);
  roofSlopeLeft.rotation.z = 0.42;
  roofSlopeLeft.castShadow = true;
  group.add(roofSlopeLeft);

  const roofSlopeRight = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.16, 3.5), roofMaterial);
  roofSlopeRight.position.set(1.05, 2.55, 0);
  roofSlopeRight.rotation.z = -0.42;
  roofSlopeRight.castShadow = true;
  group.add(roofSlopeRight);

  return group;
}
