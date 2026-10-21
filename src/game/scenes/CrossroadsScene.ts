import * as THREE from 'three';
import {
  CAVE_ENTRANCE_POS,
  DEVIL_NPC_POS,
  GIANT_NPC_POS,
  GREY_MAN_NPC_POS,
  HELL_CHASM_POS,
  HUNTING_LODGE_POS,
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
  PATH_5_END_CLEARING,
  PATH_5_WAYPOINTS,
  PATH_6_END_CLEARING,
  PATH_6_WAYPOINTS,
  PATH_7_END_CLEARING,
  PATH_7_WAYPOINTS,
  PathPoint2D,
  POND_CENTER_POS,
  SEVEN_PATHS,
  START_PLAYER_POS,
  WEIR_BRIDGE_POS,
  WILD_HUNTER_NPC_POS,
  WOOD_WOMAN_LODGE_NPC_POS,
  WOOD_WOMAN_NPC_POS,
  CLOSED_GATE_POS,
} from '../data/paths';
import { createClosedGate, ClosedGateEntity } from '../entities/ClosedGate';
import { createDevilNpc, DevilNpcEntity } from '../entities/DevilNpc';
import { createGiantNpc, GiantNpcEntity } from '../entities/GiantNpc';
import { createGreyManNpc, GreyManNpcEntity } from '../entities/GreyManNpc';
import { createGuideNpc, GuideNpcEntity } from '../entities/GuideNpc';
import { createHellChasm, HellChasmEntity } from '../entities/HellChasm';
import { createHuntingLodge, HuntingLodgeEntity } from '../entities/HuntingLodge';
import { createLogCabin } from '../entities/LogCabin';
import { createLumberjackCamp, LumberjackCampEntity } from '../entities/LumberjackCamp';
import { createMountainCave } from '../entities/MountainCave';
import { createNixieNpc, NixieNpcEntity } from '../entities/NixieNpc';
import { createNixiePond, NixiePondEntity } from '../entities/NixiePond';
import { createSignpost, SignpostEntity } from '../entities/Signpost';
import { createTreasureChest, TreasureChestEntity } from '../entities/TreasureChest';
import { createWeirBridgeScene, WeirBridgeEntity } from '../entities/WeirBridgeScene';
import { createWildHunterNpc, WildHunterNpcEntity } from '../entities/WildHunterNpc';
import { createPathBoulder, PathBoulderEntity } from '../entities/PathBoulder';
import { createPathPuddle, PathPuddleEntity } from '../entities/PathPuddle';
import { createPathStream, PathStreamEntity } from '../entities/PathStream';
import { createPathLog, PathLogEntity } from '../entities/PathLog';
import { createPathFire, PathFireEntity } from '../entities/PathFire';
import { createPathHerbs, PathHerbsEntity } from '../entities/PathHerbs';
import {
  createGrassTexture,
  createPathTexture,
  createBarkTexture,
  createPineFoliageTexture,
  createStoneTexture,
  createVeinedLavaRockTexture,
  createBrickTexture,
} from '../textures/GroundTextures';
import { createWoodWomanNpc, WoodWomanNpcEntity } from '../entities/WoodWomanNpc';
import { createMushroomCluster, MushroomType } from '../entities/MushroomCluster';
import { createBirdhouse } from '../entities/Birdhouse';
import { createFlowerCluster, FlowerType } from '../entities/ForestFlowers';
import { Vector2D } from '../systems/CrossroadsState';

