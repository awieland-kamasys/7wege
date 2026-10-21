# Projektregeln & Richtlinien (7Wege)

## Sprache & Kommunikation
- Antworte, dokumentiere, denke (`thought`) und kommuniziere **immer zu 100 % auf Deutsch**.
- Verfasse auch alle Kurzbeschreibungen, Tool-Statusmeldungen (`toolAction`, `toolSummary`, `Description`, `Instruction`), Commit-Nachrichten und Kommentare im Code auf Deutsch.

## Projektpfad & Obsidian-Vault
- Das Hauptprojekt befindet sich direkt im geöffneten Workspace unter `d:\WANDERLAND\7WEGE`.
- Der zentrale Obsidian-Vault befindet sich unter `d:\WANDERLAND\WANDERLAND_OBS`.
- Alle Konzept- und Projektdokumente liegen in `docs/` (`7Wege.md`, `Spielkonzept.md`, `Technische-Entscheidungen.md`, `Assets-und-Lizenzen.md`, `Veröffentlichung.md`) und sind per Verzeichnis-Verknüpfung (Junction) nahtlos in `d:\WANDERLAND\WANDERLAND_OBS\7WEGE` eingebunden.
- Halte die Obsidian-Notizen in `docs/` bei architektonischen oder konzeptionellen Änderungen aktuell.

## Architektur & Technische Leitplanken
- **Tech-Stack:** Vite + TypeScript + Three.js (ohne React; schlanke, barrierearme DOM-UI unter `src/ui/`).
- **Trennung von Logik und Darstellung:**
  - Reine Spiellogik, Regeln und Zustand (`src/game/systems/`, `src/game/data/`) müssen unabhängig von Three.js testbar sein.
  - 3D-Darstellung, Kamera, Licht und Meshes gehören nach `src/game/scenes/` und `src/game/entities/`.
- **Tests:** Unit-Tests für Spiellogik und Daten mit Vitest in `tests/unit/` pflegen; E2E-Tests später in `tests/e2e/`.
- **Assets & Lizenzen:** Externe Assets vor Verwendung immer in `docs/Assets-und-Lizenzen.md` dokumentieren.
