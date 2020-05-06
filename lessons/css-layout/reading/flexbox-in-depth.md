---
title: Flexbox
---

## Why Flexbox?

In the Web of the past the only reliable cross browser-compatible tools
available for creating CSS layouts were things like floats and positioning.
These are fine and they work, but in some ways they are also rather limiting and
frustrating.

Positioning elements on a page often induced this feeling with web developers.

![](./assets/css-float-frustration.gif)

The following simple layout requirements are either difficult or impossible to
achieve with such tools, in any kind of convenient, flexible way:

- Vertically centering a block of content inside its parent.
- Making all the children of a container take up an equal amount of the
  available width/height, regardless of how much width/height is available.
- Making all columns in a multiple column layout adopt the same height even if
  they contain a different amount of content.

As you'll see in subsequent sections, flexbox makes a lot of layout tasks much
easier.

---

## A Simple Example

We are going to get you to work through a series of exercises to help you
understand how flexbox works.

<CodePen>

To get started, lets look at this example

<pre data-lang='html'>
{`
<header>
  <h1>Sample flexbox example</h1>
</header>

<section>
  <article>
    <h2>First article</h2>

    <p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</p>
  </article>

  <article>
    <h2>Second article</h2>

    <p>Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.</p>
  </article>

  <article>
    <h2>Third article</h2>

    <p>Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.</p>

    <p>Podcasting operational change management inside of workflows to establish a framework. Taking seamless key performance indicators offline to maximise the long tail. Keeping your eye on the ball while performing a deep dive on the start-up mentality to derive convergence on cross-platform integration.</p>
  </article>
</section>
`}
</pre>

<pre data-lang='css'>
{`
html {
  font-family: sans-serif;
}

body {
  margin: 0;
}

header {
  background: #85577e;
  height: 100px;
}

h1 {
  text-align: center;
  color: white;
  line-height: 100px;
  margin: 0;
}

article {
  padding: 10px;
  margin: 10px;
  background: #80ced2;
}
`}
</pre>

</CodePen>

---

## Specifying what elements to lay out as flexible boxes

<CodePen>

To start with, we need to select which elements are to be laid out as flexible
boxes. To do this, we set a special value of display on the **parent** element
of the elements you want to affect. In this case we want to lay out the
`<article>` elements, so we set this on the `<section>` (which becomes a flex
container)

> This is a key concept: we set the `display: flex` on the **parent** element of
> the items to layout. The `display: flex` only affects the **immediate**
> children of the flexed element.

<pre data-lang='html'>
{`
<header>
  <h1>Sample flexbox example</h1>
</header>

<section>
  <article>
    <h2>First article</h2>

    <p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</p>
  </article>

  <article>
    <h2>Second article</h2>

    <p>Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.</p>
  </article>

  <article>
    <h2>Third article</h2>

    <p>Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.</p>

    <p>Podcasting operational change management inside of workflows to establish a framework. Taking seamless key performance indicators offline to maximise the long tail. Keeping your eye on the ball while performing a deep dive on the start-up mentality to derive convergence on cross-platform integration.</p>
  </article>
</section>
`}
</pre>

<pre data-lang='css'>
{`
html {
  font-family: sans-serif;
}

body {
  margin: 0;
}

header {
  background: #85577e;
  height: 100px;
}

h1 {
  text-align: center;
  color: white;
  line-height: 100px;
  margin: 0;
}

article {
  padding: 10px;
  margin: 10px;
  background: #80ced2;
}

/* ADDED: This tells all section tags to layout their children _flexibly_ */
section {
  display: flex;
}

`}
</pre>

</CodePen>

---

### Tada! 🎉

So, this single declaration gives us everything we need — incredible, right? We
have our multiple column layout with equal sized columns, and the columns are
all the same height. This is because the default values given to flex items (the
children of the flex container) are set up to solve common problems such as
this. More on those later.

## Terminology: Understanding the flex model

When elements are laid out as flexible boxes, they are laid out along two axes:

