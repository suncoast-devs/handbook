---
title: Explosion Api
---

You have already solved the `explosion` and `mumbling` katas. The client loves your solution so much that they want you to turn it into an API us on the web.

For this assignment, create a simple API with two endpoints, one for the `explosion` and one for the `mumbling`.

## Objectives

- Create a simple API
- Practice problem solving

## Requirements

- Install the `sdg-api` template using the command `dotnet new -i SDG.templates.Web.API`
- Create 2 endpoints, `/api/mumbling` and `api/explosion`, that are based off of the katas,`[https://www.codewars.com/kata/mumbling](https://www.codewars.com/kata/mumbling)` and `[https://www.codewars.com/kata/digits-explosion](https://www.codewars.com/kata/digits-explosion)` respectfully.

### Explorer Mode

- [ ] Create a new `sdg-api` api project
- [ ] Create a endpoint for the `mumbling` endpoint
  - [ ] Create a new Controller called `MumblingController`
  - [ ] This will have one `HttpGet`
  - [ ] The one get will accept a string
  - [ ] This endpoint will take the string passed to it, manipulate according to the kata [https://www.codewars.com/kata/mumbling](https://www.codewars.com/kata/mumbling) and return the result
  - [ ] This will return a `ActionResult`
- [ ] Create a endpoint for the `explosion` endpoint
  - [ ] Create a new Controller called `ExplosionController`
  - [ ] This will have one `HttpGet`
  - [ ] The one get will accept a string
  - [ ] This endpoint will take the string passed to it, manipulate according to the kata [hhttps://www.codewars.com/kata/digits-explosion](hhttps://www.codewars.com/kata/digits-explosion) and return the result
  - [ ] This will return a `ActionResult`

### Adventure mode

We have been talking about databases in the previous lessons. Let's add a couple of our endpoints that interact with a database.

- [ ] Create a endpoint for the `CheckIn` endpoint
  - [ ] Create a new Controller called `CheckInController`
  - [ ] This will have 1 `HttpPost`
  - [ ] The one get will accept a string
  - [ ] This endpoint will take the string passed to it and add it to a database table
  - [ ] This will return a `ActionResult`
- [ ] This controller will have a second endpoint
  - [ ] This will be a `HttpGet`
  - [ ] The one get will accept no parameters
  - [ ] This endpoint will return all the people who have checked in using the previous endpoint.
  - [ ] This will return a `ActionResult`

### Epic mode

- Following the steps [here](https://suncoast.io/handbook/curriculum/back-end/full-stack-i/lecture/dotnet/08-deployment/), Learn about and use docker to deploy your API to the web.

## Resources

- Use [Postman](https://www.postman.com/) for interacting with your API:
