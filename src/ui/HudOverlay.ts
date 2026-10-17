import { DialogueNode } from '../game/data/npcDialogues';
import { SEVEN_PATHS } from '../game/data/paths';
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
 * Schlanke, barrierearme DOM-Oberfläche für die Waldkreuzung und die Wege.
 * - Auf den Wegen werden alle HUD-Menüs (Statuskarte, Wegeauswahl, Steuerungshinweis) komplett ausgeblendet,
 *   damit die 3D-Szene vollkommen frei wirkt.
 * - Ein aktives Gesprächsmenü wird als schlankes Panel am rechten Rand eingeblendet.
 */
export class HudOverlay {
  private readonly infoCardEl: HTMLElement;
  private readonly statusTitleEl: HTMLElement;
  private readonly statusTextEl: HTMLElement;
  private readonly talkActionBtn: HTMLButtonElement;
  private readonly greyManActionBtn: HTMLButtonElement;
  private readonly chestActionBtn: HTMLButtonElement;
  private readonly buttonNavEl: HTMLElement;
  private readonly controlsCardEl: HTMLElement;
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

    // Kopfbereich: Ortsanzeige (oben links, nur auf der Kreuzung) & Gesprächs-Panel (rechts außen angedockt)
    const header = document.createElement('header');
    header.className = 'hud-header';

    this.infoCardEl = document.createElement('section');
    this.infoCardEl.className = 'hud-card';
    this.infoCardEl.setAttribute('aria-live', 'polite');

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
    this.talkActionBtn.textContent = '💬 Waldhüter Arvid';
    this.talkActionBtn.addEventListener('click', () => this.callbacks.onTalkToNpc());

    this.greyManActionBtn = document.createElement('button');
    this.greyManActionBtn.type = 'button';
    this.greyManActionBtn.className = 'talk-btn';
    this.greyManActionBtn.textContent = '⛏️ Zum Graumännchen (Weg 1)';
    this.greyManActionBtn.addEventListener('click', () => this.callbacks.onTalkToGreyMan());

    this.chestActionBtn = document.createElement('button');
    this.chestActionBtn.type = 'button';
    this.chestActionBtn.className = 'talk-btn';
    this.chestActionBtn.textContent = '🗝️ Schatztruhe öffnen';
    this.chestActionBtn.addEventListener('click', () => this.callbacks.onToggleChest());

    actionRow.append(this.talkActionBtn, this.greyManActionBtn, this.chestActionBtn);
    this.infoCardEl.append(this.statusTitleEl, this.statusTextEl, actionRow);

    // Schlankes Seiten-Panel rechts außen für Gespräche (lässt die gesamte Spielmitte frei)
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
    closeBtn.textContent = '✕ Esc';
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

    header.append(this.infoCardEl, this.dialogueModalEl);

    // Fußbereich: Schnellwahl für die 7 Wege + Steuerungshinweis (nur auf der Kreuzung sichtbar)
    const footer = document.createElement('footer');
    footer.className = 'hud-footer';

    this.buttonNavEl = document.createElement('nav');
    this.buttonNavEl.className = 'path-buttons';
    this.buttonNavEl.setAttribute('aria-label', 'Wegweiser: Auswahl der sieben Wege');

    SEVEN_PATHS.forEach((path) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'path-btn';
      btn.textContent = `${path.name} (${path.directionLabel})`;
      btn.addEventListener('click', () => this.callbacks.onSelectPath(path.id));
      this.buttons.set(path.id, btn);
      this.buttonNavEl.appendChild(btn);
    });

    this.controlsCardEl = document.createElement('div');
    this.controlsCardEl.className = 'hud-card controls-hint';
    this.controlsCardEl.textContent =
      'Steuerung: Linksklick = Gehen / Interagieren | Maus ziehen = Kamera | Mausrad = Zoom | WASD = Gehen | F = Sprechen/Truhe';

    footer.append(this.buttonNavEl, this.controlsCardEl);
    container.append(header, footer);
  }

  public update(
    poi: PointOfInterest,
    selectedPathId: number | null,
    activeDialogueNode: DialogueNode | null,
    isChestOpen = false,
    isOnClearing = true
  ): void {
    // Auf den Wegen werden sämtliche HUD-Menüs (Statuskarte, Wege-Buttons, Steuerungshinweis) ausgeblendet
    this.infoCardEl.classList.toggle('is-hidden', !isOnClearing);
    this.buttonNavEl.classList.toggle('is-hidden', !isOnClearing);
    this.controlsCardEl.classList.toggle('is-hidden', !isOnClearing);

    if (isOnClearing) {
      if (poi.type === 'npc') {
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
      } else if (poi.type === 'path') {
        this.statusTitleEl.textContent = poi.path.name;
        this.statusTextEl.textContent = poi.path.subtitle;
      } else {
        this.statusTitleEl.textContent = 'Waldkreuzung';
        this.statusTextEl.textContent = poi.label;
      }

      this.talkActionBtn.classList.toggle('is-emphasized', poi.type === 'npc');
      this.talkActionBtn.textContent =
        poi.type === 'npc' ? '💬 Mit Waldhüter sprechen (F)' : '💬 Waldhüter Arvid';

      this.chestActionBtn.classList.toggle('is-emphasized', poi.type === 'chest');
      this.chestActionBtn.textContent = isChestOpen
        ? '🗝️ Truhe schließen'
        : '🗝️ Schatztruhe öffnen';

      this.buttons.forEach((btn, id) => {
        btn.disabled = false;
        btn.classList.toggle('is-active', id === selectedPathId);
      });
    } else {
      this.buttons.forEach((btn) => {
        btn.disabled = true;
      });
    }

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
