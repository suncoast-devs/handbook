theme: Next, 1

# [fit] HTML

---

# HTML

- HTML (Hypertext Markup Language) is a markup language
- Used to tell your browser how to structure the web pages
- Consists of a series of elements
- Elements enclose, wrap, or mark up different parts of the content

---

# Most basic HTML is plain text

[.column]

```html
Jason
```

[.column]

![fit](./assets/jason-plain.png)

^ This is just plain text in the browser. It doesn't have any styling, or any meaning

---

# Adding meaning to text

[.column]

```html
<p>Jason</p>
```

[.column]

![fit](./assets/jason-paragraph.png)

^ This tells the browser that this is an entire paragraph, which in the browser will make the text appear on it's own line and have some padding. This means that the paragraph has both _semantics_ and _formatting_

---

# What is an HTML Element?

---

![fit](https://mdn.mozillademos.org/files/9347/grumpy-cat-small.png)

---

# The main parts of an element are:

|             |                                                                                           |
| :---------: | :---------------------------------------------------------------------------------------: |
| Opening tag | The name of the element (in this case, p), wrapped in opening and closing angle brackets. |
| Closing tag | Same as the opening tag, except that it includes a forward slash before the element name. |
|   Content   |               The content of the element, which in this case is just text.                |

---

# Nesting Elements

To say that Jason is our CEO, we could wrap the word "CEO" in a `<strong>` element. This indicates, both _semantically_ and _visually_ that the word is to be strongly emphasized

<br/>

```html
<p>Jason is our <strong>CEO</strong></p>
```

![fit right](./assets/jason-strong.png)

---

# Careful!

You do however need to make sure that your elements are properly nested: in the example above, we opened the p element first, then the strong element, therefore we have to close the strong element first, then the p.

<br/>

The following is incorrect

```html
<p>Jason is our <strong>CEO</p></strong>
```

---

[.autoscale: true]

# Browser are too good

Browsers are very forgiving of invalid HTML (even if your instructors or teammates are not)

[.column]

The invalid code above looks like this in the browser. There is no difference in the browser of the broken code as the correct code.

Making sure you have _correct_ code is very important.

[.column]
![fit](./assets/jason-invalid.png)

---

# HTML Attributes

Elements can also have attributes, which look like this

![inline](https://mdn.mozillademos.org/files/9345/grumpy-cat-attribute-small.png)

---

# Attributes

- Attributes contain extra information about the element which you don't want to appear in the actual content.

- In this case, the class attribute allows you to give the element an identifying name that can be later used to target the element with style information and other things.

---

# Attributes Should Have ...

1. A space between it and the element name (or the previous attribute, if the element already has one or more attributes.)
1. The attribute name, followed by an equals sign.
1. An attribute value, with opening and closing quote marks wrapped around it.

---

# Anatomy of an HTML document

[.column]

HTML elements aren't very useful on their own. Now we'll look at how individual elements are combined to form an entire HTML page:

[.column]

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>About SDG</title>
  </head>
  <body>
    <p>Jason is our <strong>CEO</strong></p>
  </body>
</html>
```

---

# Lets break this down

---

[.autoscale: true]

# `<!DOCTYPE html>`

[.column]

> The doctype. In the mists of time, when HTML was young (about 1991/2), doctypes were meant to act as links to a set of rules that the HTML page had to follow to be considered good HTML, which could mean automatic error checking and other useful things.

[.column]

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>About SDG</title>
  </head>
  <body>
    <p>Jason is our <strong>CEO</strong></p>
  </body>
</html>
```

---

# `<!DOCTYPE html>`

[.autoscale: true]

[.column]

However, these days no one really cares about them, and they are really just a historical artifact that needs to be included for everything to work right. **`<!DOCTYPE html>`** is the shortest string of characters that counts as a valid doctype; that's all you really need to know.

[.column]

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>About SDG</title>
  </head>
  <body>
    <p>Jason is our <strong>CEO</strong></p>
  </body>
</html>
```

---

# `<html></html>`

[.column]

The `<html>` element. This element wraps all the content on the entire page, and is sometimes known as the root element.

[.column]

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>About SDG</title>
  </head>
  <body>
    <p>Jason is our <strong>CEO</strong></p>
  </body>
</html>
```

---

# `<head></head>`

[.autoscale: true]

[.column]

The `<head>` element. This element acts as a container for all the stuff you want to include on the HTML page that isn't the content you are showing to your page's viewers. This includes things like keywords and a page description that you want to appear in search results, CSS to style our content, character set declarations, and more.

[.column]

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>About SDG</title>
  </head>
  <body>
    <p>Jason is our <strong>CEO</strong></p>
  </body>
</html>
```

---

[.autoscale: true]

# `<meta charset="utf-8">`

[.column]

This element sets the character set your document should use to UTF-8, which includes most characters from the vast majority of human written languages. Essentially it can now handle any textual content you might put on it. There is no reason not to set this, and it can help avoid some problems later.

[.column]

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>About SDG</title>
  </head>
  <body>
    <p>Jason is our <strong>CEO</strong></p>
  </body>
</html>
```

---

[.autoscale: true]

# `<title></title>`

[.column]

The `<title>` element. This sets the title of your page, which is the title that appears in the browser tab the page is loaded in, and is used to describe the page when you bookmark/favorite it.

[.column]

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>About SDG</title>
  </head>
  <body>
    <p>Jason is our <strong>CEO</strong></p>
  </body>
</html>
```

---

[.autoscale: true]

# `<body></body>`

[.column]

The `<body>` element. This contains all the content that you want to show to web users when they visit your page, whether that's text, images, videos, games, playable audio tracks, or whatever else.

[.column]

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>About SDG</title>
  </head>
  <body>
    <p>Jason is our <strong>CEO</strong></p>
  </body>
</html>
```

---

# Whitespace

[.column]

In the above examples you may have noticed that a lot of whitespace is included in the code listings — this is not necessary at all; the two following code snippets are equivalent:

[.column]

<!-- prettier-ignore -->
```html
<p>Dogs       are
                    silly.</p>

<p>Dogs are silly.</p>
```

---

# Whitespace

No matter how much whitespace you use (which can include space characters, but also line breaks), HTML reduces each one down to a single space when rendering.

---

# Whitespace

> So why use so much whitespace?

The answer is _readability_

It is so much easier to understand what is going on in your code if you have it nicely formatted.

It is up to you what style of formatting you use (how many spaces for each level of indentation, for example), but you should consider formatting it.

---

# Whitespace

> At Suncoast Developers Guild we will use a tool named `prettier` to ensure our code is nicely formatted.

---

# Displaying Text

One of HTML's main jobs is to give text structure and meaning (also known as semantics) so that a browser can display it correctly. Let's take a look at how HTML can be used to structure a page of text by adding headings and paragraphs, emphasizing words, creating lists, and more.

---

# The basics: Headings and Paragraphs

Most structured text is comprised of headings and paragraphs, irrespective of whether you are reading a story, a newspaper, a college textbook, a magazine, etc.

Structured content makes the reading experience easier and more enjoyable.

---

# Paragraphs

[.column]

In HTML, each paragraph has to be wrapped in a `<p>` element, like so:

[.column]

```html
<p>I am a paragraph, oh yes I am.</p>
```

---

# Headings

[.column]

Each heading has to be wrapped in a heading element:

[.column]

```html
<h1>I am the title of the story.</h1>
```

---

# Headings

- There are six heading elements — `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, and `<h6>`.

- Each represents a different level of content; `<h1>` represents the main heading, `<h2>` subheadings, `<h3>` sub-subheadings, and so on.

- For example, in a story, `<h1>` would represent the title, `<h2>`s the title of each chapter and `<h3>`s the sub-sections of each chapter, and so on.

---

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

---

# Semantics

It's really up to you what exactly the elements involved represent, as long as the hierarchy makes sense. You just need to bear in mind a few best practices as you create such structures.

---

# Some General Rules

1. Use the headings in the correct order in the hierarchy. Don't use `<h3>`s to represent subheadings, followed by `<h2>`s to represent sub-subheadings — that doesn't make sense and will lead to weird results.
1. Of the six heading levels available, you should aim to use no more than three per page, unless you feel it is necessary.

---

# Why do we need semantics?

Semantics are relied on everywhere around us — we rely on previous experience to tell us what the function of everyday objects is; when we see something, we know what its function will be. So, for example, we expect a red traffic light to mean "stop", and a green traffic light to mean "go".

---

# Why do we need semantics?

```html
<h1>This is a top level heading</h1>
```

<br/>

In a similar vein, we need to make sure we are using the correct elements, giving our content the correct meaning, function, or appearance. In this context the `<h1>` element is also a semantic element, which gives the text it wraps around the role (or meaning) of "a top level heading on your page."

---

# How are semantics used?

By default, the browser will give it a large font size to make it look like a heading (although you could style it to look like anything you wanted using CSS). More importantly, its semantic value will be used in multiple ways, for example by search engines and screen readers.

---

# More on semantics later

In a later section we will discuss a wide range of semantic tags to help give our pages more meaning and context.

---

# Lists

Lists are everywhere in life — from your shopping list to the list of directions you subconsciously follow to get to your house every day, to the lists of instructions you are following in these tutorials!

Lists are everywhere on the Web too, and we have three different types to use.

---

# Unordered Lists

Unordered lists are used to mark up lists of items for which the order of the items doesn't matter.

Let's take a shopping list as an example.

```html
milk eggs bread hummus
```

---

# Unordered List Container

Every unordered list starts off with a `<ul>` element — this wraps around all
the list items:

```html
<ul>
  milk eggs bread hummus
</ul>
```

---

# Unordered List Items

The last step is to wrap each list item in an `<li>` (list item) element:

```html
<ul>
  <li>milk</li>
  <li>eggs</li>
  <li>bread</li>
  <li>hummus</li>
</ul>
```

---

# `<ul>` and `<li>` relationship

- You'll notice that when we added the `<li>` items we now _indent_ those elements.

- The `<li>` are _nested_ inside the `<ul>` and we say they are _children_ of the `<ul>` element.

- To help us visually we indent the children element several spaces for every level of nesting.

- The browser doesn't care about the nesting, but it helps us as writers (and as readers) of our code.

---

# Ordered

[.column]

Ordered lists are lists in which the order of the items does matter — let's take a set of directions as an example:

[.column]

```
Drive to the end of the road
Turn right
Go straight across the first two roundabouts
Turn left at the third roundabout
The school is on your right, 300 meters up the road
```

---

# Ordered list

The markup structure is the same as for unordered lists, except that you have to wrap the list items in an `<ol>` element, rather than `<ul>`

```html
<ol>
  <li>Drive to the end of the road</li>
  <li>Turn right</li>
  <li>Go straight across the first two roundabouts</li>
  <li>Turn left at the third roundabout</li>
  <li>The school is on your right, 300 meters up the road</li>
</ol>
```

---

# Nesting lists

It is perfectly ok to nest one list inside another one. You might want to have some sub-bullets sitting below a top level bullet. Let's look at this recipe example:

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

---

# Nested Lists

The last two bullets are very closely related to the one before them. Lets put that list inside the fourth bullet.

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

---

# Linking to other pages

We can create plain text, paragraphs, and lists of items now. However we can only create these on one page.

Lets add links between pages.

---

# Links

Links (also known as Hyperlinks) are what makes the Web a Web — they allow us to link our documents to any other document (or other resource) we want to

Just about any web content can be converted to a link, so that when clicked it will make the web browser go to another web address (URL).

---

# Anatomy of a link

A basic link is created by wrapping the content you want to turn into a link inside an `<a>` element, and giving it an href attribute that will contain the web address you want the link to point to.

NOTE that `href` stands for `Hypertext REFerence`

<!-- prettier-ignore -->
```html
<p>
  I'm creating a link to the
  <a href="https://suncoast.io/handbook">Suncoast Developers Guild Handbook</a>
  page.
</p>
```

---

# Adding supporting information with the title attribute

[.column]

Another attribute you may want to add to your links is title; this is intended to contain supplementary useful information about the link, such as what kind of information the page contains, or things to be aware of. For example:

[.column]

```html
<p>
  I'm creating a link to the

  <a
    href="https://suncoast.io/handbook"
    title="Our curriculum and student handbook"
  >
    Suncoast Developers Guild Handbook
  </a>

  page.
</p>
```

---

# Block level links

As mentioned before, you can turn just about any content into a link, even block level elements. If you had an image you wanted to turn into a link, you could just put the image between <a></a> tags.

```html
<a href="https://suncoast.io/handbook">
  <img
    src="https://suncoast.io/brand/bouy.png"
    alt="Suncoast Developers Guild Bouy logo"
  />
</a>
```

---

# E-mail links

It is possible to create links or buttons that, when clicked, open a new outgoing email message rather than linking to a resource or page. This is done using the `<a>` element and the `mailto:` URL scheme.

```html
<p>
  You may <a href="mailto:person@suncoast.io">contact us</a> with questions.
</p>
```

---

# Images

A common element on a web page is an image. Given that their exchange rate is equal to one thousand words, they can be an important aspect of any page design.

---

[.autoscale: true]

# img tag

So for example, if your image is called dinosaur.jpg, and it sits in the same directory as your HTML page, you could embed the image like so:

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

---

# Void Element

Notice that the `img` tag is not:

```
<img src="images/dinosaur.jpg"></img>
```

But it is a single element that opens and closes on its own.

This is known as a `void element`; the element does not have a content area and thus _self closes_

---

# Alternative text

The next attribute we'll look at is `alt`. Its value is supposed to be a textual description of the image, for use in situations where the image cannot be seen/displayed or takes a long time to render because of a slow internet connection. For example, our above code could be modified like so:

```html
<img
  src="images/dinosaur.jpg"
  alt="The head and torso of a dinosaur skeleton;
          it has a large head with long sharp teeth"
/>
```

---

# [fit] Live Code Time
