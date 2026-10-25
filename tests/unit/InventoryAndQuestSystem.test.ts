import { describe, expect, it } from 'vitest';
import { CrossroadsState } from '../../src/game/systems/CrossroadsState';
import { DialogueSystem } from '../../src/game/systems/DialogueSystem';
import { InventorySystem } from '../../src/game/systems/InventorySystem';
import { QuestSystem } from '../../src/game/systems/QuestSystem';

describe('InventorySystem (Sammlung der Charakter-Items)', () => {
  it('enthält alle 8 definierten Charakter-Items im Grundzustand gesperrt', () => {
    const inventory = new InventorySystem();
    expect(inventory.getAllItems()).toHaveLength(8);
    expect(inventory.getUnlockedItems()).toHaveLength(0);

    const progress = inventory.getProgress();
    expect(progress.collected).toBe(0);
    expect(progress.total).toBe(8);
    expect(progress.percentage).toBe(0);
  });

  it('schaltet Items frei und berechnet den Sammelfortschritt korrekt', () => {
    const inventory = new InventorySystem();

    expect(inventory.hasItem('item_compass')).toBe(false);
    expect(inventory.unlockItem('item_compass')).toBe(true);
    expect(inventory.hasItem('item_compass')).toBe(true);
    // Erneutes Freischalten liefert false
    expect(inventory.unlockItem('item_compass')).toBe(false);

    inventory.unlockItem('item_silver_ore');
    expect(inventory.getUnlockedItems()).toHaveLength(2);

    const progress = inventory.getProgress();
    expect(progress.collected).toBe(2);
    expect(progress.percentage).toBe(25);
  });

  it('stellt beim Öffnen der Schatztruhe den Messingkompass als Start-Belohnung bereit', () => {
    const inventory = new InventorySystem();
    const dialogue = new DialogueSystem();

    const pending = inventory.getPendingChestRewards(dialogue);
    expect(pending).toHaveLength(1);
    expect(pending[0].id).toBe('item_compass');

    const collected = inventory.collectChestRewards(dialogue);
    expect(collected).toHaveLength(1);
    expect(collected[0].id).toBe('item_compass');
    expect(inventory.hasItem('item_compass')).toBe(true);

    // Nach dem Abholen liegen keine Belohnungen mehr bereit
    expect(inventory.getPendingChestRewards(dialogue)).toHaveLength(0);
  });

  it('schaltet nach Abschluss von Wegequests die entsprechenden Charakter-Items in der Truhe frei', () => {
    const inventory = new InventorySystem();
    const dialogue = new DialogueSystem();

    // Start-Kompass abholen
    inventory.collectChestRewards(dialogue);
    expect(inventory.hasItem('item_compass')).toBe(true);

    // Gespräch mit dem Riesen auf Weg 3 durchführen
    dialogue.startDialogue('giant_root');
    dialogue.selectOption(0);
    expect(dialogue.isDialogueCompleted('giant_root')).toBe(true);

    // Gespräch mit dem Holzweibchen auf Weg 4 durchführen
    dialogue.startDialogue('wood_woman_root');
    dialogue.selectOption(0);
    expect(dialogue.isDialogueCompleted('wood_woman_root')).toBe(true);

    // Beide Belohnungen liegen nun in der Schatztruhe bereit
    const pending = inventory.getPendingChestRewards(dialogue);
    expect(pending).toHaveLength(2);
    expect(pending.map((i) => i.id)).toContain('item_giant_quartz');
    expect(pending.map((i) => i.id)).toContain('item_wood_talisman');

    // Spieler kehrt zur Truhe zurück und sammelt beide Items ein
    const collected = inventory.collectChestRewards(dialogue);
    expect(collected).toHaveLength(2);
    expect(inventory.hasItem('item_giant_quartz')).toBe(true);
    expect(inventory.hasItem('item_wood_talisman')).toBe(true);
    expect(inventory.getProgress().collected).toBe(3);
  });
});

describe('QuestSystem (Tagebuch & aktueller Questauftrag)', () => {
  it('liefert zu Spielbeginn den Auftrag, mit Waldhüter Arvid zu sprechen', () => {
    const state = new CrossroadsState();
    const dialogue = new DialogueSystem();
    const inventory = new InventorySystem();
    const questSystem = new QuestSystem();

    const report = questSystem.getQuestReport(state, dialogue, inventory);
    expect(report.currentQuest.chapter).toContain('Kapitel 1');
    expect(report.currentQuest.title).toContain('Waldhüter Arvid');
    expect(report.totalBarriersCleared).toBe(0);
    expect(report.totalPathsCompleted).toBe(0);
  });

  it('fordert nach dem Arvid-Gespräch zum Öffnen der Schatztruhe auf', () => {
    const state = new CrossroadsState();
    const dialogue = new DialogueSystem();
    const inventory = new InventorySystem();
    const questSystem = new QuestSystem();

    // Arvid-Gespräch führen
    dialogue.startDialogue('root');
    dialogue.selectOption(0);
    expect(dialogue.isDialogueCompleted('root')).toBe(true);

    const report = questSystem.getQuestReport(state, dialogue, inventory);
    expect(report.currentQuest.chapter).toContain('Kapitel 2');
    expect(report.currentQuest.title).toContain('Schatztruhe');
    expect(report.currentQuest.hasChestReward).toBe(true);
  });

  it('weist auf bereitliegende Belohnungen in der Schatztruhe hin', () => {
    const state = new CrossroadsState();
    const dialogue = new DialogueSystem();
    const inventory = new InventorySystem();
    const questSystem = new QuestSystem();

    // Arvid-Gespräch führen
    dialogue.startDialogue('root');
    dialogue.selectOption(0);

    // Kompass abholen
    inventory.collectChestRewards(dialogue);

    // Wegequest bei der Nixe abschließen
    dialogue.startDialogue('nixie_root');
    dialogue.selectOption(0);

    const report = questSystem.getQuestReport(state, dialogue, inventory);
    expect(report.currentQuest.chapter).toContain('Belohnung bereit');
    expect(report.currentQuest.hasChestReward).toBe(true);
    expect(report.currentQuest.objective).toContain('Schatztruhe');
  });

  it('dokumentiert den Status aller 7 Waldwege und Tagebucheinträge', () => {
    const state = new CrossroadsState();
    const dialogue = new DialogueSystem();
    const inventory = new InventorySystem();
    const questSystem = new QuestSystem();

    // Alle Barrieren lösen
    state.removeAllPathBarriers();

    const report = questSystem.getQuestReport(state, dialogue, inventory);
    expect(report.totalBarriersCleared).toBe(6);
    expect(report.pathQuests).toHaveLength(7);

    // Weg 1 bis 6 sind nun unblockiert
    for (let i = 0; i < 6; i++) {
      expect(report.pathQuests[i].isBlocked).toBe(false);
    }
    expect(report.journalNotes.length).toBeGreaterThanOrEqual(5);
  });
});
