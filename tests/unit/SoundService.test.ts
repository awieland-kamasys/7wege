import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SoundService } from '../../src/game/systems/SoundService';

describe('SoundService (Hintergrundmusik, Lautstärkeregler & Schauplatzwechsel auf halbem Weg)', () => {
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
        frequency: { setValueAtTime: vi.fn(), setTargetAtTime: vi.fn() },
        Q: { setValueAtTime: vi.fn(), setTargetAtTime: vi.fn() },
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

  it('erlaubt stufenlose Lautstärkeregelung (setMusicVolume)', () => {
    expect(soundService.getMusicVolume()).toBe(1.0);
    expect(soundService.isMusicEnabled()).toBe(true);

    soundService.setMusicVolume(0.5);
    expect(soundService.getMusicVolume()).toBe(0.5);
    expect(soundService.isMusicEnabled()).toBe(true);

    // Bei Lautstärke 0 wird die Musik stumm geschaltet
    soundService.setMusicVolume(0.0);
    expect(soundService.getMusicVolume()).toBe(0.0);
    expect(soundService.isMusicEnabled()).toBe(false);

    // Wieder aufdrehen
    soundService.setMusicVolume(0.8);
    expect(soundService.getMusicVolume()).toBe(0.8);
    expect(soundService.isMusicEnabled()).toBe(true);
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

  it('überblendet auf der Wegmitte (ca. 23m) fließend und aktiviert am Feenteich ausschließlich die Feenteich-Musik', () => {
    expect(soundService.getLocationBlendWeight()).toBe(0);
    expect(soundService.getActiveLocation()).toBe('crossroads');

    // Spieler befindet sich am Feenteich-Ufer (Distanz von Kreuzung > 30m, z. B. x: 42.0, z: -14.2)
    const pondShorePos = { x: 42.0, z: -14.2 };

    // 15 Sekunden lang Updates simulieren (langsamer Übergang)
    for (let i = 0; i < 150; i++) {
      soundService.updateAmbientMusic(0.1, false, pondShorePos);
    }

    // Blend-Faktor erreicht 1.0 (am Feenteich nur Feenteich-Musik, Waldkreuzung vollständig stumm)
    expect(soundService.getLocationBlendWeight()).toBeGreaterThan(0.98);
    expect(soundService.getActiveLocation()).toBe('feenteich');
    expect(soundService.getNixieBlendWeight()).toBeGreaterThan(0.98);

    // Spieler wandert zurück zur Kreuzung (x: 0, z: 0)
    const crossroadsPos = { x: 0, z: 0 };
    for (let i = 0; i < 180; i++) {
      soundService.updateAmbientMusic(0.1, false, crossroadsPos);
    }

    // Blend-Faktor fällt wieder zurück gegen 0.0 (Kreuzungsmusik)
    expect(soundService.getLocationBlendWeight()).toBeLessThan(0.02);
    expect(soundService.getActiveLocation()).toBe('crossroads');
  });

  it('berechnet auf der Mitte des Weges (ca. 23m) einen kontinuierlichen Mittelwert', () => {
    // Wegmitte auf Weg 2: Distanz von der Kreuzung r = 23m
    // Winkel zu Feenteich (46.8, -14.2): atan2(-14.2, 46.8) = -0.294 rad
    const cosAngle = 46.8 / Math.hypot(46.8, -14.2);
    const sinAngle = -14.2 / Math.hypot(46.8, -14.2);
    const midPointPos = { x: 23.0 * cosAngle, z: 23.0 * sinAngle };

    for (let i = 0; i < 150; i++) {
      soundService.updateAmbientMusic(0.1, false, midPointPos);
    }

    const blend = soundService.getLocationBlendWeight();
    // Auf halber Strecke zwischen 16m und 30m (23m) sollte der Blendwert ca. 0.5 sein
    expect(blend).toBeGreaterThan(0.4);
    expect(blend).toBeLessThan(0.6);
  });

  it('wechselt an anderen Schauplätzen (z. B. Silberstollen) auf die entsprechende Location-Musik', () => {
    const silverMinePos = { x: 22.0, z: -45.0 }; // Distanz > 30m

    for (let i = 0; i < 150; i++) {
      soundService.updateAmbientMusic(0.1, false, silverMinePos);
    }

    expect(soundService.getLocationBlendWeight()).toBeGreaterThan(0.98);
    expect(soundService.getActiveLocation()).toBe('silberstollen');
  });
});
