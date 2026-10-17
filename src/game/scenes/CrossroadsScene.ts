import * as THREE from 'three';
import {
  CAVE_ENTRANCE_POS,
  GREY_MAN_NPC_POS,
  PATH_1_END_CLEARING,
  PATH_1_WAYPOINTS,
  SEVEN_PATHS,
} from '../data/paths';
import { createGreyManNpc, GreyManNpcEntity } from '../entities/GreyManNpc';
import { createGuideNpc, GuideNpcEntity } from '../entities/GuideNpc';
import { createLogCabin } from '../entities/LogCabin';
import { createMountainCave } from '../entities/MountainCave';
import { createSignpost, SignpostEntity } from '../entities/Signpost';
import { createTreasureChest, TreasureChestEntity } from '../entities/TreasureChest';
import { Vector2D } from '../systems/CrossroadsState';

export type ScenePickResult =
  | { kind: 'npc'; point: Vector2D }
  | { kind: 'grey_man'; point: Vector2D }
  | { kind: 'cave'; point: Vector2D }
  | { kind: 'chest'; point: Vector2D }
  | { kind: 'sign'; pathId: number; point: Vector2D }
  | { kind: 'path'; pathId: number; point: Vector2D }
  | { kind: 'hut'; point: Vector2D }
  | { kind: 'signpost'; point: Vector2D }
  | { kind: 'ground'; point: Vector2D };

/**
 * Three.js-Szene der Waldkreuzung mit 7 Wegen, verlängerter Kurve auf Weg 1,
 * Bergmassiv mit Höhleneingang, Graumännchen, Schutzhütte, Schatztruhe, Wegweiser und Waldhüter.
 */
export class CrossroadsScene {
  public readonly scene: THREE.Scene;
  public readonly camera: THREE.PerspectiveCamera;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly canvas: HTMLCanvasElement;
  private readonly playerGroup: THREE.Group;
  private readonly targetMarker: THREE.Mesh;
  private readonly signpost: SignpostEntity;
  private readonly guideNpc: GuideNpcEntity;
  private readonly greyManNpc: GreyManNpcEntity;
  private readonly treasureChest: TreasureChestEntity;
  private readonly pathMeshes = new Map<number, THREE.MeshStandardMaterial>();
  private readonly pathGemstones = new Map<
    number,
    {
      mesh: THREE.Mesh;
      material: THREE.MeshStandardMaterial;
      light: THREE.PointLight;
      baseColor: number;
    }
  >();
  private readonly pickableObjects: THREE.Object3D[] = [];
  private readonly raycaster = new THREE.Raycaster();
  private readonly pointerNdc = new THREE.Vector2();

  private cameraOrbitAngle = 0;
  private cameraPitch = 0.56;
  private cameraDistance = 11.0;
  private hoveredPathId: number | null = null;
  private isNpcHovered = false;
  private isGreyManHovered = false;
  private isChestHovered = false;
  private lastPlayerPos: Vector2D = { x: 0, z: 5.2 };
  private elapsedSeconds = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    // Echter hellgrau-weißer Waldnebel: im Nahbereich klar, ab ~9.5m einsetzend, ab 22m komplett im weißen Nebel verborgen
    const fogColor = 0xdce2e0;
    this.scene.background = new THREE.Color(fogColor);
    this.scene.fog = new THREE.Fog(fogColor, 9.5, 22.0);

