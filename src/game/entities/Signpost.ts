import * as THREE from 'three';
import { SEVEN_PATHS } from '../data/paths';

export interface SignpostEntity {
  group: THREE.Group;
  highlightSign: (pathId: number | null, hoveredPathId?: number | null) => void;
}

/**
 * Erstellt den zentralen Wegweiser mit sieben Richtungsschildern.
 */
export function createSignpost(): SignpostEntity {
  const group = new THREE.Group();
  group.name = 'Signpost';

  const postMaterial = new THREE.MeshStandardMaterial({
    color: 0x5c3e26,
    roughness: 0.9,
  });

  // Steinernes Fundament
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.45, 0.58, 0.35, 10),
    new THREE.MeshStandardMaterial({ color: 0x6f7370, roughness: 0.95 })
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

  // Kleine Spitze oben auf dem Pfosten
  const cap = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.3, 12), postMaterial);
  cap.position.y = postHeight + 0.35;
  cap.userData = { interactableType: 'signpost' };
  group.add(cap);

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

  return { group, highlightSign };
}
