---
title: Content First
order: 2
---

# Starting with a blank page

When starting any page design, or any creative effort, one of the largest
challenges is what our first step should be. This is often called the "blank
page problem." In web design we are sometimes given a mock-up we are trying to
implement, or we have a visual design in mind but we are unsure how to get
started.

One way to combat this problem is to simply get all of the content onto the page
before we start deciding how to organize or style it.

In the case of our Safari web site, we might look at the site and start to get
the content in our HTML file.

## First, the text

Looking at the content we might get something like the following:

```
# Safari

- Home
- Our Animals
- Blog
- About

## Featured Creatures

## Our Newest Friends

## Lorem ipsum dolor sit amet

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo ullamcorper a lacus vestibulum sed arcu non odio euismod.

## Latest Posts

### Aliquam eleifend mi in nulla posuere.

In ante metus dictum at tempor commodo ullamcorper a lacus. Ultricies tristique nulla aliquet enim tortor at auctor. Egestas pretium aenean pharetra magna ac placerat vestibulum. Volutpat maecenas volutpat blandit aliquam. Enim diam vulputate ut pharetra sit. Commodo ullamcorper a lacus vestibulum sed arcu.

### Tristique risus nec feugiat in fermentum.

Euismod quis viverra nibh cras pulvinar. Donec enim diam vulputate ut pharetra sit amet aliquam id. Id volutpat lacus laoreet non curabitur gravida arcu ac tortor. Sapien eget mi proin sed. Sit amet nulla facilisi morbi tempus. Id velit ut tortor pretium viverra.

### Join Our Newsletter

Name
Email
Submit

### Make a Donation

Magna fringilla urna porttitor rhoncus dolor purus. Nullam non nisi est sit amet. Tincidunt eget nullam non nisi est sit. Blandit cursus risus at ultrices. Id venenatis a condimentum vitae sapien pellentesque habitant morbi. Id volutpat lacus laoreet non curabitur gravida arcu ac. Quis blandit turpis cursus in. Facilisi etiam dignissim diam quis enim. Sem fringilla ut morbi tincidunt augue. Volutpat blandit aliquam etiam erat velit scelerisque in.

Donate
```

