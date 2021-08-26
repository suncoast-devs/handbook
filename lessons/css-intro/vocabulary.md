---
title: Vocabulary
order: 2
---

At its most basic level, CSS consists of two building blocks:

- **Properties**: Human-readable identifiers that indicate which stylistic
  features (e.g. font, width, background color) you want to change.
- **Values**: Each specified property is given a value, which indicates how you
  want to change those stylistic features (e.g. what you want to change the
  font, width, or background color to.)

A property paired with a value is called a _CSS declaration_. CSS declarations
are put within CSS Declaration Blocks. And finally, CSS declaration blocks are
paired with selectors to produce CSS Rulesets (or CSS Rules).

<CodePen>

Before getting too deep in theory and written explanation, let's look at a
concrete example.

This example uses four types of tags in the HTML, `h1`, `p`, `ul` and `li`

It also uses four `CSS Rules` to define styles for those tags.

Next, let's take a look at the structure of these CSS Rules and Declarations.

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

    <ul>
      <li>This is</li>
      <li>a list</li>
    </ul>
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

p,
li {
  text-decoration: underline;
}
`}
</pre>

</CodePen>
