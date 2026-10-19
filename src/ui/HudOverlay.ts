import { DialogueNode } from '../game/data/npcDialogues';
import { ForestPathData, SEVEN_PATHS } from '../game/data/paths';
import { PointOfInterest } from '../game/systems/CrossroadsState';

export interface HudCallbacks {
  onSelectPath: (pathId: number) => void;
  onReturnToClearing: () => void;
  onTalkToNpc: () => void;
  onTalkToGreyMan: () => void;
  onToggleChest: () => void;
  onSelectDialogueOption: (optionIndex: number) => void;
  onCloseDialogue: () => void;
  onToggleSpeech: () => boolean;
}

/**
 * Maximale Sichtfläche für das Spiel (insbesondere auf Mobilgeräten):
 * - Keine permanenten Infokarten, Steuerungsboxen oder 7-Wege-Listen.
 * - Die Schatztruhe wird rein händisch in der 3D-Szene bedient.
 * - Es wird nur der eine Pfad angezeigt, auf dem die Spielfigur innerhalb der Quest unterwegs ist
 *   (und erst dann, wenn dieser Pfad aktuell ausgewählt ist).
 * - Das Kommunikationsmenü erscheint ausschließlich, während ein Gespräch stattfindet.
 */
export class HudOverlay {
  private readonly activePathBadgeEl: HTMLElement;
  private readonly activePathTitleEl: HTMLElement;
  private readonly returnToClearingBtn: HTMLButtonElement;
  private readonly dialogueModalEl: HTMLElement;
  private readonly dialogueSpeakerEl: HTMLElement;
  private readonly dialogueRoleEl: HTMLElement;
  private readonly dialogueTextEl: HTMLElement;
  private readonly dialogueOptionsEl: HTMLElement;
  private readonly speechToggleBtn: HTMLButtonElement;
  private lastDialogueNodeId: string | null = null;

