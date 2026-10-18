import * as THREE from 'three';

export interface HellChasmEntity {
  group: THREE.Group;
  update: (elapsedSeconds: number) => void;
}

/**
 * Erstellt den feurigen Höllenschlund am Ende des 5. Weges:
 * Ein gewaltiger Krater aus zerklüftetem Basalt und Obsidian, in dessen Tiefe ein brodelndes
 * Meer aus flüssiger Lava schwappt, umgeben von züngelnden Flammen, aufsteigenden Funken
 * und flackerndem rotem Höllenfeuer-Licht. Inmitten des Schlundes ragt ein erhabener Obsidianfelsen empor.
 */
export function createHellChasm(): HellChasmEntity {
  const group = new THREE.Group();
  group.userData = { interactableType: 'hell_chasm' };

  // Dunkle, verbrannte Asche- und Basaltmaterialien
  const basaltMat = new THREE.MeshStandardMaterial({
    color: 0x1c1917,
    roughness: 0.95,
    metalness: 0.15,
    flatShading: true,
  });

  const obsidianMat = new THREE.MeshStandardMaterial({
    color: 0x141018,
    roughness: 0.35,
    metalness: 0.7,
    flatShading: true,
  });

  // Glühende Lava / Magma-Oberfläche
  const magmaMat = new THREE.MeshStandardMaterial({
    color: 0xff3b00,
    emissive: 0xff4800,
    emissiveIntensity: 0.95,
    roughness: 0.3,
    metalness: 0.1,
  });

  const innerCrustMat = new THREE.MeshStandardMaterial({
    color: 0x331205,
    emissive: 0x882200,
    emissiveIntensity: 0.4,
    roughness: 0.85,
    flatShading: true,
  });

  // 1. Krater-Kessel (tieferer Bodenausschnitt)
  const craterPit = new THREE.Mesh(
    new THREE.CylinderGeometry(8.6, 7.8, 0.5, 32),
    basaltMat
  );
  craterPit.position.y = 0.1;
  craterPit.receiveShadow = true;
  craterPit.userData = { interactableType: 'hell_chasm' };
  group.add(craterPit);

  // 2. Brodelnder Lavasee
  const lavaPool = new THREE.Mesh(
    new THREE.CylinderGeometry(7.8, 7.8, 0.22, 32),
    magmaMat
  );
  lavaPool.position.y = 0.22;
  lavaPool.userData = { interactableType: 'hell_chasm' };
  group.add(lavaPool);

  // 3. Schwimmende Schlacke- und Obsidianplatten auf der Lava
  const crustSegments: THREE.Mesh[] = [];
  for (let i = 0; i < 9; i++) {
    const angle = (i * Math.PI * 2) / 9 + 0.18;
    const r = 3.6 + (i % 3) * 1.4;
    const crust = new THREE.Mesh(
      new THREE.CylinderGeometry(0.85 + (i % 2) * 0.4, 1.1 + (i % 2) * 0.3, 0.15, 6),
      innerCrustMat
    );
    crust.position.set(Math.sin(angle) * r, 0.28, Math.cos(angle) * r);
    crust.rotation.y = i * 0.7;
    crust.userData = { interactableType: 'hell_chasm' };
    group.add(crust);
    crustSegments.push(crust);
  }

  // 4. Zentraler Obsidianfelsen (Thronfelsen, auf dem der Teufel steht)
  const centerRock = new THREE.Mesh(
    new THREE.CylinderGeometry(2.2, 3.1, 1.1, 10),
    obsidianMat
  );
  centerRock.position.set(0.3, 0.55, -1.2);
  centerRock.castShadow = true;
  centerRock.receiveShadow = true;
  centerRock.userData = { interactableType: 'hell_chasm' };
  group.add(centerRock);

  // Kleiner Trittsockel auf dem Felsen
  const centerLedge = new THREE.Mesh(
    new THREE.CylinderGeometry(1.6, 1.9, 0.4, 8),
    basaltMat
  );
  centerLedge.position.set(0.3, 1.15, -1.2);
  centerLedge.receiveShadow = true;
  centerLedge.userData = { interactableType: 'hell_chasm' };
  group.add(centerLedge);

  // 5. Schroffer Basaltkranz rund um den Kraterrand
  for (let i = 0; i < 22; i++) {
    const angle = (i * Math.PI * 2) / 22;
    // Weg-Zugangsseite etwas flacher halten
    const isEntranceSide = angle > 2.6 && angle < 3.7;
    const r = 8.1 + Math.sin(i * 3) * 0.5;
    const height = isEntranceSide ? 0.6 + (i % 3) * 0.25 : 1.3 + (i % 5) * 0.45;
    const width = 1.1 + (i % 3) * 0.4;

    const rock = new THREE.Mesh(
      new THREE.ConeGeometry(width, height, 5),
      basaltMat
    );
    rock.position.set(Math.sin(angle) * r, height * 0.45, Math.cos(angle) * r);
    rock.rotation.y = i * 0.8;
    rock.rotation.z = (Math.sin(i * 1.5) * 0.15);
    rock.castShadow = true;
    rock.receiveShadow = true;
    rock.userData = { interactableType: 'hell_chasm' };
    group.add(rock);
  }

  // 6. Züngelnde Flammen-Meshes
  const flameMeshes: {
    mesh: THREE.Mesh;
    baseScaleY: number;
    speed: number;
    phase: number;
  }[] = [];

  const flameColors = [0xffdd00, 0xff7700, 0xff2200, 0xffaa00];
  const flameMats = flameColors.map(
    (col) =>
      new THREE.MeshBasicMaterial({
        color: col,
        transparent: true,
        opacity: 0.88,
      })
  );

  // Flammenkränze: um den zentralen Felsen und verteilt im Lavabecken
  const flamePositions: [number, number, number][] = [
    // Rund um den zentralen Thronfelsen
    [-1.2, 0.45, -2.4],
    [1.8, 0.45, -2.2],
    [-1.6, 0.45, -0.4],
    [2.1, 0.45, -0.3],
    [-0.5, 0.55, 0.2],
    [1.2, 0.55, 0.1],
    // Äußerer Lavasee
    [-4.5, 0.35, -3.2],
    [4.2, 0.35, -2.8],
    [-3.8, 0.35, 2.5],
    [3.5, 0.35, 2.8],
    [-5.6, 0.35, 0.2],
    [5.4, 0.35, -0.4],
    [-2.2, 0.35, 4.6],
    [2.0, 0.35, 4.8],
    [0.1, 0.35, 5.2],
    [-3.0, 0.35, -5.2],
    [2.8, 0.35, -5.0],
    [-0.2, 0.35, -6.1],
  ];

  flamePositions.forEach(([fx, fy, fz], idx) => {
    const mat = flameMats[idx % flameMats.length];
    const flameGeo = new THREE.ConeGeometry(0.35 + (idx % 3) * 0.15, 1.4 + (idx % 4) * 0.35, 4);
    const flame = new THREE.Mesh(flameGeo, mat);
    flame.position.set(fx, fy + 0.6, fz);
    flame.rotation.y = idx * 0.9;
    group.add(flame);

    flameMeshes.push({
      mesh: flame,
      baseScaleY: 1.0 + (idx % 3) * 0.3,
      speed: 6.0 + (idx % 5) * 1.5,
      phase: idx * 0.65,
    });
  });

  // 7. Aufsteigende Glut- und Funkenpartikel
  const sparkCount = 28;
  const sparkGeo = new THREE.BoxGeometry(0.08, 0.12, 0.08);
  const sparkMat = new THREE.MeshBasicMaterial({ color: 0xffcc22 });
  const sparks: { mesh: THREE.Mesh; startY: number; speedY: number; angle: number; radius: number }[] = [];

  for (let i = 0; i < sparkCount; i++) {
    const spark = new THREE.Mesh(sparkGeo, sparkMat);
    const angle = (i * Math.PI * 2) / sparkCount + Math.sin(i) * 0.5;
    const radius = 1.5 + (i % 6) * 0.9;
    const startY = 0.4 + (i % 10) * 0.35;
    spark.position.set(Math.sin(angle) * radius, startY, Math.cos(angle) * radius - 0.5);
    group.add(spark);

    sparks.push({
      mesh: spark,
      startY: 0.3,
      speedY: 0.9 + (i % 4) * 0.45,
      angle,
      radius,
    });
  }

  // 8. Flackernde Höllenfeuer-Punktlichter
  const fireLight1 = new THREE.PointLight(0xff5500, 3.2, 22);
  fireLight1.position.set(0.3, 2.8, -1.2);
  fireLight1.castShadow = true;
  group.add(fireLight1);

  const fireLight2 = new THREE.PointLight(0xff2200, 2.4, 18);
  fireLight2.position.set(-2.5, 1.8, 1.5);
  group.add(fireLight2);

  const fireLight3 = new THREE.PointLight(0xffaa00, 1.8, 16);
  fireLight3.position.set(3.2, 1.6, -1.0);
  group.add(fireLight3);

  return {
    group,
    update: (elapsedSeconds: number) => {
      // Flackernde Flammen in Höhe und leichter Drehung animieren
      for (const f of flameMeshes) {
        const pulse = Math.sin(elapsedSeconds * f.speed + f.phase);
        f.mesh.scale.y = f.baseScaleY * (0.75 + 0.35 * pulse);
        f.mesh.scale.x = 0.85 + 0.2 * Math.cos(elapsedSeconds * (f.speed * 0.8) + f.phase);
        f.mesh.rotation.y += 0.025;
      }

      // Funken nach oben steigen lassen und zurücksetzen
      for (let i = 0; i < sparks.length; i++) {
        const sp = sparks[i];
        sp.mesh.position.y += sp.speedY * 0.018;
        sp.mesh.position.x = Math.sin(sp.angle + elapsedSeconds * 0.5) * sp.radius;
        sp.mesh.position.z = Math.cos(sp.angle + elapsedSeconds * 0.5) * sp.radius - 0.5;

        if (sp.mesh.position.y > 4.5) {
          sp.mesh.position.y = sp.startY;
        }
      }

      // Schlackeplatten leicht auf der Lava wiegen
      for (let i = 0; i < crustSegments.length; i++) {
        crustSegments[i].position.y = 0.28 + Math.sin(elapsedSeconds * 1.8 + i) * 0.025;
      }

      // Höllenfeuer-Lichter dramatisch flackern lassen
      const flicker1 = 0.85 + 0.25 * Math.sin(elapsedSeconds * 9.2) + 0.15 * Math.sin(elapsedSeconds * 14.8);
      const flicker2 = 0.85 + 0.25 * Math.cos(elapsedSeconds * 11.5) + 0.15 * Math.sin(elapsedSeconds * 7.1);
      const flicker3 = 0.85 + 0.2 * Math.sin(elapsedSeconds * 8.4);

      fireLight1.intensity = 3.2 * flicker1;
      fireLight2.intensity = 2.4 * flicker2;
      fireLight3.intensity = 1.8 * flicker3;
    },
  };
}
