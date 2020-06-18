---
title: Variables in C#
assignments:
  - cs-variables
---

## Learning Objectives

- Introduce students to writing and running their first programs.
- Introduce students to the basic types of variables and how to use them.
- Introduce students to reading from the console and writing information to the
  console.

## What is a variable?

Computers are designed to accept, manipulate, and return information. In order
for our code to accept, manipulate and return information we need to keep track
of it. We store this information in our computer's memory and need to keep track
of where we assigned each piece of information. This is where a variable comes
into play.

A variable is:

> an identifier for a value our program needs to keep track of

We can imagine the computer's memory as a large area to store information and
the variables as _labels_, or _pointers_, to that spot in memory.

```
                                 +------------------------------------------------------------------+
                                 |                           COMPUTER MEMORY                        |
                                 |                                                                  |
                                 |                                                                  |
                                 |                                                                  |
                                 |               +---------------------------------------+          |
                                 |               |                                       |          |
                                 |               |                                       |          |
                                 |               |    "Suncoast Developers Guild"        |          |
myVariable  +------------------------------------+                                       |          |
                                 |               |                                       |          |
                                 |               +---------------------------------------+          |
                                 |                                                                  |
                                 |                                                                  |
                                 |          +-------+                                               |
                                 |          |       |                                               |
 myOtherVariable  +-----------------------> |  42   |                                               |
                                 |          |       |                                               |
                                 |          +-------+                                               |
                                 |                                                                  |
                                 |                                                                  |
                                 |                                                                  |
                                 |                                                                  |
                                 |                                                                  |
                                 +------------------------------------------------------------------+

```

So instead of repeating a value over and over in our code we can assign it to a
variable.

Each language you learn will have specific rules about:

- Naming variables
- The kinds (_types_) of information we can store in variables
- If the value of a variable, once assigned, can be changed
- The syntax for declaring a variable
- If the kind (_type_) of information stored in a variable can change once
  assigned

In this lesson we will look at how the `C#` language works with variables and we
will learn a few, thought not all, types of information our variables can store.

## Declaring Variables

In `C#` we _must_ declare our variables to our code before we can use them. By
`declare` we mean to write a specific line of code, or instruction, to tell the
`C#` program that we are introducing a new variable.

However, in `C#` we must also tell the program the _kind_ (`type`) of
information we want to store.

Let's say we wanted to keep track of two pieces of information in our program.
We want to keep track of the name of a student and the score they received on
their test.

Before we declare our variables we need to think about the kind of information
each variable will represent. In this case, the `name` of the student is what we
call a `string`. In programming terms a `string` is a sequence of letters,
digits, spaces, punctuation, as well as other kinds of symbols that as a whole
we call `characters`. So for keeping track of the student's name a `string`
would be the best kind of variable. For the student's grade we will allow all
the numbers between `0` and `100`. In programming these kinds of values, numbers
without any decimal places, are referred to as `integers` or in `C#` we use the
word `int`. These values can be negative, zero, or positive, however they are
not infinite. The computer can only keep track of an `int` that is so big. The
range of an `int` variable is from `-2,147,483,648` to `2,147,483,647` and since
`0` to `100` fits nicely, we'll use an `int` to keep track of the student's
score.

Let's declare these two variables with the following statements.

> NOTE: For this first example we are going to include the entire contents of
> `Program.cs` but from this point forward we'll only show the code that goes
> inside `Main`

```csharp
using System;

namespace our_dotnet_app
{
    class Program
    {
        static void Main(string[] args)
        {
          string name = "Mark";
          int score = 95;
        }
    }
}
```

Let's break down each of these lines to see the structure of a line of code in
`C#` and how variable assignment works.

```
// Type   Name   Value    Statement End
//  |       |      |       |
//  |       |      |       |
//  v       v      v       v
  string  name = "Samantha";
```

This is an _assignment_ statement. On the left hand side of the statement we
have the type of variable we are asking to create, in this case a `string`
followed by the _name_ of the variable, in this case `name`, followed by an
equals sign `=` and then the value, the _string_ `"MARK"`. Strings are enclosed
inside a pair of double-quotation marks (`"`) to let the computer know that we
mean the letters `M`, then `a`, then `r`, then `k`. Otherwise the computer might
think we are referring to another variable, one named `Mark`. Like all
statements in `C#` we end (_terminate_) the statement with a semi-colon, `;`.
Think of the `;` in `C#` like the period at the end of this sentence. It
signifies the end of a complete thought. In the case of our code, the complete
statement declaring our variable.

Looking at the other statement `int score = 95;` we see the same pattern. In
this case we are declaring an `int`eger variable named `score` and we make it's
value the _number_ `95`. Notice we do not put the `95` in any kind of quotes or
other syntax. We simply refer to it by it's value.

## Let C# do the work

You will notice that developers often like it when the computer can do some of
the work. Perhaps you noticed from our declarations we repeated some of the
ideas. We said that we had to write `string` to let the computer know we were
making a string variable, but then we also said that we had to write `Mark`
inside double-quotes to let the computer know this was a sequence (_string_) of
letters. The same with the `int` for the score.

