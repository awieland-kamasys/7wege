export interface DebugLogEntry {
  timestamp: string;
  level: 'error' | 'warn' | 'info';
  message: string;
  stack?: string;
}

export interface DebugPanelCallbacks {
  onToggleShadows: (enabled: boolean) => void;
  isShadowsEnabled: () => boolean;
  onToggleTerrainSimple: (enabled: boolean) => void;
  isTerrainSimple: () => boolean;
  onSetPixelRatio: (dpr: number | null) => void;
  getOverridePixelRatio: () => number | null;
  onToggleMusic?: () => boolean;
  isMusicEnabled?: () => boolean;
  onSetMusicVolume?: (volume: number) => void;
  getMusicVolume?: () => number;
  getLocationBlendWeight?: () => number;
  getActiveLocation?: () => string;
  getActiveLocationTrack?: () => { title: string; subtitle: string; instrument: string };
  getNixieBlendWeight?: () => number;
  onTogglePathBoundary?: () => boolean;
  isPathBoundaryDisabled?: () => boolean;
  getGpuDiagnostics: () => {
    glVersion: string;
    unmaskedVendor: string;
    unmaskedRenderer: string;
    maxTextureSize: number;
    maxTextureImageUnits: number;
    maxVertexUniformVectors: number;
    devicePixelRatio: number;
    effectivePixelRatio: number;
    viewportWidth: number;
    viewportHeight: number;
    isContextLost: boolean;
    shadowsEnabled: boolean;
    terrainSimpleMode: boolean;
  };
  getRenderMetrics: () => {
    fps: number;
    drawCalls: number;
    triangles: number;
    geometries: number;
    textures: number;
    pixelRatio: number;
  };
}

// Globaler Log-Speicher, der sofort aktiv ist
const MAX_LOGS = 120;
const globalLogs: DebugLogEntry[] = [];
let onNewLogListener: (() => void) | null = null;

