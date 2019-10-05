/// <reference types="node"/>


export const getStemmer: (locale: string) => (word: string) => string;
export const getStopwords: (locale: string) => [string];


