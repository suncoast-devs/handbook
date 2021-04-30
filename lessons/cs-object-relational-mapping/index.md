---
title: Object Relational Mapping (ORM)
assignments:
  - cs-rhythms-gonna-get-you
---

When we first learned how to save data we started with reading and writing to
files.

<!-- TODO: Make a link to that lesson -->

However, there are some significant issues with this process.

1. We have to rewrite the entire file each time we add, change, or remove
   information. With a large amount of data this is burdensome.
2. There is no way to relate information across files.
3. There is not a fast way to access a single element of this information. We
   have to open and read as much of the file until we find the information.

For these reasons, and others, our more complex applications will require us to
store information in a process that provides these features.

In another lesson we introduced the idea of _Relational Databases_ and the _SQL_
language. The relational database provides for all of the features we want in a
data storage process.

1. We can add, change, and remove information selectively.
2. It provides a way to relate information across tables.
3. We can directly, and quickly, look up specific information from any table.
4. Most, if not all, databases adhere to the concept of ACID.

- Atomic - updates happen as a single change. That is, we can change multiple
  rows, perhaps across multiple tables in one change. This helps ensure we do
  not have others read _half_ of our update before we are complete.
- Consistent - Each change we make keeps the database in a valid state. That is,
  all the rules (foreign keys, data types, validations) are always in effect and
  keep invalid data out of the system.
- Isolation - Changes are processed concurrently (at the same time) however the
  state of the database would be the same if we processed the changes
  sequentially. This allows for us to ensure data safety while ensuring many
  users can update the system at the same time
- Durability - Once a change has been recognized by the database it remains
  changed even in the case of a system failure (power loss, crash, etc.) That
  is, once the database tells us it has the data safely stored, we can believe
  it.

With all these features we would like to use a relational database in our
systems. However, our systems are Object Oriented. We aren't coding in the
landscape of tables, and rows, but lists and objects.

## Enter the Object Relational Mapper (ORM)

Luckily we have a concept called an Object Relational Mapper (ORM). The purpose
of an ORM is to seamlessly translate between the language of lists/objects to
tables/rows. With an ORM we can continue to use all of our familiar `C#` ideas
and allow the ORM to take care of the details of the appropriate _SQL_ and
_relational database_ work.

```
------------
|          |
| OUR CODE |
|          |
------------
     ^
     |
     v
------------         ------------
|          |         |          |
|    ORM   | <-----> | DATABASE |
|          |         |          |
------------         ------------
```

## Enter Entity Framework Core for .NET

In `.NET Core` we will be using the `Entity Framework` as our ORM of choice.
This will allow us to setup relationships between our database tables and our
`C#` classes, which we will refer to as `POCO`s -- Plain Old C-sharp Objects.

By introducing a few concepts we will be able to use the familiar `LINQ`
statements to create, read, update, and delete rows of data. The _Entity
Framework Core_ (EF Core, or EF) has a number of classes and helper tools to
make our lives easier. In this next section we will introduce the basics we need
to get started.

## Lets use an existing database

In our lesson on SQL Joins we had a database setup that looks like this:

```
+--------------------------------+           +---------------------------+
|            Movies              |           |         Ratings           |
|                                |           |                           |
|    Id                  SERIAL  |           |     Id           SERIAL   |
|    Title               TEXT    | many  one |     Description  TEXT     |
|    PrimaryDirector     TEXT    <----------->                           |
|    YearReleased        INT     |           +---------------------------+
|    Genre               TEXT    |
|                                |
+-------------^------------------+
              | one
              |
              |
              |
              |
              | many
      +-------v----------------+               +-------------------------+
      |        Roles           |               |          Actors         |
      |                        | many      one |                         |
      |   Id            SERIAL |<------------> |    Id          SERIAL   |
      |   CharacterName TEXT   |               |    FullName    TEXT     |
      |                        |               |    Birthday    DATE     |
      |                        |               |                         |
      +------------------------+               +-------------------------+
```

and we are eventually going to represent these relationships in our `C#` code.

