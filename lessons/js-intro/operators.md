---
title: Operators
order: 6
---

import AdvancedTopic from '@handbook/AdvancedTopic'

This section describes TypeScript's expressions and operators, including
assignment, comparison, arithmetic, bitwise, logical, string, ternary, and more.

A complete and detailed list of operators and expressions is also available in
the
[ MDN reference](https://developer.mozilla.org/en-US/docs/Web/TypeScript/Reference/Operators).

TypeScript has the following types of operators. This section describes the
operators and contains information about operator precedence.

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

## Assignment operators

An assignment operator assigns a value to its left operand based on the value of
its right operand. The simple assignment operator is equal (=), which assigns
the value of its right operand to its left operand. That is, x = y assigns the
value of y to x.

There are also compound assignment operators that are shorthand for the
operations listed in the following table:

| Name                            | Shorthand operator | Meaning       |
| ------------------------------- | ------------------ | ------------- | ------ | --- |
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
| Bitwise OR assignment           | `x                 | = y`          | `x = x | y`  |
|                                 |                    |               |

**Destructuring Assignment**

For more complex assignments, the destructuring assignment syntax is a
TypeScript expression that makes it possible to extract data from arrays or
objects using a syntax that mirrors the construction of array and object
literals.

```typescript
const numbers = ['one', 'two', 'three']

// without destructuring
const one = numbers[0]
const two = numbers[1]
const three = numbers[2]

// with destructuring
const [one, two, three] = numbers
```

## Comparison Operators

A comparison operator compares its operands and returns a logical value based on
whether the comparison is true. The operands can be numerical, string, logical,
or object values. Strings are compared based on standard ordering. In most
cases, if the two operands are not of the same type, TypeScript attempts to
convert them to an appropriate type for the comparison. This behavior generally
results in comparing the operands numerically. The sole exceptions to type
conversion within comparisons involve the === and !== operators, which perform
strict equality and inequality comparisons. These operators do not attempt to
convert the operands to compatible types before checking equality. The following
table describes the comparison operators in terms of this sample code:

```typescript
const var1 = 3
const var2 = 4
```

| Operator                     | Description                                                                                         | Examples returning true                      |
| ---------------------------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| Equal (`==`)                 | Returns true if the operands are equal.                                                             | `3 == var1`<br/>`"3" == var1`<br/>`3 == '3'` |
| Not equal (`!=`)             | Returns true if the operands are not equal.                                                         | `var1 != 4`<br/>`var2 != "3"`                |
| Strict equal (`===`)         | Returns true if the operands are equal and of the same type. See also Object.is and sameness in JS. | `3 === var1`                                 |
| Strict not equal (`!==`)     | Returns true if the operands are of the same type but not equal, or are of different type.          | `var1 !== "3"`<br/>`3 !== '3'`               |
| Greater than (`>`)           | Returns true if the left operand is greater than the right operand.                                 | `var2 > var1`<br/>`"12" > 2`                 |
| Greater than or equal (`>=`) | Returns true if the left operand is greater than or equal to the right operand.                     | `var2 >= var1`<br/>`var1 >= 3`               |
| Less than (`<`)              | Returns true if the left operand is less than the right operand.                                    | `var1 < var2`<br/> `"2" < 12`                |
| Less than or equal (`<=`)    | Returns true if the left operand is less than or equal to the right operand.                        | `var1 <= var2`<br/>`var2 <= 5`               |
|                              |                                                                                                     |                                              |

## Arithmetic operators

An arithmetic operator takes numerical values (either literals or variables) as
their operands and returns a single numerical value. The standard arithmetic
operators are addition (+), subtraction (-), multiplication (\*), and division
(/). These operators work as they do in most other programming languages when
used with floating point numbers (in particular, note that division by zero
produces Infinity). For example:

```typescript
1 / 2 // 0.5
1 / 2 == 1.0 / 2.0 // this is true
```

In addition to the standard arithmetic operations (+, -, \* /), TypeScript
provides the arithmetic operators listed in the following table:

| Operator                       | Description                                                                                                                                                                                                                  | Example                                                                                                               |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Remainder (`%`)                | Binary operator. Returns the integer remainder of dividing the two operands.                                                                                                                                                 | `12 % 5` returns `2`.                                                                                                 |
| Increment (++)                 | Unary operator. Adds one to its operand. If used as a prefix operator (`++x`), returns the value of its operand after adding one; if used as a postfix operator (`x++`), returns the value of its operand before adding one. | If `x` is `3`, then `++x` sets `x` to `4` and returns `4`, whereas `x++` returns `3` and, only then, sets `x` to `4`. |
| Decrement (`--`)               | Unary operator. Subtracts one from its operand. The return value is analogous to that for the increment operator.                                                                                                            | If `x` is `3, then`--x`sets`x`to`2`and returns`2`, whereas`x--`returns`3`and, only then, sets`x`to`2`.                |
| Unary negation (`-`)           | Unary operator. Returns the negation of its operand.                                                                                                                                                                         | If `x` is `3`, then `-x` returns `-3`.                                                                                |
| Unary plus (`+`)               | Unary operator. Attempts to convert the operand to a number, if it is not already.                                                                                                                                           | `+"3"` returns `3`.<br/> `+true` returns `1`.                                                                         |
| Exponentiation operator (`**`) | Calculates the base to the exponent power, that is, baseexponent                                                                                                                                                             | `2 ** 3` returns `8`.<br/> `10 ** -1` returns `0.1`.                                                                  |
|                                |                                                                                                                                                                                                                              |                                                                                                                       |

## Bitwise operators

<AdvancedTopic
message={`Bitwise operators aren't used very often, but they are useful to understand`}>

A bitwise operator treats their operands as a set of 32 bits (zeros and ones),
rather than as decimal, hexadecimal, or octal numbers. For example, the decimal
number nine has a binary representation of `1001`. Bitwise operators perform
their operations on such binary representations, but they return standard
TypeScript numerical values.

The following table summarizes TypeScript's bitwise operators.

| Operator                                                                             | Usage     | Description                                                                                                              |
| ------------------------------------------------------------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------ | --- | ------------------------------------------------------------------------------------------------ |
| Bitwise AND                                                                          | `a & b`   | Returns a one in each bit position for which the corresponding bits of both operands are ones.                           |
| Bitwise OR                                                                           | `a        | b`                                                                                                                       |     | Returns a zero in each bit position for which the corresponding bits of both operands are zeros. |
| Bitwise XOR                                                                          | `a ^ b`   | Returns a zero in each bit position for which the corresponding bits are the same.                                       |
| [Returns a one in each bit position for which the corresponding bits are different.] |
| Bitwise NOT                                                                          | `~ a`     | Inverts the bits of its operand.                                                                                         |
| Left shift                                                                           | `a << b`  | Shifts a in binary representation b bits to the left, shifting in zeros from the right.                                  |
| Sign-propagating right shift                                                         | `a >> b`  | Shifts a in binary representation b bits to the right, discarding bits shifted off.                                      |
| Zero-fill right shift                                                                | `a >>> b` | Shifts a in binary representation b bits to the right, discarding bits shifted off, and shifting in zeros from the left. |

Bitwise operator examples

| Expression | Result | Binary Description                           |
| ---------- | ------ | -------------------------------------------- | ----- | ------------ |
| `15 & 9`   | `9`    | `1111 & 1001 = 1001`                         |
| `15        | 9`     | `15`                                         | `1111 | 1001 = 1111` |
| `15 ^ 9`   | `6`    | `1111 ^ 1001 = 0110`                         |
| `~15`      | `-16`  | `~00000000...00001111 = 11111111...11110000` |
| `~9`       | `-10`  | `~00000000...00001001 = 11111111...11110110` |
|            |        |

Bitwise shift operators

| Operator                            | Description                                                                                                                                                                                    | Example                                                                                                                                                                                                 |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Left shift (`<<`)                   | This operator shifts the first operand the specified number of bits to the left. Excess bits shifted off to the left are discarded. Zero bits are shifted in from the right.                   | `9<<2` yields `36`, because `1001` shifted 2 bits to the left becomes 100100, which is 36.                                                                                                              |
| Sign-propagating right shift (`>>`) | This operator shifts the first operand the specified number of bits to the right. Excess bits shifted off to the right are discarded. Copies of the leftmost bit are shifted in from the left. | `9>>2` yields `2`, because `1001` shifted 2 bits to the right becomes `10`, which is `2`. Likewise, `-9>>2` yields `-3`, because the sign is preserved.                                                 |
| Zero-fill right shift (`>>>`)       | This operator shifts the first operand the specified number of bits to the right. Excess bits shifted off to the right are discarded. Zero bits are shifted in from the left.                  | `19>>>2` yields `4`, because `10011` shifted `2` bits to the right becomes `100`, which is `4`. For non-negative numbers, zero-fill right shift and sign-propagating right shift yield the same result. |

</AdvancedTopic>

## Logical operators

Logical operators are typically used with Boolean (logical) values; when they
are, they return a Boolean value. However, the && and || operators return the
value of one of the specified operands, so if these operators are used with
non-Boolean values, they may return a non-Boolean value. The logical operators
are described in the following table.

| Operator                   | Usage                       | Description                                                                                                                                                                                      |
| -------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- | ------------------------------------------------------------------------- |
| Logical AND <pre>&&</pre>  | <pre>expr1 && expr2</pre>   | Returns `expr1` if it can be converted to `false`; otherwise, returns `expr2`. Thus, when used with Boolean values, `&&` returns `true` if both operands are `true`; otherwise, returns `false`. |
| Logical OR <pre>\|\|</pre> | <pre>expr1 \|\| expr2</pre> | Returns expr1 if it can be converted to true; otherwise, returns expr2. Thus, when used with Boolean values,                                                                                     |     | returns true if either operand is true; if both are false, returns false. |
| Logical NOT <pre>!</pre>   | <pre>!expr</pre>            | Returns false if its single operand that can be converted to true; otherwise, returns true.                                                                                                      |

---
