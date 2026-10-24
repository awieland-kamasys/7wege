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
  // ============================================================================
  const bridgeContainer = new THREE.Group();
  bridgeContainer.name = 'BridgeContainer';

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
  // 2. BERGQUELLE, WEITER GEBIRGSSEE & HEIMAT DES RIESEN (Oberstrom: lx = -1.5 bis -18.5)
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

  // ============================================================================
  // 3. DER GEBIRGSBACH UNTER DEM WEHR & DER BRÜCKE INS TAL (lx = -0.85 bis +31.5)
  // ============================================================================
  const dryBedMat = new THREE.MeshStandardMaterial({
    color: 0x484236,
    roughness: 0.95,
  });
  const streamWaterMat = new THREE.MeshStandardMaterial({
    color: 0x228099,
    emissive: 0x0c3742,
    emissiveIntensity: 0.45,
    roughness: 0.18,
    transparent: true,
    opacity: 0.86,
  });

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

  // Steiniges Bachbett in der tiefen Rinne (reicht nahtlos von unter dem Wehr & der Brücke bis ins Tal)
  const streamBed = new THREE.Mesh(new THREE.BoxGeometry(32.4, 0.08, 2.10), dryBedMat);
  streamBed.position.set(15.3, -0.28, 0);
  streamBed.receiveShadow = true;
  group.add(streamBed);

  // Klarer Gebirgsbach in der tiefen Rinne (fließt nahtlos aus dem Wehr unter der Brücke hindurch durch das Tal)
  const streamWater = new THREE.Mesh(new THREE.BoxGeometry(32.4, 0.06, 1.35), streamWaterMat);
  streamWater.position.set(15.3, -0.18, 0);
  streamWater.userData = { interactableType: 'weir' };
  group.add(streamWater);

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
