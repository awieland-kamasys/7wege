import { GUIDE_NPC_NAME } from '../data/npcDialogues';
import { ForestPathData, SEVEN_PATHS } from '../data/paths';

export interface Vector2D {
  x: number;
  z: number;
}

export type PointOfInterest =
  | { type: 'npc'; name: string; label: string }
  | { type: 'chest'; isOpen: boolean; label: string }
  | { type: 'signpost'; label: string }
  | { type: 'hut'; label: string }
  | { type: 'path'; path: ForestPathData }
  | { type: 'clearing'; label: string };

/**
 * Reine Spiellogik für die Waldkreuzung (ohne Three.js-Abhängigkeit, direkt mit Vitest testbar).
 * Enthält Oberflächenbegrenzung (nur Kreuzung und die 7 Wege sind begehbar) sowie
 * Kollisionserkennung für Schutzhütte, Wegweiser, Hinweisgeber-NPC und Schatztruhe.
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

  private readonly clearingRadius = 6.5;
  private readonly pathHalfWidth = 0.9;
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

  public isNearChest(): boolean {
    const dist = Math.hypot(
      this.playerPos.x - this.chestPos.x,
      this.playerPos.z - this.chestPos.z
    );
    return dist <= this.chestCollisionRadius + 1.05;
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
   * Prüft, ob ein Punkt auf der zentralen Kreuzung oder auf einem der 7 befestigten Waldwege liegt.
   * Grünflächen und Wald außerhalb dieser Geometrie sind nicht begehbar.
   */
  public isPointOnClearingOrPath(x: number, z: number): boolean {
    const eps = 1e-4;
    const distFromCenter = Math.hypot(x, z);
    if (distFromCenter <= this.clearingRadius + eps) {
      return true;
    }
    if (distFromCenter > this.maxRadius + eps) {
      return false;
    }

    for (const path of SEVEN_PATHS) {
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

  /**
   * Prüft, ob ein Punkt mit der Schutzhütte, der Schatztruhe, dem Wegweiser oder dem NPC kollidiert.
   */
  public isCollidingWithObstacles(x: number, z: number): boolean {
    const eps = 1e-4;
    const inHut =
      Math.abs(x - this.hutPos.x) < this.hutHalfWidth - eps &&
      Math.abs(z - this.hutPos.z) < this.hutHalfDepth - eps;
    if (inHut) {
      return true;
    }

    const distToChest = Math.hypot(x - this.chestPos.x, z - this.chestPos.z);
    if (distToChest < this.chestCollisionRadius - eps) {
      return true;
    }

    const distToSignpost = Math.hypot(x - this.signpostPos.x, z - this.signpostPos.z);
    if (distToSignpost < this.signpostCollisionRadius - eps) {
      return true;
    }

    const distToNpc = Math.hypot(x - this.npcPos.x, z - this.npcPos.z);
    if (distToNpc < this.npcCollisionRadius - eps) {
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
   * Schiebt eine Position bei Kontakt mit Schutzhütte, Schatztruhe, Wegweiser oder NPC an deren Außenkante.
   */
  private resolveObstacleCollisions(x: number, z: number): Vector2D {
    let resolvedX = x;
    let resolvedZ = z;

    for (let pass = 0; pass < 3; pass++) {
      // 1. Schatztruhen-Kollision (Kreis um chestPos)
      const afterChest = this.pushOutOfCircle(
        resolvedX,
        resolvedZ,
        this.chestPos,
        this.chestCollisionRadius
      );
      resolvedX = afterChest.x;
      resolvedZ = afterChest.z;

      // 2. Wegweiser-Kollision (Kreis um signpostPos)
      const afterSign = this.pushOutOfCircle(
        resolvedX,
        resolvedZ,
        this.signpostPos,
        this.signpostCollisionRadius
      );
      resolvedX = afterSign.x;
      resolvedZ = afterSign.z;

      // 3. NPC-Kollision (Kreis um npcPos)
      const afterNpc = this.pushOutOfCircle(
        resolvedX,
        resolvedZ,
        this.npcPos,
        this.npcCollisionRadius
      );
      resolvedX = afterNpc.x;
      resolvedZ = afterNpc.z;

      // 4. Schutzhütten-Kollision (AABB um hutPos)
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
    this.playerPos = this.projectOntoWalkableSurface(
      collisionFree.x,
      collisionFree.z,
      currentPath ? currentPath.id : null
    );

    return this.getPlayerPosition();
  }

  /**
   * Setzt ein Ziel für die Mausbewegung (Click-to-Move) auf einen gültigen Punkt auf Weg oder Kreuzung.
   */
  public setTargetPosition(x: number, z: number): Readonly<Vector2D> {
    const onSurface = this.projectOntoWalkableSurface(x, z, null);
    const collisionFree = this.resolveObstacleCollisions(onSurface.x, onSurface.z);
    this.targetPos = this.projectOntoWalkableSurface(collisionFree.x, collisionFree.z, null);
    return { ...this.targetPos };
  }

  /**
   * Löscht ein aktives Laufziel (z. B. bei manueller Tastatursteuerung).
   */
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

  /**
   * Lässt die Spielfigur direkt vor die Schutzhütte laufen.
   */
  public setTargetToHut(): Readonly<Vector2D> {
    return this.setTargetPosition(-0.3, this.hutPos.z + this.hutHalfDepth + 0.35);
  }

  /**
   * Lässt die Spielfigur direkt vor die Schatztruhe laufen.
   */
  public setTargetToChest(): Readonly<Vector2D> {
    return this.setTargetPosition(
      this.chestPos.x,
      this.chestPos.z + this.chestCollisionRadius + 0.35
    );
  }

  /**
   * Lässt die Spielfigur direkt vor den Wegweiser laufen.
   */
  public setTargetToSignpost(): Readonly<Vector2D> {
    return this.setTargetPosition(
      this.signpostPos.x,
      this.signpostPos.z + this.signpostCollisionRadius + 0.35
    );
  }

  /**
   * Lässt die Spielfigur in Gesprächsdistanz vor den Hinweisgeber-NPC an der Hütte laufen.
   */
  public setTargetToNpc(): Readonly<Vector2D> {
    return this.setTargetPosition(
      this.npcPos.x,
      this.npcPos.z + this.npcCollisionRadius + 0.45
    );
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
    if (playerDist > this.clearingRadius + 0.1) {
      const playerPath = this.getClosestPathAt(this.playerPos.x, this.playerPos.z);
      const targetPath =
        Math.hypot(this.targetPos.x, this.targetPos.z) > this.clearingRadius
          ? this.getClosestPathAt(this.targetPos.x, this.targetPos.z)
          : null;

      if (playerPath && (!targetPath || targetPath.id !== playerPath.id)) {
        effectiveTarget = {
          x: Math.sin(playerPath.angleRad) * (this.clearingRadius - 0.6),
          z: -Math.cos(playerPath.angleRad) * (this.clearingRadius - 0.6),
        };
      }
    }

    // Falls die direkte Linie auf der Kreuzung durch die zentrale Hütte führt,
    // nutze einen seitlichen Wegpunkt links oder rechts neben der Hütte
    const crossesHutZ =
      (this.playerPos.z > this.hutHalfDepth - 0.1 && effectiveTarget.z < -0.5) ||
      (this.playerPos.z < -this.hutHalfDepth + 0.1 && effectiveTarget.z > 0.5);
    if (crossesHutZ && Math.abs(this.playerPos.x) < 2.6) {
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
        Math.hypot(this.playerPos.x - this.targetPos.x, this.playerPos.z - this.targetPos.z) < 0.12
      ) {
        this.targetPos = null;
      } else if (
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
    if (movedDist < maxStep * 0.35) {
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
   * Ermittelt, welchem Objekt, NPC oder Weg die spielende Person auf der Kreuzung am nächsten ist.
   */
  public getActivePointOfInterest(): PointOfInterest {
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
          ? 'Geöffnete Schatztruhe vor der Hütte – im Inneren schimmert ein goldenes Artefakt. (Klick zum Schließen)'
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
