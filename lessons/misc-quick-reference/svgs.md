---
title: SVGs
---

SVGs are, Scalable Vector Graphics, they use an XML based code/text to describe
how the image itself looks. This guide will cover everything you need to know
about an SVG.

# Why use SVG?

Some of the benefits of an SVG are that they are scalable, meaning you can
change the height and width of the image and it will not lose quality like a
raster image.

SVGs physically **cannot** pixelate, this is because they are made using vectors
instead of pixels as in a traditional image.

SVG are code based unlike traditional raster images, meaning there load time is
a lot faster in browsers.

<br>

<details>
<summary>Here is an example of an SVG</summary>

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3">
    <g fill="#61DAFB">
        <path d="M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z"/>
        <circle cx="420.9" cy="296.5" r="45.7"/>
    </g>
</svg>
```

</details>

<br />

While this may look scary and a bit daunting its _actually_ not that complicated
and you will **not** be coding SVGs so you don't have to worry about looking at
the code all that much. There are some important takeaways from this though that
we will go over.

A question you may be asking is what exactly does this code make, I thought we
were talking about an image file type?

<img src="https://raw.githubusercontent.com/Domanator13/react-project-template/9407ca79e865d86d839ab2f13648a40f17a7bb11/src/logo.svg">

This is what that code for the SVG above actually translates to it's the logo
for [React](https://handbook.suncoast.io/lessons/react-intro).

## Parts of an SVG

<br />

**svg Tag**:

`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3">`

This tag here is the skeleton of your file it defines the size and that your
file is an SVG. Now lets go over the different parts of this tag because it has
a lot going on.

<hr />

`xmlns="http://www.w3.org/2000/svg"`

This part of the svg tag means XML namespace, this is what defines your file as
an SVG based on XML standards. The link there is to w3 schools and this is what
tells the file that the svg tag an all of it's children elements follow the
standards provided in the XML specification.

<hr />

`viewBox="0 0 841.9 595.3"`

This is what determines the base size of your SVG file and where it is
positioned within the blank canvas that an image has. The 4 values in a viewbox
are, min-x, min-y, width and height.

- The `min-x` value determines where on the X or horizontal axis your image will
  be placed.
- The `min-y` value determines where on the Y or vertical axis your image will
  be placed.
- The `width` value determines exactly how wide your image will be.
- The `height` value determines determines exactly how tall your image will be.
<hr />
<br />

**g Tag**:

`<g fill="#61DAFB">`

This tag here is a grouping tag it lets you know that all of its children, items
enclosed in the tag, are grouped together.

<hr />

`fill="#61DAFB"`

This part of the g tag lets you know that all of its children are colored the
same color and this is the <font color='#61DAFB'>blueish</font> color seen above
and here.

<hr />
<br />

**path Tag**:

`<path d="M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.`

This tag is very **important** to pay attention to, it defines a shape or path
in the svg using vectors. Most path tags like the one for the React logo above
are very long, this is just a small snippet from the React logo path. Please
note, this is a self closing tag.

<hr />

`d="M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.`

This part of the path tag defines the path using vectors the above numbers and
letter are the different vector points, you do **not** need to worry about
trying to understand vector points. The d just means that whatever is after the
equal sign, the vector points are what is going to be drawn.

<hr />
<br />

**circle Tag**:

`<circle cx="420.9" cy="296.5" r="45.7"/>`

This tag is also very **important** to pay attention to, it defines a circular
shape as the name would suggest. Please note, this is a self closing tag.

<hr />

`cx="420.9"`

This part of the circle tag states where on your canvas the X or horizontal axis
coordinate center of the circle will be.

<hr />

`cy="296.5"`

This part of the circle tag states where on your canvas the Y or vertical axis
coordinate center of the circle will be.

<hr />

`r="45.7"`

This part of the circle tag determines the radius of the circle.

<hr />
<br />

**Note**:

This is by no means all of the tags an svg file can contain, these are just some
common tags. If your curious or would like to learn about some of the other tags
[check this out](https://developer.mozilla.org/en-US/docs/Web/SVG/Element).

<hr />
<br />

## Creating & Using SVGs

If you would like to create your own SVG files to use or if you find a really
cool image and just want to convert it to an SVG, this section is for you.

<br />

**SVG Collection Websites**:

- [Flaticon](https://www.flaticon.com/) - Free SVG icons, these must be
  attributed to their respective authors.
- [Bootstrap Icons](https://icons.getbootstrap.com/) - A collection of icons
  that are free and available to use, these do not have to be attributed.
- [Google Icons](https://fonts.google.com/icons) - Another collection of icons
that are free and available to use created by Google these are all simple icons
that are one color.
<hr />

**Conversion Tools**:

- https://www.autotracer.org/
- https://www.pngtosvg.com/
- https://convertio.co/jpg-svg/
<hr />

**Software Tools**:

- [Adobe Illustrator](https://www.adobe.com/products/illustrator.html?sdid=KKQML&mv=search&ef_id=CjwKCAjwtfqKBhBoEiwAZuesiCnijQcHzTdZImqiVPTZfaS_m63UZIBuh6EBXQvFZkGe-ln-xa6hIxoC6joQAvD_BwE:G:s&s_kwcid=AL!3085!3!442365417815!e!!g!!adobe%20illustrator!1711729586!70905759510&gclid=CjwKCAjwtfqKBhBoEiwAZuesiCnijQcHzTdZImqiVPTZfaS_m63UZIBuh6EBXQvFZkGe-ln-xa6hIxoC6joQAvD_BwE) -
  Probably the best software for SVGs, but it's a paid software.
- [Inkscape](https://inkscape.org/) - An alternative to Ai, this is a free open
source software.
<hr />

**VS Code Extensions**:

- [SVG Preview](https://marketplace.visualstudio.com/items?itemName=SimonSiefke.svg-preview) -
  This is one of my personal favorite extensions for SVGs, it does exactly what
  the name would suggest.
- [SVG](https://marketplace.visualstudio.com/items?itemName=jock.svg) - This
  extension provides syntax highlighting and quick access to the MDN reference
  docs for quick and easy learning, you can also minimize your svg code/file
  size using this extension.
