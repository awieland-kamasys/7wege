import {
  DialogueAction,
  DialogueNode,
  GUIDE_DIALOGUE_NODES,
} from '../data/npcDialogues';

/**
 * Reine Spiellogik für das Kommunikationssystem zwischen Spielfiguren (ohne Three.js).
 */
export class DialogueSystem {
  private readonly nodes: Readonly<Record<string, DialogueNode>>;
  private currentNodeId: string | null = null;

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
   * Startet oder öffnet ein Gespräch beim angegebenen Einstiegsknoten.
   */
  public startDialogue(startNodeId = 'root'): DialogueNode | null {
    if (!this.nodes[startNodeId]) {
      return null;
    }
    this.currentNodeId = startNodeId;
    return this.getCurrentNode();
  }

  /**
   * Beendet das aktuelle Gespräch.
   */
  public closeDialogue(): void {
    this.currentNodeId = null;
  }

  /**
   * Wählt eine Antwortoption der spielenden Person anhand ihrer ID oder ihres Index
   * und gibt ggf. eine ausgelöste Spielaktion zurück.
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

    const action = option.action ?? null;
    if (option.nextNodeId && this.nodes[option.nextNodeId]) {
      this.currentNodeId = option.nextNodeId;
    } else {
      this.currentNodeId = null;
    }

    return {
      node: this.getCurrentNode(),
      action,
    };
  }
}
