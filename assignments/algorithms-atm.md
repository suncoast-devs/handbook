---
title: ATM
tags: ['algorithms']
---

Congratulations, the First Bank of Suncoast hired you to create a new ATM system. You'll be designing the algorithm the programmers will follow when writing the software for the machine.

## Objectives

- Continue working with algorithmic thinking.

## Requirements

Write your answers in a _text_ file on your computer. If you have `Visual Studio Code` installed, feel free to use it. Otherwise, use `Notepad` or `TextEdit`.

### ATM Features and Questions

- If the machine is inactive, display a sequence of three images.
- If the machine is inactive, allow a user touch to stop showing the images and begin the logic below.
- Users must insert their card at some point. When to insert the card? When to give back the card?
- What should the ATM do if the account doesn't exist or the card is invalid?
- What should the ATM do if the user enters an incorrect PIN?
- What should the ATM do if the user CONTINUES to enter an incorrect PIN? At some point, the ATM should stop allowing this.
- The ATM should support working with the user's checking account as well as their savings account.
- User can do one task
  - Withdraw cash
  - Deposit cash
  - Print balance
- When withdrawing cash, the ATM needs to handle these cases:
  - Insufficient funds
  - Not enough funds to complete the request
- When complete, ask the user if they want a receipt or not
  - If the user wants a receipt, print including new balances

### Explorer Mode

Write an algorithmic description of the above features. Be as specific and detailed as you can. For instance, for the requirement `If the machine is inactive, display a sequence of three images.` and `allow a user touch to stop showing the images...` you might write something like:

```
Step 1: Display Image 1
Step 2: If the user touched the screen go to Step 8
Step 3: Display Image 2
Step 4: If the user touched the screen go to Step 8
Step 5: Display Image 3
Step 6: If the user touched the screen go to Step 8
Step 7: Go to step 1
Step 8: .......
```

- Yes, be _THAT_ specific. The more specific you focus on this, the better your algorithm skills will be.
- As a general note, take your first draft and then see if you can be **twice** as detailed (twice the number of steps).

### Adventure Mode

- Change your algorithm to allow the user to perform many withdrawal and deposit tasks.
- How, and how much, did this change your algorithm?
