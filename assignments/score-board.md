---
title: Score Board
tags: ['javascript', 'dom']
---

For this assignment, you are creating a simple interactive scoreboard for your favorite sport.

## Requirements

- Refer to this mockup to design your page:

![](./assets/scoreboard.png)

- A user should be able to update a score and the teams playing.
- Use these HTML and CSS files as starting content:
  - [HTML](https://raw.githubusercontent.com/suncoast-devs/scoreboard-template/master/index.html)
  - [CSS](https://raw.githubusercontent.com/suncoast-devs/scoreboard-template/master/screen.css)

### Setup

```shell
app-app --beta Scoreboard
```

### Explorer Mode

#### Part 1:

- [ ] Create a new project using the `beta` stack and implement the design using the given HTML & CSS.
- [ ] Update the CSS to improve the styling based on your own design and tastes.
- [ ] Avoid updating the HTML too much, try to use existing elements and classes. However, do add new classes or elements for your design or your JavaScript if needed.
- [ ] Assign an event to the input fields to automatically change the team's name as the user types.
- [ ] Assign click events to the buttons to update the corresponding values on the page. The score buttons should adjust the current score by a "hard-coded" value.
- [ ] Deploy your site.

#### Part 2:

- [ ] Add an `if` statement to stop each team's score from going below 0.
- [ ] Add an `if` statement to stop each team's score from going above 21.
- [ ] When a team gets 21 points, display a message to the user of who won.
- [ ] Add a `reset` button that resets the scoreboard back to each team having 0 points.

### Adventure Mode

- [ ] Add more CSS to the winning teams score to indicate who won.
- [ ] Implement a Quarter/Period Tracker that would be appropriate for the sport.
- [ ] Add some styling to make it more presentable. Have fun with it.
- [ ] Make the layout responsive.

### Epic Mode

- [ ] Add a Timer that counts down automatically and updates the period/quarter appropriately.
- [ ] Save/load the information to local storage.
- [ ] Add anything else that your sport would have on its scoreboard (e.g., fouls, sacks, shots on goal).
- [ ] Improve the ease of use for score keeping in your sport.
