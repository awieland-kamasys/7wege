import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { getTerrainHeight } from '../utils/terrainHeight';
import { createBushFoliageTexture, BushFlowerColor } from '../textures/GroundTextures';

export type BushType = 'lush_bush' | 'berry_bush' | 'fern_bush';
export type { BushFlowerColor };

export interface ForestBushInstance {
  x: number;
  z: number;
  scale?: number;
  rotationY?: number;
  type?: BushType;
  flowerColor?: BushFlowerColor;
}

export interface FoliageMaterialSet {
  lush: THREE.MeshStandardMaterial;
  light: THREE.MeshStandardMaterial;
  deep: THREE.MeshStandardMaterial;
}

export class BushMaterialCache {
  private static instance: BushMaterialCache;

  public readonly branchMat: THREE.MeshStandardMaterial;
  public readonly berryMat: THREE.MeshStandardMaterial;
  public readonly foliageSets = new Map<BushFlowerColor, FoliageMaterialSet>();
  public readonly flowerPetalMaterials = new Map<'red' | 'white' | 'yellow' | 'purple', THREE.MeshStandardMaterial>();
  public readonly flowerCenterMat: THREE.MeshStandardMaterial;

  private constructor() {
    // Verholzte Astansätze an der Basis
    this.branchMat = new THREE.MeshStandardMaterial({
      color: 0x3d2b1d,
      roughness: 0.92,
      flatShading: true,
    });

    // Reife rote Waldbeeren
    this.berryMat = new THREE.MeshStandardMaterial({
      color: 0xb82536,
      roughness: 0.35,
      metalness: 0.15,
    });

    // Blütenblätter-Materialien (Rot, Weiß, Gelb, Lila)
    this.flowerPetalMaterials.set(
      'red',
      new THREE.MeshStandardMaterial({
        color: 0xe6243e,
        roughness: 0.42,
        metalness: 0.05,
      })
    );
    this.flowerPetalMaterials.set(
      'white',
      new THREE.MeshStandardMaterial({
        color: 0xf5fbf6,
        roughness: 0.38,
        metalness: 0.05,
      })
    );
    this.flowerPetalMaterials.set(
      'yellow',
      new THREE.MeshStandardMaterial({
        color: 0xffce16,
        roughness: 0.40,
        metalness: 0.05,
      })
    );
    this.flowerPetalMaterials.set(
      'purple',
      new THREE.MeshStandardMaterial({
        color: 0x9e3ee8,
        roughness: 0.42,
        metalness: 0.05,
      })
    );

    // Goldgelber Blütenstempel / Zentrum
    this.flowerCenterMat = new THREE.MeshStandardMaterial({
      color: 0xffb514,
      roughness: 0.35,
      metalness: 0.1,
    });

    // Foliage Material-Sets für jede Blütenfarbe ('none', 'red', 'white', 'yellow', 'purple')
    const colors: BushFlowerColor[] = ['none', 'red', 'white', 'yellow', 'purple'];
    for (const col of colors) {
      const foliageTex = createBushFoliageTexture(col);
      if (foliageTex.map) {
        foliageTex.map.repeat.set(2.4, 2.4);
        foliageTex.map.colorSpace = THREE.SRGBColorSpace;
      }
      if (foliageTex.bumpMap) {
        foliageTex.bumpMap.repeat.set(2.4, 2.4);
      }

      this.foliageSets.set(col, {
        lush: new THREE.MeshStandardMaterial({
          color: 0xc4f59e,
          map: foliageTex.map ?? undefined,
          bumpMap: foliageTex.bumpMap ?? undefined,
          bumpScale: 0.08,
          roughness: 0.58,
          flatShading: true,
        }),
        light: new THREE.MeshStandardMaterial({
          color: 0xe0ffba,
          map: foliageTex.map ?? undefined,
          bumpMap: foliageTex.bumpMap ?? undefined,
          bumpScale: 0.08,
          roughness: 0.52,
          flatShading: true,
        }),
        deep: new THREE.MeshStandardMaterial({
          color: 0x9edb7b,
          map: foliageTex.map ?? undefined,
          bumpMap: foliageTex.bumpMap ?? undefined,
          bumpScale: 0.08,
          roughness: 0.65,
          flatShading: true,
        }),
      });
    }
  }

