---
title: Scrabble Algorithms
tags: ['algorithms']
---

Welcome to your journey as a developer. One of the core tasks a devloper does is generate algorithms. In this assignment we'll practice breaking down problem statements into algorithms.

## Objectives

- Begin working with algorithmic thinking

## Requirements

Write your answers in a _text_ file on your computer. If you have `Visual Studio Code` installed, feel free to use it. Otherwise use `Notepad` or `TextEdit`.

### Language

In the following problems you are allowed to use **any** of the following sentences, in any order you need, and as often as you need. In other activities and assignments you've been able to make up your own sentences. Here we are using a more limited set of sentences that start to reflect what computer "syntax" is like.

```
Make a memory spot with the label ____.

Turn over the scrabble tile at the position determined by the value in label ____; copy the tile to a memory spot labeled ____; turn the tile back over.

Put the number ____ in the memory spot labeled ____.

Add `1` to the value of the number at memory spot labeled ____.

Change the letter at memory spot labeled ____ to the next letter in the alphabet (if you want consider wrapping around, then consider "A" the next letter after "Z").

If the tile in memory spot with the label ____ is equal to ____ then go to step number ____.

STOP with the answer YES

STOP with the answer NO
```

### Explorer Mode

- For each of the following your algorithm has to work for _ANY_ length of scrabble tiles. I'll be trying your algorithms with many different sample sizes

- Write an algorithm for: `Given a list of "N" scrabble tiles and a starting letter, does it make a sequence?`

  - For example. "Given a list of 4 scrabble tiles and the starting letter of C, does it make a sequence". Try it with some scrabble tiles where this is true (ex C, D, E, F) and some where it does not (C, D, M, P)

- Write an algorithm for: `Given a list of "N" scrabble tiles, does a tile appear twice?`

  - For example, "Given a list of 4 scrabble tiles, does a tile appear twice?" Try it with the sequence (A, M, B, D) and expect a NO, try it with the sequence (A, M, Z, M) and expect the answer YES.

- Write an algorithm for: `Given a list of "N" scrabble tiles, are there as many vowels as consonants?`
  - For example, "Given a list of 6 scrabble tiles, are there as many vowels as consonants?" Try it with (A, Q, I, M, P, E) for a YES, and (A, E, I, O, U, X) and an answer of NO.
  - I'll let you decide if "Y" is a vowel or not.
  - If you want extra bonus points, only count Y if it is the last letter in the sequence!

### Adventure Mode

- Write an algorithm for: `Given a list of "N" scrabble tiles, does it make any sequence?`
