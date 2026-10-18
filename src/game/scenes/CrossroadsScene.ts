import * as THREE from 'three';
import {
  CAVE_ENTRANCE_POS,
  GIANT_NPC_POS,
  GREY_MAN_NPC_POS,
  LUMBER_CAMP_POS,
  NIXIE_NPC_POS,
  PATH_1_END_CLEARING,
  PATH_1_WAYPOINTS,
  PATH_2_END_CLEARING,
  PATH_2_WAYPOINTS,
  PATH_3_END_CLEARING,
  PATH_3_WAYPOINTS,
  PATH_4_END_CLEARING,
  PATH_4_WAYPOINTS,
  PathPoint2D,
  POND_CENTER_POS,
  SEVEN_PATHS,
  WEIR_BRIDGE_POS,
  WOOD_WOMAN_NPC_POS,
} from '../data/paths';
import { createGiantNpc, GiantNpcEntity } from '../entities/GiantNpc';
import { createGreyManNpc, GreyManNpcEntity } from '../entities/GreyManNpc';
import { createGuideNpc, GuideNpcEntity } from '../entities/GuideNpc';
import { createLogCabin } from '../entities/LogCabin';
import { createLumberjackCamp, LumberjackCampEntity } from '../entities/LumberjackCamp';
import { createMountainCave } from '../entities/MountainCave';
import { createNixieNpc, NixieNpcEntity } from '../entities/NixieNpc';
import { createNixiePond, NixiePondEntity } from '../entities/NixiePond';
import { createSignpost, SignpostEntity } from '../entities/Signpost';
import { createTreasureChest, TreasureChestEntity } from '../entities/TreasureChest';
import { createWeirBridgeScene, WeirBridgeEntity } from '../entities/WeirBridgeScene';
import { createWoodWomanNpc, WoodWomanNpcEntity } from '../entities/WoodWomanNpc';
import { Vector2D } from '../systems/CrossroadsState';

export type ScenePickResult =
  | { kind: 'npc'; point: Vector2D }
  | { kind: 'grey_man'; point: Vector2D }
  | { kind: 'nixie'; point: Vector2D }
  | { kind: 'giant'; point: Vector2D }
  | { kind: 'wood_woman'; point: Vector2D }
  | { kind: 'cave'; point: Vector2D }
  | { kind: 'pond'; point: Vector2D }
  | { kind: 'weir'; point: Vector2D }
  | { kind: 'lumber_camp'; point: Vector2D }
  | { kind: 'chest'; point: Vector2D }
  | { kind: 'sign'; pathId: number; point: Vector2D }
  | { kind: 'path'; pathId: number; point: Vector2D }
  | { kind: 'hut'; point: Vector2D }
  | { kind: 'signpost'; point: Vector2D }
  | { kind: 'ground'; point: Vector2D };

