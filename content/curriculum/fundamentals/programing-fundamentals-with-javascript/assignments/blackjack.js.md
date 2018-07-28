# Blackjack


- Create a single player black jack games that plays against the house. You  are free to create the UI however you want, but keep it simple for level 1.

- The UI should be as simple as you want to be. 

### Explorer Mode
- [ ] The game should start with a standard deck of playing cards (52) 
- [ ] The house should be dealt 2 cards, these should be hidden from the user until the house reveals its hand
- [ ] As a user I should be dealt a hand that contains 2 cards   
- [ ] The user should have a chance to hit (get another card) until they decide to stop or bust (the total is over 21 ), Aces are worth 11, not 11 or 1 
- [ ] when the user is done, the house will draw it's cards until its has more than 18 or busts
- [ ] If either the house or the player bust, then they lose automatically
- [ ] The page should then display the the winner. The winner is defined as who was closer to 21 without going over 
- [ ] there should be an option to play again, this should reset the hands and reshuffle the deck
- [ ] Add basic styling and formating, nothing too crazy

### Adventure Mode

- [ ] Limit the number of cards in a hand to no more than 5
- [ ] give the user an option to have aces be 11 or 1
- [ ] Add a betting system that carries between rounds
- [ ] Add More decks  

### Epic Mode

- [ ] Give users an option to "double down" if they get a double
- [ ] Add more Players




## Turning In

Your homework will be assigned to you via `issues` on your `assignments` repository. Once you are

These steps will be followed for almost every assignment going forward. Once you've completed at least _explorer_ mode and you're satisfied with your work, let's get it published. First let's get it up on GitHub.

- First, let's add all our work to git, and ask it to commit it:

  ```sh
  git add .
  git commit -m "My first webpage"
  ```

  Feel free to replace _"My first webpage"_ with a more meaningful message.

- Push our local commits to GitHub:

  ```sh
  git push -u origin master
  ```

  The `-u` option tells git we want to making pushing the `master` branch to `origin` the default, so next time, we can just type `git push`.

- Now that our source code is up on GitHub, let's publish our page to [Surge](https://surge.sh). The command to do this has already been setup for you:

  ```sh
  yarn deploy
  ```

Once you are completely, go to the issue on our `assignments` repository, leave the link the repo of your work, and close the issue. I will not know you are down until you close the issue. 


## Tips: 
