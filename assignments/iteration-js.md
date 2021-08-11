---
title: Iteration in TypeScript
tags: ['typescript', 'enumeration']
---

## Objectives

- After completing this assignment, you should be able to:
  - Demonstrate understanding of iteration/enumeration

## Instructions

1. Fork [this repository](https://github.com/suncoast-devs/ts-iteration) to your own account.
2. Change into your projects directory:
3. Clone your repository: `hub clone ts-iteration`
4. Change into your project's directory: `cd ts-iteration`
5. Install the dependencies: `npm install`
6. Open in your editor: `code .`
7. Start the test runner: `npm test`
8. In VS Code, open the file: `src/functions.ts` and work on functions until tests pass.
9. Commit and push your work to GitHub.

## Explorer Mode

- As you write each function and make them pass the `npm test` screen will show your progress.
- Work until all the tests are passing

## Epic Mode

- Using the `forEach` looping method and no other looping or enumeration helper, write your **own version** of the following methods, except name yours `_map`,
  `_filter`, etc.

  - Your method must accept an array and a callback function.
  - Example for your `_map`:

  ```typescript
  const numbers = [1, 2, 3, 4, 5]

  const doubled = _map(numbers, function (number) {
    return number * 2
  })
  // doubled needs to be [2,4,6,8,10]

  const increased = _map(numbers, function (number) {
    return number + 2
  })
  // increased needs to be [2,3,4,5,6]
  ```

  - `map`
  - `filter`
  - `reduce`
  - `every`
  - `some`

- Write some example usage of your new methods to demonstrate that they work

## Additional Resources

Reference the documentation on DevDocs to find what kind of helpful functions
might already be in TypeScript.

- [String Functions on DevDocs](https://devdocs.io/javascript/global_objects/string).
- [Array Functions on DevDocs](http://devdocs.io/javascript/global_objects/array).
