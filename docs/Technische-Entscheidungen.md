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
- **Optimierte Nadelbaum-Silhouette & Tiefenschatten:** Die Baumgeometrien wurden ohne Performance-Einbußen visuell aufgewertet: 5 gestaffelte, gezackte Ast-Etagen mit leichtem Nadelzweig-Überhang und konkavem Schwung, 4 organisch auslaufende Wurzelanläufe am Stammfuß sowie per Vertex-Colors eingebackene Tiefenschatten (Ambient Occlusion) an den Astunterseiten. Mit nur ca. 370 Vertices pro Baum bleibt der gesamte 900-Bäume-Wald bei ultra-leichten ~400k Dreiecken und stabilen 60 FPS.
- **Schatten- & Licht-Optimierung:** Die Shadow Map des Richtungslichts ist auf 1024×1024 mit `PCFSoftShadowMap` und `bias = -0.0004` optimiert. Flache Bodensenken (Teich, Krater) werfen keinen Schatten, und teure Cube-Shadow-Maps auf PointLights wurden eliminiert.
- **PointLight- & Entity-Culling:** Dynamische Punktlichter schalten `visible = false`, wenn ungenutzt, um Shader-Limits zu vermeiden. Weit entfernte Entities (> 33 m) pausieren Partikel-, Wellen- und Skelettanimationen im dichten Nebel.
- **Raycast- & Input-Throttling:** Raycasting zur Objekt- und Pfadauswahl wird per Animationsframe entkoppelt (`updatePointerHover` in `loop`), um Layout-Thrashing und hunderte unnötige Berechnungen pro Sekunde bei High-DPI-Mäusen zu verhindern.
- **Kamera- und Nebelabstimmung:** Die Kamera-Far-Plane ist eng an die Nebelgrenze angepasst (`camera.far = 42m`), sodass unsichtbare Geometrien automatisch im Frustum-Culling verworfen werden.
- **Garbage-Collection-Schonung:** Keine dynamischen Objekt-Instanziierungen (`new THREE.Vector3()`, `Color.clone()`) im aktiven Render-Loop; stattdessen feste Hilfsvariablen wiederverwenden.
- **Textur-Caching:** Prozedural generierte Texturen (`GroundTextures.ts`) werden im Speicher gecacht, sodass aufwendige 2D-Canvas-Renderzyklen nur einmalig ablaufen.
- **Sauberes Ressourcen-Disposal:** Bei GLTF-Modell-Ladevorgängen und Szenen-Teardowns werden temporäre Platzhalter und Meshes rekursiv über `disposeObject3D()` aus dem GPU-VRAM freigegeben.
- **DOM-Dirty-Checking:** UI-Elemente (`HudOverlay.ts`) aktualisieren Text- und Klassen-Attribute nur bei tatsächlichen Zustandsänderungen, um ständige Reflows und Repaints zu vermeiden.
- **High-DPI- & Mobilgeräte-Optimierung:** `renderer.setPixelRatio` deckelt die Renderauflösung auf Mobilgeräten und kleineren Viewports auf maximal `1.5` (Desktop `2.0`), und der Renderer nutzt `powerPreference: 'high-performance'`. Dies spart auf modernen Mobilgeräten (DPR 3-4) bis zu 60 % der GPU-Füllrate und Shader-Berechnungen ein.
- **Mobile Gestensteuerung (Multi-Touch & Pinch-to-Zoom):** Intuitive Gestensteuerung auf Touchscreens über die Pointer Events API (`activePointers` Map). Zwei-Finger-Pinch ermöglicht stufenloses, ruckfreies Hinein- und Herauszoomen der Verfolgerkamera (`zoomCamera`). Gleichzeitig unterdrückt `#game-canvas { touch-action: none; }` und die Abfangung von `gesturestart`/`gesturechange`/`pointercancel` versehentliche Browser-Seitenzoomaktionen sowie unerwünschtes Kamera-Verschwenken beim Zoomen.
- **Pfad-Geometrie-Verschmelzung (`mergeGeometries`):** Alle geraden Wegsegmente und runden Kurvengelenke pro Pfad werden über `BufferGeometryUtils.mergeGeometries` in ein einziges zusammenhängendes Mesh gebündelt. Dies reduziert die Mesh- und Draw-Call-Zahl um ca. 80 Objekte und beschleunigt das Raycasting spürbar.
- **Vegetations- & Deko-Verschmelzung (Waldblumen, Pilze, Nistkästen, Uferbüsche):** Vorher erzeugten florale Elemente Tausende individuelle Meshes und trieben die Draw Calls in die Höhe. Durch Material-basiertes Zusammenführen (`buildMergedFlowerClusters`, `buildMergedMushroomClusters`, `buildMergedBirdhouses`, `buildMergedForestBushes`) sinkt die Mesh-Zahl dieser Elemente auf minimale Merged Meshes (nur 3-4 Draw Calls für alle Büsche am Nixenteich).
- **Live-Performance-Overlay (Taste P):** Im HUD zeigt ein dezentes Badge live Bildrate und Draw Calls an. Per Klick oder Taste `P` öffnet sich ein Diagnosedialog mit Live-Werten aus `renderer.info`.
- **Gestaffeltes Laden (Lazy Loading) von 3D-Assets:** Die zentrale Szene (Kreuzung, Hütte, Arvid) lädt im Startframe 0. Entfernte Schauplätze (Graumännchen, Waldteich, Nixe, Lavakrater, Teufel) starten ihr Modell-Download- und Parsing gestaffelt mit kurzen Pausen (400 bis 1900 ms), während prozedurale Low-Poly-Platzhalter sofort klickbar bereitstehen.
- **Asset-Bereinigung & Trennung:** Das Auslieferungsverzeichnis `public/assets/models/` wurde auf die 7 tatsächlich verwendeten GLB-Dateien bereinigt (Reduktion von 53 MB auf 19 MB Download-Größe). Alle Modell-Duplikate und Konzept-Grafiken wurden in den Sicherungsordner `backup_assets/models/` verschoben (kein Datenverlust).
- **Prozedurale 3D-Höhenmap & Splatmap-Terrain (`TerrainMaterial.ts`, `TerrainSplatMap.ts`):**
  - Die Spielfläche ist ein plastisches 3D-Gelände mit Steigungen, Hügeln und Tälern (`PlaneGeometry(240, 240, 160, 160)` mit Vertex-Displacement und Vertex-Normalen-Neuberechnung).
  - **Splatmap-Shader-Blending:** Statt schwammiger, über die gesamte Welt gestreckter Texturen nutzt das Terrain ein hochmodernes PBR-Splatmap-Material (`MeshStandardMaterial.onBeforeCompile`):
    - **Gestochen scharfe Waldwiese:** Sattes, kontrastreiches Waldwiesengrün mit Moos- und Grashalmstrukturen (65× gekachelt).
    - **Gestochen scharfe Kieselwege:** Natürlicher Waldbodenschotter (45× gekachelt).
    - **Obsidian-Magmaboden:** Tiefschwarzer Basaltboden mit glühenden roten Adern am Lavasee (18× gekachelt).
    - **Alpine Schneezone & Harschboden:** Gekachelte, glitzernde Schneedecke mit Harschwellen und Mikro-Kristallen am Bergmassiv von Weg 1 (46× gekachelt, gesteuert über den Blau-Kanal der Splatmap).
    - **Organische Splatmap (2048×2048):** Steuert die weichen, natürlichen Übergänge zwischen Wiese (Schwarz), Pfaden (Rot), Lavaboden (Grün) und alpiner Schneezone (Blau). Die zentrale Waldkreuzung und der Hüttenplatz sind als harmonische, zusammenhängende Fläche angelegt (keine pillenförmigen Kringel oder Ovale vor der Hütte).
  - **Alpine Schneezone an der Mine (Weg 1):**
    - Fließender Übergang der Schneegrenze ab halber Wegstrecke von Weg 1 hinauf zum Bergplateau (+6,8 m).
    - Schneebedeckte Nadelbaumkronen (`createSnowyPineFoliageTexture`) und frostbereifte Stämme als performante InstancedMeshes.
    - Atmosphärischer, taumelnder Schneefall (Partikelsystem mit 550 Schneeflocken), der bereits beim Aufstieg auf Weg 1 einsetzt.
  - **Basaltkessel & monumentaler 240°-Felsenkranz:** Der Lavasee liegt in einem tiefen Kessel auf `-5.0 m`. Die spitzen, bis zu 24 m hohen Felsennadeln mit rot leuchtenden Magma-Adern umschließen den Lavasee zu zwei Dritteln (240-Grad-Bogen), sodass nur der Wegzugang im Norden frei bleibt.
  - **UI-Ergonomie:** Das Live-Performance-Badge wurde nach links oben unter den Titel verlegt, sodass Kommunikations-, Dialog- und Quest-Fenster auf der rechten Bildschirmseite frei und unbedeckt bleiben.
  - **Strikte Trennung von Spiellogik und 3D-Welt:** Die Spiellogik (`CrossroadsState`, Kollisionen, Quests, Dialoge) verbleibt rein zweidimensional (`x, z`) und ohne Three.js-Abhängigkeiten unit-getestet. Die Geländehöhe wird deterministisch und performant über das mathematische Höhenfeld `getTerrainHeight(x, z)` (`src/game/utils/terrainHeight.ts`) ermittelt; Raycasting auf das Terrain erkennt Pfade analytisch über `getPathAtPosition(x, z)`.
  - **Schauplatz-Plateaus (`TERRAIN_PLATEAUS`):** Die Kreuzung liegt bei `y = 0.0 m`. Schauplatz-Plateaus garantieren einen stabilen Stand: Silberstollen-Bergmassiv (`+6.8 m` mit aufsteigendem Gebirgskamm dahinter), Waldteich mit Nixe (`-1.2 m`), Bachtal mit Wehrbrücke (`-1.5 m`), Waldhochebene am Holzfällerlager (`+0.8 m`), Teufelskrater / Höllenschlund (`-5.0 m`), Waldhang an der Jagdhütte (`+1.0 m`) und Hügelkuppe am verschlossenen Tor (`+2.2 m`).
  - **Prozedurale Ambient-Hintergrundmusik & Audio-Engine (`SoundService.ts`):**
    - Vollständig prozedurale Web Audio API-Klangerzeugung ohne externe MP3-Assets oder Download-Ladezeiten.
    - Seidenweiche, warme D-Dur/G-Dur/H-Moll/A-Dur-Schwebepads mit Tiefpassfilter (540 Hz) und sanft eingestreuten Waldharfen-Tönen im Stereofeld.
    - Sehr leise und unaufdringlich eingepegelt (Mastergain ~0,045), mit automatischem sanftem Ducking (~0,020) während aktiver NPC-Dialoge.
    - Direkt stummschaltbar über Taste `M` oder Klick auf das HUD-Musik-Badge (`🎵 / 🔇`).

## Offene Punkte

- Hosting, Build-Basis-Pfad und Einbindung in die Website prüfen.
- Leistungsziel für mobile Geräte festlegen.
- Format und Umfang der Spielstände entscheiden.
