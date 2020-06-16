---
title: Events
order: 2
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
document.addEventListener('load', function () {
  console.log('loaded')
})

document.addEventListener('click', function () {
  console.log('click')
})
```

> [`document`](https://developer.mozilla.org/en-US/docs/Web/API/Document)
> represents any web page loaded in the browser and serves as an entry point
> into the web page's content, which is the DOM

## Listening to events on elements

To go a little further, we want to trigger a function when a button is clicked.
To do this, we first need to get a reference to the button. We can use the
[`querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
method of the browser-provided
[`document`](https://developer.mozilla.org/en-US/docs/Web/API/Document) global
variable to get that reference. Then we can set a `displayMatches` function to
be the button's `onclick` handler.

```javascript
function displayMatches() {
  console.log("Some button with the class 'submit' was clicked")
}

const button = document.querySelector('.submit')
button.addEventListener('click', displayMatches)
```

## Receiving details about an event

When the event happens it would be good to know details about the event itself.

When our event happens, the browser calls the function specified by the event listener and gives us a _parameter_ which contains details about the event. We'll name that argument `event` by convention.

From this `event` object we can find out many details of what happened. One of the properties of the `event` object is the `target`. This is the actual element that was involved in the event.

Lets console log the target. If we were to look at this in the developer tools we could see all the details of the element itself.

```javascript
function displayMatches(event) {
  console.log(event.target)
  console.log("Some button with the class 'submit' was clicked")
}

const button = document.querySelector('.submit')
button.addEventListener('click', displayMatches)
```

Let's extend our usage to another kind of element, an input, and another event, the `input` event.

```html
<div>
  <p>...</p>
  <input type="text" />
</div>
```

Lets setup an event listener to wait for the input to change. We will supply a callback function that will get the current contents of the input box and change the `<p>` tag to the contents of the input.

```javascript
const inputElement = document.querySelector('input')
const paragraphElement = document.querySelector('p')

const updateParagraph = event => {
  const currentInputValue = event.target.value

  paragraphElement.innerText = currentInputValue
}

inputElement.addEventListener('input', updateParagraph)
```

If we type something in the text input field we will see the `<p>` element change with it.

We could apply other transformations to the `currentInputValue` like capitalizing everything, or excluding all the vowels, etc.

### Event bubbling

What if we wanted to have multiple inputs such that changing any of them causes the `<p>` tag to update.

A first attempt might be:

```html
<div>
  <p>...</p>
  <input type="text" />
  <input type="text" />
  <input type="text" />
  <input type="text" />
</div>
```

```javascript
// Get **ALL** the input elements
const inputElements = document.querySelectorAll('input')
const paragraphElement = document.querySelector('p')

const updateParagraph = event => {
  const currentInputValue = event.target.value

  paragraphElement.innerText = currentInputValue
}

// Attach event listeners to each one
inputElements.forEach(element => element.addEventListener('input', updateParagraph))
```

We can use the fact that HTML is a nested structure to our advantage. When an event, such as input, occurs on an element it will propagate **up** the hierarchy of the document until it has no further parents. Some listener along the way can stop this process by calling `event.stopPropagation()` on the event object itself.

Since the `div` is the parent of all the `inputs` we can put our listener there!

```html
<div>
  <p>...</p>
  <input type="text" />
  <input type="text" />
  <input type="text" />
  <input type="text" />
</div>
```

```javascript
// Get **ALL** the input elements
const divElement = document.querySelector('div')
const paragraphElement = document.querySelector('p')

const updateParagraph = event => {
  const currentInputValue = event.target.value

  paragraphElement.innerText = currentInputValue
}

// Attach event listeners to each one
divElement.addEventListener('input', updateParagraph)
```

It is helpful that that event that causes the event (input, click, etc) does _not_ have to be the same event that is listening. This fact can come in handy for situations like a large form with many inputs where a single handler can work for all of them.
