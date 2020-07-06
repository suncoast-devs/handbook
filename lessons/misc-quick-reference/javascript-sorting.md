---
title: Sorting in JavaScript
---

JavaScript comes with a built in `sort` method on `Array` which is very handy.
However, its behavior is a little unexpected.

# Sorts in-place

The first thing we will notice is that it sorts the array in-place **and**
returns a copy. Imagine we start with this array:

```javascript
let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']

let sortedColors = colors.sort()

console.log(colors) //          this would log: [ 'blue', 'green', 'indigo', 'orange', 'red', 'violet', 'yellow' ]
console.log(sortedColors) //    this would log: [ 'blue', 'green', 'indigo', 'orange', 'red', 'violet', 'yellow' ]
```

So our `colors` array is _modified_ to be in the sorted order.

## Avoiding sorting in place

We can use the `...` (spread) operator to make a copy of the elements prior to
sorting:

```javascript
let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']

let sortedColors = [...colors].sort()

console.log(colors) //          this would log: [ 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet' ]
console.log(sortedColors) //    this would log: [ 'blue', 'green', 'indigo', 'orange', 'red', 'violet', 'yellow' ]
```

By using `[...colors]` we protect the `colors` array from being modified.

## Unexpected behavior when sorting arrays of numbers.

The following sorting seems to work as we would expect:

```javascript
let numbers = [9, 5, 3, 7, 6, 2, 0, 4, 1]

let sortedNumbers = [...numbers].sort()

console.log(numbers) //          this would log: [ 9, 5, 3, 7, 6, 2, 0, 4, 1 ]
console.log(sortedNumbers) //    this would log: [ 0, 1, 2, 3, 4, 5, 6, 7, 9 ]
```

However, if we were to mix in some numbers between 10 and 20, we get unexpected
results:

```javascript
let numbers = [9, 5, 3, 10, 7, 6, 11, 2, 0, 12, 4, 1]

let sortedNumbers = [...numbers].sort()

console.log(numbers) //          this would log: [ 9, 5, 3, 10, 7, 6, 11, 2, 0, 12, 4, 1 ]
console.log(sortedNumbers) //    this would log: [ 0, 1, 10, 11, 12, 2, 3, 4, 5, 6, 7, 9 ]
```

This is **NOT** what we want, or expect.

> The issue is that JavaScript coverts our elements to _strings_ first and then
> sorts. So the array `[9, 5, 3, 10, 7, 6, 11, 2, 0, 12, 4, 1]` is first
> considered to be
> `['9', '5', '3', '10', '7', '6', '11', '2', '0', '12', '4', '1']` for the
> purposes of sorting

## Overcoming the "convert everything to strings" for arrays of numbers

Luckily the `sort()` method takes a function as an argument. The purpose of this
argument is to accept any two elements from the array and determine if the first
is less than, equal to, or smaller than the other.

If the first element is smaller than the second, the function should return a
negative number. If the first element is equal to the second element it should
return `0`. If the first element is larger than the second element it should
return a positive number. Typically `-1`, and `1` are used, but any negative or
positive number will do.

```javascript
function compareNumbers(first, second) {
  if (first < second) {
    return -1
  }

  if (first === second) {
    return 0
  }

  if (first > second) {
    return 1
  }
}

let numbers = [9, 5, 3, 10, 7, 6, 11, 2, 0, 12, 4, 1]

let sortedNumbers = [...numbers].sort(compareNumbers)

console.log(numbers) //          this would log: [ 9, 5, 3, 10, 7, 6, 11, 2, 0, 12, 4, 1 ]
console.log(sortedNumbers) //    this would log: [ 0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12 ]
```

Since the function can return anything positive or negative, we can simplify
`compareNumbers`. If we just evaluate `first - second` it will have the right
behavior the sort function requires.

```javascript
function compareNumbers(first, second) {
  return first - second
}

let numbers = [9, 5, 3, 10, 7, 6, 11, 2, 0, 12, 4, 1]

let sortedNumbers = [...numbers].sort(compareNumbers)

console.log(numbers) //          this would log: [ 9, 5, 3, 10, 7, 6, 11, 2, 0, 12, 4, 1 ]
console.log(sortedNumbers) //    this would log: [ 0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12 ]
```

and we can even make this an inline arrow style function:

```javascript
let numbers = [9, 5, 3, 10, 7, 6, 11, 2, 0, 12, 4, 1]

let sortedNumbers = [...numbers].sort((first, second) => first - second)

console.log(numbers) //          this would log: [ 9, 5, 3, 10, 7, 6, 11, 2, 0, 12, 4, 1 ]
console.log(sortedNumbers) //    this would log: [ 0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12 ]
```

## Sorting objects

Lets say we wanted to sort the following objects:

```javascript
let players = [
  {
    name: 'Maria',
    score: 92,
  },
  {
    name: 'Jennifer',
    score: 90,
  },
  {
    name: 'Robert',
    score: 88,
  },
  {
    name: 'Paul',
    score: 91,
  },
]
```

### Sorting by `score`

We need to come up with a slightly more complex comparison function to sort by
the scores.

```javascript
let players = [
  {
    name: 'Maria',
    score: 92,
  },
  {
    name: 'Jennifer',
    score: 90,
  },
  {
    name: 'Robert',
    score: 88,
  },
  {
    name: 'Paul',
    score: 91,
  },
]

let sortedPlayers = [...players].sort(
  (firstPlayer, secondPlayer) => firstPlayer.score - secondPlayer.score
)

console.log(sortedPlayers)
// This would log:
// [
//   { name: 'Robert', score: 88 },
//   { name: 'Jennifer', score: 90 },
//   { name: 'Paul', score: 91 },
//   { name: 'Maria', score: 92 }
// ]
```

### Sorting by 'name'

We need to come up with a slightly more complex comparison function to sort by
the scores. We can use the `localeCompare` function which does a locale/language
specific comparison between two strings. It returns a sort-compatible, `-1`,
`0`, or `1`

```javascript
let players = [
  {
    name: 'Maria',
    score: 92,
  },
  {
    name: 'Jennifer',
    score: 90,
  },
  {
    name: 'Robert',
    score: 88,
  },
  {
    name: 'Paul',
    score: 91,
  },
]

let sortedPlayers = [...players].sort((firstPlayer, secondPlayer) =>
  firstPlayer.name.localeCompare(secondPlayer.name)
)

console.log(sortedPlayers)
// This would log:
// [
//   { name: 'Jennifer', score: 90 },
//   { name: 'Maria', score: 92 },
//   { name: 'Paul', score: 91 },
//   { name: 'Robert', score: 88 }
// ]
```

# Additional resources

This
[article on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
is a good review of how the sorting function works in JavaScript
