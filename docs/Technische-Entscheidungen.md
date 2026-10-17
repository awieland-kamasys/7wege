# Technische Entscheidungen

## Vorschlag für den Start

- Vite + TypeScript + Three.js.
- Zunächst keine zusätzliche UI-Bibliothek; DOM-Oberflächen nur bei Bedarf ergänzen.
- Spiellogik und Daten von Three.js-Szenen trennen.
- Vitest für Spiellogik; Playwright-Browsertests später ergänzen.
- Als statische Web-App bauen. Einbindung unter `/7wege/` ist ein Vorschlag und hängt noch vom Hosting von wanderland.info ab.

## Struktur

- `src/app/`: Einstieg, Konfiguration und Lebenszyklus
- `src/game/scenes/`: Szenen und Spielbereiche
- `src/game/entities/`: Figuren und interaktive Objekte
- `src/game/systems/`: Eingabe, Regeln und Spielzustand
- `src/game/data/`: Level und Spieldaten
- `src/ui/`: Menüs und HUD
- `src/assets/`: importierte Projektdateien
- `public/assets/`: direkt ausgelieferte Dateien
- `tests/`: Unit- und spätere Browser-Tests

## Offene Punkte

- Hosting, Build-Basis-Pfad und Einbindung in die Website prüfen.
- Leistungsziel für mobile Geräte festlegen.
- Format und Umfang der Spielstände entscheiden.
