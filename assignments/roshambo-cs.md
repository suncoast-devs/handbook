---
title: Roshambo! (Rock Paper Scissors)
tags: ["c-sharp", "console", "algorithms"]
---

Create a simple Rock-Paper-Scissors game using C# in which the player plays
against a computer.

## Objectives

- Practice conditional logic
- Practice creating an algorithm

## Requirements

A gentle reminder, focus only on, and finish, explorer mode first. Then continue
to adventure mode if you have time.

### Background

See the Wikipedia page about
[Rock, Paper, Scissors](https://en.wikipedia.org/wiki/Rock%E2%80%93paper%E2%80%93scissors)

### How to get started

- Get familiar with rock, paper, scissors if you haven't played before (or in a
  while)
- Write out **ALL** the steps the application needs to take in English
- The more you plan out your process, the better things will go.

### Explorer Mode

- [ ] When the program starts the user should see a nice welcome message
      explaining they are about to play Rock, Paper, Scissors against the
      computer
- [ ] The user should see the options to chose for what they are going to throw.
      i.e., "rock", "paper", "scissor"
- [ ] The computer should
      [randomly](https://docs.microsoft.com/en-us/dotnet/api/system.random?view=netcore-3.1)
      chose which option it is going to throw.
- [ ] Your program should then compute who wins, the computer, or the user.
- [ ] The user should then see the computer's choice as well as a message
      indicating if they won or lost.
- [ ] Finally, as a final challenge of _Explorer Mode_ add some validation to
      the user input. That is, if they input a choice that isn't "rock",
      "paper", or "scissor" tell them and choose what to do. Perhaps the program
      just ends, or perhaps you can continue to ask them for input until they
      give you a valid choice.

### Adventure Mode

- [ ] Create a way for the user to choose a level of difficulty, `normal`,
      `impossible`, or `easy`.
  - In `normal` mode the game should run the game as-is from _Explorer_ mode.
  - In `impossible` mode the computer always chooses a winning option. i.e. if
    the user chose "paper", the computer will choose "scissor"
  - In `easy` mode the computer always chooses a losing option. i.e. if the user
    chose "paper", the computer will choose "rock"
- [ ] Allow the user to play again. hint:
      [while loops](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/while)

### Epic Mode

- [ ] You have heard about _Rock, Paper, Scissors_, but have you tried
      [_Rock, Paper, Scissors, Lizard, Spock_](https://bigbangtheory.fandom.com/wiki/Rock,_Paper,_Scissors,_Lizard,_Spock)?
      Modify your game to allow the extra options!
- [ ] Your game is currently only 1 vs. 1, add the ability to add more computer
      or users players to the game
