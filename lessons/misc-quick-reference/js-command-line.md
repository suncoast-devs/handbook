---
title: JavaScript on the Command Line
---

You can run non-browser-specific JavaScript code from the command line using the
`node` runtime.

## Running `node` to interactively run JavaScript

If you simply run `node` at the command line, you will be in a REPL
(`Read Evaluate Print Loop`), and you can type JavaScript code that is evaluated
as you type. This is much like the `Console` tab in your browser's developers
tools.

```shell
node
```

To **exit** this mode, press `Control-D`.

## Running an existing script

If you have a script such as `program.js`, you can run it via:

```shell
node program.js
```

Your code in `program.js` will be executed and will run until the program
experiences an unhandled exception or the script terminates.

## Passing arguments to the script

If your script needs information from the user, they can specify it on the
command line.

Let's say your program intends to add two numbers together, and you'd like them
to input those on the command line:

```shell
node program.js 999 42
```

When your program runs, each space-separated option from the command line is
available as an array: `process.argv`

```javascript
// process.argv[0] will be node
// process.argv[1] will be the name of your script file
// process.argv[2] will be the first real argument the user supplies, and so on

const firstNumberToAdd = parseInt(process.argv[2])
const secondNumberToAdd = parseInt(process.argv[3])
console.log(`The answer is ${firstNumberToAdd + secondNumberToAdd}`)
```
