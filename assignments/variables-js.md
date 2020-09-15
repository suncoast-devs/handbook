---
title: Variables, Variables, and Variables
tags: ['javascript', 'console']
---

# Let's get started

Today, we are starting our journey into JavaScript. For this assignment, you will be making a program that demonstrates some JavaScript fundamentals.

## Objectives

- Ensure your development environment is setup
- Practice creating variables
- Practice working with user input

## Requirements

Create your project using `app-app` with the `beta` stack

Remove all the code inside `main.js` and start with a fresh and empty file.

### Setup

```
app-app --beta VariablesJS
```

### Explorer Mode

- [ ] Create a new app that does the following.

  - Practice Creating Variables

    - Create a variable that stores the `numberOfCupsOfCoffee` that you drink every day.
    - Create a variable called `fullName` and set it equal to your full name.
    - Use `console.log` and your variables, `numberOfCupsOfCoffee` and `fullName` to output all three on one line.
    - Create an variable that stores an object. Make the properties of the object `fullName`, `luckyNumber` , and `favoriteMovies`. Where `fullname` is your full name, `luckyNumber` is a *number* value of your favorite number, and `favoriteMovies` is an array of strings of a few of your top movies. NOTE: Try doing this using object literal: `const aboutMe = {    }` and put the properties *inside*.

  - Practice Getting Input From the User

    - Using `window.prompt`, Ask the user for their name and store it in a variable named `userName`.
    - Use `console.log` to show a greeting to the user, using their name.

  - Converting String Input Into Numbers

    - Input two numbers from the user. Convert each resulting `string` from `window.prompt` to a `float` using [parseFloat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat). Save the first value in a variable named `firstOperand` and the second value in a variable named `secondOperand`.

  - Doing Math

    - Add the operand variables from above and save the results in a variable named `sum`.
    - Subtract the `secondOperand` variable from the `firstOperand` variable and save the results in a variable named `difference`.
    - Multiply the operand variables and save the results in a variable named `product`.
    - Divide the `firstOperand` by the `secondOperand` and save the results in a variable named `quotient`.
    - Find the remainder when one operand is divided by the other and save the results in a variable named `remainder`.
    - Use `console.log` to present the user, in a meaningful way, each of the values for the `sum`, `difference`, `quotient`, `product`, and `remainder` variables. (e.g. perhaps one of your outputs is similar to `If you add 4 and 5 you get 9` if `4` and `5` were the input)

  - Using Arrays

    - Use [this page](https://www.random.org/integers/?num=100&min=1&max=100&col=5&base=10&format=plain&rnd=new) to generate a array of random numbers. NOTE: That format isn't ready for JavaScript. In your editor you will need to format the collection of numbers as a JavaScript array.
    - Place these numbers into a properly formatted array named `numbers`.
    - Determine the following. Use JavaScripts `for` loops to your advantage.
      - Create an object called `statistics` with the following **properties**
        - In a property named `smallest`, put the smallest value in the array.
        - In a property named `largest`, put the largest value in the array.
        - In a property named `sum`, put the sum of all the values in the array.
        - In a property named `average`, put the average of all the values in the array.

### Adventure Mode

- Revisit your arrays. This time create new variables that represent:
  - `sumOfOdd` that contains the sum of all the odd numbers
  - `countOfEven` that contains the total count of all the even numbers
