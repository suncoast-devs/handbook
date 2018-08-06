---
title: OOP! It's Raining
---

Yesterday you created a simple weather viewer. Today, we discussed a new topic, `Object Oriented Programing`. This involved the thought of abstraction and encapsulation (among other ideas). For tonight, refactor your code to use classes to encapsulate and abstract your code and ideas from yesterday.

## Objectives

- Practice refactoring working code
- Practice thinking and working in objects

## Requirements

- make a new branch from your working code from the previous night's assignment using the following command:

```
git branch oop-refactor
git checkout oop-refactor
```

- On this new branch, refactor your code to use atleast a 2 classes

### Explorer Mode

- [ ] Create a class that encapsulates the all the logic with working with the WeatherAPI. Call the class `WeatherAPI`. It should have a view properties such `API_URL` and few methods such as `getWeatherByZipCode`
- [ ] Create a class that holds all the logic for interacting with the DOM. This should have methods such as `addForecastToDOM` and `getUserInput`
- [ ] submit this by pushing the the branch to github but using `git push origin oop-refactor`

## Adventure Mode

- [ ] Create a class that represents the whole page. This hold all the data for page. this should have 1 method that is called when the `DOMContentLoaded`. That method should be called `render`
- [ ] Add a forecast feature. Using the API, add a 5 day forecast for the users
- [ ] Pick 2 other API routes that look intrestings to implement on your site. Remember to try to impement these in Object Oriented method

## Epic Mode

- [ ] using [https://leafletjs.com/](https://leafletjs.com/) add a map that allows using see weather where ever they click
