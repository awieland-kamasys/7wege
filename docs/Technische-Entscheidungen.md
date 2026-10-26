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
- **Vegetations- & Deko-Verschmelzung (Waldblumen, Pilze, Nistkästen, Uferbüsche, Felsen & Steine):** Vorher erzeugten florale Elemente Tausende individuelle Meshes und trieben die Draw Calls in die Höhe. Durch Material-basiertes Zusammenführen (`buildMergedFlowerClusters`, `buildMergedMushroomClusters`, `buildMergedBirdhouses`, `buildMergedForestBushes`, `buildMergedForestRocks`) sinkt die Mesh-Zahl dieser Elemente auf minimale Merged Meshes (nur 3-4 Draw Calls für alle Büsche am Nixenteich sowie 4 Draw Calls für alle Findlinge, Felsformationen und Kieselbetten auf den Grünflächen der gesamten Spielwelt).
- **Live-Performance-Overlay (Taste P):** Im HUD zeigt ein dezentes Badge live Bildrate und Draw Calls an. Per Klick oder Taste `P` öffnet sich ein Diagnosedialog mit Live-Werten aus `renderer.info`.
- **Schauplatz-basiertes Lazy Loading & Asset-Streaming (85 % Start-Download-Reduktion):**
  - Vorher wurden alle 29 GLTF-Modelle beim ersten Seitenaufruf parallel heruntergeladen (über 106 MB).
  - Jetzt werden beim Spielstart ausschließlich die unmittelbar sichtbaren Start-Assets an der Waldkreuzung und auf Weg 7 geladen (Schutzhütte `3wege_huette.glb`, Waldhüter Arvid, Lupo, Schatztruhe, Pilzwesen $\rightarrow$ ca. 16 MB statt 106 MB, eine Reduktion um ca. 85 %).
  - Alle 7 Pfad-Schauplätze (`MountainCave`, `NixiePond`, `WeirBridgeScene`, `LumberjackCamp`, `HellChasm`, `HuntingLodge`, `ClosedGate`, Weltenbäume sowie die Wegsperren) stellen sofort funktionsfähige Low-Poly-Fallback-Geometrien mit Kollisionen und Schatten bereit.
  - Das Nachladen der schweren GLB-Dateien erfolgt on-demand:
    - **Proximity-Streaming:** Nähert sich die Spielfigur einem Schauplatz (ab 45–52 m bzw. 25 m bei Wegsperren), wird das Modell im dichten Waldnebel geladen, lange bevor der Schauplatz für den Spieler sichtbar wird.
    - **On-Demand-Auswahl:** Wählt der Spieler einen Pfad per Dialog, Klick oder HUD-Auswahl, wird der Schauplatz sofort priorisiert geladen.
    - **Sanfter Idle-Hintergrund-Lader:** Verweilt der Spieler an der Kreuzung, lädt eine Hintergrund-Warteschlange alle 2,5 Sekunden sequenziell einen weiteren Pfad nach, ohne jemals Framerate oder Netzwerkbandbreite zu blockieren.
- **Modernes Dialogsystem („Thumb Zone“ & Card-/Chip-Design):**
  - **Minimalistischer Screen Space:** Keine veralteten Kästen oder Schmuckrahmen mehr. Schwebende Untertitel mit 60–80 % Transparenz (`rgba(12, 18, 14, 0.72)`, Backdrop-Blur) und ausgeprägtem Textschatten für gestochen scharfe Lesbarkeit auf jedem Untergrund (alpine Schneezone, glühende Lava oder Waldwiese).
  - **Ergonomische Thumb Zone im unteren Bilddrittel:** Alle interaktiven Antwort-Buttons liegen zwingend im unteren Bereich, der bequem mit den Daumen (auch einhändig auf Touchscreens) erreichbar ist. Der NPC-Sprechtext schwebt unmittelbar darüber.
  - **Card- & Chip-Design:** Antworten werden als großzügige Touch-Karten mit mindestens 48 dp Trefferfläche (`min-height: 48px`), runden Ziffernbadges und sanftem Glassmorphism gerendert.
  - **Modulierte Sprachausgabe (`SpeechService`):** Unterstützung individueller Stimmprofile per Web Speech API; für Lupo wird eine quirlige, schnelle (`rate = 1.28`) und hohe (`pitch = 1.45`) Sprechstimme generiert.
