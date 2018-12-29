# ORM Safari!

We are taking a surprise trip to the Savannah for a safari to see all sorts of exotic animals. During our time their we want to keep track of all the animals we have seen. For this, we need to create a database, as well as a small console application to help record what we see.

## Objectives

- Use an ORM to query against a database

## Requirements

### Explorer Mode

- [ ] Create a database called `SafariVacation` / `safari_vacation`
  - [ ] This will have 1 table called `SeenAnimals` / `seen_animals` that has the following columns
    - `Id` / `id` (int)
    - `Species` / `species` (string)
    - `CountOfTimesSeen` / `count_of_times_seen` (int)
    - `LocationOfLastSeen` / `location_of_last_seen` (string)
  * NOTE: This should be made all in the code (C#/Ruby), and **not** created in the `pgcli`.
- [ ] Create a small console application, and create the following queries using your languages ORM.
  - [ ] Display all animals the user has seen
  - [ ] Update the `CountOfTimesSeen` and `LocationOfLastSeen` for an animal
  - [ ] Display all animals seen in the `Jungle`
  - [ ] Remove all animals that I have seen in the `Desert`.
  - [ ] Add all the `CountOfTimesSeen` and get a total number of animals seen
  - [ ] Get the `CountOfTimesSeen` of `lions`, `tigers` and `bears`

### Adventure Mode

- [ ] Add a new column called `LastSeenTime` (Ruby: `last_seen_at`), with a type of DateTime. This will require you to add and run a new migration.

### Epic Mode

- [ ] Continue to make progress on your capstone project.

## Additional Resources

### .NET

Here are the interesting commands you will need for tonight's assignment

- To add Entity Framework to your project:

```
 dotnet add package Microsoft.EntityFrameworkCore.Design --version 2.1.3

 dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL --version 2.1.2
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

- Documentation: [Dotnet EF CLI Docs](https://docs.microsoft.com/en-us/ef/core/miscellaneous/cli/dotnet)

## Reading Material

To prepare for upcoming lessons, students might want to read links shared here.
