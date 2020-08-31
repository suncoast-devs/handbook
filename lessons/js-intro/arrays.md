---
title: Arrays
order: 8
---

An array is an ordered set of values that you refer to with a name and an index.
For example, you could have an array called `employees` that contains employees'
names indexed by their numerical employee number. So `employee[1]` would be
employee number one, `employee[2]` employee number two, and so on.

## Creating Arrays

The following statements create equivalent arrays:

```javascript
let array = new Array(element0, element1, ..., elementN);
let array = Array(element0, element1, ..., elementN);
let array = [element0, element1, ..., elementN];
```

`element0, element1, ..., elementN` is a list of values for the array's
elements. When these values are specified, the array is initialized with them as
the array's elements. The array's length property is set to the number of
arguments.

The bracket syntax is called an "array literal" or "array initializer." It's
shorter than other forms of array creation, and so is generally preferred.

To create an array with non-zero length, but without any items, either of the
following can be used:

```javascript
let array = new Array(arrayLength)
let array = Array(arrayLength)

// This has exactly the same effect
let array = []
array.length = arrayLength
```

## Populating an array

You can populate an array by assigning values to its elements. For example,

```javascript
let employees = []
employees[0] = 'Casey Jones'
employees[1] = 'Phil Lesh'
employees[2] = 'August West'
```

You can also populate an array when you create it:

```javascript
let myArray = new Array('Hello', myVar, 3.14159)
let myArray = ['Mango', 'Apple', 'Orange']
```

## Referring to array elements

You refer to an array's elements by using the element's ordinal number. For
example, suppose you define the following array:

```javascript
let myArray = ['Wind', 'Rain', 'Fire']
```

You then refer to the first element of the array as `myArray[0]` and the second
element of the array as `myArray[1]`.

> The index of the elements begins with zero.

## Iterating over Arrays

A common operation is to iterate over the values of an array, processing each
one in some way. The simplest way to do this is as follows:

```javascript
let colors = ['red', 'green', 'blue']
for (let index = 0; index < colors.length; index++) {
  console.log(colors[index])
}
```

The `forEach()` method provides another way of iterating over an array:

```javascript
let colors = ['red', 'green', 'blue']
colors.forEach(function (color) {
  console.log(color)
})
```

Alternatively, You can shorten the code for the forEach parameter with Arrow
Functions:

```javascript
let colors = ['red', 'green', 'blue']
colors.forEach(color => console.log(color))
```

> This syntax is more compact, doesn't require maintaining an `index`, and is
> very much like syntax we will use when discussing front-end frameworks. Thus,
> at SDG, we will prefer this way to iterate over arrays.

Notice that we do not have an index. If we **do** want an index we can add that
as a second argument in our arrow function

```javascript
let colors = ['red', 'green', 'blue']
colors.forEach((color, index) =>
  console.log(`The color at position ${index} is ${color}`)
)
```

For more details on how to manipulate arrays, including adding and removing
elements, see the
[quick reference guide](lesson://misc-quick-reference/js-arrays) on arrays.
