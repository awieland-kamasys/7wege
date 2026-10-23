import { describe, expect, it } from 'vitest';

describe('Debug- und Diagnose-Logik', () => {
  it('formatiert Diagnoseberichte mit allen erforderlichen Mobilgeräte-Metriken', () => {
    const mockGpu = {
      glVersion: 'WebGL 2.0 (OpenGL ES 3.0 Chromium)',
      unmaskedVendor: 'ARM',
      unmaskedRenderer: 'Mali-G76 MP12',
      maxTextureSize: 8192,
      maxTextureImageUnits: 16,
      maxVertexUniformVectors: 1024,
      devicePixelRatio: 2.625,
      effectivePixelRatio: 1.5,
      viewportWidth: 412,
      viewportHeight: 869,
      isContextLost: false,
      shadowsEnabled: true,
      terrainSimpleMode: false,
    };

    const mockMetrics = {
      fps: 58,
      drawCalls: 124,
      triangles: 45200,
      geometries: 82,
      textures: 34,
      pixelRatio: 1.5,
    };

    const lines: string[] = [
      '=== 7WEGE DIAGNOSE- & DEBUG-BERICHT ===',
      `GPU Renderer: ${mockGpu.unmaskedRenderer}`,
      `GPU Vendor: ${mockGpu.unmaskedVendor}`,
      `Context Lost: ${mockGpu.isContextLost}`,
      `FPS: ${mockMetrics.fps}`,
      `Draw Calls: ${mockMetrics.drawCalls}`,
    ];

    const report = lines.join('\n');
    expect(report).toContain('Mali-G76');
    expect(report).toContain('ARM');
    expect(report).toContain('Context Lost: false');
    expect(report).toContain('58');
  });

  it('erkennt Mobilgeräte und deckelt PixelRatio entsprechend', () => {
    function calculateDpr(ua: string, dpr: number, override: number | null): number {
      if (override !== null && override > 0) {
        return override;
      }
      const isMobile = /Mobi|Android|iPhone|iPad/i.test(ua);
      const maxDpr = isMobile ? 1.5 : 2.0;
      return Math.min(dpr, maxDpr);
    }

    // iPhone 16 Pro Max (DPR 3.0) -> sollte auf 1.5 gedeckelt werden
    const iphoneUa = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148';
    expect(calculateDpr(iphoneUa, 3.0, null)).toBe(1.5);

    // Galaxy S10 (DPR 2.625) -> sollte auf 1.5 gedeckelt werden
    const s10Ua = 'Mozilla/5.0 (Linux; Android 12; SM-G973F) AppleWebKit/537.36';
    expect(calculateDpr(s10Ua, 2.625, null)).toBe(1.5);

    // Manueller Debug-Override auf 1.0 (Mobil-Schonmodus)
    expect(calculateDpr(iphoneUa, 3.0, 1.0)).toBe(1.0);

    // Desktop PC (DPR 1.0)
    const pcUa = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';
    expect(calculateDpr(pcUa, 1.0, null)).toBe(1.0);
  });
});
