---
title: React State and Introduction to Events
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

One of the "_rules_" of `props` is that the receiving component cannot change
them. That is, `NewsArticle` cannot change the value of the property.

> `props` are "read only" data

> `props` are passed from the **parent** to the **child**

> `props` are accessible via a `props` argument

What are we to do if we want to change data? What approach does React provide
for initializing, storing, and changing data that varies during the time a
component is visible on the page?

# Enter `state`

React implements a system called `state` to allow us to modify data during the
lifetime of a component. This is similar in concept to the idea of `state` in
object oriented systems.

In a functional component we use a system called `hooks` to implement features
such as tracking `state`-ful information. The name `hook` comes from the idea
that we are `hooking` into React's processing.

We will start with the simplest `hook` in React, `useState`.

`useState` is a React function that allows us to create a variable in our
component that can change over time. It comes from the standard React library
and follows the standard hook rules which are:

1. Hooks should all begin with the word `use` and follow `camelCase` names.
1. Hooks must be called in the same order each time a compontent renders. The
   easiest way to guarantee this is to not place a `useXXXX` hook inside of a
   conditional, or have any "guard clauses" **before** the use of a hook method.

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

In this example, we will build a component that displays the number of times a
user has clicked an `Increment` button. We will go through `5` steps to follow
any time we build a dynamic user interface. These steps apply whether we create
a click-counter or a much more complex user interface that interacts with APIs
and the user.

# A step-by-step approach to building a dynamic UI

The steps we will be following in this guide are:

