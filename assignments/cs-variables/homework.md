---
title: Variables, Variables, and Variables
---

# Let's get started

Today, we are starting our journey into development. This journey has to start
somewhere. For this assignment, you will be making a program that demonstrates
some programming fundamentals.

## Objectives

- Ensure your development environment is setup
- Practice creating variables
- Practice working with user input

## Requirements

Make sure you have followed the
[setup instructions](/lessons/cs-environment-setup) for your computer's
operating system

Follow [this guide](/lessons/cs-how-to-crete-and-run-programs) to review how to
create and run `C#` applications

All your code should place inside the `static void Main(string args[])`

### Explorer Mode

- [ ] Create a new app that does the following.

  - Practice Creating Variables

    - Create a variable (use your best judgment for type) that stores the
      `numberOfCupsOfCoffee` that you drink every day.
    - Create a variable (use your best judgment for type) called `fullName` and
      set it equal to your full name.
    - Create a variable (use your best judgment for type) call `today` and set
      it equal to today's date.
    - Use `Console.WriteLine` and your variables, `numberOfCupsOfCoffee`,
      `fullName`and `today`, to output all three on one line.

  - Practice Getting Input From the User

    - Ask the user for their name and store it in a variable named `userName`.
    - Print out a greeting to the user, using their name.

  - Practice Getting Different Types of Input From the User

    - Ask the user to input two numbers.
    - Get the numbers as `string`s using `Console.ReadLine`, store them in
      variables named `firstNumberAsString` and `secondNumberAsString`

  - Converting String Input Into Numbers

    - Convert each `string` above to a `double` using
      [Double.parse](https://docs.microsoft.com/en-us/dotnet/api/system.double.parse?view=netcore-3.1).
      Save the first value in variable named `firstOperand` and the second value
      in a variable named `secondOperand`.

  - Doing Math

    - Add the operand variables from above and save the results into a variable
      named `sum`.
    - Subtract the operand variables and save the results in a variable named
      `difference`.
    - Divide the operand variables and save the results in a variable named
      `quotient`.
    - Multiply the operand variables and save in results in a variable named
      `product`.
    - Find the remainder when one operand is divided by the other and save the
      results in a variable named `remainder`. See
      [this page](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/arithmetic-operators#remainder-operator-)
      if you need to learn more about the modulo operator.
    - Use `Console.WriteLine` to present the user, in a meaningful way, each the
      values of your `sum`, `difference`, `quotient`, `product` and `remainder`
      variables.

### Adventure Mode

- Using Logic
  - [ ] Add some _logic_ to your program that prints a different, special,
        greeting to the user if their name happens to be `Alice`.
- Using Advanced Types
  - [ ] Use the type
        [DateTime](https://docs.microsoft.com/en-us/dotnet/api/system.datetime?view=netcore-3.1)
        to represent the data variables.

### Epic Mode

- [ ] Move all of your code to separate file and invoke it from the `Main`
      method.

## Additional Resources

- [Types and variables](https://docs.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/types-and-variables)

## Reading Material

- [Microsoft intro to C#](https://docs.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/)
