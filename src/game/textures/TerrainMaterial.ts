import * as THREE from 'three';
import {
  createGrassTexture,
  createPathTexture,
  createSnowTexture,
  createVeinedLavaRockTexture,
} from './GroundTextures';
import { createTerrainSplatMap } from './TerrainSplatMap';
import {
  DEFAULT_TERRAIN_PRESET,
  TerrainPresetKey,
} from './TerrainPresets';

export interface TerrainMaterialController {
  material: THREE.MeshStandardMaterial;
  setLavaPulse: (pulse: number) => void;
  setPreset: (presetKey: TerrainPresetKey) => void;
  getCurrentPreset: () => TerrainPresetKey;
  setSimpleMode: (simple: boolean) => void;
  isSimpleMode: () => boolean;
}

/**
 * Erzeugt das Splatmap-Terrain-Material:
 * - Gestochen scharfe gekachelte Waldwiese (55x Wiederholung) mit wählbarem Preset
 * - Gestochen scharfe gekachelte Kiesel-/Waldwege (38x Wiederholung) mit wählbarem Preset
 * - Gekachelter, tiefschwarzer Basalt- & Obsidianboden mit glühenden roten Magma-Adern am Lavasee (16x Wiederholung)
 * - 2048x2048 Splatmap für nahtlose, organische Übergänge ohne Unschärfe und ohne Kringel vor der Hütte
 * - Physikalisch korrekte sRGB-zu-Linear-Farbkorrektur gegen blasse oder verwaschene Farben
 */
