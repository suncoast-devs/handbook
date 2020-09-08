---
title: Layout
order: 3
---

# Flexbox and Grid

## Formatting the header

We notice that we'd like the list items in the header to be horizontally
aligned.

We can use `flexbox` to apply this.

First, we will add this CSS to the _parent_ as flexbox is always applied to the
_parent_ of the elements we want to flex.

```css
header ul {
  display: flex;
}
```

This will place all the list items on the same visual row. However, we want the
elements to be aligned in the center so we revise this CSS:

```css
header ul {
  display: flex;
  justify-content: center;
}
```

Finally we can add some visual interest by adding some letter spacing with this
revision:

```css
header ul {
  display: flex;
  justify-content: center;
  letter-spacing: 0.02rem;
}
```

Now all our items are jammed against each other. Let's put some space between
them:

```css
header li {
  margin-left: 1rem;
}
```

This is great, but we see that the elements are not in the center. Because we
have left margin on the very first item we are beginning `1rem` of space from
the center.

To solve this we could put a class on this item and _remove_ the margin.
However, we can strive to avoid adding specific classes when existing CSS
techniques can help.

To address all the elements _except_ the first element we can use a
`pseudo-selector`

```css
header li:not(:first-child) {
  margin-left: 1rem;
}
```

Here we apply two selectors, the first being `not` and then `:first-child`. In
this way, we are indicating that we want this `margin-left` on all the `li`
elements within the `header` that are **NOT** the first child. So in this case
it is the elements, for "Our animals", "Blog" and "About" but _NOT_ the element
"Home"

Another way to represent this is with an adjacency selector.

```css
header li + li {
  margin-left: 1rem;
}
```

In this solution, we apply this margin to any `li` that is immediately preceded
by another `li`. This would be true for all the elements but the very first one
which is **not** preceded by any element.

Both of these serve to format our list.

Let's put the `h1` in the center. Since this is a single element _and_ is a text
element we can style it as such:

```css
header h1 {
  text-align: center;
}
```

## Formatting the gallery of images

We'd like to format the gallery of images of "Our New Friends" in a nice grid.
To do so we will identify the `ul` by changing:

```html
<ul>
  <li>
    <img src="http://placekitten.com/320/240" alt="An Animal" />
  </li>
  <li>
    <img src="http://placekitten.com/320/240" alt="An Animal" />
  </li>
  <li>
    <img src="http://placekitten.com/320/240" alt="An Animal" />
  </li>
  <li>
    <img src="http://placekitten.com/320/240" alt="An Animal" />
  </li>
</ul>
```

into:

```html
<ul class="gallery">
  <li>
    <img src="http://placekitten.com/320/240" alt="An Animal" />
  </li>
  <li>
    <img src="http://placekitten.com/320/240" alt="An Animal" />
  </li>
  <li>
    <img src="http://placekitten.com/320/240" alt="An Animal" />
  </li>
  <li>
    <img src="http://placekitten.com/320/240" alt="An Animal" />
  </li>
</ul>
```

and then applying some grid styling:

```css
/* Sets up a two column grid */
.gallery {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

/* Make the image's 100% the size of their parent */
.gallery img {
  width: 100%;
}
```

# Conclusion

Applying `display: flex` and `display: grid` are powerful ways to arrange our
content with layouts that used to be very complex. With just a few lines of CSS
we have adjusted the header and gallery display to a more pleasing format.
