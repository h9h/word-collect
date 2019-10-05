/* eslint operator-linebreak: "off" */

function hasNumber(myString) {
	return /\d/.test(myString)
}

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

	setStemmer(stemmer) {
		this.stemmer = stemmer
		return this
	}

	setStopwords(stopwords) {
		this.stopwords = [...stopwords]
		return this
	}

	addStopwords(stopwords) {
		if (!stopwords || stopwords.length === 0) {
			return this
		}

		if (this.stopwords) {
			this.stopwords.push(...stopwords)
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
