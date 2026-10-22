import {
  DEVIL_NPC_NAME,
  GIANT_NPC_NAME,
  GREY_MAN_NPC_NAME,
  GUIDE_NPC_NAME,
  NIXIE_NPC_NAME,
  WILD_HUNTER_NPC_NAME,
  WOOD_WOMAN_NPC_NAME,
} from '../data/npcDialogues';
import {
  CAVE_ENTRANCE_POS,
  CLOSED_GATE_POS,
  DEVIL_NPC_POS,
  ForestPathData,
  GIANT_NPC_POS,
  GREY_MAN_NPC_POS,
  HELL_CHASM_POS,
  HUNTING_LODGE_POS,
  LUMBER_CAMP_POS,
  NIXIE_NPC_POS,
  PATH_1_BOULDER_POS,
  PATH_1_END_CLEARING,
  PATH_1_WAYPOINTS,
  PATH_2_END_CLEARING,
  PATH_2_PUDDLE_POS,
  PATH_2_WAYPOINTS,
  PATH_3_END_CLEARING,
  PATH_3_STREAM_POS,
  PATH_3_WAYPOINTS,
  PATH_4_END_CLEARING,
  PATH_4_LOG_POS,
  PATH_4_WAYPOINTS,
  PATH_5_END_CLEARING,
  PATH_5_FIRE_POS,
  PATH_5_WAYPOINTS,
  PATH_6_END_CLEARING,
  PATH_6_HERBS_POS,
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
} from '../data/paths';

export interface Vector2D {
  x: number;
  z: number;
}

export type PointOfInterest =
  | { type: 'npc'; name: string; label: string }
  | { type: 'grey_man'; name: string; label: string }
  | { type: 'nixie'; name: string; label: string }
  | { type: 'giant'; name: string; label: string }
  | { type: 'wood_woman'; name: string; label: string }
  | { type: 'devil'; name: string; label: string }
  | { type: 'wild_hunter'; name: string; label: string }
  | { type: 'wood_woman_lodge'; name: string; label: string }
  | { type: 'cave'; label: string }
  | { type: 'pond'; label: string }
  | { type: 'weir'; label: string }
  | { type: 'lumber_camp'; label: string }
  | { type: 'hell_chasm'; label: string }
  | { type: 'hunting_lodge'; label: string }
  | { type: 'herb_garden'; label: string }
  | { type: 'gate'; label: string }
  | { type: 'boulder'; label: string }
  | { type: 'puddle'; label: string }
  | { type: 'stream'; label: string }
  | { type: 'log'; label: string }
  | { type: 'fire'; label: string }
  | { type: 'herbs'; label: string }
  | { type: 'chest'; isOpen: boolean; label: string }
  | { type: 'signpost'; label: string }
  | { type: 'hut'; label: string }
  | { type: 'path'; path: ForestPathData }
  | { type: 'clearing'; label: string };


/**
 * Reine Spiellogik für die Waldkreuzung,
 * - Weg 1 (Silberstollen-Pfad mit Bergmassiv & Graumännchen),
 * - Weg 2 (Nixenteich-Pfad mit Waldteich, Stein & Nixe),
 * - Weg 3 (Quellenweg mit Brücke, Bach, geschlossenem Wehr, kleinem Stausee & Riese),
 * - Weg 4 (Holzfäller-Pfad mit Holzfällerlager auf der Waldlichtung & Holzweibchen),
 * - Weg 5 (Höllenschlund-Pfad mit feurigem Höllenschlund & Teufel).
 * Ohne Three.js-Abhängigkeit direkt mit Vitest testbar.
 */
export class CrossroadsState {
  // Schutzhütte im Zentrum (0, -1.45), Schatztruhe davor (0.85, 2.0),
  // Wegweiser rechts davor (2.3, 2.4), Hinweisgeber-NPC links davor (-1.85, 2.05)
  private readonly hutPos: Vector2D = { x: 0, z: -1.45 };
  private readonly hutHalfWidth = 2.62;
  private readonly hutHalfDepth = 2.82;

  private readonly chestPos: Vector2D = { x: 0.85, z: 2.0 };
  private readonly chestCollisionRadius = 0.48;

  private readonly signpostPos: Vector2D = { x: 2.3, z: 2.4 };
  private readonly signpostCollisionRadius = 0.55;

  private readonly npcPos: Vector2D = { x: -1.85, z: 2.05 };
  private readonly npcCollisionRadius = 0.48;

  // Am Ende des 1. Weges: Bergmassiv mit Höhleneingang und davor das Graumännchen
  private readonly greyManPos: Vector2D = { ...GREY_MAN_NPC_POS };
  private readonly greyManCollisionRadius = 0.5;

  private readonly cavePos: Vector2D = { x: CAVE_ENTRANCE_POS.x, z: CAVE_ENTRANCE_POS.z };
  private readonly caveCollisionRadius = 3.0;
  // Mindestabstand vor der Felsfront/Stollenöffnung im lokalen Koordinatensystem des Berges
  private readonly caveFrontWallLz = 3.35;
  private readonly caveLocalRockColliders: readonly { lx: number; lz: number; radius: number }[] = [
    { lx: 0, lz: 0.35, radius: 3.0 }, // Stollenhinterwand & Felsüberhang
    { lx: -5.0, lz: -0.5, radius: 3.8 }, // Linke Felsflanke
    { lx: 5.0, lz: -0.5, radius: 3.8 }, // Rechte Felsflanke
  ];

  // Auf Weg 1: Felsbrocken, der den Silberstollen-Pfad blockiert
  private path1BoulderBlocked = true;
  private readonly path1BoulderPos: Vector2D = { x: PATH_1_BOULDER_POS.x, z: PATH_1_BOULDER_POS.z };
  private readonly path1BoulderRadius = PATH_1_BOULDER_POS.radius;

  // Auf Weg 2: Wasserpfütze, die den Nixenteich-Pfad blockiert
  private path2PuddleBlocked = true;
  private readonly path2PuddlePos: Vector2D = { x: PATH_2_PUDDLE_POS.x, z: PATH_2_PUDDLE_POS.z };
  private readonly path2PuddleRadius = PATH_2_PUDDLE_POS.radius;

  // Auf Weg 3: Reißender Gebirgsbach, der den Quellenweg blockiert
  private path3StreamBlocked = true;
  private readonly path3StreamPos: Vector2D = { x: PATH_3_STREAM_POS.x, z: PATH_3_STREAM_POS.z };
  private readonly path3StreamRadius = PATH_3_STREAM_POS.radius;

  // Auf Weg 4: Umgestürzter Baumstamm, der den Holzfäller-Pfad blockiert
  private path4LogBlocked = true;
  private readonly path4LogPos: Vector2D = { x: PATH_4_LOG_POS.x, z: PATH_4_LOG_POS.z };
  private readonly path4LogRadius = PATH_4_LOG_POS.radius;

  // Auf Weg 5: Flammenwand/Feuer, das den Höllenschlund-Pfad blockiert
  private path5FireBlocked = true;
  private readonly path5FirePos: Vector2D = { x: PATH_5_FIRE_POS.x, z: PATH_5_FIRE_POS.z };
  private readonly path5FireRadius = PATH_5_FIRE_POS.radius;

  // Auf Weg 6: Hohe Kräuterpflanzen mit Geländer, die den Jägerpfad blockieren
  private path6HerbsBlocked = true;
  private readonly path6HerbsPos: Vector2D = { x: PATH_6_HERBS_POS.x, z: PATH_6_HERBS_POS.z };
  private readonly path6HerbsRadius = PATH_6_HERBS_POS.radius;


  // Am Ende des 2. Weges: Waldteich und auf einem Stein im Teich die Nixe
  private readonly pondPos: Vector2D = { x: POND_CENTER_POS.x, z: POND_CENTER_POS.z };
  private readonly pondCollisionRadius = 4.25;
  private readonly nixiePos: Vector2D = { ...NIXIE_NPC_POS };
  private readonly nixieTalkDistance = 4.8;

  // Am Ende des 3. Weges: Brücke mit geschlossenem Wehr, kleinem Stausee und dem Riesen
  private readonly weirBridgePos: Vector2D = { x: WEIR_BRIDGE_POS.x, z: WEIR_BRIDGE_POS.z };
  private readonly giantPos: Vector2D = { ...GIANT_NPC_POS };
  private readonly giantCollisionRadius = 1.65;

  // Am Ende des 4. Weges: Holzfällerlager auf der Waldlichtung und das Holzweibchen
  private readonly lumberCampPos: Vector2D = { x: LUMBER_CAMP_POS.x, z: LUMBER_CAMP_POS.z };
  private readonly lumberCampCollisionRadius = 2.55;
  private readonly woodWomanPos: Vector2D = { ...WOOD_WOMAN_NPC_POS };
  private readonly woodWomanCollisionRadius = 0.55;

  // Am Ende des 5. Weges: Feuriger Höllenschlund und der Teufel
  private readonly hellChasmPos: Vector2D = { x: HELL_CHASM_POS.x, z: HELL_CHASM_POS.z };
  private readonly hellChasmCollisionRadius = 7.2;
  private readonly devilPos: Vector2D = { ...DEVIL_NPC_POS };
  private readonly devilCollisionRadius = 1.35;
  private readonly devilTalkDistance = 7.8;

  // Am Ende des 6. Weges: Steinruinen mit Kräutergarten, Wilder Jäger und Holzweibchen
  private readonly huntingLodgePos: Vector2D = { x: HUNTING_LODGE_POS.x, z: HUNTING_LODGE_POS.z };
  private readonly wildHunterPos: Vector2D = { ...WILD_HUNTER_NPC_POS };
  private readonly wildHunterCollisionRadius = 0.55;
  private readonly woodWomanLodgePos: Vector2D = { ...WOOD_WOMAN_LODGE_NPC_POS };
  private readonly woodWomanLodgeCollisionRadius = 0.55;
  // Ruinen auf Weg 6: Verfallener Steinturm (-47.0, 26.0) und Mauerruine (-47.0, 20.0)
  private readonly stoneTowerCenter: Vector2D = { x: -47.0, z: 26.0 };
  private readonly stoneTowerHalfWidth = 2.5;
  private readonly stoneTowerHalfDepth = 2.5;
  private readonly stoneRuinCenter: Vector2D = { x: -47.0, z: 20.0 };
  private readonly stoneRuinHalfWidth = 2.5;
  private readonly stoneRuinHalfDepth = 2.3;

  // Am Ende des 7. Weges: Das geschlossene Tor mit flankierenden Steinmauern
  private readonly gatePos: Vector2D = { x: CLOSED_GATE_POS.x, z: CLOSED_GATE_POS.z };

  private readonly clearingRadius = 6.5;

  private readonly pathHalfWidth = 0.95;
  private readonly maxRadius = 26;

  private playerPos: Vector2D = { ...START_PLAYER_POS };
  private targetPos: Vector2D | null = null;
  private selectedPathId: number | null = 7;
  private chestOpen = false;
  private isReturningToClearing = false;

  public getPlayerPosition(): Readonly<Vector2D> {
    return { ...this.playerPos };
  }

  public getTargetPosition(): Readonly<Vector2D> | null {
    return this.targetPos ? { ...this.targetPos } : null;
  }

  public getSignpostPosition(): Readonly<Vector2D> {
    return { ...this.signpostPos };
  }

  public getHutPosition(): Readonly<Vector2D> {
    return { ...this.hutPos };
  }

  public getNpcPosition(): Readonly<Vector2D> {
    return { ...this.npcPos };
  }

  public getGreyManPosition(): Readonly<Vector2D> {
    return { ...this.greyManPos };
  }

  public getNixiePosition(): Readonly<Vector2D> {
    return { ...this.nixiePos };
  }

  public getGiantPosition(): Readonly<Vector2D> {
    return { ...this.giantPos };
  }

