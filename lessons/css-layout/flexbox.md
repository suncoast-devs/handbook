---
title: Flexbox
order: 3
---

Flexbox is the short name for the Flexible Box Layout Module, designed to make
it easy for us to lay things out in one dimension — either as a row or as a
column. To use flexbox, you apply `display: flex` to the parent element of the
elements you want to lay out; all its direct children then become flex items. We
can see this in a simple example.

<CodePen>

The HTML markup below gives us a containing element, with a class of wrapper,
inside which are three `<div>` elements. By default these would display as block
elements, below one another.

However, if we add `display: flex` to the parent, the three items now arrange
themselves into columns. This is due to them becoming _flex items_ and using
some initial values that flexbox gives them. They are displayed as a row,
because the initial value of `flex-direction` is row. They all appear to stretch
to the height of the tallest item, because the initial value of the align-items
property is stretch. This means that the items stretch to the height of the flex
container, which in this case is defined by the tallest item. The items all line
up at the start of the container, leaving any extra space at the end of the row.

> Try taking `display: flex` off the `.wrapper` CSS and see how the layout of
> the elements change.

<pre data-lang='html'>
{`
<div class="wrapper">
  <div class="box1">One</div>
  <div class="box2">Two</div>
  <div class="box3">Three</div>
</div>
`}
</pre>

<pre data-lang='css'>
{`
.wrapper {
  display: flex;
}

/* Give the divs some style */
.wrapper > div {
  border-radius: 5px;
  background-color: rgb(207,232,220);
  padding: 1em;
}
`}
</pre>

</CodePen>

---

# Additional flex properties

In addition to the above properties that can be applied to the flex container,
there are properties that can be applied to the flex items. These properties,
among other things, can change the way that the items flex, enabling them to
expand and contract to fit into the available space.

<CodePen>

As a simple example of this, we can add the flex property to all of our child
items, with a value of 1. This will cause all of the items to grow and fill the
container, rather than leaving space at the end.

If there is more space then the items will become wider; if there is less space
they will become narrower. In addition, if you add another element to the markup
the items will all become smaller to make space for it — they will adjust size
to take up the same amount of space, whatever that is.

> Try adding another `<div>` to the existing collection and see how the layout
> changes.

<pre data-lang='html'>
{`
<div class="wrapper">
  <div class="box1">One</div>
  <div class="box2">Two</div>
  <div class="box3">Three</div>
</div>

`}
</pre>

<pre data-lang='css'>
{`
.wrapper {
  display: flex;
}

.wrapper > div {
  flex: 1;
}

/* Give the divs some style */
.wrapper > div {
  border-radius: 5px;
  background-color: rgb(207,232,220);
  padding: 1em;
}

`}
</pre>

</CodePen>

---

The rest of this guide covers other layout methods, which are less important for
the main layout structures of your page but can still help you achieve specific
tasks. By understanding the nature of each layout task, you will soon find that
when you look at a particular component of your design the type of layout best
suited to it will often be clear.

We will also be returning for a deeper dive into `flexbox`

---
