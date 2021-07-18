---
title: Loops and iteration
order: 12
---

Loops offer a quick and easy way to do something repeatedly. You can think of a
loop as a computerized version of the game where you tell someone to take X
steps in one direction then Y steps in another; for example, the idea "Go five
steps to the east" could be expressed this way as a loop:

```typescript
for (let step = 0; step < 5; step++) {
  // Runs 5 times, with values of step 0 through 4.
  console.log('Walking east one step')
}
```

There are many different kinds of loops, but they all essentially do the same
thing: they repeat an action some number of times (and it's actually possible
that number could be zero). The various loop mechanisms offer different ways to
determine the start and end points of the loop. There are various situations
that are more easily served by one type of loop over the others.

The statements for loops provided in TypeScript are:

- `for statement`
- `do...while statement`
- `while statement`
- `break statement`
- `for...in statement`
- `for...of statement`

## For statement

A for statement looks as follows:

```typescript
for ([initialExpression]; [condition]; [incrementExpression]) {
  statement
}
```

When a for loop executes, the following occurs:

1. The initializing expression `initialExpression`, if any, is executed. This
   expression usually initializes one or more loop counters, but the syntax
   allows an expression of any degree of complexity. This expression can also
   declare variables.
1. The `condition` expression is evaluated. If the value of `condition` is
   `true`, the loop statements execute. If the value of `condition` is `false`,
   the for loop terminates. If the `condition` expression is omitted entirely,
   the condition is assumed to be true.
1. The `statement` executes. To execute multiple statements, use a block
   statement (`{ ... }`) to group those statements.
1. If present, the update expression `incrementExpression` is executed.
1. Control returns to step 2.

## do...while statement

The do...while statement repeats until a specified condition evaluates to false.
A do...while statement looks as follows:

```typescript
do {
  statement
} while (condition)
```

`statement` is always executed once before the condition is checked (and then
again until the while `condition` returns `false`). To execute multiple
statements, use a block statement (`{ ... }`) to group those statements. If
`condition` is `true`, the `statement` executes again. At the end of every
execution, the `condition` is checked. When the `condition` is `false`,
execution stops and control passes to the statement following `do...while`.

# while statement

A `while` statement executes its statements as long as a specified `condition`
evaluates to `true`. A while statement looks as follows:

```typescript
while (condition) {
  statement
}
```

If the `condition` becomes `false`, `statement` within the loop stops executing
and control passes to the statement following the loop.

The `condition` test occurs before `statement` in the loop is executed. If the
`condition` returns `true`, `statement` is executed and the `condition` is
tested again. If the `condition` returns `false`, execution stops and control is
passed to the statement following while.

To execute multiple statements, use a block statement (`{ ... }`) to group those
statements.

The following while loop iterates as long as n is less than three:

```typescript
let n = 0
let x = 0
while (n < 3) {
  n++
  x += n
}
```

## for...in statement

The `for...in` statement iterates a specified variable over all the enumerable
properties of an object. For each distinct property, TypeScript executes the
specified statements. A `for...in` statement looks as follows:

```typescript
for (variable in object) {
  statements
}
```

The following function takes as its argument an object and the object's name. It
then iterates over all the object's properties and returns a string that lists
the property names and their values.

```typescript
const car = { make: 'Ford', model: 'Mustang' }

for (const property in car) {
  const message = `The value of ${property} is ${car[property]}`
  console.log(message)
}
// The value of make is Ford
// The value of model is Mustang
```

> Although it may be tempting to use this as a way to iterate over `Array`
> elements, the `for...in` statement will return the name of your user-defined
> properties in addition to the numeric indexes. Thus it is better to use a
> traditional for loop with a numeric index when iterating over arrays.

## for...of statement

The `for...of` statement creates a loop iterating over iterable objects
(including `Array`, `Map`, `Set`, arguments object and so on), invoking a block
with statements to be executed for the value of each distinct property.

```typescript
const numbers = [3, 5, 7]

for (const number of numbers) {
  console.log(number) // logs 3, 5, 7
}
```
