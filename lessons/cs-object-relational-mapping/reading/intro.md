# Object Relational Mapping

When we first learned how to save data we started with reading and writing to files.

<!-- TODO: Make a link to that lesson -->

However, there are some significant issues with this process.

1. We have to rewrite the entire file each time we add, change, or remove information. With a large amount of data this is burdensome.
2. There is no way to relate information across files.
3. There is not a fast way to access a single element of this information. We have to open and read as much of the file until we find the information.

For these reasons, and others, our more complex applications will require us to store information in a process that provides these features.

In another lesson we introduced the idea of _Relational Databases_ and the _SQL_ language. The relational database provides for all of the features we want in a data storage process.

1. We can add, change, and remove information selectively.
2. It provides a way to relate information across tables.
3. We can directly, and quickly, look up specific information from any table.
4. Most, if not all, databases adhere to the concept of ACID.

- Atomic - updates happen as a single change. That is, we can change multiple rows, perhaps across multiple tables in one change. This helps ensure we do not have others read _half_ of our update before we are complete.
- Consistent - Each change we make keeps the database in a valid state. That is, all the rules (foreign keys, data types, validations) are always in effect and keep invalid data out of the system.
- Isolation - Changes are processed concurrently (at the same time) however the state of the database would be the same if we processed the changes sequentially. This allows for us to ensure data safety while ensuring many users can update the system at the same time
- Durability - Once a change has been recognized by the database it remains changed even in the case of a system failure (power loss, crash, etc.) That is, once the database tells us it has the data safely stored, we can believe it.

With all these features we would like to use a relational database in our systems. However, our systems are Object Oriented. We aren't coding in the landscape of tables, and rows, but lists and objects.

## Enter the Object Relational Mapper (ORM)

Luckily we have a concept called an Object Relational Mapper (ORM). The purpose of an ORM is to seamlessly translate between the language of lists/objects to tables/rows. With an ORM we can continue to use all of our familiar `C#` ideas and allow the ORM to take care of the details of the appropriate _SQL_ and _relational database_ work.

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

In `.NET Core` we will be using the `Entity Framework` as our ORM of choice. This will allow us to setup relationships between our database tables and our `C#` classes, which we will refer to as `POCO`s -- Plain Old C-sharp Objects.

By introducing a few concepts we will be able to use the familiar `LINQ` statements we have learned

<!-- TODO: Insert link to that lesson -->

to be able to create, read, update, and delete rows of data. The _Entity Framework Core_ (EF Core, or EF) has a number of classes as well as helper tools to make our lives easier. In this next section we will introduce the basics we need to get started.

## Lets use an existing database

In our lesson on SQL Joins

<!-- TODO: Insert link to that lesson -->

we had a database setup that looks like this:

```
+--------------------------------+           +---------------------------+
|            movies              |           |         ratings           |
|                                |           |                           |
|    id                  SERIAL  |           |     id        SERIAL      |
|    title               TEXT    | many  one |     rating    TEXT        |
|    primary_director    TEXT    <----------->                           |
|    year_released       INT     |           +---------------------------+
|    genre               TEXT    |
|                                |
+-------------^------------------+
              | one
              |
              |
              |
              |
              | many
      +-------v------------------+               +-------------------------+
      |        roles             |               |          actors         |
      |                          | many      one |                         |
      |   id              SERIAL | <-----------> |    id          SERIAL   |
      |   character_name  TEXT   |               |    full_name   TEXT     |
      |                          |               |    birthday    DATE     |
      +-------------------------+|               |                         |
                                                 +-------------------------+
```

and we are eventually going to represent these relationships in our `C#` code.

> If you have not read that lesson, or you have not generated a database from that lesson, and you intend on coding-along, stop now and create that database, tables, and data so that this lesson will work.

## Creating our first EF Core application

Start by making a plain console application so we can prompt the user if needed as well as output information.

```sh
dotnet new console -o SuncoastMovies
```

we will also need to add the Entity Framework library to our project

```sh
cd SuncoastMovies
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
```

### Define our first Model

We will begin by accessing the list of _movies_ from our database from our `C#` code.

Before we can do that we need to teach `C#` about the structure of a movie. We can do that by defining a `class` named `Movie` (singular) and give it properties corresponding to the same names we find in our table.

In our `Program.cs` we can add `class Movie` as such:

```C#
using System;

namespace SuncoastMovies
{
  class Movie
  {
    public int id { get; set; }
    public string title { get; set; }
    public string primary_director { get; set; }
    public int year_released { get; set; }
    public string genre { get; set; }
  }

  class Program
  {
    static void Main(string[] args)
    {
      Console.WriteLine("Hello World!");
    }
  }
}
```

