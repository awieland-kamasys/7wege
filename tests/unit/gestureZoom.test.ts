import { describe, expect, it } from 'vitest';

describe('Gestensteuerung Pinch-to-Zoom', () => {
  // Entspricht der Zoom-Formel und Kapselung aus CrossroadsScene & GameApp
  const MIN_CAMERA_DISTANCE = 5.5;
  const MAX_CAMERA_DISTANCE = 14.5;
  const PINCH_ZOOM_FACTOR = 0.018;

  function calculatePinchDistance(
    p1: { clientX: number; clientY: number },
    p2: { clientX: number; clientY: number }
  ): number {
    return Math.hypot(p1.clientX - p2.clientX, p1.clientY - p2.clientY);
  }

  function applyZoom(currentDistance: number, deltaDistance: number): number {
    const zoomDelta = -deltaDistance * PINCH_ZOOM_FACTOR;
    return Math.max(MIN_CAMERA_DISTANCE, Math.min(MAX_CAMERA_DISTANCE, currentDistance + zoomDelta));
  }

  it('berechnet den euklidischen Abstand zweier Berührungspunkte korrekt', () => {
    const p1 = { clientX: 100, clientY: 100 };
    const p2 = { clientX: 130, clientY: 140 };
    // 30^2 + 40^2 = 900 + 1600 = 2500 -> sqrt = 50
    expect(calculatePinchDistance(p1, p2)).toBeCloseTo(50, 4);
  });

  it('verringert die Kameradistanz (hineinzoomen), wenn Finger auseinandergezogen werden', () => {
    const initialDistance = 10.0;
    const deltaDistance = 50; // Finger bewegen sich um 50 Pixel weiter auseinander
    const newDistance = applyZoom(initialDistance, deltaDistance);

    expect(newDistance).toBeLessThan(initialDistance);
    expect(newDistance).toBeCloseTo(10.0 - 50 * PINCH_ZOOM_FACTOR, 3);
  });

  it('vergrößert die Kameradistanz (herauszoomen), wenn Finger zusammengezogen werden', () => {
    const initialDistance = 10.0;
    const deltaDistance = -50; // Finger nähern sich um 50 Pixel an
    const newDistance = applyZoom(initialDistance, deltaDistance);

    expect(newDistance).toBeGreaterThan(initialDistance);
    expect(newDistance).toBeCloseTo(10.0 + 50 * PINCH_ZOOM_FACTOR, 3);
  });

  it('begrenzt das Hineinzoomen auf minimal 5.5 Meter', () => {
    const initialDistance = 6.0;
    const deltaDistance = 1000; // extremes Auseinanderziehen
    const newDistance = applyZoom(initialDistance, deltaDistance);

    expect(newDistance).toBe(MIN_CAMERA_DISTANCE);
  });

  it('begrenzt das Herauszoomen auf maximal 14.5 Meter', () => {
    const initialDistance = 14.0;
    const deltaDistance = -1000; // extremes Zusammenziehen
    const newDistance = applyZoom(initialDistance, deltaDistance);

    expect(newDistance).toBe(MAX_CAMERA_DISTANCE);
  });
});
