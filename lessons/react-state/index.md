---
title: React State
---

See the lecture slides as this reading is under construction.

# React `props`

In [React Intro](/lessons/react-intro) we discussed how `props` (properties)
allow us to create generalized components that change their behavior based on
the values supplied.

For instance, we could create a `NewsArticle` component that rendered a
different _title_ and _body_ depending on the properties supplied.

```jsx
<NewsArticle title="SDG Announces New Cohort" body="..." />

<NewsArticle title="React Version 17 is Released" body="..." />
```

One of the "_rules_" of `props` is that they cannot be changed by the receiving
component. That is, `NewsArticle` cannot change the value of the property.

> `props` are "read only" data

> `props` are passed from the **parent** to the **child**

> `props` are accessible via a `this.props` object in `class` based components

What are we to do if we want to change data? What approach does React provide
for initializing, storing, and changing data that varies during the time a
component is visible on the page?

# Enter `state`

Borrowing from our existing terminology of `objects`, React implements a system
called `state` to allow us to modify data during the lifetime of a component.

`state` is a specifically named variable that is part of the `class`, much like
`this.props`. In this case the variable is named `this.state`.

`state` can be modified. However, we must modify this variable in a very
specific way so that React knows we have changed the information.

> `state` is a specifically named variable as part of the class (`this.state`)

> `state` can be modified (but we need to use a specific method to make changes)

> Changing `state` causes React to re-draw our component with the new state
> information.

# State changes lead to re-rendering

This is a key aspect of `state` in React. Each time we change the `state` (using
the method we are about to introduce) the `React` system detects this change and
then **re-renders** our component with the new information.

React will also re-render if our `props` change, but remember that only the
**parent** component can control the `props` by re-rendering itself and using
new values for any of the properties used to create the child component.

Let's create a simple component that uses changing state to see how React
initializes, uses, and changes state as well as how that impacts the component
re-rendering.

# Building a Click Counter

In this example we will build a component that displays the number of times a
user has clicked an `Increment` button. We will go through `5` steps that we can
follow any time we are building a dynamic user interface. These steps ally
whether we are building a click-counter or a much more complex user interface
that interacts with APIs and the user.

# A step-by-step approach to building a dynamic UI

The steps we will be following in this guide are:

