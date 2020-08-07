---
title: Iteration in JavaScript
tags: ['javascript', 'enumeration']
---

## Objectives

- After completing this assignment, you should be able to:
  - Demonstrate understanding of iteration/enumeration

## Instructions

1. Fork [this repository](https://github.com/suncoast-devs/js-iteration) to your own account.
2. Change into your projects directory:
3. Clone your repository: `hub clone js-iteration`
4. Change into your project's directory: `cd js-iteration`
5. Install the dependencies: `npm install`
6. Open in your editor: `code .`
7. Start the test runner: `npm test`
8. Open `src/functions.test.js` and work on functions until tests pass.
9. Commit and push your work to GitHub.
10. Turn in the URL to your GitHub repo.

## Explorer Mode

- All tests passing

## Epic Mode

- Using the `forEach` looping method and no other looping or enumeration helper, write your **own version** of the following methods, except name yours `_map`,
  `_filter`, etc.

  - Your method must accept an array and a callback function.
  - Example for your `_map`:

  ```js
  const numbers = [1, 2, 3, 4, 5]

  const doubled = _map(numbers, function (number) {
    return number * 2
  })
  // doubled needs to be [2,4,6,8,10]

  const increased = _map(numbers, function (number) {
    return number + 2
  })
  // increated needs to be [2,3,4,5,6]
  ```

  - `map`
  - `filter`
  - `reduce`
  - `every`
  - `some`

- Write some example usage of your new methods to demonstrate that they work

## Additional Resources

Reference the documentation on DevDocs to find what kind of helpful functions
might already be in JavaScript.

- [String Functions on DevDocs](https://devdocs.io/javascript/global_objects/string).
- [Array Functions on DevDocs](http://devdocs.io/javascript/global_objects/array).