  public getWoodWomanPosition(): Readonly<Vector2D> {
    return { ...this.woodWomanPos };
  }

  public getDevilPosition(): Readonly<Vector2D> {
    return { ...this.devilPos };
  }

  public getWildHunterPosition(): Readonly<Vector2D> {
    return { ...this.wildHunterPos };
  }

  public getWoodWomanLodgePosition(): Readonly<Vector2D> {
    return { ...this.woodWomanLodgePos };
  }

  public getGatePosition(): Readonly<Vector2D> {
    return { ...this.gatePos };
  }

  public isPath1Blocked(): boolean {
    return this.path1BoulderBlocked;
  }

  public setPath1Blocked(blocked: boolean): void {
    this.path1BoulderBlocked = blocked;
  }

  public removePath1Boulder(): boolean {
    if (!this.path1BoulderBlocked) {
      return false;
    }
    this.path1BoulderBlocked = false;
    return true;
  }

  public getPath1BoulderPosition(): Readonly<Vector2D> {
    return { ...this.path1BoulderPos };
  }

  public getPath1BoulderRadius(): number {
    return this.path1BoulderRadius;
  }

  public setPlayerPosition(x: number, z: number): Readonly<Vector2D> {
    this.playerPos = { x, z };
    return this.getPlayerPosition();
  }

  public isNearBoulder(): boolean {
    if (!this.path1BoulderBlocked) {
      return false;
    }
    const dist = Math.hypot(
      this.playerPos.x - this.path1BoulderPos.x,
      this.playerPos.z - this.path1BoulderPos.z
    );
    return dist <= this.path1BoulderRadius + 0.95;
  }

  // --- WEG 2: WASSERPFÜTZE ---
  public isPath2Blocked(): boolean {
    return this.path2PuddleBlocked;
  }

  public setPath2Blocked(blocked: boolean): void {
    this.path2PuddleBlocked = blocked;
  }

  public removePath2Puddle(): boolean {
    this.path2PuddleBlocked = false;
    return true;
  }

  public getPath2PuddlePosition(): Readonly<Vector2D> {
    return { ...this.path2PuddlePos };
  }

  public getPath2PuddleRadius(): number {
    return this.path2PuddleRadius;
  }

  public isNearPuddle(): boolean {
    if (!this.path2PuddleBlocked) {
      return false;
    }
    const dist = Math.hypot(
      this.playerPos.x - this.path2PuddlePos.x,
      this.playerPos.z - this.path2PuddlePos.z
    );
    return dist <= this.path2PuddleRadius + 0.95;
  }

  // --- WEG 3: REISSENDER GEBIRGSBACH ---
  public isPath3Blocked(): boolean {
    return this.path3StreamBlocked;
  }

  public setPath3Blocked(blocked: boolean): void {
    this.path3StreamBlocked = blocked;
  }

  public removePath3Stream(): boolean {
    this.path3StreamBlocked = false;
    return true;
  }

  public getPath3StreamPosition(): Readonly<Vector2D> {
    return { ...this.path3StreamPos };
  }

  public getPath3StreamRadius(): number {
    return this.path3StreamRadius;
  }

  public isNearStream(): boolean {
    if (!this.path3StreamBlocked) {
      return false;
    }
    const dist = Math.hypot(
      this.playerPos.x - this.path3StreamPos.x,
      this.playerPos.z - this.path3StreamPos.z
    );
    return dist <= this.path3StreamRadius + 0.95;
  }

  // --- WEG 4: BAUMSTAMM ---
  public isPath4Blocked(): boolean {
    return this.path4LogBlocked;
  }

  public setPath4Blocked(blocked: boolean): void {
    this.path4LogBlocked = blocked;
  }

  public removePath4Log(): boolean {
    this.path4LogBlocked = false;
    return true;
  }

  public getPath4LogPosition(): Readonly<Vector2D> {
    return { ...this.path4LogPos };
  }

  public getPath4LogRadius(): number {
    return this.path4LogRadius;
  }

  public isNearLog(): boolean {
    if (!this.path4LogBlocked) {
      return false;
    }
    const dist = Math.hypot(
      this.playerPos.x - this.path4LogPos.x,
      this.playerPos.z - this.path4LogPos.z
    );
    return dist <= this.path4LogRadius + 0.95;
  }

  // --- WEG 5: FEUER / FLAMMENWAND ---
  public isPath5Blocked(): boolean {
    return this.path5FireBlocked;
  }

  public setPath5Blocked(blocked: boolean): void {
    this.path5FireBlocked = blocked;
  }

  public removePath5Fire(): boolean {
    this.path5FireBlocked = false;
    return true;
  }

  public getPath5FirePosition(): Readonly<Vector2D> {
    return { ...this.path5FirePos };
  }

  public getPath5FireRadius(): number {
    return this.path5FireRadius;
  }

  public isNearFire(): boolean {
    if (!this.path5FireBlocked) {
      return false;
    }
    const dist = Math.hypot(
      this.playerPos.x - this.path5FirePos.x,
      this.playerPos.z - this.path5FirePos.z
    );
    return dist <= this.path5FireRadius + 0.95;
  }

  // --- WEG 6: HOHES KRÄUTERGELÄNDER ---
  public isPath6Blocked(): boolean {
    return this.path6HerbsBlocked;
  }

  public setPath6Blocked(blocked: boolean): void {
    this.path6HerbsBlocked = blocked;
  }

  public removePath6Herbs(): boolean {
    this.path6HerbsBlocked = false;
    return true;
  }

  public getPath6HerbsPosition(): Readonly<Vector2D> {
    return { ...this.path6HerbsPos };
  }

  public getPath6HerbsRadius(): number {
    return this.path6HerbsRadius;
  }

  public isNearHerbs(): boolean {
    if (!this.path6HerbsBlocked) {
      return false;
    }
    const dist = Math.hypot(
      this.playerPos.x - this.path6HerbsPos.x,
      this.playerPos.z - this.path6HerbsPos.z
    );
    return dist <= this.path6HerbsRadius + 0.95;
  }

  /**
   * Entfernt alle 6 Wegsperren gleichzeitig (Felsbrocken, Pfütze, Gebirgsbach, Baumstamm, Feuer, Kräuter).
   * Gibt true zurück, wenn mindestens eine Wegsperre zuvor noch aktiv war.
   */
  public removeAllPathBarriers(): boolean {
    let hadBlocked = false;
    if (this.path1BoulderBlocked) {
      this.path1BoulderBlocked = false;
      hadBlocked = true;
    }
    if (this.path2PuddleBlocked) {
      this.path2PuddleBlocked = false;
      hadBlocked = true;
    }
    if (this.path3StreamBlocked) {
      this.path3StreamBlocked = false;
      hadBlocked = true;
    }
    if (this.path4LogBlocked) {
      this.path4LogBlocked = false;
      hadBlocked = true;
    }
    if (this.path5FireBlocked) {
      this.path5FireBlocked = false;
      hadBlocked = true;
    }
    if (this.path6HerbsBlocked) {
      this.path6HerbsBlocked = false;
      hadBlocked = true;
    }
    return hadBlocked;
  }

  /**
   * Prüft, ob mindestens eine der 6 Wegsperren aktiv ist.
   */
  public hasAnyBlockedPath(): boolean {
    return (
      this.path1BoulderBlocked ||
      this.path2PuddleBlocked ||
      this.path3StreamBlocked ||
      this.path4LogBlocked ||
      this.path5FireBlocked ||
      this.path6HerbsBlocked
    );
  }

  public getChestPosition(): Readonly<Vector2D> {

    return { ...this.chestPos };
  }


  public isChestOpen(): boolean {
    return this.chestOpen;
  }

  public toggleChest(): boolean {
    this.chestOpen = !this.chestOpen;
    return this.chestOpen;
  }

  public setChestOpen(open: boolean): void {
    this.chestOpen = open;
  }

  public isNearNpc(): boolean {
    const dist = Math.hypot(
      this.playerPos.x - this.npcPos.x,
      this.playerPos.z - this.npcPos.z
    );
    return dist <= this.npcCollisionRadius + 1.05;
  }

  public isNearGreyMan(): boolean {
    const dist = Math.hypot(
      this.playerPos.x - this.greyManPos.x,
      this.playerPos.z - this.greyManPos.z
    );
    return dist <= this.greyManCollisionRadius + 1.25;
  }

  public isNearNixie(): boolean {
    const dist = Math.hypot(
      this.playerPos.x - this.nixiePos.x,
      this.playerPos.z - this.nixiePos.z
    );
    return dist <= this.nixieTalkDistance;
  }

  public isNearGiant(): boolean {
    const dist = Math.hypot(
      this.playerPos.x - this.giantPos.x,
      this.playerPos.z - this.giantPos.z
    );
    return dist <= this.giantCollisionRadius + 1.85;
  }

  public isNearWoodWoman(): boolean {
    const dist = Math.hypot(
      this.playerPos.x - this.woodWomanPos.x,
      this.playerPos.z - this.woodWomanPos.z
    );
    return dist <= this.woodWomanCollisionRadius + 1.45;
  }

  public isNearDevil(): boolean {
    const dist = Math.hypot(
      this.playerPos.x - this.devilPos.x,
      this.playerPos.z - this.devilPos.z
    );
    return dist <= this.devilTalkDistance;
  }

  public isNearWildHunter(): boolean {
    const dist = Math.hypot(
      this.playerPos.x - this.wildHunterPos.x,
      this.playerPos.z - this.wildHunterPos.z
    );
    return dist <= this.wildHunterCollisionRadius + 1.45;
  }

  public isNearWoodWomanLodge(): boolean {
    const dist = Math.hypot(
      this.playerPos.x - this.woodWomanLodgePos.x,
      this.playerPos.z - this.woodWomanLodgePos.z
    );
    return dist <= this.woodWomanLodgeCollisionRadius + 1.45;
  }

  public isNearGate(): boolean {
    const dist = Math.hypot(
      this.playerPos.x - this.gatePos.x,
      this.playerPos.z - this.gatePos.z
    );
    return dist <= 5.2;
  }

  public isNearChest(): boolean {
    const dist = Math.hypot(
      this.playerPos.x - this.chestPos.x,
      this.playerPos.z - this.chestPos.z
    );
    return dist <= this.chestCollisionRadius + 1.05;
  }

  /**
   * Gibt zurück, ob sich die Spielfigur aktuell auf der zentralen Waldkreuzung befindet.
   * Nur auf der Kreuzung darf ein neuer Weg über die Wegeauswahl gewählt werden.
   */
  public isOnClearing(): boolean {
    return Math.hypot(this.playerPos.x, this.playerPos.z) <= this.clearingRadius + 0.15;
  }

  /**
   * Gibt an, ob die Spielfigur aktuell mit doppelter Geschwindigkeit
   * selbsttätig zur 7-Wegekreuzung zurückläuft.
   */
  public isReturning(): boolean {
    return this.isReturningToClearing;
  }

  /**
   * Startet den automatischen Rücklauf zur zentralen Waldkreuzung mit doppelter
   * normaler Geschwindigkeit (13.0 m/s statt 6.5 m/s) entlang der geschwungenen Pfade.
   */
  public returnToClearing(): Readonly<Vector2D> {
    this.selectedPathId = null;
    const target = this.setTargetPosition(0, 4.8);
    this.isReturningToClearing = true;
    return target;
  }

  /**
   * Lässt die Spielfigur zurück auf die zentrale Waldkreuzung laufen.
   */
  public setTargetToClearing(): Readonly<Vector2D> {
    return this.returnToClearing();
  }

  /**
   * Lässt die Spielfigur per Schnellreise sofort zurück auf die zentrale Waldkreuzung springen.
   */
  public jumpToClearing(): Readonly<Vector2D> {
    this.selectedPathId = null;
    this.targetPos = null;
    this.isReturningToClearing = false;
    this.playerPos = { x: 0, z: 4.8 };
    return this.getPlayerPosition();
  }

