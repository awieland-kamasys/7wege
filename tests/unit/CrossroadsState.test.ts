import { describe, expect, it } from 'vitest';
import {
  DEVIL_NPC_POS,
  GIANT_NPC_POS,
  GREY_MAN_NPC_POS,
  NIXIE_NPC_POS,
  PATH_1_WAYPOINTS,
  PATH_2_WAYPOINTS,
  PATH_3_WAYPOINTS,
  PATH_4_WAYPOINTS,
  PATH_5_WAYPOINTS,
  SEVEN_PATHS,
  WOOD_WOMAN_NPC_POS,
} from '../../src/game/data/paths';
import { CrossroadsState } from '../../src/game/systems/CrossroadsState';
import { DialogueSystem } from '../../src/game/systems/DialogueSystem';

describe('CrossroadsState & 7 Wege', () => {
  it('enthält genau sieben definierte Waldwege', () => {
    expect(SEVEN_PATHS).toHaveLength(7);
    const ids = SEVEN_PATHS.map((p) => p.id);
    expect(ids).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('platziert Schutzhütte (0, 0), Schatztruhe (0.85, 2.0), Wegweiser (2.3, 2.4), Waldhüter (-1.85, 2.05), Graumännchen, Nixe, Riese, Holzweibchen und Teufel', () => {
    const state = new CrossroadsState();
    expect(state.getHutPosition()).toEqual({ x: 0, z: 0 });
    expect(state.getChestPosition()).toEqual({ x: 0.85, z: 2.0 });
    expect(state.getSignpostPosition()).toEqual({ x: 2.3, z: 2.4 });
    expect(state.getNpcPosition()).toEqual({ x: -1.85, z: 2.05 });
    expect(state.getGreyManPosition()).toEqual(GREY_MAN_NPC_POS);
    expect(state.getNixiePosition()).toEqual(NIXIE_NPC_POS);
    expect(state.getGiantPosition()).toEqual(GIANT_NPC_POS);
    expect(state.getWoodWomanPosition()).toEqual(WOOD_WOMAN_NPC_POS);
    expect(state.getDevilPosition()).toEqual(DEVIL_NPC_POS);
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

  it('führt den 2. Weg im Bogen zum Waldteich und erlaubt Gespräch mit der Nixe vom Ufer aus', () => {
    const state = new CrossroadsState();
    expect(PATH_2_WAYPOINTS.length).toBeGreaterThanOrEqual(5);

    for (const wp of PATH_2_WAYPOINTS) {
      expect(state.isPointOnPath2(wp.x, wp.z)).toBe(true);
      expect(state.isPointOnClearingOrPath(wp.x, wp.z)).toBe(true);
    }

    // Wandert entlang von Weg 2 bis ans Teichufer vor den Stein der Nixe
    state.setTargetToNixie();
    for (let i = 0; i < 120; i++) {
      state.updateAutoWalk(0.1, 8);
      const pos = state.getPlayerPosition();
      expect(state.isWalkable(pos.x, pos.z)).toBe(true);
    }

    expect(state.isNearNixie()).toBe(true);
    expect(state.getActivePointOfInterest().type).toBe('nixie');

    // Auch der Rückweg vom Teichufer zur Kreuzung läuft ruckelfrei ohne Hängenbleiben
    state.setTargetToClearing();
    for (let i = 0; i < 120; i++) {
      state.updateAutoWalk(0.1, 8);
      const pos = state.getPlayerPosition();
      expect(state.isWalkable(pos.x, pos.z)).toBe(true);
    }
    expect(state.isOnClearing()).toBe(true);
  });

  it('führt den 3. Weg über die Brücke mit dem geschlossenen Wehr bis zum Riesen am Stausee', () => {
    const state = new CrossroadsState();
    expect(PATH_3_WAYPOINTS.length).toBeGreaterThanOrEqual(5);

    for (const wp of PATH_3_WAYPOINTS) {
      expect(state.isPointOnPath3(wp.x, wp.z)).toBe(true);
      expect(state.isPointOnClearingOrPath(wp.x, wp.z)).toBe(true);
    }

    // Wandert entlang von Weg 3 über die Wehrbrücke bis zum Riesen
    state.setTargetToGiant();
    for (let i = 0; i < 120; i++) {
      state.updateAutoWalk(0.1, 8);
      const pos = state.getPlayerPosition();
      expect(state.isWalkable(pos.x, pos.z)).toBe(true);
    }

    expect(state.isNearGiant()).toBe(true);
    expect(state.getActivePointOfInterest().type).toBe('giant');

    // Rückweg über die Brücke zurück zur Kreuzung
    state.setTargetToClearing();
    for (let i = 0; i < 120; i++) {
      state.updateAutoWalk(0.1, 8);
      const pos = state.getPlayerPosition();
      expect(state.isWalkable(pos.x, pos.z)).toBe(true);
    }
    expect(state.isOnClearing()).toBe(true);
  });

  it('führt den 4. Weg in das Holzfällerlager auf der Waldlichtung bis zum Holzweibchen', () => {
    const state = new CrossroadsState();
    expect(PATH_4_WAYPOINTS.length).toBeGreaterThanOrEqual(5);

    for (const wp of PATH_4_WAYPOINTS) {
      expect(state.isPointOnPath4(wp.x, wp.z)).toBe(true);
      expect(state.isPointOnClearingOrPath(wp.x, wp.z)).toBe(true);
    }

    // Wandert entlang von Weg 4 bis zum Holzweibchen im Holzfällerlager
    state.setTargetToWoodWoman();
    for (let i = 0; i < 120; i++) {
      state.updateAutoWalk(0.1, 8);
      const pos = state.getPlayerPosition();
      expect(state.isWalkable(pos.x, pos.z)).toBe(true);
    }

    expect(state.isNearWoodWoman()).toBe(true);
    expect(state.getActivePointOfInterest().type).toBe('wood_woman');

    // Rückweg vom Holzfällerlager zurück zur Kreuzung
    state.setTargetToClearing();
    for (let i = 0; i < 120; i++) {
      state.updateAutoWalk(0.1, 8);
      const pos = state.getPlayerPosition();
      expect(state.isWalkable(pos.x, pos.z)).toBe(true);
    }
    expect(state.isOnClearing()).toBe(true);
  });

  it('führt den 5. Weg durch schroffe Felsspalten bis zum Höllenschlund und dem Teufel', () => {
    const state = new CrossroadsState();
    expect(PATH_5_WAYPOINTS.length).toBeGreaterThanOrEqual(5);

    for (const wp of PATH_5_WAYPOINTS) {
      expect(state.isPointOnPath5(wp.x, wp.z)).toBe(true);
      expect(state.isPointOnClearingOrPath(wp.x, wp.z)).toBe(true);
    }

    // Wandert entlang von Weg 5 bis auf das Felsplateau vor den Teufel am Höllenschlund
    state.setTargetToDevil();
    for (let i = 0; i < 120; i++) {
      state.updateAutoWalk(0.1, 8);
      const pos = state.getPlayerPosition();
      expect(state.isWalkable(pos.x, pos.z)).toBe(true);
    }

    expect(state.isNearDevil()).toBe(true);
    expect(state.getActivePointOfInterest().type).toBe('devil');

    // Rückweg vom Höllenschlund zurück zur Kreuzung
    state.setTargetToClearing();
    for (let i = 0; i < 120; i++) {
      state.updateAutoWalk(0.1, 8);
      const pos = state.getPlayerPosition();
      expect(state.isWalkable(pos.x, pos.z)).toBe(true);
    }
    expect(state.isOnClearing()).toBe(true);
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

    // Ein Punkt mitten im Wald zwischen Weg 6 und Weg 7 ist nicht begehbar
    const angleBetween6And7 = (SEVEN_PATHS[5].angleRad + SEVEN_PATHS[6].angleRad) / 2;
    const forestX = Math.sin(angleBetween6And7) * 14;
    const forestZ = -Math.cos(angleBetween6And7) * 14;
    expect(state.isPointOnClearingOrPath(forestX, forestZ)).toBe(false);

    for (let i = 0; i < 40; i++) {
      state.movePlayer(Math.sin(angleBetween6And7) * 0.5, -Math.cos(angleBetween6And7) * 0.5);
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

describe('DialogueSystem (Kommunikationssystem für Waldhüter, Graumännchen, Nixe, Riese & Holzweibchen)', () => {
  it('öffnet ein Gespräch mit Waldhüter Arvid, navigiert durch die 7 Wege und löst Aktionen aus', () => {
    const dialogue = new DialogueSystem();
    expect(dialogue.isOpen()).toBe(false);

    const root = dialogue.startDialogue('root');
    expect(dialogue.isOpen()).toBe(true);
    expect(root?.id).toBe('root');

    const step1 = dialogue.selectOption(0);
    expect(step1.node?.id).toBe('paths_overview');
    expect(step1.node?.options.length).toBeGreaterThanOrEqual(7);

    const step2 = dialogue.selectOption(3);
    expect(step2.node?.id).toBe('path_4');

    const step3 = dialogue.selectOption(0);
    expect(step3.node).toBeNull();
    expect(dialogue.isOpen()).toBe(false);
    expect(step3.action).toEqual({ type: 'walk_to_wood_woman' });
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

  it('führt das Gespräch mit der Nixe am Teich über den verlockenden Schatz und den Fluch/das Unglück', () => {
    const dialogue = new DialogueSystem();
    const nixieRoot = dialogue.startDialogue('nixie_root');
    expect(nixieRoot?.speaker).toBe('Die Nixe vom Spiegelteich');
    expect(nixieRoot?.text).toContain('Schatz');
    expect(nixieRoot?.text).toContain('Fluch');
    expect(nixieRoot?.text).toContain('Unglück');

    // Frage nach Fluch & Unglück (Option 1)
    const stepCurse = dialogue.selectOption(1);
    expect(stepCurse.node?.id).toBe('nixie_curse');

    // Weiter zur Prüfung/Versuchung (Option 0)
    const stepTemptation = dialogue.selectOption(0);
    expect(stepTemptation.node?.id).toBe('nixie_temptation');
    expect(stepTemptation.node?.options.length).toBe(3);
  });

  it('führt das Gespräch mit dem Riesen am Wehr über Quelle, Dürre im Tal und die bedrohte Heimat des Riesen', () => {
    const dialogue = new DialogueSystem();
    const giantRoot = dialogue.startDialogue('giant_root');
    expect(giantRoot?.speaker).toBe('Der Riese am Wehr');
    expect(giantRoot?.text).toContain('Bergquelle');
    expect(giantRoot?.text).toContain('Dürre');
    expect(giantRoot?.text).toContain('Heimat');

    // Frage nach der Heimat des Riesen (Option 1)
    const stepHomeland = dialogue.selectOption(1);
    expect(stepHomeland.node?.id).toBe('giant_homeland');

    // Weiter zum Dilemma rund um das Wehr (Option 0)
    const stepDilemma = dialogue.selectOption(0);
    expect(stepDilemma.node?.id).toBe('giant_dilemma');
    expect(stepDilemma.node?.options.length).toBe(3);
  });

  it('führt das Gespräch mit dem Holzweibchen im Holzfällerlager über Brennholz gegen Kälte und die Gefährdung des Waldes', () => {
    const dialogue = new DialogueSystem();
    const woodWomanRoot = dialogue.startDialogue('wood_woman_root');
    expect(woodWomanRoot?.speaker).toBe('Das Holzweibchen');
    expect(woodWomanRoot?.text).toContain('Brennholz');
    expect(woodWomanRoot?.text).toContain('Kälte');
    expect(woodWomanRoot?.text).toContain('Fällungen');
    expect(woodWomanRoot?.text).toContain('Wald');

    // Frage nach der Gefährdung des Waldes (Option 1)
    const stepForest = dialogue.selectOption(1);
    expect(stepForest.node?.id).toBe('wood_woman_forest_danger');

    // Weiter zur Abwägung zwischen Dorf und Wald (Option 0)
    const stepDilemma = dialogue.selectOption(0);
    expect(stepDilemma.node?.id).toBe('wood_woman_dilemma');
    expect(stepDilemma.node?.options.length).toBe(3);
  });

  it('führt das Gespräch mit dem Teufel inmitten des Höllenschlundes', () => {
    const dialogue = new DialogueSystem();
    const devilRoot = dialogue.startDialogue('devil_root');
    expect(devilRoot?.speaker).toBe('Der Teufel');
    expect(devilRoot?.text).toContain('Höllenschlund');
    expect(devilRoot?.text).toContain('Feuer');

    // Frage nach dem Höllenschlund (Option 0)
    const stepChasm = dialogue.selectOption(0);
    expect(stepChasm.node?.id).toBe('devil_about_chasm');
    expect(stepChasm.node?.text).toContain('Glut');

    // Frage nach der Identität des Teufels (Option 0)
    const stepIdentity = dialogue.selectOption(0);
    expect(stepIdentity.node?.id).toBe('devil_about_identity');
    expect(stepIdentity.node?.speaker).toBe('Der Teufel');
  });
});
