/**
 * word-collect module
 *
 * Given a text, this modules offers methods to
 * - break the text into words
 * - removes stop-words (aka noise)
 * - stemm those words (reduzing them to their base form)
 * - and counting the occurrences of these stemms
 *
 * The result is a distribution of the main words in this text, giving a quick
 * overview what it's all about.
 *
 * @module @h9h/word-collect
 */
import Words from './src/words'
import getStemmer from './src/stemmer'
import getStopwords from './src/stopwords'
import {collectWords} from './src/collector'

/**
 * API for word-collect
 */
export {
	/**
	 * @class
	 */
	Words,

	/**
	 * Constructs a stemmer for a given locale.
	 *
	 * A stemmer is a function which convert a word to it's base-form
	 */
	getStemmer,

	/**
	 * Returns an array of stopwords for a given locale.
	 * Stopwords are not collected. They are ignored.
	 */
	getStopwords,

	/**
	 * Parses a text into it's constituent words and adds those to the collection.
	 */
	collectWords
}
