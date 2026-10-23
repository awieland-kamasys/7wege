# Spielkonzept

Status: offen

## Kurzpitch

Eine spielende Person kommt an eine Waldkreuzung mit sieben Wegen und entscheidet, welchem Weg sie folgt.

## Ausgangspunkt

- Das Spiel beginnt auf einer Kreuzung im Wald, an der sieben Waldwege zusammentreffen.
- In der Mitte der Kreuzung steht eine Schutzhütte aus Baumstämmen; davor stehen eine **Schatztruhe (mit zu öffnendem Deckel)**, rechts davor der Wegweiser mit sieben Schildern und links direkt an der Hütte **Waldhüter Arvid** als Hinweisgeber-NPC.
- Über ein **Kommunikationssystem (Dialog-UI mit Browser-Sprachausgabe)** kann die spielende Person mit NPCs sprechen. **Grundsatz:** Standarddialoge werden nur einmal angezeigt und nach Auswahl einer Antwort ist kein erneuter Aufruf des gleichen Dialoges mehr möglich. Standarddialog 1 mit Waldhüter Arvid begrüßt die Person mit „Ach du Scheiße, was willst du denn hier?“ mit drei Antwortoptionen (1. „Ich will ins Zinsbachtal.“, 2. „Ein Bier.“, 3. „Geht dich gar nichts an, Penner!“).
- Die spielende Person kann sich ausschließlich auf der befestigten Waldkreuzung und den sieben Wegen bewegen (Grünflächen und Wald sind nicht begehbar; Schutzhütte, Schatztruhe, Wegweiser und NPC besitzen feste Kollisionen).
- Dichter weiß-hellgrauer Waldnebel begrenzt die Sichtweite, sodass das Ende der Wege von der Kreuzung aus nicht sichtbar ist.
- Ziele, Themen und Besonderheiten der sieben Wege sind noch offen.

## Zielgruppe

- Wer soll spielen?
- Wie lange dauert eine typische Runde?

## Spielerziel und Kernschleife

1. Was tut die spielende Person?
2. Welche Entscheidung oder Herausforderung folgt?
3. Woran erkennt sie Fortschritt oder Erfolg?

## Die sieben Wege

## Spielstart & Startpunkt

- **Initialer Einstieg:** Ein neues Spiel beginnt immer exakt auf **Weg 7 (Torweg)** in **halber Strecke** (ca. 27,9 m von der Kreuzung entfernt bei `x: -21.0, z: -18.4`).
- **Perspektive & Blickrichtung:** Die Spielfigur und die Verfolgerkamera blicken entlang des Weges nach vorn in Richtung der geheimnisvollen 7-Wegekreuzung.
- **Fabelwesen Lupo (Torweg-NPC):** Auf halbem Weg zwischen Startpunkt und Kreuzung (`x: -10.5, z: -9.2`) begegnet der Spieler dem Waldhüterling Lupo (`fantasy+creature+3d+model.glb`). Beim Anklicken oder Ansprechen beginnt Lupo neugierig zu hoppeln (`Häschenhoppeln` / "hobbing"). Nach Abschluss des Gesprächs wechselt Lupo in den Laufmodus (`run` / "laufen"), huscht flink quer über den Weg in den dichten Fichtenwald und verschwindet im Nebel.
- **HUD links unten:** Am unteren linken Bildschirmrand wird dauerhaft die aktuelle Wegbezeichnung (`🧭 7. Torweg`) sowie der Schnellreise-Link `↩ Zur 7-Wegekreuzung` angezeigt.

## Die Sieben Waldwege & Sperren-System

Alle temporären Wegsperren der Pfade 1 bis 6 sind auf **exakt die gleiche Distanz zur Kreuzung wie das Feuer auf Weg 5 (~16,3 m)** gesetzt und verfügen über ein lückenloses Kollisionssystem, das Durchlaufen oder Hindurchglitschen vor dem Lösen der Sperre unmöglich macht. Das Beseitigen der Sperren erfolgt ausschließlich durch Anklicken des jeweiligen rotierenden Edelsteins am Pfadanfang; es gibt keine störenden Inspektions- oder Hinweiscontainer vor den Hindernissen.

