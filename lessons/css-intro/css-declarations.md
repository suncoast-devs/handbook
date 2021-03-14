---
title: CSS Declarations
order: 3
---

Setting CSS properties to specific values is the core function of the CSS
language. What is important to remember is that both properties and values are
case-sensitive in CSS and that the property and value in each pair is separated
by a colon (:).

![](https://mdn.mozillademos.org/files/3665/css%20syntax%20-%20declaration.png)

There are more than
[300 different properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)
in CSS and nearly an infinite number of different values. Not all pairs of
properties and values are allowed; each property has a specific list of valid
values defined for it.

We have listed many of our
[favorite CSS properties](lessons/misc-quick-reference/css-properties) that we
feel represent the most typical properties a developer should be familiar with.

## CSS declaration blocks

Declarations are grouped in blocks, with each set of declarations being wrapped
by an opening curly brace, `{` and a closing one `}`.

Each declaration contained inside a declaration block has to be separated by a
semi-colon (`;`), otherwise the code won't work (or will at least give
unexpected results.) The last declaration of a block doesn't need to be
terminated by a semi-colon, though it is often considered good style to do so as
it prevents forgetting to add it when extending the block with another
declaration.

![](https://mdn.mozillademos.org/files/3667/css%20syntax%20-%20declarations%20block.png)

> _NOTE_: We highly recommend using the tool **Prettier**(https://prettier.io)
> to format your HTML, CSS, and JavaScript as it will apply good code style as
> you are learning. The developer tool setup instructions we supply document how
> to enable this.

## CSS selectors and rules

We are missing one part of the puzzle — we need to discuss how to tell our
declaration blocks which elements they should be applied to. This is done by
prefixing each declaration block with a
[_selector_](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) — a
pattern that matches some elements on the page. The associated declarations will
be applied to those elements only. The selector plus the declaration block is
called a ruleset, or often simply just a rule.

![](https://mdn.mozillademos.org/files/3668/css%20syntax%20-%20ruleset.png)

Selectors can get very complicated — you can make a rule match multiple elements
by including multiple selectors separated by commas (a group) and selectors can
be chained together. For example I want to select any element with a class of
`blah`, but only if it is inside an `<article>` element, and only while it is
being hovered by the mouse pointer. Don't worry — things will become clearer as
you become more experienced with CSS, and we'll explain selectors in great
detail.

## Shorthand

Some properties like `font`, `background`, `padding`, `border`, and `margin` are
called shorthand properties — this is because they allow you to set several
property values in a single line, saving time and making your code neater in the
process.

For example, this line:

```css
/* in shorthand like padding and margin, the values are applied
   in the order top, right, bottom, left (the same order as an analog clock, clock-wise). There are also other 
   shorthand types, for example two values, which set for example
   the padding for top/bottom, then left/right */
padding: 10px 15px 15px 5px;
```

Does the same thing as all these:

```css
padding-top: 10px;
padding-right: 15px;
padding-bottom: 15px;
padding-left: 5px;
```

Whereas this line:

```css
background: red url(bg-graphic.png) 10px 10px repeat-x fixed;
```

Does the same thing as all these:

```css
background-color: red;
background-image: url(bg-graphic.png);
background-position: 10px 10px;
background-repeat: repeat-x;
background-scroll: fixed;
```

We won't attempt to teach these exhaustively — you'll come across many examples
as you work with CSS.
