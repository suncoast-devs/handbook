# First Bank of Suncoast

For this assignment, you will be creating your own personal bank account manager. You will be creating an app that will let you track both a savings account and a checking account total by performing transactions, such as withdrawals, deposits and transfers. The application will also save your information in a file so you can track your account totals over time.

## Objectives

- Practice control structures.
- Practice data structures.
- Practice working with user data.
- Practice with LINQ.
- Practice with OOP concepts.
- Practice working with files.

## Requirements

Create a console app that allows a user to manage a savings account.

As user should be able to make a deposit to each of their accounts, a withdrawal from each of their accounts, and transfer money between accounts.

The account information should be stored in a file, using a `JSON` or `CSV` format to record the data.

### Explorer Mode

- [ ] As a user I should be able see the totals in my saving and checking account when the program first starts.
- [ ] Never allow withdrawing or depositing more money than allowed. That is, we cannot allow our accounts to go negative.
- [ ] When prompting for an amount to deposit or withdraw always ensure the amount is positive.
- [ ] As a user I should be able to deposit funds to my savings account.
- [ ] As a user I should be able to deposit funds to my checking account.
- [ ] As a user I should be able to withdraw funds to my savings account.
- [ ] As a user I should be able to withdraw funds to my checking account.
- [ ] As a user I should be able to transfer funds from my checking account to my savings account.
- [ ] As a user I should be able to transfer funds from my savings account to my checking accounts.
- [ ] As a user I should be abel to ask for my account balances.
- [ ] The app should write my transactions to a file using a standard format. This writing should happen after every transaction.
- [ ] The app should load past transaction from a file at start up.

### Adventure Mode

- [ ] Add the ability to have multiple users. There are many steps to take here, so really take the time to plan out the changes needed. This includes changes to the interface as well as changes to how you store the data.

### Epic Mode

- [ ] Go back and work on the either .net-iterations, koans, or function-junction

- [ ] Add a simple password protection to your user's accounts

* [ ] Eventually we will be using a [MVC application structure](https://dotnet.microsoft.com/apps/aspnet/mvc). To prepare for this, refactor your code to have all your business logic in separate class, called `ParkService` and all your console interaction in the main class.

* [ ] Your data is currently stored in a file. This is nice, but doesn't scale well. On Monday, we starting to explore something called SQL. [Update your code to use a database instead of a file](https://suncoast.io/handbook/curriculum/back-end/full-stack-i/lecture/dotnet/04-entity-framework/).

## Additional Resources

- .NET

  - [.NET Documentation](https://docs.microsoft.com/en-us/dotnet/)
  - [Lecture Notes](https://suncoast.io/handbook/curriculum/back-end/full-stack-i/lecture/dotnet)

- [CsvHelper](https://joshclose.github.io/CsvHelper/getting-started)

## Preview

- Next, we start learning SQL. [Read this as a preview](https://suncoast.io/handbook/curriculum/back-end/full-stack-i/lecture/sql/intro-to-sql/)
