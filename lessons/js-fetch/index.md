---
title: Fetching Data From Remote Servers
---

The Fetch API provides an interface for fetching resources, primarily across the
network.

## Using

The fetch() method takes one mandatory argument, the path to the resource you
want to fetch. It returns a `Promise` that resolves to the Response to that
request, whether it is successful or not. You can also optionally pass in an
object as the second argument which will be options on how fetch behaves.

```javascript
fetch('https://restcountries.eu/rest/v2/all')
```

- This will access the _Countries_ and fetch a list of all countries.

- But if we just log this response we will see something that we cannot directly
  use

```javascript
let response = fetch('https://restcountries.eu/rest/v2/all')
console.log(response)
```

```
Promise {<pending>}
 __proto__: Promise
 [[PromiseStatus]]: "pending"
 [[PromiseValue]]: undefined
```

- We cannot use this `promise` directly, we must "resolve" the promise
- Think of a `promise` as an _IOU_
- A `promise` is an _asynchronous_ _IOU_ that will a supplied function when the
  _IOU_ is ready to redeem.
- To cash-in on our _IOU_ we call the `then` method of the `promise` as such:

```javascript
fetch('https://restcountries.eu/rest/v2/all').then(response => {
  console.log(response)
})
```

- The response here is _still_ not quite usable:

```
Response {type: "cors", url: "https://restcountries.eu/rest/v2/all/", redirected: true, status: 200, ok: true, …}
body: (...)
bodyUsed: false
headers: Headers {}
ok: true
redirected: true
status: 200
statusText: ""
type: "cors"
url: "https://restcountries.eu/rest/v2/all/"
```

- This is because the response _body_ itself must be _converted_ into a form we
  can use. The response from `SWAPI` is a `JSON` response
- Fortunately, the `response` object gives us a method to gain access to the
  JSON:

```javascript
fetch('https://restcountries.eu/rest/v2/all')
  .then(response => {
    return response.json()
  })
  .then(json => {
    console.log(json)
  })
```

- This returns usable information!

```javascript
;[
  { name: 'Afghanistan', alpha2Code: 'AF', alpha3Code: 'AFG' },
  { name: 'Åland Islands', alpha2Code: 'AX', alpha3Code: 'ALA' },
  { name: 'Albania', alpha2Code: 'AL', alpha3Code: 'ALB' },
  { name: 'Algeria', alpha2Code: 'DZ', alpha3Code: 'DZA' },
  { name: 'American Samoa', alpha2Code: 'AS', alpha3Code: 'ASM' },
]
```

## Improving the use of `fetch`

Promises can often be challenging to use and JavaScript has implemented a way to
make asynchronous calls into synchronous calls. Similar to `C#`'s
`async / await` system we can add `await` to a call that returns a promise. For
any function that has done so we have to mark the method as `async`.

So our `fetch` call above becomes:

```javascript
async function countries() {
  const response = await fetch('https://restcountries.eu/rest/v2/all')

  if (response.ok) {
    const json = await response.json()
    console.log(json)
  }
}
```

## Making a POST request

Making a `POST` request will require us to supply a second argument containing
options. The first required option is the `method`. We may also need to supply
headers such as the `content-type` and perhaps some authentication information
such as an API key or a token. Finally if the request requires a body, we
specify it in the correct format. Here we take a JavaScript object and turn it
into JSON format.

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

  if (response.ok) {
    // Process the response
    const json = response.json()
  }
}
```

## PUT, PATCH, DELETE, etc.

The HTTP verbs will work similarly to the `POST`
