/// <reference types="node"/>


export function getStemmer(locale: string) : (word: string) => string;
export function getStopwords(locale: string) : [string];

