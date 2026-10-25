---
tags: [projekt, browsergame]
---

# 7Wege

Browsergame mit Three.js für [wanderland.info](https://wanderland.info).

## Projektnotizen

- [[Spielkonzept]]
- [[Technische-Entscheidungen]]
- [[Assets-und-Lizenzen]]
- [[Veröffentlichung]]

## Gemeinsamer Arbeitsbereich

Der gesamte Projektordner ist zugleich der Obsidian-Vault. Die Projektnotizen liegen hier in `docs/`; der Code liegt in `../src/` und öffentliche Dateien in `../public/`. Hermes und Gemini in Antigravity können dieselben Markdown-Dateien lesen.

## Stand

Alle 7 Wege, Schauplätze, Wegsperren, NPCs, Dialoge und Audio-Systeme sind implementiert. Die 3D-Welt nutzt schauplatz-basiertes Lazy Loading und Asset-Streaming für einen extrem schnellen initialen Seitenstart (~16 MB).
Unten links steht ein interaktives Aktions-Dock mit dem **Tagebuch (📖, Taste J)** für den aktuellen Questauftrag („erkunde die Gegend“ bzw. Pfad-Quest) sowie der **Sammlung (🎒, Taste I)** mit 6 Sternen für die Wegequests bereit.
