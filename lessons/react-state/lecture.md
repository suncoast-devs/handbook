Theme: Next, 1

# React State

---

# State vs. Props

We have already seen properties.

```html
<NewsArticle title="SDG Announces New Cohort" body="..." />

<NewsArticle title="React Version 17 is Released" body="..." />
```

---

# Props

- Passed from parent to child
- Cannot modify inside the component
- Accessible via `this.props`

---

# What if we want to modify data?

---

# STATE

- Is a specifically named variable as part of the class
- Can be _modified_
- React knows to re-render the UI when the state is changed

---

# A step-by-step approach to building a dynamic UI

---

# Step 1 - Static implementation

- Render a static (hardcoded) version of what you want

```js
export class Counter extends React.Component {
  render() {
    return (
      <div>
        <p>The count is 0</p>
        <button>Increment</button>
      </div>
    )
  }
}
```

---

# Step 2 - Make a state object containing data

- Put a good initial/default value in the state

```js
export class Counter extends React.Component {
  state = {
    count: 0,
  }

  render() {
    return (
      <div>
        <p>The count is {this.state.count}</p>
        <button>Increment</button>
      </div>
    )
  }
}
```

---

# Step 3 - Try manually changing the value in the state.

- See that the UI changes when the state is modified

```js
export class Counter extends React.Component {
  state = {
    count: 42,
  }

  render() {
    return (
      <div>
        <p>The count is {this.state.count}</p>
        <button>Increment</button>
      </div>
    )
  }
}
```

---

# Step 4 - Connect actions

- Use the `onXXXX` methods to handle events.

```jsx
export class Counter extends React.Component {
  state = {
    count: 42,
  }

  handleClickButton = event => {
    // This isn't necessary, but it can be a good habit.
    // There is no default behavior for this button, but this would inhibit that behavior if there were.
    event.preventDefault()

    console.log('Clicked!')
  }

  render() {
    return (
      <div>
        <p>The count is {this.state.count}</p>
        <button onClick={handleClickButton}>Increment</button>
      </div>
    )
  }
}
```

---

# Now we know we can connect a method to an event.

---

# Step 5 - Update state

- For our button, we want to:
  - Get the current count from the state
  - Increment it
  - Update the state

---

[.column]

```jsx
export class Counter extends React.Component {
  state = {
    count: 42,
  }

  handleClickButton = (event) => {
    event.preventDefault()

    // Get the current count
    const currentCount = this.state.count

    // Increment
    const newCount = currentCount + 1

    // Make a new state
    const newState = {
      count: newCount,
    }

    // Tell React about the new state
    this.setState(newState)
  }
```

[.column]

```jsx
  render() {
    return (
      <div>
        <p>The count is {this.state.count}</p>
        <button onClick={handleClickButton}>Increment</button>
      </div>
    )
  }
}
```

---

# Simplify the code

---

```jsx
export class Counter extends React.Component {
  state = {
    count: 42,
  }

  handleClickButton = event => {
    event.preventDefault()

    const newState = {
      count: this.state.count + 1,
    }

    this.setState(newState)
  }

  render() {
    return (
      <div>
        <p>The count is {this.state.count}</p>
        <button onClick={handleClickButton}>Increment</button>
      </div>
    )
  }
}
```

---

# Even more simple

---

```jsx
export class Counter extends React.Component {
  state = {
    count: 42,
  }

  handleClickButton = event => {
    event.preventDefault()

    this.setState({ count: this.state.count + 1 })
  }

  render() {
    return (
      <div>
        <p>The count is {this.state.count}</p>
        <button onClick={handleClickButton}>Increment</button>
      </div>
    )
  }
}
```

---

# Steps:

- Step 1 - Static implementation

- Step 2 - Make a state object containing data

- Step 3 - Try manually changing the value in the state.

- Step 4 - Connect actions

- Step 5 - Update state

---

# A more complex example: Tic Tac Toe With an API

---

# Step 1 - Static Implementation

```jsx
export class App extends Component {
  render() {
    return (
      <div>
        <h1>
          Tic Tac Toe - <button>New</button>
        </h1>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    )
  }
}
```

---

# Step 2: Make a state using data

[.column]

- When using an API, taking the data example from the API is a great way to start.

[.column]

```js
{
  "board": [
    [
      " ",
      " ",
      " "
    ],
    [
      " ",
      " ",
      " "
    ],
    [
      " ",
      " ",
      " "
    ]
  ],
  "winner": null,
}
```

---

# Step 2 Continued:

[.column]

```jsx
export class App extends Component {
  state = {
    board: [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' '],
    ],
    id: null,
    winner: null,
  }
```

[.column]

```jsx
  render() {
    return (
      <div>
        <h1>
          Tic Tac Toe - <button>New</button>
        </h1>
        <ul>
          <li>{this.state.board[0][0]}</li>
          <li>{this.state.board[0][1]}</li>
          <li>{this.state.board[0][2]}</li>
          <li>{this.state.board[1][0]}</li>
          <li>{this.state.board[1][1]}</li>
          <li>{this.state.board[1][2]}</li>
          <li>{this.state.board[2][0]}</li>
          <li>{this.state.board[2][1]}</li>
          <li>{this.state.board[2][2]}</li>
        </ul>
      </div>
    )
  }
}
```

---

# Step 3: Try manually changing the state

[.column]

```jsx
export class App extends Component {
  state = {
    board: [
      ['X', 'O', 'X'],
      [' ', ' ', ' '],
      [' ', 'O', ' '],
    ],
    winner: null,
  }
```

[.column]

