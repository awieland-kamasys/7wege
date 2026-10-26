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
 * Erzeugt eine prozedurale weiche Nebel-Textur (wolkiger Dunstflecken).
 */
function createMistTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(128, 128, 16, 128, 128, 124);
    grad.addColorStop(0.0, 'rgba(255, 255, 255, 0.92)');
    grad.addColorStop(0.35, 'rgba(255, 255, 255, 0.72)');
    grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.28)');
    grad.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Erstellt die Wegsperre auf Weg 7 im Rücken des Spielers zu Spielbeginn:
 * Eine blickdichte, wallende und stimmungsvolle Nebelwand (ohne sichtbare Holzhindernisse),
 * die den Pfad zum Tor vollständig im dichten Waldnebel verschluckt, solange die
 * spielende Person noch nicht mit Waldhüter Arvid an der Schutzhütte gesprochen hat.
 */
export function createPath7GateBlock(): Path7GateBlockEntity {
  const group = new THREE.Group();
  group.name = 'Path7GateMistWall';
  group.position.set(PATH_7_GATE_BLOCK_POS.x, 0, PATH_7_GATE_BLOCK_POS.z);
  group.rotation.y = PATH_7_GATE_BLOCK_POS.rotationY;

  const pickableMeshes: THREE.Object3D[] = [];
  const mistTexture = typeof document !== 'undefined' ? createMistTexture() : null;

  // Mehrere gestaffelte Nebelwände quer über den Weg (14 m breit, 5.5 m hoch)
  // Überdecken Weg 7 und die seitlichen Baumbereiche vollständig
  const mistLayers = [
    { offsetZ: -0.9, width: 14.0, height: 5.5, y: 2.2, baseOpacity: 0.65, swaySpeed: 0.6 },
    { offsetZ: -0.3, width: 15.0, height: 5.8, y: 2.4, baseOpacity: 0.75, swaySpeed: 0.8 },
    { offsetZ: 0.3, width: 14.5, height: 5.2, y: 2.1, baseOpacity: 0.82, swaySpeed: 0.7 },
    { offsetZ: 0.8, width: 15.5, height: 5.6, y: 2.3, baseOpacity: 0.68, swaySpeed: 0.5 },
  ];

  const layerMeshes: THREE.Mesh[] = [];
  const layerMaterials: THREE.MeshBasicMaterial[] = [];

  for (let i = 0; i < mistLayers.length; i++) {
    const layer = mistLayers[i];
    const geo = new THREE.PlaneGeometry(layer.width, layer.height);
    const mat = new THREE.MeshBasicMaterial({
      map: mistTexture,
      color: 0xd8dfdc, // Natürlicher Waldnebelfarbton
      transparent: true,
      opacity: layer.baseOpacity,
      depthWrite: false,
      side: THREE.DoubleSide,
      fog: true,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(0, layer.y, layer.offsetZ);
    group.add(mesh);

    layerMeshes.push(mesh);
    layerMaterials.push(mat);
  }

  // Unsichtbare Raycast-Hitbox für Klicks auf die Nebelwand
  const hitboxGeo = new THREE.PlaneGeometry(8.0, 4.0);
  const hitboxMat = new THREE.MeshBasicMaterial({
    visible: false,
    side: THREE.DoubleSide,
  });
  const hitboxMesh = new THREE.Mesh(hitboxGeo, hitboxMat);
  hitboxMesh.position.set(0, 1.8, 0);
  hitboxMesh.userData = { interactableType: 'path7_gate_block' };
  group.add(hitboxMesh);
  pickableMeshes.push(hitboxMesh);

  let dissolving = false;
  let dissolveTimer = 0;
  const dissolveDuration = 1.8;
  let onCompleteCallback: (() => void) | undefined;
  let removed = false;
  let pulseTimer = 0;

  return {
    group,
    pickableMeshes,
    update: (dtSeconds: number, isHovered = false) => {
      if (removed) return;

      pulseTimer += dtSeconds;

      // Sanftes, organisches Wogen der Nebelschichten
      for (let i = 0; i < layerMeshes.length; i++) {
        const mesh = layerMeshes[i];
        const mat = layerMaterials[i];
        const config = mistLayers[i];

        const swayX = Math.sin(pulseTimer * config.swaySpeed + i * 1.4) * 0.35;
        mesh.position.x = swayX;

        // Leichtes Atmen der Opacity
        const pulse = Math.sin(pulseTimer * (config.swaySpeed * 1.2) + i) * 0.08;
        const hoverBoost = isHovered ? 0.08 : 0.0;
        mat.opacity = THREE.MathUtils.clamp(config.baseOpacity + pulse + hoverBoost, 0.0, 1.0);
      }

      if (dissolving) {
        dissolveTimer += dtSeconds;
        const progress = Math.min(1, dissolveTimer / dissolveDuration);

        // Sanftes Ausfaden der Nebelwand
        const fade = 1 - progress;
        for (let i = 0; i < layerMaterials.length; i++) {
          layerMaterials[i].opacity = mistLayers[i].baseOpacity * fade;
        }

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
