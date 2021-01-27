---
title: Explosion API!
tags: ['c-sharp', 'console', 'api', 'codewars']
---

## Objectives

- Create a simple API
- Practice problem solving

## Requirements

- Before starting solve these two codewars:
  - Digits Explosion [https://www.codewars.com/kata/digits-explosion](https://www.codewars.com/kata/digits-explosion)
  - Mumbling [https://www.codewars.com/kata/mumbling](https://www.codewars.com/kata/mumbling)
- TOP TIP: Digits Explosion is probably an easier algorithm to create. Start there!

### Setup

```shell
dotnet new sdg-api -o ExplosionAPI
```

### Explorer Mode

- Create a new `webapi` api project
- Create a Controller for `explosion`
  - Create a new Controller called `ExplosionController`
  - This will have one `HttpGet` method
  - The method will accept a string either as a URL parameter or a query parameter. Your choice.
  - This endpoint method will take the string passed to it, manipulate according to the kata [https://www.codewars.com/kata/digits-explosion](https://www.codewars.com/kata/digits-explosion) and return the result
  - Have your code return the string
- Create a endpoint for `mumbling`
  - Create a new Controller called `MumblingController`
  - This will have one `HttpGet` method
  - The method will accept a string either as a URL parameter or a query parameter. Your choice.
  - This endpoint method will take the string passed to it, manipulate according to the kata [https://www.codewars.com/kata/mumbling](https://www.codewars.com/kata/mumbling) and return the result
  - Have your code return the string

## Adventure Mode

None

## Epic Mode

None

## Resources

- Use [Insomnia](https://insomnia.rest/) for interacting with your API.
