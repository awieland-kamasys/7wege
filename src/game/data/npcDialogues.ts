import { SEVEN_PATHS } from './paths';

export type DialogueAction =
  | { type: 'select_path'; pathId: number }
  | { type: 'walk_to_grey_man' }
  | { type: 'walk_to_nixie' }
  | { type: 'walk_to_giant' }
  | { type: 'walk_to_wood_woman' }
  | { type: 'walk_to_devil' }
  | { type: 'walk_to_wild_hunter' }
  | { type: 'walk_to_gate' }
  | { type: 'creature_flee' }
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
  autoNextNodeId?: string | null;
  autoAdvanceDelayMs?: number;
  autoAction?: DialogueAction;
  repeatable?: boolean;
}

export const GUIDE_NPC_NAME = 'Waldhüter Arvid';
export const GUIDE_NPC_ROLE = 'Hüter der Schutzhütte & Wächter der Sieben Wege';

export const GREY_MAN_NPC_NAME = 'Das Graumännchen';
export const GREY_MAN_NPC_ROLE = 'Hüter des alten Silberstollens';

export const NIXIE_NPC_NAME = 'Die Nixe vom Spiegelteich';
export const NIXIE_NPC_ROLE = 'Wächterin auf dem Stein im Teich';

export const GIANT_NPC_NAME = 'Der Riese am Wehr';
export const GIANT_NPC_ROLE = 'Wächter über Stausee und Quellwehr';

export const WOOD_WOMAN_NPC_NAME = 'Das Holzweibchen';
export const WOOD_WOMAN_NPC_ROLE = 'Hüterin des Waldes im Holzfällerlager';

export const DEVIL_NPC_NAME = 'Der Teufel';
export const DEVIL_NPC_ROLE = 'Herr des Höllenschlundes';

export const WILD_HUNTER_NPC_NAME = 'Der Wilde Jäger';
export const WILD_HUNTER_NPC_ROLE = 'Herr der Jagdhütte';

export const CREATURE_NPC_NAME = 'Lupo';
export const CREATURE_NPC_ROLE = 'Hüterling auf dem Torweg';

/**
 * Individuelle Hinweise des Waldhüters zu jedem der sieben Wege.
 */
const PATH_HINTS: Record<number, string> = {
  1: 'Der 1. Silberstollen-Pfad windet sich in einer langen Kurve hinauf zum alten Bergmassiv. Vor dem Höhleneingang wartet das Graumännchen: Eine neue Silberader könnte dort Mine und Arbeiter retten – doch ihr Auffinden verlangt Licht in einem Stollen, für den ein altes Verbot und Versprechen gilt.',
  2: 'Der 2. Nixenteich-Pfad im Nordosten führt durch den Nebel zu einem stillen Waldteich. Auf einem Felsen im Wasser sitzt die Nixe. Auf dem Grund ihres Teichs funkelt ein verlockender Schatz – doch sei gewarnt: Er ist mit einem dunklen Fluch und drohendem Unglück verbunden.',
  3: 'Der 3. Quellenweg im Südosten führt über eine Brücke, unter der ein Bach hindurchfließt. Ein geschlossenes Wehr an der Brücke staut den Bach zu einem kleinen Stausee zurück. Dort wacht der Riese: Die Quelle versorgt eigentlich das Tal – ihre Freigabe könnte dort eine Dürre lindern, zerstört jedoch die Heimat des Riesen.',
  4: 'Der 4. Holzfäller-Pfad im Südsüdosten führt auf eine gerodete Waldlichtung zu einem Holzfällerlager. Dort triffst du das Holzweibchen zwischen Baumstümpfen und Holzstapeln: Das geschlagene Brennholz rettet die Dorfbewohner vor der bitteren Kälte – doch zu starke Fällungen gefährden den Wald und seine gesamte Umgebung.',
  5: 'Der 5. Höllenschlund-Pfad im Südsüdwesten führt an den Rand eines tiefen, glühenden Abgrunds. Inmitten des Feuermeeres und der emporsteigenden Flammen erwartet dich der Teufel auf seinem Obsidianfelsen.',
  6: 'Der 6. Jägerpfad im Südwesten führt durch eine Waldschneise zu einer Jagdhütte mit prachtvollem Kräutergarten. Dort steht der Wilde Jäger und streitet erbittert mit einem Holzweibchen: Er wirft ihr Diebstahl kostbarer Kräuter vor, während sie beteuert, damit leidenden Waldtieren in höchster Not das Leben gerettet zu haben.',
  7: 'Der 7. Torweg im Nordwesten führt durch uralten Bergwald zu einem mächtigen, fest verschlossenen Tor. Schwere Eisenbeschläge, ein massiver Riegelbalken und dicke Ketten mit einem gewaltigen Schloss versperren das Weiterkommen – ein Portal, das sich nur wahrer Einsicht und Erkenntnis öffnen wird.',
};

// === DAS GESCHLOSSENE TOR (am Ende von Weg 7) ===
export const GATE_NAME = 'Das geschlossene Tor';
export const GATE_ROLE = 'Uraltes Portal des Wanderlandes';

