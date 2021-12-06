---
title: HTML Elements
---

There are many
[elements available](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
in the HTML specification and it is a good idea to become familiar with as many
of them as you can. However, there are a core set of elements that we will see
used more often. We have gathered the list of these elements here with a
description of where and how to use them.

To see more detail on any of these elements, visit the
[MDN Element Reference Guide](https://developer.mozilla.org/en-US/docs/Web/HTML/Element).

You can also click on any specific element to see a demonstration of the element
as well as documentation on its usage.

## Semantic Elements

These elements convey a
[semantic](https://developer.mozilla.org/en-US/docs/Glossary/Semantics) meaning.
These
[semantic elements](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#Semantic_elements)
allow us to convey meaning to search engines, screen readers, and to our fellow
developers. When possible use the best semantic element to represent the _idea_
of the enclosed content.

---

### [nav](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav)

> Represents a section of a page whose purpose is to provide navigation links,
> either within the current document or to other documents. Common examples of
> navigation sections are menus, tables of contents, and indexes.

---

### [section](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section)

> Represents a standalone section — which doesn't have a more specific semantic
> element to represent it — contained within an HTML document.

---

### [main](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main)

> Represents the dominant content of the `<body>` of a document. The main
> content area consists of content that is directly related to or expands upon
> the central topic of a document, or the central functionality of an
> application.

---

### [header](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header)

> Represents introductory content, typically a group of introductory or
> navigational aids. It may contain some heading elements but also a logo, a
> search form, an author name, and other elements.

---

### [article](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article)

> Represents a self-contained composition in a document, page, application, or
> site, which is intended to be independently distributable or reusable (e.g.,
> in syndication). Examples include: a forum post, a magazine or newspaper
> article, or a blog entry.

---

### [aside](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside)

> Represents a portion of a document whose content is only indirectly related to
> the document's main content.

---

### [footer](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer)

> Represents a footer for its nearest sectioning content or sectioning root
> element. A footer typically contains information about the author of the
> section, copyright data or links to related documents.

---

### [figure](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure)

> Represents self-contained content, frequently with a caption (`<figcaption>`),
> and is typically referenced as a single unit.

---

### [figcaption](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption)

> Represents a caption or legend for the rest of the contents its parent
> `<figure>` element, if any.

---

### [blockquote](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote)

> Indicates that the enclosed text is an extended quotation. Usually, this is
> rendered visually by indentation (see Notes for how to change it). A URL for
> the source of the quotation may be given using the cite attribute, while a
> text representation of the source can be given using the `<cite>` element.

---

### [h1](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements) through h6

> Represent six levels of section headings. `<h1>` is the highest section level
> and `<h6>` is the lowest.

---

### [p](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p)

> Represents a paragraph.

---

### [ul](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul)

> Represents an unordered list of items, typically rendered as a bulleted list.

---

### [ol](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol)

> Represents an ordered list of items, typically rendered as a numbered list.

---

### [img](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)

> Embeds an image into the document

---

### [a](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a)

> Referred to as the anchor element, creates a hyperlink to other web pages,
> files, locations within the same page, email addresses, or any other URL.

---

### [em](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em)

> Marks text that has stress emphasis. The `<em>` element can be nested, with
> each level of nesting indicating a greater degree of emphasis.

---

### [q](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q)

> Indicates that the enclosed text is a short inline quotation. Most modern
> browsers implement this by surrounding the text in quotation marks.

---

### [table](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table)

> Represents tabular data — that is, information presented in a two-dimensional
> table comprised of rows and columns of cells containing data. See `<tbody>`,
> `<thead>`, `<tr>`, and `<td>`

---

## Non Semantic Element

These elements don't convey any specific semantic meaning and can be used for
multiple meanings. When there is not a more meaningful semantic element to
choose, use these. For instance, a `<div>` can be used if an element such as
`<section>`, `<aside>`, `<header>`, `<footer>`, or other element would not be
appropriate.

### [div](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div)

> Is the generic container for flow content. It has no effect on the content or
> layout until styled using CSS.

---

### [span](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span)

> Is a generic inline container for phrasing content, which does not inherently
> represent anything. It can be used to group elements for styling purposes
> (using the class or id attributes)
