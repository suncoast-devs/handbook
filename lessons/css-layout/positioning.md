---
title: Positioning
order: 6
---

Positioning allows you to move an element from where it would be placed when in
normal flow to another location.

> Positioning isn’t a method for creating your main page layouts, it is more
> about managing and fine-tuning the position of specific items on the page.

There are however useful techniques for certain layout patterns that rely on the
position property. Understanding positioning also helps in understanding normal
flow, and what it is to move an item out of normal flow.

There are five types of positioning you should know about:

|                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Static positioning   | The default that every element gets — it just means _"put the element into its normal position in the document layout flow — nothing special to see here"_.                                                                                                                                                                                                                                                                                                                                                                                      |
| Relative positioning | Allows you to modify an element's position on the page, moving it relative to its position in normal flow — including making it overlap other elements on the page.                                                                                                                                                                                                                                                                                                                                                                              |
| Absolute positioning | Moves an element completely out of the page's normal layout flow, like it is sitting on its own separate layer. From there, you can fix it in a position relative to the edges of the page's `html` element (or its nearest positioned ancestor element). This is useful for creating complex layout effects such as tabbed boxes where different content panels sit on top of one another and are shown and hidden as desired, or information panels that sit off screen by default, but can be made to slide on screen using a control button. |
| Fixed positioning    | Very similar to absolute positioning, except that it fixes an element relative to the browser viewport, not another element. This is useful for creating effects such as a persistent navigation menu that always stays in the same place on the screen as the rest of the content scrolls.                                                                                                                                                                                                                                                      |
| Sticky positioning   | This a newer positioning method which makes an element act like `position: static` until it hits a defined offset from the viewport, at which point it acts like `position: fixed`.                                                                                                                                                                                                                                                                                                                                                              |
|                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

---

## Simple example

<CodePen>

To provide familiarity with these page layout techniques, we'll show you a
couple of quick examples. Our examples will all feature the same HTML, which is
as follows.

<pre data-lang='html'>
{`
<h1>Positioning</h1>

<p>I am a basic block level element.</p>
<p class="positioned">I am a basic block level element.</p>
<p>I am a basic block level element.</p>
`}
</pre>

<pre data-lang='css'>
{`
body {
  width: 500px;
  margin: 0 auto;
}

p {
    background-color: rgb(207,232,220);
    border: 2px solid rgb(79,185,227);
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
}
`}
</pre>

</CodePen>

## Relative positioning

Relative positioning allows you to offset an item from the position in normal
flow it would have by default. This means you could achieve a task such as
moving an icon down a bit so it lines up with a text label.

<CodePen>

To do this, we could add the following rule to add relative positioning.

Here we give our middle paragraph a position value of relative — this doesn't do
anything on its own, so we also add top and left properties. These serve to move
the affected element down and to the right — this might seem like the opposite
of what you were expecting, but you need to think of it as the element being
pushed on its left and top sides, which result in it moving right and down.

We will also give it a different background and border to make it stand out.

> Try changing the values for `top` and `left` -- also try removing them and
> using values for `bottom` and `right` -- See how those change the positioning
> of the element.

<pre data-lang='html'>
{`
<h1>Positioning</h1>

<p>I am a basic block level element.</p>
<p class="positioned">I am a basic block level element.</p>
<p>I am a basic block level element.</p>

`}
</pre>

<pre data-lang='css'>
{`
body {
  width: 500px;
  margin: 0 auto;
}

p {
    background-color: rgb(207,232,220);
    border: 2px solid rgb(79,185,227);
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
}

.positioned {
  position: relative;
  background: rgba(255,84,104,.3);
  border: 2px solid rgb(255,84,104);
  top: 30px;
  left: 30px;
}

`}
</pre>

</CodePen>

---

## Absolute positioning

<CodePen>

Absolute positioning is used to completely remove an element from normal flow,
and place it using offsets from the edges of a containing block.

We could add the following CSS rule to implement absolute positioning.

This is very different! The positioned element has now been completely separated
from the rest of the page layout and sits over the top of it. The other two
paragraphs now sit together as if their positioned sibling doesn't exist. The
`top` and `left` properties have a different effect on absolutely positioned
elements than they do on relatively positioned elements. In this case the
offsets have been calculated from the **top and left of the page**. It is
possible to change the parent element that becomes this container and we will
take a look at that later.

<pre data-lang='html'>
{`
<h1>Positioning</h1>

<p>I am a basic block level element.</p>
<p class="positioned">I am a basic block level element.</p>
<p>I am a basic block level element.</p>

`}
</pre>

<pre data-lang='css'>
{`
body {
  width: 500px;
  margin: 0 auto;
}

p {
    background-color: rgb(207,232,220);
    border: 2px solid rgb(79,185,227);
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
}

.positioned {
    position: absolute;
    background: rgba(255,84,104,.3);
    border: 2px solid rgb(255,84,104);
    top: 30px;
    left: 30px;
}

`}
</pre>

</CodePen>

---

## Fixed positioning

<CodePen>

Fixed positioning removes our element from document flow in the same way as
absolute positioning. However, instead of the offsets being applied from the
container, they are applied from the viewport. As the item remains fixed in
relation to the viewport we can create effects such as a menu which remains
fixed as the page scrolls beneath it.

For this example our HTML is three paragraphs of text, in order that we can
cause the page to scroll, and a box to which we will give `position: fixed`.

