import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createVeinedLavaRockTexture } from '../textures/GroundTextures';
import { disposeObject3D } from '../utils/threeUtils';

export interface HellChasmEntity {
  group: THREE.Group;
  update: (elapsedSeconds: number) => void;
  loadModel?: () => void;
}

/**
 * Erzeugt eine realistische, lodernde Feuer-Canvas-Textur mit weißgelber Glut,
 * feurigem Orange, Karminrot und weichem Alpha-Rauchauslauf.
 */
function createFlameTexture(): THREE.CanvasTexture | null {
  if (typeof document === 'undefined') {
    return null;
  }
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Weicher radialer Glut-Glow an der Flammenbasis
  const baseGlow = ctx.createRadialGradient(64, 230, 6, 64, 230, 56);
  baseGlow.addColorStop(0.0, 'rgba(255, 255, 240, 0.9)');
  baseGlow.addColorStop(0.3, 'rgba(255, 200, 40, 0.6)');
  baseGlow.addColorStop(0.7, 'rgba(255, 80, 10, 0.2)');
  baseGlow.addColorStop(1.0, 'rgba(200, 20, 0, 0.0)');
  ctx.fillStyle = baseGlow;
  ctx.fillRect(0, 170, 128, 86);

  // Mehrschichtiger vertikaler Farbverlauf für die Flammenzungen
  const grad = ctx.createLinearGradient(0, canvas.height, 0, 0);
  grad.addColorStop(0.0, 'rgba(255, 255, 230, 1.0)'); // Heiße weißgelbe Basis
  grad.addColorStop(0.18, 'rgba(255, 215, 50, 0.95)'); // Helles Feuergelb
  grad.addColorStop(0.42, 'rgba(255, 115, 10, 0.88)'); // Kräftiges Loderorange
  grad.addColorStop(0.70, 'rgba(225, 35, 0, 0.65)');  // Karminrote Flammenspitze
  grad.addColorStop(0.90, 'rgba(125, 20, 0, 0.25)');  // Rauch-Übergang
  grad.addColorStop(1.0, 'rgba(20, 5, 0, 0.0)');      // Weiches Ausfaden

  ctx.fillStyle = grad;

  // 1. Linke züngelnde Flamme
  ctx.beginPath();
  ctx.moveTo(46, 248);
  ctx.bezierCurveTo(24, 210, 18, 150, 36, 110);
  ctx.bezierCurveTo(46, 140, 48, 185, 52, 248);
  ctx.closePath();
  ctx.fill();

  // 2. Rechte züngelnde Flamme
  ctx.beginPath();
  ctx.moveTo(82, 248);
  ctx.bezierCurveTo(104, 210, 110, 150, 92, 105);
  ctx.bezierCurveTo(82, 140, 80, 185, 76, 248);
  ctx.closePath();
  ctx.fill();

  // 3. Mittlere, hohe Hauptflammenzunge
  ctx.beginPath();
  const cx = 64;
  const bottomY = 252;
  const topY = 12;
  const baseW = 46;

  ctx.moveTo(cx - baseW * 0.45, bottomY);
  ctx.bezierCurveTo(cx - baseW, bottomY - 55, cx - baseW * 0.75, bottomY - 145, cx, topY);
  ctx.bezierCurveTo(cx + baseW * 0.75, bottomY - 145, cx + baseW, bottomY - 55, cx + baseW * 0.45, bottomY);
  ctx.closePath();
  ctx.fill();

  // 4. Innere glühende Glutader für maximale Tiefe und Plastizität
  const innerGrad = ctx.createLinearGradient(0, canvas.height, 0, canvas.height * 0.35);
  innerGrad.addColorStop(0.0, 'rgba(255, 255, 255, 0.98)');
  innerGrad.addColorStop(0.45, 'rgba(255, 240, 140, 0.85)');
  innerGrad.addColorStop(1.0, 'rgba(255, 150, 30, 0.0)');

  ctx.beginPath();
  ctx.moveTo(cx - 16, bottomY);
  ctx.bezierCurveTo(cx - 22, bottomY - 45, cx - 12, bottomY - 110, cx, bottomY - 160);
  ctx.bezierCurveTo(cx + 12, bottomY - 110, cx + 22, bottomY - 45, cx + 16, bottomY);
  ctx.closePath();
  ctx.fillStyle = innerGrad;
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Erstellt den feurigen Höllenschlund / Lavakrater am Ende des 5. Weges:
 * Lädt das 3D-Modell `lava crater 3d model.glb` (`lava-crater.glb`), skaliert es
 * auf passende Landschaftsgröße und dreht es um 45 Grad im Uhrzeigersinn.
 * Beinhaltet realistisch texturierte, lodernde Flammenzungen mit Additive-Blending,
 * aufsteigende Funken und dramatisch flackernde Höllenfeuer-Lichter.
 */
export function createHellChasm(
  onMeshLoaded?: (mesh: THREE.Object3D) => void,
  options?: { loadDelayMs?: number; lazy?: boolean }
): HellChasmEntity {
  const group = new THREE.Group();
  group.name = 'HellChasm';
  group.userData = { interactableType: 'hell_chasm' };

  // Unsichtbare Zylinder-Hitbox für sofortige Klickbarkeit und Raycasting
  const hitMat = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const hitbox = new THREE.Mesh(new THREE.CylinderGeometry(8.5, 8.5, 0.8, 16), hitMat);
  hitbox.position.y = 0.4;
  hitbox.userData = { interactableType: 'hell_chasm' };
  group.add(hitbox);

  // Um 45 Grad im Uhrzeigersinn gedrehte Inhaltsgruppe für Krater und Flammeneffekte.
  // Setzt bündig auf dem Boden (y = 0.0) auf, sodass der Lavasee in voller Pracht über der Ebene liegt.
  const craterContentGroup = new THREE.Group();
  craterContentGroup.rotation.y = -Math.PI / 4;
  craterContentGroup.position.y = 0.0;
  group.add(craterContentGroup);

  // Temporärer dezenter Platzhalter während des Modell-Ladens
  const fallback = new THREE.Group();
  const fallbackMat = new THREE.MeshStandardMaterial({
    color: 0x22110c,
    roughness: 0.9,
    metalness: 0.1,
  });
  const fallbackRing = new THREE.Mesh(new THREE.CylinderGeometry(8.5, 8.8, 0.8, 24), fallbackMat);
  fallbackRing.position.y = 0.4;
  fallbackRing.userData = { interactableType: 'hell_chasm' };
  fallback.add(fallbackRing);

  const fallbackLava = new THREE.Mesh(
    new THREE.CylinderGeometry(7.5, 7.5, 0.4, 24),
    new THREE.MeshStandardMaterial({
      color: 0xff3b00,
      emissive: 0xff4800,
      emissiveIntensity: 1.8,
      roughness: 0.2,
    })
  );
  fallbackLava.position.y = 0.44;
  fallbackLava.userData = { interactableType: 'hell_chasm' };
  fallback.add(fallbackLava);
  craterContentGroup.add(fallback);

  // Variable zum Speichern des Modell-Lavamaterials für dynamische Glutanimation
  let modelLavaMat: THREE.MeshStandardMaterial | null = null;

  // Lade das bereinigte 3D-Kratermodell mit verdoppelter Plateau- und Reliefhöhe (15.0)
  let isLoadedOrLoading = false;
  const startLoad = (): void => {
    if (isLoadedOrLoading) return;
    isLoadedOrLoading = true;

    const loader = new GLTFLoader();
    loader.load(
      '/assets/models/lava-crater.glb',
      (gltf) => {
        const model = gltf.scene;
        // Kratermodell auf ca. 17.5m Durchmesser und verdoppelte Relief-/Plattformhöhe (15.0 statt 7.5) skalieren
        model.scale.set(17.5, 15.0, 17.5);

        model.updateMatrixWorld(true);
        const bounds = new THREE.Box3().setFromObject(model);
        model.position.set(0, -bounds.min.y, 0);

        model.traverse((child) => {
          const mesh = child as THREE.Mesh;
          if (mesh.isMesh) {
            // Der Krater ist eine Bodensenke und empfängt Schatten (wirft keinen Schatten nach oben)
            mesh.castShadow = false;
            mesh.receiveShadow = true;
            mesh.userData = { interactableType: 'hell_chasm' };

            if (mesh.material && 'roughness' in mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = 0.55;
              mat.metalness = 0.2;
              // Lava leuchtend machen: Textur als EmissiveMap mit intensivem Glut-Leuchten
              if (mat.map) {
                mat.emissiveMap = mat.map;
                mat.emissive = new THREE.Color(0xff4400);
                mat.emissiveIntensity = 1.6;
                modelLavaMat = mat;
              }
            }

            if (onMeshLoaded) {
              onMeshLoaded(mesh);
            }
          }
        });

        // Platzhalter durch das fertige Modell ersetzen und Speicher freigeben
        craterContentGroup.remove(fallback);
        disposeObject3D(fallback);
        craterContentGroup.add(model);
      },
      undefined,
      (err) => {
        console.warn('Lavakrater-Modell lava-crater.glb konnte nicht geladen werden, nutze Platzhalter:', err);
      }
    );
  };

  if (!options?.lazy) {
    if (options?.loadDelayMs && options.loadDelayMs > 0) {
      setTimeout(startLoad, options.loadDelayMs);
    } else {
      startLoad();
    }
  }

  // Realistische lodernde Flammen mit Feuer-Canvas-Textur und Additive Blending
  const flameTexture = createFlameTexture();
  const realisticFlameMat = new THREE.MeshBasicMaterial({
    map: flameTexture ?? undefined,
    color: flameTexture ? 0xffffff : 0xff6600,
    transparent: true,
    opacity: 0.92,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  // Spitze, glühende Lavasteine im Kraterbecken und am Kraterrand
  const lavaRockTex = createVeinedLavaRockTexture();
  if (lavaRockTex.map) lavaRockTex.map.repeat.set(1.5, 2.5);
  if (lavaRockTex.emissiveMap) lavaRockTex.emissiveMap.repeat.set(1.5, 2.5);
  if (lavaRockTex.bumpMap) lavaRockTex.bumpMap.repeat.set(1.5, 2.5);

  const glowingLavaSpikeMat = new THREE.MeshStandardMaterial({
    color: 0x181515,
    map: lavaRockTex.map ?? undefined,
    emissiveMap: lavaRockTex.emissiveMap ?? undefined,
    emissive: new THREE.Color(0xff3300),
    emissiveIntensity: 2.2,
    bumpMap: lavaRockTex.bumpMap ?? undefined,
    bumpScale: 0.12,
    roughness: 0.85,
    metalness: 0.25,
    flatShading: true,
  });

  const spikeConfigs: [number, number, number, number, number, number, number][] = [
    // [x, y, z, baseRadius, height, rotY, tiltZ]
    [-3.2, 0.9, -2.4, 0.55, 1.9, 0.4, 0.12],
    [3.4, 0.9, -2.1, 0.6, 2.1, 1.1, -0.1],
    [-2.8, 0.9, 2.8, 0.5, 1.7, 2.3, 0.15],
    [3.1, 0.9, 2.5, 0.55, 1.85, 0.8, -0.14],
    [-4.8, 0.85, 0.6, 0.65, 2.2, 1.9, 0.08],
    [4.6, 0.85, -0.8, 0.65, 2.3, 2.7, -0.09],
    [-1.2, 0.9, 3.8, 0.45, 1.6, 0.2, 0.1],
    [1.4, 0.9, 3.6, 0.48, 1.75, 1.5, -0.11],
    [-1.5, 0.9, -3.9, 0.48, 1.65, 0.9, 0.08],
    [1.6, 0.9, -3.8, 0.5, 1.7, 2.1, -0.07],
    // Zusätzliche spitze Lavasteine am inneren Kraterrand
    [-5.6, 0.7, -2.8, 0.7, 2.4, 0.6, 0.18],
    [5.8, 0.7, 2.4, 0.75, 2.5, 1.7, -0.16],
    [-5.2, 0.7, 3.5, 0.68, 2.2, 2.5, 0.14],
    [5.4, 0.7, -3.2, 0.7, 2.3, 0.3, -0.15],
  ];

  for (const [sx, sy, sz, br, sh, ry, tz] of spikeConfigs) {
    const spike = new THREE.Mesh(
      new THREE.ConeGeometry(br, sh, 5),
      glowingLavaSpikeMat
    );
    spike.position.set(sx, sy + sh * 0.45, sz);
    spike.rotation.set(0.05, ry, tz);
    spike.castShadow = true;
    spike.receiveShadow = true;
    spike.userData = { interactableType: 'hell_chasm' };
    craterContentGroup.add(spike);
  }

  const flameEntities: {
    group: THREE.Group;
    baseScaleY: number;
    baseScaleX: number;
    speed: number;
    phase: number;
  }[] = [];

  // Flammenpositionen um die erhöhte zentrale Felsplattform und in den Lavabecken des Kraters
  const flamePositions: [number, number, number, number, number][] = [
    // [x, y, z, breite, höhe]
    // Um das verdoppelte zentrale Felsenplateau
    [-2.0, 1.7, -1.8, 1.0, 2.2],
    [2.1, 1.7, -1.7, 1.0, 2.3],
    [-2.2, 1.7, 1.6, 0.95, 2.1],
    [2.0, 1.7, 1.7, 1.05, 2.25],
    [-0.4, 1.85, -2.5, 0.9, 2.0],
    [0.5, 1.85, 2.4, 0.9, 2.0],
    // Mittleres Lavabecken
    [-4.2, 0.85, -3.2, 1.3, 2.6],
    [4.3, 0.85, -2.9, 1.3, 2.7],
    [-3.8, 0.85, 3.1, 1.2, 2.5],
    [3.9, 0.85, 3.3, 1.25, 2.55],
    [-5.2, 0.85, 0.1, 1.4, 2.8],
    [5.1, 0.85, -0.2, 1.35, 2.7],
    [-1.6, 0.85, 4.8, 1.15, 2.4],
    [1.7, 0.85, 4.7, 1.2, 2.45],
    [-2.0, 0.85, -4.9, 1.15, 2.3],
    [1.9, 0.85, -5.0, 1.2, 2.4],
  ];

  flamePositions.forEach(([fx, fy, fz, w, h], idx) => {
    const flameCluster = new THREE.Group();
    flameCluster.position.set(fx, fy, fz);

    // Gekreuzte Planes (X-Form) für voluminöses, von allen Seiten plastisch sichtbares Feuer
    const planeGeo = new THREE.PlaneGeometry(w, h);
    planeGeo.translate(0, h * 0.48, 0); // Drehpunkt an die Flammenbasis legen

    const plane1 = new THREE.Mesh(planeGeo, realisticFlameMat);
    plane1.rotation.y = idx * 0.4;
    flameCluster.add(plane1);

    const plane2 = new THREE.Mesh(planeGeo, realisticFlameMat);
    plane2.rotation.y = idx * 0.4 + Math.PI / 2;
    flameCluster.add(plane2);

    craterContentGroup.add(flameCluster);

    flameEntities.push({
      group: flameCluster,
      baseScaleY: 1.0 + (idx % 3) * 0.2,
      baseScaleX: 1.0 + (idx % 2) * 0.15,
      speed: 4.8 + (idx % 5) * 1.2,
      phase: idx * 0.7,
    });
  });

  // Aufsteigende Glut- und Funkenpartikel
  const sparkCount = 36;
  const sparkGeo = new THREE.BoxGeometry(0.09, 0.14, 0.09);
  const sparkMat = new THREE.MeshBasicMaterial({ color: 0xffdd44 });
  const sparks: { mesh: THREE.Mesh; startY: number; speedY: number; angle: number; radius: number }[] = [];

  for (let i = 0; i < sparkCount; i++) {
    const spark = new THREE.Mesh(sparkGeo, sparkMat);
    const angle = (i * Math.PI * 2) / sparkCount + Math.sin(i) * 0.5;
    const radius = 1.3 + (i % 6) * 1.05;
    const startY = 0.6 + (i % 10) * 0.35;
    spark.position.set(Math.sin(angle) * radius, startY, Math.cos(angle) * radius);
    craterContentGroup.add(spark);

    sparks.push({
      mesh: spark,
      startY: 0.5,
      speedY: 0.95 + (i % 4) * 0.4,
      angle,
      radius,
    });
  }

  // Flackernde Höllenfeuer-Punktlichter (angepasst an abgesenkte Kraterposition)
  const fireLight1 = new THREE.PointLight(0xff5500, 3.8, 28);
  fireLight1.position.set(0, 4.35, 0);
  group.add(fireLight1);

  const fireLight2 = new THREE.PointLight(0xff2200, 2.8, 22);
  fireLight2.position.set(-3.2, 2.75, 2.0);
  group.add(fireLight2);

  const fireLight3 = new THREE.PointLight(0xffaa00, 2.2, 22);
  fireLight3.position.set(3.4, 2.75, -1.8);
  group.add(fireLight3);

  return {
    group,
    loadModel: startLoad,
    update: (elapsedSeconds: number) => {
      // Dynamisches Glüh-Pulsieren für flüssige Lava und spitze Lavasteine
      const lavaPulse = 0.88 + 0.24 * Math.sin(elapsedSeconds * 3.4) + 0.12 * Math.cos(elapsedSeconds * 5.2);
      glowingLavaSpikeMat.emissiveIntensity = 2.2 * lavaPulse;
      if (modelLavaMat) {
        modelLavaMat.emissiveIntensity = 1.6 * lavaPulse;
      }
      if (fallbackLava.material instanceof THREE.MeshStandardMaterial) {
        fallbackLava.material.emissiveIntensity = 1.8 * lavaPulse;
      }

      // Realistische Flammenzungen dynamisch lodern, pulsieren und wiegen lassen
      for (const f of flameEntities) {
        const pulse = Math.sin(elapsedSeconds * f.speed + f.phase);
        const sway = Math.cos(elapsedSeconds * (f.speed * 0.7) + f.phase);
        f.group.scale.y = f.baseScaleY * (0.82 + 0.28 * pulse);
        f.group.scale.x = f.baseScaleX * (0.90 + 0.16 * sway);
        f.group.scale.z = f.baseScaleX * (0.90 + 0.16 * sway);
        f.group.rotation.y += 0.015;
      }

      // Funken nach oben steigen lassen
      for (let i = 0; i < sparks.length; i++) {
        const sp = sparks[i];
        sp.mesh.position.y += sp.speedY * 0.02;
        sp.mesh.position.x = Math.sin(sp.angle + elapsedSeconds * 0.6) * sp.radius;
        sp.mesh.position.z = Math.cos(sp.angle + elapsedSeconds * 0.6) * sp.radius;

        if (sp.mesh.position.y > 5.5) {
          sp.mesh.position.y = sp.startY;
        }
      }

      // Höllenfeuer-Lichter dramatisch flackern lassen
      const flicker1 = 0.85 + 0.25 * Math.sin(elapsedSeconds * 9.2) + 0.15 * Math.sin(elapsedSeconds * 14.8);
      const flicker2 = 0.85 + 0.25 * Math.cos(elapsedSeconds * 11.5) + 0.15 * Math.sin(elapsedSeconds * 7.1);
      const flicker3 = 0.85 + 0.2 * Math.sin(elapsedSeconds * 8.4);

      fireLight1.intensity = 3.8 * flicker1;
      fireLight2.intensity = 2.8 * flicker2;
      fireLight3.intensity = 2.2 * flicker3;
    },
  };
}
