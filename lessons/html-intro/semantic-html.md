---
title: Semantic HTML
order: 13
tags:
  - mdn-content
---

Semantics relate to meaning in a language. In HTML we want to choose tags that
convey to the browser, and to any future developer, the _purpose_ of the chosen
tag.

For example, the `<h1>` element is a semantic element, which gives the text it
wraps around the role (or meaning) of "a top level heading on your page." By
default, most browser's user agent stylesheet will style an `<h1>` with a large
font size to make it look like a heading (although you could style it to look
like anything you wanted).

However you could make any element look like a top level heading. For instance,
we could use the following HTML and style:
`<span style="font-size: 32px; margin: 21px 0;">Is this a top level heading?</span>`

This will render it to look like a top level heading, but it has no semantic
value, so it will not get any extra benefits as described above. It is therefore
a good idea to use the right HTML element for the right job.

HTML should be coded to represent the data that will be populated and not based
on its default presentation styling. Presentation (how it should look), is the
_sole responsibility_ of CSS.

Some of the benefits from writing semantic markup are as follows:

- Search engines will consider its contents as important keywords to influence
  the page's search rankings (see SEO)
- Screen readers can use it as a signpost to help visually impaired users
  navigate a page
- Finding blocks of meaningful code is significantly easier than searching
  though endless divs with or without semantic or namespaced classes
- Suggests to the developer the type of data that will be populated
- Semantic naming mirrors proper custom element/component naming

When approaching which markup to use, ask yourself:

> "What element(s) best describe/represent the data that I'm going to populate?"

For example:

- Is it a list of data?; ordered, unordered?
- Is it an article with sections and an aside of related information?; does it
  list out definitions?
- Is it a figure or image that needs a caption?
- Should it have a header and a footer in addition to the global site-wide
  header and footer?
