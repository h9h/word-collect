import test from 'ava'

const {collectWords} = require('../src/collector')

test('collectWords', t => {
	const {cicero} = require('./cicero.json')
	const result = collectWords('de', cicero)
	t.is(result.getWordDistribution(5).length, 213)
})
