export type GameLocationKey =
  | 'crossroads'
  | 'feenteich'
  | 'silberstollen'
  | 'wehrbruecke'
  | 'holzfaeller'
  | 'lavakrater'
  | 'jagdhuette'
  | 'schlosstor';

/**
 * Prozeduraler Sound-Synthesizer über die Web Audio API (ohne externe Audio-Assets).
 * Erzeugt u. a.:
 * - den zauberhaften Entdeckungs-Jingle beim Öffnen der Schatztruhe,
 * - natürliche Schrittgeräusche auf Waldboden und Kieswegen während des Laufens,
 * - dezentes, unauffälliges Vogelzwitschern im Hintergrund zur Belebung der Waldatmosphäre,
 * - dynamische Hintergrundmusik mit nahtlosem Wechsel an den jeweiligen Schauplätzen (Wegmitte).
 */
export class SoundService {
  private ctx: AudioContext | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private stepLeftFoot = false;
  private nextBirdTimerSec = 2.2;

  // --- Lautstärke-Konfiguration für Hintergrundmusik ---
  public static readonly BASE_MUSIC_VOLUME = 0.28;
  public static readonly DIALOGUE_MUSIC_VOLUME = 0.11;
  private musicVolume = 0.5; // Stufenloser Lautstärkeregler (Startet bei 50 %, lauter & leiser regelbar)

  // --- Koordinaten der Schauplätze für automatischen Musikwechsel auf halbem Weg ---
  public static readonly LOCATIONS: Record<
    Exclude<GameLocationKey, 'crossroads'>,
    { x: number; z: number; name: string }
  > = {
    silberstollen: { x: 22.0, z: -45.0, name: 'Silberstollen am Bergmassiv' },
    feenteich:    { x: 46.8, z: -14.2, name: 'Feenteich der Nixe' },
    wehrbruecke:  { x: 42.0, z: 21.0,  name: 'Wehrbrücke am Bachtal' },
    holzfaeller:  { x: 16.5, z: 42.5,  name: 'Holzfällerlager im Hochwald' },
    lavakrater:   { x: -21.2, z: 44.8, name: 'Feuriger Höllenschlund' },
    jagdhuette:   { x: -40.0, z: 22.2, name: 'Jagdhütte im Dämmerwald' },
    schlosstor:   { x: -40.5, z: -38.5, name: 'Verschlossenes Schlosstor' },
  };

  // Wegmitte-Übergangskorridor (Distanz von der Kreuzung 0,0)
  // Bis 14m: reine Waldkreuzungsmusik | Ab 28m: 100% Schauplatzmusik (Kreuzung VOLLSTÄNDIG aus!)
  // Mitte des Weges liegt genau bei (14 + 28) / 2 = 21m (~Wegmitte zu allen Schauplätzen)
  public static readonly CROSSROADS_RADIUS = 14.0;
  public static readonly LOCATION_FULL_RADIUS = 28.0;

  // Legacy-Konstanten für Kompatibilität
  public static readonly NIXIE_POND_X = 46.8;
  public static readonly NIXIE_POND_Z = -14.2;
  public static readonly NIXIE_INNER_RADIUS = 12.0;
  public static readonly NIXIE_OUTER_RADIUS = 26.0;

  // --- Audio-Knoten für Hintergrundmusik (Master & Sub-Busse) ---
  private musicMasterGain: GainNode | null = null;
  private crossroadsBusGain: GainNode | null = null;
  private crossroadsFilterNode: BiquadFilterNode | null = null;
  private locationBusGain: GainNode | null = null;
  private locationFilterNode: BiquadFilterNode | null = null;
  private isMusicMuted = false;

  // --- Musik-Zonenzustand & Langsamer Übergang ---
  private activeLocation: Exclude<GameLocationKey, 'crossroads'> = 'feenteich';
  private locationBlendWeight = 0; // 0.0 = 100% Kreuzung, 1.0 = 100% Location (am Feenteich nur Feenteich)

  // --- Waldkreuzungs-Hintergrundmusik Zustand ---
  private currentChordIdx = 0;
  private nextChordScheduleTime = 0;
  private nextArpTimerSec = 2.5;

  private readonly ambientChords: readonly {
    durationSec: number;
    padFreqs: readonly number[];
    arpNotes: readonly number[];
  }[] = [
    // 1. D-Duradd9 (Lichtung im Morgendunst)
    {
      durationSec: 9.0,
      padFreqs: [146.83, 220.0, 329.63, 369.99], // D3, A3, E4, F#4
      arpNotes: [293.66, 329.63, 369.99, 440.0, 587.33], // D4, E4, F#4, A4, D5
    },
    // 2. G-Durmaj7 (Waldmoos, Farne, Seerosen)
    {
      durationSec: 9.0,
      padFreqs: [196.0, 246.94, 293.66, 369.99], // G3, B3, D4, F#4
      arpNotes: [293.66, 369.99, 392.0, 440.0, 493.88], // D4, F#4, G4, A4, B4
    },
    // 3. H-Moll7 (Schattige Nadelwälder, Burgruine)
    {
      durationSec: 9.0,
      padFreqs: [123.47, 185.0, 220.0, 293.66], // B2, F#3, A3, D4
      arpNotes: [220.0, 293.66, 329.63, 369.99, 440.0], // A3, D4, E4, F#4, A4
    },
    // 4. A-Dur add4/9 (Sanfter Hauch des Windes)
    {
      durationSec: 9.0,
      padFreqs: [110.0, 164.81, 220.0, 277.18], // A2, E3, A3, C#4
      arpNotes: [277.18, 329.63, 369.99, 440.0, 554.37], // C#4, E4, F#4, A4, C#5
    },
  ];

  // --- Schauplatz-Musik Zustand ---
  private currentLocationChordIdx = 0;
  private nextLocationChordScheduleTime = 0;
  private currentMotifIdx = 0;
  private nextMotifTimerSec = 1.0;
  private nextAccentsTimerSec = 2.0;

  // Sphärische, aquatische Pads für den Feenteich (ätherisch, kristallin & ohne tiefes Bassbrummen)
  private readonly feenteichChords: readonly {
    durationSec: number;
    padFreqs: readonly number[];
  }[] = [
    // 1. A-Moll add9 (Spiegelglatte Wasseroberfläche im Waldlicht)
    {
      durationSec: 7.5,
      padFreqs: [220.0, 329.63, 440.0, 493.88, 523.25, 659.25], // A3, E4, A4, B4, C5, E5
    },
    // 2. F-Dur maj7#11 (Märchenhafter Lydischer Glanz der Wasserlilien & Blüten)
    {
      durationSec: 7.5,
      padFreqs: [174.61, 261.63, 349.23, 440.0, 493.88, 659.25], // F3, C4, F4, A4, B4, E5
    },
    // 3. C-Dur add9 (Das goldene Schimmern des Schatzes auf dem Grund)
    {
      durationSec: 7.5,
      padFreqs: [261.63, 329.63, 392.0, 523.25, 587.33, 783.99], // C4, E4, G4, C5, D5, G5
    },
    // 4. E-Moll9 (Die alte Weisheit und Magie der Nixe)
    {
      durationSec: 7.5,
      padFreqs: [196.0, 246.94, 293.66, 392.0, 493.88, 659.25], // G3, B3, D4, G4, B4, E5
    },
  ];

