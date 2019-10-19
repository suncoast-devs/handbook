# Intro to React Hooks 🎣

[React Hooks](https://reactjs.org/docs/hooks-intro.html) are an addition to the React library (as of version 16.8) which provide state-management for functional components.

## Learning Objectives

- Brief refresher of React class-based and functional components
- Introducing the hook! But why is it important?
- "useState" concepts and an example
- "useEffect" concepts and an example
- Full class-based component converted to a functional component using hooks

## Recommended Previous Knowledge

- ES6 Javascript specification and familiarity with destructuring objects and arrays
- Basic React concepts
- State management with class-based React components
- Functional React components

## Notes

### Brief refresher of React class-based and functional components

Previously, component state was only available in class-based React components. You may recall manipulating the `state` field of a class-based component via the `setState` function, such as the trivial example below:

```js
import React, { Component } from 'react';

class Counter extends Component {
  state = {
    count: 0,
  };

  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count} <button onClick={this.incrementCount} /></p>
      </div>
    );
  }
}
```

While they are still a reliable method for composing React code, class-based components were criticized for a multitude of reasons: daunting complexity of learning the React component lifecycle, Javascript classes being difficult to understand, less-than-ideal performace, lots of boilerplate.

To simplify the requirements of components intended to be purely presentational (i.e. containing no state), "functional" components were added to the React api. Functional components removed some of the complexity of working with React component lifecycle methods, and allowed presentational code to be written in a more declarative, and less error-prone manner. They were also a more performant solution. A simple example may be seen below:

```js
import React from 'react';

const Counter = (props) => {
  const incrementCount = () => {
    // invoke a function that alters the state on the parent component providing the "count" prop
  };

  return (
    <div>
      <p>Count: {props.count} <button onClick={incrementCount} /></p>
    </div>
  );
}
```

The drawback of functional components (as seen in the example above) is that all of their data has to come from props, and thus at some point
they have to be wrapped in a parent class-based component in order to manage the component state at a higher level.

Now if only there was a way to add state directly to a functional component, we could remove the need for class-based components entirely...

### Now for the Hook!

Hooks were introduced for exactly that reason! Hooks were intended to be a non-breaking addition to the React api that would allow developers to transition their code to more functional state-management solutions, without rendering any of their existing class-based code obsolete.

[Here](https://www.youtube.com/watch?v=dpw9EHDh2bM) is an excellent introduction to hooks by Facebook engineer and Redux-creator, Dan Abramov.

Hooks are designed to be simple to implement, yet allow for robust emergent patterns, such as re-using similar state handlers amongst multiple React components. This lesson is meant to be a straightforward introduction to hooks by means of introducing the two foundational hooks, `useState` and `useEffect`. More advanced lessons will include: building custom re-usable hooks, combining hooks with the React `context` api in order to manage global app state, as well as eliminating the need for intermediary data structures when managing state by means of the `useMemo` hook.

### Introducing the State Hook, "useState"

The first hook is the one that adds basic state into a functional component, `useState`. You can access it by extending the `React` object, or destructuring it, i.e.

```js
// option A
import React from 'react';
// inside our functional component...
React.useState();

// option B
import React, { useState } from 'react';
// inside our functional component...
useState();
```

`useState` is a _function_ which returns a _tuple_ (an array with 2 items 😉). The first item returned in the tuple is the _piece of state you are creating_, and the second item returned is _an updater function which behaves like setState did in our class-based components_. The default value of our piece of state will be whatever input value is passed into the `setState()` function as its input parameter.

This may be useful:
```js
const [myString, functionToUpdateMyString] = setState('test value');

// we can see that myString is initialized with the value input into setState...
console.log(myString);
// >> 'test value'

// and we can update the myString value with our updater function...
functionToUpdateMyString('new test value');

console.log(myString);
// >> 'new test value' 🎉
```

If the syntax for destructuring the tuple values returned by setState is unfamiliar to you, it may be worth reviewing some basics of _array destructuring in ES6_.

Now, note that the above example ignores the React component lifecycle for sake of simplicity, but one point worth understanding is this: _invoking the state updater function will trigger a re-render of your functional component with the updated state value!_

Also, we are just demonstrating updating a `string`, but your state value can ba any data type you want (and is inferred based on what you initialize it as).

Let's update our `Counter` functional component from the intro to include its own state with the useState hook!

```js
import React, { useState } from 'react';

const Counter = (props) => {
  // note that you can name the values returned by the setState tuple anything you want!
  const [count, setCount] = useState(0);

  // create a function that computes the next value and uses setCount to update our state
  const incrementCount = () => {
    const newCount = count + 1;

    setCount(newCount);
  };

  return (
    <div>
      <p>Count: {count} <button onClick={incrementCount} /></p>
    </div>
  );
}
```

Don't worry if this seems a little confusing to you, it is probably just the new syntax. Destructuring tuples was a very uncommon pattern in javascript prior to hooks (almost unheard of actually!). Try playing with the example above until it "clicks". Realize that the names of the variables `count` and `setCount` are _abitrary_ and `setState()` returns an array containing 2 values: _a piece of "state"_, and _function to update that piece of state_. You can name them anything that makes sense to you!

Now we can completely remove class-based components from our app ...or can we?

### Introducing the Effect Hook, "useEffect"



### Full class-based component converted to a functional component using hooks 🎉

Tack Privateer capstan lad flogging draught code of conduct plunder jury mast knave. Galleon man-of-war tack cog loot dance the hempen jig gaff sutler draught Jack Ketch. Clap of thunder Plate Fleet lanyard lee ye come about furl Spanish Main brig schooner.

American Main carouser loaded to the gunwalls jury mast interloper hogshead pink aye bring a spring upon her cable transom. Prow sutler grapple yawl Admiral of the Black sloop parley hempen halter bucko jack. Bilge rat spyglass six pounders hulk starboard warp carouser lee run a rig handsomely.

Draft run a rig ho belaying pin league chantey to go on account chase black jack fathom. Scuppers Yellow Jack brigantine walk the plank aft rutters clap of thunder dead men tell no tales Sail ho smartly. Long clothes chantey reef sails aye Nelsons folly yo-ho-ho gangplank American Main belaying pin bucko.