1. **1. Silberstollen-Pfad (Norden → Kurve nach Nordosten):**
   - Verlängerter Bergpfad mit langgezogener Rechtskurve durch den Waldnebel.
   - **Magische Felsblockade & Edelstein-Mechanik:** Zu Spielbeginn ist Weg 1 in 16,3 m Entfernung von der Kreuzung (`x: 0.2, z: -16.3`) durch einen gewaltigen, bemoosten Felsbrocken mit grünlich glimmenden Kristalladern und unüberwindbarer Barriere-Kollision blockiert. Ein Klick auf den rotierenden grünen Edelstein am Pfadanfang löst eine magische Resonanz aus, lässt den Edelstein aufblitzen, spielt ein tiefes Erd-Grollen mit kristallinem Klang ab und lässt den Felsbrocken zerfallen und im Erdboden versinken.
   - Endet auf einem Felsvorplatz vor dem historischen Minenstollen (snowy mine tunnel), der von einem gewaltigen, schneebedeckten Felsmassiv im Hintergrund (bis zu 26 m hoch mit Hauptgipfel, schroffen Felsgraten, Felsflanken und Schneehauben) monumental umschlossen wird; Bergmassiv, Stollenportal und Felsflanken besitzen feste Kollision.
   - Vor dem Stolleneingang wartet **das Graumännchen** als NPC.
   - **Inhalt & Konflikt:** Eine neue Silberader könnte Mine und Arbeiter retten. Ihr Auffinden verlangt Licht in einem Stollen, für den ein altes Verbot beziehungsweise Versprechen gilt.
2. **2. Nixenteich-Pfad (Nordosten → Bogen nach Osten):**
   - Geschwungener Waldpfad durch den Nebel, der direkt und ohne störenden runden Vorplatz an das Ufer des stillen **Waldteichs mit Ufersteinen, Seerosen und Schilf** führt; das Teichmodell ist um 45° im Uhrzeigersinn gedreht, in doppelter Höhe dargestellt und das tiefe Wasserbecken besitzt feste Uferkollision. Die umgebenden Waldbäume rücken nah an das Nord-, Ost- und Südufer heran und spiegeln sich im Wasser.
   - **Magische Wasserpfützen-Blockade & Edelstein-Mechanik:** Zu Spielbeginn ist Weg 2 in 16,3 m Entfernung von der Kreuzung (`x: 13.2, z: -9.6`) durch eine tiefe, türkisfarben schimmernde Wasserpfütze mit magischem Wellenschlag und Barriere-Kollision versperrt. Ein Klick auf den rotierenden türkisfarbenen Edelstein (Aquamarin) am Pfadanfang lässt den Kristall aufleuchten, spielt gluckerndes Wasserversickern und Kristallglanz ab und lässt die Pfütze im Waldboden versickern.
   - Auf einem **Stein im Teich** sitzt **die Nixe vom Spiegelteich** als NPC (auf verdoppelter Sitzhöhe $y \approx 1{,}18\text{ m}$); unter der Wasseroberfläche funkelt ein Goldhort. Das Gespräch mit der Nixe lässt sich bequem vom befestigten Ufer aus führen.
   - **Inhalt & Konflikt:** Ein verlockender Schatz im Teich ist mit einem Fluch beziehungsweise drohendem Unglück verbunden.
