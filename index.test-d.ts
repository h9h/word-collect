import {expectType} from 'tsd';

import { getStemmer } from './index'

// const words = new Words();
// words.addWord('test');
// expectType<string>(words.getWordDistribution()[0][0]);

const stemmer = getStemmer('de');
expectType<(locale: string) => string>(stemmer);
