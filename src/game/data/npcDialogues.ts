import { SEVEN_PATHS } from './paths';

export type DialogueAction =
  | { type: 'select_path'; pathId: number }
  | { type: 'walk_to_grey_man' }
  | { type: 'close' };

export interface DialogueOption {
  id: string;
  playerText: string;
  nextNodeId: string | null;
  action?: DialogueAction;
}

export interface DialogueNode {
  id: string;
  speaker: string;
  speakerRole: string;
  text: string;
  options: readonly DialogueOption[];
}

export const GUIDE_NPC_NAME = 'Waldhüter Arvid';
export const GUIDE_NPC_ROLE = 'Hinweisgeber an der Schutzhütte';

export const GREY_MAN_NPC_NAME = 'Das Graumännchen';
export const GREY_MAN_NPC_ROLE = 'Hüter des alten Silberstollens';

/**
 * Individuelle Hinweise des Waldhüters zu jedem der sieben Wege.
 */
const PATH_HINTS: Record<number, string> = {
  1: 'Der 1. Silberstollen-Pfad windet sich in einer langen Kurve hinauf zum alten Bergmassiv. Vor dem Höhleneingang wartet das Graumännchen: Eine neue Silberader könnte dort Mine und Arbeiter retten – doch ihr Auffinden verlangt Licht in einem Stollen, für den ein altes Verbot und Versprechen gilt.',
  2: 'Auf dem Morgenlicht-Steig im Nordosten bricht die Sonne zuerst durch die Birkenkronen. Ein Weg für Aufbruch, Zuversicht und weite Blicke am Hang.',
  3: 'Der Quellenweg im Südosten folgt einem klaren Waldbach bergauf. Halte dort nach den flachen Trittsteinen Ausschau – das Wasser weist dir den Takt.',
  4: 'Der Wurzelgrat im Südsüdosten verlangt sicheren Tritt: Knorrige Wurzeln und Felsenstufen prüfen deine Ausdauer, belohnen dich aber mit alter Waldkraft.',
  5: 'Der Nebeltal-Weg im Südsüdwest senkt sich in eine kühle, stille Mulde. Lass dich vom Dunst nicht täuschen – bleibe dicht bei den Steinmalen.',
  6: 'Die Abendrot-Schneise im Südwesten öffnet den Blick zwischen hohen Kiefern. Besonders wenn das Licht tief steht, erkennst du dort ferne Landmarken.',
  7: 'Der Sternenwald-Pfad im Nordwesten liegt unter einem dichten Blätterdach. Dort leuchten selbst am Tag die Farne – ein Pfad für Entdecker und Rätselsucher.',
};

