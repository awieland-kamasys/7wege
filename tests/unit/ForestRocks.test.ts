import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import { buildMergedForestRocks, ForestRockInstance } from '../../src/game/entities/ForestRocks';

describe('ForestRocks (Felsen und Steine auf den Grünflächen)', () => {
  it('erzeugt eine gültige Group mit zusammengeführten Meshes für verschiedene Fels-Typen', () => {
    const testInstances: ForestRockInstance[] = [
      { x: 12.0, z: 15.0, scale: 1.2, type: 'mossy_boulder', colorVariant: 'granite' },
      { x: -14.0, z: 20.0, scale: 1.0, type: 'rock_cluster', colorVariant: 'slate' },
      { x: 18.0, z: -16.0, scale: 0.9, type: 'flat_stone', colorVariant: 'sandstone' },
      { x: -22.0, z: -18.0, scale: 1.1, type: 'pebbles', colorVariant: 'granite' },
    ];

    const group = buildMergedForestRocks(testInstances);

    expect(group).toBeInstanceOf(THREE.Group);
    expect(group.name).toBe('MergedForestRocks');
    expect(group.children.length).toBeGreaterThanOrEqual(1);

    // Alle Children müssen Meshes sein, die Schatten empfangen/werfen
    for (const child of group.children) {
      expect(child).toBeInstanceOf(THREE.Mesh);
      const mesh = child as THREE.Mesh;
      expect(mesh.receiveShadow).toBe(true);
      expect(mesh.geometry).toBeInstanceOf(THREE.BufferGeometry);
      expect(mesh.geometry.attributes.position.count).toBeGreaterThan(0);
    }
  });

  it('gibt eine leere Gruppe zurück, wenn keine Instanzen übergeben werden', () => {
    const group = buildMergedForestRocks([]);
    expect(group).toBeInstanceOf(THREE.Group);
    expect(group.children.length).toBe(0);
  });

  it('erzeugt Moosauflagen für Findlinge und Felsgruppen', () => {
    const testInstances: ForestRockInstance[] = [
      { x: 10.0, z: 10.0, type: 'mossy_boulder' },
      { x: -10.0, z: 10.0, type: 'rock_cluster' },
    ];

    const group = buildMergedForestRocks(testInstances);
    const mossMesh = group.getObjectByName('RockMossCover');
    expect(mossMesh).toBeDefined();
    expect(mossMesh).toBeInstanceOf(THREE.Mesh);
  });
});
