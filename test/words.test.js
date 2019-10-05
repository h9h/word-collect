import test from 'ava'

import Words from '../src/words'
import getStemmer from '../src/stemmer'
import getStopwords from '../src/stopwords'

const {text} = require('./architekt')

test('should collect without a locale stemmer', t => {
	const tokens = text.replace(/\n/g, ' ').split(/[ .,;:\-!?()[\]@<=>%§$&#+{|}]/)
	const words = new Words()
	tokens.forEach(words.addWord)
	t.is(words.getWordDistribution().length, 243)
})

test('should collect with a german stemmer and stopwords', t => {
	const tokens = text.replace(/\n/g, ' ').split(/[ .,;:\-!?()[\]@<=>%§$&#+{|}]/)
	const words = new Words()
	words.setStemmer(getStemmer('de'))
	words.setStopwords(getStopwords('de'))
	words.addStopwords(null)
	words.addStopwords([])
	words.addStopwords(['gestaltung'])
	tokens.forEach(words.addWord)
	t.is(words.getWordDistribution().length, 187)
	t.is(words.getWordDistribution(2).length, 34)
})
