---
title: Cloudy with a chance of Syntax Error
---

Using a popular weather API, Create a web site that allows a user to search for a location and gets that location's weather.

## Objectives

- Practice working with an API
- Practice working with data that was structure by a third party

## Requirements

- Using `openweathermap.org`, create a simple UI that allows a user to search for the current weather by zip code or city.

### SIGN UP!

- [ ] Visit `openweathermap.org` and signup for an account
- [ ] Visit `API Keys` in your dashboard
- [ ] Copy your API key
- [ ] You can use the API key in any of the URLs by appending `appid=KEY`
  - Example: from the docs `https://api.openweathermap.org/data/2.5/weather?q=Tampa` becomes `https://api.openweathermap.org/data/2.5/weather?q=Tampa&appid=cbb5b6537cd4a6eccd9aee04ffffffff`
  - NOTE: It will take about 10 to 30 minutes for your API key to be active

### Explorer Mode

- [ ] Create a simple HTML page that has a text box and a search `button`
- [ ] Allow the user to type in a place, click the search button, and , using `openweathermap.org`, get the current weather for that location.
- [ ] Display the weather to user by adding elements to the DOM.
- [ ] Allow the user to search by zip or city name.

### Adventure Mode

- [ ] Using the HTML5 Geolocation API, search for the users current location when page loads.
- [ ] Store the Users last search and use it to search for the value on page load. HINT: localstorage
- [ ] remove the need for the search button and search when the user stops typing. HINT: use setTimeout and the change event. to track when the user stops typing.

### Epic Mode

- [ ] Add a type a head using Google Places API
- [ ] Head back to Blackjack and use [this as your API](https://deckofcardsapi.com/).
- [ ] Instead of localstorage, Store the user searches results in an Custom Built API
