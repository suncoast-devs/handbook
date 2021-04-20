---
title: Creating Methods in C#
assignments:
  - cs-all-cards-on-deck
---

When adding functionality it is easy to continue to add more lines to existing
code. While the computer has no issues with this it does pose a few issues for
us, the developer.

- Long sequences of lines of code are like a run on sentence in prose.
- A long sequence of code obscures the meaning of the code by representing many
  ideas in sequence, or perhaps all mixed together. This is often called
  [spaghetti code](https://en.wikipedia.org/wiki/Spaghetti_code).
- It is difficult to discuss long sequences of code. For instance, when asking
  for help you'd have to say "Somewhere between lines 42 and 385, there is a
  problem"
- Smaller sequences of code allow for easier debugging
- Smaller sequences of code are easier to change (refactor)

## Methods as a Way to Organize Code

In another lesson, we will delve deeper into a coding concept named
`Don't Repeat Yourself`, or `DRY`, for short. One part of this concept is that
there should be a _single_ place in your code where each business logic is
represented.

## Methods: Input, Work and Output

Nearly everything in programming requires at least three things:

1. Input
1. The work to do
1. Output

You will find this is true even of every day things. Take, for example, the task
of making a peanut butter and jelly sandwich.

```
-----------------              -----------------
|     Inputs    |              |    Work       |               --------------
-----------------              -----------------               |   Output   |
| Peanut Butter |              | List of steps |               --------------
| Jelly         |    =====>    | to make the   |    ========>  | Sandwich   |
| Bread         |              | sandwich      |               |            |
| Knife         |              |               |               --------------
-----------------              -----------------
```

`C#` has a specific way to define functions, but each one will always have
input, work to do, and output.

## Examples

```csharp
using System;

namespace EmployeeDatabase
{
  class Program
  {
    static void Main(string[] args)
    {
      Console.WriteLine("----------------------------------------");
      Console.WriteLine("    Welcome to Our Employee Database    ");
      Console.WriteLine("----------------------------------------");
      Console.WriteLine();
      Console.WriteLine();

      Console.Write("What is your name? ");
      var name = Console.ReadLine();

      Console.Write("What is your department number? ");
      var department = int.Parse(Console.ReadLine());

      Console.Write("What is your yearly salary (in dollars)? ");
      var salary = int.Parse(Console.ReadLine());

      var salaryPerMonth = salary / 12;
      Console.WriteLine($"Hello, {name} you make {salaryPerMonth} dollars per month.");
    }
  }
}
```

Ok, so this program isn't really a database yet (we don't store the information)
and it doesn't do very much, but it does help us see some places where we might
start making some methods.

First, notice that many lines of code are dedicated to printing a welcome
message. Then notice that we ask for data three times, and twice we are asking
for integers, not strings. Lastly, notice there is "business logic" in computing
the salary per month. These all seem like opportunities to define some methods.

Let's make a few "methods" to start improving this code.

## What is the structure of a method?

Every method in C# is defined by it's `signature`. Similar to your personal
signature, this uniquely identifies the method in the system. Unlike your
signature, a method's signature tells others how to interact with it.

Thinking back to our earlier PB&J example we are likely to see at least
**input**, **work**, and **output** components of defining a method.

The components of a method are:

- The method name.
- The **input** to the method, known as `parameters`. These are the **inputs**
  to our method, information the method needs from the code _using_ it. These
  are surrounded by parentheses and are separated by commas. Empty parentheses
  indicate that the method has no parameters.
- The **work**, or `body` of the method composed of lines of code.
- The **output** known as the `return` type. The `void` type is used if the
  method doesn't return anything.

In the future, when we discuss `classes` we will also learn that methods also
define:

- An optional access level, such as public or private. The default is private.
- Optional modifiers such as abstract or sealed.

For now we are concerned with these elements:

- The return type, or `void` if the method has none.
- The method name.
- Any method parameters.

Let's create our first method

## Defining a method to print the greeting

Let's take the code that displays the greeting and make a method for it. One of
the first decisions we make is what to name the method. Since this method
`displays the greeting` let's name it `DisplayGreeting` to convey the work it
does.

In `C#` we define our methods using `CapitalCase`. If the method name would be
multiple words in a normal sentence we remove the spaces and capitalize the
beginning of each word.

> While this isn't a technical requirement of `C#` it is a common pattern, or as
> it is known, a `convention`. When developing in any language we want to follow
> the _conventions_ other developers have come to expect.

