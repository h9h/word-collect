/// <reference types="node"/>
type stemmer = (word: string) => string;
type wordType = {
    stemm: string,
    links: [string],
    title: string,
    count: number,
}

declare class Words {
    constructor();
    public setStemmer(stemmer: stemmer): Words;
    public setStopwords(stopwords: [string]): Words;
    public addStopwords(stopwords: [string]): Words;
    public addWord(word: string): void;
    public getWords(minCount?: number): [wordType];
    public getWordDistribution(minCount?: number): [[string, number]];
}

export const getStemmer: (locale: string) => (word: string) => string;
export const getStopwords: (locale: string) => [string];
export const collectWords: (locale: string, text: string, additionalStopwords?: [string]) => Words;
