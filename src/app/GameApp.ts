import { CrossroadsScene } from '../game/scenes/CrossroadsScene';
import { CrossroadsState } from '../game/systems/CrossroadsState';
import { DialogueSystem } from '../game/systems/DialogueSystem';
import { SoundService } from '../game/systems/SoundService';
import { SpeechService } from '../game/systems/SpeechService';
import { HudOverlay } from '../ui/HudOverlay';

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
  private readonly pressedKeys = new Set<string>();
  private animationFrameId = 0;
  private lastTime = performance.now();

  // Zustand für Maussteuerung (Drag = Kamera drehen, Klick = Gehen / Sprechen / Truhe öffnen / Auswählen)
  private isPointerDown = false;
  private isDraggingCamera = false;
  private pointerDownButton = 0;
  private pointerStartX = 0;
  private pointerStartY = 0;
  private lastPointerX = 0;
  private lastPointerY = 0;
  private pendingTalkToNpc = false;
  private pendingToggleChest = false;

  constructor(canvas: HTMLCanvasElement, uiRoot: HTMLElement) {
    this.canvas = canvas;
    this.state = new CrossroadsState();
    this.dialogue = new DialogueSystem();
    this.speech = new SpeechService();
    this.sound = new SoundService();
    this.scene = new CrossroadsScene(canvas);
    this.hud = new HudOverlay(uiRoot, {
      onSelectPath: (pathId) => {
        this.closeDialogueAndSpeech();
        this.pendingTalkToNpc = false;
        this.pendingToggleChest = false;
        this.state.setTargetToPathEntrance(pathId);
      },
      onTalkToNpc: () => {
        this.initiateTalkToNpc();
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
    });

    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);

    this.canvas.addEventListener('pointerdown', this.onPointerDown);
    window.addEventListener('pointermove', this.onPointerMove);
    window.addEventListener('pointerup', this.onPointerUp);
    this.canvas.addEventListener('wheel', this.onWheel, { passive: false });
    this.canvas.addEventListener('contextmenu', this.onContextMenu);
  }

  public start(): void {
    this.lastTime = performance.now();
    this.loop(this.lastTime);
  }

  private openRootDialogue(): void {
    const node = this.dialogue.startDialogue('root');
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

  private initiateTalkToNpc(): void {
    this.pendingToggleChest = false;
    if (this.state.isNearNpc()) {
      this.pendingTalkToNpc = false;
      this.state.clearTargetPosition();
      this.openRootDialogue();
    } else {
      this.pendingTalkToNpc = true;
      this.state.setTargetToNpc();
    }
  }

  private initiateToggleChest(): void {
    this.pendingTalkToNpc = false;
    this.closeDialogueAndSpeech();
    if (this.state.isNearChest()) {
      this.pendingToggleChest = false;
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
      this.pendingTalkToNpc = false;
      this.pendingToggleChest = false;
      this.state.setTargetToPathEntrance(action.pathId);
    }
  }

  private onKeyDown = (event: KeyboardEvent): void => {
    const key = event.key.toLowerCase();

    if (event.key === 'Escape' && this.dialogue.isOpen()) {
      this.closeDialogueAndSpeech();
      return;
    }

    // Wenn ein Gespräch offen ist, wählen die Zahlentasten 1–8 die Dialogoptionen
    if (this.dialogue.isOpen()) {
      if (key >= '1' && key <= '8') {
        const optionIdx = Number(key) - 1;
        this.handleDialogueOption(optionIdx);
        return;
      }
    }

    // Taste F oder Enter: kontextabhängige Interaktion (Truhe öffnen/schließen oder mit NPC sprechen)
    if (key === 'f' || event.key === 'Enter') {
      if (!this.dialogue.isOpen()) {
        if (this.state.isNearChest()) {
          this.initiateToggleChest();
        } else {
          this.initiateTalkToNpc();
        }
        return;
      }
    }

    this.pressedKeys.add(key);

    // Direktwahl der Wege 1 bis 7 über Zahlentasten (wenn kein Dialog offen ist)
    if (!this.dialogue.isOpen() && key >= '1' && key <= '7') {
      const pathId = Number(key);
      this.pendingTalkToNpc = false;
      this.pendingToggleChest = false;
      this.state.setTargetToPathEntrance(pathId);
    }
  };

  private onKeyUp = (event: KeyboardEvent): void => {
    this.pressedKeys.delete(event.key.toLowerCase());
  };

  private onPointerDown = (event: PointerEvent): void => {
    this.isPointerDown = true;
    this.isDraggingCamera = false;
    this.pointerDownButton = event.button;
    this.pointerStartX = event.clientX;
    this.pointerStartY = event.clientY;
    this.lastPointerX = event.clientX;
    this.lastPointerY = event.clientY;
  };

  private onPointerMove = (event: PointerEvent): void => {
    if (this.isPointerDown) {
      const totalDist = Math.hypot(
        event.clientX - this.pointerStartX,
        event.clientY - this.pointerStartY
      );

      // Sobald die Maus mit gedrückter Taste etwas gezogen wird, dreht sie die Kamera
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

    // Hover-Erkennung für interaktive 3D-Elemente (NPC, Schatztruhe, Schilder, Wege, Schutzhütte)
    const hit = this.scene.raycastFromMouse(event.clientX, event.clientY);
    if (!hit) {
      this.scene.setHoveredPathId(null);
      this.scene.setNpcHovered(false);
      this.scene.setChestHovered(false);
      this.canvas.style.cursor = 'grab';
      return;
    }

    if (hit.kind === 'npc') {
      this.scene.setHoveredPathId(null);
      this.scene.setNpcHovered(true);
      this.scene.setChestHovered(false);
      this.canvas.style.cursor = 'pointer';
    } else if (hit.kind === 'chest') {
      this.scene.setHoveredPathId(null);
      this.scene.setNpcHovered(false);
      this.scene.setChestHovered(true);
      this.canvas.style.cursor = 'pointer';
    } else if (hit.kind === 'sign' || hit.kind === 'path') {
      this.scene.setHoveredPathId(hit.pathId);
      this.scene.setNpcHovered(false);
      this.scene.setChestHovered(false);
      this.canvas.style.cursor = 'pointer';
    } else if (hit.kind === 'hut' || hit.kind === 'signpost') {
      this.scene.setHoveredPathId(null);
      this.scene.setNpcHovered(false);
      this.scene.setChestHovered(false);
      this.canvas.style.cursor = 'pointer';
    } else {
      this.scene.setHoveredPathId(null);
      this.scene.setNpcHovered(false);
      this.scene.setChestHovered(false);
      this.canvas.style.cursor = 'default';
    }
  };

  private onPointerUp = (event: PointerEvent): void => {
    if (!this.isPointerDown) {
      return;
    }

    const wasDragging = this.isDraggingCamera;
    const button = this.pointerDownButton;
    this.isPointerDown = false;
    this.isDraggingCamera = false;
    this.canvas.style.cursor = 'default';

    // Kurzer Linksklick (ohne Kamera-Drag) bewegt die Spielfigur, öffnet Truhe oder startet Gespräch
    if (!wasDragging && button === 0) {
      const hit = this.scene.raycastFromMouse(event.clientX, event.clientY);
      if (!hit) {
        return;
      }

      if (hit.kind === 'npc') {
        this.initiateTalkToNpc();
        return;
      }

      if (hit.kind === 'chest') {
        this.initiateToggleChest();
        return;
      }

      // Bei Bewegung zu einem anderen Ziel ein offenes Gespräch schließen
      this.pendingTalkToNpc = false;
      this.pendingToggleChest = false;
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

    if (forward !== 0 || strafe !== 0) {
      // Manuelle Bewegung bricht aktives Click-to-Move und ein offenes Gespräch ab
      this.pendingTalkToNpc = false;
      this.pendingToggleChest = false;
      this.state.clearTargetPosition();
      const len = Math.hypot(forward, strafe);
      const normForward = forward / len;
      const normStrafe = strafe / len;

      const angle = this.scene.getCameraOrbitAngle();
      const dx = (-Math.sin(angle) * normForward + Math.cos(angle) * normStrafe) * speed;
      const dz = (-Math.cos(angle) * normForward - Math.sin(angle) * normStrafe) * speed;

      this.state.movePlayer(dx, dz);
      if (!this.state.isNearNpc() && this.dialogue.isOpen()) {
        this.closeDialogueAndSpeech();
      }
    } else {
      this.state.updateAutoWalk(dtSeconds);
      if (this.pendingTalkToNpc && this.state.isNearNpc()) {
        this.pendingTalkToNpc = false;
        this.state.clearTargetPosition();
        this.openRootDialogue();
      }
      if (this.pendingToggleChest && this.state.isNearChest()) {
        this.pendingToggleChest = false;
        this.state.clearTargetPosition();
        this.toggleChestWithSound();
      }
    }
  }

  private loop = (now: number): void => {
    const dtSeconds = Math.min((now - this.lastTime) / 1000, 0.1);
    this.lastTime = now;

    this.handleInput(dtSeconds);

    const poi = this.state.getActivePointOfInterest();
    const selectedPath = this.state.getSelectedPath();
    const selectedId = selectedPath ? selectedPath.id : null;

    this.scene.update(
      this.state.getPlayerPosition(),
      selectedId,
      this.state.getTargetPosition(),
      dtSeconds,
      this.dialogue.isOpen(),
      this.state.isChestOpen()
    );
    this.hud.update(poi, selectedId, this.dialogue.getCurrentNode(), this.state.isChestOpen());

    this.animationFrameId = requestAnimationFrame(this.loop);
  };

  public dispose(): void {
    cancelAnimationFrame(this.animationFrameId);
    this.speech.stop();
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    this.canvas.removeEventListener('pointerdown', this.onPointerDown);
    this.canvas.removeEventListener('pointermove', this.onPointerMove);
    this.canvas.removeEventListener('pointerup', this.onPointerUp);
    this.canvas.removeEventListener('wheel', this.onWheel);
    this.canvas.removeEventListener('contextmenu', this.onContextMenu);
    this.scene.dispose();
  }
}