Let's look at the other parts of our method signature. Do we need any additional
information to help us display the greeting? No, so we will not have any _method
parameters_. Will our method return any information to the code that called upon
us? No, we only output to the screen, so we will not have any _return value_

Thus our method will look like

```csharp
static void displayGreeting()
{
  Console.WriteLine("----------------------------------------");
  Console.WriteLine("    Welcome to Our Employee Database    ");
  Console.WriteLine("----------------------------------------");
  Console.WriteLine();
  Console.WriteLine();
}
```

```csharp
// static method (ignore this for the moment)
//  |
//  |  The return (output) type. Here there is none
//  |  since the method isn't giving anything back
//  |  to the code that called it.
//  |   |
//  |   |               The inputs, known as arguments. None in this case.
//  |   |                   |
//  |   |                   |
//  v   v                   v
static void displayGreeting()
```

We haven't explained that odd `static` keyword hanging out in our method
signature. We'll come back to that in a later lesson. For now, just _trust us_
it is needed for this code to work.

This is great, but how do we use this in our code? Let's see what the program
looks like with all the code together.

```csharp
using System;

namespace EmployeeDatabase
{
  class Program
  {

    static void DisplayGreeting()
    {
      Console.WriteLine("----------------------------------------");
      Console.WriteLine("    Welcome to Our Employee Database    ");
      Console.WriteLine("----------------------------------------");
      Console.WriteLine();
      Console.WriteLine();
    }

    static void Main(string[] args)
    {
      DisplayGreeting();

      Console.Write("What is your name? ");
      var name = Console.ReadLine();

      Console.Write("What is your department number? ");
      int department = int.Parse(Console.ReadLine());

      Console.Write("What is your yearly salary (in dollars)? ");
      int salary = int.Parse(Console.ReadLine());

      Console.WriteLine($"Hello, {name} you make {salary / 12} dollars per month.");
    }
  }
}
```

## Using the Method

You will notice that we've replaced the lines where the five `Console.WriteLine`
statements used to be with a single `DisplayGreeting()` statement. Notice that
when we call the method we have to include parenthesis even if, as in this case,
there aren't any _arguments_. We'll show an example with arguments in just a
moment.

The way you read the line:

```csharp
//   Name of the method
//    |
//    |            Any input VALUES or arguments would go here
//    |             |
//    |             |
//    v             v
     DisplayGreeting();
```

is "Call the DisplayGreeting method, providing no arguments, and expecting no
return."

When the method is done, and we'll talk about how to determine when a method is
done later. It returns to the next line after the call. In this case the
`Console.Write("What is your name?" );` line.

Just reading this code we've added to the _expressiveness_ of our code. As a
reader of the code I may not care **how** the `DisplayGreeting` works, but I do
know that it will show some form of greeting to the user. In doing so I've
reduced the amount of code the reader has to visually concern themselves with
while retaining the meaning of the code.

## Creating a method that accepts input and returns a value

The idea of showing the user a prompt, e.g. `What is your name?` followed by
reading some input is repeated through this code. One use is to get a `string`
and the other two times we require an `int`. Let's add methods for these
concepts. We will start with the prompt for the string.

Let's first think of what to call this new method. Since it _prompts for a
string_ lets call it `PromptForString`.

Does it need any information to do the work? In this case it _does_! The method
needs the text for the prompt to show. So our method will have _one argument_.
Since _arguments_ are just _variables_ that are defined and filled in when a
method is called we must define both the _type_ and the _name_. We must specify
the _type_ because unlike a `var` statement `C#` can't automatically know the
type. In our case, since the argument is the _prompt_ we call the variable
`prompt` and the type of this variable is a `string`.

Next, we will consider if our method _returns_ anything to the code that called
it. It does, the string the user entered. So this method has a return type of
`string`.

Our method signature will be:

```csharp
// static method (ignore this for the moment)
//  |
//  |  The return (output) type. This says that
//  |  we expect this method to return a single
//  |  string to the code that called it
//  |   |
//  |   |               The inputs, known as arguments.
//  |   |               In this case a single string
//  |   |               in a variable known as `prompt`
//  |   |                      |
//  |   |                      |
//  v   v                      v
static string PromptForString(string prompt)
```

### Calling a method that requires arguments and returns a value

Similar to calling a method that returns no value, we still use the method's
name.

However in this case we should do something with the returned value. The most
common case is storing this value in a new variable.

Then we should supply a value for the one input the method is expecting.

