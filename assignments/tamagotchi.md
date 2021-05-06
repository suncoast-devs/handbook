---
title: The Rise of the Tamagotchi
tags: ['c-sharp', 'console', 'api', 'ef-core', 'dotnet']
---

This project will create an API that allows a user to create and care for a virtual pet, reminiscent of a [Tamagotchi](https://en.wikipedia.org/wiki/Tamagotchi). The basic functionality will include the four parts of a web API: create, read, update, and delete.

## Objectives

- Create an API that implements CRUD features against a database.
- Practice creating ASP.NET Web API endpoints.
- Practice EF Core.

### Setup

```shell
dotnet new sdg-api -o TamagotchiAPI
```

### Resources

- [Web API Tutorial](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-5.0)
- [Web API docs](https://dotnet.microsoft.com/apps/aspnets)

### Explorer Mode

- Create and new `sdg-api` that has the following features

- You may use `dotnet ef migrations add` or `pgcli` + `CREATE TABLE` - You the student can choose which you prefer to use.
- Create a database with a table named `Pets`.
  - Should use a POCO called `Pet` with the following columns:
    - `Id` (int - automatic primary key)
    - `Name` (string)
    - `Birthday` (DateTime)
    - `HungerLevel` (int)
    - `HappinessLevel` (int)
- Create a table named `Playtimes` that has the following columns:
  - `Id` (int - automatic primary key)
  - `When` (DateTime)
  - `PetId` (int - foreign key to Pet)
- Create a table named `Feedings` that has the following columns:
  - `Id` (int - automatic primary key)
  - `When` (DateTime)
  - `PetId` (int - foreign key to Pet)
- Create a table named `Scoldings` that has the following columns:
  - `Id` (int - automatic primary key)
  - `When` (DateTime)
  - `PetId` (int - foreign key to Pet)

The API will have the following endpoints.

- `GET /pets` should return all pets in your database.
- `GET /pets/{id}` should return the pet with the corresponding id.
- `POST /pets` should create a new pet. The controller should ensure the following: `Birthday` **defaults** to the current DateTime, `HungerLevel` **defaults** to `0` and `HappinessLevel` **defaults** to `0`.
- `DELETE /pets/{id}`, should delete a pet from the database by Id
- `POST /pets/{id}/playtimes` should find the pet by id and add five to its happiness level and add three to its hunger level. It should also create a new `Playtime` for this pet and the current time.
- `POST /pets/{id}/feedings` should find the pet by id and subtract five from its hungry level and add three to its happiness level. It should also create a new `Feeding` for this pet and the current time.
- `POST /pets/{id}/scoldings` should find the pet by id and subtract five from its happiness level. It should also create a new `Scolding` for this pet and the current time.

Demonstrate the API works

- Using Insomnia, create three Pets. Include a screenshot containing the API request and the response. Post the image in the comment when turning in the assignment.
- Using Insomnia, create a playtime for one of your pets. Show the API request and the response. Post the image in the comment when turning in the assignment.
- Using Insomnia, create a feeding for one of your pets. Show the API request and the response. Post the image in the comment when turning in the assignment.
- Using Insomnia, create a scolding for one of your pets. Show the API request and the response. Post the image in the comment when turning in the assignment.
- Using Insomnia, show the details of all the pets. Show the API request and the response. Post the image in the comment when turning in the assignment.

### Adventure Mode

Add the following features to the API

- Add columns `LastInteractedWithDate` (DateTime). When a pet is updated, set the `LastInteractedWithDate` to the current time. Add a property named `IsDead` to your `Pet.` The logic of this method will return `true if `LastInteractedWithDate`is over three days old; otherwise, it will return `false`.
- Add a query parameter to `GET /pets` that only returns Pets that are alive.

### Epic mode

Create a console app that interacts with the API that:

- Allows the user to see all pets
- Select a pet to take care of and then play with, scold, or feed the selected pet.
- Create a new pet.
- Delete a pet.
