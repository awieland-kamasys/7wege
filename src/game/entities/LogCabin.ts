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

  // Vorderer Querbalken (Sturz) über dem Eingang der Hütte
  const frontBeam = new THREE.Mesh(
    new THREE.CylinderGeometry(0.13, 0.13, 3.7, 10),
    logMaterial
  );
  frontBeam.rotation.z = Math.PI / 2;
  frontBeam.position.set(0, 2.22, 1.25);
  frontBeam.castShadow = true;
  frontBeam.receiveShadow = true;
  group.add(frontBeam);

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

  // Holzschild an der Vorderfront der Hütte mit der Aufschrift "7 Wege"
  const signGroup = createFrontSign(logMaterial, roofMaterial);
  signGroup.position.set(0, 2.42, 1.62);
  group.add(signGroup);

  return group;
}

/**
 * Erstellt das rustikale Holzschild mit eisernen Halterungen und der Aufschrift "7 Wege"
 * für die Vorderfront der Schutzhütte.
 */
function createFrontSign(
  woodMat: THREE.MeshStandardMaterial,
  darkWoodMat: THREE.MeshStandardMaterial
): THREE.Group {
  const signGroup = new THREE.Group();

  const ironMat = new THREE.MeshStandardMaterial({
    color: 0x2b2f33,
    roughness: 0.55,
    metalness: 0.7,
  });

  // Zwei eiserne Haltestreben nach hinten zum Giebel/Querbalken
  for (const x of [-0.58, 0.58]) {
    const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.34, 0.36), ironMat);
    bracket.position.set(x, 0.08, -0.18);
    bracket.castShadow = true;
    signGroup.add(bracket);
  }

  // Massives Grundbrett des Holzschildes
  const boardWidth = 1.68;
  const boardHeight = 0.48;
  const boardDepth = 0.08;
  const board = new THREE.Mesh(
    new THREE.BoxGeometry(boardWidth, boardHeight, boardDepth),
    woodMat
  );
  board.castShadow = true;
  board.receiveShadow = true;
  signGroup.add(board);

  // Geschnitzte obere und untere Rahmenleiste
  for (const y of [-boardHeight / 2 + 0.03, boardHeight / 2 - 0.03]) {
    const trim = new THREE.Mesh(
      new THREE.BoxGeometry(boardWidth + 0.06, 0.055, boardDepth + 0.025),
      darkWoodMat
    );
    trim.position.set(0, y, 0);
    trim.castShadow = true;
    signGroup.add(trim);
  }

  // Vorderseite mit der Aufschrift "7 Wege"
  const labelTexture = createCabinSignTexture('7 Wege');
  const frontPlaneMat = new THREE.MeshStandardMaterial({
    map: labelTexture ?? undefined,
    color: labelTexture ? 0xffffff : 0xdcb474,
    roughness: 0.72,
    metalness: 0.05,
  });

  const frontFace = new THREE.Mesh(
    new THREE.PlaneGeometry(boardWidth - 0.06, boardHeight - 0.1),
    frontPlaneMat
  );
  frontFace.position.z = boardDepth / 2 + 0.004;
  signGroup.add(frontFace);

  return signGroup;
}

/**
 * Zeichnet die Holzmaserung und den Schriftzug "7 Wege" auf eine Canvas-Textur.
 */
function createCabinSignTexture(text: string): THREE.CanvasTexture | null {
  if (typeof document === 'undefined') {
    return null;
  }
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 160;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return null;
  }

  // Dunkelbrauner Holzgrund mit leichtem vertikalem Farbverlauf
  const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  bgGrad.addColorStop(0, '#4e331e');
  bgGrad.addColorStop(0.5, '#5d3e25');
  bgGrad.addColorStop(1, '#442c19');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Dezente Holzmaserungs-Linien
  ctx.strokeStyle = 'rgba(35, 20, 10, 0.35)';
  ctx.lineWidth = 3;
  for (let y = 16; y < canvas.height; y += 22) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(
      canvas.width * 0.33,
      y + ((y % 40) - 20) * 0.25,
      canvas.width * 0.66,
      y - ((y % 40) - 20) * 0.25,
      canvas.width,
      y
    );
    ctx.stroke();
  }

  // Eingeschnitzter Innenrahmen
  ctx.strokeStyle = '#c89d54';
  ctx.lineWidth = 4;
  ctx.strokeRect(14, 14, canvas.width - 28, canvas.height - 28);

  // Vier geschmiedete Ziernägel in den Ecken
  ctx.fillStyle = '#262a2e';
  for (const [nx, ny] of [
    [28, 28],
    [canvas.width - 28, 28],
    [28, canvas.height - 28],
    [canvas.width - 28, canvas.height - 28],
  ]) {
    ctx.beginPath();
    ctx.arc(nx, ny, 6, 0, Math.PI * 2);
    ctx.fill();
  }

  // Aufschrift "7 Wege" mit dunklem Kerbschatten und hellem, warmem Gold-/Elfenbeinton
  ctx.font = 'bold 86px Georgia, "Times New Roman", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Tiefenschatten der Schnitzschrift
  ctx.fillStyle = '#1f1209';
  ctx.fillText(text, canvas.width / 2 + 4, canvas.height / 2 + 5);

  // Helle, leuchtende Hauptschrift
  const textGrad = ctx.createLinearGradient(0, 32, 0, canvas.height - 32);
  textGrad.addColorStop(0, '#fff3d1');
  textGrad.addColorStop(0.55, '#f0c878');
  textGrad.addColorStop(1, '#cfa04e');
  ctx.fillStyle = textGrad;
  ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 1);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}
