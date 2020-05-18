---
title: Functions
---

In programming, a function is a reusable section of code that can be run multiple times to complete a repetitive task with minimum effort on the part of both the developer and the computer. Functions are usually associated with languages like JavaScript, Python, or C++, but they do exist in CSS too, as property values. We've already seen functions with `rgb()`, `hsl()`, etc.

But you'll see functions in other places too — anytime you see a name with parenthesis after it, containing one or more values separated by commas, you are dealing with a function. For example:

```css
div {
  /* calculate the new position of an element after it has been rotated by 45 degress */
  transform: rotate(45deg);
  /* calculate the new position of an element after it has been moved across 50px and down 60px */
  transform: translate(50px, 60px);
  /* calculate the computed value of 90% of the current width minus 15px */
  width: calc(90% - 15px);
  /* fetch an image from the network to be used as a background image */
  background-image: url("myimage.png");
  /* create a gradient and use it as a background image */
  background-image: linear-gradient(to left, teal, aquamarine);
}
```

One of the more common CSS functions is the [`url()`](https://developer.mozilla.org/en-US/docs/Web/CSS/url) function notation, which returns a file; generally an image as seen above.
