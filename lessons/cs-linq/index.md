---
title: LINQ
assignments:
  - cs-enumeration
  - cs-jurrasic-park
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
the `string` (second) variable to be called `name`. Finally the expression itself 
returns a `bool` since that is what we would get if we evaluated
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
values doubled? Well good for us that we have an `expression` that can do just
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

## Example

Let's see some examples of using LINQ on a specific list of data. In this case
we are going to use a `List` of objects, specifically `Movie`

The definition of the `Movie` class is:

```csharp
public class Movie
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Tagline { get; set; }
    public DateTime ReleasedDate { get; set; }
    public int Screenings { get; set; }
    public double PricePerTicket { get; set; }
    public double TotalRevenue { get; set; }
    public double Cost { get; set; }
    public double Budget { get; set; }
}
```

and our list is:

```csharp
var movies = new List<Movie>()
{
    new Movie()
    {
        Id = 1,
        Name = "Dorm Daze (National Lampoon Presents Dorm Daze)",
        Tagline = "Multi-tiered modular standardization",
        ReleasedDate = DateTime.Parse("3/27/2019"),
        Screenings = 186,
        PricePerTicket = 11,
        TotalRevenue = 13361359,
        Cost = 18274829,
        Budget = 8210089
    },

    new Movie()
    {
        Id = 2,
        Name = "Born Yesterday",
        Tagline = "Managed empowering open system",
        ReleasedDate = DateTime.Parse("2/12/2014"),
        Screenings = 184,
        PricePerTicket = 11,
        TotalRevenue = 6563796,
        Cost = 9021912,
        Budget = 11364786
    },

    new Movie()
    {
        Id = 3,
        Name = "Darjeeling Limited, The",
        Tagline = "Quality-focused actuating initiative",
        ReleasedDate = DateTime.Parse("8/21/2013"),
        Screenings = 177,
        PricePerTicket = 10,
        TotalRevenue = 17851792,
        Cost = 5441889,
        Budget = 12144397
    },

    new Movie()
    {
        Id = 4,
        Name = "Offside",
        Tagline = "Enhanced homogeneous migration",
        ReleasedDate = DateTime.Parse("4/18/2019"),
        Screenings = 169,
        PricePerTicket = 11,
        TotalRevenue = 1445952,
        Cost = 4008467,
        Budget = 7417825
    },

    new Movie()
    {
        Id = 5,
        Name = "Superman vs. The Elite",
        Tagline = "Stand-alone systematic model",
        ReleasedDate = DateTime.Parse("12/7/2016"),
        Screenings = 124,
        PricePerTicket = 19,
        TotalRevenue = 13737676,
        Cost = 18893333,
        Budget = 6585110
    },

    new Movie()
    {
        Id = 6,
        Name = "Body Snatchers",
        Tagline = "Diverse holistic data-warehouse",
        ReleasedDate = DateTime.Parse("1/12/2007"),
        Screenings = 170,
        PricePerTicket = 10,
        TotalRevenue = 10540575,
        Cost = 12946787,
        Budget = 9237906
    },

    new Movie()
    {
        Id = 7,
        Name = "Death and Cremation",
        Tagline = "Ergonomic local knowledge base",
        ReleasedDate = DateTime.Parse("4/1/2013"),
        Screenings = 138,
        PricePerTicket = 10,
        TotalRevenue = 12361644,
        Cost = 7326663,
        Budget = 16829534
    },

    new Movie()
    {
        Id = 8,
        Name = "Other End of the Line, The",
        Tagline = "Up-sized demand-driven policy",
        ReleasedDate = DateTime.Parse("11/15/2016"),
        Screenings = 169,
        PricePerTicket = 12,
        TotalRevenue = 6371172,
        Cost = 17279838,
        Budget = 14274676
    },

    new Movie()
    {
        Id = 9,
        Name = "Our Mother's House",
        Tagline = "Enhanced methodical algorithm",
        ReleasedDate = DateTime.Parse("7/20/2018"),
        Screenings = 188,
        PricePerTicket = 17,
        TotalRevenue = 3544170,
        Cost = 7953388,
        Budget = 19636220
    },

    new Movie()
    {
        Id = 10,
        Name = "Everything I Can See From Here",
        Tagline = "Synchronised 24/7 utilisation",
        ReleasedDate = DateTime.Parse("7/26/2012"),
        Screenings = 84,
        PricePerTicket = 4,
        TotalRevenue = 14520267,
        Cost = 2766779,
        Budget = 2478292
    },

    new Movie()
    {
        Id = 11,
        Name = "My Rainy Days",
        Tagline = "Cloned static array",
        ReleasedDate = DateTime.Parse("8/4/2015"),
        Screenings = 104,
        PricePerTicket = 15,
        TotalRevenue = 6860536,
        Cost = 6622076,
        Budget = 1091525
    },

    new Movie()
    {
        Id = 12,
        Name = "Five Graves to Cairo",
        Tagline = "Ergonomic heuristic capacity",
        ReleasedDate = DateTime.Parse("10/25/2013"),
        Screenings = 65,
        PricePerTicket = 17,
        TotalRevenue = 13595001,
        Cost = 3736299,
        Budget = 724740
    },

    new Movie()
    {
        Id = 13,
        Name = "Hunted, The",
        Tagline = "Multi-channelled object-oriented groupware",
        ReleasedDate = DateTime.Parse("2/4/2014"),
        Screenings = 185,
        PricePerTicket = 7,
        TotalRevenue = 13273082,
        Cost = 14879296,
        Budget = 7461416
    },

    new Movie()
    {
        Id = 14,
        Name = "Charlie Chan's Courage",
        Tagline = "Implemented interactive installation",
        ReleasedDate = DateTime.Parse("5/25/2006"),
        Screenings = 50,
        PricePerTicket = 10,
        TotalRevenue = 15695655,
        Cost = 11372062,
        Budget = 9089553
    },

    new Movie()
    {
        Id = 15,
        Name = "When Will I Be Loved",
        Tagline = "Networked uniform toolset",
        ReleasedDate = DateTime.Parse("8/25/2015"),
        Screenings = 165,
        PricePerTicket = 21,
        TotalRevenue = 10095292,
        Cost = 16020659,
        Budget = 15707348
    },

    new Movie()
    {
        Id = 16,
        Name = "Viva Las Vegas",
        Tagline = "Digitized dedicated capability",
        ReleasedDate = DateTime.Parse("7/4/2015"),
        Screenings = 85,
        PricePerTicket = 16,
        TotalRevenue = 16406383,
        Cost = 9854228,
        Budget = 16042287
    },

    new Movie()
    {
        Id = 17,
        Name = "Topaze",
        Tagline = "Advanced high-level benchmark",
        ReleasedDate = DateTime.Parse("12/1/2010"),
        Screenings = 60,
        PricePerTicket = 4,
        TotalRevenue = 13809680,
        Cost = 12667720,
        Budget = 14805773
    },

    new Movie()
    {
        Id = 18,
        Name = "The Clinic",
        Tagline = "Polarised regional solution",
        ReleasedDate = DateTime.Parse("4/20/2013"),
        Screenings = 128,
        PricePerTicket = 8,
        TotalRevenue = 17416537,
        Cost = 3435812,
        Budget = 8818065
    },

    new Movie()
    {
        Id = 19,
        Name = "The Land Before Time X: The Great Longneck Migration",
        Tagline = "Adaptive dedicated workforce",
        ReleasedDate = DateTime.Parse("10/10/2008"),
        Screenings = 170,
        PricePerTicket = 21,
        TotalRevenue = 5720197,
        Cost = 10514309,
        Budget = 3781872
    },

    new Movie()
    {
        Id = 20,
        Name = "Tarzan",
        Tagline = "Polarised intangible productivity",
        ReleasedDate = DateTime.Parse("12/31/2006"),
        Screenings = 105,
        PricePerTicket = 19,
        TotalRevenue = 6338974,
        Cost = 18402771,
        Budget = 844331
    },

    new Movie()
    {
        Id = 21,
        Name = "Jaws",
        Tagline = "When a killer shark unleashes chaos on a beach community, it's up to a local sheriff, a marine biologist, and an old seafarer to hunt the beast down. ",
        ReleasedDate = DateTime.Parse("1/1/1975"),
        Screenings = 105,
        PricePerTicket = 7,
        TotalRevenue = 6338974,
        Cost = 18402771,
        Budget = 844331
    },
};
```