> If you have not read that lesson, or you have not generated a database from
> that lesson, and you intend on coding-along, stop now and create that
> database, tables, and data so that this lesson will work.

## Creating our first EF Core application

Start by making a plain console application so we can prompt the user if needed
as well as output information.

```shell
dotnet new sdg-console -o SuncoastMovies
```

we will also need to add the Entity Framework library to our project

```shell
cd SuncoastMovies
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
```

### Define our first Model

We will begin by accessing the list of _movies_ from our database from our `C#`
code.

Before we can do that we need to teach `C#` about the structure of a movie. We
can do that by defining a `class` named `Movie` (singular) and give it
properties corresponding to the same names we find in our table.

In our `Program.cs` we can add `class Movie` as such:

```csharp
using System;

namespace SuncoastMovies
{
  class Movie
  {
    public int Id { get; set; }
    public string Title { get; set; }
    public string PrimaryDirector { get; set; }
    public int YearReleased { get; set; }
    public string Genre { get; set; }
  }

  class Program
  {
    static void Main(string[] args)
    {
    }
  }
}
```

Notice how we have modeled the property names and types to match the column
names and types in the database. This is how `EF Core` will know how to **MAP**
the information between our table and our objects. Here we are following a
_convention_ that allows us to keep the same ideas between our object world and
our database world. We can, of course, use different names between our objects
and our tables. Sometimes this is done if you are accessing an old database
which used unfriendly names.

These classes are typically referred to as _Models_.

You may also notice that there isn't anything in this class that indicates
something about the database. In order to make this link we need an additional
class.

### Connecting to the database through a context

To connect our POCO models to the database we use a `Database Context`, or
`DbContext` for short. The purpose of the database context is to tell our code
what models in the database are accessible as well as how to connect to the
database.

Our database context looks like this:

```csharp
// Define a database context for our Suncoast Movies database.
// It derives from (has a parent of) DbContext so we get all the
// abilities of a database context from EF Core.
class SuncoastMoviesContext : DbContext
{
  // Define a movies property that is a DbSet.
  public DbSet<Movie> Movies { get; set; }

  // Define a method required by EF that will configure our connection
  // to the database.
  //
  // DbContextOptionsBuilder is provided to us. We then tell that object
  // we want to connect to a postgres database named suncoast_movies on
  // our local machine.
  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
  {
    optionsBuilder.UseNpgsql("server=localhost;database=SuncoastMovies");
  }
}
```

> NOTE, this will require `using Microsoft.EntityFrameworkCore;`

Let's walk through this class. It is derived from `DbContext` which is provided
by EF Core. The `DbContext` is what allows us to connect to our database and
relate our models to tables.

We then define a property `Movies` (plural) which we state is of type
`DbSet<Movie>`. The `Movie` here is the model we wish to relate and `Movies`
corresponds to the `Movies` table in our database. `DbSet` will act much like
our `List` collection but has much more knowledge of how to read and write from
the database.

Finally, we **override** a method required by `EF Core` that tells us how to
connect to the database. EF Core will call this method to setup the connection
to the database. In here we tell the options we are using a postgres database
(`UseNpgsql`) and that the database is named `suncoast_movies` and is on our
local machine.

## Using the context to get at data

Here is our code so far:

```csharp
using System;
using Microsoft.EntityFrameworkCore;

namespace SuncoastMovies
{
  class Movie
  {
    public int Id { get; set; }
    public string Title { get; set; }
    public string PrimaryDirector { get; set; }
    public int YearReleased { get; set; }
    public string Genre { get; set; }
  }

  // Define a database context for our Suncoast Movies database.
  // It derives from (has a parent of) DbContext so we get all the
  // abilities of a database context from EF Core.
  class SuncoastMoviesContext : DbContext
  {
    // Define a movies property that is a DbSet.
    public DbSet<Movie> Movies { get; set; }

    // Define a method required by EF that will configure our connection
    // to the database.
    //
    // DbContextOptionsBuilder is provided to us. We then tell that object
    // we want to connect to a postgres database named suncoast_movies on
    // our local machine.
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseNpgsql("server=localhost;database=SuncoastMovies");
    }
  }

  class Program
  {
    static void Main(string[] args)
    {
    }
  }
}
```

