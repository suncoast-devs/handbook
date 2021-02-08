---
title: Don't Lose Track! Part III
tags: ['c-sharp', 'dotnet', 'api', 'sql']
---

Now that we have new API skills, we want to create an API to help our favorite
store keep track of their inventory. This API will be able to let users add,
update, delete, and search for items.

## Objectives

- Create an API that can CRUD against a Database
- practice creating ASP.NET Web API endpoints
- practice EF Core.
- Working with docker

## Requirements

- Create a simple API that has a handful of endpoints to manage data
- The API should be using Web API Controllers, Ef Core, and Postgres database
- deploy your app to Heroku

### Explorer Mode

- Create a new `sdg-api` project using the dotnet CLI, have fun with the
  name and what items the shop sells.
- Create a Model for an item in the shop. This will be your database table
  structure.
- The Item should have at least

  - Id
  - SKU
  - Name
  - Short description
  - NumberInStock
  - Price
  - DateOrdered

- Create a GET endpoint for all items in your inventory
- Create a GET endpoint for each item
- Create a POST endpoint that allows a client to add an item to the
  inventory
- Create a PUT endpoint that allows a client to update an item
- Create a DELETE endpoint that allows a client to delete an item
- Create a GET endpoint to get all items that are out of stock
- Create a GET endpoint that allows them to search for an item based on SKU

- [Deploy your app to heroku](https://suncoast.io/handbook/curriculum/back-end/full-stack-i/lecture/dotnet/08-deployment/)
