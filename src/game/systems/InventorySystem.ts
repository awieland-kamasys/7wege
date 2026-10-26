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
   *
   * Regel: Die Truhe ist zu Beginn leer und wird erst gefüllt, sobald mindestens eine
   * der sechs Wegequests (Weg 1–6) erfolgreich abgeschlossen wurde.
   * Der spezifische Ausgang der Quest bestimmt das jeweilige Item und seine Eigenschaften.
   */
  public getPendingChestRewards(dialogue: DialogueSystem): CharacterItem[] {
    const pending: CharacterItem[] = [];

    // Prüfen, welche Wegequests abgeschlossen sind
    const comp1 = dialogue.isDialogueCompleted('grey_root');
    const comp2 = dialogue.isDialogueCompleted('nixie_root');
    const comp3 = dialogue.isDialogueCompleted('giant_root');
    const comp4 = dialogue.isDialogueCompleted('wood_woman_root');
    const comp5 = dialogue.isDialogueCompleted('devil_root');
    const comp6 = dialogue.isDialogueCompleted('hunter_root');

    const hasCompletedAnyPathQuest = comp1 || comp2 || comp3 || comp4 || comp5 || comp6;

    // Bevor die erste Wegequest gelöst wurde, ist die Truhe vollständig leer!
    if (!hasCompletedAnyPathQuest) {
      return [];
    }

    // 1. Erstbelohnung: Messingkompass (liegt erst in der Truhe, sobald die erste Wegequest gemeistert wurde)
    if (!this.hasItem('item_compass')) {
      const compass = this.itemsById.get('item_compass');
      if (compass) pending.push(compass);
    }

    // 2. Weg 1 (Silberstollen): Nach Gespräch mit Graumännchen
    if (comp1 && !this.hasItem('item_silver_ore')) {
      const base = this.itemsById.get('item_silver_ore');
      if (base) {
        let name = base.name;
        let description = base.description;
        let icon = base.icon;

        if (dialogue.isDialogueCompleted('grey_resolution_crystal')) {
          name = 'Glanzquarz-Kristallstufe';
          description =
            'Ein kalt leuchtender Bergkristall, der ohne Rauch und Flamme den alten Stollen erhellt und das Versprechen an den Berg wahrt.';
          icon = '💎';
        } else if (dialogue.isDialogueCompleted('grey_resolution_honest')) {
          name = 'Aufrichtige Silberstufe';
          description =
            'Eine reine Silbererzstufe als Anerkennung für deine mutige Aufrichtigkeit vor den Ältesten zum Wohle der Bergleute.';
          icon = '⛏️';
        } else if (dialogue.isDialogueCompleted('grey_resolution_strict')) {
          name = 'Siegel des Bergfriedens';
          description =
            'Ein schwerer Erzstein mit dem unerschütterlichen Eid der Bergleute, das alte Versprechen niemals zu brechen.';
          icon = '🛡️';
        }

        const customized: CharacterItem = { ...base, name, description, icon };
        this.itemsById.set(customized.id, customized);
        pending.push(customized);
      }
    }

    // 3. Weg 2 (Nixenteich): Nach Gespräch mit der Nixe
    if (comp2 && !this.hasItem('item_nixie_tear')) {
      const base = this.itemsById.get('item_nixie_tear');
      if (base) {
        let name = base.name;
        let description = base.description;
        let icon = base.icon;

        if (dialogue.isDialogueCompleted('nixie_resolution_renounce')) {
          name = 'Perle der Entsagung';
          description =
            'Eine strahlend reine Quellperle, geschenkt für deine Weisheit, dem verfluchten Gold zu entsagen und das Unheil abzuwenden.';
          icon = '✨';
        } else if (dialogue.isDialogueCompleted('nixie_resolution_cleanse')) {
          name = 'Talisman des Schlaffluchs';
          description =
            'Eine kühle Seerosenperle, die das Unglück für immer auf dem Grund des Teichs friedlich bannt.';
          icon = '💧';
        } else if (dialogue.isDialogueCompleted('nixie_resolution_take')) {
          name = 'Mahnende Fluchmünze';
          description =
            'Ein altes Goldstück mit eisigen Rändern – ewiges Mahnmal an die Kälte der Verlockung.';
          icon = '🪙';
        }

        const customized: CharacterItem = { ...base, name, description, icon };
        this.itemsById.set(customized.id, customized);
        pending.push(customized);
      }
    }

    // 4. Weg 3 (Quellenweg): Nach Gespräch mit dem Riesen
    if (comp3 && !this.hasItem('item_giant_quartz')) {
      const base = this.itemsById.get('item_giant_quartz');
      if (base) {
        let name = base.name;
        let description = base.description;
        let icon = base.icon;

        if (dialogue.isDialogueCompleted('giant_resolution_compromise')) {
          name = 'Harmonie-Quellkristall';
          description =
            'Ein pulsierender Bergkristall als Symbol des weisen Ausgleichs zwischen dem Dürretal und der Heimat des Riesen.';
          icon = '💠';
        } else if (dialogue.isDialogueCompleted('giant_resolution_open')) {
          name = 'Stromflut-Talisman';
          description =
            'Ein glatter Kiesel aus dem geöffneten Wehr, der das befreite Lebenswasser für die Menschen im Tal ehrt.';
          icon = '🌊';
        } else if (dialogue.isDialogueCompleted('giant_resolution_keep')) {
          name = 'Felswächter-Granit';
          description =
            'Ein urwüchsiger Granitbrocken aus der Hand des Riesen zum unerschütterlichen Schutz seiner Bergquelle.';
          icon = '🪨';
        }

        const customized: CharacterItem = { ...base, name, description, icon };
        this.itemsById.set(customized.id, customized);
        pending.push(customized);
      }
    }

    // 5. Weg 4 (Holzfällerlager): Nach Gespräch mit dem Holzweibchen
    if (comp4 && !this.hasItem('item_wood_talisman')) {
      const base = this.itemsById.get('item_wood_talisman');
      if (base) {
        let name = base.name;
        let description = base.description;
        let icon = base.icon;

        if (dialogue.isDialogueCompleted('wood_resolution_protect')) {
          name = 'Heiliger Eichenspross';
          description =
            'Ein unversehrter, duftender Eichentrieb als Zeichen für den unantastbaren Schutz des uralten Waldes.';
          icon = '🌱';
        } else if (dialogue.isDialogueCompleted('wood_resolution_yield')) {
          name = 'Harziger Nutzholz-Keil';
          description =
            'Ein geschnitzter Holzkeil mit Fichtenharz, der das Überleben der Dorfgemeinschaft im harten Winter sichert.';
          icon = '🪓';
        }

        const customized: CharacterItem = { ...base, name, description, icon };
        this.itemsById.set(customized.id, customized);
        pending.push(customized);
      }
    }

    // 6. Weg 5 (Höllenschlund): Nach Gespräch mit dem Teufel
    if (comp5 && !this.hasItem('item_infernal_shard')) {
      const base = this.itemsById.get('item_infernal_shard');
      if (base) {
        let name = base.name;
        let description = base.description;
        let icon = base.icon;

        if (dialogue.isDialogueCompleted('devil_resolution_strength')) {
          name = 'Obsidian-Höllenglimmer';
          description =
            'Ein glühender Obsidian-Splitter, der vor unbeugsamer Willenskraft im Angesicht des Höllenschlunds zeugt.';
          icon = '🌋';
        } else if (dialogue.isDialogueCompleted('devil_resolution_trick')) {
          name = 'Gewitzter Schwefelfunke';
          description =
            'Ein glimmender Funke, der den Triumph des scharfen Verstandes über die Ränke des Teufels besiegelt.';
          icon = '🔥';
        } else if (dialogue.isDialogueCompleted('devil_resolution_reject')) {
          name = 'Reines Schutzkreuz';
          description =
            'Ein kühler Basaltkristall, der jeglicher Versuchung des Höllenfeuers standhaft getrotzt hat.';
          icon = '🛡️';
        }

        const customized: CharacterItem = { ...base, name, description, icon };
        this.itemsById.set(customized.id, customized);
        pending.push(customized);
      }
    }

    // 7. Weg 6 (Jägerpfad): Nach Gespräch mit dem Jäger
    if (comp6 && !this.hasItem('item_hunter_badge')) {
      const base = this.itemsById.get('item_hunter_badge');
      if (base) {
        let name = base.name;
        let description = base.description;
        let icon = base.icon;

        if (dialogue.isDialogueCompleted('hunter_resolution_balance')) {
          name = 'Pakt-Münze des Forstes';
          description =
            'Ein graviertes Siegel, das den gerechten Ausgleich zwischen Jagdrecht und pflanzlicher Heilkunst besiegelt.';
          icon = '⚖️';
        } else if (dialogue.isDialogueCompleted('hunter_resolution_mercy')) {
          name = 'Heilsames Lebenskraut';
          description =
            'Ein Bündel seltener Heilkräuter, gerettet zur Linderung und zum Schutz des Lebens im Wald.';
          icon = '🌿';
        } else if (dialogue.isDialogueCompleted('hunter_resolution_law')) {
          name = 'Silberner Hirschorden';
          description =
            'Ein prachtvolles Jagdabzeichen in Silber als Zeichen des Respekts vor der alten Waldordnung.';
          icon = '🦌';
        }

        const customized: CharacterItem = { ...base, name, description, icon };
        this.itemsById.set(customized.id, customized);
        pending.push(customized);
      }
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
