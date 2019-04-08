# The Box Model

Every element within a document is structured as a rectangular box inside the document layout, the size and "onion layers" of which can be tweaked using some specific CSS properties. The relevant properties are as follows:

![box](https://mdn.mozillademos.org/files/13647/box-model-standard-small.png)

- Padding refers to the inner zone of a CSS box — between the outer edge of the content box and the inner edge of the border. The size of this layer can be set on all four sides at once with the `padding` shorthand property, or one side at a time with the `padding-top`, `padding-right`, `padding-bottom` and `padding-left` properties.

- Border sits between the outer edge of the padding and the inner edge of the margin. By default the border has a size of `0` — making it invisible — but you can set the thickness, style and color of the border to make it appear. The border shorthand property allows you to set all of these on all four sides at once, for example `border: 1px solid black`. This can be broken down into numerous different longhand properties for more specific styling needs.

- Margin pushes up against other CSS boxes in the layout. It behaves rather like `padding`; the shorthand property is `margin` and the individual properties are `margin-top`, `margin-right`, `margin-bottom`, and `margin-left`.

## Advanced box manipulation

When you set the size of a box with absolute values (e.g. a fixed pixel width/height), the content may not fit within the allowed size, in which case the content overflows the box. To control what happens in such cases, we can use the overflow property. It takes several possible values, but the most common are:

|           |                                                                                                                                          |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`    | If there is too much content, the overflowing content is hidden and scroll bars are shown to let the user scroll to see all the content. |
| `hidden`  | If there is too much content, the overflowing content is hidden.                                                                         |
| `visible` | If there is too much content, the overflowing content is shown outside of the box (this is usually the default behavior.)                |

## Types of CSS boxes

Everything we've said so far applies to boxes that represent block level elements. However, CSS has other types of boxes that behave differently. The type of box applied to an element is specified by the display property. There are many different values available for display, we will focus on the three most common ones; block, inline, and inline-block.

- A `block` box is defined as a box that's stacked upon other boxes (i.e. content before and after the box appears on a separate line), and can have width and height set on it. The whole box model as described above applies to block boxes.
- An `inline` box is the opposite of a `block` box: it flows with the document's text (i.e. it will appear on the same line as surrounding text and other inline elements, and its content will break with the flow of the text, like lines of text in a paragraph.) Width and height settings have no effect on inline boxes; any padding, margin and border set on inline boxes will update the position of surrounding text, but will not affect the position of surrounding block boxes.
- An `inline-block` box is something in between the first two: It flows with surrounding text and other inline elements without creating line breaks before and after it unlike a block box, but it can be sized using width and height and maintains its block integrity like a block box. It won't be broken across paragraph lines like an inline box. In the below example the inline-block box goes onto the 2nd line of text while keeping the shape of a box as there is not enough space for it on the first line, whereas inline box does break on multiple lines if there is not enough space — it loses the shape of a box.
