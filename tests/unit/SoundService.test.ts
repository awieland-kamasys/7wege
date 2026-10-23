import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SoundService } from '../../src/game/systems/SoundService';

describe('SoundService (Hintergrundmusik & Nixenteich-Thema)', () => {
  let soundService: SoundService;
  let mockAudioContext: any;

  beforeEach(() => {
    // Einfacher Mock für Web Audio API
    mockAudioContext = {
      state: 'running',
      currentTime: 10.0,
      destination: {},
      resume: vi.fn().mockResolvedValue(undefined),
      createGain: vi.fn().mockReturnValue({
        gain: {
          value: 1,
          setValueAtTime: vi.fn(),
          linearRampToValueAtTime: vi.fn(),
          exponentialRampToValueAtTime: vi.fn(),
          setTargetAtTime: vi.fn(),
        },
        connect: vi.fn(),
      }),
      createBiquadFilter: vi.fn().mockReturnValue({
        type: 'lowpass',
        frequency: { setValueAtTime: vi.fn() },
        Q: { setValueAtTime: vi.fn() },
        connect: vi.fn(),
      }),
      createOscillator: vi.fn().mockReturnValue({
        type: 'sine',
        frequency: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
        detune: { setValueAtTime: vi.fn() },
        connect: vi.fn(),
        start: vi.fn(),
        stop: vi.fn(),
      }),
      createStereoPanner: vi.fn().mockReturnValue({
        pan: { setValueAtTime: vi.fn() },
        connect: vi.fn(),
      }),
      createBuffer: vi.fn().mockReturnValue({}),
      createBufferSource: vi.fn().mockReturnValue({
        buffer: null,
        connect: vi.fn(),
        start: vi.fn(),
        stop: vi.fn(),
      }),
    };

    // Globales window mocken
    (globalThis as any).window = {
      AudioContext: vi.fn().mockImplementation(() => mockAudioContext),
    };

    soundService = new SoundService();
  });

  afterEach(() => {
    delete (globalThis as any).window;
  });

  it('besitzt die erhöhte Basislautstärke (ca. 3x lauter als zuvor)', () => {
    expect(SoundService.BASE_MUSIC_VOLUME).toBe(0.13);
    expect(SoundService.DIALOGUE_MUSIC_VOLUME).toBe(0.055);
    expect(SoundService.BASE_MUSIC_VOLUME).toBeGreaterThan(0.045);
  });

  it('schaltet die Musik stumm und wieder ein (toggleMusic)', () => {
    expect(soundService.isMusicEnabled()).toBe(true);

    const muted = soundService.toggleMusic();
    expect(muted).toBe(false);
    expect(soundService.isMusicEnabled()).toBe(false);

    const unmuted = soundService.toggleMusic();
    expect(unmuted).toBe(true);
    expect(soundService.isMusicEnabled()).toBe(true);
  });

  it('überblendet die Musik fließend zum zauberhaften Nixen-Thema bei Annäherung an den Nixenteich', () => {
    expect(soundService.getNixieBlendWeight()).toBe(0);

    // Spieler befindet sich am Nixenteich-Ufer (Distanz ca. 4.8 m, deutlich innerhalb des 12m-Innenradius)
    const pondShorePos = { x: 42.0, z: -14.2 };

    // 5 Sekunden lang Updates simulieren
    for (let i = 0; i < 50; i++) {
      soundService.updateAmbientMusic(0.1, false, pondShorePos);
    }

    // Blend-Faktor nähert sich 1.0 (Nixenteich-Musik dominiert)
    expect(soundService.getNixieBlendWeight()).toBeGreaterThan(0.95);

    // Spieler wandert zurück zur Kreuzung (x: 0, z: 0)
    const crossroadsPos = { x: 0, z: 0 };
    for (let i = 0; i < 60; i++) {
      soundService.updateAmbientMusic(0.1, false, crossroadsPos);
    }

    // Blend-Faktor fällt wieder zurück gegen 0.0 (Waldmusik dominiert)
    expect(soundService.getNixieBlendWeight()).toBeLessThan(0.05);
  });

  it('berechnet im Übergangsbereich einen kontinuierlichen Mittelwert', () => {
    // Exakt auf halber Strecke zwischen 12m und 26m (Distanz = 19m)
    // Pond Center ist (46.8, -14.2) -> x = 46.8 - 19.0 = 27.8
    const midPointPos = { x: 27.8, z: -14.2 };

    for (let i = 0; i < 60; i++) {
      soundService.updateAmbientMusic(0.1, false, midPointPos);
    }

    const blend = soundService.getNixieBlendWeight();
    // Sollte ca. 0.5 sein (Zwischen 0.45 und 0.55)
    expect(blend).toBeGreaterThan(0.4);
    expect(blend).toBeLessThan(0.6);
  });
});
