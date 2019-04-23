import CodePen from '@handbook/CodePen'

# Pseudo-classes

A CSS pseudo-class is a keyword added to the end of a selector, preceded by a colon `:`, which is used to specify that you want to style the selected element but only when it is in a certain state. For example, you might want to style a link element only when it is being hovered over by the mouse pointer, or a checkbox when it is disabled or checked, or an element that is the first child of its parent in the DOM tree.

## Examples

<CodePen>

<pre data-lang='html'>
{`
<ul>
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
  <li>Four</li>
  <li>Five</li>
  <li>Six</li>
  <li>Seven</li>
  <li>Eight</li>
  <li>Nine</li>
</ul>
`}
</pre>

<pre data-lang='css'>
{`
body {
  font-family: sans-serif;
}

ul {
  list-style: none;
}

/* Make the cursor a pointer when over the list */
ul:hover {
  cursor: pointer;  
}

li {
  font-size: 1.5rem;
  line-height: 2.5rem;
  transition: 1.5s;
  background: lightgrey;
}

/* the first li is colored red */
li:first-child {
  color: red;
}

/* All the prime numbered children are green */
li:nth-child(2),
li:nth-child(3),
li:nth-child(5),
li:nth-child(7) {
  color: green;
}

/* Change the font size, padding, and background color when hovered */
li:hover {
  font-size: 2rem;
  padding-left: 10rem;
  transition: 0s;
  background: darkgrey;
}
`}
</pre>

- [`:first-child`](https://developer.mozilla.org/en-US/docs/Web/CSS/:first-child) - represents the first element among a group of sibling elements.
- [`:focus`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus) - represents an element (such as a form input) that has received focus. It is generally triggered when the user clicks or taps on an element or selects it with the keyboard's "tab" key.
- [`:hover`](https://developer.mozilla.org/en-US/docs/Web/CSS/:hover) - matches when the user interacts with an element with a pointing device, but does not necessarily activate it. It is generally triggered when the user hovers over an element with the cursor (mouse pointer).
- [`:nth-child`](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child) - matches elements based on their position in a group of siblings.

</CodePen>

import pages from './pages'
import ReadingNav from '@handbook/ReadingNav'

<ReadingNav pages={pages}/>
