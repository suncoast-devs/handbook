---
title: HTML text fundamentals
order: 11
tags:
  - mdn-content
---

One of HTML's main jobs is to give text structure and meaning (also known as
semantics) so that a browser can display it correctly. This article explains the
way HTML can be used to structure a page of text by adding headings and
paragraphs, emphasizing words, creating lists, and more.

## The basics: Headings and Paragraphs

Most structured text is comprised of headings and paragraphs, irrespective of
whether you are reading a story, a newspaper, a college textbook, a magazine,
etc.

Structured content makes the reading experience easier and more enjoyable.

In HTML, each paragraph has to be wrapped in a `<p>` element, like so:

```html
<p>I am a paragraph, oh yes I am.</p>
```

Each heading has to be wrapped in a heading element:

```html
<h1>I am the title of the story.</h1>
```

There are six heading elements — `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, and
`<h6>`. Each element represents a different level of content in the document;
`<h1>` represents the main heading, `<h2>` represents subheadings, `<h3>`
represents sub-subheadings, and so on.

As an example, in a story, `<h1>` would represent the title of the story,
`<h2>`s would represent the title of each chapter and `<h3>`s would represent
sub-sections of each chapter, and so on.

```html
<h1>The Crushing Bore</h1>

<p>By Chris Mills</p>

<h2>Chapter 1: The dark night</h2>

<p>
  It was a dark night. Somewhere, an owl hooted. The rain lashed down on the ...
</p>

<h2>Chapter 2: The eternal silence</h2>

<p>
  Our protagonist could not so much as a whisper out of the shadowy figure ...
</p>

<h3>The specter speaks</h3>

<p>
  Several more hours had passed, when all of a sudden the specter sat bolt
  upright and exclaimed, "Please have mercy on my soul!"
</p>
```

It's really up to you what exactly the elements involved represent, as long as
the hierarchy makes sense. You just need to bear in mind a few best practices as
you create such structures:

- Make sure you use the headings in the correct order in the hierarchy. Don't
  use `<h3>`s to represent subheadings, followed by `<h2>`s to represent
  sub-subheadings — that doesn't make sense and will lead to weird results.
- Of the six heading levels available, you should aim to use no more than three
  per page unless you feel it is necessary. Documents with many levels (i.e. a
  deep heading hierarchy) become unwieldy and difficult to navigate. On such
  occasions, it is advisable to spread the content over multiple pages if
  possible.

## Why do we need semantics?

Semantics are relied on everywhere around us — we rely on previous experience to
tell us what the function of everyday objects are; when we see something, we
know what its function will be. So, for example, we expect a red traffic light
to mean "stop" and a green traffic light to mean "go". Things can get tricky
quickly if the wrong semantics are applied (do any countries use red to mean
"go"? I hope not.)

In a similar vein, we need to make sure we are using the correct elements,
giving our content the exact meaning, function, or appearance. In this context,
the `<h1>` element is also a semantic element, which gives the text it wraps
around the role (or meaning) of "a top-level heading on your page."

```html
<h1>This is a top-level heading</h1>
```

By default, the browser will give it a large font size to make it look like a
heading (although you could style it to look like anything you wanted using
CSS). More importantly, its semantic value will be used in multiple ways, for
example, by search engines and screen readers (as mentioned above.)

On the other hand, you could make any element look like a top-level heading.
Consider the following:

```html
<span style="font-size: 32px; margin: 21px 0;"
  >Is this a top level heading?</span
>
```

This is a `<span>` element. It has no semantics. You use it to wrap content when
you want to apply CSS to it (or do something to it with JavaScript) without
giving it any extra meaning (You'll find out more about these later on in the
course.) We've applied some CSS to it to make it look like a top-level heading,
but since it has no semantic value, it will not get any of the extra benefits
described above. It is a good idea to use the relevant HTML element for the job.

## Lists

Now let's turn our attention to lists. Lists are everywhere in life — from your
shopping list to the list of directions you subconsciously follow to get to your
house every day to the lists of instructions you are following in these
tutorials! Lists are everywhere on the Web too, and we've got three different
types to worry about.

### Unordered Lists

```html
Unordered lists are used to mark up lists of items for which the order of the
items doesn't matter — let's take a shopping list as an example. milk eggs bread
hummus
```

Every unordered list starts off with a `<ul>` element — this wraps around all
the list items:

```html
<ul>
  milk eggs bread hummus
