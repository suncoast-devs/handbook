---
title: Adding Login to the User Interface
order: 21
---

# Adding Login to the User Interface

Turning to the `SignIn.tsx` component, we will make similar changes to the work
we did to `SignUp.tsx`.

The first step is to add types. We'll need a type to hold the form information,
and we'll also need a type for the data that is returned from the login API.
Then state to store the user and an error message:

```typescript
export type LoginUserType = {
  email: string
  password: string
}

export type LoginSuccess = {
  token: string
  user: {
    id: number
    fullName: string
    email: string
  }
}
```

```typescript
const [errorMessage, setErrorMessage] = useState('')

const [user, setUser] = useState<LoginUserType>({
  email: '',
  password: '',
})
```

We can add a `<p>` tag to show the error message:

```jsx
{
  errorMessage ? <p>{errorMessage}</p> : null
}
```

Then we will add a function to handle the user's input in the fields:

```typescript
function handleStringFieldChange(event: React.ChangeEvent<HTMLInputElement>) {
  const value = event.target.value
  const fieldName = event.target.name

  const updatedUser = { ...user, [fieldName]: value }

  setUser(updatedUser)
}
```

Then add a function to submit the form:

```typescript
async function loginUser(user: LoginUserType): Promise<LoginSuccess> {
  const response = await fetch('/api/Sessions', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(user),
  })

  if (response.ok) {
    return response.json()
  } else {
    throw await response.json()
  }
}
```

Now update the fields and the form to call the handling functions as needed.

# Mutation

This page is much like the `Signup` page except for how we'll handle the
mutation result.

```typescript
const loginUserMutation = useMutation(loginUser, {
  onSuccess: function (apiResponse) {
    // TODO: record the authentication information we receive

    // recordAuthentication(apiResponse)
    window.location.assign('/')
  },
  onError: function (error: APIError) {
    setErrorMessage(Object.values(error.errors).join(' '))
  },
})
```

```jsx
<form
  onSubmit={function (event) {
    event.preventDefault()

    loginUserMutation.mutate(user)
  }}
>
```

Notice we use `window.location` to redirect the user instead of `history.push`.
This is so the browser forces a reload and detects that the user is logged in.
The information about the logged-in user is captured by the recordAuthentication
function we are about to introduce.

The `recordAuthentication` method and many other useful authentication methods
exist in the file `auth.js`. The purpose of `recordAuthentication` is to store
the API response from the login in _local storage_ so we can access it later.

## Local Storage

Local storage is a key/value pair mechanism that can, for any string key, store
a string of data. This data is persistent across sessions and browser restarts.
The storage is _per site_, so each domain has its own set of key/value pairs.

Local storage makes for a convenient place to store the authentication data.
However, we should note that this local storage is available to any javascript
that runs on the page that **originates** from that domain. This security should
protect the data from JavaScript running in an injected ad, but if some
malicious software can inject JavaScript into the page itself, it will be able
to read these values. While local storage is convenient, it may not be the most
secure way to store authentication information.

An alternative is to send the authentication data as a `cookie` value. However,
cookies have security implications and concerns.
[This article](https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage)
gives a good overview of the differences. For now, we will proceed with local
storage.

## Redirecting after login

Since we want the user to redirect to the main page, we also want it to reload
any authentication data. For this reason, we will use `window.location` to force
a page to reload rather than `history.push`, which would do a local, non-reload
navigation.

## `auth.ts`

The contents of `auth.ts` give some useful client-side methods to:

- Determine if the user is logged in
- Fetch the user's ID
- Fetch the user details
- Get the elements needed for an authentication header for `fetch`
- Store the authentication info `recordAuthentication`
- Logout

The contents of the `auth.ts` are:

```typescript
// Returns an object that can be included in `fetch`
// headers to include the required bearer token
// for authentication.
//
// Example usage:
//
// fetch('/api/Thing', {
//    method: 'POST',
//    headers: { 'content-type': 'application/json', Authorization: authHeader() },
//    body: JSON.stringify(thing)
// })

import { LoginSuccess } from './types'

// Returns the Authorization header for the currently logged in user.
// If there is no authorization data, we'll return an empty object.
export function authHeader() {
  const auth = authFromStorage()

  return auth.token ? `Bearer ${auth.token}` : ''
}

// Save the authentication received from the API.
//
// This method stores the authentication data as
// a JSON string in local storage. Local storage
// requires everything to be in a string.
//
// This is typically called from a login component.
//
export function recordAuthentication(auth: LoginSuccess) {
  localStorage.setItem('auth', JSON.stringify(auth))
}

// Returns a boolean if the user is logged in.
//
// Returns TRUE if there is an active user id, FALSE otherwise.
//
export function isLoggedIn() {
  return getUserId() !== undefined
}

// Returns the user id if the logged-in user, null otherwise.
export function getUserId() {
  const auth = authFromStorage()

  return auth.user && auth.user.id
}

// Returns the user details retrieved from the authentication data.
//
// Example:
//
// const user = getUser()
// console.log(user.fullName)
//
export function getUser() {
  const auth = authFromStorage()

  return auth.user
}

// Removes the authentication data, effectively "forgetting" the
// session information and logging the user out.
export function logout() {
  localStorage.removeItem('auth')
}

// Local method to fetch and decode the auth data from local storage.
// If there is no local storage value returns an empty object.
function authFromStorage(): LoginSuccess {
  const auth = localStorage.getItem('auth')

  return auth ? JSON.parse(auth) : {}
}
```

Now in the `SignIn.tsx`, we can uncomment the
`recordAuthentication(apiResponse)` and add the corresponding import.

Add a route to the `SignIn` component in our `App.tsx`.

```jsx
<Route exact path="/signin">
  <SignIn />
</Route>
```

And add a link in the navigation.

```jsx
<Link to="/signin">Sign In</Link>
```

<!-- Adds sign in to user interface -->
<GithubCommitViewer repo="suncoast-devs/TacoTuesday" commit="5968ebcca2dd0baea0cc9792ec6225ec1522fe53" />
