---
title: Hello, React
---

This covers the basic intro to the Reactjs.

## Learning Objectives

- what is react?
- how to run a react app
- learning about react components
- creating using JSX to create HTML in React

## Day One - Hello, react

- react name origin: reacts to its environment
- create-react-app (ADD TIME)

  - tool built by developers at Facebook to help you build React applications.
  - It saves you from time-consuming setup and configuration. Simply run
    create-react-app command to create and start a new react project.
  - `create-react-app name-of-your-app`
  - `npm install` then `npm start`
  - `localhost:3000` (browser)

- [Components](https://reactjs.org/docs/glossary.html#components)
  - React components are small, reusable pieces of code that return a React
    element to be rendered to the page
- Props
  - attribute of a component
  - Most components can be customized when they are created, with different
    parameters. These creation parameters are called props.
- Rendering multiple components (i.e. map)
  - render method renders only one DOM element
  - DOM element can have as many children as it wants
- `import React, { Component } from "react";` this boilerplate almost always
  goes on top of every react component

- [react-article-demo](https://github.com/suncoast-devs/cohort-xi/tree/master/week-04/day-1/reactive-articles)
  (approx 00:39:35)

  ```javascript
  // all the files needed need to be imported
  import React, { Component } from 'react'
  import './App.css'
  // import Header component from Header.js in current directory ("./" => current directory)
  import Header from './Header'
  // import Header component from Articles.js in current directory
  import Header from './Articles'
  // import Header component from Footer.js in current directory
  import Header from './Footer'

  class App extends Component {
    render() {
      return (
        // DOM element
        <div>
          // children components of DOM element // these components need to
          exist, either within the same page or as separate files and imported
          to the page
          <Header />
          <Articles />
          <Footer />
        </div>
      )
    }
  }

  // component needs to be exported so it can be available for other components to import
  export default App
  ```

- to add class, use `className` (approx 01:05:20)

  - `<div className="all-main-content"> ... </div>`

- [Props](https://reactjs.org/docs/components-and-props.html) (approx 01:12:10)

  ```javascript
  import React, { Component } from 'react'
  // import Article component from Article in current directory
  import Article from './Article'

  class Articles extends Component {
    render() {
      return (
        <div className="all-main-content">
          <main>
            <Article
              title="Gavin can't spell Artclie"
              content="Gavin can't type on a monday. Thats why. He also went to a party last night"
            />
            <Article
              title="What is wrong with Gavin"
              content="Gavin is tired this morning"
            />
            <Article
              title="Sending Gavin back to school"
              content="If you pay, he will go"
            />
            <Article title="React is cool" content="Hell yeah it is" />
          </main>
        </div>
      )
    }
  }

  export default Articles
  ```

  - Article.js

    - `this.props.title` will render out each title property in Articles
      component ("Gavin can't spell Article", "What is wrong with Gavin",
      "Sending Gavin back to school", "React is cool" )
    - `this.props.content` will render out each content property in Articles
      component as `this.props.title` did with title property
    - You can create unlimited different articles using Article component

    ```javascript
    import React, { Component } from 'react'

    class Article extends Component {
      render() {
        console.log(this.props)

        return (
          <article className="intro-article">
            <h2 className="article-title">{this.props.title}</h2>
            <p>{this.props.content}</p>
            <a className="read-more" href="#">
              read more about {this.props.title}
            </a>
            <div className="read-more-underline" />
          </article>
        )
      }
    }

    export default Article
    ```

- Loading Props data from somewhere else (approx 01:24:00)

  ```javascript
  import React, { Component } from "react";
  import Article from "./Article";

  class Articles extends Component {
    render() {
      const data = [
        {
          title: "Gavin can't spell Article",
          content:
             "Gavin can't type on a Monday . That's why. He went to a party last night"
        },
        {
          title: "What is wrong with Gavin",
          content: "Gavin is tired this morning"
        }
      ];

      // use map to iterate through each data
      return (
        <div className="all-main-content">
          <main>
            {data.map(element => {
              return <Article title={element.title} content={element.content} />}
              })}
          </main>
        </div>
      );
    }
  }

  export default Articles;
  ```

- [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#Descriptionreview)
  review (approx 1:32:25)

  - The map() method creates a new array with the results of calling a provided
    function on every element in the calling array.

  ```javascript
    data = [
      {
        title: "Gavin can't spell Article",
        content:
           "Gavin can't type on a Monday . That's why."
      },
      {
        title: "What is wrong with Gavin",
        content: "Gavin is tired this morning"
      }
    ]

    // element can be replaced with any string

    data.map(element => {
      return `Hello ${element.title} your content is ${element.content}`
      })

    // element -> tacoTuesday
    data.map(tacoTuesday => {
      return `Hello ${tacoTuesday.title} your content is ${tacoTuesday.content}`
      })

    // Both will return the same thing

  -> ['Hello Gavin can\'t spell Article your content is Gavin can\'t type on a Monday. That's why',
      'Hello What is wrong with Gavin your content is Gavin is tired this morning']
  ```

- eventually `Articles.js` code will look like this

  ```javascript
  import React, { Component } from 'react'
  import Article from './Article'

  class Articles extends Component {
    render() {
      const data = [
        {
          title: "Gavin can't spell Article",
          content:
            "Gavin can't type on a Monday . That's why. He went to a party last night",
        },
        {
          title: 'What is wrong with Gavin',
          content: 'Gavin is tired this morning',
        },
      ]

      // save new array in a variable and just refer to it in a DOM
      // (approx 1:39:10)
      const articles = data.map(element => {
        return <Article title={element.title} content={element.content} />
      })

      return (
        <div className="all-main-content">
          <main>{articles}</main>
        </div>
      )
    }
  }

  export default Articles
  ```

## React is declarative

(approx 1:42:00)

- React is declarative functional reactive style programming
  - Page will `react` to the data

## Today's work

- Class Demo: Adventure Time (Basic)
- Suggested Assignment Focusing on Components:
  [Reactified Octocats](/handbook/curriculum/front-end/react-i/assignments/reactified-octocats)
- Suggested Assignment:
  [Party Like it's 1989!](/handbook/curriculum/front-end/react-i/assignments/party-like-its-1989)
