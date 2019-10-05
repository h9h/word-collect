import test from 'ava'

const german = require('../src/stemmer/german-porter-stemmer')
const stopwords = require('../src/stopwords/german-stopwords')

test('verschönern', t => {
	const result = german('verschönern')
	t.is(result, 'verschon')
})

test('Should stemm stopwords', t => {
	const stemmedStopwords = stopwords.map(w => german(w))
		.filter((w, i) => stopwords.indexOf(w) === i)

	t.is(stemmedStopwords.length, 100)
})
