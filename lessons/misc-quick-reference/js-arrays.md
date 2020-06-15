---
title: JavaScript Arrays
---

## `concat()`

Joins two or more arrays and returns a new array.

```javascript
let myArray = new Array("1", "2", "3");
myArray = myArray.concat("a", "b", "c");
// myArray is now ["1", "2", "3", "a", "b", "c"]
```

## `join(delimiter = ',')`

Joins all elements of an array into a string. Without any argument the list will
be joined with a `,`

```javascript
let myArray = new Array("Wind", "Rain", "Fire");
let list = myArray.join(" - "); // list is "Wind - Rain - Fire"

let otherList = myArray.join(); // otherList is "Wind,Rain,Fire"

let wordsTogether = myArray.join(""); // wordsTogether is "WindRainFire"
```

## `push()`

Adds one or more elements to the end of an array and returns the resulting
length of the array.

```javascript
let myArray = new Array("1", "2");
myArray.push("3"); // myArray is now ["1", "2", "3"]
```

## `pop()`

Removes the last element from an array and returns that element.

```javascript
let myArray = new Array("1", "2", "3");
let last = myArray.pop(); // myArray is now ["1", "2"], last = "3"
```

## `shift()`

Removes the first element from an array and returns that element.

```javascript
let myArray = new Array("1", "2", "3");
let first = myArray.shift(); // myArray is now ["2", "3"], first is "1"
```

## `unshift()`

Adds one or more elements to the front of an array and returns the new length of
the array.

```javascript
var myArray = new Array("1", "2", "3");
myArray.unshift("4", "5"); // myArray becomes ["4", "5", "1", "2", "3"]
```

## `slice(start_index, upto_index)`

Extracts a section of an array and returns a new array.

```javascript
let myArray = new Array("a", "b", "c", "d", "e");
myArray = myArray.slice(1, 4); // starts at index 1 and extracts all elements until index 3, returning [ "b", "c", "d"]
```

## `splice(index, count_to_remove, addElement1, addElement2, ...)`

Removes elements from an array and (optionally) replaces them. It returns the
items which were removed from the array.

```javascript
let myArray = new Array("1", "2", "3", "4", "5");
myArray.splice(1, 3, "a", "b", "c", "d");
// myArray is now ["1", "a", "b", "c", "d", "5"]
// This code started at index one (or where the "2" was),
// removed 3 elements there, and then inserted all consecutive
// elements in its place.
```

## `reverse()`

Transposes the elements of an array, in place: the first array element becomes
the last and the last becomes the first. It returns a reference to the array.

```javascript
let myArray = new Array("1", "2", "3");
myArray.reverse(); // transposes the array so that myArray = ["3", "2", "1"]
```

## `sort()`

Sorts the elements of an array in place, and returns a reference to the array.

```javascript
let myArray = new Array("Wind", "Rain", "Fire");
myArray.sort(); // sorts the array so that myArray = ["Fire", "Rain", "Wind"]
```

## Advanced Sorting

The sort method and other methods below that take a callback are known as
iterative methods, because they iterate over the entire array in some fashion.

The callback function is called with two arguments, that are array's elements.

The function below compares two values and returns one of three values:

For instance, the following will sort by the length of a string:

```javascript
let sortFunction = function (a, b) {
  if (a.length < b.length) return -1;
  if (a.length > b.length) return 1;
  if (a.length === b.length) return 0;
};
let myArray = ["three", "four", "one"];
let sortedArray = myArray.sort(sortFunction);
// sortedArray now has [ 'one', 'four', 'three' ]
```

**Rules for the return value of our sorting function**

if `a` is to come before `b` by the sorting system, return `-1` (or any negative
number) if `a` is to come after `b` by the sorting system, return `1` (or any
positive number) if `a` and `b` are considered equivalent, return `0`.

## `indexOf(searchElement[, fromIndex])`

Searches the array for searchElement and returns the index of the first match.

```javascript
let a = ["a", "b", "a", "b", "a"];
console.log(a.indexOf("b")); // logs 1

// Now try again, starting from after the last match
console.log(a.indexOf("b", 2)); // logs 3
console.log(a.indexOf("z")); // logs -1, because 'z' was not found
```

## `lastIndexOf(searchElement[, fromIndex])`

Works like indexOf, but starts at the end and searches backwards.

```javascript
let a = ["a", "b", "c", "d", "a", "b"];
console.log(a.lastIndexOf("b")); // logs 5
// Now try again, starting from before the last match
console.log(a.lastIndexOf("b", 4)); // logs 1
console.log(a.lastIndexOf("z")); // logs -1
```

## forEach(callback[, thisObject])

Executes callback on every array item and returns undefined.

```javascript
let a = ["a", "b", "c"];
a.forEach((element) => console.log(element));
// logs each item in turn
```

## `map(callback[, thisObject])`

Returns a new array of the return value from executing callback on every array
item.

```javascript
let a1 = ["a", "b", "c"];
let a2 = a1.map((item) => item.toUpperCase());
console.log(a2); // logs ['A', 'B', 'C']
```

## `filter(callback[, thisObject])`

Returns a new array containing the items for which callback returned true.

```javascript
let a1 = [42, 100, 19, 33, 66, 50];
let a2 = a1.filter((item) => item > 50);
console.log(a2); // Logs [ 100, 66 ]
```

## `every(callback[, thisObject])`

Returns true if callback returns true for every item in the array.

```javascript
function isMoreThan50(value) {
  return value > 50;
}

let a1 = [51, 100, 99];
console.log(a1.every(isMoreThan50)); // logs true
var a2 = [51, 100, 49];
console.log(a2.every(isMoreThan50)); // logs false
```

## `some(callback[, thisObject])`

Returns true if callback returns true for at least one item in the array.

```javascript
function isMoreThan50(value) {
  return value > 50;
}

let a1 = [1, 2, 51];
console.log(a1.some(isMoreThan50)); // logs true
let a2 = [1, 2, 3];
console.log(a2.some(isMoreThan50)); // logs false
```

## `reduce(callback[, initialValue])`

Applies `callback(accumulator, currentValue[, currentIndex, array])` for each
value in the array for the purpose of reducing the list of items down to a
single value. The reduce function returns the final value returned by the
callback function. If an initialValue is specified the callback is called with
the initial value as the first parameter value and the value of the first item
in the array as the second parameter value. On the initial call if no
initialValue is specified then the first two parameter values will be the first
and second elements of the array. On every subsequent call the first parameter's
value will be whatever the callback returned on the previous call and the second
parameter's value will be the next value in the array.

If the callback function needs access to the index of the item being operated on
or the entire array they are available as optional parameters.

```javascript
let a = [10, 20, 30];
let total = a.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
);
console.log(total); // Prints 60
```

## `reduceRight(callback[, initialValue])`

Works like `reduce()`, but starts with the last element.

> `reduce` and `reduceRight` are the least obvious of the iterative array
> methods. They should be used for algorithms that combine two values
> recursively in order to reduce a sequence down to a single value.
