Theme: Next, 1

# React State With Fetch

---

# A more complex example: Tic Tac Toe With an API

---

# Step 1 - Static Implementation

```jsx
function App() {
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
function App() {
  const [game, setGame] = useState({
    board: [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' '],
    ],
    id: null,
    winner: null,
  })

  return (
    <div>
      <h1>
        Tic Tac Toe - <button>New</button>
      </h1>
      <ul>
        <li>{game.board[0][0]}</li>
        <li>{game.board[0][1]}</li>
        <li>{game.board[0][2]}</li>
        <li>{game.board[1][0]}</li>
        <li>{game.board[1][1]}</li>
        <li>{game.board[1][2]}</li>
        <li>{game.board[2][0]}</li>
        <li>{game.board[2][1]}</li>
        <li>{game.board[2][2]}</li>
      </ul>
    </div>
  )
}
```

---

# Step 3: Try manually changing the state

[.column]

```jsx
const [game, setGame] = useState({
  board: [
    [' ', ' ', 'O'],
    [' ', ' ', ' '],
    ['X', ' ', ' '],
  ],
  id: null,
  winner: null,
})
```

---

# See that this affects the user interface

---

# Step 4: Connect the actions

- Define a method that will handle clicking on the cell
- We will need to know the row and column

```js
function handleClickCell(row: number, column: number) {
  console.log(`You clicked on row ${row} and column ${column}`)
}
```

---

```jsx
function App() {
  const [game, setGame] = useState({
    board: [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' '],
    ],
    id: null,
    winner: null,
  })

  function handleClickCell(row: number, column: number) {
    console.log(`You clicked on row ${row} and column ${column}`)
  }

  return (
    <div>
      <h1>
        Tic Tac Toe - <button>New</button>
      </h1>
      <ul>
        <li onClick={() => handleClickCell(0, 0)}>{game.board[0][0]}</li>
        <li onClick={() => handleClickCell(0, 1)}>{game.board[0][1]}</li>
        <li onClick={() => handleClickCell(0, 2)}>{game.board[0][2]}</li>
        <li onClick={() => handleClickCell(1, 0)}>{game.board[1][0]}</li>
        <li onClick={() => handleClickCell(1, 1)}>{game.board[1][1]}</li>
        <li onClick={() => handleClickCell(1, 2)}>{game.board[1][2]}</li>
        <li onClick={() => handleClickCell(2, 0)}>{game.board[2][0]}</li>
        <li onClick={() => handleClickCell(2, 1)}>{game.board[2][1]}</li>
        <li onClick={() => handleClickCell(2, 2)}>{game.board[2][2]}</li>
      </ul>
    </div>
  )
}
```

---

# Step 5: Update the state

- For this, we will use the Tic Tac Toe API
- The first step is to make a new game by clicking on `new`

---

```js
async function handleNewGame() {
  // Make a POST request to ask for a new game
  const response = await fetch(
    'https://sdg-tic-tac-toe-api.herokuapp.com/game',
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    }
  )

  if (response.ok) {
    // Get the response as JSON
    const newGame = await response.json()

    // Make that the new state!
    setGame(newGame)
  }
}
```

```jsx
<h1>
  Tic Tac Toe - <button onClick={handleNewGame}>New</button>
</h1>
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

# Update handleClickCell

```jsx
async function handleClickCell(row: number, column: number) {
  // Generate the URL we need
  const url = `https://sdg-tic-tac-toe-api.herokuapp.com/game/${id}`

  // Make an object to send as JSON
  const body = { row: row, column: column }

  // Make a POST request to make a move
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (response.ok) {
    // Get the response as JSON
    const newGame = await response.json()

    // Make that the new state!
    setGame(game)
  }
}
```

---

# Handle the winner

- The API gives us information about the winner.
- Let us make the header display the winner

---

# [fit] Dynamically generate the header

```jsx
const header = 'Tic Tac Toe'

return (
  <div>
    <h1>
      {header} - <button onClick={handleNewGame}>New</button>
    </h1>
```

---

# [fit] Now make it depend on the winner state

```js
const header = game.winner ? `${game.winner} is the winner` : 'Tic Tac Toe'
```

---

# Remove duplication in the creation of the game board

- Let us use `map` instead of repeating all the `li`

```jsx
<ul>
  {game.board.map((boardRow, rowIndex) => {
    return boardRow.map((cell, columnIndex) => {
      return (
        <li
          key={columnIndex}
          onClick={() => handleClickCell(rowIndex, columnIndex)}
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
  game.id === undefined ||
  // A winner exists
  game.winner ||
  // The space isn't blank
  game.board[row][column] !== ' '
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
  onClick={() => handleClickCell(rowIndex, columnIndex)}
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

---

# Refining our TypeScript

- `response.json()` returns `any` so data sent to `setGame` has a data type of `any`
- also don't have a very flexible data type for our `game` state

---

# Game state

```typescript
type Game = {
  board: [
    ['X' | 'O' | ' ', 'X' | 'O' | ' ', 'X' | 'O' | ' '],
    ['X' | 'O' | ' ', 'X' | 'O' | ' ', 'X' | 'O' | ' '],
    ['X' | 'O' | ' ', 'X' | 'O' | ' ', 'X' | 'O' | ' ']
  ]
  id: null | number
  winner: null | string
}
```

---

# [fit] Game state with type for each square

```typescript
type Square = 'X' | 'O' | ' '

type Game = {
  board: [
    [Square, Square, Square],
    [Square, Square, Square],
    [Square, Square, Square]
  ]
  id: null | number
  winner: null | string
}
```

---

# Row, Row, Row (your :boat:)

```typescript
type Square = 'X' | 'O' | ' '
type Row = [Square, Square, Square]

type Game = {
  board: [Row, Row, Row]
  id: null | number
  winner: null | string
}
```

---

# Board type for game state

```typescript
type Square = 'X' | 'O' | ' '
type Row = [Square, Square, Square]
type Board = [Row, Row, Row]

type Game = {
  board: Board
  id: null | number
  winner: null | string
}
```

---

# Using game state

```typescript
const [game, setGame] = useState<Game>({
  board: [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
  ],
  id: null,
  winner: null,
})
```

---

# Using game state

```typescript
const newGame = (await response.json()) as Game
```

---

# Warning!

- `TypeScript` only checks types while in development mode!

- When we **RUN** our application, all of the type information is stripped away and nothing is checked.
- This might be improved in future versions
