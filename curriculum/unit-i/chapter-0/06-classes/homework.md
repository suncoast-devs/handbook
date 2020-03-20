# Blackjack

In this project, you are creating a playable game of [Blackjack](https://en.wikipedia.org/wiki/Blackjack).

## Objectives

- Practice the skills and ideas you have learned so far
- Effectively use loops, conditionals, and other control structures to implement [control flows](https://en.wikipedia.org/wiki/Control_flow)
- Demonstrate usage of data structures to model resources

## Requirements

Create a single-player blackjack game that plays against the house, i.e., a human player and computer dealer. You are free to create the user interface however you want, **but keep it simple for Explorer Mode**.

### Explorer Mode

General Rules:

- [ ] The game should be played with a standard deck of playing cards (52).
- [ ] The house should be dealt with two cards, hidden from the player until the house reveals its hand.
- [ ] The player should be dealt with two cards, visible to the player.
- [ ] The player should have a chance to hit (i.e., be dealt another card) until they decide to stop or they _bust_ (i.e., their total is over 21 ).
- [ ] When the player stands, the house reveals its hand and hit (i.e., draw cards) until they have 17 or more.
- [ ] If either the house or the player bust, they lose.

- [ ] The player should have two choices: "Hit" and "Stand."
- [ ] Consider Aces to be worth 11, never 1.
- [ ] The app should display the winner. For this mode, the winner is who is closer to a blackjack (21) without going over.
- [ ] There should be an option to play again; this should reset the hands and reshuffle the deck.

### Adventure Mode

- [ ] Reveal one of the house's cards to the player when cards dealt.
- [ ] Consider aces be worth one _or_ eleven.
- [ ] Allow the player to ["Split"](https://blog.betway.com/casino/blackjack-strategy-101-how-do-you-split-in-blackjack/).
- [ ] Improve the win requirements. From Wikipedia:
  > Players win by not busting and having a total higher than the dealer, or not busting and having the dealer bust, or getting a blackjack without the dealer getting a blackjack. If the player and dealer have the same total (not counting blackjacks), this is called a "push," and the player typically does not win or lose money on that hand. Otherwise, the dealer wins.

### Epic Mode

- [ ] Add a betting system that carries between rounds
- [ ] Allow the player to "Double down" or "Surrender."
- [ ] Add more Players
