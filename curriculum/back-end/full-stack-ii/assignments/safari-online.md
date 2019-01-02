# Take the Safari Online.

## Let's Continue our safari adventure

We are taking a surprise trip to the Savannah for a safari to see all sorts of exotic animals. During our time their we want to keep track of all the animals we have seen. For this, we need to create an API to help record what we see.

## Objectives

- Practice Creating Simple APIs
- Practice working with API Tools, such as POSTMAN (https://www.getpostman.com/)

## Requirements

- Using Ruby on Rails or ASP.NET create a simple API for you Safari Database
- Use your language's naming conventions where appropriate.

### Explorer Mode

- NOTE: For the instructions below, the C# name is first and the Ruby name is second. For instance, `SeenAnimal/seen_animals`

* [ ] Your database will be named called `SafariVacation` / `safari_vacation`

  - [ ] This will have 1 table called `SeenAnimals` / `seen_animals` that has the following columns
    - `Id` / `id` (int)
    - `Species` / `species` (string)
    - `CountOfTimesSeen` / `count_of_times_seen` (int)
    - `LocationOfLastSeen` / `location_of_last_seen` (string)

  * NOTE: This should be made all in the code (C#/Ruby), and **not** created in the `pgcli`.

* [ ] Your API should have the following endpoints:
  - [ ] Create `GET /Animals` Endpoint that returns all animals you have seen
  - [ ] Create `GET /Search?species=lion` that returns all animals where the species name contains the species parameter
  - [ ] Create a `POST /Animal` endpoints that adds an animal to the database. THis should take a JSON body
  - [ ] Create a `GET /Animal/{location}` that returns animals of only that location
  - [ ] Create a `PUT /Animal/{id}` endpoint that adds 1 to the count of times seen for that animal (given by id)
  - [ ] Create a `DELETE /Animal/{id}` endpoint that deletes that animal id from the database

### Adventure Mode

- [ ] Normalize your database to have `Location` be its own table
- [ ] Extend your `Search` endpoint to search by animal or by location
- [ ] Create a `PUT /Animal/{animal}/{amount}` endpoint that adds `{amount}` to that animal

### Epic Mode

- [ ] Create a React or Vue app that talks to your API and Interacts with all the endpoints
- [ ] Work on your capstone

## Additional Resources

### .NET

Here are the interesting commands you will need for tonights assignment

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

NOTES:

- You may want to delete and recreate your database
