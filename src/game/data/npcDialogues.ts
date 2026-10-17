import { SEVEN_PATHS } from './paths';

export type DialogueAction =
  | { type: 'select_path'; pathId: number }
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

/**
 * Individuelle Hinweise des Waldhüters zu jedem der sieben Wege.
 */
const PATH_HINTS: Record<number, string> = {
  1: 'Der Nordpfad der Stille führt tief zwischen uralte Tannen. Wer Ruhe sucht und auf leise Zeichen im Moos achtet, findet dort den klarsten Kopf.',
  2: 'Auf dem Morgenlicht-Steig im Nordosten bricht die Sonne zuerst durch die Birkenkronen. Ein Weg für Aufbruch, Zuversicht und weite Blicke am Hang.',
  3: 'Der Quellenweg im Südosten folgt einem klaren Waldbach bergauf. Halte dort nach den flachen Trittsteinen Ausschau – das Wasser weist dir den Takt.',
  4: 'Der Wurzelgrat im Südsüdosten verlangt sicheren Tritt: Knorrige Wurzeln und Felsenstufen prüfen deine Ausdauer, belohnen dich aber mit alter Waldkraft.',
  5: 'Der Nebeltal-Weg im Südsüdwest senkt sich in eine kühle, stille Mulde. Lass dich vom Dunst nicht täuschen – bleibe dicht bei den Steinmalen.',
  6: 'Die Abendrot-Schneise im Südwesten öffnet den Blick zwischen hohen Kiefern. Besonders wenn das Licht tief steht, erkennst du dort ferne Landmarken.',
  7: 'Der Sternenwald-Pfad im Nordwesten liegt unter einem dichten Blätterdach. Dort leuchten selbst am Tag die Farne – ein Pfad für Entdecker und Rätselsucher.',
};

function buildDialogueNodes(): Record<string, DialogueNode> {
  const nodes: Record<string, DialogueNode> = {
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
          playerText: 'Welchen Weg würdest du mir für den Anfang empfehlen?',
          nextNodeId: 'recommendation',
        },
        {
          id: 'bye',
          playerText: 'Ich sehe mich erst einmal weiter auf der Kreuzung um. (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    about_crossroads: {
      id: 'about_crossroads',
      speaker: GUIDE_NPC_NAME,
      speakerRole: GUIDE_NPC_ROLE,
      text: 'Alle sieben Pfade des Wanderlandes treffen an dieser Lichtung zusammen. Die Schutzhütte in der Mitte ist dein sicherer Ankerpunkt: Egal welchen Pfad du erkundest, hierher kannst du jederzeit zurückkehren, um dich neu zu orientieren.',
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
      text: 'Wenn du ruhig beginnen möchtest, rate ich dir zum 1. Nordpfad der Stille oder zum 2. Morgenlicht-Steig. Suchst du dagegen eine Herausforderung, sieh dir den 4. Wurzelgrat oder den 5. Nebeltal-Weg genauer an.',
      options: [
        {
          id: 'pick-1',
          playerText: 'Zeig mir den 1. Nordpfad der Stille.',
          nextNodeId: 'path_1',
        },
        {
          id: 'pick-2',
          playerText: 'Erzähl mir vom 2. Morgenlicht-Steig.',
          nextNodeId: 'path_2',
        },
        {
          id: 'all-paths',
          playerText: 'Lass mich aus allen sieben Wegen wählen.',
          nextNodeId: 'paths_overview',
        },
        {
          id: 'bye',
          playerText: 'Danke, ich treffe meine Wahl! (Gespräch beenden)',
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
  };

  for (const path of SEVEN_PATHS) {
    nodes[`path_${path.id}`] = {
      id: `path_${path.id}`,
      speaker: GUIDE_NPC_NAME,
      speakerRole: GUIDE_NPC_ROLE,
      text: PATH_HINTS[path.id] ?? path.subtitle,
      options: [
        {
          id: `go-path-${path.id}`,
          playerText: `Diesen Weg wählen und zum Eingang von „${path.name}“ gehen`,
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
