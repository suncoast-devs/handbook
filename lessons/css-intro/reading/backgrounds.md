import CodePen from '@handbook/CodePen'

# Backgrounds

In CSS you can do a lot to style the background behind your content. We've already looked at some simple uses, such as basic background colors and images; now we'll tell the whole story, and look at some advanced features like multiple background images and color gradients.

## What exactly is a background?

The background of an element is the area that sits underneath an element's content, padding, and border.

The background doesn't sit underneath the margin — the margin doesn't count as part of the element's area, but rather the area outside the element.

There are many other different properties you can use to manipulate the element's background, some of which we have already seen a number of times in our course already:

| property                                                                                          | description                                                                                                                       |
| ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| [`background-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color)           | Sets a solid color for the background.                                                                                            |
| [`background-image`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image)           | Specifies a background image to appear in the background of the element. This can be a static file, or a generated gradient.      |
| [`background-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position)     | Specifies the position that the background should appear inside the element background.                                           |
| [`background-repeat`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat)         | Specifies whether the background should be repeated (tiled) or not.                                                               |
| [`background-attachment`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-attachment) | Specifies the behavior of an element's background when its content scrolls, e.g. does it scroll with the content, or is it fixed? |
| [`background`](https://developer.mozilla.org/en-US/docs/Web/CSS/background)                       | Shorthand for specifying the above five properties on one line.                                                                   |
| [`background-size`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-size)             | Allows a background image to be resized dynamically                                                                               |

Now lets look at how to use these features in detail.

## The basics: color, image, position, repeat

Let's explore a simple example to show how the four most basic properties work — you'll use these ones all the time when dealing with backgrounds.

### Background color

<CodePen>

You'll use the background-color property very often:

For a start, the default background color of most elements is not `white` (as you might expect) but `transparent` — therefore if you set an element's background color to something interesting, but want its child elements to be white, you'll have to set that explicitly.

In addition, it is important to set a background color as a fallback. Background colors are supported pretty much everywhere, whereas more exotic features such as background gradients are supported only in newer browsers, plus a background image might fail to load for some reason. It is therefore a good idea to set a basic background color as well as specifying such features, so the element's content is readable no matter what.

<pre data-lang='html'>
{`
<p>Exciting box!</p>
`}
</pre>

<pre data-lang='css'>
{`
p {
  font-family: sans-serif;
  padding: 20px;
  /* background properties */
  background-color: yellow;
}
`}
</pre>

</CodePen>

### Background image

<CodePen>

The background-image property specifies a background image to display in the background of an element. The simplest usage of this property involves using the url() function — which takes the path to an image as a parameter — to fetch a static image file to insert. Let's add a background image to the above example:

Yuck, this doesn't look great at the moment — the images are repeated horizontally and vertically by default. We can fix this using background-repeat, which we'll look at next.

> _IMPORTANT_ - One important thing to bear in mind is that since background images are set using CSS and appear in the background of content, they will be invisible to assistive technologies like screen readers. They are not content images — they are just for decoration — if you want to include an image on your page that is part of the content, then you should do so with an `<img>` element.

> _IMPORTANT_ - Use `<img>` for images that are meaningful for the content and `CSS` for images that are decorative.

<pre data-lang='html'>
{`
<p>Exciting box!</p>
`}
</pre>

<pre data-lang='css'>
{`
p {
  font-family: sans-serif;
  padding: 20px;
  /* background properties */
  background-color: yellow;
  background-image: url(https://mdn.mozillademos.org/files/13026/fire-ball-icon.png);
}
`}
</pre>

</CodePen>

### Background repeat

<CodePen>

background-repeat allows you to specify how the background image is repeated. The default value is repeat which, as you saw above, makes the image keep repeating until the whole element background is filled. This isn't what we want in this case (although it might be in some cases, e.g. repeating-background.html). Other common and widely supported values are:

| value       | description                                                           |
| ----------- | --------------------------------------------------------------------- |
| `no-repeat` | The image will not repeat at all: it will only be shown once.         |
| `repeat-x`  | The image will repeat horizontally all the way across the background. |
| `repeat-y`  | The image will repeat vertically all the way down the background.     |
| `repeat`    | The image will repeat both vertically and horizontally.               |

Let's fix our example.

This is certainly looking better, but the positioning of the image is off — it is currently overlapping the text. We need to position it in a better place.

<pre data-lang='html'>
{`
<p>Exciting box!</p>
`}
</pre>

<pre data-lang='css'>
{`
p {
  font-family: sans-serif;
  padding: 20px;
  /* background properties */
  background-color: yellow;
  background-image: url(https://mdn.mozillademos.org/files/13026/fire-ball-icon.png);
  background-repeat: no-repeat;
}
`}
</pre>

</CodePen>

### Background position

<CodePen>

background-position allows you to position your background image wherever you want inside the background. Generally the property will take two values separated by a space, which specify the horizontal (`x`) and vertical (`y`) coordinates of the image. The top left corner of the image is the origin — `(0,0)`. Think of the background as a graph, with the `x` coordinate going across from left to right, and the `y` coordinate going from top to bottom.

The property can accept many different value types; the most common ones you'll use are:

|                             |                                      |
| --------------------------- | ------------------------------------ |
| Absolute values like pixels | `background-position: 200px 25px`    |
| Relative values like rems   | `background-position: 20rem 2.5rem`  |
| Percentages                 | `background-position: 90% 25%`       |
| Keywords                    | `background-position: right center`. |

We can mix and match these values, for example `background-position: 99% center`. Also note that if you only specify one value, that value will be assumed to be the horizontal value, and the vertical value will default to center.

Let's fix up our example.

<pre data-lang='html'>
{`
<p>Exciting box!</p>
`}
</pre>

<pre data-lang='css'>
{`
p {
  font-family: sans-serif;
  padding: 20px;
  /* background properties */
  background-color: yellow;
  background-image: url(https://mdn.mozillademos.org/files/13026/fire-ball-icon.png);
  background-repeat: no-repeat;
  background-position: 99% center;
}
`}
</pre>

</CodePen>

### Background attachment

Another option we have available for backgrounds is specifying how they scroll when the content scrolls. This is controlled using the `background-attachment` property, which can take the following values:

|          |                                                                                                                                                                                                                                                                                                                                                          |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `scroll` | Causes the element's background to scroll when the page is scrolled. If the element content is scrolled, the background does not move. In effect, the background is fixed to the same position on the page, so it scrolls as the page scrolls.                                                                                                           |
| `fixed`  | Causes an element's background to be fixed to the viewport, so that it doesn't scroll when the page or element content is scrolled. It will always remain in the same position on the screen.                                                                                                                                                            |
| `local`  | This value was added later on (it is only supported in Internet Explorer 9+, whereas the others are supported in IE4+) because the scroll value is rather confusing and doesn't really do what you want in many cases. The local value fixes the background to the element it is set on, so when you scroll the element, the background scrolls with it. |

The background-attachment property only has an effect when there is content to scroll, so we've made a demo to demonstrate the differences between the three values — have a look at background-attachment.html (also see the source code here).

See this [demonstration](https://mdn.github.io/learning-area/css/styling-boxes/backgrounds/background-attachment.html) to see how these scroll effects work.

### Multiple backgrounds

Fairly recently (since Internet Explorer 9) we've had the ability to attach multiple backgrounds to a single element. This is a good thing, as multiple backgrounds are very useful. You separate your different background definitions with commas:

```css
p {
  background: url(image.png) no-repeat 99% center, url(background-tile.png), linear-gradient(
      to bottom,
      yellow,
      #dddd00 50%,
      orange
    );
  background-color: yellow;
}
```

And the backgrounds are stacked on top of one another with the first appearing at the top, then the second below it, then the third, etc. This is possibly not what you were expecting, so take care. Also note that we've put the fallback background color into a separate property declaration, because trying to include it in the multiple backgrounds seems to break things.

You can also put multiple values into longhand background-\* properties, for example:

```css
p {
  background-image: url(image.png), url(background-tile.png);
  background-repeat: no-repeat, repeat;
}
```

Although you are probably better off using background shorthand — not only is it quicker to write, but it is easier to see which background properties apply to which background.

<CodePen>

Let's put multiple backgrounds onto our exciting box example — we want to see the gradient and the fireball, both at the same time.

<pre data-lang='html'>
{`
<p>Exciting Box!</p>
`}
</pre>

<pre data-lang='css'>
{`
p {
  font-family: sans-serif;
  padding: 20px;
  /* background properties */
  background-color: yellow;
  background: url(https://mdn.mozillademos.org/files/13026/fire-ball-icon.png)
      no-repeat 99% center, linear-gradient(
      to bottom,
      yellow,
      #dddd00 50%,
      orange
    );
}
`}
</pre>

</CodePen>

### Background size

As we mentioned earlier, there is a property available — background-size — which allows you to dynamically alter the size of a background image so that it fits better into your design. This is very useful in many ways, for example automatically correcting the size of icons that aren't uploaded correctly. Just bear in mind that this isn't supported by Internet Explorer versions lower than 9, so you can't rely on it if you need to support older browsers. For each background-image, you need to include two background size values — one for the horizontal dimension, and one for the vertical:

```css
p {
  background-image: url(myimage.png);
  background-size: 16px 16px;
}
```

You can use all the length units you'd expect, to be able to specify the values you want — `px`, `percentages`, `rems`, etc.
