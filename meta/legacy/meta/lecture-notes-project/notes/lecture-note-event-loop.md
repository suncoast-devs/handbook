---
title: Event Loop
---

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
  statement // code to run
  }
  ```

  The keyword **for**, followed by some parentheses.
  Inside the parentheses we have three items, separated by semi-colons:

  An **initializer** — this is generally a variable that you assign a number that means the beginning of the loop.

  An **exit-condition** — this is generally **initializer** variable that you assign a number that means the end of the loop.

  A **final-expression** — It usually uses to increment the **initializer** variable, and it brings **initializer** variable closer to the **exit condition value**.

  A **statement** - It is inside the curly braces. This code will be run each time the loop iterates.

  In the following example, the sugarSpoon runs 5 times, with values of sugarSpoon 0 through 4.

```
for (let sugarSpoon = 0; sugarSpoon < 5; sugarSpoon++) {
  console.log('My cup of coffee has ' + sugarSpoon + ' sugar\' spoon(s)';
}
```

- **Do..While loop**
  The **do...while** statement repeats until a specified condition evaluates to false. A **do...while** statement looks as follows:

  ```
  do
  statement // code to run
  while (condition);
  ```

  A **statement** - this is always executed once before the **condition** is checked. If **condition** is true, the statement executes again. At the end of every execution, the **condition** is checked. When the **condition** is false, execution stops and control passes to the statement following **do...while**.

  In the following example, the do loop iterates at least once and reiterates until sugarSpoon is no longer less than 5.

  ```
  let sugarSpoon = 0;
  do {
  sugarSpoon += 1;
  console.log('My cup of coffee has ' + sugarSpoon + ' sugar\' spoon(s)');
  } while (sugarSpoon < 5);
  ```

- **While loop**
  The **while** loop executes a specified **statement** as long as the test condition evaluates to true. The **condition** is evaluated before executing the statement.

```
while (condition)
  statement
```

In the following example, the while loop iterates will run until sugarSpoon < 5.

```
let sugarSpoon = 0;

while (sugarSpoon < 5) {
  sugarSpoon++;
}
console.log('My cup of coffee has ' + sugarSpoon + ' sugar\' spoon(s)');
```

## Resource

https://developer.mozilla.org/en-US/