function addLog(level: 'error' | 'warn' | 'info', message: string, stack?: string): void {
  const d = new Date();
  const timeStr = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}.${d.getMilliseconds().toString().padStart(3, '0')}`;
  
  globalLogs.push({
    timestamp: timeStr,
    level,
    message,
    stack,
  });

  if (globalLogs.length > MAX_LOGS) {
    globalLogs.shift();
  }

  if (onNewLogListener) {
    onNewLogListener();
  }
}

// Fehler-Abfangjäger registrieren
if (typeof window !== 'undefined') {
  const origError = console.error.bind(console);
  const origWarn = console.warn.bind(console);

  console.error = (...args: unknown[]) => {
    origError(...args);
    const msg = args.map((a) => (a instanceof Error ? `${a.message}\n${a.stack ?? ''}` : typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
    addLog('error', msg);
  };

  console.warn = (...args: unknown[]) => {
    origWarn(...args);
    const msg = args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
    addLog('warn', msg);
  };

  window.addEventListener('error', (event) => {
    const errorMsg = event.error instanceof Error ? `${event.error.message}\n${event.error.stack ?? ''}` : event.message;
    addLog('error', `[Window.onerror] ${errorMsg}`);
  });

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason instanceof Error ? `${event.reason.message}\n${event.reason.stack ?? ''}` : String(event.reason);
    addLog('error', `[UnhandledRejection] ${reason}`);
  });
}

/**
 * Mobile-fähiges Debug- und Diagnose-Panel:
 * - Direkte Anzeige von WebGL-Hardware, GPU-Treiber, VRAM-Verbrauch und FPS
 * - Live-Fehlerkonsole mit Clipboard-Kopierfunktion für Smartphones (iOS & Android)
 * - Sofort-Schalter zur Fehlerisolation (Schatten aus, PBR-Shader aus, DPR-Limit)
 */
export class DebugPanel {
  private readonly container: HTMLElement;
  private readonly badgeEl: HTMLElement;
  private readonly modalEl: HTMLElement;
  private readonly callbacks: DebugPanelCallbacks;
  private isOpen = false;
  private activeTab: 'hardware' | 'troubleshoot' | 'logs' = 'hardware';
  private unreadErrors = 0;
  private updateInterval: number | null = null;

  constructor(parent: HTMLElement, callbacks: DebugPanelCallbacks) {
    this.callbacks = callbacks;
    this.container = parent;

    // 1. Schwebender Debug-Button oben rechts (ausschließlich per direktem Button-Klick öffenbar)
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'debug-badge';
    button.title = 'Diagnose & Debug-Modus umschalten (ausschließlich per Klick auf diesen Button)';
    button.innerHTML = '🪲 <span class="debug-badge-text">Debug</span>';
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });
    this.badgeEl = button;

    // 2. Modales Diagnose-Panel
    this.modalEl = document.createElement('div');
    this.modalEl.className = 'debug-modal is-hidden';
    this.modalEl.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    this.container.append(this.badgeEl, this.modalEl);

    // Klick außerhalb schließt das Debugfenster sicher
    window.addEventListener('click', (e) => {
      if (this.isOpen && !this.modalEl.contains(e.target as Node) && !this.badgeEl.contains(e.target as Node)) {
        this.close();
      }
    });

    // Auf neue Logs hören, um Zähler zu aktualisieren
    onNewLogListener = () => {
      this.unreadErrors++;
      this.updateBadge();
      if (this.isOpen && this.activeTab === 'logs') {
        this.renderLogsTab();
      }
    };

    // Automatisches Öffnen ausschließlich bei explizitem URL-Parameter ?debug=1
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('debug')) {
      this.open();
    }
  }

  public toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  public open(): void {
    this.isOpen = true;
    this.unreadErrors = 0;
    this.updateBadge();
    this.modalEl.classList.remove('is-hidden');
    this.render();

    if (this.updateInterval === null) {
      this.updateInterval = window.setInterval(() => {
        if (this.isOpen && this.activeTab === 'hardware') {
          this.renderHardwareTab();
        }
      }, 750);
    }
  }

  public close(): void {
    this.isOpen = false;
    this.modalEl.classList.add('is-hidden');
    if (this.updateInterval !== null) {
      window.clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  private updateBadge(): void {
    if (this.unreadErrors > 0) {
      this.badgeEl.innerHTML = `🪲 <span class="debug-badge-text">Debug</span> <span class="debug-error-count">${this.unreadErrors}</span>`;
      this.badgeEl.classList.add('has-errors');
    } else {
      this.badgeEl.innerHTML = '🪲 <span class="debug-badge-text">Debug</span>';
      this.badgeEl.classList.remove('has-errors');
    }
  }

  private render(): void {
    this.modalEl.innerHTML = `
      <div class="debug-header">
        <div class="debug-title">🛠️ 7Wege Diagnose & Debug</div>
        <button class="debug-close-btn" aria-label="Schließen">✕</button>
      </div>
      <div class="debug-tabs">
        <button class="debug-tab ${this.activeTab === 'hardware' ? 'is-active' : ''}" data-tab="hardware">Hardware & GPU</button>
        <button class="debug-tab ${this.activeTab === 'troubleshoot' ? 'is-active' : ''}" data-tab="troubleshoot">Schalter & Tests</button>
        <button class="debug-tab ${this.activeTab === 'logs' ? 'is-active' : ''}" data-tab="logs">Fehler-Log (${globalLogs.length})</button>
      </div>
      <div class="debug-content" id="debug-tab-content"></div>
    `;

    const closeBtn = this.modalEl.querySelector('.debug-close-btn');
    closeBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.close();
    });

    const tabButtons = this.modalEl.querySelectorAll<HTMLButtonElement>('.debug-tab');
    tabButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const tab = btn.dataset.tab as 'hardware' | 'troubleshoot' | 'logs';
        if (tab) {
          this.activeTab = tab;
          tabButtons.forEach((b) => b.classList.remove('is-active'));
          btn.classList.add('is-active');
          this.renderCurrentTab();
        }
      });
    });

    this.renderCurrentTab();
  }

  private renderCurrentTab(): void {
    if (this.activeTab === 'hardware') {
      this.renderHardwareTab();
    } else if (this.activeTab === 'troubleshoot') {
      this.renderTroubleshootTab();
    } else if (this.activeTab === 'logs') {
      this.renderLogsTab();
    }
  }

  private renderHardwareTab(): void {
    const content = this.modalEl.querySelector('#debug-tab-content');
    if (!content) return;

    const gpu = this.callbacks.getGpuDiagnostics();
    const metrics = this.callbacks.getRenderMetrics();

    content.innerHTML = `
      <div class="debug-section">
        <div class="debug-section-title">📊 Live-Leistung</div>
        <div class="debug-grid">
          <span class="debug-label">Bildrate (FPS):</span>
          <span class="debug-val" style="color: ${metrics.fps >= 45 ? '#8eed98' : metrics.fps >= 25 ? '#ffd479' : '#ff7979'}; font-weight: 700;">${metrics.fps} FPS</span>
          <span class="debug-label">Draw Calls:</span>
          <span class="debug-val">${metrics.drawCalls}</span>
          <span class="debug-label">Dreiecke im Frame:</span>
          <span class="debug-val">${metrics.triangles.toLocaleString()}</span>
          <span class="debug-label">VRAM Geometrien:</span>
          <span class="debug-val">${metrics.geometries}</span>
          <span class="debug-label">VRAM Texturen:</span>
          <span class="debug-val">${metrics.textures}</span>
        </div>
      </div>

      <div class="debug-section">
        <div class="debug-section-title">📱 Grafiktreiber & Display</div>
        <div class="debug-grid">
          <span class="debug-label">GPU-Treiber:</span>
          <span class="debug-val debug-break">${gpu.unmaskedRenderer}</span>
          <span class="debug-label">GPU-Hersteller:</span>
          <span class="debug-val">${gpu.unmaskedVendor}</span>
          <span class="debug-label">WebGL-Version:</span>
          <span class="debug-val">${gpu.glVersion}</span>
          <span class="debug-label">Device Pixel Ratio:</span>
          <span class="debug-val">${gpu.devicePixelRatio} (Aktiv: ${gpu.effectivePixelRatio})</span>
          <span class="debug-label">Viewport-Auflösung:</span>
          <span class="debug-val">${gpu.viewportWidth} × ${gpu.viewportHeight} px</span>
          <span class="debug-label">Max Texture Size:</span>
          <span class="debug-val">${gpu.maxTextureSize} px</span>
          <span class="debug-label">Max Texture Units:</span>
          <span class="debug-val">${gpu.maxTextureImageUnits}</span>
          <span class="debug-label">WebGL Kontext-Status:</span>
          <span class="debug-val" style="color: ${gpu.isContextLost ? '#ff7979' : '#8eed98'}; font-weight: 600;">${gpu.isContextLost ? '⚠️ Kontext VERLOREN' : 'OK (Aktiv)'}</span>
        </div>
      </div>

      <div class="debug-section">
        <div class="debug-section-title">🌐 User-Agent & Plattform</div>
        <div class="debug-raw-ua">${navigator.userAgent}</div>
      </div>
    `;
  }

  private renderTroubleshootTab(): void {
    const content = this.modalEl.querySelector('#debug-tab-content');
    if (!content) return;

    const gpu = this.callbacks.getGpuDiagnostics();
    const currentDprOverride = this.callbacks.getOverridePixelRatio();

    content.innerHTML = `
      <div class="debug-section">
        <div class="debug-section-title">⚡ Schnelldiagnose & Isolierung</div>
        <p class="debug-hint">Schalte einzelne Features aus, um zu ermitteln, welche Komponente auf Mobilgeräten Abstürze oder Fehlfarben verursacht:</p>
        
        <div class="debug-toggle-group">
          <div class="debug-toggle-row">
            <div>
              <div class="debug-toggle-name">Dynamische Schatten</div>
              <div class="debug-toggle-desc">Schattenwurf der Sonne ausschalten (spart VRAM & verhindert iOS OOM-Crashes)</div>
            </div>
            <button class="debug-btn ${gpu.shadowsEnabled ? 'is-active' : ''}" id="btn-toggle-shadows">
              ${gpu.shadowsEnabled ? 'Aktiviert' : 'Ausgeschaltet'}
            </button>
          </div>

          <div class="debug-toggle-row">
            <div>
              <div class="debug-toggle-name">Gelände-Shader-Modus</div>
              <div class="debug-toggle-desc">PBR-Splatmap-Shader vs. einfache Wiese (Gegenprobe für Android S10 Farbbug)</div>
            </div>
            <button class="debug-btn ${gpu.terrainSimpleMode ? 'is-warning' : 'is-active'}" id="btn-toggle-terrain">
              ${gpu.terrainSimpleMode ? 'Einfach (Gras)' : 'Erweitert (SplatMap)'}
            </button>
          </div>

          <div class="debug-toggle-row">
            <div>
              <div class="debug-toggle-name">Pixel Ratio (DPR) Limit</div>
              <div class="debug-toggle-desc">Senkt Render-Auflösung auf High-DPI Displays (z. B. iPhone 16 Pro Max)</div>
            </div>
            <div class="debug-btn-group">
              <button class="debug-btn-sm ${currentDprOverride === 1.0 ? 'is-active' : ''}" data-dpr="1.0">1.0</button>
              <button class="debug-btn-sm ${currentDprOverride === 1.25 ? 'is-active' : ''}" data-dpr="1.25">1.25</button>
              <button class="debug-btn-sm ${currentDprOverride === 1.5 ? 'is-active' : ''}" data-dpr="1.5">1.5</button>
              <button class="debug-btn-sm ${currentDprOverride === null ? 'is-active' : ''}" data-dpr="auto">Auto</button>
            </div>
          </div>

          <div class="debug-toggle-row">
            <div>
              <div class="debug-toggle-name">Wegbegrenzung (Freies Laufen)</div>
              <div class="debug-toggle-desc">Wegbegrenzung aufheben (Klick auf Sockel des Wegweisers oder hier umschalten)</div>
            </div>
            <button class="debug-btn ${this.callbacks.isPathBoundaryDisabled?.() ? 'is-active' : ''}" id="btn-toggle-boundary">
              ${this.callbacks.isPathBoundaryDisabled?.() ? '🌿 Freies Erkunden' : '🧭 Begrenzung aktiv'}
            </button>
          </div>

          <div class="debug-toggle-row">
            <div>
              <div class="debug-toggle-name">Musik: ${this.callbacks.getActiveLocationTrack?.()?.title ?? 'Lichtung im Morgendunst'}</div>
              <div class="debug-toggle-desc">${this.callbacks.getActiveLocationTrack?.()?.subtitle ?? 'Waldkreuzung'} · ${this.callbacks.getActiveLocationTrack?.()?.instrument ?? 'Waldharfe'} (Schauplatz: ${Math.round((this.callbacks.getLocationBlendWeight?.() ?? 0) * 100)} %, Lautstärke: ${Math.round((this.callbacks.getMusicVolume?.() ?? 0.5) * 100)} %)</div>
            </div>
            <button class="debug-btn ${this.callbacks.isMusicEnabled?.() ? 'is-active' : ''}" id="btn-toggle-music">
              ${this.callbacks.isMusicEnabled?.() ? '🎵 Aktiv' : '🔇 Stumm'}
            </button>
          </div>

          <div class="debug-toggle-row">
            <div>
              <div class="debug-toggle-name">Test-Fehler erzeugen</div>
              <div class="debug-toggle-desc">Löst gezielt eine Ausnahme aus, um die Fehlerkonsole zu prüfen</div>
            </div>
            <button class="debug-btn is-danger" id="btn-test-error">Test-Error</button>
          </div>
        </div>
      </div>
    `;

    const shadowBtn = content.querySelector('#btn-toggle-shadows');
    shadowBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const next = !gpu.shadowsEnabled;
      this.callbacks.onToggleShadows(next);
      this.renderTroubleshootTab();
    });

    const terrainBtn = content.querySelector('#btn-toggle-terrain');
    terrainBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const next = !gpu.terrainSimpleMode;
      this.callbacks.onToggleTerrainSimple(next);
      this.renderTroubleshootTab();
    });

    const dprBtns = content.querySelectorAll<HTMLButtonElement>('.debug-btn-sm');
    dprBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const dprVal = btn.dataset.dpr;
        if (dprVal === 'auto') {
          this.callbacks.onSetPixelRatio(null);
        } else if (dprVal) {
          this.callbacks.onSetPixelRatio(parseFloat(dprVal));
        }
        this.renderTroubleshootTab();
      });
    });

    const boundaryBtn = content.querySelector('#btn-toggle-boundary');
    boundaryBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.callbacks.onTogglePathBoundary?.();
      this.renderTroubleshootTab();
    });

    const musicBtn = content.querySelector('#btn-toggle-music');
    musicBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.callbacks.onToggleMusic?.();
      this.renderTroubleshootTab();
    });

    const testErrorBtn = content.querySelector('#btn-test-error');
    testErrorBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      console.error(new Error('Manueller Testfehler aus dem Debug-Panel zur Überprüfung der Diagnosekonsole.'));
    });
  }

  private renderLogsTab(): void {
    const content = this.modalEl.querySelector('#debug-tab-content');
    if (!content) return;

    const logsHtml = globalLogs.length === 0
      ? '<div class="debug-empty-logs">Bisher keine Fehler oder Warnungen erfasst. Alles läuft ruhig!</div>'
      : globalLogs
          .slice()
          .reverse()
          .map((log) => `
            <div class="debug-log-item debug-log-${log.level}">
              <div class="debug-log-meta">
                <span class="debug-log-level">${log.level.toUpperCase()}</span>
                <span class="debug-log-time">${log.timestamp}</span>
              </div>
              <div class="debug-log-msg">${this.escapeHtml(log.message)}</div>
              ${log.stack ? `<pre class="debug-log-stack">${this.escapeHtml(log.stack)}</pre>` : ''}
            </div>
          `)
          .join('');

    content.innerHTML = `
      <div class="debug-section">
        <div class="debug-log-actions">
          <button class="debug-btn is-active" id="btn-copy-diagnostics">📋 Diagnose & Logs kopieren</button>
          <button class="debug-btn" id="btn-clear-logs">🗑️ Leeren</button>
        </div>
        <div class="debug-log-list">${logsHtml}</div>
      </div>
    `;

    const copyBtn = content.querySelector<HTMLButtonElement>('#btn-copy-diagnostics');
    copyBtn?.addEventListener('click', async (e) => {
      e.stopPropagation();
      const text = this.buildDiagnosticReport();
      try {
        await navigator.clipboard.writeText(text);
        copyBtn.textContent = '✅ In die Zwischenablage kopiert!';
        setTimeout(() => {
          if (copyBtn) copyBtn.textContent = '📋 Diagnose & Logs kopieren';
        }, 2200);
      } catch (err) {
        copyBtn.textContent = 'Fehler beim Kopieren';
        console.warn('Clipboard-Fehler:', err);
      }
    });

    const clearBtn = content.querySelector('#btn-clear-logs');
    clearBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      globalLogs.length = 0;
      this.unreadErrors = 0;
      this.updateBadge();
      this.renderLogsTab();
    });
  }

  private buildDiagnosticReport(): string {
    const gpu = this.callbacks.getGpuDiagnostics();
    const metrics = this.callbacks.getRenderMetrics();

    const lines: string[] = [
      '=== 7WEGE DIAGNOSE- & DEBUG-BERICHT ===',
      `Erstellt: ${new Date().toISOString()}`,
      `URL: ${window.location.href}`,
      '',
      '--- HARDWARE & GRAFIKTREIBER ---',
      `GPU Renderer: ${gpu.unmaskedRenderer}`,
      `GPU Vendor: ${gpu.unmaskedVendor}`,
      `WebGL Version: ${gpu.glVersion}`,
      `Viewport: ${gpu.viewportWidth}x${gpu.viewportHeight}`,
      `DevicePixelRatio: ${gpu.devicePixelRatio} (Aktiv: ${gpu.effectivePixelRatio})`,
      `Max Texture Size: ${gpu.maxTextureSize}`,
      `Max Texture Units: ${gpu.maxTextureImageUnits}`,
      `Max Uniform Vectors: ${gpu.maxVertexUniformVectors}`,
      `Context Lost: ${gpu.isContextLost}`,
      `Schatten aktiv: ${gpu.shadowsEnabled}`,
      `Einfaches Terrain aktiv: ${gpu.terrainSimpleMode}`,
      '',
      '--- LEISTUNG ---',
      `FPS: ${metrics.fps}`,
      `Draw Calls: ${metrics.drawCalls}`,
      `Dreiecke: ${metrics.triangles}`,
      `Geometrien: ${metrics.geometries}`,
      `Texturen: ${metrics.textures}`,
      '',
      '--- BROWSER & BETRIEBSSYSTEM ---',
      `User-Agent: ${navigator.userAgent}`,
      '',
      `--- FEHLER- UND WARNUNGS-PROTOKOLL (${globalLogs.length} Einträge) ---`,
    ];

    if (globalLogs.length === 0) {
      lines.push('Keine Fehler protokolliert.');
    } else {
      globalLogs.forEach((log, idx) => {
        lines.push(`[#${idx + 1}] [${log.timestamp}] [${log.level.toUpperCase()}] ${log.message}`);
        if (log.stack) {
          lines.push(`  Stack: ${log.stack}`);
        }
      });
    }

    lines.push('=== ENDE DES BERICHTS ===');
    return lines.join('\n');
  }

  private escapeHtml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}