```jsx
  render() {
    return (
      <div>
        <h1>
          Tic Tac Toe - <button>New</button>
        </h1>
        <ul>
          <li>{this.state.board[0][0]}</li>
          <li>{this.state.board[0][1]}</li>
          <li>{this.state.board[0][2]}</li>
          <li>{this.state.board[1][0]}</li>
          <li>{this.state.board[1][1]}</li>
          <li>{this.state.board[1][2]}</li>
          <li>{this.state.board[2][0]}</li>
          <li>{this.state.board[2][1]}</li>
          <li>{this.state.board[2][2]}</li>
        </ul>
      </div>
    )
  }
}
```

---

# See that this affects the user interface

---

# Step 4: Connect the actions

- Define a method that will handle clicking on the cell
- We will need to know the row and column

```js
handleClickCell = (row, column) => {
  console.log(`You clicked on row ${row} and column ${column}`)
}
```

---

<!-- prettier-ignore -->
```jsx
export class App extends Component {
  state = {
    board: [
      ['X', 'O', 'X'],
      [' ', ' ', ' '],
      [' ', 'O', ' '],
    ],
    winner: null,
  }

  handleClickCell = (row, column) => {
    console.log(`You clicked on row ${row} and column ${column}`)
  }

  render() {
    return (
      <div>
        <h1>
          Tic Tac Toe - <button>New</button>
        </h1>
        <ul>
          <li onClick={() => this.handleClickCell(0, 0)}>{this.state.board[0][0]}</li>
          <li onClick={() => this.handleClickCell(0, 1)}>{this.state.board[0][1]}</li>
          <li onClick={() => this.handleClickCell(0, 2)}>{this.state.board[0][2]}</li>
          <li onClick={() => this.handleClickCell(1, 0)}>{this.state.board[1][0]}</li>
          <li onClick={() => this.handleClickCell(1, 1)}>{this.state.board[1][1]}</li>
          <li onClick={() => this.handleClickCell(1, 2)}>{this.state.board[1][2]}</li>
          <li onClick={() => this.handleClickCell(2, 0)}>{this.state.board[2][0]}</li>
          <li onClick={() => this.handleClickCell(2, 1)}>{this.state.board[2][1]}</li>
          <li onClick={() => this.handleClickCell(2, 2)}>{this.state.board[2][2]}</li>
        </ul>
      </div>
    )
  }
}
```

---

# Step 5: Update the state

- For this, we will use the Tic Tac Toe API
- The first step is to make a new game by clicking on `new`

---

```js
handleNewGame = async () => {
  // Make a POST request to ask for a new game
  const response = await fetch(
    'https://sdg-tic-tac-toe-api.herokuapp.com/game',
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    }
  )

  if (response.status === 201) {
    // Get the response as JSON
    const game = await response.json()

    // Make that the new state!
    this.setState(game)
  }
}
```

```html
<h1>Tic Tac Toe - <button onClick="{this.handleNewGame}">New</button></h1>
```

---

# See that this updates the user interface

- Test this by making the elements in the initial `board` state contain something other than spaces!
- Creating a new game should visually "reset" the board

---

[.column]

# Notice the state has some extra information in it now

- We know the _id_ of the game. Useful for future API requests.

[.column]

```js
{
  "id": 5,
  "board": [
    [
      " ",
      " ",
      " "
    ],
    [
      " ",
      " ",
      " "
    ],
    [
      " ",
      " ",
      " "
    ]
  ],
  "winner": null,
  "created_at": "2021-02-19T00:52:49.678Z",
  "updated_at": "2021-02-19T00:52:49.678Z"
}
```

---

# Now, let us update handleClickCell

```jsx
handleClickCell = async (row, column) => {
  // Generate the URL we need
  const url = `https://sdg-tic-tac-toe-api.herokuapp.com/game/${this.state.id}`

  // Make an object to send as JSON
  const body = { row: row, column: column }

  // Make a POST request to make a move
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (response.status === 201) {
    // Get the response as JSON
    const game = await response.json()

    // Make that the new state!
    this.setState(game)
  }
}
```

---

# Handle the winner

- The API gives us information about the winner.
- Let us make the header display the winner

---

# Make the header a string we generate in the code

```jsx
render() {
  const header = 'Tic Tac Toe'

  return (
    <div>
      <h1>
        {header} - <button onClick={this.handleNewGame}>New</button>
      </h1>
```

---

# Now make it dynamic

```js
const header = this.state.winner
  ? `${this.state.winner} is the winner`
  : 'Tic Tac Toe'
```

---

# Remove duplication in the creation of the game board

- Let us use `map` instead of repeating all the `li`

```jsx
<ul>
  {this.state.board.map((boardRow, rowIndex) => {
    return boardRow.map((cell, columnIndex) => {
      return (
        <li
          key={columnIndex}
          onClick={() => this.handleClickCell(rowIndex, columnIndex)}
        >
          {cell}
        </li>
      )
    })
  })}
</ul>
```

---

# Block clicks

- When there is no game
- Or when the user clicks on an occupied cell
- Or when someone has won

```js
if (
  // No game id
  this.state.id === undefined ||
  // A winner exists
  this.state.winner ||
  // The space isn't blank
  this.state.board[row][column] !== ' '
) {
  return
}
```

---

# Dynamically set the class name

- If the cell is not empty, set the class to `taken`

```jsx
<li
  key={columnIndex}
  className={cell === ' ' ? '' : 'taken'}
  onClick={() => this.handleClickCell(rowIndex, columnIndex)}
>
  {cell}
</li>
```

---

# Steps:

- Step 1 - Static implementation

- Step 2 - Make a state object containing data

- Step 3 - Try manually changing the value in the state.

- Step 4 - Connect actions

- Step 5 - Update state

- Step 5a - Use fetch to send required data to the API
- Step 5b - Use the response from fetch to get the new state
- Step 5c - Update the state

- Step 6 - Refine dynamic nature of UI based on state data
