---
title: Hello, React
---

# React

> <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K" alt="" width="40px" style="display: inline; margin-right: 0.5rem"/>
> A JavaScript library for building user interfaces

React is the primary front end library/framework we will focus on for this
course.

It was developed by Facebook around 2011/2012 and was released as an
[open source](https://en.wikipedia.org/wiki/Open_source) project in 2013.

From React's Homepage:

> React makes it painless to create interactive UIs. Design simple views for
> each state in your application, and React will efficiently update and render
> just the right components when your data changes.

> Build encapsulated components that manage their state, then compose them to
> make complex UIs.

> We don’t make assumptions about the rest of your technology stack, so you can
> develop new features in React without rewriting existing code.

These are strong claims. Let's dive in and begin to see how React delivers on
these promises.

# Components

One of the main ideas of React is the concept of composing your web application
from components. A component in React is a combination of state and behavior
that serve to render elements to the DOM.

When learning HTML and CSS we decomposed our user interface into blocks and
groups of elements to organize and then style the content of the page. The same
is true of React Components. We can now also look at our pages as collections of
React Components. Each of these components can be reused which will help us
reduce code.

## Class versus Function components

We will begin by looking at `class` based React Components. In a future lesson,
we will be looking at `function` based components. These are the two current
ways to create React Components. `class` components were introduced first and
you will see most documentation relate to this style. However, the React team,
and the community as a whole, are migrating to `function` based components. SDG
will encourage you to use function components once we learn them. We'll start
with `class` components since they are where React started and where you'll find
the most documentation help.

## What does a Component look like

The two rules of a React component are:

- It must `extend React.Component`
- It must have a `render()` method that returns JSX
- The JSX that `render()` returns must consist of _exactly_ one main element,
  with other elements contained within. We'll see this more later.

## What is JSX?

JSX is an extension to JavaScript that allows us to an HTML-like syntax in our
JavaScript code that will be turned into DOM at run-time. By using JSX we can
dynamically generate content and use a [UI as state](lessons/js-ui-as-state)
style.

## Simplest React Component

```javascript
class HelloWorld extends React.Component {
  render() {
    return <div>Hello, World!</div>
  }
}
```

When this component is presented on the page it will render
`<div>Hello, World</div>`

## How does app-app help us use React Components?

React Components can represent the **entire** web page, or be mixed in with
static content of the page.

In the code we write with `app-app` we will use React to generate all of the
content on the page via components. React is very powerful for this but it is
good to know that you can also add a small component to an existing non-React
project just as easily.

The template SDG uses from `app-app` will generate an `index.html` file that
looks like the following (only the `<body>` is shown and only the relevant
parts)

```html
<body>
  <div id="root"></div>
</body>
```

If we rendered this without JavaScript it would be an empty page. It is thus up
to JavaScript to connect our React code to our HTML.

In our SDG template from `app-app` we include an `index.js` -- this script loads
React and a component we provide named `App`

```js
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))
```

React connects an existing `DOM` element to a component with the `ReactDOM`
method. Here we state that the element with the `id` of `root` will be replaced
with the component `App` that we `import` from the `App.jsx` file.

Typically we will not have to adjust the `index.html` or the `index.js` files.
We will start writing our code in our `App.jsx` file.

## JSX Files

You may have noticed that we define our React Components in files that end in
`.jsx` instead of `.js`. The `.jsx` extension allows our editors and our code
management tools to know we are using the `JSX` extensions. Browsers do not
understand `JSX` by default so a
[transpile](https://en.wikipedia.org/wiki/Source-to-source_compiler) step takes
place automatically. This step turns our `JSX` into plain `JavaScript` that a
browser **can** understand.

# Build a simple React application

Let's generate a new `app-app` project using the `gamma` stack that will set up
a new React project.

```shell
app-app --gamma ReactArticles
```

This is some sample HTML we will work to create and learn how React Components
can help simplify our code.

```html
<div class="all-main-content">
  <main>
    <article class="intro-article">
      <h2 className="article-title">SDG Announces Hackathon!</h2>
      <p>
        SDG announces the 2020 Summer Hackathon. Join us for an exciting weekend
      </p>
      <a class="read-more" href="#here">
        read more about SDG Announces Hackathon!
      </a>
    </article>

    <article class="intro-article">
      <h2 className="article-title">
        Student Graduation is Right Around the Corner
      </h2>
      <p>
        Our next cohort of students will be graduating in just over a week.
      </p>
      <a class="read-more" href="#here">
        read more about Student Graduation is Right Around the Corner
      </a>
    </article>
  </main>
</div>
```

## Start with `hard coded` content

Much like how we started with HTML, we want to get the content onto the page.
Let's open up our main component, the `App` component, and put this static
content on the page.

```javascript
import React, { Component } from 'react'

class App extends Component {
  render() {
    return (
      <div className="all-main-content">
        <main>
          <article className="intro-article">
            <h2 className="article-title">SDG Announces Hackathon!</h2>
            <p>
              SDG announces the 2020 Summer Hackathon. Join us for an exciting
              weekend
            </p>
            <a className="read-more" href="#here">
              read more about SDG Announces Hackathon!
            </a>
          </article>

          <article className="intro-article">
            <h2 className="article-title">
              Student Graduation is Right Around the Corner
            </h2>
            <p>
              Our next cohort of students will be graduating in just over a
              week.
            </p>
            <a className="read-more" href="#here">
              read more about Student Graduation is Right Around the Corner
            </a>
          </article>
        </main>
      </div>
    )
  }
}

export default App
```

## `class` versus `className`

You may have noticed we used `className=` everywhere in the code instead of
`class=`. This is because `JSX` uses the `DOM` names for properties whereas
`HTML` uses a more generic name. In the `DOM` it is the `className` property
that `class=` becomes. So we will be using `className` for our class names in
JSX.

Don't worry, our `console` will warn us of these types of errors when we make
them.

## Some CSS to help

Let's use this CSS to make the app look better

```css
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');

:root {
  font: 16px / 1 sans-serif;
}

html {
  height: 100%;
}

body {
  font-family: 'Open Sans', sans-serif;

  margin: 0;
  min-height: 100%;
  background-color: #f7f0da;
  color: #2f3737;
}

article {
  max-width: 20rem;
  padding: 1rem 3rem;
  font-size: 0.8rem;
}

article .read-more {
  font-size: 0.6rem;
}

article h2 {
  font-size: 1.5rem;
  color: #5a9090;
}

main {
  display: flex;
  flex-wrap: wrap;
}

.read-more {
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 800;
  text-decoration: none;
}
```

## Load this in the browser

We should see our two articles displayed.

## Extracting common code into a "component"

Looking at our code we have two `<article>` elements that have the same
structure. It would be nice to have one place in the code where we could define
this structure and use code to dynamically create them with the correct
customization.

Let's start that process.

## Creating a `NewsArticle` component.

Let's create a new file in the `components` directory and name it
`NewsArticle.jsx`

We'll add this as the first line:

```javascript
import React from 'react'
```

This line tells the script we are going to use `React` and it activates the
`JSX` template process.

Next, we will make our component:

```javascript
export class NewsArticle extends React.Component {}
```

the `export` at the beginning of that line, tells JavaScript we wish to share
this class outside of the file. We'll use that fact in just a moment.

And we will ensure it has a `render()` method.

```javascript
export class NewsArticle extends React.Component {
  render() {
    return <div>Something</div>
  }
}
```

Now let's see if we have a working component.

## Using our new `NewsArticle` from the `App`

Returning to our `App.jsx` we can bring in this component to use. At the top,
and at the end of the list of `import` we will add

```javascript
import { NewsArticle } from './components/NewsArticle'
```

This line tells JavaScript we wish to use the `NewsArticle` class in this code,
and that it can be found in the file `NewsArticle.jsx` in the `components`
folder. Notice we do not add the extension. The `import` system is smart and can
tell we mean the `jsx` version. If there were multiple files with the same
extension we'd have to be more clear.

Finally, we can add this element to our `render()` method. Let's insert it right
inside the `<main>`

```html
<main>
  <NewsArticle />
</main>
```

When reloading the browser we should see the `<div>Something</div>` in our
content.

This means our `NewsArticle` component is rendering itself.

## Composition

This is the idea of `composition` -- we are now defining a component, that has
it's own content, that we can embed into another component, in this case the
`App`.

## Update the `NewsArticle`

Let's take one example of the news article we have and make it the `render`
method's JSX.

```javascript
import React from 'react'

export class NewsArticle extends React.Component {
  render() {
    return (
      <article className="intro-article">
        <h2 className="article-title">
          Student Graduation is Right Around the Corner
        </h2>
        <p>
          Our next cohort of students will be graduating in just over a week.
        </p>
        <a className="read-more" href="#here">
          read more about Student Graduation is Right Around the Corner
        </a>
      </article>
    )
  }
}
```

You should notice that our app now has **THREE** articles. The first comes from
our `<NewsArticle/>` and the other two from the hardcoded elements.

Let's remove the other two hardcoded `<article>`s leaving only our
`<NewsArticle/>`

```javascript
import React, { Component } from 'react'
import { NewsArticle } from './components/NewsArticle'

class App extends Component {
  render() {
    return (
      <div className="all-main-content">
        <main>
          <NewsArticle />
        </main>
      </div>
    )
  }
}

export default App
```

We should only see one article listed. If we repeat the `<NewsArticle/>` we can
have as many of the `<article>` structure as we want.

```javascript
import React, { Component } from 'react'
import { NewsArticle } from './components/NewsArticle'

class App extends Component {
  render() {
    return (
      <div className="all-main-content">
        <main>
          <NewsArticle />
          <NewsArticle />
          <NewsArticle />
          <NewsArticle />
        </main>
      </div>
    )
  }
}

export default App
```

This makes the article _reusable_. However, it is not yet customizable. It would
be nice to specify a different title and body for each article. Luckily there is
a way to do that!

## Component properties: props

We can add properties to our components by specifying them in a very similar way
we would for regular HTML elements.

```html
<NewsArticle
  title="SDG Announces Hackathon!"
  body="SDG announces the 2020 Summer Hackathon. Join us for an exciting weekend"
/>
<NewsArticle
  title="Student Graduation is Right Around the Corner"
  body="Our next cohort of students will be graduating in just over a week."
/>
<NewsArticle
  title="SDG Standardizes on React"
  body="React is the best library for learning front end Web"
/>
```

Here we are asking to render three `<NewsArticle/>` components and provide each
a different set of `properties` or in React terms: `props`

This is great, however, our `<NewsArticle>` still shows the hardcoded data.

## Using props in a component

When React places our component on the page and calls the `render()` method to
generate the elements, it makes the supplied `props` available in a variable
named `this.props` -- the `this.props` is an object whose keys are the names of
the properties. In our case this is `this.props.title` and `this.props.body` --
the corresponding values are supplied as well.

We can use these in our component by using an _interpolation_ method within JSX.
This is much like string interpolation in plain JavaScript but the syntax is
slightly different:

```javascript
import React from 'react'

export class NewsArticle extends React.Component {
  render() {
    return (
      <article className="intro-article">
        <h2 className="article-title">{this.props.title}</h2>
        <p>{this.props.body}</p>
        <a className="read-more" href="#here">
          read more about {this.props.title}
        </a>
      </article>
    )
  }
}
```

Now when each of these components is rendered on the page, the unique values for
`this.props` are available and we now have a component that is:

- **reusable**
- **customizable**

# Driving our application from data

This is great, and we have an application that can render any number of articles
we want. However, we still must manually code these in our main application.

```javascript
import React, { Component } from 'react'
import { NewsArticle } from './components/NewsArticle'

class App extends Component {
  render() {
    return (
      <div className="all-main-content">
        <main>
          <NewsArticle
            title="sdg announces hackathon!"
            body="sdg announces the 2020 summer hackathon. join us for an exciting weekend"
          />
          <NewsArticle
            title="student graduation is right around the corner"
            body="our next cohort of students will be graduating in just over a week."
          />
          <NewsArticle
            title="sdg standardizes on react"
            body="reactjs is the best library for learning front end web"
          />
        </main>
      </div>
    )
  }
}

export default App
```

It would be nice to render this from the data.

## Importing JSON data

Let's start by making a JSON file named `articles.json` in the directory along
with `App.jsx` -- In this file, we will describe, in JSON, an array of articles
we want to render. We will also give each article an `id` as if it came from an
API since that is likely the most common case for where this data will
eventually come from.

```json
[
  {
    "id": 42,
    "title": "SDG Announces Hackathon!",
    "body": "SDG announces the 2020 Summer Hackathon. Join us for an exciting weekend"
  },
  {
    "id": 99,
    "title": "Student Graduation is Right Around the Corner",
    "body": "Our next cohort of students will be graduating in just over a week."
  },
  {
    "id": 100,
    "title": "SDG Standardizes on React",
    "body": "React is the best library for learning front end Web"
  },
  {
    "id": 101,
    "title": "This data comes from JSON!",
    "body": "React works with data using tools we already know!"
  }
]
```

We will be using this in our `App.jsx` so let's import it!

```javascript
import React, { Component } from 'react'
import { NewsArticle } from './components/NewsArticle'
import articles from './articles'

class App extends Component {
  render() {
    return (
      <div className="all-main-content">
        <main>
          <NewsArticle
            title="sdg announces hackathon!"
            body="sdg announces the 2020 summer hackathon. join us for an exciting weekend"
          />
          <NewsArticle
            title="student graduation is right around the corner"
            body="our next cohort of students will be graduating in just over a week."
          />
          <NewsArticle
            title="sdg standardizes on react"
            body="reactjs is the best library for learning front end web"
          />
        </main>
      </div>
    )
  }
}

export default App
```

The line `import articles from './articles'` will read the JSON file and make
its contents available as the variable `articles`! No parsing required! This is
because the environment comes with a **`loader`** for JSON files and it knows
how to read and parse them for us!

Let's use that data to build up an array of `<NewsArtcle/>` components.

## Transforming data into components

Since we want one `<NewsArticle/>` that is related to each element of the
`articles` array, we will bring out our friend `map`

```javascript
import React, { Component } from 'react'
import { NewsArticle } from './components/NewsArticle'
import articles from './articles'

class App extends Component {
  render() {
    const newsArticlesFromData = articles.map(article => (
      <NewsArticle title={article.title} body={article.body} />
    ))

    return (
      <div className="all-main-content">
        <main>
          <NewsArticle
            title="sdg announces hackathon!"
            body="sdg announces the 2020 summer hackathon. join us for an exciting weekend"
          />
          <NewsArticle
            title="student graduation is right around the corner"
            body="our next cohort of students will be graduating in just over a week."
          />
          <NewsArticle
            title="sdg standardizes on react"
            body="reactjs is the best library for learning front end web"
          />
        </main>
      </div>
    )
  }
}

export default App
```

## Breaking it down

Let's examine this critical line of code:

```javascript
const newsArticlesFromData = articles.map(article => (
  <NewsArticle title={article.title} body={article.body} />
))
```

In our [lesson on JavaScript iteration](/lessons/js-iteration] we can
demonstrated that `map` can turn an array of one type of element (say a
JavaScript object in this case) into an array of another type of element,
(<NewsArticle/> in this case)

So what is happening here is a transformation from the first array to the
second.

> NOTE: We shortened the strings for formatting purposes only

<div style="display: flex; max-width: 5rem; margin: 0; padding: 0">

```json
[
  {
    "id": 42,
    "title": "SDG Announces ...",
    "body": "SDG announces ..."
  },
  {
    "id": 99,
    "title": "Student Graduation ...",
    "body": "Our next cohort ..."
  },
  {
    "id": 100,
    "title": "SDG Standardizes ...",
    "body": "React is the ..."
  },
  {
    "id": 101,
    "title": "This data ...",
    "body": "React works ..."
  }
]
```

<!-- prettier-ignore -->
```javascript
[
  <NewsArticle title="SDG Announces ..." body="SDG announces ..." />,
  <NewsArticle title="Student Graduation ..." body="Our next cohort ..." />,
  <NewsArticle title="SDG Standardizes ..." body="React is the ..." />,
  <NewsArticle title="This data ..." body="React works ..." />,
]
```

</div>

Since we now have an array of the `<NewsArticle/>` we can simply place them
where we want them in place of the hardcoded data.

```javascript
import React, { Component } from 'react'
import { NewsArticle } from './components/NewsArticle'
import articles from './articles'

class App extends Component {
  render() {
    const newsArticlesFromData = articles.map(article => (
      <NewsArticle title={article.title} body={article.body} />
    ))

    return (
      <div className="all-main-content">
        <main>{newsArticlesFromData}</main>
      </div>
    )
  }
}

export default App
```

> NOTE: We don't even have to do anything special with the array to get it to
> output since JSX already knows how to deal with arrays, it just outputs each
> element as if we had hardcoded it.

There is one other thing we need to do. If you look in your console you will see
a message about each element needing a `key`. There is another React rule that
is important to know.

> RULE: Each component that is rendered dynamically from an array of data must
> have a unique `key`. That `key` must only be unique for that array of data.
> (i.e. that same key can be in another array-to-component map in another part
> of the app, but must be unique for this array)

Well, now it is handy that we had that `id` attribute of our JSON objects! We
will us that `id` as out key!

```javascript
import React, { Component } from 'react'
import { NewsArticle } from './components/NewsArticle'
import articles from './articles'

class App extends Component {
  render() {
    const newsArticlesFromData = articles.map(article => (
      <NewsArticle key={article.id} title={article.title} body={article.body} />
    ))

    return (
      <div className="all-main-content">
        <main>{newsArticlesFromData}</main>
      </div>
    )
  }
}

export default App
```

The `key` prop is a special property and is used by React only. We don't use it
with our `NewsArticle` component. In a later lesson, we will learn why this
`key` is so important.

## Conclusion

We now have an application that allows us to add more articles to this listing.
If we add new data to our `JSON` file and reload the application it _reacts_ to
the new data by rendering more information.

In the following lessons, we will learn how to load data from a remote API, how
to respond to events, how to update data dynamically, and how to add different
"pages" to our application and give it the ability to navigate between them.
