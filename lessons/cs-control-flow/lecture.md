theme: Next, 1

<!-- prettier-ignore-start -->

# [fit] Control Flow

---

# Control Flow

Sequential lines of code are evaluated in a row.

To make decisions and take different paths we need `control flow`

---

# If Statements

Simplest of the `control flow` statements.

<br />

Basic structure:

```csharp
if (someBooleanCondition) {
  // Code to run if the condition is true
}
```

---

# If / Else statements

Can also handle the case when the condition is false

```csharp
if (someBooleanCondition) {
  // Code if the condition is true
}
else {
  // code if the condition is false
}
```

^ The part `someBooleanCondition` can be a `bool`ean variable or a condition that evaluates to a boolean value.

---

# Boolean Conditions

Examples of boolean conditions

| Kind                  | Example          |
| --------------------- | ---------------- |
| `equality`            | `name == "Paul"` |
| `inequality`          | `name != "Paul"` |
| `greater than`        | `score > 90`     |
| `less than`           | `score < 60`     |
| `greater or equal to` | `score >= 90`    |
| `less or equal to`    | `score <= 60`    |

---

# Example

```csharp
if (name == "Paul") {
  Console.WriteLine("Greetings!");
} else {
  Console.WriteLine("Wait, who are you?");
}
```

---

# Multiple Booleans: `Or`, `And`

Combine two conditions.

`Or` is written as `||` while `And` is written as `&&`

[.column]

Condition that is true if the score is lower than `20` **OR** greater than `90`:

```csharp
if (score < 20 || score > 90) {
  // Some code here
}
```

[.column]

Condition that is true if the person is named `Paul` **AND** the score is more than `85`:

```csharp
if (name == "Paul" && score > 85) {
  // Some code here
}
```

---

# Truth Table

[.column]

`A && B`

| A   | B   | Result |
| --- | --- | ------ |
| T   | T   | T      |
| T   | F   | F      |
| F   | T   | F      |
| F   | F   | F      |

[.column]

`A || B`

| A   | B   | Result |
| --- | --- | ------ |
| T   | T   | T      |
| T   | F   | T      |
| F   | T   | T      |
| F   | F   | F      |

^ Don't memorize these, but if you can remember them it will help you write better `if` statements

---

# Chaining

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

---

# [fit] We can do better

<br />

## Introducing `switch`

---

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

---

# Other neat `switch` features

We can handle multiple values by repeating the `case` statement:

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

---

# Case conditionals

Let's say we are working with an `int` variable named `score` and we wanted to
print a grade associated to a score.

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

---

# [fit] What about repeating code?

## What about repeating code?

### What about repeating code?

#### What about repeating code?

#### 🐢🐢🐢🐢🐢🐢🐢🐢

---

# [fit] Loops

---

# [fit] `while`

---

# While

The `while` statement repeats the code inside the `{ }` braces as long as the condition supplied remains true.

<br />

[.column]

Ask the the user their name and greet them until the user enters the text `quit`. The code would look like this:

[.column]

```csharp
Console.Write("What is your name? ");
var name = Console.ReadLine();

while (name != "quit") {
  Console.WriteLine($"Hello {name}");

  Console.Write("What is your name? ");
  name = Console.ReadLine();
}
```


<!-- prettier-ignore-end -->
