---
title: Minesweeper
tags: ['javascript', 'react']
---

In this assignment, you will communicate with a back-end API server to create the user-interface for a [Minesweeper][1] clone. It might help to [familiarize yourself](https://www.youtube.com/watch?v=7B85WbEiYf4) with the game if you've never played it.

[1]: https://en.wikipedia.org/wiki/Minesweeper_(video_game)

## Objectives

- Understand how state drives changes to an interface in React
- Respond to user events in React
- Understand and use REST APIs
- Use React lifecycle methods
- Understand and interpret API documentation
- Use `fetch` or `axios` to perform `POST` request or

## Requirements

Read over the documentation for the API we'll be using:

`https://minesweeper-api.herokuapp.com/`

You will need to interpret the response and render a graphical user interface. The API results include an array of arrays (two-dimensional array), these represent _rows_ and _columns_. These are probably best translated into table rows (`<tr>`) and table data (`<td>`) cells.

Here's an example implementation of this assignment:

![](https://github.com/suncoast-devs/handbook/raw/master/assignments/assets/bomb-sniffer.gif)

### Setup

```shell
app-app --gamma-hooks Minesweeper
```

## Additional Resources

- [React Mouse Events](https://reactjs.org/docs/events.html#mouse-events)
- [JavaScript Fetch API Quick Reference](https://handbook.suncoast.io/lessons/misc-quick-reference/js-fetch)
- [AXIOS a better "fetch" for JavaScript](https://handbook.suncoast.io/lessons/misc-quick-reference/axios)
- [Brief, but good article on using two-dimensional-arrays in React](https://www.pluralsight.com/guides/display-multidimensional-array-data-in-react)
- Use Insomnia to test out the API, try "playing" games with the API. This will help you understand the "flow" of the game via the API.

### Explorer Mode

- Create a new game when the page loads, and render it on the screen, use the animated gif above as a user interface guide. Do at least that much, but also feel free to _have fun_.
- Style the cells appropriately.
- Left clicking a cell performs the `check` action
- Right/secondary clicking a cell performs the `flag` action
- When the game status changed to `won` or `lost` a victory or failure message - Don't use `alert` for this, update the user interface.
- Not required in explorer mode, but as a mid-challenge before tackling Adventure Mode: add a button that allows the user to make a new game. The user could abandon their current game or start a new one after winning or losing. Use state/events to do this, no reloading the page.

### Adventure Mode

- Before creating the game, prompt the user to choose: _Easy_, _Medium_, or _Hard_ mode.
- Have fun with the styling, make it your own.

### Epic Mode

- Learn how to use `localStorage` API to store data in the browser. Use this to allow the user to close the browser window and come back to a game already in progress.
- Add sound effects.