  /**
   * Gibt den aktuell ausgewählten Pfad zurück oder ermittelt anhand der aktuellen Position
   * den zugehörigen der sieben Waldwege, wenn die Spielfigur auf den Wegen unterwegs ist.
   */
  public getCurrentOrClosestPath(): ForestPathData | null {
    if (this.selectedPathId !== null) {
      const path = SEVEN_PATHS.find((p) => p.id === this.selectedPathId);
      if (path) {
        return path;
      }
    }
    if (!this.isOnClearing()) {
      return this.getClosestPathAt(this.playerPos.x, this.playerPos.z);
    }
    return null;
  }

  public getSelectedPath(): ForestPathData | null {
    if (this.selectedPathId === null) {
      return null;
    }
    return SEVEN_PATHS.find((p) => p.id === this.selectedPathId) ?? null;
  }

  public selectPath(pathId: number | null): ForestPathData | null {
    if (pathId === null) {
      this.selectedPathId = null;
      return null;
    }
    const found = SEVEN_PATHS.find((p) => p.id === pathId) ?? null;
    this.selectedPathId = found ? found.id : null;
    return found;
  }

  /**
   * Berechnet für ein Segment eines Kurvenweges (Weg 1, 2, 3 oder 4) den Zentrumspunkt und den erlaubten Radius.
   * Das letzte Segment bildet zusammen mit dem Vorplatz eine konvexe Tapered Capsule,
   * sodass beim Übergang vom Vorplatz auf den Weg keinerlei Kante oder Tasche entsteht.
   */
  private evaluateCurvedPathSegment(
    x: number,
    z: number,
    waypoints: readonly PathPoint2D[],
    endClearingRadius: number,
    segmentIndex: number
  ): { cx: number; cz: number; radius: number } {
    const a = waypoints[segmentIndex];
    const b = waypoints[segmentIndex + 1];
    const abx = b.x - a.x;
    const abz = b.z - a.z;
    const len = Math.hypot(abx, abz);
    if (len < 1e-6) {
      return { cx: a.x, cz: a.z, radius: this.pathHalfWidth };
    }

    const ux = abx / len;
    const uz = abz / len;
    const relX = x - a.x;
    const relZ = z - a.z;
    const s = relX * ux + relZ * uz;

    if (segmentIndex === waypoints.length - 2) {
      const rA = this.pathHalfWidth;
      const rB = endClearingRadius;
      const dr = rB - rA;
      const perpDist = Math.hypot(relX - s * ux, relZ - s * uz);
      const slopeLen = Math.sqrt(Math.max(1e-4, len * len - dr * dr));
      const sStar = s + perpDist * (dr / slopeLen);
      const t = Math.max(0, Math.min(1, sStar / len));
      return {
        cx: a.x + t * abx,
        cz: a.z + t * abz,
        radius: rA + t * dr,
      };
    }

    const t = Math.max(0, Math.min(1, s / len));
    return {
      cx: a.x + t * abx,
      cz: a.z + t * abz,
      radius: this.pathHalfWidth,
    };
  }

  /**
   * Prüft, ob ein Punkt auf dem verlängerten, kurvigen 1. Weg oder dem Vorplatz am Höhleneingang liegt.
   */
  public isPointOnPath1(x: number, z: number): boolean {
    const eps = 1e-4;
    for (let i = 0; i < PATH_1_WAYPOINTS.length - 1; i++) {
      const { cx, cz, radius } = this.evaluateCurvedPathSegment(
        x,
        z,
        PATH_1_WAYPOINTS,
        PATH_1_END_CLEARING.radius,
        i
      );
      if (Math.hypot(x - cx, z - cz) <= radius + eps) {
        return true;
      }
    }
    return false;
  }

  /**
   * Prüft, ob ein Punkt auf dem geschwungenen 2. Weg oder dem Ufer-Vorplatz am Nixenteich liegt.
   */
  public isPointOnPath2(x: number, z: number): boolean {
    const eps = 1e-4;
    for (let i = 0; i < PATH_2_WAYPOINTS.length - 1; i++) {
      const { cx, cz, radius } = this.evaluateCurvedPathSegment(
        x,
        z,
        PATH_2_WAYPOINTS,
        PATH_2_END_CLEARING.radius,
        i
      );
      if (Math.hypot(x - cx, z - cz) <= radius + eps) {
        return true;
      }
    }
    return false;
  }

  /**
   * Prüft, ob ein Punkt auf dem geschwungenen 3. Weg (über die Wehrbrücke) oder dem Vorplatz beim Riesen liegt.
   */
  public isPointOnPath3(x: number, z: number): boolean {
    const eps = 1e-4;
    for (let i = 0; i < PATH_3_WAYPOINTS.length - 1; i++) {
      const { cx, cz, radius } = this.evaluateCurvedPathSegment(
        x,
        z,
        PATH_3_WAYPOINTS,
        PATH_3_END_CLEARING.radius,
        i
      );
      if (Math.hypot(x - cx, z - cz) <= radius + eps) {
        return true;
      }
    }
    return false;
  }

  /**
   * Prüft, ob ein Punkt auf dem 4. Weg oder der Waldlichtung des Holzfällerlagers liegt.
   */
  public isPointOnPath4(x: number, z: number): boolean {
    const eps = 1e-4;
    for (let i = 0; i < PATH_4_WAYPOINTS.length - 1; i++) {
      const { cx, cz, radius } = this.evaluateCurvedPathSegment(
        x,
        z,
        PATH_4_WAYPOINTS,
        PATH_4_END_CLEARING.radius,
        i
      );
      if (Math.hypot(x - cx, z - cz) <= radius + eps) {
        return true;
      }
    }
    return false;
  }

  /**
   * Prüft, ob ein Punkt auf dem geschwungenen 5. Weg oder dem Basalt-Vorplatz am Höllenschlund liegt.
   */
  public isPointOnPath5(x: number, z: number): boolean {
    const eps = 1e-4;
    for (let i = 0; i < PATH_5_WAYPOINTS.length - 1; i++) {
      const { cx, cz, radius } = this.evaluateCurvedPathSegment(
        x,
        z,
        PATH_5_WAYPOINTS,
        PATH_5_END_CLEARING.radius,
        i
      );
      if (Math.hypot(x - cx, z - cz) <= radius + eps) {
        return true;
      }
    }
    return false;
  }

  /**
   * Prüft, ob ein Punkt auf dem 6. Weg (Jägerpfad) oder der Waldlichtung vor der Jagdhütte liegt.
   */
  public isPointOnPath6(x: number, z: number): boolean {
    const eps = 1e-4;
    for (let i = 0; i < PATH_6_WAYPOINTS.length - 1; i++) {
      const { cx, cz, radius } = this.evaluateCurvedPathSegment(
        x,
        z,
        PATH_6_WAYPOINTS,
        PATH_6_END_CLEARING.radius,
        i
      );
      if (Math.hypot(x - cx, z - cz) <= radius + eps) {
        return true;
      }
    }
    return false;
  }

  /**
   * Prüft, ob ein Punkt auf dem 7. Weg (Torweg) oder dem Vorplatz vor dem geschlossenen Tor liegt.
   */
  public isPointOnPath7(x: number, z: number): boolean {
    const eps = 1e-4;
    for (let i = 0; i < PATH_7_WAYPOINTS.length - 1; i++) {
      const { cx, cz, radius } = this.evaluateCurvedPathSegment(
        x,
        z,
        PATH_7_WAYPOINTS,
        PATH_7_END_CLEARING.radius,
        i
      );
      if (Math.hypot(x - cx, z - cz) <= radius + eps) {
        return true;
      }
    }
    return false;
  }

  /**
   * Prüft, ob ein Punkt auf der zentralen Kreuzung oder auf einem der 7 befestigten Waldwege liegt.
   * Grünflächen und Wald außerhalb dieser Geometrie sind nicht begehbar.
   */
  public isPointOnClearingOrPath(x: number, z: number): boolean {
    const eps = 1e-4;
    const distFromCenter = Math.hypot(x, z);
    if (distFromCenter <= this.clearingRadius + eps) {
      return true;
    }

    // Alle 7 Wege besitzen eigene ausgebaute Kurvenverläufe bis zu ihren Zielorten
    return (
      this.isPointOnPath1(x, z) ||
      this.isPointOnPath2(x, z) ||
      this.isPointOnPath3(x, z) ||
      this.isPointOnPath4(x, z) ||
      this.isPointOnPath5(x, z) ||
      this.isPointOnPath6(x, z) ||
      this.isPointOnPath7(x, z)
    );
  }

  private toCaveLocal(x: number, z: number): { lx: number; lz: number } {
    const dx = x - CAVE_ENTRANCE_POS.x;
    const dz = z - CAVE_ENTRANCE_POS.z;
    const cos = Math.cos(CAVE_ENTRANCE_POS.rotationY);
    const sin = Math.sin(CAVE_ENTRANCE_POS.rotationY);
    return {
      lx: dx * cos - dz * sin,
      lz: dx * sin + dz * cos,
    };
  }

  private fromCaveLocal(lx: number, lz: number): Vector2D {
    const cos = Math.cos(CAVE_ENTRANCE_POS.rotationY);
    const sin = Math.sin(CAVE_ENTRANCE_POS.rotationY);
    return {
      x: CAVE_ENTRANCE_POS.x + lx * cos + lz * sin,
      z: CAVE_ENTRANCE_POS.z - lx * sin + lz * cos,
    };
  }

  private toBridgeLocal(x: number, z: number): { lx: number; lz: number } {
    const dx = x - WEIR_BRIDGE_POS.x;
    const dz = z - WEIR_BRIDGE_POS.z;
    const cos = Math.cos(WEIR_BRIDGE_POS.rotationY);
    const sin = Math.sin(WEIR_BRIDGE_POS.rotationY);
    return {
      lx: dx * cos - dz * sin,
      lz: dx * sin + dz * cos,
    };
  }

  private fromBridgeLocal(lx: number, lz: number): Vector2D {
    const cos = Math.cos(WEIR_BRIDGE_POS.rotationY);
    const sin = Math.sin(WEIR_BRIDGE_POS.rotationY);
    return {
      x: WEIR_BRIDGE_POS.x + lx * cos + lz * sin,
      z: WEIR_BRIDGE_POS.z - lx * sin + lz * cos,
    };
  }