export function createTerrainMaterial(initialPreset: TerrainPresetKey = DEFAULT_TERRAIN_PRESET): TerrainMaterialController {
  let currentPreset = initialPreset;

  const grassTex = createGrassTexture(currentPreset);
  if (grassTex.map) {
    grassTex.map.wrapS = THREE.RepeatWrapping;
    grassTex.map.wrapT = THREE.RepeatWrapping;
  }
  if (grassTex.bumpMap) {
    grassTex.bumpMap.wrapS = THREE.RepeatWrapping;
    grassTex.bumpMap.wrapT = THREE.RepeatWrapping;
  }

  const pathTex = createPathTexture(currentPreset);
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

  const snowTex = createSnowTexture();
  if (snowTex.map) {
    snowTex.map.wrapS = THREE.RepeatWrapping;
    snowTex.map.wrapT = THREE.RepeatWrapping;
  }
  if (snowTex.bumpMap) {
    snowTex.bumpMap.wrapS = THREE.RepeatWrapping;
    snowTex.bumpMap.wrapT = THREE.RepeatWrapping;
  }

  const splatMap = createTerrainSplatMap();

  let simpleMode = false;

  const uniforms: { [uniform: string]: THREE.IUniform } = {
    uSplatMap: { value: splatMap },
    uGrassMap: { value: grassTex.map },
    uPathMap: { value: pathTex.map },
    uLavaMap: { value: lavaTex.map },
    uLavaEmissive: { value: lavaTex.emissiveMap },
    uLavaPulse: { value: 1.0 },
    uSnowMap: { value: snowTex.map },
    uSimpleMode: { value: 0.0 },
  };

  // Sicheres Basis-Material: Als Basistextur nutzen wir die gekachelte Gras-Textur.
  // Sollte ein mobiler WebGL-Treiber den erweiterten Splatmap-Shader verwerfen,
  // rendert der Standard-Shader sanftes Gras statt greller roter/grüner/blauer Maskenfarben!
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: grassTex.map ?? undefined,
    emissiveMap: lavaTex.emissiveMap ?? undefined,
    emissive: new THREE.Color(0xffffff),
    emissiveIntensity: 1.0,
    bumpMap: grassTex.bumpMap ?? undefined,
    bumpScale: 0.045,
    roughness: 0.90,
    metalness: 0.05,
  });

  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);

    // Uniform-Deklarationen hinter <common> einfügen.
    // NIEMALS an den Anfang prependen, da OpenGL ES 3.0 / WebGL 2 "#version 300 es"
    // als allererste Zeile vorschreibt (führt auf Samsung Galaxy S10 / Mali-GPUs sonst zum Shader-Absturz).
    const uniformsDecl = `
      uniform sampler2D uSplatMap;
      uniform sampler2D uGrassMap;
      uniform sampler2D uPathMap;
      uniform sampler2D uLavaMap;
      uniform sampler2D uLavaEmissive;
      uniform float uLavaPulse;
      uniform sampler2D uSnowMap;
      uniform float uSimpleMode;
    `;

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <common>',
      `#include <common>\n${uniformsDecl}`
    );

    // Farb-Chunk überschreiben: Splatmap-basiertes Mischen von gekachelten Texturen
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <map_fragment>',
      `
      #ifdef USE_MAP
        vec4 colGrass = texture2D( uGrassMap, vMapUv * 55.0 );
        vec3 grassLinear = pow(colGrass.rgb, vec3(2.2));

        if (uSimpleMode > 0.5) {
          diffuseColor.rgb *= grassLinear;
        } else {
          vec4 splat = texture2D( uSplatMap, vMapUv );
          vec4 colPath = texture2D( uPathMap, vMapUv * 38.0 );
          vec4 colLava = texture2D( uLavaMap, vMapUv * 16.0 );
          vec4 colSnow = texture2D( uSnowMap, vMapUv * 46.0 );

          vec3 pathLinear = pow(colPath.rgb, vec3(2.2));
          vec3 lavaLinear = pow(colLava.rgb, vec3(2.2));
          vec3 snowLinear = pow(colSnow.rgb, vec3(2.2));

          // 1. Wiese zu Weg mit natürlichem Auslauf
          vec3 terrainDiff = mix(grassLinear, pathLinear, splat.r);

          // 2. Zu tiefschwarzem Obsidianboden um den Lavasee
          terrainDiff = mix(terrainDiff, lavaLinear * 0.85, splat.g);

          // 3. Zu alpiner Schneezone an der Bergmine (Blau-Kanal)
          vec3 snowySurface = mix(snowLinear, snowLinear * vec3(0.92, 0.94, 0.97), splat.r * 0.35);
          terrainDiff = mix(terrainDiff, snowySurface, splat.b);

          diffuseColor.rgb *= terrainDiff;
        }
      #endif
      `
    );

    // Emissive-Chunk überschreiben: Glühende Magma-Adern am Lavasee
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <emissivemap_fragment>',
      `
      #ifdef USE_EMISSIVEMAP
        if (uSimpleMode <= 0.5) {
          vec4 splatE = texture2D( uSplatMap, vMapUv );
          vec4 lavaEmiss = texture2D( uLavaEmissive, vMapUv * 18.0 );

          // Intensives, dynamisch pulsierendes dunkelrotes Glutlicht im Basaltkessel
          totalEmissiveRadiance = lavaEmiss.rgb * splatE.g * (uLavaPulse * 2.4);
        }
      #endif
      `
    );
  };

  const setLavaPulse = (pulse: number) => {
    uniforms.uLavaPulse.value = pulse;
  };

  const setPreset = (presetKey: TerrainPresetKey) => {
    currentPreset = presetKey;
    const nextGrass = createGrassTexture(presetKey);
    const nextPath = createPathTexture(presetKey);

    if (nextGrass.map) {
      nextGrass.map.wrapS = THREE.RepeatWrapping;
      nextGrass.map.wrapT = THREE.RepeatWrapping;
      uniforms.uGrassMap.value = nextGrass.map;
      material.map = nextGrass.map;
    }

    if (nextPath.map) {
      nextPath.map.wrapS = THREE.RepeatWrapping;
      nextPath.map.wrapT = THREE.RepeatWrapping;
      uniforms.uPathMap.value = nextPath.map;
    }

    material.needsUpdate = true;
  };

  const setSimpleMode = (simple: boolean) => {
    simpleMode = simple;
    uniforms.uSimpleMode.value = simple ? 1.0 : 0.0;
  };

  const isSimpleMode = () => simpleMode;

  const getCurrentPreset = () => currentPreset;

  return { material, setLavaPulse, setPreset, getCurrentPreset, setSimpleMode, isSimpleMode };
}
