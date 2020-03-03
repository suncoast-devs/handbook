# Update the inventory

The store that had you built the API loves it so much and it caused the store to become more successful and open up multiple locations.

We need to update our API to accommodate many locations. This means will have to add a new Model and new a relationship to our diagrams.

## Objectives

- Extend your API to not only track inventory, but also track how much we have at each location.
- practice creating ASP.NET Web API endpoints
- practice EF Core.
- practice SQL Relationships

## Requirements

- Create a simple API that has a handful of endpoints to manage data
- The API should be using Web API Controllers, Ef Core, and Postgres database
- The API will have 2 models now.

### Explorer Mode

- [ ] Create a Model for the `Locations`
- [ ] The `Locations` should have at least

  - [ ] Id
  - [ ] Address
  - [ ] ManagerName
  - [ ] PhoneNumber

- [ ] Add a relationship to your `Item` model to include a Foreign Key to the Locations table. This will be two new properties to your Existing `Item` model that point to the new Model you create (`Location`)

- [ ] Add a new Locations Controller. This will have 2 endpoints

  - [ ] A POST endpoint that allows a user to create a location
  - [ ] A GET endpoint that gets all locations

- [ ] Update the following endpoints.

* [ ] Update the GET all items endpoint to need a location
* [ ] Update the GET endpoint for each item to need a location
* [ ] Update the POST endpoint that allows a user/client to add an item to the inventory to a location
* [ ] Update the PUT endpoint that allows a user/client to update an item for a location
* [ ] Update the DELETE endpoint that allows a user/client to delete an item for a location
* [ ] Add a new GET endpoint to get all items that are out of stock for a location. Keep you old GET endpoint for out of stock, but create a new one
* [ ] Update the GET endpoint that allows the user to search for an item based on SKU, and this should search all the locations.

### Adventure Mode

- [ ] Ensure your instructor has seen and approved your wireframes for your capstone.
- [ ] Work on your capstone.
