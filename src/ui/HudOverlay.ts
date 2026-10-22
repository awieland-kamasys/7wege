import { DialogueNode } from '../game/data/npcDialogues';
import { ForestPathData, SEVEN_PATHS } from '../game/data/paths';
import { PointOfInterest } from '../game/systems/CrossroadsState';

export interface RenderMetrics {
  fps: number;
  drawCalls: number;
  triangles: number;
  geometries: number;
  textures: number;
  pixelRatio: number;
}

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
 * - Ein dezentes Performance-Badge zeigt Live-Messwerte (Draw Calls, FPS, Triangles).
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
  private readonly perfBadgeEl: HTMLElement;
  private readonly perfModalEl: HTMLElement;
  private lastDialogueNodeId: string | null = null;
  private lastPathBadgeText: string | null = null;
  private lastReturnBtnHidden: boolean | null = null;
  private lastPerfText: string | null = null;
  private isPerfModalOpen = false;

  constructor(container: HTMLElement, private readonly callbacks: HudCallbacks) {
    container.innerHTML = '';

    const header = document.createElement('header');
    header.className = 'hud-header';

    // Kompakte Anzeige für den aktuellen Pfad samt Rücksprung zur 7-Wegekreuzung (immer links unten)
    this.activePathBadgeEl = document.createElement('div');
    this.activePathBadgeEl.className = 'active-path-badge';
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

    // Live Performance-Badge (oben rechts)
    this.perfBadgeEl = document.createElement('div');
    this.perfBadgeEl.className = 'perf-badge';
    this.perfBadgeEl.title = 'Performance-Metriken anzeigen / ausblenden (Taste P)';
    this.perfBadgeEl.textContent = '⚡ Metriken';
    this.perfBadgeEl.addEventListener('click', (e) => {
      e.stopPropagation();
      this.togglePerfModal();
    });

    // Detailfenster für Performance-Metriken
    this.perfModalEl = document.createElement('div');
    this.perfModalEl.className = 'perf-modal is-hidden';

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

    header.append(this.dialogueModalEl);
    container.append(header, this.activePathBadgeEl, this.perfBadgeEl, this.perfModalEl);
  }

  public togglePerfModal(): void {
    this.isPerfModalOpen = !this.isPerfModalOpen;
    if (this.isPerfModalOpen) {
      this.perfModalEl.classList.remove('is-hidden');
    } else {
      this.perfModalEl.classList.add('is-hidden');
    }
  }

  public update(
    _poi: PointOfInterest,
    selectedPathId: number | null,
    activeDialogueNode: DialogueNode | null,
    _isChestOpen = false,
    isOnClearing = true,
    currentPath: ForestPathData | null = null,
    metrics?: RenderMetrics
  ): void {
    if (metrics) {
      const badgeText = `⚡ ${metrics.fps} FPS · ${metrics.drawCalls} Calls`;
      if (this.lastPerfText !== badgeText) {
        this.lastPerfText = badgeText;
        this.perfBadgeEl.textContent = badgeText;
      }

      if (this.isPerfModalOpen) {
        this.perfModalEl.innerHTML = `
          <div style="font-weight: 700; color: var(--accent-gold); margin-bottom: 0.5rem; display: flex; justify-content: space-between;">
            <span>⚡ Performance-Diagnose</span>
            <span style="font-size: 0.75rem; color: var(--text-muted);">Taste P</span>
          </div>
          <div style="display: grid; grid-template-columns: auto auto; gap: 0.25rem 0.75rem; font-family: monospace;">
            <span style="color: var(--text-muted);">Bildrate:</span>
            <span style="color: var(--accent-green); font-weight: 600;">${metrics.fps} FPS (${(1000 / Math.max(1, metrics.fps)).toFixed(1)} ms)</span>
            <span style="color: var(--text-muted);">Draw Calls:</span>
            <span style="color: #64b5f6; font-weight: 600;">${metrics.drawCalls} <small style="color: var(--text-muted);">(vorher ~3.100)</small></span>
            <span style="color: var(--text-muted);">Dreiecke:</span>
            <span>${metrics.triangles.toLocaleString()}</span>
            <span style="color: var(--text-muted);">VRAM-Geometrien:</span>
            <span>${metrics.geometries}</span>
            <span style="color: var(--text-muted);">VRAM-Texturen:</span>
            <span>${metrics.textures}</span>
            <span style="color: var(--text-muted);">Pixel Ratio (DPR):</span>
            <span>${metrics.pixelRatio}</span>
          </div>
          <div style="margin-top: 0.6rem; padding-top: 0.5rem; border-top: 1px solid rgba(255,255,255,0.1); font-size: 0.75rem; color: var(--text-muted);">
            ✔ InstancedMesh (12 Baum-Calls statt 3.000)<br>
            ✔ Pfad-Geometrien verschmolzen<br>
            ✔ Gestaffeltes Schauplatz-Laden
          </div>
        `;
      }
    }

    const selectedPath =
      currentPath ??
      (selectedPathId !== null
        ? SEVEN_PATHS.find((p) => p.id === selectedPathId) ?? null
        : null);

    // Bezeichnung des Weges und Link zur Kreuzung immer links unten anzeigen (mit Dirty-Checking gegen unnötige DOM-Reflows)
    const nextTitle = selectedPath && !isOnClearing ? `🧭 ${selectedPath.name}` : '🧭 7-Wegekreuzung';
    if (this.lastPathBadgeText !== nextTitle) {
      this.lastPathBadgeText = nextTitle;
      this.activePathTitleEl.textContent = nextTitle;
    }

    const shouldHideReturnBtn = !(selectedPath && !isOnClearing);
    if (this.lastReturnBtnHidden !== shouldHideReturnBtn) {
      this.lastReturnBtnHidden = shouldHideReturnBtn;
      if (shouldHideReturnBtn) {
        this.returnToClearingBtn.classList.add('is-hidden');
      } else {
        this.returnToClearingBtn.classList.remove('is-hidden');
      }
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
