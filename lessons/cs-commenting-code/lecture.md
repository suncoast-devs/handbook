theme: Next, 1

<!-- prettier-ignore-start -->

# Documenting what we do

Hopefully our code is understandable only from reading what is there. We often, however, need to describe the process our code is following or require additional details about how our code works.

Just as with using good variable names, clarity of code comments help us. Remember that code is **written once** but **read many times**.

For this we can use **`comments`** in our code.

---

# Commenting code in `C#`

```csharp
// This is the name of our ship
var shipName = "Heart of Gold";

// We need to know how many characters there are in order to center the text on the screen.
var characterCount = shipName.length;

/*
  Build a Turboencabulator

  The original machine had a base plate of pre-famulated amulite
  surmounted by a malleable logarithmic casing in such a way that
  the two spurving bearings were in a direct line with the panametric
  fan. The latter consisted simply of six hydrocoptic marzlevanes, so
  fitted to the ambifacient lunar waneshaft that side fumbling was
  effectively prevented.
*/
```

---

# Editor support

Nearly every editor has support for adding and removing comments for both single lines of text as well as blocks.

In Visual Studio Code you can start a comment with the key `Control /` (or `Command /` on Mac) on any line.

This will start a new comment and you can type your text. If you press enter the cursor will make a new comment line.

You can toggle comments by highlighting the lines and pressing the commenting key combination.

---

# [fit] Thoughts on commenting out code

As you write code you'll be tempted to "comment out" code. That is, take one or more lines of code and place them inside a comment.

This is natural and often done during development. We'd like you to adhere by one guideline:

> Don't commit commented out code to your git repository

^ The idea here is that commenting out code should be a development-time
activity. Never publish/share/commit files that have commented out code.

---

<!-- prettier-ignore-end -->
