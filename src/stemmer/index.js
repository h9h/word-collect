const english = require('stemmer')
const german = require('./german-porter-stemmer')
/**
 * Returns a stemmer for the given locale
 *
 * @param {string} locale the locale for which then stemmer should be returned. Default 'de'
 * @returns {*[]|*} the stemmer function
 */
function getStemmer(locale) {
	switch (locale) {
		case 'en':
			return english
		default:
			return german
	}
}

module.exports = getStemmer
