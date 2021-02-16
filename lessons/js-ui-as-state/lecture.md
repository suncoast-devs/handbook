Theme: Next, 1

# User Interface as State

---

# Mental Model

-
-

```
     State   ===== map =====>  User interface
      ^                            |
      |                        event handling
    change                         |
      |                            v
    Update   <=== callback ===  Event Handler
```

---

# Simple Example

```html
<p>0</p>
<button>Increment</button>
```

```js
let counter = 0

function main() {
  document.querySelector('button').addEventListener('click', function (event) {
    counter++

    const counterElement = document.querySelector('p')
    counterElement.textContent = counter
  })
}
```

---

# Turn state into user interface

In the example we are using a _local_ variable to track the _state_ of the count and then _manually_ updating the user interface.

## What if the user interface was simply a representation of state?

---

# More complex example

## Empty HTML

```js
let counter = 0

function render() {
  const html = `
  <p>0</p>
  <button>Increment</button>
  `

  document.body.innerHTML = html
}

function main() {
  document.querySelector('button').addEventListener('click', function (event) {
    counter++

    render()
  })

  render()
}
```

---

# State change => HTML refresh

_Every_ time we update `counter` we _repaint_ the entire user interface.

---

# More complex example: scoreboard

---

# Scoreboard

[HTML](https://raw.githubusercontent.com/suncoast-devs/scoreboard-template/master/index.html)
[CSS](https://raw.githubusercontent.com/suncoast-devs/scoreboard-template/master/screen.css)

---

```js
function render() {
  const html = `
<header><h1>My Score Board</h1></header>
<main>
  <section class="team1">
    <h2>Team 1</h2>
    <h3>0</h3>
    <fieldset><input type="text" placeholder="Name" /></fieldset>

    <fieldset><i class="add fas fa-2x fa-plus-circle"></i><i class="subtract fas fa-2x fa-minus-circle"></i></fieldset>
  </section>

  <section class="team2">
    <h2>Team 2</h2>
    <h3>0</h3>
    <fieldset><input type="text" placeholder="Name" /></fieldset>

    <fieldset><i class="add fas fa-2x fa-plus-circle"></i><i class="subtract fas fa-2x fa-minus-circle"></i></fieldset>
  </section>
</main>`

  document.body.innerHTML = html

  // Setup event listeners here
}
```

---

# Setup state

```js
let teamOneName = 'Team 1'
let teamOneScore = 0

let teamTwoName = 'Team 2'
let teamTwoScore = 0
```

---

# Update render to use variables

Use string interpolation.

Change static text such as:

```html
<h2>Team 1</h2>
```

to

```html
<h2>${teamOneName}</h2>
```

---

# See that if we change our initial state the UI changes!

> Seemingly simple and innocuous. However, this is a powerful idea.

---

# Create event listeners

The event listening functions should update the appropriate variable and call `render`

````js
document.querySelector('.team1 .add').addEventListener('click', function (event) {
  teamOneScore++
  render()
})
document.querySelector('.team1 .subtract').addEventListener('click', function (event) {
  teamOneScore--
  render()
})
document.querySelector('.team1 input').addEventListener('input', function (event) {
  teamOneName = event.target.value
  render()
})

document.querySelector('.team2 .add').addEventListener('click', function (event) {
  teamTwoScore++
  render()
})
document.querySelector('.team2 .subtract').addEventListener('click', function (event) {
  teamTwoScore--
  render()
})
document.querySelector('.team2 input').addEventListener('input', function (event) {
  teamTwoName = event.target.value
  render()
})
```
---

[.column]

## Change state to be an object for each team

```js
const teamOne = {
  name: 'Team 1',
  score: 0,
}

const teamTwo = {
  name: 'Team 2',
  score: 0,
}
````

[.column]

### Change render function and handlers

Change:

```html
<h2>${teamOneName}</h2>
```

to

```html
<h2>${teamOne.name}</h2>
```

---

# Extract out a method to render a team and pass in the state

- Add an `id` to each team object
- Update `render` to call that function
- Move query listeners

---

[.column]

# Render

```js
function renderTeam(team) {
  const html = `
  <section class="team${team.id}">
  <h2>${team.name}</h2>
  <h3>${team.score}</h3>
  <fieldset>
    <input type="text" placeholder="Name" value="${team.name}" />
  </fieldset>

  <fieldset>
    <i class="add fas fa-2x fa-plus-circle"></i>
    <i class="subtract fas fa-2x fa-minus-circle"></i>
  </fieldset>
</section>
  `

  return html
}
```

[.column]

# Listeners

```js
function setupListeners(team) {
  document
    .querySelector(`.team${team.id} .add`)
    .addEventListener('click', function (event) {
      team.score++
      render()
    })
  document
    .querySelector(`.team${team.id} .subtract`)
    .addEventListener('click', function (event) {
      team.score--
      render()
    })
  document
    .querySelector(`.team${team.id} input`)
    .addEventListener('input', function (event) {
      team.name = event.target.value
      render()
    })
}
```

---

# Using Arrays

- Change state to be an array

- Change render to iterate over the array

- Change event handlers to use the supplied element of the array

---

[.column]

# State

```js
const teams = [
  {
    id: 1,
    name: 'Team 1',
    score: 0,
  },

  {
    id: 2,
    name: 'Team 2',
    score: 0,
  },
]
```

[.column]

# Render

```js
function render() {
  const html = `
<header>
  <h1>My Score Board</h1>
</header>
<main>
${teams.map(function (team) {
  return renderTeam(team)
})}
</main>
`

  document.body.innerHTML = html

  teams.forEach(function (team) {
    setupListeners(team)
  })
}
```

---

# Add more teams!

```js
  {
    id: 3,
    name: 'Team 3',
    score: 10,
  },
```

---

# Add a reset button

[.column]

```html
<footer>
  <button>reset</button>
</footer>
```

```css
footer {
  display: flex;
  justify-content: center;
}

footer button {
  font-size: 3rem;
  text-transform: uppercase;
}
```

[.column]

<!-- prettier-ignore -->
```js
document
.querySelector('button')
.addEventListener('click', function (event) {
  // Reset the teams
  teams = [
    { id: 1, name: 'Team 1', score: 0 },
    { id: 2, name: 'Team 2', score: 0 },
    { id: 3, name: 'Team 3', score: 0 },
  ]

  render()
})
```

---

# Invented a low-fidelity version of react
