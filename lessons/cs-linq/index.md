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

## Examples

We will be using this class as an example for exploring the various methods
`LINQ` supplies.

```csharp
public class Movie {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Tagline { get; set; }
    public DateTime ReleasedDate { get; set; }
    public int Screenings { get; set; }
    public double PricePerTicket { get; set; }
    public double TotalRevenue { get; set; }
    public double Cost { get; set;}
    public double Budget { get; set;}
}
```

They `List` we will be using is

```csharp
var movies = new List<Movie>();
```

### Things to pay attention to here.

Pay particular attention to both what the method _returns_ (a new list of equal
length, of equal or smaller, a single item, etc) and the logic the expression
needs to implement. Understanding how the method works, the kind of data it
returns, and what is expected of the expression is the key to being able to
effectively use `LINQ`

### Select

We have seen an example of `Select` already. To define `Select`:

> Makes a new list, of `equal size`, by running an expression on every item in
> the list and using that value when filling the new list.

Example:

```csharp
// Make a list of strings when each string contins the year it's corresponding Movie was released, a comma, and the title of the Movie.
var yearAndMovie = movies.Select(movie => $"{movie.ReleaseDate.Year}, {movie.Name} ");
```

### Where

The `Where` statement is like a filter. We use it when we want to make a new
list, keeping only _some_ of the items from the original list.

> Makes a new list, of _equal or smaller_ size by running an expression against
> every item, keeping only items when the expression returns `true`.

```csharp
// Make a new list containing only the movies that that have over 100 Screenings
var popularMovies = movies.Where(movie => movie.Screenings >= 100);
```

### Aggregate

The `Aggregate` method, often called `reduce` in other languages, takes the list
and processes it down into a single value. Thus why it is often called `reduce`.

> Returns a single value. It starts with a value we will call the
> `current value`. The given expression gets to use, one a a time, the current
> value and the item from the list, returning a new `current value`.

A good example is to be able to take a list and turn it into a total

```csharp
// Find the total revenue for all movies
var totalRevenue = movies.Aggregate(0, (currentTotal, movie) => currentTotal + movie.TotalRevenue);
```

> NOTE: Aggregate is one of the most difficult of these methods to understand.
> Don't worry if you don't get how it works.

### All

This returns a single `bool` which will be `true` if the expression is `true`
for every element in the list.

> Returns _a boolean_ if the expression evaluates to `true` for every element in
> the list.

```csharp
// Figure out if all the movies are old movies, before 1965
var areAllOldMovies = movies.All(movie => movie.ReleasedDate.Year < 1965);
```

### Any

> Returns _a boolean_ if there is even a single element in the list that causes
> the expression to return `true`

```csharp
// Figure out if there is even a single old movie (before 1965) in our list
var areAnyOldMovies = movies.Any(movie => movie.ReleasedDate.Year < 1965);
```

### Count

> Returns _an integer_ of items count of elements for which the expression
> returns `true`.

```csharp
// Get count of movies that cost more than $10 to see.
var moviesThatCostMoreThanTenDollars = movies.Count(movie => movie.PricePerTicket > 10);
```

### Sum

> Returns _an integer_ by adding up the value of the expression for each item.

```csharp
var totalPriceOfAllTickets = movies.Sum(movie => movie.PricePerTicket);
```

### First

> Returns _a single element of the list_ which is the first item for which the
> expression returns `true`. If no item is found, an _exception_ is thrown.

```csharp
// Our favorite movie is Jaws, let's get it from the list if it is there. If it isn't we'll get an exception/error
var favoriteMovie = movies.First(movie => movie.Name == "Jaws");
```

### FirstOrDefault

> Returns _a single element of the list_ which is the the first item for which
> the expression returns `true`. If no item is found, the default value for that
> type is returned.

```csharp
// Our favorite movie is Jaws, let's get it from the list if it is there. If it isn't we'll get a value of `null` for `favoriteMovie`
var favoriteMovie = movies.FirstOrDefault(movie => movie.Name == "Jaws");
```

### Last

> Returns the _last item_ such that the expression returns `true`. If no item is
> found, an exception is thrown.

```csharp
// Get the last item in the list that costs more than 10
var lastMovieCostingMoreThanTenDollars = movies.Last(movie => movie.PricePerTicket > 10);
```

### LastOrDefault

> Returns the _last item_ such that the expression returns `true`. If no item is
> found, the default value for the type is returned

```csharp
// Get the last item in the list that costs more than 10. If no movie costs more than 10, then `lastMovieCostingMoreThanTenDollars` will be `null`
var lastMovieCostingMoreThanTenDollars = movies.Last(movie => movie.PricePerTicket > 10);
```

### Distinct

> Returns all the distinct items in a list. This is commonly use in conjunction
> with a `Select`

```csharp
// Make a list of all the distinct movie titles. That is, if two movies have the same title, the title only appears once.
var titles = movies.Select(movie => movie.Name).Distinct();
```

### Max

> Returns the highest value in the collection, but not the actual item. Useful
> for getting numbers.

```csharp
// Of all the values of `Budget` for all the movies, return the largest one.
var biggestBudget = movies.Max(movie => movie.Budget);
```

### Min

> Returns the smallest value in the collection, but not the actual item. Useful
> for getting numbers.

```csharp
// Of all the values of `Budget` for all the movies, return the smallest one.
var smallestBudget = movies.Min(movie => movie.Budget);
```

### Sum

> Returns the sum of the property that was returned by the expressions. Useful
> for getting totals.

```csharp
// Get tht total of all revenue for all movies
var totalOfAllRevenue = movies.Sum(movie => movie.TotalRevenue);
```

### Take

> Returns a list of _a specific number of_ items from the list.

```csharp
// Make a new list of the first 8 movies from the list
var first8 = movies.Take(8);
```

## Skip

> Returns a _part of the list_ that begins after skipping a number of items.

```csharp
// Return a list of all the movies after skipping the first three
var afterTheFirst3 = movies.Skip(3);
```

## OrderBy and OrderByDescending

> Returns a new list _of equal size_ in a sorted order based on the property
> returned by the expression.

```csharp
// Makes a new list with all the movies ordered by their title
var alphabetically = movies.OrderBy(movie => movie.Name);
```

## ThenBy and ThenByDescending

> Used only after an `OrderBy` and is used to resolve any `OrderBy` ties

```csharp
// Makes a new list sorted by alphabetically by title, then by release year if they have the same Title
var sorted = movies.OrderBy(movie => movie.Name).ThenBy(movie => move.DateReleased);
```

## RemoveAll

> Removes all items that the expression returns `true`, returning a new list _of
> equal or smaller size_

```csharp
// Return a list of all movies, except for, you know, that one, the one with the title we don't speak of.
var didntHappen = movies.RemoveAll(movie => movie.Name == "Star Wars: Episode I – The Phantom Menace");
```

## Whew! That was a lot... Wait, there are more!?

There are other `LINQ` methods besides those covered here. However, these are
the best ones to learn first as they are used the most often.

Here is
[a list](https://docs.microsoft.com/en-us/dotnet/api/system.linq.enumerable?view=netcore-3.1)
of all the LINQ methods.
