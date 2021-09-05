---
title: All Cards on Deck! (JavaScript)
tags: ['javascript', 'algorithms', 'enumeration']
---

In this project, you will use JavaScript to model
[a deck of playing cards](https://en.wikipedia.org/wiki/standard_52-card_deck).
You'll also add functionality to it such as shuffling and dealing.

### Shuffling Cards

Computers are notoriously bad at random numbers. This is a pretty deep and
complex topic, but it's worth pointing out that most random numbers we use in
computing are actually
"[pseudorandom](https://en.wikipedia.org/wiki/pseudorandomness)". For this
assignment, you will read about, then implement, a popular algorithm that
shuffles the order of a finite set using JavaScript's built in `Math.random()`
function as a pseudorandom number generator.

## Objectives

- Demonstrate usage of JavaScript objects and arrays to model resources
- Understand and implement algorithms
- Create an event-driven user interface

## Requirements

- Your deck should contain 52 unique cards.
- All cards should be represented as a string such as "Ace of Hearts"
- There are four suits: "Clubs", "Diamonds", "Hearts", and "Spades".
- There are 13 ranks: "Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10",
  "Jack", "Queen", and "King".

You will model these in code, in any way you see fit. It may require you to
experiment and try a number of techniques. There are _many_ valid solutions.
Your user interface should consist of a face down deck, and a face up "hand" of
cards that have been dealt.

Read about, and implement the
[Fisher–Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
algorithm:

For our purposes, `n` is `52`:

```
for i from n - 1 down to 1 do:
  j = random integer (where 0 <= j <= i)
  swap items[i] with items[j]
```

### Setup

```shell
degit $GITHUB_USER/html-css-ts-project-template AllCardsOnDeckJS
```

### Explorer Mode

- The deck should be randomly shuffled when the page is loaded.
- Clicking on the deck should deal a single card, making it visible in the
  face up hand.

## Adventure Mode

- Implement a way to deal cards into two or more hands

## Epic Mode

- Implement the game of [War][1]

[1]: https://en.wikipedia.org/wiki/War_(card_game)

## Additional Resources

### A Hint on Random Numbers

This snippet will give you a random integer, `z` between `0` and `n`:

```javascript
const z = Math.floor(Math.random() * n)
```

Let's break this down from the inside out:

1.  For this example, assume `n` is `20`.
2.  We use `Math.random()` to
    [generate a floating-point number between `0` and `1`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random).
    Let's assume our random value is `0.42`.
3.  Multiply that number by `n`. If we think of this random value as a
    percentage, multiplying these gives us a number that is some "percentage" of
    `n`. Their product is `8.4`, or 42% of `n`.
4.  We use `Math.floor()` to round down to the nearest whole number, i.e. `8`.

Because we're rounding down, it's impossible to get `20`. This will give us an
integer between `0` and `19`. This technique is perfect for finding a "random"
index in an array of length `n`.
