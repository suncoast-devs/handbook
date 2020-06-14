---
title: Variables
order: 3
---

Like in most modern programming languages, in JavaScript we store information in
`variables.` Variables are placeholders with meaningful names that we use to
store a value so that we can refer to it later.

The names of variables, called identifiers, conform to certain rules.

A JavaScript identifier must start with a letter, underscore (`_`), or dollar
sign (`$`); subsequent characters can also be digits (`0-9`). Because JavaScript
is case sensitive, letters include the characters "`A`" through "`Z`"
(uppercase) and the characters "`a`" through "`z`" (lowercase). Some examples of
legal names are `Number_hits`, `temp99`, `$credit`, and `_name`.

There are four ways we can assign a variable in JavaScript

|                   |                                                                                 |
| ----------------- | ------------------------------------------------------------------------------- |
| `var`             | Declares a variable, optionally initializing it to a value.                     |
| `let`             | Declares a block-scoped, local variable, optionally initializing it to a value. |
| `const`           | Declares a block-scoped, read-only named constant.                              |
| undeclared global | Without var, let, or const, we create a global variable                         |
|                   |                                                                                 |

`undeclared global` variables are highly discouraged as they can often lead to
unexpected behavior. In our coding we will always use `var`, `let`, or `const.`
In fact, in modern JavaScript we will restrict our usage to `let` and `const.`

`const` variables are assigned a value on the same statement where they are
declared. They can also not be re-assigned at a later date.

> The variables that you create should be defaulted to using `const`. This will
> help you keep your variables, values and data more organized and reliable.

```javascript
const answer = 42;
```

The value of this variable cannot be changed.

`let` versus `var` -- These are both ways to declare variables which can be
changed. The difference between these two ways of declaring a variable have to
do with `scope.` We haven't discussed `scope` yet, so for now we will limit
ourselves to using the `let` style of declaring variables.

```javascript
let score = 98;
```

The value of the `score` variable can be changed at a later time. That is, we
can increment it, decrement it, or change it to any other value we like.

**Variables without assigned values**

When declaring a variable with `let` we do not have to specify a value. After
declaring a variable but before assigning it a value, the variable will contain
a special value known as `undefined`

```javascript
let name;
// name contains 'undefined'

name = "Jane";
// name now contains the value 'Jane'
```

Most of the time we are able to declare a variable and assign a value at the
same time. However, it is sometimes useful to declare the variable and assign
it's value later. Once we introduce conditions and functions we will see cases
of this.

# Types

# Basic Types

As you saw when declaring variables, there are different types of values in
JavaScript. You may have also noticed that we did not have to tell a variable
what kind of value we were assigning. The same syntax is used regardless of the
variable type.

Here are our first few types that are in JavaScript, we will build on this later

|             |                                                                                                                                                                             |     |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| `number`    | A numeric value such as `42`, `3.14`, or `0`                                                                                                                                |
| `string`    | A sequence of characters such as `"Jane"`, `""`, or `"100"` - Notice that `"100"` is different than `100` the former is a sequence of characters and the latter is a number |
| `null`      | A special keyword denoting a null value.                                                                                                                                    |
| `undefined` | A top-level property whose value is not defined.                                                                                                                            |

Looking at this list you might think that having `null` and `undefined` is
redundant. Here is an example of the difference between the two:

![zero versus null versus undefined](./assets/zero-null-undefined.jpg)

## Data Type Conversion

JavaScript is a dynamically typed language. That means you don't have to specify
the data type of a variable when you declare it, and data types are converted
automatically as needed during script execution. So, for example, you could
define a variable as follows:

```javascript
let answer = 42;
```

And later, you could assign the same variable a string value, for example:

```javascript
answer = "Thanks for all the fish...";
```

Because JavaScript is dynamically typed, this assignment does not cause an error
message.

In expressions involving numeric and string values with the + operator,
JavaScript converts numeric values to strings. For example, consider the
following statements:

```javascript
let x = "The answer is " + 42; // "The answer is 42"
let y = 42 + " is the answer"; // "42 is the answer"
```

In statements involving other operators, JavaScript does not convert numeric
values to strings. For example:

```javascript
"37" - 7; // 30
"37" + 7; // "377"
```

## Literals

You use literals to represent values in JavaScript. These are fixed values, not
variables, that you _literally_ provide in your script. This section describes
the following types of literals:

_Integers_ _Floating-point literals_ _String literals_ _Boolean literals_

### Integers

Integers can be expressed in decimal (base 10), hexadecimal (base 16), octal
(base 8) and binary (base 2).

A decimal integer literal consists of a sequence of digits without a leading 0
(zero). A leading 0 (zero) on an integer literal, or a leading 0o (or 0O)
indicates it is in octal. Octal integers can include only the digits 0-7. A
leading 0x (or 0X) indicates a hexadecimal integer literal. Hexadecimal integers
can include digits (0-9) and the letters a-f and A-F. (The case of a character
does not change its value, e.g. 0xa = 0xA = 10 and 0xf = 0xF = 15.) A leading 0b
(or 0B) indicates a binary integer literal. Binary integers can only include the
digits 0 and 1.

Some examples of integer literals are:

```plain
0, 117 and -345 (decimal, base 10)
015, 0001 and -0o77 (octal, base 8)
0x1123, 0x00111 and -0xF1A7 (hexadecimal, "hex" or base 16)
0b11, 0b0011 and -0b11 (binary, base 2)
```

### Floating Point Literals

A floating-point literal can have the following parts:

- A decimal integer which can be signed (preceded by "+" or "-"),
- A decimal point ("."),
- A fraction (another decimal number),
- An exponent.
- The exponent part is an "e" or "E" followed by an integer, which can be signed
  (preceded by "+" or "-"). A floating-point literal must have at least one
  digit and either a decimal point or "e" (or "E").

For example:

```
3.1415926
-0.123456789
-3.1e12
0.1e-23
```

### String Literals

A string literal is zero or more characters enclosed in double (") or single (')
quotation marks. A string must be delimited by quotation marks of the same type;
that is, either both single quotation marks or both double quotation marks. The
following are examples of string literals:

```javascript
"foo";
"bar";
"1234";
"one line \n another line";
"John's cat";
```

Template literals are also available. Template literals are enclosed by the
back-tick (\`) (grave accent) character instead of double or single quotes.
Inside the backticks we can use `${}` to evaluate statements

```javascript
let score = 56;
let prompt = `The current score is ${score} and the next score is ${score + 1}`;
// The current score is 56 and the next score is 57
```

### Boolean Literals

The Boolean type has two literal values: `true` and `false`.

---

Now we have data, we need ways to manipulate the variables