    this.camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      95
    );

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.setupLights();
    this.buildTerrainAndPaths();

    // Schutzhütte direkt in die Mitte der Kreuzung stellen (offene Vorderseite nach +Z)
    const cabin = createLogCabin();
    cabin.position.set(0, 0, 0);
    cabin.rotation.y = 0;
    cabin.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.userData = { interactableType: 'hut' };
        this.pickableObjects.push(child);
      }
    });
    this.scene.add(cabin);

    // Schatztruhe vor der Schutzhütte platzieren
    this.treasureChest = createTreasureChest();
    this.treasureChest.group.position.set(0.85, 0, 2.0);
    this.treasureChest.group.rotation.y = -0.15;
    this.treasureChest.group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        this.pickableObjects.push(child);
      }
    });
    this.scene.add(this.treasureChest.group);

    // Wegweiser rechts vor der Schutzhütte platzieren
    this.signpost = createSignpost();
    this.signpost.group.position.set(2.3, 0, 2.4);
    this.signpost.group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        this.pickableObjects.push(child);
      }
    });
    this.scene.add(this.signpost.group);

    // Hinweisgeber-NPC (Waldhüter Arvid) direkt links vor der Schutzhütte platzieren
    this.guideNpc = createGuideNpc();
    this.guideNpc.group.position.set(-1.85, 0, 2.05);
    this.guideNpc.group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        this.pickableObjects.push(child);
      }
    });
    this.scene.add(this.guideNpc.group);

    // Bergmassiv mit Höhleneingang am Ende des 1. Weges
    const mountainCave = createMountainCave();
    mountainCave.position.set(CAVE_ENTRANCE_POS.x, 0, CAVE_ENTRANCE_POS.z);
    mountainCave.rotation.y = CAVE_ENTRANCE_POS.rotationY;
    mountainCave.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        this.pickableObjects.push(child);
      }
    });
    this.scene.add(mountainCave);

    // Das Graumännchen (NPC) direkt vor dem Höhleneingang am Ende des 1. Weges
    this.greyManNpc = createGreyManNpc();
    this.greyManNpc.group.position.set(GREY_MAN_NPC_POS.x, 0, GREY_MAN_NPC_POS.z);
    this.greyManNpc.group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        this.pickableObjects.push(child);
      }
    });
    this.scene.add(this.greyManNpc.group);

    // Bäume rund um die Lichtung, zwischen den 7 Wegen und entlang der Kurve von Weg 1
    this.buildForestRing();
    this.buildCurvedPath1Trees();

    // Zielmarkierung für Maus-Bewegung (Click-to-Move)
    this.targetMarker = this.createTargetMarker();
    this.scene.add(this.targetMarker);

    // Spielfigur (Wandernde Person)
    this.playerGroup = this.createPlayerMarker();
    this.scene.add(this.playerGroup);

    window.addEventListener('resize', this.onResize);
  }

  private setupLights(): void {
    const ambient = new THREE.AmbientLight(0xe4ebe8, 0.78);
    this.scene.add(ambient);

    const sunLight = new THREE.DirectionalLight(0xfff1d6, 1.15);
    sunLight.position.set(16, 36, 14);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 2;
    sunLight.shadow.camera.far = 110;
    const d = 55;
    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;
    this.scene.add(sunLight);
  }

  private buildTerrainAndPaths(): void {
    // Weitläufiger Waldboden (umfasst auch den langen 1. Weg bis zum Berg)
    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(110, 48),
      new THREE.MeshStandardMaterial({ color: 0x243827, roughness: 0.96 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Zentrale Waldkreuzung (begehbare Lichtung)
    const clearing = new THREE.Mesh(
      new THREE.CylinderGeometry(6.8, 7.0, 0.06, 36),
      new THREE.MeshStandardMaterial({ color: 0x6b5842, roughness: 0.92 })
    );
    clearing.position.y = 0.03;
    clearing.receiveShadow = true;
    clearing.userData = { interactableType: 'ground' };
    this.scene.add(clearing);
    this.pickableObjects.push(clearing);

    const pathLength = 52;
    SEVEN_PATHS.forEach((pathData) => {
      const mat = new THREE.MeshStandardMaterial({
        color: 0x7b654b,
        roughness: 0.9,
        emissive: 0x000000,
      });
      this.pathMeshes.set(pathData.id, mat);

      if (pathData.id === 1) {
        // Weg 1: Verlängerter Weg mit Rechtskurve entlang PATH_1_WAYPOINTS bis zum Berg
        this.buildCurvedPath1Meshes(mat, pathData.colorHex);
        return;
      }

      const pivot = new THREE.Group();
      pivot.rotation.y = -pathData.angleRad;

      const pathMesh = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.05, pathLength), mat);
      pathMesh.position.set(0, 0.03, -(pathLength / 2 + 4.5));
      pathMesh.receiveShadow = true;
      pathMesh.userData = { interactableType: 'path', pathId: pathData.id };
      pivot.add(pathMesh);
      this.pickableObjects.push(pathMesh);

      const gemGroup = this.createPathGemstone(pathData.id, pathData.colorHex);
      gemGroup.position.set(1.45, 0, -6.8);
      pivot.add(gemGroup);

      this.scene.add(pivot);
    });
  }

  private createPathGemstone(pathId: number, colorHex: number): THREE.Group {
    const group = new THREE.Group();

    // Kleiner steinerner Sockel unter dem Edelstein
    const pedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.36, 0.26, 8),
      new THREE.MeshStandardMaterial({
        color: 0x4d5459,
        roughness: 0.9,
        flatShading: true,
      })
    );
    pedestal.position.y = 0.13;
    pedestal.castShadow = true;
    pedestal.receiveShadow = true;
    pedestal.userData = { interactableType: 'sign', pathId };
    group.add(pedestal);
    this.pickableObjects.push(pedestal);

    // Facettierter Edelstein-Kristall
    const gemMat = new THREE.MeshStandardMaterial({
      color: colorHex,
      roughness: 0.2,
      metalness: 0.35,
      emissive: 0x000000,
      emissiveIntensity: 0,
      flatShading: true,
    });

    const gemMesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.28, 0), gemMat);
    gemMesh.scale.set(1.0, 1.45, 1.0);
    gemMesh.position.y = 0.62;
    gemMesh.castShadow = true;
    gemMesh.userData = { interactableType: 'sign', pathId };
    group.add(gemMesh);
    this.pickableObjects.push(gemMesh);

    // Punktlicht für das Leuchten des aktiven Storyweg-Edelsteins
    const gemLight = new THREE.PointLight(colorHex, 0, 4.5);
    gemLight.position.set(0, 0.72, 0);
    group.add(gemLight);

    this.pathGemstones.set(pathId, {
      mesh: gemMesh,
      material: gemMat,
      light: gemLight,
      baseColor: colorHex,
    });

    return group;
  }

  private buildCurvedPath1Meshes(
    mat: THREE.MeshStandardMaterial,
    markerColorHex: number
  ): void {
    const pathWidth = 2.2;

    for (let i = 0; i < PATH_1_WAYPOINTS.length - 1; i++) {
      const a = PATH_1_WAYPOINTS[i];
      const b = PATH_1_WAYPOINTS[i + 1];
      const dx = b.x - a.x;
      const dz = b.z - a.z;
      const segLength = Math.hypot(dx, dz) + 0.35;
      const midX = (a.x + b.x) / 2;
      const midZ = (a.z + b.z) / 2;
      const angleY = Math.atan2(dx, dz);

      const segMesh = new THREE.Mesh(
        new THREE.BoxGeometry(pathWidth, 0.05, segLength),
        mat
      );
      segMesh.position.set(midX, 0.03, midZ);
      segMesh.rotation.y = angleY;
      segMesh.receiveShadow = true;
      segMesh.userData = { interactableType: 'path', pathId: 1 };
      this.scene.add(segMesh);
      this.pickableObjects.push(segMesh);

      // Runde Gelenkplatte an jedem Kurven-Wegpunkt für nahtlose Übergänge
      const jointMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(pathWidth / 2, pathWidth / 2, 0.05, 16),
        mat
      );
      jointMesh.position.set(b.x, 0.03, b.z);
      jointMesh.receiveShadow = true;
      jointMesh.userData = { interactableType: 'path', pathId: 1 };
      this.scene.add(jointMesh);
      this.pickableObjects.push(jointMesh);
    }

    // Felsiger Vorplatz vor dem Höhleneingang am Ende von Weg 1
    const endClearing = new THREE.Mesh(
      new THREE.CylinderGeometry(
        PATH_1_END_CLEARING.radius,
        PATH_1_END_CLEARING.radius + 0.2,
        0.06,
        28
      ),
      mat
    );
    endClearing.position.set(PATH_1_END_CLEARING.x, 0.03, PATH_1_END_CLEARING.z);
    endClearing.receiveShadow = true;
    endClearing.userData = { interactableType: 'path', pathId: 1 };
    this.scene.add(endClearing);
    this.pickableObjects.push(endClearing);

    // Edelstein auf Sockel am Eingang von Weg 1 (aktiver Storyweg)
    const gemGroup = this.createPathGemstone(1, markerColorHex);
    gemGroup.position.set(1.45, 0, -6.8);
    this.scene.add(gemGroup);
  }

  private createTreeMesh(
    scale: number,
    useDarkCrown: boolean,
    trunkMat: THREE.Material,
    crownMatDark: THREE.Material,
    crownMatLight: THREE.Material
  ): THREE.Group {
    const tree = new THREE.Group();
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22 * scale, 0.32 * scale, 1.8 * scale, 8),
      trunkMat
    );
    trunk.position.y = 0.9 * scale;
    trunk.castShadow = true;
    tree.add(trunk);

    const crownMat = useDarkCrown ? crownMatDark : crownMatLight;

    const crown1 = new THREE.Mesh(
      new THREE.ConeGeometry(1.35 * scale, 2.6 * scale, 9),
      crownMat
    );
    crown1.position.y = 2.6 * scale;
    crown1.castShadow = true;
    tree.add(crown1);

    const crown2 = new THREE.Mesh(
      new THREE.ConeGeometry(1.0 * scale, 2.2 * scale, 9),
      crownMat
    );
    crown2.position.y = 4.0 * scale;
    crown2.castShadow = true;
    tree.add(crown2);

    return tree;
  }

  private isNearPath1Corridor(x: number, z: number, minDistance = 3.2): boolean {
    if (
      Math.hypot(x - PATH_1_END_CLEARING.x, z - PATH_1_END_CLEARING.z) <
      PATH_1_END_CLEARING.radius + 2.8
    ) {
      return true;
    }
    for (let i = 0; i < PATH_1_WAYPOINTS.length - 1; i++) {
      const a = PATH_1_WAYPOINTS[i];
      const b = PATH_1_WAYPOINTS[i + 1];
      const abx = b.x - a.x;
      const abz = b.z - a.z;
      const t = Math.max(
        0,
        Math.min(1, ((x - a.x) * abx + (z - a.z) * abz) / (abx * abx + abz * abz))
      );
      const cx = a.x + t * abx;
      const cz = a.z + t * abz;
      if (Math.hypot(x - cx, z - cz) < minDistance) {
        return true;
      }
    }
    return false;
  }

  private buildForestRing(): void {
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4f3622, roughness: 0.9 });
    const crownMatDark = new THREE.MeshStandardMaterial({ color: 0x24472b, roughness: 0.85 });
    const crownMatLight = new THREE.MeshStandardMaterial({ color: 0x335c36, roughness: 0.85 });

    for (let i = 0; i < SEVEN_PATHS.length; i++) {
      const baseAngle = SEVEN_PATHS[i].angleRad + Math.PI / 7;

      for (let r = 9.2; r <= 44; r += 3.8) {
        for (const offset of [-0.16, 0, 0.16]) {
          const angle = baseAngle + offset + Math.sin(r * (i + 1)) * 0.05;
          const x = Math.sin(angle) * r;
          const z = -Math.cos(angle) * r;

          // Keine Bäume auf den kurvigen Korridor von Weg 1 setzen
          if (this.isNearPath1Corridor(x, z, 3.0)) {
            continue;
          }

          const scale = 0.85 + ((i * 7 + Math.round(r)) % 5) * 0.14;
          const tree = this.createTreeMesh(
            scale,
            (i + Math.round(r)) % 2 === 0,
            trunkMat,
            crownMatDark,
            crownMatLight
          );
          tree.position.set(x, 0, z);
          this.scene.add(tree);
        }
      }
    }
  }

  /**
   * Platziert Bäume beidseitig entlang der Kurve von Weg 1 bis zum Bergmassiv.
   */
  private buildCurvedPath1Trees(): void {
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4f3622, roughness: 0.9 });
    const crownMatDark = new THREE.MeshStandardMaterial({ color: 0x24472b, roughness: 0.85 });
    const crownMatLight = new THREE.MeshStandardMaterial({ color: 0x335c36, roughness: 0.85 });

    for (let i = 1; i < PATH_1_WAYPOINTS.length - 1; i++) {
      const prev = PATH_1_WAYPOINTS[i - 1];
      const curr = PATH_1_WAYPOINTS[i];
      const next = PATH_1_WAYPOINTS[i + 1];

      const dirX = next.x - prev.x;
      const dirZ = next.z - prev.z;
      const len = Math.hypot(dirX, dirZ) || 1;
      const perpX = -dirZ / len;
      const perpZ = dirX / len;

      for (const side of [-1, 1]) {
        for (const dist of [3.4, 6.2]) {
          const tx = curr.x + perpX * side * dist;
          const tz = curr.z + perpZ * side * dist;
          if (this.isNearPath1Corridor(tx, tz, 2.7)) {
            continue;
          }
          const scale = 0.95 + ((i + Math.round(dist)) % 3) * 0.15;
          const tree = this.createTreeMesh(
            scale,
            (i + side) % 2 === 0,
            trunkMat,
            crownMatDark,
            crownMatLight
          );
          tree.position.set(tx, 0, tz);
          this.scene.add(tree);
        }
      }
    }

    // Dichte Baumgruppen links und rechts neben dem Felsen mit dem Höhleneingang
    const cos = Math.cos(CAVE_ENTRANCE_POS.rotationY);
    const sin = Math.sin(CAVE_ENTRANCE_POS.rotationY);
    const caveSideTrees: readonly [number, number, number, boolean][] = [
      // Linke Seite neben Felsflanke und Vorplatz (lokale Koordinaten lx, lz, scale, dark)
      [-6.4, 0.8, 1.25, true],
      [-7.6, -1.5, 1.38, false],
      [-5.8, 3.2, 1.12, false],
      [-8.5, 2.1, 1.3, true],
      [-7.2, 5.2, 1.18, true],
      [-9.8, -0.4, 1.42, false],
      [-10.4, 3.6, 1.22, true],
      [-6.0, -4.2, 1.35, true],
      // Rechte Seite neben Felsflanke und Vorplatz
      [6.6, 0.7, 1.28, false],
      [7.8, -1.6, 1.4, true],
      [5.9, 3.3, 1.15, true],
      [8.6, 2.2, 1.32, false],
      [7.3, 5.3, 1.2, false],
      [10.0, -0.5, 1.45, true],
      [10.5, 3.7, 1.25, false],
      [6.2, -4.3, 1.36, false],
    ];

    for (const [lx, lz, scale, useDark] of caveSideTrees) {
      const wx = CAVE_ENTRANCE_POS.x + lx * cos + lz * sin;
      const wz = CAVE_ENTRANCE_POS.z - lx * sin + lz * cos;
      const tree = this.createTreeMesh(scale, useDark, trunkMat, crownMatDark, crownMatLight);
      tree.position.set(wx, 0, wz);
      this.scene.add(tree);
    }
  }

  private createTargetMarker(): THREE.Mesh {
    const geometry = new THREE.RingGeometry(0.28, 0.42, 24);
    geometry.rotateX(-Math.PI / 2);
    const material = new THREE.MeshBasicMaterial({
      color: 0xe2b86b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const ring = new THREE.Mesh(geometry, material);
    ring.position.y = 0.08;
    ring.visible = false;
    return ring;
  }

  private createPlayerMarker(): THREE.Group {
    const group = new THREE.Group();

    const body = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.28, 0.65, 8, 12),
      new THREE.MeshStandardMaterial({ color: 0xe2b86b, roughness: 0.45 })
    );
    body.position.y = 0.65;
    body.castShadow = true;
    group.add(body);

    const cloak = new THREE.Mesh(
      new THREE.ConeGeometry(0.4, 0.85, 12),
      new THREE.MeshStandardMaterial({ color: 0x3b6e4c, roughness: 0.7 })
    );
    cloak.position.y = 0.55;
    cloak.castShadow = true;
    group.add(cloak);

    return group;
  }

  public getCameraOrbitAngle(): number {
    return this.cameraOrbitAngle;
  }

  public rotateCamera(deltaYaw: number, deltaPitch = 0): void {
    this.cameraOrbitAngle += deltaYaw;
    this.cameraPitch = Math.max(0.25, Math.min(1.15, this.cameraPitch + deltaPitch));
  }

  public zoomCamera(deltaZoom: number): void {
    this.cameraDistance = Math.max(5.5, Math.min(14.5, this.cameraDistance + deltaZoom));
  }

  public setHoveredPathId(pathId: number | null): void {
    this.hoveredPathId = pathId;
  }

  public setNpcHovered(hovered: boolean): void {
    this.isNpcHovered = hovered;
  }

  public setGreyManHovered(hovered: boolean): void {
    this.isGreyManHovered = hovered;
  }

  public setChestHovered(hovered: boolean): void {
    this.isChestHovered = hovered;
  }

  /**
   * Ermittelt per Raycasting, auf welches 3D-Objekt oder welchen Punkt am Boden die Maus zeigt.
   */
  public raycastFromMouse(clientX: number, clientY: number): ScenePickResult | null {
    const rect = this.canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      return null;
    }

    this.pointerNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    this.pointerNdc.y = -((clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.pointerNdc, this.camera);
    const hits = this.raycaster.intersectObjects(this.pickableObjects, false);

    if (hits.length === 0) {
      return null;
    }

    for (const hit of hits) {
      const data = hit.object.userData;
      const point: Vector2D = { x: hit.point.x, z: hit.point.z };

      if (data.interactableType === 'grey_man') {
        return { kind: 'grey_man', point };
      }
      if (data.interactableType === 'cave') {
        return { kind: 'cave', point };
      }
      if (data.interactableType === 'npc') {
        return { kind: 'npc', point };
      }
      if (data.interactableType === 'chest') {
        return { kind: 'chest', point };
      }
      if (data.interactableType === 'sign' && typeof data.pathId === 'number') {
        return { kind: 'sign', pathId: data.pathId, point };
      }
      if (data.interactableType === 'hut') {
        return { kind: 'hut', point };
      }
      if (data.interactableType === 'signpost') {
        return { kind: 'signpost', point };
      }
      if (data.interactableType === 'path' && typeof data.pathId === 'number') {
        return { kind: 'path', pathId: data.pathId, point };
      }
    }

    const firstHit = hits[0];
    return {
      kind: 'ground',
      point: { x: firstHit.point.x, z: firstHit.point.z },
    };
  }

  public update(
    playerPos: Readonly<Vector2D>,
    selectedPathId: number | null,
    targetPos: Readonly<Vector2D> | null = null,
    dtSeconds = 0.016,
    isDialogueActive = false,
    isChestOpen = false
  ): void {
    this.elapsedSeconds += dtSeconds;

    // Blickrichtung der Spielfigur sanft in Bewegungsrichtung drehen
    const moveDx = playerPos.x - this.lastPlayerPos.x;
    const moveDz = playerPos.z - this.lastPlayerPos.z;
    if (Math.hypot(moveDx, moveDz) > 0.002) {
      const targetRotation = Math.atan2(moveDx, moveDz);
      this.playerGroup.rotation.y = targetRotation;
    }
    this.lastPlayerPos = { x: playerPos.x, z: playerPos.z };
    this.playerGroup.position.set(playerPos.x, 0, playerPos.z);

    // Beide NPCs (Waldhüter Arvid & Graumännchen) und Schatztruhe animieren
    this.guideNpc.update(
      this.elapsedSeconds,
      playerPos,
      this.isNpcHovered || isDialogueActive
    );
    this.greyManNpc.update(
      this.elapsedSeconds,
      playerPos,
      this.isGreyManHovered || isDialogueActive
    );
    this.treasureChest.update(dtSeconds, isChestOpen, this.isChestHovered);

    // Ziel-Markierung am Boden anzeigen, solange Click-to-Move aktiv ist
    if (targetPos) {
      this.targetMarker.visible = true;
      this.targetMarker.position.set(targetPos.x, 0.08, targetPos.z);
    } else {
      this.targetMarker.visible = false;
    }

    // Wegweiser und ausgewählten/gehoverten Pfad optisch hervorheben
    this.signpost.highlightSign(selectedPathId, this.hoveredPathId);
    this.pathMeshes.forEach((mat, id) => {
      if (id === selectedPathId) {
        mat.emissive.setHex(0x2c220c);
      } else if (id === this.hoveredPathId) {
        mat.emissive.setHex(0x1b1507);
      } else {
        mat.emissive.setHex(0x000000);
      }
    });

    // Edelstein am jeweils aktiven Storyweg (aktuell Weg 1) leuchten und sanft pulsieren lassen
    const activeStoryPathId = 1;
    const pulse = 0.5 + 0.5 * Math.sin(this.elapsedSeconds * 3.2);
    this.pathGemstones.forEach((gem, id) => {
      if (id === activeStoryPathId) {
        gem.material.emissive.setHex(gem.baseColor);
        gem.material.emissiveIntensity = 1.05 + pulse * 0.65;
        gem.light.intensity = 1.35 + pulse * 0.75;
        gem.mesh.position.y = 0.65 + Math.sin(this.elapsedSeconds * 2.4) * 0.05;
        gem.mesh.rotation.y = this.elapsedSeconds * 1.1;
      } else if (id === this.hoveredPathId || id === selectedPathId) {
        gem.material.emissive.setHex(gem.baseColor);
        gem.material.emissiveIntensity = 0.35;
        gem.light.intensity = 0.3;
        gem.mesh.position.y = 0.62;
      } else {
        gem.material.emissive.setHex(0x000000);
        gem.material.emissiveIntensity = 0;
        gem.light.intensity = 0;
        gem.mesh.position.y = 0.62;
      }
    });

    // Sanfte Verfolgerkamera mit Maus-Orbit, Neigung (Pitch) und Zoom (Distanz)
    const horizontalDist = Math.cos(this.cameraPitch) * this.cameraDistance;
    const camHeight = Math.sin(this.cameraPitch) * this.cameraDistance;
    const targetCamX = playerPos.x + Math.sin(this.cameraOrbitAngle) * horizontalDist;
    const targetCamZ = playerPos.z + Math.cos(this.cameraOrbitAngle) * horizontalDist;

    this.camera.position.lerp(new THREE.Vector3(targetCamX, camHeight, targetCamZ), 0.14);
    this.camera.lookAt(playerPos.x, 1.0, playerPos.z);

    this.renderer.render(this.scene, this.camera);
  }

  private onResize = (): void => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  public dispose(): void {
    window.removeEventListener('resize', this.onResize);
    this.renderer.dispose();
  }
}
