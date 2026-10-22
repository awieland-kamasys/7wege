import * as THREE from 'three';
import { SEVEN_PATHS } from '../data/paths';
import { createStoneTexture, createWoodGrainTexture } from '../textures/GroundTextures';

export interface SignpostEntity {
  group: THREE.Group;
  highlightSign: (pathId: number | null, hoveredPathId?: number | null) => void;
  setCapHovered: (hovered: boolean) => void;
  pulseCap: () => void;
  update: (dtSeconds: number) => void;
}

/**
 * Erstellt den zentralen Wegweiser mit sieben Richtungsschildern.
 */
export function createSignpost(): SignpostEntity {
  const group = new THREE.Group();
  group.name = 'Signpost';

  // Detailreiche Holzmaserung für den Holzpfosten / Stamm des Wegweisers
  const woodGrainTex = createWoodGrainTexture();
  if (woodGrainTex.map) {
    woodGrainTex.map.repeat.set(1.0, 3.0);
  }
  if (woodGrainTex.bumpMap) {
    woodGrainTex.bumpMap.repeat.set(1.0, 3.0);
  }

  const postMaterial = new THREE.MeshStandardMaterial({
    color: 0x6e482b,
    map: woodGrainTex.map ?? undefined,
    bumpMap: woodGrainTex.bumpMap ?? undefined,
    bumpScale: 0.08,
    roughness: 0.85,
  });

  const stoneTex = createStoneTexture();
  if (stoneTex.map) {
    stoneTex.map.repeat.set(1.5, 1.0);
  }
  if (stoneTex.bumpMap) {
    stoneTex.bumpMap.repeat.set(1.5, 1.0);
  }

  // Steinernes Fundament mit authentischer Steintextur und Relief-Bump-Map
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.45, 0.58, 0.35, 10),
    new THREE.MeshStandardMaterial({
      color: 0x767a78,
      map: stoneTex.map ?? undefined,
      bumpMap: stoneTex.bumpMap ?? undefined,
      bumpScale: 0.08,
      roughness: 0.92,
      flatShading: true,
    })
  );
  base.position.y = 0.175;
  base.receiveShadow = true;
  base.userData = { interactableType: 'signpost' };
  group.add(base);

  // Holzpfosten
  const postHeight = 3.1;
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.16, postHeight, 12), postMaterial);
  post.position.y = postHeight / 2 + 0.2;
  post.castShadow = true;
  post.userData = { interactableType: 'signpost' };
  group.add(post);

  // Spitze oben auf dem Pfosten (interaktiver magischer Auslöser für alle Wegsperren)
  const capMaterial = new THREE.MeshStandardMaterial({
    color: 0x8a5a36,
    map: woodGrainTex.map ?? undefined,
    bumpMap: woodGrainTex.bumpMap ?? undefined,
    bumpScale: 0.08,
    roughness: 0.65,
    metalness: 0.12,
    emissive: 0x000000,
    emissiveIntensity: 0.0,
  });
  const cap = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.32, 12), capMaterial);
  cap.position.y = postHeight + 0.36;
  cap.castShadow = true;
  cap.userData = { interactableType: 'signpost_cap' };
  group.add(cap);

  // Zartes magisches Glanzlicht über der Spitze beim Pulsieren
  const capGlowLight = new THREE.PointLight(0xffdf77, 0, 4.5);
  capGlowLight.position.set(0, postHeight + 0.45, 0);
  group.add(capGlowLight);

  let isCapHovered = false;
  let pulseTimer = 0;
  const pulseDuration = 0.85;

  const setCapHovered = (hovered: boolean) => {
    isCapHovered = hovered;
  };

  const pulseCap = () => {
    pulseTimer = pulseDuration;
  };

  const update = (dtSeconds: number) => {
    if (pulseTimer > 0) {
      pulseTimer = Math.max(0, pulseTimer - dtSeconds);
      const progress = pulseTimer / pulseDuration; // 1.0 -> 0.0
      // Strahlender, goldener Sonnenlicht-Impuls
      capMaterial.emissive.setHex(0xffcb52);
      capMaterial.emissiveIntensity = 0.4 + progress * 2.4;
      capGlowLight.intensity = progress * 3.2;

      const bounce = 1.0 + Math.sin(progress * Math.PI) * 0.18;
      cap.scale.set(bounce, bounce, bounce);
    } else {
      cap.scale.set(1, 1, 1);
      capGlowLight.intensity = 0;

      if (isCapHovered) {
        capMaterial.emissive.setHex(0xe8aa3a);
        capMaterial.emissiveIntensity = 0.75;
      } else {
        capMaterial.emissive.setHex(0x000000);
        capMaterial.emissiveIntensity = 0.0;
      }
    }
  };

  const signMaterials = new Map<number, THREE.MeshStandardMaterial>();

  // Sieben Schilder gestaffelt am Pfosten, jeweils in Richtung ihres Weges gedreht
  SEVEN_PATHS.forEach((path, index) => {
    const signPivot = new THREE.Group();
    const yPos = 2.95 - index * 0.24;
    signPivot.position.set(0, yPos, 0);
    // Drehung passend zur Wegrichtung (0 Rad = Norden / -Z)
    signPivot.rotation.y = -path.angleRad + Math.PI / 2;

    const mat = new THREE.MeshStandardMaterial({
      color: path.colorHex,
      roughness: 0.65,
      emissive: 0x000000,
    });
    signMaterials.set(path.id, mat);

    const board = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.16, 0.06), mat);
    board.position.x = 0.52;
    board.castShadow = true;
    board.userData = { interactableType: 'sign', pathId: path.id };
    signPivot.add(board);

    // Pfeilspitze am Ende des Schildes
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.22, 4), mat);
    tip.rotation.z = -Math.PI / 2;
    tip.rotation.x = Math.PI / 4;
    tip.position.x = 1.08;
    tip.userData = { interactableType: 'sign', pathId: path.id };
    signPivot.add(tip);

    group.add(signPivot);
  });

  const highlightSign = (pathId: number | null, hoveredPathId: number | null = null) => {
    signMaterials.forEach((mat, id) => {
      if (id === pathId) {
        mat.emissive.setHex(0x554411);
      } else if (id === hoveredPathId) {
        mat.emissive.setHex(0x33290a);
      } else {
        mat.emissive.setHex(0x000000);
      }
    });
  };

  return { group, highlightSign, setCapHovered, pulseCap, update };
}
