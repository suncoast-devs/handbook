---
title: Well, hello there hooks!
---

import { CounterWithName } from './CounterWithName'

# React Hooks

We have [already seen how React functions](lesson://react-intro) using `class`
based components. In this lesson we will talk about a relatively new approach
for creating React components. This new approach is often called `hooks`

## History

Prior to the introduction of `hooks` React had the concept of _stateless
functional components_. These are components that do not maintain an internal
state with `this.state` and the corresponding `this.setState`. The simplest
functional component might be our `HelloWorld` component:

```jsx
class HelloWorld extends React.Component {
  render() {
    return <div>Hello, World!</div>
  }
}

// <HelloWorld />
```

In this case the component does not maintain any state. Each time it is
rendered, it simply uses `<div>Hello, World!</div>` as it's content. In this way
we say that it is stateless.

### Stateless Functional Components

However, there is overhead in writing a component this simple as an entire
class. We really only need and use the `render` method. In these cases we can
reduce this code to just a function with the name `HelloWorld`

```jsx
function HelloWorld() {
  return <div>Hello, World!</div>
}

// <HelloWorld />
```

This is already easier to read and understand. The component `HelloWorld` just
returns the JSX representing `<div>Hello, World</div>`

### Props for Stateless Functional Components

You might be asking: "But what about a component that receives properties from a
parent component?" Without a class how do we utilize the `this.props` we get
from inheriting from `React.Component`?

The answer is really quite simple; the functional component receives the
properties via an argument we will call `props`

```jsx
function HelloWorld(props) {
  return <div>Hello, {props.name}!</div>
}

// <HelloWorld name="Sandy" />
```

Again, very simple. We do not need to worry about remembering `this.props` or
dealing with any of the extra complication of a class!

You might be asking: "But what about methods to handle events?" and again the
answer is quite simple. We can declare the functions either _inside_ or
_outside_ the component! Remember, functions are just variables themselves.

### Handling events in Stateless Functional Components

```jsx
function handleClickOnDiv(event) {
  console.log('You clicked on the div!')
}

function HelloWorld(props) {
  return <div onClick={handleClickOnDiv}>Hello, {props.name}!</div>
}

// <HelloWorld name="Sandy" />
```

We can also define the function inside the method to add some "encapsulation"
and not have our handle methods be visible, or name collide, with functions that
other components might need.

```jsx
function HelloWorld(props) {
  function handleClickOnDiv(event) {
    console.log('You clicked on the div!')
  }

  return <div onClick={handleClickOnDiv}>Hello, {props.name}!</div>
}

// <HelloWorld name="Sandy" />
```

Finally we may choose to write the handling functions as arrow functions. Given
that we do not need the ability of arrow function to automatically bind `this`,
we don't _need_ to do this, but some developers prefer to write handling
functions as arrow functions anyway.

```jsx
function HelloWorld(props) {
  const handleClickOnDiv = event => {
    console.log('You clicked on the div!')
  }

  return <div onClick={handleClickOnDiv}>Hello, {props.name}!</div>
}

// <HelloWorld name="Sandy" />
```

### Functional Components vs Stateful Components

Ok, so these examples might convince you that writing components as simple
functions are easier than writing classes. However, this style of component was
limited to only those that do not maintain state. This limitation would lead
some developers to have one _stateful_ component that only maintained the state,
and then deferred all rendering to a stateless component.

This might look like:

```jsx
class ToDoListContainer extends React.Component {
  state = {
    list: [],
  }

  addItem = item => {
    this.setState({ list: [...this.state.list, item] })
  }

  // Code to remove items, sort items, mark complete, etc.

  render() {
    return (
      <ToDoList
        list={list}
        addItem={this.addItem}
        deleteItem={this.deleteItem}
      />
    )
  }
}

function ToDoList(props) {
  return (
    <ul>
      <li onClick={props.addItem}>Add item!</li>
      {list.map(item => (
        <li key={item.id} onClick={props.deleteItem}>
          {item}
        </li>
      ))}
    </ul>
  )
}
```

Thus the `ToDoList` is still a functional component. It does not maintain state.
Also the `ToDoListContainer` does not do any rendering, deferring that to the
`ToDoList` component.

In this way we get _the best of both worlds_, the stateful component only
manages state, and the stateless component receives its properties from the
outside world and is _only_ concerned with rendering content and dispatching
events.

### Can We Do Better?

Leading up to the `React 16.8.0` release the React developers wanted to address
issues that had been noticed over five years of writing, and supporting React
based projects.

Here are the issues these projects would have:

- It’s hard to reuse stateful logic between components

Take our `ToDoListContainer` example from above. It's real purpose is to manage
a list of items that can be added, deleted, sorted, marked complete. If we
wanted to reuse this idea for a different domain, say perhaps an entire project,
it would not be very easy. It will always want to render a `ToDoList`. Various
approaches were invented to deal with this. For instance we could send the class
name of the component as one of the `props` to `ToDoListContainer` -- or we
could use the fact that `this.props.children` would contain the children of a
component. We could then return something like `return this.props.children`, but
with a way to _inject_ the `prop` of the `list`.

However, all of these approaches had drawbacks.

- Complex components become hard to understand

We have seen some of the
[React Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html) when we
used `componentDidMount` to find a place to perform tasks such as
[loading data into state from an API](lesson://react-state)

However, there are many other lifecycle methods that can be used. On large
projects classes would become loaded with extra code to handle many different
requirements of the component. These components often became large and difficult
to refactor.

- Classes confuse both people and machines

Classes are relatively new to JavaScript which, until recently, did not have
_native_ support in most browsers for the syntax. This meant that any code with
`class` would have to be
[transpiled](https://en.wikipedia.org/wiki/Source-to-source_compiler). It also
makes us have to understand _JavaScripts dreaded `this`_

`function`s are much simpler to write and to understand. They lack the syntax
and concept complexity of classes.

## Enter Hooks

The idea of `hooks` were introduced to allow React developers to do everything a
traditional `class` based component could do, but with only using `function`
style definitions.

[React 16.8](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html) was
released on February 6, 2019. So they are very new to the React landscape.
However, since their introduction they have risen in popularity and are
considered the primary development style going forward. Most third party
libraries are supporting `class` based components but are developing all the
latest features focused on `hook` usage.

### The Simplest Hook: `useState`

We said that one of the things that `Stateless Functional Components` could not
do is maintain state. Certainly prior to `hooks` we could not define a
`function` style component and maintain state at all. This is what `useState`
attempts to resolve.

Let's make a component that has a very simple counter that increments it's value
each time a button is pressed.

```jsx
function Counter() {
  // prettier-ignore
  const counterValueAndSetMethod /* this is an array */ = useState( 0 /* initial state */)

  const counter = counterValueAndSetMethod[0]
  const setCounter = counterValueAndSetMethod[1]

  return (
    <div>
      <p>The counter is {counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Count!</button>
    </div>
  )
}
```

Whoa! Let's break this down.

We start the very first line of code with:

```jsx
const counterValueAndSetMethod = useState(0)
```

This line of code does a few things. First it declares that we are going to use
some state. It then says that the initial value of the state is going to be the
number `0`.

### `useState` rules

`useState` has a few particular _rules_ that we need to remember:

1. The value given to `useState` in parenthesis is used as the initial value
   only the first time the instance of the component is rendered. Even if the
   component is rendered again due to a state change, the value of the state
   isn't reset to the initial value. This may seem strange if we are going to
   call `useState` again when that render happens. How React makes this happen
   is a concept more deep than we have time to discuss at the moment.

2. `useState` always returns an _array_ with exactly _two_ elements. The
   **first** element is the _current value of the state_ and the **second**
   element is _a function that can change the value of this state_

In this way `useState` is kind of a mixture of `this.state` and `this.setState`
-- since `useState` returns a variable _containing_ the state, and another that
allows us to update the state.

It is **different** than `this.setState` from classes in these ways:

1. `this.setState` in classes allows us to do a _partial_ update. That is we can
   call `this.setState({ key: value})` and that `key` and `value` will be
   _merged_ into the current state. However with `useState` the state is
   _replaced_ with whatever we send it.

2. This is ok due to the second difference. In `class` we would define a
   **single** state and _have_ to use an object to track multiple state elements
   in a single component. Thus you would often see states like
   `state = { board: [], score: 0, playerOneName: 'Bill', playerTwoName: 'Susan'}`.
   In hooks this would be **four** different `useState` calls.

### Using the `useState` return value

The next two lines of code:

```jsx
const counter = counterValueAndSetMethod[0]
const setCounter = counterValueAndSetMethod[1]
```

Make two local variables to store the **current value** of our state, which we
call `counter` and the **method that updates the counter** as `setCounter`

Then in the JSX we can use those two local variables. The code
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

and this is how you will find every example of `useState`. See
[this article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
for more details on how and why this syntax works.

Thus our component will look like this:

```jsx
function Counter() {
  const [counter, setCounter] = useState(0)

  return (
    <div>
      <p>The counter is {counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Count!</button>
    </div>
  )
}
```

We have just combined the best of both worlds. We have the simplicty of the
function component with the ability to update state!

### Adding more state

Let's say we also wanted to keep track of a person's name in the counter.
Traditionally we would define a state like this:

```jsx
class CounterWithName extends React.Component {
  state = {
    counter: 0,
    name: '',
  }
}
```

However, with `hooks` we will make two **independent** states that each track a
single piece of information.

This has a few benefits:

1. It is easier to remove one part of the state since it has its own state
   variable and state changing function.

2. We can more easily tell where in the code a piece of state or a state
   changing function is used.

3. We don't have to worry about using `this.state.name` or `this.state.counter`,
   just `counter` and `name`.

Let's see what the component would look like if we were to use hooks:

```jsx
function CounterWithName() {
  const [counter, setCounter] = useState(0)
  const [name, setName] = useState('Susan')

  return (
    <div>
      <p>
        Hi there {name} The counter is {counter}
      </p>
      <button onClick={() => setCounter(counter + 1)}>Count!</button>
      <p>
        <input
          type="text"
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </p>
    </div>
  )
}
```

### Demo

<CounterWithName/>

Ah, how nice. We have independent **variables** to track our state, instead of
chained object access (e.g. `name` vs `this.state.name`) and very simple methods
to update the state `setName(event.target.value)`

## Not everything is perfect in the land of Hooks

As you could imagine a complex component could have a large number of `useState`
and we could find ourselves tracking many variables and functions. React has
another hook we will talk about later that will make this easer and there are
several libraries that help with managing _complex state_ in our components.

Also we haven't talked about how we will implement something like "The first
time the component is rendered I'd like to use `fetch` to get some data from the
internet and update the current state" -- We will see that in the next part of
the lesson.

The React team has a nice
[example of hooks](https://reactjs.org/docs/hooks-state.html) in their
[guide to hooks](https://reactjs.org/docs/hooks-intro.html)
