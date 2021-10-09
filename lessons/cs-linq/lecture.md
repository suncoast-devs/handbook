theme: Next,1

# [fit] LINQ

`L` anguage
`IN` tegrated
`Q` uery

---

# [fit] LINQ adds capabilities to collections, such as `List`

We will be adding the `using System.Linq` namespace to our code to give our `List` some new capabilities.

---

# But first a detour

![](https://i0.kym-cdn.com/entries/icons/facebook/000/025/086/car.jpg)

---

# [fit] Expressions

---

# Methods

```csharp
int MultiplyBy2(int value)
{
    return value * 2;
}
```

---

# However, there is another way to express this idea.

```csharp
//
//   First argument type
//   |
//   |    Return type
//   |    |
//   |    |                  Code
//   |    |                  |
//   |    |                  |
//   v    v                  v
Func<int, int> MultiplyBy2 = value => value * 2;
```

---

```csharp
//
//   First argument type
//   |
//   |         Second argument type
//   |         |
//   |         |       Return type
//   |         |       |
//   |         |       |                       Arguments
//   |         |       |                       |
//   |         |       |                       |                   Code
//   |         |       |                       |                   |
//   |         |       |                       |                   |
//   v         v       v                       v                   v
Func<Employee, string, bool> EmployeeHasName = (employee, name) => employee.Name == name;
```

---

# We could use this _function_ as:

```csharp
if (EmployeeHasName(employee, "Bob"))
{
    Console.WriteLine("Yup, that is Bob!");
}
```

---

## Using LINQ and expressions.

Let's return to our expression example of using the `MultiplyBy2`. Suppose we had a list such as:

```csharp
var scores = new List<int> { 42, 100, 98, 15 };
```

And say we need to make a _new_ variable named `newScores` equal to the same list but all the numbers doubled.

---

```csharp
var scores = new List<int> { 42, 100, 98, 15 };

// Here is our handy multiply by two
Func<int, int> MultiplyBy2 = value => value * 2;

// Make a new list to store the results
var newScores = new List<int>();

// Go through each score in the scores list
foreach(var score in scores) {
  // Use the `MultiplyBy2` expression to take score and double it
  var doubled = MultiplyBy2(score);

  // Add it to our new list
  newScores.Add(doubled);
}
```

---

# [fit] So much code!

![](https://memecrunch.com/image/50210aac1861334ce7014f5a.png)

---

# [fit] LINQ to the rescue

---

[.autoscale: false]

`LINQ` provides a method named `Select`.

What `Select` does is go through each entry in our list, and using an `expression` convert each element to a new value based on what that expression does.

Every new value is then added to a new `List` and returned.

Whoa! That is exactly what our code above is doing! Let's simplify this code by using our new `Select` capability.

---

# Select

```
scores       MultiplyBy2       newScores
             x => x * 2

42

100

98

15
```

---

# Select

```
scores       MultiplyBy2       newScores
             x => x * 2

42              42

100

98

15
```

---

# Select

```
scores       MultiplyBy2       newScores
             x => x * 2

42              84

100

98

15
```

---

# Select

```
scores       MultiplyBy2       newScores
             x => x * 2

42                             84

100

98

15
```

---

# Select

```
scores       MultiplyBy2       newScores
             x => x * 2

42                             84

100          100

98

15
```

---

# Select

```
scores       MultiplyBy2       newScores
             x => x * 2

42                             84

100          200

98

15
```

---

# Select

```
scores       MultiplyBy2       newScores
             x => x * 2

42                             84

100                            200

98

15
```

---

# Select

```
scores       MultiplyBy2       newScores
             x => x * 2

42                             84

100                            200

98           98

15
```

---

# Select

```
scores       MultiplyBy2       newScores
             x => x * 2

42                             84

100                            200

98           196

15
```

---

# Select

```
scores       MultiplyBy2       newScores
             x => x * 2

42                             84

100                            200

98                             196

15
```

---

# Select

```
scores       MultiplyBy2       newScores
             x => x * 2

42                             84

100                            200

98                             196

15           15
```

---

# Select

```
scores       MultiplyBy2       newScores
             x => x * 2

42                             84

100                            200

98                             196

15           30
```

---

# Select

```
scores       MultiplyBy2       newScores
             x => x * 2

42                             84

100                            200

98                             196

15                             30
```

---

# Select

## with our `MultiplyBy2` expression

| Turns             | Into               |
| ----------------- | ------------------ |
| `42, 100, 98, 15` | `84, 200, 196, 30` |

---

```csharp
// Here is our original array
var scores = new List<int> { 42, 100, 98, 15 };

// Here is our multiplier
Func<int, int> MultiplyBy2 = score => score * 2;

// Make a new list by going through the `scores`
// list, and for each item, call the `MultiplyBy2`
// expression on that item and using the new
// value to put into `newScores`
var newScores = scores.Select(MultiplyBy2);
```

---

# [fit] Much better

- Simpler
- More expressive

---

## Since `MultiplyBy2` is simply

```
score => score * 2
```

## we can put that code directly into `Select()` and our code becomes...

---

```csharp
// Here is our original array
var scores = new List<int> { 42, 100, 98, 15 };

// Make a new list by going through the `scores`
// list, and for each item, call the expression
// on that item and using the new value to put
// into `newScores`
var newScores = scores.Select(score => score * 2);
```

---

# [fit] How nice and neat!

![](https://i.kym-cdn.com/photos/images/newsfeed/000/185/885/SANDCASTLES.png?1318627593)

---

However `Select` is a _generic_ method and can work with any expression we give it.

```csharp
var slightlyBetterScores = scores.Select(score => score + 1);
```

---

We are about to see many different _`LINQ`_ methods that each work by starting with a collection and applying an expression to its elements in different ways.

Which method we will reach for when writing code depends on the behavior we are looking for. We must simply find the appropriate method and supply it an expression that does the work we want to do.

---

## Code to use with examples

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

---

# [fit] The `List` we will be using is

```csharp
var movies = new List<Movie>();
```

---

[.column]

```csharp
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

```

[.column]

```csharp
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

```

---

[.column]

```csharp
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
```

[.column]

```csharp
      new Movie()
      {
            Id = 10,
            Name = "Everything I Can See From Here",
            Tagline = "Synchronized 24/7 utilization",
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
```

---

[.column]

```csharp
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
```

[.column]

```csharp
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
            Tagline = "Polarized regional solution",
            ReleasedDate = DateTime.Parse("4/20/2013"),
            Screenings = 128,
            PricePerTicket = 8,
            TotalRevenue = 17416537,
            Cost = 3435812,
            Budget = 8818065
      },
```

---

[.column]

```csharp
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
            Tagline = "Polarized intangible productivity",
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
```

---

# Select

> Makes a new list, of `equal size`, by running an expression on every item in the list and using that value when filling the new list.

```csharp
var movieNames = movies.Select(movie => movie.Name);
```

---

# Select with an index

> We can get both the current element and its index in the list as we work through the list

```csharp
var movieNames = movies.Select((movie, index) => $"The movie named {movie.Name} is at position {index}");
```

---

# Where

The `Where` statement is like a filter. We use it when we want to make a new list, keeping only _some_ of the items from the original list.

> Makes a new list, of `equal or smaller` size by running an expression against every item, keeping only items when the expression returns `true`.

---

```csharp
// Make a new list containing only
// the movies that have over 100 Screenings
var popularMovies =
   movies.Where(movie => movie.Screenings >= 100);
```

---

# Combine Where and Select

```csharp
var popularMovies = movies.Where(movie => movie.Screenings >= 100);
var popularMovieNames = popularMovies.Select(movie => movie.Name);

var popularMoviesNamesInOneLine = movies.Where(movie => movie.Screenings >= 100).Select(movie => movie.Name);
```

---

# Aggregate

The `Aggregate` method, often called `reduce` in other languages, takes the list and processes it down into a single value. Thus why it is often called `reduce`.

> Returns a `single value`. It starts with a value we will call the `current value`. The given expression gets to use, one at a time, the current value and the item from the list, returning a new `current value`.

---

```csharp
// Find the total revenue for all movies
var totalRevenue = movies.Aggregate(0.0,
   (currentTotal, movie) => currentTotal + movie.TotalRevenue);
```

---

## Sum

In this example we first take all the movies and use `Select` to generate a new list of all the revenues. Then we use `Sum` to add up the values. This is conceptually simpler than `Aggregate`

```csharp
var allRevenues = movies.Select(movie => movie.TotalRevenue);
var totalRevenue = allRevenues.Sum();
```

---

# All

This returns a single `bool` which will be `true` if the expression is `true` for every element in the list.

> Returns `a boolean` if the expression evaluates to `true` for every element in the list.

---

```csharp
// Figure out if all the movies are old movies, before 1965
var areAllOldMovies = movies.All(
      movie => movie.ReleasedDate.Year < 1965);
```

---

# Any

> Returns `a boolean` if there is even a single element in the list that causes the expression to return `true`

---

```csharp
// Figure out if there is even
// a single old movie (before 1965) in our list
var areAnyOldMovies = movies.Any(
      movie => movie.ReleasedDate.Year < 1965);
```

---

# Count

> Returns `an integer` of items, the count of elements within the list.
> If an expression is used, returns an integer of items the count of elements for which the
> expression returns true.

---

```csharp
// Get count of movies that
// cost more than $10 to see.
var moviesThatCostMoreThanTenDollars =
      movies.Count(movie => movie.PricePerTicket > 10);
```

```csharp
// This is kinda the same.
var anotherWayToCountMoviesCostingMoreThan10 = movies.Where(movie => movie.PricePerTicket > 10).Count();
Console.WriteLine($"There are {anotherWayToCountMoviesCostingMoreThan10} that cost more than $10");
```

---

# First

> Returns `a single element of the list` which is the first item for which the expression returns `true`. If no item is found, an _exception_ is thrown.

---

```csharp
// Our favorite movie is Jaws,
// let's get it from the list if
// it is there. If it isn't we'll
// get an exception/error
var favoriteMovie = movies.First(
      movie => movie.Name == "Jaws");
```

---

# [fit] Many others

[.column]

- FindIndex
- First
- FirstOrDefault
- Last
- LastOrDefault
- Distinct
- Max
- Min

[.column]

- Sum
- Take
- Skip
- OrderBy
- OrderByDescending
- ThenBy
- ThenByDescending
- RemoveAll

---

## Whew! That was a lot... Wait, there are _even_ more!?

There are other `LINQ` methods besides those covered here. However, these are the best ones to learn first as they are used the most often.
