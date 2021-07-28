---
title: Number Guesser (C#)
tags: ['c-sharp', 'algorithms', 'methods']
---

In this project, you will use C# to recreate the favorite childrens game of _"I'm thiking of a number between 1 and ...."_

In this game, the _code_ will try to guess the number the player is thinking of.

## Objectives

- Demonstrate usage of methods to organize code.
- Understand and implement algorithms.
- Understand loops.

## Requirements

- Your program should be able to handle a person thinking of a number between 1 and 1024.
- Your program should assume the human player would answer any guess truthfully.

> NOTE: The more you plan this out (focus on the _algorithm_) the better you will do.

### Setup

```shell
dotnet new sdg-console -o NumberGuesser
```

### Explorer Mode

- Once the program starts, you should display a greeting to the user describing the challenge.
- Prompt the user with your guess and allow them to tell you if their number is higher, lower, or correct.
- Keep refining your guess until you have the correct answer.
- Use methods to organize your code. Here are some suggestions for methods you might use:
  - `ShowGreeting`
  - `ComputeNewLowIfTooLow`
  - `ComputeNewHighIfTooHigh`
  - `BragWhenCorrect`
- Use at least _one_ or _two_ methods

## Adventure Mode

- Allow the user to choose the maximum number for their range.
- Tell them the most number of guesses your code will need!
- Prompt the user to play again at the end of the game.

## Epic Mode

- Keep track of how many guesses each game has taken and show the _average_ number of guesses your code has used. For instance, if you've played three games and took `4`, `6`, and `2` guesses, your average would be `4`.