  /**
   * Prüft, ob ein Punkt mit Schutzhütte, Schatztruhe, Wegweiser, Waldhüter, Graumännchen, Felsen, Waldteich, Riese oder Holzweibchen kollidiert.
   */
  public isCollidingWithObstacles(x: number, z: number): boolean {
    const eps = 1e-4;
    const inHut =
      Math.abs(x - this.hutPos.x) < this.hutHalfWidth - eps &&
      Math.abs(z - this.hutPos.z) < this.hutHalfDepth - eps;
    if (inHut) {
      return true;
    }

    if (Math.hypot(x - this.chestPos.x, z - this.chestPos.z) < this.chestCollisionRadius - eps) {
      return true;
    }

    if (
      Math.hypot(x - this.signpostPos.x, z - this.signpostPos.z) <
      this.signpostCollisionRadius - eps
    ) {
      return true;
    }

    if (Math.hypot(x - this.npcPos.x, z - this.npcPos.z) < this.npcCollisionRadius - eps) {
      return true;
    }

    if (
      Math.hypot(x - this.greyManPos.x, z - this.greyManPos.z) <
      this.greyManCollisionRadius - eps
    ) {
      return true;
    }

    if (Math.hypot(x - this.cavePos.x, z - this.cavePos.z) < this.caveCollisionRadius - eps) {
      return true;
    }

    // Detaillierte Kollision für das Bergmassiv (Felswand, Stolleneingang und seitliche Felsflanken)
    const localCave = this.toCaveLocal(x, z);
    if (
      Math.abs(localCave.lx) < 8.5 &&
      localCave.lz > -10.0 &&
      localCave.lz < this.caveFrontWallLz - eps
    ) {
      return true;
    }

    for (const rock of this.caveLocalRockColliders) {
      if (Math.hypot(localCave.lx - rock.lx, localCave.lz - rock.lz) < rock.radius - eps) {
        return true;
      }
    }

    // Der Waldteich am Ende von Weg 2 ist nicht begehbar (Spieler bleibt am trockenen Ufer)
    if (Math.hypot(x - this.pondPos.x, z - this.pondPos.z) < this.pondCollisionRadius - eps) {
      return true;
    }

    // Wehrbrücke & Stausee auf Weg 3:
    // Die Brücke selbst (|lx| <= 1.05) ist begehbar. Außerhalb der Geländer (|lx| > 1.1) und im Stauseebecken herrscht Kollision.
    const localBridge = this.toBridgeLocal(x, z);
    if (Math.abs(localBridge.lz) < 3.3) {
      if (Math.abs(localBridge.lx) > 1.08 && Math.abs(localBridge.lx) < 4.5) {
        return true;
      }
    }
    if (Math.hypot(localBridge.lx - (-5.4), localBridge.lz) < 4.3) {
      return true;
    }

    // Der Riese am Wehr auf Weg 3
    if (Math.hypot(x - this.giantPos.x, z - this.giantPos.z) < this.giantCollisionRadius - eps) {
      return true;
    }

    // Die Campfire-Insel mit allen Aufbauten (Lagerfeuer, Kessel, Zelt, Scheite, Stämme) auf Weg 4
    if (
      Math.hypot(x - this.lumberCampPos.x, z - this.lumberCampPos.z) <
      this.lumberCampCollisionRadius - eps
    ) {
      return true;
    }

    // Das Holzweibchen kurz vor der Insel im Holzfällerlager auf Weg 4
    if (
      Math.hypot(x - this.woodWomanPos.x, z - this.woodWomanPos.z) <
      this.woodWomanCollisionRadius - eps
    ) {
      return true;
    }

    // Der Teufel inmitten des Höllenschlundes auf Weg 5
    if (
      Math.hypot(x - this.devilPos.x, z - this.devilPos.z) <
      this.devilCollisionRadius - eps
    ) {
      return true;
    }

    // Der brodelnde Lavaboden im Höllenschlund ist nicht begehbar (Spieler bleibt auf dem Felsplateau)
    if (
      Math.hypot(x - this.hellChasmPos.x, z - this.hellChasmPos.z) <
      this.hellChasmCollisionRadius - eps
    ) {
      return true;
    }

    // Aufbauten und Garten an der Ruinenlichtung auf Weg 6:
    // Eingezäunter Kräutergarten (AABB um -44.4, 20.6)
    if (Math.abs(x - (-44.4)) < 1.7 - eps && Math.abs(z - 20.6) < 1.6 - eps) {
      return true;
    }
    // Der Wilde Jäger an der Jagdhütte auf Weg 6
    if (
      Math.hypot(x - this.wildHunterPos.x, z - this.wildHunterPos.z) <
      this.wildHunterCollisionRadius - eps
    ) {
      return true;
    }

    // Das Holzweibchen vor dem Kräutergarten auf Weg 6
    if (
      Math.hypot(x - this.woodWomanLodgePos.x, z - this.woodWomanLodgePos.z) <
      this.woodWomanLodgeCollisionRadius - eps
    ) {
      return true;
    }

    // Ruine 1: Verfallener Steinturm
    if (
      Math.abs(x - this.stoneTowerCenter.x) < this.stoneTowerHalfWidth - eps &&
      Math.abs(z - this.stoneTowerCenter.z) < this.stoneTowerHalfDepth - eps
    ) {
      return true;
    }

    // Ruine 2: Steinerne Mauerruine
    if (
      Math.abs(x - this.stoneRuinCenter.x) < this.stoneRuinHalfWidth - eps &&
      Math.abs(z - this.stoneRuinCenter.z) < this.stoneRuinHalfDepth - eps
    ) {
      return true;
    }

    // Felsbrocken auf Weg 1 (blockiert den Pfad, bis er durch den Edelstein entfernt wird)
    if (this.path1BoulderBlocked) {
      if (
        this.isCollidingWithBarrier(x, z, this.path1BoulderPos) ||
        Math.hypot(x - this.path1BoulderPos.x, z - this.path1BoulderPos.z) <
        this.path1BoulderRadius - eps
      ) {
        return true;
      }
    }

    // Wasserpfütze auf Weg 2 (blockiert den Nixenteich-Pfad)
    if (this.path2PuddleBlocked) {
      if (
        this.isCollidingWithBarrier(x, z, this.path2PuddlePos) ||
        Math.hypot(x - this.path2PuddlePos.x, z - this.path2PuddlePos.z) <
        this.path2PuddleRadius - eps
      ) {
        return true;
      }
    }

    // Reißender Gebirgsbach auf Weg 3 (blockiert den Quellenweg)
    if (this.path3StreamBlocked) {
      if (
        this.isCollidingWithBarrier(x, z, this.path3StreamPos) ||
        Math.hypot(x - this.path3StreamPos.x, z - this.path3StreamPos.z) <
        this.path3StreamRadius - eps
      ) {
        return true;
      }
    }

    // Baumstamm auf Weg 4 (blockiert den Holzfäller-Pfad)
    if (this.path4LogBlocked) {
      if (
        this.isCollidingWithBarrier(x, z, this.path4LogPos) ||
        Math.hypot(x - this.path4LogPos.x, z - this.path4LogPos.z) <
        this.path4LogRadius - eps
      ) {
        return true;
      }
    }

    // Flammenwand / Feuer auf Weg 5 (blockiert den Höllenschlund-Pfad)
    if (this.path5FireBlocked) {
      if (
        this.isCollidingWithBarrier(x, z, this.path5FirePos) ||
        Math.hypot(x - this.path5FirePos.x, z - this.path5FirePos.z) <
        this.path5FireRadius - eps
      ) {
        return true;
      }
    }

    // Hohe Kräuterpflanzen mit Geländer auf Weg 6 (blockiert den Jägerpfad)
    if (this.path6HerbsBlocked) {
      if (
        this.isCollidingWithBarrier(x, z, this.path6HerbsPos) ||
        Math.hypot(x - this.path6HerbsPos.x, z - this.path6HerbsPos.z) <
        this.path6HerbsRadius - eps
      ) {
        return true;
      }
    }


    // Das geschlossene Tor und die flankierenden Steinmauern am Ende von Weg 7
    const gateDx = x - CLOSED_GATE_POS.x;
    const gateDz = z - CLOSED_GATE_POS.z;
    const gateCos = Math.cos(CLOSED_GATE_POS.rotationY);
    const gateSin = Math.sin(CLOSED_GATE_POS.rotationY);
    const gateLx = gateDx * gateCos - gateDz * gateSin;
    const gateLz = gateDx * gateSin + gateDz * gateCos;
    if (Math.abs(gateLx) < 12.0 && gateLz < 0.75 && gateLz > -4.5) {
      return true;
    }

    return false;
  }

  /**
   * Prüft, ob eine Position für die Spielfigur gültig und begehbar ist.
   */
  public isWalkable(x: number, z: number): boolean {
    return this.isPointOnClearingOrPath(x, z) && !this.isCollidingWithObstacles(x, z);
  }

  private projectOntoCurvedPath(
    x: number,
    z: number,
    waypoints: readonly PathPoint2D[],
    endClearingRadius: number
  ): Vector2D {
    let bestPoint: Vector2D = { x: waypoints[0].x, z: waypoints[0].z };
    let bestSignedDist = Infinity;

    for (let i = 0; i < waypoints.length - 1; i++) {
      const { cx, cz, radius } = this.evaluateCurvedPathSegment(
        x,
        z,
        waypoints,
        endClearingRadius,
        i
      );
      const dx = x - cx;
      const dz = z - cz;
      const d = Math.hypot(dx, dz);
      const signedDist = d - radius;
      if (signedDist <= 0) {
        return { x, z };
      }
      if (signedDist < bestSignedDist) {
        bestSignedDist = signedDist;
        bestPoint =
          d < 1e-6
            ? { x: cx, z: cz }
            : {
                x: cx + (dx / d) * radius,
                z: cz + (dz / d) * radius,
              };
      }
    }

    return bestPoint;
  }

  /**
   * Projiziert einen beliebigen Punkt auf den nächstgelegenen Punkt der Kreuzung oder eines Weges.
   */
  private projectOntoWalkableSurface(
    x: number,
    z: number,
    allowedPathId: number | null = null
  ): Vector2D {
    if (this.isPointOnClearingOrPath(x, z)) {
      if (allowedPathId === null || Math.hypot(x, z) <= this.clearingRadius) {
        return { x, z };
      }
      const activePath = this.getClosestPathAt(x, z);
      if (activePath && activePath.id === allowedPathId) {
        return { x, z };
      }
    }

    const dist = Math.hypot(x, z);
    let bestPoint: Vector2D =
      dist === 0
        ? { x: 0, z: this.clearingRadius }
        : { x: (x / dist) * this.clearingRadius, z: (z / dist) * this.clearingRadius };
    let bestDistSq = (x - bestPoint.x) ** 2 + (z - bestPoint.z) ** 2;

    const candidatePaths =
      allowedPathId !== null
        ? SEVEN_PATHS.filter((p) => p.id === allowedPathId)
        : SEVEN_PATHS;

    for (const path of candidatePaths) {
      if (path.id === 1) {
        const p1 = this.projectOntoCurvedPath(
          x,
          z,
          PATH_1_WAYPOINTS,
          PATH_1_END_CLEARING.radius
        );
        const dSq1 = (x - p1.x) ** 2 + (z - p1.z) ** 2;
        if (dSq1 < bestDistSq) {
          bestDistSq = dSq1;
          bestPoint = p1;
        }
        continue;
      }

      if (path.id === 2) {
        const p2 = this.projectOntoCurvedPath(
          x,
          z,
          PATH_2_WAYPOINTS,
          PATH_2_END_CLEARING.radius
        );
        const dSq2 = (x - p2.x) ** 2 + (z - p2.z) ** 2;
        if (dSq2 < bestDistSq) {
          bestDistSq = dSq2;
          bestPoint = p2;
        }
        continue;
      }

      if (path.id === 3) {
        const p3 = this.projectOntoCurvedPath(
          x,
          z,
          PATH_3_WAYPOINTS,
          PATH_3_END_CLEARING.radius
        );
        const dSq3 = (x - p3.x) ** 2 + (z - p3.z) ** 2;
        if (dSq3 < bestDistSq) {
          bestDistSq = dSq3;
          bestPoint = p3;
        }
        continue;
      }

      if (path.id === 4) {
        const p4 = this.projectOntoCurvedPath(
          x,
          z,
          PATH_4_WAYPOINTS,
          PATH_4_END_CLEARING.radius
        );
        const dSq4 = (x - p4.x) ** 2 + (z - p4.z) ** 2;
        if (dSq4 < bestDistSq) {
          bestDistSq = dSq4;
          bestPoint = p4;
        }
        continue;
      }

      if (path.id === 5) {
        const p5 = this.projectOntoCurvedPath(
          x,
          z,
          PATH_5_WAYPOINTS,
          PATH_5_END_CLEARING.radius
        );
        const dSq5 = (x - p5.x) ** 2 + (z - p5.z) ** 2;
        if (dSq5 < bestDistSq) {
          bestDistSq = dSq5;
          bestPoint = p5;
        }
        continue;
      }

      if (path.id === 6) {
        const p6 = this.projectOntoCurvedPath(
          x,
          z,
          PATH_6_WAYPOINTS,
          PATH_6_END_CLEARING.radius
        );
        const dSq6 = (x - p6.x) ** 2 + (z - p6.z) ** 2;
        if (dSq6 < bestDistSq) {
          bestDistSq = dSq6;
          bestPoint = p6;
        }
        continue;
      }

      if (path.id === 7) {
        const p7 = this.projectOntoCurvedPath(
          x,
          z,
          PATH_7_WAYPOINTS,
          PATH_7_END_CLEARING.radius
        );
        const dSq7 = (x - p7.x) ** 2 + (z - p7.z) ** 2;
        if (dSq7 < bestDistSq) {
          bestDistSq = dSq7;
          bestPoint = p7;
        }
        continue;
      }

      const dirX = Math.sin(path.angleRad);
      const dirZ = -Math.cos(path.angleRad);
      const perpX = -dirZ;
      const perpZ = dirX;

      const along = Math.max(
        this.clearingRadius - 0.2,
        Math.min(this.maxRadius, x * dirX + z * dirZ)
      );
      const cross = Math.max(
        -this.pathHalfWidth,
        Math.min(this.pathHalfWidth, x * perpX + z * perpZ)
      );

      const candX = dirX * along + perpX * cross;
      const candZ = dirZ * along + perpZ * cross;
      const dSq = (x - candX) ** 2 + (z - candZ) ** 2;
      if (dSq < bestDistSq) {
        bestDistSq = dSq;
        bestPoint = { x: candX, z: candZ };
      }
    }

    return bestPoint;
  }