<pre data-lang='html'>
{`
<h1>Fixed positioning</h1>

<div class="positioned">Fixed</div>

<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus aliquam dolor, eu lacinia lorem placerat vulputate. Duis felis orci, pulvinar id metus ut, rutrum luctus orci. Cras porttitor imperdiet nunc, at ultricies tellus laoreet sit amet. Sed auctor cursus massa at porta. Integer ligula ipsum, tristique sit amet orci vel, viverra egestas ligula. Curabitur vehicula tellus neque, ac ornare ex malesuada et. In vitae convallis lacus. Aliquam erat volutpat. Suspendisse ac imperdiet turpis. Aenean finibus sollicitudin eros pharetra congue. Duis ornare egestas augue ut luctus. Proin blandit quam nec lacus varius commodo et a urna. Ut id ornare felis, eget fermentum sapien.</p>

<p>Nam vulputate diam nec tempor bibendum. Donec luctus augue eget malesuada ultrices. Phasellus turpis est, posuere sit amet dapibus ut, facilisis sed est. Nam id risus quis ante semper consectetur eget aliquam lorem. Vivamus tristique elit dolor, sed pretium metus suscipit vel. Mauris ultricies lectus sed lobortis finibus. Vivamus eu urna eget velit cursus viverra quis vestibulum sem. Aliquam tincidunt eget purus in interdum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>

<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus aliquam dolor, eu lacinia lorem placerat vulputate. Duis felis orci, pulvinar id metus ut, rutrum luctus orci. Cras porttitor imperdiet nunc, at ultricies tellus laoreet sit amet. Sed auctor cursus massa at porta. Integer ligula ipsum, tristique sit amet orci vel, viverra egestas ligula. Curabitur vehicula tellus neque, ac ornare ex malesuada et. In vitae convallis lacus. Aliquam erat volutpat. Suspendisse ac imperdiet turpis. Aenean finibus sollicitudin eros pharetra congue. Duis ornare egestas augue ut luctus. Proin blandit quam nec lacus varius commodo et a urna. Ut id ornare felis, eget fermentum sapien.</p>
`}
</pre>

<pre data-lang='css'>
{`
.positioned { 
    background: rgba(255,84,104,.3); 
    border: 2px solid rgb(255,84,104); 
    padding: 10px; 
    margin: 10px; 
    border-radius: 5px; 
}

.positioned {
    position: fixed;
    top: 30px;
    left: 30px;
}
`}
</pre>

</CodePen>

---

## Sticky positioning

<CodePen>

Sticky positioning is the final positioning method that we have at our disposal.
It mixes the default static positioning with fixed positioning. When an item has
`position: sticky` it will scroll in normal flow until it hits offsets from the
viewport that we have defined. At that point it becomes "stuck" as if it had
`position: fixed` applied.

<pre data-lang='html'>
{`

<h1>Sticky positioning</h1>
    
<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus aliquam dolor, eu lacinia lorem placerat vulputate. Duis felis orci, pulvinar id metus ut, rutrum luctus orci. Cras porttitor imperdiet nunc, at ultricies tellus laoreet sit amet. Sed auctor cursus massa at porta. Integer ligula ipsum, tristique sit amet orci vel, viverra egestas ligula. Curabitur vehicula tellus neque, ac ornare ex malesuada et. In vitae convallis lacus. Aliquam erat volutpat. Suspendisse ac imperdiet turpis. Aenean finibus sollicitudin eros pharetra congue. Duis ornare egestas augue ut luctus. Proin blandit quam nec lacus varius commodo et a urna. Ut id ornare felis, eget fermentum sapien.</p>

<div class="positioned">Sticky</div>
    
<p>Nam vulputate diam nec tempor bibendum. Donec luctus augue eget malesuada ultrices. Phasellus turpis est, posuere sit amet dapibus ut, facilisis sed est. Nam id risus quis ante semper consectetur eget aliquam lorem. Vivamus tristique elit dolor, sed pretium metus suscipit vel. Mauris ultricies lectus sed lobortis finibus. Vivamus eu urna eget velit cursus viverra quis vestibulum sem. Aliquam tincidunt eget purus in interdum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
    
<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus aliquam dolor, eu lacinia lorem placerat vulputate. Duis felis orci, pulvinar id metus ut, rutrum luctus orci. Cras porttitor imperdiet nunc, at ultricies tellus laoreet sit amet. Sed auctor cursus massa at porta. Integer ligula ipsum, tristique sit amet orci vel, viverra egestas ligula. Curabitur vehicula tellus neque, ac ornare ex malesuada et. In vitae convallis lacus. Aliquam erat volutpat. Suspendisse ac imperdiet turpis. Aenean finibus sollicitudin eros pharetra congue. Duis ornare egestas augue ut luctus. Proin blandit quam nec lacus varius commodo et a urna. Ut id ornare felis, eget fermentum sapien.</p>       

<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus aliquam dolor, eu lacinia lorem placerat vulputate. Duis felis orci, pulvinar id metus ut, rutrum luctus orci. Cras porttitor imperdiet nunc, at ultricies tellus laoreet sit amet. Sed auctor cursus massa at porta. Integer ligula ipsum, tristique sit amet orci vel, viverra egestas ligula. Curabitur vehicula tellus neque, ac ornare ex malesuada et. In vitae convallis lacus. Aliquam erat volutpat. Suspendisse ac imperdiet turpis. Aenean finibus sollicitudin eros pharetra congue. Duis ornare egestas augue ut luctus. Proin blandit quam nec lacus varius commodo et a urna. Ut id ornare felis, eget fermentum sapien.</p>       
`}
</pre>

<pre data-lang='css'>
{`
.positioned { 
  background: rgba(255,84,104,.3); 
  border: 2px solid rgb(255,84,104); 
  padding: 10px; 
  margin: 10px; 
  border-radius: 5px; 
}

.positioned {
  position: sticky;
  top: 30px;
  left: 30px;
}
`}
</pre>

</CodePen>
