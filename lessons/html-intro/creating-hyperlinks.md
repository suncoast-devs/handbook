---
title: Creating hyperlinks
order: 11
tags:
  - mdn-content
---

Hyperlinks are essential — they are what makes the Web a web. This article shows
the syntax required to make a link and discusses link best practices.

What is a hyperlink?

Hyperlinks are one of the most exciting innovations the Web has to offer. Well,
they've been a feature of the Web since the very beginning, but hyperlinks are
what makes the Web a Web — they allow us to link our documents to any other
documents (or another resource) we want to, we can also link to specific parts
of documents, and we can make apps available at a simple web address (contrast
this to native apps, which have to be installed and all that business.) Just
about any web content can be converted to a link so that when clicked (or
otherwise activated), it will make the web browser go to another web address
(URL).

The BBC homepage, for example, contains a large number of links to point to not
only multiple news stories but also different areas of the site (navigation
functionality), login/registration pages (user tools), and more.

Anatomy of a link

A basic link is created by wrapping the text (or other content, see Block level
links) you want to turn into a link inside an `<a>` element, and giving it an
href attribute (also known as a Hypertext Reference, or target) that will
contain the web address you want the link to point to.

```html
<p>
  I'm creating a link to
  <a href="https://www.mozilla.org/en-US/">the Mozilla homepage</a>.
</p>
```

<p>I'm creating a link to 
<a href="https://www.mozilla.org/en-US/">the Mozilla homepage</a>.
</p>

## Adding supporting information with the title attribute

Another attribute you may want to add to your links is a title; this is intended
to contain supplementary helpful information about the link, such as what kind
of information the page contains or things to be aware of. For example:

```html
<p>
  I'm creating a link to
  <a
    href="https://www.mozilla.org/en-US/"
    title="The best place to find more information about Mozilla's
          mission and how to contribute"
    >the Mozilla homepage</a
  >.
</p>
```

This gives us the following result (the title will come up as a tooltip when the
link is hovered over):

<p>I'm creating a link to 
<a href="https://www.mozilla.org/en-US/"
   title="The best place to find more information about Mozilla's
          mission and how to contribute">the Mozilla homepage</a>.
</p>

## Block level links

As mentioned before, you can turn just about any content into a link, even
block-level elements. If you had an image you wanted to turn into a link, you
could just put the image between <a></a> tags.

```html
<a href="https://www.mozilla.org/en-US/">
  <img
    src="mozilla-image.png"
    alt="mozilla logo that links to the mozilla homepage"
  />
</a>
```

## E-mail links

It is possible to create links or buttons that, when clicked, open a new
outgoing email message rather than linking to a resource or page. This is done
using the `<a>` element and the `mailto:` URL scheme.

In its most basic and commonly used form, a `mailto:` link simply indicates the
email address of the intended recipient. For example:

```html
<a href="mailto:nowhere@mozilla.org">Send email to nowhere</a> This results in a
link that looks like this: Send email to nowhere.
```

The email address is even optional. If you leave it out (that is, your `href` is
simply `"mailto:"`), a new outgoing email window will be opened by the user's
mail client that has no destination address specified yet. This is often useful
as "Share" links that users can click to send an email to an address of their
choosing.

### Specifying details

In addition to the email address, you can provide other information. Any
standard mail header fields can be added to the `mailto` URL you provide. The
most commonly used of these are "subject", "cc", and "body" (which is not a true
header field, but allows you to specify a short content message for the new
email). Each field and its value is specified as a query term.

Here's an example that includes a cc, bcc, subject and body:

```html
<a
  href="mailto:nowhere@mozilla.org?cc=name2@rapidtables.com&bcc=name3@rapidtables.com&subject=The%20subject%20of%20the%20email&body=The%20body%20of%20the%20email"
>
  Send mail with cc, bcc, subject and body
</a>
```

---

## Absolute Links

When linking to a specific location within your site or application, you can use
an `absolute` link. When using an absolute link, you provide the entire path to
the page.

** Example **

```html
<a href="/marketing/products/promotional/cups">Cups</a>
```

If we were making a link from the `cups` page to a page that was a _sibling_ we
could use a `relative` link.

** example **

```html
<a href="./mugs">Mugs</a>
```

The `./` at the beginning of the link means _from the current path_ and then we
look for a page `mugs`

If we were on the `cups` page and wanted to go back to the `promotional` page we
could use another form of relative link.

_example_

```html
<a href="..">Promotional</a>
```

In this case the `..` means to go up one level. Since we are currently at
`/marketing/products/promotional/cups` we would end up at
`/marketing/products/promotional`

By using absolute and relative links we can navigate the structure of our page.
Absolute links help us link to specific locations on our site by resetting us
back to the root of the site. Relative links help us avoid having to repeatedly
reference back to the root which helps us move entire sections of our site
without breaking links.

---
