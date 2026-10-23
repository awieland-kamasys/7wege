import { CrossroadsScene } from '../game/scenes/CrossroadsScene';
import { CrossroadsState } from '../game/systems/CrossroadsState';
import { DialogueSystem } from '../game/systems/DialogueSystem';
import { SoundService } from '../game/systems/SoundService';
import { SpeechService } from '../game/systems/SpeechService';
import { HudOverlay } from '../ui/HudOverlay';
import { DebugPanel } from '../ui/DebugPanel';
import { TerrainPresetKey } from '../game/textures/TerrainPresets';

/**
 * Verbindet Spielzustand, Kommunikationssystem, Sprachausgabe, Soundeffekte, Tastatur- und Mauseingabe, Three.js-Szene und DOM-Oberfläche.
 */
export class GameApp {
  private readonly canvas: HTMLCanvasElement;
  private readonly state: CrossroadsState;
  private readonly dialogue: DialogueSystem;
  private readonly speech: SpeechService;
  private readonly sound: SoundService;
  private readonly scene: CrossroadsScene;
  private readonly hud: HudOverlay;
  private readonly debugPanel: DebugPanel;
  private readonly pressedKeys = new Set<string>();
  private animationFrameId = 0;
  private lastTime = performance.now();

  // Zustand für Maus- und Gestensteuerung (Drag = Kamera drehen, Pinch = Zoom, Klick = Gehen / Sprechen / Auswählen)
  private isPointerDown = false;
  private isDraggingCamera = false;
  private pointerDownButton = 0;
  private pointerStartX = 0;
  private pointerStartY = 0;
  private lastPointerX = 0;
  private lastPointerY = 0;
  private currentPointerClientX = 0;
  private currentPointerClientY = 0;
  private hasPendingPointerHover = false;
  private readonly activePointers = new Map<number, { clientX: number; clientY: number }>();
  private lastPinchDistance = 0;
  private isPinching = false;
  private pendingTalkToNpc = false;
  private pendingTalkToGreyMan = false;
  private pendingTalkToNixie = false;
  private pendingTalkToGiant = false;
  private pendingTalkToWoodWoman = false;
  private pendingTalkToDevil = false;
  private pendingTalkToWildHunter = false;
  private pendingTalkToWoodWomanLodge = false;
  private pendingInspectGate = false;
  private pendingToggleChest = false;
  private stepDistanceAccumulator = 1.15;

  constructor(canvas: HTMLCanvasElement, uiRoot: HTMLElement) {
    this.canvas = canvas;
    this.state = new CrossroadsState();
    this.dialogue = new DialogueSystem();
    this.speech = new SpeechService();
    this.sound = new SoundService();
    this.scene = new CrossroadsScene(canvas);
    this.hud = new HudOverlay(uiRoot, {
      onSelectPath: (pathId) => {
        if (!this.state.isOnClearing()) {
          return;
        }
        this.closeDialogueAndSpeech();
        this.clearPendingActions();
        this.state.setTargetToPathEntrance(pathId);
      },
      onReturnToClearing: () => {
        this.returnToClearing();
      },
      onTalkToNpc: () => {
        this.initiateTalkToNpc();
      },
      onTalkToGreyMan: () => {
        this.initiateTalkToGreyMan();
      },
      onToggleChest: () => {
        this.initiateToggleChest();
      },
      onSelectDialogueOption: (optionIndex) => {
        this.handleDialogueOption(optionIndex);
      },
      onCloseDialogue: () => {
        this.closeDialogueAndSpeech();
      },
      onToggleSpeech: () => {
        return this.speech.toggleEnabled();
      },
      onToggleMusic: () => {
        const enabled = this.sound.toggleMusic();
        this.hud.setMusicActive(enabled);
        return enabled;
      },
      onSetMusicVolume: (volume) => {
        this.sound.setMusicVolume(volume);
      },
      getMusicVolume: () => {
        return this.sound.getMusicVolume();
      },
      onSelectTerrainPreset: (presetKey) => {
        this.setTerrainPreset(presetKey);
      },
    });

    this.debugPanel = new DebugPanel(uiRoot, {
      onToggleShadows: (enabled) => this.scene.setShadowsEnabled(enabled),
      isShadowsEnabled: () => this.scene.isShadowsEnabled(),
      onToggleTerrainSimple: (enabled) => this.scene.setTerrainSimpleMode(enabled),
      isTerrainSimple: () => this.scene.isTerrainSimpleMode(),
      onSetPixelRatio: (dpr) => this.scene.setOverridePixelRatio(dpr),
      getOverridePixelRatio: () => this.scene.getOverridePixelRatio(),
      onToggleMusic: () => {
        const enabled = this.sound.toggleMusic();
        this.hud.setMusicActive(enabled);
        return enabled;
      },
      isMusicEnabled: () => this.sound.isMusicEnabled(),
      onSetMusicVolume: (vol) => {
        this.sound.setMusicVolume(vol);
        this.hud.setMusicVolume(vol);
      },
      getMusicVolume: () => this.sound.getMusicVolume(),
      getLocationBlendWeight: () => this.sound.getLocationBlendWeight(),
      getActiveLocation: () => this.sound.getActiveLocation(),
      getNixieBlendWeight: () => this.sound.getNixieBlendWeight(),
      getGpuDiagnostics: () => this.scene.getGpuDiagnostics(),
      getRenderMetrics: () => this.scene.getRenderMetrics(),
      onTogglePathBoundary: () => {
        const disabled = this.state.togglePathBoundary();
        this.scene.pulseSignpostBase(disabled);
        this.sound.playGemstoneSolved();
        if (disabled) {
          this.hud.showToast('🌿 Wegbegrenzung aufgehoben: Freies Erkunden des gesamten Geländes aktiviert!', 3800);
        } else {
          this.hud.showToast('🧭 Wegbegrenzung wieder aktiv: Wandern entlang der Pfade.', 2800);
        }
        return disabled;
      },
      isPathBoundaryDisabled: () => this.state.isPathBoundaryDisabled(),
    });

    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);