- **Einstiegspunkt & Atmosphäre auf Weg 7:**
  - **Neuer Spieler-Startpunkt:** Die Spielfigur startet auf Weg 7 bei `(-31.5, -29.1)` (ca. 42,9 m von der Kreuzung entfernt) mit Blickrichtung entlang des Pfades zur Kreuzung.
  - **Standort Fabelwesen Lupo:** Lupo rückt 15 m mit zurück auf `(-21.7, -19.1)` (ca. 28,9 m von der Kreuzung entfernt; Distanz zum Spieler unverändert 14 m).
  - **Nebel-Verhüllung der Kreuzung:** Da die Nebelgrenze bei `fog.far = 25.0 m` liegt, ist die zentrale Waldkreuzung von Lupos Standort (28,9 m) und vom Spieler-Startpunkt (42,9 m) aus vollständig und blickdicht im dichten Waldnebel verborgen. Nur Lupos leuchtender Kristall schimmert einladend durch den Morgendunst.
  - **Ruckelfreie Skelett-Laufanimation (In-Place Loop):** Die GLTF-Animation `run` des Tripo-Modells besaß ca. 0,77 m Vorwärtsdrift auf dem `Hip`-Bone, was beim Wiederholen des Loops alle 1,25 s zu einem sichtbaren Zurückspringen führte. Durch automatisierte In-Place-Neutralisierung (Subtraktion des linearen Drift-Trends auf den Keyframes) stimmen Start- und Endpose mathematisch exakt überein. Die Laufanimation loopt absolut nahtlos ohne jeden Ruckler, bis Lupo nach sanfter Drehung und Überquerung des Pfades im dichten Wald weich ausblendet.
