---
title: The Basics
order: 2
---

JavaScript programs are made up from a series of instructions called
`statements`. These instructions are read by the computer (the browser) from the
top to the bottom and from left to right.

In many JavaScript programs you will see that each statement ends with a
semicolon (`;`). While not absolutely necessary, some teams will use this style.
At SDG we follow a style where the semicolons are not required. In fact we
recommend you use an automatic code formatter named
[Prettier](https://prettier.io/) which will ensure proper style.

Each line of code represents a single idea. Even though our computers _seem_
smart, computers are simple machines that really only understand 1 very simple
command at a time. The advantage that computers have over people is that they
run those simple commands _really_ fast.

Most of what we do when we write code is one of two actions: storing data or
manipulating data. Let's start with storing data.

## Comments

When writing code we can leave comments to document the code. This helps remind
the author, or other readers, to the purpose of the code.

Comments look like this:

```javascript
// This is a single line comment

/* This is a longer comment

that spans multiple lines
*/
```

Comments behave like whitespace and are discarded during script execution.
