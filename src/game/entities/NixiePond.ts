import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { disposeObject3D } from '../utils/threeUtils';

export interface NixiePondEntity {
  group: THREE.Group;
  update: (timeSeconds: number) => void;
}

/**
 * Erstellt den Waldteich am Ende des 2. Weges (Nixenteich-Pfad):
 * - Lädt das detaillierte 3D-Modell `water lily pond 3d model.glb` (`water-lily-pond.glb`)
 *   mit natürlichem Felsenufer und Seerosen.
 * - Markanter Felsblock im Teichbereich (bei lx = -1.8 relativ zum Teichzentrum), auf dem die Nixe sitzt.
 * - Unter der Wasseroberfläche funkelnder, verlockender Goldschatz mit unheimlichem Fluch-Schimmern.
 * - Sanfte konzentrische Wasserwellenringe um den Nixenstein und den versunkenen Hort.
 */
export function createNixiePond(onMeshLoaded?: (mesh: THREE.Object3D) => void): NixiePondEntity {
  const group = new THREE.Group();
  group.name = 'NixiePond';
  // Um weitere 45 Grad nach rechts gedreht (-Math.PI / 2 = -90 Grad in Three.js)
  group.rotation.y = -Math.PI / 2;

  // 1. Temporärer Platzhalter während des Modell-Ladens (mit doppelter Höhe)
  const fallback = new THREE.Group();
  const bedMat = new THREE.MeshStandardMaterial({
    color: 0x0f262a,
    roughness: 0.95,
  });
  const pondBed = new THREE.Mesh(new THREE.CylinderGeometry(4.8, 4.5, 0.16, 36), bedMat);
  pondBed.position.y = 0.04;
  pondBed.receiveShadow = true;
  pondBed.userData = { interactableType: 'pond' };
  fallback.add(pondBed);

  const waterMat = new THREE.MeshStandardMaterial({
    color: 0x1e6f78,
    emissive: 0x0b3138,
    emissiveIntensity: 0.45,
    roughness: 0.14,
    metalness: 0.28,
    transparent: true,
    opacity: 0.84,
  });
  const waterSurface = new THREE.Mesh(new THREE.CylinderGeometry(4.7, 4.6, 0.12, 36), waterMat);
  waterSurface.position.y = 0.12;
  waterSurface.receiveShadow = true;
  waterSurface.userData = { interactableType: 'pond' };
  fallback.add(waterSurface);
  group.add(fallback);

  // 2. Lade das 3D-Seerosenteich-Modell mit verdoppelter Höhe (6.8 statt 3.4)
  const loader = new GLTFLoader();
  const pondUrl = '/assets/models/water-lily-pond.glb';
  loader.load(
    pondUrl,
    (gltf) => {
      const model = gltf.scene;

      // Modell auf Teichgröße und verdoppelte Höhe skalieren (ca. 10.5m x 10.5m, Höhe 6.8m)
      model.scale.set(10.5, 6.8, 10.5);

      // Bounding-Box ermitteln und Bodenkontakt bei y = 0 ausrichten
      model.updateMatrixWorld(true);
      const bounds = new THREE.Box3().setFromObject(model);
      model.position.set(0, -bounds.min.y + 0.01, 0);

      model.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          mesh.userData = { interactableType: 'pond' };

          if (mesh.material && 'roughness' in mesh.material) {
            const mat = mesh.material as THREE.MeshStandardMaterial;
            if (!mat.roughnessMap) {
              mat.roughness = 0.75;
              mat.metalness = 0.15;
            }
          }

          if (onMeshLoaded) {
            onMeshLoaded(mesh);
          }
        }
      });

      // Platzhalter durch das fertige 3D-Modell ersetzen und Speicher freigeben
      group.remove(fallback);
      disposeObject3D(fallback);
      group.add(model);
    },
    undefined,
    (err) => {
      console.warn('Seerosenteich-Modell konnte nicht geladen werden, versuche Ausweichpfad:', err);
      loader.load('/assets/models/water lily pond 3d model.glb', (fallbackGltf) => {
        const model = fallbackGltf.scene;
        model.scale.set(10.5, 6.8, 10.5);
        model.updateMatrixWorld(true);
        const bounds = new THREE.Box3().setFromObject(model);
        model.position.set(0, -bounds.min.y + 0.01, 0);
        group.remove(fallback);
        disposeObject3D(fallback);
        group.add(model);
      });
    }
  );

  // 3. Konzentrische Wasserwellen-Ringe um den Nixenstein und den versunkenen Schatz
  const rippleMat1 = new THREE.MeshBasicMaterial({
    color: 0x8be8e0,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.32,
  });
  const rippleRing1 = new THREE.Mesh(new THREE.RingGeometry(1.15, 1.23, 32), rippleMat1);
  rippleRing1.rotation.x = -Math.PI / 2;
  rippleRing1.position.set(-1.6, 0.22, 0);
  group.add(rippleRing1);

  const rippleMat2 = new THREE.MeshBasicMaterial({
    color: 0xffd97d,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.28,
  });
  const rippleRing2 = new THREE.Mesh(new THREE.RingGeometry(0.65, 0.73, 28), rippleMat2);
  rippleRing2.rotation.x = -Math.PI / 2;
  rippleRing2.position.set(-2.5, 0.22, 0.8);
  group.add(rippleRing2);

  // 4. Der verlockende, verfluchte Schatz unter der Wasseroberfläche
  const treasureGroup = new THREE.Group();
  treasureGroup.position.set(-2.5, 0.16, 0.8);

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xffd452,
    emissive: 0xc98a12,
    emissiveIntensity: 0.95,
    roughness: 0.18,
    metalness: 0.85,
  });
  const curseGemMat = new THREE.MeshStandardMaterial({
    color: 0xb95cff,
    emissive: 0x7b1fa2,
    emissiveIntensity: 1.25,
    roughness: 0.15,
    metalness: 0.5,
  });

  const goldHoard = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.52, 0.08, 12), goldMat);
  goldHoard.position.y = 0.02;
  goldHoard.userData = { interactableType: 'pond' };
  treasureGroup.add(goldHoard);

  const crownRing = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.045, 8, 16), goldMat);
  crownRing.rotation.x = Math.PI / 2 - 0.18;
  crownRing.position.set(0, 0.08, 0);
  crownRing.userData = { interactableType: 'pond' };
  treasureGroup.add(crownRing);

  const curseJewel = new THREE.Mesh(new THREE.OctahedronGeometry(0.13, 0), curseGemMat);
  curseJewel.position.set(0, 0.11, 0);
  curseJewel.userData = { interactableType: 'pond' };
  treasureGroup.add(curseJewel);

  const treasureLight = new THREE.PointLight(0xffca4b, 1.3, 4.5);
  treasureLight.position.set(0, 0.38, 0);
  treasureGroup.add(treasureLight);

  group.add(treasureGroup);

  const update = (timeSeconds: number) => {
    const wave1 = 0.5 + 0.5 * Math.sin(timeSeconds * 1.8);
    const wave2 = 0.5 + 0.5 * Math.sin(timeSeconds * 2.3 + 1.4);

    rippleRing1.scale.setScalar(0.95 + wave1 * 0.16);
    rippleMat1.opacity = 0.18 + (1 - wave1) * 0.22;

    rippleRing2.scale.setScalar(0.9 + wave2 * 0.22);
    rippleMat2.opacity = 0.16 + (1 - wave2) * 0.24;

    // Verlockendes und zugleich unheimliches Pulsieren des Schatzes unter Wasser
    curseJewel.rotation.y = timeSeconds * 1.5;
    treasureLight.intensity = 1.1 + Math.sin(timeSeconds * 3.1) * 0.35;
  };

  return { group, update };
}
