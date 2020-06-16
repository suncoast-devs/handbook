---
title: Enumeration
order: 1
---

# `forEach`

When we [learned about arrays in JavaScript](/lessons/js-intro/arrays) we saw
that the `forEach` method is very helpful for iterating through the contents of
an array.

```javascript
const colors = ['red', 'green', 'blue']
colors.forEach(function (color, index) {
  console.log(`The color at position ${index} is ${color}`)
})
```

The `forEach` method allows us to iterate through the array by supplying a
function that accepts one or more arguments. The first argument will be the
element the loop is currently working on. The second argument is the `0`-based
index of the current element.

> _NOTE_ There are a third and fourth argument. The third argument is the array
> itself. This can be useful if you need to access other elements of the array
> inside the callback function. The final argument is the value to use as `this`
> inside the method. The use of these arguments is rare, but are worth
> mentioning here.

# Transforming values

Let's suppose we wanted, instead of `console.log` values we wanted to build a
new array of values from our array of colors. And suppose what we wanted each
element of this new array to be the equal to the length of the string at the
corresponding index of the original array.

That is:

```javascript
const colors = ['red', 'green', 'blue']

// Code here

const lengths = [3, 5, 4]
```

We will start by doing this in a very manual way. Begin by creating a new array
to receive the individual elements.

```javascript
const colors = ['red', 'green', 'blue']

const lengths = []
```

Then we will setup the `forEach` loop

```javascript
const colors = ['red', 'green', 'blue']

const lengths = []

colors.forEach(function (color) {
  // Code here
})
```

Now we will concentrate on the code inside the loop. Here we want to take the
individual color and compute it's length. Then _append_ that to the `lengths`
array.

```javascript
const colors = ['red', 'green', 'blue']

const lengths = []

colors.forEach(function (color) {
  const lengthOfColor = color.length

  lengths.push(lengthOfColor)
})

console.log(lengths) // [ 3, 5, 4 ]
```

This is a fairly simple loop with a few steps within the loop itself.

## Introducing `map`

While this transformation code is great, it does not allow us to use it in a
generic way. If we needed to have another array except the transformation is now
the names of the colors in _UPPERCASE_ we would need to re-implement the entire
loop.

```javascript
const colors = ['red', 'green', 'blue']

const lengths = []

colors.forEach(function (color) {
  const lengthOfColor = color.length

  lengths.push(lengthOfColor)
})

console.log(lengths) // [ 3, 5, 4 ]

const uppercased = []

colors.forEach(function (color) {
  const uppercase = color.toUpperCase()

  uppercased.push(uppercase)
})

console.log(uppercased) // [ 'RED', 'GREEN', 'BLUE' ]
```

To remedy this, JavaScript supplies a method with precisely this behavior: `map`

```javascript
const colors = ['red', 'green', 'blue']

const lengths = colors.map(function (color) {
  const lengthOfColor = color.length

  return lengthOfColor
})

console.log(lengths) // [ 3, 5, 4 ]

const uppercased = colors.map(function (color) {
  const uppercase = color.toUpperCase()

  return uppercase
})

console.log(uppercased) // [ 'RED', 'GREEN', 'BLUE' ]
```

Notice only a few small changes to our code.

- We no longer have to initialize an empty array and modify its contents.
- We no longer `push` to the array, but simply **return** the new value from our
  callback function.

We can simplify the code a little if we remove the temporary variables.

```javascript
const colors = ['red', 'green', 'blue']

const lengths = colors.map(function (color) {
  return color.length
})

console.log(lengths) // [ 3, 5, 4 ]

const uppercased = colors.map(function (color) {
  return color.toUpperCase()
})

console.log(uppercased) // [ 'RED', 'GREEN', 'BLUE' ]
```

We can also reduce the code by changing to using `arrow functions`

```javascript
const colors = ['red', 'green', 'blue']

const lengths = colors.map(color => {
  return color.length
})

console.log(lengths) // [ 3, 5, 4 ]

const uppercased = colors.map(color => {
  return color.toUpperCase()
})

console.log(uppercased) // [ 'RED', 'GREEN', 'BLUE' ]
```

And now that we are using `arrow functions` we can apply a rule that allows us
an even more concise syntax when the arrow function **only** contains a return
statement.

```javascript
const colors = ['red', 'green', 'blue']

const lengths = colors.map(color => color.length)

console.log(lengths) // [ 3, 5, 4 ]

const uppercased = colors.map(color => color.toUpperCase())

console.log(uppercased) // [ 'RED', 'GREEN', 'BLUE' ]
```

## Similarity to LINQ

For those who have studied [C# LINQ](/lessons/cs-linq) you may see a strong
resemblance of the `Select` statement. In fact `Select` from C# and `map` from
`JavaScript` are very similar.

## Other JavaScript enumerations

### filter

If we wish to create a new array but only retain _some_ of the elements from the
original array we can use `filter`

```javascript
const colors = ['red', 'green', 'blue']

const longColors = colors.filter(color => color.length > 3)

console.log(longColors) // [ 'green', 'blue' ]
```

This is very similar to `C# Where` from LINQ.

### reduce

To use the classic example of adding up a list of numbers. Reduce takes at least
two parameters, the first being the reducing function, and the second being the
initial value. The reducing function takes at least two arguments itself, the
first being the accumulator and the second being the current element from the
array.

```javascript
const numbers = [100, 42, 13]

const total = numbers.reduce((total, number) => total + number, 0)

console.log(total) // [ 155 ]
```

### Others

See the [quick reference guide](/lessons/misc-quick-reference/js-arrays) for
other iterators such as `some`, `every`, and `reduce-right`
