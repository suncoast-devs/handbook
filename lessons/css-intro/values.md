---
title: Values
order: 9
---

There are many types of CSS property values to consider, from numerical values
to colors to functions that perform a certain action (like embedding a
background image, or rotating an element.) Some of these rely on particular
units for specifying the exact values they are representing — do you want your
box to be 30 pixels wide, or 30 centimeters, or 30 em? We look at some common
values like length, color, and simple functions.

## Numeric Values

You'll see numbers used in many places in CSS units. The most common use of
numeric values is to specify a length or a size

### Length and Size

You'll use
[length/size units](https://developer.mozilla.org/en-US/docs/Web/CSS/length) all
the time in your CSS for layouts, typography and more. Let's look at a simple
example — first the HTML:

```css
p {
  margin: 5px;
  padding: 10px;
  border: 2px solid black;
  background-color: cyan;
}
```

This code sets the margin, padding and border-width of every paragraph to 5
pixels, 10 pixels and 2 pixels respectively. A single value for margin/padding
means that all four sides are set to the same value. The border width is set as
part of the value for the border shorthand.

[Pixels (px)](https://developer.mozilla.org/en-US/docs/Glossary/Pixel) are
referred to as absolute units because they will always be the same size
regardless of any other related settings. Other absolute units are as follows:

| Unit | Name                | Equivalent to       |
| ---- | ------------------- | ------------------- |
| `cm` | Centimeters         | 1cm = 96px/2.54     |
| `mm` | Millimeters         | 1mm = 1/10th of 1cm |
| `Q`  | Quarter-millimeters | 1Q = 1/40th of 1cm  |
| `in` | Inches              | 1in = 2.54cm = 96px |
| `pc` | Picas               | 1pc = 1/16th of 1in |
| `pt` | Points              | 1pt = 1/72th of 1in |

> _You probably won't use any of these very often except pixels._

### Relative Units

There are also relative units, which are relative to the current element's
font-size or viewport (e.g browser window) size:

| Unit   | Description                                                                                                                                                                                                                                                |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| em     | 1em is the same as the font-size of the current element. But beware — font sizes are inherited by elements from their parents, so if different font sizes have been set on parent elements, the pixel equivalent of an em can start to become complicated. |
| rem    | The rem (root em) works in exactly the same way as the em, except that it will always equal the size of the default base font-size; inherited font sizes will have no effect, so this is a much better option than em                                      |
| vw, vh | Respectively these are 1/100th of the width of the viewport, and 1/100th of the height of the viewport.                                                                                                                                                    |

Using relative units is quite useful — you can size your HTML elements relative
to your font or viewport size, meaning that the layout will stay looking correct
if for example the text size is doubled across the whole website by a visually
impaired user.

While `em` units are helpful, they can be difficult to use when elements are
highly nested. It is often easier to think about relative sizes with `rem` since
the size is always a multiple of the `root` size. And we don't have to do math
in our head.

![math](https://media.giphy.com/media/3owzW5c1tPq63MPmWk/giphy.gif)

## Unitless

You'll sometimes come across unitless numeric values in CSS — this is not always
an error, in fact, it is perfectly allowed in some circumstances. For example,
if you want to completely remove the margin or padding from an element, you can
just use unitless 0 — 0 is 0, no matter what units were set before!

```css
p {
  margin: 0;
}
```

Another example is line-height, which sets how high each line of text in an
element is. You can use units to set a specific line height, but it is often
easier to use a unitless value, which acts as a simple multiplying factor. For
example, take the following HTML:

```css
p {
  line-height: 1.5;
}
```

If the font-size is 16px; the line height will be 1.5 times this, or 24px.

## Percentages

You can also use percentage values to specify most things that can be specified
by specific numeric values. This allows us to create, for example, boxes whose
width will always shift to be a certain percentage of their parent container's
width. This can be compared to boxes that have their width set to a certain unit
value (like `px` or `em`), which will always stay the same length, even if their
parent container's width changes.

Here we are giving both divs some margin, height, font-size, border and color.
Then we are giving the first div and second div different background-colors so
we can easily tell them apart. We are also setting the first div's width to
650px, and the second div's width to 75%. The effect of this is that the first
div always has the same width, even if the viewport is resized (it will start to
disappear off screen when the viewport becomes narrower than the screen),
whereas the second div's width keeps changing when the viewport size changes so
that it will always remain 75% as wide as its parent. In this case, the div's
parent is the `body` element, which by default is 100% of the width of the
viewport.

```html
<div>
  <div class="boxes">Fixed width layout with pixels</div>
  <div class="boxes">Liquid layout with percentages</div>
</div>
```

```css
div .boxes {
  margin: 10px;
  color: white;
  height: 150px;
  border: 2px solid black;
}

.boxes:nth-child(1) {
  background-color: red;
  width: 650px;
}

.boxes:nth-child(2) {
  background-color: blue;
  width: 75%;
}
```

## Colors

There are many ways to specify color in CSS. The same color values can be used
everywhere in CSS, whether you are specifying text color, background color, or
whatever else.

The standard color system available in modern computers is 24 bit, which allows
the display of about 16.7 million distinct colors via a combination of different
red, green and blue channels with 256 different values per channel
`(256 x 256 x 256 = 16,777,216.)`

### Keyword colors

The simplest, oldest color types in CSS are the color keywords. These are
specific strings representing particular color values. For example:

```css
p {
  background-color: red;
}
```

### Hexadecimal colors

The next ubiquitous color system is hexadecimal colors, or hex codes. Each hex
value consists of a hash/pound symbol (`#`) followed by six hexadecimal numbers,
each of which can take a value between `0` and `f` (which represents `15`) — so
`0123456789abcdef`. Each pair of values represents one of the channels — red,
green and blue — and allows us to specify any of the `256` available values for
each `(16 x 16 = 256.)`

> _NOTE_: If you want to learn more about hexadecimals and colors then
> [this video](https://www.youtube.com/watch?v=6cJd7eyYBFs) is a good resource.

```html
<p>This paragraph has a red background</p>
<p>This paragraph has a blue background</p>
<p>This paragraph has a kind of pinky lilac background</p>
```

```css
/* equivalent to the red keyword */
p:nth-child(1) {
  background-color: #ff0000;
}

/* equivalent to the blue keyword */
p:nth-child(2) {
  background-color: #0000ff;
}

/* has no exact keyword equivalent and is a pinky lilac background */
p:nth-child(3) {
  background-color: #e0b0ff;
}
```

### RGB

The third scheme we'll talk about here is RGB. An RGB value is a function —
`rgb()` — which is given three parameters that represent the red, green and blue
channel values of the colors, in much the same way as hex values. The difference
with RGB is that each channel is represented not by two hex digits, but by a
decimal number between 0 and 255.

### HSL

Slightly less well supported than RGB is the HSL model (not on old versions of
IE), which was implemented after much interest from designers — instead of red,
green and blue values, the `hsl()` function accepts hue, saturation, and
lightness values, which are used to distinguish between the 16.7 million colors,
but in a different way:

- hue: the base shade of the color. This takes a value between `0` and `360`,
  presenting the angles round a color wheel.
- saturation: how saturated is the color? This takes a value from `0-100%`,
  where `0` is no color (it will appear as a shade of grey), and `100%` is full
  color saturation
- lightness: how light or bright is the color? This takes a value from `0-100%`,
  where `0` is no light (it will appear completely black) and `100%` is full
  light (it will appear completely white)

The HSL color model is intuitive to designers that are used to working with such
color models. By keeping the hue, and saturation the same, we can lower the
level and find a set of shades to go together in a monochrome color scheme.

Let's rewrite our example:

```html
<p>This paragraph has a red background</p>
<p>This paragraph has a blue background</p>
<p>This paragraph has a kind of pinky lilac background</p>
```

```css
/* equivalent to the red keyword */
p:nth-child(1) {
  background-color: hsl(0, 100%, 50%);
}

/* equivalent to the blue keyword */
p:nth-child(2) {
  background-color: hsl(240, 100%, 50%);
}

/* has no exact keyword equivalent */
p:nth-child(3) {
  background-color: hsl(276, 100%, 85%);
}
```

### RGBA and HSLA

RGB and HSL both have corresponding modes — RGBA and HSLA — that allow you to
set not only what color you want to display, but also what transparency you want
that color to have. Their corresponding functions take the same parameters, plus
a fourth value in the range `0` to `1` — which sets the transparency, or alpha
channel. 0 is completely transparent, and 1 is completely opaque.

```css
p {
  /* Transparent red */
  background-color: rgba(255, 0, 0, 0.5);
}
```

### Opacity

There is another way to specify transparency via CSS — the opacity property.
Instead of setting the transparency of a particular color, this sets the
transparency of all selected elements and their children. Again, let's study an
example so we can see the difference.

```css
/* Red with RGBA, only the background will be half transparent */
p:nth-child(1) {
  background-color: rgba(255, 0, 0, 0.5);
}

/* Red with opacity, the box will be all half transparent including the text in it*/
p:nth-child(2) {
  background-color: rgb(255, 0, 0);
  opacity: 0.5;
}
```
