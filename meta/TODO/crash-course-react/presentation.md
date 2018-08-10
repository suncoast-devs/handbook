## An introduction to
# [fit] React
### [fit] A COOL JAVASCRIPT LIBRARY FOR BUILDING AWESOME USER INTERFACES

![](https://m.popkey.co/527299/MwREL.gif)

---

## Audience

- HTML
- CSS
- Fundamental JavaScript
- Some ES2015
- New to React

---

# [fit] Part I
## [fit] A Justification

![](https://m.popkey.co/f200d0/3evkY.gif)

---

## Managing "state" in a user interface is hard.

---

> Data changing over time is the root of all evil.
-- [Pete Hunt](https://www.youtube.com/watch?v=x7cQ3mrcKaY&t=15m52s)

![](assets/PeteHunt.jpg)

---

### [fit] We should be able to just declare:
## [fit] how our interface should look
### [fit] _at any given point in time_.

---

# Reusable Components

^ React provides a component based structure. Components are your lego pieces. You start with tiny components like button, checkbox, dropdown etc. and the you create wrapper components composed of those smaller components. And then you write higher level wrapper components. And, it goes on like that until you have this one root component and that component is your app.

---

# [fit] Part II
## [fit] Responsibility

![](https://m.popkey.co/732f72/RkGmJ.gif)

---

# [fit] React is not MVC

---

> It's just the "V" in "MVC".
> Right?

---

> ~~It's just the "V" in "MVC".~~
> React is its own thing.

![](assets/pumpkins.png)

---

React makes no presumptions about routing.

---

React doesn't care how you fetch or sync data.

---

Given a state, React will:

- render an interface
- handle events

---

# [fit] Part III
## [fit] Components

![](https://m.popkey.co/167685/5GXw9.gif)

---

# [fit] Convert data (state) into UI (HTML)

---

```JavaScript
import React from 'react'

class AwesomeWidget extends React.Component {

  render () {
    // The magic happens here!
  }
}
```

---

# `render()`

^ returns either:

- DOM Nodes
- Composite Components

---

It can also be a pure JavaScript function.

^ A stateless "functional" component

---

```JavaScript
const AwesomeWidget = () => {
  // The magic happens here.
}
```

---

A pure function is a function where the return value is only determined by its input values, without observable side effects.

---

```JavaScript
import React from 'react'

class AwesomeWidget extends React.Component {
  render() {
    return React.createElement('a', { href: 'http://facebook.github.io/react' }, 'React')
  }
}
```

---

```JavaScript
import React from 'react'

class AwesomeWidget extends React.Component {
  render() {
    return React.createElement('a', { href: 'http://facebook.github.io/react' }, 'React')
  }
}
```

```HTML
<a href="http://facebook.github.io/react">React</a>
```

---

```HTML
<html>
  <head>...</head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

---

```JavaScript
import React from 'react'
import ReactDOM from 'react-dom'
import AwesomeWidget = './AwesomeWidget'

ReactDOM.render(
  React.createElement(AwesomeWidget),
  document.getElementByID('root')
)
```

---

```HTML
<html>
  <head>...</head>
  <body>
    <div id="root">
      <a href="http://facebook.github.io/react">React</a>
    </div>
  </body>
</html>
```

---

# `props`

- Immutable
- Data passed to a component

^ like parameters to a function, can be used to pass callbacks into a child component

---

# `state`

- Mutable
- Internal to a component

---

```JavaScript
import React from 'react'

class AwesomeWidget extends React.Component {
  render() {
    return React.createElement('a', { href: this.props.url }, this.props.title)
  }
}

class App extends React.Component {
  render() {
    return React.createElement(AwesomeWidget, {
      link: 'http://facebook.github.io/react',
      title: 'React'
    })
  }
}
```

```HTML
<a href="http://facebook.github.io/react">React</a>
```

---

# [fit] Part IV
## [fit] JSX Syntax

![](https://m.popkey.co/0a718c/k8DQE.gif)

---

^ Let's look at our previous example.

```JavaScript
import React from 'react'

class AwesomeWidget extends React.Component {
  render() {
    return React.createElement('a', { href: this.props.url }, this.props.title)
  }
}

class App extends React.Component {
  render() {
    return React.createElement(AwesomeWidget, {
      link: 'http://facebook.github.io/react',
      title: 'React'
    })
  }
}
```

---

^ Calls to `createElement` become:

```JavaScript
import React from 'react'

class AwesomeWidget extends React.Component {
  render() {
    return <a href={this.props.url}>{this.props.title}</a>
  }
}

class App extends React.Component {
  render() {
    return <AwesomeWidget url='http://facebook.github.io/react' title='React' />
  }
}
```

---

## Why JSX?

- Not limited like a templating language, (e.g. Mustache)
- React components, _including JSX_, are plain JavaScript: `map()`, `filter()`, `reduce()`, etc.
- A descriptive declaration of your UI in code

---

# [fit] Part V
## [fit] Stateful Components

![](https://m.popkey.co/c43f13/VopKq.gif)

---

# [fit] One-way data flow

---

# [fit] Re-render *everything* on *every* update.

---

# [fit] [codepen.io/ambethia/pen/yoaVWp](https://codepen.io/ambethia/pen/yoaVWp)

```JavaScript
import React from 'react'

class ToggleSwitch extends React.Component {
  state = {
    active: false
  }

  _click = () => {
    this.setState({ active: !this.state.active })
  }

  render() {
    return <div className={this.state.active ? 'toggle on' : 'toggle off'}>
      <div className="switch" onClick={this._click} />
    </div>
  }
}
```

---

# [fit] Part VI
## [fit] Virtual DOM

![](https://m.popkey.co/91cb59/e9rVe.gif)

---

# Manipulating the DOM is slow

---

# Manipulating JS Objects is _fast_

---

# Server Side Rendering

^ Because the DOM is not being manipulated directly, you can render server-side.

---

# [fit] Part VII
## [fit] Lifecycle

![](https://m.popkey.co/9fbe53/0mZl8.gif)

---

```JavaScript
import React, { Component } from 'react'

const FruitItem = (props) =>
  <li>
    {props.name} from {props.country}.
  </li>

const FruitList = (props) =>
  <ul>
    {props.fruit.map(item => <FruitItem {...item} key={item.id} />)}
  </ul>
```

---

```JavaScript
import React, { Component } from 'react'

class AllHerFavoriteFruit extends Component {
  state = {
    fruit: []
  }

  componentDidMount() {
    fetch('/fruit.json').then(res => res.json()).then(data => setState({ fruit: data }))
  }

  render() {
    return (
      <div>
        <h1>All Her Favorite Fruit</h1>
        <FruitList fruit={this.state.fruit} />
        <p>...and all the most exotic places they are cultivated.</p>
      </div>
    )
  }
}
```

---

Some more lifecycle hooks include:

- `componentWillMount()`
- `componentDidMount()`
- `componentWillUnmount()`
- `componentWillUpdate()`
- `componentDidUpdate()`
- `componentWillReceiveProps()`
- `shouldComponentUpdate()`

---

# [fit] Part VIII
## [fit] Hands On

![](https://m.popkey.co/8b3a1f/g3jjO.gif)

---

# https://github.com/ambethia/awesome-color-picker

![](https://m.popkey.co/8b3a1f/g3jjO.gif)

---

# [fit] Part IX
## [fit] Q&A

![](https://m.popkey.co/75e260/l3XX0.gif)

---

![inline](assets/sdg.png)

# [fit] Find me on [suncoast.io](http://suncoast.io).
