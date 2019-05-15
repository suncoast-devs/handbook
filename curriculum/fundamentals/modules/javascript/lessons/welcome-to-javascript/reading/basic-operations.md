import CodePen from '@handbook/CodePen'
import AdvancedTopic from '@handbook/AdvancedTopic'

# Operators

Variables by themselves allow our programs to be dynamic, but in order to make our apps to be more interesting and powerful, we need operations. Operations allow developers to manipulate values and variables to calculate a new value. Most modern programming languages support the same common operations.

This section describes JavaScript's expressions and operators, including assignment, comparison, arithmetic, bitwise, logical, string, ternary and more.

A complete and detailed list of operators and expressions is also available in the [ MDN reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)

JavaScript has the following types of operators.

- Assignment operators
- Comparison operators
- Arithmetic operators
- Bitwise operators
- Logical operators
- String operators
- Conditional (ternary) operator
- Comma operator
- Unary operators
- Relational operators

There is not need to learn them all at once, so we are going to start with only a few, and learn more over time.

## Assignment operators

An assignment operator assigns a value to its left operand based on the value of its right operand. The simple assignment operator is equal (=), which assigns the value of its right operand to its left operand. That is, x = y assigns the value of y to x.

There are also compound assignment operators that are shorthand for the operations listed in the following table:

| Name                            | Shorthand operator | Meaning       |
| ------------------------------- | ------------------ | ------------- |
| Assignment                      | `x = y`            | `x = y`       |
| Addition assignment             | `x += y`           | `x = x + y`   |
| Subtraction assignment          | `x -= y`           | `x = x - y`   |
| Multiplication assignment       | `x *= y`           | `x = x * y`   |
| Division assignment             | `x /= y`           | `x = x / y`   |
| Remainder assignment            | `x %= y`           | `x = x % y`   |
| Exponentiation assignment       | `x **= y`          | `x = x ** y`  |
| Left shift assignment           | `x <<= y`          | `x = x << y`  |
| Right shift assignment          | `x >>= y`          | `x = x >> y`  |
| Unsigned right shift assignment | `x >>>= y`         | `x = x >>> y` |
| Bitwise AND assignment          | `x &= y`           | `x = x & y`   |
| Bitwise XOR assignment          | `x ^= y`           | `x = x ^ y`   |
| Bitwise OR assignment           | `x |= y`           | `x = x | y`   |
|                                 |                    |               |

## Arithmetic operators

An arithmetic operator takes numerical values (either literals or variables) as their operands and returns a single numerical value. The standard arithmetic operators are addition (+), subtraction (-), multiplication (\*), and division (/). These operators work as they do in most other programming languages when used with floating point numbers (in particular, note that division by zero produces Infinity). For example:

```js
1 / 2 // 0.5
1 / 2 == 1.0 / 2.0 // this is true
```

In addition to the standard arithmetic operations (+, -, \* /), JavaScript provides the arithmetic operators listed in the following table:

| Operator                       | Description                                                                                                                                                                                                                  | Example                                                                                                               |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Remainder (`%`)                | Binary operator. Returns the integer remainder of dividing the two operands.                                                                                                                                                 | `12 % 5` returns `2`.                                                                                                 |
| Increment (++)                 | Unary operator. Adds one to its operand. If used as a prefix operator (`++x`), returns the value of its operand after adding one; if used as a postfix operator (`x++`), returns the value of its operand before adding one. | If `x` is `3`, then `++x` sets `x` to `4` and returns `4`, whereas `x++` returns `3` and, only then, sets `x` to `4`. |
| Decrement (`--`)               | Unary operator. Subtracts one from its operand. The return value is analogous to that for the increment operator.                                                                                                            | If `x` is `3, then`--x`sets`x`to`2`and returns`2`, whereas`x--`returns`3`and, only then, sets`x`to`2`.                |
| Unary negation (`-`)           | Unary operator. Returns the negation of its operand.                                                                                                                                                                         | If `x` is `3`, then `-x` returns `-3`ll.                                                                              |
| Unary plus (`+`)               | Unary operator. Attempts to convert the operand to a number, if it is not already.                                                                                                                                           | `+"3"` returns `3`.<br/> `+true` returns `1`.                                                                         |
| Exponentiation operator (`**`) | Calculates the base to the exponent power, that is, baseexponent                                                                                                                                                             | `2 ** 3` returns `8`.<br/> `10 ** -1` returns `0.1`.                                                                  |
|                                |                                                                                                                                                                                                                              |                                                                                                                       |

## Logical operators

Logical operators are typically used with Boolean (logical) values; when they are, they return a Boolean value. However, the && and || operators actually return the value of one of the specified operands, so if these operators are used with non-Boolean values, they may return a non-Boolean value. The logical operators are described in the following table.

| Operator           | Usage            | Description                                                                                                                                                                                      |
| ------------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Logical AND (`&&`) | `expr1 && expr2` | Returns `expr1` if it can be converted to `false`; otherwise, returns `expr2`. Thus, when used with Boolean values, `&&` returns `true` if both operands are `true`; otherwise, returns `false`. |
| Logical OR (`||`)  | expr1            |                                                                                                                                                                                                  | expr2 | Returns expr1 if it can be converted to true; otherwise, returns expr2. Thus, when used with Boolean values, |  | returns true if either operand is true; if both are false, returns false. |
| Logical NOT (`!`)  | `!expr`          | Returns false if its single operand that can be converted to true; otherwise, returns true.                                                                                                      |

---

import Nav from './Nav'

<Nav/>
