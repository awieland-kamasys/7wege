import { ALL_CHARACTER_ITEMS, CharacterItem } from '../data/characterItems';
import { DialogueSystem } from './DialogueSystem';

export interface InventoryProgress {
  collected: number;
  total: number;
  percentage: number;
}

/**
 * Verwaltet die gesammelten Charakter-Items des Spielers.
 *
 * Charakter-Items werden als Belohnungen für bestandene Wegequests
 * aus der uralten Schatztruhe vor Waldhüter Arvids Hütte an der Waldkreuzung geborgen.
 *
 * Reine Spiellogik, unabhängig von Three.js und vollständig unit-testbar.
 */
export class InventorySystem {
  private readonly unlockedItemIds = new Set<string>();
  private readonly itemsById = new Map<string, CharacterItem>();

  constructor(initialUnlockedIds: string[] = []) {
    for (const item of ALL_CHARACTER_ITEMS) {
      this.itemsById.set(item.id, item);
    }
    for (const id of initialUnlockedIds) {
      if (this.itemsById.has(id)) {
        this.unlockedItemIds.add(id);
      }
    }
  }

  /**
   * Prüft, ob ein bestimmtes Item freigeschaltet ist.
   */
  public hasItem(itemId: string): boolean {
    return this.unlockedItemIds.has(itemId);
  }

  /**
   * Schaltet ein Item direkt frei. Gibt true zurück, wenn es neu hinzugefügt wurde.
   */
  public unlockItem(itemId: string): boolean {
    if (!this.itemsById.has(itemId)) {
      return false;
    }
    if (this.unlockedItemIds.has(itemId)) {
      return false;
    }
    this.unlockedItemIds.add(itemId);
    return true;
  }

  /**
   * Gibt alle freigeschalteten Charakter-Items zurück.
   */
  public getUnlockedItems(): CharacterItem[] {
    return ALL_CHARACTER_ITEMS.filter((item) => this.unlockedItemIds.has(item.id));
  }

  /**
   * Gibt alle im Spiel existierenden Charakter-Items geordnet zurück.
   */
  public getAllItems(): readonly CharacterItem[] {
    return ALL_CHARACTER_ITEMS;
  }

  /**
   * Liefert den aktuellen Sammelfortschritt (gesammelt, gesamt, prozentual).
   */
  public getProgress(): InventoryProgress {
    const collected = this.unlockedItemIds.size;
    const total = ALL_CHARACTER_ITEMS.length;
    const percentage = total > 0 ? Math.round((collected / total) * 100) : 0;
    return { collected, total, percentage };
  }

  /**
   * Ermittelt, welche Charakter-Items aktuell als Belohnung in der Schatztruhe
   * für den Spieler bereitliegen (noch nicht abgeholt).
   */
  public getPendingChestRewards(dialogue: DialogueSystem): CharacterItem[] {
    const pending: CharacterItem[] = [];

    // 1. Erstbelohnung: Messingkompass (immer in der Truhe vorhanden, sobald sie geöffnet wird)
    if (!this.hasItem('item_compass')) {
      const compass = this.itemsById.get('item_compass');
      if (compass) pending.push(compass);
    }

    // 2. Weg 1 (Silberstollen): Nach Gespräch mit Graumännchen
    if (dialogue.isDialogueCompleted('grey_root') && !this.hasItem('item_silver_ore')) {
      const item = this.itemsById.get('item_silver_ore');
      if (item) pending.push(item);
    }

    // 3. Weg 2 (Nixenteich): Nach Gespräch mit der Nixe
    if (dialogue.isDialogueCompleted('nixie_root') && !this.hasItem('item_nixie_tear')) {
      const item = this.itemsById.get('item_nixie_tear');
      if (item) pending.push(item);
    }

    // 4. Weg 3 (Quellenweg): Nach Gespräch mit dem Riesen
    if (dialogue.isDialogueCompleted('giant_root') && !this.hasItem('item_giant_quartz')) {
      const item = this.itemsById.get('item_giant_quartz');
      if (item) pending.push(item);
    }

    // 5. Weg 4 (Holzfällerlager): Nach Gespräch mit dem Holzweibchen
    if (dialogue.isDialogueCompleted('wood_woman_root') && !this.hasItem('item_wood_talisman')) {
      const item = this.itemsById.get('item_wood_talisman');
      if (item) pending.push(item);
    }

    // 6. Weg 5 (Höllenschlund): Nach Gespräch mit dem Teufel
    if (dialogue.isDialogueCompleted('devil_root') && !this.hasItem('item_infernal_shard')) {
      const item = this.itemsById.get('item_infernal_shard');
      if (item) pending.push(item);
    }

    // 7. Weg 6 (Jägerpfad): Nach Gespräch mit dem Jäger
    if (dialogue.isDialogueCompleted('hunter_root') && !this.hasItem('item_hunter_badge')) {
      const item = this.itemsById.get('item_hunter_badge');
      if (item) pending.push(item);
    }

    // 8. Weg 7 (Torweg): Nach Untersuchung des Steintors oder wenn mindestens 6 Items geborgen sind
    if (
      (dialogue.isDialogueCompleted('gate_root') || this.unlockedItemIds.size >= 6) &&
      !this.hasItem('item_valley_key')
    ) {
      const item = this.itemsById.get('item_valley_key');
      if (item) pending.push(item);
    }

    return pending;
  }

  /**
   * Hebt alle aktuell bereitliegenden Belohnungen aus der Schatztruhe ab
   * und nimmt sie in die Sammlung auf.
   * Gibt die Liste der neu erhaltenen Items zurück.
   */
  public collectChestRewards(dialogue: DialogueSystem): CharacterItem[] {
    const pending = this.getPendingChestRewards(dialogue);
    const newlyCollected: CharacterItem[] = [];

    for (const item of pending) {
      if (this.unlockItem(item.id)) {
        newlyCollected.push(item);
      }
    }

    return newlyCollected;
  }
}
