# Score Board

For this assignment you will creating a simple interactive score board for your favorite sport.

A User should be able to update a score and the teams playing. 


## Objectives

### Explorer Mode

Should resemble this: 
![markup](https://github.com/suncoast-devs/joint-training-curriculum-.net/raw/master/week-2/day-1/assests/scoreboard-day-1.buttons.PNG#1)


- [ ] implement the basic HTML
- [ ] implement the basic formating. Do not worry about styling (colors and fonts and the like)
- [ ] add click events to the `update` buttons to update the corresponding values on the page. The score buttons should adjust the current score by a "hard coded" value



### Adventure Mode

- [ ] Complete Explorer Mode
- [ ] Implement a Quarter/Period Tracker that would be appropriate for the sport
- [ ] Add some custom CSS to make it more colorful. Have fun with it
- [ ] Make the layout responsive

### Epic Mode

- [ ] Add a Timer that counts down automatically and updates the period/quarter appropriately 
- [ ] Save/load the information to local storage
- [ ] Add CSS to the winning teams score to indicate who is currently winning
- [ ] add anythign else that your sport would have on its score board (fouls, sacks, shots on goal, etc);


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
