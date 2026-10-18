import * as THREE from 'three';
import { Vector2D } from '../systems/CrossroadsState';

export interface DevilNpcEntity {
  group: THREE.Group;
  update: (elapsedSeconds: number, playerPos: Readonly<Vector2D>, isHoveredOrActive: boolean) => void;
}

/**
 * Erstellt die 3D-Figur „Der Teufel“ inmitten des Höllenschlundes:
 * Ein mächtiger Dämon mit karminrotem Körper, geschwungenen Hörnern, glühend gelben Augen,
 * pechschwarzem Ziegenbart, einem langen Pfeilschwanz und einem finsteren Dreizack aus schwarzem Eisen.
 */
export function createDevilNpc(): DevilNpcEntity {
  const group = new THREE.Group();
  group.userData = { interactableType: 'devil' };

  // Materialien
  const devilSkinMat = new THREE.MeshStandardMaterial({
    color: 0xa81c1c,
    roughness: 0.65,
    metalness: 0.2,
  });

  const devilDarkSkinMat = new THREE.MeshStandardMaterial({
    color: 0x610f0f,
    roughness: 0.75,
  });

  const hoofMat = new THREE.MeshStandardMaterial({
    color: 0x1a1212,
    roughness: 0.85,
    metalness: 0.3,
  });

  const hornMat = new THREE.MeshStandardMaterial({
    color: 0x221a24,
    emissive: 0x550a00,
    emissiveIntensity: 0.35,
    roughness: 0.45,
    metalness: 0.5,
  });

  const capeMat = new THREE.MeshStandardMaterial({
    color: 0x1c0b0b,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });

  const tridentMat = new THREE.MeshStandardMaterial({
    color: 0x242426,
    metalness: 0.8,
    roughness: 0.3,
  });

  const fireTipMat = new THREE.MeshStandardMaterial({
    color: 0xff4400,
    emissive: 0xff6600,
    emissiveIntensity: 0.9,
    roughness: 0.2,
  });

  // Unterer Sockel / Füße & Hufe
  const leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 1.1, 8), devilDarkSkinMat);
  leftLeg.position.set(-0.35, 1.85, 0);
  leftLeg.castShadow = true;
  group.add(leftLeg);

  const rightLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 1.1, 8), devilDarkSkinMat);
  rightLeg.position.set(0.35, 1.85, 0);
  rightLeg.castShadow = true;
  group.add(rightLeg);

  const leftHoof = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.22, 0.4), hoofMat);
  leftHoof.position.set(-0.35, 1.35, 0.05);
  leftHoof.castShadow = true;
  group.add(leftHoof);

  const rightHoof = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.22, 0.4), hoofMat);
  rightHoof.position.set(0.35, 1.35, 0.05);
  rightHoof.castShadow = true;
  group.add(rightHoof);

  // Oberkörper (Torso)
  const torsoGroup = new THREE.Group();
  torsoGroup.position.set(0, 2.7, 0);
  group.add(torsoGroup);

  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.36, 1.25, 8), devilSkinMat);
  torso.castShadow = true;
  torsoGroup.add(torso);

  // Brustpanzer / Muskeldefinition
  const chestPlate = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.55, 0.28), devilDarkSkinMat);
  chestPlate.position.set(0, 0.18, 0.24);
  torsoGroup.add(chestPlate);

  // Umhang auf dem Rücken
  const cape = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.6, 0.08), capeMat);
  cape.position.set(0, -0.15, -0.32);
  cape.rotation.x = 0.1;
  torsoGroup.add(cape);

  // Dämonischer Kopf
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.85, 0);
  torsoGroup.add(headGroup);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.58, 0.52), devilSkinMat);
  head.castShadow = true;
  headGroup.add(head);

  // Glühende gelb-rote Augen
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffdd00 });
  const leftEye = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.07, 0.05), eyeMat);
  leftEye.position.set(-0.16, 0.08, 0.28);
  headGroup.add(leftEye);

  const rightEye = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.07, 0.05), eyeMat);
  rightEye.position.set(0.16, 0.08, 0.28);
  headGroup.add(rightEye);

  // Pechschwarzer Ziegenbart
  const beard = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.42, 4), hoofMat);
  beard.position.set(0, -0.38, 0.22);
  beard.rotation.x = 0.35;
  headGroup.add(beard);

  // Zwei geschwungene Dämonenhörner
  const createHorn = (sign: number): THREE.Group => {
    const horn = new THREE.Group();
    const base = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.65, 6), hornMat);
    base.position.set(0, 0.3, 0);
    horn.add(base);

    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.45, 6), fireTipMat);
    tip.position.set(sign * 0.1, 0.72, -0.05);
    tip.rotation.z = sign * 0.4;
    horn.add(tip);

    horn.position.set(sign * 0.26, 0.35, -0.05);
    horn.rotation.z = sign * 0.45;
    horn.rotation.x = -0.25;
    return horn;
  };

  headGroup.add(createHorn(-1));
  headGroup.add(createHorn(1));

  // Linker Arm (in Pose zur Seite gerichtet)
  const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.16, 0.95, 6), devilSkinMat);
  leftArm.position.set(-0.62, 0.05, 0.08);
  leftArm.rotation.z = 0.35;
  leftArm.rotation.x = -0.2;
  torsoGroup.add(leftArm);

  // Rechter Arm (hält den Dreizack)
  const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.16, 0.95, 6), devilSkinMat);
  rightArm.position.set(0.62, 0.05, 0.18);
  rightArm.rotation.z = -0.32;
  rightArm.rotation.x = -0.55;
  torsoGroup.add(rightArm);

  // Der eiserne Dreizack (Trident)
  const tridentGroup = new THREE.Group();
  tridentGroup.position.set(0.85, 0.2, 0.55);
  tridentGroup.rotation.x = 0.15;
  tridentGroup.rotation.z = -0.08;
  torsoGroup.add(tridentGroup);

  // Stab
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 2.7, 8), tridentMat);
  tridentGroup.add(shaft);

  // Querstück
  const crossbar = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.06, 0.06), tridentMat);
  crossbar.position.y = 1.05;
  tridentGroup.add(crossbar);

  // Mittlere Spitze
  const midProng = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.65, 5), fireTipMat);
  midProng.position.y = 1.42;
  tridentGroup.add(midProng);

  // Linke und rechte Zinke
  const leftProng = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.55, 5), fireTipMat);
  leftProng.position.set(-0.24, 1.36, 0);
  tridentGroup.add(leftProng);

  const rightProng = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.55, 5), fireTipMat);
  rightProng.position.set(0.24, 1.36, 0);
  tridentGroup.add(rightProng);

  // Pfeilförmiger Dämonenschwanz
  const tailGroup = new THREE.Group();
  tailGroup.position.set(0, -0.45, -0.3);
  torsoGroup.add(tailGroup);

  const tailBody = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 1.2, 6), devilDarkSkinMat);
  tailBody.position.set(0.15, -0.45, -0.35);
  tailBody.rotation.x = -0.7;
  tailBody.rotation.y = 0.3;
  tailGroup.add(tailBody);

  const tailArrow = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.32, 4), hoofMat);
  tailArrow.position.set(0.3, -0.85, -0.75);
  tailArrow.rotation.x = -1.2;
  tailGroup.add(tailArrow);

  // Über dem Kopf schwebender Interaktions-Kristall (feurig rot-orange)
  const gemMat = new THREE.MeshStandardMaterial({
    color: 0xff3300,
    emissive: 0xff4400,
    emissiveIntensity: 0.95,
    roughness: 0.25,
    metalness: 0.3,
    flatShading: true,
  });

  const talkGem = new THREE.Mesh(new THREE.OctahedronGeometry(0.28, 0), gemMat);
  talkGem.scale.set(0.9, 1.45, 0.9);
  talkGem.position.set(0, 4.3, 0);
  group.add(talkGem);

  const gemLight = new THREE.PointLight(0xff4400, 1.2, 5.5);
  gemLight.position.set(0, 4.3, 0);
  group.add(gemLight);

  // Alle Kind-Meshes für das Raycasting markieren
  group.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.userData = { interactableType: 'devil' };
    }
  });

  return {
    group,
    update: (elapsedSeconds: number, playerPos: Readonly<Vector2D>, isHoveredOrActive: boolean) => {
      // Blickwinkel zur Spielfigur berechnen
      const worldPos = new THREE.Vector3();
      group.getWorldPosition(worldPos);
      const dx = playerPos.x - worldPos.x;
      const dz = playerPos.z - worldPos.z;
      const dist = Math.hypot(dx, dz);

      if (dist < 26.0) {
        const targetRotY = Math.atan2(dx, dz);
        group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetRotY, 0.06);
      }

      // Atmung und Schwebe-Effekt des Torsos
      torsoGroup.position.y = 2.7 + Math.sin(elapsedSeconds * 2.2) * 0.04;
      torsoGroup.rotation.z = Math.sin(elapsedSeconds * 1.5) * 0.02;

      // Schwanzbewegung
      tailGroup.rotation.y = Math.sin(elapsedSeconds * 3.0) * 0.25;

      // Dreizack leicht wiegen
      tridentGroup.rotation.z = -0.08 + Math.sin(elapsedSeconds * 2.0) * 0.04;

      // Schwebender Gesprächskristall
      const pulse = Math.sin(elapsedSeconds * 4.0);
      talkGem.position.y = 4.3 + Math.sin(elapsedSeconds * 2.8) * 0.08;
      talkGem.rotation.y += 0.025;

      if (isHoveredOrActive) {
        gemMat.emissiveIntensity = 1.4 + pulse * 0.5;
        gemLight.intensity = 2.4 + pulse * 0.8;
      } else {
        gemMat.emissiveIntensity = 0.85 + pulse * 0.35;
        gemLight.intensity = 1.2 + pulse * 0.4;
      }
    },
  };
}
