import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SpeechService } from '../../src/game/systems/SpeechService';

describe('SpeechService (Deutsche Sprachausgabe mit männlicher Stimme für Waldhüter Arvid)', () => {
  let speechService: SpeechService;

  beforeEach(() => {
    speechService = new SpeechService();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('funktioniert fehlertolerant ohne Browser-speechSynthesis (Unit-Test-Umgebung)', () => {
    expect(speechService.isEnabled()).toBe(true);
    // Sollte ohne Fehler ausgeführt werden
    speechService.speak('Hallo Waldhüter Arvid!', { rate: 0.94, pitch: 0.82, gender: 'male' });
    speechService.stop();
  });

  it('erlaubt das Umschalten von Sprachausgabe (toggleEnabled)', () => {
    expect(speechService.isEnabled()).toBe(true);
    expect(speechService.toggleEnabled()).toBe(false);
    expect(speechService.isEnabled()).toBe(false);
    expect(speechService.toggleEnabled()).toBe(true);
    expect(speechService.isEnabled()).toBe(true);
  });

  it('erkennt männliche und weibliche deutsche Sprechernamen korrekt', () => {
    const stefan = { name: 'Microsoft Stefan Desktop - German (Germany)', voiceURI: 'Stefan', lang: 'de-DE' } as SpeechSynthesisVoice;
    const christoph = { name: 'Microsoft Christoph Online (Natural) - German (Germany)', voiceURI: 'Christoph', lang: 'de-DE' } as SpeechSynthesisVoice;
    const hedda = { name: 'Microsoft Hedda Desktop - German (Germany)', voiceURI: 'Hedda', lang: 'de-DE' } as SpeechSynthesisVoice;
    const katja = { name: 'Microsoft Katja Online (Natural) - German (Germany)', voiceURI: 'Katja', lang: 'de-DE' } as SpeechSynthesisVoice;
    const googleDe = { name: 'Google Deutsch', voiceURI: 'Google Deutsch', lang: 'de-DE' } as SpeechSynthesisVoice;

    expect(speechService.isMaleVoice(stefan)).toBe(true);
    expect(speechService.isFemaleVoice(stefan)).toBe(false);

    expect(speechService.isMaleVoice(christoph)).toBe(true);
    expect(speechService.isFemaleVoice(christoph)).toBe(false);

    expect(speechService.isFemaleVoice(hedda)).toBe(true);
    expect(speechService.isMaleVoice(hedda)).toBe(false);

    expect(speechService.isFemaleVoice(katja)).toBe(true);
    expect(speechService.isMaleVoice(katja)).toBe(false);

    // Neutrale Stimme
    expect(speechService.isMaleVoice(googleDe)).toBe(false);
    expect(speechService.isFemaleVoice(googleDe)).toBe(false);
  });

  it('bevorzugt gezielt männliche Stimmen für Waldhüter Arvid (getGermanVoice)', () => {
    const mockVoices: SpeechSynthesisVoice[] = [
      { name: 'Microsoft Hedda Desktop - German (Germany)', voiceURI: 'Hedda', lang: 'de-DE', default: false, localService: true } as SpeechSynthesisVoice,
      { name: 'Microsoft Stefan Desktop - German (Germany)', voiceURI: 'Stefan', lang: 'de-DE', default: false, localService: true } as SpeechSynthesisVoice,
      { name: 'Microsoft Katja Online (Natural)', voiceURI: 'Katja', lang: 'de-DE', default: false, localService: false } as SpeechSynthesisVoice,
    ];

    // Mock global window mit speechSynthesis
    const mockCancel = vi.fn();
    const mockSpeak = vi.fn();
    const mockGetVoices = vi.fn().mockReturnValue(mockVoices);

    (global as any).window = {
      speechSynthesis: {
        cancel: mockCancel,
        speak: mockSpeak,
        getVoices: mockGetVoices,
        addEventListener: vi.fn(),
      },
    };

    class MockUtterance {
      public text: string;
      public lang = '';
      public rate = 1;
      public pitch = 1;
      public voice: SpeechSynthesisVoice | null = null;
      constructor(text: string) {
        this.text = text;
      }
    }
    (global as any).SpeechSynthesisUtterance = MockUtterance;

    const testService = new SpeechService();

    // 1. Männliche Stimme anfordern -> Stefan muss gewählt werden, NICHT Hedda
    const maleVoice = testService.getGermanVoice('male');
    expect(maleVoice).not.toBeNull();
    expect(maleVoice?.name).toContain('Stefan');

    // 2. Weibliche Stimme anfordern -> Hedda oder Katja muss gewählt werden
    const femaleVoice = testService.getGermanVoice('female');
    expect(femaleVoice).not.toBeNull();
    expect(femaleVoice?.name).toContain('Hedda');

    // 3. Sprache für Arvid auslösen
    testService.speak('Willkommen im Wald!', { rate: 0.93, pitch: 0.82, gender: 'male' });
    expect(mockCancel).toHaveBeenCalled();
    expect(mockSpeak).toHaveBeenCalled();
    const spokenUtterance = mockSpeak.mock.calls[0][0];
    expect(spokenUtterance.voice?.name).toContain('Stefan');
    expect(spokenUtterance.pitch).toBe(0.82);
    expect(spokenUtterance.rate).toBe(0.93);
  });
});