Now we can add code to the `Main` to use our context and access our data.

```csharp
// Get a new context which will connect to the database
var context = new SuncoastMoviesContext();
```

With this object we access our `Movies` property:

```csharp
// Get a reference to our collection of movies.
// NOTE: this doesn't yet access any of them, just gives
//       us a variable that knows how.
context.Movies;
```

Now with this `movies` object we can use some of our familiar `LINQ`
capabilities. We start by seeing how we would count the number of movies in the
table.

### Counting movies

```csharp
var movieCount = context.Movies.Count();
Console.WriteLine($"There are {movieCount} movies!");
```

> NOTE: this will require `using System.Linq;`

This should seem familiar as the `movies.Count()` statement eventually becomes a
`SELECT COUNT(*) FROM MOVIES` in our database. This is a perfect example of the
idea of an ORM. At the level of `C#` we are working with a `DbSet` and the
`Count()` method from LINQ, however, EF Core is translating this to the
appropriate SQL statements and returning us the data we need.

Running this code we will see the output of:

```
There are 14 movies!
```

### Getting a list of all the movies

To see all of the movies, we can use a `foreach` loop:

```csharp
foreach (var movie in context.Movies)
{
  Console.WriteLine($"There is a movie named {movie.Title}");
}
```

Again, translated to SQL this would be `SELECT * FROM MOVIES`. However, here we
receive instances of our `Movie` class we can use to output information such as
each movie object's title: `movie.title`.

```
There are 14 movies!
There is a movie named Howls Moving Castle
There is a movie named Hitchhikers Guide to the Galaxy
There is a movie named The Lost World
There is a movie named Pirates of the Caribbean: The Curse of the Black Pearl
There is a movie named Harry Potter and Goblet of Fire
There is a movie named The Hobbit: An Unexpected Journey
There is a movie named The Hobbit: The Desolation of Smaug
There is a movie named The Hobbit: The Battle of the Five Armies
There is a movie named The Lord of the Rings: The Return of the King
There is a movie named The Lord of the Rings: The Fellowship of the Ring
There is a movie named The Lord of the Rings: The Two Towers
There is a movie named Cujo
There is a movie named It
There is a movie named Ity
```

So our application now looks like this:

```csharp
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace SuncoastMovies
{
  class Movie
  {
    public int Id { get; set; }
    public string Title { get; set; }
    public string PrimaryDirector { get; set; }
    public int YearReleased { get; set; }
    public string Genre { get; set; }
  }

  // Define a database context for our Suncoast Movies database.
  // It derives from (has a parent of) DbContext so we get all the
  // abilities of a database context from EF Core.
  class SuncoastMoviesContext : DbContext
  {
    // Define a movies property that is a DbSet.
    public DbSet<Movie> Movies { get; set; }

    // Define a method required by EF that will configure our connection
    // to the database.
    //
    // DbContextOptionsBuilder is provided to us. We then tell that object
    // we want to connect to a postgres database named suncoast_movies on
    // our local machine.
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseNpgsql("server=localhost;database=SuncoastMovies");
    }
  }

  class Program
  {
    static void Main(string[] args)
    {
      var context = new SuncoastMoviesContext();

      var movieCount = context.Movies.Count();
      Console.WriteLine($"There are {movieCount} movies!");

      foreach (var movie in context.Movies)
      {
        Console.WriteLine($"There is a movie named {movie.Title}");
      }
    }
  }
}
```

### Bonus: Seeing what SQL our code is generating.

It is often interesting to see the SQL being generated and executed by our
application. To do this we need to configure some code to add a `logger` to our
application. A `logger` is code that receives events from the system and then
outputs a descriptive text describing the event. In this case, the interactions
with the database.

Before we can use the logger we must add another package to our application:

```shell
dotnet add package Microsoft.Extensions.Logging.Console
```

Then we can add this code to our `OnConfiguring` method:

```csharp
var loggerFactory = LoggerFactory.Create(builder => builder.AddConsole());
optionsBuilder.UseLoggerFactory(loggerFactory);
```

