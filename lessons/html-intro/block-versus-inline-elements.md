---
title: Block versus inline elements
order: 4
tags:
  - mdn-content
---

There are two important categories of elements in HTML, which you should know.
They are block-level elements and inline elements.

- Block-level elements form a visible block on a page — they will appear on a
  new line from whatever content went before it, and any content that goes after
  it will also appear on a new line. Block-level elements tend to be structural
  elements on the page that represent, for example, paragraphs, lists,
  navigation menus, footers, etc. A block-level element wouldn't be nested
  inside an inline element, but it might be nested inside another block-level
  element.
- Inline elements are elements contained within block-level elements and
  surround only small parts of the document’s content, not entire paragraphs and
  groupings of content. An inline element will not cause a new line to appear in
  the document; they would generally appear inside a paragraph of text, for
  example an `<a>` element (hyperlink) or emphasis elements such as `<em>` or
  `<strong>`.

---

<CodePen>

`<em>` is an inline element, so as you can see below, the first three elements
sit on the same line as one another with no space in between. On the other hand,
`<p>` is a block-level element, so each element appears on a new line, with
space above and below (the spacing is due to default CSS styling that the
browser applies to paragraphs).

<pre data-lang='html'>
{`
<em>first</em><em>second</em><em>third</em>

<p>fourth</p>
<p>fifth</p>
<p>sixth</p>
`}
</pre>

</CodePen>

---
