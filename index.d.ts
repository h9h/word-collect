/// <reference types="node"/>
type stemmer = (word: string) => string;
type wordType = {
    stemm: string,
    links: [string],
    title: string,
    count: number
}

declare class Words {
    constructor();
    setStemmer(stemmer: stemmer): Words;
    setStopwords(stopwords: [string]): Words;
    addStopwords(stopwords: [string]): Words;
    addWord(word: string): void;
    getWords(minCount?: number): [wordType];
    getWordDistribution(minCount?: number): [[string, number]];
}

export const getStemmer: (locale: string) => (word: string) => string;
export const getStopwords: (locale: string) => [string];
export const collectWords: (locale: string, text: string, additionalStopwords?: [string]) => Words;
