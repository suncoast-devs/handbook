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

```typescript
const array = new Array(element0, element1, ..., elementN);
const array = Array(element0, element1, ..., elementN);
const array = [element0, element1, ..., elementN];
```

The first two cases are challenging for TypeScript unless we define a type for
the array. For instance `const array = new Array('hello', 42)` will define an
array of `string` and convert the `42` to a string. However,
`const array = new Array(42, 'hello')` will be a TypeScript error. These are not
recommended approaches for creating arrays.

`element0, element1, ..., elementN` is a list of values for the array's
elements. When these values are specified, the array is initialized with them as
the array's elements. The array's length property is set to the number of
arguments.

The bracket syntax is called an "array literal" or "array initializer." It's
shorter than other forms of array creation, and so is generally preferred.

To create an array with non-zero length, but without any items, the following
can be used. Note we need to give the `array` variable a type since we have no
initial values.

```typescript
const array: number[] = []
array.length = arrayLength
```

## Populating an array

You can populate an array by assigning values to its elements. For example,

```typescript
const employees: string[] = []
employees[0] = 'Casey Jones'
employees[1] = 'Phil Lesh'
employees[2] = 'August West'
```

You might be surprised that we can change the values of the entries of an array
that is defined `const employees: string[] = []`. This is because the `const`
refers to the variable name `employees`, **not** to the _values_ inside the
array. What `const` prevents here is a statement such as
`employees = ['Peter', 'Paul', 'Mary']`

You **can** have an array variable that you can neither assign a new value,
**or** change the contents of:

```typescript
const cantChangeTheseValues: ReadonlyArray<number> = [42, 100, 52]

cantChangeTheseValues[0] = 1
```

## Referring to array elements

You refer to an array's elements by using the element's ordinal number. For
example, suppose you define the following array:

```typescript
const myArray = ['Wind', 'Rain', 'Fire']
```

You then refer to the first element of the array as `myArray[0]` and the second
element of the array as `myArray[1]`.

> The index of the elements begins with zero.

## Iterating over Arrays

A common operation is to iterate over the values of an array, processing each
one in some way. The simplest way to do this is as follows:

```typescript
const colors = ['red', 'green', 'blue']
for (let index = 0; index < colors.length; index++) {
  console.log(colors[index])
}
```

Note that the `index` variable is a `let` since we do need to reassign it
through the loop.

The `forEach()` method provides another way of iterating over an array:

```typescript
const colors = ['red', 'green', 'blue']
colors.forEach(function (color) {
  console.log(color)
})
```

Alternatively, You can shorten the code for the forEach parameter with Arrow
Functions:

```typescript
const colors = ['red', 'green', 'blue']
colors.forEach(color => console.log(color))
```

> This syntax is more compact, doesn't require maintaining an `index`, and is
> very much like syntax we will use when discussing front-end frameworks. Thus,
> at SDG, we will prefer this way to iterate over arrays.

Notice that we do not have an index. If we **do** want an index we can add that
as a second argument in our arrow function.

Note that we do not need to apply a type to `color` or to `index`. TypeScript
will determine that they must be of types `string` and `number` respectively.

```typescript
const colors = ['red', 'green', 'blue']
colors.forEach((color, index) =>
  console.log(`The color at position ${index} is ${color}`)
)
```

For more details on how to manipulate arrays, including adding and removing
elements, see the
[quick reference guide](/lessons/misc-quick-reference/js-arrays) on arrays.
