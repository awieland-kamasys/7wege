import { DialogueNode } from '../game/data/npcDialogues';
import { SEVEN_PATHS } from '../game/data/paths';
import { PointOfInterest } from '../game/systems/CrossroadsState';

export interface HudCallbacks {
  onSelectPath: (pathId: number) => void;
  onTalkToNpc: () => void;
  onToggleChest: () => void;
  onSelectDialogueOption: (optionIndex: number) => void;
  onCloseDialogue: () => void;
  onToggleSpeech: () => boolean;
}

/**
 * Schlanke, barrierearme DOM-Oberfläche für die Waldkreuzung inklusive
 * Kommunikationsfenster für Gespräche zwischen Spielfigur und NPC sowie Schatztruhen-Aktion.
 */
export class HudOverlay {
  private readonly statusTitleEl: HTMLElement;
  private readonly statusTextEl: HTMLElement;
  private readonly talkActionBtn: HTMLButtonElement;
  private readonly chestActionBtn: HTMLButtonElement;
  private readonly dialogueModalEl: HTMLElement;
  private readonly dialogueSpeakerEl: HTMLElement;
  private readonly dialogueRoleEl: HTMLElement;
  private readonly dialogueTextEl: HTMLElement;
  private readonly dialogueOptionsEl: HTMLElement;
  private readonly speechToggleBtn: HTMLButtonElement;
  private readonly buttons = new Map<number, HTMLButtonElement>();
  private lastDialogueNodeId: string | null = null;

  constructor(container: HTMLElement, private readonly callbacks: HudCallbacks) {
    container.innerHTML = '';

    // Kopfbereich: Ortsanzeige, Beschreibung & Schnellbuttons (Sprechen & Schatztruhe)
    const header = document.createElement('header');
    header.className = 'hud-header';

    const infoCard = document.createElement('section');
    infoCard.className = 'hud-card';
    infoCard.setAttribute('aria-live', 'polite');

    this.statusTitleEl = document.createElement('h1');
    this.statusTitleEl.className = 'hud-title';
    this.statusTitleEl.textContent = '7Wege – Die Waldkreuzung';

    this.statusTextEl = document.createElement('p');
    this.statusTextEl.className = 'hud-subtitle';
    this.statusTextEl.textContent =
      'Vor der Schutzhütte stehen Waldhüter Arvid, eine Schatztruhe und der Wegweiser.';

    const actionRow = document.createElement('div');
    actionRow.className = 'hud-actions-row';

    this.talkActionBtn = document.createElement('button');
    this.talkActionBtn.type = 'button';
    this.talkActionBtn.className = 'talk-btn';
    this.talkActionBtn.textContent = '💬 Mit Waldhüter sprechen';
    this.talkActionBtn.addEventListener('click', () => this.callbacks.onTalkToNpc());

    this.chestActionBtn = document.createElement('button');
    this.chestActionBtn.type = 'button';
    this.chestActionBtn.className = 'talk-btn';
    this.chestActionBtn.textContent = '🗝️ Schatztruhe öffnen';
    this.chestActionBtn.addEventListener('click', () => this.callbacks.onToggleChest());

    actionRow.append(this.talkActionBtn, this.chestActionBtn);
    infoCard.append(this.statusTitleEl, this.statusTextEl, actionRow);
    header.appendChild(infoCard);

    // Mittlerer Bereich: Dialogfenster für die Kommunikation zwischen den Spielfiguren
    this.dialogueModalEl = document.createElement('section');
    this.dialogueModalEl.className = 'dialogue-modal is-hidden';
    this.dialogueModalEl.setAttribute('role', 'dialog');
    this.dialogueModalEl.setAttribute('aria-label', 'Gespräch mit Hinweisgeber');

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
    this.speechToggleBtn.textContent = '🔊 Stimme an';
    this.speechToggleBtn.addEventListener('click', () => {
      const enabled = this.callbacks.onToggleSpeech();
      this.speechToggleBtn.textContent = enabled ? '🔊 Stimme an' : '🔇 Stumm';
    });

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'dialogue-close-btn';
    closeBtn.textContent = '✕ Schließen (Esc)';
    closeBtn.addEventListener('click', () => this.callbacks.onCloseDialogue());

    headerActions.append(this.speechToggleBtn, closeBtn);
    dialogueHeader.append(speakerWrap, headerActions);

    this.dialogueTextEl = document.createElement('p');
    this.dialogueTextEl.className = 'dialogue-text';

    const playerPromptLabel = document.createElement('div');
    playerPromptLabel.className = 'dialogue-player-label';
    playerPromptLabel.textContent = 'Antwort deiner Spielfigur wählen:';

    this.dialogueOptionsEl = document.createElement('div');
    this.dialogueOptionsEl.className = 'dialogue-options';

    this.dialogueModalEl.append(
      dialogueHeader,
      this.dialogueTextEl,
      playerPromptLabel,
      this.dialogueOptionsEl
    );

    // Fußbereich: Schnellwahl für die 7 Wege + Steuerungshinweis
    const footer = document.createElement('footer');
    footer.className = 'hud-footer';

    const buttonNav = document.createElement('nav');
    buttonNav.className = 'path-buttons';
    buttonNav.setAttribute('aria-label', 'Wegweiser: Auswahl der sieben Wege');

    SEVEN_PATHS.forEach((path) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'path-btn';
      btn.textContent = `${path.name} (${path.directionLabel})`;
      btn.addEventListener('click', () => this.callbacks.onSelectPath(path.id));
      this.buttons.set(path.id, btn);
      buttonNav.appendChild(btn);
    });

