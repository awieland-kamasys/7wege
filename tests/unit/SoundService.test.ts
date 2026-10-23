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
        frequency: {
          setValueAtTime: vi.fn(),
          linearRampToValueAtTime: vi.fn(),
          exponentialRampToValueAtTime: vi.fn(),
          setTargetAtTime: vi.fn(),
        },
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

  it('besitzt die dynamische Basislautstärke (Start bei 50 %, lauter und leiser regelbar)', () => {
    expect(SoundService.BASE_MUSIC_VOLUME).toBe(0.28);
    expect(SoundService.DIALOGUE_MUSIC_VOLUME).toBe(0.11);
    expect(SoundService.BASE_MUSIC_VOLUME).toBeGreaterThan(0.13);
  });

  it('startet mit dem Regler bei 50 % und erlaubt stufenlose Lautstärkeregelung nach oben und unten', () => {
    // Initialer Wert bei 50 %
    expect(soundService.getMusicVolume()).toBe(0.5);
    expect(soundService.isMusicEnabled()).toBe(true);

    // Lauter stellen (bis 100 %)
    soundService.setMusicVolume(1.0);
    expect(soundService.getMusicVolume()).toBe(1.0);
    expect(soundService.isMusicEnabled()).toBe(true);

    // Leiser stellen (auf 25 %)
    soundService.setMusicVolume(0.25);
    expect(soundService.getMusicVolume()).toBe(0.25);
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

  it('berechnet auf der Mitte des Weges (ca. 21m) einen kontinuierlichen 50/50-Mittelwert', () => {
    // Wegmitte auf Weg 2: Distanz von der Kreuzung r = 21m (Korridor 14m bis 28m)
    // Winkel zu Feenteich (46.8, -14.2): atan2(-14.2, 46.8) = -0.294 rad
    const cosAngle = 46.8 / Math.hypot(46.8, -14.2);
    const sinAngle = -14.2 / Math.hypot(46.8, -14.2);
    const midPointPos = { x: 21.0 * cosAngle, z: 21.0 * sinAngle };

    for (let i = 0; i < 150; i++) {
      soundService.updateAmbientMusic(0.1, false, midPointPos);
    }

    const blend = soundService.getLocationBlendWeight();
    // Auf halber Strecke zwischen 14m und 28m (21m) sollte der Blendwert ca. 0.5 sein
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
    expect(soundService.getActiveLocationTrack().title).toBe('Eiskristall und Bergesraunen');
  });

  it('weist jedem Schauplatz ein eigenes, individuelles Musikstück zu', () => {
    const locations = ['silberstollen', 'feenteich', 'wehrbruecke', 'holzfaeller', 'lavakrater', 'jagdhuette', 'schlosstor'] as const;
    const titles = new Set<string>();

    locations.forEach((locKey) => {
      const track = SoundService.LOCATION_TRACKS[locKey];
      expect(track).toBeDefined();
      expect(track.title.length).toBeGreaterThan(3);
      expect(track.subtitle.length).toBeGreaterThan(3);
      expect(track.instrument.length).toBeGreaterThan(3);
      titles.add(track.title);
    });

    // Alle Schauplätze haben komplett unterschiedliche Musiktitel
    expect(titles.size).toBe(locations.length);
  });

  it('wechselt an der Wehrbrücke, am Holzfällerlager, am Lavakrater und am Schlosstor zum jeweiligen Musikstück', () => {
    // 1. Wehrbrücke
    const wehrPos = { x: 42.0, z: 21.0 };
    for (let i = 0; i < 80; i++) {
      soundService.updateAmbientMusic(0.1, false, wehrPos);
    }
    expect(soundService.getActiveLocation()).toBe('wehrbruecke');
    expect(soundService.getActiveLocationTrack().title).toBe('Die Ballade des Wehrmeisters');

    // 2. Zurück zur Kreuzung
    for (let i = 0; i < 80; i++) {
      soundService.updateAmbientMusic(0.1, false, { x: 0, z: 0 });
    }
    expect(soundService.getActiveLocation()).toBe('crossroads');
    expect(soundService.getActiveLocationTrack().title).toBe('Lichtung im Morgendunst');

    // 3. Lavakrater
    const lavaPos = { x: -21.2, z: 44.8 };
    for (let i = 0; i < 80; i++) {
      soundService.updateAmbientMusic(0.1, false, lavaPos);
    }
    expect(soundService.getActiveLocation()).toBe('lavakrater');
    expect(soundService.getActiveLocationTrack().title).toBe('Der Höllenschlund erwacht');
  });
});
