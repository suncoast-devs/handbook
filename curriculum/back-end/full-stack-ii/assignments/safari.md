# ORM Safari!

We are taking a surprise trip to the Savannah for a safari to see all sorts of exotic animals. During our time their we want to keep track of all the animals we have seen. For this, we need to create a database, as well as a small console application to help record what we see.

## Objectives

- Use an ORM to query against a database

## Requirements

### Additional Reading

_NOTE_: The Additional Resources section below is _very_ helpful. Consider reading this after reading _Explorer_ mode. Then make a plan for the assignment for digging in and writing code.

### Explorer Mode (C#)

- [ ] Create a database called `SafariVacation`
  - [ ] This will have 1 table called `SeenAnimals` that has the following columns
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

### Explorer Mode (Ruby)
- [ ] Create a database called `safari_vacation`
  - [ ] This will have 1 table called `animals` that has the following columns
    - `id` (int)
    - `species` (string)
    - `seen_count` (int)
    - `last_seen_location` (string)
  * NOTE: This should be made all in the code (Ruby), and **not** created in the `pgcli`.
- [ ] Create a small console application. Your application should prompt the user with a menu with the following options and corresponding actions
  - [ ] Type `display_all` to show all the animals.
  - [ ] Type 'increment` to then prompt the user for a species. Add `1` to the `seen_count` for that species and display the new count.
  - [ ] Type `specie` to prompt for a specific species and show the details for just that species.
  - [ ] Type 'spot' to prompt the user for a species and a location. Update that species `last_seen_location`
  - [ ] Type 'extinct' to prompt the user for a location and delete all the species in that location
  - [ ] Type 'total` to get the total `seen_count` of all animals

### Adventure Mode (C#)

- [ ] Add a new column called `LastSeenTime`, with a type of DateTime. This will require you to add and run a new migration.

### Adventure Mode (Ruby)

- [ ] Add a new column called `last_seen_at`, with a type of DateTime.
- [ ] Update the `spot` and `increment` menu options to record the current time as `last_seen_at`

### Epic Mode

- [ ] Continue to make progress on your capstone project.

## Additional Resources

### Ruby

- [Active Record Basics](http://guides.rubyonrails.org/active_record_basics.html)
  - Sections 1, 2, 3, 5
- [Active Record Querying](http://guides.rubyonrails.org/active_record_querying.html)
  - Sections 1, 2, 3, 4, 5
- [Active Record Associations](http://guides.rubyonrails.org/association_basics.html)
  - Sections 1, 2

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

