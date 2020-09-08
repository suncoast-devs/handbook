---
title: Content First
order: 2
---

# Adding styling

Now that we have the basic structure of our page we can start to apply styling
to the page. The goal here is to turn the plain page with the browser's default
style into something that looks much more like our original mockup.

## HTML is the skeleton, CSS is the skin

To use an analogy, our HTML is like the skeleton of our body. It provides the
foundation but does not make us look like who we are. For that, we need CSS to
apply style to this skeleton.

## Return of the blank page problem

When starting to style a page we find that we may have the same question about
how to get started. Here we suggest again starting at the top of the page and
move down through the content.

As we are moving down through the page we may not make every element perfect but
perhaps iterate through the page several times. Starting with broad styles such
as margins and padding, and then refining our style with features such as box
shadows and colors.

## Starting with the font and main background and text colors

Noticing there is a specific font choice for the page we can incorporate that at
the start of our CSS file.

```css
@import url('https://fonts.googleapis.com/css2?family=Calistoga&family=Lato:wght@400;700&display=swap');
```

We also notice that the background color of our page is not the default bright
white, but a more muted version. We also notice that the text color is not a
solid black, but a slightly lighter shade.

To apply our font choice and colors across all elements we will add this to our
`body` style:

```css
font-family: 'Lato', sans-serif;
background-color: #eee5e9;
color: #2b303a;
```

## Normalizing things

We noticed that even with our plain HTML that the browser carries some styling
of elements. Paragraphs have a default margin, `h1` through `h6` have varying
font sizes. You may also notice that different browsers have slight variations
in these styles.

To work around these variations developers have shared some `CSS` files that
_normalize_ the styles between browsers. These settings are shared for us to
use. The project we will use to normalize CSS between browsers has this to say:

> Normalize.css makes browsers render all elements more consistently and in line
> with modern standards. It precisely targets only the styles that need
> normalizing.

To use this we add this line to the beginning of our CSS file:

```css
@import url('https://necolas.github.io/normalize.css/latest/normalize.css');
```

## Styling the header and footer

The header and footer have their own background and text color. They also have a
slight padding to them. Since we used the `header` and `footer` elements to
enclose these we can apply this CSS.

```css
header,
footer {
  background-color: #2b303a;
  color: #eee5e9;
  padding: 0.5rem;
}
```

We also turn the navigation elements in the header into links. Since we don't
yet have a destination for these links we'll use the placeholder `#` which will
refer to the current page.

```html
<li><a href="#">Home</a></li>
<li><a href="#">Our Animals</a></li>
<li><a href="#">Blog</a></li>
<li><a href="#">About</a></li>
```

# Main section indent

We notice on the mockup that the part of the page that isn't the header or the
footer is slightly indented.

To achieve this, let's wrap this part of the page in a `<main>` tag. That is,
our `body` will only have three child elements, `header`, `main`, and `footer`
with all the other content contained within.

Once we do this we can apply some minor styling to the `main` element.

```css
main {
  padding: 0.5rem;
}
```

## Lord Vader Former Handle Anakin -- or Lord Voldemort Fears Hogwarts Alumni

Looking at the details of the page we want to style the links of the page. We
will apply _psuedo-selector_ styling to the `<a>` elements of the page. That is
we will format the:

- Link
- Visited
- Focused
- Hover
- Active