/**
 * Three.js-Szene der Waldkreuzung mit 7 Wegen,
 * - Weg 1: Bergmassiv mit Höhleneingang & Graumännchen
 * - Weg 2: Waldteich mit Stein, Nixe & verfluchtem Schatz
 * - Weg 3: Brücke über Bach mit geschlossenem Wehr, kleinem Stausee & Riese
 * - Weg 4: Holzfällerlager auf einer Waldlichtung & Holzweibchen
 * - Zentrale Lichtung: Schutzhütte, Schatztruhe, Wegweiser und Waldhüter Arvid
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
  private readonly nixiePond: NixiePondEntity;
  private readonly nixieNpc: NixieNpcEntity;
  private readonly weirBridge: WeirBridgeEntity;
  private readonly giantNpc: GiantNpcEntity;
  private readonly lumberCamp: LumberjackCampEntity;
  private readonly woodWomanNpc: WoodWomanNpcEntity;
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
  private isNixieHovered = false;
  private isGiantHovered = false;
  private isWoodWomanHovered = false;
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

    // Waldteich mit Nixenstein und verfluchtem Schatz am Ende des 2. Weges
    this.nixiePond = createNixiePond();
    this.nixiePond.group.position.set(POND_CENTER_POS.x, 0, POND_CENTER_POS.z);
    this.nixiePond.group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && child.userData?.interactableType) {
        this.pickableObjects.push(child);
      }
    });
    this.scene.add(this.nixiePond.group);

    // Die Nixe (NPC) auf dem Stein im Teich am Ende des 2. Weges
    this.nixieNpc = createNixieNpc();
    this.nixieNpc.group.position.set(NIXIE_NPC_POS.x, 0, NIXIE_NPC_POS.z);
    this.nixieNpc.group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        this.pickableObjects.push(child);
      }
    });
    this.scene.add(this.nixieNpc.group);

    // Brücke mit geschlossenem Wehr, kleinem Stausee und Bachlauf auf dem 3. Weg
    this.weirBridge = createWeirBridgeScene();
    this.weirBridge.group.position.set(WEIR_BRIDGE_POS.x, 0, WEIR_BRIDGE_POS.z);
    this.weirBridge.group.rotation.y = WEIR_BRIDGE_POS.rotationY;
    this.weirBridge.group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && child.userData?.interactableType) {
        this.pickableObjects.push(child);
      }
    });
    this.scene.add(this.weirBridge.group);

    // Der Riese (NPC) am Ufer hinter der Wehrbrücke am Ende des 3. Weges
    this.giantNpc = createGiantNpc();
    this.giantNpc.group.position.set(GIANT_NPC_POS.x, 0, GIANT_NPC_POS.z);
    this.giantNpc.group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        this.pickableObjects.push(child);
      }
    });
    this.scene.add(this.giantNpc.group);

    // Holzfällerlager auf der Waldlichtung am Ende des 4. Weges
    this.lumberCamp = createLumberjackCamp();
    this.lumberCamp.group.position.set(LUMBER_CAMP_POS.x, 0, LUMBER_CAMP_POS.z);
    this.lumberCamp.group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && child.userData?.interactableType) {
        this.pickableObjects.push(child);
      }
    });
    this.scene.add(this.lumberCamp.group);

    // Das Holzweibchen (NPC) im Holzfällerlager am Ende des 4. Weges
    this.woodWomanNpc = createWoodWomanNpc();
    this.woodWomanNpc.group.position.set(WOOD_WOMAN_NPC_POS.x, 0, WOOD_WOMAN_NPC_POS.z);
    this.woodWomanNpc.group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        this.pickableObjects.push(child);
      }
    });
    this.scene.add(this.woodWomanNpc.group);

    // Bäume rund um die Lichtung, zwischen den 7 Wegen und entlang der Kurven von Weg 1 bis 4
    this.buildForestRing();
    this.buildCurvedPath1Trees();
    this.buildCurvedPath2Trees();
    this.buildCurvedPath3Trees();
    this.buildCurvedPath4Trees();

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
    // Weitläufiger Waldboden (umfasst auch die langen Wege 1 bis 4)
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
        this.buildCurvedPathMeshes(
          1,
          PATH_1_WAYPOINTS,
          PATH_1_END_CLEARING,
          pathData.angleRad,
          mat,
          pathData.colorHex
        );
        return;
      }

      if (pathData.id === 2) {
        // Weg 2: Geschwungener Pfad entlang PATH_2_WAYPOINTS bis zum Waldteich mit der Nixe
        this.buildCurvedPathMeshes(
          2,
          PATH_2_WAYPOINTS,
          PATH_2_END_CLEARING,
          pathData.angleRad,
          mat,
          pathData.colorHex
        );
        return;
      }

      if (pathData.id === 3) {
        // Weg 3: Pfad entlang PATH_3_WAYPOINTS über die Wehrbrücke bis zum Riesen
        this.buildCurvedPathMeshes(
          3,
          PATH_3_WAYPOINTS,
          { x: PATH_3_END_CLEARING.x, z: PATH_3_END_CLEARING.z, radius: 3.1 },
          pathData.angleRad,
          mat,
          pathData.colorHex
        );
        return;
      }

      if (pathData.id === 4) {
        // Weg 4: Pfad entlang PATH_4_WAYPOINTS bis zum Holzfällerlager auf der Waldlichtung
        this.buildCurvedPathMeshes(
          4,
          PATH_4_WAYPOINTS,
          PATH_4_END_CLEARING,
          pathData.angleRad,
          mat,
          pathData.colorHex
        );
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

  private buildCurvedPathMeshes(
    pathId: number,
    waypoints: readonly PathPoint2D[],
    clearing: { x: number; z: number; radius: number },
    entranceAngleRad: number,
    mat: THREE.MeshStandardMaterial,
    markerColorHex: number
  ): void {
    const pathWidth = 2.2;

    for (let i = 0; i < waypoints.length - 1; i++) {
      // Auf Weg 3 führt das letzte Segment direkt über die Holzbrücke (WeirBridgeScene),
      // daher dort keinen Erdstreifen quer durch das Bachbett legen.
      if (pathId === 3 && i === waypoints.length - 2) {
        continue;
      }

      const a = waypoints[i];
      const b = waypoints[i + 1];
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
      segMesh.userData = { interactableType: 'path', pathId };
      this.scene.add(segMesh);
      this.pickableObjects.push(segMesh);

      // Runde Gelenkplatte an jedem Kurven-Wegpunkt für nahtlose Übergänge
      const jointMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(pathWidth / 2, pathWidth / 2, 0.05, 16),
        mat
      );
      jointMesh.position.set(b.x, 0.03, b.z);
      jointMesh.receiveShadow = true;
      jointMesh.userData = { interactableType: 'path', pathId };
      this.scene.add(jointMesh);
      this.pickableObjects.push(jointMesh);
    }

    // Vorplatz am Ende des Kurvenweges (vor dem Stollen, am Teichufer bzw. hinter der Wehrbrücke)
    const endClearing = new THREE.Mesh(
      new THREE.CylinderGeometry(
        clearing.radius,
        clearing.radius + 0.2,
        0.06,
        28
      ),
      mat
    );
    endClearing.position.set(clearing.x, 0.03, clearing.z);
    endClearing.receiveShadow = true;
    endClearing.userData = { interactableType: 'path', pathId };
    this.scene.add(endClearing);
    this.pickableObjects.push(endClearing);

    // Edelstein auf Sockel rechts am Wegeingang an der Kreuzung
    const entrancePivot = new THREE.Group();
    entrancePivot.rotation.y = -entranceAngleRad;
    const gemGroup = this.createPathGemstone(pathId, markerColorHex);
    gemGroup.position.set(1.45, 0, -6.8);
    entrancePivot.add(gemGroup);
    this.scene.add(entrancePivot);
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

  private isNearCurvedCorridor(
    x: number,
    z: number,
    waypoints: readonly PathPoint2D[],
    endClearing: { x: number; z: number; radius: number },
    minDistance = 3.2
  ): boolean {
    if (Math.hypot(x - endClearing.x, z - endClearing.z) < endClearing.radius + 2.8) {
      return true;
    }
    for (let i = 0; i < waypoints.length - 1; i++) {
      const a = waypoints[i];
      const b = waypoints[i + 1];
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

  private isNearPath1Corridor(x: number, z: number, minDistance = 3.2): boolean {
    return this.isNearCurvedCorridor(x, z, PATH_1_WAYPOINTS, PATH_1_END_CLEARING, minDistance);
  }

  private isNearPath2Corridor(x: number, z: number, minDistance = 3.2): boolean {
    if (Math.hypot(x - POND_CENTER_POS.x, z - POND_CENTER_POS.z) < POND_CENTER_POS.radius + 2.5) {
      return true;
    }
    return this.isNearCurvedCorridor(x, z, PATH_2_WAYPOINTS, PATH_2_END_CLEARING, minDistance);
  }

  private isNearPath3Corridor(x: number, z: number, minDistance = 3.2): boolean {
    // Auch Stausee (Oberwasser) und Bachbett (Unterwasser) rund um die Wehrbrücke von Bäumen freihalten
    if (Math.hypot(x - WEIR_BRIDGE_POS.x, z - WEIR_BRIDGE_POS.z) < 10.6) {
      return true;
    }
    return this.isNearCurvedCorridor(x, z, PATH_3_WAYPOINTS, PATH_3_END_CLEARING, minDistance);
  }

  private isNearPath4Corridor(x: number, z: number, minDistance = 3.2): boolean {
    // Auch die gerodete Waldlichtung rund um das Holzfällerlager von hohen Waldbäumen freihalten
    if (Math.hypot(x - LUMBER_CAMP_POS.x, z - LUMBER_CAMP_POS.z) < LUMBER_CAMP_POS.radius + 1.8) {
      return true;
    }
    return this.isNearCurvedCorridor(x, z, PATH_4_WAYPOINTS, PATH_4_END_CLEARING, minDistance);
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

          // Keine Bäume auf die kurvigen Korridore von Weg 1 bis Weg 4 setzen
          if (
            this.isNearPath1Corridor(x, z, 3.0) ||
            this.isNearPath2Corridor(x, z, 3.0) ||
            this.isNearPath3Corridor(x, z, 3.0) ||
            this.isNearPath4Corridor(x, z, 3.0)
          ) {
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
          if (
            this.isNearPath1Corridor(tx, tz, 2.7) ||
            this.isNearPath2Corridor(tx, tz, 2.7) ||
            this.isNearPath3Corridor(tx, tz, 2.7) ||
            this.isNearPath4Corridor(tx, tz, 2.7)
          ) {
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

  /**
   * Platziert Bäume beidseitig entlang von Weg 2 und als malerische Waldkulisse rund um den Nixenteich.
   */
  private buildCurvedPath2Trees(): void {
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4f3622, roughness: 0.9 });
    const crownMatDark = new THREE.MeshStandardMaterial({ color: 0x24472b, roughness: 0.85 });
    const crownMatLight = new THREE.MeshStandardMaterial({ color: 0x335c36, roughness: 0.85 });

    for (let i = 1; i < PATH_2_WAYPOINTS.length - 1; i++) {
      const prev = PATH_2_WAYPOINTS[i - 1];
      const curr = PATH_2_WAYPOINTS[i];
      const next = PATH_2_WAYPOINTS[i + 1];

      const dirX = next.x - prev.x;
      const dirZ = next.z - prev.z;
      const len = Math.hypot(dirX, dirZ) || 1;
      const perpX = -dirZ / len;
      const perpZ = dirX / len;

      for (const side of [-1, 1]) {
        for (const dist of [3.4, 6.2]) {
          const tx = curr.x + perpX * side * dist;
          const tz = curr.z + perpZ * side * dist;
          if (
            this.isNearPath2Corridor(tx, tz, 2.7) ||
            this.isNearPath1Corridor(tx, tz, 2.7) ||
            this.isNearPath3Corridor(tx, tz, 2.7) ||
            this.isNearPath4Corridor(tx, tz, 2.7)
          ) {
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

    // Malerischer Baumkranz um das Nord-, Ost- und Südufer des Teichs (Westufer ist der Wegzugang)
    const pondTreeAngles = [
      -1.85, -1.45, -1.05, -0.65, -0.25, 0.15, 0.55, 0.95, 1.35, 1.75, 2.1,
    ];
    pondTreeAngles.forEach((angle, idx) => {
      for (const ringRadius of [6.8, 9.6]) {
        const tx = POND_CENTER_POS.x + Math.cos(angle + (ringRadius > 8 ? 0.14 : 0)) * ringRadius;
        const tz = POND_CENTER_POS.z + Math.sin(angle + (ringRadius > 8 ? 0.14 : 0)) * ringRadius;
        if (
          this.isNearPath2Corridor(tx, tz, 2.6) ||
          this.isNearPath3Corridor(tx, tz, 2.6) ||
          this.isNearPath4Corridor(tx, tz, 2.6)
        ) {
          continue;
        }
        const scale = 1.05 + (idx % 3) * 0.16;
        const tree = this.createTreeMesh(
          scale,
          idx % 2 === 0,
          trunkMat,
          crownMatDark,
          crownMatLight
        );
        tree.position.set(tx, 0, tz);
        this.scene.add(tree);
      }
    });
  }

  /**
   * Platziert Bäume beidseitig entlang von Weg 3 und rund um den Stausee und den Platz des Riesen.
   */
  private buildCurvedPath3Trees(): void {
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4f3622, roughness: 0.9 });
    const crownMatDark = new THREE.MeshStandardMaterial({ color: 0x24472b, roughness: 0.85 });
    const crownMatLight = new THREE.MeshStandardMaterial({ color: 0x335c36, roughness: 0.85 });

    for (let i = 1; i < PATH_3_WAYPOINTS.length - 2; i++) {
      const prev = PATH_3_WAYPOINTS[i - 1];
      const curr = PATH_3_WAYPOINTS[i];
      const next = PATH_3_WAYPOINTS[i + 1];

      const dirX = next.x - prev.x;
      const dirZ = next.z - prev.z;
      const len = Math.hypot(dirX, dirZ) || 1;
      const perpX = -dirZ / len;
      const perpZ = dirX / len;

      for (const side of [-1, 1]) {
        for (const dist of [3.4, 6.2]) {
          const tx = curr.x + perpX * side * dist;
          const tz = curr.z + perpZ * side * dist;
          if (
            this.isNearPath3Corridor(tx, tz, 2.7) ||
            this.isNearPath2Corridor(tx, tz, 2.7) ||
            this.isNearPath1Corridor(tx, tz, 2.7) ||
            this.isNearPath4Corridor(tx, tz, 2.7)
          ) {
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

    // Baumkulisse hinter dem Vorplatz des Riesen und seitlich des Stausees
    const cos = Math.cos(WEIR_BRIDGE_POS.rotationY);
    const sin = Math.sin(WEIR_BRIDGE_POS.rotationY);
    const weirSurroundingTrees: readonly [number, number, number, boolean][] = [
      [-10.8, -3.5, 1.32, true],
      [-11.2, 0.4, 1.24, false],
      [-10.4, 4.2, 1.38, true],
      [-7.5, 7.6, 1.28, false],
      [-3.8, 9.8, 1.35, true],
      [0.5, 10.6, 1.22, false],
      [4.6, 9.6, 1.3, true],
      [7.8, 6.8, 1.18, false],
    ];

    for (const [lx, lz, scale, useDark] of weirSurroundingTrees) {
      const wx = WEIR_BRIDGE_POS.x + lx * cos + lz * sin;
      const wz = WEIR_BRIDGE_POS.z - lx * sin + lz * cos;
      const tree = this.createTreeMesh(scale, useDark, trunkMat, crownMatDark, crownMatLight);
      tree.position.set(wx, 0, wz);
      this.scene.add(tree);
    }
  }

  /**
   * Platziert Bäume entlang von Weg 4 und bildet den verbliebenen Hochwald-Rand rund um die Holzfäller-Lichtung.
   */
  private buildCurvedPath4Trees(): void {
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4f3622, roughness: 0.9 });
    const crownMatDark = new THREE.MeshStandardMaterial({ color: 0x24472b, roughness: 0.85 });
    const crownMatLight = new THREE.MeshStandardMaterial({ color: 0x335c36, roughness: 0.85 });

    for (let i = 1; i < PATH_4_WAYPOINTS.length - 1; i++) {
      const prev = PATH_4_WAYPOINTS[i - 1];
      const curr = PATH_4_WAYPOINTS[i];
      const next = PATH_4_WAYPOINTS[i + 1];

      const dirX = next.x - prev.x;
      const dirZ = next.z - prev.z;
      const len = Math.hypot(dirX, dirZ) || 1;
      const perpX = -dirZ / len;
      const perpZ = dirX / len;

      for (const side of [-1, 1]) {
        for (const dist of [3.4, 6.2]) {
          const tx = curr.x + perpX * side * dist;
          const tz = curr.z + perpZ * side * dist;
          if (
            this.isNearPath4Corridor(tx, tz, 2.7) ||
            this.isNearPath3Corridor(tx, tz, 2.7) ||
            this.isNearPath2Corridor(tx, tz, 2.7) ||
            this.isNearPath1Corridor(tx, tz, 2.7)
          ) {
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

    // Äußerer Waldrand hinter den Baumstümpfen der Holzfäller-Lichtung
    const campEdgeAngles = [-0.9, -0.45, 0.0, 0.45, 0.9, 1.35, 1.8, 2.25, 2.7, 3.15, 3.6, 4.0];
    campEdgeAngles.forEach((angle, idx) => {
      for (const ringRadius of [8.8, 11.4]) {
        const tx = LUMBER_CAMP_POS.x + Math.cos(angle + (ringRadius > 10 ? 0.16 : 0)) * ringRadius;
        const tz = LUMBER_CAMP_POS.z + Math.sin(angle + (ringRadius > 10 ? 0.16 : 0)) * ringRadius;
        if (this.isNearPath4Corridor(tx, tz, 2.6)) {
          continue;
        }
        const scale = 1.1 + (idx % 3) * 0.15;
        const tree = this.createTreeMesh(
          scale,
          idx % 2 === 0,
          trunkMat,
          crownMatDark,
          crownMatLight
        );
        tree.position.set(tx, 0, tz);
        this.scene.add(tree);
      }
    });
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

  public setNixieHovered(hovered: boolean): void {
    this.isNixieHovered = hovered;
  }

  public setGiantHovered(hovered: boolean): void {
    this.isGiantHovered = hovered;
  }

  public setWoodWomanHovered(hovered: boolean): void {
    this.isWoodWomanHovered = hovered;
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

      if (data.interactableType === 'wood_woman') {
        return { kind: 'wood_woman', point };
      }
      if (data.interactableType === 'lumber_camp') {
        return { kind: 'lumber_camp', point };
      }
      if (data.interactableType === 'giant') {
        return { kind: 'giant', point };
      }
      if (data.interactableType === 'weir') {
        return { kind: 'weir', point };
      }
      if (data.interactableType === 'nixie') {
        return { kind: 'nixie', point };
      }
      if (data.interactableType === 'pond') {
        return { kind: 'pond', point };
      }
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

    // Alle fünf NPCs (Waldhüter Arvid, Graumännchen, Nixe, Riese, Holzweibchen), Schauplätze und Schatztruhe animieren
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
    this.nixiePond.update(this.elapsedSeconds);
    this.nixieNpc.update(
      this.elapsedSeconds,
      playerPos,
      this.isNixieHovered || isDialogueActive
    );
    this.weirBridge.update(this.elapsedSeconds);
    this.giantNpc.update(
      this.elapsedSeconds,
      playerPos,
      this.isGiantHovered || isDialogueActive
    );
    this.lumberCamp.update(this.elapsedSeconds);
    this.woodWomanNpc.update(
      this.elapsedSeconds,
      playerPos,
      this.isWoodWomanHovered || isDialogueActive
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

    // Edelstein am jeweils aktiven Storyweg (Weg 1 bis 4 bzw. aktuell gewählter Storyweg) leuchten lassen
    const pulse = 0.5 + 0.5 * Math.sin(this.elapsedSeconds * 3.2);
    this.pathGemstones.forEach((gem, id) => {
      const isStoryPath = id >= 1 && id <= 4;
      const isActiveQuestPath =
        selectedPathId !== null ? id === selectedPathId && isStoryPath : isStoryPath;

      if (isActiveQuestPath) {
        gem.material.emissive.setHex(gem.baseColor);
        gem.material.emissiveIntensity = 1.05 + pulse * 0.65;
        gem.light.intensity = 1.35 + pulse * 0.75;
        gem.mesh.position.y = 0.65 + Math.sin(this.elapsedSeconds * 2.4 + id) * 0.05;
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
