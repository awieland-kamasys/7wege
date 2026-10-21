import { describe, expect, it } from 'vitest';
import {
  DEVIL_NPC_POS,
  GIANT_NPC_POS,
  GREY_MAN_NPC_POS,
  NIXIE_NPC_POS,
  PATH_1_WAYPOINTS,
  PATH_1_BOULDER_POS,
  PATH_2_WAYPOINTS,
  PATH_2_PUDDLE_POS,
  PATH_3_WAYPOINTS,
  PATH_3_STREAM_POS,
  PATH_4_WAYPOINTS,
  PATH_4_LOG_POS,
  PATH_5_WAYPOINTS,
  PATH_5_FIRE_POS,
  PATH_6_WAYPOINTS,
  PATH_6_HERBS_POS,
  PATH_7_WAYPOINTS,
  SEVEN_PATHS,
  START_PLAYER_POS,
  WEIR_BRIDGE_POS,
  WILD_HUNTER_NPC_POS,
  WOOD_WOMAN_LODGE_NPC_POS,
  WOOD_WOMAN_NPC_POS,
  CLOSED_GATE_POS,
} from '../../src/game/data/paths';
import { CrossroadsState } from '../../src/game/systems/CrossroadsState';
import { DialogueSystem } from '../../src/game/systems/DialogueSystem';

