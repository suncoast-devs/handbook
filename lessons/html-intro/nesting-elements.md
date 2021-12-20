---
title: Nesting elements
order: 3
tags:
  - mdn-content
---

<CodePen>

You can put elements inside other elements as well — this is called nesting. If
we wanted to state that our cat is very grumpy, we could wrap the word "very" in
a `<strong>` element, which means that the word is to be strongly emphasized.

<pre data-lang='html'>
{`
<p>My cat is <strong>very</strong> grumpy.</p>
`}
</pre>

</CodePen>

---

You will need to make sure that your elements are correctly nested: in the
example above, we opened the p element first, then the strong element, which
would mean we have to close the strong element first, then the p. The following
is incorrect:

```html
<p>My cat is <strong>very grumpy.</p></strong>
```

The elements have to open and close correctly, so they are clearly inside or
outside one another. If they overlap like above, then your web browser will try
to make the best guess at what you were trying to say, and you may well get
unexpected results. So don't do it!

---
