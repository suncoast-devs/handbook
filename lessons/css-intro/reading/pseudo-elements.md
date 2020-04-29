import CodePen from '@handbook/CodePen'

# Pseudo Elements

Pseudo-elements are very much like pseudo-classes, but they have differences. They are keywords, this time preceded by two colons `::`, that can be added to the end of selectors to select a certain part of an element.

- [`::after`](https://developer.mozilla.org/en-US/docs/Web/CSS/::after)
- [`::before`](https://developer.mozilla.org/en-US/docs/Web/CSS/::before)
- [`::first-letter`](https://developer.mozilla.org/en-US/docs/Web/CSS/::first-letter)
- [`::first-line`](https://developer.mozilla.org/en-US/docs/Web/CSS/::first-line)
- [`::selection`](https://developer.mozilla.org/en-US/docs/Web/CSS/::selection)
- [`::backdrop`](https://developer.mozilla.org/en-US/docs/Web/CSS/::backdrop)

### Example

<CodePen>

Let's create two classes: one for boring paragraphs and one for exciting ones. We can use these classes to add pseudo-elements to the end of paragraphs.

<pre data-lang='html'>
{`
<p class="boring-text">Here is some plain old boring text.</p>
<p>Here is some normal text that is neither boring nor exciting.</p>
<p class="exciting-text">Contributing to MDN is easy and fun.</p>
`}
</pre>

<pre data-lang='css'>
{`
.exciting-text::after {
  content: ' <- EXCITING!';
  color: green;
}

.boring-text::after {
  content: ' <- BORING';
  color: red;
}
`}
</pre>

</CodePen>

### Example

<CodePen>

This example uses ::after, in conjunction with the attr() CSS expression and a data-descr custom data attribute, to create tooltips. No JavaScript is required!

<pre data-lang='html'>
{`
<p>
  Here we have some
  <span data-descr="collection of words and punctuation">text</span> with a few
  <span data-descr="small popups that appear when hovering">tooltips</span>.
</p>
`}
</pre>

<pre data-lang='css'>
{`
/* Any span that has a property data-descr */
span[data-descr] {
  position: relative;
  text-decoration: underline;
  color: #00f;
  cursor: help;
}

/* These styles will be applied to the psuedo element following any element that has a data-descr attribute, but ONLY when hovered */
span[data-descr]:hover::after {
  /* The CONTENT of this element will be the value of the data-descr attrbiute */
  content: attr(data-descr);
  position: absolute;
  left: 0;
  top: 24px;
  min-width: 200px;
  border: 1px #aaaaaa solid;
  border-radius: 10px;
  background-color: #ffffcc;
  padding: 12px;
  color: #000000;
  font-size: 14px;
  z-index: 1;
}
`}
</pre>

</CodePen>
