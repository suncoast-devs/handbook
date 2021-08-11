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

- Can be _modified_
- React knows to re-render the UI when the state is changed

---

# Hooks

In a functional component we use a system called `hooks` to implement features such as tracking `state`-ful information.

The name `hook` comes from the idea that we are `hooking` into React's processing.

---

# We will start with the simplest `hook` in React, `useState`.

`useState` is a React function that allows us to create a variable in our component that can change over time.

It comes from the standard React library.

---

# Rules of hooks

1. Hooks should all begin with the word `use` and follow `camelCase` names.

1. Hooks must be called in the same order each time a compontent renders. The easiest way to guarantee this is to not place a `useXXXX` hook inside of a conditional, or have any "guard clauses" **before** the use of a hook method.

---

# State changes lead to re-rendering

This is a key aspect of `state` in React.

Each time we change the `state` (using the method we are about to introduce) the `React` system detects this change and then **re-renders** our component with the new information.

---

# Demo time!

# [fit] Click Counter

# [fit] The "Hello World" of interactive web applications!

---

# A step-by-step approach to building a dynamic UI

1. Static Implementation
2. Make a state object containing data
3. Try manually changing the value in the state
4. Connect actions (later on, we'll add API interaction here)
5. Update state

---

# Step 1 - Static implementation

- Render a static (hardcoded) version of what you want

```js
export function Counter() {
  return (
    <div>
      <p>The count is 0</p>
      <button>Increment</button>
    </div>
  )
}
```

---

# Step 2 - Introduce State

Add our first hook, known as `useState`.

Here is the code to create the state variables and display their value. We'll then break down this code line-by-line

---

```jsx
export function Counter() {
  // prettier-ignore
  const counterValueAndSetMethod /* this is an array */ = useState( 0 /* initial state */)

  const counter = counterValueAndSetMethod[0]
  const setCounter = counterValueAndSetMethod[1]

  return (
    <div>
      <p>The counter is {counter}</p>
      <button>Count!</button>
    </div>
  )
}
```

---

[.code-highlight: 2-2]

<!-- prettier-ignore-start -->
```jsx
export function Counter() {
  const counterValueAndSetMethod /* this is an array */ = useState( 0 /* initial state */)

  const counter = counterValueAndSetMethod[0]
  const setCounter = counterValueAndSetMethod[1]

  return (
    <div>
      <p>The counter is {counter}</p>
      <button>Count!</button>
    </div>
  )
}
```
<!-- prettier-ignore-end -->

- Declares we are going to use some state (e.g. `useState`)
- Sets initial value (e.g. `0`)
- `useState` always returns an array with two entries

---

[.autoscale: true]

# `useState` rules

`useState` has a few particular _rules_ that we need to remember:

1. Value given to `useState` in parenthesis is used as the initial value only the first time the component's instance is rendered. Even if the component is rendered again due to a state change, the state's value isn't reset to the initial value.

2. `useState` always returns an _array_ with exactly _two_ elements. The **first** element is the _current value of the state_ and the **second** element is _a function that can change the value of this state_

---

# Using the `useState` return value

[.code-highlight: 4-6]

<!-- prettier-ignore-start -->
```jsx
export function Counter() {
  const counterValueAndSetMethod /* this is an array */ = useState( 0 /* initial state */)

  const counter = counterValueAndSetMethod[0]
  const setCounter = counterValueAndSetMethod[1]

  return (
    <div>
      <p>The counter is {counter}</p>
      <button>Count!</button>
    </div>
  )
}
```
<!-- prettier-ignore-end -->

^ Creates two local variables
^ First is the value of the counter
^ Second is a function that allows us to change the counter

---

# [fit] Simplify (using Destructuring Assignment)

```jsx
export function Counter() {
  const [counter, setCounter] = useState(0)

  return (
    <div>
      <p>The counter is {counter}</p>
      <button>Count!</button>
    </div>
  )
}
```

# [fit] Ah, so much more room for activities...

![right fit](https://media.giphy.com/media/yrFrXTTTcHIY0/giphy.gif)

---

# Step 3 - Try manually changing the value in the state.

- See that the UI changes when the state is modified

```jsx
export function Counter() {
  const [counter, setCounter] = useState(42)

  return (
    <div>
      <p>The counter is {counter}</p>
      <button>Count!</button>
    </div>
  )
}
```

---

# Step 4 - Connect actions

- Create a `handleXXXX` function to handle events.
- We will define this _INSIDE_ our function. Whoa! Nested functions!

---

```jsx
export function Counter() {
  const [counter, setCounter] = useState(42)

  function handleClickButton(event: MouseEvent) {
    event.preventDefault()

    console.log('Clicked!')
  }

  return (
    <div>
      <p>The counter is {counter}</p>
      <button>Count!</button>
    </div>
  )
}
```

---

# [fit] Event handlers still receive **event** object

- Except now we **must** provide a specific type.
- Type depends on what _kind_ of handler this is.

```jsx
function handleClickButton(event: MouseEvent) {
  event.preventDefault()

  console.log('Clicked!')
}
```

Showing how to _prevent the default behavior_, not typically needed outside of links and form submit.

---

# Connect the event

# [fit] Goodbye `addEventListener`

```html
<button onClick="{handleClickButton}">Increment</button>
```

- We are associating the event, `onClick` with the function `handleClickButton`.
- The `onClick` is actually a property of the DOM element.
- We assign that property to the function itself.

---

# Naming conventions

- `onXXXXX` or `handleXXXXX` named methods (e.g. `onClick`, `onChange`, `handleClick`, etc.)
- `_buttonClick` -- because the `_` looks like a _"handle"_ attached to the word `buttonClick`

---

# [fit] Can connect a method to an event!

# [fit] Time to update state (finally...)

---

# Step 5 - Update state

[.column]

- For our button, we want to:
  - Get the current count
  - Increment it
  - Update the state

[.column]

```jsx
export function Counter() {
  const [counter, setCounter] = useState(42)

  function handleClickButton(event: MouseEvent) {
    event.preventDefault()

    // Increment
    const newCount = count + 1

    // Tell React there is a new value for the count
    setCount(newCount)
  }

  return (
    <div>
      <p>The counter is {counter}</p>
      <button>Count!</button>
    </div>
  )
}
```

---

# Warning! Warning!

> NOTE: After `setCount` does not change `count` right away. The value isn't changed until React gets a chance to update state **AFTER** our function is done.

> This often confuses new React developers. We'll see this again when we use more complex state

![fit right](https://media1.tenor.com/images/fb0638add0828e1975144f3dd93e6e62/tenor.gif?itemid=11779622)

---

# Simplify the code

```jsx
function CounterWithName() {
  const [counter, setCounter] = useState(0)

  function handleButtonClick() {
    setCounter(counter + 1)
  }

  return (
    <div>
      <button onClick={handleButtonClick}>Count!</button>
    </div>
  )
}
```

---

# Adding more state

What if we also wanted to keep track of a person's name on the counter?

With `hooks`, we will make two **independent** states that each track a single piece of information.

---

```jsx
function CounterWithName() {
  const [counter, setCounter] = useState(0)
  const [name, setName] = useState('Susan')

  function handleButtonClick() {
    setCounter(counter + 1)
  }

  function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
  }

  return (
    <div>
      <p>
        Hi there {name} The counter is {counter}
      </p>
      <button onClick={handleButtonClick}>Count!</button>
      <p>
        <input type="text" value={name} onChange={handleChangeInput} />
      </p>
    </div>
  )
}
```

---

# handleChangeInput

- Declare the `event` as a data type that indicates this is a `React.ChangeEvent` on an element that is an `HTMLInputElement`
- Allows `event.target` and `event.target.value` to have
  types.

---

# A note on types

---

You may have noticed that when declaring these variables we did **not** have to specify a type:

```typescript
const [counter, setCounter] = useState(0)
```

---

If we did not provide an initial state, React would **not** be able to infer the type. Here is an example of that type of `useState`

```typescript
const [price, setPrice] = useState()
```

- TypeScript will set a type of `undefined` to `price`.
- When we try to `setPrice(42)` (or any other number) we'll receive a TypeScript error that we cannot assign `number` to `undefined`.

---

In the case where we do **not** provide an initial value to `useState` we _should_ provide a type.

```typescript
const [price, setPrice] = useState<number>()
```

`price` has a type of `undefined | number`.

---

# Always set default state value

This is the reason that we **strongly** recommend always using an initial value for all of your `useState` hooks.

If you _cannot_ set an initial value you must be consider the impact that allowing an `undefined` value in a state variable will have.

---

# Steps:

- Step 1 - Static implementation

- Step 2 - Make a state object containing data

- Step 3 - Try manually changing the value in the state.

- Step 4 - Connect actions

- Step 5 - Update state