We collect our text in a
[`markdown`](https://guides.github.com/features/mastering-markdown/) file as a
way to gather our content. Next, let's organize this into some simple HTML

## Next, the HTML

As a first pass of our HTML we might generate the content with a minimal amount
of elements:

```html
<h1>Safari</h1>
<ul>
  <li>Home</li>
  <li>Our Animals</li>
  <li>Blog</li>
  <li>About</li>
</ul>

<h2>Featured Creatures</h2>

<img src="http://placekitten.com/640/480" alt="An Animal" />
<img src="http://placekitten.com/640/480" alt="An Animal" />

<h2>Our New Friends</h2>

<img src="http://placekitten.com/320/240" alt="An Animal" />
<img src="http://placekitten.com/320/240" alt="An Animal" />
<img src="http://placekitten.com/320/240" alt="An Animal" />
<img src="http://placekitten.com/320/240" alt="An Animal" />

<h3>Lorem ipsum dolor sit amet</h3>
<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
  incididunt ut labore et dolore magna aliqua. Commodo ullamcorper a lacus
  vestibulum sed arcu non odio euismod.
</p>

<h2>Latest Posts</h2>

<h3>Aliquam Eleifend mi in Nulla Posuere</h3>
<img src="http://placekitten.com/320/240" alt="An Animal" />
<p>
  In ante metus dictum at tempor commodo ullamcorper a lacus. Ultricies
  tristique nulla aliquet enim tortor at auctor. Egestas pretium aenean pharetra
  magna ac placerat vestibulum. Volutpat maecenas volutpat blandit aliquam. Enim
  diam vulputate ut pharetra sit. Commodo ullamcorper a lacus vestibulum sed
  arcu.
</p>

<h3>Tristique Risus nec Feugiat in Fermentum</h3>
<img src="http://placekitten.com/320/240" alt="An Animal" />
<p>
  Euismod quis viverra nibh cras pulvinar. Donec enim diam vulputate ut pharetra
  sit amet aliquam id. Id volutpat lacus laoreet non curabitur gravida arcu ac
  tortor. Sapien eget mi proin sed. Sit amet nulla facilisi morbi tempus. Id
  velit ut tortor pretium viverra.
</p>

<h3>Join our Newsletter</h3>
Name
<input type="text" name="full-name" />
Email Address
<input type="e-mail" name="email-address" />
<input type="submit" value="Sign Up" />

<h3>Make a Donation</h3>
<p>
  Magna fringilla urna porttitor rhoncus dolor purus. Nullam non nisi est sit
  amet. Tincidunt eget nullam non nisi est sit. Blandit cursus risus at
  ultrices. Id venenatis a condimentum vitae sapien pellentesque habitant morbi.
</p>
<button>Donate</button>
<p>Built with &hearts; in St. Petersburg, Florida.</p>
```

## Refactoring and making the markup more semantic

Let's look at each section of this markup and see if we can improve it.

### Header

The very first section of content:

```html
<h1>Safari</h1>
<ul>
  <li>Home</li>
  <li>Our Animals</li>
  <li>Blog</li>
  <li>About</li>
</ul>
```

Appears to be the header of the page. So let's surround this with a `<header>`
element. This element has no specific styling but does have a _semantic_ meaning
that indicates that this part of the page is an important heading.

```html
<header>
  <h1>Safari</h1>
  <ul>
    <li>Home</li>
    <li>Our Animals</li>
    <li>Blog</li>
    <li>About</li>
  </ul>
</header>
```

Next, we notice that we might want to make all of the elements in the header a
kind of page navigation. That is clicking on each of those elements would take
us to various pages, or even just part of this page. So we will wrap the content
again inside a `<nav>` element.

```html
<header>
  <nav>
    <h1>Safari</h1>
    <ul>
      <li>Home</li>
      <li>Our Animals</li>
      <li>Blog</li>
      <li>About</li>
    </ul>
  </nav>
</header>
```

Again, this element applies no formatting of its own but does start to give this
part of the document more semantic meaning.

### Our New Friends

The Our New Friends section could be improved by noticing that the animals could
be interpreted as a list of animals. We will leave the "Featured Creatures"
portion alone for now since it is only two images. This may change in the future
as we begin to style the page.

We will turn this into a list:

```html
<h2>Our New Friends</h2>

<img src="http://placekitten.com/320/240" alt="An Animal" />
<img src="http://placekitten.com/320/240" alt="An Animal" />
<img src="http://placekitten.com/320/240" alt="An Animal" />
<img src="http://placekitten.com/320/240" alt="An Animal" />
```

```html
<h2>Our New Friends</h2>

<ul>
  <li>
    <img src="http://placekitten.com/320/240" alt="An Animal" />
  </li>
  <li>
    <img src="http://placekitten.com/320/240" alt="An Animal" />
  </li>
  <li>
    <img src="http://placekitten.com/320/240" alt="An Animal" />
  </li>
  <li>
    <img src="http://placekitten.com/320/240" alt="An Animal" />
  </li>
</ul>
```

## Articles

Next, we see that we have two elements that appear to be blog posts. Let's use
the `<article>` element to encompass those.

We will be refactoring this portion of the document.

```html
<h2>Latest Posts</h2>

<h3>Aliquam Eleifend mi in Nulla Posuere</h3>
<img src="http://placekitten.com/320/240" alt="An Animal" />
<p>
  In ante metus dictum at tempor commodo ullamcorper a lacus. Ultricies
  tristique nulla aliquet enim tortor at auctor. Egestas pretium aenean pharetra
  magna ac placerat vestibulum. Volutpat maecenas volutpat blandit aliquam. Enim
  diam vulputate ut pharetra sit. Commodo ullamcorper a lacus vestibulum sed
  arcu.
</p>

<h3>Tristique Risus nec Feugiat in Fermentum</h3>
<img src="http://placekitten.com/320/240" alt="An Animal" />
<p>
  Euismod quis viverra nibh cras pulvinar. Donec enim diam vulputate ut pharetra
  sit amet aliquam id. Id volutpat lacus laoreet non curabitur gravida arcu ac
  tortor. Sapien eget mi proin sed. Sit amet nulla facilisi morbi tempus. Id
  velit ut tortor pretium viverra.
</p>
```

We will wrap each of the blog posts in an `<article>` element to give them a
grouping. This will come in useful when we start to apply styles.

```html
<h2>Latest Posts</h2>

<article>
  <h3><a href="#">Aliquam Eleifend mi in Nulla Posuere</a></h3>
  <img src="http://placekitten.com/320/240" alt="An Animal" />
  <p>
    In ante metus dictum at tempor commodo ullamcorper a lacus. Ultricies
    tristique nulla aliquet enim tortor at auctor. Egestas pretium aenean
    pharetra magna ac placerat vestibulum. Volutpat maecenas volutpat blandit
    aliquam. Enim diam vulputate ut pharetra sit. Commodo ullamcorper a lacus
    vestibulum sed arcu.
  </p>
</article>

<article>
  <h3><a href="#">Tristique Risus nec Feugiat in Fermentum</a></h3>
  <img src="http://placekitten.com/320/240" alt="An Animal" />
  <p>
    Euismod quis viverra nibh cras pulvinar. Donec enim diam vulputate ut
    pharetra sit amet aliquam id. Id volutpat lacus laoreet non curabitur
    gravida arcu ac tortor. Sapien eget mi proin sed. Sit amet nulla facilisi
    morbi tempus. Id velit ut tortor pretium viverra.
  </p>
</article>
```

## Footer

As we organized the top of the page we can organize the elements at the bottom
of the page. We will first surround the content in a `footer` element. This
element, like the `header` element, provides a semantic clue that this
information is subordinate information found at the bottom.

```html
<h3>Join our Newsletter</h3>
Name
<input type="text" name="full-name" />
Email Address
<input type="e-mail" name="email-address" />
<input type="submit" value="Sign Up" />

<h3>Make a Donation</h3>
<p>
  Magna fringilla urna porttitor rhoncus dolor purus. Nullam non nisi est sit
  amet. Tincidunt eget nullam non nisi est sit. Blandit cursus risus at
  ultrices. Id venenatis a condimentum vitae sapien pellentesque habitant morbi.
</p>
<button>Donate</button>
<p>Built with &hearts; in St. Petersburg, Florida.</p>
```

Wrapping this in a `<footer>` element looks like this:

```html
<footer>
  <h3>Join our Newsletter</h3>
  Name
  <input type="text" name="full-name" />
  Email Address
  <input type="e-mail" name="email-address" />
  <input type="submit" value="Sign Up" />

  <h3>Make a Donation</h3>
  <p>
    Magna fringilla urna porttitor rhoncus dolor purus. Nullam non nisi est sit
    amet. Tincidunt eget nullam non nisi est sit. Blandit cursus risus at
    ultrices. Id venenatis a condimentum vitae sapien pellentesque habitant
    morbi.
  </p>
  <button>Donate</button>
  <p>Built with &hearts; in St. Petersburg, Florida.</p>
</footer>
```

Next, we will see that the `<input/>` elements are part of a larger structure
called a `<form>` and that the plain text `Name` and `Email Address` elements
are `<label>` elements that correspond to their input:

```html
<footer>
  <h3>Join our Newsletter</h3>
  <form>
    <p>
      <label for="full-name">Name</label>
      <input type="text" name="full-name" />
    </p>
    <p>
      <label for="email-address">Email Address</label>
      <input type="e-mail" name="email-address" />
    </p>
    <p>
      <input type="submit" value="Sign Up" />
    </p>
  </form>

  <h3>Make a Donation</h3>
  <p>
    Magna fringilla urna porttitor rhoncus dolor purus. Nullam non nisi est sit
    amet. Tincidunt eget nullam non nisi est sit. Blandit cursus risus at
    ultrices. Id venenatis a condimentum vitae sapien pellentesque habitant
    morbi.
  </p>
  <button>Donate</button>
  <p>Built with &hearts; in St. Petersburg, Florida.</p>
</footer>
```

# Applying some semantic structure to our application

As every developer knows, the first attempt we make to strucutre our code, or in
this case a web page, may not be our sole attempt. We may find that as we need
to style the page that this structure will change. By giving ourselves some
structure we can start to see the areas where we can apply styles.

We need to strike a balance here. Applying too much structure will make our
design rigid and difficult to change and style. At the same time, applying too
little structure prevents us from easily styling the content.

Knowing just how much structure to apply to our content is a skill that comes
with practice.

# Our final page structure

Here is what our page looks like so far and below that the HTML we are starting
with.

![](assets/content-only.png)

```html
<header>
  <nav>
    <h1>Safari</h1>
    <ul>
      <li>Home</li>
      <li>Our Animals</li>
      <li>Blog</li>
      <li>About</li>
    </ul>
  </nav>
</header>

<h2>Featured Creatures</h2>

<img src="http://placekitten.com/640/480" alt="An Animal" />
<img src="http://placekitten.com/640/480" alt="An Animal" />

<h2>Our New Friends</h2>

<ul>
  <li>
    <img src="http://placekitten.com/320/240" alt="An Animal" />
  </li>
  <li>
    <img src="http://placekitten.com/320/240" alt="An Animal" />
  </li>
  <li>
    <img src="http://placekitten.com/320/240" alt="An Animal" />
  </li>
  <li>
    <img src="http://placekitten.com/320/240" alt="An Animal" />
  </li>
</ul>

<h3>Lorem ipsum dolor sit amet</h3>
<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
  incididunt ut labore et dolore magna aliqua. Commodo ullamcorper a lacus
  vestibulum sed arcu non odio euismod.
</p>

<h2>Latest Posts</h2>

<article>
  <h3><a href="#">Aliquam Eleifend mi in Nulla Posuere</a></h3>
  <img src="http://placekitten.com/320/240" alt="An Animal" />
  <p>
    In ante metus dictum at tempor commodo ullamcorper a lacus. Ultricies
    tristique nulla aliquet enim tortor at auctor. Egestas pretium aenean
    pharetra magna ac placerat vestibulum. Volutpat maecenas volutpat blandit
    aliquam. Enim diam vulputate ut pharetra sit. Commodo ullamcorper a lacus
    vestibulum sed arcu.
  </p>
</article>

<article>
  <h3><a href="#">Tristique Risus nec Feugiat in Fermentum</a></h3>
  <img src="http://placekitten.com/320/240" alt="An Animal" />
  <p>
    Euismod quis viverra nibh cras pulvinar. Donec enim diam vulputate ut
    pharetra sit amet aliquam id. Id volutpat lacus laoreet non curabitur
    gravida arcu ac tortor. Sapien eget mi proin sed. Sit amet nulla facilisi
    morbi tempus. Id velit ut tortor pretium viverra.
  </p>
</article>

<footer>
  <h3>Join our Newsletter</h3>
  <form>
    <p>
      <label for="full-name">Name</label>
      <input type="text" name="full-name" />
    </p>
    <p>
      <label for="email-address">Email Address</label>
      <input type="e-mail" name="email-address" />
    </p>
    <p>
      <input type="submit" value="Sign Up" />
    </p>
  </form>

  <h3>Make a Donation</h3>
  <p>
    Magna fringilla urna porttitor rhoncus dolor purus. Nullam non nisi est sit
    amet. Tincidunt eget nullam non nisi est sit. Blandit cursus risus at
    ultrices. Id venenatis a condimentum vitae sapien pellentesque habitant
    morbi.
  </p>
  <button>Donate</button>
  <p>Built with &hearts; in St. Petersburg, Florida.</p>
</footer>
```
