---
title: React State With Fetch
---

# A more complex example: Tic Tac Toe With an API

In [React State](/lessons/react-state) we saw how to use the `useState` hook to
manage data that is changing in response to a user event. We built a simple
component that counted the number of times we clicked on a button. Managing this
kind of data is known as `local state`. The other type of state is
`remote state` or `remote data` or `server state`. Let's extend our knowledge of
`state` by interacting with a remote API.

The API we'll be using for this example is an
[unbeatable Tic Tac Toe API](https://sdg-tic-tac-toe-api.herokuapp.com/). Read
the API to get familiar with how it works. You'll notice that there are three
main endpoints:

- Create a new game

- Make a move in a game

- Get the state of a game

We'll be using those API endpoints during this example.

# Revisiting our dynamic application workflow

For this implementation we'll again revisit our five phases of building a
dynamic app.

1. Static Implementation
2. Make a state object containing data
3. Try manually changing the value in the state
4. Connect actions (later on, we'll add API interaction here)
5. Update state

## Step 1 - Static Implementation

We'll begin by designing our Tic Tac Toe game.

### Here is our JSX

```jsx
export function App() {
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

### Here is some sample CSS

```css
:root {
  /* CSS Variables for all the font colors and sizes. Try changing these! */
  --header-background: #5661b3;
  --header-text-color: #fff9c2;
  --header-font-size: 2rem;
  --square-font-size: calc(8 * var(--header-font-size));
  --square-text-color: #5661b3;
  --square-background-color: #e6e8ff;
  --square-border: 3px solid var(--square-text-color);

  font: 16px / 1 sans-serif;
}

html {
  height: 100%;
}

body {
  margin: 0;
  min-height: 100%;
}

h1 {
  /* center the header */
  text-align: center;

  /* Use a sans serif font with a little spacing and color */
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  letter-spacing: 0.4rem;
  font-size: var(--header-font-size);
  color: var(--header-text-color);

  /* Remove margins and set a little padding */
  margin: 0;
  padding: var(--header-font-size);

  /* Set a background color for the header */
  background-color: var(--header-background);
}

ul,
li {
  /* Be gone margins! */
  margin: 0;
  padding: 0;

  /* and list styles */
  list-style: none;
}

ul {
  /* Make the height of the list equal to the height of the page MINUS the height taken by the header */
  height: calc(100vh - 3 * var(--header-font-size));

  /* Display the list as a 3 column and three row grid */
  display: grid;
  grid-template: 1fr 1fr 1fr / 1fr 1fr 1fr;

  /* Add a little gap between to allow the background color through */
  gap: 1rem;

  /* Set the background color that will show through the gap */
  background-color: var(--square-text-color);
}

ul li {
  /* Use a monospace font */
  font-family: monospace;
  font-size: var(--square-font-size);

  /* Style the background color of the item */
  background-color: var(--square-background-color);

  /* Make the cursor a pointer by default */
  cursor: pointer;

  /* Center the text in the LI */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 1s font-size ease-in-out;
}

ul li.taken {
  cursor: not-allowed;
}

ul li.small {
  font-size: 4rem;
}

ul li.not-allowed-click {
  background-color: red;
}
```

### Try changing some of the `<li>` entries

This static implementation should allow us to put `X` and `O` elements in any of
the `<li>` elements and see that the board renders correctly.

Take a moment and change some of these entries and see that the UI shows what we
want. This is an important step as we want to validate that as we fill in our
state, and use it to populate the board, we can see a game of `X` and `O`.

When done, make sure all the entries are blank again.

## Step 2: Make a state using data

When we are using an API we want to use a state with the same "shape"
(structure) as the API uses. Looking at the API response of a new game we'll see
it generates data like this:

```json
{
  "winner": "X",
  "id": 42,
  "board": [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ]
}
```

We should use good default values for our initial state, so we'll make the
`winner` and `id` values equal to `null` to indicate we don't have any values.
We'll leave the `board' equal to the two-dimensional array of strings.

```js
const [game, setGame] = useState({
  board: [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
  ],
  id: null,
  winner: null,
})
```

We can then update the static representation of our `<li>` game board:

```jsx
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
```

We'll use `board[0]` to represent the first **row** of squares, then
`board[0][0]` is the first square on that row, `board[0][1]` the second, and
`board[0][2]` the last. The same will be true of the remaining rows.

## Step 3 - Try manually changing the state

Now try replacing a few of the empty strings with some `X` and `O` values that
you might see in a real game of Tic Tac Toe.

We should see the game board render with the appropriate values in the squares!

## Step 4 - Connect the actions

We will begin by defining a method that will handle clicking on a cell.

In this case we'll need to know the row and column of the cell so we might write
our `handleClickCell` method like this:

```js
function handleClickCell(row, column) {
  console.log(`You clicked on row ${row} and column ${column}`)
}
```

Notice here we aren't using the typical function that takes an `event`. This is
because we need additional context to handle clicking. We'll deal with this by
writing a slightly different `onClick` method for each of the `<li>`

```jsx
<li onClick={() => handleClickCell(0, 0)}>{game.board[0][0]}</li>
```

In this case, the value of the `onClick` is itself an arrow function! However,
we have placed it **inline**. By doing this, we can specify the row and column
values.

The way to think about `onClick={() => handleClickCell(0, 0)}` is this:

> When you click on this specific `li`, call the function
> `() => handleClickCell(0,0)` -- When that function is called **it** will call
> `handleClickCell` and specify `0` as the `row` and `0` as the `column`.

So we might do the same with the remaining `li`

```jsx
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
```

Try clicking on each of the cells on the board, and we should see messages in
our developer console that matches up with the row and column we have been
clicking!

## Step 5 - Update the state

For this, we will use the Tic Tac Toe API. Reading the API, it appears we need
to "Create a new game" to get a "Game ID" so that we can register moves.

We'll make a small change to our UI to add a button:

```jsx
<h1>
  Tic Tac Toe - <button onClick={handleNewGame}>New</button>
</h1>
```

And we will define a function `handleNewGame` that uses the API:

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

  if (response.status === 201) {
    // Get the response as JSON
    const newGame = await response.json()

    // Make that the new state!
    setGame(newGame)
  }
}
```

This function uses the API to send a request to make a new game. Because we
designed our state to **exactly** match what the API returns, all we need to do
is take the `JSON` object that it returns and place it in the state.

```js
// Get the response as JSON
const newGame = await response.json()

// Make that the new state!
setGame(newGame)
```

Try this a few times in the UI. Use the `React Developer Tools` to look at the
`state` of our component after clicking the new game button. You should see an
empty board but with a new `id` value each time!

You could also try making the initial state something other than a blank board.
You would see that making a new game will _reset_ it. **Don't forget to put the
default state back to an array of empty strings!**

The `id` within the `state` will help us when we need to record the game actions
on a click.

### Update handleClickCell

When we click a cell, we need to build an API request to send to the server. The
response we get back, as we did with `handleNewGame`, will be in exactly the
form to use with `setGame`.

That code looks like:

```js
async function handleClickCell(row, column) {
  // Generate the URL we need
  const url = `https://sdg-tic-tac-toe-api.herokuapp.com/game/${game.id}`

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
    const newGame = await response.json()

    // Make that the new state!
    setGame(newGame)
  }
}
```

Other than sending the url, sending a `body` containing the `row` and `column`
information, the structure of this code is very similar to `handleNewGame`. This
includes the processing of the response:

```js
// Get the response as JSON
const newGame = await response.json()

