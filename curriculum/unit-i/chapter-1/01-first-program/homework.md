# Variables, Variables, and Variables

# Let's get started

Today, we are starting our journey into development. This journey has to start somewhere. For this assignment, you will be making a program that demonstrates some programming fundamentals.

## Objectives

- Ensure your development environment is setup
- Practice creating variables
- Practice working with user input

## Requirements

This should have been done in class, but make sure your [laptop is set up and ready to go](https://suncoast.io/handbook/tools/environment/).

All your code should place inside the `static void Main(string args[])`

### Explorer Mode

- [ ] Create a new `sdg-console` app that does the following.

  - Create a variable (use your best judgment for type) that stores the `numberOfCupsOfCoffee` that you drink every day
  - Create a variable (use your best judgment for type) called `fullName` and set it equal to your full name.
  - Create a variable (use your best judgment for type) call `today` and set it equal to today's date.
  - using your variables, `numberOfCupsOfCoffee`, `fullName`and `today`, Console.WriteLine out all three on one line.
  - Ask the user for their name and store it in a variable called 'user'.
  - Print out a greeting to the user, using their name
  - Ask the user to input two numbers
  - Get the numbers as Strings using `Console.ReadLine`
  - Convert a String to a double using [double.parse](https://docs.microsoft.com/en-us/dotnet/api/system.double.parse?view=netcore-3.1). Save the first double value in an `operand1` variable and the second double value in an `operand2` variable
  - Add the operands and save in a `sum` variable
  - Subtract the operands and save in a `difference` variable
  - Divide the operands and save in a `quotient` variable
  - Multiply the operands and save in a `product` variable
  - Find the remainder when one operand is divided by the other and save in a `remainder` variable. See [this page](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/arithmetic-operators#remainder-operator-) if you need to learn more about the modulo operator.
  - print all the results to the screen in a meaningful way.

### Adventure Mode

- [ ] Some logic to your program that prints our a special message for a user with the of `Alice`
- [ ] Use the type [DateTime](https://docs.microsoft.com/en-us/dotnet/api/system.datetime?view=netcore-3.1) to represent today.

### Epic Mode

- [ ] Move all of your logic to separate file and Call it from the `Main` method

## Additional Resources

- env setup
- [Full dotnet lecture notes](/handbook/curriculum/back-end/full-stack-i/lecture/dotnet/01-intro-to-c-sharp)
- [Types and variables](https://docs.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/types-and-variables)

## Reading Material

- [Microsoft intro to C#](https://docs.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/)
