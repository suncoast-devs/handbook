Theme: Next, 1

# React State Flow

---

# Review our Tic Tac Toe Game

---

[.column]

```jsx
import React, { Component } from 'react'

export class App extends Component {
  state = {
    board: [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' '],
    ],
    winner: null,
  }
```

---

```jsx
handleClickCell = async (row, column) => {
  if (
    this.state.id === undefined ||
    this.state.winner ||
    this.state.board[row][column] !== ' '
  ) {
    return
  }

  console.log(`I clicked on row ${row} and column ${column}`)

  const url = `https://sdg-tic-tac-toe-api.herokuapp.com/game/${this.state.id}`

  const body = { row: row, column: column }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (response.status === 201) {
    const game = await response.json()

    this.setState(game)
  }
}
```

---

```jsx
handleNewGame = async () => {
  const response = await fetch(
    'https://sdg-tic-tac-toe-api.herokuapp.com/game',
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    }
  )

  if (response.status === 201) {
    const game = await response.json()

    this.setState(game)
  }
}
```

---

```jsx
render() {
  const header = this.state.winner
    ? `Winner is ${this.state.winner}`
    : 'Tic Tac Toe'

  return (
    <div>
      <h1>
        {header} - <button onClick={this.handleNewGame}>NEW GAME</button>
      </h1>
      <ul>
        <li className={this.state.board[0][0] === ' ' ? '' : 'taken'} onClick={() => this.handleClickCell(0, 0)}>
          {this.state.board[0][0]}
        </li>
        <li className={this.state.board[0][0] === ' ' ? '' : 'taken'} onClick={() => this.handleClickCell(0, 1)}>
          {this.state.board[0][1]}
        </li>
        <li className={this.state.board[0][0] === ' ' ? '' : 'taken'} onClick={() => this.handleClickCell(0, 2)}>
          {this.state.board[0][2]}
        </li>
       {/* Other rows removed for readability */}
      </ul>
    </div>
  )
}
```

---

# Lots of repeated code in the `li` for game cells

---

# Let us extract a component!

---

# Define the component right in the App.jsx

- Copy/paste the implementation of a specific `li`
- What else is needed?

```jsx
export class Cell extends Component {
  render() {
    return (
      <li
        className={this.state.board[0][0] === ' ' ? '' : 'taken'}
        onClick={() => this.handleClickCell(0, 0)}
      >
        {this.state.board[0][0]}
      </li>
    )
  }
}
```

---

# Needed

- row
- column
- the board
- something to handle clicking the cell

---

# Wouldn't it be nice to be able to use the parent's state!?

![inline ](https://media.giphy.com/media/FmyCxAjnOP5Di/giphy.gif)

- Well, you cannot...

---

# We can pass down the _parts_ of state we need.

- Pass down the cell's value
- Pass down the row
- Pass down the column

---

```jsx
export class Cell extends Component {
  render() {
    return (
      <li
        className={this.props.value === ' ' ? '' : 'taken'}
        onClick={this.handleClickCell}
      >
        {this.props.value}
      </li>
    )
  }
}
```

---

# Define a local click handler

```jsx
export class Cell extends Component {
  handleClickCell = () => {
    console.log(`You clicked on ${this.props.row} and ${this.props.column}`)
  }

  render() {
    return (
      <li
        className={this.props.value === ' ' ? '' : 'taken'}
        onClick={this.handleClickCell}
      >
        {this.props.value}
      </li>
    )
  }
}
```

- Do not need the inline-arrow-function trick!

---

# This is already better!

```jsx
<ul>
  <Cell row={0} column={0} value={this.state.board[0][0]} />
  <Cell row={0} column={1} value={this.state.board[0][1]} />
  <Cell row={0} column={2} value={this.state.board[0][2]} />

  <Cell row={1} column={0} value={this.state.board[1][0]} />
  <Cell row={1} column={1} value={this.state.board[1][1]} />
  <Cell row={1} column={2} value={this.state.board[1][2]} />

  <Cell row={2} column={0} value={this.state.board[2][0]} />
  <Cell row={2} column={1} value={this.state.board[2][1]} />
  <Cell row={2} column={2} value={this.state.board[2][2]} />
</ul>
```

---

# But how do we dispatch the API and update the state?

- The value is a read-only `prop` in the `Cell`
- If we did call the API in the cell, how can we _transport_ the state to the parent?
- Whatever to do?

---

# State down

- We are sending the state DOWN by doing something like `value={this.state.board[0][2]}`
- This _sends_ the **PARENT**'s state to the **CHILD** as `props`

---

# Events up

- We still have `handleClickCell` in the parent.
- `handleClickCell` does what we need.
- Rename it to `recordMove`
- And pass **the event handling function** down to the child component

---

```jsx
<Cell row={0} column={0} value={this.state.board[0][0]} recordMove={this.recordMove} />
<Cell row={0} column={1} value={this.state.board[0][1]} recordMove={this.recordMove} />
<Cell row={0} column={2} value={this.state.board[0][2]} recordMove={this.recordMove} />