![flex terms](https://developer.mozilla.org/files/3739/flex_terms.png)

|            |                                                                                                                                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| main axis  | The axis running in the direction the flex items are being laid out in (e.g. as rows across the page, or columns down the page.) The start and end of this axis are called the main start and main end. |
| cross axis | The axis running perpendicular to the direction the flex items are being laid out in. The start and end of this axis are called the cross start and cross end.                                          |
| parent     | The parent element that has `display: flex` set on it (the `<section>` in our example) is called the flex container.                                                                                    |
| flex items | The items being laid out as flexible boxes inside the flex container are called flex items (the `<article>` elements in our example).                                                                   |
|            |                                                                                                                                                                                                         |

## Columns vs Rows

Flexbox provides a property called `flex-direction` that specifies what
direction the main axis runs in (what direction the flexbox children are laid
out in) — by default this is set to row, which causes them to be laid out in a
row in the direction your browser's default language works in (left to right, in
the case of an English browser).

> Try adding the following declaration to your `<section>` rule in the previous
> example `flex-direction: column;`

You'll see that this puts the items back in a column layout, much like they were
before we added any CSS. **Before you move on, delete this declaration from your
example.**

## Wrapping

<CodePen>

One issue that arises when you have a fixed amount of width or height in your
layout is that eventually your flexbox children will overflow their container.

<pre data-lang='html'>
{`
<header>
  <h1>Sample flexbox example</h1>
</header>

<section>
  <article>
    <h2>First article</h2>

    <p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</p>
  </article>

  <article>
    <h2>Second article</h2>

    <p>Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.</p>
  </article>

  <article>
    <h2>Third article</h2>

    <p>Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.</p>

    <p>Podcasting operational change management inside of workflows to establish a framework. Taking seamless key performance indicators offline to maximise the long tail. Keeping your eye on the ball while performing a deep dive on the start-up mentality to derive convergence on cross-platform integration.</p>
  </article>
  <article>
    <h2>First article</h2>

    <p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</p>
  </article>

  <article>
    <h2>Second article</h2>

    <p>Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.</p>
  </article>

  <article>
    <h2>Third article</h2>

    <p>Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.</p>

    <p>Podcasting operational change management inside of workflows to establish a framework. Taking seamless key performance indicators offline to maximise the long tail. Keeping your eye on the ball while performing a deep dive on the start-up mentality to derive convergence on cross-platform integration.</p>
  </article>
</section>
`}
</pre>

<pre data-lang='css'>
{`
html {
  font-family: sans-serif;
}

body {
  margin: 0;
}

header {
  background: #85577e;
  height: 100px;
}

h1 {
  text-align: center;
  color: white;
  line-height: 100px;
  margin: 0;
}

article {
  padding: 10px;
  margin: 10px;
  background: #80ced2;
}

section {
  display: flex;
}
`}
</pre>

</CodePen>

---

Here we see that the children are indeed breaking out of their container. One
way in which you can fix this is to add the following declaration to your
`<section>` rule.

```css
section {
  flex-wrap: wrap;
}
```

This will tell the browser to flow the content within the `section` to the next
row when it runs out of space on the current row.

We will also set this for `<article>`:

```css
article {
  flex: 200px;
}
```

The `flex: 200px` declaration means that each will be at least 200px wide

> Try adding `flex-direction: row-reverse` to the `section` — now you'll see
> that you still have your multiple row layout, but it starts from the opposite
> corner of the browser window and flows in reverse.

<CodePen>

<pre data-lang='html'>
{`
<header>
  <h1>Sample flexbox example</h1>
</header>

<section>
  <article>
    <h2>First article</h2>

    <p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</p>
  </article>

  <article>
    <h2>Second article</h2>

    <p>Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.</p>
  </article>

  <article>
    <h2>Third article</h2>

    <p>Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.</p>

    <p>Podcasting operational change management inside of workflows to establish a framework. Taking seamless key performance indicators offline to maximise the long tail. Keeping your eye on the ball while performing a deep dive on the start-up mentality to derive convergence on cross-platform integration.</p>
  </article>
  <article>
    <h2>First article</h2>

    <p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</p>
  </article>

  <article>
    <h2>Second article</h2>

    <p>Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.</p>
  </article>

  <article>
    <h2>Third article</h2>

    <p>Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.</p>

    <p>Podcasting operational change management inside of workflows to establish a framework. Taking seamless key performance indicators offline to maximise the long tail. Keeping your eye on the ball while performing a deep dive on the start-up mentality to derive convergence on cross-platform integration.</p>
  </article>
</section>
`}
</pre>

