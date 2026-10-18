import { SEVEN_PATHS } from './paths';

export type DialogueAction =
  | { type: 'select_path'; pathId: number }
  | { type: 'walk_to_grey_man' }
  | { type: 'walk_to_nixie' }
  | { type: 'walk_to_giant' }
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

export const NIXIE_NPC_NAME = 'Die Nixe vom Spiegelteich';
export const NIXIE_NPC_ROLE = 'Wächterin auf dem Stein im Teich';

export const GIANT_NPC_NAME = 'Der Riese am Wehr';
export const GIANT_NPC_ROLE = 'Wächter über Stausee und Quellwehr';

/**
 * Individuelle Hinweise des Waldhüters zu jedem der sieben Wege.
 */
const PATH_HINTS: Record<number, string> = {
  1: 'Der 1. Silberstollen-Pfad windet sich in einer langen Kurve hinauf zum alten Bergmassiv. Vor dem Höhleneingang wartet das Graumännchen: Eine neue Silberader könnte dort Mine und Arbeiter retten – doch ihr Auffinden verlangt Licht in einem Stollen, für den ein altes Verbot und Versprechen gilt.',
  2: 'Der 2. Nixenteich-Pfad im Nordosten führt durch den Nebel zu einem stillen Waldteich. Auf einem Felsen im Wasser sitzt die Nixe. Auf dem Grund ihres Teichs funkelt ein verlockender Schatz – doch sei gewarnt: Er ist mit einem dunklen Fluch und drohendem Unglück verbunden.',
  3: 'Der 3. Quellenweg im Südosten führt über eine Brücke, unter der ein Bach hindurchfließt. Ein geschlossenes Wehr an der Brücke staut den Bach zu einem kleinen Stausee zurück. Dort wacht der Riese: Die Quelle versorgt eigentlich das Tal – ihre Freigabe könnte dort eine Dürre lindern, zerstört jedoch die Heimat des Riesen.',
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
