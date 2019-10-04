const german = require('./german-stopwords')

/**
 * Returns an array of stopwords
 *
 * @param {string} locale the locale for which stopwords should be returned. Default 'de'
 * @returns {*[]|*} the array of stopwords
 */
function getStopwords(locale) {
	switch (locale) {
		default:
			return german
	}
}

module.exports = getStopwords
