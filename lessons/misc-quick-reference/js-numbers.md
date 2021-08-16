---
title: JavaScript Numbers
---

### Numbers

JavaScript has one `number` type. This stores both integers and floating point
numbers (numbers with digits after the decimal point)

```js
let score = 42
const total = 10.1
const pi = 3.14159265
```

---

### Basic Math

## `+`, `-`, `*`, `/`

`+` and `-` represent addition and subtraction.

`*` and `/` represent multiplication and division.

Example:

```js
const firstNumber = 42
const secondNumber = 4

const result = firstNumber / secondNumber
```

In this case `result` is `10.5`.

## `%`

This is known as the modulo operator. The result of `firstNumber % secondNumber`
is equal to whatever the remainder would be if we divided `secondNumber` into
`firstNumber`.

Taking our above example:

```js
const firstNumber = 42
const secondNumber = 4

const result = firstNumber / secondNumber
const remainder = firstNumber % secondNumber
```

In this case `result` is `10.5` and `remainder` is `2`. The remainder is `2`
because as we divide 4 into `42` we can only do so `10` times, leaving `2` over.

### Modulo is useful for things like determining if a number is even or odd.

```js
const isThreeEven = 3 % 2 == 0 // False
const isEightEven = 8 % 2 == 0 // True
```

It is also good for ensuring that a value is _bounded_ by some value, causing it
to wrap around.

```js
// We don't want index to be 5 or more (stops at 4), and if it does it should wrap around to 0
let index = 0

index = (index + 1) % 5 // 0 + 1 is 1 -- 1 % 5 = 1
console.log(`index is ${index}`)

index = (index + 1) % 5 // 1 + 1 is 1 -- 1 % 5 = 1
console.log(`index is ${index}`)

index = (index + 1) % 5 // 2 + 1 is 3 -- 1 % 5 = 3
console.log(`index is ${index}`)

index = (index + 1) % 5 // 3 + 1 is 4 -- 1 % 5 = 4
console.log(`index is ${index}`)

// Here is where the % comes into play, adding one to 4 give 5, but we want this to "wrap around" back to 0.

index = (index + 1) % 5 // 4 + 1 is 5 -- 5 % 5 = 0
console.log(`index is ${index}`)

index = (index + 1) % 5 // 0 + 1 is 1 -- 1 % 5 = 1
console.log(`index is ${index}`)

index = (index + 1) % 5 // 1 + 1 is 2 -- 2 % 5 = 2
console.log(`index is ${index}`)
```

Let's see this in a loop:

```js
for (let index = 0; index < 20; index++) {
  const wrappedValue = index % 5
  console.log(`Wrapped value is ${wrappedValue} since index is ${index}`)
}
```

```
Wrapped value is 0 since index is 0
Wrapped value is 1 since index is 1
Wrapped value is 2 since index is 2
Wrapped value is 3 since index is 3
Wrapped value is 4 since index is 4
Wrapped value is 0 since index is 5
Wrapped value is 1 since index is 6
Wrapped value is 2 since index is 7
Wrapped value is 3 since index is 8
Wrapped value is 4 since index is 9
Wrapped value is 0 since index is 10
Wrapped value is 1 since index is 11
Wrapped value is 2 since index is 12
Wrapped value is 3 since index is 13
Wrapped value is 4 since index is 14
Wrapped value is 0 since index is 15
Wrapped value is 1 since index is 16
Wrapped value is 2 since index is 17
Wrapped value is 3 since index is 18
Wrapped value is 4 since index is 19
```

---

### Conversions

## `parseInt('42')`

Attempts to convert the given string into an `int` value. It does it's _best
effort_ to parse what it is given. If it can't figure out how to parse the
number we get back the special value `NaN` which represents "Not A Number". This
isn't a string, but a special value, in the same way `null` is a special value.

Example:

```js
const answer = parseInt('42')
// answer is 42
const mostlyAnAnswer = parseInt('42 things')
// mostlyAnAnswer is still 42
const notAnAnswer = parseInt('I think the answer is 42')
// notAnAnswer is the value NaN
```

## `Number('42')

Another way to convert a string to a number is with the `Number` method.
`Number` is more strict than `parseInt` in that the string must strictly
formatted as number. Any illegal characters will result in a value of `NaN`

```js
const answer = Number('42.5')
// answer is 42.5
const mostlyAnAnswer = Number('42 things')
// mostlyAnAnswer is the value NaN
const notAnAnswer = Number('I think the answer is 42')
// notAnAnswer is the value NaN
```

---

## `ToString`

A variable storing a number can use the `toString` method to create a string
representation.

Example

```js
const value = -16325

const valueAsString = value.toString()
// valueAsString will be `-16325`
```

---

## Rounding

`JavaScript` offers a number of ways to round numbers. The primary rounding
methods are `round`, `ceiling`, and `floor`.

### `floor`

The `floor` method, `Math.floor`, accepts a `number` and returns the number
without any of the digits after the decimal part. The technical description is
_Returns the largest integral value less than or equal to the specified number._

```js
const price = 12.34

const priceFloored = Math.floor(price)
// priceFloored will be 12
```

### `Ceiling`

The `ceiling` method, `Math.ceil`, accepts a `number` and returns the _smallest_
whole number that is greater than or equal to the number. For instance if we
asked for the `ceiling` of `42` we would get `42` back since it `42` a whole
number that is equal to the number we gave it. However, if we supplied `42.01`,
the next smallest whole number would be `43`.

```js
const wholePrice = 42
const wholePriceCeiling = Math.ceil(wholePrice)
// wholePriceCeiling will be 42

const priceWithMore = 42.01
const priceWithMoreCeiling = Math.ceil(priceWithMore)
// priceWithMoreCeiling will be 43
```

### `Round`

Rounds a value to the nearest whole number. Optionally we can specify the number
of fractional digits.

```js
const pi = 3.14159265
const roundedPi = Math.round(pi)
// roundedPi will be 3 since we are rounding down
```
