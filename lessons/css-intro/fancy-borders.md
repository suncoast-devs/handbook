---
title: Fancy Borders
order: 14
---

Along with the box model we can take a look at the options we have for styling
the `border` portion of a content box.

## Border radius

Rounded corners on boxes are an incredibly popular feature on web sites — so
popular in fact that browsers implemented a property specifically for
implementing rounded corners easily: border-radius. Previous to this (and to
multiple background images being supported), developers used to have to wrap
each box they wanted to have rounded corners in three additional `<div>`s, and
attach a separate rounded corner graphic to each of these four elements. If they
wanted their boxes to be flexible, that is.

This is now a lot easier. Isn't it great to be a developer with the modern web?
— You simply use the following property:

```css
border-radius: 20px;
```

To put a different size of border radius on different corners, you can specify
two, three or four values, rather like you can with padding and margin:

```css
/* 1st value is top left and bottom right corners,
   2nd value is top right and bottom left  */
border-radius: 20px 10px;
/* 1st value is top left corner, 2nd value is top right
   and bottom left, 3rd value is bottom right  */
border-radius: 20px 10px 50px;
/* top left, top right, bottom right, bottom left */
border-radius: 20px 10px 50px 0;
```

As a last point, you can also create elliptical corners (where the `x` radius is
different to the `y` radius.) The two different radii are specified separated by
a forward slash (`/`), and you can combine this with any combination of values,
as indicated above. For example:

```css
border-radius: 10px / 20px;
border-radius: 10px 30px / 20px 40px;
```

## Border images

Finally, let's look at the most recent (and complex) addition to CSS for
manipulating borders —
[`border-image`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-image).
The idea here is that sometimes creating a complex user interface feature will
require a complex design for the border, not just a solid color. This could
possibly be created by overlaying one element right in the center on top of
another larger element, and applying a background image to the bottom element,
faking a complex border. Or in extreme cases, you might even have to create a
`3 x 3` grid of nine elements, with the center element as your content, and the
surrounding eight elements having the border elements applied to them.

`border-image` images makes it a lot easier to achieve complex patterned
borders, albeit in modern browsers (Internet Explorer 11+ supports it, as well
as other modern browsers.) Let's have a look at how this works.

First of all, you need to have an image to apply to your browser. This will
typically be a `3 x 3`, `4 x 4`, `5 x 5` (etc.) grid design, like the following:

![](https://mdn.mozillademos.org/files/13060/border-image.png)

When such an image is used for border image, the browser slices the image up
into 8 pieces, as indicated by the next image:

![](https://mdn.mozillademos.org/files/13062/border-slices.png)

The corner images will be inserted in the corners of your border, and the top,
right, bottom and left slices will be used to fill up the corresponding sides of
your border (by stretching, or repeating). We need to tell the browser to make
the slices the right size — this image for example is `160px`, and a `4 x 4`
grid, so each slice will need to be `40px`.

To start with, we need a box to apply the border to. This needs to have a border
specified, otherwise the border image will have no space to appear in. We will
also use background-clip to make any background color only fill the area under
the content and padding, and not extend under the border as well (you may not
want this for your design, but it is useful in cases like this).

```css
border: 30px solid black;
background-clip: padding-box;
```

Next, we'll use border-image-source to specify the source image to use as the
border image. This works in exactly the same way as background-image, being able
to accept a `url()` function or a gradient as a value.

```css
border-image-source: url(border-image.png);
```

Now we'll use
[`border-image-slice`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-slice)
to set the required size of the slices, as described above:

```css
border-image-slice: 40;
```

This property can take one value if all the slices are the same size, or
multiple values if the slices need to be different sizes, in the same manner as
padding and margin:

- Two values: top and bottom, left and right.
- Three values: Top, left and right, bottom.
- Four values: Top, right, bottom, left.

If the image is a raster graphic (like a `.png` or `.jpg`), then the number will
be interpreted in terms of pixels. If the image is a vector graphic (like a
`.svg`), then the number will be interpreted as coordinates in the graphic.
Percentages can also be used (with the unit %). Check out the border-image-slice
page for more options and details.

Finally, we'll use border-image-repeat to specify how we want the images to fill
up the border sides. The options are:

|         |                                                                                                                                                                                                                             |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| stretch | The default; the side images are stretched to fill the borders. This generally looks terrible and pixellated, so is not recommended.                                                                                        |
| repeat  | The side images are repeated until the borders are filled. Depending on circumstances, this might look ok, but you can get left with unsightly image fragments.                                                             |
| round   | The side images are repeated until the borders are filled, and they are all stretched slightly so that no fragments appear.                                                                                                 |
| space   | The side images are repeated until the borders are filled, and a small amount of spacing is added between each copy such that no fragments appear. This value is only supported in Safari (9+) and Internet Explorer (11+). |

We decided to go with the round value, as it seems to be the most useful and
flexible:

```css
border-image-repeat: round;
```

### Demo

<CodePen>

Let's put all of this code together to show a working example.

Something interesting that you may have noticed is that the border has been set
to 20px width, while the image slices are 40 — in this case, the browser just
resizes the slices down to 20px wide so it fits.

<pre data-lang='html'>
{`
<div>
  <p>Border image</p>
</div>
`}
</pre>

<pre data-lang='css'>
{`
div {
  width: 300px;
  padding: 20px;
  margin: 10px auto;
  line-height: 3;
  background-color: #f66;
  text-align: center;
  /* border-related properties */
  border: 20px solid black;
  background-clip: padding-box;
  border-image-source: url(https://mdn.mozillademos.org/files/13060/border-image.png);
  border-image-slice: 40;
  border-image-repeat: round;
}
`}
</pre>

</CodePen>