  /**
   * Prüft, ob ein Punkt innerhalb einer quer über den befestigten Weg liegenden Barriere liegt.
   * Der Vektor vom Kreuzungszentrum (0, 0) zur Sperre definiert die Längsachse (entlang des Weges),
   * die Normale quer dazu definiert die Querachse (über die gesamte Wegbreite).
   */
  private isCollidingWithBarrier(
    x: number,
    z: number,
    barrierPos: Vector2D,
    halfWidth = 2.6,
    halfDepth = 1.45
  ): boolean {
    const len = Math.hypot(barrierPos.x, barrierPos.z);
    if (len < 1e-4) {
      return false;
    }
    const ux = barrierPos.x / len;
    const uz = barrierPos.z / len;
    const dx = x - barrierPos.x;
    const dz = z - barrierPos.z;
    const dAlong = dx * ux + dz * uz;
    const dAcross = -dx * uz + dz * ux;
    return Math.abs(dAcross) < halfWidth && Math.abs(dAlong) < halfDepth;
  }

  /**
   * Schiebt eine Position, die in eine gesperrte Barriere eintritt, zuverlässig vor die Barriere auf die Kreuzungsseite.
   */
  private pushOutOfBarrier(
    x: number,
    z: number,
    barrierPos: Vector2D,
    halfWidth = 2.6,
    halfDepth = 1.45
  ): Vector2D {
    const len = Math.hypot(barrierPos.x, barrierPos.z);
    if (len < 1e-4) {
      return { x, z };
    }
    const ux = barrierPos.x / len;
    const uz = barrierPos.z / len;
    const dx = x - barrierPos.x;
    const dz = z - barrierPos.z;
    const dAlong = dx * ux + dz * uz;
    const dAcross = -dx * uz + dz * ux;

    if (Math.abs(dAcross) < halfWidth && Math.abs(dAlong) < halfDepth) {
      // Wenn der Spieler sich von der Kreuzung genähert hat (dAlong <= 0): vor die Barriere schieben
      const targetAlong = dAlong <= 0 ? -halfDepth : halfDepth;
      return {
        x: barrierPos.x + dAcross * (-uz) + targetAlong * ux,
        z: barrierPos.z + dAcross * ux + targetAlong * uz,
      };
    }
    return { x, z };
  }

  private pushOutOfCircle(
    x: number,
    z: number,
    center: Vector2D,
    radius: number
  ): Vector2D {
    const dx = x - center.x;
    const dz = z - center.z;
    const dist = Math.hypot(dx, dz);
    if (dist >= radius) {
      return { x, z };
    }
    if (dist < 0.0001) {
      return { x: center.x, z: center.z + radius };
    }
    const scale = radius / dist;
    return {
      x: center.x + dx * scale,
      z: center.z + dz * scale,
    };
  }

  /**
   * Schiebt eine Position bei Kontakt mit Hindernissen an deren Außenkante.
   */
  public resolveObstacleCollisions(x: number, z: number): Vector2D {

    let resolvedX = x;
    let resolvedZ = z;

    for (let pass = 0; pass < 3; pass++) {
      const afterChest = this.pushOutOfCircle(
        resolvedX,
        resolvedZ,
        this.chestPos,
        this.chestCollisionRadius
      );
      resolvedX = afterChest.x;
      resolvedZ = afterChest.z;

      const afterSign = this.pushOutOfCircle(
        resolvedX,
        resolvedZ,
        this.signpostPos,
        this.signpostCollisionRadius
      );
      resolvedX = afterSign.x;
      resolvedZ = afterSign.z;

      const afterNpc = this.pushOutOfCircle(
        resolvedX,
        resolvedZ,
        this.npcPos,
        this.npcCollisionRadius
      );
      resolvedX = afterNpc.x;
      resolvedZ = afterNpc.z;

      const afterGreyMan = this.pushOutOfCircle(
        resolvedX,
        resolvedZ,
        this.greyManPos,
        this.greyManCollisionRadius
      );
      resolvedX = afterGreyMan.x;
      resolvedZ = afterGreyMan.z;

      const afterCave = this.pushOutOfCircle(
        resolvedX,
        resolvedZ,
        this.cavePos,
        this.caveCollisionRadius
      );
      resolvedX = afterCave.x;
      resolvedZ = afterCave.z;

      // Detaillierte Kollisionsauflösung für das Bergmassiv (Felswand, Stolleneingang und Felsflanken)
      let localCave = this.toCaveLocal(resolvedX, resolvedZ);
      for (const rock of this.caveLocalRockColliders) {
        const pushed = this.pushOutOfCircle(
          localCave.lx,
          localCave.lz,
          { x: rock.lx, z: rock.lz },
          rock.radius
        );
        localCave = { lx: pushed.x, lz: pushed.z };
      }
      if (
        Math.abs(localCave.lx) < 8.5 &&
        localCave.lz > -10.0 &&
        localCave.lz < this.caveFrontWallLz
      ) {
        localCave.lz = this.caveFrontWallLz;
      }
      const worldAfterRock = this.fromCaveLocal(localCave.lx, localCave.lz);
      resolvedX = worldAfterRock.x;
      resolvedZ = worldAfterRock.z;

      // Waldteich-Kollision am Ende von Weg 2 (Spieler bleibt am trockenen Ufer)
      const afterPond = this.pushOutOfCircle(
        resolvedX,
        resolvedZ,
        this.pondPos,
        this.pondCollisionRadius
      );
      resolvedX = afterPond.x;
      resolvedZ = afterPond.z;

      // Wehrbrücke & Stausee auf Weg 3:
      // Auf der Brücke selbst (|localBridge.lz| < 3.2) bleibt die Gehfläche frei begehbar (|localBridge.lx| <= 1.02),
      // aber das Geländer hält den Spieler sicher auf dem Steg.
      let localBridge = this.toBridgeLocal(resolvedX, resolvedZ);
      if (Math.abs(localBridge.lz) < 3.2) {
        if (Math.abs(localBridge.lx) > 1.02 && Math.abs(localBridge.lx) < 4.5) {
          localBridge.lx = Math.sign(localBridge.lx) * 1.02;
          const worldOnBridge = this.fromBridgeLocal(localBridge.lx, localBridge.lz);
          resolvedX = worldOnBridge.x;
          resolvedZ = worldOnBridge.z;
        }
      }
      // Stauseebecken links neben der Brücke
      const lakeCenter = { x: -5.4, z: 0 };
      const distToLake = Math.hypot(localBridge.lx - lakeCenter.x, localBridge.lz - lakeCenter.z);
      if (distToLake < 4.2) {
        const pushedLake = this.pushOutOfCircle(
          localBridge.lx,
          localBridge.lz,
          lakeCenter,
          4.2
        );
        const worldLake = this.fromBridgeLocal(pushedLake.x, pushedLake.z);
        resolvedX = worldLake.x;
        resolvedZ = worldLake.z;
      }

      // Riesen-Kollision am Ende von Weg 3
      const afterGiant = this.pushOutOfCircle(
        resolvedX,
        resolvedZ,
        this.giantPos,
        this.giantCollisionRadius
      );
      resolvedX = afterGiant.x;
      resolvedZ = afterGiant.z;

      // Holzweibchen-Kollision am Ende von Weg 4
      const afterWoodWoman = this.pushOutOfCircle(
        resolvedX,
        resolvedZ,
        this.woodWomanPos,
        this.woodWomanCollisionRadius
      );
      resolvedX = afterWoodWoman.x;
      resolvedZ = afterWoodWoman.z;

      // Aufbauten der Campfire-Insel (Holzfällercamp auf Weg 4):
      // Solide Barriere um die erhöhte Insel (Radius 2.55m), verhindert Durchlaufen von Kessel, Feuer, Zelt und Stämmen
      const afterLumberCamp = this.pushOutOfCircle(
        resolvedX,
        resolvedZ,
        this.lumberCampPos,
        this.lumberCampCollisionRadius
      );
      resolvedX = afterLumberCamp.x;
      resolvedZ = afterLumberCamp.z;

      // Teufel-Kollision am Ende von Weg 5
      const afterDevil = this.pushOutOfCircle(
        resolvedX,
        resolvedZ,
        this.devilPos,
        this.devilCollisionRadius
      );
      resolvedX = afterDevil.x;
      resolvedZ = afterDevil.z;

      // Höllenschlund-/Lavaschlund-Kollision (Spieler bleibt auf dem festen Felsrand)
      const afterHellChasm = this.pushOutOfCircle(
        resolvedX,
        resolvedZ,
        this.hellChasmPos,
        this.hellChasmCollisionRadius
      );
      resolvedX = afterHellChasm.x;
      resolvedZ = afterHellChasm.z;

      // Wilder Jäger an der Jagdhütte auf Weg 6
      const afterHunter = this.pushOutOfCircle(
        resolvedX,
        resolvedZ,
        this.wildHunterPos,
        this.wildHunterCollisionRadius
      );
      resolvedX = afterHunter.x;
      resolvedZ = afterHunter.z;

      // Holzweibchen vor dem Kräutergarten auf Weg 6
      const afterLodgeWoman = this.pushOutOfCircle(
        resolvedX,
        resolvedZ,
        this.woodWomanLodgePos,
        this.woodWomanLodgeCollisionRadius
      );
      resolvedX = afterLodgeWoman.x;
      resolvedZ = afterLodgeWoman.z;

      // Eingezäunter Kräutergarten auf Weg 6 (AABB um -46.7, 21.0)
      const relGardenX = resolvedX - (-46.7);
      const relGardenZ = resolvedZ - 21.0;
      if (Math.abs(relGardenX) < 1.85 && Math.abs(relGardenZ) < 1.75) {
        const penX = 1.85 - Math.abs(relGardenX);
        const penZ = 1.75 - Math.abs(relGardenZ);
        if (penX < penZ) {
          resolvedX = -46.7 + (relGardenX >= 0 ? 1.85 : -1.85);
        } else {
          resolvedZ = 21.0 + (relGardenZ >= 0 ? 1.75 : -1.75);
        }
      }

      // Kamin an der Jagdhütte bei (-48.8, 25.4)
      const relChimneyX = resolvedX - (-48.8);
      const relChimneyZ = resolvedZ - 25.4;
      if (Math.abs(relChimneyX) < 0.65 && Math.abs(relChimneyZ) < 0.65) {
        const penX = 0.65 - Math.abs(relChimneyX);
        const penZ = 0.65 - Math.abs(relChimneyZ);
        if (penX < penZ) {
          resolvedX = -48.8 + (relChimneyX >= 0 ? 0.65 : -0.65);
        } else {
          resolvedZ = 25.4 + (relChimneyZ >= 0 ? 0.65 : -0.65);
        }
      }

      // Ruinen-Kollision (AABB um Steinturm und Mauerruine)
      for (const ruin of [
        { center: this.stoneTowerCenter, hw: this.stoneTowerHalfWidth, hd: this.stoneTowerHalfDepth },
        { center: this.stoneRuinCenter, hw: this.stoneRuinHalfWidth, hd: this.stoneRuinHalfDepth },
      ]) {
        const relRuinX = resolvedX - ruin.center.x;
        const relRuinZ = resolvedZ - ruin.center.z;
        if (Math.abs(relRuinX) < ruin.hw && Math.abs(relRuinZ) < ruin.hd) {
          const penX = ruin.hw - Math.abs(relRuinX);
          const penZ = ruin.hd - Math.abs(relRuinZ);
          if (penX < penZ) {
            resolvedX = ruin.center.x + (relRuinX >= 0 ? ruin.hw : -ruin.hw);
          } else {
            resolvedZ = ruin.center.z + (relRuinZ >= 0 ? ruin.hd : -ruin.hd);
          }
        }
      }

      // Schutzhütten-Kollision (AABB um hutPos mit tangentialem Wand-Gleiten)
      const relX = resolvedX - this.hutPos.x;
      const relZ = resolvedZ - this.hutPos.z;
      const absRelX = Math.abs(relX);
      const absRelZ = Math.abs(relZ);

      if (absRelX < this.hutHalfWidth && absRelZ < this.hutHalfDepth) {
        const penX = this.hutHalfWidth - absRelX;
        const penZ = this.hutHalfDepth - absRelZ;
        if (penX < penZ) {
          resolvedX = this.hutPos.x + (relX >= 0 ? this.hutHalfWidth : -this.hutHalfWidth);
        } else {
          resolvedZ = this.hutPos.z + (relZ >= 0 ? this.hutHalfDepth : -this.hutHalfDepth);
        }
      }

      // Felsbrocken auf Weg 1 (blockiert den Wegkorridor vollständig)
      if (this.path1BoulderBlocked) {
        const afterBarrier = this.pushOutOfBarrier(
          resolvedX,
          resolvedZ,
          this.path1BoulderPos
        );
        resolvedX = afterBarrier.x;
        resolvedZ = afterBarrier.z;

        const afterBoulder = this.pushOutOfCircle(
          resolvedX,
          resolvedZ,
          this.path1BoulderPos,
          this.path1BoulderRadius
        );
        resolvedX = afterBoulder.x;
        resolvedZ = afterBoulder.z;
      }

      // Wasserpfütze auf Weg 2
      if (this.path2PuddleBlocked) {
        const afterBarrier = this.pushOutOfBarrier(
          resolvedX,
          resolvedZ,
          this.path2PuddlePos
        );
        resolvedX = afterBarrier.x;
        resolvedZ = afterBarrier.z;

        const afterPuddle = this.pushOutOfCircle(
          resolvedX,
          resolvedZ,
          this.path2PuddlePos,
          this.path2PuddleRadius
        );
        resolvedX = afterPuddle.x;
        resolvedZ = afterPuddle.z;
      }

      // Reißender Gebirgsbach auf Weg 3
      if (this.path3StreamBlocked) {
        const afterBarrier = this.pushOutOfBarrier(
          resolvedX,
          resolvedZ,
          this.path3StreamPos
        );
        resolvedX = afterBarrier.x;
        resolvedZ = afterBarrier.z;

        const afterStream = this.pushOutOfCircle(
          resolvedX,
          resolvedZ,
          this.path3StreamPos,
          this.path3StreamRadius
        );
        resolvedX = afterStream.x;
        resolvedZ = afterStream.z;
      }

      // Baumstamm auf Weg 4
      if (this.path4LogBlocked) {
        const afterBarrier = this.pushOutOfBarrier(
          resolvedX,
          resolvedZ,
          this.path4LogPos
        );
        resolvedX = afterBarrier.x;
        resolvedZ = afterBarrier.z;

        const afterLog = this.pushOutOfCircle(
          resolvedX,
          resolvedZ,
          this.path4LogPos,
          this.path4LogRadius
        );
        resolvedX = afterLog.x;
        resolvedZ = afterLog.z;
      }

      // Flammenwand / Feuer auf Weg 5
      if (this.path5FireBlocked) {
        const afterBarrier = this.pushOutOfBarrier(
          resolvedX,
          resolvedZ,
          this.path5FirePos
        );
        resolvedX = afterBarrier.x;
        resolvedZ = afterBarrier.z;

        const afterFire = this.pushOutOfCircle(
          resolvedX,
          resolvedZ,
          this.path5FirePos,
          this.path5FireRadius
        );
        resolvedX = afterFire.x;
        resolvedZ = afterFire.z;
      }

      // Hohe Kräuterpflanzen mit Geländer auf Weg 6
      if (this.path6HerbsBlocked) {
        const afterBarrier = this.pushOutOfBarrier(
          resolvedX,
          resolvedZ,
          this.path6HerbsPos
        );
        resolvedX = afterBarrier.x;
        resolvedZ = afterBarrier.z;

        const afterHerbs = this.pushOutOfCircle(
          resolvedX,
          resolvedZ,
          this.path6HerbsPos,
          this.path6HerbsRadius
        );
        resolvedX = afterHerbs.x;
        resolvedZ = afterHerbs.z;
      }


      // Tor- und Steinmauer-Kollision am Ende von Weg 7
      const gateDx = resolvedX - CLOSED_GATE_POS.x;
      const gateDz = resolvedZ - CLOSED_GATE_POS.z;
      const gateCos = Math.cos(CLOSED_GATE_POS.rotationY);
      const gateSin = Math.sin(CLOSED_GATE_POS.rotationY);
      const gateLx = gateDx * gateCos - gateDz * gateSin;
      const gateLz = gateDx * gateSin + gateDz * gateCos;
      if (Math.abs(gateLx) < 12.0 && gateLz < 0.75 && gateLz > -4.5) {
        const clampedLz = 0.75;
        resolvedX = CLOSED_GATE_POS.x + gateLx * gateCos + clampedLz * gateSin;
        resolvedZ = CLOSED_GATE_POS.z - gateLx * gateSin + clampedLz * gateCos;
      }
    }

    return { x: resolvedX, z: resolvedZ };
  }

