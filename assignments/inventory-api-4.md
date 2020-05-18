---
title: Don't Lose Track! Part IV
tags: ["c-sharp", "dotnet", "api", "sql"]
---

The store that had you built the API loves it so much, and it caused the store
to become more successful and open up multiple locations.

We need to update our API to accommodate many locations. This means we have to
add a new Model and new a relationship to our diagrams.

## Objectives

- Extend your API to not only track inventory, but also track how much we have
  at each location.
- practice creating ASP.NET Web API endpoints
- practice EF Core.
- practice SQL Relationships

## Requirements

- Create a simple API that has a handful of endpoints to manage data
- The API should be using Web API Controllers, Ef Core, and Postgres database
- The API now has 2 models.

### Explorer Mode

- [ ] Create a Model for the `Locations`
- [ ] The `Locations` should have at least

  - [ ] Id
  - [ ] Address
  - [ ] ManagerName
  - [ ] PhoneNumber

- [ ] Add a relationship to your `Item` model to include a Foreign Key to the
      `Locations` table. Each location can have many items. There are now two
      new properties to your existing `Item` model that points to the new model
      you created (`Location`)

- [ ] Add a new Locations Controller. This controller has at least 2 endpoints

  - [ ] A POST endpoint that allows a user to create a location
  - [ ] A GET endpoint that gets all locations

- [ ] Update the following endpoints.

* [ ] Update the GET all items endpoint to need a location
* [ ] Update the GET endpoint for each item to need a location
* [ ] Update the POST endpoint that allows a user/client to add an item to the
      inventory to a location
* [ ] Update the PUT endpoint that allows a user/client to update an item for a
      location
* [ ] Update the DELETE endpoint that allows a user/client to delete an item for
      a location
* [ ] Add a new GET endpoint to get all items that are out of stock for a
      location. Keep you old GET endpoint for out of stock, but create a new one
* [ ] Update the GET endpoint that allows the user to search for an item based
      on SKU, and this should search all the locations.
* [ ] Deploy your update to Heroku

### Adventure Mode

- [ ] Add a way to create `Orders`. `Orders` should have many `Items` and
      `Items` should have many `Orders`.
- [ ] Add endpoints to CRUD `Orders` .
- [ ] Only allow items that are in stock to be added to an order.
- [ ] Add a way to associate orders to a location. Be able to view the orders in
      a location.
- [ ] Deploy your changes.

### Epic Mode

Pick 1 or more of the following:

- Go back and further any old assignment
- Create a client console app in C# that allows a user to interact with you API
- Starting reading about
  [HTML](https://suncoast.io/handbook/curriculum/fundamentals/modules/html-css/lessons/intro-to-html)
- Take a breather and some time off, congrats on making it the end of backend
  fundamentals.
