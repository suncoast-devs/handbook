---
title: LINQ
---

## LINQ: Improving our ability to search and manipulate collections of data

LINQ stands for `L`anguage `IN`tegrated `Q`uery. It is a set of methods our
various collections (e.g. `List`) will acquire once we add `LINQ` to our
codebase. We will be adding the `using System.Linq` namespace to our code to
give our `List` some new capabilities.

## Detour through expressions

Before we can talk about LINQ we must learn a new language feature, the
expression. So far we have seen methods such as this:

```csharp
int MultiplyBy2(int value)
{
    return value * 2;
}
```

This method accepts an integer and returns an integer with twice the value.
However, there is another way to express this idea.

```csharp
Func<int, int> MultiplyBy2 = value => value * 2;
```

Lets break this down and see how it works in a similar way. First the data type
for `MultiplyBy2` is `Func<int, int>` -- The first `int` in the `<>` is the type
of argument the _function_ takes. The last `int` represents the kind of return
value the _function_ produces. We are then assigning this variable the
following: `value => value * 2`. This small bit of code is called an
`expression`

The `(value)` indicates the _name_ of that `int` argument we listed in the
`Func`, and the arrow (`=>`) separates the list of arguments from the part
afterward which is the code that should run if this code is called. In this case
the `value * 2`.

So this _function_ named `MultiplyBy2` will take a `value` which is an `int` and
return an `int` which is doubled.

We can write expressions to do all kinds of things. For instance we could write
an expression to see if a particular `Employee` has a given name:

```csharp
Func<Employee, string, bool> EmployeeHasName = (employee, name) => employee.Name == name;
```

In this case we are telling our _function_ that it first takes an `Employee`
object, secondarily it takes a `string` and finally it returns a `bool`. The
expression defines the `Employee` (first) variable to be named `employee` and
the `string` (second) variable to be called `name`. Finally the expression it
self returns a `bool` since that is what we would get if we evaluated
`employee.Name == name` as the `==` will always give us either `true` or
`false`.

We could use this _function_ as:

```csharp
if (EmployeeHasName(employee, "Bob"))
{
    Console.WriteLine("Yup, that is Bob!");
}
```

More interestingly the expression is stored in a variable which means it can be
passed to other methods.

## Using LINQ and expressions.

Lets return to our expression example of using the `MultiplyBy2`. Suppose we had
a list such as:

```csharp
var scores = new List<int> { 42, 100, 98, 15 };
```

and suppose our task was to make a new variable equal to a list with all those
values doubled? We'll good for us that we have a `expression` that can do just
that!

We would write code such as:

```csharp
using System;
using System.Linq;
using System.Collections.Generic;

namespace linq
{
    class Program
    {
        static void Main(string[] args)
        {
            // Here is our original array
            var scores = new List<int> { 42, 100, 98, 15 };

            // Here is our handy Double-er
            Func<int, int> MultiplyBy2 = value => value * 2;

            // Make a new list to store the results
            var newScores = new List<int>();

            // Go through each score in the scores list
            foreach(var score in scores) {
              // Make a doubling of that score
              var doubled = MultiplyBy2(score);

              // Add it to our new list
              newScores.Add(doubled);
            }

            // Print out the scores comma separated
            Console.WriteLine(String.Join(',', newScores));
        }
    }
}
```

Well this is certainly nice, but let's get our new friend `LINQ` involved.

One of the methods that `LINQ` will give to our list is called `Select`. What
`Select` does is go through each entry in our list, and using an `expression`
convert each element to a new value based on what that expression does. Every
new value is then added to a new `List` and returned. Whoa! That is exactly what
our code above is doing! Let's simplify this code by using our new `Select`
capability.

```csharp
using System;
using System.Linq;
using System.Collections.Generic;

namespace linq
{
    class Program
    {
        static void Main(string[] args)
        {
            // Here is our original array
            var scores = new List<int> { 42, 100, 98, 15 };

            // Here is our handy Double-er
            Func<int, int> MultiplyBy2 = score => score * 2;

            // Make a new list by going through the `scores`
            // list, and for each item, call the `MultiplyBy2`
            // expression on that item and using the new
            // value to put into `newScores`
            var newScores = scores.Select(MultiplyBy2);

            // Print out the scores comma separated
            Console.WriteLine(String.Join(',', newScores));
        }
    }
}
```

Well that is much nicer. All that work of creating a new empty list, doing the
`foreach`, calling the `MultiplyBy2` expression, putting the new value into the
list, etc. is all neatly captured by our friend `Select`. But it can be even
better!

Since `MultiplyBy2` is simply `score => score * 2` we can put that code directly
into `Select()` and our code becomes:

```csharp
using System;
using System.Linq;
using System.Collections.Generic;

namespace linq
{
    class Program
    {
        static void Main(string[] args)
        {
            // Here is our original array
            var scores = new List<int> { 42, 100, 98, 15 };

            // Make a new list by going through the `scores`
            // list, and for each item, call the expression
            // on that item and using the new value to put
            // into `newScores`
            var newScores = scores.Select(score => score * 2);

            // Print out the scores comma separated
            Console.WriteLine(String.Join(',', newScores));
        }
    }
}
```

How nice and neat! What is nice is that `Select` is a _generic_ method that we
can use to do all kinds of processing. Maybe we need another variable that
stores all the scores if we had just done a little better and scored one more
point each.

```csharp
var slightlyBetterScores = scores.Select(score => score + 1);
```

## The power of LINQ methods that take expressions

We are about to see many different `LINQ` methods that each work by starting
with a collection and applying an expression to it's elements in different ways.
Which method we will reach for when writing code depends on the behavior we are
looking for. We must simply find the appropriate method and supply it an
expression that does the work we want to do.

Later on we are going to see how `LINQ` works equally well on `List` stored in
memory and rows of a database. Thus learning how to effectively use `LINQ` is a
skill we will re-use quite often in our `C#` programming.

## References

See this [quick reference guide](/lessons/misc-quick-reference/cs-linq) to LINQ.

Here is
[a list](https://docs.microsoft.com/en-us/dotnet/api/system.linq.enumerable?view=netcore-3.1)
of all the LINQ methods.
