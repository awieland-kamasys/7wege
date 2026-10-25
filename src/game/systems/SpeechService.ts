export interface SpeechOptions {
  rate?: number;
  pitch?: number;
}

/**
 * Schlanker Service für die deutsche Browser-Sprachausgabe (Web Speech API).
 * Funktioniert fehlertolerant auch in Umgebungen ohne speechSynthesis (z. B. Unit-Tests).
 */
export class SpeechService {
  private enabled = true;
  private lastSpokenText: string | null = null;
  private lastSpokenOptions: SpeechOptions | undefined = undefined;

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
   * Spricht den übergebenen Text auf Deutsch vor, sofern die Sprachausgabe aktiv ist.
   * Unterstützt optionale Anpassung von Sprechgeschwindigkeit (rate) und Tonhöhe (pitch).
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
      utterance.pitch = options?.pitch ?? 0.92;

      const voices = window.speechSynthesis.getVoices();
      const germanVoice =
        voices.find((v) => v.lang.toLowerCase().startsWith('de') && v.localService) ??
        voices.find((v) => v.lang.toLowerCase().startsWith('de'));

      if (germanVoice) {
        utterance.voice = germanVoice;
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
