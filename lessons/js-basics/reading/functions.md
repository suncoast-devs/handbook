import CodePen from '@handbook/CodePen'

# Functions

Functions are one of the fundamental building blocks in JavaScript. A function is a JavaScript procedure - a set of statements that performs a task or calculates a value. To use a function, you must define it somewhere in the scope from which you wish to call it.

## Defining functions

A function definition (also called a function declaration, or function statement) consists of the `function` keyword, followed by:

- The name of the function.
- A list of parameters to the function, enclosed in parentheses and separated by commas.
- The JavaScript statements that define the function, enclosed in curly brackets, `{ }`.

For example, the following code defines a simple function named square:

```js
function square(number) {
  return number * number
}
```

The function `square` takes one parameter, called `number`. The function consists of one statement that says to return the parameter of the function (that is, number) multiplied by itself. The statement `return` specifies the value returned by the function:

## Calling functions

Defining a function does not execute it. Defining the function simply names the function and specifies what to do when the function is called. Calling the function actually performs the specified actions with the indicated parameters. For example, if you define the function square, you could call it as follows:

```js
square(5)
```

The preceding statement calls the function with an argument of 5. The function executes its statements and returns the value 25.

## Function expressions

While the function declaration above is syntactically a statement, functions can also be created by a `function expression`. Such a function can be **anonymous**; it does not have to have a name. For example, the function square could have been defined as:

```js
let square = function(number) {
  return number * number
}
let x = square(4) // x gets the value 16
```

## Functions are values of variables

Notice in the example above that we can assign a function to a variable just like we assign a `number` or a `string` or any other kind of value.

In fact, in JavaScript, functions are values themselves and can be passed to functions just like any other value.

```js
function printIt(array, func) {
  for (let index = 0; index < array.length; index++) {
    const value = array[index]
    const result = func(value)

    console.log(`After the function we turned ${value} into ${result}`)
  }
}

const square = function(number) {
  return number * number
}

const double = function(number) {
  return number * 2
}

const numbers = [1, 2, 3, 4, 5]
printIt(numbers, square)
// After the function we turned 1 into 1
// After the function we turned 2 into 4
// After the function we turned 3 into 9
// After the function we turned 4 into 16
// After the function we turned 5 into 25
printIt(numbers, double)
// After the function we turned 1 into 2
// After the function we turned 2 into 4
// After the function we turned 3 into 6
// After the function we turned 4 into 8
// After the function we turned 5 into 10
```

> Passing functions as arguments to other functions is a very powerful pattern in JavaScript. We will be using this ability quite a bit in other lessons.

> Allowing functions to be treated as values for variables and to be passed as arguments is one of the things that makes JavaScript a **functional**-style language.

## Scope

Variables defined inside a function cannot be accessed from anywhere outside the function, because the variable is defined only in the scope of the function. However, a function can access all variables and functions defined inside the scope in which it is defined. In other words, a function defined in the global scope can access all variables defined in the global scope. A function defined inside another function can also access all variables defined in its parent function and any other variable to which the parent function has access.

example:

```js
const PI = 3.14
const numbers = [1, 2, 4, 8, 16]

function pies() {
  // Inside this function we can "see" the variables `PI` and `numbers`
  // because we are *INSIDE* the scope where they were defined
  for (let index = 0; index < numbers.length; index++) {
    const number = numbers[index]

    const area = PI * number * number

    console.log(`The area of a circle with radius ${number} is ${area}`)
  }

  // Here we *cannot* see the variable `area` since we are *OUTSIDE* the scope
  // where it was defined.
}
```

> This will also come in helpful in other lessons

> This ability in JavaScript is possible since functions are considered `closures.` Closures are an advanced, but [interesting topic](<https://en.wikipedia.org/wiki/Closure_(computer_programming)>)

## Arrow functions

An arrow function expression has a shorter syntax compared to function expressions and are always anonymous.

Two factors influenced the introduction of arrow functions: shorter functions and non-binding of this.

**Shorter functions**

In some functional patterns, shorter functions are welcome. Compare:

```
let elements = [
  'Hydrogen',
  'Helium',
  'Lithium',
  'Beryllium'
]

let elementLengths1 = elements.map(function(element) { return element.length; })

console.log(elementLengths1) // logs [8, 6, 7, 9]

let elementLengths2 = elements.map(element => element.length)

console.log(elementLengths2); // logs [8, 6, 7, 9]
```

The code for `elementLengths2` is shorter and has less code that we refer to as _ceremony_, that is, syntax that isn't absolutely necessary.

There are some other considerations where arrow functions are better and we will cover those in another lesson.

> For now we'll prefer arrow functions over traditional function definitions.

---

import Nav from './Nav'

<Nav/>
