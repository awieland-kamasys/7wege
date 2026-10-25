import {
  DialogueAction,
  DialogueNode,
  GUIDE_DIALOGUE_NODES,
} from '../data/npcDialogues';

/**
 * Reine Spiellogik für das Kommunikationssystem zwischen Spielfiguren (ohne Three.js).
 * Implementiert den Grundsatz: Standarddialoge werden nur einmal angezeigt und nach Auswahl
 * einer Antwort ist kein Aufruf des gleichen Dialoges mehr möglich.
 */
export class DialogueSystem {
  private readonly nodes: Readonly<Record<string, DialogueNode>>;
  private currentNodeId: string | null = null;
  private currentRootNodeId: string | null = null;
  private readonly completedDialogues: Set<string> = new Set<string>();

  constructor(nodes: Readonly<Record<string, DialogueNode>> = GUIDE_DIALOGUE_NODES) {
    this.nodes = nodes;
  }

  public isOpen(): boolean {
    return this.currentNodeId !== null;
  }

  public getCurrentNode(): DialogueNode | null {
    if (!this.currentNodeId) {
      return null;
    }
    return this.nodes[this.currentNodeId] ?? null;
  }

  /**
   * Prüft, ob ein Dialog (z. B. ein Standarddialog) bereits durch eine Antwortauswahl abgeschlossen wurde.
   * Wiederholbare Dialoge (repeatable) gelten niemals als abgeschlossen.
   */
  public isDialogueCompleted(dialogueId: string): boolean {
    const node = this.nodes[dialogueId];
    if (node?.repeatable) {
      return false;
    }
    return this.completedDialogues.has(dialogueId);
  }

  /**
   * Prüft, ob ein Dialog gestartet werden kann (existiert und ist noch nicht abgeschlossen bzw. wiederholbar).
   */
  public canStartDialogue(startNodeId: string): boolean {
    const node = this.nodes[startNodeId];
    if (!node) {
      return false;
    }
    if (node.repeatable) {
      return true;
    }
    return !this.isDialogueCompleted(startNodeId);
  }

  /**
   * Startet oder öffnet ein Gespräch beim angegebenen Einstiegsknoten.
   * Gibt `null` zurück, wenn der Knoten nicht existiert oder dieser Dialog
   * bereits durch die Auswahl einer Antwort abgeschlossen wurde (außer bei wiederholbaren Dialogen).
   */
  public startDialogue(startNodeId = 'root'): DialogueNode | null {
    const node = this.nodes[startNodeId];
    if (!node) {
      return null;
    }
    if (!node.repeatable && this.isDialogueCompleted(startNodeId)) {
      return null;
    }
    this.currentRootNodeId = startNodeId;
    this.currentNodeId = startNodeId;
    return this.getCurrentNode();
  }

  /**
   * Wechselt innerhalb eines aktiven Gesprächs direkt zu einem Zielknoten (z. B. für automatische Übergänge).
   */
  public goToNode(nodeId: string): DialogueNode | null {
    if (!this.nodes[nodeId]) {
      return null;
    }
    this.currentNodeId = nodeId;
    return this.getCurrentNode();
  }

  /**
   * Beendet das aktuelle Gespräch (z. B. durch Abbruch/ESC vor einer Auswahl).
   * Wenn noch keine Antwort gewählt wurde, gilt der Dialog noch nicht als abgeschlossen.
   */
  public closeDialogue(): void {
    this.currentNodeId = null;
    this.currentRootNodeId = null;
  }

  /**
   * Wählt eine Antwortoption der spielenden Person anhand ihres Index.
   * Gemäß Grundsatz gilt: Sobald eine Antwort ausgewählt wurde, wird der Dialog
   * als abgeschlossen registriert und kann nicht mehr erneut aufgerufen werden.
   */
  public selectOption(optionIndex: number): {
    node: DialogueNode | null;
    action: DialogueAction | null;
  } {
    const current = this.getCurrentNode();
    if (!current) {
      return { node: null, action: null };
    }

    const option = current.options[optionIndex];
    if (!option) {
      return { node: current, action: null };
    }

    const rootNode = this.currentRootNodeId ? this.nodes[this.currentRootNodeId] : null;
    const isRepeatableTree = Boolean(rootNode?.repeatable || current.repeatable);

    // Sobald eine Antwort gewählt wird, wird der Dialog als abgeschlossen markiert,
    // es sei denn, es handelt sich um einen explizit wiederholbaren Dialog (z. B. Idle-Dialog).
    if (!isRepeatableTree) {
      if (this.currentRootNodeId) {
        this.completedDialogues.add(this.currentRootNodeId);
      }
      this.completedDialogues.add(current.id);
    }

    const action = option.action ?? null;
    if (option.nextNodeId && this.nodes[option.nextNodeId]) {
      this.currentNodeId = option.nextNodeId;
    } else {
      this.currentNodeId = null;
      this.currentRootNodeId = null;
    }

    return {
      node: this.getCurrentNode(),
      action,
    };
  }

  /**
   * Setzt alle abgeschlossenen Dialoge zurück (z. B. für Spielneustart oder Tests).
   */
  public resetCompletedDialogues(): void {
    this.completedDialogues.clear();
  }
}
