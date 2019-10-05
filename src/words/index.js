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
		this.addWord = this.addWord.bind(this)
		this.getWords = this.getWords.bind(this)
		this.getWordDistribution = this.getWordDistribution.bind(this)
	}

	setStemmer(stemmer) {
		this.stemmer = stemmer
		return this
	}

	setStopwords(stopwords) {
		this.stopwords = stopwords
		return this
	}

	addStopwords(stopwords) {
		if (!stopwords || stopwords.length === 0) {
			return this
		}

		if (this.stopwords) {
			this.stopwords.push(...stopwords)
		} else {
			this.stopwords = stopwords
		}

		return this
	}

	addWord(word, {title, link}) {
		if (word.length === 0 || hasNumber(word)) {
			return
		}

		const lowerCaseWord = word.toLowerCase()
		if (this.stopwords.indexOf(lowerCaseWord) > -1) {
			return
		}

		const stemm = this.stemmer ? this.stemmer(lowerCaseWord) : lowerCaseWord
		const item = this.words.has(stemm) ? this.words.get(stemm) : {
			stemm,
			links: [],
			title: title || word,
			count: 0
		}
		item.count += 1
		if (link) {
			item.links.push(link)
		}

		this.words.set(stemm, item)
	}

	getWords() {
		return this.words.values()
	}

	getWordDistribution(minCount = 0) {
		return [...this.words.values()].filter(item => item.count >= minCount).map(item => [item.title, item.count])
	}
}

module.exports = Words