attributes of these links. As CSS order is important we will ensure that we
define them in this order. Thus the
[mnemonic](https://en.wikipedia.org/wiki/Mnemonic) above to help us to remember
all of the pseudo-selectors and their proper order.

Here we add `text-decoration` and `color` to indicate visual styling and colors
for links. We also define a slightly different style for links in the header.

```CSS
a:link,
a:visited {
  text-decoration: none;
  color: #d64933;
}

a:focus,
a:hover {
  text-decoration: underline;
}

header a:link,
header a:visited {
  color: #92dce5;
}
```

## Lists

We are using lists in a few places and need to remove the standard styling
queues the browser provides. We also notice that the text in the header is
always in uppercase and we can apply a text transformation to ensure that is
always true.

```css
ul {
  padding: 0;
  list-style: none;
}

header li {
  text-transform: uppercase;
}
```

## Headers

Looking at the various headers in the application we notice that they apply a
slightly different font choice and weight. They also lack the margin the default
browser is applying.

```css
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Calistoga', serif;
  font-weight: 400;
  margin: 0;
}
```

## Styling the blog article

The blog articles contain specific styling so we can apply those

```css
article {
  background-color: #ffffffdd;
  border-radius: 0.25rem;
  padding: 0.5rem;
  margin: 0.5rem auto;
  box-shadow: 2px 2px 0.5rem #7c7c7c;
}

article h3 {
  margin: 0 auto 0.5rem;
}

article p {
  font-size: 0.75rem;
  margin: 0.5rem 0 0 0;
}
```

## Formatting the content in the footer

Let's apply some styling to the labels in the footer

```css
label {
  display: block;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.75rem;
  letter-spacing: 0.05rem;
  color: #7c7c7c;
}
```

By making the labels into `display: block` we allow them to fill the line they
are on. We transform them into uppercase, apply a bold weight, make the text
slightly smaller, increase the letter spacing, and give them a slightly
different text color.

Next, let's format the inputs in the form

```css
input {
  color: #2b303a;
  width: 100%;
  border-radius: 0.25rem;
  border: none;
  padding: 0.5rem;
}
```

Here we make the text inside the input box take on a specific color, make the
inputs take up 100% of their parent's width, add some border-radius to the input
themselves, remove the border, and apply some inner padding to give the text
some visual separation.

However, when we do this we also format the form button. We can reapply the
normal button style by adding:

```css
input[type='submit'] {
  width: auto;
}
```

We can also format the button items for "Sign up" and "Donation" with the
following:

```css
input[type='submit'],
button {
  font-family: 'Calistoga', serif;
  background-color: #d64933;
  color: #eee5e9;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}
```

This applies a different font, sets the background and text color, removes the
borders, applies padding, and some border-radius.

To apply the style to the _heart_ in our text we will wrap it in a
`<span class="hearts">` and then apply this style:

```css
.hearts {
  color: #d64933;
  text-shadow: 0 0 0.5rem #d64933;
  font-size: 1.2rem;
}
```

# Styling images

Noticing the featured images have a border and shadow we would like to style
them.

To do so we'll change this markup:

```html
<img src="http://placekitten.com/640/480" alt="An Animal" />
<img src="http://placekitten.com/640/480" alt="An Animal" />
```

to this:

```html
<div class="feature">
  <figure>
    <img src="http://placekitten.com/640/480" alt="An Animal" />
  </figure>
  <figure>
    <img src="http://placekitten.com/640/480" alt="An Animal" />
  </figure>
</div>
```

We add the `<div>` to add the `feature` class to this section of the page. This
allows us to style the contents specifically. We then wrap each of the `<img>`
with a parent `<figure>` which we will use to apply the padding and the
box-shadow.

```css
figure {
  margin: 0;
}

.feature figure {
  margin: 0.5rem auto;
  padding: 0.5rem;

  background-color: #fffffd;
  border-radius: 0.25rem;
  box-shadow: 2px 2px 0.5rem #7c7c7c;
}

figure img {
  width: 100%;
}
```

# Better, but not yet perfect

While the page is much better with an application of CSS it is not yet exactly
what we want. Next, we will look at adjusting the general layout of the page and
certain elements within. To do this we will be using CSS `flexbox` and CSS
`grid` techniques.

We should also remember that `better, but not yet perfect` is a good goal to
work towards when dealing with CSS. Often we will feel like poor Peter Griffin
in this image:

![](./assets/blindssuck.gif)

If we seek to incrementally improve our CSS, apply updates without adding
extraneous markup, and reviewing each change we can add style to our pages
without losing our patience.
