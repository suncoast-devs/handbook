---
title: Responsive
order: 4
---

Now that we have our styling and layout we can turn to the format of our page in
different viewpoints.

Since we took a `mobile-first` approach here we can add a
[`media query`](/lessons/css-response/media-query-details) to our code to being
to reformat it for a wider viewport.

```css
@media (min-width: 720px) {
}
```

The CSS contained within this query will only apply when the browser's viewport
is wider than 720px.

## Format the header

The first thing we will add is a change to the way we flexbox the header.

```css
@media (min-width: 720px) {
  header nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
```

This change will make the `nav` element a flexbox and arrange the elements
inside spaced apart from each other and aligned vertically in the center.

The effect of this is to push the `h1` to the left and the `ul` to the right
giving the header a more horizontal look and feel.

## Make the featured images into a grid

By adding the following CSS inside the media query we can format the gallery
into a grid and apply some gap in between the elements.

```css
@media (min-width: 720px) {
  header nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .feature {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }
}
```

# Gallery of images

Let's change the grid layout of the gallery when the screen is wide:

```css
@media (min-width: 720px) {
  header nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .feature {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }

  .gallery {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

This will give the grid a row of four elements before generating a new row.

# Footer

Give the footer more space when wider.

```css
@media (min-width: 720px) {
  header nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .feature {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }

  .gallery {
    grid-template-columns: repeat(4, 1fr);
  }

  footer {
    margin-top: 2rem;
  }
}
```

To format the sections of the footer to change their alignment we will add some
classes to help us. We add a `call-to-action`, `join`, `donation`, and
`built-with-love` class to some parts of the footer.

```html
<footer>
  <div>
    <div class="call-to-action">
      <div class="join">
        <h3>Join our Newsletter</h3>
        <form class="newsletter">
          <p>
            <label for="full-name">Name</label>
            <input type="text" name="full-name" />
          </p>
          <p>
            <label for="email-address">Email Address</label>
            <input type="e-mail" name="email-address" />
          </p>
          <p>
            <input class="button" type="submit" value="Sign Up" />
          </p>
        </form>
      </div>

      <div class="donation">
        <h3>Make a Donation</h3>
        <p>
          Magna fringilla urna porttitor rhoncus dolor purus. Nullam non nisi
          est sit amet. Tincidunt eget nullam non nisi est sit. Blandit cursus
          risus at ultrices. Id venenatis a condimentum vitae sapien
          pellentesque habitant morbi.
        </p>
        <a class="button" href="#">Donate</a>
      </div>
    </div>

    <p class="built-with-love">
      Built with <span class="hearts">&hearts;</span> in St. Petersburg,
      Florida.
    </p>
  </div>
</footer>
```

Then we will add these styles inside our media query. This will set our
`call-to-action` to flex and space in-between the join and donation sections. We
set the built-with-love to move that text to the center.

```css
.call-to-action {
  display: flex;
  justify-content: space-between;
}

.call-to-action .join {
  margin-right: 1rem;
  min-width: 12rem;
}

.built-with-love {
  text-align: center;
}
```

# Setting content in the center

Let's add some left and right margin to the page to use more whitespace to the
page. We add a `container` class to certain elements we want to have margin
applied.

```
<nav class="container"></nav>
```

```
<div class="container">
  <div class="call-to-action"></div>
```

Then outside the media query, we will add this selector to set a maximum width
of some of the portions of the content. This ensures that as we widen the page
these elements won't grow wider than the specified size.

```css
header .container,
main,
footer .container {
  max-width: 48rem;
  margin: 0 auto;
  padding: 0.5rem;
}
```
