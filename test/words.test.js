import test from 'ava'

import Words from '../src/words'
import getStemmer from '../src/stemmer'
import getStopwords from '../src/stopwords'

test('should collect without a locale stemmer', t => {
	const tokens = text.replace(/\n/g, ' ').split(/[ .,;:\-!?()[\]@<=>%§$&#+{|}]/)
	const words = new Words()
	tokens.forEach(words.addWord)
	console.log(words.getWordDistribution())
	t.is(words.getWordDistribution().length, 243)
})

test('should collect with a german stemmer and stopwords', t => {
	const tokens = text.replace(/\n/g, ' ').split(/[ .,;:\-!?()[\]@<=>%§$&#+{|}]/)
	const words = new Words()
	words.setStemmer(getStemmer('de'))
	words.setStopwords(getStopwords('de'))
	tokens.forEach(words.addWord)
	console.log(words.getWordDistribution())
	t.is(words.getWordDistribution().length, 188)
	t.is(words.getWordDistribution(2).length, 34)
})

const text = `
Der Beruf des Architekten ist traditionell generalistisch angelegt: die 
Baumeister vergangener Zeiten erstellten in Personalunion den Entwurf und die 
Statik und beaufsichtigen den Bauablauf. Je nach Epoche kamen sie aus ganz 
verschiedenen Klassen und Berufszweigen, zum Beispiel waren sie im Römischen 
Reich meistens Militäringenieure (vgl. Vitruv), im Frühmittelalter oft Kleriker, 
im Spätmittelalter aus dem Handwerk, in der Renaissance Künstler, Bildhauer oder 
Wissenschaftler.

Die aus dem Steinmetzhandwerk und der Bauhüttentradition hervorgegangenen 
mittelalterlichen Baumeister werden in zeitgenössischen Quellen als Werkmeister 
oder magister operis bezeichnet. Nach der Gesellenprüfung als Steinmetz 
absolvierten sie eine zusätzliche Ausbildung und waren nach der Meisterprüfung 
befähigt als Architekt zu arbeiten (siehe Werkmeisterbücher).


Architekt, 1893
Erst im 19. Jahrhundert, im Zuge des ökonomischen und technischen Fortschritts 
durch die Industrialisierung, bildete sich der Beruf des Architekten als eigene 
akademische Disziplin heraus. Es gab enorme Fortschritte in der Bautechnologie, 
neue Bauaufgaben (Feuerwachen, Schulen etc.) ergaben sich. Es entstanden 
Architekturschulen und -akademien. Die dort im Regelfall kürzer ausgebildeten 
Baumeister führten weiterhin ihre auf die Umsetzung spezialisierten 
Bauunternehmungen, die akademischen Architekten spezialisierten sich auf den 
Entwurf von Gebäuden.

Zunehmend bildeten sich die Fachdisziplinen Architektur und Bauingenieurwesen 
heraus. Die Architekten beschäftigten sich schwerpunktmäßig mit der Gestaltung 
der Bauwerke des Hochbaus, die Bauingenieure erbrachten nun sämtliche Leistungen 
für die Bauwerke des Tief- und Ingenieurbaues und planten das Tragwerk für 
Hochbauten, ebenso wurden sie oft in der Bauleitung für Hochbauten tätig. 
Die Komplexität der Aufgaben nahm seitdem kontinuierlich weiter zu, so dass sich 
im 20. Jahrhundert weitere Fachdisziplinen etablierten: Städtebau, 
Landschaftsarchitektur, Innenarchitektur, Bauphysik etc.

Gegen Ende des 20. Jahrhunderts kamen Berufe hinzu, die viele Aufgaben des 
klassischen Architekten übernahmen. Baumanagement und Facilitymanagement 
übernahmen die Koordination der Bauausführung, große Unternehmen boten komplette 
Planungs- und Ausführungspakete an, so dass sich traditionelle Aufgabenfelder 
der Architekten verlagerten. In manchen Bereichen ist auch in Deutschland ein 
Rückzug der Architekten auf den Aspekt des Entwerfens zu beobachten, wie dies 
in den USA zum Beispiel schon weit verbreitet ist.

Der Trend zur Spezialisierung macht heute auch vor dem an sich generalistisch 
angelegten Architektenberuf nicht halt. Neben dem Architekten, der sich 
hauptsächlich mit Hochbau beschäftigt, gibt es in Deutschland noch die 
Berufsgruppen der Landschaftsarchitekten, Innenarchitekten und Stadtplaner. 
Weiterhin findet in den einzelnen Büros eine zunehmende Spezialisierung auf 
bestimmte Bauaufgaben (Verwaltungs- und Gewerbebau, Kulturbau, Wohnungsbau etc.) 
oder auf bestimmte Leistungsphasen der Honorarordnung für Architekten und 
Ingenieure (z. B. Wettbewerbsmanagement, Entwurf, Ausführungsplanung, 
Ausschreibung oder Bauleitung) statt. Überdies lässt sich eine weitere 
Spezialisierung auf bestimmte Nischen feststellen, wie z. B. das ökologische 
Bauen oder die Sanierung von Altbauten beobachten.    `
