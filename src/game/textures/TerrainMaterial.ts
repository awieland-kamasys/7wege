import * as THREE from 'three';
import {
  createGrassTexture,
  createPathTexture,
  createVeinedLavaRockTexture,
} from './GroundTextures';
import { createTerrainSplatMap } from './TerrainSplatMap';

export interface TerrainMaterialController {
  material: THREE.MeshStandardMaterial;
  setLavaPulse: (pulse: number) => void;
}

/**
 * Erzeugt das Splatmap-Terrain-Material:
 * - Gestochen scharfe gekachelte Waldwiese (65x Wiederholung, sattes Waldgrün, Moos, Erde)
 * - Gestochen scharfe gekachelte Kiesel-/Waldwege (45x Wiederholung)
 * - Gekachelter, tiefschwarzer Basalt- & Obsidianboden mit glühenden roten Magma-Adern am Lavasee (18x Wiederholung)
 * - 2048x2048 Splatmap für nahtlose, organische Übergänge ohne Unschärfe und ohne Kringel vor der Hütte
 */
export function createTerrainMaterial(): TerrainMaterialController {
  const grassTex = createGrassTexture();
  if (grassTex.map) {
    grassTex.map.wrapS = THREE.RepeatWrapping;
    grassTex.map.wrapT = THREE.RepeatWrapping;
  }
  if (grassTex.bumpMap) {
    grassTex.bumpMap.wrapS = THREE.RepeatWrapping;
    grassTex.bumpMap.wrapT = THREE.RepeatWrapping;
  }

  const pathTex = createPathTexture();
  if (pathTex.map) {
    pathTex.map.wrapS = THREE.RepeatWrapping;
    pathTex.map.wrapT = THREE.RepeatWrapping;
  }
  if (pathTex.bumpMap) {
    pathTex.bumpMap.wrapS = THREE.RepeatWrapping;
    pathTex.bumpMap.wrapT = THREE.RepeatWrapping;
  }

  const lavaTex = createVeinedLavaRockTexture();
  if (lavaTex.map) {
    lavaTex.map.wrapS = THREE.RepeatWrapping;
    lavaTex.map.wrapT = THREE.RepeatWrapping;
  }
  if (lavaTex.emissiveMap) {
    lavaTex.emissiveMap.wrapS = THREE.RepeatWrapping;
    lavaTex.emissiveMap.wrapT = THREE.RepeatWrapping;
  }
  if (lavaTex.bumpMap) {
    lavaTex.bumpMap.wrapS = THREE.RepeatWrapping;
    lavaTex.bumpMap.wrapT = THREE.RepeatWrapping;
  }

  const splatMap = createTerrainSplatMap();

  const uniforms: { [uniform: string]: THREE.IUniform } = {
    uSplatMap: { value: splatMap },
    uGrassMap: { value: grassTex.map },
    uGrassBump: { value: grassTex.bumpMap },
    uPathMap: { value: pathTex.map },
    uPathBump: { value: pathTex.bumpMap },
    uLavaMap: { value: lavaTex.map },
    uLavaEmissive: { value: lavaTex.emissiveMap },
    uLavaPulse: { value: 1.0 },
  };

  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: splatMap ?? undefined,
    emissiveMap: lavaTex.emissiveMap ?? undefined,
    emissive: new THREE.Color(0xffffff),
    emissiveIntensity: 1.0,
    bumpMap: grassTex.bumpMap ?? undefined,
    bumpScale: 0.045,
    roughness: 0.88,
    metalness: 0.08,
  });

  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);

    shader.fragmentShader = `
      uniform sampler2D uSplatMap;
      uniform sampler2D uGrassMap;
      uniform sampler2D uGrassBump;
      uniform sampler2D uPathMap;
      uniform sampler2D uPathBump;
      uniform sampler2D uLavaMap;
      uniform sampler2D uLavaEmissive;
      uniform float uLavaPulse;
    ` + shader.fragmentShader;

    // Farb-Chunk überschreiben: Splatmap-basiertes Mischen von gekachelten Texturen
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <map_fragment>',
      `
      #ifdef USE_MAP
        vec4 splat = texture2D( uSplatMap, vMapUv );
        vec4 colGrass = texture2D( uGrassMap, vMapUv * 55.0 );
        vec4 colPath = texture2D( uPathMap, vMapUv * 38.0 );
        vec4 colLava = texture2D( uLavaMap, vMapUv * 16.0 );

        // 1. Kräftiges, sattes Waldwiesengrün (früherer atmosphärischer Farbraum mit sattem Grün und Mooskontrast)
        vec3 grassTint = vec3(0.55, 0.88, 0.58);
        vec3 richGrass = pow(colGrass.rgb, vec3(1.15)) * grassTint * 1.5;

        // 2. Sandig-lehmiger, warmer Weg (früherer Farbraum 0x826d55 / warmer Lehm- und Ockerton)
        vec3 pathTint = vec3(1.18, 0.96, 0.72);
        vec3 warmPath = pow(colPath.rgb, vec3(1.08)) * pathTint * 1.1;

        // 3. Tiefschwarzer Obsidian- und Basaltboden am Lavasee
        vec3 darkLava = colLava.rgb * 0.9;

        // 1. Wiese zu Weg mit natürlichem Auslauf
        vec3 terrainDiff = mix(richGrass, warmPath, splat.r);

        // 2. Zu tiefschwarzem Obsidianboden um den Lavasee
        terrainDiff = mix(terrainDiff, darkLava, splat.g);

        diffuseColor.rgb *= terrainDiff;
      #endif
      `
    );

    // Emissive-Chunk überschreiben: Glühende Magma-Adern am Lavasee
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <emissivemap_fragment>',
      `
      #ifdef USE_EMISSIVEMAP
        vec4 splatE = texture2D( uSplatMap, vMapUv );
        vec4 lavaEmiss = texture2D( uLavaEmissive, vMapUv * 18.0 );

        // Intensives, dynamisch pulsierendes dunkelrotes Glutlicht im Basaltkessel
        totalEmissiveRadiance = lavaEmiss.rgb * splatE.g * (uLavaPulse * 2.4);
      #endif
      `
    );
  };

  const setLavaPulse = (pulse: number) => {
    uniforms.uLavaPulse.value = pulse;
  };

  return { material, setLavaPulse };
}
