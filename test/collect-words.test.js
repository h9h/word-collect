import test from 'ava'

const {collectWords} = require('../src/collector')

test('collectWords', t => {
	const {cicero} = require('./cicero.json')
	const result = collectWords('de', cicero)
	t.is(result.getWordDistribution(5).length, 213)
})

test('Faust', t => {
	const text = `
Mephistopheles:

      Ein Teil von jener Kraft,
Die stets das Böse will und stets das Gute schafft.

Faust:

Was ist mit diesem Rätselwort gemeint?

Mephistopheles:

Ich bin der Geist, der stets verneint!
Und das mit Recht; denn alles, was entsteht,
Ist wert, daß es zugrunde geht;
Drum besser wär's, daß nichts entstünde.
So ist denn alles, was ihr Sünde,
Zerstörung, kurz, das Böse nennt,
Mein eigentliches Element.

Faust:

Du nennst dich einen Teil, und stehst doch ganz vor mir?
`
	const result = collectWords('de', text)
	console.log(result.getWordDistribution(3))

	t.is(result.getWords().length, 31)
})
