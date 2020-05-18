---
title: The Rise of the Tamagotchi
---

To start your journey you will, you will creating an API that allows a user to create and care for a virtual pet, reminiscent of a [Tamagachi](https://en.wikipedia.org/wiki/Tamagotchi). The basic functionality will walk you through the 4 basic parts of a web api, create, read, update and delete. For explorer mode, keep it simple and they add features.

## Objectives

- Create an API that can CRUD against a Database
- practice creating ASP.NET Web API endpoints
- practice EF Core.

## Requirements

- Create a simple API that has a handful of endpoints to manage data
- The API should be using Web API Controllers, Ef Core, and Postgres database
- Use [Postman](https://www.postman.com/) for interacting with your API.
- Install the `sdg-api` template using the command `dotnet new -i SDG.templates.Web.API`

### Explorer Mode

- Create and new `sdg-api` that has the following features

- a database with 1 table, called `Pets`.
  - Should use a POCO called `Pet` with the following columns:
    - Id (int)
    - Name (string)
    - Birthday (DateTime)
    - DeathDate (DateTime?)
    - HungerLevel (int)
    - HappinessLevel (int)

Your API should have the following endpoints

- [ ] `GET /api/pets`, this should return all pets in your database.
- [ ] `GET /api/pets/{id}`, This should return the pet with the corresponding Id.
- [ ] `POST /api/pets`, This should create a new pet. The body of the request should contain the name of the pet.
- [ ] `PUT /api/pets/{id}/play`, This should find the pet by id, and add 5 to its happiness level and add 3 to its hungry level
- [ ] `PUT /api/pets/{id}/feed`, This should find the pet by id, and remove 5 from its hungry level and add 3 to its happiness level.
- [ ] `PUT /api/pets/{id}/scold`, This should find the pet by id, and remove 5 from its happiness level
- [ ] `DELETE /api/pets/{id}`, this should delete a pet from the database by Id

### Adventure Mode

Add the following features to your API

- Add a column to your pet model call `IsDead` (bool). Whenever you call a PUT to update a pet, give your pet a 10% chance of Dying.
- Add a `LastInteractedWithDate`(DateTime), that gets updated every time a pet is queried from the database on PUT or a GET. If the `LastInteractedWithDate` is ever over 3 days, the pet should die from neglect.
- Add an endpoint that gets Pets that are only alive

Create a console app that interacts with your API that:

- allows the user to see all alive pets
- Select a pet to take care of
- Play, scold and feed with the selected pet.
- create a new pet
- Delete a pet

### Epic mode

- Have fun with it and try to recreate a [Tamagachi](https://en.wikipedia.org/wiki/Tamagotchi)
- Following the steps [here](https://suncoast.io/handbook/curriculum/back-end/full-stack-i/lecture/dotnet/08-deployment/), Learn about and use docker to deploy your API to the web.

## Resources

- Use [Postman](https://www.postman.com/) for interacting with your API
- [lecture notes](https://suncoast.io/handbook/curriculum/back-end/full-stack-i/lecture/dotnet)
- [Web API Tutorial](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-3.1)
- [Web API docs](https://dotnet.microsoft.com/apps/aspnet/apis)
