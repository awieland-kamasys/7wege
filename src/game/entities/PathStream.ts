import * as THREE from 'three';
import { PATH_3_STREAM_POS } from '../data/paths';

export interface PathStreamEntity {
  group: THREE.Group;
  pickableMeshes: THREE.Object3D[];
  update: (dtSeconds: number, isHovered?: boolean) => void;
  startDissolve: (onComplete?: () => void) => void;
  isDissolving: () => boolean;
  isRemoved: () => boolean;
}

/**
 * Erstellt den reißenden Gebirgsbachlauf, der Weg 3 (Quellenweg zum Riesen) versperrt.
 * Fließt quer über den Pfad mit Gischt, Flusskieseln an den Rändern, sanftem Wasserglanz
 * und saphirblau schimmernden Kristallpartikeln.
 */
export function createPathStream(): PathStreamEntity {
  const group = new THREE.Group();
  group.name = 'Path3Stream';
  group.position.set(PATH_3_STREAM_POS.x, 0, PATH_3_STREAM_POS.z);
  group.rotation.y = PATH_3_STREAM_POS.rotationY;

  const pickableMeshes: THREE.Object3D[] = [];

  // Wasserbett / Flussrinne (dunkles nasses Kiesbett)
  const bedMaterial = new THREE.MeshLambertMaterial({
    color: 0x242d2a,
    flatShading: true,
  });

  const bedMesh = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 0.05, 1.4),
    bedMaterial
  );
  bedMesh.position.set(0, 0.045, 0);
  bedMesh.receiveShadow = true;
  group.add(bedMesh);

  // Strömende Wasseroberfläche (transparentes, glänzendes Gebirgswasser, deutlich über dem Weg)
  const waterMaterial = new THREE.MeshStandardMaterial({
    color: 0x1f5e7a,
    emissive: 0x0c334d,
    emissiveIntensity: 0.35,
    roughness: 0.12,
    metalness: 0.25,
    transparent: true,
    opacity: 0.85,
    flatShading: true,
  });

  const waterMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(3.1, 1.25, 6, 4),
    waterMaterial
  );
  waterMesh.rotation.x = -Math.PI / 2;
  waterMesh.position.set(0, 0.088, 0);
  waterMesh.receiveShadow = true;
  group.add(waterMesh);

  // Gischt- / Schaumstreifen an den Uferrändern und in der Mitte
  const foamMaterial = new THREE.MeshStandardMaterial({
    color: 0xdff5ff,
    emissive: 0x6ab0d6,
    emissiveIntensity: 0.45,
    roughness: 0.4,
    transparent: true,
    opacity: 0.75,
    flatShading: true,
  });

  const foamMeshes: THREE.Mesh[] = [];
  const foamConfigs = [
    { x: -0.8, z: -0.4, w: 1.1, d: 0.18 },
    { x: 0.4, z: -0.25, w: 1.3, d: 0.16 },
    { x: -0.2, z: 0.1, w: 1.5, d: 0.22 },
    { x: 0.7, z: 0.38, w: 1.0, d: 0.15 },
    { x: -0.9, z: 0.42, w: 0.9, d: 0.14 },
  ];

  for (const c of foamConfigs) {
    const foam = new THREE.Mesh(
      new THREE.BoxGeometry(c.w, 0.02, c.d),
      foamMaterial
    );
    foam.position.set(c.x, 0.098, c.z);
    group.add(foam);
    foamMeshes.push(foam);
  }

  // Flusskiesel und Uferfelsen links und rechts
  const rockMaterial = new THREE.MeshStandardMaterial({
    color: 0x474c4a,
    roughness: 0.88,
    metalness: 0.08,
    flatShading: true,
  });

  const rockCoords = [
    { x: -1.45, z: -0.5, r: 0.26, sy: 0.18 },
    { x: -1.35, z: 0.48, r: 0.22, sy: 0.16 },
    { x: 1.42, z: -0.45, r: 0.28, sy: 0.2 },
    { x: 1.38, z: 0.52, r: 0.24, sy: 0.17 },
    { x: 0.1, z: -0.62, r: 0.18, sy: 0.12 },
    { x: -0.6, z: 0.65, r: 0.2, sy: 0.14 },
  ];

  for (const r of rockCoords) {
    const rock = new THREE.Mesh(
      new THREE.DodecahedronGeometry(r.r, 0),
      rockMaterial
    );
    rock.position.set(r.x, 0.1 + r.sy * 0.5, r.z);
    rock.scale.set(1.0, r.sy / r.r, 1.1);
    rock.castShadow = true;
    rock.receiveShadow = true;
    group.add(rock);
  }

  // Blaues Wasserlicht (Saphir-Resonanz)
  const streamLight = new THREE.PointLight(0x2d8cd4, 1.2, 3.8);
  streamLight.position.set(0, 0.45, 0);
  group.add(streamLight);

  // Zustandsvariablen für Animation und Beseitigung
  let elapsed = 0;
  let dissolving = false;
  let dissolveTimer = 0;
  const dissolveDuration = 1.35;
  let onCompleteCallback: (() => void) | undefined;
  let removed = false;

  return {
    group,
    pickableMeshes,
    update: (dtSeconds: number, isHovered = false) => {
      if (removed) {
        return;
      }

      elapsed += dtSeconds;

      if (dissolving) {
        dissolveTimer += dtSeconds;
        const progress = Math.min(1, dissolveTimer / dissolveDuration);

        // Wasserspiegel sinkt ab und trocknet aus
        const scaleY = Math.max(0.01, 1 - progress);
        waterMesh.scale.y = scaleY;
        waterMesh.position.y = 0.05 - progress * 0.04;
        waterMaterial.opacity = Math.max(0, 0.82 * (1 - progress));
        foamMaterial.opacity = Math.max(0, 0.72 * (1 - progress));
        streamLight.intensity = Math.max(0, (1 - progress) * 2.2);

        // Bei Abschluss ausblenden
        if (progress >= 1) {
          group.visible = false;
          removed = true;
          if (onCompleteCallback) {
            onCompleteCallback();
          }
        }
        return;
      }

      // Sanfte Wasser- und Schaumanimation
      const wave = Math.sin(elapsed * 4.2) * 0.012;
      waterMesh.position.y = 0.05 + wave;

      // Schaumstreifen schwingen in Querrichtung (Strömung)
      foamMeshes.forEach((foam, idx) => {
        foam.position.x += Math.sin(elapsed * 3.5 + idx * 1.2) * 0.0018;
      });

      // Hover-Pulsieren
      const hoverBoost = isHovered ? 0.35 : 0;
      const pulse = 0.5 + 0.5 * Math.sin(elapsed * 2.8);
      waterMaterial.emissiveIntensity = 0.35 + pulse * 0.2 + hoverBoost;
      streamLight.intensity = 1.2 + pulse * 0.4 + hoverBoost * 0.6;
    },
    startDissolve: (onComplete?: () => void) => {
      if (dissolving || removed) {
        return;
      }
      dissolving = true;
      dissolveTimer = 0;
      onCompleteCallback = onComplete;
    },
    isDissolving: () => dissolving,
    isRemoved: () => removed,
  };
}