<pre data-lang='css'>
{`
html {
  font-family: sans-serif;
}

body {
  margin: 0;
}

header {
  background: #85577e;
  height: 100px;
}

h1 {
  text-align: center;
  color: white;
  line-height: 100px;
  margin: 0;
}

article {
  padding: 10px;
  margin: 10px;
  background: #80ced2;
}

article {
  flex: 200px;
}

section {
  display: flex;
  flex-wrap: wrap;
}
`}
</pre>

</CodePen>

## Horizontal and vertical alignment

<CodePen>

You can also use flexbox features to align flex items along the main or cross
axis.

**align-items**

`align-items` controls where the flex items sit on the cross axis.

|                        |                                                                                                                                                                                                                                                                                                                                   |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `stretch`              | By default, the value is stretch, which stretches all flex items to fill the parent in the direction of the cross axis. If the parent hasn't got a fixed width in the cross axis direction, then all flex items will become as long as the longest flex items. This is how our first example got equal height columns by default. |
| `center`               | The center value that we used in our above code causes the items to maintain their intrinsic dimensions, but be centered along the cross axis. This is why our current example's buttons are centered vertically.                                                                                                                 |
| `flex-start, flex-end` | You can also have values like flex-start and flex-end, which will align all items at the start and end of the cross axis respectively. See align-items for the full details.                                                                                                                                                      |
|                        |                                                                                                                                                                                                                                                                                                                                   |

> Try changing `align-items` in this example to `stretch`, `flex-start`, and
> `flex-end`

**justify-content**

`justify-content` controls where the flex items sit on the main axis.

|                 |                                                                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `flex-start`    | The default value is flex-start, which makes all the items sit at the start of the main axis.                                                          |
| `flex-end`      | You can use flex-end to make them sit at the end.                                                                                                      |
| `center`        | center is also a value for justify-content, and will make the flex items sit in the center of the main axis.                                           |
| `space-around`  | The value we've used above, space-around, is useful — it distributes all the items evenly along the main axis, with a bit of space left at either end. |
| `space-between` | There is another value, space-between, which is very similar to space-around except that it doesn't leave any space at either end.                     |
|                 |                                                                                                                                                        |

> Try changing `justify-content` in this example to `flex-start`, `flex-end`,
> `center`, `space-around` and `space-between`

<pre data-lang='html'>
{`
<div>
  <button>Smile</button>
  <button>Laugh</button>
  <button>Wink</button>
  <button>Shrug</button>
  <button>Blush</button>
</div>
`}
</pre>

<pre data-lang='css'>
{`
html {
  font-family: sans-serif;
}

body {
  width: 70%;
  max-width: 960px;
  margin: 20px auto;
}

button {
  font-size: 18px;
  line-height: 1.5;
  width: 15%;
}

div {
  height: 100px;
  border: 1px solid black;

  display: flex;
  align-items: center;
  justify-content: space-around;
}

`}
</pre>

</CodePen>

---

### Ordering flex items

<CodePen>

Flexbox also has a feature for changing the layout order of flex items, without
affecting the source order. This is another thing that is impossible to do with
traditional layout methods.

We've added

`button:first-child { order: 1; }`

You'll now see that the "Smile" button has moved to the end of the main axis.

- By default, all flex items have an order value of 0.
- Flex items with higher order values set on them will appear later in the
  display order than items with lower order values.
- Flex items with the same order value will appear in their source order. So if
  you have four items with order values of 2, 1, 1, and 0 set on them
  respectively, their display order would be 4th, 2nd, 3rd, then 1st.
- The 3rd item appears after the 2nd because it has the same order value and is
  after it in the source order.

You can set negative order values to make items appear earlier than items with 0
set. For example, you could make the "Blush" button appear at the start of the
main axis using the following rule:

`button:last-child { order: -1; }`

> Try it!

<pre data-lang='html'>
{`
<div>
  <button>Smile</button>
  <button>Laugh</button>
  <button>Wink</button>
  <button>Shrug</button>
  <button>Blush</button>
</div>
`}
</pre>

