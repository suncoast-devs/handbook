## What is HTML?

HTML (Hypertext Markup Language) is not a programming language; it is a markup language used to tell your browser how to structure the web pages you visit. It can be as complicated or as simple as the web developer wishes it to be. HTML consists of a series of elements, which you use to enclose, wrap, or mark up different parts of the content to make it appear or act a certain way. The enclosing tags can make a bit of content into a hyperlink to link to another page on the web, italicize words, and so on. For example, take the following line of content:

```html
My cat is very grumpy
```

<iframe src="https://codepen.io/gstark/full/QZPzaG/" height="400" width="400" style="border: 3px solid black"></iframe>

If we wanted the line to stand by itself, we could specify that it is a paragraph by enclosing it in a paragraph (`<p>`) element:

```html
<p>My cat is very grumpy</p>
```

<iframe src="https://codepen.io/gstark/full/YJMdOo/" height="400" width="400" style="border: 3px solid black"></iframe>

---

import pages from './pages'
import ReadingNav from '@handbook/ReadingNav'

<ReadingNav pages={pages}/>
