---
title: Getting started with CSS
---

import CodePen from '@handbook/CodePen'

CSS is a language for specifying how documents are presented to users — how they
are styled, laid out, etc.

## How does CSS affect HTML?

Web browsers apply CSS rules to a document to affect how they are displayed. A
CSS rule is formed from:

- A set of properties, which have values set to update how the HTML content is
  displayed, for example, I want my element's width to be 50% of its parent
  element, and its background to be red.
- A selector, which selects the element(s) you want to apply the updated
  property values to. For example, I want to apply my CSS rule to all the
  paragraphs in my HTML document.

A set of CSS rules contained within a stylesheet determines how a webpage should
look

## A quick CSS example

The above descriptions may or may not have made sense, so let's make sure things
are clear by presenting a quick example. First of all, let's take a simple HTML
document, containing an `<h1>` and a `<p>` (notice that a stylesheet is applied
to the HTML using a `<link>` element):

<CodePen>

The first rule starts with an `h1` selector, which means that it will apply its
property values to the `<h1>` element. It contains three properties and their
values (each property/value pair is called a declaration):

- The first one sets the text color to blue.
- The second sets the background color to yellow.
- The third one puts a border around the header that is 1 pixel wide, solid (not
  dotted, or dashed, etc.), and colored black.

The second rule starts with a p selector, which means that it will apply its
property values to the `<p>` element. It contains one declaration, which sets
the text color to red.

This isn't too pretty, but at least it starts to give you an idea of how CSS
works.

<pre data-lang='html'>
{`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>My CSS experiment</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>Hello World!</h1>
    <p>This is my first CSS example</p>
  </body>
</html>
`}
</pre>

<pre data-lang='css'>
{`
h1 {
  color: blue;
  background-color: yellow;
  border: 1px solid black;
}

p {
  color: red;
}
`}
</pre>

</CodePen>

---
