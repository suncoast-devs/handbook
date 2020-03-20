# First Bank of Suncoast

For this assignment, you will be creating your own personal bank account manager. You will creating an app that will let you track a savings and a checking account total by performing transactions, such as withdrawal, deposits and transfer. This will save your information in a file so you can track your account totals over time, automatically.

## Objectives

- Practice control structures
- Practice data structures
- Practice working with user data
- Practice with LINQ
- Practice with OOP concepts
- Practice working with files

## Requirements

Create a console app that allows a user to manage a savings account.

As user should be able to make a deposit to each of their account, a withdrawal from each of their account, and transfer money between accounts.

The account information should be stored in a file, using a `JSON` or `CSV` format to record the data.

### Explorer Mode

- [ ] As a user I should be able see the totals in my saving and checking account when the program first starts
- [ ] As a user I should be able to deposit funds to my savings account
- [ ] As a user I should be able to deposit funds to my checking account
- [ ] As a user I should be able to withdraw funds to my savings account
- [ ] As a user I should be able to withdraw funds to my checking account
- [ ] As a user I should be able to transfer funds from my checking account to my savings account
- [ ] As a user I should be able to transfer funds from my savings account to my checking accounts
- [ ] The app should save my transactions to file using a standard format. This saving should happen after every transaction
- [ ] The app should load up past transaction from a file on start up.

### Adventure Mode

- [ ] Add the ability to have multiple user. There are many steps to take here, so really take the time to plan out the changes needed as well. This includes changes to the interface as well as changes to how you store the data.

### Epic Mode

- [ ] Go back and work on the either .net-iterations, koans, or function-junction

- [ ] Add a simple password protection to your user's accounts

* [ ] Eventually we will be using a [MVC application structure](https://dotnet.microsoft.com/apps/aspnet/mvc). To prepare for this, refactor your code to have all your business logic in separate class, called `ParkService` and all your console interaction in the main class.

* [ ] Your data is currently stored in a file. This is nice, but doesn't scale well. On Monday, we starting to explore something called SQL. [Update your code to use a database instead of a file](https://suncoast.io/handbook/curriculum/back-end/full-stack-i/lecture/dotnet/04-entity-framework/).

## Additional Resources

- .NET

  - [.NET Documentation](https://docs.microsoft.com/en-us/dotnet/)
  - [Lecture Notes](https://suncoast.io/handbook/curriculum/back-end/full-stack-i/lecture/dotnet)

## Preview

- Next, we start learning SQL. [Read this as a preview](https://suncoast.io/handbook/curriculum/back-end/full-stack-i/lecture/sql/intro-to-sql/)
