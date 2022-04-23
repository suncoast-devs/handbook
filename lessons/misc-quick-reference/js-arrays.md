---
title: JavaScript Arrays
---

## Spread Operator and Arrays

We can make a new array from the elements of an existing array using the
`spread` operator (`...`).

```javascript
const words = ['Wind', 'Rain', 'Fire']

const otherWords = [...words]
```

You can think of `...words` to mean `take all the contents of` words and put
them right here.

```
const words =      ['Wind', 'Rain', 'Fire']
                      |       |       |
                      |       |       |
                      v       v       v
const otherWords = [      ...words          ]
const otherWords = [ 'Wind', 'Rain', 'Fire' ]
```

We can also add entries **before** and **after** the spread.

```javascript
const words = ['Wind', 'Rain', 'Fire']

const otherWords = ['Before', ...words, 'After']
// otherWords is now ['Before', 'Wind', 'Rain', 'Fire', 'After']
```

This is often useful to make a _copy_ of an array:
`const copyOfArray = [...array]` or append to an array:
`const newArrayWithWordAppended = [...array, newWord]`.

## `join(delimiter = ',')`

Joins all elements of an array into a string. Without any argument, the list
will be joined with a `,`

```javascript
const words = new Array('Wind', 'Rain', 'Fire')
const sentence = words.join(' - ') // sentence is "Wind - Rain - Fire"

const otherSentence = words.join() // otherSentence is "Wind,Rain,Fire"

const wordsTogether = words.join('') // wordsTogether is "WindRainFire"
```

## `push()`

Adds one or more elements to the end of an array and returns the resulting
length of the array.

```javascript
const myArray = new Array('1', '2')
myArray.push('3') // myArray is now ["1", "2", "3"]
```

## `pop()`

Removes the last element from an array and returns that element.

```javascript
const myArray = new Array('1', '2', '3')
const last = myArray.pop() // myArray is now ["1", "2"], last = "3"
```

## `shift()`

Removes the first element from an array and returns that element.

```javascript
const myArray = new Array('1', '2', '3')
const first = myArray.shift() // myArray is now ["2", "3"], first is "1"
```

## `unshift()`

Adds one or more elements to the front of an array and returns the new length of
the array.

```javascript
var myArray = new Array('1', '2', '3')
myArray.unshift('4', '5') // myArray becomes ["4", "5", "1", "2", "3"]
```

## `slice(start_index, upto_index)`

Extracts a section of an array and returns a new array.

```javascript
const myArray = new Array('a', 'b', 'c', 'd', 'e')
const mySlice = myArray.slice(1, 3) // starts at index 1 and extracts all elements until index 3, mySlice is [ "b", "c", "d"] while myArray remains ['a', 'b', 'c', 'd', 'e']
```

## `splice(index, count_to_remove, addElement1, addElement2, ...)`

Removes elements from an array and (optionally) replaces them. It returns the
items which were removed from the array.

```javascript
const myArray = new Array('1', '2', '3', '4', '5')
myArray.splice(1, 3, 'a', 'b', 'c', 'd')
// myArray is now ["1", "a", "b", "c", "d", "5"]
// This code started at index one (or where the "2" was),
// removed 3 elements there, and then inserted all consecutive
// elements in its place.
```

## `reverse()`

Transposes the elements of an array, in place: the first array element becomes
the last and the last becomes the first. It returns a reference to the array.

```javascript
const myArray = new Array('1', '2', '3')
myArray.reverse() // transposes the array so that myArray = ["3", "2", "1"]
```

## `sort()`

Sorts the elements of an array in place, and returns a reference to the array.

```javascript
const myArray = new Array('Wind', 'Rain', 'Fire')
myArray.sort() // sorts the array so that myArray = ["Fire", "Rain", "Wind"]
```

## Advanced Sorting

The sort method and other methods below that take a callback are known as
iterative methods because they iterate over the entire array in some fashion.

The callback function, is called with two arguments, which are array's elements.

The function below compares two values and returns one of three values:

For instance, the following will sort by the length of a string:

```javascript
const sortFunction = function (a, b) {
  if (a.length < b.length) return -1
  if (a.length > b.length) return 1
  if (a.length === b.length) return 0
}

const myArray = ['three', 'four', 'one']
const sortedArray = myArray.sort(sortFunction)
// sortedArray now has [ 'one', 'four', 'three' ]
```

> NOTE, We could use this more brief code: for `sortFunction` :
> `return a.length - b.length`.

> NOTE: We could also write this:

```javascript
const myArray = ['three', 'four', 'one']
const sortedArray = myArray.sort((a, b) => a.length - b.length)
// sortedArray now has [ 'one', 'four', 'three' ]
```

**Rules for the return value of our sorting function**

If `a` is to come before `b` by the sorting system, return `-1` (or any negative
number). If `a` is to come after `b` by the sorting system, return `1` (or any
positive number). If `a` and `b` are considered equivalent, return `0`.

## `indexOf(searchElement[, fromIndex])`

Searches the array for searchElement and returns the index of the first match.

```javascript
const letters = ['a', 'b', 'a', 'b', 'a']
console.log(letters.indexOf('b')) // logs 1

// Now try again, starting from after the last match
console.log(letters.indexOf('b', 2)) // logs 3
console.log(letters.indexOf('z')) // logs -1, because 'z' was not found
```

## `lastIndexOf(searchElement[, fromIndex])`

Works like indexOf, but starts at the end and searches backward.

