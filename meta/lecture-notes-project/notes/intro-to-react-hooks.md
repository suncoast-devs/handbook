# Intro to React Hooks 🎣

[React Hooks](https://reactjs.org/docs/hooks-intro.html) are an addition to the React library (as of version 16.8) which provide state-management for functional components.

## Learning Objectives

- Brief refresher of React class-based and functional components
- Introducing the hook! But why is it important?
- "useState" concepts and an example
- "useEffect" concepts and an example
- Full class-based component converted to a functional component using hooks

## Recommended Previous Knowledge

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

Tack Privateer capstan lad flogging draught code of conduct plunder jury mast knave. Galleon man-of-war tack cog loot dance the hempen jig gaff sutler draught Jack Ketch. Clap of thunder Plate Fleet lanyard lee ye come about furl Spanish Main brig schooner.

American Main carouser loaded to the gunwalls jury mast interloper hogshead pink aye bring a spring upon her cable transom. Prow sutler grapple yawl Admiral of the Black sloop parley hempen halter bucko jack. Bilge rat spyglass six pounders hulk starboard warp carouser lee run a rig handsomely.

Draft run a rig ho belaying pin league chantey to go on account chase black jack fathom. Scuppers Yellow Jack brigantine walk the plank aft rutters clap of thunder dead men tell no tales Sail ho smartly. Long clothes chantey reef sails aye Nelsons folly yo-ho-ho gangplank American Main belaying pin bucko.

### Introducing the State Hook, "useState"

Tack Privateer capstan lad flogging draught code of conduct plunder jury mast knave. Galleon man-of-war tack cog loot dance the hempen jig gaff sutler draught Jack Ketch. Clap of thunder Plate Fleet lanyard lee ye come about furl Spanish Main brig schooner.

American Main carouser loaded to the gunwalls jury mast interloper hogshead pink aye bring a spring upon her cable transom. Prow sutler grapple yawl Admiral of the Black sloop parley hempen halter bucko jack. Bilge rat spyglass six pounders hulk starboard warp carouser lee run a rig handsomely.

Draft run a rig ho belaying pin league chantey to go on account chase black jack fathom. Scuppers Yellow Jack brigantine walk the plank aft rutters clap of thunder dead men tell no tales Sail ho smartly. Long clothes chantey reef sails aye Nelsons folly yo-ho-ho gangplank American Main belaying pin bucko.

### Introducing the Effect Hook, "useEffect"

Tack Privateer capstan lad flogging draught code of conduct plunder jury mast knave. Galleon man-of-war tack cog loot dance the hempen jig gaff sutler draught Jack Ketch. Clap of thunder Plate Fleet lanyard lee ye come about furl Spanish Main brig schooner.

American Main carouser loaded to the gunwalls jury mast interloper hogshead pink aye bring a spring upon her cable transom. Prow sutler grapple yawl Admiral of the Black sloop parley hempen halter bucko jack. Bilge rat spyglass six pounders hulk starboard warp carouser lee run a rig handsomely.

Draft run a rig ho belaying pin league chantey to go on account chase black jack fathom. Scuppers Yellow Jack brigantine walk the plank aft rutters clap of thunder dead men tell no tales Sail ho smartly. Long clothes chantey reef sails aye Nelsons folly yo-ho-ho gangplank American Main belaying pin bucko.

### Full class-based component converted to a functional component using hooks 🎉

Tack Privateer capstan lad flogging draught code of conduct plunder jury mast knave. Galleon man-of-war tack cog loot dance the hempen jig gaff sutler draught Jack Ketch. Clap of thunder Plate Fleet lanyard lee ye come about furl Spanish Main brig schooner.

American Main carouser loaded to the gunwalls jury mast interloper hogshead pink aye bring a spring upon her cable transom. Prow sutler grapple yawl Admiral of the Black sloop parley hempen halter bucko jack. Bilge rat spyglass six pounders hulk starboard warp carouser lee run a rig handsomely.

Draft run a rig ho belaying pin league chantey to go on account chase black jack fathom. Scuppers Yellow Jack brigantine walk the plank aft rutters clap of thunder dead men tell no tales Sail ho smartly. Long clothes chantey reef sails aye Nelsons folly yo-ho-ho gangplank American Main belaying pin bucko.