This will take any of the database events and output them to the `console` where
we can see them.

For instance, when running the application the output now looks like:

```
info: Microsoft.EntityFrameworkCore.Infrastructure[10403]
      Entity Framework Core 3.1.3 initialized 'SuncoastMoviesContext' using provider 'Npgsql.EntityFrameworkCore.PostgreSQL' with options: None
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (9ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
      SELECT COUNT(*)::INT
      FROM movies AS m
There are 14 movies!
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (22ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
      SELECT m.id, m.genre, m.primary_director, m.title, m.year_released
      FROM movies AS m
There is a movie named The Lost World
There is a movie named Pirates of the Caribbean: The Curse of the Black Pearl
There is a movie named Harry Potter and Goblet of Fire
There is a movie named The Hobbit: An Unexpected Journey
There is a movie named The Hobbit: The Desolation of Smaug
There is a movie named The Hobbit: The Battle of the Five Armies
There is a movie named The Lord of the Rings: The Return of the King
There is a movie named Cujo
There is a movie named It
There is a movie named It
There is a movie named Howls Moving Castle
There is a movie named The Lord of the Rings: The Fellowship of the Ring
There is a movie named The Lord of the Rings: The Two Towers
There is a movie named Hitchhikers Guide to the Galaxy
```

### Adding in related tables.

Our database has other tables we could add to our system: `Ratings`, `Roles`,
and `Actors`.

Lets add a model for our ratings.

```csharp
class Rating
{
  public int Id { get; set; }
  public string Description { get; set; }
}

// Add this inside `SuncoastMoviesContext`

// Define a Ratings property that is a DbSet.
public DbSet<Rating> Ratings { get; set; }
```

Now we would be able to query our table of ratings. This is great, but what we
want to do is see the rating for a specific movie. To achieve this we need to
relate the two tables.

We need to modify the `Movie` model to tell it how to relate to the `Rating`
model. To do this, we'll add the following code:

```csharp
public int RatingId { get; set; }
public Rating Rating { get; set; }
```

This tells the `Movie` model that it can use the `Rating` property to return a
`Rating` object.

Now when we access the `context.Movies` we can also tell it to fetch the related
`Rating` via the `Include` method.

```csharp
var moviesWithRatings = context.Movies.Include(movie => movie.Rating);
```

Now when we access the `movies` we are going to generate a **JOIN** to the
`ratings` table and bring that information back again.

Now we can change our loop to also show the `rating` if it has one.

```csharp
const moviesWithRatings = context.movies.Include(movie => movie.Rating);
foreach (var movie in moviesWithRatings)
{
  if (movie.Rating == null)
  {
    Console.WriteLine($"There is a movie named {movie.Title} and has not been rated yet");
  }
  else
  {
    Console.WriteLine($"There is a movie named {movie.Title} and a rating of {movie.Rating.Description}");
  }
}
```

Notice how if there is no related `Rating` we need to see that the
`movie.Rating` is not `null`. This will be the case for each row in `Movies`
that doesn't have a `RatingId` that matches something from the `Ratings` table.

If we run this code we will see the SQL joins being generated:

```
info: Microsoft.EntityFrameworkCore.Infrastructure[10403]
      Entity Framework Core 3.1.3 initialized 'SuncoastMoviesContext' using provider 'Npgsql.EntityFrameworkCore.PostgreSQL'
with options: None
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (15ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
      SELECT COUNT(*)::INT
      FROM "Movies" AS m
There are 14 movies!
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (1ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
      SELECT m."Id", m."Genre", m."PrimaryDirector", m."RatingId", m."Title", m."YearReleased", r."Id", r."Description"
      FROM "Movies" AS m
      INNER JOIN "Ratings" AS r ON m."RatingId" = r."Id"
There is a movie named Hitchhikers Guide to the Galaxy and a rating of PG
There is a movie named The Lost World and a rating of PG-13
There is a movie named Pirates of the Caribbean: The Curse of the Black Pearl and a rating of PG-13
There is a movie named Harry Potter and Goblet of Fire and a rating of PG-13
There is a movie named The Hobbit: An Unexpected Journey and a rating of PG-13
There is a movie named The Hobbit: The Desolation of Smaug and a rating of PG-13
There is a movie named The Hobbit: The Battle of the Five Armies and a rating of PG-13
There is a movie named The Lord of the Rings: The Return of the King and a rating of PG-13
There is a movie named The Lord of the Rings: The Fellowship of the Ring and a rating of PG-13
There is a movie named The Lord of the Rings: The Two Towers and a rating of PG-13
There is a movie named Cujo and a rating of R
There is a movie named It and a rating of R
There is a movie named It and a rating of R
```