```csharp
// var declaration. Since C# knows this method returns a string
// our `answer` variable will be a string. (Type inference)
//  |
//  |  Name of the output variable
//  |   |
//  |   |         Name of the method
//  |   |          |
//  |   |          |            Argument value
//  |   |          |             |
//  |   |          |             |
//  v   v          v             v
   var answer = PromptForString("What is your name? ");
//        ^                        |
//        |                        |
//        |                        v
//        ^     PromptForString(string prompt)
//        ^               +--------------------+
//        |               |                    |
//        |               | ** WORK HAPPENS ** |
//        +--<< output ---|                    |
//                        +--------------------+
//
```

Now let's write the **body** of the method.

Since we are creating a generic version of this code it will probably look
similar.

```csharp
Console.Write("What is your name? ");
var name = Console.ReadLine();
```

In fact, the code looks like this:

```csharp
static string PromptForString(string prompt)
{
  // Use the argument, whatever the caller sent us.
  Console.Write(prompt);

  // Get some user input
  var userInput = Console.ReadLine();

  // RETURN that value as the output of this method.
  // The value in `userInput` will go wherever the
  // *CALLER* of the method has specified.
  return userInput;
}
```

Notice that we use the argument variable `prompt` instead of the manual (hard
coded) string. We also use a more generic variable name for the `var` assignment
of the result of `Console.ReadLine()`. Finally, we introduce a new keyword,
`return`. This statement tells the method to stop processing and **return**
whatever information is in the supplied variable. In this case, it is the value
of `userInput`. Notice that the type of `userInput` (`string`) matches the
return type (`string`) of our method. These types must be compatible or we will
receive a compiler error.

Now we can put this code to use.

```csharp
using System;

namespace EmployeeDatabase
{
  class Program
  {

    static void DisplayGreeting()
    {
      Console.WriteLine("----------------------------------------");
      Console.WriteLine("    Welcome to Our Employee Database    ");
      Console.WriteLine("----------------------------------------");
      Console.WriteLine();
      Console.WriteLine();
    }

    static string PromptForString(string prompt)
    {
      Console.Write(prompt);
      var userInput = Console.ReadLine();

      return userInput;
    }

    static void Main(string[] args)
    {
      DisplayGreeting();

      var name = PromptForString("What is your name? ");

      Console.Write("What is your department number? ");
      int department = int.Parse(Console.ReadLine());

      Console.Write("What is your yearly salary (in dollars)? ");
      int salary = int.Parse(Console.ReadLine());

      Console.WriteLine($"Hello, {name} you make {salary / 12} dollars per month.");
    }
  }
}
```

Now we have removed two lines and reduced it to one. This line is also more
clear in the intent. We declare a variable `var name` and assign it the _return_
of calling our method `PromptForString` while we see the supplied prompt
`What is your name?`.

While this isn't a _huge_ savings in lines of code, we now have a generic method
we can use to prompt for any `string` our program needs.

Let's repeat this for the prompt of integers.

> This might be a good point to see if you can write this method before looking
> at the rest of the lesson.

```csharp
using System;

namespace EmployeeDatabase
{
  class Program
  {
    static void DisplayGreeting()
    {
      Console.WriteLine("----------------------------------------");
      Console.WriteLine("    Welcome to Our Employee Database    ");
      Console.WriteLine("----------------------------------------");
      Console.WriteLine();
      Console.WriteLine();
    }

    static string PromptForString(string prompt)
    {
      Console.Write(prompt);
      var userInput = Console.ReadLine();

      return userInput;
    }

    static int PromptForInteger(string prompt)
    {
      Console.Write(prompt);
      var userInput = int.Parse(Console.ReadLine());

      return userInput;
    }

    static void Main(string[] args)
    {
      DisplayGreeting();

      var name = PromptForString("What is your name? ");

      int department = PromptForInteger("What is your department number? ");

      int salary = PromptForInteger("What is your yearly salary (in dollars)? ");

      Console.WriteLine($"Hello, {name} you make {salary / 12} dollars per month.");
    }
  }
}
```

This is starting to look good! The main part of our program follows a nice flow
and uses methods that convey their intent. As a reader of the main part of the
code we don't need to be concerned about **how** that code works, as long as the
guarantees of the method signature are followed. We supply a string prompt and
the method returns a string, in the case of `PromptForString`, or an integer, in
the case of `PromptForInteger`.

## Encapsulation

The other benefit of having these methods is an idea of _"encapsulation"_. That
is we contain within that method any needed behavior we want.

