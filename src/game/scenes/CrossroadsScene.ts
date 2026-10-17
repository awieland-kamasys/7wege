import * as THREE from 'three';
import { SEVEN_PATHS } from '../data/paths';
import { createGuideNpc, GuideNpcEntity } from '../entities/GuideNpc';
import { createLogCabin } from '../entities/LogCabin';
import { createSignpost, SignpostEntity } from '../entities/Signpost';
import { createTreasureChest, TreasureChestEntity } from '../entities/TreasureChest';
import { Vector2D } from '../systems/CrossroadsState';

export type ScenePickResult =
  | { kind: 'npc'; point: Vector2D }
  | { kind: 'chest'; point: Vector2D }
  | { kind: 'sign'; pathId: number; point: Vector2D }
  | { kind: 'path'; pathId: number; point: Vector2D }
  | { kind: 'hut'; point: Vector2D }
  | { kind: 'signpost'; point: Vector2D }
  | { kind: 'ground'; point: Vector2D };

/**
 * Three.js-Szene der Waldkreuzung mit 7 Wegen, Schutzhütte, Schatztruhe, Wegweiser, Hinweisgeber-NPC und Spielfigur.
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
  private readonly treasureChest: TreasureChestEntity;
  private readonly pathMeshes = new Map<number, THREE.MeshStandardMaterial>();
  private readonly pickableObjects: THREE.Object3D[] = [];
  private readonly raycaster = new THREE.Raycaster();
  private readonly pointerNdc = new THREE.Vector2();

  private cameraOrbitAngle = 0;
  private cameraPitch = 0.56;
  private cameraDistance = 11.0;
  private hoveredPathId: number | null = null;
  private isNpcHovered = false;
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
      90
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

    // Schatztruhe vor der Schutzhütte platzieren (Deckel nach vorne zu öffnen)
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

    // Hinweisgeber-NPC direkt links vor der Schutzhütte platzieren
    this.guideNpc = createGuideNpc();
    this.guideNpc.group.position.set(-1.85, 0, 2.05);
    this.guideNpc.group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        this.pickableObjects.push(child);
      }
    });
    this.scene.add(this.guideNpc.group);

    // Bäume rund um die Lichtung und zwischen den 7 Wegen
    this.buildForestRing();

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
    sunLight.position.set(16, 28, 14);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 2;
    sunLight.shadow.camera.far = 75;
    const d = 28;
    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;
    this.scene.add(sunLight);
  }

  private buildTerrainAndPaths(): void {
    // Weitläufiger Waldboden (verschwindet am Horizont nahtlos im Nebel)
    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(75, 48),
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

    // Die 7 Waldwege reichen optisch weit in den Nebel hinein (pathLength = 52)
    const pathLength = 52;
    SEVEN_PATHS.forEach((pathData) => {
      const pivot = new THREE.Group();
      pivot.rotation.y = -pathData.angleRad;

      const mat = new THREE.MeshStandardMaterial({
        color: 0x7b654b,
        roughness: 0.9,
        emissive: 0x000000,
      });
      this.pathMeshes.set(pathData.id, mat);

      const pathMesh = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.05, pathLength), mat);
      pathMesh.position.set(0, 0.03, -(pathLength / 2 + 4.5));
      pathMesh.receiveShadow = true;
      pathMesh.userData = { interactableType: 'path', pathId: pathData.id };
      pivot.add(pathMesh);
      this.pickableObjects.push(pathMesh);

      // Farbiger Wegmarkierungsstein am Beginn jedes der 7 Wege
      const markerStone = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.38, 0),
        new THREE.MeshStandardMaterial({ color: pathData.colorHex, roughness: 0.55 })
      );
      markerStone.position.set(1.45, 0.32, -6.8);
      markerStone.castShadow = true;
      markerStone.userData = { interactableType: 'sign', pathId: pathData.id };
      pivot.add(markerStone);
      this.pickableObjects.push(markerStone);

      this.scene.add(pivot);
    });
  }

  private buildForestRing(): void {
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4f3622, roughness: 0.9 });
    const crownMatDark = new THREE.MeshStandardMaterial({ color: 0x24472b, roughness: 0.85 });
    const crownMatLight = new THREE.MeshStandardMaterial({ color: 0x335c36, roughness: 0.85 });

    // Zwischen jedem der 7 Wege Baumgruppen weit in den Nebel hinein platzieren
    for (let i = 0; i < SEVEN_PATHS.length; i++) {
      const baseAngle = SEVEN_PATHS[i].angleRad + Math.PI / 7;

      for (let r = 9.2; r <= 44; r += 3.8) {
        for (const offset of [-0.16, 0, 0.16]) {
          const angle = baseAngle + offset + Math.sin(r * (i + 1)) * 0.05;
          const x = Math.sin(angle) * r;
          const z = -Math.cos(angle) * r;

          const tree = new THREE.Group();
          const scale = 0.85 + ((i * 7 + Math.round(r)) % 5) * 0.14;

          const trunk = new THREE.Mesh(
            new THREE.CylinderGeometry(0.22 * scale, 0.32 * scale, 1.8 * scale, 8),
            trunkMat
          );
          trunk.position.y = 0.9 * scale;
          trunk.castShadow = true;
          tree.add(trunk);

          const crownMat = (i + Math.round(r)) % 2 === 0 ? crownMatDark : crownMatLight;

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

          tree.position.set(x, 0, z);
          this.scene.add(tree);
        }
      }
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

    // Bevorzuge spezifische Objekte (NPC, Truhe, Schild, Hütte, Wegweiser, Weg) vor allgemeiner Lichtung
    for (const hit of hits) {
      const data = hit.object.userData;
      const point: Vector2D = { x: hit.point.x, z: hit.point.z };

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

    // Hinweisgeber-NPC und Schatztruhen-Deckel animieren
    this.guideNpc.update(
      this.elapsedSeconds,
      playerPos,
      this.isNpcHovered || isDialogueActive
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
