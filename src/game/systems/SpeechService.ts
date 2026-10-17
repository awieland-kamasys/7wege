/**
 * Schlanker Service für die deutsche Browser-Sprachausgabe (Web Speech API).
 * Funktioniert fehlertolerant auch in Umgebungen ohne speechSynthesis (z. B. Unit-Tests).
 */
export class SpeechService {
  private enabled = true;
  private lastSpokenText: string | null = null;

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
      this.lastSpokenText = null;
      this.speak(textToRepeat);
    }
    return this.enabled;
  }

  /**
   * Spricht den übergebenen Text auf Deutsch vor, sofern die Sprachausgabe aktiv ist.
   */
  public speak(text: string): void {
    this.lastSpokenText = text;
    if (!this.enabled || !this.isSupported()) {
      return;
    }

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.96;
      utterance.pitch = 0.92;

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
