# Explosion Api

You have already solved the `explosion` and `mumbling` katas. The client loves your solution so much that they want you to turn it into an API us on the web.

For this assignment, create a simple API with two endpoints, one for the `explosion` and one for the `mumbling`.

## Objectives

- Create a simple API
- Practice problem solving

## Requirements

- Install the `sdg-api` template using the command `dotnet new -i SDG.templates.Web.API`
- Create 2 endpoints, `/api/mumbling` and `api/explosion`, that are based off of the katas,`[https://www.codewars.com/kata/mumbling](https://www.codewars.com/kata/mumbling)` and `[https://www.codewars.com/kata/digits-explosion](https://www.codewars.com/kata/digits-explosion)` respectfully.

### Explorer Mode

- [ ] Create a new `sdg-web` api project
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

### Adventure Mode

- [ ] Ensure your instructor has seen and approved your wire frames for your capstone.
- [ ] Work on the HTML for your capstone.
- [ ] Work on your portfolio
