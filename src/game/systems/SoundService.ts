/**
 * Prozeduraler Sound-Synthesizer über die Web Audio API (ohne externe Audio-Assets).
 * Erzeugt u. a. einen kurzen, zauberhaften Entdeckungs-Jingle beim Öffnen der Schatztruhe.
 */
export class SoundService {
  private ctx: AudioContext | null = null;

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
        // Ignorieren, falls Browser-Autoplay blockiert
      });
    }
    return this.ctx;
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
    mainGain.connect(ctx.destination);
    shimmerGain.connect(ctx.destination);

    mainOsc.start(startTime);
    shimmerOsc.start(startTime);
    mainOsc.stop(startTime + duration + 0.02);
    shimmerOsc.stop(startTime + duration + 0.02);
  }
}
