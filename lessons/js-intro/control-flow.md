---
title: Control Flow
order: 4
---

TypeScript supports a compact set of statements, specifically control flow
statements, that you can use to incorporate a great deal of interactivity in
your application. This chapter provides an overview of these statements.

Before we can discuss control flow, we need to understand the idea of a block.

## Block

The most basic block is a block statement that is used to group statements. The
block is delimited by a pair of curly brackets:

```typescript
{
  statement_1
  statement_2
  .
  .
  .
  statement_n
}
```

Using a plain block like this can be used to reduce the "scope" of a variable.
That is, ensuring a variable only exists for a few lines of code. Here is an
example of when we would use this type of block:

```typescript
const employees = ['Mary', 'Bob', 'Alice', 'Frank']

{
  let employeeIndex = 1

  // Some code that uses the variable
}

// We want to ensure that the variable `employeeIndex` is not valid here.
```

## Conditional Statements

A conditional statement is a set of commands that executes if a specified
condition is true. TypeScript supports two conditional statements: `if...else`
and `switch`.

**if statement**

Use the if statement to execute a statement if a logical condition is `true`.
Use the optional `else` clause to execute a statement if the condition is
`false`. An if statement looks as follows:

```typescript
if (condition) {
  statement_1
} else {
  statement_2
}
```

Here the condition can be any expression that evaluates to `true` or `false`.

> NOTE: In TypeScript all of these are considered `false`: `0`, `-0`, `null`,
> `false`, `NaN`, `undefined`, and the empty string `""`

If condition evaluates to `true`, `statement_1` is executed; otherwise,
`statement_2` is executed. `statement_1` and `statement_2` can be any statement,
including further nested if statements.

You may also compound the statements using `else if` to have multiple conditions
tested in sequence, as follows:

```typescript
if (condition_1) {
  statement_1
} else if (condition_2) {
  statement_2
} else if (condition_n) {
  statement_n
} else {
  statement_last
}
```

In the case of multiple conditions only the first logical condition which
evaluates to true will be executed. To execute multiple statements, group them
within a block statement (`{ ... }`) . In general, it's good practice to always
use block statements, especially when nesting if statements:

```typescript
if (condition) {
  statement_1_runs_if_condition_is_true
  statement_2_runs_if_condition_is_true
} else {
  statement_3_runs_if_condition_is_false
  statement_4_runs_if_condition_is_false
}
```

**switch statement**

A `switch` statement allows a program to evaluate an expression and attempt to
match the expression's value to a case label. If a match is found, the program
executes the associated statement. A switch statement looks as follows:

```typescript
switch (expression) {
  case label_1:
    statements_1
    [break]
  case label_2:
    statements_2
    [break]
    ...
  default:
    statements_def
    [break]
}
```

The program first looks for a `case` clause with a label matching the value of
expression and then transfers control to that clause, executing the associated
statements. If no matching label is found, the program looks for the optional
`default` clause, and if found, transfers control to that clause, executing the
associated statements. If no `default` clause is found, the program continues
execution at the statement following the end of switch. By convention, the
default clause is the last clause, but it does not need to be so.

The optional `break` statement associated with each case clause ensures that the
program breaks out of switch once the matched statement is executed and
continues execution at the statement following switch. If `break` is omitted,
the program continues execution at the next statement in the switch statement.

Example In the following example, if fruittype evaluates to "Bananas", the
program matches the value with case "Bananas" and executes the associated
statement. When break is encountered, the program terminates switch and executes
the statement following switch. If break were omitted, the statement for case
"Cherries" would also be executed.

```typescript
switch (fruittype) {
  case 'Oranges':
    console.log('Oranges are $0.59 a pound.')
    break
  case 'Apples':
    console.log('Apples are $0.32 a pound.')
    break
  case 'Bananas':
    console.log('Bananas are $0.48 a pound.')
    break
  case 'Cherries':
    console.log('Cherries are $3.00 a pound.')
    break
  case 'Mangoes':
    console.log('Mangoes are $0.56 a pound.')
    break
  case 'Papayas':
    console.log('Mangoes and papayas are $2.79 a pound.')
    break
  default:
    console.log('Sorry, we are out of ' + fruittype + '.')
}
console.log("Is there anything else you'd like?")
```

---
