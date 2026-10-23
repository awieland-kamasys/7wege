import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { disposeObject3D } from '../utils/threeUtils';

export interface WeirBridgeEntity {
  group: THREE.Group;
  update: (timeSeconds: number) => void;
}

/**
 * Erstellt die 3D-Szenerie auf dem 3. Weg (Quellenweg):
 * - Begehbare Holzbrücke (3D-Modell `/assets/models/wooden bridge 3d model.glb`) entlang der lokalen Z-Achse (Wegverlauf)
 * - Geschlossenes Wehr (Schütz mit Stellrad und Zahnstangen) an der Oberstromseite (-X) der Brücke
 * - Kleiner Stausee (-X) mit Bergquelle und der Ufer-Heimat des Riesen
 * - Bachlauf, der unter der Brücke hindurch (+X) als schmales Rinnsal Richtung dürres Tal fließt
 */
export function createWeirBridgeScene(
  onMeshLoaded?: (mesh: THREE.Mesh) => void
): WeirBridgeEntity {
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
  // 1. DIE HÖLZERNE BRÜCKE (wooden bridge 3d model.glb entlang der lokalen Z-Achse)
  // ============================================================================
  const bridgeContainer = new THREE.Group();
  bridgeContainer.name = 'BridgeContainer';

  // Steinerne Brückenauflager an den beiden Uferenden gegen Spalten im Gelände
  for (const lz of [-3.15, 3.15]) {
    const abutment = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.28, 0.6), stoneMat);
    abutment.position.set(0, -0.06, lz);
    abutment.receiveShadow = true;
    abutment.castShadow = true;
    abutment.userData = { interactableType: 'path', pathId: 3 };
    bridgeContainer.add(abutment);
  }

  // Schlanke temporäre Fallback-Brücke während des GLTF-Ladevorgangs
  const fallbackBridge = new THREE.Group();
  const fallbackDeck = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.12, 6.4), woodPlankMat);
  fallbackDeck.position.set(0, 0.06, 0);
  fallbackDeck.receiveShadow = true;
  fallbackDeck.castShadow = true;
  fallbackDeck.userData = { interactableType: 'path', pathId: 3 };
  fallbackBridge.add(fallbackDeck);
  bridgeContainer.add(fallbackBridge);

  // Detailreiches 3D-Modell der Holzbrücke laden
  const loader = new GLTFLoader();
  loader.load(
    '/assets/models/wooden bridge 3d model.glb',
    (gltf) => {
      const model = gltf.scene;

      // Ausrichtung: Modell-Längsachse (X) um -90° drehen -> verläuft entlang der lokalen Z-Achse (Weg 3)
      model.rotation.y = -Math.PI / 2;

      // Harmonische Skalierung für Spannweite 6.6m und angenehme Begehbarkeit
      // X = Länge (6.6m), Y = Höhe (3.2m), Z = Breite (5.8m -> 2.76m Gesamtbreite)
      model.scale.set(6.6, 3.2, 5.8);

      // Leichte Absenkung um 16 cm, damit die Balken fest im Ufergestein ruhen
      // und die Lauffläche flach (~13 cm) über Bodenniveau anschließt
      model.position.set(0, -0.16, 0);

      model.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          mesh.userData = { interactableType: 'path', pathId: 3 };

          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          for (const mat of mats) {
            if (mat && 'roughness' in mat) {
              const stdMat = mat as THREE.MeshStandardMaterial;
              stdMat.roughness = 0.82;
              stdMat.metalness = 0.12;
            }
          }

          if (onMeshLoaded) {
            onMeshLoaded(mesh);
          }
        }
      });

      // Fallback-Deck entfernen und detailliertes Modell einsetzen
      bridgeContainer.remove(fallbackBridge);
      disposeObject3D(fallbackBridge);
      bridgeContainer.add(model);
    },
    undefined,
    (err) => {
      console.warn('wooden bridge 3d model.glb konnte nicht geladen werden, nutze Fallback-Deck:', err);
    }
  );

  group.add(bridgeContainer);

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
