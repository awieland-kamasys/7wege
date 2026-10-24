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
  const woodPlankMat = new THREE.MeshStandardMaterial({
    color: 0x6e4e32,
    roughness: 0.85,
  });

  // ============================================================================
  // 1. DIE HÖLZERNE BRÜCKE (wooden bridge 3d model.glb entlang der lokalen Z-Achse)
  // Um die Hälfte vergrößert (+50 %) für eine monumentale, begehbare Holzbrücke
  // ============================================================================
  const bridgeContainer = new THREE.Group();
  bridgeContainer.name = 'BridgeContainer';

  // Schlanke temporäre Fallback-Brücke während des GLTF-Ladevorgangs
  const fallbackBridge = new THREE.Group();
  const fallbackDeck = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.18, 9.6), woodPlankMat);
  fallbackDeck.position.set(0, 0.08, 0);
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

      // Ausrichtung: Modell-Längsachse entlang der lokalen Z-Achse (Weg 3)
      model.rotation.y = Math.PI / 2;

      // Skalierung: Um die Hälfte vergrößert (Faktor 1.5)
      // Spannweite 9.9m, Breite 4.14m und Höhe 9.6m
      model.scale.set(9.9, 9.6, 8.7);

      // Passgenaue Absenkung für bündigen Anschluss des Decks an die Wegoberfläche (-1.50m)
      model.position.set(0, -0.72, 0);

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
  // 2. BERGQUELLE, WEITER GEBIRGSSEE & STEINRAND DES RIESENTEICHES
  // (Oberstrom: lx = -1.5 bis -18.5)
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

  // Großes, offenes Hauptwasserbecken des Gebirgssees vor der Brücke und bei der Heimat des Riesen
  const reservoirWater = new THREE.Mesh(
    new THREE.CylinderGeometry(4.2, 3.9, 0.72, 32),
    reservoirWaterMat
  );
  reservoirWater.scale.set(1.25, 1.0, 1.05);
  reservoirWater.position.set(-5.6, 0.08, 0.2);
  reservoirWater.receiveShadow = true;
  reservoirWater.userData = { interactableType: 'weir' };
  group.add(reservoirWater);

  // Weites Seewasser, das über 10 Meter offen liegt und direkt durch die Wurzelhöhle des Baumes fließt (lx = -5.0 bis -18.5)
  const caveChannelWater = new THREE.Mesh(
    new THREE.BoxGeometry(14.2, 0.72, 4.4),
    reservoirWaterMat
  );
  caveChannelWater.position.set(-11.8, 0.08, -0.3);
  caveChannelWater.receiveShadow = true;
  caveChannelWater.userData = { interactableType: 'weir' };
  group.add(caveChannelWater);

  // Freier Wasserlauf zwischen dem Quellsee und der Brücke
  const streamInflow = new THREE.Mesh(
    new THREE.BoxGeometry(2.8, 0.72, 2.6),
    reservoirWaterMat
  );
  streamInflow.position.set(-1.8, 0.08, 0);
  streamInflow.userData = { interactableType: 'weir' };
  group.add(streamInflow);

  // Sprudelnde Bergquelle an den hinteren Felsen hinter der Wurzelhöhle (lx = -17.6, lz = -0.35)
  const springRock = new THREE.Mesh(new THREE.DodecahedronGeometry(1.65, 1), stoneMat);
  springRock.scale.set(1.1, 1.35, 1.2);
  springRock.position.set(-17.6, 1.1, -0.35);
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
  springWaterfall.position.set(-16.45, 0.85, -0.35);
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
  springRipple.position.set(-16.0, 0.455, -0.35);
  group.add(springRipple);

  // --- KOMPLETTER STEINRAND DES RIESENTEICHES ---
  // Ein durchgehender, geschlossener Kranz aus massiven Felsen, Bruchsteinen und Uferkieseln
  const lakeStoneMat1 = new THREE.MeshStandardMaterial({
    color: 0x565c60,
    roughness: 0.88,
    flatShading: true,
  });
  const lakeStoneMat2 = new THREE.MeshStandardMaterial({
    color: 0x546252, // Moosiger Fels
    roughness: 0.90,
    flatShading: true,
  });
  const lakeStoneMat3 = new THREE.MeshStandardMaterial({
    color: 0x41474a, // Dunkler Schiefer
    roughness: 0.84,
    flatShading: true,
  });
  const lakeMaterials = [lakeStoneMat1, lakeStoneMat2, lakeStoneMat3];

  const shorelineCoords: { x: number; z: number }[] = [
    // 1. Nord-Ost-Ufer bei der Brücke
    { x: -1.2, z: 1.6 },
    { x: -1.9, z: 2.3 },
    { x: -3.0, z: 3.4 },
    { x: -4.3, z: 4.3 },
    { x: -5.6, z: 4.6 },
    { x: -6.9, z: 4.0 },
    { x: -8.1, z: 3.1 },
    // 2. Nordkante des Quellkanals
    { x: -9.4, z: 2.4 },
    { x: -10.6, z: 2.3 },
    { x: -11.8, z: 2.5 },
    { x: -13.0, z: 2.3 },
    { x: -14.2, z: 2.4 },
    { x: -15.4, z: 2.3 },
    { x: -16.6, z: 2.4 },
    { x: -17.6, z: 2.2 },
    // 3. West-Ufer an der Bergquelle
    { x: -18.3, z: 1.5 },
    { x: -18.7, z: 0.7 },
    { x: -18.8, z: -0.1 },
    { x: -18.5, z: -0.9 },
    { x: -18.0, z: -1.7 },
    // 4. Südkante des Quellkanals
    { x: -17.2, z: -2.3 },
    { x: -16.0, z: -2.4 },
    { x: -14.8, z: -2.3 },
    { x: -13.6, z: -2.5 },
    { x: -12.4, z: -2.3 },
    { x: -11.2, z: -2.4 },
    { x: -10.0, z: -2.3 },
    { x: -8.8, z: -2.6 },
    // 5. Süd-Ufer des großen Hauptbeckens (vor dem Riesen)
    { x: -7.6, z: -3.4 },
    { x: -6.6, z: -4.2 },
    { x: -5.3, z: -4.6 },
    { x: -4.0, z: -4.3 },
    { x: -2.8, z: -3.4 },
    { x: -1.9, z: -2.3 },
    { x: -1.2, z: -1.6 },
  ];

  // Platziere primäre Felsen und dichte Zwischensteine entlang der gesamten Uferlinie
  shorelineCoords.forEach((pt, i) => {
    const mat = lakeMaterials[i % lakeMaterials.length];
    const baseRadius = 0.65 + ((i * 7) % 5) * 0.12;

    // Großer Uferfels
    const mainRock = new THREE.Mesh(
      new THREE.DodecahedronGeometry(baseRadius, 1),
      mat
    );
    mainRock.scale.set(
      0.9 + ((i * 3) % 4) * 0.12,
      0.75 + ((i * 5) % 3) * 0.15,
      0.9 + ((i * 2) % 4) * 0.12
    );
    mainRock.position.set(pt.x, 0.14, pt.z);
    mainRock.rotation.set((i * 0.4) % Math.PI, (i * 0.8) % Math.PI, (i * 0.3) % Math.PI);
    mainRock.castShadow = true;
    mainRock.receiveShadow = true;
    mainRock.userData = { interactableType: 'weir' };
    group.add(mainRock);
    if (onMeshLoaded) onMeshLoaded(mainRock);

    // Dazwischen liegender Stein / Kiesel für einen lückenlos geschlossenen Steinrand
    const nextPt = shorelineCoords[(i + 1) % shorelineCoords.length];
    const midX = (pt.x + nextPt.x) * 0.5 + Math.sin(i * 1.7) * 0.18;
    const midZ = (pt.z + nextPt.z) * 0.5 + Math.cos(i * 2.1) * 0.18;
    const subMat = lakeMaterials[(i + 1) % lakeMaterials.length];
    const subRock = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.38 + ((i * 4) % 4) * 0.08, 0),
      subMat
    );
    subRock.scale.set(1.1, 0.7, 1.0);
    subRock.position.set(midX, 0.08, midZ);
    subRock.rotation.y = i * 1.1;
    subRock.castShadow = true;
    subRock.receiveShadow = true;
    subRock.userData = { interactableType: 'weir' };
    group.add(subRock);
    if (onMeshLoaded) onMeshLoaded(subRock);
  });

  // Lade markante Moosfelsen an 4 prominenten Eckpunkten des Riesenteiches
  loader.load(
    '/assets/models/mossy rock boulder 3d model.glb',
    (gltf) => {
      const baseBoulder = gltf.scene;
      const prominentSpots = [
        { x: -5.8, z: 4.8, scale: 2.1, rotY: 0.5 },
        { x: -18.7, z: 0.6, scale: 2.4, rotY: 2.1 },
        { x: -5.4, z: -4.8, scale: 2.2, rotY: 3.7 },
        { x: -12.0, z: -2.6, scale: 1.8, rotY: 1.4 },
      ];
      for (const spot of prominentSpots) {
        const boulder = baseBoulder.clone(true);
        boulder.scale.setScalar(spot.scale);
        boulder.position.set(spot.x, 0.02, spot.z);
        boulder.rotation.y = spot.rotY;
        boulder.traverse((child) => {
          const m = child as THREE.Mesh;
          if (m.isMesh) {
            m.castShadow = true;
            m.receiveShadow = true;
            m.userData = { interactableType: 'weir' };
            if (onMeshLoaded) onMeshLoaded(m);
          }
        });
        group.add(boulder);
      }
    },
    undefined,
    (err) => {
      console.warn('mossy rock boulder konnte für Teichrand nicht geladen werden:', err);
    }
  );

  // ============================================================================
  // 3. DER GEBIRGSBACH UNTER DEM WEHR & DER BRÜCKE INS TAL
  // Vollständig mit 3D-Modell /assets/models/rocky stream 3d model.glb gebaut
  // ============================================================================
  const streamContainer = new THREE.Group();
  streamContainer.name = 'RockyStreamTalContainer';
  group.add(streamContainer);

  // Wehrüberlauf direkt unter dem Wehrschütz der Holzbrücke:
  // Das aufgestaute Seewasser fließt nahtlos durch das Wehr in die tiefe Rinne des Baches
  const weirSpillwayMat = new THREE.MeshStandardMaterial({
    color: 0xaef0ff,
    emissive: 0x24788c,
    emissiveIntensity: 0.65,
    roughness: 0.22,
    transparent: true,
    opacity: 0.90,
  });
  const weirSpillway = new THREE.Mesh(
    new THREE.BoxGeometry(0.70, 0.32, 1.45),
    weirSpillwayMat
  );
  weirSpillway.position.set(-0.95, -0.06, 0);
  group.add(weirSpillway);

  // Ziseliertes, schäumendes Überlaufwasser direkt am Fall des Wehrs
  const weirCascade = new THREE.Mesh(
    new THREE.BoxGeometry(0.35, 0.26, 1.38),
    new THREE.MeshStandardMaterial({
      color: 0xe0faff,
      emissive: 0x4aa6bd,
      emissiveIntensity: 0.75,
      roughness: 0.15,
      transparent: true,
      opacity: 0.92,
    })
  );
  weirCascade.position.set(-0.76, -0.12, 0);
  weirCascade.rotation.z = -0.32;
  group.add(weirCascade);

  // Temporärer Platzhalter während des GLB-Ladens des Baches
  const fallbackBedMat = new THREE.MeshStandardMaterial({ color: 0x242d2a, roughness: 0.9 });
  const fallbackStream = new THREE.Mesh(new THREE.BoxGeometry(32.4, 0.08, 2.4), fallbackBedMat);
  fallbackStream.position.set(15.2, -0.28, 0);
  streamContainer.add(fallbackStream);

  // Lade rocky stream 3d model.glb und bilde den gesamten 32 Meter langen Bachlauf
  loader.load(
    '/assets/models/rocky stream 3d model.glb',
    (gltf) => {
      streamContainer.remove(fallbackStream);
      disposeObject3D(fallbackStream);

      const baseStream = gltf.scene;

      // 5 nahtlose Segmente von lx = -0.8 bis lx = 31.2
      // Jedes Segment hat 6.4m Länge (scale.x = 6.4), 3.2m Breite (scale.z = 12.8)
      // und schmiegt sich bündig in die Rinnensohle auf y = -0.38m ein.
      const segmentXPositions = [2.4, 8.8, 15.2, 21.6, 28.0];

      segmentXPositions.forEach((segX, idx) => {
        const segClone = baseStream.clone(true);
        segClone.scale.set(6.4, 3.2, 12.8);
        segClone.position.set(segX, -0.38, 0);

        // Abwechselnde Drehung für organische Felsformationen und fließende Wasserstruktur
        if (idx % 2 === 1) {
          segClone.rotation.y = Math.PI;
        }

        segClone.traverse((child) => {
          const mesh = child as THREE.Mesh;
          if (mesh.isMesh) {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.userData = { interactableType: 'weir' };

            if (mesh.material && 'roughness' in mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = 0.35;
            }

            if (onMeshLoaded) {
              onMeshLoaded(mesh);
            }
          }
        });

        streamContainer.add(segClone);
      });
    },
    undefined,
    (err) => {
      console.warn('rocky stream 3d model.glb konnte für Bachlauf nicht geladen werden:', err);
    }
  );

  const update = (timeSeconds: number) => {
    // Sanftes Pulsieren der Bergquelle
    const wave = 0.5 + 0.5 * Math.sin(timeSeconds * 2.6);
    springRipple.scale.setScalar(0.92 + wave * 0.22);

    // Lebendiges Fließen des Wehrüberlaufs
    const spillFlow = 0.5 + 0.5 * Math.sin(timeSeconds * 4.8);
    weirCascade.scale.y = 0.92 + spillFlow * 0.16;
  };

  return { group, update };
}
