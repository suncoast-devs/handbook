---
title: Interacting with the DOM
order: 1
---

Not only do we use JavaScript to code our logic, but we also use JavaScript to
interact with the
[`DOM`](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model).
This is how we can update and interact with the HTML that is on our page.

## What is the DOM?

The `DOM` or `Document Object Model` is the internal representation the browser
creates after reading our HTML source code and creating the various elements
that correspond to the structure of the HTML.

You can think of the HTML we write as instructions to the browser on what real
elements to create on the page. The DOM elements are the actual objects the
browser creates and maintains. It is these real objects that are "rendered" to
the display. These objects are the same ones we see inside the _Developer Tools_
when we are _inspecting_ our page.

You can try updating the DOM yourself by using your browser to load a page and
change elements, add properties, change the text of an element, or remove an
element completely.

While this is interesting and often helpful for debugging, it isn't enough to be
able to do this from just the developer tools.

We will be writing JavaScript to do this for us, eventually using existing code
libraries to help us.

## Where does the DOM live in our code?

The various objects that make up our page, our `<h1>` elements, `<p>` elements,
etc., are all accessible via a special variable the browser provides to our
code. This variable is named `document` and represents the browser's view of the
currently rendering `document` (or, in other terms, the _page_).

It is this variable that all of our interactions with the document/page will
happen.

However, to access the individual objects, we need to be able to **query** the
document and find elements.

## Query the DOM

To interact with the DOM, we need to query the DOM to find the element we want
to use.

As we learned with CSS, we need a way to specify which element, or set of
elements, we want to work with. In `CSS`, this was the _selector_, and it makes
an appearance again here.

### Using CSS Selectors in JavaScript

Take a look at the following code.

```javascript
//
//
//    Variable that will have an HTMLElement
//    |
//    |            The document itself
//    |            |
//    |            |        A method that takes a string of a CSS selector and returns the *first* matching element
//    |            |        |
//    |            |        |             CSS Selector we are looking for
//    |            |        |             |
//    v            v        v             v
const pageHeader = document.querySelector('.page-header')
```

This code goes to the `document` and finds the first element that has the class
`.page-header` and stores a reference to that element in the variable called
`pageHeader`.

> _NOTE_: If no match was found at all, then the return will be `null`,
> indicating there is no match.

Now that we have the `pageHeader` as a variable,, we use it in our code just
like any other variable. Notice the parameter to the querySelector function;
that is the same style of selector we have in CSS. These selectors can be as
complex and as specific as the CSS selectors we have previously learned.

### Fetching more than one element at once

> _NOTE_ : `querySelector` returns only the first element that matches the
> query. If you want all the elements that match that selector, you will want to
> use `querySelectorAll`

```javascript
const headers = document.querySelectorAll('h1')
```

In this case, `headers` are a `NodeList` of `HTMLElement`. We cannot do
everything we can with an array with a `NodeList`, but `forEach` will allow us
to iterate through the list of elements.

```javascript
const headers = document.querySelectorAll('h1')
headers.forEach(header => {
  // Do something with the header
})
```

### Adjusting properties on elements

All of the things we can specify via writing HTML can be accessed and changed
here.

For instance, if we wanted to change the text content of the `h1` elements we
found with `querySelector` or `querySelectorAll`, we could.

```javascript
const header = document.querySelector('h1')

// Make sure it isn't null
if (header) {
  // Change the content of the element
  header.textContent = 'This is different text'

  // Add a new class to the list of classes, this element
  //  has, which might change what CSS rules apply to it!
  header.classList.add('highlighted')
}
```

There is a long list of properties of elements we can read/adjust. However, we
will not spend a lot of time at this low level of programming so, we won't take
time to review them all.
