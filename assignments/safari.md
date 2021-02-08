---
title: ORM Safari! Part I
tags: ['c-sharp', 'console', 'sql', 'orm', 'ef-core', 'dotnet']
---

We are taking a surprise trip to the Savannah for a safari to see all sorts of
exotic animals. During our time there we want to keep track of all the animals
we have seen. For this, we need to create a database, as well as a small console
application to help record what we see.

## Objectives

- Use an ORM to query against a database

## Requirements

### Additional Reading

_NOTE_: The Additional Resources section below is _very_ helpful. Consider
reading this after reading _Explorer_ mode. Then make a plan for the assignment
for digging in and writing code.

### Setup

```shell
dotnet new sdg-console-database -o SafariConsole
```

### Explorer Mode

- Create a database called `SafariVacation`
  - This will have 1 table called `SeenAnimals` that has the following
    columns
    - `Id` (int)
    - `Species` (string)
    - `CountOfTimesSeen` (int)
    - `LocationOfLastSeen` (string)
  * NOTE: This should be made all in the code (C#), and **not** created in the
    `pgcli`.
- Create a small console application, and create the following queries using
  your languages ORM.
  - Display all animals the user has seen
  - Update the `CountOfTimesSeen` and `LocationOfLastSeen` for an animal
  - Display all animals seen in the `Jungle`
  - Remove all animals that I have seen in the `Desert`.
  - Add all the `CountOfTimesSeen` and get a total number of animals seen
  - Get the `CountOfTimesSeen` of `lions`, `tigers` and `bears`

### Adventure Mode

- Add a new column called `LastSeenTime`, with a type of DateTime. This will
  require you to add and run a new migration.

### Epic Mode

- Continue to make progress on your capstone project. This should be tasks
  like Database Schema, HTML, CSS

## Additional Resources

### .NET

- [EF Core](https://docs.microsoft.com/en-us/ef/core/)
- Documentation:
  [Dotnet EF CLI Docs](https://docs.microsoft.com/en-us/ef/core/miscellaneous/cli/dotnet)
- [LINQ notes](https://suncoast.io/handbook/curriculum/back-end/full-stack-i/lecture/dotnet/03-Linq/)
- [EF Core Notes](https://suncoast.io/handbook/curriculum/back-end/full-stack-i/lecture/dotnet/04-entity-framework/)
