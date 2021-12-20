---
title: C# LINQ
---

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

The `List` we will be using is

```csharp
var movies = new List<Movie>();
```

### Things to pay attention to here.

Pay particular attention to both what the method _returns_ (a new list of equal
or smaller length, a single item, etc) and the logic the expression needs to
implement. Understanding how the method works, the kind of data it returns, and
what is expected of the expression is the key to being able to effectively use
`LINQ`.

### Select

We have seen an example of `Select` already. To define `Select`:

> Makes a new list, of `equal size`, by running an expression on every item in
> the list and using that value when filling the new list.

Example:

```csharp
// Make a list of strings with each string containing the year the corresponding Movie was released, a comma, and the title of the Movie.
var yearAndMovie = movies.Select(movie => $"{movie.ReleasedDate.Year}, {movie.Name} ");
```

> Select, and many of the methods listed here, have a form where the expression
> can accept a second argument, the index of the element.

```csharp
// Make a list of strings where each string contains the year the corresponding Movie was released, a comma, the title of the Movie, and the index in the original list.
var yearAndMovie = movies.Select((movie, index) => $"{movie.ReleasedDate.Year}, {movie.Name}, at index {index} ");
```

### Where

The `Where` statement is like a filter. We use it when we want to make a new
list, keeping _some_ of the items from the original list.

> Makes a new list, of _equal or smaller_ size by running an expression against
> every item, keeping items when the expression returns `true`.

```csharp
// Make a new list containing the movies that have over 100 Screenings
var popularMovies = movies.Where(movie => movie.Screenings >= 100);
```

### Aggregate

The `Aggregate` method, often called `reduce` in other languages, takes the list
and processes it down into a single value. Thus why it is often called `reduce`.

> Returns a single value. It starts with a value we will call the
> `current value`. The given expression gets to use, one at a time, the current
> value and the item from the list, returning a new `current value`.

A good example is to be able to take a list and turn it into a total.

```csharp
// Find the total revenue for all movies
var totalRevenue = movies.Aggregate(0.0, (currentTotal, movie) => currentTotal + movie.TotalRevenue);
```

> NOTE: Aggregate is one of the most difficult of these methods to understand.
> Don't worry if you don't get how it works.

### FindIndex

The `FindIndex` statement allows us to detect the first element of a collection
and return the `index` of that element when found. If no match is found,
`FindIndex` returns the value `-1`.

```csharp
// Find the index of the first movie that has over 100 screenings. Will return -1 if there aren't any such movies.
var indexOfFirstMovieHavingOverOneHundredScreenings = movies.FindIndex(movie => movie.Screenings >= 100);
```

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
> the expression to return `true`.

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
// Get the total price of all movie's PricePerTicket. This goes through every movie, adding to a running total of PricePerTicket, placing the grand total in the variable totalPriceOfAllTickets
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

> Returns _a single element of the list_ which is the first item for which the
> expression returns `true`. If no item is found, the default value for that
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
> found, the default value for the type is returned.

```csharp
// Get the last item in the list that costs more than 10. If no movie costs more than 10, then `lastMovieCostingMoreThanTenDollars` will be `null`
var lastMovieCostingMoreThanTenDollars = movies.LastOrDefault(movie => movie.PricePerTicket > 10);
```

### Distinct

> Returns all the distinct items in a list. This is commonly use in conjunction
> with a `Select`.

```csharp
// Make a list of all the distinct movie titles. That is, if two movies have the same title, the title appears once.
var titles = movies.Select(movie => movie.Name).Distinct();
```

### Max

> Returns the highest value in the collection, but not the actual item. Useful
> for getting the largest value of a list of numbers, or the largest value of
> some property of a list of objects.

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

> Used only after an `OrderBy` and resolves any `OrderBy` ties.

```csharp
// Makes a new list sorted alphabetically by title, then by release year if they have the same Title
var sorted = movies.OrderBy(movie => movie.Name).ThenBy(movie => movie.ReleasedDate);
```

## RemoveAll

> Removes all items that the expression returns `true`, returning a new list _of
> equal or smaller size_.

```csharp
// Return a list of all movies, except for, you know, that one, the one with the title we don't speak of.
var didNotHappen = movies.RemoveAll(movie => movie.Name == "Star Wars: Episode I – The Phantom Menace");
```

Here is
[a list](https://docs.microsoft.com/en-us/dotnet/api/system.linq.enumerable?view=netcore-3.1)
of all the LINQ methods.
