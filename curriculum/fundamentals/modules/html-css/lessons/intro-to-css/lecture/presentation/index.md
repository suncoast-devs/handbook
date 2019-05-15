theme: Libre, 7

![right original 90%](assets/bouy.png)

# [fit] Web Fundamentals

---

![right original 90%](assets/bouy.png)

# [fit] Intro to CSS

---

# [fit]CSS

CSS is a language for specifying how documents are presented to users — how they are styled, laid out, etc.

---

# CSS affects HTML

In order to use CSS we must first define our HTML content. This is often why developers lay out the HTML contents of a page/app before writing their CSS.

---

# CSS affects HTML

CSS uses the structure and attributes of our HTML to identify elements on the page to apply style to. This is also why the _semantics_ of the page are so important.

---

# Example

![right fit](assets/first-example.png)

```html
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
```

```css
h1 {
  color: blue;
  background-color: yellow;
  border: 1px solid black;
}

p {
  color: red;
}
```

^ Show this code in an app-app

---

# Vocabulary

Before we dive into the tech details of CSS, we need some vocabulary:

- Properties: Human-readable identifiers that indicate which stylistic features you want to change.

- Values: Indicates how you want to change those stylistic features

---

# Vocabulary

A property paired with a value is called a **CSS declaration**. CSS declarations are put within **CSS Declaration Blocks**. And finally, CSS declaration blocks are paired with selectors to produce **CSS Rulesets** (or CSS Rules).

---

# Declaration

![original 350%](assets/declaration.png)

^ There are more than 300 different properties in CSS and nearly an infinite number of different values. Not all pairs of properties and values are allowed; each property has a specific list of valid values defined for it.

---

# Declaration Block

![original 250%](assets/declaration-block.png)

^ Declarations are grouped in blocks, with each set of declarations being wrapped by an opening curly brace, { and a closing one }.

---

# [fit] Selectors + Declaration Block = Ruleset

![original 250%](assets/ruleset.png)

^ selector — a pattern that matches some elements on the page.

---

# Example Again

![right fit](assets/first-example.png)

```html
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
```

```css
h1 {
  color: blue;
  background-color: yellow;
  border: 1px solid black;
}

p {
  color: red;
}
```

^ Point out the various declarations, blocks, and selectors

---

# Shorthand (for the lazy developer)

- Some properties like `font`, `background`, `padding`, `border`, and `margin` allow for shorthand.
- They allow multiple properties in a single line

---

# Shorthand example

This

```css
p {
  padding: 10px 15px 15px 5px;
}
```

is the same as:

```css
p {
  padding-top: 10px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 5px;
}
```

---

# Selectors

Selectors follow a syntax that allows us to target specific sets of elements on the page. There are a few different types of syntax we can use:

### Simple selectors

### Attribute selectors

### Pseudo-classes

### Pseudo-elements

### Combinators

### Multiple selectors

---

# Simple Selectors - Tag Selector

One type of simple selector is the **Tag Selector**

Selects all elements using that tag.

```html
<p>What kind of ice cream do you like?</p>
<div>I like chocolate`.</div>
<p>I prefer VANILLA!</p>
```

```css
div {
  color: blue;
}
```

This will make the `<div>` elements **blue**

---

# Simple Selectors - Class Selectors

Instead of selecting elements based on the type of tag, we can select elements based on their class property.

The class selector consists of a dot, `.`, followed by a class name.

---

# Example

```html
<ul>
  <li class="first done">Create an HTML document</li>
  <li class="second done">Create a CSS style sheet</li>
  <li class="third">Link them all together</li>
</ul>
```

```css
/* The element with the class "first" is bolded */
.first {
  font-weight: bold;
}

/* All the elements with the class "done" are strikethrough */
.done {
  text-decoration: line-through;
}
```

---

# Simple Selectors - ID Selector

The ID selector consists of a hash/pound/octothorpe symbol `#`, followed by the ID name of a given element.

---

# Example

```html
<p id="polite">— "Good morning."</p>
<p id="rude">— "Go away!"</p>
```

```css
#polite {
  font-family: cursive;
}

#rude {
  font-family: monospace;
  text-transform: uppercase;
}
```

---
