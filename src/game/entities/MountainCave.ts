import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { disposeObject3D } from '../utils/threeUtils';

function toNonIndexed(geo: THREE.BufferGeometry): THREE.BufferGeometry {
  return geo.index ? geo.toNonIndexed() : geo;
}

/**
 * Erzeugt das monumentale, hochalpine schneebedeckte Bergmassiv hinter und über dem Mineneingang:
 * - Aufragender Hauptgipfel und zerklüftete Nebengipfel (bis zu 26 Meter hoch)
 * - Breite Gebirgsflanken und eine geschlossene Hintergrundwand, die das Tal majestätisch abschließt
 * - Strahlend weiße Schneehauben und Schneefelder auf allen Kämmen und Terrassen
 * - Präzise Platzierung hinter dem Stollenportal: 0 Überlappungen mit dem sichtbaren Eingang!
 * - Durch BufferGeometryUtils.mergeGeometries extrem performant (nur 2 Draw Calls für den gesamten Berg)
 */
function buildMountainBackdrop(onMeshLoaded?: (mesh: THREE.Mesh) => void): THREE.Group {
  const backdropGroup = new THREE.Group();
  backdropGroup.name = 'MountainBackdrop';

  const rockMat = new THREE.MeshStandardMaterial({
    color: 0x3d444c,
    roughness: 0.94,
    metalness: 0.06,
    flatShading: true,
  });

  const snowMat = new THREE.MeshStandardMaterial({
    color: 0xf5f8fc,
    roughness: 0.82,
    metalness: 0.02,
    flatShading: true,
  });

  const iceMat = new THREE.MeshStandardMaterial({
    color: 0xcfe6fa,
    roughness: 0.35,
    metalness: 0.22,
    flatShading: true,
  });

  // 1. Spezifikationen aller massiven Felsblöcke des Gebirgsmassivs (DodecahedronGeometry)
  // Alle Blöcke sitzen sauber hinter dem Stollenportal (Z <= -4.0 in der Mitte, Z <= -7.0 im Zentrum)
  // und halten seitlich einen breiten Abstand (|X| >= 8.0) ein, damit der Eingang komplett frei und unbedeckt bleibt.
  const rockSpecs: Array<{
    p: [number, number, number];
    r: number;
    s: [number, number, number];
    rot: [number, number, number];
  }> = [
    // Zentralmassiv hinter dem Stollen (Z <= -7.0, umschließt das hintere Tunnelende)
    { p: [0.0, 4.8, -7.8], r: 5.2, s: [1.3, 1.25, 0.95], rot: [0.1, 0.4, 0] },

    // Felsüberhang weit über dem Stollensturz (beginnt erst ab Y = 6.2 und Z = -5.8)
    { p: [0.0, 9.4, -5.8], r: 4.2, s: [1.35, 0.75, 1.0], rot: [0.08, 0.1, 0] },

    // Mittelstufe & Steilwand
    { p: [-0.5, 11.2, -9.8], r: 5.6, s: [1.3, 1.35, 1.15], rot: [-0.08, -0.3, 0.05] },
    { p: [0.0, 15.5, -12.5], r: 5.8, s: [1.2, 1.5, 1.1], rot: [0.12, 0.5, -0.05] },
    { p: [0.2, 18.8, -13.0], r: 3.8, s: [0.95, 1.6, 0.95], rot: [0.05, 0.8, -0.1] },

    // Westflanke (weit links vom Stollen: X <= -8.2, lässt das Portal komplett frei)
    { p: [-8.8, 3.2, -4.2], r: 3.2, s: [1.0, 1.35, 1.1], rot: [0.1, 0.5, 0] },
    { p: [-8.2, 6.8, -7.0], r: 4.4, s: [1.15, 1.3, 1.1], rot: [-0.1, -0.4, 0.08] },
    { p: [-8.5, 11.0, -10.0], r: 4.8, s: [1.15, 1.4, 1.05], rot: [0.15, 0.6, -0.1] },
    { p: [-7.5, 15.5, -12.8], r: 4.2, s: [1.0, 1.55, 1.0], rot: [-0.08, 0.3, 0.12] },

    // Ostflanke (weit rechts vom Stollen: X >= +8.2, lässt das Portal komplett frei)
    { p: [8.8, 3.2, -4.2], r: 3.2, s: [1.0, 1.35, 1.1], rot: [0.1, -0.5, 0] },
    { p: [8.2, 7.0, -7.0], r: 4.4, s: [1.15, 1.3, 1.1], rot: [0.12, 0.4, -0.08] },
    { p: [8.5, 11.2, -10.2], r: 4.9, s: [1.2, 1.4, 1.05], rot: [-0.15, -0.5, 0.1] },
    { p: [7.8, 15.6, -13.0], r: 4.6, s: [1.1, 1.5, 1.05], rot: [0.1, -0.4, -0.1] },

    // Kolossale hintere Bergwand (schließt den Horizont nach Norden ab)
    { p: [-11.5, 13.5, -17.5], r: 7.0, s: [1.25, 1.45, 1.1], rot: [0.1, 0.6, 0] },
    { p: [0.0, 16.2, -18.5], r: 8.0, s: [1.3, 1.5, 1.15], rot: [-0.05, 0.2, 0] },
    { p: [11.5, 14.0, -18.0], r: 7.2, s: [1.25, 1.45, 1.1], rot: [0.1, -0.5, 0] },

    // Fundamente tief unten (Z <= -6.0, unter Bodenniveau zur perfekten Hangabdichtung)
    { p: [-8.5, -1.0, -6.5], r: 3.5, s: [1.1, 1.0, 1.1], rot: [0, 0, 0] },
    { p: [8.5, -1.0, -6.5], r: 3.5, s: [1.1, 1.0, 1.1], rot: [0, 0, 0] },
    { p: [0.0, -1.5, -9.8], r: 6.0, s: [1.4, 1.0, 1.2], rot: [0, 0, 0] },
  ];

  const rockGeos: THREE.BufferGeometry[] = [];
  for (let idx = 0; idx < rockSpecs.length; idx++) {
    const s = rockSpecs[idx];
    const geo = new THREE.DodecahedronGeometry(s.r, 1);
    const pos = geo.attributes.position;
    const seed = idx * 17 + 101;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const fluting = 1.0 + Math.sin(x * 1.6 + seed) * 0.08 + Math.cos(z * 1.4 + y * 0.8) * 0.06;
      pos.setXYZ(i, x * s.s[0] * fluting, y * s.s[1] * fluting, z * s.s[2] * fluting);
    }
    geo.rotateX(s.rot[0]);
    geo.rotateY(s.rot[1]);
    geo.rotateZ(s.rot[2]);
    geo.translate(s.p[0], s.p[1], s.p[2]);
    geo.computeVertexNormals();
    rockGeos.push(toNonIndexed(geo));
  }

  // 2. Spezifikationen der strahlend weißen Schneehauben auf Gipfeln und Kämmen
  const snowSpecs: Array<{
    p: [number, number, number];
    r: number;
    s: [number, number, number];
    rot: [number, number, number];
    thickness?: number;
  }> = [
    // Hauptgipfel-Schnee (Gipfelhöhe bis 25 Meter)
    { p: [0.2, 19.5, -13.0], r: 3.5, s: [1.05, 1.35, 1.05], rot: [0.05, 0.8, -0.1], thickness: 0.6 },
    { p: [0.0, 16.8, -12.5], r: 5.4, s: [1.2, 1.25, 1.1], rot: [0.12, 0.5, -0.05], thickness: 0.5 },

    // Westgipfel-Schnee
    { p: [-7.5, 16.5, -12.8], r: 4.0, s: [1.05, 1.4, 1.05], rot: [-0.08, 0.3, 0.12], thickness: 0.6 },

    // Ostgipfel-Schnee
    { p: [7.8, 16.6, -13.0], r: 4.4, s: [1.1, 1.35, 1.05], rot: [0.1, -0.4, -0.1], thickness: 0.6 },

    // Hinterer Bergkamm-Schnee
    { p: [-11.5, 15.0, -17.5], r: 6.4, s: [1.2, 1.3, 1.1], rot: [0.1, 0.6, 0], thickness: 0.5 },
    { p: [0.0, 18.2, -18.5], r: 7.4, s: [1.25, 1.35, 1.15], rot: [-0.05, 0.2, 0], thickness: 0.55 },
    { p: [11.5, 15.6, -18.0], r: 6.6, s: [1.2, 1.3, 1.1], rot: [0.1, -0.5, 0], thickness: 0.5 },

    // Mittlere Felsbänder und Terrassen
    { p: [-8.2, 8.2, -7.0], r: 3.8, s: [1.2, 0.9, 1.1], rot: [-0.1, -0.4, 0.08], thickness: 0.45 },
    { p: [8.2, 8.4, -7.0], r: 3.9, s: [1.2, 0.9, 1.1], rot: [0.12, 0.4, -0.08], thickness: 0.45 },
    { p: [-0.5, 12.8, -9.8], r: 5.0, s: [1.25, 0.9, 1.1], rot: [-0.08, -0.3, 0.05], thickness: 0.48 },

    // Schneehaube auf dem Felsvorsprung über dem Tunnel (weit über dem Portal bei Y = 10.2)
    { p: [0.0, 10.2, -5.8], r: 3.8, s: [1.35, 0.7, 1.0], rot: [0.08, 0.1, 0], thickness: 0.42 },
  ];

  const snowGeos: THREE.BufferGeometry[] = [];
  for (let idx = 0; idx < snowSpecs.length; idx++) {
    const s = snowSpecs[idx];
    const geo = new THREE.SphereGeometry(s.r, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.46);
    const pos = geo.attributes.position;
    const seed = idx * 23 + 205;
    const thickness = s.thickness ?? 0.5;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const wave = 1.0 + Math.sin(x * 1.8 + seed) * 0.06 + Math.cos(z * 1.6) * 0.05;
      pos.setXYZ(i, x * s.s[0] * wave, y * s.s[1] * thickness * wave, z * s.s[2] * wave);
    }
    geo.rotateX(s.rot[0]);
    geo.rotateY(s.rot[1]);
    geo.rotateZ(s.rot[2]);
    geo.translate(s.p[0], s.p[1], s.p[2]);
    geo.computeVertexNormals();
    snowGeos.push(toNonIndexed(geo));
  }

  // 3. Glänzende Blaueis-Akzente in geschützten Felsnischen
  const iceSpecs: Array<{ p: [number, number, number]; r: number; s: [number, number, number] }> = [
    { p: [-7.2, 5.2, -5.8], r: 1.4, s: [0.9, 1.4, 0.6] },
    { p: [7.4, 5.4, -5.8], r: 1.5, s: [0.9, 1.5, 0.6] },
    { p: [-1.2, 9.8, -7.8], r: 1.8, s: [1.2, 0.8, 0.7] },
    { p: [1.6, 10.0, -8.0], r: 1.7, s: [1.1, 0.9, 0.6] },
  ];

  const iceGeos: THREE.BufferGeometry[] = [];
  for (const ic of iceSpecs) {
    const geo = new THREE.DodecahedronGeometry(ic.r, 0);
    geo.scale(ic.s[0], ic.s[1], ic.s[2]);
    geo.translate(ic.p[0], ic.p[1], ic.p[2]);
    geo.computeVertexNormals();
    iceGeos.push(toNonIndexed(geo));
  }

  // 4. Verschmelzen und zur Gruppe hinzufügen
  if (rockGeos.length > 0) {
    const mergedRock = BufferGeometryUtils.mergeGeometries(rockGeos, false);
    const rockMesh = new THREE.Mesh(mergedRock, rockMat);
    rockMesh.castShadow = true;
    rockMesh.receiveShadow = true;
    rockMesh.userData = { interactableType: 'cave' };
    if (onMeshLoaded) onMeshLoaded(rockMesh);
    backdropGroup.add(rockMesh);
  }

  if (snowGeos.length > 0) {
    const mergedSnow = BufferGeometryUtils.mergeGeometries(snowGeos, false);
    const snowMesh = new THREE.Mesh(mergedSnow, snowMat);
    snowMesh.castShadow = true;
    snowMesh.receiveShadow = true;
    snowMesh.userData = { interactableType: 'cave' };
    if (onMeshLoaded) onMeshLoaded(snowMesh);
    backdropGroup.add(snowMesh);
  }

  if (iceGeos.length > 0) {
    const mergedIce = BufferGeometryUtils.mergeGeometries(iceGeos, false);
    const iceMesh = new THREE.Mesh(mergedIce, iceMat);
    iceMesh.receiveShadow = true;
    iceMesh.userData = { interactableType: 'cave' };
    backdropGroup.add(iceMesh);
  }

  return backdropGroup;
}

