---
title: # Simple Selectors
---

import CodePen from '@handbook/CodePen'

<CodePen>

_"simple" selectors_ directly match one or more elements of a document, based on
the type of element, `class`, or `id`.

Consider this HTML and CSS.

You will see that the `<p>` tags are colored _red_ while the `<div>` tags are
colored _blue_.

<pre data-lang="html">
  {`
<p>What kind of ice cream do you like?</p>
<div>I like chocolate.</div>
<p>I prefer VANILLA!</p>
`}
</pre>

<pre data-lang="css">
  {`
/* All p elements are red */
p {
  color: red;
}

/* All div elements are blue */
div {
  color: blue;
}
`}
</pre>

</CodePen>

### Simple Class Based Selectors

<CodePen>

Instead of selecting elements based on the type of tag, we can select elements
based on their `class` property.

The class selector consists of a dot, `.`, followed by a class name. A class
name is any value, without spaces, placed within an HTML class attribute. It is
up to you to choose a name for the class. It is also noteworthy that multiple
elements in a document can have the same class value, and a single element can
have multiple class names separated by white space.

Consider this HTML and CSS.

In this case the first list item will be bold, the first two list items will be
struck through, and the last item will have no additional styles applied.

<pre data-lang="html">
  {`
<ul>
  <li class="first done">Create an HTML document</li>
  <li class="second done">Create a CSS style sheet</li>
  <li class="third">Link them all together</li>
</ul>
`}
</pre>

<pre data-lang="css">
  {`
/* The element with the class "first" is bolded */
.first {
  font-weight: bold;
}

/* All the elements with the class "done" are strikethrough */
.done {
  text-decoration: line-through;
}
`}
</pre>

</CodePen>

### Simple ID Based Selectors

<CodePen>

The ID selector consists of a hash/pound/octothorpe symbol `#`, followed by the
ID name of a given element. Any element can have a unique ID name set with the
id attribute. It is up to you to choose an ID name. It's the most efficient way
to select a single element.

Consider this HTML and CSS.

The greeting of `Good morning` will be in a cursive font while the `Go away`
text will be in a typewriter style font _and_ be converted to all _UPPERCASE_

<pre data-lang="html">
  {`
<p id="polite">— "Good morning."</p>
<p id="rude">— "Go away!"</p>
`}
</pre>

<pre data-lang="css">
  {`
#polite {
  font-family: cursive;
}

#rude {
  font-family: monospace;
  text-transform: uppercase;
}
`}
</pre>

</CodePen>

### Universal Simple Selector

The universal selector `*` is the ultimate joker. It allows selecting all
elements on a page. As it is rarely used to apply a style to every element on a
page, it is often used in combination with other selectors.

### Attribute Selectors

Many HTML tags are configured with attributes. For example, our `<a>` tags
contain an `href` containing a URL. With attribute selectors we could apply a
style to all links that are outside of our site, perhaps coloring them
differently, or providing a background image to indicate the link leaves our
site.

### Presence and value attribute selectors

These attribute selectors try to match an exact attribute value:

- `[attr]` : This selector will select all elements with the attribute attr,
  whatever its value.
- `[attr=val]` : This selector will select all elements with the attribute attr,
  but only if its value is val.
- `[attr~=val]`: This selector will select all elements with the attribute attr,
  but only if val is one of a space-separated list of words contained in attr's
  value.

### Substring value attribute selectors

<CodePen>

Attribute selectors in this class are also known as "RegExp-like selectors",
because they offer flexible matching in a similar fashion to regular expression
(but to be clear, these selectors are not true regular expression):

- `[attr^=val]` : This selector will select all elements with the attribute attr
  for which the value starts with val.
- `[attr$=val]` : This selector will select all elements with the attribute attr
  for which the value ends with val.
- `[attr*=val]` : This selector will select all elements with the attribute attr
  for which the value contains the substring val. (A substring is simply part of
  a string, e.g. "cat" is a substring in the string "caterpillar".)

See
[the attribute selectors example](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors)
to see how these selectors work

<pre data-lang="html">
  {`
<ul>
  <li><a href="http://google.com">Google</a></li>
  <li><a href="http://twitter.com/elonmusk">Elon Musk's Twitter</a></li>
  <li><a href="http://twitter.com/tim_cook">Tim Cook's Twitter</a></li>
  <li><a href="https://linkedin.com">Linked In</a></li>
</ul>
`}
</pre>

<pre data-lang="css">
  {`
body {
  font-family: sans-serif; 
}

ul {
  list-style: none;
}

li {
  padding: 1rem;  
}

a {
  color: black;
  text-decoration: none;
}

a[href*="twitter"] {
  font-size: 1.5rem;
}

a[href$="musk"] {
  color: red;
}
`}
</pre>

</CodePen>
