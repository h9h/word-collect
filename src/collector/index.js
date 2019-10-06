const getStemmer = require('../stemmer')
const getStopwords = require('../stopwords')
const Words = require('../words')

const collectWords = (locale, text, additionalStopwords = []) => {
	const words = new Words()

	const stopwords = getStopwords(locale)
	words.setStopwords(stopwords)
	words.addStopwords(additionalStopwords)

	const stemmer = getStemmer(locale)
	words.setStemmer(stemmer)

	if (text && text.replace) {
		const tokens = text.replace(/\n/g, ' ').split(/[ .'",;:\-!?()[\]@<=>%§$&#+{|}]/)
		tokens.forEach(words.addWord)
	}

	return words
}

module.exports = {
	collectWords
}
