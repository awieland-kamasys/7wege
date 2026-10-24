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
  // 2. ANTIKER RUNDBRUNNEN DES RIESEN (RESERVOIR & BERGQUELLE)
  // (Ersetzt den alten künstlichen Teich durch ancient circular well 3d model.glb)
  // ============================================================================
  const wellContainer = new THREE.Group();
  wellContainer.name = 'AncientWellContainer';
  group.add(wellContainer);

  const reservoirWaterMat = new THREE.MeshStandardMaterial({
    color: 0x1b6e84,
    emissive: 0x0a2e38,
    emissiveIntensity: 0.42,
    roughness: 0.15,
    metalness: 0.25,
    transparent: true,
    opacity: 0.88,
  });

  // Im Brunneninneren: Glänzende Quellwasseroberfläche (Durchmesser ca. 4.9m, Y = 0.42)
  const wellWater = new THREE.Mesh(
    new THREE.CylinderGeometry(2.45, 2.45, 0.2, 32),
    reservoirWaterMat
  );
  wellWater.position.set(-5.4, 0.42, 0);
  wellWater.receiveShadow = true;
  wellWater.userData = { interactableType: 'weir' };
  group.add(wellWater);

  // Sprudelnde Bergquell-Ringe im Zentrum des Brunnens
  const springRipple = new THREE.Mesh(
    new THREE.RingGeometry(0.45, 0.75, 24),
    new THREE.MeshBasicMaterial({
      color: 0xb5f4ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.55,
    })
  );
  springRipple.rotation.x = -Math.PI / 2;
  springRipple.position.set(-5.4, 0.525, 0);
  group.add(springRipple);

  // Kleiner Quellsprudel in der Mitte des Brunnens
  const springBubblerMat = new THREE.MeshStandardMaterial({
    color: 0xaef0ff,
    emissive: 0x24788c,
    emissiveIntensity: 0.55,
    roughness: 0.2,
    transparent: true,
    opacity: 0.75,
  });
  const springBubbler = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.38, 0.28, 16),
    springBubblerMat
  );
  springBubbler.position.set(-5.4, 0.55, 0);
  group.add(springBubbler);

  // Gemauerter Überlaufkanal vom Brunnen zum Wehr
  // Brunnenrand liegt bei lx ≈ -2.2, Wehrwand bei lx = -0.95
  const streamInflow = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 0.35, 2.2),
    reservoirWaterMat
  );
  streamInflow.position.set(-1.6, 0.22, 0);
  streamInflow.userData = { interactableType: 'weir' };
  group.add(streamInflow);

  // Seitliche gemauerte Wangen / Steine des Überlaufkanals
  const canalWallMat = new THREE.MeshStandardMaterial({
    color: 0x4d5357,
    roughness: 0.86,
    flatShading: true,
  });
  for (const pz of [-1.25, 1.25]) {
    const wall = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 0.55, 0.32),
      canalWallMat
    );
    wall.position.set(-1.6, 0.30, pz);
    wall.castShadow = true;
    wall.receiveShadow = true;
    wall.userData = { interactableType: 'weir' };
    group.add(wall);
  }

  // Lade antiken Rundbrunnen (ancient circular well 3d model.glb)
  loader.load(
    '/assets/models/ancient circular well 3d model.glb',
    (gltf) => {
      const wellModel = gltf.scene;
      // Modellmaße X [-0.5, 0.5], Z [-0.495, 0.495], Y [0, 0.351]
      // Skalierung auf 8.4m Außendurchmesser und 1.54m Mauerhöhe
      wellModel.scale.set(8.4, 4.4, 8.4);
      wellModel.position.set(-5.4, 0.0, 0.0);
      wellModel.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          mesh.userData = { interactableType: 'weir' };
          if (mesh.material && 'roughness' in mesh.material) {
            const stdMat = mesh.material as THREE.MeshStandardMaterial;
            stdMat.roughness = 0.85;
          }
          if (onMeshLoaded) onMeshLoaded(mesh);
        }
      });
      wellContainer.add(wellModel);
    },
    undefined,
    (err) => {
      console.warn('ancient circular well 3d model.glb konnte nicht geladen werden, Fallback aktiv:', err);
      // Fallback-Steinring falls GLB verzögert lädt
      const fallbackWell = new THREE.Mesh(
        new THREE.CylinderGeometry(4.2, 4.3, 1.54, 32, 1, true),
        canalWallMat
      );
      fallbackWell.position.set(-5.4, 0.77, 0.0);
      wellContainer.add(fallbackWell);
    }
  );

  // Ergänzende Moosfelsen zur harmonischen Einbettung in die Berglandschaft
  loader.load(
    '/assets/models/mossy rock boulder 3d model.glb',
    (gltf) => {
      const baseBoulder = gltf.scene;
      const prominentSpots = [
        { x: -9.8, z: 2.8, scale: 2.2, rotY: 0.6 },
        { x: -9.6, z: -2.8, scale: 2.0, rotY: 2.4 },
        { x: -6.8, z: 5.2, scale: 1.8, rotY: 1.2 },
        { x: -6.5, z: -5.0, scale: 1.7, rotY: 3.8 },
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
      console.warn('mossy rock boulder konnte für Brunneneinbettung nicht geladen werden:', err);
    }
  );

  // ============================================================================
  // 3. DER GEBIRGSBACH UNTER DEM WEHR & DER BRÜCKE INS TAL
  // Tiefe Schlucht mit über 1,07m lichter Höhe unter der Brücke für das durchströmende Wasser.
  // Vollständig mit 3D-Modell /assets/models/rocky stream 3d model.glb gebaut.
  // ============================================================================
  const streamContainer = new THREE.Group();
  streamContainer.name = 'RockyStreamTalContainer';
  group.add(streamContainer);

  // 3.1 Wehr-Konstruktion an der Oberstromseite der Brücke:
  // Hölzerne Wehrmauer / Schütz (hält das Seewasser auf +0.08m zurück)
  const weirWall = new THREE.Mesh(
    new THREE.BoxGeometry(0.36, 1.55, 3.2),
    woodPlankMat
  );
  weirWall.position.set(-0.95, -0.68, 0);
  weirWall.castShadow = true;
  weirWall.receiveShadow = true;
  weirWall.userData = { interactableType: 'weir' };
  group.add(weirWall);

  // Seitliche vertikale Führungsbalken des Wehrs
  for (const pz of [-1.35, 1.35]) {
    const weirPost = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.14, 1.85, 8),
      woodPlankMat
    );
    weirPost.position.set(-0.95, -0.60, pz);
    weirPost.castShadow = true;
    weirPost.userData = { interactableType: 'weir' };
    group.add(weirPost);
  }

  // Wehrüberlauf oben an der Überfallkante
  const weirSpillwayMat = new THREE.MeshStandardMaterial({
    color: 0xaef0ff,
    emissive: 0x24788c,
    emissiveIntensity: 0.65,
    roughness: 0.22,
    transparent: true,
    opacity: 0.90,
  });
  const weirSpillway = new THREE.Mesh(
    new THREE.BoxGeometry(0.52, 0.18, 2.2),
    weirSpillwayMat
  );
  weirSpillway.position.set(-0.95, 0.02, 0);
  group.add(weirSpillway);

  // Tosender, 1.4 Meter hoher Wasserfall vom Wehr hinab in das tiefe Bachbett
  const weirCascadeMat = new THREE.MeshStandardMaterial({
    color: 0xe0faff,
    emissive: 0x4aa6bd,
    emissiveIntensity: 0.75,
    roughness: 0.15,
    transparent: true,
    opacity: 0.92,
  });
  const weirCascade = new THREE.Mesh(
    new THREE.BoxGeometry(0.55, 1.44, 2.1),
    weirCascadeMat
  );
  weirCascade.position.set(-0.74, -0.70, 0);
  weirCascade.rotation.z = -0.15;
  group.add(weirCascade);

  // Seitliche Brückenpfeiler am Böschungsrand (die mittlere Rinne bleibt vollkommen offen)
  for (const pz of [-2.05, 2.05]) {
    const bridgePier = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.20, 1.45, 8),
      stoneMat
    );
    bridgePier.position.set(0, -0.95, pz);
    bridgePier.castShadow = true;
    bridgePier.receiveShadow = true;
    group.add(bridgePier);
  }

  // Temporärer Platzhalter während des GLB-Ladens des Baches
  const fallbackBedMat = new THREE.MeshStandardMaterial({ color: 0x242d2a, roughness: 0.9 });
  const fallbackStream = new THREE.Mesh(new THREE.BoxGeometry(32.4, 0.08, 2.8), fallbackBedMat);
  fallbackStream.position.set(15.2, -1.62, 0);
  streamContainer.add(fallbackStream);

  // Lade rocky stream 3d model.glb und bilde den gesamten 32 Meter langen Bachlauf
  // Auf y = -1.62m abgesenkt für garantierte 1,07m lichte Durchflusshöhe unter dem Brückendeck!
  loader.load(
    '/assets/models/rocky stream 3d model.glb',
    (gltf) => {
      streamContainer.remove(fallbackStream);
      disposeObject3D(fallbackStream);

      const baseStream = gltf.scene;

      // 5 nahtlose Segmente von lx = -0.8 bis lx = 31.2
      // Jedes Segment hat 6.4m Länge (scale.x = 6.4), 3.2m Breite (scale.z = 12.8)
      // und ruht bündig auf dem Grund der tiefen Rinnensohle bei y = -1.62m.
      const segmentXPositions = [2.4, 8.8, 15.2, 21.6, 28.0];

      segmentXPositions.forEach((segX, idx) => {
        const segClone = baseStream.clone(true);
        segClone.scale.set(6.4, 2.4, 12.8);
        segClone.position.set(segX, -1.62, 0);

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
    // Sanftes Pulsieren der Bergquelle im Rundbrunnen
    const wave = 0.5 + 0.5 * Math.sin(timeSeconds * 2.6);
    springRipple.scale.setScalar(0.92 + wave * 0.22);
    springBubbler.scale.set(0.95 + wave * 0.1, 0.9 + wave * 0.2, 0.95 + wave * 0.1);

    // Lebendiges Fließen des Wehrüberlaufs
    const spillFlow = 0.5 + 0.5 * Math.sin(timeSeconds * 4.8);
    weirCascade.scale.y = 0.94 + spillFlow * 0.12;
  };

  return { group, update };
}
