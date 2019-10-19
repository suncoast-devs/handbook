# Event Loop

JavaScript has event loops that are responsible for executing the codes repeatedly. An example life of loop could be when you put **n** sugar' spoons in your cup of coffee until your coffee is enough sweet to go back to code.

## Learning Objectives

- Understand how to work an For loop.
- Understand how to work an Do loop.
- Understand how to work an While loop.

## Recommended Previous Knowledge

There is no previous knowledge required.

## Notes

- **For loop**
  A **for** loop repeats until a specified condition evaluates to false. This has the following syntax:

  ```
  for (initializer; exit-condition; final-expression) {
  // code to run
  }
  ```

  The keyword **for**, followed by some parentheses.
  Inside the parentheses we have three items, separated by semi-colons:

  An **initializer** — this is usually a variable set to a number, which is incremented to count the number of times the loop has run. It is also sometimes referred to as a counter variable.
  An **exit-condition** — as mentioned before, this defines when the loop should stop looping. This is generally an expression featuring a comparison operator, a test to see if the exit condition has been met.
  A **final-expression** — this is always evaluated (or run) each time the loop has gone through a full iteration. It usually serves to increment (or in some cases decrement) the counter variable, to bring it closer to the exit condition value.
  Some curly braces that contain a block of code — this code will be run each time the loop iterates.

  In the following example, the sugarSpoon runs 5 times, with values of sugarSpoon 0 through 4.

```
for (let sugarSpoon = 0; sugarSpoon < 5; sugarSpoon++) {
  console.log('My cup of coffee has ' + sugarSpoon + 'spoon(s) of sugar');
}
```

- **Do..While loop**
  The **do...while** statement repeats until a specified condition evaluates to false. A **do...while** statement looks as follows:

  ```
  do
  statement  // code to run
  while (condition);
  ```

  **statement** is always executed once before the condition is checked. If condition is true, the statement executes again. At the end of every execution, the condition is checked. When the condition is false, execution stops and control passes to the statement following **do...while**.

  In the following example, the do loop iterates at least once and reiterates until sugarSpoon is no longer less than 5.

  ```
  let sugarSpoon = 0;
  do {
  sugarSpoon += 1;
  console.log('My cup of coffee has ' + sugarSpoon + 'spoon(s) of sugar');
  } while (sugarSpoon < 5);
  ```
