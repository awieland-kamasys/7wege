import { describe, expect, it } from 'vitest';
import { getTerrainHeight, TERRAIN_PLATEAUS } from '../../src/game/utils/terrainHeight';
import {
  CAVE_ENTRANCE_POS,
  HELL_CHASM_POS,
  POND_CENTER_POS,
} from '../../src/game/data/paths';

describe('TerrainHeight', () => {
  it('sollte auf der zentralen Lichtung exakt 0.0 liefern', () => {
    expect(getTerrainHeight(0, 0)).toBe(0.0);
    expect(getTerrainHeight(3.0, 4.0)).toBe(0.0);
    expect(getTerrainHeight(-5.0, 2.0)).toBe(0.0);
  });

  it('sollte an den Schauplatz-Plateaus die exakte Plateauhöhe liefern', () => {
    for (const p of TERRAIN_PLATEAUS) {
      const h = getTerrainHeight(p.x, p.z);
      expect(h).toBeCloseTo(p.height, 2);
    }
  });

  it('sollte auf Weg 1 (Bergmassiv) bergauf führen', () => {
    const startH = getTerrainHeight(0, -9.0);
    const endH = getTerrainHeight(CAVE_ENTRANCE_POS.x, CAVE_ENTRANCE_POS.z);

    expect(endH).toBeGreaterThan(startH);
    expect(endH).toBeCloseTo(3.5, 1);
  });

  it('sollte auf Weg 2 (Waldteich) in die Senke führen', () => {
    const endH = getTerrainHeight(POND_CENTER_POS.x, POND_CENTER_POS.z);
    expect(endH).toBeCloseTo(-1.2, 1);
  });

  it('sollte auf Weg 5 (Höllenschlund) in den Kessel führen', () => {
    const endH = getTerrainHeight(HELL_CHASM_POS.x, HELL_CHASM_POS.z);
    expect(endH).toBeCloseTo(-2.0, 1);
  });
});
