import CodePen from '@handbook/CodePen'

# Basics

JavaScript programs are made up from a series of instructions called `statements`. These instructions are read by the computer (the browser) from the top to the bottom and from left to right.

In many JavaScript programs you will see that each statement ends with a semicolon (`;`). While not absolutely necessary, some teams will use this style. At SDG we follow a style where the semicolons are not required. In fact we recommend you use an automatic code formatter named [Prettier](https://prettier.io/) which will ensure proper style.

When writing code we can leave comments to document the code. This helps remind the author, or other readers, to the purpose of the code.

Comments look like this:

```js
// This is a single line comment

/* This is a longer comment

that spans multiple lines
*/
```

Comments behave like whitespace and are discarded during script execution.

## Variables

In JavaScript we store information in `variables.` Variables are names we assign to store a value so that we can refer to it later.

The names of variables, called identifiers, conform to certain rules.

A JavaScript identifier must start with a letter, underscore (`_`), or dollar sign (`$`); subsequent characters can also be digits (`0-9`). Because JavaScript is case sensitive, letters include the characters "`A`" through "`Z`" (uppercase) and the characters "`a`" through "`z`" (lowercase). Some examples of legal names are `Number_hits`, `temp99`, `$credit`, and `_name`.

There are four ways we can assign a variable in JavaScript

|                   |                                                                                 |
| ----------------- | ------------------------------------------------------------------------------- |
| `var`             | Declares a variable, optionally initializing it to a value.                     |
| `let`             | Declares a block-scoped, local variable, optionally initializing it to a value. |
| `const`           | Declares a block-scoped, read-only named constant.                              |
| undeclared global | Without var, let, or const, we create a global variable                         |
|                   |                                                                                 |

`undeclared global` variables are highly discouraged as they can often lead to unexpected behavior. In our coding we will always use `var`, `let`, or `const.` In fact, in modern JavaScript we will restrict our usage to `let` and `const.`

`const` variables are assigned a value on the same statement where they are declared. They can also not be re-assigned at a later date.

```js
const answer = 42;
```

The value of this variable cannot be changed.

`let` versus `var` -- These are both ways to declare variables which can be changed. The difference between these two ways of declaring a variable have to do with `scope.` We haven't discussed `scope` yet, so for now we will limit ourselves to using the `let` style of declaring variables.

```js
let score = 98;
```

The value of the `score` variable can be changed at a later time. That is, we can increment it, decrement it, or change it to any other value we like.

**Variables without assigned values**

When declaring a variable with `let` we do not have to specify a value. After declaring a variable but before assigning it a value, the variable will contain a special value known as `undefined`

```js
let name;
// name contains 'undefined'

name = "Jane";
// name now contains the value 'Jane'
```

Most of the time we are able to declare a variable and assign a value at the same time. However, it is sometimes useful to declare the variable and assign it's value later. Once we introduce conditions and functions we will see cases of this.

---