3. **3. Quellenweg (Osten → Bogen nach Südosten):**
   - Waldpfad über die **Holzbrücke** (3D-Modell `wooden bridge 3d model.glb`), unter der ein **freier Gebirgsbach** hindurchfließt. Die Brücke selbst ist vollkommen frei begehbar, während die seitlichen Geländer und das Quellbecken feste Kollision besitzen. Der Gebirgsbach wird links der Brücke um **weitere 20 Meter ins Tal** geführt (über 31 Meter Gesamtlänge mit beidseitigem Kiesel- und Felsenufer) und ist als sanft eingeschnittenes Bachtal passgenau im 3D-Gelände modelliert.
   - **Magische Bachlauf-Blockade & Edelstein-Mechanik:** Zu Spielbeginn ist Weg 3 in 16,3 m Entfernung von der Kreuzung (`x: 15.8, z: 4.1`) durch einen tosenden, quer über den Weg strömenden Gebirgsbach mit Kiesbett, schäumenden Gischtkronen (Wasseroberfläche stabil auf $y = 0.088$, erhaben über dem Weg bei $y = 0.055$) und Barriere-Kollision blockiert. Ein Klick auf den rotierenden kornblumenblauen Edelstein (Saphir) am Pfadanfang entfesselt die Quellmagie, spielt einen reinen Saphir-Akkord mit beruhigendem Wasserrauschen ab und lässt den Bachlauf im Waldboden versickern.
   - Das alte künstliche Wehr wurde vollständig entfernt; das Wasser der Bergquelle fließt ungehindert ins Tal.
   - Am Ufer hinter der Brücke bewacht **der Riese an der Quelle** die Bergquelle und seine urige Heimat.
   - **Inhalt & Konflikt:** Eine Quelle versorgt ein Tal. Ihre Freigabe könnte eine Dürre lindern, zerstört jedoch die Heimat des Riesen.
   - **Der uralte Weltenbaum (Ost-Wald zwischen Nixe und Riese):** In der goldenen Mitte zwischen dem Reich der Nixe (Weg 2) und des Riesen (Weg 3) bei `x: 44.0, z: 2.5` ragt der gewaltige Weltenbaum (`fantasy tree 3d model.glb`, ~23 Meter Höhe, Kronenbreite ~26 Meter) mit sanft schwebender Waldlicht-Aura über das Kronendach empor. Er besitzt eine feste Stammkollision und kann als Landmarke aus weiter Ferne bewundert werden.
   - **Der zweite riesige Weltenbaum (Hinter dem Riesen):** Im Waldsaum ca. 10 Meter hinter dem Riesen bei `x: 53.5, z: 20.3` ragt ein zweiter riesiger Weltenbaum (`fantasy tree 3d model.glb`, ~23 Meter Höhe) empor. Der gesamte Bereich hinter dem Riesen und rund um den Weltenbaum wurde von Nadelbäumen befreit, sodass der Riesenbaum als freistehende, majestätische Kulisse zur Geltung kommt. Er steht auf einem passgenauen, ebenen Plateau auf Bodenhöhe $-1{,}50\text{ m}$ mit tiefer Wurzelverankerung (`sinkDepth: 1.65 m`), moosigem Wurzelhügel ohne Schwebelücken sowie solider Stammkollision.
   - **Der stilisierte Höhlenbaum im Riesenteich:** Weiter nach rechts gerückt bei `x: 28.8, z: 30.5` ragt der stilisierte Höhlenbaum (`stylized tree 3d model.glb`, gleiche Skalierung 26, ca. 21 Meter Höhe, um 30° im Uhrzeigersinn gedreht) empor. Dadurch liegt die Brücke vollkommen frei und zwischen Brücke und Baum breitet sich über 10 Meter freies, spiegelndes Seewasser aus. Seine gewaltige Wurzelhöhle spannt sich mit über 4,5 Metern lichter Höhe über das Wasser, sodass das klare Quellwasser und der Bergsee direkt durch den Bogen der Wurzelhöhle hindurchfließen. Der Baum steht ohne störenden Erdhügel fest im Seebett verankert.
4. **4. Holzfäller-Pfad (Süd-Südost → Bogen nach Südosten):**
   - Geschwungener Waldpfad durch den Nebel bis auf eine **gerodete Waldlichtung mit einem Holzfällerlager**. Alle Aufbauten (Brennholz-Unterstand, Stammpolter & Sägebock, Hackklotz mit Axt, Wärmefeuerstelle und der mächtige Urwaldstumpf) besitzen feste Kollision.
   - **Magische Baumstamm-Blockade & Edelstein-Mechanik:** Zu Spielbeginn ist Weg 4 in 16,3 m Entfernung von der Kreuzung (`x: 7.1, z: 14.7`) durch einen mächtigen, quer über den gesamten Weg liegenden bemoosten Eichenstamm mit leuchtenden bernsteinfarbenen Runen und Barriere-Kollision versperrt. Ein Klick auf den rotierenden Bernsteinkristall am Pfadanfang bricht den Bann, spielt ein kräftiges Holzknacken und Splittern ab und lässt den Stamm in Funken zerfallen.
   - Im Lager neben einem bemoosten Urwaldstumpf wartet **das Holzweibchen** als NPC.
   - **Inhalt & Konflikt:** Brennholz rettet Dorfbewohner vor Kälte; zu starke Fällungen gefährden den Wald und seine Umgebung.