<pre data-lang='css'>
{`
html {
  font-family: sans-serif;
}

body {
  width: 70%;
  max-width: 960px;
  margin: 20px auto;
}

button {
  font-size: 18px;
  line-height: 1.5;
  width: 15%;
}

button:first-child {
  order: 1;
}

div {
  height: 100px;
  border: 1px solid black;

  display: flex;
  align-items: center;
  justify-content: space-around;
}

`}
</pre>

</CodePen>

---

## Let's take it a level higher! -- Nesting flex boxes

Lets take a look at this more complex layout

<CodePen defaultTab='results'>

<pre data-lang='html'>
{`
<header>
  <h1>Sample flexbox example</h1>
</header>

<section>
  <article>
    <h2>First article</h2>

    <p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</p>
  </article>

  <article>
    <h2>Second article</h2>

    <p>Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.</p>
  </article>

  <article>
    <div>
      <button>Smile</button>
      <button>Laugh</button>
      <button>Wink</button>
      <button>Shrug</button>
      <button>Blush</button>
    </div>

    <p>Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.</p>

    <p>Podcasting operational change management inside of workflows to establish a framework. Taking seamless key performance indicators offline to maximise the long tail. Keeping your eye on the ball while performing a deep dive on the start-up mentality to derive convergence on cross-platform integration.</p>
  </article>
</section>
`}
</pre>

<pre data-lang='css'>
{`
html {
  font-family: sans-serif;
}

body {
  margin: 0;
}

header {
  background: #85577e;
  height: 100px;
}

h1 {
  text-align: center;
  color: white;
  line-height: 100px;
  margin: 0;
}

article {
  padding: 10px;
  margin: 10px;
  background: #80ced2;
}

section {
  display: flex;
}
article {
  flex: 1 200px;
}
article:nth-of-type(3) {
  flex: 3 200px;
  display: flex;
  flex-flow: column;
}
article:nth-of-type(3) div:first-child {
  flex: 1 100px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-around;
}
button {
  flex: 1 auto;
  margin: 5px;
  font-size: 18px;
  line-height: 1.5;
}
`}
</pre>

</CodePen>

---

The HTML for this is fairly simple. We've got a `<section>` element containing
three `<article>`s. The third `<article>` contains three `<div>`s. :

```
section - article
          article
          article - div - button
                    div   button
                    div   button
                          button
                          button
```

---

** Let's look at the code we've used for the layout. **

---

First of all, we set the children of the `<section>` to be laid out as flexible
boxes.

```css
section {
  display: flex;
}
```

---

Next, we set some flex values on the `<article>`s themselves. Take special note
of the 2nd rule here — we are setting the third `<article>` to have its children
laid out like flex items too, but this time we are laying them out like a
column.

```css
article {
  flex: 1 200px;
}

article:nth-of-type(3) {
  flex: 3 200px;
  display: flex;
  flex-flow: column;
}
```

---

Next, we select the first `<div>`. We first use `flex:1 100px;` to effectively
give it a minimum height of `100px`, then we set its children (the `<button>`
elements) to also be laid out like flex items. Here we lay them out in a
wrapping row, and align them in the center of the available space like we did in
the individual button example we saw earlier.

```
article:nth-of-type(3) div:first-child {
  flex:1 100px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-around;
}
```

---

Finally, we set some sizing on the button, but more interestingly we give it a
flex value of 1 auto. This has a very interesting effect, which you'll see if
you try resizing your browser window width. The buttons will take up as much
space as they can and sit as many on the same line as they can, but when they
can no longer fit comfortably on the same line, they'll drop down to create new
lines.

```css
button {
  flex: 1 auto;
  margin: 5px;
  font-size: 18px;
  line-height: 1.5;
}
```

---

## Further Reading

Flexbox can be a challenging concept to master. Here are some references we feel
will be good to review:

- [Flexbox Froggy - a Game for Learning Flexbox](https://flexboxfroggy.com/)
- [A Complete Guide to Flexbox - by CSS Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Flexbox Visual Guide Tutorial](https://marina-ferreira.github.io/tutorials/css/flexbox/)

---