## How many movies are there?

To determine how many movies there are, we can ask the collection for it's
count:

```csharp
Console.WriteLine($"There are {movies.Count()} total movies");
```

## Turn the list of movies into a list of their names

```csharp
var movieNames = movies.Select(movie => movie.Name);
```

We can also use the index of the item in the list as well.

```csharp
var movieNames = movies.Select((movie, index) => $"The movie named {movie.Name} is at position {index}");
```

## How many movies had more than 100 or more screenings?

First we use the `Where` LINQ statement to generate a _new_ `List<Movie>`
containing just the movies that have a `Screenings` property of 100 or more.
Then we use `Count` on **that** `List<Movie>` to show the total.

```csharp
var popularMovies = movies.Where(movie => movie.Screenings >= 100);
Console.WriteLine($"There are {popularMovies.Count()} popular movies");
```

## Combine where and select to get the names of the movies with more than 100 screeenings

```csharp
var popularMovies = movies.Where(movie => movie.Screenings >= 100);
var popularMovieNames = popularMovies.Select(movie => movie.Name);

var popularMoviesNamesInOneLine = movies.Where(movie => movie.Screenings >= 100).Select(movie => movie.Name);
```

## How many movies had less than 100 screenings

This is similar to the above, but with a different expression passed to `Where`

