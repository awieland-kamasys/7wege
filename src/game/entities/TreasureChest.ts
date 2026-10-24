import * as THREE from 'three';

export interface TreasureChestEntity {
  group: THREE.Group;
  update: (dtSeconds: number, isOpen: boolean, isHovered: boolean) => void;
}

/**
 * Erstellt die 3D-Schatztruhe vor der Schutzhütte mit animiertem, über ein Scharnier zu öffnendem Deckel.
 */
export function createTreasureChest(): TreasureChestEntity {
  const group = new THREE.Group();
  group.name = 'TreasureChest';

  const woodMat = new THREE.MeshLambertMaterial({
    color: 0x5a381e,
    emissive: 0x000000,
  });
  const metalMat = new THREE.MeshLambertMaterial({
    color: 0xb89246,
    emissive: 0x000000,
  });
  const interiorMat = new THREE.MeshLambertMaterial({
    color: 0x26170c,
  });
  const treasureGlowMat = new THREE.MeshStandardMaterial({
    color: 0xffd86b,
    emissive: 0xdba028,
    emissiveIntensity: 0.9,
    roughness: 0.25,
  });

  const width = 0.92;
  const baseHeight = 0.44;
  const depth = 0.58;

  // Unterteil der Truhe (Korpus)
  const baseBox = new THREE.Mesh(
    new THREE.BoxGeometry(width, baseHeight, depth),
    woodMat
  );
  baseBox.position.y = baseHeight / 2;
  baseBox.castShadow = true;
  baseBox.receiveShadow = true;
  group.add(baseBox);

  // Dunkle Innenseite oben auf dem Unterteil + leuchtender Inhalt (sichtbar bei geöffnetem Deckel)
  const innerRecess = new THREE.Mesh(
    new THREE.BoxGeometry(width - 0.1, 0.04, depth - 0.1),
    interiorMat
  );
  innerRecess.position.y = baseHeight - 0.01;
  group.add(innerRecess);

  const treasureGem = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.14, 1),
    treasureGlowMat
  );
  treasureGem.position.set(0, baseHeight + 0.02, 0);
  treasureGem.scale.set(1.6, 0.55, 1.1);
  group.add(treasureGem);

  const innerLight = new THREE.PointLight(0xffcf5c, 0, 3.2);
  innerLight.position.set(0, baseHeight + 0.22, 0.05);
  group.add(innerLight);

  // Metallbänder am Unterteil (links und rechts)
  for (const xOffset of [-0.32, 0.32]) {
    const band = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, baseHeight + 0.01, depth + 0.02),
      metalMat
    );
    band.position.set(xOffset, baseHeight / 2, 0);
    band.castShadow = true;
    group.add(band);
  }

  // Schlossbeschlag vorne an der Truhe
  const lockPlate = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.18, 0.04), metalMat);
  lockPlate.position.set(0, baseHeight - 0.04, depth / 2 + 0.015);
  group.add(lockPlate);

  // Scharnier-Drehpunkt (Pivot) an der hinteren oberen Kante des Truhenunterteils
  const lidPivot = new THREE.Group();
  lidPivot.position.set(0, baseHeight, -depth / 2);
  group.add(lidPivot);

  // Truhendeckel (relativ zum hinteren Scharnier positioniert)
  const lidHeight = 0.22;
  const lidBox = new THREE.Mesh(
    new THREE.BoxGeometry(width, lidHeight, depth),
    woodMat
  );
  lidBox.position.set(0, lidHeight / 2, depth / 2);
  lidBox.castShadow = true;
  lidBox.receiveShadow = true;
  lidPivot.add(lidBox);

  // Gewölbte Oberseite des Deckels
  const lidArch = new THREE.Mesh(
    new THREE.CylinderGeometry(depth / 2, depth / 2, width, 12, 1, false, 0, Math.PI),
    woodMat
  );
  lidArch.rotation.z = Math.PI / 2;
  lidArch.rotation.y = Math.PI / 2;
  lidArch.scale.set(1, 0.45, 1);
  lidArch.position.set(0, lidHeight, depth / 2);
  lidArch.castShadow = true;
  lidPivot.add(lidArch);

  // Metallbänder am Deckel
  for (const xOffset of [-0.32, 0.32]) {
    const lidBand = new THREE.Mesh(
      new THREE.BoxGeometry(0.065, lidHeight + 0.06, depth + 0.02),
      metalMat
    );
    lidBand.position.set(xOffset, lidHeight / 2 + 0.02, depth / 2);
    lidBand.castShadow = true;
    lidPivot.add(lidBand);
  }

  // Alle Meshes für Raycasting als Schatztruhe markieren
  group.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.userData = { interactableType: 'chest' };
    }
  });

  let currentOpenAngle = 0;

  const update = (dtSeconds: number, isOpen: boolean, isHovered: boolean) => {
    // Zielwinkel: geschlossen = 0 rad, geöffnet = -1.25 rad (~72 Grad nach hinten aufgeklappt)
    const targetAngle = isOpen ? -1.25 : 0;
    const lerpFactor = Math.min(1, dtSeconds * 8.5);
    currentOpenAngle += (targetAngle - currentOpenAngle) * lerpFactor;
    lidPivot.rotation.x = currentOpenAngle;

    // Licht im Inneren leuchtet auf, sobald sich der Deckel öffnet
    const openRatio = Math.min(1, Math.abs(currentOpenAngle) / 1.25);
    innerLight.intensity = openRatio * 1.3;
    treasureGem.visible = openRatio > 0.05;

    // Dezente Hervorhebung bei Maus-Hover
    woodMat.emissive.setHex(isHovered ? 0x2b1d0c : 0x000000);
    metalMat.emissive.setHex(isHovered ? 0x3b2c0e : 0x000000);
  };

  return { group, update };
}
