import { CrossroadsState } from './CrossroadsState';
import { DialogueSystem } from './DialogueSystem';
import { InventorySystem } from './InventorySystem';

export interface PathQuestInfo {
  pathId: number;
  name: string;
  npcName: string;
  isBlocked: boolean;
  isCompleted: boolean;
  statusLabel: string;
  description: string;
  objective: string;
}

export interface JournalNote {
  id: string;
  text: string;
  completed: boolean;
  dateLabel?: string;
}

export interface CurrentQuestInfo {
  chapter: string;
  title: string;
  objective: string;
  hint: string;
  progressText: string;
  hasChestReward: boolean;
}

export interface QuestReport {
  currentQuest: CurrentQuestInfo;
  pathQuests: PathQuestInfo[];
  journalNotes: JournalNote[];
  totalPathsCompleted: number;
  totalBarriersCleared: number;
}

/**
 * Verwaltet und ermittelt den aktuellen Questauftrag, den Status der 7 Wege
 * sowie die Tagebucheinträge des Spielers.
 *
 * Reine Spiellogik, unabhängig von Three.js und vollständig unit-testbar.
 */
export class QuestSystem {
  /**
   * Erstellt einen vollständigen Bericht über den aktuellen Queststand.
   */
  public getQuestReport(
    state: CrossroadsState,
    dialogue: DialogueSystem,
    inventory: InventorySystem
  ): QuestReport {
    // 1. Barrieren-Status der Pfade 1 bis 6
    const b1 = state.isPath1Blocked();
    const b2 = state.isPath2Blocked();
    const b3 = state.isPath3Blocked();
    const b4 = state.isPath4Blocked();
    const b5 = state.isPath5Blocked();
    const b6 = state.isPath6Blocked();

    const clearedCount = [!b1, !b2, !b3, !b4, !b5, !b6].filter(Boolean).length;

    // 2. Erledigte Wegequests anhand der Dialoge
    const comp1 = dialogue.isDialogueCompleted('grey_root');
    const comp2 = dialogue.isDialogueCompleted('nixie_root');
    const comp3 = dialogue.isDialogueCompleted('giant_root');
    const comp4 = dialogue.isDialogueCompleted('wood_woman_root');
    const comp5 = dialogue.isDialogueCompleted('devil_root');
    const comp6 = dialogue.isDialogueCompleted('hunter_root');
    const comp7 = dialogue.isDialogueCompleted('gate_root');

    const completedQuestsCount = [comp1, comp2, comp3, comp4, comp5, comp6, comp7].filter(Boolean).length;

    // 3. Prüfen, ob eine Belohnung in der Schatztruhe wartet
    const pendingRewards = inventory.getPendingChestRewards(dialogue);
    const hasChestReward = pendingRewards.length > 0;

    // 4. Einzelstatus der 7 Waldwege
    const pathQuests: PathQuestInfo[] = [
      {
        pathId: 1,
        name: '1. Silberstollen-Pfad',
        npcName: 'Das Graumännchen',
        isBlocked: b1,
        isCompleted: comp1,
        statusLabel: comp1 ? 'Abgeschlossen' : b1 ? 'Blockiert (Felsbrocken)' : 'Offen',
        description:
          'Der alte Minenstollen im Norden. Das Graumännchen bewacht das Geheimnis einer neuen Silberader.',
        objective: comp1
          ? 'Quest gelöst: Licht & Versprechen im Bergmannsstollen geklärt.'
          : b1
          ? 'Berühre den Smaragd am Weganfang, um den Felsbrocken zu beseitigen.'
          : 'Gehe zum Stollen und sprich mit dem Graumännchen.',
      },
      {
        pathId: 2,
        name: '2. Nixenteich-Pfad',
        npcName: 'Die Nixe vom Spiegelteich',
        isBlocked: b2,
        isCompleted: comp2,
        statusLabel: comp2 ? 'Abgeschlossen' : b2 ? 'Blockiert (Wasserpfütze)' : 'Offen',
        description:
          'Ein tiefer Waldteich im Nordosten mit Seerosen und Schilf. Die Nixe hütet einen versunkenen Goldschatz.',
        objective: comp2
          ? 'Quest gelöst: Versuchung und Fluch des Spiegelteichs verstanden.'
          : b2
          ? 'Berühre den Aquamarin am Weganfang, um die magische Pfütze zu versickern.'
          : 'Wandere zum Ufer des Teichs und sprich mit der Nixe.',
      },
      {
        pathId: 3,
        name: '3. Quellenweg',
        npcName: 'Der Riese an der Quelle',
        isBlocked: b3,
        isCompleted: comp3,
        statusLabel: comp3 ? 'Abgeschlossen' : b3 ? 'Blockiert (Gebirgsbach)' : 'Offen',
        description:
          'Die urige Holzbrücke über den Gebirgsbach im Osten. Dahinter wacht der Riese über die lebenswichtige Bergquelle.',
        objective: comp3
          ? 'Quest gelöst: Friedlicher Ausgleich um die Bergquelle gefunden.'
          : b3
          ? 'Berühre den Saphir am Weganfang, um den Bachlauf zu zähmen.'
          : 'Überquere die Brücke und sprich mit dem Riesen am Wasser.',
      },
      {
        pathId: 4,
        name: '4. Holzfäller-Pfad',
        npcName: 'Das Holzweibchen',
        isBlocked: b4,
        isCompleted: comp4,
        statusLabel: comp4 ? 'Abgeschlossen' : b4 ? 'Blockiert (Baumstamm)' : 'Offen',
        description:
          'Ein gerodeter Platz im Südosten mit Brennholzlagern. Das Holzweibchen wacht über das Gleichgewicht des Waldes.',
        objective: comp4
          ? 'Quest gelöst: Pakt zwischen Brennholzbedarf und Waldschutz geschlossen.'
          : b4
          ? 'Berühre den Bernsteinkristall am Weganfang, um den Stamm zu spalten.'
          : 'Gehe zur Lichtung und sprich mit dem Holzweibchen.',
      },
      {
        pathId: 5,
        name: '5. Höllenschlund-Pfad',
        npcName: 'Der Teufel / Dämonenkrieger',
        isBlocked: b5,
        isCompleted: comp5,
        statusLabel: comp5 ? 'Abgeschlossen' : b5 ? 'Blockiert (Flammenwand)' : 'Offen',
        description:
          'Zerklüftete Basaltfelsen und ein brodelnder Lavakrater im Süd-Südwesten, bewacht vom Teufel auf der Felsnadel.',
        objective: comp5
          ? 'Quest gelöst: Dem Dämonenkrieger am Lavakrater die Stirn geboten.'
          : b5
          ? 'Berühre den Rubin am Weganfang, um die Flammenwand zu löschen.'
          : 'Folge dem Glutpfad bis zum Lavakrater und stelle dich dem Teufel.',
      },
      {
        pathId: 6,
        name: '6. Jägerpfad',
        npcName: 'Der Wilde Jäger & Holzweibchen',
        isBlocked: b6,
        isCompleted: comp6,
        statusLabel: comp6 ? 'Abgeschlossen' : b6 ? 'Blockiert (Zauberkräuter)' : 'Offen',
        description:
          'Vor der wehrhaften Burg im Südwesten streiten der Wilde Jäger und das Holzweibchen am umzäunten Kräutergarten.',
        objective: comp6
          ? 'Quest gelöst: Streit um die Heilkräuter und die Hirschkuh beigelegt.'
          : b6
          ? 'Berühre den Amethyst am Weganfang, um das Holzgeländer zu öffnen.'
          : 'Begib dich zur Burg und schlichte den Streit am Kräutergarten.',
      },
      {
        pathId: 7,
        name: '7. Torweg',
        npcName: 'Lupo & Das Steintor',
        isBlocked: false,
        isCompleted: comp7,
        statusLabel: comp7 ? 'Abgeschlossen' : 'Offen',
        description:
          'Der alte Torweg im Nordwesten durch den Nebelwald bis zum monumentalen Steintor, das den Weg ins Zinsbachtal sperrt.',
        objective: comp7
          ? 'Das Geheimnis des Steintors wurde gelüftet!'
          : 'Untersuche das verschlossene Steintor am Ende des Weges.',
      },
    ];

    // 5. Ermittlung des aktuellen Questauftrags (Stufe für Stufe)
    let currentQuest: CurrentQuestInfo;

    const hasTalkedToArvid = !dialogue.canStartDialogue('root');
    const hasItemsInInventory = inventory.getUnlockedItems().length > 0;

    if (!hasTalkedToArvid) {
      currentQuest = {
        chapter: 'Kapitel 1: Der Ruf der Kreuzung',
        title: 'Erkunde die Gegend',
        objective: 'Erkunde die Gegend und folge Weg 7 nach vorn zur Waldkreuzung.',
        hint: 'Auf Weg 7 begegnest du Lupo. Waldhüter Arvid wartet vor der Schutzhütte im Zentrum der Kreuzung.',
        progressText: 'Weg 7 → 7-Wegekreuzung',
        hasChestReward: false,
      };
    } else if (hasChestReward) {
      currentQuest = {
        chapter: 'Belohnung bereit: Schatztruhe',
        title: 'Hole deine Belohnung aus der Truhe',
        objective: 'Kehre zur Waldkreuzung zurück und öffne die Schatztruhe vor der Schutzhütte.',
        hint: `In der Schatztruhe wartet ${pendingRewards.length === 1 ? 'deine verdiente Quest-Belohnung' : `${pendingRewards.length} neue Belohnungen`} auf dich!`,
        progressText: `${pendingRewards.length} Item(s) in der Truhe`,
        hasChestReward: true,
      };
    } else if (completedQuestsCount === 0) {
      currentQuest = {
        chapter: 'Kapitel 2: Die Prüfungen der Wege',
        title: 'Bestehe die erste Wegequest',
        objective: 'Befreie die gesperrten Waldwege, sprich mit den Bewohnern und triff deine Entscheidungen.',
        hint: 'Sobald du eine Wegequest (Weg 1–6) abschließt, bestimmt dein Ausgang den Inhalt der Schatztruhe an der Schutzhütte!',
        progressText: '0 von 6 Wegequests gelöst',
        hasChestReward: false,
      };
    } else if (clearedCount < 6) {
      currentQuest = {
        chapter: 'Kapitel 3: Die magischen Barrieren',
        title: 'Befreie die gesperrten Waldwege',
        objective: 'Berühre die schwebenden Edelsteine an den Weganfängen, um die Blockaden auf den Pfaden zu lösen.',
        hint: 'Tipp: Klicke auf die goldene Spitze des zentralen Wegweisers, um alle 6 Wegsperren auf einmal mit Zauberkraft zu bannen!',
        progressText: `${clearedCount} von 6 Barrieren gelöst`,
        hasChestReward: false,
      };
    } else if (completedQuestsCount < 6) {
      currentQuest = {
        chapter: 'Kapitel 4: Die moralischen Prüfungen',
        title: 'Bestehe die Prüfungen der Waldwege',
        objective: 'Wandere zu den Schauplätzen, sprich mit den Bewohnern und triff deine Entscheidungen.',
        hint: 'Jeder gelöste Konflikt legt eine neue Belohnung in die Schatztruhe an der Waldkreuzung.',
        progressText: `${completedQuestsCount} von 6 Prüfungen bestanden`,
        hasChestReward: false,
      };
    } else {
      currentQuest = {
        chapter: 'Kapitel 5: Das Tor ins Zinsbachtal',
        title: 'Öffne das Steintor auf Weg 7',
        objective: 'Kehre zum Ende von Weg 7 zurück und öffne das mächtige Steintor mit deinem Runenschlüssel.',
        hint: 'Du hast alle Pfade gemeistert und das Vertrauen des Waldes gewonnen. Der Weg ins Tal liegt frei vor dir!',
        progressText: 'Finaler Weg ins Tal',
        hasChestReward: false,
      };
    }

    // 6. Chronik / Tagebuch-Notizen
    const journalNotes: JournalNote[] = [
      {
        id: 'note_start',
        text: 'Im dichten Nebel auf Weg 7 erwacht. Fabelwesen Lupo hoppelnd begegnet.',
        completed: true,
      },
      {
        id: 'note_arvid',
        text: 'Die 7-Wegekreuzung erreicht und mit Waldhüter Arvid an der Schutzhütte gesprochen.',
        completed: hasTalkedToArvid,
      },
      {
        id: 'note_chest',
        text: 'Die Schatztruhe an der Schutzhütte geöffnet und die Quest-Belohnung geborgen.',
        completed: hasItemsInInventory,
      },
      {
        id: 'note_barriers',
        text: `Magische Wegsperren durch Edelsteinresonanz gebannt (${clearedCount}/6 gelöst).`,
        completed: clearedCount >= 6,
      },
      {
        id: 'note_paths',
        text: `Die moralischen Prüfungen der Waldbewohner gemeistert (${completedQuestsCount}/7 gelöst).`,
        completed: completedQuestsCount >= 6,
      },
      {
        id: 'note_gate',
        text: 'Das uralte Steintor zum Zinsbachtal erforscht und geöffnet.',
        completed: comp7,
      },
    ];

    return {
      currentQuest,
      pathQuests,
      journalNotes,
      totalPathsCompleted: completedQuestsCount,
      totalBarriersCleared: clearedCount,
    };
  }
}