  // Zauberhafte Melodie-Phrasen des Feenteich-Leitmotivs (Celesta-/Glockenspiel)
  private readonly feenteichMotifPhrases: readonly {
    freq: number;
    timeOffset: number;
    duration: number;
    gain: number;
  }[][] = [
    // Phrase 1: "Der Ruf des Wassers" - Sehnsuchtsvoll aufsteigend und sanft fallend
    [
      { freq: 659.25, timeOffset: 0.00, duration: 0.60, gain: 0.070 }, // E5
      { freq: 783.99, timeOffset: 0.38, duration: 0.50, gain: 0.072 }, // G5
      { freq: 987.77, timeOffset: 0.76, duration: 0.85, gain: 0.082 }, // B5
      { freq: 880.00, timeOffset: 1.35, duration: 0.48, gain: 0.070 }, // A5
      { freq: 783.99, timeOffset: 1.70, duration: 0.48, gain: 0.068 }, // G5
      { freq: 659.25, timeOffset: 2.05, duration: 1.50, gain: 0.075 }, // E5 (ruhend)
    ],
    // Phrase 2: "Das Schimmern des Wassergolds" - Glanzvoll in kristalline Höhen
    [
      { freq: 987.77, timeOffset: 0.00, duration: 0.50, gain: 0.072 }, // B5
      { freq: 1046.50, timeOffset: 0.36, duration: 0.52, gain: 0.075 }, // C6
      { freq: 1174.66, timeOffset: 0.74, duration: 0.88, gain: 0.085 }, // D6 (kristalliner Glanz)
      { freq: 987.77, timeOffset: 1.35, duration: 0.48, gain: 0.070 }, // B5
      { freq: 783.99, timeOffset: 1.70, duration: 0.55, gain: 0.068 }, // G5
      { freq: 880.00, timeOffset: 2.10, duration: 1.60, gain: 0.076 }, // A5 (verwehend)
    ],
    // Phrase 3: "Der Zauberspruch" - Märchenhaft verspielt und warm aufgelöst
    [
      { freq: 783.99, timeOffset: 0.00, duration: 0.45, gain: 0.070 }, // G5
      { freq: 659.25, timeOffset: 0.32, duration: 0.45, gain: 0.068 }, // E5
      { freq: 587.33, timeOffset: 0.64, duration: 0.50, gain: 0.065 }, // D5
      { freq: 659.25, timeOffset: 0.98, duration: 0.65, gain: 0.070 }, // E5
      { freq: 783.99, timeOffset: 1.48, duration: 0.60, gain: 0.072 }, // G5
      { freq: 739.99, timeOffset: 1.96, duration: 0.60, gain: 0.070 }, // F#5
      { freq: 659.25, timeOffset: 2.44, duration: 1.70, gain: 0.078 }, // E5
    ],
  ];

  // Berg- & Kristall-Pads für den Silberstollen (Weg 1)
  private readonly silberstollenChords: readonly {
    durationSec: number;
    padFreqs: readonly number[];
  }[] = [
    { durationSec: 8.5, padFreqs: [146.83, 220.0, 261.63, 329.63, 349.23] }, // D-Moll9
    { durationSec: 8.5, padFreqs: [110.0, 164.81, 220.0, 246.94, 261.63] },  // A-Moll add9
    { durationSec: 8.5, padFreqs: [87.31, 130.81, 174.61, 220.0, 261.63] },  // F-Dur maj7
  ];

