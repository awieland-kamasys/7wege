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

## Performance- & Render-Richtlinien

- **InstancedMesh für Vegetation:** Die gesamte Waldkulisse (> 1.500 individuelle Meshes) wird über geteilte Geometrien und 6 spezialisierte `THREE.InstancedMesh`-Gruppen (Stämme, Kronen dunkel/hell, verbrannt/lebendig) gerendert. Dies reduziert die Draw Calls um über 99 % und minimiert GPU-Treiber-Overhead.
- **Schatten- & Licht-Optimierung:** Die Shadow Map des Richtungslichts ist auf 1024×1024 mit `PCFSoftShadowMap` und `bias = -0.0004` optimiert. Flache Bodensenken (Teich, Krater) werfen keinen Schatten, und teure Cube-Shadow-Maps auf PointLights wurden eliminiert.
- **PointLight- & Entity-Culling:** Dynamische Punktlichter schalten `visible = false`, wenn ungenutzt, um Shader-Limits zu vermeiden. Weit entfernte Entities (> 33 m) pausieren Partikel-, Wellen- und Skelettanimationen im dichten Nebel.
- **Raycast- & Input-Throttling:** Raycasting zur Objekt- und Pfadauswahl wird per Animationsframe entkoppelt (`updatePointerHover` in `loop`), um Layout-Thrashing und hunderte unnötige Berechnungen pro Sekunde bei High-DPI-Mäusen zu verhindern.
- **Kamera- und Nebelabstimmung:** Die Kamera-Far-Plane ist eng an die Nebelgrenze angepasst (`camera.far = 42m`), sodass unsichtbare Geometrien automatisch im Frustum-Culling verworfen werden.
- **Garbage-Collection-Schonung:** Keine dynamischen Objekt-Instanziierungen (`new THREE.Vector3()`, `Color.clone()`) im aktiven Render-Loop; stattdessen feste Hilfsvariablen wiederverwenden.
- **Textur-Caching:** Prozedural generierte Texturen (`GroundTextures.ts`) werden im Speicher gecacht, sodass aufwendige 2D-Canvas-Renderzyklen nur einmalig ablaufen.
- **Sauberes Ressourcen-Disposal:** Bei GLTF-Modell-Ladevorgängen und Szenen-Teardowns werden temporäre Platzhalter und Meshes rekursiv über `disposeObject3D()` aus dem GPU-VRAM freigegeben.
- **DOM-Dirty-Checking:** UI-Elemente (`HudOverlay.ts`) aktualisieren Text- und Klassen-Attribute nur bei tatsächlichen Zustandsänderungen, um ständige Reflows und Repaints zu vermeiden.
- **High-DPI- & Mobilgeräte-Optimierung:** `renderer.setPixelRatio` deckelt die Renderauflösung auf Mobilgeräten und kleineren Viewports auf maximal `1.5` (Desktop `2.0`), und der Renderer nutzt `powerPreference: 'high-performance'`. Dies spart auf modernen Mobilgeräten (DPR 3-4) bis zu 60 % der GPU-Füllrate und Shader-Berechnungen ein.
- **Pfad-Geometrie-Verschmelzung (`mergeGeometries`):** Alle geraden Wegsegmente und runden Kurvengelenke pro Pfad werden über `BufferGeometryUtils.mergeGeometries` in ein einziges zusammenhängendes Mesh gebündelt. Dies reduziert die Mesh- und Draw-Call-Zahl um ca. 80 Objekte und beschleunigt das Raycasting spürbar.
- **Vegetations- & Deko-Verschmelzung (Waldblumen, Pilze, Nistkästen):** Vorher erzeugten 118 Blumencluster, 35 Pilzgruppen und 35 Nistkästen über 7.700 individuelle Meshes und trieben die Draw Calls auf über 3.360 in die Höhe. Durch Material-basiertes Zusammenführen (`buildMergedFlowerClusters`, `buildMergedMushroomClusters`, `buildMergedBirdhouses`) sank die Mesh-Zahl dieser Elemente von 7.700 auf genau 17 Meshes und die Draw Calls um über 95 % auf ~176.
- **Live-Performance-Overlay (Taste P):** Im HUD zeigt ein dezentes Badge live Bildrate und Draw Calls an. Per Klick oder Taste `P` öffnet sich ein Diagnosedialog mit Live-Werten aus `renderer.info`.
- **Gestaffeltes Laden (Lazy Loading) von 3D-Assets:** Die zentrale Szene (Kreuzung, Hütte, Arvid) lädt im Startframe 0. Entfernte Schauplätze (Graumännchen, Waldteich, Nixe, Lavakrater, Teufel) starten ihr Modell-Download- und Parsing gestaffelt mit kurzen Pausen (400 bis 1900 ms), während prozedurale Low-Poly-Platzhalter sofort klickbar bereitstehen.
- **Asset-Bereinigung & Trennung:** Das Auslieferungsverzeichnis `public/assets/models/` wurde auf die 7 tatsächlich verwendeten GLB-Dateien bereinigt (Reduktion von 53 MB auf 19 MB Download-Größe). Alle Modell-Duplikate und Konzept-Grafiken wurden in den Sicherungsordner `backup_assets/models/` verschoben (kein Datenverlust).
- **Prozedurale 3D-Höhenmap & Textur-basierte Pfade (`CompositeTerrainTexture`):**
  - Die Spielfläche ist ein plastisches 3D-Gelände mit Steigungen, Hügeln und Tälern (`PlaneGeometry(240, 240, 160, 160)` mit Vertex-Displacement und Vertex-Normalen-Neuberechnung).
  - **Wege direkt auf der Geländetextur:** Statt aufliegender oder schwebender Geometrie-Platten werden die 7 Waldwege, die zentrale Lichtung und alle Schauplatz-Plätze über eine hochauflösende 2048×2048 Composite-Canvas-Textur direkt auf das Terrain gerendert. Dies eliminiert jegliches Z-Fighting und unschöne Steigungskanten, spart über 80 Geometrie-Objekte ein und erlaubt weiche, natürliche, organisch ausgefranste Wegränder mit Kieselstrukturen und Moossäumen.
  - **Dunkelrotadrige Magmazone:** Der Bereich um den Lavasee am Ende von Weg 5 ist als tiefer Basaltkessel gestaltet, der von netzartigen, glühenden dunkelroten Magma-Adern durchzogen ist (über `map`, `emissiveMap` und `bumpMap`), die im Spiel dynamisch pulsieren.
  - **Strikte Trennung von Spiellogik und 3D-Welt:** Die Spiellogik (`CrossroadsState`, Kollisionen, Quests, Dialoge) verbleibt rein zweidimensional (`x, z`) und ohne Three.js-Abhängigkeiten unit-getestet. Die Geländehöhe wird deterministisch und performant über das mathematische Höhenfeld `getTerrainHeight(x, z)` (`src/game/utils/terrainHeight.ts`) ermittelt; Raycasting auf das Terrain erkennt Pfade analytisch über `getPathAtPosition(x, z)`.
  - **Schauplatz-Plateaus (`TERRAIN_PLATEAUS`):** Die Kreuzung liegt bei `y = 0.0 m`. Schauplatz-Plateaus garantieren einen stabilen Stand: Silberstollen-Bergmassiv (`+6.8 m` mit aufsteigendem Gebirgskamm dahinter), Waldteich mit Nixe (`-1.2 m`), Bachtal mit Wehrbrücke (`-1.5 m`), Waldhochebene am Holzfällerlager (`+0.8 m`), Teufelskrater / Höllenschlund (`-5.0 m`), Waldhang an der Jagdhütte (`+1.0 m`) und Hügelkuppe am verschlossenen Tor (`+2.2 m`).

## Offene Punkte

- Hosting, Build-Basis-Pfad und Einbindung in die Website prüfen.
- Leistungsziel für mobile Geräte festlegen.
- Format und Umfang der Spielstände entscheiden.
