---
title: Fetch api
note:
  Explain the browser built in `fetch` method and how to use it for GET, POST,
  PUT, PATCH, DELETE access, how to set `headers` that are required by some APIs
  such as `content-type` and `authorization`. Show how to use `.then` to receive
  JSON in return. Also show how to use `fetch` with `await`
---

The Fetch API provides an interface for fetching resources, primarily across the
network.

## Basic usage:

```javascript
fetch('https://restcountries.eu/rest/v2/all')
  .then(response => {
    return response.json()
  })
  .then(apiData => {
    console.log(apiData)
  })
```

## Basic usage with async/await

```javascript
async function countries() {
  const response = await fetch('https://restcountries.eu/rest/v2/all')
  const apiData = await response.json()
  console.log(apiData)
}
```

## Using a specific http verb (e.g. `POST`)

```javascript
async function createOneListItem() {
  const response = await fetch(
    // URL
    'https://one-list.herokuapp.com?access_token=illustriousvoyage',

    // Options
    {
      // This is a POST request
      method: 'POST',

      // We are sending JSON
      headers: { 'content-type': 'application/json' },

      // The body of the message is the object, but turned into a string in JSON format
      body: JSON.stringify({
        item: { text: 'Learn about Regular Expressions!' },
      }),
    }
  )

  // Process the response
  const apiData = await response.json()
}
```
