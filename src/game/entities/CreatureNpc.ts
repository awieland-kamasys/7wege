import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { getTerrainHeight } from '../utils/terrainHeight';
import { disposeObject3D } from '../utils/threeUtils';

export interface CreatureNpcEntity {
  group: THREE.Group;
  startHobbing: () => void;
  startRunAway: (onFled?: () => void) => void;
  isFled: () => boolean;
  isFleeing: () => boolean;
  getPosition: () => { x: number; z: number };
  update: (
    elapsedSeconds: number,
    playerPos: { x: number; z: number },
    isHighlighted: boolean,
    dtSeconds?: number
  ) => void;
}

export interface CreatureNpcOptions {
  onMeshLoaded?: (mesh: THREE.Mesh) => void;
  loadDelayMs?: number;
}

/**
 * Erstellt die 3D-Figur "Fabelwesen Lupo" auf dem halben Weg vom Startpunkt zur Kreuzung (Weg 7):
 * - Lädt das 3D-Modell `/assets/models/fantasy+creature+3d+model.glb`
 * - Enthält die Animationen:
 *   - "Häschenhoppeln" (hobbing): Beim Anklicken / Ansprechen
 *   - "run" (laufen): Nach Gesprächsende, läuft über den Weg und verschwindet im Wald
 */
