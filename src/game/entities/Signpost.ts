import * as THREE from 'three';
import { SEVEN_PATHS } from '../data/paths';
import { createStoneTexture, createWoodGrainTexture } from '../textures/GroundTextures';

export interface SignpostEntity {
  group: THREE.Group;
  highlightSign: (pathId: number | null, hoveredPathId?: number | null) => void;
  setCapHovered: (hovered: boolean) => void;
  pulseCap: () => void;
  setBaseHovered: (hovered: boolean) => void;
  pulseBase: (active: boolean) => void;
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
  const baseMaterial = new THREE.MeshStandardMaterial({
    color: 0x767a78,
    map: stoneTex.map ?? undefined,
    bumpMap: stoneTex.bumpMap ?? undefined,
    bumpScale: 0.08,
    roughness: 0.92,
    flatShading: true,
    emissive: new THREE.Color(0x000000),
    emissiveIntensity: 0.0,
  });
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.45, 0.58, 0.35, 10),
    baseMaterial
  );
  base.position.y = 0.175;
  base.receiveShadow = true;
  base.userData = { interactableType: 'signpost_base' };
  group.add(base);

  // Magisches Licht über dem Sockel beim Aufheben der Wegbegrenzung
  const baseGlowLight = new THREE.PointLight(0x34d399, 0, 3.8);
  baseGlowLight.position.set(0, 0.45, 0);
  group.add(baseGlowLight);

  // Holzpfosten
  const postHeight = 3.25;
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

  let isBaseHovered = false;
  let isBaseActive = false;
  let pulseTimerBase = 0;
  const pulseDurationBase = 0.95;
  let elapsedTotalSeconds = 0;

  const setCapHovered = (hovered: boolean) => {
    isCapHovered = hovered;
  };

  const pulseCap = () => {
    pulseTimer = pulseDuration;
  };

  const setBaseHovered = (hovered: boolean) => {
    isBaseHovered = hovered;
  };

  const pulseBase = (active: boolean) => {
    isBaseActive = active;
    pulseTimerBase = pulseDurationBase;
  };

  const update = (dtSeconds: number) => {
    elapsedTotalSeconds += dtSeconds;

    // 1. Spitze (Pulsieren / Hover)
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

    // 2. Sockel (Pulsieren / Hover / Dauer-Glanz bei aufgehobener Wegbegrenzung)
    if (pulseTimerBase > 0) {
      pulseTimerBase = Math.max(0, pulseTimerBase - dtSeconds);
      const progress = pulseTimerBase / pulseDurationBase;
      baseMaterial.emissive.setHex(isBaseActive ? 0x34d399 : 0x76a38b);
      baseMaterial.emissiveIntensity = 0.5 + progress * 2.5;
      baseGlowLight.intensity = progress * 3.5;
    } else if (isBaseActive) {
      // Wenn die Wegbegrenzung aufgehoben ist, pulsiert der Sockel zart smaragdgrün
      const wave = (Math.sin(elapsedTotalSeconds * 2.5) + 1.0) * 0.5;
      baseMaterial.emissive.setHex(0x10b981);
      baseMaterial.emissiveIntensity = 0.25 + wave * 0.35;
      baseGlowLight.intensity = 0.4 + wave * 0.6;
    } else if (isBaseHovered) {
      baseMaterial.emissive.setHex(0x34d399);
      baseMaterial.emissiveIntensity = 0.55;
      baseGlowLight.intensity = 0.8;
    } else {
      baseMaterial.emissive.setHex(0x000000);
      baseMaterial.emissiveIntensity = 0.0;
      baseGlowLight.intensity = 0.0;
    }
  };

  const signMaterials = new Map<number, THREE.MeshStandardMaterial>();

  // Sieben Schilder gestaffelt am Pfosten, jeweils in Richtung ihres Weges gedreht
  SEVEN_PATHS.forEach((path, index) => {
    const signPivot = new THREE.Group();
    // Größere Schilderhöhe (0.24m statt 0.16m) mit angepasster Höhenstaffelung
    const yPos = 3.08 - index * 0.25;
    signPivot.position.set(0, yPos, 0);
    // Drehung passend zur Wegrichtung (0 Rad = Norden / -Z)
    signPivot.rotation.y = -path.angleRad + Math.PI / 2;

    const mat = new THREE.MeshStandardMaterial({
      color: path.colorHex,
      roughness: 0.65,
      emissive: 0x000000,
    });
    signMaterials.set(path.id, mat);

    // Deutlich höheres Holzschild (0.24m statt 0.16m)
    const board = new THREE.Mesh(new THREE.BoxGeometry(1.02, 0.24, 0.065), mat);
    board.position.x = 0.54;
    board.castShadow = true;
    board.userData = { interactableType: 'sign', pathId: path.id };
    signPivot.add(board);

    // Pfeilspitze passend zur vergrößerten Schildhöhe
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.165, 0.26, 4), mat);
    tip.rotation.z = -Math.PI / 2;
    tip.rotation.x = Math.PI / 4;
    tip.position.x = 1.15;
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

  return { group, highlightSign, setCapHovered, pulseCap, setBaseHovered, pulseBase, update };
}