Notice how we have modeled the property names and types to match the column names and types in the database. This is how `EF Core` will know how to **MAP** the information between our table and our objects. Here we are following a _convention_ that allows us to keep the same ideas between our object world and our database world. We can, of course, use different names between our objects and our tables. Sometimes this is done if you are accessing an old database which used unfriendly names.

These classes are typically referred to as _Models_.

You may also notice that there isn't anything in this class that indicates something about the database. In order to make this link we need an additional class.

### Connecting to the database through a context

To connect our POCO models to the database we use a `Database Context`, or `DbContext` for short. The purpose of the database context is to tell our code what models in the database are accessible as well as how to connect to the database.

Our database context looks like this:

```C#
// Define a database context for our Suncoast Movies database.
// It derives from (has a parent of) DbContext so we get all the
// abilities of a database context from EF Core.
class SuncoastMoviesContext : DbContext
{
  // Define a movies property that is a DbSet.
  public DbSet<Movie> movies { get; set; }

  // Define a method required by EF that will configure our connection
  // to the database.
  //
  // DbContextOptionsBuilder is provided to us. We then tell that object
  // we want to connect to a postgres database named suncoast_movies on
  // our local machine.
  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
  {
    optionsBuilder.UseNpgsql("server=localhost;database=suncoast_movies");
  }
}
```

> NOTE, this will require `using Microsoft.EntityFrameworkCore;`

Let's walk through this class. It is derived from `DbContext` which is provided by EF Core. The `DbContext` is what allows us to connect to our database and relate our models to tables.

We then define a property `movies` (plural) which we state is of type `DbSet<Movie>`. The `Movie` here is the model we wish to relate and `movies` corresponds to the `movies` table in our database. `DbSet` will act much like our `List` collection but has much more knowledge of how to read and write from the database.

Finally, we **override** a method required by `EF Core` that tells us how to connect to the database. EF Core will call this method to setup the connection to the database. In here we tell the options we are using a postgres database (`UseNpgsql`) and that the database is named `suncoast_movies` and is on our local machine.

## Using the context to get at data

Here is our code so far:

```C#
using System;
using Microsoft.EntityFrameworkCore;

namespace SuncoastMovies
{
  class Movie
  {
    public int id { get; set; }
    public string title { get; set; }
    public string primary_director { get; set; }
    public int year_released { get; set; }
    public string genre { get; set; }
  }

  // Define a database context for our Suncoast Movies database.
  // It derives from (has a parent of) DbContext so we get all the
  // abilities of a database context from EF Core.
  class SuncoastMoviesContext : DbContext
  {
    // Define a Movies property that is a DbSet.
    public DbSet<Movie> movies { get; set; }

    // Define a method required by EF that will configure our connection
    // to the database.
    //
    // DbContextOptionsBuilder is provided to us. We then tell that object
    // we want to connect to a postgres database named suncoast_movies on
    // our local machine.
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseNpgsql("server=localhost;database=suncoast_movies");
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

```C#
// Get a new context which will connect to the database
var context = new SuncoastMoviesContext()
```

With this object we access our `movies` property:

```C#
// Get a reference to our collection of movies.
// NOTE: this doesn't yet access any of them, just gives
//       us a variable that knows how.
var movies = context.movies;
```

Now with this `movies` object we can use some of our familiar `LINQ` capabilities. We start by seeing how we would count the number of movies in the table.

### Counting movies

```C#
var movieCount = movies.Count();
Console.WriteLine($"There are {movieCount} movies!");
```

> NOTE: this will require `using System.Linq;`

This should seem familiar as the `movies.Count()` statement eventually becomes a `SELECT COUNT(*) FROM MOVIES` in our database. This is a perfect example of the idea of an ORM. At the level of `C#` we are working with a `DbSet` and the `Count()` method from LINQ, however, EF Core is translating this to the appropriate SQL statements and returning us the data we need.

Running this code we will see the output of:

```
There are 14 movies!
```

### Getting a list of all the movies

To see all of the movies, we can use a `foreach` loop:

```C#
foreach (var movie in movies)
{
  Console.WriteLine($"There is a movie named {movie.title}");
}
```

Again, translated to SQL this would be `SELECT * FROM MOVIES`. However, here we receive instances of our `Movie` class we can use to output information such as each movie object's title: `movie.title`.

