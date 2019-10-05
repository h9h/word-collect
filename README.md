# word-collect
Simple Library to collect word-sets, optionally using stemming algorithms

[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![npm version](http://img.shields.io/npm/v/REPO.svg?style=flat)](https://npmjs.org/package/@h9h/words-collect "View this project on npm")
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9baa6478b87a45f6bc73b5c8ac63edd6)](https://www.codacy.com/manual/h9h/word-collect?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=h9h/word-collect&amp;utm_campaign=Badge_Grade)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

## Usage

```
const { collectWords } = require('../src/collector')

const text = '...'

const result = collectWords('de', text)
console.log(result.getWordDistribution(3))
```

### Example

**Mephistopheles:**

Ein Teil von jener Kraft,
Die stets das Böse will und stets das Gute schafft.

**Faust:**

Was ist mit diesem Rätselwort gemeint?

**Mephistopheles:**

Ich bin der Geist, der stets verneint!
Und das mit Recht; denn alles, was entsteht,
Ist wert, daß es zugrunde geht;
Drum besser wär's, daß nichts entstünde.
So ist denn alles, was ihr Sünde,
Zerstörung, kurz, das Böse nennt,
Mein eigentliches Element.

**Faust:**

Du nennst dich einen Teil, und stehst doch ganz vor mir?

### Result:

```
Array(1)
    Array(2)
        0 = "stets"  // Word
        1 = 3        // Count
```

## @h9h/word-collect
word-collect module

Given a text, this modules offers methods to
- break the text into words
- removes stop-words (aka noise)
- stemm those words (reduzing them to their base form)
- and counting the occurrences of these stemms

The result is a distribution of the main words in this text, giving a quick
overview what it's all about.

