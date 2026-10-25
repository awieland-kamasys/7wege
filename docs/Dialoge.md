# Übersicht aller aktuellen NPC-Dialoge (7 Wege)

Dieses Dokument bietet einen vollständigen Überblick über alle aktiven Dialogbäume, Sprechtexte und Antwortoptionen im Spiel.
Die technische Quelle im Code liegt unter [`src/game/data/npcDialogues.ts`](../src/game/data/npcDialogues.ts).

> [!TIP] Diese Datei ist per Junction direkt in Obsidian unter `WANDERLAND_OBS/7WEGE/Dialoge.md` eingebunden.
> **Visuelle Graphen in Obsidian:** Du kannst die Dialoge direkt als interaktiven, visuellen Canvas öffnen und editieren:
> - [[Lupo.canvas]] – Der pointierte Kurz-Dialogbaum von Lupo (8 Knoten)
> - [[Arvid.canvas]] – Der vollständige Dialogbaum von Waldhüter Arvid (16 Knoten)

## Inhaltsverzeichnis

- [Waldhüter Arvid (Hüter der Schutzhütte & Wächter der Sieben Wege)](#waldh-ter-arvid)
- [Lupo (Hüterling auf dem Torweg)](#lupo)
- [Das Graumännchen (Hüter des alten Silberstollens)](#das-graum-nnchen)
- [Die Nixe vom Spiegelteich (Wächterin auf dem Stein im Teich)](#die-nixe-vom-spiegelteich)
- [Der Riese am Wehr (Wächter über Stausee und Quellwehr)](#der-riese-am-wehr)
- [Das Holzweibchen (Hüterin des Waldes im Holzfällerlager)](#das-holzweibchen)
- [Der Teufel (Herr des Höllenschlundes)](#der-teufel)
- [Der Wilde Jäger (Herr der Jagdhütte)](#der-wilde-j-ger)
- [Das geschlossene Tor (Uraltes Portal des Wanderlandes)](#das-geschlossene-tor)
- [Magischer Felsbrocken (Uraltes Hindernis auf dem Silberstollen-Pfad)](#magischer-felsbrocken)
- [Tiefe Wasserpfütze (Magische Barriere auf dem Nixenteich-Pfad)](#tiefe-wasserpf-tze)
- [Reißender Gebirgsbach (Tosende Wasserbarriere auf dem Quellenweg)](#rei-ender-gebirgsbach)
- [Uralter Baumstamm (Mächtiges Hindernis auf dem Holzfäller-Pfad)](#uralter-baumstamm)
- [Lodernde Flammenwand (Feurige Barriere auf dem Höllenschlund-Pfad)](#lodernde-flammenwand)
- [Verwunschenes Kräutergeländer (Zaubersperre auf dem Jägerpfad)](#verwunschenes-kr-utergel-nder)
- [Pilzling Morchel (Hüter der Felssporen auf Weg 1)](#pilzling-morchel)
- [Pilzling Pfiffer (Hüter der Feuchtsporen auf Weg 2)](#pilzling-pfiffer)
- [Pilzling Bovist (Hüter der Quellsporen auf Weg 3)](#pilzling-bovist)
- [Pilzling Trüffel (Hüter der Baumsporen auf Weg 4)](#pilzling-tr-ffel)
- [Pilzling Feuerkappe (Hüter der Glutsporen auf Weg 5)](#pilzling-feuerkappe)
- [Pilzling Kräuterhut (Hüter der Waldkräuter auf Weg 6)](#pilzling-kr-uterhut)
- [Pilzling Glimmling (Hüter der Tor-Aura auf Weg 7)](#pilzling-glimmling)

---

## Waldhüter Arvid
**Rolle / Ort:** Hüter der Schutzhütte & Wächter der Sieben Wege

### Knoten: `root`

> **Waldhüter Arvid:** „Ach du Scheiße, was willst du denn hier?“

**Antwort-Optionen (Ich):**
- **1.** „Ich will ins Zinsbachtal.“ `(Aktion: close)`
- **2.** „Ein Bier.“ `(Aktion: close)`
- **3.** „Geht dich gar nichts an, Penner!“ `(Aktion: close)`

### Knoten: `about_arvid`

> **Waldhüter Arvid:** „Einst zog ich selbst als ruheloser Sucher durchs Wanderland. Ich bin jeden dieser sieben Pfade bis zu seinem Ende gegangen – durch Nebel, Felsstürze und lockende Spiegelungen. Als mein Vorgänger, der alte Hüter, seine Laterne niederlegte, erkannte ich: Das Größte ist nicht das endlose Weiterlaufen, sondern das Da-Sein für jene, die an der Weggabelung zögern. So gelobte ich, diese Kreuzung zu hüten.“

**Antwort-Optionen (Ich):**
- **1.** „Welche Bewandtnis hat die Messinglaterne an deinem Wanderstab?“ `-> arvid_lantern`
- **2.** „Du kennst also alle Wesen an den Pfaden persönlich?“ `-> arvid_beings`
- **3.** „Welche Lehre zogst du aus all deinen Wanderungen?“ `-> arvid_philosophy`
- **4.** „Zurück zur Übersicht unserer Fragen.“ `-> root`
- **5.** „Danke für deine Geschichte, Arvid. (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `arvid_lantern`

> **Waldhüter Arvid:** „Diese Laterne wurde von den Bergleuten der alten Zechen aus Bergmessing geschmiedet und trägt ein Licht, das aus der stillen Herdglut der Schutzhütte stammt. Selbst wenn dichter weißer Waldnebel die Pfade verschluckt, dringt ihr warmer Bernsteinschein durchs Geäst. Sie erinnert jeden Wandernden daran: Es gibt immer einen sicheren Rückweg zur Zuflucht, ganz gleich, wie weit man sich hinausgewagt hat.“

**Antwort-Optionen (Ich):**
- **1.** „Erzähle mir mehr über deine eigene Wanderschaft.“ `-> about_arvid`
- **2.** „Welche Wesen hast du auf deinen Reisen getroffen?“ `-> arvid_beings`
- **3.** „Verstanden, zurück zum Anfang.“ `-> root`

### Knoten: `arvid_philosophy`

> **Waldhüter Arvid:** „Wisse dies: Kein Pfad im Wanderland ist rein leicht oder gänzlich dunkel. Ein Weg verlangt, dass du ein geheiligtes Verbot gegen blanke Menschennot abwägst; ein anderer lockt mit Reichtum, der eine Seele verfluchen kann; ein dritter fordert ein bitteres Opfer zwischen Durst im Tal und der Heimat eines Riesen. Wer nur den leichtesten Schritt sucht, strauchelt am tiefsten. Höre beiden Seiten zu, wenn Wesen streiten – und vertraue deinem eigenen Gewissen mehr als fremdem Drängen.“

**Antwort-Optionen (Ich):**
- **1.** „Zeige mir die sieben Wege, damit ich die Prüfungen abwägen kann.“ `-> paths_overview`
- **2.** „Welche Gesichter und Wesen erwarten mich?“ `-> arvid_beings`
- **3.** „Danke für diese weisen Worte. Zurück zur Übersicht.“ `-> root`

### Knoten: `arvid_beings`

> **Waldhüter Arvid:** „Im Norden hütet das treue Graumännchen den Silberstollen – ein ehrlicher Geist, doch gebunden an ein ehernes Versprechen. Im Nordosten sitzt die Nixe auf ihrem Stein im Spiegelteich; ihre Schönheit und ihr funkelndes Gold haben schon manchen ins Verderben gezogen. Im Südosten hadert der Riese am Wehr mit der Dürre des Tals, während im Süden das uralte Holzweibchen für den Atem des Forstes kämpft. Und am Jägerpfad pocht der Wilde Jäger stolz auf sein Revierrecht. Doch am 7. Weg im Nordwesten ragt das uralte, verschlossene Tor auf – stumm wartend auf jene, die alle Prüfungen verstanden haben.“

**Antwort-Optionen (Ich):**
- **1.** „Lass mich die Wege im Detail durchgehen.“ `-> paths_overview`
- **2.** „Mit welchem Wesen sollte ich das Gespräch beginnen?“ `-> recommendation`
- **3.** „Zurück zum Hauptgespräch.“ `-> root`
- **4.** „Was hat es mit jenem verschlossenen Tor auf sich?“ `-> arvid_gate`

### Knoten: `arvid_gate`

> **Waldhüter Arvid:** „Seit undenklichen Wintern steht jenes Tor am Nordwestrand des Wanderlandes im Fels verankert. Niemand vermag es mit roher Gewalt aufzubrechen. Es hütet die Schwelle zu dem, was hinter all unseren Pfaden liegt. Erst wer die Konflikte und Prüfungen an den anderen Wegen verstanden hat und sein Gewissen rein hält, wird das Geheimnis seines Siegels lüften können. Bis dahin bleibt es fest verriegelt – als stiller Mahner, dass manche Pforten erst dann aufgehen, wenn die Zeit und der Geist reif sind.“

**Antwort-Optionen (Ich):**
- **1.** „Ich möchte den gesamten 7. Weg bis zum geschlossenen Tor wandern.“ `(Aktion: walk_to_gate)`
- **2.** „Erzähle mir von den anderen Wegen.“ `-> paths_overview`
- **3.** „Danke für diesen weisen Rat, Arvid. Zurück zum Anfang.“ `-> root`

### Knoten: `about_crossroads`

> **Waldhüter Arvid:** „Alle sieben Pfade des Wanderlandes treffen an dieser Lichtung zusammen. Die Schutzhütte in der Mitte ist dein sicherer Ankerpunkt, und in der Schatztruhe davor ruht ein altes Licht-Artefakt für dunkle Wege.“

**Antwort-Optionen (Ich):**
- **1.** „Erzähl mir mehr über die einzelnen sieben Wege.“ `-> paths_overview`
- **2.** „Verstanden, zurück zu meiner vorigen Frage.“ `-> root`
- **3.** „Danke für die Erklärung! (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `recommendation`

> **Waldhüter Arvid:** „Folge zuerst dem 1. Silberstollen-Pfad nach Norden! Er biegt im Nebel nach Nordosten ab und führt direkt zu einem Berg mit Höhleneingang. Dort wartet das Graumännchen mit einer dringenden Angelegenheit um eine neue Silberader.“

**Antwort-Optionen (Ich):**
- **1.** „Erzähl mir genauer vom 1. Silberstollen-Pfad und dem Graumännchen.“ `-> path_1`
- **2.** „Direkt auf dem 1. Weg bis zum Berg und dem Graumännchen wandern“ `(Aktion: walk_to_grey_man)`
- **3.** „Lass mich aus allen sieben Wegen wählen.“ `-> paths_overview`
- **4.** „Danke, ich mache mich auf den Weg! (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `paths_overview`

> **Waldhüter Arvid:** „Jeder der sieben Wege trägt einen eigenen Charakter. Über welchen Pfad möchtest du einen Hinweis hören?“

**Antwort-Optionen (Ich):**
- **1.** „1. Silberstollen-Pfad (Norden)“ `-> path_1`
- **2.** „2. Nixenteich-Pfad (Nordost)“ `-> path_2`
- **3.** „3. Quellenweg (Südost)“ `-> path_3`
- **4.** „4. Holzfäller-Pfad (Südsüdost)“ `-> path_4`
- **5.** „5. Höllenschlund-Pfad (Südsüdwest)“ `-> path_5`
- **6.** „6. Jägerpfad (Südwest)“ `-> path_6`
- **7.** „7. Torweg (Nordwest)“ `-> path_7`
- **8.** „Zurück zum Hauptgespräch“ `-> root`

### Knoten: `path_1`

> **Waldhüter Arvid:** „Der 1. Silberstollen-Pfad windet sich in einer langen Kurve hinauf zum alten Bergmassiv. Vor dem Höhleneingang wartet das Graumännchen: Eine neue Silberader könnte dort Mine und Arbeiter retten – doch ihr Auffinden verlangt Licht in einem Stollen, für den ein altes Verbot und Versprechen gilt.“

**Antwort-Optionen (Ich):**
- **1.** „Den gesamten 1. Weg durch die Kurve bis zum Berg & Graumännchen wandern“ `(Aktion: walk_to_grey_man)`
- **2.** „Zum Wegeingang von „1. Silberstollen-Pfad“ gehen“ `(Aktion: select_path)`
- **3.** „Nach einem anderen der sieben Wege fragen“ `-> paths_overview`
- **4.** „Danke für den Hinweis! (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `path_2`

> **Waldhüter Arvid:** „Der 2. Nixenteich-Pfad im Nordosten führt durch den Nebel zu einem stillen Waldteich. Auf einem Felsen im Wasser sitzt die Nixe. Auf dem Grund ihres Teichs funkelt ein verlockender Schatz – doch sei gewarnt: Er ist mit einem dunklen Fluch und drohendem Unglück verbunden.“

**Antwort-Optionen (Ich):**
- **1.** „Den gesamten 2. Weg bis zum Waldteich und der Nixe wandern“ `(Aktion: walk_to_nixie)`
- **2.** „Zum Wegeingang von „2. Nixenteich-Pfad“ gehen“ `(Aktion: select_path)`
- **3.** „Nach einem anderen der sieben Wege fragen“ `-> paths_overview`
- **4.** „Danke für den Hinweis! (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `path_3`

> **Waldhüter Arvid:** „Der 3. Quellenweg im Südosten führt über eine Brücke, unter der ein Bach hindurchfließt. Ein geschlossenes Wehr an der Brücke staut den Bach zu einem kleinen Stausee zurück. Dort wacht der Riese: Die Quelle versorgt eigentlich das Tal – ihre Freigabe könnte dort eine Dürre lindern, zerstört jedoch die Heimat des Riesen.“

**Antwort-Optionen (Ich):**
- **1.** „Den gesamten 3. Weg über die Brücke bis zum Wehr und dem Riesen wandern“ `(Aktion: walk_to_giant)`
- **2.** „Zum Wegeingang von „3. Quellenweg“ gehen“ `(Aktion: select_path)`
- **3.** „Nach einem anderen der sieben Wege fragen“ `-> paths_overview`
- **4.** „Danke für den Hinweis! (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `path_4`

> **Waldhüter Arvid:** „Der 4. Holzfäller-Pfad im Südsüdosten führt auf eine gerodete Waldlichtung zu einem Holzfällerlager. Dort triffst du das Holzweibchen zwischen Baumstümpfen und Holzstapeln: Das geschlagene Brennholz rettet die Dorfbewohner vor der bitteren Kälte – doch zu starke Fällungen gefährden den Wald und seine gesamte Umgebung.“

**Antwort-Optionen (Ich):**
- **1.** „Den gesamten 4. Weg bis zum Holzfällerlager und dem Holzweibchen wandern“ `(Aktion: walk_to_wood_woman)`
- **2.** „Zum Wegeingang von „4. Holzfäller-Pfad“ gehen“ `(Aktion: select_path)`
- **3.** „Nach einem anderen der sieben Wege fragen“ `-> paths_overview`
- **4.** „Danke für den Hinweis! (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `path_5`

> **Waldhüter Arvid:** „Der 5. Höllenschlund-Pfad im Südsüdwesten führt an den Rand eines tiefen, glühenden Abgrunds. Inmitten des Feuermeeres und der emporsteigenden Flammen erwartet dich der Teufel auf seinem Obsidianfelsen.“

**Antwort-Optionen (Ich):**
- **1.** „Den gesamten 5. Weg bis zum Höllenschlund und dem Teufel wandern“ `(Aktion: walk_to_devil)`
- **2.** „Zum Wegeingang von „5. Höllenschlund-Pfad“ gehen“ `(Aktion: select_path)`
- **3.** „Nach einem anderen der sieben Wege fragen“ `-> paths_overview`
- **4.** „Danke für den Hinweis! (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `path_6`

> **Waldhüter Arvid:** „Der 6. Jägerpfad im Südwesten führt durch eine Waldschneise zu einer Jagdhütte mit prachtvollem Kräutergarten. Dort steht der Wilde Jäger und streitet erbittert mit einem Holzweibchen: Er wirft ihr Diebstahl kostbarer Kräuter vor, während sie beteuert, damit leidenden Waldtieren in höchster Not das Leben gerettet zu haben.“

**Antwort-Optionen (Ich):**
- **1.** „Den gesamten 6. Weg bis zur Jagdhütte und dem Streit wandern“ `(Aktion: walk_to_wild_hunter)`
- **2.** „Zum Wegeingang von „6. Jägerpfad“ gehen“ `(Aktion: select_path)`
- **3.** „Nach einem anderen der sieben Wege fragen“ `-> paths_overview`
- **4.** „Danke für den Hinweis! (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `path_7`

> **Waldhüter Arvid:** „Der 7. Torweg im Nordwesten führt durch uralten Bergwald zu einem mächtigen, fest verschlossenen Tor. Schwere Eisenbeschläge, ein massiver Riegelbalken und dicke Ketten mit einem gewaltigen Schloss versperren das Weiterkommen – ein Portal, das sich nur wahrer Einsicht und Erkenntnis öffnen wird.“

**Antwort-Optionen (Ich):**
- **1.** „Den gesamten 7. Weg bis zum geschlossenen Tor wandern“ `(Aktion: walk_to_gate)`
- **2.** „Zum Wegeingang von „7. Torweg“ gehen“ `(Aktion: select_path)`
- **3.** „Nach einem anderen der sieben Wege fragen“ `-> paths_overview`
- **4.** „Danke für den Hinweis! (Gespräch beenden)“ `(Aktion: close)`

---

## Lupo
**Rolle / Ort:** Hüterling auf dem Torweg

### Knoten: `creature_root`

> **Lupo:** „Oh je. Er wird dich fressen!“

**Antwort-Optionen (Ich):**
- **1.** „Wer?“ `-> creature_node_1`
- **2.** „Wer bist du denn?“ `-> creature_node_2`

### Knoten: `creature_node_1`

> **Lupo:** „Na ER!“

**Antwort-Optionen (Ich):**
- **1.** „Kenn ich nicht“ `-> creature_node_1_1`
- **2.** „Gehts genauer?“ `-> creature_node_1_2`

### Knoten: `creature_node_2`

> **Lupo:** „Lupo.“

**Antwort-Optionen (Ich):**
- **1.** „Ich meine, was bist du?“ `-> creature_node_2_1`
- **2.** „Wie der VW?“ `-> creature_node_2_2`

### Knoten: `creature_node_1_1`

> **Lupo:** „Das ist ein Problem.“

**Antwort-Optionen (Ich):**
- **1.** „Weiter“ `-> creature_final`

### Knoten: `creature_node_1_2`

> **Lupo:** „Lieber nicht.“

**Antwort-Optionen (Ich):**
- **1.** „Weiter“ `-> creature_final`

### Knoten: `creature_node_2_1`

> **Lupo:** „Deine Mutter du Nullchecker.“

**Antwort-Optionen (Ich):**
- **1.** „Weiter“ `-> creature_final`

### Knoten: `creature_node_2_2`

> **Lupo:** „Ja, du mich auch du Komiker.“

**Antwort-Optionen (Ich):**
- **1.** „Weiter“ `-> creature_final`

### Knoten: `creature_final`

> **Lupo:** „Viel Spaß noch hier, du Opfer!“

**Antwort-Optionen (Ich):**
- **1.** „Abgang Lupo“ `(Aktion: creature_flee)`

---

## Das Graumännchen
**Rolle / Ort:** Hüter des alten Silberstollens

### Knoten: `grey_root`

> **Das Graumännchen:** „Glück auf, Wandernde! Gut, dass du den Weg durch den Nebel bis zu diesem Stollenmundloch gefunden hast. Eine neue Silberader tief hier im Berg könnte unsere Mine und die Arbeiter retten. Doch ihr Auffinden verlangt Licht in einem Stollen, für den ein altes Verbot beziehungsweise ein geschworenes Versprechen gilt.“

**Antwort-Optionen (Ich):**
- **1.** „Warum hängt das Schicksal von Mine und Arbeitern an dieser neuen Silberader?“ `-> grey_silver_vein`
- **2.** „Was hat es mit dem Verbot und dem Versprechen für diesen Stollen auf sich?“ `-> grey_prohibition`
- **3.** „Wie können wir die Silberader im Dunkeln finden, wenn Licht dort verboten ist?“ `-> grey_light_choice`
- **4.** „Ich denke über deine Worte nach. (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `grey_silver_vein`

> **Das Graumännchen:** „Die oberen Gänge sind taub geschlagen. Wenn bis zum Ende des Mondes kein frisches Erz gefördert wird, wird die Zeche für immer geschlossen und die Bergleute verlieren ihr Auskommen. Ich weiß, dass die reiche Silberader im tiefen Nordstollen verläuft – aber ohne Licht kann niemand ihr glitzerndes Band im Gestein erkennen.“

**Antwort-Optionen (Ich):**
- **1.** „Erzähl mir von dem Verbot und dem Versprechen im tiefen Stollen.“ `-> grey_prohibition`
- **2.** „Welche Möglichkeiten haben wir, Licht in den Stollen zu bringen?“ `-> grey_light_choice`
- **3.** „Zurück zum Anfang unseres Gesprächs.“ `-> grey_root`

### Knoten: `grey_prohibition`

> **Das Graumännchen:** „Vor einer Generation stürzte der hintere First ein. Als die Eingeschlossenen gerettet wurden, gaben die Ältesten dem Berg das feierliche Versprechen, niemals wieder mit offenem Grubenfeuer oder Talglicht in diesen gesperrten Stollen einzufahren. Seitdem gilt das strenge Verbot: Kein offenes Licht darf die Schwelle passieren.“

**Antwort-Optionen (Ich):**
- **1.** „Gilt das Verbot für jedes Licht – oder nur für offenes Grubenfeuer?“ `-> grey_light_choice`
- **2.** „Was wiegt schwerer: das alte Versprechen oder die Rettung der Arbeiter?“ `-> grey_dilemma`
- **3.** „Zurück zur Übersicht.“ `-> grey_root`

### Knoten: `grey_light_choice`

> **Das Graumännchen:** „Du hörst genau hin! Das Verbot untersagt offenes Grubenlicht, das den Berg wärmt und Rauch wirft. Doch in der Schatztruhe vor der Schutzhütte auf der Kreuzung liegt ein kalt leuchtender Waldkristall. Oder man bittet die Ältesten offen um Entbindung vom Versprechen, um die Arbeiter zu retten. Welchen Weg hältst du für richtig?“

**Antwort-Optionen (Ich):**
- **1.** „Wir nutzen das kalte Kristalllicht aus der Truhe – so bleibt der Wortlaut des Versprechens gewahrt.“ `-> grey_resolution_crystal`
- **2.** „Ein Versprechen darf man nicht durch eine List umgehen – wir sollten das Verbot offen mit den Arbeitern prüfen.“ `-> grey_resolution_honest`
- **3.** „Das Versprechen an den Berg ist unantastbar – der Stollen muss dunkel bleiben.“ `-> grey_resolution_strict`

### Knoten: `grey_dilemma`

> **Das Graumännchen:** „Genau deshalb warte ich hier vor dem Höhleneingang auf jemanden von außerhalb. Ein gebrochener Schwur nimmt den Bergleuten ihre Ehre und ihren Schutz – doch eine geschlossene Mine nimmt ihnen das Brot. Nur wer beides achtet, findet den wahren Weg zur Silberader.“

**Antwort-Optionen (Ich):**
- **1.** „Lass uns überlegen, wie wir Licht in den Stollen bringen können.“ `-> grey_light_choice`
- **2.** „Zurück zum Hauptgespräch.“ `-> grey_root`

### Knoten: `grey_resolution_crystal`

> **Das Graumännchen:** „Ein kluger Gedanke! Der stille Glanz aus der Truhe an der Schutzhütte trägt weder Flamme noch Rauch in den Stollen und bringt dennoch das Silber im Fels zum Aufleuchten. Wenn du die Truhe an der Hütte geöffnet hast, steht uns die Entdeckung der Silberader offen!“

**Antwort-Optionen (Ich):**
- **1.** „Ich habe noch eine andere Frage zum Stollen.“ `-> grey_root`
- **2.** „Glück auf, Graumännchen! (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `grey_resolution_honest`

> **Das Graumännchen:** „Aufrichtigkeit ehrt dich! Ein Versprechen, das dem Schutz des Lebens diente, darf auch im Namen des Lebens gemeinsam erneuert werden. Mit dieser Haltung kannst du den Bergleuten und dem Berg gleichermaßen in die Augen blicken.“

**Antwort-Optionen (Ich):**
- **1.** „Ich möchte noch etwas anderes fragen.“ `-> grey_root`
- **2.** „Glück auf! (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `grey_resolution_strict`

> **Das Graumännchen:** „Eine strenge, aber standhafte Entscheidung. Wer ein gegebenes Wort selbst in größter Not nicht bricht, bewahrt den Frieden mit dem Berg – auch wenn die Arbeiter dann nach neuen Wegen außerhalb der alten Stollen suchen müssen.“

**Antwort-Optionen (Ich):**
- **1.** „Lass mich die anderen Möglichkeiten noch einmal abwägen.“ `-> grey_light_choice`
- **2.** „Glück auf! (Gespräch beenden)“ `(Aktion: close)`

---

## Die Nixe vom Spiegelteich
**Rolle / Ort:** Wächterin auf dem Stein im Teich

### Knoten: `nixie_root`

> **Die Nixe vom Spiegelteich:** „Tritt näher ans Ufer, Wandernde… Siehst du das goldene Schimmern hier unten im klaren Wasser neben meinem Stein? Ein verlockender Schatz ruht auf dem Grund dieses Teichs – doch wisse: Wer nach ihm greift, weckt einen alten Fluch und ruft drohendes Unglück herbei.“

**Antwort-Optionen (Ich):**
- **1.** „Was für ein verlockender Schatz liegt dort unten im Teich?“ `-> nixie_treasure`
- **2.** „Welcher Fluch und welches Unglück sind mit dem Schatz verbunden?“ `-> nixie_curse`
- **3.** „Kann man das drohende Unglück abwenden, oder darf niemand den Schatz berühren?“ `-> nixie_temptation`
- **4.** „Ich trete lieber einen Schritt vom Ufer zurück. (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `nixie_treasure`

> **Die Nixe vom Spiegelteich:** „Es ist ein uralter Hort aus lauterem Wassergold, geschmiedet zu einer Krone und einem Kelch, die jedem, der sie anblickt, Reichtum und Glanz ohne Mühe versprechen. Schon viele Wandernde sahen ihr Spiegelbild im Gold und vergaßen darüber alles, was ihnen lieb war.“

**Antwort-Optionen (Ich):**
- **1.** „Erzähl mir mehr über den Fluch, der auf diesem Gold liegt.“ `-> nixie_curse`
- **2.** „Wie soll ich mich gegenüber einer solchen Versuchung verhalten?“ `-> nixie_temptation`
- **3.** „Zurück zum Anfang unseres Gesprächs.“ `-> nixie_root`

### Knoten: `nixie_curse`

> **Die Nixe vom Spiegelteich:** „Der Schatz wurde einst in blindem Neid geraubt und im Teich versenkt. Seitdem haftet ihm ein schwerer Fluch an: Wer das Gold aus Eigennutz aus den Fluten hebt, dem verwandelt sich jeder Gewinn in bitteres Unglück – die Quellen im Wald versiegen, und Zwietracht legt sich über das ganze Land.“

**Antwort-Optionen (Ich):**
- **1.** „Gibt es einen Weg, mit dem Schatz und dem Fluch weise umzugehen?“ `-> nixie_temptation`
- **2.** „Zurück zur Übersicht.“ `-> nixie_root`

### Knoten: `nixie_temptation`

> **Die Nixe vom Spiegelteich:** „Das Wasser prüft das Herz jedes Einzelnen, der an dieses Ufer tritt. Das Gold funkelt zum Greifen nah vor dir im Teich. Wie entscheidest du dich angesichts des verlockenden Schatzes und des drohenden Unglücks?“

**Antwort-Optionen (Ich):**
- **1.** „Ich widerstehe der Verlockung – kein Reichtum ist es wert, Unglück über das Land zu bringen.“ `-> nixie_resolution_renounce`
- **2.** „Ich lasse den Schatz im Teich ruhen, damit das Wasser den Fluch für immer einschließt und hütet.“ `-> nixie_resolution_cleanse`
- **3.** „Die Verlockung ist zu groß – ich wage es trotzdem, nach dem Gold im Wasser zu greifen.“ `-> nixie_resolution_take`

### Knoten: `nixie_resolution_renounce`

> **Die Nixe vom Spiegelteich:** „Du hast ein klares Auge und ein freies Herz! Wer den schönen Schein durchschaut und dem verlockenden Gold entsagt, über den hat der Fluch keine Macht. Nimm meinen Segen des klaren Wassers mit auf deinen weiteren Weg.“

**Antwort-Optionen (Ich):**
- **1.** „Ich möchte dich noch etwas anderes fragen.“ `-> nixie_root`
- **2.** „Leb wohl, Nixe vom Spiegelteich! (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `nixie_resolution_cleanse`

> **Die Nixe vom Spiegelteich:** „Weise gesprochen! Solange der Schatz unangetastet auf dem Grund des Teichs unter meiner Wacht verbleibt, schläft das drohende Unglück unter den Wellen und der Spiegelteich bleibt eine friedliche Quelle für den ganzen Wald.“

**Antwort-Optionen (Ich):**
- **1.** „Zurück zum Anfang unseres Gesprächs.“ `-> nixie_root`
- **2.** „Hab Dank für deine Warnung! (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `nixie_resolution_take`

> **Die Nixe vom Spiegelteich:** „Halt ein! Kaum berühren deine Finger die kalte Wasseroberfläche, zieht ein dunkler Schatten über den Teich und die Wellen schlagen eisig gegen meinen Stein. Spürst du die Kälte des Fluchs? Zieh deine Hand zurück, solange das Unglück noch schläft!“

**Antwort-Optionen (Ich):**
- **1.** „Ich ziehe meine Hand rasch zurück und überdenke meine Wahl!“ `-> nixie_temptation`
- **2.** „Ich trete vom Wasser zurück. (Gespräch beenden)“ `(Aktion: close)`

---

## Der Riese am Wehr
**Rolle / Ort:** Wächter über Stausee und Quellwehr

### Knoten: `giant_root`

> **Der Riese am Wehr:** „Halt vor dem Wehr, kleines Menschenkind! Du stehst auf meiner Brücke über dem Quellbach. Siehst du das geschlossene Wehr und den kleinen Stausee dahinter? Eine Bergquelle versorgt von hier aus eigentlich das Tal. Ihre Freigabe könnte unten im Tal eine schwere Dürre lindern – doch wenn das Wehr geöffnet wird, zerstört das meine Heimat!“

**Antwort-Optionen (Ich):**
- **1.** „Wie steht es um die Quelle und die Dürre unten im Tal?“ `-> giant_source_drought`
- **2.** „Warum würde die Freigabe der Quelle deine Heimat zerstören?“ `-> giant_homeland`
- **3.** „Was soll mit dem geschlossenen Wehr geschehen – das Tal retten oder deine Heimat schützen?“ `-> giant_dilemma`
- **4.** „Ich blicke noch einen Moment auf das gestaute Wasser. (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `giant_source_drought`

> **Der Riese am Wehr:** „Unter dieser Brücke floss einst ein breiter Bach ins Tal hinab. Seit Wochen hat es im Unterland keinen Tropfen geregnet: Die Felder verdorren, die Brunnen sind leer, und nur das klare Wasser aus meiner Bergquelle hier im Stausee könnte die Dürre im Tal noch lindern.“

**Antwort-Optionen (Ich):**
- **1.** „Und warum hältst du das Wehr an der Brücke dennoch geschlossen?“ `-> giant_homeland`
- **2.** „Lass uns nach einer Entscheidung für das Wehr suchen.“ `-> giant_dilemma`
- **3.** „Zurück zum Anfang unseres Gesprächs.“ `-> giant_root`

### Knoten: `giant_homeland`

> **Der Riese am Wehr:** „Dieser kleine Stausee und die Uferhöhlen unter den alten Baumwurzeln sind seit Jahrhunderten meine einzige Heimat! Das gestaute Wasser trägt das Wurzelwerk und schützt mein Felslager. Reißt man das Wehr auf, bricht das Ufer ein, die Flutwelle reißt mein Heim unter der Brücke fort und lässt nur nackten Schlamm zurück.“

**Antwort-Optionen (Ich):**
- **1.** „Wie können wir zwischen der Dürre im Tal und deiner Heimat entscheiden?“ `-> giant_dilemma`
- **2.** „Zurück zur Übersicht.“ `-> giant_root`

### Knoten: `giant_dilemma`

> **Der Riese am Wehr:** „Meine Hand ruht schwer auf dem eisernen Stellrad des Wehrs. Öffne ich es, lebt das Tal auf und meine Heimat vergeht. Halte ich es verschlossen, bleibt mein Heim bestehen, während das Tal verdorrt. Welchen Rat gibst du mir, Wandernde?“

**Antwort-Optionen (Ich):**
- **1.** „Heb das Wehr nur einen gemessenen Spalt weit an und stütze dein Ufer mit Felsblöcken – so fließt genug Wasser gegen die Dürre, ohne dass der Stausee einbricht.“ `-> giant_resolution_compromise`
- **2.** „Das Leben eines ganzen Tals wiegt schwerer – gib die Quelle vollständig frei, um die Dürre zu beenden.“ `-> giant_resolution_open`
- **3.** „Niemand darf gezwungen werden, seine eigene Heimat zu zerstören – lass das Wehr geschlossen.“ `-> giant_resolution_closed`

### Knoten: `giant_resolution_compromise`

> **Der Riese am Wehr:** „Bei den alten Felsen… daran hat mein schwerer Sinn noch nicht gedacht! Mit meiner Riesenkraft kann ich neue Steindämme vor meine Uferhöhle setzen und das Wehr Raste um Raste öffnen. So strömt der Bach wieder unter der Brücke ins dürre Tal, und mein kleiner Stausee bleibt dennoch erhalten!“

**Antwort-Optionen (Ich):**
- **1.** „Ich möchte dich noch etwas anderes zum Wehr fragen.“ `-> giant_root`
- **2.** „Möge das Wasser Tal und Heimat gleichermaßen bewahren! (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `giant_resolution_open`

> **Der Riese am Wehr:** „Ein schmerzhafter, aber selbstloser Rat. Wenn das Tal gerettet wird, will ich den Verlust meiner alten Wohnstätte am Stausee tragen und mir höher oben im Gebirge eine neue Zuflucht suchen.“

**Antwort-Optionen (Ich):**
- **1.** „Lass uns die anderen Möglichkeiten noch einmal bedenken.“ `-> giant_dilemma`
- **2.** „Hab Dank für deine Größe, Hüter des Wehrs! (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `giant_resolution_closed`

> **Der Riese am Wehr:** „Du sprichst aus Mitgefühl für meine Heimat. Doch solange das Wehr ganz geschlossen bleibt, lässt mir das Stöhnen des ausgetrockneten Tals unter der Brücke keine Ruhe.“

**Antwort-Optionen (Ich):**
- **1.** „Vielleicht gibt es doch einen Weg, dem Tal zu helfen.“ `-> giant_dilemma`
- **2.** „Ich lasse dich über das Wehr wachen. (Gespräch beenden)“ `(Aktion: close)`

---

## Das Holzweibchen
**Rolle / Ort:** Hüterin des Waldes im Holzfällerlager

### Knoten: `wood_woman_root`

> **Das Holzweibchen:** „Sei gegrüßt auf dieser geschlagenen Lichtung, Wandernde… Siehst du die vielen frischen Baumstümpfe und die hohen Scheitstapel hier im Holzfällerlager? Das Brennholz rettet die Dorfbewohner unten im Tal vor der bitteren Kälte – doch zu starke Fällungen gefährden den Wald und seine gesamte Umgebung!“

**Antwort-Optionen (Ich):**
- **1.** „Warum brauchen die Dorfbewohner so dringend so viel Brennholz?“ `-> wood_woman_village_cold`
- **2.** „Wie gefährden die starken Fällungen den Wald und seine Umgebung?“ `-> wood_woman_forest_danger`
- **3.** „Wie können wir die Dorfbewohner vor der Kälte schützen, ohne den Wald zu zerstören?“ `-> wood_woman_dilemma`
- **4.** „Ich sehe mich noch im Holzfällerlager um. (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `wood_woman_village_cold`

> **Das Holzweibchen:** „Ein früher, schneidender Frost zieht aus den Bergen herab. In den Hütten des Dorfes frieren die Alten und die Kinder, und die Vorräte vom Vorjahr sind fast verbrannt. Darum rückten die Holzfäller mit Axt und Schrotsäge aus: Jedes Klafter Brennholz hier auf der Lichtung bedeutet Wärme und Überleben für die Familien im Dorf.“

**Antwort-Optionen (Ich):**
- **1.** „Und welchen Schaden richten die fortgesetzten Fällungen hier im Wald an?“ `-> wood_woman_forest_danger`
- **2.** „Lass uns überlegen, wie viel Holz geschlagen werden darf.“ `-> wood_woman_dilemma`
- **3.** „Zurück zum Anfang unseres Gesprächs.“ `-> wood_woman_root`

### Knoten: `wood_woman_forest_danger`

> **Das Holzweibchen:** „Schau auf die kahlen Stümpfe ringsum! Wenn die alten Schirmbäume alle auf einmal fallen, verliert der Waldboden seinen Halt: Bei Schneeschmelze und Regen rutscht die Erde ins Tal, der eisige Sturm fegt ungebremst durch die Schneisen, die Tiere verlieren ihren Schutz und die Lebensgeister der Bäume schwinden.“

**Antwort-Optionen (Ich):**
- **1.** „Welchen Ausweg gibt es zwischen der Kälte im Dorf und dem Schutz des Waldes?“ `-> wood_woman_dilemma`
- **2.** „Zurück zur Übersicht.“ `-> wood_woman_root`

### Knoten: `wood_woman_dilemma`

> **Das Holzweibchen:** „Die Holzfäller warten auf ein Zeichen, wie es auf dieser Lichtung weitergehen soll. Schlagen sie weiter wie bisher, übersteht das Dorf den Winter warm, aber der Wald und die Hänge ringsum nehmen schweren Schaden. Welchen Rat gibst du hier im Holzfällerlager?“

**Antwort-Optionen (Ich):**
- **1.** „Nur Bruch- und Dürrholz sowie einzelne Stämme mit Maß entnehmen, die Baumstümpfe segnen und im Frühjahr für jeden Stamm junge Bäume nachpflanzen.“ `-> wood_woman_resolution_balance`
- **2.** „Das Leben der frierenden Dorfbewohner geht vor – es muss so viel Brennholz geschlagen werden, bis alle Öfen versorgt sind.“ `-> wood_woman_resolution_village`
- **3.** „Die Fällungen müssen sofort gestoppt werden – kein weiterer Baum darf mehr der Axt zum Opfer fallen.“ `-> wood_woman_resolution_forest`

### Knoten: `wood_woman_resolution_balance`

> **Das Holzweibchen:** „Hab tausend Dank, du verständige Seele! Wer dem Wald nur nimmt, was er verkraftet, und ihm neues Leben zurückgibt, dem hilft auch das Holzweibchen: Ich lege meinen Moossegen auf die bereits gestapelten Scheite – sie werden im Dorf doppelt so lange glühen und wärmen, ohne dass der Hochwald kahlgeschlagen wird!“

**Antwort-Optionen (Ich):**
- **1.** „Ich möchte dich noch etwas anderes zum Holzfällerlager fragen.“ `-> wood_woman_root`
- **2.** „Mögen Dorf und Wald gemeinsam durch den Winter kommen! (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `wood_woman_resolution_village`

> **Das Holzweibchen:** „Dein Herz schlägt für die frierenden Menschen im Tal. In diesem Winter wird niemand im Dorf unter der Kälte leiden – doch wenn der Frühling kommt, werden die kahlen Hänge und der verletzte Wald uns alle mahnen, wie teuer diese Wärme erkauft wurde.“

**Antwort-Optionen (Ich):**
- **1.** „Lass mich die anderen Möglichkeiten noch einmal abwägen.“ `-> wood_woman_dilemma`
- **2.** „Leb wohl, Holzweibchen! (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `wood_woman_resolution_forest`

> **Das Holzweibchen:** „Die Bäume und die Tiere des Waldes atmen auf, wenn Axt und Säge schweigen. Doch vergiss nicht die Hütten unten im Tal – ganz ohne Brennholz wird die Kälte dort zur bitteren Prüfung werden.“

**Antwort-Optionen (Ich):**
- **1.** „Vielleicht finden wir doch einen Ausgleich für Dorf und Wald.“ `-> wood_woman_dilemma`
- **2.** „Behüte den Wald gut, Holzweibchen! (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `wood_lodge_root`

> **Das Holzweibchen:** „Glaube dem stolzen Jäger kein bitteres Wort! Ja, ich pflückte von der Mondwurz aus seinem Garten – doch drüben im Brombeerdickicht lag eine junge Hirschkuh mit tief gerissener Flanke im Wundfieber! Ohne den Wurzelsaft wäre sie vor Morgengrauen verendet. Er sperrt Heilung hinter Zäunen ein, während der Wald leidet! Darf ein Zaun mehr wert sein als das lebendige Herz eines Geschöpfs?“

**Antwort-Optionen (Ich):**
- **1.** „Konntest du das Tier mit den Kräutern retten?“ `-> wood_lodge_life`
- **2.** „Verstehst du denn auch die Sorge des Jägers um seinen gehegten Garten?“ `-> wood_lodge_hunter_view`
- **3.** „Ich möchte hören, was der Wilde Jäger dazu entgegnet.“ `-> hunter_root`
- **4.** „Möge sich eine gerechte Einigung finden. (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `wood_lodge_life`

> **Das Holzweibchen:** „Das Fieber sank und die Wunde schloss sich! Die Hirschkuh atmet und steht wieder auf eigenen Läufen. Der Garten des Jägers wird im nächsten Frühjahr neu austreiben – doch ein verstorbenes Waldwesen kehrt nie wieder.“

**Antwort-Optionen (Ich):**
- **1.** „Aber wie soll der Jäger dir vertrauen, wenn du im Dunkeln nimmst?“ `-> wood_lodge_hunter_view`
- **2.** „Lass mich mit dem Jäger sprechen.“ `-> hunter_root`
- **3.** „Ein edler Beweggrund, doch ein schwieriges Dilemma. (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `wood_lodge_hunter_view`

> **Das Holzweibchen:** „Ich anerkenne seine Mühe um diesen Kräutergarten. Wäre der Jäger zugegen gewesen, hätte ich ihn um die Wurzeln gebeten. Wenn er mir vergibt, pflanze ich ihm im Frühling wilde Waldminze und Alant als Ausgleich an den Zaun.“

**Antwort-Optionen (Ich):**
- **1.** „Das ist ein faires Angebot. Ich trage es dem Wilden Jäger vor.“ `-> hunter_root`
- **2.** „Ich danke dir für deine ehrliche Sicht der Dinge. (Gespräch beenden)“ `(Aktion: close)`

---

## Der Teufel
**Rolle / Ort:** Herr des Höllenschlundes

### Knoten: `devil_root`

> **Der Teufel:** „Sieh an... Eine sterbliche Seele wagt sich bis an den Rand meines Höllenschlundes. Das Feuer brennt hier seit Anbeginn der Zeiten – und ich beobachte jeden Schritt auf den sieben Wegen.“

**Antwort-Optionen (Ich):**
- **1.** „Was ist das für ein Ort und warum brennt hier alles?“ `-> devil_about_chasm`
- **2.** „Bist du wahrhaftig der Teufel?“ `-> devil_about_identity`
- **3.** „Ich sehe mich erst einmal weiter um. (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `devil_about_chasm`

> **Der Teufel:** „Dies ist der Schlund der Glut und der ewigen Prüfungen. Viele suchen Macht, viele fürchten das Feuer. Noch ist deine Stunde nicht gekommen, Wanderer – doch merke dir diesen Ort gut.“

**Antwort-Optionen (Ich):**
- **1.** „Wer bist du genau?“ `-> devil_about_identity`
- **2.** „Ich trete vorsichtig vom Kraterrand zurück. (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `devil_about_identity`

> **Der Teufel:** „Man nennt mich den Versucher, den Fürsten der Glut, den Teufel. Noch trage ich dir keinen Handel an... doch wenn deine Reise voranschreitet, werden sich unsere Pfade erneut kreuzen.“

**Antwort-Optionen (Ich):**
- **1.** „Erzähl mir mehr über diesen flammenden Abgrund.“ `-> devil_about_chasm`
- **2.** „Ich werde wachsam bleiben. (Gespräch beenden)“ `(Aktion: close)`

---

## Der Wilde Jäger
**Rolle / Ort:** Herr der Jagdhütte

### Knoten: `hunter_root`

> **Der Wilde Jäger:** „Halt, Wanderer! Tritt nicht zwischen uns! Ich habe dieses Holzweibchen quer durch den Forst bis hierher an meine Jagdhütte verfolgt. Sie hat sich nachts in meinen umzäunten Kräutergarten geschlichen und die seltenen Heilsalben-Kräuter gestohlen! Ein Diebstahl bleibt ein Vergehen gegen die Ordnung des Waldes!“

**Antwort-Optionen (Ich):**
- **1.** „Welche Kräuter wirfst du dem Holzweibchen vor, gestohlen zu haben?“ `-> hunter_herbs`
- **2.** „Was forderst du nun von ihr als Sühne?“ `-> hunter_demand`
- **3.** „Ich möchte hören, was das Holzweibchen zu ihrer Verteidigung sagt.“ `-> wood_lodge_root`
- **4.** „Klärt euren Streit mit Bedacht. (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `hunter_herbs`

> **Der Wilde Jäger:** „Es handelt sich um die seltene Mondwurz und den Königs-Salbei! Ich hege diesen Kräutergarten seit vielen Wintern mit eigenen Händen. Aus den Blättern bereite ich Wundsalben für mein Jagdgespann und die Dorfleute. Wenn jeder nimmt, was ihm beliebt, bricht die Jagdordnung zusammen!“

**Antwort-Optionen (Ich):**
- **1.** „Was verlangst du jetzt von ihr?“ `-> hunter_demand`
- **2.** „Lass mich die Gegenseite anhören.“ `-> wood_lodge_root`
- **3.** „Ich verstehe deinen Zorn. (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `hunter_demand`

> **Der Wilde Jäger:** „Sie soll die restlichen Wurzeln sofort zurücklegen und geloben, diesen Zaun nie wieder heimlich zu überwinden! Ein Jäger achtet das Wild – aber er duldet keinen Raub in seinem eigenen Revier!“

**Antwort-Optionen (Ich):**
- **1.** „Ich rede mit dem Holzweibchen darüber.“ `-> wood_lodge_root`
- **2.** „Ich denke über deine Worte nach. (Gespräch beenden)“ `(Aktion: close)`

---

## Das geschlossene Tor
**Rolle / Ort:** Uraltes Portal des Wanderlandes

### Knoten: `gate_root`

> **Das geschlossene Tor:** „Vor dir ragt ein gewaltiges, zweiflügeliges Holztor empor, eingefasst in uralte, moosüberwachsene Steinpfeiler. Schwere Eisenbeschläge und verrostete Ketten halten die Flügel unnachgiebig zusammen. Ein kunstvoll geschmiedetes Vorhängeschloss mit verblichenen Siegelzeichen sichert den massiven Riegelbalken. Auf dem Torbogen steht in verwitterten Lettern gemeißelt: „Nur wer die Pfade erkannte und das Maß wahrte, tritt ein.““

**Antwort-Optionen (Ich):**
- **1.** „Das Schloss und die Siegelzeichen genauer untersuchen.“ `-> gate_lock_inspect`
- **2.** „Versuchen, an den Eisenketten und dem Riegel zu rütteln.“ `-> gate_chain_shake`
- **3.** „Die verwitterte Inschrift auf dem Torbogen betrachten.“ `-> gate_inscription`
- **4.** „Den Blick abwenden und den Rückweg bedenken. (Untersuchung beenden)“ `(Aktion: close)`

### Knoten: `gate_lock_inspect`

> **Das geschlossene Tor:** „Das Vorhängeschloss besitzt kein gewöhnliches Schlüsselloch. Stattdessen sind sieben kreisförmige Vertiefungen in das Metall eingelassen, die den sieben Wegen der Waldkreuzung gleichen. Sie scheinen auf eine Vollendung oder Erkenntnis zu warten, ehe sich der Mechanismus rührt.“

**Antwort-Optionen (Ich):**
- **1.** „Weitere Details des Tors ansehen.“ `-> gate_root`
- **2.** „Die Untersuchung beenden.“ `(Aktion: close)`

### Knoten: `gate_chain_shake`

> **Das geschlossene Tor:** „Du greifst nach den kalten Eisenketten und rüttelst daran. Ein dumpfer, schwerer Klang hallt durch die stillen Tannen, doch das Tor rührt sich keinen Millimeter. Rohe Kraft vermag hier nichts auszurichten.“

**Antwort-Optionen (Ich):**
- **1.** „Zurück zum Tor.“ `-> gate_root`
- **2.** „Die Untersuchung beenden.“ `(Aktion: close)`

### Knoten: `gate_inscription`

> **Das geschlossene Tor:** „Die Schriftzeichen sind tief in den Stein gehauen: „Wer das Gold der Nixe verschmäht, das Wort des Bergmanns ehrt, dem Riesen wie dem Dürstenden Gehör schenkt und das Leben im Wald bewahrt, der wird den Schlüssel in sich tragen.“ Arvids Worte über das Gewissen scheinen hier Gestalt angenommen zu haben.“

**Antwort-Optionen (Ich):**
- **1.** „Zurück zum Tor.“ `-> gate_root`
- **2.** „Die Untersuchung beenden.“ `(Aktion: close)`

---

## Magischer Felsbrocken
**Rolle / Ort:** Uraltes Hindernis auf dem Silberstollen-Pfad

### Knoten: `boulder_root`

> **Magischer Felsbrocken:** „Ein gewaltiger, bemooster Granitfelsen versperrt den gesamten Pfad hinauf zum Silberstollen. Durch den Stein ziehen sich feine, grün schimmernde Adern aus Kristallstaub. Am Fuße des Pfades dreht sich ein leuchtender Edelstein auf einem Steinsockel – eine uralte Resonanz scheint beide miteinander zu verbinden.“

**Antwort-Optionen (Ich):**
- **1.** „Die grün schimmernden Kristalladern genauer abtasten.“ `-> boulder_runes`
- **2.** „Verstehen, wie der Felsen beseitigt werden kann.“ `-> boulder_hint`
- **3.** „Vom Felsen zurücktreten. (Untersuchung beenden)“ `(Aktion: close)`

### Knoten: `boulder_runes`

> **Magischer Felsbrocken:** „Der Stein summt leise, wenn du deine Hand an die Adern legst. Seine Masse ist durch uralte Erdmagie im Boden verankert. Die Energie fließt geradewegs zum rotierenden grünen Edelstein am Eingang von Weg 1 hinab!“

**Antwort-Optionen (Ich):**
- **1.** „Wie lässt sich dieser Bann lösen?“ `-> boulder_hint`
- **2.** „Ich trete zurück. (Untersuchung beenden)“ `(Aktion: close)`

### Knoten: `boulder_hint`

> **Magischer Felsbrocken:** „Klicke einfach auf den rotierenden grünen Edelstein am Pfadanfang des 1. Weges! Eine Berührung dieses Leitkristalls wird die Resonanz auslösen und den Felsbrocken zerfallen lassen.“

**Antwort-Optionen (Ich):**
- **1.** „Alles klar, ich werde den Edelstein berühren! (Untersuchung beenden)“ `(Aktion: close)`

---

## Tiefe Wasserpfütze
**Rolle / Ort:** Magische Barriere auf dem Nixenteich-Pfad

### Knoten: `puddle_root`

> **Tiefe Wasserpfütze:** „Eine tiefe, schimmernde Wasserpfütze überschwemmt den gesamten Pfad in Richtung des Spiegelteichs. Das Wasser kräuselt sich in magischen Wellen und schimmert im Takt des rotierenden Edelsteins am Pfadanfang.“

**Antwort-Optionen (Ich):**
- **1.** „Erkunden, wie das Wasser abgelassen werden kann.“ `-> puddle_hint`
- **2.** „Vorsichtig vom Wasserrand zurücktreten. (Untersuchung beenden)“ `(Aktion: close)`

### Knoten: `puddle_hint`

> **Tiefe Wasserpfütze:** „Klicke auf den rotierenden Aquamarin-Edelstein am Eingang des 2. Weges! Eine Berührung des Kristalls entzieht der Pfütze die magische Flut und lässt das Wasser im Erdboden versickern.“

**Antwort-Optionen (Ich):**
- **1.** „Ich werde den Aquamarin berühren! (Untersuchung beenden)“ `(Aktion: close)`

---

## Reißender Gebirgsbach
**Rolle / Ort:** Tosende Wasserbarriere auf dem Quellenweg

### Knoten: `stream_root`

> **Reißender Gebirgsbach:** „Ein tosender, ungestümer Gebirgsbach stürzt quer über den Pfad und schneidet den Weg zur Brücke und zum Riesen ab. Weiße Gischtkronen tanzen auf den Wellen und tiefblaues Licht schimmert im Takt des rotierenden Kristalls am Weganfang.“

**Antwort-Optionen (Ich):**
- **1.** „Erkunden, wie der Bachlauf gebändigt werden kann.“ `-> stream_hint`
- **2.** „Vom reißenden Wasser zurückweichen. (Untersuchung beenden)“ `(Aktion: close)`

### Knoten: `stream_hint`

> **Reißender Gebirgsbach:** „Klicke auf den rotierenden saphirblauen Edelstein am Eingang des 3. Weges! Seine Kraft beruhigt die Fluten, lässt das Wasser im Kiesbett versickern und gibt den Pfad zum Wehr frei.“

**Antwort-Optionen (Ich):**
- **1.** „Ich berühre den blauen Saphir! (Untersuchung beenden)“ `(Aktion: close)`

---

## Uralter Baumstamm
**Rolle / Ort:** Mächtiges Hindernis auf dem Holzfäller-Pfad

### Knoten: `log_root`

> **Uralter Baumstamm:** „Ein gewaltiger, bemooster Eichenstamm liegt quer über dem Pfad zum Holzfällerlager. Entlang der Bruchkante leuchten feine, bernsteinfarbene Runenrisse, die mit dem Leitkristall am Wegeingang harmonieren.“

**Antwort-Optionen (Ich):**
- **1.** „Erfahren, wie der Stamm beiseite geräumt werden kann.“ `-> log_hint`
- **2.** „Vom Stamm zurücktreten. (Untersuchung beenden)“ `(Aktion: close)`

### Knoten: `log_hint`

> **Uralter Baumstamm:** „Klicke auf den rotierenden Bernsteinkristall am Eingang des 4. Weges! Die Resonanz des Kristalls löst die Versiegelung, lässt den Stamm zerfallen und gibt den Pfad zur Lichtung frei.“

**Antwort-Optionen (Ich):**
- **1.** „Verstanden, ich berühre den Bernsteinkristall! (Untersuchung beenden)“ `(Aktion: close)`

---

## Lodernde Flammenwand
**Rolle / Ort:** Feurige Barriere auf dem Höllenschlund-Pfad

### Knoten: `fire_root`

> **Lodernde Flammenwand:** „Eine lodernde Wand aus züngelnden Flammen und glühenden Kohlen riegelt den Pfad zum Höllenschlund ab. Die Hitze ist sengend, doch die Flammen pulsieren im Gleichklang mit dem rotierenden Rubinkristall an der Kreuzung.“

**Antwort-Optionen (Ich):**
- **1.** „Herausfinden, wie das Feuer gelöscht werden kann.“ `-> fire_hint`
- **2.** „Vor der Hitze zurückweichen. (Untersuchung beenden)“ `(Aktion: close)`

### Knoten: `fire_hint`

> **Lodernde Flammenwand:** „Klicke auf den rotierenden Rubinkristall am Eingang des 5. Weges! Eine Berührung bannt die Höllenglut und lässt die Flammen zischend zu harmloser Asche verpuffen.“

**Antwort-Optionen (Ich):**
- **1.** „Ich werde den Rubinkristall berühren! (Untersuchung beenden)“ `(Aktion: close)`

---

## Verwunschenes Kräutergeländer
**Rolle / Ort:** Zaubersperre auf dem Jägerpfad

### Knoten: `herbs_root`

> **Verwunschenes Kräutergeländer:** „Ein massives, gezimmertes Holzgeländer und dahinter wuchernde, mannshohe Zauberkräuter riegeln den Pfad zur Jagdhütte vollständig ab. Violett glühende Knospen schwingen im Gleichklang mit dem rotierenden Amethystkristall am Weganfang.“

**Antwort-Optionen (Ich):**
- **1.** „Herausfinden, wie das Geländer und die Kräuter weichen.“ `-> herbs_hint`
- **2.** „Vor den dichten Ranken zurücktreten. (Untersuchung beenden)“ `(Aktion: close)`

### Knoten: `herbs_hint`

> **Verwunschenes Kräutergeländer:** „Klicke auf den rotierenden violetten Amethyst-Edelstein am Eingang des 6. Weges! Seine Resonanz entlässt den Zauber, lässt das Geländer zur Seite weichen und die dichten Ranken sanft vergehen.“

**Antwort-Optionen (Ich):**
- **1.** „Ich werde den Amethystkristall berühren! (Untersuchung beenden)“ `(Aktion: close)`

---

## Pilzling Morchel
**Rolle / Ort:** Hüter der Felssporen auf Weg 1

### Knoten: `mushroom_1_root`

> **Pilzling Morchel:** „*Huhu!* Ein Wanderer tief in den Felsen des Silberstollen-Pfades! Ich bin Morchel. Du hast den gewaltigen Felsbrocken hinter dir gelassen – beachtlich! Nur noch wenige Schritte den Berg hinauf, und du erreichst die alte Silbermine!“

**Antwort-Optionen (Ich):**
- **1.** „Wer wartet denn dort oben am Stollen?“ `-> mushroom_1_graumaennchen`
- **2.** „Erzähl mir mehr über das Geheimnis dieses Bergpfades!“ `-> mushroom_1_smaragd`
- **3.** „Danke für den Rat, kleiner Morchel! (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `mushroom_1_smaragd`

> **Pilzling Morchel:** „Der grüne Smaragd an der Waldkreuzung schützt diesen Pfad mit uralter Erdmagie. Doch hüte dich: Hoch oben am Bergmassiv gelten die alten Gesetze des Berges. Wer gierig nach Silber schürft, verliert oft mehr als nur sein Licht!“

**Antwort-Optionen (Ich):**
- **1.** „Was hat das Graumännchen mit dem Licht zu tun?“ `-> mushroom_1_graumaennchen`
- **2.** „Ich steige vorsichtig weiter hinauf. (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `mushroom_1_graumaennchen`

> **Pilzling Morchel:** „Dort oben hütet das uralte Graumännchen den Mineneingang! Eine neue Silberader könnte die Zeche und die Bergleute retten – doch er fordert Respekt vor dem finsteren Schacht. Sei bedacht und höflich, wenn du mit ihm sprichst!“

**Antwort-Optionen (Ich):**
- **1.** „Erzähl mir noch etwas über den Bergpfad.“ `-> mushroom_1_smaragd`
- **2.** „Danke für deine Weisheit, Morchel! (Gespräch beenden)“ `(Aktion: close)`

---

## Pilzling Pfiffer
**Rolle / Ort:** Hüter der Feuchtsporen auf Weg 2

### Knoten: `mushroom_2_root`

> **Pilzling Pfiffer:** „*Plitsch, platsch!* Sei gegrüßt auf dem feuchten Nixenteich-Pfad! Ich bin Pfiffer. Wunderbar, wie das Wasser aus dem Felsenteich versickert ist! Weiter vorn lichtet sich der Nebel und gibt den Blick auf das stille Wasser frei!“

**Antwort-Optionen (Ich):**
- **1.** „Erzähl mir von der Nixe und dem Teich!“ `-> mushroom_2_nixe`
- **2.** „Gibt es Gefahren am Seeufer?“ `-> mushroom_2_aquamarin`
- **3.** „Danke, Pfiffer, ich passe auf! (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `mushroom_2_aquamarin`

> **Pilzling Pfiffer:** „Der türkise Aquamarin an der Kreuzung hält die Uferpfade trocken. Doch am Seeufer selbst trügt der Schein: Das Wasser ist spiegelglatt, aber unendlich tief. Gehe behutsam an den Steg heran!“

**Antwort-Optionen (Ich):**
- **1.** „Wer wartet denn mitten im See auf mich?“ `-> mushroom_2_nixe`
- **2.** „Ich werde vorsichtig treten. (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `mushroom_2_nixe`

> **Pilzling Pfiffer:** „Mitten im See sitzt die geheimnisvolle Nixe auf einem bemoosten Felsen. Auf dem Seegrund glänzt ein verlockender Schatz – doch nimm dich in Acht: Wer ihn unbedacht begehrt, wird von einem finsteren Fluch erfasst!“

**Antwort-Optionen (Ich):**
- **1.** „Wie kann ich dem Fluch entgehen?“ `-> mushroom_2_aquamarin`
- **2.** „Ich werde auf der Hut sein. Danke! (Gespräch beenden)“ `(Aktion: close)`

---

## Pilzling Bovist
**Rolle / Ort:** Hüter der Quellsporen auf Weg 3

### Knoten: `mushroom_3_root`

> **Pilzling Bovist:** „*Puff, puff!* Puh, welch herrlicher Ausblick kurz vor der Wehrbrücke! Ich bin Bovist. Der reißende Bach liegt hinter dir – siehst du dort drüben den antiken Rundbrunnen und den mächtigen Riesen?“

**Antwort-Optionen (Ich):**
- **1.** „Wer ist dieser Riese am Wehr?“ `-> mushroom_3_riese`
- **2.** „Warum ist das Wehr eigentlich geschlossen?“ `-> mushroom_3_saphir`
- **3.** „Danke für die Auskunft, Bovist! (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `mushroom_3_saphir`

> **Pilzling Bovist:** „Das Wehr hält das Quellwasser im antiken Brunnenbecken zurück. Unten im Tal herrscht bittere Dürre – doch wenn das Wehr geöffnet wird, verliert der Riese seine Heimat und die Quelle wird fortgespült!“

**Antwort-Optionen (Ich):**
- **1.** „Lässt sich mit dem Riesen reden?“ `-> mushroom_3_riese`
- **2.** „Ein schwerer Gewissenskonflikt... (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `mushroom_3_riese`

> **Pilzling Bovist:** „Der Riese ist trotz seiner gewaltigen Statur kein Unhold – er liebt die Stille der Quelle und schützt das Wasser. Tritt über die Brücke und sprich ehrlich mit ihm!“

**Antwort-Optionen (Ich):**
- **1.** „Erzähl mir noch etwas über die Quelle.“ `-> mushroom_3_saphir`
- **2.** „Ich werde zur Brücke gehen. Danke! (Gespräch beenden)“ `(Aktion: close)`

---

## Pilzling Trüffel
**Rolle / Ort:** Hüter der Baumsporen auf Weg 4

### Knoten: `mushroom_4_root`

> **Pilzling Trüffel:** „*Schnüff, schnüff!* Mmmh, das duftet nach frischem Fichtenharz! Ich bin Trüffel. Toll, dass du den umgestürzten Stamm hinter dir gelassen hast! Der Pfad führt dich geradewegs zur Holzfällerlichtung.“

**Antwort-Optionen (Ich):**
- **1.** „Was geschieht im Holzfällerlager?“ `-> mushroom_4_weibchen`
- **2.** „Wer wacht über diesen Waldabschnitt?“ `-> mushroom_4_topas`
- **3.** „Danke, kleiner Trüffel! (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `mushroom_4_topas`

> **Pilzling Trüffel:** „Der sonnengelbe Topas an der Kreuzung erinnert daran, dass das Holz des Waldes Wärme spendet, aber Ehrfurcht verlangt. Achte auf das Knacken im Unterholz!“

**Antwort-Optionen (Ich):**
- **1.** „Wer wartet am Lagerfeuer auf mich?“ `-> mushroom_4_weibchen`
- **2.** „Ich setze meinen Weg fort. (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `mushroom_4_weibchen`

> **Pilzling Trüffel:** „Auf der Lichtung brennt das Feuer der Holzfäller. Dort wacht das geheimnisvolle Holzweibchen! Die Menschen frieren im Winter, doch wer den Wald kahl schlägt, zerstört die Heimat aller Tiere.“

**Antwort-Optionen (Ich):**
- **1.** „Erzähl mir noch etwas über den Wald.“ `-> mushroom_4_topas`
- **2.** „Ich werde mir das Lager ansehen. Danke! (Gespräch beenden)“ `(Aktion: close)`

---

## Pilzling Feuerkappe
**Rolle / Ort:** Hüter der Glutsporen auf Weg 5

### Knoten: `mushroom_5_root`

> **Pilzling Feuerkappe:** „*Uff!* Hier draußen vor dem Krater flirrt die Luft ganz gewaltig! Ich bin Feuerkappe. Du hast den feurigen Sperrwall durchquert – bewundernswert! Nur noch wenige Schritte über den Basalt, und du stehst am Abgrund des Höllenschlunds!“

**Antwort-Optionen (Ich):**
- **1.** „Wer herrscht in diesem flammenden Krater?“ `-> mushroom_5_teufel`
- **2.** „Wie gefährlich ist der Höllenschlund?“ `-> mushroom_5_rubin`
- **3.** „Danke, ich nehme mich in Acht! (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `mushroom_5_rubin`

> **Pilzling Feuerkappe:** „Der feuerrote Rubin hat dir den Pfad freigebrannt. Doch am Kraterrand brodelt die flüssige Lava unerbittlich. Halte Abstand zu den spitzen Obsidiankanten!“

**Antwort-Optionen (Ich):**
- **1.** „Was will der Teufel von den Wanderern?“ `-> mushroom_5_teufel`
- **2.** „Ich trete vorsichtig an den Rand. (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `mushroom_5_teufel`

> **Pilzling Feuerkappe:** „Inmitten des feurigen Schlundes thront der Teufel auf seinem Obsidianfelsen. Er lockt mit unermesslicher Macht und Reichtum – doch glaube keinem seiner süßen Versprechen!“

**Antwort-Optionen (Ich):**
- **1.** „Danke für die treue Warnung!“ `-> mushroom_5_rubin`
- **2.** „Ich lasse mich nicht verführen. (Gespräch beenden)“ `(Aktion: close)`

---

## Pilzling Kräuterhut
**Rolle / Ort:** Hüter der Waldkräuter auf Weg 6

### Knoten: `mushroom_6_root`

> **Pilzling Kräuterhut:** „*Hatschi!* Hier duftet es herrlich nach Thymian und Baldrian! Ich bin Kräuterhut. Prima, dass die dichten Fantasiepflanzen den Pfad freigegeben haben! Vor dir liegt der Weg zur Burg und zum Kräutergarten.“

**Antwort-Optionen (Ich):**
- **1.** „Wohin führt dieser geheimnisvolle Pfad?“ `-> mushroom_6_jaeger`
- **2.** „Was hat es mit den Heilkräutern auf sich?“ `-> mushroom_6_amethyst`
- **3.** „Gesundheit und danke, Kräuterhut! (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `mushroom_6_amethyst`

> **Pilzling Kräuterhut:** „Der violette Amethyst an der Kreuzung birgt die Weisheit der Heilung. An der Burg wachsen Kräuter, die selbst schwerste Wunden heilen können – doch wer bestimmt, wer sie pflücken darf?“

**Antwort-Optionen (Ich):**
- **1.** „Wer streitet denn dort oben an der Burg?“ `-> mushroom_6_jaeger`
- **2.** „Ich werde mir den Streit anhören. (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `mushroom_6_jaeger`

> **Pilzling Kräuterhut:** „Vor den Zinnen der Burg streiten der gestrenge Wilde Jäger und ein zweites Holzweibchen! Er wirft ihr Diebstahl vor, doch sie will nur verletzten Tieren helfen. Ein weiser Schiedsspruch wird dringend gebraucht!“

**Antwort-Optionen (Ich):**
- **1.** „Erzähl mir noch etwas über die Kräuter.“ `-> mushroom_6_amethyst`
- **2.** „Ich mache mich auf den Weg. Danke! (Gespräch beenden)“ `(Aktion: close)`

---

## Pilzling Glimmling
**Rolle / Ort:** Hüter der Tor-Aura auf Weg 7

### Knoten: `mushroom_7_root`

> **Pilzling Glimmling:** „*Psst... Wanderer!* Ich bin Glimmling, tief im Schatten des Nebelwaldes. Du hast den halben Pfad und Lupo weit hinter dir gelassen! Siehst du den steinernen Vorplatz dort vorn? Dort thront das Große Tor des Wanderlandes!“

**Antwort-Optionen (Ich):**
- **1.** „Was hat es mit dem Großen Tor auf sich?“ `-> mushroom_7_tor`
- **2.** „Wie kann dieses mächtige Portal geöffnet werden?“ `-> mushroom_7_pruefungen`
- **3.** „Danke für deine Weisheit, Glimmling! (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `mushroom_7_tor`

> **Pilzling Glimmling:** „Das Tor ist uralt, geschmiedet aus Eisenholz und gebunden mit schweren Ketten. Es trennt die Welt der sieben Prüfungen von den verborgenen Wundern dahinter. Kein Schlüssel aus Eisen wird dieses Schloss je bezwingen!“

**Antwort-Optionen (Ich):**
- **1.** „Wie kann ich das Schloss überwinden?“ `-> mushroom_7_pruefungen`
- **2.** „Ich werde mir das Tor ansehen. (Gespräch beenden)“ `(Aktion: close)`

### Knoten: `mushroom_7_pruefungen`

> **Pilzling Glimmling:** „Nur wahre Erkenntnis sprengt diese Ketten! Erkunde die Pfade, höre den Wächtern zu und meistere ihre Prüfungen. Wenn du bereit bist, wird das Tor vor deinen Augen aufspringen!“

**Antwort-Optionen (Ich):**
- **1.** „Erzähl mir noch einmal vom Tor selbst.“ `-> mushroom_7_tor`
- **2.** „Ich danke dir von Herzen, kleiner Glimmling! (Gespräch beenden)“ `(Aktion: close)`

---

