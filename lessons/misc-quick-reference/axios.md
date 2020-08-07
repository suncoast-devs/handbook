---
title: axios, an alternative to JavaScript fetch
---

# axios

[`axios`](https://github.com/axios/axios) is a third party `npm` library for
accessing remote resources in a JavaScript application. It serves as an
alternative to the `fetch` API. The benefit to using something like `axios` is
that it has a more friendly interface than `fetch` but it does add more
dependencies to your project.

## Adding it to a project

### npm

```shell
npm install --save axios
```

## Simple `get` interface.

After adding `axios` to your project you can get a response for a `get` request
via:

```javascript
const response = await axios({
  url:
    'https://one-list-api.herokuapp.com/items?access_token=illustriousvoyage',
})
```

## The response object

The response for a request contains the following information.

```javascript
{
  // `data` is the response that was provided by the server
  data: {},

  // `status` is the HTTP status code from the server response
  status: 200,

  // `statusText` is the HTTP status message from the server response
  statusText: 'OK',

  // `headers` the HTTP headers that the server responded with
  // All header names are lower cased and can be accessed using the bracket notation.
  // Example: `response.headers['content-type']`
  headers: {},

  // `config` is the config that was provided to `axios` for the request
  config: {},

  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance in the browser
  request: {}
}
```

The `data` will automatically be parsed based on the server's content type
header. This means we do **not** have to parse the data if we are dealing with a
typical JSON based api.

If we we trying to use the data from the response we simply access the `data`
property of the object.

```javascript
const response = await axios({
  url:
    'https://one-list-api.herokuapp.com/items?access_token=illustriousvoyage',
})

const items = response.data
```

## Sending a non-GET request, with data.

We can also specify request parameters easily. For instance to send a JSON API
request:

```javascript
const newOneListItem = {
  item: { text: 'This would be a new item in the app' },
}

const response = await axios({
  method: 'POST',
  url:
    'https://one-list-api.herokuapp.com/items?access_token=illustriousvoyage',
  data: newOneListItem,
})
```

Notice that we do not have to do any `JSON.stringify` as `axios` knows how to
parse our request and specify the content type headers.

## Setting options such as headers

If you need to specify headers there are
[many things we can set on a request](https://github.com/axios/axios#request-config)
but the most direct ones are:

```javascript
{
  // `url` is the server URL that will be used for the request
  url: '/user',

  // `method` is the request method to be used when making the request
  method: 'get', // default

  // `headers` are custom headers to be sent
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` are the URL parameters to be sent with the request
  // Must be a plain object or a URLSearchParams object
  params: {
    ID: 12345
  },

  // `data` is the data to be sent as the request body
  // Only applicable for request methods 'PUT', 'POST', 'DELETE , and 'PATCH'
  // When no `transformRequest` is set, must be of one of the following types:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - Browser only: FormData, File, Blob
  // - Node only: Stream, Buffer
  data: {
    firstName: 'Fred'
  },
}
```

## Setting default global headers

Lets say you wanted to send a header for authorization on every request once you
are logged in. `axios` allows you to specify default values for headers and
other configurations.

```javascript
axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`
```

With this set we do not need to augment all the `axios` requests with this
header, making every request carry the authorization information.