function buildDialogueNodes(): Record<string, DialogueNode> {
  const nodes: Record<string, DialogueNode> = {
    // === WALDHÜTER ARVID (an der Schutzhütte) ===
    root: {
      id: 'root',
      speaker: GUIDE_NPC_NAME,
      speakerRole: GUIDE_NPC_ROLE,
      text: 'Willkommen an der Kreuzung der sieben Wege, Reisende! Ich wache über diese Schutzhütte. Wohin zieht es deine Schritte – oder suchst du noch Rat für deine Wahl?',
      options: [
        {
          id: 'ask-paths',
          playerText: 'Kannst du mir Hinweise zu den sieben Wegen geben?',
          nextNodeId: 'paths_overview',
        },
        {
          id: 'ask-crossroads',
          playerText: 'Was hat es mit dieser Waldkreuzung und der Hütte auf sich?',
          nextNodeId: 'about_crossroads',
        },
        {
          id: 'ask-recommendation',
          playerText: 'Welchen Weg würdest du mir zuerst empfehlen?',
          nextNodeId: 'recommendation',
        },
        {
          id: 'bye',
          playerText: 'Ich sehe mich erst einmal weiter um. (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    about_crossroads: {
      id: 'about_crossroads',
      speaker: GUIDE_NPC_NAME,
      speakerRole: GUIDE_NPC_ROLE,
      text: 'Alle sieben Pfade des Wanderlandes treffen an dieser Lichtung zusammen. Die Schutzhütte in der Mitte ist dein sicherer Ankerpunkt, und in der Schatztruhe davor ruht ein altes Licht-Artefakt für dunkle Wege.',
      options: [
        {
          id: 'to-paths',
          playerText: 'Erzähl mir mehr über die einzelnen sieben Wege.',
          nextNodeId: 'paths_overview',
        },
        {
          id: 'back-root',
          playerText: 'Verstanden, zurück zu meiner vorigen Frage.',
          nextNodeId: 'root',
        },
        {
          id: 'bye',
          playerText: 'Danke für die Erklärung! (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    recommendation: {
      id: 'recommendation',
      speaker: GUIDE_NPC_NAME,
      speakerRole: GUIDE_NPC_ROLE,
      text: 'Folge zuerst dem 1. Silberstollen-Pfad nach Norden! Er biegt im Nebel nach Nordosten ab und führt direkt zu einem Berg mit Höhleneingang. Dort wartet das Graumännchen mit einer dringenden Angelegenheit um eine neue Silberader.',
      options: [
        {
          id: 'pick-1',
          playerText: 'Erzähl mir genauer vom 1. Silberstollen-Pfad und dem Graumännchen.',
          nextNodeId: 'path_1',
        },
        {
          id: 'walk-grey-man',
          playerText: 'Direkt auf dem 1. Weg bis zum Berg und dem Graumännchen wandern',
          nextNodeId: null,
          action: { type: 'walk_to_grey_man' },
        },
        {
          id: 'all-paths',
          playerText: 'Lass mich aus allen sieben Wegen wählen.',
          nextNodeId: 'paths_overview',
        },
        {
          id: 'bye',
          playerText: 'Danke, ich mache mich auf den Weg! (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    paths_overview: {
      id: 'paths_overview',
      speaker: GUIDE_NPC_NAME,
      speakerRole: GUIDE_NPC_ROLE,
      text: 'Jeder der sieben Wege trägt einen eigenen Charakter. Über welchen Pfad möchtest du einen Hinweis hören?',
      options: [
        ...SEVEN_PATHS.map((path) => ({
          id: `ask-path-${path.id}`,
          playerText: `${path.name} (${path.directionLabel})`,
          nextNodeId: `path_${path.id}`,
        })),
        {
          id: 'back-root',
          playerText: 'Zurück zum Hauptgespräch',
          nextNodeId: 'root',
        },
      ],
    },

    // === DAS GRAUMÄNNCHEN (vor dem Höhleneingang am Ende von Weg 1) ===
    grey_root: {
      id: 'grey_root',
      speaker: GREY_MAN_NPC_NAME,
      speakerRole: GREY_MAN_NPC_ROLE,
      text: 'Glück auf, Wandernde! Gut, dass du den Weg durch den Nebel bis zu diesem Stollenmundloch gefunden hast. Eine neue Silberader tief hier im Berg könnte unsere Mine und die Arbeiter retten. Doch ihr Auffinden verlangt Licht in einem Stollen, für den ein altes Verbot beziehungsweise ein geschworenes Versprechen gilt.',
      options: [
        {
          id: 'grey-ask-vein',
          playerText: 'Warum hängt das Schicksal von Mine und Arbeitern an dieser neuen Silberader?',
          nextNodeId: 'grey_silver_vein',
        },
        {
          id: 'grey-ask-prohibition',
          playerText: 'Was hat es mit dem Verbot und dem Versprechen für diesen Stollen auf sich?',
          nextNodeId: 'grey_prohibition',
        },
        {
          id: 'grey-ask-light',
          playerText: 'Wie können wir die Silberader im Dunkeln finden, wenn Licht dort verboten ist?',
          nextNodeId: 'grey_light_choice',
        },
        {
          id: 'grey-bye',
          playerText: 'Ich denke über deine Worte nach. (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    grey_silver_vein: {
      id: 'grey_silver_vein',
      speaker: GREY_MAN_NPC_NAME,
      speakerRole: GREY_MAN_NPC_ROLE,
      text: 'Die oberen Gänge sind taub geschlagen. Wenn bis zum Ende des Mondes kein frisches Erz gefördert wird, wird die Zeche für immer geschlossen und die Bergleute verlieren ihr Auskommen. Ich weiß, dass die reiche Silberader im tiefen Nordstollen verläuft – aber ohne Licht kann niemand ihr glitzerndes Band im Gestein erkennen.',
      options: [
        {
          id: 'to-prohibition',
          playerText: 'Erzähl mir von dem Verbot und dem Versprechen im tiefen Stollen.',
          nextNodeId: 'grey_prohibition',
        },
        {
          id: 'to-light-choice',
          playerText: 'Welche Möglichkeiten haben wir, Licht in den Stollen zu bringen?',
          nextNodeId: 'grey_light_choice',
        },
        {
          id: 'back-grey-root',
          playerText: 'Zurück zum Anfang unseres Gesprächs.',
          nextNodeId: 'grey_root',
        },
      ],
    },

    grey_prohibition: {
      id: 'grey_prohibition',
      speaker: GREY_MAN_NPC_NAME,
      speakerRole: GREY_MAN_NPC_ROLE,
      text: 'Vor einer Generation stürzte der hintere First ein. Als die Eingeschlossenen gerettet wurden, gaben die Ältesten dem Berg das feierliche Versprechen, niemals wieder mit offenem Grubenfeuer oder Talglicht in diesen gesperrten Stollen einzufahren. Seitdem gilt das strenge Verbot: Kein offenes Licht darf die Schwelle passieren.',
      options: [
        {
          id: 'ask-workaround',
          playerText: 'Gilt das Verbot für jedes Licht – oder nur für offenes Grubenfeuer?',
          nextNodeId: 'grey_light_choice',
        },
        {
          id: 'ask-promise-weight',
          playerText: 'Was wiegt schwerer: das alte Versprechen oder die Rettung der Arbeiter?',
          nextNodeId: 'grey_dilemma',
        },
        {
          id: 'back-grey-root',
          playerText: 'Zurück zur Übersicht.',
          nextNodeId: 'grey_root',
        },
      ],
    },

    grey_light_choice: {
      id: 'grey_light_choice',
      speaker: GREY_MAN_NPC_NAME,
      speakerRole: GREY_MAN_NPC_ROLE,
      text: 'Du hörst genau hin! Das Verbot untersagt offenes Grubenlicht, das den Berg wärmt und Rauch wirft. Doch in der Schatztruhe vor der Schutzhütte auf der Kreuzung liegt ein kalt leuchtender Waldkristall. Oder man bittet die Ältesten offen um Entbindung vom Versprechen, um die Arbeiter zu retten. Welchen Weg hältst du für richtig?',
      options: [
        {
          id: 'choice-crystal',
          playerText: 'Wir nutzen das kalte Kristalllicht aus der Truhe – so bleibt der Wortlaut des Versprechens gewahrt.',
          nextNodeId: 'grey_resolution_crystal',
        },
        {
          id: 'choice-honest-plea',
          playerText: 'Ein Versprechen darf man nicht durch eine List umgehen – wir sollten das Verbot offen mit den Arbeitern prüfen.',
          nextNodeId: 'grey_resolution_honest',
        },
        {
          id: 'choice-strict-ban',
          playerText: 'Das Versprechen an den Berg ist unantastbar – der Stollen muss dunkel bleiben.',
          nextNodeId: 'grey_resolution_strict',
        },
      ],
    },

    grey_dilemma: {
      id: 'grey_dilemma',
      speaker: GREY_MAN_NPC_NAME,
      speakerRole: GREY_MAN_NPC_ROLE,
      text: 'Genau deshalb warte ich hier vor dem Höhleneingang auf jemanden von außerhalb. Ein gebrochener Schwur nimmt den Bergleuten ihre Ehre und ihren Schutz – doch eine geschlossene Mine nimmt ihnen das Brot. Nur wer beides achtet, findet den wahren Weg zur Silberader.',
      options: [
        {
          id: 'dilemma-to-choice',
          playerText: 'Lass uns überlegen, wie wir Licht in den Stollen bringen können.',
          nextNodeId: 'grey_light_choice',
        },
        {
          id: 'dilemma-back',
          playerText: 'Zurück zum Hauptgespräch.',
          nextNodeId: 'grey_root',
        },
      ],
    },

    grey_resolution_crystal: {
      id: 'grey_resolution_crystal',
      speaker: GREY_MAN_NPC_NAME,
      speakerRole: GREY_MAN_NPC_ROLE,
      text: 'Ein kluger Gedanke! Der stille Glanz aus der Truhe an der Schutzhütte trägt weder Flamme noch Rauch in den Stollen und bringt dennoch das Silber im Fels zum Aufleuchten. Wenn du die Truhe an der Hütte geöffnet hast, steht uns die Entdeckung der Silberader offen!',
      options: [
        {
          id: 'back-grey-root',
          playerText: 'Ich habe noch eine andere Frage zum Stollen.',
          nextNodeId: 'grey_root',
        },
        {
          id: 'close-grey',
          playerText: 'Glück auf, Graumännchen! (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    grey_resolution_honest: {
      id: 'grey_resolution_honest',
      speaker: GREY_MAN_NPC_NAME,
      speakerRole: GREY_MAN_NPC_ROLE,
      text: 'Aufrichtigkeit ehrt dich! Ein Versprechen, das dem Schutz des Lebens diente, darf auch im Namen des Lebens gemeinsam erneuert werden. Mit dieser Haltung kannst du den Bergleuten und dem Berg gleichermaßen in die Augen blicken.',
      options: [
        {
          id: 'back-grey-root',
          playerText: 'Ich möchte noch etwas anderes fragen.',
          nextNodeId: 'grey_root',
        },
        {
          id: 'close-grey',
          playerText: 'Glück auf! (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    grey_resolution_strict: {
      id: 'grey_resolution_strict',
      speaker: GREY_MAN_NPC_NAME,
      speakerRole: GREY_MAN_NPC_ROLE,
      text: 'Eine strenge, aber standhafte Entscheidung. Wer ein gegebenes Wort selbst in größter Not nicht bricht, bewahrt den Frieden mit dem Berg – auch wenn die Arbeiter dann nach neuen Wegen außerhalb der alten Stollen suchen müssen.',
      options: [
        {
          id: 'back-grey-root',
          playerText: 'Lass mich die anderen Möglichkeiten noch einmal abwägen.',
          nextNodeId: 'grey_light_choice',
        },
        {
          id: 'close-grey',
          playerText: 'Glück auf! (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
  };

  for (const path of SEVEN_PATHS) {
    const extraOptions: DialogueOption[] =
      path.id === 1
        ? [
            {
              id: 'walk-to-cave-1',
              playerText: 'Den gesamten 1. Weg durch die Kurve bis zum Berg & Graumännchen wandern',
              nextNodeId: null,
              action: { type: 'walk_to_grey_man' },
            },
          ]
        : [];

    nodes[`path_${path.id}`] = {
      id: `path_${path.id}`,
      speaker: GUIDE_NPC_NAME,
      speakerRole: GUIDE_NPC_ROLE,
      text: PATH_HINTS[path.id] ?? path.subtitle,
      options: [
        ...extraOptions,
        {
          id: `go-path-${path.id}`,
          playerText: `Zum Wegeingang von „${path.name}“ gehen`,
          nextNodeId: null,
          action: { type: 'select_path', pathId: path.id },
        },
        {
          id: 'other-path',
          playerText: 'Nach einem anderen der sieben Wege fragen',
          nextNodeId: 'paths_overview',
        },
        {
          id: 'close-path',
          playerText: 'Danke für den Hinweis! (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    };
  }

  return nodes;
}

export const GUIDE_DIALOGUE_NODES: Readonly<Record<string, DialogueNode>> = buildDialogueNodes();
