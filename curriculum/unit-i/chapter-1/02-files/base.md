The goal of this assignment is to create a banking system that allows any number of users to create any number of bank accounts and perform transactions on those bank accounts (including withdrawal, deposits and transfers).
The banking system will also save each user’s bank account information to file, so that when they come back their account information will be retrieved automatically.

### The Bank

- The bank class needs to have a list of customers
- Each customer needs to have a list of bank accounts
- The bank also has a name, methods to add customers, add bank accounts and get the total amount of money on deposit at the bank

### Basic Flow

- Ask the user for their name (this will all be on a first name basis)
- If there is already a “bank file” for this user, retrieve their account information and display it to them
- If this is a new user, ask them to create their first account
- When you ask a user to create an account, give them 3 choices for the type of account they’re creating: checking, savings, retirement
  (Note: a user may have more than one account of one type)
- Let the user choose what account to use
- For each account, let the user withdraw, deposit and transfer money
- Always allow the user to exit out of the “use account” menu and back to the “select account” menu
- The “select account” menu should also have an option to create a new account

### Saving the bank information

There will be multiple files to support this banking system:

- “bank.txt” will have the list of customer names (again, we’re on a first name basis) who have accounts at this bank
- “customer-name-accounts.txt” will have all the accounts for the customer with a first name of “customer-name”
  Hint 1: bank.txt can have the list of customer names on a single line, separated by “,”:

```
James,Ruth,David,Ellie,Gisele
```

Your code can then read that file, use the `split()` method in the `String` class to parse the list of names, and then use each name to get the right account file and read its information
Hint 2: Your account file will look something like this:

```
account.name=checking
account.initBalance=10.00
account.currentBalance=25.00
account.name=savings
account.initBalance=20.00
account.currentBalance=15.00
account.name=retirement
account.initBalance=100.00
account.currentBalance=250.00
```

You will have a loop to read it, so that you can read as many accounts as there are in the file (there could be more than one based on the number of accounts that customer has).

### Gracefully Handle Exceptions

Your program doesn’t need to handle every bad user input, but you should incorporate exception handling in at least two places (Hint 3: one of these places will be when you are reading files). Try to recover from some types of bad inputs.

#### Getting Started

This is the most complicated Java code you will have written with TIY - take it step-by-step! Spend some time writing it out in your own terms, and mapping out which component and/or technique you may want to use for each section.