export function createCreatureNpc(
  initialPos: { x: number; z: number },
  options?: CreatureNpcOptions
): CreatureNpcEntity {
  const group = new THREE.Group();
  group.name = 'CreatureNpc';
  group.userData = { interactableType: 'creature' };

  // 1. Schwebender, funkelnder Waldgeist-Kristall über dem Kopf
  const indicatorMat = new THREE.MeshStandardMaterial({
    color: 0x38ef7d,
    emissive: 0x11998e,
    emissiveIntensity: 0.85,
    roughness: 0.15,
    metalness: 0.35,
  });
  const indicator = new THREE.Mesh(new THREE.OctahedronGeometry(0.12, 0), indicatorMat);
  indicator.position.y = 1.45;
  indicator.userData = { interactableType: 'creature' };
  group.add(indicator);

  // 2. Unsichtbare Hitbox für zuverlässiges Raycasting
  const hitboxMat = new THREE.MeshBasicMaterial({ visible: false });
  const hitbox = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 1.4, 8), hitboxMat);
  hitbox.position.y = 0.7;
  hitbox.userData = { interactableType: 'creature' };
  group.add(hitbox);

  // 3. Temporäre Low-Poly-Platzhaltergeometrie während des Ladens
  const fallback = new THREE.Group();
  const fallbackMat = new THREE.MeshStandardMaterial({
    color: 0x5a7d65,
    roughness: 0.8,
  });
  const fallbackBody = new THREE.Mesh(new THREE.SphereGeometry(0.4, 8, 8), fallbackMat);
  fallbackBody.position.y = 0.45;
  fallbackBody.castShadow = true;
  fallbackBody.userData = { interactableType: 'creature' };
  fallback.add(fallbackBody);
  group.add(fallback);

  // Startposition auf dem Gelände
  const initialY = getTerrainHeight(initialPos.x, initialPos.z);
  group.position.set(initialPos.x, initialY, initialPos.z);

  // Blickrichtung initial: Dem von Pfad 7 ankommenden Spieler entgegen (Richtung Startpunkt -21, -18.4)
  const angleToStart = Math.atan2(-21.0 - initialPos.x, -18.4 - initialPos.z);
  group.rotation.y = angleToStart;

  // Animations- und Zustandsvariablen
  let mixer: THREE.AnimationMixer | null = null;
  let actionHobbing: THREE.AnimationAction | null = null;
  let actionRun: THREE.AnimationAction | null = null;
  let currentAction: THREE.AnimationAction | null = null;

  type CreatureState = 'idle' | 'hobbing' | 'fleeing' | 'fled';
  let state: CreatureState = 'idle';

  const modelMaterials: THREE.MeshStandardMaterial[] = [];
  let onFledCallback: (() => void) | null = null;

  // Fluchtvektor: Quer über den Pfad in den dichten Fichtenwald rechts des Weges
  // Weg 7 verläuft in Richtung (1, 0.85); rechts davon liegt dichter Wald Richtung (-22.0, -4.0)
  const fleeTarget = { x: -22.5, z: -3.5 };
  const fleeDir = new THREE.Vector2(fleeTarget.x - initialPos.x, fleeTarget.z - initialPos.z).normalize();
  const fleeSpeed = 4.2; // 4.2 m/s flinkes Waldhoppeln
  let distanceFled = 0;
  const maxFleeDistance = 14.0;
  let opacity = 1.0;

  // Ladevorgang des GLTF-Modells
  const startLoad = (): void => {
    const loader = new GLTFLoader();
    loader.load(
      '/assets/models/fantasy+creature+3d+model.glb',
      (gltf) => {
        const model = gltf.scene;

        // Skalierung: Originalmodell ist ca. 1.00m hoch -> 1.1x für harmonische Waldtier-Größe
        model.scale.setScalar(1.1);

        // Auf Bodenniveau aufsetzen
        model.updateMatrixWorld(true);
        const bounds = new THREE.Box3().setFromObject(model);
        model.position.set(0, -bounds.min.y, 0);

        // Animationen vorbereiten
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);

          // 1. Häschenhoppeln (hobbing)
          const clipHobbing =
            gltf.animations.find(
              (a) =>
                a.name.toLowerCase().includes('hoppel') ||
                a.name.toLowerCase().includes('hobb') ||
                a.name === 'Häschenhoppeln'
            ) ?? gltf.animations[1] ?? gltf.animations[0];

          if (clipHobbing) {
            actionHobbing = mixer.clipAction(clipHobbing);
            actionHobbing.setLoop(THREE.LoopRepeat, Infinity);
            actionHobbing.timeScale = 0.85;
          }

          // 2. Laufen (run)
          const clipRun =
            gltf.animations.find(
              (a) =>
                a.name.toLowerCase().includes('run') ||
                a.name.toLowerCase().includes('lauf')
            ) ?? gltf.animations[0];

          if (clipRun) {
            actionRun = mixer.clipAction(clipRun);
            actionRun.setLoop(THREE.LoopRepeat, Infinity);
            actionRun.timeScale = 1.15;
          }

          // Initial: Sanftes, neugieriges Hoppeln auf der Stelle
          if (actionHobbing) {
            actionHobbing.play();
            currentAction = actionHobbing;
          }
        }

        model.traverse((child) => {
          const mesh = child as THREE.Mesh;
          if (mesh.isMesh) {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.userData = { interactableType: 'creature' };

            const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            for (const mat of mats) {
              if (mat && 'roughness' in mat) {
                const stdMat = mat as THREE.MeshStandardMaterial;
                stdMat.roughness = 0.78;
                stdMat.metalness = 0.15;
                modelMaterials.push(stdMat);
              }
            }

            if (options?.onMeshLoaded) {
              options.onMeshLoaded(mesh);
            }
          }
        });

        // Platzhalter entfernen
        group.remove(fallback);
        disposeObject3D(fallback);
        group.add(model);
      },
      undefined,
      (err) => {
        console.warn('[CreatureNpc] Modell konnte nicht geladen werden, nutze Platzhalter:', err);
      }
    );
  };

  if (options?.loadDelayMs && options.loadDelayMs > 0) {
    setTimeout(startLoad, options.loadDelayMs);
  } else {
    startLoad();
  }

  let lastElapsedSeconds = 0;

  return {
    group,

    startHobbing: () => {
      if (state === 'fleeing' || state === 'fled') return;
      state = 'hobbing';
      if (actionHobbing && mixer) {
        actionHobbing.timeScale = 1.25; // Fröhliches, aufgeregtes Hoppeln im Gespräch
        if (currentAction && currentAction !== actionHobbing) {
          actionHobbing.reset().fadeIn(0.2).play();
          currentAction.fadeOut(0.2);
        } else {
          actionHobbing.play();
        }
        currentAction = actionHobbing;
      }
    },

    startRunAway: (onFled?: () => void) => {
      if (state === 'fleeing' || state === 'fled') return;
      state = 'fleeing';
      if (onFled) {
        onFledCallback = onFled;
      }

      // Kristall über dem Kopf ausblenden
      indicator.visible = false;
      hitbox.userData = {}; // Keine Klicks mehr

      // Animation zu "run" wechseln
      if (actionRun && mixer) {
        actionRun.timeScale = 1.35;
        if (currentAction && currentAction !== actionRun) {
          actionRun.reset().fadeIn(0.25).play();
          currentAction.fadeOut(0.25);
        } else {
          actionRun.play();
        }
        currentAction = actionRun;
      }

      // Figur in Fluchtrichtung ausrichten
      const fleeAngle = Math.atan2(fleeDir.x, fleeDir.y);
      group.rotation.y = fleeAngle;
    },

    isFled: () => state === 'fled',
    isFleeing: () => state === 'fleeing',
    getPosition: () => ({ x: group.position.x, z: group.position.z }),

    update: (
      elapsedSeconds: number,
      playerPos: { x: number; z: number },
      isHighlighted: boolean,
      dtSeconds?: number
    ) => {
      if (state === 'fled') {
        group.visible = false;
        return;
      }

      const delta =
        dtSeconds !== undefined
          ? dtSeconds
          : Math.max(0.001, Math.min(0.1, elapsedSeconds - lastElapsedSeconds));
      lastElapsedSeconds = elapsedSeconds;

      // Skelettanimation aktualisieren
      if (mixer) {
        mixer.update(delta);
      }

      // --- ZUSTAND A: Fliehend in den Wald ---
      if (state === 'fleeing') {
        const step = fleeSpeed * delta;
        group.position.x += fleeDir.x * step;
        group.position.z += fleeDir.y * step;
        distanceFled += step;

        // Geländehöhe anpassen
        group.position.y = getTerrainHeight(group.position.x, group.position.z);

        // Sanftes Ausfaden im dichten Unterholz nach ersten Metern
        if (distanceFled > 5.0) {
          opacity = Math.max(0, opacity - delta * 0.9);
          for (const mat of modelMaterials) {
            mat.transparent = true;
            mat.opacity = opacity;
          }
        }

        // Vollständig im Wald verschwunden
        if (distanceFled >= maxFleeDistance || opacity <= 0.01) {
          state = 'fled';
          group.visible = false;
          if (onFledCallback) {
            onFledCallback();
            onFledCallback = null;
          }
        }
        return;
      }

      // --- ZUSTAND B: Auf dem Weg sitzend / im Gespräch ---
      // Schwebender Kristall rotiert und pulsiert sanft; dezent verstärkt bei Hover als Zielanzeige
      indicator.rotation.y += delta * 2.2;
      indicator.position.y = 1.45 + Math.sin(elapsedSeconds * 3.5) * 0.06;
      const indicatorScale = isHighlighted ? 1.25 : 1.0;
      indicator.scale.set(indicatorScale, indicatorScale, indicatorScale);
      indicatorMat.emissiveIntensity = isHighlighted ? 1.35 : 0.85;

      // Blickkontakt zum Spieler halten, wenn Spieler in der Nähe
      const distToPlayer = Math.hypot(playerPos.x - group.position.x, playerPos.z - group.position.z);
      if (distToPlayer < 7.0 && state !== 'hobbing') {
        const targetAngle = Math.atan2(playerPos.x - group.position.x, playerPos.z - group.position.z);
        // Weiche Drehung zum Spieler
        let angleDiff = targetAngle - group.rotation.y;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        group.rotation.y += angleDiff * Math.min(1.0, delta * 3.5);
      }

      // Das Wesen selbst wird bei Markierung/Hover bewusst NICHT eingefärbt,
      // damit sein natürliches Fell und seine Originaltexturen unverfälscht erhalten bleiben.
    },
  };
}
