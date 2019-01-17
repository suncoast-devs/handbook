# LINQ

- LINQ stands for Language INtergrated Query
- Used to query and manilupated List of items
- Like map/reduce/filter in JavaScript, but much powerful and more options
- LINQ is in the namespace `System.Linq`
- LINQ operates on anything that is an `IEnumerable<T>` (pronouced "IEnumerable of T"), where `T` is a place holder for a type. `IEnumerable<T>` is a fancy way of saying list of things. 
- We have already been using an `IEnumerable<T>` when we created a `List<int>` or a `List<string>`. 
- `IEnumerable` is the parent class for all things that can be considered a list. 
- LINQ methods take expressions, which can *mostly* be thought as functions
- Using the Lambda syntax, we can easily chain methods together to help us try to simplify our logic and do complex and dynamic queries.
- We will use this to query the database later when we get to Entity Framework Core

- Examples

We will be using this class as an example for the queries 

``` C# 
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

They `IEnumerable` we will be using is

```C# 
var movies = new List<Movie>();
```


- `Select` => Runs an expression on every item in the list and returns a new value. This is idea is commonly referred to as `map`.
example: 

``` C# 
    // get the year released and the movie title for every movie
    var yearAndMovie = movies.Select(movie => $"{movie.ReleaseDate.Year}, {movie.Title} ");
```

- `Where` => Runs an expression against every item, and only returns that item if that expression returns a `true` value. This is idea is also called `filter`. 

``` C# 
    // find all movie that that have over 100 Screenings
    var popularMovies = movies.Select(movie => movie.Screenings >= 100);
```

- `Aggregate` => Aggregate takes a list of things and reduces it to one item. This is also called `reduce` in other languages.

``` C#
    //find the movie with the highest revenue 
    var highestMovie = movies.Aggregate(new Movie(), (highestMovie, next) => {
        if ((highestMovie.TotalRevenue - highestMovie.Cost) > (next.TotalRevenue - next.Cost) )
        {
            return next;
        } else {
            return highestMovie;
        }
    });
```

- `All` => Check the List and return a `true` or `false` value if  *all* the items in the array return `true`

``` C#
    // areAllOldMovies with be a true or false
    var areAllOldMovies = movies.All(movie => movie.ReleasedDate.Year < 1965);
```

- `Any` => Check the List and return a `true` or `false` value if  *any* the items in the array return `true`

``` C#
    // areAnyOldMovies with be a true or false
    var areAnyOldMovies = movies.Any(movie => movie.ReleasedDate.Year < 1965);
```

- `Count` => Returns as count (an int) of items that the expression returns true.

``` C#
    // get count of movies that cost more than $10 to see. 
    var moviesThatCostMoreThanTenDollars = movies.Count(movie => movie.PricePerTicket > 10);
```

- `First` => Returns the first item that expression returns `true`. If no item is found, an exception is thrown. 

``` C# 
    var favoriteMovie = movies.First(movie => movie.Title == "Jaws");
``` 

- `FirstOrDefault` => Returns the first item that expression returns `true`. If no item is found, the default value for that type is returned.

``` C# 
    var favoriteMovie = movies.FirstOrDefault(movie => movie.Title == "Jaws");
``` 

- `Single` => Returns the first item that expression returns `true`. If no item is found, an exception is thrown. The difference between `Single` and `First` is that `Single` will also also crash if there are multiple items that that expression meets true for. 

``` C# 
    var favoriteMovie = movies.Single(movie => movie.Title == "Jaws");
``` 

- `SingleOfDefault` => Returns the first item that expression returns `true`. If no item is found, the default value for that type is returned. The difference between `SingleOfDefault` and `FirstOrDefault` is that `SingleOfDefault` will also also crash if there are multiple items that that expression meets true for. 

``` C# 
    var favoriteMovie = movies.SingleOfDefault(movie => movie.Title == "Jaws");
``` 


- `Last` => Returns the first item that expression returns `true`. If no item is found, an exception is thrown. 

``` C# 
    var favoriteMovie = movies.Last(movie => movie.Title == "Jaws");
``` 

- `LastOrDefault` => Returns the Last item that expression returns `true`. If no item is found, the default value for that type is returned.

``` C# 
    var favoriteMovie = movies.LastOrDefault(movie => movie.Title == "Jaws");
``` 

- `Distinct` => Returns all the distinct items in a list. This is commonly use in conjunction with a `Select`

```C#
// give me all the distinct Movie Titles
var titles = movies.Select(movie => movie.Title).Distinct();
```

- `Max` => returns the highest value in the collection, but not the actual movie. Useful for getting numbers.

``` C#
    var biggestBudget  =  movies.Max(movie => movie.Budget);
```

- `Min`=> returns the lowest value in the collection, but not the actual movie. Useful for getting numbers.

``` C#
    var smallestBudget  =  movies.Min(movie => movie.Budget);
```

- `Sum` => returns the sum of the property that was selected in the expressions

``` C#
    var total = movies.Sum(movie => movie.TotalRevenue);
```

- `Take` => Only returns the number of items that was specified. This is often used with `Skip` to do pagination.

``` C#
    var first8 = movies.Take(8);
```

- `Skip` => Skips the number of items passed in the return the rest of the list. This is often used with `Take` to do pagination.

``` C#
    var notTheFirst3 = movies.Skip(3);
```


- `OrderBy` && `OrderByDescending` => Returns a new list in a sorted order by on the property that was supplied. 

``` C#
    var alphabetically = movies.OrderBy(movie => movie.Title);
```

- `ThenBy` && `ThenByDescending` => Used only after an `OrderBy` and is used to resolve any `OrderBy` ties
``` C#
    // sort by alphabettically by title, then by release year
    var sorted = movies.OrderBy(movie => movie.Title).ThenBy(movie => move.DateReleased);
```

- `RemoveAll` => removes all items that the expression returns `true`

``` C# 
    var didntHappen = movies.RemoveAll(movie => movie.Title == "Star Wars: Episode I – The Phantom Menace"); 
```


There are LINQ methods other than what was covered here,  but these are the best ones to learn first. 
