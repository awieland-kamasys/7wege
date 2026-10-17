/**
 * Prozeduraler Sound-Synthesizer über die Web Audio API (ohne externe Audio-Assets).
 * Erzeugt u. a.:
 * - den zauberhaften Entdeckungs-Jingle beim Öffnen der Schatztruhe,
 * - natürliche Schrittgeräusche auf Waldboden und Kieswegen während des Laufens,
 * - dezentes, unauffälliges Vogelzwitschern im Hintergrund zur Belebung der Waldatmosphäre.
 */
export class SoundService {
  private ctx: AudioContext | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private stepLeftFoot = false;
  private nextBirdTimerSec = 2.2;

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
    this.getContext();
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
   * Spielt einen kurzen, zauberhaften Schatz-Jingle (angelehnt an klassische Abenteuer-Spiele)
   * mit aufsteigender lydischer Tonfolge und strahlendem Schlussakkord.
   */
  public playChestOpenFanfare(): void {
    const ctx = this.getContext();
    if (!ctx) {
      return;
    }

    const now = ctx.currentTime;

    // 1. Kurzer, sanfter Aufstieg (mystische Ganzton-/Lydische Stufen)
    const risingNotes = [
      { freq: 523.25, start: 0.0, duration: 0.11 }, // C5
      { freq: 587.33, start: 0.09, duration: 0.11 }, // D5
      { freq: 659.25, start: 0.18, duration: 0.11 }, // E5
      { freq: 739.99, start: 0.27, duration: 0.12 }, // F#5
      { freq: 783.99, start: 0.36, duration: 0.12 }, // G5
      { freq: 880.0, start: 0.45, duration: 0.14 }, // A5
    ];

    for (const note of risingNotes) {
      this.scheduleShimmerNote(ctx, note.freq, now + note.start, note.duration, 0.14);
    }

    // 2. Strahlender, magischer Zielakkord (B-Dur / G-Dur9 Schimmer: G5 - B5 - D6 - G6)
    const chordStart = now + 0.58;
    const chordNotes = [
      { freq: 587.33, gain: 0.1 }, // D5
      { freq: 783.99, gain: 0.12 }, // G5
      { freq: 987.77, gain: 0.15 }, // B5
      { freq: 1174.66, gain: 0.16 }, // D6 (Hauptmelodieton)
      { freq: 1567.98, gain: 0.09 }, // G6 (Glitzern)
    ];

    for (const chordNote of chordNotes) {
      this.scheduleShimmerNote(ctx, chordNote.freq, chordStart, 0.75, chordNote.gain);
    }
  }

  /**
   * Spielt einen dezenten, dunklen Holzton beim Schließen des Truhendeckels.
   */
  public playChestCloseSound(): void {
    const ctx = this.getContext();
    if (!ctx) {
      return;
    }

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(190, now);
    osc.frequency.exponentialRampToValueAtTime(75, now + 0.14);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.16, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.16);
  }

  private scheduleShimmerNote(
    ctx: AudioContext,
    freq: number,
    startTime: number,
    duration: number,
    peakGain: number
  ): void {
    // Hauptton (warmer Okarina-/Harfen-Grundklang)
    const mainOsc = ctx.createOscillator();
    mainOsc.type = 'triangle';
    mainOsc.frequency.setValueAtTime(freq, startTime);

    // Leichter glockenartiger Oberton (eine Oktave höher)
    const shimmerOsc = ctx.createOscillator();
    shimmerOsc.type = 'sine';
    shimmerOsc.frequency.setValueAtTime(freq * 2, startTime);

    const mainGain = ctx.createGain();
    mainGain.gain.setValueAtTime(0.0001, startTime);
    mainGain.gain.linearRampToValueAtTime(peakGain, startTime + 0.018);
    mainGain.gain.exponentialRampToValueAtTime(0.0008, startTime + duration);

    const shimmerGain = ctx.createGain();
    shimmerGain.gain.setValueAtTime(0.0001, startTime);
    shimmerGain.gain.linearRampToValueAtTime(peakGain * 0.35, startTime + 0.015);
    shimmerGain.gain.exponentialRampToValueAtTime(0.0005, startTime + duration * 0.85);

    mainOsc.connect(mainGain);
    shimmerOsc.connect(shimmerGain);
    mainOsc.connect(ctx.destination);
    shimmerGain.connect(ctx.destination);

    mainOsc.start(startTime);
    shimmerOsc.start(startTime);
    mainOsc.stop(startTime + duration + 0.02);
    shimmerOsc.stop(startTime + duration + 0.02);
  }
}
