---
title: Adding Sign Up
order: 18
---

# Adding the Sign Up feature

Now we will update our static `SignUp.jsx` to become dynamic and add the
capability of submitting a user for sign up. The first step is to add state to
store the new user and an error message:

```javascript
const [errorMessage, setErrorMessage] = useState()

const [newUser, setNewUser] = useState({
  fullName: '',
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

then add `useHistory` so we can redirect the user after signing up:

```javascript
const history = useHistory()
```

then we will add a function to handle the user's input in the fields:

```javascript
function handleStringFieldChange(event) {
  const value = event.target.value
  const fieldName = event.target.name

  const updatedUser = { ...newUser, [fieldName]: value }

  setNewUser(updatedUser)
}
```

then add a function to submit the form:

```javascript
async function handleFormSubmit(event) {
  event.preventDefault()

  const response = await fetch('/api/Users', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(newUser),
  })
  const apiResponse = await response.json()

  if (apiResponse.status === 400) {
    setErrorMessage(Object.values(apiResponse.errors).join(' '))
  } else {
    history.push('/')
  }
}
```

Now use our two handling functions for the various `<input>` fields and the
`<form>`

We will also add a route in `App.jsx`

```jsx
<Route path="/signup">
  <SignUp />
</Route>
```

And we will also add a button to our main navigation

```jsx
<Link to="/signup">Sign Up</Link>
```

And with this we have the ability for users to sign up to our app!

<GithubCommitViewer repo="gstark/TacoTuesday" commit="7200266"/>
