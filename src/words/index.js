/**
 * @module Words
 */

/* eslint operator-linebreak: "off" */

function hasNumber(myString) {
	return /\d/.test(myString)
}

/**
 * @class Words
 */
class Words {
	constructor() {
		this.words = new Map()
		this.stemmer = null
		this.stopwords = []

		this.setStemmer = this.setStemmer.bind(this)
		this.setStopwords = this.setStopwords.bind(this)
		this.addStopwords = this.addStopwords.bind(this)
		this.getOrCreateItem = this.getOrCreateItem.bind(this)
		this.ignoreWord = this.ignoreWord.bind(this)
		this.addWord = this.addWord.bind(this)
		this.getWords = this.getWords.bind(this)
		this.getWordDistribution = this.getWordDistribution.bind(this)
	}

	/**
	 * Sets the stemmer to be used for stemming new words.
	 *
	 * @param stemmer a stemmer function: word => stemm
	 * @returns {Words} return this
	 */
	setStemmer(stemmer) {
		this.stemmer = stemmer
		return this
	}

	/**
	 * Sets the stopwords: the array of words, which will be ignored.
	 *
	 * @param stopwords an array of words
	 * @returns {Words} return this
	 */
	setStopwords(stopwords) {
		this.stopwords = stopwords.map(w => w.toLowerCase())
		return this
	}

	/**
	 * Adds additional stopwords. This may be called repeatedly.
	 *
	 * @param stopwords an array of words
	 * @returns {Words} return this
	 */
	addStopwords(stopwords) {
		if (!stopwords || stopwords.length === 0) {
			return this
		}

		if (this.stopwords) {
			this.stopwords.push(...stopwords.map(w => w.toLowerCase()))
		} else {
			this.setStopwords(stopwords)
		}

		return this
	}

	getOrCreateItem(stemm) {
		if (this.words.has(stemm)) {
			return this.words.get(stemm)
		}

		return {
			stemm,
			links: [],
			title: null,
			count: 0
		}
	}

	ignoreWord(word) {
		const lowerCaseWord = word.toLowerCase()

		return (
			word.length === 0
			|| hasNumber(word)
			|| this.stopwords.indexOf(lowerCaseWord) > -1
		)
	}

	/**
	 * Ingest a word into the collection.
	 *
	 * @param word the word to be ingested. If it is found within the stopwords, it will be ignored.
	 * @param title an optional title under which this word will be presented
	 * @param link an optional link
	 */
	addWord(word, {title, link}) {
		if (this.ignoreWord(word)) {
			return
		}

		const lowerCaseWord = word.toLowerCase()
		const stemm = this.stemmer ? this.stemmer(lowerCaseWord) : lowerCaseWord
		const item = this.getOrCreateItem(stemm)
		item.count += 1
		item.title = title || word
		if (link) {
			item.links.push(link)
		}

		this.words.set(stemm, item)
	}

	getWords(minCount = 0) {
		return [...this.words.values()].filter(item => item.count >= minCount)
	}

	getWordDistribution(minCount = 0) {
		return [...this.words.values()].filter(item => item.count >= minCount).map(item => [item.title, item.count])
	}
}

module.exports = Words