    this.canvas.addEventListener('pointerdown', this.onPointerDown);
    window.addEventListener('pointermove', this.onPointerMove);
    window.addEventListener('pointerup', this.onPointerUp);
    window.addEventListener('pointercancel', this.onPointerCancel);
    this.canvas.addEventListener('wheel', this.onWheel, { passive: false });
    this.canvas.addEventListener('contextmenu', this.onContextMenu);

    // Unterbindet native Browser-Zoomgesten (z. B. Safari Pinch-to-Zoom), damit der 3D-Canvas exklusiv zoomt
    this.canvas.addEventListener('gesturestart', this.onPreventDefault, { passive: false });
    this.canvas.addEventListener('gesturechange', this.onPreventDefault, { passive: false });
    this.canvas.addEventListener('gestureend', this.onPreventDefault, { passive: false });

    // Globale Referenzen für Konsole und Debugging
    (window as any).__7WEGE_APP__ = this;
    (window as any).__7WEGE_SCENE__ = this.scene;
    (window as any).__7WEGE_STATE__ = this.state;
  }

  public start(): void {
    this.lastTime = performance.now();
    this.loop(this.lastTime);
  }

  private clearPendingActions(): void {
    this.pendingTalkToNpc = false;
    this.pendingTalkToGreyMan = false;
    this.pendingTalkToNixie = false;
    this.pendingTalkToGiant = false;
    this.pendingTalkToWoodWoman = false;
    this.pendingTalkToDevil = false;
    this.pendingTalkToWildHunter = false;
    this.pendingTalkToWoodWomanLodge = false;
    this.pendingInspectGate = false;
    this.pendingToggleChest = false;
  }

  private openDialogueNode(startNodeId: string): void {
    const node = this.dialogue.startDialogue(startNodeId);
    if (node) {
      this.speech.speak(node.text);
    }
  }

  private closeDialogueAndSpeech(): void {
    this.dialogue.closeDialogue();
    this.speech.stop();
  }

  private toggleChestWithSound(): void {
    const nowOpen = this.state.toggleChest();
    if (nowOpen) {
      this.sound.playChestOpenFanfare();
    } else {
      this.sound.playChestCloseSound();
    }
  }

  /**
   * Lässt die Spielfigur mit doppelter Geschwindigkeit (13.0 m/s)
   * flüssig zur zentralen 7-Wegekreuzung zurücklaufen.
   */
  public returnToClearing(): void {
    this.closeDialogueAndSpeech();
    this.clearPendingActions();
    this.state.returnToClearing();
  }

  public jumpToClearing(): void {
    this.closeDialogueAndSpeech();
    this.clearPendingActions();
    const pos = this.state.jumpToClearing();
    this.scene.snapCameraToPlayer(pos);
    this.sound.playFootstep();
  }

  public setTerrainPreset(presetKey: TerrainPresetKey): void {
    this.scene.setTerrainPreset(presetKey);
    this.hud.setTerrainPreset(presetKey);
  }

  private initiateTalkToNpc(): void {
    this.clearPendingActions();
    this.scene.triggerGuideCheers();
    if (this.state.isNearNpc()) {
      this.state.clearTargetPosition();
      this.openDialogueNode('root');
    } else {
      this.pendingTalkToNpc = true;
      this.state.setTargetToNpc();
    }
  }

  private initiateTalkToGreyMan(): void {
    this.clearPendingActions();
    this.closeDialogueAndSpeech();
    if (this.state.isNearGreyMan()) {
      this.state.clearTargetPosition();
      this.openDialogueNode('grey_root');
    } else {
      this.pendingTalkToGreyMan = true;
      this.state.setTargetToGreyMan();
    }
  }

  private initiateTalkToNixie(): void {
    this.clearPendingActions();
    this.closeDialogueAndSpeech();
    if (this.state.isNearNixie()) {
      this.state.clearTargetPosition();
      this.openDialogueNode('nixie_root');
    } else {
      this.pendingTalkToNixie = true;
      this.state.setTargetToNixie();
    }
  }

  private initiateTalkToGiant(): void {
    this.clearPendingActions();
    this.closeDialogueAndSpeech();
    if (this.state.isNearGiant()) {
      this.state.clearTargetPosition();
      this.openDialogueNode('giant_root');
    } else {
      this.pendingTalkToGiant = true;
      this.state.setTargetToGiant();
    }
  }

  private initiateTalkToWoodWoman(): void {
    this.clearPendingActions();
    this.closeDialogueAndSpeech();
    if (this.state.isNearWoodWoman()) {
      this.state.clearTargetPosition();
      this.openDialogueNode('wood_woman_root');
    } else {
      this.pendingTalkToWoodWoman = true;
      this.state.setTargetToWoodWoman();
    }
  }

  private initiateTalkToDevil(): void {
    this.clearPendingActions();
    this.closeDialogueAndSpeech();
    if (this.state.isNearDevil()) {
      this.state.clearTargetPosition();
      this.openDialogueNode('devil_root');
    } else {
      this.pendingTalkToDevil = true;
      this.state.setTargetToDevil();
    }
  }

  private initiateTalkToWildHunter(): void {
    this.clearPendingActions();
    this.closeDialogueAndSpeech();
    if (this.state.isNearWildHunter()) {
      this.state.clearTargetPosition();
      this.openDialogueNode('hunter_root');
    } else {
      this.pendingTalkToWildHunter = true;
      this.state.setTargetToWildHunter();
    }
  }

  private initiateTalkToWoodWomanLodge(): void {
    this.clearPendingActions();
    this.closeDialogueAndSpeech();
    if (this.state.isNearWoodWomanLodge()) {
      this.state.clearTargetPosition();
      this.openDialogueNode('wood_lodge_root');
    } else {
      this.pendingTalkToWoodWomanLodge = true;
      this.state.setTargetToWoodWomanLodge();
    }
  }

  private initiateInspectGate(): void {
    this.clearPendingActions();
    this.closeDialogueAndSpeech();
    if (this.state.isNearGate()) {
      this.state.clearTargetPosition();
      this.openDialogueNode('gate_root');
    } else {
      this.pendingInspectGate = true;
      this.state.setTargetToGate();
    }
  }

  private initiateToggleChest(): void {
    this.clearPendingActions();
    this.closeDialogueAndSpeech();
    if (this.state.isNearChest()) {
      this.state.clearTargetPosition();
      this.toggleChestWithSound();
    } else {
      this.pendingToggleChest = true;
      this.state.setTargetToChest();
    }
  }

  private handleDialogueOption(optionIndex: number): void {
    const { node, action } = this.dialogue.selectOption(optionIndex);
    if (node) {
      this.speech.speak(node.text);
    } else {
      this.speech.stop();
    }
    if (action?.type === 'select_path') {
      this.clearPendingActions();
      this.state.setTargetToPathEntrance(action.pathId);
    } else if (action?.type === 'walk_to_grey_man') {
      this.initiateTalkToGreyMan();
    } else if (action?.type === 'walk_to_nixie') {
      this.initiateTalkToNixie();
    } else if (action?.type === 'walk_to_giant') {
      this.initiateTalkToGiant();
    } else if (action?.type === 'walk_to_wood_woman') {
      this.initiateTalkToWoodWoman();
    } else if (action?.type === 'walk_to_devil') {
      this.initiateTalkToDevil();
    } else if (action?.type === 'walk_to_wild_hunter') {
      this.initiateTalkToWildHunter();
    } else if (action?.type === 'walk_to_gate') {
      this.initiateInspectGate();
    }
  }

  private onKeyDown = (event: KeyboardEvent): void => {
    this.sound.unlock();
    const key = event.key.toLowerCase();

    if (event.key === 'Escape' && this.dialogue.isOpen()) {
      this.closeDialogueAndSpeech();
      return;
    }

    // Performance-Metriken per Taste P oder F3 umschalten
    if (key === 'p' || event.key === 'F3') {
      this.hud.togglePerfModal();
      return;
    }

    // Wenn ein Gespräch offen ist, wählen die Zahlentasten 1–8 die Dialogoptionen
    if (this.dialogue.isOpen()) {
      if (key >= '1' && key <= '8') {
        const optionIdx = Number(key) - 1;
        this.handleDialogueOption(optionIdx);
        return;
      }
    } else {
      // Wenn kein Gespräch offen ist, schalten die Zahlentasten 1–4 die Boden- und Wegtexturen um
      if (key === '1') {
        this.setTerrainPreset('erzgebirge');
        return;
      }
      if (key === '2') {
        this.setTerrainPreset('sonnig');
        return;
      }
      if (key === '3') {
        this.setTerrainPreset('mooswald');
        return;
      }
      if (key === '4') {
        this.setTerrainPreset('smaragd');
        return;
      }
    }

    // Taste F oder Enter: kontextabhängige Interaktion
    if (key === 'f' || event.key === 'Enter') {
      if (!this.dialogue.isOpen()) {
        if (this.state.isNearWildHunter() && this.state.isNearWoodWomanLodge()) {
          const p = this.state.getPlayerPosition();
          const hunterPos = this.state.getWildHunterPosition();
          const woodPos = this.state.getWoodWomanLodgePosition();
          const dHunter = Math.hypot(p.x - hunterPos.x, p.z - hunterPos.z);
          const dWood = Math.hypot(p.x - woodPos.x, p.z - woodPos.z);
          if (dWood <= dHunter) {
            this.initiateTalkToWoodWomanLodge();
          } else {
            this.initiateTalkToWildHunter();
          }
        } else if (this.state.isNearWildHunter()) {
          this.initiateTalkToWildHunter();
        } else if (this.state.isNearWoodWomanLodge()) {
          this.initiateTalkToWoodWomanLodge();
        } else if (this.state.isNearDevil()) {
          this.initiateTalkToDevil();
        } else if (this.state.isNearWoodWoman()) {
          this.initiateTalkToWoodWoman();
        } else if (this.state.isNearGiant()) {
          this.initiateTalkToGiant();
        } else if (this.state.isNearNixie()) {
          this.initiateTalkToNixie();
        } else if (this.state.isNearGreyMan()) {
          this.initiateTalkToGreyMan();
        } else if (this.state.isNearGate()) {
          this.initiateInspectGate();
        } else if (this.state.isNearChest()) {
          this.initiateToggleChest();
        } else if (this.state.isNearNpc()) {
          this.initiateTalkToNpc();
        } else {
          const selected = this.state.getSelectedPath();
          if (selected?.id === 7 && this.state.getPlayerPosition().x < -8) {
            this.initiateInspectGate();
          } else if (selected?.id === 6 && this.state.getPlayerPosition().x < -8) {
            this.initiateTalkToWildHunter();
          } else if (selected?.id === 5 && this.state.getPlayerPosition().z > 8) {
            this.initiateTalkToDevil();
          } else if (selected?.id === 4 && this.state.getPlayerPosition().z > 8) {
            this.initiateTalkToWoodWoman();
          } else if (selected?.id === 3 && this.state.getPlayerPosition().x > 8) {
            this.initiateTalkToGiant();
          } else if (selected?.id === 2 && this.state.getPlayerPosition().x > 8) {
            this.initiateTalkToNixie();
          } else if (selected?.id === 1 && this.state.getPlayerPosition().z < -8) {
            this.initiateTalkToGreyMan();
          } else {
            this.initiateTalkToNpc();
          }
        }
        return;
      }
    }

    this.pressedKeys.add(key);

    // Direktwahl der Wege 1 bis 7 über Zahlentasten (nur auf der Kreuzung und wenn kein Dialog offen ist)
    if (!this.dialogue.isOpen() && this.state.isOnClearing() && key >= '1' && key <= '7') {
      const pathId = Number(key);
      this.clearPendingActions();
      this.state.setTargetToPathEntrance(pathId);
    }

    // Taste M: Dezent schwebende Hintergrundmusik ein-/ausschalten
    if (key === 'm') {
      this.sound.unlock();
      const enabled = this.sound.toggleMusic();
      this.hud.setMusicActive(enabled);
      this.hud.showToast(
        enabled ? '🎵 Hintergrundmusik: Aktiviert' : '🔇 Hintergrundmusik: Stumm'
      );
      return;
    }

    // Schneller Rücklauf zur 7-Wegekreuzung per Taste 0 oder Backspace (wenn auf Wegen unterwegs und kein Dialog offen)
    if (!this.dialogue.isOpen() && !this.state.isOnClearing() && (key === '0' || key === 'backspace')) {
      this.returnToClearing();
      return;
    }
  };

  private onKeyUp = (event: KeyboardEvent): void => {
    this.pressedKeys.delete(event.key.toLowerCase());
  };

  private onPointerDown = (event: PointerEvent): void => {
    this.activePointers.set(event.pointerId, { clientX: event.clientX, clientY: event.clientY });

    if (this.activePointers.size === 1) {
      this.sound.unlock();
      this.isPointerDown = true;
      this.isDraggingCamera = false;
      this.isPinching = false;
      this.pointerDownButton = event.button;
      this.pointerStartX = event.clientX;
      this.pointerStartY = event.clientY;
      this.lastPointerX = event.clientX;
      this.lastPointerY = event.clientY;
    } else if (this.activePointers.size >= 2) {
      // Zwei-Finger-Geste (Pinch-to-Zoom) initiiert: Drehung unterbrechen und Startabstand messen
      this.isPinching = true;
      this.isDraggingCamera = false;
      const [p1, p2] = Array.from(this.activePointers.values());
      this.lastPinchDistance = Math.hypot(p1.clientX - p2.clientX, p1.clientY - p2.clientY);
    }
  };

  private onPointerMove = (event: PointerEvent): void => {
    if (this.activePointers.has(event.pointerId)) {
      this.activePointers.set(event.pointerId, { clientX: event.clientX, clientY: event.clientY });
    }

    // Gestensteuerung auf mobilen Geräten: Zwei-Finger-Pinch zum stufenlosen Zoomen der Kamera
    if (this.activePointers.size >= 2) {
      this.isPinching = true;
      this.isDraggingCamera = false;
      const [p1, p2] = Array.from(this.activePointers.values());
      const currentDist = Math.hypot(p1.clientX - p2.clientX, p1.clientY - p2.clientY);

      if (this.lastPinchDistance > 0) {
        const diff = currentDist - this.lastPinchDistance;
        if (Math.abs(diff) > 0.5) {
          // diff > 0 -> Finger spreizen auseinander -> Hineinzoomen (Kameradistanz verringern)
          // diff < 0 -> Finger ziehen zusammen -> Herauszoomen (Kameradistanz vergrößern)
          const zoomDelta = -diff * 0.018;
          this.scene.zoomCamera(zoomDelta);
        }
      }
      this.lastPinchDistance = currentDist;
      return;
    }

    // Falls gerade ein Pinch beendet wird (noch ein Finger auf dem Display),
    // keine unerwünschte Kameradrehung oder Raycasting durchführen
    if (this.isPinching) {
      return;
    }

    if (this.isPointerDown) {
      const totalDist = Math.hypot(
        event.clientX - this.pointerStartX,
        event.clientY - this.pointerStartY
      );

      if (totalDist > 5 || this.pointerDownButton === 2 || this.pointerDownButton === 1) {
        this.isDraggingCamera = true;
      }

      if (this.isDraggingCamera) {
        const dx = event.clientX - this.lastPointerX;
        const dy = event.clientY - this.lastPointerY;
        this.scene.rotateCamera(-dx * 0.007, dy * 0.005);
        this.canvas.style.cursor = 'grabbing';
      }

      this.lastPointerX = event.clientX;
      this.lastPointerY = event.clientY;
      return;
    }

    // Mauskoordinaten für den nächsten Animationsframe merken (verhindert hunderte Raycasts pro Sekunde)
    this.currentPointerClientX = event.clientX;
    this.currentPointerClientY = event.clientY;
    this.hasPendingPointerHover = true;
  };

  /**
   * Führt das Raycasting zur Objektauswahl und Cursor-Hervorhebung exakt einmal pro Animationsframe aus,
   * falls sich die Maus bewegt hat (Framerate-Schutz bei High-DPI-/Gaming-Mäusen).
   */
  private updatePointerHover(): void {
    if (!this.hasPendingPointerHover || this.isPointerDown) {
      return;
    }
    this.hasPendingPointerHover = false;

    const hit = this.scene.raycastFromMouse(this.currentPointerClientX, this.currentPointerClientY);
    if (!hit) {
      this.scene.setHoveredPathId(null);
      this.scene.setNpcHovered(false);
      this.scene.setGreyManHovered(false);
      this.scene.setNixieHovered(false);
      this.scene.setGiantHovered(false);
      this.scene.setWoodWomanHovered(false);
      this.scene.setDevilHovered(false);
      this.scene.setWildHunterHovered(false);
      this.scene.setWoodWomanLodgeHovered(false);
      this.scene.setGateHovered(false);
      this.scene.setBoulderHovered(false);
      this.scene.setPuddleHovered(false);
      this.scene.setStreamHovered(false);
      this.scene.setLogHovered(false);
      this.scene.setFireHovered(false);
      this.scene.setHerbsHovered(false);
      this.scene.setChestHovered(false);
      this.scene.setSignpostCapHovered(false);
      this.canvas.style.cursor = 'grab';
      return;
    }

    this.scene.setHoveredPathId(
      hit.kind === 'sign' || hit.kind === 'path' || hit.kind === 'gemstone' ? hit.pathId : null
    );
    this.scene.setNpcHovered(hit.kind === 'npc');
    this.scene.setGreyManHovered(hit.kind === 'grey_man' || hit.kind === 'cave');
    this.scene.setNixieHovered(hit.kind === 'nixie' || hit.kind === 'pond');
    this.scene.setGiantHovered(hit.kind === 'giant' || hit.kind === 'weir');
    this.scene.setWoodWomanHovered(hit.kind === 'wood_woman' || hit.kind === 'lumber_camp');
    this.scene.setDevilHovered(hit.kind === 'devil' || hit.kind === 'hell_chasm');
    this.scene.setWildHunterHovered(hit.kind === 'wild_hunter' || hit.kind === 'hunting_lodge');
    this.scene.setWoodWomanLodgeHovered(hit.kind === 'wood_woman_lodge' || hit.kind === 'herb_garden');
    this.scene.setGateHovered(hit.kind === 'gate');
    this.scene.setBoulderHovered(hit.kind === 'boulder');
    this.scene.setPuddleHovered(hit.kind === 'puddle');
    this.scene.setStreamHovered(hit.kind === 'stream');
    this.scene.setLogHovered(hit.kind === 'log');
    this.scene.setFireHovered(hit.kind === 'fire');
    this.scene.setHerbsHovered(hit.kind === 'herbs');
    this.scene.setChestHovered(hit.kind === 'chest');
    this.scene.setSignpostCapHovered(hit.kind === 'signpost_cap');
    this.scene.setSignpostBaseHovered(hit.kind === 'signpost_base');

    this.canvas.style.cursor = hit.kind === 'ground' ? 'default' : 'pointer';
  };

  private onPointerCancel = (event: PointerEvent): void => {
    this.onPointerUp(event);
  };

  private onPointerUp = (event: PointerEvent): void => {
    this.activePointers.delete(event.pointerId);

    if (this.activePointers.size < 2) {
      this.lastPinchDistance = 0;
    }

    // Wenn ein Pinch aktiv war, sicherstellen, dass beim Loslassen kein Klick/Tap ausgelöst wird
    if (this.isPinching) {
      if (this.activePointers.size === 0) {
        this.isPinching = false;
        this.isPointerDown = false;
        this.isDraggingCamera = false;
        this.canvas.style.cursor = 'default';
      }
      return;
    }

    if (!this.isPointerDown) {
      return;
    }

    const wasDragging = this.isDraggingCamera;
    const button = this.pointerDownButton;
    this.isPointerDown = false;
    this.isDraggingCamera = false;
    this.canvas.style.cursor = 'default';

    if (!wasDragging && button === 0) {
      const hit = this.scene.raycastFromMouse(event.clientX, event.clientY);
      if (!hit) {
        return;
      }

      if (hit.kind === 'npc') {
        this.initiateTalkToNpc();
        return;
      }

      if (hit.kind === 'grey_man' || hit.kind === 'cave') {
        this.initiateTalkToGreyMan();
        return;
      }

      if (hit.kind === 'nixie' || hit.kind === 'pond') {
        this.initiateTalkToNixie();
        return;
      }

      if (hit.kind === 'giant' || hit.kind === 'weir') {
        this.initiateTalkToGiant();
        return;
      }

      if (hit.kind === 'wood_woman' || hit.kind === 'lumber_camp') {
        this.initiateTalkToWoodWoman();
        return;
      }

      if (hit.kind === 'devil' || hit.kind === 'hell_chasm') {
        this.initiateTalkToDevil();
        return;
      }

      if (hit.kind === 'wild_hunter' || hit.kind === 'hunting_lodge') {
        this.initiateTalkToWildHunter();
        return;
      }

      if (hit.kind === 'wood_woman_lodge' || hit.kind === 'herb_garden') {
        this.initiateTalkToWoodWomanLodge();
        return;
      }

      if (hit.kind === 'gate') {
        this.initiateInspectGate();
        return;
      }

      if (hit.kind === 'gemstone') {
        if (hit.pathId === 1 && this.state.isPath1Blocked()) {
          // Klick auf den rotierenden grünen Smaragd von Weg 1 entfernt den blockierenden Felsbrocken!
          this.state.removePath1Boulder();
          this.scene.pulseGemstone(1);
          this.scene.removePath1BoulderVisual();
          this.sound.playBoulderBreakSound();
          this.clearPendingActions();
          this.closeDialogueAndSpeech();
          this.state.setTargetToPathEntrance(1);
          return;
        }

        if (hit.pathId === 2 && this.state.isPath2Blocked()) {
          // Klick auf den rotierenden türkisfarbenen Aquamarin von Weg 2 lässt die Wasserpfütze versickern!
          this.state.removePath2Puddle();
          this.scene.pulseGemstone(2);
          this.scene.removePath2PuddleVisual();
          this.sound.playPuddleDrainSound();
          this.clearPendingActions();
          this.closeDialogueAndSpeech();
          this.state.setTargetToPathEntrance(2);
          return;
        }

        if (hit.pathId === 3 && this.state.isPath3Blocked()) {
          // Klick auf den rotierenden saphirblauen Edelstein von Weg 3 bändigt den Gebirgsbach!
          this.state.removePath3Stream();
          this.scene.pulseGemstone(3);
          this.scene.removePath3StreamVisual();
          this.sound.playStreamDrainSound();
          this.clearPendingActions();
          this.closeDialogueAndSpeech();
          this.state.setTargetToPathEntrance(3);
          return;
        }

        if (hit.pathId === 4 && this.state.isPath4Blocked()) {
          // Klick auf den rotierenden bernsteinfarbenen Edelstein von Weg 4 lässt den Baumstamm zerbersten!
          this.state.removePath4Log();
          this.scene.pulseGemstone(4);
          this.scene.removePath4LogVisual();
          this.sound.playLogBreakSound();
          this.clearPendingActions();
          this.closeDialogueAndSpeech();
          this.state.setTargetToPathEntrance(4);
          return;
        }

        if (hit.pathId === 5 && this.state.isPath5Blocked()) {
          // Klick auf den rotierenden roten Rubin von Weg 5 löscht die Flammenwand!
          this.state.removePath5Fire();
          this.scene.pulseGemstone(5);
          this.scene.removePath5FireVisual();
          this.sound.playFireExtinguishSound();
          this.clearPendingActions();
          this.closeDialogueAndSpeech();
          this.state.setTargetToPathEntrance(5);
          return;
        }

        if (hit.pathId === 6 && this.state.isPath6Blocked()) {
          // Klick auf den rotierenden violetten Amethyst von Weg 6 lässt Geländer und Kräuter weichen!
          this.state.removePath6Herbs();
          this.scene.pulseGemstone(6);
          this.scene.removePath6HerbsVisual();
          this.sound.playHerbsClearSound();
          this.clearPendingActions();
          this.closeDialogueAndSpeech();
          this.state.setTargetToPathEntrance(6);
          return;
        }

        this.scene.pulseGemstone(hit.pathId);
        this.clearPendingActions();
        this.closeDialogueAndSpeech();
        this.state.setTargetToPathEntrance(hit.pathId);
        return;
      }

      if (hit.kind === 'chest') {
        this.initiateToggleChest();
        return;
      }

      if (hit.kind === 'signpost_cap') {
        // Klick auf die Spitze des Wegweisers löst alle Wegsperren auf!
        const hadBarriers = this.state.removeAllPathBarriers();
        this.scene.pulseSignpostCap();
        this.scene.removeAllBarriersVisual();
        this.scene.pulseAllGemstones();
        this.sound.playAllBarriersClearSound();
        this.clearPendingActions();
        this.closeDialogueAndSpeech();
        if (hadBarriers) {
          this.hud.showToast('Ein uralter Zauber durchströmt den Wegweiser – alle Wegsperren lösen sich auf!', 3500);
        } else {
          this.hud.showToast('Die Spitze des Wegweisers leuchtet auf – alle Wege sind bereits frei.', 2800);
        }
        return;
      }

      if (hit.kind === 'signpost_base') {
        // Klick auf den Sockel des Wegweisers hebt die Wegbegrenzung auf (Freies Erkunden des gesamten Geländes)
        const disabled = this.state.togglePathBoundary();
        this.scene.pulseSignpostBase(disabled);
        this.sound.playGemstoneSolved();
        this.clearPendingActions();
        this.closeDialogueAndSpeech();
        if (disabled) {
          this.hud.showToast('🌿 Wegbegrenzung aufgehoben: Du kannst nun das gesamte Gelände frei durchlaufen!', 3800);
        } else {
          this.hud.showToast('🧭 Wegbegrenzung wieder aktiv: Wandern entlang der Pfade.', 2800);
        }
        return;
      }


      this.clearPendingActions();
      this.closeDialogueAndSpeech();

      if (hit.kind === 'sign') {
        this.state.setTargetToPathEntrance(hit.pathId);
      } else if (hit.kind === 'path') {
        this.state.selectPath(hit.pathId);
        this.state.setTargetPosition(hit.point.x, hit.point.z);
      } else if (hit.kind === 'hut') {
        this.state.setTargetToHut();
      } else if (hit.kind === 'signpost') {
        this.state.setTargetToSignpost();
      } else if (hit.kind === 'ground') {
        this.state.setTargetPosition(hit.point.x, hit.point.z);
      }
    }
  };

  private onWheel = (event: WheelEvent): void => {
    event.preventDefault();
    this.scene.zoomCamera(event.deltaY * 0.01);
  };

  private onContextMenu = (event: MouseEvent): void => {
    event.preventDefault();
  };

  private onPreventDefault = (event: Event): void => {
    event.preventDefault();
  };

  private handleInput(dtSeconds: number): void {
    const speed = 6.5 * dtSeconds;
    let forward = 0;
    let strafe = 0;

    if (this.pressedKeys.has('w') || this.pressedKeys.has('arrowup')) {
      forward += 1;
    }
    if (this.pressedKeys.has('s') || this.pressedKeys.has('arrowdown')) {
      forward -= 1;
    }
    if (this.pressedKeys.has('a') || this.pressedKeys.has('arrowleft')) {
      strafe -= 1;
    }
    if (this.pressedKeys.has('d') || this.pressedKeys.has('arrowright')) {
      strafe += 1;
    }

    if (this.pressedKeys.has('q')) {
      this.scene.rotateCamera(-1.6 * dtSeconds);
    }
    if (this.pressedKeys.has('e')) {
      this.scene.rotateCamera(1.6 * dtSeconds);
    }
    if (this.pressedKeys.has('r') || this.pressedKeys.has('pageup')) {
      this.scene.rotateCamera(0, -1.3 * dtSeconds);
    }
    if (this.pressedKeys.has('f') || this.pressedKeys.has('pagedown')) {
      this.scene.rotateCamera(0, 1.3 * dtSeconds);
    }

    const prevPos = this.state.getPlayerPosition();

    if (forward !== 0 || strafe !== 0) {
      this.clearPendingActions();
      this.state.clearTargetPosition();
      const len = Math.hypot(forward, strafe);
      const normForward = forward / len;
      const normStrafe = strafe / len;

      const angle = this.scene.getCameraOrbitAngle();
      const dx = (-Math.sin(angle) * normForward + Math.cos(angle) * normStrafe) * speed;
      const dz = (-Math.cos(angle) * normForward - Math.sin(angle) * normStrafe) * speed;

      this.state.movePlayer(dx, dz);
      if (
        !this.state.isNearNpc() &&
        !this.state.isNearGreyMan() &&
        !this.state.isNearNixie() &&
        !this.state.isNearGiant() &&
        !this.state.isNearWoodWoman() &&
        !this.state.isNearDevil() &&
        !this.state.isNearWildHunter() &&
        !this.state.isNearWoodWomanLodge() &&
        !this.state.isNearGate() &&
        this.dialogue.isOpen()
      ) {
        this.closeDialogueAndSpeech();
      }
    } else {
      this.state.updateAutoWalk(dtSeconds);
      if (this.pendingTalkToNpc && this.state.isNearNpc()) {
        this.pendingTalkToNpc = false;
        this.state.clearTargetPosition();
        this.scene.triggerGuideCheers();
        this.openDialogueNode('root');
      }
      if (this.pendingTalkToGreyMan && this.state.isNearGreyMan()) {
        this.pendingTalkToGreyMan = false;
        this.state.clearTargetPosition();
        this.openDialogueNode('grey_root');
      }
      if (this.pendingTalkToNixie && this.state.isNearNixie()) {
        this.pendingTalkToNixie = false;
        this.state.clearTargetPosition();
        this.openDialogueNode('nixie_root');
      }
      if (this.pendingTalkToGiant && this.state.isNearGiant()) {
        this.pendingTalkToGiant = false;
        this.state.clearTargetPosition();
        this.openDialogueNode('giant_root');
      }
      if (this.pendingTalkToWoodWoman && this.state.isNearWoodWoman()) {
        this.pendingTalkToWoodWoman = false;
        this.state.clearTargetPosition();
        this.openDialogueNode('wood_woman_root');
      }
      if (this.pendingTalkToDevil && this.state.isNearDevil()) {
        this.pendingTalkToDevil = false;
        this.state.clearTargetPosition();
        this.openDialogueNode('devil_root');
      }
      if (this.pendingTalkToWildHunter && this.state.isNearWildHunter()) {
        this.pendingTalkToWildHunter = false;
        this.state.clearTargetPosition();
        this.openDialogueNode('hunter_root');
      }
      if (this.pendingTalkToWoodWomanLodge && this.state.isNearWoodWomanLodge()) {
        this.pendingTalkToWoodWomanLodge = false;
        this.state.clearTargetPosition();
        this.openDialogueNode('wood_lodge_root');
      }
      if (this.pendingInspectGate && this.state.isNearGate()) {
        this.pendingInspectGate = false;
        this.state.clearTargetPosition();
        this.openDialogueNode('gate_root');
      }
      if (this.pendingToggleChest && this.state.isNearChest()) {
        this.pendingToggleChest = false;
        this.state.clearTargetPosition();
        this.toggleChestWithSound();
      }
    }

    const newPos = this.state.getPlayerPosition();
    const movedDist = Math.hypot(newPos.x - prevPos.x, newPos.z - prevPos.z);
    if (movedDist > 0.004) {
      this.stepDistanceAccumulator += movedDist;
      if (this.stepDistanceAccumulator >= 1.45) {
        this.stepDistanceAccumulator -= 1.45;
        this.sound.playFootstep();
      }
    } else {
      // Beim Anhalten vorladen, damit beim nächsten Loslaufen rasch der erste Schritt erklingt
      this.stepDistanceAccumulator = 1.15;
    }
  }

  private loop = (now: number): void => {
    const dtSeconds = Math.min((now - this.lastTime) / 1000, 0.1);
    this.lastTime = now;

    this.handleInput(dtSeconds);
    this.updatePointerHover();
    this.sound.updateAmbientBirds(dtSeconds, this.dialogue.isOpen());
    this.sound.updateAmbientMusic(dtSeconds, this.dialogue.isOpen(), this.state.getPlayerPosition());

    const poi = this.state.getActivePointOfInterest();
    const currentPath = this.state.getCurrentOrClosestPath();
    const selectedPath = this.state.getSelectedPath();
    const selectedId = selectedPath ? selectedPath.id : (currentPath ? currentPath.id : null);

    try {
      this.scene.update(
        this.state.getPlayerPosition(),
        selectedId,
        this.state.getTargetPosition(),
        dtSeconds,
        this.dialogue.isOpen(),
        this.state.isChestOpen()
      );
      this.hud.update(
        poi,
        selectedId,
        this.dialogue.getCurrentNode(),
        this.state.isChestOpen(),
        this.state.isOnClearing(),
        currentPath,
        this.scene.getRenderMetrics()
      );
    } catch (err) {
      console.error('[RenderLoop] Fehler im Render-Zyklus:', err);
    }

    this.animationFrameId = requestAnimationFrame(this.loop);
  };

  public dispose(): void {
    cancelAnimationFrame(this.animationFrameId);
    this.debugPanel.close();
    this.speech.stop();
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    this.canvas.removeEventListener('pointerdown', this.onPointerDown);
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerup', this.onPointerUp);
    window.removeEventListener('pointercancel', this.onPointerCancel);
    this.canvas.removeEventListener('wheel', this.onWheel);
    this.canvas.removeEventListener('contextmenu', this.onContextMenu);
    this.canvas.removeEventListener('gesturestart', this.onPreventDefault);
    this.canvas.removeEventListener('gesturechange', this.onPreventDefault);
    this.canvas.removeEventListener('gestureend', this.onPreventDefault);
    this.scene.dispose();
  }
}
