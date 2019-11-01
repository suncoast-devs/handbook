# Blackjack

When you want to entertain and challenge yourself, playing card games is a great choice. There are many classic card games like Hearts, Spades, Bid Wisk, Black Jack, War, Poker, Solitaire, Free Cell, and Euchre. You can readily engage your mind while developing strategic and logical thinking skills.

Did you know that playing cards were first invented in China around the 9th century AD (they more closely resembled dominoes than today’s paper cards), spread to India and Persia, and were later introduced in Europe in the 14th century?

Whether you consider yourself to be an expert or you’re just looking to enjoy a quick game, playing electronic cards is the way to go, no card shuffling or removing jokers is required.

In this project you will create a playable game of [Blackjack](https://en.wikipedia.org/wiki/Blackjack).

To review the basics of card game creation, see your previous assignment [All Cards On Deck!](https://github.com/suncoast-devs/handbook/raw/master/curriculum/fundamentals/modules/javascript/lessons/javascript-basics/assignments/all-cards-on-deck)


## Objectives

- Create an event-driven user interface.
- Effectively use loops, conditionals and other control structures to implement [control flows](https://en.wikipedia.org/wiki/Control_flow).
- Demonstrate usage of JavaScript objects and arrays to model resources.

## Requirements

Create a single player black jack games that plays against the house, i.e. a human player and computer dealer. You are free to create the user interface however you want, **but keep it simple for Explorer Mode**.

General Rules:

- The game should be played with a standard deck of playing cards (52).
- The house should be dealt two cards, hidden from the player until the house reveals its hand.
- The player should be dealt a hand that contains two cards, visible to the player.
- The player should have a chance to hit (i.e. be dealt another card) until they decide to stop or they _bust_ (i.e. their total is over 21 ).
- When the player stands, the house will reveal its hand and hit (i.e. draw cards) until they have 17 or more.
- If either the house or the player bust, they lose.

### Assets

- Find a set of card images [here](https://github.com/suncoast-devs/handbook/raw/master/curriculum/fundamentals/modules/javascript/_old/assignments/assets/cards.zip)
- Make an `images` folder in your project
- Extract that `cards.zip` file and then copy/move the extracted images into your project's `images` folder
- Note that the names of the images are of the form _face_ of _suit_.svg (without the spaces)

## Explorer Mode

- [ ] The player should have two choices: "Hit" and "Stand"
- [ ] Consider Aces to be worth 11, never 1.
- [ ] The page should display the the winner. For this mode, the winner is defined as who was closer to a blackjack (21) without going over.
- [ ] There should be an option to play again; this should reset the hands and reshuffle the deck.

## Adventure Mode

- [ ] Reveal one of the house's cards to the player when cards are first dealt.
- [ ] Consider aces be worth one _or_ eleven.
- [ ] Allow the player to "Split".
- [ ] Improve the win requirements. From Wikipedia:
  > Players win by not busting and having a total higher than the dealer, or not busting and having the dealer bust, or getting a blackjack without the dealer getting a blackjack. If the player and dealer have the same total (not counting blackjacks), this is called a "push", and the player typically does not win or lose money on that hand. Otherwise, the dealer wins.

## Epic Mode

- [ ] Add a betting system that carries between rounds.
- [ ] Allow the player to "Double down" or "Surrender."
- [ ] Add more Players.
