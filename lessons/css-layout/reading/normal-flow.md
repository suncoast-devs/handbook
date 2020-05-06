---
title: Normal Flow
---

import CodePen from '@handbook/CodePen'

Normal flow is how the browser lays out HTML pages by default when you do
nothing to control page layout.

Let's look at a quick HTML example:

<CodePen>

Note here how the HTML is displayed in the exact order in which it appears in
the source code, with elements stacked up on top of one another — the first
paragraph, followed by the unordered list, followed by the second paragraph.

The elements that appear one below the other are described as block elements, in
contrast to inline elements, which appear one beside the other, like the
individual words in a paragraph.

<pre data-lang='html'>
{`
<p>I love programming.</p>
    
<ul>
  <li>Learn HTML</li>
  <li>Learn CSS</li>
  <li>Learn JavaScript</li>
</ul>
    
<p>Code The Web</p>
`}
</pre>

<pre data-lang='css'>
{`

`}
</pre>

</CodePen>

---

When you use CSS to create a layout, you are moving the elements away from the
normal flow, but for many of the elements on your page the normal flow will
create exactly the layout you need. This is why starting with a well-structured
HTML document is so important, as you can then work with the way things are laid
out by default rather than fighting against it.

The methods that can change how elements are laid out in CSS are as follows:

|                         |                                                                                                                                                                                                |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The `display` property  | Values such as block, inline or inline-block can change how elements behave in normal flow                                                                                                     |
| Floats                  | Applying a float value such as left can cause block level elements to wrap alongside one side of an element, like the way images sometimes have text floating around them in magazine layouts. |
| The `position` property | Allows you to precisely control the placement of boxes inside other boxes.                                                                                                                     |
| Table layout            | Designed for styling the parts of an HTML table can be used on non-table elements using display: table and associated properties.                                                              |
| Multi-column layout     | Causes the content of a block to layout in columns, as you might see in a newspaper.                                                                                                           |
|                         |                                                                                                                                                                                                |

# The Display Property

Primarily what we will be covering is using the `display` property to control
flow. Every element in CSS has a default `display` property which gives it a
natural flow in the page. When discussing customizing a layout the two most
important values are `display: flex` and `display: grid` In this lesson we will
primarily cover `display: flex`

---
