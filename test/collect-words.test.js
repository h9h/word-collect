import test from 'ava'

const {collectWords} = require('../src/collector')

test('collectWords', t => {
	const {cicero} = require('./cicero.json')
	const result = collectWords('de', cicero)
	console.log(result.getWordDistribution(5))
	t.is(result.getWordDistribution(5).length, 213)
})