  private getClosestPathAt(x: number, z: number): ForestPathData | null {
    if (this.isPointOnPath1(x, z)) {
      return SEVEN_PATHS[0];
    }
    if (this.isPointOnPath2(x, z)) {
      return SEVEN_PATHS[1];
    }
    if (this.isPointOnPath3(x, z)) {
      return SEVEN_PATHS[2];
    }
    if (this.isPointOnPath4(x, z)) {
      return SEVEN_PATHS[3];
    }
    if (this.isPointOnPath5(x, z)) {
      return SEVEN_PATHS[4];
    }
    if (this.isPointOnPath6(x, z)) {
      return SEVEN_PATHS[5];
    }
    if (this.isPointOnPath7(x, z)) {
      return SEVEN_PATHS[6];
    }

    let playerAngle = Math.atan2(x, -z);
    if (playerAngle < 0) {
      playerAngle += Math.PI * 2;
    }

    let closestPath = SEVEN_PATHS[0];
    let smallestDiff = Infinity;

    for (const path of SEVEN_PATHS) {
      let diff = Math.abs(playerAngle - path.angleRad);
      if (diff > Math.PI) {
        diff = Math.PI * 2 - diff;
      }
      if (diff < smallestDiff) {
        smallestDiff = diff;
        closestPath = path;
      }
    }

    return smallestDiff < 0.35 ? closestPath : null;
  }

  /**
   * Bewegt die Spielfigur unter Beachtung der Weg-/Kreuzungsgrenzen und Hinderniskollisionen.
   */
  public movePlayer(dx: number, dz: number): Readonly<Vector2D> {
    const prevDist = Math.hypot(this.playerPos.x, this.playerPos.z);
    const currentPath =
      prevDist > this.clearingRadius
        ? this.getClosestPathAt(this.playerPos.x, this.playerPos.z)
        : null;

    const rawX = this.playerPos.x + dx;
    const rawZ = this.playerPos.z + dz;

    const onSurface = this.projectOntoWalkableSurface(
      rawX,
      rawZ,
      currentPath ? currentPath.id : null
    );
    const collisionFree = this.resolveObstacleCollisions(onSurface.x, onSurface.z);
    const projectedBack = this.projectOntoWalkableSurface(
      collisionFree.x,
      collisionFree.z,
      currentPath ? currentPath.id : null
    );
    this.playerPos = projectedBack;

    return this.getPlayerPosition();
  }

  /**
   * Setzt ein Ziel für die Mausbewegung (Click-to-Move) auf einen gültigen Punkt auf Weg oder Kreuzung.
   */
  public setTargetPosition(x: number, z: number): Readonly<Vector2D> {
    this.isReturningToClearing = false;
    const onSurface = this.projectOntoWalkableSurface(x, z, null);
    const collisionFree = this.resolveObstacleCollisions(onSurface.x, onSurface.z);
    const projectedBack = this.projectOntoWalkableSurface(collisionFree.x, collisionFree.z, null);
    this.targetPos = this.resolveObstacleCollisions(projectedBack.x, projectedBack.z);
    return { ...this.targetPos };
  }

  public clearTargetPosition(): void {
    this.targetPos = null;
    this.isReturningToClearing = false;
  }

  /**
   * Lässt die Spielfigur per Maus-Klick zum Eingang eines ausgewählten Weges laufen.
   */
  public setTargetToPathEntrance(pathId: number, distance = 9): Readonly<Vector2D> | null {
    const path = this.selectPath(pathId);
    if (!path) {
      return null;
    }
    return this.setTargetPosition(
      Math.sin(path.angleRad) * distance,
      -Math.cos(path.angleRad) * distance
    );
  }

  public setTargetToHut(): Readonly<Vector2D> {
    return this.setTargetPosition(-0.3, this.hutPos.z + this.hutHalfDepth + 0.35);
  }

  public setTargetToChest(): Readonly<Vector2D> {
    return this.setTargetPosition(
      this.chestPos.x,
      this.chestPos.z + this.chestCollisionRadius + 0.35
    );
  }

  public setTargetToSignpost(): Readonly<Vector2D> {
    return this.setTargetPosition(
      this.signpostPos.x,
      this.signpostPos.z + this.signpostCollisionRadius + 0.35
    );
  }

  public setTargetToNpc(): Readonly<Vector2D> {
    return this.setTargetPosition(
      this.npcPos.x,
      this.npcPos.z + this.npcCollisionRadius + 0.45
    );
  }

  /**
   * Lässt die Spielfigur entlang des 1. Weges durch die Kurve bis vor das Graumännchen am Höhleneingang laufen.
   */
  public setTargetToGreyMan(): Readonly<Vector2D> {
    this.selectPath(1);
    return this.setTargetPosition(this.greyManPos.x - 0.9, this.greyManPos.z + 1.15);
  }

  /**
   * Lässt die Spielfigur entlang des 2. Weges bis direkt an das Teichufer vor den Stein der Nixe laufen.
   */
  public setTargetToNixie(): Readonly<Vector2D> {
    this.selectPath(2);
    return this.setTargetPosition(41.9, -14.2);
  }

