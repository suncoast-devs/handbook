---
title: The Rise of the Tamagotchi
tags: ['c-sharp', 'console', 'api', 'ef-core', 'dotnet']
---

To start your journey you will be creating an API that allows a user to create and care for a virtual pet, reminiscent of a [Tamagotchi](https://en.wikipedia.org/wiki/Tamagotchi). The basic functionality will walk you through the four basic parts of a web API, create, read, update, and delete.

## Objectives

- Create an API that can implement CRUD features against a database.
- Practice creating ASP.NET Web API endpoints.
- Practice EF Core.

### Setup

```shell
dotnet new sdg-api -o TamagotchiAPI
```

### Explorer Mode

- Create and new `sdg-api` that has the following features

- Create a database with a table named `Pets`.
  - Should use a POCO called `Pet` with the following columns:
    - Id (int - automatic primary key)
    - Name (string)
    - Birthday (DateTime)
    - HungerLevel (int)
    - HappinessLevel (int)
- Create a table named `Playtimes` that has the following columns:
  - Id (int - automatic primary key)
  - When (DateTime)
  - PetId (int - foreign key to Pet)
- Create a table named `Feedings` that has the following columns:
  - Id (int - automatic primary key)
  - When (DateTime)
  - PetId (int - foreign key to Pet)
- Create a table named `Scoldings` that has the following columns:
  - Id (int - automatic primary key)
  - When (DateTime)
  - PetId (int - foreign key to Pet)

Your API should have the following endpoints

- [ ] `GET /pets`, should return all pets in your database.
- [ ] `GET /pets/{id}`, should return the pet with the corresponding id.
- [ ] `POST /pets`, should create a new pet. The body of the request should contain a JSON object with a key of "name" and a value of the pet's name. The pets `Birthday` should **default** to the current datetime, `HungerLevel` **defaults** to 0 and `HappinessLevel` **defaults** to 0. (Hint: it might be useful to set these as model defaults!)
- [ ] `DELETE /pets/{id}`, should delete a pet from the database by Id
- [ ] `POST /pets/{id}/playtimes`, should find the pet by id and add 5 to its happiness level and add 3 to its hungry level. It should also create a new `Playtime` for this pet and the current time.
- [ ] `POST /pets/{id}/feedings`, should find the pet by id and subtract 5 from its hungry level and add 3 to its happiness level. It should also create a new `Feeding` for this pet and the current time.
- [ ] `POST /pets/{id}/scoldings`, should find the pet by id and subtract 5 from its happiness level. It should also create a new `Scolding` for this pet and the current time.

Demonstrate your API works

- [ ] Using Insomnia, create three Pets. Include a screenshot containing the API request and the response.
- [ ] Using Insomnia, create a playtime for one of your pets. Show the API request and the response.
- [ ] Using Insomnia, create a feeding for one of your pets. Show the API request and the response.
- [ ] Using Insomnia, create a scolding for one of your pets. Show the API request and the response.
- [ ] Using Insomnia, show the details of all the pets. Show the API request and the response.

### Adventure Mode

Add the following features to your API

- Add columns `LastInteractedWithDate` (DateTime). Every time a pet us updated in the database, set the `LastInteractedWithDate` to the current time. Add a property named `IsDead` to your `Pets` that has logic such that if the `LastInteractedWithDate` is over 3 days old, the property returns `true` otherwise `false`.
- Add a query parameter go `GET /pets` that only returns Pets that are alive.

### Epic mode

Create a console app that interacts with your API that:

- Allows the user to see all pets
- Select a pet to take care of and then play with, scold, or feed the selected pet.
- Create a new pet.
- Delete a pet.

## Resources

- [Web API Tutorial](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-3.1)
- [Web API docs](https://dotnet.microsoft.com/apps/aspnets)
