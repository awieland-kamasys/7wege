import { describe, expect, it } from 'vitest';
import { GREY_MAN_NPC_POS, PATH_1_WAYPOINTS, SEVEN_PATHS } from '../../src/game/data/paths';
import { CrossroadsState } from '../../src/game/systems/CrossroadsState';
import { DialogueSystem } from '../../src/game/systems/DialogueSystem';

describe('CrossroadsState & 7 Wege', () => {
  it('enthält genau sieben definierte Waldwege', () => {
    expect(SEVEN_PATHS).toHaveLength(7);
    const ids = SEVEN_PATHS.map((p) => p.id);
    expect(ids).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('platziert Schutzhütte (0, 0), Schatztruhe (0.85, 2.0), Wegweiser (2.3, 2.4), Waldhüter (-1.85, 2.05) und Graumännchen am Berg', () => {
    const state = new CrossroadsState();
    expect(state.getHutPosition()).toEqual({ x: 0, z: 0 });
    expect(state.getChestPosition()).toEqual({ x: 0.85, z: 2.0 });
    expect(state.getSignpostPosition()).toEqual({ x: 2.3, z: 2.4 });
    expect(state.getNpcPosition()).toEqual({ x: -1.85, z: 2.05 });
    expect(state.getGreyManPosition()).toEqual(GREY_MAN_NPC_POS);
  });

  it('erweitert den 1. Weg mit einer Kurve bis zum Vorplatz vor dem Höhleneingang', () => {
    const state = new CrossroadsState();
    expect(PATH_1_WAYPOINTS.length).toBeGreaterThanOrEqual(6);

    for (const wp of PATH_1_WAYPOINTS) {
      expect(state.isPointOnPath1(wp.x, wp.z)).toBe(true);
      expect(state.isPointOnClearingOrPath(wp.x, wp.z)).toBe(true);
    }

    // Wandert entlang der Kurve von Weg 1 bis zum Graumännchen am Höhleneingang
    state.setTargetToGreyMan();
    for (let i = 0; i < 120; i++) {
      state.updateAutoWalk(0.1, 8);
      const pos = state.getPlayerPosition();
      expect(state.isWalkable(pos.x, pos.z)).toBe(true);
    }

    expect(state.isNearGreyMan()).toBe(true);
    expect(state.getActivePointOfInterest().type).toBe('grey_man');
  });

  it('kann zur Schatztruhe vor der Hütte laufen und deren Deckel öffnen und schließen', () => {
    const state = new CrossroadsState();
    expect(state.isChestOpen()).toBe(false);

    state.setTargetToChest();
    for (let i = 0; i < 20; i++) {
      state.updateAutoWalk(0.1, 8);
    }

    const pos = state.getPlayerPosition();
    expect(state.isCollidingWithObstacles(pos.x, pos.z)).toBe(false);
    expect(state.isNearChest()).toBe(true);
    expect(state.getActivePointOfInterest().type).toBe('chest');

    expect(state.toggleChest()).toBe(true);
    expect(state.isChestOpen()).toBe(true);
    expect(state.toggleChest()).toBe(false);
    expect(state.isChestOpen()).toBe(false);
  });

  it('verhindert das Durchlaufen von Schutzhütte, Schatztruhe, Wegweiser, Waldhüter und Graumännchen (Kollision)', () => {
    const state = new CrossroadsState();

    for (let i = 0; i < 30; i++) {
      state.movePlayer(0, -0.3);
      const pos = state.getPlayerPosition();
      expect(state.isCollidingWithObstacles(pos.x, pos.z)).toBe(false);
    }

    const stateNpc = new CrossroadsState();
    stateNpc.setTargetToNpc();
    for (let i = 0; i < 20; i++) {
      stateNpc.updateAutoWalk(0.1, 8);
    }
    const nearNpcPos = stateNpc.getPlayerPosition();
    expect(stateNpc.isCollidingWithObstacles(nearNpcPos.x, nearNpcPos.z)).toBe(false);
    expect(stateNpc.isNearNpc()).toBe(true);
    expect(stateNpc.getActivePointOfInterest().type).toBe('npc');
  });

  it('erlaubt Bewegung nur auf der Kreuzung und den 7 Wegen, nicht auf Grünflächen/Wald', () => {
    const state = new CrossroadsState();

    // Ein Punkt mitten im Wald zwischen Weg 2 und Weg 3 ist nicht begehbar
    const angleBetween2And3 = (SEVEN_PATHS[1].angleRad + SEVEN_PATHS[2].angleRad) / 2;
    const forestX = Math.sin(angleBetween2And3) * 14;
    const forestZ = -Math.cos(angleBetween2And3) * 14;
    expect(state.isPointOnClearingOrPath(forestX, forestZ)).toBe(false);

    for (let i = 0; i < 40; i++) {
      state.movePlayer(Math.sin(angleBetween2And3) * 0.5, -Math.cos(angleBetween2And3) * 0.5);
      const pos = state.getPlayerPosition();
      expect(state.isPointOnClearingOrPath(pos.x, pos.z)).toBe(true);
    }
  });

  it('kann über movePlayerToPathEntrance jeden der sieben Wege betreten', () => {
    const state = new CrossroadsState();

    for (const path of SEVEN_PATHS) {
      state.movePlayerToPathEntrance(path.id);
      const pos = state.getPlayerPosition();
      expect(state.isPointOnClearingOrPath(pos.x, pos.z)).toBe(true);
      const poi = state.getActivePointOfInterest();
      expect(poi.type).toBe('path');
      if (poi.type === 'path') {
        expect(poi.path.id).toBe(path.id);
      }
    }
  });

  it('bewegt die Spielfigur per Click-to-Move vor den Wegweiser und erkennt ihn', () => {
    const state = new CrossroadsState();
    state.setTargetToSignpost();

    state.updateAutoWalk(1.0, 10);
    expect(state.getTargetPosition()).toBeNull();
    expect(state.getActivePointOfInterest().type).toBe('signpost');
  });

  it('läuft per setTargetToPathEntrance um Hindernisse herum zum gewählten Weg', () => {
    const state = new CrossroadsState();
    const target = state.setTargetToPathEntrance(1);
    expect(target).not.toBeNull();

    for (let i = 0; i < 40; i++) {
      state.updateAutoWalk(0.1, 8);
      const pos = state.getPlayerPosition();
      expect(state.isWalkable(pos.x, pos.z)).toBe(true);
    }

    const poi = state.getActivePointOfInterest();
    expect(poi.type).toBe('path');
    if (poi.type === 'path') {
      expect(poi.path.id).toBe(1);
    }
  });
});

describe('DialogueSystem (Kommunikationssystem für Waldhüter & Graumännchen)', () => {
  it('öffnet ein Gespräch mit Waldhüter Arvid, navigiert durch die 7 Wege und löst Aktionen aus', () => {
    const dialogue = new DialogueSystem();
    expect(dialogue.isOpen()).toBe(false);

    const root = dialogue.startDialogue('root');
    expect(dialogue.isOpen()).toBe(true);
    expect(root?.id).toBe('root');

    const step1 = dialogue.selectOption(0);
    expect(step1.node?.id).toBe('paths_overview');
    expect(step1.node?.options.length).toBeGreaterThanOrEqual(7);

    const step2 = dialogue.selectOption(2);
    expect(step2.node?.id).toBe('path_3');

    const step3 = dialogue.selectOption(0);
    expect(step3.node).toBeNull();
    expect(dialogue.isOpen()).toBe(false);
    expect(step3.action).toEqual({ type: 'select_path', pathId: 3 });
  });

  it('führt das Gespräch mit dem Graumännchen über Silberader, Licht und Verbot/Versprechen', () => {
    const dialogue = new DialogueSystem();
    const greyRoot = dialogue.startDialogue('grey_root');
    expect(greyRoot?.speaker).toBe('Das Graumännchen');
    expect(greyRoot?.text).toContain('Silberader');
    expect(greyRoot?.text).toContain('Verbot');
    expect(greyRoot?.text).toContain('Versprechen');

    // Frage nach Verbot & Versprechen (Option 1)
    const stepProhibition = dialogue.selectOption(1);
    expect(stepProhibition.node?.id).toBe('grey_prohibition');

    // Frage nach Licht-Möglichkeiten im Stollen (Option 0)
    const stepLightChoice = dialogue.selectOption(0);
    expect(stepLightChoice.node?.id).toBe('grey_light_choice');
    expect(stepLightChoice.node?.options.length).toBe(3);
  });
});
