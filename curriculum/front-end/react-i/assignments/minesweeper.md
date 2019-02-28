# Minesweeper

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

![](./assets/bomb-sniffer.gif)

### Explorer Mode

- [ ] Create a new game when the page loads, and render it on the screen, this look as close to gif as possible.
- [ ] Style the cells appropriately.
- [ ] Left clicking a cell performs the `check` action
- [ ] Right/secondary clicking a cell performs the `flag` action
- [ ] When the game status changed to `won` or `lost`, show a victory or failure message.

### Adventure Mode

- [ ] Before creating the game, prompt the user to choose: _Easy_, _Medium_, or _Hard_ mode.
- [ ] Have fun with the styling, make it your own

### Epic Mode

- [ ] Render your victory/failure message as it's own "_screen_".
- [ ] On that screen add a button to restart or play again.
- [ ] Store the current game id in `localStorage`, and render the same game, rather than creating a new one every time (until the player presses the restart button).
- [ ] Add sound effects.

## Additional Resources

- [ ] [React Mouse Events](https://reactjs.org/docs/events.html#mouse-events)
