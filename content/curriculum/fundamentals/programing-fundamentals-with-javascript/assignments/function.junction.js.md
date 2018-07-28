# Title

# Function Junction

## Objectives

After completing this assignment, you should be able to:

* Demonstrate understanding of types, functions, argument-handling, loops, and conditional statements

## Instructions

1. Fork [this repository](https://github.com/mdewey/function-junction) to your own account.
2. Change into your training directory
3. Clone your repository: `hub clone function-junction`
4. Change into your project's directory: `cd function-junction`
5. Install the dependencies: `yarn install` (or just `yarn` for short)
6. Open in Code: `code .`
7. Start the test runner: `yarn test`
7. Open `src/functions.test.js` and work on functions until tests pass.
8. Commit and push your work to GitHub.
9. Turn in the URL to your GitHub repo.

## Explorer Mode

- All tests passing
- No linter warnings
- Turn in the homework using the URL to your repository on Github.

## Adventure Mode

- If you used "built-in" JavaScript methods like `String.reverse()` or `Array.max()` to solve these problems, try implementing them from scratch.
- Vice-versa: if you implemented your solutions from scratch, look in the documentation linked below to see if JavaScript has any built-in functions to help solve these problems.

## Epic Mode

- Expand the `sum` and `max` functions to take arrays instead of numbers and update the tests so they pass
- Create your own simple functions with tests
- Anytime in your code that you used a `for` loop or a `while` loop, convert it to use a `map`, `filter` or `reduce`

## Additional Resources

Reference the documentation on MDN to find what kind of helpful functions might already be on `Array` and `String` in JavaScript.

- [String Functions on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).
- [Array Functions on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

## Turning In

Your homework will be assigned to you via `issues` on your `assignments` repository. Once you are

These steps will be followed for almost every assignment going forward. Once you've completed at least _explorer_ mode and you're satisfied with your work, let's get it published. First let's get it up on GitHub.

- First, let's add all our work to git, and ask it to commit it:

  ```sh
  git add .
  git commit -m "My first webpage"
  ```

  Feel free to replace _"My first webpage"_ with a more meaningful message.

- Push our local commits to GitHub:

  ```sh
  git push -u origin master
  ```

  The `-u` option tells git we want to making pushing the `master` branch to `origin` the default, so next time, we can just type `git push`.

- Now that our source code is up on GitHub, let's publish our page to [Surge](https://surge.sh). The command to do this has already been setup for you:

  ```sh
  yarn deploy
  ```

Once you are completely, go to the issue on our `assignments` repository, leave the link the repo of your work, and close the issue. I will not know you are down until you close the issue. 



