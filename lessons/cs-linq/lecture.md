theme: Next,1

<!-- prettier-ignore-start -->

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

Lets return to our expression example of using the `MultiplyBy2`. Suppose we had a list such as:

```csharp
var scores = new List<int> { 42, 100, 98, 15 };
```

And say we need to make a *new* variable named `newScores` equal to the same list but all the numbers doubled.

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

| Turns | Into | 
| --- | --- |
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

However `Select` is _generic_ method and can work with any expression we give it.

```csharp
var slightlyBetterScores = scores.Select(score => score + 1);
```

---


We are about to see many different _`LINQ`_ methods that each work by starting with a collection and applying an expression to it's elements in different ways.

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

# [fit] They `List` we will be using is

```csharp
var movies = new List<Movie>();
```

---

# Select

> Makes a new list, of `equal size`, by running an expression on every item in the list and using that value when filling the new list.

---

# Where

The `Where` statement is like a filter. We use it when we want to make a new list, keeping only _some_ of the items from the original list.

> Makes a new list, of `equal or smaller` size by running an expression against every item, keeping only items when the expression returns `true`.

---

```csharp
// Make a new list containing only
// the movies that that have over 100 Screenings
var popularMovies =
   movies.Where(movie => movie.Screenings >= 100);
```

---

# Aggregate

The `Aggregate` method, often called `reduce` in other languages, takes the list and processes it down into a single value. Thus why it is often called `reduce`.

> Returns a `single value`. It starts with a value we will call the `current value`. The given expression gets to use, one a a time, the current value and the item from the list, returning a new `current value`.

---

```csharp
// Find the total revenue for all movies
var totalRevenue = movies.Aggregate(0.0,
   (currentTotal, movie) => currentTotal + movie.TotalRevenue);
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

> Returns `an integer` of items count of elements for which the expression returns `true`.

---

```csharp
// Get count of movies that
// cost more than $10 to see.
var moviesThatCostMoreThanTenDollars =
      movies.Count(movie => movie.PricePerTicket > 10);
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


<!-- prettier-ignore-end -->