```javascript
const letters = ['a', 'b', 'c', 'd', 'a', 'b']
console.log(letters.lastIndexOf('b')) // logs 5
// Now try again, starting from before the last match
console.log(letters.lastIndexOf('b', 4)) // logs 1
console.log(letters.lastIndexOf('z')) // logs -1
```

## forEach(callback[, thisObject])

Executes callback on every array item and returns undefined.

```javascript
const letters = ['a', 'b', 'c']
letters.forEach(letter => console.log(letter))
// logs each item in turn
```

## `map(callback[, thisObject])`

Returns a new array of the return value from executing callback on every array
item.

```javascript
const letters = ['a', 'b', 'c']
const upperCaseLetters = letters.map(letter => letter.toUpperCase())
console.log(upperCaseLetters) // logs ['A', 'B', 'C']
```

## `filter(callback[, thisObject])`

Returns a new array containing the items for which callback returned true.

```javascript
const numbers = [42, 100, 19, 33, 66, 50]
const bigNumbers = numbers.filter(number => number > 50)
console.log(bigNumbers) // Logs [ 100, 66 ]
```

## `find(callback)`

The find() method returns the value of the first element in the provided array
that satisfies the provided testing function.

```javascript
const numbers = [42, 100, 19, 33, 66, 50]
const firstNumberMoreThan50 = numbers.find(number => number > 50)
console.log(firstNumberMoreThan50) // Logs 100
```

## `findIndex(callback)`

Returns the index of the element for which the callback returns true.

```javascript
const numbers = [42, 100, 19, 33, 66, 50]
const indexOfFirstNumberMoreThan50 = numbers.findIndex(number => number > 50)
console.log(indexOfFirstNumberMoreThan50) // Logs 1 (the index of the `100`)
```

## `includes(element)`

```javascript
const numbers = [42, 100, 19, 33, 66, 50]

console.log(numbers.includes(100)) // true
console.log(numbers.includes(543)) // false
```

The includes() method determines whether an array includes a certain value among
its entries, returning true or false as appropriate.

## `every(callback[, thisObject])`

Returns true if callback returns true for every item in the array.

```javascript
function isMoreThan50(value) {
  return value > 50
}

const numbers = [51, 100, 99]
console.log(numbers.every(isMoreThan50)) // logs true

const otherNumbers = [51, 100, 49]
console.log(otherNumbers.every(isMoreThan50)) // logs false
```

## `some(callback[, thisObject])`

Returns true if callback returns true for at least one item in the array.

```javascript
function isMoreThan50(value) {
  return value > 50
}

const numbers = [1, 2, 51]
console.log(numbers.some(isMoreThan50)) // logs true

const otherNumbers = [1, 2, 3]
console.log(otherNumbers.some(isMoreThan50)) // logs false
```

## `reduce(callback[, initialValue])`

Applies `callback(accumulator, currentValue[, currentIndex, array])` for each
value in the array to reduce the list of items down to a single value. The
reduce function returns the final value returned by the callback function. If an
initialValue is specified, the callback is called with the initial value as the
first parameter value and the value of the first item in the array as the second
parameter value. On the initial call, if no initialValue is specified, then the
first two parameter values will be the first and second elements of the array.
On every subsequent call, the first parameter's value will be whatever the
callback returned on the previous call, and the second parameter's value will be
the next value in the array.

If the callback function needs access to the index of the item being operated on
or the entire array they are available as optional parameters.

```javascript
const numbers = [10, 20, 30]

const total = numbers.reduce((totalSoFar, number) => totalSoFar + number, 0)
console.log(total) // Prints 60
```

## `reduceRight(callback[, initialValue])`

Works like `reduce()`, but starts with the last element.

> `reduce` and `reduceRight` are the least obvious of the iterative array
> methods. They should be used for algorithms that combine two values
> recursively in order to reduce a sequence down to a single value.

## `from`

Builds a new array as a copy of the existing array.

```javascript
const names = ['Samantha', 'Jenna', 'Paul']

const copyOfNames = Array.from(names)
// copyOfNames is a new, distinct array containing ['Samantha', 'Jenna', 'Paul']

const copyOfNamesButUppercase = Array.from(names, name => name.toUpperCase())
// copyOfNamesButUppercase is a new array containing ['SAMANTHA', 'JENNA', 'PAUL']
```

## `isArray`

The Array.isArray() method determines whether the passed value is an Array.

```javascript
Array.isArray([1, 2, 3]) // true
Array.isArray({ foo: 123 }) // false
Array.isArray('foobar') // false
Array.isArray(undefined) // false
```

## `of`

The Array.of() method creates a new Array instance from a variable number of
arguments, regardless of the number or type of the arguments.

```js
Array.of(7) // [7]
Array.of(1, 2, 3) // [1, 2, 3]
```

## `fill`

The fill() method changes all elements in an array to a static value, from a
start index (default 0) to an end index (default array.length). It returns the
modified array.

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// fill with 0 from position 2 until position 4
numbers.fill(0, 2, 4)

console.log(numbers)
//        CHANGED
//         |  |
//         v  v
// [ 1, 2, 0, 0, 5, 6, 7, 8, 9, 10]
```

## `concat()`

Joins two or more arrays and returns a new array.

```javascript
const myArray = new Array('1', '2', '3')
myNewArray = myArray.concat('a', 'b', 'c')
// myNewArray is now ["1", "2", "3", "a", "b", "c"]
```
