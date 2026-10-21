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
        this.jumpToClearing();
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

  public jumpToClearing(): void {
    this.closeDialogueAndSpeech();
    this.clearPendingActions();
    const pos = this.state.jumpToClearing();
    this.scene.snapCameraToPlayer(pos);
    this.sound.playFootstep();
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

    // Wenn ein Gespräch offen ist, wählen die Zahlentasten 1–8 die Dialogoptionen
    if (this.dialogue.isOpen()) {
      if (key >= '1' && key <= '8') {
        const optionIdx = Number(key) - 1;
        this.handleDialogueOption(optionIdx);
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

    // Schneller Rücksprung zur 7-Wegekreuzung per Taste 0 oder Backspace (wenn auf Wegen unterwegs und kein Dialog offen)
    if (!this.dialogue.isOpen() && !this.state.isOnClearing() && (key === '0' || key === 'backspace')) {
      this.jumpToClearing();
      return;
    }
  };

  private onKeyUp = (event: KeyboardEvent): void => {
    this.pressedKeys.delete(event.key.toLowerCase());
  };

  private onPointerDown = (event: PointerEvent): void => {
    this.sound.unlock();
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

    const hit = this.scene.raycastFromMouse(event.clientX, event.clientY);
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

    this.canvas.style.cursor = hit.kind === 'ground' ? 'default' : 'pointer';
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
    this.sound.updateAmbientBirds(dtSeconds, this.dialogue.isOpen());

    const poi = this.state.getActivePointOfInterest();
    const currentPath = this.state.getCurrentOrClosestPath();
    const selectedPath = this.state.getSelectedPath();
    const selectedId = selectedPath ? selectedPath.id : (currentPath ? currentPath.id : null);

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
      currentPath
    );

    this.animationFrameId = requestAnimationFrame(this.loop);
  };

  public dispose(): void {
    cancelAnimationFrame(this.animationFrameId);
    this.speech.stop();
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    this.canvas.removeEventListener('pointerdown', this.onPointerDown);
    window.removeEventListener('pointermove', this.onPointerMove);
    this.canvas.removeEventListener('pointerup', this.onPointerUp);
    this.canvas.removeEventListener('wheel', this.onWheel);
    this.canvas.removeEventListener('contextmenu', this.onContextMenu);
    this.scene.dispose();
  }
}
