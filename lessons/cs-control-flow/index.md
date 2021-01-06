---
title: Control Flow in C#
assignments:
  - cs-all-cards-on-deck
---

If we just write lines of code one after another in our code we would have no
way to make decisions and take different paths in our code. To allow us this
flexibility we have the idea of `flow control` statements.

The first and more simple of these is the `if` statement.

## If

The if statement has this basic structure:

```csharp
if (someBooleanCondition) {
  // Code if the condition is true
}
```

We can also handle the case where the condition is false:

```csharp
if (someBooleanCondition) {
  // Code if the condition is true
}
else {
  // code if the condition is false
}
```

The part `someBooleanCondition` can be a `bool`ean variable or a condition that
evaluates to a boolean value.

## Boolean Conditions

Here are some examples of statements that result in a boolean value. As you can
see we can compare strings to other strings, and numbers to other numbers.

| Kind                  | Example          |
| --------------------- | ---------------- |
| `equality`            | `name == "Paul"` |
| `inequality`          | `name != "Paul"` |
| `greater than`        | `score > 90`     |
| `less than`           | `score < 60`     |
| `greater or equal to` | `score >= 90`    |
| `less or equal to`    | `score <= 60`    |

Examples:

```csharp
if (name == "Paul") {
  Console.WriteLine("Greetings!");
} else {
  Console.WriteLine("Wait, who are you?");
}
```

## Boolean Or, Boolean And

We can combine two conditions using a boolean _or_ and a boolean _and_. In `C#`
we write an _or_ as `||` with _and_ being `&&`

So if we wanted a condition that is true if the score is lower than `20` **OR**
greater than `90`:

```csharp
if (score < 20 || score > 90) {
  // Some code here
}
```

What if we wanted a condition that is true if the person is named `Paul` **AND**
the score is more than `85`:

```csharp
if (name == "Paul" && score > 85) {
  // Some code here
}
```

As you can see we can have conditions on different types together. This is
because _each part_ of the boolean statement results in a boolean and then these
are combined.

The following `truth tables` show the various combinations of `true` and `false`
values and how they combine for `&&` (and) as well as `||` (or):

### A && B

| A   | B   | Result |
| --- | --- | ------ |
| T   | T   | T      |
| T   | F   | F      |
| F   | T   | F      |
| F   | F   | F      |

### A || B

| A   | B   | Result |
| --- | --- | ------ |
| T   | T   | T      |
| T   | F   | T      |
| F   | T   | T      |
| F   | F   | F      |

## Chaining if statements

A series of `if/else` statements can be chained.

```csharp
if (name == "Paul") {
  Console.WriteLine("Here");
} else if (name == "Dorothy") {
  Console.WriteLine("Also here");
} else if (name == "Sam") {
  Console.WriteLine("Here again");
} else {
  Console.WriteLine("Didn't find anything");
}
```

## Cleaning up a long sequence of if/else

When we find ourselves comparing the same variable to a sequence of values we
can use another kind of control flow known as a `switch` statement.

```csharp
switch (name)
{
    case "Paul":
        Console.WriteLine("Here");
        break;
    case "Dorothy":
        Console.WriteLine("Also Here");
        break;
    case "Sam":
        Console.WriteLine("Here Again");
        break;
    default:
        Console.WriteLine("Didn't find anything");
        break;
}
```

The `switch` statement is a cleaner way of writing this type of control flow. It
also comes with some additional neat features.

For instance we can handle multiple values by repeating the `case` statement:

```csharp
switch (name)
{
    case "Paul":
    case "Peter":
    case "Mary":
        Console.WriteLine("Here");
        break;
    case "Dorothy":
        Console.WriteLine("Also Here");
        break;
    case "Sam":
        Console.WriteLine("Here Again");
        break;
    default:
        Console.WriteLine("Didn't find anything");
        break;
}
```

In this code we will see the message `Here` for `name` if it is either `Paul`
**OR** `Peter` **OR** `Mary`

Let's say we are working with an `int` variable named `score` and we wanted to
print a grade associated to a score.

We can use the ability of the `case` statement to allow us to use conditionals
to compare the score to a value. Here we are using both `<` and `>=` in these
comparisons.

```csharp

var score = 95;

switch (score)
{
    case < 65:
        Console.WriteLine("F");
        break;
    case < 70:
        Console.WriteLine("D");
        break;
    case < 80:
        Console.WriteLine("C");
        break;
    case < 90:
        Console.WriteLine("B");
        break;
    case >= 90:
        Console.WriteLine("A");
        break;
    default:
        Console.WriteLine("Hmmm, I don't recognize this score");
        break;
}
```

## Repeating code

So far all of the control flow we've seen keeps our code processing line-by-line
and proceeding to the end of the code. What if we want to repeat some code?

This is where a _loop_ style control flow helps us. The first we will see is the
`while` statement.

The `while` statement repeats the code inside the `{ }` braces as long as the
condition supplied remains true.

Lets say we want to ask the the user their name and greet them until the user
enters the text `quit`. The code would look like this:

```csharp
Console.Write("What is your name? ");
var name = Console.ReadLine();

while (name != "quit") {
  Console.WriteLine($"Hello {name}");

  Console.Write("What is your name? ");
  name = Console.ReadLine();
}
```