  public static get(): BushMaterialCache {
    if (!BushMaterialCache.instance) {
      BushMaterialCache.instance = new BushMaterialCache();
    }
    return BushMaterialCache.instance;
  }
}

/**
 * Erzeugt organisch geformte, mehrschichtige Wald- und Uferbüsche als hocheffiziente Merged Geometries.
 * Unterstützt farbige Blüten (Rot, Weiß, Gelb, Lila) mit dedizierten Buschtexturen und 3D-Blütenrosetten.
 */
export function buildMergedForestBushes(instances: ForestBushInstance[]): THREE.Group {
  const group = new THREE.Group();
  group.name = 'ForestBushes';

  if (instances.length === 0) {
    return group;
  }

  const cache = BushMaterialCache.get();

  const branchGeos: THREE.BufferGeometry[] = [];
  const berryGeos: THREE.BufferGeometry[] = [];

  // Laub-Geometrien gruppiert nach Blütenfarbe
  const allColors: BushFlowerColor[] = ['none', 'red', 'white', 'yellow', 'purple'];
  const lushGeosByColor = new Map<BushFlowerColor, THREE.BufferGeometry[]>();
  const lightGeosByColor = new Map<BushFlowerColor, THREE.BufferGeometry[]>();
  const deepGeosByColor = new Map<BushFlowerColor, THREE.BufferGeometry[]>();

  for (const c of allColors) {
    lushGeosByColor.set(c, []);
    lightGeosByColor.set(c, []);
    deepGeosByColor.set(c, []);
  }

  // 3D-Blütengeometrien (Blütenblätter pro Farbe, Stempel zentral)
  const petalGeosByColor = new Map<'red' | 'white' | 'yellow' | 'purple', THREE.BufferGeometry[]>();
  petalGeosByColor.set('red', []);
  petalGeosByColor.set('white', []);
  petalGeosByColor.set('yellow', []);
  petalGeosByColor.set('purple', []);
  const flowerCenterGeos: THREE.BufferGeometry[] = [];

  const toNonIndexed = (geo: THREE.BufferGeometry): THREE.BufferGeometry => {
    return geo.index ? geo.toNonIndexed() : geo;
  };

  instances.forEach((inst, instIdx) => {
    const scale = inst.scale ?? 1.0;
    const rotY = inst.rotationY ?? (instIdx * 1.37) % (Math.PI * 2);
    const type = inst.type ?? (instIdx % 3 === 0 ? 'berry_bush' : instIdx % 3 === 1 ? 'lush_bush' : 'fern_bush');
    const flowerColor = inst.flowerColor ?? 'none';
    const groundY = getTerrainHeight(inst.x, inst.z);

    const cosR = Math.cos(rotY);
    const sinR = Math.sin(rotY);

    const transformPoint = (lx: number, ly: number, lz: number): [number, number, number] => {
      const rx = (lx * cosR - lz * sinR) * scale;
      const rz = (lx * sinR + lz * cosR) * scale;
      const ry = ly * scale;
      return [inst.x + rx, groundY + ry, inst.z + rz];
    };

    // 1. Äste an der Basis (verankern den Busch im Boden)
    const numBranches = 3 + (instIdx % 2);
    for (let b = 0; b < numBranches; b++) {
      const bAngle = (b * Math.PI * 2) / numBranches + instIdx * 0.5;
      const bLen = 0.55 + ((b + instIdx) % 3) * 0.12;
      const bGeo = new THREE.CylinderGeometry(0.025, 0.065, bLen, 5);
      bGeo.translate(0, bLen * 0.45, 0);
      bGeo.rotateZ(0.28);
      bGeo.rotateY(bAngle);
      bGeo.scale(scale, scale, scale);

      const [wx, wy, wz] = transformPoint(0, -0.05, 0);
      bGeo.translate(wx, wy, wz);
      bGeo.computeVertexNormals();
      branchGeos.push(toNonIndexed(bGeo));
    }

    // 2. Laub-Cluster: Mehrere überlappende, facettierte Laubkuppeln
    const clusters: Array<[number, number, number, number, 'deep' | 'lush' | 'light']> = [];

    if (type === 'fern_bush') {
      clusters.push([0.0, 0.45, 0.0, 0.75, 'deep']);
      clusters.push([0.38, 0.42, 0.22, 0.62, 'lush']);
      clusters.push([-0.36, 0.40, -0.20, 0.60, 'lush']);
      clusters.push([-0.25, 0.38, 0.35, 0.58, 'lush']);
      clusters.push([0.28, 0.44, -0.32, 0.56, 'light']);
      clusters.push([0.0, 0.62, 0.0, 0.52, 'light']);
    } else if (type === 'berry_bush') {
      clusters.push([0.0, 0.52, 0.0, 0.82, 'deep']);
      clusters.push([0.34, 0.48, 0.15, 0.65, 'lush']);
      clusters.push([-0.32, 0.46, -0.18, 0.62, 'lush']);
      clusters.push([0.12, 0.50, -0.36, 0.60, 'lush']);
      clusters.push([-0.15, 0.52, 0.32, 0.58, 'light']);
      clusters.push([0.05, 0.74, 0.05, 0.55, 'light']);
    } else {
      clusters.push([0.0, 0.55, 0.0, 0.88, 'deep']);
      clusters.push([0.42, 0.46, 0.18, 0.68, 'lush']);
      clusters.push([-0.38, 0.50, -0.22, 0.66, 'lush']);
      clusters.push([0.16, 0.52, -0.42, 0.64, 'lush']);
      clusters.push([-0.20, 0.48, 0.38, 0.62, 'lush']);
      clusters.push([0.12, 0.78, 0.10, 0.60, 'light']);
      clusters.push([-0.10, 0.82, -0.08, 0.56, 'light']);
    }

    const lushTarget = lushGeosByColor.get(flowerColor)!;
    const lightTarget = lightGeosByColor.get(flowerColor)!;
    const deepTarget = deepGeosByColor.get(flowerColor)!;

    clusters.forEach(([lx, ly, lz, radius, tier], cIdx) => {
      const geo = new THREE.DodecahedronGeometry(radius, 1);
      const pos = geo.attributes.position;
      const seed = instIdx * 37 + cIdx * 19 + 71;

      for (let i = 0; i < pos.count; i++) {
        const px = pos.getX(i);
        const py = pos.getY(i);
        const pz = pos.getZ(i);

        const bump = 1.0 + Math.sin(px * 3.2 + seed) * 0.09 + Math.cos(pz * 2.8 + py * 1.6) * 0.07;
        pos.setXYZ(i, px * bump, py * 0.84 * bump, pz * bump);
      }

      geo.scale(scale, scale, scale);
      const [wx, wy, wz] = transformPoint(lx, ly, lz);
      geo.translate(wx, wy, wz);
      geo.computeVertexNormals();

      const nonIndexed = toNonIndexed(geo);
      if (tier === 'deep') {
        deepTarget.push(nonIndexed);
      } else if (tier === 'light') {
        lightTarget.push(nonIndexed);
      } else {
        lushTarget.push(nonIndexed);
      }
    });

    // 3. Beeren (beim berry_bush, wenn keine Blüten definiert sind)
    if (type === 'berry_bush' && flowerColor === 'none') {
      const berryPositions: Array<[number, number, number]> = [
        [0.48, 0.42, 0.22],
        [0.44, 0.56, 0.32],
        [-0.42, 0.44, -0.24],
        [-0.38, 0.58, -0.32],
        [0.18, 0.54, -0.46],
        [-0.22, 0.56, 0.42],
        [0.28, 0.72, 0.20],
        [-0.18, 0.76, 0.18],
        [0.08, 0.82, -0.16],
      ];

      for (const [bx, by, bz] of berryPositions) {
        const bGeo = new THREE.SphereGeometry(0.052, 5, 4);
        bGeo.scale(scale, scale, scale);
        const [wx, wy, wz] = transformPoint(bx, by, bz);
        bGeo.translate(wx, wy, wz);
        bGeo.computeVertexNormals();
        berryGeos.push(toNonIndexed(bGeo));
      }
    }

    // 4. Plastische 3D-Blütenrosetten auf den blühenden Büschen
    if (flowerColor !== 'none') {
      const petalTarget = petalGeosByColor.get(flowerColor)!;

      // Positionen an den sonnigen Außenseiten der Laubkuppel
      const flowerPositions: Array<[number, number, number, number]> = [
        [0.46, 0.48, 0.24, 0.065],
        [0.42, 0.62, 0.18, 0.060],
        [-0.44, 0.46, -0.22, 0.062],
        [-0.36, 0.64, -0.26, 0.058],
        [0.18, 0.58, -0.44, 0.064],
        [-0.24, 0.54, 0.40, 0.062],
        [0.26, 0.76, 0.22, 0.068],
        [-0.16, 0.80, 0.18, 0.065],
        [0.08, 0.86, -0.12, 0.070],
        [-0.28, 0.72, -0.16, 0.060],
        [0.34, 0.66, -0.28, 0.062],
        [-0.12, 0.60, 0.46, 0.058],
        [0.12, 0.44, 0.42, 0.060],
      ];

      flowerPositions.forEach(([fx, fy, fz, fRad], fIdx) => {
        const flowerAngle = instIdx * 1.5 + fIdx * 0.9;
        const [fwx, fwy, fwz] = transformPoint(fx, fy, fz);

        // 5 Blütenblätter als Rosette
        const numPetals = 5;
        for (let p = 0; p < numPetals; p++) {
          const pAngle = flowerAngle + (p * Math.PI * 2) / numPetals;
          const pGeo = new THREE.SphereGeometry(fRad * 0.48, 5, 4);
          pGeo.scale(1.15 * scale, 0.45 * scale, 1.15 * scale);
          
          const ox = Math.cos(pAngle) * fRad * 0.52 * scale;
          const oz = Math.sin(pAngle) * fRad * 0.52 * scale;
          pGeo.translate(fwx + ox, fwy + (fIdx % 2 === 0 ? 0.015 : -0.01) * scale, fwz + oz);
          pGeo.computeVertexNormals();
          petalTarget.push(toNonIndexed(pGeo));
        }

        // Blütenstempel (Mitte)
        const centerGeo = new THREE.SphereGeometry(fRad * 0.32, 5, 4);
        centerGeo.scale(scale, 0.6 * scale, scale);
        centerGeo.translate(fwx, fwy + 0.02 * scale, fwz);
        centerGeo.computeVertexNormals();
        flowerCenterGeos.push(toNonIndexed(centerGeo));
      });
    }
  });

  // 5. Geometrien zusammenführen für minimale Draw Calls
  if (branchGeos.length > 0) {
    const merged = BufferGeometryUtils.mergeGeometries(branchGeos, false);
    const mesh = new THREE.Mesh(merged, cache.branchMat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
  }

  // Laubkronen pro Farbe
  for (const c of allColors) {
    const set = cache.foliageSets.get(c)!;
    const lush = lushGeosByColor.get(c)!;
    const light = lightGeosByColor.get(c)!;
    const deep = deepGeosByColor.get(c)!;

    if (deep.length > 0) {
      const merged = BufferGeometryUtils.mergeGeometries(deep, false);
      const mesh = new THREE.Mesh(merged, set.deep);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
    }

    if (lush.length > 0) {
      const merged = BufferGeometryUtils.mergeGeometries(lush, false);
      const mesh = new THREE.Mesh(merged, set.lush);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
    }

    if (light.length > 0) {
      const merged = BufferGeometryUtils.mergeGeometries(light, false);
      const mesh = new THREE.Mesh(merged, set.light);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
    }
  }

  if (berryGeos.length > 0) {
    const merged = BufferGeometryUtils.mergeGeometries(berryGeos, false);
    const mesh = new THREE.Mesh(merged, cache.berryMat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
  }

  // 3D-Blütenblätter pro Farbe
  const flowerColorKeys: Array<'red' | 'white' | 'yellow' | 'purple'> = ['red', 'white', 'yellow', 'purple'];
  for (const fk of flowerColorKeys) {
    const pGeos = petalGeosByColor.get(fk)!;
    if (pGeos.length > 0) {
      const merged = BufferGeometryUtils.mergeGeometries(pGeos, false);
      const mesh = new THREE.Mesh(merged, cache.flowerPetalMaterials.get(fk)!);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
    }
  }

  // Blütenmitten
  if (flowerCenterGeos.length > 0) {
    const merged = BufferGeometryUtils.mergeGeometries(flowerCenterGeos, false);
    const mesh = new THREE.Mesh(merged, cache.flowerCenterMat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
  }

  return group;
}