```
There are 14 movies!
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

So our application now looks like this:

```C#
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace SuncoastMovies
{
  class Movie
  {
    public int id { get; set; }
    public string title { get; set; }
    public string primary_director { get; set; }
    public int year_released { get; set; }
    public string genre { get; set; }
  }

  // Define a database context for our Suncoast Movies database.
  // It derives from (has a parent of) DbContext so we get all the
  // abilities of a database context from EF Core.
  class SuncoastMoviesContext : DbContext
  {
    // Define a Movies property that is a DbSet.
    public DbSet<Movie> movies { get; set; }

    // Define a method required by EF that will configure our connection
    // to the database.
    //
    // DbContextOptionsBuilder is provided to us. We then tell that object
    // we want to connect to a postgres database named suncoast_movies on
    // our local machine.
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseNpgsql("server=localhost;database=suncoast_movies");
    }
  }

  class Program
  {
    static void Main(string[] args)
    {
      // Get a new context which will connect to the database
      var context = new SuncoastMoviesContext();

      // Get a reference to our collection of movies.
      // NOTE: this doesn't yet access any of them, just gives
      //       us a variable that knows how.
      var movies = context.movies;

      var movieCount = movies.Count();
      Console.WriteLine($"There are {movieCount} movies!");

      foreach (var movie in movies)
      {
        Console.WriteLine($"There is a movie named {movie.title}");
      }
    }
  }
}
```

### Bonus: Seeing what SQL our code is generating.

It is often interesting to see the SQL being generated and executed by our application. To do this we need to configure some code to add a `logger` to our application. A `logger` is code that receives events from the system and then outputs a descriptive text describing the event. In this case, the interactions with the database.

Before we can use the logger we must add another package to our application:

```sh
dotnet add package Microsoft.Extensions.Logging.Console
```

Then we can add this code to our `OnConfiguring` method:

```C#
var loggerFactory = LoggerFactory.Create(builder => builder.AddConsole());
optionsBuilder.UseLoggerFactory(loggerFactory);
```

This will take any of the database events and output them to the `console` where we can see them.

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

Our database has other tables we could add to our system: `ratings`, `roles`, and `actors`.

Lets add a model for our ratings.

```C#
class Rating
{
  public int id { get; set; }
  public string rating { get; set; }
}

// Add this inside `SuncoastMoviesContext`

