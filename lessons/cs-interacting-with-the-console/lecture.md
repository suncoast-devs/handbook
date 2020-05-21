theme: Next, 1

<!-- prettier-ignore-start -->

# [fit] Interacting with the console

---

# Interacting with the console

- Computers, and thus software, are good at accepting input, processing it, and producing new information.
- The applications we write in this program will certainly fit that pattern.
- With our first programs we'd like to interact with the user directly in our shell.

^ In other lessons we will learn to interact with the user via an API and via a web page.

---

[.column]

# Example

[.column]

![inline scale](../../interacting.gif)

^ We'd like our programs to be able to input information and then be able to
output information. Like asking for a name and then greeting the user.

---

# [fit] Sending information to the console

- Interactions with the console use the `Console` class. In a different lesson we will cover classes. <sub>For now know that a class can be a collection of code.</sub>
- We will use a few different statements:
  - **`Console.WriteLine()`**
  - **`Console.Write()`**
  - **`Console.ReadLine()`**

---

# [fit] Outputting to the console one line at a time

```csharp
Console.WriteLine("Welcome to my program");
```

<br />
<br />

> This will output one line to the console and move the cursor to the next line. Further output will be on it's own line.

---

# [fit] Outputting a blank line

```csharp
Console.WriteLine("");
```

---

# [fit] Output text but do **not** move the cursor to the next line

[.column]

To leave the cursor on the **same** line as the text use **`Console.Write`**.

In this case the cursor remains in place after the last character of our output.
In this case we leave a blank space.

[.column]

```csharp
Console.Write("What is your name? ");
```

---

# [fit] Reading information from the console

[.column]

To read information we use **`Console.ReadLine()`**

This pauses our program for the user to type in text and press **`ENTER`**.

Assign to a **`string`** variable we place on the left-hand-side.

[.column]

```csharp
var name = Console.ReadLine();
```

---

# [fit] Outputting information containing a variable

---

## First print out the fixed text

### But don't move the cursor to the next line yet

[.code-highlight: 1]

```csharp
Console.Write("It is a pleasure to meet you,");
Console.WriteLine(name);
```

---

## Then print out the variable

### And move the cursor to the next line

[.code-highlight: 2]

```csharp
Console.Write("It is a pleasure to meet you,");
Console.WriteLine(name);
```

---

# [fit] We can do better

![inline](./assets/back-to-the-future.gif)

---

# [fit] Strings can be added together!

<br />
<br />

```csharp
var greeting = "It is a pleasure to meet you, " + name;
Console.WriteLine(greeting);
```

---

## [fit] Avoid writing the variable

Since we create the **`greeting`** variable just to use it once we can get rid of it.

<br />
<br />

```csharp
Console.WriteLine("It is a pleasure to meet you, " + name);
```

---

## [fit] Avoid the `+` string addition

This pattern of using a variable along with a string is so common `C#` gives us a way to do this right inside the string!

### String interpolation

If we put a **`$`** before our first _double quote_ the string gains **magic powers**.

---

# [fit] String interpolation

```csharp
$"It is a pleasure to meet you, {name}"
```

Inside a string with the **`$`** powers we can place `{}` inside the string. Anything inside the string is considered code.

Whatever that code _evaluates_ to is placed at that spot in the string!

```csharp
$"My favorite number is {6 * 7}";
```

---

# [fit] Using string interpolation

<br />
<br />

```csharp
Console.WriteLine($"It is a pleasure to meet you, {name}");
```

---

# Full program

```csharp
using System;

namespace OurDotNetApp
{
  class Program
  {
    static void Main(string[] args)
    {
      Console.WriteLine("Welcome to my program");
      Console.WriteLine("\n");

      Console.Write("What is your name? ");
      var name = Console.ReadLine();

      Console.WriteLine($"It is a pleasure to meet you, {name}");
    }
  }
}
```

<!-- prettier-ignore-end -->
