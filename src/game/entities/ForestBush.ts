import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { getTerrainHeight } from '../utils/terrainHeight';
import { createBushFoliageTexture } from '../textures/GroundTextures';

export type BushType = 'lush_bush' | 'berry_bush' | 'fern_bush';

export interface ForestBushInstance {
  x: number;
  z: number;
  scale?: number;
  rotationY?: number;
  type?: BushType;
}

export class BushMaterialCache {
  private static instance: BushMaterialCache;

  public readonly branchMat: THREE.MeshStandardMaterial;
  public readonly lushFoliageMat: THREE.MeshStandardMaterial;
  public readonly lightFoliageMat: THREE.MeshStandardMaterial;
  public readonly deepFoliageMat: THREE.MeshStandardMaterial;
  public readonly berryMat: THREE.MeshStandardMaterial;

  private constructor() {
    const foliageTex = createBushFoliageTexture();
    if (foliageTex.map) {
      foliageTex.map.repeat.set(2.4, 2.4);
      foliageTex.map.colorSpace = THREE.SRGBColorSpace;
    }
    if (foliageTex.bumpMap) {
      foliageTex.bumpMap.repeat.set(2.4, 2.4);
    }

    // Verholzte Astansätze an der Basis
    this.branchMat = new THREE.MeshStandardMaterial({
      color: 0x3d2b1d,
      roughness: 0.92,
      flatShading: true,
    });

    // Hauptlaub mit plastischer Blatt-Textur
    this.lushFoliageMat = new THREE.MeshStandardMaterial({
      color: 0x98cf92, // Harmonische Tönung für satte, natürliche Blattfarben
      map: foliageTex.map ?? undefined,
      bumpMap: foliageTex.bumpMap ?? undefined,
      bumpScale: 0.08,
      roughness: 0.68,
      flatShading: true,
    });

    // Helles Oberlaub / Sonnenlichter mit frischem Lindgrün
    this.lightFoliageMat = new THREE.MeshStandardMaterial({
      color: 0xc8f0be, // Strahlendes Lindlaub
      map: foliageTex.map ?? undefined,
      bumpMap: foliageTex.bumpMap ?? undefined,
      bumpScale: 0.08,
      roughness: 0.64,
      flatShading: true,
    });

    // Tiefenlaub / schattiger Innenkern
    this.deepFoliageMat = new THREE.MeshStandardMaterial({
      color: 0x62965c, // Schattiges Waldgrün
      map: foliageTex.map ?? undefined,
      bumpMap: foliageTex.bumpMap ?? undefined,
      bumpScale: 0.08,
      roughness: 0.76,
      flatShading: true,
    });

    // Reife rote Waldbeeren
    this.berryMat = new THREE.MeshStandardMaterial({
      color: 0xb82536,
      roughness: 0.35,
      metalness: 0.15,
    });
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
 */
export function buildMergedForestBushes(instances: ForestBushInstance[]): THREE.Group {
  const group = new THREE.Group();
  group.name = 'ForestBushes';

  if (instances.length === 0) {
    return group;
  }

  const cache = BushMaterialCache.get();

  const branchGeos: THREE.BufferGeometry[] = [];
  const lushGeos: THREE.BufferGeometry[] = [];
  const lightGeos: THREE.BufferGeometry[] = [];
  const deepGeos: THREE.BufferGeometry[] = [];
  const berryGeos: THREE.BufferGeometry[] = [];

  const toNonIndexed = (geo: THREE.BufferGeometry): THREE.BufferGeometry => {
    return geo.index ? geo.toNonIndexed() : geo;
  };

  instances.forEach((inst, instIdx) => {
    const scale = inst.scale ?? 1.0;
    const rotY = inst.rotationY ?? (instIdx * 1.37) % (Math.PI * 2);
    const type = inst.type ?? (instIdx % 3 === 0 ? 'berry_bush' : instIdx % 3 === 1 ? 'lush_bush' : 'fern_bush');
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
    // Spezifikationen der Laubkugeln relativ zum Buschzentrum [lx, ly, lz, radius, tier ('deep'|'lush'|'light')]
    const clusters: Array<[number, number, number, number, 'deep' | 'lush' | 'light']> = [];

    if (type === 'fern_bush') {
      // Breiter, flacherer Busch mit ausladenden Kuppeln
      clusters.push([0.0, 0.45, 0.0, 0.75, 'deep']);
      clusters.push([0.38, 0.42, 0.22, 0.62, 'lush']);
      clusters.push([-0.36, 0.40, -0.20, 0.60, 'lush']);
      clusters.push([-0.25, 0.38, 0.35, 0.58, 'lush']);
      clusters.push([0.28, 0.44, -0.32, 0.56, 'light']);
      clusters.push([0.0, 0.62, 0.0, 0.52, 'light']);
    } else if (type === 'berry_bush') {
      // Runder, dichter Busch mit Fruchtdolden
      clusters.push([0.0, 0.52, 0.0, 0.82, 'deep']);
      clusters.push([0.34, 0.48, 0.15, 0.65, 'lush']);
      clusters.push([-0.32, 0.46, -0.18, 0.62, 'lush']);
      clusters.push([0.12, 0.50, -0.36, 0.60, 'lush']);
      clusters.push([-0.15, 0.52, 0.32, 0.58, 'light']);
      clusters.push([0.05, 0.74, 0.05, 0.55, 'light']);
    } else {
      // Üppiger, hoher Waldlaubbusch (lush_bush)
      clusters.push([0.0, 0.55, 0.0, 0.88, 'deep']);
      clusters.push([0.42, 0.46, 0.18, 0.68, 'lush']);
      clusters.push([-0.38, 0.50, -0.22, 0.66, 'lush']);
      clusters.push([0.16, 0.52, -0.42, 0.64, 'lush']);
      clusters.push([-0.20, 0.48, 0.38, 0.62, 'lush']);
      clusters.push([0.12, 0.78, 0.10, 0.60, 'light']);
      clusters.push([-0.10, 0.82, -0.08, 0.56, 'light']);
    }

    clusters.forEach(([lx, ly, lz, radius, tier], cIdx) => {
      const geo = new THREE.DodecahedronGeometry(radius, 1);
      const pos = geo.attributes.position;
      const seed = instIdx * 37 + cIdx * 19 + 71;

      // Prozedurale Stauchung und Laubblätter-Ausbeulung
      for (let i = 0; i < pos.count; i++) {
        const px = pos.getX(i);
        const py = pos.getY(i);
        const pz = pos.getZ(i);

        // Sanftes Abflachen nach unten und organische Wölbung
        const bump = 1.0 + Math.sin(px * 3.2 + seed) * 0.09 + Math.cos(pz * 2.8 + py * 1.6) * 0.07;
        pos.setXYZ(i, px * bump, py * 0.84 * bump, pz * bump);
      }

      geo.scale(scale, scale, scale);
      const [wx, wy, wz] = transformPoint(lx, ly, lz);
      geo.translate(wx, wy, wz);
      geo.computeVertexNormals();

      const nonIndexed = toNonIndexed(geo);
      if (tier === 'deep') {
        deepGeos.push(nonIndexed);
      } else if (tier === 'light') {
        lightGeos.push(nonIndexed);
      } else {
        lushGeos.push(nonIndexed);
      }
    });

    // 3. Beeren an den Außenrändern des Beerenbuschs
    if (type === 'berry_bush') {
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
  });

  // 4. Geometrien zusammenführen für minimale Draw Calls
  if (branchGeos.length > 0) {
    const merged = BufferGeometryUtils.mergeGeometries(branchGeos, false);
    const mesh = new THREE.Mesh(merged, cache.branchMat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
  }

  if (deepGeos.length > 0) {
    const merged = BufferGeometryUtils.mergeGeometries(deepGeos, false);
    const mesh = new THREE.Mesh(merged, cache.deepFoliageMat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
  }

  if (lushGeos.length > 0) {
    const merged = BufferGeometryUtils.mergeGeometries(lushGeos, false);
    const mesh = new THREE.Mesh(merged, cache.lushFoliageMat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
  }

  if (lightGeos.length > 0) {
    const merged = BufferGeometryUtils.mergeGeometries(lightGeos, false);
    const mesh = new THREE.Mesh(merged, cache.lightFoliageMat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
  }

  if (berryGeos.length > 0) {
    const merged = BufferGeometryUtils.mergeGeometries(berryGeos, false);
    const mesh = new THREE.Mesh(merged, cache.berryMat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
  }

  return group;
}