- **Asset-Bereinigung & Trennung:** Das Auslieferungsverzeichnis `public/assets/models/` wurde um ungenutzte Modelle bereinigt (u. a. Gärtnerei `garden beds 3d model.glb`, -2,73 MB). Alle nicht mehr im Spiel verwendeten Dateien liegen archiviert in `backup_assets/models/`.
- **Textur- und Modelloptimierung (1024x1024 & WebP):**
  - Alle 28 aktiven GLB-Modelle sind automatisiert über `@gltf-transform` optimiert:
    - Texturauflösungen auf maximal `1024×1024` gedeckelt (Lanczos3-Filter).
    - Texturen verlustarm nach **WebP** komprimiert (Quality 85 via Sharp). Three.js unterstützt die glTF-Erweiterung `EXT_texture_webp` standardmäßig nativ im `GLTFLoader`.
    - Geometrie- und Accessor-Deduplizierung (`dedup`) sowie Bereinigung toter Properties (`prune`).
  - **High-Res-Sicherheitsnetz & punktuelle Wiederherstellung:**
    - Sämtliche unkomprimierten Original-Modelle liegen 1:1 in `backup_assets/models_original_highres/`.
    - Bei Bedarf kann jedes einzelne Modell punktuell mit `npm run restore:model -- "<Name>"` oder durch simples Zurückkopieren sofort wieder in High-Res aktiv geschaltet werden.
    - Automatisierte Pipeline über `npm run optimize:models`.
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
    - **Lautstärkeregler (Start bei 50 %):** Der Schieberegler im oberen HUD startet standardmäßig bei 50 % (entspricht der vollen bisherigen Basislautstärke `0.14`), sodass die Musik nun sowohl leiser (bis 0 %, stumm) als auch deutlich lauter (bis 100 % = `0.28`, doppelt so laut) geregelt werden kann. Automatisiertes Ducking (`0.11` bei 50 % $\rightarrow 0.055$) dämpft die Musik sanft während NPC-Gesprächen.
    - **Ortsbasierter Musikwechsel auf Wegmitte:** Die Schauplätze liegen ca. 45–55 m von der Kreuzung $(0,0)$ entfernt. Der Übergangskorridor ist auf `CROSSROADS_RADIUS = 14 m` bis `LOCATION_FULL_RADIUS = 28 m` kalibriert, sodass der exakte 50/50-Crossfade-Punkt genau auf der Wegmitte bei ca. 21 m liegt.
    - **Equal-Power-Crossfade mit garantiertem Null-Cutoff:** Sobald die Wegmitte überschritten wird ($d \ge 21\text{--}24\,\text{m}$ bzw. Blend $\ge 75\,\%$) wird der Waldkreuzungs-Bus vollständig auf `0.00001` stummgeschaltet und die Tongenerierung für die Kreuzung pausiert. An den Schauplätzen ist die Waldkreuzungsmusik absolut unhörbar.
    - **7 eigenständige Musikstücke für alle Schauplätze (`LOCATION_TRACKS`):**
      - **Kreuzung:** *„Lichtung im Morgendunst“* – D-Duradd9/G-Durmaj7 Schwebepads, Waldharfe & Vogelgezwitscher.
      - **Weg 1 (Silberstollen):** *„Eiskristall und Bergesraunen“* – Alpine D-Moll9-Pads, eisige Zinkenklänge & schimmernde Kristallglocken.
      - **Weg 2 (Feenteich):** *„Silberglanz der Wasserrose“* – Hohe, kristalline Wasserpads (A-Moll add9, F-Dur maj7#11), perlendes Celesta- & Glockenspiel-Leitmotiv der Nixe und Wassertropfen.
      - **Weg 3 (Wehrbrücke):** *„Die Ballade des Wehrmeisters“* – C-Dur maj9 Flussbettpads, getragenes Holzhorn-Motiv des Riesen und tosendes Quellenrauschen.
      - **Weg 4 (Holzfällerlager):** *„Harzfeuer und Waldgesang“* – G-Dur 6/9 Waldläufer-Harmonien, fröhliche Okarina/Holzflöte im 3/4-Schwung & warme Marimba-Akzente.
      - **Weg 5 (Lavakrater):** *„Der Höllenschlund erwacht“* – Sub-Bass-Drones (55–110 Hz), grollendes Dämonen-Horn & knisternde Magmafunken.
      - **Weg 6 (Jagdhütte / Burg):** *„Jagdfanfare & Mondwurz-Lied“* – D-Dorische Ritter-Harmonien, stolze Jagdhorn-Fanfare & sanfte Laute im Kräutergarten.
      - **Weg 7 (Schlosstor):** *„Das Siebente Siegel“* – C-Moll maj7 Choral-Pads, sakrales Runen-Motiv & tiefe, feierliche Turmglockenschläge.
- **Mobile Resilienz, WebGL Context Loss & Debugmodus (`DebugPanel.ts`, `TerrainMaterial.ts`, `TerrainSplatMap.ts`):**
  - **Android S10 Minenberg-Texturbereinigung:** Auf dem Galaxy S10 (ARM Mali-G76) führte das 5. Textursampling (`uSnowMap`) und der Blaukanal der Splatmap zu Mipmap-Artefakten (blaue Fernansicht und grüner Naheindruck am Minenberg). Durch die Entfernung der redundanten uSnowMap aus dem Terrain-Shader und Bereinigung des Blaukanals in `TerrainSplatMap.ts` wurde die Sampler-Zahl reduziert, Mipmap-Fehler behoben und ein nahtloser Wiesen-/Pfadübergang am Minenberg geschaffen (der Berg selbst besitzt eigene Felsgeometrien).
  - **Nebelwand als Sperre im Rücken & Torverdeckung (`Path7GateBlock.ts`, `CrossroadsState.ts`, `CrossroadsScene.ts`):** Spielerstart (`x: -26.0, z: -23.4`, Distanz 35 m) und Lupo (`x: -16.5, z: -14.1`, Distanz 21.7 m) wurden ca. 7–8 Meter weiter in Richtung Kreuzung gesetzt, sodass der Abstand zwischen beiden (ca. 13.3 m) perfekt erhalten bleibt. Die 18 Meter breite Nebelwand steht nun bei `x: -31.5, z: -29.1` (ca. 8 m im Rücken des Spielers und fast 14 m vor dem Torvorplatz {-40.5, -38.5}) mitten im schmalen, beidseitig dicht bewaldeten Wegkorridor. Die physische Kollisionsbarriere (`halfWidth = 4.5 m`, `halfDepth = 2.0 m`, `unidirectional = true`) ist dreimal so breit wie der 3.1 Meter breite Waldpfad und blockiert jeden Durchgang sowie jegliches Vorbeilaufen zuverlässig zurück auf die Kreuzungsseite. Durch `side: THREE.FrontSide` und Kamera-Clamping (`clampCameraAgainstGateBlock`) bleibt die Spielfigur bei Spielstart stets glasklar im Blickfeld der Verfolgerkamera. Steintor und Torpilz bleiben bis zum Arvid-Gespräch unsichtbar (`visible = false`). Erst nach dem Dialog löst sich die Nebelwand auf und gibt den weiteren Weg 7 frei.
  - **Questabhängige Schatztruhe (`InventorySystem.ts`, `QuestSystem.ts`):** Die Truhe an der Hütte ist zu Spielbeginn leer und füllt sich erst mit Abschluss der ersten Wegequest (Weg 1–6). Der spezifische moralische Ausgang der Wegequest bestimmt das Item und seine Eigenschaften.
  - **Obsidian-Canvas für alle Gesprächspartner (`docs/Canvas/`):** Im Obsidian-Vault wurde der neue Ordner `Canvas/` angelegt, der für alle 10 Gesprächspartner (Arvid, Lupo, Graumännchen, Nixe, Riese, Holzweibchen, Teufel, Wilder Jäger, Torpilz, Steintor) vollständige visuelle Dialogbäume als `.canvas`-Dateien bereitstellt.
  - **Android S10 Farbbug-Behebung:** In WebGL 2 / OpenGL ES muss `#version 300 es` die allererste Zeile eines Shaders sein. Durch das korrekte Einfügen der Splatmap-Uniform-Deklarationen hinter `#include <common>` statt vor den Shader-Kopf kompilieren die Shader auf ARM Mali GPUs (Galaxy S10) fehlerfrei.
  - **iOS Safari Crash-Prävention (iPhone 16 Pro Max):** WebGL-Context-Lost- und Context-Restored-Listener auf dem Canvas verhindern unkontrollierte Web-Prozess-Abstürze bei Speicher- oder Füllratenspitzen. Der Render-Loop fängt Ausnahmen sauber per `try/catch` ab.
  - **Vollwertiger Mobile-Debugmodus:** Direkt aktivierbar über das Badge `🪲 Debug` (oben rechts), die Taste `D` oder URL-Parameter `?debug=1`. Bietet Hardware-Inspektion (GPU-Renderer, WebGL-Limits, DPR, VRAM), Fehler- und Warnungskonsole mit Ein-Klick-Zwischenablagekopie sowie Sofort-Schalter zur Fehlerisolation (Schatten an/aus, PBR-Shader vs. einfache Wiese, DPR-Deckelung).

- **Freies Erkunden & dynamische Wegbegrenzung (`CrossroadsState.ts`, `Signpost.ts`):**
  - Standardmäßig ist die Spielerbewegung auf die befestigten Pfade und die zentrale Kreuzungslichtung beschränkt (`projectOntoWalkableSurface`, `isPointOnClearingOrPath`).
  - Durch Klick auf den runden Steinsockel des zentralen Wegweisers (`signpost_base`) oder über den Schalter im Debug-Panel (`Taste D`) kann die Wegbegrenzung dynamisch aufgehoben und wieder aktiviert werden.
  - Bei aufgehobener Wegbegrenzung (`pathBoundaryDisabled = true`) kann die Spielfigur das gesamte 240 m × 240 m große Terrain frei durchwandern (inklusive direkter Zielnavigation im Auto-Walk).
  - Alle echten Hinderniskollisionen (Bäume, Felsmassive, Gebäude, NPCs, Kraterwände, Zäune) bleiben über `resolveObstacleCollisions` und `isCollidingWithObstacles` zu 100 % aktiv und unüberwindbar.
  - Visuelles und haptisches Feedback: Der Sockel des Wegweisers pulsiert bei aktivem Freimodus in zartem Smaragdgrün (`0x10b981`), löst beim Umschalten einen Lichtimpuls aus und gibt eine Rückmeldung über Soundeffekt und HUD-Toast.

## Offene Punkte

- Hosting, Build-Basis-Pfad und Einbindung in die Website prüfen.
- Leistungsziel für mobile Geräte festlegen.
- Format und Umfang der Spielstände entscheiden.
