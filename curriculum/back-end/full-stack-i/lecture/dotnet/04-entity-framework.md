# Entity Framework

- [Entity Framework Core(EF Core)](https://docs.microsoft.com/en-us/ef/core/) is a popular [object-relational mapper (ORM)](https://en.wikipedia.org/wiki/Object-relational_mapping) that is built by Mircosoft for .NET Core.
- EF Core allows developers to use databases while using our native language (C#).
- ORMs are not unique to C#, and are usually found in many modern languages.
- In C#, Ef Core uses a combination of classes (Plain Old C# Objects or POCOs) and LINQ.
- We use a class coalled our DbContext to represent our database. This will hold all the configuration (connection string, type, etc...) and what tables the database has.
- We use POCOs to model our database tables. This includes schema (columns) and the relationships
- We use LINQ statements to generate SQL queries against our database.

### Useful commands for using EF Core

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