  /**
   * Lässt die Spielfigur entlang des 3. Weges über die Brücke bis direkt vor den Riesen am Wehr laufen.
   */
  public setTargetToGiant(): Readonly<Vector2D> {
    this.selectPath(3);
    return this.setTargetPosition(this.giantPos.x - 2.0, this.giantPos.z + 1.1);
  }

  /**
   * Lässt die Spielfigur entlang des 4. Weges bis auf die Waldlichtung kurz vor die Insel zum Holzweibchen laufen.
   */
  public setTargetToWoodWoman(): Readonly<Vector2D> {
    this.selectPath(4);
    return this.setTargetPosition(this.woodWomanPos.x - 0.25, this.woodWomanPos.z - 1.0);
  }

  /**
   * Lässt die Spielfigur entlang des 5. Weges bis an den Kraterrand vor den Teufel am Höllenschlund laufen.
   */
  public setTargetToDevil(): Readonly<Vector2D> {
    this.selectPath(5);
    return this.setTargetPosition(-21.2, 44.8);
  }

  /**
   * Lässt die Spielfigur entlang des 6. Weges bis vor den Wilden Jäger an der Jagdhütte laufen.
   */
  public setTargetToWildHunter(): Readonly<Vector2D> {
    this.selectPath(6);
    return this.setTargetPosition(this.wildHunterPos.x + 0.85, this.wildHunterPos.z - 0.45);
  }

  /**
   * Lässt die Spielfigur entlang des 6. Weges vor das Holzweibchen am Kräutergartenzaun laufen.
   */
  public setTargetToWoodWomanLodge(): Readonly<Vector2D> {
    this.selectPath(6);
    return this.setTargetPosition(this.woodWomanLodgePos.x + 0.75, this.woodWomanLodgePos.z - 0.5);
  }

  /**
   * Lässt die Spielfigur entlang des 7. Weges bis direkt auf den Vorplatz vor das geschlossene Tor laufen.
   */
  public setTargetToGate(): Readonly<Vector2D> {
    this.selectPath(7);
    return this.setTargetPosition(PATH_7_END_CLEARING.x, PATH_7_END_CLEARING.z);
  }

  /**
   * Berechnet den kontinuierlichen Fortschritt entlang der Segmente eines Kurvenweges.
   */
  private getCurvedPathProgress(
    x: number,
    z: number,
    waypoints: readonly PathPoint2D[]
  ): number {
    let bestProgress = 0;
    let bestDistSq = Infinity;

    for (let i = 0; i < waypoints.length - 1; i++) {
      const a = waypoints[i];
      const b = waypoints[i + 1];
      const abx = b.x - a.x;
      const abz = b.z - a.z;
      const abLenSq = abx * abx + abz * abz;
      const t =
        abLenSq < 1e-6
          ? 0
          : Math.max(0, Math.min(1, ((x - a.x) * abx + (z - a.z) * abz) / abLenSq));
      const cx = a.x + t * abx;
      const cz = a.z + t * abz;
      const dSq = (x - cx) ** 2 + (z - cz) ** 2;
      if (dSq < bestDistSq) {
        bestDistSq = dSq;
        bestProgress = i + t;
      }
    }

    return bestProgress;
  }

  private getPointAtCurvedPathProgress(
    progress: number,
    waypoints: readonly PathPoint2D[]
  ): Vector2D {
    const maxSeg = waypoints.length - 2;
    const clamped = Math.max(0, Math.min(maxSeg + 1, progress));
    const idx = Math.min(maxSeg, Math.floor(clamped));
    const t = clamped - idx;
    const a = waypoints[idx];
    const b = waypoints[idx + 1];
    return {
      x: a.x + t * (b.x - a.x),
      z: a.z + t * (b.z - a.z),
    };
  }

  /**
   * Ermittelt einen stetig mitgleitenden Lookahead-Punkt entlang der Kurve von Weg 1, 2, 3 oder 4,
   * damit die Spielfigur beim Auto-Walk vorwärts wie rückwärts völlig ruckelfrei auf dem Pfad bleibt.
   */
  private getNextCurvedWaypoint(
    target: Vector2D,
    waypoints: readonly PathPoint2D[],
    isOnPathFn: (x: number, z: number) => boolean
  ): Vector2D {
    const playerOnPath = isOnPathFn(this.playerPos.x, this.playerPos.z);
    const targetOnPath = isOnPathFn(target.x, target.z);

    if (!playerOnPath && !targetOnPath) {
      return target;
    }

    const playerProg = this.getCurvedPathProgress(this.playerPos.x, this.playerPos.z, waypoints);
    const targetProg = this.getCurvedPathProgress(target.x, target.z, waypoints);
    const diff = targetProg - playerProg;

    if (Math.abs(diff) <= 0.35) {
      return target;
    }

    const stepProg = diff > 0 ? 0.38 : -0.38;
    const lookaheadProg =
      diff > 0
        ? Math.min(targetProg, playerProg + stepProg)
        : Math.max(targetProg, playerProg + stepProg);

    return this.getPointAtCurvedPathProgress(lookaheadProg, waypoints);
  }

  /**
   * Aktualisiert die schrittweise Bewegung zum Zielpunkt (Click-to-Move bzw. automatischer Rücklauf).
   * Bei aktivem Rücklauf zur 7-Wegekreuzung wird die doppelte Geschwindigkeit (13.0 m/s) verwendet.
   */
  public updateAutoWalk(dtSeconds: number, speed?: number): Readonly<Vector2D> {
    if (!this.targetPos || dtSeconds <= 0) {
      this.isReturningToClearing = false;
      return this.getPlayerPosition();
    }

    const effectiveSpeed =
      speed !== undefined ? speed : (this.isReturningToClearing ? 13.0 : 6.5);

    let effectiveTarget = this.targetPos;
    const playerDist = Math.hypot(this.playerPos.x, this.playerPos.z);
    const targetDist = Math.hypot(this.targetPos.x, this.targetPos.z);

    const playerPath =
      playerDist > this.clearingRadius ? this.getClosestPathAt(this.playerPos.x, this.playerPos.z) : null;
    const targetPath =
      targetDist > this.clearingRadius ? this.getClosestPathAt(this.targetPos.x, this.targetPos.z) : null;

    if (playerPath && (!targetPath || targetPath.id !== playerPath.id)) {
      if (playerPath.id === 1) {
        effectiveTarget = this.getNextCurvedWaypoint(
          PATH_1_WAYPOINTS[0],
          PATH_1_WAYPOINTS,
          (px, pz) => this.isPointOnPath1(px, pz)
        );
      } else if (playerPath.id === 2) {
        effectiveTarget = this.getNextCurvedWaypoint(
          PATH_2_WAYPOINTS[0],
          PATH_2_WAYPOINTS,
          (px, pz) => this.isPointOnPath2(px, pz)
        );
      } else if (playerPath.id === 3) {
        effectiveTarget = this.getNextCurvedWaypoint(
          PATH_3_WAYPOINTS[0],
          PATH_3_WAYPOINTS,
          (px, pz) => this.isPointOnPath3(px, pz)
        );
      } else if (playerPath.id === 4) {
        effectiveTarget = this.getNextCurvedWaypoint(
          PATH_4_WAYPOINTS[0],
          PATH_4_WAYPOINTS,
          (px, pz) => this.isPointOnPath4(px, pz)
        );
      } else if (playerPath.id === 5) {
        effectiveTarget = this.getNextCurvedWaypoint(
          PATH_5_WAYPOINTS[0],
          PATH_5_WAYPOINTS,
          (px, pz) => this.isPointOnPath5(px, pz)
        );
      } else if (playerPath.id === 6) {
        effectiveTarget = this.getNextCurvedWaypoint(
          PATH_6_WAYPOINTS[0],
          PATH_6_WAYPOINTS,
          (px, pz) => this.isPointOnPath6(px, pz)
        );
      } else if (playerPath.id === 7) {
        effectiveTarget = this.getNextCurvedWaypoint(
          PATH_7_WAYPOINTS[0],
          PATH_7_WAYPOINTS,
          (px, pz) => this.isPointOnPath7(px, pz)
        );
      } else {
        effectiveTarget = {
          x: Math.sin(playerPath.angleRad) * (this.clearingRadius - 0.6),
          z: -Math.cos(playerPath.angleRad) * (this.clearingRadius - 0.6),
        };
      }
    } else if (targetPath && targetPath.id === 1) {
      effectiveTarget = this.getNextCurvedWaypoint(
        this.targetPos,
        PATH_1_WAYPOINTS,
        (px, pz) => this.isPointOnPath1(px, pz)
      );
    } else if (targetPath && targetPath.id === 2) {
      effectiveTarget = this.getNextCurvedWaypoint(
        this.targetPos,
        PATH_2_WAYPOINTS,
        (px, pz) => this.isPointOnPath2(px, pz)
      );
    } else if (targetPath && targetPath.id === 3) {
      effectiveTarget = this.getNextCurvedWaypoint(
        this.targetPos,
        PATH_3_WAYPOINTS,
        (px, pz) => this.isPointOnPath3(px, pz)
      );
    } else if (targetPath && targetPath.id === 4) {
      effectiveTarget = this.getNextCurvedWaypoint(
        this.targetPos,
        PATH_4_WAYPOINTS,
        (px, pz) => this.isPointOnPath4(px, pz)
      );
    } else if (targetPath && targetPath.id === 5) {
      effectiveTarget = this.getNextCurvedWaypoint(
        this.targetPos,
        PATH_5_WAYPOINTS,
        (px, pz) => this.isPointOnPath5(px, pz)
      );
    } else if (targetPath && targetPath.id === 6) {
      effectiveTarget = this.getNextCurvedWaypoint(
        this.targetPos,
        PATH_6_WAYPOINTS,
        (px, pz) => this.isPointOnPath6(px, pz)
      );
    } else if (targetPath && targetPath.id === 7) {
      effectiveTarget = this.getNextCurvedWaypoint(
        this.targetPos,
        PATH_7_WAYPOINTS,
        (px, pz) => this.isPointOnPath7(px, pz)
      );
    }

    // Falls die direkte Linie auf der Kreuzung durch die vergrößerte Schutzhütte führt,
    // nutze einen seitlichen Wegpunkt links/rechts oder vorn/hinten neben der Hütte
    const hutMinX = this.hutPos.x - this.hutHalfWidth;
    const hutMaxX = this.hutPos.x + this.hutHalfWidth;
    const hutMinZ = this.hutPos.z - this.hutHalfDepth;
    const hutMaxZ = this.hutPos.z + this.hutHalfDepth;

    // Kreuzt der Weg die Hütte in Z (von hinten nach vorn oder umgekehrt)?
    const crossesZ =
      (this.playerPos.z < hutMinZ && effectiveTarget.z > hutMinZ) ||
      (this.playerPos.z > hutMaxZ && effectiveTarget.z < hutMaxZ);

    // Kreuzt der Weg die Hütte in X (von links nach rechts oder umgekehrt)?
    const crossesX =
      (this.playerPos.x < hutMinX && effectiveTarget.x > hutMinX) ||
      (this.playerPos.x > hutMaxX && effectiveTarget.x < hutMaxX);

    // Befindet sich der Spieler an der seitlichen Flanke der Hütte?
    const stuckAtSide =
      Math.abs(this.playerPos.x) <= this.hutHalfWidth + 0.65 &&
      this.playerPos.z >= hutMinZ - 0.2 &&
      this.playerPos.z <= hutMaxZ + 0.2;

    if (playerDist <= this.clearingRadius + 0.5) {
      if (crossesZ && Math.abs(this.playerPos.x) <= this.hutHalfWidth + 0.65) {
        // Von vorn nach hinten oder umgekehrt: seitlich an der Hütte vorbei
        const sideMargin = this.hutHalfWidth + 0.85;
        const sideX = this.playerPos.x + effectiveTarget.x >= 0 ? sideMargin : -sideMargin;
        effectiveTarget = { x: sideX, z: this.hutPos.z };
      } else if (crossesX && stuckAtSide) {
        // Von links nach rechts (oder umgekehrt) durch die Hütte:
        // Vor oder hinter der Hütte vorbei, je nachdem in welchem Z-Halbraum das Ziel liegt
        const targetInFront = effectiveTarget.z >= this.hutPos.z;
        const detourZ = targetInFront ? hutMaxZ + 0.65 : hutMinZ - 0.65;
        const currentSideX =
          this.playerPos.x >= 0 ? this.hutHalfWidth + 0.85 : -(this.hutHalfWidth + 0.85);
        effectiveTarget = { x: currentSideX, z: detourZ };
      }
    }

    const dx = effectiveTarget.x - this.playerPos.x;
    const dz = effectiveTarget.z - this.playerPos.z;
    const dist = Math.hypot(dx, dz);
    const maxStep = effectiveSpeed * dtSeconds;

    if (dist <= maxStep || dist < 0.05) {
      const prevPos = { ...this.playerPos };
      this.movePlayer(dx, dz);
      if (
        effectiveTarget === this.targetPos &&
        Math.hypot(this.playerPos.x - this.targetPos.x, this.playerPos.z - this.targetPos.z) < 0.15
      ) {
        this.targetPos = null;
        this.isReturningToClearing = false;
      } else if (
        effectiveTarget === this.targetPos &&
        Math.hypot(this.playerPos.x - prevPos.x, this.playerPos.z - prevPos.z) < 0.001
      ) {
        this.targetPos = null;
        this.isReturningToClearing = false;
      }
      return this.getPlayerPosition();
    }

    const stepX = (dx / dist) * maxStep;
    const stepZ = (dz / dist) * maxStep;
    const beforeX = this.playerPos.x;
    const beforeZ = this.playerPos.z;

    this.movePlayer(stepX, stepZ);

    const movedDist = Math.hypot(this.playerPos.x - beforeX, this.playerPos.z - beforeZ);
    if (movedDist < maxStep * 0.35 && playerDist <= this.clearingRadius + 0.5) {
      const sideSign = beforeX * dz - beforeZ * dx >= 0 ? 1 : -1;
      const perpX = (-dz / dist) * maxStep * sideSign;
      const perpZ = (dx / dist) * maxStep * sideSign;
      this.movePlayer(perpX, perpZ);
    }

    return this.getPlayerPosition();
  }