5. **5. Höllenschlund-Pfad (Süd-Südwest → Bogen durch Felsspalten nach Süden):**
   - Geschwungener Pfad durch zerklüftete Felsen und verbrannte Nadelbäume, der direkt und ohne runden Vorplatz an den Kraterrand des feurigen Höllenschlundes führt. Der Krater besitzt lückenlose Kollision, sodass die Spielfigur nicht in die glühende Lava laufen kann.
   - **Feuerroter Pfad & Glühende Wiesenlandschaft:** Der Weg selbst leuchtet in sattem Feuerrot mit glimmenden Magma-Adern (ansteigend von Glut-Terrakotta an der Kreuzung bis zu loderndem Höllenrot am Kraterrand). Die umliegende Wiese und der Boden im weiten Umkreis des Lavasees glühen feuerrot mit sichtbaren Magma-Adern und pulsierender Glut im Rhythmus des Höllenfeuers.
   - **Magische Flammenwand-Blockade & Edelstein-Mechanik:** Zu Spielbeginn ist Weg 5 in 16,3 m Entfernung von der Kreuzung (`x: -7.5, z: 14.5`) zwischen den ersten Felsspalten durch eine lodernde Flammenwand mit sengender Glut, aufsteigenden Funken und Barriere-Kollision versperrt. Ein Klick auf den rotierenden roten Rubin am Pfadanfang bannt das Höllenfeuer, spielt ein zischendes Verlöschen mit aufsteigenden Rauchwolken ab und räumt den Weg frei.
   - Am Ende des Weges öffnet sich ein gewaltiger **Höllenschlund (3D-Lavakrater aus zerklüftetem Basalt und brodelnder Lava, um 45° im Uhrzeigersinn gedreht)**.
   - Hinter dem Lavateich ragt eine monumentale, spitze, dunkle Felsenkulisse aus schroffen Basalt- und Obsidiannadeln (bis zu 23 m Höhe) empor, durchzogen von leuchtenden, hellen roten Magmaadern und pulsierender Glut.
   - Inmitten des Höllenschlundes thront auf der zentralen Felsspitze **der Dämonenkrieger / Teufel** als monumentaler 3D-NPC (~5,2 m Höhe) mit lebendiger Mixamo-Rig-Animation (tiefe Atmung, lauernde Kopfbewegung, drohend angewinkelte Klauenarme), intensiv feurig glühenden, unheilschwanger flackernden Dämonenaugen mit eigenem Lichtschein und feurigem Interaktions-Kristall.
   - **Atmosphärische Verfinsterung:** Nähert sich die Spielfigur dem Höllenschlund, färbt sich der hellgraue Waldnebel stufenlos in eine bedrohlich-dunkle, aschig-rote Rauch- und Feuernacht ein.
   - **Inhalt & Konflikt:** _Noch keine Story hinterlegt (Platzhalter-Einstiegsdialog vorhanden)._
6. **6. Jägerpfad (Südwesten → Kurve durch weite Waldschneise):**
   - Weit geschwungener Waldpfad durch ein waldreiches Jagdrevier bis auf eine sonnige Waldlichtung vor einer wehrhaften **mittelalterlichen Burg (medieval castle mit Bergfried, Wehrtürmen und Zinnen)**, die von dichten Nadelbäumen (rechts, links und dahinter) umschlossen wird. Direkt vor der Burg breitet sich der umzäunte Kräutergarten aus. Alle Aufbauten (Kräutergarten-Zaun, Burg und Figuren) besitzen feste Kollision.
   - **Magische Kräuter- und Geländersperre & Edelstein-Mechanik:** Zu Spielbeginn ist Weg 6 in 16,3 m Entfernung von der Kreuzung (`x: -15.9, z: 3.8`) durch ein massives rustikales Holzgeländer (zur Kreuzung hin) mit drei Holzpfosten und dahinter dicht emporwuchernden, mannshohen Zauberkräutern mit leuchtend violetten Blütenkelchen und Barriere-Kollision versperrt. Ein Klick auf den rotierenden violetten Edelstein (Amethyst) am Pfadanfang lässt das Holz sanft weichen, spielt einen sphärischen Amethyst-Glockenton mit raschelndem Blätterrauschen ab und löst die Kräuterpflanzen im Lichtglanz auf.
   - Vor der Burg liegt ein liebevoll angelegter, umzäunter **Kräutergarten** mit Beeten (duftender Lavendel, Königs-Salbei, die seltene, sanft schimmernde Mondwurz, Thymian und Ringelblumen) sowie einem Wassertrog.
   - Am Gartenzaun steht **der Wilde Jäger (mit edlem Jagdpferd und aufmerksamem Jagdhund)** und diskutiert hitzig mit dem **Holzweibchen**.
   - **Inhalt & Konflikt:** Der Jäger verfolgt das Holzweibchen und wirft ihr den Diebstahl seltener Heilkräuter (Mondwurz & Königs-Salbei) aus seinem gehegten Kräutergarten vor. Das Holzweibchen entgegnet, sie habe die Wurzeln in höchster Not genommen, um einer im Brombeerdickicht schwer verletzten jungen Hirschkuh vor dem Erfrierungs- und Wundfiebertod das Leben zu retten. Beide Seiten erzählen ihre Sicht der Dinge und eröffnen eine Debatte über Revier- und Eigentumsordnung versus Lebensrettung in der Natur.
