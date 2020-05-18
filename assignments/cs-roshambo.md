---
title: Roshambo - Rock Paper Scissors!
---

<!-- prettier-ignore-start -->

# Rock Paper Scissors!

Create a simple Rock-Paper-Scissors game using C# in which the player plays against a computer.

## Objectives

- Practice conditional logic
- Practice creating an algorithm

## Requirements

A gentle reminder, do explorer mode first, then move on to adventure if you wish.

### Background

See the Wikipedia page about [Rock, Paper, Scissors](https://en.wikipedia.org/wiki/Rock%E2%80%93paper%E2%80%93scissors)

### How to get started

- Get familiar with rock, paper, scissors if you haven't played before (or in a while)
- Write out **ALL** the steps the application needs to take in English
 - The more you plan out your process, the better things will go.

### Explorer Mode

- [ ] As a user, I should see a welcome message.
- [ ] As a user, I should see the options I can throw (i.e., "rock", "paper",
      "scissor")
- [ ] Don't let the user enter an invalid choice for a throw.
- [ ] The computer should [randomly](https://docs.microsoft.com/en-us/dotnet/api/system.random?view=netcore-3.1) decide something to throw.
- [ ] Your program should then determine a winner.
- [ ] The user should see the user's throw, the computers throw, and who the winner is.

### Adventure Mode

- [ ] Create a way for the user to choose a level of difficulty, `normal`,
      `impossible`, or `easy`.
  - `normal` should run the game as in explorer mode.
  - `impossible` mode always allows the computer to cheat and always choose the winning option (e.g. if the user picked `paper`, the computer always select `scissor`)
  - `easy` mode always chooses the losing option (e.g. if the user picked `paper`, then the computer always select `rock`)
- [ ] Allow the user to play again. hint:
      [while loops](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/while)

### Epic Mode

- [ ] You have about `Rock, Paper, Scissors`, but have you tried, [`Rock, Paper, Scissors, Lizard Spock`](https://bigbangtheory.fandom.com/wiki/Rock,_Paper,_Scissors,_Lizard,_Spock). Modify your game to allow the extra options.
- [ ] Your game is currently only 1 vs. 1, add the ability to add more computers or users to the game.

<!-- prettier-ignore-end -->
