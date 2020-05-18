---
title: Events
---

We have talked about JavaScript by itself, but in order for us to use our
scripts on the page we need to attach our functions to events that they browser
fires. Our JavaScript doesn't run until the browser tells our script to. The
browser gives us [`events`](https://developer.mozilla.org/en-US/docs/Web/Events)
that we can listen with our JavaScript. We can now have code say "when a user
does this, run this function".

Some examples of events, note that some events are user triggered, but some
events are browser triggered.

```
- When a user hovers over this table row, give that row a special css class.
- When a user clicks this button, increment a counter
- When a the page is loaded, create these HTML elements
- When the browser losses internet, display an error message
```

## Add event listeners

To attach a function to an event, we use an
[`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventListener)
like this:

```javascript
document.addEventListener("load", function () {
  console.log("loaded");
});

document.addEventListener("click", function () {
  console.log("click");
});
```

> [`document`](https://developer.mozilla.org/en-US/docs/Web/API/Document)
> represents any web page loaded in the browser and serves as an entry point
> into the web page's content, which is the DOM

## Global event handlers

If you think this feels a little verbose, you're not alone. Many of the
[most common event types](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers)
are available as element properties. This way we can set properties like
`onload` or `onclick` like this:

```javascript
document.onload = function () {
  console.log("loaded!");
};
document.onclick = function () {
  console.log("clicked!");
};
```

## Listening to events on elements

To go a little further, we want to trigger a function when a button is clicked.
To do this, we first need to get a reference to the button. We can use the
[`querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
method of the browser-provided
[`document`](https://developer.mozilla.org/en-US/docs/Web/API/Document) global
variable to get that reference. Then we can set our `displayMatches` function to
be the button's `onclick` handler.

```javascript
const button = document.querySelector(".submit");
button.onclick = displayMatches;
```

You can also combine the two statements together like this:

```javascript
document.querySelector(".submit").onclick = displayMatches;
```