7. **7. Torweg (Nordwesten → Kurve durch uralten Nebelwald):**
   - Malerisch gewundener Waldpfad durch dichten, urwüchsigen Fichten- und Nebelwald bis auf einen runden, mit Backsteintextur gepflasterten Vorplatz vor einem mächtigen Gebirgsriegel.
   - **Flora & Waldwiesen:** Die Waldwiesen links und rechts des Pfades sind mit bunten Teppichen heimischer Waldblumen bewachsen (weiße Buschwindröschen, himmelblaue Wald-Vergissmeinnicht, violette Wald-Glockenblumen, sonnengelber Gold-Hahnenfuß und karminrosa Waldnelken).
   - **Nistkästen:** An jedem 10. Baum im Wald (und mit Blick zum Weg entlang Pfad 7) hängt ein hölzerner Meisen-Nistkasten mit Einflugloch, Schrägdach und Sitzstange am Stamm.
   - Am Ende des Weges riegelt ein **mächtiges, geschlossenes Tor mit flankierenden alten Quadersteinmauern (breite Mauerstruktur mit Zinnen)** das gesamte Tal ab.
   - **Feste Barriere & Kollisionssystem:** Das zweiflügelige Tor und die beidseitigen Bruchsteinmauern sperren die gesamte Talbreite als unüberwindbare Barriere ab. Die Kollisionserkennung verhindert jegliches Hindurchlaufen, sowohl bei Tastatur- als auch bei Maus-Bewegung.
   - Zwei massive Steinpfeiler mit Kapitellen, Kugelspitzen und schmiedeeisernen Wandlaternen fassen ein schweres, zweiflügeliges Eichenholztor mit feiner Holzmaserung und Eisenbeschlägen ein.
   - Ein dicker Eisen-Riegelbalken und verrostete Eisenketten mit einem riesigen, siegelförmigen Vorhängeschloss sichern das Tor; auf dem Torbogen leuchtet eine geheimnisvolle Runenglyphe.
   - **Inhalt & Interaktion:** Das Tor lässt sich nicht mit roher Kraft aufbrechen. Seine Untersuchung offenbart ein Schloss mit sieben kreisförmigen Vertiefungen, die den sieben Wegen der Kreuzung entsprechen. Eine alte Steinmetz-Inschrift mahnt: *„Nur wer die Pfade erkannte und das Maß wahrte, tritt ein.“* Erst wer die moralischen Prüfungen der anderen Pfade verstanden hat, wird den Weg hindurch finden.


## Charakter: Waldhüter Arvid (Hüter der Schutzhütte & Wächter der Sieben Wege)

- **Rolle & Bedeutung:**
  - Steht links vor der Schutzhütte an der zentralen Waldkreuzung als weiser Mentor, Wegweiser und ruhender Pol des Wanderlandes.
  - Hält die Laterne an der Zuflucht brennend und unterstützt Wandernde bei der Orientierung und der moralischen Einordnung ihrer Entscheidungen.
- **Erscheinung & Ausrüstung:**
  - Wohlbeleibter, stattlicher Waldmann von kräftiger Statur mit gütigem Blick, dichtem, tiefschwarzem Vollbart und markantem Schnurrbart.
  - Kleidung: Wetterfester tannengrüner Lodenmantel mit weitem Saum, moosbraunem Schulterkragen (Pelerine), breitem Ledergürtel mit Messingschnalle, festen Wanderstiefeln und einer ledernen Umhängetasche für Karten und Kräuter.
  - Waldhüterhut: Breite Krempe, Lederband und ein kleines grünes Eichenlaub-Abzeichen.
  - Wanderstab & Bergmessing-Laterne: Knorriger Eichenstab mit Lederwicklung und Eichelknauf; daran pendelt eine handgeschmiedete Messinglaterne, deren Herdfeuer-Flamme sanft flackert und selbst den dichtesten Nebel durchdringt.
- **Hintergrundgeschichte (Lore):**
  - Kam vor vielen Jahrzehnten selbst als rastloser Sucher an die Kreuzung und beschritt jeden der sieben Wege bis zu seinem Ende.
  - Als sein Vorgänger die Laterne niederlegte, erkannte Arvid seine wahre Berufung: Nicht das endlose Weiterwandern, sondern das Dasein und Schützen jener, die am Scheideweg zögern.
  - Kennt alle Wesen der Pfade persönlich (Graumännchen, Nixe, Riese, Holzweibchen, Wilder Jäger, Teufel) und schätzt deren Stärken wie deren Verwundbarkeiten.
