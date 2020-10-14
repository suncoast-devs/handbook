---
title: Adding Login to the User Interface
order: 21
---

# Adding Login to the User Interface

Turning to the `SignIn.jsx` component we will make similar changes to the work
we did to `SignUp.jsx`

The first step is to add state to store the user and an error message:

```javascript
const [errorMessage, setErrorMessage] = useState()

const [user, setUser] = useState({
  email: '',
  password: '',
})
```

We can add a `<p>` tag to show the error message:

```jsx
{
  errorMessage && <p>{errorMessage}</p>
}
```

then we will add a function to handle the user's input in the fields:

```javascript
function handleStringFieldChange(event) {
  const value = event.target.value
  const fieldName = event.target.name

  const updatedUser = { ...user, [fieldName]: value }

  setUser(updatedUser)
}
```

then add a function to submit the form:

```javascript
async function handleFormSubmit(event) {
  event.preventDefault()

  const response = await fetch('/api/Sessions', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(user),
  })

  const apiResponse = await response.json()

  if (apiResponse.status === 400) {
    setErrorMessage(Object.values(apiResponse.errors).join(' '))
  } else {
    // TODO, record the login
    // recordAuthentication(apiResponse)
    window.location.assign('/')
  }
}
```

Now update the fields and the form to call the handling functions as needed.

---

This page is much like the `Signup` page except for the `handleFormSubmit` code
handling a successful API request

```javascript
// TODO, record the login
// recordAuthentication(apiResponse)
window.location.assign('/')
```

Notice we use `window.location` to redirect the user instead of `history.push`.
This is so the browser forces a reload and detects that the user is logged in.
The information about the logged in user is captured by the recordAuthentication
method we are about to introduce.

The `recordAuthentication` method is one we are going to provide along with many
other useful authentication methods in a `auth.js` file. The purpose of
`recordAuthentication` is to store the api response from the login in _local
storage_ so we can access it later.

## Local Storage

Local Storage is a key/value pair storage mechanism that can, for any string
key, store a string of data. This data is persistant across sessions and browser
restarts. The storage is _per site_ so each domain has its own set of key/value
pairs.

This makes for a convenient place to store the authentication data. However, we
should note that this local storage is available to any javascript that runs on
the page that **originates** from that domain. This should protect the data from
JavaScript running in an injected ad, but if some malicious software is able to
inject JavaScript into the page itself, it will be able to read these values. So
while local storage is convenient, it may not be the most secure way to store
the authentication information.

An alternative is to send the authentication data as a `cookie` value. However,
this too has security implications and concernts.
[This article](https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage)
gives a good overview of the differences. For now we will proceed with local
storage.

## Redirecting after login

Since we want the user to redirect to the main page we also want it to reload
any authentication data. For this reason we will use `window.location` to force
a page reload rather than `history.push` which would do a local, non-reload,
navigation.

## `auth.js`

The contents of `auth.js` give some useful client-side methods to:

- Determine if the user is logged in
- Fetch the user's ID
- Fetch the user details
- Get the details needed for an authentication header for `fetch`
- Store the authentication info `recordAuthentication`
- Logout

Create an `auth.js` at the top level of your front end, right next to the
`App.jsx`.

The contents of the `auth.js` are:

```javascript
// Returns an object that can be included in `fetch`
// headers to include the required bearer token
// for authentication
//
// Example usage:
//
// fetch('/api/Thing', {
//    method: 'POST',
//    headers: { 'content-type': 'application/json', ...authHeader() },
//    body: JSON.stringify(thing)
// })
//
export const authHeader = () => {
  const auth = authFromStorage()

  return auth.token
    ? {
        Authorization: `Bearer ${auth.token}`,
      }
    : {}
}

// Save the authentication received from the API
//
// This method stores the authentication data as
// a JSON string in local storage. Local storage
// requires everything to be in a string.
//
// This is typically called from a login component
//
export const recordAuthentication = auth => {
  localStorage.setItem('auth', JSON.stringify(auth))
}

// Returns a boolean if the user is logged in.
//
// Returns TRUE if there is an active user id, FALSE otherwise
//
export const isLoggedIn = () => {
  return getUserId() !== undefined
}

// Returns the user id of the logged in user, null otherwise
export const getUserId = () => {
  const auth = authFromStorage()

  return auth.user && auth.user.id
}

// Returns the user details retrieved from the authentication data
//
// Example:
//
// const user = getUser()
// console.log(user.fullName)
//
export const getUser = () => {
  const auth = authFromStorage()

  return auth.user
}

// Removes the authentication data, effectively "forgetting" the
// session information and logging the user out.
export const logout = () => {
  localStorage.removeItem('auth')
}

// Local method to fetch and decode the auth data from local storage
// If there is no local storage value, returns an empty object
const authFromStorage = () => {
  const auth = localStorage.getItem('auth')

  return auth ? JSON.parse(auth) : {}
}

export const updateUserAuth = updatedUser => {
  const auth = authFromStorage()

  auth.user.fullName = updatedUser.fullName
  auth.user.photoURL = updatedUser.photoURL

  recordAuthentication(auth)
}
```

Now in the `SignIn.jsx` we can uncomment the `recordAuthentication(apiResponse)`
and add the corresponding import.

Add a route to the `SignIn` component in our `App.jsx`

```jsx
<Route exact path="/signin">
  <SignIn />
</Route>
```

and a link in the navigation

```jsx
<Link to="/signin">Sign In</Link>
```

<GithubCommitViewer repo="gstark/TacoTuesday" commit="a7737b17434e6b9892546f96829d6b3b566d5e27" />
