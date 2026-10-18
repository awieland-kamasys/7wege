import {
  GIANT_NPC_NAME,
  GREY_MAN_NPC_NAME,
  GUIDE_NPC_NAME,
  NIXIE_NPC_NAME,
  WOOD_WOMAN_NPC_NAME,
} from '../data/npcDialogues';
import {
  CAVE_ENTRANCE_POS,
  ForestPathData,
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
  | { type: 'cave'; label: string }
  | { type: 'pond'; label: string }
  | { type: 'weir'; label: string }
  | { type: 'lumber_camp'; label: string }
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
 * - Weg 4 (Holzfäller-Pfad mit Holzfällerlager auf der Waldlichtung & Holzweibchen).
 * Ohne Three.js-Abhängigkeit direkt mit Vitest testbar.
 */
export class CrossroadsState {
  // Schutzhütte im Zentrum (0, 0), Schatztruhe davor (0.85, 2.0),
  // Wegweiser rechts davor (2.3, 2.4), Hinweisgeber-NPC links davor (-1.85, 2.05)
  private readonly hutPos: Vector2D = { x: 0, z: 0 };
  private readonly hutHalfWidth = 1.95;
  private readonly hutHalfDepth = 1.55;

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
  private readonly caveFrontWallLz = 1.55;
  private readonly caveLocalRockColliders: readonly { lx: number; lz: number; radius: number }[] = [
    { lx: 0, lz: -1.45, radius: 3.0 }, // Stollenmundloch & Felsüberhang
    { lx: -3.5, lz: -2.1, radius: 3.65 }, // Linke Felsflanke
    { lx: 3.6, lz: -2.2, radius: 3.85 }, // Rechte Felsflanke
  ];

  // Am Ende des 2. Weges: Waldteich und auf einem Stein im Teich die Nixe
  private readonly pondPos: Vector2D = { x: POND_CENTER_POS.x, z: POND_CENTER_POS.z };
  private readonly pondCollisionRadius = 4.25;
  private readonly nixiePos: Vector2D = { ...NIXIE_NPC_POS };
  private readonly nixieTalkDistance = 3.25;

  // Am Ende des 3. Weges: Brücke mit geschlossenem Wehr, kleinem Stausee und dem Riesen
  private readonly weirBridgePos: Vector2D = { x: WEIR_BRIDGE_POS.x, z: WEIR_BRIDGE_POS.z };
  private readonly giantPos: Vector2D = { ...GIANT_NPC_POS };
  private readonly giantCollisionRadius = 0.85;

  // Am Ende des 4. Weges: Holzfällerlager auf der Waldlichtung und das Holzweibchen
  private readonly lumberCampPos: Vector2D = { x: LUMBER_CAMP_POS.x, z: LUMBER_CAMP_POS.z };
  private readonly woodWomanPos: Vector2D = { ...WOOD_WOMAN_NPC_POS };
  private readonly woodWomanCollisionRadius = 0.55;

  private readonly clearingRadius = 6.5;
  private readonly pathHalfWidth = 0.95;
  private readonly maxRadius = 26;

  private playerPos: Vector2D = { x: 0, z: 5.2 };
  private targetPos: Vector2D | null = null;
  private selectedPathId: number | null = null;
  private chestOpen = false;

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
    return dist <= this.giantCollisionRadius + 1.45;
  }

  public isNearWoodWoman(): boolean {
    const dist = Math.hypot(
      this.playerPos.x - this.woodWomanPos.x,
      this.playerPos.z - this.woodWomanPos.z
    );
    return dist <= this.woodWomanCollisionRadius + 1.45;
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
   * Lässt die Spielfigur zurück auf die zentrale Waldkreuzung laufen.
   */
  public setTargetToClearing(): Readonly<Vector2D> {
    this.selectedPathId = null;
    return this.setTargetPosition(0, 4.2);
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
   * Prüft, ob ein Punkt auf der zentralen Kreuzung oder auf einem der 7 befestigten Waldwege liegt.
   * Grünflächen und Wald außerhalb dieser Geometrie sind nicht begehbar.
   */
  public isPointOnClearingOrPath(x: number, z: number): boolean {
    const eps = 1e-4;
    const distFromCenter = Math.hypot(x, z);
    if (distFromCenter <= this.clearingRadius + eps) {
      return true;
    }

    // Wege 1 bis 4 besitzen eigene ausgebaute Kurvenverläufe bis zu ihren Zielorten
    if (
      this.isPointOnPath1(x, z) ||
      this.isPointOnPath2(x, z) ||
      this.isPointOnPath3(x, z) ||
      this.isPointOnPath4(x, z)
    ) {
      return true;
    }

    if (distFromCenter > this.maxRadius + eps) {
      return false;
    }

    // Wege 5 bis 7 verlaufen sternförmig
    for (const path of SEVEN_PATHS) {
      if (path.id <= 4) {
        continue;
      }
      const dirX = Math.sin(path.angleRad);
      const dirZ = -Math.cos(path.angleRad);
      const along = x * dirX + z * dirZ;
      if (along >= this.clearingRadius - 0.5 && along <= this.maxRadius + eps) {
        const cross = Math.abs(x * -dirZ + z * dirX);
        if (cross <= this.pathHalfWidth + eps) {
          return true;
        }
      }
    }

    return false;
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

    // Der Riese am Wehr auf Weg 3
    if (Math.hypot(x - this.giantPos.x, z - this.giantPos.z) < this.giantCollisionRadius - eps) {
      return true;
    }

    // Das Holzweibchen im Holzfällerlager auf Weg 4
    if (
      Math.hypot(x - this.woodWomanPos.x, z - this.woodWomanPos.z) <
      this.woodWomanCollisionRadius - eps
    ) {
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
  private resolveObstacleCollisions(x: number, z: number): Vector2D {
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

      // Schutzhütten-Kollision (AABB um hutPos)
      const relX = resolvedX - this.hutPos.x;
      const relZ = resolvedZ - this.hutPos.z;
      if (Math.abs(relX) < this.hutHalfWidth && Math.abs(relZ) < this.hutHalfDepth) {
        const penX = this.hutHalfWidth - Math.abs(relX);
        const penZ = this.hutHalfDepth - Math.abs(relZ);

        if (penX < penZ) {
          resolvedX = this.hutPos.x + (relX >= 0 ? this.hutHalfWidth : -this.hutHalfWidth);
        } else {
          resolvedZ = this.hutPos.z + (relZ >= 0 ? this.hutHalfDepth : -this.hutHalfDepth);
        }
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
    this.playerPos = this.resolveObstacleCollisions(projectedBack.x, projectedBack.z);

    return this.getPlayerPosition();
  }

  /**
   * Setzt ein Ziel für die Mausbewegung (Click-to-Move) auf einen gültigen Punkt auf Weg oder Kreuzung.
   */
  public setTargetPosition(x: number, z: number): Readonly<Vector2D> {
    const onSurface = this.projectOntoWalkableSurface(x, z, null);
    const collisionFree = this.resolveObstacleCollisions(onSurface.x, onSurface.z);
    const projectedBack = this.projectOntoWalkableSurface(collisionFree.x, collisionFree.z, null);
    this.targetPos = this.resolveObstacleCollisions(projectedBack.x, projectedBack.z);
    return { ...this.targetPos };
  }

  public clearTargetPosition(): void {
    this.targetPos = null;
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
    return this.setTargetPosition(this.pondPos.x - this.pondCollisionRadius - 0.3, this.nixiePos.z);
  }

  /**
   * Lässt die Spielfigur entlang des 3. Weges über die Brücke bis direkt vor den Riesen am Wehr laufen.
   */
  public setTargetToGiant(): Readonly<Vector2D> {
    this.selectPath(3);
    return this.setTargetPosition(this.giantPos.x - 1.5, this.giantPos.z + 0.8);
  }

  /**
   * Lässt die Spielfigur entlang des 4. Weges bis auf die Waldlichtung vor das Holzweibchen im Holzfällerlager laufen.
   */
  public setTargetToWoodWoman(): Readonly<Vector2D> {
    this.selectPath(4);
    return this.setTargetPosition(this.woodWomanPos.x - 0.25, this.woodWomanPos.z - 1.25);
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
   * Aktualisiert die schrittweise Bewegung zum Zielpunkt (Click-to-Move).
   */
  public updateAutoWalk(dtSeconds: number, speed = 6.5): Readonly<Vector2D> {
    if (!this.targetPos || dtSeconds <= 0) {
      return this.getPlayerPosition();
    }

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
    }

    // Falls die direkte Linie auf der Kreuzung durch die zentrale Hütte führt,
    // nutze einen seitlichen Wegpunkt links oder rechts neben der Hütte
    const crossesHutZ =
      (this.playerPos.z > this.hutHalfDepth - 0.1 && effectiveTarget.z < -0.5) ||
      (this.playerPos.z < -this.hutHalfDepth + 0.1 && effectiveTarget.z > 0.5);
    if (crossesHutZ && Math.abs(this.playerPos.x) < 2.6 && playerDist <= this.clearingRadius + 0.5) {
      const sideX = this.playerPos.x + effectiveTarget.x > 0.5 ? 3.4 : -3.2;
      effectiveTarget = { x: sideX, z: 0 };
    }

    const dx = effectiveTarget.x - this.playerPos.x;
    const dz = effectiveTarget.z - this.playerPos.z;
    const dist = Math.hypot(dx, dz);
    const maxStep = speed * dtSeconds;

    if (dist <= maxStep || dist < 0.05) {
      const prevPos = { ...this.playerPos };
      this.movePlayer(dx, dz);
      if (
        effectiveTarget === this.targetPos &&
        Math.hypot(this.playerPos.x - this.targetPos.x, this.playerPos.z - this.targetPos.z) < 0.15
      ) {
        this.targetPos = null;
      } else if (
        effectiveTarget === this.targetPos &&
        Math.hypot(this.playerPos.x - prevPos.x, this.playerPos.z - prevPos.z) < 0.001
      ) {
        this.targetPos = null;
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
        label: 'Hinweisgeber an der Schutzhütte – klicke auf ihn oder drücke [F] für ein Gespräch.',
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
