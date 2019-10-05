/*
  See http://snowball.tartarus.org/algorithms/german/stemmer.html
 */

const replaceUmlaute = word => {
	return word
		.replace(/([aeiouyäöü])u([aeiouyäöü])/g, '$1U$2')
		.replace(/([aeiouyäöü])y([aeiouyäöü])/g, '$1Y$2')
		.replace(/ß/g, 'ss')
		.replace(/ae/g, 'ä')
		.replace(/oe/g, 'ö')
		.replace(/([^q])ue/g, '$1ü')
}

function findR1AndR2(word) {
	let r1Index = word.search(/[aeiouyäöü][^aeiouyäöü]/)
	let r1 = ''
	if (r1Index > -1) {
		r1Index += 2
		r1 = word.substring(r1Index)
	}

	let r2Index = -1

	if (r1Index > -1) {
		r2Index = r1.search(/[aeiouyäöü][^aeiouyäöü]/)
		if (r2Index > -1) {
			r2Index += r1Index + 2
		}
	}

	if (r1Index > -1 && r1Index < 3) {
		r1Index = 3
	}

	return {r1Index, r2Index}
}

const removeEnding = (word, ending, r1r2Index, addand = 0) => {
	let optionIndex = word.search(ending)
	if (optionIndex > -1) {
		optionIndex += addand
		if (optionIndex >= r1r2Index) {
			return word.substring(0, optionIndex)
		}
	}

	return word
}

const findStep1Endings = word => {
	const cPos = word.search(/([bdfghklmnrt]s)$/g)
	return [
		word.search(/(em|ern|er)$/g),
		word.search(/(e|en|es)$/g),
		cPos > -1 ? cPos + 1 : cPos
	]
}

const findStep2Endings = word => {
	const bPos = word.search(/(.{3}[bdfghklmnt]st)$/g)
	return [
		word.search(/(en|er|est)$/g),
		bPos > -1 ? bPos + 4 : bPos
	]
}

const findStep3Endings = word => {
	const bPos = word.search(/[^e](ig|ik|isch)$/g)
	return [
		word.search(/(end|ung)$/g),
		bPos > -1 ? bPos + 1 : bPos,
		word.search(/(lich|heit)$/g),
		word.search(/(keit)$/g)
	]
}

const checkNonNegButLessThan = (index, index3) => index > -1 && index < index3

const searchLongestSuffix = indices => {
	let foundIndex = 10000
	let option = ''

	indices.forEach((index, i) => {
		if (checkNonNegButLessThan(index, foundIndex)) {
			option = String.fromCharCode(97 + i) // 97 == 'a'
			foundIndex = index
		}
	})

	return {option, index: foundIndex}
}

module.exports = function (givenWord) {
	let word = replaceUmlaute(givenWord)

	/*
  R1 and R2 are first set up in the standard way:
    R1 is the region after the first non-vowel following a vowel, or is the null
    region at the end of the word if there is no such non-vowel.
    R2 is the region after the first non-vowel following a vowel in R1, or is
    the null region at the end of the word if there is no such non-vowel.

  But then R1 is adjusted so that the region before it contains at least 3 letters.
  */

	const {r1Index, r2Index} = findR1AndR2(word)

	/*
  Define a valid s-ending as one of b, d, f, g, h, k, l, m, n, r or t.
  Define a valid st-ending as the same list, excluding letter r.
  */

	/*
  Do each of steps 1, 2 and 3.
  */

	/*
  Step 1:
  Search for the longest among the following suffixes,
  (a) em ern er
  (b) e en es
  (c) s (preceded by a valid s-ending)
  */
	const indices1 = findStep1Endings(word)
	const {option: optionUsed1, index: index1} = searchLongestSuffix(indices1)

	/*
  And delete if in R1. (Of course the letter of the valid s-ending is
  not necessarily in R1.) If an ending of group (b) is deleted, and the ending
  is preceded by niss, delete the final s.
  (For example, äckern -> äck, ackers -> acker, armes -> arm,
  bedürfnissen -> bedürfnis)
  */

	if (index1 !== 10000 && r1Index > -1) {
		if (index1 >= r1Index) {
			word = word.substring(0, index1)
			if (optionUsed1 === 'b') {
				if (word.search(/niss$/) > -1) {
					word = word.substring(0, word.length - 1)
				}
			}
		}
	}
	/*
  Step 2:
  Search for the longest among the following suffixes,
  (a) en er est
  (b) st (preceded by a valid st-ending, itself preceded by at least 3
  letters)
  */

	const indices2 = findStep2Endings(word)
	const {index: index2} = searchLongestSuffix(indices2)

	/*
  And delete if in R1.
  (For example, derbsten -> derbst by step 1, and derbst -> derb by
  step 2, since b is a valid st-ending, and is preceded by just 3 letters)
  */

	if (index2 !== 10000 && r1Index > -1) {
		if (index2 >= r1Index) {
			word = word.substring(0, index2)
		}
	}

	/*
  Step 3: d-suffixes (*)
  Search for the longest among the following suffixes, and perform the
  action indicated.
  end ung
  delete if in R2
  if preceded by ig, delete if in R2 and not preceded by e
  ig ik isch
  delete if in R2 and not preceded by e
  lich heit
  delete if in R2
  if preceded by er or en, delete if in R1
  keit
  delete if in R2
  if preceded by lich or ig, delete if in R2
  */

	const indices3 = findStep3Endings(word)
	const {option: optionUsed3, index: index3} = searchLongestSuffix(indices3)

	if (index3 !== 10000 && checkNonNegButLessThan(r2Index, index3 + 1)) {
		word = word.substring(0, index3)
		if (optionUsed3 === 'a') {
			word = removeEnding(word, /[^e](ig)$/, r2Index, 1)
		} else if (optionUsed3 === 'c') {
			word = removeEnding(word, /(er|en)$/, r1Index)
		} else if (optionUsed3 === 'd') {
			word = removeEnding(word, /(lich|ig)$/, r2Index)
		}
	}

	/*
  Finally,
  turn U and Y back into lower case, and remove the umlaut accent from
  a, o and u.
  */
	word = word
		.replace(/U/g, 'u')
		.replace(/Y/g, 'y')
		.replace(/ä/g, 'a')
		.replace(/ö/g, 'o')
		.replace(/ü/g, 'u')

	return word
}
