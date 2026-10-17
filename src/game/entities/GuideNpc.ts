import * as THREE from 'three';

export interface GuideNpcEntity {
  group: THREE.Group;
  update: (timeSeconds: number, playerPos: { x: number; z: number }, highlighted: boolean) => void;
}

/**
 * Erstellt die 3D-Figur des Hinweisgebers (Waldhüter Arvid) direkt an der Schutzhütte.
 */
export function createGuideNpc(): GuideNpcEntity {
  const group = new THREE.Group();
  group.name = 'GuideNpc';

  // Dunkelbrauner Waldmantel
  const cloakMat = new THREE.MeshStandardMaterial({
    color: 0x523a28,
    roughness: 0.78,
    emissive: 0x000000,
  });
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xd8c39e,
    roughness: 0.5,
    emissive: 0x000000,
  });
  const hatMat = new THREE.MeshStandardMaterial({
    color: 0x2f4f38,
    roughness: 0.75,
    emissive: 0x000000,
  });
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x4a301d,
    roughness: 0.9,
  });
  const lanternMat = new THREE.MeshStandardMaterial({
    color: 0xffd275,
    emissive: 0xd99b26,
    emissiveIntensity: 0.85,
    roughness: 0.25,
  });

  // Mantel / Unterkörper
  const cloak = new THREE.Mesh(new THREE.ConeGeometry(0.44, 1.05, 12), cloakMat);
  cloak.position.y = 0.55;
  cloak.castShadow = true;
  group.add(cloak);

  // Oberkörper & Kopf
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.26, 0.62, 8, 12), bodyMat);
  body.position.y = 0.72;
  body.castShadow = true;
  group.add(body);

  // Waldhüter-Hut (Krempe + Spitze)
  const hatBrim = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.48, 0.06, 14), hatMat);
  hatBrim.position.y = 1.24;
  hatBrim.castShadow = true;
  group.add(hatBrim);

  const hatTop = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.45, 12), hatMat);
  hatTop.position.y = 1.48;
  hatTop.castShadow = true;
  group.add(hatTop);

  // Hölzerner Wanderstab in der rechten Hand
  const staff = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 1.75, 8), woodMat);
  staff.position.set(0.42, 0.88, 0.18);
  staff.rotation.x = 0.08;
  staff.castShadow = true;
  group.add(staff);

  // Kleine leuchtende Weglaterne oben am Stab
  const lantern = new THREE.Mesh(new THREE.OctahedronGeometry(0.14, 0), lanternMat);
  lantern.position.set(0.42, 1.68, 0.32);
  group.add(lantern);

  const lanternLight = new THREE.PointLight(0xffcb77, 1.1, 5.5);
  lanternLight.position.set(0.42, 1.68, 0.35);
  group.add(lanternLight);

  // Schwebendes Hinweis-Symbol über dem Kopf des NPCs
  const indicatorMat = new THREE.MeshStandardMaterial({
    color: 0xe2b86b,
    emissive: 0x8a6820,
    roughness: 0.3,
  });
  const indicator = new THREE.Mesh(new THREE.OctahedronGeometry(0.16, 0), indicatorMat);
  indicator.position.y = 2.05;
  group.add(indicator);

  // Alle Meshes für Raycasting als NPC markieren
  group.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.userData = { interactableType: 'npc' };
    }
  });

  const update = (
    timeSeconds: number,
    playerPos: { x: number; z: number },
    highlighted: boolean
  ) => {
    // Hinweis-Kristall über dem Kopf sanft schweben und drehen lassen
    indicator.position.y = 2.05 + Math.sin(timeSeconds * 2.8) * 0.08;
    indicator.rotation.y = timeSeconds * 1.4;

    // Wenn die Spielfigur in der Nähe ist, wendet sich der Waldhüter ihr sanft zu
    const dx = playerPos.x - group.position.x;
    const dz = playerPos.z - group.position.z;
    const dist = Math.hypot(dx, dz);
    if (dist < 6.5 && dist > 0.1) {
      const targetAngle = Math.atan2(dx, dz);
      group.rotation.y = targetAngle;
    }

    const emissiveHex = highlighted ? 0x3a2d10 : 0x000000;
    cloakMat.emissive.setHex(emissiveHex);
    hatMat.emissive.setHex(emissiveHex);
    indicatorMat.emissive.setHex(highlighted ? 0xd4a438 : 0x6e5218);
  };

  return { group, update };
}
