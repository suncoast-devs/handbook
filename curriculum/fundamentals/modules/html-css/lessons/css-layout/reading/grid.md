import CodePen from '@handbook/CodePen'

# Grid

CSS Grid Layout is a two-dimensional way of laying out objects in a grid-like pattern. Much like a table, CSS Grid is composed of rows and columns. The grid, however, is a lot more flexible than a table, allowing developers to layout complex designs with ease.

To create a CSS Grid you must apply `display: grid;` to the parent container. You can then set the column and row sizes by defining `grid-template-columns` and `grid-template-rows`. The children objects will then be placed within the grid with `grid-column` and `grid-row`. Space between columns and rows can also be controlled with `grid-column-gap`, `grid-row-gap` and `grid-gap`.

## Basic example

<CodePen>

On this example we divide the container into three columns of same width by setting `grid-template-columns` to `auto auto auto`. We also add a gap between columns and rows by setting a `grid-gap`.

> Try adding columns to the layout by changing `grid-template-columns`.

<pre data-lang='html'>
{`
<div class="wrapper">
  <div class="one">One</div>
  <div class="two">Two</div>
  <div class="three">Three</div>
  <div class="four">Four</div>
  <div class="five">Five</div>
  <div class="six">Six</div>
  <div class="seven">Seven</div>
  <div class="eight">Eight</div>
  <div class="nine">Nine</div>
</div>
`}
</pre>

<pre data-lang='css'>
{`
.wrapper {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 10px;
}

/* Give the divs some style */
.wrapper > div {
  border-radius: 5px;
  background-color: rgb(207,232,220);
  padding: 1em;
}
`}
</pre>

</CodePen>

## Positioning Child Elements

<CodePen>

On the example above we allowed the grid to organize the each child element by placing them inside the next available grid cell. You can override this default behavior specifying a `grid-column` and a `grid-row`.

> Note how `grid-column-end` is non inclusive. Meaning, the cell area will end before the specified column.

<pre data-lang='html'>
{`
<div class="wrapper">
  <div class="one">One</div>
  <div class="two">Two</div>
</div>
`}
</pre>

<pre data-lang='css'>
{`
.wrapper {
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 10px;
}

/* Give the divs some style */
.wrapper > div {
  border-radius: 5px;
  background-color: rgb(207,232,220);
  padding: 1em;
}

/* Manually position each child within the grid */
.one {
  grid-column: 2;
  grid-row: 1;
}

.two {
  grid-column: 1;
  grid-row: 2;
}

.three {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row: 3;
}
`}
</pre>

</CodePen>

## Overlapping 

Children that occupy the same cell will overlap.

<CodePen>

<pre data-lang='html'>
{`
<div class="wrapper">
  <div class="one">One</div>
  <div class="two">Two</div>
  <div class="three">Three</div>
</div>
`}
</pre>

<pre data-lang='css'>
{`
.wrapper {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 10px;
}

/* Give the divs some style */
.wrapper > div {
  border-radius: 5px;
  padding: 1em;
}

.one {
  background-color: rgb(0,0,220,.5);
  grid-column: 1;
  grid-column-end: 3;
  grid-row: 1;
  grid-row-end: 3;
}

.two {
  background-color: rgb(0,220,0,.5);
  grid-column: 2;
  grid-column-end: 4;
  grid-row: 2;
  grid-row-end: 4;
}
`}
</pre>

</CodePen>

## Webpage Layout

On this example we can see a popular webpage layout using grid. Note the use of an alternative notation: instead of specifying `grid-column` and `grid-column-end` both are set in `grid-column` and separated by `/`.

<CodePen>

<pre data-lang='html'>
{`
<div class="grid">
  <div class="header">
    Header
  </div>

  <div class="sidebar-left">
    Navigation
  </div>

  <div class="sidebar-right">
    Right Sidebar
  </div>

  <div class="article">
    Article
  </div>
  
  <div class="footer">
    Footer
  </div>
</div>
`}
</pre>

<pre data-lang='css'>
{`
.grid {
  display: grid;
  grid-template-columns: 150px auto 150px;
  grid-template-rows: repeat(3, 100px);
  grid-gap: 1em;
  margin: 0 auto;
  max-width: 56em;
  padding: 1em 0;
}

.header,
.sidebar-left,
.sidebar-right,
.article,
.footer {
  background: #eaeaea;
  padding: 1em;
}

.header {
  grid-column: 1 / 4;
}

.sidebar-left {
  grid-column: 1;
  grid-row: 2 / 4;
}

.article {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
}

.sidebar-right {
  grid-column: 3;
  grid-row: 2;
}

.footer {
  grid-column: 2 / 4;
}

.grid > * {
  display: flex;
  align-items: center;
  justify-content: center;
}
`}
</pre>

</CodePen>