// Define a Ratings property that is a DbSet.
public DbSet<Movie> ratings { get; set; }
```

Now we would be able to query our table of ratings. This is great, but what we want to do is see the rating for a specific movie. To achieve this we need to relate the two tables.

We need to modify the `Movie` model to tell it how to relate to the `Rating` model. To do this, we'll add the following code:

```C#
[ForeignKey("rating_id")]
public Rating rating { get; set; }
```

> NOTE: This will require `using System.ComponentModel.DataAnnotations.Schema;`

This tells the `Movie` model that it can use the `rating` property to return a `Rating` object. It also tells the system to use the `rating_id` column to look up the corresponding `id` in the `ratings` table. We need this because by default it is expecting a column named `ratingid`.

Now when we access the `context.movies` we can also tell it to fetch the related `rating` via the `Include` method.

```C#
var movies = context.movies.Include(movie => movie.rating);
```

Now when we access the `movies` we are going to generate a **JOIN** to the `ratings` table and bring that information back again.

Now we can change our loop to also show the `rating` if it has one.

```C#
foreach (var movie in movies)
{
  if (movie.rating == null)
  {
    Console.WriteLine($"There is a movie named {movie.title} and has not been rated yet");
  }
  else
  {
    Console.WriteLine($"There is a movie named {movie.title} and a rating of {movie.rating.rating}");
  }
}
```

Notice how if their is no related `rating` we need to see that the `movie.rating` is not `null`. This will be the case for each row in `movies` that doesn't have a `rating_id` that matches something from the `ratings` table.

If we run this code we will see the SQL joins being generated:

```
info: Microsoft.EntityFrameworkCore.Infrastructure[10403]
      Entity Framework Core 3.1.3 initialized 'SuncoastMoviesContext' using provider 'Npgsql.EntityFrameworkCore.PostgreSQL' with options: None
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (3ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
      SELECT COUNT(*)::INT
      FROM movies AS m
There are 14 movies!
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
      Executed DbCommand (18ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
      SELECT m.id, m.genre, m.primary_director, m.rating_id, m.title, m.year_released, r.id, r.rating
      FROM movies AS m
      LEFT JOIN ratings AS r ON m.rating_id = r.id
There is a movie named The Lost World and has not been rated yet
There is a movie named Pirates of the Caribbean: The Curse of the Black Pearl and has not been rated yet
There is a movie named Harry Potter and Goblet of Fire and has not been rated yet
There is a movie named The Hobbit: An Unexpected Journey and has not been rated yet
There is a movie named The Hobbit: The Desolation of Smaug and has not been rated yet
There is a movie named The Hobbit: The Battle of the Five Armies and has not been rated yet
There is a movie named The Lord of the Rings: The Return of the King and has not been rated yet
There is a movie named Cujo and has not been rated yet
There is a movie named It and has not been rated yet
There is a movie named It and has not been rated yet
There is a movie named Howls Moving Castle and has not been rated yet
There is a movie named The Lord of the Rings: The Fellowship of the Ring and a rating of G
There is a movie named The Lord of the Rings: The Two Towers and a rating of G
There is a movie named Hitchhikers Guide to the Galaxy and a rating of G
```

Here is our code so far:

```C#
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace SuncoastMovies
{
  class Movie
  {
    public int id { get; set; }
    public string title { get; set; }
    public string primary_director { get; set; }
    public int year_released { get; set; }
    public string genre { get; set; }

    [ForeignKey("rating_id")]
    public Rating rating { get; set; }
    public int rating_id { get; set; }
  }

  class Rating
  {
    public int id { get; set; }
    public string rating { get; set; }
  }

  // Define a database context for our Suncoast Movies database.
  // It derives from (has a parent of) DbContext so we get all the
  // abilities of a database context from EF Core.
  class SuncoastMoviesContext : DbContext
  {
    // Define a Movies property that is a DbSet.
    public DbSet<Movie> movies { get; set; }

    // Define a Ratings property that is a DbSet.
    public DbSet<Rating> ratings { get; set; }

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

      optionsBuilder.UseNpgsql("server=localhost;database=suncoast_movies");
    }
  }

  class Program
  {
    static void Main(string[] args)
    {
      // Get a new context which will connect to the database
      var context = new SuncoastMoviesContext();

      // Get a reference to our collection of movies.
      // NOTE: this doesn't yet access any of them, just gives
      //       us a variable that knows how.
      // ALSO: use the Include method to bring in the rating
      var movies = context.movies.Include(movie => movie.rating);

      var movieCount = movies.Count();
      Console.WriteLine($"There are {movieCount} movies!");

      foreach (var movie in movies)
      {
        if (movie.rating == null)
        {
          Console.WriteLine($"There is a movie named {movie.title} and has not been rated yet");
        }
        else
        {
          Console.WriteLine($"There is a movie named {movie.title} and a rating of {movie.rating.rating}");
        }
      }
    }
  }
}
```

### Add in other relationships.

Finally, we can add the relationships for `Role` and `Actor`.

```C#
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace SuncoastMovies
{
  class Movie
  {
    public int id { get; set; }
    public string title { get; set; }
    public string primary_director { get; set; }
    public int year_released { get; set; }
    public string genre { get; set; }

    [ForeignKey("rating_id")]
    public Rating rating { get; set; }
    public int? rating_id { get; set; }

    public List<Role> roles { get; set; }
  }

  class Rating
  {
    public int id { get; set; }
    public string rating { get; set; }
  }

  class Role
  {
    public int id { get; set; }
    public string character_name { get; set; }

    public int movie_id { get; set; }
    [ForeignKey("movie_id")]
    public Movie movie { get; set; }

    public int actor_id { get; set; }
    [ForeignKey("actor_id")]
    public Actor actor { get; set; }
  }

  class Actor
  {
    public int id { get; set; }
    public string full_name { get; set; }
    public DateTime birthday { get; set; }

    public List<Role> roles { get; set; }
  }

  // Define a database context for our Suncoast Movies database.
  // It derives from (has a parent of) DbContext so we get all the
  // abilities of a database context from EF Core.
  class SuncoastMoviesContext : DbContext
  {
    // Define a Movies property that is a DbSet.
    public DbSet<Movie> movies { get; set; }

    // Define a Ratings property that is a DbSet.
    public DbSet<Rating> ratings { get; set; }

    // Define a roles property that is a DbSet.
    public DbSet<Role> roles { get; set; }

    // Define an actors property that is a DbSet.
    public DbSet<Actor> actors { get; set; }

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

      optionsBuilder.UseNpgsql("server=localhost;database=suncoast_movies");
    }
  }

  class Program
  {
    static void Main(string[] args)
    {
      // Get a new context which will connect to the database
      var context = new SuncoastMoviesContext();

      // Get a reference to our collection of movies.
      // NOTE: this doesn't yet access any of them, just gives
      //       us a variable that knows how.
      // ALSO: use the Include method to bring in the rating
      var movies = context.movies.Include(movie => movie.rating).Include(movie => movie.roles).ThenInclude(role => role.actor);

      var movieCount = movies.Count();
      Console.WriteLine($"There are {movieCount} movies!");

      foreach (var movie in movies)
      {
        if (movie.rating == null)
        {
          Console.WriteLine($"There is a movie named {movie.title} with has not been rated yet");
        }
        else
        {
          Console.WriteLine($"There is a movie named {movie.title} with a rating of {movie.rating.rating}");
        }

        foreach (var role in movie.roles)
        {
          Console.WriteLine($" - Has a character named {role.character_name} played by {role.actor.full_name}");
        }
      }
    }
  }
}
```