describe('CrossroadsState & 7 Wege', () => {
  it('enthält genau sieben definierte Waldwege', () => {
    expect(SEVEN_PATHS).toHaveLength(7);
    const ids = SEVEN_PATHS.map((p) => p.id);
    expect(ids).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('platziert Schutzhütte, Schatztruhe, Wegweiser, Waldhüter, Graumännchen, Nixe, Riese, Holzweibchen, Teufel, Wilden Jäger und geschlossenes Tor', () => {
    const state = new CrossroadsState();
    expect(state.getHutPosition()).toEqual({ x: 0, z: -1.45 });
    expect(state.getChestPosition()).toEqual({ x: 0.85, z: 2.0 });
    expect(state.getSignpostPosition()).toEqual({ x: 2.3, z: 2.4 });
    expect(state.getNpcPosition()).toEqual({ x: -1.85, z: 2.05 });
    expect(state.getGreyManPosition()).toEqual(GREY_MAN_NPC_POS);
    expect(state.getNixiePosition()).toEqual(NIXIE_NPC_POS);
    expect(state.getGiantPosition()).toEqual(GIANT_NPC_POS);
    expect(state.getWoodWomanPosition()).toEqual(WOOD_WOMAN_NPC_POS);
    expect(state.getDevilPosition()).toEqual(DEVIL_NPC_POS);
    expect(state.getWildHunterPosition()).toEqual(WILD_HUNTER_NPC_POS);
    expect(state.getWoodWomanLodgePosition()).toEqual(WOOD_WOMAN_LODGE_NPC_POS);
    expect(state.getGatePosition()).toEqual({ x: CLOSED_GATE_POS.x, z: CLOSED_GATE_POS.z });
  });

  it('erweitert den 1. Weg mit einer Kurve bis zum Vorplatz vor dem Höhleneingang', () => {
    const state = new CrossroadsState();
    expect(PATH_1_WAYPOINTS.length).toBeGreaterThanOrEqual(6);

    for (const wp of PATH_1_WAYPOINTS) {
      expect(state.isPointOnPath1(wp.x, wp.z)).toBe(true);
      expect(state.isPointOnClearingOrPath(wp.x, wp.z)).toBe(true);
    }

    // Weg 1 durch Lösen des Felsbrockens freiräumen und bis zum Graumännchen wandern
    state.removePath1Boulder();
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

    // Weg 2 durch Lösen der magischen Wasserpfütze freiräumen und bis ans Teichufer wandern
    state.removePath2Puddle();
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

    // Weg 3 durch Lösen des reißenden Bachlaufs freiräumen und über die Wehrbrücke wandern
    state.removePath3Stream();
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

    // Weg 4 durch Lösen des blockierenden Baumstamms freiräumen und bis zum Holzweibchen wandern
    state.removePath4Log();
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

    // Weg 5 durch Lösen der Flammenwand freiräumen und bis zum Teufel wandern
    state.removePath5Fire();
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

  it('führt den 6. Weg zur Jagdhütte mit Kräutergarten, Wildem Jäger und Holzweibchen', () => {
    const state = new CrossroadsState();
    expect(PATH_6_WAYPOINTS.length).toBeGreaterThanOrEqual(5);

    for (const wp of PATH_6_WAYPOINTS) {
      expect(state.isPointOnPath6(wp.x, wp.z)).toBe(true);
      expect(state.isPointOnClearingOrPath(wp.x, wp.z)).toBe(true);
    }

    // Weg 6 durch Lösen der Kräutersperre mit Geländer freiräumen und bis zur Jagdhütte wandern
    state.removePath6Herbs();
    state.setTargetToWildHunter();
    for (let i = 0; i < 120; i++) {
      state.updateAutoWalk(0.1, 8);
      const pos = state.getPlayerPosition();
      expect(state.isWalkable(pos.x, pos.z)).toBe(true);
    }

    expect(state.isNearWildHunter()).toBe(true);
    expect(state.getActivePointOfInterest().type).toBe('wild_hunter');

    // Wandert wenige Schritte zum Holzweibchen vor dem Kräutergartenzaun
    state.setTargetToWoodWomanLodge();
    for (let i = 0; i < 40; i++) {
      state.updateAutoWalk(0.1, 8);
      const pos = state.getPlayerPosition();
      expect(state.isWalkable(pos.x, pos.z)).toBe(true);
    }

    expect(state.isNearWoodWomanLodge()).toBe(true);
    expect(state.getActivePointOfInterest().type).toBe('wood_woman_lodge');

    // Rückweg von der Jagdhütte zurück zur zentralen Kreuzung
    state.setTargetToClearing();
    for (let i = 0; i < 120; i++) {
      state.updateAutoWalk(0.1, 8);
      const pos = state.getPlayerPosition();
      expect(state.isWalkable(pos.x, pos.z)).toBe(true);
    }
    expect(state.isOnClearing()).toBe(true);
  });

  it('führt den 7. Weg durch den uralten Nebelwald bis zum verschlossenen Tor vor den Steinmauern', () => {
    const state = new CrossroadsState();
    expect(PATH_7_WAYPOINTS.length).toBeGreaterThanOrEqual(5);

    for (const wp of PATH_7_WAYPOINTS) {
      expect(state.isPointOnPath7(wp.x, wp.z)).toBe(true);
      expect(state.isPointOnClearingOrPath(wp.x, wp.z)).toBe(true);
    }

    // Wandert entlang von Weg 7 bis auf den Vorplatz vor das geschlossene Tor
    state.setTargetToGate();
    for (let i = 0; i < 120; i++) {
      state.updateAutoWalk(0.1, 8);
      const pos = state.getPlayerPosition();
      expect(state.isWalkable(pos.x, pos.z)).toBe(true);
    }

    expect(state.isNearGate()).toBe(true);
    expect(state.getActivePointOfInterest().type).toBe('gate');

    // Das geschlossene Tor und seine Mauern blockieren den weiteren Durchgang
    expect(state.isCollidingWithObstacles(CLOSED_GATE_POS.x, CLOSED_GATE_POS.z)).toBe(true);

    // Rückweg vom geschlossenen Tor zurück zur zentralen Kreuzung
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
    state.jumpToClearing();
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
    state.jumpToClearing();

    for (let i = 0; i < 30; i++) {
      state.movePlayer(0, -0.3);
      const pos = state.getPlayerPosition();
      expect(state.isCollidingWithObstacles(pos.x, pos.z)).toBe(false);
    }

    const stateNpc = new CrossroadsState();
    stateNpc.jumpToClearing();
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
    state.removePath1Boulder();
    state.removePath2Puddle();
    state.removePath3Stream();
    state.removePath4Log();
    state.removePath5Fire();
    state.removePath6Herbs();

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
    state.jumpToClearing();
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
  it('öffnet den reduzierten Standarddialog 1 mit Waldhüter Arvid mit seinen 3 Antworten', () => {
    const dialogue = new DialogueSystem();
    expect(dialogue.isOpen()).toBe(false);

    const root = dialogue.startDialogue('root');
    expect(dialogue.isOpen()).toBe(true);
    expect(root?.id).toBe('root');
    expect(root?.speaker).toBe('Waldhüter Arvid');
    expect(root?.text).toBe('Ach du Scheiße, was willst du denn hier?');
    expect(root?.options).toHaveLength(3);
    expect(root?.options[0].playerText).toBe('Ich will ins Zinsbachtal.');
    expect(root?.options[1].playerText).toBe('Ein Bier.');
    expect(root?.options[2].playerText).toBe('Geht dich gar nichts an, Penner!');

    // Auswahl von Antwort 1 schließt den Dialog
    const step = dialogue.selectOption(0);
    expect(step.node).toBeNull();
    expect(dialogue.isOpen()).toBe(false);
    expect(step.action).toEqual({ type: 'close' });
  });

  it('erzwingt den Grundsatz: Standarddialoge werden nur einmal angezeigt und nach Auswahl einer Antwort ist kein Aufruf mehr möglich', () => {
    const dialogue = new DialogueSystem();

    // 1. Öffnen und ohne Auswahl schließen erlaubt erneuten Aufruf
    dialogue.startDialogue('root');
    expect(dialogue.isOpen()).toBe(true);
    dialogue.closeDialogue();
    expect(dialogue.isOpen()).toBe(false);
    expect(dialogue.canStartDialogue('root')).toBe(true);

    // 2. Erneut öffnen und Antwort auswählen (z. B. Option 2 "Ein Bier.")
    const root = dialogue.startDialogue('root');
    expect(root).not.toBeNull();
    const result = dialogue.selectOption(1);
    expect(result.action).toEqual({ type: 'close' });
    expect(dialogue.isOpen()).toBe(false);

    // 3. Nach Auswahl einer Antwort ist kein Aufruf des gleichen Dialoges mehr möglich
    expect(dialogue.isDialogueCompleted('root')).toBe(true);
    expect(dialogue.canStartDialogue('root')).toBe(false);
    const retry = dialogue.startDialogue('root');
    expect(retry).toBeNull();
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

  it('führt das Streitgespräch zwischen dem Wilden Jäger und dem Holzweibchen an der Jagdhütte', () => {
    const dialogue = new DialogueSystem();

    // 1. Gespräch mit dem Wilden Jäger starten
    const hunterRoot = dialogue.startDialogue('hunter_root');
    expect(hunterRoot?.speaker).toBe('Der Wilde Jäger');
    expect(hunterRoot?.text).toContain('Jagdhütte');
    expect(hunterRoot?.text).toContain('Diebstahl');
    expect(hunterRoot?.text).toContain('Kräutergarten');

    // Frage nach den gestohlenen Kräutern (Option 0)
    const stepHerbs = dialogue.selectOption(0);
    expect(stepHerbs.node?.id).toBe('hunter_herbs');
    expect(stepHerbs.node?.text).toContain('Mondwurz');
    expect(stepHerbs.node?.text).toContain('Königs-Salbei');

    // Wechsel zur Gegenseite (Option 1: Das Holzweibchen anhören)
    const stepSwitchToWood = dialogue.selectOption(1);
    expect(stepSwitchToWood.node?.id).toBe('wood_lodge_root');
    expect(stepSwitchToWood.node?.speaker).toBe('Das Holzweibchen');
    expect(stepSwitchToWood.node?.text).toContain('Hirschkuh');
    expect(stepSwitchToWood.node?.text).toContain('Wundfieber');

    // Frage nach der Rettung des Tieres (Option 0)
    const stepLife = dialogue.selectOption(0);
    expect(stepLife.node?.id).toBe('wood_lodge_life');
    expect(stepLife.node?.text).toContain('Fieber');

    // Frage nach Verständnis für den Jäger (Option 0)
    const stepHunterView = dialogue.selectOption(0);
    expect(stepHunterView.node?.id).toBe('wood_lodge_hunter_view');
    expect(stepHunterView.node?.text).toContain('Waldminze');

    // Wechsel zurück zum Jäger mit dem Einigungsangebot (Option 0)
    const stepBackToHunter = dialogue.selectOption(0);
    expect(stepBackToHunter.node?.id).toBe('hunter_root');
    expect(stepBackToHunter.node?.speaker).toBe('Der Wilde Jäger');
  });

  it('führt die Untersuchung und den Dialog am verschlossenen Tor von Weg 7 durch', () => {
    const dialogue = new DialogueSystem();

    // Startet die Untersuchung des Tores
    const gateRoot = dialogue.startDialogue('gate_root');
    expect(gateRoot?.speaker).toBe('Das geschlossene Tor');
    expect(gateRoot?.speakerRole).toContain('Uraltes Portal');
    expect(gateRoot?.text).toContain('Holztor');
    expect(gateRoot?.text).toContain('Eisenbeschläge');
    expect(gateRoot?.text).toContain('Vorhängeschloss');

    // Option 0: Schloss und Siegelzeichen untersuchen
    const stepLock = dialogue.selectOption(0);
    expect(stepLock.node?.id).toBe('gate_lock_inspect');
    expect(stepLock.node?.text).toContain('Schlüsselloch');
    expect(stepLock.node?.text).toContain('sieben kreisförmige Vertiefungen');

    // Option 0: Zurück zum Gesamtanblick des Tores
    const stepBackFromLock = dialogue.selectOption(0);
    expect(stepBackFromLock.node?.id).toBe('gate_root');

    // Option 2: Die verwitterte Inschrift auf dem Torbogen betrachten
    const stepInscription = dialogue.selectOption(2);
    expect(stepInscription.node?.id).toBe('gate_inscription');
    expect(stepInscription.node?.text).toContain('Schriftzeichen');
    expect(stepInscription.node?.text).toContain('Nixe');
    expect(stepInscription.node?.text).toContain('Schlüssel');

    // Option 0: Zurück zum Gesamtanblick des Tores
    const stepBackFromIns = dialogue.selectOption(0);
    expect(stepBackFromIns.node?.id).toBe('gate_root');

    // Option 1: An den Eisenketten und dem Riegel rütteln
    const stepShake = dialogue.selectOption(1);
    expect(stepShake.node?.id).toBe('gate_chain_shake');
    expect(stepShake.node?.text).toContain('Eisenketten');
    expect(stepShake.node?.text).toContain('Klang');
  });

  it('startet ein neues Spiel immer auf Weg 7 in halber Strecke mit Blick zur Kreuzung', () => {
    const state = new CrossroadsState();
    expect(state.getPlayerPosition()).toEqual(START_PLAYER_POS);
    expect(state.getPlayerPosition()).toEqual({ x: -21.0, z: -18.4 });
    expect(state.isOnClearing()).toBe(false);
    expect(state.getCurrentOrClosestPath()?.id).toBe(7);

    // Schnellreise zur Kreuzung per jumpToClearing
    const clearingPos = state.jumpToClearing();
    expect(clearingPos).toEqual({ x: 0, z: 4.8 });
    expect(state.isOnClearing()).toBe(true);
    expect(state.getCurrentOrClosestPath()).toBeNull();
  });

  it('platziert alle Wegsperren auf exakt die gleiche Entfernung zur Kreuzung wie das Feuer (~16.3m)', () => {
    const fireDist = Math.hypot(PATH_5_FIRE_POS.x, PATH_5_FIRE_POS.z);
    expect(fireDist).toBeCloseTo(16.32, 1);

    const boulderDist = Math.hypot(PATH_1_BOULDER_POS.x, PATH_1_BOULDER_POS.z);
    expect(boulderDist).toBeCloseTo(16.3, 1);

    const puddleDist = Math.hypot(PATH_2_PUDDLE_POS.x, PATH_2_PUDDLE_POS.z);
    expect(puddleDist).toBeCloseTo(16.3, 1);

    const streamDist = Math.hypot(PATH_3_STREAM_POS.x, PATH_3_STREAM_POS.z);
    expect(streamDist).toBeCloseTo(16.3, 1);

    const logDist = Math.hypot(PATH_4_LOG_POS.x, PATH_4_LOG_POS.z);
    expect(logDist).toBeCloseTo(16.3, 1);

    const herbsDist = Math.hypot(PATH_6_HERBS_POS.x, PATH_6_HERBS_POS.z);
    expect(herbsDist).toBeCloseTo(16.3, 1);
  });

  it('erkennt den aktuellen Weg unterwegs und ermöglicht den Sofort-Rücksprung zur 7-Wegekreuzung', () => {
    const state = new CrossroadsState();
    state.jumpToClearing();

    // Zu Beginn auf der Kreuzung
    expect(state.isOnClearing()).toBe(true);
    expect(state.getCurrentOrClosestPath()).toBeNull();

    // Läuft zum Tor von Weg 7
    state.setTargetToGate();
    for (let i = 0; i < 120; i++) {
      state.updateAutoWalk(0.1, 8);
    }

    // Nun weit draußen auf Weg 7
    expect(state.isOnClearing()).toBe(false);
    const pathOnWay = state.getCurrentOrClosestPath();
    expect(pathOnWay).not.toBeNull();
    expect(pathOnWay?.id).toBe(7);
    expect(pathOnWay?.name).toContain('Torweg');

    // Per Schnellreise / Klick sofort zurück zur 7-Wegekreuzung springen
    const returnPos = state.jumpToClearing();
    expect(returnPos).toEqual({ x: 0, z: 4.8 });
    expect(state.isOnClearing()).toBe(true);
    expect(state.getTargetPosition()).toBeNull();
    expect(state.getSelectedPath()).toBeNull();
    expect(state.getCurrentOrClosestPath()).toBeNull();
  });

  it('blockiert Weg 1 mit einem Felsbrocken und gibt den Weg nach Entfernen frei', () => {
    const state = new CrossroadsState();
    state.jumpToClearing();

    // Zu Beginn ist Weg 1 blockiert
    expect(state.isPath1Blocked()).toBe(true);
    const bPos = state.getPath1BoulderPosition();
    expect(bPos.x).toBe(0.2);
    expect(bPos.z).toBe(-16.3);
    expect(state.getPath1BoulderRadius()).toBeGreaterThanOrEqual(1.5);

    // Am Felsen herrscht Hindernis-Kollision
    expect(state.isCollidingWithObstacles(bPos.x, bPos.z)).toBe(true);

    // Kollisionsauflösung schiebt die Position aus dem Felskreis heraus
    const resolved = state.resolveObstacleCollisions(bPos.x, bPos.z);
    const distToCenter = Math.hypot(resolved.x - bPos.x, resolved.z - bPos.z);
    expect(distToCenter).toBeGreaterThanOrEqual(state.getPath1BoulderRadius() - 0.2);

    // Wenn der Spieler nahe vor dem Felsen steht, wird kein störender Hinweiscontainer mehr gemeldet (Hindernis-Container komplett entfernt)
    state.setPlayerPosition(bPos.x, bPos.z + 1.8);
    expect(state.isNearBoulder()).toBe(true);
    expect(state.getActivePointOfInterest().type).not.toBe('boulder');

    // Auto-Walk zum Stollen scheitert an der Blockade: Figur kommt nicht über den Felsen hinaus
    state.setTargetToGreyMan();
    for (let i = 0; i < 30; i++) {
      state.updateAutoWalk(0.1, 8);
    }
    const blockedPos = state.getPlayerPosition();
    expect(blockedPos.z).toBeGreaterThanOrEqual(-16.3 - 0.2);

    // Felsbrocken durch Klick auf Edelstein entfernen
    state.removePath1Boulder();
    expect(state.isPath1Blocked()).toBe(false);

    // Nach Entfernung kollidiert der Punkt nicht mehr mit dem Felsen
    expect(state.isCollidingWithObstacles(bPos.x, bPos.z)).toBe(false);
    const freeResolved = state.resolveObstacleCollisions(bPos.x, bPos.z);
    expect(freeResolved.x).toBeCloseTo(bPos.x, 4);
    expect(freeResolved.z).toBeCloseTo(bPos.z, 4);
    expect(state.getActivePointOfInterest().type).not.toBe('boulder');
  });

  it('blockiert das geschlossene Tor und die Steinmauern auf Weg 7 über die volle Breite', () => {
    const state = new CrossroadsState();
    const gatePos = state.getGatePosition();
    const theta = CLOSED_GATE_POS.rotationY;
    const cosT = Math.cos(theta);
    const sinT = Math.sin(theta);

    // Lokale Punkte transformieren (lx = seitlich entlang der Mauer, lz = Tiefe)
    const toWorld = (lx: number, lz: number) => ({
      x: gatePos.x + lx * cosT + lz * sinT,
      z: gatePos.z - lx * sinT + lz * cosT,
    });

    // 1. Direkt im Tor (lx = 0, lz = 0)
    const centerPoint = toWorld(0, 0);
    expect(state.isCollidingWithObstacles(centerPoint.x, centerPoint.z)).toBe(true);


    // 2. Linke Steinmauer (lx = -5.0, lz = 0)
    const leftWall = toWorld(-5.0, 0);
    expect(state.isCollidingWithObstacles(leftWall.x, leftWall.z)).toBe(true);

    // 3. Rechte Steinmauer (lx = 5.0, lz = 0)
    const rightWall = toWorld(5.0, 0);
    expect(state.isCollidingWithObstacles(rightWall.x, rightWall.z)).toBe(true);

    // 4. Kollisionsauflösung: Spieler wird vor das Tor geschoben (auf sicheres lz >= 0.75)
    const behindGate = toWorld(0, -1.0);
    const pushed = state.resolveObstacleCollisions(behindGate.x, behindGate.z);
    const dx = pushed.x - gatePos.x;
    const dz = pushed.z - gatePos.z;
    const resolvedLz = dx * sinT + dz * cosT;
    expect(resolvedLz).toBeGreaterThanOrEqual(0.74);
  });

  it('bietet einen Dialog zur Untersuchung des magischen Felsbrockens', () => {
    const dialogue = new DialogueSystem();
    const root = dialogue.startDialogue('boulder_root');

    expect(root?.speaker).toBe('Magischer Felsbrocken');
    expect(root?.text).toContain('Granitfelsen');
    expect(root?.text).toContain('Edelstein');

    // Option 1: Verstehen, wie der Felsen beseitigt werden kann
    const hintStep = dialogue.selectOption(1);
    expect(hintStep.node?.id).toBe('boulder_hint');
    expect(hintStep.node?.text).toContain('Klicke einfach auf den rotierenden grünen Edelstein');
  });

  it('blockiert Weg 2 mit einer magischen Wasserpfütze, die per Edelstein entfernt werden kann', () => {
    const state = new CrossroadsState();
    expect(state.isPath2Blocked()).toBe(true);

    const pPos = state.getPath2PuddlePosition();
    expect(pPos).toEqual({ x: 13.2, z: -9.6 });
    expect(state.getPath2PuddleRadius()).toBe(1.55);

    // Kollisionsprüfung
    expect(state.isCollidingWithObstacles(pPos.x, pPos.z)).toBe(true);

    // Näherung / kein POI-Container für Hindernisse
    state.setPlayerPosition(pPos.x - 1.2, pPos.z + 1.0);
    expect(state.isNearPuddle()).toBe(true);
    expect(state.getActivePointOfInterest().type).not.toBe('puddle');

    // Pfütze entfernen
    state.removePath2Puddle();
    expect(state.isPath2Blocked()).toBe(false);
    expect(state.isCollidingWithObstacles(pPos.x, pPos.z)).toBe(false);
    expect(state.getActivePointOfInterest().type).not.toBe('puddle');
  });

  it('blockiert Weg 3 mit einem reißenden Gebirgsbach, der per Edelstein gebändigt werden kann', () => {
    const state = new CrossroadsState();
    expect(state.isPath3Blocked()).toBe(true);

    const sPos = state.getPath3StreamPosition();
    expect(sPos).toEqual({ x: 15.8, z: 4.1 });
    expect(state.getPath3StreamRadius()).toBe(1.55);

    // Kollisionsprüfung
    expect(state.isCollidingWithObstacles(sPos.x, sPos.z)).toBe(true);

    // Näherung / kein POI-Container für Hindernisse
    state.setPlayerPosition(sPos.x - 1.3, sPos.z - 0.3);
    expect(state.isNearStream()).toBe(true);
    expect(state.getActivePointOfInterest().type).not.toBe('stream');

    // Bachlauf bändigen
    state.removePath3Stream();
    expect(state.isPath3Blocked()).toBe(false);
    expect(state.isCollidingWithObstacles(sPos.x, sPos.z)).toBe(false);
    expect(state.getActivePointOfInterest().type).not.toBe('stream');
  });

  it('blockiert Weg 4 mit einem magischen Baumstamm quer zum Weg, der per Edelstein entfernt werden kann', () => {
    const state = new CrossroadsState();
    expect(state.isPath4Blocked()).toBe(true);

    const lPos = state.getPath4LogPosition();
    expect(lPos).toEqual({ x: 7.1, z: 14.7 });
    expect(state.getPath4LogRadius()).toBe(1.55);

    // Kollisionsprüfung
    expect(state.isCollidingWithObstacles(lPos.x, lPos.z)).toBe(true);

    // Näherung / kein POI-Container für Hindernisse
    state.setPlayerPosition(lPos.x - 0.6, lPos.z - 1.3);
    expect(state.isNearLog()).toBe(true);
    expect(state.getActivePointOfInterest().type).not.toBe('log');

    // Baumstamm entfernen
    state.removePath4Log();
    expect(state.isPath4Blocked()).toBe(false);
    expect(state.isCollidingWithObstacles(lPos.x, lPos.z)).toBe(false);
    expect(state.getActivePointOfInterest().type).not.toBe('log');
  });

  it('blockiert Weg 5 weiter hinten mit einem magischen Feuer, das per Edelstein gelöscht werden kann', () => {
    const state = new CrossroadsState();
    expect(state.isPath5Blocked()).toBe(true);

    const fPos = state.getPath5FirePosition();
    expect(fPos).toEqual({ x: -7.5, z: 14.5 });
    expect(state.getPath5FireRadius()).toBe(1.55);

    // Kollisionsprüfung
    expect(state.isCollidingWithObstacles(fPos.x, fPos.z)).toBe(true);

    // Näherung / kein POI-Container für Hindernisse
    state.setPlayerPosition(fPos.x + 0.5, fPos.z - 1.4);
    expect(state.isNearFire()).toBe(true);
    expect(state.getActivePointOfInterest().type).not.toBe('fire');

    // Feuer entfernen
    state.removePath5Fire();
    expect(state.isPath5Blocked()).toBe(false);
    expect(state.isCollidingWithObstacles(fPos.x, fPos.z)).toBe(false);
    expect(state.getActivePointOfInterest().type).not.toBe('fire');
  });

  it('blockiert Weg 6 mit einer Kräutersperre und Geländer, die per Edelstein geöffnet werden kann', () => {
    const state = new CrossroadsState();
    expect(state.isPath6Blocked()).toBe(true);

    const hPos = state.getPath6HerbsPosition();
    expect(hPos).toEqual({ x: -15.9, z: 3.8 });
    expect(state.getPath6HerbsRadius()).toBe(1.55);

    // Kollisionsprüfung
    expect(state.isCollidingWithObstacles(hPos.x, hPos.z)).toBe(true);

    // Näherung / kein POI-Container für Hindernisse
    state.setPlayerPosition(hPos.x + 1.3, hPos.z - 0.3);
    expect(state.isNearHerbs()).toBe(true);
    expect(state.getActivePointOfInterest().type).not.toBe('herbs');

    // Kräuter und Geländer entfernen
    state.removePath6Herbs();
    expect(state.isPath6Blocked()).toBe(false);
    expect(state.isCollidingWithObstacles(hPos.x, hPos.z)).toBe(false);
    expect(state.getActivePointOfInterest().type).not.toBe('herbs');
  });

  it('bietet Dialoge zur Untersuchung aller Wegsperren', () => {
    const dialogue = new DialogueSystem();

    // 1. Pfütze (Weg 2)
    const puddleRoot = dialogue.startDialogue('puddle_root');
    expect(puddleRoot?.speaker).toBe('Tiefe Wasserpfütze');
    expect(puddleRoot?.text).toContain('Wasserpfütze');
    const puddleHint = dialogue.selectOption(0);
    expect(puddleHint.node?.id).toBe('puddle_hint');
    expect(puddleHint.node?.text).toContain('Aquamarin');

    // 2. Bachlauf (Weg 3)
    const streamRoot = dialogue.startDialogue('stream_root');
    expect(streamRoot?.speaker).toBe('Reißender Gebirgsbach');
    expect(streamRoot?.text).toContain('Gebirgsbach');
    const streamHint = dialogue.selectOption(0);
    expect(streamHint.node?.id).toBe('stream_hint');
    expect(streamHint.node?.text).toContain('saphirblau');

    // 3. Baumstamm (Weg 4)
    const logRoot = dialogue.startDialogue('log_root');
    expect(logRoot?.speaker).toBe('Uralter Baumstamm');
    expect(logRoot?.text).toContain('Eichenstamm');
    const logHint = dialogue.selectOption(0);
    expect(logHint.node?.id).toBe('log_hint');
    expect(logHint.node?.text).toContain('Bernstein');

    // 4. Feuer (Weg 5)
    const fireRoot = dialogue.startDialogue('fire_root');
    expect(fireRoot?.speaker).toBe('Lodernde Flammenwand');
    expect(fireRoot?.text).toContain('Flammen');
    const fireHint = dialogue.selectOption(0);
    expect(fireHint.node?.id).toBe('fire_hint');
    expect(fireHint.node?.text).toContain('Rubin');

    // 5. Kräutersperre mit Geländer (Weg 6)
    const herbsRoot = dialogue.startDialogue('herbs_root');
    expect(herbsRoot?.speaker).toBe('Verwunschenes Kräutergeländer');
    expect(herbsRoot?.text).toContain('Holzgeländer');
    const herbsHint = dialogue.selectOption(0);
    expect(herbsHint.node?.id).toBe('herbs_hint');
    expect(herbsHint.node?.text).toContain('Amethyst');
  });

  it('ermöglicht freies Gehen über die Wehrbrücke auf Weg 3 und blockiert Geländer und Stauseebecken', () => {
    const state = new CrossroadsState();
    // Weg 3 Sperre entsperren
    state.removePath3Stream();

    // Punkt mitten auf der Brücke (lx = 0, lz = 0)
    const bridgeCenter = { x: WEIR_BRIDGE_POS.x, z: WEIR_BRIDGE_POS.z };
    expect(state.isWalkable(bridgeCenter.x, bridgeCenter.z)).toBe(true);
    expect(state.isCollidingWithObstacles(bridgeCenter.x, bridgeCenter.z)).toBe(false);

    // Entlang der Gehlinie über die gesamte Brücke ist alles frei begehbar
    for (let lz = -2.5; lz <= 2.5; lz += 0.5) {
      const cos = Math.cos(WEIR_BRIDGE_POS.rotationY);
      const sin = Math.sin(WEIR_BRIDGE_POS.rotationY);
      const wx = WEIR_BRIDGE_POS.x + lz * sin;
      const wz = WEIR_BRIDGE_POS.z + lz * cos;
      expect(state.isCollidingWithObstacles(wx, wz)).toBe(false);
    }

    // Spieler kann per Zielpunkt über die Brücke bis zum Riesen laufen
    state.setPlayerPosition(34.8, 15.6);
    state.setTargetToGiant();
    for (let i = 0; i < 60; i++) {
      state.updateAutoWalk(0.1, 7.0);
    }
    const finalPos = state.getPlayerPosition();
    const distToGiant = Math.hypot(finalPos.x - state.getGiantPosition().x, finalPos.z - state.getGiantPosition().z);
    expect(distToGiant).toBeLessThan(4.0);
  });

  it('blockiert Aufbauten an den Wegendpunkten (Holzfällerlager, Kräutergarten-Zaun, Stausee)', () => {
    const state = new CrossroadsState();

    // 1. Holzfällerlager Brennholz-Unterstand (12.8, 44.0)
    expect(state.isCollidingWithObstacles(12.8, 44.0)).toBe(true);

    // 2. Holzfällerlager Stammpolter (20.25, 43.5)
    expect(state.isCollidingWithObstacles(20.25, 43.5)).toBe(true);

    // 3. Kräutergarten-Zaun auf Weg 6 (-46.7, 21.0)
    expect(state.isCollidingWithObstacles(-46.7, 21.0)).toBe(true);
  });
});