  /**
   * Setzt die Spielfigur direkt auf den Eingang eines ausgewählten Weges.
   */
  public movePlayerToPathEntrance(pathId: number, distance = 9): Readonly<Vector2D> {
    const path = this.selectPath(pathId);
    if (!path) {
      return this.getPlayerPosition();
    }
    this.targetPos = null;
    const clampedDist = Math.max(this.clearingRadius + 0.5, Math.min(this.maxRadius, distance));
    this.playerPos = {
      x: Math.sin(path.angleRad) * clampedDist,
      z: -Math.cos(path.angleRad) * clampedDist,
    };
    return this.getPlayerPosition();
  }

  /**
   * Ermittelt, welchem Objekt, NPC oder Weg die spielende Person am nächsten ist.
   */
  public getActivePointOfInterest(): PointOfInterest {
    const distToGate = Math.hypot(
      this.playerPos.x - this.gatePos.x,
      this.playerPos.z - this.gatePos.z
    );
    if (distToGate < 5.2) {
      return {
        type: 'gate',
        label:
          'Geschlossenes Tor – ein uraltes, mit schweren Eisenketten versiegeltes Portal versperrt den weiteren Weg (Klick oder [F]).',
      };
    }

    const nearHunter = this.isNearWildHunter();
    const nearWoodLodge = this.isNearWoodWomanLodge();

    if (nearHunter && nearWoodLodge) {
      const distToHunter = Math.hypot(
        this.playerPos.x - this.wildHunterPos.x,
        this.playerPos.z - this.wildHunterPos.z
      );
      const distToWood = Math.hypot(
        this.playerPos.x - this.woodWomanLodgePos.x,
        this.playerPos.z - this.woodWomanLodgePos.z
      );
      if (distToWood <= distToHunter) {
        return {
          type: 'wood_woman_lodge',
          name: WOOD_WOMAN_NPC_NAME,
          label:
            'Vor dem Kräutergarten – sprich mit dem Holzweibchen über die Rettung der jungen Hirschkuh (Klick oder [F]).',
        };
      } else {
        return {
          type: 'wild_hunter',
          name: WILD_HUNTER_NPC_NAME,
          label:
            'Vor der Jagdhütte – sprich mit dem Wilden Jäger über die Jagdordnung und den Diebstahlvorwurf (Klick oder [F]).',
        };
      }
    }

    if (nearHunter) {
      return {
        type: 'wild_hunter',
        name: WILD_HUNTER_NPC_NAME,
        label:
          'Vor der Jagdhütte – sprich mit dem Wilden Jäger über die Jagdordnung und den Diebstahlvorwurf (Klick oder [F]).',
      };
    }

    if (nearWoodLodge) {
      return {
        type: 'wood_woman_lodge',
        name: WOOD_WOMAN_NPC_NAME,
        label:
          'Vor dem Kräutergarten – sprich mit dem Holzweibchen über die Rettung der jungen Hirschkuh (Klick oder [F]).',
      };
    }

    const distToGarden = Math.hypot(
      this.playerPos.x - (this.huntingLodgePos.x - 2.5),
      this.playerPos.z - (this.huntingLodgePos.z - 1.8)
    );
    if (distToGarden < 3.8) {
      return {
        type: 'herb_garden',
        label:
          'Umzäunter Kräutergarten – Königs-Salbei, Lavendel und die seltene Mondwurz gedeihen hier in voller Pracht.',
      };
    }

    const distToLodge = Math.hypot(
      this.playerPos.x - this.huntingLodgePos.x,
      this.playerPos.z - this.huntingLodgePos.z
    );
    if (distToLodge < 6.8) {
      return {
        type: 'hunting_lodge',
        label:
          'Uralte Steinruinen an der Waldlichtung des Wilden Jägers – verfallener Steinturm und verwitterte Mauern.',
      };
    }

    if (this.isNearDevil()) {
      return {
        type: 'devil',
        name: DEVIL_NPC_NAME,
        label:
          'Inmitten des Höllenschlundes – sprich mit dem Teufel auf seinem Obsidianfelsen (Klick oder [F]).',
      };
    }

    const distToChasm = Math.hypot(
      this.playerPos.x - this.hellChasmPos.x,
      this.playerPos.z - this.hellChasmPos.z
    );
    if (distToChasm < this.hellChasmCollisionRadius + 2.5) {
      return {
        type: 'hell_chasm',
        label:
          'Feuriger Höllenschlund – ein loderndes Meer aus Lava und Flammen, in dessen Mitte der Teufel thront.',
      };
    }

    if (this.isNearWoodWoman()) {
      return {
        type: 'wood_woman',
        name: WOOD_WOMAN_NPC_NAME,
        label:
          'Im Holzfällerlager auf der Waldlichtung – sprich mit dem Holzweibchen über das Brennholz gegen die Kälte und die Gefährdung des Waldes (Klick oder [F]).',
      };
    }

    const distToCamp = Math.hypot(
      this.playerPos.x - this.lumberCampPos.x,
      this.playerPos.z - this.lumberCampPos.z
    );
    if (distToCamp < 4.8) {
      return {
        type: 'lumber_camp',
        label:
          'Holzfällerlager auf der Waldlichtung – Brennholz rettet das Dorf vor der Kälte, doch die starken Fällungen gefährden den Wald.',
      };
    }

    if (this.isNearGiant()) {
      return {
        type: 'giant',
        name: GIANT_NPC_NAME,
        label:
          'Vor dem geschlossenen Wehr am Stausee – sprich mit dem Riesen über die Quelle, die Dürre im Tal und seine Heimat (Klick oder [F]).',
      };
    }

    const distToWeir = Math.hypot(
      this.playerPos.x - this.weirBridgePos.x,
      this.playerPos.z - this.weirBridgePos.z
    );
    if (distToWeir < 3.6) {
      return {
        type: 'weir',
        label:
          'Brücke mit geschlossenem Wehr – der Quellbach wird hier zu einem kleinen Stausee zurückgestaut.',
      };
    }

    if (this.isNearNixie()) {
      return {
        type: 'nixie',
        name: NIXIE_NPC_NAME,
        label:
          'Am Ufer des Spiegelteichs – sprich mit der Nixe auf dem Stein über den verlockenden Schatz und den Fluch (Klick oder [F]).',
      };
    }

    const distToPond = Math.hypot(
      this.playerPos.x - this.pondPos.x,
      this.playerPos.z - this.pondPos.z
    );
    if (distToPond < this.pondCollisionRadius + 1.8) {
      return {
        type: 'pond',
        label:
          'Stiller Waldteich – unter der Wasseroberfläche funkelt ein verlockender Schatz, auf dem ein dunkler Fluch ruht.',
      };
    }

    if (this.isNearGreyMan()) {
      return {
        type: 'grey_man',
        name: GREY_MAN_NPC_NAME,
        label:
          'Vor dem Stollenmundloch – sprich mit dem Graumännchen über die neue Silberader, das Licht und das alte Verbot (Klick oder [F]).',
      };
    }

    const distToCave = Math.hypot(
      this.playerPos.x - this.cavePos.x,
      this.playerPos.z - this.cavePos.z
    );
    if (distToCave < this.caveCollisionRadius + 1.8) {
      return {
        type: 'cave',
        label:
          'Alter Silberstollen im Berg – ein Verbot untersagt offenes Licht, doch im Inneren wartet die rettende Silberader.',
      };
    }

    if (this.isNearNpc()) {
      return {
        type: 'npc',
        name: GUIDE_NPC_NAME,
        label:
          'Waldhüter Arvid an der Schutzhütte – sprich mit ihm über die Kreuzung, seine Vergangenheit und den Rat der sieben Wege (Klick oder [F]).',
      };
    }

    if (this.isNearChest()) {
      return {
        type: 'chest',
        isOpen: this.chestOpen,
        label: this.chestOpen
          ? 'Geöffnete Schatztruhe vor der Hütte – im Inneren schimmert ein kalt leuchtender Waldkristall. (Klick zum Schließen)'
          : 'Verschlossene Schatztruhe vor der Hütte – klicke auf die Truhe, um den Deckel zu öffnen.',
      };
    }

    const distToSignpost = Math.hypot(
      this.playerPos.x - this.signpostPos.x,
      this.playerPos.z - this.signpostPos.z
    );
    if (distToSignpost < this.signpostCollisionRadius + 0.85) {
      return {
        type: 'signpost',
        label: 'Wegweiser mit 7 Schildern – wähle einen der sieben Wege (Klick oder Tasten 1–7).',
      };
    }

    const nearHut =
      Math.abs(this.playerPos.x - this.hutPos.x) < this.hutHalfWidth + 0.75 &&
      Math.abs(this.playerPos.z - this.hutPos.z) < this.hutHalfDepth + 0.75;
    if (nearHut) {
      return {
        type: 'hut',
        label: 'Schutzhütte aus Baumstämmen – ein sicherer Rastplatz in der Mitte der Kreuzung.',
      };
    }

    const distFromCenter = Math.hypot(this.playerPos.x, this.playerPos.z);
    if (distFromCenter >= this.clearingRadius) {
      const closestPath = this.getClosestPathAt(this.playerPos.x, this.playerPos.z);
      if (closestPath) {
        this.selectedPathId = closestPath.id;
        return { type: 'path', path: closestPath };
      }
    }

    return {
      type: 'clearing',
      label: 'Waldkreuzung – hier treffen sieben Waldwege aufeinander.',
    };
  }
}
