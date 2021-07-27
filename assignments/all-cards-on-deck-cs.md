---
title: All Cards on Deck! (C#)
tags: ['c-sharp', 'algorithms', 'enumeration']
---

In this project, you will use C# to model [a deck of playing cards](https://en.wikipedia.org/wiki/standard_52-card_deck). You'll also add functionality such as shuffling and dealing.

## Objectives

- Demonstrate usage of `List` or arrays to model resources.
- Understand and implement algorithms.
- Understand loops.

## Requirements

- Your deck should contain 52 unique cards.
- All cards should be represented as a string such as "Ace of Hearts"
- There are four suits: "Clubs", "Diamonds", "Hearts", and "Spades".
- There are 13 ranks: "Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10",
  "Jack", "Queen", and "King".

You will model these in code, in any way you see fit. It may require you to experiment and try several techniques. There are _many_ valid solutions.

> NOTE: The more you plan this out (focus on the _algorithm_) the better you will do.

### Shuffling Cards

This assignment will ask you to shuffle the cards

You should implement the [Fisher–Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) algorithm. The shuffling algorithm starts with the last element in our collection (in our case a deck of cards) and swaps it with a randomly selected element that comes before it. This continues downward through the elements towards the first element.

> TOP TIP: Watch the first few minutes [of this video](https://www.youtube.com/watch?v=tLxBwSL3lPQ) for a visual description of the algorithm.

If we were going to write an _algorithm_ for this we would write something like:

```
numberOfCards = length of our deck

for rightIndex from numberOfCards - 1 down to 1 do:
  leftIndex = random integer that is greater than or equal to 0 and LESS than rightIndex. See the section "How do we get a random integer")

  Now swap the values at rightIndex and leftIndex by doing this:
    leftCard = the value from deck[leftIndex]
    rightCard = the value from deck[rightIndex]
    deck[rightIndex] = leftCard
    deck[leftIndex] = rightCard
```

_hint:_ understand the algorithm before you try to implement it.

### How do we get a random integer like the algorithm asks us to?

As we have seen, computers do _exactly_ what we tell them to do. Thus, computers are bad at generating truly random numbers. Randomness is a deep and complex topic, but it's worth pointing out that most random numbers we use in computing are what we call "[pseudorandom](https://en.wikipedia.org/wiki/pseudorandomness)". That is, they generate numbers that appear to be random such that _guessing_ the next random number the computer's fixed algorithm is going to generate is very difficult. This makes it _good enough_ for most purposes. For this assignment, you will read about, then implement, a popular algorithm that shuffles a list using C#'s built-in `Random.Next()` function as a pseudorandom number generator.

> Hint: Here is an example of code that gives us a random number greater, or equal to `0` and less than `956`.

```csharp
var randomNumberGenerator = new Random();
var randomNumber = randomNumberGenerator.Next(956);
```

When using this code you could replace the specific value `956` with `rightIndex` like in the algorithm.

### Setup

```shell
dotnet new sdg-console -o AllCardsOnDeckCS
```

### Resources

- [Microsoft documentation on List](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1?view=netcore-3.1)
- [Handbook Array and List](https://handbook.suncoast.io/cs-arrays)
- [Handbook Loops](https://handbook.suncoast.io/cs-loops)
- [Handbook List quick reference](https://handbook.suncoast.io/lessons/misc-quick-reference/cs-list)

### Explorer Mode

- Once the program starts, you should create a new deck.
- After deck creation, you should shuffle the deck.
- After the deck is shuffled, display the top two cards.

## Adventure Mode

- In addition to displaying the top two cards, also store these two "dealt" cards in a variable named `playerHand`. Consider what _type_ of variable `playerHand` will have to be.
- Implement a way to deal cards into two _different_ hands.

## Epic Mode

- Implement the game of [War][1]

[1]: https://en.wikipedia.org/wiki/War_(card_game)