1. Static Implementation
2. Make a state object containing data
3. Try manually changing the value in the state
4. Connect actions (later on, we'll add API interaction here)
5. Update state

## Step 1 - Static Implementation

Often we are in a rush to start building all the interactions into code at the
beginning of a project or at the first stage of creating a new component. Resist
this temptation. If we can build a static version of the component, we gain
several valuable advantages:

1. We can validate our design (that should be coming from our wireframes,
   mockups, or design renderings)
1. We may discover some elements that we overlooked in the design phase.
1. We can show the static implementation to our project stakeholders to provide
   feedback before adding user and API interactions.

> NOTE: As a rule, changes and bugs found **early** in a project are easier to
> deal with and less "expensive" than those found later. So use this step to
> help ease your process.

Here is the static implementation of our click counter:

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

## Step 2 - Add state hooks

We will add our first hook, known as `useState`. Here is the code to create the
state variables and display their value. We'll then break down this code
line-by-line

```jsx
function Counter() {
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

Whoa! Let us break this down.

We start the very first line of code with:

```jsx
const counterValueAndSetMethod = useState(0)
```

This line of code does a few things. First, it declares that we are going to use
some state. It then says that the state's initial value is going to be the
number `0`.

### `useState` rules

`useState` has a few particular _rules_ that we need to remember:

1. The value given to `useState` in parenthesis is used as the initial value
   only the first time the component's instance is rendered. Even if the
   component is rendered again due to a state change, the state's value isn't
   reset to the initial value. This behavior may seem strange if we are going to
   call `useState` again when that render happens. How React makes this happen
   is a concept deeper than we have time to discuss here.

2. `useState` always returns an _array_ with exactly _two_ elements. The
   **first** element is the _current value of the state_ and the **second**
   element is _a function that can change the value of this state_

### Using the `useState` return value

Here are the next two lines of code:

```jsx
const counter = counterValueAndSetMethod[0]
const setCounter = counterValueAndSetMethod[1]
```

These lines of code make two local variables to store the **current value** of
our state, which we call `counter` and the **method that updates the counter**
as `setCounter`

Then in the JSX, we can use those two local variables. The code
`<p>The counter is {counter}</p>` will show the current value of the counter.
The code `<button onClick={() => setCounter(counter + 1)}>Count!</button>` will
call `setCounter` to change the value of the counter, and make it the counter
plus one.

However, this code is not as compact as we can make it! We can use
`array destructuring assignment` to simplify the code.

The code:

```jsx
const counterValueAndSetMethod = useState(0)

const counter = counterValueAndSetMethod[0]
const setCounter = counterValueAndSetMethod[1]
```

can be rewritten as such:

```jsx
const [counter, setCounter] = useState(0)
```

and is how every example of `useState` will appear. See
[this article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
for more details on how and why this syntax works.

Thus our component will look like this:

```jsx
function Counter() {
  const [counter, setCounter] = useState(0)

  return (
    <div>
      <p>The counter is {counter}</p>
      <button>Count!</button>
    </div>
  )
}
```

We have just combined the best of both worlds. We have the simplicity of the
function component with the ability to update state!

# Step 3 - Try manually changing the value in the state

While we have removed the _static_ implementation of the `0` in our
`The count is...` statement (another way to say this is "hardcoded") we do not
yet have the ability to **change** the value due to user interaction.

However, if we, the programmer, were to change the initial value of `state` we
could see that the UI would reflect the new value.

Change the state initializing code to:

```js
const [counter, setCounter] = useState(42)
```

and you will see the display update to `The count is 42`.

Another way to change the state value is using the
[React Developer Tools](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

If you open your developer window with the React Developer Tools installed,
you'll see a new tab `Components.` If you then click that tab you will see a
component which will, when clicked, show you the current value of `state`. Here
you can double click on the value and change it to any number you like. As soon
as you make that change, the UI will update like magic!

Both of these approaches show that if there were **some** way to change the
state the UI would automatically update to display the new value of the counter!

> NOTE: This is an important step. For this example, it seems simple. Later we
> will be dealing with much more complex state variables and changing the value
> to see how our component "reacts" will be more critical.

# Step 4 - Connect actions

We can now add interaction code to allow the user to click the `<button>` and
have the counter update.

In non-React-based JavaScript, we would set up an `addEventListener` for such an
interaction. We would pass this function as an event handling function.

In React, the event handling function is still proper. However, we will connect
it to the event in a different way.

```js
function handleClickButton(event) {
  event.preventDefault()

  console.log('Clicked!')
}
```

Notice that we still receive an `event` variable as the first argument. We'll
use that `event` variable to prevent any default behavior based on clicking on
whatever element caused this event. This isn't always necessary, but it can be a
good habit. There is no default behavior for this button, but this would inhibit
that behavior if there were.

For now, we will `console.log` a message. This allows us to **test** if we have
correctly connected our function to the element. When writing code, try to write
a small amount of code and then **validate** if that code works. Right now, we
do this with `console.log` but later on, you'll learn about concepts like
`automated testing` that can do this for us. Here we add a line of `console.log`
to see a message in the console when we click on the button.

> **NOTE** When building your logic, write a few lines and then consider "how
> could I know if this code will work" -- Often, a few `console.log` statements
> in JavaScript will help you debug.

## Sidebar -- Using `debugger`

There is a `debugger` built into our browser. We could validate this code using
the `debugger` statement instead of `console.log`. The `debugger` statement will
stop our code and bring up the JavaScript debugger window. However, this only
happens if your Developer Tools are open. The `debugger` statement helps you
stop and "look around" at your code's condition while you are running it.

> **NOTE** Sometimes, a `debugger` statement can be more useful than a
> `console.log`. Try using it and see if you prefer that.

> **NOTE** Don't forget to take the `debugger` statement out of your code
> though!

## Back to our regularly scheduled lesson

Now that we have the handling function, we can update our `<button>` to execute
that function each time it is clicked.

```jsx
<button onClick={handleClickButton}>Increment</button>
```

In React we will use `onXXXXX` or `handleXXXXX` named methods (e.g. `onClick`,
`onSubmit`, `onContextMenu`, `onChange`, `handleClick`, etc.) when we want to
associate an element to an event handling function. In this case, we are telling
React to call our `handleClickButton` function each time the button is clicked.

Now we know that we can connect a method to an event handling function.

# Step 5 - Update State

For our button, we want to:

- Get the current count from the state

- Increment that number

- Update the state to make the count equal to the incremented value

That code looks like this:

```js
// Increment
const newCount = count + 1

// Tell React there is a new value for the count
setCount(newCount)
```

> NOTE: After calling `setCount` you will see that `count` has **NOT** been
> updated. the value of `count` isn't changed until React gets a chance to
> update state **AFTER** our `handleClickButton` method is done. This often
> confuses new React developers.

We can simplify this code when we place it in our function:

```js
function handleClickButton(event) {
  event.preventDefault()

  setCount(count + 1)
}
```

# Our code so far:

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

# Review our five steps:

- Step 1 - Static implementation

- Step 2 - Make a state object containing data

- Step 3 - Try manually changing the value in the state.

- Step 4 - Connect actions

- Step 5 - Update state

### Adding more state

Let us say we also wanted to keep track of a person's name on the counter.

With `hooks`, we will make two **independent** states that each track a single
piece of information.

Separating these pieces of state has a few benefits:

1. It is easier to remove one part of the state since it has its own variable
   and state changing function.

2. We can more easily tell where in the code a piece of state or a state
   changing function is used.

```jsx
function CounterWithName() {
  const [counter, setCounter] = useState(0)
  const [name, setName] = useState('Susan')

  function handleButtonClick() {
    setCounter(counter + 1)
  }

  function handleChangeInput(event) {
    setName(event.target.name)
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

Ah, how nice. We have independent **variables** to track our state, instead of
chained object access (e.g. `name` vs `this.state.name`) and very simple methods
to update the state `setName(event.target.value)`