    const controlsCard = document.createElement('div');
    controlsCard.className = 'hud-card controls-hint';
    controlsCard.textContent =
      'Steuerung: Linksklick = Gehen / Truhe öffnen / Sprechen | Maus ziehen = Kamera | Mausrad = Zoom | WASD = Gehen';

    footer.append(buttonNav, controlsCard);
    container.append(header, this.dialogueModalEl, footer);
  }

  public update(
    poi: PointOfInterest,
    selectedPathId: number | null,
    activeDialogueNode: DialogueNode | null,
    isChestOpen = false
  ): void {
    if (poi.type === 'path') {
      this.statusTitleEl.textContent = poi.path.name;
      this.statusTextEl.textContent = `${poi.path.subtitle} (Richtung: ${poi.path.directionLabel})`;
    } else if (poi.type === 'npc') {
      this.statusTitleEl.textContent = poi.name;
      this.statusTextEl.textContent = poi.label;
    } else if (poi.type === 'chest') {
      this.statusTitleEl.textContent = 'Schatztruhe vor der Hütte';
      this.statusTextEl.textContent = poi.label;
    } else if (poi.type === 'hut') {
      this.statusTitleEl.textContent = 'Schutzhütte aus Baumstämmen';
      this.statusTextEl.textContent = poi.label;
    } else if (poi.type === 'signpost') {
      this.statusTitleEl.textContent = 'Wegweiser der sieben Wege';
      this.statusTextEl.textContent = poi.label;
    } else {
      this.statusTitleEl.textContent = 'Waldkreuzung';
      this.statusTextEl.textContent = poi.label;
    }

    this.talkActionBtn.classList.toggle('is-emphasized', poi.type === 'npc');
    this.talkActionBtn.textContent =
      poi.type === 'npc'
        ? '💬 Mit Waldhüter sprechen (F)'
        : '💬 Zu Waldhüter Arvid';

    this.chestActionBtn.classList.toggle('is-emphasized', poi.type === 'chest');
    this.chestActionBtn.textContent = isChestOpen
      ? '🗝️ Truhendeckel schließen'
      : '🗝️ Schatztruhe öffnen';

    this.buttons.forEach((btn, id) => {
      btn.classList.toggle('is-active', id === selectedPathId);
    });

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