```csharp
var unpopularMovies = movies.Where(movie => movie.Screenings < 100);
Console.WriteLine($"There are {unpopularMovies.Count()} unpopular movies");
```

## Using `Aggregate` to total the revenues

We can use the `Aggregate` method to start `currentTotalRevenue` at `0.0`, and
each time through the loop, update `currentTotalRevenue` to be the existing
value **plus** the current movie's `TotalRevenue`. This will give us a grand
total.

```csharp
var totalRevenue = movies.Aggregate(0.0, (currentTotalRevenue, movie) => currentTotalRevenue + movie.TotalRevenue);
```

## Using `Aggregate` to total the gross revenue

This is similar to the above but with a different expression for totalling

```csharp
var totalGross = movies.Aggregate(0.0, (currentGross, movie) => currentGross + movie.TotalRevenue - movie.Cost);
Console.WriteLine($"The total gross is ${totalGross}");
```

## Using Sum to compute the total revenue

In this example we first take all the movies and use `Select` to generate a new
list of all the revenues. Then we use `Sum` to add up the values. This is
conceptually simpler than `Aggregate`

```csharp
var allRevenues = movies.Select(movie => movie.TotalRevenue);
var totalRevenue = allRevenues.Sum();
```

## Determine if there are any old movies

We can use the `Where` clause to find all the old movies

```csharp
var theOldMovies = movies.Where(movie => movie.ReleasedDate.Year < 1965);
if (theOldMovies.Count() > 0)
{
    // Do something
}
```

## Determine if there are _ANY_ old movies

```csharp
// Just one true or false if they are ALLLLL old movies.
var areAllOldMovies = movies.All(movie => movie.ReleasedDate.Year < 1965);
if (areAllOldMovies)
{
    Console.WriteLine("Yes, all movies before 1965");
}
else
{
    Console.WriteLine("No, there is at least one movie after 1965");
}
```

## Counting a condition

We could count the number of movies that cost more than \$10 in two different
ways:

```csharp
var numberOfMoviesCostingMoreThanTenBucks = movies.Count(movie => movie.PricePerTicket > 10);
Console.WriteLine($"There are {numberOfMoviesCostingMoreThanTenBucks} that cost more than $10");
```

```csharp
// This is kinda the same.
var anotherWayToCountMoviesCostingMoreThan10 = movies.Where(movie => movie.PricePerTicket > 10).Count();
Console.WriteLine($"There are {anotherWayToCountMoviesCostingMoreThan10} that cost more than $10");
```

## References

See this [quick reference guide](/lessons/misc-quick-reference/cs-linq) for an
overview of the frequently used enumeration methods with examples.

Here is
[a list](https://docs.microsoft.com/en-us/dotnet/api/system.linq.enumerable?view=netcore-3.1)
of all the LINQ methods.