<Cell row={1} column={0} value={this.state.board[1][0]} recordMove={this.recordMove} />
<Cell row={1} column={1} value={this.state.board[1][1]} recordMove={this.recordMove} />
<Cell row={1} column={2} value={this.state.board[1][2]} recordMove={this.recordMove} />

<Cell row={2} column={0} value={this.state.board[2][0]} recordMove={this.recordMove} />
<Cell row={2} column={1} value={this.state.board[2][1]} recordMove={this.recordMove} />
<Cell row={2} column={2} value={this.state.board[2][2]} recordMove={this.recordMove} />
```

---

# The Cell component can now call **UP** to the parent's `recordMove`

- This is sending the **event** (something happened) to the parent

---

```js
handleClickCell = () => {
  console.log(`You clicked on ${this.props.row} and ${this.props.column}`)

  // Send the event UPwards by calling the `recordMove` function we were given
  this.props.recordMove(this.props.row, this.props.column)
}
```

---

# Conceptual Model - State Down

```
+----------------+               +--------------+
|       App      |               |    Cell      |
|                |               |              |
|  State:        |               | Props:       |
|   value  ------------------------> value      |
|   id           |               |   row        |
|   winner       |               |   column     |
|                |     +-----------> recordMove |
|  Functions:    |     |         |              |
|   recordMove --------+         +--------------+
|                |
+----------------+
```

---

# Conceptual Model - Events Up

[.column]

```
        Cell

Cell Receives Click
Calls local onClick

Calls this.props.recordMoveProp
which is a function.

But the function is *FROM*
the App, so that is the
context of where run
```

[.column]

```
recordMove runs
in the App component

Calls the API
updates state

React sees that state
is updated and re-renders

React makes new `Cell`
components to replace
the old ones

There are new values
for `this.props.value`
so the UI draws the
*current* game.

```

---

# Code is more DRY

- There is one place for each concept

[.column]

- The `App`

  - Deals with the API
  - Manages the state
  - Renders the board
  - Tells the Cell where it lives and what to do when clicked

[.column]

- The `Cell`
  - Draws its own UI (an `li`)
  - Knows its row and column
  - Knows its value, and nothing else it needs
  - Handles a click
  - Calls the parent when clicked

---

# Separation of Concerns

- The `Cell` knows only what it needs
- The `App` does not know or care how the `Cell` renders or handles clicks

---

# Missing a Concern?

- Maybe we need a `Game` component?

- Could move the state and the `ul` rendering there.

- Where would the `New Game` button go?
  - Likely move into the `Game` component and user interface

---

# Progress!

## Extract that `Cell` component to a new file

---

# Explore some cleanup using JavaScript syntax sugar

- Object shortcut

```js
const body = { row: row, column: column }
```

- The key name `row` is the same as the name of the variable holding the value `row`
- Shortcut (structuring the object):

```js
const body = { row, column }
```

---

# Flip side.

# _De_-structuring the object

---

# `this.props.row`, `this.props.value`, `this.prop.recordMove`, ...

```jsx
export class Cell extends Component {
  handleClickCell = () => {
    console.log(`You clicked on ${this.props.row} and ${this.props.column}`)
    this.props.recordMove(this.props.row, this.props.column)
  }

  render() {
    return (
      <li
        className={this.props.value === ' ' ? '' : 'taken'}
        onClick={this.handleClickCell}
      >
        {this.props.value}
      </li>
    )
  }
}
```

---

# Destructuring

- If we have an object like

```js
const person = {
  name: 'Susan',
  favoriteColor: 'green'
  salary: 1000000
}
```

we can make local variables `name`, `favoriteColor`, and `salary` and initialize their values from the object

```js
const { name, favoriteColor, salary } = person
```

---

```js
const { name, favoriteColor, salary } = person
//       ^        ^             ^         v
//       |        |             |         |
//       |        |             |         |
//       ^--------^-------------^---------<
```

Notice the `{ }` braces are on the _left_, and the object is on the _right_

---

# Back to our `Cell`

[.column]

```jsx
handleClickCell = () => {
  const { row, column, recordMove } = this.props

  console.log(`You clicked on ${row} and ${column}`)
  recordMove(row, column)
}
```

[.column]

```jsx
render() {
  const { value } = this.props

  return (
    <li
      className={value === ' ' ? '' : 'taken'}
      onClick={this.handleClickCell}
    >
      {value}
    </li>
  )
}
```

---

# Destructuring `this.props` at the top of a function

- ... makes it feel like the properties are nice local variables.
- ... and that syntax is sometimes more straightforward and tidier.
