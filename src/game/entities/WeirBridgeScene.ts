import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { disposeObject3D } from '../utils/threeUtils';

export interface WeirBridgeEntity {
  group: THREE.Group;
  update: (timeSeconds: number) => void;
  loadModel?: () => void;
}

/**
 * Erstellt die 3D-Szenerie auf dem 3. Weg (Quellenweg):
 * - Begehbare Holzbrücke (3D-Modell `/assets/models/wooden bridge 3d model.glb`) entlang der lokalen Z-Achse (Wegverlauf)
 * - Geschlossenes Wehr (Schütz mit Stellrad und Zahnstangen) an der Oberstromseite (-X) der Brücke
 * - Kleiner Stausee (-X) mit Bergquelle und der Ufer-Heimat des Riesen
 * - Bachlauf, der unter der Brücke hindurch (+X) als schmales Rinnsal Richtung dürres Tal fließt
 */
export function createWeirBridgeScene(
  onMeshLoaded?: (mesh: THREE.Mesh) => void,
  options?: { lazy?: boolean }
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

  group.add(bridgeContainer);

  // ============================================================================
  // 2. ANTIKER RUNDBRUNNEN DES RIESEN (RESERVOIR & BERGQUELLE)
  // (Ersetzt den alten künstlichen Teich durch ancient circular well 3d model.glb)
  // ============================================================================
  const wellContainer = new THREE.Group();
  wellContainer.name = 'AncientWellContainer';
  group.add(wellContainer);

  // Fallback-Steinring während des Modell-Ladens (in der Höhe verdoppelt auf 3.08m)
  const fallbackWell = new THREE.Mesh(
    new THREE.CylinderGeometry(4.2, 4.3, 3.08, 32, 1, true),
    stoneMat
  );
  fallbackWell.position.set(-5.4, 1.54, 0.0);
  wellContainer.add(fallbackWell);

  const reservoirWaterMat = new THREE.MeshStandardMaterial({
    color: 0x1b6e84,
    emissive: 0x0a2e38,
    emissiveIntensity: 0.42,
    roughness: 0.15,
    metalness: 0.25,
    transparent: true,
    opacity: 0.88,
  });

  // Im Brunneninneren: Glänzende Quellwasseroberfläche (Durchmesser ca. 4.9m, an verdoppelte Brunnenhöhe angepasst auf Y = 1.80)
  const wellWater = new THREE.Mesh(
    new THREE.CylinderGeometry(2.45, 2.45, 0.2, 32),
    reservoirWaterMat
  );
  wellWater.position.set(-5.4, 1.80, 0);
  wellWater.receiveShadow = true;
  wellWater.userData = { interactableType: 'weir' };
  group.add(wellWater);

  // ============================================================================
  // 3. DER GEBIRGSBACH UNTER DEM WEHR & DER BRÜCKE INS TAL
  // Tiefe Schlucht mit über 1,07m lichter Höhe unter der Brücke für das durchströmende Wasser.
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
  weirCascade.position.set(-0.74, -0.78, 0);
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

  // Temporärer Platzhalter während des GLB-Ladens des Baches (Höhe verdoppelt auf 0.16m)
  const fallbackBedMat = new THREE.MeshStandardMaterial({ color: 0x242d2a, roughness: 0.9 });
  const fallbackStream = new THREE.Mesh(new THREE.BoxGeometry(32.4, 0.16, 2.8), fallbackBedMat);
  fallbackStream.position.set(15.2, -1.62, 0);
  streamContainer.add(fallbackStream);

  let isLoadedOrLoading = false;
  const startLoad = (): void => {
    if (isLoadedOrLoading) return;
    isLoadedOrLoading = true;

    const loader = new GLTFLoader();

    // 1. Detailreiches 3D-Modell der Holzbrücke laden
    loader.load(
      '/assets/models/wooden bridge 3d model.glb',
      (gltf) => {
        const model = gltf.scene;
        model.rotation.y = Math.PI / 2;
        model.scale.set(9.9, 9.6, 8.7);
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

        bridgeContainer.remove(fallbackBridge);
        disposeObject3D(fallbackBridge);
        bridgeContainer.add(model);
      },
      undefined,
      (err) => {
        console.warn('wooden bridge 3d model.glb konnte nicht geladen werden, nutze Fallback-Deck:', err);
      }
    );

    // 2. Lade antiken Rundbrunnen (ancient circular well 3d model.glb) - Höhe verdoppelt (scale.y: 8.8)
    loader.load(
      '/assets/models/ancient circular well 3d model.glb',
      (gltf) => {
        const wellModel = gltf.scene;
        wellModel.scale.set(8.4, 8.8, 8.4);
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
        wellContainer.remove(fallbackWell);
        disposeObject3D(fallbackWell);
        wellContainer.add(wellModel);
      },
      undefined,
      (err) => {
        console.warn('ancient circular well 3d model.glb konnte nicht geladen werden, Fallback aktiv:', err);
      }
    );

    // 3. Ergänzende Moosfelsen zur harmonischen Einbettung in die Berglandschaft
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

    // 4. Lade rocky stream 3d model.glb und bilde den gesamten 32 Meter langen Bachlauf
    loader.load(
      '/assets/models/rocky stream 3d model.glb',
      (gltf) => {
        streamContainer.remove(fallbackStream);
        disposeObject3D(fallbackStream);

        const baseStream = gltf.scene;
        const segmentXPositions = [2.4, 8.8, 15.2, 21.6, 28.0];

        segmentXPositions.forEach((segX, idx) => {
          const segClone = baseStream.clone(true);
          // Höhe des Flusslaufs verdoppelt (scale.y: 4.8) für markantere Felsen und tief eingeschnittenes Flussbett
          segClone.scale.set(6.4, 4.8, 12.8);
          segClone.position.set(segX, -1.62, 0);

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
  };

  if (!options?.lazy) {
    startLoad();
  }

  const update = (timeSeconds: number) => {
    // Lebendiges Fließen des Wehrüberlaufs
    const spillFlow = 0.5 + 0.5 * Math.sin(timeSeconds * 4.8);
    weirCascade.scale.y = 0.94 + spillFlow * 0.12;
  };

  return { group, update, loadModel: startLoad };
}
