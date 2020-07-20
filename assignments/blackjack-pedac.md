---
title: Blackjack PEDA (but no C)
tags: ['algorithms', 'pedac']
---

In this project, you are creating a playable game of
[Blackjack](https://en.wikipedia.org/wiki/Blackjack). If you haven't played this
game ever, or in a while, grab a deck of cards and play a few games.

## Objectives

- Practice the skills and ideas you have learned so far.
- Effectively use loops, conditionals, and other control structures to implement
  [control flows](https://en.wikipedia.org/wiki/Control_flow)
- Demonstrate usage of data structures to model resources.

## Requirements

Create a single-player blackjack game that plays against the house, i.e., a
human player and computer dealer. You are free to create the user interface
however you want, **but keep it simple for Explorer Mode**.

General Rules:

- [ ] The game should be played with a standard deck of playing cards (52).
- [ ] The house should be dealt two cards, hidden from the player until the
      house reveals its hand.
- [ ] The player should be dealt two cards, visible to the player.
- [ ] The player should have a chance to hit (i.e. be dealt another card) until
      they decide to stop or they _bust_ (i.e. their total is over 21). At which
      point they lose regardless of the dealer's hand.
- [ ] When the player stands, the house reveals its hand and hits (i.e. draw
      cards) until they have 17 or more.
- [ ] If dealer goes over 21 the dealer loses.

- [ ] The player should have two choices: "Hit" and "Stand."
- [ ] Consider Aces to be worth 11, never 1.
- [ ] The app should display the winner. For this mode, the winner is who is
      closer to a blackjack (21) without going over.
- [ ] Ties go to the DEALER
- [ ] There should be an option to play again. This should start a new game with
      a new full deck of 52 shuffled cards and new empty hands for the dealer
      and the player.

# Explorer Mode

- Generate a PEDA plan for your game. Don't worry about the "C"ode yet.
  - Redescribe the "P"roblem.
  - Demonstrate some "E"xamples of various player and dealer card situations.
    For example, if the player started with the 4 of clubs and the 5 of diamonds
    but then hit once to get the ten of spades before staying. Then the dealer
    revealed the 8 of clubs and the ten of diamonds. What happens, who wins. Do
    at least six of these types of examples
  - Figure out your "D"ata structure
    - This should list all of the classes you think you will create and their
      STATE (properties) and BEHAVIOR (methods). Here is a first hint. You will
      likely have a `Card` class that has two properties, a `Face` and a `Suit`
      and one method, `Value` that will compute how many points the card is
      worth.
    - Read the rest of the problem and figure out what other real world things
      you want to represent. They should have distinct properties and behaviors.
  - Figure out the "A"lgorithm for playing.
    - Can you write a step by step algorithm for playing the game?
    - You should be able to turn these instructions over to someone else and
      have them follow them step-by step like a recipe.