Here is our code so far:

```csharp
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace SuncoastMovies
{
  class Movie
  {
    public int Id { get; set; }
    public string Title { get; set; }
    public string PrimaryDirector { get; set; }
    public int YearReleased { get; set; }
    public string Genre { get; set; }

    public int RatingId { get; set; }
    public Rating Rating { get; set; }
  }

  class Rating
  {
    public int Id { get; set; }
    public string Description { get; set; }
  }

  // Define a database context for our Suncoast Movies database.
  // It derives from (has a parent of) DbContext so we get all the
  // abilities of a database context from EF Core.
  class SuncoastMoviesContext : DbContext
  {
    // Define a movies property that is a DbSet.
    public DbSet<Movie> Movies { get; set; }

    // Define a Ratings property that is a DbSet.
    public DbSet<Rating> Ratings { get; set; }

    // Define a method required by EF that will configure our connection
    // to the database.
    //
    // DbContextOptionsBuilder is provided to us. We then tell that object
    // we want to connect to a postgres database named suncoast_movies on
    // our local machine.
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      var loggerFactory = LoggerFactory.Create(builder => builder.AddConsole());
      optionsBuilder.UseLoggerFactory(loggerFactory);

      optionsBuilder.UseNpgsql("server=localhost;database=SuncoastMovies");
    }
  }

  class Program
  {
    static void Main(string[] args)
    {
      var context = new SuncoastMoviesContext();

      var movieCount = context.Movies.Count();
      Console.WriteLine($"There are {movieCount} movies!");

      const moviesWithRatings = context.movies.Include(movie => movie.Rating);
      foreach (var movie in moviesWithRatings)
      {
        if (movie.Rating == null)
        {
          Console.WriteLine($"There is a movie named {movie.Title} and has not been rated yet");
        }
        else
        {
          Console.WriteLine($"There is a movie named {movie.Title} and a rating of {movie.Rating.Description}");
        }
      }
    }
  }
}
```

### Add in other relationships.

Finally, we can add the relationships for `Role` and `Actor`.

Notice that when adding the `Roles` relationship to the `Movie` class we add it
as such:

```csharp
public List<Role> Roles { get; set; }
```