</ul>
```

The last step is to wrap each list item in a `<li>` (list item) element:

```html
<ul>
  <li>milk</li>
  <li>eggs</li>
  <li>bread</li>
  <li>hummus</li>
</ul>
```

### Ordered

Ordered lists are lists in which the order of the items does matter — let's take
a set of directions as an example:

```
Drive to the end of the road
Turn right
Go straight across the first two roundabouts
Turn left at the third roundabout
The school is on your right, 300 meters up the road
```

The markup structure is the same as for unordered lists, except that you have to
wrap the list items in an `<ol>` element, rather than `<ul>`:

```html
<ol>
  <li>Drive to the end of the road</li>
  <li>Turn right</li>
  <li>Go straight across the first two roundabouts</li>
  <li>Turn left at the third roundabout</li>
  <li>The school is on your right, 300 meters up the road</li>
</ol>
```

### Nesting lists

It is perfectly ok to nest one list inside another one. You might want to have
some sub-bullets sitting below a top-level bullet. Let's take the second list
from our recipe example:

```html
<ol>
  <li>Remove the skin from the garlic, and chop coarsely.</li>
  <li>Remove all the seeds and stalk from the pepper, and chop coarsely.</li>
  <li>Add all the ingredients into a food processor.</li>
  <li>Process all the ingredients into a paste.</li>
  <li>If you want a coarse "chunky" hummus, process it for a short time.</li>
  <li>If you want a smooth hummus, process it for a longer time.</li>
</ol>
```

Since the last two bullets are very closely related to the one before them (they
read like sub-instructions or choices that fit below that bullet), it might make
sense to nest them inside their unordered list and put that list inside the
current fourth bullet. This would look like so:

```html
<ol>
  <li>Remove the skin from the garlic, and chop coarsely.</li>
  <li>Remove all the seeds and stalk from the pepper, and chop coarsely.</li>
  <li>Add all the ingredients into a food processor.</li>
  <li>
    Process all the ingredients into a paste.
    <ul>
      <li>
        If you want a coarse "chunky" hummus, process it for a short time.
      </li>
      <li>If you want a smooth hummus, process it for a longer time.</li>
    </ul>
  </li>
</ol>
```

## Emphasis and importance

In human language, we often emphasize certain words to alter the meaning of a
sentence, and we often want to mark certain words as important or different in
some way. HTML provides various semantic elements to allow us to mark up textual
content with such effects, and in this section, we'll look at a few of the most
common ones.

### Emphasis

When we want to add emphasis to in spoken language, we stress certain words,
subtly altering the meaning of what we are saying. Similarly, in written
language, we tend to stress words by putting them in italics. For example, the
following two sentences have different meanings.

I am glad you weren't late.

I am _glad_ you weren't _late_.

The first sentence sounds genuinely relieved that the person wasn't late. In
contrast, the second one sounds sarcastic or passive-aggressive, expressing
annoyance that the person arrived a bit late.

In HTML we use the `<em>` (emphasis) element to mark up such instances. As well
as making the document more interesting to read, these are recognized by screen
readers and spoken out in a different tone of voice. Browsers style this as
italic by default, but you shouldn't use this tag purely to get italic styling.
To do that, you'd use a `<span>` element and some CSS, or perhaps an `<i>`
element (see below.)

```html
<p>I am <em>glad</em> you weren't <em>late</em>.</p>
```

### Strong importance

To emphasize important words, we tend to stress them in spoken language and bold
them in written language. For example:

This liquid is highly toxic.

I am counting on you. Do not be late!

In HTML we use the `<strong>` (strong importance) element to mark up such
instances. As well as making the document more useful again these are recognized
by screen readers and spoken in a different tone of voice. Browsers style this
as bold text by default, but you shouldn't use this tag purely to get bold
styling. To do that, you'd use a `<span>` element and some CSS, or perhaps a
`<b>` element (see below.)

```html
<p>This liquid is <strong>highly toxic</strong>.</p>

<p>I am counting on you. <strong>Do not</strong> be late!</p>
You can nest strong and emphasis inside one another if desired:

<p>
  This liquid is <strong>highly toxic</strong> — if you drink it,
  <strong>you may <em>die</em></strong
  >.
</p>
```

---
