---
title: Explosion API
---

## Objectives

- Create a simple API
- Practice problem solving

## Requirements

- We will be creating two API endpoints that are based off of these
  katas,`[https://www.codewars.com/kata/mumbling](https://www.codewars.com/kata/mumbling)`
  and
  `[https://www.codewars.com/kata/digits-explosion](https://www.codewars.com/kata/digits-explosion)`
  respectfully. Complete these `codewar` katas before getting started.

### Explorer Mode

- [ ] Create a new `sdg-api` api project.
- [ ] Create a endpoint `/api/mumbling` for the `mumbling` endpoint.
  - [ ] Create a new Controller called `MumblingController`.
  - [ ] This will have one `HttpGet`.
  - [ ] The one get will accept a string.
  - [ ] This endpoint will take the string passed to it, manipulate according to
        the kata
        [https://www.codewars.com/kata/mumbling](https://www.codewars.com/kata/mumbling)
        and return the result.
  - [ ] This will return a `string`.
- [ ] Create a endpoint `/api/explosion` for the `explosion` endpoint.
  - [ ] Create a new Controller called `ExplosionController`.
  - [ ] This will have one `HttpGet`.
  - [ ] The one get will accept a string.
  - [ ] This endpoint will take the string passed to it, manipulate according to
        the kata
        [hhttps://www.codewars.com/kata/digits-explosion](hhttps://www.codewars.com/kata/digits-explosion)
        and return the result.
  - [ ] This will return a `string`

### Adventure mode

- Instead of just returning a string, look into how to return a JSON object
  instead. HINT: use classes.

### Epic mode

- TODO: Deploy

## Resources

- Use Incognito to interact with your API
- [Web API Tutorial](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-3.1)
- [Web API docs](https://dotnet.microsoft.com/apps/aspnet/apis)