- **Philosophie:**
  - *"Kein Pfad im Wanderland ist rein leicht oder gänzlich dunkel."*
  - Er drängt niemanden in eine Richtung, sondern fordert die Wandernden auf, beiden Seiten eines Streits Gehör zu schenken und dem eigenen Gewissen zu vertrauen.

## Steuerung und Geräte

- Tastatur/Maus:
  - Linksklick auf Kreuzung, Wege, Schilder, Wegweiser, Schutzhütte oder NPC = Hingehen / Sprechen / Auswählen (Click-to-Move mit Hindernisumgehung)
  - Linksklick auf die Spitze des Wegweisers = Zauber auslösen: Alle sechs aktiven Wegsperren lösen sich gleichzeitig mit strahlendem Lichtimpuls und feierlichem Glockenspiel-Arpeggio auf!
  - Gedrückte Maustaste ziehen = Kamera frei drehen und neigen (stufenlos vom waagerechten Blick nach vorn bis zu 90° Draufsicht)
  - Mausrad = Kamera-Zoom
  - WASD / Pfeiltasten = Gehen relativ zur Kamerablickrichtung, Q / E = Kamera drehen, R / F = Kamera neigen (Blick nach vorn / nach oben), Enter = Gespräch mit NPC starten, Tasten 1–7 = Weg bzw. Dialogantwort direkt wählen, Esc = Dialog schließen, Taste 0 / Backspace = Schneller Rücksprung zur 7-Wegekreuzung
  - HUD-Schnellreise: Das HUD zeigt dauerhaft links unten den aktuellen Standort bzw. Wegnamen sowie den Button „↩ Zur 7-Wegekreuzung“, über den per Mausklick oder Touch sofort zurück auf die zentrale Waldkreuzung gesprungen werden kann.
- Touch & Mobile: Volle Touch- und Gestenbedienung für Bewegung (Tap-to-Move), Kameraschwenk (Ein-Finger-Drag), Gestensteuerung zum Zoomen (Zwei-Finger-Pinch-to-Zoom stufenlos) und HUD-Rücksprung.
- Barrierearme Alternativen: DOM-Schaltflächen für alle sieben Wege, Dialogantworten und Schnellreise-Rücksprung zur Kreuzung.

## Stimmung und visuelle Richtung

- Referenzen: Märchenhafter, uriger Mittelgebirgs- und Zauberwald (Thüringer Wald / Schwarzwald).
- Farbwelt: Tannengrün, warmes Erdbraun, weicher hellgrauer Nebel, herbstliche Farbakzente.
- Wald-Flora & Details: Unter den Bäumen und an den Waldrändern sprießen idyllische Pilzgruppen auf kleinen Moospolstern (rote Fliegenpilze mit weißen Tupfen, kastanienbraune Steinpilze mit dickem Stiel und goldgelbe Pfifferlinge). Alle Baumstämme im Wald und entlang der Pfade besitzen eine detailreiche, organische Rindentextur und alle Baumkronen sind mit natürlicher Nadelbaum-Textur (feine Nadelbüschel, Schattierungen und Relief-Bump-Map) versehen. Die Baumstümpfe rund um das Holzfällercamp (Weg 4) tragen eine warme hellbraune Rindentextur, die harmonisch auf die Stämme und Scheite der Lagerfeuer-Szene abgestimmt ist. Die Sockel der 7 Edelsteine sowie das Fundament des zentralen Wegweisers tragen eine antike, plastisch reliefierte Bruchstein- und Schiefertextur. Der Stamm des Wegweisers und die Torflügel des Steintores sind mit edler Holzmaserung texturiert. Die Mauern und Pfeiler des Steintores weisen eine breite Großquader-Mauerstruktur auf und der runde Vorplatz davor ist mit warmem Klinker-/Backsteinpflaster gestaltet.
- Kamera/Perspektive: Dynamische Third-Person-Verfolgerkamera mit vollem Neigungsbereich von 0° (waagerechter Blick nach vorn in Augenhöhe) bis 90° (Vogelperspektive senkrecht von oben) und 360°-Orbit-Drehung.
- Audio:

## Erster spielbarer Prototyp

_Was ist die kleinste Version, die sich bereits wie ein Spiel anfühlt?_