1. Static Implementation
2. Make a state object containing data
3. Try manually changing the value in the state
4. Connect actions (later on we'll add API interaction here)
5. Update state

## Step 1 - Static Implementation

Often we are in a rush to start building all the interactions into code at the
beginning of a project or at the first stage of creating a new component. Resist
this temptation. If we can build a static version of the component we gain
several valuable advantages:

1. We can validate our design (that should be coming from our wireframes,
   mockups, or design renderings)
1. We may discover some elements that were overlooked in the design phase.
1. We can show the static implementation to our project stakeholders so they can
   provide feedback before we spend time adding user and API interactions.

> NOTE: As a rule, changes and bugs found **early** in a project are easier to
> deal with, and less "expensive" than those found later. So use this step to
> help ease your process.

Here is the static implementation of our click counter:

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

> NOTE: We'd also have some CSS with this as well to give the counter a nice
> user experience.

# Step 2 - Make a state object containing data

Now that we have a static design we can review the implementation to find all
the elements that need to become dynamic. In our case this is simply one
element, the current `count` of clicks. In more complex cases this may be an
object with many properties, an array of simple data like strings or numbers, or
an array of objects. Whatever the structure of this state, we'll create an
**initial state** value and then use that value wherever we had static data.

Here is what this looks like for our `Counter` component. We'll review the code
changes below.

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

The first change to notice is:

```js
state = {
  count: 0,
}
```

This code initializes an **instance** variable named `state` with a value being
an object containing a single key (`count`) with the value `0`.

The name `state` here is a **very** important fact. We cannot choose any name we
want for the `state` variable. The value we assign to the variable is completely
up to us. We could have simply made the `state` value the `0` directly. However,
it is a fairly common practice to make this value an object with a key that
gives a _name_ to our data.

You'll see in later examples, when we start working with APIs, the _shape_ of
the `state` object will follow the structure of the API data. Since we aren't
using an API here, we can control the structure of the `state` variable.

The next change is in our `p` paragraph. Instead of the static value `0` we
place `{this.state.count}`. This will render the value associated with the
`count` key inside the `this.state` variable (object).

If we were to add this component to a project we would see that the component
would display `The count is 0` when it first renders.

> NOTE: A vitally important thing to remember is that your component will render
> the **first** time with whatever value is in the `this.state` variable. This
> means we need to _always_ provide an initial value for the `state` that _makes
> sense_. In this code if we forgot to initialize `state` we would have received
> an **error** the first time our component rendered.

> **Always provide a working default/initial value for `state`**

# Step 3 - Try manually changing the value in the state

While we have removed the _static_ implementation of the `0` in our
`The count is...` statement (another way to say this is "hardcoded") we do not
yet have the ability to **change** the value due to a user interaction.

However, if we the programmer were to change the initial value of `state` we
could see that the UI would reflect the new value.

Change the state initializing code to:

```js
state = {
  count: 42,
}
```

and you will see the display update to `The count is 42`.

Another way to change the state value is using the
[React Developer Tools](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

If you open your developer window with the React Developer Tools installed
you'll see a new tab `Components.` If you then click in that tab you will see
`Counter` which will, when clicked, show you the current value of `state`. Here
you can double click on the value and change it to any number you like. As soon
as you make that change, the UI will update like magic!

Both of these approaches show that if there were **some** way to change the
state the UI would automatically update to show the new value of the counter!

> NOTE: This is an important step. For this example it seems simple. Later we
> will be dealing with much more complex state variables and changing the value
> to see how our component "reacts" will be more important.

# Step 4 - Connect actions

We can now add interaction code to allow the user to click the `<button>` and
have the counter update.

In non-React based JavaScript we would setup an `addEventListener` for such an
interaction. We would pass this function an event handling function.

In React the event handling function is still useful. In this case we will use
the `arrow function` syntax. This ensures that the `this.state` is correctly set
when we need it.

It is important to use `arrow syntax` for your event handling functions based on
how **binding** works. To read more about binding `this` in JavaScript see
[this article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this).
Understanding `this` and `binding` is an important concept for JavaScript
developers (and it is often an interview question) -- but it is outside the
immediate scope here.

> **IMPORTANT** -- use `arrow functions` for your event handlers.

```js
handleClickButton = event => {
  event.preventDefault()

  console.log('Clicked!')
}
```

Notice that we still receive an `event` variable as the first argument. We'll
use that `event` variable to prevent any default behavior that would happen
based on clicking on whatever element caused this event. This isn't always
necessary, but it can be a good habit. There is no default behavior for this
button, but this would inhibit that behavior if there were.

For now we will `console.log` a message. This allows us to **test** if we have
properly connected our function to the element. When writing code, try to write
a small amount of code and then **validate** if that code works. Right now we do
this with `console.log` but later on you'll learn about concepts like
`automated testing` that can do this for us. Here we add a line of `console.log`
to see a message in the console when we click on the button.

> **NOTE** When writing code, write a few lines and then consider "how could I
> know if this code will work" -- Often things like `console.log` in JavaScript
> will help you debug.

## Sidebar -- Using `debugger`

There is a `debugger` built into our browser. The other way we could validate
this code is to use the `debugger` statement instead of `console.log`. The
`debugger` statement will stop our code and bring up the JavaScript debugger
window. However, this only happens if your Developer Tools are open. The
`debugger` statement is useful to allow you to stop and "look around" at the
condition of your code while you are running it.

> **NOTE** Sometimes a `debugger` statement can be more useful than a
> `console.log`. Try using it and see if you prefer that.

> **NOTE** Don't forget to take the `debugger` statement out of your code
> though!

## Back to our regularly scheduled lesson

Now that we have the handling function we can update our `<button>` to execute
that function each time it is clicked.

```jsx
<button onClick={handleClickButton}>Increment</button>
```

In React we will use `onXXXXX` methods (e.g. `onClick`, `onSubmit`,
`onContextMenu`, `onChange`, etc.) when we want to associate an element ot an
event handling function. In this case we are telling React to call our
`handleClickButton` function each time the button is clicked.

Now we know that we can connect a method to an event handling function.

# Step 5 - Update State

For our button we want to:

- Get the current count from the state

- Increment that number

- Update the state to make the count equal to the incremented value

We will update this _algorithm_ to be specifically related to React:

- Get the current count
- Increment the count
- **Make a new state**
- Tell React about the new state

That code looks like this:

```js
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
```

All of this code should feel familiar except for the last line,
`this.setState(newState)`. This is the **special method** we use to tell React
about a new state. Typically we might write something like
`this.state.count = newCount` and while that line of code is syntactically
correct and won't generate any errors when we execute it, we will see that
`this.state.count = newCount` isn't enough.

`this.setState` is a function given to us by the fact that we
`extends React.Component` and is used to tell React that **after** this function
is done, it should recognize this new state object and **rerender** our
component.

> NOTE: `this.setState` is the only way we should ever update state in a `class`
> component.

> NOTE: After calling `this.setState` you will see that `this.state.count` has
> **NOT** been updated. the value of `this.state` isn't changed until React gets
> a chance to update state **AFTER** our `handleClickButton` method is done.
> This often confuses new React developers.

# Our code so far:

```jsx
export class Counter extends React.Component {
  state = {
    count: 42,
  }

  handleClickButton = event => {
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

# Simplify the code

There are some simplifications we could make to `handleClickButton`.

The first is to make the creation of the `newState` a single statement:

```js
handleClickButton = event => {
  event.preventDefault()

  const newState = {
    count: this.state.count + 1,
  }

  this.setState(newState)
}
```

We could continue and use a rule:

> RULE: If we create a variable and use it only once, we _could_ replace the use
> of the variable with it's definition.

Using this rule:

```js
handleClickButton = event => {
  event.preventDefault()

  this.setState({ count: this.state.count + 1 })
}
```

# Review our five steps:

- Step 1 - Static implementation

- Step 2 - Make a state object containing data

- Step 3 - Try manually changing the value in the state.

- Step 4 - Connect actions

- Step 5 - Update state

# A more complex example: Tic Tac Toe With an API

Let's extend our knowledge of `state` by interacting with an API.

The API we'll be using for this example is an
[unbeatable Tic Tac Toe API](https://sdg-tic-tac-toe-api.herokuapp.com/). Read
the API to get familiar with how it works. You'll notice that there are three
main endpoints:

- Create a new game

- Make a move in a game

- Get the state of a game

We'll be using those API endpoints during this example.

# Step 1 - Static Implementation

We'll begin by designing our Tic Tac Toe game.

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

This static implementation should allow us to put `X` and `O` elements in any of
the `<li>` elements and see that the board renders correctly. This is an
important step as we want to validate that as we fill in our state, and use it
to populate the board, we can see a game of `X` and `O`.

# Step 2: Make a state using data

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
We'll leave the `board' equal to the two dimensional array of strings.

```js
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

We can then update the static representation of our `<li>` game board:

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
```

We'll use `board[0]` to represent the first **row** of squares, then
`board[0][0]` is the first square on that row, `board[0][1]` the second, and
`board[0][2]` the last. The same will be true of the remaining rows.

# Step 3 - Try manually changing the state

Now try replacing a few of the empty strings with some `X` and `O` values that
you might see in a real game of Tic Tac Toe.

We should see the game board render with the appropriate values in the squares!

# Step 4 - Connect the actions

We will begin by defining a method that will handle clicking on a cell.

In this case we'll need to know the row and column of the cell so we might write
our `handleClickCell` method like this:

```js
handleClickCell = (row, column) => {
  console.log(`You clicked on row ${row} and column ${column}`)
}
```

Notice here we aren't using the typical function that takes an `event`. This is
because we need additional context in order to handle clicking. We'll deal with
this by writing a slightly different `onClick` method for each of the `<li>`

```jsx
<li onClick={() => this.handleClickCell(0, 0)}>{this.state.board[0][0]}</li>
```

In this case the value of the `onClick` is itself an arrow function! However, we
have placed it **inline**. By doing this we can specify the row and column
values.

The way to think about `onClick={() => this.handleClickCell(0, 0)}` is this:

> When you click on this specific `li`, call the function
> `() => this.handleClickCell(0,0)` -- When that function is called **it** will
> call `handleClickCell` and specify `0` as the `row` and `0` as the `column`.

So we might do the same with the remaining `li`

```jsx
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
```

Try clicking on each of the cells on the board and we should see messages in our
developer console that match up with the row and column we have been clicking!

# Step 5 - Update the state

For this we will use the Tic Tac Toe API. Reading the API it appears we need to
"Create a new game" to get a "Game ID" so that we can register moves.

We'll make a small change to our UI to add a button:

```jsx
<h1>
  Tic Tac Toe - <button onClick="{this.handleNewGame}">New</button>
</h1>
```

And we will define a function `handleNewGame` that uses the API:

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

This function uses the API to send a request to make a new game. Because we
designed our state to **exactly** match what the API returns, all we need to do
is take the `JSON` object that it returns and place it in the state.

```js
// Get the response as JSON
const game = await response.json()

// Make that the new state!
this.setState(game)
```

Try this a few times in the UI. Use the `React Developer Tools` to look at the
`state` of our component after clicking the new game button. You should see an
empty board but with a new `id` value each time!

You could also try making the initial state something other than a blank board.
You would see that making a new game will _reset_ it. **Don't forget to put the
default state back to an array of empty strings!**

The `id` within the `state` will help us when we need to record the game actions
on a click.

## Update handleClickCell

When we click a cell we need to build an API request to send to the server. The
response we get back, as we did with handleNewGame, will be in exactly the form
to use with `this.setState`.

That code looks like:

```js
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

Other than sending the url, sending a `body` containing the `row` and `column`
information, the structure of this code is very similar to `handleNewGame`. This
includes the processing of the response:

```js
// Get the response as JSON
const game = await response.json()

// Make that the new state!
this.setState(game)
```

So as we make a move, we should see the API send us back a game state.

This game state will have our recorded move, but it will also have **the
computer's move as well**

Make a new game and try a few moves!

## Handle the winner

The API will also tell us the winner of the game. We can make the header display
the winner information.

To do this we'll first extract the static data to a variable.

```jsx
  const header = 'Tic Tac Toe'

  return (
    <div>
      <h1>
        {header} - <button onClick={this.handleNewGame}>New</button>
      </h1>
```

Now we can make this string dynamic by using a
[ternary](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)
operator.

```js
const header = this.state.winner
  ? `${this.state.winner} is the winner`
  : 'Tic Tac Toe'
```

And with this we have a playable Tic Tac Toe game that demonstrates how to use
an API and React State to make an interactive app!

# Improve the code

We can improve the code to remove some duplication in the drawing of the game
board.

We can use `map` to generate the elements of the board. In this case since we
have an _array of arrays_ we'll have to use **two** `map` calls. The outer one
will loop through the `rows` and the inner one will loop through the `columns`

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

Two dimensional arrays can be tricky at first so study this code. Maybe some
console.log will help make the code more clear:

```jsx
<ul>
  {this.state.board.map((boardRow, rowIndex) => {
    console.log(`The rowIndex is ${rowIndex} and the boardRow is ${boardRow}`)
    return boardRow.map((cell, columnIndex) => {
      console.log(
        `-- With the inside loop the columnIndex is ${columnIndex} and the cell is ${cell}`
      )
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

> **IMPORTANT** -- Any time we generate JSX dynamically such as with a `map` we
> need to include a `key` value for the outer-most element. In this case we need
> a unique value for the `<li>`. The value only needs to be unique to it's
> siblings. So in this case the `columnIndex` is enough to tell React "this is
> the 0th element ... this is the 1st element ... this is the 2nd element" and
> React will be satisfied.

You may have noticed that if you try to click on a game square before there is a
game created, or after a winner is decided, we'll get back some error
information from the API.

Let's block clicks in these cases:

- There is no game created

- The user clicks on an occupied cell

- Someone has won

We can do this by introducing the concept of a
[guard clause](<https://en.wikipedia.org/wiki/Guard_(computer_science)>). A
`guard clause` is a boolean conditional (typically an `if`) statement that
checks for conditions under which we don't want the rest of the function/method
to execute. Typically inside a `guard clause if statement` we would see a
`return` statement which would end the function's execution.

In our case we want to add this code to the top of our `handleClickCell`
function:

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

This allows us to block the click for each of the conditions we want to prevent.

If you look in the `CSS` file you'll see that we have some styling for cells
that show any cell with a class of `taken` to have a cursor that indicates we
cannot click. This adds a nice visual effect to align with the `guard clause`
protection we just added.

We can dynamically set the class name of an `li` again using a `ternary`
expression:

```jsx
<li
  key={columnIndex}
  className={cell === ' ' ? '' : 'taken'}
  onClick={() => this.handleClickCell(rowIndex, columnIndex)}
>
  {cell}
</li>
```

This code will set the `className` to a blank string if the cell is still open
(equal to a space) and to `taken` if there is any other value (say an `X` or an
`O`)

# Reviewing the Steps for an API based component

- Step 1 - Static implementation

- Step 2 - Make a state object containing data

- Step 3 - Try manually changing the value in the state.

- Step 4 - Connect actions

- Step 5 - Update state

- Step 5a - Use fetch to send required data to the API
- Step 5b - Use the response from fetch to get the new state
- Step 5c - Update the state

- Step 6 - Refine dynamic nature of UI based on state data
