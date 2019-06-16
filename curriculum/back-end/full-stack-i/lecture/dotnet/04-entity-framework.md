# Entity Framework

- [Entity Framework Core(EF Core)](https://docs.microsoft.com/en-us/ef/core/) is a popular [object-relational mapper (ORM)](https://en.wikipedia.org/wiki/Object-relational_mapping) that is built by Mircosoft for .NET Core.
- EF Core allows developers to use databases while using our native language (C#).
- ORMs are not unique to C#, and are usually found in many modern languages.
- In C#, Ef Core uses a combination of classes (Plain Old C# Objects or POCOs) and LINQ.
- We use a class coalled our DbContext to represent our database. This will hold all the configuration (connection string, type, etc...) and what tables the database has.
- We use POCOs to model our database tables. This includes schema (columns) and the relationships
- We use LINQ statements to generate SQL queries against our database.

## Setting up a new project with EF Core and Postgres

### 0. Navigate to your project

THE FIRST 4 Steps are all in BASH/PowerShell. Navigate to your where you want to create your project.

### 1. Create a new dotnet project.

Using the dotnet cli, create a new project

```bash
  dotnet new console -n KurtsVideoRental
```

### 2. Add the needed Libraries

In order to talk to our database, we have to tell our code how to talk to our database and what language.

​- How we talk to the database aka ORM (EntityFramework)

```bash
​ dotnet add package Microsoft.EntityFrameworkCore.Design
```

- Which Database am I talking to?(PostgreSQL)

```bash
​dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL

```

### 3. Create the database

On a new project, we need to create the database. This can be done with the pgcli tools we have used before

```bash
createdb MovieDb

```

### 4. Scaffold our DbContext

We need to “scaffold” our ​database context​. This is the connection between the database and the ​ORM.

```bash
dotnet ef dbcontext scaffold "server=localhost;database=MovieDb"
Npgsql.EntityFrameworkCore.PostgreSQL -c MovieContext
```

This will create a file called `MovieContext.cs` in the root of our project. We will adding code to this file later.

### 5. Creating tables

When we are complete with the setting up the structure of our app, we will need to start defining our databases.

Open your project in vs code using `code .` .

We need to create a new file, name it `Movie.cs`. This is we are creating a POCO that represents our database table.

```C#
namespace KurtsVideoRental ​
{
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
}

```

### 6. Adding tables to our database

To represent our database in our C#, use a special type of a ​List ​that says this is a database table. This unique List is called [`DbSet`](https://docs.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.dbset-1?view=efcore-2.1).

Now head over to the `MovieContext.cs` file. Since `MovieContext.cs` is our representation of our database, this is where we add our DbSet.

Write this code inside the partial class’ { }.

```C#
public DbSet<Movie> Movies {get;set;}
```

This will says we will create a table called `Movies` with the same structure as our `Movie` POCO.

### 7. Updating our database

Since we are using EF Core to work with our database, we will need to us EF to tell our database to update. We use `migrations` to tell our database how our database structure has changed. Since we have changed our database structure (added a table), we need to create a migration and apply that migrations

To create a migration, head back to the terminal and run:

```bash
  dotnet ef migrations add AddedMovieTable
```

`AddedMovieTable` should be a meaningful title. This will help us track what changes are being made. We can create multiple migrations at a time, but they are not applied until we update our database.

Once you are happy with your POCOs and database structure, run

```bash
dotnet ef database update
```

Now you should see your tables (Movies) in your database if you look with your pgcli tools.

You can now use EF Core in your code to query your Postgres Database.

## Using EF Core in C

Commonly, interactions with database boil down to one of 4 main actions: **C**reate, **R**ead, **U**pdate, **D**elete, or CRUD. To CRUD your database in C#, you will be using LINQ. In order to use any of these methods, you need to create an instance of your Database context (called `MovieContext` in past section).

### Create

```C#
// Connect to you database
var db = new MovieContext();
// create the new movie
db.Movies.Add(new Movie{
  Name="Jaws",
  Tagline="She was the first...Who will be next?"
});
// save the movie to the database
db.SaveChanges();

```

### Read

```C#
var db = new MovieContext();
var popularMovies = movies.Where(movie => movie.Screenings >= 100);

```

### Update

```C#
var db = new MovieContext();
var bestMovie = db.Movies.FirstOrDefault(movie => movie.Name == "Jaws");
if (bestMovie != null){
  bestMovie.PricePerTicket = bestMovie.PricePerTicket * 1.5;
  db.SaveChanges();
}
```

### Delete

```C#
var db = new MovieContext();
var movieToDelete = db.Movies.FirstOrDefault(movie => movie.Name == "Frozen");
if (movieToDelete != null){
  db.Movies.Remove(movieToDelete)
  db.SaveChanges();
}
```

## Useful commands for using EF Core

### .NET

Here are the interesting commands you will need for tonight's assignment

- To add Entity Framework to your project:

```
 dotnet add package Microsoft.EntityFrameworkCore.Design

 dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
```

- To create your database:

```
createdb <<DatabaseName>>
```

- To create the DbContext

```
dotnet ef dbcontext scaffold "server=localhost;database=<<DatabaseName>>" Npgsql.EntityFrameworkCore.PostgreSQL -c <<DatabaseName>>Context

```

- Add a migration:

```
 dotnet ef migrations add AddBaordGameTable
```

- Update your database

```
dotnet ef database update
```