  constructor(container: HTMLElement, private readonly callbacks: HudCallbacks) {
    container.innerHTML = '';

    const header = document.createElement('header');
    header.className = 'hud-header';

    // Kompakte Anzeige für den aktuellen Pfad samt Rücksprung zur 7-Wegekreuzung (standardmäßig ausgeblendet)
    this.activePathBadgeEl = document.createElement('div');
    this.activePathBadgeEl.className = 'active-path-badge is-hidden';
    this.activePathBadgeEl.setAttribute('aria-live', 'polite');

    this.activePathTitleEl = document.createElement('span');
    this.activePathTitleEl.className = 'active-path-title';

    this.returnToClearingBtn = document.createElement('button');
    this.returnToClearingBtn.type = 'button';
    this.returnToClearingBtn.className = 'active-path-return-btn';
    this.returnToClearingBtn.textContent = '↩ Zur 7-Wegekreuzung';
    this.returnToClearingBtn.title = 'Per Klick zurück zur 7-Wegekreuzung springen';
    this.returnToClearingBtn.setAttribute('aria-label', 'Zurück zur 7-Wegekreuzung springen');
    this.returnToClearingBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.callbacks.onReturnToClearing();
    });

    this.activePathBadgeEl.append(this.activePathTitleEl, this.returnToClearingBtn);

    // Kommunikationsmenü: wird ausschließlich eingeblendet, wenn aktive Kommunikation stattfindet
    this.dialogueModalEl = document.createElement('aside');
    this.dialogueModalEl.className = 'dialogue-panel is-hidden';
    this.dialogueModalEl.style.marginLeft = 'auto';
    this.dialogueModalEl.setAttribute('role', 'dialog');
    this.dialogueModalEl.setAttribute('aria-label', 'Gespräch mit NPC');

    const dialogueHeader = document.createElement('div');
    dialogueHeader.className = 'dialogue-header';

    const speakerWrap = document.createElement('div');
    this.dialogueSpeakerEl = document.createElement('h2');
    this.dialogueSpeakerEl.className = 'dialogue-speaker';
    this.dialogueRoleEl = document.createElement('span');
    this.dialogueRoleEl.className = 'dialogue-role';
    speakerWrap.append(this.dialogueSpeakerEl, this.dialogueRoleEl);

    const headerActions = document.createElement('div');
    headerActions.className = 'dialogue-header-actions';

    this.speechToggleBtn = document.createElement('button');
    this.speechToggleBtn.type = 'button';
    this.speechToggleBtn.className = 'dialogue-close-btn';
    this.speechToggleBtn.textContent = '🔊';
    this.speechToggleBtn.title = 'Sprachausgabe ein-/ausschalten';
    this.speechToggleBtn.addEventListener('click', () => {
      const enabled = this.callbacks.onToggleSpeech();
      this.speechToggleBtn.textContent = enabled ? '🔊' : '🔇';
    });

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'dialogue-close-btn';
    closeBtn.textContent = '✕';
    closeBtn.title = 'Gespräch schließen (Esc)';
    closeBtn.addEventListener('click', () => this.callbacks.onCloseDialogue());

    headerActions.append(this.speechToggleBtn, closeBtn);
    dialogueHeader.append(speakerWrap, headerActions);

    this.dialogueTextEl = document.createElement('p');
    this.dialogueTextEl.className = 'dialogue-text';

    const playerPromptLabel = document.createElement('div');
    playerPromptLabel.className = 'dialogue-player-label';
    playerPromptLabel.textContent = 'Antwort wählen:';

    this.dialogueOptionsEl = document.createElement('div');
    this.dialogueOptionsEl.className = 'dialogue-options';

    this.dialogueModalEl.append(
      dialogueHeader,
      this.dialogueTextEl,
      playerPromptLabel,
      this.dialogueOptionsEl
    );

    header.append(this.activePathBadgeEl, this.dialogueModalEl);
    container.append(header);
  }

  public update(
    _poi: PointOfInterest,
    selectedPathId: number | null,
    activeDialogueNode: DialogueNode | null,
    _isChestOpen = false,
    isOnClearing = true,
    currentPath: ForestPathData | null = null
  ): void {
    const selectedPath =
      currentPath ??
      (selectedPathId !== null
        ? SEVEN_PATHS.find((p) => p.id === selectedPathId) ?? null
        : null);

    // Wenn die Spielfigur auf den Wegen unterwegs ist:
    // Wegnamen und Button zum Rücksprung zur 7-Wegekreuzung anzeigen
    if (selectedPath && !isOnClearing) {
      this.activePathTitleEl.textContent = `🧭 ${selectedPath.name}`;
      this.activePathBadgeEl.classList.remove('is-hidden');
    } else {
      this.activePathBadgeEl.classList.add('is-hidden');
    }

    // Kommunikationsmenü nur einblenden, wenn ein Gespräch stattfindet
    this.renderDialogue(activeDialogueNode);
  }

  private renderDialogue(node: DialogueNode | null): void {
    if (!node) {
      this.dialogueModalEl.classList.add('is-hidden');
      this.lastDialogueNodeId = null;
      return;
    }

    this.dialogueModalEl.classList.remove('is-hidden');
    if (this.lastDialogueNodeId === node.id) {
      return;
    }
    this.lastDialogueNodeId = node.id;

    this.dialogueSpeakerEl.textContent = node.speaker;
    this.dialogueRoleEl.textContent = node.speakerRole;
    this.dialogueTextEl.textContent = `„${node.text}“`;

    this.dialogueOptionsEl.innerHTML = '';
    node.options.forEach((opt, idx) => {
      const optBtn = document.createElement('button');
      optBtn.type = 'button';
      optBtn.className = 'dialogue-option-btn';
      optBtn.textContent = `${idx + 1}. ${opt.playerText}`;
      optBtn.addEventListener('click', () => this.callbacks.onSelectDialogueOption(idx));
      this.dialogueOptionsEl.appendChild(optBtn);
    });
  }
}
