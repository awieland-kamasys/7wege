import * as THREE from 'three';
import { PATH_1_BOULDER_POS } from '../data/paths';

export interface PathBoulderEntity {
  group: THREE.Group;
  pickableMeshes: THREE.Object3D[];
  update: (dtSeconds: number, isHovered?: boolean) => void;
  startDissolve: (onComplete?: () => void) => void;
  isDissolving: () => boolean;
  isRemoved: () => boolean;
}

/**
 * Erstellt den magisch versiegelten Felsbrocken, der Weg 1 (Silberstollen-Pfad) blockiert.
 * Der Felsen ist mit feinen, smaragdgrün glimmenden Kristalladern durchzogen,
 * die mit dem rotierenden Edelstein am Eingang von Weg 1 harmonieren.
 */
export function createPathBoulder(): PathBoulderEntity {
  const group = new THREE.Group();
  group.name = 'Path1Boulder';
  group.position.set(PATH_1_BOULDER_POS.x, 0, PATH_1_BOULDER_POS.z);

  const pickableMeshes: THREE.Object3D[] = [];

  // Fels-Grundmaterial: uriger, verwitterter Granit
  const rockMaterial = new THREE.MeshStandardMaterial({
    color: 0x58564f,
    roughness: 0.92,
    metalness: 0.08,
    flatShading: true,
  });

  // Moosbedecktes Gesteinsmaterial für obere Kanten
  const mossRockMaterial = new THREE.MeshStandardMaterial({
    color: 0x485836,
    roughness: 0.96,
    metalness: 0.04,
    flatShading: true,
  });

  // Magisch glimmende Kristalladern / Runenrisse
  const runeMaterial = new THREE.MeshStandardMaterial({
    color: 0x55dd88,
    emissive: 0x22aa55,
    emissiveIntensity: 0.85,
    roughness: 0.3,
    metalness: 0.2,
    flatShading: true,
  });

  // Hauptfelsbrocken im Zentrum (schwere, kantige Masse)
  const mainBoulderGeo = new THREE.DodecahedronGeometry(1.28, 1);
  const mainBoulder = new THREE.Mesh(mainBoulderGeo, rockMaterial);
  mainBoulder.position.set(0, 0.95, 0);
  mainBoulder.scale.set(1.3, 0.95, 1.15);
  mainBoulder.rotation.set(0.35, 0.45, -0.2);
  mainBoulder.castShadow = true;
  mainBoulder.receiveShadow = true;
  mainBoulder.userData = { interactableType: 'boulder' };
  group.add(mainBoulder);
  pickableMeshes.push(mainBoulder);

  // Zweiter großer Felskeil, der den Wegrand links verkeilt
  const leftBoulderGeo = new THREE.DodecahedronGeometry(0.85, 0);
  const leftBoulder = new THREE.Mesh(leftBoulderGeo, mossRockMaterial);
  leftBoulder.position.set(-1.05, 0.65, 0.2);
  leftBoulder.scale.set(1.1, 0.9, 1.2);
  leftBoulder.rotation.set(0.2, -0.5, 0.4);
  leftBoulder.castShadow = true;
  leftBoulder.receiveShadow = true;
  leftBoulder.userData = { interactableType: 'boulder' };
  group.add(leftBoulder);
  pickableMeshes.push(leftBoulder);

  // Rechter Stützfels am Wegrand
  const rightBoulderGeo = new THREE.DodecahedronGeometry(0.92, 0);
  const rightBoulder = new THREE.Mesh(rightBoulderGeo, rockMaterial);
  rightBoulder.position.set(1.0, 0.72, -0.15);
  rightBoulder.scale.set(1.05, 1.0, 0.9);
  rightBoulder.rotation.set(-0.3, 0.6, -0.15);
  rightBoulder.castShadow = true;
  rightBoulder.receiveShadow = true;
  rightBoulder.userData = { interactableType: 'boulder' };
  group.add(rightBoulder);
  pickableMeshes.push(rightBoulder);

  // Kleine Trümmersteine am Fuß
  const debrisCoords = [
    { x: -0.7, z: -0.85, r: 0.36 },
    { x: 0.8, z: 0.75, r: 0.42 },
    { x: 0.1, z: 0.95, r: 0.32 },
  ];
  for (const c of debrisCoords) {
    const debris = new THREE.Mesh(new THREE.DodecahedronGeometry(c.r, 0), mossRockMaterial);
    debris.position.set(c.x, c.r * 0.7, c.z);
    debris.castShadow = true;
    debris.receiveShadow = true;
    debris.userData = { interactableType: 'boulder' };
    group.add(debris);
    pickableMeshes.push(debris);
  }

  // Eingebettete Kristalladern (geometrisch sichtbare Kristallsegmente)
  const runeVein1 = new THREE.Mesh(new THREE.OctahedronGeometry(0.28, 0), runeMaterial);
  runeVein1.position.set(0.35, 1.15, 0.65);
  runeVein1.scale.set(0.6, 1.4, 0.5);
  runeVein1.rotation.set(0.4, 0.2, 0.6);
  runeVein1.userData = { interactableType: 'boulder' };
  group.add(runeVein1);
  pickableMeshes.push(runeVein1);

  const runeVein2 = new THREE.Mesh(new THREE.OctahedronGeometry(0.24, 0), runeMaterial);
  runeVein2.position.set(-0.4, 0.85, 0.75);
  runeVein2.scale.set(0.5, 1.2, 0.6);
  runeVein2.rotation.set(-0.3, 0.5, -0.4);
  runeVein2.userData = { interactableType: 'boulder' };
  group.add(runeVein2);
  pickableMeshes.push(runeVein2);

  // Zartes Glimmlicht
  const runeLight = new THREE.PointLight(0x55dd88, 0.8, 3.8);
  runeLight.position.set(0, 1.1, 0.4);
  group.add(runeLight);

  let state: 'solid' | 'dissolving' | 'removed' = 'solid';
  let dissolveTimer = 0;
  const dissolveDuration = 1.35; // Sekunden für die Auflösungs-Animation
  let onDissolveComplete: (() => void) | null = null;
  let elapsed = 0;

  const update = (dtSeconds: number, isHovered = false): void => {
    elapsed += dtSeconds;

    if (state === 'removed') {
      return;
    }

    if (state === 'dissolving') {
      dissolveTimer += dtSeconds;
      const progress = Math.min(1.0, dissolveTimer / dissolveDuration);

      // Sanftes Absinken in den Erdboden und Schrumpfen
      group.position.y = -progress * 2.2;
      const scale = Math.max(0.001, 1.0 - progress * 0.95);
      group.scale.set(scale, scale, scale);

      // Intensives, weiß-grünes Aufglühen während der Resonanz-Auflösung
      const glowBoost = 1.0 - Math.abs(progress - 0.3) * 1.5;
      const currentIntensity = Math.max(0.1, 2.8 * Math.max(0, glowBoost));
      runeMaterial.emissiveIntensity = currentIntensity;
      runeLight.intensity = currentIntensity * 1.6;

      if (progress >= 1.0) {
        state = 'removed';
        group.visible = false;
        if (onDissolveComplete) {
          onDissolveComplete();
          onDissolveComplete = null;
        }
      }
      return;
    }

    // Zustand 'solid': Rhythmisches Atmen der Runen-Glimmung
    const pulse = 0.5 + 0.5 * Math.sin(elapsed * 2.8);
    const hoverBonus = isHovered ? 0.6 : 0;
    runeMaterial.emissiveIntensity = 0.7 + pulse * 0.45 + hoverBonus;
    runeLight.intensity = 0.75 + pulse * 0.45 + hoverBonus;
  };

  const startDissolve = (onComplete?: () => void): void => {
    if (state !== 'solid') {
      return;
    }
    state = 'dissolving';
    dissolveTimer = 0;
    if (onComplete) {
      onDissolveComplete = onComplete;
    }
  };

  return {
    group,
    pickableMeshes,
    update,
    startDissolve,
    isDissolving: () => state === 'dissolving',
    isRemoved: () => state === 'removed',
  };
}
