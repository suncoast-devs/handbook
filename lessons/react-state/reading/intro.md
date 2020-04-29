import CodePen from '@handbook/CodePen'

# React State

---

## React is based on `Components`

---

## Each component has `props` (properties)

---

## `props` are read only values passed into a component from a parent

```js
class Card extends React.Component {
  render() {
    return (
      <div>
        The ${this.props.face} of ${this.props.suit}
      </div>
    );
  }
}

class Deck extends React.Component {
  render() {
    return (
      <div>
        <Card face="7" suit="Hearts" />
        <Card face="A" suit="Diamons" />
      </div>
    );
  }
}
```

---

## STATE

---

## STATE is

- ... used to store information
- ... local to that component
- ... able to update and re-render the component

---

## STATE is

- ... used to pass data into child components.
- ... sent from the parent to become props in the children

---

## BASIC STATE

### Using state within a component

- where there is `constructor(props)` there will be `super(props)`

```js
class Person extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      age: 36,
    };
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>I am {this.state.age} years old.</h2>
      </div>
    );
  }
}
```

---

## BASIC STATE

### Using state to send props to a child component

```js
class Person extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      age: 36,
    };
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <AgeDisplay age={this.state.age} />
      </div>
    );
  }
}
```

---

## Updating State

---

## Basic Example

- `setState()` update state after the initial state setup
  - setState function in React works asynchronously

```js
class Person extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastName: "Tennant",
    };
  }

  updateLastName() {
    this.setState({
      lastName: "Smith",
      maidenName: "Tennant",
    });
  }

  render() {
    return <div>${this.state.lastName}</div>;
  }
}
```

---

## Life Cycle

---

### componentDidMount

> `componentDidMount()` is invoked immediately after a component is mounted (inserted into the tree). Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.

#### source: https://reactjs.org/docs/react-component.html#componentdidmount

---

## Full Source

```js
class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.state = { date: new Date() };
  }

  componentDidMount() {
    setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.setState({ date: new Date() });
  }

  render() {
    return (
      <div>
        <h3>The current time is</h3>
        <h2>{this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}
```

---
