import * as THREE from 'three';
import { createAshlarWallTexture, createWoodGrainTexture } from '../textures/GroundTextures';

export interface ClosedGateEntity {
  group: THREE.Group;
  update: (timeSeconds: number, playerPos: { x: number; z: number }, highlighted: boolean) => void;
}

/**
 * Erstellt das 3D-Modell des uralten, fest verschlossenen Tores am Ende von Weg 7:
 * - Zwei mächtige Steinpfeiler mit Kapitellen und Kugelspitzen
 * - Ein massiver Torsturzbalken mit geheimnisvoller Siegel-Gravur
 * - Zweiflügeliges, schweres Eichenholztor mit edler Holzmaserung, Eisenbeschlägen und Ziernägeln
 * - Fester Eisen-Querbalken (Schieberiegel) und dicke Eisenketten mit riesigem Vorhängeschloss
 * - Anschließende alte Quadersteinmauern mit breiter Mauerstruktur und Zinnen
 * - Zwei schmiedeeiserne Wandlaternen an den Pfeilern mit sanft flackerndem Licht
 * - Schwebender Hinweis-Kristall für die Interaktion
 */
export function createClosedGate(): ClosedGateEntity {
  const group = new THREE.Group();
  group.name = 'ClosedGate';

  // --- MATERIALIEN ---
  // Breite Quaderstein-Mauerstruktur für Mauern, Pfeiler, Torbogen und Zinnen
  const wallTex = createAshlarWallTexture();
  if (wallTex.map) wallTex.map.repeat.set(3.2, 1.8);
  if (wallTex.bumpMap) wallTex.bumpMap.repeat.set(3.2, 1.8);

  const stoneMat = new THREE.MeshStandardMaterial({
    color: 0x6e6860,
    map: wallTex.map ?? undefined,
    bumpMap: wallTex.bumpMap ?? undefined,
    bumpScale: 0.1,
    roughness: 0.88,
    flatShading: true,
  });
  const mossStoneMat = new THREE.MeshStandardMaterial({
    color: 0x586050,
    map: wallTex.map ?? undefined,
    bumpMap: wallTex.bumpMap ?? undefined,
    bumpScale: 0.1,
    roughness: 0.92,
    flatShading: true,
  });

  // Edle Holzmaserung für das zweiflügelige Eichenholztor
  const woodGrainTex = createWoodGrainTexture();
  if (woodGrainTex.map) woodGrainTex.map.repeat.set(1.4, 2.4);
  if (woodGrainTex.bumpMap) woodGrainTex.bumpMap.repeat.set(1.4, 2.4);

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x664426, // Sattes, geöltes Eichenholz mit sichtbarer Holzmaserung
    map: woodGrainTex.map ?? undefined,
    bumpMap: woodGrainTex.bumpMap ?? undefined,
    bumpScale: 0.08,
    roughness: 0.82,
  });
  const ironMat = new THREE.MeshStandardMaterial({
    color: 0x222326,
    metalness: 0.72,
    roughness: 0.45,
  });
  const chainMat = new THREE.MeshStandardMaterial({
    color: 0x2b2c30,
    metalness: 0.8,
    roughness: 0.4,
  });
  const brassLockMat = new THREE.MeshStandardMaterial({
    color: 0xb58e38,
    metalness: 0.65,
    roughness: 0.35,
  });
  const runeMat = new THREE.MeshStandardMaterial({
    color: 0x9370db,
    emissive: 0x5c3a8f,
    emissiveIntensity: 0.6,
    roughness: 0.25,
  });
  const lanternGlassMat = new THREE.MeshStandardMaterial({
    color: 0xffd580,
    emissive: 0xd9822b,
    emissiveIntensity: 0.85,
    roughness: 0.25,
    transparent: true,
    opacity: 0.85,
  });
  const indicatorMat = new THREE.MeshStandardMaterial({
    color: 0xa87ffb,
    emissive: 0x683cb8,
    emissiveIntensity: 0.65,
    roughness: 0.25,
    metalness: 0.3,
  });

  // Tor-Dimensionen
  const gateWidth = 4.2;
  const gateHeight = 4.0;
  const pillarWidth = 0.95;
  const pillarHeight = 4.6;
  const pillarOffset = gateWidth / 2 + pillarWidth / 2;

  // 1. Zwei mächtige Steinpfeiler (Torpfosten)
  for (const side of [-1, 1]) {
    const pGroup = new THREE.Group();
    pGroup.position.set(side * pillarOffset, 0, 0);

    // Sockel
    const base = new THREE.Mesh(
      new THREE.BoxGeometry(pillarWidth * 1.2, 0.6, pillarWidth * 1.2),
      stoneMat
    );
    base.position.y = 0.3;
    base.castShadow = true;
    base.receiveShadow = true;
    pGroup.add(base);

    // Hauptpfeiler
    const shaft = new THREE.Mesh(
      new THREE.BoxGeometry(pillarWidth, pillarHeight - 0.9, pillarWidth),
      side === -1 ? stoneMat : mossStoneMat
    );
    shaft.position.y = (pillarHeight - 0.9) / 2 + 0.6;
    shaft.castShadow = true;
    shaft.receiveShadow = true;
    pGroup.add(shaft);

    // Kapitell
    const cap = new THREE.Mesh(
      new THREE.BoxGeometry(pillarWidth * 1.15, 0.4, pillarWidth * 1.15),
      stoneMat
    );
    cap.position.y = pillarHeight + 0.1;
    cap.castShadow = true;
    pGroup.add(cap);

    // Steinerne Zierkugel oben auf dem Pfeiler
    const finial = new THREE.Mesh(
      new THREE.SphereGeometry(pillarWidth * 0.32, 10, 10),
      stoneMat
    );
    finial.position.y = pillarHeight + 0.55;
    finial.scale.set(1.0, 1.2, 1.0);
    finial.castShadow = true;
    pGroup.add(finial);

    // Schmiedeeiserne Wandlaterne an der Vorderseite des Pfeilers (+Z)
    const lanternArm = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 0.1, 0.45),
      ironMat
    );
    lanternArm.position.set(0, 2.7, 0.55);
    pGroup.add(lanternArm);

    const lanternMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.16, 0.32, 6),
      lanternGlassMat
    );
    lanternMesh.position.set(0, 2.5, 0.72);
    pGroup.add(lanternMesh);

    const lanternRoof = new THREE.Mesh(
      new THREE.ConeGeometry(0.22, 0.18, 6),
      ironMat
    );
    lanternRoof.position.set(0, 2.72, 0.72);
    pGroup.add(lanternRoof);

    group.add(pGroup);
  }

  // Sanfte Punktlichter für die beiden Pfeilerlaternen
  const leftLight = new THREE.PointLight(0xffaa44, 0.9, 7.0);
  leftLight.position.set(-pillarOffset, 2.5, 0.85);
  group.add(leftLight);

  const rightLight = new THREE.PointLight(0xffaa44, 0.9, 7.0);
  rightLight.position.set(pillarOffset, 2.5, 0.85);
  group.add(rightLight);

  // 2. Massiver Torsturz / Bogen aus Stein
  const archBeam = new THREE.Mesh(
    new THREE.BoxGeometry(gateWidth + pillarWidth * 2, 0.65, pillarWidth * 0.95),
    stoneMat
  );
  archBeam.position.set(0, gateHeight + 0.32, 0);
  archBeam.castShadow = true;
  archBeam.receiveShadow = true;
  group.add(archBeam);

  // Schlussstein mit leuchtender Glyphe/Rune in der Mitte
  const keystone = new THREE.Mesh(
    new THREE.BoxGeometry(0.65, 0.85, pillarWidth * 1.05),
    stoneMat
  );
  keystone.position.set(0, gateHeight + 0.38, 0);
  keystone.castShadow = true;
  group.add(keystone);

  const runePlate = new THREE.Mesh(
    new THREE.BoxGeometry(0.42, 0.48, 0.08),
    runeMat
  );
  runePlate.position.set(0, gateHeight + 0.38, pillarWidth * 0.53);
  group.add(runePlate);

  // 3. Zweiflügeliges, schweres Eichenholztor
  const doorThickness = 0.22;
  const leafWidth = gateWidth / 2 - 0.05;

  for (const side of [-1, 1]) {
    const leafGroup = new THREE.Group();
    leafGroup.position.set(side * (leafWidth / 2 + 0.02), gateHeight / 2, 0);

    // Torflügel (Holzbohlen)
    const doorLeaf = new THREE.Mesh(
      new THREE.BoxGeometry(leafWidth, gateHeight, doorThickness),
      woodMat
    );
    doorLeaf.castShadow = true;
    doorLeaf.receiveShadow = true;
    leafGroup.add(doorLeaf);

    // Vertikale Bohlenfugen (schwarze Nuten)
    for (let f = -3; f <= 3; f++) {
      if (f === 0) continue;
      const groove = new THREE.Mesh(
        new THREE.BoxGeometry(0.02, gateHeight - 0.1, doorThickness + 0.02),
        ironMat
      );
      groove.position.x = (f * leafWidth) / 7;
      leafGroup.add(groove);
    }

    // Horizontale Eisenbänder (oben, mitte, unten)
    for (const yOffset of [-1.35, 0, 1.35]) {
      const ironBand = new THREE.Mesh(
        new THREE.BoxGeometry(leafWidth + 0.02, 0.14, doorThickness + 0.04),
        ironMat
      );
      ironBand.position.y = yOffset;
      leafGroup.add(ironBand);

      // Eisennieten / Ziernägel auf den Bändern
      for (const nx of [-0.65, -0.2, 0.2, 0.65]) {
        for (const nz of [-1, 1]) {
          const rivet = new THREE.Mesh(
            new THREE.SphereGeometry(0.035, 5, 5),
            ironMat
          );
          rivet.position.set(nx * (leafWidth / 2), yOffset, nz * (doorThickness / 2 + 0.025));
          leafGroup.add(rivet);
        }
      }
    }

    // Eisenzinken / Stacheln oben auf der Torkante
    for (let s = -2; s <= 2; s++) {
      const spike = new THREE.Mesh(
        new THREE.ConeGeometry(0.06, 0.35, 4),
        ironMat
      );
      spike.position.set((s * leafWidth) / 6, gateHeight / 2 + 0.15, 0);
      leafGroup.add(spike);
    }

    group.add(leafGroup);
  }

  // 4. Verschluss-Mechanismus: Massiver Schieberiegel, Ketten & Vorhängeschloss
  // Schwerer Eisen-Riegelbalken quer über beide Flügel
  const bolt = new THREE.Mesh(
    new THREE.BoxGeometry(gateWidth * 0.78, 0.2, 0.16),
    ironMat
  );
  bolt.position.set(0, 1.85, doorThickness / 2 + 0.1);
  bolt.castShadow = true;
  group.add(bolt);

  // Riegel-Halterungen links und rechts
  for (const side of [-1, 1]) {
    const bracket = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.32, 0.26),
      ironMat
    );
    bracket.position.set(side * 1.1, 1.85, doorThickness / 2 + 0.08);
    group.add(bracket);
  }

  // Dicke Eisenketten um die Mitte geschlungen
  for (const rotY of [-0.2, 0.2]) {
    const chain = new THREE.Mesh(
      new THREE.TorusGeometry(0.32, 0.045, 6, 14),
      chainMat
    );
    chain.position.set(0, 1.85, doorThickness / 2 + 0.22);
    chain.rotation.y = rotY;
    group.add(chain);
  }

  // Großes Vorhängeschloss aus Messing/Eisen
  const lockBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.28, 0.34, 0.14),
    brassLockMat
  );
  lockBody.position.set(0, 1.62, doorThickness / 2 + 0.28);
  lockBody.castShadow = true;
  group.add(lockBody);

  const lockShackle = new THREE.Mesh(
    new THREE.TorusGeometry(0.12, 0.035, 6, 12, Math.PI),
    ironMat
  );
  lockShackle.position.set(0, 1.8, doorThickness / 2 + 0.28);
  lockShackle.rotation.x = Math.PI;
  group.add(lockShackle);

  // 5. Anschließende alte Steinmauern links und rechts (riegeln das Tal ab)
  const wallSegmentLength = 8.5;
  const wallHeight = 3.6;
  const wallThickness = 0.85;

  for (const side of [-1, 1]) {
    const wallMesh = new THREE.Mesh(
      new THREE.BoxGeometry(wallSegmentLength, wallHeight, wallThickness),
      side === -1 ? stoneMat : mossStoneMat
    );
    // Leicht schräg nach hinten abgewinkelt, um sich natürlich an die Bergflanken anzuschmiegen
    wallMesh.position.set(
      side * (pillarOffset + pillarWidth / 2 + wallSegmentLength / 2 - 0.1),
      wallHeight / 2,
      -0.45
    );
    wallMesh.rotation.y = side * 0.08;
    wallMesh.castShadow = true;
    wallMesh.receiveShadow = true;
    group.add(wallMesh);

    // Zinnen auf den Mauern
    const merlonCount = 4;
    for (let m = 0; m < merlonCount; m++) {
      const merlon = new THREE.Mesh(
        new THREE.BoxGeometry(1.0, 0.6, wallThickness + 0.05),
        stoneMat
      );
      merlon.position.set(
        side * (pillarOffset + 0.8 + m * 2.0),
        wallHeight + 0.3,
        -0.45
      );
      merlon.castShadow = true;
      group.add(merlon);
    }
  }

  // 6. Schwebender Hinweis-Kristall über dem Tor
  const indicator = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.24, 0),
    indicatorMat
  );
  indicator.position.set(0, gateHeight + 1.65, 0);
  indicator.scale.set(0.9, 1.45, 0.9);
  group.add(indicator);

  // Alle Meshes für Raycasting als 'gate' markieren
  group.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.userData = { interactableType: 'gate' };
    }
  });

  const update = (
    timeSeconds: number,
    _playerPos: { x: number; z: number },
    highlighted: boolean
  ) => {
    // Kristall über dem Tor schweben und rotieren lassen
    indicator.position.y = gateHeight + 1.65 + Math.sin(timeSeconds * 2.5) * 0.08;
    indicator.rotation.y = timeSeconds * 1.2;

    // Zartes Flackern der Laternen an den Pfeilern
    const flicker = 0.92 + Math.sin(timeSeconds * 6.5) * 0.12 + Math.cos(timeSeconds * 11.0) * 0.08;
    leftLight.intensity = 0.9 * flicker;
    rightLight.intensity = 0.9 * flicker;
    lanternGlassMat.emissiveIntensity = 0.85 * flicker;

    // Geheimnisvolles Atmen der Rune über dem Tor
    const runePulse = 0.55 + Math.sin(timeSeconds * 1.8) * 0.25;
    runeMat.emissiveIntensity = runePulse;

    // Hervorhebung bei Mouseover
    indicatorMat.emissiveIntensity = highlighted ? 1.4 : 0.65;
    const indScale = highlighted ? 1.25 : 1.0;
    indicator.scale.set(0.9 * indScale, 1.45 * indScale, 0.9 * indScale);

    const emissiveHex = highlighted ? 0x221a30 : 0x000000;
    woodMat.emissive.setHex(emissiveHex);
  };

  return { group, update };
}
