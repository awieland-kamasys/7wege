import * as THREE from 'three';
import { PATH_6_HERBS_POS } from '../data/paths';

export interface PathHerbsEntity {
  group: THREE.Group;
  pickableMeshes: THREE.Object3D[];
  update: (dtSeconds: number, isHovered?: boolean) => void;
  startDissolve: (onComplete?: () => void) => void;
  isDissolving: () => boolean;
  isRemoved: () => boolean;
}

/**
 * Erstellt die Wegsperre für Weg 6 (Jägerpfad):
 * Ein rustikales Holzgeländer mit hohen, wuchernden Zauberkräutern (Mondwurz, wilde Farne,
 * Alant und purpurne Blütenstände) dahinter.
 */
export function createPathHerbs(): PathHerbsEntity {
  const group = new THREE.Group();
  group.name = 'Path6Herbs';
  group.position.set(PATH_6_HERBS_POS.x, 0, PATH_6_HERBS_POS.z);
  group.rotation.y = PATH_6_HERBS_POS.rotationY;

  const pickableMeshes: THREE.Object3D[] = [];

  // Holzmaterial für das Geländer
  const woodMaterial = new THREE.MeshStandardMaterial({
    color: 0x5a3e26,
    roughness: 0.9,
    metalness: 0.05,
    flatShading: true,
  });

  // Material für die Blätter und Stängel der Kräuter
  const leafMaterial = new THREE.MeshStandardMaterial({
    color: 0x2e5c33,
    roughness: 0.75,
    metalness: 0.08,
    flatShading: true,
  });

  // Material für die leuchtenden violetten Blüten / Zauberknospen (Amethyst-Resonanz)
  const blossomMaterial = new THREE.MeshStandardMaterial({
    color: 0xa84cd6,
    emissive: 0x6e1f96,
    emissiveIntensity: 0.75,
    roughness: 0.35,
    flatShading: true,
  });

  // === 1. DAS HOLZGELÄNDER VOR DEN PFLANZEN ===
  // Drei vertikale Holzpfosten
  const postPositions = [-1.35, 0, 1.35];
  for (const px of postPositions) {
    const post = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.09, 1.15, 8),
      woodMaterial
    );
    post.position.set(px, 0.575, 0.35);
    post.castShadow = true;
    post.receiveShadow = true;
    post.userData = { interactableType: 'herbs' };
    group.add(post);
    pickableMeshes.push(post);

    // Kappe auf dem Pfosten
    const cap = new THREE.Mesh(
      new THREE.ConeGeometry(0.1, 0.08, 8),
      woodMaterial
    );
    cap.position.set(px, 1.18, 0.35);
    cap.castShadow = true;
    cap.userData = { interactableType: 'herbs' };
    group.add(cap);
    pickableMeshes.push(cap);
  }

  // Zwei horizontale Querstangen (Geländerbalken quer über die Wegbreite)
  const railHeights = [0.52, 0.96];
  for (const ry of railHeights) {
    const rail = new THREE.Mesh(
      new THREE.CylinderGeometry(0.065, 0.065, 2.9, 8),
      woodMaterial
    );
    rail.rotation.z = Math.PI / 2;
    rail.position.set(0, ry, 0.35);
    rail.castShadow = true;
    rail.receiveShadow = true;
    rail.userData = { interactableType: 'herbs' };
    group.add(rail);
    pickableMeshes.push(rail);
  }

  // === 2. HOHE KRÄUTERPFLANZEN DAHINTER ===
  const plantsGroup = new THREE.Group();
  group.add(plantsGroup);

  // Stängel und breite Blätterbüschel
  const plantConfigs = [
    { x: -1.2, z: -0.1, h: 1.6, count: 5, bColor: 0x9832cc },
    { x: -0.8, z: 0.05, h: 1.85, count: 6, bColor: 0xb545e6 },
    { x: -0.4, z: -0.15, h: 1.5, count: 4, bColor: 0x852db8 },
    { x: 0.0, z: 0.0, h: 1.95, count: 7, bColor: 0xc455f5 },
    { x: 0.45, z: -0.12, h: 1.65, count: 5, bColor: 0x9d3ad1 },
    { x: 0.85, z: 0.08, h: 1.75, count: 6, bColor: 0xb044e0 },
    { x: 1.25, z: -0.05, h: 1.55, count: 5, bColor: 0x882ebc },
  ];

  for (const p of plantConfigs) {
    // Zentraler Stängel
    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.06, p.h, 6),
      leafMaterial
    );
    stem.position.set(p.x, p.h * 0.5, p.z);
    stem.castShadow = true;
    stem.userData = { interactableType: 'herbs' };
    plantsGroup.add(stem);
    pickableMeshes.push(stem);

    // Ausladende Farn-/Kräuterblätter
    for (let i = 0; i < p.count; i++) {
      const leafAngle = (i * Math.PI * 2) / p.count;
      const leafHeight = 0.3 + (i / p.count) * (p.h * 0.65);
      const leaf = new THREE.Mesh(
        new THREE.BoxGeometry(0.38, 0.04, 0.16),
        leafMaterial
      );
      leaf.position.set(
        p.x + Math.sin(leafAngle) * 0.22,
        leafHeight,
        p.z + Math.cos(leafAngle) * 0.22
      );
      leaf.rotation.y = leafAngle;
      leaf.rotation.z = 0.32;
      leaf.castShadow = true;
      leaf.userData = { interactableType: 'herbs' };
      plantsGroup.add(leaf);
      pickableMeshes.push(leaf);
    }

    // Leuchtende Blütenkrone / Fruchtstand an der Spitze (Amethystglanz)
    const bloom = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.16, 0),
      blossomMaterial
    );
    bloom.position.set(p.x, p.h + 0.08, p.z);
    bloom.scale.set(0.9, 1.3, 0.9);
    bloom.castShadow = true;
    bloom.userData = { interactableType: 'herbs' };
    plantsGroup.add(bloom);
    pickableMeshes.push(bloom);
  }

  // Violettes Punktlicht (Amethyst-Resonanz)
  const herbLight = new THREE.PointLight(0xa84cd6, 1.2, 4.2);
  herbLight.position.set(0, 1.2, 0.1);
  group.add(herbLight);

  // Zustandsvariablen für Animation und Beseitigung
  let elapsed = 0;
  let dissolving = false;
  let dissolveTimer = 0;
  const dissolveDuration = 1.4;
  let onCompleteCallback: (() => void) | undefined;
  let removed = false;

  return {
    group,
    pickableMeshes,
    update: (dtSeconds: number, isHovered = false) => {
      if (removed) {
        return;
      }

      elapsed += dtSeconds;

      if (dissolving) {
        dissolveTimer += dtSeconds;
        const progress = Math.min(1, dissolveTimer / dissolveDuration);

        // Sanftes Absinken und Schrumpfen
        const scale = Math.max(0.01, 1 - progress);
        group.scale.set(scale, scale, scale);
        group.position.y = -progress * 0.8;
        herbLight.intensity = Math.max(0, (1 - progress) * 2.5);

        if (progress >= 1) {
          group.visible = false;
          removed = true;
          if (onCompleteCallback) {
            onCompleteCallback();
          }
        }
        return;
      }

      // Sanftes Wiegen der Kräuter im Wind
      const sway = Math.sin(elapsed * 2.2) * 0.04;
      plantsGroup.rotation.z = sway;

      // Hover-Pulsieren
      const hoverBoost = isHovered ? 0.45 : 0;
      const pulse = 0.5 + 0.5 * Math.sin(elapsed * 3.0);
      blossomMaterial.emissiveIntensity = 0.75 + pulse * 0.35 + hoverBoost;
      herbLight.intensity = 1.2 + pulse * 0.5 + hoverBoost * 0.7;
    },
    startDissolve: (onComplete?: () => void) => {
      if (dissolving || removed) {
        return;
      }
      dissolving = true;
      dissolveTimer = 0;
      onCompleteCallback = onComplete;
    },
    isDissolving: () => dissolving,
    isRemoved: () => removed,
  };
}
