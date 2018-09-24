---
title: Introduction to JS
draft: true
---

## [Introduction to JS](https://www.youtube.com/watch?v=Z-Q_c2wg2w8&t=2651s&list=PLWwthP6_aKmdxLKyXwDh0XXEgsWarTEpI&index=7)

### [What is JS](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript)
- Designed by Brendan Eich

### How does this compare to what we know

- There are 3 ways to run JS
  - Browser based JS: Loaded into a browser (Primarily what we are referring to)
  - Backend JS: JS that runs on Backend such as Node
  - JS that runs on the computer such as code that is powering app-app

### How to run JS in Browser

- HTML script tag
- file: Link to separate JS file

## Basic JS topics

- Google Chrome Tool -- `inspect`
  - console tab: You can type live JS code into a browser and the browser executes
  - source tab

### Console

- .log
  ```
  console.log('Hello World')

  ```

### Variables

- [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) & [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
- warn about var
- basic scoping
- [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
  (approx 00:35:20)
  - ordered list of collection of data
  - index starts at `0`
  - values are separated by commas
  - different types of values can be mixed in an array
  - use `push` to add a value to an array
  - use `pop` to remove the last index of an array
  - use `shift` to remove the first index of an array

  ```
  let instructors = ["Jason", "Toni", "Gavin", "Mark"]
  instructors.push("Joebob")
  instructors
  ["Jason", "Toni", "Gavin", "Mark", "Joebob"]

  instructors.pop()
  instructors
  ["Jason", "Toni", "Gavin", "Mark"]

  instructors.shift()
  instructors
  ["Toni", "Gavin", "Mark"]

  ```

### "types"

- numbers
  - basic math

- strings
  - use either single or double quote: `'string of characters'` or `"string of characters"`
  - concat: strings and numbers can be concatenated together in JS
    ```
    let name = "Gavin"
    let favoriteNumber = 42
    let sentence = name + ' favorite number is ' + favoriteNumber
    sentence
    -> "Gavin favorite number is 42"
    ```
  - use escape character - backslash `\` to use a single quote inside of singe quotes `''` or use double quotes

      ```
      let sentence = name + '\'s favorite number is ' + favoriteNumber
      newSentence
      -> "Gavin's favoriteNumber is 42"
      ```
      or
      ```
      let sentence = name + "'s favorite number is " + favoriteNumber
      newSentence
      -> "Gavin's favoriteNumber is 42"
      ```

- interpolation
    - use of backquote ` `` `: What is inside of `${}` within backquote gets evaluated

      ```
      let newSentence = `${name} favoriteNumber is ${favoriteNumber}`
      newSentence
      -> "Gavin favoriteNumber is 42"
      ```
      ```
      let newSentence = `${name} favoriteNumber is ${favoriteNumber * 2} or ${favoriteNumber * 3}`
      newSentence
      -> "Gavin favoriteNumber is 84 or 14"
      ```

## functions

- named
- anonymous

### Events

- what is an event
- listening for events
- attaching code to events

### What is the DOM (Document Object Model)
(approx 00:45:00)
- DOM: Browser's representation of your webpage in memory
- document - variable that is given by web page browser's JavaScript environment
- selectors
  - querying selectors

        ```
        document.querySelector('hi')
        -> <h1>Hello World</h1>
        ```
      - selects the very first `h1` element from document and returns it

        ```
        let header = document.querySelector('h1')
        header
        -> <h1>Hello World</h1>
        ```
        - given that there are 3 `hi` elements in the example document, to select all the `h1` elements from document

        ```
        let allOurFirstDOM = document.querySelectorAll('hi')
        allOurFirstDOM
        -> NodeList(3) [h1,h1,h1]
        ```
      [`NodeList`](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) is an array like list that browser gives us to represent collection of nodes.

        - querySelector only select elements what are above script tag -`<script></script>`

- Updating (approx 00:53:00)


## DEMO: a simple "how many times have your clicked this button"