export type ScenePickResult =
  | { kind: 'npc'; point: Vector2D }
  | { kind: 'grey_man'; point: Vector2D }
  | { kind: 'nixie'; point: Vector2D }
  | { kind: 'giant'; point: Vector2D }
  | { kind: 'wood_woman'; point: Vector2D }
  | { kind: 'devil'; point: Vector2D }
  | { kind: 'wild_hunter'; point: Vector2D }
  | { kind: 'wood_woman_lodge'; point: Vector2D }
  | { kind: 'gate'; point: Vector2D }
  | { kind: 'boulder'; point: Vector2D }
  | { kind: 'puddle'; point: Vector2D }
  | { kind: 'stream'; point: Vector2D }
  | { kind: 'log'; point: Vector2D }
  | { kind: 'fire'; point: Vector2D }
  | { kind: 'herbs'; point: Vector2D }
  | { kind: 'gemstone'; pathId: number; point: Vector2D }
  | { kind: 'cave'; point: Vector2D }
  | { kind: 'pond'; point: Vector2D }
  | { kind: 'weir'; point: Vector2D }
  | { kind: 'lumber_camp'; point: Vector2D }
  | { kind: 'hell_chasm'; point: Vector2D }
  | { kind: 'hunting_lodge'; point: Vector2D }
  | { kind: 'herb_garden'; point: Vector2D }
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
 * - Weg 5: Feuriger Höllenschlund & Der Teufel
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
  private readonly hellChasm: HellChasmEntity;
  private readonly devilNpc: DevilNpcEntity;
  private readonly huntingLodge: HuntingLodgeEntity;
  private readonly wildHunterNpc: WildHunterNpcEntity;
  private readonly woodWomanLodgeNpc: WoodWomanNpcEntity;
  private readonly closedGate: ClosedGateEntity;
  private readonly path1Boulder: PathBoulderEntity;
  private readonly path2Puddle: PathPuddleEntity;
  private readonly path3Stream: PathStreamEntity;
  private readonly path4Log: PathLogEntity;
  private readonly path5Fire: PathFireEntity;
  private readonly path6Herbs: PathHerbsEntity;
  private readonly treasureChest: TreasureChestEntity;
  private readonly pathMeshes = new Map<number, THREE.MeshStandardMaterial[]>();
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

  private cameraOrbitAngle = Math.atan2(-21.0, -18.4);
  private cameraPitch = 0.56;
  private cameraDistance = 11.0;
  private hoveredPathId: number | null = null;
  private isNpcHovered = false;
  private isGreyManHovered = false;
  private isNixieHovered = false;
  private isGiantHovered = false;
  private isWoodWomanHovered = false;
  private isDevilHovered = false;
  private isWildHunterHovered = false;
  private isWoodWomanLodgeHovered = false;
  private isGateHovered = false;
  private isBoulderHovered = false;
  private isPuddleHovered = false;
  private isStreamHovered = false;
  private isLogHovered = false;
  private isFireHovered = false;
  private isHerbsHovered = false;
  private isChestHovered = false;
  private readonly gemstonePulseTimers = new Map<number, number>();
  private lastPlayerPos: Vector2D = { ...START_PLAYER_POS };
  private elapsedSeconds = 0;
  private treeCounter = 0;
  private hellGroundOuterMat: THREE.MeshStandardMaterial | null = null;
  private hellGroundInnerMat: THREE.MeshStandardMaterial | null = null;
  private hellMeadowGlowMat: THREE.MeshStandardMaterial | null = null;
  private path5SegmentMats: THREE.MeshStandardMaterial[] = [];

  // Nebelfarben: Heller Waldnebel auf der Lichtung und finster-dunkelroter Nebel im Höllenschlund
  private readonly defaultFogColor = new THREE.Color(0xdce2e0);
  private readonly hellFogColor = new THREE.Color(0x160708);
  private readonly currentFogColor = new THREE.Color(0xdce2e0);

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    // Echter Waldnebel: im Nahbereich klar, ab ~9.5m einsetzend, ab 22m im Nebel verborgen
    this.scene.background = this.currentFogColor;
    this.scene.fog = new THREE.Fog(this.defaultFogColor.getHex(), 9.5, 22.0);

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
    const cabin = createLogCabin((mesh) => {
      this.pickableObjects.push(mesh);
    });
    cabin.position.set(0, 0, 0);
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
    this.guideNpc = createGuideNpc((mesh) => {
      this.pickableObjects.push(mesh);
    });
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

    // Die Nixe / Meerjungfrau (NPC) im Waldteich am Ende des 2. Weges
    this.nixieNpc = createNixieNpc((mesh) => {
      this.pickableObjects.push(mesh);
    });
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

    // Der feurige Höllenschlund am Ende des 5. Weges (3D-Lavakrater)
    this.hellChasm = createHellChasm((mesh) => {
      this.pickableObjects.push(mesh);
    });
    this.hellChasm.group.position.set(HELL_CHASM_POS.x, 0, HELL_CHASM_POS.z);
    this.hellChasm.group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && child.userData?.interactableType) {
        this.pickableObjects.push(child);
      }
    });
    this.scene.add(this.hellChasm.group);

    // Der Teufel / Dämonenkrieger (NPC) inmitten des Höllenschlundes am Ende des 5. Weges
    this.devilNpc = createDevilNpc((mesh) => {
      this.pickableObjects.push(mesh);
    });
    this.devilNpc.group.position.set(DEVIL_NPC_POS.x, 0, DEVIL_NPC_POS.z);
    this.devilNpc.group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        this.pickableObjects.push(child);
      }
    });
    this.scene.add(this.devilNpc.group);

    // Jagdhütte mit Kräutergarten, Jagdpferd und Jagdhund am Ende des 6. Weges
    this.huntingLodge = createHuntingLodge();
    this.huntingLodge.group.position.set(HUNTING_LODGE_POS.x, 0, HUNTING_LODGE_POS.z);
    this.huntingLodge.group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && child.userData?.interactableType) {
        this.pickableObjects.push(child);
      }
    });
    this.scene.add(this.huntingLodge.group);

    // Der Wilde Jäger (NPC) an der Jagdhütte
    this.wildHunterNpc = createWildHunterNpc();
    this.wildHunterNpc.group.position.set(WILD_HUNTER_NPC_POS.x, 0, WILD_HUNTER_NPC_POS.z);
    this.wildHunterNpc.group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        this.pickableObjects.push(child);
      }
    });
    this.scene.add(this.wildHunterNpc.group);

    // Das Holzweibchen (NPC) vor dem Kräutergartenzaun an der Jagdhütte
    this.woodWomanLodgeNpc = createWoodWomanNpc({
      interactableType: 'wood_woman_lodge',
      defaultFacingTarget: WILD_HUNTER_NPC_POS,
    });
    this.woodWomanLodgeNpc.group.position.set(
      WOOD_WOMAN_LODGE_NPC_POS.x,
      0,
      WOOD_WOMAN_LODGE_NPC_POS.z
    );
    this.woodWomanLodgeNpc.group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        this.pickableObjects.push(child);
      }
    });
    this.scene.add(this.woodWomanLodgeNpc.group);

    // Das geschlossene Tor mit flankierenden Steinmauern am Ende des 7. Weges
    this.closedGate = createClosedGate();
    this.closedGate.group.position.set(CLOSED_GATE_POS.x, 0, CLOSED_GATE_POS.z);
    this.closedGate.group.rotation.y = CLOSED_GATE_POS.rotationY;
    this.closedGate.group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && child.userData?.interactableType) {
        this.pickableObjects.push(child);
      }
    });
    this.scene.add(this.closedGate.group);

    // Magischer Felsbrocken, der Weg 1 (Silberstollen-Pfad) blockiert
    this.path1Boulder = createPathBoulder();
    this.scene.add(this.path1Boulder.group);

    // Magische Wasserpfütze, die Weg 2 (Nixenteich-Pfad) blockiert
    this.path2Puddle = createPathPuddle();
    this.scene.add(this.path2Puddle.group);

    // Reißender Gebirgsbach, der Weg 3 (Quellenweg) blockiert
    this.path3Stream = createPathStream();
    this.scene.add(this.path3Stream.group);

    // Magischer Baumstamm, der Weg 4 (Holzfäller-Pfad) blockiert
    this.path4Log = createPathLog();
    this.scene.add(this.path4Log.group);

    // Magisches Feuer, das Weg 5 (Höllenschlund-Pfad) blockiert
    this.path5Fire = createPathFire();
    this.scene.add(this.path5Fire.group);

    // Hohe Kräuterpflanzen mit Geländer, die Weg 6 (Jägerpfad) blockieren
    this.path6Herbs = createPathHerbs();
    this.scene.add(this.path6Herbs.group);


    // Bäume rund um die Lichtung, zwischen den 7 Wegen und entlang aller Kurven von Weg 1 bis 7
    this.buildForestRing();
    this.buildCurvedPath1Trees();
    this.buildCurvedPath2Trees();
    this.buildCurvedPath3Trees();
    this.buildCurvedPath4Trees();
    this.buildCurvedPath5Trees();
    this.buildCurvedPath6Trees();
    this.buildCurvedPath7Trees();
    this.buildPath7Wildflowers();
    this.buildForestMushrooms();
    this.buildHellChasmBackdropRocks();

    // Zielmarkierung für Maus-Bewegung (Click-to-Move)
    this.targetMarker = this.createTargetMarker();
    this.scene.add(this.targetMarker);

    // Spielfigur (Wandernde Person) – Start auf Weg 7 in halber Strecke mit Blick zur Kreuzung
    this.playerGroup = this.createPlayerMarker();
    this.playerGroup.position.set(START_PLAYER_POS.x, 0, START_PLAYER_POS.z);
    this.playerGroup.rotation.y = Math.atan2(21.0, 18.4);
    this.scene.add(this.playerGroup);

    // Initiale Kamera-Ausrichtung hinter dem Spieler mit Blickrichtung zur Kreuzung
    const targetY = 1.1;
    const horizontalDist = Math.cos(this.cameraPitch) * this.cameraDistance;
    const camHeight = Math.max(0.55, targetY + Math.sin(this.cameraPitch) * this.cameraDistance);
    const initCamX = START_PLAYER_POS.x + Math.sin(this.cameraOrbitAngle) * horizontalDist;
    const initCamZ = START_PLAYER_POS.z + Math.cos(this.cameraOrbitAngle) * horizontalDist;
    this.camera.position.set(initCamX, camHeight, initCamZ);
    this.camera.lookAt(START_PLAYER_POS.x, targetY, START_PLAYER_POS.z);

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
    // 1. Texturen für Waldboden und Wegestrukturen generieren
    const grassTex = createGrassTexture();
    if (grassTex.map) {
      grassTex.map.repeat.set(55, 55);
    }
    if (grassTex.bumpMap) {
      grassTex.bumpMap.repeat.set(55, 55);
    }

    const pathTex = createPathTexture();
    if (pathTex.map) {
      pathTex.map.repeat.set(2, 6);
    }
    if (pathTex.bumpMap) {
      pathTex.bumpMap.repeat.set(2, 6);
    }

    const clearingTex = createPathTexture();
    if (clearingTex.map) {
      clearingTex.map.repeat.set(6, 6);
    }
    if (clearingTex.bumpMap) {
      clearingTex.bumpMap.repeat.set(6, 6);
    }

    const endClearingTex = createPathTexture();
    if (endClearingTex.map) {
      endClearingTex.map.repeat.set(4, 4);
    }
    if (endClearingTex.bumpMap) {
      endClearingTex.bumpMap.repeat.set(4, 4);
    }

    // Weitläufiger Waldboden mit natürlicher Wiesentextur und plastischem Relief
    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(110, 48),
      new THREE.MeshStandardMaterial({
        color: 0x3d6842,
        map: grassTex.map ?? undefined,
        bumpMap: grassTex.bumpMap ?? undefined,
        bumpScale: 0.045,
        roughness: 0.92,
      })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Glühende Wiese & feuriger Magmaboden im Bereich des Höllenschlunds / Lavasees (Weg 5 / Teufel)
    const lavaRockTex = createVeinedLavaRockTexture();
    if (lavaRockTex.map) lavaRockTex.map.repeat.set(2.5, 2.5);
    if (lavaRockTex.emissiveMap) lavaRockTex.emissiveMap.repeat.set(2.5, 2.5);
    if (lavaRockTex.bumpMap) lavaRockTex.bumpMap.repeat.set(2.5, 2.5);

    // 1. Äußerer weicher Glüh-Saum der Wiese (großflächiges Glühen im Gras)
    this.hellMeadowGlowMat = new THREE.MeshStandardMaterial({
      color: 0x423424, // Feurig getönte Waldwiese
      map: grassTex.map ?? undefined,
      emissive: new THREE.Color(0x661802),
      emissiveIntensity: 0.4,
      bumpMap: grassTex.bumpMap ?? undefined,
      bumpScale: 0.035,
      roughness: 0.94,
    });
    const ashGroundMeadowGlow = new THREE.Mesh(
      new THREE.CircleGeometry(36, 40),
      this.hellMeadowGlowMat
    );
    ashGroundMeadowGlow.position.set(HELL_CHASM_POS.x, 0.007, HELL_CHASM_POS.z - 2.5);
    ashGroundMeadowGlow.rotation.x = -Math.PI / 2;
    ashGroundMeadowGlow.receiveShadow = true;
    this.scene.add(ashGroundMeadowGlow);

    // 2. Glühende Brandwiese (starker Glut-Schein in den Gräsern)
    this.hellGroundOuterMat = new THREE.MeshStandardMaterial({
      color: 0x5a2012, // Kräftig feuerrotes, sengendes Brandgras
      map: grassTex.map ?? undefined,
      emissiveMap: lavaRockTex.emissiveMap ?? undefined,
      emissive: new THREE.Color(0xb52c04),
      emissiveIntensity: 0.72,
      bumpMap: grassTex.bumpMap ?? undefined,
      bumpScale: 0.04,
      roughness: 0.9,
    });
    const ashGroundOuter = new THREE.Mesh(
      new THREE.CircleGeometry(28, 40),
      this.hellGroundOuterMat
    );
    ashGroundOuter.position.set(HELL_CHASM_POS.x, 0.012, HELL_CHASM_POS.z - 1.8);
    ashGroundOuter.rotation.x = -Math.PI / 2;
    ashGroundOuter.receiveShadow = true;
    this.scene.add(ashGroundOuter);

    // 3. Innerer feurig glühender Magma- und Vulkanboden direkt um den Lavasee
    // Als Ring ausgeführt (Innenradius 7.6m), damit das Kraterbecken und die Lava frei bleiben
    // und der Magmaboden nahtlos unter den Felsen des Kraterrandes anschließt.
    this.hellGroundInnerMat = new THREE.MeshStandardMaterial({
      color: 0x6e1806, // Tief feuerroter Vulkangrund mit Magma-Adern
      map: lavaRockTex.map ?? undefined,
      emissiveMap: lavaRockTex.emissiveMap ?? undefined,
      emissive: new THREE.Color(0xff3300),
      emissiveIntensity: 1.4,
      bumpMap: lavaRockTex.bumpMap ?? undefined,
      bumpScale: 0.06,
      roughness: 0.82,
    });
    const ashGroundInner = new THREE.Mesh(
      new THREE.RingGeometry(7.6, 18.5, 48),
      this.hellGroundInnerMat
    );
    ashGroundInner.position.set(HELL_CHASM_POS.x, 0.018, HELL_CHASM_POS.z);
    ashGroundInner.rotation.x = -Math.PI / 2;
    ashGroundInner.receiveShadow = true;
    this.scene.add(ashGroundInner);

    // Zentrale Waldkreuzung mit Schotter-/Kieselstruktur (begehbare Lichtung)
    const clearing = new THREE.Mesh(
      new THREE.CylinderGeometry(6.8, 7.0, 0.06, 36),
      new THREE.MeshStandardMaterial({
        color: 0x826d55,
        map: clearingTex.map ?? undefined,
        bumpMap: clearingTex.bumpMap ?? undefined,
        bumpScale: 0.035,
        roughness: 0.88,
      })
    );
    clearing.position.y = 0.03;
    clearing.receiveShadow = true;
    clearing.userData = { interactableType: 'ground' };
    this.scene.add(clearing);
    this.pickableObjects.push(clearing);

    SEVEN_PATHS.forEach((pathData) => {
      // Standard-Wegmaterial mit Kiesel-/Sandstruktur
      const mat = new THREE.MeshStandardMaterial({
        color: 0x826d55,
        map: pathTex.map ?? undefined,
        bumpMap: pathTex.bumpMap ?? undefined,
        bumpScale: 0.035,
        roughness: 0.88,
        emissive: 0x000000,
      });

      const defaultClearingMat = new THREE.MeshStandardMaterial({
        color: 0x826d55,
        map: endClearingTex.map ?? undefined,
        bumpMap: endClearingTex.bumpMap ?? undefined,
        bumpScale: 0.035,
        roughness: 0.88,
        emissive: 0x000000,
      });

      if (pathData.id === 1) {
        this.pathMeshes.set(1, [mat, defaultClearingMat]);
        // Weg 1: Verlängerter Weg mit Rechtskurve entlang PATH_1_WAYPOINTS bis zum Berg
        this.buildCurvedPathMeshes(
          1,
          PATH_1_WAYPOINTS,
          PATH_1_END_CLEARING,
          pathData.angleRad,
          mat,
          pathData.colorHex,
          undefined,
          defaultClearingMat
        );
        return;
      }

      if (pathData.id === 2) {
        this.pathMeshes.set(2, [mat, defaultClearingMat]);
        // Weg 2: Geschwungener Pfad entlang PATH_2_WAYPOINTS bis zum Waldteich mit der Nixe
        this.buildCurvedPathMeshes(
          2,
          PATH_2_WAYPOINTS,
          PATH_2_END_CLEARING,
          pathData.angleRad,
          mat,
          pathData.colorHex,
          undefined,
          defaultClearingMat
        );
        return;
      }

      if (pathData.id === 3) {
        this.pathMeshes.set(3, [mat, defaultClearingMat]);
        // Weg 3: Pfad entlang PATH_3_WAYPOINTS über die Wehrbrücke bis zum Riesen
        this.buildCurvedPathMeshes(
          3,
          PATH_3_WAYPOINTS,
          { x: PATH_3_END_CLEARING.x, z: PATH_3_END_CLEARING.z, radius: 3.1 },
          pathData.angleRad,
          mat,
          pathData.colorHex,
          undefined,
          defaultClearingMat
        );
        return;
      }

      if (pathData.id === 4) {
        this.pathMeshes.set(4, [mat, defaultClearingMat]);
        // Weg 4: Pfad entlang PATH_4_WAYPOINTS bis zum Holzfällerlager auf der Waldlichtung
        this.buildCurvedPathMeshes(
          4,
          PATH_4_WAYPOINTS,
          PATH_4_END_CLEARING,
          pathData.angleRad,
          mat,
          pathData.colorHex,
          undefined,
          defaultClearingMat
        );
        return;
      }

      if (pathData.id === 5) {
        // Weg 5: Pfad entlang PATH_5_WAYPOINTS bis zum Lavasee / Höllenschlund
        // Feuerroter Farbverlauf von feurigem Glut-Terrakotta an der Kreuzung bis zu loderndem Magma-Feuerrot am Lavasee
        const lavaRockTex = createVeinedLavaRockTexture();
        if (lavaRockTex.map) lavaRockTex.map.repeat.set(1.5, 3.0);
        if (lavaRockTex.emissiveMap) lavaRockTex.emissiveMap.repeat.set(1.5, 3.0);
        if (lavaRockTex.bumpMap) lavaRockTex.bumpMap.repeat.set(1.5, 3.0);

        const path5Configs = [
          { color: 0xba4420, emissive: 0x661400, intensity: 0.4 },  // Nahe Kreuzung: Feuriges Rost-/Glutrot
          { color: 0xcd3412, emissive: 0x881a00, intensity: 0.62 }, // Erste Kurve: Kräftiges Feuerrot
          { color: 0xdf2808, emissive: 0xaa2000, intensity: 0.85 }, // Pfadmitte: Intensives Magmarot
          { color: 0xee2200, emissive: 0xcc2600, intensity: 1.08 }, // Ausläufer: Loderndes Karminrot
          { color: 0xf82400, emissive: 0xee2c00, intensity: 1.3 },  // Kraterrand: Glühendes Höllenfeuerrot
        ];

        const segMats = path5Configs.map(
          (cfg) =>
            new THREE.MeshStandardMaterial({
              color: cfg.color,
              map: pathTex.map ?? undefined,
              emissiveMap: lavaRockTex.emissiveMap ?? undefined,
              emissive: new THREE.Color(cfg.emissive),
              emissiveIntensity: cfg.intensity,
              bumpMap: pathTex.bumpMap ?? undefined,
              bumpScale: 0.04,
              roughness: 0.8,
            })
        );
        this.path5SegmentMats = segMats;

        const endClearingMat = new THREE.MeshStandardMaterial({
          color: 0xee2000,
          map: lavaRockTex.map ?? undefined,
          emissiveMap: lavaRockTex.emissiveMap ?? undefined,
          emissive: new THREE.Color(0xdd2800),
          emissiveIntensity: 1.25,
          bumpMap: lavaRockTex.bumpMap ?? undefined,
          bumpScale: 0.05,
          roughness: 0.8,
        });

        this.pathMeshes.set(5, [...segMats, endClearingMat]);

        this.buildCurvedPathMeshes(
          5,
          PATH_5_WAYPOINTS,
          PATH_5_END_CLEARING,
          pathData.angleRad,
          mat,
          pathData.colorHex,
          segMats,
          endClearingMat
        );
        return;
      }

      if (pathData.id === 6) {
        this.pathMeshes.set(6, [mat, defaultClearingMat]);
        // Weg 6: Pfad entlang PATH_6_WAYPOINTS bis zur Jagdhütte und dem Kräutergarten
        this.buildCurvedPathMeshes(
          6,
          PATH_6_WAYPOINTS,
          PATH_6_END_CLEARING,
          pathData.angleRad,
          mat,
          pathData.colorHex,
          undefined,
          defaultClearingMat
        );
        return;
      }

      if (pathData.id === 7) {
        // Runder Vorplatz vor dem Steintor mit Backstein-Pflastertextur
        const brickTex = createBrickTexture();
        if (brickTex.map) brickTex.map.repeat.set(5.5, 5.5);
        if (brickTex.bumpMap) brickTex.bumpMap.repeat.set(5.5, 5.5);

        const brickClearingMat = new THREE.MeshStandardMaterial({
          color: 0xa44a2b, // Warmer Backstein- und Klinkerton
          map: brickTex.map ?? undefined,
          bumpMap: brickTex.bumpMap ?? undefined,
          bumpScale: 0.06,
          roughness: 0.82,
        });

        this.pathMeshes.set(7, [mat, brickClearingMat]);
        // Weg 7: Pfad entlang PATH_7_WAYPOINTS bis zum geschlossenen Tor
        this.buildCurvedPathMeshes(
          7,
          PATH_7_WAYPOINTS,
          PATH_7_END_CLEARING,
          pathData.angleRad,
          mat,
          pathData.colorHex,
          undefined,
          brickClearingMat
        );
        return;
      }
    });
  }

  private createPathGemstone(pathId: number, colorHex: number): THREE.Group {
    const group = new THREE.Group();

    // Kleiner steinerner Sockel unter dem Edelstein mit natürlicher Steintextur
    const pedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.36, 0.26, 8),
      this.getStonePedestalMaterial()
    );
    pedestal.position.y = 0.13;
    pedestal.castShadow = true;
    pedestal.receiveShadow = true;
    pedestal.userData = { interactableType: 'gemstone', pathId };
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
    gemMesh.userData = { interactableType: 'gemstone', pathId };
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
    markerColorHex: number,
    segmentMats?: THREE.MeshStandardMaterial[],
    clearingMat?: THREE.MeshStandardMaterial
  ): void {
    const pathWidth = 2.2;

    for (let i = 0; i < waypoints.length - 1; i++) {
      // Auf Weg 3 führt das letzte Segment direkt über die Holzbrücke (WeirBridgeScene),
      // daher dort keinen Erdstreifen quer durch das Bachbett legen.
      if (pathId === 3 && i === waypoints.length - 2) {
        continue;
      }

      const segMat = segmentMats?.[i] ?? mat;

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
        segMat
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
        segMat
      );
      jointMesh.position.set(b.x, 0.03, b.z);
      jointMesh.receiveShadow = true;
      jointMesh.userData = { interactableType: 'path', pathId };
      this.scene.add(jointMesh);
      this.pickableObjects.push(jointMesh);
    }

    // Vorplatz am Ende des Kurvenweges (falls für diesen Weg vorgesehen)
    // Weg 2 (Nixenteich) und Weg 5 (Lavateich des Teufels) führen direkt an ihr Ziel ohne runden Vorplatz
    if (pathId !== 2 && pathId !== 5) {
      const endClearing = new THREE.Mesh(
        new THREE.CylinderGeometry(
          clearing.radius,
          clearing.radius + 0.2,
          0.06,
          28
        ),
        clearingMat ?? mat
      );
      endClearing.position.set(clearing.x, 0.03, clearing.z);
      endClearing.receiveShadow = true;
      endClearing.userData = { interactableType: 'path', pathId };
      this.scene.add(endClearing);
      this.pickableObjects.push(endClearing);
    }

    // Edelstein auf Sockel rechts am Wegeingang an der Kreuzung
    const entrancePivot = new THREE.Group();
    entrancePivot.rotation.y = -entranceAngleRad;
    const gemGroup = this.createPathGemstone(pathId, markerColorHex);
    gemGroup.position.set(1.45, 0, -6.8);
    entrancePivot.add(gemGroup);
    this.scene.add(entrancePivot);
  }

  private defaultTrunkMat: THREE.MeshStandardMaterial | null = null;
  private burnedTrunkMat: THREE.MeshStandardMaterial | null = null;

  /**
   * Liefert das detailreich texturierte Rindenmaterial für Baumstämme (mit vertikaler Rindenstruktur und Relief-Bump-Map).
   */
  private getTrunkMaterial(burned = false): THREE.MeshStandardMaterial {
    if (burned) {
      if (!this.burnedTrunkMat) {
        const barkTex = createBarkTexture();
        if (barkTex.map) {
          barkTex.map.repeat.set(1.5, 2.5);
        }
        if (barkTex.bumpMap) {
          barkTex.bumpMap.repeat.set(1.5, 2.5);
        }
        this.burnedTrunkMat = new THREE.MeshStandardMaterial({
          color: 0x221a18,
          map: barkTex.map ?? undefined,
          bumpMap: barkTex.bumpMap ?? undefined,
          bumpScale: 0.1,
          roughness: 0.95,
        });
      }
      return this.burnedTrunkMat;
    }

    if (!this.defaultTrunkMat) {
      const barkTex = createBarkTexture();
      if (barkTex.map) {
        barkTex.map.repeat.set(1.5, 2.5);
      }
      if (barkTex.bumpMap) {
        barkTex.bumpMap.repeat.set(1.5, 2.5);
      }
      this.defaultTrunkMat = new THREE.MeshStandardMaterial({
        color: 0x4f3622,
        map: barkTex.map ?? undefined,
        bumpMap: barkTex.bumpMap ?? undefined,
        bumpScale: 0.08,
        roughness: 0.9,
      });
    }
    return this.defaultTrunkMat;
  }

  private stonePedestalMat: THREE.MeshStandardMaterial | null = null;

  /**
   * Liefert das detailreich texturierte Steinmaterial für die Sockel der 7 Edelsteine.
   */
  private getStonePedestalMaterial(): THREE.MeshStandardMaterial {
    if (!this.stonePedestalMat) {
      const stoneTex = createStoneTexture();
      if (stoneTex.map) {
        stoneTex.map.repeat.set(1.5, 1.2);
      }
      if (stoneTex.bumpMap) {
        stoneTex.bumpMap.repeat.set(1.5, 1.2);
      }
      this.stonePedestalMat = new THREE.MeshStandardMaterial({
        color: 0x62686b,
        map: stoneTex.map ?? undefined,
        bumpMap: stoneTex.bumpMap ?? undefined,
        bumpScale: 0.08,
        roughness: 0.9,
        flatShading: true,
      });
    }
    return this.stonePedestalMat;
  }

  private defaultCrownDarkMat: THREE.MeshStandardMaterial | null = null;
  private defaultCrownLightMat: THREE.MeshStandardMaterial | null = null;
  private burnedCrownDarkMat: THREE.MeshStandardMaterial | null = null;
  private burnedCrownLightMat: THREE.MeshStandardMaterial | null = null;

  /**
   * Liefert die detailreichen Nadelbaum-Materialien für die Baumkronen (mit Nadelbaum-Foliage-Textur und Bump-Map).
   */
  private getCrownMaterials(burned = false): { dark: THREE.MeshStandardMaterial; light: THREE.MeshStandardMaterial } {
    if (burned) {
      if (!this.burnedCrownDarkMat || !this.burnedCrownLightMat) {
        const foliageTex = createPineFoliageTexture();
        if (foliageTex.map) foliageTex.map.repeat.set(2.5, 2.5);
        if (foliageTex.bumpMap) foliageTex.bumpMap.repeat.set(2.5, 2.5);
        this.burnedCrownDarkMat = new THREE.MeshStandardMaterial({
          color: 0x1c1a17,
          map: foliageTex.map ?? undefined,
          bumpMap: foliageTex.bumpMap ?? undefined,
          bumpScale: 0.08,
          roughness: 0.92,
        });
        this.burnedCrownLightMat = new THREE.MeshStandardMaterial({
          color: 0x2c241e,
          map: foliageTex.map ?? undefined,
          bumpMap: foliageTex.bumpMap ?? undefined,
          bumpScale: 0.08,
          roughness: 0.92,
        });
      }
      return { dark: this.burnedCrownDarkMat, light: this.burnedCrownLightMat };
    }

    if (!this.defaultCrownDarkMat || !this.defaultCrownLightMat) {
      const foliageTex = createPineFoliageTexture();
      if (foliageTex.map) foliageTex.map.repeat.set(2.5, 2.5);
      if (foliageTex.bumpMap) foliageTex.bumpMap.repeat.set(2.5, 2.5);
      this.defaultCrownDarkMat = new THREE.MeshStandardMaterial({
        color: 0x24472b,
        map: foliageTex.map ?? undefined,
        bumpMap: foliageTex.bumpMap ?? undefined,
        bumpScale: 0.09,
        roughness: 0.85,
      });
      this.defaultCrownLightMat = new THREE.MeshStandardMaterial({
        color: 0x335c36,
        map: foliageTex.map ?? undefined,
        bumpMap: foliageTex.bumpMap ?? undefined,
        bumpScale: 0.09,
        roughness: 0.85,
      });
    }
    return { dark: this.defaultCrownDarkMat, light: this.defaultCrownLightMat };
  }

  private createTreeMesh(
    scale: number,
    useDarkCrown: boolean,
    trunkMat: THREE.Material,
    crownMatDark: THREE.Material,
    crownMatLight: THREE.Material,
    birdhouseFacingAngle?: number
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

    // An jedem 10. lebenden Baum einen Nistkasten montieren
    const isBurnedTree = this.burnedTrunkMat !== null && trunkMat === this.burnedTrunkMat;
    if (!isBurnedTree) {
      this.treeCounter++;
      if (this.treeCounter % 10 === 0) {
        const birdhouse = createBirdhouse(scale);
        // Nistkasten auf gut sichtbarer Stammhöhe unterhalb der Baumkrone anbringen (ca. 0.82 * scale)
        const trunkRadiusAtHeight = 0.274 * scale;
        const angle =
          birdhouseFacingAngle !== undefined
            ? birdhouseFacingAngle
            : (this.treeCounter * 1.618) % (Math.PI * 2);

        const bx = Math.sin(angle) * trunkRadiusAtHeight;
        const bz = Math.cos(angle) * trunkRadiusAtHeight;

        birdhouse.position.set(bx, 0.82 * scale, bz);
        birdhouse.rotation.y = angle;
        tree.add(birdhouse);
      }
    }

    return tree;
  }

  private isNearCurvedCorridor(
    x: number,
    z: number,
    waypoints: readonly PathPoint2D[],
    endClearing?: { x: number; z: number; radius: number },
    minDistance = 3.2
  ): boolean {
    if (endClearing && Math.hypot(x - endClearing.x, z - endClearing.z) < endClearing.radius + 2.8) {
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
    if (Math.hypot(x - POND_CENTER_POS.x, z - POND_CENTER_POS.z) < POND_CENTER_POS.radius + 0.3) {
      return true;
    }
    return this.isNearCurvedCorridor(x, z, PATH_2_WAYPOINTS, undefined, minDistance);
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

  private isNearPath5Corridor(x: number, z: number, minDistance = 3.2): boolean {
    // Auch den Krater des feurigen Höllenschlunds von Waldbäumen freihalten
    if (Math.hypot(x - HELL_CHASM_POS.x, z - HELL_CHASM_POS.z) < HELL_CHASM_POS.radius + 1.8) {
      return true;
    }
    return this.isNearCurvedCorridor(x, z, PATH_5_WAYPOINTS, undefined, minDistance);
  }

  private isNearPath6Corridor(x: number, z: number, minDistance = 3.2): boolean {
    // Auch die Lichtung mit Jagdhütte und Kräutergarten von hohen Waldbäumen freihalten
    if (Math.hypot(x - HUNTING_LODGE_POS.x, z - HUNTING_LODGE_POS.z) < HUNTING_LODGE_POS.radius + 1.8) {
      return true;
    }
    return this.isNearCurvedCorridor(x, z, PATH_6_WAYPOINTS, PATH_6_END_CLEARING, minDistance);
  }

  private isNearPath7Corridor(x: number, z: number, minDistance = 3.2): boolean {
    // Auch den Vorplatz vor dem geschlossenen Tor von hohen Waldbäumen freihalten
    if (Math.hypot(x - CLOSED_GATE_POS.x, z - CLOSED_GATE_POS.z) < CLOSED_GATE_POS.radius + 1.8) {
      return true;
    }
    return this.isNearCurvedCorridor(x, z, PATH_7_WAYPOINTS, PATH_7_END_CLEARING, minDistance);
  }

  /**
   * Prüft strikt, ob sich eine Koordinate auf den grünen Waldboden-Flächen befindet
   * und ausreichend Abstand zu allen braunen Wegen, Plätzen, Teichen, Felsen und Bauten hält.
   */
  private isPositionOnGreenGrass(x: number, z: number): boolean {
    // 1. Zentrale Lichtung / brauner Kreuzungsplatz (Radius 7.0m + 1.2m Puffer)
    if (Math.hypot(x, z) < 8.2) {
      return false;
    }

    // Zu weit außerhalb der Spielwelt
    if (Math.hypot(x, z) > 70.0) {
      return false;
    }

    // 2. Ausreichender Abstand zu allen kurvigen Wegen 1 bis 7 und deren Vorplätzen (minDistance 2.8m)
    if (
      this.isNearPath1Corridor(x, z, 2.8) ||
      this.isNearPath2Corridor(x, z, 2.8) ||
      this.isNearPath3Corridor(x, z, 2.8) ||
      this.isNearPath4Corridor(x, z, 2.8) ||
      this.isNearPath5Corridor(x, z, 4.0) ||
      this.isNearPath6Corridor(x, z, 2.8) ||
      this.isNearPath7Corridor(x, z, 2.8)
    ) {
      return false;
    }

    // 3. Das geschlossene Tor und die flankierenden Steinmauern
    if (Math.hypot(x - CLOSED_GATE_POS.x, z - CLOSED_GATE_POS.z) < 7.2) {
      return false;
    }

    // 4. Besondere Schauplätze, Vorplätze und Bauten
    // Nixenteich-Wasserfläche und Vorplatz
    if (Math.hypot(x - POND_CENTER_POS.x, z - POND_CENTER_POS.z) < POND_CENTER_POS.radius + 2.0) {
      return false;
    }
    // Wehrbrücke, Stausee & Bachbett
    if (Math.hypot(x - WEIR_BRIDGE_POS.x, z - WEIR_BRIDGE_POS.z) < 11.0) {
      return false;
    }
    // Holzfällerlager-Vorplatz & Rodungsfläche
    if (Math.hypot(x - LUMBER_CAMP_POS.x, z - LUMBER_CAMP_POS.z) < LUMBER_CAMP_POS.radius + 2.0) {
      return false;
    }
    // Feuriger Höllenschlund & Lavakrater
    if (Math.hypot(x - HELL_CHASM_POS.x, z - HELL_CHASM_POS.z) < HELL_CHASM_POS.radius + 2.5) {
      return false;
    }
    // Jagdhütte, Vorplatz & Kräutergarten
    if (Math.hypot(x - HUNTING_LODGE_POS.x, z - HUNTING_LODGE_POS.z) < HUNTING_LODGE_POS.radius + 2.0) {
      return false;
    }
    // Bergmassiv mit Stollenmundloch
    if (Math.hypot(x - CAVE_ENTRANCE_POS.x, z - CAVE_ENTRANCE_POS.z) < 7.0) {
      return false;
    }

    return true;
  }

  private buildForestRing(): void {
    const trunkMat = this.getTrunkMaterial();
    const { dark: crownMatDark, light: crownMatLight } = this.getCrownMaterials();

    for (let i = 0; i < SEVEN_PATHS.length; i++) {
      const baseAngle = SEVEN_PATHS[i].angleRad + Math.PI / 7;

      for (let r = 9.2; r <= 44; r += 3.8) {
        for (const offset of [-0.16, 0, 0.16]) {
          const angle = baseAngle + offset + Math.sin(r * (i + 1)) * 0.05;
          const x = Math.sin(angle) * r;
          const z = -Math.cos(angle) * r;

          // Keine Bäume auf die kurvigen Korridore von Weg 1 bis Weg 7 setzen
          if (
            this.isNearPath1Corridor(x, z, 3.0) ||
            this.isNearPath2Corridor(x, z, 3.0) ||
            this.isNearPath3Corridor(x, z, 3.0) ||
            this.isNearPath4Corridor(x, z, 3.0) ||
            this.isNearPath5Corridor(x, z, 3.0) ||
            this.isNearPath6Corridor(x, z, 3.0) ||
            this.isNearPath7Corridor(x, z, 3.0)
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
    const trunkMat = this.getTrunkMaterial();
    const { dark: crownMatDark, light: crownMatLight } = this.getCrownMaterials();

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
          // Nistkasten zur Wegmitte ausrichten, damit er vom Pfad aus sichtbar ist
          const angleToPath = Math.atan2(curr.x - tx, curr.z - tz);
          const tree = this.createTreeMesh(
            scale,
            (i + side) % 2 === 0,
            trunkMat,
            crownMatDark,
            crownMatLight,
            angleToPath
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
    const trunkMat = this.getTrunkMaterial();
    const { dark: crownMatDark, light: crownMatLight } = this.getCrownMaterials();

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
          // Nistkasten zur Wegmitte ausrichten, damit er vom Pfad aus sichtbar ist
          const angleToPath = Math.atan2(curr.x - tx, curr.z - tz);
          const tree = this.createTreeMesh(
            scale,
            (i + side) % 2 === 0,
            trunkMat,
            crownMatDark,
            crownMatLight,
            angleToPath
          );
          tree.position.set(tx, 0, tz);
          this.scene.add(tree);
        }
      }
    }

    // Malerischer Baumkranz nah um das Nord-, Ost- und Südufer des Teichs (Westufer ist der Wegzugang)
    const pondTreeAngles = [
      -1.85, -1.45, -1.05, -0.65, -0.25, 0.15, 0.55, 0.95, 1.35, 1.75, 2.1,
    ];
    pondTreeAngles.forEach((angle, idx) => {
      for (const ringRadius of [5.2, 7.2]) {
        const tx = POND_CENTER_POS.x + Math.cos(angle + (ringRadius > 6.5 ? 0.14 : 0)) * ringRadius;
        const tz = POND_CENTER_POS.z + Math.sin(angle + (ringRadius > 6.5 ? 0.14 : 0)) * ringRadius;
        if (
          this.isNearCurvedCorridor(tx, tz, PATH_2_WAYPOINTS, undefined, 2.2) ||
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
    const trunkMat = this.getTrunkMaterial();
    const { dark: crownMatDark, light: crownMatLight } = this.getCrownMaterials();

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
          // Nistkasten zur Wegmitte ausrichten, damit er vom Pfad aus sichtbar ist
          const angleToPath = Math.atan2(curr.x - tx, curr.z - tz);
          const tree = this.createTreeMesh(
            scale,
            (i + side) % 2 === 0,
            trunkMat,
            crownMatDark,
            crownMatLight,
            angleToPath
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
    const trunkMat = this.getTrunkMaterial();
    const { dark: crownMatDark, light: crownMatLight } = this.getCrownMaterials();

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
          // Nistkasten zur Wegmitte ausrichten, damit er vom Pfad aus sichtbar ist
          const angleToPath = Math.atan2(curr.x - tx, curr.z - tz);
          const tree = this.createTreeMesh(
            scale,
            (i + side) % 2 === 0,
            trunkMat,
            crownMatDark,
            crownMatLight,
            angleToPath
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

  /**
   * Platziert aschige, verbrannte Nadelbäume und schroffe Basaltfelsen entlang von Weg 5 zum Höllenschlund.
   */
  private buildCurvedPath5Trees(): void {
    const trunkMat = this.getTrunkMaterial(true);
    const { dark: crownMatDark, light: crownMatLight } = this.getCrownMaterials(true);

    // Glühende, spitze Lavasteine mit Adern entlang des Pfades
    const lavaRockTex = createVeinedLavaRockTexture();
    if (lavaRockTex.map) lavaRockTex.map.repeat.set(1.2, 2.0);
    if (lavaRockTex.emissiveMap) lavaRockTex.emissiveMap.repeat.set(1.2, 2.0);
    if (lavaRockTex.bumpMap) lavaRockTex.bumpMap.repeat.set(1.2, 2.0);

    const basaltMat = new THREE.MeshStandardMaterial({
      color: 0x161313,
      map: lavaRockTex.map ?? undefined,
      emissiveMap: lavaRockTex.emissiveMap ?? undefined,
      emissive: new THREE.Color(0xff3300),
      emissiveIntensity: 1.6,
      bumpMap: lavaRockTex.bumpMap ?? undefined,
      bumpScale: 0.1,
      roughness: 0.88,
      metalness: 0.22,
      flatShading: true,
    });

    for (let i = 1; i < PATH_5_WAYPOINTS.length - 1; i++) {
      const prev = PATH_5_WAYPOINTS[i - 1];
      const curr = PATH_5_WAYPOINTS[i];
      const next = PATH_5_WAYPOINTS[i + 1];

      const dirX = next.x - prev.x;
      const dirZ = next.z - prev.z;
      const len = Math.hypot(dirX, dirZ) || 1;
      const perpX = -dirZ / len;
      const perpZ = dirX / len;

      for (const side of [-1, 1]) {
        for (const dist of [3.5, 6.4]) {
          const tx = curr.x + perpX * side * dist;
          const tz = curr.z + perpZ * side * dist;
          if (this.isNearPath5Corridor(tx, tz, 2.7)) {
            continue;
          }

          if ((i + Math.round(dist)) % 3 === 0) {
            // Basaltfelsformation am Wegesrand
            const rock = new THREE.Mesh(
              new THREE.ConeGeometry(0.8 + (i % 2) * 0.4, 1.8 + (i % 3) * 0.5, 5),
              basaltMat
            );
            rock.position.set(tx, 0.9, tz);
            rock.rotation.y = (i + side) * 0.7;
            rock.castShadow = true;
            this.scene.add(rock);
          } else {
            // Verbrannter Nadelbaum
            const scale = 0.95 + ((i + Math.round(dist)) % 3) * 0.16;
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
    }
  }

  /**
   * Platziert Bäume beidseitig entlang des 6. Weges (Jägerpfad) bis zur Lichtung mit der Jagdhütte.
   */
  private buildCurvedPath6Trees(): void {
    const trunkMat = this.getTrunkMaterial();
    const { dark: crownMatDark, light: crownMatLight } = this.getCrownMaterials();

    for (let i = 1; i < PATH_6_WAYPOINTS.length - 1; i++) {
      const prev = PATH_6_WAYPOINTS[i - 1];
      const curr = PATH_6_WAYPOINTS[i];
      const next = PATH_6_WAYPOINTS[i + 1];

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
            this.isNearPath6Corridor(tx, tz, 2.7) ||
            this.isNearPath5Corridor(tx, tz, 2.7) ||
            this.isNearPath1Corridor(tx, tz, 2.7)
          ) {
            continue;
          }
          const scale = 0.95 + ((i + Math.round(dist)) % 3) * 0.15;
          // Nistkasten zur Wegmitte ausrichten, damit er vom Pfad aus sichtbar ist
          const angleToPath = Math.atan2(curr.x - tx, curr.z - tz);
          const tree = this.createTreeMesh(
            scale,
            (i + side) % 2 === 0,
            trunkMat,
            crownMatDark,
            crownMatLight,
            angleToPath
          );
          tree.position.set(tx, 0, tz);
          this.scene.add(tree);
        }
      }
    }

    // Zusätzliche Bäume rund um die Lichtung der Jagdhütte
    const lodgeClearingTrees: [number, number, number, boolean][] = [
      [-49.5, 18.5, 1.25, true],
      [-50.2, 22.8, 1.35, false],
      [-48.8, 27.2, 1.2, true],
      [-44.5, 30.2, 1.3, false],
      [-40.2, 28.5, 1.15, true],
      [-37.5, 25.8, 1.22, false],
      [-38.2, 16.5, 1.18, true],
      [-42.6, 15.2, 1.32, false],
      [-46.8, 14.8, 1.28, true],
    ];

    for (const [x, z, scale, dark] of lodgeClearingTrees) {
      if (!this.isNearPath6Corridor(x, z, 3.2)) {
        const tree = this.createTreeMesh(scale, dark, trunkMat, crownMatDark, crownMatLight);
        tree.position.set(x, 0, z);
        this.scene.add(tree);
      }
    }
  }

  /**
   * Platziert Bäume entlang von Weg 7 (Torweg) und dichten Berg- und Nebelwald
   * rund um den Vorplatz sowie hinter den Steinmauern des geschlossenen Tores.
   */
  private buildCurvedPath7Trees(): void {
    const trunkMat = this.getTrunkMaterial();
    const { dark: crownMatDark, light: crownMatLight } = this.getCrownMaterials();

    for (let i = 1; i < PATH_7_WAYPOINTS.length - 1; i++) {
      const prev = PATH_7_WAYPOINTS[i - 1];
      const curr = PATH_7_WAYPOINTS[i];
      const next = PATH_7_WAYPOINTS[i + 1];

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
            this.isNearPath7Corridor(tx, tz, 2.7) ||
            this.isNearPath6Corridor(tx, tz, 2.7) ||
            this.isNearPath1Corridor(tx, tz, 2.7)
          ) {
            continue;
          }
          const scale = 0.95 + ((i + Math.round(dist)) % 3) * 0.15;
          // Nistkasten zur Wegmitte ausrichten, damit er vom Pfad aus sichtbar ist
          const angleToPath = Math.atan2(curr.x - tx, curr.z - tz);
          const tree = this.createTreeMesh(
            scale,
            (i + side) % 2 === 0,
            trunkMat,
            crownMatDark,
            crownMatLight,
            angleToPath
          );
          tree.position.set(tx, 0, tz);
          this.scene.add(tree);
        }
      }
    }

    // Dichte Fichten und Bergwaldbäume hinter und seitlich der Steinmauern des Tores
    const gateCos = Math.cos(CLOSED_GATE_POS.rotationY);
    const gateSin = Math.sin(CLOSED_GATE_POS.rotationY);
    const gateTreesLocal: [number, number, number, boolean][] = [
      // Direkt hinter den Mauern und dem Tor (lokales Z < -2.0)
      [-10.5, -3.2, 1.35, true],
      [-7.2, -4.5, 1.4, false],
      [-3.8, -3.8, 1.3, true],
      [0.0, -4.2, 1.45, false],
      [3.8, -3.8, 1.3, true],
      [7.2, -4.5, 1.4, false],
      [10.5, -3.2, 1.35, true],

      // Zweite Reihe tiefer im Bergwald dahinter
      [-9.0, -7.5, 1.45, false],
      [-4.5, -8.0, 1.5, true],
      [0.0, -8.2, 1.55, false],
      [4.5, -8.0, 1.5, true],
      [9.0, -7.5, 1.45, false],

      // Flankierende Bäume am Rand des Vorplatzes vor den Mauern
      [-11.5, 2.5, 1.25, false],
      [-10.2, 6.0, 1.3, true],
      [11.5, 2.5, 1.25, false],
      [10.2, 6.0, 1.3, true],
    ];

    for (const [lx, lz, scale, dark] of gateTreesLocal) {
      const wx = CLOSED_GATE_POS.x + lx * gateCos + lz * gateSin;
      const wz = CLOSED_GATE_POS.z - lx * gateSin + lz * gateCos;
      if (!this.isNearPath7Corridor(wx, wz, 3.0)) {
        const tree = this.createTreeMesh(scale, dark, trunkMat, crownMatDark, crownMatLight);
        tree.position.set(wx, 0, wz);
        this.scene.add(tree);
      }
    }
  }

  /**
   * Verteilt farbenfrohe Waldblumen (Buschwindröschen, Vergissmeinnicht, Waldglockenblumen,
   * Goldhahnenfuß und Waldnelken) auf den Waldwiesen links und rechts von Weg 7.
   */
  private buildPath7Wildflowers(): void {
    const waypoints = PATH_7_WAYPOINTS;
    const availableTypes: FlowerType[] = [
      'anemone',
      'forget_me_not',
      'bellflower',
      'buttercup',
      'campion',
      'mixed',
    ];

    // 1. Entlang der Segmente von Weg 7 auf den Waldwiesen beidseitig
    for (let i = 0; i < waypoints.length - 1; i++) {
      const a = waypoints[i];
      const b = waypoints[i + 1];
      const dx = b.x - a.x;
      const dz = b.z - a.z;
      const len = Math.hypot(dx, dz);
      if (len < 0.001) continue;

      const ux = dx / len;
      const uz = dz / len;
      const perpX = -uz;
      const perpZ = ux;

      const tSteps = [0.15, 0.35, 0.55, 0.75, 0.92];

      for (const t of tSteps) {
        const segX = a.x + dx * t;
        const segZ = a.z + dz * t;

        for (const side of [-1, 1]) {
          // Verschiedene Abstände auf der Wiese (ab 1.6m bis ca. 7.5m)
          const distOptions = [1.65, 2.8, 4.2, 5.8, 7.2];
          for (let dIdx = 0; dIdx < distOptions.length; dIdx++) {
            // Natürliche Tuff-Gruppierung
            if ((i * 3 + Math.round(t * 10) + dIdx + (side > 0 ? 1 : 0)) % 2 !== 0) {
              continue;
            }

            const baseDist = distOptions[dIdx];
            const jitterDist = baseDist + Math.sin(t * 11.0 + side * 4.0) * 0.35;
            const jitterAlong = Math.cos(t * 9.0 + dIdx * 2.5) * 0.4;

            const fx = segX + ux * jitterAlong + perpX * side * jitterDist;
            const fz = segZ + uz * jitterAlong + perpZ * side * jitterDist;

            // Nicht auf dem Weg selbst
            if (this.isNearCurvedCorridor(fx, fz, PATH_7_WAYPOINTS, undefined, 1.45)) {
              continue;
            }

            // Nicht auf der zentralen Kreuzungslichtung
            if (Math.hypot(fx, fz) < 8.2) {
              continue;
            }

            // Nicht im Korridor von Weg 6 oder Weg 1
            if (this.isNearPath6Corridor(fx, fz, 2.6) || this.isNearPath1Corridor(fx, fz, 2.6)) {
              continue;
            }

            // Nicht auf dem Vorplatz des Tores
            if (Math.hypot(fx - CLOSED_GATE_POS.x, fz - CLOSED_GATE_POS.z) < CLOSED_GATE_POS.radius + 0.4) {
              continue;
            }

            // Strikte Prüfung: muss sich auf dem kreisförmigen grünen Waldboden befinden
            if (Math.hypot(fx, fz) > 105) {
              continue;
            }

            const typeIdx = (i * 3 + Math.round(t * 7) + dIdx + (side > 0 ? 2 : 0)) % availableTypes.length;
            const type = availableTypes[typeIdx];
            const scale = 0.88 + ((i + dIdx) % 3) * 0.12;
            const rotationY = (i * 1.5 + t * 4 + side) * 1.2;

            const cluster = createFlowerCluster({ type, scale, rotationY });
            cluster.group.position.set(fx, 0, fz);
            this.scene.add(cluster.group);
          }
        }
      }
    }

    // 2. Zusätzliche idyllische Blumeninseln auf den Wiesen rund um den Vorplatz des geschlossenen Tores
    const gateClearingFlowers: Array<{ lx: number; lz: number; type: FlowerType; scale: number }> = [
      { lx: -8.5, lz: 4.5, type: 'anemone', scale: 1.05 },
      { lx: -6.2, lz: 7.2, type: 'bellflower', scale: 0.95 },
      { lx: -9.8, lz: 1.5, type: 'forget_me_not', scale: 1.1 },
      { lx: 8.5, lz: 4.8, type: 'buttercup', scale: 1.0 },
      { lx: 6.8, lz: 7.5, type: 'campion', scale: 1.05 },
      { lx: 9.6, lz: 1.8, type: 'mixed', scale: 0.95 },
      { lx: -4.5, lz: 8.2, type: 'forget_me_not', scale: 1.0 },
      { lx: 4.8, lz: 8.0, type: 'anemone', scale: 1.05 },
    ];

    const gateCos = Math.cos(CLOSED_GATE_POS.rotationY);
    const gateSin = Math.sin(CLOSED_GATE_POS.rotationY);

    for (const spot of gateClearingFlowers) {
      const wx = CLOSED_GATE_POS.x + spot.lx * gateCos + spot.lz * gateSin;
      const wz = CLOSED_GATE_POS.z - spot.lx * gateSin + spot.lz * gateCos;

      if (
        Math.hypot(wx, wz) >= 8.2 &&
        Math.hypot(wx - CLOSED_GATE_POS.x, wz - CLOSED_GATE_POS.z) >= CLOSED_GATE_POS.radius + 0.3 &&
        !this.isNearCurvedCorridor(wx, wz, PATH_7_WAYPOINTS, undefined, 2.2)
      ) {
        const cluster = createFlowerCluster({
          type: spot.type,
          scale: spot.scale,
          rotationY: Math.random() * Math.PI * 2,
        });
        cluster.group.position.set(wx, 0, wz);
        this.scene.add(cluster.group);
      }
    }
  }

  /**
   * Verteilt idyllische Waldpilze (Fliegenpilze, Steinpilze, Pfifferlinge und bunte Mischgruppen)
   * ausschließlich auf den grünen Waldboden-Flächen unter den Bäumen – niemals auf braunen Wegen oder Plätzen.
   */
  private buildForestMushrooms(): void {
    // 1. Pilze unter Bäumen im dichten Waldring zwischen den 7 Pfaden
    for (let i = 0; i < SEVEN_PATHS.length; i++) {
      const baseAngle = SEVEN_PATHS[i].angleRad + Math.PI / 7;

      for (let r = 10.2; r <= 36; r += 3.8) {
        // Natürlicher Rhythmus: nicht unter jedem Baum, sondern alle paar Schritte
        if ((i * 3 + Math.round(r)) % 3 !== 0) {
          continue;
        }

        const offset = (i + Math.round(r)) % 2 === 0 ? 0.08 : -0.08;
        const angle = baseAngle + offset;
        const bx = Math.sin(angle) * r;
        const bz = -Math.cos(angle) * r;

        // Direkt unter dem Baum am Fuß des Stammes platzieren
        const shiftAngle = angle + 1.25;
        const mx = bx + Math.cos(shiftAngle) * 0.55;
        const mz = bz + Math.sin(shiftAngle) * 0.55;

        // Strikte Prüfung: Pilze dürfen ausschließlich auf Grünflächen stehen
        if (!this.isPositionOnGreenGrass(mx, mz)) {
          continue;
        }

        const types: MushroomType[] = ['fly_agaric', 'bolete', 'chanterelle', 'mixed'];
        const type = types[(i + Math.round(r / 2)) % types.length];
        const scale = 0.82 + ((i + Math.round(r)) % 3) * 0.12;

        const cluster = createMushroomCluster({
          type,
          scale,
          rotationY: shiftAngle,
        });
        cluster.group.position.set(mx, 0, mz);
        this.scene.add(cluster.group);
      }
    }

    // 2. Gezielte Pilznester an markanten Waldbäumen auf echten Grünflächen
    const specificMushroomSpots: Array<{
      x: number;
      z: number;
      type: MushroomType;
      scale: number;
    }> = [
      // Am Waldrand um die Kreuzung (auf den grünen Grasflächen zwischen den 7 Wegen)
      { x: -4.8, z: -9.8, type: 'fly_agaric', scale: 0.95 },
      { x: 5.2, z: -9.8, type: 'bolete', scale: 1.05 },
      { x: 10.8, z: -2.6, type: 'chanterelle', scale: 0.9 },
      { x: 8.8, z: 7.2, type: 'fly_agaric', scale: 1.0 },
      { x: -8.8, z: 7.2, type: 'mixed', scale: 0.92 },
      { x: -11.0, z: -2.4, type: 'bolete', scale: 0.95 },

      // Weg 1 (Silberstollen): Im dichten Fichtenwald unter den Bergbäumen
      { x: -4.8, z: -18.5, type: 'fly_agaric', scale: 0.95 },
      { x: -4.6, z: -25.8, type: 'bolete', scale: 1.0 },
      { x: 2.2, z: -35.5, type: 'chanterelle', scale: 0.9 },
      { x: 8.2, z: -43.0, type: 'mixed', scale: 0.88 },

      // Weg 2 (Nixenteich): Am moosigen Waldbodensaum
      { x: 12.8, z: -17.5, type: 'chanterelle', scale: 1.0 },
      { x: 18.5, z: -21.8, type: 'fly_agaric', scale: 0.92 },
      { x: 27.2, z: -24.5, type: 'bolete', scale: 1.05 },

      // Weg 3 (Wehrbrücke / Quellenweg): Unter den Auwaldbäumen
      { x: 14.8, z: -2.2, type: 'bolete', scale: 1.05 },
      { x: 21.2, z: 4.5, type: 'chanterelle', scale: 0.95 },
      { x: 25.8, z: 8.8, type: 'fly_agaric', scale: 1.0 },

      // Weg 4 (Holzfällerlager): Im Fichtenwald vor der Rodung
      { x: 9.8, z: 18.2, type: 'fly_agaric', scale: 1.05 },
      { x: 14.2, z: 25.8, type: 'bolete', scale: 0.95 },
      { x: 17.8, z: 34.2, type: 'mixed', scale: 1.0 },

      // Weg 6 (Jägerpfad): Im urigen Jagdrevierwald
      { x: -16.8, z: 10.8, type: 'fly_agaric', scale: 1.0 },
      { x: -24.8, z: 14.5, type: 'bolete', scale: 1.05 },
      { x: -32.5, z: 15.2, type: 'mixed', scale: 0.95 },
      { x: -35.2, z: 28.5, type: 'chanterelle', scale: 0.95 },

      // Weg 7 (Torweg): Im uralten Nebel- und Bergwald vor dem verschlossenen Tor
      { x: -14.5, z: -16.2, type: 'bolete', scale: 1.0 },
      { x: -22.2, z: -25.5, type: 'fly_agaric', scale: 0.95 },
      { x: -30.8, z: -27.8, type: 'mixed', scale: 1.05 },
      { x: -36.5, z: -37.2, type: 'chanterelle', scale: 0.95 },
    ];

    for (const spot of specificMushroomSpots) {
      // Sicherheitsüberprüfung: niemals auf braunen Wegen oder Plätzen platzieren
      if (!this.isPositionOnGreenGrass(spot.x, spot.z)) {
        continue;
      }

      const cluster = createMushroomCluster({
        type: spot.type,
        scale: spot.scale,
        rotationY: Math.sin(spot.x * 2.3 + spot.z) * Math.PI,
      });
      cluster.group.position.set(spot.x, 0, spot.z);
      this.scene.add(cluster.group);
    }
  }

  /**
   * Errichtet eine monumentale, schroffe Felsenkulisse aus spitzen, hohen, dunklen Basalt- und Obsidianzacken
   * direkt hinter dem feurigen Höllenschlund am Ende von Weg 5.
   */
  private buildHellChasmBackdropRocks(): void {
    const rockGroup = new THREE.Group();
    rockGroup.name = 'HellChasmBackdropRocks';

    // Prozedurale Basalt- und Obsidianfels-Textur mit hellen roten, glühenden Magma-Adern
    const lavaRockTex = createVeinedLavaRockTexture();
    if (lavaRockTex.map) {
      lavaRockTex.map.repeat.set(1.5, 3.2);
    }
    if (lavaRockTex.emissiveMap) {
      lavaRockTex.emissiveMap.repeat.set(1.5, 3.2);
    }
    if (lavaRockTex.bumpMap) {
      lavaRockTex.bumpMap.repeat.set(1.5, 3.2);
    }

    const rockMats = [
      new THREE.MeshStandardMaterial({
        color: 0x161312,
        map: lavaRockTex.map ?? undefined,
        emissiveMap: lavaRockTex.emissiveMap ?? undefined,
        emissive: new THREE.Color(0xff3300),
        emissiveIntensity: 2.0,
        bumpMap: lavaRockTex.bumpMap ?? undefined,
        bumpScale: 0.12,
        roughness: 0.88,
        metalness: 0.22,
        flatShading: true,
      }),
      new THREE.MeshStandardMaterial({
        color: 0x221a17,
        map: lavaRockTex.map ?? undefined,
        emissiveMap: lavaRockTex.emissiveMap ?? undefined,
        emissive: new THREE.Color(0xff4408),
        emissiveIntensity: 1.8,
        bumpMap: lavaRockTex.bumpMap ?? undefined,
        bumpScale: 0.1,
        roughness: 0.9,
        metalness: 0.18,
        flatShading: true,
      }),
      new THREE.MeshStandardMaterial({
        color: 0x2a1e1a,
        map: lavaRockTex.map ?? undefined,
        emissiveMap: lavaRockTex.emissiveMap ?? undefined,
        emissive: new THREE.Color(0xff2200),
        emissiveIntensity: 1.6,
        bumpMap: lavaRockTex.bumpMap ?? undefined,
        bumpScale: 0.1,
        roughness: 0.86,
        metalness: 0.24,
        flatShading: true,
      }),
    ];

    // Felsformationen: [relX, relZ, baseRadius, height, rotY, tiltX, tiltZ, matIndex]
    // Relativ zum Kraterzentrum HELL_CHASM_POS (-22.5, 52.0)
    const rockConfigs: [number, number, number, number, number, number, number, number][] = [
      // Zentrale gewaltige Felszacken direkt hinter dem Krater
      [0.0, 10.8, 3.8, 19.5, 0.4, 0.08, 0.02, 0],
      [-3.2, 11.6, 3.2, 16.8, 1.2, 0.06, -0.07, 1],
      [3.5, 11.2, 3.4, 17.4, 2.1, 0.07, 0.06, 2],
      // Linke Felsflanke (Westen)
      [-6.5, 9.8, 2.9, 14.2, 0.8, 0.05, -0.1, 0],
      [-9.8, 8.2, 2.6, 12.5, 1.6, 0.04, -0.12, 1],
      [-12.4, 5.8, 2.4, 10.8, 2.4, 0.03, -0.09, 2],
      // Rechte Felsflanke (Osten)
      [6.8, 9.6, 3.0, 15.0, 1.1, 0.05, 0.09, 1],
      [10.2, 7.8, 2.7, 13.0, 2.3, 0.04, 0.11, 2],
      [12.8, 5.2, 2.3, 11.2, 0.6, 0.03, 0.08, 0],
      // Hoher Gebirgsgrat in der zweiten Reihe dahinter
      [-1.8, 15.2, 4.5, 23.0, 0.3, 0.06, -0.03, 0],
      [2.2, 15.8, 4.2, 21.5, 1.7, 0.07, 0.04, 1],
      [-5.8, 14.5, 3.6, 18.5, 2.8, 0.05, -0.06, 2],
      [6.2, 14.0, 3.8, 19.0, 0.9, 0.06, 0.05, 0],
      [-10.2, 12.8, 3.3, 15.5, 1.9, 0.04, -0.08, 1],
      [10.6, 12.2, 3.4, 16.0, 2.5, 0.05, 0.07, 2],
      // Vorgelagerte scharfe Felsnadeln
      [-1.2, 8.2, 1.8, 9.5, 0.5, 0.04, 0.03, 1],
      [2.0, 8.6, 1.9, 10.2, 1.8, 0.05, -0.04, 0],
    ];

    for (const [rx, rz, baseRadius, height, rotY, tiltX, tiltZ, matIdx] of rockConfigs) {
      const rockMesh = new THREE.Mesh(
        new THREE.ConeGeometry(baseRadius, height, 6),
        rockMats[matIdx]
      );
      rockMesh.position.set(
        HELL_CHASM_POS.x + rx,
        height / 2 - 0.4,
        HELL_CHASM_POS.z + rz
      );
      rockMesh.rotation.set(tiltX, rotY, tiltZ);
      rockMesh.castShadow = true;
      rockMesh.receiveShadow = true;
      rockGroup.add(rockMesh);
    }

    this.scene.add(rockGroup);
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
    // Ermöglicht vollen Kamerablick: von horizontal nach vorn (0 Rad) bis zu 90 Grad (Vogelperspektive)
    this.cameraPitch = Math.max(-0.06, Math.min(Math.PI / 2 - 0.03, this.cameraPitch + deltaPitch));
  }

  public zoomCamera(deltaZoom: number): void {
    this.cameraDistance = Math.max(5.5, Math.min(14.5, this.cameraDistance + deltaZoom));
  }

  /**
   * Setzt die Kamera und Spielfigur nach einem Schnellreise-Sprung sofort auf die Zielposition.
   */
  public snapCameraToPlayer(playerPos: Readonly<Vector2D>): void {
    this.lastPlayerPos = { x: playerPos.x, z: playerPos.z };
    this.playerGroup.position.set(playerPos.x, 0, playerPos.z);
    this.playerGroup.rotation.y = 0;
    this.cameraOrbitAngle = 0;

    const targetY = 1.1;
    const horizontalDist = Math.cos(this.cameraPitch) * this.cameraDistance;
    const camHeight = Math.max(0.55, targetY + Math.sin(this.cameraPitch) * this.cameraDistance);
    const targetCamX = playerPos.x + Math.sin(this.cameraOrbitAngle) * horizontalDist;
    const targetCamZ = playerPos.z + Math.cos(this.cameraOrbitAngle) * horizontalDist;

    this.camera.position.set(targetCamX, camHeight, targetCamZ);
    this.camera.lookAt(playerPos.x, targetY, playerPos.z);
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

  public setDevilHovered(hovered: boolean): void {
    this.isDevilHovered = hovered;
  }

  public setWildHunterHovered(hovered: boolean): void {
    this.isWildHunterHovered = hovered;
  }

  public setWoodWomanLodgeHovered(hovered: boolean): void {
    this.isWoodWomanLodgeHovered = hovered;
  }

  public setChestHovered(hovered: boolean): void {
    this.isChestHovered = hovered;
  }

  public setGateHovered(hovered: boolean): void {
    this.isGateHovered = hovered;
  }

  public setBoulderHovered(hovered: boolean): void {
    this.isBoulderHovered = hovered;
  }

  public setPuddleHovered(hovered: boolean): void {
    this.isPuddleHovered = hovered;
  }

  public setStreamHovered(hovered: boolean): void {
    this.isStreamHovered = hovered;
  }

  public setLogHovered(hovered: boolean): void {
    this.isLogHovered = hovered;
  }

  public setFireHovered(hovered: boolean): void {
    this.isFireHovered = hovered;
  }

  public setHerbsHovered(hovered: boolean): void {
    this.isHerbsHovered = hovered;
  }

  public pulseGemstone(pathId: number): void {
    this.gemstonePulseTimers.set(pathId, 1.3);
  }

  public triggerGuideCheers(): void {
    this.guideNpc.triggerCheers();
  }

  public removePath1BoulderVisual(onComplete?: () => void): void {
    this.path1Boulder.startDissolve(onComplete);
  }

  public isPath1BoulderRemoved(): boolean {
    return this.path1Boulder.isRemoved();
  }

  public removePath2PuddleVisual(onComplete?: () => void): void {
    this.path2Puddle.startDissolve(onComplete);
  }

  public isPath2PuddleRemoved(): boolean {
    return this.path2Puddle.isRemoved();
  }

  public removePath3StreamVisual(onComplete?: () => void): void {
    this.path3Stream.startDissolve(onComplete);
  }

  public isPath3StreamRemoved(): boolean {
    return this.path3Stream.isRemoved();
  }

  public removePath4LogVisual(onComplete?: () => void): void {
    this.path4Log.startDissolve(onComplete);
  }

  public isPath4LogRemoved(): boolean {
    return this.path4Log.isRemoved();
  }

  public removePath5FireVisual(onComplete?: () => void): void {
    this.path5Fire.startDissolve(onComplete);
  }

  public isPath5FireRemoved(): boolean {
    return this.path5Fire.isRemoved();
  }

  public removePath6HerbsVisual(onComplete?: () => void): void {
    this.path6Herbs.startDissolve(onComplete);
  }

  public isPath6HerbsRemoved(): boolean {
    return this.path6Herbs.isRemoved();
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

      if (data.interactableType === 'gate') {
        return { kind: 'gate', point };
      }
      if (data.interactableType === 'gemstone' && typeof data.pathId === 'number') {
        return { kind: 'gemstone', pathId: data.pathId, point };
      }
      if (data.interactableType === 'wild_hunter') {
        return { kind: 'wild_hunter', point };
      }
      if (data.interactableType === 'wood_woman_lodge') {
        return { kind: 'wood_woman_lodge', point };
      }
      if (data.interactableType === 'hunting_lodge') {
        return { kind: 'hunting_lodge', point };
      }
      if (data.interactableType === 'herb_garden') {
        return { kind: 'herb_garden', point };
      }
      if (data.interactableType === 'devil') {
        return { kind: 'devil', point };
      }
      if (data.interactableType === 'hell_chasm') {
        return { kind: 'hell_chasm', point };
      }
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

    // Alle sechs NPCs (Waldhüter Arvid, Graumännchen, Nixe, Riese, Holzweibchen, Teufel), Schauplätze und Schatztruhe animieren
    this.guideNpc.update(
      this.elapsedSeconds,
      playerPos,
      this.isNpcHovered || isDialogueActive,
      dtSeconds
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
    this.hellChasm.update(this.elapsedSeconds);
    this.devilNpc.update(
      this.elapsedSeconds,
      playerPos,
      this.isDevilHovered || isDialogueActive,
      dtSeconds
    );
    this.huntingLodge.update(this.elapsedSeconds);
    this.wildHunterNpc.update(
      this.elapsedSeconds,
      playerPos,
      this.isWildHunterHovered || isDialogueActive
    );
    this.woodWomanLodgeNpc.update(
      this.elapsedSeconds,
      playerPos,
      this.isWoodWomanLodgeHovered || isDialogueActive
    );
    this.closedGate.update(this.elapsedSeconds, playerPos, this.isGateHovered);
    this.path1Boulder.update(dtSeconds, this.isBoulderHovered);
    this.path2Puddle.update(dtSeconds, this.isPuddleHovered);
    this.path3Stream.update(dtSeconds, this.isStreamHovered);
    this.path4Log.update(dtSeconds, this.isLogHovered);
    this.path5Fire.update(dtSeconds, this.isFireHovered);
    this.path6Herbs.update(dtSeconds, this.isHerbsHovered);
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
    this.pathMeshes.forEach((mats, id) => {
      if (id === 5) return; // Weg 5 behält sein intensives feuerrotes Glut-Emissive
      const emColor =
        id === selectedPathId ? 0x2c220c : id === this.hoveredPathId ? 0x1b1507 : 0x000000;
      for (const m of mats) {
        m.emissive.setHex(emColor);
      }
    });

    // Dynamisches Glühen der Wiese und des feuerroten Weges im Bereich des Lavasees
    const groundPulse = 0.88 + 0.22 * Math.sin(this.elapsedSeconds * 2.8) + 0.1 * Math.cos(this.elapsedSeconds * 4.6);
    if (this.hellGroundInnerMat) {
      this.hellGroundInnerMat.emissiveIntensity = 1.4 * groundPulse;
    }
    if (this.hellGroundOuterMat) {
      this.hellGroundOuterMat.emissiveIntensity = 0.72 * groundPulse;
    }
    if (this.hellMeadowGlowMat) {
      this.hellMeadowGlowMat.emissiveIntensity = 0.4 * groundPulse;
    }
    for (let p = 0; p < this.path5SegmentMats.length; p++) {
      const baseInt = 0.4 + p * 0.22;
      this.path5SegmentMats[p].emissiveIntensity = baseInt * groundPulse;
    }

    // Edelstein am jeweils aktiven Storyweg (Weg 1 bis 7 bzw. aktuell gewählter Storyweg) leuchten lassen
    const pulse = 0.5 + 0.5 * Math.sin(this.elapsedSeconds * 3.2);
    this.pathGemstones.forEach((gem, id) => {
      const pulseTimer = this.gemstonePulseTimers.get(id) ?? 0;
      if (pulseTimer > 0) {
        this.gemstonePulseTimers.set(id, Math.max(0, pulseTimer - dtSeconds));
      }
      const flash = pulseTimer > 0 ? (pulseTimer / 1.3) * 2.8 : 0;

      const isStoryPath = id >= 1 && id <= 7;
      const isActiveQuestPath =
        selectedPathId !== null ? id === selectedPathId && isStoryPath : isStoryPath;

      if (isActiveQuestPath || flash > 0) {
        gem.material.emissive.setHex(gem.baseColor);
        gem.material.emissiveIntensity = 1.05 + pulse * 0.65 + flash;
        gem.light.intensity = 1.35 + pulse * 0.75 + flash * 1.8;
        gem.mesh.position.y = 0.65 + Math.sin(this.elapsedSeconds * 2.4 + id) * 0.05;
        gem.mesh.rotation.y = this.elapsedSeconds * (flash > 0 ? 3.6 : 1.1);
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


    // Dynamische Nebel- und Himmelanpassung:
    // Nähert sich die Spielfigur dem Höllenschlund am Ende des 5. Weges, färbt sich der Nebel unheilvoll dunkelrot/schwarz
    const distToDevil = Math.hypot(playerPos.x - DEVIL_NPC_POS.x, playerPos.z - DEVIL_NPC_POS.z);
    // Ab 36m beginnt die Verfinsterung, bei <= 14m ist voller aschig-dunkler Höllennebel
    const hellFogFactor = 1.0 - Math.min(1.0, Math.max(0.0, (distToDevil - 14.0) / 22.0));
    const targetFogColor = this.defaultFogColor.clone().lerp(this.hellFogColor, hellFogFactor);
    this.currentFogColor.lerp(targetFogColor, 0.05);

    this.scene.background = this.currentFogColor;
    if (this.scene.fog) {
      (this.scene.fog as THREE.Fog).color.copy(this.currentFogColor);
      const targetFar = THREE.MathUtils.lerp(22.0, 32.0, hellFogFactor);
      const targetNear = THREE.MathUtils.lerp(9.5, 7.5, hellFogFactor);
      (this.scene.fog as THREE.Fog).far = THREE.MathUtils.lerp((this.scene.fog as THREE.Fog).far, targetFar, 0.05);
      (this.scene.fog as THREE.Fog).near = THREE.MathUtils.lerp((this.scene.fog as THREE.Fog).near, targetNear, 0.05);
    }

    // Sanfte Verfolgerkamera mit Maus-Orbit, Neigung (Pitch) und Zoom (Distanz)
    const targetY = 1.1;
    const horizontalDist = Math.cos(this.cameraPitch) * this.cameraDistance;
    const camHeight = Math.max(0.55, targetY + Math.sin(this.cameraPitch) * this.cameraDistance);
    const targetCamX = playerPos.x + Math.sin(this.cameraOrbitAngle) * horizontalDist;
    const targetCamZ = playerPos.z + Math.cos(this.cameraOrbitAngle) * horizontalDist;

    this.camera.position.lerp(new THREE.Vector3(targetCamX, camHeight, targetCamZ), 0.14);
    this.camera.lookAt(playerPos.x, targetY, playerPos.z);

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
