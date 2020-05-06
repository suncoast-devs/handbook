---
title: Rock Paper Scissors!
---

Create a simple Rock-Paper-Scissors game using C# in which the player plays against a computer.

## Objectives

- Practice conditional logic
- Practice creating an algorithm

## Requirements

A gentle reminder, do explorer mode first, then focus on the adventure.

### Background

See the wikipedia page about [Rock, Paper, Scissors](https://en.wikipedia.org/wiki/Rock%E2%80%93paper%E2%80%93scissors)

### How to get started

- Get familiar with rock, paper, scissors if you haven't played before (or in a while)
- Write out in English, ALL the steps the application needs to take

### Explorer Mode

- [ ] As a user, I should see a welcome message.
- [ ] As a user, I should see the options I can pick (ie, "rock", "paper", "scissor")
- [ ] The computer should [randomly](https://docs.microsoft.com/en-us/dotnet/api/system.random?view=netcore-3.1) decide one of the options.
- [ ] You program should then decide who the winner is;
- [ ] The user should then see the randomly selected option, as well as a win or lose message.

### Adventure Mode

- [ ] Create a way for the user to choose a level of difficult, `normal`, `impossible`, or `easy`
  - `normal` should run the game as in explorer mode above
  - `impossible` will always choose the winning option (if the user picked `paper`, then the computer will always select `scissor`)
  - `easy` will always choose the losing option (if the user picked `paper`, then the computer will always select `rock`)
- [ ] Allow the user to play again. hint: [while loops](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/while)

### Epic Mode

- [ ] You have about `rock, paper, scissors`, but have you tried, `rock paper scissors lizard spock`. Modify your game to allow the extra options
- [ ] Your game is currently only 1 vs 1, add the ability to add more computer or users players to the game