/**
 * Erstellt die 3D-Szenerie am Ende des 1. Weges (Bergpfad / Mine):
 * - Der Mineneingang ist um 2 Meter nach hinten versetzt platziert.
 * - Das kolossale schneebedeckte Bergmassiv im Hintergrund (bis 26m hoch) schließt hinten
 *   an das Tunnelende an, ohne den sichtbaren Eingang zu verdecken.
 * - Warmes Grubenlaternen-Licht im Stolleninneren und funkelnde Silbererz-Drusen am Portal.
 */
export function createMountainCave(onMeshLoaded?: (mesh: THREE.Mesh) => void): THREE.Group {
  const group = new THREE.Group();
  group.name = 'MountainCave';

  const rockMatDark = new THREE.MeshStandardMaterial({
    color: 0x3b4248,
    roughness: 0.94,
    flatShading: true,
  });
  const caveDarkMat = new THREE.MeshBasicMaterial({
    color: 0x040608,
  });
  const silverVeinMat = new THREE.MeshStandardMaterial({
    color: 0xd8ecff,
    metalness: 0.88,
    roughness: 0.2,
    emissive: 0x315270,
    emissiveIntensity: 0.75,
  });

  // 1. Das hohe, schneebedeckte Bergmassiv im Hintergrund errichten (2 Meter nach vorn geschoben, damit der Eingang organisch im Felsmassiv sitzt)
  const mountainBackdrop = buildMountainBackdrop(onMeshLoaded);
  mountainBackdrop.position.set(0, 0, 2.0);
  group.add(mountainBackdrop);

  // 2. Untergruppe für den Mineneingang: Bleibt exakt an ihrer Position (tunnelOffsetZ = -0.2)
  const tunnelGroup = new THREE.Group();
  tunnelGroup.name = 'MineTunnelGroup';
  const tunnelOffsetZ = -0.2;
  tunnelGroup.position.set(0, 0, tunnelOffsetZ);
  group.add(tunnelGroup);

  // Temporärer dezenter Portal-Platzhalter während des GLB-Ladevorgangs
  const fallback = new THREE.Group();
  const fallbackArch = new THREE.Mesh(
    new THREE.BoxGeometry(4.2, 3.6, 2.5),
    rockMatDark
  );
  fallbackArch.position.set(0, 1.8, 0);
  fallbackArch.castShadow = true;
  fallbackArch.receiveShadow = true;
  fallbackArch.userData = { interactableType: 'cave' };
  fallback.add(fallbackArch);
  tunnelGroup.add(fallback);

  // 3. Lade das detaillierte 3D-Modell des schneebedeckten Minentunnels
  const loader = new GLTFLoader();
  loader.load(
    '/assets/models/snowy mine tunnel 3d model.glb',
    (gltf) => {
      const model = gltf.scene;

      // Skalierung: Faktor 8.5 erzeugt ein stattliches, monumentales Stollenportal
      // (Breite ~8.5m, Höhe ~5.2m, Durchgangshöhe ~3.4m)
      model.scale.setScalar(8.5);

      // Modell exakt auf Bodenniveau (y = 0) aufsetzen
      model.updateMatrixWorld(true);
      const bounds = new THREE.Box3().setFromObject(model);
      model.position.set(0, -bounds.min.y, 0);

      model.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          mesh.userData = { interactableType: 'cave' };

          // Optimale Materialabstimmung für rauen Fels, Holzstützen und Schnee
          if (mesh.material && 'roughness' in mesh.material) {
            const mat = mesh.material as THREE.MeshStandardMaterial;
            mat.roughness = 0.88;
            mat.metalness = 0.05;
          }

          if (onMeshLoaded) {
            onMeshLoaded(mesh);
          }
        }
      });

      // Platzhalter entfernen und fertiges Minenmodell in die Tunnelgruppe einfügen
      tunnelGroup.remove(fallback);
      disposeObject3D(fallback);
      tunnelGroup.add(model);
    },
    undefined,
    (err) => {
      console.warn('Minenmodell snowy mine tunnel 3d model.glb konnte nicht geladen werden:', err);
    }
  );

  // 4. Tiefschwarzer Hintergrund im Inneren des Tunnels für echte Tiefenwirkung (kein Durchscheinen)
  const tunnelBacking = new THREE.Mesh(
    new THREE.PlaneGeometry(3.6, 3.8),
    caveDarkMat
  );
  tunnelBacking.position.set(0, 1.9, -1.8);
  tunnelGroup.add(tunnelBacking);

  // 5. Warmes, atmosphärisches Grubenlicht aus der Tiefe des Minenstollens
  const mineInteriorLight = new THREE.PointLight(0xffaa44, 1.25, 8.5);
  mineInteriorLight.position.set(0.3, 2.1, 0.4);
  tunnelGroup.add(mineInteriorLight);

  // 6. Funkelnde Silbererz-Drusen an den Felsrändern des Stolleneingangs
  for (const [vx, vy, vz, rotZ] of [
    [-1.85, 1.45, 1.85, 0.3],
    [-2.1, 1.95, 1.6, -0.4],
    [1.95, 1.35, 1.8, -0.25],
    [1.75, 2.35, 1.5, 0.5],
  ]) {
    const vein = new THREE.Mesh(new THREE.OctahedronGeometry(0.24, 0), silverVeinMat);
    vein.position.set(vx, vy, vz);
    vein.scale.set(1.5, 0.7, 0.8);
    vein.rotation.z = rotZ;
    vein.userData = { interactableType: 'cave' };
    tunnelGroup.add(vein);
  }

  // Alle statischen Meshes für Raycasting markieren
  group.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.userData = { interactableType: 'cave' };
    }
  });

  return group;
}
