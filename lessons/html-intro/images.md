---
title: Images
order: 12
tags:
  - mdn-content
---

A common element on a web page is an image. Given that their exchange rate is
equal to one thousand words, they can be an important aspect of any page design.

In order to put a simple image on a webpage, we use the `<img>` element. This is
an empty element (meaning that it has no text content or closing tag) that
requires a minimum of one attribute to be useful - `src`. The `src` attribute
contains a path pointing to the image you want to embed in the page, which can
be a relative or absolute URL, in the same way as href attribute values in `<a>`
elements.

So for example, if your image is called dinosaur.jpg, and it sits in the same
directory as your HTML page, you could embed the image like so:

```html
<img src="dinosaur.jpg" />
```

If the image was in an images subdirectory, then you'd embed it like this:

```html
<img src="images/dinosaur.jpg" />
```

You could embed the image using its absolute URL, for example:

```html
<img src="https://www.example.com/images/dinosaur.jpg" />
```

But this is pointless, as it just makes the browser do more work, looking up the
IP address from the DNS server all over again, etc. Only specify the full URL
when the image is not on the same website as your content.

## Alternative text

The next attribute we'll look at is `alt`. Its value is supposed to be a textual
description of the image, for use in situations where the image cannot be
seen/displayed or takes a long time to render because of a slow internet
connection. For example, our above code could be modified like so:

```html
<img
  src="images/dinosaur.jpg"
  alt="The head and torso of a dinosaur skeleton;
          it has a large head with long sharp teeth"
/>
```

So, why would you ever see or need alt text? It can come in handy for a number
of reasons:

- The user is visually impaired, and is using a screen reader to read the web
  out to them. In fact, having alt text available to describe images is useful
  to most users.
- As described above, the spelling of the file or path name might be wrong.
- The browser doesn't support the image type. Some people still use text-only
  browsers, such as Lynx, which displays the alt text of images.
- You may want to provide text for search engines to utilize; for example,
  search engines can match alt text with search queries.
- Users have turned off images to reduce data transfer volume and distractions.
  This is especially common on mobile phones, and in countries where bandwidth
  is limited or expensive.

What exactly should you write inside your alt attribute? It depends on why the
image is there in the first place. In other words, what you lose if your image
doesn't show up:

- **Decoration**. You should use CSS background images for decorative images,
  but if you must use HTML, add a blank `alt=""`. If the image isn't part of the
  content, a screen reader shouldn't waste time reading it.
- **Content**. If your image provides significant information, provide the same
  information in a brief alt text – or even better, in the main text which
  everybody can see. Don't write redundant alt text. How annoying would it be
  for a sighted user if all paragraphs were written twice in the main content?
  If the image is described adequately by the main text body, you can just use
  alt="".
- **Link**. If you put an image inside `<a>` tags, to turn an image into a link,
  you still must provide accessible link text. In such cases you may, either,
  write it inside the same `<a>` element, or inside the image's alt attribute –
  whichever works best in your case.
- **Text**. You should not put your text into images. If your main heading needs
  a drop shadow, for example, use CSS for that rather than putting the text into
  an image. However, If you really can't avoid doing this, you should supply the
  text inside the alt attribute.

## Captions

Annotating images with figures and figure captions

Speaking of captions, there are a number of ways that you could add a caption to
go with your image. For example, there would be nothing to stop you from doing
this:

```html
<div class="figure">
  <img
    src="images/dinosaur.jpg"
    alt="The head and torso of a dinosaur skeleton;
            it has a large head with long sharp teeth"
    width="400"
    height="341"
  />

  <p>A T-Rex on display in the Manchester University Museum.</p>
</div>
```

This is ok. It contains the content you need, and is nicely stylable using CSS.
But there is a problem here: there is nothing that semantically links the image
to its caption, which can cause problems for screen readers. For example, when
you have 50 images and captions, which caption goes with which image?

A better solution, is to use the HTML5 `<figure>` and `<figcaption>` elements.
These are created for exactly this purpose: to provide a semantic container for
figures, and to clearly link the figure to the caption. Our above example could
be rewritten like this:

```html
<figure>
  <img
    src="images/dinosaur.jpg"
    alt="The head and torso of a dinosaur skeleton;
            it has a large head with long sharp teeth"
    width="400"
    height="341"
  />

  <figcaption>
    A T-Rex on display in the Manchester University Museum.
  </figcaption>
</figure>
```

The `<figcaption>` element tells browsers, and assistive technology that the
caption describes the other content of the `<figure>` element.
