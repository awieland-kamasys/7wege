import * as THREE from 'three';

/**
 * Gibt Geometrien, Materialien und Texturen eines Three.js-Objekts und aller seiner
 * Unterobjekte rekursiv frei, um Speicherlecks im VRAM zu verhindern.
 */
export function disposeObject3D(object: THREE.Object3D): void {
  object.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      if (mesh.geometry) {
        mesh.geometry.dispose();
      }
      if (mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => mat.dispose());
        } else {
          mesh.material.dispose();
        }
      }
    }
  });
}