  // Düstere Basalt-Drones für den feurigen Höllenschlund (Weg 5)
  private readonly lavakraterChords: readonly {
    durationSec: number;
    padFreqs: readonly number[];
  }[] = [
    { durationSec: 9.0, padFreqs: [55.0, 73.42, 110.0, 146.83, 174.61] }, // D1 / D2 / A2 Drone
    { durationSec: 9.0, padFreqs: [77.78, 116.54, 155.56, 196.0] },      // Es-Dur Glut
  ];

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') {
      return null;
    }
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {
        // Ignorieren, falls Browser-Autoplay vor erster Nutzerinteraktion blockiert
      });
    }
    return this.ctx;
  }

  /**
   * Entsperrt den AudioContext bei der ersten Maus- oder Tastatureingabe,
   * damit die Hintergrund-Waldatmosphäre sanft starten kann.
   */
  public unlock(): void {
    const ctx = this.getContext();
    if (ctx && ctx.state === 'running') {
      this.ensureMusicNodes(ctx);
    }
  }

  /**
   * Stellt die Lautstärke der Hintergrundmusik stufenlos ein (0.0 bis 1.0).
   * Bei 0.0 wird die Musik automatisch stummgeschaltet.
   */
  public setMusicVolume(volume: number): void {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    this.isMusicMuted = this.musicVolume <= 0.001;
    if (this.ctx && this.musicMasterGain) {
      const target = this.isMusicMuted ? 0.00001 : SoundService.BASE_MUSIC_VOLUME * this.musicVolume;
      this.musicMasterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.15);
    }
  }

  /**
   * Gibt die aktuelle relative Lautstärkeeinstellung zurück (0.0 bis 1.0).
   */
  public getMusicVolume(): number {
    return this.musicVolume;
  }

  /**
   * Schaltet die Hintergrundmusik um (Stumm / Aktiv).
   */
  public toggleMusic(): boolean {
    this.isMusicMuted = !this.isMusicMuted;
    if (this.ctx && this.musicMasterGain) {
      const target = this.isMusicMuted ? 0.00001 : SoundService.BASE_MUSIC_VOLUME * this.musicVolume;
      this.musicMasterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.3);
    }
    return !this.isMusicMuted;
  }

  /**
   * Gibt zurück, ob die Hintergrundmusik aktuell aktiviert ist.
   */
  public isMusicEnabled(): boolean {
    return !this.isMusicMuted;
  }

  /**
   * Gibt den aktuell aktiven Schauplatz zurück (oder 'crossroads' bei Überwiegen der Waldkreuzung).
   */
  public getActiveLocation(): GameLocationKey {
    return this.locationBlendWeight >= 0.5 ? this.activeLocation : 'crossroads';
  }

  /**
   * Gibt den aktuellen Überblendungsfaktor zwischen Waldkreuzung (0.0) und
   * dem jeweiligen Schauplatz (1.0) zurück.
   */
  public getLocationBlendWeight(): number {
    return this.locationBlendWeight;
  }

  /**
   * Gibt den aktuellen Überblendungsfaktor für den Feenteich / Nixenteich zurück
   * (für Abwärtskompatibilität zu bestehenden Tests).
   */
  public getNixieBlendWeight(): number {
    return this.activeLocation === 'feenteich' ? this.locationBlendWeight : 0;
  }

  /**
   * Erstellt und initialisiert den Master-Gain und die beiden parallelen Sub-Busse:
   * 1. Waldkreuzungs-Bus mit Tiefpassfilter (540 Hz)
   * 2. Schauplatz-Bus mit Filter für die jeweilige Location (z. B. Feenteich 920 Hz)
   */
  private ensureMusicNodes(ctx: AudioContext): GainNode {
    if (!this.musicMasterGain) {
      // Master-Gain für die gesamte Hintergrundmusik
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.00001, ctx.currentTime);
      master.connect(ctx.destination);
      this.musicMasterGain = master;

      // 1. Waldkreuzungs-Subbus
      const forestBus = ctx.createGain();
      forestBus.gain.setValueAtTime(1.0, ctx.currentTime);
      forestBus.connect(master);
      this.crossroadsBusGain = forestBus;

      const forestFilter = ctx.createBiquadFilter();
      forestFilter.type = 'lowpass';
      forestFilter.frequency.setValueAtTime(540, ctx.currentTime);
      forestFilter.Q.setValueAtTime(0.7, ctx.currentTime);
      forestFilter.connect(forestBus);
      this.crossroadsFilterNode = forestFilter;

      // 2. Schauplatz-Subbus
      const locBus = ctx.createGain();
      locBus.gain.setValueAtTime(0.0001, ctx.currentTime);
      locBus.connect(master);
      this.locationBusGain = locBus;

      const locFilter = ctx.createBiquadFilter();
      locFilter.type = 'lowpass';
      locFilter.frequency.setValueAtTime(920, ctx.currentTime);
      locFilter.Q.setValueAtTime(1.1, ctx.currentTime);
      locFilter.connect(locBus);
      this.locationFilterNode = locFilter;
    }
    return this.musicMasterGain;
  }

  /**
   * Aktualisiert die Hintergrundmusik dynamisch basierend auf der Spielerposition:
   * - An der Kreuzung (Distanz <= 16 m): 100 % friedliche Waldkreuzungs-Atmosphäre.
   * - Auf halbem Weg (ca. 16 bis 30 m, Mitte bei ~23 m): Sehr langsamer, sanfter Übergang (Crossfade).
   * - Am Ziel / Schauplatz (Distanz >= 30 m, z. B. am Feenteich):
   *   100 % Schauplatz-Musik, Kreuzungsmusik pausiert vollständig!
   *   -> Am Feenteich erklingt ausschließlich die zauberhafte Feenteich-Musik.
   */
  public updateAmbientMusic(
    dtSeconds: number,
    isDialogueOpen = false,
    playerPos?: { x: number; z: number }
  ): void {
    if (dtSeconds <= 0) {
      return;
    }
    const ctx = this.getContext();
    if (!ctx || ctx.state !== 'running') {
      return;
    }

    const musicMaster = this.ensureMusicNodes(ctx);

    // 1. Gesamtlautstärke steuern (Lautstärkeregler + Ducking bei NPC-Dialogen)
    const effectiveBaseVol = SoundService.BASE_MUSIC_VOLUME * this.musicVolume;
    const effectiveDialogueVol = SoundService.DIALOGUE_MUSIC_VOLUME * this.musicVolume;
    const targetVolume = this.isMusicMuted
      ? 0.00001
      : isDialogueOpen
        ? effectiveDialogueVol
        : effectiveBaseVol;
    musicMaster.gain.setTargetAtTime(targetVolume, ctx.currentTime, 0.35);

    // 2. Schauplatz und Blendgewicht auf der Mitte des Weges bestimmen
    let targetBlend = 0;
    if (playerPos) {
      const distFromCrossroads = Math.hypot(playerPos.x, playerPos.z);

      // Den nächstgelegenen Schauplatz ermitteln
      let closestLoc: Exclude<GameLocationKey, 'crossroads'> = 'feenteich';
      let minLocDist = Infinity;
      (Object.keys(SoundService.LOCATIONS) as (Exclude<GameLocationKey, 'crossroads'>)[]).forEach(
        (locKey) => {
          const loc = SoundService.LOCATIONS[locKey];
          const d = Math.hypot(playerPos.x - loc.x, playerPos.z - loc.z);
          if (d < minLocDist) {
            minLocDist = d;
            closestLoc = locKey;
          }
        }
      );

      // Schauplatz wechseln
      if (this.activeLocation !== closestLoc && this.locationBlendWeight < 0.25) {
        this.activeLocation = closestLoc;
        this.updateLocationFilter(closestLoc, ctx);
      }

      // Übergangskorridor auf der Mitte des Weges:
      // <= 16m: 0.0 (Kreuzung) | >= 30m: 1.0 (Location) | Mitte (~23m): 0.5
      if (distFromCrossroads <= SoundService.CROSSROADS_RADIUS) {
        targetBlend = 0.0;
      } else if (distFromCrossroads >= SoundService.LOCATION_FULL_RADIUS) {
        targetBlend = 1.0;
      } else {
        targetBlend =
          (distFromCrossroads - SoundService.CROSSROADS_RADIUS) /
          (SoundService.LOCATION_FULL_RADIUS - SoundService.CROSSROADS_RADIUS);
      }
    }

    // Dynamische Überblendung (weiche Zeitkonstante ca. 1.5 bis 2.5 Sekunden)
    const blendRate = 1.25 * dtSeconds;
    this.locationBlendWeight += (targetBlend - this.locationBlendWeight) * Math.min(1.0, blendRate);

    // Kanten-Rastung: Bei Erreichen der Schauplatz-Endzone oder Kreuzung sauber einrasten
    if (playerPos) {
      const dist = Math.hypot(playerPos.x, playerPos.z);
      if (dist >= SoundService.LOCATION_FULL_RADIUS && this.locationBlendWeight >= 0.88) {
        this.locationBlendWeight = 1.0;
      } else if (dist <= SoundService.CROSSROADS_RADIUS && this.locationBlendWeight <= 0.12) {
        this.locationBlendWeight = 0.0;
      }
    }

    // Audio-Bus-Lautstärken per Equal-Power-Crossfade regeln:
    // - Ab 75 % Blend (also deutlich vor dem Teich): Kreuzung ist VOLLSTÄNDIG stummgeschaltet (0.00001)!
    // - Bis 25 % Blend (nahe der Kreuzung): Schauplatz ist VOLLSTÄNDIG stummgeschaltet (0.00001)!
    // - Auf der Wegmitte (~50 % Blend): Harmonische Gleichverteilung beider Musikstile
    if (this.crossroadsBusGain && this.locationBusGain) {
      let crossGain = 0.00001;
      let locGain = 0.00001;

      if (this.locationBlendWeight < 0.75) {
        const norm = Math.min(1.0, Math.max(0, this.locationBlendWeight / 0.75));
        crossGain = Math.cos(norm * 0.5 * Math.PI);
      }

      if (this.locationBlendWeight > 0.25) {
        const norm = Math.min(1.0, Math.max(0, (this.locationBlendWeight - 0.25) / 0.75));
        locGain = Math.sin(norm * 0.5 * Math.PI);
      }

      this.crossroadsBusGain.gain.setTargetAtTime(crossGain, ctx.currentTime, 0.25);
      this.locationBusGain.gain.setTargetAtTime(locGain, ctx.currentTime, 0.25);
    }

    if (this.isMusicMuted) {
      return;
    }

    // --- TEIL A: KREUZUNGS-WALDMUSIK ---
    // Vollständig pausieren, sobald die Wegmitte überschritten wird (am Feenteich läuft nur Feenteich-Musik!)
    if (this.locationBlendWeight < 0.55) {
      if (this.nextChordScheduleTime <= ctx.currentTime + 1.2) {
        const startTime = Math.max(ctx.currentTime + 0.05, this.nextChordScheduleTime);
        const chord = this.ambientChords[this.currentChordIdx];

        this.scheduleCrossroadsPadChord(ctx, startTime, chord.durationSec, chord.padFreqs);

        this.nextChordScheduleTime = startTime + chord.durationSec;
        this.currentChordIdx = (this.currentChordIdx + 1) % this.ambientChords.length;
      }

      this.nextArpTimerSec -= dtSeconds;
      if (this.nextArpTimerSec <= 0) {
        this.nextArpTimerSec = 3.8 + Math.random() * 4.0;
        const chord = this.ambientChords[this.currentChordIdx];
        const note = chord.arpNotes[Math.floor(Math.random() * chord.arpNotes.length)];
        this.scheduleCrossroadsPluck(ctx, ctx.currentTime + 0.1, note);
      }
    }

    // --- TEIL B: SCHAUPLATZ-MUSIK (Feenteich, Silberstollen, Lavakrater etc.) ---
    if (this.locationBlendWeight > 0.20) {
      this.updateActiveLocationMusic(ctx, dtSeconds);
    }
  }

  /**
   * Passt den Filter des Schauplatz-Busses an die jeweilige Klangcharakteristik an.
   */
  private updateLocationFilter(loc: Exclude<GameLocationKey, 'crossroads'>, ctx: AudioContext): void {
    if (!this.locationFilterNode) return;
    const now = ctx.currentTime;
    switch (loc) {
      case 'feenteich':
        this.locationFilterNode.frequency.setTargetAtTime(920, now, 0.8);
        this.locationFilterNode.Q.setTargetAtTime(1.1, now, 0.8);
        break;
      case 'silberstollen':
        this.locationFilterNode.frequency.setTargetAtTime(1100, now, 0.8);
        this.locationFilterNode.Q.setTargetAtTime(0.9, now, 0.8);
        break;
      case 'lavakrater':
        this.locationFilterNode.frequency.setTargetAtTime(420, now, 0.8);
        this.locationFilterNode.Q.setTargetAtTime(1.4, now, 0.8);
        break;
      default:
        this.locationFilterNode.frequency.setTargetAtTime(750, now, 0.8);
        this.locationFilterNode.Q.setTargetAtTime(0.8, now, 0.8);
        break;
    }
  }

  /**
   * Aktualisiert die jeweilige Schauplatz-Musik (z. B. am Feenteich nur Feenteich-Musik).
   */
  private updateActiveLocationMusic(ctx: AudioContext, dtSeconds: number): void {
    if (this.activeLocation === 'feenteich') {
      // 1. Sphärische Feenteich-Wasserpads
      if (this.nextLocationChordScheduleTime <= ctx.currentTime + 1.2) {
        const startTime = Math.max(ctx.currentTime + 0.05, this.nextLocationChordScheduleTime);
        const chord = this.feenteichChords[this.currentLocationChordIdx];

        this.scheduleLocationPadChord(ctx, startTime, chord.durationSec, chord.padFreqs);

        this.nextLocationChordScheduleTime = startTime + chord.durationSec;
        this.currentLocationChordIdx = (this.currentLocationChordIdx + 1) % this.feenteichChords.length;
      }

      // 2. Das zauberhafte Nixen-Leitmotiv (Celesta-/Glockenspiel)
      this.nextMotifTimerSec -= dtSeconds;
      if (this.nextMotifTimerSec <= 0) {
        const phrase = this.feenteichMotifPhrases[this.currentMotifIdx];
        this.scheduleFeenteichThemePhrase(ctx, ctx.currentTime + 0.1, phrase);

        this.currentMotifIdx = (this.currentMotifIdx + 1) % this.feenteichMotifPhrases.length;
        this.nextMotifTimerSec = 2.8 + Math.random() * 2.0;
      }

      // 3. Kristalline Tröpfchen- & Glitzer-Akzente auf dem See
      this.nextAccentsTimerSec -= dtSeconds;
      if (this.nextAccentsTimerSec <= 0) {
        this.nextAccentsTimerSec = 1.8 + Math.random() * 2.2;
        this.scheduleFeenteichWaterDrop(ctx, ctx.currentTime + 0.08);
      }
    } else if (this.activeLocation === 'silberstollen') {
      // Berg- und Kristall-Atmosphäre
      if (this.nextLocationChordScheduleTime <= ctx.currentTime + 1.2) {
        const startTime = Math.max(ctx.currentTime + 0.05, this.nextLocationChordScheduleTime);
        const chord = this.silberstollenChords[this.currentLocationChordIdx % this.silberstollenChords.length];
        this.scheduleLocationPadChord(ctx, startTime, chord.durationSec, chord.padFreqs);
        this.nextLocationChordScheduleTime = startTime + chord.durationSec;
        this.currentLocationChordIdx++;
      }

      this.nextMotifTimerSec -= dtSeconds;
      if (this.nextMotifTimerSec <= 0) {
        this.nextMotifTimerSec = 3.5 + Math.random() * 3.5;
        const crystalNotes = [659.25, 880.0, 1046.5, 1318.51, 1567.98];
        const note = crystalNotes[Math.floor(Math.random() * crystalNotes.length)];
        this.scheduleCrystalPluck(ctx, ctx.currentTime + 0.1, note);
      }
    } else if (this.activeLocation === 'lavakrater') {
      // Tiefe Basalt-Drones
      if (this.nextLocationChordScheduleTime <= ctx.currentTime + 1.2) {
        const startTime = Math.max(ctx.currentTime + 0.05, this.nextLocationChordScheduleTime);
        const chord = this.lavakraterChords[this.currentLocationChordIdx % this.lavakraterChords.length];
        this.scheduleLocationPadChord(ctx, startTime, chord.durationSec, chord.padFreqs);
        this.nextLocationChordScheduleTime = startTime + chord.durationSec;
        this.currentLocationChordIdx++;
      }
    } else {
      // Übrige Schauplätze: Sphärische Stimmung
      if (this.nextLocationChordScheduleTime <= ctx.currentTime + 1.2) {
        const startTime = Math.max(ctx.currentTime + 0.05, this.nextLocationChordScheduleTime);
        const chord = this.feenteichChords[this.currentLocationChordIdx % this.feenteichChords.length];
        this.scheduleLocationPadChord(ctx, startTime, chord.durationSec, chord.padFreqs);
        this.nextLocationChordScheduleTime = startTime + chord.durationSec;
        this.currentLocationChordIdx++;
      }
    }
  }

  /**
   * Erzeugt einen weichen, schwebenden Pad-Akkord für die Waldkreuzung.
   */
  private scheduleCrossroadsPadChord(
    ctx: AudioContext,
    startTime: number,
    durationSec: number,
    frequencies: readonly number[]
  ): void {
    if (!this.crossroadsFilterNode) {
      return;
    }

    const attack = 2.4;
    const release = 3.6;
    const totalDuration = durationSec + release;

    for (let i = 0; i < frequencies.length; i++) {
      const freq = frequencies[i];
      for (const detune of [-3.5, 3.5]) {
        const osc = ctx.createOscillator();
        osc.type = i === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        osc.detune.setValueAtTime(detune, startTime);

        const gain = ctx.createGain();
        const baseLevel = (i === 0 ? 0.08 : 0.055) / frequencies.length;

        gain.gain.setValueAtTime(0.0001, startTime);
        gain.gain.linearRampToValueAtTime(baseLevel, startTime + attack);
        gain.gain.setValueAtTime(baseLevel, startTime + durationSec);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + totalDuration);

        osc.connect(gain);
        gain.connect(this.crossroadsFilterNode);

        osc.start(startTime);
        osc.stop(startTime + totalDuration + 0.05);
      }
    }
  }

  /**
   * Spielt einen einzelnen, zarten Waldharfen-Ton an der Waldkreuzung.
   */
  private scheduleCrossroadsPluck(ctx: AudioContext, startTime: number, freq: number): void {
    if (!this.crossroadsBusGain) {
      return;
    }

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    const gain = ctx.createGain();
    const duration = 2.2;

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(0.026, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    const pan = Math.random() * 1.2 - 0.6;
    if (typeof ctx.createStereoPanner === 'function') {
      const panner = ctx.createStereoPanner();
      panner.pan.setValueAtTime(pan, startTime);
      osc.connect(gain);
      gain.connect(panner);
      panner.connect(this.crossroadsBusGain);
    } else {
      osc.connect(gain);
      gain.connect(this.crossroadsBusGain);
    }

    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }

  /**
   * Erzeugt einen weichen, sphärischen Pad-Akkord für den aktiven Schauplatz.
   */
  private scheduleLocationPadChord(
    ctx: AudioContext,
    startTime: number,
    durationSec: number,
    frequencies: readonly number[]
  ): void {
    if (!this.locationFilterNode) {
      return;
    }

    const attack = 2.2;
    const release = 3.2;
    const totalDuration = durationSec + release;

    for (let i = 0; i < frequencies.length; i++) {
      const freq = frequencies[i];
      for (const detune of [-2.4, 2.4]) {
        const osc = ctx.createOscillator();
        osc.type = i === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        osc.detune.setValueAtTime(detune, startTime);

        const gain = ctx.createGain();
        const baseLevel = (i === 0 ? 0.075 : 0.052) / frequencies.length;

        gain.gain.setValueAtTime(0.0001, startTime);
        gain.gain.linearRampToValueAtTime(baseLevel, startTime + attack);
        gain.gain.setValueAtTime(baseLevel, startTime + durationSec);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + totalDuration);

        osc.connect(gain);
        gain.connect(this.locationFilterNode);

        osc.start(startTime);
        osc.stop(startTime + totalDuration + 0.05);
      }
    }
  }

  /**
   * Spielt eine vollständige Phrase des zauberhaften Feenteich-Themas ab.
   */
  private scheduleFeenteichThemePhrase(
    ctx: AudioContext,
    phraseStartTime: number,
    phrase: readonly { freq: number; timeOffset: number; duration: number; gain: number }[]
  ): void {
    phrase.forEach((note) => {
      this.scheduleFeenteichMotifNote(
        ctx,
        note.freq,
        phraseStartTime + note.timeOffset,
        note.duration,
        note.gain
      );
    });
  }

  /**
   * Synthetisiert eine einzelne Note des zauberhaften Feenteich-Leitmotivs als glasklare Celesta:
   * Reiner Grundton + transparente Oktave + dezente Obertöne mit natürlicher Stereo-Echo-Reflexion.
   */
  private scheduleFeenteichMotifNote(
    ctx: AudioContext,
    freq: number,
    startTime: number,
    duration: number,
    peakGain: number
  ): void {
    if (!this.locationBusGain) {
      return;
    }

    // 1. Reiner Sinus-Grundton
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, startTime);

    const gain1 = ctx.createGain();
    gain1.gain.setValueAtTime(0.0001, startTime);
    gain1.gain.linearRampToValueAtTime(peakGain, startTime + 0.015);
    gain1.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    // 2. Transparente Oktave für Celesta-/Glockenklang
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, startTime);

    const gain2 = ctx.createGain();
    gain2.gain.setValueAtTime(0.0001, startTime);
    gain2.gain.linearRampToValueAtTime(peakGain * 0.28, startTime + 0.012);
    gain2.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.72);

    // 3. Feine Obertöne
    const osc3 = ctx.createOscillator();
    osc3.type = 'triangle';
    osc3.frequency.setValueAtTime(freq * 3.01, startTime);

    const gain3 = ctx.createGain();
    gain3.gain.setValueAtTime(0.0001, startTime);
    gain3.gain.linearRampToValueAtTime(peakGain * 0.1, startTime + 0.01);
    gain3.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.45);

    // Mischen
    const noteMix = ctx.createGain();
    osc1.connect(gain1);
    gain1.connect(noteMix);
    osc2.connect(gain2);
    gain2.connect(noteMix);
    osc3.connect(gain3);
    gain3.connect(noteMix);

    // Stereo-Pan mit Wasser-Echo
    const pan = Math.sin(startTime * 1.6) * 0.35;
    if (typeof ctx.createStereoPanner === 'function') {
      const panner = ctx.createStereoPanner();
      panner.pan.setValueAtTime(pan, startTime);
      noteMix.connect(panner);
      panner.connect(this.locationBusGain);

      // Zartes Reflexions-Echo auf der Gegenseite
      const echoGain = ctx.createGain();
      echoGain.gain.setValueAtTime(0.0001, startTime);
      echoGain.gain.setValueAtTime(0.0001, startTime + 0.17);
      echoGain.gain.linearRampToValueAtTime(peakGain * 0.28, startTime + 0.185);
      echoGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.17 + duration * 0.8);

      const echoPanner = ctx.createStereoPanner();
      echoPanner.pan.setValueAtTime(-pan, startTime);
      noteMix.connect(echoGain);
      echoGain.connect(echoPanner);
      echoPanner.connect(this.locationBusGain);
    } else {
      noteMix.connect(this.locationBusGain);
    }

    osc1.start(startTime);
    osc1.stop(startTime + duration + 0.25);
    osc2.start(startTime);
    osc2.stop(startTime + duration + 0.25);
    osc3.start(startTime);
    osc3.stop(startTime + duration + 0.25);
  }

  /**
   * Spielt einen perlenden Wassertropfenton am Feenteich ab.
   */
  private scheduleFeenteichWaterDrop(ctx: AudioContext, startTime: number): void {
    if (!this.locationBusGain) {
      return;
    }

    const dropFreqs = [1046.5, 1318.5, 1567.98, 1975.5, 2093.0];
    const freq = dropFreqs[Math.floor(Math.random() * dropFreqs.length)];

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.88, startTime + 0.14);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(0.02, startTime + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.35);

    const pan = Math.random() * 1.4 - 0.7;
    if (typeof ctx.createStereoPanner === 'function') {
      const panner = ctx.createStereoPanner();
      panner.pan.setValueAtTime(pan, startTime);
      osc.connect(gain);
      gain.connect(panner);
      panner.connect(this.locationBusGain);
    } else {
      osc.connect(gain);
      gain.connect(this.locationBusGain);
    }

    osc.start(startTime);
    osc.stop(startTime + 0.4);
  }

  /**
   * Kristalliner Zupfton am Silberstollen (Weg 1).
   */
  private scheduleCrystalPluck(ctx: AudioContext, startTime: number, freq: number): void {
    if (!this.locationBusGain) return;

    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(0.024, startTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.8);

    const pan = Math.random() * 1.2 - 0.6;
    if (typeof ctx.createStereoPanner === 'function') {
      const panner = ctx.createStereoPanner();
      panner.pan.setValueAtTime(pan, startTime);
      osc.connect(gain);
      gain.connect(panner);
      panner.connect(this.locationBusGain);
    } else {
      osc.connect(gain);
      gain.connect(this.locationBusGain);
    }

    osc.start(startTime);
    osc.stop(startTime + 1.9);
  }

  /**
   * Aktualisiert den Hintergrund-Timer für dezentes Vogelzwitschern im Wald.
   */
  public updateAmbientBirds(dtSeconds: number, isDialogueOpen = false): void {
    if (dtSeconds <= 0) {
      return;
    }
    this.nextBirdTimerSec -= dtSeconds;
    if (this.nextBirdTimerSec <= 0) {
      // Natürliche, unregelmäßige Pause bis zum nächsten Vogelruf (3,5 bis 7,8 Sekunden)
      this.nextBirdTimerSec = 3.5 + Math.random() * 4.3;

      if (!this.ctx || this.ctx.state !== 'running') {
        return;
      }

      // Während eines offenen Gesprächs noch dezenter im Hintergrund
      const volumeScale = isDialogueOpen ? 0.45 : 1.0;
      this.playDistantBirdCall(volumeScale);

      // Gelegentlich antwortet ein zweiter Vogel kurz darauf aus einer anderen Richtung
      if (Math.random() < 0.35) {
        this.playDistantBirdCall(volumeScale * 0.72, 0.75 + Math.random() * 0.45);
      }
    }
  }

  /**
   * Erzeugt ein sanftes, natürlich klingendes Vogelzwitschern aus den Baumwipfeln.
   */
  private playDistantBirdCall(volumeScale = 1.0, delayOffsetSec = 0): void {
    const ctx = this.getContext();
    if (!ctx) {
      return;
    }

    const baseTime = ctx.currentTime + delayOffsetSec;
    const panValue = (Math.random() * 1.5 - 0.75); // Leicht links oder rechts im Wald
    const pitchFactor = 0.92 + Math.random() * 0.18;
    const pattern = Math.floor(Math.random() * 3);

    if (pattern === 0) {
      // Motiv 1: Sanfter zweisilbiger Meisen-/Waldvogelruf
      this.scheduleBirdSyllable(
        ctx,
        baseTime,
        2450 * pitchFactor,
        2780 * pitchFactor,
        0.085,
        0.022 * volumeScale,
        panValue
      );
      this.scheduleBirdSyllable(
        ctx,
        baseTime + 0.11,
        2050 * pitchFactor,
        1880 * pitchFactor,
        0.13,
        0.02 * volumeScale,
        panValue
      );
    } else if (pattern === 1) {
      // Motiv 2: Zarter, perlender Rotkehlchen-/Fitis-Ruf (3–4 kurze Silben)
      const count = 3 + Math.floor(Math.random() * 2);
      for (let i = 0; i < count; i++) {
        const start = baseTime + i * 0.095;
        const fStart = (2850 - i * 190) * pitchFactor;
        const fEnd = (3150 - i * 210) * pitchFactor;
        this.scheduleBirdSyllable(
          ctx,
          start,
          fStart,
          fEnd,
          0.068,
          0.018 * volumeScale,
          panValue
        );
      }
    } else {
      // Motiv 3: Weicher, flötenartiger Amsel-/Singdrossel-Ton mit kleinem Nachschlag
      this.scheduleBirdSyllable(
        ctx,
        baseTime,
        1680 * pitchFactor,
        2020 * pitchFactor,
        0.14,
        0.024 * volumeScale,
        panValue
      );
      this.scheduleBirdSyllable(
        ctx,
        baseTime + 0.17,
        2180 * pitchFactor,
        1920 * pitchFactor,
        0.11,
        0.019 * volumeScale,
        panValue
      );
      this.scheduleBirdSyllable(
        ctx,
        baseTime + 0.31,
        2340 * pitchFactor,
        2480 * pitchFactor,
        0.08,
        0.015 * volumeScale,
        panValue
      );
    }
  }

  private scheduleBirdSyllable(
    ctx: AudioContext,
    startTime: number,
    startFreq: number,
    endFreq: number,
    duration: number,
    peakGain: number,
    pan: number
  ): void {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq, startTime);
    osc.frequency.exponentialRampToValueAtTime(
      Math.max(400, endFreq),
      startTime + duration * 0.75
    );
    osc.frequency.exponentialRampToValueAtTime(
      Math.max(400, endFreq * 0.94),
      startTime + duration
    );

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(peakGain, startTime + duration * 0.25);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);

    if (typeof ctx.createStereoPanner === 'function') {
      const panner = ctx.createStereoPanner();
      panner.pan.setValueAtTime(Math.max(-1, Math.min(1, pan)), startTime);
      gain.connect(panner);
      panner.connect(ctx.destination);
    } else {
      gain.connect(ctx.destination);
    }

    osc.start(startTime);
    osc.stop(startTime + duration + 0.015);
  }

  /**
   * Erzeugt einmalig einen kurzen Rausch-Puffer für das sanfte Waldboden-/Kies-Knirschen der Schritte.
   */
  private getNoiseBuffer(ctx: AudioContext): AudioBuffer {
    if (this.noiseBuffer && this.noiseBuffer.sampleRate === ctx.sampleRate) {
      return this.noiseBuffer;
    }
    const durationSeconds = 0.12;
    const length = Math.floor(ctx.sampleRate * durationSeconds);
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    this.noiseBuffer = buffer;
    return buffer;
  }

  /**
   * Spielt ein dezentes, natürliches Schrittgeräusch auf Waldboden/Kies ab
   * (abwechselnd für linken und rechten Fuß mit leichter Klangvariation).
   */
  public playFootstep(): void {
    const ctx = this.getContext();
    if (!ctx) {
      return;
    }

    const now = ctx.currentTime;
    this.stepLeftFoot = !this.stepLeftFoot;

    // Leichte Variation zwischen linkem und rechtem Fuß + minimaler Zufallsfaktor
    const jitter = 0.96 + Math.random() * 0.08;
    const baseThudFreq = (this.stepLeftFoot ? 112 : 124) * jitter;
    const crunchFilterFreq = (this.stepLeftFoot ? 720 : 840) * jitter;

    // 1. Weicher, gedämpfter Erd-Auftritt (Sohle auf Waldboden)
    const thudOsc = ctx.createOscillator();
    const thudGain = ctx.createGain();
    thudOsc.type = 'triangle';
    thudOsc.frequency.setValueAtTime(baseThudFreq, now);
    thudOsc.frequency.exponentialRampToValueAtTime(42, now + 0.055);

    thudGain.gain.setValueAtTime(0.001, now);
    thudGain.gain.linearRampToValueAtTime(0.075, now + 0.008);
    thudGain.gain.exponentialRampToValueAtTime(0.0008, now + 0.06);

    thudOsc.connect(thudGain);
    thudGain.connect(ctx.destination);
    thudOsc.start(now);
    thudOsc.stop(now + 0.065);

    // 2. Dezentes Kies-/Waldboden-Knirschen (Bandpass-gefiltertes Rauschen)
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = this.getNoiseBuffer(ctx);

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(crunchFilterFreq, now);
    filter.Q.setValueAtTime(2.2, now);

    const crunchGain = ctx.createGain();
    crunchGain.gain.setValueAtTime(0.001, now);
    crunchGain.gain.linearRampToValueAtTime(0.055, now + 0.012);
    crunchGain.gain.exponentialRampToValueAtTime(0.0008, now + 0.075);

    noiseSource.connect(filter);
    filter.connect(crunchGain);
    crunchGain.connect(ctx.destination);

    noiseSource.start(now);
    noiseSource.stop(now + 0.08);
  }

  /**
   * Spielt einen gut hörbaren, ausgewogenen Schatz-Jingle beim Öffnen der Truhe.
   */
  public playChestOpenFanfare(): void {
    const ctx = this.getContext();
    if (!ctx) {
      return;
    }

    const now = ctx.currentTime;

    // 1. Melodischer Aufstieg (G4 bis F#5 – etwas kräftiger, aber angenehm rund)
    const risingNotes = [
      { freq: 392.0, start: 0.0, duration: 0.115 }, // G4
      { freq: 440.0, start: 0.085, duration: 0.115 }, // A4
      { freq: 493.88, start: 0.17, duration: 0.115 }, // B4
      { freq: 587.33, start: 0.255, duration: 0.125 }, // D5
      { freq: 659.25, start: 0.34, duration: 0.135 }, // E5
      { freq: 739.99, start: 0.43, duration: 0.145 }, // F#5
    ];

    for (const note of risingNotes) {
      this.scheduleShimmerNote(ctx, note.freq, now + note.start, note.duration, 0.058);
    }

    // 2. Warmer, gut wahrnehmbarer Zielakkord (G-Dur: G4 - B4 - D5 - G5)
    const chordStart = now + 0.55;
    const chordNotes = [
      { freq: 392.0, gain: 0.048 }, // G4
      { freq: 493.88, gain: 0.044 }, // B4
      { freq: 587.33, gain: 0.042 }, // D5
      { freq: 783.99, gain: 0.036 }, // G5
    ];

    for (const chordNote of chordNotes) {
      this.scheduleShimmerNote(ctx, chordNote.freq, chordStart, 0.78, chordNote.gain);
    }
  }

  /**
   * Spielt ein kräftiges, satt hörbares Zufallen des schweren Holzdeckels samt Schloss-Einrasten.
   */
  public playChestCloseSound(): void {
    const ctx = this.getContext();
    if (!ctx) {
      return;
    }

    const now = ctx.currentTime;

    // 1. Satter Holz-Resonanzkörper beim Zufallen des Deckels
    const bodyOsc = ctx.createOscillator();
    const bodyGain = ctx.createGain();
    bodyOsc.type = 'triangle';
    bodyOsc.frequency.setValueAtTime(255, now);
    bodyOsc.frequency.exponentialRampToValueAtTime(92, now + 0.19);

    bodyGain.gain.setValueAtTime(0.001, now);
    bodyGain.gain.linearRampToValueAtTime(0.36, now + 0.01);
    bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.21);

    bodyOsc.connect(bodyGain);
    bodyGain.connect(ctx.destination);
    bodyOsc.start(now);
    bodyOsc.stop(now + 0.22);

    // 2. Deutlicher Hartholz-Anschlag (Mittenfrequenz, auch auf Handy/Laptop klar hörbar)
    const knockOsc = ctx.createOscillator();
    const knockGain = ctx.createGain();
    knockOsc.type = 'square';
    const knockFilter = ctx.createBiquadFilter();
    knockFilter.type = 'lowpass';
    knockFilter.frequency.setValueAtTime(1100, now);

    knockOsc.frequency.setValueAtTime(560, now);
    knockOsc.frequency.exponentialRampToValueAtTime(185, now + 0.09);

    knockGain.gain.setValueAtTime(0.001, now);
    knockGain.gain.linearRampToValueAtTime(0.24, now + 0.006);
    knockGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    knockOsc.connect(knockFilter);
    knockFilter.connect(knockGain);
    knockGain.connect(ctx.destination);
    knockOsc.start(now);
    knockOsc.stop(now + 0.11);

    // 3. Knackiger Impuls-Schlag (Holzkante auf Truhenrand)
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = this.getNoiseBuffer(ctx);

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(760, now);
    bandpass.Q.setValueAtTime(1.6, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.001, now);
    noiseGain.gain.linearRampToValueAtTime(0.3, now + 0.005);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.085);

    noiseSource.connect(bandpass);
    bandpass.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noiseSource.start(now);
    noiseSource.stop(now + 0.095);

    // 4. Metallisches Einrasten des Eisenbügels / Truhenschlosses kurz nach dem Aufprall
    const latchTime = now + 0.022;
    const latchOsc = ctx.createOscillator();
    const latchGain = ctx.createGain();
    latchOsc.type = 'sine';
    latchOsc.frequency.setValueAtTime(1340, latchTime);
    latchOsc.frequency.exponentialRampToValueAtTime(860, latchTime + 0.055);

    latchGain.gain.setValueAtTime(0.001, latchTime);
    latchGain.gain.linearRampToValueAtTime(0.16, latchTime + 0.005);
    latchGain.gain.exponentialRampToValueAtTime(0.001, latchTime + 0.06);

    latchOsc.connect(latchGain);
    latchGain.connect(ctx.destination);
    latchOsc.start(latchTime);
    latchOsc.stop(latchTime + 0.065);
  }

  /**
   * Spielt einen mächtigen, magischen Soundeffekt ab, wenn der Felsbrocken
   * auf Weg 1 durch Berühren des rotierenden Edelsteins zerbricht und aufgelöst wird:
   * Kristallines Glöckchen-Aufblitzen, tiefes sonores Grollen der Erde und zersplitterndes Gestein.
   */
  public playBoulderBreakSound(): void {
    const ctx = this.getContext();
    if (!ctx) {
      return;
    }


    const now = ctx.currentTime;

    // 1. Magischer Kristallglanz (Edelstein-Resonanz)
    const crystalNotes = [523.25, 659.25, 783.99, 1046.5]; // C-Dur / Quinte
    crystalNotes.forEach((freq, idx) => {
      this.scheduleShimmerNote(ctx, freq, now + idx * 0.05, 0.55, 0.08);
    });

    // 2. Tiefes, sonores Erd-Grollen (Sub-Bass Rumpeln der bebenden Felsmasse)
    const subOsc = ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(85, now + 0.1);
    subOsc.frequency.exponentialRampToValueAtTime(32, now + 0.95);

    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(0.001, now + 0.1);
    subGain.gain.linearRampToValueAtTime(0.38, now + 0.18);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now + 0.1);
    subOsc.stop(now + 1.15);

    // 3. Tiefpass-gefiltertes Rumpeln der Erdmassen
    const rumbleSource = ctx.createBufferSource();
    rumbleSource.buffer = this.getNoiseBuffer(ctx);

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(190, now + 0.1);
    lowpass.frequency.exponentialRampToValueAtTime(75, now + 1.0);

    const rumbleGain = ctx.createGain();
    rumbleGain.gain.setValueAtTime(0.001, now + 0.1);
    rumbleGain.gain.linearRampToValueAtTime(0.32, now + 0.22);
    rumbleGain.gain.exponentialRampToValueAtTime(0.001, now + 1.05);

    rumbleSource.connect(lowpass);
    lowpass.connect(rumbleGain);
    rumbleGain.connect(ctx.destination);
    rumbleSource.start(now + 0.1);
    rumbleSource.stop(now + 1.1);

    // 4. Zerspringendes, zerbröckelndes Gesteinsknistern (Bandpass-Rauschen)
    const crackleSource = ctx.createBufferSource();
    crackleSource.buffer = this.getNoiseBuffer(ctx);

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(1150, now + 0.15);
    bandpass.Q.setValueAtTime(2.2, now + 0.15);

    const crackleGain = ctx.createGain();
    crackleGain.gain.setValueAtTime(0.001, now + 0.15);
    crackleGain.gain.linearRampToValueAtTime(0.22, now + 0.2);
    crackleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

    crackleSource.connect(bandpass);
    bandpass.connect(crackleGain);
    crackleGain.connect(ctx.destination);
    crackleSource.start(now + 0.15);
    crackleSource.stop(now + 0.7);
  }

  /**
   * Spielt einen magischen Soundeffekt ab, wenn die Wasserpfütze auf Weg 2 versickert:
   * Kristalliner Glanz, zartes Gluckern und versickerndes Wasser.
   */
  public playPuddleDrainSound(): void {
    const ctx = this.getContext();
    if (!ctx) {
      return;
    }

    const now = ctx.currentTime;

    // 1. Aquamarin-Kristallglanz
    const crystalNotes = [659.25, 880.0, 1174.66, 1318.51];
    crystalNotes.forEach((freq, idx) => {
      this.scheduleShimmerNote(ctx, freq, now + idx * 0.045, 0.6, 0.07);
    });

    // 2. Gluckerndes, strudelndes Wasser (Frequenzmodulierter Oszillator)
    const bubbleOsc = ctx.createOscillator();
    bubbleOsc.type = 'sine';
    bubbleOsc.frequency.setValueAtTime(320, now + 0.08);
    bubbleOsc.frequency.exponentialRampToValueAtTime(140, now + 0.85);

    const bubbleGain = ctx.createGain();
    bubbleGain.gain.setValueAtTime(0.001, now + 0.08);
    bubbleGain.gain.linearRampToValueAtTime(0.24, now + 0.18);
    bubbleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.95);

    bubbleOsc.connect(bubbleGain);
    bubbleGain.connect(ctx.destination);
    bubbleOsc.start(now + 0.08);
    bubbleOsc.stop(now + 1.0);

    // 3. Rauschendes Versickern im feuchten Erdboden (Bandpass-Rauschen)
    const drainSource = ctx.createBufferSource();
    drainSource.buffer = this.getNoiseBuffer(ctx);

    const drainFilter = ctx.createBiquadFilter();
    drainFilter.type = 'bandpass';
    drainFilter.frequency.setValueAtTime(750, now + 0.1);
    drainFilter.frequency.exponentialRampToValueAtTime(260, now + 0.85);
    drainFilter.Q.setValueAtTime(1.8, now + 0.1);

    const drainGain = ctx.createGain();
    drainGain.gain.setValueAtTime(0.001, now + 0.1);
    drainGain.gain.linearRampToValueAtTime(0.26, now + 0.2);
    drainGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

    drainSource.connect(drainFilter);
    drainFilter.connect(drainGain);
    drainGain.connect(ctx.destination);
    drainSource.start(now + 0.1);
    drainSource.stop(now + 0.95);
  }

  /**
   * Spielt einen magischen Soundeffekt ab, wenn der Baumstamm auf Weg 4 zerfällt:
   * Bernstein-Akkord, knackendes Splittern und zerspringendes Holz.
   */
  public playLogBreakSound(): void {
    const ctx = this.getContext();
    if (!ctx) {
      return;
    }

    const now = ctx.currentTime;

    // 1. Bernstein-Kristallklang
    const amberNotes = [440.0, 554.37, 659.25, 880.0];
    amberNotes.forEach((freq, idx) => {
      this.scheduleShimmerNote(ctx, freq, now + idx * 0.045, 0.55, 0.075);
    });

    // 2. Knackender Holzimpuls (tiefer, trockener Aufschlag)
    const woodOsc = ctx.createOscillator();
    woodOsc.type = 'triangle';
    woodOsc.frequency.setValueAtTime(160, now + 0.1);
    woodOsc.frequency.exponentialRampToValueAtTime(65, now + 0.35);

    const woodGain = ctx.createGain();
    woodGain.gain.setValueAtTime(0.001, now + 0.1);
    woodGain.gain.linearRampToValueAtTime(0.35, now + 0.13);
    woodGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    woodOsc.connect(woodGain);
    woodGain.connect(ctx.destination);
    woodOsc.start(now + 0.1);
    woodOsc.stop(now + 0.5);

    // 3. Knisterndes, splitterndes Holz (Bandpass-Rauschen)
    const crackSource = ctx.createBufferSource();
    crackSource.buffer = this.getNoiseBuffer(ctx);

    const crackFilter = ctx.createBiquadFilter();
    crackFilter.type = 'bandpass';
    crackFilter.frequency.setValueAtTime(1450, now + 0.1);
    crackFilter.Q.setValueAtTime(2.5, now + 0.1);

    const crackGain = ctx.createGain();
    crackGain.gain.setValueAtTime(0.001, now + 0.1);
    crackGain.gain.linearRampToValueAtTime(0.3, now + 0.14);
    crackGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

    crackSource.connect(crackFilter);
    crackFilter.connect(crackGain);
    crackGain.connect(ctx.destination);
    crackSource.start(now + 0.1);
    crackSource.stop(now + 0.7);
  }

  /**
   * Spielt einen magischen Soundeffekt ab, wenn das Feuer auf Weg 5 erlischt:
   * Rubinrote Kristalltöne, zischendes Verpuffen und abklingender Dampf.
   */
  public playFireExtinguishSound(): void {
    const ctx = this.getContext();
    if (!ctx) {
      return;
    }

    const now = ctx.currentTime;

    // 1. Rubinkristall-Harmonie
    const rubyNotes = [392.0, 493.88, 587.33, 783.99];
    rubyNotes.forEach((freq, idx) => {
      this.scheduleShimmerNote(ctx, freq, now + idx * 0.045, 0.55, 0.08);
    });

    // 2. Zischendes Erlöschen der Flammen (Hochpass-Rauschen)
    const hissSource = ctx.createBufferSource();
    hissSource.buffer = this.getNoiseBuffer(ctx);

    const hissFilter = ctx.createBiquadFilter();
    hissFilter.type = 'bandpass';
    hissFilter.frequency.setValueAtTime(2800, now + 0.1);
    hissFilter.frequency.exponentialRampToValueAtTime(950, now + 0.75);
    hissFilter.Q.setValueAtTime(1.5, now + 0.1);

    const hissGain = ctx.createGain();
    hissGain.gain.setValueAtTime(0.001, now + 0.1);
    hissGain.gain.linearRampToValueAtTime(0.36, now + 0.16);
    hissGain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

    hissSource.connect(hissFilter);
    hissFilter.connect(hissGain);
    hissGain.connect(ctx.destination);
    hissSource.start(now + 0.1);
    hissSource.stop(now + 0.9);

    // 3. Dumpfer Dampf-Ausstoß
    const steamOsc = ctx.createOscillator();
    steamOsc.type = 'sine';
    steamOsc.frequency.setValueAtTime(120, now + 0.12);
    steamOsc.frequency.exponentialRampToValueAtTime(45, now + 0.6);

    const steamGain = ctx.createGain();
    steamGain.gain.setValueAtTime(0.001, now + 0.12);
    steamGain.gain.linearRampToValueAtTime(0.25, now + 0.2);
    steamGain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    steamOsc.connect(steamGain);
    steamGain.connect(ctx.destination);
    steamOsc.start(now + 0.12);
    steamOsc.stop(now + 0.75);
  }

  /**
   * Spielt einen magischen Soundeffekt ab, wenn der Bachlauf auf Weg 3 versiegt / zur Ruhe kommt:
   * Saphirblauer Kristallglanz und beruhigendes, sanft abklingendes Wasserrauschen.
   */
  public playStreamDrainSound(): void {
    const ctx = this.getContext();
    if (!ctx) {
      return;
    }

    const now = ctx.currentTime;

    // 1. Saphir-Kristallklang (D-Dur Harmonie)
    const sapphireNotes = [587.33, 739.99, 880.0, 1174.66];
    sapphireNotes.forEach((freq, idx) => {
      this.scheduleShimmerNote(ctx, freq, now + idx * 0.05, 0.65, 0.08);
    });

    // 2. Abklingendes Wasserrauschen (Bandpass-Rauschen)
    const rushSource = ctx.createBufferSource();
    rushSource.buffer = this.getNoiseBuffer(ctx);

    const rushFilter = ctx.createBiquadFilter();
    rushFilter.type = 'bandpass';
    rushFilter.frequency.setValueAtTime(1200, now + 0.1);
    rushFilter.frequency.exponentialRampToValueAtTime(320, now + 0.9);
    rushFilter.Q.setValueAtTime(1.8, now + 0.1);

    const rushGain = ctx.createGain();
    rushGain.gain.setValueAtTime(0.001, now + 0.1);
    rushGain.gain.linearRampToValueAtTime(0.32, now + 0.18);
    rushGain.gain.exponentialRampToValueAtTime(0.001, now + 0.95);

    rushSource.connect(rushFilter);
    rushFilter.connect(rushGain);
    rushGain.connect(ctx.destination);
    rushSource.start(now + 0.1);
    rushSource.stop(now + 1.0);
  }

  /**
   * Spielt einen magischen Soundeffekt ab, wenn die Kräutersperre auf Weg 6 weicht:
   * Amethyst-Glockenakkord, sanftes Knarren des weichenden Holzgeländers und raschelndes Laub.
   */
  public playHerbsClearSound(): void {
    const ctx = this.getContext();
    if (!ctx) {
      return;
    }

    const now = ctx.currentTime;

    // 1. Amethyst-Kristallakkord (E-Moll / C-Dur Sphäre)
    const amethystNotes = [523.25, 659.25, 783.99, 1046.5];
    amethystNotes.forEach((freq, idx) => {
      this.scheduleShimmerNote(ctx, freq, now + idx * 0.045, 0.7, 0.085);
    });

    // 2. Weichendes, knarrendes Holzgeländer
    const woodOsc = ctx.createOscillator();
    woodOsc.type = 'sawtooth';
    woodOsc.frequency.setValueAtTime(140, now + 0.1);
    woodOsc.frequency.linearRampToValueAtTime(95, now + 0.45);

    const woodFilter = ctx.createBiquadFilter();
    woodFilter.type = 'lowpass';
    woodFilter.frequency.setValueAtTime(450, now + 0.1);

    const woodGain = ctx.createGain();
    woodGain.gain.setValueAtTime(0.001, now + 0.1);
    woodGain.gain.linearRampToValueAtTime(0.18, now + 0.15);
    woodGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    woodOsc.connect(woodFilter);
    woodFilter.connect(woodGain);
    woodGain.connect(ctx.destination);
    woodOsc.start(now + 0.1);
    woodOsc.stop(now + 0.55);

    // 3. Raschelndes Laub / welkende Ranken
    const leafSource = ctx.createBufferSource();
    leafSource.buffer = this.getNoiseBuffer(ctx);

    const leafFilter = ctx.createBiquadFilter();
    leafFilter.type = 'highpass';
    leafFilter.frequency.setValueAtTime(2200, now + 0.12);

    const leafGain = ctx.createGain();
    leafGain.gain.setValueAtTime(0.001, now + 0.12);
    leafGain.gain.linearRampToValueAtTime(0.22, now + 0.22);
    leafGain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

    leafSource.connect(leafFilter);
    leafFilter.connect(leafGain);
    leafGain.connect(ctx.destination);
    leafSource.start(now + 0.12);
    leafSource.stop(now + 0.9);
  }

  /**
   * Spielt einen allumfassenden, erhabenen Zauberklang ab, wenn auf die Spitze
   * des Wegweisers geklickt wird und sich alle 6 Wegsperren gleichzeitig auflösen:
   * Aufsteigendes kristallines Celesta-Arpeggio, warmer Äther-Chor und ein sanfter Magiewind.
   */
  public playAllBarriersClearSound(): void {
    const ctx = this.getContext();
    if (!ctx) {
      return;
    }

    const now = ctx.currentTime;

    // 1. Aufsteigendes Celesta-/Glockenspiel-Arpeggio (Weite Quinten & Terzen)
    const notes = [
      { freq: 440.0, delay: 0.0, dur: 0.85, gain: 0.08 },    // A4
      { freq: 554.37, delay: 0.07, dur: 0.85, gain: 0.085 }, // C#5
      { freq: 659.25, delay: 0.14, dur: 0.9, gain: 0.09 },   // E5
      { freq: 880.0, delay: 0.21, dur: 1.0, gain: 0.095 },   // A5
      { freq: 1108.73, delay: 0.28, dur: 1.1, gain: 0.09 },  // C#6
      { freq: 1318.51, delay: 0.35, dur: 1.25, gain: 0.085 },// E6
      { freq: 1760.0, delay: 0.44, dur: 1.45, gain: 0.07 },  // A6
    ];

    notes.forEach((n) => {
      this.scheduleShimmerNote(ctx, n.freq, now + n.delay, n.dur, n.gain);
    });

    // 2. Warmer Resonanz-Akkord im Hintergrund (Klangkissen)
    const chordPadFreqs = [220.0, 329.63, 440.0, 554.37];
    chordPadFreqs.forEach((freq) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.045, now + 0.35);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.85);
    });

    // 3. Seidiger Magie-Wind (Bandpass-Rauschen mit Frequenzanstieg)
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = this.getNoiseBuffer(ctx);

    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(600, now);
    bp.frequency.exponentialRampToValueAtTime(2800, now + 0.6);
    bp.frequency.exponentialRampToValueAtTime(900, now + 1.4);
    bp.Q.setValueAtTime(2.0, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.0001, now);
    noiseGain.gain.linearRampToValueAtTime(0.18, now + 0.25);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);

    noiseSource.connect(bp);
    bp.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noiseSource.start(now);
    noiseSource.stop(now + 1.55);
  }


  /**
   * Spielt einen harmonischen, kristallinen Resonanz-Akkord ab, wenn der Sockel
   * des Wegweisers berührt wird (Umschalten der Wegbegrenzung) oder ein Edelstein-Rätsel gelöst wird.
   */
  public playGemstoneSolved(): void {
    const ctx = this.getContext();
    if (!ctx) {
      return;
    }

    const now = ctx.currentTime;
    const notes = [
      { freq: 523.25, delay: 0.0, dur: 0.65, gain: 0.08 },   // C5
      { freq: 659.25, delay: 0.06, dur: 0.75, gain: 0.085 }, // E5
      { freq: 783.99, delay: 0.12, dur: 0.85, gain: 0.09 },  // G5
      { freq: 1046.5, delay: 0.18, dur: 1.05, gain: 0.075 }, // C6
    ];

    notes.forEach((n) => {
      this.scheduleShimmerNote(ctx, n.freq, now + n.delay, n.dur, n.gain);
    });
  }

  private scheduleShimmerNote(
    ctx: AudioContext,
    freq: number,
    startTime: number,
    duration: number,
    peakGain: number
  ): void {
    // 1. Tragender Grundton
    const mainOsc = ctx.createOscillator();
    mainOsc.type = 'sine';
    mainOsc.frequency.setValueAtTime(freq, startTime);

    const mainGain = ctx.createGain();
    mainGain.gain.setValueAtTime(0.0001, startTime);
    mainGain.gain.linearRampToValueAtTime(peakGain, startTime + 0.016);
    mainGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    mainOsc.connect(mainGain);
    mainGain.connect(ctx.destination);

    mainOsc.start(startTime);
    mainOsc.stop(startTime + duration + 0.02);

    // 2. Dezenter Oberton für bessere Hörbarkeit auf kleineren Lautsprechern
    const overtoneOsc = ctx.createOscillator();
    overtoneOsc.type = 'triangle';
    overtoneOsc.frequency.setValueAtTime(freq * 2, startTime);

    const overtoneGain = ctx.createGain();
    overtoneGain.gain.setValueAtTime(0.0001, startTime);
    overtoneGain.gain.linearRampToValueAtTime(peakGain * 0.22, startTime + 0.012);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.75);

    overtoneOsc.connect(overtoneGain);
    overtoneGain.connect(ctx.destination);

    overtoneOsc.start(startTime);
    overtoneOsc.stop(startTime + duration);
  }
}