```csharp
string name = "Mark";
int score = 95;
```

The `C#` language can, when declaring a variable, _infer_ (determine on it's
own) the type of variable if we supply it with an _initial value_. Adding an
initial value for a variable is a good idea anyway since without it, the
computer will assign an `undefined value`, which we'll get into later.

So if providing an initial value will allow the computer to determine the type
of variable for itself, there must be a way to let it do that? This is where the
keyword `var` comes into play.

Let's look at the same statement without having to _explicitly_ (doing it
ourselves) declare variables:

```csharp
var name = "Mark";
var score = 95;
```

These two statements end up being the same as the previous example. However, the
second example is easier for us to write. This is the style we will use most of
the time when declaring new variables.

> Advanced note: This is called
> [`type inference`](https://en.wikipedia.org/wiki/Type_inference) in a
> programming language.

## What are the simple types of variables we can declare?

In `C#` there is a set of built-in types of variables that the language
provides. We call these the
[primitive](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/built-in-types-table)
types.

- The common _numeric_ primitives are:

  - **int** : a whole number from -2,147,483,648 to 2,147,483,64
  - **long** : a whole number from -9,223,372,036,854,775,808 to
    9,223,372,036,854,775,807
  - **double** : a 64 bit floating point value that has an approximate precision
    of ~15-17 digits
  - **float** : a 32 bit floating point value that has an approximate precision
    of 6-9 digits
  - **decimal** : a more precise way to store decimal numbers, but has a smaller
    range

- Some other non-numeric primitives are:
  - **char** : represents a unicode character
  - **bool** : true or false
  - **byte** : represents a raw chunk of data (values from 0 to 255)

> NOTE: Do not feel the need to memorize all the different primitive types, just
> know that they exist. Most of the time developers will just `var` and not
> think about the type until it matters. This is a case of knowing how to find
> the information is better than rote memorization of facts.

## Variable Examples

Let's see some additional examples of declaring the types of variables we have
seen so far:

### Integers

```csharp
var score = 42;
```

### Floats

```csharp
var total = 10f;
var price = 10.0;
var pi = 3.14159265;
```

### Decimal

```csharp
var total = 10m;
var price = 10.0;
var pi = 3.14159265;
```

### Double

```csharp
var total = 10.0;
var total = 10d;
var pi = 3.14159265
```

### Characters

```csharp
var piratesFavoriteLetter = 'r';
var firstLetterOfTheEnglishAlphabet = 'a';
var lastLetterOfTheEnglishAlphabet = 'z';
var capitalLetter = 'Q';
```

### Strings

```csharp
var name = "Mark";
```

## Strings have extra features!

You may have noticed that our `string` type wasn't amongst the list of primitive
types. This is because it is a more advanced type since it has specific
features.

### How long is a string?

With a more complex type like a `string` we can ask it questions about itself.
For instance, we can ask the variable how many characters are in the string.

```csharp
var sentence = "The quick brown fox jumped over the lazy dog";

var howLong = sentence.length;
```

With the code `var howLong = sentence.length;` we see a variable being used on
the _right hand side_ for the first time. When processing an _assignment
statement_ the computer will figure out the value of the **right hand side**
first before taking that result and assigning it to the variable on the left.
The next new syntax here is `sentence.length` -- the `.` in that part of the
statement separates the variable (`sentence`) from the property we are asking
about, `length`. So to break this down:

```
    variable  right-hand-side
       |             |
       |             |
       v             v

var howLong = sentence.length;
```

```

variable  property
   |         |
   |         |
   v         v

sentence.length
```

If we ask the `sentence` variable for it's length, the computer first goes to
the contents of the variable in memory, in this case the string
`The quick brown fox jumped over the lazy dog` and then looks at what property
we want, length. In this case we get the \_int_eger `44`

So after:

```csharp
var sentence = "The quick brown fox jumped over the lazy dog";

var howLong = sentence.Length;
```

The `howLong` variable will know it is an `int`eger, and it's contents will be
`44`

Before we go we should look at a few more things that `string`s can do. Since we
mentioned that strings are just a sequence of characters there should be a way
to access each letter individually.

By using the `[]` syntax for a string we can access individual characters of the
string.

```csharp
var sentence = "The quick brown fox jumped over the lazy dog";
var firstLetter = sentence[0];
var secondLetter = sentence[1];
var thirdLetter = sentence[2];
```

So the number inside the `[]` brackets indicates which position of the string we
want the character for. We call this the `index` of the character. You may also
notice that the _first_ character of the string is at index `0`. Most languages
[begin counting at `0`](https://en.wikipedia.org/wiki/Zero-based_numbering#Computer_programming)
and you'll see this fairly often. It will help you if you think of this as the
`index` as opposed to the `1st`, `2nd`, etc. So `the character at index 0`
instead of `the 1st character`

# Conclusion

Variables are a fundamental aspect of many programming languages. `C#` provides
many built in data types as well as `type inference` so we can use the `var`
keyword to make variable creation easier.