We are telling the `Movie` that it has a _list_ of related `Roles`. Since we
have setup or relationships with appropriate SQL syntax, EF Core can determine
how to join these tables together.

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace SuncoastMovies
{
  class Movie
  {
    public int Id { get; set; }
    public string Title { get; set; }
    public string PrimaryDirector { get; set; }
    public int YearReleased { get; set; }
    public string Genre { get; set; }

    // This is the column in the database
    public int RatingId { get; set; }
    // This is the related object we can use from our code (if properly used with Include)
    public Rating Rating { get; set; }

    // This is the related list of roles we an use (if properly used with Include)
    public List<Role> Roles { get; set; }
  }

  class Rating
  {
    public int Id { get; set; }
    public string Description { get; set; }
  }

  class Role
  {
    public int Id { get; set; }
    public string CharacterName { get; set; }

    // This is the column in the database
    public int MovieId { get; set; }
    // This is the related object we can use from our code (if properly used with Include)
    public Movie Movie { get; set; }

    // This is the column in the database
    public int ActorId { get; set; }
    // This is the related object we can use from our code (if properly used with Include)
    public Actor Actor { get; set; }
  }

  class Actor
  {
    public int Id { get; set; }
    public string FullName { get; set; }
    public DateTime Birthday { get; set; }

    // This is the related list of roles we an use (if properly used with Include)
    public List<Role> Roles { get; set; }
  }

  // Define a database context for our Suncoast Movies database.
  // It derives from (has a parent of) DbContext so we get all the
  // abilities of a database context from EF Core.
  class SuncoastMoviesContext : DbContext
  {
    // Define a movies property that is a DbSet.
    public DbSet<Movie> Movies { get; set; }

    // Define a Ratings property that is a DbSet.
    public DbSet<Rating> Ratings { get; set; }

    // Define a Roles property that is a DbSet.
    public DbSet<Role> Roles { get; set; }

    // Define an Actors property that is a DbSet.
    public DbSet<Actor> Actors { get; set; }

    // Define a method required by EF that will configure our connection
    // to the database.
    //
    // DbContextOptionsBuilder is provided to us. We then tell that object
    // we want to connect to a postgres database named suncoast_movies on
    // our local machine.
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      var loggerFactory = LoggerFactory.Create(builder => builder.AddConsole());
      optionsBuilder.UseLoggerFactory(loggerFactory);

      optionsBuilder.UseNpgsql("server=localhost;database=SuncoastMovies");
    }
  }

  class Program
  {
    static void Main(string[] args)
    {
      var context = new SuncoastMoviesContext();


      var movieCount = context.Movies.Count();
      Console.WriteLine($"There are {movieCount} movies!");

      // Makes a new collection of movies but each movie knows the associated Rating object
      var moviesWithRatingsRolesAndActors = context.Movies.
                                              // from our movie, please include the associated Rating object
                                              Include(movie => movie.Rating).
                                              // ... and from our movie, please include the associated Roles LIST
                                              Include(movie => movie.Roles).
                                              // THEN for each of roles, please include the associated Actor object
                                              ThenInclude(role => role.Actor);
      foreach (var movie in moviesWithRatingsRolesAndActors)
      {
        if (movie.Rating == null)
        {
          Console.WriteLine($"There is a movie named {movie.Title} and has not been rated yet");
        }
        else
        {
          Console.WriteLine($"There is a movie named {movie.Title} and a rating of {movie.Rating.Description}");
        }

        foreach (var role in movie.Roles)
        {
          Console.WriteLine($" - Has a character named {role.CharacterName} played by {role.Actor.FullName}");
        }
      }
    }
  }
}
```

And our program's output is now.

```
info: Microsoft.EntityFrameworkCore.Infrastructure[10403]
      Entity Framework Core 3.1.3 initialized 'SuncoastMoviesContext' using provider 'Npgsql.EntityFrameworkCore.PostgreSQL' with options: None
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (22ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
      SELECT COUNT(*)::INT
      FROM "Movies" AS m
There are 14 movies!
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (2ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
      SELECT m."Id", m."Genre", m."PrimaryDirector", m."RatingId", m."Title", m."YearReleased", r."Id", r."Description", t."Id", t."ActorId", t."CharacterName", t."MovieId", t."Id0", t."Birthday", t."FullName"
      FROM "Movies" AS m
      INNER JOIN "Ratings" AS r ON m."RatingId" = r."Id"
      LEFT JOIN (
          SELECT r0."Id", r0."ActorId", r0."CharacterName", r0."MovieId", a."Id" AS "Id0", a."Birthday", a."FullName"
          FROM "Roles" AS r0
          INNER JOIN "Actors" AS a ON r0."ActorId" = a."Id"
      ) AS t ON m."Id" = t."MovieId"
      ORDER BY m."Id", r."Id", t."Id", t."Id0"
There is a movie named The Lost World and a rating of PG-13
There is a movie named Pirates of the Caribbean: The Curse of the Black Pearl and a rating of PG-13
 - Has a character named Will Turner played by Orlando Bloom
There is a movie named Harry Potter and Goblet of Fire and a rating of PG-13
 - Has a character named Filius Flitwick played by Warwick Davis
There is a movie named The Hobbit: An Unexpected Journey and a rating of PG-13
 - Has a character named Bilbo played by Martin Freeman
There is a movie named The Hobbit: The Desolation of Smaug and a rating of PG-13
 - Has a character named Bilbo played by Martin Freeman
There is a movie named The Hobbit: The Battle of the Five Armies and a rating of PG-13
 - Has a character named Bilbo played by Martin Freeman
There is a movie named The Lord of the Rings: The Return of the King and a rating of PG-13
 - Has a character named Legolas played by Orlando Bloom
There is a movie named The Lord of the Rings: The Fellowship of the Ring and a rating of PG-13
 - Has a character named Legolas played by Orlando Bloom
There is a movie named The Lord of the Rings: The Two Towers and a rating of PG-13
 - Has a character named Legolas played by Orlando Bloom
There is a movie named Hitchhikers Guide to the Galaxy and a rating of PG
 - Has a character named Marvin played by Warwick Davis
 - Has a character named Arthur Dent played by Martin Freeman
There is a movie named Cujo and a rating of R
There is a movie named It and a rating of R
There is a movie named It and a rating of R
```

### Adding data to our database.

To add a `Movie` to the record we can make a new POCO:

```csharp
var newMovie = new Movie {
  Title = "SpaceBalls",
  PrimaryDirector = "Mel Brooks",
  Genre = "Comedy",
  YearReleased = 1987,
  RatingId = 2
};
```

Then we can add this POCO to the `Movies` context and tell the context to save
the changes

```csharp
context.Movies.Add(newMovie);
context.SaveChanges();
```

After adding this code and entering some sample data we would see this query:

```sql
INSERT INTO "Movies" ("Genre", "PrimaryDirector", "RatingId", "Title", "YearReleased")
VALUES (@p0, @p1, @p2, @p3, @p4)
RETURNING "Id";
```

### Updating a movie

To change the name of a movie, we can find an existing record first before
changing an attribute.

```csharp
// Search for a movie by name. FirstOrDefault takes a function to use to compare the movies and returns the first record that matches, or if nothing matches, returns null.
// This is the same as we used with LINQ against a List, but this time it is searching the database.
var existingMovie = context.Movies.FirstOrDefault(movie => movie.Title == "SpaceBalls");

// If we found an existing movie.
if (existingMovie != null) {
  // Change the title of this movie.
  existingMovie.Title = "SpaceBalls - the best movie ever";

  // Ask the context to save changes.
  context.SaveChanges();
}
```

### Deleting a movie

To remove a movie we find the movie and then remove it.

```csharp
var existingMovie = context.Movies.FirstOrDefault(movie => movie.Title == "Cujo");

// If we found an existing movie.
if (existingMovie != null) {
  // Remove the existing movie from the collection
  context.Movies.Remove(existingMovie);

  // Ask the context to save changes, in this case deleting the record.
  context.SaveChanges();
}
```

### A whole app that can create, read, update, and delete movies:

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace SuncoastMovies
{
  class Movie
  {
    public int Id { get; set; }
    public string Title { get; set; }
    public string PrimaryDirector { get; set; }
    public int YearReleased { get; set; }
    public string Genre { get; set; }

    // This is the column in the database
    public int RatingId { get; set; }
    // This is the related object we can use from our code (if properly used with Include)
    public Rating Rating { get; set; }

    // This is the related list of roles we an use (if properly used with Include)
    public List<Role> Roles { get; set; }
  }

  class Rating
  {
    public int Id { get; set; }
    public string Description { get; set; }
  }

  class Role
  {
    public int Id { get; set; }
    public string CharacterName { get; set; }

    // This is the column in the database
    public int MovieId { get; set; }
    // This is the related object we can use from our code (if properly used with Include)
    public Movie Movie { get; set; }

    // This is the column in the database
    public int ActorId { get; set; }
    // This is the related object we can use from our code (if properly used with Include)
    public Actor Actor { get; set; }
  }

  class Actor
  {
    public int Id { get; set; }
    public string FullName { get; set; }
    public DateTime Birthday { get; set; }

    // This is the related list of roles we an use (if properly used with Include)
    public List<Role> Roles { get; set; }
  }

  // Define a database context for our Suncoast Movies database.
  // It derives from (has a parent of) DbContext so we get all the
  // abilities of a database context from EF Core.
  class SuncoastMoviesContext : DbContext
  {
    // Define a movies property that is a DbSet.
    public DbSet<Movie> Movies { get; set; }

    // Define a Ratings property that is a DbSet.
    public DbSet<Rating> Ratings { get; set; }

    // Define a Roles property that is a DbSet.
    public DbSet<Role> Roles { get; set; }

    // Define an Actors property that is a DbSet.
    public DbSet<Actor> Actors { get; set; }

    // Define a method required by EF that will configure our connection
    // to the database.
    //
    // DbContextOptionsBuilder is provided to us. We then tell that object
    // we want to connect to a postgres database named suncoast_movies on
    // our local machine.
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      var loggerFactory = LoggerFactory.Create(builder => builder.AddConsole());
      optionsBuilder.UseLoggerFactory(loggerFactory);

      optionsBuilder.UseNpgsql("server=localhost;database=SuncoastMovies");
    }
  }

  class Program
  {
    static void Main(string[] args)
    {
      var context = new SuncoastMoviesContext();

      var keepGoing = true;

      while (keepGoing)
      {
        Console.Write("(L)ist movies. (C)reate movie. (D)elete movie. (U)pdate movie. (Q)uit: ");
        var option = Console.ReadLine().ToUpper();

        switch (option)
        {
          case "Q":
            keepGoing = false;
            break;

          case "L":
            var movies = context.Movies.Include(movie => movie.Rating).Include(movie => movie.Roles).ThenInclude(role => role.Actor);

            var movieCount = movies.Count();
            Console.WriteLine($"There are {movieCount} movies!");

            foreach (var movie in movies)
            {
              if (movie.Rating == null)
              {
                Console.WriteLine($"There is a movie named {movie.Title} and has not been rated yet");
              }
              else
              {
                Console.WriteLine($"There is a movie named {movie.Title} and a rating of {movie.Rating.Description}");
              }

              foreach (var role in movie.Roles)
              {
                Console.WriteLine($" - Has a character named {role.CharacterName} played by {role.Actor.FullName}");
              }
            }
            break;

          case "C":
            Console.Write("What is the name of the new movie: ");
            var title = Console.ReadLine();

            Console.Write("What is the name of the primary director: ");
            var primaryDirector = Console.ReadLine();

            Console.Write("What is the genre: ");
            var genre = Console.ReadLine();

            Console.Write("In what year was the movie released: ");
            var yearReleased = int.Parse(Console.ReadLine());

            Console.Write("What is the ID of the movie rating: ");
            var ratingID = int.Parse(Console.ReadLine());

            var newMovie = new Movie
            {
              Title = title,
              PrimaryDirector = primaryDirector,
              Genre = genre,
              YearReleased = yearReleased,
              RatingId = ratingID
            };

            context.Movies.Add(newMovie);
            context.SaveChanges();
            break;

          case "U":
            Console.Write("What is the name of the movie you want to update: ");
            var titleOfMovieToUpdate = Console.ReadLine();

            var existingMovieToUpdate = context.Movies.FirstOrDefault(movie => movie.Title == titleOfMovieToUpdate);

            if (existingMovieToUpdate != null)
            {
              Console.Write("Enter a new name for the movie: ");
              existingMovieToUpdate.Title = Console.ReadLine();

              context.SaveChanges();
            }
            else
            {
              Console.WriteLine($"No movie with title {titleOfMovieToUpdate} to update");
            }
            break;

          case "D":
            Console.Write("What is the name of the movie you want to delete: ");
            var titleOfMovieToDelete = Console.ReadLine();

            var existingMovieToDelete = context.Movies.FirstOrDefault(movie => movie.Title == titleOfMovieToDelete);

            if (existingMovieToDelete != null)
            {
              context.Movies.Remove(existingMovieToDelete);
              context.SaveChanges();
            }
            else
            {
              Console.WriteLine($"No movie with title {titleOfMovieToDelete} to update");
            }
            break;
        }
      }
    }
  }
}
```
