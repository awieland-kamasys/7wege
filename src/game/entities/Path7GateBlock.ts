import * as THREE from 'three';
import { PATH_7_GATE_BLOCK_POS } from '../data/paths';
import { disposeObject3D } from '../utils/threeUtils';

export interface Path7GateBlockEntity {
  group: THREE.Group;
  pickableMeshes: THREE.Object3D[];
  update: (dtSeconds: number, isHovered?: boolean) => void;
  startDissolve: (onComplete?: () => void) => void;
  isDissolving: () => boolean;
  isRemoved: () => boolean;
}

/**
 * Erstellt die Wegsperre auf Weg 7 im Rücken des Spielers zu Spielbeginn:
 * Ein uraltes, dichtes Dickicht aus verschlungenen Waldwurzeln, Moosstämmen und einem
 * wallenden Nebelschleier, das den Pfad zum Tor versperrt, solange die spielende Person
 * noch nicht mit Waldhüter Arvid an der Schutzhütte gesprochen hat.
 */
export function createPath7GateBlock(): Path7GateBlockEntity {
  const group = new THREE.Group();
  group.name = 'Path7GateBlock';
  group.position.set(PATH_7_GATE_BLOCK_POS.x, 0, PATH_7_GATE_BLOCK_POS.z);
  group.rotation.y = PATH_7_GATE_BLOCK_POS.rotationY;

  const pickableMeshes: THREE.Object3D[] = [];

  // 1. Materialien
  const woodMaterial = new THREE.MeshStandardMaterial({
    color: 0x3d2714,
    roughness: 0.9,
    metalness: 0.05,
  });

  const mossMaterial = new THREE.MeshStandardMaterial({
    color: 0x2e4a1f,
    roughness: 0.85,
    metalness: 0.02,
  });

  const mistMaterial = new THREE.MeshStandardMaterial({
    color: 0x8ab4b8,
    transparent: true,
    opacity: 0.42,
    roughness: 1.0,
    metalness: 0.0,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  // 2. Querliegende verwachsene Stämme & dicke Wurzeln
  const logGeo1 = new THREE.CylinderGeometry(0.28, 0.35, 3.8, 8);
  logGeo1.rotateZ(Math.PI / 2);
  const logMesh1 = new THREE.Mesh(logGeo1, woodMaterial);
  logMesh1.position.set(0, 0.32, 0);
  logMesh1.rotation.y = 0.15;
  logMesh1.castShadow = true;
  logMesh1.receiveShadow = true;
  logMesh1.userData = { interactableType: 'path7_gate_block' };
  group.add(logMesh1);
  pickableMeshes.push(logMesh1);

  const logGeo2 = new THREE.CylinderGeometry(0.22, 0.26, 3.4, 8);
  logGeo2.rotateZ(Math.PI / 2);
  const logMesh2 = new THREE.Mesh(logGeo2, woodMaterial);
  logMesh2.position.set(0.15, 0.65, -0.1);
  logMesh2.rotation.y = -0.22;
  logMesh2.castShadow = true;
  logMesh2.receiveShadow = true;
  logMesh2.userData = { interactableType: 'path7_gate_block' };
  group.add(logMesh2);
  pickableMeshes.push(logMesh2);

  // Aufsteigende verschlungene Wurzelbögen
  const rootGeos = [
    { x: -1.2, z: 0.1, r: 0.16, h: 1.25, rotZ: 0.3, rotY: 0.4 },
    { x: -0.4, z: -0.15, r: 0.18, h: 1.45, rotZ: -0.2, rotY: -0.3 },
    { x: 0.5, z: 0.12, r: 0.17, h: 1.35, rotZ: 0.25, rotY: 0.2 },
    { x: 1.2, z: -0.08, r: 0.15, h: 1.15, rotZ: -0.35, rotY: -0.4 },
  ];

  for (const r of rootGeos) {
    const rGeo = new THREE.CylinderGeometry(r.r * 0.7, r.r, r.h, 6);
    const rMesh = new THREE.Mesh(rGeo, woodMaterial);
    rMesh.position.set(r.x, r.h * 0.45, r.z);
    rMesh.rotation.z = r.rotZ;
    rMesh.rotation.y = r.rotY;
    rMesh.castShadow = true;
    rMesh.userData = { interactableType: 'path7_gate_block' };
    group.add(rMesh);
    pickableMeshes.push(rMesh);

    // Moosbüschel auf den Wurzeln
    const mossGeo = new THREE.SphereGeometry(r.r * 1.3, 6, 5);
    mossGeo.scale(1.2, 0.6, 1.0);
    const mossMesh = new THREE.Mesh(mossGeo, mossMaterial);
    mossMesh.position.set(r.x, r.h * 0.7, r.z);
    group.add(mossMesh);
  }

  // 3. Wallender Nebelschleier quer über der Barriere
  const mistPlaneGeo = new THREE.PlaneGeometry(3.6, 1.8);
  const mistMesh = new THREE.Mesh(mistPlaneGeo, mistMaterial);
  mistMesh.position.set(0, 0.9, 0);
  group.add(mistMesh);

  let dissolving = false;
  let dissolveTimer = 0;
  const dissolveDuration = 1.6;
  let onCompleteCallback: (() => void) | undefined;
  let removed = false;
  let pulseTimer = 0;

  return {
    group,
    pickableMeshes,
    update: (dtSeconds: number, isHovered = false) => {
      if (removed) return;

      pulseTimer += dtSeconds;
      // Sanftes Atmen des Nebels
      const pulse = Math.sin(pulseTimer * 1.8) * 0.08;
      mistMaterial.opacity = 0.38 + pulse;

      // Hover-Effekt: Dezent waldgrüner Schimmer
      const hoverIntensity = isHovered ? 0.35 : 0.0;
      woodMaterial.emissive = new THREE.Color(0x1a3318);
      woodMaterial.emissiveIntensity = hoverIntensity;

      if (dissolving) {
        dissolveTimer += dtSeconds;
        const progress = Math.min(1, dissolveTimer / dissolveDuration);

        // Sanftes Absinken in den Boden und Verblassen des Nebels
        const scale = Math.max(0.01, 1 - progress);
        group.scale.set(scale, scale, scale);
        group.position.y = -progress * 1.5;
        mistMaterial.opacity = (1 - progress) * 0.4;

        if (progress >= 1) {
          group.visible = false;
          removed = true;
          disposeObject3D(group);
          if (onCompleteCallback) {
            onCompleteCallback();
          }
        }
      }
    },
    startDissolve: (onComplete?: () => void) => {
      if (dissolving || removed) return;
      dissolving = true;
      dissolveTimer = 0;
      onCompleteCallback = onComplete;
    },
    isDissolving: () => dissolving,
    isRemoved: () => removed,
  };
}
