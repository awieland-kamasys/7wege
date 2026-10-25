export type VoiceGender = 'male' | 'female' | 'neutral';

export interface SpeechOptions {
  rate?: number;
  pitch?: number;
  gender?: VoiceGender;
}

/**
 * Schlanker Service für die deutsche Browser-Sprachausgabe (Web Speech API).
 * Ermittelt gezielt passende männliche oder weibliche Stimmen (z. B. 'Microsoft Stefan' / 'Christoph'
 * für Waldhüter Arvid oder 'Microsoft Hedda' / 'Katja' für die Nixe) und passt Tonhöhe und Sprechtempo an.
 * Funktioniert fehlertolerant auch in Umgebungen ohne speechSynthesis (z. B. Unit-Tests).
 */
export class SpeechService {
  private enabled = true;
  private lastSpokenText: string | null = null;
  private lastSpokenOptions: SpeechOptions | undefined = undefined;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    this.initVoices();
  }

  private initVoices(): void {
    if (!this.isSupported()) return;
    try {
      this.voices = window.speechSynthesis.getVoices();
      if (typeof window.speechSynthesis.addEventListener === 'function') {
        window.speechSynthesis.addEventListener('voiceschanged', () => {
          this.voices = window.speechSynthesis.getVoices();
        });
      } else if ('onvoiceschanged' in window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = () => {
          this.voices = window.speechSynthesis.getVoices();
        };
      }
    } catch {
      // Fehlertolerant ignorieren
    }
  }

  private isSupported(): boolean {
    return (
      typeof window !== 'undefined' &&
      'speechSynthesis' in window &&
      typeof SpeechSynthesisUtterance !== 'undefined'
    );
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public toggleEnabled(): boolean {
    this.enabled = !this.enabled;
    if (!this.enabled) {
      this.stop();
    } else if (this.lastSpokenText) {
      const textToRepeat = this.lastSpokenText;
      const optsToRepeat = this.lastSpokenOptions;
      this.lastSpokenText = null;
      this.lastSpokenOptions = undefined;
      this.speak(textToRepeat, optsToRepeat);
    }
    return this.enabled;
  }

  /**
   * Prüft, ob ein Sprechername oder eine Voice-URI auf eine männliche Stimme hinweist.
   */
  public isMaleVoice(voice: SpeechSynthesisVoice | null): boolean {
    if (!voice) return false;
    const malePatterns = [
      /\bstefan\b/i,
      /\bchristoph\b/i,
      /\bconrad\b/i,
      /\bbernd\b/i,
      /\bklaus\b/i,
      /\bflorian\b/i,
      /\blukas\b/i,
      /\bmartin\b/i,
      /\byannick\b/i,
      /\bviktor\b/i,
      /\bhans\b/i,
      /\bmarkus\b/i,
      /\bmichael\b/i,
      /\bjohannes\b/i,
      /\bjan\b/i,
      /\bmale\b/i,
      /\bmännlich\b/i,
      /de-de-x-deg/i,
      /de-de-x-deb/i,
    ];
    const text = `${voice.name} ${voice.voiceURI}`;
    return malePatterns.some((p) => p.test(text));
  }

  /**
   * Prüft, ob ein Sprechername oder eine Voice-URI auf eine weibliche Stimme hinweist.
   */
  public isFemaleVoice(voice: SpeechSynthesisVoice | null): boolean {
    if (!voice) return false;
    const femalePatterns = [
      /\bhedda\b/i,
      /\bkatja\b/i,
      /\bamala\b/i,
      /\bingrid\b/i,
      /\bgisela\b/i,
      /\bmarlene\b/i,
      /\belke\b/i,
      /\bvicki\b/i,
      /\banna\b/i,
      /\bpetra\b/i,
      /\bhelena\b/i,
      /\bgudrun\b/i,
      /\bsabrina\b/i,
      /\bfemale\b/i,
      /\bweiblich\b/i,
      /de-de-x-dfg/i,
      /de-de-x-dfa/i,
    ];
    const text = `${voice.name} ${voice.voiceURI}`;
    return femalePatterns.some((p) => p.test(text));
  }

  /**
   * Sucht gezielt nach einer deutschen Stimme für das gewünschte Geschlecht.
   * Wählt bevorzugt männliche Stimmen (z. B. 'Stefan', 'Christoph') oder weibliche ('Hedda', 'Katja').
   */
  public getGermanVoice(gender?: VoiceGender): SpeechSynthesisVoice | null {
    if (!this.isSupported()) return null;

    let voiceList = this.voices;
    if (!voiceList || voiceList.length === 0) {
      try {
        voiceList = window.speechSynthesis.getVoices();
        this.voices = voiceList;
      } catch {
        return null;
      }
    }

    const germanVoices = (voiceList || []).filter((v) => {
      const lang = v.lang.toLowerCase().replace('_', '-');
      return lang.startsWith('de');
    });

    if (germanVoices.length === 0) {
      return null;
    }

    if (gender === 'male') {
      const maleVoice =
        germanVoices.find((v) => this.isMaleVoice(v) && !this.isFemaleVoice(v)) ??
        germanVoices.find((v) => !this.isFemaleVoice(v));

      if (maleVoice) {
        return maleVoice;
      }
    } else if (gender === 'female') {
      const femaleVoice =
        germanVoices.find((v) => this.isFemaleVoice(v) && !this.isMaleVoice(v)) ??
        germanVoices.find((v) => !this.isMaleVoice(v));

      if (femaleVoice) {
        return femaleVoice;
      }
    }

    // Standard-Fallback: Lokale oder erstbeste deutsche Stimme
    return germanVoices.find((v) => v.localService) ?? germanVoices[0] ?? null;
  }

  /**
   * Spricht den übergebenen Text auf Deutsch vor, sofern die Sprachausgabe aktiv ist.
   * Unterstützt Anpassung von Sprechgeschwindigkeit (rate), Tonhöhe (pitch) und Stimmtyp (gender).
   */
  public speak(text: string, options?: SpeechOptions): void {
    this.lastSpokenText = text;
    this.lastSpokenOptions = options;
    if (!this.enabled || !this.isSupported()) {
      return;
    }

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = options?.rate ?? 0.96;

      const chosenVoice = this.getGermanVoice(options?.gender);
      if (chosenVoice) {
        utterance.voice = chosenVoice;
      }

      // Tonhöhe: Wenn männlich gewünscht ist, aber nur eine weibliche Stimme existiert,
      // senken wir den Pitch künstlich ab, damit die Stimme dunkel und maskulin klingt.
      if (options?.gender === 'male') {
        const isTrulyMale = this.isMaleVoice(chosenVoice);
        if (isTrulyMale) {
          utterance.pitch = options?.pitch ?? 0.84;
        } else {
          utterance.pitch = Math.min(options?.pitch ?? 0.74, 0.74);
        }
      } else if (options?.gender === 'female') {
        const isTrulyFemale = this.isFemaleVoice(chosenVoice);
        utterance.pitch = options?.pitch ?? (isTrulyFemale ? 1.02 : 1.14);
      } else {
        utterance.pitch = options?.pitch ?? 0.92;
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignoriere Browser-Einschränkungen, falls Audio ohne Nutzerinteraktion blockiert wird
    }
  }

  /**
   * Beendet eine laufende Sprachausgabe sofort.
   */
  public stop(): void {
    this.lastSpokenText = null;
    if (!this.isSupported()) {
      return;
    }
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignorieren
    }
  }
}
