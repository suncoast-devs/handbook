Theme: Next, 1

# React Hooks

---

# History

- Stateless functional components

```jsx
class HelloWorld extends React.Component {
  render() {
    return <div>Hello, World!</div>
  }
}

// <HelloWorld />
```

---

# stateless

- Lacks `this.state` and `this.setState`

---

# Code ... Code everywhere ...

- A component can also be a `function` that returns `JSX`

```jsx
function HelloWorld() {
  return <div>Hello, World!</div>
}

// <HelloWorld />
```

---

# Easier to read and understand

- Less "ceremony"

---

# Yet, how do we access `props` if there is no `this` for `this.props`?

---

# Function receives props as an argument

```jsx
function HelloWorld(props) {
  return <div>Hello, {props.name}!</div>
}

// <HelloWorld name="Sandy" />
```

---

# Ok, ok. But what about event handlers?

```jsx
function handleClickOnDiv(event) {
  console.log('You clicked on the div!')
}

function HelloWorld(props) {
  return <div onClick={handleClickOnDiv}>Hello, {props.name}!</div>
}

// <HelloWorld name="Sandy" />
```

---

[.autoscale: true]

# [fit] We can also put functions inside functions

[.column]

```jsx
function HelloWorld(props) {
  function handleClickOnDiv(event) {
    console.log('You clicked on the div!')
  }

  return <div onClick={handleClickOnDiv}>Hello, {props.name}!</div>
}

// <HelloWorld name="Sandy" />
```

[.column]

![fit inline](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2Fz1meXneq0oUh2%2Fgiphy.gif&f=1&nofb=1)

---

# Or use arrow functions ...

```jsx
function HelloWorld(props) {
  const handleClickOnDiv = event => {
    console.log('You clicked on the div!')
  }

  return <div onClick={handleClickOnDiv}>Hello, {props.name}!</div>
}

// <HelloWorld name="Sandy" />
```

---

# Ok, how do these help?

- Separate concerns.
  - Stateful classes for managing state
  - Functional components for rendering

---

[.column]

```jsx
class ToDoListContainer extends React.Component {
  state = {
    list: [],
  }

  addItem = item => {
    this.setState({ list: [...this.state.list, item] })
  }

  // code to remove items, sort items, mark complete, etc.

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
```

[.column]

```jsx
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

---

# ToDoList is still functional and Stateless

The `ToDoListContainer` does not handle any rendering.
Its purpose is to manage state.

---

# Great, but two different styles?

- Use `classes` for state
- Use `function` for stateless

![fit right](https://media.giphy.com/media/l4JyRqcDU93S334KQ/source.gif)

---

[.autoscale: true]

# React 16.8.0

## Solve these challenges

- Hard to reuse stateful logic between components
- Complex components are hard to understand. (e.g. componentDidMount, componentWillMount, componentWillReceiveProps)
- See [React Lifecycle](https://cdn-images-1.medium.com/max/1600/1*u8hTumGAPQMYZIvfgQMfPA.jpeg)
- Classes are new and didn't _really_ fit the JavaScript style
- `function` is easier to write

---

# Enter Hooks

![](https://gifs.suncoast.io/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBTdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0f7e0d5535291cc82f410da4761392ed248ba5a6/tumblr_inline_odd2x9PvYg1raprkq_400.gif)

---

# Hooks

> Allow React developers to do everything a traditional `class` based component could do, but with only using `function` style definitions.

---

# The first hook

## `useState`

---

- `useState` is a method provided by `React`
- Meant to manage related state data (sometimes just a single number, sometimes an array or object)
- Called with the value the state should be the _first_ time the component renders

## Returning to our counter

```js
const counterValueAndSetMethod = useState(0)
```

---

# `useState` rules and behavior

1. The value in parenthesis is the initial value _only_
2. Returns an array of two values (we will see what these are in a moment)
3. Does a _full_ replacement of the state. Unlike `this.setState` that can do _partial_ updates

---

# What is in `counterValueAndSetMethod`?

It is an array with two entries.

- The first is the current value of the state
- The second is the _function_ that can change the state value

```js
const counterValueAndSetMethod = useState(0)

const counter = counterValueAndSetMethod[0]
const setCounter = counterValueAndSetMethod[1]
```

---

```js
const counter = counterValueAndSetMethod[0]
const setCounter = counterValueAndSetMethod[1]
```

Make two local variables to store the **current value** of our state, which we call **counter** and the **method that updates the counter** as **setCounter**

---

# Bring in some syntatic sugar

![](https://media.giphy.com/media/kVVEP6SmfEXvy/source.gif)

---

# Destructuring arrays!

```js
const names = ['Susan', 'Bob']

const first = names[0]
const other = names[1]
```

Better:

```js
const names = ['Susan', 'Bob']

const [first, other] = names
```

---

# Apply to `useState`

```jsx
const [counter, setCounter] = useState(0)
```

See [this article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) for more details on how and why this syntax works.

---

Apply this to our `Counter`

```jsx
function Counter() {
  const [counter, setCounter] = useState(0)

  function onClickButton() {
    setCounter(counter + 1)
  }

  return (
    <div>
      <p>The counter is {counter}</p>
      <button onClick={onClickButton}>Count!</button>
    </div>
  )
}
```

---

# What about a second bit of state?

- Keep track of a person's name on the counter.
- Traditionally we would define a state like this:

```jsx
class CounterWithName extends React.Component {
  state = {
    counter: 0,
    name: '',
  }
}
```

---

[.autoscale: true]

# Hooks allows us to have _multiple_ independent states

Separating these pieces of state has a few benefits:

1. It is easier to remove one part of the state since it has its own variable and state changing function.

2. We can more easily tell where in the code a piece of state or a state changing function is used.

3. We don't have to worry about using `this.state.name` or `this.state.counter`, just `counter` and `name`.

---

```jsx
function CounterWithName() {
  const [counter, setCounter] = useState(0)
  const [name, setName] = useState('Susan')

  function onClickButton() {
    setCounter(counter + 1)
  }

  function onChangeInput(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <p>
        Hi there {name} The counter is {counter}
      </p>
      <button onClick={onClickButton}>Count!</button>
      <p>
        <input type="text" value={name} onChange={onChangeInput} />
      </p>
    </div>
  )
}
```

---

# Not everything is perfect...

- Components can end up with _many_ `useState`
- Have to keep track of multiple variables
- Also, how do we handle the _when I first mount/render please fetch some data_

---

## React comes with other hooks "out of the box"

- We'll look at some of these next.
  - `useEffect`
  - `useReducer`
  - `useContext`

---

The React team has a nice [example of hooks](https://reactjs.org/docs/hooks-state.html) in their [guide to hooks](https://reactjs.org/docs/hooks-intro.html)

---
