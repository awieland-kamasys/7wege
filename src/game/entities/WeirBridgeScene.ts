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

      // Ausrichtung: Um 180° gedreht (+90° statt -90°), Modell-Längsachse entlang der lokalen Z-Achse (Weg 3)
      model.rotation.y = Math.PI / 2;

      // Skalierung: Spannweite 6.6m, Breite 2.76m und in der Höhe auf 6.4m verdoppelt (Faktor 6.4)
      model.scale.set(6.6, 6.4, 5.8);

      // Absenkung um 46 cm für passgenauen Anschluss des Decks (~12 cm über Bodenniveau)
      // und solide Verankerung der Holzpfeiler tief im Bachbett
      model.position.set(0, -0.46, 0);

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
  // 2. BERGQUELLE, GEBIRGSSEE & HEIMAT DES RIESEN (Oberstrom: lx = -1.5 bis -9.5)
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

  // Klares Wasserbecken des Gebirgssees bei der Heimat des Riesen
  const reservoirWater = new THREE.Mesh(
    new THREE.CylinderGeometry(3.9, 3.7, 0.72, 32),
    reservoirWaterMat
  );
  reservoirWater.scale.set(1.18, 1.0, 0.92);
  reservoirWater.position.set(-5.4, 0.08, 0.0);
  reservoirWater.receiveShadow = true;
  reservoirWater.userData = { interactableType: 'weir' };
  group.add(reservoirWater);

  // Freier Wasserlauf zwischen dem Quellsee und der Brücke
  const streamInflow = new THREE.Mesh(
    new THREE.BoxGeometry(2.8, 0.72, 2.6),
    reservoirWaterMat
  );
  streamInflow.position.set(-2.0, 0.08, 0);
  streamInflow.userData = { interactableType: 'weir' };
  group.add(streamInflow);

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
  // 3. DER GEBIRGSBACH UNTER DER BRÜCKE & FLUSSLAUF INS TAL (lx = -2.0 bis +8.5)
  // ============================================================================
  const dryBedMat = new THREE.MeshStandardMaterial({
    color: 0x595143,
    roughness: 0.95,
  });
  const streamWaterMat = new THREE.MeshStandardMaterial({
    color: 0x2b879e,
    emissive: 0x0d3842,
    emissiveIntensity: 0.35,
    roughness: 0.2,
    transparent: true,
    opacity: 0.82,
  });

  // Steiniges Bachbett, das frei unter der Holzbrücke hindurch nach Südwesten (+X) fließt
  const streamBed = new THREE.Mesh(new THREE.BoxGeometry(11.2, 0.04, 2.85), dryBedMat);
  streamBed.position.set(2.8, 0.015, 0);
  streamBed.receiveShadow = true;
  group.add(streamBed);

  // Klarer, frei fließender Gebirgsbach ohne Barriere
  const streamWater = new THREE.Mesh(new THREE.BoxGeometry(11.0, 0.05, 1.45), streamWaterMat);
  streamWater.position.set(2.7, 0.03, 0);
  streamWater.userData = { interactableType: 'weir' };
  group.add(streamWater);

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
    // Sanftes Pulsieren der Bergquelle
    const wave = 0.5 + 0.5 * Math.sin(timeSeconds * 2.6);
    springRipple.scale.setScalar(0.92 + wave * 0.22);
  };

  return { group, update };
}
