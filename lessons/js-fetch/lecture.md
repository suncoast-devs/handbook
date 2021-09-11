theme: Next,1

# Fetching Data From Remote Servers

---

The Fetch API provides an interface for fetching resources, primarily across the network.

---

# Using

The `Fetch API` is provided in the browser as a method named `fetch`

Takes at _least_ one argument: a string representing the `URL` to access.

---

# Make a sample TypeScript app for demonstration or use RunJS

---

# Example

```javascript
fetch('https://restcountries.eu/rest/v2/all')
```

This will access the _Countries_ and fetch a list of all countries.

---

# What do we receive?

If log this response we will see something that we cannot directly use.

[.column]

```javascript
let response = fetch('https://restcountries.eu/rest/v2/all')
console.log(response)
```

[.column]

```
Promise {<pending>}
 __proto__: Promise
 [[PromiseStatus]]: "pending"
 [[PromiseValue]]: undefined
```

---

# [fit] JavaScript `Promise` is like `Task` from `C#`

---

- We cannot use this `promise` directly, we must "resolve" the promise
- Think of a `promise` as an _IOU_
- A `promise` is an _asynchronous_ _IOU_ that will supply a function when the _IOU_ is ready to redeem.
- To cash-in on our _IOU_ we call the `then` method of the `promise` as such:

```javascript
fetch('https://restcountries.eu/rest/v2/all').then(response => {
  console.log(response)
})
```

---

# The response here is _still_ not quite usable:

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

---

# Deserialize...

[.column]

- This is because the response _body_ itself must be _converted_ into a form we can use.
- Fortunately, the `response` object gives us a method to gain access to the JSON:

[.column]

```javascript
fetch('https://restcountries.eu/rest/v2/all')
  .then(response => {
    return response.json()
  })
  .then(json => {
    console.log(json)
  })
```

---

# This returns usable information!

<!-- prettier-ignore -->
```typescript
[
  { name: 'Afghanistan', alpha2Code: 'AF', alpha3Code: 'AFG' },
  { name: 'Åland Islands', alpha2Code: 'AX', alpha3Code: 'ALA' },
  { name: 'Albania', alpha2Code: 'AL', alpha3Code: 'ALB' },
  { name: 'Algeria', alpha2Code: 'DZ', alpha3Code: 'DZA' },
  { name: 'American Samoa', alpha2Code: 'AS', alpha3Code: 'ASM' },
]
```

---

# Improving the use of `fetch`

- Promises can often be challenging to use
- JavaScript has implemented a way to make asynchronous calls into synchronous calls.
- Similar to `C#`'s `async / await` system we can add `await` to a call that returns a promise.

---

# Example

```javascript
function countries() {
  const response = await fetch('https://restcountries.eu/rest/v2/all')

  // Check if the response is valid before decoding
  if (response.ok) {
    const json = await response.json()
    console.log(json)
  }
}
```

^ But we will have a problem, we can only use `await` if the function is `async`

---

```javascript
async function countries() {
  const response = await fetch('https://restcountries.eu/rest/v2/all')

  if (response.ok) {
    const json = await response.json()
    console.log(json)
  }
}
```

---

## Making a POST request

- Supply a second argument, an object of options
- First property is required, and is the `method`
- May also need to provide an object containing `headers`
- If this is a `POST` we'll need a `body` in the correct format

---

```javascript
async function createOneListItem() {
  const response = await fetch(
    // URL
    'https://one-list-api.herokuapp.com/items?access_token=illustriousvoyage',

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
    const json = await response.json()
    console.log(json)
  }
}
```

---

## PUT, PATCH, DELETE, etc.

The HTTP verbs will work similarly to the `POST`

---

# Fetch API is simple, powerful, but awkward to use

We'll be looking at some alternatives:

- [axios](https://github.com/axios/axios)
- [react-query](https://react-query.tanstack.com/)
