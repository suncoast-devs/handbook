---
title: The Rise of the Tamagotchi
tags: ["c-sharp", "console", "api", "ef-core", "dotnet"]
---

To start your journey you will be creating an API that allows a user to create
and care for a virtual pet, reminiscent of a
[Tamagotchi](https://en.wikipedia.org/wiki/Tamagotchi). The basic functionality
will walk you through the four basic parts of a web API, create, read, update
and delete.

## Objectives

- Create an API that can implement CRUD features against a Database.
- Practice creating ASP.NET Web API endpoints.
- Practice EF Core.

### Explorer Mode

- Create and new `sdg-api` that has the following features

- Create a database with one table named `Pets`.
  - Should use a POCO called `Pet` with the following columns:
    - Id (int)
    - Name (string)
    - Birthday (DateTime)
    - HungerLevel (int)
    - HappinessLevel (int)

Your API should have the following endpoints

- [ ] `GET /api/pets`, should return all pets in your database.
- [ ] `GET /api/pets/{id}`, should return the pet with the corresponding id.
- [ ] `POST /api/pets`, should create a new pet. The body of the request should
      contain the name of the pet. The pets `Birthday` should default to the
      current datetime, `HungerLevel` defaults to 0 and `HappinessLevel`
      defaults to 0.
- [ ] `POST /api/pets/{id}/playtimes`, should find the pet by id and add 5 to
      its happiness level and 3 to its hungry level.
- [ ] `POST /api/pets/{id}/feedings`, should find the pet by id and subtract 5
      from its hungry level and 3 from its happiness level.
- [ ] `POST /api/pets/{id}/scoldings`, should find the pet by id and subtract 5
      from its happiness level.
- [ ] `DELETE /api/pets/{id}`, should delete a pet from the database by Id

### Adventure Mode

Add the following features to your API

- Add columns `LastInteractedWithDate` (DateTime). Every time a pet us updated
  in the database, set the `LastInteractedWithDate` to the current time. Add a
  property named `IsDead` to your `Pets` that has logic such that if the
  `LastInteractedWithDate` is over 3 days old, the property returns `true`
  otherwise `false`.
- Add a query parameter go `GET /api/pets` that only returns Pets that are
  alive.

### Epic mode

Create a console app that interacts with your API that:

- Allows the user to see all pets
- Select a pet to take care of and then play with, scold, or feed the selected
  pet.
- Create a new pet.
- Delete a pet.

## Resources

- [Web API Tutorial](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-3.1)
- [Web API docs](https://dotnet.microsoft.com/apps/aspnet/apis)