You may have noticed, if you are following along and running this code, that if
you type in something **other** than a number to either the department or salary
prompt our program doesn't behave nicely. We show the user a confusing
"exception"
(`Unhandled exception. System.FormatException: Input string was not in a correct format.`)
and our program stops cold. Maybe you have used software like this before and
agree that it isn't a very nice
[user experience](https://en.wikipedia.org/wiki/User_experience).

By having _one_ method where this is, we can improve the experience for both the
department _and_ salary prompts by making a single change.

In `C#` the `int.Parse` method will cause this exception if the supplied value
cannot be converted. There is another method named `Int32.TryParse` we can use.

This method behaves slightly different than `Int.Parse`. It _returns_ a boolean
value that indicates if the value was parsed, and we place the variable we are
assigning as an _argument_. It looks like this:

```csharp
// This gives an exception if the user types in something *other* than a string
var userInput = int.Parse(Console.ReadLine());

int userInput;
var isThisGoodInput = Int32.TryParse(Console.ReadLine(), out userInput);
```

The code is a little more complex, but it allows us to do some checking. Let's
see how this might work in our method.

```csharp
using System;

namespace EmployeeDatabase
{
  class Program
  {

    static void DisplayGreeting()
    {
      Console.WriteLine("----------------------------------------");
      Console.WriteLine("    Welcome to Our Employee Database    ");
      Console.WriteLine("----------------------------------------");
      Console.WriteLine();
      Console.WriteLine();
    }

    static string PromptForString(string prompt)
    {
      Console.Write(prompt);
      var userInput = Console.ReadLine();

      return userInput;
    }

    static int PromptForInteger(string prompt)
    {
      Console.Write(prompt);
      int userInput;
      var isThisGoodInput = Int32.TryParse(Console.ReadLine(), out userInput);

      if (isThisGoodInput)
      {
        return userInput;
      }
      else
      {
        Console.WriteLine("Sorry, that isn't a valid input, I'm using 0 as your answer.");
        return 0;
      }
    }

    static void Main(string[] args)
    {
      DisplayGreeting();

      var name = PromptForString("What is your name? ");

      int department = PromptForInteger("What is your department number? ");

      int salary = PromptForInteger("What is your yearly salary (in dollars)? ");

      Console.WriteLine($"Hello, {name} you make {salary / 12} dollars per month.");
    }
  }
}
```

If you run this code and type `bananas` as your department number you will see
that we provide a much nicer message and our code continues. However, if you
type a valid number the code will _use_ that number as valid input.

This method could be improved even further by introducing a loop that repeats
until valid input is given.

> Give that a try if you want! It is a good review of the `loops` lesson.

## One last method example, computing a salary

Finally, we will make a method that computes a monthly salary.

> Again, give it a try on your own before reading ahead.

```csharp
using System;

namespace EmployeeDatabase
{
  class Program
  {

    static void DisplayGreeting()
    {
      Console.WriteLine("----------------------------------------");
      Console.WriteLine("    Welcome to Our Employee Database    ");
      Console.WriteLine("----------------------------------------");
      Console.WriteLine();
      Console.WriteLine();
    }

    static string PromptForString(string prompt)
    {
      Console.Write(prompt);
      var userInput = Console.ReadLine();

      return userInput;
    }

    static int PromptForInteger(string prompt)
    {
      Console.Write(prompt);
      int userInput;
      var isThisGoodInput = Int32.TryParse(Console.ReadLine(), out userInput);

      if (isThisGoodInput)
      {
        return userInput;
      }
      else
      {
        Console.WriteLine("Sorry, that isn't a valid input, I'm using 0 as your answer.");
        return 0;
      }
    }

    static int computeMonthlySalaryFromYearly(int yearlySalary)
    {
      return yearlySalary / 12;
    }

    static void Main(string[] args)
    {
      DisplayGreeting();

      var name = PromptForString("What is your name? ");

      int department = PromptForInteger("What is your department number? ");

      int salary = PromptForInteger("What is your yearly salary (in dollars)? ");

      int monthlySalary = computeMonthlySalaryFromYearly(salary);

      Console.WriteLine($"Hello, {name} you make {monthlySalary} dollars per month.");
    }
  }
}
```

## Conclusion

Methods are a fundamental part of many programming languages and while the
syntax and structure might vary, the reasons for creating methods are the same.
The more we can organize our code, the easier it is for both ourselves and for
future users of our code, to understand and improve it.

We will be using our knowledge of methods when we introduce the concept of
`classes` which allow for even more organization of our code.