// Make that the new state!
setGame(newGame)
```

So as we make a move, we should see the API send us back a game state.

This game state will have our recorded move, but it will also have **the
computer's move as well**

Make a new game and try a few moves!

### Handle the winner

The API will also tell us the winner of the game. We can make the header display
the winner information.

To do this, we'll first extract the static data to a variable.

```jsx
  const header = 'Tic Tac Toe'

  return (
    <div>
      <h1>
        {header} - <button onClick={handleNewGame}>New</button>
      </h1>
```

Now we can make this string dynamic by using a
[ternary](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)
operator.

```js
const header = game.winner ? `${game.winner} is the winner` : 'Tic Tac Toe'
```

And with this, we have a playable Tic Tac Toe game that demonstrates how to use
an API and React State to make an interactive app!

## Improve the code

We can improve the code to remove some duplication in the drawing of the game
board.

We can use `map` to generate the elements of the board. In this case, since we
have an _array of arrays_ we'll have to use **two** `map` calls. The outer one
will loop through the `rows` and the inner one will loop through the `columns`

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

Two dimensional arrays can be tricky at first so study this code. Maybe some
`console.log` will help make the code more clear:

```jsx
<ul>
  {game.board.map((boardRow, rowIndex) => {
    console.log(`The rowIndex is ${rowIndex} and the boardRow is ${boardRow}`)
    return boardRow.map((cell, columnIndex) => {
      console.log(
        `-- With the inside loop the columnIndex is ${columnIndex} and the cell is ${cell}`
      )
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

> **IMPORTANT** -- Any time we generate JSX dynamically such as with a `map` we
> need to include a `key` value for the outer-most element. In this case we need
> a unique value for the `<li>`. The value only needs to be unique to it's
> siblings. So in this case the `columnIndex` is enough to tell React "this is
> the 0th element ... this is the 1st element ... this is the 2nd element" and
> React will be satisfied.

### Blocking clicks

You may have noticed that if you try to click on a game square before there is a
game created, or after a winner exists, we'll get back some error information
from the API.

Let's block clicks in these cases:

- There is no game created

- The user clicks on an occupied cell

- Someone has won

We can do this by introducing the concept of a
[guard clause](<https://en.wikipedia.org/wiki/Guard_(computer_science)>). A
`guard clause` is a boolean conditional (typically an `if`) statement that
checks for conditions under which we don't want the rest of the function/method
to execute. Typically inside a `guard clause if statement`, we would see a
`return` statement, which would end the function's execution.

In our case we want to add this code to the top of our `handleClickCell`
function:

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

This allows us to block the click for each of the conditions we want to prevent.

If you look in the `CSS` file, you'll see that we have some styling for cells
that show any cell with a class of `taken` to have a cursor that indicates we
cannot click. This adds a nice visual effect to align with the
`guard clause`protection we just added.

We can dynamically set the class name of an `li` again using a `ternary`
expression:

```jsx
<li
  key={columnIndex}
  className={cell === ' ' ? '' : 'taken'}
  onClick={() => handleClickCell(rowIndex, columnIndex)}
>
  {cell}
</li>
```

This code will set the `className` to a blank string if the cell is still open
(equal to space) and to `taken` if there is any other value (say an `X` or an
`O`)

## Reviewing the Steps for an API based component

Our steps for creating a dynamic user interface have updated slightly. Let's
take a moment and re-review the list, augmenting it with new steps and detailing
existing ones based on what we've learned about managing state.

- Step 1 - Static implementation

- Step 2 - Make a state object containing data

- Step 3 - Try manually changing the value in the state.

- Step 4 - Connect actions

- Step 5 - Update state

- Step 5a - Use fetch to send required data to the API
- Step 5b - Use the response from fetch to get the new state
- Step 5c - Update the state

- Step 6 - Refine dynamic nature of UI based on state data
