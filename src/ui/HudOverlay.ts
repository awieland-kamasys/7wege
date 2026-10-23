import { DialogueNode } from '../game/data/npcDialogues';
import { ForestPathData, SEVEN_PATHS } from '../game/data/paths';
import { PointOfInterest } from '../game/systems/CrossroadsState';
import {
  DEFAULT_TERRAIN_PRESET,
  TERRAIN_PRESETS,
  TerrainPresetKey,
} from '../game/textures/TerrainPresets';

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
  onToggleMusic?: () => boolean;
  onSetMusicVolume?: (volume: number) => void;
  getMusicVolume?: () => number;
  onSelectTerrainPreset?: (presetKey: TerrainPresetKey) => void;
}

/**
 * Maximale Sichtfläche für das Spiel (insbesondere auf Mobilgeräten):
 * - Keine permanenten Infokarten, Steuerungsboxen oder 7-Wege-Listen.
 * - Die Schatztruhe wird rein händisch in der 3D-Szene bedient.
 * - Es wird nur der eine Pfad angezeigt, auf dem die Spielfigur innerhalb der Quest unterwegs ist.
 * - Das Kommunikationsmenü erscheint ausschließlich, während ein Gespräch stattfindet.
 * - Ein dezentes Performance-Badge zeigt Live-Messwerte (Draw Calls, FPS, Triangles).
 * - Ein dezenter Bodenstil-Wähler (Tasten 1-4 oder Klick) ermöglicht direktes Vergleichen der 4 Texturvarianten.
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
  private readonly presetBadgeEl: HTMLElement;
  private readonly presetModalEl: HTMLElement;
  private readonly musicControlWrapEl: HTMLElement;
  private readonly musicBadgeEl: HTMLButtonElement;
  private readonly musicSliderEl: HTMLInputElement;
  private readonly musicVolumeLabelEl: HTMLElement;
  private readonly toastEl: HTMLElement;

  private lastDialogueNodeId: string | null = null;
  private lastPathBadgeText: string | null = null;
  private lastReturnBtnHidden: boolean | null = null;
  private lastPerfText: string | null = null;
  private isPerfModalOpen = false;
  private isPresetModalOpen = false;
  private currentPresetKey: TerrainPresetKey = DEFAULT_TERRAIN_PRESET;
  private toastTimeout: number | null = null;

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
    this.returnToClearingBtn.title = 'Per Klick im Dauerlauf (doppeltes Tempo) zurück zur 7-Wegekreuzung laufen';
    this.returnToClearingBtn.setAttribute('aria-label', 'Zurück zur 7-Wegekreuzung laufen');
    this.returnToClearingBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.callbacks.onReturnToClearing();
    });

    this.activePathBadgeEl.append(this.activePathTitleEl, this.returnToClearingBtn);

    // Live Performance-Badge (oben links)
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

    // Wähler für Boden- und Wegtexturen (Taste 1–4 oder Direktklick)
    this.presetBadgeEl = document.createElement('div');
    this.presetBadgeEl.className = 'preset-badge';
    this.presetBadgeEl.title = 'Boden- & Wegtexturen umschalten (Tasten 1–4 oder Klick)';
    this.updatePresetBadgeText();
    this.presetBadgeEl.addEventListener('click', (e) => {
      e.stopPropagation();
      this.togglePresetModal();
    });

    // Ausklappbares Menü für die 4 Bodenstil-Presets
    this.presetModalEl = document.createElement('div');
    this.presetModalEl.className = 'preset-modal is-hidden';
    this.renderPresetModalContent();

    // Kompakte Musik-Steuerung mit Mute-Toggle und stufenlosem Lautstärkeregler
    this.musicControlWrapEl = document.createElement('div');
    this.musicControlWrapEl.className = 'music-control-wrap';

    this.musicBadgeEl = document.createElement('button');
    this.musicBadgeEl.className = 'music-badge';
    this.musicBadgeEl.type = 'button';
    this.musicBadgeEl.title = 'Hintergrundmusik ein-/ausschalten (Taste M oder Klick)';
    this.musicBadgeEl.textContent = '🎵';
    this.musicBadgeEl.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.callbacks.onToggleMusic) {
        const enabled = this.callbacks.onToggleMusic();
        this.setMusicActive(enabled);
        this.showToast(enabled ? '🎵 Hintergrundmusik: Aktiviert' : '🔇 Hintergrundmusik: Stumm');
      }
    });

    this.musicSliderEl = document.createElement('input');
    this.musicSliderEl.className = 'music-volume-slider';
    this.musicSliderEl.type = 'range';
    this.musicSliderEl.min = '0';
    this.musicSliderEl.max = '100';
    this.musicSliderEl.value = '50';
    this.musicSliderEl.title = 'Lautstärke der Hintergrundmusik regeln';
    this.musicSliderEl.addEventListener('input', (e) => {
      e.stopPropagation();
      const val = parseInt(this.musicSliderEl.value, 10);
      this.musicVolumeLabelEl.textContent = `${val}%`;
      const norm = val / 100;
      this.callbacks.onSetMusicVolume?.(norm);
      this.setMusicActive(norm > 0.001);
    });
    this.musicSliderEl.addEventListener('click', (e) => e.stopPropagation());

    this.musicVolumeLabelEl = document.createElement('span');
    this.musicVolumeLabelEl.className = 'music-volume-label';
    this.musicVolumeLabelEl.textContent = '50%';

    this.musicControlWrapEl.append(
      this.musicBadgeEl,
      this.musicSliderEl,
      this.musicVolumeLabelEl
    );

    // Dezentes Toast-Element für Benachrichtigungen (z. B. nach Tastendruck 1-4)
    this.toastEl = document.createElement('div');
    this.toastEl.className = 'hud-toast is-hidden';
    this.toastEl.setAttribute('aria-live', 'assertive');

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
    container.append(
      header,
      this.activePathBadgeEl,
      this.perfBadgeEl,
      this.perfModalEl,
      this.musicControlWrapEl,
      this.toastEl
    );
  }

  public setMusicActive(enabled: boolean): void {
    if (enabled) {
      this.musicBadgeEl.classList.remove('is-muted');
      this.musicBadgeEl.textContent = '🎵';
      this.musicBadgeEl.title = 'Hintergrundmusik stummschalten (Taste M oder Klick)';
    } else {
      this.musicBadgeEl.classList.add('is-muted');
      this.musicBadgeEl.textContent = '🔇';
      this.musicBadgeEl.title = 'Hintergrundmusik einschalten (Taste M oder Klick)';
    }
  }

  public setMusicVolume(volume: number): void {
    const pct = Math.round(Math.max(0, Math.min(1, volume)) * 100);
    this.musicSliderEl.value = String(pct);
    this.musicVolumeLabelEl.textContent = `${pct}%`;
    this.setMusicActive(pct > 0);
  }

  public showToast(message: string, durationMs = 2800): void {
    if (this.toastTimeout !== null) {
      window.clearTimeout(this.toastTimeout);
    }
    this.toastEl.textContent = message;
    this.toastEl.classList.remove('is-hidden');
    this.toastTimeout = window.setTimeout(() => {
      this.toastEl.classList.add('is-hidden');
      this.toastTimeout = null;
    }, durationMs);
  }

  public setTerrainPreset(presetKey: TerrainPresetKey): void {
    this.currentPresetKey = presetKey;
    this.updatePresetBadgeText();
    this.renderPresetModalContent();
    const config = TERRAIN_PRESETS[presetKey];
    this.showToast(`🎨 Bodenstil [${config.numberKey}]: ${config.name}`);
  }

  private updatePresetBadgeText(): void {
    const config = TERRAIN_PRESETS[this.currentPresetKey];
    this.presetBadgeEl.textContent = `🎨 Boden: ${config.numberKey}. ${config.name}`;
  }

  public togglePresetModal(): void {
    this.isPresetModalOpen = !this.isPresetModalOpen;
    if (this.isPresetModalOpen) {
      this.presetModalEl.classList.remove('is-hidden');
      if (this.isPerfModalOpen) {
        this.togglePerfModal();
      }
    } else {
      this.presetModalEl.classList.add('is-hidden');
    }
  }

  public togglePerfModal(): void {
    this.isPerfModalOpen = !this.isPerfModalOpen;
    if (this.isPerfModalOpen) {
      this.perfModalEl.classList.remove('is-hidden');
      if (this.isPresetModalOpen) {
        this.togglePresetModal();
      }
    } else {
      this.perfModalEl.classList.add('is-hidden');
    }
  }

  private renderPresetModalContent(): void {
    const keys: TerrainPresetKey[] = ['erzgebirge', 'sonnig', 'mooswald', 'smaragd'];
    this.presetModalEl.innerHTML = `
      <div style="font-weight: 700; color: var(--accent-gold); margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
        <span>Boden- & Wegtexturen wählen</span>
        <span style="font-size: 0.72rem; color: var(--text-muted);">Tasten 1–4</span>
      </div>
      <div style="display: flex; flex-direction: column; gap: 0.45rem;">
        ${keys
          .map((k) => {
            const p = TERRAIN_PRESETS[k];
            const isSelected = k === this.currentPresetKey;
            return `
              <button type="button" class="preset-option-btn ${isSelected ? 'is-selected' : ''}" data-preset="${k}">
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;">
                  <span style="font-weight: 700;">${p.numberKey}. ${p.name}</span>
                  <div style="display: flex; gap: 4px; align-items: center;">
                    <span style="display: inline-block; width: 14px; height: 14px; border-radius: 50%; background: ${p.grassBaseColor}; border: 1px solid rgba(255,255,255,0.4);" title="Wiese: ${p.grassBaseColor}"></span>
                    <span style="display: inline-block; width: 14px; height: 14px; border-radius: 50%; background: ${p.pathBaseColor}; border: 1px solid rgba(255,255,255,0.4);" title="Weg: ${p.pathBaseColor}"></span>
                    <span style="font-size: 0.7rem; color: ${isSelected ? 'var(--accent-gold)' : 'var(--text-muted)'}; margin-left: 4px;">${isSelected ? '● Aktiv' : p.badge}</span>
                  </div>
                </div>
                <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">${p.subtitle}</div>
              </button>
            `;
          })
          .join('')}
      </div>
    `;

    this.presetModalEl.querySelectorAll<HTMLButtonElement>('.preset-option-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pKey = btn.dataset.preset as TerrainPresetKey;
        if (pKey && this.callbacks.onSelectTerrainPreset) {
          this.callbacks.onSelectTerrainPreset(pKey);
        }
      });
    });
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
      const summaryText = `⚡ ${metrics.fps} FPS · ${metrics.drawCalls} DC`;
      if (this.lastPerfText !== summaryText) {
        this.lastPerfText = summaryText;
        this.perfBadgeEl.textContent = summaryText;
      }

      if (this.isPerfModalOpen) {
        this.perfModalEl.innerHTML = `
          <div style="font-weight: 700; color: var(--accent-gold); margin-bottom: 0.4rem; display: flex; justify-content: space-between;">
            <span>Echtzeit-Metriken</span>
            <span style="color: var(--accent-green);">${metrics.fps} FPS</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr auto; gap: 0.2rem 0.8rem; font-size: 0.78rem;">
            <span style="color: var(--text-muted);">Draw Calls:</span>
            <span style="font-weight: 600;">${metrics.drawCalls}</span>
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
            ✔ Splatmap Terrain Shader (1 PBR Mesh)<br>
            ✔ InstancedMesh Wälder<br>
            ✔ Tastatur: 1–4 für Bodenstile
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
