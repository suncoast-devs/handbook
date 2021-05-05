---
title: Explosion API!
tags: ['c-sharp', 'console', 'api', 'codewars']
---

## Objectives

- Create a simple API
- Practice problem solving

## Requirements

- Before starting your assignment, solve these codewars:
  - Reverse String [https://www.codewars.com/kata/5168bb5dfe9a00b126000018](https://www.codewars.com/kata/5168bb5dfe9a00b126000018)
  - Digits Explosion [https://www.codewars.com/kata/digits-explosion](https://www.codewars.com/kata/digits-explosion)
  - Mumbling [https://www.codewars.com/kata/mumbling](https://www.codewars.com/kata/mumbling)
- TOP TIP: Reverse String is easier than Digits Explosion. Digits Explosion is probably easier than Mumbling. Start in that order!

### Setup

```shell
dotnet new sdg-api -o ExplosionAPI
```

### Resources

- Use [Insomnia](https://insomnia.rest/) for testing your API.

### Explorer Mode

- Create a new `webapi` api project
- Create a controller for `ReverseString`
  - Create a new Controller called `ReverseStringController`
  - This will have one `HttpGet` method
  - The method will accept a string either as a URL parameter or a query parameter. Your choice.
  - This endpoint method will reverse the string passed to it, manipulate it according to the kata [Reverse String](https://www.codewars.com/kata/digits-explosion) and return the result
  - Have your code return the string
- Create a controller for `explosion`
  - Create a new Controller called `ExplosionController`
  - This will have one `HttpGet` method
  - The method will accept a string either as a URL parameter or a query parameter. Your choice.
  - This endpoint method will take the string passed to it, manipulate it according to the kata [Digits Explosion](https://www.codewars.com/kata/digits-explosion) and return the result
  - Have your code return the string
- Create a controller for `mumbling`
  - Create a new Controller called `MumblingController`
  - This will have one `HttpGet` method
  - The method will accept a string either as a URL parameter or a query parameter. Your choice.
  - This endpoint method will take the string passed to it, manipulate it according to the kata [Mumbling](https://www.codewars.com/kata/mumbling) and return the result
  - Have your code return the string

### Adventure Mode

None

### Epic Mode

None
