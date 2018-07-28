# Tic tac toe

With a partner,I want you to create a design for a tic tac toe game. Do not worry about writing code for the first level. I really want you to practice your technical design skills here and think about how you would code this. 


## Objectives

### Explorer Mode

- [ ] Submit a full design of how to approach this problem. This should include: 
  - a mock up (could be a picture of drawing) 
  - implementation details, such as how you are implementing each square
  - a list of events that you are listening to. 
  - this should contain psuedo-code on how you are handling each event, and all game logic

### Adventure Mode

- [ ] As a user I should be able to see a tic tac toe board
- [ ] as a user, the game should alternate turns
- [ ] As a user, i should be able to click in a square and play either `X` or `O` depending on whose turn it is
- [ ] As a user, when I get three in a row, I should be told i won and the game should be over 
- [ ] Create a `vs computer` mode, that picks a random square
- [ ] Modify your `vs computer` mode to follow a specific strategy (your choice) 
- [ ] Have fun with the CSS by adding colors, animations and effects to make the game more enjoyable


### Epic Mode

- [ ] Using a Min-max tree, make your computer AI unbeatable

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

