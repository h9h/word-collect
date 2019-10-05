import {expectType} from 'tsd';

import {getStemmer, getStopwords, collectWords, Words} from './index'

// const words = new Words();
// words.addWord('test');
// expectType<string>(words.getWordDistribution()[0][0]);

const stemmer = getStemmer('de');
expectType<(word: string) => string>(stemmer);

const stopwords = getStopwords('de');
expectType<[string]>(stopwords);

const collect = collectWords('de', 'haus stadt');
expectType<Words>(collect);
expectType<[[string, number]]>(collect.getWordDistribution());
expectType<[[string, number]]>(collect.getWordDistribution(3));
