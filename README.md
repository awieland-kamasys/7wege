# 7Wege

Browsergame mit Three.js für **wanderland.info**.

## Technische Richtung

- **Vite + TypeScript + Three.js**: schneller Entwicklungsserver und statischer Build.
- Zunächst **kein React**: UI nur ergänzen, wenn Menüs oder HUD es wirklich brauchen.
- Spielregeln und Spielzustand von der Three.js-Darstellung trennen, damit Logik testbar bleibt.
- **Vitest** für reine Spiellogik; Browser-End-to-End-Tests später mit Playwright.
- Als eigenständige Web-App bauen und voraussichtlich unter `/7wege/` veröffentlichen. Den endgültigen Einbauweg erst festlegen, wenn Hosting und Website-Stack bekannt sind.

## Geplante Struktur

```text
index.html
public/assets/          direkt ausgelieferte Dateien
src/
  main.ts               Einstiegspunkt
  app/                  Start, Konfiguration und Lebenszyklus
  game/
    scenes/             Spielbereiche und Three.js-Szenen
    entities/           Spielfiguren und interaktive Objekte
    systems/            Eingabe, Bewegung, Regeln und Spielzustand
    data/               Levels und konfigurierbare Spieldaten
  ui/                   Menüs, HUD und barrierearme DOM-Oberflächen
  styles/               globale und komponentenbezogene Styles
  assets/               importierte Bilder, Modelle und Audio
 tests/
  unit/                 Spiellogik und Daten
  e2e/                  spätere Browserabläufe
 docs/                  gemeinsame Obsidian-Notizen
```

## Nächste Entscheidungen

1. Spielziel und zentrale Spielschleife festlegen.
2. Zielgeräte und Eingabe (Maus/Tastatur, Touch oder beides) bestimmen.
3. Stil, Audio und Herkunft der Assets klären.
4. Website-Einbindung und Veröffentlichungsweg für `wanderland.info` bestätigen.

## Stand

Ordnerstruktur ist vorbereitet. Spielcode, Abhängigkeiten und Website-Veröffentlichung sind noch nicht angelegt. Erst das Konzept für einen kleinen, spielbaren Prototyp festlegen, dann in kurzen, testbaren Schritten umsetzen.