export function createGateDialogueTree(): Record<string, DialogueNode> {
  return {
    gate_root: {
      id: 'gate_root',
      speaker: GATE_NAME,
      speakerRole: GATE_ROLE,
      text: '„Nur wer die Pfade erkannte und das Maß wahrte, tritt ein.“',
      options: [
        {
          id: 'inspect-lock',
          playerText: 'Das Schloss und die Siegelzeichen genauer untersuchen.',
          nextNodeId: 'gate_lock_inspect',
        },
        {
          id: 'inspect-chains',
          playerText: 'Versuchen, an den Eisenketten und dem Riegel zu rütteln.',
          nextNodeId: 'gate_chain_shake',
        },
        {
          id: 'inspect-runes',
          playerText: 'Die verwitterte Inschrift auf dem Torbogen betrachten.',
          nextNodeId: 'gate_inscription',
        },
        {
          id: 'gate-close',
          playerText: 'Den Blick abwenden und den Rückweg bedenken. (Untersuchung beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
    gate_lock_inspect: {
      id: 'gate_lock_inspect',
      speaker: GATE_NAME,
      speakerRole: GATE_ROLE,
      text: 'Das Vorhängeschloss besitzt kein gewöhnliches Schlüsselloch. Stattdessen sind sieben kreisförmige Vertiefungen in das Metall eingelassen, die den sieben Wegen der Waldkreuzung gleichen. Sie scheinen auf eine Vollendung oder Erkenntnis zu warten, ehe sich der Mechanismus rührt.',
      options: [
        {
          id: 'back-gate-root-lock',
          playerText: 'Weitere Details des Tors ansehen.',
          nextNodeId: 'gate_root',
        },
        {
          id: 'close-gate-lock',
          playerText: 'Die Untersuchung beenden.',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
    gate_chain_shake: {
      id: 'gate_chain_shake',
      speaker: GATE_NAME,
      speakerRole: GATE_ROLE,
      text: 'Du greifst nach den kalten Eisenketten und rüttelst daran. Ein dumpfer, schwerer Klang hallt durch die stillen Tannen, doch das Tor rührt sich keinen Millimeter. Rohe Kraft vermag hier nichts auszurichten.',
      options: [
        {
          id: 'back-gate-root-chain',
          playerText: 'Zurück zum Tor.',
          nextNodeId: 'gate_root',
        },
        {
          id: 'close-gate-chain',
          playerText: 'Die Untersuchung beenden.',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
    gate_inscription: {
      id: 'gate_inscription',
      speaker: GATE_NAME,
      speakerRole: GATE_ROLE,
      text: 'Die Schriftzeichen sind tief in den Stein gehauen: „Wer das Gold der Nixe verschmäht, das Wort des Bergmanns ehrt, dem Riesen wie dem Dürstenden Gehör schenkt und das Leben im Wald bewahrt, der wird den Schlüssel in sich tragen.“ Arvids Worte über das Gewissen scheinen hier Gestalt angenommen zu haben.',
      options: [
        {
          id: 'back-gate-root-ins',
          playerText: 'Zurück zum Tor.',
          nextNodeId: 'gate_root',
        },
        {
          id: 'close-gate-ins',
          playerText: 'Die Untersuchung beenden.',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
  };
}

export const GATE_DIALOGUE_NODES: Readonly<Record<string, DialogueNode>> = createGateDialogueTree();

// === DER MAGISCHE FELSBROCKEN (auf Weg 1) ===
export const BOULDER_NAME = 'Magischer Felsbrocken';
export const BOULDER_ROLE = 'Uraltes Hindernis auf dem Silberstollen-Pfad';

export function createBoulderDialogueTree(): Record<string, DialogueNode> {
  return {
    boulder_root: {
      id: 'boulder_root',
      speaker: BOULDER_NAME,
      speakerRole: BOULDER_ROLE,
      text: 'Ein gewaltiger, bemooster Granitfelsen versperrt den gesamten Pfad hinauf zum Silberstollen. Durch den Stein ziehen sich feine, grün schimmernde Adern aus Kristallstaub. Am Fuße des Pfades dreht sich ein leuchtender Edelstein auf einem Steinsockel – eine uralte Resonanz scheint beide miteinander zu verbinden.',
      options: [
        {
          id: 'boulder-inspect-runes',
          playerText: 'Die grün schimmernden Kristalladern genauer abtasten.',
          nextNodeId: 'boulder_runes',
        },
        {
          id: 'boulder-clear-hint',
          playerText: 'Verstehen, wie der Felsen beseitigt werden kann.',
          nextNodeId: 'boulder_hint',
        },
        {
          id: 'boulder-close',
          playerText: 'Vom Felsen zurücktreten. (Untersuchung beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
    boulder_runes: {
      id: 'boulder_runes',
      speaker: BOULDER_NAME,
      speakerRole: BOULDER_ROLE,
      text: 'Der Stein summt leise, wenn du deine Hand an die Adern legst. Seine Masse ist durch uralte Erdmagie im Boden verankert. Die Energie fließt geradewegs zum rotierenden grünen Edelstein am Eingang von Weg 1 hinab!',
      options: [
        {
          id: 'boulder-to-hint',
          playerText: 'Wie lässt sich dieser Bann lösen?',
          nextNodeId: 'boulder_hint',
        },
        {
          id: 'boulder-close-runes',
          playerText: 'Ich trete zurück. (Untersuchung beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
    boulder_hint: {
      id: 'boulder_hint',
      speaker: BOULDER_NAME,
      speakerRole: BOULDER_ROLE,
      text: 'Klicke einfach auf den rotierenden grünen Edelstein am Pfadanfang des 1. Weges! Eine Berührung dieses Leitkristalls wird die Resonanz auslösen und den Felsbrocken zerfallen lassen.',
      options: [
        {
          id: 'boulder-close-hint',
          playerText: 'Alles klar, ich werde den Edelstein berühren! (Untersuchung beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
  };
}

export const BOULDER_DIALOGUE_NODES: Readonly<Record<string, DialogueNode>> = createBoulderDialogueTree();

// === DIE MAGISCHE WASSERPFÜTZE (auf Weg 2) ===
export const PUDDLE_NAME = 'Tiefe Wasserpfütze';
export const PUDDLE_ROLE = 'Magische Barriere auf dem Nixenteich-Pfad';

export function createPuddleDialogueTree(): Record<string, DialogueNode> {
  return {
    puddle_root: {
      id: 'puddle_root',
      speaker: PUDDLE_NAME,
      speakerRole: PUDDLE_ROLE,
      text: 'Eine tiefe, schimmernde Wasserpfütze überschwemmt den gesamten Pfad in Richtung des Spiegelteichs. Das Wasser kräuselt sich in magischen Wellen und schimmert im Takt des rotierenden Edelsteins am Pfadanfang.',
      options: [
        {
          id: 'puddle-hint-opt',
          playerText: 'Erkunden, wie das Wasser abgelassen werden kann.',
          nextNodeId: 'puddle_hint',
        },
        {
          id: 'puddle-close',
          playerText: 'Vorsichtig vom Wasserrand zurücktreten. (Untersuchung beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
    puddle_hint: {
      id: 'puddle_hint',
      speaker: PUDDLE_NAME,
      speakerRole: PUDDLE_ROLE,
      text: 'Klicke auf den rotierenden Aquamarin-Edelstein am Eingang des 2. Weges! Eine Berührung des Kristalls entzieht der Pfütze die magische Flut und lässt das Wasser im Erdboden versickern.',
      options: [
        {
          id: 'puddle-close-hint',
          playerText: 'Ich werde den Aquamarin berühren! (Untersuchung beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
  };
}

// === DER UMGESTÜRZTE BAUMSTAMM (auf Weg 4) ===
export const LOG_NAME = 'Uralter Baumstamm';
export const LOG_ROLE = 'Mächtiges Hindernis auf dem Holzfäller-Pfad';

export function createLogDialogueTree(): Record<string, DialogueNode> {
  return {
    log_root: {
      id: 'log_root',
      speaker: LOG_NAME,
      speakerRole: LOG_ROLE,
      text: 'Ein gewaltiger, bemooster Eichenstamm liegt quer über dem Pfad zum Holzfällerlager. Entlang der Bruchkante leuchten feine, bernsteinfarbene Runenrisse, die mit dem Leitkristall am Wegeingang harmonieren.',
      options: [
        {
          id: 'log-hint-opt',
          playerText: 'Erfahren, wie der Stamm beiseite geräumt werden kann.',
          nextNodeId: 'log_hint',
        },
        {
          id: 'log-close',
          playerText: 'Vom Stamm zurücktreten. (Untersuchung beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
    log_hint: {
      id: 'log_hint',
      speaker: LOG_NAME,
      speakerRole: LOG_ROLE,
      text: 'Klicke auf den rotierenden Bernsteinkristall am Eingang des 4. Weges! Die Resonanz des Kristalls löst die Versiegelung, lässt den Stamm zerfallen und gibt den Pfad zur Lichtung frei.',
      options: [
        {
          id: 'log-close-hint',
          playerText: 'Verstanden, ich berühre den Bernsteinkristall! (Untersuchung beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
  };
}

// === DIE LODERNDE FLAMMENWAND (auf Weg 5) ===
export const FIRE_NAME = 'Lodernde Flammenwand';
export const FIRE_ROLE = 'Feurige Barriere auf dem Höllenschlund-Pfad';

export function createFireDialogueTree(): Record<string, DialogueNode> {
  return {
    fire_root: {
      id: 'fire_root',
      speaker: FIRE_NAME,
      speakerRole: FIRE_ROLE,
      text: 'Eine lodernde Wand aus züngelnden Flammen und glühenden Kohlen riegelt den Pfad zum Höllenschlund ab. Die Hitze ist sengend, doch die Flammen pulsieren im Gleichklang mit dem rotierenden Rubinkristall an der Kreuzung.',
      options: [
        {
          id: 'fire-hint-opt',
          playerText: 'Herausfinden, wie das Feuer gelöscht werden kann.',
          nextNodeId: 'fire_hint',
        },
        {
          id: 'fire-close',
          playerText: 'Vor der Hitze zurückweichen. (Untersuchung beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
    fire_hint: {
      id: 'fire_hint',
      speaker: FIRE_NAME,
      speakerRole: FIRE_ROLE,
      text: 'Klicke auf den rotierenden Rubinkristall am Eingang des 5. Weges! Eine Berührung bannt die Höllenglut und lässt die Flammen zischend zu harmloser Asche verpuffen.',
      options: [
        {
          id: 'fire-close-hint',
          playerText: 'Ich werde den Rubinkristall berühren! (Untersuchung beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
  };
}

// === DER REISSENDE BACHLAUF (auf Weg 3) ===
export const STREAM_NAME = 'Reißender Gebirgsbach';
export const STREAM_ROLE = 'Tosende Wasserbarriere auf dem Quellenweg';

export function createStreamDialogueTree(): Record<string, DialogueNode> {
  return {
    stream_root: {
      id: 'stream_root',
      speaker: STREAM_NAME,
      speakerRole: STREAM_ROLE,
      text: 'Ein tosender, ungestümer Gebirgsbach stürzt quer über den Pfad und schneidet den Weg zur Brücke und zum Riesen ab. Weiße Gischtkronen tanzen auf den Wellen und tiefblaues Licht schimmert im Takt des rotierenden Kristalls am Weganfang.',
      options: [
        {
          id: 'stream-hint-opt',
          playerText: 'Erkunden, wie der Bachlauf gebändigt werden kann.',
          nextNodeId: 'stream_hint',
        },
        {
          id: 'stream-close',
          playerText: 'Vom reißenden Wasser zurückweichen. (Untersuchung beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
    stream_hint: {
      id: 'stream_hint',
      speaker: STREAM_NAME,
      speakerRole: STREAM_ROLE,
      text: 'Klicke auf den rotierenden saphirblauen Edelstein am Eingang des 3. Weges! Seine Kraft beruhigt die Fluten, lässt das Wasser im Kiesbett versickern und gibt den Pfad zum Wehr frei.',
      options: [
        {
          id: 'stream-close-hint',
          playerText: 'Ich berühre den blauen Saphir! (Untersuchung beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
  };
}

// === DIE HOHEN KRÄUTERPFLANZEN MIT GELÄNDER (auf Weg 6) ===
export const HERBS_NAME = 'Verwunschenes Kräutergeländer';
export const HERBS_ROLE = 'Zaubersperre auf dem Jägerpfad';

export function createHerbsDialogueTree(): Record<string, DialogueNode> {
  return {
    herbs_root: {
      id: 'herbs_root',
      speaker: HERBS_NAME,
      speakerRole: HERBS_ROLE,
      text: 'Ein massives, gezimmertes Holzgeländer und dahinter wuchernde, mannshohe Zauberkräuter riegeln den Pfad zur Jagdhütte vollständig ab. Violett glühende Knospen schwingen im Gleichklang mit dem rotierenden Amethystkristall am Weganfang.',
      options: [
        {
          id: 'herbs-hint-opt',
          playerText: 'Herausfinden, wie das Geländer und die Kräuter weichen.',
          nextNodeId: 'herbs_hint',
        },
        {
          id: 'herbs-close',
          playerText: 'Vor den dichten Ranken zurücktreten. (Untersuchung beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
    herbs_hint: {
      id: 'herbs_hint',
      speaker: HERBS_NAME,
      speakerRole: HERBS_ROLE,
      text: 'Klicke auf den rotierenden violetten Amethyst-Edelstein am Eingang des 6. Weges! Seine Resonanz entlässt den Zauber, lässt das Geländer zur Seite weichen und die dichten Ranken sanft vergehen.',
      options: [
        {
          id: 'herbs-close-hint',
          playerText: 'Ich werde den Amethystkristall berühren! (Untersuchung beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
  };
}


export function createMushroomCreaturesDialogueTree(): Record<string, DialogueNode> {
  return {
    // === WEG 1: PILZLING MORCHEL (Silberstollen-Pfad, in der Bergkurve) ===
    mushroom_1_root: {
      id: 'mushroom_1_root',
      speaker: 'Pilzling Morchel',
      speakerRole: 'Hüter der Felssporen auf Weg 1',
      text: '*Huhu!* Ein Wanderer tief in den Felsen des Silberstollen-Pfades! Ich bin Morchel. Du hast den gewaltigen Felsbrocken hinter dir gelassen – beachtlich! Nur noch wenige Schritte den Berg hinauf, und du erreichst die alte Silbermine!',
      options: [
        {
          id: 'm1-graumaennchen',
          playerText: 'Wer wartet denn dort oben am Stollen?',
          nextNodeId: 'mushroom_1_graumaennchen',
        },
        {
          id: 'm1-hint',
          playerText: 'Erzähl mir mehr über das Geheimnis dieses Bergpfades!',
          nextNodeId: 'mushroom_1_smaragd',
        },
        {
          id: 'm1-close',
          playerText: 'Danke für den Rat, kleiner Morchel! (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
    mushroom_1_smaragd: {
      id: 'mushroom_1_smaragd',
      speaker: 'Pilzling Morchel',
      speakerRole: 'Hüter der Felssporen auf Weg 1',
      text: 'Der grüne Smaragd an der Waldkreuzung schützt diesen Pfad mit uralter Erdmagie. Doch hüte dich: Hoch oben am Bergmassiv gelten die alten Gesetze des Berges. Wer gierig nach Silber schürft, verliert oft mehr als nur sein Licht!',
      options: [
        {
          id: 'm1-to-graumaennchen',
          playerText: 'Was hat das Graumännchen mit dem Licht zu tun?',
          nextNodeId: 'mushroom_1_graumaennchen',
        },
        {
          id: 'm1-close-smaragd',
          playerText: 'Ich steige vorsichtig weiter hinauf. (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
    mushroom_1_graumaennchen: {
      id: 'mushroom_1_graumaennchen',
      speaker: 'Pilzling Morchel',
      speakerRole: 'Hüter der Felssporen auf Weg 1',
      text: 'Dort oben hütet das uralte Graumännchen den Mineneingang! Eine neue Silberader könnte die Zeche und die Bergleute retten – doch er fordert Respekt vor dem finsteren Schacht. Sei bedacht und höflich, wenn du mit ihm sprichst!',
      options: [
        {
          id: 'm1-to-smaragd',
          playerText: 'Erzähl mir noch etwas über den Bergpfad.',
          nextNodeId: 'mushroom_1_smaragd',
        },
        {
          id: 'm1-close-mine',
          playerText: 'Danke für deine Weisheit, Morchel! (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    // === WEG 2: PILZLING PFIFFER (Nixenteich-Pfad, am Waldsaum) ===
    mushroom_2_root: {
      id: 'mushroom_2_root',
      speaker: 'Pilzling Pfiffer',
      speakerRole: 'Hüter der Feuchtsporen auf Weg 2',
      text: '*Plitsch, platsch!* Sei gegrüßt auf dem feuchten Nixenteich-Pfad! Ich bin Pfiffer. Wunderbar, wie das Wasser aus dem Felsenteich versickert ist! Weiter vorn lichtet sich der Nebel und gibt den Blick auf das stille Wasser frei!',
      options: [
        {
          id: 'm2-nixe',
          playerText: 'Erzähl mir von der Nixe und dem Teich!',
          nextNodeId: 'mushroom_2_nixe',
        },
        {
          id: 'm2-hint',
          playerText: 'Gibt es Gefahren am Seeufer?',
          nextNodeId: 'mushroom_2_aquamarin',
        },
        {
          id: 'm2-close',
          playerText: 'Danke, Pfiffer, ich passe auf! (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
    mushroom_2_aquamarin: {
      id: 'mushroom_2_aquamarin',
      speaker: 'Pilzling Pfiffer',
      speakerRole: 'Hüter der Feuchtsporen auf Weg 2',
      text: 'Der türkise Aquamarin an der Kreuzung hält die Uferpfade trocken. Doch am Seeufer selbst trügt der Schein: Das Wasser ist spiegelglatt, aber unendlich tief. Gehe behutsam an den Steg heran!',
      options: [
        {
          id: 'm2-to-nixe',
          playerText: 'Wer wartet denn mitten im See auf mich?',
          nextNodeId: 'mushroom_2_nixe',
        },
        {
          id: 'm2-close-aqua',
          playerText: 'Ich werde vorsichtig treten. (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
    mushroom_2_nixe: {
      id: 'mushroom_2_nixe',
      speaker: 'Pilzling Pfiffer',
      speakerRole: 'Hüter der Feuchtsporen auf Weg 2',
      text: 'Mitten im See sitzt die geheimnisvolle Nixe auf einem bemoosten Felsen. Auf dem Seegrund glänzt ein verlockender Schatz – doch nimm dich in Acht: Wer ihn unbedacht begehrt, wird von einem finsteren Fluch erfasst!',
      options: [
        {
          id: 'm2-to-hint',
          playerText: 'Wie kann ich dem Fluch entgehen?',
          nextNodeId: 'mushroom_2_aquamarin',
        },
        {
          id: 'm2-close-nixe',
          playerText: 'Ich werde auf der Hut sein. Danke! (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    // === WEG 3: PILZLING BOVIST (Quellenweg, vor der Wehrbrücke) ===
    mushroom_3_root: {
      id: 'mushroom_3_root',
      speaker: 'Pilzling Bovist',
      speakerRole: 'Hüter der Quellsporen auf Weg 3',
      text: '*Puff, puff!* Puh, welch herrlicher Ausblick kurz vor der Wehrbrücke! Ich bin Bovist. Der reißende Bach liegt hinter dir – siehst du dort drüben den antiken Rundbrunnen und den mächtigen Riesen?',
      options: [
        {
          id: 'm3-riese',
          playerText: 'Wer ist dieser Riese am Wehr?',
          nextNodeId: 'mushroom_3_riese',
        },
        {
          id: 'm3-hint',
          playerText: 'Warum ist das Wehr eigentlich geschlossen?',
          nextNodeId: 'mushroom_3_saphir',
        },
        {
          id: 'm3-close',
          playerText: 'Danke für die Auskunft, Bovist! (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
    mushroom_3_saphir: {
      id: 'mushroom_3_saphir',
      speaker: 'Pilzling Bovist',
      speakerRole: 'Hüter der Quellsporen auf Weg 3',
      text: 'Das Wehr hält das Quellwasser im antiken Brunnenbecken zurück. Unten im Tal herrscht bittere Dürre – doch wenn das Wehr geöffnet wird, verliert der Riese seine Heimat und die Quelle wird fortgespült!',
      options: [
        {
          id: 'm3-to-riese',
          playerText: 'Lässt sich mit dem Riesen reden?',
          nextNodeId: 'mushroom_3_riese',
        },
        {
          id: 'm3-close-saphir',
          playerText: 'Ein schwerer Gewissenskonflikt... (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
    mushroom_3_riese: {
      id: 'mushroom_3_riese',
      speaker: 'Pilzling Bovist',
      speakerRole: 'Hüter der Quellsporen auf Weg 3',
      text: 'Der Riese ist trotz seiner gewaltigen Statur kein Unhold – er liebt die Stille der Quelle und schützt das Wasser. Tritt über die Brücke und sprich ehrlich mit ihm!',
      options: [
        {
          id: 'm3-to-hint',
          playerText: 'Erzähl mir noch etwas über die Quelle.',
          nextNodeId: 'mushroom_3_saphir',
        },
        {
          id: 'm3-close-riese',
          playerText: 'Ich werde zur Brücke gehen. Danke! (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    // === WEG 4: PILZLING TRÜFFEL (Holzfäller-Pfad, im Fichtenwald) ===
    mushroom_4_root: {
      id: 'mushroom_4_root',
      speaker: 'Pilzling Trüffel',
      speakerRole: 'Hüter der Baumsporen auf Weg 4',
      text: '*Schnüff, schnüff!* Mmmh, das duftet nach frischem Fichtenharz! Ich bin Trüffel. Toll, dass du den umgestürzten Stamm hinter dir gelassen hast! Der Pfad führt dich geradewegs zur Holzfällerlichtung.',
      options: [
        {
          id: 'm4-weibchen',
          playerText: 'Was geschieht im Holzfällerlager?',
          nextNodeId: 'mushroom_4_weibchen',
        },
        {
          id: 'm4-hint',
          playerText: 'Wer wacht über diesen Waldabschnitt?',
          nextNodeId: 'mushroom_4_topas',
        },
        {
          id: 'm4-close',
          playerText: 'Danke, kleiner Trüffel! (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
    mushroom_4_topas: {
      id: 'mushroom_4_topas',
      speaker: 'Pilzling Trüffel',
      speakerRole: 'Hüter der Baumsporen auf Weg 4',
      text: 'Der sonnengelbe Topas an der Kreuzung erinnert daran, dass das Holz des Waldes Wärme spendet, aber Ehrfurcht verlangt. Achte auf das Knacken im Unterholz!',
      options: [
        {
          id: 'm4-to-weibchen',
          playerText: 'Wer wartet am Lagerfeuer auf mich?',
          nextNodeId: 'mushroom_4_weibchen',
        },
        {
          id: 'm4-close-topas',
          playerText: 'Ich setze meinen Weg fort. (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
    mushroom_4_weibchen: {
      id: 'mushroom_4_weibchen',
      speaker: 'Pilzling Trüffel',
      speakerRole: 'Hüter der Baumsporen auf Weg 4',
      text: 'Auf der Lichtung brennt das Feuer der Holzfäller. Dort wacht das geheimnisvolle Holzweibchen! Die Menschen frieren im Winter, doch wer den Wald kahl schlägt, zerstört die Heimat aller Tiere.',
      options: [
        {
          id: 'm4-to-hint',
          playerText: 'Erzähl mir noch etwas über den Wald.',
          nextNodeId: 'mushroom_4_topas',
        },
        {
          id: 'm4-close-weibchen',
          playerText: 'Ich werde mir das Lager ansehen. Danke! (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    // === WEG 5: PILZLING FEUERKAPPE (Höllenschlund-Pfad, vor dem Krater) ===
    mushroom_5_root: {
      id: 'mushroom_5_root',
      speaker: 'Pilzling Feuerkappe',
      speakerRole: 'Hüter der Glutsporen auf Weg 5',
      text: '*Uff!* Hier draußen vor dem Krater flirrt die Luft ganz gewaltig! Ich bin Feuerkappe. Du hast den feurigen Sperrwall durchquert – bewundernswert! Nur noch wenige Schritte über den Basalt, und du stehst am Abgrund des Höllenschlunds!',
      options: [
        {
          id: 'm5-teufel',
          playerText: 'Wer herrscht in diesem flammenden Krater?',
          nextNodeId: 'mushroom_5_teufel',
        },
        {
          id: 'm5-hint',
          playerText: 'Wie gefährlich ist der Höllenschlund?',
          nextNodeId: 'mushroom_5_rubin',
        },
        {
          id: 'm5-close',
          playerText: 'Danke, ich nehme mich in Acht! (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
    mushroom_5_rubin: {
      id: 'mushroom_5_rubin',
      speaker: 'Pilzling Feuerkappe',
      speakerRole: 'Hüter der Glutsporen auf Weg 5',
      text: 'Der feuerrote Rubin hat dir den Pfad freigebrannt. Doch am Kraterrand brodelt die flüssige Lava unerbittlich. Halte Abstand zu den spitzen Obsidiankanten!',
      options: [
        {
          id: 'm5-to-teufel',
          playerText: 'Was will der Teufel von den Wanderern?',
          nextNodeId: 'mushroom_5_teufel',
        },
        {
          id: 'm5-close-rubin',
          playerText: 'Ich trete vorsichtig an den Rand. (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
    mushroom_5_teufel: {
      id: 'mushroom_5_teufel',
      speaker: 'Pilzling Feuerkappe',
      speakerRole: 'Hüter der Glutsporen auf Weg 5',
      text: 'Inmitten des feurigen Schlundes thront der Teufel auf seinem Obsidianfelsen. Er lockt mit unermesslicher Macht und Reichtum – doch glaube keinem seiner süßen Versprechen!',
      options: [
        {
          id: 'm5-to-hint',
          playerText: 'Danke für die treue Warnung!',
          nextNodeId: 'mushroom_5_rubin',
        },
        {
          id: 'm5-close-teufel',
          playerText: 'Ich lasse mich nicht verführen. (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    // === WEG 6: PILZLING KRÄUTERHUT (Jägerpfad, im Kräutersaum) ===
    mushroom_6_root: {
      id: 'mushroom_6_root',
      speaker: 'Pilzling Kräuterhut',
      speakerRole: 'Hüter der Waldkräuter auf Weg 6',
      text: '*Hatschi!* Hier duftet es herrlich nach Thymian und Baldrian! Ich bin Kräuterhut. Prima, dass die dichten Fantasiepflanzen den Pfad freigegeben haben! Vor dir liegt der Weg zur Burg und zum Kräutergarten.',
      options: [
        {
          id: 'm6-jaeger',
          playerText: 'Wohin führt dieser geheimnisvolle Pfad?',
          nextNodeId: 'mushroom_6_jaeger',
        },
        {
          id: 'm6-hint',
          playerText: 'Was hat es mit den Heilkräutern auf sich?',
          nextNodeId: 'mushroom_6_amethyst',
        },
        {
          id: 'm6-close',
          playerText: 'Gesundheit und danke, Kräuterhut! (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
    mushroom_6_amethyst: {
      id: 'mushroom_6_amethyst',
      speaker: 'Pilzling Kräuterhut',
      speakerRole: 'Hüter der Waldkräuter auf Weg 6',
      text: 'Der violette Amethyst an der Kreuzung birgt die Weisheit der Heilung. An der Burg wachsen Kräuter, die selbst schwerste Wunden heilen können – doch wer bestimmt, wer sie pflücken darf?',
      options: [
        {
          id: 'm6-to-jaeger',
          playerText: 'Wer streitet denn dort oben an der Burg?',
          nextNodeId: 'mushroom_6_jaeger',
        },
        {
          id: 'm6-close-ameth',
          playerText: 'Ich werde mir den Streit anhören. (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
    mushroom_6_jaeger: {
      id: 'mushroom_6_jaeger',
      speaker: 'Pilzling Kräuterhut',
      speakerRole: 'Hüter der Waldkräuter auf Weg 6',
      text: 'Vor den Zinnen der Burg streiten der gestrenge Wilde Jäger und ein zweites Holzweibchen! Er wirft ihr Diebstahl vor, doch sie will nur verletzten Tieren helfen. Ein weiser Schiedsspruch wird dringend gebraucht!',
      options: [
        {
          id: 'm6-to-hint',
          playerText: 'Erzähl mir noch etwas über die Kräuter.',
          nextNodeId: 'mushroom_6_amethyst',
        },
        {
          id: 'm6-close-jaeger',
          playerText: 'Ich mache mich auf den Weg. Danke! (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    // === WEG 7: PILZLING GLIMMLING (Torweg, direkt am Tor) ===
    mushroom_7_root: {
      id: 'mushroom_7_root',
      speaker: 'Pilzling Glimmling',
      speakerRole: 'Hüter der Tor-Aura auf Weg 7',
      text: '*Psst...!* Wo willst du hin!',
      options: [
        {
          id: 'm7-diskurs',
          playerText: 'Ein sprechender Pilz? Wirklich?',
          nextNodeId: 'mushroom_7_diskurs',
        },
        {
          id: 'm7-tor',
          playerText: 'Dorthin zurück, woher ich gekommen bin.',
          nextNodeId: 'mushroom_7_tor',
        },
        {
          id: 'm7-gate-new',
          playerText: 'Dieses Tor war vorhin aber noch nicht da',
          nextNodeId: 'mushroom_7_pruefungen',
        },
        {
          id: 'm7-close',
          playerText: 'Jetzt nicht, ich muss nachdenken! (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
    mushroom_7_diskurs: {
      id: 'mushroom_7_diskurs',
      speaker: 'Pilzling Glimmling',
      speakerRole: 'Hüter der Tor-Aura auf Weg 7',
      text: 'Ich seh also aus wie ein Pilz! Das ist ja entzückend',
      options: [
        {
          id: 'm7-diskurs-mirror',
          playerText: 'Schon mal in den Spiegel geschaut? Ja du bist definitiv ein Pilz!',
          nextNodeId: 'mushroom_7_root',
        },
        {
          id: 'm7-diskurs-close',
          playerText: 'Ich werde mir das Tor ansehen. (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
    mushroom_7_tor: {
      id: 'mushroom_7_tor',
      speaker: 'Pilzling Glimmling',
      speakerRole: 'Hüter der Tor-Aura auf Weg 7',
      text: 'Ach, bist du da sicher? Ich glaube es war schon immer da!',
      options: [
        {
          id: 'm7-to-pruef',
          playerText: 'Von mir aus. Aber wie bekomme ich das Teil auf?',
          nextNodeId: 'mushroom_7_pruefungen',
        },
        {
          id: 'm7-close-tor',
          playerText: 'Ich werde mir das Tor ansehen. (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
    mushroom_7_pruefungen: {
      id: 'mushroom_7_pruefungen',
      speaker: 'Pilzling Glimmling',
      speakerRole: 'Hüter der Tor-Aura auf Weg 7',
      text: 'Frag den Typen der an der Hütte rumhängt! Ach ja noch eins, es ist besser ihn nicht zu verärgern. Wenn du verstehst, was ich meine.',
      options: [
        {
          id: 'm7-close-pruef',
          playerText: 'OK, ich rede noch mal mit ihm. (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },
    // Wenn der Pilzdialog abgearbeitet ist: unendlich oft wiederholbarer Idle-Spruch
    mushroom_7_idle: {
      id: 'mushroom_7_idle',
      speaker: 'Pilzling Glimmling',
      speakerRole: 'Hüter der Tor-Aura auf Weg 7',
      text: 'Kümmer dich um deinen Scheiß!',
      repeatable: true,
      options: [
        {
          id: 'm7-idle-close',
          playerText: 'Bin schon weg. (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
      autoAction: { type: 'close' },
      autoAdvanceDelayMs: 2500,
    },
  };
}

function buildDialogueNodes(): Record<string, DialogueNode> {
  const nodes: Record<string, DialogueNode> = {

    // === WALDHÜTER ARVID (an der Schutzhütte) ===
    // 1. Haupt-Einstiegsdialog (Phase 0: Erstkontakt)
    root: {
      id: 'root',
      speaker: GUIDE_NPC_NAME,
      speakerRole: GUIDE_NPC_ROLE,
      text: 'Ach du Scheiße, was willst du denn hier?',
      options: [
        {
          id: 'opt_zinsbachtal',
          playerText: 'Ich will ins Zinsbachtal.',
          nextNodeId: 'arvid_zinsbachtal',
        },
        {
          id: 'opt_bier',
          playerText: 'Ein Bier.',
          nextNodeId: 'arvid_bier',
        },
        {
          id: 'opt_penner',
          playerText: 'Geht dich gar nichts an, Penner!',
          nextNodeId: 'arvid_penner',
        },
      ],
    },

    arvid_zinsbachtal: {
      id: 'arvid_zinsbachtal',
      speaker: GUIDE_NPC_NAME,
      speakerRole: GUIDE_NPC_ROLE,
      text: 'Zinsbachtal, Ja, ich erinnere mich. Da war es schön. Damals.',
      options: [
        {
          id: 'opt_zinsbachtal_katzensprung',
          playerText: 'Wie, damals? Nach meiner Karte ist es nur noch ein Katzensprung.',
          nextNodeId: 'arvid_katzensprung',
        },
        {
          id: 'opt_zinsbachtal_frueher',
          playerText: 'Ja ja, früher war alles besser. Ich weiß.',
          nextNodeId: 'arvid_frueher',
        },
      ],
    },

    arvid_katzensprung: {
      id: 'arvid_katzensprung',
      speaker: GUIDE_NPC_NAME,
      speakerRole: GUIDE_NPC_ROLE,
      text: 'Katzensprung? Na das muss ja ne tolle Katze sein.',
      options: [
        {
          id: 'opt_katzensprung_bye',
          playerText: 'OK, ich geh dann mal lieber weiter. Schönen Tag noch.',
          nextNodeId: 'arvid_bye',
        },
      ],
    },

    arvid_frueher: {
      id: 'arvid_frueher',
      speaker: GUIDE_NPC_NAME,
      speakerRole: GUIDE_NPC_ROLE,
      text: 'Das weißt du also? Mal sehen was du noch so weißt.',
      options: [
        {
          id: 'opt_frueher_bye',
          playerText: 'OK, ich geh dann mal lieber weiter. Schönen Tag noch.',
          nextNodeId: 'arvid_bye',
        },
      ],
    },

    arvid_bier: {
      id: 'arvid_bier',
      speaker: GUIDE_NPC_NAME,
      speakerRole: GUIDE_NPC_ROLE,
      text: 'Macht ein Euro!',
      options: [
        {
          id: 'opt_bier_schnaeppchen',
          playerText: 'Ein Schnäppchen, her damit!',
          nextNodeId: 'arvid_bier_leer',
        },
        {
          id: 'opt_bier_sorte',
          playerText: 'Was gibts denn für ne Sorte?',
          nextNodeId: 'arvid_bier_leer',
        },
      ],
    },

    arvid_bier_leer: {
      id: 'arvid_bier_leer',
      speaker: GUIDE_NPC_NAME,
      speakerRole: GUIDE_NPC_ROLE,
      text: 'Sorry ist keins mehr da. Hab gerade das letzte leer gemacht.',
      options: [
        {
          id: 'opt_bier_ausgeben',
          playerText: 'Ich habe noch zwei Flaschen im Rucksack. Ich gebe eine aus.',
          nextNodeId: 'arvid_bier_ausgeben',
        },
      ],
    },

    arvid_bier_ausgeben: {
      id: 'arvid_bier_ausgeben',
      speaker: GUIDE_NPC_NAME,
      speakerRole: GUIDE_NPC_ROLE,
      text: 'Danke, sehr nett. Aber nein. Behalte sie lieber, du wirst sie brauchen. Glaubs mir.',
      options: [
        {
          id: 'opt_ausgeben_bye',
          playerText: 'OK, ich geh dann mal lieber weiter. Schönen Tag noch.',
          nextNodeId: 'arvid_bye',
        },
      ],
    },

    arvid_penner: {
      id: 'arvid_penner',
      speaker: GUIDE_NPC_NAME,
      speakerRole: GUIDE_NPC_ROLE,
      text: 'Ein Satz heiße Ohren gefällig?',
      options: [
        {
          id: 'opt_penner_bier',
          playerText: 'War nicht so gemeint. Hast du ein Bier über?',
          nextNodeId: 'arvid_bier_leer',
        },
        {
          id: 'opt_penner_gammelfleisch',
          playerText: 'Große Worte für ein Stück Gammelfleisch.',
          nextNodeId: 'arvid_gammelfleisch',
        },
      ],
    },

    arvid_gammelfleisch: {
      id: 'arvid_gammelfleisch',
      speaker: GUIDE_NPC_NAME,
      speakerRole: GUIDE_NPC_ROLE,
      text: 'Tja so wird das hier nichts. Du reitest dich gerade tief in die Scheiße Kleiner.',
      options: [
        {
          id: 'opt_gammelfleisch_wieder',
          playerText: 'Wäre nicht das erste mal.',
          nextNodeId: 'arvid_weiterbringt',
        },
      ],
    },

    arvid_weiterbringt: {
      id: 'arvid_weiterbringt',
      speaker: GUIDE_NPC_NAME,
      speakerRole: GUIDE_NPC_ROLE,
      text: 'Wenn du glaubst, dass dich das weiterbringt. Dann nur zu.',
      options: [
        {
          id: 'opt_weiterbringt_bye',
          playerText: 'OK, ich geh dann mal lieber weiter. Schönen Tag noch.',
          nextNodeId: 'arvid_bye',
        },
      ],
    },

    arvid_bye: {
      id: 'arvid_bye',
      speaker: GUIDE_NPC_NAME,
      speakerRole: GUIDE_NPC_ROLE,
      text: 'Wie du meinst. Viel Glück.',
      options: [],
      autoAction: { type: 'close' },
      autoAdvanceDelayMs: 2200,
    },

    // 2. Event-Dialog: Nach Öffnen der Schatztruhe vor der Schutzhütte
    arvid_after_chest: {
      id: 'arvid_after_chest',
      speaker: GUIDE_NPC_NAME,
      speakerRole: GUIDE_NPC_ROLE,
      text: 'Sieh an, du hast die alte Truhe aufbekommen. Dann hast du jetzt das Licht.',
      options: [
        {
          id: 'opt_chest_usage',
          playerText: 'Was fange ich mit dem Licht an?',
          nextNodeId: 'arvid_chest_usage',
        },
        {
          id: 'opt_chest_mine',
          playerText: 'Gehörte der Kristall dir?',
          nextNodeId: 'arvid_chest_mine',
        },
      ],
    },

    arvid_chest_usage: {
      id: 'arvid_chest_usage',
      speaker: GUIDE_NPC_NAME,
      speakerRole: GUIDE_NPC_ROLE,
      text: 'Es leuchtet dir den Weg durch den tiefen Silberstollen im Norden. Aber pass auf das Graumännchen auf.',
      options: [
        {
          id: 'opt_chest_usage_close',
          playerText: 'Verstanden, danke.',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    arvid_chest_mine: {
      id: 'arvid_chest_mine',
      speaker: GUIDE_NPC_NAME,
      speakerRole: GUIDE_NPC_ROLE,
      text: 'Nein, das hat der alte Hüter vor mir dagelassen. Nimm es mit – auf den finsteren Pfaden wirst du es brauchen.',
      options: [
        {
          id: 'opt_chest_mine_close',
          playerText: 'Danke für den Hinweis.',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    // 3. Event-Dialog: Nach Besuch des Riesen am Wehr auf Weg 3
    arvid_after_giant: {
      id: 'arvid_after_giant',
      speaker: GUIDE_NPC_NAME,
      speakerRole: GUIDE_NPC_ROLE,
      text: 'Du warst drüben am Wehr, stimmt\'s? Der alte Dickschädel hockt immer noch da.',
      options: [
        {
          id: 'opt_giant_wehr',
          playerText: 'Er will das Wehr für das dürre Tal nicht öffnen.',
          nextNodeId: 'arvid_giant_wehr',
        },
        {
          id: 'opt_giant_imposant',
          playerText: 'Ein imposanter Kerl.',
          nextNodeId: 'arvid_giant_imposant',
        },
      ],
    },

    arvid_giant_wehr: {
      id: 'arvid_giant_wehr',
      speaker: GUIDE_NPC_NAME,
      speakerRole: GUIDE_NPC_ROLE,
      text: 'Verständlich. Wenn er die Schleusen öffnet, wird seine Quelle fortgespült. Keine leichte Wahl.',
      options: [
        {
          id: 'opt_giant_wehr_close',
          playerText: 'Ich denke darüber nach.',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    arvid_giant_imposant: {
      id: 'arvid_giant_imposant',
      speaker: GUIDE_NPC_NAME,
      speakerRole: GUIDE_NPC_ROLE,
      text: 'Und stur wie die Felsen des Schwarzwaldes. Lass dich von ihm nicht einschüchtern.',
      options: [
        {
          id: 'opt_giant_imposant_close',
          playerText: 'Mach ich nicht.',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    // 4. Standard / Idle-Dialog: Wiederholtes Ansprechen ohne aktives Event (unendlich oft wiederholbar)
    arvid_idle: {
      id: 'arvid_idle',
      speaker: GUIDE_NPC_NAME,
      speakerRole: GUIDE_NPC_ROLE,
      text: 'Was lungerst du hier noch rum? Geh die Pfade erkunden!',
      repeatable: true,
      options: [
        {
          id: 'opt_idle_tipp',
          playerText: 'Welchen Weg empfiehlst du mir?',
          nextNodeId: 'arvid_idle_tipp',
        },
        {
          id: 'opt_idle_bye',
          playerText: 'Ich gehe ja schon.',
          nextNodeId: 'arvid_idle_bye',
        },
      ],
    },

    arvid_idle_tipp: {
      id: 'arvid_idle_tipp',
      speaker: GUIDE_NPC_NAME,
      speakerRole: GUIDE_NPC_ROLE,
      text: 'Schau in dein Tagebuch. Ich bin nicht deine Sekretärin.',
      repeatable: true,
      options: [
        {
          id: 'opt_idle_tipp_close',
          playerText: 'Ich sehe mich um.',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    arvid_idle_bye: {
      id: 'arvid_idle_bye',
      speaker: GUIDE_NPC_NAME,
      speakerRole: GUIDE_NPC_ROLE,
      text: 'Na also. Bewegung schadet dir nicht.',
      repeatable: true,
      options: [],
      autoAction: { type: 'close' },
      autoAdvanceDelayMs: 2000,
    },

    // === FABELWESEN LUPO (auf Weg 7) ===
    creature_root: {
      id: 'creature_root',
      speaker: CREATURE_NPC_NAME,
      speakerRole: CREATURE_NPC_ROLE,
      text: 'Oh je. Er wird dich fressen!',
      options: [
        {
          id: 'creature-opt-1',
          playerText: 'Wer?',
          nextNodeId: 'creature_node_1',
        },
        {
          id: 'creature-opt-2',
          playerText: 'Wer bist du denn?',
          nextNodeId: 'creature_node_2',
        },
      ],
    },

    creature_node_1: {
      id: 'creature_node_1',
      speaker: CREATURE_NPC_NAME,
      speakerRole: CREATURE_NPC_ROLE,
      text: 'Na ER!',
      options: [
        {
          id: 'creature-opt-1-1',
          playerText: 'Kenn ich nicht',
          nextNodeId: 'creature_node_1_1',
        },
        {
          id: 'creature-opt-1-2',
          playerText: 'Gehts genauer?',
          nextNodeId: 'creature_node_1_2',
        },
      ],
    },

    creature_node_2: {
      id: 'creature_node_2',
      speaker: CREATURE_NPC_NAME,
      speakerRole: CREATURE_NPC_ROLE,
      text: 'Lupo.',
      options: [
        {
          id: 'creature-opt-2-1',
          playerText: 'Ich meine, was bist du?',
          nextNodeId: 'creature_node_2_1',
        },
        {
          id: 'creature-opt-2-2',
          playerText: 'Wie der VW?',
          nextNodeId: 'creature_node_2_2',
        },
      ],
    },

    creature_node_1_1: {
      id: 'creature_node_1_1',
      speaker: CREATURE_NPC_NAME,
      speakerRole: CREATURE_NPC_ROLE,
      text: 'Das ist ein Problem.',
      options: [],
      autoNextNodeId: 'creature_final',
      autoAdvanceDelayMs: 2000,
    },

    creature_node_1_2: {
      id: 'creature_node_1_2',
      speaker: CREATURE_NPC_NAME,
      speakerRole: CREATURE_NPC_ROLE,
      text: 'Lieber nicht.',
      options: [],
      autoNextNodeId: 'creature_final',
      autoAdvanceDelayMs: 2000,
    },

    creature_node_2_1: {
      id: 'creature_node_2_1',
      speaker: CREATURE_NPC_NAME,
      speakerRole: CREATURE_NPC_ROLE,
      text: 'Deine Mutter du Nullchecker.',
      options: [],
      autoNextNodeId: 'creature_final',
      autoAdvanceDelayMs: 2000,
    },

    creature_node_2_2: {
      id: 'creature_node_2_2',
      speaker: CREATURE_NPC_NAME,
      speakerRole: CREATURE_NPC_ROLE,
      text: 'Ja, du mich auch du Komiker.',
      options: [],
      autoNextNodeId: 'creature_final',
      autoAdvanceDelayMs: 2000,
    },

    creature_final: {
      id: 'creature_final',
      speaker: CREATURE_NPC_NAME,
      speakerRole: CREATURE_NPC_ROLE,
      text: 'Viel Spaß noch hier, du Opfer!',
      options: [],
      autoAction: { type: 'creature_flee' },
      autoAdvanceDelayMs: 2400,
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

    // === DIE NIXE VOM SPIEGELTEICH (auf dem Stein im Teich am Ende von Weg 2) ===
    nixie_root: {
      id: 'nixie_root',
      speaker: NIXIE_NPC_NAME,
      speakerRole: NIXIE_NPC_ROLE,
      text: 'Tritt näher ans Ufer, Wandernde… Siehst du das goldene Schimmern hier unten im klaren Wasser neben meinem Stein? Ein verlockender Schatz ruht auf dem Grund dieses Teichs – doch wisse: Wer nach ihm greift, weckt einen alten Fluch und ruft drohendes Unglück herbei.',
      options: [
        {
          id: 'nixie-ask-treasure',
          playerText: 'Was für ein verlockender Schatz liegt dort unten im Teich?',
          nextNodeId: 'nixie_treasure',
        },
        {
          id: 'nixie-ask-curse',
          playerText: 'Welcher Fluch und welches Unglück sind mit dem Schatz verbunden?',
          nextNodeId: 'nixie_curse',
        },
        {
          id: 'nixie-ask-choice',
          playerText: 'Kann man das drohende Unglück abwenden, oder darf niemand den Schatz berühren?',
          nextNodeId: 'nixie_temptation',
        },
        {
          id: 'nixie-bye',
          playerText: 'Ich trete lieber einen Schritt vom Ufer zurück. (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    nixie_treasure: {
      id: 'nixie_treasure',
      speaker: NIXIE_NPC_NAME,
      speakerRole: NIXIE_NPC_ROLE,
      text: 'Es ist ein uralter Hort aus lauterem Wassergold, geschmiedet zu einer Krone und einem Kelch, die jedem, der sie anblickt, Reichtum und Glanz ohne Mühe versprechen. Schon viele Wandernde sahen ihr Spiegelbild im Gold und vergaßen darüber alles, was ihnen lieb war.',
      options: [
        {
          id: 'to-nixie-curse',
          playerText: 'Erzähl mir mehr über den Fluch, der auf diesem Gold liegt.',
          nextNodeId: 'nixie_curse',
        },
        {
          id: 'to-nixie-temptation',
          playerText: 'Wie soll ich mich gegenüber einer solchen Versuchung verhalten?',
          nextNodeId: 'nixie_temptation',
        },
        {
          id: 'back-nixie-root',
          playerText: 'Zurück zum Anfang unseres Gesprächs.',
          nextNodeId: 'nixie_root',
        },
      ],
    },

    nixie_curse: {
      id: 'nixie_curse',
      speaker: NIXIE_NPC_NAME,
      speakerRole: NIXIE_NPC_ROLE,
      text: 'Der Schatz wurde einst in blindem Neid geraubt und im Teich versenkt. Seitdem haftet ihm ein schwerer Fluch an: Wer das Gold aus Eigennutz aus den Fluten hebt, dem verwandelt sich jeder Gewinn in bitteres Unglück – die Quellen im Wald versiegen, und Zwietracht legt sich über das ganze Land.',
      options: [
        {
          id: 'curse-to-temptation',
          playerText: 'Gibt es einen Weg, mit dem Schatz und dem Fluch weise umzugehen?',
          nextNodeId: 'nixie_temptation',
        },
        {
          id: 'curse-to-root',
          playerText: 'Zurück zur Übersicht.',
          nextNodeId: 'nixie_root',
        },
      ],
    },

    nixie_temptation: {
      id: 'nixie_temptation',
      speaker: NIXIE_NPC_NAME,
      speakerRole: NIXIE_NPC_ROLE,
      text: 'Das Wasser prüft das Herz jedes Einzelnen, der an dieses Ufer tritt. Das Gold funkelt zum Greifen nah vor dir im Teich. Wie entscheidest du dich angesichts des verlockenden Schatzes und des drohenden Unglücks?',
      options: [
        {
          id: 'nixie-choice-renounce',
          playerText: 'Ich widerstehe der Verlockung – kein Reichtum ist es wert, Unglück über das Land zu bringen.',
          nextNodeId: 'nixie_resolution_renounce',
        },
        {
          id: 'nixie-choice-cleanse',
          playerText: 'Ich lasse den Schatz im Teich ruhen, damit das Wasser den Fluch für immer einschließt und hütet.',
          nextNodeId: 'nixie_resolution_cleanse',
        },
        {
          id: 'nixie-choice-take',
          playerText: 'Die Verlockung ist zu groß – ich wage es trotzdem, nach dem Gold im Wasser zu greifen.',
          nextNodeId: 'nixie_resolution_take',
        },
      ],
    },

    nixie_resolution_renounce: {
      id: 'nixie_resolution_renounce',
      speaker: NIXIE_NPC_NAME,
      speakerRole: NIXIE_NPC_ROLE,
      text: 'Du hast ein klares Auge und ein freies Herz! Wer den schönen Schein durchschaut und dem verlockenden Gold entsagt, über den hat der Fluch keine Macht. Nimm meinen Segen des klaren Wassers mit auf deinen weiteren Weg.',
      options: [
        {
          id: 'back-nixie-root',
          playerText: 'Ich möchte dich noch etwas anderes fragen.',
          nextNodeId: 'nixie_root',
        },
        {
          id: 'close-nixie',
          playerText: 'Leb wohl, Nixe vom Spiegelteich! (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    nixie_resolution_cleanse: {
      id: 'nixie_resolution_cleanse',
      speaker: NIXIE_NPC_NAME,
      speakerRole: NIXIE_NPC_ROLE,
      text: 'Weise gesprochen! Solange der Schatz unangetastet auf dem Grund des Teichs unter meiner Wacht verbleibt, schläft das drohende Unglück unter den Wellen und der Spiegelteich bleibt eine friedliche Quelle für den ganzen Wald.',
      options: [
        {
          id: 'back-nixie-root',
          playerText: 'Zurück zum Anfang unseres Gesprächs.',
          nextNodeId: 'nixie_root',
        },
        {
          id: 'close-nixie',
          playerText: 'Hab Dank für deine Warnung! (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    nixie_resolution_take: {
      id: 'nixie_resolution_take',
      speaker: NIXIE_NPC_NAME,
      speakerRole: NIXIE_NPC_ROLE,
      text: 'Halt ein! Kaum berühren deine Finger die kalte Wasseroberfläche, zieht ein dunkler Schatten über den Teich und die Wellen schlagen eisig gegen meinen Stein. Spürst du die Kälte des Fluchs? Zieh deine Hand zurück, solange das Unglück noch schläft!',
      options: [
        {
          id: 'reconsider-nixie',
          playerText: 'Ich ziehe meine Hand rasch zurück und überdenke meine Wahl!',
          nextNodeId: 'nixie_temptation',
        },
        {
          id: 'close-nixie',
          playerText: 'Ich trete vom Wasser zurück. (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    // === DER RIESE AM WEHR (hinter der Wehrbrücke am kleinen Stausee auf Weg 3) ===
    giant_root: {
      id: 'giant_root',
      speaker: GIANT_NPC_NAME,
      speakerRole: GIANT_NPC_ROLE,
      text: 'Halt vor dem Wehr, kleines Menschenkind! Du stehst auf meiner Brücke über dem Quellbach. Siehst du das geschlossene Wehr und den kleinen Stausee dahinter? Eine Bergquelle versorgt von hier aus eigentlich das Tal. Ihre Freigabe könnte unten im Tal eine schwere Dürre lindern – doch wenn das Wehr geöffnet wird, zerstört das meine Heimat!',
      options: [
        {
          id: 'giant-ask-drought',
          playerText: 'Wie steht es um die Quelle und die Dürre unten im Tal?',
          nextNodeId: 'giant_source_drought',
        },
        {
          id: 'giant-ask-home',
          playerText: 'Warum würde die Freigabe der Quelle deine Heimat zerstören?',
          nextNodeId: 'giant_homeland',
        },
        {
          id: 'giant-ask-choice',
          playerText: 'Was soll mit dem geschlossenen Wehr geschehen – das Tal retten oder deine Heimat schützen?',
          nextNodeId: 'giant_dilemma',
        },
        {
          id: 'giant-bye',
          playerText: 'Ich blicke noch einen Moment auf das gestaute Wasser. (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    giant_source_drought: {
      id: 'giant_source_drought',
      speaker: GIANT_NPC_NAME,
      speakerRole: GIANT_NPC_ROLE,
      text: 'Unter dieser Brücke floss einst ein breiter Bach ins Tal hinab. Seit Wochen hat es im Unterland keinen Tropfen geregnet: Die Felder verdorren, die Brunnen sind leer, und nur das klare Wasser aus meiner Bergquelle hier im Stausee könnte die Dürre im Tal noch lindern.',
      options: [
        {
          id: 'to-giant-home',
          playerText: 'Und warum hältst du das Wehr an der Brücke dennoch geschlossen?',
          nextNodeId: 'giant_homeland',
        },
        {
          id: 'to-giant-dilemma',
          playerText: 'Lass uns nach einer Entscheidung für das Wehr suchen.',
          nextNodeId: 'giant_dilemma',
        },
        {
          id: 'back-giant-root',
          playerText: 'Zurück zum Anfang unseres Gesprächs.',
          nextNodeId: 'giant_root',
        },
      ],
    },

    giant_homeland: {
      id: 'giant_homeland',
      speaker: GIANT_NPC_NAME,
      speakerRole: GIANT_NPC_ROLE,
      text: 'Dieser kleine Stausee und die Uferhöhlen unter den alten Baumwurzeln sind seit Jahrhunderten meine einzige Heimat! Das gestaute Wasser trägt das Wurzelwerk und schützt mein Felslager. Reißt man das Wehr auf, bricht das Ufer ein, die Flutwelle reißt mein Heim unter der Brücke fort und lässt nur nackten Schlamm zurück.',
      options: [
        {
          id: 'home-to-dilemma',
          playerText: 'Wie können wir zwischen der Dürre im Tal und deiner Heimat entscheiden?',
          nextNodeId: 'giant_dilemma',
        },
        {
          id: 'home-to-root',
          playerText: 'Zurück zur Übersicht.',
          nextNodeId: 'giant_root',
        },
      ],
    },

    giant_dilemma: {
      id: 'giant_dilemma',
      speaker: GIANT_NPC_NAME,
      speakerRole: GIANT_NPC_ROLE,
      text: 'Meine Hand ruht schwer auf dem eisernen Stellrad des Wehrs. Öffne ich es, lebt das Tal auf und meine Heimat vergeht. Halte ich es verschlossen, bleibt mein Heim bestehen, während das Tal verdorrt. Welchen Rat gibst du mir, Wandernde?',
      options: [
        {
          id: 'giant-choice-compromise',
          playerText: 'Heb das Wehr nur einen gemessenen Spalt weit an und stütze dein Ufer mit Felsblöcken – so fließt genug Wasser gegen die Dürre, ohne dass der Stausee einbricht.',
          nextNodeId: 'giant_resolution_compromise',
        },
        {
          id: 'giant-choice-open',
          playerText: 'Das Leben eines ganzen Tals wiegt schwerer – gib die Quelle vollständig frei, um die Dürre zu beenden.',
          nextNodeId: 'giant_resolution_open',
        },
        {
          id: 'giant-choice-closed',
          playerText: 'Niemand darf gezwungen werden, seine eigene Heimat zu zerstören – lass das Wehr geschlossen.',
          nextNodeId: 'giant_resolution_closed',
        },
      ],
    },

    giant_resolution_compromise: {
      id: 'giant_resolution_compromise',
      speaker: GIANT_NPC_NAME,
      speakerRole: GIANT_NPC_ROLE,
      text: 'Bei den alten Felsen… daran hat mein schwerer Sinn noch nicht gedacht! Mit meiner Riesenkraft kann ich neue Steindämme vor meine Uferhöhle setzen und das Wehr Raste um Raste öffnen. So strömt der Bach wieder unter der Brücke ins dürre Tal, und mein kleiner Stausee bleibt dennoch erhalten!',
      options: [
        {
          id: 'back-giant-root',
          playerText: 'Ich möchte dich noch etwas anderes zum Wehr fragen.',
          nextNodeId: 'giant_root',
        },
        {
          id: 'close-giant',
          playerText: 'Möge das Wasser Tal und Heimat gleichermaßen bewahren! (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    giant_resolution_open: {
      id: 'giant_resolution_open',
      speaker: GIANT_NPC_NAME,
      speakerRole: GIANT_NPC_ROLE,
      text: 'Ein schmerzhafter, aber selbstloser Rat. Wenn das Tal gerettet wird, will ich den Verlust meiner alten Wohnstätte am Stausee tragen und mir höher oben im Gebirge eine neue Zuflucht suchen.',
      options: [
        {
          id: 'back-giant-root',
          playerText: 'Lass uns die anderen Möglichkeiten noch einmal bedenken.',
          nextNodeId: 'giant_dilemma',
        },
        {
          id: 'close-giant',
          playerText: 'Hab Dank für deine Größe, Hüter des Wehrs! (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    giant_resolution_closed: {
      id: 'giant_resolution_closed',
      speaker: GIANT_NPC_NAME,
      speakerRole: GIANT_NPC_ROLE,
      text: 'Du sprichst aus Mitgefühl für meine Heimat. Doch solange das Wehr ganz geschlossen bleibt, lässt mir das Stöhnen des ausgetrockneten Tals unter der Brücke keine Ruhe.',
      options: [
        {
          id: 'back-giant-dilemma',
          playerText: 'Vielleicht gibt es doch einen Weg, dem Tal zu helfen.',
          nextNodeId: 'giant_dilemma',
        },
        {
          id: 'close-giant',
          playerText: 'Ich lasse dich über das Wehr wachen. (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    // === DAS HOLZWEIBCHEN (im Holzfällerlager auf der Waldlichtung am Ende von Weg 4) ===
    wood_woman_root: {
      id: 'wood_woman_root',
      speaker: WOOD_WOMAN_NPC_NAME,
      speakerRole: WOOD_WOMAN_NPC_ROLE,
      text: 'Sei gegrüßt auf dieser geschlagenen Lichtung, Wandernde… Siehst du die vielen frischen Baumstümpfe und die hohen Scheitstapel hier im Holzfällerlager? Das Brennholz rettet die Dorfbewohner unten im Tal vor der bitteren Kälte – doch zu starke Fällungen gefährden den Wald und seine gesamte Umgebung!',
      options: [
        {
          id: 'wood-ask-cold',
          playerText: 'Warum brauchen die Dorfbewohner so dringend so viel Brennholz?',
          nextNodeId: 'wood_woman_village_cold',
        },
        {
          id: 'wood-ask-forest',
          playerText: 'Wie gefährden die starken Fällungen den Wald und seine Umgebung?',
          nextNodeId: 'wood_woman_forest_danger',
        },
        {
          id: 'wood-ask-choice',
          playerText: 'Wie können wir die Dorfbewohner vor der Kälte schützen, ohne den Wald zu zerstören?',
          nextNodeId: 'wood_woman_dilemma',
        },
        {
          id: 'wood-bye',
          playerText: 'Ich sehe mich noch im Holzfällerlager um. (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    wood_woman_village_cold: {
      id: 'wood_woman_village_cold',
      speaker: WOOD_WOMAN_NPC_NAME,
      speakerRole: WOOD_WOMAN_NPC_ROLE,
      text: 'Ein früher, schneidender Frost zieht aus den Bergen herab. In den Hütten des Dorfes frieren die Alten und die Kinder, und die Vorräte vom Vorjahr sind fast verbrannt. Darum rückten die Holzfäller mit Axt und Schrotsäge aus: Jedes Klafter Brennholz hier auf der Lichtung bedeutet Wärme und Überleben für die Familien im Dorf.',
      options: [
        {
          id: 'to-wood-forest',
          playerText: 'Und welchen Schaden richten die fortgesetzten Fällungen hier im Wald an?',
          nextNodeId: 'wood_woman_forest_danger',
        },
        {
          id: 'to-wood-dilemma',
          playerText: 'Lass uns überlegen, wie viel Holz geschlagen werden darf.',
          nextNodeId: 'wood_woman_dilemma',
        },
        {
          id: 'back-wood-root',
          playerText: 'Zurück zum Anfang unseres Gesprächs.',
          nextNodeId: 'wood_woman_root',
        },
      ],
    },

    wood_woman_forest_danger: {
      id: 'wood_woman_forest_danger',
      speaker: WOOD_WOMAN_NPC_NAME,
      speakerRole: WOOD_WOMAN_NPC_ROLE,
      text: 'Schau auf die kahlen Stümpfe ringsum! Wenn die alten Schirmbäume alle auf einmal fallen, verliert der Waldboden seinen Halt: Bei Schneeschmelze und Regen rutscht die Erde ins Tal, der eisige Sturm fegt ungebremst durch die Schneisen, die Tiere verlieren ihren Schutz und die Lebensgeister der Bäume schwinden.',
      options: [
        {
          id: 'forest-to-dilemma',
          playerText: 'Welchen Ausweg gibt es zwischen der Kälte im Dorf und dem Schutz des Waldes?',
          nextNodeId: 'wood_woman_dilemma',
        },
        {
          id: 'forest-to-root',
          playerText: 'Zurück zur Übersicht.',
          nextNodeId: 'wood_woman_root',
        },
      ],
    },

    wood_woman_dilemma: {
      id: 'wood_woman_dilemma',
      speaker: WOOD_WOMAN_NPC_NAME,
      speakerRole: WOOD_WOMAN_NPC_ROLE,
      text: 'Die Holzfäller warten auf ein Zeichen, wie es auf dieser Lichtung weitergehen soll. Schlagen sie weiter wie bisher, übersteht das Dorf den Winter warm, aber der Wald und die Hänge ringsum nehmen schweren Schaden. Welchen Rat gibst du hier im Holzfällerlager?',
      options: [
        {
          id: 'wood-choice-balance',
          playerText: 'Nur Bruch- und Dürrholz sowie einzelne Stämme mit Maß entnehmen, die Baumstümpfe segnen und im Frühjahr für jeden Stamm junge Bäume nachpflanzen.',
          nextNodeId: 'wood_woman_resolution_balance',
        },
        {
          id: 'wood-choice-village',
          playerText: 'Das Leben der frierenden Dorfbewohner geht vor – es muss so viel Brennholz geschlagen werden, bis alle Öfen versorgt sind.',
          nextNodeId: 'wood_woman_resolution_village',
        },
        {
          id: 'wood-choice-forest',
          playerText: 'Die Fällungen müssen sofort gestoppt werden – kein weiterer Baum darf mehr der Axt zum Opfer fallen.',
          nextNodeId: 'wood_woman_resolution_forest',
        },
      ],
    },

    wood_woman_resolution_balance: {
      id: 'wood_woman_resolution_balance',
      speaker: WOOD_WOMAN_NPC_NAME,
      speakerRole: WOOD_WOMAN_NPC_ROLE,
      text: 'Hab tausend Dank, du verständige Seele! Wer dem Wald nur nimmt, was er verkraftet, und ihm neues Leben zurückgibt, dem hilft auch das Holzweibchen: Ich lege meinen Moossegen auf die bereits gestapelten Scheite – sie werden im Dorf doppelt so lange glühen und wärmen, ohne dass der Hochwald kahlgeschlagen wird!',
      options: [
        {
          id: 'back-wood-root',
          playerText: 'Ich möchte dich noch etwas anderes zum Holzfällerlager fragen.',
          nextNodeId: 'wood_woman_root',
        },
        {
          id: 'close-wood',
          playerText: 'Mögen Dorf und Wald gemeinsam durch den Winter kommen! (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    wood_woman_resolution_village: {
      id: 'wood_woman_resolution_village',
      speaker: WOOD_WOMAN_NPC_NAME,
      speakerRole: WOOD_WOMAN_NPC_ROLE,
      text: 'Dein Herz schlägt für die frierenden Menschen im Tal. In diesem Winter wird niemand im Dorf unter der Kälte leiden – doch wenn der Frühling kommt, werden die kahlen Hänge und der verletzte Wald uns alle mahnen, wie teuer diese Wärme erkauft wurde.',
      options: [
        {
          id: 'back-wood-dilemma',
          playerText: 'Lass mich die anderen Möglichkeiten noch einmal abwägen.',
          nextNodeId: 'wood_woman_dilemma',
        },
        {
          id: 'close-wood',
          playerText: 'Leb wohl, Holzweibchen! (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    wood_woman_resolution_forest: {
      id: 'wood_woman_resolution_forest',
      speaker: WOOD_WOMAN_NPC_NAME,
      speakerRole: WOOD_WOMAN_NPC_ROLE,
      text: 'Die Bäume und die Tiere des Waldes atmen auf, wenn Axt und Säge schweigen. Doch vergiss nicht die Hütten unten im Tal – ganz ohne Brennholz wird die Kälte dort zur bitteren Prüfung werden.',
      options: [
        {
          id: 'back-wood-dilemma',
          playerText: 'Vielleicht finden wir doch einen Ausgleich für Dorf und Wald.',
          nextNodeId: 'wood_woman_dilemma',
        },
        {
          id: 'close-wood',
          playerText: 'Behüte den Wald gut, Holzweibchen! (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    // === DER TEUFEL (inmitten des Höllenschlundes am Ende von Weg 5) ===
    devil_root: {
      id: 'devil_root',
      speaker: DEVIL_NPC_NAME,
      speakerRole: DEVIL_NPC_ROLE,
      text: 'Sieh an... Eine sterbliche Seele wagt sich bis an den Rand meines Höllenschlundes. Das Feuer brennt hier seit Anbeginn der Zeiten – und ich beobachte jeden Schritt auf den sieben Wegen.',
      options: [
        {
          id: 'devil-ask-chasm',
          playerText: 'Was ist das für ein Ort und warum brennt hier alles?',
          nextNodeId: 'devil_about_chasm',
        },
        {
          id: 'devil-ask-identity',
          playerText: 'Bist du wahrhaftig der Teufel?',
          nextNodeId: 'devil_about_identity',
        },
        {
          id: 'devil-bye',
          playerText: 'Ich sehe mich erst einmal weiter um. (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    devil_about_chasm: {
      id: 'devil_about_chasm',
      speaker: DEVIL_NPC_NAME,
      speakerRole: DEVIL_NPC_ROLE,
      text: 'Dies ist der Schlund der Glut und der ewigen Prüfungen. Viele suchen Macht, viele fürchten das Feuer. Noch ist deine Stunde nicht gekommen, Wanderer – doch merke dir diesen Ort gut.',
      options: [
        {
          id: 'devil-to-identity',
          playerText: 'Wer bist du genau?',
          nextNodeId: 'devil_about_identity',
        },
        {
          id: 'devil-close-chasm',
          playerText: 'Ich trete vorsichtig vom Kraterrand zurück. (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    devil_about_identity: {
      id: 'devil_about_identity',
      speaker: DEVIL_NPC_NAME,
      speakerRole: DEVIL_NPC_ROLE,
      text: 'Man nennt mich den Versucher, den Fürsten der Glut, den Teufel. Noch trage ich dir keinen Handel an... doch wenn deine Reise voranschreitet, werden sich unsere Pfade erneut kreuzen.',
      options: [
        {
          id: 'devil-to-chasm',
          playerText: 'Erzähl mir mehr über diesen flammenden Abgrund.',
          nextNodeId: 'devil_about_chasm',
        },
        {
          id: 'devil-close-identity',
          playerText: 'Ich werde wachsam bleiben. (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    // === DER WILDE JÄGER (an der Jagdhütte am Ende von Weg 6) ===
    hunter_root: {
      id: 'hunter_root',
      speaker: WILD_HUNTER_NPC_NAME,
      speakerRole: WILD_HUNTER_NPC_ROLE,
      text: 'Halt, Wanderer! Tritt nicht zwischen uns! Ich habe dieses Holzweibchen quer durch den Forst bis hierher an meine Jagdhütte verfolgt. Sie hat sich nachts in meinen umzäunten Kräutergarten geschlichen und die seltenen Heilsalben-Kräuter gestohlen! Ein Diebstahl bleibt ein Vergehen gegen die Ordnung des Waldes!',
      options: [
        {
          id: 'hunter-ask-theft',
          playerText: 'Welche Kräuter wirfst du dem Holzweibchen vor, gestohlen zu haben?',
          nextNodeId: 'hunter_herbs',
        },
        {
          id: 'hunter-ask-demand',
          playerText: 'Was forderst du nun von ihr als Sühne?',
          nextNodeId: 'hunter_demand',
        },
        {
          id: 'hunter-switch-wood-woman',
          playerText: 'Ich möchte hören, was das Holzweibchen zu ihrer Verteidigung sagt.',
          nextNodeId: 'wood_lodge_root',
        },
        {
          id: 'hunter-bye',
          playerText: 'Klärt euren Streit mit Bedacht. (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    hunter_herbs: {
      id: 'hunter_herbs',
      speaker: WILD_HUNTER_NPC_NAME,
      speakerRole: WILD_HUNTER_NPC_ROLE,
      text: 'Es handelt sich um die seltene Mondwurz und den Königs-Salbei! Ich hege diesen Kräutergarten seit vielen Wintern mit eigenen Händen. Aus den Blättern bereite ich Wundsalben für mein Jagdgespann und die Dorfleute. Wenn jeder nimmt, was ihm beliebt, bricht die Jagdordnung zusammen!',
      options: [
        {
          id: 'hunter-to-demand',
          playerText: 'Was verlangst du jetzt von ihr?',
          nextNodeId: 'hunter_demand',
        },
        {
          id: 'hunter-to-wood-view',
          playerText: 'Lass mich die Gegenseite anhören.',
          nextNodeId: 'wood_lodge_root',
        },
        {
          id: 'hunter-close-herbs',
          playerText: 'Ich verstehe deinen Zorn. (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    hunter_demand: {
      id: 'hunter_demand',
      speaker: WILD_HUNTER_NPC_NAME,
      speakerRole: WILD_HUNTER_NPC_ROLE,
      text: 'Sie soll die restlichen Wurzeln sofort zurücklegen und geloben, diesen Zaun nie wieder heimlich zu überwinden! Ein Jäger achtet das Wild – aber er duldet keinen Raub in seinem eigenen Revier!',
      options: [
        {
          id: 'hunter-to-wood-plea',
          playerText: 'Ich rede mit dem Holzweibchen darüber.',
          nextNodeId: 'wood_lodge_root',
        },
        {
          id: 'hunter-close-demand',
          playerText: 'Ich denke über deine Worte nach. (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    // === DAS HOLZWEIBCHEN AN DER JAGDHÜTTE ===
    wood_lodge_root: {
      id: 'wood_lodge_root',
      speaker: WOOD_WOMAN_NPC_NAME,
      speakerRole: 'Verteidigerin des Waldes an der Jagdhütte',
      text: 'Glaube dem stolzen Jäger kein bitteres Wort! Ja, ich pflückte von der Mondwurz aus seinem Garten – doch drüben im Brombeerdickicht lag eine junge Hirschkuh mit tief gerissener Flanke im Wundfieber! Ohne den Wurzelsaft wäre sie vor Morgengrauen verendet. Er sperrt Heilung hinter Zäunen ein, während der Wald leidet! Darf ein Zaun mehr wert sein als das lebendige Herz eines Geschöpfs?',
      options: [
        {
          id: 'wood-ask-life',
          playerText: 'Konntest du das Tier mit den Kräutern retten?',
          nextNodeId: 'wood_lodge_life',
        },
        {
          id: 'wood-ask-hunter-law',
          playerText: 'Verstehst du denn auch die Sorge des Jägers um seinen gehegten Garten?',
          nextNodeId: 'wood_lodge_hunter_view',
        },
        {
          id: 'wood-switch-hunter',
          playerText: 'Ich möchte hören, was der Wilde Jäger dazu entgegnet.',
          nextNodeId: 'hunter_root',
        },
        {
          id: 'wood-bye',
          playerText: 'Möge sich eine gerechte Einigung finden. (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    wood_lodge_life: {
      id: 'wood_lodge_life',
      speaker: WOOD_WOMAN_NPC_NAME,
      speakerRole: 'Verteidigerin des Waldes an der Jagdhütte',
      text: 'Das Fieber sank und die Wunde schloss sich! Die Hirschkuh atmet und steht wieder auf eigenen Läufen. Der Garten des Jägers wird im nächsten Frühjahr neu austreiben – doch ein verstorbenes Waldwesen kehrt nie wieder.',
      options: [
        {
          id: 'wood-to-hunter-view',
          playerText: 'Aber wie soll der Jäger dir vertrauen, wenn du im Dunkeln nimmst?',
          nextNodeId: 'wood_lodge_hunter_view',
        },
        {
          id: 'wood-to-hunter-direct',
          playerText: 'Lass mich mit dem Jäger sprechen.',
          nextNodeId: 'hunter_root',
        },
        {
          id: 'wood-close-life',
          playerText: 'Ein edler Beweggrund, doch ein schwieriges Dilemma. (Gespräch beenden)',
          nextNodeId: null,
          action: { type: 'close' },
        },
      ],
    },

    wood_lodge_hunter_view: {
      id: 'wood_lodge_hunter_view',
      speaker: WOOD_WOMAN_NPC_NAME,
      speakerRole: 'Verteidigerin des Waldes an der Jagdhütte',
      text: 'Ich anerkenne seine Mühe um diesen Kräutergarten. Wäre der Jäger zugegen gewesen, hätte ich ihn um die Wurzeln gebeten. Wenn er mir vergibt, pflanze ich ihm im Frühling wilde Waldminze und Alant als Ausgleich an den Zaun.',
      options: [
        {
          id: 'wood-to-hunter-offer',
          playerText: 'Das ist ein faires Angebot. Ich trage es dem Wilden Jäger vor.',
          nextNodeId: 'hunter_root',
        },
        {
          id: 'wood-close-view',
          playerText: 'Ich danke dir für deine ehrliche Sicht der Dinge. (Gespräch beenden)',
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
        : path.id === 2
          ? [
              {
                id: 'walk-to-pond-2',
                playerText: 'Den gesamten 2. Weg bis zum Waldteich und der Nixe wandern',
                nextNodeId: null,
                action: { type: 'walk_to_nixie' },
              },
            ]
          : path.id === 3
            ? [
                {
                  id: 'walk-to-weir-3',
                  playerText: 'Den gesamten 3. Weg über die Brücke bis zum Wehr und dem Riesen wandern',
                  nextNodeId: null,
                  action: { type: 'walk_to_giant' },
                },
              ]
            : path.id === 4
              ? [
                  {
                    id: 'walk-to-wood-woman-4',
                    playerText: 'Den gesamten 4. Weg bis zum Holzfällerlager und dem Holzweibchen wandern',
                    nextNodeId: null,
                    action: { type: 'walk_to_wood_woman' },
                  },
                ]
              : path.id === 5
                ? [
                    {
                      id: 'walk-to-devil-5',
                      playerText: 'Den gesamten 5. Weg bis zum Höllenschlund und dem Teufel wandern',
                      nextNodeId: null,
                      action: { type: 'walk_to_devil' },
                    },
                  ]
                : path.id === 6
                  ? [
                      {
                        id: 'walk-to-wild-hunter-6',
                        playerText: 'Den gesamten 6. Weg bis zur Jagdhütte und dem Streit wandern',
                        nextNodeId: null,
                        action: { type: 'walk_to_wild_hunter' },
                      },
                    ]
                  : path.id === 7
                    ? [
                        {
                          id: 'walk-to-gate-7',
                          playerText: 'Den gesamten 7. Weg bis zum geschlossenen Tor wandern',
                          nextNodeId: null,
                          action: { type: 'walk_to_gate' },
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

  Object.assign(nodes, createGateDialogueTree());
  Object.assign(nodes, createBoulderDialogueTree());
  Object.assign(nodes, createPuddleDialogueTree());
  Object.assign(nodes, createStreamDialogueTree());
  Object.assign(nodes, createLogDialogueTree());
  Object.assign(nodes, createFireDialogueTree());
  Object.assign(nodes, createHerbsDialogueTree());
  Object.assign(nodes, createMushroomCreaturesDialogueTree());
  return nodes;


}

export const GUIDE_DIALOGUE_NODES: Readonly<Record<string, DialogueNode>> = buildDialogueNodes();
